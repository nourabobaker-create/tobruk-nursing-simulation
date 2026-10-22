(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else { root.DevelopmentNeeds = api; api.start(root); }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const goals = {
    staff: [
      { id: 'records', ar: 'تنظيم السجلات والعمل الرقمي', en: 'Organise records and digital work', resources: ['guide-staff', 'ms-excel', 'jouf-onedrive'] },
      { id: 'service', ar: 'تحسين الخدمة والتواصل', en: 'Improve service and communication', resources: ['guide-staff', 'workplace-communication', 'edraak-feedback'] },
      { id: 'data', ar: 'استخدام البيانات في التحسين', en: 'Use data for improvement', resources: ['edraak-data', 'forms-basics', 'ms-excel'] }
    ],
    ta: [
      { id: 'preparation', ar: 'الاستعداد للجلسة التعليمية', en: 'Prepare for a teaching session', resources: ['guide-faculty-ta', 'sa-seu-training-packs', 'berkeley-ta-start'] },
      { id: 'feedback', ar: 'تقديم ملاحظات تساعد الطلبة', en: 'Give helpful student feedback', resources: ['stanford-feedback', 'edraak-feedback', 'sa-taibah-elearning-guides'] },
      { id: 'research', ar: 'بداية بحث منظم', en: 'Start a structured research project', resources: ['guide-research-en', 'research-ethics', 'pubmed-search'] }
    ],
    faculty: [
      { id: 'teaching-assessment', ar: 'تطوير التدريس والتقييم', en: 'Develop teaching and assessment', resources: ['stanford-outcomes', 'assessment', 'sa-kau-question-bank-excel'] },
      { id: 'research', ar: 'البحث والإشراف على المشروعات', en: 'Research and project supervision', resources: ['guide-research-en', 'research-ethics', 'zotero-references'] },
      { id: 'leadership', ar: 'القيادة ودعم فريق العمل', en: 'Leadership and team support', resources: ['nursing-leadership', 'sa-mu-job-competencies', 'teamwork'] }
    ]
  };
  const text = {
    ar: { title: 'ابدأ باحتياجك التطويري', intro: 'حدّد أولوية واحدة، ثم تعلّم وجرّب وحدّد كيف ستراجع أثرها في عملك.', label: 'ما الذي تريد تطويره الآن؟', choose: 'اختر أولوية واحدة', suggested: '3 مصادر لبداية عملية', add: 'أضف إلى خطة تطويري', note: 'اختيار شخصي على هذا الجهاز؛ ليس استبيانًا أو تقييمًا للأداء. لا تُرسل الكتابة في الخطة إلى الكلية، ولا تُسجّل نتائج قبل تطبيقها وقياسها.', empty: 'اختر أولوية لتظهر لك المصادر المناسبة وخطوة مقترحة لخطة تطويرك.', waiting: 'جارٍ تجهيز المصادر المناسبة…', added: 'أُضيف اقتراح إلى خطة تطويرك. راجعه وحدّد موعدك ثم احفظه على هذا الجهاز.', existing: 'لديك خطة أو مسودة موجودة؛ أبقيناها دون تغيير وفتحناها للمراجعة. يمكنك تعديلها بنفسك.', unavailable: 'تعذّر فتح خطة التطوير الآن. أعد تحميل الصفحة للمحاولة.', open: 'فتح المصدر' },
    en: { title: 'Start with your development need', intro: 'Choose one priority, then learn, try it and decide how to review its effect on your work.', label: 'What would you like to develop now?', choose: 'Choose one priority', suggested: '3 resources for a practical start', add: 'Add to my development plan', note: 'A personal choice on this device, not a survey or performance assessment. Writing in your plan is not sent to the Faculty. Record outcomes only after applying and assessing the change.', empty: 'Choose a priority to see suitable resources and a suggested step for your development plan.', waiting: 'Preparing suitable resources…', added: 'A suggestion was added to your plan. Review it, set your own date and save it on this device.', existing: 'You already have a plan or draft. It was preserved without changes and opened for review. You can edit it yourself.', unavailable: 'The development plan could not be opened now. Reload the page to try again.', open: 'Open resource' }
  };
  function getGoal(role, id) { return Object.hasOwn(goals, role) ? goals[role].find(goal => goal.id === id) || null : null; }
  function matchingResources(role, id, resources) {
    const goal = getGoal(role, id);
    if (!goal || !Array.isArray(resources)) return [];
    return goal.resources.map(resourceId => resources.find(resource => resource?.id === resourceId && Array.isArray(resource.roles) && resource.roles.includes(role))).filter(Boolean);
  }
  function start(window) {
    const document = window.document;
    if (!document) return;
    let host, role = 'staff', lang = 'ar', resources = [], notice = '';
    const choices = { staff: '', ta: '', faculty: '' };
    const copy = key => text[lang][key];
    const pick = value => typeof value === 'string' ? value : value?.[lang] || value?.ar || value?.en || '';
    const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    function safeUrl(value) { try { const url = new window.URL(value, window.location.href); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch (_) { return null; } }
    function render() {
      if (!host) return;
      const goal = getGoal(role, choices[role]), list = matchingResources(role, choices[role], resources);
      host.lang = lang; host.dir = lang === 'ar' ? 'rtl' : 'ltr';
      host.classList.add('dn-section'); host.setAttribute('aria-labelledby', 'development-needs-title');
      host.innerHTML = `<div class="dn-heading"><span aria-hidden="true">◎</span><div><h2 id="development-needs-title">${esc(copy('title'))}</h2><p>${esc(copy('intro'))}</p></div></div><label class="dn-label" for="development-needs-goal">${esc(copy('label'))}</label><select id="development-needs-goal"><option value="">${esc(copy('choose'))}</option>${goals[role].map(item => `<option value="${item.id}"${goal?.id === item.id ? ' selected' : ''}>${esc(item[lang])}</option>`).join('')}</select><div class="dn-recommendations">${goal ? `<h3>${esc(copy('suggested'))}</h3>${list.length ? `<div class="dn-resources">${list.map(item => { const url = safeUrl(item.url); return url ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" data-metrics-event="resource_open" data-metrics-item="development:${role}:${esc(item.id)}"><strong>${esc(pick(item.title))}</strong><span>${esc(item.provider || '')}</span><small>${esc(copy('open'))} ↗</small></a>` : ''; }).join('')}</div>` : `<p>${esc(copy('waiting'))}</p>`}<button type="button" class="dn-add" data-needs-add="${goal.id}" data-metrics-event="activity_start" data-metrics-item="development:${role}:workbench:plan:open">${esc(copy('add'))}</button>` : `<p class="dn-empty">${esc(copy('empty'))}</p>`}</div><p class="dn-note">${esc(copy('note'))}</p><p class="dn-status" role="status" aria-live="polite">${notice ? esc(copy(notice)) : ''}</p>`;
    }
    function context(event) {
      const params = new window.URL(window.location.href).searchParams;
      const requestedRole = event?.detail?.role || params.get('role');
      role = Object.hasOwn(goals, requestedRole) ? requestedRole : 'staff';
      lang = (event?.detail?.lang || document.documentElement.lang) === 'en' ? 'en' : 'ar';
      if (Array.isArray(event?.detail?.resources)) resources = event.detail.resources;
      notice = ''; render();
    }
    function init() {
      host = document.getElementById('development-needs');
      if (!host || host.dataset.needsReady) return;
      host.dataset.needsReady = '1'; context();
      host.addEventListener('change', event => {
        if (event.target.id !== 'development-needs-goal') return;
        const goal = getGoal(role, event.target.value);
        choices[role] = goal?.id || ''; notice = '';
        if (goal) window.PortalMetrics?.record('resource_open', 'development:' + role + ':needs:' + goal.id, 'faculty');
        render();
      });
      host.addEventListener('click', event => {
        const button = event.target.closest?.('[data-needs-add]');
        if (!button || !host.contains(button) || !getGoal(role, button.dataset.needsAdd)) return;
        notice = 'unavailable';
        document.dispatchEvent(new window.CustomEvent('development:plan-suggest', { detail: { role, goal: button.dataset.needsAdd } }));
        const status = host.querySelector('.dn-status'); if (status) status.textContent = copy(notice);
      });
      document.addEventListener('development:context', context);
      document.addEventListener('development:plan-result', event => {
        if (event.detail?.role !== role || event.detail?.goal !== choices[role]) return;
        notice = ['added', 'existing'].includes(event.detail?.status) ? event.detail.status : 'unavailable';
        const status = host.querySelector('.dn-status'); if (status) status.textContent = copy(notice);
      });
      window.addEventListener('popstate', () => context());
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
  }
  return Object.freeze({ getGoal, matchingResources, start });
});
