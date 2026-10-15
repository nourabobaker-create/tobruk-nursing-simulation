'use strict';
(() => {
 const KEY='nur-community-survey-v1';
 const LIMIT=1000;
 const RATINGS={
  ease:['easy','some','hard','nottried',''],
  clarity:['clear','some','unclear','notread',''],
  usefulness:['useful','others','limited','unsure','']
 };
 const ISSUES=['display','audio','search','simulation','offline','slow','other'];
 const own=(x,k)=>Object.prototype.hasOwnProperty.call(x,k);
 function string(value,max,fallback='') {
  if(value===undefined)return fallback;
  if(typeof value!=='string')throw Error('invalid');
  const clean=value.trim();
  if([...clean].length>max)throw Error('invalid');
  return clean;
 }
 function fields(input) {
  if(!input||typeof input!=='object'||Array.isArray(input))throw Error('invalid');
  const row={
   instrument:string(input.instrument,40,'community-pilot-v1'),
   release:string(input.release,40),
   context:string(input.context,120),
   kind:string(input.kind,64,'general')||'general'
  };
  for(const key of Object.keys(RATINGS)) {
   row[key]=input[key]===undefined?'':input[key];
   if(!RATINGS[key].includes(row[key]))throw Error('invalid');
  }
  const issues=input.issues===undefined?[]:input.issues;
  if(!Array.isArray(issues)||issues.some(x=>!ISSUES.includes(x)))throw Error('invalid');
  row.issues=[...new Set(issues)];
  row.comment=string(input.comment,700);
  row.suggestion=string(input.suggestion,300);
  if(!row.ease&&!row.clarity&&!row.usefulness&&!row.issues.length&&!row.comment&&!row.suggestion)throw Error('empty');
  return row;
 }
 function restore(value) {
  try {
   if(!value||typeof value.id!=='string'||!value.id||!Number.isFinite(value.time)||value.time<0) return null;
   const row=fields(value);
   const updated=own(value,'updated')?value.updated:value.time;
   if(!Number.isFinite(updated)||updated<value.time)return null;
   return {id:value.id,time:value.time,updated,...row};
  }catch{return null;}
 }
 function newId() {
  return globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,14);
 }
 function quote(value) {
  let text=String(value??'');
  // Spreadsheet applications may ignore leading whitespace before a formula.
  if(/^[\s\uFEFF]*[=+@-]/u.test(text)||/^[\t\r\n]/u.test(text))text="'"+text;
  return '"'+text.replace(/"/g,'""')+'"';
 }
 window.CommunitySurvey=class CommunitySurvey {
  constructor(storage) {
   this.storage=storage;
   this.key=KEY;
   this.rows=[];
   try {
    const raw=JSON.parse(storage.getItem(KEY)||'[]');
    if(Array.isArray(raw)) {
     const seen=new Set();
     this.rows=raw.map(restore).filter(row=>{
      if(!row||seen.has(row.id))return false;
      seen.add(row.id);return true;
     });
    }
   }catch{}
  }
  save(input,{consent=false,id}={}) {
   if(consent!==true)throw Error('consent');
   const values=fields(input);
   const updating=id!==undefined;
   if(updating&&(typeof id!=='string'||!id))throw Error('invalid');
   const index=updating?this.rows.findIndex(row=>row.id===id):-1;
   if(updating&&index<0)throw Error('not-found');
   if(!updating&&this.rows.length>=LIMIT)throw Error('capacity');
   const previous=index>=0?this.rows[index]:null;
   const now=Date.now();
   const row={id:previous?previous.id:newId(),time:previous?previous.time:now,updated:previous?Math.max(now,previous.time):now,...values};
   const next=this.rows.slice();
   if(index>=0)next[index]=row;else next.push(row);
   this.storage.setItem(this.key,JSON.stringify(next));
   this.rows=next;
   return row;
  }
  clear() {
   this.storage.removeItem(this.key);
   this.rows=[];
  }
  summary() {
   return {
    records:this.rows.length,
    easeEvaluated:this.rows.filter(row=>['easy','some','hard'].includes(row.ease)).length,
    easy:this.rows.filter(row=>row.ease==='easy').length,
    clarityEvaluated:this.rows.filter(row=>['clear','some','unclear'].includes(row.clarity)).length,
    clear:this.rows.filter(row=>row.clarity==='clear').length,
    usefulnessEvaluated:this.rows.filter(row=>['useful','others','limited'].includes(row.usefulness)).length,
    useful:this.rows.filter(row=>row.usefulness==='useful').length
   };
  }
  csv() {
   const cols=['id','time','updated','instrument','release','context','kind','ease','clarity','usefulness','issues','comment','suggestion'];
   const rows=this.rows.map(row=>cols.map(key=>key==='time'||key==='updated'?new Date(row[key]).toISOString():key==='issues'?row.issues.join(' | '):row[key]));
   return '\ufeff'+[cols,...rows].map(row=>row.map(quote).join(',')).join('\r\n');
  }
 };
})();
