/* =========================================================
   Learn Claude — shared behaviour
   Injects nav + footer, handles theme, mobile menu,
   scroll reveal, accordions, and glossary search.
   ========================================================= */

(function () {
  "use strict";

  var PAGES = [
    { href: "index.html", label: "Home" },
    { href: "what-is-claude.html", label: "What is Claude" },
    { href: "getting-started.html", label: "Getting Started" },
    { href: "claude-code.html", label: "Claude Code" },
    { href: "ways-to-use.html", label: "Ways to Use" },
    { href: "prompting.html", label: "Prompting Tips" },
    { href: "shortcuts.html", label: "Shortcuts" },
    { href: "glossary.html", label: "Glossary & FAQ" },
  ];

  var current = location.pathname.split("/").pop() || "index.html";

  // Anthropic-style sunburst / asterisk mark
  var logoSvg =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/></svg>';

  function buildNav() {
    var links = PAGES.map(function (p) {
      var active = p.href === current ? ' class="active"' : "";
      return '<a href="' + p.href + '"' + active + ">" + p.label + "</a>";
    }).join("");

    var nav = document.createElement("header");
    nav.className = "nav";
    nav.innerHTML =
      '<div class="nav-inner">' +
        '<a class="brand" href="index.html">' +
          '<span class="brand-mark">' + logoSvg + "</span>" +
          "<span>Learn Claude</span>" +
        "</a>" +
        '<nav class="nav-links" id="navLinks" aria-label="Primary">' + links + "</nav>" +
        '<div class="nav-tools">' +
          '<a class="home-link" href="../index.html" aria-label="Back to all guides" title="All guides"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg><span class="home-link-label">All guides</span></a>' +
          '<button class="icon-btn" id="themeBtn" aria-label="Toggle light / dark theme" title="Toggle theme"></button>' +
          '<button class="icon-btn nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
          "</button>" +
        "</div>" +
      "</div>";
    document.body.insertAdjacentElement("afterbegin", nav);

    var skip = document.createElement("a");
    skip.className = "skip";
    skip.href = "#main";
    skip.textContent = "Skip to content";
    document.body.insertAdjacentElement("afterbegin", skip);
  }

  function buildFooter() {
    var footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a class="brand" href="index.html"><span class="brand-mark">' + logoSvg + '</span><span>Learn Claude</span></a>' +
            "<p>A friendly, unofficial guide that helps newcomers understand Claude \u2014 Anthropic's AI assistant \u2014 and Claude Code, its agentic coding tool.</p>" +
          "</div>" +
          '<div><h4>Learn</h4><ul>' +
            '<li><a href="what-is-claude.html">What is Claude</a></li>' +
            '<li><a href="getting-started.html">Getting Started</a></li>' +
            '<li><a href="claude-code.html">Claude Code</a></li>' +
            '<li><a href="ways-to-use.html">Ways to Use</a></li>' +
          "</ul></div>" +
          '<div><h4>Reference</h4><ul>' +
            '<li><a href="prompting.html">Prompting Tips</a></li>' +
            '<li><a href="shortcuts.html">Shortcuts</a></li>' +
            '<li><a href="glossary.html">Glossary &amp; FAQ</a></li>' +
            '<li><a href="../cursor/index.html">Learn Cursor \u2192</a></li>' +
          "</ul></div>" +
          '<div><h4>Official</h4><ul>' +
            '<li><a href="https://claude.ai" target="_blank" rel="noopener">claude.ai</a></li>' +
            '<li><a href="https://docs.claude.com" target="_blank" rel="noopener">Documentation</a></li>' +
            '<li><a href="https://code.claude.com/docs" target="_blank" rel="noopener">Claude Code Docs</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>Built as a learning resource. Not affiliated with or endorsed by Anthropic.</span>" +
          "<span>Always check the <a href=\"https://docs.claude.com\" target=\"_blank\" rel=\"noopener\">official docs</a> for the latest details.</span>" +
        "</div>" +
      "</div>";
    document.body.appendChild(footer);
  }

  var sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>';

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.getElementById("themeBtn");
    if (btn) btn.innerHTML = theme === "dark" ? sun : moon;
    try { localStorage.setItem("claude-theme", theme); } catch (e) {}
  }

  function initTheme() {
    var theme = "light";
    try {
      var saved = localStorage.getItem("claude-theme");
      if (saved) theme = saved;
    } catch (e) {}
    applyTheme(theme);
    var btn = document.getElementById("themeBtn");
    if (btn) {
      btn.addEventListener("click", function () {
        var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
      });
    }
  }

  function initMenu() {
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
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
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
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
        var item = head.closest(".acc-item");
        var body = item.querySelector(".acc-body");
        var isOpen = item.classList.toggle("open");
        head.setAttribute("aria-expanded", isOpen ? "true" : "false");
        body.style.maxHeight = isOpen ? body.scrollHeight + "px" : null;
      });
    });
  }

  function initGlossary() {
    var input = document.getElementById("glossarySearch");
    if (!input) return;
    var terms = Array.prototype.slice.call(document.querySelectorAll(".term"));
    var empty = document.getElementById("glossaryEmpty");
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      terms.forEach(function (t) {
        var match = t.textContent.toLowerCase().indexOf(q) !== -1;
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
