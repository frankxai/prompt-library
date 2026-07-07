# Examples - create_starlight_swarm_task

## Example 1 - Prompt registry task

**INPUT**

```yaml
mission: "Build a registry generator for prompt-library."
repo: "C:\\Users\\frank\\starlight\\repos\\prompt-library"
available_agents: "codex, claude, grok, antigravity, noop"
constraints: "No package installs. Keep it local."
```

**OUTPUT EXCERPT**

```json
{
  "id": "prompt-library-registry-generator",
  "priority": 5,
  "agent": "codex",
  "repo": "C:\\Users\\frank\\starlight\\repos\\prompt-library",
  "maxMinutes": 45,
  "risk": "normal",
  "prompt": "Create a local Node registry generator..."
}
```

## Example 2 - Arcanea lore task

**INPUT**

```yaml
mission: "Create a prompt book for Arcanea factions and canon."
repo: "C:\\Users\\frank\\starlight\\repos\\arcanea-ai-app"
available_agents: "codex, claude, grok"
constraints: "Planning only."
```

**OUTPUT EXCERPT**

```markdown
## Routing
Arcanea, because the mission concerns factions, canon, and worldbuilding.
```
