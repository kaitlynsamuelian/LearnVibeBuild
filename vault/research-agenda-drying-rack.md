# Research agenda: adaptable drying rack

Questions, not findings. After a run, file the answer under `vault/content/drying-rack/` and mark the ticket DONE.

**Idea we are testing: a dual track, not one concept.**

1. **Is reconfiguration even wanted?** Does a person actually want to change the rack's shape or install per load, or is that a new chore? Install modularity and reconfigurable geometry are on trial here, not assumed.
2. **Can the rack itself dry faster via airflow?** Air distributed through the structure (hollow or perforated rods, holes aimed at the garment) rather than a fan on the floor.

Install modularity is no longer the only idea and is not locked. Attachments stay parked, with one exception: if the custom clip-for-rod experiment comes back from the airflow track, attachments reopen.

Observe, then validate, then experiment, then pick which problem is the capstone.

**Already settled. Do not redo unless something new breaks it.**

- Polder Mountain Lock: over-door, no-drill, 40 lb official. Renter-safe + wet load exists. Lives on a door.
- Command Large strips: 15 lb, picture load, not a cantilevered rack.
- Woolite W-84156: do not quote 60 lb as official.
- Market split: high capacity usually means drill. No-drill usually means door. Adhesive is not laundry-scale.
- SKÅDIS is the logic (one core, one interface), not the same load.
- **Chopra, 29 Sep 2026.** Reconfiguration may be a chore rather than a feature. The goal is easy and passive. Observe six real loads before locking any geometry. Airflow is a separate experiment that does not wait on the reconfiguration answer. Write-up: `vault/content/drying-rack/online/chopra-feedback.html`.
- Do not promise five mounts as the deliverable, and do not present reconfigurable geometry as a validated need.
- Air-through-perforated-rods is old: US 5,642,462 (Huff, 1997). Fan-on-a-rack ships today (NuBreeze, Foxydry). Heated bars ship today (Dry:Soon). Nothing found on sale pushes air out through the rods.
- **30 Sep 2026 precedent pass.** Cost is not the first constraint. Research question for the pass: how can a drying system actively improve air-drying through airflow, materials, geometry, or integrated mechanisms, while fitting naturally into a living space? Six named precedents filed: `dyson-air-multiplier`, `samsung-airdresser`, `lg-styler`, `drying-pod`, `heated-airer-plus`, `perforated-duct`. Optional seventh filed: `live-with-it` (Sheila Maid). Synthesis: `online/premium-airflow-precedents.html`. Assignment framing: `online/change-from-last-week.html`. The dual track still stands, and this pass does not close R1. Six loads are still required.
- Evenness is the industry's stated goal, not ours alone. Samsung's own AirDresser page says an upper JetAir and a lower HeatPump "improve the internal circulation of air and dry clothes evenly." That supports A6 but is not our measurement.
- Exit geometry outranks fan size, sourced. Dyson's US 8,092,166 gives a nozzle mouth spacing of 0.5 mm to 10 mm, and Maîtrejean et al 2024 (arXiv 2406.03305) report the discharge ratio increasing threefold when slit thickness drops from 1.5 mm to 0.25 mm. Start A5 at the slot, not at the fan.
- Manifold rules to test, not to claim: keep total hole area well under the tube bore (practitioner guidance, forum-sourced, area ratio below 0.5), filed fabric-diffuser open areas run about 5% to 25% (US 5,782,689), and taper or compensate to even out discharge along a length.

---

## How to run

**One ticket:** Run ticket I3 from `vault/research-agenda-drying-rack.md`. Official spec vs seller claim vs review. No invented numbers. Write a findings file + data.js card. Mark the ticket DONE.

**One section:** Run every OPEN ticket in section I.

**Nightly:** Pick 2 OPEN tickets marked NIGHTLY that we have not touched in a week.

**Whole pass:** Every OPEN ticket, in order. Stop after each section. If you cannot find it, say NOT FOUND.

---

## R. Reconfiguration wanted? (track one)

### R1. Do the six loads show anyone wanting a different layout
Status: OPEN

Primary evidence. Six real loads, hung normally, photographed. Placement and reason per garment type. Whether the frame's shape was ever the thing that was wrong.

Protocol: `vault/content/drying-rack/in-person/six-loads.html`.

Output: yes / no / partly, with photo evidence. This ticket outranks every online pass on this question.

### R2. Does anyone say it in their own words
Status: OPEN

Survey Q11 and interview Q9, both written as a memory ("have you ever wished") rather than a preference. Scripts: `in-person/survey.html`, `in-person/interview-script.html`.

Output: count of people who can name an actual moment, plus their words.

### R3. Online evidence pass
Status: DONE 2026-09-30

