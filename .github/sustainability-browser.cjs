'use strict';
// Runs only in an ephemeral CI browser. No real user data, credentials, or external submissions.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{spawn}=require('node:child_process');
const root=process.cwd();
const harness=String.raw`
(async()=>{
 const results=[];const assert=(ok,name)=>{if(!ok)throw Error(name);results.push({name,passed:true});};
 const pause=ms=>new Promise(r=>setTimeout(r,ms));
 const until=async fn=>{for(let i=0;i<200;i++){if(fn())return;await pause(25);}throw Error('Timed out waiting for local operation');};
 const frame=document.createElement('iframe');frame.style.cssText='width:100%;height:900px;border:0';document.body.append(frame);
 let w;const doc=()=>frame.contentDocument;
 const navigate=()=>new Promise(resolve=>{frame.onload=()=>{w=frame.contentWindow;resolve();};frame.src='/quality-system-prototype/sustainability/?ci=1&t='+Date.now();});
 const click=s=>{const e=doc().querySelector(s);if(!e)throw Error('Missing control '+s);e.click();};
 const fill=(s,value)=>{const e=doc().querySelector(s);if(!e)throw Error('Missing input '+s);if(e.type==='checkbox')e.checked=value;else e.value=value;e.dispatchEvent(new w.Event('input',{bubbles:true}));};
 const store=()=>JSON.parse(w.localStorage.getItem('tobruk-sustainability-v04'));
 const active=()=>{const s=store();return s.records.find(r=>r.id===s.selected);};
 let captures=[];const capture=()=>{w.HTMLAnchorElement.prototype.click=function(){captures.push({url:this.href,name:this.download});};};
 try{
  localStorage.clear();await navigate();await until(()=>doc().querySelector('[data-meta="process"]'));
  const errors=[];w.addEventListener('error',e=>errors.push(e.message));
  assert(doc().documentElement.dir==='rtl','Arabic RTL document');
  fill('[data-meta="process"]','اختبار تقني غير حقيقي');fill('[data-meta="unit"]','جهة اختبار غير حقيقية');
  await navigate();await until(()=>doc().querySelector('[data-meta="process"]'));
  assert(doc().querySelector('[data-meta="process"]').value==='اختبار تقني غير حقيقي','Metadata survives browser reload');
  click('[data-step="1"]');for(const q of w.SustainabilityCore.QUESTIONS)fill('[data-answer="'+q.id+'"]','yes');
  click('[data-step="4"]');assert(w.SustainabilityCore.assess(active()).code==='verify','All yes without evidence is not sustainable');
  click('[data-step="1"]');fill('[data-answer="ownership"]','no');click('[data-step="4"]');assert(doc().querySelector('.result').textContent.includes('عالية الخطورة'),'Critical negative shows high risk in UI');
  click('[data-step="1"]');fill('[data-answer="ownership"]','yes');click('[data-step="4"]');
  click('[data-cmd="sync"]');await pause(25);let qs=JSON.parse(w.localStorage.getItem('tobruk-qms-prototype-v01'));const count=qs.improvements.length;
  assert(qs.documents.some(d=>d.sourceAssessmentId===active().id),'Assessment draft appears in existing document register');
  click('[data-cmd="sync"]');await pause(25);qs=JSON.parse(w.localStorage.getItem('tobruk-qms-prototype-v01'));assert(qs.improvements.length===count,'Repeated action sync creates no duplicates');
  click('[data-step="2"]');fill('#ev-title','ملف اصطناعي للاختبار فقط');fill('#ev-ref','TEST-ONLY');fill('#ev-version','1');
  for(const e of doc().querySelectorAll('[data-eq]'))e.checked=true;fill('#ev-safe',true);
  const payload='Synthetic local attachment. Not institutional data.';const dt=new w.DataTransfer();dt.items.add(new w.File([payload],'sample.txt',{type:'text/plain'}));doc().querySelector('#ev-file').files=dt.files;
  click('[data-cmd="add-evidence"]');await until(()=>active().evidence.length===1);
  assert(active().evidence[0].review.status==='pending','Actual attachment starts unreviewed');assert(active().evidence[0].bytes===payload.length,'Actual attachment byte length is recorded');
  await navigate();await until(()=>doc().querySelector('[data-step="2"]'));click('[data-step="2"]');capture();
  click('[data-download]');await until(()=>captures.length===1);let blob=await (await fetch(captures[0].url)).blob();assert(await blob.text()===payload,'IndexedDB attachment survives reload and downloads with identical bytes');
  fill('[data-review="status"]','accepted');fill('[data-review="role"]','مراجع اختبار');fill('[data-review="date"]',w.SustainabilityCore.today());fill('[data-review="note"]','تحقق برمجي ببيانات اصطناعية فقط.');
  click('[data-step="3"]');fill('[data-test="task"]','مهمة اصطناعية');fill('[data-test="role"]','منفذ اختبار');fill('[data-test="authority"]','TEST-AUTHORITY-NOT-REAL');fill('[data-test="date"]','2999-01-01');fill('[data-test="result"]','independent');fill('[data-test="reference"]','TEST-HANDOVER');fill('[data-test="newPerson"]',true);
  click('[data-step="4"]');assert(w.SustainabilityCore.assess(active()).code==='verify','Future handover date cannot produce a positive result');
  click('[data-step="3"]');fill('[data-test="date"]',w.SustainabilityCore.today());click('[data-step="4"]');assert(w.SustainabilityCore.assess(active()).code==='sustainable','Complete synthetic review and independent handover pass all UI gates');
  captures=[];click('[data-cmd="export"]');await until(()=>captures.length===1);blob=await (await fetch(captures[0].url)).blob();const pack=JSON.parse(await blob.text());assert(pack.files.length===1&&atob(pack.files[0].b64)===payload,'Export contains original attachment bytes and record');
  const exportedId=active().id,dt2=new w.DataTransfer();dt2.items.add(new w.File([await blob.text()],'backup.json',{type:'application/json'}));const fileInput=doc().querySelector('#import-file');fileInput.files=dt2.files;fileInput.dispatchEvent(new w.Event('change',{bubbles:true}));await until(()=>store().records.length===2);
  assert(active().id!==exportedId,'Import adds a new record without overwriting original');assert(active().evidence[0].review.status==='pending','Import resets claimed review to require verification');
  click('[data-step="2"]');captures=[];click('[data-download]');await until(()=>captures.length===1);assert(await (await fetch(captures[0].url)).text()===payload,'Imported attachment round-trip preserves exact bytes');
  const importedId=active().id;click('[data-step="4"]');click('[data-cmd="retest"]');await until(()=>store().records.length===3);assert(active().previousId===importedId&&Object.keys(active().answers).length===0,'Linked retest preserves old record and starts with blank answers');
  assert(doc().documentElement.scrollWidth<=w.innerWidth+1,'Narrow viewport has no horizontal overflow');
  assert(errors.length===0,'No captured runtime exceptions during tested workflow');
 }catch(e){results.push({name:e.message,passed:false});}
 const out=document.getElementById('qa-result');out.textContent=JSON.stringify({passed:results.every(x=>x.passed),tests:results},null,2);document.body.dataset.qa=results.every(x=>x.passed)?'passed':'failed';
})();`;
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'};
const server=http.createServer((req,res)=>{
 const pathname=new URL(req.url,'http://localhost').pathname;
 if(pathname==='/__qa__'){res.writeHead(200,{'content-type':'text/html'});res.end('<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}pre{white-space:pre-wrap}</style></head><body><pre id="qa-result">pending</pre><script src="/__qa__.js"></script></body></html>');return;}
 if(pathname==='/__qa__.js'){res.writeHead(200,{'content-type':'text/javascript'});res.end(harness);return;}
 let target=path.resolve(root,'.'+decodeURIComponent(pathname));if(!target.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 try{if(fs.statSync(target).isDirectory())target=path.join(target,'index.html');res.writeHead(200,{'content-type':mime[path.extname(target)]||'text/plain'});fs.createReadStream(target).pipe(res);}catch{res.writeHead(404);res.end('not found');}
});
server.listen(0,'127.0.0.1',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'sus-qa-'));
 const proc=spawn('google-chrome',['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-first-run','--no-default-browser-check','--window-size=390,900','--user-data-dir='+dir,'--virtual-time-budget=30000','--dump-dom','http://127.0.0.1:'+server.address().port+'/__qa__']);
 let stdout='',stderr='';proc.stdout.on('data',b=>stdout+=b);proc.stderr.on('data',b=>stderr+=b);
 const timer=setTimeout(()=>proc.kill('SIGKILL'),110000);
 proc.on('error',e=>{console.error(e);server.close();process.exitCode=1;});
 proc.on('close',()=>{clearTimeout(timer);server.close();const m=stdout.match(/<pre id="qa-result">([\s\S]*?)<\/pre>/);if(m)console.log(m[1].replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&'));else console.error('No browser report. '+stderr.slice(-2500));if(!stdout.includes('data-qa="passed"'))process.exitCode=1;fs.rmSync(dir,{recursive:true,force:true});});
});
