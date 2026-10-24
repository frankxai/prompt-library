import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const tmpRoot = os.tmpdir();
// Need to monkeypatch the prompts directory discovery for the test to point to a tmp directory,
// OR since the build script hardcodes `path.join(process.cwd(), 'prompts')`, we'll need to create the files
// in process.cwd()/prompts during the test, but then clean them up strictly. Wait, the prompt says "make sure no test creates files under prompts/ or dist/".
// But `scripts/build-index.mjs` uses `process.cwd()`. We can override process.cwd() using `process.chdir()` to run the script inside a temp directory!

const testProjectDir = fs.mkdtempSync(path.join(tmpRoot, 'prompt-test-'));
const promptsDir = path.join(testProjectDir, 'prompts');
const distDir = path.join(testProjectDir, 'dist');
const distPromptsDir = path.join(distDir, 'prompts');

function setupTestProject() {
  fs.mkdirSync(promptsDir, { recursive: true });
}

function teardownTestProject() {
  fs.rmSync(testProjectDir, { recursive: true, force: true });
}

function runBuild(expectSuccess = true) {
  try {
    // Run the build script with CWD set to our temp test project dir
    const scriptPath = path.resolve(process.cwd(), 'scripts/build-index.mjs');
    execFileSync(process.execPath, [scriptPath], { cwd: testProjectDir, stdio: 'pipe' });
    if (!expectSuccess) throw new Error("Expected build to fail, but it succeeded.");
  } catch (err) {
    if (expectSuccess) {
      console.error(err.stdout?.toString());
      console.error(err.stderr?.toString());
      throw err;
    }
    return err.stderr?.toString() || err.message;
  }
}

function writePattern(subDir, frontmatterString) {
  const dir = path.join(promptsDir, subDir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'pattern.md'), `---\n${frontmatterString}\n---\nBody`);
}

const baseValid = `id: test_id
version: "1.0.0"
title: "Test"
description: "Test description"
lane: cross-lab
category: extract
tags: [test, mock]
provenance:
  source: mock
  attribution: "Mock, MIT"
  license: MIT
eval:
  score: 0.0
  last_run: "2026-05-13"
  test_count: 0
red_team:
  status: pending
  audited: "2026-05-13"
psyche:
  applicable: false
  boundary: n/a
  risk: low
created: "2026-05-13"
updated: "2026-05-13"`;

async function runTests() {
  console.log("Running tests...");
  setupTestProject();

  // 1. CRLF normalization
  console.log("Test 1: CRLF normalization");
  writePattern('test1', baseValid.replace(/\n/g, '\r\n'));
  runBuild();
  const testOutput1 = JSON.parse(fs.readFileSync(path.join(distPromptsDir, 'test_id.json'), 'utf8'));
  if (testOutput1.id !== 'test_id') throw new Error("Test 1 failed.");
  fs.rmSync(path.join(promptsDir, 'test1'), { recursive: true, force: true });

  // 2. Type validation
  console.log("Test 2: Type validation");
  writePattern('test2', baseValid.replace('version: "1.0.0"', 'version: 1.0'));
  let errOutput = runBuild(false);
  if (!errOutput.includes("must be a string")) throw new Error("Test 2 failed.");
  fs.rmSync(path.join(promptsDir, 'test2'), { recursive: true, force: true });

  // 3. Quoted scalar handling
  console.log("Test 3: Quoted scalar handling");
  writePattern('test3', baseValid.replace('title: "Test"', 'title: "123"'));
  runBuild();
  const titleOutput = JSON.parse(fs.readFileSync(path.join(distPromptsDir, 'test_id.json'), 'utf8'));
  if (typeof titleOutput.title !== 'string' || titleOutput.title !== '123') throw new Error("Test 3 failed: Expected string '123', got " + typeof titleOutput.title);
  fs.rmSync(path.join(promptsDir, 'test3'), { recursive: true, force: true });

  // 4a. ID uniqueness
  console.log("Test 4a: ID uniqueness");
  writePattern('test4a_1', baseValid);
  writePattern('test4a_2', baseValid);
  errOutput = runBuild(false);
  if (!errOutput.includes("Duplicate ID found")) throw new Error("Test 4a failed.");
  fs.rmSync(path.join(promptsDir, 'test4a_1'), { recursive: true, force: true });
  fs.rmSync(path.join(promptsDir, 'test4a_2'), { recursive: true, force: true });

  // 4b. ID format
  console.log("Test 4b: ID format");
  writePattern('test4b', baseValid.replace('id: test_id', 'id: test/id'));
  errOutput = runBuild(false);
  if (!errOutput.includes("Invalid ID format") && !errOutput.includes("cannot contain path separators")) throw new Error("Test 4b failed.");
  fs.rmSync(path.join(promptsDir, 'test4b'), { recursive: true, force: true });

  // 5. Stale file cleanup
  console.log("Test 5: Stale file cleanup");
  if (!fs.existsSync(distPromptsDir)) fs.mkdirSync(distPromptsDir, { recursive: true });
  const dummyFile = path.join(distPromptsDir, 'stale_dummy.json');
  fs.writeFileSync(dummyFile, '{}');
  writePattern('test5', baseValid);
  runBuild();
  if (fs.existsSync(dummyFile)) throw new Error("Test 5 failed: Stale file not cleaned up.");
  fs.rmSync(path.join(promptsDir, 'test5'), { recursive: true, force: true });

  // 6. Path derivation
  console.log("Test 6: Path derivation");
  writePattern('subfolder_foo', baseValid);
  runBuild();
  const testOutput6 = JSON.parse(fs.readFileSync(path.join(distPromptsDir, 'test_id.json'), 'utf8'));
  if (testOutput6.path !== 'prompts/subfolder_foo/pattern.md') throw new Error("Test 6 failed: path is " + testOutput6.path);
  fs.rmSync(path.join(promptsDir, 'subfolder_foo'), { recursive: true, force: true });

  // 7a. Empty Array
  console.log("Test 7a: Empty Array");
  writePattern('test7a', baseValid.replace('tags: [test, mock]', 'tags: []'));
  runBuild();
  const testOutput7a = JSON.parse(fs.readFileSync(path.join(distPromptsDir, 'test_id.json'), 'utf8'));
  if (!Array.isArray(testOutput7a.tags) || testOutput7a.tags.length !== 0) throw new Error("Test 7a failed.");
  fs.rmSync(path.join(promptsDir, 'test7a'), { recursive: true, force: true });

  // 7b. Arrays with commas in quotes
  console.log("Test 7b: Commas in quotes array");
  writePattern('test7b', baseValid.replace('tags: [test, mock]', 'tags: ["research, papers", mock]'));
  runBuild();
  const testOutput7b = JSON.parse(fs.readFileSync(path.join(distPromptsDir, 'test_id.json'), 'utf8'));
  if (!Array.isArray(testOutput7b.tags) || testOutput7b.tags[0] !== "research, papers") throw new Error("Test 7b failed: " + JSON.stringify(testOutput7b.tags));
  fs.rmSync(path.join(promptsDir, 'test7b'), { recursive: true, force: true });

  // 7c. Invalid array syntax
  console.log("Test 7c: Invalid array syntax");
  writePattern('test7c', baseValid.replace('tags: [test, mock]', 'tags: [test, [mock]]'));
  errOutput = runBuild(false);
  if (!errOutput.includes("Unsupported array syntax")) throw new Error("Test 7c failed.");
  fs.rmSync(path.join(promptsDir, 'test7c'), { recursive: true, force: true });

  teardownTestProject();
  console.log("All tests passed!");
}

runTests().catch(e => {
  console.error(e);
  process.exit(1);
});
