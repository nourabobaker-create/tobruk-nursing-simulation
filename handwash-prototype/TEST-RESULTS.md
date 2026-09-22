# Verification — 2026-09-22

## Completed checks

- Normal `faucet → water/wet hands → soap`: **PASS**, state tests and browser controls.
- Early soap → brief correction → faucet → wet → soap: **PASS**, mouse and actual touch events. Feedback never locks controls.
- Early towel use → rinse → dry → safe closure: **PASS**.
- Recovery after arbitrary preparation actions: **PASS**, 100 deterministic histories using public action functions.
- Real mouse drag scrubbing: **PASS**, full coverage earned only through repeated pointer travel/direction changes over time.
- Real browser touch events: **PASS**, including corrective sequence and scrubbing. A direction-change accounting issue found by this test was corrected and retested.
- Rinse → dry → towel-protected faucet closure: **PASS**.
- Debrief → retry one missed movement: **PASS**. Focused retry starts with explicitly pre-wetted/soaped hands.
- Memory mode free area choice: **PASS**.
- Arabic RTL and English LTR: **PASS**.
- Phone portrait: **PASS** at 390×844 and 360×800 CSS pixels; tablet 768×1024 and desktop 1440×900 checked for overflow. All 24 demonstration submovements rendered at phone size without script errors.
- Fingertip contact: **PASS**. All four articulated fingertip endpoints measured at approximately z=0.280000 in the opposing palm frame; fingertip-pad radius is approximately 0.08, meeting the palm surface at approximately z=0.20. An initial orientation discrepancy was corrected before this pass.

## Visual inspection with text hidden

**Passed developer visual inspection** of the seven required movement categories: palm-to-palm, palm over dorsum, interacting/interlaced fingers, fingertips in palm, flexed finger backs/knuckles against palm, wrist clasp, and hand travel along forearm. Both sides were rendered where appropriate. Multiple frames across the rubbing phase were inspected with instructional text hidden; physical pose and displacement are distinct. The animations use articulated hand surfaces, not arrows or visual effects as proxies.

A foam-scaling bug that initially obscured hand contact was fixed. Foam is now small, placed at the contact surface, and in practice appears only after rubbing earns progress.

This is a **technical/visual prototype pass**, not evidence that novice students have learned the skill. No first-year student usability trial, faculty sign-off, physical-device laboratory test, or clinical competency validation was performed. Browser viewport/touch emulation is distinguished from testing on an actual phone.

## Faculty review still required

1. H9: exact safe under-nail cleaning method. Only gentle free-edge contact is shown, clearly flagged.
2. H8: local friction duration of 10–30 seconds, distinguished from total-procedure guidance and slow instructional playback. The instructor's sequence/timing text has not been silently replaced.

## Reproducibility

`tests/engine.test.mjs`, `tests/browser.cjs`, and `tests/touch.cjs` are included. Browser tests expect a static server at `http://127.0.0.1:8000/` serving the repository root and Playwright. Set `HANDWASH_CHROME` to your browser executable.
