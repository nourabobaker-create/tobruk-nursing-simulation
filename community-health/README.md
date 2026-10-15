# تمريض من أجل المجتمع

Faculty of Nursing, Tobruk University — community health education prototype, updated 15 October 2026. The initiative has its own contextual in-app survey; the earlier portal-form handoff has been removed.

## Public experience

96 original Arabic topic guides. Each combines an explanation, relevant symptoms or observations, practical actions, prevention, general treatment information, avoid/seek-help advice, a real-life example, and authoritative references. All guides await documented faculty review; real authors/reviewers are credited only after actual participation and consent.

The home page introduces the students' community service and self-funded voluntary effort, with an AI-generated illustrative community scene (not real students/patients). Original lightweight SVG drawings illustrate each topic. Everyday audience paths, Arabic search, favorites, print/share, larger text and device Arabic speech are available. Speech requires an available Arabic voice; local/offline and remote voices depend on the device. It never silently substitutes an English voice. Navigation stops speech.

The home-kit checklist can be repeated and is stored locally. No fixed water intake or patient-specific medication dose is generated.

## Files

- `index.html`, `style-v2.css`, `app-v2.js`: current application.
- `content.js`: baseline content and reference registry; obsolete nursing-role fields are not displayed by v2.
- `rich-content.js`: topic expansions, 18 added topics and audience paths. Earlier general college-form configuration is not a current response channel.
- `community-extension.js`: 16 practical environmental/community guides with primary references and two audience paths.
- `diabetes-content.js`: expanded diabetes overview and seven linked adult guides covering daily care, portion misconceptions, correction education, sick days/dehydration, hypoglycemia, feet and activity/follow-up.
- `common-health.js`: 14 additional kidney/gout/women/addiction/mental guides and expanded blood-pressure care.
- `conditions-update.js`, `condition-art.js`: five practical illustrated topics (PCOS, childhood tonsillitis, migraine, sinusitis, eczema and broken-skin contamination).
- `source-sections.js`: curated source mapping for individual article sections and all scenario nodes, with honest topic-level fallback for unmapped sections.
- `survey.js`: validated opt-in local repeated trial-survey records, upsert, instrument-version tracking, summaries and formula-safe CSV.
- `health-hubs.js`: 20 visible illustrated entry points and matching dropdown selections, search aliases and related guides.
- `art.js`, `environment-art.js`, `clinical-art.js`: original SVG drawings, including 14 new environmental illustrations.
- `scenario-data.js`, `simulation.js`: eight branching scenarios and a separate opt-in run record model.
- `measure.js`: opt-in local repeated measurement, explicit cycle linkage, summaries and safe CSV export.
- `sw.js`: scoped offline cache; previous app cache is migrated while unrelated caches remain untouched.
- `measurement-protocol.md`: meaning, consent, pairing rules, limitations, local downloads/exports and the requirements for later central reception and quality integration.
- `review-register.csv`: 96 article entries plus 8 scenario entries; human review and approval fields remain blank.
- `activity-record.csv`, `improvement-register.csv`: blank bilingual institutional work registers.
- `plan.html`: original eight-week plan (v0.1 historical starting plan); `style.css` remains for that page. `app.js` is an unused baseline retained for reference. The public app does not load it.

## Feedback and repeated measurement

The feedback icon opens a survey dialog within this application, specifically for «تمريض من أجل المجتمع». Opening it from an article or simulation preserves that context. The questions address clarity, usefulness, use difficulties, corrections and suggestions rather than the portal's general questionnaire. Participants can contribute repeatedly.

Feedback, topic measurements and simulation runs no longer hand responses to the portal/faculty complaint form. Participation is optional; saving a survey response on the device requires explicit consent through an unchecked required checkbox. A response can be downloaded only after saving; local CSV exports are also available. Saving or downloading does not deliver a response to the faculty. No central receiving channel is enabled until a dedicated initiative channel is connected and verified. There is no background POST or fabricated delivery confirmation. No development/test response was submitted, and no Google Form was created or modified for this change.

Survey records and CSV exports carry an `instrument` field identifying the question set. Earlier records default to `community-pilot-v1`; new contextual responses use `community-pilot-v2-contextual`. Preserve this distinction when comparing results, and do not combine the two versions without explaining their question/context differences.

Local measurement requires explicit consent. Before/after/follow-up records include time, topic, release, question version, random cycle, confidence, self-reported action and optional campaign code. Explicit confirmation is required to link to the visitor's earlier matching pre-assessment; otherwise participation is independent. Repeated after/follow-up records do not inflate paired cycle counts. CSV export protects formula-prefixed values. Device counts are records/cycles, never unique people or global reach. No causal or clinical effect is inferred.

Central reception, aggregation and automatic accreditation integration are future institutional steps. The current application creates no central response records. Existing records held by another college form are separate from this application's current local records. No patient data are requested. Public-host operational logs and device voice-provider behavior remain those of their providers.

Run software verification with `node community-health/verify.cjs` from the repository root.

## Hosting and verification

Serve the complete folder on HTTPS, with no build/backend/paid API/CDN. All application assets and the community image are local. Installation depends on the browser; an initial complete online load is required for offline content. External official sources require a connection; the survey dialog and local save/download tools remain within the application. Use relative paths and keep service-worker scope confined to this folder when moving to the university site.

Update the release and cache name together. Keep source, approvals and backups under institutional ownership with a named maintainer and substitute. Confirm local emergency contacts before adding them.

