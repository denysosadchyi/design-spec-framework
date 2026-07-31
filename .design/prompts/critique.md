<!--
Built-in fallback prompt.
Used when the `impeccable` skill is not installed and `/impeccable critique` is
unavailable: /dsf:concept steps 3 and 5, /dsf:system step 7,
/dsf:responsive step 7, /dsf:motion step 6, /dsf:critique step 2.
Read `.design/memory/toolbox.md` first — if the skill is active, use the skill.
-->

# Fallback — design-quality critique

A **per-screen** quality pass that finds and never fixes. Output is one defect table:
`where · what is wrong · how to fix`. Nothing is edited in the pass that finds — the human
prioritizes first (constitution rule 4).

Critique against the **written contract**, not against taste. A finding that cannot point at a
rule, an artifact or a state is an opinion: put it in the short "taste" list below the table,
clearly separated, or drop it.

## Inputs

Whichever of these exist: `DESIGN.md`, `concept/concept.md`, `design-system/tokens.css` and
`components/`, `ui/inventory.md`, `voice/voice.md` + `voice/microcopy.md`,
`wireframes/_conventions.md`. Plus the files in scope, **including their state pages** —
a screen reviewed only in its success state is a screen reviewed a quarter of the way.

Open the screens in a browser if one is available per `toolbox.md`. Reading CSS is not seeing.

## Pass 1 — per screen

Walk **one screen at a time**, in each of its states, and check:

### Hierarchy

- Can you name the single most important element on the screen in under two seconds? If two
  things compete for first place, that is a defect.
- Does size, weight and color rank the content the way the job does, or is everything the same
  weight in a grey wall?
- Is the primary action visually primary — and is there exactly one of them per screen?
- Do headings descend in order (a screen title, then sections), or does the page jump levels to
  get a size it wanted?

### Spacing rhythm

- Are the gaps on the spacing scale, or are there one-off values nudged by eye?
- Is spacing **grouping**? Related things closer, unrelated things further apart. Equal spacing
  everywhere means nothing is grouped.
- Is there breathing room at the edges, or does content touch the viewport?
- Does the vertical rhythm survive the longest realistic string and the empty state?

### Contrast pairs vs WCAG AA

- List **every** text/background pair that occurs on the screen — including muted text on
  surfaces, text over imagery, placeholder text, disabled labels, badge text.
- Compute the ratio. AA is 4.5:1 for body, 3:1 for text ≥ 24px or ≥ 19px bold, 3:1 for
  meaningful non-text (icon, border carrying state).
- Check **both themes** if a theme exists. A pair that passes in light and fails in dark is a
  failing pair.

### Component consistency

- **Within the page:** the same component appearing twice with different radii, paddings, type
  sizes or icon sizes. Check every repeat, not the first one.
- **Across pages:** the same component with different markup or different values on another
  screen. The kit is the source of truth; the screens are wrong.
- A component used for a job it is not for (a card standing in for a banner, a primary button
  used three times).
- Something styled on the screen instead of coming from a kit class.

### Slop patterns

The defaults a model reaches for when it is not deciding. Each one is a defect on its own:

| Pattern | What it looks like |
|---|---|
| Reflex palette | a palette guessable from the category — the first association, not a decision |
| Gradient placeholder | a decorative gradient standing where a flat surface or a real image belongs |
| Glow / decorative shadow | shadow used as ornament rather than elevation |
| Iconless screen | a screen of pure text rows where the language promised iconography, or icons from more than one set / weight |
| Celebration tone | confetti, exclamation marks, "successfully", cheerful color on a neutral or failing state |
| Centered-everything | every screen a centered stack because no layout decision was made |
| Generic rounded-card grid | the same card grid regardless of what the content is |
| Grey box imagery | a placeholder still standing where the language says real photography, or a photo off its content theme |
| Off-language decision | a color, radius or font with no matching attribute in `concept.md` and no entry in `DESIGN.md` |

Ask the closing question for every screen: **could this belong to any product in this
category?** If yes, it is not a decision yet.

## Pass 2 — across the set

After every screen has been walked individually, compare them:

- the same object rendered as two different cards on two screens;
- density drifting between screens with no reason in the content;
- a state page that shares no structure with its base page;
- copy on the screen that has drifted from `voice/microcopy.md`.

## Output — one table

Merge everything into **one** table. If subagents ran per group, merge theirs too.

| Where (file · element) | What is wrong | How to fix |
|---|---|---|

Rules for the table:

- One row per defect, deduplicated. The same defect on twelve screens is **one row** naming the
  source, not twelve rows.
- "Where" is a file and a selector or element, never "the app".
- "How to fix" names the **destination file** — the token, the component, the pattern, the
  shell, `_conventions.md`, `microcopy.md` — not a direction.
- Order the table by severity: contrast failures and broken hierarchy first, slop patterns next,
  consistency drift after.
- Findings that are taste rather than contract go in a short separate list under the table.
- **No fixes applied. Nothing edited.**

> **HUMAN GATE.** Deliver the table and stop. The human orders it, drops rows, or promotes a
> taste item into a rule. Fixing happens after, at the source.
