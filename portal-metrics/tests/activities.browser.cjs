// Local synthetic UI checks only. The browser cannot contact the live collector.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..'),results=[];
const server=http.createServer((req,res)=>{let file=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(file.endsWith('/'))file+='index.html';fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.txt':'text/plain'})[path.extname(file)]||'application/octet-stream'});res.end(err?'Missing':data);});});
const units=[
 ['clinical-simulations/modules/01-cpr.html','simulation:advanced:01-cpr:practice-review',null,'[data-action="start-guided"]'],
 ['clinical-simulations/modules/02-choking.html','simulation:advanced:02-choking:practice-review',null,'[data-action="start"]'],
 ['clinical-simulations/modules/03-ecg.html','simulation:advanced:03-ecg:practice-review',null,'#start-guided'],
 ['clinical-simulations/modules/04-ngt-insertion.html','simulation:advanced:04-ngt-insertion:practice-review',null,'[data-action="guided"]'],
 ['clinical-simulations/modules/05-ngt-removal.html','simulation:advanced:05-ngt-removal:practice-review',null,'[data-action="start"]'],
 ['clinical-simulations/modules/06-blood-extraction.html','simulation:advanced:06-blood-extraction:practice-review',null,'[data-action="start"]'],
 ['clinical-simulations/modules/07-catheterization.html','simulation:advanced:07-catheterization:practice-review',null,'[data-action="start"]'],
 ['clinical-simulations/modules/08-bandaging.html','simulation:advanced:08-bandaging:practice-review',null,'[data-action="start"][data-value="full"]'],
 ['clinical-simulations/modules/09-nebulization.html','simulation:advanced:09-nebulization:practice-review',null,'[data-action="start"][data-value="full"]'],
 ['clinical-simulations/modules/10-gown-diaper.html','simulation:advanced:10-gown-diaper:practice-review',null,'[data-act="start"]'],
 ['handwash-learning-03/','simulation:legacy:handwashing:knowledge-review','#writtenTab','#startPractice'],
 ['nursing-skills/gloving.html','simulation:legacy:gloving:knowledge-review','#quizTab','#practice'],
 ['range-of-motion-learning-01/','simulation:legacy:range-of-motion:knowledge-review','[data-mode="written"]','#startPractice'],
 ['body-mechanics-learning-01/','simulation:legacy:body-mechanics:knowledge-review','[data-mode="quiz"]','#practiceQuiz'],
 ['turning-moving-learning-01/','simulation:legacy:turning-moving:knowledge-review','[data-mode="quiz"]','#practiceQuiz'],
 ['patient-positioning-learning-01/','simulation:legacy:patient-positioning:knowledge-review','[data-mode="quiz"]','#practiceQuiz'],
 ['wound-dressing-learning-01/','simulation:legacy:wound-dressing:knowledge-review','[data-mode="written"]','#quizPractice']
];
async function verifyConsent(browser,base){
 const directory='/tmp/tobruk-metrics-consent';fs.mkdirSync(directory,{recursive:true});
 const endpoint='https://script.google.com/macros/s/synthetic-consent-test/exec',checks=[];
 async function fixture(viewport){
  const context=await browser.newContext({viewport}),posts=[];
  await context.route('**/*',async route=>{
   const request=route.request(),url=request.url();
   if(url.startsWith(endpoint)){assert.equal(request.method(),'POST');posts.push(JSON.parse(request.postData()));await route.fulfill({status:200,contentType:'text/plain',body:'{"ok":true}'});return;}
   if(url.startsWith(base)){await route.continue();return;}
   await route.abort();
  });
  await context.route('**/portal-metrics/config.js*',route=>route.fulfill({status:200,contentType:'text/javascript',body:'window.PortalMetricsConfig={schema:1,endpoint:'+JSON.stringify(endpoint)+'};'}));
  const page=await context.newPage();page.setDefaultTimeout(20000);await page.goto(base);await page.waitForFunction(()=>window.PortalMetrics?.documentRoot===document.documentElement&&document.querySelector('[data-portal-metrics-consent]'));
  return {context,page,posts};
 }
 for(const [name,viewport,mode]of [['desktop',{width:1366,height:1000},'shared'],['phone375',{width:375,height:900},'local']]){
  const {context,page,posts}=await fixture(viewport);
  try{
   const banner=page.locator('[data-portal-metrics-consent]');assert.equal(await banner.count(),1);assert(await banner.isVisible());
   assert.equal(await page.evaluate(()=>PortalMetricsCore.preference()),'off');assert.equal(await page.evaluate(()=>PortalMetricsCore.preferenceChoice()),null);assert.equal(await page.evaluate(()=>PortalMetricsCore.readEvents().length),0);assert.equal(posts.length,0);
   const geometry=await banner.evaluate(el=>{const r=el.getBoundingClientRect();return {top:r.top,right:r.right,bottom:r.bottom,position:getComputedStyle(el).position,modal:el.getAttribute('aria-modal'),overflow:document.documentElement.scrollWidth>innerWidth+1,headerTop:document.querySelector('header').getBoundingClientRect().top};});
   assert(geometry.top>=0&&geometry.top<100);assert(geometry.right<=viewport.width+1);assert.equal(geometry.overflow,false,name+' has no horizontal overflow');assert(!['fixed','absolute'].includes(geometry.position));assert.equal(geometry.modal,null);assert(geometry.headerTop>=geometry.bottom-1,name+' banner stays in page flow');
   for(const button of await banner.locator('button').all())assert((await button.boundingBox()).height>=44);
   await page.screenshot({path:directory+'/'+name+'.png'});
   if(mode==='shared'){
    const post=page.waitForRequest(request=>request.url()===endpoint&&request.method()==='POST');
    await banner.getByRole('button',{name:'مشاركة إحصاءات مجهولة',exact:true}).click();const request=await post,payload=JSON.parse(request.postData());
    assert.equal(payload.schema,1);assert.equal(payload.events.length,1);assert.equal(payload.events[0].event,'page_view');assert.equal(payload.events[0].section,'faculty');assert.equal(Object.keys(payload.events[0]).sort().join(','),'at,event,id,item,language,section,session');
   }else{
    await page.evaluate(()=>{document.documentElement.lang='en';document.documentElement.dir='ltr';});await banner.getByRole('heading',{name:'Optional usage statistics',exact:true}).waitFor();
    await banner.getByRole('button',{name:'This device only',exact:true}).click();assert.equal(posts.length,0);
   }
   await page.waitForFunction(selected=>PortalMetricsCore.preference()===selected,mode);assert.equal(await banner.isVisible(),false);assert.equal(await page.evaluate(()=>PortalMetricsCore.readEvents().length),1);assert.equal(await page.evaluate(()=>PortalMetricsCore.readEvents()[0].event),'page_view');
   checks.push({viewport:name,initiallyOff:true,zeroEventsBeforeChoice:true,realConsentButton:mode,nonblocking:true,horizontalOverflow:false,screenshot:directory+'/'+name+'.png'});
  }finally{await context.close();}
 }
 const {context,page,posts}=await fixture({width:375,height:900});
 try{
  await page.locator('[data-portal-metrics-consent]').getByRole('button',{name:'إبقاء القياس متوقفًا',exact:true}).click();await page.reload();await page.waitForFunction(()=>window.PortalMetrics&&document.querySelector('details[data-portal-metrics-widget]'));
  assert.equal(await page.evaluate(()=>PortalMetricsCore.preferenceChoice()),'off');assert.equal(await page.locator('[data-portal-metrics-consent]').isVisible(),false);assert.equal(await page.evaluate(()=>PortalMetricsCore.readEvents().length),0);assert.equal(posts.length,0);
  await page.evaluate(()=>localStorage.setItem('nur-portal-metrics-choice-v1','shared'));await page.goto(base+'?metrics_test=1');await page.waitForFunction(()=>window.PortalMetrics);
  assert.equal(await page.locator('[data-portal-metrics-consent]').count(),0);assert.equal(await page.locator('details[data-portal-metrics-widget]').count(),0);assert.equal(await page.evaluate(()=>PortalMetricsCore.readEvents().length),0);assert.equal(posts.length,0);
 }finally{await context.close();}
 return {checks,explicitOffPersists:true,metricsTestSuppressesAllMeasurement:true,noRealCollectorContact:true};
}
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+server.address().port+'/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
 try{
 const consentChecks=await verifyConsent(browser,base);
 for(const [route,item,nav,start]of units){
  const context=await browser.newContext({viewport:{width:1366,height:1000}});await context.route('**/*',request=>request.request().url().startsWith(base)?request.continue():request.abort());const page=await context.newPage();page.setDefaultTimeout(20000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
  try{
   await page.goto(base+route);await page.waitForFunction(()=>window.PortalMetrics?.documentRoot===document.documentElement&&document.querySelector('details[data-portal-metrics-widget]'));
   assert.equal(await page.locator('details[data-portal-metrics-widget]').count(),1,route+' one widget after loader');assert.equal(await page.locator('[data-portal-metrics-consent]').count(),1,route+' one consent prompt after loader');
   assert.equal(await page.evaluate(()=>PortalMetricsCore.preference()),'off');assert.equal(await page.evaluate(()=>PortalMetricsCore.readEvents().length),0);
   if(nav)await page.locator(nav).click();await page.locator(start).first().click();await page.waitForTimeout(30);assert.equal(await page.evaluate(()=>PortalMetricsCore.readEvents().length),0,route+' opt-out respected');
   await page.reload();await page.waitForFunction(()=>window.PortalMetrics?.documentRoot===document.documentElement&&document.querySelector('details[data-portal-metrics-widget]'));await page.evaluate(()=>PortalMetrics.setMode('local'));
   if(nav)await page.locator(nav).click();assert.equal(await page.evaluate(()=>PortalMetricsCore.readEvents().filter(e=>e.event==='activity_start').length),0,route+' menus do not start');
   await page.locator(start).first().click();await page.waitForFunction(id=>PortalMetricsCore.readEvents().some(e=>e.event==='activity_start'&&e.item===id),item);
   let activity=await page.evaluate(()=>PortalMetricsCore.readEvents().filter(e=>e.event.startsWith('activity_')));assert.equal(activity.length,1);assert.equal(activity[0].item,item);assert.equal(activity[0].event,'activity_start');
   assert.equal(activity[0].section,'simulations');
   // Representative real renderer transition: the hook observes the resulting
   // debrief, not a score or a call to an instrumentation-only completion API.
   if(route.endsWith('03-ecg.html')){
    await page.evaluate(()=>ECG.setStage('debrief'));await page.waitForFunction(id=>PortalMetricsCore.readEvents().some(e=>e.event==='activity_complete'&&e.item===id),item);
    await page.evaluate(()=>ECG.setStage('debrief'));await page.waitForTimeout(30);assert.equal(await page.evaluate(()=>PortalMetricsCore.readEvents().filter(e=>e.event==='activity_complete').length),1);
   }
   // A legacy review can be submitted with unanswered items: this is labelled
   // review-panel completion, never all questions answered or a pass.
   if(route==='nursing-skills/gloving.html'){
    await page.locator('#submit').click();if(await page.locator('#confirmSubmit').count())await page.locator('#confirmSubmit').click();
    await page.waitForFunction(id=>PortalMetricsCore.readEvents().some(e=>e.event==='activity_complete'&&e.item===id),item);assert(await page.locator('#written #reflect').isVisible());
   }
   // Verify the old source contains actual result controls only after a result
   // transition. Static export/menu controls must not create completion on start.
   if(!route.endsWith('03-ecg.html')&&route!=='nursing-skills/gloving.html')assert.equal(await page.evaluate(()=>PortalMetricsCore.readEvents().filter(e=>e.event==='activity_complete').length),0);
   const events=await page.evaluate(()=>PortalMetricsCore.readEvents());assert(events.every(e=>Object.keys(e).sort().join(',')==='at,event,id,item,language,section,session'));
   assert.equal(await page.evaluate(()=>PortalMetricsCore.preference()),'local');assert.deepEqual(errors,[],route);results.push({route,renderedLesson:true,offByDefault:true,startItem:item,completionNotInferredFromOpening:true,errors:0});
  }finally{await context.close();}
 }
 // Rebinding survives a second document in the same window and same URL.
 const context=await browser.newContext();await context.route('**/*',request=>request.request().url().startsWith(base)?request.continue():request.abort());const page=await context.newPage();await page.goto(base+'nursing-skills/gloving.html');await page.waitForFunction(()=>window.PortalMetrics&&document.querySelector('details[data-portal-metrics-widget]'));
 await page.evaluate(({base})=>{window.oldMetrics=PortalMetrics;const scripts=['config.js','core.js','tracker.js'].map(name=>'<script defer src="'+base+'portal-metrics/'+name+'"></script>').join('');document.open();document.write('<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body><p>Rebinding fixture</p>'+scripts+'</body></html>');document.close();},{base});
 await page.waitForFunction(()=>window.PortalMetrics&&PortalMetrics!==window.oldMetrics&&PortalMetrics.documentRoot===document.documentElement);assert.equal(await page.locator('details[data-portal-metrics-widget]').count(),1);assert.equal(await page.locator('[data-portal-metrics-consent]').count(),1);assert.equal(await page.evaluate(()=>PortalMetricsCore.readEvents().length),0);await context.close();
 console.log(JSON.stringify({consentChecks,units:results,verifiedRenderedCompletionExamples:['ECG debrief renderer','Gloving written review results'],replacedDocumentRebind:true,noExternalNetwork:true,limits:['Other unit completions use exhaustive DOM-adapter tests and source-verified unique result markers.','This is synthetic local instrumentation QA, not educational outcomes or clinical validation.']},null,2));
 }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
