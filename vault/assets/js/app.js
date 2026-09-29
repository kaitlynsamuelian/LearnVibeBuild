(function () {
  const V = window.VAULT;
  const params = new URLSearchParams(location.search);

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function projectById(id) {
    return V.projects.find((p) => p.id === id);
  }

  function sectionById(id) {
    return V.sections.find((s) => s.id === id);
  }

  function entriesFor(project, sectionId) {
    return (project.entries && project.entries[sectionId]) || [];
  }

  function entryById(project, sectionId, id) {
    return entriesFor(project, sectionId).find((e) => e.id === id);
  }

  function countEntries(project) {
    return V.sections.reduce((n, s) => n + entriesFor(project, s.id).length, 0);
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function crumbs(parts) {
    const bits = parts
      .map((p, i) =>
        i === parts.length - 1 || !p.href
          ? `<span>${esc(p.label)}</span>`
          : `<a href="${p.href}">${esc(p.label)}</a><span>/</span>`
      )
      .join("");
    return `<nav class="crumbs">${bits}</nav>`;
  }

  function header() {
    return `
      <header class="top wrap">
        <a class="brand" href="index.html">${esc(V.site.name)}</a>
        <div class="who">${esc(V.site.owner)}  ·  ${esc(V.site.course)}</div>
      </header>`;
  }

  function footer() {
    return `
      <footer class="foot wrap">
        <span>Living docs. Add a card in <code>assets/js/data.js</code>, then a file in <code>content/</code>.</span>
        <a href="index.html">Back to lab</a>
      </footer>`;
  }

  function card(href, metaLeft, metaRight, title, blurb) {
    return `
      <a class="card" href="${href}">
        <div class="meta"><span>${esc(metaLeft)}</span><span>${esc(metaRight || "")}</span></div>
        <h3>${esc(title)}</h3>
        <p>${esc(blurb)}</p>
        <div class="go">Open →</div>
      </a>`;
  }

  function empty(msg) {
    return `<div class="empty">${esc(msg)}</div>`;
  }

  function renderHome() {
    const projects = V.projects
      .map((p) => {
        const n = countEntries(p);
        return card(
          `project.html?id=${encodeURIComponent(p.id)}`,
          p.status,
          `${n} files`,
          p.title,
          p.blurb
        );
      })
      .join("");

    $("body").innerHTML = `
      ${header()}
      <main class="wrap">
        ${crumbs([{ label: "Lab" }])}
        <section class="hero">
          <div class="kicker">${esc(V.site.course)}</div>
          <h1>${esc(V.site.name)}</h1>
          <p class="lede">${esc(V.site.blurb)}</p>
        </section>
        <div class="section-head">
          <h2>Project ideas</h2>
          <span class="count">${V.projects.length}</span>
        </div>
        <div class="grid">${projects}</div>
        <div class="how">
          <strong>How this stays alive.</strong>
          Each idea gets its own page. Inside that page: precedents / inspo, research online, research in person, and making.
          To add something, open <code>assets/js/data.js</code>, copy an entry, then add a matching file under
          <code>content/project-id/section-id/entry-id.html</code>.
        </div>
      </main>
      ${footer()}`;
  }

  function renderProject() {
    const project = projectById(params.get("id"));
    if (!project) {
      location.href = "index.html";
      return;
    }

    const sectionCards = V.sections
      .map((s) => {
        const n = entriesFor(project, s.id).length;
        return card(
          `section.html?project=${encodeURIComponent(project.id)}&section=${encodeURIComponent(s.id)}`,
          s.label,
          `${n}`,
          s.label,
          s.blurb
        );
      })
      .join("");

    $("body").innerHTML = `
      ${header()}
      <main class="wrap">
        ${crumbs([
          { label: "Lab", href: "index.html" },
          { label: project.title },
        ])}
        <section class="hero">
          <div class="kicker"><span class="chip ${project.status === "active" ? "active" : ""}">${esc(project.status)}</span></div>
          <h1>${esc(project.title)}</h1>
          <p class="lede">${esc(project.blurb)}</p>
          ${project.question ? `<div class="question">${esc(project.question)}</div>` : ""}
        </section>
        <div class="section-head">
          <h2>Inside this idea</h2>
          <span class="count">4 shelves</span>
        </div>
        <div class="grid four">${sectionCards}</div>
      </main>
      ${footer()}`;
  }

  function renderSection() {
    const project = projectById(params.get("project"));
    const section = sectionById(params.get("section"));
    if (!project || !section) {
      location.href = "index.html";
      return;
    }

    const items = entriesFor(project, section.id);
    const cards = items.length
      ? items
          .map((e) =>
            card(
              `entry.html?project=${encodeURIComponent(project.id)}&section=${encodeURIComponent(section.id)}&id=${encodeURIComponent(e.id)}`,
              e.source || section.label,
              e.date || "",
              e.title,
              e.blurb
            )
          )
          .join("")
      : empty("Nothing filed here yet. Add a card in data.js and a file in content/.");

    $("body").innerHTML = `
      ${header()}
      <main class="wrap">
        ${crumbs([
          { label: "Lab", href: "index.html" },
          { label: project.title, href: `project.html?id=${encodeURIComponent(project.id)}` },
          { label: section.label },
        ])}
        <section class="hero">
          <div class="kicker">${esc(project.title)}</div>
          <h1>${esc(section.label)}</h1>
          <p class="lede">${esc(section.blurb)}</p>
        </section>
        <div class="section-head">
          <h2>Files</h2>
          <span class="count">${items.length}</span>
        </div>
        <div class="grid">${cards}</div>
      </main>
      ${footer()}`;
  }

  function renderEntry() {
    const project = projectById(params.get("project"));
    const section = sectionById(params.get("section"));
    const entry = project && section ? entryById(project, section.id, params.get("id")) : null;
    if (!entry) {
      location.href = "index.html";
      return;
    }

    const src = `content/${project.id}/${section.id}/${entry.id}.html`;
    const meta = [entry.source, entry.date].filter(Boolean).join("  ·  ");

    $("body").innerHTML = `
      ${header()}
      <main class="wrap">
        ${crumbs([
          { label: "Lab", href: "index.html" },
          { label: project.title, href: `project.html?id=${encodeURIComponent(project.id)}` },
          { label: section.label, href: `section.html?project=${encodeURIComponent(project.id)}&section=${encodeURIComponent(section.id)}` },
          { label: entry.title },
        ])}
        <article class="entry">
          <div class="kicker">${esc(section.label)}</div>
          <h1>${esc(entry.title)}</h1>
          <div class="source">${esc(meta)}</div>
          <div class="prose" id="body">Loading…</div>
        </article>
      </main>
      ${footer()}`;

    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error("missing");
        return r.text();
      })
      .then((html) => {
        $("#body").innerHTML = html;
      })
      .catch(() => {
        $("#body").innerHTML = `<p>${esc(entry.blurb)}</p><p>No file at <code>${esc(src)}</code> yet. Add one to fill this card.</p>`;
      });
  }

  const page = document.body.getAttribute("data-page");
  if (page === "home") renderHome();
  if (page === "project") renderProject();
  if (page === "section") renderSection();
  if (page === "entry") renderEntry();
})();
