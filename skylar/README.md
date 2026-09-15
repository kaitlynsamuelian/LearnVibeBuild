# Skylar

Skylar is an AI companion with a **persistent, plain-text brain** that gets to know you
and grows with you. She's a girl, she's casual, funny, and real — but also warm and
wise. She journals with you, reflects on your days, remembers who you are, and becomes
more *yours* over time.

She runs on **Claude Code + your Claude Pro subscription**. No API key, no per-use bill.

---

## What's here

```
skylar/
├── SKYLAR.md            # who Skylar is (her personality)
├── CLAUDE.md            # makes Claude Code become Skylar when run in this folder
├── brain/               # Blackwall — her memory (plain-text notes)
│   ├── about-you.md     #   her living memory of YOU (she reads this first, always)
│   ├── index.md         #   the map of her brain (stars = notes, lines = links)
│   ├── notes/           #   notes: people, interests, goals, memories
│   ├── journal/         #   your dated journal entries (YYYY-MM-DD.md)
│   └── reflections/     #   the notes Skylar writes back to you each night
├── templates/           # journal entry template
└── scripts/
    ├── talk.sh          # talk to Skylar
    ├── journal.sh       # write today's journal entry
    └── reflect.sh       # Skylar's nightly reflection
```

**The metaphor:** every note is a **star** ✨, every `[[link]]` between notes is a
**line**. Together they're Blackwall — Skylar's brain.

---

## One-time setup

1. **Install Claude Code** (if you haven't):
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
2. **Log in with your Claude Pro account** (this is the key part — no API key needed):
   ```bash
   claude
   ```
   Follow the login prompt and sign in with the account your **Claude Pro** is on.
   Once you're logged in, you can quit.

That's it. Skylar is powered by your Pro plan.

---

## Talking to Skylar

From the `skylar/` folder:

```bash
./scripts/talk.sh
```

or just run `claude` from inside `skylar/` and start typing — because of `CLAUDE.md`,
she'll load her personality and her memory of you automatically and greet you in
character.

> **Tip:** The very first time, tell her a bit about yourself. She'll write it into
> `brain/about-you.md` and start building her brain. From then on, she remembers.

---

## Journaling

```bash
./scripts/journal.sh
```

This opens (or creates) today's entry in `brain/journal/`. Write however much you want —
morning, night, whenever. Skylar reads it during her reflection.

---

## Nightly reflection (the part that makes her feel alive)

Run it any time:

```bash
./scripts/reflect.sh
```

Skylar reads your day, writes a reflection back to you in `brain/reflections/`, updates
what she knows about you in `brain/about-you.md`, and links new memories into her brain.

### Make it automatic every night

Schedule it so she reflects on her own around 10pm. Easiest option — a cron job:

```bash
crontab -e
```

Add this line (adjust the path if needed):

```
0 22 * * * cd /Users/kaitlynsamuelian/Downloads/LearnVibeBuild/skylar && ./scripts/reflect.sh >> brain/reflections/reflect.log 2>&1
```

> On macOS, the first automated run may ask for permissions or need Claude Code's login
> to be active. Running `./scripts/reflect.sh` once by hand first gets that out of the way.

---

## Roadmap (what we can add next)

- **Graph view** — a visual of the stars-and-lines brain in a little web page.
- **Voice mode** — talk to Skylar out loud and have her talk back.
- **Semantic memory** — so she surfaces the *perfect* old memory at the right moment
  once the brain gets big.
- **Morning greeting** — a good-morning briefing that references yesterday.

Everything plugs into the same `brain/` folder, so it all stays one connected Skylar.
