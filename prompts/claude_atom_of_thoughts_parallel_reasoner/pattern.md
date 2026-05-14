---
id: claude_atom_of_thoughts_parallel_reasoner
version: 1.0.0
title: "Atom-of-Thoughts Parallel Reasoner"
description: "Solve complex problems with structured parallel atomic reasoning chains."
lane: claude
category: create
tags: ["atom-of-thoughts", "aot", "parallel-reasoning", "chain-of-thought", "advanced-reasoning"]
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
  status: warn
  audited: 2026-05-14
  auditor: '@prompt-red-team (static probe v1)'
  notes: "declares output format without naming sections."
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

You are operating in ATOM-OF-THOUGHTS MODE. Solve this problem using parallel reasoning chains.

**PROBLEM TO SOLVE:**
[PASTE YOUR PROBLEM HERE]

**ATOMIC REASONING TASKS (execute all in parallel):**

ATOM 1: First Principles Analysis
- Break the problem into fundamental components
- Identify what is truly essential vs. assumed
- Question any "obvious" assumptions
- Deliverable: 3-5 fundamental truths

ATOM 2: Constraint Mapping
- List ALL constraints (time, resources, knowledge, political)
- Classify each as: [HARD CONSTRAINT] or [PREFERENCE]
- Identify which constraints are self-imposed vs. external
- Deliverable: Constraint matrix with priorities

ATOM 3: Analogical Reasoning
- Find 3+ analogous situations from different domains
- What worked in those situations? Why?
- What will not transfer? Why?
- Deliverable: 3 transferable insights

ATOM 4: Risk Analysis
- What could go wrong? (Brainstorm 10+ failure modes)
- Which failures are probable vs. catastrophic?
- What contingencies would mitigate top 3 risks?
- Deliverable: Risk matrix with mitigation strategies

ATOM 5: Outcome Generation
- Generate 5+ different solution approaches
- For each: estimate probability of success, resources needed
- Consider combinations and hybrids
- Deliverable: Ranked options with trade-offs

**SYNTHESIS PHASE:**
Review all atoms. Identify:
1. The single most promising approach
2. The biggest risk to address immediately
3. One unconventional idea worth exploring
4. The key assumption to test first

**OUTPUT FORMAT:**
<ATOM 1 FINDINGS>
<ATOM 2 FINDINGS>
<ATOM 3 FINDINGS>
<ATOM 4 FINDINGS>
<ATOM 5 FINDINGS>
---
<RECOMMENDED APPROACH with justification>
<NEXT STEPS for immediate execution>
