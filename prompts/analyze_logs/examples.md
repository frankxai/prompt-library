# Examples — analyze_logs

## Example 1 — HTTP 500 spike
**INPUT**: "2026-05-14 10:32:01 ERROR db connection refused\n2026-05-14 10:32:02 ERROR db connection refused\n..."

**OUTPUT** (excerpt):
## ANOMALIES
- "ERROR db connection refused" repeats >100 times in 10 seconds starting 10:32:01.
## TIMELINE
- Start: 10:32:01. Sustained through 10:35:00.
## ROOT-CAUSE HYPOTHESES
- DB pool exhausted (most likely) — supported by repeat rate.
- DB primary failover — check replication lag.
## NEXT CHECKS
- `SHOW PROCESSLIST` on DB.
- Check connection pool metrics dashboard.
## SEVERITY
P1 — user-facing traffic affected.