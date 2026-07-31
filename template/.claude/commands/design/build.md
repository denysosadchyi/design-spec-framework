---
description: Phase 6 — Build. Tokens-first assembly: DESIGN.md from the approved screens, component inventory, two-level tokens + component kit, own visuals, all screens assembled in place, dark-theme stress test.
---

# /design:build — Phase 6 · Build

Turn the approved visual language into the whole product. A screen is a composition, not a drawing: between the language and the screens sits a **kit** — `design-system/tokens.css` (primitive + semantic) and `design-system/components/*.css` — plus the showcase `ui/kit.html`. Screens are never redrawn as copies: the same `wireframes/*.html` files link the kit and are rebuilt from its classes.

**Tokens-first.** The kit is built on two token levels from the first line. Flat variables are not written and then refactored — the roles are read out of the two approved screens and the wireframe inventory before any component CSS exists.

**No new style ever appears on a screen.** A missing detail goes into the kit first, then gets used.

---

## Prerequisites

Required artifacts. If one is missing, stop and name the command that produces it:

| Artifact | Missing → run |
|---|---|
| `wireframes/*.html` (all screens + state pages), `wireframes/_conventions.md` | `/design:wireframes` |
| `voice/microcopy.md` | `/design:voice` |
| `concept/concept.md`, `concept/references.md` | `/design:concept` |
| Two approved styled screens (from `/design:concept`) | `/design:concept` |
| `ia/sitemap.md` | `/design:ia` |

Do not proceed on partial input. A kit extracted from one styled screen loses states, skeletons and fonts.

## Read first

1. `.design/memory/constitution.md` — the engine rules; they bind every step below.
2. `.design/memory/toolbox.md` — which tools are installed. Branch every step accordingly:
   - `impeccable` skill → use `/impeccable document`, `/impeccable extract`, `/impeccable critique`, `/impeccable audit`. Not installed → use the built-in prompts in `.design/templates/` (`document.md`, `extract.md`, `critique.md`, `audit.md`).
   - Image generation → Gemini image API if a key is available; otherwise Unsplash by content theme.
   - Hosting → GitHub push if configured; otherwise local static server only.
3. `CLAUDE.md` — accumulated project context.

---

## Steps

### 1. DESIGN.md from the approved screens

Document the language **from code**, not from memory. Run `/impeccable document` (fallback: `.design/templates/document.md`) over the two approved styled screens together with their state pages. Output: product `DESIGN.md` at the repo root.

The screens are the living truth: they are hand-edited, so they show what the design actually is. Therefore **update `concept/concept.md` to match the screens** — wherever `DESIGN.md` diverges from `concept.md`, change `concept.md` so it describes what is really in the screens, and note the reason per attribute. Divergence is almost always `concept.md` lagging behind, not the screen being wrong.

**Exception — HUMAN GATE:** a decision in the screen that contradicts the "designer's taste" section or the anti-references in `concept.md` is **not** written in silently. List every such conflict separately and stop; the user decides which side wins.

Add a "Sources" section to `DESIGN.md` linking `concept/concept.md` and `concept/references.md`.

### 2. Component inventory read out of the wireframes

Read **all** `wireframes/*.html` including state pages, plus `ia/sitemap.md`. Write `ui/inventory.md`: a table with columns *component · screens it appears on · states · needs a photo*.

- This is the inventory of the **whole product**, not of the two styled screens. Do not narrow it to what `DESIGN.md` or `concept.md` already mention — many components (chat bubble, verification code field, checkbox, secondary button, banner) exist only in still-grey wireframes and must be in the table.
- Entry criterion: **two or more occurrences**. Single blocks go into a separate "One-off" list at the bottom and are not pulled into the kit.
- Group the table by role: navigation, cards & lists, forms, feedback, conversation.
- Invent nothing. Only what actually stands in the wireframes.

### 3. Tokens + components + shell + showcase

Build the kit with `/impeccable extract` (fallback: `.design/templates/extract.md`), fed **all** styled screens **together with their state pages**, plus `DESIGN.md`, `ui/inventory.md`, `concept/concept.md`, `voice/microcopy.md`. Extract picks up states, skeletons, fonts and reconciles name drift — what a hand extraction from one screen misses.

Output, two levels from the start:

**`design-system/tokens.css`**
- **PRIMITIVE** — raw values with no role: colors and geometry (spacing, radii, sizes, type scale) taken from the approved screens. Value drift (`#2E6E5C` here, `#2F6F5D` there) is consolidated to one value with a comment saying what was merged. No value is invented that is not already on a screen.
- **SEMANTIC** — color roles only (`--bg-page`, `--bg-surface`, `--text-primary`, `--text-muted`, `--color-action`, `--color-verified`, `--color-danger`). Each role is **read out of real usages** across the screens and the inventory, references a primitive via `var()`, and carries a **source comment** naming the usages it grew from.

Three rules:
- **Color flows only through semantic roles.** A component reading a color primitive directly is a hole the first theme will find.
- **Geometry reads primitives directly.** Radius, spacing, size get no semantic level — they do not change with theme or rebrand the way color does.
- Names come from the inventory and `DESIGN.md`, never a ready-made set borrowed from someone else's design system (`--color-primary`, `--surface-2`). A color that stands in exactly one file and one class is not a semantic token yet — flag it in step 7's table instead.

State tokens (hover, focus, disabled) are **not** added here — they belong to `/design:system`, where every state lands in both themes at once alongside its documentation.

**`design-system/components/`** — one file per component (`card.css`, `button.css`, `badge.css` …) plus `index.css` importing the rest. No hex, pixel value or font name written in a class; everything through `var()`. The wireframe scaffolding (`.wf-*`, the `.device` frame) is not carried over.

