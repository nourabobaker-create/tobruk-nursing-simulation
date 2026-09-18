import assert from 'node:assert/strict';
import {Simulation} from './engine.js';
function prepare(s,reverse=false){
 const actions=[['talk'],['assess'],['hygiene'],['privacy'],['brakes'],['rail'],['helper'],['sheet'],['height',70]];
 for(const a of actions)s.do(...a);
 for(const k of reverse?['leg','nearArm','farArm']:['farArm','nearArm','leg'])s.do(k,85);
 s.do('feet',60);s.do('knees',35);s.do('twist',0);s.do('grip','sheet');
}
function count(s){for(let n=0;n<3;n++)assert.equal(s.do('count').ok,true);}
function finish(s){for(const k of s.supportKeys()){s.do('pickup');s.do('place',k);}s.do('comfort');s.do('height',25);s.do('bell');s.do('hygiene');const e=s.do('finish');assert.deepEqual(e.omitted,[]);assert.equal(e.complete,true);}
let runs=0;
for(const scenario of ['side','prone','slide'])for(const mode of ['learn','challenge'])for(const reverse of [false,true]){
 const s=new Simulation(scenario,mode);prepare(s,reverse);count(s);
 if(scenario==='side')s.do('move',1);else{s.do('move',.5);assert.equal(s.s.progress,.5);assert.equal(s.s.count,0);assert.equal(s.do('move',1).ok,false);
  if(scenario==='prone'){assert.equal(s.do('checkPause').category,'safety');s.do('nearArm',100);s.do('head',75);}
  s.do('checkPause');s.do('grip','sheet');count(s);s.do('move',1);}
 assert.equal(s.s.progress,1);finish(s);s.reset();assert.equal(s.s.progress,0);assert.equal(s.s.log.length,0);assert.equal(s.s.hygiene,false);assert.deepEqual(s.s.supports,{arm:false,leg:false,back:false});runs++;
}
const h=new Simulation();assert.equal(h.do('farArm',100).category,'sequence');assert.equal(h.s.farArm,0);assert.equal(h.do('finish').complete,false);
for(const gate of ['brakes','rail','helper','sheet']){const s=new Simulation();prepare(s);s.s[gate]=false;assert.equal(s.do('move',1).category,'safety');assert.equal(s.s.progress,0);}
for(const [key,v,category] of [['nearArm',0,'sequence'],['height',20,'technique'],['twist',55,'technique'],['grip','shoulder','safety']]){const s=new Simulation();prepare(s);s.s[key]=v;assert.equal(s.do('move',1).category,category);assert.equal(s.s.progress,0);}
const alt=new Simulation();prepare(alt,true);assert(alt.s.log.some(e=>e.category==='alternative'));assert.equal(alt.do('move',1).category,'sequence');count(alt);alt.do('move',1);assert.equal(alt.do('comfort').category,'incomplete');
const resetCount=new Simulation();prepare(resetCount);count(resetCount);resetCount.do('height',72);assert.equal(resetCount.s.count,0);assert.equal(resetCount.do('move',1).category,'sequence');
console.log(`Passed ${runs} complete paths, all four environment safety gates, contact/sequence/technique blocks, alternative limb order, missing supports, fresh counts and clean retries.`);
