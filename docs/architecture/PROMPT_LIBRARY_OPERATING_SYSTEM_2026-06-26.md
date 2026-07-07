# Prompt Library Operating System

Date: 2026-06-26
Status: strategy draft
Owner: Frank / Starlight / Arcanea

## Decision

Use a hybrid architecture:

- **GitHub-native corpus** for canonical reviewed prompts, prompt books, eval fixtures, attribution, changelog, issues, pull requests, and community contribution.
- **Arcanea Prompt Books app** for personal capture, mobile retrieval, editing, import/export, templates, search, user collections, and public/private sharing.
- **MCP/tooling layer** for agent access: search, retrieve, compile, save, optimize, run evals, rank, and promote prompts across Codex, Claude, Grok, local scripts, and future community tooling.
- **Promptfoo-style eval CI** for objective promotion: every reusable prompt should have tests, red-team probes, score, and regression fixtures before it becomes ranked or public.

GitHub is the source of truth for what is excellent and publishable. Arcanea is the place where prompts become alive, searchable, mobile, personal, and useful in daily work.

## Scope Split

Prompt books must stay scoped, otherwise the library turns into soup:

- **Starlight Prompt Books**: general swarms, project leadership, repo execution, SIS governance, MCP/tool retrieval, evidence, rankings, prompt-library operations, agent dispatch, and reusable operating loops.
- **Arcanea Prompt Books**: worldbuilding, lore, canon, characters, mythic creative systems, Arcanean Prompt Language, media prompts, and studio workflows.
- **FrankX Prompt Books**: business strategy, creator products, content, growth, revenue systems, partnerships, and public education.
- **General Prompt Library**: lab-neutral prompts without brand/domain assumptions.

Starlight is the operating system. Arcanea is the world engine. FrankX is the commercial/founder/product surface. The GitHub prompt-library can hold all of them if every prompt and book carries enough scope metadata for Arcanea, MCP, and future websites to filter cleanly.

## Benchmarks

### Fabric

Source: https://github.com/danielmiessler/fabric

What to copy:

- Pattern-per-task model. Fabric frames prompts as reusable "Patterns" for real jobs, not a random pile of clever text.
- CLI-first usage. A prompt library should be executable from terminal/agents, not trapped in a website.
- Custom patterns. Users need local/private prompt folders alongside the public corpus.
- API and web interface. Patterns become more useful when reachable through multiple surfaces.

What not to copy blindly:

- Fabric optimizes for command-line augmentation. Arcanea also needs rich mobile capture, visual prompt books, community ranking, and creator product packaging.

### prompts.chat / Awesome ChatGPT Prompts

Source: https://github.com/f/prompts.chat

What to copy:

- Community browsing and discovery.
- Self-host option for privacy.
- Website-first searchability.
- Simple prompt contribution surface.
- Broad model support language.

What not to copy blindly:

- Big prompt lists are easy to browse but hard to trust. Starlight needs eval score, use history, provenance, versioning, and red-team status as first-class fields.

### Promptfoo

Sources:

- https://github.com/promptfoo/promptfoo
- https://www.promptfoo.dev/docs/integrations/github-action/

What to copy:

- Declarative eval files beside prompts.
- Before/after prompt comparisons in GitHub Actions.
- PR comments with results.
- Red-team runs as part of publishing.
- Caching to reduce eval cost.

What not to copy blindly:

- Promptfoo is eval infrastructure, not a complete product UX. It should become the quality gate for the corpus and MCP, not the only user-facing surface.

### LangSmith Prompt Hub

Source: https://docs.langchain.com/langsmith/prompt-engineering-quickstart

What to copy:

- Prompt version commits.
- UI + SDK workflow.
- Test, refine, save, and tag important versions.
- Pull a prompt by name and optionally by commit/version.

What not to copy blindly:

- Hosted prompt management is useful, but Starlight/Arcanea should keep Git-backed portability and local/private ownership.

## Current Local Assets

### prompt-library

Already has:

- Folder-per-pattern structure.
- Frontmatter schema.
- Promptfoo eval scaffolds.
- Attribution model.
- Red-team status fields.
- Prompt books layer added on 2026-06-25/26.
- Default original-plus-optimized prompt delivery pattern.
- Scope taxonomy for general, Starlight, Arcanea, and FrankX.
- Starlight Swarm Operations prompt book.

