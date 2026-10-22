/* Annual work helper. Personal task marks stay in this browser and never enter analytics. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const allowedPhases = ['prepare', 'semester', 'assessment', 'semester-close', 'year-review'];
  const allowedRoles = ['employee', 'registrar', 'administration', 'student-affairs', 'exams', 'clinical-training', 'ta', 'faculty', 'qa'];
  const statusIds = ['plan', 'doing', 'done'];
  const storageKey = 'nur-workguide-personal-v1';
  const text = {
    ar: {
      skip: 'انتقل إلى المحتوى', university: 'جامعة طبرق', facultyLogo: 'كلية التمريض', faculty: 'كلية التمريض، جامعة طبرق', portal: 'بوابة الكلية', back: 'مساحتي المهنية',
      eyebrow: 'عمل أوضح، خطوة بخطوة', title: 'دليلي العملي خلال العام', lead: 'مرجع يساعدك على ترتيب العمل، ومعرفة مسؤولياتك وما تحتاجه في كل مرحلة.', calendar: 'يرتبط التوقيت بالتقويم الأكاديمي ومواعيد العمل المعتمدة في الكلية.',
      loading: 'نجهّز لك الدليل العملي…', errorTitle: 'تعذّر تحميل الدليل', errorText: 'حاول مرة أخرى لعرض الأدوار ومهامها. يمكنك أيضًا العودة إلى مساحتك المهنية.', retry: 'إعادة المحاولة',
      chooseRole: 'ما دوري في الكلية؟', roleHint: 'اختر الدور الأقرب لعملك؛ يمكنك تغييره في أي وقت.', myResponsibility: 'مسؤوليتي ببساطة', yearEyebrow: 'نظرة على العام', yearTitle: 'في أي مرحلة أعمل الآن؟', allPhases: 'كل المراحل', yearPhases: 'مراحل العام', allDescription: 'اختر مرحلة لترى ما يرتبط بها، أو تصفّح مهام العام معًا.',
      tasksEyebrow: 'على قدر حاجتك', tasksTitle: 'مهامي وخطواتي', searchLabel: 'ابحث في مهام هذا الدور', searchPlaceholder: 'مثل: التسجيل أو التقرير', howTitle: 'كيف أستفيد من هذا الدليل؟', howText: 'اختر دورك ومرحلة العام، ثم افتح تفاصيل المهمة حين تحتاجها. يمكنك ترتيب خطواتك بعلامات شخصية تُحفظ في هذا المتصفح؛ ويكفي الاحتفاظ بمخرجات عملك المعتادة.',
      localNote: 'اختر علامة إن أحببت؛ اضغطها مرة أخرى لإزالتها. تُحفظ في هذا المتصفح فقط.', emptyTitle: 'لنجرب بحثًا آخر', emptyText: 'لا توجد مهام تطابق اختيارك. جرّب كلمة أقصر أو اعرض كل المراحل.', resetFilters: 'عرض مهام الدور كلها',
      details: 'تفاصيل تساعدني', what: 'لماذا تفيدني هذه الخطوة؟', when: 'متى؟', with: 'مع من أتعاون؟', keep: 'ما يكفيني حفظه', personal: 'علامتي الشخصية · اختياري', plan: 'أرتّب له', doing: 'أعمل عليه', done: 'أنجزته', statusSet: 'حُفظت علامتك في هذا المتصفح.', statusCleared: 'أُزيلت علامتك الشخصية.', storageError: 'تعذّر الحفظ في هذا المتصفح؛ تبقى العلامات ظاهرة خلال هذه الزيارة.',
      referenceEyebrow: 'حين تحتاج إلى المزيد', referencesTitle: 'مرجعي في العمل', referenceLead: 'للتفاصيل والصلاحيات والإجراءات الكاملة، ارجع إلى الدليل المرتبط بدورك.', openPdf: 'فتح ملف PDF', noSources: 'ارجع إلى الأدلة والإجراءات المعتمدة المرتبطة بتكليفك.', updated: 'تحديث المحتوى: ', footer: 'كلية التمريض، جامعة طبرق · خطوات صغيرة تدعم جودة العمل', staffGroup: 'الموظفون والأدوار الإدارية', academicGroup: 'المعيدون وأعضاء هيئة التدريس', count: (n, all) => `${n} من ${all} مهام في هذا الدور`, step: n => `مرحلة ${n}`
    },
    en: {
      skip: 'Skip to content', university: 'University of Tobruk', facultyLogo: 'Faculty of Nursing', faculty: 'Faculty of Nursing, University of Tobruk', portal: 'Faculty portal', back: 'My professional space',
      eyebrow: 'Clearer work, one step at a time', title: 'My work through the year', lead: 'A practical reference to organise your work, understand your responsibilities and find what you need at each stage.', calendar: 'Timing follows the faculty’s approved academic calendar and work schedule.',
      loading: 'Preparing your work guide…', errorTitle: 'The guide could not load', errorText: 'Try again to see the roles and their tasks. You can also return to your professional space.', retry: 'Try again',
      chooseRole: 'What is my role?', roleHint: 'Choose the role closest to your work; you can change it at any time.', myResponsibility: 'My responsibility, simply', yearEyebrow: 'A view of the year', yearTitle: 'Which stage am I working on?', allPhases: 'All stages', yearPhases: 'Stages of the year', allDescription: 'Choose a stage to see its tasks, or browse the year’s tasks together.',
      tasksEyebrow: 'As much as you need', tasksTitle: 'My tasks and next steps', searchLabel: 'Search tasks for this role', searchPlaceholder: 'For example: registration or report', howTitle: 'How can I use this guide?', howText: 'Choose your role and a stage of the year, then open a task’s details when you need them. Optional personal marks help you organise your steps in this browser; your usual work outputs are enough to keep.',
      localNote: 'Choose a personal mark if helpful; press it again to remove it. Marks stay in this browser only.', emptyTitle: 'Let’s try another search', emptyText: 'No tasks match this selection. Try a shorter term or show all stages.', resetFilters: 'Show all tasks for this role',
      details: 'Helpful details', what: 'Why does this step help?', when: 'When?', with: 'Who do I work with?', keep: 'What is enough to keep?', personal: 'My personal mark · optional', plan: 'Planning', doing: 'Working on it', done: 'Done', statusSet: 'Your personal mark was saved in this browser.', statusCleared: 'Your personal mark was removed.', storageError: 'This browser could not save your marks; they remain visible during this visit.',
      referenceEyebrow: 'When you need more', referencesTitle: 'My work reference', referenceLead: 'For full responsibilities, authority and procedures, use the guide relevant to your role.', openPdf: 'Open PDF', noSources: 'Refer to the approved guides and procedures relevant to your assignment.', updated: 'Content updated: ', footer: 'Faculty of Nursing, University of Tobruk · Small steps support quality work', staffGroup: 'Staff and administrative roles', academicGroup: 'Teaching assistants and faculty', count: (n, all) => `${n} of ${all} tasks for this role`, step: n => `Stage ${n}`
    }
  };
  const phaseIcons = {
    prepare: '<path d="M6 5h12v16H6zM9 3h6v4H9zm0 9h6m-6 4h4"/>',
    semester: '<path d="M3 5c4-1 7 0 9 2 2-2 5-3 9-2v14c-4-1-7 0-9 2-2-2-5-3-9-2V5Zm9 2v14"/>',
    assessment: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="m8 9 2 2 5-5m-7 9h8m-8 3h5"/>',
    'semester-close': '<path d="M4 7h16v14H4zM3 3h18v4H3zm6 10 2 2 4-4"/>',
    'year-review': '<path d="M19 7a8 8 0 1 0 1 8M19 3v5h-5m-6 8 3-4 3 2 4-5"/>'
  };
  const statusIcons = {
    plan: '<path d="M5 5h14v16H5zM8 3v4m8-4v4M8 12h8m-8 4h5"/>',
    doing: '<path d="M12 3a9 9 0 1 0 9 9M12 7v5l3 2m1-11h5v5m-5 0 5-5"/>',
    done: '<path d="m5 12 4 4L20 5M20 12v7H4V4h10"/>'
  };
  let data = null, roleId = 'employee', phaseId = 'all', lang = 'ar', lastMeasuredRole = '';
  let marks = {}, storageFailed = false, openDetails = new Set();
  const initial = new URLSearchParams(location.search);
  lang = initial.get('lang') === 'en' ? 'en' : 'ar';
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
      Object.entries(saved).slice(0, 1000).forEach(([key, value]) => {
        if (/^[a-z0-9-]+:[A-Za-z0-9][A-Za-z0-9_-]*$/.test(key) && statusIds.includes(value)) marks[key] = value;
      });
    }
  } catch (_) { storageFailed = true; }

  function t(key) { return text[lang][key]; }
  function localized(value) { return value && typeof value === 'object' ? String(value[lang] || value.ar || value.en || '') : ''; }
  function node(tag, className, value) {
    const result = document.createElement(tag);
    if (className) result.className = className;
    if (value !== undefined) result.textContent = value;
    return result;
  }
  function svg(paths) {
    const result = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    result.setAttribute('viewBox', '0 0 24 24');
    result.setAttribute('aria-hidden', 'true');
    result.innerHTML = paths; // Only fixed, locally authored SVG strings are passed here.
    return result;
  }
  function currentRole() { return data?.roles.find(role => role.id === roleId); }
  function phaseById(id) { return data.phases.find(phase => phase.id === id); }
  function recordRole() {
    // Fixed role IDs only. Personal marks and search terms never reach this API.
    if (window.PortalMetrics?.record('section_view', `workguide:${roleId}:role`, 'faculty')) lastMeasuredRole = roleId;
  }
  function seedRoleMeasurement() {
    if (window.PortalMetricsCore?.preference() === 'off') { lastMeasuredRole = ''; return; }
    if (data && lastMeasuredRole !== roleId) recordRole();
  }
  function metrics(el, event, id) { el.dataset.metricsEvent = event; el.dataset.metricsItem = id; }
  function selectedFromUrl() {
    const params = new URLSearchParams(location.search);
    lang = params.get('lang') === 'en' ? 'en' : 'ar';
    const audience = ['staff', 'ta', 'faculty'].includes(params.get('audience')) ? params.get('audience') : 'staff';
    const fallback = audience === 'staff' ? 'employee' : audience;
    roleId = data.roles.some(role => role.id === params.get('role')) ? params.get('role') : fallback;
    if (!data.roles.some(role => role.id === roleId)) roleId = data.roles[0].id;
    phaseId = allowedPhases.includes(params.get('phase')) ? params.get('phase') : 'all';
  }
  function updateUrl(replace) {
    const url = new URL(location.href);
    url.searchParams.set('role', roleId);
    url.searchParams.set('audience', currentRole()?.audience || 'staff');
    url.searchParams.set('lang', lang);
    if (phaseId === 'all') url.searchParams.delete('phase'); else url.searchParams.set('phase', phaseId);
    try { history[replace ? 'replaceState' : 'pushState']({}, '', url); } catch (_) { /* The guide remains usable without history access. */ }
  }
  function applyLanguage() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = `${t('title')} | ${t('faculty')}`;
    document.querySelector('meta[name="description"]').content = t('lead');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => { el.alt = t(el.dataset.i18nAlt); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    $('languageButton').textContent = lang === 'ar' ? 'English' : 'العربية';
    $('languageButton').lang = lang === 'ar' ? 'en' : 'ar';
    $('languageButton').setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    const requestedAudience = initial.get('audience') || initial.get('role');
    const audience = currentRole()?.audience || (['ta', 'faculty'].includes(requestedAudience) ? requestedAudience : 'staff');
    const hubUrl = `../?role=${audience}&lang=${lang}`;
    ['hubLink', 'errorHubLink'].forEach(id => { $(id).href = hubUrl; });
    $('brandLink').href = `../../?lang=${lang}`;
    if (data) render();
  }
  function renderRoles() {
    const select = $('roleSelect');
    select.replaceChildren();
    ['staff', 'academic'].forEach(group => {
      const roles = data.roles.filter(role => group === 'staff' ? role.audience === 'staff' : role.audience !== 'staff');
      if (!roles.length) return;
      const optgroup = node('optgroup');
      optgroup.label = t(group === 'staff' ? 'staffGroup' : 'academicGroup');
      roles.forEach(role => { const option = node('option', '', localized(role.title)); option.value = role.id; optgroup.append(option); });
      select.append(optgroup);
    });
    select.value = roleId;
    const role = currentRole();
    $('roleTitle').textContent = localized(role.title);
    $('roleResponsibility').textContent = localized(role.responsibility);
    $('roleIntro').textContent = localized(role.intro);
  }
  function renderPhases() {
    const path = $('yearPath');
    path.replaceChildren();
    data.phases.forEach((phase, index) => {
      const button = node('button', 'phase-button');
      button.type = 'button';
      button.dataset.phase = phase.id;
      button.setAttribute('aria-pressed', String(phase.id === phaseId));
      button.setAttribute('aria-label', `${t('step')(index + 1)}: ${localized(phase.title)}`);
      button.setAttribute('aria-controls', 'tasks');
      metrics(button, 'section_view', `workguide:${roleId}:phase:${phase.id}`);
      const icon = node('span', 'phase-icon'); icon.append(svg(phaseIcons[phase.id]));
      const label = node('span');
      const indexText = node('span', 'phase-index', `${String(index + 1).padStart(2, '0')}`); indexText.setAttribute('aria-hidden', 'true');
      label.append(indexText, node('span', 'phase-label', localized(phase.title)));
      button.append(icon, label);
      path.append(button);
    });
    $('allPhases').setAttribute('aria-pressed', String(phaseId === 'all'));
    metrics($('allPhases'), 'section_view', `workguide:${roleId}:phase:all`);
    $('phaseDescription').textContent = phaseId === 'all' ? t('allDescription') : localized(phaseById(phaseId).description);
  }
  function markKey(task) { return `${roleId}:${task.id}`; }
  function setMark(task, selected, group) {
    const key = markKey(task);
    const next = marks[key] === selected ? '' : selected;
    if (next) marks[key] = next; else delete marks[key];
    let saved = false;
    try { localStorage.setItem(storageKey, JSON.stringify(marks)); storageFailed = false; saved = true; } catch (_) { storageFailed = true; }
    group.querySelectorAll('button').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.status === next)); });
    $('storageMessage').textContent = storageFailed ? t('storageError') : '';
    $('statusAnnouncement').textContent = saved ? t(next ? 'statusSet' : 'statusCleared') : t('storageError');
  }
  function makeCard(task) {
    const card = node('article', 'task-card');
    const titleId = `task-${roleId}-${task.id}`;
    card.setAttribute('aria-labelledby', titleId);
    const head = node('div', 'task-card-head');
    head.append(node('span', 'task-phase', localized(phaseById(task.phase).title)));
    const title = node('h3', '', localized(task.title)); title.id = titleId;
    const timing = node('p', 'task-timing');
    timing.append(svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'), node('span', '', localized(task.when)));
    const details = node('details', 'task-details');
    details.open = openDetails.has(markKey(task));
    details.append(node('summary', '', t('details')));
    const definitions = node('dl');
    [['what', 'purpose'], ['when', 'when'], ['with', 'with'], ['keep', 'keep']].forEach(([label, field]) => {
      definitions.append(node('dt', '', t(label)), node('dd', '', localized(task[field])));
    });
    details.append(definitions);
    details.addEventListener('toggle', () => { if (details.open) openDetails.add(markKey(task)); else openDetails.delete(markKey(task)); });
    const status = node('fieldset', 'personal-status');
    const legend = node('legend', '', t('personal'));
    const taskName = node('span', 'sr-only', `: ${localized(task.title)}`); legend.append(taskName);
    const options = node('div', 'status-options');
    statusIds.forEach(id => {
      const button = node('button', 'status-button'); button.type = 'button'; button.dataset.status = id;
      button.setAttribute('aria-pressed', String(marks[markKey(task)] === id));
      button.setAttribute('aria-label', `${t(id)}: ${localized(task.title)}`);
      button.append(svg(statusIcons[id]), node('span', '', t(id)));
      // This control intentionally has no metrics attributes and calls no metrics API.
      button.addEventListener('click', () => setMark(task, id, options));
      options.append(button);
    });
    status.append(legend, options);
    card.append(head, title, timing, details, status);
    return card;
  }
  function normalize(value) { return value.toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f\u064b-\u065f\u0670]/g, '').replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه'); }
  function renderTasks() {
    const role = currentRole();
    const query = normalize($('taskSearch').value.trim());
    const tasks = role.tasks.filter(task => (phaseId === 'all' || task.phase === phaseId) && (!query || normalize(['title', 'purpose', 'when', 'with', 'keep'].map(key => localized(task[key])).join(' ')).includes(query)));
    $('tasks').replaceChildren(...tasks.map(makeCard));
    $('emptyTasks').hidden = tasks.length > 0;
    $('taskCount').textContent = t('count')(tasks.length, role.tasks.length);
    $('storageMessage').textContent = storageFailed ? t('storageError') : '';
  }
  function safePdfUrl(value) {
    if (typeof value !== 'string' || !value) return '';
    try {
      const url = new URL(value, location.href);
      if (url.origin === location.origin && /\/professional-development\/guides\/[^/]+\.pdf$/i.test(url.pathname)) return url.href;
    } catch (_) { /* A reference without a valid local PDF is shown as text. */ }
    return '';
  }
  function renderSources() {
    const list = $('sources'); list.replaceChildren();
    const role = currentRole();
    (role.sources || []).forEach((source, index) => {
      const href = safePdfUrl(source.url);
      const item = node(href ? 'a' : 'div', 'source-link');
      if (href) { item.href = href; item.setAttribute('aria-label', `${localized(source.title)} · ${t('openPdf')}`); metrics(item, 'resource_open', `workguide:${roleId}:reference:${index + 1}`); }
      const content = node('span'); content.append(node('strong', '', localized(source.title)), node('small', '', localized(source.section)));
      item.append(content);
      if (href) item.append(node('span', 'pdf-label', 'PDF'));
      list.append(item);
    });
    if (!role.sources?.length) list.append(node('p', 'muted', t('noSources')));
    const date = /^\d{4}-\d{2}-\d{2}$/.test(data.updated || '') ? new Date(`${data.updated}T12:00:00Z`) : null;
    $('updated').textContent = date && !Number.isNaN(date.getTime()) ? t('updated') + date.toLocaleDateString(lang === 'ar' ? 'ar-LY-u-nu-latn' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : '';
  }
  function render() { renderRoles(); renderPhases(); renderTasks(); renderSources(); seedRoleMeasurement(); }
  function choosePhase(id) {
    phaseId = id;
    updateUrl(false);
    // Keep the clicked phase control in place so keyboard focus is preserved.
    document.querySelectorAll('[data-phase]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.phase === phaseId)); });
    $('allPhases').setAttribute('aria-pressed', String(phaseId === 'all'));
    $('phaseDescription').textContent = phaseId === 'all' ? t('allDescription') : localized(phaseById(phaseId).description);
    renderTasks();
  }
  function validPair(value) { return value && typeof value.ar === 'string' && typeof value.en === 'string'; }
  function validate(raw) {
    if (!raw || !Array.isArray(raw.phases) || !Array.isArray(raw.roles) || !raw.roles.length) throw new Error('Missing work guide data');
    if (raw.phases.length !== 5 || allowedPhases.some(id => !raw.phases.some(phase => phase.id === id && validPair(phase.title) && validPair(phase.description)))) throw new Error('Invalid annual stages');
    const ids = new Set();
    for (const role of raw.roles) {
      if (!allowedRoles.includes(role.id) || ids.has(role.id) || !['staff', 'ta', 'faculty'].includes(role.audience) || !['title', 'intro', 'responsibility'].every(key => validPair(role[key])) || !Array.isArray(role.tasks) || !role.tasks.length) throw new Error('Invalid role');
      ids.add(role.id);
      const taskIds = new Set();
      for (const task of role.tasks) {
        if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(task.id) || taskIds.has(task.id) || !allowedPhases.includes(task.phase) || !['title', 'purpose', 'when', 'with', 'keep'].every(key => validPair(task[key]))) throw new Error('Invalid task');
        taskIds.add(task.id);
      }
      if (role.sources !== undefined && (!Array.isArray(role.sources) || role.sources.some(source => !validPair(source.title) || !validPair(source.section)))) throw new Error('Invalid reference');
    }
    raw.phases.sort((a, b) => allowedPhases.indexOf(a.id) - allowedPhases.indexOf(b.id));
    return raw;
  }
  async function load() {
    $('loading').hidden = false; $('loadError').hidden = true; $('workContent').hidden = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('tasks.json?v=20261022-1', { signal: controller.signal, credentials: 'same-origin' });
      if (!response.ok) throw new Error('Work guide unavailable');
      data = validate(await response.json());
      selectedFromUrl();
      updateUrl(true);
      applyLanguage();
      $('loading').hidden = true; $('workContent').hidden = false;
    } catch (_) {
      $('loading').hidden = true; $('loadError').hidden = false;
    } finally { clearTimeout(timer); }
  }
  const announcement = node('div', 'sr-only'); announcement.id = 'statusAnnouncement'; announcement.setAttribute('role', 'status'); announcement.setAttribute('aria-live', 'polite'); $('tasks').after(announcement);
  $('languageButton').addEventListener('click', () => { lang = lang === 'ar' ? 'en' : 'ar'; if (data) updateUrl(false); else { const url = new URL(location.href); url.searchParams.set('lang', lang); history.replaceState({}, '', url); } applyLanguage(); });
  $('roleSelect').addEventListener('change', () => {
    roleId = $('roleSelect').value; phaseId = 'all'; $('taskSearch').value = ''; openDetails.clear();
    updateUrl(false); recordRole(); applyLanguage();
    $('roleSelect').focus();
  });
  $('yearPath').addEventListener('click', event => { const button = event.target.closest('[data-phase]'); if (button) choosePhase(button.dataset.phase); });
  $('allPhases').addEventListener('click', () => choosePhase('all'));
  $('taskSearch').addEventListener('input', renderTasks);
  $('resetFilters').addEventListener('click', () => { $('taskSearch').value = ''; choosePhase('all'); $('taskSearch').focus(); });
  $('retryButton').addEventListener('click', load);
  window.addEventListener('popstate', () => { if (!data) return; selectedFromUrl(); $('taskSearch').value = ''; openDetails.clear(); applyLanguage(); });
  function watchMeasurementChoice() {
    const widget = document.querySelector('[data-portal-metrics-widget]');
    if (widget && typeof MutationObserver === 'function') new MutationObserver(seedRoleMeasurement).observe(widget, { childList: true, subtree: true });
    seedRoleMeasurement();
  }
  document.addEventListener('visibilitychange', seedRoleMeasurement);
  window.addEventListener('storage', event => { if (event.key === 'nur-portal-metrics-choice-v1') seedRoleMeasurement(); });
  if (document.readyState === 'loading' || document.readyState === 'interactive') document.addEventListener('DOMContentLoaded', watchMeasurementChoice, { once: true }); else watchMeasurementChoice();
  applyLanguage();
  load();
})();
