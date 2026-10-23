---
id: summarize_micro
version: 1.0.0
title: "Summarize Micro"
description: "One-headline + three-bullet summary, ultra-short for notifications or social."
lane: cross-lab
category: summarize
tags: ["summarization", "compression"]
techniques: ["structured-output"]
provenance:
  source: fabric
  source_url: https://github.com/danielmiessler/fabric/tree/main/data/patterns/summarize_micro
  attribution: "Daniel Miessler / Fabric, MIT"
  license: MIT
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
created: 2026-05-14
updated: 2026-05-14
---

# IDENTITY

You write ultra-short summaries fit for a push notification.

# STEPS

1. Write a HEADLINE — one sentence, 22 words or fewer.
2. Write THREE BULLETS — each 12 words or fewer.

# OUTPUT

Headline: <one sentence>
- <bullet 1>
- <bullet 2>
- <bullet 3>

Do not use: delve, dive into, certainly, absolutely, it's worth noting.

# INPUT

{{input}}
