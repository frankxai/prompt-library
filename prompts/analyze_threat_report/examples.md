# Examples — analyze_threat_report

## Example 1
**INPUT**: "APT29 deployed a new loader, FROZENMIST, targeting European diplomatic missions via spear-phishing emails carrying ISO attachments. Hashes: a1b2c3..."

**OUTPUT** (excerpt):
## ACTORS
- APT29 (aka Cozy Bear, Nobelium) — Russian-linked.
## TTPs
- T1566.001 Spearphishing Attachment.
- T1204.002 User Execution: Malicious File.
## IOCs
- SHA256 a1b2c3...
## TARGETS
- European diplomatic missions.
## MITIGATIONS
- Block ISO attachments at mail gateway.
- Disable ISO auto-mount on workstations.