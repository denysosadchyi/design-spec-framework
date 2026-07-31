<!--
Built-in fallback prompt.
Used by /dsf:build step 4 when the `impeccable` skill is not installed and
`/impeccable extract` is unavailable. Read `.design/memory/toolbox.md` first —
if the skill is active, use the skill and ignore this file.
-->

# Fallback — extract the kit from the styled screens

Turn the approved styled screens into `design-system/tokens.css` (two levels),
`design-system/components/*.css`, `ui/shell.html` and the showcase `ui/kit.html`.

This is the hardest fallback in the framework, because it is the one place where a name is
invented. Everything else in the pipeline reads what already exists; here the semantic layer is
born. The discipline that keeps it honest: **every role is read out of real usages, and the
usages are written down before any name is chosen.**

## Inputs

- **All** styled screens **together with every state page** — the states are where skeletons,
  disabled styling, error colors and empty-state type live. A kit extracted from one screen
  loses them.
- `DESIGN.md` — the language documented in step 1.
- `ui/inventory.md` — which components exist, on which screens, with which states, and which
  need imagery.
- `concept/concept.md` — attributes, so a name can be checked against a decision.
- `voice/microcopy.md` — the real strings the showcase must use.

## Iron rules

- **Nothing is renamed before the human has seen the audit** (step 1). A refactor that starts
  with names starts with guesses.
- **No value is invented.** The only new value permitted in `tokens.css` is a consolidated
  drift value, and it carries a comment saying what it merged.
- **Color flows only through semantic roles.** A component reading a color primitive directly
  is a hole the first theme will find.
- **Geometry reads primitives directly.** Radius, spacing and size get no semantic level —
  they do not change with theme or rebrand the way color does.
- **Two roles = two tokens, even if the value is identical today.** The page background and the
  card surface may both be `#FFFFFF` right now; they are still two roles, and merging them is
  the defect that makes the first theme unbuildable.
- **One variable serving several roles is a defect, not an economy.** Split it.

---

## Step 1 — Usage audit (facts before names)

Read every styled screen and state page. Write the audit table — in chat, or into
`design-system/tokens-audit.md` if you want it to survive:

| Value | Where it is used (file · class) | Role it plays there |
|---|---|---|

Every raw value goes in: colors, radii, spacings, sizes, font sizes, line heights, shadows,
durations if any exist. One row per **usage**, not per value — the same hex used in four places
is four rows, because the point of the table is the roles hiding behind it.

Mark three finding types explicitly:

- **Value drift** — the same role written with different values (`#2E6E5C` here, `#2F6F5D`
  there; `11px` here, `12px` there).
- **One variable, several roles** — a single accent standing on the action button, on a status
  badge and on a link. This is the defect class that motivates the whole semantic layer.
- **Value bypassing variables** — a hex, pixel value or font stack written straight into a
  component class.

Close the table with **candidate roles** — page background, surface, primary text, muted text,
border, action, and whichever status roles the product actually has — and for each, the exact
usages that show the role exists.

> **HUMAN GATE.** Present the audit. Rename nothing, move nothing, write no CSS until the
> human has read it. The names in the next step come from this table.

## Step 2 — Consolidate drift

For each drift group, pick one value (the one used most, or the one `DESIGN.md` documents) and
record the merge as a comment on the primitive:

```css
--green-600: #2E6E5C; /* merged: #2E6E5C (card badge), #2F6F5D (button) — drift */
```

Consolidation is the only place a value changes in this pass. Everything else is a move.

## Step 3 — Primitives

`design-system/tokens.css`, first block: **raw values with no role**.

- **Color scales** — named by what they are, not by what they do: `--green-600`, `--sand-50`,
  `--ink-900`. Every color from the audit lands here exactly once.
- **Geometry scales** — spacing (`--space-1…--space-8`), radii (`--radius-sm|md|lg|full`),
  sizes (`--size-control`, `--size-avatar`, `--size-icon`), type scale (`--text-xs…--text-2xl`)
  with the line heights that go with them, border widths.

No primitive references another primitive's role. No primitive is invented "for completeness" —
if the audit has five spacings, the scale has five entries.

## Step 4 — Semantic color roles

Second block: **color roles only**, each one `var()`-ing a primitive and each one carrying a
**source comment naming the usages it grew from** — file and class, from the step 1 table.

