---
description: Phase 5b — find the product's visual language from references, recorded taste and data-sourced attributes, then prove it on two contrasting screens.
---

# /design:concept

The product has structure and a voice. Now it gets a **look**. The rule of this phase:
**a reference is an input, not an output**. No site is copied whole — one is taken as the
base, specific devices are borrowed from others, and the language is synthesized from
attributes derived from the product's own data plus the human's **recorded taste**.

A palette that can be guessed from the category is a model reflex, not a decision — it is
thrown out before it is ever shown. The language is proven on **two contrasting screens**.
This phase *finds* the language; documenting it as a design system is `/design:build`.

## Prerequisites

| Artifact | Missing → run |
|---|---|
| `wireframes/*.html` with state pages | `/design:wireframes` |
| `voice/voice.md`, `voice/microcopy.md` | `/design:voice` |
| `people/personas.md`, `people/jtbd.md` | `/design:users` |
| `research/research.md` (with the trust benchmark named) | `/design:research` |

Read `.design/memory/constitution.md` and `.design/memory/toolbox.md` first. This phase
leans on optional tools — use whatever the toolbox records as installed, and the recorded
fallback otherwise:

| Purpose | Recommended | Fallback |
|---|---|---|
| Visual references | Refero MCP | web search + competitor screenshots into `research/screens/` |
| Design quality laws | `impeccable` skill | built-in slop-avoidance rules in step 3 |
| Imagery | real photos by content theme (Unsplash) | any real photo source, recorded |
| Icons | one single-style icon set | any single-style set, recorded in `concept/concept.md` |

---

## Step 1 — References

`research/research.md` already names the benchmark this product is measured against. Do not
run a new competitor search — look for their **visual** language.

Using Refero MCP (fallback: web search plus screenshots saved into `research/screens/`), find:
- 3–4 **styles** matching a query built from the product's own positioning and audience;
- 2–3 **screens** matching the specific device the product needs to get right (the trust
  signal, the primary card, the decisive moment), on the target platform.

Pull the full data for the two or three strongest. **Copy none of them whole.** Choose one as
the base and borrow 1–2 concrete devices from the others — not "the general feel", but a
device: the card radius, where the badge sits, how much colour appears on one screen.

For each source record: name, link, which device is taken, and **which anxiety of the persona
it relieves**. Save to `concept/references.md`.

## Step 2 — Taste, then attributes

> **HUMAN GATE — recorded taste.** Ask the human for this before writing anything. Taste is
> data, and it lives in the file, not in their head. Do not invent it, do not infer it from
> the research, do not proceed without it.

Ask for and record in `concept/concept.md`, section "Designer's taste", two lists:
- **Likes** — 2–3 **named products**, not adjectives, each with what exactly is liked about it;
- **Anti-references** — what is definitely not wanted, including the obvious first reflex for
  this category.

Then read `people/personas.md`, `people/jtbd.md`, `voice/voice.md`, `concept/references.md`
and the taste section. Formulate **3–5 pairs of visual attributes** (opposites), each with an
explanation of which line of data and which borrowed device it is built from — for example
`calm, not urgent ← <persona line> ; device — <borrowed device>`.

No pair may contradict "Designer's taste". If the data and the taste pull in opposite
directions, say so plainly and let the human decide. A pair without an explanation is an
invention. Save to `concept/concept.md`, section "Attributes".

## Step 3 — Three directions to choose from

Load the `impeccable` skill if the toolbox records it as installed, and execute every visual
decision from here on under its laws — colour strategy, slop-pattern bans, the slop test.
If it is not installed, apply these built-in rules instead:
- no decorative gradient where a flat surface works; no glow, no drop shadow as decoration;
- colour is a strategy, not a palette: one accent carries meaning, neutrals carry the surface;
- no centered-everything hero layout, no generic rounded-card-grid default;
- real photography over grey boxes; one icon set, one weight;
- if the result could belong to any product in the category, it is not a decision.

If a `DESIGN.md` exists at the repo root that is **not about this product** (e.g. the style
of the research pages), rename it to `DESIGN-artifacts.md` so it cannot leak into the
product's palette. The product's `DESIGN.md` is generated in `/design:build`.

Read `concept/concept.md` and `concept/references.md`. Propose **three contrasting
directions** — genuinely different decisions, not three shades of one. Throw out reflex
palettes: anything guessable from the category is not a decision.

Build `concept/directions.html` — the three directions side by side, each shown **live** in
its own language:
- palette with hex values;
- a type pair;
- a real card of the product's primary object with a **real photo by content theme**;
- a button;
- a badge;
- an icon set in one consistent style.

> **HUMAN GATE — direction choice.** Stop here. The human opens `concept/directions.html` in
> a browser and names the chosen direction in the next prompt (number and name). You never
> pick the direction.

## Step 4 — The test stand

Record the choice in `concept/concept.md`, section "Directions", and build `concept/concept.html`
from the chosen one — the test stand of the language:

- open with **the language live**: the card with its photo, buttons, the navigation shell —
  the way the direction looked on `directions.html`. The specification (palette tables,
  scales) sits below it;
- **palette:** primary / accent / neutral plus semantic colours, each colour annotated with
  the attribute it serves;
- **type:** the font pair and the size scale;
- **form:** radii, shadows, spacing;
- **photography:** real photos by content theme (a room → an interior, a person → a portrait);
- **icons:** one set in the direction's style, with a coverage plan — navigation, metadata,
  badges, buttons, states;
- **3 live components of this product:** the primary action button, the primary object card
  with its trust signal, a form field.

