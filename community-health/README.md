# تمريض من أجل المجتمع

Faculty of Nursing, Tobruk University — community health education prototype 0.2.0, 15 October 2026.

## Public experience

54 original Arabic topic guides. Each combines an explanation, relevant symptoms or observations, practical actions, prevention, general treatment information, avoid/seek-help advice, a real-life example, and authoritative references. All guides await documented faculty review; real authors/reviewers are credited only after actual participation and consent.

The home page introduces the students' community service and self-funded voluntary effort, with an AI-generated illustrative community scene (not real students/patients). Original lightweight SVG drawings illustrate each topic. Everyday audience paths, Arabic search, favorites, print/share, larger text and device Arabic speech are available. Speech requires an available Arabic voice; local/offline and remote voices depend on the device. It never silently substitutes an English voice. Navigation stops speech.

The home-kit checklist can be repeated and is stored locally. No fixed water intake or patient-specific medication dose is generated.

## Files

- `index.html`, `style-v2.css`, `app-v2.js`: current application.
- `content.js`: baseline content and reference registry; obsolete nursing-role fields are not displayed by v2.
- `rich-content.js`: topic expansions, 18 added topics, audience paths and current feedback configuration.
- `art.js`: original SVG drawings.
- `measure.js`: opt-in local repeated measurement, explicit cycle linkage, summaries and safe CSV export.
- `sw.js`: scoped offline cache v0.2.0; previous app cache is migrated while unrelated caches remain untouched.
- `measurement-protocol.md`: meaning, consent, pairing rules, limitations, central sharing and later quality integration.
- `review-register.csv`: 54 entries; human review and approval fields remain blank.
- `activity-record.csv`, `improvement-register.csv`: blank bilingual institutional work registers.
- `plan.html`: original eight-week plan (v0.1 historical starting plan); `style.css` remains for that page. `app.js` is an unused baseline retained for reference. The public app does not load it.

## Feedback and repeated measurement

Feedback uses the college's existing public feedback Google Form, observed at its actual public URL; this release does not create or modify that form. All its mandatory fields are prefilled appropriately. Topic feedback and optional repeated measurements open a human-readable Arabic draft tagged for the community initiative. Only the visitor pressing Submit in Google Forms completes central submission. There is no background POST or fabricated delivery confirmation. No development/test response was submitted.

Local measurement requires explicit consent. Before/after/follow-up records include time, topic, release, question version, random cycle, confidence, self-reported action and optional campaign code. Explicit confirmation is required to link to the visitor's earlier matching pre-assessment; otherwise participation is independent. Repeated after/follow-up records do not inflate paired cycle counts. CSV export protects formula-prefixed values. Device counts are records/cycles, never unique people or global reach. No causal or clinical effect is inferred.

Central aggregation and automatic accreditation integration are future institutional steps; current central records remain in the existing form's response destination. No patient data are requested. Public-host operational logs and device voice-provider behavior remain those of their providers.

## Hosting and verification

Serve the complete folder on HTTPS, with no build/backend/paid API/CDN. All application assets and the community image are local. Installation depends on the browser; an initial complete online load is required for offline content. Official sources and the college form require a connection. Use relative paths and keep service-worker scope confined to this folder when moving to the university site.

Update the release and cache name together. Keep source, approvals and backups under institutional ownership with a named maintainer and substitute. Confirm local emergency contacts before adding them.

Software checks cover all 54 article/assessment routes, normalized Arabic search, audience filtering, bookmarks, speech text completeness and cancellation, missing Arabic voices, opt-in repeated measures, explicit cycle pairing, non-submitting feedback prefill, CSV safety, offline assets and migration. Real browser/mobile layout and audible Arabic voice quality still require device verification; no browser QA was available in this session.
