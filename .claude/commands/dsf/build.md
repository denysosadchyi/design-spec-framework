---
description: Phase 6 — Build. Tokens-first assembly: DESIGN.md from the approved screens, component inventory, token usage audit with a human gate, two-level tokens + component kit, own visuals, all screens assembled in place, role revision, dark-theme stress test.
---

# /dsf:build — Phase 6 · Build

Turn the approved visual language into the whole product. A screen is a composition, not a drawing: between the language and the screens sits a **kit** — `design-system/tokens.css` (primitive + semantic) and `design-system/components/*.css` — plus the showcase `ui/kit.html`. Screens are never redrawn as copies: the same `wireframes/*.html` files link the kit and are rebuilt from its classes.

**Tokens-first.** The kit is built on two token levels from the first line. Flat variables are not written and then refactored — the roles are read out of a **usage audit** of the approved screens and the wireframe inventory, and approved by the human, before any component CSS exists. Naming roles this early has a cost: they are revised once the whole product is assembled (step 7), and that revision is part of the plan.

**No new style ever appears on a screen.** A missing detail goes into the kit first, then gets used.

---

## Prerequisites

Required artifacts. If one is missing, stop and name the command that produces it:

| Artifact | Missing → run |
|---|---|
| `wireframes/*.html` (all screens + state pages), `wireframes/_conventions.md` | `/dsf:wireframes` |
| `voice/microcopy.md` | `/dsf:voice` |
| `concept/concept.md`, `concept/references.md` | `/dsf:concept` |
| Two approved styled screens (from `/dsf:concept`) | `/dsf:concept` |
| `ia/sitemap.md` | `/dsf:ia` |

Do not proceed on partial input. A kit extracted from one styled screen loses states, skeletons and fonts.

## Read first

1. `.design/memory/constitution.md` — the engine rules; they bind every step below.
2. `.design/memory/toolbox.md` — which tools are active. Branch every step accordingly:
   - `impeccable` skill active → use `/impeccable document`, `/impeccable extract`, `/impeccable critique`, `/impeccable audit`. Otherwise → use the built-in fallback prompts in `.design/prompts/` (`document.md`, `extract.md`, `critique.md`, `audit.md`).
   - Image generation → Gemini image API if a key is available; otherwise Unsplash by content theme.
   - Hosting → GitHub push if configured; otherwise local static server only.
3. `CLAUDE.md` — accumulated project context.
4. `.design/progress/phase-6.md` — this command's own ledger. Before step 1, report what you will skip, redo or resume based on it, then proceed only after stating that.

---

## Steps

After completing each numbered step and each HUMAN GATE, append the ledger line to `.design/progress/phase-6.md` and update the `steps` object in the pipeline-data block (current → done).

### 1. DESIGN.md from the approved screens

Document the language **from code**, not from memory. Run `/impeccable document` (fallback: `.design/prompts/document.md`) over the two approved styled screens together with their state pages. Output: product `DESIGN.md` at the repo root.

The screens are the living truth: they are hand-edited, so they show what the design actually is. Therefore **update `concept/concept.md` to match the screens** — wherever `DESIGN.md` diverges from `concept.md`, change `concept.md` so it describes what is really in the screens, and note the reason per attribute. Divergence is almost always `concept.md` lagging behind, not the screen being wrong.

**Exception — HUMAN GATE:** a decision in the screen that contradicts the "designer's taste" section or the anti-references in `concept.md` is **not** written in silently. List every such conflict separately and stop; the user decides which side wins. Append each resolution to `.design/decisions.md` (constitution rule 7 — every gate leaves a trace).

Add a "Sources" section to `DESIGN.md` linking `concept/concept.md` and `concept/references.md`.

**Retire `concept/concept.html`.** From the moment `DESIGN.md` and (in step 4) `design-system/tokens.css` exist, the test stand becomes a second, drifting source of visual truth — the exact duplication the constitution forbids. It is **superseded by `ui/kit.html`**. Either freeze it with a header note at the top of the file — *"Superseded by `ui/kit.html` on <date>. Historical: the language as it was found in phase 5. Do not edit."* — or delete it; git remembers either way. It is never edited again, and no later phase reads it. Record which of the two you did in `DESIGN.md`.

### 2. Component inventory read out of the wireframes

