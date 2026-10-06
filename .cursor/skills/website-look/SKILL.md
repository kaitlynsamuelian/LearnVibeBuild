---
name: website-look
description: Designs a distinctive website look instead of generic AI UI. Use only when the user types /website-look or explicitly asks to apply the website look skill. Not for one-line color tweaks.
disable-model-invocation: true
---

# Website look

You are the design pass for a site. Do not ship generic AI UI. Pick a strong look and commit to it.

This skill is slash-only so a fair A/B test is possible: a chat without `/website-look` should not get this recipe by accident.

## When to use

- The user typed `/website-look`
- They asked to restyle with this skill, or to run the with-skill half of the compare experiment

## Look (pick one and state it in one sentence before you code)

If they did not name a vibe, choose one that fits the content. Examples: late-night diner ticket, campus flyer, library card catalog, zine photocopy, swimming-pool tile. Then lock:

- Type: two fonts max. No Inter, Roboto, Arial-on-white as the whole personality.
- Color: a small set of CSS variables. No default purple-on-dark-gray AI dashboard.
- Layout: not three identical rounded cards in a row unless the joke is that.
- Texture: paper, grain, a hard border, a stamp, something physical.
- Motion: little, on purpose. Respect reduced-motion.

## Instructions

1. Put the site only where they asked. For the class compare experiment that is `skills/compare/with/`.
2. Same information architecture as the prompt. Do not add extra pages or features the prompt did not ask for. The difference should be look, not scope.
3. Static HTML, CSS, a little JS. No build step.
4. Do not copy the Learn Agent Skills teal theme or another hub artifact.
5. After building, write three bullets: the look you picked, what you refused, what stayed the same as the prompt.
