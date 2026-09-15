#!/usr/bin/env bash
# Open (or create) today's journal entry and drop you into your editor.
# Skylar reads these entries during her nightly reflection.

set -euo pipefail

SKYLAR_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SKYLAR_DIR"

DATE="$(date +%Y-%m-%d)"
ENTRY="brain/journal/${DATE}.md"

if [ ! -f "$ENTRY" ]; then
  # seed from the template with today's date filled in
  sed "s/{{DATE}}/${DATE}/g" templates/journal-entry.md > "$ENTRY"
  echo "Created new journal entry: $ENTRY"
else
  echo "Opening today's entry: $ENTRY"
fi

# Open in your editor of choice ($EDITOR), falling back to common ones.
"${EDITOR:-nano}" "$ENTRY"

echo
echo "Saved. Skylar will read this in tonight's reflection (or run scripts/reflect.sh now)."