The earlier release's software checks covered all 96 article/assessment routes, normalized Arabic search, audience filtering, bookmarks, speech text completeness and cancellation, missing Arabic voices, opt-in repeated measures, explicit cycle pairing, non-submitting feedback prefill, CSV safety, offline assets and migration. The removed form-prefill pathway is historical and does not describe the current survey. Current software checks passed for contextual dialog opening/closing, preserved article and simulation progress, repeat participation, consent, update/reload, storage failure, instrument versioning, downloads/exports and absence of portal-form links; the full 96-article, eight-scenario and offline asset checks also passed. Real browser/mobile layout and audible Arabic voice quality still require device verification; no browser QA was available in this session.


## Branching scenarios

The eight scenarios cover home sharps, cleaner fumes, rodent droppings, produce washing, construction debris, blood donation, respectful migrant health communication, and conserving water while protecting hygiene. A choice changes the next node; incorrect initial choices lead to a distinct recovery node. Feedback is immediate, with no timer or physical experiment. Each scenario has its own version and primary references. All scenarios await documented faculty review.

Routes: `#simulations` lists the library and `#sim=sharps-at-home` opens one scenario. Current-stage text and choices can use the existing Arabic speech controls. Moving to the next decision stops any previous speech. Results review the chosen path with explanations and related articles.

A run stays in memory until the participant explicitly consents to local saving at completion. Results can be replayed and saved again as a new run. Saving the same run twice is idempotent. Optional repeat linkage requires the participant's explicit same-person declaration, and matches scenario/version/release/campaign within 30 days. It is never inferred from the device. A separate CSV contains one row per decision with a unique attempt ID; counts are attempts/decisions, not unique people. Branch lengths vary, so results are not directly comparable across paths. No certification or clinical eligibility is inferred. Run records can be exported locally. The previous faculty-form handoff has been removed; no central receiving channel or automatic synchronization is enabled.


## Historical release 0.4.0 discovery and clinical education

The home screen exposes diabetes, blood pressure, kidney disease, gout, women's health, mental health and addiction as illustrated adjacent buttons, while retaining the dropdown and collapsible everyday audience paths. Icon selection synchronizes the dropdown, clears conflicting audience/search filters, and moves to results. Full teaching sections and Arabic aliases are searchable. Related guides and early diabetes shortcuts support navigation within a topic.

Insulin correction is explained with a fixed fictional arithmetic example only, using an already clinician-prescribed target and sensitivity factor in matching units. No personal dose calculator or default factor/target is provided. The education distinguishes meal insulin from correction insulin and covers active-insulin stacking, individualized timing, symptoms requiring urgent care, vomiting/diarrhea, dehydration, DKA including SGLT2-associated near-normal glucose, HHS, basal insulin and medication sick-day plans. Formula direction is explicitly isolated left-to-right within the Arabic text. Additional lesson text is included in speech.

All 96 article/assessment routes, 18 nonempty entry points, icon/dropdown synchronization, full-text Arabic search, the fixed example and spoken lesson text, related links and source keys pass software checks. Existing eight scenarios, opt-in repeated records and offline cache migration pass regression checks. Original SVG illustrations were rendered and visually inspected. Actual browser/phone layout and audible Arabic quality were unavailable for verification in this environment. All additions remain educational drafts pending documented faculty review; no professional reviewer identity is fabricated.


## Historical hero artwork 0.4.1

The headline is «بوعينا وسلوكنا الصحي، نحمي بعضنا بعضًا», supported by «نحوّل المعرفة إلى عادات صحية، ونرعى الإنسان والبيئة بروح التكافل.» The built-in image generation tool created a fictional editorial scene of a young male nurse holding an elderly man's hand as they walk together, both seen from behind without visible faces. It depicts no real participants. The website asset is `assets/community-hero-solidarity.webp` (1536×1024), compressed from the generated original. The previous image remains in the repository as historical artwork but is no longer loaded or precached by the current UI. The image is local and available in the scoped offline cache.

The asset generation prompt and provenance are recorded in `assets/community-hero-solidarity.txt`.


## Historical release 0.5.0: community trial and source transparency

The home page explains that the application is a trial for technical operation, usability, content quality/usefulness and improvement ideas. A persistent labelled speech-bubble button opens a native Arabic survey in the app. It supports repeated participation with optional ease/clarity/usefulness ratings, multiple technical issue choices, criticism/corrections and suggestions. A response may consist of a rating or a comment; no name, demographics or patient data are requested.

At release 0.5.0, preparing a response did not submit it automatically; the existing college Google Form was used as an explicit central handoff, with required fields prefilled and the visitor completing Submit there. This historical handoff has now been removed from feedback, measurements and simulations. No development/test response was submitted. The retained local-record behavior uses explicit unchecked-by-default consent, updates the same participation when editing a saved form and starts another with New participation. Local dashboard/CSV counts represent participations, not unique people, with appropriate rating denominators. The current contextual dialog provides local preparation/download/export only; no central receiving channel is enabled until a dedicated connection is established.

Every medical section exposes a readable collapsed reference disclosure. Curated mappings use “Sources for this section”; other sections clearly use the broader “Topic references” list rather than claiming precise attribution. The article header opens a full source list, including references assigned at section/lesson level. Every scenario node exposes the sources for its guidance. References are not added to spoken text, and opening an external source requires a connection. All medical content remains an educational draft awaiting faculty review.

There are now 96 articles and 20 visible health entry points. Five new topics include cited explanatory sections, real-life examples, safe care and urgent warnings; tonsillitis distinguishes common viral causes from group A streptococcal complications, and eczema includes safe broken-skin care, contaminated-water avoidance and urgent infection signs. The established hero image and first-line-of-defense headline remain unchanged.

Verification covers all routes, section/source keys, survey optional consent/upsert/repeat/reload/CSV safety, source disclosures, icon/dropdown synchronization, Arabic search and speech text, eight scenario graphs, existing repeated measures, and all offline assets. Original new SVG drawings were rendered and visually inspected. Actual browser/phone layout and audible Arabic quality remain unverified in this environment.
