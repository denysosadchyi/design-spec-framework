<!-- filled by /dsf:handoff — start from this skeleton, do not restructure it -->

# Onboarding gaps

The fresh-eyes audit: walk the repo **as a developer who has never seen this project**, from
`README.md` down into the code, and record everything that is unclear without a verbal
explanation.

**Ask product questions, not syntax questions.** Not "what is a CSS variable", but "why two
themes, which is primary", "how do I add a new screen", "where is the line between a component
and a pattern".

**Fix nothing here.** This list *is* the order form for the whole handoff — every row becomes
something the documentation must close. And every gap is closed **with documentation, not with a
new product feature**: finishing features under the cover of documentation turns handoff into
another untested development round.

> **HUMAN GATE — gap list.** Present the list before documentation starts. The human confirms
> it and can add gaps they already know about.

---

## Gaps

| # | The question a newcomer asks | Where it bit (file or folder) | Closed by which document | Status |
|---|---|---|---|---|
| 1 | `[?]` | `[?]` | `[?]` | open / closed |

**Status is `closed` only when a specific file answers the question**, not when the answer
exists in someone's head.

<!-- a good gap row is a question a newcomer would actually ask out loud, and "where it bit"
     names the file or folder that produced the confusion -->
<!-- "closed by which document" names a file and the section inside it; naming the folder means
     the gap is still open -->


---

## Debt

Holes found while writing the handoff — including accessibility items from `handoff/a11y.md` —
that are **not** fixed in this phase. Recording them here is the fix for this phase; building is
a new cycle.

| # | Debt | Where it lives in the code | How it was found | Referenced from |
|---|---|---|---|---|
| 1 | `[?]` | `[?]` | `[?]` | `[?]` |

---

## Fresh-subagent test

A subagent that has not seen this session and does not know the product, given a **single
source**: the `handoff/` folder and `README.md`. Task: build a small new feature from the
documentation alone, asking nothing.

### Run 1

- **Task given:** `[?]`
- **Where it stumbled:** `[?]`
- **What it was forced to invent:** `[?]`
- **Closed with which document:** `[?]`

### Run 2 (after the documentation was closed)

- **Task given:** `[?]`
- **Where it stumbled:** `[?]`
- **Verdict:** `[?]`

The handoff is done when a context-free subagent walks the feature through **without
stumbling**. Every stumble is closed with documentation, then the test is re-run with a fresh
subagent.

### Clean-clone check

- **Cloned into a fresh folder and brought up using `README.md` alone:** `[?]`
- **Steps that required knowledge not in the repo:** `[?]`
