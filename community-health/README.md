# تمريض من أجل المجتمع

Faculty of Nursing, Tobruk University — community health education prototype 0.4.1, 15 October 2026.

## Public experience

91 original Arabic topic guides. Each combines an explanation, relevant symptoms or observations, practical actions, prevention, general treatment information, avoid/seek-help advice, a real-life example, and authoritative references. All guides await documented faculty review; real authors/reviewers are credited only after actual participation and consent.

The home page introduces the students' community service and self-funded voluntary effort, with an AI-generated illustrative community scene (not real students/patients). Original lightweight SVG drawings illustrate each topic. Everyday audience paths, Arabic search, favorites, print/share, larger text and device Arabic speech are available. Speech requires an available Arabic voice; local/offline and remote voices depend on the device. It never silently substitutes an English voice. Navigation stops speech.

The home-kit checklist can be repeated and is stored locally. No fixed water intake or patient-specific medication dose is generated.

## Files

- `index.html`, `style-v2.css`, `app-v2.js`: current application.
- `content.js`: baseline content and reference registry; obsolete nursing-role fields are not displayed by v2.
- `rich-content.js`: topic expansions, 18 added topics, audience paths and current feedback configuration.
- `community-extension.js`: 16 practical environmental/community guides with primary references and two audience paths.
- `diabetes-content.js`: expanded diabetes overview and seven linked adult guides covering daily care, portion misconceptions, correction education, sick days/dehydration, hypoglycemia, feet and activity/follow-up.
- `common-health.js`: 14 additional kidney/gout/women/addiction/mental guides and expanded blood-pressure care.
- `health-hubs.js`: 18 visible illustrated entry points and matching dropdown selections, search aliases and related guides.
- `art.js`, `environment-art.js`, `clinical-art.js`: original SVG drawings, including 14 new environmental illustrations.
- `scenario-data.js`, `simulation.js`: eight branching scenarios and a separate opt-in run record model.
- `measure.js`: opt-in local repeated measurement, explicit cycle linkage, summaries and safe CSV export.
- `sw.js`: scoped offline cache v0.4.1; previous app cache is migrated while unrelated caches remain untouched.
- `measurement-protocol.md`: meaning, consent, pairing rules, limitations, central sharing and later quality integration.
- `review-register.csv`: 91 article entries plus 8 scenario entries; human review and approval fields remain blank.
- `activity-record.csv`, `improvement-register.csv`: blank bilingual institutional work registers.
- `plan.html`: original eight-week plan (v0.1 historical starting plan); `style.css` remains for that page. `app.js` is an unused baseline retained for reference. The public app does not load it.

## Feedback and repeated measurement

Feedback uses the college's existing public feedback Google Form, observed at its actual public URL; this release does not create or modify that form. All its mandatory fields are prefilled appropriately. Topic feedback and optional repeated measurements open a human-readable Arabic draft tagged for the community initiative. Only the visitor pressing Submit in Google Forms completes central submission. There is no background POST or fabricated delivery confirmation. No development/test response was submitted.

Local measurement requires explicit consent. Before/after/follow-up records include time, topic, release, question version, random cycle, confidence, self-reported action and optional campaign code. Explicit confirmation is required to link to the visitor's earlier matching pre-assessment; otherwise participation is independent. Repeated after/follow-up records do not inflate paired cycle counts. CSV export protects formula-prefixed values. Device counts are records/cycles, never unique people or global reach. No causal or clinical effect is inferred.

Central aggregation and automatic accreditation integration are future institutional steps; current central records remain in the existing form's response destination. No patient data are requested. Public-host operational logs and device voice-provider behavior remain those of their providers.

Run software verification with `node community-health/verify.cjs` from the repository root.

## Hosting and verification

Serve the complete folder on HTTPS, with no build/backend/paid API/CDN. All application assets and the community image are local. Installation depends on the browser; an initial complete online load is required for offline content. Official sources and the college form require a connection. Use relative paths and keep service-worker scope confined to this folder when moving to the university site.

