# design-spec-framework

Spec-Driven Development for product design. Clone the template, open it in Claude Code, and walk a product from a blank folder to a handoff-ready design system with `/dsf:*` commands — the way [spec-kit](https://github.com/github/spec-kit) does it for code, but for design.

No Figma required. The repo is the design file.

## Why this exists

Most product design work has three chronic problems, and none of them is about talent:

1. **Decisions evaporate.** Research lives in a Notion page nobody reopens, the reasoning behind a color lives in a Slack thread, tone of voice lives in the designer's head. Six months later nobody can say *why* the product looks and speaks the way it does — so every redesign starts from zero.
2. **The mockup is a dead end.** A Figma file is a *picture of* the product, not the product. At handoff it gets re-implemented from scratch, states and edge cases get lost in translation, and from that day on the design and the code drift apart forever.
3. **AI without discipline produces slop.** Ask a model for "a cozy design" and you get the same cream-and-terracotta page as everyone else, happy-path screens with no empty/error/loading states, invented user insights, and celebration emoji in system messages. The model is powerful; unguided, it defaults to average.

design-spec-framework attacks all three with one move: **the entire design process becomes versioned, reviewable artifacts in a git repo, produced and consumed by an AI agent under strict, written rules.**

## Goals

- **One source of truth that compounds.** Every phase reads the artifacts of the previous phases and adds a layer. The grey wireframe from phase 4 is the *same HTML file* that ships styled, tokenized, responsive and animated in phase 9. Nothing is redrawn; nothing is re-explained.
- **Design decisions with receipts.** Every persona claim cites research or is marked `[?]`. Every screen names the job it serves. Every color traces to a written attribute, every attribute to data or the designer's recorded taste. "Because it looks nice" is not a valid provenance.
- **The agent executes, the designer judges.** The framework automates production — research collection, screen assembly, parallel rollout, critique — but stops at every taste and scope decision. Direction choice, defect priorities, "keep it" — always human.
- **Handoff that needs no meeting.** The end state is a repo a new developer (or a fresh AI session) can pick up and extend without a single verbal explanation — verified by an actual fresh-context test.

## Classic process vs. design-spec-framework

| | Classic (Figma-centric) | design-spec-framework |
|---|---|---|
| **Source of truth** | Scattered: Figma file + docs + chats + heads | One git repo; every decision is a file |
| **Research → design link** | Research deck is read once, then decorates a drive | Every downstream artifact must cite it; unsourced claims are flagged `[?]` |
| **Wireframes** | Static frames, redrawn at every fidelity jump | Semantic HTML that *is* the first layer of the product code |
| **States (empty / error / loading)** | Drawn for the happy path, "we'll add errors later" | A screen without its states fails the phase checklist — enforced from wireframes on |
| **Copy** | Placeholder text, rewritten ad hoc per screen | `voice.md` contract + `microcopy.md` as the single copy source of truth |
| **Visual language** | Moodboard → one hero mockup → improvised rollout | Recorded taste + data-sourced attributes → 3 live directions → language proven on two contrasting screens before rollout |
| **Consistency** | Manual vigilance; drifts with every screen | Kit → two-level tokens → system; a value changes in one place and propagates everywhere |
| **Dark theme / rebrand** | A repaint project | A semantic-token override; the architecture is stress-tested for it |
| **Responsive** | Separate desktop mockups | Two behavior-based breakpoints as tokens; components adapt, screens don't know about widths |
| **Handoff** | Redlines, meetings, "ask the designer" | Behavior spec + token map + a11y checklist, verified by a context-free agent building a feature from docs alone |
| **Design–code drift** | Guaranteed: two artifacts, two truths | Impossible by construction: there is only one artifact |
| **Progress visibility** | "It's in progress" | `pipeline.html` — a live dashboard of every phase, artifact and gate |

## How a designer works in Claude Code

You never touch a terminal command. You talk, the agent does.

```
/dsf:status          → "Phase 3 done. Next: /dsf:wireframes."
/dsf:wireframes      → agent reads sitemap + flows, proposes the screen×state
                          table, builds the sample screen, stops.
you: review in browser  → "the filter block goes above the list"
agent                   → fixes the sample, fans out subagents to build every
                          screen of the sitemap to the same contract, runs
                          critique, returns ONE defect table.
you: prioritize         → "fix 1, 3, 5; ignore 2; 4 → backlog"
agent                   → fixes at the source, updates the living docs and the
                          dashboard, commits, suggests the phase tag.
```

The rhythm is the same in every phase: **sample → your review → parallel rollout → critique table → your priorities → fixes at the source.** The agent's freedom shrinks as the project matures: early on it drafts on empty pages; by phase 7 nothing may appear on a screen that doesn't exist in the design system first.

Three mechanisms keep the model honest:

- **The constitution** (`.design/memory/constitution.md`) — binding rules injected into every command: data or `[?]`, real copy instead of lorem ipsum, states are separate pages, the fix lives at the source, reflex palettes are rejected, human gates cannot be skipped.
- **Checklists** (`.design/checklists/`) — objective done-criteria per phase; `/dsf:check` verifies them against the actual files, not against the agent's claims.
- **Recovery prompts** — every command ships the exact counter-prompts for the model's known failure modes ("this principle is an adjective — rewrite it as a rule with an example, a counter-example and a source").

## What you win

- **Speed where it's cheap, control where it's dear.** Forty screens roll out in parallel in minutes; the three decisions that define the product (direction, priorities, scope) get your full attention.
- **A design that survives its designer.** Anyone — a developer, a teammate, you in a year, a fresh AI session — opens the repo and finds the *why* next to the *what*.
- **Real product from day one.** Clickable states, real copy, working navigation — stakeholders review the actual thing in a browser, not a simulation of it.
- **Change gets cheaper over time, not more expensive.** A rebrand is a token file; a tone shift is one contract edit rolled out by agents; a new screen is a composition of an existing system.
- **A designer's leverage on engineering-grade infrastructure.** Version control, diffs, tags, CI-ready static output, deploys — for free, because the design *is* a repo.

## Quick start

1. Copy the [`template/`](template/) folder into a new repo (or use this repo as a GitHub template).
2. Open it in Claude Code.
3. Run `/dsf:init` — it sets up the toolbox (with fallbacks for every tool), git and the dashboard.
4. Run `/dsf:brief` and follow the pipeline. `/dsf:status` always tells you where you are.

## The pipeline

| Phase | Command(s) | Output |
|---|---|---|
| 0 Init | `/dsf:init` | toolbox, repo, `pipeline.html` dashboard |
| 1 Brief | `/dsf:brief` | interrogated brief in `CLAUDE.md`, folder scaffold |
| 2 Discover | `/dsf:research` · `/dsf:users` | competitor matrix, benchmark, patterns · personas, JTBD |
| 3 Structure | `/dsf:ia` | entities, job-driven sitemap, Mermaid flows, coverage matrix |
| 4 Wireframes | `/dsf:wireframes` | grey semantic HTML, every screen in every state, linked by flow |
| 5 Language | `/dsf:voice` · `/dsf:concept` | voice contract + microcopy source of truth · visual language proven on two screens |
| 6 Build | `/dsf:build` | `DESIGN.md`, two-level tokens, components, kit showcase, all screens assembled |
| 7 System | `/dsf:system` | `design-system/` package, live docs, states in both themes, patterns |
| 8 Adapt | `/dsf:responsive` · `/dsf:motion` | behavior-based breakpoints, split-view · motion tokens, reduced-motion |
| 9 Handoff | `/dsf:handoff` | behavior spec, token map, a11y checklist, release, one-shot graduation |

Cross-cutting: `/dsf:status` (where am I), `/dsf:critique` (defect table → human gate → fix at the source), `/dsf:check` (verify phase done-criteria).

## How it works

- **[FRAMEWORK.md](FRAMEWORK.md)** — the full framework description.
- **`template/.design/memory/constitution.md`** — the engine rules every command obeys.
- **`template/.design/memory/toolbox.md`** — recommended tools (Playwright MCP, Refero MCP, impeccable, brainstorming skill, image generation) with a fallback for each; nothing is a hard dependency.
- **`template/.design/checklists/`** — objective done-criteria per phase.
- **`template/pipeline.html`** — a self-contained dashboard of all phases and artifacts, regenerated by every command.

The framework automates execution, not judgment: direction choices, defect priorities and "keep it" decisions always stop and wait for the designer.
