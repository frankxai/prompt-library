# Examples — audit_security_config

## Example 1
**CONFIG_TYPE**: nginx
**CONFIG**: `server { listen 80; server_name api.example.com; location / { proxy_pass http://upstream; } }`

**OUTPUT** (excerpt):
## FINDINGS
| Severity | Line | Issue | Remediation |
|---|---|---|---|
| HIGH | `listen 80` | Plaintext HTTP | Add 443 SSL listener; redirect 80 → 443 |
| MEDIUM | `proxy_pass` | No timeout, no SNI verification | Set `proxy_read_timeout` and `proxy_ssl_verify on` |
## SAFE OBSERVATIONS
- Named upstream isolates routing.
## NEXT CHECKS
- TLS cert chain at runtime.
- Upstream auth mechanism.