Every decision is annotated with its attribute. Contrast: WCAG AA, with the ratio recorded.
Keep the two rejected directions written down in `concept/concept.md` — they can be returned to.

## Step 5 — Sample: the main screen

Read `concept/concept.html` and the main wireframe screen together with its state pages
(`-empty`, `-error`, `-loading`). Apply the language directly onto those pages:

- palette, type, form and icons per `concept/concept.html`;
- replace grey placeholders with real photos by content theme — imagery is part of the
  visual layer, not a later chore;
- copy and markup structure do not change;
- find **every repeat of a component on the page** — every button, card and badge gets the
  same values, not just the first one;
- any new text/background colour pair that is not in `concept.html` gets its contrast
  computed immediately and added to the table.

Update those files in place — never make copies. Then run `/impeccable critique` on the
pages (fallback: re-run the built-in rules from step 3 as a checklist) and fix what it finds.

> **HUMAN GATE.** The human opens all four states in a browser and reviews before the language
> moves to a second screen.

## Between steps — the point edit

When the human wants to nudge a detail on a finished screen, the rule is: **an edit lives
where the language lives, not where it was noticed.** The cycle is: try it on the screen →
if approved, fix it at the source → roll it out to every occurrence. An edit that stays only
on one screen is drift, and the step 7 table will catch it.

Trying it on:
```
Make <element> on <screen> <the adjustment>. Show me a variant, fix nothing yet.
```

After "keep it":
```
Keep it. Update that value in concept/concept.html, annotate the attribute in
concept/concept.md (if the edit contradicts an existing attribute, change the attribute
itself), and propagate it to the second screen and every repeat of the component.
```

## Step 6 — The second, contrasting screen

Read `concept/concept.html` and the finished main screen — that is the reference. Apply the
same language to a **second screen with a different density**, together with its state pages:
the same colours, radii, icons, photography by content theme, the same trust signal.

- invent no new decisions here — transfer only;
- every repeat of a component on the page gets identical values;
- a new colour/background pair gets its contrast computed immediately.

Update the files in place; do not touch structure or copy. Put the two screens side by side
and compare: the same card in a list and in a detail view must read as the same product, not
as two different sites. Do not colour more screens than these two — rolling out across the
product is `/design:build`.

## Step 7 — Critique → prioritize → fix

Review `concept/concept.html` and the two screens against `concept/concept.md`. Build a defect
table with columns **file · element · what is wrong · how to fix**, looking for:

- a colour, type or form decision with no matching pair in "Attributes" or "Designer's taste"
  — a decision from the model's head, not from the data;
- text/background contrast below WCAG AA;
- colour tone contradicting `voice/voice.md` — an error looking festive, a warning invisible;
- the same card looking different across the two screens;
- the same component carrying different values in different places on one page;
- a grey placeholder instead of a photo, or a photo that does not match its content;
- an icon from outside the chosen set.

Run `/impeccable audit` as well (accessibility, contrast, performance) and merge its findings
into the table. If `impeccable` is not installed, run the built-in rules from step 3 plus a
contrast pass over every text/background pair.

> **HUMAN GATE — defect prioritization.** Output the table only, fix nothing. The human
> reviews it and sets the order.

Then walk the ordered table and fix everything — the pages and `concept/concept.md` together.

## Step 8 — Close the phase

1. Run the phase checklist in `.design/checklists/phase-5-language.md`; report each criterion as
   pass / fail with the file that proves it, and fix fails before continuing.
2. Update `CLAUDE.md` — the Concept context block: where the language lives
   (`concept/concept.html` is the stand, `concept/concept.md` the reasoning), the rule that a
   new visual decision comes only from an attribute or from recorded taste, the icon set and
   the photography rule, and that edits are made at the source and rolled out.
3. Update `README.md` — a Concept section linking `directions.html`, `concept.html` and the
   two styled screens.
4. Regenerate `pipeline.html`; `directions.html` and `concept.html` must be live links.
5. Commit. Push according to `.design/memory/toolbox.md`.

> **HUMAN GATE — phase sign-off.** After the checklist passes, ask the human to confirm, then
> suggest tagging the commit `phase-5-concept`.

---

## Recovery prompts

```
The palette is guessable from the category — that is a model reflex, not a decision. Propose
a direction that satisfies the Attributes and the Designer's taste section but is not the
first association with the category.
```

```
You took the palette from the old DESIGN.md — that is the system of the research pages, not
of the product. The product's palette is born here, in concept/directions.html and
concept/concept.html.
```

```
You copied the reference almost whole — same palette, same card layout. Take exactly one
concrete device from it and derive the rest from the attributes and the taste in
concept/concept.md.
```

```
This colour (or radius, or font) has no pair in Attributes or in Designer's taste. Either
name the source it follows from, or drop the decision and go back to the attributes step.
```

```
You applied the new value to the first component only. Find every repeat on the page — every
button, card and badge — and apply the same values to all of them.
```

```
You left grey placeholders instead of photos, or the photo does not match the content. This
product is photo-first: replace them with real photos by content theme.
```

```
A new text/background colour pair appeared that is not in the contrast table in
concept/concept.html. Compute its WCAG AA ratio and add it to the table; if it fails, fix the
colour.
```

```
You used different colours or a different card radius on the second screen than on the first.
That reads as two products, not one. Align to concept/concept.html — transfer values, do not
invent new ones.
```

```
You coloured more screens than the two we agreed on. This phase proves the language on two
screens; rolling it out across the product is /design:build.
```
