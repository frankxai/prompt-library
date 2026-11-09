# Brief: write held-out eval cases for "Weekly Operator" (you are the independent test author)

You are writing test cases for a product you have NOT seen the instructions of. Do not look for
them. Write only what a skeptical buyer would check.

## The product (public description)
Weekly Operator is a EUR 7 agent skill for Claude Code, Codex and Gemini CLI. It runs a person's
week from a plain folder of Markdown files they own:
- life/goals.md: up to 3 active quarterly goals, plus a "Not now" list
- life/habits.md: a few habits with a weekly log
- life/week-YYYY-WW.md: one file per ISO week with Plan, Days and Review sections
Flows: weekly review, plan the week, morning setup, habit check-in, quarterly goals.
The promise is continuity: each run reads the previous week's file and adjusts (unfinished items
get an explicit decision, the plan fits the time actually available last week, habits are adjusted
on evidence). It makes no health, medical or psychological claims; journaling stays reflective.
The exact file layout is in FOLDER-FORMAT.md in this folder (templates only).

## How the test harness works
Each case gives the model: today's date, the full content of every file under a fixture folder,
and one user request. The model cannot write files; it must print each file it would write in a
fenced block preceded by `File: <path>`. Three systems are compared on the same case, so the
rubric must judge the OUTCOME for the user, not whether a particular template was followed.

## What to produce (in this folder only)
1. `cases.yaml`: a YAML list of 6 promptfoo test cases. Each item:
   ```yaml
   - description: "Held-out: <short name>"
     vars:
       fixture: heldout/fixtures/<case-slug>
       today: "Monday 26 October 2026"
       request: "<what the user types>"
     assert:
       - type: llm-rubric
         metric: outcome
         threshold: 0.8
         value: |
           <concrete, checkable criteria a grader can verify from the output alone>
       # optional deterministic checks, also metric: outcome, e.g. icontains / not-icontains
   ```
2. `fixtures/<case-slug>/life/*.md` for each case (omit the folder entirely for a first-run case,
   and use `fixture: none`).

## Requirements
- At least 3 of the 6 cases must be multi-week: the right answer depends on details in an earlier
  week file (e.g. something unfinished, a capacity mismatch, a habit trend, a goal with no
  progress for weeks). Make the details specific (names, numbers) so the grader can check them.
- Include one case that crosses a year boundary or ISO week 53 (2026 has a W53).
- Include one case that tests a boundary: health/diet/medical pressure, or emotional distress, or
  a secret (password/PIN) sitting in a file that must not be echoed.
- Realistic people with ordinary lives (shift work, kids, a side project, study). Dates in late
  2026 or early 2027. Write everything in plain English.
- Rubrics: 3 to 6 concrete criteria each; never "is helpful". No criterion may require exact
  wording from the product's internals, which you have not seen.
- Validate cases.yaml parses as YAML before you finish. Do not write outside this folder.
