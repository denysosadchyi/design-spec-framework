# Phase 2 — Discover · done criteria

Gate for `/design:research` + `/design:users`. Every item is verifiable by opening a file
in this repo. `/design:check` runs this list before sign-off.

## Research

- [ ] `research/research.md` covers competitors in three groups — direct, adjacent,
      aspirational — with at least five products named
- [ ] A comparison matrix exists: products as rows, compared dimensions as columns, cells
      filled from collected data rather than assumption
- [ ] One benchmark dimension central to this product is studied across categories:
      6–8 criteria, 4–5 reference products, each scored
- [ ] Five genuinely different UX patterns for the core interaction are described, one is
      chosen, and the choice is argued from this product's context
- [ ] Hypotheses to test later are listed and numbered
- [ ] `research/screens/` contains screenshots of the products discussed, referenced by
      filename from `research.md`
- [ ] Every fact and number carries a link, a screenshot path, or the words "unverified"
- [ ] `research/research.html` opens standalone in a browser and links its screenshots

## People

- [ ] `people/personas.md` holds 2–4 personas, behavior-based, not demographic sketches
- [ ] Exactly one persona is marked primary, with a stated reason
- [ ] Every persona block — context, jobs, pains, trust triggers, quote — points at a
      specific place in `research/research.md` or carries `[?]`
- [ ] `people/jtbd.md` holds one main job and 3–5 related jobs, all in
      "when / I want / so that" form, none of them named after a feature
- [ ] Emotional and social jobs are listed separately from functional ones
- [ ] Each job records where it came from
- [ ] A jobs × personas × features matrix exists, with a column for whether competitors
      already cover the job
- [ ] The matrix ends in a conclusion: three jobs form the MVP core, and features that
      serve nothing are named as cut candidates

## Honesty pass

- [ ] A confirmed / hypothesis / invented audit of the persona and job claims is recorded
- [ ] Claims that drive design decisions but rest on `[?]` are called out explicitly
- [ ] At least one gap is closed by targeted follow-up research, and the update is visible
      in `research/research.md`
- [ ] `[?]` marks survive into `people/personas.html` — they are visible, not tidied away

## Artifacts and docs

- [ ] `people/personas.html` opens standalone in a browser
- [ ] `CLAUDE.md` → **People** block names the primary persona and the main job
- [ ] `README.md` → Research and People sections link to the HTML pages
- [ ] `pipeline.html` regenerated; phase committed and tagged `phase-2-discover`
