# Attribution

This library aggregates prompts from multiple upstream sources. Every imported pattern carries provenance in its `pattern.md` frontmatter:

```yaml
provenance:
  source: fabric | awesome-chatgpt-prompts | awesome-claude-prompts | anthropic-docs | openai-docs | google-docs | original | manual | harvested-from-paper
  source_url: https://...
  attribution: "Author Name / Project Name, License"
  license: MIT | CC0 | Apache-2.0 | docs-quoted
```

This file is the master provenance map. Every upstream source we import from is listed below with its license, URL, and the patterns we've imported (or plan to import).

---

## Fabric

- **Project**: [danielmiessler/fabric](https://github.com/danielmiessler/fabric)
- **Author**: Daniel Miessler
- **License**: MIT
- **What we use**: Folder-per-pattern shape + selected high-value patterns paraphrased with attribution
- **Patterns imported** (21 total):
  - `extract_wisdom` — from `data/patterns/extract_wisdom/`
  - `analyze_prose` — from `data/patterns/analyze_prose/` (paraphrased)
  - `analyze_paper` — from `data/patterns/analyze_paper/` (paraphrased)
  - `analyze_threat_report` — from `data/patterns/analyze_threat_report/` (paraphrased)
  - `analyze_logs` — from `data/patterns/analyze_logs/` (paraphrased)
  - `analyze_claims` — from `data/patterns/analyze_claims/` (paraphrased)
  - `analyze_incident` — from `data/patterns/analyze_incident/` (paraphrased)
  - `create_quiz` — from `data/patterns/create_quiz/` (paraphrased)
  - `create_summary` — from `data/patterns/create_summary/` (paraphrased)
  - `create_micro_summary` — from `data/patterns/create_micro_summary/` (paraphrased)
  - `create_5_sentence_summary` — from `data/patterns/create_5_sentence_summary/` (paraphrased)
  - `create_outline` — from `data/patterns/create_outline/` (paraphrased)
  - `extract_ideas` — from `data/patterns/extract_ideas/` (paraphrased)
  - `extract_insights` — from `data/patterns/extract_insights/` (paraphrased)
  - `extract_quotes` — from `data/patterns/extract_quotes/` (paraphrased)
  - `summarize` — from `data/patterns/summarize/` (paraphrased)
  - `summarize_micro` — from `data/patterns/summarize_micro/` (paraphrased)
  - `summarize_paper` — from `data/patterns/summarize_paper/` (paraphrased)
  - `improve_writing` — from `data/patterns/improve_writing/` (paraphrased)
  - `improve_prompt` — from `data/patterns/improve_prompt/` (paraphrased)
  - `compare_and_contrast` — from `data/patterns/compare_and_contrast/` (paraphrased)

When importing a Fabric pattern, we always:
1. Set `provenance.source: fabric`.
2. Link the specific pattern directory in `provenance.source_url`.
3. Credit Daniel Miessler in `provenance.attribution`.
4. Preserve the MIT license declaration.
5. **Paraphrase** — never verbatim copy. Intent preserved, wording original.

---

## awesome-chatgpt-prompts

- **Project**: [f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts)
- **Author**: f (Fatih Kadir Akın)
- **License**: code MIT, data CC0 (public domain)
- **What we use**: High-vote-count functional community prompts, paraphrased
- **Patterns imported** (10 total):
  - `check_plagiarism` (paraphrased)
  - `check_grammar` (paraphrased)
  - `audit_resume` (paraphrased)
  - `audit_security_config` (paraphrased)
  - `rate_content` (paraphrased)
  - `rate_argument` (paraphrased)
  - `write_essay` (paraphrased)
  - `write_cover_letter` (paraphrased)
  - `answer_interview_question` (paraphrased)
  - `answer_eli5` (paraphrased)

CC0 data means we can adapt freely, but we still attribute as a courtesy. Functional prompts only — stylized identity prompts (role-play, persona) are out of scope for this corpus.

---

## awesome-claude-prompts

- **Project**: [langgptai/awesome-claude-prompts](https://github.com/langgptai/awesome-claude-prompts)
- **Author**: langgptai community
- **License**: MIT
- **What we use**: Claude-specific patterns, especially those using XML tags and prefill
- **Patterns imported**: (pending Harvester run)

When importing, we tag `lane: claude` and preserve any XML-tag conventions from the original.

---

## Anthropic Docs

- **Source**: [docs.anthropic.com](https://docs.anthropic.com)
- **Author**: Anthropic
- **License**: docs-quoted (we cite specific doc URLs; original Anthropic content is copyrighted)
- **What we use**: Canonical "best-practice" patterns distilled from official prompt engineering guides
- **Patterns imported**: (pending Architect distillation)

When importing, we paraphrase + cite — we never reproduce verbatim copyrighted content.

---

## OpenAI Docs

- **Source**: [platform.openai.com/docs](https://platform.openai.com/docs)
- **Author**: OpenAI
- **License**: docs-quoted
- **What we use**: GPT-5 prompting guide patterns (developer role, reasoning_effort, Structured Outputs)
- **Patterns imported**: (pending Architect distillation)

Same paraphrase-+-cite rule as Anthropic.

---

## Google AI Docs

- **Source**: [ai.google.dev/docs](https://ai.google.dev/docs)
- **Author**: Google
- **License**: docs-quoted
- **What we use**: Gemini system-prompt patterns and grounding examples
- **Patterns imported**: (pending Architect distillation)

Same paraphrase-+-cite rule.

---

## DAIR.AI Prompt Engineering Guide

- **Project**: [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)
- **Author**: DAIR.AI
- **License**: MIT
- **What we use**: The technique taxonomy (CoT, ReAct, self-consistency, etc.) as cross-cutting `techniques:` tags only — not pattern bodies.

We import vocabulary, not prompts. See [`taxonomy/techniques.yaml`](./taxonomy/techniques.yaml).

---

## FrankX Prompt Corpus

- **Source**: `frankxai/FrankX` repo, `lib/prompts.ts`
- **Author**: Frank Riemer (FrankX)
- **License**: original — re-licensed MIT on release of this library
- **What we use**: Working prompt collection used in FrankX content + product workflows
- **Patterns imported**: 0 (0 skipped — image/video/music tools route to dedicated pillars)
- **Brand-voice scrub** applied on import (banned phrases removed: delve, dive into, certainly, absolutely, it's worth noting)

Migration report: `seed-batch-report.json` (per-pattern lane mapping + skip reasons).

---

## Anti-patterns

- **Never strip attribution** when importing. If you can't track the source, don't import.
- **Never lift from closed-source marketplaces** (PromptHub, PromptBase, etc.). Permission + data shape unknown.
- **Never claim a pattern is "original"** if it's substantially derived from an upstream source. Track the lineage.
- **Never weaken an upstream license**. If a pattern came in as Apache-2.0, it stays Apache-2.0.

---

## Adding a new upstream source

If you want to harvest from a new project not listed above:

1. Verify the source's license permits redistribution + modification.
2. Open an issue proposing the source. Include URL, license, estimated pattern count, and quality assessment.
3. Once approved, add an entry to this file before your first import PR.
4. Use the Harvester agent (`@prompt-harvester`) for bulk imports — it auto-fills provenance.
