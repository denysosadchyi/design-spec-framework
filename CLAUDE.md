# Project context

This repo is the design file. Everything about this product — brief, research, structure,
screens, voice, visual language, system, handoff — lives here as files, not in chat history.

Read this file first, then the artifacts it points to. Never re-ask what is already written.

---

## First contact

If this looks like a fresh clone (toolbox rows still `[?]`, no `phase-0` ledger), your FIRST
message to the designer must, before anything else:

1. Hand them the project home page: the absolute local path to `index.html` (and, once
   hosting is active, its URL) with one sentence on how to open it in a browser.
2. Say in plain words: this page is your home — it shows where you are, every step and prompt
   to type, and what "done" means for each phase. You never need a terminal.
3. Name the first move: open the page, read "How this works", then type `/dsf:init`.

Designers are not programmers. The page leads; the chat executes.

---

## Rules of engagement

- **Constitution:** `.design/memory/constitution.md` — the binding rules for every
  `/dsf:*` command. Read it before acting.
- **Phases:** `.design/memory/phases.md` — the canonical phase table: commands, checklists,
  tags, canonical artifact paths, the done/in-progress/locked definitions, and the
  `index.html` data contract. When a command and that file disagree, that file wins.
- **Progress:** `.design/progress/phase-N.md` — the append-only step ledger. Every command
  appends one line the moment a numbered step or a gate finishes, reads its ledger before a
  re-run, and never runs work that belongs to a later phase without stopping first (constitution
  rule 13, the phase-order guard).
- **Toolbox:** `.design/memory/toolbox.md` — which tools this project has, which fallback to
  use when one is missing, and the only three status values (`active` / `fallback` / `[?]`).
  Read it before using any tool.
- **Fallback prompts:** `.design/prompts/` — `critique.md`, `audit.md`, `document.md`,
  `extract.md`, `brief-interrogation.md`. These run whenever the matching toolbox row is not
  `active`.
- **Checklists:** `.design/checklists/phase-N-*.md` — read-only done-criteria. Nobody ticks
  them; `/dsf:check` verifies them against the files and writes the verdict to
  `.design/checklists/results/phase-N.md`.
- **Decisions:** every gate answer, "keep it" and contradiction resolution is recorded in
  `.design/decisions.md`; changes after sign-off go through `/dsf:change`.
- **Dashboard:** `index.html` — current status, artifacts and links. **The project home page
  is `index.html` — keep its data block current.**

---

## Toolbox

<!-- /dsf:init fills this in: one line per active tool and one per fallback in force -->

`[?]`

---

## Pipeline

Eleven phases (0–10) and seventeen commands, driven by `/dsf:*`. Each phase reads the previous
phases' artifacts, produces a Markdown artifact for the agent plus an HTML page for humans,
ends with a critique cycle and a human gate, updates the living docs, and commits.

| Phase | Command(s) | Output lives in | Tag |
|---|---|---|---|
| 0 · Init | `/dsf:init` | `.design/memory/toolbox.md`, `index.html` | `phase-0-init` |
| 1 · Brief | `/dsf:brief` | this file, `README.md`, folder scaffolding | `phase-1-brief` |
| 2 · Discover | `/dsf:research` + `/dsf:users` | `research/`, `people/` | `phase-2-discover` |
| 3 · Structure | `/dsf:ia` | `ia/` | `phase-3-ia` |
| 4 · Wireframes | `/dsf:wireframes` | `wireframes/` | `phase-4-wireframes` |
| 5 · Language | `/dsf:voice` + `/dsf:concept` | `voice/`, `concept/` | `phase-5-language` |
| 6 · Build | `/dsf:build` | `DESIGN.md`, `design-system/`, `ui/`, `visuals/` | `phase-6-build` |
| 7 · System | `/dsf:system` | `design-system/` — `docs/`, `patterns/`, `examples/` | `phase-7-system` |
| 8 · Responsive | `/dsf:responsive` | `responsive/`, breakpoint + grid tokens, the shell, `split-view` | `phase-8-responsive` |
| 9 · Motion | `/dsf:motion` | `animations/`, motion tokens, the components | `phase-9-motion` |
| 10 · Handoff | `/dsf:handoff` | `handoff/`, release | `phase-10-handoff` |

Cross-cutting, usable at any point: `/dsf:status` (where am I, what to type next),
`/dsf:critique` (defect table on any scope), `/dsf:check` (verify a phase against its
checklist and sign it off), `/dsf:change` (a request that invalidates signed-off work —
blast radius, re-opened phases, logged decision).

**Tags.** Exactly one tag per phase, as listed above — phases 2 and 5 have two commands and
still get one tag, created once both are done. Tags are created **only** by `/dsf:check`, on a
full pass, after the human confirms. Phase commands never tag. Phase 10 also carries the release
tag `v1.0`. A tag is the result of the gate, never a criterion inside it.

---

## Context blocks

Each phase appends its block below and keeps it current. A block is short — the facts later
phases need, plus paths. Not a retelling of the artifact.

### Brief
<!-- phase 1 · what the product is, who it is for, platform, constraints, success criteria -->
`[?]`

### Research
<!-- phase 2 · chosen interaction pattern · the three MVP mechanics · benchmark dimension · top three open questions · paths to research/ -->
`[?]`

### People
<!-- phase 2 · primary persona and why · main job in "when / I want / so that" form · top-3 MVP jobs · paths to people/ -->
`[?]`

### Structure
<!-- phase 3 · main flow · navigation model and tap depth to the main job · paths to ia/ -->
`[?]`

### Wireframes
<!-- phase 4 · where the screens live, naming convention, state pages, the navigator panel -->
`[?]`

### Voice
<!-- phase 5 · pointer to voice/voice.md principles and voice/microcopy.md as the single copy source -->
`[?]`

### Concept
<!-- phase 5 · chosen direction and why · recorded taste and anti-references · icon set · image source -->
`[?]`

### Build
<!-- phase 6 · token levels, where components live, the shell, the kit showcase, visuals colorway -->
`[?]`

### System
<!-- phase 7 · contribution rules, showcase location and URL, patterns, backlog -->
`[?]`

### Responsive
<!-- phase 8 · the two breakpoints and the behavior that set them, the grid tokens, the split-view pattern -->
`[?]`

### Motion
<!-- phase 9 · motion tokens and their roles, the three jobs, where micro-interactions live, reduced-motion -->
`[?]`

### Handoff
<!-- phase 10 · pointer to handoff/, the map, the a11y checklist, release tag and live URLs -->
`[?]`

---

## The "keep it" rule

When the human says **"keep it"** about an experiment, it stops being an experiment and
becomes a rule. Write the rule down here, and route the change to wherever the truth
currently lives. The destination escalates as the project matures — update this section at
the end of every phase that moves it.

**Current destination for a change:** the screen file itself.

<!-- Phase 4: the screen, plus wireframes/_conventions.md if it is a rule for all screens -->
<!-- Phase 5: voice/voice.md + voice/microcopy.md for copy; concept/concept.md for visual decisions -->
<!-- Phase 6: the kit component or the token — never the screen -->
<!-- Phase 7: design-system/ (component, pattern or token) first, then the screens -->
<!-- Phase 8: the responsive behavior lives in components and the shell -->
<!-- Phase 9: motion lives in components, never in a screen -->

**Kept rules**

- `[?]`
