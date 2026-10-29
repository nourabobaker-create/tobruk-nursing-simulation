/* Independently authored bilingual lessons; scientific sources are cited inside each lesson. */
(() => {
 'use strict';
 const base='https://nourabobaker-create.github.io/tobruk-nursing-simulation/e-library-v3/pharmacology/lessons/';
 const lessons=[
  {id:'pharm-original-beta',slug:'beta-blockers',title_ar:'حاصرات بيتا: التقييم قبل الجرعة',title_en:'Beta blockers: assess before the dose',description_ar:'شرح مستقل وحالتان افتراضيتان لمقارنة القياسات بالأمر الدوائي، والتواصل والتوثيق.',description_en:'An independent explanation and two fictional cases on comparing observations with an order, communicating and documenting.',case_count:2,branching:false},
  {id:'pharm-original-insulin',slug:'insulin-safety',title_ar:'الإنسولين: التركيز والوحدات والتوقيت',title_en:'Insulin: concentration, units and timing',description_ar:'حالات متفرعة لأخطاء التركيز والجهاز، وتعطل الوجبة، والجرعة المكررة؛ مع اكتشاف الضرر والتصعيد والمتابعة.',description_en:'Branching cases on concentration/device errors, interrupted meals and duplicate doses, with harm recognition, escalation and follow-up.',case_count:3,branching:true},
  {id:'pharm-original-anticoagulant',slug:'anticoagulant-safety',title_ar:'الهيبارين ومضادات التخثر: أخطاء خفية',title_en:'Heparin and anticoagulants: hidden errors',description_ar:'حالات متفرعة للخلط بين مستحضرات الهيبارين، والتكرار عند التسليم، وإصابة رأس تبدو بسيطة أثناء العلاج المضاد للتخثر.',description_en:'Branching cases on heparin product mix-ups, duplication at handoff and an apparently minor head injury during anticoagulation.',case_count:3,branching:true},
  {id:'pharm-original-opioid',slug:'opioid-safety',title_ar:'الأفيونات: النعاس والتنفس والجرعة المتكررة',title_en:'Opioids: sedation, breathing and repeated doses',description_ar:'حالات متفرعة لتكرار الجرعة، والجمع مع المهدئات، والاطمئنان لقراءة الأكسجة رغم تدهور التهوية.',description_en:'Branching cases on repeat doses, sedative co-use and false reassurance from an oxygen-saturation reading despite worsening ventilation.',case_count:3,branching:true}
 ].map(lesson=>({...lesson,url:base+lesson.slug+'/'}));
 window.PHARMACOLOGY_LESSONS=lessons;
 const catalogue=window.LIBRARY_CATALOG;
 if(!catalogue||!Array.isArray(catalogue.resources))return;
 for(const lesson of lessons){
  let record=catalogue.resources.find(resource=>resource.id===lesson.id||resource.url===lesson.url);
  if(!record){record={id:lesson.id,url:lesson.url};catalogue.resources.push(record);}
  Object.assign(record,{title_ar:lesson.title_ar,title_original:lesson.title_en,description_ar:lesson.description_ar,provider:'كلية التمريض، جامعة طبرق',language:'multi',type:'lesson',level:'clinical',access:'free',access_note_ar:'درس أصلي بحالات افتراضية؛ عربي وإنجليزي، مع مراجع علمية وخيار تنزيل HTML. إكماله لا يمثل إثبات كفاءة سريرية.',verified_at:'2026-10-29',verification:'page_checked',evidence_url:lesson.url,source_collection:'original_pharmacology_lessons',year:2026});
  record.course_ids=[...new Set([...(record.course_ids||[]),'CRS-017'])];
  record.topics=[...new Set([...(record.topics||[]),'علم الأدوية','سلامة الأدوية','حالات تعليمية','محاكاة قرارات'])];
 }
 const course=(catalogue.curriculum||[]).find(course=>course.id==='CRS-017');
 if(course)course.resource_ids=[...new Set([...(course.resource_ids||[]),...lessons.map(lesson=>lesson.id)])];
 const resources=catalogue.resources,stats=catalogue.stats=catalogue.stats||{};
 Object.assign(stats,{total:resources.length,arabic:resources.filter(r=>r.language==='ar').length,providers:new Set(resources.map(r=>r.provider).filter(Boolean)).size,types:resources.reduce((types,r)=>{types[r.type]=(types[r.type]||0)+1;return types;},{}),verified_page:resources.filter(r=>r.verification==='page_checked').length,verified_index:resources.filter(r=>r.verification==='index_checked').length,original_pharmacology_lessons:lessons.length});
 catalogue.release={...catalogue.release,id:'20261029-pharmacology-batch2',date:'29 أكتوبر 2026'};
})();
