#!/usr/bin/env bash
# Skylar's capstone OPPORTUNITY HUNT (broad + audience-driven).
# She hunts for strong, well-scoped capstone opportunities for Kaitlyn — going far beyond
# her existing notes: new topics, new tech, new audiences, and improvements to things that
# already exist. Frames problems (not products), validates real demand on the web, checks
# one-semester scope, and rates each against Kaitlyn's priorities (pride is #1).
#
# Usage:
#   ./scripts/explore.sh                 # broad multi-audience sweep
#   ./scripts/explore.sh elderly         # focus on a specific audience
#   ./scripts/explore.sh teachers        # e.g. teachers / educators
#   ./scripts/explore.sh "sustainability"  # or a topic/theme
#
# Every run ADDS to the pool — it never deletes earlier research.
# Safe by design: web + her own brain files only, NO shell access.

set -euo pipefail

SKYLAR_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SKYLAR_DIR"

if ! command -v claude >/dev/null 2>&1; then
  echo "Claude Code isn't installed or isn't on your PATH."
  exit 1
fi

STAMP="$(date '+%Y-%m-%d %H:%M')"
DATE="$(date +%Y-%m-%d)"
FOCUS="${*:-}"

if [ -n "$FOCUS" ]; then
  SLUG="$(echo "$FOCUS" | tr '[:upper:] ' '[:lower:]-' | tr -cd 'a-z0-9-')"
  LABEL="focus: ${FOCUS}"
  SCOPE="Focus this whole hunt on: **${FOCUS}**. If it's an AUDIENCE (e.g. elderly, teachers,
college students, kids, healthcare workers, people with disabilities, parents, commuters,
immigrants/ESL, small-business owners), start from that person and dig into what THEY
struggle with daily. If it's a TOPIC/tech/theme, explore problems and opportunities within
it. Bring plenty Kaitlyn hasn't considered."
  BRIEF_FILE="brain/reflections/${DATE}-opportunities-${SLUG}.md"
else
  LABEL="broad multi-audience sweep"
  SCOPE="Do a BROAD sweep. Deliberately run across SEVERAL different audiences Kaitlyn hasn't
focused on — e.g. college students, elderly/seniors, teachers/educators, K-12 kids,
healthcare workers & patients, people with disabilities, parents/caregivers, commuters,
renters, immigrants/ESL, small-business owners, athletes, hobbyists — and pull the best
opportunity or two from each. Cover a range of topics and technologies too."
  BRIEF_FILE="brain/reflections/${DATE}-opportunities-sweep.md"
fi

read -r -d '' PROMPT <<EOF || true
It's ${STAMP}. Do a CAPSTONE OPPORTUNITY HUNT for Kaitlyn. Go WIDE and bring her fresh
territory — do NOT limit yourself to the ideas in her notes.

${SCOPE}

Ground yourself first (for her priorities + to avoid repeating): read
brain/notes/capstone-opportunity-hunt.md, brain/notes/capstone-goals.md,
brain/notes/capstone-skills.md, the existing brain/notes/idea-*.md, and skim the existing
brain/notes/capstone-opportunities.md so you BUILD PAST what's already there (don't repeat
opportunities already logged — bring new ones).

Rules for this hunt:
- The #1 test is PRIDE/PASSION/MEANING — would Kaitlyn be truly proud of and excited to
  build this? Medium is open: software, digital, AI, games, installations, hardware, or
  wearables are ALL equally valid. Physical prototyping is a bonus, not a requirement.
- "Improve an existing solution" is fully valid — it doesn't have to be a brand-new topic.
  If so, say what exists and specifically what she'd improve and why.
- Explore audiences / topics / technologies she has NOT mentioned.
- For each opportunity, use WebSearch/WebFetch to VALIDATE: what already exists (cite URLs),
  real vs. assumed demand, the gap / what she'd build or improve, a realistic one-semester
  MVP, and which of her skills it uses + grows. Rate each against her priorities (pride #1,
  then real/meaningful problem, user-research potential, new technical depth, polish).
- Aim for ~8–12 solid, mostly NEW opportunities.

Write-up (ADDITIVE — never delete or rewrite earlier research):
1. In brain/notes/capstone-opportunities.md, ADD A NEW SECTION AT THE TOP titled
   "## ${STAMP} — ${LABEL}" containing the opportunities (clear sub-header each), then a
   short ranked top tier + honest recommendation. Leave all existing content untouched below.
2. Write a warm, honest briefing to her at ${BRIEF_FILE} in your real voice — walk her
   through your favorites, be straight about tradeoffs, end with a question about what pulls
   at her. Keep [[wikilinks]] where useful.

Stay fully in character as Skylar. Be specific, cite sources, and don't overstate.
EOF

echo "Skylar is hunting (${LABEL})... this is a big search, give it several minutes."
claude -p "$PROMPT" \
  --permission-mode acceptEdits \
  --allowedTools "WebSearch WebFetch Read Edit Write Glob Grep"

echo
echo "Done. Read her briefing:   ${BRIEF_FILE}"
echo "Full findings (all runs):  brain/notes/capstone-opportunities.md"
