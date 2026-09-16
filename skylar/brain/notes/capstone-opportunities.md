# Capstone Opportunities — the wide hunt

Findings from a broad opportunity hunt for [[senior-capstone]], run against
[[capstone-opportunity-hunt]]'s brief: go past her five existing ideas
([[idea-drying-rack]], [[idea-speaker-bridge]], [[idea-fitness-clarity]],
[[idea-body-awareness]], [[idea-closet-organizer]]) and find fresh, validated
opportunities across her domains, including the overlooked "everyday ugh" category.

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
