---
description: "Phase 8a — expand the mobile-first product to tablet and desktop: width audit, two behavior-based breakpoints as tokens, adaptive shell, adaptive components, split-view pattern."
---

# /design:responsive — Adapt · width

Mobile-first **expansion**, never desktop compression. The question is never "how do I
squeeze the desktop onto a phone", it is "what does the wider screen get to add". A
breakpoint that adds nothing is a breakpoint that should not exist.

Nothing here is a new project. Everything lands as new tokens and patterns in the existing
design system.

---

## Prerequisites

| Required | Produced by | If missing |
|---|---|---|
| `design-system/tokens.css` (primitive + semantic), `components/` | `/design:build` | run `/design:build` first |
| `design-system/docs/`, `patterns/`, `index.css` | `/design:system` | run `/design:system` first |
| `ui/shell.html` (header + tab bar, inserted by every screen) | `/design:build` | run `/design:build` first |
| `ia/flows.md`, `people/jtbd.md`, all `wireframes/*.html` with states | `/design:ia`, `/design:users`, `/design:wireframes` | run those first |
| `DESIGN.md` | `/design:build` | run `/design:build` first |

Stop and name the missing command. Do not improvise the missing artifact.

**Read before acting:** `.design/memory/constitution.md` (rule 5 — the fix lives at the
source; rule 6 — new enters the system first; rule 10 — layers, not redraws) and
`.design/memory/toolbox.md`. Any tool row that is not `installed` uses its recorded
fallback silently — Playwright MCP for three-width review, human-opened browser otherwise;
`impeccable` critique/audit, or the built-in prompts in `.design/templates/`.

---

## Steps

### 1 — Width audit (decisions, not styles)

Read `ia/flows.md`, `people/jtbd.md` and every `wireframes/*.html`. Write
`responsive/width-audit.md`: one row per screen, columns `screen · what the user does here
· how that behaves on tablet · how that behaves on desktop · verdict`.

The verdict is exactly one of three:

- **same** — width adds nothing but air (login, single-form screens);
- **wider layout** — the same content in more columns (a feed, a gallery);
- **new behavior** — width opens something the phone did not have (list and detail side by
  side instead of one after the other).

Name the new behavior concretely. "Better on desktop" is not a verdict.

Touch no styles in this step. Render `responsive/width-audit.html` from the table.

> **HUMAN GATE — audit sign-off.** Present the table. The human confirms the verdicts
> before a single token is written. Breakpoints are read out of this table, never invented.

### 2 — Breakpoints and grid as tokens

Add to `design-system/tokens.css` as **primitive** tokens:

- `--bp-tablet`, `--bp-desktop` — exactly two, placed where the audit says behavior
  changes, values in `rem` so they respond to the user's font size, not only to screen
  width. This is the same accessibility discipline as visible focus.
- grid: `--grid-gap`, `--container-max`, `--col-count-tablet`, `--col-count-desktop`.

Two points, not five. Never a device width (375 / 768 / 1440) — a breakpoint is a behavior
decision, and tomorrow's device with a different width breaks a layout tuned to a hardware
catalogue.

Update `DESIGN.md`: a short section explaining why these two points, citing the rows of
`width-audit.md` that justify each. Invent no behavior that the audit did not name.

### 3 — Desktop shell (one file, all screens)

Make `ui/shell.html` adaptive: from `--bp-desktop` the bottom tab bar becomes a left
sidebar and the header narrows. One change in one file propagates to every screen, because
every screen inserts this shell.

Touch only `shell.html` and its styles in `design-system/components/`. Do not touch screens.

Verify: the sidebar carries the **same items** as the tab bar, with the same states
(active, hover, `focus-visible`), in **both light and dark themes**.

### 4 — Adaptive behavior inside components

Move adaptive behavior into `design-system/components/` — card, feed/list, list header —
driven by the grid tokens: one column on phone, `--col-count-tablet` from `--bp-tablet`,
`--col-count-desktop` from `--bp-desktop`.

**No media query may appear in `wireframes/*.html`.** A screen is a composition; it does
not know breakpoints exist. Fix the card once and it lands everywhere the card stands.

Update the components' `design-system/docs/` pages: show each component at all three widths
side by side, so the behavior is visible, not described.

### 5 — Split-view pattern

The audit's "new behavior" rows are usually list + detail pairs (feed and item, chat list
and conversation). On the phone they are sequential screens; from `--bp-desktop` they
become split-view — list left, detail right.

Extract split-view into `design-system/patterns/` as one composition assembled from
existing components and driven by the breakpoint token. Do not build it per screen.

States survive on every width — empty, loading, error — **including "nothing selected"** in
the right pane on desktop. A pattern that only works when data is present is not done.

