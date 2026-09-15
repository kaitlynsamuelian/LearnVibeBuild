// Skylar · Blackwall — self-contained force-directed graph (no external libs).
// Reads /api/graph (nodes + links) and draws stars (notes) joined by lines (links).

const COLORS = {
  core: "#ffd76a",
  note: "#7fb0ff",
  journal: "#77e0b5",
  reflection: "#d79bff",
};

const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");
const statsEl = document.getElementById("stats");
const emptyEl = document.getElementById("empty");
const panel = document.getElementById("panel");
const panelBody = document.getElementById("panel-body");
document.getElementById("panel-close").onclick = () => panel.classList.add("hidden");

let nodes = [];
let links = [];
let nodeById = new Map();

// view transform (pan + zoom)
let view = { x: 0, y: 0, scale: 1 };
let dragNode = null;
let panning = false;
let last = { x: 0, y: 0 };
let hoverNode = null;

function resize() {
  const r = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = r.width * dpr;
  canvas.height = r.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resize);

async function load() {
  try {
    const res = await fetch("/api/graph");
    const data = await res.json();
    links = data.links || [];
    nodes = (data.nodes || []).map((n, i) => ({
      ...n,
      x: (canvas.clientWidth / 2) + Math.cos(i) * 120 + (Math.random() - 0.5) * 60,
      y: (canvas.clientHeight / 2) + Math.sin(i) * 120 + (Math.random() - 0.5) * 60,
      vx: 0,
      vy: 0,
      deg: 0,
    }));
    nodeById = new Map(nodes.map((n) => [n.id, n]));
    links.forEach((l) => {
      const s = nodeById.get(l.source), t = nodeById.get(l.target);
      if (s) s.deg++;
      if (t) t.deg++;
    });
    statsEl.textContent = `${nodes.length} stars · ${links.length} lines`;
    emptyEl.classList.toggle("hidden", nodes.length > 0);
    // center view
    view = { x: 0, y: 0, scale: 1 };
  } catch (e) {
    statsEl.textContent = "couldn't reach the brain server";
  }
}

// ---- physics (simple force-directed) ----
function tick() {
  const cx = canvas.clientWidth / 2;
  const cy = canvas.clientHeight / 2;

  // repulsion
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      let dx = a.x - b.x, dy = a.y - b.y;
      let d2 = dx * dx + dy * dy || 0.01;
      const f = 2200 / d2;
      const d = Math.sqrt(d2);
      const fx = (dx / d) * f, fy = (dy / d) * f;
      a.vx += fx; a.vy += fy;
      b.vx -= fx; b.vy -= fy;
    }
  }
  // spring along links
  links.forEach((l) => {
    const s = nodeById.get(l.source), t = nodeById.get(l.target);
    if (!s || !t) return;
    let dx = t.x - s.x, dy = t.y - s.y;
    let d = Math.sqrt(dx * dx + dy * dy) || 0.01;
    const f = (d - 90) * 0.02;
    const fx = (dx / d) * f, fy = (dy / d) * f;
    s.vx += fx; s.vy += fy;
    t.vx -= fx; t.vy -= fy;
  });
  // gravity to center + integrate
  nodes.forEach((n) => {
    if (n === dragNode) return;
    n.vx += (cx - n.x) * 0.002;
    n.vy += (cy - n.y) * 0.002;
    n.vx *= 0.85; n.vy *= 0.85;
    n.x += n.vx; n.y += n.vy;
  });
}

// ---- rendering ----
function draw() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx.save();
  ctx.translate(view.x, view.y);
  ctx.scale(view.scale, view.scale);

  // links
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(150,170,255,0.22)";
  links.forEach((l) => {
    const s = nodeById.get(l.source), t = nodeById.get(l.target);
    if (!s || !t) return;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(t.x, t.y);
    ctx.stroke();
  });

  // nodes
  nodes.forEach((n) => {
    const r = 5 + Math.min(n.deg, 6) * 1.6;
    const color = COLORS[n.group] || "#9fb0d0";
    // glow
    ctx.beginPath();
    ctx.arc(n.x, n.y, r + 6, 0, Math.PI * 2);
    ctx.fillStyle = color + "22";
    ctx.fill();
    // star
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    if (view.scale > 0.6 || n === hoverNode) {
      ctx.fillStyle = "rgba(231,233,243,0.9)";
      ctx.font = "12px -apple-system, sans-serif";
      ctx.fillText(n.title, n.x + r + 4, n.y + 4);
    }
  });

  ctx.restore();
}

