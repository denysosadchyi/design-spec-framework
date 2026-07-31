# design-spec-framework — consolidated critique (v0.1)

> **Status:** historical audit of v0.1 (2026-07-31). Most findings below are resolved in the
> current tree; kept as the record that drove the rework.

Three independent reviews (practitioner lens · framework-engineering lens vs spec-kit · content-depth audit vs the source canon). Consolidated and deduplicated. Status: **findings only, nothing fixed yet.**

## Verdict

The instinct "empty and simplistic" is half right. The prose layer is dense and often better than spec-kit's (checklists, recovery prompts, constitution). What's missing is everything that turns a document set into a *system*: the framework is **assertion without mechanism** — referenced files that don't exist, templates nothing uses, a state machine that cannot close a phase, and no life after the first pass.

**Keep as-is (genuinely strong):** the ~90 recovery prompts; named failure modes; the constitution's escalation rule; the layering thesis; commands `wireframes`, `research`, `users`, `concept`, `motion`, `handoff` are solid distillations.

---

## A. Broken things (bugs — must fix first)

1. **Five referenced fallback files don't exist.** `.design/templates/{document,extract,critique,audit}.md` + the built-in brief prompt are referenced 12+ times (`build.md:33,44,63,142`, `system.md:30,120`, `critique.md:26`, `responsive.md:32`, `toolbox.md:22-23`). Without the `impeccable` skill, phases 6–8 have **undefined behavior**. "Nothing is a hard dependency" is currently false.
2. **All 16 artifact templates are orphans.** Zero references from any command (verified by grep). The folder is dead weight — and the skeletons contradict the commands they should support (motion token names, width-audit columns, sitemap tree-vs-table, missing trust-triggers / COMPETITORS column, benchmark table without the 6–8 scored criteria).
3. **Three rival git-tag schemes** (`check.md` vs commands vs checklists+pipeline.html) → three of nine phases can never show `tagged`.
4. **The gate requires its own output:** every checklist's last item demands the phase tag, which `/dsf:check` creates only after every item passes.
5. **No phase can ever reach `done`:** `status.md` requires ticked checkboxes; `check.md` forbids the agent from ticking; no command asks the human to tick.
6. **`init.md` renders the dashboard from `.design/templates/pipeline.html` — doesn't exist** (real file: `template/pipeline.html`); also 10-item rail vs 9 phases in data; `init.md` "all locked except 0" vs `phase-0-init.md` "phase 1 in-progress"; no phase-0 entry in `PIPELINE`.
7. **Scaffold omits `responsive/` and `animations/`** while declaring itself exhaustive ("no invented names") — live contradiction at phase 8.
8. **Path drift:** `examples/one-shot/` vs `design-system/examples/one-shot/`; `handoff/handoff.html` vs `handoff/index.html` (pipeline); `wireframes/index.html` linked in dashboard but never produced; phase-8 HTML pages absent from dashboard while `responsive.md` gates on being linked there.
9. **Toolbox status vocabulary differs across four files** (`installed/declined/unavailable/[?]` vs `active/fallback` vs `pending`).
10. **`{{PRODUCT_NAME}}` in pipeline.html is never substituted** by any command; `status.md` references a `<script type="application/json" id="pipeline-data">` block that doesn't exist in the file.
11. **`FRAMEWORK.md` misstates reality:** promises `.claude/settings.json` (absent), says "9 phases, 14 commands" (10 phases, 16 commands). `template/README.md` contains a placeholder link `https://github.com/`. No LICENSE, no CHANGELOG, no `.gitignore`.
12. **`concept.md` leaks the demo case:** hard-codes "the trust benchmark" / "trust signal" — was the demo product's benchmark dimension; must be "the benchmark dimension named in research.md".
13. **`system.md` step 1 "moved, not copied" is a vestigial no-op** (build already creates files in `design-system/`) and risks agents relocating `ui/shell.html`/`ui/kit.html` which later phases expect at `ui/`.
14. **Recovery prompts in `responsive.md`/`motion.md`/`handoff.md` are bulleted prose,** not copy-pasteable fenced blocks like the other commands.

## B. Canon losses (depth that got lost in distillation)

1. **The token usage-audit and its human gate vanished** in the L7+L8 tokens-first merge: no `tokens-audit.md` artifact (variable · value · where used · role), no "nothing is renamed before I review" gate. The rule survived; its evidence and gate did not.
2. **"Two roles = two tokens even if the value is identical today"** — the rule that justifies the semantic layer — appears nowhere; only its inverse (two names, one role) is checked, pushing agents to over-merge.
3. **"One variable, several roles"** — the defect class that motivates the whole token layer — missing from every defect table.
4. **Pixel-identical test shrank** from product-wide (kit + control screens vs pre-refactor) to just the two styled screens; the "opportunistically tweaked while refactoring" failure mode is gone entirely.
5. **Tokens-first never pays its declared cost:** canon says roles named before real screens exist will need revision after assembly; there is no role-revision pass after step 5.
6. **Concrete verifications became assertions:** keyboard-only walkthrough of the new screen in dark theme (L9); double the root font size — breakpoints must move (L10). Both live only in recovery prompts or nowhere.
7. **`concept.html` never retires:** after `DESIGN.md`+`tokens.css` exist it becomes a second, drifting source of visual truth; canon explicitly forbids a duplicated live source.
8. **`init` can't install anything:** no install sources (impeccable = `pbakaus/impeccable` marketplace, `obra/superpowers`, `aistudio.google.com` for the Gemini key…).
9. **Softened honesty heuristics:** "a clean coverage matrix on the first pass is suspicious", "honest personas almost always keep a few `[?]`" — inverted or demoted to recovery prompts.
10. **Phase 5a ships no HTML** — violates constitution rule 2 ("a phase with no viewable page is not done"). Add `voice/voice.html` (principles + dictionary + banned + before/after table) — also the most client-showable phase-5 artifact.

