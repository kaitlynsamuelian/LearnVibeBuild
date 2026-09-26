# Buff Trivia

An 8-question CU Boulder quiz with a score and a roast at the end.

Same pattern as the other studio artifacts: plain HTML, CSS, and a little
JavaScript — nothing to install, no build step.

## What's inside

| File | What it does |
| --- | --- |
| `index.html` | Start screen, one-question quiz, roast result |
| `assets/css/styles.css` | Black + CU gold theme |
| `assets/js/questions.js` | The 8 questions, facts, and roast bands |
| `assets/js/game.js` | Start, lock answers, score, next, play again |

Questions and choice order shuffle each round so a replay is not identical.

## How to view it

From the project root:

```bash
python3 -m http.server 4321
```

Then <http://localhost:4321/trivia/>

Double-clicking `index.html` also works (classic scripts, no modules).

## Disclaimer

Unofficial student project. Not affiliated with or endorsed by the University
of Colorado. Conference names and campus facts change — treat it as a joke
with a pulse check, not a campus tour.
