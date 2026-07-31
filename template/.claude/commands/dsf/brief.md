---
description: Phase 1 — interrogate the idea before anything is written, then commit the brief to CLAUDE.md and scaffold the repo.
---

# Phase 1 — Brief

The brief is the only artifact the whole pipeline reads on every later prompt. It is produced by **questioning, not by drafting**. You do not write a single file until the user has approved the brief in conversation.

## Prerequisites

- `.design/memory/toolbox.md` exists. If missing → tell the user to run `/dsf:init` first and stop.
- If `CLAUDE.md` already contains a brief, this is a revision: read it, ask what changed, and interrogate only the changed parts.

## Load context

Read `.design/memory/constitution.md` and `.design/memory/toolbox.md`. From `toolbox.md` note whether the **brainstorming** skill is active, and honor every fallback rule recorded there.

Also read `.design/progress/phase-1.md` — this command's own ledger. Before step 1, report what you will skip, redo or resume based on it, then proceed only after stating that.

## Steps

After completing each numbered step and each HUMAN GATE, append the ledger line to `.design/progress/phase-1.md` and update the `steps` object in the pipeline-data block (current → done).

### 1. Take the seed

The user's idea may arrive as one sentence or as `$ARGUMENTS`. Accept it as a seed, not as a brief. Do not expand it, do not embellish it, do not start a document.

### 2. Interrogate

**If the brainstorming skill is active** (`obra/superpowers`): invoke it now. Run it question-first and honor its approval step — nothing is written before the user approves.

**Otherwise use the built-in interrogation** in `.design/prompts/brief-interrogation.md` — read it and run it as written. Ask in small batches (3–5 questions), one area at a time, and feed each answer forward instead of restating it. Never answer a question on the user's behalf; if they say "you decide", record the answer as `[?]` plus your explicit hypothesis, and move on.

Cover five areas, and do not leave an area until it is answered concretely:

1. **Audience.** Who specifically, in what situation do they arrive, what are they doing today instead? Push back on demographics — you want behavior and circumstance. "Everyone" is not an answer.
2. **Problem.** What breaks in the current way? Whose problem is it — user's, business's, or both? What happens if nothing is built?
3. **Platform.** Mobile web, desktop web, app, mobile-first then adaptive? Which one is the primary and why. This decision constrains every phase after it, so make the user own it.
4. **Constraints.** Deadline, team, budget, legal or regional limits, existing brand, hard technical fences, anything explicitly out of scope.
5. **Success criteria.** How do you know in three months that this worked? Turn adjectives into observable signals. If a criterion cannot be observed, say so and ask for a replacement.

Also capture, briefly: product name, one-line pitch, and any anti-goals ("this is not X").

### 3. Play back the brief — HUMAN GATE

Present the assembled brief in chat as a short structured block: name, pitch, audience, problem, platform, constraints, success criteria, open questions marked `[?]`.

**HUMAN GATE — brief approval.** Stop. Do not create files, folders, or commits until the user approves or corrects. Corrections restart at step 2 for the affected area only. Once approved, append the answer to `.design/decisions.md` (constitution rule 7 — every gate leaves a trace) — this is the first entry in the project's decision log.

### 4. Write the living docs

Only after approval:

- `CLAUDE.md` — the brief as the top section, followed by the **Toolbox** section from phase 0 and an empty **Phase log** section that later phases append to. This file is agent context: dense, no marketing, no fluff.
- `README.md` — the human index: one-paragraph pitch, the repo map, a link to `pipeline.html`, and a "current phase" line.

Open questions stay visible in both as `[?]` with their hypothesis attached. Do not resolve them by guessing.

### 5. Scaffold the repo

Create the folder structure exactly as the framework defines it — no invented names, no reshuffling:

```
research/           research.md, research.html, screens/
people/             personas.md, jtbd.md, personas.html
ia/                 sitemap.md, flows.md, ia.html
wireframes/         _screens.md, _conventions.md, index.html, *.html
voice/              voice.md, microcopy.md, voice.html
concept/            references.md, concept.md, directions.html, concept.html
ui/                 inventory.md, tokens-audit.md, shell.html, kit.html
design-system/      tokens.css, components/, patterns/, docs/, examples/, index.css
visuals/            generated imagery + prompts
responsive/         width-audit.md, width-audit.html
animations/         motion-inventory.md, motion-inventory.html
handoff/            spec/, map.md, a11y.md, onboarding-gaps.md, index.html
```

Folders are created empty with `.gitkeep`. Do not pre-create the artifact files themselves — their absence is what `pipeline.html` reads as "not done yet".

### 6. Name the project in `pipeline.html`

`pipeline.html` ships with the placeholder `{{PRODUCT_NAME}}`. Replace **every** occurrence with the approved product name from step 3 — in the `<title>`, in the page heading, and in the `product` field of the `<script id="pipeline-data">` JSON block. After this step the placeholder must not appear anywhere in the file.

### 7. Run the phase checklist

Run `.design/checklists/phase-1-brief.md`. Report pass/fail per item. The hard items: every one of the five areas answered or explicitly `[?]`, platform decided, success criteria observable.

### 8. Update `pipeline.html`

Edit **only** the `<script id="pipeline-data">` JSON block: phase 1 status, its artifact entries and their links, phase 2 unlocked, and the `steps` object. Fill the `context` keys this phase owns — `product` (the approved name) and `oneLiner` (the one-sentence pitch); leave the other context keys as they are. Do not touch the markup, CSS or scripts around the block — the page renders itself from that JSON.

### 9. Commit

`feat: phase 1 — product brief and repo scaffolding`. Push **only** if `toolbox.md` says GitHub hosting is active.

### 10. Sign-off

Report the brief in three lines, list the open `[?]` items that phase 2 should try to close, and point the human back at their own project page: **open `pipeline.html` — it now carries the product name and shows phase 2 unlocked.** That page is the home of this project; every later phase adds links to it.

Then say: run `/dsf:check` to close the phase. It verifies the checklist against the files and creates the phase tag `phase-1-brief`. Do not create the tag yourself. The next command after that is `/dsf:research`.

## Recovery prompts

```
You started writing the brief before I approved it. Discard the draft, go back
to questions, and show me the brief in chat first.
```

```
That audience is demographics. Describe them by situation and current behavior:
where do they come from, what are they doing today instead?
```

```
This success criterion cannot be observed. Rewrite it as a signal someone could
actually check in three months, or ask me for a replacement.
```

```
You filled a gap with a plausible answer. Mark it [?], state the hypothesis
explicitly, and ask me the question.
```

```
The scaffolding invented folders. Match the framework structure exactly:
research/, people/, ia/, wireframes/, voice/, concept/, ui/, design-system/,
visuals/, responsive/, animations/, handoff/.
```

```
pipeline.html still contains {{PRODUCT_NAME}}. Replace every occurrence with the
approved product name — title, heading, and the product field of the
pipeline-data JSON block.
```
