(() => {
  'use strict';

  const data = window.TOBRUK_ASSESSMENT_WEIGHTS ?? {};
  const courses = new Map((data.courses ?? []).map(course => [course.id, course]));
  const rendered = new WeakMap();
  const labels = {
    ar: {
      title: 'التقييم والنجاح', pass: 'حد النجاح المرجعي', current: 'الوارد في توصيف المقرر',
      suggested: 'توزيع قيد المراجعة', guide: 'نموذج دليل الوزارة', pending: 'قيد المراجعة',
      missing: 'أوزان هذا المقرر غير متاحة حاليًا.',
      notice: 'تُطبّق الأوزان المعتمدة التي أعلنها أستاذ المقرر للطلبة.',
      ministry: 'دليل كليات التمريض · المادة 21',
    },
    en: {
      title: 'Assessment and pass mark', pass: 'Reference pass mark', current: 'In the course specification',
      suggested: 'Distribution under review', guide: 'Ministry guide model', pending: 'Under review',
      missing: 'Assessment weights for this course are currently unavailable.',
      notice: 'Use the approved weights announced to students by the course instructor.',
      ministry: 'Nursing Faculties Guide · Article 21',
    },
  };

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content) node.textContent = content;
    return node;
  }

  function distribution(items, title, pendingLabel, lang) {
    if (!items?.length) return null;
    const block = element('section', 'course-assessment-distribution');
    if (pendingLabel) block.classList.add('course-assessment-pending');
    const heading = element('h4', '', title);
    if (pendingLabel) heading.append(element('span', 'course-assessment-status', pendingLabel));
    const list = element('dl', 'course-assessment-list');
    for (const {label, weight} of items) {
      const row = element('div');
      const amount = element('dd', '', `${weight}%`);
      amount.dir = 'ltr';
      row.append(element('dt', '', label[lang]), amount);
      list.append(row);
    }
    block.append(heading, list);
    return block;
  }

  function render(container, courseId, lang = document.documentElement.lang) {
    lang = lang === 'en' ? 'en' : 'ar';
    const words = labels[lang];
    if (rendered.get(container)?.courseId === courseId && rendered.get(container)?.lang === lang) return;
    rendered.set(container, {courseId, lang});

    const course = courses.get(courseId);
    const card = element('section', 'course-assessment-card');
    card.lang = lang;
    card.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const title = element('h3', '', words.title);
    title.tabIndex = -1;
    card.append(title);
    if (!course) {
      card.append(element('p', 'course-assessment-note', words.missing));
      container.replaceChildren(card);
      return;
    }

    const pass = element('p', 'course-assessment-pass', words.pass + ' ');
    const mark = element('bdi', '', `${course.passMark}/100`);
    mark.dir = 'ltr';
    pass.append(mark, ' · ' + course.classification[lang]);
    card.append(pass);

    const main = element('div', 'course-assessment-distributions');
    const currentPending = ['reviewer-recorded','reviewer-pending','course-specific','verify'].includes(course.statusKey) && Boolean(course.currentLabel);
    const current = distribution(course.current, course.currentLabel?.[lang] || words.current, currentPending ? words.pending : '', lang);
    const suggested = distribution(course.suggested, course.suggestedLabel?.[lang] || words.suggested, words.pending, lang);
    if (current) main.append(current);
    if (suggested) main.append(suggested);
    card.append(main);

    if (course.note?.[lang]) card.append(element('p', 'course-assessment-note', course.note[lang]));
    const guide = distribution(course.guide, course.guideLabel?.[lang] || words.guide, '', lang);
    if (guide) {
      const details = element('details', 'course-assessment-guide');
      details.append(element('summary', '', words.guide), guide);
      card.append(details);
    }
    const notice = element('p', 'course-assessment-note', words.notice);
    if (data.ministryUrl?.startsWith('https://')) {
      const source = element('a', '', words.ministry);
      source.href = data.ministryUrl;
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      notice.append(' ', source);
    }
    card.append(notice);
    container.replaceChildren(card);
  }

  function mount() {
    for (const host of document.querySelectorAll('[data-course-assessment]')) {
      const lang = host.lang || document.documentElement.lang;
      render(host, host.dataset.courseAssessment, lang);
    }
  }

  window.TobrukCourseAssessment = {render};
  const main = document.querySelector('main') || document.body;
  new MutationObserver(mount).observe(main, {childList: true, subtree: true, attributes: true, attributeFilter: ['lang']});
  new MutationObserver(mount).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
  mount();

  if (new URLSearchParams(location.search).get('assessment') === '1') {
    const id = location.hash.slice(1);
    window.requestAnimationFrame(() => {
      const host = [...document.querySelectorAll('[data-course-assessment]')].find(node => node.dataset.courseAssessment === id);
      const title = host?.querySelector('h3');
      title?.focus({preventScroll: true});
      host?.scrollIntoView({block: 'start'});
    });
  }
})();
