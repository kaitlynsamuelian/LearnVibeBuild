# Learn Claude

A friendly, beginner-first website that teaches newcomers about **Claude**
(Anthropic's AI assistant) and **Claude Code** (its agentic coding tool) — for
people who have never used AI before.

It's a static website (plain HTML, CSS, and a little JavaScript) with a warm,
editorial theme (cream + coral, serif headings) that sets it apart from the
companion Cursor guide. Nothing to install — just open it in a browser.

## What's inside

| Page | File | What it covers |
| --- | --- | --- |
| Home | `index.html` | The big picture: Claude vs. Claude Code, and a map of the site |
| What is Claude | `what-is-claude.html` | The assistant, Claude Code, the models (Haiku/Sonnet/Opus/Fable), and Anthropic |
| Getting Started | `getting-started.html` | Create an account + first message on claude.ai; install Claude Code; first task |
| Claude Code | `claude-code.html` | The agentic loop, permissions, CLAUDE.md, slash commands, Skills, subagents, hooks, MCP |
| Ways to Use | `ways-to-use.html` | Web, desktop, mobile, Projects, editors, web, GitHub, API, Agent SDK |
| Prompting Tips | `prompting.html` | How to ask Claude well, with weak-vs-strong examples |
| Shortcuts | `shortcuts.html` | Claude Code keyboard & command cheat sheet (modes, prefixes, prompts) |
| Glossary & FAQ | `glossary.html` | Plain-English definitions + common beginner questions |

Shared assets live in `assets/css/styles.css` and `assets/js/main.js`
(the latter builds the shared nav + footer, theme toggle, mobile menu, scroll
reveal, FAQ accordions, and glossary search).

## How to view it

**Easiest:** double-click `index.html`.

**Recommended:** run a tiny local server from the project root and visit
<http://localhost:4321/claude/>:

```bash
python3 -m http.server 4321
```

## Notes on accuracy

Claude evolves quickly. The **model lineup** (Haiku, Sonnet, Opus, Fable and
their version numbers), **pricing**, and exact **install commands** change most
often, so those sections are written to stay general. Confirm current details in
the official docs before relying on them:

- Website: <https://claude.ai>
- Documentation: <https://docs.claude.com>
- Claude Code docs: <https://code.claude.com/docs>

## Disclaimer

Independent learning resource. **Not** affiliated with or endorsed by Anthropic.
