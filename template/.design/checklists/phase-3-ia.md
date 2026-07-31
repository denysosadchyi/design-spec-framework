# Phase 3 — Structure · done criteria

Gate for `/dsf:ia`. Every item is verifiable by opening a file in this repo.
`/dsf:check` runs this list before sign-off.

## Entities and sitemap

- [ ] `ia/sitemap.md` → **Entities** lists the product's main objects, each tied to a job
      from `people/jtbd.md`; objects with no job sit in a separate "questionable" section
- [ ] `ia/sitemap.md` → **Screens** derives the screen hierarchy from the product's own
      jobs, not from a competitor's menu
- [ ] Every screen is annotated with the job it serves; screens with none are marked
      `[ORPHAN]`
- [ ] Screens and states are not confused: `empty`, `error` and `loading` are recorded as
      states of a screen, never as separate screens

## Navigation

- [ ] `ia/sitemap.md` → **Navigation** defines global navigation with 3–5 items, each
      justified by the job it serves
- [ ] Tap depth from first screen to the main job is counted for the primary persona
- [ ] Main job is reachable within three taps, or the extra depth is explicitly argued as
      a stated trade-off

## Flows

- [ ] `ia/flows.md` contains the main-job flow in Mermaid: screen steps, decision diamonds,
      the `empty`, `error` and `loading` states, and both endings — success and dead end
- [ ] 2–3 key related-job flows are also drawn in Mermaid
- [ ] Every screen node in every flow exists in `ia/sitemap.md`; screens discovered while
      drawing were added back to the sitemap with their job
- [ ] Mermaid syntax is valid — diagrams render as diagrams, not as raw code blocks
- [ ] At least one decision diamond has a "no" branch that leads somewhere real (empty
      state or a named dead end), not only happy paths

## Traceability and critique

- [ ] `ia/sitemap.md` → **Traceability** holds a coverage matrix: jobs as rows, screens as
      columns
- [ ] Orphan screens and orphan jobs are listed explicitly
- [ ] Each orphan has a decision: remove the screen, add a screen, attach to an existing
      one, or defer to backlog
- [ ] A critique pass covering four defect classes is recorded — dead ends, missing states,
      excess depth, orphans — checked against the existing matrix, not a new one
- [ ] Dead ends and missing states are fixed, and the fix is visible in the flows

## Artifacts and docs

- [ ] `ia/ia.html` opens standalone in a browser with the screen tree, live-rendered
      Mermaid diagrams and the coverage matrix visible
- [ ] `CLAUDE.md` → **Structure** block records the main flow and the navigation model
- [ ] `README.md` → Structure section links to `ia/ia.html`
- [ ] `pipeline.html` regenerated; phase committed and tagged `phase-3-ia`
