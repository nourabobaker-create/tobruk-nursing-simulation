# Tobruk Nursing Clinical Skills Lab

First-year, bilingual English/Arabic proof of concept for **Turning and Moving a Patient**. Three cases: side-lying, staged prone turn, and two-stage lateral repositioning. The other five modules are fully source-mapped and interaction-designed, but are not implemented as playable modules.

## Curriculum

Eight instructor DOCX files were extracted before implementation. `curriculum-map.json` preserves 78 source entries, exact original wording, source rationales, explicit new rationales, dependencies, safety significance, interactions and error feedback. It also includes 28 faculty-review items, source hashes, explicit additions and architecture. `curriculum-review.html` provides a searchable review interface.

The two turning documents have identical procedure text and no rationales. They are not a checklist/rationale pair. The two positioning documents differ in scope and Fowler naming. All entries remain traceable.

**Faculty validation is required before student release.** The original shoulder/hip traction, hand-under-body movement, arm-under-side prone wording and post-roll head positioning are not silently reproduced. This manikin prototype uses explicitly proposed aid/helper and staged-movement adaptations. It is not a validated clinical handling protocol or competency assessment. The exact device, staff requirements, prone method, supports and Arabic wording need local faculty approval. Hand hygiene is recorded as a prerequisite; this module does not assess full washing technique.

## Interaction and architecture

- `scene.js`: perspective 3D room and articulated adult manikin, independent joint positions, bed, supports, helper, camera walking and collision. A software Canvas renderer supports devices without WebGL. Graphics are stylised 3D, not photorealistic or a biomechanical force model.
- `engine.js`: isolated observable state, risk-based prerequisite predicates, seven feedback categories, source IDs, event log, fresh retry and outcome-based debrief. Independent limb preparation orders are accepted. A fresh count is required after preparation changes.
- `app.js`: room object controls, continuous previews, English/Arabic and RTL, guided/challenge delivery, focused demonstration after difficulty, accessible range controls, debrief export. No accounts or patient data.
- `sw.js`: versioned same-origin app cache. Initial online loading is required. Browser support determines offline/PWA behaviour; installation icons may need production variants.

Future modules reuse room/navigation, articulated parts, feedback, sources and debrief, with their own interaction controllers and state predicates. They do not need a rebuild of the room. The curriculum architecture table documents each module's proposed interactions.

## Controls

Drag empty room space to look; W A S D or on-screen arrows to walk. Arrow left/right also turn. Tap a labelled object or station to approach. Manipulate individual limbs and posture using ranges (keyboard arrows also supported). Choose grip, count 1–2–3, then move the handle. Prone and lateral cases pause halfway for checks and a fresh count. Collect and place pillows at separate targets. The posture inset makes learner mechanics visible.

## Verification

Run `node skills-lab/engine.test.mjs` from repository root. Covers all three cases in both modes, alternative preparation orders, required safety gates, contact/sequence/technique errors, missing supports, count invalidation, complete outcomes and clean retries.

Serve through GitHub Pages or any same-origin static host. No build system or external dependencies. Browser visual/interaction QA is recorded in the delivery notes.
