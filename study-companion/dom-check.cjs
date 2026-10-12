/* DOM integration check. Install jsdom outside the checkout and set NODE_PATH. */
const {JSDOM,ResourceLoader,VirtualConsole}=require('jsdom');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),origin='https://nourabobaker-create.github.io',prefix='/tobruk-nursing-simulation/';
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'qa-corpus.js'),'utf8'),ctx);const corpus=ctx.window.RAFEQ_CORPUS;
const delay=()=>new Promise(resolve=>setTimeout(resolve,0));
class LocalAssets extends ResourceLoader {
 fetch(url){const u=new URL(url);if(u.origin!==origin)return null;const f=path.join(root,u.pathname.slice(prefix.length));return fs.existsSync(f)&&fs.statSync(f).isFile()?Promise.resolve(fs.readFileSync(f)):null;}
}
async function open(relative,options={}){
 const errors=[],requests=[],speech=[],vc=new VirtualConsole();vc.on('jsdomError',e=>{if(!/navigation|scrollTo|stylesheet/i.test(e.message))errors.push(e.message);});
 const dom=new JSDOM(fs.readFileSync(path.join(root,relative.split(/[?#]/)[0]),'utf8'),{
  url:origin+prefix+relative,runScripts:'dangerously',resources:new LocalAssets(),pretendToBeVisual:true,virtualConsole:vc,
  beforeParse(w){w.TextEncoder=TextEncoder;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
   w.speechSynthesis={cancel(){},getVoices(){return[{lang:'ar-SA'},{lang:'en-GB'}];},speak(u){speech.push(u);u.onstart?.();queueMicrotask(()=>u.onend?.());}};
   w.fetch=async(url,init={})=>{const u=new URL(url);requests.push({url:u.href,init});
    if(u.origin===origin)return{ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,u.pathname.slice(prefix.length))))};
    if(options.translate)return options.translate(u,init);
    return{ok:true,json:async()=>({responseStatus:200,quotaFinished:false,responseData:{translatedText:'تسجل الممرضة ضغط الدم.'}})};
   };
  }
 });
 await new Promise(resolve=>dom.window.addEventListener('load',resolve,{once:true}));await delay();
 return{dom,w:dom.window,d:dom.window.document,errors,requests,speech,close:()=>dom.window.close()};
}
function route(c,en=false){if(c.year===1&&c.sem===1)return'study-companion/'+(en?'english':'index')+'.html#'+c.id;return'study-companion/'+(c.year===1?'year1-sem2':'year'+c.year)+(en?'-en':'')+'.html#'+c.id;}
function click(d,id){assert(d.getElementById(id),id);d.getElementById(id).click();}
function fill(w,id,text){const el=w.document.getElementById(id);assert(el,id);el.value=text;el.dispatchEvent(new w.Event('input',{bubbles:true}));}
let passed=0;
const pass=name=>{passed++;console.log('PASS',name);};
(async()=>{
 for(const en of [false,true])for(const c of corpus){const page=await open(route(c,en));
  try{assert.equal(page.d.querySelectorAll('.rafeq').length,1,route(c,en));assert.equal(page.d.querySelector('.rafeq').dataset.course,c.id);assert.equal(page.d.querySelector('.rafeq').dir,en?'ltr':'rtl');assert.equal(page.d.querySelectorAll('#chatLauncher,#chatbox').length,0);assert.deepEqual(page.errors,[],route(c,en));}
  finally{page.close();}
 }
 pass('all 100 Arabic/English course routes mount exactly one scoped companion without script errors');
 const page=await open('study-companion/year1-sem2.html#micro');
 try{
  fill(page.w,'rq-question','ما الفرق بين التعقيم والتطهير؟');page.d.querySelector('#rq-panel-ask .rq-btn.primary').click();assert(page.d.querySelector('.rq-output').textContent.includes('الأبواغ'));pass('natural Arabic question finds the microbiology passage');
  fill(page.w,'rq-question','Explain pharmacokinetics');page.d.querySelector('#rq-panel-ask .rq-btn.primary').click();assert(page.d.querySelector('.rq-output').textContent.includes('لم أجد'));assert.equal(page.d.querySelector('.rafeq').dataset.course,'micro');pass('unsupported question cannot switch courses or fabricate a source citation');
  click(page.d,'rq-tab-summary');fill(page.w,'rq-text','The nurse checks the patient. The nurse checks the route. The dose is 10 mg. Record the dose. Do not assume missing values.');page.d.querySelector('#rq-panel-summary .rq-btn.primary').click();assert(page.d.querySelector('.rq-output').textContent.includes('جمل مختارة'));assert(page.d.querySelector('.rq-output').textContent.includes('نص أدخلته'));pass('pasted-text summary is labelled as user-supplied text');
  click(page.d,'rq-tab-review');fill(page.w,'rq-answerInput','Sterilisation does not eliminate spores. Dose: 100 mg.');fill(page.w,'rq-reference','Sterilisation eliminates spores. Dose: 10 mg.');page.d.querySelector('#rq-panel-review .rq-btn.primary').click();const review=page.d.querySelector('.rq-output').textContent;assert(review.includes('نفي'));assert(review.includes('10 mg'));assert(review.includes('بدون درجة'));pass('review shows negation, numerical differences and no grade');
  click(page.d,'rq-tab-translate');fill(page.w,'rq-text','The nurse records the blood pressure.');page.d.querySelector('#rq-panel-translate .rq-btn.primary').click();await delay();assert(page.d.querySelector('.rq-output').textContent.includes('تسجل الممرضة'));const request=page.requests.find(r=>r.url.startsWith('https://api.mymemory'));assert.equal(request.init.credentials,'omit');assert.equal(request.init.referrerPolicy,'no-referrer');assert(!request.url.includes('student'));pass('translation displays inside the course and sends only the selected text');
  const prior=page.requests.length;fill(page.w,'rq-text','a'.repeat(2001));page.d.querySelector('#rq-panel-translate .rq-btn.primary').click();await delay();assert.equal(page.requests.length,prior);assert(page.d.querySelector('.rq-output').textContent.includes('2000'));pass('long translation is refused before any request');
  click(page.d,'rq-tab-listen');fill(page.w,'rq-text','الشرح باللغة العربية.');page.d.querySelector('#rq-panel-listen .rq-btn.primary').click();await delay();assert(page.speech.length);assert.equal(page.speech.at(-1).lang,'ar-SA');pass('device reading receives the selected Arabic text and language');
  click(page.d,'rq-tab-sources');await delay();assert(page.d.querySelector('.rq-sources').textContent.includes('نصوصها الكاملة غير محمّلة'));assert(page.d.querySelector('.rq-sources a').href.includes('course=CRS-'));assert(page.d.querySelectorAll('.rq-sources a').length>10);pass('actual course sources load with full-text limitation and a filtered library link');
  page.d.getElementById('backCourses').click();await delay();assert.equal(page.d.querySelectorAll('.rafeq').length,0);page.d.querySelector('[data-id="anatomy2"]').click();await delay();assert.equal(page.d.querySelector('.rafeq').dataset.course,'anatomy2');assert.equal(page.d.getElementById('rq-answerInput').value,'');pass('course navigation creates a fresh companion and clears the previous answer');
  assert.deepEqual(page.errors,[]);
 }finally{page.close();}
 for(const [name,translate,expected]of [
  ['quota limit',async()=>({ok:true,json:async()=>({responseStatus:429,quotaFinished:true})}),'حد الاستخدام'],
  ['network failure',async()=>{throw new Error('offline');},'تعذرت الترجمة']
 ]){const p=await open('study-companion/year2.html#english2',{translate});try{click(p.d,'rq-tab-translate');fill(p.w,'rq-text','The nurse records the blood pressure.');p.d.querySelector('#rq-panel-translate .rq-btn.primary').click();await delay();assert(p.d.querySelector('.rq-output').textContent.includes(expected));assert(!p.d.querySelector('#rq-panel-translate .rq-btn.primary').disabled);pass(name+' is shown honestly and leaves controls usable');}finally{p.close();}}
 for(const id of ['wound','diabetes','specimens','medications','iv']){const p=await open('english-ii/index.html#'+id);try{assert.equal(p.d.querySelectorAll('.rafeq').length,1,id);assert.equal(p.d.querySelector('.rafeq').dataset.course,'english2');assert.equal(p.d.querySelectorAll('#coach').length,0);assert(p.d.querySelector('#rq-topic').options.length>12);assert.deepEqual(p.errors,[],id);}finally{p.close();}}
 pass('all five English II lessons embed the companion with real lesson material');
 const english=await open('english-ii/index.html#wound');try{english.d.getElementById('langBtn').click();await delay();assert.equal(english.d.querySelector('.rafeq').dir,'rtl');english.w.location.hash='diabetes';await delay();assert(english.d.querySelector('.rq-head').textContent.includes('السكري'));assert.deepEqual(english.errors,[]);pass('English II language toggle and lesson navigation rebuild the correct companion');}finally{english.close();}
 const library=await open('e-library-v3/index.html?course=CRS-012#resources');try{assert.equal(library.d.getElementById('filter-course').value,'CRS-012');assert.deepEqual(library.errors,[]);pass('Library link selects the intended course');}finally{library.close();}
 const hub=await open('student-learning-hub/index.html');try{const links=[...hub.d.querySelectorAll('#courseCatalogGrid a')];assert.equal(links.length,50);assert(links.every(a=>a.href.includes('study-companion/')&&a.href.includes('#')));assert.deepEqual(hub.errors,[]);pass('all 50 Hub course cards open their own course companion');}finally{hub.close();}
 console.log('COMPLETE',passed,'integration checks');
})().catch(error=>{console.error(error);process.exitCode=1;});
