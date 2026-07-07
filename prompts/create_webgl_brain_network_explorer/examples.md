# Examples - create_webgl_brain_network_explorer

## Example 1 - Next/React app

**INPUT**

```yaml
target_repo: "A React or Next.js frontend repo."
framework_notes: "Use existing route convention."
package_manager: "Detected from lockfile."
deployment_context: "Vercel-connected if present."
constraints: "No backend, no auth, stop local server before handoff."
```

**OUTPUT EXCERPT**

```markdown
## Plan
1. Read AGENTS.md and inspect package manager.
2. Add Three/R3F dependencies if absent.
3. Implement deterministic geometry, concept data, scene, UI overlay, and URL state.
4. Verify build, desktop/mobile screenshots, reduced motion, and nonblank canvas pixels.
```

## Example 2 - Performance fallback

**INPUT**

```yaml
target_repo: "Mobile-sensitive static app."
framework_notes: "Tailwind available."
package_manager: "pnpm"
deployment_context: "Static hosting."
constraints: "30fps minimum mobile."
```

**OUTPUT EXCERPT**

```markdown
Use performance tiers:
- high: 8,000 neurons / 12,000 synapses
- medium: 5,000 neurons / 7,500 synapses
- low: 2,500 neurons / 3,500 synapses

Choose tier by viewport, DPR, and hardware hints, then expose the tier in debug logs during development only.
```
