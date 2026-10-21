/* Bounded activity hooks; never read or send answer text, search text or scores. */
(function(){
'use strict';
const seen=new Set();
document.addEventListener('click',function(e){
 const api=window.PortalMetrics;if(!api)return;
 const el=e.target.closest?.('button');if(!el||el.disabled)return;
 const path=location.pathname;
 if(path.includes('/clinical-discovery/')&&el.hasAttribute('data-field')){
  if(!/^\d{1,3}$/.test(el.dataset.field))return;
  const item='atlas:field'+el.dataset.field;
  if(!seen.has(item)&&api.record('activity_start',item,'atlas'))seen.add(item);
 }
 if(path.includes('/english-ii/')){
  const lesson=location.hash.slice(1);if(!window.ENGLISH2_DATA?.lessons?.some(l=>l.id===lesson))return;
  let suffix='';
  if(el.matches('.checkQ')&&document.querySelector('input[name="'+lesson+'q'+Number(el.dataset.i)+'"]:checked'))suffix='q'+Number(el.dataset.i);
  if(el.matches('.checkScenario')&&document.querySelector('input[name="'+lesson+'scenario"]:checked'))suffix='scenario';
  if(!suffix)return;
  const item='english-ii:'+lesson+':'+suffix;
  if(!seen.has(item)&&api.record('activity_start',item,'courses'))seen.add(item);
 }
},true);
})();
