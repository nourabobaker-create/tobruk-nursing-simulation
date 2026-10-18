# تمريض من أجل المجتمع

Faculty of Nursing, Tobruk University — community health education prototype, release 0.12.3, updated 18 October 2026. The initiative has its own Google Form embedded in a contextual in-app dialog; the earlier portal-form handoff has been removed.

## Public experience

197 original Arabic topic guides. Each combines an explanation, relevant symptoms or observations, practical actions, prevention, general treatment information, avoid/seek-help advice, a real-life example, and authoritative references. The public content is plain-language community education with authoritative references. Actual contributors are credited only after participation and consent.

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
- `review-register.csv`: 197 article entries, 24 scenario entries and 12 classroom story/activity entries; human review and approval fields remain blank.
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


## Release 0.6.0: communicable disease, everyday wellbeing and recovery

Twenty new practical Arabic guides extend infectious disease education, anaemia and vitamin deficiencies, movement, and recovery after surgery, stroke, heart attack, venous clots, fractures, injuries and burns. The existing sleep, burn first-aid and two blood-donation guides are expanded. WHO health topics/fact sheets, NHS public patient information, CDC prevention resources and NIH ODS informed topic selection and section references. These are original educational summaries, not publisher-endorsed materials or faculty clinical approval.

There are 126 guides and 24 visible entry points. Burns, home recovery, anaemia/vitamins and sleep have direct icons and matching dropdown entries. Blood donation has a dedicated home feature as well as its existing icon. New illustrations, full speech text, contextual feedback and optional repeated assessments accompany the content. Previous guides, local records and survey configuration are preserved.

Software verification passed for release0.6.0: all126 article/assessment routes, 24 synchronized icons/dropdown fields, 20 new fully sourced guides, complete audio text, contextual feedback and repeated before/after/follow-up learning checks. Expanded sleep/burn/donation topics and the home blood-donation feature passed. Existing8 simulations/96 paths and40 exact-version offline entries passed regression checks. All10 new original SVG illustrations were rendered and visually inspected. Actual browser/phone layout and audible device voice quality were not tested in this release.


## Release 0.7.0: pregnancy, postnatal care and newborn examination

Twelve new guides cover pregnancy hypertension/preeclampsia, gestational diabetes, food safety/nutrition, supplements, common discomforts, maternal activity/fetal movements, physical postnatal care, Caesarean recovery, newborn clinical checks, male and female newborn care, and the first week. The content distinguishes qualified clinical examination from parental observation and never requests intimate images or home diagnostic maneuvers. Clinical source reconciliation uses WHO, NHS, RCOG and government newborn-examination guidance. All content still awaits documented faculty review.

Postpartum mental health remains in Women's Health and also appears under Pregnancy and Mother. The four newborn guides appear under both Mother and Child, with a dedicated newborn icon. Shared affiliations are supported in icon and dropdown filtering. A three-stage shortcut panel shows pregnancy, after-birth and newborn links. There are 138 guides and 25 visible entry points.

### Nurse/midwife-led education consulted for topic selection

- Institute of Health Visiting parent resources: https://ihv.org.uk/family-hub/parent-resources/ and https://ihv.org.uk/family-hub/parent-resources/pregnancy-birth-and-early-parenting/ . Public-health nurse/health-visitor education gives practical priority to early parenting, feeding, infant cues, family support and parental wellbeing.
- Health for Under 5s: https://healthforunder5s.co.uk/about-this-site/ and https://healthforunder5s.co.uk/sections/pregnancy/the-role-of-the-health-visitor/ . This NHS-owned service describes content by health visitors/other experts, accessible conversational explanations, family involvement, age/life-stage navigation and review.
- Tommy's practicing midwives: https://www.tommys.org/about-us/our-people/tommys-midwives . Named NHS midwives and specialist education informed pregnancy/postnatal question prompts.

These published examples informed navigation by life stage, family-help planning, questions to take to a visit, and explaining instructions back in one's own words. No interviews were conducted, publisher endorsement is not implied, and their text/illustrations were not copied. Local service schedules and maternity instructions take precedence over another country's programme examples.

