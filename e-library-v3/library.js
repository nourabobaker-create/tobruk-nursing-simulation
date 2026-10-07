(() => {
'use strict';
const $ = id => document.getElementById(id);
const catalogue = window.LIBRARY_CATALOG || {};
const resources = Array.isArray(catalogue.resources) ? catalogue.resources : [];
const curriculum = Array.isArray(catalogue.curriculum) ? catalogue.curriculum : [];
const skills = Array.isArray(catalogue.skills) ? catalogue.skills : [];
const byId = new Map(resources.map(r => [String(r.id), r]));
const TYPES = {book:'كتاب',chapter:'فصل تعليمي',article:'مقال تثقيفي',paper:'مقالة بحثية',guide:'دليل أو قائمة تحقق',video:'فيديو',course:'دورة',journal:'مجلة أو دورية',tool:'أداة'};
const LANGUAGES = {ar:'العربية',en:'الإنجليزية',multi:'متعدد اللغات'};
const LEVELS = {foundation:'تأسيسي',clinical:'سريري',graduate:'الاستعداد للمهنة',all:'جميع المستويات'};
const ACCESS = {free:'مجاني',free_registration:'مجاني بحساب مجاني',free_learning_paid_certificate:'التعلّم مجاني؛ الشهادة مدفوعة',mixed:'وصول متنوع'};
const PAGE_SIZE = 24;
let filtered = [], visible = PAGE_SIZE, courseVisible = PAGE_SIZE, journalVisible = PAGE_SIZE;
const storeKey = 'tobruk-library-v4-personal';
let local = {saved:[],progress:[]};
let storageAvailable = true;
try { const prior = JSON.parse(localStorage.getItem(storeKey) || '{}'); local.saved = Array.isArray(prior.saved) ? prior.saved : []; local.progress = Array.isArray(prior.progress) ? prior.progress : []; } catch (_) { storageAvailable = false; }
const saved = new Set(local.saved.map(String));
const progress = new Set(local.progress.map(String));
const number = n => new Intl.NumberFormat('ar').format(Number(n) || 0);
const normalize = value => String(value || '').toLowerCase().normalize('NFKD').replace(/[\u064b-\u065f\u0670\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();
const safeUrl = value => { try { const u = new URL(String(value || ''), location.href); return ['http:','https:'].includes(u.protocol) ? u.href : '#'; } catch (_) { return '#'; } };
function node(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined && text !== null) e.textContent = String(text); return e; }
function link(text, url, cls) { const a = node('a',cls,text); a.href = safeUrl(url); a.target = '_blank'; a.rel = 'noopener noreferrer'; return a; }
function resetElement(el) { el.replaceChildren(); return el; }
function toast(message) { const t = $('toast'); t.textContent = message; t.hidden = false; clearTimeout(toast.timer); toast.timer = setTimeout(() => { t.hidden = true; }, 2600); }
function persist() { try { localStorage.setItem(storeKey,JSON.stringify({saved:[...saved],progress:[...progress]})); } catch (_) { storageAvailable = false; toast('تعذّر الحفظ في هذا المتصفح؛ نزّل قائمتك للاحتفاظ بها.'); } }
function searchMatch(query, text) { if (!query.trim()) return true; const haystack = normalize(text); return query.split('|').some(part => normalize(part).split(' ').filter(Boolean).every(word => haystack.includes(word) || (/^ال[\u0600-\u06ff]{3}/.test(word) && haystack.includes(word.slice(2))))); }
function resourceText(r) { return [r.title_ar,r.title_original,r.provider,r.description_ar,r.doi,r.year,r.study_type_ar,...(r.topics || [])].join(' '); }
function languageLabel(r) { return LANGUAGES[r.language] || r.language || 'لغة غير محددة'; }
function resourceRank(r) { return (r.language === 'ar' ? 20 : r.language === 'multi' ? 10 : 0) + (r.type === 'book' ? 8 : r.type === 'guide' ? 4 : 0) + (r.verification === 'page_checked' ? 2 : 0); }
const ranked = [...resources].sort((a,b) => resourceRank(b) - resourceRank(a));
const papers = resources.filter(r => r.type === 'paper' && r.access === 'free').sort((a,b) => (b.language === 'ar') - (a.language === 'ar') || Number(b.year || 0) - Number(a.year || 0));
let paperVisible = PAGE_SIZE, paperFiltered = [...papers];
function paperStudyGroup(r) { const t=String(r.study_type_ar || ''); if (t.includes('مراجعة منهجية') || t.includes('تحليل تلوي')) return 'مراجعات منهجية وتحليلات تلوية'; if (t.includes('مراجعة نطاقية')) return 'مراجعات نطاقية'; if (t.includes('مراجعة') || t.includes('توليف')) return 'مراجعات علمية أخرى'; if (t.includes('تجربة') && t.includes('عشوائ')) return 'تجارب عشوائية'; if (t.includes('مختلطة')) return 'دراسات بالطرق المختلطة'; if (t.includes('شبه تجريبية') || t.includes('تحسين جودة') || t.includes('قبلية وبعدية')) return 'دراسات تدخلية وتحسين جودة'; if (t.includes('نوعي') || t.includes('ظاهراتية') || t.includes('إثنو')) return 'دراسات نوعية'; if (t.includes('مقطعية') || t.includes('مسحية') || t.includes('ارتباطية')) return 'دراسات مقطعية ومسحية'; if (t.includes('رصدية') || t.includes('أتراب') || t.includes('حالات وشواهد')) return 'دراسات رصدية أخرى'; return 'مناهج أخرى'; }
function empty(message, detail) { const e = node('div','empty-state'); e.append(node('strong','',message),node('p','',detail || 'جرّب كلمة أخرى أو خفف المرشحات.')); return e; }
function saveButtons() { document.querySelectorAll('[data-save-id]').forEach(b => { const active = saved.has(b.dataset.saveId); b.setAttribute('aria-pressed',String(active)); b.textContent = active ? '★' : '☆'; b.setAttribute('aria-label',(active ? 'إزالة من قائمتي: ' : 'حفظ في قائمتي: ') + (byId.get(b.dataset.saveId)?.title_ar || 'المصدر')); }); $('saved-count').textContent = number(saved.size); }
function toggleSave(id) { saved.has(id) ? saved.delete(id) : saved.add(id); persist(); saveButtons(); if (activePanel === 'saved') renderSaved(); toast(saved.has(id) ? 'أُضيف المصدر إلى قائمتك على هذا الجهاز.' : 'أُزيل المصدر من قائمتك.'); }
function resourceCard(r) {
 const card = node('article','resource-card');
 if (r.type === 'paper') card.classList.add('is-paper');
 const top = node('div','card-top'); top.append(node('span','type-label',TYPES[r.type] || 'مصدر'));
 const save = node('button','save-button'); save.type = 'button'; save.dataset.saveId = String(r.id); save.setAttribute('aria-pressed',String(saved.has(String(r.id)))); save.setAttribute('aria-label','حفظ في قائمتي: ' + r.title_ar); save.textContent = saved.has(String(r.id)) ? '★' : '☆'; save.addEventListener('click',() => toggleSave(String(r.id))); top.append(save);
 const title = node('h3','resource-title'); title.append(link(r.title_ar || r.title_original,r.url));
 card.append(top,title);
 if (r.title_original && normalize(r.title_original) !== normalize(r.title_ar)) { const original = node('div','original-title',r.title_original); original.lang = r.language === 'ar' ? 'ar' : 'en'; original.dir = 'auto'; card.append(original); }
 const badges = node('div','badges'); badges.append(node('span','badge language',languageLabel(r)),node('span','badge cost',ACCESS[r.access] || r.access || 'راجع شروط المصدر'));
 if (LEVELS[r.level]) badges.append(node('span','badge',LEVELS[r.level]));
 card.append(badges,node('p','resource-description',r.description_ar || ''),node('div','resource-provider',r.provider || ''));
 if (r.type === 'paper') {
  const meta = node('div','badges paper-meta');
  if (r.year) meta.append(node('span','badge','نُشرت عام '+String(r.year)));
  if (r.study_type_ar) meta.append(node('span','badge',r.study_type_ar));
  card.append(meta);
  if (r.doi) { const doi = link('DOI: '+r.doi,'https://doi.org/'+r.doi,'paper-doi'); doi.dir='ltr'; card.append(doi); }
  const copy=node('button','link-button copy-paper','نسخ بيانات المقالة'); copy.type='button';
  copy.addEventListener('click',async () => { const citation=[r.title_original || r.title_ar,r.year ? '('+r.year+')' : '',r.provider,r.doi ? 'https://doi.org/'+r.doi : r.url].filter(Boolean).join('. '); try { await navigator.clipboard.writeText(citation); toast('نُسخت بيانات المقالة؛ راجع متطلبات التوثيق وأسماء المؤلفين عند إعداد المرجع.'); } catch (_) { toast('النسخ غير متاح هنا؛ يمكنك تنزيل قائمة الأبحاث أو فتح المصدر.'); } });
  card.append(copy);
 }
 const topics = node('div','badges'); (r.topics || []).slice(0,3).forEach(t => topics.append(node('span','badge',t))); card.append(topics);
 if (r.access_note_ar) card.append(node('p','access-note',r.access_note_ar));
 const cert = r.certificate_note_ar || r.certificate_ar || r.certificate;
 if (r.type === 'course' && cert) card.append(node('p','access-note','الشهادة: ' + (typeof cert === 'string' ? cert : JSON.stringify(cert))));
 const bottom = node('div','card-bottom'); bottom.append(link(r.type === 'paper' ? 'اقرأ النص الكامل ↗' : 'افتح المصدر ↗',r.url,'open-source'),node('span','verification',r.verification === 'page_checked' ? 'الصفحة مفحوصة' : r.verification === 'index_checked' ? 'الفهرس مفحوص' : 'راجع تقرير التحقق')); card.append(bottom);
 return card;
}
function fillCards(target,items) { resetElement(target); if (!items.length) { target.append(empty('لا توجد مواد مطابقة')); return; } const f = document.createDocumentFragment(); items.forEach(r => f.append(resourceCard(r))); target.append(f); }
let activePanel = 'discover';
function showPanel(name, scroll = true) { if (!$ (name) || !$(name).classList.contains('panel')) name = 'discover'; activePanel = name; document.querySelectorAll('.panel').forEach(p => { p.hidden = p.id !== name; }); document.querySelectorAll('[data-panel]').forEach(b => { const current = b.dataset.panel === name; b.classList.toggle('active',current); current ? b.setAttribute('aria-current','page') : b.removeAttribute('aria-current'); }); if (name === 'saved') renderSaved(); history.replaceState(null,'','#' + name); if (scroll) { const top = $('main').getBoundingClientRect().top + scrollY - 70; window.scrollTo({top:Math.max(0,top),behavior:'auto'}); const heading = $(name).querySelector('h1,h2'); if (heading) { heading.tabIndex = -1; heading.focus({preventScroll:true}); } } }
document.querySelectorAll('[data-panel]').forEach(b => b.addEventListener('click',() => showPanel(b.dataset.panel)));
document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click',() => showPanel(b.dataset.go)));
const filterDefinitions = [
 {id:'language',label:'لغة المصدر',choices:Object.entries(LANGUAGES)},
 {id:'type',label:'نوع المادة',choices:Object.entries(TYPES)},
 {id:'topic',label:'الموضوع',choices:[...new Set(resources.flatMap(r => r.topics || []))].sort((a,b) => a.localeCompare(b,'ar')).map(x => [x,x])},
 {id:'level',label:'المستوى',choices:Object.entries(LEVELS)},
 {id:'course',label:'المقرر',choices:curriculum.map(c => [String(c.id),c.title_ar])},
 {id:'provider',label:'الجهة',choices:[...new Set(resources.map(r => r.provider).filter(Boolean))].sort().map(x => [x,x])},
 {id:'access',label:'الوصول والتكلفة',choices:Object.entries(ACCESS)}
];
filterDefinitions.forEach(def => { const cell = node('div'); const label = node('label','',def.label); label.htmlFor = 'filter-' + def.id; const sel = node('select'); sel.id = 'filter-' + def.id; sel.name = def.id; const all = node('option','','الكل'); all.value = ''; sel.append(all); def.choices.forEach(([value,text]) => { const option = node('option','',text); option.value = value; sel.append(option); }); sel.addEventListener('change',applyFilters); cell.append(label,sel); $('filters').append(cell); });
function filtersState() { return Object.fromEntries(filterDefinitions.map(d => [d.id,$('filter-'+d.id).value])); }
function applyFilters() {
 const query = $('search').value; const f = filtersState();
 const chosen = curriculum.find(c => String(c.id) === f.course);
 const courseResources = new Set((chosen?.resource_ids || []).map(String));
 filtered = ranked.filter(r => searchMatch(query,resourceText(r)) && (!f.language || r.language === f.language) && (!f.type || r.type === f.type) && (!f.topic || (r.topics || []).includes(f.topic)) && (!f.level || r.level === f.level || r.level === 'all') && (!f.course || (r.course_ids || []).map(String).includes(f.course) || courseResources.has(String(r.id))) && (!f.provider || r.provider === f.provider) && (!f.access || r.access === f.access));
 visible = PAGE_SIZE; renderResults();
 const active = Object.values(f).filter(Boolean).length + (query.trim() ? 1 : 0); $('filter-summary').textContent = active ? number(active) + ' مرشح نشط' : 'كل المصادر متاحة للتصفح';
}
function renderResults() { fillCards($('resources-grid'),filtered.slice(0,visible)); $('results-count').textContent = number(filtered.length) + ' نتيجة · يعرض ' + number(Math.min(visible,filtered.length)); $('load-more').hidden = visible >= filtered.length; }
$('search').addEventListener('input',applyFilters);
$('filter-form').addEventListener('submit',e => e.preventDefault());
$('filter-form').addEventListener('reset',() => setTimeout(applyFilters,0));
$('load-more').addEventListener('click',() => { visible += PAGE_SIZE; renderResults(); });
function goResources(options = {}) { $('filter-form').reset(); $('search').value = options.query || ''; Object.entries(options).forEach(([key,value]) => { const el = $('filter-' + key); if (el) el.value = value; }); applyFilters(); showPanel('resources'); }
$('hero-search').addEventListener('submit',e => { e.preventDefault(); goResources({query:$('hero-query').value}); });
$('show-arabic').addEventListener('click',() => goResources({language:'ar'}));
$('show-books').addEventListener('click',() => goResources({type:'book'}));
const pathways = [
 ['01','أفهم مقرري','مصادر مرتبة بحسب المقرر وموضوعاته.','curriculum'],
 ['02','أتدرّب على مهارة','خطوات، أسئلة تأمل، ومراجعة أداء.','skills'],
 ['03','أتواصل مع المريض','الإصغاء، تثقيف المريض، والعمل مع الفريق.','التواصل | communication'],
 ['04','أواجه الفقد والصدمات','الحزن والوفاة، الأزمات، والرعاية التلطيفية.','الصدم | الوفاة | الحزن | التلطيف'],
 ['05','أعتني بنفسي','التكيف مع الضغط واستعادة التركيز والمرونة.','الضغط النفسي | الاحتراق | العناية بالنفس'],
 ['06','أستعدّ للعمل','الأولويات، القيادة، المسؤولية والتعلم المستمر.','الاستعداد للمهنة | التطوير المهني | القيادة'],
 ['07','أبدأ بحث التخرج','سؤال وخطة ودليل وتحليل وكتابة.','research'],
 ['08','أتعلم مجانًا','دورات تمريضية وشخصية من جهاتها الأصلية.','courses']
];
pathways.forEach(([icon,title,desc,target]) => { const b = node('button','pathway'); b.type = 'button'; b.append(node('span','pathway-icon',icon),node('span','arrow','←'),node('strong','',title),node('small','',desc)); b.addEventListener('click',() => ['curriculum','skills','research','courses'].includes(target) ? showPanel(target) : goResources({query:target})); $('pathways').append(b); });
const stats = {total:resources.length,arabic:resources.filter(r => r.language === 'ar').length,courses:curriculum.length,skills:skills.length,types:{}};
resources.forEach(r => { stats.types[r.type] = (stats.types[r.type] || 0) + 1; });
[[stats.total,'مدخل تعليمي'],[stats.arabic,'مصدر باللغة العربية'],[stats.courses,'مقررًا في الخريطة'],[stats.skills,'مهارة للتطوير']].forEach(([value,label]) => { const e = node('div','hero-stat'); e.append(node('strong','',number(value)),node('span','',label)); $('hero-stats').append(e); });
const arabicPicks = [];
const pickedArabic = new Set();
for (const type of ['book','article','guide']) ranked.filter(r => r.language === 'ar' && r.type === type).slice(0,2).forEach(r => { arabicPicks.push(r); pickedArabic.add(r.id); });
ranked.filter(r => r.language === 'ar' && ['book','article','guide'].includes(r.type) && !pickedArabic.has(r.id)).slice(0,6-arabicPicks.length).forEach(r => arabicPicks.push(r));
fillCards($('arabic-featured'),arabicPicks);
const paperPicks = [], paperTopics = new Set();
for (const [language,limit] of [['ar',2],['en',4]]) { let picked=0; for (const p of papers.filter(r=>r.language===language)) { const topic=(p.topics || [p.provider])[0]; if (!paperTopics.has(topic)) { paperPicks.push(p); paperTopics.add(topic); picked++; } if (picked>=limit) break; } }
for (const p of papers) { if (paperPicks.length>=6) break; if (!paperPicks.includes(p)) paperPicks.push(p); }
fillCards($('papers-featured'),paperPicks);
const bookPicks = [...ranked.filter(r => r.type === 'book' && r.language === 'ar').slice(0,2),...resources.filter(r => r.type === 'book' && r.language !== 'ar').slice(0,4)];
fillCards($('books-featured'),bookPicks);
function yearLabel(year) { const names = {1:'السنة الأولى',2:'السنة الثانية',3:'السنة الثالثة',4:'السنة الرابعة'}; return names[year] || String(year || 'غير محدد'); }
[...new Set(curriculum.map(c => String(c.year)))].sort().forEach(y => { const o = node('option','',yearLabel(y)); o.value = y; $('year-filter').append(o); });
$('curriculum-count').textContent = number(curriculum.length) + ' مقررًا · ربط مقترح';
function relatedForModule(c,m) {
 const ids = Array.isArray(m.resource_ids) ? m.resource_ids.map(String) : [];
 return ids.map(id => byId.get(id)).filter(Boolean);
}
function renderCurriculum() {
 const target = resetElement($('curriculum-grid')); const q = $('curriculum-search').value; const y = $('year-filter').value;
 const items = curriculum.filter(c => (!y || String(c.year) === y) && searchMatch(q,[c.title_ar,c.title_original,c.code,...(c.topics || [])].join(' ')));
 if (!items.length) { target.append(empty('لا توجد مقررات مطابقة')); return; }
 items.forEach(c => { const d = node('details','course-card'); const s = node('summary'); const names = node('span'); names.append(node('span','course-title',c.title_ar),node('span','course-meta',[yearLabel(c.year),c.semester ? 'الفصل '+number(c.semester) : '',c.code || '',number((c.resource_ids || []).length)+' رابطًا مقترحًا'].filter(Boolean).join(' · '))); s.append(names); d.append(s);
 const content = node('div','course-content'); content.append(node('p','',c.title_original || 'موضوعات المقرر'));
 const modules = Array.isArray(c.modules) && c.modules.length ? c.modules : (c.topics || []).map(t => ({title_ar:t,resource_ids:[]}));
 modules.forEach(m => { const md = node('details','module'); const matches = relatedForModule(c,m); md.append(node('summary','',m.title_ar || m.title || 'موضوع')); if (matches.length) { const ul = node('ul'); matches.slice(0,8).forEach(r => { const li = node('li'); li.append(link(r.title_ar,r.url)); ul.append(li); }); md.append(ul); if (matches.length > 8) { const b = node('button','link-button module-more','كل مصادر هذا المقرر ←'); b.type = 'button'; b.addEventListener('click',() => goResources({course:String(c.id)})); md.append(b); } } else md.append(node('p','missing','يحتاج استكمال الربط')); content.append(md); });
 if (!modules.length) content.append(node('p','missing','يحتاج استكمال الربط'));
 const b = node('button','link-button module-more','تصفح جميع مصادر المقرر ←'); b.addEventListener('click',() => goResources({course:String(c.id)})); content.append(b); d.append(content); target.append(d); });
}
$('year-filter').addEventListener('change',renderCurriculum); $('curriculum-search').addEventListener('input',renderCurriculum);
[...new Set(skills.map(s => s.domain_ar).filter(Boolean))].sort().forEach(domain => { const o = node('option','',domain); o.value = domain; $('skill-domain').append(o); });
function appendSkillBlock(target,title,value) { if (!value) return; const block = node('div','skill-block'); block.append(node('h4','',title)); if (Array.isArray(value)) { const list = node('ul'); value.forEach(v => list.append(node('li','',typeof v === 'string' ? v : v.title_ar || v.text_ar || JSON.stringify(v)))); block.append(list); } else block.append(node('p','',String(value))); target.append(block); }
function sourceItem(source,index) { if (typeof source === 'string') { const found = resources.find(r => r.url === source); return {url:source,title:found?.title_ar || 'المصدر ' + number(index+1)}; } return {url:source.url || source.href || source.source_url,title:source.title_ar || source.title || source.label || 'المصدر ' + number(index+1)}; }
function updateProgress() { $('skill-progress').textContent = 'راجعت ' + number(progress.size) + ' من ' + number(skills.length) + ' مهارة. التقدم يُحفظ على هذا الجهاز فقط' + (storageAvailable ? '.' : '؛ الحفظ غير متاح في هذا المتصفح.'); }
function renderSkills() {
 const target = resetElement($('skills-grid')); const q = $('skill-search').value; const domain = $('skill-domain').value;
 const items = skills.filter(s => (!domain || s.domain_ar === domain) && searchMatch(q,[s.title_ar,s.domain_ar,s.goal_ar,s.practice_ar,s.reflection_ar,s.assessment_ar,...(s.topics || []),...(s.source_titles || [])].join(' ')));
 $('skill-count').textContent = number(items.length) + ' مهارة'; updateProgress();
 if (!items.length) { target.append(empty('لا توجد مهارات مطابقة')); return; }
 items.forEach(s => { const d = node('details','skill-card'); const summary = node('summary'); const names = node('span'); names.append(node('span','skill-title',s.title_ar),node('span','skill-meta',[s.domain_ar,LEVELS[s.level] || s.level,s.clinical ? 'تدريب بإشراف' : 'تطوير شخصي ومهني'].filter(Boolean).join(' · '))); summary.append(names); d.append(summary); const body = node('div','skill-content'); appendSkillBlock(body,'الهدف',s.goal_ar); appendSkillBlock(body,'تدريب مقترح',s.practice_ar); appendSkillBlock(body,'تأمل بعد التدريب',s.reflection_ar); appendSkillBlock(body,'راجع أداءك',s.assessment_ar);
 if (s.clinical) body.append(node('p','notice clinical-notice','تدرب تحت إشراف مختص وفق بروتوكول المؤسسة؛ المصادر التعليمية لا تمنح صلاحية تنفيذ الإجراء.'));
 if (Array.isArray(s.source_urls) && s.source_urls.length) { const block = node('div','skill-block'); block.append(node('h4','','مصادر تساعدك')); const ul = node('ul'); s.source_urls.forEach((src,i) => { const source = sourceItem(src,i); if (Array.isArray(s.source_titles) && s.source_titles[i]) source.title = s.source_titles[i]; if (safeUrl(source.url) !== '#') { const li = node('li'); li.append(link(source.title,source.url)); ul.append(li); } }); block.append(ul); body.append(block); }
 const label = node('label','progress-label'); const check = node('input'); check.type='checkbox'; check.checked=progress.has(String(s.id)); check.addEventListener('change',() => { check.checked ? progress.add(String(s.id)) : progress.delete(String(s.id)); persist(); updateProgress(); }); label.append(check,node('span','',s.clinical ? 'راجعت المهارة وتدرّبت عليها تحت إشراف.' : 'جرّبت هذا التدريب وراجعت أدائي.')); body.append(label); d.append(body); target.append(d); });
}
$('skill-domain').addEventListener('change',renderSkills); $('skill-search').addEventListener('input',renderSkills);
const freeCourses = ranked.filter(r => r.type === 'course' && ['free','free_registration'].includes(r.access));
const journals = ranked.filter(r => r.type === 'journal');
for (const [field,values] of [['paper-topic',[...new Set(papers.flatMap(r => r.topics || []))].sort((a,b)=>a.localeCompare(b,'ar'))],['paper-study',[...new Set(papers.map(paperStudyGroup))].sort((a,b)=>a.localeCompare(b,'ar'))],['paper-year',[...new Set(papers.map(r => r.year).filter(Boolean))].sort((a,b)=>Number(b)-Number(a))]]) { values.forEach(v=>{ const o=node('option','',String(v)); o.value=String(v); $(field).append(o); }); }
function renderPapers() { $('papers-count').textContent=number(papers.length)+' مقالة بنص كامل مفتوح'; $('paper-results-count').textContent=number(paperFiltered.length)+' نتيجة · يعرض '+number(Math.min(paperVisible,paperFiltered.length)); fillCards($('papers-grid'),paperFiltered.slice(0,paperVisible)); $('papers-more').hidden=paperVisible>=paperFiltered.length; $('export-papers').disabled=!paperFiltered.length; }
function applyPaperFilters() { const q=$('paper-search').value, lang=$('paper-language').value, topic=$('paper-topic').value, study=$('paper-study').value, year=$('paper-year').value; paperFiltered=papers.filter(r=>searchMatch(q,resourceText(r)) && (!lang || r.language===lang) && (!topic || (r.topics || []).includes(topic)) && (!study || paperStudyGroup(r)===study) && (!year || String(r.year)===year)); paperVisible=PAGE_SIZE; renderPapers(); }
$('paper-search').addEventListener('input',applyPaperFilters); ['paper-language','paper-topic','paper-study','paper-year'].forEach(id=>$(id).addEventListener('change',applyPaperFilters)); $('paper-filter-form').addEventListener('submit',e=>e.preventDefault()); $('paper-filter-form').addEventListener('reset',()=>setTimeout(applyPaperFilters,0)); $('papers-more').addEventListener('click',()=>{paperVisible+=PAGE_SIZE;renderPapers();}); $('export-papers').addEventListener('click',()=>downloadCSV(paperFiltered,'Tobruk_Nursing_Open_Research.csv'));
function renderCourses() { $('course-count').textContent=number(freeCourses.length)+' دورة مجانية'; fillCards($('courses-grid'),freeCourses.slice(0,courseVisible)); $('courses-more').hidden=courseVisible>=freeCourses.length; }
function renderJournals() { $('journal-count').textContent=number(journals.length)+' مجلة ودورية'; fillCards($('journals-grid'),journals.slice(0,journalVisible)); $('journals-more').hidden=journalVisible>=journals.length; }
$('courses-more').addEventListener('click',() => { courseVisible += PAGE_SIZE; renderCourses(); }); $('journals-more').addEventListener('click',() => { journalVisible += PAGE_SIZE; renderJournals(); });
const researchStages=[['01','السؤال والخطة','حوّل الاهتمام إلى سؤال واضح وخطة قابلة للتنفيذ.','سؤال البحث | خطة البحث | research question'],['02','البحث عن الدليل','ابحث عن المصادر وقارنها وابنِ مراجعة أدبيات.','مراجعة الأدبيات | البحث العلمي | literature'],['03','تصميم الدراسة','اختر المنهج والعينة والأداة المناسبة لسؤالك.','منهجية البحث | تصميم الدراسة | methodology'],['04','الأخلاقيات','الموافقة، الخصوصية، والنزاهة في العمل البحثي.','أخلاقيات البحث | research ethics'],['05','الإحصاء والتحليل','نظّم البيانات، افهم النتائج، واختر التحليل المناسب.','الإحصاء | SPSS | statistics'],['06','الكتابة والنشر','ابنِ الحجة، اكتب النتائج، ووثّق المصادر.','الكتابة العلمية | النشر العلمي | academic writing']];
researchStages.forEach(([n,title,desc,query]) => { const b=node('button','research-step'); b.append(node('span','step-number','المرحلة '+number(n)),node('strong','',title),node('small','',desc)); b.addEventListener('click',() => goResources({query})); $('research-pathways').append(b); });
function renderSaved() { const items=ranked.filter(r => saved.has(String(r.id))); fillCards($('saved-grid'),items); if (!items.length) { resetElement($('saved-grid')).append(empty('قائمتك تنتظر أول مصدر','اضغط النجمة بجانب أي مصدر لتحفظه هنا.')); } $('export-saved').disabled=!items.length; saveButtons(); }
function csvCell(value) { let s=Array.isArray(value) ? value.join(' | ') : String(value || ''); if (/^[=+\-@\t\r]/.test(s)) s="'"+s; return '"'+s.replace(/"/g,'""')+'"'; }
function downloadCSV(items,name) { const headings=['المعرف','العنوان العربي','العنوان الأصلي','الرابط','الجهة','اللغة','النوع','الموضوعات','المستوى','الوصول','ملاحظات الوصول','التحقق','تاريخ التحقق','دليل التحقق','سنة النشر','نوع الدراسة','DOI','الترخيص']; const fields=['id','title_ar','title_original','url','provider','language','type','topics','level','access','access_note_ar','verification','verified_at','evidence_url','year','study_type_ar','doi','license']; const lines=[headings.map(csvCell).join(','),...items.map(r => fields.map(k => csvCell(r[k])).join(','))].join('\r\n'); const blob=new Blob(['\ufeff'+lines],{type:'text/csv;charset=utf-8;'}); const url=URL.createObjectURL(blob); const a=node('a'); a.href=url; a.download=name; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url),1000); toast('تم تنزيل الفهرس. فتح المصادر الخارجية يحتاج الإنترنت.'); }
$('export-all').addEventListener('click',() => downloadCSV(resources,'Tobruk_Nursing_Library_Catalog.csv')); $('about-export').addEventListener('click',() => downloadCSV(resources,'Tobruk_Nursing_Library_Catalog.csv')); $('export-saved').addEventListener('click',() => downloadCSV(resources.filter(r => saved.has(String(r.id))),'Tobruk_Nursing_My_Reading_List.csv'));
Object.entries(TYPES).forEach(([type,label]) => { const e=node('div','about-stat'); e.append(node('strong','',number(stats.types[type] || 0)),node('span','',label)); $('about-stats').append(e); });
const verificationCount=resources.filter(r => r.verification === 'page_checked').length;
$('release-note').textContent='الفهرس: '+number(resources.length)+' مدخلًا · '+number(verificationCount)+' صفحة مفحوصة · '+number(resources.filter(r => r.verification === 'index_checked').length)+' رابطًا من فهرس مفحوص. '+(catalogue.release?.date ? 'تحديث '+catalogue.release.date : 'راجع تقرير المصادر لتاريخ التحقق.')+' حفظ المفضلة والتقدم محلي فقط.';
function renderBenchmarks() { const data=Array.isArray(catalogue.benchmarks) ? catalogue.benchmarks : []; if (!data.length) return; const box=$('benchmarks'); box.append(node('h2','','ماذا نتعلم من ممارسات ونتائج منشورة؟')); const grid=node('div','benchmark-list'); data.forEach(b => { const e=node('article','benchmark-card'); const title=b.title_ar || b.institution_ar || b.name_ar || b.name || b.provider || 'تجربة تعليمية مفتوحة'; const url=b.url || b.evidence_url || b.source_url; const h=node('h3'); url ? h.append(link(title,url)) : h.append(document.createTextNode(title)); e.append(h); const desc=b.description_ar || b.lesson_ar || b.why_ar || b.note_ar || b.rationale_ar; if (desc) e.append(node('p','',desc)); if (b.evidence_ar) e.append(node('p','',b.evidence_ar)); grid.append(e); }); box.append(grid); }
if (!resources.length) { const warning=node('div','error-banner','تعذّر تحميل الفهرس. حدّث الصفحة، أو افتح الإصدار السابق من الرابط أسفل الصفحة.'); $('main').prepend(warning); }
applyFilters(); renderCurriculum(); renderSkills(); renderCourses(); renderJournals(); renderPapers(); renderSaved(); renderBenchmarks(); saveButtons();
showPanel(location.hash.slice(1) || 'discover',false);
window.addEventListener('hashchange',() => showPanel(location.hash.slice(1) || 'discover',false));
})();
