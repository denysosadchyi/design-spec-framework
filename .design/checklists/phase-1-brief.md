# Phase 1 — Brief · done criteria

Gate for `/dsf:brief`. Every item is verifiable by opening a file in this repo. This file is a
**read-only reference document** — nobody ticks the boxes. `/dsf:check 1` verifies each item
against the files, writes `.design/checklists/results/phase-1.md`, and creates the
`phase-1-brief` tag on a full pass.

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

- [ ] Folder scaffolding exists for the pipeline, exactly the twelve folders named in
      `.design/memory/phases.md`: `research/`, `people/`, `ia/`, `wireframes/`, `voice/`,
      `concept/`, `ui/`, `design-system/`, `visuals/`, `responsive/`, `animations/`, `handoff/`
      — no folder missing and none invented
- [ ] `README.md` → **Brief** section is filled in and matches `CLAUDE.md`
- [ ] `index.html` renders standalone in a browser and shows phase 1 `in progress` with its
      artifacts present; `context.product` and `context.oneLiner` are filled from the brief
- [ ] `.design/memory/toolbox.md` has no `[?]` in the Status column — `/dsf:init` has run
- [ ] Repo is under git with the brief committed
- [ ] Pushed if `toolbox.md` records hosting as `active`; otherwise the local-only fallback is
      recorded and nothing was pushed

## Honesty

- [ ] No claim about the audience or market appears in the brief without a source or a `[?]`
- [ ] The brief fits on one screen — later phases add detail, this one does not pre-empt them
