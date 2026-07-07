# <Prompt Book Title>

Status: draft
Owner: Frank / Starlight
Created: YYYY-MM-DD
Updated: YYYY-MM-DD

## Purpose

State what this prompt book helps the user accomplish and when to use it.

## Intended User

State who this is for and what level of context they are expected to provide.

## Input Contract

- `raw_prompt`: The exact prompt or intent to preserve.
- `goal`: The outcome the user wants.
- `context`: Relevant files, systems, audience, tools, constraints, or examples.
- `constraints`: Deadlines, risk tolerance, budget, style, security, or deployment boundaries.

## Output Contract

- Saved raw prompt.
- Original prompt for immediate use.
- Optimized reusable prompt.
- Optimization notes with diff/rationale.
- Usage notes.
- Failure modes.
- Eval rubric.
- Attribution status.
- Next packaging step.

## Entries

### 001 - <Entry Title>

Date: YYYY-MM-DD
Status: draft
Pattern link: `prompts/<verb>_<topic>/`

#### Raw Capture

```text
<Paste raw prompt exactly. Redact only secrets.>
```

#### Original Prompt

```text
<Faithful original or clean first-pass prompt.>
```

#### Optimized Prompt

```text
<Reusable optimized prompt.>
```

#### Optimization Notes

- Specificity:
- Success criterion:
- Examples:
- Structure:
- Contradiction audit:
- Output contract:
- Safety boundary:
- Predicted delta:

#### Failure Modes

- Overbroad autonomy.
- Missing context.
- Weak output contract.
- Unsafe or private-data leakage.

#### Eval Notes

Describe the tests needed before this prompt becomes a published pattern.
