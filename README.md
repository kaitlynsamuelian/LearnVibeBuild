# Learn AI Tools

Beginner-first websites for people who are brand-new to AI and just downloaded
a tool. Each is a self-contained static site (plain HTML, CSS, and a little
JavaScript) — nothing to install, no build step.

## The collection

| Artifact | Folder | About |
| --- | --- | --- |
| **Learn Cursor** | [`cursor/`](cursor/) | The AI code editor — interface tour, Tab, Agent, ways to use it, shortcuts, glossary |
| **Learn Claude** | [`claude/`](claude/) | Anthropic's AI assistant **and** Claude Code — what they are, how they differ, how to use them |
| **Audit Decoder** | [`audit/`](audit/) | Upload a degree-audit PDF; get done / in-progress / leftover plus Q&A |
| **Learn Open Source** | [`opensource/`](opensource/) | Open vs local AI — HuggingChat, Ollama / LM Studio, then Cline or Aider for code |
| **Learn Personal Assistants** | [`assistants/`](assistants/) | Muse, Hermes, OpenClaw, Telegram agents — AIs that live in your chats and act |
| **Buff Trivia** | [`trivia/`](trivia/) | 8 CU Boulder questions, a score, and a roast at the end |
| **Campus Thread** | [`thread/`](thread/) | ATLAS, Norlin, C4C, and the Flatirons in a group chat |
| **My Boop** | [`boop/`](boop/) | A tiny virtual pet — feed, bathe, minigames, hats |
| **Learn Agent Skills** | [`skills/`](skills/) | Cursor Agent Skills: what they are, how to invoke one, Skill Builder |
| **Test website A** | [`test-a/`](test-a/) | Scrolling gallery of flower types, each with a short description |
| **Test website B** | [`test-b/`](test-b/) | Same flower prompt with Impeccable: conservatory aisle gallery |

Each folder has its own `README.md` with a full page-by-page breakdown, its own
design system under `assets/`, and its own theme:

- **Cursor** — a dark, techy theme (purple/blue).
- **Claude** — a warm, editorial theme (cream + coral, serif headings).
- **Open Source** — a dark theme with green accents.
- **Personal Assistants** — a dark theme with rose accents.
- **Buff Trivia** — black + CU gold.
- **Campus Thread** — night indigo, iMessage-ish.
- **My Boop** — peach paper, a round blob, candy-pink chrome.
- **Agent Skills** — dark teal instruction cards, gold accents.
- **Test website A** — charcoal garden, snap-scroll flower gallery.
- **Test website B** — greenhouse glass and iron, snap-scroll flower aisle.

The guide sites cross-link to each other in their footers.

## How to view everything

The root `index.html` is a small hub that links to all artifacts.

**Easiest:** double-click `index.html`.

**Recommended (behaves exactly like a real site):** run a tiny local server from
this folder and open <http://localhost:4321>:

```bash
python3 serve.py
```

Then:
- Hub: <http://localhost:4321/>
- Cursor guide: <http://localhost:4321/cursor/>
- Claude guide: <http://localhost:4321/claude/>
- Audit Decoder: <http://localhost:4321/audit/>
- Open source guide: <http://localhost:4321/opensource/>
- Personal assistants: <http://localhost:4321/assistants/>
- Buff Trivia: <http://localhost:4321/trivia/>
- Campus Thread: <http://localhost:4321/thread/>
- My Boop: <http://localhost:4321/boop/>
- Agent Skills: <http://localhost:4321/skills/>
- Test website A: <http://localhost:4321/test-a/>
- Test website B: <http://localhost:4321/test-b/>

## Notes on accuracy

These tools change quickly. Model names, pricing, exact install commands, and
feature naming shift over time, so those sections are written to stay general.
Always confirm details against the official docs (linked inside each site).

Open-source / local quality is usually worse than ChatGPT or Claude. Hosted
“open” chats (like HuggingChat) are not private. Continue.dev was acquired and
the original repo is frozen — prefer Cline or Aider for new coding setups.

## Disclaimer

Independent learning resources. Not affiliated with or endorsed by
Cursor / Anysphere, Anthropic, Meta, Nous Research, OpenClaw, Hugging Face,
Ollama, or LM Studio.
