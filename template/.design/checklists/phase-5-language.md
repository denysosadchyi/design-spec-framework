# Phase 5 — Language · done criteria

Gate for `/dsf:voice` + `/dsf:concept`. Every item is verifiable by opening a file in this
repo. This file is a **read-only reference document** — nobody ticks the boxes. `/dsf:check 5`
verifies each item against the files, writes `.design/checklists/results/phase-5.md`, and
creates the `phase-5-language` tag on a full pass.

Voice is rules, not mood. Concept is derived from data **and** from the human's recorded
taste — never from the model's default and never cloned from one reference.

---

## Voice — inventory

- [ ] `voice/microcopy.md` starts as a full inventory of every string in
      `wireframes/*.html`, with columns: screen, zone, string, string type (heading,
      button, field label, state message)
- [ ] Inconsistencies are flagged — the same thing named two different ways, the same
      action labelled differently on different screens
- [ ] AI clichés and over-cheerful tone are flagged
- [ ] Strings authored by users (listing titles, descriptions, messages) are marked as
      user content and excluded from rewriting

## Voice — rules

- [ ] `voice/voice.md` → **Principles** holds 3–5 principles; each has a one-sentence rule,
      an example line written to it, a counter-example that breaks it, and the data row it
      came from
- [ ] No principle is an adjective — every rule can be applied to a concrete string
- [ ] At least one principle is derived from competitors' actual language; if the research
      lacked language samples, `research/research.md` now has a "competitor language"
      section with real collected samples
- [ ] `voice/voice.md` → **Dictionary**: one concept, one word, each term with a short
      reason for the choice; form of address is identical everywhere
- [ ] `voice/voice.md` → **Banned** lists what is never written, each entry with a
      before/after replacement example — AI clichés, motivational tone, stray exclamation
      marks, emoji in system messages, "successfully"
- [ ] `voice/voice.md` → **Microcopy rules** covers button, screen heading, form field
      (label / hint / validation error), empty, error, loading, success, destructive
      action — each with an example

## Voice — application

- [ ] The main screen and all its state pages were rewritten first as the sample, and
      reviewed before fan-out
- [ ] Every remaining screen and state page was rewritten by fan-out against `voice.md`
      with the sample as the reference
- [ ] `voice/microcopy.md` has before/after columns and covers **every** screen and state
      page — no interface string exists outside the table
- [ ] The same action is named identically on every screen
- [ ] State tone follows the rules: error says what happened and what to do, with no jokes;
      empty says why and offers a way out; success states the fact and the next step,
      with no fanfare
- [ ] No banned item survives anywhere in `wireframes/*.html`
- [ ] Structure and markup are unchanged — only words were edited
- [ ] User content was not rewritten
- [ ] A copy defect table was run and cleared: term not in the dictionary, one action with
      two names, banned item leaked in, tone wrong for the state, string missing from
      `microcopy.md`

---

## Concept — references and taste

- [ ] `concept/references.md` holds 3–5 sources found for the benchmark already named in
      `research/research.md` — no new competitor hunt
- [ ] For each source: the specific device borrowed and which persona anxiety it addresses
- [ ] No reference is copied whole — one is the base, 1–2 concrete details come from others
- [ ] `concept/concept.md` → **Designer's taste** names 2–3 real products the human likes
      and their anti-references, in the human's own words, as names — not adjectives
- [ ] `concept/concept.md` → **Attributes** holds 3–5 pairs of visual opposites, each with
      its source data row and the borrowed device
- [ ] No attribute contradicts the recorded taste; where data and taste pull apart, the
      conflict is stated in the file and the human decided

## Concept — direction

- [ ] `concept/directions.html` shows three contrasting directions side by side, each live:
      palette with hex values, a font pair, a card with a real photo, a button, a badge,
      icons in their style
- [ ] Reflex palettes — the ones guessable from the product category — were rejected before
      the page was shown, and the rejection is noted
- [ ] The human picked the direction in a browser; the choice and its number/name are
      recorded in `concept/concept.md`
- [ ] `concept/concept.html` is the test stand for the chosen direction: palette,
      typography, shape, photography sourced by content theme, icons from one set with a
      stated coverage plan (tab bar, metadata, badges, buttons, states), and three live
      components — every decision annotated with its reason
- [ ] Contrast meets WCAG AA for every color pair on the stand

## Concept — proof on screens

- [ ] Exactly two screens are styled: the main screen with all its state pages, and one
      contrasting screen with different density and mood — not the whole product
- [ ] The second screen introduces no new decisions; it only carries the approved language,
      photography and icons across
- [ ] Both screens are styled from the same files, with no copies
- [ ] Copy and structure are unchanged from the wireframes
- [ ] No placeholders remain — every image is a real photo matched to its content theme
      (a room gets an interior, a person gets a portrait)
- [ ] Identical components carry identical values, both across the two screens and within
      each page — every repeat, not just the first
- [ ] Icons on both screens come from one set in one style
- [ ] No `DESIGN.md` was written ahead of time — the visual language is documented from
      built code in phase 6
- [ ] A defect table was run and cleared: decision with no attribute or taste anchor,
      contrast below AA including newly introduced pairs, color tone contradicting
      `voice/voice.md`, drift between the two screens, one component with different values
      inside a page, placeholder instead of a photo, off-theme photo, icon outside the set

## Docs

- [ ] `voice/voice.html` opens standalone in a browser: the principles, the dictionary, the
      banned list and a before/after table — the showable artifact of this phase
- [ ] `CLAUDE.md` → **Voice** block points at `voice/voice.md` and names
      `voice/microcopy.md` as the single source of copy truth
- [ ] `CLAUDE.md` → **Concept** block records the chosen direction, the recorded taste,
      the icon set and the image source
- [ ] `README.md` → Voice and Concept sections link to the pages
- [ ] `pipeline.html` data block regenerated — phase 5 artifacts marked present,
      `context.chosenDirection` filled
- [ ] Phase committed; pushed if hosting is `active`
