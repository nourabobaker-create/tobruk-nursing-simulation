const {chromium} = require('/tmp/hub-browser/node_modules/playwright');
const fs = require('fs');
const assert = require('assert');
const base = (process.env.HUB_BASE_URL || 'http://127.0.0.1:8765/').replace(/\/?$/, '/');
const report = {base, checks: [], errors: []};
const out = process.env.HUB_TEST_OUTPUT || '/tmp/hub-identity-results';
fs.mkdirSync(out, {recursive:true});
const yes=(name)=>{report.checks.push(name); console.log('PASS:',name);};
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1});
   const page=await ctx.newPage();
   page.on('pageerror',e=>report.errors.push({width,message:e.message}));
   await page.goto(base,{waitUntil:'domcontentloaded'});
   await page.waitForSelector('#faculty-identity');
   assert.equal(await page.locator('meta[name="faculty-hub-identity-version"]').getAttribute('content'),'20261005-identity-1');
   assert((await page.locator('#heroTitle').innerText()).includes('بوابة كلية التمريض'));
   assert.equal(await page.locator('.identityMeaning').count(),4);
   await page.locator('a.identityLogoLink').click();
   await page.locator('.identityFigure img').waitFor();
   await page.waitForFunction(()=>{const x=document.querySelector('.identityFigure img');return x.complete&&x.naturalWidth>0;});
   assert(await page.locator('#identityTitle .identity-ar').isVisible());
   assert(!(await page.locator('#identityTitle .identity-en').isVisible()));
   const dimensions=await page.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth}));
   assert(dimensions.scroll<=dimensions.w+2,JSON.stringify(dimensions));
   await page.screenshot({path:out+'/faculty-ar-'+width+'.png',fullPage:true});
   yes('Arabic logo section, original image and no horizontal overflow at '+width+'px');
   await page.locator('#langBtn').click();
   assert.equal(await page.locator('html').getAttribute('lang'),'en');
   assert(await page.locator('#identityTitle .identity-en').isVisible());
   assert(!(await page.locator('#identityTitle .identity-ar').isVisible()));
   assert((await page.locator('#heroTitle').innerText()).includes('Faculty of Nursing Hub'));
   assert((await page.locator('.identityMeanings').innerText()).includes('wheat branches'));
   const en=await page.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth}));
   assert(en.scroll<=en.w+2,JSON.stringify(en));
   await page.screenshot({path:out+'/faculty-en-'+width+'.png',fullPage:true});
   yes('English logo translation and responsive layout at '+width+'px');
   await ctx.close();
  }
  for(const suffix of ['student-learning-hub/','student-learning-hub/index.html','student-learning-hub/#home','faculty-portal/']){
   const ctx=await browser.newContext();const page=await ctx.newPage();
   await page.goto(base+suffix,{waitUntil:'domcontentloaded'});
   await page.waitForURL(u=>u.pathname===new URL(base).pathname);
   await page.waitForSelector('#heroTitle');
   assert((await page.locator('#heroTitle').innerText()).includes('بوابة كلية التمريض'));
   yes('Fresh entry '+suffix+' opens Faculty Hub first');
   await page.locator('#studentBtn').click();
   await page.waitForURL('**/student-learning-hub/?entry=faculty');
   await page.waitForSelector('#facultyBreadcrumb');
   await page.reload({waitUntil:'domcontentloaded'});
   assert(new URL(page.url()).pathname.endsWith('/student-learning-hub/'));
   await page.locator('#facultyBreadcrumb a').click();
   await page.waitForSelector('#faculty-identity');
   assert.equal(new URL(page.url()).pathname,new URL(base).pathname);
   yes('Student button, refresh and return-to-Faculty link work after '+suffix);
   await ctx.close();
  }
  {
   const ctx=await browser.newContext();const page=await ctx.newPage();
   await page.goto(base+'student-learning-hub/#library',{waitUntil:'domcontentloaded'});
   await page.waitForSelector('#facultyBreadcrumb');
   assert(new URL(page.url()).pathname.endsWith('/student-learning-hub/'));
   yes('Learning-section deep link is not diverted');await ctx.close();
  }
  {
   const ctx=await browser.newContext();
   await ctx.addInitScript(()=>{Storage.prototype.getItem=function(){throw Error('Storage blocked for test');};Storage.prototype.setItem=function(){throw Error('Storage blocked for test');};});
   const page=await ctx.newPage();
   await page.goto(base+'student-learning-hub/',{waitUntil:'domcontentloaded'});
   await page.waitForURL(u=>u.pathname===new URL(base).pathname);
   await page.locator('#studentBtn').click();
   await page.waitForURL('**/student-learning-hub/?entry=faculty');
   await page.reload({waitUntil:'domcontentloaded'});
   assert(new URL(page.url()).pathname.endsWith('/student-learning-hub/'));
   yes('Faculty-first navigation still works with blocked browser storage');await ctx.close();
  }
  {
   const ctx=await browser.newContext({javaScriptEnabled:false});const page=await ctx.newPage();
   await page.goto(base,{waitUntil:'domcontentloaded'});
   assert(await page.locator('#identityTitle .identity-ar').isVisible());
   assert.equal(await page.locator('.identityMeaning').count(),4);
   yes('Main hub and logo meanings remain readable without JavaScript');await ctx.close();
  }
  report.passed=true;
 }catch(e){report.passed=false;report.failure=String(e.stack||e);console.error(e);process.exitCode=1;}
 finally{fs.writeFileSync(out+'/report.json',JSON.stringify(report,null,2));await browser.close();}
})();
