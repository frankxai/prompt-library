# Gumroad listing draft: Prompt Optimizer

Status: DRAFT. Not for publication until every box in "Before publish" is ticked. Price and publish are Frank's.

## Listing

**Name:** Prompt Optimizer: a tested skill for Claude, GPT and Gemini

**Price:** €1+ (pay what you want, minimum €1, suggested €3)

**Summary line:** Paste a prompt, get a better one with the reasons spelled out, plus a test to check it.

**Description:**

Most "prompt packs" ask you to trust them. This one shows its test results.

Prompt Optimizer is one skill. Give it a prompt, or describe what you need, and it returns:

- your original prompt, kept exactly as you wrote it (with any API key you pasted by mistake replaced by a placeholder)
- an improved version with a clear goal, the inputs it needs, an output format and limits
- a list of what changed and why, including any instructions that contradicted each other
- 3 to 7 checks you can run to see whether the new version really does better

It adapts the prompt to the model you use: Claude, GPT or Gemini.

**Tested, with the numbers shown.** We run it against a plain "improve this prompt" request on 10 cases, graded on the same rubric, on three model families. The scorecard in the download shows every result, including the cases where it did not win. [SCORECARD SUMMARY GOES HERE AFTER THE RUN]

**Works where you already work.** Claude Code, Codex CLI, Gemini CLI, or pasted into ChatGPT, Claude.ai or Gemini. No account, no app, no extra API key.

**Open source.** The source is MIT-licensed on GitHub. €1 gets you the packaged, tested version and supports the next one.

## Claims and evidence (gate G0)

| Claim on the listing | Evidence |
|---|---|
| Keeps the original exactly | eval case "Raw prompt preserved verbatim" |
| Replaces a pasted API key | eval case "Secret in the raw prompt is redacted" |
| Clear goal, inputs, format, limits | eval cases "Intent only", "GPT target", "Gemini target" |
| Flags contradicting instructions | eval case "Contradictory constraints are surfaced" |
| Gives checks to test the new version | eval case "No unearned claim of being better"; SKILL.md rule 6 |
| Adapts to Claude, GPT, Gemini | eval cases for each target |
| Tested on three model families vs a baseline | `evals/promptfoo.yaml`, SCORECARD.md (pending) |
| Works in Claude Code, Codex CLI, Gemini CLI, browser chat | G1 install log (pending) |
| No extra API key needed | runs inside the buyer's own tool; true by construction |

## Before publish (fast lane)

- [ ] Add a third prompt to the eval: the strongest free prompt-improver we can find, so the scorecard compares against it as well as the plain baseline
- [ ] Add 3+ held-out cases written by a different agent and provider, kept out of the builder's context
- [ ] Check the grader: a human verdict on 5 sampled outputs agrees with the `llm-rubric` verdict
- [ ] Eval run on all three models; SCORECARD.md written with date, model ids, outcome score for pattern vs both baselines, and failures
- [ ] Pattern beats both baselines on the `outcome` metric. If it does not, do not publish; revise and re-run
- [ ] G1: install tested in Claude Code and one other tool, log attached
- [ ] Mini G2: a fresh agent with no estate context uses the skill on 3 real prompts; outputs judged better than the unaided version
- [ ] G3: Codex review as a buyer who declined; findings fixed
- [ ] G4: one real €1 test purchase: VAT shown correctly (Gumroad adds it on top), receipt, download, refund path, and the EU notice that immediate download ends the 14-day withdrawal right, with consent captured
- [ ] Frank sets price and clicks publish
