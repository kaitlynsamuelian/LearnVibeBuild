# My Boop

A tiny virtual-pet game in the spirit of My Boo: feed, bathe, sleep, play
three minigames, and spend coins on colors, hats, and rooms.

Same pattern as the other studio artifacts: plain HTML, CSS, and a little
JavaScript — nothing to install, no build step.

## What's inside

| File | What it does |
| --- | --- |
| `index.html` | Hello intro, phone-shaped pet, care, games, stories, shop |
| `assets/css/styles.css` | Soft peach room, marshmallow Boop, intro + story film |
| `assets/js/game.js` | Needs, decay, save, minigames, closet, intro skip |
| `assets/js/stories.js` | Late to ATLAS, plus room to add more films |

Opening the page plays a short hello animation, then the care screen. Skip is
always there. Reduced-motion settings shorten the intro.

**Stories** is the personal page. The first film is *Late to ATLAS*: Boop
oversleeps, walks campus, gets stopped by the Flatirons, and sits down in
studio. Your current color and hat come with them.

Progress lives in `localStorage` (`lvb-my-boop-v1`). Hunger, clean, energy, and
happy drift while the tab is closed. Tap the name to rename. Shop has a start-over button.

## How to view it

From the project root:

```bash
python3 -m http.server 4321
```

Then <http://localhost:4321/boop/>

Double-clicking `index.html` also works.

## Disclaimer

Unofficial student project. Inspired by My Boo. Not affiliated with Tapps Games.
