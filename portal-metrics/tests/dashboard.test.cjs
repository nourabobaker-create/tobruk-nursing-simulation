'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../dashboard.js'),'utf8');
const coreSource=fs.readFileSync(path.join(__dirname,'../core.js'),'utf8');
const event=(id,eventName='activity_start',item='clinical-scenario:orientation',changes={})=>({id,session:'session_dashboard_1',at:new Date().toISOString(),section:'simulations',event:eventName,item,language:'ar',...changes});
function harness({events=[],endpoint='',sharedSummary=null,preference='off',storageBlocked=false}={}){
 const nodes=new Map(),memory=new Map(),sourceInputs=[],timers=[],requests=[];let localReads=0,response=sharedSummary;
 function node(tag='div'){
  const n={tag,children:[],textContent:'',value:'',hidden:false,disabled:false,checked:false,style:{},attributes:{},listeners:{},classList:{toggle(){}},append(...items){this.children.push(...items);},replaceChildren(...items){this.children=[...items];},setAttribute(k,v){this.attributes[k]=v;},addEventListener(k,v){this.listeners[k]=v;},remove(){},click(){}};return n;
 }
 function get(id){if(!nodes.has(id))nodes.set(id,node());return nodes.get(id);}
 get('period').value='30';get('section').value='all';
 for(const value of ['local','shared','import']){const n=node('input');n.value=value;sourceInputs.push(n);}
 const localStorage={getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,String(v)),removeItem:k=>memory.delete(k)};
 memory.set('nur-portal-metrics-events-v1',JSON.stringify(events));memory.set('nur-portal-metrics-choice-v1',preference);
 const window={PortalMetricsConfig:{endpoint},localStorage,addEventListener(){},print(){}};
 const document={getElementById:get,createElement:node,querySelectorAll:()=>sourceInputs,head:{append(script){requests.push(script);if(response==='error'){script.onerror();return;}if(response){const u=new URL(script.src),result=typeof response==='function'?response({from:u.searchParams.get('from'),to:u.searchParams.get('to')}):response;window[u.searchParams.get('callback')](result);}}}};
 const context={window,document,Intl,Date,Number,Object,Array,String,Math,JSON,Map,Set,Error,URL,Blob,setTimeout:(fn,ms)=>{timers.push({fn,ms,cleared:false});return timers.length;},clearTimeout(id){if(timers[id-1])timers[id-1].cleared=true;}};
 vm.createContext(context);vm.runInContext(coreSource,context);
 const real=window.PortalMetricsCore;window.PortalMetricsCore={...real,...(storageBlocked?{storageAvailable:()=>false}:{}),readEvents(){localReads++;return real.readEvents();}};
 vm.runInContext(source,context);
 return {api:window.PortalMetricsDashboard,nodes,get,window,sources:sourceInputs,timers,requests,setResponse(value){response=value;},get localReads(){return localReads;},context};
}
const flatten=n=>[n.textContent,...n.children.map(flatten)].flat().filter(Boolean).join(' ');
const flush=()=>new Promise(resolve=>setImmediate(resolve));
function sharedBase(){const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Tripoli',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());return {schema:1,mode:'shared',generatedAt:new Date().toISOString(),collectionStartedAt:new Date().toISOString(),from:today,to:today,rows:[],sessions:0,engagedSessions:0,feedbackResponses:0,sectionSessions:{},engagedSectionSessions:{}};}

test('activity KPIs distinguish starts and completions without calculating a conversion rate',()=>{
 const h=harness({events:[event('event_dash_start1'),event('event_dash_complete1','activity_complete'),event('event_dash_complete2','activity_complete')]});
 const cards=h.get('kpis').children;assert.equal(cards.length,6);
 const starts=cards.find(n=>flatten(n).includes('بدايات الأنشطة المسجلة')),completed=cards.find(n=>flatten(n).includes('إتمامات الأنشطة المسجلة'));
 assert.ok(starts);assert.ok(completed);assert.match(flatten(completed),/لا يثبت نجاح إجراء أو كفاية سريرية/);
 assert.ok(h.get('scenario-topic-totals').textContent.includes('لا تكوّن نسبة تحويل'));
});
test('local topic aggregation deduplicates IDs and rejects unknown items, wrong sections and out-of-period events',()=>{
 const h=harness(),today=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Tripoli',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const start=event('event_dash_unique1');const past=event('event_dash_past1','activity_start',undefined,{at:new Date(Date.now()-2*86400000).toISOString()});
 const rows=h.api.summarizeScenarioEvents([start,start,event('event_dash_done1','activity_complete'),event('event_dash_unknown1','activity_start','clinical-scenario:private-or-unknown'),event('event_dash_wrong1','activity_start',undefined,{section:'library'}),past],{from:today,to:today});
 assert.equal(rows.length,100);const row=rows.find(r=>r.id==='orientation');assert.equal(row.starts,1);assert.equal(row.completions,1);
 assert.equal(rows.reduce((n,r)=>n+r.starts,0),1);assert.equal(JSON.stringify(rows).includes('private-or-unknown'),false);
});
test('local topic dates use Tripoli calendar day across UTC midnight boundaries',()=>{
 const h=harness();const now=new Date(),prior=new Date(now.getTime()-3*86400000).toISOString().slice(0,10),at=prior+'T22:30:00Z';const tripoli=h.window.PortalMetricsCore.day(at);
 const rows=h.api.summarizeScenarioEvents([event('event_dash_zone1','activity_start',undefined,{at})],{from:tripoli,to:tripoli});assert.equal(rows.find(r=>r.id==='orientation').starts,1);
 const excluded=h.api.summarizeScenarioEvents([event('event_dash_zone1','activity_start',undefined,{at})],{from:prior,to:prior});assert.equal(excluded.find(r=>r.id==='orientation').starts,0);
});
test('shared source never reads or renders private local topic events as a fallback',async()=>{
 const h=harness({endpoint:'https://script.google.com/macros/s/test-endpoint/exec',events:[event('event_dash_private1')]});await flush();
 assert.equal(h.localReads,0);assert.equal(h.get('scenario-topic-detail').hidden,true);assert.match(h.get('scenario-topic-note').textContent,/لا يوفّر تفصيل الموضوعات/);
 assert.equal(h.get('scenario-topic-rows').children.length,0);
});
test('local panel clears topic rows when section filter excludes simulations',()=>{
 const h=harness({events:[event('event_dash_filter1')]});assert.equal(h.get('scenario-topic-detail').hidden,false);
 h.get('section').value='library';h.get('section').listeners.change();
 assert.equal(h.get('scenario-topic-detail').hidden,true);assert.equal(h.get('scenario-topic-rows').children.length,0);
});
test('strict shared summary contract still rejects raw items, unknown fields and inconsistent feedback totals',()=>{
 const h=harness(),base=sharedBase();assert.equal(h.api.validateSummary(base).schema,1);
 assert.throws(()=>h.api.validateSummary({...base,rawEvents:[]}),/حقول غير معتمدة/);
 assert.throws(()=>h.api.validateSummary({...base,rows:[{day:base.from,section:'simulations',event:'activity_start',count:1,item:'secret'}]}),/صف غير صالح/);
 assert.throws(()=>h.api.validateSummary({...base,feedbackResponses:1}),/لا يطابق/);
});

test('public topic-name catalogue stays aligned with the100 current clinical topics',()=>{
 const h=harness(),raw=fs.readFileSync(path.join(__dirname,'../../clinical-simulations/scenarios/data.js'),'utf8'),ctx={window:{}};vm.runInNewContext(raw,ctx);const expected=ctx.window.CLINICAL_SCENARIOS;
 const local=h.api.summarizeScenarioEvents([],{from:'2026-10-01',to:'2026-10-22'});assert.equal(local.length,expected.length);for(const topic of expected)assert.equal(local.find(r=>r.id===topic.id)?.title,topic.title.ar);
});

const endpoint='https://script.google.com/macros/s/test-endpoint/exec';
function sharedFor(dates,extra={}){const base=sharedBase();return {...base,...dates,ready:true,timezone:'Africa/Tripoli',coverageFrom:base.to,partialCoverage:dates.from<base.to,...extra};}
function kpiValue(h,index=0){return h.get('kpis').children[index].children[1].textContent;}
test('successful empty shared read displays zero received counts and never claims zero visitors',async()=>{
 const h=harness({endpoint,sharedSummary:dates=>sharedFor(dates)});await flush();
 for(let i=0;i<5;i++)assert.equal(kpiValue(h,i),'0');
 assert.equal(kpiValue(h,5),'لا توجد إجابات');assert.match(h.get('reading-context').textContent,/صفر أحداث مستلمة/);assert.match(h.get('reading-context').textContent,/لا يعني عدم وجود زيارات/);
 assert.match(flatten(h.get('source-status')),/الاتصال يعمل/);assert.match(h.get('device-measurement-state').textContent,/القياس متوقف/);assert.equal(h.localReads,0);
 const today=h.get('daily-rows').children.at(-1);assert.equal(today.children[1].textContent,'0');assert.equal(h.get('daily-rows').children[0].children[1].textContent,'خارج التغطية');
});
test('connected selected section with no rows displays zeros despite other-section activity',async()=>{
 const h=harness({endpoint,sharedSummary:dates=>{const base=sharedFor(dates);return {...base,rows:[{day:base.to,section:'library',event:'page_view',count:2}],sessions:1,sectionSessions:{library:1}};}});await flush();
 assert.equal(kpiValue(h),'1');h.get('section').value='simulations';h.get('section').listeners.change();
 assert.equal(kpiValue(h),'0');assert.equal(kpiValue(h,1),'0');assert.match(h.get('reading-context').textContent,/أحداث لأقسام أخرى/);assert.equal(h.get('section-rows').children[0].children[1].textContent,'0');
});
test('failed read clears previous values and never substitutes local records or zeros',async()=>{
 const h=harness({endpoint,events:[event('event_dash_hiddenlocal')],sharedSummary:dates=>sharedFor(dates,{sessions:1,sectionSessions:{library:1},rows:[{day:dates.to,section:'library',event:'page_view',count:1}]})});await flush();assert.equal(kpiValue(h),'1');
 h.setResponse('error');h.get('refresh').listeners.click();await flush();
 for(let i=0;i<6;i++)assert.equal(kpiValue(h,i),'تعذّرت القراءة');assert.equal(h.localReads,0);assert.match(h.get('reading-context').textContent,/فشلت قراءة المصدر/);assert.match(h.get('collection-label').textContent,/تعذّر تحديد/);
});
test('loading has a bounded single30second read with an explicit pending state and no fallback',async()=>{
 const h=harness({endpoint,events:[event('event_dash_waitlocal')]});assert.equal(kpiValue(h),'جارٍ القراءة…');assert.match(h.get('reading-context').textContent,/حتى 30 ثانية/);
 assert.equal(h.requests.length,1);const timer=h.timers.find(t=>t.ms===30000);assert.ok(timer);timer.fn();await flush();
 assert.equal(kpiValue(h),'تعذّرت القراءة');assert.equal(h.requests.length,1);assert.equal(h.localReads,0);assert.match(h.get('error').textContent,/خلال 30 ثانية/);
});
test('a requested period wholly before retained coverage is outside coverage instead of zero',async()=>{
 const h=harness({endpoint,sharedSummary:dates=>sharedFor(dates)});await flush();
 const today=h.get('to').value,yesterday=new Date(today+'T12:00:00Z');yesterday.setUTCDate(yesterday.getUTCDate()-1);const past=yesterday.toISOString().slice(0,10);
 h.get('from').value=past;h.get('to').value=past;h.get('from').listeners.change();await flush();
 assert.equal(kpiValue(h),'خارج التغطية');assert.match(h.get('reading-context').textContent,/تسبق التغطية/);assert.equal(h.get('daily-rows').children[0].children[1].textContent,'خارج التغطية');
});
test('empty local log is labelled local saved events and current device mode remains explicit',()=>{
 const off=harness();assert.equal(kpiValue(off),'0');assert.match(off.get('reading-context').textContent,/لا توجد أحداث محفوظة/);assert.match(off.get('device-measurement-state').textContent,/القياس متوقف/);
 const local=harness({preference:'local'});assert.match(local.get('device-measurement-state').textContent,/حفظ محلي فقط/);assert.match(local.get('device-measurement-state').textContent,/لا تُرسل/);
});

test('unavailable local storage is a failed read and never displayed as an empty successful log',()=>{
 const h=harness({storageBlocked:true});assert.equal(kpiValue(h),'تعذّرت القراءة');assert.equal(h.localReads,0);assert.match(h.get('error').textContent,/التخزين المحلي غير متاح/);assert.match(h.get('reading-context').textContent,/لا نعرض صفرًا/);assert.equal(h.get('scenario-topic-detail').hidden,true);
});
