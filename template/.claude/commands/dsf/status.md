---
description: Read the repo, derive every phase's state from artifacts + check results + tags and the current step from the progress ledgers, report where you are and what to type next, and refresh the pipeline.html data block. Never modifies artifacts.
argument-hint: (no arguments)
allowed-tools: Read, Glob, Grep, Edit, Bash(git tag:*), Bash(git log:*), Bash(git status:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*)
---

<!--
Tool budget, deliberately narrow. This command is read-only against every artifact, so it gets
no Write and no artifact-producing tool. `Edit` is the one exception and it is load-bearing: the
command's only write target is the `<script id="pipeline-data">` JSON block inside
`pipeline.html` (step 7). `git tag` / `git log` / `git status` are how the state is derived;
`git add` / `git commit` / `git push` exist only for the single dashboard-only commit in step 8.
-->


# /dsf:status — where am I

Reports the state of the project and refreshes the dashboard. **Read-only against every
artifact**: this command never edits, fixes, generates or "helpfully completes" anything. The
only file it writes is the data block inside `pipeline.html`.

Status is derived, never stored. There is no state file to drift out of sync — artifact
presence, the `/dsf:check` results files and the git tags are the truth; git history is the
timeline.

---

## Prerequisites

None. Runs at any point, including a repo where only `/dsf:init` has happened. If
`.design/memory/` is missing, say the repo is not initialized and name `/dsf:init`.

**Read first:**

- `.design/memory/phases.md` — the canonical phase table (phases, commands, checklists, tags,
  key artifact paths), the state definitions, the step-ledger contract and the `pipeline-data`
  contract. This command carries no phase table of its own; that file is the list.
- `.design/progress/phase-*.md` — the append-only step ledgers. They are what "mid-phase" means
  in this command's report, and the only source for the `steps` state in the dashboard.
- `.design/memory/constitution.md` — rule 8, living docs.
- `.design/memory/toolbox.md` — a `[?]` row in the Status column is itself an open phase-0
  finding worth reporting.

---

## Steps

### 1 — Scan for artifacts

For each phase in `phases.md`, check the **key artifacts** column: does each path exist, and
does it hold real content? A file that exists but contains only `[?]` placeholders counts as
**missing**. So does an empty folder.

### 2 — Read the check results

Read `.design/checklists/results/phase-N.md` for every phase that has one. That file — written
by `/dsf:check` — is the checklist verdict: date, per-item pass/fail/human, evidence paths. Its
headline result is what "the checklist passed" means, and its `#` column is the only source from
which this command may rebuild a phase's dashboard `criteria` state (step 7).

Nobody ticks boxes in `.design/checklists/*.md`. Those are read-only reference documents; a
checklist with unticked boxes tells you nothing. If a phase has artifacts but no results file,
the phase has simply never been verified — say so and name `/dsf:check <phase>`.

**Reopened phases.** If the most recent line in a results file is
`Reopened <date> · by /dsf:change · <reason>`, the verdict below it is **stale**. *Most recent*
means **the topmost line** — `/dsf:change` writes its reopen line at the top of the file, and
`/dsf:check` appends fresh verdicts **below** it. So a `Reopened` line still sitting on line 1
with nothing newer under it is the live state; a verdict section appended beneath it is the
re-check that cleared it. The phase does
not count as passed, even though its tag still exists and must not be deleted. Derive it as
**in progress** and report it in those words: *reopened by a change — run `/dsf:check <phase>`
to close it again*, with the reason quoted. A phase reopened and never re-checked is the single
most useful thing this command can surface.

### 3 — Read the step ledgers

Read `.design/progress/phase-N.md` for every phase that has one. Each line is one finished
command step: `- <command>.<step> · <step name> · date time · files: … [· gate: …]` (the format
is in `phases.md`, **Step ledgers**).

Per phase, derive three things and nothing more:

- **done** — the distinct step ids that appear in the file, in first-appearance order. A repeated
  id is a re-run, not a duplicate: count it once, and note the re-run in the report if it is
  recent.
- **current** — the step the phase is mid-way through. The last line names the last step that
  *finished*; the step after it in the command file is what runs next, and that is what you
  report as in progress. If the phase's last line is its command's final step, nothing is
  mid-flight — `current` is `""`.
- **last touched** — the timestamp on the last line. This is the honest answer to "when did I
  last work on this", better than the commit date.

