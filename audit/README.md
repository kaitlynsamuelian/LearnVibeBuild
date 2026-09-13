# Audit Decoder

An interactive degree-audit explainer. Upload a PDF or paste the text, get a
plain-English summary of what’s done / in progress / still open, and ask
questions about *this* audit.

Built as a more ambitious studio artifact than the static Cursor/Claude guides:
file upload, on-device PDF text extraction, heuristic parsing, and a Q&A layer.

## How to try it

From the project root:

```bash
python3 -m http.server 4321
```

Then open <http://localhost:4321/audit/>

- **Try a sample audit** uses a fictional student (no real records).
- **Drop a PDF** — processing stays in the browser (pdf.js).
- CU tip: in the degree audit, Advanced Settings → Format → PDF.

## Privacy

The file is not uploaded to a server. Optional API-key mode *does* send the
extracted text to Anthropic or OpenAI; leave it off unless you want that.
Do not use someone else’s audit.

## Disclaimer

Unofficial. Not a registrar or advising tool. Always confirm with a human advisor.
