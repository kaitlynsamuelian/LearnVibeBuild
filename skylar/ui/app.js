// Skylar web app — Talk, Brain, Ideas, Journal, Reading.

// ---------- shared: tiny markdown renderer ----------
function escapeHtml(s) {
  return (s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
function inline(s) {
  s = escapeHtml(s);
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\[\[([^\]]+)\]\]/g, (m, inner) => {
    const target = inner.split("|")[0].trim();
    const label = (inner.split("|")[1] || target).trim();
    return `<a class="wikilink" data-id="${escapeHtml(target)}">${escapeHtml(label)}</a>`;
  });
  return s;
}
function renderMarkdown(md, { skipH1 = false } = {}) {
  const lines = (md || "").split("\n");
  let html = "", inList = false;
  const closeList = () => { if (inList) { html += "</ul>"; inList = false; } };
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (/^#\s+/.test(line)) { closeList(); if (!skipH1) html += `<h1>${inline(line.replace(/^#\s+/, ""))}</h1>`; continue; }
    if (/^#{2,3}\s+/.test(line)) { closeList(); html += `<h2>${inline(line.replace(/^#{2,3}\s+/, ""))}</h2>`; continue; }
    if (/^>\s?/.test(line)) { closeList(); html += `<blockquote>${inline(line.replace(/^>\s?/, ""))}</blockquote>`; continue; }
    if (/^\s*[-*]\s+/.test(line)) { if (!inList) { html += "<ul>"; inList = true; } html += `<li>${inline(line.replace(/^\s*[-*]\s+/, ""))}</li>`; continue; }
    if (line.trim() === "") { closeList(); continue; }
    closeList(); html += `<p>${inline(line)}</p>`;
  }
  closeList();
  return html;
}

// ---------- view switching ----------
const views = document.querySelectorAll(".view");
const navs = document.querySelectorAll(".nav");
navs.forEach((btn) => btn.addEventListener("click", () => setView(btn.dataset.view)));
function setView(name) {
  navs.forEach((n) => n.classList.toggle("active", n.dataset.view === name));
  views.forEach((v) => v.classList.toggle("active", v.id === "view-" + name));
  if (name === "brain") { brainMap.resize(); brainMap.load(); }
  if (name === "ideas") { ideasMap.resize(); ideasMap.load(); }
  if (name === "journal") { loadEntries("journal"); setJournalDate(); }
  if (name === "reading") loadEntries("reflections");
}

// ---------- shared note panel ----------
const panel = document.getElementById("panel");
const panelBody = document.getElementById("panel-body");
document.getElementById("panel-close").onclick = () => panel.classList.add("hidden");
async function openNote(id) {
  const tries = [id];
  if (id && !id.includes("/")) tries.push("notes/" + id);
  for (const candidate of tries) {
    try {
      const res = await fetch("/api/note?id=" + encodeURIComponent(candidate));
      if (!res.ok) continue;
      const note = await res.json();
      panelBody.className = "md";
      panelBody.innerHTML = `<h1>${escapeHtml(note.title)}</h1><div class="filepath">${escapeHtml(note.path)}</div>` +
        renderMarkdown(note.markdown, { skipH1: true });
      wireWikilinks(panelBody);
      panel.classList.remove("hidden");
      return;
    } catch (_) {}
  }
}
function wireWikilinks(root) {
  root.querySelectorAll("a.wikilink").forEach((a) => {
    a.onclick = () => openNote(a.dataset.id);
  });
}

// ---------- CHAT ----------
const chatLog = document.getElementById("chat-log");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

function addMsg(who, text, cls = "") {
  const wrap = document.createElement("div");
  wrap.className = `msg ${who} ${cls}`;
  wrap.innerHTML = `<div class="who">${who === "you" ? "You" : "Skylar"}</div>` +
    `<div class="bubble${who === "skylar" && !cls ? " md" : ""}">${who === "skylar" && !cls ? renderMarkdown(text) : escapeHtml(text)}</div>`;
  chatLog.appendChild(wrap);
  chatLog.scrollTop = chatLog.scrollHeight;
  return wrap;
}
chatInput.addEventListener("input", () => {
  chatInput.style.height = "auto";
  chatInput.style.height = Math.min(chatInput.scrollHeight, 180) + "px";
});
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); chatForm.requestSubmit(); }
});
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;
  addMsg("you", message);
  chatInput.value = ""; chatInput.style.height = "auto";
  chatSend.disabled = true;
  const thinking = addMsg("skylar", "thinking…", "thinking");
  try {
    const res = await fetch("/api/chat", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    thinking.remove();
    if (data.error) addMsg("skylar", "⚠️ " + data.error, "error");
    else { addMsg("skylar", data.reply); loadBrainStats(); }
  } catch (err) {
    thinking.remove();
    addMsg("skylar", "⚠️ Couldn't reach the server. Is it still running?", "error");
  } finally {
    chatSend.disabled = false;
    chatInput.focus();
  }
});

