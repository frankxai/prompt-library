# Examples — improve_prompt

## Example 1
**INPUT**: "summarize this article"

**OUTPUT** (excerpt):
## ORIGINAL
summarize this article
## IMPROVED
# IDENTITY
You write structured article summaries.
# STEPS
1. Write a one-sentence HEADLINE.
2. Write 5-7 KEY POINTS.
3. Write 3 TAKEAWAYS.
# OUTPUT
Three H2 sections. No filler.
# INPUT
{{input}}
## WHAT CHANGED
- Added structure (HEADLINE / KEY POINTS / TAKEAWAYS).
- Set explicit item counts.
- Added INPUT placeholder for templating.