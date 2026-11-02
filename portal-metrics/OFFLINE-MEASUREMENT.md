# Offline companion measurements — 2026-11-02

Existing collector and automation schedules remain unchanged. New stages use the
existing resource_open event with allowlisted item identifiers in section courses:
companion-offline-v1:link, companion-offline-v1:bytes, companion-offline-v1:saved.
These are stages, not additive download counts or unique people. Historical resource
opens cannot be retrospectively classified. Retention and consent remain unchanged.
The receiver already deduplicates event IDs on retries; deliberate repeated download
attempts remain separate observations. No learner notebook data enters telemetry.

link: deliberate activation of the new button (including later cancellation).
bytes: HTTP success, complete body received, minimum size and HTML signature checked.
saved: File System Access writer successfully closed after writing. This is not an
independent audit of the filesystem. Normal browser downloads have no save completion
acknowledgement and therefore never emit saved. No claim of unique users is made.

The standalone file contains first-year first-semester content and its local scripts
and style, without remote measurement scripts. External references/other years still
need internet. Older copies are not instrumented. Optional local counting is disabled
by default; only opening counts, consent and start time are stored, expiring after
90 days. A clear/disable button removes these statistics. No synchronization exists.
File URL storage may be unavailable or isolated per file/browser. Opens do not prove
active study, time spent or educational outcomes.

Shared summary API does not expose item-level counts; the existing portal dashboard
cannot split these stages from other resource_open events. The private offline_metrics
Sheet performs that split using exact item IDs and the existing event columns; its
online interactions explicitly subtract the three stages. Existing interaction totals
on the portal continue to include all resource opens, including download stages.
Do not interpret their sum as offline beneficiaries. Source/raw tabs are untouched.

Future optional synchronization requires a separate user preview and explicit approval,
a bounded aggregate schema, batch ID, receiver deduplication and readable receipt before
marking a local batch delivered. Do not reuse opaque no-cors responses as acknowledgements.
No names, academic results, questions, notebook text, or persistent person IDs are needed.
No new automation or backend deployment is required for the implemented stages.

Validation: existing metrics tests plus offline-download.test.cjs; all network paths in
tests are mocked and do not contaminate production metrics. Tests cover cancellation,
network failure, write/close failure and both supported/fallback save paths.
