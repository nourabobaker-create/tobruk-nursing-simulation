(()=>{'use strict';
const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const n=x=>Number(x||0).toLocaleString('ar-LY');const labels={unassessed:'لم يُقيّم',needs_review:'بانتظار مراجعة الحالة',not_started:'لم يبدأ',in_progress:'قيد العمل',submitted:'بانتظار المراجعة',returned:'يحتاج استكمالاً',accepted:'مقبول في السجل',na:'غير منطبق بمبرر',documented_pending_review:'له مصدر مرتبط',draft:'مسودة موجودة',available:'وثيقة موجودة',reported_practice:'ممارسة موثقة بالسرد',central_evidence_needed:'شاهد مركزي مطلوب من الجامعة',central_verification_needed:'تحقق مركزي من الجامعة',field_evidence_needed:'شاهد ميداني مطلوب',development_gap:'فجوة تطوير حقيقية',competency_evidence_needed:'إثبات كفاية الكادر مطلوب'};
let data=null,view='overview',lastFocus=null;const config=window.ACCREDITATION_CONFIG||{};
function url(s){try{const u=new URL(s);return /^https?:$/.test(u.protocol)?u.href:''}catch{return ''}}
function badge(s){return `<span class="status ${esc(s)}">${esc(labels[s]||s)}</span>`}
function totals(){return data.criteria.reduce((a,c)=>({total:a.total+c.total,accepted:a.accepted+c.accepted,na:a.na+c.notApplicable,reviewed:a.reviewed+c.reviewed,documented:a.documented+(c.documented||0)}),{total:0,accepted:0,na:0,reviewed:0,documented:0})}
function validate(d){if(!d||!Array.isArray(d.criteria)||d.criteria.length!==10)throw Error('بيانات غير مكتملة');d.criteria.forEach(c=>{for(const k of ['total','accepted','notApplicable','reviewed']){c[k]=Number(c[k]||0);if(!Number.isFinite(c[k])||c[k]<0)throw Error('قيم غير صالحة')}if(c.accepted>c.total-c.notApplicable)throw Error('نسبة غير صالحة');c.indicators=Array.isArray(c.indicators)?c.indicators:[]});d.tasks=Array.isArray(d.tasks)?d.tasks:[];d.evidence=Array.isArray(d.evidence)?d.evidence:[];d.team=Array.isArray(d.team)?d.team:[];d.workProgress=Array.isArray(d.workProgress)?d.workProgress:[];return d}
function jsonp(endpoint){return new Promise((resolve,reject)=>{const callback='accreditation_'+Date.now();const s=document.createElement('script');const timeout=setTimeout(()=>done(Error('انتهت مهلة التحديث')),15000);function done(error,value){clearTimeout(timeout);delete window[callback];s.remove();error?reject(error):resolve(value)}window[callback]=d=>done(null,d);s.onerror=()=>done(Error('تعذر الاتصال بخدمة المتابعة'));const u=new URL(endpoint);u.searchParams.set('action','summary');u.searchParams.set('callback',callback);s.src=u.href;document.head.appendChild(s)})}
async function load(){try{$('sync-badge').textContent='جارٍ التحديث';if(config.summaryEndpoint){data=validate(await jsonp(config.summaryEndpoint));$('notice').className='note-bar';$('notice').textContent='البيانات من سجل المتابعة المشترك. تتحدث هذه اللوحة تلقائياً كل دقيقة.';$('sync-badge').textContent='متصل بالسجل المشترك'}else{const r=await fetch('public-progress.json',{cache:'no-store'});if(!r.ok)throw Error('تعذر تحميل البيانات');data=validate(await r.json());$('notice').textContent=data.mode==='evidence_mapped'?'أُدرجت المصادر والأعمال الموجودة من المشروع. تغطية المصادر لا تعني استيفاء المعيار أو اعتماده. الربط التلقائي لتعديلات الفريق لم يُفعَّل بعد.':'نسخة تأسيسية للعرض: جارٍ استيراد المصادر والأعمال السابقة. عدم ظهور شاهد هنا لا يعني عدم وجوده لدى الكلية. الحفظ المشترك لم يُفعَّل بعد.';$('sync-badge').textContent='الربط المشترك قيد التجهيز'}$('data-time').textContent='تاريخ البيانات: '+new Date(data.updatedAt).toLocaleString('ar-LY');render()}catch(e){$('sync-badge').textContent='تعذر التحديث';$('notice').className='note-bar error-display';$('notice').textContent=(e.message||'تعذر التحديث')+'؛ لا تُعد البيانات المعروضة تحديثاً جديداً.'}}
function go(v){view=v;document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('selected',b.dataset.view===v));render();window.scrollTo({top:0,behavior:'smooth'})}
function modal(title,content){lastFocus=document.activeElement;$('modal-title').textContent=title;$('modal-content').innerHTML=content;$('modal').classList.add('open');$('close').focus()}
function close(){$('modal').classList.remove('open');if(lastFocus)lastFocus.focus()}
function criteria(){const a=totals(),active=a.total-a.na,documentedMode=data.mode==='evidence_mapped',pct=active?Math.round(100*(documentedMode?a.documented:a.accepted)/active):0;return `<section class="summary public-summary"><div class="summary-main"><div class="ring" style="--p:${pct}"><div><b>${documentedMode||a.reviewed?n(pct)+'٪':'—'}</b><small>${documentedMode?'تغطية المصادر':a.reviewed?'شواهد مقبولة':'لم يبدأ القياس'}</small></div></div><div><h2>${documentedMode?'مؤشرات لها مصادر مرتبطة':'اكتمال الشواهد المراجعة'}</h2><p>${n(documentedMode?a.documented:a.accepted)} من ${n(active)} مؤشراً منطبقاً</p><span class="light-pill">${documentedMode?n(data.evidence.length)+' مصدر موجود · القبول النهائي لم يُحسم':'الحكم بعد مراجعة الشواهد'}</span></div></div><div class="summary-cell"><span>المعايير الرسمية</span><b>١٠</b><small>دليل الاعتماد المؤسسي ٢٠٢٣</small></div><div class="summary-cell"><span>مؤشرات المعيار</span><b>${n(a.total)}</b><small>لا تُحذف المؤشرات لتغيير النسبة</small></div></section><div class="section-row"><h2>معايير الاعتماد العشرة</h2><span>اضغطي على المعيار لعرض مؤشراته</span></div><section class="criteria-grid public-criteria">${data.criteria.map(c=>{const active=c.total-c.notApplicable,linked=data.mode==='evidence_mapped',value=linked?(c.documented||0):c.accepted,p=active?Math.round(100*value/active):0;return `<button class="criterion-card" data-criterion="${c.number}"><div class="card-top"><span class="criterion-no">${n(c.number)}</span>${badge(linked&&value?'documented_pending_review':c.reviewed?'in_progress':'unassessed')}</div><h3>${esc(c.title)}</h3><div class="metric"><b>${linked||c.reviewed?n(p)+'٪':'—'}</b><span>${n(value)} / ${n(active)} ${linked?'مؤشر له مصدر':'مؤشر'}</span></div><div class="progress-track" role="progressbar" aria-label="تغطية المؤشرات بالمصادر أو المراجعة بحسب الوضع المعروض" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:${p}%"></div></div>${(c.practiceTitles||[]).length?'<div class="criterion-practices">'+c.practiceTitles.slice(0,2).map(t=>'<small>✓ '+esc(t)+'</small>').join('')+'</div>':''}<footer><span>${linked?n(c.availableEvidence||0)+' مصدر · ':''}${n(data.tasks.filter(t=>String(t.requirement||'').split('.')[0]===String(c.number)).length)} مهمة مرتبطة</span><span>↖</span></footer></button>`}).join('')}</section>`}
function renderTasks(){const units=[...new Set(data.tasks.map(t=>t.unit).filter(Boolean))];return `<div class="task-filters"><input id="task-search" aria-label="البحث في المهام" placeholder="ابحث عن مهمة أو شاهد مطلوب…"><select id="unit-filter" aria-label="الجهة المسؤولة"><option value="">جميع الجهات</option>${units.map(u=>`<option>${esc(u)}</option>`).join('')}</select></div><div id="task-list"></div>`}
function tasksList(){const query=($('task-search')?.value||'').trim(),unit=$('unit-filter')?.value||'';const ts=data.tasks.filter(t=>(!unit||t.unit===unit)&&(!query||(t.title+' '+t.requiredEvidence).includes(query)));$('task-list').innerHTML=ts.map(t=>`<article class="task-item"><span class="code">${esc(t.requirement)}</span><div><h3>${esc(t.title)}</h3>${t.sourceStatus?'<p class="public-strong">حالة العمل في المصدر: '+esc(t.sourceStatus)+'</p>':''}<p>${esc(t.unit||'تحتاج إلى إسناد')} · ${esc(t.due||t.period||'لم يحدد الموعد')}</p>${t.assigneeName?`<p>المسؤول: ${esc(t.assigneeName)}</p>`:''}<button class="plain-button" data-task="${esc(t.id)}" style="margin-top:12px">تفاصيل المهمة</button></div>${badge(t.status)}</article>`).join('')||'<div class="empty">لا توجد مهام مطابقة</div>';bindTasks()}
function bindTasks(){document.querySelectorAll('[data-task]').forEach(b=>b.onclick=()=>{const t=data.tasks.find(t=>t.id===b.dataset.task);const ev=data.evidence.filter(e=>e.taskId===t.id);modal(t.title,`<p class="public-strong">المؤشر ${esc(t.requirement)} · ${esc(t.unit)}</p><div class="public-controls">${badge(t.status)}</div><p>${esc(t.description||'')}</p>${t.sourceStatus?'<p class="source-context"><b>الحالة الموثقة سابقاً: </b>'+esc(t.sourceStatus)+(t.sourceUpdate?'<br>'+esc(t.sourceUpdate):'')+'<br>هذه حالة العمل في مصادر المشروع، وليست قبولاً نهائياً للمؤشر.</p>':''}<div class="source-context"><b>الشاهد المطلوب</b><p>${esc(t.requiredEvidence||'يحدده مسؤول المراجعة')}</p><p>الفترة: ${esc(t.period||t.due||'لم تُحدّد')}</p><p>ربط المهمة بالمؤشر مقترح للمراجعة؛ لا يعني وجود مهمة أن المؤشر مستوفى.</p></div><h3 style="margin-top:20px">الشواهد</h3>${ev.length?ev.map(e=>url(e.url)?`<p><a href="${esc(url(e.url))}" target="_blank" rel="noopener">${esc(e.name)} ↗</a></p>`:`<p>${esc(e.name)} <small>نسخة موجودة في المشروع؛ رابط العرض قيد الإضافة</small></p>`).join(''):'<p>لم تُنشر شواهد مرتبطة في هذا السجل بعد</p>'}${config.teamUrl?`<a class="plain-button" style="display:inline-block;margin-top:20px" href="${esc(url(config.teamUrl))}" target="_blank" rel="noopener">فتح مساحة التنفيذ والمراجعة</a>`:'<p class="note-bar">إرسال التحديثات ورفع الشواهد سيتاحان بعد تشغيل الربط المشترك. هذه النسخة لا تحفظ تعديلات الفريق بعد.</p>'}`)})}

function evidenceCard(e,c,ref){
  const inds=c.indicators.filter(i=>(i.evidenceIds||[]).includes(e.id)).map(i=>i.code).join('، ');
  const loc=e.sourceLocation||'مكان الأصل غير مسجل بعد';
  const avail=e.copyAvailability||((url(e.url))?'نسخة/رابط متاح':'نسخة غير مثبتة');
  return `<article class="public-file evidence-card-v2">
    <div class="evidence-card-head"><span class="evidence-ref">${esc(ref||'—')}</span><span class="doc-code">${esc(e.canonicalDocumentCode||e.currentDocumentCode||e.id)}</span></div>
    <h3>${esc(e.name)}</h3>
    <p class="public-strong">${esc(e.statusLabel||'مصدر موجود يحتاج مراجعة')}</p>
    <div class="doc-meta-grid">
      <span><b>المؤشرات</b>${esc(inds||'—')}</span>
      <span><b>المالك</b>${esc(e.documentOwner||'غير محدد')}</span>
      <span><b>أين موجود؟</b>${esc(loc)}</span>
      <span><b>توفر النسخة</b>${esc(avail)}</span>
    </div>
    ${e.description?'<p>'+esc(e.description)+'</p>':''}
    ${url(e.url)?'<a href="'+esc(url(e.url))+'" target="_blank" rel="noopener">فتح الأصل / النسخة ↗</a>':'<p class="missing-copy">لا يوجد رابط Drive مسجل لهذا الأصل؛ موقعه موضح أعلاه.</p>'}
    ${e.codeMigrationNote?'<small>تحويل الرمز: '+esc(e.codeMigrationNote)+'</small>':''}
    ${e.accessNote?'<small>'+esc(e.accessNote)+'</small>':''}
  </article>`;
}
function renderEvidence(){
  const totalRefs=data.criteria.reduce((s,c)=>s+(c.evidenceRegister||[]).length,0);
  let html=`<div class="section-row"><h2>الشواهد مرتبة حسب المعيار</h2><span>${n(totalRefs)} مرجع شاهد · ${n(data.evidence.length)} أصل/مصدر</span></div>
  <div class="note-bar">رقم الشاهد مثل C03-E04 خاص بموقع استخدامه داخل معيار الاعتماد، أما رمز الوثيقة مثل NUR-MAN-HR-001 فهو هوية الوثيقة نفسها. الأصل لا يُكرر بين المعايير.</div>`;
  for(const c of data.criteria){
    const rows=c.evidenceRegister||[];
    html+=`<section class="evidence-section"><div class="section-row"><h2>المعيار ${n(c.number)} · ${esc(c.title)}</h2><span>${n(rows.length)} شاهد</span></div>`;
    html+=rows.length?rows.map(r=>{const e=data.evidence.find(x=>x.id===r.evidenceId);return e?evidenceCard(e,c,r.ref):''}).join(''):'<div class="empty">لا توجد شواهد مرتبطة بعد</div>';
    html+='</section>';
  }
  const missing=data.missingEvidence||[];
  if(missing.length){
    html+=`<div class="section-row missing-section-title"><h2>شواهد أو إثباتات ما زلنا نحتاجها</h2><span>${n(missing.length)} بندًا مفتوحًا</span></div>
    <div class="note-bar">هذه البنود منفصلة عن الشواهد الموجودة. بعضها مطلوب من الجامعة، وبعضها يحتاج معاينة ميدانية أو إثبات كفاية؛ لا نعتبرها مفقودة من الكلية كلها بالمعنى نفسه.</div>`;
    for(const c of data.criteria){
      const rows=missing.filter(x=>Number(x.criterion)===Number(c.number));
      if(!rows.length)continue;
      html+=`<section class="missing-evidence-group"><h3>المعيار ${n(c.number)} · ${esc(c.title)}</h3>${rows.map(x=>`<article class="missing-evidence"><div><span class="code">${esc(x.indicatorCode)}</span><b>${esc(x.categoryLabel)}</b></div><p>${esc(x.request)}</p></article>`).join('')}</section>`;
    }
  }
  if(data.workProgress.length){
    html+='<div class="section-row" style="margin-top:32px"><h2>أعمال وممارسات موثقة بالمشروع</h2><span>'+n(data.workProgress.length)+' سجل حالة</span></div>'+
      data.workProgress.map(w=>'<article class="public-file"><h3>'+esc(w.title)+'</h3><p class="public-strong">'+esc(w.statusLabel)+'</p><p>'+esc(w.qualification)+'</p><small>'+esc(w.sourceLabel)+'</small><small>مؤشرات مرتبطة: '+esc(w.indicatorIds.join('، '))+'</small></article>').join('');
  }
  return html;
}
function renderDocuments(){
  const ds=data.documentSystem||{};
  const totalRefs=data.criteria.reduce((s,c)=>s+(c.evidenceRegister||[]).length,0);
  const migrations=data.evidence.filter(e=>e.codeMigrationNote).length;
  return `<div class="public-callout document-system-hero">
    <h2>نظام إدارة الوثائق والسجلات والشواهد — v${esc(ds.version||'2.0')}</h2>
    <p>هذا هو النظام الحاكم للرموز والإصدارات ومكان الأصل وربط الشواهد. الوثيقة تُحفظ مرة واحدة عند مالكها، ثم تُربط بالمعايير دون نسخ مكررة.</p>
    <div class="public-controls">
      ${url(ds.manualUrl)?'<a class="plain-button" href="'+esc(url(ds.manualUrl))+'" target="_blank" rel="noopener">فتح دليل النظام NUR-MAN-DOC-001 ↗</a>':''}
      ${url(ds.masterRegisterUrl)?'<a class="plain-button" href="'+esc(url(ds.masterRegisterUrl))+'" target="_blank" rel="noopener">فتح السجل المركزي NUR-REG-DOC-001 ↗</a>':''}
      ${url(ds.rootFolderUrl)?'<a class="plain-button" href="'+esc(url(ds.rootFolderUrl))+'" target="_blank" rel="noopener">فتح مستودع الوثائق الرئيسي ↗</a>':''}
    </div>
    <div class="doc-system-stats"><span><b>${n(data.evidence.length)}</b> أصلًا مفهرسًا</span><span><b>${n(totalRefs)}</b> مرجع شاهد</span><span><b>${n((data.missingEvidence||[]).length)}</b> مطلوبًا مفتوحًا</span><span><b>${n(migrations)}</b> تحويل رمز موثق</span></div>
  </div>
  <section class="method-grid document-system-grid" style="margin-top:20px">
    <article><h2>قاعدة الرمز</h2><div class="formula">NUR-[TYPE]-[DOMAIN]-[NNN]</div><p>الأنواع المعتمدة: ${esc((ds.types||[]).join(' · '))}</p><p>المجالات المعتمدة: ${esc((ds.domains||[]).join(' · '))}</p></article>
    <article><h2>ترقيم الشاهد</h2><div class="formula">${esc(ds.evidenceNumberPattern||'Cxx-Exx')}</div><p>مثال C05-E03 يعني الشاهد الثالث في معيار الشؤون الطلابية. لا يغير هوية الوثيقة ولا ينشئ نسخة جديدة منها.</p></article>
    <article><h2>منع التكرار</h2><p>${esc(ds.rule||'الأصل يحفظ مرة واحدة ويشار إليه من المعايير.')}</p><p>النسخ القديمة تُحفظ للتتبع وتتحول إلى مستبدلة/مؤرشفة بعد اعتماد البديل، ولا تُحذف لمجرد ظهور نسخة أحدث.</p></article>
    <article><h2>تحويل الرموز القديمة</h2><p>${Object.entries(ds.aliases||{}).map(([a,b])=>esc(a)+' → '+esc(b)).join(' · ')}</p><p>لا نعيد تسمية ملف قديم معتمد بصمت؛ يسجل الرمز السابق والقياسي في سجل التحويل.</p></article>
  </section>
  ${(ds.controlledDocuments||[]).length?'<div class="section-row" style="margin-top:30px"><h2>وثائق النظام الحاكمة وأدواته</h2><span>'+n(ds.controlledDocuments.length)+' وثائق</span></div><div class="document-list">'+ds.controlledDocuments.map(x=>'<article class="public-file compact-doc"><div class="evidence-card-head"><span class="doc-code">'+esc(x.code)+'</span><span>'+esc(x.type||'')+'</span></div><h3>'+esc(x.title)+'</h3><p>'+esc(x.owner||'')+' · '+esc(x.location||'')+'</p><small>'+esc((x.version?'v'+x.version+' · ':'')+(x.status||''))+'</small>'+(x.note?'<small>'+esc(x.note)+'</small>':'')+(url(x.url)?'<a href="'+esc(url(x.url))+'" target="_blank" rel="noopener">فتح ↗</a>':'')+'</article>').join('')+'</div>':''}
  <div class="section-row" style="margin-top:30px"><h2>الأصول والوثائق المفهرسة</h2><span>${n(data.evidence.length)} سجلًا</span></div>
  <div class="document-list">${data.evidence.slice().sort((a,b)=>String(a.canonicalDocumentCode||'').localeCompare(String(b.canonicalDocumentCode||''))).map(e=>`<article class="public-file compact-doc"><div class="evidence-card-head"><span class="doc-code">${esc(e.canonicalDocumentCode||e.id)}</span><span>${esc(e.documentType||'')}</span></div><h3>${esc(e.name)}</h3><p>${esc(e.documentOwner||'مالك الأصل غير محدد')} · ${esc(e.sourceLocation||'مكان الأصل غير مسجل')}</p><small>${esc(e.statusLabel||'')}</small>${url(e.url)?'<a href="'+esc(url(e.url))+'" target="_blank" rel="noopener">فتح ↗</a>':'<small>لا يوجد رابط مسجل؛ '+esc(e.copyAvailability||'يحتاج تحديد موقع النسخة')+'</small>'}</article>`).join('')}</div>`;
}
function render(){
  if(!data)return;
  const titles={overview:'لوحة التقدم المؤسسي',tasks:'المهام والمسؤوليات',evidence:'الشواهد حسب المعايير',documents:'نظام إدارة الوثائق',team:'فريق العمل',method:'منهجية القياس'};
  $('page-title').textContent=titles[view]||titles.overview;
  $('subtitle').textContent=view==='tasks'?'مهام الخطة، والجهة المسؤولة، والشاهد المطلوب':
    view==='evidence'?'شواهد مرقمة حسب كل معيار، مع رمز الوثيقة ومكان الأصل وحالة النسخة':
    view==='documents'?'الترميز والإصدارات وملكية الأصول والسجل المركزي في نظام واحد':
    'عشرة معايير للاعتماد المؤسسي، في مساحة واحدة';
  let html='';
  if(view==='overview')html=criteria();
  if(view==='tasks')html=renderTasks();
  if(view==='evidence')html=renderEvidence();
  if(view==='documents')html=renderDocuments();
  if(view==='team')html=`<div class="public-callout"><h2>مساحة تنفيذ بسيطة للفريق</h2><p>يجد كل عضو المهام المسندة إليه، ويرفع الشواهد ويتابع ملاحظات المراجع من الواجهة نفسها.</p>${config.teamUrl?`<a class="plain-button" href="${esc(url(config.teamUrl))}" target="_blank" rel="noopener">دخول مساحة العمل</a><p>التعديل والاعتماد يتطلبان حساباً مخوّلاً. العرض العام لا يمنح صلاحية تغيير البيانات.</p>`:'<p class="note-bar">الدخول والحفظ المشترك قيد التهيئة. لن نعرض اختيار اسم شخص على أنه تسجيل دخول آمن، ولن نعتبر التعديلات محفوظة قبل اختبار الربط.</p>'}<p>أسماء اللجنة وتكليفات الأشخاص تُضاف بعد تحديدها؛ لم نفترض أعضاء أو نُسند مهام إلى أشخاص تلقائياً.</p></div>${data.team.length?'<div class="team-grid" style="margin-top:20px">'+data.team.map(m=>`<article><h3>${esc(m.name)}</h3><p>${esc(m.unit||'')}</p><span>${esc(m.roleLabel||'')}</span></article>`).join('')+'</div>':''}`;
  if(view==='method')html=`<section class="method-grid"><article><h2>تغطية المصادر واستيفاء المعايير</h2><p>في وضع «تغطية المصادر»، تُحسب نسبة المؤشرات المرتبطة بمصدر موجود من إجمالي المؤشرات المنطبقة. قد يغطي المصدر جزءاً من المؤشر فقط؛ لذا فهذه ليست نسبة جاهزية للاعتماد ولا قبولاً للشاهد.</p><p>بعد المراجعة يمكن قياس القبول الداخلي بشكل مستقل: المؤشرات التي قبِل المراجع شواهدها، مقسومة على جميع المؤشرات المنطبقة في المعيار. لكل مؤشر وزن متساوٍ في هذه المتابعة الداخلية.</p><div class="formula">المؤشرات المقبولة ÷ المؤشرات المنطبقة × ١٠٠</div><p>لا تمثل هذه النسبة قرار اعتماد رسميًا. إنجاز المهمة لا يكفي وحده لقبول المؤشر؛ يلزم قرار مراجعة مستقل.</p></article><article><h2>الحالة الأولية</h2><p>«لم يُقيّم» تعني أن المؤشر لم يُراجع في هذا السجل. لا تعني أن العمل غائب أو أن الكلية تبدأ من الصفر.</p><p>الربط بالشواهد مقترح للمراجعة، ووجود المصدر لا يحوله تلقائيًا إلى شاهد مقبول.</p></article><article><h2>دورة العمل</h2><ol><li>تحديد المسؤول والمخرج المطلوب</li><li>تنفيذ المهمة وإرفاق الشاهد</li><li>إرسالها للمراجعة</li><li>قبولها أو إعادتها للاستكمال</li><li>مراجعة المؤشر وتحديث النسبة</li></ol></article><article><h2>ملكية واستمرارية</h2><p>الأصل يحفظ لدى الجهة المالكة، والسجل المركزي يحفظ الرمز والإصدار والمكان. مساحة الاعتماد تشير إلى الأصل ولا تنشئ أرشيفًا موازيًا.</p><p>المحتوى المنشور هنا عام؛ البيانات الحساسة تبقى مقيدة ويعرض منها فقط ما يلزم للمراجعة.</p></article></section>`;
  $('content').innerHTML=html;
  if(view==='tasks'){tasksList();$('task-search').oninput=tasksList;$('unit-filter').onchange=tasksList}
  document.querySelectorAll('[data-criterion]').forEach(b=>b.onclick=()=>{
    const c=data.criteria.find(c=>c.number===Number(b.dataset.criterion));
    modal(c.title,`<input class="public-search" id="indicator-search" placeholder="البحث داخل المؤشرات" aria-label="البحث داخل المؤشرات"><div id="indicator-list"></div>`);
    const show=()=>{
      $('indicator-list').innerHTML=c.indicators.filter(r=>(r.code+' '+r.text).includes($('indicator-search').value)).map(r=>`<article class="requirement"><span class="code">${esc(r.code)}</span><div style="flex:1"><p>${esc(r.text)}</p>${(r.evidenceIds||[]).map(id=>{const e=data.evidence.find(e=>e.id===id);if(!e)return '';const ref=(e.criterionEvidenceRefs||{})[String(c.number)]||'—';return '<div class="source-context" style="margin-top:10px"><b>'+esc(ref)+' · '+esc(e.canonicalDocumentCode||e.id)+' · '+esc(e.name)+'</b><p>'+esc(e.statusLabel||'مصدر موجود')+'</p><small>المكان: '+esc(e.sourceLocation||'غير مسجل')+'</small>'+(url(e.url)?'<a href="'+esc(url(e.url))+'" target="_blank" rel="noopener">فتح المصدر ↗</a>':'<small>'+esc(e.copyAvailability||'لا يوجد رابط مسجل')+'</small>')+'</div>'}).join('')}${(r.evidenceIds||[]).length?'':'<small class="source-context" style="display:block;margin-top:10px"><b>'+esc(labels[r.status]||'لا يوجد شاهد مرتبط حاليًا في السجل')+'</b>'+(r.evidenceNote?'<br>'+esc(r.evidenceNote):'<br>لا يعني عدم الربط أن الشاهد غير موجود لدى الكلية أو الجامعة.')+'</small>'}</div>${badge((r.evidenceIds||[]).length?'documented_pending_review':r.status)}</article>`).join('')
    };
    show();$('indicator-search').oninput=show;
  });
}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>go(b.dataset.view));$('team-link').onclick=e=>{e.preventDefault();go('team')};$('refresh').onclick=load;$('close').onclick=close;$('modal').onclick=e=>{if(e.target===$('modal'))close()};document.addEventListener('keydown',e=>{if(!$('modal').classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='Tab'){const f=$('modal').querySelectorAll('button,input,a[href],select,textarea');if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){last.focus();e.preventDefault()}else if(!e.shiftKey&&document.activeElement===last){first.focus();e.preventDefault()}}});load();if(config.summaryEndpoint)setInterval(load,Math.max(30,config.refreshSeconds||60)*1000);
})();
