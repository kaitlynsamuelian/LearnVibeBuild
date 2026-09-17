# Capstone Opportunities — the wide hunt

Findings from a broad opportunity hunt for [[senior-capstone]], run against
[[capstone-opportunity-hunt]]'s brief: go past her five existing ideas
([[idea-drying-rack]], [[idea-speaker-bridge]], [[idea-fitness-clarity]],
[[idea-body-awareness]], [[idea-closet-organizer]]) and find fresh, validated
opportunities across her domains, including the overlooked "everyday ugh" category.

## 2026-09-16 11:27 — broad multi-audience sweep

A second wide hunt, deliberately run across audiences the first hunt (below) and her
five ideas hadn't touched: seniors, teachers, K-12 kids, healthcare patients,
disability (motor/dexterity), parents/caregivers, renters, immigrants/ESL,
small-business owners, and college students/sustainability. Same rating lens as the
first hunt: pride/passion/meaning first, then real/validated need, user-research
potential, new technical depth, and polish.

---

### 1. Family "safe-phrase" scam-defense coordinator (seniors)
**How might we** help a family actually *operationalize* AI voice-scam defense — not
just be told to set up a safe phrase, but practice it, use it in the moment, and
coordinate as a family when a suspicious call happens?

- **What exists:** the advice itself is everywhere — [antigrift.com's guide](https://antigrift.com/guides/family-safe-word)
  walks families through picking and using a safe word, and elder-law/financial-advisor
  blogs all recommend the same thing. On the tech side, deepfake-detection products
  (Pindrop, Reality Defender, Hiya, McAfee Deepfake Detector) [claim 90%+ accuracy on
  clean audio but drop to 60–75% on a real, compressed VoIP call](https://cybrvault.com/blog/ai-voice-scams-2026-deepfake-phone-calls) —
  not reliable enough to trust alone. Call-screening apps (Aura, Robokiller, T-Mobile
  ScamShield, Verizon Call Filter) block known scam numbers but don't help with a cloned
  voice calling from an unknown number claiming to be a grandkid in trouble.
- **The gap:** everything I found is *advice content*, not a tool. Nobody has built the
  lightweight app that helps a family actually set up and rotate a safe phrase, practice
  it, one-tap-ping other family members when a call feels off, and log incidents —
  the human-protocol layer, not another (unreliable) detector.
- **Demand signal:** real and quantified — [1 in 4 Americans received a deepfake voice
  call in the past 12 months](https://cybrvault.com/blog/ai-voice-scams-2026-deepfake-phone-calls)
  (Hiya State of the Call 2026 report), and seniors lost $352M to AI scams in 2025 with
  over 3,100 victims 60+ reporting to the FBI.
- **One-semester MVP:** a small family-group app — set/rotate a safe phrase, a one-tap
  "this call felt weird, help me verify" button that pings designated family members, a
  simple incident log, and an optional practice-drill mode. Deliberately skips audio
  analysis, since that's the part proven unreliable.
- **Fit for her:** real product/UX design work, ties to her value of family and
  compassion, easy user-research population (any older relative or family friend).
- **Rating:** ★★★★☆ pride/passion · ★★★★★ real need (quantified, current, growing) ·
  ★★★☆☆ new technical depth (light — mostly product/UX unless she adds something like
  carrier spam-signal integration) · ★★★★☆ user research potential.
- **Honest caveat:** thinnest on technical depth of this batch — worth deciding early
  whether she wants to add a harder technical layer (e.g., a real robocall/spam-signal
  integration) or accept this as a strong product-design-forward project.

---

### 2. Adaptive one-handed / low-dexterity kitchen tool system (people with disabilities — motor/dexterity)
**How might we** give people with limited hand strength or one working hand (arthritis,
stroke survivors, limb differences) a *coherent system* for basic meal prep — not just
one more adaptive gadget?

- **What exists:** real adaptive tools already exist piecemeal — the [SENDAR one-handed
  cutting board](https://ixd.prattsi.org/2026/02/assistive-technology-sendar-one-handed-cutting-board/)
  (a Pratt student project), adaptive knives (rocker/T-handle/angled-handle designs),
  a full [DRCNH clearinghouse of adaptive kitchen/eating tools](https://drcnh.org/assistive-technology/kitchen/),
  and voice-activated appliances like the Instant Pot Pro Plus for people who can't
  manage small buttons.
- **The gap:** my own search summarized it well — there's "a significant gap between
  standard kitchen tool design and the needs of people with limited dexterity." Every
  solution I found solves ONE task in isolation (cutting, mainly). Nobody's designed a
  small, *coordinated* set of tools for a full task sequence — e.g., stabilize, open,
  pour, and combine ingredients for one real recipe, one-handed, start to finish.
- **Demand signal:** real and large — tens of millions of US adults with arthritis, ~7M
  US stroke survivors, plus the limb-difference community. This is exactly the
  "accepted as normal even though badly designed" everyday category the hunt brief
  flags — most people just accept that cooking one-handed is just hard.
- **One-semester MVP:** pick ONE complete task (e.g., "make a sandwich" or "prep a
  salad") and design/3D-print/laser-cut 2–3 coordinated tools that work together for
  that whole sequence, tested with real users — CU Boulder's disability services office
  or an OT program is a realistic path to real testers.
- **Fit for her:** the strongest physical-prototyping/product-design match in this whole
  sweep — 3D printing, laser cutting, industrial design process, real user testing, all
  named growth areas. Genuinely new audience for her (motor/dexterity disability, distinct
  from the colorblind and D/HH ideas already logged below).
- **Rating:** ★★★★☆ pride/passion · ★★★★☆ real need · ★★★★★ new technical depth
  (full industrial-design process) · ★★★★☆ user research potential.
- **Honest caveat:** crowded at the single-gadget level — the "coordinated system for one
  real task" framing is what keeps this from reading as "yet another jar opener."

---

### 3. Real-time, in-the-moment accommodation cueing for general-ed teachers (teachers/educators)
**How might we** help a general-ed teacher juggling 5–6 different students' IEP/504
accommodations across different periods actually *remember, in the moment*, which
accommodation applies to which student for which activity — without more paperwork?

- **What exists:** a wave of AI tools for *writing* IEPs/BIPs and cutting documentation
  time ([35+ tools cataloged by aiteacheasy.com](https://aiteacheasy.com/ai-tools-for-special-education-teachers/),
  [IEPfocus.com](https://iepfocus.com/iep-planner-2026-2027/)), plus static one-page
  trackers/checklists sold on Etsy/TPT and [theintentionaliep.com](https://www.theintentionaliep.com/tracking-accommodations/).
- **The gap:** everything found solves documentation (after the fact) or hands the
  teacher a checklist they still have to remember to check. Nothing pushes a quiet,
  contextual reminder — synced to the real class schedule and tagged to activity type
  (quiz vs. reading vs. group work) — right before the moment it matters.
- **Demand signal:** [special ed teachers spend 5–10 hrs/week on IEP paperwork, and 68%
  cite paperwork as a primary burnout driver](https://www.lernico.ai/blog/teacher-burnout-statistics) —
  but that's documentation burden, not moment-to-moment recall specifically. This is the
  weakest-validated demand signal in the set; worth a few real teacher conversations
  before trusting it's a felt daily pain and not just a logical gap.
- **One-semester MVP:** a lightweight app — enter each student's accommodations once per
  term, tag them to activity types, get a glanceable notification just before each class
  period listing only what's relevant that day.
- **Fit for her:** real product/software work at the intersection of education and
  accessibility, both domains she likes. Needs deliberate outreach to real teachers for
  testing — not a built-in population for her the way a gym or dorm would be.
- **Rating:** ★★★☆☆ pride/passion · ★★★☆☆ real need (inferred, unvalidated) ·
  ★★★☆☆ new technical depth · ★★★☆☆ user research potential (needs outreach).

---

### 4. Plain-language, multilingual aftercare instructions (healthcare patients + immigrants/ESL)
**How might we** combine two separately well-documented gaps — patients don't
understand discharge instructions, and 25M Americans have limited English proficiency —
into one problem: help *any* patient leaving a clinic genuinely understand what to do
next, regardless of reading level or first language?

- **What exists:** [Care to Translate](https://www.caretotranslate.com/news/break-language-barriers-in-u-s-health-care-with-a-medical-translation-app)
  offers audio + images for healthcare communication; [CirrusMD](https://www.cirrusmd.com/real-time-language-translation-for-virtual-healthcare)
  does real-time Spanish-English chat translation in virtual visits; researchers have
  used [machine learning to rewrite discharge instructions to a lower reading level](https://www.medrxiv.org/content/10.1101/2023.06.18.23291568.full.pdf).
  ACA Section 1557 legally requires language access for federally-funded providers.
- **The gap:** every solution addresses EITHER the reading-level problem OR the language
  problem, and mostly at the live-appointment moment. Nothing combines both AND targets
  the multi-day take-home window — when a patient has to actually follow medication
  timing, wound care, and red-flag symptoms alone, in their own language, at their own
  reading level.
- **Demand signal:** the best-quantified problem in this whole sweep — [patients recall
  only 10–15% of discharge instruction content](https://zaggocare.org/majority-of-patients-dont-understand-discharge-instructions/);
  [only 12% of adults over 65 have adequate health literacy](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7580442/);
  discharge instructions are written at a ~10th-grade level against AMA's recommended
  6th-grade; and 25M Americans have limited English proficiency.
- **One-semester MVP:** scope to ONE care setting (urgent care/ER) and one language pair
  (Spanish is the obvious first target) — an LLM-based pipeline that turns a clinician's
  normal discharge note into a plain-language, icon-supported, audio-narrated aftercare
  card, plus scheduled SMS check-ins.
- **Fit for her:** strong LLM/AI application — real, current technical depth — plus a
  genuinely meaningful problem at the intersection of healthcare and language access,
  two domains adjacent to her named "biomedical" and "accessibility" interests.
- **Rating:** ★★★★☆ pride/passion · ★★★★★ real need · ★★★★☆ new technical depth
  (LLM-based simplification + translation) · ★★★☆☆ user research potential.
- **Honest caveat:** real patient data makes testing sensitive — she'd need synthetic or
  de-identified discharge notes rather than real records, and landing an actual clinic
  partner in one semester is a real lift. Worth a scope conversation with her advisor
  early (possible IRB-adjacent concerns even for a demo).

---

### 5. Care-team coordination hub for parents of neurodivergent kids (parents/caregivers)
**How might we** help a parent juggling multiple providers — school, OT, speech
therapist, behavioral therapist, pediatrician — for one neurodivergent child keep
everyone on the same page, without becoming their own full-time care coordinator?

- **What exists:** sibling-coordination apps for aging-parent care (CareSplit, CircleCare,
  Caring Village) are all built for a *different* situation (multiple adult children,
  one aging parent). IEP-focused resources ([Undivided.io](https://undivided.io/resources/school-supports-and-iep-504-accommodations-for-autism-1340))
  explain the IEP-team concept and offer paid human advocacy services.
- **The gap:** research directly describes parents becoming "amateur therapists and care
  navigators," with real fragmentation between providers — but no dedicated app for
  *this* coordination problem turned up; only expensive human advocacy or generic
  elder-care tools that don't fit.
- **Demand signal:** the pain is clearly described in multiple sources, but I found no
  hard usage/market number — a real risk is that families already solve this with a
  shared Google Doc or group text and don't feel they need new software. Worth a few
  real parent interviews before committing.
- **One-semester MVP:** a shared timeline (which provider said what, when, follow-up
  actions), a shared appointment calendar, and a "here's my kid's history" summary
  generator so parents stop re-explaining everything to each new specialist.
- **Fit for her:** real product/UX + light AI (auto-summarization) work; meaningful
  problem; she'd need to find real parents of neurodivergent kids to test with (possible
  via CU Boulder's education/disability programs, but not a built-in population).
- **Rating:** ★★★☆☆ pride/passion · ★★★★☆ real need (needs validation) ·
  ★★★☆☆ new technical depth · ★★★☆☆ user research potential.

---

### 6. Tenant-side maintenance documentation + legal-deadline escalation tool (renters)
**How might we** help a renter build a real paper trail and know their actual legal
rights when a landlord is slow on repairs — without needing the landlord to adopt
anything?

- **What exists:** RentRedi, Avail, Home365, and Oxmaint are all real, all
  **landlord-facing** property-management software sold to property managers/owners.
  Legal research confirms most states set real deadlines — [24hr response + 72hr
  resolution for emergencies (no water, gas leak, electrical hazard), 24–48hr for
  priority issues, 5–7 business days for routine repairs](https://oxmaint.com/industries/property-management/track-reduce-property-maintenance-response-times-2026) —
  and CA/NY/TX/IL let tenants withhold rent or terminate a lease if those deadlines are
  blown.
- **The gap:** every tool I found requires the landlord's participation or license.
  Nothing is consumer-facing — something a tenant runs on their own, regardless of
  landlord cooperation, that timestamps requests, auto-calculates the legal deadline for
  their state/issue type, and builds a paper trail usable for a demand letter or
  small-claims filing.
- **Demand signal:** real and well-documented — "slow maintenance response is the top
  tenant complaint," with a clear escalation pattern (call → complaint → negative
  review) when nothing happens.
- **One-semester MVP:** scope to Colorado law specifically — log a request with photos
  and date, show "your landlord has until [date] under Colorado law," track status,
  auto-generate a formatted escalation letter if the deadline passes.
- **Fit for her:** real product + legal-rules-encoding work, personally relevant (she's a
  renter — immediate access to test with her own roommates/building), and a clean
  example of the brief's "improve an existing solution" path: same category as landlord
  SaaS, but flipped to serve the other side of the relationship.
- **Rating:** ★★★☆☆ pride/passion · ★★★★☆ real need · ★★★☆☆ new technical depth ·
  ★★★★★ user research potential (herself + her building, immediate).
- **Honest caveat:** the least technically novel idea in this batch — it's a clever
  reposition of an existing category more than new tech, so it leans on priority #2
  (real problem) harder than #3 (deep new skill) unless she adds something like OCR on
  lease documents to auto-detect applicable rules.

---

### 7. Wheelchair-accessible transit reliability crowdsourcing for smaller/college-town transit systems (commuters + disability)
**How might we** help wheelchair/mobility-device users in a smaller city or college town
know, in real time, whether the accessible features they depend on (bus lifts, station
elevators) are actually working today?

- **What exists:** in NYC specifically, this is well-served — [Transit Access](https://www.transitaccess.org/)
  runs a live subway-elevator-outage map, [Rampd](https://rampdapp.com/) helps riders
  route around the fact that only 117 of 472 NYC subway stations are fully accessible,
  and the MTA now sends real-time outage alerts after [a disability-advocate lawsuit
  settlement](https://www.amny.com/nyc-transit/mta-and-disability-groups-elevator-accessibility/).
  General apps (Google Maps, Citymapper, Transit) support "wheelchair accessible" route
  toggles broadly.
- **The gap:** all of that investment is concentrated in NYC's uniquely large
  accessibility backlog. I found no equivalent — official or crowdsourced — for smaller
  transit systems like a college town's own bus network, where general apps' accessible
  route data can lag real-world outages with nothing to catch it.
- **Demand signal:** weak/unconfirmed — I found no direct complaints specific to
  smaller-city bus-lift reliability. This reads closer to an assumed gap than a
  validated one; worth checking with real local wheelchair users (campus disability
  services is a natural first call) before investing further.
- **One-semester MVP:** scoped to her own city's transit system — a simple crowdsourced
  "is the lift/ramp on this route working" reporting tool, viewable before a trip.
- **Fit for her:** real UX/product work, meaningful, but likely to read as "solid, not
  deep" unless she adds something like a reliability-prediction layer.
- **Rating:** ★★★☆☆ pride/passion · ★★★☆☆ real need (unvalidated) ·
  ★★★☆☆ new technical depth · ★★★☆☆ user research potential (needs real outreach).
- **Honest caveat:** structurally this is a smaller cousin of the first hunt's
  "community laundry" idea (#6 in that list) — same "crowdsourced status for a service
  smaller places don't invest in" shape, just applied to transit. Worth knowing if she's
  drawn to both, since building both would feel repetitive.

---

### 8. Plain-language back-office paperwork translator for immigrant-owned small businesses (small-business owners / immigrants)
**How might we** help an immigrant small-business owner who speaks conversational
English actually understand the legal/financial documents behind running their
business — leases, licenses, tax forms, loan agreements — not just talk to customers?

- **What exists:** a real wave of multilingual **customer-facing** tools — Insighto AI,
  Cytranet's XBert, Freshworks, Pylon, Helpshift — all solve talking to customers in
  Spanish/other languages via chat, voice, or phone. Separately, immigrant-entrepreneurship
  research (MIRA Coalition, Small Business Majority, NCRC) names language barriers around
  "legal, tax, banking, insurance, and licensing terms" as a documented, distinct pain
  point from customer support.
- **The gap:** the entire tooling market I found solves the customer-facing side.
  Nothing addresses the back-office side — understanding what you're actually signing,
  or what a compliance letter means. Same "plain-language translation" technical core
  as opportunity #4, aimed at a completely different audience and document type.
- **Demand signal:** real and named in policy research, but no hard number on how many
  owners want a *tool* for this versus relying on a bilingual friend or lawyer — worth
  real interviews with local immigrant business owners (Boulder/Denver has a real
  community) before committing.
- **One-semester MVP:** upload or photograph a document (lease, license renewal, tax
  letter), get a plain-language translation plus a short "here's what to do and by when"
  summary — scoped to one document type and one language pair to start.
- **Fit for her:** strong LLM application (translation + summarization + document
  understanding), meaningful — but note this shares a technical core with #4, so if
  she's drawn to that underlying tech, she'd want to pick ONE audience, not both.
- **Rating:** ★★★☆☆ pride/passion · ★★★★☆ real need · ★★★★☆ new technical depth ·
  ★★★☆☆ user research potential (no obvious inroad to this community yet).

---

### 9. Proactive breath/stress biofeedback for classroom self-regulation (K-12 kids with sensory needs)
**How might we** help a K-12 student with sensory-processing or self-regulation needs
get support *before* they're already dysregulated — not just hand them a static fidget
tool and hope?

- **What exists:** extensive, well-documented passive sensory tools — fidget balls,
  tangle toys, "Classroom Break Boxes," movement breaks (wall push-ups, heavy carries) —
  all genuinely helpful but entirely reactive; a kid or teacher has to already notice a
  need. The only hit for real-time physiological detection was a single patent
  describing AI biofeedback that flags rising heart rate/breathing and prompts a break —
  not a real, shipped classroom product.
- **The gap:** everything on the market waits for a person to notice dysregulation.
  Nothing found closes the loop with a real physiological signal that catches the
  rising-stress moment *before* a meltdown — the exact idea her own
  [[idea-body-awareness]] already explores for herself, unbuilt for a K-12 classroom
  audience.
- **Demand signal:** the size of the existing fidget/sensory-tool market is itself a
  signal for the category, but the specific proactive/biofeedback layer is unvalidated —
  treat this as a promising research-backed extension, not confirmed classroom demand,
  until she talks to a real special-ed teacher or school OT.
- **One-semester MVP:** a single wearable/clip breath-rate sensor (reusing the exact
  research direction from [[idea-body-awareness]]) worn by one student, giving a
  private haptic cue plus a simple prompt for a specific regulation technique — tested
  with a willing after-school program or a family friend's kid rather than a full
  classroom.
- **Fit for her:** the sharpest "improve/extend an idea she already has" option in this
  sweep — same sensor + real-time-feedback technical core as [[idea-body-awareness]],
  redirected at a real external audience, which is genuine growth (designing for someone
  else's needs, not her own experience).
- **Rating:** ★★★★☆ pride/passion (personally resonant technique, now serving someone
  else) · ★★★☆☆ real need (plausible, needs real validation) · ★★★★☆ new technical
  depth (same sensor+biofeedback depth as her existing idea) · ★★★☆☆ user research
  potential.
- **Honest caveat:** real access to K-12 kids for testing (parental consent, school
  policy) is a genuine hurdle for a solo semester project — she'd likely need adult
  stand-ins or a family friend's kid rather than an actual classroom, and should scope
  expectations accordingly.

---

### 10. Hyperlocal, semester-long peer-to-peer dorm/apartment give-take board (college students / sustainability)
**How might we** cut down on the college move-out "furniture graveyard" — not just
during the one chaotic week everyone leaves, but all semester, when a couch or
mini-fridge could go straight to another student instead of the curb?

- **What exists:** this is a real, institutionally-invested-in problem — [US colleges
  generate 230+ tons of move-out waste each May](https://dropcurb.com/blog/college-move-out-waste-report),
  Berkeley's student paper has documented literal "furniture graveyards," and formal
  donation programs exist at University of Michigan (16.5 tons collected), University of
  Iowa (partnered with Goodwill), and UGA ("Dawgs Ditch the Dumpster"). [ReSupply](https://resupplyapp.com/college-move-out-donation-pickup/)
  is a real company running paid donation-pickup logistics near many major campuses.
- **The gap:** every solution operates at the institutional, end-of-semester level — a
  big organized event or a paid pickup service — not a free, peer-to-peer, mid-semester
  option for the far more common moment of "I'm getting rid of this chair right now,
  does anyone in my building want it before the curb." Same "make an institutional
  solution peer-to-peer and always-on" shape as opportunity #6 and the first hunt's
  community-laundry idea.
- **Demand signal:** strong at the aggregate/institutional level (real tonnage numbers),
  but I found no data on whether students specifically want a *peer-to-peer* tool versus
  existing donation events — worth checking directly whether CU Boulder already runs a
  ReSupply-style program, since her tool would need to clearly do something that doesn't.
- **One-semester MVP:** a simple hyperlocal give/take board scoped to her own
  building/dorm cluster — post a photo, item disappears once claimed, optional
  pickup-window scheduling. Deliberately not a general marketplace.
- **Fit for her:** real product/UX work, ties to sustainability and community-building
  (both named interests), immediate built-in user-research population (her own building
  and friend group).
- **Rating:** ★★★☆☆ pride/passion · ★★★★☆ real need (strong in aggregate) ·
  ★★☆☆☆ new technical depth (straightforward unless she adds real cleverness) ·
  ★★★★★ user research potential.
- **Honest caveat:** Buy Nothing groups and Facebook Marketplace already do the informal,
  free, peer-to-peer version broadly — she'd need her tool to be meaningfully more
  frictionless and dorm-specific (zero sign-up, walk down the hall, pickup windows) to
  avoid reading as "a worse Buy Nothing group." Also the weakest on technical depth here
  unless she adds a real feature beyond a basic listing board.

---

## Ranked top tier & honest recommendation (this sweep)

**My top 4 from this batch, ranked:**

1. **[[#2. Adaptive one-handed / low-dexterity kitchen tool system (people with disabilities — motor/dexterity)]]** —
   best overall: real, validated gap; the strongest physical-prototyping/industrial-design
   fit in the whole sweep; a genuinely new audience for her; realistic path to real
   testers via campus disability services.
2. **[[#4. Plain-language, multilingual aftercare instructions (healthcare patients + immigrants/ESL)]]** —
   the single best-quantified real need across both sweeps, and a strong, current
   LLM-based technical build. The honest risk is testing access (sensitive data, needs a
   clinic-adjacent partner or synthetic data).
3. **[[#9. Proactive breath/stress biofeedback for classroom self-regulation (K-12 kids with sensory needs)]]** —
   the most interesting "improve/extend her own idea" option: same sensor+biofeedback
   core as [[idea-body-awareness]], redirected to design for someone else's needs
   instead of her own — real growth, if she can find real access to test with kids.
4. **[[#6. Tenant-side maintenance documentation + legal-deadline escalation tool (renters)]]** —
   least technically novel of the top four, but the most practically doable this
   semester with the best built-in user-research access (her own building).

**Honorable mentions:** #1 (family scam-defense coordinator) is a real, well-quantified
problem with an easy testing population, just thinner on technical depth. #10 (dorm
give-take board) and #5 (neurodivergent care-team hub) are both real but need a sharper
differentiation story before committing.

**Needs more validation before trusting:** #3 (teacher accommodation cueing), #7
(smaller-city transit accessibility), and #8 (immigrant small-business paperwork) all
rest on inferred rather than directly confirmed demand — worth a few real conversations
with people in those audiences before investing real build time.

**What I'd actually tell her to do:** #2 and #4 are the two I'd push hardest from this
sweep — they're the most novel audiences for her, the best-validated, and hit real
technical growth. #9 is the one I'd personally get most excited about if she wants to
build on research she's already done for herself rather than start a new domain from
scratch. None of these should be read as "better than" her first-hunt top picks
(the behavior-insight system or the colorblind wearable) — they're genuinely different
territory, not a replacement ranking. Whichever one she reads and immediately starts
picturing herself building is the one worth a few real user conversations before
deciding.

Linked: [[senior-capstone]], [[capstone-goals]], [[capstone-skills]],
[[capstone-opportunity-hunt]], [[capstone-research-log]], [[idea-body-awareness]],
[[idea-drying-rack]], [[idea-speaker-bridge]], [[idea-fitness-clarity]],
[[idea-closet-organizer]]

---

## 2026-09-16 — first wide hunt

Rated against [[capstone-goals]]: pride/passion/meaning is the #1 filter, then
real/validated need, user-research potential, new technical depth, and polish.
Physical and non-physical ideas judged equally.

---

### 1. The "why did today go the way it went" behavior-insight system
**How might we** help someone understand the *pattern* behind why their intentions
and their actual days diverge — not another planner or blocker, but a retrospective
mirror?

- **What exists:** Lockin, Forest, RescueTime, Rize — all either block distractions
  or gamify accountability *in the moment*. [Lockin specifically](https://lockinapp.org/glossary/intention-action-gap)
  is built almost entirely around the intention-action gap, with focus timers, photo-proof
  task completion, and social leaderboards.
- **The gap:** every existing product intervenes *before or during* the moment of
  action (block the phone, start a timer, shame you into it). None of them help you
  look *backward* and actually understand why some days work and others don't. The
  research is rich here — [six distinct failure mechanisms](https://lockinapp.org/glossary/intention-action-gap)
  (forecast failure, cue failure, start friction, goal competition, motivational
  revision, execution breakdown) have been named in the literature, but no consumer
  product surfaces *which* mechanism is actually sabotaging a given person's days.
- **Demand signal:** real, but indirect — it's the volume and diversity of existing
  "solve procrastination" apps that signals unmet need, since none of them report
  people feeling like the *why* is answered, just the *what to do about it*.
- **One-semester MVP:** a lightweight daily log (a few taps, not a burdensome
  journal) + calendar/screen-time data, feeding a simple pattern-classifier (doesn't
  need to be fancy ML — rule-based tagging against the six failure modes would already
  be novel) that surfaces a weekly "here's what actually got in your way" reflection.
- **Fit for her:** software-only, very buildable. Big growth area: she'd be doing
  real behavioral-data design and possibly light ML/pattern-detection — genuinely new
  technical depth. Directly personal — she's explicitly working on
  [[procrastination]] and [[nervous-system-regulation]], "more control of her
  conscious mind." This is close to building the tool she wishes existed for herself.
- **Rating:** ★★★★★ pride/passion (deeply personal, "I get to build this for me"
  energy) · ★★★★☆ real need (validated mechanism research, thin on direct demand
  quotes) · ★★★★★ new technical depth (behavioral data + pattern modeling) ·
  ★★★★☆ user research potential (she IS the first user, plus easy to recruit
  classmates) · genuinely fresh — doesn't overlap her existing five.

---

### 2. Color-to-sense translation wearable (accessibility, anchored in colorblindness)
**How might we** give colorblind (or low-vision) people continuous, hands-free
awareness of color — matching an outfit, checking if fruit is ripe, reading a status
light — without having to pull out a phone and scan each item?

- **What exists:** the *software* version is already solved and even a little
  crowded — [WearWithAll](https://apps.apple.com/gh/app/wearwithall/id6759841320)
  scans clothes with your phone camera and gives an instant Match/Neutral/Clash
  verdict; Color Blind Pal, Color Butler, and Vanity all do phone-camera color ID
  and outfit logic.
- **The gap:** every single one of these requires pulling out a phone and actively
  scanning. Nobody's shipped the *passive, ambient, wearable* version — something
  worn (a pin, a ring, a clip) that continuously reads color in your environment and
  translates it to sound or haptic feedback in real time, the way a hearing aid
  works passively instead of requiring you to hold up a microphone.
- **Demand signal:** real and easy to access — ~8% of men and 0.5% of women have
  some form of color vision deficiency, a large, well-documented, easy-to-recruit
  population for user testing.
- **One-semester MVP:** scope to ONE use case (outfit-matching, since that's
  concrete and testable) with a color sensor + haptic or bone-conduction audio
  output, worn as a clip or wristband. Not solving "all of color vision," just
  "can I tell if this shirt and these pants clash without looking it up."
- **Fit for her:** this is the sharpest version of the "cross-sensory translation"
  direction already flagged as promising. Hits physical prototyping + electronics/
  sensors + wearables — all named growth areas — plus real UX/software. Sits at the
  intersection of fashion and accessibility, two domains she likes, with an easy,
  real user-research population.
- **Rating:** ★★★★☆ pride/passion (novel hardware+software combo, genuinely cool
  demo for Expo) · ★★★★★ real need (large population, existing products all share
  the same unsolved "have to actively scan" limitation) · ★★★★★ new technical
  depth (sensor + haptic + wearable industrial design, all named growth skills) ·
  ★★★★★ user research potential · strong physical-prototyping bonus without being
  required.

---

### 3. Private, on-device cycle/mood/performance correlation engine
**How might we** help someone understand what's actually driving how they feel
day-to-day (energy, mood, workout performance, sleep) — tied to their cycle where
relevant — without handing that data to a company that might sell or leak it?

- **What exists:** Flo (40M+ monthly users) and Clue (11M) dominate the category.
  But Flo has a real, citable privacy scandal — a [$59.5M settlement over sharing
  data with Meta from 2016–2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC12131320/),
  and even now scores only 7/10 in Mozilla's 2026 privacy review. On the insight
  side, [Clue's symptom tracking is "broad but shallow"](https://bearable.app/the-best-period-tracker-apps-of-2026/) —
  no real cross-factor correlation (e.g., "your bad sleep this week correlates with
  X"). Bearable does some cross-factor correlation but isn't cycle-specific and sits
  behind a subscription wall.
- **The gap:** a tool that's genuinely private-by-design (on-device, not
  cloud-synced by default) AND actually does the correlation work — connecting
  cycle phase + sleep + stress + workout performance to help someone understand
  *why* they feel the way they do, instead of just logging symptoms into a void.
  39.6% of period-app users have switched or quit apps, mostly citing inconsistency
  or inaccurate insights — a real, quantified dissatisfaction signal.
- **Demand signal:** strong and well-documented — huge existing user base already
  proves willingness to track, paired with clear public data showing they're
  dissatisfied with both privacy and depth of insight.
- **One-semester MVP:** narrow scope — pick 2-3 correlated factors (e.g., cycle
  phase + workout performance + sleep) rather than "track everything." On-device
  storage only (no backend needed for MVP, which also simplifies the build).
- **Fit for her:** ties directly to [[nervous-system-regulation]] and body-awareness
  interests, but is a data-science/software angle rather than real-time hardware —
  a genuinely different technical skill than [[idea-body-awareness]]'s breath
  sensor, so it doesn't compete with that idea, it complements it. Also touches her
  privacy/security domain interest in a real way (the Flo scandal gives her a
  concrete "here's the problem with the status quo" narrative for Expo).
- **Rating:** ★★★★☆ pride/passion (personally relevant, though worth being honest
  this is a more personal/sensitive topic to present publicly — see caveat below) ·
  ★★★★★ real need (massive user base, documented dissatisfaction + privacy
  scandal) · ★★★★☆ new technical depth (data correlation/light ML, privacy-by-design
  architecture) · ★★★★☆ user research potential (need to find willing
  participants for a sensitive-data study — doable but requires care).
- **Honest caveat:** this only works if she's genuinely comfortable presenting a
  menstrual-health project at Expo and to reviewers/recruiters — that's a real
  values question only she can answer, not a technical one.

---

### 4. Real-time haptic lift-form coach (no screen required)
**How might we** give lifters real-time form correction *during* the rep — without
requiring them to prop up a phone and stare at a screen while they lift, or feel
watched/filmed in a public gym?

- **What exists:** this space is genuinely crowded in 2026 — [Form Fix](https://apps.apple.com/us/app/form-fix-ai-form-check-coach/id6745452870),
  [CueForm AI](https://cueform.ai/posts/5-best-apps-for-analyzing-weightlifting-form),
  [OptiLiftAI](https://optiliftai.com/), and [Gymscore](https://www.gymscore.ai/) all
  use computer vision (MediaPipe/TensorFlow pose estimation) to analyze lifts, with
  [claimed 95%+ accuracy on joint angle/bar path tracking](https://kensoforge.com/insights/ai-form-checker-computer-vision-lifting-apps-2026).
- **The gap:** every one of these is *visual* — you film yourself (or prop up a
  phone), then look at a screen for feedback, either live or after the set. None
  give feedback through a channel you can use *while actually lifting*, hands full,
  eyes on the bar — and none solve the real social friction of filming yourself
  mid-set in a crowded public gym.
- **Demand signal:** the sheer number of competing apps IS the demand signal — this
  is clearly something people want — but it also means differentiation is the hard
  part, not proving the need.
- **One-semester MVP:** wearable IMU sensor(s) (wrist/waist) instead of camera,
  giving haptic buzzes for specific, narrow error patterns (e.g., bar path drift,
  asymmetry) on ONE lift (squat or deadlift), tested with real lifters at her gym.
- **Fit for her:** directly personal — she lifts. Strong growth match: sensors/
  electronics, physical computing, wearables — all named growth skills — plus real
  user testing access (her own gym community).
- **Rating:** ★★★★☆ pride/passion (personal, tangible, satisfying to demo) ·
  ★★★☆☆ real need (real but the market is already answering it, just not this
  exact way — she'd need to hold the "no-screen, no-camera" angle hard) ·
  ★★★★☆ new technical depth (IMU sensor fusion is a real, meaty problem) ·
  ★★★★★ user research potential.
- **Honest caveat:** the most crowded field on this list. Worth pressure-testing
  early whether the haptic/no-camera angle is different enough to not read as "yet
  another lift-form app" at Expo, where four competitors already exist.

---

### 5. Untaggable-object tracker (thin, washable, flexible, low/no-battery)
**How might we** let people track the things AirTags fundamentally can't — items too
thin, too flexible, too often washed, or too small to carry a battery and a speaker?

- **What exists:** AirTags and their many clones (UGREEN, Chipolo, generic "air
  trackers") now come in thinner, more waterproof formats — some [Find My cards are
  1.7mm thick with IP68 waterproofing](https://us.ugreen.com/blogs/smart-finder/best-airtag-alternatives-iphone-android),
  and flexible silicone loop mounts exist for luggage-type items.
- **The gap:** every option still needs a battery (coin cell, replaceable or
  rechargeable) — nothing genuinely battery-free exists at consumer scale. That's
  the real unsolved edge: think a washable fabric tag sewn into clothing, or a
  truly flexible tag for something like a scarf, a swimsuit, or a stuffed animal
  that goes through the wash repeatedly.
- **Demand signal:** weak/indirect — I could not find people actively complaining
  about this online (the search came back thin); it reads more like an assumed gap
  than a validated one. Worth a quick round of real user interviews before
  committing.
- **One-semester MVP:** a fully battery-free, passive tracker (backscatter/RFID-style)
  is genuinely research-lab-hard for one semester — realistic scope is closer to "the
  thinnest, most durably washable *battery* tracker," which is more an industrial-
  design/PCB-miniaturization problem than a breakthrough.
- **Fit for her:** electronics, physical prototyping, product design — all named
  skills/growth areas.
- **Rating:** ★★★☆☆ pride/passion · ★★☆☆☆ real need (unvalidated, assumed) ·
  ★★★★☆ new technical depth (if she takes on the harder RF/battery-free framing) ·
  ★★★☆☆ user research potential.
- **Honest caveat:** the "no battery" framing that makes this exciting is probably
  too hard to actually deliver in a semester; the deliverable version is less novel
  than it first sounds. I'd validate real demand with a few interviews before
  investing more here.

---

### 6. Community laundry availability — for buildings with NO official smart system
**How might we** show people which washers/dryers are free in buildings that will
never get official smart-laundry infrastructure — most off-campus college rentals —
without needing the landlord's buy-in or per-machine hardware installs?

- **What exists:** this is a well-trodden category — vibration-sensor + Raspberry Pi
  builds are a known pattern (there's a [UIUC ECE445 class project](https://courses.grainger.illinois.edu/ece445/getfile.asp?id=16740)
  doing almost exactly this), and commercial vendors (Automatic Laundry, Coinamatic)
  sell full building-level systems to property managers.
- **The gap:** every existing solution — DIY or commercial — assumes you can
  install a sensor on/near each machine, which means either owning the building or
  getting a landlord's cooperation. Most college rentals (like the kind she lives
  in) will never get that. The unsolved version is a *zero-install-cooperation*
  model — e.g., crowdsourced status reports from residents (a 5-second "free/busy"
  tap when you walk by) rather than hardware per machine.
- **Demand signal:** real and personal — this is a genuine daily annoyance in
  shared/rental housing, though I didn't find people ranting about it publicly
  (it's an accepted inconvenience, not a loud complaint).
- **One-semester MVP:** a simple crowdsourced app for her own building/complex —
  residents report status, the app predicts likely availability from patterns
  (day/time) even between reports. No hardware required, which makes it very
  buildable, if less hardware-growth-y.
- **Fit for her:** personally relevant (she lives in a shared apartment near
  campus), good for product thinking and UX, real potential for a genuine
  user-research loop (her own roommates/building as a pilot group) — though lighter
  on physical prototyping than some other options here.
- **Rating:** ★★★☆☆ pride/passion (relatable but modest "wow" factor without a
  hardware component) · ★★★★☆ real need (personal, real, if quiet) ·
  ★★★☆☆ new technical depth (mostly software/product, unless she adds a
  computer-vision angle, e.g. classifying machine status from a shared photo) ·
  ★★★★☆ user research potential (immediate access to a real pilot group in her own
  building).
- **Honest caveat:** the hardware-sensor version of this idea is well-worn
  hackathon territory — it only stays fresh if she commits to the
  no-landlord-buy-in, crowdsourced angle rather than defaulting to "sensor on every
  machine."

---

### 7. Personal "true size" cross-brand fit memory
**How might we** help someone know their real size in a brand they've never bought
from before — without another round of buy-three-sizes-return-two?

- **What exists:** this is a *huge*, well-funded space — True Fit, Fit Analytics
  (acquired by Snap), Bold Metrics, Size Stream, and AI-native entrants like
  [aifitfinderapp.com](https://aifitfinderapp.com/blog/e-commerce/clothing-size-inconsistency-ecommerce-affects/)
  and [sixfit.ai](https://sixfit.ai/blog/why-size-charts-fail) all sell body-fit
  prediction to retailers.
- **The demand signal is enormous and well-quantified:** 88% of consumers are
  frustrated by sizing inconsistency; fashion e-commerce return rates run
  30-40% overall (50-55% for dresses); a PRIME AI study found 67% of returns are
  fit-driven; and 71% of shoppers check the size chart and still get it wrong.
- **The gap:** all the funded players sell to retailers/enterprises, and lean on
  heavy body-scanning tech. There's real room for a *personal, consumer-side* tool
  — no account with a retailer needed, no professional body scan — that just
  remembers "this pair of jeans fit you," cross-references community-sourced true-
  to-size data, and tells you before you buy from a brand you've never tried.
- **One-semester MVP:** scoped to ONE category (jeans, or one type of top) and a
  small community (her friend group / dorm), not "solve sizing for all of fashion."
- **Fit for her:** UX/product thinking, possibly some lightweight ML on
  crowdsourced fit data — good technical growth without needing hardware.
- **Rating:** ★★★☆☆ pride/passion · ★★★★★ real need (best-quantified problem on
  this whole list) · ★★★☆☆ new technical depth (real but she'd be competing
  conceptually with funded startups doing the hard version) · ★★★☆☆ user research
  potential.
- **Honest caveat:** the problem is real and huge, but the well-funded, enterprise-
  facing competition makes this risky to pursue without an unusually sharp, narrow,
  personal angle (like a friend-group or secondhand/thrift-specific tool) that
  doesn't try to out-build companies with real engineering teams.

---

### 8. Personalized ambient sound recognition for Deaf/hard-of-hearing users
**How might we** help D/HH people get alerted to the *specific* sounds that matter
in their own home (their baby, their doorbell, their smoke alarm) — not just that
"a sound happened"?

- **What exists:** traditional alerting devices (bed shakers, flashing-light
  doorbell signalers) just detect that *a* sound occurred, not what it is. Native OS
  features exist (Apple Sound Recognition, Android Sound Notifications) but are
  basic/generic. [Earzz](https://www.earzz.com/deaf) is a small AI-powered startup
  doing real sound *identification* (doorbell vs. knock vs. alarm) and alerting to
  phone/tablet/smartwatch — the clearest sign the "identify, don't just detect" gap
  is real and being actively worked on, but not yet solved at consumer scale or
  personalized to an individual home's specific sounds.
- **The gap:** personalization — training a system on someone's *actual* doorbell,
  *actual* baby's cry, *actual* smoke alarm, rather than generic sound classes.
- **Demand signal:** real, documented need in the D/HH community; Earzz's existence
  as a funded product is itself a demand signal.
- **One-semester MVP:** a phone-based app using on-device audio ML that a user
  trains on 2-3 of their own key sounds, alerting via phone/watch vibration.
- **Fit for her:** real technical depth (on-device audio ML, personalization),
  accessibility is a domain she likes.
- **Rating:** ★★★☆☆ pride/passion · ★★★★☆ real need · ★★★★☆ new technical depth ·
  ★★☆☆☆ user research potential *for her specifically*.
- **Honest caveat:** the weakest personal-connection fit on this list — nothing in
  what I know about her ties her to the D/HH community, so recruiting real users to
  test with would take real outreach effort. Worth asking her directly whether she
  has an access point here (a friend, a class connection) before ranking this
  higher.

---

## Considered and set aside (honest passes)

A few domains produced ideas that are real but too crowded or already well-solved
to be worth developing further:

- **Wind-resistant umbrella redesign** — the "everyday ugh" instinct is right, but
  the market has already answered it well: [Senz°](https://ca.trustpilot.com/review/www.senz.com)
  (aerodynamic, storm-tested), Blunt (lifetime guarantee), and GustBuster (survives
  50+ mph in Consumer Reports testing) are all mature, well-reviewed products. Not a
  gap, just a category with good options already.
- **Food waste / pantry expiration tracking** — genuinely crowded: PantryWise,
  NoWaste, FoodShiner, My Pantry (an actual published student research app) all do
  this already, several specifically validated with college students.
- **Clothing swap for friend groups** — already built, more than once, by college
  students specifically: [Besties Closet](https://bestiescloset.app/) and
  [Coclo](https://www.coclo.app/) (built by UChicago students, live at UChicago and
  NYU) do almost exactly this.
- **Shared-fridge food ownership** — real friction, but the existing "fix" (name +
  date on tape, a shared spreadsheet) is low-tech and already works well enough that
  there isn't much room for a semester-long build to meaningfully improve on it.
- **Package/mail management for apartments** — real problem, but the real solutions
  (smart lockers) are institutional-scale hardware deployments requiring building
  ownership buy-in — not a tractable solo capstone build.
- **Digital privacy "what do my apps know about me" dashboard** — already built
  natively into both iOS (Privacy & Security) and Android (Permissions Manager) —
  the OS vendors got here first.

---

## Ranked top tier & honest recommendation

**My top 4, ranked:**

1. **[[#1. The "why did today go the way it went" behavior-insight system]]** —
   the freshest, most personal idea on this list. Nothing else here is this close
   to something she's already actively working on for herself. Real technical
   depth without needing hardware, and genuinely open competitive space.
2. **[[#2. Color-to-sense translation wearable (accessibility, anchored in colorblindness)]]** —
   best combination of hardware growth + real, easy-to-access user research +
   genuine novelty (nobody's shipped the passive/ambient version) + sits at the
   fashion/accessibility intersection she likes.
3. **[[#3. Private, on-device cycle/mood/performance correlation engine]]** —
   the best-validated real-need story on the list (huge user base, documented
   dissatisfaction, a citable privacy scandal to build against) — contingent on
   whether she's genuinely comfortable presenting it publicly.
4. **[[#4. Real-time haptic lift-form coach (no screen required)]]** — personal
   and technically rich, but the most crowded field here; only worth chasing if
   she commits hard to the no-screen/no-camera differentiator from day one.

**Honorable mention:** #6 (community laundry) is close behind #4 — it's real and
personal, just needs the no-landlord-buy-in hook to avoid feeling like a repeat of
an existing class project.

**What I'd actually tell her to do:** don't decide from the page. #1 and #2 are the
two I'd push hardest — they're the freshest, least crowded, and hit pride+meaning
hardest. #3 is a close third if she's comfortable with the subject matter being
public. Whichever pulls at her emotionally is the one to pressure-test first with a
few real user conversations before committing.

Linked: [[senior-capstone]], [[capstone-goals]], [[capstone-skills]],
[[capstone-opportunity-hunt]], [[capstone-research-log]], [[idea-drying-rack]],
[[idea-speaker-bridge]], [[idea-fitness-clarity]], [[idea-body-awareness]],
[[idea-closet-organizer]], [[procrastination]], [[nervous-system-regulation]]
