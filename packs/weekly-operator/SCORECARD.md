# Scorecard: Weekly Operator

Status: **not yet run.** No result below is a measurement until this file carries a run date, model ids and numbers.

## Why there is no run yet (2026-10-21)

- No model API key was available to the build session (`AI_GATEWAY_API_KEY` and `OPENROUTER_API_KEY` were both unset).
- The machine preflight (`pp preflight --workload build`) returned HOLD: 799 MB RAM free against 8,192 MB required, CPU at 88%.

## How to run it

```bash
cd packs/weekly-operator/evals
AI_GATEWAY_API_KEY=... npx promptfoo@latest eval -j 2 -o results.json
npx promptfoo@latest view
```

Size of a full run: 16 builder cases + 6 held-out cases (22), 3 arms (weekly-operator, gtd-weekly-review, no-skill), 3 models, plus one grader call per `llm-rubric`.

## What to report here

| Arm | Model | Outcome pass rate, builder cases | Outcome pass rate, held-out cases | Multi-week cases |
|---|---|---|---|---|
| weekly-operator | | | | |
| gtd-weekly-review | | | | |
| no-skill | | | | |

Then list every failed case for weekly-operator with the grader's reason, and say what was changed. The publish rule in LISTING.md: Weekly Operator must beat both other arms on `outcome`, overall and on the multi-week cases.

## Known limits of the harness

- Every arm is tested as instructions only. The GTD skill's three Python scripts are not run, which costs it some of its value; its instructions still reach the model in full.
- The harness pastes the folder into the message instead of letting the agent read files with tools. It measures whether the instructions produce the right plan from the files, not whether an agent finds the files. The G1 install log and the mini buyer test cover real file access.
- The grader is a model (Gemini 4 Argon). The publish checklist requires a human check of 5 sampled verdicts.
