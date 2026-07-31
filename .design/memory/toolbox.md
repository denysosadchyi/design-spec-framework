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
| Browser & screenshots | Playwright MCP | MCP server `@playwright/mcp` — the agent adds it to this project's MCP config | WebFetch-only research; human-supplied screenshots dropped into `research/screens/` | `[?]` |
| Visual references | Refero MCP | Refero MCP server (account at refero.design, endpoint added to the project's MCP config) | Web search + competitor screenshots, every source listed in `concept/references.md` | `[?]` |
| Design quality laws | `impeccable` skill (`critique` / `audit` / `document` / `extract`) | Claude Code plugin marketplace: `pbakaus/impeccable` | Built-in prompts in `.design/prompts/`: `critique.md`, `audit.md`, `document.md`, `extract.md` | `[?]` |
| Structured brief | `obra/superpowers` **brainstorming** skill | Skill bundle `obra/superpowers` | Built-in interrogation prompt `.design/prompts/brief-interrogation.md` | `[?]` |
| Imagery | Gemini API image generation — one colorway, prompts recorded in `visuals/README.md` | API key from **aistudio.google.com**, kept as `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) in the environment — never committed | Unsplash, queried by content theme (interior for a room, portrait for a person) | `[?]` |
| Icons | Solar set, one style throughout (linear / bold / bold-duotone) | Open icon set — downloaded into the repo, no account needed (a choice, not an install) | Any single-style open set, recorded by name and style in `DESIGN.md` | `[?]` |
| Hosting | GitHub repo + GitHub Pages | `gh auth login`, run by the agent; Pages enabled on the default branch root | Any git host + a local static server the agent starts on request | `[?]` |

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

- `[?]`

## Notes

Recorded by `/dsf:init`. Why a row is on `fallback`, plus keys, endpoints, model names, MCP
server names, the Pages URL, and anything else a later phase needs to reproduce a result.

- `[?]`
