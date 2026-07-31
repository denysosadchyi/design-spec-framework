<!-- filled by /dsf:ia — start from this skeleton, do not restructure it -->

# Sitemap

Four sections, in this order: **Entities · Screens · Navigation · Traceability**.
Every screen serves a job. A screen with no job and a job with no screen are the same defect,
caught by the same matrix at the bottom of this file.

---

## Entities

Objects before screens. The main things a person deals with in order to close their jobs.

| Entity | Fields and parts it contains | Which job produces it (`jtbd.md` reference) | Related to |
|---|---|---|---|
| `[?]` | `[?]` | `[?]` | `[?]` |

### Questionable

<!-- entities with no job behind them. They stay here until a job claims them or they are cut. -->

- `[?]` — assumed because `[?]`

---

## Screens

**An indented text tree, not a table.** Next to **every** screen, in parentheses, the job it
serves, referencing `jtbd.md`. A screen with no job is marked `[ORPHAN]`.

Group by objects and by the person's logic, never by "site sections". Do not copy a
competitor's structure. **Do not confuse a screen with a state** — empty, error and loading are
states of a screen, listed in `wireframes/_screens.md`, not screens here.

Mark `[P]` for screens the primary persona needs, `[S]` for secondary.

```
<root screen> (main job)                          [P]
├── <screen> (related job 1)                      [P]
│   ├── <screen> (related job 1)                  [P]
│   └── <screen> (related job 3)                  [S]
├── <screen> (related job 2)                      [P]
└── <screen> [ORPHAN]                             [S]
<entry / account cluster>
├── <screen> (job it serves)                      [P]
└── <screen> (job it serves)                      [S]
```

Keep depth minimal here — levels are added deliberately in Navigation, not by accident.

---

## Navigation

**Global navigation — 3 to 5 items.** Each item is an entrance to a main job cluster, and each
one states the job behind it. "Because everyone has it" is not a reason.

| Item | Job cluster it opens | Why it earns a global slot |
|---|---|---|
| `[?]` | `[?]` | `[?]` |

**Tap-depth budget.** Taps from the first screen to the **main job**, for the **primary
persona**. Budget: **≤ 3**. More than three means restructure, or state the trade-off
explicitly — this count is a budget later phases are held to.

| Path (screen → screen → screen) | Taps | Within budget? |
|---|---|---|
| `[?]` | `[?]` | `[?]` |

**Trade-off, if over budget:** `[?]`

**Levels**

| Level | Screens | Why here |
|---|---|---|
| Global — always visible | `[?]` | `[?]` |
| Contextual — appears inside a flow | `[?]` | `[?]` |
| Deep — rare actions | `[?]` | `[?]` |

---

## Traceability

Rows: **all** jobs from `jtbd.md` (main, related, emotional, social). Columns: **all** screens
from the tree above. Cell: `✓` if the screen genuinely takes part in closing that job.

| Job \ Screen | `[screen A]` | `[screen B]` | `[screen C]` |
|---|---|---|---|
| Main | `[?]` | | |
| Related 1 | | | |

**ORPHAN SCREENS** — columns with no `✓`: the screen exists, the job does not.

| Screen | Why does it exist? | Resolution: delete · add a job · attach to an existing screen · backlog |
|---|---|---|
| `[?]` | `[?]` | `[?]` |

**ORPHAN JOBS** — rows with no `✓`: the job exists, the screen does not.

| Job | Where is the person supposed to do this? | Resolution |
|---|---|---|
| `[?]` | `[?]` | `[?]` |

Target: **no empty row and no empty column**. Both kinds of orphan are defects, not "fine".
