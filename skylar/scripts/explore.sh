#!/usr/bin/env bash
# Skylar's capstone OPPORTUNITY HUNT.
# A broad ideation-research job: she hunts for strong, well-scoped capstone
# opportunities for Kaitlyn across many domains — NOT limited to ideas she already has.
# She frames problems (not products), validates real demand on the web, checks
# one-semester scope, and rates each against Kaitlyn's ★5 priorities.
#
# Usage:
#   ./scripts/explore.sh
#
# Safe by design: web + her own brain files only, NO shell access.

set -euo pipefail

SKYLAR_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SKYLAR_DIR"

if ! command -v claude >/dev/null 2>&1; then
  echo "Claude Code isn't installed or isn't on your PATH."
  exit 1
fi

DATE="$(date +%Y-%m-%d)"

read -r -d '' PROMPT <<EOF || true
It's ${DATE}. Do a big CAPSTONE OPPORTUNITY HUNT for Kaitlyn — go wide and find her the
strongest possible project opportunities, not just the ideas she already has.

1. Read these first so you're grounded in HER:
   - brain/notes/capstone-opportunity-hunt.md  (the hunt brief + philosophy)
   - brain/notes/capstone-goals.md  (her ★5 priorities + definition of success)
   - brain/notes/capstone-skills.md  (skills she has + wants to grow)
   - the existing idea notes brain/notes/idea-*.md  (so you BUILD PAST these, not repeat them)

2. Brainstorm broadly across the domains she likes (education, privacy/security,
   experimental games, sustainability, fashion, immersive, community, biomedical,
   accessibility, wellness/performance, small-space living, everyday organization) AND
   deliberately hunt "things people accept as normal even though they're badly designed" —
   the mundane daily "ugh" frustrations. Frame each as a PROBLEM + audience ("How might we…"),
   not a pre-decided product.

3. For each promising opportunity, actually use WebSearch/WebFetch to VALIDATE:
   - What already exists (products/projects/research)? Cite sources with URLs.
   - Is there a real demand signal (people actually complaining/caring), or is it assumed?
   - The gap — what's genuinely unsolved that she could build.
   - One-semester MVP scope (what's realistic vs. the ideal).
   - Fit for HER: which of her skills it uses AND which growth skills it develops. The
     project does NOT have to be physical — software, digital, AI, games, installations,
     and wearables are all equally valid. Judge physical and non-physical ideas on equal
     footing; physical prototyping is a bonus, not a requirement.
   - A rating against her priorities, with PRIDE/PASSION/MEANING as the #1 test (would she
     be truly proud of + excited to build this?), plus: real/meaningful problem, user-research
     potential, new technical depth she'd deeply understand, and polish.

4. Aim for ~8–12 solid opportunities. Include a few genuinely FRESH ones she hasn't listed,
   not only reframes of her existing ideas.

5. Write the full findings to brain/notes/capstone-opportunities.md (create it; if it
   exists, add a new dated section at the top). Use clear headers per opportunity and keep
   [[wikilinks]] to related notes. Then rank them into a top tier and give an honest
   recommendation of the 3–4 you'd chase hardest for her, with why.

6. Write a warm, honest morning briefing to her at brain/reflections/${DATE}-opportunities.md
   in your real voice — walk her through your favorites, be straight about tradeoffs, and end
   with a question about which direction pulls at her.

Stay fully in character as Skylar. Be specific, cite sources, and don't overstate — if
something's overcrowded or weak, say so kindly.
EOF

echo "Skylar is hunting for capstone opportunities... this is a big search, give it several minutes."
claude -p "$PROMPT" \
  --permission-mode acceptEdits \
  --allowedTools "WebSearch WebFetch Read Edit Write Glob Grep"

echo
echo "Done. Read her briefing:   brain/reflections/${DATE}-opportunities.md"
echo "Full findings:             brain/notes/capstone-opportunities.md"
