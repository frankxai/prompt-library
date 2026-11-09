---
name: prompt-optimizer
description: Rewrites a prompt so it gets better results, and shows the work. Use when the user asks to write, improve, tighten, optimize or save a prompt or system prompt, or to adapt one for Claude, GPT or Gemini. Returns the original, the optimized version, what changed and why, and a short rubric to test whether the new version is actually better.
license: MIT
metadata:
  version: 1.1.0
  author: Frank Riemer / Starlight Prompt Library
---

# Prompt optimizer

Keep the user's intent. Produce a stronger prompt with a visible trail of what changed, so the user can judge it instead of trusting it.

## Inputs to collect

Use what the user gave. Ask for something only when the gap would change the result.

- The request, and the raw prompt if they pasted one
- Target model: Claude, GPT, Gemini, or cross-model
- What the prompt is for
- Constraints (length, format, tone, things it must never do)
- Where to save it, if they want it kept

## Rules

1. If the user pasted a raw prompt, copy it exactly into **Raw capture**, with any secret (API key, token, password, private key) replaced by a placeholder such as `{{API_KEY}}`. Never repeat a secret anywhere in the answer.
2. Always give an **Original prompt**. If the user only described what they want, write a clean first version.
3. Always give an **Optimized prompt** that adds what the original lacks: a concrete success criterion, the inputs it needs, an output format, examples where they help, and safety limits. Do not change the task.
4. If two instructions conflict (for example "comprehensive" and "under 100 words"), say so and resolve it explicitly.
5. Match the target model:
   - Claude: role and context first, long material before the question, XML tags around documents and examples.
   - GPT: durable instructions separate from inputs, an explicit output contract, typed fields or a JSON schema for structured data.
   - Gemini: direct task framing, a short example of the desired output, explicit limits.
   - Cross-model: Markdown sections, named variables, a portable rubric.
6. Never claim the new prompt is proven better. Call it a prediction and give the user a way to test it.
7. If the user wants it saved, suggest a file path in their project and a short name.

## Output

### Raw capture
Only when the user pasted a prompt.

### Original prompt

### Optimized prompt

### What changed
- Success criterion:
- Inputs:
- Structure:
- Output format:
- Examples:
- Conflicts resolved:
- Safety limits:
- Expected effect:

### How to test it
3 to 7 checks the user can run on real inputs to compare the two versions.

### Save
Only when asked: suggested path and name.
