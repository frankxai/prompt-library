#!/usr/bin/env node
// Prompt frontmatter linter. Depends only on the `yaml` package (see package.json).
// Usage: node scripts/lint-prompts.mjs [promptsDir]   (default: ./prompts)
// Rules:
//   1. CRLF is normalized to LF before parsing.
//   2. title, category, tags, license, provenance must be present and non-empty on the parsed
//      values: not null, not a blank string, and not an empty array/mapping. `license` is
//      accepted as a top-level key or as `provenance.license` (a direct child of the mapping).
//   3. Duplicate keys are rejected (the parser runs with uniqueKeys); any other YAML error is reported.
//   4. Every offending file is listed with its relative path and reason.
// Exit 0 when clean, 1 on any violation or if the target directory is missing.
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const REQUIRED_KEYS = ['title', 'category', 'tags', 'license', 'provenance'];

function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function describeYamlError(err, yamlText) {
  if (err.code === 'DUPLICATE_KEY' && err.linePos?.[0]) {
    const lineNo = err.linePos[0].line;
    const line = yamlText.split('\n')[lineNo - 1] ?? '';
    const m = /^\s*("[^"]*"|'[^']*'|.*?)\s*:(?:\s|$)/.exec(line);
    const key = (m ? m[1] : line.trim()).replace(/^(["'])(.*)\1$/, '$2');
    return `duplicate frontmatter key: ${key} (line ${lineNo + 1})`;
  }
  return `invalid YAML frontmatter: ${err.message.split('\n')[0]}`;
}

export function lintContent(rawText) {
  const text = rawText.replace(/\r\n/g, '\n').replace(/^﻿/, '');
  const lines = text.split('\n');
  if (lines[0].trim() !== '---') return ['missing frontmatter (file must start with ---)'];
  const end = lines.findIndex((l, i) => i > 0 && l.trim() === '---');
  if (end === -1) return ['unterminated frontmatter (no closing ---)'];

  const yamlText = lines.slice(1, end).join('\n');
  const doc = YAML.parseDocument(yamlText, { uniqueKeys: true });
  if (doc.errors.length > 0) return doc.errors.map((e) => describeYamlError(e, yamlText));
  const data = doc.toJS();
  if (!isPlainObject(data)) return ['frontmatter must be a YAML mapping'];

  const problems = [];
  for (const key of REQUIRED_KEYS) {
    if (key === 'license' && !Object.hasOwn(data, 'license')) {
      const nested = isPlainObject(data.provenance) ? data.provenance.license : undefined;
      if (isEmpty(nested)) problems.push('missing required key: license');
    } else if (!Object.hasOwn(data, key)) {
      problems.push(`missing required key: ${key}`);
    } else if (isEmpty(data[key])) {
      problems.push(`empty value for required key: ${key}`);
    }
  }
  return problems;
}

function findPatternFiles(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir).sort()) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) out.push(...findPatternFiles(full));
    else if (name === 'pattern.md') out.push(full);
  }
  return out;
}

function main() {
  const target = path.resolve(process.argv[2] ?? 'prompts');
  if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
    console.error(`lint-prompts: target directory not found: ${target}`);
    return 1;
  }
  const files = findPatternFiles(target);
  if (files.length === 0) {
    console.error(`lint-prompts: no pattern.md files found under ${target}`);
    return 1;
  }
  const failures = [];
  const badFiles = new Set();
  for (const file of files) {
    const rel = path.relative(process.cwd(), file).split(path.sep).join('/');
    for (const reason of lintContent(fs.readFileSync(file, 'utf8'))) {
      failures.push(`${rel}: ${reason}`);
      badFiles.add(rel);
    }
  }
  if (failures.length > 0) {
    console.error(`lint-prompts: ${badFiles.size} file(s) failed (${failures.length} problem(s)):`);
    for (const f of failures) console.error(`  ${f}`);
    return 1;
  }
  console.log(`lint-prompts: ${files.length} file(s) clean`);
  return 0;
}

process.exit(main());