Read **all** `wireframes/*.html` including state pages, plus `ia/sitemap.md`. Write `ui/inventory.md`: a table with columns *component · screens it appears on · states · needs a photo*.

- This is the inventory of the **whole product**, not of the two styled screens. Do not narrow it to what `DESIGN.md` or `concept.md` already mention — many components (chat bubble, verification code field, checkbox, secondary button, banner) exist only in still-grey wireframes and must be in the table.
- Entry criterion: **two or more occurrences**. Single blocks go into a separate "One-off" list at the bottom and are not pulled into the kit.
- Group the table by role: navigation, cards & lists, forms, feedback, conversation.
- Invent nothing. Only what actually stands in the wireframes.

### 3. Usage audit — the evidence tokens are named from

**Before a single line of `tokens.css`.** A role invented from a naming instinct is a guess; a role read out of real usages is a finding. This step produces the evidence, and the human approves it before anything is renamed.

Read every styled screen with its state pages, `ui/inventory.md` and `DESIGN.md`, and write **`ui/tokens-audit.md`**: one row per variable or raw value actually present, columns

| variable / value | where it is used (file + class) | role it plays there |
|---|---|---|

Fill it from the code, not from intent — `#2E6E5C` written literally in `.card__badge` is a row, exactly like `--green-600` is.

Then three finding sections, each listing the rows that prove it:

1. **Value drift** — near-identical values doing the same work (`#2E6E5C` on one screen, `#2F6F5D` on another; `11px` and `12px` radius on the same card). Propose the one value to keep.
2. **One variable, several roles** — a single variable used where two different meanings live (the same green as the brand accent *and* as the "verified" status; the same grey for a page background *and* a disabled label). This is the defect the whole token layer exists to fix: the day the status colour must change, the brand changes with it.
3. **Values bypassing variables** — hexes, pixel values and font names written directly in classes, with nothing standing behind them.

Close with **candidates for semantic roles**: each proposed role name, and under it **the usages that prove it** — the rows from the table. A role with one usage on one screen is not a role yet; list it as a watch item, not a candidate.

> **HUMAN GATE — audit sign-off.** Present `ui/tokens-audit.md` and stop. **Nothing is renamed, merged or consolidated before the human reviews it.** Names are the part of a system people live with the longest, and a merge made now is invisible for months. The human confirms the drift merges, the role splits and the role names. Append their answer to `.design/decisions.md` (constitution rule 7 — every gate leaves a trace).

### 4. Tokens + components + shell + showcase

Build the kit from the **approved** audit with `/impeccable extract` (fallback: `.design/prompts/extract.md`), fed **all** styled screens **together with their state pages**, plus `ui/tokens-audit.md`, `DESIGN.md`, `ui/inventory.md`, `concept/concept.md`, `voice/microcopy.md`. Extract picks up states, skeletons, fonts and reconciles name drift — what a hand extraction from one screen misses.

Output, two levels from the start:

**`design-system/tokens.css`**
- **PRIMITIVE** — raw values with no role: colors and geometry (spacing, radii, sizes, type scale) taken from the approved screens. Value drift (`#2E6E5C` here, `#2F6F5D` there) is consolidated to one value with a comment saying what was merged. No value is invented that is not already on a screen.
- **SEMANTIC** — color roles only (`--bg-page`, `--bg-surface`, `--text-primary`, `--text-muted`, `--color-action`, `--color-verified`, `--color-danger`). Every role comes from the approved candidate list in `ui/tokens-audit.md`, references a primitive via `var()`, and carries a **source comment** naming the usages it grew from.

Four rules:
- **Color flows only through semantic roles.** A component reading a color primitive directly is a hole the first theme will find.
- **Geometry reads primitives directly.** Radius, spacing, size get no semantic level — they do not change with theme or rebrand the way color does.
- **Two roles = two tokens, even if the value is identical today.** The test is not "do they look the same", it is **"could these diverge?"** — could the brand accent and the "verified" status ever need different colours? Then they are two tokens pointing at the same primitive today. Merging them saves one line now and costs a search-and-replace across the product later, at the exact moment when the two meanings finally part. The audit's "one variable, several roles" section is the list of splits to make here.
- Names come from the inventory and `DESIGN.md`, never a ready-made set borrowed from someone else's design system (`--color-primary`, `--surface-2`). A color that stands in exactly one file and one class is not a semantic token yet — it stays a watch item in `ui/tokens-audit.md` and gets flagged in the defect table instead.

