(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;else root.PortalMetricsCore=api;})(typeof window!=='undefined'?window:globalThis,function(root){
'use strict';
const sections=Object.freeze({faculty:'بوابة الكلية',students:'بوابة الطالب',library:'المكتبة الرقمية',simulations:'المحاكاة والمهارات',atlas:'أطلس التمريض',courses:'المقررات ورفيق الدراسة',guides:'الأدلة والقبول',community:'خدمة المجتمع',services:'الخدمات والاستبيانات',research:'البحث والتدريب البحثي',strategy:'الخطة الاستراتيجية'});
const events=Object.freeze(['page_view','section_view','resource_open','service_open','activity_start','activity_complete','feedback_useful','feedback_not_useful']);
const meaningful=new Set(['resource_open','service_open','activity_start','activity_complete','feedback_useful','feedback_not_useful']);
const key='nur-portal-metrics-events-v1',prefKey='nur-portal-metrics-choice-v1';
const config=root.PortalMetricsConfig||{};
function day(value){try{return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Tripoli',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));}catch(_){return '';}}
function validDate(v){return typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&!isNaN(Date.parse(v+'T12:00:00Z'))&&new Date(v+'T12:00:00Z').toISOString().slice(0,10)===v;}
function cleanEvent(e){if(!e||typeof e!=='object'||!Object.hasOwn(sections,e.section)||!events.includes(e.event))return null;
 if(typeof e.id!=='string'||typeof e.session!=='string'||!/^[A-Za-z0-9_-]{8,80}$/.test(e.id)||!/^[A-Za-z0-9_-]{8,80}$/.test(e.session))return null;
 const at=typeof e.at==='number'?e.at:Date.parse(e.at);if(!Number.isFinite(at)||at>Date.now()+300000||at<Date.now()-90*86400000)return null;
 if(e.item!=null&&(typeof e.item!=='string'||(!/^[A-Za-z0-9_./:#-]{0,120}$/.test(e.item)||/^[=+@-]/.test(e.item))))return null;
 return {id:e.id,session:e.session,at:new Date(at).toISOString(),section:e.section,event:e.event,item:e.item||'',language:e.language==='en'?'en':'ar'};
}
function storageAvailable(){try{const k='nur-metrics-test';root.localStorage.setItem(k,'1');root.localStorage.removeItem(k);return true;}catch(_){return false;}}
function readEvents(){try{const raw=JSON.parse(root.localStorage.getItem(key)||'[]');if(!Array.isArray(raw))return [];const seen=new Set();return raw.map(cleanEvent).filter(e=>e&&!seen.has(e.id)&&seen.add(e.id));}catch(_){return [];}}
function writeEvents(rows){try{root.localStorage.setItem(key,JSON.stringify(rows.slice(-(config.maxLocalEvents||12000))));return true;}catch(_){return false;}}
function append(event){const e=cleanEvent(event);if(!e)return false;const all=readEvents();if(all.some(x=>x.id===e.id))return true;all.push(e);return writeEvents(all);}
function preference(){try{const p=root.localStorage.getItem(prefKey);return ['local','shared'].includes(p)?p:'off';}catch(_){return 'off';}}
function setPreference(p){if(!['off','local','shared'].includes(p))return false;try{root.localStorage.setItem(prefKey,p);return true;}catch(_){return false;}}
function clear(){try{root.localStorage.removeItem(key);root.localStorage.removeItem('nur-portal-metrics-outbox-v1');root.localStorage.setItem(prefKey,'off');try{root.sessionStorage.removeItem('nur-portal-metrics-session-v1');for(let i=root.sessionStorage.length-1;i>=0;i--){const k=root.sessionStorage.key(i);if(k&&k.startsWith('nur-feedback:'))root.sessionStorage.removeItem(k);}}catch(_){}return true;}catch(_){return false;}}
function aggregate(all,range={}){
 const from=range.from||day(Date.now()-29*86400000),to=range.to||day(Date.now());if(!validDate(from)||!validDate(to)||from>to)throw Error('invalid_range');
 const unique=new Map();(Array.isArray(all)?all:[]).forEach(e=>{const c=cleanEvent(e);if(c)unique.set(c.id,c);});
 const source=[...unique.values()],items=source.filter(e=>day(e.at)>=from&&day(e.at)<=to);
 const sessions=new Set(),engaged=new Set(),sectionSessions={},engagedSectionSessions={},counts=new Map();
 for(const e of items){sessions.add(e.session);(sectionSessions[e.section]??=new Set()).add(e.session);if(meaningful.has(e.event)){engaged.add(e.session);(engagedSectionSessions[e.section]??=new Set()).add(e.session);}const k=[day(e.at),e.section,e.event].join('|');counts.set(k,(counts.get(k)||0)+1);}
 const rows=[...counts].sort().map(([k,count])=>{const [day,section,event]=k.split('|');return {day,section,event,count};});
 const toCounts=o=>Object.fromEntries(Object.entries(o).map(([k,v])=>[k,v.size]));
 return {schema:1,mode:'local',generatedAt:new Date().toISOString(),collectionStartedAt:source.length?source.map(e=>e.at).sort()[0]:null,from,to,rows,sessions:sessions.size,engagedSessions:engaged.size,sectionSessions:toCounts(sectionSessions),engagedSectionSessions:toCounts(engagedSectionSessions),feedbackResponses:items.filter(e=>e.event.startsWith('feedback_')).length,coverage:'opt_in',truncated:source.length>=(config.maxLocalEvents||12000)};
}
function endpointValid(url){try{const u=new URL(url);return u.protocol==='https:'&&u.hostname==='script.google.com'&&/^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(u.pathname)&&!u.username&&!u.password&&!u.search&&!u.hash;}catch(_){return false;}}
return Object.freeze({sections,events,day,validDate,cleanEvent,readEvents,append,aggregate,preference,setPreference,clear,storageAvailable,endpointValid});
});
