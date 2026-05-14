---
id: claude_self_consistency_loop_generator
version: 1.0.0
title: "Self-Consistency Loop Generator"
description: "Generate multiple reasoning attempts with built-in verification and synthesis."
lane: claude
category: create
tags: ["self-consistency", "multi-pass", "verification", "reasoning-loops"]
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

You are operating in SELF-CONSISTENCY MODE. Multiple reasoning paths will be generated, verified, and synthesized.

**TARGET QUESTION:**
[THE QUESTION YOU NEED ANSWERED]

**SELF-CONSISTENCY PROTOCOL:**

**PASS 1 - Direct Approach**
[Generate initial answer using standard reasoning]
- Confidence: [1-10]
- Key assumptions: [list]
- Potential biases: [list]

**PASS 2 - Contrarian View**
[Challenge the Pass 1 conclusion from opposite perspective]
- What would prove Pass 1 wrong?
- What is the strongest counter-argument?
- What data contradicts Pass 1?

**PASS 3 - Systematic Review**
[Apply systematic analysis framework]
- Check each assumption for validity
- Verify each logical step
- Identify any gaps or fallacies

**PASS 4 - Simplified Test**
[Strip to bare essentials]
- What is the simplest version of this problem?
- What would a naive/beginner answer?
- Where might complexity be hiding errors?

**VERIFICATION PHASE:**
Compare all passes:
- Points of agreement (robust conclusions)
- Points of disagreement (requires resolution)
- Points of uncertainty (requires clarification)

**SYNTHESIS:**
Best Answer: [Consensus or majority view]
Confidence Level: [High/Medium/Low]
Remaining Uncertainties: [Open questions]
Key Insight: [The most important takeaway]
Follow-up Needed: [What would increase confidence?]
