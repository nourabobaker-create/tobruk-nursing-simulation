# Nursing Pocket Atlas — أطلس التمريض المصوّر

Version 0.1 · 9 October 2026 · Educational review draft

Independent of courses and examinations. Contains 33 separate illustrated entries and 18 chart/documentation guides. This replaces the previous clinical-discovery interface at the same hub entrypoint; legacy content files need not be deleted.

## Files
- `index.html`: interface and privacy copy.
- `atlas-items.js`: bilingual illustrated entries and source links.
- `atlas-charts.js`: chart fields, synthetic examples, explanations, pitfalls and references.
- `atlas-art.js`: original lightweight schematic SVG illustrations.
- `atlas-app.js`: browsing, filters, chapter navigation, chart explanations, local notes/bookmarks, export, printing, optional feedback and selective English pronunciation.
- `atlas.css`: responsive bilingual notebook design and print rules.

## Editing
Bilingual strings use `English|العربية`. IDs must be unique and remain stable because they identify deep links, saved notes and feedback. Each chart row must have as many cells as its fields. Source IDs in `refs` refer to `ATLAS_SOURCES`. Never enter real patient data. Maintain the fictional-example label. Change the version/cache query on release. The generated examples are original teaching forms, not replicas of local hospital forms. GCS, NEWS2 and the WHO checklist link to original official materials instead of pretending to reproduce an approved tool.

## Safety and privacy
No account, grades, prescription functions, patient-record storage, analytics or tracking events. Personal notes and bookmarks remain in localStorage on the same browser; clearing browser storage removes them. Text export creates a user-controlled backup. Optional Google Forms feedback prefills only page ID, section and version, not local notes, personal identifiers or browsing history. The external form and its provider have their own privacy arrangements. Existing feedback form configuration is reused; no form settings were changed. Clinical content is source-checked but has not been approved by a local clinical reviewer. Adult illustrative data are not paediatric reference ranges. Device drawings are for recognition, not operating instructions.

## Availability
Core pages use only these local files, without external libraries, fonts or image requests. They can be opened from an extracted folder. Source links and submitting feedback require internet; browser pronunciation availability varies. No service worker is installed and the hub's existing caching policy is not changed.

## Content rights
Original educational text, schematic illustrations and original teaching forms are shared under CC BY-NC-SA 4.0. References and official external tools keep their respective rights and conditions. Citation is not endorsement. Preserve Faculty of Nursing, Tobruk University attribution. Do not remove the educational/review status.
