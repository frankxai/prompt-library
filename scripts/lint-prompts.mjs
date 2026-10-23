import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const validCategories = [
    'analyze', 'create', 'extract', 'summarize', 'answer', 'audit', 'check',
    'compare', 'improve', 'write', 'rate', 'introspect', 'profile'
];

function getFrontmatter(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.startsWith('---')) {
        const match = content.match(/^---\n([\s\S]*?)\n---/);
        if (match) {
            const yamlStr = match[1];
            const result = {};

            const getField = (name) => {
                const regex = new RegExp(`^${name}:\\s*(.*)$`, 'm');
                const m = yamlStr.match(regex);
                return m ? m[1].trim() : null;
            };

            const getNested = (name) => {
                const parts = name.split('.');
                const parentRegex = new RegExp(`^${parts[0]}:\\s*\\n(?:\\s+.*\\n)*`, 'm');
                const parentMatch = yamlStr.match(parentRegex);
                if (!parentMatch) return null;
                const childRegex = new RegExp(`^\\s+${parts[1]}:\\s*(.*)$`, 'm');
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
            const tagsInlineMatch = yamlStr.match(/^tags:\s*\[(.*?)\]/m);
            if (tagsInlineMatch) {
                result.tags = tagsInlineMatch[1].trim() === '' ? null : tagsInlineMatch[1].trim();
            } else {
                 const tagsMultilineRegex = /^tags:\s*\n((?:\s+-.*\n)*)/m;
                 const tagsMultilineMatch = yamlStr.match(tagsMultilineRegex);
                 if (tagsMultilineMatch) {
                      result.tags = tagsMultilineMatch[1].trim();
                 } else {
                      const tagsEmptyMatch = yamlStr.match(/^tags:\s*$/m);
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
        if (!fs.existsSync(dirToWalk)) continue;

        const walkSync = (dir) => {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    walkSync(filePath);
                } else if (file === 'pattern.md' || (filePath.includes('tests/') && file.endsWith('.md'))) {
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
                        if (checkEmpty(fm.license)) {
                            if (filePath.includes('tests/')) {
                                issue = true;
                                reasons.push('license missing/empty');
                            } else {
                                humanDecisionRequired = true;
                                reasons.push('license missing/empty (needs human decision)');
                            }
                        }
                        if (checkEmpty(fm.attribution)) {
                            if (filePath.includes('tests/')) {
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
                }
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
