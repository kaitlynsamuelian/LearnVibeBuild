---
name: learn-vibe-week
description: Keeps a Learn, Vibe, Build weekly studio log and compiles a facts packet for the cycle submission. Use when the user mentions this week's assignment, weekly log, cycle reflection, studio share, audit this week, what I worked on, or turning Cursor work into the 10-point artifact plus reflection. Does not write the reflection paragraph.
---

# Learn Vibe week

Helps with the weekly Learn, Vibe, Build cycle: keep a running facts file, or audit the week when asked. The assignment shape is in [references/brief.md](references/brief.md). Paste that brief verbatim into the log header if she asks what the week requires.

The reflection is **written by her, not by AI**. This skill logs facts and hands her a prompt. It does not draft the paragraph. If she already wrote one and wants it to sound like her, tell her to run `/rewrite-in-my-words` on **her** draft. Do not write a reflection and then "make it sound like her."

## Modes

Pick from what she asked:

| She said something like | Mode |
| --- | --- |
| log this, keep a file, add this session, remember this for Friday | **log** |
| audit this week, what did I work on, previous week, compile for submission | **audit** |
| help with my reflection / turn this into my submission | **audit**, then the reflection handoff. Still no paragraph. |

If she is finishing an artifact this session and this skill loaded, **log** at the end unless she says skip.

## Files

- Current week: `cycles/current.md` (repo root)
- Template: [references/log-template.md](references/log-template.md)
- Older weeks: `cycles/week-YYYY-MM-DD.md` (Monday date)

Create `cycles/` and `current.md` from the template if missing. Week starts Monday. If `current.md` is a finished prior week, rename it to `cycles/week-YYYY-MM-DD.md` and start a new current file.

## Log (keep the file)

1. Open `cycles/current.md`.
2. Append a session block: date, what we tried or shipped, paths, tools, anything she said out loud (quote her, do not paraphrase into essay voice).
3. Update Artifact if a hub URL or tile exists.
4. Add tools under **Tools to disclose**.
5. Keep drying-rack / parked research under **Not for the reflection** unless she says this week's artifact is that.
6. Tell her the file path in one line. Do not write a reflection.

## Audit (look back)

Gather facts. Do not invent sessions.

1. Read `cycles/current.md` (and last week's `cycles/week-*.md` if she asked for the previous week).
2. In the repo, run:
   - `git log --since='8 days ago' --oneline --stat`
   - `git status -sb`
3. Note new hub tiles and folders (artifact someone else can open).
4. Skip secrets, `.env`, and unrelated vault research unless she names it.
5. Write or update the log so it matches what you found. Label inferred git-only items as inferred.

Then give her a **handoff**, not a submission:

```markdown
## This week's facts
- Artifact (link or folder):
- What you tried:
- What happened:
- Tools to disclose:

## You write this
One paragraph, your words: what you tried, what happened, what you learned.
Studio: demo week = share the work; off week = listen and give real feedback.

## Submit
Link, file, or text + the paragraph. If it is on the Learn Vibe Build site, drop that link on the class record too.
```

Fill the facts from the log. Leave **You write this** empty of prose. You may add 3-5 bullet questions (what surprised you, what broke, what you would try next). No sample paragraph.

## Hard no

- Do not write the reflection, even as a "starter," "example," or "in your voice."
- Do not use em dashes in log copy.
- Do not delete earlier artifacts or vault research.
- Do not treat the drying-rack capstone as this week's cycle unless she says so.

## Extra

Project skill for this repo. To use it in other folders, copy `.cursor/skills/learn-vibe-week/` to `~/.cursor/skills/learn-vibe-week/`. Never `~/.cursor/skills-cursor/`.
