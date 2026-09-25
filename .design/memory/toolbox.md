# Toolbox

What this project has, and what to use when it does not.

`/dsf:init` walks this table, offers to install each recommended tool, and records the answer
in **Status**. Nothing here is mandatory — every row has a fallback that keeps the pipeline
moving.

**Every `/dsf:*` command must read this file before it touches a tool.** If a row is not
`active`, use its fallback silently and note the substitution in the phase artifact. Never
block a phase, never ask the human to install something mid-phase, and never assume
availability from a previous session.

---

## Status vocabulary — defined here, used everywhere

Three values. No others. Every command, checklist and artifact that talks about tool status
refers to this list rather than restating it.

| Status | Meaning | What downstream commands do |
|---|---|---|
| `active` | installed and verified in this repo, with the detection evidence recorded | use the recommended tool |
| `fallback` | not in use — declined by the human, or the install failed, or it is unavailable here | use the fallback column, and say so in the artifact |
| `[?]` | not yet checked — `/dsf:init` has not walked this row | treat as `fallback` and report the `[?]` as an open phase-0 item |

A `[?]` left in the Status column after `/dsf:init` is a failed phase-0 gate, not a detail.
`declined`, `unavailable`, `installed` and `pending` are **not** status values here — they are
reasons, and reasons belong in the Notes section.

---

## Tools

| Purpose | Recommended | Install source | Fallback | Status |
|---|---|---|---|---|
| Browser & screenshots | Playwright MCP | MCP server `@playwright/mcp` — the agent adds it to this project's MCP config | WebFetch-only research; human-supplied screenshots dropped into `research/screens/` | `fallback` |
| Visual references | Refero MCP | Refero MCP server (account at refero.design, endpoint added to the project's MCP config) | Web search + competitor screenshots, every source listed in `concept/references.md` | `fallback` |
| Design quality laws | `impeccable` skill (`critique` / `audit` / `document` / `extract`) | Claude Code plugin marketplace: `pbakaus/impeccable` | Built-in prompts in `.design/prompts/`: `critique.md`, `audit.md`, `document.md`, `extract.md` | `fallback` |
| Structured brief | `obra/superpowers` **brainstorming** skill | Skill bundle `obra/superpowers` | Built-in interrogation prompt `.design/prompts/brief-interrogation.md` | `fallback` |
| Imagery | Gemini API image generation — one colorway, prompts recorded in `visuals/README.md` | API key from **aistudio.google.com**, kept as `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) in the environment — never committed | Unsplash, queried by content theme (interior for a room, portrait for a person) | `fallback` |
| Icons | Solar set, one style throughout (linear / bold / bold-duotone) | Open icon set — downloaded into the repo, no account needed (a choice, not an install) | Any single-style open set, recorded by name and style in `DESIGN.md` | `fallback` |
| Hosting | GitHub repo + GitHub Pages | `gh auth login`, run by the agent; Pages enabled on the default branch root | Any git host + a local static server the agent starts on request | `fallback` |

---

## Rules

- A `fallback` row is not re-offered every phase. `/dsf:init` is the only place to change a
  row.
- When a fallback is used for an artifact, say so in that artifact — a reader must be able to
  tell a Refero-sourced reference from a web-searched one.
- Icon set and image generator are locked once chosen. Mixing sets or colorways is a defect,
  not a variation.
- Adding a tool later: re-run `/dsf:init`, update this table, and re-run the affected phase's
  `/dsf:check` — earlier artifacts are not retroactively regenerated unless the human asks.
- Fallback prompts live in `.design/prompts/` and ship with the template. They are not
  optional extras: with the `impeccable` row on `fallback`, they *are* the quality pass for
  phases 4–10, and `brief-interrogation.md` *is* phase 1.

## Rules for later phases

Written by `/dsf:init`, one line per `fallback` row, stating in words what later phases must
do instead. Actionable, not decorative — later commands act on this text.

- Use WebFetch and human-supplied screenshots in `research/screens/` instead of Playwright or any browser automation.
- Use web search and list every reference source in `concept/references.md` instead of Refero.
- Use the built-in critique, audit, document and extract prompts in `.design/prompts/` instead of the `impeccable` skill.
- Use `.design/prompts/brief-interrogation.md` to run the brief instead of the missing brainstorming skill.
- Use Unsplash and record the source in `visuals/README.md` instead of the unavailable Gemini image generator.
- Pick one single-style open icon set for the whole repo and document the choice in `DESIGN.md` when the system reaches build time.
- Keep the repo local and preview pages with a static server; do not block the pipeline on GitHub Pages setup.

## Notes

Recorded by `/dsf:init`. Why a row is on `fallback`, plus keys, endpoints, model names, MCP
server names, the Pages URL, and anything else a later phase needs to reproduce a result.

- Browser & screenshots: no Playwright MCP server is configured in this session; use WebFetch + screenshots placed in `research/screens/`.
- Visual references: no Refero MCP endpoint is configured for this repo; use web search and cite every source in `concept/references.md`.
- Design quality laws: the `impeccable` skill is not installed in this environment; use the built-in prompts in `.design/prompts/`.
- Structured brief: the `obra/superpowers` skill bundle is not available locally; use `.design/prompts/brief-interrogation.md`.
- Imagery: no Gemini API key is configured in the environment; use Unsplash and record the source in `visuals/README.md`.
- Icons: no Solar asset set is preselected in this repo; choose one single-style open set and document it in `DESIGN.md`.
- Hosting: the repository remote is `https://github.com/denysosadchyi/design-spec-framework.git`, but GitHub Pages is not enabled in this session; local preview via `python -m http.server` is the active fallback.
