import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const validCategories = [
    'analyze', 'create', 'extract', 'summarize', 'answer', 'audit', 'check',
    'compare', 'improve', 'write', 'rate', 'introspect', 'profile'
];

function getFrontmatter(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\r\n/g, '\n');

    if (content.startsWith('---')) {
        const match = content.match(/^---\n([\s\S]*?)\n---/);
        if (match) {
            const yamlStr = match[1];
            const result = { __DUPLICATES: [] };

            const lines = yamlStr.split('\n');
            const seenKeys = new Set();
            let currentParent = null;

            for (const line of lines) {
                // Determine indentation
                const indentMatch = line.match(/^([ \t]*)/);
                const indent = indentMatch ? indentMatch[1].length : 0;

                const keyMatch = line.match(/^[ \t]*([a-zA-Z0-9_]+):/);
                if (keyMatch) {
                    const key = keyMatch[1];

                    if (indent === 0) {
                         currentParent = key;
                         if (seenKeys.has(key)) {
                             result.__DUPLICATES.push(key);
                         }
                         seenKeys.add(key);
                    } else {
                         // Nested key
                         const fullKey = currentParent ? `${currentParent}.${key}` : key;
                         if (seenKeys.has(fullKey)) {
                             result.__DUPLICATES.push(fullKey);
                         }
                         seenKeys.add(fullKey);
                    }
                } else if (indent === 0 && line.trim() !== '') {
                     currentParent = null; // reset parent if we see something else at root that's not a key
                }
            }

            const getField = (name) => {
                const regex = new RegExp(`^${name}:[ \t]*(.*?)[ \t]*(?:#.*)?$`, 'm');
                const m = yamlStr.match(regex);
                if (!m) return null;

                let val = m[1].trim();
                // Special case where the entire value was a comment and we matched an empty group before it
                if (val === '') {
                     // Need to double check if the original matched group contained the #
                     // JavaScript regex doesn't support positive lookbehinds in all environments, so we do it manually
                     const lineMatch = yamlStr.match(new RegExp(`^${name}:[ \t]*(.*)$`, 'm'));
                     if (lineMatch && lineMatch[1].trim().startsWith('#')) {
                         return null;
                     }
                }

                if (val === '~' || val === 'null' || val === '""' || val === "''" || val === '') {
                    return null;
                }
                return val;
            };

            const getNested = (name) => {
                const parts = name.split('.');
                // Find parent line
                const parentRegex = new RegExp(`^${parts[0]}:[ \t]*\n(?:[ \t]+.*(?:\n|$))*`, 'm');
                const parentMatch = yamlStr.match(parentRegex);
                if (!parentMatch) return null;

                const childRegex = new RegExp(`^[ \t]+${parts[1]}:[ \t]*(.*?)[ \t]*(?:#.*)?(?:\n|$)`, 'm');
                const childMatch = parentMatch[0].match(childRegex);
                if (!childMatch) return null;

                let val = childMatch[1].trim();
                if (val === '') {
                     const lineMatch = parentMatch[0].match(new RegExp(`^[ \t]+${parts[1]}:[ \t]*(.*)$`, 'm'));
                     if (lineMatch && lineMatch[1].trim().startsWith('#')) {
                         return null;
                     }
                }

                if (val === '~' || val === 'null' || val === '""' || val === "''" || val === '') {
                    return null;
                }
                return val;
            };

            const unquote = (str) => {
                if (!str) return str;
                if (str.startsWith('"') && str.endsWith('"')) return str.slice(1, -1);
                if (str.startsWith("'") && str.endsWith("'")) return str.slice(1, -1);
                return str;
            };

            result.title = unquote(getField('title'));
            result.category = unquote(getField('category'));

            const tagsInlineMatch = yamlStr.match(/^tags:[ \t]*\[(.*?)\]/m);
            if (tagsInlineMatch) {
                result.tags = tagsInlineMatch[1].trim() === '' ? null : tagsInlineMatch[1].trim();
            } else {
                 const tagsMultilineRegex = /^tags:[ \t]*\n((?:[ \t]+-.*(?:\n|$))*)/m;
                 const tagsMultilineMatch = yamlStr.match(tagsMultilineRegex);
                 if (tagsMultilineMatch) {
                      result.tags = tagsMultilineMatch[1].trim();
                      if (result.tags === '') result.tags = null;
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
             const isTest = normalizedPath.includes('/tests/') || normalizedPath.startsWith('tests/');
             const fm = getFrontmatter(filePath);

             if (fm) {
                 let issue = false;
                 const reasons = [];
                 let humanDecisionRequired = false;

                 if (fm.__DUPLICATES && fm.__DUPLICATES.length > 0) {
                     issue = true;
                     reasons.push(`duplicate keys found: ${fm.__DUPLICATES.join(', ')}`);
                 }

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
    console.log("No hard issues found.");
    process.exit(0);
}

const scriptPath = fileURLToPath(import.meta.url);
if (process.argv[1] === scriptPath) {
    const args = process.argv.slice(2);
    const dirsToCheck = args.length > 0 ? args : ['prompts'];
    checkFiles(dirsToCheck);
}
