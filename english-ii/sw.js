const VERSION='20261012-1';
const REFERENCES_VERSION='20261113';
const ASSESSMENT_VERSION='20261113-assessment-1';
const CACHE='tobruk-english2-five-lessons-'+ASSESSMENT_VERSION;
const ASSETS=['./','./index.html','./course.css?v='+VERSION,'./course-data.js?v='+VERSION,'./course.js?v='+ASSESSMENT_VERSION,'./manifest.webmanifest','./icon.svg',
 '../study-companion/companion.css?v='+VERSION,'../study-companion/qa-corpus.js?v='+VERSION,'../study-companion/tools-core.js?v='+VERSION,'../study-companion/qa-engine.js?v='+VERSION,'../study-companion/course-sources.json?v='+VERSION,
 '../e-library-v3/data/course-references.js?v='+REFERENCES_VERSION,'../study-companion/course-references.css?v='+REFERENCES_VERSION,'../study-companion/course-references.js?v='+REFERENCES_VERSION,
 '../student-learning-hub/data/assessment-weights.js?v='+ASSESSMENT_VERSION,'../study-companion/course-assessment.css?v='+ASSESSMENT_VERSION,'../study-companion/course-assessment.js?v='+ASSESSMENT_VERSION];
const ALLOWED=new Set(ASSETS.map(path=>new URL(path,self.location.href).pathname));
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('tobruk-english2-five-lessons-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const url=new URL(e.request.url);
 // Never intercept or persist third-party translation requests or responses.
 if(url.origin!==self.location.origin||!ALLOWED.has(url.pathname))return;
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));return r}).catch(()=>caches.match('./index.html')));
  return;
 }
 e.respondWith(fetch(e.request).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}return res;}).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
