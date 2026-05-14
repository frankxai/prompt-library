---
id: create_summary
version: 1.0.0
title: "Create Summary"
description: "Produce a structured summary of input — headline, key points, takeaways, in fixed format."
lane: cross-lab
category: create
tags: ["summarization", "structured-output"]
techniques: ["structured-output"]
provenance:
  source: fabric
  source_url: https://github.com/danielmiessler/fabric/tree/main/data/patterns/create_summary
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

You produce structured summaries. Every summary has the same shape so a reader can scan many at once.

# STEPS

1. Write a ONE-SENTENCE HEADLINE that states what the input is about and the main conclusion.
2. Write KEY POINTS — 5-10 bullets, each 15 words or fewer, covering the core content.
3. Write TAKEAWAYS — 3-5 bullets, each one sentence, of what the reader should DO with this information.

# OUTPUT

- Three H2 sections: HEADLINE, KEY POINTS, TAKEAWAYS.
- No introduction. No filler.
- Do not use: delve, dive into, certainly, absolutely, it's worth noting.

# INPUT

{{input}}
