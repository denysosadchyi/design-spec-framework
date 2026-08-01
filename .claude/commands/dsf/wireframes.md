---
description: Phase 4 — build the product as grey semantic HTML screens with every real state as its own page, linked along the flows.
---

# /dsf:wireframes

Turn the map into the product's first layer of code. Grey, semantic HTML, real domain copy,
every real state as a separate page, a tree navigator on every page, screens linked along
the flows. Nothing here decides colour, type or brand.

## Prerequisites

Required artifacts. If one is missing, stop and name the command that produces it:

| Artifact | Missing → run |
|---|---|
| `ia/sitemap.md`, `ia/flows.md` | `/dsf:ia` |
| `people/jtbd.md` | `/dsf:users` |
| `CLAUDE.md` with the brief | `/dsf:brief` |

Read `.design/memory/constitution.md` and `.design/memory/toolbox.md` before you start.
Use the recommended tool where the toolbox records it as `active`, the recorded fallback otherwise.
Read the artifacts above; never re-ask what is already written in the repo.

Also read `.design/progress/phase-4.md` — this command's own ledger. Before step 1, report what
you will skip, redo or resume based on it, then proceed only after stating that.

---

After completing each numbered step and each HUMAN GATE, append the ledger line to
`.design/progress/phase-4.md` and update the `steps` object in the pipeline-data block
(current → done).

## Step 1 — Screen × state table

Take the screens of the **main flow** only — the ones that close the main job for the main
persona. The rest of the sitemap is rolled out in step 8.

For each screen write:
- the name exactly as it appears in `ia/sitemap.md`;
- the job it closes — a line quoted from `people/jtbd.md`;
- its position in the flow — from `ia/flows.md`;
- which of the four states are real for it (empty / error / loading / success) and why.

Build the table: rows = screens, columns = the four states. `✓` where the state is real,
`—` where the scenario does not produce it. Do not mark success everywhere by reflex — only
where there is a distinct "it worked" screen.

Never take a screen without a job and a place in a flow. Save to `wireframes/_screens.md` —
start from `.design/templates/wireframes-screens.md` and keep its sections and columns.
This table is the work order for every later step.

## Step 2 — `wireframes/_conventions.md` (the contract)

Write the rules once, before any screen. Later steps and later phases read this file. Start
from `.design/templates/wireframes-conventions.md` and keep its sections.

- **Fidelity:** structure, hierarchy and zones only. Grey. No colour, type, brand, shadows,
  icons or imagery.
- **Markup:** semantic HTML — `header`, `nav`, `main`, `section`, `article`, `form`,
  `button`. Real elements for buttons and fields, not `div` soup.
- **Copy:** real copy from the product's domain. Lorem ipsum, "Heading 1" and "Lorem"
  placeholders are defects, not shortcuts.
- **File naming:** base page `wireframes/<name>.html`, one page per state
  `wireframes/<name>-<state>.html`, lowercase latin (`listings.html`,
  `listings-empty.html`, `listings-error.html`, `listings-loading.html`).
- **States:** every state is its own page. The base page is the success state; the rest are
  `-empty` / `-error` / `-loading`. Same structure, different content.
- **Deferred:** colour, type, shadows, icons, finished UI — later phases.

**Styling lives in one file: `wireframes/wireframes.css`.** Write it in this step, alongside
the conventions — the neutral grey scale, the page/device frame, the navigator panel, the grey
placeholders, the `.wf-*` classes. Nothing else: no colour, no brand, no type choices. **Every
screen and state page links it**, and no wireframe carries a `<style>` block or a `style=`
attribute — inline styles are what phase 6 audits for, and a screen that styles itself cannot
be redressed from the kit later. A rule that governs appearance is fixed here and propagates by
itself; a rule patched on one screen is drift.

This file is workbench scaffolding, not product code: `/dsf:build`'s extraction explicitly
leaves the `.wf-*` classes and the navigator panel styling out of the kit
(`.design/prompts/extract.md`, step 5), so it never has to be untangled later.

Save and stop there. Do not draw screens in this step.

## Step 3 — The sample screen

Build one screen — the one the main persona starts the main job from — in its base state.
It sets the bar for everything else: level of detail, how zones are labelled, copy quality.

- semantic HTML per the conventions;
- links `wireframes/wireframes.css` and holds no `<style>` block and no `style=` attribute of
  its own — a style the sample needs goes into that file first;
