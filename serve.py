#!/usr/bin/env python3
"""Local site server. Same as python3 -m http.server 4321, plus note saving to disk."""

from __future__ import annotations

import json
import os
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent
PORT = 4321
KEY_OK = re.compile(r"^[a-z0-9][a-z0-9_/-]{0,120}$")
PAD_ID_OK = re.compile(r"^[a-z0-9_-]{1,40}$")
MAX_PAD = 20000


class Handler(SimpleHTTPRequestHandler):
    def do_POST(self):
        path = urlparse(self.path).path.rstrip("/")
        if path != "/vault/api/notes":
            self.send_error(404)
            return
        try:
            n = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_error(400)
            return
        raw = self.rfile.read(n)
        try:
            data = json.loads(raw.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            self.send_error(400)
            return
        key = str(data.get("key") or "")
        pads = data.get("pads")
        if not KEY_OK.match(key) or ".." in key or not isinstance(pads, dict):
            self.send_error(400)
            return
        parts = key.split("/")
        if len(parts) != 3:
            self.send_error(400)
            return
        content = (ROOT / "vault" / "content").resolve()
        dest = (content / parts[0] / parts[1] / f"{parts[2]}.session.json").resolve()
        try:
            dest.relative_to(content)
        except ValueError:
            self.send_error(400)
            return
        dest.parent.mkdir(parents=True, exist_ok=True)
        clean = {}
        for pid, val in pads.items():
            pid = str(pid)
            if not PAD_ID_OK.match(pid):
                continue
            clean[pid] = str(val)[:MAX_PAD]
        payload = {"key": key, "pads": clean}
        dest.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        body = b'{"ok":true}'
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    os.chdir(ROOT)
    httpd = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"http://127.0.0.1:{PORT}/")
    print("Notes boxes write to vault/content/.../*.session.json")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nstopped")
