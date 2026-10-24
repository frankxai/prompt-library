# Prompt Optimizer

Paste a prompt, get back a better one with the reasons spelled out: what changed, what conflicts were fixed, and a short test you can run to see if it actually works better.

It runs inside the AI tool you already use. No account, no app, no extra API key.

## What's in the pack

| File | What it's for |
|---|---|
| `skills/prompt-optimizer/SKILL.md` | The skill. Works in Claude Code, Codex, Gemini CLI and other tools that read the Agent Skills format |
| `prompt.md` | The same instructions as a plain prompt, for ChatGPT, Claude.ai or Gemini in the browser |
| `evals/` | The 10-case test suite we score it with, so you can re-run it yourself |
| `SCORECARD.md` | Our latest results, with the date, models and the comparison against a plain "improve this prompt" request |

## Install

**Claude Code:** copy `skills/prompt-optimizer` into `~/.claude/skills/` (all projects) or `.claude/skills/` (one project). Then ask "optimize this prompt".

**Codex CLI:** copy `skills/prompt-optimizer` into `.agents/skills/` in your project.

**Gemini CLI:** copy `skills/prompt-optimizer` into your Gemini skills folder.

**Browser chat:** paste the contents of `prompt.md` as your first message, then paste the prompt you want improved.

## Re-run the tests

```bash
cd evals
AI_GATEWAY_API_KEY=... npx promptfoo@latest eval
```

The suite compares this skill against a plain "improve this prompt" request on the same 10 cases, graded on the same rubric.

## Licence

MIT. The source is public in [frankxai/prompt-library](https://github.com/frankxai/prompt-library). The pack is the packaged, tested version with its scorecard.
