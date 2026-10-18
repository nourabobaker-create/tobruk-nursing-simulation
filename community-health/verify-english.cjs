/* English integration regression checks using the existing non-browser fixture.
 * Text checks model CommunityLanguage.paint's text-node and accessible-attribute
 * pass, because the fixture intentionally has no browser TreeWalker/observer.
 * No external form is submitted and no browser/device compatibility is claimed.
 */
const fs=require('fs'),path=require('path'),assert=require('assert');
const root=__dirname,original=fs.readFileSync(path.join(root,'verify.cjs'),'utf8');
const prefix=original.slice(0,original.indexOf('(async()=>'));
assert(prefix.includes('function runtime('),'Existing fixture prefix must be available');
const {runtime,indexMarkup}=new Function('require','__dirname',prefix+'\nreturn {runtime,indexMarkup};')(require,__dirname);
const arabic=/[\u0600-\u06ff]/,issues=[],missing=new Map(),checks=[];
function decode(s){return s.replace(/&(?:amp|lt|gt|quot|apos|#39|#160|nbsp);|&#(?:x[\da-f]+|\d+);/gi,t=>{const values={'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'",'&#39;':"'",'&nbsp;':' ','&#160;':' '};return values[t]??String.fromCodePoint(t[2].toLowerCase()==='x'?parseInt(t.slice(3,-1),16):parseInt(t.slice(2,-1),10));});}
function addIssue(route,kind,ar,rendered=ar){const signature=[route,kind,rendered].join('|');if(issues.some(x=>x.signature===signature))return;issues.push({signature,route,kind,ar,rendered});if(arabic.test(rendered))missing.set(rendered,{ar:rendered,contexts:[...(missing.get(rendered)?.contexts||[]),route]});}
function translated(r,s){return r.eval('Language.text('+JSON.stringify(s)+')');}
function inspectMarkup(r,markup,route){
 const stack=[],voids=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);let skip=0,keep=0;
 for(const token of markup.matchAll(/<!--[\s\S]*?-->|<\/?[a-z][^>]*>|[^<]+/gi)){
  const raw=token[0];if(raw.startsWith('<!--'))continue;
  if(raw.startsWith('</')){const tag=raw.match(/^<\/([a-z0-9]+)/i)?.[1].toLowerCase();let at=stack.map(x=>x.tag).lastIndexOf(tag);if(at>=0)for(const frame of stack.splice(at)){skip-=frame.skip;keep-=frame.keep;}continue;}
  if(raw.startsWith('<')){const tag=raw.match(/^<([a-z0-9]+)/i)?.[1].toLowerCase();const attrs={};for(const m of raw.matchAll(/([\w-]+)(?:=(['"])(.*?)\2)?/gs))attrs[m[1]]=decode(m[3]??'');const hidden=Object.hasOwn(attrs,'hidden')||attrs['aria-hidden']==='true'||tag==='script'||tag==='style'||tag==='noscript';const preserve=Object.hasOwn(attrs,'data-keep-language');
   if(!skip&&!hidden&&!keep&&!preserve)for(const a of ['alt','title','placeholder','aria-label','label'])if(attrs[a]){const rendered=translated(r,attrs[a]);if(arabic.test(rendered))addIssue(route,a,attrs[a],rendered);}
   if(!voids.has(tag)&&!raw.endsWith('/>')){const frame={tag,skip:hidden?1:0,keep:preserve?1:0};stack.push(frame);skip+=frame.skip;keep+=frame.keep;}continue;
  }
  const value=decode(raw).trim();if(value&&!skip&&!keep){const rendered=translated(r,value);if(arabic.test(rendered))addIssue(route,'visible text',value,rendered);}
 }
}
function inspect(r,route){inspectMarkup(r,r.html(),route);for(const [id,e]of r.elements)if(id!=='main'&&e._html&&!e.hidden)inspectMarkup(r,e._html,route+' #'+id);for(const [id,e] of r.elements)if(e.textContent&&!e.hidden&&id!=='languageToggle'){const value=translated(r,e.textContent);if(arabic.test(value))addIssue(route,'dynamic text #'+id,e.textContent,value);}const title=r.context.document.title||'';if(arabic.test(translated(r,title)))addIssue(route,'document title',title,translated(r,title));}
const testForm={url:'https://docs.google.com/forms/d/e/test-community-survey/viewform',contextEntry:'entry.12345'};
(async()=>{
 const r=runtime({'nur-community-language':'en'},{surveyForm:testForm});assert.equal(r.eval('Language.code'),'en');assert.equal(r.context.document.documentElement.lang,'en');assert.equal(r.context.document.documentElement.dir,'ltr');
 inspectMarkup(r,indexMarkup,'persistent shell');
 const articleIds=Array.from(r.eval('ARTICLES.map(a=>a.id)')),storyIds=Array.from(r.eval('window.CommunityClassroomStories.map(s=>s.id)')),scenarioIds=Array.from(r.eval('window.CommunityScenarios.items.map(s=>s.id)'));
 assert.equal(articleIds.length,197);assert.equal(storyIds.length,12);assert.equal(scenarioIds.length,32);
 for(const hash of ['home','updates','urgent','workers','kids','saved','feedback','measure=diabetes&stage=before','measure=diabetes&stage=after','measure=diabetes&stage=followup','about','dashboard','students','install-help','library','classroom','simulations','topic=missing','story=missing','sim=missing','measure=missing']){r.route('#'+hash);inspect(r,'#'+hash);}
 for(const id of articleIds){r.route('#topic='+id);inspect(r,'#topic='+id);for(const stage of ['before','after','followup']){r.route('#measure='+id+'&stage='+stage);inspect(r,'#measure='+id+'&stage='+stage);}}
 checks.push('197 topic pages and all 591 assessment stages');
 for(const id of articleIds){const text=r.eval('Language.text(articleText(byId['+JSON.stringify(id)+']))');if(arabic.test(text))for(const run of text.matchAll(/[\u0600-\u06ff][\u0600-\u06ff\s،؛؟:]+/g))addIssue('#topic='+id+' full audio','audio label',run[0].trim());}
 r.route('#home');await r.click({'data-save':'diabetes'});r.route('#saved');inspect(r,'#saved with diabetes');assert(r.html().includes('#topic=diabetes'));await r.click({'data-save':'diabetes'});inspect(r,'#saved after removal');
 const measurementForm={id:'measureForm',dataset:{topic:'diabetes'},values:{stage:'before',answer:'0',confidence:'1',behavior:'notyet',campaign:'EN-TEST',consent:'on'}};r.route('#measure=diabetes&stage=before');await r.handlers.submit({target:measurementForm,preventDefault(){}});inspect(r,'#measure=diabetes result before');measurementForm.values.stage='after';await r.handlers.submit({target:measurementForm,preventDefault(){}});inspect(r,'#measure=diabetes result after');

 for(const id of storyIds){r.route('#story='+id);inspect(r,'#story='+id);}
 checks.push('all 12 complete classroom stories');
 for(const id of storyIds){const text=r.eval('Language.text(classroomStoryText(storyById['+JSON.stringify(id)+']))');if(arabic.test(text))for(const run of text.matchAll(/[\u0600-\u06ff][\u0600-\u06ff\s،؛؟:]+/g))addIssue('#story='+id+' full audio','audio label',run[0].trim());}

 let nodes=0,choices=0,paths=0;
 for(const id of scenarioIds){const scenario=r.eval('scenarioById['+JSON.stringify(id)+']');for(const [nodeId,node]of Object.entries(scenario.nodes)){
  r.route('#sim='+id);r.eval('simulationRun.current='+JSON.stringify(nodeId)+';simulationRun.pending=null;simulationRun.complete=false;renderSimulation()');inspect(r,'#sim='+id+' node '+nodeId);nodes++;
  for(const choice of node.choices){r.eval('simulationRun.pending='+JSON.stringify(choice)+';renderSimulation()');inspect(r,'#sim='+id+' node '+nodeId+' choice '+choice.id);choices++;}
 }
 for(const mode of ['safe','unsafe']){r.route('#sim='+id);r.eval('simulationRun=new window.CommunitySimulation.Run(scenarioById['+JSON.stringify(id)+']);renderSimulation()');let guard=0;while(!r.eval('simulationRun.complete')&&guard++<40){const choice=r.eval('simulationRun.scenario.nodes[simulationRun.current].choices.find(c=>'+(mode==='safe'?'c.safe':'!c.safe')+')||simulationRun.scenario.nodes[simulationRun.current].choices[0]');await r.click({'data-sim-choice':choice.id});await r.click({id:'simNext'});}assert(guard<40,'Scenario terminates '+id+'/'+mode);inspect(r,'#sim='+id+' result '+mode);paths++;}
 }
 checks.push(`32 scenarios: ${nodes} nodes, ${choices} feedback choices, ${paths} complete sample paths`);
 r.route('#home');await r.click({id:'allTopics'});for(const [term,id] of [['diabetes','diabetes'],['gout','gout'],['Parkinson','parkinson'],['blood donation','blood-donation'],['sunscreen','sunscreen']]){await r.handlers.input({target:{id:'search',value:term}});if(!r.elements.get('cards').innerHTML.includes('#topic='+id))addIssue('#home search '+term,'search','Expected '+id+' among search results');inspect(r,'#home search '+term);}
 for(const h of r.eval('R.healthHubs')){await r.click({'data-health-hub':h.value});if(!r.elements.get('cards').innerHTML.includes('class="story-card"'))addIssue('#home field '+h.key,'filter','No visible cards for '+h.label);inspect(r,'#home field '+h.key);}
 checks.push('English topic search and all health field filters');
 r.route('#library');await r.click({id:'resetLibrary'});for(const [term,kind]of [['diabetes','article'],['bullying','article'],['play','any']]){await r.handlers.input({target:{id:'librarySearch',value:term}});if(!r.eval('arabicLibraryCards().length'))addIssue('#library search '+term,'search','No library matches');inspect(r,'#library search '+term);}
 r.eval("libraryQuery='';libraryCategory='all';libraryAudience='all';libraryKind='all';libraryVisible=1000;arabicLibraryResults()");inspect(r,'#library all resources');assert.equal(r.eval('libraryAllItems().length'),112);
 for(const preset of ['stories','teacher','preschool','environment','brain','firstaid','teen','mental']){r.eval('applyLibraryPreset('+JSON.stringify(preset)+')');if(!r.eval('arabicLibraryCards().length'))addIssue('#library preset '+preset,'filter','No library matches');inspect(r,'#library preset '+preset);}
 checks.push('112 library entries, English search, and all eight presets');
 const from=r.spoken.length;r.route('#topic=diabetes');await r.click({id:'readTopic'});let audioSteps=0;while(r.eval('speechActive')&&audioSteps++<1000)r.spoken.at(-1).onend();assert(audioSteps<1000);assert(r.spoken.length>from);for(const speech of r.spoken.slice(from)){assert(/^en(?:[-_]|$)/i.test(speech.lang),'English voice selected');if(arabic.test(speech.text))addIssue('#topic=diabetes audio','audio',speech.text);}
 r.route('#sim='+scenarioIds[0]);const simFrom=r.spoken.length;await r.click({id:'readSimulation'});let simAudio=0;while(r.eval('speechActive')&&simAudio++<1000)r.spoken.at(-1).onend();for(const speech of r.spoken.slice(simFrom))if(arabic.test(speech.text))addIssue('#sim='+scenarioIds[0]+' audio','audio',speech.text);
 checks.push('English topic and scenario voices');
 r.route('#topic=diabetes');r.eval('voices=[]');r.context.window.speechSynthesis.getVoices=()=>[];await r.click({id:'readTopic'});inspect(r,'English missing voice');r.context.window.speechSynthesis.getVoices=()=>[{name:'English local',lang:'en-GB',localService:true}];await r.click({id:'readTopic'});inspect(r,'English local voice options');await r.click({id:'pauseAudio'});inspect(r,'English paused audio');await r.click({id:'pauseAudio'});await r.click({id:'stopAudio'});

 r.route('#topic=diabetes');await r.click({id:'surveyLauncher'});inspectMarkup(r,r.elements.get('communitySurveyContent').innerHTML,'English survey dialog');assert(r.elements.has('communityEnglishFeedbackForm'),'English survey uses translated form');
 const expectedChoices={'1477466635':['واضحة ومفهومة','تحتاج بعض التبسيط','غير واضحة لي','لم أقرأ أو أجرب بما يكفي'],'1540221961':['نعم، استفدت منها','قد تفيد شخصًا آخر أعرفه','فائدتها محدودة وتحتاج تطويرًا','لا أستطيع التقييم بعد'],'2046247497':['سهل وواضح','مقبول مع بعض الصعوبة','صعب ويحتاج تحسينًا','لم أجرب بما يكفي']};
 for(const [entry,values]of Object.entries(expectedChoices))for(let index=0;index<values.length;index++)assert.equal(r.elements.get('communityEnglish-'+entry+'-'+index).value,values[index],'Existing Google Form backend option value preserved');
 const englishForm=r.elements.get('communityEnglishFeedbackForm');assert.equal(englishForm.getAttribute('method'),'post');assert(englishForm.getAttribute('action').startsWith('https://docs.google.com/forms/d/e/1FAIpQLSfi9bib4uOn8O0qkKNK3hV13Z2Z3bV4BinsMtaDlhjxbS8aIg/formResponse'));assert.equal(englishForm.getAttribute('target'),'communityEnglishResponse');
await r.click({id:'newFeedback'});inspectMarkup(r,r.elements.get('communitySurveyContent').innerHTML,'English repeat survey');await r.click({id:'closeCommunitySurvey'});checks.push('Contextual English survey and repeated participation without submission');
 r.route('#students');assert(r.html().includes('href="plan-en.html"'));r.route('#dashboard');assert(r.html().includes('href="measurement-protocol-en.md"'));for(const file of ['plan-en.html','measurement-protocol-en.md']){assert(fs.existsSync(path.join(root,file)),file+' exists');const source=fs.readFileSync(path.join(root,file),'utf8');if(arabic.test(source.replace(/https?:\/\/\S+/g,'')))addIssue(file,'document','Arabic remains in English document');for(const match of source.matchAll(/(?:href|src)=["']([^"'#]+)["']/g)){if(/^(?:https?:|mailto:|data:)/.test(match[1]))continue;const target=match[1].split(/[?#]/)[0];if(target&&!fs.existsSync(path.resolve(root,target)))addIssue(file,'link','Missing local file: '+target);}}checks.push('English plan/protocol links and local assets');
 r.route('#dashboard');for(const id of ['clearMetrics','clearSimulations','clearSurvey']){await r.click({id});inspect(r,'#dashboard prompt '+id);}
 const kitId=r.eval('ARTICLES.find(a=>a.tool==="kit").id');r.route('#topic='+kitId);await r.click({id:'kitReset'});inspect(r,'home medicine kit reset');await r.click({id:'kitDone'});inspect(r,'home medicine kit check completed');
 const waterId=r.eval('ARTICLES.find(a=>a.tool==="water").id');r.route('#topic='+waterId);await r.click({'data-water':'Drink regularly'});inspect(r,'water reminder choice');
 checks.push('Local-only prompts, medicine cabinet checks, and water reminder status');

 fs.writeFileSync('/tmp/community013/english-missing-ui.json',JSON.stringify([...missing.values()],null,2));fs.writeFileSync('/tmp/community013/english-audit-results.json',JSON.stringify({checks,issues:issues.map(({signature,...rest})=>rest),counts:{topics:articleIds.length,stories:storyIds.length,scenarios:scenarioIds.length,nodes,choices,paths}},null,2));
 console.log(JSON.stringify({checks,issueCount:issues.length,missingStrings:missing.size,report:'/tmp/community013/english-audit-results.json'},null,2));for(const issue of issues.slice(0,25))console.log(JSON.stringify(issue));if(issues.length)process.exitCode=1;
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