Findings: `online/reconfiguration-skepticism.html`. People have a stable garment-to-tier habit on fixed frames, setup takes about 20 seconds so it is not the pain point, and the rearranging they resent happens mid-dry because of uneven drying. NOT FOUND: anyone describing deliberately changing a rack's geometry between loads.

Does not close R1 or R2. One online pass is not a verdict.

### R4. Is folding away even a behaviour
Status: OPEN

Our stored-versus-open fold assumed people put the rack away. Survey Q7 and interview Q7 test it.

Output: put-away vs left-out split. If most people leave it out, the fold is not the feature.

### R5. If reconfiguration is not wanted, what replaces it
Status: OPEN

Depends on R1 and R2. The fallback is one fixed frame with well-differentiated zones (light low, heavy high, long on the ends, something for sheets) that we decide once so the user never has to.

Output: one paragraph, sketch-level, of the fixed geometry.

---

## A. Airflow (track two)

### A1. Who already sells active airflow
Status: DONE 2026-09-30

Findings: `online/airflow-drying.html`. Precedents filed: `dry-soon` (heat, no fan, 300W, £199.99), `nubreeze` (cool fan, "up to 50% faster" seller claim), `foxydry-air` (two 44W fans, ceiling, $599.70; Pro adds 750W heated air), `dryguy-force-dry` (forced air through hollow posts into footwear), `huff-air-bars` (1997 patent, air out of perforated bars).

NOT FOUND: a product on sale that pushes air out through the drying rods themselves.

### A2. Physics, sourced only
Status: DONE 2026-09-30

Conservation physics (Bengtsson, Segel, Havsteen-Mikkelsen, Padfield, 2004): the limiting step in the long phase is sweeping saturated air off the cloth surface, not heat. That makes drying rate a geometry question. Indoor Environments 2025 paper gives water emission rate for an indoor load (abstract only, full text 403, verify before citing).

No dry-time table. We have a seller claim, one reviewer's hours and a lab emission rate, and they do not combine.

### A3. First prototype: fan + PVC + holes
Status: OPEN · NEXT

Plan written: `experiments/airflow-experiment.html`. Three-way bench test. Airflow rod vs plain rod vs plain rod with a desk fan pointed at it. The desk fan is the incumbent and the only control that matters.

Output: weight-loss table with room conditions, tissue-strip flow map with and without fabric, uncalibrated noise reading, every failed run kept.

### A4. Does fabric choke the manifold
Status: OPEN

The most likely way the idea dies. Fabric seals the holes and flow collapses. The Huff patent used ribs between slots to hold cloth off the vents. Test with and without standoff.

Output: go / no-go on through-the-rod geometry specifically.

### A5. Rod variables
Status: OPEN

Diameter, cross-section (round, square, flat, oval), material, hole size, hole spacing, hole aim, distribution along the length. One at a time.

Output: which two or three variables actually move the result.

### A6. Evenness, not average speed
Status: OPEN

The user complaint is damp patches and going back to poke at it, not the average hour count. Measure the contact surface separately from the exposed surface.

Output: whether airflow fixes evenness even where it does not win on totals. This is probably the real finding.

### A7. Noise and liveability
Status: OPEN

An appliance that runs six hours in a studio has to be liveable. Noise is already the named complaint against the one cool-air rack on the market. No published dB spec exists for NuBreeze or Foxydry.

Output: uncalibrated phone reading at 1 m, plus the subjective version (could you sleep, could you talk).

### A8. Safety, no heat in version one
Status: OPEN

Unheated room air, low-voltage certified fan, nothing wired to mains. Condensation is the real hazard of the low-risk build. UK regulator recalled a heated winged airer in Jan 2025 for overheating (2501-0138). A heated airer is not the same device as a fan in a tube.

Output: one paragraph we can say in class about why version one has no heating element.

### A9. Custom clip for the rod
Status: PARKED until A3 returns

The one attachment worth reopening, because it would belong to the airflow system rather than being a generic accessory. Needs a bar worth designing a clip for first.

### A10. If Dyson made a drying rack
Status: DONE 2026-09-30

Dyson never made a drying rack or airer. Only laundry appliance was the CR01 Contrarotator washing machine (community-wiki sourced, dates approximate). So the phrase is a brief, not a precedent. Analogs as design logic only: Supersonic, Airblade, DryGuy Force Dry DX.

The trap: Dyson sells a motor and we cannot build a motor. Our defensible differentiator is the air path, which is drawable and testable.

Added 30 Sep 2026: the Dyson file now exists as a precedent in its own right, built from the patent rather than from marketing. `precedents/dyson-air-multiplier.html`.

### A11. Slot width before fan size
Status: OPEN · NEXT after A3

