// Executes the production renderer and its real event handlers against a small DOM adapter.
// It verifies all authored routes without installing browser packages or sending network data.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const base=path.resolve(__dirname,'..'),nodes=new Map(),listeners={},metrics=[],storage={};
class Node{constructor(id){this.id=id;this.innerHTML='';this.textContent='';this.value='';this.dataset={};this.attrs={};this.classList={toggle(){}};}setAttribute(k,v){this.attrs[k]=v;}focus(){}addEventListener(type,fn){this[type]=fn;}querySelector(sel){if(sel==='h1')return new Node('heading');if(sel==='.feedback')return this.innerHTML.includes('class="feedback ')?new Node('feedback'):null;if(sel[0]==='#')return this.innerHTML.includes('id="'+sel.slice(1)+'"')?node(sel.slice(1)):null;return null;}}
const node=id=>{if(!nodes.has(id))nodes.set(id,new Node(id));return nodes.get(id);};
let hash='';const location={search:'?lang=ar',get hash(){return hash;},set hash(v){hash=v?('#'+v.replace(/^#/,'')):'';listeners.hashchange?.();}};
const document={documentElement:new Node('html'),getElementById:node,querySelectorAll:()=>[],title:''};
const window={addEventListener:(n,f)=>listeners[n]=f,scrollTo(){},speechSynthesis:{cancel(){},speak(){}},PortalMetrics:{record:(...x)=>{metrics.push(x);return true;}}};
const ctx={window,document,location,URLSearchParams,localStorage:{getItem:k=>storage[k],setItem:(k,v)=>storage[k]=v},SpeechSynthesisUtterance:class{constructor(v){this.text=v;}}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync(base+'/data.js','utf8'),ctx);vm.runInContext(fs.readFileSync(base+'/app.js','utf8'),ctx);
const data=window.CLINICAL_SCENARIOS,app=node('app'),click=dataset=>{const b={dataset,closest:()=>b};app.click({target:b});};
assert.equal(data.length,100);assert.equal((node('cards').innerHTML.match(/class="card"/g)||[]).length,100);
click({category:'neonatal'});assert.equal((node('cards').innerHTML.match(/class="card"/g)||[]).length,10);
click({action:'clear'});node('search').oninput({target:{value:'dehydration'}});assert((node('cards').innerHTML.match(/class="card"/g)||[]).length>0);assert((node('cards').innerHTML.match(/class="card"/g)||[]).length<100);click({action:'clear'});
location.hash=data[0].id;let prevented=false;node('skipLink').onclick({preventDefault(){prevented=true;}});assert(prevented);assert.equal(location.hash,'#'+data[0].id);assert(app.innerHTML.includes('id="prompt"'));
let decisions=0;for(const d of data){for(const route of ['smooth','recovery']){location.hash=d.id;click({action:'reset'});for(let i=0;i<7;i++){const step=i<6?d.steps[i]:d.challenge[route];if(route==='recovery'&&i===0){click({answer:String(step.options.findIndex(o=>!o.correct))});assert(app.innerHTML.includes('class="feedback '),d.id);assert(!app.innerHTML.includes('data-action="next"'),d.id);}
 if(i===6)assert(app.innerHTML.includes(route==='smooth'?'نقل التعلم':'استعادة المسار'),d.id+':branch');
 click({answer:String(step.options.findIndex(o=>o.correct))});assert(app.innerHTML.includes('data-action="next"'),d.id+':advance');click({action:'next'});decisions++;}
 assert(app.innerHTML.includes('id="summary-title"'),d.id+':finish');assert.equal((app.innerHTML.match(/<details>/g)||[]).length,7);assert(app.innerHTML.includes('مرجعيات هذا الموضوع'));}}
assert.equal(decisions,1400);assert.equal(metrics.filter(x=>x[0]==='activity_start').length,100);assert.equal(metrics.filter(x=>x[0]==='activity_complete').length,100);assert(metrics.every(x=>x.length===3&&x[2]==='simulations'));
node('reflection').oninput({target:{value:'Private synthetic reflection'}});node('language').onclick();assert.equal(document.documentElement.dir,'ltr');assert(app.innerHTML.includes('Private synthetic reflection'));assert(app.innerHTML.includes('You reviewed this scenario'));click({action:'reset'});assert(!app.innerHTML.includes('Private synthetic reflection'));assert(!app.innerHTML.includes('class="feedback '));assert.deepEqual(Object.keys(storage),['tobruk-simulation-language']);
console.log(JSON.stringify({topics:100,categories:10,adaptive_routes:200,played_decisions:decisions,corrective_retries:100,metrics:'Only topic start/completion; no answers, scores, variants or reflection',language_and_reset:true}));
