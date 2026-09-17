#!/usr/bin/env python3
"""
Skylar UI server — the app behind Skylar's web interface.

Endpoints:
  GET  /api/graph                  -> nodes (notes) + links (from [[wikilinks]])
  GET  /api/note?id=<id>           -> one note's markdown
  GET  /api/entries?type=journal   -> list journal (or reflections) entries, newest first
  POST /api/chat  {message}        -> talk to Skylar (runs Claude Code, she may update her brain)
  POST /api/journal {text}         -> save today's journal entry (plain file write, no AI)

Talking to Skylar shells out to the `claude` CLI in the skylar/ folder, so she loads
her personality (CLAUDE.md) + memory and can read/write her own brain. She is given
file + web tools but NOT shell access, so she can't run arbitrary commands.

Run:  python3 server.py   (from skylar/ui)   then open the printed URL.
"""

import http.server
import json
import re
import socketserver
import subprocess
import urllib.parse
from datetime import date
from pathlib import Path

# ---------------------------------------------------------------------------
UI_DIR = Path(__file__).resolve().parent
SKYLAR_DIR = UI_DIR.parent
BRAIN_DIR = SKYLAR_DIR / "brain"
JOURNAL_DIR = BRAIN_DIR / "journal"
TEMPLATE = SKYLAR_DIR / "templates" / "journal-entry.md"

PORT = 4173

GROUPS = {"notes": "note", "journal": "journal", "reflections": "reflection"}
WIKILINK_RE = re.compile(r"\[\[([^\]]+)\]\]")
FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.S)

# Life districts for the Brain map (not file-type). Journal stays in Journal;
# capstone ideas explode on the separate Ideas map.
BRAIN_SECTIONS = [
    {"id": "you", "label": "You", "color": "#e8c48a"},
    {"id": "people", "label": "People", "color": "#9db7ff"},
    {"id": "goals", "label": "Goals", "color": "#c9b8ff"},
    {"id": "doing", "label": "Doing", "color": "#8ad4bc"},
    {"id": "worries", "label": "Worries", "color": "#f0a0a8"},
    {"id": "learning", "label": "Learning", "color": "#7ec8e8"},
]
YOU_STEMS = {"about-you", "values", "creative-technology-and-design", "welcome"}
PEOPLE_STEMS = {"mom", "dad", "brother", "chloe", "sasha", "riley"}
GOALS_STEMS = {
    "goals", "senior-capstone", "procrastination",
    "nervous-system-regulation", "fitness-and-nutrition",
}
DOING_STEMS = {"doing"}
WORRIES_STEMS = {"worries"}
LEARNING_STEMS = {"learning"}
HIDDEN_STEMS = {"index"}
# These live on the Ideas map, not the life map (except senior-capstone = bridge).
CAPSTONE_PREFIXES = ("idea-", "capstone-")

# Tools Skylar may use when chatting from the UI (NO Bash / shell).
CHAT_TOOLS = "Read,Edit,Write,Glob,Grep,WebSearch,WebFetch"

# Keeps the browser conversation continuous across messages.
_chat_session = {"id": None}


# ---------------------------------------------------------------------------
# Reading the brain (READ ONLY)
# ---------------------------------------------------------------------------
def _node_id(path: Path) -> str:
    return str(path.relative_to(BRAIN_DIR).with_suffix(""))


def _title(path: Path, text: str) -> str:
    for line in text.splitlines():
        line = line.strip()
        if line.startswith("# "):
            return line[2:].strip()
    return path.stem


def _group_for(path: Path) -> str:
    rel = path.relative_to(BRAIN_DIR)
    if len(rel.parts) > 1 and rel.parts[0] in GROUPS:
        return GROUPS[rel.parts[0]]
    return "core"


def _frontmatter(text: str) -> dict:
    m = FRONTMATTER_RE.match(text or "")
    if not m:
        return {}
    meta = {}
    for line in m.group(1).splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip().lower()] = v.strip().strip("\"'")
    return meta


