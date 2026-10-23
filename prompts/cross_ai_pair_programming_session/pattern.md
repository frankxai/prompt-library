---
id: cross_ai_pair_programming_session
version: 1.0.0
title: "AI Pair Programming Session"
description: "Structure an effective AI pair programming session for complex features."
lane: cross-lab
category: create
tags: ["pair-programming", "workflow", "productivity", "coding"]
techniques: []
provenance:
  source: original
  attribution: "FrankX (Frank Riemer)"
  license: original
eval:
  score: null
  last_run: null
  test_count: 0
  skeleton_complete: true
  skeleton_date: 2026-05-14
red_team:
  status: pass
  audited: 2026-05-14
  auditor: '@prompt-red-team (static probe v1)'
  notes: "Static probe found no high-risk surfaces."
  probes_run: 4
  probes_static: true
  probes_static: true
psyche:
  applicable: false
  boundary: n/a
  risk: low
examples_needed: true
created: 2026-05-14
updated: 2026-05-14
---

Set up an AI pair programming session for: [FEATURE/TASK]

**Session Context:**
- Feature goal: [what we're building]
- Codebase context: [relevant files, patterns]
- Time budget: [how long for this session]

Structure the session as:

1. **Context Priming** (5 min)
   - Share relevant code files
   - Explain current architecture
   - Define success criteria

2. **Design Discussion** (10 min)
   - Explore implementation approaches
   - Identify edge cases
   - Agree on patterns to use

3. **Implementation Cycles** (main work)
   - AI generates code in chunks
   - Human reviews and provides feedback
   - Iterate until quality is met

4. **Effective Prompting Patterns**
   - "Implement X following the pattern in Y"
   - "Review this for edge cases: [code]"
   - "Refactor to improve [specific quality]"

5. **Session Hygiene**
   - Regular commits with descriptive messages
   - Running tests after each chunk
   - Documenting decisions

6. **Wrap-up** (5 min)
   - Summary of changes
   - Outstanding TODOs
   - Follow-up tasks

Provide prompts I can use throughout the session.