Update the release and cache name together. Keep source, approvals and backups under institutional ownership with a named maintainer and substitute. Confirm local emergency contacts before adding them.

Software checks cover all 91 article/assessment routes, normalized Arabic search, audience filtering, bookmarks, speech text completeness and cancellation, missing Arabic voices, opt-in repeated measures, explicit cycle pairing, non-submitting feedback prefill, CSV safety, offline assets and migration. Real browser/mobile layout and audible Arabic voice quality still require device verification; no browser QA was available in this session.


## Branching scenarios

The eight scenarios cover home sharps, cleaner fumes, rodent droppings, produce washing, construction debris, blood donation, respectful migrant health communication, and conserving water while protecting hygiene. A choice changes the next node; incorrect initial choices lead to a distinct recovery node. Feedback is immediate, with no timer or physical experiment. Each scenario has its own version and primary references. All scenarios await documented faculty review.

Routes: `#simulations` lists the library and `#sim=sharps-at-home` opens one scenario. Current-stage text and choices can use the existing Arabic speech controls. Moving to the next decision stops any previous speech. Results review the chosen path with explanations and related articles.

A run stays in memory until the participant explicitly consents to local saving at completion. Results can be replayed and saved again as a new run. Saving the same run twice is idempotent. Optional repeat linkage requires the participant's explicit same-person declaration, and matches scenario/version/release/campaign within 30 days. It is never inferred from the device. A separate CSV contains one row per decision with a unique attempt ID; counts are attempts/decisions, not unique people. Branch lengths vary, so results are not directly comparable across paths. No certification or clinical eligibility is inferred. Explicit central sharing uses the existing faculty form tagged NUR_COMMUNITY_SIMULATION, with no background transmission.


## Release 0.4.0 discovery and clinical education

The home screen exposes diabetes, blood pressure, kidney disease, gout, women's health, mental health and addiction as illustrated adjacent buttons, while retaining the dropdown and collapsible everyday audience paths. Icon selection synchronizes the dropdown, clears conflicting audience/search filters, and moves to results. Full teaching sections and Arabic aliases are searchable. Related guides and early diabetes shortcuts support navigation within a topic.

Insulin correction is explained with a fixed fictional arithmetic example only, using an already clinician-prescribed target and sensitivity factor in matching units. No personal dose calculator or default factor/target is provided. The education distinguishes meal insulin from correction insulin and covers active-insulin stacking, individualized timing, symptoms requiring urgent care, vomiting/diarrhea, dehydration, DKA including SGLT2-associated near-normal glucose, HHS, basal insulin and medication sick-day plans. Formula direction is explicitly isolated left-to-right within the Arabic text. Additional lesson text is included in speech.

All 91 article/assessment routes, 18 nonempty entry points, icon/dropdown synchronization, full-text Arabic search, the fixed example and spoken lesson text, related links and source keys pass software checks. Existing eight scenarios, opt-in repeated records and offline cache migration pass regression checks. Original SVG illustrations were rendered and visually inspected. Actual browser/phone layout and audible Arabic quality were unavailable for verification in this environment. All additions remain educational drafts pending documented faculty review; no professional reviewer identity is fabricated.


## Hero artwork 0.4.1

The headline is «بوعينا وسلوكنا الصحي، نحمي بعضنا بعضًا», supported by «نحوّل المعرفة إلى عادات صحية، ونرعى الإنسان والبيئة بروح التكافل.» The built-in image generation tool created a fictional editorial scene of a young male nurse holding an elderly man's hand as they walk together, both seen from behind without visible faces. It depicts no real participants. The website asset is `assets/community-hero-solidarity.webp` (1536×1024), compressed from the generated original. The previous image remains in the repository as historical artwork but is no longer loaded or precached by the current UI. The image is local and available in the scoped offline cache.

The asset generation prompt and provenance are recorded in `assets/community-hero-solidarity.txt`.
