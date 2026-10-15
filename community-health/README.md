# تمريض من أجل المجتمع

Faculty of Nursing, Tobruk University — community health education prototype, release 0.5.4, updated 15 October 2026. The initiative has its own Google Form embedded in a contextual in-app dialog; the earlier portal-form handoff has been removed.

## Public experience

106 original Arabic topic guides. Each combines an explanation, relevant symptoms or observations, practical actions, prevention, general treatment information, avoid/seek-help advice, a real-life example, and authoritative references. All guides await documented faculty review; real authors/reviewers are credited only after actual participation and consent.

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
- `survey-config.js`: dedicated public Google Form URL and the question key used to prefill the article or scenario context.
- `survey.js`: retained historical local-survey records, instrument-version tracking, summaries and formula-safe CSV export. New feedback uses the dedicated Google Form.
- `health-hubs.js`: 20 visible illustrated entry points and matching dropdown selections, search aliases and related guides.
- `art.js`, `environment-art.js`, `clinical-art.js`: original SVG drawings, including 14 new environmental illustrations.
- `scenario-data.js`, `simulation.js`: eight branching scenarios and a separate opt-in run record model.
- `measure.js`: opt-in local repeated measurement, explicit cycle linkage, summaries and safe CSV export.
- `sw.js`: scoped offline cache; previous app cache is migrated while unrelated caches remain untouched.
- `measurement-protocol.md`: feedback reception, local measurement consent and pairing rules, limitations, exports and requirements for later institutional quality integration.
- `review-register.csv`: 106 article entries plus 8 scenario entries; human review and approval fields remain blank.
- `activity-record.csv`, `improvement-register.csv`: blank bilingual institutional work registers.
- `plan.html`: original eight-week plan (v0.1 historical starting plan); `style.css` remains for that page. `app.js` is an unused baseline retained for reference. The public app does not load it.

## Feedback and repeated measurement

The feedback icon opens a survey dialog within this application, specifically for «تمريض من أجل المجتمع». It embeds the separate Google Form «تمريض من أجل المجتمع — استبيان التجربة والمقترحات», owned by the college account. Opening it from an article or simulation prefills that context. Its six optional questions cover the topic/scenario, clarity, practical usefulness, ease of use, criticism/corrections/technical problems, and proposed ideas. Participants can contribute repeatedly, without a name, email question, sign-in requirement or one-response limit.

The participant submits through Google Forms' own «إرسال» button and sees Google's confirmation after a successful submission. Google Forms holds these feedback responses centrally; the app does not claim delivery when the iframe merely loads. A new-participation button reloads the same dedicated form with the current context. The fallback link opens that same form, never the portal questionnaire. The embedded survey requires an internet connection. The new local-save feedback interface has been removed; earlier local records remain available for local export only.

The central form and the historical local survey are separate datasets. Historical records and CSV exports retain their `instrument` field: `community-pilot-v1` or `community-pilot-v2-contextual`. The dedicated six-question form is a new instrument, `community-pilot-v3-google-form`; record its version and collection dates in institutional analysis. Do not combine these instruments without explaining their different questions, contexts and reception methods. One technical test response, labelled «اختبار تقني — ربط الاستبيان 0.5.3 — يستبعد من التحليل», was submitted on 15 October 2026. Google displayed the Arabic receipt confirmation and the form's Responses view showed the context and technical text. Rating questions were left blank. Exclude this response from community analysis.

Local measurement requires explicit consent. Before/after/follow-up records include time, topic, release, question version, random cycle, confidence, self-reported action and optional campaign code. Explicit confirmation is required to link to the visitor's earlier matching pre-assessment; otherwise participation is independent. Repeated after/follow-up records do not inflate paired cycle counts. CSV export protects formula-prefixed values. Device counts are records/cycles, never unique people or global reach. No causal or clinical effect is inferred.

