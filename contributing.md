# Contributing to prompt-library

PRs welcome. This guide covers adding a pattern.

For agent / flow contributions, see the companion repo [`prompt-engine`](https://github.com/frankxai/prompt-engine) `docs/contributing.md`.

## Pattern PR checklist

A pattern PR is accepted when ALL of these are true:

- [ ] Folder named `prompts/<verb>_<topic>/` — verb is one of the 13 categories in `taxonomy/categories.yaml`.
- [ ] `pattern.md` frontmatter validates against `prompt-engine/schema/pattern.schema.json`.
- [ ] `pattern.md` body contains the actual prompt (no placeholders).
- [ ] `examples.md` has 2-5 input/output exemplars.
- [ ] `evals/promptfoo.yaml` has at least 3 test cases.
- [ ] `README.md` has an 80-word human summary.
- [ ] `provenance` frontmatter is complete: `source`, `source_url` (if external), `attribution`, `license`.
- [ ] If `lane: claude`, pattern uses XML tags or prefill (Claude doctrine).
- [ ] If `lane: gpt`, pattern uses developer role or Structured Outputs (GPT doctrine).
- [ ] If `lane: gemini`, pattern places system prompt at top (Gemini doctrine).
- [ ] If `lane: oss`, pattern documents required chat template.
- [ ] If `category: introspect` or `profile`, the pattern includes the boundary disclosure + crisis routing.
- [ ] CI passes: schema validation, promptfoo evals, brand-voice gate, attribution check.

## Step-by-step

### 1. Scaffold the folder

```bash
mkdir -p prompts/<verb>_<topic>/evals
touch prompts/<verb>_<topic>/{pattern.md,examples.md,README.md}
touch prompts/<verb>_<topic>/evals/promptfoo.yaml
```

### 2. Fill in frontmatter

Copy the frontmatter template from `prompts/extract_wisdom/pattern.md` as a starting point. Required fields:

```yaml
---
id: <verb>_<topic>
version: 1.0.0
title: "..."
description: "..."
lane: claude | gpt | gemini | oss | cross-lab
category: analyze | create | extract | ... (one of 13)
tags: [...]
techniques: [...]
provenance:
  source: original | fabric | awesome-chatgpt-prompts | ...
  source_url: https://...
  attribution: "..."
  license: MIT | CC0 | Apache-2.0 | docs-quoted
eval:
  score: 0.0
  last_run: YYYY-MM-DD
  test_count: 0
red_team:
  status: pending
  audited: YYYY-MM-DD
psyche:
  applicable: false
  boundary: n/a
  risk: low
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### 3. Write the prompt body

After the frontmatter `---`, write the actual prompt. Use sections:

- **IDENTITY AND PURPOSE** — what the model is, what it does.
- **STEPS** — numbered procedure for the model.
- **OUTPUT INSTRUCTIONS** — exact format and constraints.
- **INPUT** — use `{{input}}` as the placeholder.

### 4. Add examples

In `examples.md`, show 2-5 paired input/output examples. Real examples, not placeholders.

### 5. Write evals

In `evals/promptfoo.yaml`:
- Declare at least 3 providers (try to span Claude, GPT, Gemini).
- Declare at least 3 test cases.
- Include the brand-voice `not-contains` assertions (delve, dive into, certainly, absolutely, it's worth noting).
- Include at least one `llm-rubric` assertion for output quality.

### 6. Write the README

80 words, human-readable summary. What it does, when to use it, what makes it good.

### 7. Run evals locally

```bash
cd prompts/<verb>_<topic>
npx promptfoo eval --config evals/promptfoo.yaml
```

Update `eval.score`, `eval.last_run`, `eval.test_count` in frontmatter with results.

### 8. Submit PR

Title format: `feat(<category>): add <verb>_<topic>`

PR body must include:
- One-paragraph summary.
- Why this pattern fills a gap (not duplicating existing patterns).
- Eval results (paste the score).
- Source attribution (if imported from upstream).

### 9. Review

Two reviewers required:
- One reviews schema compliance + brand voice.
- One reviews prompt quality + eval design.

### 10. Merge

Maintainer merges. `@prompt-librarian` may auto-route into rankings.

## Anti-patterns

- Never submit a pattern body that's a slight rewording of an existing pattern.
- Never strip attribution from upstream patterns.
- Never claim `lane: cross-lab` without testing on 3+ labs.
- Never use AI-slop phrases: "delve", "dive into", "certainly", "absolutely", "it's worth noting".
- Never publish `introspect/` or `profile/` patterns without the boundary + crisis disclosure.

## CI: what runs on your PR

When you open a PR that touches `prompts/**`, GitHub Actions runs the [`eval-on-pr`](./.github/workflows/eval-on-pr.yaml) workflow:

- **Schema validation** — every changed `pattern.md` is checked for a valid frontmatter shape against `prompt-engine/schema/pattern.schema.json`.
- **Attribution check** — every *new* pattern must declare `provenance.attribution` and `provenance.license`. PRs that strip attribution fail this gate.
- **Optional `promptfoo` run** — runs only when a maintainer has configured `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` as repo secrets. Forks and external contributors get a green check without burning maintainer API credit; maintainers can re-run the workflow with secrets attached when they want a live signal.

The PR is mergeable when schema + attribution checks pass. `promptfoo` is informational — it does not block the merge.

## Questions?

Open a discussion in the repo. We respond within a week.
