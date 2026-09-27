(()=>{
const DATA=window.ENGLISH2_DATA;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const state={
  lang:localStorage.getItem('e2lang')||'en',
  current:null,
  last:localStorage.getItem('e2last')||'wound'
};
const done=JSON.parse(localStorage.getItem('e2done')||'{}');
const notes=JSON.parse(localStorage.getItem('e2notes')||'{}');

function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function lessonById(id){return DATA.lessons.find(l=>l.id===id)}
function setAccent(l){document.documentElement.style.setProperty('--accent',l?.accent||'#0f5f8f');document.documentElement.style.setProperty('--accentLight',l?.light||'#eaf4fa')}
function mark(key){done[key]=true;localStorage.setItem('e2done',JSON.stringify(done));refreshProgress()}
function lessonScore(l){const keys=l.quiz.map((_,i)=>l.id+':q'+i).concat([l.id+':spot',l.id+':scenario']);return Math.round(keys.filter(k=>done[k]).length/keys.length*100)}
function overall(){return Math.round(DATA.lessons.reduce((a,l)=>a+lessonScore(l),0)/DATA.lessons.length)}
function rights(){return '<div class="panelMark">© 2026 Faculty of Nursing · Tobruk University <span>كلية التمريض · جامعة طبرق</span></div>'}
function speak(text){if(!('speechSynthesis' in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-GB';u.rate=.88;const vs=speechSynthesis.getVoices();u.voice=vs.find(v=>/^en-GB/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null;speechSynthesis.speak(u)}

function svg(name,l){
 const a=l.accent;
 if(name==='woundThree')return `<svg viewBox="0 0 760 330" aria-label="Wound observation diagram"><rect width="760" height="330" rx="22" fill="#f1c4aa"/><ellipse cx="315" cy="165" rx="150" ry="108" fill="#c86c63" opacity=".55"/><ellipse cx="315" cy="165" rx="105" ry="72" fill="#a82f35"/><path d="M235 176 C260 120 310 177 340 130 C382 104 421 163 397 205 C350 242 289 232 245 207Z" fill="#d8b548"/><circle cx="377" cy="206" r="15" fill="#f1d468"/><line x1="485" y1="65" x2="414" y2="112" stroke="${a}" stroke-width="4"/><text x="495" y="62" font-size="25" fill="#17324a" font-weight="700">Surrounding skin</text><line x1="500" y1="162" x2="409" y2="162" stroke="${a}" stroke-width="4"/><text x="510" y="158" font-size="25" fill="#17324a" font-weight="700">Wound bed</text><line x1="480" y1="265" x2="390" y2="214" stroke="${a}" stroke-width="4"/><text x="490" y="274" font-size="25" fill="#17324a" font-weight="700">Exudate</text></svg>`;
 if(name==='insulinGlucagon')return `<svg viewBox="0 0 800 320"><rect x="20" y="45" width="355" height="230" rx="24" fill="#e9f6ef" stroke="#8bc1a6"/><rect x="425" y="45" width="355" height="230" rx="24" fill="#fff0f0" stroke="#dcaaaa"/><text x="197" y="90" text-anchor="middle" font-size="33" font-weight="800" fill="#28775a">INSULIN</text><text x="602" y="90" text-anchor="middle" font-size="33" font-weight="800" fill="#a23d3d">GLUCAGON</text><circle cx="100" cy="165" r="13" fill="#3c9bd0"/><circle cx="140" cy="150" r="13" fill="#3c9bd0"/><circle cx="180" cy="175" r="13" fill="#3c9bd0"/><path d="M205 165 H295" stroke="#28775a" stroke-width="12" marker-end="url(#arrg)"/><rect x="300" y="130" width="50" height="75" rx="20" fill="#f1c7a9"/><text x="197" y="242" text-anchor="middle" font-size="26" font-weight="700" fill="#28775a">Blood glucose ↓</text><path d="M485 160 H575" stroke="#a23d3d" stroke-width="12"/><circle cx="610" cy="145" r="13" fill="#3c9bd0"/><circle cx="650" cy="170" r="13" fill="#3c9bd0"/><circle cx="690" cy="150" r="13" fill="#3c9bd0"/><path d="M500 190 Q600 250 710 190" fill="none" stroke="#c56b42" stroke-width="18"/><text x="602" y="242" text-anchor="middle" font-size="26" font-weight="700" fill="#a23d3d">Blood glucose ↑</text><defs><marker id="arrg" markerWidth="12" markerHeight="12" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#28775a"/></marker></defs></svg>`;
 if(name==='urinarySystem')return `<svg viewBox="0 0 760 340"><path d="M220 65 C155 85 150 195 205 215 C240 229 275 205 275 160 C275 110 260 75 220 65Z" fill="#b95a5a"/><path d="M540 65 C605 85 610 195 555 215 C520 229 485 205 485 160 C485 110 500 75 540 65Z" fill="#b95a5a"/><path d="M250 190 C270 230 300 250 325 282" fill="none" stroke="#e1b16c" stroke-width="13"/><path d="M510 190 C490 230 460 250 435 282" fill="none" stroke="#e1b16c" stroke-width="13"/><ellipse cx="380" cy="288" rx="75" ry="39" fill="#e5a06e"/><path d="M380 326 v30" stroke="#d49465" stroke-width="12"/><text x="205" y="45" font-size="24" font-weight="700" fill="${a}">Kidney</text><text x="520" y="45" font-size="24" font-weight="700" fill="${a}">Kidney</text><text x="285" y="250" font-size="22" fill="#17324a">Ureters</text><text x="350" y="286" font-size="22" fill="#17324a">Bladder</text></svg>`;
 if(name==='fiveRights')return `<svg viewBox="0 0 800 390"><circle cx="400" cy="195" r="82" fill="${l.light}" stroke="${a}" stroke-width="5"/><text x="400" y="184" text-anchor="middle" font-size="24" font-weight="800" fill="${a}">MEDICATION</text><text x="400" y="216" text-anchor="middle" font-size="24" font-weight="800" fill="${a}">CHECK</text>${[['Drug',400,50],['Patient',650,130],['Dose',560,330],['Route',240,330],['Time',150,130]].map((x,i)=>`<line x1="400" y1="195" x2="${x[1]}" y2="${x[2]}" stroke="#aac4d3" stroke-width="4"/><circle cx="${x[1]}" cy="${x[2]}" r="58" fill="#fff" stroke="${a}" stroke-width="4"/><text x="${x[1]}" y="${x[2]+7}" text-anchor="middle" font-size="22" font-weight="800" fill="${a}">${x[0]}</text>`).join('')}</svg>`;
 if(name==='interactionWeb')return `<svg viewBox="0 0 800 390"><rect x="300" y="130" width="200" height="100" rx="20" fill="${l.light}" stroke="${a}" stroke-width="4"/><text x="400" y="190" text-anchor="middle" font-size="28" font-weight="800" fill="${a}">Atorvastatin</text>${[['Other medicines',130,80],['Warfarin',660,80],['Alcohol',130,305],['Grapefruit juice',660,305],['Monitoring',400,330]].map(x=>`<line x1="400" y1="180" x2="${x[1]}" y2="${x[2]}" stroke="#9bb9c8" stroke-width="4"/><rect x="${x[1]-90}" y="${x[2]-35}" width="180" height="70" rx="14" fill="#fff" stroke="#c9dbe5"/><text x="${x[1]}" y="${x[2]+7}" text-anchor="middle" font-size="20" font-weight="700" fill="#17324a">${x[0]}</text>`).join('')}</svg>`;
 if(name==='cannulaSite')return `<svg viewBox="0 0 800 330"><path d="M80 180 Q260 95 450 175 T730 160" fill="none" stroke="#efb99c" stroke-width="80" stroke-linecap="round"/><rect x="320" y="125" width="120" height="48" rx="20" fill="#dceef7" stroke="${a}" stroke-width="4"/><path d="M440 150 H565" stroke="#8bb4ca" stroke-width="10"/><ellipse cx="390" cy="170" rx="90" ry="55" fill="#df6c6c" opacity=".35"/><text x="160" y="65" font-size="23" font-weight="700" fill="#17324a">Check for:</text><text x="160" y="95" font-size="21" fill="#17324a">redness · pain/tenderness · swelling · leakage</text><text x="485" y="250" font-size="21" fill="#17324a">Use the finding + context, not a label alone.</text></svg>`;
 if(name==='fluidBalance')return `<svg viewBox="0 0 800 350"><rect x="70" y="65" width="260" height="210" rx="20" fill="#e9f7fb" stroke="#8fc5d6"/><rect x="470" y="65" width="260" height="210" rx="20" fill="#fff5e7" stroke="#d7bb78"/><text x="200" y="110" text-anchor="middle" font-size="30" font-weight="800" fill="#2389a8">INTAKE</text><text x="600" y="110" text-anchor="middle" font-size="30" font-weight="800" fill="#9a6a21">OUTPUT</text><text x="200" y="165" text-anchor="middle" font-size="22" fill="#17324a">oral fluids</text><text x="200" y="205" text-anchor="middle" font-size="22" fill="#17324a">IV fluids</text><text x="600" y="165" text-anchor="middle" font-size="22" fill="#17324a">urine</text><text x="600" y="205" text-anchor="middle" font-size="22" fill="#17324a">other measured loss</text><path d="M350 170 H450" stroke="${a}" stroke-width="8"/><text x="400" y="315" text-anchor="middle" font-size="25" font-weight="700" fill="${a}">Measure · record · compare</text></svg>`;
 return '<svg viewBox="0 0 600 200"><rect width="600" height="200" rx="20" fill="'+l.light+'"/><text x="300" y="110" text-anchor="middle" font-size="28" font-weight="800" fill="'+a+'">Clinical learning visual</text></svg>';
}
function panelSection(s,l,idx){
 const tr='<button class="btn soft sectionTranslate" type="button">عربي</button>';
 let inner='';
 if(s.type==='concept'||s.type==='tip'||s.type==='language'){
   inner='<p>'+esc(s.body)+'</p><div class="arBlock">'+esc(s.arBody||s.arNote||'')+'</div>';
 } else if(s.type==='visual'){
   inner='<div class="visualBox">'+svg(s.visual,l)+'</div><p>'+esc(s.body||'')+'</p><div class="arBlock">'+esc(s.arBody||'')+'</div>';
 } else if(s.type==='terms'){
   inner='<div class="termGrid">'+s.terms.map(t=>'<div class="term"><strong>'+esc(t[0])+'</strong><span>'+esc(t[1])+'</span><button class="speak" data-speak="'+esc(t[0]+'. '+t[1])+'" aria-label="Read English">🔊</button><div class="termAr">'+esc(t[2])+'</div></div>').join('')+'</div>';
 } else if(s.type==='table'){
   inner='<div style="overflow:auto"><table class="dataTable"><thead><tr>'+s.headers.map(h=>'<th>'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+s.rows.map(r=>'<tr>'+r.map(c=>'<td>'+esc(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>'+(s.arNote?'<div class="arBlock">'+esc(s.arNote)+'</div>':'');
 } else if(s.type==='flow'){
   inner='<div class="flow">'+s.steps.map(x=>'<div class="flowStep">'+esc(x)+'</div>').join('')+'</div>'+(s.arNote?'<div class="arBlock">'+esc(s.arNote)+'</div>':'');
 } else if(s.type==='cards'){
   inner='<div class="cards">'+s.cards.map(c=>'<div class="miniCard"><strong>'+esc(c[0])+'</strong><div>'+esc(c[1])+'</div></div>').join('')+'</div>'+(s.arNote?'<div class="arBlock">'+esc(s.arNote)+'</div>':'');
 } else if(s.type==='compare'){
   inner='<div class="compare"><table class="dataTable"><thead><tr><th>Finding</th><th>'+esc(s.leftTitle)+'</th><th>'+esc(s.rightTitle)+'</th></tr></thead><tbody>'+s.pairs.map(r=>'<tr>'+r.map(c=>'<td>'+esc(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>'+(s.arNote?'<div class="arBlock">'+esc(s.arNote)+'</div>':'');
 }
 return '<section class="panel '+esc(s.type)+'" id="sec-'+idx+'"><div class="kicker">Lesson '+l.number+'</div><div style="display:flex;justify-content:space-between;gap:8px;align-items:start"><h2>'+esc(s.title)+'</h2>'+tr+'</div><div class="arBlock">'+esc(s.ar||'')+'</div>'+inner+rights()+'</section>';
}
function quizHTML(l){
 return '<section class="quizCard" id="quiz"><div class="kicker">Interactive check</div><h3>Test your understanding</h3>'+l.quiz.map((q,i)=>'<div class="qitem" data-q="'+i+'"><b>'+(i+1)+'. '+esc(q.q)+'</b><div>'+q.choices.map((c,ci)=>'<label class="choice"><input type="radio" name="'+l.id+'q'+i+'" value="'+ci+'">'+esc(c)+'</label>').join('')+'</div><button class="btn checkQ" data-i="'+i+'">Check</button><div class="feedback" id="fb-'+l.id+'-'+i+'"></div></div>').join('')+rights()+'</section>';
}
function challengeHTML(l){
 return '<section class="panel challenge" id="spot"><div class="kicker">Spot what is wrong</div><h2>'+esc(l.spot.title)+'</h2><div class="promptBox">'+esc(l.spot.body)+'</div><button class="btn reveal" data-target="spotAns">Reveal reasoning</button><div class="answerBox" id="spotAns">'+esc(l.spot.answer)+'<div class="arBlock">'+esc(l.spot.ar)+'</div></div>'+rights()+'</section>';
}
function scenarioHTML(l){
 return '<section class="panel scenario" id="scenario"><div class="kicker">Decision point</div><h2>'+esc(l.scenario.title)+'</h2><p>'+esc(l.scenario.body)+'</p><div>'+l.scenario.choices.map((c,i)=>'<label class="choice"><input type="radio" name="'+l.id+'scenario" value="'+i+'">'+esc(c)+'</label>').join('')+'</div><button class="btn checkScenario">Check decision</button><div class="feedback" id="scenarioFb"></div><div class="arBlock">'+esc(l.scenario.ar)+'</div>'+rights()+'</section>';
}
function finalCaseHTML(l){
 return '<section class="panel finalCase" id="final"><div class="kicker">Final case</div><h2>Put the lesson together</h2><div class="promptBox">'+esc(l.finalCase)+'</div><div class="writeLines">'+Array.from({length:5},()=>'<span></span>').join('')+'</div>'+rights()+'</section>';
}

function home(){
 state.current=null;setAccent(null);document.body.classList.toggle('arabic-on',state.lang==='ar');
 const pct=overall(),complete=DATA.lessons.filter(l=>lessonScore(l)===100).length;
 $('#app').innerHTML=`
 <div class="institution">${esc(DATA.course.institution)} &nbsp;|&nbsp; ${esc(DATA.course.institutionAr)}<small>© 2026 · Free educational use and sharing with visible attribution</small></div>
 <section class="hero">
  <div class="eyebrow">Faculty of Nursing · Tobruk University</div>
  <h1>${esc(DATA.course.title)}</h1><p>${esc(DATA.course.subtitle)}</p>
  <div class="heroAr"><b>${esc(DATA.course.titleAr)}</b><br>${esc(DATA.course.subtitleAr)}</div>
  <div class="heroActions"><button class="btn primary" id="continueBtn">Continue learning</button><button class="btn" id="challengeBtn">Mixed challenge</button><button class="btn" id="termsBtn">Terminology bank</button></div>
 </section>
 <div class="courseStats"><div class="stat"><b>5</b><span>rich clinical lessons</span></div><div class="stat"><b>${complete}/5</b><span>lessons mastered</span></div><div class="stat"><b>${pct}%</b><span>interactive progress</span></div><div class="stat"><b>Offline</b><span>notes + study coach</span></div></div>
 <div class="sectionTitle"><div><h2>Your lessons</h2><p>Choose a clinical topic and study at your own pace.</p></div></div>
 <div class="lessonGrid">${DATA.lessons.map(l=>`<article class="lessonCard" style="--cardAccent:${l.accent}" data-open="${l.id}"><div class="lessonNum"><span>LESSON 0${l.number}</span><span class="lessonIcon">${l.icon}</span></div><h3>${esc(l.title)}</h3><p>${esc(l.subtitle)}</p><div class="arMini"><b>${esc(l.titleAr)}</b><br>${esc(l.subtitleAr)}</div><div class="cardProgress"><div class="bar"><span style="width:${lessonScore(l)}%"></span></div><div class="progressLabel"><span>Progress</span><span>${lessonScore(l)}%</span></div></div><button class="btn primary openLesson">Open lesson</button></article>`).join('')}</div>
 <div class="courseTools" id="tools">
  <section class="toolCard"><h3>Terminology bank</h3><p>Search terms from all five lessons. Arabic appears when bilingual mode is on.</p><div class="termSearch"><input id="termSearch" placeholder="Try: exudate, INR, oliguria, KVO..."><button class="btn" id="clearSearch">Clear</button></div><div class="termResults" id="termResults"></div></section>
  <section class="toolCard"><h3>Study principle</h3><p>English is the vehicle. Observation, classification, comparison, error detection and clinical reasoning are the real learning skills.</p></section>
  <section class="toolCard"><h3>Audio policy</h3><p>Publisher audio is not embedded. 🔊 buttons use the device's English text-to-speech voice for selected terms.</p></section>
 </div>
 <div class="rights"><b>Faculty of Nursing · Tobruk University</b><br>Free for educational use, sharing and adaptation with attribution. No Cambridge/publisher audio is redistributed.</div>`;
 bindHome();renderTermResults('');
}
function bindHome(){
 $$('.lessonCard').forEach(c=>c.addEventListener('click',e=>{if(e.target.closest('button')||e.currentTarget===e.target||e.target.closest('.lessonCard'))openLesson(c.dataset.open)}));
 $('#continueBtn').onclick=()=>openLesson(state.last||'wound');
 $('#challengeBtn').onclick=()=>location.hash='challenge';
 $('#termsBtn').onclick=()=>$('#tools').scrollIntoView({behavior:'smooth'});
 $('#termSearch').oninput=e=>renderTermResults(e.target.value);
 $('#clearSearch').onclick=()=>{$('#termSearch').value='';renderTermResults('')};
}
function renderTermResults(q){
 const out=[];const nq=q.trim().toLowerCase();
 DATA.lessons.forEach(l=>l.sections.filter(s=>s.type==='terms').forEach(s=>s.terms.forEach(t=>{if(!nq||t.join(' ').toLowerCase().includes(nq))out.push({l,t})})));
 $('#termResults').innerHTML=(out.slice(0,40).map(x=>'<div class="termHit"><strong>'+esc(x.t[0])+'</strong> — '+esc(x.t[1])+'<small>Lesson '+x.l.number+' · '+esc(x.l.title)+'</small><div class="arHit">'+esc(x.t[2])+'</div></div>').join('')||'<div class="small">No matching term.</div>');
}
function openLesson(id){state.last=id;localStorage.setItem('e2last',id);location.hash=id}
function lesson(id){
 const l=lessonById(id);if(!l){home();return}state.current=id;setAccent(l);document.body.classList.toggle('arabic-on',state.lang==='ar');
 $('#app').innerHTML=`
 <div class="institution">${esc(DATA.course.institution)} &nbsp;|&nbsp; ${esc(DATA.course.institutionAr)}<small>© 2026 · Free educational use with attribution</small></div>
 <section class="lessonHero">
   <div class="crumb"><button class="btn" id="homeBtn">← Course home</button> &nbsp; Lesson 0${l.number}</div>
   <h1>${l.icon} ${esc(l.title)}</h1><p>${esc(l.subtitle)}</p>
   <div class="arLesson"><b>${esc(l.titleAr)}</b><br>${esc(l.subtitleAr)}</div>
   <div class="heroMeta"><span class="chip">${lessonScore(l)}% interactive progress</span><span class="chip">Bilingual help</span><span class="chip">Offline notes</span><span class="chip">Study coach</span></div>
 </section>
 <div class="lessonLayout">
  <main class="lessonMain">
   <section class="panel"><div class="kicker">Learning outcomes</div><h2>What you should be able to do</h2><div class="outcomes">${l.outcomes.map((x,i)=>'<div class="outcome"><b>'+(i+1)+'.</b> '+esc(x)+'</div>').join('')}</div>${rights()}</section>
   ${l.sections.map((s,i)=>panelSection(s,l,i)).join('')}
   ${quizHTML(l)}
   ${challengeHTML(l)}
   ${scenarioHTML(l)}
   ${finalCaseHTML(l)}
   <section class="panel notes" id="notesMain"><div class="kicker">Your study space</div><h2>My notes / translation</h2><p class="small">Saved only on this device.</p><textarea id="notesBox" placeholder="My notes..."></textarea><div class="saveState" id="saveState">Saved locally.</div>${rights()}</section>
   <div class="lessonNav"><button class="btn" id="prevLesson">← Previous</button><button class="btn primary" id="nextLesson">Next lesson →</button></div>
  </main>
  <aside class="side">
   <section class="studyCard"><h3>Lesson map</h3><div class="jump">${l.sections.map((s,i)=>'<button data-jump="sec-'+i+'">'+(i+1)+'. '+esc(s.title)+'</button>').join('')}<button data-jump="quiz">Interactive check</button><button data-jump="spot">Spot what is wrong</button><button data-jump="scenario">What would you do?</button><button data-jump="final">Final case</button></div></section>
   <section class="studyCard"><h3>Progress</h3><div class="bar"><span id="lessonBar" style="width:${lessonScore(l)}%"></span></div><div class="progressLabel"><span>Interactive tasks</span><span id="lessonPct">${lessonScore(l)}%</span></div></section>
   <section class="studyCard notes"><h3>Quick notes</h3><textarea id="sideNotes" placeholder="A memory trick, translation, question..."></textarea><div class="saveState">Auto-saved</div></section>
   <section class="studyCard" id="coach"><h3>Offline Study Coach</h3><p class="small">Ask about this lesson. Answers come from built-in lesson content, not the internet.</p><div class="chatlog" id="chatlog"><div class="msg bot">Ask me about a term, chart, comparison, or how to organize the information.</div></div><div class="suggests"><button data-ask="Explain the key terms">Key terms</button><button data-ask="What should I notice first?">What matters?</button><button data-ask="ترجم المصطلحات">ترجم المصطلحات</button></div><div class="chatrow"><input id="chatInput" placeholder="Ask a study question..."><button class="btn primary" id="askBtn">Ask</button></div></section>
  </aside>
 </div>
 <div class="rights"><b>Faculty of Nursing · Tobruk University</b><br>Lesson source foundation: Cambridge English for Nursing Intermediate Plus, Unit ${l.number+2}. Content reorganized for learning. No publisher audio embedded.</div>`;
 bindLesson(l);
}
function bindLesson(l){
 $('#homeBtn').onclick=()=>{location.hash=''};
 $$('.speak').forEach(b=>b.onclick=()=>speak(b.dataset.speak));
 $$('.sectionTranslate').forEach(b=>b.onclick=()=>{const p=b.closest('.panel');p.querySelectorAll(':scope .arBlock,:scope .termAr').forEach(x=>x.style.display=x.style.display==='block'?'':'block')});
 $$('.jump button').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.jump)?.scrollIntoView({behavior:'smooth',block:'start'}));
 $$('.checkQ').forEach(b=>b.onclick=()=>checkQ(l,+b.dataset.i));
 $$('.reveal').forEach(b=>b.onclick=()=>{document.getElementById(b.dataset.target).classList.toggle('show');mark(l.id+':spot')});
 $('.checkScenario').onclick=()=>checkScenario(l);
 const save=(v)=>{notes[l.id]=v;localStorage.setItem('e2notes',JSON.stringify(notes));$('#notesBox').value=v;$('#sideNotes').value=v};
 $('#notesBox').value=$('#sideNotes').value=notes[l.id]||'';let timer;
 ['#notesBox','#sideNotes'].forEach(sel=>$(sel).oninput=e=>{clearTimeout(timer);timer=setTimeout(()=>save(e.target.value),250)});
 $('#prevLesson').onclick=()=>{const i=DATA.lessons.findIndex(x=>x.id===l.id);if(i>0)openLesson(DATA.lessons[i-1].id);else location.hash=''};
 $('#nextLesson').onclick=()=>{const i=DATA.lessons.findIndex(x=>x.id===l.id);if(i<DATA.lessons.length-1)openLesson(DATA.lessons[i+1].id);else location.hash='challenge'};
 $$('.suggests button').forEach(b=>b.onclick=()=>askCoach(l,b.dataset.ask));
 $('#askBtn').onclick=()=>askCoach(l,$('#chatInput').value);
 $('#chatInput').onkeydown=e=>{if(e.key==='Enter')askCoach(l,e.target.value)};
}
function checkQ(l,i){
 const q=l.quiz[i],sel=document.querySelector('input[name="'+l.id+'q'+i+'"]:checked'),fb=$('#fb-'+l.id+'-'+i);
 if(!sel){fb.className='feedback show bad';fb.textContent='Choose an answer first.';return}
 const ok=+sel.value===q.a;fb.className='feedback show '+(ok?'good':'bad');fb.textContent=(ok?'Correct. ':'Try again. ')+q.ex;if(ok)mark(l.id+':q'+i)
}
function checkScenario(l){
 const sel=document.querySelector('input[name="'+l.id+'scenario"]:checked'),fb=$('#scenarioFb');
 if(!sel){fb.className='feedback show bad';fb.textContent='Choose a response first.';return}
 const ok=+sel.value===l.scenario.a;fb.className='feedback show '+(ok?'good':'bad');fb.textContent=(ok?'Good decision. ':'Reconsider. ')+l.scenario.why;if(ok)mark(l.id+':scenario')
}
function refreshProgress(){
 if(state.current){const l=lessonById(state.current),p=lessonScore(l);if($('#lessonBar'))$('#lessonBar').style.width=p+'%';if($('#lessonPct'))$('#lessonPct').textContent=p+'%'}
}
function lessonKnowledge(l){
 const kb=[];l.sections.forEach(s=>{
   if(s.type==='terms')s.terms.forEach(t=>kb.push({keys:[t[0],t[1],t[2]],en:t[0]+': '+t[1]+'.',ar:t[0]+' = '+t[2]}));
   if(s.body)kb.push({keys:[s.title,s.body],en:s.body,ar:s.arBody||s.arNote||s.ar||''});
   if(s.arNote)kb.push({keys:[s.title,s.arNote],en:s.body||s.arNote,ar:s.arNote});
 });return kb
}
function askCoach(l,q){
 q=(q||'').trim();if(!q)return;addMsg(q,'user');const nq=q.toLowerCase();let best=null,score=0;
 lessonKnowledge(l).forEach(k=>{let s=0;k.keys.forEach(x=>{String(x).toLowerCase().split(/\s+/).forEach(w=>{if(w.length>3&&nq.includes(w))s++})});if(s>score){score=s;best=k}});
 if(nq.includes('key term')||nq.includes('مصطلح')){const ts=l.sections.find(s=>s.type==='terms')?.terms||[];best={en:'Key terms: '+ts.slice(0,8).map(t=>t[0]).join(', ')+'.',ar:'المصطلحات الأساسية: '+ts.slice(0,8).map(t=>t[0]+' = '+t[2]).join('؛ ')+'.'}}
 if(nq.includes('notice')||nq.includes('matter')||nq.includes('أهم'))best={en:'Start by organizing the information into categories, then look for change, missing data, contradictions and what needs follow-up.',ar:'ابدأ بتنظيم المعلومات إلى فئات، ثم ابحث عن التغير والمعلومات الناقصة والتناقضات وما يحتاج متابعة.'}
 if(nq.includes('ترجم')){const ts=l.sections.find(s=>s.type==='terms')?.terms||[];best={en:'Here are the built-in lesson translations.',ar:ts.slice(0,10).map(t=>t[0]+' = '+t[2]).join('؛ ')+'.'}}
 if(!best)best={en:'I can help with the built-in terms, charts, comparison tasks, error spotting and final case for this lesson. Try naming a term or asking what information matters.',ar:'يمكنني المساعدة في مصطلحات الدرس والجداول والمقارنة واكتشاف الأخطاء والحالة النهائية. اذكر المصطلح أو اسأل ما المعلومات المهمة.'}
 const isAr=/[\u0600-\u06ff]/.test(q);if(isAr){addMsg(best.ar||best.en,'bot');addMsg(best.en,'bot')}else{addMsg(best.en,'bot');if(state.lang==='ar'&&best.ar)addMsg(best.ar,'bot')}$('#chatInput').value=''
}
function addMsg(text,who){const d=document.createElement('div');d.className='msg '+who;d.textContent=text;$('#chatlog').appendChild(d);$('#chatlog').scrollTop=99999}

function challenge(){
 setAccent(null);state.current=null;const pool=[];DATA.lessons.forEach(l=>l.quiz.forEach(q=>pool.push({l,q})));pool.sort(()=>.5-Math.random());const qs=pool.slice(0,8);
 $('#app').innerHTML='<div class="institution">'+esc(DATA.course.institution)+' &nbsp;|&nbsp; '+esc(DATA.course.institutionAr)+'</div><section class="hero"><div class="eyebrow">Mixed Challenge</div><h1>Five lessons · one brain workout</h1><p>Use what you learned across wound care, diabetes, specimens, medications and IV therapy.</p><div class="heroAr">تحدٍ مختلط من الدروس الخمسة.</div><div class="heroActions"><button class="btn primary" id="challengeHome">Course home</button></div></section><section class="quizCard" style="margin-top:16px"><h3>Mixed clinical-language challenge</h3>'+qs.map((x,i)=>'<div class="qitem"><small>Lesson '+x.l.number+' · '+esc(x.l.title)+'</small><b style="display:block">'+(i+1)+'. '+esc(x.q.q)+'</b>'+x.q.choices.map((c,ci)=>'<label class="choice"><input type="radio" name="mix'+i+'" value="'+ci+'">'+esc(c)+'</label>').join('')+'<button class="btn mixCheck" data-i="'+i+'">Check</button><div class="feedback" id="mixfb'+i+'"></div></div>').join('')+'</section><div class="rights"><b>Faculty of Nursing · Tobruk University</b></div>';
 $('#challengeHome').onclick=()=>location.hash='';
 $$('.mixCheck').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,sel=document.querySelector('input[name="mix'+i+'"]:checked'),fb=$('#mixfb'+i);if(!sel){fb.className='feedback show bad';fb.textContent='Choose an answer first.';return}const ok=+sel.value===qs[i].q.a;fb.className='feedback show '+(ok?'good':'bad');fb.textContent=(ok?'Correct. ':'Try again. ')+qs[i].q.ex});
}
function route(){const h=decodeURIComponent(location.hash.slice(1));if(h==='challenge')challenge();else if(lessonById(h))lesson(h);else home()}
function toggleLang(){state.lang=state.lang==='en'?'ar':'en';localStorage.setItem('e2lang',state.lang);document.body.classList.toggle('arabic-on',state.lang==='ar');$('#langBtn').classList.toggle('active',state.lang==='ar')}
function init(){
 $('#langBtn').onclick=toggleLang;$('#homeTopBtn').onclick=()=>{location.hash=''};document.body.classList.toggle('arabic-on',state.lang==='ar');$('#langBtn').classList.toggle('active',state.lang==='ar');window.addEventListener('hashchange',route);route()
}
init();
})();