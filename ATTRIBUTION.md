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
- **What we use**: Folder-per-pattern shape + selected high-value patterns lifted with attribution
- **Patterns imported**:
  - `extract_wisdom` — from `data/patterns/extract_wisdom/`

When importing a Fabric pattern, we always:
1. Set `provenance.source: fabric`.
2. Link the specific pattern directory in `provenance.source_url`.
3. Credit Daniel Miessler in `provenance.attribution`.
4. Preserve the MIT license declaration.

---

## awesome-chatgpt-prompts

- **Project**: [f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts)
- **Author**: f (Fatih Kadir Akın)
- **License**: code MIT, data CC0 (public domain)
- **What we use**: High-vote-count community prompts, especially role-based ones
- **Patterns imported**: (pending Harvester run)

CC0 data means we can adapt freely, but we still attribute as a courtesy.

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