- label each zone and each zone's primary action;
- real domain copy, concrete values, not placeholders;
- the flow step this screen closes is visible on the page;
- grey, no colour, type, icons or shadows;
- name from `_screens.md`; invent no zone that is not implied by `ia/sitemap.md`.

Save as `wireframes/<main-screen>.html` — this is the success state.

## Step 4 — Tree navigator panel

Add a navigator panel to the sample screen, identical on every wireframe page afterwards:

- left of the screen mock, same markup and position everywhere;
- a tree: section → screen → its states, indented so nesting is visible;
- every node is a link to its own page; the current page is marked;
- structure comes from `_screens.md` and `ia/sitemap.md` — invent nothing;
- grey, like the rest of the wireframe;
- at the very top of the panel, one quiet service link: `← Pipeline`, pointing to
  `../index.html`. It bridges the product world back to the process home page. It is part
  of the navigator (a workbench tool), not of the product's own navigation — `/dsf:handoff`
  strips it from the release build.

Every screen created from now on gets the same panel, so the whole structure is reachable
from any page.

## Step 5 — The four states of the sample screen

Cheapest place to work states out is while there is one screen. Build the state pages from
the base page:

- `<name>-empty.html` — nothing found, with a visible exit;
- `<name>-error.html` — load failure, with a retry exit;
- `<name>-loading.html` — grey placeholders where the content will be.

Rules: same structure and zones as the base page, only content changes. Empty and error
carry a visible exit action — no dead ends — and those exits are checked against
`ia/flows.md`. Real state copy. At the top of each page, links to the other states of the
same screen so they open side by side. No colour, no decoration.

> **HUMAN GATE — sample sign-off.** Present the sample screen and its state pages and stop.
> The human opens them in a browser before anything is rolled out. Do not fan out to save time.
> Append their answer to `.design/decisions.md` (constitution rule 7 — every gate leaves a trace) — the
> approved sample is the contract every other screen is built against.

## Step 6 — The rest of the main flow

With the sample approved, build the remaining screens of the main-flow table — one file per
screen, same pattern:

- name from `ia/sitemap.md`, annotated with its job from `people/jtbd.md`;
- the same set of state pages: base + separate `-empty` / `-error` / `-loading`;
- close exactly the states marked for that screen in `_screens.md` — no page for a state
  the table does not mark, and no invented states;
- real domain copy;
- same navigator panel.

Stay on the table. Grey, no external libraries, no gratuitous JS.

## Step 7 — Link along the flows

Separate screens exist; now the path must be walkable by clicking in a browser.

- make each screen's primary action a real `<a href>` to the next screen in the flow;
- link the state transitions too: loading → success, error → retry, empty → filled;
- take every fork **both ways**, not only the happy path (enough trust? no → profile and
  back, yes → next step; answered? accept → conversation, decline → error);
- every state has an exit: no dead ends.

Link only along routes present in `ia/flows.md`, and only to screens and states that
actually exist in `wireframes/`. Keep the grey look and the semantics. Update files in
place — never create a copy of a screen.

## Step 8 — Roll out the whole sitemap (fan-out)

The main flow is the proven pattern. Now cover **every remaining page of the sitemap** —
all other flows — with parallel subagents: one agent per screen (or per small flow). This is
cheap precisely because the contract and the sample already exist; agents clone the pattern.

Give every subagent, in its task:
- which screens and states to build (rows from `ia/sitemap.md` and `wireframes/_screens.md`);
- what to read: `wireframes/_conventions.md` (the contract), `wireframes/wireframes.css` (the
  only stylesheet) and the sample screen (the reference);
- what to produce: base page + state pages, the same navigator panel, links along its own
  flow, real domain copy, grey fidelity — exactly as the conventions say;
- what to return: findings, not opinions — the list of files created and anything the
  conventions did not cover.

Leave no sitemap screen without a wireframe. When all agents finish, verify the set is
coherent — zones, naming, navigation — and report mismatches as a table.

Then build the navigator index page **`wireframes/index.html`** — the entrance to the whole
set, and the link `index.html` points at:

- the same tree as the panel on every screen: section → screen → its states, indented,
  every node a real link to its own page;
- one line per screen: the job it closes, quoted from `people/jtbd.md`;
- the states a screen does **not** have are shown as struck-through or greyed text, not
  omitted — the table in `_screens.md` decides which;