function frame() {
  tick();
  draw();
  requestAnimationFrame(frame);
}

// ---- interaction ----
function toWorld(px, py) {
  return { x: (px - view.x) / view.scale, y: (py - view.y) / view.scale };
}
function nodeAt(px, py) {
  const w = toWorld(px, py);
  let best = null, bestD = 16;
  nodes.forEach((n) => {
    const d = Math.hypot(n.x - w.x, n.y - w.y);
    if (d < bestD) { bestD = d; best = n; }
  });
  return best;
}

canvas.addEventListener("mousedown", (e) => {
  const n = nodeAt(e.offsetX, e.offsetY);
  if (n) { dragNode = n; } else { panning = true; }
  last = { x: e.offsetX, y: e.offsetY };
});
canvas.addEventListener("mousemove", (e) => {
  hoverNode = nodeAt(e.offsetX, e.offsetY);
  canvas.style.cursor = hoverNode ? "pointer" : (panning ? "grabbing" : "grab");
  if (dragNode) {
    const w = toWorld(e.offsetX, e.offsetY);
    dragNode.x = w.x; dragNode.y = w.y; dragNode.vx = 0; dragNode.vy = 0;
  } else if (panning) {
    view.x += e.offsetX - last.x;
    view.y += e.offsetY - last.y;
    last = { x: e.offsetX, y: e.offsetY };
  }
});
window.addEventListener("mouseup", (e) => {
  if (dragNode && Math.hypot(e.offsetX - last.x, e.offsetY - last.y) < 4) {
    openNote(dragNode);
  }
  dragNode = null; panning = false;
});
canvas.addEventListener("click", (e) => {
  const n = nodeAt(e.offsetX, e.offsetY);
  if (n) openNote(n);
});
canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const factor = e.deltaY < 0 ? 1.1 : 0.9;
  const wx = (e.offsetX - view.x) / view.scale;
  const wy = (e.offsetY - view.y) / view.scale;
  view.scale = Math.max(0.2, Math.min(3, view.scale * factor));
  view.x = e.offsetX - wx * view.scale;
  view.y = e.offsetY - wy * view.scale;
}, { passive: false });

// ---- note panel + tiny markdown renderer ----
async function openNote(node) {
  try {
    const res = await fetch("/api/note?id=" + encodeURIComponent(node.id));
    if (!res.ok) return;
    const note = await res.json();
    panelBody.innerHTML =
      `<h1>${escapeHtml(note.title)}</h1>` +
      `<div class="filepath">${escapeHtml(note.path)}</div>` +
      renderMarkdown(note.markdown);
    // make wikilinks clickable -> open that note
    panelBody.querySelectorAll("a.wikilink").forEach((a) => {
      a.onclick = () => {
        const target = nodeById.get(a.dataset.id) ||
          nodes.find((n) => n.title.toLowerCase() === a.dataset.id.toLowerCase());
        if (target) openNote(target);
      };
    });
    panel.classList.remove("hidden");
  } catch (_) {}
}

function escapeHtml(s) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// Minimal, safe markdown -> HTML (headings, lists, quotes, code, [[links]]).
function renderMarkdown(md) {
  const lines = md.split("\n");
  let html = "", inList = false;
  const closeList = () => { if (inList) { html += "</ul>"; inList = false; } };

  for (let raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (/^#\s+/.test(line)) { closeList(); continue; }        // title already shown
    if (/^##\s+/.test(line)) { closeList(); html += `<h2>${inline(line.replace(/^##\s+/, ""))}</h2>`; continue; }
    if (/^###\s+/.test(line)) { closeList(); html += `<h2>${inline(line.replace(/^###\s+/, ""))}</h2>`; continue; }
    if (/^>\s?/.test(line)) { closeList(); html += `<blockquote>${inline(line.replace(/^>\s?/, ""))}</blockquote>`; continue; }
    if (/^\s*[-*]\s+/.test(line)) {
      if (!inList) { html += "<ul>"; inList = true; }
      html += `<li>${inline(line.replace(/^\s*[-*]\s+/, ""))}</li>`;
      continue;
    }
    if (line.trim() === "") { closeList(); continue; }
    closeList();
    html += `<p>${inline(line)}</p>`;
  }
  closeList();
  return html;
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

// boot
resize();
load();
frame();
// light polling so the graph updates as Skylar writes new notes while you watch
setInterval(load, 15000);
