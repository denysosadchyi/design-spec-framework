---
description: Phase 1 — interrogate the idea before anything is written, then commit the brief to CLAUDE.md and scaffold the repo.
---

# Phase 1 — Brief

The brief is the only artifact the whole pipeline reads on every later prompt. It is produced by **questioning, not by drafting**. You do not write a single file until the user has approved the brief in conversation.

## Prerequisites

- `.design/memory/toolbox.md` exists. If missing → tell the user to run `/design:init` first and stop.
- If `CLAUDE.md` already contains a brief, this is a revision: read it, ask what changed, and interrogate only the changed parts.

## Load context

Read `.design/memory/constitution.md` and `.design/memory/toolbox.md`. From `toolbox.md` note whether the **brainstorming** skill is active, and honor every fallback rule recorded there.

## Steps

### 1. Take the seed

The user's idea may arrive as one sentence or as `$ARGUMENTS`. Accept it as a seed, not as a brief. Do not expand it, do not embellish it, do not start a document.

### 2. Interrogate

**If the brainstorming skill is active** (`obra/superpowers`): invoke it now. Run it question-first and honor its approval step — nothing is written before the user approves.

**Otherwise use the built-in interrogation.** Ask in small batches (3–5 questions), one area at a time, and feed each answer forward instead of restating it. Never answer a question on the user's behalf; if they say "you decide", record the answer as `[?]` plus your explicit hypothesis, and move on.

Cover five areas, and do not leave an area until it is answered concretely:

1. **Audience.** Who specifically, in what situation do they arrive, what are they doing today instead? Push back on demographics — you want behavior and circumstance. "Everyone" is not an answer.
2. **Problem.** What breaks in the current way? Whose problem is it — user's, business's, or both? What happens if nothing is built?
3. **Platform.** Mobile web, desktop web, app, mobile-first then adaptive? Which one is the primary and why. This decision constrains every phase after it, so make the user own it.
4. **Constraints.** Deadline, team, budget, legal or regional limits, existing brand, hard technical fences, anything explicitly out of scope.
5. **Success criteria.** How do you know in three months that this worked? Turn adjectives into observable signals. If a criterion cannot be observed, say so and ask for a replacement.

Also capture, briefly: product name, one-line pitch, and any anti-goals ("this is not X").

### 3. Play back the brief — HUMAN GATE

Present the assembled brief in chat as a short structured block: name, pitch, audience, problem, platform, constraints, success criteria, open questions marked `[?]`.

**HUMAN GATE — brief approval.** Stop. Do not create files, folders, or commits until the user approves or corrects. Corrections restart at step 2 for the affected area only.

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
wireframes/         _screens.md, _conventions.md, *.html
voice/              voice.md, microcopy.md
concept/            references.md, concept.md, directions.html, concept.html
ui/                 inventory.md, shell.html, kit.html
design-system/      tokens.css, components/, patterns/, docs/, index.css
visuals/            generated imagery + prompts
handoff/            spec/, map.md, a11y.md, onboarding-gaps.md
```

Folders are created empty with `.gitkeep`. Do not pre-create the artifact files themselves — their absence is what `pipeline.html` reads as "not done yet".

### 6. Run the phase checklist

Run `.design/checklists/phase-1-brief.md`. Report pass/fail per item. The hard items: every one of the five areas answered or explicitly `[?]`, platform decided, success criteria observable.

### 7. Regenerate `pipeline.html`

Re-derive status from artifact presence plus checklist results. Phase 1 becomes `done`, phase 2 `unlocked`.

### 8. Commit

`feat: phase 1 — product brief and repo scaffolding`. Push **only** if `toolbox.md` says GitHub hosting is active.

### 9. Sign-off

Report the brief in three lines, list the open `[?]` items that phase 2 should try to close, and name the next command — `/design:research`.

Then suggest, and run on approval:

```
git tag phase-1-brief
```

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
visuals/, handoff/.
```
