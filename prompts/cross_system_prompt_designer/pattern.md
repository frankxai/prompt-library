---
id: cross_system_prompt_designer
version: 1.0.0
title: "System Prompt Designer"
description: "Craft effective system prompts that guide AI behavior precisely."
lane: cross-lab
category: create
tags: ["system-prompt", "prompt-design", "ai-behavior", "llm"]
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

Design a system prompt for: [YOUR AI ASSISTANT/APPLICATION]

**Role & Purpose:**
- Primary function: [what should it do]
- Target users: [who will interact with it]
- Tone: [professional/friendly/expert/etc.]

Create a structured system prompt with:

1. **Identity & Role**
   - Who is the AI (name, expertise, personality)
   - What it specializes in
   - How it should present itself

2. **Capabilities & Boundaries**
   - What it CAN do (enumerate explicitly)
   - What it should NOT do (guardrails)
   - How to handle edge cases

3. **Response Formatting**
   - Default output structure
   - When to use lists vs prose
   - Length guidelines
   - Code/technical content handling

4. **Interaction Patterns**
   - How to ask clarifying questions
   - How to handle ambiguity
   - Multi-turn conversation management
   - Error acknowledgment style

5. **Knowledge & Context**
   - Background knowledge to assume
   - How to reference external info
   - Handling outdated information
   - Citation practices

6. **Safety & Alignment**
   - Content policies
   - Bias mitigation
   - Escalation triggers
   - User safety considerations

Output as a production-ready system prompt I can use directly.
