/* ---------------------------------------------------------------------------
 * assets/pipeline.js — the dashboard's behaviour: renderer, router, segments,
 * collapse, steps, criteria, copy buttons and the quiet auto-refresh.
 *
 * Loaded LAST in index.html, after <script id="pipeline-data"> (which it parses)
 * and after assets/i18n-uk.js (which declares I18N, RT, ART_UK, APPEARS_AT).
 *
 * Humans and agents may edit this file when behaviour changes; it carries no
 * project state. The state contract lives in index.html, in
 * <script type="application/json" id="pipeline-data"> — nothing here.
 * ------------------------------------------------------------------------ */
/* ---------------------------------------------------------------------------
 * Renderer. Reads the JSON block above and fills in the dynamic parts only:
 * sidebar dots, status badges, the "to get here" block, artifact lists, tags,
 * and the project facts inside the prompt blocks. Then applies the locale.
 *
 * All human-facing prose lives in the markup (English) and in I18N.uk.
 * ------------------------------------------------------------------------- */
(function () {
  "use strict";

  var data;
  try {
    data = JSON.parse(document.getElementById("pipeline-data").textContent);
  } catch (e) {
    return; /* leave the static English page readable rather than breaking it */
  }

  var phases = data.phases || [];
  var ctx = data.context || {};
  var lang = "en";
  var t = RT.en;

  /* ------------------------------------------------------- locale storage */

  function readStored() {
    try {
      var v = window.localStorage.getItem("dsf.lang");
      return (v === "uk" || v === "en") ? v : null;
    } catch (e) { return null; }
  }
  function writeStored(v) {
    try { window.localStorage.setItem("dsf.lang", v); } catch (e) { /* file:// */ }
  }

  /* --------------------------------------------------------------- helpers */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* Icons are <use> references into the sprite at the top of <body>; SVG elements
     need createElementNS, and setAttribute("class", …) rather than .className. */
  var SVGNS = "http://www.w3.org/2000/svg";
  function icon(name, cls) {
    var svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("class", "i" + (cls ? " " + cls : ""));
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var use = document.createElementNS(SVGNS, "use");
    use.setAttribute("href", "#i-" + name);
    svg.appendChild(use);
    return svg;
  }
  function setIcon(host, name) {
    var u = host && host.querySelector("use");
    if (u) u.setAttribute("href", "#i-" + name);
  }

  function num(phase) {
    if (typeof phase.number === "number") return phase.number;
    if (typeof phase.id === "number") return phase.id;
    var n = parseInt(phase.id, 10);
    return isNaN(n) ? -1 : n;
  }

  function dict(key) {
    var d = I18N[lang];
    if (d && typeof d[key] === "string") return d[key];
    return I18N.en[key];
  }

  /* ------------------------------------------------- capture English once */

  var nodes = document.querySelectorAll("[data-i18n]");
  Array.prototype.forEach.call(nodes, function (n) {
    var k = n.getAttribute("data-i18n");
    if (k && I18N.en[k] === undefined) I18N.en[k] = n.innerHTML;
  });

  /* --------------------------------------------------------- prompt blocks */

  function dedent(s) {
    s = s.replace(/^\n+/, "").replace(/\s+$/, "");
    var lines = s.split("\n");
    var indent = null;
    lines.forEach(function (l) {
      if (!l.trim()) return;
      var m = l.match(/^[ \t]*/)[0].length;
      if (indent === null || m < indent) indent = m;
    });
    if (indent) lines = lines.map(function (l) { return l.slice(indent); });
    return lines.join("\n");
  }

  /* Prompt-block key -> first 60 chars of its dedented English body. Used only
     to match a rendered block back to its "prompt.<key>" translation in
     I18N.uk; the markup itself carries no key attribute. Blocks with no
     match (or a translation the uk dictionary doesn't have) stay English. */
  var PROMPT_FP = {
   "page-how.1": "/dsf:status",
   "page-how.2": "/dsf:change \"{what you want changed, in your own words}\"",
   "page-how.3": "/dsf:status\n\nThen, in three lines: where am I, what's finish",
   "page-0.1": "/dsf:init",
   "page-0.2": "Set up the browser tool and the image generation. Skip the r",
   "page-0.3": "Show me the detection result for every row of toolbox.md. An",
   "page-0.4": "Publish it: create the repository as private, turn on hostin",
   "page-0.5": "Keep everything local — no repository, nothing published. Re",
   "page-0.6": "Render index.html, run the phase 0 checklist and report p",
   "page-0.7": "You skipped the fallback column. For every declined tool, wr",
   "page-0.8": "index.html has a hard-coded status. Derive every status f",
   "page-1.1": "/dsf:brief {{oneLiner}}",
   "page-1.2": "Ask me the brief questions in batches of three to five, one ",
   "page-1.3": "Push back where my answers are vague. If my audience is demo",
   "page-1.4": "I don't know that yet. Mark it [?], write your hypothesis ex",
   "page-1.5": "Show me the whole brief in chat before you write a single fi",
   "page-1.6": "Approved, with one correction: {what to change}. Redo that a",
   "page-1.7": "Scaffold the folders exactly as .design/memory/phases.md def",
   "page-1.8": "You started writing the brief before I approved it. Discard ",
   "page-1.9": "You filled a gap with a plausible answer. Mark it [?], state",
   "page-2.phase-2-research.1": "/dsf:research",
   "page-2.phase-2-research.2": "Here is the competitor set for {{product}}. Hard: {names}. S",
   "page-2.phase-2-research.3": "Collect the data yourself: open each approved product, save ",
   "page-2.phase-2-research.4": "Benchmark {{benchmarkDimension}}. Define 6–8 criteria that t",
   "page-2.phase-2-research.5": "I'll take pattern {number}. Record why it fits {{product}} s",
   "page-2.phase-2-research.6": "Assemble research/research.md and render research/research.h",
   "page-2.phase-2-research.7": "These are variations of one approach. Give me patterns that ",
   "page-2.phase-2-research.8": "All the benchmark products are from our own category. Replac",
   "page-2.phase-2-research.9": "Give me a source link for every figure. Don't invent one — w",
   "page-2.phase-2-users.10": "/dsf:users",
   "page-2.phase-2-users.11": "Don't write any personas yet. First: everything research/res",
   "page-2.phase-2-users.12": "Build 2–4 personas split by behaviour, not demographics. Eve",
   "page-2.phase-2-users.13": "Write the jobs as \"when … I want … so that …\": one main job,",
   "page-2.phase-2-users.14": "MVP core approved: {job 1}, {job 2}, {job 3}. Cut the rest a",
   "page-2.phase-2-users.15": "Now audit yourself and be adversarial: classify every statem",
   "page-2.phase-2-users.16": "Render people/personas.html with the [?] and \"hypothesis\" ma",
   "page-2.phase-2-users.17": "This is demographics, not behaviour. What separates these pe",
   "page-2.phase-2-users.18": "The critique found nothing invented. Go again and be adversa",
   "page-3.1": "/dsf:ia",
   "page-3.2": "Start with entities, not screens: what objects does someone ",
   "page-3.3": "Derive the screen tree from the jobs, not from a competitor'",
   "page-3.4": "Give the tree a navigation model: 3–5 global items, each wit",
   "page-3.5": "Draw the flows in ia/flows.md: the main job plus 2–3 key rel",
   "page-3.6": "Build the jobs × screens coverage matrix, then read every ro",
   "page-3.7": "Give me the defect table only — dead ends and missing states",
   "page-3.8": "Fix in this order: {row numbers}. Drop {row numbers} — I acc",
   "page-3.9": "Render ia/ia.html: the sitemap tree with the job next to eve",
   "page-3.10": "This sitemap looks suspiciously like the menu of a well-know",
   "page-3.11": "In this flow everything is found and everyone agrees. Add em",
   "page-4.1": "/dsf:wireframes",
   "page-4.2": "Build wireframes/_screens.md for the main flow of {{mainJob}",
   "page-4.3": "Write wireframes/_conventions.md before you draw anything: g",
   "page-4.4": "Build the sample only: the screen {{primaryPersona}} starts ",
   "page-4.5": "Sample approved. Build the rest of the main flow the same wa",
   "page-4.6": "Roll out every remaining screen on the sitemap with parallel",
   "page-4.7": "Link the screens along ia/flows.md: each screen's primary ac",
   "page-4.8": "Give me the defect table only — screen, what's wrong, how to",
   "page-4.9": "Fix in this order: {row numbers} — dead ends and missing sta",
   "page-4.10": "You started drawing the look — colour, type, shadows or icon",
   "page-4.11": "There are placeholders in the wireframe — lorem ipsum or \"He",
   "page-4.12": "You built the states as one file with a switcher, or you lin",
   "page-5.phase-5-voice.1": "/dsf:voice",
   "page-5.phase-5-voice.2": "Inventory every string in wireframes/*.html into voice/micro",
   "page-5.phase-5-voice.3": "Write 3–5 voice principles for {{product}}. Each one: a rule",
   "page-5.phase-5-voice.4": "Now the dictionary — one concept, one word, each term with a",
   "page-5.phase-5-voice.5": "Rewrite the main screen and its state pages only, then show ",
   "page-5.phase-5-voice.6": "Register approved. Fan out to the remaining screens with the",
   "page-5.phase-5-voice.7": "Fan out one subagent per screen with all its state pages, ea",
   "page-5.phase-5-voice.8": "Table only, fix nothing. Then fix in this order: {row number",
   "page-5.phase-5-voice.9": "Render voice/voice.html — principles with their examples and",
   "page-5.phase-5-voice.10": "You wrote a principle as an adjective — \"friendly and simple",
   "page-5.phase-5-voice.11": "Clichés are back — exclamation marks, emoji, \"Welcome!\", \"su",
   "page-5.phase-5-voice.12": "You rewrote user-generated content — that copy belongs to th",
   "page-5.phase-5-concept.13": "/dsf:concept",
   "page-5.phase-5-concept.14": "Find the visual references for {{benchmarkDimension}} — the ",
   "page-5.phase-5-concept.15": "My taste, on the record.\n\nLikes: {product} — {what exactly I",
   "page-5.phase-5-concept.16": "Now the attribute pairs — 3–5 opposites — each with the data",
   "page-5.phase-5-concept.17": "Build concept/directions.html: three genuinely different dir",
   "page-5.phase-5-concept.18": "I'll take direction {number} — \"{name}\". Record the choice a",
   "page-5.phase-5-concept.19": "Build concept/concept.html from {{chosenDirection}}: the lan",
   "page-5.phase-5-concept.20": "Apply the language to the main screen and its state pages, t",
   "page-5.phase-5-concept.21": "Approved. Now carry the same language to one contrasting scr",
   "page-5.phase-5-concept.22": "Table only, fix nothing. Then fix in this order: {row number",
   "page-5.phase-5-concept.23": "Make {element} on {screen} {the adjustment}. Show me a varia",
   "page-5.phase-5-concept.24": "Keep it. Update that value in concept/concept.html, annotate",
   "page-5.phase-5-concept.25": "The palette is guessable from the category — that's a model ",
   "page-5.phase-5-concept.26": "This colour (or radius, or font) has no pair in Attributes o",
   "page-5.phase-5-concept.27": "You used different colours or a different card radius on the",
   "page-6.1": "/dsf:build",
   "page-6.2": "Document DESIGN.md from the two approved screens and their s",
   "page-6.3": "Read the component inventory out of all wireframes/*.html in",
   "page-6.4": "Build the kit and stop at the showcase: two token levels fro",
   "page-6.5": "Kit approved, with these changes: {what to fix}. Fix them in",
   "page-6.6": "Generate the imagery from the \"needs a photo\" column of ui/i",
   "page-6.7": "Move the two styled screens onto the kit first — the look mu",
   "page-6.8": "First group approved. Fan the remaining roles out to paralle",
   "page-6.9": "Add the dark theme by overriding semantic tokens only — don'",
   "page-6.10": "Dark theme {ships / doesn't ship} in the product. Record tha",
   "page-6.11": "Table only, fix nothing. Then fix in this order: {row number",
   "page-6.12": "This block is styled directly on the screen. Move the style ",
   "page-6.13": "Compare {component} on {screen A} and {screen B} — they must",
   "page-6.14": "The dark theme required edits inside the component files. Th",
   "page-7.1": "/dsf:system",
   "page-7.2": "Consolidate the system under design-system/ with a single en",
   "page-7.3": "Build one docs page per component with four parts: anatomy w",
   "page-7.4": "Give every component hover, active, focus-visible and disabl",
   "page-7.5": "Find the compositions standing on three or more real screens",
   "page-7.6": "Write \"Contributing to the system\" into DESIGN.md and CLAUDE",
   "page-7.7": "Take a job from people/jtbd.md that has no screen yet and as",
   "page-7.8": "Table only, fix nothing. Then fix in this order: {row number",
   "page-7.9": "This docs page is a screenshot or a copy of the markup. Rebu",
   "page-7.10": "I can't see keyboard focus on {component}. Route it through ",
   "page-7.11": "You hand-patched a missing piece on the example screen. Reve",
   "page-8.1": "/dsf:responsive",
   "page-8.2": "Width audit first, and touch no styles: one row per screen —",
   "page-8.3": "Audit approved, with these corrections: {rows to change}. Re",
   "page-8.4": "Add exactly two breakpoints as primitive tokens, in rem, pla",
   "page-8.5": "Make the shell adaptive in that one file: at desktop the bot",
   "page-8.6": "Move adaptive behaviour into the components — card, feed, li",
   "page-8.7": "Extract split-view into design-system/patterns/ as one compo",
   "page-8.8": "Roll the remaining screens out by role group, then give me t",
   "page-8.9": "The desktop is just the phone with wider columns. Go back to",
   "page-8.10": "Check the breakpoints: are they placed where behaviour chang",
   "page-8.11": "Find every media query inside a screen file and move the beh",
   "page-9.1": "/dsf:motion",
   "page-9.2": "Add the motion tokens: three durations — fast for micro-answ",
   "page-9.3": "Build the motion inventory first and animate nothing: every ",
   "page-9.4": "Inventory approved, but drop {rows} — not worth it. Implemen",
   "page-9.5": "Put the micro-interactions in the components, through the mo",
   "page-9.6": "Add the state transitions in the tone voice/voice.md defines",
   "page-9.7": "Bring everything inside the budget: animate transform and op",
   "page-9.8": "Give me the defect table only — motion with no job in the in",
   "page-9.9": "Go through every animation in the product and name which of ",
   "page-9.10": "Group every animation by role — hover, press, appearance, st",
   "page-9.11": "Find every duration, transition or keyframe written inside a",
   "page-10.1": "/dsf:handoff",
   "page-10.2": "Walk the repo as a developer who has never seen it and write",
   "page-10.3": "Gap list approved. Add these I already know about: {gaps}. N",
   "page-10.4": "Write the behaviour spec — one file per key flow: steps, sta",
   "page-10.5": "Write handoff/map.md — one row per chain: screen → component",
   "page-10.6": "Consolidate handoff/a11y.md from what already exists: focus-",
   "page-10.7": "Rewrite README.md as a living index from research/ through t",
   "page-10.8": "Package the release: deploy the product and the showcase, co",
   "page-10.9": "Run the fresh-agent test: give a context-free subagent only ",
   "page-10.10": "Graduation one-shot: take a job from people/jtbd.md the prod",
   "page-10.11": "Check whether anything in this phase added a new feature, st",
   "page-10.12": "The documentation duplicates the code. Walk handoff/ and rep",
   "page-10.13": "The README retells the files instead of pointing at them. Cu"
  };
  var PROMPT_FP_BY_TEXT = {};
  Object.keys(PROMPT_FP).forEach(function (k) { PROMPT_FP_BY_TEXT[PROMPT_FP[k]] = k; });

  var promptBodies = [];
  Array.prototype.forEach.call(document.querySelectorAll("[data-prompt]"), function (box) {
    var body = box.querySelector("pre.prompt-body");
    var button = box.querySelector(".copy");
    if (!body) return;
    body.__tpl = dedent(body.textContent);
    body.__key = PROMPT_FP_BY_TEXT[body.__tpl.slice(0, 60)] || null;
    promptBodies.push(body);
    if (!button) return;
    button.addEventListener("click", function () { copyText(body.textContent, button); });
  });

  /* Every Copy button becomes icon + label once, here: the label is the only thing
     the locale and the copied-state feedback ever write, so the mark survives both. */
  Array.prototype.forEach.call(document.querySelectorAll(".copy"), function (b) {
    if (b.querySelector(".i")) return;
    b.textContent = "";
    b.appendChild(icon("copy", "i-sm"));
    b.appendChild(el("span", "lbl", "Copy"));
  });

  function setCopyLabel(button, text) {
    var l = button.querySelector(".lbl");
    if (l) l.textContent = text; else button.textContent = text;
  }

  /* Rail check/status chip copies exactly whatever renderRail() last put in
     the chip — no template, so the click handler just reads the live text. */
  (function () {
    var checkCmd = document.querySelector("[data-rail-check-cmd]");
    var checkCopy = document.querySelector("[data-rail-check-copy]");
    if (!checkCmd || !checkCopy) return;
    checkCopy.addEventListener("click", function () { copyText(checkCmd.textContent, checkCopy); });
  })();

  function fillPrompt(node) {
    var template = node.__tpl;
    if (lang === "uk" && node.__key) {
      var uk = I18N.uk["prompt." + node.__key];
      if (typeof uk === "string") template = uk;
    }
    node.textContent = "";
    var re = /\{\{(\w+)\}\}/g;
    var last = 0, m;
    while ((m = re.exec(template)) !== null) {
      if (m.index > last) node.appendChild(document.createTextNode(template.slice(last, m.index)));
      var key = m[1];
      var value = ctx[key];
      if (value) node.appendChild(document.createTextNode(value));
      else node.appendChild(el("span", "ph", t.blanks[key] || "‹" + key + "›"));
      last = m.index + m[0].length;
    }
    if (last < template.length) node.appendChild(document.createTextNode(template.slice(last)));
  }

  function copyText(text, button) {
    function ok() {
      setCopyLabel(button, t.copied);
      setIcon(button, "check");
      button.classList.add("done");
      setTimeout(function () {
        setCopyLabel(button, t.copy);
        setIcon(button, "copy");
        button.classList.remove("done");
      }, 1400);
    }
    function legacy() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) { /* nothing sensible left */ }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, legacy);
    } else {
      legacy();
    }
  }

  /* ------------------------------------------------- file-name code styling */

  /* Every plain <code> (not a /dsf:* command, not a token) whose text is a
     file or folder name gets the accent colour. Classified here, at every
     render, instead of hand-tagging each spot in the markup — this also
     catches the ones that only exist after a locale swap (I18N.uk strings
     injected via innerHTML). A path either has a "/" in it or ends in a
     known artifact extension; "--foo" tokens and "/dsf:*" commands are
     never matched even if a future edit drops the .cmd class by mistake. */
  var FILE_CODE_RE = /\.(md|css|html|json)$/i;

  function classifyFileCodes() {
    Array.prototype.forEach.call(document.querySelectorAll("code:not(.cmd)"), function (node) {
      var txt = node.textContent.trim();
      var isFile = (txt.indexOf("/") !== -1 || FILE_CODE_RE.test(txt)) &&
        txt.slice(0, 5) !== "/dsf:" && txt.slice(0, 2) !== "--";
      node.classList.toggle("file", isFile);
    });
  }

  /* ------------------------------------------------- success-criteria rail */

  var railKey = "how";

  function critOf(phase) {
    var c = (phase && phase.criteria) || {};
    return {
      total:  typeof c.total === "number" ? c.total : 0,
      passed: c.passed || [],
      failed: c.failed || [],
      when:   c.checkedAt || ""
    };
  }

  function stateOf(c, ord) {
    if (c.passed.indexOf(ord) !== -1) return "pass";
    if (c.failed.indexOf(ord) !== -1) return "fail";
    return "todo";
  }

  /* Ticks for one phase's list. The text is markup; only the marks are state. */
  function renderCriteria(phase) {
    var list = document.querySelector('ol.crit[data-rail="' + num(phase) + '"]');
    if (!list) return;
    var c = critOf(phase);
    Array.prototype.forEach.call(list.children, function (li, i) {
      var st = stateOf(c, i + 1);
      li.setAttribute("data-state", st);
      /* The ordinal is markup and stays put; only the fill carries the state. */
      var mark = li.querySelector(".cm");
      if (mark) mark.setAttribute("title", t.critState[st]);
    });
  }

  /* ---------------------------------------------------------- step marks */

  /* "/dsf:wireframes" -> "wireframes", to match the "<command>.<n>" ids the
     JSON steps ledger uses (done: [...], current: "..."). */
  function stepPrefix(cmd) {
    return String(cmd || "").replace(/^\/dsf:/, "");
  }

  /* One <ol class="steps"> per command, in the same order as phase.commands
     (two-command phases render two lists, one per sub-section). Steps are
     numbered 1..N by position within their own list -- that position, plus
     the list's command, is the step id. The state lands as data-state on the
     <li>, which colours the step's own numbered circle (see the steps CSS);
     nothing is injected, so a fresh clone with an all-empty ledger renders
     neutral. */
  function renderSteps(phase) {
    var page = document.getElementById("page-" + num(phase));
    if (!page) return;
    var lists = page.querySelectorAll("ol.steps");
    if (!lists.length) return;
    var commands = phase.commands || [];
    var st = phase.steps || {};
    var done = st.done || [];
    var curId = typeof st.current === "string" ? st.current : "";

    Array.prototype.forEach.call(lists, function (list, listIndex) {
      var prefix = stepPrefix(commands.length ? (commands[listIndex] || commands[0]) : "");
      Array.prototype.forEach.call(list.children, function (li, i) {
        var id = prefix + "." + (i + 1);
        var state = done.indexOf(id) !== -1 ? "done" : (id === curId ? "current" : "todo");
        li.setAttribute("data-state", state);
      });
    });
  }

  function navName(n) {
    var el2 = document.querySelector('.nav-item[data-nav="' + n + '"] .name > span');
    return el2 ? el2.textContent.trim() : "";
  }

  /* The "how this works" panel: the same counter, summed across the pipeline. */
  function renderTally() {
    var ol = document.querySelector("[data-tally]");
    if (!ol) return;
    ol.innerHTML = "";
    phases.forEach(function (p) {
      var c = critOf(p);
      var li = el("li");
      if (current && num(current) === num(p)) li.className = "is-current";
      li.appendChild(el("b", "tn", String(num(p))));
      li.appendChild(el("span", "tname", navName(num(p)) || p.name || ""));
      li.appendChild(el("span", "tc", c.passed.length + "/" + c.total));
      ol.appendChild(li);
    });
  }

  function renderRail() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-rail]"), function (p) {
      p.hidden = (p.getAttribute("data-rail") !== railKey);
    });

    /* Permanent check/status chip: /dsf:check N on a phase view, /dsf:status
       on the "how this works" view. Command text is never translated. */
    var checkCmd = document.querySelector("[data-rail-check-cmd]");
    var checkCaption = document.querySelector("[data-rail-check-caption]");
    if (checkCmd && checkCaption) {
      if (railKey === "how") {
        checkCmd.textContent = "/dsf:status";
        checkCaption.textContent = t.railStatusCaption;
      } else {
        checkCmd.textContent = "/dsf:check " + railKey;
        checkCaption.textContent = t.railCheckCaption;
      }
    }

    var titleEl = document.querySelector("[data-rail-title]");
    var countEl = document.querySelector("[data-rail-count]");
    var metaEl  = document.querySelector("[data-rail-meta]");
    if (titleEl) titleEl.textContent = t.critTitle;
    if (!countEl || !metaEl) return;

    var phase = null;
    phases.forEach(function (p) { if (String(num(p)) === railKey) phase = p; });

    metaEl.textContent = "";
    if (!phase) {
      var pass = 0, tot = 0;
      phases.forEach(function (p) {
        var c = critOf(p);
        pass += c.passed.length;
        tot += c.total;
      });
      countEl.textContent = pass + "/" + tot;
      metaEl.appendChild(document.createTextNode(t.critAll));
      renderTally();
      return;
    }

    var c = critOf(phase);
    countEl.textContent = c.passed.length + "/" + c.total;
    metaEl.appendChild(document.createTextNode(c.when ? t.critChecked(c.when) : t.critNever));
    if (c.failed.length) {
      metaEl.appendChild(document.createTextNode(" · "));
      metaEl.appendChild(el("span", "m-fail", t.critFailed(c.failed.length)));
    }
  }

  /* One artifact row per artifact: the tick, the path (a link once the file is
     real), when it appears if it is not there yet, and the label. Used by the
     Guide's own artifact section and, unchanged, by the Result view's list. */
  function buildArtifactList(list, phase) {
    if (!list) return;
    list.innerHTML = "";
    (phase.artifacts || []).forEach(function (a) {
      var li = el("li", a.exists ? "has" : "missing");
      var glyph = el("span", "glyph");
      glyph.appendChild(icon(a.exists ? "circle-check" : "circle-dashed"));
      li.appendChild(glyph);

      var body = document.createElement("div");
      var pathNode;
      if (a.link && a.exists) {
        pathNode = document.createElement("a");
        pathNode.className = "path";
        pathNode.href = a.path;
        pathNode.textContent = a.path;
        /* the moment a path stops being text and becomes an openable file */
        pathNode.appendChild(document.createTextNode(" "));
        pathNode.appendChild(icon("arrow-up-right", "i-sm"));
      } else {
        pathNode = el("span", "path", a.path);
      }
      body.appendChild(pathNode);

      if (!a.exists) {
        var at = APPEARS_AT[a.path];
        body.appendChild(document.createTextNode(" "));
        body.appendChild(el("span", "pending", at
          ? t.willAppear + (at.length > 1 ? t.stepOf(at[0], at[1]) : t.step(at[0]))
          : t.notYet));
      }

      var label = (lang !== "en" && ART_UK[a.path]) ? ART_UK[a.path] : (a.label || "");
      body.appendChild(el("span", "desc", label));
      li.appendChild(body);
      list.appendChild(li);
    });
  }

  /* ---------------------------------------------------------- state render */

  var current = null;
  function recomputeCurrent() {
    current = null;
    phases.forEach(function (p) {
      if (p.status === "done") return;
      if (!current || num(p) < num(current)) current = p;
    });
  }
  recomputeCurrent();

  function renderState() {
    var productName = ctx.product || data.product || "";
    if (!productName || productName.indexOf("{{") === 0) productName = t.projectFallback;

    document.title = productName + t.titleJoin + t.titleSuffix;
    Array.prototype.forEach.call(document.querySelectorAll("[data-product]"), function (n) {
      n.textContent = productName;
    });

    var vEl = document.querySelector("[data-version]");
    if (vEl) vEl.textContent = "v" + (data.templateVersion || "…");

    var doneCount = phases.filter(function (p) { return p.status === "done"; }).length;
    var pEl = document.querySelector("[data-progress]");
    if (pEl) pEl.textContent = t.progress(doneCount, phases.length);

    phases.forEach(function (phase) {
      var id = String(num(phase));
      var status = phase.status || "locked";
      var statusText = t.status[status] || status;

      var navItem = document.querySelector('.nav-item[data-nav="' + id + '"]');
      if (navItem) {
        navItem.setAttribute("data-status", status);
        var nameEl = navItem.querySelector(".name");
        var label = nameEl ? nameEl.textContent.trim() : (phase.name || "");
        if (current && String(num(current)) === id) navItem.classList.add("is-current-phase");
        navItem.setAttribute("aria-label", t.phaseAria(id, label, statusText));
        /* the only label left when the rail is collapsed to its dots */
        navItem.title = label;
      }

      var badge = document.querySelector('[data-badge="' + id + '"]');
      if (badge) {
        badge.setAttribute("data-status", status);
        badge.textContent = statusText;
      }

      var unlock = document.querySelector('[data-unlock="' + id + '"]');
      if (unlock) unlock.hidden = (status !== "locked");

      buildArtifactList(document.querySelector('[data-artifacts="' + id + '"]'), phase);
      buildArtifactList(document.querySelector('[data-result-links="' + id + '"]'), phase);

      var close = document.querySelector('[data-close="' + id + '"]');
      if (close) {
        close.innerHTML = "";
        close.appendChild(el("span", "", t.markLabel));
        var pill = el("span", "tag-pill" + (phase.tagged ? " is-tagged" : ""));
        pill.appendChild(icon(phase.tagged ? "check" : "tag", "i-sm"));
        pill.appendChild(el("span", "", phase.tag || ""));
        close.appendChild(pill);
        close.appendChild(el("span", "", phase.tagged ? t.markCreated : t.markPending));
      }
    });

    phases.forEach(renderCriteria);
    phases.forEach(renderSteps);
    renderRail();

    promptBodies.forEach(fillPrompt);
    Array.prototype.forEach.call(document.querySelectorAll(".copy"), function (b) {
      if (!b.classList.contains("done")) setCopyLabel(b, t.copy);
    });

    classifyFileCodes();
  }

  /* --------------------------------------------------------- apply locale */

  function applyLocale(next) {
    lang = (next === "uk") ? "uk" : "en";
    t = RT[lang];
    document.documentElement.setAttribute("lang", lang);

    Array.prototype.forEach.call(nodes, function (n) {
      var k = n.getAttribute("data-i18n");
      var v = dict(k);
      if (typeof v === "string") n.innerHTML = v;
    });

    Array.prototype.forEach.call(document.querySelectorAll(".lang button"), function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });

    var navEl = document.getElementById("nav");
    if (navEl) navEl.setAttribute("aria-label", dict("nav.2") || "Phases");

    renderState();
    refreshDynamicText();
  }

  Array.prototype.forEach.call(document.querySelectorAll(".lang button"), function (b) {
    b.addEventListener("click", function () {
      var next = b.getAttribute("data-lang");
      writeStored(next);
      applyLocale(next);
    });
  });

  /* ------------------------------------------------------- guide | result */

  /* Two views of one phase: the walkthrough you read, and the thing the phase
     actually produced. What the Result view can embed is read off the phase's
     own artifacts, so a phase that gains or loses an HTML page gains or loses
     a tab with no change here. The list below is only a preference order:
     which of several pages opens first. */
  var PRIMARY_ORDER = [
    "research/research.html",
    "people/personas.html",
    "ia/ia.html",
    "wireframes/index.html",
    "concept/directions.html",
    "concept/concept.html",
    "voice/voice.html",
    "ui/kit.html",
    "ui/shell.html",
    "design-system/docs/index.html",
    "responsive/width-audit.html",
    "animations/motion-inventory.html",
    "handoff/index.html"
  ];
  var SELF_PAGE = "index.html";   /* never embed this page inside itself */

  var views = {};        /* phase id -> "guide" | "result", as last applied */
  var frameChoice = {};  /* phase id -> the artifact path its iframe shows */

  function readStoredView(id) {
    try {
      var v = window.localStorage.getItem("dsf.view." + id);
      return (v === "guide" || v === "result") ? v : null;
    } catch (e) { return null; }
  }
  function writeStoredView(id, v) {
    try { window.localStorage.setItem("dsf.view." + id, v); } catch (e) { /* file:// */ }
  }

  function phaseById(id) {
    var found = null;
    phases.forEach(function (p) { if (String(num(p)) === String(id)) found = p; });
    return found;
  }

  /* Embeddable: an HTML page this phase produced that is real on disk. */
  function embeddable(phase) {
    var live = (phase.artifacts || []).filter(function (a) {
      return a.exists && a.link && a.path !== SELF_PAGE && /\.html?$/i.test(a.path);
    });
    return live.sort(function (a, b) {
      var ia = PRIMARY_ORDER.indexOf(a.path); if (ia < 0) ia = PRIMARY_ORDER.length;
      var ib = PRIMARY_ORDER.indexOf(b.path); if (ib < 0) ib = PRIMARY_ORDER.length;
      return ia - ib;
    });
  }

  /* A tab is labelled with the file it opens (the folder name when the file is
     an index): a file name needs no translation and cannot drift from the
     artifact it stands for. */
  function tabName(path) {
    var parts = String(path).split("/");
    var base = parts.pop().replace(/\.html?$/i, "");
    if (base === "index" && parts.length) base = parts.pop();
    return base;
  }

  /* The panel is built once per phase and then updated in place. Rebuilding it
     would re-parent the iframe, and a re-parented iframe reloads: the 5s
     refresh and every language switch must leave an open result untouched. */
  function ensureResultPanel(id) {
    var article = document.getElementById("page-" + id);
    if (!article) return null;
    var panel = article.querySelector('[data-result="' + id + '"]');
    if (panel) return panel;

    panel = el("div", "result-view");
    panel.setAttribute("data-result", id);
    panel.hidden = true;

    var tabs = el("div", "result-tabs");
    tabs.hidden = true;
    panel.appendChild(tabs);

    var box = el("div", "result-frame-box");
    box.hidden = true;
    var bar = el("div", "result-frame-bar");
    bar.appendChild(el("span", "rf-path", ""));
    var full = el("button", "rf-full", "");
    full.type = "button";
    full.addEventListener("click", function () {
      if (fullBox === box) exitFullFrame(); else enterFullFrame(box);
    });
    bar.appendChild(full);
    box.appendChild(bar);
    panel.appendChild(box);

    var empty = el("div", "result-empty");
    empty.hidden = true;
    empty.appendChild(el("p", "", ""));
    panel.appendChild(empty);

    var facts = el("div", "result-facts");
    facts.hidden = true;
    panel.appendChild(facts);

    var links = el("div", "result-links");
    links.appendChild(el("h3", "", ""));
    var ul = el("ul", "artifacts");
    ul.setAttribute("data-result-links", id);
    links.appendChild(ul);
    panel.appendChild(links);

    article.appendChild(panel);
    return panel;
  }

  function markTabs(panel, chosen) {
    Array.prototype.forEach.call(panel.querySelectorAll(".result-tabs button"), function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-src") === chosen ? "true" : "false");
    });
  }

  function mountFrame(box, src) {
    var frame = box.querySelector("iframe");
    if (frame && frame.getAttribute("src") === src) return;  /* leave it alone */
    if (!frame) {
      frame = document.createElement("iframe");
      frame.setAttribute("loading", "lazy");
      box.appendChild(frame);
    }
    frame.setAttribute("title", src);
    frame.setAttribute("src", src);
  }

  function dropFrame(box) {
    var frame = box.querySelector("iframe");
    if (frame && frame.parentNode) frame.parentNode.removeChild(frame);
  }

  function showFrame(id, src) {
    frameChoice[id] = src;
    var panel = document.querySelector('[data-result="' + id + '"]');
    if (!panel) return;
    var box = panel.querySelector(".result-frame-box");
    box.querySelector(".rf-path").textContent = src;
    markTabs(panel, src);
    mountFrame(box, src);
  }

  function renderResult(id) {
    var panel = ensureResultPanel(id);
    var phase = phaseById(id);
    if (!panel || !phase) return;

    var live = embeddable(phase);
    var anyArtifact = (phase.artifacts || []).some(function (a) { return a.exists; });
    var open = views[id] === "result";

    var tabs = panel.querySelector(".result-tabs");
    var wanted = live.map(function (a) { return a.path; }).join("|");
    if (tabs.getAttribute("data-built") !== wanted) {
      tabs.setAttribute("data-built", wanted);
      tabs.innerHTML = "";
      live.forEach(function (a) {
        var b = el("button", "", tabName(a.path));
        b.type = "button";
        b.setAttribute("data-src", a.path);
        b.title = a.path;
        b.addEventListener("click", function () { showFrame(id, a.path); });
        tabs.appendChild(b);
      });
    }
    tabs.hidden = (live.length < 2);

    var chosen = "";
    if (live.length) {
      chosen = frameChoice[id] || "";
      var stillLive = live.some(function (a) { return a.path === chosen; });
      if (!stillLive) chosen = live[0].path;
      frameChoice[id] = chosen;
    }
    markTabs(panel, chosen);

    var box = panel.querySelector(".result-frame-box");
    box.hidden = !live.length;
    var fullBtn = box.querySelector(".rf-full");
    if (live.length) {
      box.querySelector(".rf-path").textContent = chosen;
      if (fullBtn) fullBtn.textContent = (fullBox === box) ? t.frameExit : t.frameFull;
      /* Lazy on purpose: the iframe is only born once Result is open. */
      if (open) mountFrame(box, chosen);
    } else {
      dropFrame(box);
      if (fullBox === box) exitFullFrame();
    }

    var empty = panel.querySelector(".result-empty");
    var facts = panel.querySelector(".result-facts");
    empty.hidden = true;
    facts.hidden = true;
    facts.innerHTML = "";
    empty.className = "result-empty";

    /* Nothing exists yet: one centred line and nothing else. A list of ten
       files that are all still missing is noise, not a result. */
    panel.querySelector(".result-links").hidden = !anyArtifact;

    if (!anyArtifact) {
      empty.hidden = false;
      empty.className = "result-empty is-center";
      empty.firstChild.textContent = t.resultEmpty;
    } else if (!live.length) {
      if (String(id) === "1") {
        facts.hidden = false;
        facts.appendChild(factsList());
      } else {
        empty.hidden = false;
        empty.firstChild.textContent = (String(id) === "0") ? t.resultToolbox : t.resultNoPage;
      }
    }

    panel.querySelector(".result-links h3").textContent = stripTags(dict("s10"));
    buildArtifactList(panel.querySelector('[data-result-links="' + id + '"]'), phase);
  }

  /* Phase 1 has no page of its own: what it produced is the two facts every
     later phase reads out of the brief. */
  function factsList() {
    var dl = document.createElement("dl");
    var rows = [
      [t.factProduct, (ctx.product && ctx.product.indexOf("{{") !== 0) ? ctx.product : "", t.blanks.product],
      [t.factOneLiner, ctx.oneLiner || "", t.blanks.oneLiner]
    ];
    rows.forEach(function (r) {
      dl.appendChild(el("dt", "", r[0]));
      dl.appendChild(el("dd", r[1] ? "" : "is-blank", r[1] || r[2]));
    });
    return dl;
  }

  function stripTags(s) {
    var d = document.createElement("div");
    d.innerHTML = String(s || "");
    return d.textContent;
  }

  /* Fullscreen means "take over the workspace", not the browser's own mode:
     the collapsed rail stays reachable beside the page being reviewed. */
  var fullBox = null;
  var fullPrevCollapsed = false;

  function enterFullFrame(box) {
    if (fullBox && fullBox !== box) exitFullFrame();
    fullBox = box;
    fullPrevCollapsed = isCollapsed();
    setCollapsed(true, false);
    document.body.classList.add("frame-full");
    box.classList.add("is-full");
    var b = box.querySelector(".rf-full");
    if (b) { b.textContent = t.frameExit; b.focus(); }
  }

  function exitFullFrame() {
    var box = fullBox;
    fullBox = null;
    document.body.classList.remove("frame-full");
    if (box) {
      box.classList.remove("is-full");
      var b = box.querySelector(".rf-full");
      if (b) b.textContent = t.frameFull;
    }
    setCollapsed(fullPrevCollapsed, false);
  }

  document.addEventListener("keydown", function (e) {
    if (fullBox && (e.key === "Escape" || e.keyCode === 27)) exitFullFrame();
  });

  function setPhaseView(id, requested) {
    var view = requested || views[id] || readStoredView(id) || "guide";
    if (view !== "result") view = "guide";
    views[id] = view;
    writeStoredView(id, view);
    if (view !== "result" && fullBox) exitFullFrame();

    var article = document.getElementById("page-" + id);
    if (!article) return;

    var guide = article.querySelector('[data-view="guide"]');
    if (guide) guide.hidden = (view === "result");

    /* the criteria rail is part of the Guide: the Result view is a bare stage */
    if (view === "result") document.body.classList.add("result-open");
    else document.body.classList.remove("result-open");

    var segs = article.querySelector('[data-segs="' + id + '"]');
    if (segs) {
      segs.setAttribute("aria-label", t.viewLabel);
      Array.prototype.forEach.call(segs.querySelectorAll("[data-seg]"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-seg") === view ? "true" : "false");
      });
    }

    var panel = ensureResultPanel(id);
    renderResult(id);
    if (panel) panel.hidden = (view !== "result");
  }

  /* The buttons only rewrite the hash; the hashchange listener does the rest,
     so a view is linkable and the back button walks views as well as pages. */
  Array.prototype.forEach.call(document.querySelectorAll("[data-segs]"), function (segs) {
    var id = segs.getAttribute("data-segs");
    Array.prototype.forEach.call(segs.querySelectorAll("[data-seg]"), function (b) {
      b.addEventListener("click", function () {
        var target = "phase-" + id + "/" + b.getAttribute("data-seg");
        if ((location.hash || "").replace(/^#/, "") === target) setPhaseView(id, b.getAttribute("data-seg"));
        else location.hash = target;
      });
    });
  });

  /* ------------------------------------------------------ collapsed rail */

  function readCollapsed() {
    try { return window.localStorage.getItem("dsf.side") === "collapsed"; } catch (e) { return false; }
  }
  function writeCollapsed(v) {
    try { window.localStorage.setItem("dsf.side", v ? "collapsed" : "open"); } catch (e) { /* file:// */ }
  }
  function isCollapsed() { return document.body.classList.contains("side-collapsed"); }

  /* persist === false: apply the state without overwriting what the reader
     chose (used when fullscreen borrows the rail and gives it back). */
  function setCollapsed(collapsed, persist) {
    collapsed = !!collapsed;
    if (collapsed) document.body.classList.add("side-collapsed");
    else document.body.classList.remove("side-collapsed");

    var btn = document.getElementById("side-toggle");
    if (btn) {
      var label = collapsed ? t.sideExpand : t.sideCollapse;
      btn.setAttribute("aria-expanded", collapsed ? "false" : "true");
      btn.setAttribute("aria-label", label);
      btn.title = label;
    }
    if (persist !== false) writeCollapsed(collapsed);
  }

  /* Everything the renderer builds itself lives outside the [data-i18n] pass,
     which walks a NodeList captured at load: re-label it by hand. */
  function refreshDynamicText() {
    setCollapsed(isCollapsed(), false);

    Array.prototype.forEach.call(document.querySelectorAll(".nav-item.is-meta"), function (meta) {
      var nameEl = meta.querySelector(".name");
      meta.title = nameEl ? nameEl.textContent.trim() : "";
    });

    Array.prototype.forEach.call(document.querySelectorAll("[data-segs]"), function (segs) {
      segs.setAttribute("aria-label", t.viewLabel);
    });

    Object.keys(views).forEach(function (id) { renderResult(id); });
  }

  /* --------------------------------------------------------------- router */

  var pages = document.querySelectorAll(".page");
  var navItems = document.querySelectorAll(".nav-item");
  var toggle = document.getElementById("menu-toggle");

  function show(key, anchor) {
    var targetId = (key === "how") ? "page-how" : "page-" + key;
    var found = false;
    Array.prototype.forEach.call(pages, function (pg) {
      var match = (pg.id === targetId);
      pg.hidden = !match;
      if (match) found = true;
    });
    if (!found) { show("how"); return; }

    Array.prototype.forEach.call(navItems, function (n) {
      if (n.getAttribute("data-nav") === String(key)) n.setAttribute("aria-current", "page");
      else n.removeAttribute("aria-current");
    });
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");

    railKey = String(key);
    renderRail();

    /* the view is settled before any scrolling: a sub-anchor lives in the
       Guide, and scrollIntoView on a hidden node goes nowhere */
    if (fullBox) exitFullFrame();
    /* "how" is a page, not a phase: no Guide/Result, no rail */
    if (key !== "how") setPhaseView(key, pendingView);
    else document.body.classList.remove("result-open");
    pendingView = null;

    if (anchor) {
      var sub = document.getElementById("phase-" + key + "-" + anchor);
      if (sub && sub.scrollIntoView) sub.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  }

  /* #phase-4, #phase-2-research (a sub-anchor inside the Guide), and
     #phase-4/result (an explicit view) are all valid. \d+ because a phase
     number can reach two digits the moment the pipeline gains a phase. */
  function fromHash() {
    var h = (location.hash || "").replace(/^#/, "");
    if (!h || h === "how") return ["how", null, null];
    var m = h.match(/^phase-(\d+)(?:-([a-z]+))?(?:\/(guide|result))?$/);
    return m ? [m[1], m[2] || null, m[3] || null] : ["how", null, null];
  }

  /* An explicit /guide or /result in the hash wins; a bare sub-anchor forces
     the Guide; a plain #phase-N falls back to what that phase was left on. */
  var pendingView = null;
  function route() {
    var r = fromHash();
    pendingView = (r[0] === "how") ? null : (r[2] || (r[1] ? "guide" : null));
    show(r[0], r[1]);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  window.addEventListener("hashchange", route);

  /* --------------------------------------------------- quiet auto-refresh */

  /* Only over http(s): file:// can't fetch itself (blocked by the browser),
     and a static clone has no server re-rendering it anyway. Re-reads the
     page's own pipeline-data block every 5s and, only if it actually
     changed, swaps it in and re-runs every renderer it feeds -- so an
     unmodified page never touches the DOM and never flickers. */
  if (/^https?:$/.test(location.protocol) && typeof fetch === "function") {
    /* Built from parts on purpose: the header comment at the top of the file
       quotes this exact opening tag while documenting the contract, and this
       very function's source text (fetched back as part of the page) would
       be a third match if the literal appeared here whole. Matching on the
       fragments keeps this code from ever finding itself. */
    var PIPELINE_DATA_OPEN = "<script" + ' type="application/json" id="' + "pipeline-data" + '">';
    var SCRIPT_CLOSE = "</" + "script>";

    /* Several places in the raw HTML can contain that opening-tag text; the
       real block is whichever candidate's contents actually parse as JSON. */
    function extractPipelineData(html) {
      var result = null;
      var from = 0, idx;
      while ((idx = html.indexOf(PIPELINE_DATA_OPEN, from)) !== -1) {
        var start = idx + PIPELINE_DATA_OPEN.length;
        var end = html.indexOf(SCRIPT_CLOSE, start);
        if (end !== -1) {
          try { result = JSON.parse(html.slice(start, end)); } catch (e) { /* not this one */ }
        }
        from = idx + 1;
      }
      return result;
    }

    function pollTick() {
      if (document.hidden) return;
      fetch(location.href, { cache: "no-store" })
        .then(function (res) { return res.text(); })
        .then(function (html) {
          var next = extractPipelineData(html);
          if (!next || JSON.stringify(next) === JSON.stringify(data)) return;
          data = next;
          phases = data.phases || [];
          ctx = data.context || {};
          recomputeCurrent();
          renderState();
        })
        .catch(function () { /* offline or a transient error: stay quiet, try again next tick */ });
    }

    setInterval(pollTick, 5000);
  }

  var sideToggle = document.getElementById("side-toggle");
  if (sideToggle) {
    sideToggle.addEventListener("click", function () { setCollapsed(!isCollapsed(), true); });
  }

  applyLocale(readStored() || "en");
  setCollapsed(readCollapsed(), false);   /* apply the stored choice, do not rewrite it */
  route();
})();