Gaps:

- No generated registry/index yet.
- No automated ranking pipeline yet.
- No CI workflow wired yet.
- No MCP server exposing search/retrieve/save/compile.
- No mobile UI; this should live in Arcanea.

### prompt-engine

Already has:

- 13-agent prompt team.
- Prompt Optimizer contract.
- Librarian, evaluator, red-team, harvester roles.
- Flow model in README.

Gaps:

- Some flow files referenced by README are not materialized.
- Needs a real CLI/API that can operate on `prompt-library` assets and produce diffs/eval updates.

### arcanea-ai-app

Already has:

- `/prompt-books` product route.
- Supabase tables for collections, prompts, tags, prompt versions, templates, and prompt search.
- RLS for private/public prompt access.
- Prompt version history.
- Full-text search function.
- Realtime sync.
- Prompt templates and use counts.
- Import/export for JSON/Markdown/Text.
- PWA manifest with `share_target`.
- `/prompt-books/share` route for mobile OS share sheet capture.
- Quick capture modal and floating action button.
- `@arcanea/prompt-books` package with types, markdown, context engine, weight syntax.

Gaps:

- GitHub sync/import from `prompt-library` is not first-class.
- Ranking is mostly recency/favorites/use count, not quality score.
- No eval score, red-team status, provenance, license, source URL, model lane, or public trust score in product types yet.
- No MCP server for agents.
- Mobile capture exists, but needs polish: offline queue, install prompt, "Save from share sheet" QA, prompt-book inbox, and quick optimize-on-save.
- Community submission/promotion workflow is not wired.

## Target Architecture

```text
prompt-library Git repo
  prompts/<id>/
    pattern.md
    examples.md
    evals/promptfoo.yaml
    variants/
  books/<book>/
  registry/index.json
  rankings/*.md
  .github/workflows/prompt-eval.yml

prompt-engine
  optimizer/librarian/evaluator/red-team agents
  CLI: prompt-engine optimize|eval|rank|publish

arcanea-ai-app
  /prompt-books
    personal capture
    mobile retrieval
    import from GitHub registry
    public/private collections
    ratings, use history, favorites
    prompt execution/compile

prompt-mcp-server
  tools:
    search_prompts
    get_prompt
    save_prompt
    optimize_prompt
    evaluate_prompt
    rank_prompts
    compile_prompt
    publish_prompt
```

## Canonical Data Model

The shared prompt entity should support:

- `id`
- `title`
- `description`
- `content`
- `system_prompt`
- `negative_prompt`
- `lane`: claude, gpt, gemini, oss, cross-lab
- `category`
- `tags`
- `techniques`
- `variables`
- `input_contract`
- `output_contract`
- `failure_modes`
- `examples`
- `eval_score`
- `eval_last_run`
- `eval_test_count`
- `red_team_status`
- `red_team_notes`
- `provenance_source`
- `source_url`
- `attribution`
- `license`
- `visibility`
- `owner`
- `version`
- `created_at`
- `updated_at`
- `use_count`
- `success_count`
- `rating_count`
- `rating_average`
- `rank_score`

For Arcanea, add these fields through metadata first if a DB migration is too heavy, then promote stable fields into columns.

## Ranking Model

Rank should not be a vibe score. Use weighted signals:

```text
rank_score =
  0.35 * eval_score_normalized
+ 0.20 * red_team_status_score
+ 0.15 * use_success_rate
+ 0.10 * recency_decay
+ 0.10 * community_rating
+ 0.05 * provenance_confidence
+ 0.05 * editor_pick
```

Status tiers:

- **Inbox**: captured, raw, unreviewed.
- **Draft**: structured but unevaluated.
- **Tested**: eval rubric exists and passes minimum tests.
- **Trusted**: red-team pass + recurring successful use.
- **Published**: public/community-safe, attribution clean.
- **Premium**: productized, documentation, examples, screenshots/results if relevant.

## Mobile Capture And Retrieval

Arcanea should be the mobile surface:

