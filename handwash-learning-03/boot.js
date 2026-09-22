'use strict';
(async()=>{
  const asset=name=>new URL(name,location.href).href;
  async function text(name){const r=await fetch(asset(name));if(!r.ok)throw new Error(name+' ('+r.status+')');return r.text();}
  try{
    const [html,base,css,lessons,qa,qb,suite,logosText]=await Promise.all(['base.html','base.js','ui.css','lessons.json','questions-a.json','questions-b.json','suite.js','logos.json'].map(text));
    const data=JSON.parse(lessons);data.QUESTIONS=[...JSON.parse(qa),...JSON.parse(qb)];
    if(data.QUESTIONS.length!==24||data.LESSONS.length!==12)throw new Error('Incomplete learning content');
    let code=base;
    function change(before,after){if(!code.includes(before))throw new Error('Could not assemble learning version: '+before.slice(0,45));code=code.replace(before,after);}
    change("function render(t,dt){let stage", "function render(t,dt){if(W<1||H<1)return;let stage");
    change("if(stage===7||stage===8)","if(stage===7||stage===7.5||stage===8)");
    change("keys=new Set(),lastTime=0", "keys=new Set(),lastRenderTime=-1,lastTime=0");
    change("function fresh(){return {stage:0", "function fresh(){return {nailsInspected:false,nailTool:false,nailsDone:false,nailProgress:0,nailOffset:0,disposed:false,stage:0");
    change("{stage:5},{stage:6},{stage:7}];", "{stage:4.5},{stage:5},{stage:6},{stage:7}];");
    change("s.dry>=4,s.closedSafely];", "s.dry>=4,s.closedSafely,s.nailsDone,s.disposed];");
    change("function renderResult(){", "function renderResultCore(){");
    change("ok=missing.length===0&&a.every(Boolean);", "ok=missing.length===0&&a.every(Boolean)&&s.issues.length===0;");
    change("${a.filter(Boolean).length} / 7", "${a.filter(Boolean).length} / 9");
    code=code.replace(/function notes\(\)\{[\s\S]*?(?=function updateUI\(\))/,'');
    change("function updateUI(){", "function updateCoreUI(){");
    change(":q.head[s.stage];", ":(q.head[s.stage]||'');");
    change(":q.hints[s.stage];", ":(q.hints[s.stage]||'');");
    change("$('tap').onclick=()=>{if(mode==='learn'||s.stage===8)return;", "$('tap').onclick=()=>{if(mode==='learn'||s.stage>=7.5)return;");
    code=code.replaceAll("s.x=.5;s.y=.86;setStage(5);", "enterNails();");
    change("if(s.closeAnim===0)finish();", "if(s.closeAnim===0)setStage(7.5);");
    change("lastTime=time;if(!document.hidden){", "lastTime=time;if(!document.hidden&&(!suiteReady||suiteView==='sim')){");
    change("water(mode==='learn'?demoTime:time);render(mode==='learn'?demoTime:time,mode==='learn'&&!playing?0:dt);", "if(time-lastRenderTime>=.032){let rdt=lastRenderTime<0?dt:Math.min(.10,time-lastRenderTime);lastRenderTime=time;water(mode==='learn'?demoTime:time);render(mode==='learn'?demoTime:time,mode==='learn'&&!playing?0:rdt);}");
    code=code.replace(/else if\(key.startsWith\('nails'\)\)\{[^\n]+/,m=>m.replace(/\[tid\]/g,'[TMP]').replace(/\[gid\]/g,'[tid]').replace(/\[TMP\]/g,'[gid]'));
    change("const pageClone=", "const LEARNING_DATA="+JSON.stringify(data)+";\n"+suite+"\nconst pageClone=");
    change("a.download='Tobruk-Handwash-Nano-02.html';", "a.download='Tobruk-Handwash-Learning-03-Branded.html';");
    change("return MOVES.map(x=>({id:x.id,seconds:x.seconds}));}};", "return MOVES.map(x=>({id:x.id,seconds:x.seconds}));},get learning(){return {view:suiteView,quiz:JSON.parse(JSON.stringify(quiz)),lesson:guideTopic,score:quiz.ids.length?scoreQuiz():null};}};");
    change("reset();resize();", "reset();installSuite();resize();");
    const doc=new DOMParser().parseFromString(html,'text/html');
    doc.querySelectorAll('script').forEach(x=>x.remove());
    doc.title='Handwashing · Learn, Train & Practise | Tobruk Nursing';
    const st=doc.createElement('style');st.textContent=css;doc.head.append(st);
    const header=doc.querySelector('header'),brand=doc.getElementById('brand'),title=doc.querySelector('.title'),tools=doc.querySelector('.tools');
    const strip=doc.createElement('div');strip.className='institution-strip';strip.setAttribute('aria-label','Tobruk University · Faculty of Nursing | جامعة طبرق · كلية التمريض');
    const logos=JSON.parse(logosText);
    function logo(i,alt,cls){const im=doc.createElement('img');im.src=logos[i];im.alt=alt;im.className='institution-logo '+cls;im.width=88;im.height=88;im.draggable=false;return im;}
    const name=doc.createElement('div');name.className='institution-name';name.innerHTML='<div class="institution-name-ar" lang="ar" dir="rtl">جامعة طبرق · كلية التمريض</div>';name.append(brand);name.insertAdjacentHTML('beforeend','<div class="brand institution-name-en" lang="en" dir="ltr">FACULTY OF NURSING · TOBRUK UNIVERSITY</div>');
    strip.append(logo(0,'Tobruk University — جامعة طبرق','university-logo'),name,logo(1,'Faculty of Nursing — كلية التمريض','faculty-logo'));
    const row=doc.createElement('div');row.className='app-title-row';row.append(title,tools);header.replaceChildren(strip,row);header.className='branded-header';doc.querySelector('.nano').textContent='LEARNING / 03';
    const nav=doc.querySelector('.modes');nav.insertAdjacentHTML('beforeend','<button id="writtenTab">Written test</button><button id="guideTab" class="textButton">Step guide</button>');
    const main=doc.querySelector('main'),notes=doc.getElementById('notes'),sim=doc.createElement('section');sim.id='simView';main.insertBefore(sim,doc.getElementById('steps'));while(sim.nextSibling&&sim.nextSibling!==notes)sim.append(sim.nextSibling);
    const reason=doc.createElement('section');reason.id='reasonPanel';doc.getElementById('resultBox').before(reason);
    for(const id of ['guideView','writtenView']){const el=doc.createElement('section');el.id=id;el.className='learningPanel';el.hidden=true;main.insertBefore(el,notes);}
    doc.getElementById('scene').insertAdjacentHTML('beforeend',`<div hidden id="nailPanel"><div id="nailSub"></div><div id="nailPractice" role="application" tabindex="0" aria-label="Nail-edge example. After choosing the clean tool, swipe back and forth or alternate left and right arrow keys."><svg viewBox="0 0 650 300" role="img" aria-label="Simplified side view of one free nail edge and a clean wooden stick"><path d="M55 160 Q225 137 367 156 Q427 164 437 198 Q432 231 377 242 L54 248Z" fill="#e8b083" stroke="#956449" stroke-width="3"/><path d="M65 227 Q267 214 395 224" fill="none" stroke="#d29771" stroke-width="8"/><path d="M139 157 Q270 123 411 150 Q436 154 452 165 L452 178 Q388 165 265 166 L143 170Z" fill="#fbe2cf" stroke="#b18b71" stroke-width="2.5"/><path d="M410 151 Q436 154 452 165 L452 178 Q433 172 407 170Z" fill="#fffdf4" stroke="#b18b71" stroke-width="2"/><g id="nailSpot" opacity="0"><ellipse cx="444" cy="186" rx="32" ry="24" fill="none" stroke="#a97742" stroke-dasharray="4 4" stroke-width="1.6"/><g id="nailDebris" fill="#775f3d"><ellipse cx="443" cy="184" rx="8" ry="3.5"/><ellipse cx="434" cy="181" rx="4" ry="3"/></g></g><g id="nailStick"><path d="M446 184 L599 224 Q607 229 602 237 Q600 240 593 237 L445 188 Q440 186 446 184Z" fill="#dfbf83" stroke="#8b754e" stroke-width="2"/><path d="M463 191L593 230" stroke="#f5dfb0" stroke-linecap="round" stroke-width="3"/></g><text x="265" y="65" fill="#355d50" font-size="16" text-anchor="middle" id="nailPlate">Nail plate</text><path d="M265 78V121" stroke="#8ca898"/><text x="488" y="102" fill="#355d50" font-size="16" text-anchor="middle" id="nailFree">Free nail edge</text><path d="M481 111L453 151" stroke="#8ca898"/><text x="226" y="281" fill="#75553c" font-size="15" text-anchor="middle" id="nailSkin">Skin — do not dig</text></svg></div><div id="nailStatus"></div><p id="nailCaption"></p></div>`);
    const script=doc.createElement('script');script.setAttribute('data-nano-boot','');script.textContent=code.replace(/<\/script/gi,'<\\/script');doc.body.append(script);
    document.open();document.write('<!doctype html>\n'+doc.documentElement.outerHTML);document.close();
  }catch(e){console.error(e);const box=document.getElementById('launchMessage');if(box){box.textContent='The application could not load. Check your connection and reload this page. تعذر تحميل التطبيق؛ تحقق من الاتصال ثم أعد تحميل الصفحة. '+e.message;} }
})();
