import { execSync } from 'child_process';
import assert from 'assert';

console.log("Running lint-prompts.mjs on valid prompts/ directory...");
try {
    const stdout = execSync('node scripts/lint-prompts.mjs prompts/', { encoding: 'utf8' });
    console.log("Output:");
    console.log(stdout);
    console.log("✅ Passed: Exited 0 for valid corpus as expected.");
} catch (err) {
    console.error("❌ Failed: Exited non-zero for valid corpus!");
    console.error("Output:", err.stdout);
    console.error("Error:", err.stderr);
    process.exit(1);
}

console.log("--------------------------------------------------");

console.log("Running lint-prompts.mjs on intentionally bad fixture tests/bad_prompt.md...");
let failedAsExpected = false;
try {
    execSync('node scripts/lint-prompts.mjs tests/bad_prompt.md', { encoding: 'utf8', stdio: 'pipe' });
} catch (err) {
    failedAsExpected = true;
    console.log("Output from failing test:");
    console.log(err.stderr || err.stdout);

    assert(err.status !== 0, "Process should have exited non-zero");
    console.log("✅ Passed: Exited non-zero for bad fixture as expected.");
}

if (!failedAsExpected) {
    console.error("❌ Failed: Process incorrectly exited 0 for bad fixture!");
    process.exit(1);
}

console.log("All tests passed.");
