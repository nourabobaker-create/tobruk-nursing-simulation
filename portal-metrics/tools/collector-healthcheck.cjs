'use strict';
// Three bounded diagnostic requests. No event IDs, sessions or telemetry exist
// in this probe. The empty POST is rejected before the collector opens a sheet.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const TIMEOUT_MS=20000;
const sections=new Set(['faculty','students','library','simulations','atlas','courses','guides','community','services','research','strategy']);
const events=new Set(['page_view','section_view','resource_open','service_open','activity_start','activity_complete','feedback_useful','feedback_not_useful']);
const summaryFields=new Set(['schema','mode','ready','generatedAt','collectionStartedAt','timezone','from','to','coverageFrom','partialCoverage','retentionDays','rows','sessions','engagedSessions','sectionSessions','engagedSectionSessions','feedbackResponses','formsConnected','collection','sessionMeaning','coverage','truncated']);
function object(v){return !!v&&typeof v==='object'&&!Array.isArray(v);}
function safeError(code){const e=new Error(code);e.safeCode=code;throw e;}
function validateSummary(v){
 if(!object(v)||v.schema!==1||v.mode!=='shared')safeError('unexpected_summary_contract');
 if(v.ready!==true)safeError('collector_not_ready');
 if(Object.keys(v).some(k=>!summaryFields.has(k)))safeError('unexpected_or_private_summary_fields');
 if(!Array.isArray(v.rows)||v.rows.length>1000)safeError('unexpected_summary_rows');
 for(const row of v.rows){if(!object(row)||Object.keys(row).sort().join(',')!=='count,day,event,section'||!/^\d{4}-\d{2}-\d{2}$/.test(row.day)||!sections.has(row.section)||!events.has(row.event)||!Number.isSafeInteger(row.count)||row.count<0)safeError('unexpected_or_private_row_fields');}
 for(const key of ['sectionSessions','engagedSectionSessions'])if(v[key]!==undefined){if(!object(v[key])||Object.entries(v[key]).some(([k,n])=>!sections.has(k)||!Number.isSafeInteger(n)||n<0))safeError('unexpected_or_private_section_fields');}
 for(const key of ['sessions','engagedSessions','feedbackResponses'])if(!Number.isSafeInteger(v[key])||v[key]<0)safeError('invalid_aggregate_counts');
 if(v.from!==v.to||!/^\d{4}-\d{2}-\d{2}$/.test(v.from))safeError('unexpected_summary_period');
 return {schema:1,ready:true,mode:'shared',privateFieldsAbsent:true};
}
function validateRejection(v){if(!object(v)||Object.keys(v).sort().join(',')!=='error,ok'||v.ok!==false||v.error!=='invalid_batch')safeError('unexpected_empty_batch_response');return {emptyBatchRejected:true,telemetryEventsSent:0};}
function endpointFromConfig(){
 const source=fs.readFileSync(path.resolve(__dirname,'../config.js'),'utf8'),match=source.match(/\bendpoint\s*:\s*(['"])(https:[^'"\s]+)\1/);
 if(!match)safeError('collector_endpoint_not_configured');const u=new URL(match[2]);
 if(u.protocol!=='https:'||u.hostname!=='script.google.com'||!/^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(u.pathname)||u.search||u.hash||u.username||u.password)safeError('invalid_collector_endpoint');return u;
}
async function probe(name,url,{method='GET',jsonp=false}={}){
 const controller=new AbortController(),started=Date.now();let expired=false,httpStatus=null;
 const timer=setTimeout(()=>{expired=true;controller.abort();},TIMEOUT_MS);
 try{
  const response=await fetch(url,{method,redirect:'follow',signal:controller.signal,credentials:'omit',headers:method==='POST'?{'Content-Type':'text/plain;charset=UTF-8'}:{Accept:jsonp?'application/javascript':'application/json'},...(method==='POST'?{body:'{"schema":1,"events":[]}'}:{})});httpStatus=response.status;
  if(!response.ok)safeError('http_'+response.status);
  if(new URL(response.url).hostname==='accounts.google.com')safeError('authentication_required');
  const contentType=(response.headers.get('content-type')||'').toLowerCase();
  if(jsonp&&!/(javascript|ecmascript)/.test(contentType))safeError('unexpected_jsonp_mime');
  if(!jsonp&&!contentType.includes('application/json'))safeError(contentType.includes('html')?'html_or_access_response':'unexpected_json_mime');
  const text=await response.text();if(text.length>160000)safeError('response_too_large');let data;
  if(jsonp){const wrapper=text.match(/^\s*pmHealthProbe\(([\s\S]*)\);\s*$/);if(!wrapper)safeError('invalid_jsonp_wrapper');try{data=JSON.parse(wrapper[1]);}catch{safeError('invalid_jsonp_json');}}
  else{try{data=JSON.parse(text);}catch{safeError('invalid_json');}}
  const validation=method==='POST'?validateRejection(data):validateSummary(data);
  return {check:name,ok:true,httpStatus,milliseconds:Date.now()-started,...validation,...(jsonp?{callbackWrapperValid:true}: {})};
 }catch(error){return {check:name,ok:false,httpStatus,milliseconds:Date.now()-started,error:expired?'timeout':error.safeCode||'network_error'};}
 finally{clearTimeout(timer);}
}
function selfTest(){
 const sample={schema:1,mode:'shared',ready:true,from:'2026-10-22',to:'2026-10-22',rows:[],sessions:0,engagedSessions:0,feedbackResponses:0,sectionSessions:{simulations:0},engagedSectionSessions:{simulations:0}};
 assert.equal(validateSummary(sample).privateFieldsAbsent,true);assert.throws(()=>validateSummary({...sample,item:'forbidden'}));assert.throws(()=>validateSummary({...sample,rows:[{day:'2026-10-22',section:'simulations',event:'activity_start',count:1,session:'forbidden'}]}));assert.throws(()=>validateSummary({...sample,ready:false}));assert.equal(validateRejection({ok:false,error:'invalid_batch'}).telemetryEventsSent,0);assert.throws(()=>validateRejection({ok:true,accepted:0}));assert.equal(endpointFromConfig().hostname,'script.google.com');
 console.log(JSON.stringify({check:'probe_contract_self_test',ok:true,checks:7,networkRequests:0}));
}
async function main(){
 if(process.argv.includes('--self-test')){selfTest();return;}
 let endpoint;try{endpoint=endpointFromConfig();}catch(error){console.log(JSON.stringify({check:'configuration',ok:false,error:error.safeCode||'invalid_configuration'}));process.exitCode=1;return;}
 if(typeof fetch!=='function'){console.log(JSON.stringify({check:'runtime',ok:false,error:'fetch_not_available'}));process.exitCode=1;return;}
 const summary=new URL(endpoint);summary.searchParams.set('action','summary');summary.searchParams.set('days','1');
 const callback=new URL(summary);callback.searchParams.set('callback','pmHealthProbe');
 const checks=[await probe('aggregate_summary',summary),await probe('dashboard_jsonp',callback,{jsonp:true}),await probe('empty_batch_rejection',endpoint,{method:'POST'})];
 for(const result of checks)console.log(JSON.stringify(result));
 console.log(JSON.stringify({check:'overall',ok:checks.every(x=>x.ok),requests:3,telemetryEventsSent:0,retries:0,timeoutPerRequestMs:TIMEOUT_MS}));if(checks.some(x=>!x.ok))process.exitCode=1;
}
if(require.main===module)main().catch(()=>{console.log(JSON.stringify({check:'probe',ok:false,error:'unexpected_probe_error'}));process.exitCode=1;});
module.exports={validateSummary,validateRejection,probe};