A `- reopened · …` line is not a step: it never enters `done`, and it means everything above it
predates a change request. Say when you see one.

A phase with artifacts but no ledger predates this convention, or the steps were run without
recording them. Report it in one line and move on — never reconstruct a ledger from artifacts,
timestamps or git history. This command writes no ledger lines, ever.

### 4 — Read the timeline

Read the git tags (`phase-*`, `v*`) and the last few commits. One tag per phase, per the scheme
in `phases.md`. A tag means a human signed the phase off; artifacts present with no tag means
the phase was worked but never gated — that distinction is usually the actual answer to "where
am I".

Then read `.design/decisions.md`, the append-only decision log. The last few entries are what
the project decided most recently and why — the fastest way for a human returning after a week
to remember where they left their own reasoning. If the file does not exist yet, say nothing
about it; do not create it.

### 5 — Derive the state

Apply the **States** table in `phases.md` verbatim:

- **done** — key artifacts present · latest results file passes · phase tag exists;
- **in progress** — some artifacts present, but one of those three is unmet;
- **locked** — nothing produced and the previous phase's artifacts (its prerequisites) are
  missing.

The **current phase** is the lowest-numbered phase that is not done. Out-of-order work (phase 8
artifacts with no phase 7) is reported as a contradiction, not silently accepted — constitution
rules 9 and 13, name it.

The **current step** is the one derived from that phase's ledger in step 3. Phase state and step
state answer different questions and are derived from different files: the phase from artifacts,
results and tags; the step from the ledger. Where they disagree — a signed-off phase whose ledger
stops halfway, a ledger running on in a phase with no artifacts on disk — report the
disagreement rather than picking the tidier of the two.

### 6 — Report, in the designer's language

Three short blocks, no preamble, no jargon. The reader is a designer; "artifact present, tag
absent" is not a sentence they should have to parse.

- **Where you are** — the current phase in plain words, and whether it is untouched, mid-way,
  or done-but-not-signed-off. When the phase is mid-way, say **which step**, in the ledger's own
  ids and words: *mid-phase 4 — step `wireframes.6` done (the rest of the main flow), `wireframes.7`
  next: link along the flows*, plus when it was last touched. A phase with no ledger is reported
  as "no step record" — not as step 1.
- **What's done** — one line per completed phase, each with the links to its HTML pages so they
  can be opened right now.
- **What to type next** — the exact prompt to type, as a single line they can copy
  (`/dsf:wireframes`, `/dsf:check 4`). Then, only if relevant: what is still open (from the
  results file), plus any contradiction or `[?]` toolbox row blocking it.

Close with **Recently decided** — the 2–3 most recent entries from `.design/decisions.md`, one
line each (date · what was decided). Skip the block entirely if the log is empty or absent.

Keep it to one screen. This is a status readout, not a report.

### 7 — Regenerate the `pipeline.html` data block

Rewrite **only** this block:

```html
<script type="application/json" id="pipeline-data"> … </script>
```

Never the markup, never the styling, never the renderer. Those ship with the template and are
not yours.

**`phases`** — regenerate `status`, `tagged` and every artifact's `exists` wholesale from the
derivation above (`criteria` is the exception — see below), with `link: true` on the HTML pages a human opens — the canonical
set from `phases.md`: `research/research.html`, `people/personas.html`, `ia/ia.html`,
`wireframes/index.html`, `voice/voice.html`, `concept/directions.html`, `concept/concept.html`,
`ui/kit.html`, `design-system/docs/index.html`, `responsive/width-audit.html`,
`animations/motion-inventory.html`, `handoff/index.html`,
`design-system/examples/one-shot/index.html`, plus the release links once phase 10 is done.

**`criteria`** — **preserve it, or rebuild it from a results file. Never invent a pass.** Each
phase entry carries `{ "total": N, "passed": [...], "failed": [...], "checkedAt": "YYYY-MM-DD" }`,
where the ordinals are that checklist's item numbers (see *Success criteria — identity and
numbering* in `phases.md`). This command does not verify criteria — `/dsf:check` does. Here it
only carries state forward:

- **Default: copy the object through byte-for-byte.** Including on a reopened phase, whose ticks
  stay visible under the reopened banner with their old `checkedAt`. Stale ticks with an honest
  date are information; blanking them is not.
