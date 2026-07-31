# design-spec-framework — Spec-Driven Development for Product Design

**One-line pitch:** clone a template repo, run `/design:*` commands in Claude Code, and walk a product from a blank folder to a handoff-ready design system — the way spec-kit does it for code, but for design.

A designer never touches a terminal command: every action is a prompt, the agent does the work. The repo itself is the design file. Figma is never required.

---

## 1. Core idea

Design work is driven by **specs that live in the repo**, not by conversations that evaporate. Every phase:

1. reads the artifacts of previous phases (never re-asks what is already written),
2. produces a **Markdown artifact for the agent** and an **HTML artifact for humans**,
3. ends with a critique cycle and a human gate,
4. updates the living docs (`CLAUDE.md`, `README.md`, `pipeline.html`) and commits.

The product grows as one set of files: the grey wireframe of phase 4 is the *same file* that ships styled, tokenized, responsive and animated in phase 9. Nothing is redrawn, everything is layered.

---

## 2. The engine (constitution)

These rules live in `.design/memory/constitution.md` and are injected into every command. They are the distilled discipline of the pipeline:

| Rule | Meaning |
|---|---|
| **Prompts, not commands** | Git, files, screenshots, deploys — all done by the agent on request. |
| **MD for the agent, HTML for humans** | Every phase ships both. HTML pages are viewable, showable, deployable. |
| **Data or `[?]`** | Every claim carries a source (link or screenshot). Unknown = `[?]` + explicit hypothesis, never a plausible guess. |
| **Sample → fan-out → critique → fix** | One reference artifact sets the bar; subagents roll it out in parallel; critique returns a defect table; the human prioritizes; the agent fixes. |
| **The fix lives at the source** | A change is made where the truth lives (component / token / system), then propagates to screens — never patched on one screen. The source escalates as the project matures: screen → kit → tokens → system. |
| **New enters the system first** | From the moment a system exists, nothing appears on a screen before it exists in the system. |
| **Human gates** | The agent stops at fixed decision points: direction choice, defect prioritization, phase sign-off. It never chooses taste for you. |
| **Living docs** | `CLAUDE.md` (agent context), `README.md` (human index), `pipeline.html` (status dashboard) are updated at the end of every phase. |

---

## 3. Repo anatomy (template)

```
my-product/                      ← created from the design-spec-framework template
├── .claude/
│   ├── commands/design/         ← all /design:* slash commands
│   └── settings.json            ← recommended permissions & MCP hints
├── .design/
│   ├── memory/constitution.md   ← the engine rules (above)
│   ├── memory/toolbox.md        ← which tools are installed vs. fallbacks
│   ├── templates/               ← skeletons for every artifact (research.md, voice.md …)
│   └── checklists/              ← done-criteria per phase (gate checks)
├── pipeline.html                ← live dashboard: phases, artifacts, links, status
├── CLAUDE.md                    ← brief + accumulated context (grows every phase)
├── README.md                    ← human index of the repo
│   — everything below is created by the phases —
├── research/                    ← research.md, research.html, screens/
├── people/                      ← personas.md, jtbd.md, personas.html
├── ia/                          ← sitemap.md, flows.md (Mermaid), ia.html
├── wireframes/                  ← _screens.md, _conventions.md, *.html (+ per-state pages)
├── voice/                       ← voice.md, microcopy.md
├── concept/                     ← references.md, concept.md, directions.html, concept.html
├── ui/                          ← inventory.md, shell.html, kit.html
├── design-system/               ← tokens.css, components/, patterns/, docs/ (showcase), index.css
├── visuals/                     ← generated imagery + prompts (reproducible style)
└── handoff/                     ← spec/, map.md, a11y.md, onboarding-gaps.md
```

---

## 4. The pipeline — 9 phases, 14 commands

The 12-lesson canon is compressed into a working pipeline. The main compression: **tokens-first build** — the kit is built directly on two-level tokens (primitive + semantic) instead of the teaching path "flat kit first, refactor to tokens later".

### Phase 0 — `/design:init`
Verifies the toolbox (see §6), offers to install what's missing, records choices in `.design/memory/toolbox.md`. Sets up GitHub repo + Pages (or the chosen fallback). Renders the empty `pipeline.html`.

### Phase 1 — Brief · `/design:brief`
Runs a structured brainstorm (obra/superpowers **brainstorming** skill; built-in fallback) — the agent interrogates the idea before anything is written: audience, problem, platform, constraints, success criteria.
**Out:** brief in `CLAUDE.md` (+ `README.md`), folder scaffolding, first commit.

