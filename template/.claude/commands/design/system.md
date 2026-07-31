---
description: Phase 7 — System. Turn the kit into a design system others can use: single entry point, live showcase docs, component states in both themes, patterns, contribution rules, new-screen self-sufficiency test, deployed showcase.
---

# /design:system — Phase 7 · System

Phase 6 produced tokens and components. That is a set of files, not a system. The next person who opens the repo — a developer, you in a month, the agent in a fresh session — cannot tell **which button variants exist, when to reach for card A instead of card B, what keyboard focus looks like**. Those answers live in your head, not in the code.

A design system is **a separate product with its own users**. Its headline feature is a **live showcase that cannot lie about the product**, because it is the same code. Its growth rule: **new enters the system first, then the screen — never the other way around.**

This phase is not cleanup. It is a new visible artifact — showcase, documentation and states that did not exist before.

---

## Prerequisites

| Artifact | Missing → run |
|---|---|
| `design-system/tokens.css` (primitive + semantic), `design-system/components/*.css` + `index.css` | `/design:build` |
| `ui/inventory.md`, `ui/kit.html`, `ui/shell.html` | `/design:build` |
| `DESIGN.md` | `/design:build` |
| all `wireframes/*.html` assembled from the kit | `/design:build` |
| `people/jtbd.md` | `/design:users` |
| `voice/microcopy.md`, `concept/concept.md`, `concept/references.md` | `/design:voice`, `/design:concept` |

## Read first

1. `.design/memory/constitution.md` — the engine rules bind every step.
2. `.design/memory/toolbox.md` — branch accordingly:
   - `impeccable` skill → `/impeccable audit`, `/impeccable critique`. Not installed → `.design/templates/audit.md`, `.design/templates/critique.md`.
   - Hosting → GitHub Pages for the showcase; fallback: the recorded git host + local static server, with the URL/path written into `README.md` either way.
3. `CLAUDE.md`.

---

## Steps

### 1. Structure: one package, one entry point

Consolidate everything the system owns under `design-system/`:

- `tokens.css` and `components/` live in `design-system/`. Anything still sitting at the repo root or under `ui/` is **moved, not copied** — after this step there is exactly one copy of each file, and git remembers where it was.
- Add `patterns/`, `docs/`, `examples/` — empty for now.
- Create `design-system/index.css` importing `tokens.css` and `components/index.css` — **a single entry point** for everything that consumes the system.
- The product now consumes the system as a package: every `wireframes/*.html`, `ui/shell.html` and `ui/kit.html` links `design-system/index.css` instead of the individual files.

**The look must not change.** Any visual difference is a wiring defect — fix the import, not the screen.

### 2. Live documentation

The system's headline feature. Read `design-system/components/`, `ui/inventory.md`, `DESIGN.md`, `voice/microcopy.md`, `concept/concept.md`, `concept/references.md`.

One HTML page per component in `design-system/docs/`, plus `docs/index.html` collecting them into a showcase. Each component page has four parts:

- **Anatomy** — the live component with its parts labelled.
- **Variants and sizes** — all of them, from `ui/inventory.md`, side by side.
- **When to use** — a paragraph from `DESIGN.md` and `microcopy.md`: what role this component plays in the product.
- **Rule and anti-rule** — one example of correct use, one example of when to reach for a different component instead.

Components on these pages are **not screenshots and not copied code** — they are the live thing, rendered by the same `design-system/index.css` the product links. **That is what makes the showcase unable to lie.**

Also build `docs/why.html` — "why the system looks like this": the visual language from `concept.md` and `references.md`, and where it came from. This is the answer to a new developer's first question.

### 3. Component states — in both themes at once

Components currently have a base look only. Give each of them four states: **hover, active, focus-visible, disabled**.

- States go through **new semantic tokens** in `design-system/tokens.css` — `--bg-hover`, `--color-focus`, `--opacity-disabled` and whatever the components actually need.
- **Every state token gets a value in both themes at the same time**: in the light block and in `[data-theme="dark"]`. **A token with a value in only one theme is a defect** — in the other theme the focus ring goes invisible and the product cannot be used without a mouse.
- `:focus-visible` shows a visible ring on keyboard navigation, `--color-focus` contrasting against its background at **WCAG AA in both themes**.
- `hover` and `active` change background, color or border only — they never move the element or change its size.
- `disabled` mutes through `--opacity-disabled` and drops the pointer cursor; it is never hand-repainted.

In `docs/`, add a **"States" block to every component page**: all four states side by side, in light and dark, so it is visible that the focus ring is alive everywhere.

### 4. Patterns

A component is one brick (card, button). A **pattern** is a stable composition of bricks that repeats: a list header with a filter, a listing card in a feed, an empty state with an action.

Read all `wireframes/*.html` and find compositions that stand on **three or more real screens**. Each one goes to `design-system/patterns/`: one file per pattern, **assembled from existing components, no new styles**. Add a patterns page to `docs/`: when to take the pattern, when to take separate components.

**Do not invent patterns.** A pattern exists only if you can name the three screens where it already stands. Everything else is cut.

