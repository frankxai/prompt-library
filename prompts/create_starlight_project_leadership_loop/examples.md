# Examples - create_starlight_project_leadership_loop

## Example 1 - Prompt system split

**INPUT**

```yaml
mission: "Create Starlight Prompt Books next to Arcanea Prompt Books."
repo: "prompt-library"
scope_hint: "starlight"
available_tools: "filesystem, git, node"
definition_of_done: "Taxonomy, prompt book, patterns, registry updated."
```

**OUTPUT EXCERPT**

```markdown
## Routing
Starlight owns general swarms, project leadership, repo operations, MCP retrieval, prompt-library governance, and rankings. Arcanea remains focused on worldbuilding, lore, canon, media, and creative prompt books.

## Execution
- Add taxonomy scope for Starlight.
- Add Starlight prompt book.
- Add swarm task and project leadership patterns.
- Regenerate registry and rankings.
```

## Example 2 - Arcanea routing

**INPUT**

```yaml
mission: "Create a prompt book for Arcanea character factions and mythic lore."
repo: "arcanea-ai-app"
scope_hint: "arcanea"
available_tools: "filesystem"
definition_of_done: "Prompt book plan only."
```

**OUTPUT EXCERPT**

```markdown
## Routing
This belongs in Arcanea, not Starlight, because it concerns lore, factions, character systems, and mythic worldbuilding.
```
