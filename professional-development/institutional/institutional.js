/* Public, role-aware support. Personal planning stays in this browser only. */
(() => {
  'use strict';
  const RELEASE = '20261030-1';
  const STORE = 'tobruk-institutional-drafts-v1';
  const AUDIENCES = ['staff', 'faculty', 'ta'];
  const DEFAULT_JOB = { staff: 'employee', faculty: 'faculty', ta: 'ta' };
  const PANELS = ['quality', 'digital', 'strategy', 'skills', 'community', 'ethics', 'academic'];
  const BASE = new URL('../../', location.href);
  const $ = id => document.getElementById(id);
  const e = text => String(text ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const state = { role: 'staff', job: 'employee', lang: 'ar', panel: 'strategy', drafts: {}, ready: false };
  let institutional, skills, ethics;
  const text = (ar, en) => state.lang === 'ar' ? ar : en;
  const pick = value => typeof value === 'string' ? value : value?.[state.lang] || value?.ar || value?.en || '';
  const audienceName = role => ({ staff: text('الموظفون', 'Administrative staff'), faculty: text('أعضاء هيئة التدريس', 'Faculty members'), ta: text('المعيدون', 'Teaching assistants') })[role];
  const jobNow = () => skills?.roles.find(item => item.id === state.job);
  const headings = () => ({
    quality: text('الجودة والتحسين المستمر', 'Quality and continuous improvement'),
    digital: text('التحول الرقمي وتنظيم العمل', 'Digital working and service organisation'),
    strategy: text('دورك في تنفيذ الخطة', 'Your contribution to the strategic plan'),
    skills: text('حزمة مهارات بحسب دورك', 'A skills package for your role'),
    community: text('خدمة المجتمع والمبادرات', 'Community service and initiatives'),
    ethics: text('المواثيق وأخلاقيات البحث والعمل', 'Charters, research and workplace ethics'),
    academic: text('دعم التعليم والبحث', 'Teaching and research support'),
    plan: text('حضّر خطوة أو مبادرة', 'Prepare an improvement or initiative')
  });
  const navNames = () => ({
    quality: text('الجودة والتحسين', 'Quality'), digital: text('التحول الرقمي', 'Digital working'),
    strategy: text('دورك في الخطة', 'Your role in the plan'), skills: text('مهارات حسب الدور', 'Role-based skills'),
    community: text('خدمة المجتمع', 'Community service'), ethics: text('الأخلاقيات والمواثيق', 'Ethics and charters'),
    academic: text('التعليم والبحث', 'Teaching & research')
  });
  const iconPaths = {
    quality: 'M20 7a8 8 0 1 0 1 9M20 3v5h-5M8 12l3 3 5-6',
    digital: 'M3 5h7l2 3h9v12H3zM6 12h12M6 16h8',
    strategy: 'M12 3v5M12 16v5M3 12h5M16 12h5M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0M12 12l7-7',
    skills: 'M4 6l8-3 8 3v13l-8 3-8-3zM12 3v19M7 8l2 1M15 8l2-1M7 12l2 1M15 12l2-1',
    community: 'M8 8a3 3 0 1 0-6 0 3 3 0 0 0 6 0M22 8a3 3 0 1 0-6 0 3 3 0 0 0 6 0M1 20v-4c0-4 8-4 8 0v4M15 20v-4c0-4 8-4 8 0v4M9 10l3 3 3-3M12 13v7',
    ethics: 'M12 2l9 4v6c0 5-5 8-9 10-4-2-9-5-9-10V6zM8 12l3 3 5-6',
    academic: 'M2 5c4-2 7-1 10 1 3-2 6-3 10-1v15c-4-2-7-1-10 1-3-2-6-3-10-1zM12 6v15M5 10l4 1M15 11l4-1'
  };
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${iconPaths[name] || iconPaths.strategy}"/></svg>`;
  function safeUrl(raw) {
    try {
      const url = new URL(raw, location.href);
      return url.protocol === 'https:' || (url.origin === location.origin && url.protocol === 'http:') ? url.href : '';
    } catch (_) { return ''; }
  }
  function hubLink(hash = '', audience = state.role) {
    return new URL(`professional-development/?role=${audience}&lang=${state.lang}${hash}`, BASE).href;
  }
  function routeUrl(panel = state.panel, role = state.role, job = state.job, lang = state.lang) {
    const url = new URL(location.href);
    url.searchParams.set('role', role); url.searchParams.set('job', job); url.searchParams.set('lang', lang);
    url.hash = panel;
    return url.href;
  }
  function readLocation() {
    const params = new URLSearchParams(location.search);
    state.role = AUDIENCES.includes(params.get('role')) ? params.get('role') : 'staff';
    state.lang = params.get('lang') === 'en' ? 'en' : 'ar';
    const requestedJob = params.get('job');
    state.job = skills.roles.some(item => item.id === requestedJob && item.audience === state.role)
      ? requestedJob : DEFAULT_JOB[state.role];
    if (!skills.roles.some(item => item.id === state.job)) state.job = skills.roles.find(item => item.audience === state.role)?.id || skills.roles[0].id;
    const requested = location.hash.slice(1);
    if (requested !== 'content' || !state.ready) state.panel = requested.startsWith('skills-') ? 'skills' : [...PANELS, 'plan'].includes(requested) ? requested : 'strategy';
  }
  function metric(name, fixedId) {
    if (!/^[a-z0-9_-]+$/.test(state.job) || !/^[a-z0-9_:/.-]+$/i.test(fixedId)) return;
    window.PortalMetrics?.record(name, `development:${state.role}:institutional:${fixedId}`.slice(0, 120), 'faculty');
  }
  function link(item, prefix = 'link') {
    const url = safeUrl(item.url);
    if (!url) return '';
    const id = String(item.id || prefix).replace(/[^A-Za-z0-9_-]/g, '');
    return `<a class="resource-link" href="${e(url)}" target="_blank" rel="noopener noreferrer" data-metrics-event="resource_open" data-metrics-item="development:${state.role}:institutional:${e(prefix)}:${e(id)}">${e(pick(item.title))}<span aria-hidden="true">↗</span></a>`;
  }
  const links = (items, prefix) => `<div class="card-links">${(items || []).map(item => link(item, prefix)).join('')}</div>`;
  const heading = (id, intro) => `<header class="panel-heading"><p class="kicker">${e(pick(jobNow()?.label))}</p><h2 id="panelHeading">${e(headings()[id])}</h2><p>${e(pick(intro))}</p></header>`;
  const steps = items => `<div class="steps">${(items || []).map(item => `<article class="step"><h3>${e(pick(item.title))}</h3><p>${e(pick(item.body))}</p></article>`).join('')}</div>`;
  const planButton = label => `<a class="button" href="#plan" data-route="plan">${e(label || text('حضّر خطوة عملية', 'Prepare a practical step'))}</a>`;

  function renderStrategy() {
    const items = institutional.roleContributions[state.role] || [];
    return heading('strategy', { ar: 'اختر مساهمة تناسب تكليفك وخطة قسمك. استخدم السجلات القائمة، ثم راجع ما تحسّن وما يحتاج إلى دعم.', en: 'Choose a contribution that fits your assignment and department plan. Use existing records, then review what improved and where support is needed.' })
      + `<div class="grid">${items.map(item => `<article class="card"><h3>${e(pick(item.title))}</h3><span class="badge">${e(text('محاور الخطة: ', 'Plan axes: ') + item.axes.join(' · '))}</span><dl class="detail-list"><dt>${text('الخطوة العملية', 'Practical action')}</dt><dd>${e(pick(item.action))}</dd><dt>${text('أين أوثّق العمل؟', 'Where is the work recorded?')}</dt><dd>${e(pick(item.record))}</dd><dt>${text('ما الذي أراجعه؟', 'What will I review?')}</dt><dd>${e(pick(item.review))}</dd></dl><button type="button" class="button small secondary" data-contribution="${e(item.id)}">${text('ابدأ مسودة بهذه الخطوة', 'Start a draft with this step')}</button></article>`).join('')}</div>`
      + `<details><summary>${text('المحاور الستة للخطة الاستراتيجية', 'The six strategic-plan axes')}</summary><div class="details-body"><ul class="axis-list">${institutional.axes.map(axis => `<li><h3>${e(pick(axis.title))}</h3><p>${e(pick(axis.summary))}</p></li>`).join('')}</ul><div class="card-actions">${link({id:'strategic-plan',title:{ar:'افتح عرض الخطة الاستراتيجية',en:'Open the strategic plan'},url:new URL('strategic-plan/?lang='+state.lang,BASE).href},'strategy')}</div></div></details>`;
  }
  function renderProcess(id) {
    const data = institutional[id];
    return heading(id, data.intro) + steps(data.steps)
      + `<h3 class="section-label">${text('موارد تساعدك على التطبيق', 'Resources for putting this into practice')}</h3>`
      + links(data.links, id)
      + (id === 'quality' ? `<p class="lead-note subtle">${text('استخدم مؤشرات البوابة لفهم الوصول والتفاعل؛ وراجع فائدة العمل من شواهده ونتائجه. زيارة صفحة أو إنهاء مورد لا يثبتان وحدهما تحسن الأداء.', 'Portal indicators help you understand reach and interaction. Review the value of work using its evidence and results; visiting a page or finishing a resource alone does not prove improved performance.')}</p>` : '')
      + `<div class="card-actions">${planButton()}</div>`;
  }
  function renderCommunity() {
    const data = institutional.community;
    return heading('community', data.intro)
      + `<div class="lead-note"><strong>${text('مساهمة تناسب مساحتك', 'A contribution for your role')}</strong><p>${e(pick(data.roles[state.role]))}</p></div>`
      + steps(data.steps)
      + `<div class="card-actions">${planButton(text('حضّر مبادرة مجتمعية', 'Prepare a community initiative'))}<a class="button secondary" href="#skills-initiative">${text('مهارات إدارة المبادرة', 'Initiative-management skills')}</a></div>`
      + `<h3 class="section-label">${text('الموارد والأنشطة', 'Resources and activities')}</h3>` + links(data.links, 'community');
  }
  function resourceCards(ids) {
    const selected = [...new Set(ids || [])].map(id => skills.resources.find(item => item.id === id)).filter(Boolean);
    if (!selected.length) return '';
    const languages = { ar: text('العربية', 'Arabic'), en: text('الإنجليزية', 'English'), multi: text('متعدد اللغات', 'Multiple languages') };
    return `<div class="grid resource-catalogue">${selected.map(item => `<article class="card"><h3>${e(pick(item.title))}</h3><p class="meta">${e(item.provider || '')}${item.language ? ' · '+e(languages[item.language] || pick(item.language)) : ''}</p>${item.access ? `<p>${e(pick(item.access))}</p>` : ''}${link(item, 'skill-resource')}</article>`).join('')}</div>`;
  }
  function renderSkills() {
    const role = jobNow();
    const roleResourceIds = role.skills.flatMap(item => item.resourceIds || []);
    const modules = skills.commonModules || [];
    return heading('skills', role.focus)
      + `<div class="grid skills-grid">${role.skills.map(item => `<article class="card"><h3>${e(pick(item.title))}</h3><dl class="detail-list"><dt>${text('تطبيق عملي', 'Apply it at work')}</dt><dd>${e(pick(item.practice))}</dd><dt>${text('ما الذي يُظهر استفادتك؟', 'What will show that it helped?')}</dt><dd>${e(pick(item.evidence))}</dd></dl></article>`).join('')}</div>`
      + `<details><summary>${text('مصادر حزمة ', 'Resources for ')}${e(pick(role.label))}</summary><div class="details-body">${resourceCards(roleResourceIds)}</div></details>`
      + `<h3 class="section-label">${text('مهارات مشتركة: الوقت والمشاريع والمبادرات', 'Shared skills: time, projects and initiatives')}</h3><div class="module-nav">${modules.map(module => `<a class="quiet-button" href="#skills-${e(module.id)}">${e(pick(module.title))}</a>`).join('')}</div>`
      + modules.map(module => `<details class="module-box" id="module-${e(module.id)}"><summary>${e(pick(module.title))}</summary><div class="details-body"><p>${e(pick(module.intro))}</p>${steps(module.steps)}<div class="module-example"><strong>${text('مثال من العمل', 'A workplace example')}</strong><p>${e(pick(module.example))}</p></div>${resourceCards(module.resourceIds)}<div class="card-actions">${module.id === 'time' ? `<a class="button secondary" href="${e(hubLink('#workbench'))}">${text('افتح أدوات التخطيط الأسبوعي', 'Open weekly planning tools')}</a>` : planButton(text('جهّز مسودة للتطبيق', 'Prepare a working draft'))}</div></div></details>`).join('');
  }
  function renderEthics() {
    return heading('ethics', ethics.intro)
      + `<div class="grid">${ethics.sections.map(section => `<article class="card"><h3>${e(pick(section.title))}</h3><p>${e(pick(section.summary))}</p><ol class="principles">${section.principles.map(item => `<li><strong>${e(pick(item.title))}</strong>${e(pick(item.body))}</li>`).join('')}</ol><div class="card-links">${section.documentIds.map(id => ethics.documents.find(doc => doc.id === id)).filter(Boolean).map(doc => link(doc,'ethics')).join('')}</div></article>`).join('')}</div>`
      + `<h3 class="section-label">${text('الوثائق المؤسسية والمراجع الإرشادية', 'Institutional documents and supporting references')}</h3><div class="grid">${ethics.documents.map(doc => `<article class="card"><span class="badge ${doc.scope === 'external' ? 'external' : ''}">${doc.scope === 'institutional' ? text('وثيقة الكلية', 'Faculty document') : text('مرجع خارجي إرشادي', 'External supporting reference')}</span><h3>${e(pick(doc.title))}</h3><p>${e(pick(doc.description))}</p>${link(doc,'ethics-document')}</article>`).join('')}</div>`
      + `<p class="lead-note subtle">${e(pick(ethics.notes))}</p>`;
  }
  function renderAcademic() {
    const cards = [
      ['teaching','التدريس والتقييم','Teaching and assessment','مصادر لتصميم التعلم والتقييم والتغذية الراجعة، بحسب مساحتك.','Resources for learning design, assessment and feedback, tailored to your space.',hubLink('#pathways',state.role==='staff'?'faculty':state.role)],
      ['library','المكتبة الرقمية','Digital library','ابحث عن مصادر لمقررك أو بحثك، واقترح ما تحتاجه.','Find resources for your course or research and request what you need.',new URL('e-library-v3/',BASE).href],
      ['research','مسارات البحث العلمي','Research pathways','من السؤال والخطة إلى الأخلاقيات والتحليل والكتابة.','From the research question and plan to ethics, analysis and writing.',new URL('e-library-v3/#research',BASE).href],
      ['simulations','المحاكاة السريرية','Clinical simulation','مورد مساند للنقاش والتحضير للتدريب تحت الإشراف.','A supporting resource for discussion and preparation for supervised training.',new URL('clinical-simulations/',BASE).href],
      ['atlas','أطلس التمريض المصوّر','Illustrated nursing atlas','رسوم وشروح تساعد على توضيح الأدوات والأجهزة والسجلات.','Illustrations and explanations of equipment, tools and nursing records.',new URL('clinical-discovery/',BASE).href],
      ['spss','التحليل الإحصائي وSPSS','Statistical analysis and SPSS','تدريب ومساعد لاختيار الاختبار وبيانات للتطبيق.','Learning, test-selection support and practice data.',new URL('spss-course/',BASE).href],
      ['events','الندوات والتطوير العلمي','Webinars and academic development','فعاليات مختارة وروابط الجهات المنظمة لأعضاء التدريس والمعيدين.','Selected events and organiser links for faculty and teaching assistants.',hubLink('#events',state.role==='ta'?'ta':'faculty')],
      ['guides','أدلة العمل','Your institutional guides','أدلتك المهنية والحقوق والمسؤوليات والسلوك المؤسسي.','Professional guides, rights, responsibilities and institutional conduct.',hubLink('#guides')]
    ];
    return heading('academic',{ar:'اختر المورد الذي يخدم مهمتك التعليمية أو البحثية. التحليل الإحصائي واحد من أدوات البحث ضمن هذا المسار.',en:'Choose a resource that supports your teaching or research task. Statistical analysis is one research tool within this wider pathway.'})
      + `<div class="link-grid">${cards.map(([id,ar,en,da,de,url]) => `<a class="link-tile" href="${e(url)}" data-metrics-event="resource_open" data-metrics-item="development:${state.role}:institutional:academic:${id}"><h3>${e(text(ar,en))} <span aria-hidden="true">↗</span></h3><p>${e(text(da,de))}</p></a>`).join('')}</div>`;
  }

  const FIELDS = [
    ['idea','عنوان الخطوة أو المبادرة','Step or initiative title','مثال: توضيح متطلبات معاملة متكررة','Example: clarify a recurring service request'],
    ['need','الحاجة التي أريد معالجتها','The need I want to address','ما المشكلة أو الفرصة؟ وما الذي أعرفه عنها؟','What is the problem or opportunity, and what do I know about it?'],
    ['goal','النتيجة المحددة التي أريدها','The specific result I want','تغيير محدود يمكن ملاحظته أو مراجعته','A focused change that can be observed or reviewed'],
    ['actions','خطوات التنفيذ والمسؤوليات','Actions and responsibilities','خطوات محددة، ومن يتولى كل خطوة ضمن التكليف','Specific steps and who handles each within the agreed assignment'],
    ['review','كيف سأراجع النتيجة؟','How will I review the result?','معلومة قبل التنفيذ وبعده أو ملاحظة أداء مناسبة','Suitable before-and-after information or an observed performance'],
    ['beneficiaries','المستفيدون','People who will benefit','الفئة والحاجة، دون أسماء أو بيانات فردية','The group and its need, without names or individual details'],
    ['partners','التنسيق والموافقات','Coordination and approvals','من يحتاج إلى التنسيق أو الموافقة قبل التنفيذ؟','Who needs to coordinate or approve before implementation?'],
    ['timing','الوقت والموارد والمخاطر','Time, resources and risks','مدة واقعية، ومورد متاح، وعائق محتمل وبديله','A realistic timeframe, available resources, a likely obstacle and an alternative'],
    ['record','مرجع التوثيق القائم','Existing record to use','تقرير أو محضر أو سجل قائم؛ لا ترفع بيانات فردية هنا','An existing report, minute or register; do not enter individual records here']
  ];
  const FIELD_IDS = FIELDS.map(item => item[0]);
  function cleanDraft(raw) {
    const draft = {};
    for (const id of [...FIELD_IDS,'axis']) draft[id] = typeof raw?.[id] === 'string' ? raw[id].slice(0,id==='idea'?180:1800) : '';
    if (!institutional?.axes.some(axis => axis.id === draft.axis)) draft.axis = '';
    return draft;
  }
  function storedDrafts() {
    const drafts = {};
    const raw = localStorage.getItem(STORE);
    let saved;
    try { saved = JSON.parse(raw || 'null'); } catch (_) { return drafts; }
    if (saved?.schema === 1 && saved.drafts && typeof saved.drafts === 'object') {
      for (const role of skills.roles) if (saved.drafts[role.id]) drafts[role.id] = cleanDraft(saved.drafts[role.id]);
    }
    return drafts;
  }
  function loadDrafts() {
    try { Object.assign(state.drafts, storedDrafts()); }
    catch (_) { /* A blocked local store must not block reading. */ }
  }
  function saveCurrentDraft(clear = false) {
    // Read persisted drafts afresh so another role's unsaved work is not saved here.
    const drafts = storedDrafts();
    if (clear) delete drafts[state.job];
    else drafts[state.job] = cleanDraft(draftNow());
    localStorage.setItem(STORE, JSON.stringify({ schema: 1, drafts }));
  }
  function draftNow() { return state.drafts[state.job] ||= cleanDraft({}); }
  function formField(field) {
    const [id,ar,en,ha,he] = field;
    return `<div class="field"><label for="plan-${id}">${e(text(ar,en))}<span class="small-help">${e(text(ha,he))}</span></label>${id==='idea' ? `<input id="plan-${id}" name="${id}" maxlength="180" autocomplete="off">` : `<textarea id="plan-${id}" name="${id}" maxlength="1800" rows="3"></textarea>`}</div>`;
  }
  function renderPlan() {
    return heading('plan',{ar:'مسودة شخصية تساعدك على تحويل الفكرة إلى عمل محدد. اعرض ما يحتاج اعتمادًا على المسؤول المختص، واحتفظ بالتوثيق الرسمي في سجله القائم.',en:'A personal working draft to turn an idea into a focused action. Refer matters requiring approval to the responsible officer, and retain official evidence in its existing record.'})
      + `<p class="lead-note subtle">${text('الحفظ في هذا المتصفح على هذا الجهاز فقط. لا تُرسل هذه المسودة إلى الكلية. تجنّب أسماء الأشخاص والبيانات الفردية، وصدّر نسخة للاحتفاظ بها.', 'Saving stays in this browser on this device. This draft is not sent to the Faculty. Avoid names and individual details, and export a copy to retain it.')}</p>`
      + `<form id="planForm" class="plan-form"><div class="field"><label for="plan-axis">${text('محور الخطة المرتبط، إن وجد', 'Related strategic-plan axis, if relevant')}</label><select id="plan-axis" name="axis"><option value="">${text('اختر المحور', 'Choose an axis')}</option>${institutional.axes.map(axis => `<option value="${e(axis.id)}">${e(pick(axis.title))}</option>`).join('')}</select></div>${FIELDS.slice(0,5).map(formField).join('')}<details><summary>${text('تفاصيل إضافية للمشروع أو المبادرة', 'Additional project or initiative details')}</summary><div class="details-body">${FIELDS.slice(5).map(formField).join('')}</div></details><div class="plan-actions"><button type="submit" class="button">${text('احفظ على هذا الجهاز', 'Save on this device')}</button><button type="button" class="button secondary" data-plan-action="text">${text('نزّل نسخة نصية', 'Download a text copy')}</button><button type="button" class="button secondary" data-plan-action="json">${text('صدّر البيانات', 'Export data')}</button><button type="button" class="button secondary" data-plan-action="print">${text('اطبع المسودة', 'Print draft')}</button><button type="button" class="button danger" data-plan-action="clear">${text('امسح مسودة هذا الدور', 'Clear this role’s draft')}</button></div><p id="planStatus" class="status" role="status"></p></form>`;
  }
  function installPlanValues() {
    const draft = draftNow();
    for (const id of [...FIELD_IDS,'axis']) if ($('plan-'+id)) $('plan-'+id).value = draft[id] || '';
  }
  function capturePlan() {
    if (!$('planForm')) return draftNow();
    const draft = draftNow();
    for (const id of [...FIELD_IDS,'axis']) draft[id] = $('plan-'+id)?.value || '';
    state.drafts[state.job] = cleanDraft(draft);
    return state.drafts[state.job];
  }
  function planText(draft) {
    const lines = [text('مسودة خطوة أو مبادرة — كلية التمريض، جامعة طبرق','Working initiative draft — Faculty of Nursing, Tobruk University'),pick(jobNow().label),''];
    const axis = institutional.axes.find(item => item.id === draft.axis);
    if (axis) lines.push(text('محور الخطة: ','Plan axis: ')+pick(axis.title),'');
    for (const [id,ar,en] of FIELDS) lines.push(text(ar,en)+':',draft[id] || text('لم يحدد بعد','Not yet specified'),'');
    return lines.join('\n');
  }
  function download(content, extension, mime) {
    const blob = new Blob([content],{type:mime}); const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a'); anchor.href=url; anchor.download=`nursing-working-draft-${state.job}.${extension}`;
    document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function planAction(action) {
    const draft = capturePlan();
    if (action==='clear') {
      if (!window.confirm(text('سيُمسح نص مسودة هذا الدور من هذا المتصفح. هل تريد المتابعة؟','Clear this role’s draft from this browser?'))) return;
      state.drafts[state.job]=cleanDraft({});
      let persisted=true;try{saveCurrentDraft(true);}catch(_){persisted=false;}
      installPlanValues();$('planStatus').textContent=persisted?text('مُسحت مسودة هذا الدور.','This role’s draft was cleared.'):text('مُسحت المسودة من العرض؛ تعذّر تحديث حفظ المتصفح.','The displayed draft was cleared, but browser storage could not be updated.');return;
    }
    if (action==='text') download(planText(draft),'txt','text/plain;charset=utf-8');
    if (action==='json') download(JSON.stringify({schema:1,role:state.role,job:state.job,exportedAt:new Date().toISOString(),draft},null,2),'json','application/json;charset=utf-8');
    if (action==='print') {
      $('printPlan').innerHTML=`<div class="print-head"><h1>${text('مسودة خطوة أو مبادرة','Working initiative draft')}</h1><p>${text('كلية التمريض، جامعة طبرق','Faculty of Nursing, Tobruk University')} · ${e(pick(jobNow().label))}</p></div>${draft.axis?`<p>${e(pick(institutional.axes.find(item=>item.id===draft.axis)?.title))}</p>`:''}${FIELDS.map(([id,ar,en])=>`<section class="print-field"><h2>${e(text(ar,en))}</h2><p>${e(draft[id]||text('لم يحدد بعد','Not yet specified'))}</p></section>`).join('')}`;
      document.body.classList.add('printing-plan');window.print();
    }
  }
  function renderChrome() {
    document.documentElement.lang=state.lang;document.documentElement.dir=state.lang==='ar'?'rtl':'ltr';
    document.title=text('العمل المؤسسي والتطوير · كلية التمريض','Institutional work and development · Faculty of Nursing');
    $('facultyName').textContent=text('كلية التمريض، جامعة طبرق','Faculty of Nursing, Tobruk University');
    $('brandSub').textContent=text('العمل المؤسسي والتطوير','Institutional work and development');
    const logos=document.querySelectorAll('.brand img'); logos[0].alt=text('جامعة طبرق','Tobruk University');logos[1].alt=text('كلية التمريض','Faculty of Nursing');
    $('backLink').textContent=text('مساحتي المهنية','My professional space');$('backLink').href=hubLink();
    $('languageButton').textContent=text('English','العربية');$('languageButton').lang=text('en','ar');
    $('languageButton').setAttribute('aria-label',text('Switch to English','التبديل إلى العربية'));
    $('heroEyebrow').textContent=text('خطة الكلية في عملك اليومي','The Faculty plan in your daily work');
    $('pageTitle').textContent=text('دور واضح. مهارة تطبّق. عمل يتحسّن.','A clear contribution. Skills in practice. Better work.');
    $('heroDescription').textContent=text('اختر مساحتك ودورك لتجد مساهمة عملية في الخطة، ومهارات تناسب عملك، وأدوات لتطوير خدمة أو مبادرة.','Choose your space and role for practical contributions to the plan, relevant skills, and tools to improve a service or prepare an initiative.');
    $('planEntry').textContent=text('حضّر خطوة أو مبادرة','Prepare a step or initiative');
    $('roleSettingsTitle').textContent=text('خصّص المحتوى لدورك','Choose content for your role');
    $('audienceNav').setAttribute('aria-label',text('اختر مساحتك','Choose your space'));
    $('audienceNav').innerHTML=AUDIENCES.map(role=>`<a class="role-link" data-audience="${role}" href="${e(routeUrl(state.panel,role,DEFAULT_JOB[role]))}" ${role===state.role?'aria-current="page"':''}>${e(audienceName(role))}</a>`).join('');
    $('jobLabel').textContent=text('الدور الوظيفي أو الأكاديمي','Professional or academic role');
    $('jobSelect').innerHTML=skills.roles.filter(role=>role.audience===state.role).map(role=>`<option value="${e(role.id)}">${e(pick(role.label))}</option>`).join('');
    $('jobSelect').value=state.job;
    $('contextNote').textContent=text('توصيات للتطبيق ضمن اختصاصك وتكليفك وخطة القسم، مع الاستفادة من السجلات القائمة.','Suggested applications within your expertise, assignment and department plan, using existing records.');
    $('sectionNav').setAttribute('aria-label',text('محاور العمل والتطوير','Work and development themes'));
    $('sectionNav').innerHTML=PANELS.map(id=>`<a href="#${id}" data-route="${id}" class="${['quality','digital'].includes(id)?'featured':''}" ${state.panel===id?'aria-current="page"':''}>${icon(id)}<span>${e(navNames()[id])}</span></a>`).join('');
    $('footerText').textContent=text('كلية التمريض، جامعة طبرق · خطوات عملية تُربط بالعمل القائم وتُراجع فائدتها.','Faculty of Nursing, Tobruk University · Practical steps connected to existing work, with their usefulness reviewed.');
    $('feedbackLink').textContent=text('اقترح تحسينًا أو أبلغ عن رابط لا يعمل','Suggest an improvement or report a broken link');
    $('skipLink').textContent=text('انتقل إلى المحتوى','Skip to content');
  }
  function render({focus=false}={}) {
    if(!state.ready)return;
    renderChrome();
    const renderers={strategy:renderStrategy,quality:()=>renderProcess('quality'),digital:()=>renderProcess('digital'),community:renderCommunity,skills:renderSkills,ethics:renderEthics,academic:renderAcademic,plan:renderPlan};
    $('content').innerHTML=renderers[state.panel]();
    $('content').setAttribute('aria-labelledby','panelHeading');
    if(state.panel==='plan')installPlanValues();
    const moduleId=location.hash.startsWith('#skills-')?location.hash.slice(8):'';
    if(state.panel==='skills'&&['time','project','initiative'].includes(moduleId)){$('module-'+moduleId).open=true;if(focus)$('module-'+moduleId).scrollIntoView({block:'start'});}
    else if(focus){$('content').focus({preventScroll:true});$('content').scrollIntoView({block:'start'});}
  }
  function navigate(panel,{focus=true}={}) {
    capturePlan();
    state.panel=panel.startsWith('skills-')?'skills':[...PANELS,'plan'].includes(panel)?panel:'strategy';
    history.pushState(null,'',routeUrl(panel));render({focus});
  }
  function bind() {
    $('languageButton').addEventListener('click',()=>{capturePlan();state.lang=state.lang==='ar'?'en':'ar';history.replaceState(null,'',routeUrl(location.hash.slice(1)||state.panel));render();});
    $('jobSelect').addEventListener('change',()=>{capturePlan();const selected=skills.roles.find(role=>role.id===$('jobSelect').value&&role.audience===state.role);if(!selected)return;state.job=selected.id;history.pushState(null,'',routeUrl());render();metric('resource_open','role:'+state.job);});
    document.addEventListener('click',event=>{
      const target=event.target.closest('a,button');if(!target)return;
      if(target.id==='skipLink'&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey&&event.button===0){event.preventDefault();$('content').focus({preventScroll:true});$('content').scrollIntoView({block:'start'});return;}
      if(target.dataset.audience&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey&&event.button===0){event.preventDefault();capturePlan();state.role=target.dataset.audience;state.job=DEFAULT_JOB[state.role];history.pushState(null,'',routeUrl());render();metric('resource_open','role:'+state.job);return;}
      const href=target.getAttribute('href')||'';
      if(target.tagName==='A'&&(href.startsWith('#')&&([...PANELS,'plan'].includes(href.slice(1))||href.startsWith('#skills-')))&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey&&event.button===0){event.preventDefault();navigate(href.slice(1));return;}
      if(target.dataset.contribution){const item=(institutional.roleContributions[state.role]||[]).find(value=>value.id===target.dataset.contribution);if(!item)return;const draft=draftNow();const changes={idea:pick(item.title),actions:pick(item.action),record:pick(item.record),review:pick(item.review),axis:item.axes[0]||''};for(const [key,value]of Object.entries(changes))if(!draft[key])draft[key]=value;navigate('plan');$('planStatus').textContent=text('أضيفت الفكرة إلى الحقول الفارغة. راجع الهدف والوقت والموارد قبل حفظ المسودة.','The idea was added to blank fields. Review the goal, timing and resources before saving.');return;}
      if(target.dataset.planAction)planAction(target.dataset.planAction);
    });
    $('content').addEventListener('input',event=>{if(event.target.closest('#planForm'))capturePlan();});
    $('content').addEventListener('change',event=>{if(event.target.closest('#planForm'))capturePlan();});
    $('content').addEventListener('submit',event=>{
      if(event.target.id!=='planForm')return;event.preventDefault();capturePlan();
      try{saveCurrentDraft();$('planStatus').textContent=text('حُفظت مسودة هذا الدور على هذا الجهاز.','This role’s draft was saved on this device.');}
      catch(_){$('planStatus').textContent=text('تعذّر الحفظ في هذا المتصفح. نزّل نسخة نصية أو صدّر البيانات للاحتفاظ بها.','This browser could not save. Download a text copy or export the data to retain it.');}
    });
    window.addEventListener('popstate',()=>{capturePlan();readLocation();render();});
    window.addEventListener('hashchange',()=>{if(location.hash==='#content'){history.replaceState(null,'',routeUrl());$('content').focus({preventScroll:true});$('content').scrollIntoView({block:'start'});return;}capturePlan();readLocation();render({focus:true});});
    window.addEventListener('afterprint',()=>document.body.classList.remove('printing-plan'));
  }
  async function init() {
    $('languageButton').disabled=true;
    try {
      const data=await Promise.all(['institutional-content.json','skills-content.json','ethics-content.json'].map(async path=>{const response=await fetch(path+'?v='+RELEASE,{credentials:'same-origin'});if(!response.ok)throw new Error('content-unavailable');return response.json();}));
      [institutional,skills,ethics]=data;
      if(!Array.isArray(institutional.axes)||!Array.isArray(skills.roles)||!Array.isArray(ethics.sections)||!skills.roles.length)throw new Error('content-invalid');
      // Catalogue-relative resources are owned by the parent development hub.
      skills.resources=skills.resources.map(item=>({...item,url:new URL(item.url,new URL('../',location.href)).href}));
      readLocation();loadDrafts();state.ready=true;bind();$('jobSelect').disabled=false;$('languageButton').disabled=false;$('loadStatus').hidden=true;render();
    }catch(_){state.lang=document.documentElement.lang==='en'?'en':'ar';$('loadStatus').innerHTML=e(text('تعذّر تحميل المحتوى. أعد تحميل الصفحة أو ارجع إلى مساحتك المهنية.','Content could not be loaded. Reload this page or return to your professional space.'))+` <a href="../">${text('مساحتي المهنية','My professional space')}</a>`;}
  }
  init();
})();