Add the pattern page to `docs/`: when a screen becomes split-view and when it stays single
column.

### 6 — Roll out with subagents

Fan out the remaining `wireframes/` screens to parallel subagents grouped by role (the
groups from earlier phases — shared/entry, primary role, secondary role, interaction).
Every subagent gets the same contract: the grid tokens, the split-view pattern where the
audit named it, and the ban on screen-level media queries.

Then run critique per group as separate subagents at three widths (phone, tablet, desktop):
`/impeccable critique` if installed, the built-in critique prompt otherwise. Subagents
return findings, not fixes.

> **HUMAN GATE — browser check.** The human opens the screens at three widths themselves
> before the defect table is prioritized.

### 7 — Defect table and fix

Merge everything into ONE table: `screen · width · what is wrong · how to fix`. Hunt for:

| Defect | What it looks like |
|---|---|
| Horizontal scroll | something overflows the viewport at some width |
| Over-long line | a paragraph stretched across the whole desktop width, unreadable |
| Disappeared action | a button or item that existed on phone is gone on desktop |
| Media query in a screen | adaptive behavior leaked out of the component/shell |
| Device-based breakpoint | a point tuned to an iPhone or a MacBook, not to behavior |

Also run `/impeccable audit` if installed.

> **HUMAN GATE — prioritization.** Present the table only. The human orders it. Then fix.

Fix at the source: breakpoint → the token in `tokens.css`; component behavior → the
component; navigation layout → `ui/shell.html`. Never in a single screen — a media query in
a wireframe is the signal that adaptation crawled the wrong way.

---

## Phase checklist

Verify against `.design/checklists/phase-8-adapt.md` (or run `/design:check`):

- [ ] `responsive/width-audit.md` — every screen has one of three verdicts; new behavior named concretely
- [ ] `--bp-tablet` / `--bp-desktop` in `tokens.css`, in `rem`, placed on behavior change, exactly two
- [ ] `DESIGN.md` justifies both points with references to the audit rows
- [ ] `ui/shell.html` — tab bar becomes sidebar at desktop; one file; same items and states in both themes
- [ ] Card, feed, list header adapt through grid tokens; **zero media queries in `wireframes/*.html`**
- [ ] `docs/` shows adaptive components at three widths
- [ ] `split-view` lives in `design-system/patterns/`, assembled from components, driven by the breakpoint
- [ ] No horizontal scroll at any width; `--container-max` keeps line length readable
- [ ] No action lost on desktop; empty / loading / error present at all widths, incl. "nothing selected"
- [ ] `responsive/width-audit.html` renders and is linked from `pipeline.html`

## Close the phase

1. `CLAUDE.md` — update the **Adapt** context block: the two breakpoint values and why, the
   grid tokens, where adaptive behavior lives, the split-view pattern path. Update the
   "current destination for a change" line if it moved.
2. `README.md` — an "Adaptivity" section: two or three sentences and links to
   `responsive/width-audit.md`, the pattern page, the shell.
3. Regenerate `pipeline.html` — phase 8a status, artifact checklist, link to
   `width-audit.html` and the split-view docs page.
4. Commit with a message naming the phase. Push if the toolbox says the repo has a remote;
   otherwise stop at the commit and say so.

> **HUMAN GATE — phase sign-off.** Checklist passes, the human confirms, then tag
> `phase-8-responsive`.

---

## Recovery prompts

Copy-paste when something went the usual wrong way.

- **Stretched mobile.** "The desktop is just the phone with wider columns. Go back to
  `width-audit.md` and answer honestly for each screen: what did the width add? Where the
  answer is nothing, mark it `same` and remove the breakpoint behavior there."
- **Device-based points.** "Check `--bp-tablet` and `--bp-desktop`: are they placed where
  behavior changes, or where a device ends? Re-derive them from `width-audit.md` and keep
  them in `rem`. Then double the root font size and confirm the points move with it."
- **Per-screen adaptation.** "Find every media query in `wireframes/*.html` and move the
  behavior into a component or into `ui/shell.html`. No media query may remain in a screen.
  Verify split-view lives in `patterns/` and the sidebar in `shell.html`, not in each screen."
- **Lost states.** "At desktop width, walk every split-view screen through empty, loading,
  error and 'nothing selected'. List which states have no appearance at that width and add
  them in the pattern, not in the screens."
- **Line length.** "Find every text block that runs the full desktop width and bring it
  under `--container-max`. Report which components were changed, not which screens."
- **Third breakpoint pressure.** "Something wants a third breakpoint. Show me which audit
  row demands it and what behavior changes there. If no row does, solve it inside the
  existing two points."
