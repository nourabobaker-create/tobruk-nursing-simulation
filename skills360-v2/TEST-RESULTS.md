# V2 verification

Tested 21 September 2026 in headless Chromium 151. Desktop: 1440×1000 with mouse. Phone: 390×844 with touch enabled and actual CDP touch events. Phone tests are emulation, not a physical Android-device certification.

## State harness — 10/10 passed

- Water → wet hands → soap regression; no circular prerequisite.
- Normal handwash → safe faucet completion.
- Soap-before-wetting recovery.
- Early-drying recovery.
- Missed area correction while retaining completed coverage.
- Bare faucet recontamination and repeat-wash recovery.
- Bare contact with used glove exterior, local removal retry, then completion.
- Complete handwashing/gloving/final-handwashing cycle.
- Independent mode observes non-dangerous sequence mistakes.
- 300 deterministic sampled out-of-order handwashing sequences recover successfully.

## Browser interaction harness — 22/22 passed

The following 11 checks passed in each viewport:

1. Water → wet → soap through visible objects.
2. Soap-before-wet supportive recovery.
3. Early dry → rinse → dry → explicit towel-protected faucet closure.
4. Missed fingertip area repaired with actual mouse/touch rubbing.
5. Full normal wash using real gestures and elapsed friction, both hands and dorsal surfaces.
6. Visible faucet contamination and available recovery.
7. Glove exterior contamination, targeted retry, correct removal and disposal.
8. Debrief and targeted faucet scene.
9. Independent mode hides hints and friction timer.
10. Offline reload and locally cached faculty-review/source content.
11. No browser runtime errors.

## Learning-cycle harness — 6/6 passed

In each viewport: complete demonstration and Play/Pause/Replay/Slow/Why controls; drag/swipe panoramic navigation; continuous glove donning → care contact → safe removal → disposal.

## Layout and scope

Desktop and phone screenshots inspected. Phone hand-focus mode enlarges manual interaction surfaces. All assets are local; no runtime CDN/library request. Relative URLs, scoped service worker, 192/512 PNG icons and standalone manifest included. Original repository files remain untouched.

## Practical limits

This is a stylized first-person panoramic educational prototype, not a validated clinical competency assessment. Review items remain visible in the app. Installation was structurally checked and offline operation tested in Chromium; physical-device installation prompts and platform-specific home-screen behaviour require device testing.
