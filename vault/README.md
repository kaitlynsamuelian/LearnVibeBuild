# Research Lab

Kaitlyn’s living documentation site. Separate from Skylar and from the Learn Vibe Build class artifacts.

**Project ideas** each have a page. Inside a project, four shelves:

- **Precedents / inspo** — things (products, photos, systems)
- **Research online** — knowledge from a screen (articles, chats, papers)
- **Research in person** — knowledge from a body in a room
- **Making** — things you produced

If it could go in two places: the Polder product page is precedents. Notes from seeing it at a store are in person. The chat that led to a mockup is online. The mockup is making.

## View it

From the LearnVibeBuild folder:

```bash
python3 serve.py
```

Then open <http://localhost:4321/vault/>

## Add a project

1. Copy a project object in `assets/js/data.js`.
2. New `id` (example: `field-kit`).
3. Make folders: `content/field-kit/precedents/`, `online/`, `in-person/`, `making/`.

## Add a card

1. In that project’s `entries` list, under the right shelf, add:

```js
{
  id: "interview-01",
  title: "Interview 01",
  date: "2026-10-02",
  blurb: "One line on why this file exists.",
}
```

2. Add `content/<project-id>/<section-id>/<id>.html` with the actual note.

Section ids: `precedents` · `online` · `in-person` · `making`