```css
/* shape of a semantic role: name from the audit, value via var(), and a source comment
   naming the real usages — file plus class — that the role was read out of */
--bg-page:      var(--<neutral-50>);  /* from: <screen>.html .page, <screen>.html .page */
--bg-surface:   var(--<neutral-0>);   /* from: <screen>.html .card, <screen>.html .panel */
--text-primary: var(--<ink-900>);     /* from: every screen, .card-title / .body */
--text-muted:   var(--<ink-500>);     /* from: <screen>.html .meta, <screen>.html .timestamp */
--color-action: var(--<accent-600>);  /* from: .btn-primary on <n> screens */
```

Rules that decide what becomes a role:

- The role must be **visible in the usages**. If you cannot name two places it plays the same
  part, it is not a role yet.
- A color standing in **exactly one file and one class** does **not** become a semantic token.
  Flag it in the defect table instead — it may be a genuine unique role that simply has not
  repeated, and the human decides.
- Names come from the audit and `DESIGN.md`, never from a ready-made set borrowed out of
  someone else's design system (`--color-primary`, `--surface-2`, `--gray-alpha-100`).
- **State tokens (hover, active, focus, disabled) are not added here.** They belong to
  `/dsf:system`, where every state gets a value in both themes at once.

## Step 5 — Component classes

`design-system/components/` — one file per component from `ui/inventory.md`, plus `index.css`
importing the rest.

- No hex, no raw pixel value, no font stack inside a class. Everything through `var()`.
- Color through semantic roles; geometry through primitives.
- Markup and class names stay as they are in the styled screens — this is an extraction, not a
  redesign.
- The wireframe scaffolding (`.wf-*`, the device frame, the navigator panel styling) is **not**
  carried into the kit.
- A component that exists only in still-grey wireframes takes its **structure** from its
  wireframe and its **look** from the language in `DESIGN.md` — never from imagination.

## Step 6 — Fonts, skeletons and state styling

These are the parts a single-screen extraction always drops:

- **Fonts** — the `@font-face` / link, the full fallback stack, and the weights actually used.
  Declared once in `tokens.css`, referenced everywhere.
- **Skeletons** — the loading placeholders from the `-loading` pages become a real component
  (`skeleton.css`) with the shapes the screens use, not a generic grey bar.
- **State styling that already exists** — empty-state type and spacing, error banner colors,
  disabled controls. Extract what the state pages show; invent no state the screens do not have.

## Step 7 — Naming consistency sweep

Before you call the kit done, read `tokens.css` and `components/` end to end and fix:

- two names for one role (`--bg-card` and `--bg-surface` on the same background) — collapse;
- one name for two roles — split, with a source comment each;
- mixed naming conventions (`--textPrimary` next to `--text-muted`) — pick one and apply it
  everywhere;
- a semantic token with no source comment — either write the comment or delete the token;
- a primitive nothing references — delete it, or say which usage it came from.

## Step 8 — Shell and showcase

- **`ui/shell.html`** — the shared chrome as **markup**, not only CSS: header plus the primary
  navigation. A grey screen takes its shell from here; a CSS-only kit cannot dress a skeleton
  that does not exist.
- **`ui/kit.html`** — links `design-system/tokens.css` and `design-system/components/index.css`,
  and shows **every** inventory component in **every** state, using real strings from
  `voice/microcopy.md`, plus the shell.

## Step 9 — The honesty test

The extraction is correct only if it changed nothing visible.

Put the styled screens **and two or three control screens from elsewhere in the product** side
by side with their pre-extraction versions (git remembers them). They must be
**pixel-identical**. A difference means the kit is wrong — fix `tokens.css` or `components/`,
never the screen.

Watch for the specific failure mode: **something tweaked "while we were in there"**. A refactor
that also improves is a refactor whose correctness cannot be checked.

> **HUMAN GATE.** The human opens `ui/kit.html` in a browser and reviews every component before
> anything is rolled out.

## Outputs

- `design-system/tokens.css` — primitives, then semantic color roles with source comments
- `design-system/components/*.css` + `index.css`
- `ui/shell.html`, `ui/kit.html`
- the usage audit (kept as `design-system/tokens-audit.md` if the human wants the receipts)
- a list of flagged one-off colors and unresolved drift, handed to the phase's defect table
