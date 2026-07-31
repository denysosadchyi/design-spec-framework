---
description: Phase 5a — give the product one voice: keyed copy inventory, voice principles, dictionary, microcopy rules, rewrite every screen, and render voice/voice.html.
---

# /dsf:voice

The screens already say real words, but those words were written alongside the structure, in
whatever wording came first. This phase gives the product **one voice**: `voice/voice.md` is
the contract, `voice/microcopy.md` becomes the single source of copy truth, and every screen
is rewritten in one pass. Structure and markup are not touched.

Voice is **rules, not mood**. An adjective ("friendly, expert, simple") cannot write a
button. Every principle carries a rule, an example, a counter-example and the line of data
it comes from. Tone is set by state: an error does not joke, an empty state leads to an
action, a success does not celebrate.

## Prerequisites

| Artifact | Missing → run |
|---|---|
| `wireframes/*.html`, `wireframes/_screens.md` | `/dsf:wireframes` |
| `people/personas.md`, `people/jtbd.md` | `/dsf:users` |
| `research/research.md` | `/dsf:research` |

Read `.design/memory/constitution.md` and `.design/memory/toolbox.md` first. Honor the
recorded fallbacks — if a browser/fetch tool is not `active`, use the fallback noted there
rather than skipping the data.

Also read `.design/progress/phase-5.md` — this command's own ledger (shared with
`/dsf:concept`). Before step 1, report what you will skip, redo or resume based on it, then
proceed only after stating that.

---

After completing each numbered step and each HUMAN GATE, append the ledger line to
`.design/progress/phase-5.md` and update the `steps` object in the pipeline-data block
(current → done).

## Step 1 — Copy inventory

Write nothing new until the existing copy is visible in one place.

Start from `.design/templates/microcopy.md` and keep its sections and columns.

Read every `wireframes/*.html`. Collect all interface copy into one table with columns:
**key · screen · zone · string · string type** (heading, button, field label, state message).

**The key scheme is `<screen>.<zone>.<element>`** — lowercase latin, dots as separators,
no spaces: `listings.filters.submit`, `listings.empty.body`, `request.form.error-phone`.

- The screen segment is the file name of the base page without `.html`; a state page uses
  the base screen plus the state as the zone (`listings.empty.title`).
- **A key is stable across rewrites.** It names the slot, never the wording — renaming a key
  because the text changed defeats its purpose. The string changes; the key does not.
- One string, one key. If the same key would be needed on two screens, the string belongs to
  a shared zone (the shell, a component) — key it there and reference it.
- Keys are referenced downstream: phase 10's behavior spec points at `microcopy.md` keys
  instead of quoting UI strings, so a key that moves breaks the handoff.

Every row gets a key in this step, before any rewriting.

Then mark — do not rewrite — where screens say the same thing differently:
- the same object under different names across screens;
- the same action with different button labels ("Send" here, "Submit" there, "Next" elsewhere);
- AI clichés and forced cheer: "Oops, something went wrong", "Welcome!", stray exclamation
  marks, emoji in system messages;
- leftover placeholder text.

Mark separately every string that is **user-generated content** — titles, descriptions,
messages people write themselves. We do not influence that copy and never rewrite it.

Save the table to `voice/microcopy.md`. For now it is only a transcript of what exists; by
the end of this phase it becomes the source of truth every product string is checked against.

## Step 2 — Voice principles

Start `voice/voice.md` from `.design/templates/voice.md` and keep its sections.

Read `research/research.md`, `people/personas.md`, `people/jtbd.md` and `CLAUDE.md`.
Formulate **3–5 principles** — the rules by which the product speaks. Each principle carries:

- **rule** — one sentence describing how the product speaks;
- **example** — one or two interface strings written by the rule;
- **counter-example** — one or two strings that break it;
- **source** — the line of `personas.md`, `research.md` or the competitor language section
  the rule follows from.

Derive part of the set from **competitors' language**: where everyone writes the same way,
that sameness is where voice creates difference. If the research has no samples of
competitor language, fetch 10–15 real strings from real competitor surfaces first and add
them to `research/research.md` under "Competitor language", then derive from them.

