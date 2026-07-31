---
description: Verify a phase against its checklist file — pass/fail/human per item with file evidence, write the verdict to .design/checklists/results/, and on a full signed-off pass create the phase tag. Fixes nothing.
argument-hint: "[phase number or name, e.g. 4 or wireframes — omit for the current phase]"
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(grep:*), Bash(git tag:*), Bash(git log:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*)
---

<!--
Tool budget, deliberately narrow. This command verifies and never fixes, so it gets no tool that
could rewrite an artifact beyond its own two files. `Write` is for the verdict file
`.design/checklists/results/phase-N.md`; `Edit` is for appending a fresh verdict below a
`Reopened` line in that same file and for the `criteria` / `status` / `tagged` / `exists` keys of
the `pipeline-data` block in `pipeline.html`. `Bash(grep:*)` runs the checklists' embedded
`<!-- check: grep … -->` assertions verbatim — the evidence must be the real output, not a claim.
`git tag` creates the phase tag (and `v1.0` at phase 10) after the sign-off gate; `git log` reads
history; `git add` / `git commit` / `git push` are for the results-file + dashboard commit only.
-->


# /dsf:check — gate the phase

Usage: `/dsf:check [phase]` — the phase **number** (`4`, `8`) or its **name** (`wireframes`,
`responsive`). Both resolve through the table in `.design/memory/phases.md`. With no argument, check
the current phase as `/dsf:status` derives it.

This is the gate before sign-off. It **verifies**, it **writes one verdict file**, it **writes
that phase's success-criteria state into the dashboard**, and on a full pass it **creates the
phase tag**. It fixes nothing and edits no artifact.

---

## Prerequisites

- `.design/memory/phases.md` — the canonical table: which checklist gates which phase, which tag
  closes it, which artifacts count as key. This command carries no tag list and no phase table
  of its own.
- `.design/checklists/` — the done-criteria files. If the checklist for the phase is missing,
  say so and stop; do not invent criteria on the fly.
- The phase's artifacts. Missing artifacts are failed items, not a reason to abort.

**Read first:** `.design/memory/constitution.md` (rule 3 — data or `[?]`; rule 7 — human gates)
and `.design/memory/toolbox.md` (some items are verified in a browser: use Playwright MCP if
that row is `active`, otherwise mark the item **human** and say exactly what to look at).

---

## Steps

### 1 — Resolve the phase

Map the argument — number or name — onto a row of `phases.md`, and load that row's checklist
path. State the phase, the checklist path and the tag it will close in the first line of the
report. If the argument matches nothing, list the eleven phases and stop.

Phases 2 and 5 have two commands and one checklist. Check the whole phase; both sub-commands
must have run before it can pass.

### 2 — Verify each item against the files

Checklists are **read-only reference documents**. Nobody ticks them — not you, not the human.
The state of a box in the file means nothing; the state of the repo means everything. Walk the
items and verify each one against actual files.

Walk them **in file order and keep count**. Item 1 is the first `- [ ]` line in the checklist,
item 2 the second, straight through the section headings without restarting. That ordinal is the
criterion's id everywhere else in the framework — the results file, the dashboard, the page.
Wrapped continuation lines and `<!-- check: … -->` annotations belong to the item above and are
not items. See *Success criteria — identity and numbering* in `phases.md`; the per-phase item
counts are tabled there, and a mismatch between that table and the file you just read is worth
reporting.

| Verdict | Meaning |
|---|---|
| **pass** | verified, with a file path (and line, selector or token name) as evidence |
| **fail** | verified absent or wrong, with the same kind of evidence |
| **human** | only confirmable by eye or in a browser — state exactly what to look at |

Rules:

- Evidence is a path, not a claim. "Tokens are in place" is not a verdict; `tokens.css:41
  --bp-tablet: 48rem` is.
- **Executable assertions run verbatim.** Where a checklist item carries an annotation like
  `<!-- check: grep -rn "@media" wireframes/*.html → expect 0 -->`, run exactly that command and
  report its real output as the evidence. Do not paraphrase the assertion, do not substitute a
  cleverer one, and do not skip it because the item "obviously passes". A mismatch against the
  expected result is **fail**, with the offending lines quoted.
- An artifact that exists but is a `[?]` stub is **fail**, not pass.
- Never mark an item pass because it is "essentially done". Partial is fail, with the remainder
  named.

### 3 — Write the verdict file

Write `.design/checklists/results/phase-<N>.md`. This file is what `/dsf:status` reads to decide
whether the phase is done — without it, a phase can never close.

- **First run, or a plain re-check:** write the file fresh, replacing the previous verdict.
- **After a reopening:** if the file starts with a
  `Reopened <date> · by /dsf:change · <reason>` line, that line and the stale verdict under it
  stay. Append your fresh verdict as a new dated section **below** them, so the record reads:
  what was signed off, what reopened it, what the re-check found.

