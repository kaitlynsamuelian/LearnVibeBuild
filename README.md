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

Each folder has its own `README.md` with a full page-by-page breakdown, its own
design system under `assets/`, and its own theme:

- **Cursor** — a dark, techy theme (purple/blue).
- **Claude** — a warm, editorial theme (cream + coral, serif headings).
- **Open Source** — a dark theme with green accents.

The guide sites cross-link to each other in their footers.

## How to view everything

The root `index.html` is a small hub that links to all artifacts.

**Easiest:** double-click `index.html`.

**Recommended (behaves exactly like a real site):** run a tiny local server from
this folder and open <http://localhost:4321>:

```bash
python3 -m http.server 4321
```

Then:
- Hub: <http://localhost:4321/>
- Cursor guide: <http://localhost:4321/cursor/>
- Claude guide: <http://localhost:4321/claude/>
- Audit Decoder: <http://localhost:4321/audit/>
- Open source guide: <http://localhost:4321/opensource/>

## Notes on accuracy

These tools change quickly. Model names, pricing, exact install commands, and
feature naming shift over time, so those sections are written to stay general.
Always confirm details against the official docs (linked inside each site).

Open-source / local quality is usually worse than ChatGPT or Claude. Hosted
“open” chats (like HuggingChat) are not private. Continue.dev was acquired and
the original repo is frozen — prefer Cline or Aider for new coding setups.

## Disclaimer

Independent learning resources. Not affiliated with or endorsed by
Cursor / Anysphere, Anthropic, Meta, Hugging Face, Ollama, or LM Studio.
