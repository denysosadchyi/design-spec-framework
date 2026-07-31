---
description: Run the standard critique cycle on any scope — collect defects into one table, human prioritizes, then fix at the source and propagate.
---

# /dsf:critique — defect table on any scope

Usage: `/dsf:critique <scope>` — a screen, a folder, a component, a flow, a phase, or the
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
- `.design/memory/toolbox.md` — the `impeccable` row decides whether the quality pass is
  `/impeccable critique` and `/impeccable audit` (row `active`) or the built-in prompts
  `.design/prompts/critique.md` and `.design/prompts/audit.md` (row `fallback` or `[?]`); the
  browser row decides whether screens are opened with Playwright MCP or by the human. The three
  status values are defined in `toolbox.md` — use them, do not invent a fourth.
- `.design/memory/phases.md` — which phase owns the scope, and the canonical path of its
  artifacts. Findings are filed against a phase, so name the phase before you start.
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

Run the toolbox's quality pass and the built-in checks below. With the `impeccable` row
`active` that means `/impeccable critique`, plus `/impeccable audit` for a whole-phase scope;
otherwise run `.design/prompts/critique.md` and, for a whole-phase scope,
`.design/prompts/audit.md` — same cycle, same table, and the artifact records which of the two
was used. For a scope wider than a few files, fan out to subagents grouped by role, each with
the same contract. Subagents **return findings, not fixes**.

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

A defect table that lives only in chat did not happen. It goes to exactly one of two places:

- **The owning phase has a critique artifact** → write it there. Today that is
  `wireframes/_critique.md` for phase 4. Append, never overwrite: an earlier round's table stays
  readable underneath.
- **It does not** → append to `.design/critique-log.md`, the canonical home for every critique
  that has no phase file of its own. **The template does not ship this file — it is created
  here, on first use**, with the heading `# Critique log` and nothing else above the first
  section. It stays separate from `.design/decisions.md`, which holds gate answers only. Add
  one dated section per run:

  ```md
  ## 2026-07-31 · scope: design-system/components/

  Source of truth for this scope: `design-system/components/`
  Quality pass: `/impeccable critique` (toolbox: impeccable = active)

  | Where | What is wrong | How to fix | Outcome |
  |---|---|---|---|
  | … | … | … | fixed / deferred → backlog.md / dropped by the human |
  ```

  The **Outcome** column is what makes the log worth keeping — a row with no outcome is an
  unfinished cycle.

Then:

- Anything deferred goes to `design-system/backlog.md` (system gaps) or
  `handoff/onboarding-gaps.md` (documentation gaps) — never to nowhere.
- If a "keep it" was said, write the rule into `CLAUDE.md` and route it to the current source.
- Update `CLAUDE.md` / `README.md` only if a rule changed. Refresh `index.html` by running
  `/dsf:status` — only its `<script type="application/json" id="pipeline-data">` block changes,
  and the `context` values are left alone.
- Commit; push if `toolbox.md` records hosting as `active`.

No tag. Tags are created by `/dsf:check` alone. If this critique closed a phase, run
`/dsf:check <phase>` and sign off there.
