# Phase 9 — Handoff · done criteria

Gate for `/design:handoff`. Every item is verifiable by opening a file in this repo.
`/design:check` runs this list before sign-off.

Handoff is **onboarding a new developer into the repo**, not archiving. Success has one
test: someone who was not here clones the repo, gets it running, and adds a feature with
no verbal explanation. Second rule: **document what exists, introduce nothing new.**

## Fresh-eyes audit

- [ ] `handoff/onboarding-gaps.md` records a walk through the repo as a developer who has
      no context: where the entry point is, how a screen is assembled, where tokens come
      from, what each folder means
- [ ] The questions are about this product, not about language syntax
- [ ] The gap list is treated as the order sheet for everything else in this phase

## Specification

- [ ] `handoff/` holds a behavior spec covering every flow: steps, states, edge cases,
      validation
- [ ] The spec describes what static screens cannot show — when an error fires, what counts
      as valid, what happens on an empty list
- [ ] The spec **references** design-system components, token names and `voice/microcopy.md`
      keys; it does not duplicate CSS values or copy strings
- [ ] No new feature, screen or state was introduced while writing it — gaps became rows in
      `onboarding-gaps.md`

## Map

- [ ] `handoff/map.md` has one row per link: screen → component → token → microcopy key
- [ ] The map answers "if I change this token, what moves"
- [ ] `voice/voice.md` and `voice/microcopy.md` are explicitly part of the handoff package

## Accessibility

- [ ] `handoff/a11y.md` consolidates what already exists: focus-visible in both themes,
      WCAG AA contrast, breakpoints in `rem`, `prefers-reduced-motion`
- [ ] Each item names where it lives in the code and how to verify it
- [ ] Nothing new was added here; any hole became a debt row in `onboarding-gaps.md`

## Living index

- [ ] `README.md` is a route from `research/` through to `handoff/`: what the product is,
      how to run it, where the system is, the spec, the map, the checklist
- [ ] Each section is two or three sentences plus a link — no retelling of file contents
- [ ] Every link resolves

## Release

- [ ] A git tag marks the release (for example `v1.0`)
- [ ] The product and the design-system showcase are deployed (or the recorded hosting
      fallback from `.design/memory/toolbox.md` is in place)
- [ ] `handoff/README.md` carries the three links: product, showcase, repo
- [ ] A clean clone comes up with no verbal explanation

## Fresh-subagent test

- [ ] A context-free subagent was given only `handoff/` and `README.md` and asked to build
      a new feature
- [ ] Every place it stumbled is recorded as a gap
- [ ] Gaps were closed with documentation, not with new features
- [ ] The test was re-run and passed without stumbles

## Graduation one-shot

- [ ] A job from `people/jtbd.md` that has no screen yet was driven through every layer in
      a single prompt: voice → components and patterns → tokens (color, geometry,
      responsive, motion) → a finished screen
- [ ] The result lives in `design-system/examples/one-shot/` with all its states, adaptive
      behavior and micro-interactions
- [ ] It introduced no styles outside the system; anything missing went to
      `design-system/backlog.md`

## Docs

- [ ] `CLAUDE.md` → **Handoff** block points at `handoff/`, the map, the a11y checklist,
      the release tag and the live URLs
- [ ] `pipeline.html` regenerated and shows all nine phases done
- [ ] Phase committed and tagged `phase-9-handoff`
