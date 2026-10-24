import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';

const linterPath = path.resolve('scripts/lint-prompts.mjs');

function runLinter(dir) {
  try {
    const output = execSync(`node ${linterPath} ${dir}`, { encoding: 'utf8', stdio: 'pipe' });
    return { code: 0, stdout: output, stderr: '' };
  } catch (error) {
    return { code: error.status, stdout: error.stdout, stderr: error.stderr };
  }
}

test('linter rules', async (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lint-prompts-test-'));

  await t.test('passes when all rules are met', () => {
    const passDir = path.join(tempDir, 'pass_case');
    fs.mkdirSync(passDir, { recursive: true });
    const content = `---
title: "Valid title"
category: extract
tags: [tag1, tag2]
  license: MIT
provenance: fabric
---
# Content`;
    fs.writeFileSync(path.join(passDir, 'pattern.md'), content.replace(/\n/g, '\r\n')); // Test CRLF

    const result = runLinter(passDir);
    assert.strictEqual(result.code, 0, 'Exit code should be 0');
  });

  await t.test('fails when required keys are missing or empty', () => {
    const failDir = path.join(tempDir, 'fail_keys');
    fs.mkdirSync(failDir, { recursive: true });
    const content = `---
title: "Missing some keys"
category:
tags:
---
# Content`;
    fs.writeFileSync(path.join(failDir, 'pattern.md'), content);

    const result = runLinter(failDir);
    assert.strictEqual(result.code, 1, 'Exit code should be exactly 1');
    assert.match(result.stderr, /Missing required key 'license'/);
    assert.match(result.stderr, /Missing required key 'provenance'/);
    assert.match(result.stderr, /Missing required key 'category' or it is empty on the same line/);
    assert.match(result.stderr, /Missing required key 'tags' or it is empty on the same line/);
    assert.match(result.stderr, /Linting failed\. Offending files:/);
  });

  await t.test('fails when duplicate top-level keys are present', () => {
    const failDir = path.join(tempDir, 'fail_dupes');
    fs.mkdirSync(failDir, { recursive: true });
    const content = `---
title: "Title"
category: extract
tags: [tag1]
  license: MIT
provenance: fabric
category: another
---
# Content`;
    fs.writeFileSync(path.join(failDir, 'pattern.md'), content);

    const result = runLinter(failDir);
    assert.strictEqual(result.code, 1, 'Exit code should be exactly 1');
    assert.match(result.stderr, /Duplicate top-level key 'category'/);
  });
});
