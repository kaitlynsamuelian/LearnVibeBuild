#!/usr/bin/env bash
# Start a conversation with Skylar.
# She loads her personality (SKYLAR.md), her memory of you (brain/about-you.md),
# and her brain map (brain/index.md) automatically via CLAUDE.md.

set -euo pipefail

# Always run from the skylar/ project root so Claude Code picks up CLAUDE.md.
SKYLAR_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SKYLAR_DIR"

if ! command -v claude >/dev/null 2>&1; then
  echo "Claude Code isn't installed or isn't on your PATH."
  echo "Install it, then run:  claude   (and log in with your Claude Pro account)."
  exit 1
fi

echo "starting Skylar... (type your first message when she's ready)"
echo
# Opening nudge so she greets you in character and uses her memory.
claude "Hey Skylar, it's me. Say hi the way only you would, and pick up where we left off."
