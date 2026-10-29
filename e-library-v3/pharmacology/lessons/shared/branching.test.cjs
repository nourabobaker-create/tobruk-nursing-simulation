/* Validate every authored branch and preserve incident history through review/rewind. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {PathSession} = require('./engine.js');
const root=path.dirname(__dirname);
let totalRoutes=0,totalChoices=0;
function bilingual(v,where){assert(v&&typeof v.ar==='string'&&v.ar.trim()&&typeof v.en==='string'&&v.en.trim(),where+' must be bilingual');}
for(const slug of ['insulin-safety','anticoagulant-safety','opioid-safety']){
 const data=JSON.parse(fs.readFileSync(path.join(root,slug,'lesson.json'),'utf8'));
 assert.equal(data.id,slug);bilingual(data.title,slug);assert.equal(data.cases.length,3);assert.equal(data.errorChains.length,3);
 const sourceIds=new Set(data.sources.map(s=>s.id));assert.equal(sourceIds.size,data.sources.length);
 for(const source of data.sources){assert.equal(new URL(source.url).protocol,'https:');bilingual(source.scope,'source scope');}
 for(const c of data.concepts){bilingual(c.title,'concept title');bilingual(c.body,'concept body');for(const id of c.sourceIds||[])assert(sourceIds.has(id));}
 for(const chain of data.errorChains){for(const key of ['title','tinyStep','mechanism','harm','breakPoint'])bilingual(chain[key],'error chain '+key);for(const id of chain.sourceIds||[])assert(sourceIds.has(id));}
 for(const c of data.cases){
  bilingual(c.title,'case title');bilingual(c.summary,'case summary');bilingual(c.order,'case order');for(const r of c.record){bilingual(r.label,'record label');bilingual(r.value,'record value');}
  const nodes=new Map(c.nodes.map(n=>[n.id,n]));assert.equal(nodes.size,c.nodes.length);assert(nodes.has(c.start));const reached=new Set(),routes=[];
  function visit(id,route,ancestors){assert(!ancestors.has(id),'Cycle in '+slug+'/'+c.id+'/'+id);const node=nodes.get(id);assert(node,'Missing node '+id);reached.add(id);if(node.type==='debrief'){bilingual(node.title,'debrief title');bilingual(node.body,'debrief body');routes.push(route);return;}assert.equal(node.type,'decision');bilingual(node.scene,'node scene');bilingual(node.prompt,'node prompt');assert(node.choices.length>=2);assert.equal(new Set(node.choices.map(x=>x.id)).size,node.choices.length);for(const choice of node.choices){for(const k of ['text','feedback','consequence'])bilingual(choice[k],'choice '+k);assert(['protect','miss','exposure','escalate'].includes(choice.effect));for(const sid of choice.sourceIds||[])assert(sourceIds.has(sid),'Unknown source '+sid);visit(choice.next,[...route,{node:id,choice}],new Set([...ancestors,id]));}}
  visit(c.start,[],new Set());assert.equal(reached.size,nodes.size,'Unreachable authored node');assert(routes.some(r=>r.some(s=>s.choice.effect==='miss'||s.choice.effect==='exposure')),'No error path');assert(routes.some(r=>r.some(s=>s.choice.effect==='protect')),'No prevention path');
  for(const route of routes){const s=new PathSession(c);assert.equal(s.started,false);s.start();for(const step of route){assert.equal(s.nodeId,step.node);assert(s.choose(step.choice.id));assert.equal(s.nodeId,step.node,'Selection must show consequence before advancing');assert.equal(s.choose(step.choice.id),false,'Duplicate choice must not alter path');assert(s.advance());}assert(s.ended);assert.deepEqual(s.snapshot().path.map(x=>x.effect),route.map(x=>x.choice.effect));assert.equal(s.path.filter(p=>p.effect==='exposure').length,route.filter(x=>x.choice.effect==='exposure').length);const snap=JSON.stringify(s.snapshot());if(route.length){assert(s.rewind(0));assert.equal(s.nodeId,c.start);assert.equal(s.path.length,0);assert.equal(s.selected,null);assert.equal(s.ended,false);}s.reset();assert.equal(s.started,false);assert(snap.includes('endId'));}
  totalRoutes+=routes.length;totalChoices+=c.nodes.filter(n=>n.type==='decision').reduce((v,n)=>v+n.choices.length,0);
 }
 const generated=fs.readFileSync(path.join(root,slug,'index.html'),'utf8');assert(!generated.includes('PLACEHOLDER'));assert(!/<iframe|<video|<audio|<img\b/i.test(generated));const scripts=[...generated.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);assert.equal(scripts.length,2);scripts.forEach(s=>new vm.Script(s));
}
console.log(JSON.stringify({lessons:3,cases:9,authoredChoices:totalChoices,completePaths:totalRoutes,checks:'bilingual, all nodes reachable, all paths terminate, evidence links, exposure history, rewind, self-contained scripts'}));
