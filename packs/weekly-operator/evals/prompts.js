// Three arms, one harness message. Every arm sees the same folder, date and request;
// only the system prompt differs, so the outcome score compares the instructions alone.
const fs = require('fs');
const path = require('path');

const HERE = __dirname;

function readFolder(fixture) {
  if (!fixture || fixture === 'none') return [];
  const root = path.join(HERE, fixture);
  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else files.push(full);
    }
  };
  walk(root);
  return files.sort().map((full) => ({
    rel: path.relative(root, full).split(path.sep).join('/'),
    body: fs.readFileSync(full, 'utf8'),
  }));
}

function harness(vars) {
  const files = readFolder(vars.fixture);
  const folder = files.length
    ? files.map((f) => `<file path="${f.rel}">\n${f.body.trim()}\n</file>`).join('\n\n')
    : '(The folder life/ does not exist yet.)';
  return [
    `Today is ${vars.today}.`,
    '',
    "Below is the user's planning folder, already read from disk. You cannot write files in this session:",
    'for every file you would create or change, output its full new content in a fenced block preceded by a line `File: <path>`.',
    '',
    folder,
    '',
    `User: ${vars.request}`,
  ].join('\n');
}

const system = (rel) => fs.readFileSync(path.join(HERE, rel), 'utf8');

module.exports.weeklyOperator = ({ vars }) => [
  { role: 'system', content: system('../skills/weekly-operator/SKILL.md') },
  { role: 'user', content: harness(vars) },
];

module.exports.gtdWeeklyReview = ({ vars }) => [
  { role: 'system', content: system('baselines/gtd-weekly-review.SKILL.md') },
  { role: 'user', content: harness(vars) },
];

module.exports.noSkill = ({ vars }) => [{ role: 'user', content: harness(vars) }];

module.exports.harness = harness;
