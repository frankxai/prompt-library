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
// Remove a trailing YAML comment (a # at the start or preceded by whitespace, outside quotes).
function stripComment(value) {
  let quote = null;
  for (let i = 0; i < value.length; i++) {
    const c = value[i];
    if (quote) {
      if (c === quote) quote = null;
    } else if (c === '"' || c === "'") {
      quote = c;
    } else if (c === '#' && (i === 0 || /\s/.test(value[i - 1]))) {
      return value.slice(0, i);
    }
  }
  return value;
}

// Split "key: rest" at column 0. Keys may be quoted or contain dots/spaces; the key ends at the
// first ':' followed by a space or end of line (outside quotes). Returns null for other lines.
function splitKey(line) {
  if (/^\s/.test(line) || line.startsWith('#') || line.startsWith('- ')) return null;
  const q = line[0];
  if (q === '"' || q === "'") {
    const close = line.indexOf(q, 1);
    if (close > 0 && line[close + 1] === ':' && (line.length === close + 2 || /\s/.test(line[close + 2]))) {
      return { key: line.slice(1, close), rest: line.slice(close + 2) };
    }
    return null;
  }
  const m = /^(.*?):(?:\s(.*))?$/.exec(line);
  return m ? { key: m[1].trim(), rest: m[2] ?? '' } : null;
}

// YAML treats these as empty: nothing, "", '', null, ~ (after comment removal).
function isEmptyValue(raw) {
  const v = stripComment(raw).trim();
  return v === '' || v === '""' || v === "''" || v === '~' || /^null$/i.test(v);
}

// YAML block scalar indicator: | or > with optional chomping (+/-) and indentation digit.
function isBlockScalarIndicator(raw) {
  return /^[|>](?:[+-]\d?|\d[+-]?)?$/.test(stripComment(raw).trim());
}

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
  let childIndent = null; // indentation of direct children of the current top-level key
  for (let i = 1; i < end; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    const active = last !== null ? entries.get(last) : null;
    if (active && active.blockScalar && /^\s/.test(line)) {
      active.hasBlock = true; // block scalar text, never parsed as keys
      continue;
    }
    if (line.trim().startsWith('#')) continue;
    const m = splitKey(line);
    if (m) {
      const key = m.key;
      if (entries.has(key)) {
        problems.push(`duplicate frontmatter key: ${key} (line ${i + 1})`);
      } else {
        const blockScalar = isBlockScalarIndicator(m.rest);
        entries.set(key, { inline: !blockScalar && !isEmptyValue(m.rest), hasBlock: false, blockScalar });
        if (REQUIRED_KEYS.includes(key) && stripComment(m.rest).trim().startsWith('{')) {
          problems.push(`flow mappings are not supported for ${key}, use block style`);
        }
      }
      last = key;
      childIndent = null;
    } else if (/^\s+\S/.test(line) && last && entries.has(last)) {
      entries.get(last).hasBlock = true;
      if (last === 'provenance') {
        const indent = line.length - line.trimStart().length;
        if (childIndent === null) childIndent = indent;
        const lm = /^\s+(?:"license"|'license'|license):(?:\s(.*))?$/.exec(line);
        if (indent === childIndent && lm && !isEmptyValue(lm[1] ?? '')) provenanceLicense = true;
      }
    } else {
      problems.push(`unsupported frontmatter line ${i + 1}: ${line.trim()}`);
    }
  }

  for (const key of REQUIRED_KEYS) {
    const e = entries.get(key);
    if (!e) {
      if (key === 'license' && provenanceLicense) continue;
      problems.push(`missing required key: ${key}`);
    } else if (!(e.blockScalar ? e.hasBlock : e.inline || (key === 'provenance' && e.hasBlock))) {
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
