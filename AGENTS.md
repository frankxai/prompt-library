# Prompt Library — Agent Instructions

> Repo: `prompt-library` · Classification: content corpus · Owner: FrankX AI · Remote: https://github.com/frankxai/prompt-library.git

This is the curated, machine-readable corpus of elite prompts — attributed, licensed, and (where CI has a key) evaluated. The companion repo [`prompt-engine`](https://github.com/frankxai/prompt-engine) holds the 13-agent team that produces and maintains these patterns; agent/flow changes go there, not here.

## Working in this repo

- **No package manager here.** There is no `package.json`. Do not add `npm install` / `pnpm install` instructions without first adding real tooling — today everything (rankings, registry) is hand-maintained.
- **Branch:** `main` is the trunk. Cut a feature branch per change; PR back to `main`.
- **CI:** `.github/workflows/eval-on-pr.yaml` runs on PRs touching `prompts/**`. It enforces attribution/license on new patterns and lists changed patterns for schema checking (the schema-validation step is a stub — see the workflow's `TODO`). promptfoo eval only fires if `OPENAI_API_KEY`/`ANTHROPIC_API_KEY` secrets are set; otherwise it's skipped, not failed.

## Repo layout

| Path | What |
|---|---|
| `prompts/<verb>_<topic>/` | One folder per pattern: `pattern.md` (frontmatter + prompt), `examples.md`, `evals/promptfoo.yaml`, `README.md` |
| `taxonomy/lanes.yaml`, `categories.yaml`, `techniques.yaml` | Controlled vocab a pattern's frontmatter must draw from |
| `rankings/top-50.md`, `by-eval-score.md` | Hand-maintained ranking views — update in the same PR as the pattern change |
| `ATTRIBUTION.md` | Master provenance map for imported (non-original) patterns |
| `contributing.md`, `CODE_OF_CONDUCT.md` | Contribution process and community norms |
| `.github/workflows/eval-on-pr.yaml` | The only CI in this repo — read it before claiming "CI validates X" |

## Conventions

- Verb-prefixed pattern folder names (Fabric convention): `extract_wisdom`, not `wisdom_extractor`.
- Every new `pattern.md` needs `provenance.attribution` and `provenance.license` in frontmatter — CI blocks new patterns missing either.
- Patterns in `introspect`/`profile` categories carry hard psyche-layer boundaries (maps only, no clinical framing, explicit crisis-routing) — see the README's "Psyche layer notice" before touching those.
- Never strip attribution when importing from Fabric / awesome-*-prompts / lab docs.
- No AI-slop phrases in pattern bodies or docs: "delve", "dive into", "certainly", "absolutely", "it's worth noting".

## What not to touch

- Don't invent or claim automation (build scripts, CI gates, package scripts) that doesn't exist in this tree — verify against `.github/workflows/` and top-level files before documenting a command.
- `.asph-wip/` is another harness's scratch state — never stage it.
