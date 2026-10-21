(function () {
'use strict';
const $ = id => document.getElementById(id);
const core = window.PortalMetricsCore;
const config = window.PortalMetricsConfig || {};
const fallbackSections = {faculty:'بوابة الكلية',students:'بوابة الطالب',library:'المكتبة الرقمية',simulations:'المحاكاة والمهارات',atlas:'أطلس التمريض',courses:'مساعدات المقررات',guides:'الأدلة',community:'خدمة المجتمع',services:'الخدمات والمشاركة',research:'البحث والتطوير',strategy:'الخطة الاستراتيجية'};
const sections = core?.sections || fallbackSections;
const eventLabels = {page_view:'فتح صفحة',section_view:'فتح قسم',resource_open:'فتح مصدر',service_open:'فتح خدمة أو نموذج',activity_start:'بدء نشاط',activity_complete:'إتمام نشاط',feedback_useful:'أفادني',feedback_not_useful:'لم يفدني'};
const meaningful = new Set(['resource_open','service_open','activity_start','activity_complete']);
const viewEvents = new Set(['page_view','section_view']);
const number = n => new Intl.NumberFormat('ar-LY').format(n);
const pct = (a,b) => b ? new Intl.NumberFormat('ar-LY',{style:'percent',maximumFractionDigits:1}).format(a / b) : 'لا توجد إجابات';
const sourceNames = {local:'هذا الجهاز فقط',shared:'ملخص جميع الأجهزة',import:'ملخص مستورد'};
let source = 'local', summary = null, imported = null, importedName = '', sequence = 0;
function day(value = new Date()) { return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Tripoli',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value)); }
function validDay(value) { return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value+'T12:00:00Z')) && new Date(value+'T12:00:00Z').toISOString().slice(0,10) === value; }
function shiftDay(value, amount) { const d = new Date(value+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+amount);return d.toISOString().slice(0,10); }
function displayDay(value) { return validDay(value) ? new Intl.DateTimeFormat('ar-LY',{year:'numeric',month:'short',day:'numeric',timeZone:'Africa/Tripoli'}).format(new Date(value+'T12:00:00Z')) : 'غير متاح'; }
function displayTime(value) { const d=new Date(value);return Number.isFinite(d.getTime()) ? new Intl.DateTimeFormat('ar-LY',{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Africa/Tripoli'}).format(d) : 'غير متاح'; }
function element(tag, cls, content) { const node=document.createElement(tag);if(cls)node.className=cls;if(content!==undefined)node.textContent=content;return node; }
function setError(message) { $('error').textContent=message || '';$('error').hidden=!message; }
function safeEndpoint(value) { try { const u=new URL(value);return u.protocol==='https:' && u.hostname==='script.google.com' && /^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(u.pathname) && !u.search && !u.hash && !u.username && !u.password ? u.href : ''; } catch(_){return '';} }
function integer(value) { return Number.isSafeInteger(value) && value >= 0 && value <= 1e9; }
function object(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
function validateSummary(value) {
 if(!object(value) || value.schema !== 1 || !['local','shared'].includes(value.mode))throw Error('صيغة الملخص غير مدعومة.');
 if(value.ready===false)throw Error('نقطة التجميع غير جاهزة حاليًا. تحقق من تهيئة المشروع ونشره.');
 const allowed=new Set(['schema','mode','generatedAt','collectionStartedAt','from','to','rows','sessions','engagedSessions','feedbackResponses','sectionSessions','engagedSectionSessions','ready','timezone','coverageFrom','partialCoverage','retentionDays','formsConnected','collection','sessionMeaning','coverage','truncated']);
 if(Object.keys(value).some(k=>!allowed.has(k)))throw Error('يحتوي الملف على حقول غير معتمدة؛ استخدم ملخصًا إجماليًا فقط.');
 if(value.ready!==undefined&&typeof value.ready!=='boolean'||value.partialCoverage!==undefined&&typeof value.partialCoverage!=='boolean'||value.truncated!==undefined&&typeof value.truncated!=='boolean'||value.formsConnected!==undefined&&value.formsConnected!==false)throw Error('حالة التغطية في الملخص غير صالحة.');
 if(value.timezone!==undefined&&value.timezone!=='Africa/Tripoli'||value.coverageFrom!==undefined&&!validDay(value.coverageFrom)||value.retentionDays!==undefined&&value.retentionDays!==90||value.collection!==undefined&&value.collection!=='voluntary_anonymous'||value.coverage!==undefined&&value.coverage!=='opt_in'||value.sessionMeaning!==undefined&&value.sessionMeaning!=='browser sessions, not unique people')throw Error('بيانات مصدر القياس غير صالحة.');
 if(!validDay(value.from)||!validDay(value.to)||value.from>value.to||Date.parse(value.to)-Date.parse(value.from)>90*86400000)throw Error('فترة الملخص غير صالحة أو تتجاوز ٩١ يومًا.');
 if(typeof value.generatedAt!=='string'||!Number.isFinite(Date.parse(value.generatedAt)))throw Error('وقت تحديث الملخص غير صالح.');
 if(value.collectionStartedAt!==null&&(typeof value.collectionStartedAt!=='string'||!Number.isFinite(Date.parse(value.collectionStartedAt))))throw Error('تاريخ بدء القياس غير صالح.');
 if(!integer(value.sessions)||!integer(value.engagedSessions)||value.engagedSessions>value.sessions||!integer(value.feedbackResponses))throw Error('أعداد الجلسات أو الإجابات غير صالحة.');
 if(!Array.isArray(value.rows)||value.rows.length>15000)throw Error('قائمة الأعداد الإجمالية غير صالحة.');
 const rowKeys=new Set(['day','section','event','count']),seen=new Set();
 const rows=value.rows.map(row=>{
  if(!object(row)||Object.keys(row).some(k=>!rowKeys.has(k))||Object.keys(row).length!==4||!validDay(row.day)||row.day<value.from||row.day>value.to||!Object.hasOwn(sections,row.section)||!Object.hasOwn(eventLabels,row.event)||!integer(row.count))throw Error('يحتوي الملخص على صف غير صالح أو بيانات غير إجمالية.');
  const key=[row.day,row.section,row.event].join('|');if(seen.has(key))throw Error('يتضمن الملخص صفوفًا مكررة.');seen.add(key);
  return {day:row.day,section:row.section,event:row.event,count:row.count};
 });
 const sectionSessions={},engagedSectionSessions={};
 for(const [key,target] of [['sectionSessions',sectionSessions],['engagedSectionSessions',engagedSectionSessions]]){
  if(value[key]===undefined)continue;if(!object(value[key]))throw Error('تفصيل الجلسات غير صالح.');
  for(const [section,count] of Object.entries(value[key])){if(!Object.hasOwn(sections,section)||!integer(count)||count>value.sessions)throw Error('تفصيل الجلسات غير صالح.');target[section]=count;}
 }
 for(const [section,count]of Object.entries(engagedSectionSessions))if(count>(sectionSessions[section]??0))throw Error('الجلسات المتفاعلة تتجاوز جلسات القسم.');
 const responseCount=rows.filter(r=>r.event==='feedback_useful'||r.event==='feedback_not_useful').reduce((a,r)=>a+r.count,0);
 if(responseCount!==value.feedbackResponses)throw Error('عدد إجابات الإفادة لا يطابق الصفوف.');
 return {schema:1,mode:value.mode,generatedAt:value.generatedAt,collectionStartedAt:value.collectionStartedAt,from:value.from,to:value.to,rows,sessions:value.sessions,engagedSessions:value.engagedSessions,feedbackResponses:value.feedbackResponses,sectionSessions,engagedSectionSessions,coverageFrom:value.coverageFrom,partialCoverage:value.partialCoverage,truncated:value.truncated};
}
function range() {
 const from=$('from').value,to=$('to').value;
 if(!validDay(from)||!validDay(to)||from>to)throw Error('اختر تاريخ بداية لا يتجاوز تاريخ النهاية.');
 if(Date.parse(to)-Date.parse(from)>89*86400000)throw Error('اختر فترة لا تتجاوز ٩٠ يومًا لتبقى المقارنة واضحة.');
 if(to>day())throw Error('اختر تاريخ نهاية لا يتجاوز اليوم.');
 return {from,to};
}
function choosePeriod() {
 const today=day(),period=$('period').value;$('to').value=today;
 if(period==='month')$('from').value=today.slice(0,7)+'-01';
 else if(period!=='custom')$('from').value=shiftDay(today,-Number(period)+1);
}
function jsonp(endpoint, dates) {
 return new Promise((resolve,reject)=>{
  const callback='PortalMetricsSummary_'+Date.now()+'_'+Math.random().toString(36).slice(2),script=document.createElement('script');let done=false;
  const cleanup=()=>{if(done)return;done=true;clearTimeout(timer);script.remove();delete window[callback];};
  const timer=setTimeout(()=>{cleanup();reject(Error('لم تصل بيانات التجميع في الوقت المحدد. تحقق من النشر والصلاحيات ثم أعد التحديث.'));},15000);
  window[callback]=result=>{try{const clean=validateSummary(result);if(clean.from!==dates.from||clean.to!==dates.to)throw Error('الفترة التي أعادها المصدر لا تطابق الفترة المطلوبة.');cleanup();resolve(clean);}catch(error){cleanup();reject(error);}};
  script.onerror=()=>{cleanup();reject(Error('تعذّر الاتصال بمصدر التجميع. لا تُعرض بيانات هذا الجهاز بدلًا منه تلقائيًا.'));};
  const u=new URL(endpoint);u.searchParams.set('action','summary');u.searchParams.set('from',dates.from);u.searchParams.set('to',dates.to);u.searchParams.set('callback',callback);u.searchParams.set('_',Date.now());script.src=u.href;script.referrerPolicy='no-referrer';document.head.append(script);
 });
}
function filteredRows() { const selected=$('section').value;return (summary?.rows||[]).filter(row=>selected==='all'||row.section===selected); }
function count(rows,events) { return rows.reduce((total,row)=>total+(events.has(row.event)?row.count:0),0); }
function status() {
 const box=$('source-status');box.replaceChildren();box.classList.toggle('shared',source==='shared'&&!!summary);
 const title=element('strong');const detail=element('p');
 if(source==='local'){
  title.textContent='هذا الجهاز فقط — لا يمثل إجمالي البوابة';
  detail.textContent='يبدأ القياس بعد تفعيله من خيار «قياس الاستخدام» أسفل صفحات البوابة. زيارة هذه اللوحة لا تُحسب ضمن الاستخدام. لا تُرسل الأرقام المحلية للفريق تلقائيًا.';
  if(core?.preference?.()==='off')detail.textContent+=' القياس متوقف الآن على هذا الجهاز؛ تظل البيانات السابقة، إن وجدت، قابلة للعرض.';
  if(core?.storageAvailable && !core.storageAvailable())detail.textContent+=' التخزين غير متاح في هذا المتصفح؛ قد لا يمكن الاحتفاظ بالقياس.';
 }else if(source==='shared'){
  title.textContent=summary?'ملخص جميع الأجهزة المشاركة في القياس':'الجمع المشترك غير متاح حاليًا';
  detail.textContent=safeEndpoint(config.endpoint)?'يشمل الملخص الأحداث المستلمة من الصفحات المشاركة فقط؛ لا يشمل جميع الزوار بالضرورة.':'لوحة المؤشرات وأداة القياس جاهزتان؛ يلزم نشر نقطة التجميع وربطها قبل عرض إجمالي البوابة. لا تتوفر أرقام مشتركة الآن.';
 }else{title.textContent='ملخص مستورد — لقطة محفوظة';detail.textContent='المصدر: '+importedName+' · يعرض فترة الملف الأصلية. لا يُدمج مع بيانات هذا الجهاز ولا يُحدّث تلقائيًا.';}
 if(summary?.partialCoverage)detail.textContent+=' تغطية جزئية: يبدأ السجل المحتفظ به من '+displayDay(summary.coverageFrom)+'.';
 if(summary?.truncated)detail.textContent+=' تنبيه: وصل السجل المحلي إلى حد الاحتفاظ، وقد تكون بعض الأحداث الأقدم غير متاحة.';
 box.append(title,detail);
 $('setup-status').textContent=safeEndpoint(config.endpoint)?'نقطة التجميع مهيأة في الإعدادات. اختر «جميع الأجهزة» للتحقق من الاتصال وعرض آخر ملخص.':'الجمع المشترك لم يُفعّل بعد. يعمل القياس الاختياري محليًا، ويحتاج الإجمالي إلى إتمام النشر والربط في الإعدادات.';
}
function makeKpi(label,value,note,empty=false) { const card=element('article','kpi');card.append(element('span','kpi-label',label),element('strong','kpi-value'+(empty?' empty-value':''),value),element('small','',note));return card; }
function renderKpis(rows) {
 const hasData=rows.some(r=>r.count>0),selected=$('section').value;
 const sessions=selected==='all'?summary?.sessions:summary?.sectionSessions?.[selected];
 const engaged=selected==='all'?summary?.engagedSessions:summary?.engagedSectionSessions?.[selected];
 const views=count(rows,viewEvents),interactions=count(rows,meaningful),useful=count(rows,new Set(['feedback_useful'])),responses=useful+count(rows,new Set(['feedback_not_useful']));
 const target=$('kpis');target.replaceChildren();
 const sessionKnown=hasData&&Number.isSafeInteger(sessions);
 target.append(makeKpi('جلسات الاستخدام',sessionKnown?number(sessions):'لا تتوفر بيانات','جلسات، وليست أشخاصًا مختلفين',!sessionKnown));
 target.append(makeKpi('مرات فتح المحتوى',hasData?number(views):'لا تتوفر بيانات','فتح الصفحات والأقسام',!hasData));
 target.append(makeKpi('التفاعلات',hasData?number(interactions):'لا تتوفر بيانات',sessionKnown&&sessions>0&&Number.isSafeInteger(engaged)?'الجلسات المتفاعلة: '+pct(engaged,sessions)+' ('+number(engaged)+' من '+number(sessions)+')':'فتح مصادر أو خدمات أو تفاعل مع نشاط',!hasData));
 target.append(makeKpi('الاستفادة المبلّغ عنها',responses?pct(useful,responses):(hasData?'لا توجد إجابات':'لا تتوفر بيانات'),responses?number(useful)+' «أفادني» من '+number(responses)+' إجابة':'رأي المجيبين عن الإفادة، لا اختبار تعلّم',!responses));
}
function renderSections(rows) {
 const target=$('section-rows');target.replaceChildren();const selected=$('section').value,hasData=rows.some(r=>r.count>0);
 const data=Object.entries(sections).filter(([id])=>selected==='all'||id===selected).map(([id,label])=>{const entries=rows.filter(row=>row.section===id);return {id,label,views:count(entries,viewEvents),interactions:count(entries,meaningful),useful:count(entries,new Set(['feedback_useful'])),responses:count(entries,new Set(['feedback_useful','feedback_not_useful']))};}).sort((a,b)=>b.views-a.views||b.interactions-a.interactions);
 const max=Math.max(1,...data.map(x=>x.views));
 data.forEach(row=>{const tr=element('tr'),name=element('td');name.append(element('span','section-name',row.label));const track=element('span','bar-track'),fill=element('span','bar-fill');fill.style.width=(hasData?row.views/max*100:0)+'%';track.setAttribute('aria-hidden','true');track.append(fill);name.append(track);tr.append(name,element('td',!hasData?'muted':'',hasData?number(row.views):'غير مقاس'),element('td',!hasData?'muted':'',hasData?number(row.interactions):'غير مقاس'));const benefit=element('td');benefit.append(element('span','',row.responses?pct(row.useful,row.responses):'—'));if(row.responses)benefit.append(element('div','small-text',number(row.responses)+' إجابة'));else benefit.append(element('div','small-text',hasData?'لا توجد إجابات':'غير مقاس'));tr.append(benefit);target.append(tr);});
}
function renderDaily(rows) {
 const chart=$('daily-chart'),table=$('daily-rows');chart.replaceChildren();table.replaceChildren();
 if(!summary||!rows.some(r=>r.count>0)){chart.append(element('div','empty-state','لا تتوفر بيانات مقاسة لهذه الفترة والقسم.'));const tr=element('tr'),td=element('td','','لا تتوفر بيانات');td.colSpan=3;tr.append(td);table.append(tr);return;}
 const data=[];for(let d=summary.from;d<=summary.to;d=shiftDay(d,1)){const subset=rows.filter(r=>r.day===d);const measured=summary.collectionStartedAt&&d>=day(summary.collectionStartedAt)&&(!summary.coverageFrom||d>=summary.coverageFrom);data.push({day:d,views:count(subset,viewEvents),interactions:count(subset,meaningful),measured});}
 const max=Math.max(1,...data.map(r=>r.views));
 data.forEach((row,index)=>{const col=element('div','day-col'),bar=element('span','day-bar');bar.style.height=(row.views/max*100)+'%';col.title=displayDay(row.day)+' · '+(row.measured?number(row.views)+' فتح · '+number(row.interactions)+' تفاعل':'قبل بدء القياس');bar.setAttribute('aria-hidden','true');col.append(bar);if(index===0||index===data.length-1||index===Math.floor(data.length/2))col.append(element('span','day-label',row.day.slice(5)));chart.append(col);const tr=element('tr');tr.append(element('td','',displayDay(row.day)),element('td','',row.measured?number(row.views):'غير مقاس'),element('td','',row.measured?number(row.interactions):'غير مقاس'));table.append(tr);});
 chart.setAttribute('role','img');chart.setAttribute('aria-label','أعمدة مرات فتح المحتوى يوميًا؛ الأرقام التفصيلية في الجدول التالي.');
}
function render() {
 status();const dates=summary||{from:$('from').value,to:$('to').value};$('period-label').textContent=displayDay(dates.from)+' — '+displayDay(dates.to)+' · '+(sections[$('section').value]||'كل الأقسام');
 $('updated-label').textContent=summary?'آخر قراءة: '+displayTime(summary.generatedAt):'لا توجد قراءة متاحة';
 $('collection-label').textContent=summary?.collectionStartedAt?'بداية القياس: '+displayTime(summary.collectionStartedAt)+'؛ ولا توجد بيانات عن الزيارات الأسبق.':'لم يُسجّل بدء قياس متاح في هذا المصدر بعد.';
 if(summary?.coverageFrom)$('collection-label').textContent+=' البيانات المحتفظ بها تبدأ من '+displayDay(summary.coverageFrom)+'.';
 if(summary?.partialCoverage)$('collection-label').textContent+=' تنبيه: جزء من الفترة المختارة يسبق التغطية المتاحة.';
 if(summary?.truncated)$('collection-label').textContent+=' بلغ السجل المحلي حد الاحتفاظ؛ قد لا يشمل جميع أحداث الفترة.';
 const rows=filteredRows();renderKpis(rows);renderSections(rows);renderDaily(rows);$('export').disabled=!summary||!rows.length;
}
async function refresh() {
 const request=++sequence;setError('');summary=null;render();$('refresh').disabled=true;
 try{
  if(!core)throw Error('تعذّر تحميل أداة المؤشرات؛ حدّث الصفحة وتحقق من اتصالك.');
  const dates=source==='import'?{from:imported?.from,to:imported?.to}:range();
  let result;
  if(source==='local')result=core.aggregate(core.readEvents(),dates);
  else if(source==='import'){if(!imported)throw Error('استورد ملخصًا إجماليًا أولًا.');result=imported;}
  else{const endpoint=safeEndpoint(config.endpoint);if(!endpoint){render();return;}result=await jsonp(endpoint,dates);}
  if(request!==sequence)return;
  summary=result;render();
 }catch(error){if(request===sequence){summary=null;setError(error.message||'تعذّر تحميل المؤشرات.');render();}}
 finally{if(request===sequence)$('refresh').disabled=false;}
}
function setSource(value) {
 source=value;document.querySelectorAll('[name=source]').forEach(input=>{input.checked=input.value===source;});
 const isImport=source==='import';$('period').disabled=isImport;$('from').disabled=isImport;$('to').disabled=isImport;
 if(isImport&&imported){$('from').value=imported.from;$('to').value=imported.to;}else choosePeriod();refresh();
}
function exportCsv() {
 if(!summary)return;const rows=filteredRows();if(!rows.length)return;
 const quote=value=>'"'+String(value??'').replace(/"/g,'""')+'"';
 const header=['المصدر','من','إلى','وقت القراءة','القسم','اليوم','المؤشر','العدد'];
 const lines=[header,...rows.map(row=>[sourceNames[source],summary.from,summary.to,summary.generatedAt,sections[row.section],row.day,eventLabels[row.event],row.count])];
 const blob=new Blob(['\uFEFF'+lines.map(row=>row.map(quote).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8;'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='portal-metrics-'+source+'-'+summary.from+'-'+summary.to+'.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
Object.entries(sections).forEach(([id,label])=>{const option=element('option','',label);option.value=id;$('section').append(option);});
$('from').max=day();$('to').max=day();choosePeriod();
$('period').addEventListener('change',()=>{if($('period').value!=='custom')choosePeriod();refresh();});
for(const id of ['from','to'])$(id).addEventListener('change',()=>{$('period').value='custom';refresh();});
$('section').addEventListener('change',render);
$('refresh').addEventListener('click',refresh);$('print').addEventListener('click',()=>window.print());$('export').addEventListener('click',exportCsv);
for(const input of document.querySelectorAll('[name=source]'))input.addEventListener('change',()=>setSource(input.value));
$('import-file').addEventListener('change',async event=>{const file=event.target.files?.[0];if(!file)return;try{if(file.size>2*1024*1024)throw Error('حجم الملف يتجاوز الحد المسموح: ٢ ميغابايت.');const value=validateSummary(JSON.parse(await file.text()));if(value.mode!=='shared')throw Error('الاستيراد يقبل ملخص التجميع المشترك فقط.');imported=value;importedName=file.name.slice(0,120);$('import-source').hidden=false;setSource('import');}catch(error){setError(error instanceof SyntaxError?'الملف ليس JSON صالحًا.':error.message||'تعذّر استيراد الملف.');}finally{event.target.value='';}});
window.addEventListener('storage',event=>{if(source==='local'&&event.key?.includes('metrics'))refresh();});
window.PortalMetricsDashboard=Object.freeze({validateSummary,safeEndpoint});
refresh();
})();
