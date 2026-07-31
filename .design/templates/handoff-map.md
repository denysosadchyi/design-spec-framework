<!-- filled by /dsf:handoff — start from this skeleton, do not restructure it -->

# Handoff map

One row is one chain: **screen → component → token → microcopy key**.

The map answers exactly one question: **"if I change this token, what moves?"**

**Reference, never duplicate.** No hex value, no pixel number and no literal UI string appears
in this file — only names that resolve to `design-system/tokens.css`,
`design-system/components/` and `voice/microcopy.md`. A duplicate is stale the moment someone
fixes the component; a reference stays true.

`voice/voice.md` and `voice/microcopy.md` are **part of the handoff package**, not a reference
on the side: a developer needs to know not only which words exist, but how the product sounds
when the words run out.

---

## Forward map — screen → component → token → copy key

Every key screen gets its rows. One row per component instance that carries meaning.

| Screen | Component | Tokens it reads | Copy key (`microcopy.md`) |
|---|---|---|---|
| `[?]` | `[?]` | `[?]` | `[?]` |

Rules for the columns:

- **Screen** — the file, exactly as it exists in `wireframes/`.
- **Component** — the file in `design-system/components/` or the composition in
  `design-system/patterns/`. Never "the green button".
- **Tokens** — semantic role names for colour, primitives for geometry, plus breakpoint and
  motion tokens where the component uses them.
- **Copy key** — the `<screen>.<zone>.<element>` key from `microcopy.md`. If a component
  carries no copy, write `—`; if it carries user-generated content, write `UGC`.

---

## Reverse lookup — token → what moves

The half that actually answers the map's question.

| Token | Components using it | Screens affected |
|---|---|---|
| `[?]` | `[?]` | `[?]` |

---

## Patterns

| Pattern | Composed of | Screens it stands on | Tokens that change its behavior |
|---|---|---|---|
| `[?]` | `[?]` | `[?]` | `[?]` |

---

## Verification

Pick **two tokens** and trace them through the map to the screens. If the answer is not readable
from the tables alone, the map is not done.

<!-- trace by reading the tables only, then check the code: a screen that changed but is not in
     the map's list is a missing row, and it is the map that gets fixed, not the trace -->


| Token traced | Screens the map says change | Screens that actually changed | Match? |
|---|---|---|---|
| `[?]` | `[?]` | `[?]` | `[?]` |
