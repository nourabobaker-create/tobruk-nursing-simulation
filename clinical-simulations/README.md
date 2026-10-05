# Tobruk advanced clinical simulations — Arabic review 20261005-ar2

Ten previously delivered teaching prototypes now include a hand-authored Arabic display layer. The modules are no longer byte-for-byte copies of the first release. `manifest.json` records both the original and current SHA-256/size. CPR retains the revised clinical-figure model.

## Scope and approval
Clinical instructor approval is still pending. CPR is adult-only; infant/newborn resuscitation is not implemented. Catheterization is adult female indwelling; blood extraction is adult syringe-based; gown/diaper movements use an adult bedside model. Original clinical algorithms, answer IDs, numbers, safety qualifications and source/adaptation distinctions have not been changed by this language update.

## Arabic and English
Arabic is the default unless a saved choice or `?lang=en` selects English. The top language bar controls the whole translated interface, not just the earlier short Arabic summaries. English speech attributes remain English-only. Scene geometry is not mirrored. Learner input is not sent to a translation service. Standalone HTML includes its own locale layer and dictionary; no new network dependency is needed for translation.

Controls, instructions, rationales, scenario decisions, questions, feedback, source explanation and display labels have hand-authored Arabic entries. Technical identifiers such as V1, ECG, pH, file names and reference URLs remain recognisable. JSON exports preserve their original machine values and add a separate Arabic display view. Text exports translate known labels; learner notes remain local.

## Maintenance
Editable dictionaries and runtime are in `../simulation-language-review/`; review instructions and tests are in its README. Rebuild embedded dictionaries when changing them, update manifest hashes, and test both languages from the actual route. A display-only null guard was also added to the existing blood-extraction welcome-mode control to prevent a demo error; clinical state and scoring were untouched.

Do not treat page visits or software checks as clinical competence. No real patient/student records, font files, tracking services or central grade database were added.
