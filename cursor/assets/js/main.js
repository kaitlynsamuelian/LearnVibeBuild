/* =========================================================
   Learn Cursor — shared behaviour
   Injects nav + footer, handles theme, mobile menu,
   scroll reveal, accordions, and glossary search.
   ========================================================= */

(function () {
  "use strict";

  // ---- Site structure (single source of truth for nav) ----
  const PAGES = [
    { href: "index.html", label: "Home" },
    { href: "getting-started.html", label: "Getting Started" },
    { href: "interface.html", label: "The Interface" },
    { href: "features.html", label: "Features" },
    { href: "ways-to-use.html", label: "Ways to Use" },
    { href: "prompting.html", label: "Prompting Tips" },
    { href: "shortcuts.html", label: "Shortcuts" },
    { href: "glossary.html", label: "Glossary & FAQ" },
  ];

  const current = location.pathname.split("/").pop() || "index.html";

  // ---- Brand logo mark (simple cursor arrow) ----
  const logoSvg =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3l7 17 2.5-7L20 10z"/></svg>';

  // ---- Build navigation ----
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
          "<span>Learn Cursor</span>" +
        "</a>" +
        '<nav class="nav-links" id="navLinks" aria-label="Primary">' + links + "</nav>" +
        '<div class="nav-tools">' +
          '<button class="icon-btn" id="themeBtn" aria-label="Toggle light / dark theme" title="Toggle theme"></button>' +
          '<button class="icon-btn nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
          "</button>" +
        "</div>" +
      "</div>";

    document.body.insertAdjacentElement("afterbegin", nav);

    // Skip link
    const skip = document.createElement("a");
    skip.className = "skip";
    skip.href = "#main";
    skip.textContent = "Skip to content";
    document.body.insertAdjacentElement("afterbegin", skip);
  }

  // ---- Build footer ----
  function buildFooter() {
    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a class="brand" href="index.html"><span class="brand-mark">' + logoSvg + '</span><span>Learn Cursor</span></a>' +
            "<p>A friendly, unofficial guide that helps brand-new users understand Cursor \u2014 the AI code editor \u2014 from the very first launch.</p>" +
          "</div>" +
          '<div><h4>Learn</h4><ul>' +
            '<li><a href="getting-started.html">Getting Started</a></li>' +
            '<li><a href="interface.html">The Interface</a></li>' +
            '<li><a href="features.html">Features</a></li>' +
            '<li><a href="ways-to-use.html">Ways to Use</a></li>' +
          "</ul></div>" +
          '<div><h4>Reference</h4><ul>' +
            '<li><a href="prompting.html">Prompting Tips</a></li>' +
            '<li><a href="shortcuts.html">Shortcuts</a></li>' +
            '<li><a href="glossary.html">Glossary &amp; FAQ</a></li>' +
          "</ul></div>" +
          '<div><h4>Official</h4><ul>' +
            '<li><a href="https://cursor.com" target="_blank" rel="noopener">cursor.com</a></li>' +
            '<li><a href="https://docs.cursor.com" target="_blank" rel="noopener">Documentation</a></li>' +
            '<li><a href="https://forum.cursor.com" target="_blank" rel="noopener">Community Forum</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>Built as a learning resource. Not affiliated with or endorsed by Cursor / Anysphere.</span>" +
          "<span>Always double-check the <a href=\"https://docs.cursor.com\" target=\"_blank\" rel=\"noopener\">official docs</a> for the latest details.</span>" +
        "</div>" +
      "</div>";
    document.body.appendChild(footer);
  }

  // ---- Theme handling ----
  const sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>';

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("themeBtn");
    if (btn) btn.innerHTML = theme === "light" ? moon : sun;
    try { localStorage.setItem("lc-theme", theme); } catch (e) {}
  }

  function initTheme() {
    let theme = "dark";
    try {
      const saved = localStorage.getItem("lc-theme");
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

  // ---- Mobile menu ----
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

  // ---- Scroll reveal ----
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

  // ---- Accordions (FAQ) ----
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

  // ---- Glossary search ----
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

  // ---- Init ----
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
