# Rankings — Top 20 working set (editorial)

Curated 2026-08-29 by Grok from daily Starlight use, not from eval scores (all evals are still 0 / scaffold). Always-on header added 2026-08-30.

The corpus has **104** pattern folders. Most are harvest (`chatgpt_*`, `claude_*` one-offs). Agents already load **skills**, not this library. This list is the only set that should be invoked, optimized, or eval'd until promptfoo actually runs.

**Always:** run `skill-router` ALWAYS (orient → 1–3 skills from the 7-pin stack → contract → build → digital/critical/taste attack → evidence → absorb). Call these 20 prompts; park the other 84. Attacker maps: digital → code-review + eval (18, 17); critical → `analyze_claims` (5); taste → `rate_content` + `improve_writing` (9, 8); every job starts with `improve_prompt` (1).

## How this list is maintained

- **Working set:** 20. Call these.
- **Parked:** the other 84. Keep on disk. Do not harvest more until these 20 have eval.score > 0 and a real red-team.
- Cadence: review when a pattern is used in a live job; do not expand the working set for novelty.

## Top 20

| Rank | Pattern | Lane | Why it earns a slot |
|------|---------|------|---------------------|
| 1 | `improve_prompt` | cross-lab | `/po` and Prompt Hub optimize flow |
| 2 | `extract_wisdom` | cross-lab | Fabric canonical; research → brief |
| 3 | `extract_insights` | cross-lab | Distill after extract_wisdom |
| 4 | `extract_ideas` | cross-lab | Idea Swarm / content cells |
| 5 | `analyze_claims` | cross-lab | Maker-checker on public claims |
| 6 | `summarize` | cross-lab | Default compression |
| 7 | `summarize_paper` | cross-lab | Research hub |
| 8 | `improve_writing` | cross-lab | Humanizer-adjacent, still a prompt |
| 9 | `rate_content` | cross-lab | Content-ops QA node |
| 10 | `create_starlight_swarm_task` | starlight | Queen/Hermes task envelopes |
| 11 | `create_starlight_project_leadership_loop` | starlight | Project loop, not a new skill |
| 12 | `create_agentic_swarm_leadership` | starlight | Swarm leadership book |
| 13 | `create_arcanea_worldbuilding_canon_loop` | arcanea | Canon-safe world loop |
| 14 | `claude_explicit_scope_discipline_prompt` | claude | Stops scope creep |
| 15 | `claude_context_first_ordered_response` | claude | Context-engineering twin |
| 16 | `claude_production_prompt_engineering_system` | claude | Prompt Hub production bar |
| 17 | `claude_ai_output_evaluation_framework` | claude | Eval rubric until promptfoo runs |
| 18 | `claude_code_review_assistant` | claude | Review lane |
| 19 | `cross_system_prompt_designer` | cross-lab | Hub design flow |
| 20 | `cross_ai_coe_weekly_operations_review` | cross-lab | Weekly ops, not a new awesome-list |

## Parked (do not call as default)

- **ChatGPT harvest:** meal planner, resume/CV, study notes, business email, Instagram carousel, X thread, content-repurposing engine, social strategy. Use content-ops + brand packs instead.
- **Wellness/self-help one-offs:** ikigai, manifestation, shadow work, meditation, habit workshop, gratitude, morning routine, weekly meal, fitness CoE. Out of daily coding/DAM/web lane.
- **Generic Fabric summaries already covered by 6–8:** `summarize_micro`, `create_5_sentence_summary`, `create_micro_summary`, `create_summary`, `create_outline`, `create_quiz`.
- **Setup generators:** `cursor_cursor_rules_file_generator`, `claude-code_claude_md_generator_for_any_project`, `claude-code_claude_code_project_setup`. Estate already has AGENTS.md.
- **Duplicates of installed skills:** `claude-code_multi_agent_orchestra_designer`, `claude-code_mcp_server_architecture`, `claude-code_agentic_workflow_architecture` — use existing skills, not a second prompt.

Full computed dump (eval=0, not editorial): `rankings/by-rank.md`.

---

_Last curated: 2026-08-29. Next: run promptfoo on ranks 1–10 or keep parked._
