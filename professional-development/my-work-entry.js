/* Role-aware entry to the annual work companion. No personal state is read here. */
(() => {
  'use strict';
  const root = document.getElementById('annual-work');
  if (!root) return;
  const query = new URLSearchParams(location.search);
  let audience = ['staff', 'ta', 'faculty'].includes(query.get('role')) ? query.get('role') : 'staff';
  let lang = document.documentElement.lang === 'en' ? 'en' : 'ar';
  const nav = document.createElement('a');
  nav.href = '#annual-work';
  document.querySelector('.section-nav')?.prepend(nav);
  function render() {
    const t = (ar, en) => lang === 'ar' ? ar : en;
    const href = role => `my-work/?role=${role}&audience=${audience}&lang=${lang}`;
    const selected = audience === 'staff' ? 'employee' : audience;
    nav.textContent = t('مهامي خلال العام', 'My work through the year');
    const phases = lang === 'ar'
      ? ['أستعد', 'أواكب العمل', 'أساند التقييم', 'أغلق الفصل', 'أراجع وأطوّر']
      : ['Prepare', 'Keep work moving', 'Support assessment', 'Close the semester', 'Review and improve'];
    root.innerHTML = `<div class="annual-work-entry"><div class="annual-work-intro"><span class="annual-work-kicker">${t('مسؤولياتي، بصورة أوضح', 'A clearer view of my responsibilities')}</span><h2 id="annualWorkTitle">${t('دليلي العملي خلال العام', 'My work through the year')}</h2><p>${t('اختر دورك لتجد مهامًا مبسطة: ماذا أفعل؟ متى؟ ومع مَن أتعاون؟ رتّب خطواتك بالوتيرة التي تناسب عملك.', 'Choose your role for simple answers: what do I do, when, and who helps? Arrange your next steps around your work.')}</p><div class="annual-work-actions"><a class="button" href="${href(selected)}" data-metrics-event="resource_open" data-metrics-item="workguide:${selected}:entry">${t('افتح دليلي العملي', 'Open my work companion')} ↗</a>${audience === 'staff' ? `<a class="small-button" href="${href('registrar')}" data-metrics-event="resource_open" data-metrics-item="workguide:registrar:entry">${t('المسجل', 'Registrar')}</a><a class="small-button" href="${href('administration')}" data-metrics-event="resource_open" data-metrics-item="workguide:administration:entry">${t('الشؤون الإدارية', 'Administrative affairs')}</a>` : ''}</div></div><div class="annual-work-preview"><ol aria-label="${t('مراحل العام', 'Stages of the year')}">${phases.map((title, i) => `<li><span aria-hidden="true">${i + 1}</span>${title}</li>`).join('')}</ol><p>${t('مسار بصري مرن، مع متابعة شخصية اختيارية محفوظة على جهازك.', 'A flexible visual path, with optional personal organisation saved on your device.')}</p></div></div>`;
  }
  document.addEventListener('development:context', event => {
    if (['staff', 'ta', 'faculty'].includes(event.detail?.role)) audience = event.detail.role;
    lang = event.detail?.lang === 'en' ? 'en' : 'ar';
    render();
  });
  render();
})();
