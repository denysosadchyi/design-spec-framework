# design-spec-framework — Spec-Driven Development for Product Design

**One-line pitch:** clone a template repo, run `/dsf:*` commands in Claude Code, and walk a product from a blank folder to a handoff-ready design system — the way spec-kit does it for code, but for design.

A designer never touches a terminal command: every action is a prompt, the agent does the work. The repo itself is the design file. Figma is never required.

---

## 1. Core idea

Design work is driven by **specs that live in the repo**, not by conversations that evaporate. Every phase:

1. reads the artifacts of previous phases (never re-asks what is already written),
2. produces a **Markdown artifact for the agent** and an **HTML artifact for humans**,
3. ends with a critique cycle and a human gate,
4. updates the living docs (`CLAUDE.md`, `README.md`, and the data block of `index.html`) and commits — the phase's git tag is created by `/dsf:check`, never by the phase itself.

The product grows as one set of files: the grey wireframe of phase 4 is the *same file* that ships styled and tokenized in phase 6, responsive in phase 8 and animated in phase 9. Nothing is redrawn, everything is layered.

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
| **Human gates** | The agent stops at seven fixed decision points: brief approval, direction choice, recorded taste, sample sign-off, defect prioritization, phase sign-off, "keep it". It never chooses taste for you. Every answer is appended to `.design/decisions.md`. |
| **Spec consistency** | An instruction that contradicts a written decision stops the agent: update the spec and propagate, record an exception, or withdraw. It is never obeyed silently. |
| **Living docs** | `CLAUDE.md` (agent context), `README.md` (human index) and the `index.html` data block (the project's home page) are updated at the end of every phase. |

---

## 3. Repo anatomy (template)

```
my-product/                      ← created from the design-spec-framework template
├── .claude/
│   ├── commands/dsf/            ← all /dsf:* slash commands
│   └── settings.json            ← pre-allowed permissions the pipeline needs
├── .design/
│   ├── memory/constitution.md   ← the engine rules (above)
│   ├── memory/phases.md         ← the canonical phase table: commands, checklists, tags, paths
│   ├── memory/toolbox.md        ← which tools are active vs. running on a fallback
│   ├── prompts/                 ← the fallbacks themselves: document.md, extract.md,
│   │                              critique.md, audit.md, brief-interrogation.md
│   ├── templates/               ← skeletons for the core artifacts (16 files; each command
│   │                              names the template its step starts from)
│   ├── checklists/              ← done-criteria per phase (gate checks)
│   ├── checklists/results/      ← `/dsf:check` verdicts, one file per phase
│   ├── progress/                ← append-only step ledgers, one file per phase
│   └── decisions.md             ← append-only log of every gate answer and "keep it"
├── index.html                   ← the project's home page: phases, artifacts, links, status
├── assets/                      ← the page's own files: fonts.css, pipeline.css,
│                                  i18n-uk.js, pipeline.js (relative paths, same repo)
├── CLAUDE.md                    ← brief + accumulated context (grows every phase)
├── README.md                    ← human index of the repo
│   — everything below is created by the phases —
├── research/                    ← research.md, research.html, screens/
├── people/                      ← personas.md, jtbd.md, personas.html
├── ia/                          ← sitemap.md, flows.md (Mermaid), ia.html
├── wireframes/                  ← _screens.md, _conventions.md, index.html (navigator),
│                                  *.html (+ per-state pages)
├── voice/                       ← voice.md, microcopy.md, voice.html
├── concept/                     ← references.md, concept.md, directions.html, concept.html
├── ui/                          ← inventory.md, tokens-audit.md, shell.html, kit.html
├── design-system/               ← tokens.css, components/, patterns/, docs/ (showcase),
│                                  examples/ (incl. one-shot/), index.css
├── visuals/                     ← generated imagery + prompts (reproducible style)
├── responsive/                  ← width-audit.md, width-audit.html
├── animations/                  ← motion-inventory.md, motion-inventory.html
└── handoff/                     ← spec/, map.md, a11y.md, onboarding-gaps.md, index.html
```

Three files in `.design/` are the ones an agent consults before acting: **constitution.md**
(the rules), **phases.md** (the canonical phase table — commands, checklists, tags, artifact
paths, the `index.html` data contract; when a command and that file disagree, that file
wins) and **toolbox.md** (what is active and what runs on a fallback). Every fallback named
in `toolbox.md` has an actual prompt file in `.design/prompts/` — nothing in the pipeline is
a hard dependency on an external tool.

---

## 4. The pipeline — 11 phases (0–10), 17 commands

Eleven phases, numbered 0 to 10, and seventeen commands: **thirteen drive a phase** (phases 2
and 5 have two commands each) and **four are cross-cutting** — `/dsf:status`, `/dsf:check`,
`/dsf:critique`, and `/dsf:change`, the entry point for a decision that changes after its
phase was signed off. The canonical table — commands, checklists, tags and
artifact paths — lives in `.design/memory/phases.md`.

The 12-lesson canon is compressed into a working pipeline. The main compression: **tokens-first build** — the kit is built directly on two-level tokens (primitive + semantic) instead of the teaching path "flat kit first, refactor to tokens later".

### Phase 0 — `/dsf:init`
Verifies the toolbox (see §6), offers to install what's missing, records choices in `.design/memory/toolbox.md`. Sets up GitHub repo + Pages (or the chosen fallback). Renders the empty `index.html`.

### Phase 1 — Brief · `/dsf:brief`
Runs a structured brainstorm (obra/superpowers **brainstorming** skill; built-in fallback) — the agent interrogates the idea before anything is written: audience, problem, platform, constraints, success criteria.
**Out:** brief in `CLAUDE.md` (+ `README.md`), folder scaffolding, first commit.

### Phase 2 — Discover · `/dsf:research` + `/dsf:users`
- **research** — competitors in three groups (hard / soft / aspirational), self-collected data (web fetch + browser screenshots), comparison matrix, one benchmark dimension studied cross-category, 5 genuinely different UX patterns with a reasoned pick.
- **users** — personas (2–4, behavior-based, every block sourced) and JTBD ("when / I want / so that", 1 main + related + emotional/social) with a jobs × personas × features matrix → MVP core. Includes the self-critique pass: confirmed / hypothesis / invented, plus targeted re-research to close the riskiest gaps.
**Out:** `research/research.md` + `.html` + `screens/`, `people/personas.md`, `people/jtbd.md`, `people/personas.html`.

### Phase 3 — Structure · `/dsf:ia`
Entity inventory → sitemap derived from jobs (every screen annotated with the job it serves; orphans flagged) → navigation model with tap-depth budget (main job ≤ 3 taps) → user flows in Mermaid with decision diamonds and empty/error/loading states and both endings → jobs × screens coverage matrix → IA critique (dead ends, missing states, excess depth, orphans).
**Out:** `ia/sitemap.md`, `ia/flows.md`, `ia/ia.html`.

### Phase 4 — Wireframes · `/dsf:wireframes`
Grey, semantic HTML, real domain copy, **every screen in its real states as separate pages** (`-empty` / `-error` / `-loading`), a tree navigator panel on every page, screens linked along the flows (real `<a href>`, forks both ways, no dead ends). Main flow is built as the sample; the rest of the sitemap is rolled out by parallel subagents against `_conventions.md`.
**Out:** `wireframes/_screens.md`, `_conventions.md`, all `wireframes/*.html`, the navigator index `wireframes/index.html`, `_critique.md`.

### Phase 5 — Language · `/dsf:voice` + `/dsf:concept`
- **voice** — full copy inventory of the wireframes, every string keyed `<screen>.<zone>.<element>` (stable across rewrites, referenced by the phase-10 spec) → 3–5 voice principles (rule + example + counter-example + data source, some derived from competitors' language) → dictionary (one concept = one word) + banned list (AI clichés, exclamation marks, "successfully") → microcopy rules per element type and state tone → rewrite all screens (sample first, then fan-out) → `microcopy.md` as the single source of copy truth → `voice/voice.html`, the viewable contract: principles with their example/counter-example pairs, dictionary, banned list, before/after table.
- **concept** — visual references via Refero MCP (fallback: web search + screenshots), one base + borrowed details, never a clone; **your recorded taste** (named likes + anti-references) in `concept.md`; 3–5 attribute pairs sourced from data; a **choice page** `directions.html` with three contrasting live directions (palette, type, real photo card, icons) — *you* pick in the browser; the chosen direction becomes the `concept.html` test stand and is proven on **two contrasting screens**. Reflex palettes (guessable from the category) are rejected before showing.
**Out:** `voice/voice.md`, `voice/microcopy.md`, `voice/voice.html`, `concept/*`, two styled screens.

### Phase 6 — Build · `/dsf:build`
Tokens-first assembly:
1. `DESIGN.md` documented **from the two approved screens** (via `/impeccable document`; fallback `.design/prompts/document.md`); `concept/concept.html` retires here — superseded by `ui/kit.html`, frozen or deleted, never a second source of visual truth.
2. Component inventory read out of the wireframes (≥2 occurrences = component).
3. **Usage audit** `ui/tokens-audit.md` — every variable and raw value, where it is used, the role it plays; value drift, one variable serving several roles, values bypassing variables; role candidates with the usages that prove them. Human gate: **nothing is renamed before the designer reviews it.**
4. `design-system/tokens.css` — primitive + semantic levels from day one (color goes through semantic roles; geometry reads primitives directly; **two roles = two tokens even if the value is identical today**), `components/*.css`, `ui/shell.html` (header + tab bar markup), `ui/kit.html` showcase — human gate on the showcase.
5. Own visuals generated in one colorway (Gemini image gen; fallback: Unsplash by content theme), prompts recorded in `visuals/README.md`.
6. All screens assembled **in place** from the kit by role-grouped subagents, starting with a pixel-identical test on **three control screens** and a ban on opportunistic tweaks during assembly; "keep it" now routes edits into tokens/components.
7. Role revision — the declared cost of naming roles early: a role used once demotes to a primitive, a role serving three meanings splits.
8. Dark theme as an architecture stress test (`[data-theme="dark"]` overrides semantic tokens only), contrast recorded for every semantic pair in both themes; keeping it in the product is a separate decision.
**Out:** `DESIGN.md`, `ui/tokens-audit.md`, `design-system/` (tokens + components), `ui/`, `visuals/`, all screens styled.

### Phase 7 — System · `/dsf:system`
The system becomes a product for other people: `design-system/index.css` single entry point; a **live showcase** in `docs/` (anatomy, variants, when-to-use, rule/anti-rule per component — same CSS as the product, cannot lie), built as **one sample page the designer reviews before the rest fan out**; component states (hover, active, focus-visible, disabled) via new semantic tokens **in both themes at once**; patterns (compositions proven on ≥3 screens); contribution rules ("new enters the system first") written into `DESIGN.md`/`CLAUDE.md`; **new-screen test** — an unbuilt job assembled purely from the system, then **walked keyboard-only in the dark theme** with focus visible at every stop; gaps go to `backlog.md`; showcase deployed.
**Out:** `design-system/docs/`, `patterns/`, `examples/`, `backlog.md`, live showcase URL.

### Phase 8 — Responsive · `/dsf:responsive`
Mobile-first expansion, not desktop compression: width audit per screen (same / wider layout / new behavior), **two behavior-based breakpoints in `rem`** as tokens — verified by doubling the root font size and watching the breakpoints move — shell adapts once for all screens (tab bar → sidebar), adaptive behavior lives in components (no media queries in screens), split-view pattern for list+detail pairs, states preserved on all widths.
**Out:** `responsive/width-audit.md` + `.html`, breakpoint and grid tokens, adaptive shell and components, `split-view` pattern.

### Phase 9 — Motion · `/dsf:motion`
Motion tokens (3 durations, easings, distances); a movement is added only if it does one of three jobs: **connect states / show status / answer an action** — otherwise it's confetti; micro-interactions live in components; state transitions follow the voice tone; only `transform`/`opacity`; `prefers-reduced-motion` is mandatory.
**Out:** `animations/motion-inventory.md` + `.html`, motion tokens, the `DESIGN.md` **Motion** and **Motion budget** sections.

### Phase 10 — Handoff · `/dsf:handoff`
Onboarding, not an archive: fresh-eyes audit ("walk the repo as a new developer") produces the gap list that drives everything; behavior spec per flow (**references code and `microcopy.md` keys, never duplicates values**); `map.md` (screen → component → token → copy key: "if I change this token, what moves"); a11y checklist with code locations; final `README.md` as a route, not a museum; release tag + deployed product & showcase; **fresh-subagent test** — a context-free agent builds a new feature from `handoff/` + README alone; gaps are closed with docs, not features.
**Graduation one-shot:** one prompt drives a brand-new job through every layer — voice → components/patterns → tokens → finished screen with states, adaptivity, motion → `design-system/examples/one-shot/`.
**Out:** `handoff/` (spec, map, a11y, gaps, `handoff/index.html`), release, verified onboarding.

### Cross-cutting commands
- `/dsf:status` — reads the repo, determines the current phase from artifact presence + `/dsf:check` results + git tags, prints "where you are / what to type next", refreshes the `index.html` data block.
- `/dsf:critique` — runs the standard critique cycle on any scope (defect table → human prioritizes → fixes at the source). Uses `/impeccable critique|audit` when active, `.design/prompts/critique.md` and `audit.md` otherwise.
- `/dsf:check` — verifies a phase against its `.design/checklists/` done-criteria, writes the verdict, and — on a full pass, after the human confirms — creates the phase's single git tag. **Phase commands never tag.**
- `/dsf:change "<request>"` — the entry point for "the client changed their mind": classifies the earliest invalidated phase, prints the blast radius, gates on the human, re-opens the affected phases and logs the decision.

### Human in the loop & spec consistency

The gates are only half of the discipline. The other half is what happens when a new
instruction **contradicts a decision that is already written down** — a request that quietly
undoes the chosen direction, the approved sitemap or a "keep it" from three phases ago.

The constitution's guard rule forbids the agent from silently obeying. It stops and offers
exactly three options:

1. **Update the spec and propagate** — the new instruction wins: the artifact that holds the
   old decision is edited, and the change is rolled out everywhere it already landed.
2. **Recorded exception** — the old decision stands as the rule, this one case departs from
   it, and the departure is written down with its reason.
3. **Withdraw** — the request is dropped and the existing decision stands untouched.

Whichever is chosen — and every gate answer, every "keep it", every contradiction resolved —
is appended to **`.design/decisions.md`**: date, gate, what was shown, the verbatim human
answer. Seven mandatory gates that leave no trace are not receipts. `/dsf:status` reads that
log, and `/dsf:change` writes to it. Changes made after a phase has been signed off go
through `/dsf:change`, not through an ad-hoc edit.

---

## 5. Progress tracking — `index.html`

`index.html` at the repo root is **the project's home page** — the surface the designer
opens between prompts and the page a stakeholder is sent:

- 11 phases (0–10) as a rail: done / in-progress / locked, with gate criteria per phase;
- under each phase — the artifact checklist (exists ✓ / missing —) where **every HTML artifact is a link**: `research.html`, `personas.html`, `ia.html`, the wireframe navigator `wireframes/index.html`, `voice.html`, `directions.html`, `concept.html`, `kit.html`, the showcase, `width-audit.html`, `motion-inventory.html`, `handoff/index.html`;
- deployed with GitHub Pages, which serves it at the repo URL itself, so the home page is also
  the project's public front page.

**Its files.** `index.html` carries the markup and the state block; its styling, dictionaries and
behaviour sit next to it in `assets/` — `fonts.css` (Inter, base64-embedded), `pipeline.css`,
`i18n-uk.js`, `pipeline.js` — linked with relative paths from the same repo. Nothing is fetched
from outside the repo, and the page opens the same way from a static host and from `file://`.

**The data contract.** All state lives in one `<script type="application/json" id="pipeline-data">`
block, inside `index.html`: phase statuses, artifact entries with their links, and a `context`
object (product, one-liner, benchmark dimension, primary persona, main job, chosen direction)
that the page uses to fill product context into its prompt hints. **Phase commands edit that
block and nothing else** — never the markup around it, never anything in `assets/`. The page
renders itself from the JSON, so a command cannot break the dashboard by touching layout.

Status is derived from **artifact presence + `/dsf:check` results + git tags** — no separate
state file to drift out of sync. Git history is the timeline: **exactly one tag per phase**
(`phase-0-init` … `phase-10-handoff`), created only by `/dsf:check` on a full pass after the
human confirms. Phases 2 and 5 have two commands each and still get one tag.

---

## 6. Toolbox — recommended tools, always with a fallback

`/dsf:init` proposes each tool; refusal is recorded in `toolbox.md` and every later prompt automatically uses the fallback.

| Purpose | Recommended | Fallback |
|---|---|---|
| Browser & screenshots | Playwright MCP | WebFetch-only research, manual screenshots |
| Visual references | Refero MCP | Web search + competitor screenshots |
| Design quality laws | `impeccable` skill (critique/audit/document/extract) | `.design/prompts/critique.md`, `audit.md`, `document.md`, `extract.md` |
| Structured brief | `obra/superpowers` brainstorming skill | `.design/prompts/brief-interrogation.md` |
| Imagery | Gemini API image gen (one colorway, recorded prompts) | Unsplash by content theme |
| Icons | Solar set (one style) | Any single-style set, recorded in `DESIGN.md` |
| Hosting | GitHub + GitHub Pages | Any git host + local static server |

---

## 7. Packaging & distribution

- **Template repo on GitHub** (`Use this template` → new product repo). Everything ships inside the repo: commands, constitution, templates, checklists, dashboard. Zero external CLI — cloning is the installation.
- Optional later: a Claude Code **plugin/marketplace** wrapper so commands can be installed into an existing repo (`design-spec-framework` as a skill bundle), mirroring spec-kit's `specify init --here`.
- Versioned like a product: the template has releases; `index.html` shows which template version a project was started from.

---

## 8. What stays deliberately human

The framework automates execution, not judgment. The designer:

- answers the brainstorm and owns the brief;
- confirms the sitemap before a flow is drawn and the personas before jobs are derived;
- names their taste and anti-references before any visual work;
- picks the direction in a browser, from three live options;
- approves the token usage audit — nothing is renamed before they have read it;
- prioritizes every defect table;
- says "keep it" — the phrase that turns an experiment into a system rule;
- resolves every contradiction the guard rule catches, and signs each phase off.

Every one of those answers lands in `.design/decisions.md`, so the reasoning outlives the
session it happened in.
