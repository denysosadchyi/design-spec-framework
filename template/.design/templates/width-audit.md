<!-- filled by /dsf:responsive — start from this skeleton, do not restructure it -->

# Width audit

Mobile-first **expansion**, never desktop compression. The question is never "how do I squeeze
the desktop onto a phone", it is **"what does the wider screen get to add"**. A breakpoint that
adds nothing is a breakpoint that should not exist.

Written **before any styling**. Touch no CSS while filling this in — the breakpoints are read
out of this table, never invented.

---

## Audit — one row per screen

**Every screen in `wireframes/` gets a row.** No screen is skipped, including state pages'
parent screens.

<!-- "what the user does here" — the task in one clause, taken from the job in jtbd.md, not a
     description of the layout -->
<!-- Tablet / Desktop cells — what changes at that width, in one clause. "Unchanged" is a valid
     answer and the most common correct one; a cell that describes the same thing in different
     words is a "same" row pretending to be a "wider layout" row. -->


| Screen | What the user does here | Tablet | Desktop | Verdict |
|---|---|---|---|---|
| `[?]` | `[?]` | `[?]` | `[?]` | same / wider layout / new behavior |

**The verdict is exactly one of three:**

| Verdict | Meaning |
|---|---|
| **same** | width adds nothing but air — sign-in, single-form screens |
| **wider layout** | the same content in more columns — a feed, a gallery |
| **new behavior** | width opens something the phone did not have — list and detail side by side instead of one after the other |

**Name the new behavior concretely.** "Better on desktop" is not a verdict, and a "new
behavior" row that cannot say what appears is a "wider layout" row in disguise.

> **HUMAN GATE — audit sign-off.** Present the table. The human confirms the verdicts before a
> single token is written.

---

## Breakpoints — exactly two, in `rem`

Placed where the audit says behavior changes. **Never a device width** (375 / 768 / 1440) — a
breakpoint is a behavior decision, and tomorrow's device with a different width breaks a layout
tuned to a hardware catalogue. `rem` so the points respond to the user's font size, not only to
screen width — the same accessibility discipline as visible focus.

| Token | Value (`rem`) | The audit rows that justify it |
|---|---|---|
| `--bp-tablet` | `[?]` | `[?]` |
| `--bp-desktop` | `[?]` | `[?]` |

**Grid tokens** (primitives, same file):

| Token | Value | Why |
|---|---|---|
| `--grid-gap` | `[?]` | `[?]` |
| `--container-max` | `[?]` | `[?]` — holds line length readable |
| `--col-count-tablet` | `[?]` | `[?]` |
| `--col-count-desktop` | `[?]` | `[?]` |

**Verification:** double the root font size and confirm the breakpoints move with it.
Result: `[?]`

**Pressure for a third breakpoint:** `[?]` — which audit row demands it, and what behavior
changes there. If no row does, it is solved inside the existing two.

---

## Shell adaptation

The shell adapts **once, in `ui/shell.html`**, for every screen. Screens are not touched.

- **What changes and at which breakpoint:** `[?]`
- **Same items in both forms?** `[?]`
- **Same states (active, hover, `focus-visible`) in both themes?** `[?]`

---

## Split-view

The audit's **new behavior** rows are usually list + detail pairs. On the phone they are
sequential screens; from `--bp-desktop` they become split-view — list left, detail right.

Extracted **once** into `design-system/patterns/`, assembled from existing components and driven
by the breakpoint token. Never built per screen.

| Pair (list screen + detail screen) | Becomes split-view at | States covered at that width |
|---|---|---|
| `[?]` + `[?]` | `[?]` | empty · loading · error · **nothing selected** |

**"Nothing selected"** is the state the right pane shows before the user picks anything. A
pattern that only works when data is present is not done.

---

## Screens with no adaptive work

<!-- the "same" verdicts, listed so it is visible that they were decided, not forgotten -->

- `[?]`
