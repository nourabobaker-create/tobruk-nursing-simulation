'use strict';
/* A run stays in memory. Records are written only by the explicit results form. */
window.CommunitySimulation=(()=>{
 const uuid=()=>globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,12);
 class Run{
  constructor(scenario){this.scenario=scenario;this.id=uuid();this.current=scenario.start;this.decisions=[];this.pending=null;this.complete=false;this.saved=null;}
  choose(id){if(this.complete||this.pending)throw Error('choice-locked');const node=this.scenario.nodes[this.current],choice=node.choices.find(c=>c.id===id);if(!choice)throw Error('invalid-choice');this.decisions.push({node:this.current,choice:choice.id,safe:choice.safe===true,critical:choice.critical===true});this.pending=choice;return choice;}
  advance(){if(!this.pending||this.complete)throw Error('no-choice');const next=this.pending.next;this.pending=null;if(next===null){this.current=null;this.complete=true;}else{if(!this.scenario.nodes[next])throw Error('invalid-branch');this.current=next;}return this.complete;}
  summary(){return{decisions:this.decisions.length,safe:this.decisions.filter(d=>d.safe).length,critical:this.decisions.filter(d=>d.critical).length};}
 }
 class Records{
  constructor(storage){this.storage=storage;this.key='nur-community-simulations-v1';this.rows=[];try{const rows=JSON.parse(storage.getItem(this.key)||'[]');if(Array.isArray(rows))this.rows=rows.filter(r=>r&&typeof r.id==='string'&&Number.isFinite(r.time)&&typeof r.scenario==='string'&&typeof r.scenarioVersion==='string'&&Array.isArray(r.decisions)&&r.decisions.length>0&&r.decisions.every(d=>d&&typeof d.node==='string'&&typeof d.choice==='string'&&typeof d.safe==='boolean'&&typeof d.critical==='boolean'));}catch{}}
  save(run,{consent,release,campaign='',phase='practice',linkPrevious=false}={}){
   if(consent!==true)throw Error('consent-required');if(!run.complete||!run.decisions.length)throw Error('incomplete');if(run.saved)return run.saved;if(this.rows.length>=1000)throw Error('capacity');
   const previous=linkPrevious===true&&[...this.rows].reverse().find(r=>r.scenario===run.scenario.id&&r.scenarioVersion===run.scenario.version&&r.campaign===campaign&&r.release===release&&Date.now()-r.time<30*86400000);
   const row={id:run.id,time:Date.now(),scenario:run.scenario.id,scenarioVersion:run.scenario.version,release,campaign:String(campaign).slice(0,24),phase:phase==='later'?'later':'practice',previousAttempt:previous?previous.id:'',decisions:run.decisions.map(d=>({...d}))};
   const next=[...this.rows,row];this.storage.setItem(this.key,JSON.stringify(next));this.rows=next;run.saved=row;return row;
  }
  summary(){return{attempts:this.rows.length,decisions:this.rows.reduce((n,r)=>n+r.decisions.length,0),linked:this.rows.filter(r=>r.previousAttempt).length,later:this.rows.filter(r=>r.phase==='later').length};}
  clear(){this.storage.removeItem(this.key);this.rows=[];}
  csv(){const columns=['attempt_id','time','scenario','scenario_version','release','campaign','phase','previous_attempt','decision_order','node','choice','safe','critical'];const quote=x=>{let s=String(x??'');if(/^[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';};const rows=this.rows.flatMap(r=>r.decisions.map((d,i)=>[r.id,new Date(r.time).toISOString(),r.scenario,r.scenarioVersion,r.release,r.campaign,r.phase,r.previousAttempt,i+1,d.node,d.choice,d.safe?1:0,d.critical?1:0]));return '\ufeff'+[columns,...rows].map(r=>r.map(quote).join(',')).join('\r\n');}
 }
 return{Run,Records};
})();
