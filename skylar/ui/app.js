// Skylar web app — Talk, Brain (graph), Journal, Reading.

const COLORS = { core: "#ffd76a", note: "#7fb0ff", journal: "#77e0b5", reflection: "#d79bff" };

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
  if (name === "brain") { resizeGraph(); loadGraph(); }
  if (name === "journal") { loadEntries("journal"); setJournalDate(); }
  if (name === "reading") loadEntries("reflections");
}

// ---------- shared note panel ----------
const panel = document.getElementById("panel");
const panelBody = document.getElementById("panel-body");
document.getElementById("panel-close").onclick = () => panel.classList.add("hidden");
async function openNote(id) {
  try {
    const res = await fetch("/api/note?id=" + encodeURIComponent(id));
    if (!res.ok) return;
    const note = await res.json();
    panelBody.className = "md";
    panelBody.innerHTML = `<h1>${escapeHtml(note.title)}</h1><div class="filepath">${escapeHtml(note.path)}</div>` +
      renderMarkdown(note.markdown, { skipH1: true });
    wireWikilinks(panelBody);
    panel.classList.remove("hidden");
  } catch (_) {}
}
function wireWikilinks(root) {
  root.querySelectorAll("a.wikilink").forEach((a) => {
    a.onclick = () => {
      const id = a.dataset.id;
      const node = nodeById.get(id) || nodes.find((n) => n.title.toLowerCase() === id.toLowerCase());
      openNote(node ? node.id : id);
    };
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
    `<div class="bubble">${who === "skylar" && !cls ? renderMarkdown(text) : escapeHtml(text)}</div>`;
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
  const thinking = addMsg("skylar", "Skylar is thinking…", "thinking");
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

// ---------- BRAIN GRAPH ----------
const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");
let nodes = [], links = [], nodeById = new Map();
let view = { x: 0, y: 0, scale: 1 };
let dragNode = null, panning = false, last = { x: 0, y: 0 }, hoverNode = null;

function resizeGraph() {
  const r = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = r.width * dpr; canvas.height = r.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resizeGraph);

async function loadGraph() {
  try {
    const data = await (await fetch("/api/graph")).json();
    links = data.links || [];
    const W = canvas.clientWidth || 800, H = canvas.clientHeight || 600;
    const existing = nodeById;
    nodes = (data.nodes || []).map((n, i) => {
      const prev = existing.get(n.id);
      return prev ? Object.assign(prev, n) : {
        ...n, x: W / 2 + Math.cos(i) * 140 + (Math.random() - 0.5) * 60,
        y: H / 2 + Math.sin(i) * 140 + (Math.random() - 0.5) * 60, vx: 0, vy: 0, deg: 0,
      };
    });
    nodeById = new Map(nodes.map((n) => [n.id, n]));
    nodes.forEach((n) => (n.deg = 0));
    links.forEach((l) => { const s = nodeById.get(l.source), t = nodeById.get(l.target); if (s) s.deg++; if (t) t.deg++; });
    document.getElementById("graphstats").textContent = `${nodes.length} stars · ${links.length} lines`;
    document.getElementById("empty").classList.toggle("hidden", nodes.length > 0);
  } catch (_) {
    document.getElementById("graphstats").textContent = "couldn't reach the brain";
  }
}
async function loadBrainStats() {
  try {
    const data = await (await fetch("/api/graph")).json();
    document.getElementById("brainstats").textContent = `${(data.nodes || []).length} stars`;
    if (document.getElementById("view-brain").classList.contains("active")) loadGraph();
  } catch (_) {}
}

function tick() {
  const cx = canvas.clientWidth / 2, cy = canvas.clientHeight / 2;
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      let dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy || 0.01;
      const d = Math.sqrt(d2), f = 2200 / d2;
      const fx = (dx / d) * f, fy = (dy / d) * f;
      a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
    }
  }
  links.forEach((l) => {
    const s = nodeById.get(l.source), t = nodeById.get(l.target);
    if (!s || !t) return;
    let dx = t.x - s.x, dy = t.y - s.y, d = Math.sqrt(dx * dx + dy * dy) || 0.01;
    const f = (d - 90) * 0.02, fx = (dx / d) * f, fy = (dy / d) * f;
    s.vx += fx; s.vy += fy; t.vx -= fx; t.vy -= fy;
  });
  nodes.forEach((n) => {
    if (n === dragNode) return;
    n.vx += (cx - n.x) * 0.002; n.vy += (cy - n.y) * 0.002;
    n.vx *= 0.85; n.vy *= 0.85; n.x += n.vx; n.y += n.vy;
  });
}
function draw() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx.save(); ctx.translate(view.x, view.y); ctx.scale(view.scale, view.scale);
  ctx.lineWidth = 1; ctx.strokeStyle = "rgba(150,170,255,0.22)";
  links.forEach((l) => {
    const s = nodeById.get(l.source), t = nodeById.get(l.target);
    if (!s || !t) return;
    ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(t.x, t.y); ctx.stroke();
  });
  nodes.forEach((n) => {
    const r = 5 + Math.min(n.deg, 6) * 1.6, color = COLORS[n.group] || "#9fb0d0";
    ctx.beginPath(); ctx.arc(n.x, n.y, r + 6, 0, Math.PI * 2); ctx.fillStyle = color + "22"; ctx.fill();
    ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
    if (view.scale > 0.6 || n === hoverNode) {
      ctx.fillStyle = "rgba(231,233,243,0.9)"; ctx.font = "12px -apple-system, sans-serif";
      ctx.fillText(n.title, n.x + r + 4, n.y + 4);
    }
  });
  ctx.restore();
}
function frame() {
  if (document.getElementById("view-brain").classList.contains("active")) { tick(); draw(); }
  requestAnimationFrame(frame);
}
function toWorld(px, py) { return { x: (px - view.x) / view.scale, y: (py - view.y) / view.scale }; }
function nodeAt(px, py) {
  const w = toWorld(px, py); let best = null, bestD = 16;
  nodes.forEach((n) => { const d = Math.hypot(n.x - w.x, n.y - w.y); if (d < bestD) { bestD = d; best = n; } });
  return best;
}
canvas.addEventListener("mousedown", (e) => { const n = nodeAt(e.offsetX, e.offsetY); if (n) dragNode = n; else panning = true; last = { x: e.offsetX, y: e.offsetY }; });
canvas.addEventListener("mousemove", (e) => {
  hoverNode = nodeAt(e.offsetX, e.offsetY);
  canvas.style.cursor = hoverNode ? "pointer" : (panning ? "grabbing" : "grab");
  if (dragNode) { const w = toWorld(e.offsetX, e.offsetY); dragNode.x = w.x; dragNode.y = w.y; dragNode.vx = 0; dragNode.vy = 0; }
  else if (panning) { view.x += e.offsetX - last.x; view.y += e.offsetY - last.y; last = { x: e.offsetX, y: e.offsetY }; }
});
window.addEventListener("mouseup", (e) => {
  if (dragNode && Math.hypot(e.offsetX - last.x, e.offsetY - last.y) < 4) openNote(dragNode.id);
  dragNode = null; panning = false;
});
canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const factor = e.deltaY < 0 ? 1.1 : 0.9, wx = (e.offsetX - view.x) / view.scale, wy = (e.offsetY - view.y) / view.scale;
  view.scale = Math.max(0.2, Math.min(3, view.scale * factor));
  view.x = e.offsetX - wx * view.scale; view.y = e.offsetY - wy * view.scale;
}, { passive: false });

// ---------- boot ----------
resizeGraph();
loadBrainStats();
frame();
chatInput.focus();
