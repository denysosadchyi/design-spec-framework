# Phase 8 — Responsive · done criteria

Gate for `/dsf:responsive`. Every item is verifiable by opening a file in this repo. This file
is a **read-only reference document** — nobody ticks the boxes. `/dsf:check 8` verifies each
item against the files, writes `.design/checklists/results/phase-8.md`, and creates the
`phase-8-responsive` tag on a full pass.

Responsive is **expansion of a mobile-first product**, not compression of a desktop one:
at every wider width something is added, not left empty. Everything new lands in the
existing system.

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
      <!-- check: grep -rn "@media" design-system/ | grep -oE "[0-9.]+rem" | sort -u → expect exactly 2 values, both in rem -->
- [ ] Grid tokens exist for gap, container max width and column counts
- [ ] `DESIGN.md` explains why these two points, referencing the audit

## Responsive — implementation

- [ ] `ui/shell.html` adapts once for the whole product: bottom tab bar becomes a left
      sidebar on desktop, in a single file
- [ ] The shell keeps the same item list and the same states (active, focus-visible) in
      both themes at all widths
- [ ] Cards, lists and list headers adapt through grid tokens — one column on phone,
      a grid on tablet and desktop
- [ ] **No media queries in `wireframes/*.html`** — adaptive behavior lives in components,
      patterns and the shell
      <!-- check: grep -rn "@media" wireframes/*.html → expect 0 -->
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

## Docs

- [ ] `CLAUDE.md` → **Responsive** block records the two breakpoints and the behavior that
      set them
- [ ] `responsive/width-audit.html` opens standalone in a browser — every phase ships a
      viewable page, not only Markdown
- [ ] `README.md` → Responsive section links to `responsive/width-audit.html`
- [ ] `pipeline.html` data block regenerated — `responsive/width-audit.html` present and
      linked
- [ ] Phase committed; pushed if hosting is `active`
