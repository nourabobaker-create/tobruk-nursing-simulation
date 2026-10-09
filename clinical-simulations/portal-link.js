/* Additive navigation only. Does not alter any simulation or collect learner data. */
(() => { 'use strict';
 const source=document.currentScript.src, base=new URL('./',source), library=new URL('index.html?v=20261005-ar2',base).href;
 const atlas=new URL('../clinical-discovery/',source).href;
 function bilingualText(ar,en){return document.documentElement.lang==='en'?en:ar;}
 /* Keep the existing hub IDs and bilingual CSS; update only the atlas entry points.
    Text is reapplied after language changes because the host manages static text. */
 function atlasNavigation(){
  const shortcut=document.getElementById('clinical-discovery-shortcut');
  if(shortcut){
   const ar=shortcut.querySelector('.discovery-ar'),en=shortcut.querySelector('.discovery-en');
   if(ar&&ar.textContent!=='📖 أطلس التمريض')ar.textContent='📖 أطلس التمريض';
   if(en&&en.textContent!=='📖 Nursing Atlas')en.textContent='📖 Nursing Atlas';
   shortcut.href=atlas;
   shortcut.setAttribute('aria-label',bilingualText('أطلس التمريض','Nursing Atlas'));
  }
  const card=document.getElementById('clinical-discovery-card');
  if(card){
   const names=[['h2 .discovery-ar','أطلس التمريض'],['h2 .discovery-en','Nursing Atlas'],['.actions .discovery-ar','فتح أطلس التمريض'],['.actions .discovery-en','Open Nursing Atlas'],['.icon','📖']];
   names.forEach(([selector,text])=>{const el=card.querySelector(selector);if(el&&el.textContent!==text)el.textContent=text;});
   card.querySelectorAll('.actions a').forEach(a=>{a.href=atlas;a.setAttribute('aria-label',bilingualText('فتح أطلس التمريض','Open Nursing Atlas'));});
  }
  const full=document.getElementById('libFull');
  if(full&&full.parentElement){
   let link=document.getElementById('libraryNursingAtlasLink');
   if(!link){link=document.createElement('a');link.id='libraryNursingAtlasLink';link.className='btn soft';link.target='_top';link.style.textDecoration='none';full.before(link);}
   link.href=atlas;link.textContent=bilingualText('أطلس التمريض','Nursing Atlas');
  }
 }
 function apply(){const preferred=document.documentElement.lang==='en'?'en':'ar';const localizedLibrary=library+'&lang='+preferred;
  const old=document.getElementById('c1b');
  if(old&&old.parentElement){let a=document.getElementById('advancedSimulationLink');if(!a){a=document.createElement('a');a.id='advancedSimulationLink';a.className='btn primary';a.href=localizedLibrary;a.target='_top';a.style.textDecoration='none';old.parentElement.prepend(a);}a.href=localizedLibrary;a.textContent=bilingualText('المحاكاة المتقدمة · 10 وحدات','Advanced simulations · 10 modules');old.classList.remove('primary');old.textContent=bilingualText('المهارات السبع السابقة','Previous seven skills');const p=document.getElementById('c1p');if(p)p.textContent=bilingualText('عشر محاكاة سريرية تجريبية متقدمة، بالإضافة إلى الوحدات المهارية السبع السابقة.','Ten advanced clinical teaching prototypes, alongside the previous seven skill modules.');}
  const wrap=document.querySelector('.homeWrap');
  if(wrap&&document.getElementById('cards')){let banner=document.getElementById('advancedSimulationBanner');if(!banner){banner=document.createElement('aside');banner.id='advancedSimulationBanner';banner.style.cssText='margin:16px 0;padding:16px 19px;background:#eaf3ed;border:1px solid #cbded0;border-radius:16px;line-height:1.6';const a=document.createElement('a');a.id='advancedSimulationBannerLink';a.href=localizedLibrary;a.target='_top';a.style.cssText='display:block;color:#174b3b;font-weight:800;text-decoration:none';banner.append(a);const p=document.createElement('p');p.id='advancedSimulationBannerNote';p.style.cssText='margin:4px 0 0;color:#4d6256;font-size:14px';banner.append(p);const hero=wrap.querySelector('.hero');if(hero)hero.after(banner);else wrap.prepend(banner);}document.getElementById('advancedSimulationBannerLink').href=localizedLibrary;document.getElementById('advancedSimulationBannerLink').textContent=bilingualText('جديد: المحاكاة المتقدمة — عشر وحدات إضافية ↗','New: Advanced simulations — ten additional modules ↗');document.getElementById('advancedSimulationBannerNote').textContent=bilingualText('نسخ تعليمية تجريبية؛ الوحدات السبع السابقة باقية أدناه دون تغيير.','Trial teaching modules; the original seven skills remain below, unchanged.');}
  atlasNavigation();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
 new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
 document.addEventListener('click',e=>{if(e.target.closest('#langBtn,#homeLanguage,#playerLanguage'))setTimeout(apply,0);});
})();
