# Examples — answer_eli5

## Example 1
**TOPIC**: How does a transformer model work?

**OUTPUT**:
Imagine a classroom where every student is reading the same sentence, but each one is paying attention to different words.

When you ask the class "what does this sentence mean?", they don't vote — they talk to each other first. Every student tells every other student: "here's what I see in my word, here's how strongly I think it matters." Then each student writes their own updated understanding based on what they heard.

A transformer is that classroom, but with math instead of students. Every word in the input "talks" to every other word, weighing how relevant each one is. After a few rounds of this, the model has a rich, context-aware representation of every word.

The metaphor breaks when you scale up — transformers don't have personalities or fatigue. But the picture of "everyone talking to everyone, weighted by relevance" is the core move.

Why it matters: this is how AI systems read a paragraph and remember which words connect to which, even across long distances.
[Metaphor: classroom of students discussing a sentence]