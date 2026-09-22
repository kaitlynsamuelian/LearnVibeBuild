/* =========================================================
   Learn Personal Assistants — shared behaviour
   ========================================================= */

(function () {
  "use strict";

  const PAGES = [
    { href: "index.html", label: "Home" },
    { href: "what-they-are.html", label: "What they are" },
    { href: "try-hosted.html", label: "Try a hosted one" },
    { href: "try-selfhost.html", label: "Run your own" },
    { href: "telegram.html", label: "Telegram & chats" },
    { href: "side-note.html", label: "Side note · Sept 21" },
    { href: "shelf.html", label: "Tool shelf" },
    { href: "glossary.html", label: "Glossary & FAQ" },
  ];

  const current = location.pathname.split("/").pop() || "index.html";

  const logoSvg =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><path d="M8 9h8M8 13h5"/></svg>';

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
          "<span>Learn Personal Assistants</span>" +
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
            '<a class="brand" href="index.html"><span class="brand-mark">' + logoSvg + '</span><span>Learn Personal Assistants</span></a>' +
            "<p>A beginner guide to personal AI agents that live in your chats — Muse, Hermes, OpenClaw, Telegram — not just another ChatGPT tab.</p>" +
          "</div>" +
          '<div><h4>Try</h4><ul>' +
            '<li><a href="try-hosted.html">Try a hosted one</a></li>' +
            '<li><a href="try-selfhost.html">Run your own</a></li>' +
            '<li><a href="telegram.html">Telegram &amp; chats</a></li>' +
            '<li><a href="shelf.html">Tool shelf</a></li>' +
          "</ul></div>" +
          '<div><h4>Learn</h4><ul>' +
            '<li><a href="what-they-are.html">What they are</a></li>' +
            '<li><a href="side-note.html">Side note · Sept 21</a></li>' +
            '<li><a href="glossary.html">Glossary &amp; FAQ</a></li>' +
            '<li><a href="../opensource/index.html">Learn Open Source \u2192</a></li>' +
            '<li><a href="../claude/index.html">Learn Claude \u2192</a></li>' +
          "</ul></div>" +
          '<div><h4>Official</h4><ul>' +
            '<li><a href="https://ai.meta.com/muse/" target="_blank" rel="noopener">Muse</a></li>' +
            '<li><a href="https://hermes-agent.nousresearch.com/docs/" target="_blank" rel="noopener">Hermes Agent</a></li>' +
            '<li><a href="https://openclaw.ai" target="_blank" rel="noopener">OpenClaw</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>Student learning resource. Not affiliated with Meta, Nous Research, OpenClaw, Telegram, or any tool named here.</span>" +
          "<span>Tools and install steps change. Confirm current details on the official sites.</span>" +
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
    try { localStorage.setItem("lpa-theme", theme); } catch (e) {}
  }

  function initTheme() {
    let theme = "dark";
    try {
      const saved = localStorage.getItem("lpa-theme");
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

  function initGlossary() {
    const input = document.getElementById("glossarySearch");
    if (!input) return;
    const terms = Array.prototype.slice.call(document.querySelectorAll(".term"));
    const empty = document.getElementById("glossaryEmpty");
    input.addEventListener("input", function () {
      const q = input.value.trim().toLowerCase();
      let shown = 0;
      terms.forEach(function (t) {
        const match = t.textContent.toLowerCase().indexOf(q) !== -1;
        t.classList.toggle("hide", !match);
        if (match) shown++;
      });
      if (empty) empty.style.display = shown === 0 ? "block" : "none";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildNav();
    buildFooter();
    initTheme();
    initMenu();
    initReveal();
    initAccordions();
    initGlossary();
  });
})();
