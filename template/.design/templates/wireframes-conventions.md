<!-- filled by /dsf:wireframes — start from this skeleton, do not restructure it -->

# Wireframe conventions

The written contract. Every fan-out subagent reads this file before touching a screen, and
later phases read it too — `/dsf:critique` checks screens against it, and a convention that
screens must follow is fixed **here**, then propagated, never patched on one screen.

Written **before any screen exists**. Do not draw while filling this in.

---

## Fidelity

- Structure, hierarchy and zones only. **Grey.**
- No colour, type choices, brand, shadows, icons or imagery.
- Deferred to later phases: colour, type, shadows, icons, finished UI.

## Markup

- Semantic HTML: `header`, `nav`, `main`, `section`, `article`, `form`, `button`.
- Real elements for controls — a button is a `<button>`, a link is an `<a href>`. No `div`
  soup, no click handlers standing in for controls.
- One `h1` per page, heading levels descending without skips.
- Every form control has a `<label>` associated by `for`/`id`; every informative image has
  `alt`; decorative images carry `alt=""`.

## Copy

- **Real copy from the product's domain.** Real names, real values, real units, real dates.
- Lorem ipsum, "Heading 1" and "Lorem" placeholders are defects, not shortcuts.
- Copy written here is rewritten against `voice/voice.md` in phase 5 — structure stays, words
  change.

## File naming

- Base page: `wireframes/<name>.html` — **the base page is the success state**.
- State pages: `wireframes/<name>-<state>.html` — `-empty`, `-error`, `-loading`.
- Lowercase latin only, hyphen-separated. The name matches `ia/sitemap.md` exactly.

## States

- **Every state is its own page.** Never one file with a switcher.
- Same structure and zones as the base page; only the content changes.
- Exactly the states marked for that screen in `wireframes/_screens.md` — no more, no invented
  ones.
- At the top of each state page, links to the other states of the same screen, so they open
  side by side.

Per-state content rules:

| State | What triggers it | What it must show | The way out |
|---|---|---|---|
| Empty | `[?]` | why it is empty | `[?]` — a visible action |
| Error | `[?]` | what happened | `[?]` — retry or an alternative |
| Loading | `[?]` | grey placeholders where the content will be | transition to the base page |

## Navigator panel

Identical on every wireframe page, from the sample onward.

<!-- "location" — a concrete position and source order a subagent can reproduce without asking:
     which side, what width, and where it sits relative to `<main>`. "On the left" is not a
     convention. -->

- **Location:** `[?]` — same markup and position on every page.
- **Contents:** a tree, section → screen → its states, indented so nesting is visible.
- Every node is a link to its own page; the current page is marked.
- Structure comes from `wireframes/_screens.md` and `ia/sitemap.md` — invent nothing.
- Grey, like the rest of the wireframe.
- **Top of the panel:** one service link `← Pipeline` to `../pipeline.html` — the bridge back
  to the process home page. It belongs to the navigator, not to the product's navigation;
  `/dsf:handoff` strips it from the release build.

## Linking

- Each screen's primary action is a real `<a href>` to the next screen in the flow.
- State transitions are linked too: loading → success, error → retry, empty → filled.
- **Every fork goes both ways**, not only the happy path.
- Every state has an exit. **No dead ends anywhere in the set.**
- Link only along routes present in `ia/flows.md`, and only to pages that actually exist.
- Files are updated in place — never create a copy of a screen.

## Zones

- Every zone is labelled, and every zone has one primary action.
- Invent no zone that `ia/sitemap.md` does not imply.

## Known deviations

<!-- documented exceptions to the rules above, each with its reason. An undocumented
     deviation is a defect for /dsf:critique to find. -->

| Rule | Where it is broken | Why it is allowed |
|---|---|---|
| `[?]` | `[?]` | `[?]` |
