# Step ledgers

One file per phase: `phase-0.md` … `phase-10.md`. Each is an **append-only log of the steps that
actually ran**, written by the command while it runs.

The rest of the framework answers "is this phase done?". These files answer the question you
actually have when you come back on Tuesday: **how far did we get, and what was I in the middle
of?**

The contract lives in `.design/memory/phases.md` → **Step ledgers**. This page is the short
version, next to the files themselves.

---

## The line

Immediately after a numbered command step finishes — and immediately after a human gate inside
it resolves — the command appends exactly one line:

```
- <command>.<step> · <step name> · YYYY-MM-DD HH:MM · files: <paths touched> [· gate: <verbatim short answer>]
```

- `<command>` — the command without the `/dsf:` prefix: `research`, `users`, `wireframes`.
- `<step>` — the ordinal of that step's heading in the command file. Together they make the
  step id: `research.3`, `users.1`, `wireframes.6`.
- `<step name>` — the heading text, short.
- date + time — local, 24-hour, written when the step ends.
- `files:` — the repo-relative paths the step created or changed. Nothing touched → `—`.
- `gate:` — only on a step that held a human gate. The human's own words, one line, verbatim.

## Example — `phase-2.md`

```md
# Phase 2 · Discover — step ledger

- research.1 · Competitor sets — three groups · 2026-07-31 11:40 · files: research/research.md
- research.2 · Collect the data yourself, then build the matrix · 2026-07-31 12:25 · files: research/research.md, research/screens/
- research.3 · Benchmark — one dimension · 2026-07-31 12:58 · files: research/research.md · gate: benchmark against hotel booking, not classifieds
- research.4 · Patterns — five, one chosen · 2026-07-31 13:20 · files: research/research.md · gate: map-first, the third one
- reopened · phase-2 · 2026-08-04 09:15 · reason: main job changed to finding a flatmate · see .design/decisions.md
- users.1 · Inventory what research says about people · 2026-08-04 10:02 · files: people/personas.md
```

Both commands of a two-command phase write into the same file, in the order the work happened.

## The rules

1. **Append only.** Never edit, reorder or delete a line — not to fix a typo, not because the
   step was later redone.
2. **A re-run appends again.** A second `wireframes.3` line is not a duplicate to clean up; it
   is the record that the step ran twice, on two dates.
3. **Written in the same pass as the step**, before the next step starts. Never batched at the
   end of the phase.
4. **A step with no line did not happen.** Same standard the decision log holds gates to.
5. **This is the resume signal.** A command re-run reads its ledger first and reports what it
   will skip and what it will redo, before touching anything.
6. **The ledger is the truth; `pipeline.html` is the cache.** The dashboard's per-phase
   `steps: { total, done, current }` is derived from these files. When they disagree, the ledger
   wins and the JSON gets rebuilt — `/dsf:status` does that.
7. **The gate line does not replace `.design/decisions.md`.** The full entry — trigger,
   contradiction, option chosen, what propagated — still goes to the decision log. The ledger
   carries the one-line answer so the timeline reads on its own.
8. **Reopening leaves a line.** `/dsf:change` appends
   `- reopened · phase-N · YYYY-MM-DD HH:MM · reason: <one line> · see .design/decisions.md`
   and removes nothing above it. In the dashboard it resets `current` to `""` and leaves `done`
   alone — those steps did run.

## What does not go in here

- Findings, decisions and reasoning → `.design/decisions.md`.
- Checklist verdicts → `.design/checklists/results/phase-N.md`.
- Anything a human is meant to read as a report → the phase's own `.md` and `.html` artifacts.

A ledger line is a timestamp and a pointer. If it needs a paragraph, the paragraph belongs in
one of the files above and the line names it.

## Cross-cutting commands

`/dsf:status`, `/dsf:check` and `/dsf:critique` belong to no phase and claim no step ids.
`/dsf:change` writes only the reopen line.