Central reception applies only to the six-question feedback form. Before/after/follow-up assessments and simulation runs remain on the device, with no automatic transfer to Google Forms or association with feedback responses. Existing responses in the portal/faculty complaint form remain a separate dataset. Institutional aggregation of local measurements and automatic accreditation integration are future steps. No patient data are requested. Public-host, Google Forms and device voice-provider behavior remain those of their providers.

Run software verification with `node community-health/verify.cjs` from the repository root.

## Hosting and verification

Serve the complete folder on HTTPS, with no build/backend/paid API/CDN. All application assets and the community image are local. Installation depends on the browser; an initial complete online load is required for offline content. External official sources and the embedded Google Form require a connection; educational content and the existing local measurement/export tools can work offline after caching. Use relative paths and keep service-worker scope confined to this folder when moving to the university site.

Update the release and cache name together. Keep source, approvals and backups under institutional ownership with a named maintainer and substitute. Confirm local emergency contacts before adding them.

The complete software verification passed for release 0.5.3, including the 96 article/assessment routes, contextual survey URL, preserved article/simulation progress, repeated participation, existing local measurement and historical export behavior, eight scenario graphs and offline assets. A real Google Form submission and its receipt in Responses were separately verified on 15 October 2026 using the labelled technical response described above. This verifies the form's sending and reception; the embedded application interface and phone layout have not yet been tested in a real browser/device. Audible Arabic voice quality also needs device verification. Iframe loading alone is not evidence of central receipt.


## Branching scenarios

The eight scenarios cover home sharps, cleaner fumes, rodent droppings, produce washing, construction debris, blood donation, respectful migrant health communication, and conserving water while protecting hygiene. A choice changes the next node; incorrect initial choices lead to a distinct recovery node. Feedback is immediate, with no timer or physical experiment. Each scenario has its own version and primary references. All scenarios await documented faculty review.

Routes: `#simulations` lists the library and `#sim=sharps-at-home` opens one scenario. Current-stage text and choices can use the existing Arabic speech controls. Moving to the next decision stops any previous speech. Results review the chosen path with explanations and related articles.

A run stays in memory until the participant explicitly consents to local saving at completion. Results can be replayed and saved again as a new run. Saving the same run twice is idempotent. Optional repeat linkage requires the participant's explicit same-person declaration, and matches scenario/version/release/campaign within 30 days. It is never inferred from the device. A separate CSV contains one row per decision with a unique attempt ID; counts are attempts/decisions, not unique people. Branch lengths vary, so results are not directly comparable across paths. No certification or clinical eligibility is inferred. Run records can be exported locally. The previous faculty-form handoff has been removed; simulation runs are not centrally received or synchronized. Optional feedback about a scenario uses the separate central form and prefills only its context, not the run record.


## Historical release 0.4.0 discovery and clinical education

The home screen exposes diabetes, blood pressure, kidney disease, gout, women's health, mental health and addiction as illustrated adjacent buttons, while retaining the dropdown and collapsible everyday audience paths. Icon selection synchronizes the dropdown, clears conflicting audience/search filters, and moves to results. Full teaching sections and Arabic aliases are searchable. Related guides and early diabetes shortcuts support navigation within a topic.

Insulin correction is explained with a fixed fictional arithmetic example only, using an already clinician-prescribed target and sensitivity factor in matching units. No personal dose calculator or default factor/target is provided. The education distinguishes meal insulin from correction insulin and covers active-insulin stacking, individualized timing, symptoms requiring urgent care, vomiting/diarrhea, dehydration, DKA including SGLT2-associated near-normal glucose, HHS, basal insulin and medication sick-day plans. Formula direction is explicitly isolated left-to-right within the Arabic text. Additional lesson text is included in speech.

All 96 article/assessment routes, 18 nonempty entry points, icon/dropdown synchronization, full-text Arabic search, the fixed example and spoken lesson text, related links and source keys pass software checks. Existing eight scenarios, opt-in repeated records and offline cache migration pass regression checks. Original SVG illustrations were rendered and visually inspected. Actual browser/phone layout and audible Arabic quality were unavailable for verification in this environment. All additions remain educational drafts pending documented faculty review; no professional reviewer identity is fabricated.


