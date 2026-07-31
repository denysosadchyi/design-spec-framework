# Check results

`/dsf:check` writes one file here per phase — `phase-0.md` … `phase-10.md` — replacing the
previous verdict on each re-run. This folder is how a phase closes: `/dsf:status` reads these
verdicts, and a phase is **done** only when its key artifacts exist, its latest results file
says `pass`, and its tag exists (see `.design/memory/phases.md`).

One exception to the replacing: `/dsf:change` reopens a phase by writing
`Reopened <date> · by /dsf:change · <reason>` at the **top** of its results file. That line
marks everything under it stale — the phase reads as *in progress* until re-checked, tag or no
tag — and `/dsf:check` then appends its fresh verdict below rather than overwriting, so the file
reads: what was signed off, what reopened it, what the re-check found.

These files are also the source the dashboard's **success-criteria state** is rebuilt from. Each
phase entry in the `pipeline-data` block of `index.html` carries
`criteria: { total, passed, failed, checkedAt }`, where the numbers are checklist item ordinals —
item 1 is the first `- [ ]` line of the phase's checklist, and so on (see *Success criteria —
identity and numbering* in `.design/memory/phases.md`). `/dsf:check` writes that object from the
verdict at the same time it writes the file here; `/dsf:status` carries it forward untouched and
rebuilds it only when a results file here is newer than the stored `checkedAt`, reading the `#`
column of the verdict table. So the `#` column is load-bearing: it must list every item, in
checklist order, un-renumbered. Reordering or inserting checklist items breaks those ordinals and
requires a fresh `/dsf:check` for the phase.

Nothing else writes here. Do not hand-edit a verdict — a results file that does not match the
repo is worse than no results file at all. If a verdict looks wrong, re-run `/dsf:check`.

The checklists in the folder above are read-only reference documents. Nobody ticks their boxes;
the verdict lives here instead.

## Format

```md
# Phase 4 — Wireframes · check results

Checked: 2026-07-31 · Checklist: `.design/checklists/phase-4-wireframes.md`
Result: **fail** — 19 pass · 2 fail · 3 human · 24 of 24 items

| # | Item | Verdict | Evidence |
|---|---|---|---|
| 3 | Conventions written before any screen | pass | `wireframes/_conventions.md` — committed before the first screen |
| 8 | No color anywhere in the screens | fail | `grep -rniE "#[0-9a-f]{3,6}" wireframes/*.html` → 4 hits in `listing.html` |
| 10 | Navigator is identical on every page | human | open `wireframes/index.html` and two state pages side by side |

## Open
- Colors leaked into `listing.html` during fan-out — fix at `_conventions.md`, then re-run the
  affected group. `/dsf:critique wireframes/`
```

Rules the file must obey:

- **Result** is `pass` only when every item is pass and every `human` item was confirmed by the
  human in that session. Anything else is `fail`, however close.
- Every checklist item gets a row, in file order, carrying its ordinal in the `#` column — the
  unresolved ones too. The table above is an excerpt; a real file lists all 24.
- Evidence is a path, a line number, a token name, or the real output of the item's
  `<!-- check: … -->` assertion — never a claim like "looks fine".
- **Open** lists one line per failure, each naming the command or file that closes it.
