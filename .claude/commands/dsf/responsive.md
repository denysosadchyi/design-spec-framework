---
description: "Phase 8 — Responsive: expand the mobile-first product to tablet and desktop: width audit, two behavior-based breakpoints as tokens verified against a doubled root font size, adaptive shell, adaptive components, split-view pattern."
---

# /dsf:responsive — Responsive

Mobile-first **expansion**, never desktop compression. The question is never "how do I
squeeze the desktop onto a phone", it is "what does the wider screen get to add". A
breakpoint that adds nothing is a breakpoint that should not exist.

Nothing here is a new project. Everything lands as new tokens and patterns in the existing
design system.

---

## Prerequisites

| Required | Produced by | If missing |
|---|---|---|
| `design-system/tokens.css` (primitive + semantic), `components/` | `/dsf:build` | run `/dsf:build` first |
| `design-system/docs/`, `patterns/`, `index.css` | `/dsf:system` | run `/dsf:system` first |
| `ui/shell.html` (header + tab bar, inserted by every screen) | `/dsf:build` | run `/dsf:build` first |
| `ia/flows.md`, `people/jtbd.md`, all `wireframes/*.html` with states | `/dsf:ia`, `/dsf:users`, `/dsf:wireframes` | run those first |
| `DESIGN.md` | `/dsf:build` | run `/dsf:build` first |

Stop and name the missing command. Do not improvise the missing artifact.

**Read before acting:** `.design/memory/constitution.md` (rule 5 — the fix lives at the
source; rule 6 — new enters the system first; rule 10 — layers, not redraws) and
`.design/memory/toolbox.md`. Any tool row that is not `active` uses its recorded fallback
silently — Playwright MCP for three-width review, human-opened browser otherwise;
`/impeccable critique` and `/impeccable audit`, or the built-in fallback prompts
`.design/prompts/critique.md` and `.design/prompts/audit.md`.

Also read `.design/progress/phase-8.md` — this command's own ledger. Before step 1, report
what you will skip, redo or resume based on it, then proceed only after stating that.

---

## Steps

After completing each numbered step and each HUMAN GATE, append the ledger line to
`.design/progress/phase-8.md` and update the `steps` object in the pipeline-data block
(current → done).

### 1 — Width audit (decisions, not styles)

Read `ia/flows.md`, `people/jtbd.md` and every `wireframes/*.html`. Write
`responsive/width-audit.md` — start from `.design/templates/width-audit.md` and keep its
sections and columns: one row per screen, columns `screen · what the user does here · how
that behaves on tablet · how that behaves on desktop · verdict`.

The verdict is exactly one of three:

- **same** — width adds nothing but air (login, single-form screens);
- **wider layout** — the same content in more columns (a feed, a gallery);
- **new behavior** — width opens something the phone did not have (list and detail side by
  side instead of one after the other).

Name the new behavior concretely. "Better on desktop" is not a verdict.

Touch no styles in this step. Render `responsive/width-audit.html` from the table.

> **HUMAN GATE — audit sign-off.** Present the table. The human confirms the verdicts
> before a single token is written. Breakpoints are read out of this table, never invented.
> Append the confirmed verdicts to `.design/decisions.md` (constitution rule 7 — every gate leaves a trace).

### 2 — Breakpoints and grid as tokens

Add to `design-system/tokens.css` as **primitive** tokens:

- `--bp-tablet`, `--bp-desktop` — exactly two, placed where the audit says behavior
  changes, values in `rem` so they respond to the user's font size, not only to screen
  width. This is the same accessibility discipline as visible focus.
- grid: `--grid-gap`, `--container-max`, `--col-count-tablet`, `--col-count-desktop`.

Two points, not five. Never a device width (375 / 768 / 1440) — a breakpoint is a behavior
decision, and tomorrow's device with a different width breaks a layout tuned to a hardware
catalogue.

**The literal in the media query is deliberate, not a defect.** CSS custom properties do not
work inside `@media` conditions — `@media (min-width: var(--bp-desktop))` is invalid and
silently does nothing; `@custom-media` is still a draft and ships in no browser. So the tokens
`--bp-tablet` and `--bp-desktop` in `tokens.css` stay the **single source of truth**, and every
media query repeats that value as a literal, **by design**. The rule is: every literal equals
its token, exactly — the phase checklist asserts precisely that, by collecting the widths used
across all media queries and expecting **exactly two distinct `rem` values**, matching the two
tokens. Add a comment next to each token naming it as the source the literals copy. This is a
documented duplication with a mechanical check behind it — do not report it as the phase 6
"values bypassing variables" defect, and do not try to "fix" it by dropping the tokens.

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

### 5 — Verify the breakpoints are really in `rem`

A verification, not a claim. `rem` in the token file proves nothing on its own — a value can
be written in `rem` and still be pinned to pixels by a hard-coded root size, or a media
query somewhere can be in `px` and win.

**Set the browser's root font size to double the default** (browser settings → font size, or
`html { font-size: 32px; }` temporarily) and reload the product at a width just below
`--bp-desktop`.

- **The breakpoints must move with it.** At double the root size the desktop layout appears
  at roughly half the pixel width — the person who enlarged their text gets the layout that
  fits their text, not the one that fits their monitor.
- If the layout switches at the same pixel width as before, something is pinned: find the
  `px` media query, the fixed `html` font-size, or the `px` fallback and fix it in
  `tokens.css` or the component.
- Walk one screen of each verdict class (`same`, `wider layout`, `new behavior`) at the
  doubled size and confirm nothing overlaps, clips or scrolls sideways.

