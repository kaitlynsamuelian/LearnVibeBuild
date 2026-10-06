---
name: Test website B
description: Conservatory aisle of flower types. Iron muntins, wet glass, zinc tags.
colors:
  iron: "#161d14"
  iron-lit: "#2a3626"
  glass: "#c9dccb"
  glass-deep: "#8eae93"
  zinc: "#cfd6c8"
  zinc-ink: "#1a2218"
  path: "#4a5248"
  mist: "#e4eee3"
  ink: "#142016"
  bloom: "#6e8f72"
  rose: "#c45c6a"
  sunflower: "#d9a31c"
  lavender: "#7d63b0"
  peony: "#d9899c"
  tulip: "#d24b3c"
  poppy: "#c43328"
  lily: "#e6d7a8"
  hydrangea: "#5f8ec4"
typography:
  display:
    fontFamily: "Big Shoulders Display, Arial Narrow, Helvetica, sans-serif"
    fontSize: "5.5rem"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Big Shoulders Display, Arial Narrow, Helvetica, sans-serif"
    fontSize: "3.2rem"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0.04em"
  body:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  none: "0px"
spacing:
  pane-border: "10px"
  ridge: "14px"
  bench: "22px"
components:
  zinc-tag:
    backgroundColor: "{colors.zinc}"
    textColor: "{colors.zinc-ink}"
    typography: "{typography.heading}"
    rounded: "{rounded.none}"
    padding: "8px 14px 6px"
  walk-link:
    backgroundColor: "{colors.zinc}"
    textColor: "{colors.iron}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
---

# Test website B

**Creative North Star: "Walk the conservatory aisle"**

This DESIGN.md is the visual world for Test website B (`test-b/`), not the Learn Vibe Build hub. The hub keeps its own paper-and-tile face. Other artifacts keep theirs.

## Overview

You are inside a public conservatory. Iron muntins divide wet glass. Each bay is one flower. Notes sit on a slat bench, not in a card grid. Bloom color tints only the current bay's iron.

**Key Characteristics:**
- Iron and glass as the page, not a theme on a template
- Zinc tags for names and navigation
- One flower, one full-height bay, snap-scroll down the aisle
- Self-hosted Big Shoulders Display and Atkinson Hyperlegible

## Colors

**The Bay Tint Rule.** Neutral glass and iron carry the page. Saturated color belongs to the bloom in that bay and the iron around it.

Do not use cream paper, night charcoal (Test A), or neon.

## Typography

**The Transom Rule.** Display type is industrial condensed, like lettering on greenhouse iron. Body type is Atkinson Hyperlegible on the bench. No kicker/eyebrow labels.

## Layout

Full-height bays. A fixed iron ridge of tags. Glass pane, then slat bench with the zinc name and the note. Mobile: tags scroll sideways; the pane still fills the viewport.

## Elevation & Depth

Glass sits in a thick iron frame. Tags cast a soft offset shadow (blur required). Condensation drip on arrival is the one authored motion.

## Shapes

Square iron. Square zinc plates. No pills, no cards, no circular icon tiles.

## Components

Ridge tags, zinc nameplates, the walk-the-aisle latch, the glass pane with muntins.

## Do's and Don'ts

**Do:**
- Keep Test A unchanged
- Let the bloom lead
- Tint iron from the current flower

**Don't:**
- Add kickers or numbered section labels
- Clone Test A's charcoal gallery
- Put cream plus a display serif on this surface