**`ui/shell.html`** — the shell as **markup**, not just CSS: header + tab bar. A grey screen takes its shell from here; a CSS-only kit cannot dress what has no skeleton.

**`ui/kit.html`** — the showcase: links `design-system/tokens.css` + `design-system/components/index.css`, shows every component in every state with real copy from `microcopy.md`, plus the shell.

Styled components must look exactly like the reference. A still-grey component takes its real structure from its wireframe and its look from the `DESIGN.md` language — not from imagination.

> **HUMAN GATE.** Stop. The user opens `ui/kit.html` in the browser and reviews every component before anything is rolled out. Do not continue until they say so.

### 4. Own visuals

Stock photos shot by different people in different light turn a six-card feed into a collage. Product imagery is a system layer like color and type.

Determine the set from the *needs a photo* column of `ui/inventory.md` — do not re-decide it. Generate the images per toolbox (Gemini image generation; fallback: Unsplash picked by content theme) into `visuals/`:

- **one colorway** for the whole set, temperature matched to the `DESIGN.md` palette;
- **meaningful filenames** (`room-riverside-1.jpg`, `person-lead-analyst.jpg`), never `img1.jpg`;
- the **generation prompt recorded in `visuals/README.md`**, so later images come out in the same style;
- photo matches content theme — a room card gets an interior, an avatar gets a portrait.

Swap the generated images into `ui/kit.html` in place of the stock ones.

### 5. Assemble all screens from the kit

Every screen already exists in `wireframes/`. They are not created here — they are **dressed in the kit, in the same files, no copies**. The git history is the archive of each stage.

Group by **role** (the groups already in the wireframe navigator). Grouping is not for finding screens — it is for assembling and reviewing in coherent batches and for fanning out subagents.

1. First convert the two approved styled screens onto the kit: link the system CSS, replace their inline styles with component classes. **The look must not change by a pixel.** If it changed, the kit gets fixed, not the screen.
2. Then the first role group with all its states: each screen links the system CSS, takes the shell (header + tab bar) from `ui/shell.html`, keeps structure and copy from the wireframe unchanged, and takes its look **only** from kit classes.
3. **No new style appears on a screen.** Missing a component or a variant → add it to `design-system/components/`, to `ui/kit.html` and to `ui/inventory.md` first, then use it.

> **HUMAN GATE.** Stop after the first group. The user reviews it in the browser.

Once the first group passes, fan the remaining roles out to **parallel subagents** — one per role (or per batch inside a role). Same rules: no copies, system CSS linked, structure and copy from the wireframe, look only from kit classes, new goes to the kit first. At the end, list the screens where subagents added something to the kit — those are reviewed first.

### 6. Dark theme — architecture stress test

Not a product feature: a proof that the semantic level earns its keep. A rebrand would work on flat variables too; a theme only works with a role layer.

- Add `[data-theme="dark"]` to `design-system/tokens.css` **overriding semantic tokens only** — backgrounds, text, borders, action. Primitives and `components/` are not touched.
- Contrast of dark pairs checked against WCAG AA and recorded in a comment.
- Put the theme toggle **in the navigator panel** that already stands on every screen — so the theme is visible on any real screen, not only in the showcase.
- **If you had to edit `components/` to make the theme work, that is a defect**: a component is reading a color primitive directly. Find it and fix it in the component, not in the theme block.

> **HUMAN GATE.** The user reviews the theme on real screens. **Keeping dark theme in the product is a separate product decision**, not an automatic one. Record the decision in `DESIGN.md`.

### 7. Defect table, gate, fix

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
- a semantic token without a source comment;
- geometry written as a number instead of a primitive.

Run `/impeccable audit` (fallback: `.design/templates/audit.md`) and merge its findings into the table.

> **HUMAN GATE.** Deliver the table only — no fixes yet. The user prioritizes.

Then work the table and fix **everything together**: tokens, components, screens and `DESIGN.md` in one pass.

---

## Edit routing (write this rule into CLAUDE.md)

From this phase on, a fix lives in the kit, never on a screen:

- **Value edit** (color, size, spacing) → the token at the matching level in `design-system/tokens.css`. The shared file is linked everywhere, so the change **propagates to all screens by itself**.
- **Markup edit** (component structure) → `ui/kit.html`. CSS will not propagate it, so roll it out to every screen where the component stands.
- **"Keep it"** → update the rule in `CLAUDE.md`: *when the user says "keep it" about a visual edit — update the kit (`design-system/tokens.css` and the showcase `ui/kit.html`), record the reason in `DESIGN.md`, and roll the markup change out to all screens.*
- A fix applied to one screen only is drift, and step 7 will catch it.

---

## Phase checklist

Run `.design/checklists/phase-6-build.md` and report each criterion pass/fail. Do not sign the phase off with a failing criterion — fix it or record an explicit exception in `CLAUDE.md`.

## Close the phase

1. Update `CLAUDE.md` — "Build" section: kit location, edit-routing rule, "new goes to the kit first", the dark-theme decision.
2. Update `README.md` — "UI" section: `DESIGN.md`, `ui/inventory.md`, `ui/kit.html`, `design-system/`, `visuals/`.
3. Regenerate `pipeline.html`: phase 6 status, links to `ui/kit.html` and the styled screens.
4. Commit (push per `toolbox.md`).
5. On user sign-off, tag: `phase-6-build`.

## Outputs

- `DESIGN.md` — product language documented from code, reconciled with `concept.md`, with a Sources section
- `ui/inventory.md` — component inventory + "One-off" list
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
DESIGN.md and concept.md have diverged again. The screens are the living truth: update
concept.md to describe what is really in the screens, note the reason per attribute, and list
separately anything that contradicts the designer's taste or the anti-references — I decide those.
```