- Installable PWA.
- OS share target already exists; harden it.
- One-tap "Save prompt" inbox.
- Offline queue for captures.
- Prompt inbox triage: raw, original, optimized, tags, collection, visibility.
- Search-first mobile home: recent, favorites, top ranked, prompt books.
- "Copy", "Run", "Open in ChatGPT/Claude/Gemini", "Send to Codex", "Save as template".
- Quick voice/note capture later.

Minimum mobile loop:

1. From phone, share text/URL/file to Arcanea Prompt Books.
2. Capture lands in Inbox.
3. Arcanea offers "Optimize now" using prompt-engine/MCP.
4. User saves to collection or leaves as raw.
5. Prompt becomes searchable immediately.
6. Prompts promoted to GitHub only after review/eval.

## MCP Layer

Build a small MCP server after the registry exists. It should read both:

- local `prompt-library` git files
- Arcanea/Supabase prompt books for private user prompts

Initial tools:

- `search_prompts(query, filters)`
- `get_prompt(id, version?)`
- `save_prompt(raw, collection?, visibility?)`
- `optimize_prompt(id_or_raw, target_lab?)`
- `compile_prompt(id, variables, target_lab?)`
- `evaluate_prompt(id)`
- `rank_prompts(filters?)`
- `publish_prompt(id, target: github|arcanea)`

Security rules:

- Private prompts never publish to GitHub by default.
- Secrets are redacted on save and blocked on publish.
- MCP responses should return prompt metadata and content only when authorized.
- Public prompt packs go through `private-memory-veil` before release.

## GitHub-Native Workflow

Use GitHub as the reviewed corpus engine:

1. New prompt lands in `books/<book>/` or `prompts/<id>/`.
2. CI validates frontmatter/schema.
3. CI runs promptfoo eval when prompt files change.
4. CI posts before/after eval results on PR.
5. Red-team status updates from results.
6. Registry build writes `registry/index.json`.
7. Ranking build writes `rankings/top-ranked.md` and `rankings/by-category/*.md`.
8. Arcanea pulls registry on schedule or manual sync.

Community contribution should use PR templates:

- New prompt
- New prompt book
- Eval improvement
- Red-team finding
- Attribution/license correction

## Arcanea Product Workflow

Arcanea should become the daily command center:

1. Capture prompt from mobile/web/extension.
2. Store private draft in Supabase.
3. Optimize with prompt-engine.
4. Run quick eval or checklist.
5. Use/copy/execute prompt.
6. Track use_count and manual success signal.
7. Promote to public collection or GitHub PR when worthy.
8. Pull ranked public prompts from GitHub into public gallery.

## Build Order

### Phase 1: Registry And Docs

- Add `registry/index.json` generator for `prompt-library`.
- Add schema validation command.
- Add ranking generator from frontmatter.
- Add public `docs/architecture` strategy and contribution templates.

### Phase 2: Eval CI

- Add promptfoo dependency/config.
- Add GitHub Action watching `prompts/**`.
- Add red-team workflow for high-impact prompts.
- Cache eval outputs.

### Phase 3: Arcanea Sync

- Add importer from GitHub registry into Arcanea prompt templates/public collections.
- Add metadata mapping for eval/provenance/rank.
- Add "Public Library" tab separate from "My Prompt Books".

### Phase 4: Mobile Capture Polish

- QA PWA install/share target on iOS/Android.
- Add offline capture queue.
- Add prompt inbox triage.
- Add "Optimize on save" action.

### Phase 5: MCP

- Build `prompt-library-mcp`.
- Tools: search/get/save/optimize/evaluate/rank/compile.
- Wire into Codex/Claude/Grok local configs.

### Phase 6: Community And Productization

- Add public gallery on Arcanea.
- Add editor picks and ranked lists.
- Add community submission flow.
- Add premium prompt-book packaging path.

## Recommended Next Action

Phase 1 has started with:

- `scripts/build-registry.mjs`
- `registry/index.json`
- `rankings/by-rank.md`

Next Phase 1 work:

- `prompt-library/docs/contributing-prompt-books.md`
- schema validation command
- GitHub Action for registry/ranking generation

Then wire Arcanea and a future Starlight prompt-books surface to consume the registry rather than inventing separate sources of truth.