Record the result — the observed switch widths before and after doubling — under the
breakpoint section of `DESIGN.md`. Phase 10's `handoff/a11y.md` cites this check; it must
have actually been run.

### 6 — Split-view pattern

The audit's "new behavior" rows are usually list + detail pairs (feed and item, chat list
and conversation). On the phone they are sequential screens; from `--bp-desktop` they
become split-view — list left, detail right.

Extract split-view into `design-system/patterns/` as one composition assembled from
existing components and driven by the breakpoint token. Do not build it per screen.

States survive on every width — empty, loading, error — **including "nothing selected"** in
the right pane on desktop. A pattern that only works when data is present is not done.

Add the pattern page to `docs/`: when a screen becomes split-view and when it stays single
column.

### 7 — Roll out with subagents

Fan out the remaining `wireframes/` screens to parallel subagents grouped by role (the
groups from earlier phases — shared/entry, primary role, secondary role, interaction).
Every subagent gets the same contract: the grid tokens, the split-view pattern where the
audit named it, and the ban on screen-level media queries.

Then run critique per group as separate subagents at three widths (phone, tablet, desktop):
`/impeccable critique` if active, `.design/prompts/critique.md` otherwise. Subagents
return findings, not fixes.

> **HUMAN GATE — browser check.** The human opens the screens at three widths themselves
> before the defect table is prioritized.

### 8 — Defect table and fix

Merge everything into ONE table: `screen · width · what is wrong · how to fix`. Hunt for:

| Defect | What it looks like |
|---|---|
| Horizontal scroll | something overflows the viewport at some width |
| Over-long line | a paragraph stretched across the whole desktop width, unreadable |
| Disappeared action | a button or item that existed on phone is gone on desktop |
| Media query in a screen | adaptive behavior leaked out of the component/shell |
| Device-based breakpoint | a point tuned to an iPhone or a MacBook, not to behavior |
| Pinned breakpoint | the layout switches at the same pixel width after the root font size is doubled |

Also run `/impeccable audit` (fallback: `.design/prompts/audit.md`).

> **HUMAN GATE — prioritization.** Present the table only. The human orders it. Then fix.
> Append their priorities to `.design/decisions.md`.

Fix at the source: breakpoint → the token in `tokens.css`; component behavior → the
component; navigation layout → `ui/shell.html`. Never in a single screen — a media query in
a wireframe is the signal that adaptation crawled the wrong way.

---

## Phase checklist

The canonical done-criteria live in `.design/checklists/phase-8-responsive.md` — run
`/dsf:check 8`. Nothing here overrides that file; the three below are an **excerpt**, the
signature items this phase fails on most often:

- `--bp-tablet` / `--bp-desktop` in `tokens.css`, in `rem`, on behavior change, exactly two — and doubling the root font size moves them
- **Zero media queries in `wireframes/*.html`** — adaptation lives in components, the shell and `design-system/patterns/split-view`
- No horizontal scroll and no action lost at any width; every state present at all three, including "nothing selected"

## Close the phase

1. `CLAUDE.md` — update the **Responsive** context block: the two breakpoint values and why, the
   grid tokens, where adaptive behavior lives, the split-view pattern path. Update the
   "current destination for a change" line if it moved.
2. `README.md` — the **Responsive** section: two or three sentences and links to
   `responsive/width-audit.md`, the pattern page, the shell.
3. Update `index.html` — edit **only** the `<script id="pipeline-data">` JSON block:
   phase 8 status, its artifact entries,
   `responsive/width-audit.html` plus the split-view docs page as live links, and the
   `steps` object. Leave the
   `context` object as it is; this phase fills none of its keys. Do not touch the markup,
   CSS or scripts around the block.
4. Commit with a message naming the phase. Push if the toolbox says the repo has a remote;
   otherwise stop at the commit and say so.

> **HUMAN GATE — phase sign-off.** Checklist passes and the human confirms.

Do not create a git tag. Run `/dsf:check 8` to close the phase — it verifies the checklist
and creates the phase tag `phase-8-responsive`. The next command after that is `/dsf:motion`
(phase 9).

---

## Recovery prompts

Copy-paste when something went the usual wrong way.

**Stretched mobile.**
```
The desktop is just the phone with wider columns. Go back to responsive/width-audit.md and
answer honestly for each screen: what did the width add? Where the answer is nothing, mark it
"same" and remove the breakpoint behavior there.
```

**Device-based points.**
```
Check --bp-tablet and --bp-desktop: are they placed where behavior changes, or where a device
ends? Re-derive them from responsive/width-audit.md and keep them in rem. Then double the root
font size and confirm the points move with it.
```

**Pinned breakpoints.**
```
I doubled the root font size and the layout still switches at the same pixel width. Find what
pins it — a px media query, a fixed html font-size, a px fallback — fix it in tokens.css or in
the component, and record the observed switch widths before and after in DESIGN.md.
```

**Per-screen adaptation.**
```
Find every media query in wireframes/*.html and move the behavior into a component or into
ui/shell.html. No media query may remain in a screen. Verify split-view lives in
design-system/patterns/ and the sidebar in ui/shell.html, not in each screen.
```

**Lost states.**
```
At desktop width, walk every split-view screen through empty, loading, error and "nothing
selected". List which states have no appearance at that width and add them in the pattern,
not in the screens.
```

**Line length.**
```
Find every text block that runs the full desktop width and bring it under --container-max.
Report which components were changed, not which screens.
```

**Third breakpoint pressure.**
```
Something wants a third breakpoint. Show me which row of responsive/width-audit.md demands it
and what behavior changes there. If no row does, solve it inside the existing two points.
```