- **Rebuild only when the phase's results file is newer than its `checkedAt`** — a `Checked:`
  date later than the stored one, or a fresh verdict section appended below a `Reopened` line
  that the stored date predates. Then read the results table and rebuild the object from its `#`
  column: `pass` and human-confirmed rows into `passed`, `fail` rows into `failed`, everything
  else into neither array, `checkedAt` set to that file's `Checked:` date, `total` from the
  checklist's item count. Say in the report which phases you rebuilt and from which file.
- **Missing object or missing key** → restore it with `total` from the phase's checklist (count
  the `- [ ]` lines; cross-check against the table in `phases.md`), `passed: []`, `failed: []`,
  `checkedAt: ""`.
- **A results file with no parsable `#` column** (hand-written, or from an older format) → leave
  the stored object alone and report that the phase's criteria state cannot be rebuilt until
  `/dsf:check <phase>` runs again. Do not guess ordinals from item wording.
- Never move an ordinal into `passed` on your own authority — not from an artifact that "clearly
  satisfies it", not from a green phase status, not from a tag. A tag is not a per-criterion
  verdict, and a done phase whose criteria state is empty is simply a phase checked before this
  field existed. Report it, leave it.

**`steps`** — **verify it against the ledgers and rebuild whatever disagrees.** Each phase entry
carries `{ "total": M, "done": ["<command>.<n>", …], "current": "<command>.<n>" | "" }`. Unlike
`criteria`, this one is a cache of a file this command can read in full, so it is not carried
forward on trust:

- **The ledger is the truth.** Rebuild `done` from the distinct step ids in
  `.design/progress/phase-N.md` (first-appearance order, a re-run counted once) and `current`
  from the derivation in step 3. Say in the report which phases you corrected and how they
  differed — a `steps` object that drifted from its ledger usually means a command died mid-step.
- **No ledger file → do not invent state.** Leave the stored object as it is, and report that
  the phase has no step record. An empty ledger file (header only) means `done: []`,
  `current: ""` — that is a real, honest state.
- **`total`** is the phase's step count from the per-command table in `phases.md` — the sum of
  both commands for phases 2 and 5. If a stored `total` disagrees with that table, fix it and
  say so.
- **Missing object or missing key** → restore it: `total` from the table, `done: []`,
  `current: ""`.
- Never move a step id into `done` because the artifact it produces exists. Files are evidence
  for the phase state, not for the step state; only a ledger line puts a step in `done`.
- Never write a ledger line to make the JSON agree with the artifacts. The JSON bends to the
  ledger, never the other way round.

**`context`** — **preserve it.** These are the product facts the guide page uses to fill its
per-step prompt hints; you are not their author. Carry every existing value through unchanged.
Two exceptions:

- the object or a key is **missing** → restore it with every key present, empty string for
  anything you cannot source;
- a key is **empty but now obviously derivable from an artifact** → fill it from that artifact
  and say in the report where it came from. Sources: `product` and `oneLiner` from the
  `CLAUDE.md` Brief block; `benchmarkDimension` from `research/research.md`; `primaryPersona`
  from `people/personas.md` (the one marked primary); `mainJob` from `people/jtbd.md` (the main
  job); `chosenDirection` from `concept/concept.md` (the direction the human picked).

Never overwrite a non-empty `context` value, and never guess one into existence — an empty
string is the honest answer and the page handles it.

If `pipeline.html` is missing entirely, say so and name `/dsf:init`; do not hand-build a
replacement page.

Never write the dashboard into a state the files do not support. A green phase with a missing
artifact is the one lie the whole framework depends on not telling.

### 8 — Commit (only the dashboard)

If `pipeline.html` changed, commit it alone with a status message. Push if `toolbox.md` records
hosting as `active`; otherwise stop at the commit and say so. **No tags** — tags are created by
`/dsf:check` on a signed-off pass, and this command signs nothing off.

---

## Guardrails

- Never create, edit or complete a phase artifact, even a trivially missing one. Report it and
  name the command that produces it.
- Never write a results file. `/dsf:check` verifies; this command only reads verdicts.
- Never tick a checklist box — nobody does. Checklists are reference documents.
- Never mark a success criterion passed. This command copies `criteria` forward, or rebuilds it
  from a newer results file. It verifies nothing, so it may not pass anything.
- Never append to, edit or create a step ledger. This command reads `.design/progress/` and
  reconciles the dashboard to it; it runs no steps, so it records none.
- Never infer a phase is done from a plausible-looking folder. Presence means real content.
- Never run critique or fixes. That is `/dsf:critique`.
