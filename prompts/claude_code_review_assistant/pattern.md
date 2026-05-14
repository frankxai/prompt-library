---
id: claude_code_review_assistant
version: 1.0.0
title: "Code Review Assistant"
description: "Get thorough code reviews with actionable feedback."
lane: claude
category: analyze
tags: ["review", "debugging", "quality"]
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

Review the following code for:

1. **Bugs & Edge Cases** - Logic errors, null checks, boundary conditions
2. **Performance** - Inefficiencies, unnecessary operations
3. **Security** - Vulnerabilities, input validation, data exposure
4. **Readability** - Naming, structure, documentation
5. **Best Practices** - Language idioms, design patterns

Code:
\`\`\`[LANGUAGE]
[PASTE CODE HERE]
\`\`\`

For each issue found:
- Explain the problem
- Show the problematic code
- Provide the fixed version
- Rate severity (Critical/Medium/Low)
