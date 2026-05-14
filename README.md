# Prompt Library

> A Library-of-Alexandria node aggregating elite prompts across labs with full attribution, licensing, evaluation scores, and red-team verdicts.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-Contributor%20Covenant%202.1-blue.svg)](./CODE_OF_CONDUCT.md)
[![Status](https://img.shields.io/badge/status-pre--extraction-orange.svg)]()

---

## What it is

A curated, machine-readable corpus of prompts. Every entry:

- **Evaluated** — promptfoo eval score across multiple labs.
- **Attributed** — source, author, license declared.
- **Lab-tagged** — Claude / GPT / Gemini / OSS / Cross-lab.
- **Red-teamed** — adversarial audit before publish.
- **Versioned** — semver bump rules for changes.

The corpus is produced by the agents in the companion repo [`frankxai/prompt-engine`](https://github.com/frankxai/prompt-engine).

Three commitments:

1. **No vibes.** Every published prompt has provenance, license, eval score, and red-team verdict.
2. **Library of Alexandria.** We aggregate, attribute, and preserve — never strip attribution.
3. **Same schema for everyone.** Frank, an LLM, the open-source world — all use the same folder-per-pattern shape.

---

## How patterns are structured

Folder-per-pattern (Fabric-inspired, extended with frontmatter):

```
prompts/
  <verb>_<topic>/
    pattern.md           # YAML frontmatter + the prompt itself
    examples.md          # 2-5 input/output exemplars
    evals/
      promptfoo.yaml     # declarative test cases
      regression.yaml    # known-good outputs to defend against
    variants/
      claude.md          # optional lab-specific variant
      gpt.md
      gemini.md
      llama.md
    README.md            # 80-word human summary
```

Pattern frontmatter validates against [`prompt-engine/schema/pattern.schema.json`](https://github.com/frankxai/prompt-engine/blob/main/schema/pattern.schema.json) (JSON Schema draft-07).

See [`prompts/extract_wisdom/`](./prompts/extract_wisdom/) for a complete worked example.

---

## Lanes

Every pattern is tagged with exactly one lane. Lanes capture lab-specific doctrine.

| Lane | Description |
|------|-------------|
| **claude** | Anthropic-optimized — XML tags, prefill, extended thinking, virtue prompting |
| **gpt** | OpenAI/GPT-5-optimized — developer role, reasoning_effort, Structured Outputs |
| **gemini** | Google-optimized — system-at-top, "think very hard" trigger, native grounding |
| **oss** | Open-source models — Llama / Mistral / Qwen / DeepSeek chat templates |
| **cross-lab** | Lab-neutral patterns that work everywhere with minimal adaptation |

See [`taxonomy/lanes.yaml`](./taxonomy/lanes.yaml) for full descriptions.

---

## Categories

Verb-prefixed (Fabric convention). Every pattern lives in exactly one category.

| Category | Verb pattern | Example |
|----------|-------------|---------|
| **analyze** | Pull out structure or meaning | analyze_paper, analyze_argument |
| **create** | Generate something new | create_outline, create_persona |
| **extract** | Lift specific information | extract_wisdom, extract_quotes |
| **summarize** | Condense | summarize_paper, summarize_meeting |
| **answer** | Respond to a question | answer_aloud, answer_terse |
| **audit** | Quality check | audit_grammar, audit_bias |
| **check** | Verify a fact or claim | check_citations, check_facts |
| **compare** | Side-by-side | compare_solutions, compare_papers |
| **improve** | Refine an artifact | improve_writing, improve_prompt |
| **write** | Author a long-form piece | write_essay, write_article |
| **rate** | Score against criteria | rate_argument, rate_resume |
| **introspect** | IFS / journaling | introspect_part, introspect_pattern |
| **profile** | Psychometric instruments | profile_big_five, profile_attachment |

See [`taxonomy/categories.yaml`](./taxonomy/categories.yaml) for full list.

The `introspect` and `profile` categories carry hard boundaries — see the [Psyche layer notice](#psyche-layer-notice) below.

---

## Techniques (cross-cutting tags)

Beyond categories, patterns are tagged with cross-cutting **techniques** from the DAIR.AI taxonomy:

`chain-of-thought`, `tree-of-thought`, `react`, `constitutional`, `self-consistency`, `atom-of-thoughts`, `few-shot`, `zero-shot`, `prefill`, `xml-tags`, `structured-output`, `retrieval-augmented`.

See [`taxonomy/techniques.yaml`](./taxonomy/techniques.yaml) for descriptions + paper links.

---

## How to contribute

Pull requests welcome. Quick path:

1. Read [`contributing.md`](./contributing.md) and [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).
2. Pick a verb-prefix that fits your prompt's purpose.
3. Scaffold `prompts/<verb>_<topic>/` with:
   - `pattern.md` (frontmatter + body)
   - `examples.md` (2-5 input/output pairs)
   - `evals/promptfoo.yaml` (at least 3 test cases)
   - `README.md` (80-word human summary)
4. Submit PR.
5. CI runs:
   - Schema validation (`promptfoo validate`)
   - Eval execution (`promptfoo eval`)
   - Attribution check (frontmatter `provenance` required)
   - Brand-voice gate (no banned phrases)
6. Two reviewers must sign off before merge.

### Required frontmatter

Every `pattern.md` MUST have:

- `id`, `version`, `title`, `description`
- `lane`, `category`, `tags`, `techniques`
- `provenance.source`, `provenance.attribution`, `provenance.license`
- `eval.score`, `eval.last_run`, `eval.test_count`
- `red_team.status`, `red_team.audited`
- `psyche.applicable`, `psyche.boundary`, `psyche.risk`
- `created`, `updated`

A pattern PR without complete frontmatter is auto-blocked by CI.

---

## How to import from upstream

The Harvester agent (in `prompt-engine`) handles bulk imports. To import a single pattern manually:

1. Locate the source pattern (Fabric, awesome-*-prompts, paper, etc.).
2. Create `prompts/<verb>_<topic>/pattern.md` with frontmatter:
   - `provenance.source: fabric` (or `awesome-chatgpt-prompts`, etc.)
   - `provenance.source_url: <direct link to source>`
   - `provenance.attribution: "<Author Name> / <Project>, <License>"`
   - `provenance.license: <SPDX identifier>`
3. Paraphrase the pattern body if the original was awkward; preserve intent. Direct verbatim copy only when license + style permit.
4. Append entry to [`ATTRIBUTION.md`](./ATTRIBUTION.md) if not already listed.
5. Submit PR.

### Initial upstream sources (with attribution)

| Source | License | URL |
|--------|---------|-----|
| [Fabric](https://github.com/danielmiessler/fabric) | MIT | Daniel Miessler, 200+ patterns |
| [awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) | code MIT / data CC0 | f, ~200 entries |
| [awesome-claude-prompts](https://github.com/langgptai/awesome-claude-prompts) | MIT | langgptai, ~70 categories |
| Anthropic / OpenAI / Google docs | docs-quoted | Lab official prompt engineering guides |
| [DAIR.AI Prompt Engineering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) | MIT | DAIR.AI, technique taxonomy |

See [`ATTRIBUTION.md`](./ATTRIBUTION.md) for the full provenance map.

---

## Rankings

Two ranking views:

- [`rankings/top-50.md`](./rankings/top-50.md) — Editorial picks, curated by `@prompt-librarian`.
- [`rankings/by-eval-score.md`](./rankings/by-eval-score.md) — Auto-generated from promptfoo eval scores.

Re-run `pnpm rank` to rebuild the auto-generated view.

---

## Psyche layer notice

Patterns in the `introspect` and `profile` categories carry hard boundaries because they touch self-reflection and personality assessment:

- **Not a therapist.** Not diagnostic. Not clinical. No DSM terminology.
- **No unburdening, no trauma processing, no crisis support.**
- **Maps only, never verdicts.** Every framing is a lens, not a truth claim.
- **Crisis triggers** (suicidal ideation, self-harm, dissociation, abuse disclosure) route immediately to:
  - US: [988](https://988lifeline.org/)
  - UK: [Samaritans 116 123](https://www.samaritans.org/)
  - International: [Befrienders Worldwide](https://befrienders.org/)

If you're contributing to `introspect/` or `profile/`, your PR must include explicit boundary frontmatter and crisis-routing in the pattern body. CI enforces this.

---

## Anti-patterns

- Never publish a pattern without provenance, license, eval score, and red-team verdict.
- Never strip attribution when importing.
- Never lift from closed-source marketplaces (PromptHub / PromptBase). Permission unknown.
- Never let `introspect/` or `profile/` patterns claim clinical authority.
- Never use AI-slop phrases: "delve", "dive into", "certainly", "absolutely", "it's worth noting".

---

## License

Library structure + curation: **MIT**. See [`LICENSE`](./LICENSE).

Imported patterns retain their original licenses (CC0, MIT, Apache-2.0). Per-pattern license declared in frontmatter `provenance.license`. See [`ATTRIBUTION.md`](./ATTRIBUTION.md) for the master provenance map.

---

## Acknowledgments

Standing on the shoulders of:

- [Fabric](https://github.com/danielmiessler/fabric) (Daniel Miessler, MIT) — folder-per-pattern shape
- [awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) (f, CC0)
- [awesome-claude-prompts](https://github.com/langgptai/awesome-claude-prompts) (langgptai, MIT)
- [DAIR.AI Prompt Engineering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) (DAIR.AI, MIT)
- [promptfoo](https://github.com/promptfoo/promptfoo) — declarative eval harness (MIT)

---

_Elite prompts. Attributed. Evaluated. Red-teamed. Preserved._
