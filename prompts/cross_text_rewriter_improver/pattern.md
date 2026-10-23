---
id: cross_text_rewriter_improver
version: 1.0.0
title: "Text Rewriter & Improver"
description: "Improve existing text while maintaining the original meaning."
lane: cross-lab
category: improve
tags: ["editing", "rewriting", "improvement"]
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

Rewrite the following text to be more [clear/engaging/professional/concise]:

"""
[PASTE YOUR TEXT HERE]
"""

Requirements:
- Maintain the core message and facts
- Improve readability and flow
- Fix any grammatical issues
- Make it more [specify: compelling/accessible/authoritative]
- Keep approximately the same length unless instructed otherwise
