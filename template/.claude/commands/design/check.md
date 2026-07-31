---
description: Verify the current (or named) phase against its .design/checklists/ file — pass/fail per item with file evidence, no fixes; on a full pass, suggest the phase tag.
---

# /design:check — gate the phase

Usage: `/design:check [phase]` — e.g. `/design:check 8a`, `/design:check wireframes`. With no
argument, check the current phase as `/design:status` derives it.

This is the gate before sign-off. It **verifies and reports only**. It fixes nothing, writes
no artifact, ticks no box on the human's behalf.

---

## Prerequisites

- `.design/checklists/` — the done-criteria files. If the checklist for the phase
  is missing, say so and stop; do not invent criteria on the fly.
- The phase's artifacts. Missing artifacts are failed items, not a reason to abort.

**Read first:** `.design/memory/constitution.md` (rule 3 — data or `[?]`; rule 7 — human
gates) and `.design/memory/toolbox.md` (some items are verified in a browser: Playwright MCP
if installed, otherwise state the item as *human-verified* and ask the human to confirm it).

---

## Steps

### 1 — Resolve the phase

Determine which phase is being checked and load its file from `.design/checklists/` — the
naming is `phase-<n>-<name>.md` or `<name>.md` depending on the phase; list the folder
rather than guessing. State the phase and the checklist path in the first line of the
report.

### 2 — Verify each item with evidence

Walk the checklist item by item. For every item, produce a verdict backed by something a
human can open:

| Verdict | Meaning |
|---|---|
| **pass** | verified, with a file path (and line, selector or token name) as evidence |
| **fail** | verified absent or wrong, with the same kind of evidence |
| **human** | only confirmable by eye or in a browser — state exactly what to look at |

Rules:

- Evidence is a path, not a claim. "Tokens are in place" is not a verdict; `tokens.css:41
  --bp-tablet: 48rem` is.
- Grep-able bans are checked by actually searching: media queries in `wireframes/*.html`,
  hex values inside components, durations written outside tokens, `width`/`height`
  animations, `[?]` left in artifacts that phase should have closed.
- An artifact that exists but is a `[?]` stub is **fail**, not pass.
- Never mark an item pass because it is "essentially done". Partial is fail, with the
  remainder named.

### 3 — Report

Output in this order:

1. Phase, checklist path, and a one-line result: `N pass · N fail · N human`.
2. The item-by-item table: `item · verdict · evidence`.
3. **Failures first, as a short list of what to do and which command or file closes each.**
   Items that belong to a different phase are labelled as such — do not silently expand this
   phase's scope.

No fixes. If a failure is trivially fixable, say so and name the command; do not fix it
here. Finding and fixing in one pass is exactly what the constitution forbids.

### 4 — On a full pass

If every item is pass (with `human` items confirmed by the human):

- Say the phase is ready for sign-off.
- Suggest the tag, and offer to create it after the human confirms: `phase-0-init`,
  `phase-1-brief`, `phase-2-research`, `phase-2-users`, `phase-3-ia`, `phase-4-wireframes`,
  `phase-5-voice`, `phase-5-concept`, `phase-6-build`, `phase-7-system`,
  `phase-8-responsive`, `phase-8-motion`, `phase-9-handoff` (plus the release tag `v1.0` at
  phase 9).

> **HUMAN GATE — phase sign-off.** The tag is created only after the human says so. A green
> checklist is evidence, not permission.

- After tagging, regenerate `pipeline.html` so the phase reads done, and commit it. Push if
  the toolbox records a remote.

### 5 — On failures

Report and stop. Suggest `/design:critique <scope>` for defect-shaped failures, or the
phase's own command for missing artifacts. Do not re-run the phase automatically — the human
decides whether to fix, defer to `design-system/backlog.md`, or accept and move on.