Weigh the context of the product — what is at stake for the user decides whether wit is
affordable at all. Specificity beats promotion.

Take no principle without a source line: three honest ones beat five pretty ones.
Save to `voice/voice.md`, section "Principles".

## Step 3 — Dictionary and banned list

No new research here: step 1 already marked every drift. This step is decisions.

Add two sections to `voice/voice.md`.

**Dictionary — one concept, one word:**
- for each drift marked in `microcopy.md`, decide which term stays;
- for each term, a short note on why that one — in the language of the personas and the
  research, not in officialese;
- fix the form of address and use it identically on every screen; record which borrowed
  foreign words are allowed and which are not.

**Banned — what we never write**, each entry with a before/after example:
- the AI clichés marked in the inventory;
- motivational tone;
- stray exclamation marks, emoji in system messages, the word "successfully".

Take terms from the language of the personas and the research; invent none. Without this
list, the model default — enthusiasm, exclamation marks, emoji — returns with every new prompt.

## Step 4 — Microcopy rules

Read `voice/voice.md` and `wireframes/_screens.md`. Add the last section, "Microcopy" —
rules by element type, each with one example from this product:

- **button** — an action verb whose result is visible ("Send request", not "OK" or "Next");
- **screen heading** — what this place is, in dictionary words;
- **form field** — the label says what to enter, the hint says how, the validation error
  says exactly what to fix;
- **empty state** — why it is empty and what to do next;
- **error** — what happened and what to do; no apologies, no jokes;
- **loading** — silent, or says exactly what is loading;
- **success** — the fact and the next step; no celebration;
- **destructive action** — before the click, say what will happen and what cannot be undone.

Check every rule against the principles and the dictionary above. After this step
`voice/voice.md` is complete: every product string is written from it.

## Step 5 — Sample: the main screen

Read `voice/voice.md`, `voice/microcopy.md` and the main screen together with its state
pages (`-empty`, `-error`, `-loading`). Rewrite the **product copy** on those pages:

- headings, filters, buttons, field labels, state messages;
- leave user-generated content untouched — those strings are marked in `microcopy.md`;
- terms only from the dictionary; remove everything on the banned list;
- state tone per the "Microcopy" section: empty leads to an action, error says what to do,
  success does not celebrate;
- do not touch structure or markup — only the text changes.

In `voice/microcopy.md`, update the rows for those pages: add **before** and **after** columns.

> **HUMAN GATE — sample sign-off.** Show the before/after table and stop. The human reviews
> the change of register before the rest of the screens are rewritten. Append their answer to
> `.design/decisions.md` (constitution rule 7 — every gate leaves a trace).

## Step 6 — Fan-out to every screen

Read `voice/voice.md`, `voice/microcopy.md` and the approved main screen — that is how the
copy sounds now. Rewrite the copy of **the remaining screens**. Fan out to subagents, one per
screen with all of its state pages. Give each subagent, in its task:

- what to read: `voice/voice.md` (the contract) and the main screen (the reference);
- what to do: rewrite the product copy on its screen — headings, buttons, fields, states;
  terms from the dictionary, everything banned removed; do not touch structure, and do not
  touch user-generated content (marked in `microcopy.md`);
- what to return: its rows for `microcopy.md` — screen, zone, before, after.

When every agent is done, merge their rows into `voice/microcopy.md` and run the consistency
check: the same action on different screens must carry the same label — if the button is
called "Send request", it is called that everywhere. Report mismatches as a table.

## Step 7 — Critique → prioritize → fix

Review the copy of every `wireframes/*.html` against `voice/voice.md` and
`voice/microcopy.md`. Build a defect table with columns **screen · string · what is wrong ·
how to fix**, looking for:

- a term that is not in the dictionary;
- the same action labelled differently on different screens;
- banned material leaking back — clichés, exclamation marks, emoji, "successfully",
  motivational tone;
- state tone off the rule — an error joking, an empty state with no exit, a success celebrating;
- a string on a screen that is missing from `microcopy.md`, or the reverse.

> **HUMAN GATE — defect prioritization.** Output the table only, fix nothing. The human
> reviews it and sets the order.

