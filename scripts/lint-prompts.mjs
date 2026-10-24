#!/usr/bin/env node
// Prompt frontmatter linter. No dependencies.
// Usage: node scripts/lint-prompts.mjs [promptsDir]   (default: ./prompts)
// Rules:
//   1. CRLF is normalized to LF before parsing.
//   2. title, category, tags, license, provenance must be present and non-empty.
//      "Non-empty" means a value on the same line as the key, or (for the block
//      mapping `provenance:`) at least one indented line directly under it.
//      A key followed straight away by another key (or the closing ---) is empty.
//      `license` is accepted as a top-level key or as `provenance.license`.
//   3. Duplicate top-level keys are rejected.
// Exit 0 when clean, 1 on any violation or if the target directory is missing.
import fs from 'node:fs';
import path from 'node:path';

const REQUIRED_KEYS = ['title', 'category', 'tags', 'license', 'provenance'];
const TOP_KEY = /^([A-Za-z0-9_-]+):(.*)$/;

export function lintContent(rawText) {
  const text = rawText.replace(/\r\n/g, '\n').replace(/^﻿/, '');
  const lines = text.split('\n');
  if (lines[0].trim() !== '---') return ['missing frontmatter (file must start with ---)'];
  const end = lines.findIndex((l, i) => i > 0 && l.trim() === '---');
  if (end === -1) return ['unterminated frontmatter (no closing ---)'];

  const problems = [];
  const entries = new Map(); // key -> { inline, hasBlock }
  let last = null;
  let provenanceLicense = false;
  for (let i = 1; i < end; i++) {
    const line = lines[i];
    const m = TOP_KEY.exec(line);
    if (m) {
      const key = m[1];
      if (entries.has(key)) problems.push(`duplicate frontmatter key: ${key} (line ${i + 1})`);
      else entries.set(key, { inline: m[2].trim() !== '', hasBlock: false });
      last = key;
    } else if (/^\s+\S/.test(line) && last && entries.has(last)) {
      if (!line.trim().startsWith('#')) entries.get(last).hasBlock = true;
      if (last === 'provenance' && /^\s+license:\s*\S/.test(line)) provenanceLicense = true;
    }
  }

  for (const key of REQUIRED_KEYS) {
    const e = entries.get(key);
    if (!e) {
      if (key === 'license' && provenanceLicense) continue;
      problems.push(`missing required key: ${key}`);
    } else if (!e.inline && !(key === 'provenance' && e.hasBlock)) {
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
