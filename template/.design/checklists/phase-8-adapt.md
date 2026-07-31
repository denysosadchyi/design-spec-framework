# Phase 8 — Adapt · done criteria

Gate for `/design:responsive` + `/design:motion`. Every item is verifiable by opening a
file in this repo. `/design:check` runs this list before sign-off.

Responsive is **expansion of a mobile-first product**, not compression of a desktop one:
at every wider width something is added, not left empty. Motion is a **system layer**:
every animation does one of three jobs — connect states, show status, answer an action —
or it does not exist. Everything new lands in the existing system.

---

## Responsive — audit and tokens

- [ ] `responsive/width-audit.md` covers every screen with one decision each: same,
      wider layout, or new behavior
- [ ] "New behavior" entries name the behavior concretely
- [ ] The audit was written before any styling
- [ ] `design-system/tokens.css` gains breakpoint primitives — one tablet, one desktop —
      expressed in `rem`
- [ ] Exactly two breakpoints exist, and each sits where the audit says behavior changes,
      not at a device width
- [ ] Grid tokens exist for gap, container max width and column counts
- [ ] `DESIGN.md` explains why these two points, referencing the audit

## Responsive — implementation

- [ ] `ui/shell.html` adapts once for the whole product: bottom tab bar becomes a side
      sidebar on desktop, in a single file
- [ ] The shell keeps the same item list and the same states (active, focus-visible) in
      both themes at all widths
- [ ] Cards, lists and list headers adapt through grid tokens — one column on phone,
      a grid on tablet and desktop
- [ ] **No media queries in `wireframes/*.html`** — adaptive behavior lives in components,
      patterns and the shell
- [ ] `docs/` pages show components at all three widths
- [ ] List+detail pairs use a `split-view` pattern in `design-system/patterns/`, composed
      of existing components and driven by a breakpoint token
- [ ] `split-view` covers empty, loading and error at every width, including the
      "nothing selected" state of the detail panel
- [ ] The remaining screens were rolled out by role-grouped subagents using the same tokens
      and pattern
- [ ] No horizontal scroll at any width; text lines are held by the container max width
- [ ] No action disappears on wider widths; all screen states exist at all widths
- [ ] A defect table was run and cleared: horizontal scroll, over-long line length,
      vanished action, media query inside a screen, breakpoint chosen by device

---

## Motion — tokens and inventory

- [ ] `design-system/tokens.css` gains a motion level: three durations (fast, base, slow —
      three, not ten), easing curves, and movement distances
- [ ] Values are restrained
- [ ] `DESIGN.md` has a **Motion** section naming the three jobs and the rule: no job,
      no animation
- [ ] `animations/motion-inventory.md` lists every motion moment with the job it does
      (connect / status / answer) and the component responsible
- [ ] No moment is in the table without a named job
- [ ] No animation exists in the code without a row in the inventory

## Motion — implementation

- [ ] Micro-interactions — hover, press, focus, appearance — live in components, not in
      screens, and use motion tokens; no duration numbers written inline
- [ ] Hover and press use the fast duration; appearance uses base or slow
- [ ] Skeletons pulse while loading and fade out cleanly when content arrives
- [ ] `docs/` shows micro-interactions live
- [ ] Screen state transitions follow the tone in `voice/voice.md`: error is calm,
      success is warm, loading does not jitter
- [ ] The list → detail transition in `split-view` reads as a connection
- [ ] Motion is animated on `transform` and `opacity` only — nothing animates `width`,
      `height`, `top`, `left` or `margin`
- [ ] `DESIGN.md` has a **Motion budget** section
- [ ] A global `prefers-reduced-motion: reduce` rule genuinely removes motion, verified
      with the system setting on
- [ ] Identical moments share identical durations
- [ ] A defect table was run and cleared: motion with no job, different durations for the
      same role, layout-property animation, a moment with no reduced-motion path, motion
      tone contradicting the copy tone

---

## Docs

- [ ] `CLAUDE.md` → **Adapt** block records the two breakpoints and the behavior that set
      them, plus the motion tokens and the three jobs
- [ ] `README.md` → Adapt section links to `responsive/width-audit.md` and
      `animations/motion-inventory.md`
- [ ] `pipeline.html` regenerated; phase committed and tagged `phase-8-adapt`
