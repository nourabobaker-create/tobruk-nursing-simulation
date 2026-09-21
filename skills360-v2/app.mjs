import {fresh,transition,missing,checkpoint,TARGET_SECONDS} from './engine.mjs';
import {lessons,watchSteps,reviews,UI,pick} from './content.mjs';
import {panorama,closeScene} from './scene.mjs';
import {washTechnique,gloveTechnique,WASH_TECHNIQUES} from './technique.mjs';

const $=s=>document.querySelector(s), app=$('#app');
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let lang=localStorage.getItem('tobruk-skills-lang')||'en';
let stage=0,lesson=0,s=fresh(),station='room',yaw=1150,back=false,handY=335,hint=0,lastInput=Date.now(),returnDebrief=false,rationale=[],installEvent;
let demoIndex=0,playing=false,slow=false,demoTimer=null;
let frictionActive=false,frictionIndex=0,frictionStrokes=0;
let learnTechniqueIndex=0;
const T=v=>pick(v,lang);
const tr=(en,ar)=>lang==='ar'?ar:en;

function save(){try{localStorage.setItem('tobruk-skills360-v2',JSON.stringify({stage,lesson,s,station,rationale,lang}));localStorage.setItem('tobruk-skills-lang',lang);}catch{}}
function modal(title,html){$('#modalBody').innerHTML=`<h2>${title}</h2>${html}`;$('#modal').showModal();}
$('#closeModal').onclick=()=>$('#modal').close();

function headerText(){
 document.documentElement.lang=lang; document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 $('#lang').textContent=lang==='en'?'العربية':'English';
 $('#brandTitle').textContent=T(UI.brand); $('#brandSub').textContent=T(UI.faculty);
 $('#review').textContent=tr('Faculty review','مراجعة الكلية');
 $('#help').setAttribute('aria-label',tr('Interaction help','مساعدة الاستخدام'));
}
function nav(){
 $('#stages').innerHTML=UI.stages.map((n,i)=>`<button data-stage="${i}" class="${i===stage?'active':''}" ${i===stage?'aria-current="step"':''}><span>${i+1}</span>${T(n)}</button>`).join('');
 $('#stages').querySelectorAll('button').forEach(b=>b.onclick=()=>setStage(+b.dataset.stage));
}
function stopDemo(){playing=false;clearTimeout(demoTimer);demoTimer=null;}
function setStage(n){
 stopDemo(); stage=n; returnDebrief=false; frictionActive=false; frictionIndex=0; frictionStrokes=0;
 if(n===0){lesson=0;setupLesson();}
 if(n===1){demoIndex=0;station=watchSteps[0].station;}
 if(n===2||n===3){s=fresh(n===2?'practice':'independent');station='room';yaw=1150;hint=0;handY=335;back=false;lastInput=Date.now();}
 render();save();
}

$('#lang').onclick=()=>{lang=lang==='en'?'ar':'en';headerText();render();save();};
$('#help').onclick=()=>modal(tr('How to use the simulation','طريقة استخدام المحاكاة'),`<p>${tr('The app has five stages: learn, watch a full demonstration, practise with coaching, perform independently, then review your decisions.','للتطبيق خمس مراحل: التعلّم، مشاهدة عرض كامل، التدريب مع التوجيه، الأداء المستقل، ثم مراجعة القرارات.')}</p><p>${tr('In the room, drag an empty area to look around and tap a station to approach. During guided friction, copy the visible hand movement with two deliberate swipes. In independent mode, rub directly on the hands and turn them over to reach the other side.','داخل الغرفة اسحب مساحة فارغة للنظر حولك واضغط على المحطة للاقتراب. أثناء تدريب الفرك الموجّه، قلد حركة اليدين الظاهرة بمسحتين واضحتين. في الوضع المستقل افرك مباشرة على اليدين واقلبهما للوصول إلى الجهة الأخرى.')}</p><p>${tr('If you make a mistake in Practice, the correct recovery action stays available. Independent mode records ordinary sequence mistakes instead of trapping you.','إذا أخطأت في وضع التدريب يبقى مسار التصحيح متاحًا. أما الوضع المستقل فيسجل أخطاء الترتيب العادية بدل أن يحاصرك.')}</p>`);
$('#review').onclick=async()=>{let source=await fetch('./source.json').then(r=>r.json());modal(tr('FACULTY REVIEW REQUIRED','تتطلب مراجعة الكلية'),`<p class="review-note">${tr('Educational prototype · instructor validation required before assessed use.','نموذج تعليمي · يحتاج اعتماد المدرّس قبل الاستخدام التقييمي.')}</p>${reviews.map(([h,p])=>`<h3>${T(h)}</h3><p>${T(p)}</p>`).join('')}<h3>${tr('Primary curricular sources','المصادر التعليمية الأساسية')}</h3><p>${source.sources.join('<br>')}</p><details><summary>${tr('Original procedure transcription','النص الأصلي للإجراءات')}</summary>${source.items.map(x=>`<h3>${x.id}</h3><p>${esc(x.original)}</p><p><em>${esc(x.rationale)}</em></p>`).join('')}</details>`);};

