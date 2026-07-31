# Decisions

The project's decision log. Every human gate answer, every "keep it", every spec contradiction
resolved under constitution rule 12, and every change request lands here as one entry.

**Append-only.** Newest entry at the bottom. Nothing is edited after the fact and nothing is
deleted — a decision that was later reversed stays, and the reversal is a new entry that names
it. The log is the project's memory of *why*; rewriting it is how a repo starts lying about
itself.

**Written by** any `/dsf:*` command at its gates, and by the rule-12 guard whenever a request
contradicts something written. **Read by** `/dsf:status` (what has been decided so far) and
`/dsf:change` (whether this request has already been settled once).

## Entry format

One heading plus four fields per entry, nothing else:

```md
## YYYY-MM-DD · <trigger>

**Decided:** what was decided — the human's own words, verbatim, wherever they said it.
**Contradicts:** `file:line` + the line quoted — or `nothing`.
**Option:** spec-update | exception | withdrawn | n/a
**Propagated:** every file touched as a result — or `none`.
```

- **trigger** is one of: `gate` (a mandatory gate answer), `keep-it` (an experiment promoted to
  a rule), `contradiction` (the rule-12 guard fired), `change-request` (`/dsf:change`).
- **Option** is `n/a` for a plain gate answer that contradicted nothing.
- **Verbatim matters.** "Warmer, less corporate — like the second one" is a decision. "The human
  approved the palette direction" is a summary of one, and summaries are what drift is made of.
- Keep an entry to five lines. If the reasoning needs more, it belongs in the artifact; link it.

---

<!-- Example entry — delete this block once the first real decision is logged.

## 2025-03-14 · contradiction

**Decided:** "Put the price straight on the card, top right. People are filtering by price and
they shouldn't have to open anything to see it."
**Contradicts:** `wireframes/_conventions.md:31` — "Cards carry the object and one trust signal
only; commercial detail lives on the detail screen."
**Option:** spec-update
**Propagated:** `wireframes/_conventions.md` (rule rewritten, source noted), `voice/microcopy.md`
(new key `list.card.price`), 6 list screens + their `-empty` states, `ui/kit.html`, `DESIGN.md`.

-->
