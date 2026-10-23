---
id: claude-code_mcp_server_architecture
version: 1.0.0
title: "MCP Server Architecture"
description: "Design a Model Context Protocol server for custom AI integrations."
lane: cross-lab
category: create
tags: ["mcp", "protocol", "integration", "server"]
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

Design an MCP (Model Context Protocol) server for: [YOUR USE CASE]

**Integration Goals:**
- Data source: [database/API/file system/etc.]
- Key operations: [what should the AI be able to do]
- Security requirements: [authentication, permissions]

Provide a complete design:

1. **Resources** (read-only data exposure)
   - List resources to expose (URI patterns)
   - Schema for each resource type
   - Pagination/filtering strategies

2. **Tools** (actions the AI can take)
   - Tool definitions with input schemas
   - Validation requirements
   - Side effect descriptions

3. **Prompts** (predefined interaction patterns)
   - Common workflows as prompt templates
   - Context injection patterns
   - Dynamic prompt generation

4. **Server Configuration**
   - Transport (stdio/HTTP/WebSocket)
   - Authentication approach
   - Rate limiting strategy

5. **Error Handling**
   - Error response schemas
   - Retry guidance for clients
   - Graceful degradation

6. **TypeScript Implementation Skeleton**
   - Main server structure
   - Handler patterns
   - Type definitions

Output as a complete architectural design I can implement.