Software verification passed: all138 article/assessment routes;25 synchronized fields;12 new fully sourced, illustrated, searchable and spoken guides;repeated before/after/follow-up checks;contextual survey;mother/woman/child shared affiliations and maternal shortcuts. Existing8 scenarios/96 paths and44 exact-version offline entries passed. All9 original new SVG illustrations were rendered and visually inspected. Actual browser/phone layout and audible device voice quality were not tested in this release.


## Release0.7.1: institutional installed-app identity

The installed application's full name is «كلية التمريض، جامعة طبرق» and short home-screen name «كلية التمريض». The PWA, favicon and Apple touch icons use the existing authentic faculty logo, with white opaque padding to keep the circular emblem safe within adaptive masks. The original160×160 WebP from branding.js is converted losslessly to PNG with identical decoded pixels and embedded in the SVG with its original source hash; PNG launch icons are rendered at192,512and180 pixels. No logo was redrawn. Versioned manifest/icon URLs refresh cached assets; application id, scope and start_url remain unchanged. Existing installed icons may refresh according to browser/OS behavior, while newly added shortcuts use the updated metadata. Content, surveys and local record keys retain their established identities.

Focused installation checks and the existing138-topic regression suite passed: full/short names, unchanged PWA identity, exact PNG dimensions, original logo source hash, Apple metadata and45 offline assets. Decoded source pixels were verified identical across the lossless WebP-to-PNG conversion, rendered launch icons were checked nonblank/opaque and visually reviewed, and important logo content fits the adaptive-mask safe area.


## Release0.7.3: installed community-awareness application name

The installed-app name is «التوعية المجتمعية — كلية التمريض، جامعة طبرق». Both name and short_name, application-name and Apple home-screen title use this full wording, so a short-name fallback no longer substitutes the faculty name alone. The public website retains its original «تمريض من أجل المجتمع» title and visible branding. The official faculty icon and stable installation identity are preserved. A phone launcher may shorten the visible text to fit its available label space.

## Release 0.8.0: iPhone guidance, 24 scenarios and Arabic library

The header install action remains visible on small screens and opens Arabic Safari/Chrome instructions when no native install event is available. Native prompts remain supported; installed standalone mode hides the header action. Apple instructions include Share, Add to Home Screen, Edit Actions and optional Open as Web App. This is web installation, not an App Store release. Real-device iPhone testing is still needed.

Added 16 original branching scenarios (24 total, 96 nodes, 192 choices, 288 terminating paths). Existing scenario IDs and versions remain unchanged. New scenes cover diabetes, stroke, heat, burns, pregnancy, newborn jaundice, dehydration, animal bites, antibiotics, postoperative clot warning signs, cast problems, eczema infection, kidney-safe medicines and sleep/driving. All have primary references, per-node source links, related articles, audio and existing optional repeat measurement. Clinical approval fields remain blank for faculty review.

The searchable Arabic library links to 24 official Arabic WHO fact sheets, grouped in seven subjects, with short original descriptions, publisher, link/language check date and an internal simplified guide. External sources and the survey require internet. No external pages are cached or copied wholesale.

Validation: node verify.cjs passes 138 guides, 24 scenarios/all 288 paths, optional records, contextual survey, Arabic library search/filter/empty states, native install/fallback and service-worker migration with 47 exact local cache URLs. Browser and physical iPhone QA were not performed in this environment.

## Release 0.9.0: brain, heart, social wellbeing and classroom reading

Added 14 plain Arabic guides (152 total) and two visible health fields (27 total): brain health, dementia/Alzheimer, Parkinson, epilepsy, seizure first aid, head injury, peripheral neuropathy, heart attack, heart failure, rhythm problems, cholesterol, child heart, child emotions and social belonging. Each has symptoms, prevention, practical care, treatment context, urgent signs, illustrated scenes, references, audio and existing optional repeated learning measures. Sources are verified; faculty clinical sign-off remains pending.

