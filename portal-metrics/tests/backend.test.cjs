'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../backend/Code.gs'),'utf8');
function harness(){
 const sheets={},properties={},triggers=[];
 class Sheet{
  constructor(){this.rows=[];}
  getLastRow(){return this.rows.length;}
  getMaxRows(){return Math.max(1000,this.rows.length);}
  insertRowsAfter(){}
  getRange(row,col,n=1,m=1){const self=this;return {
   getValues(){return Array.from({length:n},(_,i)=>Array.from({length:m},(_,j)=>self.rows[row+i-1]?.[col+j-1]??''));},
   setValues(values){for(let i=0;i<values.length;i++){self.rows[row+i-1]??=[];for(let j=0;j<values[i].length;j++)self.rows[row+i-1][col+j-1]=values[i][j];}return this;},
   setNumberFormat(){return this;}
  };}
  setFrozenRows(){}
  deleteRows(start,count){this.rows.splice(start-1,count);}
 }
 const ss={getId:()=> 'private_id',getSheetByName:n=>sheets[n],insertSheet:n=>(sheets[n]=new Sheet())};
 const props={getProperty:k=>properties[k]??null,setProperty(k,v){properties[k]=v;},setProperties(p){Object.assign(properties,p);}};
 const lock={waitLock(){},tryLock(){return true;},releaseLock(){}};
 const c={Date,Number,Object,Array,String,Math,JSON,RegExp,isFinite,isNaN,Error,
  Utilities:{formatDate(d,zone){return new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).format(d);}},
  PropertiesService:{getScriptProperties:()=>props},
  SpreadsheetApp:{openById:()=>ss,create:()=>ss},
  ScriptApp:{getProjectTriggers:()=>triggers,newTrigger(name){const t={getHandlerFunction:()=>name,timeBased(){return this;},everyDays(){return this;},atHour(){return this;},create(){triggers.push(this);return this;}};return t;}},
  LockService:{getScriptLock:()=>lock},Logger:{log(){}},
  ContentService:{MimeType:{JSON:'json',JAVASCRIPT:'js'},createTextOutput(text){return {text,setMimeType(type){this.type=type;return this;}};}}
 };
 vm.createContext(c);vm.runInContext(source,c);c.setupPortalMetrics();
 return {c,sheets,properties,lock,triggers};
}
const h=harness(),c=h.c;
let count=0;function test(name,fn){fn();count++;process.stdout.write('✓ '+name+'\n');}
const ev=(id='event_123456',changes={})=>({id,session:'session_123456',at:new Date().toISOString(),section:'library',event:'resource_open',item:'catalog/item-1',language:'ar',...changes});
const post=events=>JSON.parse(c.doPost({postData:{contents:JSON.stringify({schema:1,events})}}).text);
const summary=p=>JSON.parse(c.doGet({parameter:p||{}}).text);
test('setup is idempotent and retains events',()=>{assert.equal(h.triggers.length,1);assert.deepEqual(post([ev()]),{ok:true,accepted:1,duplicates:0,rejected:0,limited:0});c.setupPortalMetrics();assert.equal(h.sheets.events.rows.length,2);assert.equal(h.triggers.length,1);});
test('same event id is deduplicated across requests and within batch',()=>{const r=post([ev(),ev('event_234567'),ev('event_234567')]);assert.equal(r.accepted,1);assert.equal(r.duplicates,2);});
test('rejects PII-shaped extras, formula items, unknown event names and timestamps',()=>{const r=post([ev('event_bad111',{email:'a@example.test'}),ev('event_bad222',{item:'=IMPORTXML(1)'}),ev('event_bad333',{event:'complaint_submitted'}),ev('event_bad444',{at:'not-a-date'})]);assert.equal(r.accepted,0);assert.equal(r.rejected,4);});
test('rejects oversized batch and invalid JSON',()=>{assert.equal(post(Array.from({length:26},(_,i)=>ev('event_many'+i))).error,'invalid_batch');assert.equal(JSON.parse(c.doPost({postData:{contents:'{'}}).text).error,'invalid_json');});
test('public summaries contain aggregates and no raw identifiers',()=>{const r=summary({days:'7'});assert.equal(r.mode,'shared');assert.equal(r.sessions,1);assert.equal(r.engagedSessions,1);assert.equal(r.sectionSessions.library,1);assert.equal(r.rows[0].count,2);assert.equal(r.formsConnected,false);const raw=JSON.stringify(r);assert.equal(raw.includes('event_123456'),false);assert.equal(raw.includes('session_123456'),false);assert.equal(raw.includes('private_id'),false);});
test('JSONP callback accepts simple identifier and rejects executable input',()=>{assert.match(c.doGet({parameter:{callback:'pmCallback_1'}}).text,/^pmCallback_1\(/);assert.equal(JSON.parse(c.doGet({parameter:{callback:'alert(1)//'}}).text).error,'invalid_callback');});
test('validates date windows and max retention period',()=>{assert.equal(summary({days:'0'}).error,'invalid_period');assert.equal(summary({days:'91'}).error,'invalid_period');assert.equal(summary({from:'2026-02-30',to:'2026-03-01'}).error,'invalid_period');assert.equal(summary({from:'2026-01-01',to:'2026-10-01'}).error,'invalid_period');});
test('busy lock produces retry instruction without duplicate writes',()=>{h.lock.tryLock=()=>false;assert.equal(post([ev('event_busy123')]).error,'busy_retry_same_ids');h.lock.tryLock=()=>true;assert.equal(post([ev('event_busy123')]).accepted,1);});
test('session daily and global caps bound accepted events',()=>{const original=c.PM;c.PM={...original,MAX_SESSION_DAILY_EVENTS:3,MAX_DAILY_EVENTS:4};assert.equal(post([ev('event_cap123')]).limited,1);assert.equal(post([ev('event_cap234',{session:'session_second'})]).accepted,1);assert.equal(post([ev('event_cap345',{session:'session_third'})]).limited,1);c.PM=original;});
test('retention removes expired records and does not delete headers',()=>{const old=new Date(Date.now()-100*86400000);h.sheets.events.rows.splice(1,0,['old_event','old_session',old.toISOString(),old.toISOString(),c.day_(old),'library','page_view','','ar']);c.prunePortalMetrics();assert.equal(h.sheets.events.rows[0][0],'event_id');assert.equal(h.sheets.events.rows.some(r=>r[0]==='old_event'),false);});
test('row cap signals incomplete coverage after trimming',()=>{const original=c.PM;c.PM={...original,MAX_ROWS:2};post([ev('event_trim123',{session:'session_fourth'})]);assert.ok(h.sheets.events.rows.length<=3);assert.ok(h.properties.PM_TRIMMED_BEFORE);assert.equal(summary({days:'30'}).partialCoverage,true);c.PM=original;});
test('public failures suppress private file IDs and stack traces',()=>{h.properties.PM_SPREADSHEET_ID='';const r=summary();assert.equal(r.ready,false);assert.equal(JSON.stringify(r).includes('private_id'),false);});
process.stdout.write(count+' backend tests passed.\n');
