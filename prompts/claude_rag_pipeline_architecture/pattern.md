---
id: claude_rag_pipeline_architecture
version: 1.0.0
title: "RAG Pipeline Architecture"
description: "Design a Retrieval-Augmented Generation system for knowledge-intensive applications."
lane: claude
category: create
tags: ["rag", "retrieval", "vector-search", "llm"]
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

Design a RAG (Retrieval-Augmented Generation) pipeline for:

**Use Case:** [chatbot/search/Q&A/etc.]
**Knowledge Base:** [documents/database/API/etc.]
**Scale:** [document count, query volume]
**Quality Needs:** [precision, recall, latency requirements]

Create a complete RAG architecture:

1. **Ingestion Pipeline**
   - Document parsing strategy
   - Chunking approach (size, overlap, semantic)
   - Metadata extraction
   - Embedding model selection

2. **Vector Store Design**
   - Store selection (Pinecone/Weaviate/pgvector/etc.)
   - Index configuration
   - Partitioning strategy
   - Update/refresh patterns

3. **Retrieval Strategy**
   - Query processing (expansion, rewriting)
   - Hybrid search (vector + keyword)
   - Re-ranking approach
   - Context window management

4. **Generation Layer**
   - Prompt template with retrieved context
   - Citation handling
   - Hallucination prevention
   - Response formatting

5. **Quality Assurance**
   - Relevance scoring
   - Answer evaluation metrics
   - Feedback loop design
   - Human review integration

6. **Production Considerations**
   - Caching strategy
   - Error handling
   - Monitoring/logging
   - Cost optimization

Output as an implementable architecture with technology recommendations.
