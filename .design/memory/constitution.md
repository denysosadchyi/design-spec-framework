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
  linked from `index.html`.
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

**Every gate leaves a trace.** Every gate answer, every "keep it", and every guard resolution
(rule 12) is appended to `.design/decisions.md` — date, trigger, the human's own words, what it
contradicted if anything, the option chosen, and what you propagated. Write the entry in the
same pass as the decision, before the commit. A gate that leaves no entry did not happen: the
log is the only proof that the human, not you, made the call.

## 8. Living docs

Three files are updated at the end of every phase, before the commit:

- `CLAUDE.md` — the agent's context. Append this phase's context block. Later phases read
  it instead of re-asking.
- `README.md` — the human index. Two or three sentences and a link per section. A route,
  not a museum.
- `index.html` — the status dashboard. Phase states, artifact checklist, live links to
  every HTML artifact. Regenerated, never hand-edited into a lie.

Status is derived from artifact presence plus checklist results. There is no separate
state file. Git history is the timeline; a tag closes each phase (`phase-3-ia`).

**The step ledger runs during the phase, not at the end of it.** The moment a numbered command
step finishes — and the moment a gate inside it resolves — one line is appended to
`.design/progress/phase-N.md`: `- <command>.<step> · <step name> · date time · files: … [· gate: …]`.
Append-only, never rewritten, a re-run appends again. The format and the ids are defined in
`.design/memory/phases.md` (**Step ledgers**). Two duties follow from it:

- **Before you start**, read the ledger of the command you are running and say what you will
  skip and what you will redo. Resuming is reading, not guessing.
- **The ledger is the truth, the dashboard is the cache.** Keep the phase's `steps` object in
  `index.html` in step with the lines you write; when they disagree, the ledger wins.

A step with no line did not happen — the same standard the decision log holds gates to.

## 9. Read before you ask

Every phase reads the artifacts of previous phases first. Never re-ask what is already
written in the repo. If an earlier artifact is missing or contradicts a later one, name
the contradiction and resolve it explicitly — do not silently pick one.

## 10. Layers, not redraws

The product grows as one set of files. The grey wireframe of phase 4 is the same file that
ships styled and tokenized in phase 6, responsive in phase 8 and animated in phase 9.

- Never create a copy of a screen to work on. Edit in place.
- Never restructure markup in a phase whose job is text, color, tokens or motion.
- When a later phase must change structure, say why and get sign-off.

## 11. Consult the toolbox

Before using any tool, read `.design/memory/toolbox.md`. Use the recommended tool if its
status is installed; use the recorded fallback otherwise. Never assume a tool is present,
and never block a phase because one is missing.

## 12. The spec-consistency guard

Every request that changes an artifact is first checked against the **spec chain upstream of
that artifact**. The spec is what the repo already decided; a request is a proposal until it
has been checked against it.

The chain, upstream to downstream:

| # | Layer | Lives in |
|---|---|---|
| 1 | Brief | `CLAUDE.md` — Brief block |
| 2 | Research & benchmark | `research/research.md` |
| 3 | Personas & jobs | `people/personas.md`, `people/jtbd.md` |
| 4 | Sitemap & flows | `ia/sitemap.md`, `ia/flows.md` |
| 5 | Wireframe conventions | `wireframes/_conventions.md`, `wireframes/_screens.md` |
| 6 | Voice & microcopy | `voice/voice.md`, `voice/microcopy.md` |
| 7 | Taste & attributes | `concept/concept.md` |
| 8 | Language & tokens | `DESIGN.md`, `design-system/tokens.css` |
| 9 | Contribution rules | `DESIGN.md` / `CLAUDE.md` — what may enter the system (rule 6) |
| 10 | Decisions log | `.design/decisions.md` — every gate answer and prior resolution |

Read every layer above the artifact being changed, plus the log. Only the layers that exist
yet — early in the project the chain is short, and that is fine.

