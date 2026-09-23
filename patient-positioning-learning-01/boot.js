'use strict';
function compilePositioning(data,strings,base,addon){
 if(data.topics.length!==12||data.questions.length!==24)throw Error('Incomplete positioning content');
 let s=base;
 function replace(a,b){if(!s.includes(a))throw Error('Engine mismatch: '+a.slice(0,70));s=s.replace(a,b);}
 replace('window.BM_DATA','window.POS_DATA');
 replace(';\nlet lang',';\nconst labels='+JSON.stringify(strings)+';for(const [k,v] of Object.entries(labels)){W.en[k]=v[0];W.ar[k]=v[1];}\nlet lang');
 replace('motions:i===6?[false,false,false,false]:[false]','motions:[false],gate:false,gateAttempts:0,stops:0');
 replace('const conceptIDs=[2,5,7,10,14,17,18];','const conceptIDs=P.map((_,i)=>i);');
 replace('function details(i,full=false)','function detailsOld(i,full=false)');
 replace('function render(){shell();','function renderCore(){shell();');
 replace('Math.min(6,i)','Math.min(P.length-1,i)');
 s=s.replaceAll('topic===6','false');
 replace('const r=record(),idx=false?variant:0;','const r=record(),idx=0;');
 replace("${false?'disabled':''}","${topic===P.length-1?'disabled':''}");
 replace("mode==='test'&&false", "mode==='test'&&topic===P.length-1");
 s=s.replaceAll('/7','/12').replaceAll('/ 07','/ 12');
 s=s.replaceAll("shuffle([0,1,2,3]).map(i=>", "shuffle(q.options.map((_,i)=>i)).map(i=>");
 s=s.replaceAll('quiz.order[id]=shuffle([0,1,2,3])','quiz.order[id]=shuffle(D.questions[id].options.map((_,i)=>i))');
 replace("['Proper Body Mechanics · Tobruk Nursing','ميكانيكا الجسم السليمة · تمريض طبرق']","['Patient Positioning · Tobruk Nursing','وضعيات المريض · تمريض طبرق']");
 replace('function draw(){','function drawOld(){');
 replace("function select(i){topic=","function select(i){paused=false;positionView=i===6?'top':'angled';topic=");
 replace("function setMode(m){mode=m;","function setMode(m){paused=false;mode=m;");
 replace("function move(v){if(mode", "function move(v){if(mode!=='learn'&&(!record().gate||paused))return;if(mode");
 replace('record().ready)record().seconds+=dt','record().ready&&record().gate&&!paused)record().seconds+=dt');
 // Background frame loop must not access a gate screen before its controls exist.
 replace('function update(){','function update(){if(!$\x28\'scene\'\x29)return;');
 replace('window.bodyMechanics=','window.positioning=');
 replace('quiz,testReview}));}','quiz,testReview,positionView,preview,paused}));}');
 replace('Tobruk-Body-Mechanics-Learning-01.html','Tobruk-Patient-Positioning-Learning-01.html');
 replace('<h1 class="question">${bi(q.stem)}</h1>','<p class="small">${q.basis===\'added-safety\'?bi([\'Added safety interpretation\',\'تفسير سلامة مضاف\']):q.basis===\'source-gap\'?bi([\'Source difference / limitation\',\'فرق أو حد في المصدر\']):bi([\'Source-based learning\',\'تعلم قائم على المصدر\'])}</p><h1 class="question">${bi(q.stem)}</h1>');
 replace('logos();render();requestAnimationFrame(tick);',addon+'\nlogos();render();requestAnimationFrame(tick);');
 return 'window.POS_DATA='+JSON.stringify(data)+';\n'+s;
}
function expandPositioning(rows,additional){
 const topics=rows.map(r=>({id:r[0],title:r[1],notesNo:r[2],checkNo:r[3],steps:r[4],actions:[r[4].map(s=>s[0]).join(' '),r[4].map(s=>s[1]).join(' ')],source:r[4].map((s,i)=>`${i+1}. ${s[0]}`).join('\n'),sourceWhy:r[5]?.[0]||'No rationale supplied for this entry.',why:r[5]||['No rationale is supplied for this entry in the provided files.','لا يقدم الملفان مبررًا لهذه الخانة.'],hasRationale:!!r[5],cue:r[6],extra:r[7],controls:r[8].map(c=>({id:c[0],label:c[1],initial:0,options:[['Choose…','اختر…'],...c[2]],good:c[3],reason:c[4]})),refs:['handling','bed',...(r[0]==='trend'?['shock']:[])],compare:r[9],sourceVariants:r[10]}));
 const questions=topics.map((t,i)=>{const c=t.controls[0];let options=c.options.slice(1),correct=c.good[0]-1,why=options.map((_,j)=>j===correct?['This matches the stated feature. '+c.reason[0],'يطابق هذا التفصيل المحدد. '+c.reason[1]]:['This option changes or omits the feature required here. '+c.reason[0],'يغيّر هذا الخيار التفصيل المطلوب أو يحذفه. '+c.reason[1]]);
 if(i===3){options=[['Flat on the back, legs together','على الظهر مسطحًا والساقان معًا'],['On the abdomen with knees beneath raised hips','على البطن والركبتان تحت الوركين المرتفعين'],['Backrest raised to 90°','مسند ظهر مرفوع إلى 90°']];correct=0;why=[['The notes define horizontal recumbent as flat on the back; knees may be straight or slightly flexed.','تعرف الملاحظات الاستلقاء الأفقي بأنه مسطح على الظهر؛ قد تكون الركبتان ممدودتين أو مثنيتين قليلًا.'],['That describes a different arrangement, not the flat-back entry.','هذا ترتيب آخر وليس البند الظهري المسطح.'],['The near-upright 90° setup belongs to High Fowler’s in the checklist.','ينتمي إعداد 90° القريب من العمودي لفاولر المرتفع في القائمة.']];}
 return{topic:i,basis:'source',stem:['For '+t.title[0]+', which choice matches the specified feature?','في '+t.title[1]+'، أي اختيار يطابق التفصيل المحدد؟'],options,correct,why};});
 return {source:['6. Positioning--.docx','6.Positioning.docx'],topics,questions:[...questions,...additional],refs:{handling:{name:'OSHA — Safe Patient Handling',url:'https://www.osha.gov/healthcare/safe-patient-handling'},bed:{name:'FDA — Bed Safety',url:'https://www.fda.gov/medical-devices/hospital-beds/guide-bed-safety-bed-rails-hospitals-nursing-homes-and-home-health-care-facts'},shock:{name:'AHA / Red Cross — 2024 First Aid, §5.2 Position for Shock',url:'https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines'}}};
}

if(typeof module!=='undefined'&&module.exports){module.exports=compilePositioning;module.exports.expand=expandPositioning;}
else{const boot=document.currentScript;(async()=>{try{
 const names=['rows-0.json','rows-1.json','rows-2.json','rows-3.json','questions-extra.json','strings.json','engine-base.js','addon.js'];
 const t=await Promise.all(names.map(async n=>{const r=await fetch(n);if(!r.ok)throw Error(n+' '+r.status);return r.text();}));
 const data=expandPositioning(t.slice(0,4).flatMap(v=>JSON.parse(v)),JSON.parse(t[4]));
 const script=document.createElement('script');script.textContent=compilePositioning(data,JSON.parse(t[5]),t[6],t[7]);boot.replaceWith(script);
}catch(e){console.error(e);document.getElementById('content').textContent='Unable to open the module. Check the connection and reload. تعذر فتح الوحدة؛ تحقق من الاتصال وأعد التحميل. '+e.message;}})();}
