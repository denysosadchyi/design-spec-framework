# Phase 7 — System · done criteria

Gate for `/dsf:system`. Every item is verifiable by opening a file in this repo.
`/dsf:check` runs this list before sign-off.

The design system becomes a product with its own users — you tomorrow, a developer, the
agent. Its main feature is a live showcase that cannot lie, because it runs the same CSS
the product runs.

## Structure

- [ ] `design-system/` contains `tokens.css`, `components/`, `patterns/`, `docs/`,
      `examples/` and a root `index.css` that imports everything — one entry point
- [ ] The product (`wireframes/*.html`, `ui/shell.html`) loads `design-system/index.css`
- [ ] No stray copies of the system files remain elsewhere in the repo
- [ ] The product looks unchanged against its phase-6 state

## Live documentation

- [ ] Every component has a page in `design-system/docs/` with four parts: anatomy,
      variants and sizes, when to use it, rule and anti-rule
- [ ] Variants and sizes come from `ui/inventory.md`; "when to use" comes from `DESIGN.md`
      and `voice/microcopy.md`
- [ ] Doc pages load `design-system/index.css` — they render the real component, not an
      image and not a hand-copied CSS snippet
- [ ] `design-system/docs/index.html` indexes all component pages
- [ ] `design-system/docs/why.html` explains why the system looks the way it does, sourced
      from `concept/concept.md` and `concept/references.md`

## Component states

- [ ] Every component has hover, active, focus-visible and disabled
- [ ] Each state is driven by a semantic token (for example a hover background, a focus
      color, a disabled opacity) — no per-component hardcoding
- [ ] Every state token has a value in **both** themes; no token exists only in light
- [ ] `focus-visible` produces a visible outline from the keyboard, with the focus color
      meeting WCAG AA in both themes
- [ ] Hover and active do not shift position or change element size
- [ ] Disabled is expressed through the disabled-opacity token
- [ ] Doc pages show a states block in both light and dark

## Patterns

- [ ] `design-system/patterns/` holds one file per pattern, each a composition of existing
      components with no new styles
- [ ] Every pattern can name three or more real screens in `wireframes/` where it occurs
- [ ] No pattern was imported from a generic textbook
- [ ] A patterns page exists in `docs/`

## Contribution rules

- [ ] `DESIGN.md` and `CLAUDE.md` both have a **Contributing to the system** section
- [ ] The rule is stated plainly: new goes into `design-system/` first, then onto a screen
- [ ] The "keep it" destination in `CLAUDE.md` now points at the system
- [ ] The rules are readable from the repo, not only from chat history

## New-screen test

- [ ] A screen that does not exist yet, but that a job in `people/jtbd.md` asks for, is
      assembled entirely from existing components, patterns and tokens
- [ ] The result lives in `design-system/examples/`
- [ ] Everything the system could not provide is written into `design-system/backlog.md`
      instead of being hand-drawn on the screen

## Critique and release

- [ ] A defect table was run and cleared: docs out of sync with the product, documentation
      that misstates behavior, a state present in only one theme, a pattern carrying its
      own styles, a component with no page in `docs/`
- [ ] The showcase is deployed and reachable at a live URL (or the recorded hosting
      fallback from `.design/memory/toolbox.md`)
- [ ] `README.md` → Design system section carries that link
- [ ] `CLAUDE.md` → **System** block records the contribution rules, showcase location and
      the backlog
- [ ] `pipeline.html` regenerated; phase committed and tagged `phase-7-system`