function render(){headerText();nav(); if(stage===0)renderLearn(); else if(stage===1)renderWatch(); else if(stage===4)renderDebrief(); else renderLab();}

function setupLesson(){
 s=fresh();station='sink';handY=335;back=false;learnTechniqueIndex=0;
 const v=lessons[lesson].visual;
 if(v==='prepare'){s.water=false;s.watch=true;}
 if(v==='water'){s.water=true;s.watch=false;}
 if(v==='faucet'){s=checkpoint('faucet');}
 if(v==='glove'){s=checkpoint('removal');station='gloves';}
}
function lessonScene(){
 const v=lessons[lesson].visual;
 if(v==='technique')return washTechnique(WASH_TECHNIQUES[learnTechniqueIndex][0],{lang});
 if(v==='glove')return gloveTechnique('remove2',{lang});
 return closeScene('sink',s,{handY,elbow:v==='water'});
}
function renderLearn(){
 const l=lessons[lesson];
 app.innerHTML=`<section class="learn-v3"><article class="lesson-card"><p class="eyebrow">${T(l.tag)}</p><h1>${T(l.title)}</h1><p class="lead">${T(l.body)}</p><div class="why-card"><b>${tr('WHY IT MATTERS','لماذا يهم؟')}</b><p>${T(l.why)}</p></div><p class="lesson-count">${lesson+1} / ${lessons.length}</p><div class="lesson-actions"><button id="previous">${tr('← Back','السابق →')}</button><button class="primary" id="next">${lesson===lessons.length-1?tr('Watch the full demonstration →','شاهد العرض الكامل ←'):tr('Next lesson →','الدرس التالي ←')}</button></div></article><div class="lesson-visual"><div id="scene">${lessonScene()}</div><div id="learnControls"></div><div class="mini-caption" id="lessonFeedback">${tr('The picture should teach before the text does.','يجب أن توضح الصورة الفكرة قبل النص.')}</div></div></section>`;
 $('#previous').onclick=()=>{if(lesson>0){lesson--;setupLesson();render();}};
 $('#next').onclick=()=>{if(lesson===lessons.length-1)setStage(1);else{lesson++;setupLesson();render();save();}};
 const v=l.visual;
 if(v==='prepare'){
   $('#learnControls').innerHTML=`<div class="learn-buttons"><button id="removeWatch">${tr('Remove Ahmed’s watch','انزع ساعة أحمد')}</button><button id="touchBasin">${tr('Move too close to basin','اقترب أكثر من اللازم من الحوض')}</button></div>`;
   $('#removeWatch').onclick=()=>{s=transition(s,'watch');paintLearn();learnFeedback(tr('Now the skin beneath the watch is accessible.','أصبح الجلد تحت الساعة متاحًا للتنظيف.'));};
   $('#touchBasin').onclick=()=>{s=transition(s,'stance',{safe:false});paintLearn();learnFeedback(tr('The uniform contact becomes a contamination risk. The student must be able to step back and recover.','ملامسة الزي للحوض تصبح خطر تلوث. يجب أن يستطيع الطالب التراجع والتصحيح.'));};
 } else if(v==='water'){
   $('#learnControls').innerHTML=`<div class="learn-buttons"><button id="highHands">${tr('Hands above elbows','اليدان أعلى من المرفقين')}</button><button id="lowHands" class="primary">${tr('Hands below elbows','اليدان أخفض من المرفقين')}</button></div>`;
   $('#highHands').onclick=()=>{handY=210;s=transition(s,'position',{low:false});paintLearn();learnFeedback(tr('Compare the direction of flow. This does not match H4.','قارن اتجاه جريان الماء. هذا لا يطابق H4.'));};
   $('#lowHands').onclick=()=>{handY=335;s=transition(s,'position',{low:true});paintLearn();learnFeedback(tr('This matches the supplied sequence: hands lower than elbows.','هذا يطابق التسلسل المرفق: اليدان أخفض من المرفقين.'));};
 } else if(v==='technique'){
   $('#learnControls').innerHTML=`<div class="technique-selector"><button id="prevMotion">‹</button><strong id="motionName">${T({en:WASH_TECHNIQUES[0][1],ar:'راحة اليد مع راحة اليد'})}</strong><button id="nextMotion">›</button></div>`;
   const updateMotion=()=>{const [id,en]=WASH_TECHNIQUES[learnTechniqueIndex];const arNames=['راحة اليد مع راحة اليد','ظهر كل يد','الأصابع وما بينها','أطراف الأصابع','المفاصل','الرسغان','الساعدان','منطقة الأظافر'];$('#scene').innerHTML=washTechnique(id,{lang});$('#motionName').textContent=lang==='ar'?arNames[learnTechniqueIndex]:en;};
   $('#prevMotion').onclick=()=>{learnTechniqueIndex=(learnTechniqueIndex+WASH_TECHNIQUES.length-1)%WASH_TECHNIQUES.length;updateMotion();};
   $('#nextMotion').onclick=()=>{learnTechniqueIndex=(learnTechniqueIndex+1)%WASH_TECHNIQUES.length;updateMotion();};
 } else if(v==='faucet'){
   $('#learnControls').innerHTML=`<div class="learn-buttons"><button id="bareFaucet">${tr('Touch with bare fingers','المس بأصابع عارية')}</button><button id="towelFaucet" class="primary">${tr('Use paper towel barrier','استخدم منشفة ورقية كحاجز')}</button></div>`;
   $('#bareFaucet').onclick=()=>{s=checkpoint('faucet');s=transition(s,'faucet',{bare:true});paintLearn();learnFeedback(tr('Simulated contamination transfers back to clean fingers.','ينتقل التلوث المحاكى مرة أخرى إلى الأصابع النظيفة.'));};
   $('#towelFaucet').onclick=()=>{s=checkpoint('faucet');s.towel=true;s=transition(s,'faucet',{bare:false});paintLearn();learnFeedback(tr('The clean hand is separated from the less-clean faucet.','تُفصل اليد النظيفة عن الصنبور الأقل نظافة.'));};
 }
}
function paintLearn(){const el=$('#scene');if(el)el.innerHTML=lessonScene();}
function learnFeedback(m){const el=$('#lessonFeedback');if(el)el.textContent=m;}

