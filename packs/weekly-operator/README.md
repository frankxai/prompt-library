# Weekly Operator

Your AI agent runs your week from a folder of plain Markdown files you own. Each Sunday it reads last week's file, asks what happened to every unfinished item, and plans a week that fits the time you actually had, not the time you hoped for.

It runs inside the agent you already use. No app, no account, no subscription, no extra API key. Your plans never leave your computer unless you put them somewhere yourself.

## What it does

| Say | It does |
|---|---|
| "set me up" | Asks up to five questions and creates `life/goals.md`, `life/habits.md` and this week's file |
| "plan my week" | Reads last week, gets a decision on each leftover, sets capacity from what you really did, picks at most three priorities tied to your goals |
| "morning" | Picks one top item for today and checks yesterday's |
| "weekly review" | Counts what happened from your notes, one lesson, one change for next week |
| "habit check-in" | Logs the week; shrinks a habit that keeps slipping, grows one that sticks |
| "quarterly goals" | Reviews each goal on its evidence, keeps at most three active |

The folder looks like this. `example/life/` shows two real weeks, the second planned from the first.

```
life/
  goals.md
  habits.md
  week-2026-W42.md
  week-2026-W43.md
```

## What it will not do

It plans and reflects. It gives no health, diet, medical or psychological advice. If you write something that sounds like real distress, it stops planning and points you to people who can help.

## Install

| Tool | Where the skill goes |
|---|---|
| Claude Code | copy `skills/weekly-operator` to `~/.claude/skills/` (all projects) or `.claude/skills/` in your notes folder |
| Codex CLI | copy `skills/weekly-operator` to `.agents/skills/` in your notes folder |
| Gemini CLI | copy `skills/weekly-operator` to your Gemini skills folder |
| ChatGPT, Claude.ai, Gemini in the browser | paste `prompt.md` as your first message, then paste your files |

Then open your agent in the folder where you want `life/` to live and say "set me up".

## Re-run the tests

The `evals/` folder holds the suite we score it with: 16 cases we wrote and held-out cases written by a different AI provider (Codex) that we did not tune against. Each case runs three ways: with Weekly Operator, with no skill, and with the strongest free alternative we found (the MIT-licensed `weekly-review` skill from alirezarezvani/claude-skills). The same rubric grades all three.

```bash
cd evals
AI_GATEWAY_API_KEY=... npx promptfoo@latest eval -j 2
```

Through OpenRouter instead:

```bash
cd evals
OPENROUTER_API_KEY=... npx promptfoo@latest eval -j 2 \
  -r openrouter:anthropic/claude-sonnet-5.5 -r openrouter:openai/gpt-6-astra -r openrouter:google/gemini-4-argon \
  --grader openrouter:google/gemini-4-argon
```

Results and their date are in `SCORECARD.md`.

## Licence

MIT. Built from six original planning patterns by Frank Riemer in [frankxai/prompt-library](https://github.com/frankxai/prompt-library), rewritten into one skill with memory.
