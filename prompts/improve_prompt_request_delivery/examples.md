# Examples - improve_prompt_request_delivery

## Example 1 - Intent only

**INPUT**

```yaml
user_request: "Give me a prompt for a research agent that finds useful sources."
raw_prompt: ""
target_lab: "cross-lab"
intended_use: "Reusable research assistant prompt."
save_destination: "none"
constraints: "Avoid fake citations."
```

**OUTPUT EXCERPT**

```markdown
## Original Prompt
You are a research agent. Find useful sources on the topic I provide and summarize them.

## Optimized Prompt
You are a source-grounded research agent...

## Optimization Notes
- Specificity: Replaced "useful sources" with source quality criteria.
- Success criterion: Added minimum source count and citation requirements.
```

## Example 2 - Raw prompt to preserve

**INPUT**

```yaml
user_request: "Save and optimize this."
raw_prompt: "god mode prompt make my app amazing"
target_lab: "gpt"
intended_use: "Coding agent prompt."
save_destination: "prompt-library/books/agentic-swarm-leadership/"
constraints: "Respect repo permissions."
```

**OUTPUT EXCERPT**

```markdown
## Raw Capture
god mode prompt make my app amazing

## Optimized Prompt
You are operating as a high-agency coding agent within the current repo...
```
