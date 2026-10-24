import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const script = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'lint-prompts.mjs');
const GOOD = ['title: "T"', 'category: extract', 'tags: [a, b]', 'provenance:', '  source: x', '  license: MIT'];
let root;

before(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'lint-prompts-'));
});
after(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

function fixture(name, fmLines, eol = '\n') {
  const dir = path.join(root, name, 'prompts', 'p1');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'pattern.md'), ['---', ...fmLines, '---', 'Body', ''].join(eol));
  return path.join(root, name);
}

// Runs the linter; only a real non-zero exit status is captured, anything else rethrows.
function lint(cwd, ...args) {
  try {
    const stdout = execFileSync(process.execPath, [script, ...args], { cwd, encoding: 'utf8', stdio: 'pipe' });
    return { status: 0, stdout, stderr: '' };
  } catch (err) {
    if (typeof err.status !== 'number') throw err;
    return { status: err.status, stdout: String(err.stdout), stderr: String(err.stderr) };
  }
}

test('clean file passes with exit 0', () => {
  const r = lint(fixture('ok', GOOD), 'prompts');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /1 file\(s\) clean/);
});

test('CRLF file passes with exit 0', () => {
  const r = lint(fixture('crlf', GOOD, '\r\n'), 'prompts');
  assert.equal(r.status, 0);
});

test('missing required key exits exactly 1 and names file and key', () => {
  const r = lint(fixture('missing', GOOD.filter((l) => !l.startsWith('category'))), 'prompts');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /prompts\/p1\/pattern\.md: missing required key: category/);
});

test('key followed directly by another key is empty (exit exactly 1)', () => {
  const fm = ['title:', 'category: extract', 'tags: [a]', 'license: MIT', 'provenance:', '  source: x'];
  const r = lint(fixture('empty', fm), 'prompts');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /prompts\/p1\/pattern\.md: empty value for required key: title/);
});

test('empty provenance (no indented block) exits exactly 1', () => {
  const fm = ['title: T', 'category: c', 'tags: [a]', 'license: MIT', 'provenance:'];
  const r = lint(fixture('emptyprov', fm), 'prompts');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /empty value for required key: provenance/);
});

test('duplicate top-level key exits exactly 1', () => {
  const r = lint(fixture('dup', [...GOOD, 'title: "Again"']), 'prompts');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /prompts\/p1\/pattern\.md: duplicate frontmatter key: title/);
});

test('every offending file is listed', () => {
  const dir = fixture('multi', GOOD.filter((l) => !l.startsWith('tags')));
  const second = path.join(dir, 'prompts', 'p2');
  fs.mkdirSync(second);
  fs.writeFileSync(path.join(second, 'pattern.md'), '---\ntitle: T\n---\n');
  const r = lint(dir, 'prompts');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /2 file\(s\) failed/);
  assert.match(r.stderr, /prompts\/p1\/pattern\.md: missing required key: tags/);
  assert.match(r.stderr, /prompts\/p2\/pattern\.md: missing required key: category/);
});

test('missing target directory exits exactly 1', () => {
  const r = lint(root, 'does-not-exist');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /target directory not found/);
});
