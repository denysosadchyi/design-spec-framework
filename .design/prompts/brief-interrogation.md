<!--
Built-in fallback prompt.
Used by /dsf:brief step 2 when the `obra/superpowers` brainstorming skill is not
installed. Read `.design/memory/toolbox.md` first — if the skill is active, invoke
it question-first and ignore this file.
-->

# Fallback — question-first brief interrogation

The brief is the only artifact every later prompt reads. It is produced by **questioning, not
by drafting**. Until the human approves the played-back brief in chat, **you write nothing** —
no file, no folder, no commit, no draft "to save time".

## The five laws of this pass

1. **Ask, do not fill.** Never answer a question on the human's behalf, however obvious the
   answer looks from the seed.
2. **Small batches.** 3–5 questions at a time, one area at a time. A twenty-question form gets
   twenty shallow answers.
3. **Feed answers forward.** Each batch builds on the last one's answer instead of restating
   it. If they said "people moving cities", the next batch asks about that situation — it does
   not re-ask who the audience is.
4. **`[?]` beats a plausible guess.** If the human says "you decide", write the answer as
   `[?]` plus your **explicit hypothesis**, say you have marked it, and move on. A hypothesis
   that is labelled can be tested in phase 2; a guess that reads as fact cannot.
5. **Push back once, then record.** "Everyone" is not an audience, "make it good" is not a
   success criterion. Say why, offer a sharper version, and if the human insists, record their
   answer as given — it is their product.

## Areas to cover

Do not leave an area until it is answered concretely or explicitly `[?]`.

### 1 — Audience

Who specifically, and in what **situation** do they arrive? Push back on demographics: you want
behavior and circumstance. What triggers them to look for something like this at all? How often
does that situation occur?

### 2 — Problem

What breaks in the way this is handled today? Whose problem is it — the user's, the business's,
or both? What happens if nothing gets built? What is the cost of the current friction, in
whatever unit the human actually feels it?

### 3 — Current alternatives

**What are they doing instead, right now?** Name the actual products, spreadsheets, group chats
or phone calls. "Nothing" is almost never true — find the workaround. This answer is what
phase 2 turns into the soft-competitor group, so it must be concrete enough to search for.

Also: what do they like about the workaround? Anything a new product has to beat.

### 4 — Platform

Mobile web, desktop web, native app, mobile-first then adaptive? Which is **primary**, and why
— from the situation in area 1, not from preference. This decision constrains every phase after
it, so make the human own it out loud. Record what is explicitly out of scope for v1.

### 5 — Constraints

Deadline, team, budget, legal or regional limits, an existing brand or design language that
must be respected, hard technical fences, integrations that already exist, and anything
explicitly declared out of scope.

### 6 — Success criteria

How do you know in three months that this worked? Turn every adjective into an observable
signal — something a person could actually check. If a criterion cannot be observed, say so and
ask for a replacement. Ask for the counter-criterion too: what result would tell you it did
**not** work?

### 7 — Taste teaser

A short teaser only — the full recorded-taste gate belongs to `/dsf:concept`, and this is not
the place to design. Ask for:

- two or three **named products** whose feel they admire (names, not adjectives);
- one or two **anti-references** — including the obvious first reflex for this category.

Record them verbatim in the brief under "Taste (teaser)" so phase 5 starts from something
rather than from nothing.

Also capture, briefly: **product name**, a one-line pitch, and any anti-goals ("this is not X").

## Play back — HUMAN GATE

Assemble what you heard into a short structured block **in chat**:

```
Name · one-line pitch
Audience — situation and current behavior
Problem — what breaks, whose problem, cost of doing nothing
Alternatives today — named
Platform — primary, and what is out of scope
Constraints — deadline, team, legal, brand, technical
Success criteria — observable signals, plus the counter-signal
Taste (teaser) — likes, anti-references
Anti-goals — this product is not …
Open questions — every [?] with its hypothesis attached
```

Then **stop**. Do not create files, folders or commits until the human approves or corrects.
A correction reopens step 2 **for that area only** — do not re-interrogate everything.

## Failure modes to watch in yourself

- You wrote the brief in your head and the questions are rhetorical confirmations of it.
- You accepted a demographic ("25–35, urban") as an audience answer.
- You accepted an unobservable success criterion ("users love it").
- You resolved a `[?]` in the playback because the block read better without it.
- You started the folder scaffolding while the human was still answering.
- The brief grew past one screen — later phases add the detail; this one must not pre-empt them.
