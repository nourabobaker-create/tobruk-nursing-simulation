/* Faculty of Nursing, Tobruk University. Draft rules v0.4.0; not accreditation scoring. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SustainabilityCore=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const VERSION='0.4.0';
const AXES=['الملكية المؤسسية','وضوح المسؤولية','وضوح الإجراء','الوصول والاسترجاع','قابلية التسليم','سلامة البيانات','بساطة الاستمرار','الشواهد والمتابعة'];
const ROWS=[
['ownership',0,'هل النسخة المرجعية للعمل محفوظة في مستودع تديره المؤسسة، لا تحت السيطرة المنفردة لشخص؟','بيان موقع النسخة المرجعية والجهة المسؤولة عنها، دون كلمات مرور.','حفظ نسخة مرجعية تحت إدارة المؤسسة وتوثيق موقعها وصلاحياتها.','قسم التوثيق والأرشفة',true],
['accounts',0,'هل إدارة الحسابات ونقل الوصول عند تغير المسؤول موثقان، دون مشاركة كلمات المرور؟','إجراء إدارة الحسابات والاسترداد المؤسسي.','توثيق إدارة الحسابات ونقل الصلاحيات عند تغير المسؤول.','الجهة المختصة بإدارة الحسابات',false],
['owner',1,'هل الجهة المسؤولة عن العملية محددة بوظيفتها أو قسمها، لا باسم الشخص فقط؟','وصف المهمة أو إجراء العمل.','تحديد مسؤولية العملية في وصف وظيفي أو إجراء معتمد.','الجهة صاحبة العملية',false],
['roles',1,'هل إعداد المحتوى ومراجعته واعتماده وتسليمه للتوثيق والأرشفة واضحة كل بحسب اختصاصه؟','مسار عمل يميز مسؤولية المحتوى من الإدخال والأرشفة.','توضيح مسار الإعداد والمراجعة والاعتماد والتسليم لقسم التوثيق والأرشفة.','الجهة صاحبة العملية',false],
['steps',2,'هل توجد تعليمات مختصرة تكفي للشخص المناسب لتنفيذ المهمة دون الرجوع إلى ذاكرة منشئها؟','تعليمات خطوة بخطوة مع مثال غير حساس.','إعداد تعليمات مختصرة قابلة للتطبيق مع مثال مكتمل.','الجهة صاحبة العملية',false],
['template',2,'هل النموذج الصحيح ومصادر بياناته ونسخته السارية معروفة؟','نموذج حالي مع رقم الإصدار ومصدر البيانات.','تحديد النموذج الساري ومصادره وضبط النسخ السابقة.','قسم التوثيق والأرشفة',false],
['access',3,'هل يستطيع المخوّل أصلًا الوصول إلى ما يحتاجه عند غياب القائم بالعمل؟','نتيجة تحقق وصول ضمن الصلاحيات القائمة؛ لا يتضمن الاختبار منح صلاحية.','معالجة توقف الوصول عبر الجهة المختصة ووفق الصلاحيات المعتمدة.','الجهة المختصة بإدارة الصلاحيات',true],
['find',3,'هل يمكن العثور على آخر مخرج ساري ومصدره دون سؤال الشخص الذي أعده؟','فهرس أو تجربة بحث موثقة.','إضافة فهرس واضح يربط المخرج بمصدره وإصداره وموقعه.','قسم التوثيق والأرشفة',false],
['handover',4,'هل توجد حزمة تسليم مختصرة تبين المهام المفتوحة والمواعيد والملفات والخطوة التالية؟','قائمة تسليم قابلة للتحديث.','تجهيز قائمة تسليم مختصرة للمهام والملفات والمواعيد والخطوة التالية.','الجهة صاحبة العملية',false],
['authority',4,'هل الرجوع للجهة المختصة ومرجع الصلاحية واضحان قبل تكليف شخص بالمتابعة عند الغياب؟','مرجع إجراء أو تكليف قائم عند وجوده؛ لا نفترض تخويلًا تلقائيًا.','توثيق مسار الرجوع للجهة المختصة ومرجع الصلاحية قبل أي متابعة.','الجهة المختصة بالتكليف',false],
['protection',5,'هل التعديل والحذف مقيدان بحسب الحاجة، مع إمكانية معرفة التغييرات؟','ضوابط صلاحيات وسجل تغييرات؛ دون بيانات دخول.','مراجعة صلاحيات التعديل والحذف وتوثيق التغييرات.','الجهة المختصة بالدعم التقني',false],
['restore',5,'هل توجد نسخة قابلة للاسترجاع وجُرّبت استعادة عينة منها بنجاح؟','سجل تجربة استرجاع بتاريخ ونتيجة، لا مجرد وجود نسخة.','إعداد نسخ مناسبة وتجربة استرجاع عينة وتوثيق النتيجة.','الجهة المختصة بالدعم التقني',true],
['maintain',6,'هل التحديث المعتاد ممكن بجهد معقول دون الاعتماد الدائم على منشئ النظام؟','تعليمات التحديث وتجربة شخص مناسب لم يشارك في البناء.','تبسيط التحديث وإعداد إرشادات تمكّن غير المنشئ من مواصلته.','الجهة صاحبة العملية',false],
['duplicate',6,'هل يُدخل البيان مرة في مصدر مرجعي واضح بدل إعادة نسخه بين سجلات متعارضة؟','تحديد مصدر البيان وطريقة استخدامه في المخرجات.','تحديد مصدر مرجعي وتقليل الإدخال المتكرر والسجلات المتعارضة.','قسم التوثيق والأرشفة',false],
['record',7,'هل يوجد شاهد من آخر تنفيذ يبين المخرج وتاريخه ومراجعته بحسب الإجراء؟','مخرج سابق مع تاريخه ومرجع المراجعة.','حفظ مخرج التنفيذ مع التاريخ ومرجع المراجعة في موضعه الصحيح.','قسم التوثيق والأرشفة',false],
['followup',7,'هل تُسجل أوجه النقص والمسؤولية عن معالجتها، ثم يُتحقق من التحسن؟','سجل متابعة أو إعادة اختبار؛ لا يلزم إنشاء سجل موازٍ.','ربط الفجوات بسجل المتابعة القائم وتحديد مسؤول وموعد والتحقق من الأثر.','قسم ضمان الجودة وتقييم الأداء',false]
];
const QUESTIONS=ROWS.map(([id,axis,text,hint,action,owner,critical])=>({id,axis,text,hint,action,owner,critical}));
const ANSWERS={yes:'نعم، مطبق',partial:'مطبق جزئيًا',no:'غير مطبق',unknown:'لا أعرف / يحتاج تحققًا'};
const RESULTS={independent:'أُنجز دون مساعدة',limited:'احتاج توضيحًا محدودًا',previous:'احتاج تدخل القائم السابق',blocked:'تعذر الإنجاز'};
function uid(){return typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():'sus-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);}
function today(){const p=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Tripoli',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const v=t=>p.find(x=>x.type===t).value;return v('year')+'-'+v('month')+'-'+v('day');}
function validDate(s){if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+'T00:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===s;}
function pastDate(s){return validDate(s)&&s<=today();}
function fresh(previousId=''){return {id:uid(),version:VERSION,created:new Date().toISOString(),updated:'',previousId,meta:{process:'',unit:'',importance:'normal',date:today(),frequency:'',archive:'قسم التوثيق والأرشفة'},answers:{},notes:{},evidence:[],test:{task:'',role:'',authority:'',date:'',result:'',reference:'',note:'',newPerson:false},actions:{},audit:[]};}
function evidenceValid(e){return !!(e&&typeof e.title==='string'&&e.title.trim()&&((e.ref&&e.ref.trim())||e.fileId)&&Array.isArray(e.questions)&&e.questions.length);}
function reviewed(e){const r=e.review||{};return evidenceValid(e)&&r.status==='accepted'&&!!(r.role&&r.role.trim()&&r.note&&r.note.trim()&&pastDate(r.date));}
function testValid(t){return !!(t&&t.task&&t.task.trim()&&t.role&&t.role.trim()&&t.authority&&t.authority.trim()&&pastDate(t.date)&&RESULTS[t.result]&&t.reference&&t.reference.trim());}
function assess(r){
 const es=Array.isArray(r.evidence)?r.evidence:[],ans=r.answers||{};
 const answered=QUESTIONS.filter(q=>Object.hasOwn(ANSWERS,ans[q.id])).length;
 const uncovered=QUESTIONS.filter(q=>!es.some(e=>evidenceValid(e)&&e.questions.includes(q.id)));
 const unreviewed=QUESTIONS.filter(q=>!es.some(e=>reviewed(e)&&e.questions.includes(q.id)));
 const missingMeta=!(r.meta&&r.meta.process.trim()&&r.meta.unit.trim()&&validDate(r.meta.date));
 const criticalNo=QUESTIONS.filter(q=>q.critical&&ans[q.id]==='no');
 const failures=QUESTIONS.filter(q=>ans[q.id]==='no');
 const partial=QUESTIONS.filter(q=>ans[q.id]==='partial');
 const unknown=QUESTIONS.filter(q=>ans[q.id]==='unknown');
 const tv=testValid(r.test),test=r.test||{};
 let code,title;
 if(criticalNo.length||(ans.protection==='no'&&ans.accounts==='no')){code='risk';title='عالية الخطورة';}
 else if(failures.length||partial.some(q=>q.critical)||(tv&&['previous','blocked'].includes(test.result))){code='dependent';title='معتمدة جزئيًا على شخص أو بها فجوة تشغيلية';}
 else if(missingMeta||answered<QUESTIONS.length){code='draft';title='التقييم غير مكتمل';}
 else if(partial.length||unknown.length||(tv&&test.result==='limited')){code='weakness';title='توجد نقاط ضعف أو أمور تحتاج تحققًا';}
 else if(unreviewed.length||!tv||test.result!=='independent'||!test.newPerson){code='verify';title='جاهزة للتحقق — الاستدامة لم تُثبت بعد';}
 else {code='sustainable';title='مؤسسية ومستدامة وفق المراجعة التجريبية';}
 const gaps=[];
 QUESTIONS.forEach(q=>{const a=ans[q.id];if(a&&a!=='yes')gaps.push({id:'q-'+q.id,title:q.text,action:a==='unknown'?'التحقق من الواقع وتوثيق النتيجة قبل الحكم. '+q.action:q.action,owner:q.owner==='الجهة صاحبة العملية'?r.meta.unit:q.owner,priority:q.critical?'high':'normal'});});
 AXES.forEach((axis,i)=>{const qs=QUESTIONS.filter(q=>q.axis===i);if(qs.some(q=>uncovered.some(u=>u.id===q.id)))gaps.push({id:'e-'+i,title:'شاهد غير مكتمل: '+axis,action:'ربط شاهد ملائم بالأسئلة المطلوبة؛ يمكن استخدام الشاهد نفسه لأكثر من سؤال دون إعادة رفعه.',owner:'قسم التوثيق والأرشفة',priority:'normal'});else if(qs.some(q=>unreviewed.some(u=>u.id===q.id)))gaps.push({id:'v-'+i,title:'مراجعة الشاهد: '+axis,action:'مراجعة ملاءمة الشاهد وتسجيل الصفة الوظيفية والتاريخ وملاحظة التحقق.',owner:'المراجع المختص بالتنسيق مع الجودة',priority:'normal'});});
 if(!tv||test.result!=='independent'||!test.newPerson)gaps.push({id:'test',title:'التحقق من قابلية التسليم',action:'تنفيذ مهمة صغيرة بواسطة شخص مناسب مخوّل أصلًا لم يشارك في إنشائها، وتوثيق النتيجة ضمن الصلاحيات القائمة.',owner:r.meta.unit||'الجهة صاحبة العملية',priority:r.meta.importance==='critical'?'high':'normal'});
 return {code,title,answered,total:QUESTIONS.length,missingMeta,uncovered:uncovered.map(q=>q.id),unreviewed:unreviewed.map(q=>q.id),testValid:tv,critical:criticalNo.map(q=>q.id),gaps,provisional:true};
}
function str(x,n=1500){return typeof x==='string'?x.slice(0,n):'';}
function cleanRecord(input){
 if(!input||typeof input!=='object'||Array.isArray(input)||!input.meta||!Array.isArray(input.evidence)||input.evidence.length>80)throw new Error('صيغة سجل غير صالحة.');
 const r=fresh();r.previousId=str(input.previousId,100);r.meta.process=str(input.meta.process,180);r.meta.unit=str(input.meta.unit,180);r.meta.date=validDate(input.meta.date)?input.meta.date:today();r.meta.importance=input.meta.importance==='critical'?'critical':'normal';r.meta.frequency=str(input.meta.frequency,180);
 QUESTIONS.forEach(q=>{if(Object.hasOwn(ANSWERS,input.answers?.[q.id]))r.answers[q.id]=input.answers[q.id];r.notes[q.id]=str(input.notes?.[q.id]);});
 r.evidence=input.evidence.map(e=>({id:uid(),title:str(e.title,180),ref:str(e.ref,1000),version:str(e.version,100),questions:QUESTIONS.filter(q=>Array.isArray(e.questions)&&e.questions.includes(q.id)).map(q=>q.id),fileId:str(e.fileId,100),filename:str(e.filename,200),review:{status:'pending',role:'',date:'',note:''}}));
 const t=input.test||{};['task','role','authority','reference','note'].forEach(k=>r.test[k]=str(t[k]));r.test.date=pastDate(t.date)?t.date:'';r.test.result=Object.hasOwn(RESULTS,t.result)?t.result:'';r.test.newPerson=t.newPerson===true;
 const known=new Set([...QUESTIONS.map(q=>'q-'+q.id),...AXES.flatMap((_,i)=>['e-'+i,'v-'+i]),'test']);
 for(const [id,a] of Object.entries(input.actions||{})){if(!known.has(id)||!a||typeof a!=='object')continue;r.actions[id]={owner:str(a.owner,180),due:validDate(a.due)?a.due:'',status:['open','in_progress','submitted'].includes(a.status)?a.status:'open',reference:str(a.reference,1000)};}
 r.audit=[{at:new Date().toISOString(),action:'استيراد نسخة محلية؛ أُعيدت مراجعات الشواهد إلى بانتظار التحقق.'}];return r;
}
return {VERSION,AXES,QUESTIONS,ANSWERS,RESULTS,uid,today,validDate,pastDate,fresh,evidenceValid,reviewed,testValid,assess,cleanRecord};
});