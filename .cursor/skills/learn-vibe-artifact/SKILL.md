---
name: learn-vibe-artifact
description: Adds or updates a Learn, Vibe, Build studio artifact on the class hub. Use when the user wants a new artifact page, hub tile, cycle build for this repo, or to land a static site in the collection. Not for unrelated apps or one-line copy edits.
---

# Learn Vibe Build artifact

This repo is a static hub of class artifacts. Each artifact is its own folder of HTML, CSS, and a little JavaScript. No build step.

## When to use

- The user wants a new artifact on the Learn, Vibe, Build site
- They mention a cycle build, hub tile, or adding something to the collection
- They ask how artifacts are wired into the root `index.html`

## Before you build

Ask if anything is still unclear: what the artifact is, who it is for, and whether it should match an existing guide (multi-page + nav) or a single interactive page.

Do not delete earlier artifacts or vault research.

## Instructions

1. Create a new folder at the repo root (or the path the user names) with `index.html`, its own `assets/` if needed, and a `README.md`.
2. Give it a distinct theme. Existing ones already use purple, coral, gold, green, rose, black/gold, indigo, and peach. Do not clone a neighbor's palette.
3. Link back to the hub with `../index.html`.
4. Wire it on the root `index.html`:
   - Add a numbered tile (next number after the current highest)
   - Bump the collection count
   - Update the about strip so the new artifact is named
   - Add a couple of marquee chips if it has words worth repeating
   - Add a tile color variable and chip class if needed
5. Update the root `README.md` table, theme list, and local-server links.
6. Keep copy beginner-first. Do not use em dashes.
7. After UI work, verify in the browser if tools are available; otherwise open with `python3 serve.py` and check the new URL.

## Local preview

From the repo root:

```bash
python3 serve.py
```

Hub: http://127.0.0.1:4321/

## Official Cursor skills docs

If the user is asking about Agent Skills themselves, point them at the `skills/` artifact in this repo and https://cursor.com/docs/skills rather than inventing menu paths.