State tokens (hover, focus, disabled) are **not** added here — they belong to `/dsf:system`, where every state lands in both themes at once alongside its documentation.

**`design-system/components/`** — one file per component (`card.css`, `button.css`, `badge.css` …) plus `index.css` importing the rest. No hex, pixel value or font name written in a class; everything through `var()`. The wireframe scaffolding (`.wf-*`, the `.device` frame) is not carried over.

**`ui/shell.html`** — the shell as **markup**, not just CSS: header + tab bar. A grey screen takes its shell from here; a CSS-only kit cannot dress what has no skeleton.

**`ui/kit.html`** — the showcase: links `design-system/tokens.css` + `design-system/components/index.css`, shows every component in every state with real copy from `microcopy.md`, plus the shell.

Styled components must look exactly like the reference. A still-grey component takes its real structure from its wireframe and its look from the `DESIGN.md` language — not from imagination.

> **HUMAN GATE.** Stop. The user opens `ui/kit.html` in the browser and reviews every component before anything is rolled out. Do not continue until they say so.

### 5. Own visuals

Stock photos shot by different people in different light turn a six-card feed into a collage. Product imagery is a system layer like color and type.

Determine the set from the *needs a photo* column of `ui/inventory.md` — do not re-decide it. Generate the images per toolbox (Gemini image generation; fallback: Unsplash picked by content theme) into `visuals/`:

- **one colorway** for the whole set, temperature matched to the `DESIGN.md` palette;
- **meaningful filenames** (`room-riverside-1.jpg`, `person-lead-analyst.jpg`), never `img1.jpg`;
- the **generation prompt recorded in `visuals/README.md`**, so later images come out in the same style;
- photo matches content theme — a room card gets an interior, an avatar gets a portrait.

Swap the generated images into `ui/kit.html` in place of the stock ones.

### 6. Assemble all screens from the kit

Every screen already exists in `wireframes/`. They are not created here — they are **dressed in the kit, in the same files, no copies**. The git history is the archive of each stage.

Group by **role** (the groups already in the wireframe navigator). Grouping is not for finding screens — it is for assembling and reviewing in coherent batches and for fanning out subagents.

1. **The pixel-identical test — three control screens.** Convert the two approved styled screens onto the kit, plus **one third screen of a different type** (a form, a conversation, a settings page — whatever is least like the first two): link the system CSS, replace inline styles with component classes. Save a before-shot of each of the three first, then compare before and after side by side, element by element. **The look must not change by a pixel.** If it changed, the kit is wrong, not the screen — fix `tokens.css` or the component and re-compare. Three screens, not two: two similar screens can both be wrong in the same way and still agree with each other.
2. **No opportunistic visual tweaks during assembly.** While rebuilding a screen you will notice things — this spacing is tight, that heading is small. Fix none of them here. This step proves the kit reproduces the approved design exactly; a "small improvement" made now makes it impossible to tell whether a difference is a kit defect or an intentional change, and the test loses its meaning. Keep a list of the noticed improvements, and take them through a separate **"keep it"** after the phase, where they land in the kit and roll out everywhere.
3. Then the first role group with all its states: each screen links the system CSS, takes the shell (header + tab bar) from `ui/shell.html`, keeps structure and copy from the wireframe unchanged, and takes its look **only** from kit classes.
4. **No new style appears on a screen.** Missing a component or a variant → add it to `design-system/components/`, to `ui/kit.html` and to `ui/inventory.md` first, then use it.

> **HUMAN GATE.** Stop after the first group. The user reviews it in the browser.

Once the first group passes, fan the remaining roles out to **parallel subagents** — one per role (or per batch inside a role). Same rules: no copies, system CSS linked, structure and copy from the wireframe, look only from kit classes, new goes to the kit first, no opportunistic tweaks. At the end, list the screens where subagents added something to the kit — those are reviewed first.

### 7. Role revision — the cost of naming roles early

Tokens-first has a declared price, and this is where it is paid. The semantic roles in step 4 were read from two screens and an inventory; now the whole product exists and the evidence is complete. **Roles named before the real screens existed will need revision — that is expected, not a failure.**

Walk `design-system/tokens.css` against the assembled product:

- **A role used exactly once demotes to a primitive.** One usage is a value with an aspiration, not a role. Demote it and note in the source comment where it went.
- **A role serving three different meanings splits.** If `--color-accent` now carries the brand, the active navigation item and the "verified" status, those are three roles that happen to share a value. Split them, point them at the same primitive, and let them diverge later without a search-and-replace.
- **A role nothing reads is deleted.** Not commented out — deleted; git remembers.
- Every change here updates both the source comment and the matching row in `ui/tokens-audit.md`, so the audit still describes the system that exists.

Report the revisions as a short table — *role · what changed · why* — and, if any of them changes a name a component reads, fix the components in the same pass. No screen is edited to accommodate a token rename.

### 8. Dark theme — architecture stress test

Not a product feature: a proof that the semantic level earns its keep. A rebrand would work on flat variables too; a theme only works with a role layer.

- Add `[data-theme="dark"]` to `design-system/tokens.css` **overriding semantic tokens only** — backgrounds, text, borders, action. Primitives and `components/` are not touched.
- **Every semantic text/background pair carries a contrast comment, in both themes** — not only the pairs the dark block introduces. Walk the full list of semantic roles, compute the ratio for each foreground/background combination that actually occurs, and write it next to the token in the light block and in the dark block. A pair documented in one theme only is the same defect as a token defined in one theme only: the theme where nobody checked is the theme where the text disappears.
- Put the theme toggle **in the navigator panel** that already stands on every screen — so the theme is visible on any real screen, not only in the showcase.
- **If you had to edit `components/` to make the theme work, that is a defect**: a component is reading a color primitive directly. Find it and fix it in the component, not in the theme block.

> **HUMAN GATE.** The user reviews the theme on real screens. **Keeping dark theme in the product is a separate product decision**, not an automatic one. Record the decision in `DESIGN.md` and append it to `.design/decisions.md` (constitution rule 7 — every gate leaves a trace).

### 9. Defect table, gate, fix

Check all screens against the kit (`design-system/tokens.css`, `design-system/components/`, `ui/kit.html`) and `DESIGN.md`. Produce a table with columns *file · element · what is wrong · how to fix*. Look for:

- a screen with its own style block, or without the system CSS linked;
- a style written directly on a screen, outside kit classes;
- the same component with different markup on different screens or inside one page (component drift);
- a new color/background pair below WCAG AA contrast, in either theme;
- a stock photo instead of `visuals/`, a photo off the content theme, an icon outside the chosen set;
- copy diverged from `voice/microcopy.md`;
- a hex, pixel value or font name written in a class instead of a primitive;
- a component reading a **color primitive** directly, bypassing semantic;
- **two names for one role** (`--bg-card` and `--bg-surface` on the same background);
- **one variable, several roles** — a single token used for two meanings that could diverge (the brand accent doubling as the "verified" status, a page background doubling as a disabled surface). Two roles = two tokens even when the value is identical today; this row is the reason the semantic level exists, and it is the easiest one to stop seeing;
- a semantic token without a source comment, or a source comment that no longer matches `ui/tokens-audit.md`;
- a semantic role with exactly one usage in the whole product (demote it to a primitive);
- a semantic text/background pair without a contrast comment in **both** themes;
- geometry written as a number instead of a primitive.

Run `/impeccable audit` (fallback: `.design/prompts/audit.md`) and merge its findings into the table.

> **HUMAN GATE.** Deliver the table only — no fixes yet. The user prioritizes. Append their priorities to `.design/decisions.md`.

Then work the table and fix **everything together**: tokens, components, screens and `DESIGN.md` in one pass.

---

## Edit routing (write this rule into CLAUDE.md)

From this phase on, a fix lives in the kit, never on a screen:

- **Value edit** (color, size, spacing) → the token at the matching level in `design-system/tokens.css`. The shared file is linked everywhere, so the change **propagates to all screens by itself**.
- **Markup edit** (component structure) → `ui/kit.html`. CSS will not propagate it, so roll it out to every screen where the component stands.
- **"Keep it"** → update the rule in `CLAUDE.md`: *when the user says "keep it" about a visual edit — update the kit (`design-system/tokens.css` and the showcase `ui/kit.html`), record the reason in `DESIGN.md`, append the decision to `.design/decisions.md`, and roll the markup change out to all screens.*
- The improvements parked during assembly (step 6) come back here, one "keep it" at a time — never inside the pixel-identical test.
- A fix applied to one screen only is drift, and step 9 will catch it.

