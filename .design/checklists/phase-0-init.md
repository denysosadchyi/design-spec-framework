# Phase 0 — Init · done criteria

Gate for `/dsf:init`. This file is a **read-only reference document** — nobody ticks the boxes.
`/dsf:check 0` verifies every item against the actual files and writes the verdict to
`.design/checklists/results/phase-0.md`; the `phase-0-init` tag is created there, on a full pass,
after the human confirms.

- [ ] `.design/memory/toolbox.md` — every row of the Tools table has a status of `active` or
      `fallback`; no `[?]` survives
      <!-- check: grep -nF '`[?]` |' .design/memory/toolbox.md → expect 0 -->
- [ ] Every `active` row has its detection evidence recorded, and every `fallback` row has its
      reason, in **Notes**
- [ ] **Rules for later phases** states, in operational words, what each `fallback` row means
      downstream — not a restatement of the fallback column
- [ ] Git repository initialized; remote configured **or** the local-only fallback explicitly
      recorded in `toolbox.md`
- [ ] Hosting decided: GitHub Pages enabled with the URL recorded, **or** the local static
      server fallback recorded in `toolbox.md`
- [ ] `index.html` renders in a browser: phase 0 `in progress`, phases 1–10 `locked`, every
      artifact showing as missing
- [ ] The `<script type="application/json" id="pipeline-data">` block holds all eleven phases with
      the canonical artifact paths from `.design/memory/phases.md`, and a `context` object whose
      values are all empty strings
- [ ] Nothing outside that data block was edited in `index.html`, and nothing in `assets/` —
      markup, styling, dictionaries and renderer are as shipped
- [ ] `CLAUDE.md` → **Toolbox** section lists one line per `active` tool and per `fallback` in
      force; the context blocks are still `[?]`, untouched
- [ ] `README.md` present from the template, with the `index.html` link if hosting is active
- [ ] First commit made; pushed only if hosting is `active` in `toolbox.md`
- [ ] The designer was handed their project page: the direct link, what the page is for, and the
      one first move (`/dsf:brief`)
