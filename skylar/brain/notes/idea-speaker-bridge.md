# Idea: Bridging Disconnected Speaker Ecosystems

A capstone idea for [[senior-capstone]]. **Problem:** people own speakers/audio systems
from different generations and ecosystems that can't easily play together. **Vision:**
something that lets mismatched speakers play the same audio.

**Kaitlyn's clarified framing (2026-09-15):** she specifically means connecting
*different-brand* speakers people already own — e.g. her JBL + a friend's Bose — to play
the same audio in sync. Important reality: this does NOT work natively today. Party modes
are same-brand only (JBL↔JBL PartyBoost, Bose↔Bose SimpleSync, etc.). Phone "dual audio"
(Samsung) is a limited/laggy cross-brand hack. Auracast (Bluetooth LE Audio) is the
industry's real fix but needs NEW speakers that support it — the mixed/older gear people
already own doesn't. So the real gap = syncing already-owned, mixed-brand speakers
without buying new Auracast hardware. Hard part remains cross-device sync/latency.

- **Target audience:** music listeners, college students, households with multiple
  speakers, people with older audio equipment.
- **Why it fits her:** hardware/software integration + audio tech + [[capstone-skills]]
  she wants to grow. Technically meaty → strong for priority #3 (deep understanding).
- **Fit vs. [[capstone-goals]]:** technically deep and interesting. Open question: is the
  *problem* painful/real enough for enough people (priority #2)? Risk of being
  "cool tech" more than "real need."

## Open questions for research (see [[capstone-research-log]])
Focus: the CROSS-BRAND, already-owned-speakers framing (JBL + Bose, etc.), NOT the
"bridge one old speaker into a modern system" commodity version.
- **Latency-compensation approaches:** how do people sync audio across devices with
  different, unknown Bluetooth/processing delays? (per-device delay calibration, NTP-style
  clock sync, buffering, measuring round-trip latency, etc.)
- **Hardware vs. app — which is realistic for a student?** e.g. a single transmitter box
  with multiple synced Bluetooth outputs, vs. a phone app coordinating multiple speakers.
  What are the real technical blockers for each (BT profiles, one-source-one-sink limits)?
- **How hard is cross-brand sync really for a one-semester capstone?** What's the minimum
  viable version (e.g. 2 speakers, "good enough" sync) vs. the ideal? Where do hobby
  projects / open-source attempts (e.g. snapcast, Auracast dev kits) get stuck?
- Who actually has this problem and how much do they care?

## Research so far (2026-09-15)
Full findings: [[capstone-research-log]]. Key finding: the easy version of this idea —
bridge one old/mismatched speaker into a modern ecosystem — is already a solved,
commodity product (WiiM Pro, $149, does almost exactly this; Bluetooth dongles do a
cheaper version for $15-50). The genuinely unsolved problem is **synchronized playback
across closed ecosystems at once** (Sonos + Bluetooth + Chromecast speakers all in
sync) — a real clock-drift/networking problem, but a big lift for one semester. My
honest take: technically the richest idea here, but real risk of building cool tech
for a problem the market already sells a cheap fix for — worth pressure-testing whether
she'd actually attempt the hard cross-ecosystem-sync version or the easier "solved
already" version before committing.

**Deep-dive update (2026-09-15, same day, follow-up):** dug into the sharpened
questions — latency compensation, hardware-vs-app, and semester feasibility. Real
prior art exists at almost exactly her scope: [BlueBox](https://github.com/innotech-insa/innotech-mvp),
a French engineering-student project, built a Raspberry Pi hub with up to 4 USB
Bluetooth dongles (one per speaker) syncing playback across speakers, controlled by a
phone app — and even they needed a dedicated latency-optimization effort, proving this
is real but student-tractable work. [Snapcast](https://github.com/snapcast/snapcast)
shows the sync algorithm that would generalize (NTP-style clock sync + per-sample
speed correction), though it's built for software clients, not raw Bluetooth output,
so she'd need to adapt the idea to Bluetooth's own latency variance. Auracast needs new
silicon on both ends (confirmed: doesn't help gear people already own). The soft spot
is still demand — I couldn't find people actively asking for this as a live complaint;
it reads as an accepted limitation people route around, not a burning need. **My
current take:** a "hub + one dongle per speaker + good-enough 2-speaker sync" MVP is a
legit, well-scoped, technically rich semester build with real precedent — but before
committing, she should validate that people actually *want* this (not just that it's
buildable), since priority #2 is still the shakiest leg here.

Linked: [[senior-capstone]], [[capstone-skills]], [[capstone-goals]]
