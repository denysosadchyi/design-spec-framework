# Phase 1 — Brief · done criteria

Gate for `/design:brief`. Every item is verifiable by opening a file in this repo.
`/design:check` runs this list before sign-off.

## Brief

- [ ] The brief was produced by a structured brainstorm — the agent asked before it wrote;
      the human's answers are what is recorded, not an invented product description
- [ ] `CLAUDE.md` → **Brief** block states, each in one or two sentences: what the product
      is, the problem it solves, who it is for, platform, hard constraints
- [ ] Success criteria are written and observable — a stated outcome, not "make it good"
- [ ] Anything the human did not answer is marked `[?]` with an explicit hypothesis, not
      filled in with a plausible default
- [ ] The brief names what the product is **not** doing (out of scope)

## Repo

- [ ] Folder scaffolding exists for the pipeline: `research/`, `people/`, `ia/`,
      `wireframes/`, `voice/`, `concept/`, `ui/`, `design-system/`, `visuals/`, `handoff/`
- [ ] `README.md` → **Brief** section is filled in and matches `CLAUDE.md`
- [ ] `pipeline.html` renders, shows phase 1 as done and later phases as locked, and opens
      standalone in a browser
- [ ] `.design/memory/toolbox.md` has no `[?]` in the Status column — `/design:init` has run
- [ ] Repo is under git with a first commit; the phase is tagged `phase-1-brief`
- [ ] Remote (or the recorded hosting fallback from `toolbox.md`) is set up and pushed

## Honesty

- [ ] No claim about the audience or market appears in the brief without a source or a `[?]`
- [ ] The brief fits on one screen — later phases add detail, this one does not pre-empt them
