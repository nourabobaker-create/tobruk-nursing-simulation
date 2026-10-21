(function(){
'use strict';
if(window.PortalMetrics)return;
const C=window.PortalMetricsConfig||{},core=window.PortalMetricsCore;if(!core)return;
const script=document.currentScript,base=new URL('../',script.src),path=location.pathname.startsWith(base.pathname)?location.pathname.slice(base.pathname.length):'';
if(path.startsWith('portal-metrics/'))return;
let parentFrame=null;try{if(window.top!==window.self){if(window.top.location.origin!==location.origin)return;parentFrame=window.frameElement;}}catch(_){return;}
const sessionKey='nur-portal-metrics-session-v1',queueKey='nur-portal-metrics-outbox-v1';
const testMode=(()=>{try{return new URL(location.href).searchParams.get('metrics_test')==='1'||(parentFrame&&new URL(window.top.location.href).searchParams.get('metrics_test')==='1');}catch(_){return true;}})();
const uid=()=>{try{return crypto.randomUUID().replace(/-/g,'');}catch(_){return Date.now().toString(36)+Math.random().toString(36).slice(2,14);}};
const ar=()=>document.documentElement.lang!=='en',t=(a,e)=>ar()?a:e;
let memorySession=null,lastView='',flushBusy=false,message='',started=false;
function sectionFor(p,h=''){
 if(p.startsWith('e-library'))return 'library';if(p.startsWith('clinical-discovery'))return 'atlas';if(p.startsWith('community-health'))return 'community';if(p.startsWith('strategic-plan'))return 'strategy';if(p.startsWith('spss-course'))return 'research';
 if(/^(english-ii|study-companion)\//.test(p))return 'courses';
 if(/^(clinical-simulations|nursing-skills|skills|handwash|clean-gloving|body|patient-positioning|range-of-motion|turning-moving|wound-dressing|safety360)/.test(p))return 'simulations';
 if(p.startsWith('student-learning-hub'))return ({library:'library',simulation:'simulations',english:'courses',spss:'research',guide:'guides'})[h.replace(/^#/,'').split('/')[0]]||'students';
 if(/admission|guide/.test(h))return 'guides';if(/participate/.test(h))return 'services';if(/community/.test(h))return 'community';return 'faculty';
}
function currentSection(){return sectionFor(path,location.hash);}
function visible(){if(document.visibilityState==='hidden')return false;try{if(parentFrame){let el=parentFrame;while(el){const s=el.ownerDocument.defaultView.getComputedStyle(el);if(el.hidden||s.display==='none'||s.visibility==='hidden')return false;el=el.parentElement;}if(!parentFrame.getClientRects().length)return false;}}catch(_){return false;}return true;}
function session(){let s=memorySession;try{s=JSON.parse(sessionStorage.getItem(sessionKey)||'null')||s;}catch(_){}const now=Date.now();if(!s||typeof s.id!=='string'||!/^[A-Za-z0-9_-]{8,80}$/.test(s.id)||!Number.isFinite(s.last)||s.last>now+300000||now-s.last>=1800000)s={id:uid(),last:now};s.last=now;memorySession=s;try{sessionStorage.setItem(sessionKey,JSON.stringify(s));}catch(_){}return s.id;}
function queueRead(){try{const q=JSON.parse(localStorage.getItem(queueKey)||'[]');return Array.isArray(q)?q.map(x=>{const e=core.cleanEvent(x);return e?{...e,_attempts:Number(x._attempts)||0,_lastAttempt:Number(x._lastAttempt)||0}:null;}).filter(e=>e&&Date.now()-Date.parse(e.at)<86400000).slice(-250):[];}catch(_){return [];}}
function queueWrite(q){try{localStorage.setItem(queueKey,JSON.stringify(q.slice(-250)));return true;}catch(_){return false;}}
function record(name,item='',section=currentSection()){
 if(testMode||core.preference()==='off'||!visible())return false;
 const e=core.cleanEvent({id:uid(),session:session(),at:new Date().toISOString(),section,event:name,item,language:ar()?'ar':'en'});if(!e)return false;
 if(!core.append(e)){message=t('تعذّر الحفظ في هذا المتصفح.','Browser storage is unavailable.');render();return false;}
 if(core.preference()==='shared'&&core.endpointValid(C.endpoint)){const q=queueRead();q.push(e);queueWrite(q);}
 return true;
}
function view(){if(!visible()||core.preference()==='off')return;const signature=currentSection()+':'+path+':'+location.hash;if(signature===lastView)return;const item=currentSection()+':'+path.replace(/[^A-Za-z0-9_./:#-]/g,'').slice(0,100);if(record(started?'section_view':'page_view',item.slice(0,120))){lastView=signature;started=true;}render();}
async function flush(){
 if(flushBusy||testMode||core.preference()!=='shared'||!core.endpointValid(C.endpoint)||!navigator.onLine)return;
 const now=Date.now(),pending=queueRead();queueWrite(pending);const batch=pending.filter(e=>e._attempts<3&&now-e._lastAttempt>300000).slice(0,25);if(!batch.length)return;flushBusy=true;
 const ids=new Set(batch.map(e=>e.id));queueWrite(queueRead().map(e=>ids.has(e.id)?{...e,_attempts:e._attempts+1,_lastAttempt:now}:e));
 try{await fetch(C.endpoint,{method:'POST',mode:'no-cors',credentials:'omit',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify({schema:1,events:batch.map(core.cleanEvent)}),keepalive:true,redirect:'follow'});
 // An opaque response is not an acknowledgement. The receiver deduplicates retries.
 // Keep queued events for the next retry; expire after 24h. Do not claim delivery.
 queueWrite(queueRead().filter(e=>now-Date.parse(e.at)<86400000));
 message=t('أُرسلت محاولة المشاركة؛ الاستلام يُتحقّق منه في اللوحة المشتركة.','Sharing attempted; receipt is verified in the shared dashboard.');
 }catch(_){message=t('تعذّر الاتصال؛ تبقى البيانات محلية وتُعاد المحاولة لاحقًا.','Connection failed; data stays local for a later retry.');}finally{flushBusy=false;render();}
}
function setMode(mode){if(mode===core.preference())return true;if(mode==='shared'&&!core.endpointValid(C.endpoint))return false;if(!core.setPreference(mode))return false;if(mode!=='shared')queueWrite([]);if(mode==='off'){memorySession=null;try{sessionStorage.removeItem(sessionKey);}catch(_){}}lastView='';view();render();flush();return true;}
function itemId(el){return String(el.dataset.metricsItem||el.dataset.resourceId||el.dataset.saveId||el.dataset.id||el.id||'').replace(/[^A-Za-z0-9_./:#-]/g,'').slice(0,120);}
document.addEventListener('click',e=>{
 const el=e.target.closest?.('a,button,[data-route],[data-panel],[data-guide]');if(!el||el.closest('[data-portal-metrics-widget]'))return;
 if(el.dataset.metricsEvent){record(el.dataset.metricsEvent,itemId(el));return;}
 const href=el.getAttribute('href');if(href){try{const u=new URL(href,location.href);if(!['http:','https:'].includes(u.protocol))return;if(u.origin===base.origin&&u.pathname.startsWith(base.pathname+'portal-metrics/'))return;
 if(u.hostname==='forms.gle'||(u.hostname==='docs.google.com'&&u.pathname.startsWith('/forms/'))){record('service_open',u.hostname==='forms.gle'?u.pathname.replace(/[^A-Za-z0-9_./:#-]/g,'').slice(0,100):u.pathname.split('/').slice(0,6).join('/').slice(0,120),'services');}
 else if(u.origin!==location.origin||el.download){record('resource_open',itemId(el)||'external-resource');}
 }catch(_){} }
 if(el.matches('[data-route],[data-panel],[data-guide],[data-nav]')||href?.startsWith('#'))setTimeout(view,80);
},true);
window.addEventListener('hashchange',view);window.addEventListener('popstate',view);document.addEventListener('visibilitychange',()=>{view();flush();});window.addEventListener('online',flush);
window.addEventListener('storage',e=>{if(e.key==='nur-portal-metrics-choice-v1'){if(core.preference()==='off'){memorySession=null;try{sessionStorage.removeItem(sessionKey);}catch(_){}}lastView='';view();render();}});
const style=document.createElement('style');style.textContent='.portal-metrics-widget{font:inherit;font-size:14px;line-height:1.8;color:#405c50;background:#f1f6f3;border:1px solid #d4e1d9;border-radius:12px;padding:10px 16px;margin:22px auto;max-width:1060px;text-align:start;box-sizing:border-box}.portal-metrics-widget summary{cursor:pointer;padding:4px;min-height:28px}.portal-metrics-widget p{font:inherit!important;line-height:1.8!important;margin:8px 0!important}.portal-metrics-widget button,.portal-metrics-widget a{font:inherit;display:inline-block;padding:8px 11px;margin:4px;border:1px solid #a8bfb0;background:white;color:#174b3b;border-radius:8px;text-decoration:none;cursor:pointer}.portal-metrics-widget button[aria-pressed=true]{background:#174b3b;color:white}.portal-metrics-widget button:focus-visible,.portal-metrics-widget a:focus-visible{outline:3px solid #b7903c;outline-offset:2px}.portal-metrics-widget .pm-status{font-size:12px!important}.portal-metrics-widget .pm-actions{display:flex;flex-wrap:wrap;gap:2px}';document.head.append(style);
let widget=null,widgetLanguage=null;
function render(){if(!widget)return;widgetLanguage=document.documentElement.lang;const open=widget.open;widget.replaceChildren();widget.open=open;const summary=document.createElement('summary');summary.textContent=t('قياس الاستخدام والاستفادة · اختياري','Usage and usefulness measurement · optional');widget.append(summary);
 const add=(tag,txt,cls)=>{const x=document.createElement(tag);x.textContent=txt;if(cls)x.className=cls;widget.append(x);return x;};
 const mode=core.preference();add('p',t('نسجّل نوع التفاعل والقسم ومعرّف المحتوى والوقت واللغة، مع رمز جلسة عشوائي مؤقت، دون أسماء أو أسئلة أو إجابات. يبدأ القياس باختيارك، ويمكن إيقافه في أي وقت.','We record interaction type, section, content identifier, time and language, with a temporary random session token, without names, questions or answers. Measurement starts when you choose and can be stopped at any time.'));
 add('p',t(mode==='off'?'الحالة: القياس متوقف.':mode==='local'?'الحالة: القياس على هذا الجهاز فقط.':'الحالة: مشاركة اختيارية بإحصاءات مجهولة؛ الاستلام يخضع للاتصال.',mode==='off'?'Status: measurement is off.':mode==='local'?'Status: this device only.':'Status: optional anonymous sharing; delivery depends on connectivity.'),'pm-status');
 const actions=add('div','','pm-actions');function button(label,fn,pressed){const b=document.createElement('button');b.type='button';b.textContent=label;if(pressed!==undefined)b.setAttribute('aria-pressed',String(pressed));b.onclick=fn;actions.append(b);return b;}
 button(t('هذا الجهاز فقط','This device only'),()=>{message='';setMode('local');},mode==='local');if(core.endpointValid(C.endpoint))button(t('مشاركة إحصاءات مجهولة','Share anonymous statistics'),()=>{message='';setMode('shared');},mode==='shared');
 button(t('إيقاف القياس','Stop measurement'),()=>{message='';setMode('off');},mode==='off');button(t('مسح بيانات هذا الجهاز','Clear this device’s data'),()=>{core.clear();memorySession=null;lastView='';started=false;message=t('مُسحت البيانات المحلية وأُوقف القياس. البيانات التي سبق استلامها مركزيًا لا تُحذف بهذا الزر.','Local data cleared and measurement stopped. This does not delete records previously received centrally.');render();});
 const a=document.createElement('a');a.href=new URL('portal-metrics/',base).href;a.textContent=t('لوحة مؤشرات البوابة','Portal dashboard');actions.append(a);
 if(!core.endpointValid(C.endpoint))add('p',t('التجميع المشترك غير مفعّل بعد؛ الأرقام الحالية تخص هذا الجهاز.','Shared collection is not enabled yet; current figures refer to this device.'),'pm-status');
 add('p',t('هل أفادك هذا القسم؟','Was this section useful?'));const feedback=add('div','','pm-actions');for(const [label,event]of[[t('أفادني','Useful'),'feedback_useful'],[t('لم يفدني بعد','Not useful yet'),'feedback_not_useful']]){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=()=>{if(mode==='off'){message=t('اختر أولًا تفعيل القياس على هذا الجهاز لتسجيل إجابتك.','Enable measurement on this device first to record your answer.');render();return;}const k='nur-feedback:'+session()+':'+currentSection();try{if(sessionStorage.getItem(k)){message=t('سُجّل رأيك لهذا القسم في هذه الجلسة.','Your response for this section has already been recorded this session.');render();return;}}catch(_){}if(record(event,'section-usefulness')){try{sessionStorage.setItem(k,'1');}catch(_){}message=t('شكرًا، سُجّل رأيك على هذا الجهاز.','Thank you, your response was recorded on this device.');render();flush();}};feedback.append(b);}
 if(message){const status=add('p',message,'pm-status');status.setAttribute('role','status');}
}
function start(){if(!parentFrame){widget=document.createElement('details');widget.className='portal-metrics-widget';widget.dataset.portalMetricsWidget='1';widget.dataset.noTranslate='1';document.body.append(widget);if(typeof MutationObserver==='function')new MutationObserver(()=>{if(widgetLanguage!==document.documentElement.lang){message='';render();}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}render();view();setInterval(()=>{view();flush();},15000);flush();}
window.PortalMetrics=Object.freeze({record,setMode,sectionFor,flush});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
