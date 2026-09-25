# Wound Dressing / Wound Care — Learning 01
Faculty of Nursing — Tobruk University. Skill 07.

## Source mapping
Primary curricular source: the supplied `7. Wound Dressing.docx`, a one-page 16-step checklist. The original step numbers, substeps, six reported observations and original English wording are retained in the guide. Teaching English normalises spelling only; Arabic is labelled a teaching translation. The source supplies no rationales, so the explanatory paragraphs are explicitly labelled as added. The app does not award the source sheet's 48-point clinical score.

## Learning
Learn, Train, Scenario test, Source guide, and 24 written questions with immediate feedback or independent answering, explanations for each option and missed-question retry. The illustrated hands peel tape and lift the dressing, pour on stuck material or a gauze pad, make a controlled top-to-bottom stroke, dispose of used gauze, open the package, pick up by a corner and place the pad. Students can directly control the cleansing stroke, choose a corner and drag the pad to the wound. Touch and keyboard alternatives are provided. Percentages and active time measure on-screen interaction, not speed or clinical competency.

The conditional sticking step is demonstrated as a branch: step3 pauses, step4 moistens the stuck dressing, then removal completes before step5. A freely releasing dressing marks step4 not needed. The six observation vignettes are separate examples, not six assumed findings in one patient. Step9 explicitly includes glove removal plus washing and drying hands.

## Explicit safety limits
The sheet does not identify the wound type, solution, dose, glove type, complete aseptic technique or periwound stroke pattern. The illustration is not a universal wound-care protocol. Before real care these require the supervising clinician and local patient-specific plan. The app visibly adds a dirty-to-clean glove/hand-hygiene checkpoint before fresh cleansing materials; it is not attributed to the source. CDC hand-hygiene guidance, NICE NG125's surgical-dressing non-touch recommendation and Open RN wound terminology are linked inside the module with their scope identified. Original source numbering is unchanged.

## English listening
Only explicitly marked terms, individual instructions and observation meanings receive speakers. No Read All or automatic narration. The standalone file supplies its own controls; the seven-module hub uses the shared selective-audio controller. Navigation and switching language stop speech. No answers are transmitted or persistently stored.

## Packaging
Nineteen ordered UTF-8 base64 segments hold a raw-DEFLATE copy of the complete standalone app, including both logos. A bounded decoder requires exactly 143377 decoded bytes and checks SHA-256 when available: `3429aea5533b524895210b30980b74a4f924bb884ef0f1b8cd69627752fe1486`. Segment blob hashes were checked before publication. This packaging does not obscure access to the code; it is compression, not protection. The downloadable ZIP also supplies readable uncompressed sources. The compiled app replaces the loader document, allowing the hub offline exporter to capture the complete module.

## Software verification
85 module assertions and 37 seven-module integration assertions passed in Chromium, covering source strings, all 16 scenes, both dressing branches, observation choices, cleaning-direction rejection and fresh-pad reset, disposal, hand-hygiene substeps, corner contact, direct placement, written scoring/retries, selective speech text, Arabic layout, real browser touch events, hidden-clock suspension, retained iframe state and complete offline export/reopening. The published 19-part loader was additionally tested with mocked resource responses and initialised the module without page errors. Network navigation was restricted in the test environment, so these were local/content-injection tests, not physical-device or clinical validation. No physical iPhone or audible pronunciation test was performed.
