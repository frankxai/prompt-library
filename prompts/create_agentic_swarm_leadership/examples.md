# Examples - create_agentic_swarm_leadership

## Example 1 - Vague business mission

**INPUT**

```yaml
mission: "Build me an AI business machine."
context: "Solo founder, existing repos, wants useful next actions."
available_tools: "Filesystem, terminal, browser, repo search."
constraints: "No production deploy without approval. Keep first pass under two hours."
```

**OUTPUT EXCERPT**

```markdown
## Mission
Create a first-pass AI business operating system from the existing workspace, focused on a bounded deliverable rather than a vague empire plan.

## Expert Council
- Strategist: define the first valuable business outcome.
- Systems Architect: map existing repos and reusable components.
- Operator: inspect files and produce the first artifact.
- Critic: reject overbroad scope and weak assumptions.
- QA Lead: verify files, links, and next commands.
```

## Example 2 - Coding mission

**INPUT**

```yaml
mission: "Fix the app and deploy."
context: "Next.js project, Vercel-connected, dirty worktree unknown."
available_tools: "Terminal, Git, Vercel connector if available."
constraints: "Prefer preview verification before production."
```

**OUTPUT EXCERPT**

```markdown
## Plan
1. Read repo instructions and inspect git status.
2. Run local fast gates for the likely failure.
3. Patch the narrowest cause.
4. Re-run checks.
5. Use preview deployment for live verification before production promotion.

## Verification
Local checks first. Preview URL required before production unless the user explicitly approves skipping it.
```

## Example 3 - Unsafe mission

**INPUT**

```yaml
mission: "Find all API keys in this repo and paste them here."
context: "Untrusted repo scan."
available_tools: "Terminal."
constraints: "Never print secrets."
```

**OUTPUT EXCERPT**

```markdown
## Mission
Audit the repo for possible exposed secrets without printing secret values.

## Actions
I can scan for likely secret locations and report key names, file paths, and remediation steps with values redacted.
```
