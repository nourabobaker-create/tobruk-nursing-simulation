'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path'),zlib=require('node:zlib');
const root=path.resolve(__dirname,'../..'),source=fs.readFileSync(path.join(root,'portal-metrics/activity-hooks.js'),'utf8');
const cases=[
 ['clinical-simulations/modules/01-cpr.html','simulation:advanced:01-cpr:practice-review','[data-action="start-guided"]',['#stepContent [data-action="quiz-start"]','#stepContent [data-action="export"]']],
 ['clinical-simulations/modules/02-choking.html','simulation:advanced:02-choking:practice-review','[data-action="start"]',['#stepContent [data-action="newPath"]','#stepContent [data-action="export"]']],
 ['clinical-simulations/modules/03-ecg.html','simulation:advanced:03-ecg:practice-review','#start-guided',['#controls #export','#controls #review-quiz']],
 ['clinical-simulations/modules/04-ngt-insertion.html','simulation:advanced:04-ngt-insertion:practice-review','[data-action="guided"]',['#content [data-action="downloadText"]','#content [data-action="downloadJSON"]']],
 ['clinical-simulations/modules/05-ngt-removal.html','simulation:advanced:05-ngt-removal:practice-review','[data-action="start"]',['#content [data-action="downloadText"]','#content [data-action="newCase"]']],
 ['clinical-simulations/modules/06-blood-extraction.html','simulation:advanced:06-blood-extraction:practice-review','[data-action="start"]',['#content [data-action="downloadText"]','#content [data-action="downloadJSON"]']],
 ['clinical-simulations/modules/07-catheterization.html','simulation:advanced:07-catheterization:practice-review','[data-action="start"]',['#content [data-action="downloadTxt"]','#content [data-action="downloadJson"]']],
 ['clinical-simulations/modules/08-bandaging.html','simulation:advanced:08-bandaging:practice-review','[data-action="start"][data-value="full"]',['#stepContent [data-action="export"]','#stepContent [data-action="demoMenu"]']],
 ['clinical-simulations/modules/09-nebulization.html','simulation:advanced:09-nebulization:practice-review','[data-action="start"][data-value="full"]',['#content [data-action="export"]','#content [data-action="reset"]']],
 ['clinical-simulations/modules/10-gown-diaper.html','simulation:advanced:10-gown-diaper:practice-review','[data-act="start"]',['#content [data-act="exportTXT"]','#content [data-act="exportJSON"]']],
 ['handwash-learning-03/','simulation:legacy:handwashing:knowledge-review','#startPractice',['#writtenView #newQuiz','#writtenView #reflectionAnswer']],
 ['nursing-skills/gloving.html','simulation:legacy:gloving:knowledge-review','#practice',['#written #fullQuiz','#written #reflect']],
 ['range-of-motion-learning-01/','simulation:legacy:range-of-motion:knowledge-review','#startPractice',['#content #newQuiz','#content #reflection']],
 ['body-mechanics-learning-01/','simulation:legacy:body-mechanics:knowledge-review','#practiceQuiz',['#content #newQuiz','#content #reflectionAnswer']],
 ['turning-moving-learning-01/','simulation:legacy:turning-moving:knowledge-review','#practiceQuiz',['#content #newQuiz','#content #reflectionAnswer']],
 ['patient-positioning-learning-01/','simulation:legacy:patient-positioning:knowledge-review','#practiceQuiz',['#content #newQuiz','#content #reflectionAnswer']],
 ['wound-dressing-learning-01/','simulation:legacy:wound-dressing:knowledge-review','#quizPractice',['#content .reviewPanel','#content #newQuiz']]
];
function harness(route){
 const nodes=new Map(),clicks=[],observers=[],events=[];let consent=false;
 function node(selector,shown=true){return {selector,hidden:!shown,disabled:false,dataset:{},getClientRects:()=>shown?[{}]:[],closest:s=>s==='[hidden]'?(!shown?{}:null):null,matches:s=>s.split(',').includes(selector),get value(){throw Error('Form value read');},get textContent(){throw Error('Text read');}};}
 const document={documentElement:{},querySelector:s=>nodes.get(s)||null,querySelectorAll:()=>[],addEventListener:(name,fn)=>{if(name==='click')clicks.push(fn);}};
 const window={PortalMetrics:{record:(...args)=>{if(!consent)return false;events.push(args);return true;}}};
 for(const name of ['CPRLab','NGT','NGR','VP','CatheterApp','gloving','woundDressing'])Object.defineProperty(window,name,{get(){throw Error('Private simulation state accessed');}});
 const context={window,document,location:{pathname:'/portal/'+route},MutationObserver:class{constructor(fn){observers.push(fn);}observe(){}}};vm.createContext(context);vm.runInContext(source,context);
 return {events,document,setConsent:v=>consent=v,show:(selector,shown=true)=>nodes.set(selector,node(selector,shown)),clear:()=>nodes.clear(),tick:()=>observers.forEach(fn=>fn()),reloadHook:()=>vm.runInContext(source,context),click:(selector,shown=true)=>{const n=node(selector,shown);const target={closest:()=>n};clicks.forEach(fn=>fn({target}));},clickCount:()=>clicks.length};
}
let tests=0;
for(const [route,id,start,end]of cases){
 const h=harness(route);end.forEach(s=>h.show(s));h.tick();assert.deepEqual(h.events,[],route+' static result must not backfill');
 h.click(start);h.tick();assert.deepEqual(h.events,[],route+' off by default');h.clear();h.setConsent(true);
 h.click('[data-action="demo"]');h.click('#sourceBtn');h.tick();assert.deepEqual(h.events,[],route+' demo/menu is not start');
 h.click(start,false);assert.deepEqual(h.events,[],route+' hidden start ignored');
 h.click(start);assert.equal(h.events.length,1,route);assert.deepEqual(h.events[0],['activity_start',id,'simulations']);
 end.forEach(s=>h.show(s,false));h.tick();assert.equal(h.events.length,1,route+' hidden results are not completion');
 h.clear();h.show(end[0]);h.tick();assert.equal(h.events.length,1,route+' incomplete result marker pair');
 end.forEach(s=>h.show(s));h.tick();assert.deepEqual(h.events[1],['activity_complete',id,'simulations']);
 h.tick();h.click(start);h.tick();assert.equal(h.events.length,2,route+' deduplicated per page');
 h.reloadHook();assert.equal(h.clickCount(),1,route+' duplicate hook guard');tests++;
}
const inventory=JSON.parse(fs.readFileSync(path.join(root,'portal-metrics/coverage.json'),'utf8'));
assert(inventory.pages.includes('clinical-simulations/scenarios/index.html'));
assert.equal(inventory.simulationActivityUnits.length,17);
for(const [,id]of cases)assert(inventory.simulationActivityUnits.some(u=>u.item===id),id+' inventory');
for(const [folder,prefix,loader]of [['nursing-skills','gloving','gloving-loader.js'],['wound-dressing-learning-01','wound','loader.js']]){
 const script=fs.readFileSync(path.join(root,folder,loader),'utf8');const names=[...script.matchAll(new RegExp('[\\\'"]('+prefix+'-[^\\\'"]+\\.txt)[\\\'"]','g'))].map(x=>x[1]);
 const raw=zlib.inflateRawSync(Buffer.from(names.map(n=>fs.readFileSync(path.join(root,folder,n),'utf8')).join(''),'base64')).toString('utf8');
 assert(!raw.includes('portal-metrics/'),'compressed clinical payload is not rewritten');assert(script.includes("new URL('../portal-metrics/'+name,document.baseURI)"));assert(script.includes("html.replace('</body>',metricsScripts+'</body>')"));
}
assert(fs.readFileSync(path.join(root,'handwash-learning-03/boot.js'),'utf8').includes("metric.src=asset('../portal-metrics/'+name)"));
assert(!/\.value|\.textContent|snapshot\(|\.state|readEvents\(/.test(source.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\/\/[^\n]*/g,'')),'hooks must not read personal learning values');
console.log(JSON.stringify({units:tests,startRequiresInteraction:true,completionRequiresVisibleDebrief:true,offByDefault:true,noDemoOrMenuStart:true,noScoresAnswersOrReflectionsRead:true,decodedLoaderReinjection:3}));
