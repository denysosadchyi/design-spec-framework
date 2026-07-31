# Phase 9 — Motion · done criteria

Gate for `/dsf:motion`. Every item is verifiable by opening a file in this repo. This file is a
**read-only reference document** — nobody ticks the boxes. `/dsf:check 9` verifies each item
against the files, writes `.design/checklists/results/phase-9.md`, and creates the
`phase-9-motion` tag on a full pass.

Motion is a **system layer**: every animation does one of three jobs — connect states,
show status, answer an action — or it does not exist. Everything new lands in the
existing system.

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
      <!-- check: grep -rnE "(transition|animation)[^;]*[0-9]+m?s" design-system/components/ design-system/patterns/ wireframes/*.html ui/*.html | grep -v "var(--dur" → expect 0 -->
- [ ] Hover and press use the fast duration; appearance uses base or slow
- [ ] Skeletons pulse while loading and fade out cleanly when content arrives
- [ ] `docs/` shows micro-interactions live
- [ ] Screen state transitions follow the tone in `voice/voice.md`: error is calm,
      success is warm, loading does not jitter
- [ ] The list → detail transition in `split-view` reads as a connection
- [ ] Motion is animated on `transform` and `opacity` only — nothing animates `width`,
      `height`, `top`, `left` or `margin`
      <!-- check: grep -rnE "(transition|transition-property|animation)[^;]*\b(width|height|top|left|margin)\b" design-system/ ui/ wireframes/ → expect 0 -->
- [ ] `DESIGN.md` has a **Motion budget** section
- [ ] A global `prefers-reduced-motion: reduce` rule genuinely removes motion, verified
      with the system setting on
- [ ] Identical moments share identical durations
- [ ] A defect table was run and cleared: motion with no job, different durations for the
      same role, layout-property animation, a moment with no reduced-motion path, motion
      tone contradicting the copy tone

---

## Docs

- [ ] `CLAUDE.md` → **Motion** block records the motion tokens and the three jobs
- [ ] `animations/motion-inventory.html` opens standalone in a browser — every phase ships
      a viewable page, not only Markdown
- [ ] `README.md` → Motion section links to `animations/motion-inventory.html`
- [ ] `index.html` data block regenerated — `animations/motion-inventory.html` present
      and linked
- [ ] Phase committed; pushed if hosting is `active`
