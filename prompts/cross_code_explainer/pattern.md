---
id: cross_code_explainer
version: 1.0.0
title: "Code Explainer"
description: "Get clear explanations of complex code."
lane: cross-lab
category: create
tags: ["learning", "explanation", "understanding"]
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

Explain this code in detail:

\`\`\`[LANGUAGE]
[PASTE CODE HERE]
\`\`\`

Please explain:
1. **Overview** - What does this code accomplish?
2. **Line by Line** - Walk through the logic step by step
3. **Key Concepts** - What programming concepts are used?
4. **Flow** - How does data flow through this code?
5. **Potential Issues** - Any limitations or edge cases?

Adjust explanation depth for: [beginner/intermediate/advanced] developer
