#!/usr/bin/env python3
"""
Skylar UI — read-only web viewer for Blackwall (her brain).

This server ONLY READS the brain/ folder. It never writes or edits anything,
so it can't damage Skylar's memory. It:
  - serves the static frontend (index.html, app.js, style.css)
  - exposes /api/graph  -> nodes (notes) + links (from [[wikilinks]])
  - exposes /api/note?id=<node id> -> the rendered content of one note

Run it with:  python3 server.py   (from the skylar/ui folder)
Then open the printed URL in your browser.
"""

import http.server
import json
import re
import socketserver
import urllib.parse
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
UI_DIR = Path(__file__).resolve().parent
SKYLAR_DIR = UI_DIR.parent
BRAIN_DIR = SKYLAR_DIR / "brain"

PORT = 4173

# Which folders inside brain/ become which "group" (used for coloring).
GROUPS = {
    "notes": "note",
    "journal": "journal",
    "reflections": "reflection",
}

WIKILINK_RE = re.compile(r"\[\[([^\]]+)\]\]")


# ---------------------------------------------------------------------------
# Reading the brain (READ ONLY)
# ---------------------------------------------------------------------------
def _node_id(path: Path) -> str:
    """A stable id for a note = its path relative to brain/, without .md."""
    return str(path.relative_to(BRAIN_DIR).with_suffix(""))


def _title(path: Path, text: str) -> str:
    """Use the first markdown heading if present, else the file name."""
    for line in text.splitlines():
        line = line.strip()
        if line.startswith("# "):
            return line[2:].strip()
    return path.stem


def _group_for(path: Path) -> str:
    rel = path.relative_to(BRAIN_DIR)
    if len(rel.parts) > 1 and rel.parts[0] in GROUPS:
        return GROUPS[rel.parts[0]]
    return "core"  # top-level files like about-you.md, index.md


def collect_markdown_files():
    if not BRAIN_DIR.exists():
        return []
    return sorted(p for p in BRAIN_DIR.rglob("*.md"))


def build_graph():
    """Return {nodes, links} built from the brain folder."""
    files = collect_markdown_files()

    nodes = []
    # Map several ways of referring to a note -> its canonical id, so that
    # [[climbing]], [[notes/climbing]] and [[Climbing]] all resolve.
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
        group = _group_for(path)

        nodes.append(
            {
                "id": nid,
                "title": title,
                "group": group,
                "path": str(path.relative_to(SKYLAR_DIR)),
            }
        )

        # aliases used to resolve wikilinks
        for alias in {nid, path.stem, title}:
            alias_to_id[alias.lower()] = nid

    # Build links from [[wikilinks]]
    links = []
    seen = set()
    for path, text in file_text.items():
        src = _node_id(path)
        for match in WIKILINK_RE.findall(text):
            target = match.split("|")[0].strip()  # support [[target|label]]
            tid = alias_to_id.get(target.lower())
            if tid and tid != src:
                key = (src, tid)
                if key not in seen:
                    seen.add(key)
                    links.append({"source": src, "target": tid})

    return {"nodes": nodes, "links": links}


def read_note(node_id: str):
    """Return the raw markdown for one note id, or None if not found/invalid."""
    # Resolve id -> path safely, staying inside brain/.
    candidate = (BRAIN_DIR / (node_id + ".md")).resolve()
    try:
        candidate.relative_to(BRAIN_DIR.resolve())
    except ValueError:
        return None  # path traversal attempt — refuse
    if not candidate.exists():
        return None
    text = candidate.read_text(encoding="utf-8", errors="replace")
    return {
        "id": node_id,
        "title": _title(candidate, text),
        "markdown": text,
        "path": str(candidate.relative_to(SKYLAR_DIR)),
    }


# ---------------------------------------------------------------------------
# HTTP handler
# ---------------------------------------------------------------------------
class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(UI_DIR), **kwargs)

    def _send_json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)

        if parsed.path == "/api/graph":
            self._send_json(build_graph())
            return

        if parsed.path == "/api/note":
            qs = urllib.parse.parse_qs(parsed.query)
            node_id = (qs.get("id") or [""])[0]
            note = read_note(node_id)
            if note is None:
                self._send_json({"error": "not found"}, status=404)
            else:
                self._send_json(note)
            return

        # otherwise serve static files from UI_DIR
        return super().do_GET()

    def log_message(self, *args):
        pass  # keep the terminal quiet


def main():
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        url = f"http://127.0.0.1:{PORT}/"
        print("Skylar's brain viewer is running (read-only).")
        print(f"Open this in your browser:  {url}")
        print("Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")


if __name__ == "__main__":
    main()