def _slug(s: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", (s or "").lower()).strip("-")
    return s[:48] or "idea"


def _section_for(path: Path, text: str):
    """Life-district for the Brain map, or None to hide from that map."""
    rel = path.relative_to(BRAIN_DIR)
    stem = path.stem
    if stem in HIDDEN_STEMS:
        return None
    if rel.parts and rel.parts[0] in ("journal", "reflections"):
        return None
    meta = _frontmatter(text)
    if meta.get("section") in {s["id"] for s in BRAIN_SECTIONS}:
        return meta["section"]
    if stem in YOU_STEMS:
        return "you"
    if stem in PEOPLE_STEMS:
        return "people"
    if stem in GOALS_STEMS:
        return "goals"
    if stem in DOING_STEMS:
        return "doing"
    if stem in WORRIES_STEMS:
        return "worries"
    if stem in LEARNING_STEMS:
        return "learning"
    if stem.startswith(CAPSTONE_PREFIXES):
        return None
    return "learning"


def collect_markdown_files():
    if not BRAIN_DIR.exists():
        return []
    return sorted(p for p in BRAIN_DIR.rglob("*.md"))


def _read_files():
    files = collect_markdown_files()
    file_text = {}
    nodes = []
    alias_to_id = {}
    for path in files:
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            text = ""
        file_text[path] = text
        nid = _node_id(path)
        title = _title(path, text)
        nodes.append({
            "id": nid,
            "title": title,
            "group": _group_for(path),
            "section": _section_for(path, text),
            "kind": "hub" if path.stem in {
                "about-you", "goals", "doing", "worries", "learning", "senior-capstone",
            } else "note",
            "path": str(path.relative_to(SKYLAR_DIR)),
        })
        for alias in {nid, path.stem, title}:
            alias_to_id[alias.lower()] = nid
    return nodes, file_text, alias_to_id


def _links_among(file_text, alias_to_id, allowed_ids):
    links, seen = [], set()
    for path, text in file_text.items():
        src = _node_id(path)
        if src not in allowed_ids:
            continue
        for match in WIKILINK_RE.findall(text):
            target = match.split("|")[0].strip()
            tid = alias_to_id.get(target.lower())
            if tid and tid in allowed_ids and tid != src and (src, tid) not in seen:
                seen.add((src, tid))
                links.append({"source": src, "target": tid})
    return links


def build_brain_graph():
    all_nodes, file_text, alias_to_id = _read_files()
    nodes = [n for n in all_nodes if n.get("section")]
    allowed = {n["id"] for n in nodes}
    return {
        "map": "brain",
        "sections": BRAIN_SECTIONS,
        "nodes": nodes,
        "links": _links_among(file_text, alias_to_id, allowed),
    }


def parse_capstone_master():
    path = BRAIN_DIR / "notes" / "capstone-master.md"
    if not path.exists():
        return []
    text = path.read_text(encoding="utf-8", errors="replace")
    clusters, cluster, idea, buf = [], None, None, []

    def flush_idea():
        nonlocal idea, buf
        if cluster is not None and idea is not None:
            idea["markdown"] = "\n".join(buf).strip()
            cluster["ideas"].append(idea)
        idea, buf = None, []

    def flush_cluster():
        flush_idea()
        nonlocal cluster
        if cluster is not None:
            clusters.append(cluster)
        cluster = None

    for line in text.splitlines():
        m = re.match(r"^## Cluster \d+ — (.+)$", line)
        if m:
            flush_cluster()
            full = m.group(1).strip()
            short = full.split(",")[0].split(" / ")[0].split("(")[0].strip()
            cluster = {
                "id": "cluster/" + _slug(short),
                "title": short,
                "full": full,
                "ideas": [],
            }
            continue
        if line.startswith("## ") and cluster is not None:
            flush_cluster()
            continue
        if cluster is not None and line.startswith("### "):
            flush_idea()
            raw = line[4:].strip()
            body_title = re.sub(r"\s*\*.*$", "", raw).strip()
            wikis = WIKILINK_RE.findall(raw)
            file_id = None
            if wikis:
                target = wikis[0].split("|")[0].strip()
                cand = BRAIN_DIR / "notes" / (target + ".md")
                if cand.exists():
                    file_id = _node_id(cand)
            idea = {
                "id": file_id or ("capstone/" + _slug(body_title)),
                "title": body_title,
                "file": bool(file_id),
            }
            buf = [line]
            continue
        if idea is not None:
            buf.append(line)
    flush_cluster()
    return clusters


def excerpt_from_master(node_id: str):
    for cluster in parse_capstone_master():
        if cluster["id"] == node_id:
            return {
                "id": node_id,
                "title": cluster["title"],
                "markdown": f"# {cluster['full']}\n\nCapstone idea cluster. Open a node inside it to read the idea.",
                "path": "brain/notes/capstone-master.md",
            }
        for idea in cluster["ideas"]:
            if idea["id"] == node_id:
                return {
                    "id": node_id,
                    "title": idea["title"],
                    "markdown": idea.get("markdown") or f"# {idea['title']}",
                    "path": "brain/notes/capstone-master.md",
                }
    return None


def build_capstone_graph():
    all_nodes, file_text, alias_to_id = _read_files()
    by_id = {n["id"]: n for n in all_nodes}
    nodes, links, seen = [], [], set()
    sections = []

    def add_node(node):
        if node["id"] not in {n["id"] for n in nodes}:
            nodes.append(node)

    def add_link(a, b):
        if a != b and (a, b) not in seen and (b, a) not in seen:
            seen.add((a, b))
            links.append({"source": a, "target": b})

    sections.append({"id": "research", "label": "Research", "color": "#e8c48a"})
    research_ids = []
    for stem in ("senior-capstone", "capstone-master", "capstone-goals",
                 "capstone-skills", "capstone-research-log"):
        nid = f"notes/{stem}"
        if nid in by_id:
            n = dict(by_id[nid])
            n["section"] = "research"
            if stem == "senior-capstone":
                n["kind"] = "hub"
            add_node(n)
            research_ids.append(nid)
    for a, b in zip(research_ids, research_ids[1:]):
        add_link(a, b)

    colors = ["#9db7ff", "#c9b8ff", "#8ad4bc", "#f0a0a8", "#7ec8e8", "#e8c48a", "#d4a8ff"]
    for i, cluster in enumerate(parse_capstone_master()):
        sid = cluster["id"].split("/", 1)[-1]
        color = colors[i % len(colors)]
        sections.append({"id": sid, "label": cluster["title"], "color": color})
        prev = None
        first = None
        for idea in cluster["ideas"]:
            if idea["file"] and idea["id"] in by_id:
                n = dict(by_id[idea["id"]])
            else:
                n = {
                    "id": idea["id"], "title": idea["title"], "kind": "idea",
                    "group": "note", "path": "brain/notes/capstone-master.md",
                }
            n["section"] = sid
            add_node(n)
            if first is None:
                first = n["id"]
            if prev:
                add_link(prev, n["id"])
            prev = n["id"]
        # Every theme belongs to the capstone — hunt-only ideas have no file wikilinks,
        # so give the cluster one bridge to the Research hub.
        if first:
            add_link(first, "notes/senior-capstone")

    allowed = {n["id"] for n in nodes}
    for extra in _links_among(file_text, alias_to_id, allowed):
        add_link(extra["source"], extra["target"])

    return {"map": "capstone", "sections": sections, "nodes": nodes, "links": links}


def build_graph(kind: str = "brain"):
    if kind in ("capstone", "ideas"):
        return build_capstone_graph()
    return build_brain_graph()


def read_note(node_id: str):
    if node_id.startswith("capstone/") or node_id.startswith("cluster/"):
        found = excerpt_from_master(node_id)
        if found:
            return found
        if node_id == "cluster/research":
            return read_note("notes/capstone-master")
    relatives = [node_id + ".md"]
    if "/" not in node_id:
        relatives.append("notes/" + node_id + ".md")
    for rel in relatives:
        candidate = (BRAIN_DIR / rel).resolve()
        try:
            candidate.relative_to(BRAIN_DIR.resolve())
        except ValueError:
            continue
        if not candidate.exists():
            continue
        text = candidate.read_text(encoding="utf-8", errors="replace")
        return {"id": _node_id(candidate), "title": _title(candidate, text),
                "markdown": text, "path": str(candidate.relative_to(SKYLAR_DIR))}
    return None


def list_entries(kind: str):
    """List journal or reflections entries, newest first."""
    folder = BRAIN_DIR / ("journal" if kind == "journal" else "reflections")
    if not folder.exists():
        return []
    out = []
    for p in folder.glob("*.md"):
        text = p.read_text(encoding="utf-8", errors="replace")
        out.append({"id": _node_id(p), "title": _title(p, text), "name": p.stem})
    out.sort(key=lambda e: e["name"], reverse=True)
    return out


# ---------------------------------------------------------------------------
# Writing
# ---------------------------------------------------------------------------
def save_journal(text: str):
    """Append text to today's journal entry (creating it from template if new)."""
    JOURNAL_DIR.mkdir(parents=True, exist_ok=True)
    today = date.today().isoformat()
    entry = JOURNAL_DIR / f"{today}.md"
    if not entry.exists():
        header = f"# Journal — {today}\n\n"
        if TEMPLATE.exists():
            header = TEMPLATE.read_text(encoding="utf-8").replace("{{DATE}}", today) + "\n"
        entry.write_text(header, encoding="utf-8")
    with entry.open("a", encoding="utf-8") as f:
        f.write("\n" + text.rstrip() + "\n")
    return {"ok": True, "id": _node_id(entry)}


def talk_to_skylar(message: str):
    """Run Claude Code in the skylar folder as Skylar and return her reply."""
    cmd = [
        "claude", "-p",
        "--output-format", "json",
        "--permission-mode", "acceptEdits",
        "--allowedTools", CHAT_TOOLS,
    ]
    if _chat_session["id"]:
        cmd += ["--resume", _chat_session["id"]]

    try:
        proc = subprocess.run(
            cmd, input=message, cwd=str(SKYLAR_DIR),
            capture_output=True, text=True, timeout=300,
        )
    except FileNotFoundError:
        return {"error": "Claude Code (`claude`) isn't installed or on PATH."}
    except subprocess.TimeoutExpired:
        return {"error": "Skylar took too long to respond (timed out)."}

    if proc.returncode != 0:
        detail = (proc.stderr or proc.stdout or "").strip()
        if "login" in detail.lower() or "not logged in" in detail.lower():
            detail = "Skylar isn't logged in. Run `claude` in the skylar folder and sign in with your Pro account."
        return {"error": detail or "Skylar couldn't respond."}

    # Parse JSON result; fall back to raw text if needed.
    reply, sid = None, None
    try:
        data = json.loads(proc.stdout)
        if isinstance(data, dict):
            reply = data.get("result") or data.get("text")
            sid = data.get("session_id")
    except json.JSONDecodeError:
        reply = proc.stdout.strip()

    if sid:
        _chat_session["id"] = sid
    if not reply:
        reply = "(Skylar didn't say anything back — try again.)"
    return {"reply": reply}


# ---------------------------------------------------------------------------
# HTTP handler
# ---------------------------------------------------------------------------
class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(UI_DIR), **kwargs)

    def _json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_body(self):
        length = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(length) if length else b""
        try:
            return json.loads(raw or b"{}")
        except json.JSONDecodeError:
            return {}

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        qs = urllib.parse.parse_qs(parsed.query)

        if parsed.path == "/api/graph":
            kind = (qs.get("map") or ["brain"])[0]
            return self._json(build_graph(kind))
        if parsed.path == "/api/note":
            note = read_note((qs.get("id") or [""])[0])
            return self._json(note or {"error": "not found"}, 200 if note else 404)
        if parsed.path == "/api/entries":
            kind = (qs.get("type") or ["journal"])[0]
            return self._json({"entries": list_entries(kind)})
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        body = self._read_body()

        if parsed.path == "/api/chat":
            msg = (body.get("message") or "").strip()
            if not msg:
                return self._json({"error": "empty message"}, 400)
            return self._json(talk_to_skylar(msg))
        if parsed.path == "/api/journal":
            text = (body.get("text") or "").strip()
            if not text:
                return self._json({"error": "empty entry"}, 400)
            return self._json(save_journal(text))
        return self._json({"error": "unknown endpoint"}, 404)

    def log_message(self, *args):
        pass


class ThreadedServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


def main():
    with ThreadedServer(("127.0.0.1", PORT), Handler) as httpd:
        print("Skylar is running.")
        print(f"Open this in your browser:  http://127.0.0.1:{PORT}/")
        print("Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")


if __name__ == "__main__":
    main()
