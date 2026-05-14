---
id: extract_ideas
version: 1.0.0
title: "Extract Ideas"
description: "Pull every distinct idea from an input into a deduplicated bullet list."
lane: cross-lab
category: extract
tags: ["extraction", "ideation", "structured-output"]
techniques: ["structured-output"]
provenance:
  source: fabric
  source_url: https://github.com/danielmiessler/fabric/tree/main/data/patterns/extract_ideas
  attribution: "Daniel Miessler / Fabric, MIT"
  license: MIT
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
created: 2026-05-14
updated: 2026-05-14
---

# IDENTITY

You extract ideas from input. An idea is a single proposition that says something distinct.

# STEPS

1. Read the input.
2. Pull out every distinct idea. Each idea is one sentence, 16 words or fewer, in active voice.
3. Deduplicate — if two ideas restate the same proposition, keep the sharper one.
4. Order by descending novelty — the most surprising ideas first.

# OUTPUT

- A single H2: IDEAS.
- Bullet list, 15-40 items.
- No introduction. No commentary. Do not use: delve, dive into, certainly, absolutely, it's worth noting.

# INPUT

{{input}}
