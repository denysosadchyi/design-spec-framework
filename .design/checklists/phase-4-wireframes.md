# Phase 4 — Wireframes · done criteria

Gate for `/dsf:wireframes`. Every item is verifiable by opening a file in this repo.
This file is a **read-only reference document** — nobody ticks the boxes. `/dsf:check 4`
verifies each item against the files, writes `.design/checklists/results/phase-4.md`, and
creates the `phase-4-wireframes` tag on a full pass.

These files are not sketches. They are the first layer of the product's code: the same
files get copy in phase 5, visual language in phase 5–6, tokens in phase 6, responsive
behavior in phase 8 and motion in phase 9. Nothing here is redrawn later.

## Plan

- [ ] `wireframes/_screens.md` lists the key screens of the main flow, each with its exact
      name from `ia/sitemap.md`, its job from `people/jtbd.md`, and its position in
      `ia/flows.md`
- [ ] A screen × state table marks which states are real for each screen (✓ / —)
- [ ] `wireframes/_conventions.md` is written **before** any screen and covers: level of
      detail (structure only, grey), semantic HTML, real domain copy, file naming
      (`<name>.html` plus `<name>-<state>.html`, latin characters), one page per state,
      and the explicit "not yet" list — color, type, shadows, icons

## Screens

- [ ] Every screen from `ia/sitemap.md` has wireframes — the main flow built as the sample,
      the rest rolled out by parallel subagents against `_conventions.md`
- [ ] No screen exists that is not on the sitemap
- [ ] Each screen has a base page plus one page per state from its row in `_screens.md` —
      no missing states, and no invented ones
- [ ] Markup is semantic — `header`, `nav`, `main`, `section`, `article`, `button`, `form`,
      real headings — not a stack of `div`s
- [ ] Copy is real product copy from this domain; no lorem ipsum, no "Heading 1",
      no "Lorem", no placeholder brackets
      <!-- check: grep -rniE "lorem|ipsum|dolor sit|heading 1|placeholder" wireframes/*.html → expect 0 -->
- [ ] Grey only — no color, no custom fonts, no icons, no shadows anywhere in
      `wireframes/*.html`
      <!-- check: grep -rniE "#[0-9a-f]{3}([0-9a-f]{3})?\b|rgba?\(|box-shadow" wireframes/*.html → expect 0 -->

## Navigation and linking

- [ ] `wireframes/index.html` is the navigator entry point — the page a human opens first,
      listing every screen and every state page as a real link
- [ ] A tree navigator panel is present and identical on every page: section → screen →
      its states, indented, each node a real link, current node marked, grey
- [ ] The navigator's structure matches `_screens.md` and `ia/sitemap.md`
- [ ] Screens are linked along the main flow with real `<a href>` — each screen's primary
      action goes to the next screen
- [ ] State transitions are linked too: loading → success, error → retry, empty → filled
- [ ] Forks are navigable in both directions
- [ ] `empty` and `error` pages each have a visible way out, checked against `ia/flows.md`
- [ ] No dead ends anywhere in the set

## Critique

- [ ] `wireframes/_critique.md` records a defect table — screen → what is wrong → how to
      fix — covering: visual creep, placeholder text, missing states, dead ends, zones with
      no action, screens not on the map
- [ ] Dead ends and missing states were fixed first, and the fixes are in the files
- [ ] The set is consistent after fan-out — subagent output matches the sample

## Docs

- [ ] `CLAUDE.md` → **Wireframes** block records where screens live, the naming convention
      and the state-page rule
- [ ] `README.md` → Wireframes section links into `wireframes/`
- [ ] `index.html` data block regenerated — phase 4 artifacts marked present, the navigator
      `wireframes/index.html` linked
- [ ] Phase committed; pushed if hosting is `active`
