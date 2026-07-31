---
description: Phase 2a — competitors in three groups, self-collected data, cross-category benchmark, five distinct patterns, research.md + research.html.
---

# Phase 2a — Research

You collect the market evidence this product will be argued from. **You** gather the data — the user does not click through thirty sites. Every fact carries a source; a fact without one is written as `[?]`, never as a confident sentence.

## Prerequisites

- `CLAUDE.md` contains the brief. If missing → tell the user to run `/dsf:brief` first and stop.
- `.design/memory/toolbox.md` exists. If missing → `/dsf:init`.

## Load context

Read `.design/memory/constitution.md`, `.design/memory/toolbox.md`, and the brief in `CLAUDE.md`.

From `toolbox.md`:
- **Browser active** → open competitor products yourself and capture screenshots into `research/screens/`.
- **Browser fallback** → work from web fetch only; label every screen you could not capture as `[no screenshot]` and ask the user for the ones that matter most. Never describe an interface you have not seen.

## Steps

### 1. Competitor sets — three groups

You already know the product from `CLAUDE.md`; do not re-ask. Name the competitors in three groups, **max 5 per group**:

1. **HARD** — same product, same audience, same market.
2. **SOFT** — different product, same underlying job.
3. **ASPIRATIONAL** — international benchmarks in the category, regardless of whether the user could realistically compete with them.

For each: name, group, why it belongs in that group, and what specifically to learn from it for this product. No searching or data collection yet — this step is a decision about scope.

**HUMAN GATE — competitor set.** Present the list. Stop. The user adds, removes, or replaces entries. Their local knowledge beats your search results.

### 2. Collect the data yourself, then build the matrix

Work only from the approved list — do not start a fresh search for new names.

- Web fetch: UX teardowns, reviews, pricing pages, the products' own sites.
- Browser: enter each product, capture the key screens into `research/screens/` with descriptive filenames. If a screen sits behind a login you do not have, capture what is reachable and label the gap `access restricted` in the caption.

Then compare every competitor across fixed axes, as one table:

| axis | meaning |
|---|---|
| audience | who it is actually built for |
| product core | what the product fundamentally is |
| key mechanic | the one interaction the product lives on |
| trust | how it makes strangers/transactions safe enough to proceed |
| monetization | who pays, for what, when |

Below the table, three lists: **three shared market patterns**, **three real differences**, **three open questions** that only the product owner can answer.

### 3. Benchmark — one dimension, any category

The matrix will surface one dimension where every competitor is weak or where the whole market converges. That dimension is the benchmark subject.

**HUMAN GATE — benchmark dimension.** Propose the dimension with the evidence from the matrix that points to it. Stop and let the user confirm or substitute.

Then:

1. Define **6–8 concrete criteria** for scoring that dimension, each on a 1–5 scale, each written so two people would score it the same way.
2. Pick **4–5 products that do this dimension best in their own niche — from any category**. Crossing categories is the point: the best solution to this dimension is usually not in this market.
3. Collect material on them with sources, and score them against the criteria as a table.

Close with: **three mechanics worth carrying into the MVP**, and **one that will not work here**, with the reason.

### 4. Patterns — five genuinely different, one chosen

State the key interaction problem of the product in one sentence (derived from the brief, not invented).

Name **five principled UX patterns, not five variations of one approach**. Two patterns that differ only in layout are one pattern. For each: how it works, where it is used in the wild, when it fits, when it breaks.

Then, grounded in `CLAUDE.md`: which pattern fits this context best with three reasons; which is second under a named condition; which is disqualified and why.

**HUMAN GATE — pattern choice.** Present the recommendation. Stop. The user picks.

### 5. Assemble `research/research.md`

Four sections, nothing else:

- **COMPETITORS** — the matrix, plus the three shared patterns and three differences.
- **BENCHMARK** — criteria, scoring table, the three mechanics for the MVP, the one that will not work.
- **PATTERNS** — the five patterns compressed, the chosen one, and why it fits this context.
- **CONCLUSIONS** — for each gap, a hypothesis and the section above it follows from.

Sourcing pass before you call it done: walk every factual claim and attach a link or a screenshot path. Where no source exists, write `[?] unverified` and state the hypothesis. Do not round a guess into a number.

### 6. `research/research.html`

Build a single clean page from `research.md`: the four sections, comparison tables as real tables, screenshots from `research/screens/` inline with their captions and `access restricted` labels intact, `[?]` marks visibly preserved. Dark, quiet, readable; no framework, no CDN dependency beyond what is already in the repo. This page is what gets shown to a client, so it must survive being read without you in the room.

### 7. Run the phase checklist

Run `.design/checklists/phase-2-discover.md`. Report pass/fail per item. Hard items: three groups populated, screenshots present or explicitly flagged, benchmark crosses categories, five patterns genuinely distinct, every claim sourced or `[?]`.

### 8. Living docs, dashboard, commit

- `CLAUDE.md` — append a short **Market** block: chosen interaction pattern, the three MVP mechanics, the top three open questions. Keep it to what later phases need to read on every prompt.
- `README.md` — a **Research** section: what lives in `research.md`, `research.html`, `research/screens/`.
- Regenerate `pipeline.html` from artifact presence plus checklist results; link `research.html`.
- Commit: `feat: phase 2a — market research, benchmark, patterns`. Push **only** if `toolbox.md` says GitHub hosting is active.

### 9. Sign-off

Report the chosen pattern, the benchmark verdict, and the open questions phase 2b should carry. Next command: `/dsf:users`.

Then suggest, and run on approval:

```
git tag phase-2-research
```

## Recovery prompts

```
Give me a source link for every figure. Do not invent one — write
"[?] unverified" where you do not know.
```

```
These are variations of one approach. Give me patterns that differ in mechanism,
not in layout.
```

```
Argue from a specific screenshot in research/screens/, not from general phrases
about the category.
```

```
All five benchmark products are from our own category. Replace at least two with
products from other categories that solve this dimension better.
```

```
This criterion is not scoreable — two people would score it differently.
Rewrite it as something observable.
```

```
You dropped the [?] without new data. Restore the mark or show the source.
```
