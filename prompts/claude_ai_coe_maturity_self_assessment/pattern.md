---
id: claude_ai_coe_maturity_self_assessment
version: 1.0.0
title: "AI CoE Maturity Self-Assessment"
description: "Score your current AI integration maturity across 7 dimensions using the enterprise CoE maturity model adapted for individuals. Get a radar chart and growth roadmap."
lane: claude
category: create
tags: ["ai-coe", "assessment", "maturity-model", "self-evaluation", "ai-strategy"]
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

You are an AI maturity assessment specialist. Evaluate my current AI integration maturity and produce a scored assessment with actionable growth paths.

## My Current AI Usage
Describe how you currently use AI (be specific about tools, frequency, and what you use them for):

[PASTE YOUR DESCRIPTION HERE — Example: "I use ChatGPT for writing emails and brainstorming. I've tried Midjourney a few times for images. I don't use AI for coding, health, or finances."]

## Assessment Framework
Score each dimension from 1-5 using these maturity levels:

| Level | Name | Definition |
|-------|------|------------|
| 1 | Exploring | Occasional, unstructured AI use. Copy-paste prompting. |
| 2 | Experimenting | Regular use in 1-2 domains. Starting to see patterns. |
| 3 | Integrating | AI embedded in daily workflows. Custom prompts and templates. |
| 4 | Orchestrating | Multi-tool systems. Automation between AI tools. Persistent memory. |
| 5 | Compounding | Self-improving systems. AI agents working autonomously. Measurable ROI. |

## The 7 Dimensions to Score:

1. **Prompt Sophistication** — How advanced are your prompts? (One-liners → structured multi-step → agent orchestration)
2. **Tool Breadth** — How many AI tools do you actively use? (1 tool → 3-5 tools → integrated ecosystem)
3. **Workflow Integration** — Is AI embedded in your workflows or separate? (Manual copy-paste → API integration → autonomous pipelines)
4. **Knowledge Management** — Do your AI interactions build on each other? (Ephemeral chats → saved prompts → persistent memory systems)
5. **Output Quality** — What quality do you achieve? (Raw AI output → edited → indistinguishable from expert human work)
6. **Domain Coverage** — How many life/work domains benefit from AI? (1 domain → 3-4 → all 7 CoE domains)
7. **Time ROI** — How much time does AI save you weekly? (Negligible → 2-5hrs → 10+ hrs with measurable value)

## Output Requirements

1. **Score Table** — Each dimension with score, evidence, and gap analysis
2. **ASCII Radar Chart** — Visual representation of the 7 scores
3. **Overall Maturity Level** — Weighted average with interpretation
4. **Top 3 Growth Levers** — The dimensions where small improvements yield biggest gains
5. **30-Day Action Plan** — Specific steps to move your lowest dimension up by 1 level
6. **Benchmark Context** — Where this score places you relative to typical professionals (top 50%, top 20%, top 5%)