// ---------- JOURNAL ----------
const journalInput = document.getElementById("journal-input");
const journalStatus = document.getElementById("journal-status");
function setJournalDate() {
  document.getElementById("journal-date").textContent = new Date().toISOString().slice(0, 10);
}
document.getElementById("journal-save").addEventListener("click", async () => {
  const text = journalInput.value.trim();
  if (!text) return;
  journalStatus.textContent = "saving…";
  try {
    const res = await fetch("/api/journal", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (data.ok) { journalInput.value = ""; journalStatus.textContent = "saved ✓"; loadEntries("journal"); loadBrainStats(); }
    else journalStatus.textContent = data.error || "couldn't save";
  } catch (_) { journalStatus.textContent = "couldn't reach server"; }
  setTimeout(() => (journalStatus.textContent = ""), 2500);
});

// ---------- entry lists (journal + reflections) ----------
async function loadEntries(kind) {
  try {
    const res = await fetch("/api/entries?type=" + kind);
    const { entries } = await res.json();
    const listId = kind === "journal" ? "journal-list" : "reflection-list";
    const ul = document.getElementById(listId);
    ul.innerHTML = entries.length ? "" : `<li class="muted">Nothing yet.</li>`;
    entries.forEach((e) => {
      const li = document.createElement("li");
      li.innerHTML = `<div>${escapeHtml(e.title)}</div><div class="ename">${escapeHtml(e.name)}</div>`;
      li.onclick = () => kind === "journal" ? openNote(e.id) : openReading(e.id);
      ul.appendChild(li);
    });
  } catch (_) {}
}
async function openReading(id) {
  const body = document.getElementById("reading-body");
  body.className = "reading-body md";
  body.innerHTML = "<p class='muted'>loading…</p>";
  try {
    const res = await fetch("/api/note?id=" + encodeURIComponent(id));
    const note = await res.json();
    body.innerHTML = `<h1>${escapeHtml(note.title)}</h1><div class="filepath">${escapeHtml(note.path)}</div>` +
      renderMarkdown(note.markdown, { skipH1: true });
    wireWikilinks(body);
  } catch (_) { body.innerHTML = "<p class='muted'>couldn't load</p>"; }
}

async function loadBrainStats() {
  try {
    const data = await (await fetch("/api/graph?map=brain")).json();
    document.getElementById("brainstats").textContent = `${(data.nodes || []).length}`;
    if (document.getElementById("view-brain").classList.contains("active")) brainMap.load();
  } catch (_) {}
}

// ---------- clustered maps (Brain + Ideas) ----------
function convexHull(points) {
  if (points.length < 3) return points.slice();
  const pts = points.slice().sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  lower.pop(); upper.pop();
  return lower.concat(upper);
}
function padHull(pts, pad) {
  if (!pts.length) return pts;
  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
  return pts.map((p) => {
    const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy) || 1;
    return { x: p.x + (dx / d) * pad, y: p.y + (dy / d) * pad };
  });
}

