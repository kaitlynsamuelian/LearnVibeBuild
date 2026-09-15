#!/usr/bin/env bash
# Open the Skylar app in your browser — Talk, Brain (graph), Journal, and Reading.
# Talking to her here runs Claude Code under the hood (your Pro plan), so she can
# read and update her own brain as you chat.

set -euo pipefail

SKYLAR_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SKYLAR_DIR/ui"

URL="http://127.0.0.1:4173/"
( sleep 1; command -v open >/dev/null 2>&1 && open "$URL" || true ) &

echo "Opening Skylar at $URL"
echo "(Ctrl+C to stop. If chat says she's not logged in, run 'claude' in the skylar folder once and sign in.)"
python3 server.py
