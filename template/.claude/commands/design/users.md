---
description: Phase 2b — behavior-based personas and JTBD from the research, jobs × personas × features matrix, critique pass, targeted re-research.
---

# Phase 2b — Users

Personas are a **synthesis of research, not an act of authorship**. At every step the question is "where does this come from?". No answer means it is a hypothesis, and it gets marked `[?]`.

## Prerequisites

- `research/research.md` exists. If missing → tell the user to run `/design:research` first and stop.
- `CLAUDE.md` contains the brief. If missing → `/design:brief`.

## Load context

Read `.design/memory/constitution.md`, `.design/memory/toolbox.md`, the brief in `CLAUDE.md`, and `research/research.md` in full. Honor the fallback rules in `toolbox.md` — they apply again in step 6.

## Steps

### 1. Inventory what the research actually says about people

Do not produce personas yet. First extract from `research/research.md` everything it contains about **people**: who is looking, what drives them, what they fear, how they choose, where they drop out. Group into observations; every observation carries a link or a screenshot path.

Then, separately and honestly, list what we **do not** know about people. Where there is no data, write `[?]` — not a plausible guess. This list is the input to step 6, so it must be specific enough to research.

### 2. Personas — 2 to 4, every block sourced

From those observations build 2–4 personas. For each:

- **context** — who they are and what situation they arrive from;
- **jobs** — what they are trying to get done;
- **pains** — what hurts most in the way they do it today (the alternatives named in the research, not imagined ones);
- **trust triggers** — what convinces them, what scares them off;
- **quote** — a mood line from a real review or forum post found during research.

Every block links back to `research/research.md` (source or screenshot). Where there is no data: `[?]`, phrased as a hypothesis, never as fact.

**Split by behavior, not demographics.** If two personas have the same jobs and the same pains and differ only in age or city, they are one persona — merge them and say so.

Mark one **primary**, the rest secondary, and justify the choice. Save to `people/personas.md`.

### 3. Jobs — "when / I want / so that"

From `people/personas.md` and `research/research.md`, write jobs in the form **"When [situation], I want [motivation], so that [outcome]"**.

Hierarchy:
- 1 **main job** of the product;
- 3–5 **related jobs** on the way to it;
- **emotional** and **social** jobs, listed separately.

For each job, name the persona and the research data it grew out of. A job backed by nothing goes into a **Hypotheses** section, not the main list.

Then verify: **if a feature name appears in "I want", it is not a job — it is a feature.** Rewrite it as human progress. Save to `people/jtbd.md`.

### 4. The matrix — jobs × personas × features

Rows: jobs. Columns: personas. Cell: importance of that job to that persona (1–3) **and** what in `research.md` confirms it. Unknown importance is `[?]`, never an averaged number.

Add two more columns:
- **FEATURE** — what in the product would close this job;
- **COMPETITORS** — whether the players in `research.md` already close it.

Below the matrix, the conclusion: **three jobs for the MVP core** (important to the primary persona *and* not covered by the market) and the **feature candidates to cut** (features that close no job).

**HUMAN GATE — MVP core.** Present the three core jobs and the cut list. Stop. The user owns this scope decision. Append the matrix to `people/jtbd.md`.

### 5. Critique pass — confirmed / hypothesis / invented

Audit your own output. If the `impeccable` skill is active per `toolbox.md`, run its critique on these files as well; otherwise run this pass alone.

1. Walk every statement in `personas.md` and `jtbd.md` and classify it: **confirmed by research / hypothesis / invented**. Output as a table.
2. Extract the dangerous subset: statements that **drive design decisions** but rest on `[?]` or on invented material. This is the list that matters.
3. Formulate **three targeted questions** that would close the most important gaps, and say where the answer would be found — forums, reviews, specific products.

### 6. Targeted re-research

Surgical, not from scratch. Take the questions from step 5 in priority order and collect data for them specifically — web fetch of reviews, forums, teardowns; browser if active per `toolbox.md`.

Then update, and nothing else:
- `research/research.md` — a new subsection **"Re-research after personas"**;
- the affected places in `people/personas.md` — confirmation found: drop the `[?]`; contradiction found: correct the persona **and** write down what changed.

Leave every other file untouched.

### 7. `people/personas.html`

One clean page from `personas.md` and `jtbd.md`: persona cards with the primary marked, the job hierarchy, the matrix as a real table, and `[?]` / "hypothesis" marks visibly preserved. Same dark, quiet styling as `research.html` — these pages are read as a set.

### 8. Run the phase checklist

Run `.design/checklists/phase-2-discover.md`. Hard items: personas differ by behavior, every block sourced or `[?]`, no feature names inside job statements, matrix has no empty rows or columns left unexplained, the critique table exists, re-research actually changed something or explicitly found nothing.

### 9. Living docs, dashboard, commit

- `CLAUDE.md` — append a short block: primary persona (2–3 lines), main job, top-3 MVP jobs. This is what phase 3 reads on every prompt.
- `README.md` — a **People** section: what lives in `personas.md` and `jtbd.md`.
- Regenerate `pipeline.html`; link `personas.html`.
- Commit: `feat: phase 2b — personas, JTBD, coverage matrix`. Push **only** if `toolbox.md` says GitHub hosting is active.

### 10. Sign-off

Report the primary persona, the main job, the three MVP jobs, and any `[?]` still standing under a design-critical claim. Next command: `/design:ia`.

Then suggest, and run on approval:

```
git tag phase-2-users
```

## Recovery prompts

```
Where does this statement come from? Give me the place in research.md or mark
it [?].
```

```
This is demographics, not behavior. What separates these personas by jobs and
pains? If nothing — merge them into one.
```

```
That job is a feature. Rewrite it without the feature name: situation,
motivation, outcome only.
```

```
You dropped the [?] without new data. Restore the mark or show the source.
```

```
The matrix has averaged cells. Replace every guessed importance with [?] and
name what would confirm it.
```

```
The critique found nothing invented. Go again and be adversarial: which claims
would you be unable to defend in front of the client?
```
