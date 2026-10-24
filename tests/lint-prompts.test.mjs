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

test('comment-only value counts as empty (exit exactly 1)', () => {
  const fm = ['title: # TODO', 'category: c', 'tags: [a]', 'license: MIT', 'provenance:', '  source: x'];
  const r = lint(fixture('comment', fm), 'prompts');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /prompts\/p1\/pattern\.md: empty value for required key: title/);
});

test('hash inside a quoted value is not a comment', () => {
  const r = lint(fixture('hashquote', ['title: "Issue #1"', ...GOOD.slice(1)]), 'prompts');
  assert.equal(r.status, 0);
});

test('license nested under another provenance key does not count (exit exactly 1)', () => {
  const fm = ['title: T', 'category: c', 'tags: [a]', 'provenance:', '  source:', '    license: MIT'];
  const r = lint(fixture('nestedlic', fm), 'prompts');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /prompts\/p1\/pattern\.md: missing required key: license/);
});

test('quoted key duplicates an unquoted key (exit exactly 1)', () => {
  const r = lint(fixture('quoteddup', [...GOOD, '"title": Again']), 'prompts');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /prompts\/p1\/pattern\.md: duplicate frontmatter key: title/);
});

test('quoted required key still satisfies the required-key check', () => {
  const r = lint(fixture('quotedok', ['"title": T', ...GOOD.slice(1)]), 'prompts');
  assert.equal(r.status, 0);
});

test('duplicate dotted or spaced keys are detected (exit exactly 1)', () => {
  const r = lint(fixture('dotdup', [...GOOD, 'custom.field: a', 'custom.field: b']), 'prompts');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /duplicate frontmatter key: custom\.field/);
  const r2 = lint(fixture('spacedup', [...GOOD, 'my key: a', 'my key: b']), 'prompts');
  assert.equal(r2.status, 1);
  assert.match(r2.stderr, /duplicate frontmatter key: my key/);
});

for (const [name, value] of [['dq', '""'], ['sq', "''"], ['null', 'null'], ['tilde', '~']]) {
  test(`title: ${value} counts as empty (exit exactly 1)`, () => {
    const r = lint(fixture(`emptyval-${name}`, [`title: ${value}`, ...GOOD.slice(1)]), 'prompts');
    assert.equal(r.status, 1);
    assert.match(r.stderr, /empty value for required key: title/);
  });
}

test('license: null under provenance does not satisfy license (exit exactly 1)', () => {
  const fm = ['title: T', 'category: c', 'tags: [a]', 'provenance:', '  license: null'];
  const r = lint(fixture('nulllic', fm), 'prompts');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /missing required key: license/);
});

test('quoted license key as direct child of provenance passes', () => {
  const fm = ['title: T', 'category: c', 'tags: [a]', 'provenance:', '  source: x', '  "license": MIT'];
  assert.equal(lint(fixture('quotedlic', fm), 'prompts').status, 0);
});

test('flow mappings on required keys are rejected, even with a license inside quotes (exit exactly 1)', () => {
  const base = ['title: T', 'category: c', 'tags: [a]'];
  for (const [name, value] of [
    ['flowquoted', 'provenance: {source: "x, license: MIT"}'],
    ['flowreal', 'provenance: {source: x, license: MIT}'],
  ]) {
    const r = lint(fixture(name, [...base, value]), 'prompts');
    assert.equal(r.status, 1);
    assert.match(r.stderr, /flow mappings are not supported for provenance, use block style/);
  }
});

test('provenance block scalar text is not parsed as keys (exit exactly 1)', () => {
  const fm = ['title: T', 'category: c', 'tags: [a]', 'provenance: |', '  license: MIT'];
  const r = lint(fixture('provblock', fm), 'prompts');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /missing required key: license/);
});

test('block scalar without content is empty (exit exactly 1)', () => {
  const fm = ['title: |', 'category: c', 'tags: [a]', 'license: MIT', 'provenance:', '  source: x'];
  const r = lint(fixture('emptyblock', fm), 'prompts');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /empty value for required key: title/);
});

test('block scalar with content counts as non-empty', () => {
  const fm = ['title: >-', '  Folded title', 'category: c', 'tags: [a]', 'provenance:', '  license: MIT'];
  assert.equal(lint(fixture('fullblock', fm), 'prompts').status, 0);
});
