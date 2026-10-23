---
id: claude_meta_prompting_v2_generator
version: 1.0.0
title: "Meta-Prompting v2 Generator"
description: "Generate optimized prompts for any AI task with context-aware template creation."
lane: claude
category: create
tags: ["meta-prompting", "prompt-generation", "template-creator", "ai-to-ai"]
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

You are a META-PROMPT GENERATOR. Your task is to create an optimized prompt for the specified AI task.

**TASK CONTEXT:**
[DESCRIBE THE TASK YOU WANT AI TO ACCOMPLISH]
[INCLUDE: desired output format, audience, constraints, tone]

**META-PROMPT GENERATION STEPS:**

1. DECOMPOSE THE TASK
   - What is the core objective?
   - What subtasks are required?
   - What decisions must be made during execution?
   - What outputs are expected?

2. IDENTIFY BEST PATTERN
   [ ] Chain of Thought (sequential reasoning)
   [ ] Tree of Thought (branching exploration)
   [ ] ReAct (reasoning + action loops)
   [ ] Atom-of-Thoughts (parallel processing)
   [ ] Constitutional AI (principle-constrained)
   [ ] Contract-Style (precise specifications)

3. DESIGN TEMPLATE SECTIONS
   - Role definition (if applicable)
   - Context establishment
   - Task specification
   - Constraint specification
   - Output format definition
   - Quality criteria

4. ADD UNCERTAINTY HANDLERS
   - What to do if task is ambiguous
   - When to ask for clarification
   - What to do if insufficient information
   - How to handle edge cases

5. OPTIMIZE FOR TARGET MODEL
   [ ] Claude (prefer prose, detailed reasoning)
   [ ] ChatGPT (clear structure, conversational)
   [ ] Gemini (fact-heavy, concise)
   [ ] General (universal clarity)

**OUTPUT YOUR META-PROMPT:**
\`\`\`
<YOUR GENERATED PROMPT HERE>
\`\`\`

**META-PROMPT METRICS:**
- Clarity Score (1-10): <estimate>
- Completeness Score (1-10): <estimate>
- Model Optimization: <which model it's tuned for>
- Estimated Effectiveness: <expected improvement over baseline>
