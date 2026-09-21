// Run: PLAYWRIGHT_MODULE=/path/to/playwright CHROME_BIN=/path/to/chrome node skills360-v2/tests/browser.cjs
// The test owns its HTTP server, supports isolated execution environments, and never uses a CDN.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const http=require('http'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..');const results=[];
const mime={'.mjs':'text/javascript','.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{let p=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(p.endsWith('/'))p+='index.html';fs.readFile(p,(e,b)=>{if(e){res.writeHead(404);res.end();}else{res.writeHead(200,{'Content-Type':mime[path.extname(p)]||'application/octet-stream'});res.end(b);}});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=`http://127.0.0.1:${server.address().port}/skills360-v2/`;const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN,args:['--no-sandbox']});try{
 for(const mobile of [false,true]){const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:1000},isMobile:mobile,hasTouch:mobile,deviceScaleFactor:1});const page=await context.newPage();page.setDefaultTimeout(6000);let errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(url);await page.waitForFunction(()=>document.querySelector('#offline').textContent==='Ready offline');
 const tap=async id=>{let l=page.locator(`[data-object="${id}"]`).first();if(mobile)await l.tap();else await l.click();};
 const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('tobruk-skills360-v2')).s);
 const seed=async(kind,extra={})=>{await page.evaluate(async({kind,extra})=>{let e=await import('./engine.mjs');let s=kind==='fresh'?e.fresh():e.checkpoint(kind);Object.assign(s,extra);localStorage.setItem('tobruk-skills360-v2',JSON.stringify({stage:2,lesson:0,s,station:kind==='removal'?'gloves':'sink',rationale:[]}));},{kind,extra});await page.reload();};
 const cdp=mobile?await context.newCDPSession(page):null;
 const rub=async(area,seconds=2.2)=>{let loc=page.locator(`[data-area="${area}"] ellipse`).first();let b=await loc.boundingBox();assert.ok(b,area+' visible');let x=b.x+b.width/2,y=b.y+b.height/2;
 if(mobile)await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});else{await page.mouse.move(x,y);await page.mouse.down();}
 for(let i=0;i<Math.ceil(seconds/.12);i++){await page.waitForTimeout(120);let xx=x+(i%2?3:-3);if(mobile)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:xx,y}]});else await page.mouse.move(xx,y);}
 if(mobile)await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});else await page.mouse.up();};
 const report=name=>{results.push(`${mobile?'touch 390×844':'mouse 1440×1000'}: ${name} PASS`);console.log(results.at(-1));};
 await seed('fresh');await tap('faucet');await tap('stream');await tap('soap');assert.ok((await state()).soap);report('water → wet → soap');await page.screenshot({path:`/tmp/tobruk-${mobile?'phone':'desktop'}-sink.png`});
 await seed('fresh');await tap('soap');assert.match(await page.locator('#feedback').innerText(),/wet/);await tap('faucet');await tap('stream');await tap('soap');assert.ok((await state()).soap);report('incorrect soap recovery');
 // Prepared friction fixture isolates UI recovery after early drying.
 const prepared=await page.evaluate(async()=>{const e=await import('./engine.mjs');let s=e.fresh();for(let a of ['water','wet','soap'])s=e.transition(s,a);for(let area of Object.keys(s.areas))for(let i=0;i<2;i++)s=e.transition(s,'rub',{area,seconds:1});return s;});
 await seed('fresh',prepared);await tap('towel');assert.match(await page.locator('#feedback').innerText(),/rinse/);await tap('stream');await tap('towel');assert.ok((await state()).dry);await tap('towelBarrier');await tap('faucet');assert.ok((await state()).clean);report('early dry → rinse → dry → protected faucet');

 await seed('fresh',{...prepared,areas:{...prepared.areas,'left.fingertips':0}});await tap('stream');assert.match(await page.locator('#feedback').innerText(),/left.fingertips/);await page.getByRole('button',{name:'Focus hands',exact:true}).click();await rub('left.fingertips',1.4);await page.getByRole('button',{name:'Full station',exact:true}).click();await tap('stream');assert.ok((await state()).rinsed,JSON.stringify(await state()));report('missed area repaired through real rubbing gesture');
 await seed('fresh');await tap('watch');await tap('faucet');await tap('temperature');await tap('stream');await tap('soap');await page.getByRole('button',{name:'Focus hands',exact:true}).click();
 for(let area of ['palms','fingers','fingertips','knuckles','wrists','forearms','nails'])for(let hand of ['left','right'])await rub(hand+'.'+area);
 await tap('turnHands');for(let hand of ['left','right'])await rub(hand+'.backs');await page.getByRole('button',{name:'Full station',exact:true}).click();await tap('stream');let normal=await state();assert.ok(normal.rinsed,JSON.stringify(normal.areas));await tap('towel');await tap('towelBarrier');await tap('faucet');assert.ok((await state()).clean);report('full normal handwash using real gestures and elapsed friction');
 await seed('faucet');await tap('faucet');assert.ok(!(await state()).clean);assert.ok(await page.locator('[fill="#cf7449"]').count());await tap('faucet');await tap('stream');await tap('soap');assert.ok((await state()).soap);report('visible faucet recontamination + recovery');
 await seed('removal');await tap('firstCuff');await tap('outerGlove');assert.ok((await state()).freeze);assert.ok(await page.locator('[fill="#cf7449"]').count());await page.getByRole('button',{name:'TRY THIS MOVEMENT AGAIN',exact:true}).click();assert.equal((await state()).gloves,2);await tap('firstCuff');await tap('innerCuff');await tap('bag');await tap('bag');await tap('bin');assert.ok((await state()).disposed);report('glove contamination → targeted retry → disposal');
 await page.screenshot({path:`/tmp/tobruk-${mobile?'phone':'desktop'}-gloves.png`});
 await page.getByRole('button',{name:'Finish attempt',exact:true}).click();assert.ok(await page.getByRole('heading',{name:'Contamination events',exact:true}).count());await page.getByRole('button',{name:'Final faucet movement',exact:true}).click();// Inspect the targeted fixture through its scene; saved history is updated by the next action.
 assert.ok(await page.locator('[data-object="faucet"]').count());report('debrief + targeted faucet scene');
 await page.getByRole('button',{name:'DO IT YOURSELF',exact:true}).click();assert.equal(await page.getByRole('button',{name:'A little help',exact:true}).count(),0);assert.equal(await page.locator('#rubLabel:not([hidden])').count(),0);report('independent mode removes procedural hints');
 // Offline reload and faculty source content must still work.
 await context.setOffline(true);await page.reload();await page.getByRole('button',{name:'Faculty review',exact:true}).click();await page.getByRole('heading',{name:'FACULTY REVIEW REQUIRED',exact:true}).waitFor();assert.match(await page.locator('#modalBody').innerText(),/10–30/);report('offline reload + locally cached curriculum');
 assert.deepEqual(errors,[]);report('no browser runtime errors');await context.close();
 }
 fs.writeFileSync('/tmp/tobruk-browser-results.json',JSON.stringify(results,null,2));
 }finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
