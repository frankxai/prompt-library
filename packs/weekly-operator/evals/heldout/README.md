# Held-out cases

Written by Codex (codex-cli, OpenAI) on 2026-10-21 from `BRIEF.md` and `FOLDER-FORMAT.md` in this
folder: the public product description and the folder templates, never the skill's instructions.
The builder (Claude) checked only that `cases.yaml` parses and that every fixture folder exists, and
did not read the rubrics or tune the skill against them.

One change was made to the skill after these files arrived: the fixture file names (`week-2026-42.md`)
showed that the spec named week files inconsistently (`week-YYYY-WW.md` in one place, `week-2026-W43.md`
in another). The skill now names files `week-2026-W43.md` and keeps an existing folder's naming. That
is a fix to the spec, visible from the file names alone; no rubric was read.
