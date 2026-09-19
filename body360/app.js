(() => {
const D=window.BODY360, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let lang='en', mode='practice', viewer=null, currentPhase=null, currentStep=0, procedureHotspots=[];
const state={
 mechanics:{worktop:false,shelf:false,floor:false,pivot:false,trolley:false,sitting:false,stretch:false},
 phases:{prepare:0,side:0,prone:0,move:0}, errors:[], completed:{prepare:false,side:false,prone:false,move:false}
};
const chapterOrder=['mechanics','prepare','side','prone','move','debrief'];
const chapterLabels={
 mechanics:{en:'Body mechanics',ar:'ميكانيكا الجسم'},prepare:{en:'Prepare',ar:'الاستعداد'},side:{en:'Side-lying',ar:'الاستلقاء الجانبي'},
 prone:{en:'Prone',ar:'الانبطاح'},move:{en:'Move to side',ar:'التحريك للجانب'},debrief:{en:'Debrief',ar:'المراجعة'}
};
function tr(x){return typeof x==='string'?x:(x?.[lang]||'')}
function setLanguage(){
 document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 $$('[data-en]').forEach(el=>{el.textContent=el.dataset[lang]||el.dataset.en});
 $('#language').textContent=lang==='en'?'العربية':'English';
 $('#mode').textContent=mode==='practice'?(lang==='en'?'Independent':'مستقل'):(lang==='en'?'Practice':'تدريب');
 $('#modeChip').textContent=mode==='practice'?(lang==='en'?'Practice':'تدريب'):(lang==='en'?'Independent':'مستقل');
 $('#immersiveBanner').textContent=lang==='en'?'Drag to look around. The room objects are the lesson — not a checklist beside the room.':'اسحب للنظر حولك. عناصر الغرفة نفسها جزء من الدرس — وليست مجرد خلفية لقائمة خطوات.';
 renderChapters(); renderStaticHotspots();
 if(currentPhase) renderProcedurePanel();
}
function recordError(code){state.errors.push({code,phase:currentPhase,step:currentStep})}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('show'),2200)}
function openPanel(kicker,html){$('#panel-kicker').textContent=kicker;$('#panel-content').innerHTML=html;$('#panel').classList.add('open');$('#resume').hidden=true}
function closePanel(){ $('#panel').classList.remove('open'); $('#resume').hidden=currentPhase?false:true; }
function viewAim(name){
 const views={patient:[0.12,-.05,68],entry:[-1.7,-.04,79],worktop:[2.45,-.06,67]};
 const v=views[name];if(viewer&&v)viewer.aim(v[0],v[1],v[2]);
}
function hotspotElement(obj,handler,cls=''){
 const b=document.createElement('button');b.className='hotspot '+cls;b.innerHTML='<span class="spot">+</span><span class="label">'+tr(obj.label)+'</span>';
 b.onclick=e=>{e.stopPropagation();handler(obj,b)};$('#hotspots').appendChild(b);viewer.addPoint(b,obj.u,obj.v);return b;
}
function clearHotspots(){ $('#hotspots').innerHTML=''; if(viewer)viewer.points=[]; procedureHotspots=[]; }
function renderStaticHotspots(){
 if(!viewer)return;clearHotspots();
 D.objects.forEach(o=>{
  const b=hotspotElement(o,handleObject,state.mechanics[o.key]?'done':'');
  if(o.kind==='patient'&&(state.completed.move||state.completed.prone||state.completed.side))b.classList.add('done');
 });
}
function handleObject(o){
 if(o.kind==='mechanics')openMechanics(o.key);
 else if(o.kind==='patient')openPatientStart();
}
function mechanicsCount(){return Object.values(state.mechanics).filter(Boolean).length}
function openMechanics(key){
 const m=D.mechanics[key];viewAim(key==='floor'?'entry':key==='worktop'||key==='shelf'||key==='trolley'?'worktop':'patient');
 openPanel(lang==='en'?'BODY MECHANICS':'ميكانيكا الجسم',
 '<span class="source-tag">'+(lang==='en'?'SOURCE-BASED RATIONALE':'مبرر من المصدر')+'</span>'+
 '<h2>'+tr(m.title)+'</h2><p>'+tr(m.prompt)+'</p>'+
 '<div class="options"><button class="option" id="goodChoice">'+tr(m.good)+'</button><button class="option" id="badChoice">'+tr(m.bad)+'</button></div><div id="localFeedback"></div>');
 $('#goodChoice').onclick=()=>{state.mechanics[key]=true;$('#goodChoice').classList.add('done');$('#localFeedback').innerHTML='<div class="feedback"><strong>'+(lang==='en'?'Good mechanics':'ميكانيكا جسم سليمة')+'</strong>'+tr(m.rationale)+'</div>';renderChapters();};
 $('#badChoice').onclick=()=>{recordError('mechanics-'+key);$('#badChoice').classList.add('done');$('#localFeedback').innerHTML='<div class="feedback critical"><strong>'+(lang==='en'?'Unsafe choice':'اختيار غير آمن')+'</strong>'+tr(m.rationale)+'</div>';};
}
function openPatientStart(){
 viewAim('patient');
 const ready=mechanicsCount();
 openPanel(lang==='en'?'BEDSIDE MOVEMENT':'تحريك المريض بجانب السرير',
 '<span class="source-tag">'+(lang==='en'?'CHECKLIST-DERIVED SEQUENCE':'تسلسل مستمد من القائمة')+'</span>'+
 '<h2>'+(lang==='en'?'Khaled needs repositioning.':'خالد يحتاج إلى إعادة وضعه.')+'</h2>'+
 '<p>'+(lang==='en'?'You will perform the instructor’s supplied turning/moving checklist inside the 360° room. Patient-body hotspots become interactive during each phase.':'ستنفذ قائمة التدوير/التحريك المرفقة من الأستاذة داخل غرفة 360°. ستصبح نقاط جسم المريض تفاعلية في كل مرحلة.')+'</p>'+
 '<div class="data-card"><div class="data-row"><span>'+(lang==='en'?'Mechanics stations completed':'محطات ميكانيكا الجسم المكتملة')+'</span><strong>'+ready+' / 7</strong></div><div class="data-row"><span>'+(lang==='en'?'Mode':'الوضع')+'</span><strong>'+(mode==='practice'?(lang==='en'?'Practice':'تدريب'):(lang==='en'?'Independent':'مستقل'))+'</strong></div></div>'+
 '<button class="primary" id="beginProcedure">'+(lang==='en'?'Begin at the bedside':'ابدأ عند السرير')+'</button>'+
 '<p class="small muted">'+(lang==='en'?'You may begin even if not every mechanics station is complete; the debrief will keep that gap visible.':'يمكنك البدء حتى إن لم تُكمل كل محطات ميكانيكا الجسم؛ وستظهر الفجوة في المراجعة النهائية.')+'</p>');
 $('#beginProcedure').onclick=()=>startPhase('prepare');
}
function phaseProgressHTML(phase){
 const p=D.phases[phase],idx=state.phases[phase];
 return '<div class="sequence-strip">'+p.steps.map((s,i)=>'<span class="sequence-dot '+(i<idx?'done':i===idx?'current':'')+'"></span>').join('')+'</div>';
}
function renderProcedureHotspots(){
 clearHotspots();
 if(!currentPhase)return;
 const p=D.phases[currentPhase];
 p.steps.forEach((s,i)=>{
   const o={id:s.id,label:s.label,u:s.u,v:s.v,index:i};
   const b=hotspotElement(o,handleProcedureClick,i<state.phases[currentPhase]?'done':'');
   b.dataset.index=i;procedureHotspots.push(b);
 });
}
function startPhase(phase){
 currentPhase=phase;currentStep=state.phases[phase]||0;viewAim('patient');renderProcedureHotspots();renderProcedurePanel();renderChapters();
}
function renderProcedurePanel(){
 if(!currentPhase)return;
 const p=D.phases[currentPhase],idx=state.phases[currentPhase];
 if(idx>=p.steps.length){completePhase(currentPhase);return;}
 const step=p.steps[idx];
 const practice=mode==='practice';
 openPanel(lang==='en'?'PATIENT HANDLING':'تحريك المريض',
 '<span class="source-tag">'+(lang==='en'?'CHECKLIST STEP':'خطوة من القائمة')+'</span>'+
 (practice?'<span class="source-tag review">'+(lang==='en'?'RATIONALE LABELLED WHEN SUPPLEMENTAL':'المبرر الإضافي مميز بوضوح')+'</span>':'')+
 '<h2>'+tr(p.title)+'</h2>'+phaseProgressHTML(currentPhase)+
 '<div class="phase-note">'+tr(p.note)+'</div>'+
 '<div class="step-now"><strong>'+(practice?(lang==='en'?'What should happen next?':'ما الخطوة التالية؟'):(lang==='en'?'Continue independently.':'تابع بشكل مستقل.'))+'</strong><small>'+(practice?(lang==='en'?'Use the hotspots on Khaled / bedside. The available actions are visible, but their order is yours to decide.':'استخدم النقاط التفاعلية على خالد/السرير. الإجراءات المتاحة ظاهرة، لكن عليك تحديد ترتيبها.'):(lang==='en'?'The simulator records ordering errors without giving the correct step away.':'يسجل النظام أخطاء الترتيب دون كشف الخطوة الصحيحة.'))+'</small></div>'+
 '<div id="localFeedback"></div>'+
 '<button class="secondary" id="exitProcedure">'+(lang==='en'?'Pause and look around':'توقف مؤقتًا وانظر حولك')+'</button>');
 $('#exitProcedure').onclick=()=>{closePanel();};
}
function handleProcedureClick(o,b){
 const p=D.phases[currentPhase], expected=state.phases[currentPhase], clicked=Number(b.dataset.index);
 if(clicked!==expected){
   recordError('order-'+currentPhase+'-'+o.id);
   if(mode==='practice'){
     const exp=p.steps[expected];
     $('#localFeedback').innerHTML='<div class="feedback warn"><strong>'+(lang==='en'?'Correct action, wrong time':'إجراء صحيح، لكن في وقت غير مناسب')+'</strong>'+(lang==='en'?'This action belongs in the procedure, but another checklist step comes first. Think about what must be prepared before '+tr(o.label).toLowerCase()+'.':'هذا الإجراء جزء من المهارة، لكن توجد خطوة سابقة في القائمة. فكّر فيما يجب تحضيره قبل '+tr(o.label)+'.')+'</div>';
   } else {
     toast(lang==='en'?'Sequence issue recorded. Continue.':'تم تسجيل مشكلة في الترتيب. تابع.');
   }
   return;
 }
 state.phases[currentPhase]++;b.classList.add('done');
 if(mode==='practice'){
   const rationale=D.phaseRationales[currentPhase]?.[o.id];
   $('#localFeedback').innerHTML='<div class="feedback"><strong>'+(lang==='en'?'Step completed':'تمت الخطوة')+'</strong>'+tr(rationale||{en:'Checklist step completed.',ar:'تم تنفيذ خطوة القائمة.'})+'</div>';
 }
 currentStep=state.phases[currentPhase];
 setTimeout(()=>{ if(state.phases[currentPhase]>=p.steps.length) completePhase(currentPhase); else renderProcedurePanel(); }, mode==='practice'?900:250);
}
function completePhase(phase){
 state.completed[phase]=true;const next={prepare:'side',side:'prone',prone:'move',move:'debrief'}[phase];
 if(next==='debrief'){currentPhase=null;renderStaticHotspots();showDebrief();return;}
 currentPhase=null;renderStaticHotspots();renderChapters();
 openPanel(lang==='en'?'PHASE COMPLETE':'اكتملت المرحلة',
 '<h2>'+tr(D.phases[phase].title)+'</h2><div class="feedback"><strong>'+(lang==='en'?'Completed in checklist order':'اكتمل حسب ترتيب القائمة')+'</strong>'+(lang==='en'?'Continue to the next patient-handling phase.':'تابع إلى مرحلة تحريك المريض التالية.')+'</div><button class="primary" id="nextPhase">'+(lang==='en'?'Continue: ':'تابع: ')+tr(D.phases[next].title)+'</button>');
 $('#nextPhase').onclick=()=>startPhase(next);
}
function showDebrief(){
 renderChapters();
 const m=mechanicsCount(), errs=state.errors.length;
 openPanel(lang==='en'?'DEBRIEF':'المراجعة',
 '<h2>'+(lang==='en'?'Movement debrief':'مراجعة التحريك')+'</h2>'+
 '<div class="data-card">'+
 '<div class="data-row"><span>'+(lang==='en'?'Body-mechanics stations':'محطات ميكانيكا الجسم')+'</span><strong>'+m+' / 7</strong></div>'+
 '<div class="data-row"><span>'+(lang==='en'?'Prepare patient':'تحضير المريض')+'</span><strong>'+(state.completed.prepare?'✓':'—')+'</strong></div>'+
 '<div class="data-row"><span>'+(lang==='en'?'Supine → side-lying':'الظهري ← الجانبي')+'</span><strong>'+(state.completed.side?'✓':'—')+'</strong></div>'+
 '<div class="data-row"><span>'+(lang==='en'?'Supine → prone':'الظهري ← الانبطاح')+'</span><strong>'+(state.completed.prone?'✓':'—')+'</strong></div>'+
 '<div class="data-row"><span>'+(lang==='en'?'Move to side of bed':'التحريك إلى جانب السرير')+'</span><strong>'+(state.completed.move?'✓':'—')+'</strong></div>'+
 '<div class="data-row"><span>'+(lang==='en'?'Sequence / technique issues':'مشكلات الترتيب / التقنية')+'</span><strong>'+errs+'</strong></div></div>'+
 '<div class="phase-note">'+(lang==='en'?'Source integrity: body-mechanics rationales come from the supplied rationale sheet. The turning/moving checklist provides procedure order but not written rationales; any added teaching rationale is explicitly marked “supplemental — faculty review.”':'سلامة المصدر: مبررات ميكانيكا الجسم مأخوذة من ورقة المبررات المرفقة. أما قائمة التدوير/التحريك فتقدم ترتيب الإجراء دون مبررات مكتوبة؛ لذلك أي مبرر تدريسي مضاف موسوم بوضوح «إضافي — للمراجعة من عضو هيئة التدريس».')+'</div>'+
 '<button class="primary" id="retry">'+(lang==='en'?'Practice patient movement again':'أعد تدريب تحريك المريض')+'</button>');
 $('#retry').onclick=()=>resetProcedure();
}
function resetProcedure(){
 state.phases={prepare:0,side:0,prone:0,move:0};state.completed={prepare:false,side:false,prone:false,move:false};state.errors=state.errors.filter(e=>!String(e.code).startsWith('order-'));currentPhase=null;renderStaticHotspots();renderChapters();openPatientStart();
}
function renderChapters(){
 const complete={mechanics:mechanicsCount()>=7,prepare:state.completed.prepare,side:state.completed.side,prone:state.completed.prone,move:state.completed.move,debrief:state.completed.move};
 $('#chapters').innerHTML=chapterOrder.map((c,i)=>'<button class="chapter '+(complete[c]?'done ':'')+(currentPhase===c?'active':'')+'" data-chapter="'+c+'"><span class="num">'+(complete[c]?'✓':i+1)+'</span><span>'+chapterLabels[c][lang]+'</span></button>').join('');
 $$('[data-chapter]').forEach(b=>b.onclick=()=>{const c=b.dataset.chapter;if(c==='mechanics'){currentPhase=null;renderStaticHotspots();viewAim('worktop');openPanel(lang==='en'?'BODY MECHANICS':'ميكانيكا الجسم','<h2>'+(lang==='en'?'Explore the room stations.':'استكشف محطات الغرفة.')+'</h2><p>'+(lang==='en'?'Use the hotspots for lifting, reaching, floor pickup, pivoting, pushing, sitting and stretching.':'استخدم النقاط التفاعلية للرفع، والوصول، والتقاط غرض من الأرض، والارتكاز، والدفع، والجلوس، والتمدد.')+'</p>');} else if(c==='debrief'&&state.completed.move)showDebrief(); else if(D.phases[c])startPhase(c);});
}
function help(){
 openPanel(lang==='en'?'TEACHING NOTE':'ملاحظة تعليمية',
 '<h2>'+(lang==='en'?'Why this version is different':'لماذا هذا الإصدار مختلف')+'</h2><p>'+(lang==='en'?'The 360° room stays primary. You explore the same realistic room used by the stronger safety prototype, then interact with room objects and patient-body hotspots instead of leaving the environment for a separate “skills page.”':'تبقى غرفة 360° هي الواجهة الأساسية. تستكشف نفس الغرفة الواقعية المستخدمة في نموذج السلامة الأقوى، ثم تتفاعل مع عناصر الغرفة ونقاط جسم المريض بدل مغادرة البيئة إلى «صفحة مهارات» منفصلة.')+'</p>');
}
function fallback(){
 $('#fallback').hidden=false;$('#fallback').innerHTML='<div style="padding:30px;color:white"><h2>360° room unavailable</h2><p>The interaction panel still works, but this browser could not open the panoramic viewer.</p></div>';
}
function init(){
 viewer=new Room360($('#panorama'),'../safety360/assets/room.jpg',ok=>{ $('#loading').hidden=true;if(!ok){fallback();return} renderStaticHotspots();viewAim('patient'); });
 $('#language').onclick=()=>{lang=lang==='en'?'ar':'en';setLanguage()};
 $('#mode').onclick=()=>{mode=mode==='practice'?'independent':'practice';setLanguage();if(currentPhase)renderProcedurePanel()};
 $('#fullscreen').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.();
 $('#menu').onclick=()=>{openPanel(lang==='en'?'SCENARIO MENU':'قائمة السيناريو','<h2>'+(lang==='en'?'Body mechanics + patient movement':'ميكانيكا الجسم + تحريك المريض')+'</h2><button class="nav-item" id="menuMechanics">'+(lang==='en'?'Explore body-mechanics stations':'استكشف محطات ميكانيكا الجسم')+'</button><button class="nav-item" id="menuPatient">'+(lang==='en'?'Start / resume patient handling':'ابدأ / تابع تحريك المريض')+'</button><button class="nav-item" id="menuDebrief">'+(lang==='en'?'Debrief':'المراجعة')+'</button>');setTimeout(()=>{$('#menuMechanics').onclick=()=>{closePanel();currentPhase=null;renderStaticHotspots();viewAim('worktop')};$('#menuPatient').onclick=()=>{closePanel();currentPhase?renderProcedurePanel():openPatientStart()};$('#menuDebrief').onclick=showDebrief},0)};
 $('#close-panel').onclick=closePanel;$('#resume').onclick=()=>renderProcedurePanel();$('#help').onclick=help;
 $('#look-left').onclick=()=>viewer.turn(-.18,0);$('#look-right').onclick=()=>viewer.turn(.18,0);$('#look-up').onclick=()=>viewer.turn(0,.12);$('#look-down').onclick=()=>viewer.turn(0,-.12);
 $('#zoom-in').onclick=()=>viewer.zoom(-8);$('#zoom-out').onclick=()=>viewer.zoom(8);$('#explore').onclick=()=>{currentPhase=null;renderStaticHotspots();viewer.aim(0,-.03,88)};
 $$('[data-view]').forEach(b=>b.onclick=()=>viewAim(b.dataset.view));
 setLanguage();renderChapters();
 setTimeout(()=>{openPanel(lang==='en'?'WELCOME':'مرحبًا','<h2>'+(lang==='en'?'Move safely.':'تحرّك بأمان.')+'</h2><p>'+(lang==='en'?'Explore the 360° skills room. Practice the professor’s body-mechanics points at real room stations, then approach Khaled and perform the supplied turning/moving sequence directly at the bedside.':'استكشف مختبر المهارات بزاوية 360°. تدرب على نقاط ميكانيكا الجسم من مادة الأستاذة في محطات الغرفة، ثم اقترب من خالد ونفذ تسلسل التدوير/التحريك المرفق مباشرة عند السرير.')+'</p><button class="primary" id="welcomeGo">'+(lang==='en'?'Enter the lab':'ادخل المختبر')+'</button>');setTimeout(()=>{$('#welcomeGo').onclick=closePanel},0)},300);
}
window.addEventListener('DOMContentLoaded',init);
})();