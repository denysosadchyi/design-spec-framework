# Project context

This repo is the design file. Everything about this product — brief, research, structure,
screens, voice, visual language, system, handoff — lives here as files, not in chat history.

Read this file first, then the artifacts it points to. Never re-ask what is already written.

---

## Rules of engagement

- **Constitution:** `.design/memory/constitution.md` — the binding rules for every
  `/design:*` command. Read it before acting.
- **Toolbox:** `.design/memory/toolbox.md` — which tools this project has and which
  fallback to use when one is missing. Read it before using any tool.
- **Checklists:** `.design/checklists/phase-N-*.md` — the done-criteria that gate each phase.
- **Dashboard:** `pipeline.html` — current status, artifacts and links.

---

## Pipeline

Nine phases, driven by `/design:*` commands. Each phase reads the previous phases'
artifacts, produces a Markdown artifact for the agent plus an HTML page for humans, ends
with a critique cycle and a human gate, updates the living docs, and commits.

| Phase | Command | Output lives in |
|---|---|---|
| 0 · Init | `/design:init` | `.design/memory/toolbox.md`, `pipeline.html` |
| 1 · Brief | `/design:brief` | this file, `README.md`, folder scaffolding |
| 2 · Discover | `/design:research` + `/design:users` | `research/`, `people/` |
| 3 · Structure | `/design:ia` | `ia/` |
| 4 · Wireframes | `/design:wireframes` | `wireframes/` |
| 5 · Language | `/design:voice` + `/design:concept` | `voice/`, `concept/` |
| 6 · Build | `/design:build` | `DESIGN.md`, `design-system/`, `ui/`, `visuals/` |
| 7 · System | `/design:system` | `design-system/docs/`, `patterns/`, `examples/` |
| 8 · Adapt | `/design:responsive` + `/design:motion` | `responsive/`, `animations/`, the system |
| 9 · Handoff | `/design:handoff` | `handoff/`, release |

Cross-cutting, usable at any point: `/design:status` (where am I, what's next),
`/design:critique` (defect table on any scope), `/design:check` (verify the current phase
against its checklist).

---

## Context blocks

Each phase appends its block below and keeps it current. A block is short — the facts later
phases need, plus paths. Not a retelling of the artifact.

### Brief
<!-- phase 1 · what the product is, who it is for, platform, constraints, success criteria -->
`[?]`

### People
<!-- phase 2 · primary persona and why · main job in "when / I want / so that" form · paths to research/ and people/ -->
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

### Adapt
<!-- phase 8 · the two breakpoints and the behavior that set them · motion tokens and the three jobs -->
`[?]`

### Handoff
<!-- phase 9 · pointer to handoff/, the map, the a11y checklist, release tag and live URLs -->
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
<!-- Phase 8: the responsive behavior lives in components and the shell; motion lives in components -->

**Kept rules**

- `[?]`