### Phase 2 — Discover · `/design:research` + `/design:users`
- **research** — competitors in three groups (hard / soft / aspirational), self-collected data (web fetch + browser screenshots), comparison matrix, one benchmark dimension studied cross-category, 5 genuinely different UX patterns with a reasoned pick.
- **users** — personas (2–4, behavior-based, every block sourced) and JTBD ("when / I want / so that", 1 main + related + emotional/social) with a jobs × personas × features matrix → MVP core. Includes the self-critique pass: confirmed / hypothesis / invented, plus targeted re-research to close the riskiest gaps.
**Out:** `research/research.md` + `.html` + `screens/`, `people/personas.md`, `people/jtbd.md`, `people/personas.html`.

### Phase 3 — Structure · `/design:ia`
Entity inventory → sitemap derived from jobs (every screen annotated with the job it serves; orphans flagged) → navigation model with tap-depth budget (main job ≤ 3 taps) → user flows in Mermaid with decision diamonds and empty/error/loading states and both endings → jobs × screens coverage matrix → IA critique (dead ends, missing states, excess depth, orphans).
**Out:** `ia/sitemap.md`, `ia/flows.md`, `ia/ia.html`.

### Phase 4 — Wireframes · `/design:wireframes`
Grey, semantic HTML, real domain copy, **every screen in its real states as separate pages** (`-empty` / `-error` / `-loading`), a tree navigator panel on every page, screens linked along the flows (real `<a href>`, forks both ways, no dead ends). Main flow is built as the sample; the rest of the sitemap is rolled out by parallel subagents against `_conventions.md`.
**Out:** `wireframes/_screens.md`, `_conventions.md`, all `wireframes/*.html`, `_critique.md`.

