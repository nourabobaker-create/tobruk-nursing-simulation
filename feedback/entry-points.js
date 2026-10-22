(function(){
'use strict';
if(window.NursingParticipationEntry)return;
const script=document.currentScript;
if(!script?.src)return;
const centre=new URL('./',script.src);
const topics={portal:'faculty-portal',learning:'student-learning-hub',library:'digital-library',simulation:'clinical-simulations',community:'nursing-for-community'};
const requested=script.dataset.feedbackService;
const section=Object.prototype.hasOwnProperty.call(topics,requested)?requested:'portal';
const service=section==='learning'?'portal':section;
const protectedForms=[
 '1SRA82yXSH1QpRkz5',
 '1FAIpQLScY3fhP2cmr4wTvohViZG9F40dtCwOjK15TgNpCcGbEmBMZIw',
 '1FAIpQLScgpKlUwcn7uZKHLLpWGfDWqfTtUfK8BiKAsj437ePUxQOWIQ',
 '7hL3bUsMV7K3ZdPD7','N5byC3sLV8obtxd88',
 '1FAIpQLSfPVrc2vHj5gMZ8n7uXuW9Qt2HkB5gu6MdODuTDbKl_v4Io5A',
 '1FAIpQLScYOpfU6UKKg8Ku8dGfR8W6dyD1aXQLyoPJs1Jp3myenwcAag',
 '1FAIpQLSfi9bib4uOn8O0qkKNK3hV13Z2Z3bV4BinsMtaDlhjxbS8aIg'
];
const clean=s=>String(s||'').replace(/[^A-Za-z0-9_./-]/g,'').slice(0,160);
const english=()=>document.documentElement.lang==='en';
function link(){
 const u=new URL(centre.href);
 u.searchParams.set('service',service);
 u.searchParams.set('lang',english()?'en':'ar');
 // Only the public pathname is carried over; search values and fragments stay here.
 const relative=location.pathname.startsWith(new URL('../',script.src).pathname)?location.pathname.slice(new URL('../',script.src).pathname.length):'';
 u.searchParams.set('context','service='+service+' | topic='+topics[section]+' | part=page | page='+clean(relative)+' | version=20261022-unified-1');
 return u.href;
}
function isLegacy(a){
 const raw=a.getAttribute('href')||'';
 if(protectedForms.some(id=>raw.includes(id)))return false;
 let u;try{u=new URL(raw,location.href);}catch(_){return false;}
 const form=u.hostname==='forms.gle'||(u.hostname==='docs.google.com'&&u.pathname.startsWith('/forms/'));
 if(!form)return false;
 // Only identified old opinion routes are consolidated. Other surveys retain their own cycles.
 if(/\/(?:1JCBy_IWgYycvP7PByZZWSiNK-GDBYh3DsEy_f5cnsvY|1MMW466Ck9Gqfw6z6KzayRe6UnzmCiERmvqeENiNExPA|128cgqyCv2J6xoR4vI22KpJvIvoD-4amWH5C04SxixKE)(?:\/|$)/.test(u.pathname))return true;
 return /صوتك\s+للتحسين|(?:تقييم|رأيك\s+في)\s+(?:تجربة\s+)?(?:بوابة|البوابة)|your\s+voice\s+for\s+improvement|(?:rate|evaluate)\s+(?:the\s+)?(?:student\s+|faculty\s+)?(?:hub|portal)/i.test(a.textContent||'');
}
function route(a){if(isLegacy(a)){a.setAttribute('href',link());a.setAttribute('data-participation-routed','1');}}
function refresh(){
 const a=document.getElementById('nursingParticipationLink');
 const description=document.getElementById('nursingParticipationDescription');
 const nav=document.getElementById('nursingParticipationEntry');
 if(a){a.href=link();a.textContent=english()?'Surveys and requests ↗':'الاستبانات والطلبات ↗';}
 if(description)description.textContent=english()?'Feedback, resource requests and private concerns':'رأي وتقييم، طلب مصدر، أو ملاحظة خاصة';
 if(nav){nav.dir=english()?'ltr':'rtl';nav.setAttribute('aria-label',english()?'Participation channels':'قنوات المشاركة');}
 document.querySelectorAll('a[href]').forEach(route);
}
function mount(){
 if(!document.body||document.getElementById('nursingParticipationEntry'))return;
 const style=document.createElement('style');
 style.textContent='.nursing-participation-entry{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:10px 20px;flex-wrap:wrap;max-width:1120px;margin:12px auto;padding:12px 18px;background:#f2f7f4;border:1px solid #d3e2da;border-radius:12px;font:inherit;line-height:1.6;color:#36594a}.nursing-participation-entry a{color:#164f3b!important;font:inherit;font-weight:800;text-decoration:underline;text-underline-offset:4px;padding:4px 0}.nursing-participation-entry span{font-size:14px}.nursing-participation-entry a:focus-visible{outline:3px solid #a88439;outline-offset:4px;border-radius:4px}@media(max-width:1160px){.nursing-participation-entry{margin-inline:16px}}@media(max-width:560px){.nursing-participation-entry{display:block;padding:10px 14px}.nursing-participation-entry span{display:block;margin-top:3px}}';
 document.head.append(style);
 const nav=document.createElement('nav');nav.id='nursingParticipationEntry';nav.className='nursing-participation-entry';nav.setAttribute('data-keep-language','');
 const a=document.createElement('a');a.id='nursingParticipationLink';a.dataset.metricsEvent='service_open';a.dataset.metricsItem='participation-center-'+section;
 const description=document.createElement('span');description.id='nursingParticipationDescription';
 nav.append(a,description);
 const header=document.querySelector('header');
 if(header)header.insertAdjacentElement('afterend',nav);else document.body.prepend(nav);
 refresh();
 document.addEventListener('click',event=>{const a=event.target.closest?.('a[href]');if(a)route(a);},true);
 new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
}
window.NursingParticipationEntry=Object.freeze({refresh});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
