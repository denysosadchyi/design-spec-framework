<!-- filled by /dsf:brief — this skeleton replaces the framework README as the product's own index -->

# `[Product name]`

`[One sentence: what this product is and who it is for. Filled in by /dsf:brief.]`

This repo **is** the design file. Research, structure, screens, copy, visual language, the
design system and the handoff all live here as files. No Figma required.

**→ [Open the pipeline page](./index.html)** — this is your home: current phase, every
step and prompt to type, success criteria, and links to every viewable page. **Start here**,
then type `/dsf:init` in Claude Code.

Built with [design-spec-framework](https://github.com/denysosadchyi/design-spec-framework) —
spec-driven development for product design. Work is driven by `/dsf:*` commands in Claude
Code; the rules live in `.design/memory/constitution.md`.

---

## Brief

<!-- phase 1 -->
`[?]`

## Research

<!-- phase 2 · competitors, benchmark, patterns -->
`[?]` → `research/research.html`

## People

<!-- phase 2 · personas and jobs -->
`[?]` → `people/personas.html`

## Structure

<!-- phase 3 · sitemap, navigation, flows -->
`[?]` → `ia/ia.html`

## Wireframes

<!-- phase 4 · grey screens with all states -->
`[?]` → `wireframes/index.html`

## Voice

<!-- phase 5 · voice principles and the copy source of truth -->
`[?]` → `voice/voice.html`, `voice/microcopy.md`

## Concept

<!-- phase 5 · chosen visual direction -->
`[?]` → `concept/directions.html`, `concept/concept.html`

## UI

<!-- phase 6 · token audit, tokens, components, kit showcase -->
`[?]` → `ui/kit.html`, `ui/tokens-audit.md`

## Design system

<!-- phase 7 · the system as a product, with live docs -->
`[?]` → `design-system/docs/index.html`

## Responsive

<!-- phase 8 · behavior-based breakpoints, adaptive shell and components, split-view -->
`[?]` → `responsive/width-audit.html`

## Motion

<!-- phase 9 · motion tokens, the three jobs, reduced-motion -->
`[?]` → `animations/motion-inventory.html`

## Handoff

<!-- phase 10 · spec, map, a11y, release -->
`[?]` → `handoff/index.html`

---

## Repo map

| Path | What lives there |
|---|---|
| `.design/` | Constitution, phase table, toolbox, fallback prompts, artifact templates, phase checklists, `checklists/results/` (the `/dsf:check` verdicts), `progress/` (the append-only step ledgers), decision log |
| `.claude/commands/dsf/` | The `/dsf:*` commands |
| `CLAUDE.md` | Agent context — brief plus a block per phase |
| `index.html` | The project's home page — phases, artifacts, links, status |
| `research/` · `people/` | Phase 2 |
| `ia/` | Phase 3 |
| `wireframes/` | Phase 4 — the screens, layered by every later phase |
| `voice/` · `concept/` | Phase 5 |
| `ui/` · `design-system/` · `visuals/` | Phases 6–7 |
| `responsive/` | Phase 8 |
| `animations/` | Phase 9 |
| `handoff/` | Phase 10 |
