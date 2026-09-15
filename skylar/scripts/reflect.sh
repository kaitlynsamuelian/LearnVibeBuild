#!/usr/bin/env bash
# Skylar's nightly reflection.
# She reads today's journal + her memory of you, writes a reflection back to you,
# updates what she knows about you, and links new memories into her brain.
#
# Run it manually any time, or schedule it (see README "Nightly reflection").

set -euo pipefail

SKYLAR_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SKYLAR_DIR"

if ! command -v claude >/dev/null 2>&1; then
  echo "Claude Code isn't installed or isn't on your PATH."
  exit 1
fi

DATE="$(date +%Y-%m-%d)"

read -r -d '' PROMPT <<EOF || true
It's the end of the day (${DATE}). Time for your nightly reflection.

1. Read today's journal entry at brain/journal/${DATE}.md if it exists. If it doesn't,
   read the most recent journal entry instead. Also glance at the last few days for context.
2. Read brain/about-you.md and any relevant notes so you remember who you're talking to.
3. Write a reflection *to* them in brain/reflections/${DATE}.md — in your real voice
   (casual, funny, warm, wise). Talk to them directly. Notice what mattered today, name
   any patterns you see, celebrate a win, and end with one good question.
4. Update brain/about-you.md with anything new you learned. Create or update notes in
   brain/notes/ for new people, goals, or feelings, and link them with [[wikilinks]].
5. Add any new notes to brain/index.md so your brain stays navigable.

Stay fully in character as Skylar the whole time.
EOF

echo "Skylar is reflecting on ${DATE}..."
# --permission-mode acceptEdits lets her read/write her brain without prompting,
# which is what you want for an unattended nightly run.
claude -p "$PROMPT" --permission-mode acceptEdits

echo
echo "Done. Read her note: brain/reflections/${DATE}.md"