Expanded the library from 24 to 72 unique official Arabic resources, including four Arabic PDF guides/booklets from UNICEF. The mix includes mental, social, environmental, neurological and cardiac health, play, inclusion, bullying, child rights and teacher preparation. Facilitator manuals are marked for adults and preparation, not presented as preschool read-aloud stories. Age suggestions and brief descriptions are editorial guidance; official publisher endorsement is not implied. Primary sources were checked with HTTPS GET and Arabic text/PDF verification; see library-source-audit.json. PDFs are linked at publisher sites, not mirrored or copied.

Added 12 original fictional read-aloud stories with optional questions and safe activities, age guidance, teacher notes, original symbolic SVG illustrations, full story audio and print layouts. Original materials are clearly distinguished from 72 external sources and await educator review. Sources support general educational principles, not publisher authorship of the stories. No child data, diagnostic assessments, compulsory disclosures or hazardous classroom demonstrations are introduced. The existing dedicated survey repeats in a dialog with the story title context.

Library discovery now includes subject, audience and format filters, Arabic search, teacher/preschool shortcuts, combined mental/social discovery, pagination, descriptions read aloud and empty-state reset. Story text is available in the offline shell; external sources and survey require internet. Existing iPhone installation guidance, identity, logo, hero and slogan remain intact.

Validation: node verify.cjs passes 152 guides, 27 fields, 24 scenarios/288 paths, 72 official resources, four PDF types, 12 complete story routes and spoken texts, contextual repeated survey, library filters/pagination/reset and 50 exact cached local resources. Browser, printed-page and physical-device QA were not available; run educator/clinical review and real-device checks before formal approval.

## Release 0.10.0 — family, adolescents and first aid

Adds 12 guides on bullying, autism, Down syndrome, family dialogue, puberty, body image, eating concerns and ADHD, plus 10 guides on drowning, home/road/sports accidents, unconsciousness, adult/child/infant CPR, choking and poisoning. There are now 32 illustrated subject entry points, 174 guides, 90 unique external Arabic resources, six linked PDF books, 12 original classroom activities and 24 branching scenarios.

The front page explains community-health nursing and the supervised student initiative, with WHO/ICN references and professional scope boundaries. New symbolic SVG artwork supports the lessons. Critical resuscitation steps follow Resuscitation Council UK 2025 guidance; the Arabic AHA 2025 highlights are identified as a professional reference whose training protocol may differ. External emergency numbers belong to their source country. Publisher PDFs are linked, not redistributed.

All 90 library links were checked by HTTPS; new PDFs were visually inspected. Automated regression checks cover all topic routes, repeated contextual feedback, read-aloud integration, 24 scenarios/288 paths, library filters, installation fallback and 53 offline-cache files. Physical-device/browser testing and documented faculty clinical review remain pending. Source verification does not constitute clinical approval.

## Release 0.11.0 — children, first response and Tobruk access context

Adds a dedicated child-facing #kids route with ten short illustrated lessons (ages 6–12, younger with an adult) on hand hygiene, personal tools, food sharing/allergy, street-food safety, balanced food, waste, water, inclusion, head lice and cough etiquette. A separate head-lice family guide covers detection, safe treatment, repeated checks and non-stigmatizing school handling. Child lessons retain Arabic speech, contextual repeated feedback and optional repeated learning checks. Adult notes are separate from the child text.

Stroke and heart-attack guides now contain sequenced first-response actions, observation, oral-intake precautions and linked CPR. Aspirin guidance is limited to a conscious adult with suspected cardiac chest pain and appropriate safety exclusions; it is explicitly excluded from suspected stroke. Clinical review remains pending.

The initiative owner reports that ordinary access in Tobruk is direct attendance at Tobruk Medical Center accidents/emergency, rather than assuming ambulance dispatch. local-care-context.js records that supplied context and adapts generic requests for help throughout guide/scenario text. The emergency page distinguishes urgent hospital care from routine clinic access and emphasizes immediate CPR without waiting for unavailable transport. No telephone number, guaranteed service or institutional endorsement is invented. Local clinical/operational confirmation is still required.

