# Clinical placement scenarios

100 bilingual topics in ten placement areas, with ten topics in each area. The original thirteen topics have been extended in place; their stable links still work.

Each topic includes six evolving core decisions and two separately authored final challenges. The learner sees one challenge: a transfer challenge if every core decision was correct on the first attempt, or a recovery challenge if any core decision needed a retry. There are 800 authored decision scenes; a learner reviews seven in one completed visit to a topic. Every choice has its own explanation. Completion represents a private learning review, not demonstrated clinical competence.

Areas: communication and safe practice; paediatrics; orthopaedics and mobility; maternity; infection prevention and procedures; medical and older-person care; perioperative care; neonatal care; cardiac care and monitoring; emergency and deterioration.

## Sources and scope

Every topic lists at least two exact source pages, their publishers, access dates and the principles they support. Cases and dialogue are original educational writing. Clinical references support observation, safety, communication and escalation; professional references support consent, student supervision and documentation. References do not establish local policies or permissions. Actual tasks follow placement protocols, the assigned supervisor and the learner's demonstrated preparation.

The scenarios avoid independent prescribing, dose calculations, device-setting changes and claims of diagnostic certainty. They complement practical simulations and supervised clinical learning. They are not emergency care instructions for unsupervised use.

## Learner behaviour and privacy

- Complete Arabic and English interfaces; shared simulation-language preference.
- Filter by ten placement areas and study year; search either language from either interface.
- Deterministic option reordering, corrective feedback and retry before progressing.
- An adaptive final challenge, a seven-decision review and an optional private reflection.
- Answers, progress, route selection and reflection exist only in current-page memory, resetting on reload. Reflection is not stored in local storage.
- Existing optional portal metrics receive only topic start/completion and topic ID under the existing consent control. Choices, scores, challenge variants and reflection text are never passed to metrics.
- Learner-initiated English scene audio uses browser speech support.

## Maintenance and validation

The six `content/*.json` files are the authored source. Run `python clinical-simulations/scenarios/build.py` from the repository root after editing them. Use `--check` to verify that the browser data file matches its sources. Keep all topic IDs stable.

Run `node clinical-simulations/scenarios/tests/engine.cjs` for the production renderer/state checks. Run `node clinical-simulations/scenarios/tests/browser.cjs` with Playwright/Chromium available. The test uses synthetic local sessions and blocks external requests. It exercises both final-challenge routes for every topic, corrective retries, completion, language changes, reset behaviour, source lists, filters, privacy-related metric payloads and 390px layouts. Existing portal metric tests and original simulation-source provenance checks remain applicable.
