---
id: claude_ai_output_evaluation_framework
version: 1.0.0
title: "AI Output Evaluation Framework"
description: "Create systematic evaluation methods for AI-generated content quality."
lane: claude
category: create
tags: ["evaluation", "quality", "metrics", "testing"]
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

Design an evaluation framework for: [YOUR AI APPLICATION]

**Context:**
- Output type: [text/code/structured data/etc.]
- Quality dimensions: [accuracy, helpfulness, safety, style]
- Stakeholders: [who defines "good"]

Create a comprehensive framework:

1. **Evaluation Dimensions**
   - Define 5-7 quality dimensions
   - Rubric for each (1-5 scale with descriptions)
   - Weighting by importance

2. **Automated Metrics**
   - Programmatic checks (format, length, keywords)
   - Reference-based metrics (BLEU, ROUGE, etc.)
   - Model-based evaluation (LLM as judge)
   - Consistency checks

3. **Human Evaluation Protocol**
   - Evaluator selection criteria
   - Task instructions
   - Annotation interface design
   - Inter-rater reliability targets

4. **Test Set Design**
   - Coverage across use cases
   - Edge cases and adversarial inputs
   - Golden answer creation
   - Periodic refresh strategy

5. **Reporting & Analysis**
   - Score aggregation methods
   - Trend visualization
   - Failure analysis workflow
   - Improvement prioritization

6. **Integration into Development**
   - Pre-deployment gates
   - Continuous monitoring
   - Regression alerts
   - Feedback to prompt improvement

Output as an actionable evaluation plan with templates.
