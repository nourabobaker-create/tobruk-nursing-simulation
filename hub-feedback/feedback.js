(function(){
'use strict';
if(window.HubFeedback)return;
const C=window.HubFeedbackConfig||{};
const scriptUrl=document.currentScript?.src;
const rootUrl=scriptUrl?new URL('../',scriptUrl):new URL('../',location.href);
const services=new Set(['portal','simulation','library','community','general']);
const ar=()=>document.documentElement.lang!=='en',t=(a,e)=>ar()?a:e;
const clean=s=>String(s||'').replace(/[^a-zA-Z0-9_./-]/g,'').slice(0,120);
const bounded=s=>String(s||'').replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,650);
function serviceFor(el){
 if(services.has(el?.dataset.feedbackService))return el.dataset.feedbackService;
 const path=location.pathname;
 if(/\/e-library-v3\//.test(path))return 'library';
 if(/\/community-health\//.test(path))return 'community';
 if(/\/(?:clinical-simulations|clinical-discovery|skills360-v2|nursing-skills|skills-lab|body360|safety360|clean-gloving|handwash[^/]*|[^/]+-learning-\d+)\//.test(path))return 'simulation';
 return 'portal';
}
function context(el){
 const topic=clean(el?.dataset.feedbackTopic||'hub-page'),part=clean(el?.dataset.feedbackPart||'page');
 const path=location.pathname.startsWith(rootUrl.pathname)?location.pathname.slice(rootUrl.pathname.length):location.pathname;
 return 'service='+serviceFor(el)+' | topic='+topic+' | part='+part+' | page='+clean(path)+' | version='+clean(C.version||'unversioned');
}
function buildFormUrl(input={}){
 if(!C.ready||!/^entry\.\d+$/.test(C.contextEntry||''))return null;
 // Verified in native Forms: page context belongs in the required topic field, never the comment field.
 if(C.contextEntry===C.commentEntry||C.contextEntry==='entry.2046484445')return null;
 const settings=typeof input==='string'?{context:input}:input;
 const service=services.has(settings.service)?settings.service:'general';
 try{
  const u=new URL(C.formUrl);
  if(u.protocol!=='https:'||u.hostname!=='docs.google.com'||!/^\/forms\/d\/e\/[^/]+\/viewform$/.test(u.pathname))return null;
  let value=bounded(settings.context)||'service='+service+' | topic=feedback-center | version='+clean(C.version);
  if(!/(?:^|\s\|\s)service=/.test(value))value='service='+service+' | '+value;
  u.searchParams.set('usp','pp_url');u.searchParams.set(C.contextEntry,value);
  if(/^entry\.\d+$/.test(C.serviceEntry||'')&&C.serviceValues?.[service])u.searchParams.set(C.serviceEntry,C.serviceValues[service]);
  u.searchParams.set('hl',settings.lang==='en'?'en':(settings.lang==='ar'?'ar':(ar()?'ar':'en')));
  return u.href;
 }catch(e){return null;}
}
function centerLink(el){
 const u=new URL(C.centerPath||'feedback/',rootUrl);
 u.searchParams.set('lang',ar()?'ar':'en');u.searchParams.set('service',serviceFor(el));u.searchParams.set('context',context(el));
 const label=el.dataset[ar()?'feedbackLabelAr':'feedbackLabelEn']||el.dataset.feedbackLabel;
 if(label)u.searchParams.set('label',bounded(label).slice(0,120));
 return u.href;
}
const style=document.createElement('style');
style.textContent='.hub-feedback{font:inherit;font-size:14px;line-height:1.7;margin-top:16px;color:#526b60;text-align:start}.hub-feedback summary{cursor:pointer;display:list-item;width:fit-content;max-width:100%;text-decoration:underline;text-underline-offset:4px;padding:7px 2px}.hub-feedback[open]{border-top:1px solid #dbe7e1;padding-top:8px}.hub-feedback p{font-size:14px!important;line-height:1.8;margin:8px 0!important;max-width:780px}.hub-feedback a{display:inline-block;background:#eaf4ef;color:#174b3b;padding:9px 13px;border:1px solid #bdcfc4;border-radius:9px;text-decoration:none;font-weight:bold;margin:5px 6px 5px 0}.hub-feedback a.hub-feedback-more{background:transparent;border-color:transparent;text-decoration:underline;font-weight:normal}.hub-feedback summary:focus-visible,.hub-feedback a:focus-visible{outline:3px solid #b7903c;outline-offset:3px}.hub-feedback-context{font-size:12px!important;overflow-wrap:anywhere;color:#53675d}.hub-feedback-global{max-width:1100px;margin:18px auto;padding:0 20px}.hub-feedback[hidden]{display:none!important}';
document.head.append(style);
function make(el){
 const wasOpen=el.querySelector('details')?.open||false;el.replaceChildren();
 const d=document.createElement('details');d.className='hub-feedback';d.open=wasOpen;
 const s=document.createElement('summary');s.textContent=t('رأيك في هذا الجزء أو فكرة لتحسينه','Your feedback on this part');d.append(s);
 const lead=document.createElement('p');lead.textContent=t('تقييم قصير، ملاحظة أو اقتراح عن تجربتك. لا نطلب اسمك أو رقمك الدراسي أو بريدك. لا تكتب بيانات أشخاص أو مرضى.','A short rating, comment or suggestion about your experience. We do not ask for your name, student number or email. Do not include personal or patient information.');d.append(lead);
 const label=el.dataset[ar()?'feedbackLabelAr':'feedbackLabelEn']||el.dataset.feedbackLabel||t('هذه الصفحة','This page');
 const pos=document.createElement('p');pos.className='hub-feedback-context';pos.textContent=t('الموضع: ','Location: ')+label;d.append(pos);
 const href=buildFormUrl({context:context(el),service:serviceFor(el)}),a=document.createElement(href?'a':'p');
 if(href){a.href=href;a.target='_blank';a.rel='noopener noreferrer';a.referrerPolicy='no-referrer';a.textContent=t('أرسل رأيك أو قيّم تجربتك ↗','Share feedback or rate your experience ↗');}
 else a.textContent=t('استقبال الملاحظات غير متاح حاليًا.','Feedback is currently unavailable.');d.append(a);
 const more=document.createElement('a');more.className='hub-feedback-more';more.href=centerLink(el);more.textContent=t('طلبات المكتبة وقنوات المشاركة','Library requests and participation');d.append(more);
 const note=document.createElement('p');note.textContent=t('تُرسل المشاركة بعد ضغط «إرسال» في النموذج. الردود غير منشورة. لطلب مصدر أو تقديم شكوى خاصة، اختر القناة المخصصة من مركز المشاركة.','Your response is sent only when you choose Submit in the form. Responses are not public. For a resource request or a private complaint, use its dedicated channel in the participation centre.');d.append(note);
 el.append(d);el.dataset.feedbackMounted='1';
}
function mount(root=document){root.querySelectorAll('[data-feedback-topic]').forEach(make);}
function pageFeedback(){
 const el=document.querySelector('[data-hub-page-feedback]');if(!el)return;
 const panel=document.querySelector('.panel.active');el.dataset.feedbackTopic=clean(panel?.id||'student-hub');el.dataset.feedbackPart='page';
 const h=panel?.querySelector('h1,h2,h3');el.dataset.feedbackLabel=h?.textContent?.trim().slice(0,100)||document.title;make(el);
}
function refresh(){mount();pageFeedback();}
window.HubFeedback=Object.freeze({mount,refresh,buildFormUrl,getContext:context,getService:serviceFor});
function start(){
 refresh();new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});window.addEventListener('hashchange',pageFeedback);
 document.addEventListener('click',e=>{if(e.target.closest('[data-route],#langBtn,#homeBtn'))setTimeout(pageFeedback,50);});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
