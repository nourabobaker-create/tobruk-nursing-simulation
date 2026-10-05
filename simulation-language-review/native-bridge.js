/* Shared language preference for the seven existing bilingual lessons.
   Uses each lesson's own Arabic rendering and does not replace clinical logic. */
(()=>{'use strict';if(window.__tobrukNativeLocale)return;window.__tobrukNativeLocale=true;
const key='tobruk-simulation-language';let initial=false,mutating=false;
function requested(){try{let q=new URL(document.baseURI).searchParams.get('lang');if(q==='en'||q==='ar')return q;let s=localStorage.getItem(key);if(s==='en'||s==='ar')return s;}catch(e){}return 'ar';}
function save(){try{const l=document.documentElement.lang;if(l==='ar'||l==='en')localStorage.setItem(key,l);}catch(e){}}
function start(){if(initial||mutating)return;const b=document.getElementById('lang')||document.getElementById('language')||document.getElementById('homeLanguage');if(!b)return;if(b.id==='homeLanguage'&&!document.querySelector('.skillCard'))return;mutating=true;initial=true;if(document.documentElement.lang!==requested())b.click();save();mutating=false;}
const observer=new MutationObserver(()=>{if(!initial)start();else save();});observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['lang']});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