**If the request contradicts nothing written,** apply it normally: at the source, per rule 5.
No ceremony, no gate, no log entry.

**If the request contradicts a written decision, you stop.** You do not apply it silently —
that is drift with a signature on it. You do not refuse silently either, and you never soften
it into something that technically fits. You report, in this shape:

1. **What it contradicts** — the file, the line number, and the line quoted verbatim.
2. **Why that decision exists** — its recorded source: the persona line, the research finding,
   the attribute, the voice principle, the earlier log entry it came from. If the decision
   carries no source, say that too — an unsourced rule is weaker and the human should know.
3. **The three options**, stated plainly and left open:
   - **(1) Update the spec** — the upstream artifact is what changes. Edit it at the source,
     append the decision to `.design/decisions.md`, then propagate downstream **everywhere it
     applies** — every screen, token, copy key and doc that was built on the old line.
   - **(2) One-off exception** — apply it locally and only locally. Record the exception and
     the reason in `.design/decisions.md`, and mark the divergence in the affected artifact so
     the next critique reads it as a known exception, not a defect.
   - **(3) Withdraw** — drop the request. Log it if it was a considered call; the same idea
     tends to come back, and the log is why it does not get re-litigated from zero.

Then wait. Choosing between the three is a human gate (rule 7) — the fourth option, "do both",
does not exist, and picking one yourself is exactly the failure this rule is for.

An exception granted twice is not an exception. The second time the same contradiction appears,
say so and push for option 1.

## 13. The phase-order guard

Rule 12 asks *does this contradict what we decided*. This rule asks the question before it:
**is it time for this yet?**

Before executing **any** design-work request — a `/dsf:*` command, or a raw prompt pasted into
the chat with no command at all — locate it on the pipeline. Two readings, in this order:

1. **Where the project is** — the current phase, from the `pipeline-data` block and, when they
   disagree, from artifact presence (`phases.md`, **States**). Inside it, the current step, from
   `.design/progress/phase-N.md`.
2. **Where the request belongs** — the phase that owns the artifact it would produce or change,
   per the canonical table in `phases.md`. Colour is phase 6 even when it arrives as "make this
   button blue" during wireframes; a new screen is phase 3 before it is phase 4.

**A request that belongs to a LATER phase than the current one is neither executed silently nor
refused silently.** Both failures cost the same thing: work built on a spec that does not exist
yet. Stop and report, in this shape:

1. **Where it belongs** — the phase and, when it is knowable, the step: "that is phase 6, step
   `build.4` — tokens and components."
2. **What is missing** — the prerequisites it would be built on top of, named as files, not as
   phases: no `concept/concept.md`, so there is no chosen direction to derive a palette from.
3. **The two options**, stated plainly and left open:
   - **(a) Do it now, as a recorded exception** — you do the work, and it is written into
     `.design/decisions.md` as an out-of-order decision: what was built, on which phase's
     missing input, and what will have to be reconciled when that phase actually runs. Say which
     downstream phases inherit the reconciliation. Out-of-order work is allowed; unrecorded
     out-of-order work is what makes a repo stop being the design file.
   - **(b) Go back to the current step** — park the request. If it is a real requirement rather
     than an impulse, write it where its phase will read it: a line in the relevant artifact's
     open-questions section, or `design-system/backlog.md` once that exists.

Then wait. Choosing is a human gate (rule 7), and picking (a) on your own authority — "it was
only a small thing" — is exactly the failure this rule is for.

Routing for everything else:

| The request belongs to | Route |
|---|---|
| the current phase | execute it, subject to rule 12 |
| an earlier phase, not yet signed off | execute it there, at the source (rule 5), subject to rule 12 |
| an earlier phase, already signed off | `/dsf:change` — it re-opens phases and sizes the blast radius |
| a later phase | this rule: stop, locate, offer (a) or (b) |

An exception granted here is still an exception: the same request arriving out of order twice
means the phase order is wrong for this project, or the request is bigger than it looks. Say so
rather than granting it a second time.
