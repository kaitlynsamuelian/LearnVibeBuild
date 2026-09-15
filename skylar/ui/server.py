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


def collect_markdown_files():
    if not BRAIN_DIR.exists():
        return []
    return sorted(p for p in BRAIN_DIR.rglob("*.md"))


def build_graph():
    files = collect_markdown_files()
    nodes = []
    alias_to_id = {}
    file_text = {}

    for path in files:
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            text = ""
        file_text[path] = text
        nid = _node_id(path)
        title = _title(path, text)
        nodes.append(
            {"id": nid, "title": title, "group": _group_for(path),
             "path": str(path.relative_to(SKYLAR_DIR))}
        )
        for alias in {nid, path.stem, title}:
            alias_to_id[alias.lower()] = nid

    links = []
    seen = set()
    for path, text in file_text.items():
        src = _node_id(path)
        for match in WIKILINK_RE.findall(text):
            target = match.split("|")[0].strip()
            tid = alias_to_id.get(target.lower())
            if tid and tid != src and (src, tid) not in seen:
                seen.add((src, tid))
                links.append({"source": src, "target": tid})

    return {"nodes": nodes, "links": links}


def read_note(node_id: str):
    candidate = (BRAIN_DIR / (node_id + ".md")).resolve()
    try:
        candidate.relative_to(BRAIN_DIR.resolve())
    except ValueError:
        return None
    if not candidate.exists():
        return None
    text = candidate.read_text(encoding="utf-8", errors="replace")
    return {"id": node_id, "title": _title(candidate, text),
            "markdown": text, "path": str(candidate.relative_to(SKYLAR_DIR))}


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
            return self._json(build_graph())
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


def main():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        print("Skylar is running.")
        print(f"Open this in your browser:  http://127.0.0.1:{PORT}/")
        print("Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")


if __name__ == "__main__":
    main()
