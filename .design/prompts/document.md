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

## Procedure

### 1 — Palette with roles

Walk every declared color in the two screens and their state pages. For each: the hex, every
place it appears (file + selector), and the **role it plays there** — page background, surface,
primary text, muted text, border, the action color, a status color, a disabled tint.

Consolidate value drift (`#2E6E5C` in one file, `#2F6F5D` in another) into one value and say in
the entry what was merged. Group the result by role, not by hue.

Then build the **contrast table**: every text/background pair that actually occurs, with its
computed ratio and pass/fail against WCAG AA. A pair that fails is recorded as failing — it is
not quietly rounded up.

### 2 — Type pairs and scale

The font pair actually loaded (family, weights, fallback stack), and the size scale as it is
used: every distinct size with its line height, letter spacing and what it is used for
(screen title, card title, body, meta, control label). Sizes that appear once are marked as
such — the human may want them merged.

### 3 — Form

- **Radii** — every distinct value and what carries it (card, control, avatar, badge, sheet).
- **Shadows** — every distinct shadow, its exact value and what it is used to mean (elevation,
  focus, nothing). A shadow used as decoration is flagged.
- **Spacing** — the step scale the screens actually use, plus the gaps that fall off the scale.
  Off-scale gaps are listed by file and selector; do not tidy them here.
- **Sizes** — control heights, icon sizes, avatar sizes, container widths.

### 4 — Iconography

The icon set by name, the single weight/style used, the sizes it appears at, and the coverage:
navigation, metadata, badges, buttons, states. Any icon that is not from the set is listed as a
defect, not documented as a rule.

### 5 — Photography rules

How imagery is used in these screens: subject matched to content theme (an object card gets the
object, a person gets a portrait), aspect ratios, crop, treatment, the single colorway. Record
where the images currently come from. Placeholders still standing are listed, not described as
a rule.

### 6 — Provenance per decision

Each section above ends with a short table:

| Decision | Value | Attribute in `concept.md` it serves |
|---|---|---|

Everything with no attribute goes to **"Unattributed decisions"** at the end of `DESIGN.md`,
with its file and selector, so the human can either name the attribute or drop the decision.

### 7 — Sources

Close `DESIGN.md` with a **Sources** section linking `concept/concept.md` and
`concept/references.md`, and naming the exact screen files this document was read out of.

## Output shape

```md
# DESIGN.md — <product> visual language

Documented from <screen A> and <screen B> plus their state pages on <date>.

## Palette          ← roles, hex, where used, contrast table
## Type             ← pair, scale, usage per size
## Form             ← radii, shadows, spacing, sizes
## Iconography      ← set, weight, sizes, coverage
## Photography      ← subject rules, ratios, treatment, colorway
## Unattributed decisions   ← for the human to resolve
## Conflicts with recorded taste   ← HUMAN GATE, resolved before this file is final
## Sources          ← concept.md, references.md, the screens read
```

## Self-check before you hand it over

- Every value in the file exists in the screens — spot-check five of them with a grep.
- Every state page contributed something (a skeleton, a disabled style, an error color) or you
  can say why it did not.
- Every contrast pair that occurs on the screens is in the table with a real ratio.
- No section says "should" or "we will" — this document describes what is, not what is planned.
