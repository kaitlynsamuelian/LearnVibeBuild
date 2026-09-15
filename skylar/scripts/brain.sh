#!/usr/bin/env bash
# Open the Skylar app (Talk / Brain / Journal / Reading) in your browser.
# Kept for convenience — this is the same as scripts/app.sh.

set -euo pipefail
SKYLAR_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
exec "$SKYLAR_DIR/scripts/app.sh"