### Phase 5 — Language · `/design:voice` + `/design:concept`
- **voice** — full copy inventory of the wireframes → 3–5 voice principles (rule + example + counter-example + data source, some derived from competitors' language) → dictionary (one concept = one word) + banned list (AI clichés, exclamation marks, "successfully") → microcopy rules per element type and state tone → rewrite all screens (sample first, then fan-out) → `microcopy.md` as the single source of copy truth.
- **concept** — visual references via Refero MCP (fallback: web search + screenshots), one base + borrowed details, never a clone; **your recorded taste** (named likes + anti-references) in `concept.md`; 3–5 attribute pairs sourced from data; a **choice page** `directions.html` with three contrasting live directions (palette, type, real photo card, icons) — *you* pick in the browser; the chosen direction becomes the `concept.html` test stand and is proven on **two contrasting screens**. Reflex palettes (guessable from the category) are rejected before showing.
**Out:** `voice/voice.md`, `voice/microcopy.md`, `concept/*`, two styled screens.

### Phase 6 — Build · `/design:build`
Tokens-first assembly:
1. `DESIGN.md` documented **from the two approved screens** (via `/impeccable document`; built-in fallback prompt).
2. Component inventory read out of the wireframes (≥2 occurrences = component).
3. `design-system/tokens.css` — primitive + semantic levels from day one (color goes through semantic roles; geometry reads primitives directly), `components/*.css`, `ui/shell.html` (header + tab bar markup), `ui/kit.html` showcase — human gate on the showcase.
4. Own visuals generated in one colorway (Gemini image gen; fallback: Unsplash by content theme), prompts recorded in `visuals/README.md`.
5. All screens assembled **in place** from the kit by role-grouped subagents; "keep it" now routes edits into tokens/components.
6. Dark theme as an architecture stress test (`[data-theme="dark"]` overrides semantic tokens only); keeping it in the product is a separate decision.
**Out:** `DESIGN.md`, `design-system/` (tokens + components), `ui/`, `visuals/`, all screens styled.

### Phase 7 — System · `/design:system`
The system becomes a product for other people: `design-system/index.css` single entry point; a **live showcase** in `docs/` (anatomy, variants, when-to-use, rule/anti-rule per component — same CSS as the product, cannot lie); component states (hover, active, focus-visible, disabled) via new semantic tokens **in both themes at once**; patterns (compositions proven on ≥3 screens); contribution rules ("new enters the system first") written into `DESIGN.md`/`CLAUDE.md`; **new-screen test** — an unbuilt job assembled purely from the system, gaps go to `backlog.md`; showcase deployed.
**Out:** `design-system/docs/`, `patterns/`, `examples/`, `backlog.md`, live showcase URL.

### Phase 8 — Adapt · `/design:responsive` + `/design:motion`
- **responsive** — mobile-first expansion, not desktop compression: width audit per screen (same / wider layout / new behavior), **two behavior-based breakpoints in `rem`** as tokens, shell adapts once for all screens (tab bar → sidebar), adaptive behavior lives in components (no media queries in screens), split-view pattern for list+detail pairs, states preserved on all widths.
- **motion** — motion tokens (3 durations, easings, distances); a movement is added only if it does one of three jobs: **connect states / show status / answer an action** — otherwise it's confetti; micro-interactions live in components; state transitions follow the voice tone; only `transform`/`opacity`; `prefers-reduced-motion` is mandatory.
**Out:** `responsive/width-audit.md`, adaptive system, `animations/motion-inventory.md`, motion layer.

### Phase 9 — Handoff · `/design:handoff`
Onboarding, not an archive: fresh-eyes audit ("walk the repo as a new developer") produces the gap list that drives everything; behavior spec per flow (**references code and `microcopy.md` keys, never duplicates values**); `map.md` (screen → component → token → copy key: "if I change this token, what moves"); a11y checklist with code locations; final `README.md` as a route, not a museum; release tag + deployed product & showcase; **fresh-subagent test** — a context-free agent builds a new feature from `handoff/` + README alone; gaps are closed with docs, not features.
**Graduation one-shot:** one prompt drives a brand-new job through every layer — voice → components/patterns → tokens → finished screen with states, adaptivity, motion → `examples/one-shot/`.
**Out:** `handoff/`, release, verified onboarding.

### Cross-cutting commands
- `/design:status` — reads the repo, determines the current phase from artifact presence + gate checks, prints "where you are / what's next", regenerates `pipeline.html`.
- `/design:critique` — runs the standard critique cycle on any scope (defect table → human prioritizes → fixes at the source). Uses `/impeccable critique|audit` when installed, built-in checklist otherwise.
- `/design:check` — verifies the current phase against its `.design/checklists/` done-criteria before sign-off (spec-kit's `checklist` analogue).

---

## 5. Progress tracking — `pipeline.html`

A single dashboard page at the repo root, regenerated by every phase command and by `/design:status`:

- 9 phases as a horizontal rail: done / in-progress / locked, with gate criteria per phase;
- under each phase — the artifact checklist (exists ✓ / missing —) where **every HTML artifact is a link**: research.html, personas.html, ia.html, wireframe navigator, directions.html, concept.html, kit.html, showcase, handoff;
- deployed with GitHub Pages, so the dashboard is the project's public front page.

Status is derived from **artifact presence + checklist results** — no separate state file to drift out of sync. Git history is the timeline; a git tag closes each phase (`phase-3-ia`).

---

## 6. Toolbox — recommended tools, always with a fallback

`/design:init` proposes each tool; refusal is recorded in `toolbox.md` and every later prompt automatically uses the fallback.

| Purpose | Recommended | Fallback |
|---|---|---|
| Browser & screenshots | Playwright MCP | WebFetch-only research, manual screenshots |
| Visual references | Refero MCP | Web search + competitor screenshots |
| Design quality laws | `impeccable` skill (critique/audit/document/extract) | Built-in critique & documentation prompts in `.design/` |
| Structured brief | `obra/superpowers` brainstorming skill | Built-in question-first brief prompt |
| Imagery | Gemini API image gen (one colorway, recorded prompts) | Unsplash by content theme |
| Icons | Solar set (one style) | Any single-style set, recorded in `DESIGN.md` |
| Hosting | GitHub + GitHub Pages | Any git host + local static server |

---

## 7. Packaging & distribution

- **Template repo on GitHub** (`Use this template` → new product repo). Everything ships inside the repo: commands, constitution, templates, checklists, dashboard. Zero external CLI — cloning is the installation.
- Optional later: a Claude Code **plugin/marketplace** wrapper so commands can be installed into an existing repo (`design-spec-framework` as a skill bundle), mirroring spec-kit's `specify init --here`.
- Versioned like a product: the template has releases; `pipeline.html` shows which template version a project was started from.

---

## 8. What stays deliberately human

The framework automates execution, not judgment. The designer:

- answers the brainstorm and owns the brief;
- names their taste and anti-references before any visual work;
- picks the direction in a browser, from three live options;
- prioritizes every defect table;
- says "keep it" — the phrase that turns an experiment into a system rule.
