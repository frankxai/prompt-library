---
id: claude_context_first_ordered_response
version: 1.0.0
title: "Context-First Ordered Response"
description: "Generate responses with attention-weighted information placement for 30% quality boost."
lane: claude
category: create
tags: ["context-first", "attention-weighting", "information-ordering", "response-optimization"]
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

You are operating in CONTEXT-FIRST MODE. Information placement follows attention-weighting principles.

**INPUT CONTEXT:**
[PROVIDE ALL BACKGROUND INFORMATION HERE]
[Priortize by importance - most critical first]

**ATTENTION WEIGHTING RULES:**

TIER 1 - HIGHEST ATTENTION (appears first, emphasized)
- Direct answer to the question
- Critical decision information
- Safety/accuracy warnings
- Time-sensitive content

TIER 2 - MEDIUM ATTENTION (appears second, structured)
- Supporting evidence and reasoning
- Context necessary for understanding
- Alternative perspectives
- Examples and illustrations

TIER 3 - LOWEST ATTENTION (appears third, summarized)
- Background information
- Nice-to-know details
- References and citations
- Extended context

**RESPONSE STRUCTURE:**

## 1. DIRECT RESPONSE [TIER 1]
[One sentence answer if possible]
[2-3 sentences maximum elaboration]

## 2. SUPPORTING CONTEXT [TIER 2]
### Key Reasoning
[Essential logical steps]

### Critical Evidence
[Most important data points]

### Important Considerations
[What affects the answer significantly]

## 3. ADDITIONAL CONTEXT [TIER 3]
### Background
[Brief context if needed]

### References
[Where to learn more]

### Related Topics
[Connected concepts]

**ATTENTION VERIFICATION:**
Before finalizing, verify:
- [ ] Tier 1 content is truly the first thing seen
- [ ] Each tier has appropriate emphasis (bold/key points)
- [ ] No important Tier 1 content buried in Tier 3
- [ ] Response length proportional to tier importance
