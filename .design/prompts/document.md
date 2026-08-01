<!--
Built-in fallback prompt.
Used by /dsf:build step 1 when the `impeccable` skill is not installed and
`/impeccable document` is unavailable. Read `.design/memory/toolbox.md` first —
if the skill is active, use the skill and ignore this file.
-->

# Fallback — document the visual language from code

Produce the product's `DESIGN.md` **out of the two approved styled screens**, not out of
memory and not out of `concept/concept.md`. The screens are hand-edited, so they are the
living truth: they show what the design actually became. `concept.md` records why it was
chosen; `DESIGN.md` records what is really there.

## Inputs

Read all of these before writing a line:

- the two approved styled screens **together with every one of their state pages**
  (`-empty`, `-error`, `-loading`) — a language documented from one screen loses states,
  skeletons and disabled styling;
- `concept/concept.md` — attribute pairs and the "Designer's taste" section;
- `concept/references.md` — what was borrowed and from where;
- `voice/microcopy.md` — the strings that appear in the components you document.

## Iron rules

1. **Read values, do not invent them.** Every hex, size, radius and font name in `DESIGN.md`
   must be findable with a grep in the styled screens. If it is not in the code, it is not in
   the document.
2. **Every decision carries provenance.** Each entry points at the attribute pair in
   `concept.md` it serves — `calm, not urgent`, `dense, not airy`. A decision in the code with
   no attribute behind it is not deleted and not blessed: it is listed in the
   "Unattributed decisions" section for the human.
3. **`concept.md` follows the screens, not the reverse.** Where the two disagree, update
   `concept.md` to describe what is really in the screens and note the reason per attribute.
4. **HUMAN GATE.** A decision in the screens that contradicts "Designer's taste" or the
   anti-references is **not** written in silently. Collect every such conflict into a separate
   list, stop, and let the human decide which side wins.
5. Nothing is restyled while documenting. This pass writes one Markdown file and changes no
   CSS.
6. **The output conforms to the open DESIGN.md format** (see below). File name and location are
   fixed: `DESIGN.md` at the repo root of the product.

---

## The output format — the open DESIGN.md spec

