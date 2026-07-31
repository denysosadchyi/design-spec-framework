---
description: "Phase 9 — Motion: add motion as a system layer: motion tokens, an inventory where every movement does one of three jobs, micro-interactions in components, tone-matched state transitions, transform/opacity budget and reduced-motion."
---

# /dsf:motion — Motion

Motion is a **layer of the system**, not cosmetics on top. The easy way to "bring a product
to life" is to scatter effects: cards bounce in sequence, icons spin, pages slide
dramatically. That reads as wow in a demo and as noise in daily use — it stands between the
person and the task.

One rule governs everything below: a movement is added **only if it does one of three
jobs**.

| Job | Example |
|---|---|
| **Connect states** | the detail slides out of the list, so the eye knows where it came from |
| **Show status** | the skeleton pulses while loading is in progress |
| **Answer an action** | the button responds to the press |

A movement doing none of these is confetti and goes under the knife. Same discipline as
semantic tokens with no use and patterns with fewer than three screens.

---

## Prerequisites

| Required | Produced by | If missing |
|---|---|---|
| `design-system/tokens.css`, `components/` with states (hover, active, focus-visible, disabled) | `/dsf:build` + `/dsf:system` | run those first |
| Adaptive layer: breakpoint tokens, `split-view` pattern (phase 8, signed off) | `/dsf:responsive` | run `/dsf:responsive` first, and close it with `/dsf:check 8` |
| `voice/voice.md`, `voice/microcopy.md` | `/dsf:voice` | run `/dsf:voice` first |
| `ia/flows.md`, `wireframes/*.html` with state pages | `/dsf:ia`, `/dsf:wireframes` | run those first |
| `DESIGN.md`, `design-system/docs/` | `/dsf:build`, `/dsf:system` | run those first |

Motion animates transitions **between states**, so states must exist first. If components
have no states, stop: `/dsf:system` comes before this command.

**Read before acting:** `.design/memory/constitution.md` (rule 5 — the fix lives at the
source; rule 6 — new enters the system first) and `.design/memory/toolbox.md`. Live motion
review needs a browser: Playwright MCP if active, the human's own browser otherwise —
motion is only visible in motion, never in code. Where `impeccable` is not active, the
critique and audit passes below run the built-in fallback prompts
`.design/prompts/critique.md` and `.design/prompts/audit.md`.

Also read `.design/progress/phase-9.md` — this command's own ledger. Before step 1, report
what you will skip, redo or resume based on it, then proceed only after stating that.

---

## Steps

After completing each numbered step and each HUMAN GATE, append the ledger line to
`.design/progress/phase-9.md` and update the `steps` object in the pipeline-data block
(current → done).

### 1 — Motion tokens

Add a motion level to `design-system/tokens.css` as primitive tokens:

- durations: `--dur-fast` (micro-answer: hover, press), `--dur-base` (transitions inside a
  component), `--dur-slow` (an element entering) — **three, not ten**;
- easing: `--ease-standard` for most things, `--ease-enter` and `--ease-exit` for appearance
  and disappearance;
- distances: `--move-sm`, `--move-md`.

Values stay moderate. This is an interface, not a presentation.

If a button had its own 150 ms and a field its own 200 ms, the product would move out of
sync and no change of tempo would ever be systemic. Through `--dur-fast` every micro-answer
is synchronized and the tempo is one line in `tokens.css`.

Add a **"Motion"** section to `DESIGN.md`: the three jobs, and the rule that a movement
without one of them is not added.

### 2 — Motion inventory

Read `ia/flows.md` and every `wireframes/*.html` including the state pages. Write
`animations/motion-inventory.md` — start from `.design/templates/motion-inventory.md` and
keep its sections and columns: `moment (screen, action) · which of the three jobs this
movement does · which component owns it`.

A moment with no named job **does not enter the table** — there will be no motion there.

Animate nothing in this step. Render `animations/motion-inventory.html` from the table.

> **HUMAN GATE — inventory sign-off.** Present the table. The human decides which moments
> are worth it before any motion is written. Append their decision to `.design/decisions.md`
> (constitution rule 7 — every gate leaves a trace).

### 3 — Component micro-interactions

Read the inventory and `design-system/components/`. Add micro-interactions to the states
built in `/dsf:system`: hover, press (`:active`), focus, appearance. Every one through
motion tokens — never a hand-written number.

- Motion lives in the component, not in the screen. Animate the button once, it works
  everywhere the button stands.
- hover and press answer at `--dur-fast`; an element entering uses `--dur-base` or
  `--dur-slow`.
- The skeleton pulses while loading (job: status) and fades out smoothly when content
  arrives.

Update the components' `docs/` pages: show the micro-interaction live, so the reader sees
which job it does.

### 4 — State transitions in the voice's tone

Read `voice/voice.md` and the inventory. Add transitions between screen states — empty,
loading, success, error — **in the tone the voice defines**, not the default.

- error appears calmly and does not bounce cheerfully;
- success gets a warm, short movement;
- loading is steady, never twitchy;
- the list → detail transition in `split-view` shows the connection: the detail slides out
  of the list side, it does not appear from nowhere.

Motion agrees with microcopy. If the error text is calm and the screen springs in
dramatically, the person believes neither. Tone mismatch between text and movement is a
defect, not a style choice.

