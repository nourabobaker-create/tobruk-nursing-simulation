# Safety First — 360° clinical safety practice

Faculty of Nursing, Tobruk University. Bilingual English/Arabic teaching prototype, version 1.0.0.

Open `safety360/` through the existing GitHub Pages site. The original Pain Assessment module remains at the project root. Serve the repository with any static HTTP server for local use. No build, account, database, CDN or paid service is required.

## What the learner can do

- Turn through a spherical 360-degree panorama, zoom, use entrance/bedside/worktop view presets, and select 15 room objects. This is a **fixed-viewpoint panorama**, not a free-walking 3D mesh or headset VR implementation.
- Work as Ahmed, a supervised student nurse, with Khaled Salem, a fictional postoperative patient.
- Introduce, seek permission, verify two identifiers, clean hands, obtain six pain-history responses, measure five baseline observations and inspect four chart sections.
- Recognise environmental and equipment risks, plan safe toileting, and recover from a near fall if an unsafe movement option is chosen.
- Reconcile an allergy discrepancy, intercept an unreadable medication order, complete checks, manage interruption, and assist supervised comfort care. The nurse performs authorised oral analgesic administration; no drug dosing instruction is supplied.
- Complete a separate sharps checkpoint and PPE preparation decision.
- Respond to a scripted deterioration with urgent help and SBAR, then reassess after simulated team care.
- Write interim and final notes, report an intercepted risk, complete handover/exit hygiene, and review a retained action trail. Print/save PDF or export JSON locally.

## Scenario structure

1. Routine introduction, identity and hand hygiene.
2. Flexible baseline assessment bundle (pain, vital signs, chart, interpretation).
3. Environmental and equipment preparation.
4. Safe mobility decision, with a conditional near-fall branch and recovery.
5. Supervised medication safety; the unsafe dose is intercepted, not administered.
6. Five simulated minutes after care, acute deterioration: BP 86/52, HR 120, RR 28, SpO2 92% on room air. These values are scripted, not connected-device readings. The cause is intentionally unspecified.
7. Team review, reassessment, incident reporting and a factual final note.
8. Accepted handover, end-of-care safety check, hand hygiene and debrief.

Emergency help is always accessible. Routine prerequisites do not gate it. Assessments can be collected in different orders. Safe holding/escalation of an incomplete order is allowed immediately, while proceeding with medication care requires the full checks. Critical attempts remain in the record after correction. The learner is not given an official grade or competency certificate. Free text is checked for presence only; it requires instructor review.

## Teaching use

Suggested timing: 20–25 minutes practice plus 10 minutes facilitated debrief. Faculty must review clinical content and adapt local escalation, medicines, infection control and reporting procedures before formal teaching. The exercise supports accreditation evidence alongside actual attendance, lecturer approval, observed practical skills and a documented improvement cycle. A self-directed completion record alone does not demonstrate practical competence or accreditation compliance.

The generated panorama is illustrative. Hotspot badges, patient status and interaction cards communicate changed scenario state; the background does not animate each physical intervention. Voice uses the device's speech service if available; full text is always visible. The All objects view supports devices without WebGL. The module caches local assets using a scoped service worker after a successful initial online load. Offline storage availability and retention depend on the browser. No telemetry, real patient data or external data collection is implemented.

## References reviewed 18 September 2026

- WHO, hand hygiene: https://www.who.int/campaigns/world-hand-hygiene-day
- CDC, safe injection practice: https://www.cdc.gov/injection-safety/hcp/clinical-guidance/index.html
- Resuscitation Council UK, ABCDE approach (updated July 2024): https://www.resus.org.uk/library/abcde-approach

References support general safety principles; local faculty approval is still needed for this original scenario.

## Assets

The Faculty logo was extracted unchanged from the existing user-supplied prototype. `assets/room.jpg` is an original image produced with the built-in image-generation tool, then encoded as JPEG for web delivery. It depicts a fictional patient. The prompt requested a seamless 2:1 equirectangular clinical room with one modestly covered older North African male patient, bed, IV/monitor, bedside cabinet, wet patch, slippers, hand hygiene, medication worktop, sharps, PPE and electrical lead. No real patient photograph was used. The generation brief is preserved in `asset-prompt.txt`.

## Maintenance

All scripts are local vanilla JavaScript. `scenario.js` holds bilingual educational content, `app.js` implements transitions and the practice record, and `scene.js` renders the spherical panorama with WebGL. Increment the service-worker cache name when releasing changes. Progress uses `tobruk-safety360-v1` in local storage and is separate from Pain Assessment progress. Do not add real patient identifiers to exported records.