`DESIGN.md` is not a free-form document. It follows the open format published by Google Labs
(<https://github.com/google-labs-code/design.md>, spec: `docs/spec.md`, status **alpha**), so
that any other agent or tool can read this design system without being told how. Two layers:

**1 — YAML front matter: the machine-readable tokens.** The file opens with a `---` fence,
holds the tokens, and closes with a `---` fence. Schema (only the parts we fill):

```yaml
---
version: alpha
name: <product>
description: <the one-line pitch, from concept/concept.md>
colors:                      # map<string, Color> — any valid CSS color string
  <token-name>: "#RRGGBB"
typography:                  # map<string, Typography>
  <token-name>:
    fontFamily: <family>
    fontSize: <px|rem|em>
    fontWeight: <number>
    lineHeight: <number or dimension>
    letterSpacing: <dimension>
rounded:                     # map<string, Dimension> — sm | md | lg | full …
  <scale-level>: <dimension>
spacing:                     # map<string, Dimension | number>
  <scale-level>: <dimension>
components:                  # map<component, map<property, value|reference>>
  <component-name>:
    backgroundColor: "{colors.<token>}"
    rounded: "{rounded.md}"
omitted:                     # sections deliberately absent, so the linter stays quiet
  - section: components
    reason: "the kit does not exist yet — filled at step 4 of /dsf:build"
---
```

Rules that keep the front matter honest:

- **A cross-reference is `{path.to.token}`** — `"{colors.action}"`, `"{rounded.md}"` — pointing
  at a primitive value elsewhere in the same tree.
- **Every value here is a value that exists in the screens.** The front matter is the same
  reading as the prose, in machine form; the two never disagree. If they do, the screens win and
  both get fixed.
- **`components:` is empty at this step** and is declared under `omitted:` with that reason — the
  component kit is built later in the phase. It is filled in once
  `design-system/components/` exists, and from then on its token names are **the same names** as
  the semantic roles in `design-system/tokens.css`.
- Colors carry the descriptive name in the prose ("Midnight Forest Green") and the systematic
  name in the tokens (`action`); that split is the format's own convention, not a duplication.

**2 — Markdown body: the prescribed sections, in this order.** A section may be omitted, but
the ones present must keep this sequence, and all are `##`:

1. `## Overview` — brand personality, who it is for, what the UI should feel like. This is where
   `concept/concept.md`'s attribute pairs are stated in prose.
2. `## Colors` — the palette with roles, plus the contrast table.
3. `## Typography` — the pair, the scale, what each size is for.
4. `## Layout` — the spacing scale and the layout model; off-scale gaps listed.
5. `## Elevation & Depth` — shadows and what they mean, or how hierarchy is carried without them.
6. `## Shapes` — radii and the shape language.
7. `## Components` — per-component style guidance. Thin at this step; grows with the kit.
8. `## Do's and Don'ts` — the guardrails, as short imperative lines.

**Our extra material goes in two compliant places.** The format preserves headings it does not
know, so nothing below breaks the spec:

- **Provenance** is a `###` subsection *inside* the section it belongs to — `### Provenance`
  under `## Colors`, under `## Typography`, and so on — carrying the table from step 6 below.
  It is body prose to the parser and stays attached to what it explains.
- **`## Unattributed decisions`, `## Conflicts with recorded taste` and `## Sources`** are extra
  `##` sections placed **after `## Do's and Don'ts`**, so the prescribed eight keep their order.

Later phases append their own extra sections the same way — `## Motion` and `## Motion budget`
from `/dsf:motion`, the breakpoint section from `/dsf:responsive` — always after the prescribed
eight, never interleaved.

## Procedure

### 1 — Palette with roles → `## Colors` + `colors:`

Walk every declared color in the two screens and their state pages. For each: the hex, every
place it appears (file + selector), and the **role it plays there** — page background, surface,
primary text, muted text, border, the action color, a status color, a disabled tint.

Consolidate value drift (`#2E6E5C` in one file, `#2F6F5D` in another) into one value and say in
the entry what was merged. Group the result by role, not by hue.

Then build the **contrast table**: every text/background pair that actually occurs, with its
computed ratio and pass/fail against WCAG AA. A pair that fails is recorded as failing — it is
not quietly rounded up.

### 2 — Type pairs and scale → `## Typography` + `typography:`

The font pair actually loaded (family, weights, fallback stack), and the size scale as it is
used: every distinct size with its line height, letter spacing and what it is used for
(screen title, card title, body, meta, control label). Sizes that appear once are marked as
such — the human may want them merged.

### 3 — Form → three sections, not one

Read as one pass, written out into the three sections the format prescribes:

- **Radii** — every distinct value and what carries it (card, control, avatar, badge, sheet).
  → `## Shapes` + `rounded:`
- **Shadows** — every distinct shadow, its exact value and what it is used to mean (elevation,
  focus, nothing). A shadow used as decoration is flagged. → `## Elevation & Depth`
- **Spacing** — the step scale the screens actually use, plus the gaps that fall off the scale.
  Off-scale gaps are listed by file and selector; do not tidy them here. → `## Layout` +
  `spacing:`
- **Sizes** — control heights, icon sizes, avatar sizes, container widths. → `## Layout`

### 4 — Iconography → an extra section

The icon set by name, the single weight/style used, the sizes it appears at, and the coverage:
navigation, metadata, badges, buttons, states. Any icon that is not from the set is listed as a
defect, not documented as a rule.

### 5 — Photography rules → an extra section

How imagery is used in these screens: subject matched to content theme (an object card gets the
object, a person gets a portrait), aspect ratios, crop, treatment, the single colorway. Record
where the images currently come from. Placeholders still standing are listed, not described as
a rule.

### 6 — Provenance per decision → a `### Provenance` inside each section

Each prescribed section ends with a `### Provenance` subsection holding a short table:

| Decision | Value | Attribute in `concept.md` it serves |
|---|---|---|

It sits inside the section it explains, so the pairing survives editing. Everything with no
attribute goes to **`## Unattributed decisions`** after `## Do's and Don'ts`, with its file and
selector, so the human can either name the attribute or drop the decision.

### 7 — Overview, Do's and Don'ts, Sources

Three sections that are written last because they summarise the rest:

- **`## Overview`** (first in the file) — brand personality, audience and the feel the UI should
  produce, stated from `concept/concept.md`'s attribute pairs. Not a retelling of the palette.
- **`## Do's and Don'ts`** — the guardrails the six sections above imply, as short imperative
  lines. Only rules the screens actually obey; a rule nobody follows is a defect report, not a
  guideline.
- **`## Sources`** (last) — links `concept/concept.md` and `concept/references.md`, and names the
  exact screen files this document was read out of.

## Output shape

```md
---
version: alpha
name: <product>
description: <one-line pitch>
colors: { … }        ← the palette from step 1, systematic token names
typography: { … }    ← the scale from step 2
spacing: { … }       ← the step scale from step 3
rounded: { … }       ← the radii from step 3
omitted:
  - section: components
    reason: "kit not built yet — filled after /dsf:build step 4"
---

# DESIGN.md — <product> visual language

Documented from <screen A> and <screen B> plus their state pages on <date>.

## Overview            ← personality, audience, the feel; from concept.md's attributes
## Colors              ← roles, hex, where used, contrast table  (### Provenance)
## Typography          ← pair, scale, usage per size             (### Provenance)
## Layout              ← spacing scale, off-scale gaps, sizes    (### Provenance)
## Elevation & Depth   ← shadows and what they mean              (### Provenance)
## Shapes              ← radii and the shape language            (### Provenance)
## Components          ← thin at step 1; grows with the kit
## Do's and Don'ts     ← the guardrails, short imperative lines

<!-- extra sections — the format preserves unknown headings; they follow the eight above -->
## Iconography         ← set, weight, sizes, coverage
## Photography         ← subject rules, ratios, treatment, colorway
## Unattributed decisions        ← for the human to resolve
## Conflicts with recorded taste ← HUMAN GATE, resolved before this file is final
## Sources             ← concept.md, references.md, the screens read
```

**Optional verification.** The format ships a linter:

```
npx @google/design.md lint DESIGN.md
```

It checks the front-matter schema, the section order and the token references. It is optional —
network access may not exist — but if it runs, a clean pass is worth more than a re-read. A
warning about a missing section is answered either by writing the section or by naming it under
`omitted:` with a reason, never by ignoring it. (`diff` compares two versions of the file,
`export` converts the tokens to JSON or a Tailwind theme; neither is part of this step.)

## Self-check before you hand it over

- Every value in the file exists in the screens — spot-check five of them with a grep.
- The front matter parses: `---` fences top and bottom, valid YAML, every `{path.to.token}`
  reference resolving to something that is actually in the tree.
- The front matter and the prose report the **same** values — no hex documented in one and not
  the other.
- The prescribed sections appear in the spec's order, extra sections come after
  `## Do's and Don'ts`, and no heading is duplicated (a second `## Colors` is a hard error for
  the format).
- Every state page contributed something (a skeleton, a disabled style, an error color) or you
  can say why it did not.
- Every contrast pair that occurs on the screens is in the table with a real ratio.
- No section says "should" or "we will" — this document describes what is, not what is planned.
