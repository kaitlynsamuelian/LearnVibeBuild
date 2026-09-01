# Learn Cursor

A friendly, beginner-first website that teaches brand-new users everything about
**Cursor**, the AI code editor — for people who have never used AI and just
downloaded the app.

It's a static website (plain HTML, CSS, and a little JavaScript), so there's
nothing to install and no build step. Just open it in a browser.

## What's inside

| Page | File | What it covers |
| --- | --- | --- |
| Home | `index.html` | What Cursor is, the big ideas, a map of the site |
| Getting Started | `getting-started.html` | Download, install, sign in, open your first project, first AI request |
| The Interface | `interface.html` | A visual tour of every panel (editor, explorer, chat, terminal, status bar) |
| Features | `features.html` | Tab, Inline Edit, Agent, Ask, Plan, context/@-symbols, models, reviewing changes |
| Ways to Use | `ways-to-use.html` | Desktop app, terminal, Cursor CLI, Cloud Agents, Bugbot, Rules/Skills/Hooks/MCP |
| Prompting Tips | `prompting.html` | How to ask the AI and get great results |
| Shortcuts | `shortcuts.html` | Keyboard cheat sheet for Mac and Windows/Linux |
| Glossary & FAQ | `glossary.html` | Plain-English definitions + common beginner questions |

Shared assets:

- `assets/css/styles.css` — the full design system (dark/light theme, layout, components)
- `assets/js/main.js` — builds the shared nav + footer, theme toggle, mobile menu, scroll reveal, FAQ accordions, and the glossary search

## How to view it

**Easiest:** double-click `index.html` to open it in your browser.

**Recommended (so everything behaves exactly like a real site):** run a tiny local server from this folder:

```bash
python3 -m http.server 4321
```

Then visit <http://localhost:4321> in your browser.

## Notes on accuracy

Cursor evolves quickly. A few areas change more often than others — the exact
list of AI **models**, **pricing** tiers, and the set of **@-symbols** for
context. Those sections are written to stay general; always confirm current
details in the official docs:

- Website: <https://cursor.com>
- Documentation: <https://docs.cursor.com>
- Community forum: <https://forum.cursor.com>

## Disclaimer

This is an independent learning resource. It is **not** affiliated with or
endorsed by Cursor / Anysphere.