Then walk the ordered table and fix everything — the screens and `voice/microcopy.md`
together, so the table stays the source of truth. No string exists on a screen and not in
the table.

## Step 8 — `voice/voice.html`

The contract has to be **viewable**, not only readable in Markdown: this is the page a
client, a writer or a new developer opens to hear the product. Build `voice/voice.html`
from the finished `voice/voice.md` and `voice/microcopy.md` — a single self-contained page,
same dark, quiet styling as `research.html` and `personas.html`, no CDN dependencies.

Four blocks:

1. **Principles** — one card per principle: the rule as the heading, then the **example**
   and the **counter-example** side by side as a pair, visibly opposed (written this way /
   never this way), with the source line printed underneath. A principle without its pair
   on the page is not shippable.
2. **Dictionary** — the chosen term, the rejected variants struck through, and the one-line
   reason.
3. **Banned** — what we never write, each entry with its before/after example.
4. **Microcopy, before and after** — a table with columns **key · screen · before · after**,
   drawn from `voice/microcopy.md`. This is the evidence that the register actually changed;
   keep the strongest rows first rather than dumping every row of the file.

The page is generated from the two Markdown files, never hand-written beside them — if they
disagree, the Markdown wins and the page is regenerated.

## Step 9 — Close the phase

1. Run the phase checklist in `.design/checklists/phase-5-language.md`; report each criterion as
   pass / fail with the file that proves it, and fix fails before continuing.
2. Update `CLAUDE.md` — the Voice context block: `voice/voice.md` is the contract for any
   product string, `voice/microcopy.md` is the source of truth keyed as
   `<screen>.<zone>.<element>`, new copy is written from the rules and never from mood,
   user-generated content is out of scope.
3. Update `README.md` — a Voice section with links to both files and to `voice/voice.html`.
4. Update `pipeline.html` — edit **only** the `<script id="pipeline-data">` JSON block: the
   phase 5 artifact entries for voice, `voice/voice.html` as a live link, and the `steps`
   object. Leave the `context` object as it is; this phase fills none of its keys. Do not
   touch the markup, CSS or scripts around the block.
5. Commit. Push according to `.design/memory/toolbox.md`.

> **HUMAN GATE — phase sign-off.** After the checklist passes, ask the human to confirm.

Do not create a git tag. Phase 5 also contains `/dsf:concept`; once both are done, run
`/dsf:check` — it verifies the checklist and creates the single phase tag `phase-5-language`.
The next command is `/dsf:concept`.

---

## Recovery prompts

```
You wrote a principle as an adjective — "friendly and simple". A button cannot be written
from that. Restate it as a rule: one sentence of rule, an example string written by it, a
counter-example, and the line of personas.md or research.md it follows from.
```

```
Clichés are back in the copy — exclamation marks, emoji, "Welcome!", "successfully". Check
against the Banned section of voice/voice.md and remove them everywhere. Show me a table of
where they were.
```

```
You used a term that is not in the dictionary. Replace it per the dictionary in
voice/voice.md. If the concept is not in the dictionary yet, add it first with a short note
on why that term, then replace.
```

```
The tone of this state is off the rule. Rewrite it per the Microcopy section of
voice/voice.md: an error says what happened and what to do next; an empty state explains why
it is empty and gives an exit action.
```

```
You rewrote the screens but did not update voice/microcopy.md. Update the table: for every
changed string — screen, zone, before, after. The table stays the source of truth: no string
on a screen that is not in the table.
```

```
You touched the markup and the structure of the screen. Restore the structure as it was —
this phase changes text only. Appearance and markup changes belong to the later phases.
```

```
You rewrote user-generated content — that copy belongs to the user, not to us. Restore it.
We rewrite product copy only: screen headings, filters, buttons, state messages.
```

```
You renamed a microcopy key because its text changed. A key names the slot, not the wording
— restore the original key and change only the string. Keys are referenced by the handoff
spec and must survive every rewrite.
```

```
voice/voice.html is missing or out of date. Regenerate it from voice/voice.md and
voice/microcopy.md: principles with their example/counter-example pairs and sources, the
dictionary, the banned list, and the before/after microcopy table.
```
