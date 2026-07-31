<!-- filled by /dsf:users — start from this skeleton, do not restructure it -->

# Jobs to be done

Every job is written as **"When [situation], I want [motivation], so that [outcome]"**, and
every job names the persona it belongs to and the research data it grew out of.

**If a feature name appears inside "I want", it is not a job — it is a feature.** Rewrite it as
human progress. A job backed by nothing goes to the **Hypotheses** section, not the main list.

---

## Main job — exactly one

**When** `[?]` **I want** `[?]` **so that** `[?]`

- Persona: `[?]`
- Source: `[?]`

## Related jobs — 3 to 5, on the way to the main one

| # | When… I want… so that… | Persona | Source |
|---|---|---|---|
| 1 | `[?]` | `[?]` | `[?]` |
| 2 | `[?]` | `[?]` | `[?]` |
| 3 | `[?]` | `[?]` | `[?]` |

## Emotional jobs

<!-- how the person wants to feel; listed separately from functional jobs -->

| # | Job | Persona | Source |
|---|---|---|---|
| E1 | `[?]` | `[?]` | `[?]` |

## Social jobs

<!-- how the person wants to be seen by others -->

| # | Job | Persona | Source |
|---|---|---|---|
| S1 | `[?]` | `[?]` | `[?]` |

## Hypotheses

<!-- jobs that sound right but have no data behind them. They stay here until data arrives. -->

| # | Job | What would confirm it | Where to look |
|---|---|---|---|
| H1 | `[?]` | `[?]` | `[?]` |

---

## Matrix — jobs × personas × features

Rows: **every** job above (main, related, emotional, social). Columns: **every** persona from
`people/personas.md`, plus the two mandatory columns **FEATURE** and **COMPETITORS**.

Cell for a persona column: importance of that job to that persona, **1–3**, **and** what in
`research/research.md` confirms it. Unknown importance is `[?]` — never an averaged number.

<!-- persona cell format: `<1–3> · <the place in research.md that shows it>` — a bare number is
     a guess with a decimal point removed -->
<!-- FEATURE — what in the product closes the job, in one clause. COMPETITORS — yes / no /
     partly, plus which player and where it is visible. -->
<!-- an MVP-core job is one that scores high for the primary persona AND is uncovered in the
     COMPETITORS column; read both facts off the matrix, do not re-argue them below -->
<!-- a cut candidate is a feature that appears in no FEATURE cell, or only in rows scoring low
     for every persona -->

| Job | `[persona 1]` | `[persona 2]` | FEATURE — what in the product closes this job | COMPETITORS — do the players in research.md already close it? |
|---|---|---|---|---|
| Main | `[?]` · `[?]` | `[?]` · `[?]` | `[?]` | `[?]` |
| Related 1 | `[?]` · `[?]` | `[?]` · `[?]` | `[?]` | `[?]` |
| E1 | `[?]` · `[?]` | `[?]` · `[?]` | `[?]` | `[?]` |

---

## MVP core — three jobs

Important to the **primary persona** *and* **not covered by the market** (read both facts off
the matrix, do not re-argue them).

1. `[?]` — matrix evidence: `[?]`
2. `[?]` — matrix evidence: `[?]`
3. `[?]` — matrix evidence: `[?]`

## Cut candidates

<!-- features that close no job in the matrix above -->

| Feature | Which job it was assumed to close | Why it closes nothing |
|---|---|---|
| `[?]` | `[?]` | `[?]` |

> **HUMAN GATE.** The three core jobs and the cut list are a scope decision. Present them and
> stop; the human owns this one.
