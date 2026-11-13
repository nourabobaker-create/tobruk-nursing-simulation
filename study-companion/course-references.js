(() => {
  'use strict';

  const base = new URL('../e-library-v3/', document.currentScript.src);
  const courses = new Map((window.TOBRUK_COURSE_REFERENCES?.courses ?? []).map(course => [course.id, course]));
  const labels = {
    ar: {
      title: 'مراجع المقرر', library: 'مراجع هذا المقرر في المكتبة الرقمية',
      missing: 'قائمة المراجع غير متاحة حاليًا.', noLink: 'رابط مطابق غير مؤكد',
      provenance: 'تبيّن عناوين الأقسام مصدر كل مرجع، وتبيّن الروابط طريقة إتاحته.',
      noDocuments: 'لا توجد مراجع موثّقة من التوصيف أو دليل الوزارة لهذا المقرر ضمن الوثائق التي أمكن مراجعتها.',
      origin: { description: 'مراجع توصيف المقرر', ministry: 'مراجع دليل الوزارة', additional: 'مراجع إضافية', external: 'مصادر تعليمية خارجية' },
      access: { open: 'متاح مجانًا', paid: 'يتطلب شراءً أو اشتراكًا', institutional: 'الوصول عبر المؤسسة', preview: 'معاينة', unknown: 'الإتاحة غير مؤكدة' },
    },
    en: {
      title: 'Course references', library: 'View references for this course in the digital library',
      missing: 'The reference list is currently unavailable.', noLink: 'Matching link unconfirmed',
      provenance: 'Section headings identify where each reference was listed. Links show how it can be accessed.',
      noDocuments: 'The documents reviewed contained no verifiable references for this course from the course description or Ministry guide.',
      origin: { description: 'Course description references', ministry: 'Ministry guide references', additional: 'Additional references', external: 'External learning resources' },
      access: { open: 'Free access', paid: 'Purchase or subscription required', institutional: 'Institutional access', preview: 'Preview', unknown: 'Access unconfirmed' },
    },
  };

  function element(tag, text, className) {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (className) el.className = className;
    return el;
  }

  function referenceUrl(value) {
    try {
      const url = new URL(value);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  }

  function originsFor(reference) {
    return [...new Set([reference.origin, ...(reference.origins ?? [])])];
  }

  function referenceRow(reference, group, wording, lang) {
    const row = element('li', '', 'course-reference-item');
    const name = element('bdi', lang === 'en' ? (reference.titleEn || reference.title) : (reference.titleAr || reference.title));
    row.append(name);

    const otherOrigins = originsFor(reference).filter(origin => origin !== group && wording.origin[origin]);
    const details = [reference.author, reference.edition, reference.publisher, reference.isbn ? `ISBN ${reference.isbn}` : '', ...otherOrigins.map(origin => wording.origin[origin])].filter(Boolean);
    if (details.length) {
      const meta = element('p', '', 'course-reference-note');
      details.forEach((part, index) => {
        if (index) meta.append(' · ');
        meta.append(element('bdi', part, 'course-reference-detail'));
      });
      row.append(meta);
    }

    const links = element('div', '', 'course-reference-links');
    const primary = { url: reference.url, access: reference.access };
    const uniqueLinks = new Map();
    for (const option of [...(reference.links ?? []), primary]) {
      const href = referenceUrl(option.url);
      if (href && !uniqueLinks.has(href)) uniqueLinks.set(href, option);
    }
    for (const [href, option] of uniqueLinks) {
      const access = wording.access[option.access] ?? wording.access.unknown;
      const label = (lang === 'en' ? option.labelEn : option.labelAr) || option.label;
      const link = element('a', label ? `${label} · ${access}` : access);
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `${name.textContent} · ${link.textContent}`);
      links.append(link);
    }
    if (uniqueLinks.size) row.append(links);
    else row.append(element('p', wording.noLink, 'course-reference-note'));

    const note = lang === 'en' ? reference.noteEn || reference.note : reference.note;
    if (note) {
      const paragraph = element('p', note, 'course-reference-note');
      paragraph.dir = 'auto';
      row.append(paragraph);
    }
    return row;
  }

  function panelFor(id, lang) {
    const course = courses.get(id);
    const wording = labels[lang];
    const panel = element('details', '', 'course-references-panel');
    panel.dir = lang === 'ar' ? 'rtl' : 'ltr';
    panel.lang = lang;
    panel.dataset.courseReferences = id;
    panel.append(element('summary', wording.title));

    const content = element('div', '', 'course-references-content');
    const note = lang === 'en' ? course?.noteEn || course?.note : course?.note;
    const status = lang === 'en' ? course?.descriptionStatusEn || course?.descriptionStatus : course?.descriptionStatus;
    for (const value of new Set([status, note].filter(Boolean))) {
      const paragraph = element('p', value, 'course-reference-note');
      paragraph.dir = 'auto';
      content.append(paragraph);
    }
    const references = course?.references ?? [];
    if (references.length) {
      content.append(element('p', wording.provenance, 'course-reference-note'));
      const documented = references.some(reference => originsFor(reference).some(origin => origin === 'description' || origin === 'ministry'));
      if (!documented) content.append(element('p', wording.noDocuments, 'course-reference-note'));
    }
    for (const [group, title] of Object.entries(wording.origin)) {
      const rows = references.filter(reference => reference.origin === group);
      if (!rows.length) continue;
      const list = element('ul', '', 'course-reference-list');
      list.append(...rows.map(reference => referenceRow(reference, group, wording, lang)));
      content.append(element('h3', title), list);
    }
    if (!references.length) content.append(element('p', wording.missing));

    const library = element('a', wording.library, 'course-reference-library');
    library.href = new URL(`#course-references/${encodeURIComponent(id)}`, base).href;
    content.append(library);
    panel.append(content);
    return panel;
  }

  const standalone = document.querySelector('#english2-course-references');
  let current;
  function mount() {
    const staticCourse = document.querySelector('.course.active');
    const host = standalone || staticCourse?.querySelector('.courseBody') || document.querySelector('#courseView.active #courseContent .courseBody');
    const id = standalone ? 'english2' : staticCourse?.id || location.hash.slice(1);
    const lang = standalone ? (document.body.classList.contains('arabic-on') ? 'ar' : 'en') : (document.documentElement.lang === 'en' ? 'en' : 'ar');
    if (current?.parentElement === host && current?.dataset.courseReferences === id && current?.lang === lang) return;
    const wasOpen = current?.dataset.courseReferences === id && current.open;
    current?.remove();
    if (!host || !id) return;

    current = panelFor(id, lang);
    current.open = Boolean(wasOpen);
    const navigation = host.querySelector('.courseReturn');
    if (navigation) navigation.after(current);
    else host.prepend(current);
  }

  const observer = new MutationObserver(mount);
  if (standalone) observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  else observer.observe(document.querySelector('main') || document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  mount();
})();