---

## Phase checklist

Verify against `.design/checklists/phase-6-build.md` (or run `/dsf:check 6`); do not proceed with a failing criterion — fix it or record an explicit exception in `.design/decisions.md`.

## Close the phase

1. Update `CLAUDE.md` — "Build" section: kit location, edit-routing rule, "new goes to the kit first", the dark-theme decision, and that `concept/concept.html` is retired.
2. Update `README.md` — "UI" section: `DESIGN.md`, `ui/inventory.md`, `ui/tokens-audit.md`, `ui/kit.html`, `design-system/`, `visuals/`.
3. Update `index.html` — edit **only** the `<script id="pipeline-data">` JSON block: phase 6 status, its artifact entries, `ui/kit.html` plus the styled screens as live links, and the `steps` object. Leave the `context` object as it is; this phase fills none of its keys. Do not touch the markup, CSS or scripts around the block.
4. Commit (push per `toolbox.md`).
5. Do not create a git tag. Tell the human to run `/dsf:check` to close the phase — it verifies the checklist and creates the phase tag `phase-6-build`. The next command after that is `/dsf:system`.

## Outputs

- `DESIGN.md` — product language documented from code, reconciled with `concept.md`, with a Sources section
- `ui/inventory.md` — component inventory + "One-off" list
- `ui/tokens-audit.md` — the approved usage audit: variable · usages · role, the three finding classes, the role candidates with their evidence
- `design-system/tokens.css` — primitive + semantic, with source comments and the `[data-theme="dark"]` block
- `design-system/components/*.css` + `index.css`
- `ui/shell.html`, `ui/kit.html`
- `visuals/` + `visuals/README.md` with the generation prompt
- all `wireframes/*.html` assembled from the kit — the same files, not copies

---

## Recovery prompts

Copy-paste when the agent drifts.

```
This block is styled directly on the screen. Move the style into a component class in
design-system/components/ (values into tokens: color through a semantic role, geometry
through a primitive), add the component to the showcase ui/kit.html and to ui/inventory.md,
and rebuild the block from the kit.
```

```
Compare <component> on <screen A> and <screen B> — they must be the same component class
from design-system/components/. If they differ, the kit is the source of truth: fix the screens.
```

```
These images fall out of the set's colorway. Re-read the generation prompt in
visuals/README.md, generate replacements in the same style and swap them in.
```

```
The kit has bloated: check design-system/components/ and ui/kit.html against ui/inventory.md.
Remove components that are not in the inventory and that no screen in wireframes/ uses.
```

```
This component reads a color primitive directly. Find the semantic role it actually plays,
route it through that role, and if the role does not exist yet, add it to tokens.css with a
source comment naming the usages it grew from.
```

```
The dark theme required edits inside components/. That is an architecture defect, not a theme
problem. Find every component reading a color primitive directly, fix them, then revert the
component edits and re-derive the theme from semantic tokens only.
```

```
You wrote tokens.css before the usage audit. Stop and produce ui/tokens-audit.md first:
every variable and raw value, where it is used (file and class), the role it plays there —
then value drift, one variable serving several roles, values bypassing variables, and the
role candidates with the usages that prove them. Rename nothing until I have reviewed it.
```

```
You merged these two tokens because they hold the same value today. Ask the other question:
could they diverge? If the brand accent and this status could ever need different colours,
they are two roles — split them, point both at the same primitive, and say so in the source
comments.
```

```
The look changed while you were assembling from the kit. This step is a pixel-identical
test: restore the screen to the approved appearance and fix the kit instead. Park the
improvements you noticed in a list — we take them through a separate "keep it" after the
phase.
```

```
The product is fully assembled, so run the role revision: name every semantic role used
exactly once (demote to primitive), every role now serving three different meanings (split),
and every role nothing reads (delete). Update the source comments and ui/tokens-audit.md in
the same pass.
```

```
This contrast comment exists only in the light theme. Compute the ratio for every semantic
foreground/background pair that actually occurs, in both the light block and
[data-theme="dark"], and write it next to the token.
```

```
DESIGN.md and concept.md have diverged again. The screens are the living truth: update
concept.md to describe what is really in the screens, note the reason per attribute, and list
separately anything that contradicts the designer's taste or the anti-references — I decide those.
```
