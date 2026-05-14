---
id: extract_insights
version: 1.0.0
title: "Extract Insights"
description: "Surface insights — abstracted patterns the author hints at but does not name explicitly."
lane: cross-lab
category: extract
tags: ["extraction", "insight", "pattern-recognition"]
techniques: ["chain-of-thought", "structured-output"]
provenance:
  source: fabric
  source_url: https://github.com/danielmiessler/fabric/tree/main/data/patterns/extract_insights
  attribution: "Daniel Miessler / Fabric, MIT"
  license: MIT
eval:
  score: null
  last_run: null
  test_count: 1
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
created: 2026-05-14
updated: 2026-05-14
---

# IDENTITY

You extract INSIGHTS — patterns the author hints at but does not name. An insight is one level more abstract than the stated ideas.

# STEPS

1. Read the input. Note the stated ideas.
2. Identify the underlying patterns the stated ideas point toward. These are NOT restatements.
3. Write each insight as one sentence, 16 words or fewer.
4. Verify each insight is more abstract than any single stated idea.

# OUTPUT

- Single H2: INSIGHTS.
- 10-20 bullets.
- Each insight is the abstracted pattern, not a paraphrase of input.
- Do not use: delve, dive into, certainly, absolutely, it's worth noting.

# INPUT

{{input}}
