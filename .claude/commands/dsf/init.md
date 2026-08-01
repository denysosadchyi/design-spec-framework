---
description: Phase 0 — verify the toolbox, record every tool choice and its fallback, set up hosting, render index.html, first commit, and hand the designer their project home page.
argument-hint: (no arguments)
---

# Phase 0 — Init

You are setting up a design-spec repo. Nothing about the product is discussed here — only the
tools the pipeline will run on and the scaffolding of the dashboard. The user must never be
asked to run a terminal command; you run everything.

## Prerequisites

- This repo was created from the design-spec-framework template: `.design/memory/constitution.md`,
  `.design/memory/phases.md`, `.design/prompts/`, `.design/templates/`, `.design/checklists/`,
  `.design/progress/` and `index.html` must exist. If they do not, stop and tell the user this command must run
  inside a repo created from the template.
- `git` available. If the folder is not a git repo, `git init` it yourself.
- If `.design/memory/toolbox.md` has no `[?]` left in its Status column, this is a re-run: read
  it, show the current state, and ask whether to revise choices or exit.

## Load context

Read in full and obey for the rest of this command:

- `.design/memory/constitution.md` — in particular **prompts, not commands**, **human gates**,
  **living docs**.
- `.design/memory/phases.md` — the canonical phase table, the canonical artifact paths, the tag
  scheme and the `pipeline-data` contract. Do not restate it here and do not invent a second
  list of phases.
- `.design/memory/toolbox.md` — the rows you are about to fill in, and the status vocabulary
  (`active` / `fallback` / `[?]`) defined there. Use those three words and no others.

## Step ledger — start it before step 1

This command records its own steps like every phase command does, so do the scaffolding first:

- `.design/progress/` ships with the template, holding `README.md`. If the folder or the README
  is missing, create it now from the contract in `phases.md` (**Step ledgers**) — an empty
  `.design/progress/` is a broken template, not a fresh project.
- Create `.design/progress/phase-0.md` with the header `# Phase 0 · Init — step ledger`.
- After **each** numbered step below finishes — and immediately after the gate in step 2
  resolves — append one line:
  `- init.<step> · <step name> · YYYY-MM-DD HH:MM · files: <paths touched> [· gate: <verbatim short answer>]`.
  Append-only: never rewrite a line, and on a re-run of this command append again rather than
  editing what is there.
- On a re-run, read `phase-0.md` before step 1 and say which steps you are about to redo. Step 2
  is a human gate; a re-run does not inherit its answer.

## Steps

### 1. Detect what is already available

Without asking the user anything yet, walk the **Tools** table in `.design/memory/toolbox.md`
row by row and establish, with evidence, whether each recommended tool is present here:

| Row | Detection |
|---|---|
| Browser & screenshots | Playwright MCP tools present in this session |
| Visual references | Refero MCP tools present in this session |
| Design quality laws | `impeccable` skill listed as available |
| Structured brief | `obra/superpowers` brainstorming skill listed as available |
| Imagery | image-gen script present, or `GEMINI_API_KEY` / `GOOGLE_API_KEY` reachable |
| Icons | not detectable — a choice, so ask it as one |
| Hosting | `gh auth status` succeeds |

Record the evidence for each row as you go. A row you did not actually test is `[?]`, never
`active`. The **Install source** column of `toolbox.md` tells you where each tool comes from if
the user wants it installed — read it now, so you can answer "how would you get it" in the same
breath as "you don't have it".

### 2. Toolbox and hosting review — HUMAN GATE

One gate for this whole phase. Present a single table — purpose · recommended tool · detected
yes/no · install source · what changes in the pipeline if it stays on `fallback` — and ask, in
one message, for all of the following at once:

1. which missing tools to install and which to leave on `fallback`;
2. the icon set choice (Solar, or another single-style set);
3. whether hosting is GitHub + Pages or the local fallback;
4. if GitHub: the repo name, and public or private.

**HUMAN GATE — toolbox and hosting.** Stop here. Install nothing, create no repo, write no
`toolbox.md`, until the user answers. Publishing work and installing software are both in this
answer, which is why it is a gate and why it is only one.

