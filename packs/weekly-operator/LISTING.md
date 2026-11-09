# Gumroad listing draft: Weekly Operator

Status: DRAFT. Not for publication until every box in "Before publish" is ticked. Price and publish are Frank's. This offer is €7, so it may use the fast lane Frank ruled on 2026-10-21.

## Listing

**Name:** Weekly Operator: your AI agent runs your week from files you own

**Price:** €7

**Summary line:** A weekly review that remembers last week. Plain Markdown files, your own AI agent, no subscription.

**Description:**

Most weekly planners start from zero every Sunday. Weekly Operator starts from last week.

It is one skill for the AI agent you already use (Claude Code, Codex CLI, Gemini CLI, or pasted into ChatGPT, Claude.ai or Gemini). It keeps three kinds of plain Markdown file in a `life/` folder on your computer: your goals for the quarter, your habits, and one file per week.

Each time you run it, it reads those files first. So when you plan a new week it:

- names every unfinished item from last week and asks what to do with it: carry it to a day, drop it, or park it
- notices when the same item has slipped three weeks running and helps you shrink it or let it go
- sets the week's size from what you actually got done, and tells you the number it used
- keeps you to three priorities, each tied to a goal

Five short flows: plan the week, morning, weekly review, habit check-in and quarterly goals.

**Tested against the alternatives, with the numbers shown.** We run it on 16 cases of our own plus 6 held-out cases written by a different AI provider, against no skill and against the most popular free weekly-review skill. The scorecard in the download shows every result. [SCORECARD SUMMARY GOES HERE AFTER THE RUN]

**Your files, your agent.** No account, no app, no subscription, no extra API key. The files stay where you put them.

**What it is not:** a calendar app, a habit tracker with reminders, or health, diet or mental-health advice.

## Claims and evidence (gate G0)

| Claim on the listing | Evidence |
|---|---|
| Reads last week before planning; names every unfinished item and asks for a decision | cases "Plan week 2 from week 1's review", "Week 2 from a freeform, messy week 1"; SKILL.md Plan step 1 |
| Spots an item slipping three weeks running | case "Third carry of the same item forces a real decision"; SKILL.md Plan step 2 |
| Sets the week's size from what you actually did, and says the number | cases "Plan week 2 from week 1's review", "Wants 12 blocks after three weeks of 4 to 6"; SKILL.md Plan step 3 |
| At most three priorities, each tied to a goal | case "Plan week 2 from week 1's review"; SKILL.md Plan step 4 |
| Five flows: plan, morning, review, habits, quarterly | one or more cases per flow in `evals/cases.yaml` |
| Plain Markdown files you own | `example/life/`; true by construction |
| Works in Claude Code, Codex CLI, Gemini CLI, browser chat | G1 install log (pending) |
| Tested on 16 + 6 held-out cases vs no skill and the most popular free skill | `evals/promptfooconfig.yaml`, `evals/heldout/`, SCORECARD.md (pending) |
| No health, diet or mental-health advice | cases "Diet pressure", "Distress during a review", "Habit check-in"; SKILL.md Boundaries |
| No account, no subscription, no extra API key | runs inside the buyer's own agent; true by construction |

Do not claim: calendar sync, reminders, "better than Sunsama", or any outcome for the buyer's productivity or wellbeing.

## Before publish (fast lane, offers of €7 or less)

- [ ] **Claims backed by evidence:** every claim above maps to a passing case or is cut
- [ ] **Eval run** on all three models; SCORECARD.md written with date, model ids, outcome score for Weekly Operator vs no skill vs `gtd-weekly-review`, split into builder cases and held-out cases, with failures listed
- [ ] **Beats both baselines** on the `outcome` metric, overall and on the multi-week cases. If it does not, do not publish; revise and re-run
- [ ] **Grader check:** a human verdict on 5 sampled outputs agrees with the `llm-rubric` verdict
- [ ] **Install log (G1):** install tested in Claude Code and one other tool, two consecutive weeks run, log attached
- [ ] **Mini buyer test:** a fresh agent with no estate context runs setup, a plan, and a second-week plan for a realistic person; the second week visibly uses the first
- [ ] **Different-provider review:** Codex reviews the pack as a buyer who declined to pay; findings fixed
- [ ] **Real test purchase:** one real €7 purchase on Gumroad: VAT shown correctly, receipt, download, refund path, and the EU notice that immediate download ends the 14-day withdrawal right, with the buyer's consent captured at checkout
- [ ] Frank sets price and clicks publish
