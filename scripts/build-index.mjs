import fs from 'fs';
import path from 'path';

// Helper to parse YAML frontmatter deterministically without external dependencies
function parseFrontmatter(content, filepath) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    throw new Error(`[${filepath}] Missing or invalid YAML frontmatter.`);
  }

  const yamlRaw = match[1];
  const data = {};

  // A simple, recursive line-by-line parser tailored for this specific schema
  const lines = yamlRaw.split('\n');

  let currentKey = null;
  let currentDict = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '' || line.trim().startsWith('#')) continue;

    // Check for nested properties (2 spaces indent)
    if (line.startsWith('  ') && currentKey) {
      const nestedMatch = line.match(/^  ([a-zA-Z0-9_]+):\s*(.*)$/);
      if (nestedMatch) {
        let val = nestedMatch[2].trim();
        val = parseValue(val);
        currentDict[nestedMatch[1]] = val;
      }
    } else {
      // Top level properties
      const topMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
      if (topMatch) {
        currentKey = topMatch[1];
        let val = topMatch[2].trim();

        if (val === '') {
          // It's a dictionary starting
          currentDict = {};
          data[currentKey] = currentDict;
        } else {
          currentDict = null;
          data[currentKey] = parseValue(val);
        }
      }
    }
  }

  // Ensure all required fields are present
  // Flat required fields
  const required = [
    'id', 'version', 'title', 'description', 'lane', 'category', 'tags',
    'created', 'updated'
  ];
  for (const req of required) {
    if (data[req] === undefined) {
      throw new Error(`[${filepath}] Missing required frontmatter field: ${req}`);
    }
  }

  // Nested required fields
  const nestedRequired = {
    provenance: ['source', 'attribution', 'license'],
    eval: ['score', 'last_run', 'test_count'],
    red_team: ['status', 'audited'],
    psyche: ['applicable', 'boundary', 'risk']
  };

  for (const [parent, children] of Object.entries(nestedRequired)) {
    if (!data[parent]) {
      throw new Error(`[${filepath}] Missing required frontmatter object: ${parent}`);
    }
    for (const child of children) {
      if (data[parent][child] === undefined) {
        throw new Error(`[${filepath}] Missing required frontmatter field: ${parent}.${child}`);
      }
    }
  }

  return data;
}

function parseValue(val) {
  // Strip quotes
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    val = val.slice(1, -1);
  }

  // Handle arrays like [structured-output, summarization]
  if (val.startsWith('[') && val.endsWith(']')) {
    return val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
  }

  // Handle booleans
  if (val === 'true') return true;
  if (val === 'false') return false;

  // Handle numbers
  if (!isNaN(val) && val !== '') return Number(val);

  return val;
}

function findPatternFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(findPatternFiles(filePath));
    } else if (file === 'pattern.md') {
      results.push(filePath);
    }
  }

  return results;
}

function buildIndex() {
  const promptsDir = path.join(process.cwd(), 'prompts');
  const distDir = path.join(process.cwd(), 'dist');

  // Create dist directory if it doesn't exist
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const patternFiles = findPatternFiles(promptsDir);
  const prompts = [];
  const categoriesSet = new Set();

  for (const file of patternFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const data = parseFrontmatter(content, file);

    // Extract required values for the index
    const promptEntry = {
      id: data.id,
      title: data.title,
      category: data.category,
      tags: data.tags,
      model_targets: [data.lane],
      license: data.provenance.license,
      path: `prompts/${data.id}/pattern.md`
    };

    prompts.push(promptEntry);
    categoriesSet.add(data.category);
  }

  // Ensure deterministic output by sorting by ID
  prompts.sort((a, b) => a.id.localeCompare(b.id));

  // Write index.json
  const indexJson = JSON.stringify(prompts, null, 2);
  fs.writeFileSync(path.join(distDir, 'index.json'), indexJson + '\n');

  // Write openapi.yaml
  const categories = Array.from(categoriesSet).sort();

  const openapiYaml = `openapi: 3.0.0
info:
  title: Prompt Library API
  version: 1.0.0
  description: A community API v0 for the prompt-library, available via raw.githubusercontent.com static JSON files.
servers:
  - url: https://raw.githubusercontent.com/frankxai/prompt-library/main/dist
paths:
  /index.json:
    get:
      summary: Get all prompts
      operationId: getPrompts
      responses:
        '200':
          description: A list of all available prompts
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Prompt'
  /categories.json:
    get:
      summary: Get all categories
      operationId: getCategories
      responses:
        '200':
          description: A list of all categories
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
  /prompts/{id}.json:
    get:
      summary: Get a specific prompt by ID
      operationId: getPromptById
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: The prompt details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Prompt'
components:
  schemas:
    Prompt:
      type: object
      properties:
        id:
          type: string
        title:
          type: string
        category:
          type: string
        tags:
          type: array
          items:
            type: string
        model_targets:
          type: array
          items:
            type: string
        license:
          type: string
        path:
          type: string
`;

  fs.writeFileSync(path.join(distDir, 'openapi.yaml'), openapiYaml);

  // Write categories.json
  fs.writeFileSync(path.join(distDir, 'categories.json'), JSON.stringify(categories, null, 2) + '\n');

  // Write individual prompts
  const promptsApiDir = path.join(distDir, 'prompts');
  if (!fs.existsSync(promptsApiDir)) {
    fs.mkdirSync(promptsApiDir, { recursive: true });
  }

  for (const prompt of prompts) {
    fs.writeFileSync(path.join(promptsApiDir, `${prompt.id}.json`), JSON.stringify(prompt, null, 2) + '\n');
  }

}

buildIndex();
