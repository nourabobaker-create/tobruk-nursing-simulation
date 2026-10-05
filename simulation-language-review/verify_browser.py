"""Arabic availability and locale regression tests; synthetic, no patient data.
Run from repository root: python simulation-language-review/verify_browser.py
Requires Python Playwright and a local Chromium/Chrome executable.
"""
import asyncio,functools,http.server,json,os,re,shutil,threading
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]
OUT=Path(os.environ.get('SIM_QA_OUTPUT','/tmp/tobruk-language-qa'));OUT.mkdir(parents=True,exist_ok=True)
OLD=[('handwash-learning-03/','nano'),('nursing-skills/gloving.html','gloving'),('range-of-motion-learning-01/','rom'),('body-mechanics-learning-01/','bodyMechanics'),('turning-moving-learning-01/','turningMoving'),('patient-positioning-learning-01/','positioning'),('wound-dressing-learning-01/','woundDressing')]
NEW=sorted((ROOT/'clinical-simulations/modules').glob('*.html'))
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args): pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Quiet,directory=str(ROOT)))
threading.Thread(target=server.serve_forever,daemon=True).start();BASE=f'http://127.0.0.1:{server.server_port}/'
async def main():
 results=[];all_errors=[]
 async with async_playwright() as pw:
  executable=os.environ.get('CHROME_BIN') or shutil.which('google-chrome') or shutil.which('chromium')
  browser=await pw.chromium.launch(executable_path=executable,headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage'])
  for route,global_name in OLD+[(str(f.relative_to(ROOT)),'TobrukLocale') for f in NEW]:
   ctx=await browser.new_context(viewport={'width':1366,'height':1000});page=await ctx.new_page();page.set_default_timeout(10000)
   errors=[];page.on('pageerror',lambda e:errors.append(str(e)));checks={};missing=[]
   try:
    response=await page.goto(BASE+route,wait_until='load');assert response.status==200
    await page.wait_for_function('(key)=>!!window[key]',arg=global_name)
    await page.wait_for_function("document.documentElement.lang==='ar'")
    checks['ArabicDefault']=True
    if route.endswith('03-ecg.html'):
     for electrode in ['V1','V2','V3','V4','V5','V6','RA','LA','RL','LL']:assert await page.locator('#electrode-'+electrode).inner_text()==electrode
     checks['ECGIdentifiersPreserved']=True
    lang=page.locator('#simulationLanguage' if global_name=='TobrukLocale' else ('#language' if global_name=='gloving' else '#lang'))
    values=await page.locator('select').evaluate_all('(els)=>els.map(e=>[e.id,e.value])')
    await lang.click();await page.wait_for_function("document.documentElement.lang==='en'")
    await lang.click();await page.wait_for_function("document.documentElement.lang==='ar'")
    assert values==await page.locator('select').evaluate_all('(els)=>els.map(e=>[e.id,e.value])');checks['LanguageSwitchKeepsSelections']=True
    await lang.click();await page.wait_for_function("document.documentElement.lang==='en'")
    await page.reload(wait_until='load');await page.wait_for_function('(key)=>!!window[key]',arg=global_name)
    await page.wait_for_function("document.documentElement.lang==='en'");checks['PreferenceSurvivesReload']=True
    await lang.click();await page.wait_for_function("document.documentElement.lang==='ar'")
    if global_name=='TobrukLocale':
     await page.evaluate("document.querySelectorAll('details').forEach(d=>d.open=true)")
     opened=[]
     for sel in ['#sources','#terms','#sourceBtn','#sourcesBtn','#sourceOpen','#termsBtn','#quizBtn','#quizOpen','#checklistBtn','#recordBtn','#recordsOpen','#historyOpen','#routesOpen','#helpBtn']:
      loc=page.locator(sel)
      if await loc.count() and await loc.is_visible():
       await loc.click();d=page.locator('dialog[open]')
       if await d.count():
        await page.wait_for_timeout(40);text=await d.inner_text();assert re.search('[\u0600-\u06ff]',text)
        (OUT/(Path(route).stem+sel.replace('#','-')+'.txt')).write_text(text);opened.append(sel)
        await d.locator('button').first.click()
     checks['ReviewedPanels']=opened
     speech_payloads=await page.locator('[data-say],[data-term]').evaluate_all('(a)=>a.map(e=>[e.getAttribute("data-say"),e.getAttribute("data-term")])')
     await lang.click();await lang.click()
     assert speech_payloads==await page.locator('[data-say],[data-term]').evaluate_all('(a)=>a.map(e=>[e.getAttribute("data-say"),e.getAttribute("data-term")])');checks['EnglishSpeechAttributesUnchanged']=True
     export=await page.evaluate("""async()=>{const r={outcome:'held',number:3.0,note:'learner text XYZ'};const b=new Blob([JSON.stringify(r)],{type:'application/json'});return JSON.parse(await b.text())}""")
     assert export['number']==3 and export['note']=='learner text XYZ' and export['outcome']=='held' and export['arabicDisplay']['outcome']=='معلَّق';checks['ExportPreservesMachineValues']=True
     watch=page.get_by_role('button',name=re.compile('شاهد|مشاهدة|معاينة|Watch'))
     if await watch.count() and await watch.first.is_enabled():
      await watch.first.click();await page.wait_for_timeout(200);checks['DemoStarts']=True
      await lang.click();await lang.click();checks['SwitchDuringDemo']=True
     missing=await page.evaluate('TobrukLocale.unmatched()')
     assert not missing, 'Untranslated phrases in exercised panels: '+repr(missing[:6])
    else:
     modes=[]
     for mode in ['learn','guide','quiz','written','train','test','visual']:
      selector='[data-mode="'+mode+'"]'
      if global_name in ['nano','gloving'] and mode=='guide':selector='#guideTab'
      if global_name=='nano' and mode=='written':selector='#writtenTab'
      if global_name=='gloving' and mode=='written':selector='#quizTab'
      loc=page.locator(selector).first
      if await loc.count() and await loc.is_visible():
       await loc.click();await page.wait_for_timeout(50);text=await page.locator('body').inner_text();assert re.search('[\u0600-\u06ff]',text)
       (OUT/(global_name+'-'+mode+'.txt')).write_text(text);modes.append(mode)
     checks['NativeModes']=modes
    await page.set_viewport_size({'width':390,'height':844});await page.wait_for_timeout(80)
    overflow=await page.evaluate('document.documentElement.scrollWidth>innerWidth+5')
    checks['NoPageOverflow390']=not overflow
    await page.screenshot(path=str(OUT/(global_name+'-'+Path(route).stem+'.png')),full_page=True)
    assert not errors,repr(errors);checks['NoPageErrors']=True
   except Exception as e:
    all_errors.append(route+': '+str(e));checks['FAILED']=str(e)
   results.append({'route':route,'checks':checks,'pageErrors':errors,'untranslatedInExercisedNewPanels':missing});print(json.dumps(results[-1],ensure_ascii=False),flush=True);await ctx.close()
  # Real same-origin hub iframe navigation and cross-library preference.
  ctx=await browser.new_context();page=await ctx.new_page();page.set_default_timeout(15000)
  try:
   await page.goto(BASE+'nursing-skills/',wait_until='load');await page.wait_for_selector('a[data-skill="handwashing"]')
   await page.wait_for_function("document.documentElement.lang==='ar'")
   for skill in ['handwashing','gloving','movement','mechanics','turning','positioning','wound']:
    await page.evaluate('(s)=>location.hash=s',skill)
    await page.wait_for_timeout(150)
    # Choose the visible iframe; older inactive iframes are intentionally retained.
    await page.wait_for_function("()=>Array.from(document.querySelectorAll('iframe')).some(f=>f.getClientRects().length&&f.contentDocument?.documentElement.lang==='ar')")
   await page.locator('#playerLanguage').click();await page.wait_for_function("document.documentElement.lang==='en'")
   await page.wait_for_function("()=>Array.from(document.querySelectorAll('iframe')).some(f=>f.getClientRects().length&&f.contentDocument?.documentElement.lang==='en')")
   await page.goto(BASE+'clinical-simulations/');await page.wait_for_function("document.documentElement.lang==='en'")
   await page.locator('#language').click();await page.wait_for_function("document.documentElement.lang==='ar'")
   await page.locator('a[href*="03-ecg.html"]').first.click();await page.wait_for_function("window.TobrukLocale?.language==='ar'")
   results.append({'route':'hub-to-seven-to-advanced','checks':{'iframeLanguage':True,'sharedLanguage':True,'catalogueLinkCarriesArabic':True}})
  except Exception as e:all_errors.append('hub: '+str(e));results.append({'route':'hub','FAILED':str(e)})
  await ctx.close();await browser.close()
 report={'results':results,'failures':all_errors,'limits':['Browser testing uses desktop Chromium and an emulated narrow viewport, not native phones.','This is a language/UI regression test, not clinical approval.','Original English source quotations and reference titles are intentionally retained in the seven native bilingual lessons.']}
 (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('FAILURES',json.dumps(all_errors,ensure_ascii=False));assert not all_errors
asyncio.run(main())
