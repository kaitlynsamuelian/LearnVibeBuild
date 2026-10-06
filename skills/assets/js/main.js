/* =========================================================
   Learn Agent Skills — shared behaviour
   Nav, footer, theme, reveal, accordions, skill builder.
   ========================================================= */

(function () {
  "use strict";

  const PAGES = [
    { href: "index.html", label: "Home" },
    { href: "use.html", label: "Use them" },
    { href: "existing.html", label: "Existing" },
    { href: "genres.html", label: "Genres" },
    { href: "write.html", label: "Write one" },
    { href: "builder.html", label: "Builder" },
    { href: "compare.html", label: "Compare" }
  ];

  const current = location.pathname.split("/").pop() || "index.html";

  const logoSvg =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>';

  function buildNav() {
    const links = PAGES.map(function (p) {
      const active = p.href === current ? " class=\"active\"" : "";
      return '<a href="' + p.href + '"' + active + ">" + p.label + "</a>";
    }).join("");

    const nav = document.createElement("header");
    nav.className = "nav";
    nav.innerHTML =
      '<div class="nav-inner">' +
        '<a class="brand" href="index.html">' +
          '<span class="brand-mark">' + logoSvg + "</span>" +
          "<span>Learn Agent Skills</span>" +
        "</a>" +
        '<nav class="nav-links" id="navLinks" aria-label="Primary">' + links + "</nav>" +
        '<div class="nav-tools">' +
          '<a class="home-link" href="../index.html" aria-label="Back to all artifacts" title="All artifacts"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg><span class="home-link-label">All artifacts</span></a>' +
          '<button class="icon-btn" id="themeBtn" aria-label="Toggle light / dark theme" title="Toggle theme"></button>' +
          '<button class="icon-btn nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
          "</button>" +
        "</div>" +
      "</div>";

    document.body.insertAdjacentElement("afterbegin", nav);

    const skip = document.createElement("a");
    skip.className = "skip";
    skip.href = "#main";
    skip.textContent = "Skip to content";
    document.body.insertAdjacentElement("afterbegin", skip);
  }

  function buildFooter() {
    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a class="brand" href="index.html"><span class="brand-mark">' + logoSvg + '</span><span>Learn Agent Skills</span></a>' +
            "<p>A beginner guide to Cursor Agent Skills: reusable instruction packs the agent can follow when the work matches.</p>" +
          "</div>" +
          '<div><h4>Learn</h4><ul>' +
            '<li><a href="use.html">Use them</a></li>' +
            '<li><a href="use.html#find-skills">Where files live</a></li>' +
            '<li><a href="existing.html">Named skills to install</a></li>' +
            '<li><a href="existing.html#impeccable">Impeccable</a></li>' +
            '<li><a href="genres.html">Genres</a></li>' +
            '<li><a href="write.html">Write one</a></li>' +
            '<li><a href="builder.html">Skill Builder</a></li>' +
            '<li><a href="compare.html">Compare A/B</a></li>' +
          "</ul></div>" +
          '<div><h4>This collection</h4><ul>' +
            '<li><a href="../cursor/index.html">Learn Cursor</a></li>' +
            '<li><a href="../claude/index.html">Learn Claude</a></li>' +
            '<li><a href="../index.html">All artifacts</a></li>' +
          "</ul></div>" +
          '<div><h4>Official</h4><ul>' +
            '<li><a href="https://cursor.com/docs/skills" target="_blank" rel="noopener">Cursor Skills docs</a></li>' +
            '<li><a href="https://cursor.com/help/customization/skills" target="_blank" rel="noopener">Skills help</a></li>' +
            '<li><a href="https://agentskills.io" target="_blank" rel="noopener">Agent Skills standard</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>Student learning resource. Not affiliated with Cursor / Anysphere.</span>" +
          "<span>Skills and menus change. Confirm current details in Cursor and on the official docs.</span>" +
        "</div>" +
      "</div>";
    document.body.appendChild(footer);
  }

  const sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>';

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("themeBtn");
    if (btn) btn.innerHTML = theme === "light" ? moon : sun;
    try { localStorage.setItem("lsk-theme", theme); } catch (e) {}
  }

  function initTheme() {
    let theme = "dark";
    try {
      const saved = localStorage.getItem("lsk-theme");
      if (saved) theme = saved;
    } catch (e) {}
    applyTheme(theme);
    const btn = document.getElementById("themeBtn");
    if (btn) {
      btn.addEventListener("click", function () {
        const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(next);
      });
    }
  }

  function initMenu() {
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  function initAccordions() {
    document.querySelectorAll(".acc-head").forEach(function (head) {
      head.addEventListener("click", function () {
        const item = head.closest(".acc-item");
        const body = item.querySelector(".acc-body");
        const isOpen = item.classList.toggle("open");
        head.setAttribute("aria-expanded", isOpen ? "true" : "false");
        body.style.maxHeight = isOpen ? body.scrollHeight + "px" : null;
      });
    });
  }

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 64);
  }

  function escapeYaml(value) {
    return String(value || "").replace(/"/g, '\\"').replace(/\n/g, " ").trim();
  }

  function bullets(text) {
    return String(text || "")
      .split("\n")
      .map(function (line) { return line.replace(/^\s*[-*]\s*/, "").trim(); })
      .filter(Boolean);
  }

  function buildSkillMarkdown(data) {
    const name = data.name || "my-skill";
    const title = data.title || name.split("-").map(function (w) {
      return w.charAt(0).toUpperCase() + w.slice(1);
    }).join(" ");
    const desc = escapeYaml(data.description) || "What this skill does and when to use it.";
    const when = bullets(data.when);
    const steps = bullets(data.steps);
    const extra = String(data.extra || "").trim();
    const paths = String(data.paths || "").trim();
    const slashOnly = !!data.slashOnly;

    let fm = "---\n";
    fm += "name: " + name + "\n";
    fm += "description: " + desc + "\n";
    if (paths) fm += "paths: " + paths + "\n";
    if (slashOnly) fm += "disable-model-invocation: true\n";
    fm += "---\n\n";

    let body = "# " + title + "\n\n";
    body += "Follow this skill exactly. If a step is unclear, ask before guessing.\n\n";
    body += "## When to use\n\n";
    if (when.length) {
      when.forEach(function (line) { body += "- " + line + "\n"; });
    } else {
      body += "- Use when the user's request matches the description.\n";
    }
    body += "\n## Instructions\n\n";
    if (steps.length) {
      steps.forEach(function (line, i) { body += (i + 1) + ". " + line + "\n"; });
    } else {
      body += "1. Restate the goal in one sentence.\n";
      body += "2. Do the work in small, reviewable steps.\n";
      body += "3. Stop and ask if a choice would lock the user in.\n";
    }
    if (extra) {
      body += "\n## Extra notes\n\n" + extra + "\n";
    }
    return fm + body;
  }

  function initBuilder() {
    const form = document.getElementById("skillForm");
    const preview = document.getElementById("skillPreview");
    if (!form || !preview) return;

    const nameInput = document.getElementById("skillName");
    const toast = document.getElementById("builderToast");

    function dataFromForm() {
      const rawName = nameInput.value;
      const name = slugify(rawName) || "my-skill";
      return {
        name: name,
        title: document.getElementById("skillTitle").value.trim(),
        description: document.getElementById("skillDesc").value.trim(),
        when: document.getElementById("skillWhen").value,
        steps: document.getElementById("skillSteps").value,
        extra: document.getElementById("skillExtra").value,
        paths: document.getElementById("skillPaths").value.trim(),
        slashOnly: document.getElementById("skillSlash").checked
      };
    }

    function render() {
      const data = dataFromForm();
      if (nameInput.value && slugify(nameInput.value) !== nameInput.value) {
        nameInput.value = data.name;
      }
      preview.textContent = buildSkillMarkdown(data);
    }

    form.addEventListener("input", render);
    form.addEventListener("change", render);
    render();

    document.getElementById("copySkill").addEventListener("click", function () {
      const text = preview.textContent;
      function ok() {
        if (toast) toast.textContent = "Copied. Paste it into a SKILL.md file.";
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(ok).catch(function () {
          window.prompt("Copy this SKILL.md:", text);
        });
      } else {
        window.prompt("Copy this SKILL.md:", text);
      }
    });

    document.getElementById("downloadSkill").addEventListener("click", function () {
      const data = dataFromForm();
      const blob = new Blob([preview.textContent], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "SKILL.md";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      if (toast) toast.textContent = "Downloaded SKILL.md. Put it in a folder named " + data.name + ".";
    });

    document.querySelectorAll("[data-fill]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const kind = btn.getAttribute("data-fill");
        const packs = {
          cycle: {
            name: "class-cycle",
            title: "Class cycle check-in",
            desc: "Helps pick and ship a small Learn, Vibe, Build cycle artifact. Use when the user mentions a studio cycle, weekly build, cycle check-in, or wants a small thing to make this week.",
            when: "The user is starting a class cycle\nThey want a small artifact, not a giant product\nThey ask what to build this week",
            steps: "Ask what they actually want to try this week, in one sentence\nKeep the build static HTML, CSS, and a little JavaScript unless they ask otherwise\nMatch the existing Learn, Vibe, Build hub pattern: own folder, README, tile on the root index\nDo not delete earlier research or artifacts\nShow them how to open it with python3 serve.py on port 4321"
          },
          critique: {
            name: "sounding-board-notes",
            title: "Sounding-board notes",
            desc: "Turns messy critique or desk-crit notes into a page you can sit with. Use when the user has feedback from a person, a review, or a sounding-board session and wants it organized without locking a product.",
            when: "The user pastes critique notes\nThey mention a sounding board, desk crit, or feedback dump\nThey want a talking page, not a pitch",
            steps: "Keep their language. Do not polish them into a different person\nSeparate what was said from what you inferred\nDo not treat the notes as a locked product spec\nOffer next questions, not a brand system"
          },
          design: {
            name: "website-look",
            title: "Website look",
            desc: "Designs or restyles a site with a specific aesthetic instead of generic AI UI. Use when the user asks to design a website a certain way, pick a look, restyle pages, or says the UI looks like default AI. Not for one-line color tweaks.",
            when: "The user wants a site or page to look like a specific thing\nThey mention a vibe, brand, anti-AI-slop, restyle, or design pass\nThey are working on HTML, CSS, or layout",
            steps: "Ask for the look in concrete terms: references, adjectives, what to avoid\nLock type, color, spacing, and motion before generating lots of pages\nAvoid generic AI defaults: Inter on white, purple gradients, identical card grids, stock icon soup\nMatch the existing repo if one already has a face. Do not clone a neighbor artifact on the Learn Vibe Build hub\nKeep it shippable static HTML and CSS unless they ask for another stack"
          },
          voice: {
            name: "rewrite-in-my-words",
            title: "Rewrite in my words",
            desc: "Rewrites text in the user's own voice. Use when they say rewrite in my words, in my voice, make this sound like me, homework language, or not like a brochure. Not for code or one-line typos.",
            when: "They paste a draft that sounds like AI\nThey say rewrite, in my words, sound like me, or homework voice\nAssignments, about copy, or notes that should stay human",
            steps: "Point at a real sample of how they write, or ask them to paste one\nKeep the required format (assignment headings, hub copy). Only change the language\nFirst person, concrete, short paragraphs. Keep their opinions and hedges\nNo em dashes. No brochure words like robust, leverage, delve\nList anything you inferred that was not in the source so they can cut it"
          }
        };
        const pack = packs[kind];
        if (!pack) return;
        nameInput.value = pack.name;
        document.getElementById("skillTitle").value = pack.title;
        document.getElementById("skillDesc").value = pack.desc;
        document.getElementById("skillWhen").value = pack.when;
        document.getElementById("skillSteps").value = pack.steps;
        render();
        if (toast) toast.textContent = "Loaded a starter. Edit it so it sounds like you.";
      });
    });
  }

  function initCompareCopy() {
    const toast = document.getElementById("compareToast");
    function bind(btnId, preId, label) {
      const btn = document.getElementById(btnId);
      const pre = document.getElementById(preId);
      if (!btn || !pre) return;
      btn.addEventListener("click", function () {
        const text = pre.textContent;
        function ok() {
          if (toast) toast.textContent = "Copied " + label + ". Paste it into a new Agent chat.";
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(ok).catch(function () {
            window.prompt("Copy this prompt:", text);
          });
        } else {
          window.prompt("Copy this prompt:", text);
        }
      });
    }
    bind("copyPromptA", "promptA", "prompt A");
    bind("copyPromptB", "promptB", "prompt B");
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildNav();
    buildFooter();
    initTheme();
    initMenu();
    initReveal();
    initAccordions();
    initBuilder();
    initCompareCopy();
  });
})();