A refusal is a legitimate answer and costs nothing later — every downstream command reads
`toolbox.md` and switches to the fallback automatically. Never argue a tool a second time.

### 3. Install what was approved

Install only what the user approved, one at a time, using the **Install source** column,
reporting the outcome of each. If an install fails, do not retry silently: set that row to
`fallback`, write the reason into **Notes**, and say so.

### 4. Write `.design/memory/toolbox.md`

Fill the Status column of the existing table — `active` / `fallback`, never `[?]` once this
command has run. Then:

- **Rules for later phases** — one line per `fallback` row saying in words what later phases
  must do instead. For example: "no browser: research screenshots are user-supplied; a screen
  with no image is marked `[no screenshot]`, never described from memory." Later commands act
  on this text, so it must be operational, not decorative.
- **Notes** — the reason each `fallback` row is on fallback, plus keys, endpoints, MCP server
  names, the chosen icon set and style, and the Pages URL once it exists.

### 5. Hosting

If GitHub was chosen in the gate: create the repo with the name and visibility the user gave,
push, enable GitHub Pages from the default branch root, and record the Pages URL in
`toolbox.md` and `README.md`. Pages serves `index.html` at the repo URL itself, so the address
to record is the bare `https://<user>.github.io/<repo>/` — no file name needed. `assets/` sits
in the same repo and is published with it. Do not re-ask anything — the answer came in step 2.

If the fallback was chosen or the setup fails: record it — commits stay local, `index.html`
and every `*.html` artifact are viewed through a local static server you start on request. Do
not push anywhere.

### 6. Reset the two state stores: `.design/progress/` and the dashboard data block

The project keeps its progress in two places and both start empty here.

**The ledgers.** Confirm `.design/progress/` exists with its `README.md` and the phase-0 ledger
you started above. Create no other ledger file: `phase-1.md` … `phase-10.md` are created by the
commands that run those phases, and an empty ledger for a phase nobody has opened is noise
pretending to be state.

**The dashboard.** `index.html` already exists at the repo root; its styles, dictionaries and
renderer ship beside it in `assets/` (`fonts.css`, `pipeline.css`, `i18n-uk.js`, `pipeline.js`),
loaded by relative paths from this same repo. There is **no** `.design/templates/index.html` and
you do not create one, and you never touch `assets/` here. Your job is exactly one block, in
`index.html`:

```html
<script type="application/json" id="pipeline-data"> … </script>
```

Rewrite that block, and nothing else in the file, to the starting state (the contract is in
`.design/memory/phases.md`):

- `phases` — all eleven phases from the canonical table, in order, with `id`, `number`, `name`,
  `commands`, `tag` and the full `artifacts` list at the canonical paths;
- phase 0 `status: "in-progress"`, phases 1–10 `status: "locked"`, every phase `tagged: false`;
- every artifact `exists: false`; `link: true` only on the HTML artifacts a human opens;
- `criteria` on every phase — `total` from the per-phase item counts in `phases.md`,
  `passed: []`, `failed: []`, `checkedAt: ""`. Nothing is verified yet;
- `steps` on every phase — `total` from the per-command step counts in `phases.md` (the sum of
  both commands for phases 2 and 5: 19 and 17), `done: []`, `current: ""`. This is the
  starting state — phase 0's own `init.*` ids are folded in at step 8, from the ledger, once
  the rest of this command has actually run;
- `context` — every value the empty string: `product`, `oneLiner`, `benchmarkDimension`,
  `primaryPersona`, `mainJob`, `chosenDirection`, plus `toolbox: []`. Empty means "not known
  yet". You know none of them here — phase 0 does not discuss the product, and the toolbox rows
  are only decided once the gate in step 3 is answered (you fill them in at step 8).

**`{{PRODUCT_NAME}}`.** The template ships this placeholder in the title and the header. If the
user has already named the product, substitute it everywhere it appears — in the markup and in
`context.product` — in one pass. If they have not, leave the placeholder alone and say in your
sign-off, in one sentence, that `/dsf:brief` will fill in the product name once the brief names
it. Never substitute a guess, and never invent a name to make the header look finished.

