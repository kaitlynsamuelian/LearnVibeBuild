# Learn Open Source

A beginner-first static site about **open-source and local AI tools** — for people
who only know ChatGPT, Claude, or Cursor and want to try the other door.

Same pattern as the Cursor and Claude guides: plain HTML/CSS/JS, no build step.

## What's inside

| Page | File | What it covers |
| --- | --- | --- |
| Home | `index.html` | Why try, three paths (browser → local → code) |
| What “open” means | `what-is-open.html` | Open software vs open weights vs local |
| Try a chat | `try-chat.html` | HuggingChat, same-prompt comparison |
| Run it locally | `try-local.html` | Hardware check, Ollama, LM Studio |
| Use it for code | `try-code.html` | Cline + Ollama, Aider, Continue caveat |
| Tool shelf | `tools.html` | Short catalog + model families |
| Glossary & FAQ | `glossary.html` | Words + first-try questions |

## How to view it

From the project root:

```bash
python3 -m http.server 4321
```

Then <http://localhost:4321/opensource/>

## Honesty notes

Tools and model names move. Continue.dev was acquired and frozen — the guide
says so. Hosted “open” chats are not private. Local quality is usually worse
than ChatGPT. Confirm steps on official sites before class demos.

## Disclaimer

Independent student resource. Not affiliated with Meta, Hugging Face, Ollama,
LM Studio, or any tool named here.
