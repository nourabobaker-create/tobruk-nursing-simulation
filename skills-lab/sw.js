const CACHE='tobruk-skills-lab-2.0.2';
const ASSETS=['./','./index.html','./style.css?v=202','./app.js?v=202','./engine.js?v=202','./scene.js?v=202','./logo.webp','./manifest.webmanifest','./curriculum-review.html','./curriculum-map.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tobruk-skills-lab-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;e.respondWith(fetch(e.request).then(async r=>{if(r.ok){const c=await caches.open(CACHE);await c.put(e.request,r.clone());}return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||(e.request.mode==='navigate'?caches.match('./index.html'):Response.error()))));});