Status is derived from files at every render. Do not hard-code a status anywhere, do not create
a state file, and do not touch the renderer below the data block.

### 7. Run the phase checklist

Run `.design/checklists/phase-0-init.md` against the actual files and report pass/fail per item.
The checklist is a read-only reference document — you never tick anything in it. Fix what you
can; anything you cannot fix goes to the user as an explicit blocker.

The phase is formally gated by `/dsf:check 0`, which writes the verdict file
`.design/checklists/results/phase-0.md` and creates the `phase-0-init` tag on a full pass. This
command creates no tag.

### 8. Living docs and commit

- `CLAUDE.md`: fill the **Toolbox** section — one line per `active` tool, one per `fallback` in
  force. This is the section every later command consults.
- `README.md`: the repo index skeleton and, if hosting is active, the `index.html` URL.
- `index.html`: bring phase 0's `steps` in line with `.design/progress/phase-0.md` — the
  `init.*` ids you have written lines for into `done`, `current` set to `"init.9"` while step 9
  runs and `""` when it is finished. Ledger first, JSON after; the JSON never claims a step the
  ledger has no line for.
- `index.html`: fill `context.toolbox` — one entry per row of `.design/memory/toolbox.md`,
  `{ "tool": "<the row's tool name>", "status": "active" | "fallback" }`, in the same order as
  the table. This is what phase 0's Result page shows, so it must match `toolbox.md` row for
  row: no row left out, no row invented, and no `[?]` (a row you could not resolve is
  `fallback`, and `toolbox.md` says why).
- Commit: `chore: phase 0 — toolbox and pipeline scaffolding` (the ledger and
  `.design/progress/README.md` go in the same commit).
- Push **only** if `toolbox.md` records hosting as `active`.

### 9. Hand over the project home page

This is the point of the whole command. Everything the person needs from here — where the run
is, what it has proven, what to send next — lives on one page. Close with these three things,
in plain words, in this order:

**(a) The link.** Give the direct address of their project page:

- hosting `active` → the GitHub Pages URL of `index.html`, which Pages serves at the repo root
  (`https://<user>.github.io/<repo>/`) — the real one, not a template of one;
- hosting on `fallback` → the local file path (`<repo>/index.html`) plus one sentence on how
  to open it: double-click the file, or ask me to start a local preview server and I will hand
  you a `localhost` address.

**(b) What the page is.** Say it exactly like this, in your own sentence structure but with
nothing dropped:

> This page is the state view of the pipeline. The phase you are in is derived from the files
> on disk, the `/dsf:check` verdicts and the git tags — never declared — and the page shows the
> criteria each phase is verified against and the prompt to send next. The page tracks state;
> the chat executes.

**(c) The first move.** Name it as one action: open the page, read the **How this works**
section, then type `/dsf:brief`.

Also report, briefly and above all that: which tools are `active`, which are on `fallback`, and
the hosting outcome. No next-step menu, no options list — one link, one explanation, one move.

## Recovery prompts

Use these on yourself when this phase drifts; offer them to the user verbatim when they see the
drift first.

```
You recorded a tool as active without evidence. Show the detection result for
each row of toolbox.md, or set the row to fallback.
```

```
You left rows on [?] after init ran. [?] means "not yet checked" — check them,
or record why they cannot be checked and set them to fallback.
```

```
You skipped the fallback wording. For every fallback row, write into "Rules for
later phases" what later phases must do instead, in operational words.
```

```
You pushed without checking hosting. Read toolbox.md: if hosting is not active,
commits stay local.
```

```
You edited index.html outside the pipeline-data block (or edited assets/), or
created a second pipeline template. Restore the shipped files and rewrite only
the JSON block.
```

```
You hard-coded a status in the dashboard. Every status is derived from artifact
presence plus the results file plus the tag — re-derive and rewrite the block.
```

```
You ended without handing over the project page. Repeat the close: the link,
what the page is, and the first move.
```

```
Nothing landed in .design/progress/phase-0.md. Append the line for every step
you actually ran — id, step name, date and time, files touched, and the gate
answer in my own words — then make the dashboard's steps object match it.
```