- generated from `wireframes/_screens.md` and `ia/sitemap.md`, never hand-listed, so it
  cannot drift from the panel;
- same grey fidelity as the wireframes, from the same `wireframes/wireframes.css` — this page
  is structure, not design.

Every screen file must be reachable from this page in one click.

## Step 9 — Critique → prioritize → fix

Review every `wireframes/*.html` against `_conventions.md`, `ia/sitemap.md` and
`ia/flows.md`. Produce a table `screen · what is wrong · how to fix` covering:

- **visuals leaked** — colour, type, shadows or icons appeared somewhere;
- **a screen styles itself** — a `<style>` block or a `style=` attribute instead of a class in
  `wireframes/wireframes.css`, or a page that does not link that file at all;
- **placeholders** — lorem ipsum or "Heading 1" instead of real domain copy;
- **missing states** — not every state marked in `_screens.md` has a page;
- **dead end** — a state with no exit (empty without a way to widen, error without retry);
- **zone without a primary action** — unclear what to do next;
- **screen not on the map** — absent from `ia/sitemap.md` and `ia/flows.md`;
- **unreachable screen** — a page that `wireframes/index.html` and the panel do not link to.

> **HUMAN GATE — defect prioritization.** Output the table only. Change nothing yet. The
> human reviews it and orders the work.

Then walk the ordered table and fix the files — dead ends and missing states first. Record
what was wrong and what was fixed in `wireframes/_critique.md`.

## Step 10 — Close the phase

1. Run the phase checklist in `.design/checklists/phase-4-wireframes.md` and report each criterion
   as pass / fail with the file that proves it. Fix fails before continuing.
2. Update `CLAUDE.md` — append the Wireframes context block: where screens live, which is
   the main screen, the naming rule, that the tree navigator reaches every screen and state,
   and that later phases edit these same files rather than redrawing them.
3. Update `README.md` — a Wireframes section: two or three sentences and a link to
   `wireframes/index.html`.
4. Update `index.html` — edit **only** the `<script id="pipeline-data">` JSON block:
   phase 4 status, its artifact entries, `wireframes/index.html` as the live navigator
   link, and the `steps` object. Leave the `context` object as it is; this phase fills none of its keys. Do not
   touch the markup, CSS or scripts around the block.
5. Commit. Push according to `.design/memory/toolbox.md` (never push if the toolbox records
   push as manual).

> **HUMAN GATE — phase sign-off.** After the checklist passes, ask the human to confirm the
> phase is done.

Do not create a git tag. Tell the human to run `/dsf:check` to close the phase — it verifies
the checklist against the files and creates the phase tag `phase-4-wireframes`. The next
commands after that are `/dsf:voice` and `/dsf:concept`.

---

## Recovery prompts

Hand these to the human when the agent drifts — each is a ready prompt to paste back.

```
You started drawing the look — colour, type, shadows or icons. Return the screen to grey
per wireframes/_conventions.md: structure, hierarchy and zones only, no decisions about
appearance.
```

```
There are placeholders in the wireframe — lorem ipsum or "Heading 1". Replace them with
real copy from the product's domain: real names, real values, real units, real dates.
```

```
This screen exists in one scenario only. Build the remaining states as separate pages
<screen>-empty.html / -error.html / -loading.html — exactly the ones marked for it in
wireframes/_screens.md, no more.
```

```
This screen is not in ia/sitemap.md or ia/flows.md. Reconcile it with the map: either bind
it to an existing place in a flow and a job, or remove it. We build only what is on the map.
```

```
This state has no primary action — it is unclear what to do next. Add a visible exit:
empty → widen the query, error → retry, loading → transition to success. No dead ends.
```

```
You built the states as one file with a switcher. Split them into separate pages
<screen>-empty.html / -error.html / -loading.html per wireframes/_conventions.md, and keep
the base page as the success state.
```

```
You linked only the happy path. Take every fork in ia/flows.md both ways and link the state
transitions too: loading → success, error → retry, empty → filled.
```

```
wireframes/index.html is missing or does not match the panel. Generate it from
wireframes/_screens.md and ia/sitemap.md: the same tree as the navigator panel, every screen
and state a link, the job printed next to each screen, states the table does not mark shown
as unavailable rather than omitted.
```
