# Toolbox

What this project has, and what to use when it does not.

`/dsf:init` walks this table, offers to install each recommended tool, and records the
answer in **Status**. Nothing here is mandatory — every row has a fallback that keeps the
pipeline moving.

**Every `/dsf:*` command must read this file before it touches a tool.** If a row is not
`installed`, use its fallback silently and note the substitution in the phase artifact.
Never block a phase, never ask the human to install something mid-phase, and never assume
availability from a previous session.

---

## Tools

| Purpose | Recommended | Fallback | Status |
|---|---|---|---|
| Browser & screenshots | Playwright MCP | WebFetch-only research; human-supplied screenshots into `research/screens/` | `[?]` |
| Visual references | Refero MCP | Web search + competitor screenshots, sources listed in `concept/references.md` | `[?]` |
| Design quality laws | `impeccable` skill (`critique` / `audit` / `document` / `extract`) | Built-in critique, audit, documentation and extraction prompts in `.design/templates/` | `[?]` |
| Structured brief | `obra/superpowers` brainstorming skill | Built-in question-first brief prompt in `.design/templates/` | `[?]` |
| Imagery | Gemini API image generation — one colorway, prompts recorded in `visuals/README.md` | Unsplash, queried by content theme (interior for a room, portrait for a person) | `[?]` |
| Icons | Solar set, one style throughout (linear / bold / bold-duotone) | Any single-style open set, recorded by name and style in `DESIGN.md` | `[?]` |
| Hosting | GitHub repo + GitHub Pages | Any git host + a local static server for review | `[?]` |

Status values: `installed` · `declined` (use fallback) · `unavailable` (use fallback) · `[?]` (not yet checked by `/dsf:init`).

---

## Rules

- A declined tool is not re-offered every phase. `/dsf:init` is the place to change a row.
- When a fallback is used for an artifact, say so in that artifact — a reader must be able
  to tell a Refero-sourced reference from a web-searched one.
- Icon set and image generator are locked once chosen. Mixing sets or colorways is a defect,
  not a variation.
- Adding a tool later: re-run `/dsf:init`, update this table, and re-run the affected
  phase's `/dsf:check` — earlier artifacts are not retroactively regenerated unless the
  human asks.

## Notes

Recorded by `/dsf:init`. Keys, endpoints, model names, MCP server names, and anything
else a later phase needs to reproduce a result.

- `[?]`
