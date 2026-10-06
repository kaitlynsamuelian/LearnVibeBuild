# Learn Agent Skills

A beginner-first site about **Cursor Agent Skills**: reusable instruction
packs (a folder + `SKILL.md`) that teach Agent how to do one job the same
way every time.

Same pattern as the other studio artifacts: plain HTML, CSS, and a little
JavaScript. Nothing to install, no build step.

## What's inside

| File | What it does |
| --- | --- |
| `index.html` | What a skill is, vs rules vs chat, this-cycle try path, what skills are useful for, design-look callout |
| `use.html` | Where files live, Agent vs `/skill-name`, the repo skill, built-in skills, folder map |
| `existing.html` | Named skills to install: Impeccable, frontend-design, built-ins, browse lists |
| `genres.html` | Other skill genres besides a look: voice, ship, tests, review, git, research, debug, docs, a11y, repo |
| `write.html` | SKILL.md anatomy, description tips, class example, class-sized and design-look skill ideas |
| `builder.html` | Form that generates a SKILL.md to copy or download |
| `compare.html` | Same-prompt A/B: burrito cart without vs with `/website-look` |
| `examples/class-cycle/SKILL.md` | Copyable example (not auto-loaded by Cursor) |
| `assets/css/styles.css` | Teal instruction-card theme, dark / light |
| `assets/js/main.js` | Nav, footer, theme, builder |

This artifact **explains** skills. A live project skill for this repo lives
at `.cursor/skills/learn-vibe-artifact/` (outside this folder on purpose).
Cursor only loads skills from skill directories, not from `skills/examples/`.

## Try it this cycle

1. In Agent chat, type `/learn-vibe-artifact`.
2. Or type `/create-skill` and describe a workflow you keep repeating.
3. Or draft a file in the Skill Builder, then save it as
   `.cursor/skills/your-name/SKILL.md` or `~/.cursor/skills/your-name/SKILL.md`.

Do not put personal skills in `~/.cursor/skills-cursor/`. That folder is
Cursor's built-in skills.

## How to view it

From the project root:

```bash
python3 serve.py
```

Then <http://localhost:4321/skills/>

Double-clicking `index.html` also works.

## Disclaimer

Student learning resource. Not affiliated with Cursor / Anysphere.
Menus, built-in skill names, and docs change. Confirm details on
[cursor.com/docs/skills](https://cursor.com/docs/skills).
