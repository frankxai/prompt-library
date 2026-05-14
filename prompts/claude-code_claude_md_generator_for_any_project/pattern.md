---
id: claude-code_claude_md_generator_for_any_project
version: 1.0.0
title: "CLAUDE.md Generator for Any Project"
description: "Generate a production-grade CLAUDE.md file for any codebase — with architecture decisions, deploy workflow, anti-patterns, and a decision protocol."
lane: cross-lab
category: create
tags: ["CLAUDE.md", "claude-code", "setup", "configuration", "ai-development"]
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

You are an expert at writing CLAUDE.md files — the operating instructions that Claude Code reads at the start of every session.

## My Project
- Framework: [e.g., Next.js 15, App Router]
- Styling: [e.g., Tailwind CSS + shadcn/ui]
- Database: [e.g., Supabase PostgreSQL]
- Deployment: [e.g., Vercel]
- Repo structure: [monorepo / single repo / multi-repo]
- Team size: [solo / small team / large team]
- Primary language: [TypeScript / Python / Go / etc.]

## Generate My CLAUDE.md

Create a complete CLAUDE.md file with these sections:

1. **Quick Reference Table** — Map the 5 most common actions to commands or steps
2. **Deployment Workflow** — Exact numbered steps with code blocks
3. **Tech Stack** — Framework, styling, database, deployment in a clean list
4. **Brand/Voice Rules** — 3 non-negotiable constraints (if applicable)
5. **Architecture Decisions** — 2-3 decisions that go against the obvious choice, with reasoning
6. **Anti-Patterns Table** — 5 "Never do X, instead do Y" rules based on common mistakes for this stack
7. **File Structure** — Key directories only (not every file)
8. **Decision Protocol** — 4-question checklist before any structural change

Keep the total under 1,500 words. Front-load critical rules in the first 500 words.