```md
# Phase <N> — <name> · check results

Checked: <YYYY-MM-DD> · Checklist: `.design/checklists/phase-<N>-<name>.md`
Result: **pass** | **fail** — <n> pass · <n> fail · <n> human · <n> of <total> items

| # | Item | Verdict | Evidence |
|---|---|---|---|
| 1 | <item text, shortened> | pass | `wireframes/_conventions.md:12` |
| 2 | <item text, shortened> | fail | `grep -rn "@media" wireframes/*.html` → 3 hits: … |
| 3 | <item text, shortened> | human | open `ui/kit.html` — confirmed by the human, <date> |

## Open
- <one line per failure, naming the command or file that closes it>
```

Every item gets a row, in order, numbered with its ordinal — including the ones you could not
resolve. The `#` column is what `/dsf:status` reads to rebuild the dashboard's criteria state, so
it must never be renumbered, compressed, or thinned out to "just the interesting ones".

The headline **Result** is `pass` only when every item is pass and every `human` item has been
confirmed by the human in this session. Anything else is `fail`, however close.

### 4 — Write the criteria state into the dashboard

Immediately after the results file, update **this phase's `criteria` object** inside the
`<script type="application/json" id="pipeline-data">` block of `pipeline.html`. This happens on
**every** run — a failing check updates it just as a passing one does, because a dashboard that
shows which criteria are still open is the whole point. Nothing else in the block changes at this
step: no `status`, no `tagged`, no `context`, no markup, no renderer.

```json
"criteria": { "total": 24, "passed": [1, 2, 3, 5], "failed": [4], "checkedAt": "2026-07-31" }
```

- `total` — the checklist's real item count, as counted in step 2.
- `passed` — the ordinals you verified as **pass**, plus any `human` item the human confirmed in
  this session. Ascending, no duplicates.
- `failed` — the ordinals you verified as **fail**. Ascending, no duplicates.
- `checkedAt` — today, `YYYY-MM-DD`.
- An ordinal you could not resolve — an unconfirmed `human` item — goes in **neither** array. The
  page renders it as pending, which is the truth. Never park an unconfirmed item in `passed` to
  make the row look complete; a criterion nobody looked at is not a criterion that passed.

The criteria state describes the checklist, not the phase. It carries no green anywhere on its
own — `status` and `tagged` still move only under step 6.

Only this phase's object is yours. Leave the other ten exactly as they are.

### 5 — Report

1. Phase, checklist path, and the one-line result: `N pass · N fail · N human`.
2. The item-by-item table (the same one written to the results file).
3. **Failures first**, as a short list of what to do and which command or file closes each.
   Items belonging to a different phase are labelled as such — do not silently expand this
   phase's scope.

No fixes. If a failure is trivially fixable, say so and name the command; do not fix it here.
Finding and fixing in one pass is exactly what the constitution forbids.

### 6 — On a full pass

If the results file says **pass**:

- Say the phase is ready for sign-off, and name the tag from `phases.md` — one tag per phase, and
  this command is the only thing in the framework that creates one.

> **HUMAN GATE — phase sign-off.** The tag is created only after the human says so. A green
> checklist is evidence, not permission.

After the human confirms:

- create the phase tag (`phase-<N>-<name>`); at phase 10, also create the release tag `v1.0`. If
  the tag already exists — this phase was signed off before and reopened by `/dsf:change` — that
  is **not** a failure: leave the tag in place, say the phase is re-closed on the existing tag,
  and never rewrite history to move it;
- update the `<script type="application/json" id="pipeline-data">` block in `pipeline.html`: this
  phase to `status: "done"` and `tagged: true`, the next phase from `locked` to `in-progress`,
  and the `exists` flags of this phase's artifacts to match what you just verified — on top of
  the `criteria` object you already wrote in step 4, which now reads all-passed. Markup, styling
  and renderer are not yours to touch, and **`context` is left exactly as it is** — those values
  belong to the phase commands and to `/dsf:status`;
- commit the results file and the dashboard together; push if `toolbox.md` records hosting as
  `active`.

**Re-closing a reopened phase.** The phase's `criteria` object still holds the ticks from the
check that signed it off originally, under the old `checkedAt`. Overwrite it with what you just
verified — the whole object, `total`, both arrays and the date. Do not merge the old passes into
the new ones and do not keep an ordinal green because it was green last time; every criterion is
re-verified from the repo or it is not passed.

### 7 — On failures

Write the results file anyway — a failed verdict with evidence is the most useful thing this
command produces — and write the `criteria` object anyway (step 4): the failing ordinals are
exactly what the dashboard should be showing. Then report and stop. Suggest
`/dsf:critique <scope>` for defect-shaped failures, or the phase's own command for missing
artifacts. Do not re-run the phase automatically: the human decides whether to fix, defer to
`design-system/backlog.md`, or accept and move on.

No tag on a failure, and no dashboard status change beyond the `criteria` object and `exists`
flags that are simply true.

---

## Reopened phases and stale ticks

`/dsf:change` reopens a phase by setting its dashboard `status` back to `in-progress` and writing
a `Reopened <date> · …` line at the top of its results file. It does **not** clear that phase's
`criteria`. So between the reopening and the next `/dsf:check`, the page legitimately shows the
old ticks under the reopened banner, dated by their old `checkedAt` — *these criteria passed on
that date, and something since then invalidated the phase*. That pairing is the signal, not a
bug to tidy away. This command is the only thing that replaces those ticks, and only by
re-verifying every item from the repo.
