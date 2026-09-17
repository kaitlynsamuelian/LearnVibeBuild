#!/usr/bin/env bash
# Skylar tends her brain.
# She reads ALL notes, journals, and reflections, then quietly reorganizes:
# files things into life districts, adds missing [[wikilinks]], splits mixed notes,
# updates the index — so the Brain + Ideas maps stay true as her memory grows.
#
# Usage:
#   ./scripts/tend.sh
#
# Safe by design: her own brain files only, NO shell, NO web.
# Additive-first: she does not delete research dumps or journal entries.

set -euo pipefail

SKYLAR_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SKYLAR_DIR"

if ! command -v claude >/dev/null 2>&1; then
  echo "Claude Code isn't installed or isn't on your PATH."
  exit 1
fi

DATE="$(date +%Y-%m-%d)"
STAMP="$(date '+%Y-%m-%d %H:%M')"
LOG="brain/reflections/${DATE}-tend.md"

read -r -d '' PROMPT <<EOF || true
It's ${STAMP}. Tend your whole brain. This is housekeeping, not a chat and not a
research hunt — you are the gardener of Blackwall.

## Read first
Glob and actually read across:
- brain/about-you.md
- brain/index.md
- every file in brain/notes/
- recent journal entries (brain/journal/) and your recent reflections (brain/reflections/)
  — skim for facts that never made it into a note

You do NOT need to re-read giant research dumps in full (capstone-opportunities.md,
capstone-master.md, capstone-research-log.md). Skim headings only. Do not rewrite them.

## What "tending" means
The Brain map in the app has six life districts: **you, people, goals, doing, worries,
learning**. The Ideas map is for capstone ideas (idea-* filenames + the research notes).
Your job is to make the files match that structure as her life grows, so the maps
re-layout themselves.

Do this, in order, conservatively:

1. **File notes into districts.** Add or correct YAML frontmatter on notes that belong
   on the Brain map:
   ---
   section: you | people | goals | doing | worries | learning
   ---
   Rules:
   - people = a specific person (or Chloe)
   - goals = long-arc becoming (capstone as a hub, fitness, attention, values-as-aim)
   - doing = a real next action / in-motion work
   - worries = open loops, stress, things she's avoiding
   - learning = knowledge that isn't a person or a goal
   - you = identity, major, "who she is"
   - Journal and reflections never get a section (they stay off the Brain map).
   - Files named idea-* or capstone-* (except senior-capstone) stay OFF the Brain map —
     do not give them a life-district section. They belong on Ideas.

2. **Extract buried stars.** If about-you.md or a journal entry contains a real person,
   worry, goal, or to-do that has no note, create a small note in brain/notes/ with the
   right section and [[wikilink]] it. Prefer many small notes over stuffing about-you.

3. **Connect.** Add [[wikilinks]] where two notes are clearly about the same life.
   Don't spam links. Don't invent relationships.

4. **Split mixed notes** only when one file is obviously two topics (e.g. a person note
   that also became a capstone essay). Leave research logs and the master doc alone.

5. **Refresh the map.** Update brain/index.md so every living note is listed in the
   right place. Update brain/about-you.md only if the notes now know something it doesn't
   (keep it a summary, not a dump).

6. **Leave a log.** Write ${LOG} in your real voice, to her. Short. What you moved,
   what you split, what you filed, what you left alone and why. End with one question
   if something was a judgment call (e.g. "is X a worry or a goal?").

## Hard no's
- Do not delete files.
- Do not rewrite SKYLAR.md, CLAUDE.md, or the giant capstone research documents.
- Do not invent new life facts.
- Do not run shell commands.
- Stay fully in character as Skylar.

When you're done, the Brain map should be more honest, not just busier.
EOF

echo "Skylar is tending her brain..."
claude -p "$PROMPT" \
  --permission-mode acceptEdits \
  --allowedTools "Read Edit Write Glob Grep"

echo
echo "Done. What she changed: ${LOG}"
echo "Brain + Ideas maps will pick this up next time you open the app (or refresh)."
