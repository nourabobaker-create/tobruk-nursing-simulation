/* Visible entry points; data stays independent of presentation. */
(()=>{
'use strict';
const R=window.COMMUNITY_V2;R.version='0.5.0';R.date='2026-10-15';
R.healthHubs=[
 {key:'diabetes',label:'السكري',art:'diabetes-plan',value:'hub:diabetes',ids:['diabetes','diabetes-daily-care','diabetes-food-portions','diabetes-high-correction','diabetes-sick-days','diabetes-hypoglycemia','diabetes-feet','diabetes-activity-followup']},
 {key:'pressure',label:'ضغط الدم',art:'pressure',value:'hub:pressure',ids:['blood-pressure']},
 {key:'kidney',label:'أمراض الكلى',art:'kidney',value:'hub:kidney',ids:['kidney-disease','kidney-stones']},
 {key:'gout',label:'النقرس',art:'gout',value:'hub:gout',ids:['gout']},
 {key:'women',label:'صحة المرأة',art:'woman',value:'women'},
 {key:'mental',label:'الصحة النفسية',art:'mind-support',value:'mental'},
 {key:'addiction',label:'الإدمان والتعافي',art:'recovery',value:'addiction'},
 {key:'aid',label:'الإسعافات',art:'bandage',value:'aid'},
 {key:'mother',label:'الحمل والأم',art:'mother',value:'mother'},
 {key:'child',label:'صحة الأطفال',art:'childfood',value:'child'},
 {key:'nutrition',label:'الغذاء والتغذية',art:'food',value:'nutrition'},
 {key:'infection',label:'العدوى والتطعيم',art:'vaccine',value:'infection'},
 {key:'medicine',label:'سلامة الدواء',art:'medicine',value:'medicine'},
 {key:'older',label:'كبار السن',art:'older',value:'older'},
 {key:'environment',label:'البيئة والماء',art:'environment',value:'environment'},
 {key:'blood',label:'التبرع بالدم',art:'blood',value:'hub:blood',ids:['blood-donation','blood-after']},
 {key:'movement',label:'الحركة والرياضة',art:'walk',value:'movement'},
 {key:'head-throat',label:'الصداع والجيوب',art:'migraine',value:'hub:head-throat',ids:['migraine','sinusitis']},
 {key:'skin',label:'صحة الجلد',art:'eczema',value:'skin'},
 {key:'prevention',label:'الفحوص والوقاية',art:'checkup',value:'prevention'}
];
R.searchAliases={diabetes:'السكر السكري مرض السكر داء السكري', 'blood-pressure':'ضغط الضغط ارتفاع الضغط انخفاض الضغط hypertension', 'kidney-disease':'الكلى الكلي الكلاوي الفشل الكلوي القصور الكلوي renal', 'kidney-stones':'حصوة حصى حصوات الكلى',gout:'النقرس نقرس حمض اليوريك داء الملوك','women-health':'النساء المرأة صحة النساء','addiction-help':'الادمان المخدرات الكحول تعاطي التعافي','mental-depression':'اكتئاب اكتئآب حزن الصحة النفسية','mental-anxiety':'قلق توتر الصحة النفسية'};
const art={diabetes:'diabetes-plan','diabetes-daily-care':'diabetes-plan','diabetes-sick-days':'diabetes-illness','diabetes-hypoglycemia':'glucose-low','diabetes-feet':'footcare','kidney-disease':'kidney','kidney-stones':'kidney',gout:'gout','women-health':'woman','menstrual-health':'menstrual',menopause:'menopause','breast-awareness':'breast','addiction-help':'recovery','substance-prevention':'recovery','addiction-overdose':'overdose','mental-anxiety':'anxiety','mental-depression':'depression','mental-crisis':'mind-support','postpartum-mood':'woman'};
for(const [id,key]of Object.entries(art)){const a=R.details[id]||R.extra.find(x=>x.id===id);if(a)a.art=key;}
R.details.diabetes.related=R.healthHubs[0].ids.filter(x=>x!=='diabetes');
const groups=[R.healthHubs[0].ids,['women-health','menstrual-health','menopause','breast-awareness','postpartum-mood','checkups-women'],['kidney-disease','kidney-stones','gout','diabetes','blood-pressure'],['addiction-help','addiction-overdose','substance-prevention'],['mental-anxiety','mental-depression','mental-crisis','stress','sleep','support']];
for(const group of groups)for(const id of group){const a=R.details[id]||R.extra.find(x=>x.id===id);if(a&&!a.related)a.related=group.filter(x=>x!==id);}
})();