The nursing-role introduction is shorter and centers awareness, healthy behavior and prevention, without a list of example subjects. The library now contains 98 external Arabic resources, including 12 PDF books/cards/briefs and family heat-safety reading, alongside 12 original classroom stories. Six newly linked PDFs were inspected for Arabic content and visual readability; adult-oriented manuals are labeled. All eight new resource URLs returned HTTP 200. There are 185 guides, 33 discovery fields and 55 offline files.

## Release 0.12.0 — health during work

Adds a dedicated #workers page, top navigation link, home-page feature, illustrated discovery icon, dropdown category and work audience path. Twelve original Arabic guides cover prolonged standing, taxi/professional drivers, desk setup, screen eye strain, hot work, shifts/fatigue, manual handling/patient transfer, cleaning/hairdressing, catering, noise, construction dust and psychological pressure. Three original symbolic SVG illustrations complement existing art.

Each guide includes observations, practical actions, prevention, general care, danger signs, an everyday example, focused primary-source references, Arabic read-aloud, repeated contextual feedback and optional repeated before/after/followup learning. The material emphasizes workplace controls, supervision and equipment alongside individual choices. Driver exercises are restricted to safe stops; cooling and UV protection are distinguished. Compression garments and fluid restrictions need individual assessment. No universal safe lifting weight or fixed rest schedule is invented.

The collection now has 197 guides, 34 discovery fields, 100 external Arabic library resources, 12 PDF references and 57 offline files. Two new Arabic library links returned HTTP 200 with readable Arabic. Automated route, source, related-link, audio, feedback, learning, library and offline checks passed; SVG illustrations were visually inspected. Physical-device/browser testing and documented faculty clinical review remain pending.

## Release 0.12.1 — public introduction

Clarifies intentional scientific simplification, reliable per-topic sources, community-awareness purpose, individual health differences and the absence of personal medical services. Removes pending-review wording from the current public interface. The pilot notice concerns technology, usability and repeat feedback. No clinical lesson, data collection or survey destination changed.

## Release 0.12.2 — information first

Replaces the tall hero and successive introduction panels with a compact branded image strip, four direct links, immediate search/dropdown and eight visible health icons. Remaining fields are available in a closed disclosure and the existing dropdown. Initiative, source, nursing-role and pilot details remain in a closed section after topic results and on About. No health content, feedback channel or measurement behavior changed.

## Release 0.12.3 — one readable introduction, all icons visible

Combines initiative, scientific simplification, reliable references, medical boundaries and pilot feedback into one short paragraph at a readable 0.86rem, directly before the full 34-field icon grid. Removes the extra intro panels and repeated trial strip from Home. Retains the branded image and slogan, the dropdown/search, all health content and About. No fields are hidden behind a disclosure.


## Release 0.13.0 — 18 October 2026

Community suggestions are implemented as five selected WHO developments, linked to relevant topics and collected at `#updates`; these show the publication date separately from the source-check date and are a dated snapshot, not a live feed. Global vaccine guidance does not assert local availability or replace Libya’s national programme.

Eight additional, bilingual first aid scenarios bring the total to 32 scenarios and 516 possible paths. A compact ticker links to the changes, with pause, focus/hover pause and reduced-motion support.

The English option covers all 197 guides, 34 fields, 12 original stories, all scenarios, library descriptions, interfaces, speech controls, local assessment tools and secondary plan/protocol pages. Original external Arabic resources stay labelled as Arabic. Translation is bundled locally, without an external translation service. The language choice is local; switching reloads the same route, so an unsaved practice round starts again. Existing bookmarks and saved records are retained.

The English survey posts directly, only on user submission, to the same community Google Form and response sheet. Canonical Arabic option values preserve compatibility; all displayed questions and options are English. Receipt is confirmed by Google, never inferred from an iframe load. One clearly marked technical submission was verified in the response sheet and must be excluded from participant analysis, along with the earlier technical test. Raw responses are not stored in this repository.

Functional verification covers both languages, scenario branches, source and topic links, speech selection, repeat feedback and local measurement, install fallback, offline caching and cache migration. Physical-device and visual browser QA were not performed in this environment. No named clinical reviewer or formal clinical approval is asserted by this release.
