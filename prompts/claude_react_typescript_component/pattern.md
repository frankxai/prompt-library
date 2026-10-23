---
id: claude_react_typescript_component
version: 1.0.0
title: "React TypeScript Component"
description: "Generate well-typed React components with best practices."
lane: claude
category: create
tags: ["react", "typescript", "components"]
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

Create a React TypeScript component for:
[DESCRIBE COMPONENT FUNCTIONALITY]

Requirements:
- Functional component with hooks
- Full TypeScript types (no 'any')
- Props interface with JSDoc comments
- Sensible default props where appropriate
- Accessible (ARIA labels, keyboard navigation)
- Mobile-responsive if relevant
- Include example usage in comments

Tech stack: [React 18+, Next.js 14+, Tailwind CSS]

Optional features needed:
- [ ] Loading state
- [ ] Error handling
- [ ] Animation (Framer Motion)
- [ ] Form validation
