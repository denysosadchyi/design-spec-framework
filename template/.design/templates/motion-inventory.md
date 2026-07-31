<!-- filled by /dsf:motion — start from this skeleton, do not restructure it -->

# Motion inventory

Motion is a **layer of the system**, not cosmetics on top. One rule governs everything below:
a movement is added **only if it does one of three jobs**.

| Job | What it means | Example |
|---|---|---|
| **connect** | connect states | the detail slides out of the list, so the eye knows where it came from |
| **status** | show status | the skeleton pulses while loading is in progress |
| **answer** | answer an action | the button responds to the press |

A movement doing none of these is confetti and goes under the knife.
**A moment with no named job does not enter the table below — there will be no motion there.**
**No animation exists in the code without a row in this table.**

---

## Tokens

Primitive tokens in `design-system/tokens.css`. **Three durations, not ten.** Values stay
moderate: this is an interface, not a presentation.

<!-- durations are written in ms and ordered fast < base < slow; if the fast value is long
     enough to be noticed as travel, it is not a micro-answer any more -->
<!-- distances are the travel an entering element covers, in the same unit the components use -->

| Token | Value | Used for |
|---|---|---|
| `--dur-fast` | `[?]` | micro-answer — hover, press |
| `--dur-base` | `[?]` | transitions inside a component |
| `--dur-slow` | `[?]` | an element entering |
| `--ease-standard` | `[?]` | most things |
| `--ease-enter` | `[?]` | appearance |
| `--ease-exit` | `[?]` | disappearance |
| `--move-sm` | `[?]` | `[?]` |
| `--move-md` | `[?]` | `[?]` |

If a button had its own 150 ms and a field its own 200 ms, the product would move out of sync
and no change of tempo would ever be systemic. Through `--dur-fast` every micro-answer is
synchronized and the tempo is one line in `tokens.css`.

---

## Inventory

One row per moment. Read out of `ia/flows.md` and every `wireframes/*.html` **including the
state pages**.

| Moment (screen, action) | Job — connect / status / answer | Component that owns it |
|---|---|---|
| `[?]` | `[?]` | `[?]` |

> **HUMAN GATE — inventory sign-off.** Present the table before any motion is written. The
> human decides which moments are worth it. Animate nothing in this step.

---

## Implementation notes

Filled after the gate, as the motion lands.

| Moment | Duration token | Easing token | Properties animated (`transform` / `opacity` only) | Lives in |
|---|---|---|---|---|
| `[?]` | `[?]` | `[?]` | `[?]` | `design-system/components/[?].css` |

Rules this table is checked against:

- hover and press answer at `--dur-fast`; an element entering uses `--dur-base` or `--dur-slow`;
- motion lives in the **component**, never in a screen — a duration inside `wireframes/*.html`
  is debt;
- **only `transform` and `opacity`** animate; `width`, `height`, `top`, `left` and `margin`
  force a layout recalculation every frame;
- identical moments share a duration.

---

## Tone

State transitions follow the tone in `voice/voice.md`, not the default. A calm error text with
a dramatic spring-in makes the person believe neither.

| State | Tone in `voice.md` | How the movement expresses it |
|---|---|---|
| Error | `[?]` | `[?]` — appears calmly, does not bounce |
| Success | `[?]` | `[?]` — warm, short |
| Loading | `[?]` | `[?]` — steady, never twitchy |
| Empty | `[?]` | `[?]` |

---

## Reduced motion

Not an option — an accessibility obligation. For some people on-screen movement causes nausea
and vertigo, and the system setting is their setting.

- **Global `prefers-reduced-motion: reduce` block lives in:** `[?]`
- **What it does:** all transitions become instant or near-instant; only the state change
  remains, without travel.
- **Verified with the system setting actually on:** `[?]`
- **Moments where motion still survives the setting:** `[?]`
