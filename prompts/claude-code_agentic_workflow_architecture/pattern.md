---
id: claude-code_agentic_workflow_architecture
version: 1.0.0
title: "Agentic Workflow Architecture"
description: "Design multi-step autonomous workflows for complex development tasks."
lane: cross-lab
category: create
tags: ["agentic", "workflow", "automation", "orchestration"]
techniques: []
provenance:
  source: original
  attribution: "FrankX (Frank Riemer)"
  license: original
eval:
  score: null
  last_run: null
  test_count: 0
red_team:
  status: needs-audit
  audited: null
  notes: "Imported in seed batch — Red Team gate pending."
psyche:
  applicable: false
  boundary: n/a
  risk: low
examples_needed: true
created: 2026-05-14
updated: 2026-05-14
---

Design an agentic workflow for: [DESCRIBE COMPLEX TASK]

**Context:**
- Current pain point: [what takes too long manually]
- Desired outcome: [what success looks like]
- Human checkpoints: [where you need approval]

Create a workflow that includes:

1. **Task Decomposition**
   - Break the main task into autonomous sub-tasks
   - Define clear inputs/outputs for each step
   - Identify parallelizable vs sequential steps

2. **Agent Roles**
   - Researcher (information gathering)
   - Implementer (code writing)
   - Reviewer (quality checking)
   - Documenter (capturing decisions)

3. **State Management**
   - What context needs to persist between steps
   - How to handle failures and rollbacks
   - Checkpoint strategy for long workflows

4. **Human-in-the-Loop Points**
   - Critical decision gates
   - Approval requirements
   - Feedback integration

5. **Error Handling**
   - Retry strategies
   - Fallback approaches
   - Escalation to human

6. **Completion Criteria**
   - Success metrics
   - Quality gates
   - Documentation requirements

Output as an actionable workflow I can implement with Claude Code or similar tools.
