import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const validCategories = [
    'analyze', 'create', 'extract', 'summarize', 'answer', 'audit', 'check',
    'compare', 'improve', 'write', 'rate', 'introspect', 'profile'
];

function getFrontmatter(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Normalize CRLF to LF
    content = content.replace(/\r\n/g, '\n');

    if (content.startsWith('---')) {
        const match = content.match(/^---\n([\s\S]*?)\n---/);
        if (match) {
            const yamlStr = match[1];
            const result = {};

            const getField = (name) => {
                // Restrict whitespace to the same line to avoid consuming newlines
                const regex = new RegExp(`^${name}:[ \t]*(.*)$`, 'm');
                const m = yamlStr.match(regex);
                return m ? m[1].trim() : null;
            };

            const getNested = (name) => {
                const parts = name.split('.');
                const parentRegex = new RegExp(`^${parts[0]}:[ \t]*\\n(?:[ \\t]+.*\\n)*`, 'm');
                const parentMatch = yamlStr.match(parentRegex);
                if (!parentMatch) return null;
                const childRegex = new RegExp(`^[ \t]+${parts[1]}:[ \\t]*(.*)$`, 'm');
                const childMatch = parentMatch[0].match(childRegex);
                return childMatch ? childMatch[1].trim() : null;
            };

            const unquote = (str) => {
                if (!str) return str;
                if (str.startsWith('"') && str.endsWith('"')) return str.slice(1, -1);
                if (str.startsWith("'") && str.endsWith("'")) return str.slice(1, -1);
                return str;
            };

            result.title = unquote(getField('title'));
            result.category = unquote(getField('category'));

            // Check for both inline tags "[a, b]" and multi-line list tags
            const tagsInlineMatch = yamlStr.match(/^tags:[ \t]*\[(.*?)\]/m);
            if (tagsInlineMatch) {
                result.tags = tagsInlineMatch[1].trim() === '' ? null : tagsInlineMatch[1].trim();
            } else {
                 const tagsMultilineRegex = /^tags:[ \t]*\n((?:[ \\t]+-.*\n)*)/m;
                 const tagsMultilineMatch = yamlStr.match(tagsMultilineRegex);
                 if (tagsMultilineMatch) {
                      result.tags = tagsMultilineMatch[1].trim();
                 } else {
                      result.tags = null;
                 }
            }

            result.license = unquote(getNested('provenance.license') || getField('provenance.license') || getField('license'));
            result.attribution = unquote(getNested('provenance.attribution') || getField('provenance.attribution') || getField('attribution'));

            return result;
        }
    }
    return null;
}

function checkFiles(directories) {
    let count = 0;

    for (const dirToWalk of directories) {
        if (!fs.existsSync(dirToWalk)) {
            console.error(`Error: Input directory or file '${dirToWalk}' does not exist.`);
            process.exit(1);
        }

        const walkSync = (dir) => {
            const stat = fs.statSync(dir);
            if (!stat.isDirectory()) {
                // Allows passing a direct file as an argument
                processFile(dir);
                return;
            }

            const files = fs.readdirSync(dir);
            for (const file of files) {
                const filePath = path.join(dir, file);
                const fileStat = fs.statSync(filePath);
                if (fileStat.isDirectory()) {
                    walkSync(filePath);
                } else if (file === 'pattern.md' || (filePath.replace(/\\/g, '/').includes('/tests/') && file.endsWith('.md')) || (filePath.replace(/\\/g, '/').startsWith('tests/') && file.endsWith('.md'))) {
                    processFile(filePath);
                }
            }
        };

        const processFile = (filePath) => {
             const normalizedPath = filePath.replace(/\\/g, '/');
             const fm = getFrontmatter(filePath);
             if (fm) {
                 let issue = false;
                 const reasons = [];
                 let humanDecisionRequired = false;

                 const checkEmpty = (val) => {
                     if (val === undefined || val === null || val === '' || val === 'null' || val === 'TODO' || val === 'TODO:' || val === '[]') return true;
                     if (typeof val === 'string' && val.trim() === '') return true;
                     return false;
                 };

                 if (checkEmpty(fm.title)) {
                     issue = true;
                     reasons.push('title missing/empty');
                 }
                 if (checkEmpty(fm.category)) {
                     issue = true;
                     reasons.push('category missing/empty');
                 } else if (!validCategories.includes(fm.category)) {
                     issue = true;
                     reasons.push(`category invalid (${fm.category})`);
                 }

                 if (checkEmpty(fm.tags)) {
                     issue = true;
                     reasons.push('tags missing/empty');
                 }

                 // License and attribution issues need human decision, they don't break the linter for the repo
                 // (Except in tests directory where we want it to fail)
                 const isTest = normalizedPath.includes('/tests/') || normalizedPath.startsWith('tests/');
                 if (checkEmpty(fm.license)) {
                     if (isTest) {
                         issue = true;
                         reasons.push('license missing/empty');
                     } else {
                         humanDecisionRequired = true;
                         reasons.push('license missing/empty (needs human decision)');
                     }
                 }
                 if (checkEmpty(fm.attribution)) {
                     if (isTest) {
                         issue = true;
                         reasons.push('attribution missing/empty');
                     } else {
                         humanDecisionRequired = true;
                         reasons.push('attribution missing/empty (needs human decision)');
                     }
                 }

                 if (issue) {
                     count++;
                     console.error(`File: ${filePath}`);
                     console.error(`Issues: ${reasons.join(', ')}`);
                     console.error();
                 } else if (humanDecisionRequired) {
                     console.log(`WARNING (Human Decision Required) in ${filePath}: ${reasons.join(', ')}`);
                 }
             } else {
                  console.error(`File: ${filePath}`);
                  console.error(`Issues: no frontmatter found`);
                  console.error();
                  count++;
             }
        };

        walkSync(dirToWalk);
    }

    if (count > 0) {
        console.error(`Total hard issues found: ${count}`);
        process.exit(1);
    }
    console.log("No hard issues found. (Only human-decision warnings if any)");
    process.exit(0);
}

// Only execute if ran directly (e.g. node scripts/lint-prompts.mjs)
const scriptPath = fileURLToPath(import.meta.url);
if (process.argv[1] === scriptPath) {
    const args = process.argv.slice(2);
    const dirsToCheck = args.length > 0 ? args : ['prompts'];
    checkFiles(dirsToCheck);
}
