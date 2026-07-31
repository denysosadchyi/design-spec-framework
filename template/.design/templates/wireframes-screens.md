<!-- filled by /dsf:wireframes — start from this skeleton, do not restructure it -->

# Wireframe screens

The work order for every later step of this phase, and for phases 5–9 after it.
Never take a screen without a job and a place in a flow.

**Step 1 covers the main flow only** — the screens that close the main job for the primary
persona. The rest of the sitemap is rolled out in step 8 and appended to the same table.

---

## Screens of the main flow

For each screen: the name **exactly** as it appears in `ia/sitemap.md`, the job it closes
**quoted from** `people/jtbd.md`, and its position in `ia/flows.md`.

| Screen | Job it closes (quoted from `jtbd.md`) | Position in the flow |
|---|---|---|
| `[?]` | `[?]` | `[?]` |

## Screen × state table

Rows = screens. Columns = the four states. `✓` where the state is real for that screen, `—`
where the scenario does not produce it, with the reason in the last column.

**Do not mark success everywhere by reflex** — only where there is a distinct "it worked"
screen. The base page *is* the success state; a separate success page exists only when the
success is its own destination.

<!-- the reason for a `—` names what this screen's data or flow makes impossible ("nothing to be
     empty of — the form is always populated by the previous screen"), never "not needed" -->
<!-- a screen with `—` in every column has not been thought about yet -->


| Screen | empty | error | loading | success | Why the `—` states are not real here |
|---|---|---|---|---|---|
| `[?]` | ✓ | ✓ | ✓ | — | `[?]` |

Files that follow from the table: base page `wireframes/<name>.html`, plus one page per `✓`
state as `wireframes/<name>-<state>.html`. **No page for a state the table does not mark, and
no invented states.**

---

## Sample

The screen the primary persona starts the main job from. It sets the bar for everything else:
level of detail, how zones are labelled, copy quality.

- **Screen:** `[?]`
- **Why this one:** `[?]`
- **Reviewed by the human before fan-out:** `[?]`

---

## Fan-out groups

The remaining screens grouped **by role**, never alphabetically — the same groups the navigator
uses, and the same groups phases 6–9 fan out to. One group per subagent.

| Group | Screens (with their states) | Assigned to |
|---|---|---|
| `[?]` | `[?]` | `[?]` |

---

## Rolled out beyond the main flow

<!-- appended in step 8; same columns as the table above -->

| Screen | Job it closes | empty | error | loading | success | Group |
|---|---|---|---|---|---|---|
| `[?]` | `[?]` | | | | | `[?]` |

**Every screen in `ia/sitemap.md` must appear in one of the two tables above.** Leave no
sitemap screen without a wireframe, and create no wireframe that is not on the sitemap.
