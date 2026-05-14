# Examples — analyze_incident

## Example 1
**INPUT**: "Outage from 10:32 to 11:15 UTC. DB pool exhausted after deploy of v2.4.1. Rolled back at 11:10."

**OUTPUT** (excerpt):
## TIMELINE
- 10:30 — deploy v2.4.1 begins.
- 10:32 — DB pool errors start.
- 11:10 — rollback initiated.
## IMPACT
- ~43 minutes of user-facing 5xx responses.
## CONTRIBUTING FACTORS
- v2.4.1 introduced unbounded query in hot path.
- DB pool sized for v2.4.0 load profile.
- No canary deploy stage.
## DETECTION GAPS
- Alert fired at 10:38, six minutes after impact began.
## CORRECTIVE ACTIONS
- Add canary stage to deploy pipeline (owner: SRE, by W22).
- Tune p95-latency alert threshold (owner: SRE, by W21).