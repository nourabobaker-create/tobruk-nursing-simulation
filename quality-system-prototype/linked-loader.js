/* Shared summary is read-only; all workflow records below are local demo data. */
(async () => {
'use strict';
const base=new URL('./',document.currentScript.src),D=window.QMS_DEMO_DATA;
if(!D){document.getElementById('app').textContent='تعذر تحميل بيانات النموذج؛ أعيدي فتح الصفحة.';return;}
try{
 if(!localStorage.getItem('tobruk-qms-prototype-v01')){
  const seed={submissions:[]};
  for(const k of ['tasks','documents','universityRequests','improvements','inbox','approvals','handovers','audit','backups'])seed[k]=JSON.parse(JSON.stringify(D[k]||[]));
  localStorage.setItem('tobruk-qms-prototype-v01',JSON.stringify(seed));
 }
}catch{document.getElementById('app').textContent='التخزين المحلي غير متاح. يلزم السماح به لتجربة انتقال المهام بين الصفحات. لا يوجد حفظ مؤسسي في هذه النسخة.';return;}
const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
try{
 const r=await fetch(new URL('../accreditation/public-progress.json',base),{cache:'no-store',signal:controller.signal});if(!r.ok)throw Error('source');
 const d=await r.json();if(!Array.isArray(d.criteria)||d.criteria.length!==10)throw Error('schema');
 D.evidenceSummary=d.criteria.map(c=>{if(!Array.isArray(c.indicators)||!c.indicators.length)throw Error('indicators');return {criterion:c.number,title:c.title,total:c.indicators.length,linked:c.indicators.filter(i=>Array.isArray(i.evidenceIds)&&i.evidenceIds.length>0).length};});
 D.meta.version='Prototype 0.2 · ربط قراءة فقط';
 D.meta.notice='المهام والاعتمادات هنا بيانات محاكاة محلية فقط. ملخص أعداد مؤشرات الاعتماد يُقرأ من سجل الاعتماد المنشور، بتاريخ بيانات '+String(d.updatedAt||'غير مثبت')+'. إنشاء أو قبول مهمة تجريبية لا يغير السجل الحقيقي أو نسبة الاعتماد.';
}catch{
 D.meta.notice='تعذرت قراءة سجل الاعتماد. أعداد المؤشرات الظاهرة في هذه الجلسة أمثلة محفوظة في النموذج وليست تحديثًا من السجل. سائر التغييرات محلية ولا توجد مصادقة أو قاعدة بيانات مؤسسية.';
}finally{clearTimeout(timer);}
const script=document.createElement('script');script.src=new URL('app.js?v=20261002-linked',base).href;
script.onerror=()=>{document.getElementById('app').textContent='تعذر تشغيل النموذج؛ أعيدي المحاولة. لم تتغير السجلات المؤسسية.';};
document.body.append(script);
})();
