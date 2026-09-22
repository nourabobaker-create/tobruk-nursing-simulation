# Tobruk Nursing — Medical Handwashing Prototype

One skill, Arabic (default, RTL) and English. No accounts, backend, gloving, or other skills. All new code lives in `handwash-prototype/`. Existing prototypes are untouched.

Open `index.html` through a static HTTP server. Example from the repository root: `python3 -m http.server 8000`, then visit `/handwash-prototype/`. The renderer is vendored locally; no CDN, remote fonts, analytics or runtime network dependencies are used.

## Primary curriculum

Read directly from the supplied Tobruk University documents:

- `1. Medical Asepsis--Medical handwashing(1).docx` (procedure and rationale, 2 pages).
- `1.Medical Asepsis- Hand Washing.docx` (assessment checklist, 1 page).

Their 11 numbered items match. `content.mjs` preserves their sequence and maps each expanded visual movement to H1–H11. “Why?” contains concise paraphrases/Arabic translations of the relevant instructor rationale. H7 has no separate rationale in the source, and the app says so. H6 is expanded into visible bilateral submovements; it is not replaced with another organization's sequence. Each finger includes the thumb.

### Faculty review required

- **H9, nails:** source specifies opposite fingernails or a clean wood stick. The animation only shows gentle free-edge contact, with no forceful scraping or tool insertion. Exact technique requires faculty confirmation; this movement is not scored as a validated clinical technique.
- **H8, timing:** source specifies 10–30 seconds of friction. Retained and explicitly distinguished from deliberately slow instructional playback. Faculty should confirm local timing and its relationship to guidance describing *total procedure* duration. No silent replacement with WHO timing.
- H11's rationale is avoiding contamination from the faucet. A fresh paper towel barrier is made explicit visually. The single plain wedding band permitted by H2 is mentioned in the rationale; Ahmed removes his jewelry in the demonstration.

## Hands and interaction

Procedural Three.js hands, with individually articulated three-joint fingers, opposing thumbs, short nails, palms, wrists and forearms. No borrowed hand assets. Palms touch and slide; a palm slides over the opposite dorsum; fingers interlace; individual digits are grasped; fingertip pads follow the opposite palm's plane; bent finger backs contact the palm; wrists are clasped; the moving hand travels along the forearm. Bilateral actions are shown separately.

Every friction movement lasts 14–20 seconds for observation. Approach/contact precedes repeated motion. Play/pause, previous/next, replay, slow motion and contextual rationale are provided. The eye control hides instructional text for visual review.

In practice, the hands pose first. Mouse/touch movement drives the rubbing displacement directly; a stationary pointer earns nothing. Strokes need travel, direction reversals and time; circular movements need angular travel and time. This is simplified screen practice, not camera tracking or a validated assessment of physical performance.

Preparation objects can be tapped on the scene or via the accessible controls beneath it. Feedback does not lock the faucet or water. Guided practice has captions and gestures; reduced guidance hides captions; memory practice allows free choice of the next area without a prescribed sequence. Skipping remains possible and appears in the debrief. Focused retries preload explicitly wet/soaped hands and reset only the selected surface.

The amber/green hand map reports virtual practice coverage. It is not a microbial measurement. No percentage score is used.

## Reference roles

- [Indelible Hand Washing Trainer](https://indeliblelearning.com/handwashing/): posing hands, learner-driven scrubbing, visible missed coverage. Page studied; no assets copied.
- [SureWash GO](https://surewash.com/surewash-go-hand-hygiene-training/): demonstration and progressive withdrawal of prompts. No validation claims are transferred to this prototype.
- [Tork VR](https://play.google.com/store/apps/details?id=com.essity.FusionVR): reviewed for agency; wider scenarios intentionally excluded.
- [WHO visual positions](https://www.who.int/docs/default-source/patient-safety/how-to-handwash-poster.pdf): visual comparison and timing-review flag only. Supplied YouTube links were attempted; playable frames were not available through retrieval, so no claim is made that those videos were viewed.

## Testing

See `TEST-RESULTS.md`. Run `node handwash-prototype/tests/engine.test.mjs`. Browser scripts use Playwright and a local static server; set `HANDWASH_CHROME` to an installed Chrome/Chromium executable for `browser.cjs`. `touch.cjs` tests actual browser touch events through CDP.

Three.js r160 is included under its MIT license in `vendor/LICENSE-three.txt`.
