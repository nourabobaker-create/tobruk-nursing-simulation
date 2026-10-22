(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const STORAGE = 'tobruk-professional-development-v1';
  let saved = { language: 'ar', favorites: [], journal: [], progress: {} };
  try { const value = JSON.parse(localStorage.getItem(STORAGE) || 'null'); if (value && typeof value === 'object') saved = { ...saved, ...value }; } catch (_) {}
  if (!Array.isArray(saved.favorites)) saved.favorites = [];
  if (!Array.isArray(saved.journal)) saved.journal = [];
  if (!saved.progress || typeof saved.progress !== 'object' || Array.isArray(saved.progress)) saved.progress = {};
  let lang = saved.language === 'en' ? 'en' : 'ar';
  const query = new URLSearchParams(location.search);
  if (query.get('lang') === 'en' || query.get('lang') === 'ar') lang = query.get('lang');
  let role = ['staff', 'ta', 'faculty'].includes(query.get('role')) ? query.get('role') : 'staff';
  let data = null;
  let loadFailed = false;
  let shownEvents = [];
  let editId = null;
  const text = {
    ar: {
      skip: 'انتقل إلى المحتوى', facultyName: 'كلية التمريض، جامعة طبرق', hubName: 'مساحات التطوير المهني', back: 'بوابة الكلية', eyebrow: 'تعلّم يفيد عملك', guides: 'أدلتي', courses: 'التدريب والتطوير', tools: 'أدوات تفيدني', events: 'تقويم الفعاليات', journal: 'سجل تعلّمي', loading: 'جارٍ تحميل المصادر…', loadError: 'تعذّر تحميل المصادر. أعد تحميل الصفحة أو عُد إلى بوابة الكلية.', searchLabel: 'ابحث في أدلتك ومصادرك', searchPlaceholder: 'موضوع أو مهارة أو جهة…', languageLabel: 'لغة المصدر', topicLabel: 'المجال', favoritesOnly: 'المحفوظات فقط', guideHelp: 'الأدلة والوثائق المعتمدة متاحة بصيغة PDF محمية، مع بيان الإصدار وتاريخ التحديث.', courseHelp: 'تعلّم بالوتيرة التي تناسبك. تفاصيل المجانية والشهادة موضّحة في كل مصدر.', toolHelp: 'مراجع وأدوات عملية للرجوع إليها عند الحاجة.', eventHelp: 'ندوات وفعاليات مجانية عبر الإنترنت. المواعيد المعروضة بتوقيت ليبيا.', downloadCalendar: 'إضافة الفعاليات المعروضة إلى تقويمي', eventLanguage: 'لغة الفعالية', timezone: 'ليبيا · UTC+2', eventSourceNote: 'تحقّق من صفحة الجهة المنظمة قبل التسجيل؛ قد تتغير المواعيد أو شروط الحضور. تُخفى الفعاليات بعد انتهائها تلقائيًا.', officialCalendars: 'تابع تقاويم الجهات المنظمة', journalHelp: 'من التعلّم إلى التطبيق: سجّل ما تعلّمته وما تغيّر في عملك.', exportJournal: 'تصدير السجل', localNote: 'المحفوظات والسجل في هذا المتصفح على هذا الجهاز فقط، ولا يُرسلان إلى الكلية. تجنّب إدخال بيانات شخصية أو معلومات تخص الطلبة أو المرضى. صدّر سجلك للاحتفاظ بنسخة.', learningTitle: 'الدورة أو المهارة', learningDate: 'تاريخ التعلّم', learningApplication: 'ما الذي سأطبّقه؟', learningResult: 'ماذا حدث بعد التطبيق؟', saveEntry: 'حفظ في سجلي', clearLocal: 'مسح السجل والمحفوظات من هذا الجهاز', footer: 'اختيار موارد التطوير لا يُعد اعتمادًا مهنيًا للدورة. يُرجع إلى الجهة المنظمة لشروط التسجيل والشهادات.', suggest: 'اقترح مصدرًا أو أبلغ عن رابط لا يعمل', allLanguages: 'كل اللغات', ar: 'العربية', en: 'الإنجليزية', multi: 'العربية والإنجليزية', allTopics: 'كل المجالات', open: 'فتح المصدر', openGuide: 'فتح الدليل', saved: 'محفوظ', save: 'حفظ', noMatch: 'لا توجد مصادر مطابقة لهذه الخيارات. جرّب تغيير البحث أو المرشّحات.', noGuide: 'لا توجد أدلة مطابقة للخيارات الحالية.', noEvent: 'لا توجد فعاليات قادمة مطابقة للغة المختارة في القائمة الحالية. تابع تقاويم الجهات أدناه.', noCalendar: 'لا توجد تقاويم إضافية متاحة حاليًا.', register: 'التفاصيل والتسجيل', addCalendar: 'إضافة إلى التقويم', freeOnline: 'عبر الإنترنت · مجاني', checked: 'آخر تحقق', deadline: 'آخر موعد للتسجيل', deadlinePassed: 'انتهى موعد التسجيل المعلن', updated: 'آخر مراجعة للقائمة', entries: 'مواد', roleNav: 'اختر مساحتك', reference: 'مرجع إرشادي', emptyJournal: 'سجلك فارغ في هذه المساحة. أضف أول تجربة تعلّم عندما تبدأ.', entrySaved: 'حُفظت التجربة على هذا الجهاز.', entryUpdated: 'حُدّثت التجربة على هذا الجهاز.', storageError: 'تعذّر الحفظ في هذا المتصفح. صدّر السجل قبل مغادرة الصفحة.', edit: 'تعديل', delete: 'حذف', deleteConfirm: 'هل تريد حذف هذه التجربة من سجل هذا الجهاز؟', resetConfirm: 'سيُمسح سجل التعلّم والمحفوظات لجميع المساحات من هذا المتصفح. هل تريد المتابعة؟', cleared: 'مُسحت البيانات المحفوظة من هذا الجهاز.', dateUnknown: 'التاريخ غير متاح', noResult: 'لم يُسجّل بعد', count: 'المصادر', calendarNotice: 'ملف التقويم جاهز للتنزيل.', roleStaff: 'الموظفون', roleTa: 'المعيدون', roleFaculty: 'أعضاء هيئة التدريس', titleStaff: 'مساحة الموظفين', titleTa: 'مساحة المعيدين', titleFaculty: 'مساحة أعضاء هيئة التدريس', descriptionStaff: 'أدلتك ومصادر تطوير مهارات السجلات والبيانات والخدمة والتواصل؛ لتسهيل العمل اليومي وتحسين الخدمات.', descriptionTa: 'أدلتك ومصادر التدريس العملي والمهارات السريرية والبحث، مع فرص مجانية للتعلّم والتواصل العلمي.', descriptionFaculty: 'أدلتك ومصادر التدريس والتقييم والبحث والإشراف الأكاديمي، مع تقويم فرص التعلّم العلمي المجانية.'
    },
    en: {
      skip: 'Skip to content', facultyName: 'Faculty of Nursing, Tobruk University', hubName: 'Professional development spaces', back: 'Faculty Hub', eyebrow: 'Learning that helps your work', guides: 'My guides', courses: 'Learning & development', tools: 'Useful tools', events: 'Events calendar', journal: 'My learning journal', loading: 'Loading resources…', loadError: 'Resources could not be loaded. Reload this page or return to the Faculty Hub.', searchLabel: 'Search your guides and resources', searchPlaceholder: 'Topic, skill or provider…', languageLabel: 'Resource language', topicLabel: 'Topic', favoritesOnly: 'Saved resources only', guideHelp: 'Approved guides and documents are available as protected PDFs, with their version and update date.', courseHelp: 'Learn at your own pace. Each resource explains free access and certificate conditions.', toolHelp: 'Practical tools and references to return to when you need them.', eventHelp: 'Free online webinars and events. All displayed times are in Libya time.', downloadCalendar: 'Add displayed events to my calendar', eventLanguage: 'Event language', timezone: 'Libya · UTC+2', eventSourceNote: 'Check the organiser’s page before registering; dates and attendance conditions may change. Events are automatically hidden after they end.', officialCalendars: 'Follow the organisers’ calendars', journalHelp: 'From learning to practice: record what you learned and what changed in your work.', exportJournal: 'Export journal', localNote: 'Saved resources and journal entries stay in this browser on this device and are not sent to the Faculty. Avoid entering personal information or student or patient details. Export your journal to keep a copy.', learningTitle: 'Course or skill', learningDate: 'Date of learning', learningApplication: 'What will I apply?', learningResult: 'What happened after applying it?', saveEntry: 'Save to my journal', clearLocal: 'Clear this device’s journal and saved resources', footer: 'Listing a resource does not confer professional accreditation. Check the provider’s registration and certificate conditions.', suggest: 'Suggest a resource or report a broken link', allLanguages: 'All languages', ar: 'Arabic', en: 'English', multi: 'Arabic and English', allTopics: 'All topics', open: 'Open resource', openGuide: 'Open guide', saved: 'Saved', save: 'Save', noMatch: 'No resources match these options. Try another search or change the filters.', noGuide: 'No guides match the current options.', noEvent: 'No upcoming events in the selected language are in the current list. Follow the organisers’ calendars below.', noCalendar: 'No additional calendars are currently listed.', register: 'Details & registration', addCalendar: 'Add to calendar', freeOnline: 'Online · Free', checked: 'Last checked', deadline: 'Registration deadline', deadlinePassed: 'The announced registration deadline has passed', updated: 'List last reviewed', entries: 'items', roleNav: 'Choose your space', reference: 'Reference guide', emptyJournal: 'Your journal in this space is empty. Add your first learning experience when you begin.', entrySaved: 'Learning experience saved on this device.', entryUpdated: 'Learning experience updated on this device.', storageError: 'This browser could not save your data. Export your journal before leaving.', edit: 'Edit', delete: 'Delete', deleteConfirm: 'Delete this learning experience from this device’s journal?', resetConfirm: 'This will clear journal entries and saved resources for all spaces from this browser. Continue?', cleared: 'Saved data was cleared from this device.', dateUnknown: 'Date unavailable', noResult: 'Not recorded yet', count: 'Resources', calendarNotice: 'Your calendar file is ready to download.', roleStaff: 'Administrative staff', roleTa: 'Teaching assistants', roleFaculty: 'Teaching staff', titleStaff: 'Administrative staff space', titleTa: 'Teaching assistants’ space', titleFaculty: 'Teaching staff space', descriptionStaff: 'Your guides and development resources for records, data, service and communication—to support everyday work and better services.', descriptionTa: 'Your guides and resources for practical teaching, clinical skills and research, with free opportunities for learning and scientific exchange.', descriptionFaculty: 'Your guides and resources for teaching, assessment, research and academic supervision, alongside free scientific learning opportunities.'
    }
  };
  Object.assign(text.ar, { guideHelp: 'الأدلة والوثائق المعتمدة متاحة بصيغة PDF محمية، مع بيان الإصدار وتاريخ التحديث.', followLearning: 'متابعة تعلّمي · اختياري', followLearningNote: 'إقرار ذاتي يساعدك على المتابعة؛ لا يثبت شهادة أو أثرًا متحققًا. تُشارك إحصاءات التفاعل فقط إذا فعّلت القياس الاختياري.', learningStart: 'بدأت التعلّم', learningComplete: 'أكملت التعلّم', learningApply: 'طبّقت مهارة في عملي', progressRecorded: 'مسجّل' });
  Object.assign(text.en, { guideHelp: 'Approved guides and documents are available as protected PDFs, with their version and update date.', followLearning: 'My learning follow-up · optional', followLearningNote: 'Self-reported progress for follow-up; it does not verify a certificate or effect. Interaction statistics are shared only if you enable optional measurement.', learningStart: 'Started learning', learningComplete: 'Completed learning', learningApply: 'Applied a skill at work', progressRecorded: 'Recorded' });
  Object.assign(text.ar, { needs: 'احتياجي الآن', saudi: 'خبرات سعودية', pathways: 'مساراتي', workbench: 'أدوات العمل', benchmarks: 'المقارنة المرجعية', catalogue: 'مكتبة التطوير', catalogueHelp: 'اختر لغة المصدر والمجال، أو ابحث باسم المهارة.' });
  Object.assign(text.en, { needs: 'My need now', saudi: 'Saudi practices', pathways: 'My pathways', workbench: 'Work tools', benchmarks: 'Benchmarking', catalogue: 'Development library', catalogueHelp: 'Choose a resource language and topic, or search for a skill.' });
  const t = key => text[lang][key] || key;
  const pick = value => typeof value === 'string' ? value : (value?.[lang] || value?.ar || value?.en || '');
  const e = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const roleKey = value => value === 'staff' ? 'Staff' : value === 'ta' ? 'Ta' : 'Faculty';
  const roleSymbols = { staff: '▣', ta: '✦', faculty: '◈' };
  const locale = () => lang === 'ar' ? 'ar-LY-u-nu-latn' : 'en-GB';
  function persist() {
    saved.language = lang;
    try { localStorage.setItem(STORAGE, JSON.stringify(saved)); return true; } catch (_) { $('journalStatus').textContent = t('storageError'); return false; }
  }
  function safeUrl(value) { try { const url = new URL(value, location.href); return ['https:', 'http:'].includes(url.protocol) ? url.href : '#'; } catch (_) { return '#'; } }
  function dateLabel(value, options = {}) {
    const parsed = new Date(value?.length === 10 ? value + 'T12:00:00Z' : value);
    return Number.isNaN(parsed.getTime()) ? t('dateUnknown') : new Intl.DateTimeFormat(locale(), { timeZone: 'Africa/Tripoli', day: 'numeric', month: 'long', year: 'numeric', ...options }).format(parsed);
  }
  function languageOptions(select) {
    const current = select.value || 'all';
    select.innerHTML = ['all', 'ar', 'en'].map(value => `<option value="${value}">${e(t(value === 'all' ? 'allLanguages' : value))}</option>`).join('');
    select.value = ['all', 'ar', 'en'].includes(current) ? current : 'all';
  }
  function applyLanguage() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $('languageButton').textContent = lang === 'ar' ? 'English' : 'العربية';
    $('languageButton').lang = lang === 'ar' ? 'en' : 'ar';
    $('search').placeholder = t('searchPlaceholder');
    $('universityLogo').alt = lang === 'ar' ? 'جامعة طبرق' : 'Tobruk University';
    $('facultyLogo').alt = lang === 'ar' ? 'كلية التمريض' : 'Faculty of Nursing';
    $('roleNav').setAttribute('aria-label', t('roleNav'));
    $('roleNav').innerHTML = ['staff', 'ta', 'faculty'].map(value => `<a class="role-link" data-metrics-event="section_view" data-metrics-item="development:role:${value}" data-role="${value}" href="?role=${value}&amp;lang=${lang}"${value === role ? ' aria-current="page"' : ''}><span class="role-icon" aria-hidden="true">${roleSymbols[value]}</span><span>${e(t('role' + roleKey(value)))}</span></a>`).join('');
    $('roleTitle').textContent = t('title' + roleKey(role));
    $('roleDescription').textContent = t('description' + roleKey(role));
    $('roleSymbol').textContent = roleSymbols[role];
    $('events').hidden = role === 'staff';
    $('eventNav').hidden = role === 'staff';
    $('journalNumber').textContent = role === 'staff' ? '04' : '05';
    document.title = t('title' + roleKey(role)) + ' · ' + t('facultyName');
    languageOptions($('resourceLanguage'));
    languageOptions($('eventLanguage'));
    populateTopics();
    if (data) { renderResources(); renderEvents(); renderCalendars(); $('updated').textContent = t('updated') + ': ' + dateLabel(data.updated); }
    renderJournal();
    if (loadFailed) $('loadStatus').textContent = t('loadError');
    persist();
    document.dispatchEvent(new CustomEvent('development:context', { detail: { role, lang, resources: data?.resources || [], events: data?.events || [] } }));
  }
  function populateTopics() {
    const select = $('topic'); const current = select.value;
    const topics = new Map();
    (data?.resources || []).filter(item => item.roles?.includes(role)).forEach(item => { if (item.topic) topics.set(pick(item.topic), item.topic.ar || item.topic.en || item.topic); });
    select.innerHTML = `<option value="all">${e(t('allTopics'))}</option>` + [...topics.entries()].sort((a, b) => a[0].localeCompare(b[0], locale())).map(([label, value]) => `<option value="${e(value)}">${e(label)}</option>`).join('');
    select.value = [...select.options].some(option => option.value === current) ? current : 'all';
  }
  function resourceMatches(item) {
    if (!item.roles?.includes(role)) return false;
    const language = $('resourceLanguage').value;
    if (language !== 'all' && item.language !== 'multi' && item.language !== language) return false;
    const topic = $('topic').value;
    if (topic && topic !== 'all' && (item.topic?.ar || item.topic?.en || item.topic) !== topic) return false;
    if ($('favoritesOnly').checked && !saved.favorites.includes(item.id)) return false;
    const needle = $('search').value.trim().toLocaleLowerCase();
    return !needle || [pick(item.title), item.title?.ar, item.title?.en, pick(item.description), item.description?.ar, item.description?.en, item.provider, pick(item.topic)].join(' ').toLocaleLowerCase().includes(needle);
  }
  function learningFollowup(item) {
    if (item.kind !== 'course') return '';
    const choices = [['start', 'activity_start', 'learningStart'], ['complete', 'activity_complete', 'learningComplete'], ['apply', 'activity_complete', 'learningApply']];
    return `<details class="access"><summary>${e(t('followLearning'))}</summary><p>${e(t('followLearningNote'))}</p><div class="card-actions">${choices.map(([phase, event, label]) => {
      const key = role + ':' + item.id + ':' + phase, done = saved.progress[key] === true;
      return `<button type="button" class="small-button" data-progress="${phase}" data-progress-resource="${e(item.id)}" data-metrics-event="${event}" data-metrics-item="development:${role}:learning-${phase}:${e(item.id)}"${done ? ' disabled' : ''}>${e(t(label))}${done ? ' ✓ ' + e(t('progressRecorded')) : ''}</button>`;
    }).join('')}</div></details>`;
  }
  function cardHtml(item) {
    const isSaved = saved.favorites.includes(item.id);
    let resourceUrl = safeUrl(item.url);
    if (item.kind === 'guide' && resourceUrl !== '#') {
      const guideUrl = new URL(resourceUrl);
      if (guideUrl.origin === location.origin && !/\.pdf$/i.test(guideUrl.pathname)) { guideUrl.searchParams.set('lang', lang); guideUrl.searchParams.set('role', role); resourceUrl = guideUrl.href; }
    }
    return `<article class="card"><div class="card-top"><span class="badge">${e(t(item.language || 'multi'))}</span><button type="button" class="save-button" data-save="${e(item.id)}" aria-pressed="${isSaved}" aria-label="${e((isSaved ? t('saved') : t('save')) + ': ' + pick(item.title))}"><span aria-hidden="true">${isSaved ? '★' : '☆'}</span> ${e(isSaved ? t('saved') : t('save'))}</button></div><h3>${e(pick(item.title))}</h3>${item.kind === 'guide' ? `<span class="badge guide-status">${e(item.status ? pick(item.status) : t('reference'))}</span>` : ''}<span class="provider">${e(item.provider)}</span><p>${e(pick(item.description))}</p>${item.access ? `<div class="access">${e(pick(item.access))}</div>` : ''}<div class="card-actions"><a class="card-link" data-metrics-event="resource_open" data-metrics-item="development:${role}:${e(item.id)}" href="${e(resourceUrl)}" target="_blank" rel="noopener noreferrer">${e(t(item.kind === 'guide' ? 'openGuide' : 'open'))} <span aria-hidden="true">↗</span></a></div>${learningFollowup(item)}</article>`;
  }
  function renderResources() {
    if (!data) return;
    const selected = data.resources.filter(resourceMatches);
    [['guide', 'guideCards', 'guideCount'], ['course', 'courseCards', 'courseCount'], ['tool', 'toolCards', 'toolCount']].forEach(([kind, id, count]) => {
      const list = selected.filter(item => item.kind === kind);
      $(id).innerHTML = list.length ? list.map(cardHtml).join('') : `<div class="empty">${e(t(kind === 'guide' ? 'noGuide' : 'noMatch'))}</div>`;
      $(count).textContent = t('count') + ': ' + list.length;
    });
  }
  function eventTime(event) {
    const opts = { timeZone: 'Africa/Tripoli', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' };
    const fmt = new Intl.DateTimeFormat(locale(), opts);
    const startDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Tripoli' }).format(new Date(event.start));
    const endDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Tripoli' }).format(new Date(event.end));
    return startDay === endDay ? `${fmt.format(new Date(event.start))} – ${fmt.format(new Date(event.end))}` : `${dateLabel(event.start)} ${fmt.format(new Date(event.start))} – ${dateLabel(event.end)} ${fmt.format(new Date(event.end))}`;
  }
  function renderEvents() {
    if (!data) return;
    const language = $('eventLanguage').value;
    const now = Date.now();
    shownEvents = (data.events || []).filter(event => Number.isFinite(Date.parse(event.start)) && Number.isFinite(Date.parse(event.end)) && Date.parse(event.end) > now && (language === 'all' || event.language === language || event.language === 'multi')).sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
    $('downloadCalendar').disabled = !shownEvents.length;
    $('downloadCalendar').dataset.metricsEvent = 'resource_open';
    $('downloadCalendar').dataset.metricsItem = 'development:' + role + ':calendar:filtered-list';
    $('eventCards').innerHTML = shownEvents.length ? shownEvents.map(event => {
      const start = new Date(event.start);
      const day = new Intl.DateTimeFormat(locale(), { timeZone: 'Africa/Tripoli', day: 'numeric' }).format(start);
      const month = new Intl.DateTimeFormat(locale(), { timeZone: 'Africa/Tripoli', month: 'short', year: 'numeric' }).format(start);
      const pastDeadline = event.registrationDeadline && new Date(event.registrationDeadline + 'T23:59:59+02:00').getTime() < now;
      return `<article class="event-card"><div class="date-block"><div class="day">${e(day)}</div><div class="month">${e(month)}</div></div><div class="event-body"><h3>${e(pick(event.title))}</h3><div class="provider">${e(event.provider)}</div><p class="event-time"><time datetime="${e(event.start)}">${e(dateLabel(event.start))} · ${e(eventTime(event))}</time></p><div class="event-meta"><span class="badge">${e(t(event.language || 'multi'))}</span><span class="badge">${e(t('freeOnline'))}</span></div><p class="event-note">${e(pick(event.freeNote))}</p>${event.registrationDeadline ? `<p class="deadline">${e(pastDeadline ? t('deadlinePassed') : t('deadline'))}: ${e(dateLabel(event.registrationDeadline))}</p>` : ''}<p class="event-note">${e(t('checked'))}: ${e(dateLabel(event.sourceChecked || data.updated))}</p></div><div class="event-action"><a class="button" data-metrics-event="resource_open" data-metrics-item="development:${role}:event:${e(event.id)}" href="${e(safeUrl(event.url))}" target="_blank" rel="noopener noreferrer">${e(t('register'))} ↗</a><button type="button" class="button secondary" data-event="${e(event.id)}" data-metrics-event="resource_open" data-metrics-item="development:${role}:calendar:${e(event.id)}">${e(t('addCalendar'))}</button></div></article>`;
    }).join('') : `<div class="empty">${e(t('noEvent'))}</div>`;
  }
  function renderCalendars() {
    const calendars = data?.calendars || [];
    $('calendarCards').innerHTML = calendars.length ? calendars.map((item, index) => `<article class="card"><span class="badge">${e(t(item.language || 'multi'))}</span><h3>${e(pick(item.title))}</h3><span class="provider">${e(item.provider)}</span><p>${e(pick(item.note))}</p><a class="card-link" data-metrics-event="resource_open" data-metrics-item="development:${role}:official-calendar:${index + 1}" href="${e(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer">${e(t('open'))} ↗</a></article>`).join('') : `<div class="empty">${e(t('noCalendar'))}</div>`;
  }
  function renderJournal() {
    const entries = saved.journal.filter(item => item.role === role).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
    $('journalEntries').innerHTML = entries.length ? entries.map(item => `<article class="journal-entry"><h3>${e(item.title)}</h3><time datetime="${e(item.date)}">${e(dateLabel(item.date))}</time><p><strong>${e(t('learningApplication'))}</strong><br>${e(item.application || t('noResult'))}</p><p><strong>${e(t('learningResult'))}</strong><br>${e(item.result || t('noResult'))}</p><div class="entry-actions"><button class="text-button" type="button" data-edit="${e(item.id)}">${e(t('edit'))}</button><button class="text-button danger" type="button" data-delete="${e(item.id)}">${e(t('delete'))}</button></div></article>`).join('') : `<div class="empty">${e(t('emptyJournal'))}</div>`;
  }
  function download(content, filename, type) {
    const url = URL.createObjectURL(new Blob([content], { type })); const anchor = document.createElement('a');
    anchor.href = url; anchor.download = filename; document.body.appendChild(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  const icsEscape = value => String(value || '').replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  const utcStamp = value => new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  function foldLine(line) { let output = ''; let part = ''; const encoder = new TextEncoder(); for (const char of line) { if (encoder.encode(part + char).length > 73) { output += part + '\r\n '; part = ''; } part += char; } return output + part; }
  function exportCalendar(events) {
    if (!events.length) return;
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Tobruk Nursing//Professional Development//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:' + icsEscape(t('events'))];
    events.forEach(event => { lines.push('BEGIN:VEVENT', 'UID:' + icsEscape(event.id) + '@nursing.tobruk', 'DTSTAMP:' + utcStamp(Date.now()), 'DTSTART:' + utcStamp(event.start), 'DTEND:' + utcStamp(event.end), 'SUMMARY:' + icsEscape(pick(event.title)), 'DESCRIPTION:' + icsEscape(event.provider + '\n' + pick(event.freeNote) + '\n' + event.url), 'URL:' + event.url, 'LOCATION:Online', 'END:VEVENT'); });
    lines.push('END:VCALENDAR'); download(lines.map(foldLine).join('\r\n') + '\r\n', 'tobruk-nursing-events.ics', 'text/calendar;charset=utf-8');
  }
  $('languageButton').addEventListener('click', () => { lang = lang === 'ar' ? 'en' : 'ar'; const url = new URL(location.href); url.searchParams.set('lang', lang); history.replaceState(null, '', url); $('journalStatus').textContent = ''; applyLanguage(); });
  $('roleNav').addEventListener('click', event => { const anchor = event.target.closest('[data-role]'); if (!anchor || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button) return; event.preventDefault(); role = anchor.dataset.role; const url = new URL(location.href); url.searchParams.set('role', role); url.searchParams.set('lang', lang); history.pushState(null, '', url); editId = null; $('journalForm').reset(); setToday(); $('journalStatus').textContent = ''; $('topic').value = 'all'; applyLanguage(); });
  window.addEventListener('popstate', () => { const params = new URLSearchParams(location.search); role = ['staff', 'ta', 'faculty'].includes(params.get('role')) ? params.get('role') : 'staff'; if (['ar', 'en'].includes(params.get('lang'))) lang = params.get('lang'); editId = null; $('journalForm').reset(); setToday(); $('journalStatus').textContent = ''; applyLanguage(); });
  ['search', 'resourceLanguage', 'topic', 'favoritesOnly'].forEach(id => $(id).addEventListener(id === 'search' ? 'input' : 'change', renderResources));
  $('eventLanguage').addEventListener('change', renderEvents);
  $('downloadCalendar').addEventListener('click', () => exportCalendar(shownEvents));
  document.addEventListener('click', event => {
    const progress = event.target.closest('[data-progress]');
    if (progress) {
      const phase = progress.dataset.progress, resourceId = progress.dataset.progressResource;
      if (['start', 'complete', 'apply'].includes(phase) && data?.resources?.some(item => item.id === resourceId && item.kind === 'course' && item.roles?.includes(role))) {
        saved.progress[role + ':' + resourceId + ':' + phase] = true;
        const success = persist();
        if (success) { progress.disabled = true; progress.textContent += ' ✓ ' + t('progressRecorded'); }
      }
    }
    const save = event.target.closest('[data-save]');
    if (save) { const id = save.dataset.save; saved.favorites = saved.favorites.includes(id) ? saved.favorites.filter(value => value !== id) : [...saved.favorites, id]; persist(); renderResources(); const replacement = document.querySelector(`[data-save="${CSS.escape(id)}"]`); replacement?.focus(); }
    const calendar = event.target.closest('[data-event]'); if (calendar) exportCalendar(shownEvents.filter(item => item.id === calendar.dataset.event));
    const remove = event.target.closest('[data-delete]'); if (remove && confirm(t('deleteConfirm'))) { saved.journal = saved.journal.filter(item => item.id !== remove.dataset.delete); persist(); renderJournal(); if (editId === remove.dataset.delete) { editId = null; $('journalForm').reset(); setToday(); } }
    const edit = event.target.closest('[data-edit]'); if (edit) { const entry = saved.journal.find(item => item.id === edit.dataset.edit); if (!entry) return; editId = entry.id; $('learningTitle').value = entry.title; $('learningDate').value = entry.date; $('learningApplication').value = entry.application; $('learningResult').value = entry.result; $('learningTitle').focus(); $('journalForm').scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }
  });
  $('journalForm').addEventListener('submit', event => { event.preventDefault(); const title = $('learningTitle').value.trim(); if (!title) { $('learningTitle').focus(); return; } const wasEditing = Boolean(editId); const entry = { id: editId || ('learn-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8)), role, title, date: $('learningDate').value, application: $('learningApplication').value.trim(), result: $('learningResult').value.trim() }; const index = saved.journal.findIndex(item => item.id === entry.id); if (index >= 0) saved.journal[index] = entry; else saved.journal.push(entry); const success = persist(); editId = null; $('journalForm').reset(); setToday(); renderJournal(); if (success) $('journalStatus').textContent = t(wasEditing ? 'entryUpdated' : 'entrySaved'); });
  $('exportJournal').addEventListener('click', () => download(JSON.stringify({ exportedAt: new Date().toISOString(), role, entries: saved.journal.filter(item => item.role === role), savedResourceIds: saved.favorites, learningProgress: Object.fromEntries(Object.entries(saved.progress).filter(([key]) => key.startsWith(role + ':'))) }, null, 2), 'tobruk-learning-journal-' + role + '.json', 'application/json;charset=utf-8'));
  $('clearLocal').addEventListener('click', () => { if (!confirm(t('resetConfirm'))) return; saved.journal = []; saved.favorites = []; saved.progress = {}; editId = null; $('journalForm').reset(); setToday(); const success = persist(); renderJournal(); renderResources(); if (success) $('journalStatus').textContent = t('cleared'); });
  function setToday() { $('learningDate').value = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Tripoli', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); }
  applyLanguage(); setToday();
  fetch('content.json?v=20261022-3').then(response => { if (!response.ok) throw new Error('HTTP ' + response.status); return response.json(); }).then(value => { if (!Array.isArray(value.resources)) throw new Error('Invalid resource list'); data = value; $('loadStatus').hidden = true; $('resourceFilters').hidden = false; applyLanguage(); }).catch(() => { loadFailed = true; $('loadStatus').textContent = t('loadError'); $('loadStatus').classList.add('error'); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) renderEvents(); });
})();
