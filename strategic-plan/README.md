# Faculty of Nursing strategic plan consultation

Nine Arabic/English screens explaining the 2026–2030 plan, with downloadable Arabic and English presentations and a link to the existing stakeholder questionnaire.

Public address:

https://nourabobaker-create.github.io/tobruk-nursing-simulation/strategic-plan/

This folder is independent of ChatGPT. It uses static HTML, local logo images and local PDFs. There is no build, login, backend or private account integration. The presentation does not collect responses; its final button opens the Google Form.

## Update this presentation

- Edit `index.html`. The bilingual content is in the `presentation-data` JSON block. Keep screen IDs, the nine-screen order and both language fields aligned.
- Keep the survey button pointed to the respondent link, currently `https://forms.gle/7hL3bUsMV7K3ZdPD7`.
- Replace `stakeholder-presentation-ar.pdf` and `stakeholder-presentation-en.pdf` when the presentations change. Retain those filenames so the download links continue to work.
- Logos are in `assets/`. Retain their filenames if replacing them.
- `?lang=en` starts the presentation in English. Links such as `#ST03` open a specific screen.

The canonical and Open Graph URL use the public address above. If the host or folder changes, update both metadata URLs. The existing `noindex` metadata keeps the consultation out of search results; people with the link can still open it.

Publish changes only inside this `strategic-plan/` folder. Existing tools and content elsewhere in the repository do not need modification.
