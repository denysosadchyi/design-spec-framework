---
description: "Phase 10 — hand the product over as onboarding, not an archive: fresh-eyes gap audit, behavior spec that references code, layer map, a11y checklist, README as a route, release, fresh-subagent test, and the graduation one-shot."
---

# /dsf:handoff — Handoff

Handoff is **onboarding a new developer into the repo**, not an archive for memory. The
common failure is "it's all done, here's the repository": the new developer opens it and
drowns, because every answer (where the entry point is, how to assemble a screen, why two
themes) lived in a chat that no longer exists.

One success criterion: **a person who was never here boots the product and adds a feature
with no verbal explanation.**

Two iron rules for this phase:

- **Document what exists, introduce nothing new.** The frequent failure is finishing
  features under the cover of documentation, turning handoff into another untested
  development round. A hole found here becomes a line in `handoff/onboarding-gaps.md`, not a
  reason to build.
- **Reference, never duplicate.** Instead of "button: background `#2E6E5C`, radius 12px" —
  "button: component `button`, state `disabled` while the form is invalid; text from
  `voice/microcopy.md`, key `request.form.submit`" (the key scheme is
  `<screen>.<zone>.<element>`, set in `/dsf:voice`). A duplicate is stale the moment someone fixes the
  button; a reference stays true. The showcase shows appearance; the spec documents
  **behavior** — the thing no screenshot transfers.

---

## Prerequisites

| Required | Produced by | If missing |
|---|---|---|
| Full design system: `tokens.css`, `components/`, `patterns/`, `docs/`, `index.css` | `/dsf:build`, `/dsf:system` | run those first |
| Adaptive layer (phase 8) + motion layer (phase 9) | `/dsf:responsive`, `/dsf:motion` | run those first, and close phase 9 with `/dsf:check 9` |
| `ia/flows.md`, `wireframes/*.html` with state pages | `/dsf:ia`, `/dsf:wireframes` | run those first |
| `voice/voice.md`, `voice/microcopy.md` | `/dsf:voice` | run `/dsf:voice` first |
| `people/jtbd.md` (for the graduation one-shot) | `/dsf:users` | run `/dsf:users` first |
| `DESIGN.md`, `design-system/backlog.md` | `/dsf:build`, `/dsf:system` | run those first |

**Read before acting:** `.design/memory/constitution.md` (rule 3 — data or `[?]`; rule 6 —
new enters the system first; rule 8 — living docs) and `.design/memory/toolbox.md`. Hosting
row decides where the release is deployed: GitHub Pages if active, the recorded fallback
otherwise — a local static server plus a note in `handoff/README.md` saying so.

Also read `.design/progress/phase-10.md` — this command's own ledger. Before step 1, report
what you will skip, redo or resume based on it, then proceed only after stating that.

---

## Steps

After completing each numbered step and each HUMAN GATE, append the ledger line to
`.design/progress/phase-10.md` and update the `steps` object in the pipeline-data block
(current → done).

### 1 — Fresh-eyes audit

Walk the repo **as a new developer who has never seen this project**, from `README.md` down
into the code, and write `handoff/onboarding-gaps.md` — start from
`.design/templates/onboarding-gaps.md` and keep its sections: everything that is unclear without a
verbal explanation — where the entry point is, how to assemble a screen, where tokens come
from, what a given folder means.

Ask product questions, not syntax questions: not "what is a CSS variable", but "why two
themes, which is primary", "how do I add a new screen", "where is the line between a
component and a pattern".

**Fix nothing here.** This list of confusions *is* the order form for the whole handoff —
every item becomes something the documentation must close. Everything below is driven by it.

> **HUMAN GATE — gap list.** Present the list. The human confirms it before documentation
> starts, and can add gaps they know about. Append their answer to `.design/decisions.md`
> (constitution rule 7 — every gate leaves a trace).

### 2 — Behavior spec

Read `onboarding-gaps.md`, `ia/flows.md` and the `wireframes/` state pages. Create
`handoff/spec/` — one file per key flow, containing: steps, states (empty, loading, success,
error), edge cases, form validation rules.

Describe what static screens cannot show: when the error appears, what counts as valid, what
happens on an empty list, what happens when the request never returns.

Every appearance detail is a **reference**: the design-system component and its state, the
token, the `microcopy.md` key. If you catch yourself writing a hex value, a pixel number or
a literal UI string into the spec, replace it with a pointer.

