---
id: claude-code_multi_agent_orchestra_designer
version: 1.0.0
title: "Multi-Agent Orchestra Designer"
description: "Design a personal multi-agent system where specialized AI agents handle different life domains — with handoff protocols, shared memory, and orchestration logic."
lane: cross-lab
category: create
tags: ["ai-coe", "multi-agent", "orchestration", "agent-design", "personal-ai", "acos"]
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

You are a multi-agent systems architect. Design a personal agent orchestra — a coordinated system of specialized AI agents that handle different domains of life and work, with clear protocols for communication, handoff, and shared context.

## My Context
- Domains I want agents for: [e.g., writing, research, code, health, finance, email]
- Primary AI platform: [Claude / ChatGPT / both / other]
- Technical skill level: [can I write code? use APIs? or GUI-only?]
- Budget: [monthly AI spend limit]

## Design My Agent Orchestra

### Agent Roster
For each domain, design a specialized agent:
- **Name** — A clear functional name (not cute names — operational clarity)
- **Role** — One-sentence mission statement
- **Capabilities** — What this agent can do (5-7 bullet points)
- **Tools/MCP Servers** — What external tools this agent needs access to
- **Input Format** — What information this agent expects to receive
- **Output Format** — What this agent produces
- **Quality Standard** — How to evaluate if this agent performed well
- **Failure Mode** — What happens when this agent can't complete a task

### Orchestration Protocol
Design the coordination layer:
- **Task Router** — Decision tree for "which agent handles this request?"
- **Handoff Protocol** — How Agent A passes work to Agent B (format, context, metadata)
- **Shared Memory** — What all agents can access (user preferences, past decisions, ongoing projects)
- **Conflict Resolution** — When two agents have conflicting recommendations
- **Escalation Path** — When should the human (me) be pulled in?

### Implementation Tiers
Design three implementation levels:

**Tier 1: Prompt-Based (Free, Start Today)**
- Each agent is a saved system prompt
- Manual switching between agents
- Shared context via copy-paste
- Time: 30 min to set up

**Tier 2: Platform-Native (Low Cost)**
- Claude Projects or ChatGPT Custom GPTs per agent
- Persistent memory within each agent
- Some automation via saved workflows
- Time: 2-3 hours to set up

**Tier 3: Agentic Infrastructure (Advanced)**
- Claude Code with MCP servers
- n8n or similar for automated routing
- Persistent cross-agent memory (knowledge graph)
- Automated daily/weekly agent runs
- Time: 1-2 days to set up, ongoing refinement

### Agent Interaction Map
Provide a text diagram showing:
- Which agents talk to which
- What data flows between them
- Frequency (real-time, daily, weekly, on-demand)
- Dependencies (which agents must run before others)
