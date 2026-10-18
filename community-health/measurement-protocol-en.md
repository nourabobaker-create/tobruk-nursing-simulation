# Repeated follow-up for the initiative

Release 0.13.0, updated 18 October 2026. Optional measurement of understanding, confidence and behaviour is available repeatedly across the 197 topics. The initiative receives feedback through a separate Google Form inside the app's dialog. Feedback, measurement and simulations no longer redirect to the portal questionnaire.

[Return to the app](./?lang=en#students)

## Four kinds of evidence

1. An open comment, correction or suggestion at any time through the initiative's central survey.
2. One decision question specific to each topic, with a confidence rating and status of applying a step: before reading, after reading or later follow-up. Separate dated records are saved with the participant's permission, without a name, only on their device.
3. A branching simulation run with an explanation for each decision. Local saving is optional after the run ends, and runs can be repeated.
4. An activity register and improvement register: need, action, responsible person, deadline, evidence, repeat-measurement result and closure of the comment.

## Receiving feedback and local storage

The feedback icon opens a dialog specific to the 'Nursing for the Community' initiative, displaying the separate college-account Google Form 'Nursing for the Community — Pilot Experience and Suggestions Survey'. The article or scenario name is prefilled when feedback is opened from either one, and participants can correct this context. The app does not redirect participants to the portal questionnaire or the faculty complaints form.

Participants submit their response using Google Forms' 'Submit' button, and the form's confirmation appears after successful submission. Responses are received centrally in the form's Responses section. Loading the frame alone does not mean a response has arrived, and the app does not show a substitute for Google's confirmation. 'Start a new participation' reopens the same form with the current context; the fallback link opens the same separate form when needed. The form needs an internet connection, and the new interface does not save a local response instead of submitting it.

All questions are optional. The form does not request names or email addresses, require sign-in or limit participants to one response. Do not include patient names or personal health information. The survey is not a channel for consultation or emergency help. Participation can be repeated after a new topic, experience or change.

Local survey answers from earlier releases remain available for export only and are not automatically transferred to the new form. Before-reading, after-reading and follow-up measurements and simulation-run records remain on the device with the participant's permission. They are not sent to Google Forms or automatically linked to central survey answers. Any future central receipt of these measurements requires a separate, documented institutional mechanism.

One technical verification response was successfully submitted on 15 October 2026, labelled 'Technical test — survey connection 0.5.3 — exclude from analysis'. Google showed its Arabic receipt confirmation, 'Your participation has arrived…', and the context and technical text actually appeared in the Responses tab, which showed one response. Rating questions were left blank so they would not enter their denominators. Exclude this response from analysis of community opinions. The test establishes submission of the form and receipt of its response; it did not test the embedded app interface or phone interface in an actual browser. Complete software verification passed separately.

## Definition of local measurement data

Each measurement has a random record identifier, time, topic, release, assessment, cycle, stage, score (0 or 1), confidence (1 to 3), behavior (plan/done/notyet/notrelevant) and an optional campaign code. The data contains no identity, diagnosis or medical history.

Each before-reading participation starts a new cycle. An after-reading or follow-up participation is linked, only when the participant confirms it follows their earlier answer, to the latest before-reading measurement matching the topic, release, question and activity code on the device within 30 days, if one exists. If none exists, it remains unpaired and is excluded from before-and-after comparisons. Summaries use the latest answer for each stage in a cycle, so repeats do not inflate the number of pairs. A cycle does not mean a unique person or establish a representative sample.

Change in answer accuracy = the percentage correct after reading minus the percentage correct before reading, in paired cycles only, expressed in percentage points. Do not interpret the result as a causal effect: seeing the answer, repeating the question and changes in participants can influence it. Confidence and reported behaviour are self-reported. No clinical outcome or community coverage is measured.

Measurement records retain the topic identifier and question version needed to understand the result, without showing the answer during the before-reading measurement. Any later central calculation requires matching the question version to an authorised answer key and a documented receiving mechanism; no such channel is currently active for measurements. Records contain no identity number or medical data. Local CSV export protects values that could be interpreted as formulas.

## Suggested schedule

After each activity: check the completeness of the record, participation count and indicator denominator. After two weeks: optional follow-up of one behaviour. Monthly: classify comments, fix the priority issue and measure again. Each term: a brief report showing the sample, limitations and the action changed in response to evidence.

Measurement and run exports are available from the device's follow-up page. The central survey alone does not create an institutional measurement dashboard or automatic accreditation-system integration. When combining local exports later, preserve record identifiers, stage, release and denominators, and control duplication without equating records with people. The responsible person records the type of comment, action and result. Individual responses or a public summary are not automatically published on the website.

## Branching simulations

The release contains 32 branching scenarios (516 possible paths). The path changes according to the choice, with an explanation appearing immediately before continuing. Choices remain in memory during the run and are written to persistent storage only with explicit consent on the results page. Leaving or reloading loses an unsaved run. There is no timer and no need to perform any real-life experiment.

Simulations are saved in a separate register from article questions. Each run has an identifier, time, scenario identifier and version, app release, optional activity code, run type (practice or later return), and an ordered list of node and choice identifiers with a safe-decision flag and major-risk flag. No names, illnesses, nationalities or residency statuses are requested. Pressing save again for the same run does not create another record; repeating the scenario starts a new run.

The app links a run to the latest matching run within 30 days only if the participant states that they are the same person, with matching scenario, scenario version, app release and activity code. This is self-report, not identity verification. An unlinked run stays independent. The app does not assume that the same device means the same person.

The result appears as a number of safe decisions out of the decisions the participant made along their path, with an explanatory review. There is no competency certificate or ranking. Someone choosing an incorrect action may pass through an additional recovery node, so do not compare percentages directly between paths or scenarios. Repeating after an explanation is practice, not an independent measure of the initiative's impact. For analysis by scenario and node, use the same scenario version and report the denominator, path and linked runs.

Each row of a simulation CSV export is one decision. Count runs using distinct attempt_id values, not row counts, and do not treat runs as unique people. Run records are available for local export and are not sent to the portal form or the new central form. A separate comment about a scenario can be submitted through the central survey; only the scenario context is prefilled, without the run record or answers.

## Pilot survey

The central form has six optional questions:

1. The topic or scenario being evaluated.
2. Clarity of the information or scenario explanation.
3. Usefulness of the information or practical step.
4. Ease of reading, navigation and app use.
5. Criticism, comments, corrections or technical problems.
6. A topic or idea proposed for addition or improvement.

One rating, comment or suggestion is enough. Community evaluation does not establish medical accuracy, which needs specialist review. A person can participate repeatedly after different experiences or topics. Do not combine survey responses with understanding measurements or simulation runs based on the device or submission time.

The analyst records this form's version and collection dates as `community-pilot-v3-google-form` in the analysis file. This is an analytical identifier, not a claim that an automatic field with that name exists in Google's response. Historical local exports retain an instrument field: the default value is `community-pilot-v1`, or `community-pilot-v2-contextual` for the previous contextual participation. Old records and the new form are different instruments and collection sources. Do not merge them without explaining differences in questions, context and receipt mechanism, or assume that a new response continues an old local record.

When summarising clarity, usefulness and usability, show the number of answers used and the denominator of each percentage. Exclude blank answers and options indicating insufficient experience or inability to assess from the relevant rating denominator. Response counts represent participations, not unique people, and do not establish health or causal impact. Exclude the labelled technical verification response and similar tests from community results. Google Forms exports do not pass through the app's CSV protection; treat free text as data when opening it in spreadsheet software.

For continuous improvement: classify issues as technical, clarity, content or suggestions. Assign a responsible person, action and deadline, then repeat the task and request another participation after the change. Preserve question version, release, context and denominator when comparing. Document when central receipt was activated, its settings, the successful submission test and its coverage limits before including its results in any report. The form belongs to the college account, and access to and management of responses is the authorised team's responsibility. Do not display individual responses on the public site.

## Historical record of content expansion 0.4.0

That release included 91 topics; 21 materials were added and the diabetes and blood pressure introductions were expanded. Topic questions retain optional, repeatable measurement stages. Do not merge comparisons with earlier releases, especially when the question or explanation changes. The insulin calculation example is fixed and educational. The system does not collect personal readings to calculate a dose or assess whether someone can adjust their medicine. Review content safety, the equation's wording, warnings and audience understanding before any official launch.

## English summary

Release 0.5.3 introduced a separate college-owned Google Form for community-health feedback inside a contextual app dialog. Its six optional questions cover context, clarity, usefulness, usability, criticism/corrections/technical problems, and ideas. It requires no name, email question, sign-in or one-response limit. Submission and confirmation use Google Forms itself; iframe loading is not receipt. New participation reloads the same dedicated form, and the fallback link opens that form rather than the portal questionnaire. The online form receives feedback centrally; historical local feedback remains exportable only.

Before/after/follow-up topic assessments and simulation runs remain separately consented local records. They are not automatically uploaded or linked to central feedback. Paired comparisons require matching topic, release, question, campaign and cycle. Counts are records/cycles or form participations, not unique people; behavioural outcomes are self-reported, and no causal or clinical effect is inferred. On 15 October 2026, one labelled technical response was submitted, Google showed its Arabic receipt confirmation, and the context and technical text appeared in Responses. Ratings were left blank, and this test must be excluded from community analysis. Complete software verification also passed; the embedded app interface and phone layout have not yet received actual browser/device testing. Institutional aggregation of local measurements and accreditation-system integration remain later steps.


## Language and assessment version
New assessment and simulation records include the interface language. Assessment identifiers include the language code, and simulation linkage does not join rounds in different languages. Older records without a language field do not establish equivalence to the new translation. Explain language differences before combining results.