### 5 — Budget and reduced-motion

Walk every animation in the product and bring it inside the performance budget.

- **Only `transform` and `opacity` are allowed.** They do not force the browser to
  recalculate layout every frame. Find animations on `width`, `height`, `top`, `left`,
  `margin` and convert them to `transform` — same appearance, cheap mechanics.
- Add a **global `prefers-reduced-motion: reduce` block**: all transitions become instant or
  near-instant, only the state change remains, without travel. This is not an option, it is
  an accessibility obligation — for some people on-screen movement causes nausea and
  vertigo (vestibular disorders), and the system setting is their setting. A product that
  ignores it is unusable for them. Same respect as visible focus.

Add a **"Motion budget"** section to `DESIGN.md`: transform/opacity, three durations,
mandatory reduced-motion.

### 6 — Critique in motion

Fan out to subagents by screen group (the role groups from earlier phases). Each opens the
screens **in a live browser** and watches the motion run: does every animation do the job
the inventory named, do identical moments share a duration, does reduced-motion actually
take effect.

Also run `/impeccable critique` focused on motion (fallback: `.design/prompts/critique.md`).
Subagents return findings, not fixes.

> **HUMAN GATE — the human watches too.** Motion is only visible in motion. The human opens
> the screens before prioritizing.

### 7 — Defect table and fix

Merge into ONE table: `component or screen · what is wrong · how to fix`. Hunt for:

| Defect | What it looks like |
|---|---|
| Motion without a job | an animation with no row in the inventory (connect / status / answer) |
| Drifting durations | a button hover of 120 ms here and 300 ms there |
| Layout animation | `width` / `height` / `top` / `left` animated instead of `transform` |
| Missing reduced-motion | movement that survives the system's "reduce motion" |
| Tone mismatch | a calm error with a bouncy animation |

Also run `/impeccable audit` (fallback: `.design/prompts/audit.md`).

> **HUMAN GATE — prioritization.** Table only. The human orders it. Then fix. Append their
> priorities to `.design/decisions.md`.

Fix at the source: tempo → the `--dur-*` token; micro-interaction behavior → the component.
Never in a screen — an animation in a wireframe is debt, because the same button will then
move differently in different places.

---

## Phase checklist

Verify against `.design/checklists/phase-9-motion.md` (or run `/dsf:check 9`):

- [ ] `tokens.css` — three durations, `--ease-*` curves, `--move-*` distances; moderate values
- [ ] `DESIGN.md` has a "Motion" section with the three jobs and the "no job, no motion" rule
- [ ] `animations/motion-inventory.md` — every moment names its job and its owning component
- [ ] No animation exists without a row in the inventory
- [ ] Micro-interactions (hover, press, focus, appearance) live in components, through tokens; no hand-written durations
- [ ] Skeleton pulses on loading and fades out when content arrives
- [ ] State transitions follow `voice.md`; error does not bounce; motion agrees with microcopy
- [ ] Only `transform` / `opacity` animate anywhere in the product
- [ ] Global `prefers-reduced-motion` verified with the system setting actually on
- [ ] Identical moments share a duration; `animations/motion-inventory.html` linked from `index.html`

## Close the phase

1. `CLAUDE.md` — update the **Motion** context block: motion token names and roles, the three
   jobs rule, where micro-interactions live, the reduced-motion policy.
2. `README.md` — the **Motion** section: two or three sentences and links to
   `animations/motion-inventory.md` and the `DESIGN.md` motion sections.
3. Update `index.html` — edit **only** the `<script id="pipeline-data">` JSON block:
   phase 9 status, its artifact entries, `animations/motion-inventory.html` plus the
   docs pages showing live micro-interactions as live links, and the `steps` object. Leave
   the `context` object as it is; this phase fills none of its keys. Do not touch the
   markup, CSS or scripts around the block.
4. Commit naming the phase. Push if the toolbox records a remote.

> **HUMAN GATE — phase sign-off.** Checklist passes and the human confirms.

Do not create a git tag. Run `/dsf:check 9` to close the phase — it verifies the checklist
and creates the phase tag `phase-9-motion`. The next command after that is `/dsf:handoff`
(phase 10).

---

## Recovery prompts

Copy-paste when something went the usual wrong way.

**Confetti.**
```
Go through every animation in the product and name which of the three jobs it does — connect,
status, or answer. Anything with no answer, remove. Give me the list before deleting.
```

**Ignored reduced-motion.**
```
Add a global prefers-reduced-motion: reduce block that drives every duration to near zero and
removes travel. Then list the moments where motion still survives the setting.
```

**Layout animation.**
```
Find every animation and transition touching width, height, top, left or margin and convert
them to transform. Same appearance, cheap mechanics. Report which components changed.
```

**Duration drift.**
```
Group every animation by role (hover, press, appearance, state change) and show the durations
used in each group. Any group with more than one value gets collapsed onto the right --dur-*
token.
```

**Tone mismatch.**
```
Compare each state transition against the tone in voice/voice.md and the text in
voice/microcopy.md. List the moments where the movement contradicts the words, and fix the
movement, not the words.
```

**Motion in a screen.**
```
Find every duration, transition or keyframe written inside wireframes/*.html and move it into
the owning component through motion tokens. Screens hold no motion.
```
