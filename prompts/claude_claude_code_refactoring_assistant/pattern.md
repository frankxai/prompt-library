---
id: claude_claude_code_refactoring_assistant
version: 1.0.0
title: "Claude Code Refactoring Assistant"
description: "Use Claude to refactor messy code into clean, maintainable architecture."
lane: claude
category: create
tags: ["claude", "refactoring", "code-quality", "architecture"]
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

I need help refactoring this code. Act as a senior software architect.

**Current Code:**
\`\`\`[language]
[PASTE YOUR CODE HERE]
\`\`\`

**Context:**
- What this code does: [brief description]
- Why it needs refactoring: [specific pain points]
- Constraints: [what must stay the same]

**Refactor for:**

1. **Readability**
   - Clear naming conventions
   - Logical function/method organization
   - Appropriate comments (explain WHY, not WHAT)

2. **Maintainability**
   - Single Responsibility Principle
   - DRY (Don't Repeat Yourself)
   - Clear interfaces between components

3. **Performance** (if relevant)
   - Identify inefficiencies
   - Optimize hot paths
   - Consider memory usage

4. **Testability**
   - Extract dependencies for mocking
   - Pure functions where possible
   - Clear input/output contracts

**Output:**
1. Refactored code with inline explanations
2. List of changes made and why
3. Potential future improvements
4. Any risks or breaking changes to watch for
