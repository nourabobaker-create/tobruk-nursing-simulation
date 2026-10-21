(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else { root.DevelopmentMeasurement = api; api.start(root); }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const roles = ['staff', 'ta', 'faculty'];
  const fields = ['views', 'guides', 'resources', 'events', 'calendar', 'started', 'completed', 'applied'];
  function classify(event) {
    const item = typeof event?.item === 'string' ? event.item : '';
    const view = /^development:role:(staff|ta|faculty)$/.exec(item);
    if (view && ['section_view', 'page_view'].includes(event.event)) return { role: view[1], field: 'views' };
    const match = /^development:(staff|ta|faculty):([A-Za-z0-9_./:#-]+)$/.exec(item);
    if (!match) return null;
    const role = match[1], action = match[2];
    if (event.event === 'resource_open') {
      if (action.startsWith('guide-')) return { role, field: 'guides' };
      if (action.startsWith('calendar:')) return { role, field: 'calendar' };
      if (action.startsWith('event:') || action.startsWith('official-calendar:')) return { role, field: 'events' };
      return { role, field: 'resources' };
    }
    if (event.event === 'activity_start' && action.startsWith('learning-start:')) return { role, field: 'started' };
    if (event.event === 'activity_complete' && action.startsWith('learning-complete:')) return { role, field: 'completed' };
    if (event.event === 'activity_complete' && action.startsWith('learning-apply:')) return { role, field: 'applied' };
    return null;
  }
  function aggregate(events, from, to) {
    const rows = Object.fromEntries(roles.map(role => [role, { role, sessions: new Set(), ...Object.fromEntries(fields.map(field => [field, 0])) }]));
    const seen = new Set();
    for (const event of Array.isArray(events) ? events : []) {
      const at = Date.parse(event.at);
      if (!Number.isFinite(at) || at < from || at > to || typeof event.id !== 'string' || seen.has(event.id)) continue;
      const value = classify(event); if (!value) continue;
      seen.add(event.id); rows[value.role][value.field]++;
      if (typeof event.session === 'string') rows[value.role].sessions.add(event.session);
    }
    return roles.map(role => ({ ...rows[role], sessions: rows[role].sessions.size }));
  }
  function start(window) {
    const document = window.document; if (!document || document.getElementById('development-measurement')) return;
    let panel, lastLanguage = '', recordedViews = new Set();
    const roleNow = () => roles.includes(new URL(window.location.href).searchParams.get('role')) ? new URL(window.location.href).searchParams.get('role') : 'staff';
    const ar = () => document.documentElement.lang !== 'en';
    const t = (a, e) => ar() ? a : e;
    const node = (tag, text, className) => { const element = document.createElement(tag); if (text != null) element.textContent = text; if (className) element.className = className; return element; };
    function markView() {
      if (window.PortalMetricsCore?.preference?.() === 'off') { recordedViews.clear(); return; }
      const role = roleNow(); if (recordedViews.has(role)) return;
      if (window.PortalMetrics?.record('section_view', 'development:role:' + role, 'faculty')) recordedViews.add(role);
    }
    function render() {
      if (!panel) return;
      const open = panel.open; panel.replaceChildren(); panel.open = open; lastLanguage = document.documentElement.lang;
      panel.append(node('summary', t('متابعة استخدام مساحات التطوير · بيانات هذا الجهاز', 'Development-space follow-up · this device only')));
      panel.append(node('p', t('تعرض هذه الأرقام آخر 30 يومًا من السجل المقاس في هذا المتصفح فقط. القياس اختياري، والجلسات ليست أشخاصًا مختلفين؛ اسم المساحة لا يثبت صفة الزائر.', 'These figures cover the last 30 days of measured events in this browser only. Measurement is optional. Sessions are not unique people, and the space visited does not establish a visitor’s role.')));
      const core = window.PortalMetricsCore;
      panel.append(node('p', t('المتابعة المركزية: تُجمع التفاعلات المستلمة ضمن أقسام لوحة البوابة الحالية. التفصيل أدناه محلي؛ لا يعرض إجمالي الأجهزة المشاركة.', 'Central follow-up: received interactions contribute to the existing portal-dashboard sections. The breakdown below is local and does not represent all participating devices.')));
      const now = Date.now(), events = core?.readEvents?.() || [], rows = aggregate(events, now - 30 * 86400000, now), any = rows.some(row => fields.some(field => row[field] > 0));
      if (!any) panel.append(node('p', t('لا تتوفر بيانات مقاسة لهذه المساحات على هذا الجهاز بعد. يبدأ تسجيل التفاعلات بعد تفعيل خيار القياس أسفل الصفحة.', 'No measured data for these spaces is available on this device yet. Recording starts after enabling optional measurement at the bottom of the page.')));
      const wrap = node('div', null, 'development-measurement-scroll'), table = node('table'), head = node('thead'), tr = node('tr');
      const headers = [t('المساحة', 'Space'), t('جلسات', 'Sessions'), t('فتح الأدلة', 'Guide clicks'), t('فتح المصادر', 'Resource clicks'), t('الفعاليات', 'Event links'), t('طلب التقويم', 'Calendar requests'), t('بدأ التعلّم*', 'Started*'), t('أكمل التعلّم*', 'Completed*'), t('طبّق مهارة*', 'Applied*')];
      headers.forEach(label => { const th = node('th', label); th.scope = 'col'; tr.append(th); }); head.append(tr); table.append(head);
      const body = node('tbody'), names = { staff: t('الموظفون', 'Staff'), ta: t('المعيدون', 'Teaching assistants'), faculty: t('هيئة التدريس', 'Faculty') };
      for (const row of rows) { const line = node('tr'), name = node('th', names[row.role]); name.scope = 'row'; line.append(name); for (const field of ['sessions', 'guides', 'resources', 'events', 'calendar', 'started', 'completed', 'applied']) line.append(node('td', any ? String(row[field]) : '—')); body.append(line); }
      table.append(body); wrap.append(table); panel.append(wrap);
      panel.append(node('p', t('* إقرارات ذاتية اختيارية؛ لا تُعد تحققًا من الإتمام أو أثرًا مثبتًا. فتح الدليل أو المصدر لا يثبت قراءته، وطلب ملف التقويم لا يثبت حضور الفعالية. نص سجل التعلّم والبحث لا يُرسل إلى أداة القياس.', '* Optional self-reports, not verified completion or proven effect. A guide/resource click does not establish reading; a calendar-file request does not establish attendance. Journal text and search terms are not sent to measurement.')));
      const link = node('a', t('فتح لوحة مؤشرات البوابة', 'Open the portal dashboard')); link.href = '../portal-metrics/'; panel.append(link);
    }
    function init() {
      if (document.getElementById('development-measurement')) return;
      const style = node('style'); style.textContent = '.development-measurement{margin:26px 0;padding:16px;border:1px solid #c9dcd2;border-radius:16px;background:#f0f6f2;color:#234d3d;font-size:15px}.development-measurement summary{cursor:pointer;font-weight:800}.development-measurement p{line-height:1.8}.development-measurement-scroll{max-width:100%;overflow:auto}.development-measurement table{border-collapse:collapse;width:100%;min-width:700px;background:white}.development-measurement th,.development-measurement td{padding:9px;border:1px solid #d5e3dc;text-align:start}.development-measurement a{display:inline-block;margin-top:8px;font-weight:800;text-decoration:underline}'; document.head.append(style);
      panel = node('details', null, 'development-measurement'); panel.id = 'development-measurement';
      const footer = document.querySelector('main > footer'); if (footer) footer.before(panel); else document.querySelector('main')?.append(panel);
      markView(); render();
      document.addEventListener('click', event => {
        const roleLink = event.target.closest?.('[data-role]');
        if (roleLink && window.PortalMetricsCore?.preference?.() !== 'off') recordedViews.add(roleLink.dataset.role);
        setTimeout(() => { if (event.target.closest?.('[data-portal-metrics-widget]')) markView(); render(); }, 0);
      });
      window.addEventListener('popstate', () => { markView(); render(); });
      window.addEventListener('storage', event => { if (event.key?.includes('metrics')) { markView(); render(); } });
      document.addEventListener('visibilitychange', () => { if (!document.hidden) { markView(); render(); } });
      if (typeof MutationObserver === 'function') new MutationObserver(() => { if (lastLanguage !== document.documentElement.lang) render(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
  }
  return Object.freeze({ classify, aggregate, start });
});
