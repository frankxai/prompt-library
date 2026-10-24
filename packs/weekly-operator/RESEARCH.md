# Weekly Operator: research and the bar

Author: Claude (Opus 5.5), 2026-10-21. All sources read on 2026-10-21. Review state: not yet reviewed by a second provider.

## The buyer

Someone who already uses an AI coding agent (Claude Code, Codex, Gemini CLI) for work and wants the same agent to keep their personal week on track. They have tried a weekly review before and dropped it. They do not want another app account or subscription, and they would rather their plans sit in plain files they own.

## What they use today

| Option | Cost | What it does well | Where it falls short for this buyer |
|---|---|---|---|
| **GTD weekly review** (David Allen's checklist) | Free | The canonical method: get clear, get current, get creative. The official PDF calls the review the critical habit of the whole system. | A checklist, not a memory. Nothing carries numbers from one week to the next unless the person does it by hand. |
| **Sunsama** | $17/month billed yearly, $22 monthly, 14-day trial | Guided weekly review that carries over unfinished tasks and objectives, and reviews time by channel. Incomplete tasks roll over automatically at midnight. | Subscription and an app account; data lives in Sunsama. Users have asked for a way to stop automatic rollover because carried copies pile up. |
| **Notion / Todoist templates** (e.g. Asian Efficiency's free weekly review template) | Free to a few dollars | A page to fill in each week. | Static: the template does not read last week or adjust anything. |
| **`weekly-review` skill, alirezarezvani/claude-skills** | Free, MIT | The most widely distributed free planning skill (repo has 28,498 stars and ships to Claude Code, Codex, Gemini CLI). Walks the GTD loop and gates completion with Python scripts. | Built for a trusted-system audit of open loops. No week file, no capacity number, no habit or goal continuity between weeks. |
| **davidhariri/life-system** | Free, no licence stated | Plain-text life system in Claude Code (843 stars). Its `morning` skill reads yesterday's journal and carries tasks forward. | Daily only; no weekly capacity, habit or quarterly flow. No licence, so it cannot be bundled or compared verbatim. |
| **duncan-buildroom/freeskills `weekly-review`** | Free, no licence stated | A 20-minute Sunday reset with "one thing" and a forced cut list. | Builder-focused; reads build logs, not a personal plan; one week at a time. |

## The one to beat, and on what

**Must beat: the `weekly-review` skill from alirezarezvani/claude-skills**, because it is the free option a buyer is most likely to have already installed, and it is MIT so we can test against it verbatim.

**Dimension: week-to-week continuity.** On a second week, Weekly Operator must use the first week's file: name every unfinished item and get a decision on it, set this week's capacity from what was actually done, apply last week's lesson, and adjust habits on two weeks of evidence. The eval measures this on multi-week cases (`evals/cases.yaml`: plan after review, third carry, restart after a gap, freeform last week, capacity trend, week 53) and on held-out cases written by Codex.

**Against Sunsama** we compete on ownership and price (a one-time €7, plain files, runs in the agent the buyer already pays for) and on one behaviour: Sunsama rolls unfinished work over automatically; Weekly Operator makes the person decide each leftover and stops the third silent carry. We do not beat Sunsama on calendar integration and the listing must not claim to.

## What we kept from Frank's six patterns

| Source pattern (prompt-library commit b949b97) | Kept | Cut |
|---|---|---|
| `cross_weekly_planning_session` | top priorities, fixed commitments, buffer time, day-by-day plan | Eisenhower matrix as a ritual, generic "renewal activities" |
| `claude_habit_design_workshop` | cue, tiny (2-minute) version, tracking, "when I miss a day" | the 30-day plan, identity slogans |
| `cross_morning_routine_designer` | one most-important task, protecting the focus block | wake-up, body activation, nutrition and hydration advice (health claims) |
| `claude_annual_goal_setting_system` | outcome with a measure and date, top 3 priorities, weekly review ritual | life-area 1-10 audit, "dream state" visualisation |
| `chatgpt_chatgpt_weekly_meal_planner` | meals matched to the day's load, one shopping list | calories, weight-loss and diet goals (health claims) |
| `claude_deep_self_discovery_journaling` | one-sentence lesson, what to change | healing, shadow work, body sensations (therapy territory) |

## Sources (read 2026-10-21)

- GTD weekly review PDF, David Allen Company: https://gettingthingsdone.com/wp-content/uploads/2014/10/2016-GTD-Weekly-Review-.pdf
- Sunsama pricing: https://www.sunsama.com/pricing
- Sunsama guided planning and reviews: https://sunsama.com/features/guided-planning-and-reviews
- Sunsama task rollover: https://help.sunsama.com/docs/task-rollover-and-recurring-tasks-the-basics
- Sunsama roadmap request to stop rollover of recurring tasks: https://roadmap.sunsama.com/improvements/p/option-to-not-rollover-incomplete-repeating-tasks
- Asian Efficiency, Notion templates (free weekly review template): https://www.asianefficiency.com/technology/best-notion-templates-productivity/
- alirezarezvani/claude-skills `weekly-review` (commit 27cfcd0): https://github.com/alirezarezvani/claude-skills/tree/main/productivity/weekly-review
- davidhariri/life-system: https://github.com/davidhariri/life-system
- duncan-buildroom/freeskills `weekly-review`: https://github.com/duncan-buildroom/freeskills/tree/main/weekly-review
- Agent Skills specification: https://agentskills.io/specification

Star counts are from `gh api repos/<owner>/<repo>` on 2026-10-21 and will drift.
