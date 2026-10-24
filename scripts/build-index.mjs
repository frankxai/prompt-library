import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

// Parse YAML frontmatter with the `yaml` package, then validate the resulting JS values.
function parseFrontmatter(content, filepath) {
  content = content.replace(/\r\n/g, '\n');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    throw new Error(`[${filepath}] Missing or invalid YAML frontmatter.`);
  }

  // uniqueKeys rejects duplicate keys; any parse error (bad quotes, unterminated flow collections,
  // alias problems) is reported with the file name.
  const doc = YAML.parseDocument(match[1], { uniqueKeys: true });
  if (doc.errors.length > 0) {
    throw new Error(`[${filepath}] Invalid YAML frontmatter: ${doc.errors.map((e) => e.message.split('\n')[0]).join('; ')}`);
  }
  const data = doc.toJS();
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error(`[${filepath}] Frontmatter must be a YAML mapping.`);
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
    if (!data[parent] || typeof data[parent] !== 'object' || Array.isArray(data[parent])) {
      throw new Error(`[${filepath}] Missing required frontmatter object: ${parent}`);
    }
    for (const child of children) {
      if (data[parent][child] === undefined) {
        throw new Error(`[${filepath}] Missing required frontmatter field: ${parent}.${child}`);
      }
    }
  }

  // Validate nested field types. dist/openapi.yaml declares only the public index fields, so these
  // rules follow what the prompts actually use: numeric score/test_count, boolean applicable,
  // string dates/boundary, and small enums for red_team.status and psyche.risk.
  const isDateOrNull = (v) => v === null || typeof v === 'string';
  const nestedChecks = [
    ['eval', 'score', (v) => v === null || typeof v === 'number', 'a number or null'],
    ['eval', 'last_run', isDateOrNull, 'a date string or null'],
    ['eval', 'test_count', (v) => Number.isInteger(v) && v >= 0, 'a non-negative integer'],
    ['red_team', 'status', (v) => ['pending', 'pass', 'warn', 'fail'].includes(v), 'one of pending, pass, warn, fail'],
    ['red_team', 'audited', isDateOrNull, 'a date string or null'],
    ['psyche', 'applicable', (v) => typeof v === 'boolean', 'a boolean'],
    ['psyche', 'boundary', (v) => typeof v === 'string', 'a string'],
    ['psyche', 'risk', (v) => ['low', 'medium', 'high'].includes(v), 'one of low, medium, high']
  ];
  for (const [parent, child, ok, expected] of nestedChecks) {
    if (!ok(data[parent][child])) {
      throw new Error(`[${filepath}] Field ${parent}.${child} must be ${expected}, got ${JSON.stringify(data[parent][child])}.`);
    }
  }

  // Validate Types
  const stringFields = [
    'id', 'version', 'title', 'description', 'lane', 'category', 'created', 'updated'
  ];
  for (const field of stringFields) {
    if (typeof data[field] !== 'string') {
      throw new Error(`[${filepath}] Field ${field} must be a string.`);
    }
  }

  const nestedStringFields = {
    provenance: ['source', 'attribution', 'license']
  };
  for (const [parent, children] of Object.entries(nestedStringFields)) {
    for (const child of children) {
      if (typeof data[parent][child] !== 'string') {
        throw new Error(`[${filepath}] Field ${parent}.${child} must be a string.`);
      }
    }
  }

  // Validate tags array
  if (!Array.isArray(data.tags)) {
    throw new Error(`[${filepath}] Field tags must be an array of strings.`);
  }
  for (const tag of data.tags) {
    if (typeof tag !== 'string') {
      throw new Error(`[${filepath}] Field tags must be an array of strings.`);
    }
  }

  // Validate ID format
  if (!/^[a-z0-9][a-z0-9_-]*$/.test(data.id)) {
    throw new Error(`[${filepath}] Invalid ID format: ${data.id}. IDs must match ^[a-z0-9][a-z0-9_-]*$`);
  }
  if (data.id.includes('/') || data.id.includes('\\') || data.id.includes('..')) {
    throw new Error(`[${filepath}] Invalid ID: ${data.id}. IDs cannot contain path separators or ..`);
  }

  return data;
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
  const seenIds = new Set();

  for (const file of patternFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const data = parseFrontmatter(content, file);

    if (seenIds.has(data.id)) {
      throw new Error(`[${file}] Duplicate ID found: ${data.id}`);
    }
    seenIds.add(data.id);

    // Extract required values for the index
    // derive path from the actual scanned file
    const relPath = path.relative(process.cwd(), file).split(path.sep).join('/');
    const promptEntry = {
      id: data.id,
      title: data.title,
      category: data.category,
      tags: data.tags,
      model_targets: [data.lane],
      license: data.provenance.license,
      path: relPath
    };

    prompts.push(promptEntry);
    categoriesSet.add(data.category);
  }

  // Ensure deterministic output by sorting by ID
  prompts.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

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
  if (fs.existsSync(promptsApiDir)) {
    // Clean stale files
    const files = fs.readdirSync(promptsApiDir);
    for (const file of files) {
      fs.unlinkSync(path.join(promptsApiDir, file));
    }
  } else {
    fs.mkdirSync(promptsApiDir, { recursive: true });
  }

  for (const prompt of prompts) {
    fs.writeFileSync(path.join(promptsApiDir, `${prompt.id}.json`), JSON.stringify(prompt, null, 2) + '\n');
  }

}

buildIndex();
