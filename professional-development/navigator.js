(function () {
  'use strict';
  const roles = ['staff', 'ta', 'faculty'];
  const params = new URLSearchParams(location.search);
  let role = roles.includes(params.get('role')) ? params.get('role') : 'staff';
  let lang = document.documentElement.lang === 'en' ? 'en' : 'ar';
  let resources = [], events = [], benchmarks = null, benchmarkError = false;
  const KEY = 'tobruk-development-pathways-v1';
  let progress = {};
  try { const value = JSON.parse(localStorage.getItem(KEY) || '{}'); if (value && typeof value === 'object' && !Array.isArray(value)) progress = value; } catch (_) {}
  const opened = new Set();
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const tr = (ar, en) => lang === 'ar' ? ar : en;
  const pick = value => typeof value === 'string' ? value : value?.[lang] || value?.ar || value?.en || '';
  const pair = (ar, en) => ({ ar, en });
  const step = (ar, en, ids) => ({ title: pair(ar, en), ids });
  const paths = {
    staff: [
      { id: 'records', icon: '▤', title: pair('تنظيم السجلات والعمل الرقمي', 'Organise records and digital work'), result: pair('جدول واضح أو مجلد منظم تستخدمه في عملك.', 'A clear spreadsheet or organised folder you can use at work.'), steps: [step('راجع المسؤوليات في دليل الموظف', 'Review your responsibilities in the employee guide', ['guide-staff']), step('تعلّم مهارة واحدة في الجداول', 'Learn one spreadsheet skill', ['ms-excel', 'edraak-excel']), step('رتّب الملفات والمواعيد', 'Organise files and appointments', ['workspace-admin', 'drive-organisation', 'account-security']), step('اختر تطبيقًا صغيرًا وسجّل مراجعته', 'Choose a small application and record a review', [])] },
      { id: 'service', icon: '◇', title: pair('خدمة أوضح وتواصل أفضل', 'Clearer service and communication'), result: pair('خطوة خدمة أو رسالة عمل أوضح، قابلة للمراجعة.', 'A clearer service step or work message that can be reviewed.'), steps: [step('حدّد أين يتعطل الطلب', 'Identify where a request gets delayed', ['guide-staff']), step('طوّر التواصل والمهارات المهنية', 'Develop communication and professional skills', ['workplace-communication', 'edraak-feedback']), step('حضّر متابعة المهمة في أدوات العمل', 'Prepare task follow-up in Work tools', []), step('راجع ما تغير في الوقت أو وضوح الإجراء', 'Review changes in time or clarity', [])] },
      { id: 'data', icon: '▥', title: pair('البيانات لدعم التحسين', 'Use data to support improvement'), result: pair('ملخص صغير للطلبات أو الأعمال دون بيانات شخصية.', 'A small summary of requests or tasks without personal data.'), steps: [step('اختر سؤالًا عمليًا يمكن قياسه', 'Choose a practical question you can measure', []), step('نظّم البيانات وافحصها', 'Organise and check the data', ['edraak-data', 'ms-excel']), step('قارن الأعداد بطريقة واضحة', 'Compare counts clearly', ['next-excel']), step('سجّل قرار التحسين وموعد مراجعته', 'Record an improvement decision and review date', [])] }
    ],
    ta: [
      { id: 'first-session', icon: '✦', title: pair('التهيئة لأول جلسة تعليمية', 'Prepare for your first teaching session'), result: pair('جلسة مخططة وهدف واضح وخطوة تغذية راجعة.', 'A planned session with a clear goal and a feedback step.'), steps: [step('راجع دورك مع أستاذ المادة', 'Review your role with the course instructor', ['guide-faculty-ta']), step('اختر وسيلة شرح مناسبة', 'Choose a suitable teaching aid', ['atlas', 'clinical-sims']), step('حضّر الجلسة بقائمة التحضير', 'Prepare the session with the checklist', []), step('راجع ما نجح وما يحتاج تغييرًا', 'Reflect on what worked and what needs changing', ['stanford-feedback', 'assessment'])] },
      { id: 'research-start', icon: '⌕', title: pair('بداية بحث منظم', 'Start a structured research project'), result: pair('سؤال بحثي وخطة بحث عن المصادر وخطوة أخلاقية واضحة.', 'A research question, a literature search plan and a clear ethics step.'), steps: [step('ابدأ بالسؤال والدليل', 'Start with a question and the guide', ['guide-research-en', 'clinical-research']), step('راجع مبادئ أخلاقيات البحث', 'Review research ethics principles', ['research-ethics']), step('ابحث عن المصادر ونظّمها', 'Find and organise sources', ['digital-library', 'pubmed-search', 'zotero-references']), step('تدرّب على التحليل ببيانات تعليمية', 'Practise analysis with learning data', ['local-spss', 'next-spss'])] },
      { id: 'teaching-skills', icon: '◈', title: pair('مهارات الشرح والتقييم', 'Build teaching and assessment skills'), result: pair('نشاط قصير وسؤال تقييم وتعليق يساعد الطالب.', 'A short activity, an assessment question and helpful feedback.'), steps: [step('حدّد ما سيتعلمه الطالب', 'Define what the student will learn', ['stanford-outcomes']), step('اختر نشاطًا تفاعليًا مناسبًا', 'Choose a suitable interactive activity', ['stanford-engagement', 'qatar-teaching-recordings']), step('اربط التقييم بالهدف', 'Align assessment with the goal', ['berkeley-rubrics', 'assessment']), step('خطّط لتغذية راجعة واضحة', 'Plan clear feedback', ['stanford-feedback', 'edraak-feedback'])] }
    ],
    faculty: [
      { id: 'course-review', icon: '◈', title: pair('تطوير التدريس والتقييم', 'Develop teaching and assessment'), result: pair('تحسين محدد في نشاط أو سؤال تقييم، مع موعد مراجعة.', 'A specific improvement to an activity or assessment, with a review date.'), steps: [step('راجع الهدف ونشاط التعلم', 'Review the objective and learning activity', ['stanford-outcomes', 'guide-faculty-ta']), step('نوّع أنشطة التعلم', 'Diversify learning activities', ['online-teaching', 'qatar-teaching-recordings']), step('راجع اتساق التقييم مع الأهداف', 'Review assessment alignment', ['berkeley-rubrics', 'assessment']), step('جرّب تحسينًا وسجّل ملاحظة عنه', 'Try one improvement and record a reflection', [])] },
      { id: 'supervision', icon: '⌕', title: pair('البحث والإشراف على المشروعات', 'Research and project supervision'), result: pair('خطة إشراف بنقاط متابعة ومصادر ومسؤوليات واضحة.', 'A supervision plan with clear checkpoints, sources and responsibilities.'), steps: [step('راجع دليل البحث والإشراف', 'Review the research and supervision guide', ['guide-research-en']), step('راجع الاعتبارات الأخلاقية', 'Review ethical considerations', ['research-ethics', 'equator-reporting']), step('حدّد الموارد والتحليل المناسب', 'Identify resources and suitable analysis', ['digital-library', 'local-spss']), step('سجّل خطوات المتابعة في خطة العمل', 'Record checkpoints in your work plan', [])] },
      { id: 'leadership', icon: '◇', title: pair('القيادة ودعم فريق التعليم', 'Leadership and teaching-team support'), result: pair('أولوية واضحة وتوزيع مهمة ومراجعة لما تحقق.', 'A clear priority, task allocation and a review of progress.'), steps: [step('اختر تحديًا واحدًا لدى الفريق', 'Choose one team challenge', []), step('راجع مهارات القيادة والعمل الجماعي', 'Review leadership and teamwork skills', ['nursing-leadership']), step('اربط التحسين بجودة التعلم', 'Connect improvement with learning quality', ['assessment']), step('حدّد خطوة ومؤشرًا وموعد مراجعة', 'Set an action, indicator and review date', [])] }
    ]
  };
  function safeUrl(value) { try { const url = new URL(value, location.href); return ['http:', 'https:'].includes(url.protocol) ? url.href : '#'; } catch (_) { return '#'; } }
  function record(type, id) { window.PortalMetrics?.record(type, 'development:' + role + ':' + id, 'faculty'); }
  function renderDiscovery() {
    if (!$('discovery')) return;
    $('discovery').setAttribute('aria-label', tr('ابدأ من احتياجك', 'Start with your need'));
    const tiles = [
      ['▤', '#guides', tr('أعرف دوري', 'Understand my role'), tr('الأدلة المعتمدة ومسؤوليات العمل', 'Approved guides and responsibilities')],
      ['↗', '#pathways', tr('أطوّر مهارة', 'Build a skill'), tr('مسار بخطوات ونتيجة عملية', 'A pathway with steps and a practical result')],
      ['◎', '#workbench', tr('أخطط وأجهّز', 'Plan and prepare'), tr('خطة تطوير وخطة أسبوع وقائمة تحضير', 'Development plan, weekly plan and checklist')],
      ['⌕', '#resourceFilters', tr('أبحث عن مصدر', 'Find a resource'), tr('تصفية بحسب اللغة والمجال', 'Filter by language and topic')],
      [role === 'staff' ? '◇' : '▦', role === 'staff' ? '#journal' : '#events', role === 'staff' ? tr('أراجع ما طبّقت', 'Reflect on application') : tr('أتابع الفعاليات', 'Follow events'), role === 'staff' ? tr('سجل تعلّم وتأمل شخصي', 'A personal learning journal') : tr('فرص مجانية بتوقيت ليبيا', 'Free opportunities in Libya time')],
      ['⊕', '#benchmarks', tr('مراجع تطوير المساحة', 'How this space was developed'), tr('الجامعات والأفكار التي استفدنا منها', 'The universities and ideas we learned from')]
    ];
    $('discovery').innerHTML = `<div class="discovery-heading"><h2>${tr('ماذا تريد أن تنجز اليوم؟', 'What would you like to accomplish today?')}</h2><p>${tr('ابدأ من حاجتك، ثم اختر المصدر أو الأداة التي تساعدك.', 'Start with your need, then choose the resource or tool that helps.')}</p></div><div class="service-grid">${tiles.map(([icon, href, title, note], i) => `<a class="service-tile" href="${href}" data-metrics-event="resource_open" data-metrics-item="development:${role}:quick:${i + 1}"><span aria-hidden="true">${icon}</span><strong>${esc(title)}</strong><small>${esc(note)}</small></a>`).join('')}</div><div class="space-overview"><span>${tr('في مساحتك', 'In your space')}</span><strong>${resources.filter(x => x.roles?.includes(role)).length} ${tr('مصدرًا ودليلًا', 'resources and guides')}</strong><strong>3 ${tr('مسارات عملية', 'practical pathways')}</strong><strong>3 ${tr('أدوات للتخطيط والتحضير', 'planning and preparation tools')}</strong>${role === 'staff' ? '' : `<strong>${events.filter(x => Date.parse(x.end) > Date.now()).length} ${tr('فعاليات قادمة', 'upcoming events')}</strong>`}</div>`;
  }
  function renderPaths() {
    if (!$('pathways')) return;
    $('pathways').innerHTML = `<div class="section-heading"><div><span class="kicker">↗</span><h2>${tr('مسارات تطوير تناسب دورك', 'Development pathways for your role')}</h2><p>${tr('اختر مسارًا مرنًا. اقرأ، جرّب، ثم راجع ما تغير في عملك.', 'Choose a flexible pathway. Learn, try it, then reflect on what changed at work.')}</p></div></div><p class="local-note">${tr('تقدمك محفوظ على هذا المتصفح فقط. تأشير الخطوات إقرار ذاتي للتنظيم؛ لا يمنح شهادة أو يثبت كفاءة.', 'Your progress stays in this browser only. Checking a step is a self-report for planning; it does not award a certificate or establish competence.')}</p><div class="pathway-grid">${paths[role].map(path => {
      const done = path.steps.filter((_, i) => progress[role + ':' + path.id + ':' + i] === true).length;
      return `<article class="pathway-card"><span class="pathway-symbol" aria-hidden="true">${path.icon}</span><h3>${esc(pick(path.title))}</h3><p>${esc(pick(path.result))}</p><div class="path-progress"><span>${done} / ${path.steps.length} ${tr('خطوات مؤشّر عليها', 'steps checked')}</span><progress value="${done}" max="${path.steps.length}" aria-label="${esc(pick(path.title))}"></progress></div><details data-path="${path.id}" ${opened.has(role + ':' + path.id) ? 'open' : ''}><summary>${tr('عرض خطوات المسار', 'View pathway steps')}</summary><ol class="path-steps">${path.steps.map((s, i) => `<li><strong>${esc(pick(s.title))}</strong><div class="path-links">${s.ids.map(id => resources.find(r => r.id === id && r.roles?.includes(role))).filter(Boolean).map(r => `<a href="${esc(safeUrl(r.url))}" target="_blank" rel="noopener noreferrer" data-metrics-event="resource_open" data-metrics-item="development:${role}:${esc(r.id)}">${esc(pick(r.title))} ↗</a>`).join('') || `<a href="#workbench" data-metrics-event="resource_open" data-metrics-item="development:${role}:pathway:${path.id}:workbench">${tr('افتح أدوات التخطيط والتحضير', 'Open planning and preparation tools')}</a>`}</div><label class="step-check"><input type="checkbox" data-step="${path.id}:${i}" ${progress[role + ':' + path.id + ':' + i] ? 'checked' : ''}>${tr('أنجزت هذه الخطوة', 'I completed this step')}</label></li>`).join('')}</ol><a class="small-button" href="#journal">${tr('سجّل ما طبّقته', 'Record what you applied')}</a></details></article>`;
    }).join('')}</div><p id="pathwayStatus" class="status-line" role="status"></p>`;
  }
  function renderBenchmarks() {
    if (!$('benchmarks')) return;
    $('benchmarks').innerHTML = `<div class="section-heading"><div><span class="kicker">⊕</span><h2>${tr('المقارنة المرجعية · Benchmark', 'Benchmarking · design references')}</h2><p>${tr('اطّلعنا على خدمات جامعات أخرى واستفدنا من أفكارها في تطوير هذه المساحات.', 'We reviewed other universities’ services and adapted useful ideas for these spaces.')}</p></div></div>${!benchmarks ? `<p class="local-note">${benchmarkError ? tr('تعذّر تحميل المراجع الآن. أعد تحميل الصفحة للمحاولة.', 'The references could not be loaded. Reload to try again.') : tr('جارٍ تحميل المراجع…', 'Loading references…')}</p>` : `<p class="source-note">${esc(pick(benchmarks.scope))}</p><div class="benchmark-grid">${benchmarks.items.map(item => `<article class="benchmark-card"><span class="provider">${esc(pick(item.university))}</span><h3>${esc(pick(item.title))}</h3><p><strong>${tr('الفكرة المرجعية: ', 'Reference idea: ')}</strong>${esc(pick(item.idea))}</p><p><strong>${tr('تطبيقنا في الكلية: ', 'Our local adaptation: ')}</strong>${esc(pick(item.adaptation))}</p><a href="${esc(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer" data-metrics-event="resource_open" data-metrics-item="development:${role}:benchmark:${esc(item.id)}">${tr('المصدر الجامعي الرسمي', 'Official university source')} ↗</a><small>${tr('تاريخ الاطلاع: ', 'Reviewed: ')}${esc(item.checked)}</small></article>`).join('')}</div>`}`;
  }
  function render() { renderDiscovery(); renderPaths(); renderBenchmarks(); }
  document.addEventListener('development:context', event => {
    if (roles.includes(event.detail?.role)) role = event.detail.role;
    lang = event.detail?.lang === 'en' ? 'en' : 'ar';
    resources = Array.isArray(event.detail?.resources) ? event.detail.resources : resources;
    events = Array.isArray(event.detail?.events) ? event.detail.events : events;
    render();
  });
  document.addEventListener('toggle', event => {
    if (!event.target.matches?.('details[data-path]')) return;
    const key = role + ':' + event.target.dataset.path;
    if (event.target.open) opened.add(key); else opened.delete(key);
  }, true);
  document.addEventListener('click', event => {
    const summary = event.target.closest?.('summary');
    const path = summary?.parentElement;
    if (path?.matches('details[data-path]') && !path.open) record('resource_open', 'pathway-open:' + path.dataset.path);
  });
  document.addEventListener('change', event => {
    const value = event.target.dataset?.step;
    if (!value || !event.target.closest('#pathways')) return;
    const key = role + ':' + value, wasReported = progress['reported:' + key] === true;
    progress[key] = event.target.checked;
    if (event.target.checked && !wasReported) { record('activity_complete', 'pathway-step:' + value); progress['reported:' + key] = true; }
    let stored = true; try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch (_) { stored = false; }
    renderPaths();
    $('pathwayStatus').textContent = stored ? tr('حُدّث تقدمك على هذا الجهاز.', 'Your progress was updated on this device.') : tr('تعذّر الحفظ؛ يبقى التقدم في الصفحة الحالية فقط.', 'Could not save; progress will remain only in this page.');
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true }); else render();
  fetch('benchmarks.json?v=20261022-2').then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }).then(value => { if (!Array.isArray(value.items)) throw new Error('Invalid benchmarks'); benchmarks = value; renderBenchmarks(); }).catch(() => { benchmarkError = true; renderBenchmarks(); });
})();
