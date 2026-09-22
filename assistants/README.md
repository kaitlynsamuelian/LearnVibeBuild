# Learn Personal Assistants

A beginner-first static site about **personal AI agents** — Muse, Hermes,
OpenClaw, Telegram / WhatsApp bots — for people who only know ChatGPT in a tab.

Same pattern as the Cursor, Claude, and open-source guides: plain HTML/CSS/JS.

## What's inside

| Page | File | What it covers |
| --- | --- | --- |
| Home | `index.html` | Chat vs personal agent, three paths |
| What they are | `what-they-are.html` | Chat / coding agent / personal assistant; hosted vs self-host |
| Try a hosted one | `try-hosted.html` | Meta Muse (US), hosted Telegram-style bots |
| Run your own | `try-selfhost.html` | Hermes Agent vs OpenClaw, first working chat |
| Telegram & chats | `telegram.html` | Channel vs product, BotFather, allowlists |
| Side note · Sept 21 | `side-note.html` | Isolated chat → ongoing assistant → Hermes runtime → memory → coordinating agents |
| Tool shelf | `shelf.html` | Short catalog |
| Glossary & FAQ | `glossary.html` | Words + first-try questions |

## How to view it

From the project root:

```bash
python3 -m http.server 4321
```

Then <http://localhost:4321/assistants/>

## Honesty notes

Muse launched US-only (Sept 2026); availability and pricing change. Hermes the
*agent* is not the same as Hermes the *model*. OpenClaw is not an OpenAI product.
Telegram is a doorway. Confirm install steps on official sites. Don’t grant
send-email or payments on day one.

## Disclaimer

Independent student resource. Not affiliated with Meta, Nous Research, OpenClaw,
Telegram, or any tool named here.
