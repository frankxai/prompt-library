import { spawnSync } from 'child_process';
import assert from 'assert';

console.log("Running lint-prompts.mjs on valid prompts/ directory...");
let result = spawnSync('node', ['scripts/lint-prompts.mjs', 'prompts/'], { encoding: 'utf8' });
if (result.status !== 0) {
    console.error("❌ Failed: Exited non-zero for valid corpus!");
    console.error("Output:", result.stdout);
    console.error("Error:", result.stderr);
    process.exit(1);
}
console.log("✅ Passed: Exited 0 for valid corpus as expected.");

console.log("--------------------------------------------------");

const fixtures = [
    { file: 'tests/bad_title.md', expected: 'title missing/empty' },
    { file: 'tests/bad_category.md', expected: 'category invalid (invalid_category)' },
    { file: 'tests/bad_tags.md', expected: 'tags missing/empty' },
    { file: 'tests/bad_license.md', expected: 'license missing/empty' },
    { file: 'tests/bad_attribution.md', expected: 'attribution missing/empty' },
    { file: 'tests/duplicate_key.md', expected: 'duplicate keys found: category' }
];

for (const fix of fixtures) {
    console.log(`Running lint-prompts.mjs on intentionally bad fixture ${fix.file}...`);
    result = spawnSync('node', ['scripts/lint-prompts.mjs', fix.file], { encoding: 'utf8' });

    if (result.status !== 1) {
        console.error(`❌ Failed: Process exited with status ${result.status} (expected 1) for bad fixture ${fix.file}!`);
        console.error("Stdout:", result.stdout);
        console.error("Stderr:", result.stderr);
        process.exit(1);
    }

    const output = (result.stderr + "\n" + result.stdout).trim();
    if (!output.includes(fix.expected)) {
        console.error(`❌ Failed: Output did not contain expected diagnostic '${fix.expected}' for ${fix.file}!`);
        console.error("Actual output:", output);
        process.exit(1);
    }

    console.log(`✅ Passed: Exited 1 and found expected diagnostic for ${fix.file}.`);
}

console.log("--------------------------------------------------");
console.log("All tests passed.");
