#!/usr/bin/env bash
# Open Skylar's brain — the Blackwall graph viewer (read-only).
# Starts a tiny local web server and opens it in your browser.

set -euo pipefail

SKYLAR_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SKYLAR_DIR/ui"

URL="http://127.0.0.1:4173/"

# Open the browser shortly after the server starts.
( sleep 1; command -v open >/dev/null 2>&1 && open "$URL" || true ) &

echo "Opening Skylar's brain at $URL"
echo "(This only READS her notes — it can't change her memory. Ctrl+C to stop.)"
python3 server.py
