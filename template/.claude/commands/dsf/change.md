---
description: Handle a change request against a signed-off phase — find the earliest phase it invalidates, run the spec guard, print the blast radius, gate the scope, propagate at the source, reopen the affected phases and log the decision.
argument-hint: "\"<the change, in the designer's own words>\""
---

# /dsf:change — change what was already decided

Usage: `/dsf:change "the primary job is finding a flatmate, not listing a room"`.

This is the entry point for anything that arrives **after a phase was signed off**. Not a
defect (that is `/dsf:critique`), not a new screen inside the existing spec (that is the
phase's own command) — a change to a decision the repo has already written down and built on.

The framework's whole claim is that the repo is the design file. A change that lands on the
screens but not on the spec breaks that claim quietly: the file still says one thing, the
product now does another, and the next phase reads the file. So this command changes the
**spec first**, then everything downstream of it, then reopens the phases that were closed on
the old truth.

Nothing here is fixed on one screen. Nothing here is fixed without the designer choosing the
scope.

---

## Prerequisites

| Needed | Missing → |
|---|---|
| At least one signed-off phase | nothing to change — run the phase command instead |
| `.design/memory/phases.md` | the canonical phase table; this command carries none of its own |
| `.design/decisions.md` | create it from the template header before writing the first entry |
| `pipeline.html` with its `pipeline-data` block | say so and name `/dsf:init`; never hand-build a replacement |

**Read first:**

- `.design/memory/constitution.md` — rule 12 (the spec-consistency guard) drives step 2, rule 5
  (the fix lives at the source) drives step 5, rule 7 (human gates) drives step 4.
- `.design/memory/phases.md` — phases, commands, checklists, canonical artifact paths, the
  step-ledger contract and the `pipeline-data` contract.
- `.design/progress/phase-*.md` — the step ledgers of the phases this change touches. They say
  how much of each phase actually ran, which sharpens the blast radius in step 3 and tells the
  re-run what it is resuming into.
- `.design/memory/toolbox.md` — before using any tool, and to know whether pushing is `active`.
- `.design/decisions.md` — this request may already have been decided once. If it was, say so
  and quote the entry before doing anything else.
- `CLAUDE.md` — the accumulated context blocks.

---

## Steps

### 1 — Restate the request

Say back, in one or two sentences, what you understand the change to be, and name what you
take to be **out** of scope. A change request is usually shorter than the change it implies;
restating it is where a misread gets caught for free instead of after forty files.

If the request is ambiguous in a way that changes the blast radius — "make it feel calmer"
could be voice, colour or motion — ask exactly one clarifying question and stop.

### 2 — Classify the earliest phase it invalidates, and run the guard

Walk the spec chain from the top (constitution rule 12) and find the **highest artifact** the
request actually touches. Not where it was noticed, not where it would be easiest to apply —
where the truth it contradicts is written.

A request phrased about a screen is often a phase-2 or phase-3 change wearing a phase-6 coat:
"this card should show availability first" reads as a component tweak and is usually a job
priority. Name the earliest phase and say why.

Then check the request against `.design/decisions.md` and against every spec layer upstream of
that phase.

> **If it contradicts a recorded decision, run the rule-12 guard now, before the blast-radius
> table.** Report what it contradicts (file, line, the line quoted), why that decision exists
> (its recorded source), and the three options: update the spec · one-off exception · withdraw.
> Stop and wait. The answer decides whether there is a propagation to size at all — a one-off
> exception has almost no blast radius, and a withdrawal has none.

If it contradicts nothing written, say that plainly and continue: this is a change to an area
the spec never settled, and it costs less than the designer probably expects.

### 3 — Print the blast radius

One table, every artifact that stops being true. Read the files to build it — presence and
content, not memory of what a phase usually produces.

| Artifact | What becomes stale | Owning command | Effort |
|---|---|---|---|
| `people/jtbd.md` | main job + the jobs × personas matrix | `/dsf:users` | small |
| `ia/sitemap.md` | two screens lose their job; nav order | `/dsf:ia` | medium |
| `wireframes/*.html` | 11 screens + 6 state pages, navigator links | `/dsf:wireframes` | large |
| `voice/microcopy.md` | 9 copy keys, 2 of them on the shell | `/dsf:voice` | small |

- **Effort** is `small` (one file, minutes) · `medium` (a handful of files, one fan-out) ·
  `large` (a fan-out across a phase's whole output, worth its own review pass).
- Count real files. "Several screens" is not a blast radius; `11 screens + 6 state pages` is.
- Include the living docs (`CLAUDE.md`, `README.md`, `pipeline.html`) and the checklist result
  files of every phase that will be reopened.
- If a downstream artifact stays true, say so explicitly — knowing what *survives* is half of
  what makes the number believable.

Close the table with the honest total: which phases reopen, and roughly what re-closing them
costs.

### 4 — HUMAN GATE — pick the scope

> **HUMAN GATE.** Present the table and stop. The designer picks one:
>
> - **Full propagation** — the spec changes at the source and every downstream artifact is
>   brought in line. The phases reopen and get re-checked. Nothing is left divergent.
> - **Partial, with recorded debt** — the spec changes, an explicitly named subset propagates
>   now, and the rest is written down as debt: what is still stale, in which files, and what
>   closes it. Debt goes into `design-system/backlog.md` **and** into the decision-log entry.
>   Debt that is only in the chat is not debt, it is a surprise.
> - **Withdraw** — the request is dropped. Log it with the reason and stop.
>
> Do not pick for them, and do not start on "the obvious part" while they think.

### 5 — Execute: source first, then downstream in dependency order

1. **Change the spec at the source.** The upstream artifact from step 2 is edited first, and
   the new line carries its source the same way the old one did (constitution rule 3). If the
   old line drove decisions elsewhere, do not delete it silently — note in the artifact what it
   was and that it changed, with the date.
2. **Propagate downstream in dependency order**, never sideways: brief → research → personas
   and jobs → sitemap and flows → wireframe conventions → screens → voice and microcopy →
   concept attributes → `DESIGN.md` and tokens → components and patterns → docs, `map.md`,
   handoff spec. Skip the layers that do not exist yet.
3. **Bulk propagation fans out** (constitution rule 4): fix one artifact as the sample, show it,
   then hand the rest to parallel subagents — grouped by role, each reading the same written
   contract (the changed spec line, `_conventions.md`, the kit, `microcopy.md`) plus the sample.
   Subagents change files; they do not re-decide anything.
4. **Every fix lands at its source** (rule 5). A change propagated onto screens while the token,
   component or copy key it came from stays on the old value is not propagation, it is drift
   done at scale.
5. **Under partial scope, mark what stayed behind** where it lives — a comment in the file, a
   line in `backlog.md` — so the next critique reads it as recorded debt, not a defect.

### 6 — Reopen the affected phases

For every phase whose artifacts just changed, rewrite **only** this block in `pipeline.html`:

```html
<script type="application/json" id="pipeline-data"> … </script>
```

Never the markup, never the styling, never the renderer — those ship with the template.

- Set each reopened phase's `status` back to `"in-progress"`, and update the `exists` flags to
  match what is actually on disk now.
- **`steps`: reset `current` to `""`, leave `done` exactly as it is.** Those steps did run — on
  the old truth, but they ran, and blanking them would make the dashboard lie about the past to
  make the present look tidy. The phase command decides for itself, when it runs again, which of
  them it redoes; that is its job, not this command's. Leave `criteria` alone for the same reason
  (`phases.md`, *Reopening and `criteria`*).
- **Append the reopen line to each reopened phase's ledger**, `.design/progress/phase-N.md`:
  `- reopened · phase-N · YYYY-MM-DD HH:MM · reason: <one line> · see .design/decisions.md`.
  Nothing above it is edited or deleted — the ledger keeps the full history, and the line is what
  makes the steps above it readable as "done, then invalidated". If the phase has no ledger file
  (it predates the convention), create it with its header and the reopen line, and add nothing
  else: do not reconstruct steps you did not watch happen.
- **Leave `context` alone** except for a value this change made false — a new main job, a new
  chosen direction. Then update that one value and say where it came from.
- Add a one-line `Reopened <date> · by /dsf:change · <reason>` at the top of
  `.design/checklists/results/phase-N.md` for each reopened phase — that exact wording, it is
  what `/dsf:check` and `/dsf:status` look for — so a stale pass cannot flip the dashboard back
  to green on the next `/dsf:status`.
- Leave the git tags in place. History is not rewritten; `/dsf:check` re-closes the phase.

Then update the living docs (constitution rule 8): the affected `CLAUDE.md` context blocks and
any `README.md` line the change made wrong.

### 7 — Log the decision, then commit

Append one entry to `.design/decisions.md` in the file's format — date · trigger
`change-request` (or `contradiction`, if the guard fired in step 2) · what was decided in the
designer's own words · what it contradicted, file and line · the option chosen · every file
touched. Recorded debt is named in the same entry.

Commit everything together — spec, propagation, dashboard, decision log, the reopen lines in
`.design/progress/` — with a message that names the change. Push if `toolbox.md` records hosting as `active`.

Finish with exactly this, naming the phases:

```
Run /dsf:check on the reopened phases to close them again: /dsf:check 3, /dsf:check 4.
```

---

## Guardrails

- Never apply a change that contradicts the spec without running the guard first. Silent
  compliance is the failure this command exists to prevent.
- Never treat a change request as a defect. `/dsf:critique` fixes things that are wrong against
  the spec; this command changes what the spec says.
- Never propagate before the scope gate. Never propagate onto screens without changing the
  source.
- Never quietly leave a phase green after changing its artifacts.
- Never clear a phase's `steps.done`, and never edit or remove a line in a step ledger. Reopening
  adds a line; it does not erase the ones above it.
- Never rewrite an earlier `.design/decisions.md` entry. A reversal is a new entry that names
  the old one.

---

## Recovery prompts

Copy-paste when the agent drifts.

```
You applied my change but didn't touch the spec it contradicts — run the guard: show me what
this contradicts (file and the line quoted), why that decision exists, and my three options.
```

```
You reopened phases but the dashboard still shows them done — update the pipeline-data block
in pipeline.html: those phases back to in-progress, exists flags to match the files, markup
untouched.
```

```
You changed the screens and left the source alone. Find where this truth actually lives —
the sitemap line, the copy key, the token — change it there, then propagate to every place
built on it.
```

```
That blast-radius table is vague. Count the real files: read the folders and give me exact
numbers per artifact, plus which artifacts stay true.
```

```
You classified this as a phase-6 change, but what I'm changing is the job the screen serves.
Re-classify from the top of the spec chain and show me the earliest phase it invalidates.
```

```
We agreed on partial scope and you propagated everything. Roll back to the agreed subset and
write the rest into design-system/backlog.md as named debt, with what closes it.
```

```
Nothing landed in .design/decisions.md. Append the entry: date, trigger, my words verbatim,
what it contradicted with file and line, the option I chose, and every file you touched.
```

```
This is the second time we've granted an exception for the same rule. Stop and make the case
for changing the spec itself — show me the rule, both exceptions, and what a spec-update costs.
```
