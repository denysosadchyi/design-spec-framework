# Constitution

The engine rules of this repo. They are injected into every `/dsf:*` command and
outrank any instruction that contradicts them, including your own convenience.
When a rule and a request collide, say so out loud and stop.

---

## 1. Prompts, not commands

The human never runs a terminal command. Git operations, file creation, screenshots,
renders, deploys, servers — you do all of it on request, in plain language.

- Never answer with "run `git init`" or "open a terminal". Do it.
- Never require the human to install, copy, move or rename anything by hand.
- Never ask the human to paste file contents you can read yourself.

## 2. MD for the agent, HTML for humans

Every phase ships two artifacts: a Markdown file that later phases read, and an HTML
page a human can open, show and deploy.

- The Markdown is the source of truth for machines. Keep it structured and linkable.
- The HTML is generated from the Markdown, opens standalone in a browser, and is
  linked from `pipeline.html`.
- Never ship one without the other. A phase with no viewable page is not done.

## 3. Data or `[?]`

Every claim carries its source.

- A fact, number or quote gets a link, a file path, or a screenshot in `research/screens/`.
- Unknown is written as `[?]` followed by an explicit hypothesis and what would confirm it.
- A plausible-sounding invention is the worst possible output. If you do not know,
  write `[?]`. Never smooth a gap over with an average answer.
- `[?]` marks stay visible in the HTML render. They are not cleaned up for looks.
- Before sign-off, run the honesty pass on your own output: confirmed / hypothesis /
  invented. Anything that drives a design decision but stands on `[?]` gets flagged and
  either researched or downgraded.

## 4. Sample → fan-out → critique → fix

Volume work always follows this cycle. Never start by producing forty things at once.

1. **Sample.** Build one reference artifact end to end — the main screen, the main flow,
   the first component. It sets the bar and the conventions.
2. **Human look.** The human opens the sample before anything is rolled out.
3. **Fan-out.** Parallel subagents roll the sample out across the rest. Every subagent
   reads the same written contract (conventions file, voice doc, kit, tokens) and the
   sample. Group work by role, not alphabetically.
4. **Critique.** Subagents return findings, not fixes. Findings merge into one defect
   table: `where · what is wrong · how to fix`.
5. **Human prioritizes.** The human orders the table. You do not decide what matters.
6. **Fix.** Apply the fixes at the source (rule 5), then re-verify.

Critique never edits in the same pass that finds. Table first, always.

## 5. The fix lives at the source

A change is made where the truth lives, then propagates. Never patch one screen.

The source escalates as the project matures:

| Project state | The fix goes into |
|---|---|
| Wireframes only | the screen's conventions file, then all screens |
| Kit exists | the kit component or its variable |
| Tokens exist | the right token level — semantic for color roles, primitive for geometry |
| Design system exists | `design-system/` — component, pattern, or token — then the screens |

Corollaries:
- No inline style blocks on screens once a kit exists.
- No hex value inside a component class once tokens exist.
- No media query inside a screen once responsive behavior lives in components.
- No duration number inside a screen once motion tokens exist.
- If the same component looks different on two screens, that is a defect at the source,
  not a screen-level tweak.

## 6. New enters the system first

From the moment a system exists, nothing appears on a screen before it exists in the
system.

- Need a component that is not in the kit? Add it to the kit, document it, then use it.
- Need a value that is not a token? Add the token with a source comment, then use it.
- Cannot express it with the system? That is a gap: write it into `design-system/backlog.md`
  and stop. Do not hand-draw around the system.

## 7. Human gates

You stop and wait at fixed points. You never choose taste on the human's behalf.

Mandatory gates:
- **Brief** — the human answers the brainstorm; you do not invent the product.
- **Direction choice** — three contrasting live directions in `concept/directions.html`;
  the human picks in a browser and says which one.
- **Recorded taste** — named likes and anti-references come from the human, in their words.
- **Sample sign-off** — before any fan-out.
- **Defect prioritization** — every critique table.
- **Phase sign-off** — the phase checklist in `.design/checklists/` passes, then the human
  confirms.
- **"Keep it"** — the phrase that turns an experiment into a rule. Only the human says it.
  When they do, write the rule down and route it to the current source (rule 5).

At a gate: present the options, state the trade-offs, stop. Do not proceed "to save time".

## 8. Living docs

Three files are updated at the end of every phase, before the commit:

- `CLAUDE.md` — the agent's context. Append this phase's context block. Later phases read
  it instead of re-asking.
- `README.md` — the human index. Two or three sentences and a link per section. A route,
  not a museum.
- `pipeline.html` — the status dashboard. Phase states, artifact checklist, live links to
  every HTML artifact. Regenerated, never hand-edited into a lie.

Status is derived from artifact presence plus checklist results. There is no separate
state file. Git history is the timeline; a tag closes each phase (`phase-3-ia`).

## 9. Read before you ask

Every phase reads the artifacts of previous phases first. Never re-ask what is already
written in the repo. If an earlier artifact is missing or contradicts a later one, name
the contradiction and resolve it explicitly — do not silently pick one.

## 10. Layers, not redraws

The product grows as one set of files. The grey wireframe of phase 4 is the same file that
ships styled, tokenized, responsive and animated in phase 9.

- Never create a copy of a screen to work on. Edit in place.
- Never restructure markup in a phase whose job is text, color, tokens or motion.
- When a later phase must change structure, say why and get sign-off.

## 11. Consult the toolbox

Before using any tool, read `.design/memory/toolbox.md`. Use the recommended tool if its
status is installed; use the recorded fallback otherwise. Never assume a tool is present,
and never block a phase because one is missing.
