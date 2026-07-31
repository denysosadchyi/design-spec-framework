<!--
Built-in fallback prompt.
Used when the `impeccable` skill is not installed and `/impeccable audit` is
unavailable: /dsf:concept step 7, /dsf:build step 9, /dsf:system step 7,
/dsf:responsive step 8, /dsf:motion step 7, /dsf:critique step 2.
Read `.design/memory/toolbox.md` first — if the skill is active, use the skill.
-->

# Fallback — accessibility and performance audit

The mechanical counterpart to `critique.md`. Where critique judges quality, this pass **measures
and verifies**. It finds and never fixes, and it returns the same table shape:
`where · what is wrong · how to fix`.

Every finding here must be **reproducible**: a ratio, a selector, a file size, a keyboard step.
"Feels inaccessible" is not a finding.

## Inputs

Everything in scope **including state pages and both themes**, plus `design-system/tokens.css`,
`design-system/components/`, `ui/shell.html` and — if they exist —
`responsive/width-audit.md` and `animations/motion-inventory.md`.

---

## A — Accessibility

### 1. Contrast, both themes

Enumerate every foreground/background pair that actually occurs: body text, muted text, headings,
link text, button labels, badge text, placeholder text, disabled labels, icons that carry meaning,
borders that carry state, text over imagery.

For each: computed ratio, the threshold that applies (4.5:1 body · 3:1 for ≥ 24px or ≥ 19px bold ·
3:1 for meaningful non-text), and pass/fail. Repeat the whole list under `[data-theme="dark"]` if a
theme exists. **A pair that passes in one theme and fails in the other is a failing pair.**

### 2. Focus visibility

- Every interactive element has a `:focus-visible` style that is visible without a mouse.
- The focus indicator meets 3:1 against **both** the element and the surface behind it, in both
  themes.
- Focus is never removed (`outline: none` with nothing put back) anywhere in the CSS.
- Tab order follows reading order; nothing focusable is hidden off-screen but still reachable.
- Walk one full flow with the keyboard only, in the dark theme, and report where you got stuck.

### 3. Semantic landmarks and heading order

- `header`, `nav`, `main`, `footer` present and used once each where they should be; one `main`
  per page.
- Exactly one `h1` per screen, and heading levels descend without skipping.
- Lists are lists, buttons are `button`, links are `a href`, form controls are real controls —
  not `div`s with click handlers.
- Landmarks are labelled where there is more than one of a kind (`nav aria-label`).

### 4. Alternative text

- Every informative image has `alt` describing **what it conveys**, not its filename.
- Decorative images carry `alt=""` and are not announced.
- Icons that carry meaning alone have an accessible name; icons next to a text label are hidden
  from the accessibility tree.

### 5. Forms

- Every control has a `label` associated by `for`/`id` — placeholder text is not a label.
- Error messages are associated with their field (`aria-describedby`) and say what to fix.
- Required state is conveyed in text, not by color alone.
- No information is carried by color alone anywhere on the screen.

### 6. Touch targets and zoom

- Interactive targets are at least 44×44 CSS pixels, including icon-only buttons and tab items,
  with adequate spacing between adjacent targets.
- Nothing relies on hover to be reachable.
- The layout survives 200% zoom and a doubled root font size without loss of content or
  function; breakpoints declared in `rem` must move with it.

### 7. Motion

- A global `prefers-reduced-motion: reduce` block exists and genuinely removes travel, not just
  shortens it.
- No animation loops indefinitely in the user's field of view without a way to stop it.

---

## B — Performance

### 8. Layout-thrashing animations

Find every transition, animation and keyframe touching `width`, `height`, `top`, `left`,
`right`, `bottom`, `margin`, `padding` or any layout-affecting property. Each one is a finding:
it forces the browser to recalculate layout every frame. **Only `transform` and `opacity`
animate.** The fix is the same appearance through `transform`, in the owning component.

Also flag: animation declared inside a screen file rather than a component; a duration written
as a literal number instead of a motion token.

### 9. Image weight

For every image in the scope, record file size, pixel dimensions, format and how it is loaded.
Findings:

- an image whose intrinsic dimensions are far larger than the box it renders into;
- a photograph shipped as PNG, or any raster where a modern format (WebP/AVIF) is available;
- a file over a few hundred kilobytes with no reason;
- missing `width`/`height` (or `aspect-ratio`), which causes layout shift as the image arrives;
- below-the-fold imagery without `loading="lazy"`;
- an image set that visibly falls outside its recorded colorway (a system defect, flagged here
  because it is measurable).

### 10. Asset and font hygiene

- Fonts: how many families, how many weights, what happens while they load (`font-display`), and
  whether any loaded weight is unused.
- CSS: rules for components that no screen uses; duplicated declarations that should be a token.
- Anything fetched from a CDN that the repo claims to be self-contained about.

---

## Output — one table

| Where (file · element) | What is wrong | How to fix |
|---|---|---|

- One row per defect, deduplicated across screens; the same defect everywhere is one row naming
  the source.
- Every row carries its **measurement** — the ratio, the file size, the keyboard step, the
  selector.
- "How to fix" names the destination file: the token, the component, `ui/shell.html`,
  `wireframes/_conventions.md`.
- Order: contrast and keyboard failures first, then semantics and alt text, then targets and
  zoom, then performance.
- **No fixes applied. Nothing edited.**

> **HUMAN GATE.** Deliver the table and stop. The human prioritizes; then the fixes land at the
> source and are propagated.

If this audit runs during `/dsf:handoff`, an accessibility hole is **not** fixed there: it is
recorded as debt in `handoff/onboarding-gaps.md` and noted as open in `handoff/a11y.md`.
