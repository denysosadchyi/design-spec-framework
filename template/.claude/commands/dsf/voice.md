---
description: Phase 5a — give the product one voice: copy inventory, voice principles, dictionary, microcopy rules, then rewrite every screen.
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
recorded fallbacks — if a browser/fetch tool is not installed, use the fallback noted there
rather than skipping the data.

---

## Step 1 — Copy inventory

Write nothing new until the existing copy is visible in one place.

Read every `wireframes/*.html`. Collect all interface copy into one table with columns:
**screen · zone · string · string type** (heading, button, field label, state message).

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
> the change of register before the rest of the screens are rewritten.

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

## Step 8 — Close the phase

1. Run the phase checklist in `.design/checklists/phase-5-language.md`; report each criterion as
   pass / fail with the file that proves it, and fix fails before continuing.
2. Update `CLAUDE.md` — the Voice context block: `voice/voice.md` is the contract for any
   product string, `voice/microcopy.md` is the source of truth, new copy is written from the
   rules and never from mood, user-generated content is out of scope.
3. Update `README.md` — a Voice section with links to both files.
4. Regenerate `pipeline.html`.
5. Commit. Push according to `.design/memory/toolbox.md`.

> **HUMAN GATE — phase sign-off.** After the checklist passes, ask the human to confirm,
> then suggest tagging the commit `phase-5-voice`.

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