function createMap({ canvasId, emptyId, statsId, legendId, map, viewId, centerSection }) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const emptyEl = document.getElementById(emptyId);
  const statsEl = document.getElementById(statsId);
  const legendEl = document.getElementById(legendId);
  let nodes = [], links = [], nodeById = new Map(), sections = [];
  let view = { x: 0, y: 0, scale: 1 };
  let dragNode = null, panning = false, last = { x: 0, y: 0 }, hoverNode = null;
  let focus = null;

  function colorFor(sectionId) {
    const s = sections.find((x) => x.id === sectionId);
    return (s && s.color) || "#c8c4d8";
  }
  function visible(n) { return !focus || n.section === focus; }

  function layoutAnchors(W, H) {
    const around = centerSection
      ? sections.filter((s) => s.id !== centerSection)
      : sections;
    const n = Math.max(around.length, 1);
    const R = Math.min(W, H) * (centerSection ? 0.38 : 0.34);
    around.forEach((s, i) => {
      const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
      s.ax = W / 2 + Math.cos(a) * R;
      s.ay = H / 2 + Math.sin(a) * R;
    });
    if (centerSection) {
      const c = sections.find((s) => s.id === centerSection);
      if (c) { c.ax = W / 2; c.ay = H / 2; }
    }
  }
  function resize() {
    const r = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = r.width * dpr; canvas.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function renderChips() {
    legendEl.innerHTML = "";
    sections.forEach((s) => {
      const btn = document.createElement("button");
      btn.className = "chip" + (focus === s.id ? " active" : "");
      btn.innerHTML = `<span class="dot" style="background:${s.color}"></span>${escapeHtml(s.label)}`;
      btn.onclick = () => { focus = focus === s.id ? null : s.id; renderChips(); };
      legendEl.appendChild(btn);
    });
  }
  async function load() {
    try {
      const data = await (await fetch("/api/graph?map=" + map)).json();
      sections = data.sections || [];
      links = data.links || [];
      const W = canvas.clientWidth || 800, H = canvas.clientHeight || 600;
      layoutAnchors(W, H);
      const existing = nodeById;
      nodes = (data.nodes || []).map((n, i) => {
        const prev = existing.get(n.id);
        const sec = sections.find((s) => s.id === n.section);
        const ax = sec ? sec.ax : W / 2, ay = sec ? sec.ay : H / 2;
        if (prev) return Object.assign(prev, n);
        const ang = i * 1.2;
        return {
          ...n, vx: 0, vy: 0, deg: 0,
          x: ax + Math.cos(ang) * 40 + (Math.random() - 0.5) * 24,
          y: ay + Math.sin(ang) * 40 + (Math.random() - 0.5) * 24,
        };
      });
      nodeById = new Map(nodes.map((n) => [n.id, n]));
      nodes.forEach((n) => (n.deg = 0));
      links.forEach((l) => {
        const s = nodeById.get(l.source), t = nodeById.get(l.target);
        if (s) s.deg++; if (t) t.deg++;
      });
      statsEl.textContent = `${nodes.length} notes  ·  ${links.length} links`;
      emptyEl.classList.toggle("hidden", nodes.length > 0);
      renderChips();
    } catch (_) {
      statsEl.textContent = "couldn't reach the map";
    }
  }
  function tick() {
    const W = canvas.clientWidth, H = canvas.clientHeight;
    layoutAnchors(W, H);
    const shown = nodes.filter(visible);
    for (let i = 0; i < shown.length; i++) {
      const a = shown[i];
      for (let j = i + 1; j < shown.length; j++) {
        const b = shown[j];
        let dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy || 0.01;
        const d = Math.sqrt(d2), f = (a.section === b.section ? 900 : 4200) / d2;
        const fx = (dx / d) * f, fy = (dy / d) * f;
        a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
      }
    }
    links.forEach((l) => {
      const s = nodeById.get(l.source), t = nodeById.get(l.target);
      if (!s || !t || !visible(s) || !visible(t)) return;
      let dx = t.x - s.x, dy = t.y - s.y, d = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const rest = s.section === t.section ? 58 : 240;
      const f = (d - rest) * (s.section === t.section ? 0.025 : 0.008);
      const fx = (dx / d) * f, fy = (dy / d) * f;
      s.vx += fx; s.vy += fy; t.vx -= fx; t.vy -= fy;
    });
    shown.forEach((n) => {
      if (n === dragNode) return;
      const sec = sections.find((s) => s.id === n.section);
      const ax = sec ? sec.ax : W / 2, ay = sec ? sec.ay : H / 2;
      const pull = n.kind === "hub" ? 0.05 : 0.028;
      n.vx += (ax - n.x) * pull; n.vy += (ay - n.y) * pull;
      n.vx *= 0.82; n.vy *= 0.82; n.x += n.vx; n.y += n.vy;
    });
  }
  function draw() {
    const W = canvas.clientWidth, H = canvas.clientHeight;
    ctx.clearRect(0, 0, W, H);
    ctx.save(); ctx.translate(view.x, view.y); ctx.scale(view.scale, view.scale);

    sections.forEach((sec) => {
      if (focus && focus !== sec.id) return;
      const pts = nodes.filter((n) => n.section === sec.id).map((n) => ({ x: n.x, y: n.y }));
      if (!pts.length) return;
      ctx.beginPath();
      if (pts.length < 3) {
        const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
        const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
        let r = 34;
        if (pts.length === 2) {
          r = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) / 2 + 28;
        }
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
      } else {
        const hull = padHull(convexHull(pts), 26);
        const mids = hull.map((p, i) => {
          const q = hull[(i + 1) % hull.length];
          return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
        });
        ctx.moveTo(mids[0].x, mids[0].y);
        for (let i = 0; i < hull.length; i++) {
          const p = hull[(i + 1) % hull.length];
          const m = mids[(i + 1) % mids.length];
          ctx.quadraticCurveTo(p.x, p.y, m.x, m.y);
        }
        ctx.closePath();
      }
      ctx.fillStyle = sec.color + "18";
      ctx.fill();
      ctx.strokeStyle = sec.color + "55";
      ctx.lineWidth = 1;
      ctx.stroke();
      const lx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
      const ly = Math.min(...pts.map((p) => p.y)) - 22;
      ctx.fillStyle = sec.color;
      ctx.font = "600 13px Instrument Sans, ui-sans-serif, sans-serif";
      ctx.fillText(sec.label, lx - ctx.measureText(sec.label).width / 2, ly);
    });

    ctx.lineWidth = 1; ctx.strokeStyle = "rgba(255,255,255,0.14)";
    links.forEach((l) => {
      const s = nodeById.get(l.source), t = nodeById.get(l.target);
      if (!s || !t || !visible(s) || !visible(t)) return;
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(t.x, t.y); ctx.stroke();
    });
    nodes.forEach((n) => {
      if (!visible(n)) return;
      const color = colorFor(n.section);
      const hub = n.kind === "hub";
      const r = hub ? 9 : 5 + Math.min(n.deg, 6) * 1.2;
      const hot = n === hoverNode;
      ctx.beginPath(); ctx.arc(n.x, n.y, r + (hot ? 10 : 7), 0, Math.PI * 2);
      ctx.fillStyle = color + "30"; ctx.fill();
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
      const sec = sections.find((s) => s.id === n.section);
      const sameName = sec && n.title.trim().toLowerCase() === sec.label.trim().toLowerCase();
      if (!sameName && (hub || view.scale > 0.7 || hot)) {
        ctx.fillStyle = "rgba(244,241,234,0.92)";
        ctx.font = (hub ? "600 " : "") + "13px Instrument Sans, ui-sans-serif, sans-serif";
        ctx.fillText(n.title, n.x + r + 7, n.y + 4);
      }
    });
    ctx.restore();
  }
  function isActive() {
    return document.getElementById(viewId).classList.contains("active");
  }
  function toWorld(px, py) { return { x: (px - view.x) / view.scale, y: (py - view.y) / view.scale }; }
  function nodeAt(px, py) {
    const w = toWorld(px, py); let best = null, bestD = 18;
    nodes.filter(visible).forEach((n) => {
      const d = Math.hypot(n.x - w.x, n.y - w.y); if (d < bestD) { bestD = d; best = n; }
    });
    return best;
  }
  canvas.addEventListener("mousedown", (e) => {
    const n = nodeAt(e.offsetX, e.offsetY);
    if (n) dragNode = n; else panning = true;
    last = { x: e.offsetX, y: e.offsetY };
  });
  canvas.addEventListener("mousemove", (e) => {
    hoverNode = nodeAt(e.offsetX, e.offsetY);
    canvas.style.cursor = hoverNode ? "pointer" : (panning ? "grabbing" : "grab");
    if (dragNode) {
      const w = toWorld(e.offsetX, e.offsetY);
      dragNode.x = w.x; dragNode.y = w.y; dragNode.vx = 0; dragNode.vy = 0;
    } else if (panning) {
      view.x += e.offsetX - last.x; view.y += e.offsetY - last.y;
      last = { x: e.offsetX, y: e.offsetY };
    }
  });
  window.addEventListener("mouseup", (e) => {
    if (!isActive()) { dragNode = null; panning = false; return; }
    if (dragNode && Math.hypot(e.offsetX - last.x, e.offsetY - last.y) < 4) openNote(dragNode.id);
    dragNode = null; panning = false;
  });
  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    const wx = (e.offsetX - view.x) / view.scale, wy = (e.offsetY - view.y) / view.scale;
    view.scale = Math.max(0.25, Math.min(2.8, view.scale * factor));
    view.x = e.offsetX - wx * view.scale; view.y = e.offsetY - wy * view.scale;
  }, { passive: false });

  return { resize, load, tick, draw, isActive };
}

const brainMap = createMap({
  canvasId: "graph-brain", emptyId: "empty-brain", statsId: "graphstats",
  legendId: "brain-legend", map: "brain", viewId: "view-brain",
});
const ideasMap = createMap({
  canvasId: "graph-ideas", emptyId: "empty-ideas", statsId: "ideasstats",
  legendId: "ideas-legend", map: "capstone", viewId: "view-ideas",
  centerSection: "research",
});

function frame() {
  if (brainMap.isActive()) { brainMap.tick(); brainMap.draw(); }
  if (ideasMap.isActive()) { ideasMap.tick(); ideasMap.draw(); }
  requestAnimationFrame(frame);
}
window.addEventListener("resize", () => { brainMap.resize(); ideasMap.resize(); });

// ---------- boot ----------
brainMap.resize();
ideasMap.resize();
loadBrainStats();
frame();
chatInput.focus();
