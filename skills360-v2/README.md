# Tobruk Nursing Skills 360 — V2

Faculty of Nursing — Tobruk University. Educational prototype, pending faculty validation.

Only **medical handwashing** and **clean gloving** are implemented. All files are isolated here; no earlier prototype is changed.

## Open / install

Serve this directory over HTTPS (or localhost for development). Open `index.html` through the server, wait for **Ready offline**, then install through the browser's Install / Add to Home Screen command. iPhone: Share → Add to Home Screen. No account or network is needed after the first successful cache installation. Clearing browser storage removes the offline copy and local progress.

All URLs are relative. Copy this directory unchanged to a university HTTPS server. Service-worker scope and cache deletion are limited to this V2 application. There are no runtime third-party libraries, CDN assets, GitHub APIs, analytics, or cloud grading.

## Learning cycle

- **Learn:** six small interactive lessons covering both skills, positioning, coverage, recontamination and glove containment.
- **Watch:** Ahmed's complete sequence including a brief fictional used-washcloth contact and final handwashing. Play/pause, replay current movement, slow and contextual Why controls.
- **Practice:** panoramic illustrated room, object interactions, progressive hints and recoverable feedback. Swipe/drag to turn through the room; tap to approach stations. Focus hands for small screens.
- **Do it yourself:** identical physical objects with no procedural checklist, friction timer or hints. Non-dangerous sequence mistakes are observed. Physically unavailable actions are explained. Bare contact with a used glove freezes that movement for a local retry.
- **Debrief:** observed strengths, sequence/technique issues, contamination, self-corrections and ungraded rationale reflections. Targeted checkpoints for handwashing, faucet completion and glove removal.

The panoramic view is a lightweight looping SVG illustration, not stereoscopic VR or a 3D anatomical model. Gestures and markers are educational approximations, not real-world competence or microbial measurements. English content is local; no unverified Arabic translation is included.

## Source fidelity and faculty review

`source.json` preserves the instructor's 11 handwashing and 14 gloving items and rationales, verified against the two supplied procedure documents. The visible **FACULTY REVIEW REQUIRED** register distinguishes source wording, simulation interpretation and items requiring approval: friction timing vs total procedure time, under-nail method/tool, ring policy, warm-water rationale/soap dose/towels, faucet barrier interpretation, and bag/seal/disposal waste policy. The added used-cloth contact supplies context only.

The implementation selects the source's liquid-soap and paper-towel options. It uses 30 seconds of active friction from the source's 10–30-second range; it does not call that the total handwashing duration. Under-nail cleaning is represented gently with fingertips; no sharp scraping demonstration is given. Faculty must approve these interpretations before assessed use.

## Interaction details

At the sink, use the faucet, warm-water control, stream and soap dispenser. Rub directly across each hand, turn the hands to reach dorsal surfaces, and move them using the bar under the wrists. A camera focus control enlarges the hands. Tap the towel dispenser to dry. **Bare handle contact recontaminates skin:** touch the held paper towel then the handle, or drag the towel to the handle, to use the barrier.

At the glove station, take each glove from the box, then slide/tap the held glove onto the other hand; interlace the gloved fingers by touching the gap between them. Contact the used cloth at Khaled's bed, return, peel at the first palm base, then use the inside of the second cuff. The wrong exterior contact transfers the marker to skin and freezes that movement. Retry restores only the glove-removal checkpoint; this is a simulation reset, not a clinical decontamination instruction. Bag, seal and dispose, then perform the final handwash.

## Tests

```
node --test skills360-v2/tests/engine.test.mjs
PLAYWRIGHT_MODULE=/absolute/path/to/playwright CHROME_BIN=/absolute/path/to/chrome node skills360-v2/tests/browser.cjs
```

The browser harness starts its own local HTTP server and exercises mouse and touch viewports, real elapsed rubbing gestures, requested error recovery, debrief/retries and offline reload. Runtime/test code are separate. No test-only progression bypass is exposed in the app.

`engine.mjs` is a pure reducer. Water has no soap prerequisite; wetting has only a running-water prerequisite. Handwash recovery resets no earlier skill history. Coverage survives a rejected early rinse in practice. Independent mode records ordinary sequence errors while applying physically possible state changes. Final disposal resets only the wash state for the last wash.
