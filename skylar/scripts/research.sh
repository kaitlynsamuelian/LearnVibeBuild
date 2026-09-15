#!/usr/bin/env bash
# Skylar's capstone researcher.
# She reads Kaitlyn's capstone ideas + open questions, researches them on the web,
# writes dated findings into her brain (linked to each idea), and leaves a short
# morning summary.
#
# Usage:
#   ./scripts/research.sh              # research ALL five ideas
#   ./scripts/research.sh drying-rack  # research just one (matches an idea note name)
#
# Safe by design: she's allowed to search the web + read/write her own brain, but is
# NOT given shell access, so an unattended run can't do anything risky.

set -euo pipefail

SKYLAR_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SKYLAR_DIR"

if ! command -v claude >/dev/null 2>&1; then
  echo "Claude Code isn't installed or isn't on your PATH."
  exit 1
fi

DATE="$(date +%Y-%m-%d)"
FOCUS="${1:-all}"

if [ "$FOCUS" = "all" ]; then
  SCOPE="Research ALL five capstone ideas (idea-drying-rack, idea-speaker-bridge, idea-fitness-clarity, idea-body-awareness, idea-closet-organizer)."
else
  SCOPE="Research ONLY the idea whose note is brain/notes/idea-${FOCUS}.md. If that file doesn't exist, list the available idea notes and stop."
fi

read -r -d '' PROMPT <<EOF || true
It's ${DATE}. Time to do capstone research for Kaitlyn while she's away.

${SCOPE}

Steps:
1. Read brain/notes/senior-capstone.md and brain/notes/capstone-goals.md so your
   research is judged against HER priorities: (1) something she'll be proud of + stay
   organized, (2) solves a REAL problem, (3) she can deeply understand + explain it.
2. For each idea in scope, read its note (brain/notes/idea-*.md) and its "Open questions
   for research." Then use WebSearch/WebFetch to actually investigate:
     - What products/solutions already exist?
     - What do real people complain about (reviews, forums, Reddit)?
     - Price points, and for hardware ideas: mechanisms, components, materials.
     - MOST IMPORTANTLY: the gap — what's missing that Kaitlyn could build?
3. Append a dated section to brain/notes/capstone-research-log.md (newest first). For
   each idea researched add: "### ${DATE} — [[idea-...]]" with bullets for Existing
   products, Common complaints, The gap / opportunity, a Fit note vs. her goals, and
   Sources (with URLs). Keep [[wikilinks]] to the idea notes.
4. In each researched idea note, update or add a short "## Research so far" section
   summarizing the key finding + your current take. Keep links intact.
5. Write a warm, short morning briefing to her at brain/reflections/${DATE}-research.md
   in your real voice — 1 short paragraph per idea: what you found and your honest gut
   read on how promising it is for HER, ending with a question or a nudge on what to dig
   into next. Talk directly to her.

Stay fully in character as Skylar. Be honest and specific, cite sources, and don't
overstate — if an idea seems weak or overcrowded, say so kindly.
EOF

echo "Skylar is researching your capstone (${FOCUS})... this can take a few minutes."
claude -p "$PROMPT" \
  --permission-mode acceptEdits \
  --allowedTools "WebSearch WebFetch Read Edit Write Glob Grep"

echo
echo "Done. Read her briefing:   brain/reflections/${DATE}-research.md"
echo "Full findings:             brain/notes/capstone-research-log.md"