function applyWatchStep(state,step){
 let n=state;
 const a=step.action;
 if(a==='rub'){for(let i=0;i<2;i++){n=transition(n,'rub',{area:'left.'+step.area,seconds:1});n=transition(n,'rub',{area:'right.'+step.area,seconds:1});}return n;}
 if(a==='position')return transition(n,a,{low:true});
 if(a==='faucet'){n.towel=true;return transition(n,a,{bare:false});}
 if(a==='stance')return transition(n,'stance',{safe:true});
 return transition(n,a);
}
function watchState(index){let d=fresh();for(let i=0;i<=index;i++)d=applyWatchStep(d,watchSteps[i]);return d;}
function watchVisual(step,index){
 if(step.visual==='wash')return washTechnique(step.area,{lang});
 if(['take','don1','don2','fit','remove1','remove2'].includes(step.visual))return gloveTechnique(step.visual,{lang});
 const d=watchState(index);return step.station==='room'?panorama(1150):closeScene(step.station,d,{handY:(step.action==='wet'||step.action==='rinse')?270:335});
}
function scheduleDemo(){clearTimeout(demoTimer);if(!playing)return;const step=watchSteps[demoIndex];const ms=(step.visual==='wash'?5000:3600)*(slow?1.8:1);demoTimer=setTimeout(()=>{if(demoIndex<watchSteps.length-1){demoIndex++;renderWatch();scheduleDemo();}else{playing=false;renderWatch();}},ms);}
function renderWatch(){
 const step=watchSteps[demoIndex];station=step.station;
 app.innerHTML=`<section class="watch-shell"><div class="watch-heading"><p class="eyebrow">${tr('WATCH A COMPLETE DEMONSTRATION','شاهد عرضًا كاملًا')}</p><h1>${T(step.title)}</h1><p>${demoIndex+1} / ${watchSteps.length} · ${T(step.why)}</p></div><div class="watch-scene" id="watchScene">${watchVisual(step,demoIndex)}</div><div class="watch-progress"><i style="width:${((demoIndex+1)/watchSteps.length)*100}%"></i></div><div class="watch-controls"><button id="prevWatch">↶ ${tr('Previous','السابق')}</button><button id="playWatch" class="primary">${playing?tr('Ⅱ Pause','Ⅱ إيقاف'):tr('▶ Play','▶ تشغيل')}</button><button id="nextWatch">${tr('Next','التالي')} ↷</button><button id="slowWatch">${tr('Slow','بطيء')}: ${slow?tr('on','مفعل'):tr('off','متوقف')}</button><button id="whyWatch">${tr('Why?','لماذا؟')}</button><button id="startPractice">${tr('Practice with me →','تدرّب معي ←')}</button></div><p class="watch-note">${tr('Acceptance rule: if the labels disappeared, the physical movement should still be understandable.','قاعدة القبول: لو اختفت العناوين، يجب أن تبقى الحركة الجسدية مفهومة.')}</p></section>`;
 $('#prevWatch').onclick=()=>{stopDemo();demoIndex=Math.max(0,demoIndex-1);renderWatch();};
 $('#nextWatch').onclick=()=>{stopDemo();demoIndex=Math.min(watchSteps.length-1,demoIndex+1);renderWatch();};
 $('#playWatch').onclick=()=>{playing=!playing;renderWatch();if(playing)scheduleDemo();else clearTimeout(demoTimer);};
 $('#slowWatch').onclick=()=>{slow=!slow;if(playing){renderWatch();scheduleDemo();}else renderWatch();};
 $('#whyWatch').onclick=()=>modal(tr('Why this movement?','لماذا هذه الحركة؟'),`<p>${T(step.why)}</p>`);
 $('#startPractice').onclick=()=>setStage(2);
}

