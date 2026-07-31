<!-- filled by /dsf:voice — start from this skeleton, do not restructure it -->

# Microcopy

**The single source of copy truth.** No interface string exists on a screen and not in this
table, and no row exists here without a string on a screen. Phase 10 references these rows by
**key**, never by value, so the keys must survive every rewrite.

## Key scheme — `<screen>.<zone>.<element>`

- `<screen>` — the file name without extension or state suffix (`browse`, not
  `browse-empty.html`).
- `<zone>` — the labelled zone from the wireframe (`filters`, `header`, `summary`, `card`).
- `<element>` — what it is (`title`, `submit`, `hint`, `error`, `empty-body`).

Lowercase, hyphen-separated inside a segment, dot-separated between segments.
**Keys are stable across rewrites**: when the words change, the `Now` column changes and the key
does not. A key changes only when the element itself moves or disappears.

---

## Inventory

Step 1 fills this as a plain transcript of what already stands in the wireframes. Steps 5–6 fill
`Was` and `Now`. By the end of the phase it is the contract.

<!-- `Was` records the string exactly as it stood before the rewrite, defects included — it is
     the evidence the register changed. An empty `Was` means the string is new. -->
<!-- one row per string per state: the same zone says different things on the base page and on
     the -empty page, and both are rows -->
<!-- a `UGC` row keeps its key and its flag and leaves `Was`/`Now` empty — we never rewrite it,
     but phase 10 still needs to know the slot exists -->


| Key | Screen | State | Zone | Element type | Was | Now | Flags |
|---|---|---|---|---|---|---|---|
| `[?]` | `[?]` | base / empty / error / loading | `[?]` | heading · button · field label · hint · validation · state message | `[?]` | `[?]` | `[?]` |

**Element types:** heading · button · field label · hint · validation · state message ·
meta · link.

**Flags** — mark, do not rewrite, during step 1:

| Flag | Meaning |
|---|---|
| `UGC` | **User-generated content** — titles, descriptions, messages people write themselves. We never rewrite these. |
| `drift-term` | The same object named differently somewhere else |
| `drift-action` | The same action labelled differently somewhere else |
| `cliché` | AI cliché, forced cheer, stray exclamation mark, emoji in a system message |
| `placeholder` | Leftover placeholder text |

---

## Drift found in step 1

<!-- what the inventory exposed, before any decision. The dictionary in voice.md resolves it. -->

| Concept or action | Named as | On which screens | Resolved to |
|---|---|---|---|
| `[?]` | `[?]` | `[?]` | `[?]` |

---

## Rewrite order

Sample first, then fan-out — constitution rule 4.

1. **Sample:** `[?]` — the main screen and **all** its state pages. Reviewed by the human
   before anything else is touched.
2. **Fan-out groups** (the role groups from `wireframes/_screens.md`): `[?]`

---

## Consistency check

After the merge: the same action must carry the same label everywhere. One action, one label —
whatever the dictionary settled on, every screen that offers that action uses it verbatim.

| Action | Label used | Screens | Mismatch? |
|---|---|---|---|
| `[?]` | `[?]` | `[?]` | `[?]` |