### 3 — Layer map

Write `handoff/map.md` — start from `.design/templates/handoff-map.md` and keep its sections
and columns: one row is one chain — **screen → component → token → microcopy key**. For every
key screen: which system components stand on it, which tokens they read, where their copy
comes from (the `<screen>.<zone>.<element>` key, never the string itself).

Put `voice/voice.md` and `voice/microcopy.md` explicitly into the handoff package. A
developer needs to know not only which words exist, but how the product sounds when the
words run out. That is part of the spec, not a reference on the side.

The map answers one question: **"if I change this token, what moves?"** Verify it by picking
two tokens and tracing them through the map to the screens; if the answer is not readable
from the table, the map is not done.

### 4 — A11y checklist

Write `handoff/a11y.md` — start from `.design/templates/a11y.md` and keep its sections —
consolidating what phases 6–9 already built. Introduce nothing new:

- `focus-visible` on every interactive component, in **both themes** (the keyboard walk-through
  from `/dsf:system`);
- contrast of every foreground/background pair at WCAG AA, in both themes;
- breakpoints in `rem`, so they respond to the user's font size (the doubled-root-size check
  from `/dsf:responsive` in phase 8, with the widths recorded in `DESIGN.md`);
- `prefers-reduced-motion` honored globally.

For each item: **where it is in the code** (file and selector) and **how to verify it**
(keyboard tab-through, contrast checker, doubling the root font size, turning the system
setting on) — the same verification that was actually run in the phase that built it.

This is not a work plan. It is proof that accessibility is already built into the system,
and a map of where. If a hole turns up in the consolidation, do **not** build a feature
here — record it as debt in `handoff/onboarding-gaps.md`.

### 5 — Final README

Rewrite `README.md` as a living index of the whole product, from `research/` to `handoff/`.

Structure: what this product is (one sentence from `concept/concept.md`), how to run it,
where the design system and the showcase are, where the behavior spec is, where the map is,
where the a11y checklist is.

Every section is two or three sentences **and a link** — not a retelling of the file's
contents. A README leads; it does not repeat. After reading it a person knows where to go
for each question. A route, not a museum.

### 6 — Package the release

- Strip workbench chrome from the shipped screens: remove the `← Pipeline` service link from
  every wireframe navigator panel (it bridges to the process home page and does not belong in
  the release; git keeps it for the working copy).