function labScene(){
 if(frictionActive)return washTechnique(WASH_TECHNIQUES[frictionIndex][0],{lang});
 return station==='room'?panorama(yaw):closeScene(station,s,{back,handY});
}
function location(){return (stage===3?tr('DO IT YOURSELF','نفّذ بنفسك'):tr('PRACTICE','تدريب'))+' · '+({room:tr('Skills laboratory','مختبر المهارات'),sink:tr('Hand-hygiene station','محطة نظافة اليدين'),gloves:tr('Clean glove station','محطة القفازات النظيفة'),patient:tr('Khaled Salem','خالد سالم')}[station]);}
function renderLab(){
 const practice=stage===2;
 app.innerHTML=`<section class="lab-v3 ${stage===3?'independent':''}"><div class="scene-top"><span class="location">${location()}</span><div class="hud">${practice?`<button id="hint">${tr('A little help','مساعدة بسيطة')}</button>`:''}${station!=='room'&&!frictionActive?`<button id="room">${tr('Look around','انظر حولك')} ↗</button>`:''}</div></div><div id="scene" tabindex="0">${labScene()}</div><div id="feedback" class="coach" role="status" aria-live="polite"></div>${frictionActive?`<div class="friction-task"><span>${tr('COPY THE MOVEMENT','قلّد الحركة')}</span><b>${lang==='ar'?['راحة اليد','ظهر اليد','الأصابع','أطراف الأصابع','المفاصل','الرسغان','الساعدان','الأظافر'][frictionIndex]:WASH_TECHNIQUES[frictionIndex][1]}</b><p>${tr('Make two deliberate swipes while the hands demonstrate the contact.','نفّذ مسحتين واضحتين بينما تعرض اليدان موضع التلامس.')}</p><div class="stroke-dots"><i class="${frictionStrokes>0?'done':''}"></i><i class="${frictionStrokes>1?'done':''}"></i></div></div>`:''}<div class="scene-bottom"><p>${returnDebrief?tr('Targeted retraining — correct this part, then return to your debrief.','تدريب مستهدف — صحح هذه الجزئية ثم عد إلى المراجعة.'):practice?tr('“Ahmed, please prepare to assist Mr Khaled with his morning care.”','«أحمد، استعد لمساعدة السيد خالد في العناية الصباحية.»'):tr('Mr Khaled needs morning care. Prepare and proceed independently.','يحتاج السيد خالد إلى العناية الصباحية. استعد ونفذ المهمة بشكل مستقل.')}</p><div class="actions"><button id="finish">${returnDebrief?tr('Return to debrief','العودة للمراجعة'):tr('Finish attempt','إنهاء المحاولة')}</button>${s.freeze?`<button id="retry" class="primary">${tr('TRY THIS MOVEMENT AGAIN','أعد هذه الحركة')}</button>`:''}</div></div></section>`;
 if($('#room'))$('#room').onclick=()=>{station='room';frictionActive=false;renderLab();};
 if($('#hint'))$('#hint').onclick=showHint;
 $('#finish').onclick=()=>{stage=4;frictionActive=false;render();save();};
 if($('#retry'))$('#retry').onclick=()=>act('retryRemoval');
 if(frictionActive)bindGuidedFriction(); else bindScene();
}
function coach(message,title=''){if(stage===3&&!s.freeze)return;const el=$('#feedback');if(el)el.innerHTML=title?`<b>${esc(title)}</b><p>${esc(message)}</p>`:esc(message);}
function paint(){const el=$('#scene');if(el)el.innerHTML=labScene();if(!frictionActive)bindScene();}
function act(action,payload={}){
 lastInput=Date.now();const before=s;s=transition(s,action,payload);s.lastAction=action;
 if(action==='rub')return;
 if(s.message&&(stage!==3||s.freeze))coach(s.message,s.freeze?tr('Contamination event','حدث تلوث'):'');
 else if(stage===2){const m={water:tr('Water is running. Now bring your hands into the stream.','الماء جارٍ. الآن ضع يديك تحت الماء.'),warm:tr('Warm water selected.','تم اختيار ماء دافئ.'),wet:tr('Hands and wrists are wet. What comes next?','اليدان والرسغان مبللان. ما التالي؟'),soap:tr('Soap is on wet hands. Touch the hands to begin the actual rubbing movements.','الصابون على اليدين المبللتين. المس اليدين لبدء حركات الفرك الفعلية.'),rinse:tr('Lather has been rinsed away.','تم شطف الرغوة.'),dry:tr('Hands and wrists are dry. Think about the faucet.','اليدان والرسغان جافان. فكر في الصنبور.'),watch:tr('Watch removed. The skin is accessible.','تم نزع الساعة. أصبح الجلد متاحًا.'),takeGlove:tr('Glove ready. Put it onto the bare hand.','القفاز جاهز. أدخله على اليد العارية.'),don:tr('Glove applied. Continue the sequence.','تم ارتداء القفاز. تابع التسلسل.'),fit:tr('Gloves adjusted. The short care contact is ready.','تم ضبط القفازات. مهمة الرعاية القصيرة جاهزة.'),care:tr('The outer glove surfaces are now treated as used. Remove them without bare-skin contact.','تُعامل الأسطح الخارجية للقفازات الآن كأسطح مستخدمة. انزعها دون ملامسة الجلد العاري.'),removeFirst:tr('The first glove turned inside-out.','انقلب القفاز الأول إلى الداخل.'),removeSecond:tr('Bare fingers stayed under the cuff.','بقيت الأصابع العارية تحت الحافة.'),bag:tr('Gloves contained. Seal the bag.','تم احتواء القفازات. أغلق الكيس.'),seal:tr('Bag sealed. Dispose of it.','تم إغلاق الكيس. تخلص منه.'),dispose:tr('Disposal complete. Finish with handwashing.','اكتمل التخلص. اختم بغسل اليدين.')};coach(m[action]||'');}
 if(s.events.length>before.events.length&&s.events.at(-1)?.type==='contamination')$('#scene')?.classList.add('contact-flash');
 if(action==='faucet'&&!s.message&&stage===2)coach(s.complete?tr('Both skills are complete, including the final handwash.','اكتملت المهارتان بما فيها غسل اليدين النهائي.'):tr('Faucet closed without bare-hand contact. The clean glove station is ready.','أُغلق الصنبور دون ملامسة اليد العارية. محطة القفازات جاهزة.'));
 paint();save();
}
function startGuidedFriction(){frictionActive=true;frictionIndex=0;frictionStrokes=0;renderLab();}
function bindGuidedFriction(){
 const el=$('#scene');let start=null;
 el.onpointerdown=e=>{start={x:e.clientX,y:e.clientY};el.setPointerCapture(e.pointerId);};
 el.onpointerup=e=>{if(!start)return;const d=Math.hypot(e.clientX-start.x,e.clientY-start.y);start=null;if(d<55){coach(tr('Make a clear rubbing swipe — not just a tap.','نفّذ مسحة فرك واضحة، وليس مجرد ضغطة.'));return;}frictionStrokes++;if(frictionStrokes<2){renderLab();return;}
   const area=WASH_TECHNIQUES[frictionIndex][0];for(let i=0;i<2;i++){s=transition(s,'rub',{area:'left.'+area,seconds:1});s=transition(s,'rub',{area:'right.'+area,seconds:1});}frictionIndex++;frictionStrokes=0;
   if(frictionIndex>=WASH_TECHNIQUES.length){frictionActive=false;renderLab();coach(tr('All required hand surfaces were practised. What should happen to the lather next?','تم التدريب على جميع أسطح اليد المطلوبة. ماذا يجب أن يحدث للرغوة الآن؟'));save();}
   else renderLab();
 };
}
function object(id,point={}){
 if(['sink','gloves','patient'].includes(id)){station=id;renderLab();return;}
 if(stage===2&&station==='sink'&&s.soap&&id==='turnHands'){startGuidedFriction();return;}
 const map={watch:'watch',soap:'soap',temperature:'warm',box:'takeGlove',heldGlove:'don',interlace:'fit',cloth:'care',firstCuff:'removeFirst',innerCuff:'removeSecond',outerGlove:'outer',bin:'dispose'};
 if(map[id]){act(map[id],point);return;}
 if(id==='turnHands'){back=!back;paint();return;}
 if(id==='towelBarrier'){barrierSelected=true;coach(tr('Paper towel ready as a barrier. Touch the faucet handle.','المنشفة الورقية جاهزة كحاجز. المس مقبض الصنبور.'));return;}
 if(id==='faucet'){act(s.water?'faucet':'water',{bare:!barrierSelected});barrierSelected=false;return;}
 if(id==='stream'){act(s.soap||s.rinsed?'rinse':'wet');return;}
 if(id==='towel'){act(s.dry?'towel':'dry');return;}
 if(id==='bag'){act(s.bag?'seal':'bag');return;}
 if(id==='uniform'){act('stance',{safe:!s.stance});return;}
}
let pointer=null,keyRub=null,barrierSelected=false;
function bindScene(){
 const el=$('#scene');if(!el)return;
 el.querySelectorAll('[data-object]').forEach(g=>{try{let b=g.getBBox();let r=document.createElementNS('http://www.w3.org/2000/svg','rect');r.setAttribute('x',b.x-Math.max(0,(86-b.width)/2));r.setAttribute('y',b.y-Math.max(0,(70-b.height)/2));r.setAttribute('width',Math.max(86,b.width));r.setAttribute('height',Math.max(70,b.height));r.setAttribute('fill','transparent');r.setAttribute('class','hitbox');g.insertBefore(r,g.firstChild);}catch{}});
 el.onpointerdown=e=>{lastInput=Date.now();const t=e.target.closest('[data-object],[data-area]');pointer={x:e.clientX,y:e.clientY,lastX:e.clientX,lastY:e.clientY,time:performance.now(),id:t?.dataset.object,area:t?.dataset.area,moved:0,startHand:handY};try{el.setPointerCapture(e.pointerId);}catch{}};
 el.onpointermove=e=>{if(!pointer)return;let p=pointer,dx=e.clientX-p.lastX,dy=e.clientY-p.lastY,dist=Math.hypot(dx,dy);p.moved+=dist;
   if(station==='room'&&!p.id){yaw=(yaw-dx*2.2+2400)%2400;paint();}
   else if(p.id==='towelBarrier'){const towel=$('#heldTowel');if(towel)towel.style.translate=`${(e.clientX-p.x)*1.4}px ${(e.clientY-p.y)*1.4}px`;}
   else if(p.area&&stage===2&&s.soap){if(p.moved>25){startGuidedFriction();pointer=null;return;}}
   else if(p.area&&stage===3&&dist>1){const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-area]');const area=target?.dataset.area||p.area;const dt=Math.min((performance.now()-p.time)/1000,.18);s=transition(s,'rub',{area,seconds:dt});}
   p.lastX=e.clientX;p.lastY=e.clientY;p.time=performance.now();
 };
 el.onpointerup=e=>{const p=pointer;pointer=null;if(!p)return;if(station==='room'&&p.moved>12)return;
   if(p.id==='towelBarrier'&&p.moved>12){let svg=$('#worldSvg'),pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;let v=pt.matrixTransform(svg.getScreenCTM().inverse());if(v.x>400&&v.x<590&&v.y<290){barrierSelected=true;object('faucet');}else coach(tr('Bring the towel to the faucet handle.','حرّك المنشفة إلى مقبض الصنبور.'));return;}
   if(p.area){if(stage===2&&s.soap)startGuidedFriction();return;}
   if(p.id){let svg=$('#worldSvg'),pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;let v=pt.matrixTransform(svg.getScreenCTM().inverse());object(p.id,{x:v.x,y:v.y});}
 };
 el.onpointercancel=()=>pointer=null;
 el.onkeydown=e=>{const t=e.target.closest('[data-object],[data-area]');if(station==='room'&&['ArrowLeft','ArrowRight'].includes(e.key)){yaw=(yaw+(e.key==='ArrowRight'?100:-100)+2400)%2400;paint();return;}if((e.key==='Enter'||e.key===' ')&&t){e.preventDefault();if(t.dataset.object)object(t.dataset.object);else if(stage===3&&!keyRub){const area=t.dataset.area;keyRub=setInterval(()=>{s=transition(s,'rub',{area,seconds:.1});},100);}}};
 el.onkeyup=()=>{clearInterval(keyRub);keyRub=null;};
}
window.addEventListener('keyup',()=>{clearInterval(keyRub);keyRub=null;});
window.addEventListener('blur',()=>{pointer=null;clearInterval(keyRub);keyRub=null;stopDemo();});
function showHint(){
 if(stage!==2)return;hint++;
 let msg='';
 if(station==='room'){msg=[tr('Think about infection prevention before approaching Khaled.','فكر في الوقاية من العدوى قبل الاقتراب من خالد.'),tr('What should happen to your hands before patient contact?','ماذا يجب أن يحدث ليديك قبل ملامسة المريض؟'),tr('Look for the hand-hygiene area.','ابحث عن منطقة نظافة اليدين.')][Math.min(hint-1,2)];if(hint>=4){yaw=0;paint();$('#scene')?.classList.add('hint-glow');}}
 else if(station==='sink'){msg=!s.water?tr('What provides running water?','ما الذي يوفر الماء الجاري؟'):!s.wet&&!s.rinsed?tr('Bring your hands into the running water.','ضع يديك تحت الماء الجاري.'):!s.soap&&!s.rinsed?tr('What comes after wetting in the instructor’s sequence?','ما الذي يأتي بعد التبليل في تسلسل الأستاذة؟'):missing(s).length?tr('The core skill now is hand-to-hand friction. Touch the hands to practise the movement.','المهارة الأساسية الآن هي احتكاك اليد باليد. المس اليدين لتتدرب على الحركة.'):!s.rinsed?tr('What removes the lather?','ما الذي يزيل الرغوة؟'):!s.dry?tr('How will you dry the hands and wrists?','كيف ستجفف اليدين والرسغين؟'):tr('How can you finish without bare contact with the faucet?','كيف تنهي الإجراء دون ملامسة الصنبور باليد العارية؟');}
 else msg=s.removed===1?tr('Where can bare fingers go without touching the used exterior?','أين يمكن للأصابع العارية أن تدخل دون لمس السطح الخارجي المستخدم؟'):s.used?tr('Keep the used glove exterior away from bare skin.','أبعد السطح الخارجي المستخدم للقفاز عن الجلد العاري.'):s.gloves<2?tr('Inspect the glove box and the uncovered hand.','تفقد علبة القفازات واليد غير المغطاة.'):tr('Make the gloves fit before the brief care contact.','اضبط القفازات قبل مهمة الرعاية القصيرة.');
 coach(msg,tr('A little help','مساعدة بسيطة'));lastInput=Date.now();
}
setInterval(()=>{if(stage===2&&!$('#modal').open&&!frictionActive&&Date.now()-lastInput>32000)showHint();},4000);

