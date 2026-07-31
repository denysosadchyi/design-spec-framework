---
description: Read the repo, derive the current phase from artifact presence and checklist results, report where you are / what's done / what's next, and regenerate pipeline.html. Never modifies artifacts.
---

# /design:status — where am I

Reports the state of the project and refreshes the dashboard. **Read-only against every
artifact**: this command never edits, fixes, generates or "helpfully completes" anything.
The only file it writes is `pipeline.html`.

Status is derived, never stored. There is no state file to drift out of sync — artifact
presence plus checklist results are the truth, git history is the timeline.

---

## Prerequisites

None. Runs at any point, including a repo where only `/design:init` has happened. If even
`.design/memory/` is missing, say the repo is not initialized and name `/design:init`.

**Read first:** `.design/memory/constitution.md` (rule 8 — living docs) and
`.design/memory/toolbox.md` (a `[?]` toolbox row is itself a phase-0 finding worth
reporting).

---

## Steps

### 1 — Scan for artifacts

Check presence and non-emptiness of the phase artifacts. `[?]`-only placeholder files count
as **missing**, not present.

| Phase | Command | Key artifacts |
|---|---|---|
| 0 · Init | `/design:init` | `.design/memory/toolbox.md` with no `[?]` status rows, `pipeline.html` |
| 1 · Brief | `/design:brief` | brief block in `CLAUDE.md`, `README.md`, folder scaffolding |
| 2 · Discover | `/design:research` + `/design:users` | `research/research.md` + `.html` + `screens/`, `people/personas.md`, `people/jtbd.md`, `people/personas.html` |
| 3 · Structure | `/design:ia` | `ia/sitemap.md`, `ia/flows.md`, `ia/ia.html` |
| 4 · Wireframes | `/design:wireframes` | `wireframes/_screens.md`, `_conventions.md`, `*.html` incl. state pages, `_critique.md` |
| 5 · Language | `/design:voice` + `/design:concept` | `voice/voice.md`, `voice/microcopy.md`, `concept/references.md`, `concept.md`, `directions.html`, `concept.html` |
| 6 · Build | `/design:build` | `DESIGN.md`, `design-system/tokens.css`, `components/`, `ui/shell.html`, `ui/kit.html`, `visuals/` |
| 7 · System | `/design:system` | `design-system/index.css`, `docs/`, `patterns/`, `examples/`, `backlog.md` |
| 8a · Responsive | `/design:responsive` | `responsive/width-audit.md` + `.html`, `--bp-*` tokens, adaptive `ui/shell.html`, `patterns/split-view` |
| 8b · Motion | `/design:motion` | `animations/motion-inventory.md` + `.html`, `--dur-*` / `--ease-*` tokens, `DESIGN.md` motion sections |
| 9 · Handoff | `/design:handoff` | `handoff/onboarding-gaps.md`, `spec/`, `map.md`, `a11y.md`, `handoff/README.md`, `handoff.html`, `examples/one-shot/` |

### 2 — Read the checklists

Read every file in `.design/checklists/`. An artifact that exists but whose checklist has
unticked items is **in progress**, not done. Record which items are open — they are the
"what's next" list.

### 3 — Read the timeline

Read git tags (`phase-*`, `v*`) and the last few commits. A tag confirms a human sign-off; an
artifact present with no tag means the phase was worked but never signed off. Report that
distinction — it is usually the actual answer to "where am I".

### 4 — Derive the state

Assign each phase exactly one state:

- **done** — artifacts present, checklist fully ticked, phase tag exists;
- **in progress** — some artifacts present, or checklist partially ticked;
- **locked** — the previous phase is not done and its artifacts are prerequisites.

The **current phase** is the earliest phase that is not done. Out-of-order work (phase 8
artifacts with no phase 7) is reported as a contradiction, not silently accepted — per
constitution rule 9, name it.

### 5 — Report

Three short blocks, no preamble:

- **Where you are** — current phase, its command, and whether it is untouched, mid-way, or
  awaiting sign-off.
- **What's done** — completed phases in one line each, with the live HTML artifact links.
- **What's next** — the exact next command to run, plus any open checklist items and any
  contradictions or `[?]` toolbox rows blocking it.

Keep it to what fits on one screen. This is a status readout, not a report.

### 6 — Regenerate `pipeline.html`

Rewrite the dashboard's embedded data — phase states, per-phase artifact checklist (exists ✓
/ missing —), and a live link for every HTML artifact: `research.html`, `personas.html`,
`ia.html`, the wireframe navigator, `directions.html`, `concept.html`, `kit.html`, the
showcase, `width-audit.html`, `motion-inventory.html`, `handoff.html`, plus the release links
when phase 9 is done.

If the page carries a generated data block (e.g.
`<script type="application/json" id="pipeline-data">`), replace that block and leave the
markup alone. If the page is missing entirely, regenerate it from the same derivation and
say so.

Never hand-edit the dashboard into a state the files do not support. A green phase with a
missing artifact is a lie the whole framework depends on not telling.

### 7 — Commit (only the dashboard)

If `pipeline.html` changed, commit it alone with a status message. Push if the toolbox
records a remote; otherwise stop at the commit and say so. No tags — tags are a sign-off
gate, and this command signs nothing off.

---

## Guardrails

- Never create, edit or complete a phase artifact, even a trivially missing one. Report it
  and name the command that produces it.
- Never tick a checklist item. `/design:check` verifies; the human ticks.
- Never infer a phase is done from a plausible-looking folder. Presence means real content.
- Never run critique or fixes. That is `/design:critique`.
