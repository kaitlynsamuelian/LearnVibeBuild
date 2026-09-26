# Campus Thread

A tiny play that looks like iMessage. ATLAS, Norlin, C4C, and the Flatirons
are in a group chat. Hit **Let them talk**, then type one line as a student.

Same pattern as the other studio artifacts: plain HTML, CSS, and a little
JavaScript — nothing to install, no build step.

## What's inside

| File | What it does |
| --- | --- |
| `index.html` | Night page, phone frame, composer |
| `assets/css/styles.css` | Night + iMessage-ish theme |
| `assets/js/voices.js` | The four buildings, the scripted scene, reply lines |
| `assets/js/chat.js` | Play the scene, typing dots, student send, replies |

Replies are canned and keyword-picked (homework, food, tired, weather, default).
No API. The Flatirons always speak last.

## How to view it

From the project root:

```bash
python3 -m http.server 4321
```

Then <http://localhost:4321/thread/>

## Disclaimer

Unofficial student project. Not affiliated with the University of Colorado
or any campus building that would like to remain silent.
