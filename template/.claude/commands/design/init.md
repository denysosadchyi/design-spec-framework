---
description: Phase 0 — verify the toolbox, record every tool choice and its fallback, set up hosting, render pipeline.html, first commit.
---

# Phase 0 — Init

You are setting up a design-spec repo. Nothing about the product is discussed here — only the tools the pipeline will run on and the scaffolding of the dashboard. The user must never be asked to run a terminal command; you run everything.

## Prerequisites

- This repo was created from the design-spec-framework template: `.design/memory/constitution.md`, `.design/templates/`, `.design/checklists/` must exist. If they do not, stop and tell the user this command must run inside a repo created from the template.
- `git` available. If the folder is not a git repo, `git init` it yourself.
- If `.design/memory/toolbox.md` already exists, this is a re-run: read it, show the current state, and ask whether to revise choices or exit.

## Load context

Read `.design/memory/constitution.md` in full and obey it for the rest of this command — in particular **prompts, not commands**, **human gates**, and **living docs**.

## Steps

### 1. Detect what is already available

Without asking the user anything yet, check the environment for each toolbox entry and note detected / missing:

| Purpose | Recommended | How to detect | Fallback |
|---|---|---|---|
| Browser & screenshots | Playwright MCP | Playwright MCP tools present in this session | WebFetch-only research + screenshots the user supplies manually |
| Visual references | Refero MCP | Refero MCP tools present | Web search + competitor screenshots |
| Design quality laws | `impeccable` skill (`critique` / `audit` / `document` / `extract`) | skill listed as available | Built-in critique & documentation prompts in `.design/templates/` |
| Structured brief | `obra/superpowers` **brainstorming** skill | skill listed as available | Built-in question-first interrogation in `/design:brief` |
| Imagery | Gemini API image generation | image-gen script or `GEMINI_API_KEY` / `GOOGLE_API_KEY` reachable | Unsplash, picked by content theme |
| Icons | Solar icon set (one style, whole project) | — (a choice, not a detection) | Any single-style set, recorded in `DESIGN.md` |
| Hosting | GitHub + GitHub Pages | `gh auth status` succeeds | Any git host + local static server |

### 2. Propose the toolbox — HUMAN GATE

Present one table: purpose, recommended tool, detected yes/no, what changes in the pipeline if it is declined. Then ask the user, in a single question, which of the missing tools to install and which to skip.

**HUMAN GATE — toolbox.** Stop here. Do not install, do not write `toolbox.md`, do not proceed until the user answers.

A refusal is a legitimate answer and costs nothing later — every downstream command reads `toolbox.md` and switches to the fallback automatically. Never argue a tool a second time.

### 3. Install what was approved

Install only what the user approved, one at a time, reporting the outcome of each. If an install fails, do not retry silently: record the tool as **unavailable → fallback** and say so.

### 4. Write `.design/memory/toolbox.md`

One row per purpose:

```md
| Purpose | Chosen | Status | Fallback in force |
|---|---|---|---|
| Browser & screenshots | Playwright MCP | active | — |
| Visual references | — (declined) | fallback | web search + manual screenshots |
```

Below the table add a `## Rules for later phases` section stating explicitly, in words, what each fallback means operationally (e.g. "no browser: research screenshots are user-supplied; a screen with no image is marked `[no screenshot]`, never described from memory"). Later commands read this section, so it must be actionable, not decorative.

### 5. Hosting

If GitHub was approved: create the repo (ask the user for name and public/private — **HUMAN GATE**, since this can publish work), push, enable GitHub Pages from the default branch root, and record the Pages URL in `toolbox.md` and `README.md`.

If declined or unavailable: record the fallback — commits stay local, `pipeline.html` and every `*.html` artifact are viewed through a local static server that you start on request. Do not push anywhere.

### 6. Render the initial `pipeline.html`

Build it at the repo root from `.design/templates/pipeline.html`:

- 9 phases as a rail (0 init, 1 brief, 2 discover, 3 structure, 4 wireframes, 5 language, 6 build, 7 system, 8 adapt, 9 handoff) with per-phase gate criteria;
- under each phase, its artifact checklist with existence marks (`✓` / `—`); every HTML artifact is an `<a href>` even before it exists (dead link now, live later);
- status is **derived** at render time from artifact presence plus checklist results — never store status in a state file;
- the template version this project started from, at the foot of the page.

Right now everything except phase 0 is `locked`.

### 7. Run the phase checklist

Run `.design/checklists/phase-0-init.md` and report pass/fail per item. Fix what you can; anything you cannot fix goes to the user as an explicit blocker.

### 8. Living docs and commit

- `CLAUDE.md`: add a **Toolbox** section — one line per active tool and per fallback in force. This is the section every later command consults.
- `README.md`: add the repo index skeleton and, if hosting is live, the `pipeline.html` URL.
- Commit: `chore: phase 0 — toolbox and pipeline scaffolding`.
- Push **only** if `toolbox.md` says GitHub hosting is active.

### 9. Sign-off

Report: active tools, fallbacks in force, hosting URL or the local-server fallback, and the single next action — `/design:brief`.

Then suggest, and run on approval:

```
git tag phase-0-init
```

## Recovery prompts

Use these on yourself when this phase drifts; offer them to the user verbatim when they see the drift first.

```
You recorded a tool as available without evidence. Show the detection result
for each row of toolbox.md or mark it unavailable.
```

```
You skipped the fallback column. For every declined tool, write in words what
later phases must do instead.
```

```
You pushed without checking hosting. Read toolbox.md: if GitHub is not active,
commits stay local.
```

```
pipeline.html hard-codes a status. Derive every status from artifact presence
plus checklist results, and re-render.
```