## Historical hero artwork 0.4.1

The headline is «بوعينا وسلوكنا الصحي، نحمي بعضنا بعضًا», supported by «نحوّل المعرفة إلى عادات صحية، ونرعى الإنسان والبيئة بروح التكافل.» The built-in image generation tool created a fictional editorial scene of a young male nurse holding an elderly man's hand as they walk together, both seen from behind without visible faces. It depicts no real participants. The website asset is `assets/community-hero-solidarity.webp` (1536×1024), compressed from the generated original. The previous image remains in the repository as historical artwork but is no longer loaded or precached by the current UI. The image is local and available in the scoped offline cache.

The asset generation prompt and provenance are recorded in `assets/community-hero-solidarity.txt`.


## Historical release 0.5.0: community trial and source transparency

The home page explains that the application is a trial for technical operation, usability, content quality/usefulness and improvement ideas. A persistent labelled speech-bubble button opens a native Arabic survey in the app. It supports repeated participation with optional ease/clarity/usefulness ratings, multiple technical issue choices, criticism/corrections and suggestions. A response may consist of a rating or a comment; no name, demographics or patient data are requested.

At release 0.5.0, preparing a response did not submit it automatically; the existing college Google Form was used as an explicit central handoff, with required fields prefilled and the visitor completing Submit there. This historical handoff has been removed from feedback, measurements and simulations. No development/test response was submitted for that historical change. Its local-record behavior used explicit unchecked-by-default consent and supported editing and repeated participation. Historical dashboard/CSV counts represent participations, not unique people, with appropriate rating denominators. Release 0.5.3 replaces new local feedback entry with the separate embedded Google Form described above; old local records remain available for export.

Every medical section exposes a readable collapsed reference disclosure. Curated mappings use “Sources for this section”; other sections clearly use the broader “Topic references” list rather than claiming precise attribution. The article header opens a full source list, including references assigned at section/lesson level. Every scenario node exposes the sources for its guidance. References are not added to spoken text, and opening an external source requires a connection. All medical content remains an educational draft awaiting faculty review.

There are now 96 articles and 20 visible health entry points. Five new topics include cited explanatory sections, real-life examples, safe care and urgent warnings; tonsillitis distinguishes common viral causes from group A streptococcal complications, and eczema includes safe broken-skin care, contaminated-water avoidance and urgent infection signs. The established hero image and first-line-of-defense headline remain unchanged.

Verification covers all routes, section/source keys, survey optional consent/upsert/repeat/reload/CSV safety, source disclosures, icon/dropdown synchronization, Arabic search and speech text, eight scenario graphs, existing repeated measures, and all offline assets. Original new SVG drawings were rendered and visually inspected. Actual browser/phone layout and audible Arabic quality remain unverified in this environment.


## Release 0.5.4: skin, sun protection and safer shared surroundings

Eight new skin guides cover acne, skin fungi, scabies, psoriasis, contact dermatitis, hives, changing skin lesions and sun protection alongside the existing eczema guide. Each includes symptoms, practical care, prevention, safe treatment information, urgent warning signs, a short assessment and readable section references. Two environment guides cover apartment littering, food waste attracting rodents, standing water in discarded containers enabling mosquitoes, and safe use and disposal of plastics. Original accessible SVG illustrations accompany the additions. Skin and environment discovery, Arabic search, speech, the contextual survey, repeated local learning measures and offline caching include all new guides.

The release contains 106 guides and 20 visible entry points. New content remains an educational draft awaiting documented faculty review; source checks do not constitute faculty approval. The hero and slogan remain as approved.

Software verification passed for release 0.5.4: all 106 article/assessment routes, the 9-guide skin field, immediate visibility of both new environment topics, natural Arabic search, all focused source links, original illustrations, complete speech text, contextual survey and repeated follow-up. Existing 8 simulations/96 paths and 36 offline entries passed. New SVG illustrations were rendered and visually inspected. Actual browser/phone layout and audible device voices were not verified in this release.
