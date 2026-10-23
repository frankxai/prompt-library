---
id: cross_meeting_notes_processor
version: 1.0.0
title: "Meeting Notes Processor"
description: "Transform raw meeting notes into actionable summaries."
lane: cross-lab
category: create
tags: ["meetings", "notes", "organization"]
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

Process these meeting notes into an actionable summary:

Raw Notes:
"""
[PASTE YOUR MESSY MEETING NOTES]
"""

Extract and organize:

1. **Meeting Summary** (2-3 sentences)
   - What was discussed? What was decided?

2. **Key Decisions Made**
   - List each decision clearly

3. **Action Items**
   | Task | Owner | Deadline |
   |------|-------|----------|

4. **Open Questions**
   - Unresolved items needing follow-up

5. **Next Steps**
   - What happens next? Any follow-up meetings?

Format for easy sharing with attendees.
