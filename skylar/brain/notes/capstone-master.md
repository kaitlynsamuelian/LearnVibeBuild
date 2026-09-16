# Capstone — Master Research Document

One place for **all** capstone research done so far for [[senior-capstone]]. Consolidates
her 5 original ideas + two wide opportunity hunts (23 ideas total), grouped by theme so
overlaps are visible, with a combined ranking. Full source links + Skylar's briefings
live in the source files (see "Where everything lives" at the bottom).

**Judged against her ★5 (see [[capstone-goals]]):** #1 is PRIDE / passion / meaning
(would she be truly proud + excited?), then real/validated need, user-research potential,
new technical depth she'd deeply understand, and polish. Medium is open — physical and
software/digital ideas are judged equally; physical prototyping is a bonus, not a gate.

Ratings key: **pride · need · depth · research** each out of ★★★★★.

---

## ⭐ Combined top tier (across everything)

The ideas that scored highest on pride + freshness + a real, validated need:

1. **Adaptive one-handed kitchen tool *system*** (motor/dexterity disability) — strongest
   physical-prototyping fit, real validated gap, realistic testers via campus disability
   services. *[cluster: Accessibility]*
2. **"Why did today go the way it went" behavior mirror** — freshest + most personal
   (ties to her own [[procrastination]]/[[nervous-system-regulation]] work), open space,
   software-only. *[cluster: Self-regulation]*