function audit(){
 const note=(action,why)=>{if(!s.events.some(e=>e.action===action))s.events.push({type:'technique',action,why});};
 if(s.watch)note(tr('Watch remained in place','بقيت الساعة في مكانها'),tr('H2 removes the watch to expose skin for cleaning.','H2 تنص على نزع الساعة لإتاحة الجلد للتنظيف.'));
 if(!s.warm)note(tr('Warm-water adjustment not observed','لم يُلاحظ ضبط الماء الدافئ'),tr('H3 specifies adjusting flow and warm water.','H3 تحدد ضبط التدفق والماء الدافئ.'));
 if(!s.disposed)note(tr('Containment / disposal not completed','لم يكتمل الاحتواء/التخلص'),tr('The supplied gloving sequence includes containment and disposal.','يتضمن تسلسل القفازات المرفق الاحتواء والتخلص.'));
 if(!s.complete)note(tr('Final handwashing not completed','لم يكتمل غسل اليدين النهائي'),tr('G14 includes careful handwashing and drying after glove removal.','G14 تتضمن غسل اليدين وتجفيفهما بعناية بعد نزع القفازات.'));
}
function renderDebrief(){
 audit();const groups=[[tr('What you did well','ما أُنجز جيدًا'),'well'],[tr('Sequence issues','مشكلات الترتيب'),'sequence'],[tr('Technique issues','مشكلات التقنية'),'technique'],[tr('Contamination events','أحداث التلوث'),'contamination'],[tr('Self-corrections','التصحيحات الذاتية'),'correction']];
 const events=s.events;
 app.innerHTML=`<section class="debrief"><p class="eyebrow">${tr('REFLECT · UNDERSTAND · TRY AGAIN','راجع · افهم · أعد التدريب')}</p><h1>${tr('Your clinical decisions','قراراتك السريرية')}</h1><p>${s.complete?tr('Both skills were completed, including the final handwash.','اكتملت المهارتان بما فيها غسل اليدين النهائي.'):tr('The attempt ended before the full two-skill cycle was complete.','انتهت المحاولة قبل اكتمال دورة المهارتين.')} ${tr('No percentage score — the aim is to understand what happened and why.','لا توجد نسبة مئوية؛ الهدف فهم ما حدث ولماذا.')}</p><div class="debrief-grid">${groups.map(([title,type])=>{let unique=[...new Map(events.filter(e=>e.type===type).map(e=>[e.action,e])).values()];return `<article><h3>${title}</h3><ul>${unique.length?unique.map(e=>`<li><b>${esc(e.action)}</b>${e.why?' — '+esc(e.why):''}</li>`).join(''):`<li>${tr('No observations recorded in this category.','لا توجد ملاحظات مسجلة في هذه الفئة.')}</li>`}</ul></article>`;}).join('')}<article><h3>${tr('Rationale understanding','فهم التعليل')}</h3><p>${tr('Actions alone do not prove understanding. Write one short reason in your own words.','الحركات وحدها لا تثبت الفهم. اكتب سببًا مختصرًا بكلماتك.')}</p><label>${tr('Why must bare fingers avoid the used glove exterior?','لماذا يجب ألا تلمس الأصابع العارية السطح الخارجي المستخدم للقفاز؟')}<textarea id="debriefReflection" rows="3"></textarea></label><button id="saveReflection">${tr('Save my explanation','احفظ إجابتي')}</button>${rationale.map(x=>`<p class="saved-reflection">${esc(x)}</p>`).join('')}</article></div>${events.filter(e=>e.type==='contamination').map(e=>`<div class="chain"><p><b>${tr('Your action','إجراءك')}:</b> ${esc(e.action)}</p><p>↓ <b>${tr('What happened','ما حدث')}:</b> ${tr('Simulated contamination transferred at the contact point.','انتقل التلوث المحاكى عند نقطة التلامس.')}</p><p>↓ <b>${tr('Why','السبب')}:</b> ${esc(e.why)}</p></div>`).join('')}<h2>${tr('Targeted retraining','إعادة تدريب مستهدفة')}</h2><div class="actions"><button data-retry="wash">${tr('Handwashing movements','حركات غسل اليدين')}</button><button data-retry="faucet">${tr('Final faucet movement','إغلاق الصنبور')}</button><button data-retry="removal">${tr('Glove removal only','نزع القفازات فقط')}</button><button id="independent" class="primary">${tr('Do it yourself →','نفّذ بنفسك ←')}</button></div></section>`;
 app.querySelectorAll('[data-retry]').forEach(b=>b.onclick=()=>{const kind=b.dataset.retry;if(kind==='wash'){s=fresh('practice');s.watch=false;s.water=true;s.wet=true;s.soap=true;station='sink';stage=2;frictionActive=true;frictionIndex=0;frictionStrokes=0;}else{s=checkpoint(kind,'practice',events);station=kind==='removal'?'gloves':'sink';stage=2;}returnDebrief=true;render();});
 $('#independent').onclick=()=>setStage(3);$('#saveReflection').onclick=()=>{let v=$('#debriefReflection').value.trim();if(v){rationale.push(v);save();renderDebrief();}};save();
}

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvent=e;$('#install').hidden=false;});
$('#install').onclick=async()=>{if(installEvent){await installEvent.prompt();installEvent=null;$('#install').hidden=true;}};
if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').then(async()=>{await navigator.serviceWorker.ready;const names=await caches.keys();$('#offline').textContent=names.some(n=>n.startsWith('tobruk-skills360-v2-'))?tr('Ready offline','جاهز دون إنترنت'):tr('Open once online','افتحه مرة عبر الإنترنت');}).catch(()=>$('#offline').textContent=tr('Offline setup unavailable','تعذر إعداد العمل دون إنترنت'));}
try{let p=JSON.parse(localStorage.getItem('tobruk-skills360-v2'));if(p&&p.s){stage=p.stage??0;lesson=p.lesson??0;s=p.s;station=p.station||'room';rationale=p.rationale||[];lang=p.lang||lang;}}catch{}
if(stage===0)setupLesson();headerText();render();
