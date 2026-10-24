#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      findFiles(path.join(dir, file), fileList);
    } else if (file === 'pattern.md') {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const args = process.argv.slice(2);
let searchDir = path.join(process.cwd(), 'prompts');
if (args.length > 0) {
  searchDir = path.resolve(args[0]);
}
const files = fs.existsSync(searchDir) ? findFiles(searchDir) : [];

let hasErrors = false;
const offendingFiles = new Set();
const diagnostics = [];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  // (1) normalizes CRLF to LF before parsing
  content = content.replace(/\r\n/g, '\n');

  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    offendingFiles.add(file);
    diagnostics.push(`${file}: Missing or malformed frontmatter`);
    hasErrors = true;
    continue;
  }

  const frontmatter = match[1];
  let fileHasError = false;

  // (2) requires the frontmatter keys title, category, tags, license, provenance to be present and non-empty on the same line
  const requiredKeys = ['title', 'category', 'tags', 'license', 'provenance'];
  for (const key of requiredKeys) {
    // using [ \t]* to avoid matching newlines in \s
    const regex = new RegExp(`^[ \t]*${key}:[ \t]*\\S.*$`, 'm');
    if (!regex.test(frontmatter)) {
      fileHasError = true;
      diagnostics.push(`${file}: Missing required key '${key}' or it is empty on the same line`);
    }
  }

  // (3) rejects duplicate top-level keys
  const lines = frontmatter.split('\n');
  const topKeys = new Set();
  for (const line of lines) {
    const topKeyMatch = line.match(/^([A-Za-z0-9_-]+):/);
    if (topKeyMatch) {
      const k = topKeyMatch[1];
      if (topKeys.has(k)) {
        fileHasError = true;
        diagnostics.push(`${file}: Duplicate top-level key '${k}'`);
      }
      topKeys.add(k);
    }
  }

  if (fileHasError) {
    offendingFiles.add(file);
    hasErrors = true;
  }
}

if (hasErrors) {
  console.error("Linting failed. Offending files:");
  for (const file of offendingFiles) {
    console.error(`- ${file}`);
  }
  console.error("\nDiagnostics:");
  for (const diag of diagnostics) {
    console.error(diag);
  }
  process.exit(1);
} else {
  console.log("Linting passed.");
  process.exit(0);
}
