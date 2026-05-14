# Examples — summarize_paper

## Example 1
**INPUT**: (abstract on sparse attention)

**OUTPUT** (excerpt):
## CENTRAL CLAIM
Sparse k-NN attention matches dense attention quality at O(n log n) complexity.
## METHODS
- Learned embedding ranks token relevance.
- Each token attends to top-k neighbors.
## KEY FINDINGS
- 4x wall-clock speedup.
- Equivalent perplexity on benchmarks.
## LIMITS
- No data on out-of-distribution sequences.
## WHY IT MATTERS
Makes long-context inference economically viable for production deployment.