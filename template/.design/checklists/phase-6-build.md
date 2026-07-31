# Phase 6 — Build · done criteria

Gate for `/dsf:build`. Every item is verifiable by opening a file in this repo.
`/dsf:check` runs this list before sign-off.

The rule of this phase: **a screen is a composition of the kit, not a drawing**. The visual
language is documented from working code, the component inventory is read out of the
wireframes, and the kit is built on two token levels from day one. Screens are updated in
place — the same `wireframes/` files, never copies.

## Documented language

- [ ] `DESIGN.md` at the repo root was generated **from** the two styled screens and their
      state pages — not written from memory and not written ahead of the screens
- [ ] `concept/concept.md` is updated to match the built screens; where `DESIGN.md` and
      `concept.md` disagreed, the screens won
- [ ] Any decision in the screens that contradicts the recorded taste or anti-references is
      called out separately, and the human decided its fate
- [ ] `DESIGN.md` has a **Sources** section
- [ ] Any pre-existing `DESIGN.md` about something other than this product was renamed out
      of the way before this phase, not overwritten

## Inventory

- [ ] `ui/inventory.md` is read out of all `wireframes/*.html` including state pages
- [ ] Each entry records: component, which screens it appears on, which states it has,
      whether it needs imagery
- [ ] Only blocks appearing on two or more screens are in the table; single-use blocks are
      listed separately as one-offs
- [ ] Entries are grouped by role
- [ ] No component from a generic textbook set appears without screen addresses

## Tokens

- [ ] `design-system/tokens.css` has exactly two levels: primitive and semantic
- [ ] Primitive holds every value used — colors and geometry (spacing, radii, sizes) —
      with value drift consolidated and the consolidation marked in a comment
- [ ] Every semantic token resolves to a primitive through `var()` and carries a comment
      naming the usages it grew from
- [ ] A color used in exactly one file and one class is not a semantic token
- [ ] Geometry has no semantic level — components read primitives directly, and that is
      correct
- [ ] No value in `tokens.css` was invented in this phase; everything traces to the styled
      screens

## Components and shell

- [ ] `design-system/components/` has one file per component from the inventory
- [ ] No hex value, raw pixel value or font stack appears inside a component class
- [ ] No component reads a primitive **color** directly — color goes through semantic tokens
- [ ] `ui/shell.html` holds the shared chrome markup (header, tab bar) used by every screen
- [ ] `ui/kit.html` is a showcase of every inventory component in every state, using real
      strings from `voice/microcopy.md`
- [ ] The kit reproduces the phase-5 language exactly — it documents the language, it does
      not propose a new one
- [ ] The human reviewed the showcase before rollout

## Imagery

- [ ] `visuals/` holds imagery generated for this product in one colorway matched to the
      `DESIGN.md` palette, with meaningful filenames
- [ ] `visuals/README.md` records the generation prompt so later images come out in the
      same style
- [ ] Stock placeholders are gone from the product; every image is on-theme

## Assembly

- [ ] The two styled screens were moved onto the kit first and look pixel-identical to
      their pre-kit versions — this is the kit's own correctness test
- [ ] Every screen and state page in `wireframes/` is updated **in place** and loads the
      token and component stylesheets
- [ ] No screen has its own `<style>` block or inline styling
- [ ] Every block on every screen comes from a kit class
- [ ] Structure and copy are unchanged from phases 4–5
- [ ] Rollout was grouped by role, the first group reviewed by the human in a browser,
      the rest fanned out to subagents
- [ ] Missing details were added to the kit and the inventory before being used on a screen

## Dark theme stress test

- [ ] `[data-theme="dark"]` overrides **semantic tokens only** — no component file was
      touched to make it work
- [ ] Any component that needed touching was fixed by routing it through a semantic token
- [ ] A theme toggle sits in the navigator panel, so it works from any screen
- [ ] Contrast for every semantic pair, light and dark, meets WCAG AA and is recorded as
      comments in `tokens.css`
- [ ] Whether dark theme ships is recorded as a separate product decision

## Critique and docs

- [ ] A defect table was run and cleared: screen bypassing the kit, same component with
      different markup, contrast below AA in either theme, stock photo or off-theme image,
      icon outside the set, copy drifting from `voice/microcopy.md`, hex outside primitives,
      component reading a primitive color directly, two names for one role, semantic token
      with no source comment, geometry as a raw number
- [ ] The findings pass produced the table first; fixes came after the human prioritized
- [ ] `CLAUDE.md` → **Build** block records the token levels, where components live, the
      shell, the showcase and the visuals colorway
- [ ] `CLAUDE.md` → "keep it" destination is updated: changes now go into the token or the
      component, never the screen
- [ ] `README.md` → UI section links to `ui/kit.html`
- [ ] `pipeline.html` regenerated; phase committed and tagged `phase-6-build`
