(function () {
  'use strict';
  const roles = ['staff', 'ta', 'faculty'];
  const params = new URLSearchParams(location.search);
  let role = roles.includes(params.get('role')) ? params.get('role') : 'staff';
  let lang = document.documentElement.lang === 'en' ? 'en' : 'ar';
  let data = null, failed = false, provider = 'all', scope = 'public', expanded = false;
  const $ = id => document.getElementById(id);
  const tr = (ar, en) => lang === 'ar' ? ar : en;
  const pick = value => typeof value === 'string' ? value : value?.[lang] || value?.ar || value?.en || '';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function url(value) { try { const u = new URL(value, location.href); return ['https:', 'http:'].includes(u.protocol) ? u.href : '#'; } catch (_) { return '#'; } }
  function label(type) { return ({ reference: tr('مرجع متاح للقراءة', 'Public reading reference'), recordings: tr('تسجيلات ودروس مرئية', 'Recordings and tutorials'), catalogue: tr('بوابة فرص · تحقّق من الأهلية', 'Opportunity portal · check eligibility'), archive: tr('أرشيف معلن', 'Labelled archive'), paid: tr('إعلان بمقابل مالي', 'Paid training announcement') })[type] || tr('مرجع جامعي', 'University reference'); }
  function sourceCard(item) {
    return `<article class="card saudi-source"><div class="card-top"><span class="badge">${esc(label(item.sourceType))}</span><span class="badge">${esc(item.language === 'multi' ? tr('العربية والإنجليزية', 'Arabic and English') : item.language === 'en' ? tr('الإنجليزية', 'English') : tr('العربية', 'Arabic'))}</span></div><span class="provider">${esc(pick(item.university) || item.provider)}</span><h3>${esc(pick(item.title))}</h3><p>${esc(pick(item.description))}</p><div class="access">${esc(pick(item.access))}</div><a class="card-link" target="_blank" rel="noopener noreferrer" href="${esc(url(item.url))}" data-metrics-event="resource_open" data-metrics-item="development:${role}:saudi:${esc(item.id)}">${tr('فتح المصدر الرسمي', 'Open the official source')} ↗</a></article>`;
  }
  function render() {
    const host = $('saudi-development'); if (!host) return;
    host.setAttribute('aria-labelledby', 'saudiTitle');
    const intro = `<div class="section-heading"><div><span class="kicker">↗</span><h2 id="saudiTitle">${tr('خبرات الجامعات السعودية', 'Learning from Saudi universities')}</h2><p>${tr('مصادر عربية وخبرات تطوير نختار منها ما يلائم العمل في كليتنا.', 'Arabic resources and development practices selected for work at our Faculty.')}</p></div></div>`;
    if (!data) { host.innerHTML = intro + `<p class="local-note">${failed ? tr('تعذّر تحميل هذه المراجع الآن. أعد تحميل الصفحة للمحاولة.', 'These references could not be loaded. Reload to try again.') : tr('جارٍ تحميل المصادر السعودية…', 'Loading Saudi resources…')}</p>`; return; }
    const all = data.sources.filter(x => x.roles?.includes(role));
    const providers = new Map(all.map(x => [x.universityId, x.university]));
    if (provider !== 'all' && !providers.has(provider)) provider = 'all';
    const filtered = all.filter(x => (provider === 'all' || x.universityId === provider) && (scope === 'all' || (scope === 'public' ? ['reference', 'recordings'].includes(x.sourceType) : x.sourceType === scope)));
    const shown = expanded ? filtered : filtered.slice(0, 6);
    const n = data.nationalReference;
    host.innerHTML = intro + `<div class="saudi-spotlight"><div><span class="eyebrow">${tr('جامعة الجوف', 'Jouf University')}</span><h3>${tr('من الاحتياج إلى التعلم والتطبيق', 'From a need to learning and application')}</h3><p>${esc(pick(data.jouf.summary))}</p></div><button type="button" class="small-button" id="showJouf">${tr('عرض خيارات جامعة الجوف', 'Show Jouf University options')}</button></div><p class="source-note">${tr('إعلان الجوف للدورات التقنية بتاريخ 8 يونيو 2026 يذكر مقابلًا ماليًا. شروط كل برنامج هي المرجع.', 'Jouf’s technical-course announcement dated 8 June 2026 states that fees apply. Check each programme’s conditions.')} <a href="${esc(url(data.jouf.paidSource))}" target="_blank" rel="noopener noreferrer" data-metrics-event="resource_open" data-metrics-item="development:${role}:saudi:jouf-fee-source">${tr('قراءة الإعلان الرسمي', 'Read the official announcement')} ↗</a></p><details class="saudi-national"><summary>${tr('ماذا استفدنا من رؤية السعودية 2030؟', 'What did we learn from Saudi Vision 2030?')}</summary><h3>${esc(pick(n.title))}</h3><p>${esc(pick(n.idea))}</p><p>${esc(pick(n.adaptation))}</p><a href="${esc(url(n.url))}" target="_blank" rel="noopener noreferrer" data-metrics-event="resource_open" data-metrics-item="development:${role}:saudi:vision2030">${esc(pick(n.institution))} ↗</a></details><div class="saudi-filters"><label for="saudiUniversity">${tr('الجامعة', 'University')}<select id="saudiUniversity"><option value="all">${tr('جميع الجامعات في القائمة', 'All universities in this list')}</option>${[...providers].sort((a,b) => pick(a[1]).localeCompare(pick(b[1]))).map(([id,name]) => `<option value="${esc(id)}" ${provider === id ? 'selected' : ''}>${esc(pick(name))}</option>`).join('')}</select></label><label for="saudiAccess">${tr('نوع الإتاحة', 'Access type')}<select id="saudiAccess">${['public','recordings','catalogue','archive','all'].map(value => `<option value="${value}" ${scope === value ? 'selected' : ''}>${esc(value === 'public' ? tr('مراجع وتسجيلات متاحة', 'Public references and recordings') : value === 'all' ? tr('كل الخيارات وشروطها', 'All options and conditions') : label(value))}</option>`).join('')}</select></label></div><p class="saudi-count" role="status">${shown.length} / ${filtered.length} ${tr('مصادر مناسبة للفئة والاختيارات الحالية', 'sources matching this role and selection')}</p><div class="cards">${shown.length ? shown.map(sourceCard).join('') : `<p class="empty">${tr('لا توجد مصادر مطابقة. جرّب جامعة أخرى أو نوع إتاحة مختلفًا.', 'No sources match. Try another university or access type.')}</p>`}</div>${filtered.length > 6 ? `<button type="button" class="small-button saudi-more" id="saudiMore">${expanded ? tr('عرض أقل', 'Show fewer') : tr('عرض بقية المصادر', 'Show more sources')}</button>` : ''}<details class="saudi-coverage"><summary>${tr('نطاق البحث ومصادره', 'Review scope and sources')} · ${data.coverage.length} ${tr('جامعة', 'universities')}</summary><p>${esc(pick(data.scope))}</p><div class="saudi-table"><table><thead><tr><th>${tr('الجامعة', 'University')}</th><th>${tr('ما وجدناه وشروط الاستفادة', 'Findings and access conditions')}</th><th>${tr('المصدر', 'Source')}</th></tr></thead><tbody>${data.coverage.map(item => `<tr><th scope="row">${esc(pick(item.university))}</th><td>${esc(pick(item.finding) || pick(item.access))}</td><td><a href="${esc(url(item.url))}" target="_blank" rel="noopener noreferrer" data-metrics-event="resource_open" data-metrics-item="development:${role}:saudi:coverage:${esc(item.id)}">${tr('المصدر الرسمي', 'Official source')} ↗</a></td></tr>`).join('')}</tbody></table></div><p>${tr('تاريخ الاطلاع: ', 'Reviewed: ')}${esc(data.updated)}</p></details>`;
  }
  function init() {
    const host = $('saudi-development'); if (!host || host.dataset.saudiReady) return;
    host.dataset.saudiReady = '1'; render();
    host.addEventListener('change', event => {
      if (event.target.id === 'saudiUniversity') provider = event.target.value;
      else if (event.target.id === 'saudiAccess') scope = event.target.value;
      else return;
      expanded = false; render();
    });
    host.addEventListener('click', event => {
      if (event.target.closest('#showJouf')) { provider = 'jouf'; scope = 'all'; expanded = true; render(); $('saudiUniversity')?.focus(); }
      else if (event.target.closest('#saudiMore')) { expanded = !expanded; render(); }
    });
    document.addEventListener('development:context', event => { if (roles.includes(event.detail?.role)) role = event.detail.role; lang = event.detail?.lang === 'en' ? 'en' : 'ar'; render(); });
    fetch('saudi-development.json?v=20261022-3').then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }).then(value => { if (!Array.isArray(value.sources) || !Array.isArray(value.coverage) || !value.nationalReference || !value.jouf) throw new Error('Invalid Saudi reference data'); data = value; render(); }).catch(() => { failed = true; render(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
