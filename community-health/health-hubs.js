/* Visible entry points; data stays independent of presentation. */
(()=>{
'use strict';
const R=window.COMMUNITY_V2;R.version='0.12.0';R.date='2026-10-17';
R.healthHubs=[
 {key:'diabetes',label:'السكري',art:'diabetes-plan',value:'hub:diabetes',ids:['diabetes','diabetes-daily-care','diabetes-food-portions','diabetes-high-correction','diabetes-sick-days','diabetes-hypoglycemia','diabetes-feet','diabetes-activity-followup']},
 {key:'pressure',label:'ضغط الدم',art:'pressure',value:'hub:pressure',ids:['blood-pressure']},
 {key:'kidney',label:'أمراض الكلى',art:'kidney',value:'hub:kidney',ids:['kidney-disease','kidney-stones']},
 {key:'gout',label:'النقرس',art:'gout',value:'hub:gout',ids:['gout']},
 {key:'women',label:'صحة المرأة',art:'woman',value:'women'},
 {key:'mental',label:'الصحة النفسية',art:'mind-support',value:'mental'},
 {key:'addiction',label:'الإدمان والتعافي',art:'recovery',value:'addiction'},
 {key:'aid',label:'الإسعافات',art:'bandage',value:'aid'},
 {key:'burns',label:'الحروق',art:'burn-care',value:'hub:burns',ids:['burns','burn-recovery']},
 {key:'recovery',label:'التعافي في المنزل',art:'recovery-home',value:'recovery'},
 {key:'mother',label:'الحمل والأم',art:'mother',value:'mother'},
 {key:'newborn',label:'فحص ورعاية المولود',art:'newborn-check',value:'hub:newborn',ids:['newborn-check','newborn-boy','newborn-girl','newborn-first-week']},
 {key:'child',label:'صحة الأطفال',art:'childfood',value:'child'},
 {key:'nutrition',label:'الغذاء والتغذية',art:'food',value:'nutrition'},
 {key:'deficiencies',label:'فقر الدم والفيتامينات',art:'anaemia',value:'hub:deficiencies',ids:['anaemia-iron','vitamin-d','vitamin-b12-folate']},
 {key:'sleep',label:'النوم والراحة',art:'sleep',value:'hub:sleep',ids:['sleep']},
 {key:'infection',label:'الأمراض السارية والمعدية',art:'infection-network',value:'infection'},
 {key:'medicine',label:'سلامة الدواء',art:'medicine',value:'medicine'},
 {key:'older',label:'كبار السن',art:'older',value:'older'},
 {key:'environment',label:'البيئة والماء',art:'environment',value:'environment'},
 {key:'blood',label:'التبرع بالدم',art:'blood',value:'hub:blood',ids:['blood-donation','blood-after']},
 {key:'movement',label:'الحركة والرياضة',art:'walk',value:'movement'},
 {key:'head-throat',label:'الصداع والجيوب',art:'migraine',value:'hub:head-throat',ids:['migraine','sinusitis']},
 {key:'skin',label:'صحة الجلد والشمس',art:'sunscreen',value:'skin'},
 {key:'prevention',label:'الفحوص والوقاية',art:'checkup',value:'prevention'}
];
R.searchAliases={diabetes:'السكر السكري مرض السكر داء السكري', 'blood-pressure':'ضغط الضغط ارتفاع الضغط انخفاض الضغط hypertension', 'kidney-disease':'الكلى الكلي الكلاوي الفشل الكلوي القصور الكلوي renal', 'kidney-stones':'حصوة حصى حصوات الكلى',gout:'النقرس نقرس حمض اليوريك داء الملوك','women-health':'النساء المرأة صحة النساء','addiction-help':'الادمان المخدرات الكحول تعاطي التعافي','mental-depression':'اكتئاب اكتئآب حزن الصحة النفسية','mental-anxiety':'قلق توتر الصحة النفسية'};
const art={diabetes:'diabetes-plan','diabetes-daily-care':'diabetes-plan','diabetes-sick-days':'diabetes-illness','diabetes-hypoglycemia':'glucose-low','diabetes-feet':'footcare','kidney-disease':'kidney','kidney-stones':'kidney',gout:'gout','women-health':'woman','menstrual-health':'menstrual',menopause:'menopause','breast-awareness':'breast','addiction-help':'recovery','substance-prevention':'recovery','addiction-overdose':'overdose','mental-anxiety':'anxiety','mental-depression':'depression','mental-crisis':'mind-support','postpartum-mood':'woman'};
for(const [id,key]of Object.entries(art)){const a=R.details[id]||R.extra.find(x=>x.id===id);if(a)a.art=key;}
R.maternalGroups=[
 {label:'أثناء الحمل',items:[['antenatal','المتابعة المبكرة'],['pregnancy-pressure','ضغط الحمل'],['gestational-diabetes','سكري الحمل'],['pregnancy-nutrition','غذاء الحامل'],['pregnancy-supplements','الفيتامينات والمكملات'],['pregnancy-discomforts','الأعراض الشائعة'],['pregnancy-movement','الحركة الآمنة'],['maternal-danger','علامات الخطر']]},
 {label:'بعد الولادة',items:[['postpartum-care','العناية بالأم'],['postpartum-caesarean','بعد القيصرية'],['postpartum-mood','الصحة النفسية للأم'],['breastfeeding','دعم الرضاعة']]},
 {label:'فحص المولود ورعايته',items:[['newborn-check','الفحص الكامل'],['newborn-boy','المولود الذكر'],['newborn-girl','المولودة الأنثى'],['newborn-first-week','الأيام الأولى']] }
];
const motherCategory=window.COMMUNITY.categories.find(c=>c[0]==='mother');if(motherCategory){motherCategory[1]='الحمل والأم';motherCategory[2]='الحمل ومتابعته والتعافي بعد الولادة وفحص المولود';}
R.details.diabetes.related=R.healthHubs[0].ids.filter(x=>x!=='diabetes');
const groups=[R.healthHubs[0].ids,['women-health','menstrual-health','menopause','breast-awareness','postpartum-mood','checkups-women'],['kidney-disease','kidney-stones','gout','diabetes','blood-pressure'],['addiction-help','addiction-overdose','substance-prevention'],['mental-anxiety','mental-depression','mental-crisis','stress','sleep','support']];
for(const group of groups)for(const id of group){const a=R.details[id]||R.extra.find(x=>x.id===id);if(a&&!a.related)a.related=group.filter(x=>x!==id);}
})();