Added 30 Sep 2026 from `precedents/dyson-air-multiplier.html`. Two independent sources say exit geometry dominates: the Dyson patent's 0.5 mm to 10 mm mouth spacing, and the 2024 parametric study's threefold discharge-ratio gain from 1.5 mm down to 0.25 mm slit thickness. Both are open-air results with no fabric present.

Output: for our rod, whether a narrow slot beats round holes of the same total area at the same fan setting, measured at the cloth.

### A12. Area ratio and taper on the bench
Status: OPEN

Added 30 Sep 2026 from `precedents/perforated-duct.html`. Test the practitioner rule that maldistribution stays under about 5% when total hole area is below half the bore, and test Huff's taper against a straight bore of the same length. Note the drip-irrigation alternative (compensate at each outlet) as the manufacturer's version we are not building.

Output: a flow map along the length for two or three area ratios, tapered and untapered. Feeds A4 and A6.

### A13. How little enclosure is enough
Status: OPEN

Added 30 Sep 2026 from `precedents/drying-pod.html`. The pod works because the air cannot leave before it touches cloth, and it is unliveable because it is a zip-up bag. Test partial containment: a skirt on one side, a back panel, a shroud on the bar itself.

Output: weight loss for open rack vs partial containment vs fully covered, plus a note on what each version looks like in a room. Add containment as a fourth condition in `experiments/airflow-experiment.html`.

### A14. Is the hanger part of the air path
Status: OPEN

Added 30 Sep 2026 from `precedents/samsung-airdresser.html`. Samsung's Air Hanger appears to carry air into the inside of the garment, described in review and search-summary language that still needs verifying against the manual. If true, the last few centimetres of the air path may be the hanger rather than the bar.

Output: verify the Samsung claim from an official manual, then decide whether A9 (custom clip) should become a hanger instead of a clip.

### A15. Motion without a motor
Status: OPEN · LOW PRIORITY

Added 30 Sep 2026 from `precedents/lg-styler.html`. LG moves the garment mechanically through six motions and pays for it in noise and complexity. Question: can airflow alone move a garment enough to break the fixed contact line, with no moving parts?

Output: observation only at this stage. Does a hanging item lift, flutter or stay still at the flow rates we can produce.

### A16. Liveability benchmark exists now
Status: OPEN

Added 30 Sep 2026. The Dry:Soon Drying Pod is claimed at "less than 52 decibels," the only decibel figure on the shelf. Nothing published for NuBreeze, Foxydry or the Styler that we could verify. Stand our own A7 reading next to that claim and say which is which.

Output: one comparison line we can defend in class.

---

## P. Problem

### P1. Who air-dries, and why
Status: OPEN · NIGHTLY

Share of renters / students who air-dry. Why (no dryer, delicates, cost). What they hang.

Output: 5 sources + one sentence we can say in class.

### P2. The rack takes the room
Status: OPEN

Real review / Reddit language. Footprint, setup, ugly, tripping, or just “I want a dryer.”

Output: 8 quotes, grouped. No made-up users.

### P3. Renter rules
Status: OPEN · NIGHTLY

Typical lease / CU housing: drill, Command, over-door, tension, balcony. What gets charged.

Output: usually allowed vs not. Flag if Boulder-only.

### P4. System vs another $25 rack
Status: OPEN

Kill-shot for install modularity. Do people keep laundry gear when they move, or repurchase cheap.

Output: evidence either way. Prices they already pay.

### P5. Space change vs laundry change
Status: OPEN

Does install need to change because they moved / guests / season, or does only the load change each week.

Output: which to prototype first, install or geometry.

---

## I. Installation modularity

### I1. Anyone already sell one dryer, swap the mount
Status: OPEN · NIGHTLY

Modular / interchangeable-mount / floor-and-wall airers. Include Leifheit, Gimi, Foxydry, Brabantia, Asia tension systems.

Output: yes-list with links, or “nobody ships this as a system.” Different SKUs do not count.

### I2. One interface, different load paths
Status: OPEN

Floor = compression + tip. Wall = shear + moment. Door = hang + slam. Tension = axial slip. Clamp = clamp force.

Output: which two installs share enough physics to prototype first.

### I3. Steal a joint from outside laundry
Status: OPEN · NIGHTLY

Baby pin / spigot / Arca, bike thru-axle, USM / Vitsoe / SKÅDIS / BOAXEL / T-slot, VESA, 5/8 thread, tent hubs.

Output: 3 interfaces worth mocking up. 3 that are wrong (weak, tool-y, ugly). Typical load and fail-safe for each.

### I4. Quick-release under a hanging wet load
Status: OPEN

Joint is in tension/moment once clothes are on. Camera plates and bike QR know this. Furniture cams often do not.

Output: what stays locked when loaded and still releases empty. What happens if someone releases it loaded.

### I5. Floor module
Status: OPEN

Stability with wet towels. Tip vs footprint. Can legs be a module or are they a different product.

