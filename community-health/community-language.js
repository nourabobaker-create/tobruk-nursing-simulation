/* Local, complete English catalogue. Original Arabic remains the default. */
(()=>{
 const code=window.CommunityLocale==='en'?'en':'ar',english=code==='en',dictionary=window.CommunityEnglishText||{},ui=window.CommunityEnglishUI||{};
 const escapeRegex=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const keys=Object.keys(ui).sort((a,b)=>b.length-a.length);
 const uiPattern=keys.length?new RegExp('(^|[^\\p{L}\\p{M}])('+keys.map(escapeRegex).join('|')+')(?=$|[^\\p{L}\\p{M}])','gu'):null;
 const value=s=>english&&typeof s==='string'?(dictionary[s]??ui[s]??s):s;
 function text(s){if(!english||typeof s!=='string')return s;const exact=dictionary[s]??ui[s];if(exact!==undefined)return exact;return uiPattern?s.replace(uiPattern,(_,prefix,key)=>prefix+ui[key]):s;}
 function html(s){if(!english||typeof s!=='string')return s;return s.split(/(<[^>]*>)/g).map(part=>part.startsWith('<')?part.replace(/(\b(?:alt|title|placeholder|aria-label|label)\s*=\s*)(["'])(.*?)\2/g,(_,prefix,q,v)=>prefix+q+text(v).replace(q==='"'?/"/g:/'/g,q==='"'?'&quot;':'&#39;')+q):text(part)).join('');}
 function translateData(v){if(typeof v==='string')return value(v);if(Array.isArray(v))return v.map(translateData);if(v&&typeof v==='object'){for(const k of Object.keys(v))v[k]=translateData(v[k]);}return v;}
 if(english){for(const key of ['COMMUNITY','COMMUNITY_V2','CommunityClassroomStories','CommunityScenarios','CommunityArabicLibrary'])if(window[key])translateData(window[key]);const overrides=window.CommunityFirstAidEnglishById||{};if(window.CommunityScenarios)window.CommunityScenarios.items=window.CommunityScenarios.items.map(s=>overrides[s.id]||s);}
 const attributes=['alt','title','placeholder','aria-label','label'];
 function paint(root=document.body){if(!english||!root||!document.createTreeWalker)return;const nodeFilter=window.NodeFilter?.SHOW_TEXT||4,walker=document.createTreeWalker(root,nodeFilter);let n;while(n=walker.nextNode()){if(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA'].includes(n.parentElement?.tagName)||n.parentElement?.closest('[data-keep-language]'))continue;const next=text(n.nodeValue);if(next!==n.nodeValue)n.nodeValue=next;}
  const elements=[...(root.querySelectorAll?.('*')||[])];if(root.getAttribute)elements.unshift(root);for(const el of elements){if(el.closest?.('[data-keep-language]'))continue;for(const a of attributes){const original=el.getAttribute?.(a);if(original){const next=text(original);if(next!==original)el.setAttribute(a,next);}}}
  if(document.title)document.title=text(document.title);
 }
 function set(next){if(!['ar','en'].includes(next))return;try{localStorage.setItem('nur-community-language',next);}catch{}const url=new URL(location.href);url.searchParams.set('lang',next);location.assign(url.href);}
 window.CommunityLanguage={code,english,value,text,html,paint,set,dateLocale:english?'en-GB':'ar-LY'};
 if(document.querySelector('#languageToggle')){const button=document.querySelector('#languageToggle');button.textContent=english?'العربية':'English';button.lang=english?'ar':'en';button.setAttribute('aria-label',english?'Switch to Arabic':'التبديل إلى الإنجليزية');button.addEventListener('click',()=>set(english?'ar':'en'));}
 paint();if(english&&window.MutationObserver&&document.body){let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;paint();});}).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:attributes});}
 document.documentElement.setAttribute('data-language-ready','true');
})();