### 5. Contribution rules

A system stays alive when it has a growth rule written in code, not agreed in chat.

Add a **"Contributing to the system"** section to `DESIGN.md` and `CLAUDE.md`:

- **New enters the system first, then the screen — never the other way around.**
- A new component goes to `design-system/components/` with a `docs/` page and states in both themes.
- A new composition goes to `patterns/`.
- A new value goes to `tokens.css` at the matching level (color through a semantic role with a source comment; geometry as a primitive).
- Update the **"keep it"** rule so it now routes into the system: *value edit → the token; component edit → `components/` plus its `docs/` page; new composition → `patterns/`.*

Write it so the next developer, or the agent in a fresh session, reads the rules from the repo instead of asking.

### 6. New-screen test

Self-sufficiency check. Take a screen that does not exist yet but that one of the jobs in `people/jtbd.md` asks for. Assemble it **entirely from `design-system/`** — existing components and patterns only, tokens only, **not one new style in the screen itself**.

Keep an honest log: everything that was missing — a component that does not exist, a state nobody anticipated, a token that is absent — goes as a separate list into `design-system/backlog.md`.

**Do not hand-patch the gaps on the screen.** If the system does not have it, that is an order for the system, not an exception for the screen.

The screen stays in `design-system/examples/` as proof that a whole screen can be built from the system without writing styles.

### 7. Defect table, gate, fix, deploy

Check the system and the product together. Table with columns *file · element · what is wrong · how to fix*. Look for:

- **docs↔product drift** — a component looks different in the product than on its `docs/` page;
- **lying documentation** — a `docs/` page describes a variant or state that is not in the code, or the code has one the page does not mention;
- **a state in only one theme** — `focus-visible` or `hover` without a value in `[data-theme="dark"]`;
- **a pattern that grew its own styles** instead of composing components;
- **a component or token without a `docs/` page**;
- a pattern claimed on fewer than three real screens;
- a semantic state token without a source comment or without an AA contrast check.

Run `/impeccable audit` (fallback: `.design/templates/audit.md`) across the system and merge its findings into the table.

> **HUMAN GATE.** Deliver the table only — no fixes yet. The user prioritizes.

Then fix everything, and deploy `design-system/docs/` per `toolbox.md`: **GitHub Pages** so the showcase is a live page at a link (fallback: the recorded host or a local static server). Record the URL in `README.md`.

---

## Phase checklist

Run `.design/checklists/phase-7-system.md` and report each criterion pass/fail. Do not sign off with a failing criterion — fix it or record an explicit exception in `CLAUDE.md`.

## Close the phase

1. Update `CLAUDE.md` — "Design system" + "Contributing to the system" sections, the updated "keep it" routing, the showcase URL.
2. Update `README.md` — "Design system" section: entry point, showcase link, `backlog.md`, `examples/`.
3. Regenerate `pipeline.html`: phase 7 status, showcase link, `docs/why.html` link.
4. Commit (push per `toolbox.md`).
5. On user sign-off, tag: `phase-7-system`.

## Outputs

- `design-system/index.css` — single entry point; product consumes the system as a package
- `design-system/docs/` — per-component pages (anatomy, variants, when to use, rule/anti-rule, states in both themes), `index.html`, `why.html`
- state tokens in `tokens.css` with values in both themes, focus-visible at WCAG AA
- `design-system/patterns/` — compositions proven on ≥3 screens
- `design-system/examples/` — the new-screen test built purely from the system
- `design-system/backlog.md` — honest gap list
- "Contributing to the system" in `DESIGN.md` + `CLAUDE.md`
- live showcase URL

---

## Recovery prompts

Copy-paste when the agent drifts.

```
This docs page is a screenshot / a copy of the markup. Rebuild it as the live component
rendered by design-system/index.css — the same CSS the product links. The showcase must not
be able to diverge from the product.
```

```
The docs page for <component> describes a variant that does not exist in
design-system/components/. Either the code is missing it or the page is lying — tell me which,
then reconcile: the system is the source of truth, the page describes it.
```

```
This state token has a value only in the light theme. Give it a value in [data-theme="dark"]
too, check the contrast of the pair against WCAG AA in both themes, and add the states block
to the component's docs page in both themes.
```

```
I cannot see keyboard focus on <component>. Route it through --color-focus with :focus-visible,
check AA contrast against its background in both themes, and show the focus state on its docs page.
```

```
This pattern has its own styles. Rebuild it out of existing components only; if a component or
variant is genuinely missing, add it to the system first (component + docs page + states in both
themes), then compose the pattern from it.
```

```
Name the three real screens in wireframes/ where this pattern already stands. If you cannot,
remove it — a pattern exists only when it is proven on three screens.
```

```
You hand-patched a missing piece on the example screen. Revert it: the gap goes into
design-system/backlog.md as an order for the system, not as an exception on the screen.
```

```
A new component appeared on a screen without entering the system first. Move it into
design-system/components/, give it a docs page and states in both themes, then rebuild the
screen from the system.
```