- Deploy the product and the showcase (GitHub Pages, or the toolbox's fallback).
- Collect three links in `handoff/README.md`: repository, live showcase, live product.
- Render **`handoff/index.html`** — the human-facing onboarding route, linking the spec, map,
  a11y checklist and the three release links. This is the page `pipeline.html` points at for
  phase 10; nothing else in the repo is called the handoff page.
- **Create no tag here.** The release tag `v1.0` and the phase tag `phase-10-handoff` are both
  created by `/dsf:check` after the human signs the phase off.
- Add a **"Handoff"** section to `CLAUDE.md` describing where everything lives, for the next
  session.

Then prove it: from a clean clone, the repo comes up with no verbal explanation. That is the
readiness criterion for the package, not your confidence in it.

### 7 — Fresh-subagent test

Launch a subagent that has not seen this session and does not know the product. Give it a
**single source**: the `handoff/` folder and `README.md`. Task: build a small new feature
(for example a "report this item" screen) from the documentation alone, asking nothing.

Everything the subagent stumbled on, or was forced to invent, is a hole in the handoff.
Write those holes down and **close them with documentation, not with a new product
feature**. Then re-run the test with a fresh subagent.

When a context-free subagent walks the feature through without stumbling, the handoff is
done. This mirrors the system test of `/dsf:system`, where a new screen was assembled
from the system alone.

> **HUMAN GATE — handoff sign-off.** Present the subagent's stumble list and what you closed
> in documentation. The human confirms the handoff is ready. Append their answer to
> `.design/decisions.md` (constitution rule 7 — every gate leaves a trace).

### ★ Graduation one-shot

Now that every layer is in the system, assemble a new feature **in one pass through the
whole stack** — the way it will be done in real work once the training wheels are off.

Take a job from `people/jtbd.md` that the product does not cover yet, and drive it through
every layer at once, in this order:

1. **Language** — `voice/voice.md` and `voice/microcopy.md` produce the copy first, keyed
   `<screen>.<zone>.<element>` like every other string;
2. **Components and patterns** — assembled from the design system only; a gap goes to
   `design-system/backlog.md`, it is not hand-drawn around;
3. **Tokens** — color, geometry, breakpoints, motion;
4. **Output** — a finished screen with all states, adaptivity at three widths, and
   micro-interactions.

Put the result in `design-system/examples/one-shot/` as `index.html` — beside the new-screen
example from `/dsf:system`, because both are proofs about the same system — and write a short
retrospective next to it: which
layers held, where the system was missing something, what the single pass revealed that the
layer-by-layer path did not.

This is the proof that the layers were a training rig, not a dogma: control each one
consciously, and at the end you do all of them in one move.

---

## Phase checklist

Verify against `.design/checklists/phase-10-handoff.md` (or run `/dsf:check 10`):

- [ ] `handoff/onboarding-gaps.md` — a newcomer's list of confusions; product questions, not syntax
- [ ] `handoff/spec/` — flows, states, edge cases, validation; **references components and `microcopy` keys, duplicates no code**
- [ ] `handoff/map.md` — screen → component → token → microcopy key; `voice/voice.md` and `voice/microcopy.md` in the package
- [ ] `handoff/a11y.md` — focus, contrast, `rem` breakpoints, reduced-motion consolidated; code location and verification per item; nothing new introduced
- [ ] `README.md` is a living index — two or three sentences and a link per section, no retelling
- [ ] Release: product and showcase deployed, three links in `handoff/README.md`
- [ ] A clean clone comes up with no verbal explanation
- [ ] Fresh-subagent test passed; every stumble closed with documentation, not a feature
- [ ] `design-system/examples/one-shot/` — a new feature assembled in one pass, with states, adaptivity and micro-interactions, plus a retrospective
- [ ] `CLAUDE.md` has a "Handoff" section; `handoff/index.html` linked from `pipeline.html`

## Close the phase

1. `CLAUDE.md` — the **Handoff** context block: package contents, live URLs, the standing
   rule that new work starts a new cycle and does not ride inside handoff.
2. `README.md` — already rewritten in step 5; verify every link resolves.
3. Update `pipeline.html` — edit **only** the `<script id="pipeline-data">` JSON block: all
   eleven phases resolved, the phase 10 artifact entries, `handoff/index.html` as a live link,
   the three release links in the fields the block provides for them, and the `steps`
   object. Leave the
   `context` object as it is; this phase fills none of its keys. Do not touch the markup,
   CSS or scripts around the block.
4. Commit. Push if the toolbox records a remote.

> **HUMAN GATE — release sign-off.** Checklist passes and the human confirms the release.

Do not create a git tag. Run `/dsf:check 10` to close the phase — it verifies the checklist
and creates both the phase tag `phase-10-handoff` and the release tag `v1.0`.

---

## Recovery prompts

Copy-paste when something went the usual wrong way.

**Handoff started building.**
```
Check whether anything in this phase added a new feature, state or component instead of
documenting an existing one. Revert it and record each case as debt in
handoff/onboarding-gaps.md.
```

**Documentation duplicates code.**
```
Walk handoff/ and replace every rewritten style or literal string with a reference: the
design-system component, the token, the voice/microcopy.md key. The document's truth must not
depend on whether someone edited the CSS.
```

**Untested package.**
```
Run the fresh-eyes test: give a context-free subagent only handoff/ and README.md and have it
build a small feature. Report every point where it stumbled or invented, before fixing
anything.
```

**Museum README.**
```
The README retells files instead of pointing at them. Cut every section to two or three
sentences and a link, and confirm that each question a newcomer has maps to exactly one
destination.
```

**Map that does not answer.**
```
Pick three tokens and trace, using handoff/map.md alone, every screen that changes if I edit
them. Where the trace breaks, the map is incomplete — fix the map.
```

**A11y hole found.**
```
Do not fix it here. Add it to handoff/onboarding-gaps.md as debt, with the code location and
how it was found, and note in handoff/a11y.md that the item is open.
```

**Clean-clone failure.**
```
Clone the repo into a fresh folder and bring it up using only README.md. List every step that
required knowledge not in the repo, then close those steps in the README.
```