Output: honest constraints. Point at L1 for real weight.

### I6. Wall module
Status: OPEN

Drywall vs stud vs masonry. Cleat, toggle, no-drill honestly. WallFix wants a solid wall.

Output: one renter-legal wall story, or “wall means studs or we do not offer wall.”

### I7. Door module
Status: OPEN

Polder already owns high-capacity door. Go / no-go for door as a first-semester mount.

### I8. Tension module
Status: OPEN

Slip, ceiling height, seller kg claims, collapse injuries. Real third install or novelty.

### I9. Clamp / balcony
Status: OPEN

Foxydry-class. Lease, wind, rust, who even has a rail. Park unless Boulder pattern shows up.

### I10. The joint we would draw
Status: OPEN

After I2–I4: one paragraph, sketch-level. What it must not do (fall loaded, need a drill to swap, only fit one mount).

---

## L. Load and safety

### L1. What a real air-dry load weighs
Status: OPEN · NIGHTLY

Wet jeans, towels, sheets, small vs full. Cited vs kitchen-scale.

Output: a table. Mark measured vs cited.

### L2. Moment on a wall bracket
Status: OPEN

Frame 12–18 in off the wall with L1 on it. Back-of-envelope.

Output: why SKÅDIS accessories are the wrong intuition.

### L3. Fail-safe / recalls
Status: OPEN

Collapsing airers, tension poles, door racks that fell. 3 failures to learn from.

---

## G. Geometry (only where it hits install)

### G1. Does install already change the shape
Status: OPEN

Door = shallow. Floor = wide. Wall = can be tall. Tension = column.

Output: yes/no, swapping install already gives most of the geometry we were promising.

### G2. Pants clearance
Status: OPEN

Target height so pants / dresses do not hit the floor.

---

## U. People (write now, do later)

### U1. Interview script
Status: DONE 2026-09-30

Filed: `vault/content/drying-rack/in-person/interview-script.html`. 10 questions. Full laundry sequence first, living in the space second, layout ninth, speed tenth. Does not lead with "modular" and never says it.

Survey also written: `in-person/survey.html`. Neither document contains the words modular or airflow.

### U2. Who to book
Status: OPEN · UPDATED 2026-09-30

Original list: renters, dorm, Polder owners, floor-rack owners.

Chopra update, and this is now the priority: **more women**, and anyone who hang-dries a wider variety of garments (bras, delicates, knits, activewear, not just the occasional sweater). Apartments and dorms over houses. People who air-dry as a routine rather than an emergency.

Note from `online/laundry-mode.html`: YouGov 2025 says only 7% of US adults air-dry everything, and ACI 2026 says 29% of households use a line or rack at all. NOT FOUND in either: a gender or housing breakdown. That gap is exactly what U2 has to close in person.

Five first conversations, then reassess.

### U3. Store walk
Status: OPEN

IKEA / Target / Home Depot. Box language for install. Photos to precedents. Notes to in-person.

---

## C. What we say in class

### C1. What modular means
Status: OPEN

How much / what form / what function / where it is held. We are testing where it is held.

### C2. What we will not claim
Status: OPEN · UPDATED 2026-09-30

No “every renter-safe rack is weak.” No WallFix on drywall. No Woolite 60 lb.

Added after Chopra: do not claim reconfiguration is wanted until R1 and R2 answer it. Do not claim a dry-time improvement we have not measured ourselves. Do not present a seller's "up to 50% faster" as a fact. Do not imply Dyson made a drying rack. Do not describe a fan in a tube using heated-airer safety language.

The deliverable is no longer fixed. It is one of two tracks, chosen at step 5 of the run order.

---

## Run order

New order as of 29 Sep 2026. Observe, validate, experiment, then choose.

1. **Six loads.** R1. Hang normally, photograph everything, log it. Primary evidence, and nothing about geometry gets locked before this.
2. **User talks and survey.** R2, R4, U2. Five conversations plus the form out. Especially women and wider-variety hang-dryers.
3. **Reconfiguration evidence, assembled.** Read R1 and R2 together against R3 and answer the question: is reconfiguration wanted, yes or no.
4. **First airflow prototype.** A3, A4, A6. Runs in parallel and does not wait on steps 1 to 3.
5. **Pick the capstone.** Which of the two problems is the more interesting opportunity. Then, and only then, spend time on install and joint detail.

The old install tickets (P, I, L, G) stay OPEN. Nothing found since the pitch has closed them, and whichever track wins, the rack still has to stand up and hold a wet load. Run them when they serve step 5, not before.

Nightly rotation, if we are doing a little each night: A1, P1, L1, I3.

Parked until step 5: I4, I7, I8, I9, I10, C2. Reopen A9 (custom clip) only if A3 comes back positive.
