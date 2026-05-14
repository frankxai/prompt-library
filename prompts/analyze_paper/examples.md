# Examples — analyze_paper

## Example 1 — ML paper abstract
**INPUT**: "We introduce a sparse attention mechanism reducing transformer compute from O(n^2) to O(n log n) by restricting each token to its k-nearest neighbors in a learned embedding space."

**OUTPUT** (excerpt):
## CENTRAL CLAIM
Sparse attention via k-nearest-neighbor restriction matches dense attention quality at lower complexity.
## METHODS
- Learned embedding ranks token relevance before attention.
- Each token attends to top-k neighbors only.
## KEY FINDINGS
- 4x training speedup on language modeling benchmarks.
- Equivalent perplexity to dense attention.
## LIMITS
- Abstract does not state evaluation dataset size.
## FOLLOW-UP QUESTIONS
- How does k scale with sequence length?
- Does the embedding generalize across domains?