## C. Structural absences (what makes it feel "simplistic")

1. **Zero worked examples.** 16/16 templates are pure `[?]`; not one filled voice principle, semantic token with a real source comment, defect-table row or persona in the whole repo. A described bar is far weaker than an instantiated one. → Ship a filled reference project (`.design/examples/<product>/`) or at minimum a fenced `## Worked example` block in every template; wire every command to its template ("start from X, don't restructure").
2. **No feature loop.** The pipeline runs exactly once; after v1.0 "add saved searches" has no entry point. → `/dsf:feature <name>` → `features/NNN-name/` mini-pipeline (job → IA delta → screens from the system only → copy from voice.md → states/adapt/motion → critique → merge back into sitemap/microcopy/map) + `feature` checklist. Spec-kit's per-feature unit is its core organizing idea; dsf has none.
3. **No change model.** Nothing handles "the client changed the primary job at phase 7". → `/dsf:change "<request>"`: classify earliest invalidated phase, print blast-radius table, gate, re-open phases in dashboard, log the decision.
4. **No decision log.** Seven mandatory gates leave zero trace; "receipts" promise unbacked. → append-only `.design/decisions.md` (date · gate · what was shown · verbatim human answer); `status` reads it.
5. **No drift detector.** "Single source of truth / drift impossible by construction" has no mechanism. → read-only `/dsf:analyze`: full invariant sweep (sitemap↔wireframes↔navigator; strings↔microcopy; components↔inventory↔kit; semantic tokens↔source comments; map.md rows resolve; flow nodes exist), severity table.
6. **No idempotency/resume.** 15 of 16 commands are silent on re-run; a 160-file fan-out that dies mid-way has no story. → per-phase append-only progress ledger + "Re-run behavior" section per command + constitution rule 12.
7. **No customization or upgrade path.** Can't skip a phase (existing brand ≠ can skip concept), can't change conventions; framework fixes can never reach started projects. → `.design/memory/profile.md` (active phases, platform, vocab, gate list), `.design/framework.json` (file ownership: framework/project/merge), `/dsf:upgrade`, CHANGELOG.
8. **Greenfield-only, mobile-first hardcoded.** Brief lets you choose desktop/app; build+responsive+checklists assume tab-bar→sidebar. → platform branch read from CLAUDE.md; `/dsf:adopt` entry path for existing products (crawl → as-is wireframes/inventory/DESIGN.md → gap report).
9. **Gates misallocated.** init has 4, concept/build 5 — but IA (most consequential) has 1, and `system` fans out per-component docs with no sample gate (violates constitution's own "never produce forty things at once"). → add gates: sitemap after ia step 2, personas after users step 2, one sample docs page in system; collapse init's four gates into one.
10. **Copy keys consumed but never produced:** phase 9 depends on `microcopy` keys (`form.submit`); `voice.md` never defines a key scheme. → `<screen>.<zone>.<element>`, stable across rewrites.
11. **A11y back-loaded by construction:** alt text, form label/error association, heading order, touch targets are audited in phase 9 but never built in any phase — and phase 9 forbids fixing. → move into wireframes conventions (`alt`, labels, heading order) and build (`--tap-min`).
12. **No determinism layer.** Status derivation, checklist verification, dashboard regeneration are LLM improvisation each run. → ~30–40% of checklist items get executable `<!-- check: grep … -->` annotations run verbatim by `/dsf:check`; optional small script for state derivation.
13. **No team/client/i18n story.** Branching/ownership for two designers, a home for stakeholder feedback rounds, locale column in microcopy — all absent. (Lower priority; note in profile.md.)
14. **Command frontmatter minimal:** no `argument-hint`, no `allowed-tools` — `status`/`check` promise read-only with nothing enforcing it.

---

## Fix plan (proposed waves)

- **Wave 1 — bug bar (blocks everything):** all of section A. Write the 4 fallback prompt files + brief interrogation, wire templates into commands, one tag scheme + one toolbox vocabulary + one phase table, fix init/dashboard contract (+ product-name substitution, phase 0 entry, json data block), reconcile all paths, scaffold the two missing folders, fix FRAMEWORK.md claims, LICENSE/.gitignore, de-leak "trust", fence the recovery prompts.
- **Wave 2 — substance:** worked examples (mini reference project), restore canon losses (tokens-audit + gate, two-roles rule, control-screen pixel test, role-revision pass, verification steps, concept.html retirement, install sources, voice.html), close the done-state machine (check writes results file, status reads it), rebalance gates, microcopy key scheme, a11y forward-loading, executable checklist annotations.
- **Wave 3 — strategy (pick deliberately):** `/dsf:feature` loop · `/dsf:change` + decisions log · `/dsf:analyze` · profile + framework.json + `/dsf:upgrade` · `/dsf:adopt` · platform branching.