3. **Passive color-to-sense wearable** (colorblindness) — best hardware-growth + novelty
   (nobody's shipped the passive version) + easy user-research population. *[cluster: Accessibility]*
4. **Plain-language multilingual aftercare instructions** — best-quantified need of all,
   strong current LLM build; risk is clinical testing access. *[cluster: LLM plain-language]*
5. **Proactive breath biofeedback for self-regulation** — extends her own
   [[idea-body-awareness]] to serve others; same sensor core, new audience. *[cluster: Self-regulation]*

Honest note from both hunts: **don't decide from the page.** The one she immediately
pictures herself building is the one to pressure-test first with a few real user
conversations.

---

## Cluster 1 — Self-regulation, body & behavior

### Behavior-insight "why did today go the way it went" mirror  *(hunt 1 · #1)*
- **Problem:** understand the *pattern* behind why intentions and actual days diverge —
  a retrospective mirror, not another planner/blocker.
- **Exists → gap:** Lockin, Forest, RescueTime, Rize all intervene *in the moment*; none
  help you look backward at *why*. Literature names six failure modes; no product surfaces
  which is sabotaging you.
- **Need:** indirect (volume of "solve procrastination" apps). **MVP:** light daily log +
  calendar/screen-time → rule-based tagging → weekly "what got in your way."
- **Fit:** software-only, very buildable, deeply personal. **Ratings:** pride ★★★★★ · need ★★★★☆ · depth ★★★★★ · research ★★★★☆.

### Body-awareness real-time self-regulation trainer  *(original idea · [[idea-body-awareness]])*
- **Problem:** teach self-regulation (breath/posture/stress) *in the moment*, not just remind.
- **Exists → gap:** Upright GO, Breathing Buddha, Spire, Flowtime — all single-signal +
  passive reminders ("fix it yourself"). Nobody closes the loop with real-time *guided*
  correction. Scope to ONE signal (breath = most tractable).
- **Fit:** her strongest original vs. all 3 priorities; ties to [[nervous-system-regulation]].
  **Ratings:** pride ★★★★★ · need ★★★★☆ · depth ★★★★☆.

### Proactive breath/stress biofeedback for classroom self-regulation  *(hunt 2 · #9)*
- **Problem:** support a K-12 kid with sensory/self-reg needs *before* dysregulation, not
  a static fidget tool. **Same sensor+biofeedback core as [[idea-body-awareness]], new audience.**
- **Exists → gap:** fidgets/break boxes are all *reactive*; nothing catches the rising-stress
  moment with a real physiological signal.
- **Need:** category real, proactive layer unvalidated. **Caveat:** testing with minors is
  hard — use OTs/special-ed teachers as proxies + adult neurodivergent testers.
- **Ratings:** pride ★★★★☆ · need ★★★☆☆ · depth ★★★★☆ · research ★★★☆☆.

### Private, on-device cycle/mood/performance correlation engine  *(hunt 1 · #3)*
- **Problem:** understand what's driving energy/mood/performance (tied to cycle) without
  handing data to a company.
- **Exists → gap:** Flo (40M+, $59.5M privacy scandal) & Clue dominate but are "broad but
  shallow"; no private-by-design tool that actually *correlates* factors. 39.6% of users
  have quit a period app over bad insights.
- **Need:** strong + quantified. **Caveat:** only if she's comfortable presenting menstrual
  health publicly. **Ratings:** pride ★★★★☆ · need ★★★★★ · depth ★★★★☆ · research ★★★★☆.

### Fitness/health data clarity  *(original idea · [[idea-fitness-clarity]])*
- **Problem:** tell people which of their tracked health data actually matters + what to do.
- **Exists → gap:** Whoop/Oura/Garmin + Cronometer; academic review confirms "data overload"
  is the real problem. Nobody owns the thin "here's the one thing that matters this week" layer.
- **Caveat:** crowded; needs a narrow audience (e.g. beginner lifters) + wrangling device APIs.
  **Ratings:** need ★★★★☆ · personal ★★★★☆ · scope-risk high.

### Real-time haptic lift-form coach (no screen)  *(hunt 1 · #4)*
- **Problem:** form correction *during* the rep — no propped-up phone, no filming yourself
  in a crowded gym.
- **Exists → gap:** Form Fix, CueForm, OptiLiftAI, Gymscore — all camera/vision based. None
  give feedback through a channel usable mid-lift. **MVP:** wrist/waist IMU → haptic buzz on
  one error pattern, one lift.
- **Caveat:** most crowded field here; must hold the no-screen/no-camera angle hard.
  **Ratings:** pride ★★★★☆ · need ★★★☆☆ · depth ★★★★☆ · research ★★★★★.

## Cluster 2 — Accessibility & sensory / physical design

### Adaptive one-handed / low-dexterity kitchen tool system  *(hunt 2 · #2)*
- **Problem:** a *coordinated set* of tools to get through a full meal-prep task one-handed
  (arthritis, stroke survivors, limb differences) — not one more isolated gadget.
- **Exists → gap:** adaptive tools exist piecemeal (SENDAR board, rocker knives); nobody
  designs a coordinated system for a whole task. **MVP:** pick ONE task (salad/sandwich),
  3D-print/laser-cut 2–3 tools that work together; test via campus disability services/OT.
- **Fit:** strongest physical-prototyping/industrial-design match; new audience; ties to her
  compassion value. **Ratings:** pride ★★★★☆ · need ★★★★☆ · depth ★★★★★ · research ★★★★☆.

### Passive color-to-sense wearable (colorblindness)  *(hunt 1 · #2)*
- **Problem:** hands-free, discreet color awareness (outfit matching, ripeness, status
  lights) without pulling out a phone to scan each item.
- **Exists → gap:** WearWithAll, Color Blind Pal etc. all require active phone scanning;
  nobody's shipped the passive/ambient wearable. **MVP:** color sensor + haptic/bone-conduction,
  scoped to outfit-matching. Design crux = the color→feel encoding.
- **Need:** ~8% of men, easy to recruit. **Ratings:** pride ★★★★☆ · need ★★★★★ · depth ★★★★★ · research ★★★★★.

### Personalized ambient sound recognition (Deaf/HoH)  *(hunt 1 · #8)*
- **Problem:** alert D/HH people to the *specific* sounds that matter (their baby, doorbell,
  alarm), not just "a sound happened."
- **Exists → gap:** bed shakers/light signalers detect *a* sound; OS features are generic;
  Earzz identifies sounds but isn't personalized to a home. **Gap = training on the user's
  own sounds.**
- **Caveat:** weakest personal-connection fit — she has no obvious inroad to the community.
  **Ratings:** need ★★★★☆ · depth ★★★★☆ · research ★★☆☆☆.

### Wheelchair-accessible transit reliability crowdsourcing (smaller cities)  *(hunt 2 · #7)*
- **Problem:** real-time "is the bus lift / station elevator working today" for smaller /
  college-town transit (NYC is well-served; small systems aren't).
- **Need:** unvalidated — no direct complaints found. **Note:** same shape as community-laundry
  & dorm give-take (crowdsourced status). **Ratings:** pride ★★★☆☆ · need ★★★☆☆ · depth ★★★☆☆.

## Cluster 3 — Fashion & organization

### Closet / wardrobe "what do I own" organizer  *(original idea · [[idea-closet-organizer]])*
- **Problem:** people forget what they own / can't put outfits together. Real killer = the
  effort of cataloging, not outfit logic.
- **Exists → gap:** Stylebook, Whering, Acloset, Cladwell + **Google Photos now adding a free
  "Digital Closet."** Cataloging friction kills adoption. **Needs a sharp differentiator**
  (e.g. a physical capture station) to not be redundant. **Ratings:** personal ★★★★☆ · crowded, need ★★★★☆.

### Personal "true size" cross-brand fit memory  *(hunt 1 · #7)*
- **Problem:** know your real size in a brand you've never bought from — no buy-3-return-2.
- **Exists → gap:** True Fit, Fit Analytics etc. are all retailer/enterprise-facing + heavy
  body-scan. Room for a personal, consumer-side, community-sourced tool.
- **Need:** best-quantified on the whole list (88% frustrated; 67% of returns fit-driven).
  **Caveat:** well-funded competition; needs a narrow personal angle. **Ratings:** need ★★★★★ · depth ★★★☆☆.

## Cluster 4 — Home / small-space / community logistics

### No-drill, high-capacity drying rack  *(original idea · [[idea-drying-rack]])*
- **Problem:** air-drying clothes wastes floor space; renters can't drill.
- **Exists → gap:** mature/cheap racks (Woolite, Rebrilliant) all need stud-drilling for real
  capacity; no-drill options cap at 15–40 lb (< a load of wet jeans). **Gap = truly
  damage-free AND rated for real wet loads** (anchoring geometry / load distribution).
- **Fit:** strong fabrication/product-design play. **Caveat:** category well-solved — must nail
  the no-drill/high-capacity mount to not feel like a reskin. **Ratings:** pride ★★★★☆ · need ★★★★☆ · depth ★★★☆☆.

### Community laundry availability (no landlord buy-in)  *(hunt 1 · #6)*
- **Problem:** which washers/dryers are free in rentals that'll never get smart-laundry infra.
- **Exists → gap:** all solutions need a sensor per machine + landlord cooperation. **Gap =
  zero-install, crowdsourced status** (5-sec tap when you walk by) + prediction.
- **Fit:** personal, immediate pilot group (her building). **Caveat:** sensor version is worn
  hackathon territory — the crowdsourced angle is what keeps it fresh. **Ratings:** need ★★★★☆ · research ★★★★☆.

### Hyperlocal dorm/apartment give-take board  *(hunt 2 · #10)*
- **Problem:** cut college move-out "furniture graveyards" — peer-to-peer, all semester, not
  just one institutional event.
- **Exists → gap:** donation programs/ReSupply are institutional + end-of-semester. **Gap =
  free, peer-to-peer, mid-semester, dorm-specific.** **Caveat:** Buy Nothing / FB Marketplace
  already do the informal version — must be dramatically more frictionless. **Ratings:** need ★★★★☆ · depth ★★☆☆☆ · research ★★★★★.

### Tenant-side maintenance documentation + legal-deadline escalation  *(hunt 2 · #6)*
- **Problem:** help renters build a paper trail + know their legal repair-deadline rights,
  with zero landlord participation.
- **Exists → gap:** RentRedi/Avail/etc. are all landlord-facing. **Gap = a consumer-side tool**
  that timestamps requests, auto-calculates the state legal deadline, generates an escalation
  letter. Scope to Colorado law. **Fit:** personal (she rents), immediate testers.
  **Caveat:** least technically novel unless she adds OCR on leases. **Ratings:** need ★★★★☆ · depth ★★★☆☆ · research ★★★★★.

## Cluster 5 — LLM plain-language (translation + simplification)

### Plain-language multilingual aftercare instructions  *(hunt 2 · #4)*
- **Problem:** help any patient truly understand discharge instructions regardless of reading
  level or first language, across the multi-day take-home window.
- **Exists → gap:** tools solve EITHER reading level OR language, mostly at the live visit.
  **Gap = both, for the take-home window.** **MVP:** LLM pipeline turning a discharge note into
  a plain-language, icon-supported, audio card + SMS check-ins (one setting, Spanish first).
- **Need:** best-quantified in the sweep (patients recall 10–15%). **Caveat:** sensitive data —
  use synthetic notes; clinic partner is a lift. **Ratings:** pride ★★★★☆ · need ★★★★★ · depth ★★★★☆.

### Back-office paperwork translator for immigrant small businesses  *(hunt 2 · #8)*
- **Problem:** help an immigrant owner understand leases/licenses/tax/loan docs — the
  back-office side, not customer chat.
- **Exists → gap:** all multilingual tools are customer-facing. **Gap = back-office document
  understanding.** **Same LLM core as aftercare — pick ONE, not both.** **Caveat:** no obvious
  inroad to the community yet. **Ratings:** need ★★★★☆ · depth ★★★★☆ · research ★★★☆☆.

## Cluster 6 — Audio

### Cross-brand speaker sync hub  *(original idea · [[idea-speaker-bridge]])*
- **Problem:** make already-owned, different-brand speakers (her JBL + a friend's Bose) play
  in sync — without buying new Auracast gear.
- **Exists → gap:** party modes are same-brand only; phone "dual audio" is a laggy hack;
  Auracast needs new silicon on both ends; WiiM Pro solves the *easy* (one-speaker) version.
  **Gap = cross-brand sync of owned gear.** Prior art: [Snapcast](https://github.com/snapcast/snapcast)
  (sync math) + [BlueBox](https://github.com/innotech-insa/innotech-mvp) (student Pi + 1 dongle/speaker).
- **MVP:** Pi hub, 1 BT dongle/speaker, Snapcast-style sync, 2 speakers "good enough."
- **Read:** deepest tech (great for priority #3) but **thinnest proven demand** (no one
  actively complaining) and hardest to finish. **Ratings:** pride ★★★☆☆ · need ★★☆☆☆ · depth ★★★★★.

## Cluster 7 — Safety / family & education

### Family "safe-phrase" scam-defense coordinator (seniors)  *(hunt 2 · #1)*
- **Problem:** operationalize AI voice-scam defense — set/rotate a safe phrase, practice it,
  one-tap verify with family, log incidents.
- **Exists → gap:** all *advice content*, not a tool; detectors are unreliable (60–75% on real
  VoIP). **Gap = the human-protocol app.**
- **Need:** quantified (1 in 4 got a deepfake call; seniors lost $352M in 2025). **Caveat:**
  thinnest technical depth unless she adds carrier spam-signal integration. **Ratings:** pride ★★★★☆ · need ★★★★★ · depth ★★★☆☆.

### Real-time accommodation cueing for general-ed teachers  *(hunt 2 · #3)*
- **Problem:** help a teacher remember, *in the moment*, which IEP/504 accommodation applies
  to which student for which activity.
- **Exists → gap:** tools do documentation (after the fact) or static checklists; nothing
  pushes a contextual, schedule-synced reminder. **Need:** inferred, unvalidated (weakest signal).
  **Ratings:** pride ★★★☆☆ · need ★★★☆☆ · depth ★★★☆☆.

### Care-team coordination hub for parents of neurodivergent kids  *(hunt 2 · #5)*
- **Problem:** keep a child's providers (school, OT, speech, behavioral, pediatric) on the
  same page without the parent becoming a full-time coordinator.
- **Exists → gap:** elder-care coordination apps exist for a different situation; no dedicated
  tool for this. **Caveat:** families may already cope with a shared doc/group text.
  **Ratings:** need ★★★★☆ (needs validation) · depth ★★★☆☆.

---

## Considered & set aside (honest passes)
Already well-solved or too crowded to beat in a semester:
- **Wind-resistant umbrella** — Senz°, Blunt, GustBuster already do it well.
- **Untaggable-object tracker** (thin/washable/no-battery) — battery-free version is lab-hard;
  demand unvalidated (was hunt 1 · #5). Ratings were pride ★★★☆☆ · need ★★☆☆☆.
- **Food-waste / pantry expiration** — crowded (PantryWise, NoWaste, My Pantry).
- **Clothing swap for friend groups** — already built by students (Besties Closet, Coclo).
- **Shared-fridge food ownership** — low-tech tape/spreadsheet works well enough.
- **Package/mail management** — real fix is institutional smart lockers.
- **"What do my apps know" privacy dashboard** — iOS/Android already ship this.

---

## Where everything lives (source map)
- **This file** — the consolidated master (start here).
- [[capstone-opportunities]] — full detail + all source URLs for both wide hunts
  (hunt 1 = 8 ideas; hunt 2 = 10 audience-driven ideas) + Skylar's ranked recommendations.
- [[capstone-research-log]] — deep-dive research + sources for her 5 original ideas.
- Individual idea notes: [[idea-drying-rack]], [[idea-speaker-bridge]], [[idea-fitness-clarity]],
  [[idea-body-awareness]], [[idea-closet-organizer]].
- Skylar's briefings (her voice): `brain/reflections/2026-09-16-opportunities.md`,
  `brain/reflections/2026-09-16-opportunities-sweep.md`, `brain/reflections/2026-09-15-research.md`.
- Context: [[capstone-goals]] (her ★5 + success definition), [[capstone-skills]],
  [[capstone-opportunity-hunt]] (the search brief).

Linked: [[senior-capstone]], [[capstone-goals]], [[capstone-skills]],
[[capstone-opportunity-hunt]], [[capstone-research-log]], [[capstone-opportunities]]
