---
description: Run the standard critique cycle on any scope — collect defects into one table, human prioritizes, then fix at the source and propagate.
---

# /design:critique — defect table on any scope

Usage: `/design:critique <scope>` — a screen, a folder, a component, a flow, a phase, or the
whole product. If no scope is given, ask for one; never critique "everything" by default.

The cycle is fixed by the constitution (rule 4): **find, table, human, fix.** Critique never
edits in the pass that finds. One table, always — not a stream of comments per file.

---

## Prerequisites

Whatever the scope references must exist. If the scope names artifacts that a phase has not
produced yet, say which command produces them and stop.

**Read before acting:**

- `.design/memory/constitution.md` — especially rule 4 (the cycle), rule 5 (the fix lives at
  the source and where the source currently is), rule 6 (new enters the system first).
- `.design/memory/toolbox.md` — `impeccable` row decides whether the quality pass is
  `/impeccable critique` and `/impeccable audit` or the built-in prompts in
  `.design/templates/`; the browser row decides whether screens are opened with Playwright
  MCP or by the human.
- The written contracts the scope must obey — whichever exist: `wireframes/_conventions.md`,
  `voice/voice.md` + `microcopy.md`, `DESIGN.md`, `design-system/tokens.css`,
  `responsive/width-audit.md`, `animations/motion-inventory.md`.

Critique against the written contract, not against taste. A finding that cannot point at a
rule, an artifact or a state is an opinion — mark it as such or drop it.

---

## Steps

### 1 — Fix the scope

Restate the scope as a concrete file list and the contracts it must satisfy. Name the
current **source of truth** for this scope per constitution rule 5 (screen conventions / kit
/ tokens / design system) — that is where fixes will land, and it changes the shape of every
finding.

### 2 — Collect findings

Run the toolbox's quality pass (`/impeccable critique`, plus `/impeccable audit` for a
whole-phase scope) and the built-in checks below. For a scope wider than a few files, fan
out to subagents grouped by role, each with the same contract. Subagents **return findings,
not fixes**.

Built-in checks, applied to whatever exists in scope:

| Layer | Look for |
|---|---|
| Structure | dead ends, missing states (empty / loading / error), orphan screens, depth over budget |
| Copy | contradicts `voice.md`, one concept named two ways, banned words, tone wrong for the state |
| Visual | a value not from a token, a hex inside a component, geometry that ignores the scale |
| System | a component used off-system, a variant that should be a token, a pattern with fewer than three uses |
| States | missing `focus-visible`, missing disabled, contrast below AA, states missing in one theme |
| Responsive | horizontal scroll, over-long line, action lost at width, media query inside a screen, device-based breakpoint |
| Motion | movement with no job, drifting durations for one role, `width`/`height`/`top`/`left` animated, missing reduced-motion, motion tone against text tone |
| Honesty | a claim with no source, a `[?]` quietly resolved into an invention |

### 3 — One table

Merge everything — subagent findings, tool output, your own — into **one** table:

`where · what is wrong · how to fix`

Rules for the table:

- One row per defect, deduplicated across subagents. The same defect on twelve screens is
  **one row** naming the source, not twelve rows.
- "How to fix" names the destination file (token, component, pattern, shell, conventions),
  not a vague direction.
- Findings that are taste, not contract, go in a clearly separate short list below the
  table.
- No fixes applied yet. Nothing edited.

> **HUMAN GATE — prioritization.** Present the table and stop. The human orders it, drops
> rows, or promotes a taste item into a rule. You do not decide what matters.

### 4 — Fix at the source

Apply the prioritized rows where the truth lives:

- geometry or color value → the token level (semantic for color roles, primitive for
  geometry);
- appearance or behavior of a repeated element → the component;
- a composition proven on three or more screens → the pattern;
- navigation layout → `ui/shell.html`;
- wording → `microcopy.md`, then propagated to screens;
- a convention screens must follow → `wireframes/_conventions.md`, then all screens.

Never patch one screen to make a table row disappear. If the same component looks different
on two screens, the defect is at the source.

If a fix requires something that does not exist in the system yet, it does not get
hand-drawn: add it to the system first, or record it in `design-system/backlog.md` and stop
(constitution rule 6).

### 5 — Propagate and re-verify

After fixing at the source, walk everything that consumes it and confirm the change landed
everywhere — same fan-out groups, same widths, same themes as the original pass. Re-run the
tool pass on the fixed rows only.

Report what was fixed, what was deferred, and anything the human dropped, so the next phase
does not rediscover it.

### 6 — Record and commit

- Write the table and its outcome into the scope's critique artifact — `_critique.md` for
  wireframes, the phase's critique section otherwise. A defect table that lives only in chat
  did not happen.
- Anything deferred goes to `design-system/backlog.md` (system gaps) or
  `handoff/onboarding-gaps.md` (documentation gaps) — never to nowhere.
- If a "keep it" was said, write the rule into `CLAUDE.md` and route it to the current
  source.
- Update `CLAUDE.md` / `README.md` only if a rule changed. Regenerate `pipeline.html`.
- Commit; push if the toolbox records a remote.

No tag. If this critique closed a phase, run `/design:check` and tag there.
