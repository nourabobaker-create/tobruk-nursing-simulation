# تمريض من أجل المجتمع

Faculty of Nursing, Tobruk University — community health education prototype v0.1.0, 15 October 2026.

## Status

36 original Arabic starter summaries across 12 domains. All await faculty clinical and language review. No student author, reviewer, campaign, participation count, or institutional publication approval is fabricated. Names and approvals must be entered only after actual participation and consent. The prototype is for review; official campaign launch follows the documented faculty process.

## Run and host

Serve this folder unchanged over HTTPS. No build, backend, accounts, paid service, analytics, API keys, or third-party runtime dependencies. `index.html` loads only local files; official reference links open on explicit user action. Browser support determines PWA installation. An initial complete online visit is required for offline reading; external references still require a connection.

`manifest.webmanifest` and `sw.js` use relative paths and scope `./`. Copy the complete directory to a university subdirectory, configure correct JS/JSON/webmanifest/PNG/SVG MIME types, and verify on real Android and iPhone devices. Keep service worker updates available without long-lived HTTP caching. Never broaden the service-worker scope to other university applications.

## Content and updates

- `content.js`: categories, source registry, and all 36 summaries. Each entry contains ID, domain, title, audience, key message, steps, avoid, seek-care signs, nursing role, and source keys.
- `review-register.csv`: bilingual review register, prefilled with topic identity and source links; review and approval fields are empty.
- `activity-record.csv`: empty bilingual template for aggregate campaign evaluation, paired pre/post responses, follow-up denominators, barriers, and improvement action.
- `plan.html`: printable eight-part implementation plan.
- `branding.js`: embedded original faculty and university logo assets reused from the existing faculty hub; institutional logos are not relicensed.

Publication requires subject review, plain-language review, documented approval, and a new release. Assign real student and reviewer credits only when verified, with consent. Retain approvals in the faculty's institutional records. Update `version`/`prepared` in content, the cache name in both `sw.js` and `app.js`, and test cache replacement for each release. Review every six months or earlier when guidance changes. Correct or withdraw unsafe material promptly.

Keep medicine lists, contact details, patient records, submitted drafts, and identifiable activity records out of this public repository. The on-page student form only downloads a JSON draft locally; it neither submits nor publishes. Favorites and font size remain in local storage on that browser. Hosting providers may retain their usual operational logs.

## Transfer and continuity

Maintain institutional ownership of source, domain, deployment access, review history, and backups. Name a primary maintainer and a substitute; have the substitute practice one content update and one restore. Once the university URL is adopted, make it the canonical campaign link. Confirm the local emergency number and referral route before adding either to public content.

## Validation scope

Static syntax, content schema, references, relative assets, route generation, Arabic search, categories, bookmarks, safe draft export, and service-worker offline fallback can be checked without a browser. Real mobile layout, installation, clipboard/share behavior, print layout, and first-load/offline updates require device or browser verification before official launch. Faculty review remains pending independently of these software checks.
