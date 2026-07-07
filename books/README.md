# Prompt Books

Prompt books group related prompt patterns into an operating playbook. Use this folder when a raw prompt from Frank should be preserved, refined, and turned into a reusable workflow.

`prompts/` remains the source for individual evaluated patterns. `books/` is for collections, capture notes, prompt variants, usage guidance, and manual rubrics that tie several patterns together.

## Save Protocol

When Frank gives a raw prompt and asks to save it:

1. Preserve the raw text exactly, including typos, in the nearest matching book.
2. Add a refined version with a clear purpose, input contract, output contract, failure modes, and eval rubric.
3. Redact secrets, credentials, recovery keys, private keys, and private `.env` values.
4. If the prompt is reusable as a standalone pattern, also scaffold `prompts/<verb>_<topic>/`.
5. Mark attribution as `original` unless adapted from a named source.
6. Leave monetized or public packaging as a separate step after a red-team pass.

## Prompt Request Protocol

When Frank asks for a prompt, provide both versions by default:

1. `Original Prompt`: either the exact raw prompt Frank supplied, or a clean first-pass prompt that preserves his stated intent.
2. `Optimized Prompt`: a tightened version using the Prompt Optimizer checklist: specificity, success criterion, examples, structure, contradiction audit, output contract, safety boundary, and token discipline.
3. `Optimization Notes`: visible changes, rationale, predicted delta, and target lab if relevant.
4. `Eval Rubric`: quick checks that prove the optimized prompt is better than the original.
5. `Save Path`: if Frank asks to save it, place the raw and optimized versions in the nearest prompt book and scaffold a standalone `prompts/<verb>_<topic>/` pattern when reusable.

Apply the current local prompt-engine doctrine first. When Frank asks for "latest" or model-specific best practices, verify against current official model docs before finalizing.

Current source anchors checked on 2026-06-26:

- OpenAI prompt engineering: https://developers.openai.com/api/docs/guides/prompt-engineering
- Anthropic Claude prompting best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Gemini prompt design strategies: https://ai.google.dev/gemini-api/docs/prompting-strategies

Use "superintelligence" as an aspiration for proactive expert-grade usefulness, not as a capability claim. Keep prompts bounded by real tools, permissions, safety, and verification.

## Folder Shape

```text
books/
  <book-slug>/
    README.md
    prompt-book.md
    evals/
      <book-slug>-rubric.md
```

Use `books/_template/prompt-book.md` for new books.
