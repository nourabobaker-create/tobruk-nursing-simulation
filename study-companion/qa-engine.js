/* Course-embedded Study Companion, 12 October 2026.
   Source links are distinct from loaded text. Lexical comparison is not grading. */
(() => {
 'use strict';
 const T=window.RafeqText;if(!T)return;
 const VERSION='20261012-1',base=new URL('./',document.currentScript.src),translationCache=new Map();
 let active=null,sourcePromise=null,observer=null,lastSelection='';
 const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 const btn=(text,fn,cls='rq-btn')=>{const b=node('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;};
 const link=(text,href)=>{const a=node('a','',text);try{const u=new URL(href,location.href);if(!/^https?:$/.test(u.protocol))return node('span','',text);a.href=u.href;}catch{return node('span','',text);}a.target='_blank';a.rel='noopener noreferrer';return a;};
 const wording={
  title:['رفيقك في هذا المقرر','Your companion in this course'],badge:['داخل المقرر','Inside the course'],scope:['أبحث في محتوى هذا المقرر فقط.','Search is limited to this course.'],
  ask:['اسأل','Ask'],translate:['ترجم','Translate'],listen:['استمع','Listen'],summary:['لخّص','Summarise'],review:['راجع إجابتك','Review my answer'],sources:['المصادر','Sources'],
  topic:['الفقرة أو النشاط','Passage or activity'],all:['كل الشرح المحمّل','All loaded explanations'],custom:['نص من مصدر أدرسه','Text from a source I am studying'],material:['نص الفقرة — أو ألصق نصًا من مصدرك','Passage — or paste text from your source'],selection:['استخدم النص الذي حددته','Use the text I selected'],
  question:['ما الذي تريد فهمه؟','What would you like to understand?'],questionHint:['اسأل بالعربية أو الإنجليزية عن مفهوم في هذا المقرر.','Ask in Arabic or English about a concept in this course.'],search:['ابحث في شرح المقرر','Search course explanations'],textHint:['اختر فقرة من الأعلى أو ألصق فقرة من كتابك أو محاضرتك.','Choose a passage above, or paste a paragraph from your book or lecture.'],
  to:['إلى','To'],from:['من','From'],auto:['تلقائي','Automatic'],translateGo:['ترجم النص','Translate text'],translationNote:['الترجمة ترسل النص إلى MyMemory؛ استخدم نصوصًا دراسية فقط. قد تخطئ الترجمة في المصطلحات الطبية.','Translation sends text to MyMemory; use study material only. Medical terminology may be translated incorrectly.'],
  readGo:['اقرأ النص','Read text'],stop:['إيقاف','Stop'],speed:['السرعة','Speed'],device:['القراءة تستخدم صوت جهازك؛ توفر الصوت العربي والإنجليزي يختلف بين الأجهزة.','Reading uses your device voice. Arabic and English voice availability varies by device.'],
  summaryGo:['لخّص النص','Summarise text'],summaryNote:['تلخيص نصي باختيار أهم الجمل من النص نفسه؛ لا يضيف تفسيرًا أو معلومات جديدة.','Selects key sentences from the supplied text; it adds no new explanation or information.'],
  yourAnswer:['إجابتك','Your answer'],reference:['الإجابة المرجعية','Reference answer'],referenceNote:['المرجع الافتراضي شرح إرشادي. يمكنك استبداله بإجابة أستاذ المقرر أو مفتاح النشاط. المقارنة النصية لا تحكم على صحة المعنى ولا تعطي درجة.','The default reference is a supplementary explanation. Replace it with your instructor’s answer or an activity key. Text comparison does not judge meaning or award marks.'],
  reviewQuestion:['السؤال الذي تجيب عنه (اختياري)','The question you are answering (optional)'],reviewGo:['قارن إجابتي بالمرجع','Compare my answer with the reference'],empty:['اختر أو ألصق نصًا أولًا.','Choose or paste text first.'],emptyAnswer:['اكتب إجابتك والمرجع للمقارنة.','Enter both your answer and a reference.'],
  noMatch:['لم أجد فقرة مناسبة في النص المحمّل لهذا المقرر. اذكر المفهوم، أو اختر فقرة من الأعلى. وجود رابط لكتاب لا يعني أن الكتاب كاملًا محمّل هنا.','No suitable passage was found in this course’s loaded text. Name the concept, or choose a passage above. A book link does not mean the entire book is loaded here.'],
  found:['هذه أقرب فقرات من محتوى المقرر','Closest passages in this course'],loaded:['شرح المقرر المحمّل','Loaded course explanation'],lesson:['نص الدرس التفاعلي','Interactive lesson text'],activity:['إجابة نشاط الدرس','Lesson activity answer'],pasted:['نص أدخلته أنت','Text you supplied'],use:['استخدم هذه الفقرة','Use this passage'],
  summaryTitle:['جمل مختارة من النص','Selected sentences from your text'],translationTitle:['ترجمة آلية','Machine translation'],translating:['جارٍ ترجمة النص…','Translating…'],translated:['اكتملت الترجمة.','Translation complete.'],
  offline:['الترجمة تحتاج اتصالًا بالإنترنت؛ تظل القراءة والتلخيص والمقارنة النصية متاحة للنص الموجود.','Translation needs an internet connection. Reading, summaries and reference comparison still work with the available text.'],tooLong:['للترجمة اختر فقرة لا تتجاوز 2000 حرف. لم يُرسل أي جزء من النص.','Choose a passage of up to 2000 characters for translation. No part of the text was sent.'],
  translationError:['تعذرت الترجمة الآن. قد يكون السبب الشبكة أو حد الخدمة المجانية. حاول بفقرة أقصر لاحقًا.','Translation is unavailable. The network or the free-service limit may be responsible. Try a shorter passage later.'],quota:['وصلت خدمة الترجمة إلى حد الاستخدام اليومي. حاول لاحقًا؛ لم تُعرض نتيجة ناقصة.','The translation service has reached its daily limit. Try later; no incomplete result was displayed.'],
  readUnavailable:['القراءة الصوتية غير متاحة في هذا المتصفح. جرّب فتح المقرر في متصفح الهاتف.','Text-to-speech is unavailable in this browser. Try opening the course in your phone browser.'],reading:['جارٍ القراءة بصوت الجهاز…','Reading with your device voice…'],readDone:['انتهت القراءة.','Reading finished.'],readError:['لم يتمكن الجهاز من تشغيل الصوت. تحقق من إعدادات الصوت والقراءة في جهازك.','The device could not play the voice. Check its sound and text-to-speech settings.'],
  mention:['أفكار تظهر بعض مفرداتها في إجابتك — تحقق من دقة معناها','Ideas with some matching vocabulary — check their meaning'],missing:['أفكار من المرجع تستحق المراجعة','Reference ideas to revisit'],noMention:['لم أجد تشابهًا كافيًا في المفردات. قد تكون صياغتك مختلفة؛ قارن النصين بنفسك.','Not enough matching vocabulary was found. Your wording may be different; compare the texts yourself.'],
  noMissing:['ظهرت مفردات معظم أفكار المرجع، لكن هذا لا يثبت صحة المعنى.','Vocabulary from most reference ideas appeared, but this does not establish correctness.'],negation:['تحتوي إجابتك على نفي؛ راجع أنه لا يقلب معنى المرجع.','Your answer includes negation; check that it does not reverse the reference meaning.'],numbers:['راجع الأرقام والوحدات الواردة في المرجع: ','Check the numbers and units in the reference: '],
  reviewFooter:['هذه مقارنة مفردات وأفكار ظاهرة، وليست تصحيحًا دلاليًا أو تقديرًا أكاديميًا.','This compares visible words and ideas. It is not semantic grading or an academic mark.'],sourceLoading:['جارٍ تحميل مصادر هذا المقرر…','Loading sources for this course…'],sourceFail:['تعذر تحميل قائمة المصادر. أعد المحاولة عند توفر الإنترنت.','Sources could not be loaded. Retry when connected.'],retry:['أعد المحاولة','Retry'],
  sourceNote:['المصادر أدناه مرتبطة بموضوعات هذا المقرر. نصوصها الكاملة غير محمّلة؛ افتح المصدر وانسخ الفقرة التي تدرسها للعمل عليها هنا.','The sources below are mapped to this course’s topics. Their full text is not loaded; open a source and copy your passage here to work on it.'],allSources:['كل المصادر المرتبطة بالمقرر','All sources mapped to the course'],sourceCount:['مصدرًا مرتبطًا','mapped sources'],
  initialMapping:['ربط تعليمي أولي؛ لا يثبت تغطية الموضوع كاملًا.','Initial educational mapping; full topic coverage is not established.'],partialMapping:['دعم جزئي موثق؛ راجع حدود التغطية.','Documented partial support; check the coverage limits.'],supports:['يدعم: ','Supports: '],limits:['حدود التغطية: ','Coverage limits: '],linkedLibrary:['افتح مصادر هذا المقرر في المكتبة','Open this course’s sources in the library'],
  copy:['نسخ النتيجة','Copy result'],copied:['نُسخت النتيجة.','Result copied.'],copyFail:['يمكنك تحديد النتيجة ونسخها يدويًا.','Select the result and copy it manually.'],listenResult:['استمع للنتيجة','Listen to result'],foot:['أدوات نصية مساندة · لا تحفظ إجابتك على خادم الكلية','Supplementary text tools · your answer is not saved on a Faculty server'],
  noSelection:['حدد فقرة من شرح المقرر أولًا.','Select a passage in the course content first.'],noGrade:['بدون درجة','No mark awarded'],sourceLabel:['مصدر النص: ','Text source: '],qSource:['بحث في النص المحمّل؛ لم تُقرأ الكتب الخارجية تلقائيًا.','Searched loaded text; external books were not read automatically.']
 };
 const uiFor=lang=>Object.fromEntries(Object.entries(wording).map(([k,v])=>[k,v[lang==='en'?1:0]]));
 function add(entries,title,text,kind='loaded',extras={}){
  if(!String(text||'').trim())return;const key=T.normalize(title+' '+text);if(entries.some(e=>e.key===key))return;
  entries.push({id:'p'+entries.length,key,title:String(title||''),text:String(text),kind,...extras});
 }
 function lessonEntries(lesson){
  const entries=[];
  for(const sec of lesson.sections||[]){
   if(sec.body)add(entries,sec.title,sec.body,'lesson',{titleAr:sec.ar||''});
   if(sec.arBody)add(entries,sec.ar||sec.title,sec.arBody,'lesson');
   for(const term of sec.terms||[])add(entries,term[0],term[0]+': '+term[1]+(term[2]?'\n'+term[2]:''),'lesson',{titleAr:term[2]||''});
   if(sec.rows)add(entries,sec.title,[sec.headers?.join(' | '),...sec.rows.map(r=>r.join(' | '))].filter(Boolean).join('\n'),'lesson',{titleAr:sec.ar||''});
   if(sec.steps)add(entries,sec.title,sec.steps.join('\n'),'lesson',{titleAr:sec.ar||''});
   for(const card of sec.cards||[])add(entries,card[0],card[1],'lesson');
   if(sec.pairs)add(entries,sec.title,[['Finding',sec.leftTitle,sec.rightTitle].join(' | '),...sec.pairs.map(r=>r.join(' | '))].join('\n'),'lesson',{titleAr:sec.ar||''});
   if(sec.arNote)add(entries,sec.ar||sec.title,sec.arNote,'lesson');
  }
  for(const q of lesson.quiz||[])add(entries,q.q,q.choices[q.a]+'. '+q.ex,'activity',{question:q.q});
  if(lesson.spot)add(entries,lesson.spot.title,lesson.spot.answer,'activity',{question:lesson.spot.body});
  if(lesson.scenario)add(entries,lesson.scenario.title,lesson.scenario.choices[lesson.scenario.a]+'. '+lesson.scenario.why,'activity',{question:lesson.scenario.body});
  return entries;
 }
 function entriesFor(course,lang,host,lesson){
  if(lesson)return lessonEntries(lesson);const entries=[];
  const preferred=lang==='en'?course.chunksEn:course.chunksAr,other=lang==='en'?course.chunksAr:course.chunksEn;
  for(const ch of [...(preferred||[]),...(other||[])])add(entries,ch.title,ch.text);
  if(host)for(const h of host.querySelectorAll('h4')){if(h.closest('.rafeq'))continue;const ps=[...h.parentElement.querySelectorAll('p')].map(p=>p.textContent.trim()).filter(Boolean).join('\n');if(ps)add(entries,h.textContent,ps);}
  if(course.id==='english2')for(const l of window.ENGLISH2_DATA?.lessons||[])for(const e of lessonEntries(l))add(entries,l.title+' · '+e.title,e.text,e.kind,{titleAr:(l.titleAr||'')+' '+(e.titleAr||''),question:e.question});
  return entries;
 }
 function output(s,title,text,error=false){
  s.result.replaceChildren();s.result.hidden=false;s.result.classList.toggle('error',error);s.result.dir='auto';
  s.result.append(node('h4','',title));if(text)s.result.append(node('div','rq-result-text',text));s.resultText=text||'';s.actions.hidden=!text;
 }
 function meta(s,label){s.result.append(node('p','rq-meta',s.ui.sourceLabel+label));}
 function passage(s,e){s.material.value=e.text;s.sourceLabel=s.ui[e.kind]+' · '+e.title;s.reference.value=e.text;s.reviewQuestion.value=e.question||e.title;s.topic.value=e.id;}
 function searchCourse(s){
  const q=s.question.value.trim();if(!q)return;const found=T.search(s.entries,q,3);output(s,s.ui.found,'');
  if(!found.length){s.result.append(node('p','',s.ui.noMatch));return;}
  for(const e of found){s.result.append(node('h4','',e.title),node('p','rq-result-text',e.text),node('p','rq-meta',s.ui[e.kind]),btn(s.ui.use,()=>{passage(s,e);setMode(s,'summary');s.materialDetails.open=true;}));}
  s.result.append(node('p','rq-meta',s.ui.qSource));s.resultText=found.map(e=>e.title+'\n'+e.text).join('\n\n');s.actions.hidden=false;
 }
 function summarize(s){const text=s.material.value.trim();if(!text){output(s,s.ui.summary,s.ui.empty,true);return;}output(s,s.ui.summaryTitle,T.summarize(text,3).map(p=>'• '+p).join('\n'));meta(s,s.sourceLabel);s.result.append(node('p','rq-meta',s.ui.summaryNote));}
 function compare(s){
  const a=s.answerInput.value.trim(),r=s.reference.value.trim();if(!a||!r){output(s,s.ui.review,s.ui.emptyAnswer,true);return;}
  const checked=T.review(a,r);output(s,s.ui.review+' · '+s.ui.noGrade,'');
  function group(title,ideas,empty){s.result.append(node('h4','',title));if(!ideas.length)s.result.append(node('p','',empty));else{const ul=node('ul');for(const idea of ideas)ul.append(node('li','',idea.text));s.result.append(ul);}}
  group(s.ui.mention,checked.ideas.filter(x=>x.mentioned),s.ui.noMention);group(s.ui.missing,checked.ideas.filter(x=>!x.mentioned),s.ui.noMissing);
  if(checked.negation)s.result.append(node('p','rq-tip',s.ui.negation));if(checked.missingNumbers.length)s.result.append(node('p','rq-tip',s.ui.numbers+checked.missingNumbers.join(' · ')));
  s.result.append(node('p','rq-meta',s.ui.reviewFooter));s.resultText=s.result.innerText||s.result.textContent;s.actions.hidden=false;
 }
 async function translate(s){
  const text=s.material.value.trim();if(!text){output(s,s.ui.translate,s.ui.empty,true);return;}if(text.length>2000){output(s,s.ui.translate,s.ui.tooLong,true);return;}
  if(!navigator.onLine){output(s,s.ui.translate,s.ui.offline,true);return;}
  const from=s.from.value==='auto'?T.language(text,s.lang):s.from.value,to=s.to.value;if(from===to){output(s,s.ui.translationTitle,text);meta(s,s.sourceLabel);return;}
  const token=++s.requestToken,key=from+'|'+to+'|'+text;s.abort?.abort();s.abort=new AbortController();s.translateBtn.disabled=true;s.status.textContent=s.ui.translating;
  try{
   let translated=translationCache.get(key);
   if(!translated){const parts=[];for(const part of T.splitUtf8(text)){
    if(!part.trim()){parts.push(part);continue;}if(token!==s.requestToken||!s.root.isConnected)return;
    const url=new URL('https://api.mymemory.translated.net/get');url.searchParams.set('q',part);url.searchParams.set('langpair',from+'|'+to);
    const timeout=setTimeout(()=>s.abort.abort(),20000);let data;
    try{const response=await fetch(url,{signal:s.abort.signal,credentials:'omit',referrerPolicy:'no-referrer'});if(!response.ok)throw new Error('network');data=await response.json();}finally{clearTimeout(timeout);}
    if(data.quotaFinished||Number(data.responseStatus)===429)throw new Error('quota');if(Number(data.responseStatus)!==200||!data.responseData?.translatedText)throw new Error('translation');
    const decoded=node('textarea');decoded.innerHTML=data.responseData.translatedText;parts.push(decoded.value);
   }translated=parts.join(' ');translationCache.set(key,translated);}
   if(token!==s.requestToken||!s.root.isConnected)return;output(s,s.ui.translationTitle,translated);s.result.dir=to==='ar'?'rtl':'ltr';meta(s,s.sourceLabel);s.result.append(node('p','rq-meta','MyMemory · '+from+' → '+to));s.status.textContent=s.ui.translated;
  }catch(e){if(token===s.requestToken&&s.root.isConnected){output(s,s.ui.translate,e.message==='quota'?s.ui.quota:s.ui.translationError,true);s.status.textContent='';}}
  finally{if(token===s.requestToken)s.translateBtn.disabled=false;}
 }
 function stopSpeech(s){if('speechSynthesis' in window)window.speechSynthesis.cancel();if(s){s.speechToken++;s.status.textContent='';}}
 function read(s,value){
  const text=String(value||'').trim();if(!text){s.status.textContent=s.ui.empty;return;}if(!('speechSynthesis' in window)){s.status.textContent=s.ui.readUnavailable;return;}
  stopSpeech(s);const token=s.speechToken,lang=s.readLanguage.value==='auto'?T.language(text,s.lang):s.readLanguage.value,chunks=T.splitUtf8(text,350),voices=window.speechSynthesis.getVoices();let index=0;
  const next=()=>{if(token!==s.speechToken||!s.root.isConnected)return;if(index>=chunks.length){s.status.textContent=s.ui.readDone;return;}const u=new SpeechSynthesisUtterance(chunks[index++]);u.lang=lang==='ar'?'ar-SA':'en-GB';u.rate=Number(s.rate.value);u.voice=voices.find(v=>v.lang.toLowerCase()===u.lang.toLowerCase())||voices.find(v=>v.lang.toLowerCase().startsWith(lang))||null;s.utterance=u;u.onstart=()=>{s.status.textContent=s.ui.reading;};u.onend=next;u.onerror=e=>{if(token===s.speechToken&&!['canceled','interrupted'].includes(e.error))s.status.textContent=s.ui.readError;};window.speechSynthesis.speak(u);};next();
 }
 function getSources(retry=false){if(retry)sourcePromise=null;if(!sourcePromise)sourcePromise=fetch(new URL('course-sources.json?v='+VERSION,base),{credentials:'omit'}).then(r=>{if(!r.ok)throw new Error('sources');return r.json();}).catch(e=>{sourcePromise=null;throw e;});return sourcePromise;}
 async function showSources(s,retry=false){
  const box=s.sourcesBox;box.replaceChildren(node('p','rq-help',s.ui.sourceLoading));
  try{const data=await getSources(retry);if(!s.root.isConnected)return;const c=data.courses[s.course.id];if(!c)throw new Error('course');
   box.replaceChildren(node('p','rq-help',s.ui.sourceNote),node('p','rq-help',c.resource_ids.length+' '+s.ui.sourceCount));box.append(link(s.ui.linkedLibrary,new URL('../e-library-v3/?course='+encodeURIComponent(c.library_id)+'#resources',base)));
   const list=(host,ids,evidence=[])=>{const ul=node('ul');for(const id of ids){const r=data.resources[id];if(!r)continue;const li=node('li');li.append(link(s.lang==='en'?(r.title_original||r.title_ar):r.title_ar,r.url),node('span','rq-source-note',[r.language,r.provider].filter(Boolean).join(' · ')));const note=evidence.find(e=>e.resource_id===id);if(note){li.append(node('span','rq-source-note',s.ui.supports+note.supported_aspects_ar),node('span','rq-source-note',s.ui.limits+note.coverage_limits_ar));}ul.append(li);}host.append(ul);};
   const all=node('details');all.append(node('summary','',s.ui.allSources));list(all,c.resource_ids);box.append(all);
   for(const m of c.modules){const d=node('details');d.append(node('summary','',m.title_ar),node('p','rq-help',m.evidence?.length?s.ui.partialMapping:s.ui.initialMapping));list(d,m.resource_ids,m.evidence||[]);box.append(d);}
  }catch{if(s.root.isConnected)box.replaceChildren(node('p','rq-error',s.ui.sourceFail),btn(s.ui.retry,()=>showSources(s,true)));}
 }
 function setMode(s,mode){
  s.mode=mode;s.requestToken++;s.abort?.abort();s.translateBtn.disabled=false;stopSpeech(s);s.result.hidden=true;s.result.dir='auto';s.actions.hidden=true;
  for(const [key,tab]of Object.entries(s.tabs))tab.setAttribute('aria-selected',String(key===mode));for(const [key,panel]of Object.entries(s.panels))panel.hidden=key!==mode;
  s.materialDetails.hidden=mode==='sources'||mode==='review';s.topicWrap.hidden=mode==='sources';s.materialDetails.open=mode!=='ask';if(mode==='sources')showSources(s);
 }
 function createCompanion(course,host,lang,lesson){
  const ui=uiFor(lang),entries=entriesFor(course,lang,host,lesson),root=node('section','rafeq');root.dataset.course=course.id;root.dataset.version=VERSION;root.dir=lang==='ar'?'rtl':'ltr';root.setAttribute('aria-label',ui.title);
  const head=node('div','rq-head'),names=node('div');names.append(node('h3','',ui.title),node('p','',(lang==='en'?course.nEn:course.nAr)+(lesson?' · '+(lang==='en'?lesson.title:lesson.titleAr):'')));head.append(names,node('span','rq-badge',ui.badge));root.append(head);
  const body=node('div','rq-body'),tabsBar=node('div','rq-tabs');tabsBar.setAttribute('role','tablist');tabsBar.setAttribute('aria-label',ui.title);body.append(tabsBar);
  const s={course,root,ui,lang,entries,panels:{},tabs:{},requestToken:0,speechToken:0,sourceLabel:ui.loaded};
  const topicWrap=node('div'),topic=node('select');s.topicWrap=topicWrap;s.topic=topic;const topicLabel=node('label','rq-label',ui.topic);topic.id='rq-topic';topicLabel.htmlFor=topic.id;topicWrap.append(topicLabel,topic,node('p','rq-select-scope',ui.scope));body.append(topicWrap);
  for(const e of entries)topic.append(new Option(e.title,e.id));topic.append(new Option(ui.all,'all'),new Option(ui.custom,'custom'));
  const details=node('details','rq-material');s.materialDetails=details;details.append(node('summary','',ui.material));const material=node('textarea');material.id='rq-text';material.dir='auto';material.maxLength=12000;material.setAttribute('aria-label',ui.material);s.material=material;
  details.append(node('p','rq-help',ui.textHint),material,btn(ui.selection,()=>{if(!lastSelection){s.status.textContent=ui.noSelection;return;}material.value=lastSelection;s.topic.value='custom';s.sourceLabel=ui.pasted;details.open=true;}));body.append(details);
  function input(parent,label,key,rows=3){const id='rq-'+key,l=node('label','rq-label',label),i=node('textarea');l.htmlFor=id;i.id=id;i.rows=rows;i.dir='auto';i.maxLength=12000;parent.append(l,i);s[key]=i;return i;}
  function select(parent,label,key,options){const row=node('div','rq-row'),l=node('label','rq-label',label),sel=node('select');sel.id='rq-'+key;l.htmlFor=sel.id;for(const [v,n]of options)sel.append(new Option(n,v));row.append(l,sel);parent.append(row);s[key]=sel;return sel;}
  for(const mode of ['ask','translate','listen','summary','review','sources']){const tab=btn(ui[mode],()=>setMode(s,mode),'');tab.id='rq-tab-'+mode;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','rq-panel-'+mode);tabsBar.append(tab);s.tabs[mode]=tab;const panel=node('div','rq-work');panel.id='rq-panel-'+mode;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);body.append(panel);s.panels[mode]=panel;}
  input(s.panels.ask,ui.question,'question',2).className='rq-question';s.question.placeholder=ui.questionHint;const askRow=node('div','rq-row');askRow.append(btn(ui.search,()=>searchCourse(s),'rq-btn primary'));s.panels.ask.append(askRow);
  s.question.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();searchCourse(s);}});
  select(s.panels.translate,ui.from,'from',[['auto',ui.auto],['en','English'],['ar','العربية']]);select(s.panels.translate,ui.to,'to',[['ar','العربية'],['en','English']]);s.translateBtn=btn(ui.translateGo,()=>translate(s),'rq-btn primary');s.panels.translate.append(node('p','rq-tip',ui.translationNote),s.translateBtn);
  select(s.panels.listen,ui.from,'readLanguage',[['auto',ui.auto],['en','English'],['ar','العربية']]);select(s.panels.listen,ui.speed,'rate',[['0.85',lang==='ar'?'هادئة':'Slower'],['1',lang==='ar'?'عادية':'Normal'],['1.15',lang==='ar'?'أسرع':'Faster']]);const audioRow=node('div','rq-row');audioRow.append(btn(ui.readGo,()=>read(s,material.value),'rq-btn primary'),btn(ui.stop,()=>stopSpeech(s)));s.panels.listen.append(node('p','rq-help',ui.device),audioRow);
  s.panels.summary.append(node('p','rq-help',ui.summaryNote),btn(ui.summaryGo,()=>summarize(s),'rq-btn primary'));
  input(s.panels.review,ui.reviewQuestion,'reviewQuestion',2).className='rq-question';input(s.panels.review,ui.yourAnswer,'answerInput');input(s.panels.review,ui.reference,'reference');s.panels.review.append(node('p','rq-tip',ui.referenceNote),btn(ui.reviewGo,()=>compare(s),'rq-btn primary'));
  s.sourcesBox=node('div','rq-sources');s.panels.sources.append(s.sourcesBox);s.result=node('div','rq-output');s.result.setAttribute('role','status');s.result.dir='auto';s.result.hidden=true;body.append(s.result);
  s.actions=node('div','rq-row');s.actions.hidden=true;s.actions.append(btn(ui.copy,async()=>{try{await navigator.clipboard.writeText(s.resultText);s.status.textContent=ui.copied;}catch{s.status.textContent=ui.copyFail;}}),btn(ui.listenResult,()=>read(s,s.resultText)),btn(ui.stop,()=>stopSpeech(s)));body.append(s.actions);s.status=node('div','rq-status');s.status.setAttribute('aria-live','polite');body.append(s.status);
  const foot=node('div','rq-foot');foot.append(node('span','',ui.foot),node('span','','12 Oct 2026 · v1'));body.append(foot);root.append(body);if(entries[0])passage(s,entries[0]);
  topic.addEventListener('change',()=>{s.requestToken++;s.abort?.abort();s.translateBtn.disabled=false;stopSpeech(s);if(topic.value==='all'){material.value=entries.map(e=>e.title+'\n'+e.text).join('\n\n');s.sourceLabel=ui.loaded;s.reference.value=material.value;}else{const e=entries.find(e=>e.id===topic.value);if(e)passage(s,e);else s.sourceLabel=ui.pasted;}s.result.hidden=true;s.actions.hidden=true;});
  material.addEventListener('input',()=>{s.sourceLabel=ui.pasted;topic.value='custom';s.requestToken++;s.abort?.abort();s.translateBtn.disabled=false;s.result.hidden=true;s.actions.hidden=true;stopSpeech(s);});setMode(s,'ask');return s;
 }
 function context(opts){
  if(opts.englishLessons){const l=window.ENGLISH2_DATA?.lessons.find(l=>l.id===location.hash.slice(1)),host=document.querySelector('.lessonMain');return host&&l?{id:'english2',host,lesson:l,lang:document.body.classList.contains('arabic-on')?'ar':'en'}:null;}
  const c=document.querySelector('.course.active'),host=c?.querySelector('.courseBody')||document.querySelector('#courseView.active #courseContent .courseBody'),id=c?.id||location.hash.slice(1);return host&&id?{id,host,lang:opts.lang||document.documentElement.lang||'ar'}:null;
 }
 function mount(opts){
  const ctx=context(opts);if(!ctx){if(active){stopSpeech(active);active.abort?.abort();active.root.remove();active=null;}return;}
  const c=(window.RAFEQ_CORPUS||[]).find(c=>c.id===ctx.id);if(!c)return;if(active?.root.isConnected&&active.course.id===ctx.id&&active.lessonId===(ctx.lesson?.id||'')&&active.lang===ctx.lang)return;
  const prior=active&&active.course.id===ctx.id&&active.lessonId===(ctx.lesson?.id||'')?active:null;
  if(active){stopSpeech(active);active.requestToken++;active.abort?.abort();active.root.remove();}lastSelection='';const s=createCompanion(c,ctx.host,ctx.lang,ctx.lesson);s.lessonId=ctx.lesson?.id||'';
  if(prior){for(const key of ['material','question','reviewQuestion','answerInput','reference','topic','from','to','rate','readLanguage'])s[key].value=prior[key].value;s.sourceLabel=prior.sourceLabel;setMode(s,prior.mode);}
  active=s;const back=ctx.host.querySelector('.courseReturn');if(back)back.after(s.root);else ctx.host.prepend(s.root);
 }
 function init(opts={}){
  document.querySelectorAll('#chatLauncher,#chatbox,.rafeqSourcesBox').forEach(n=>n.remove());observer?.disconnect();let queued=false;const schedule=()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;mount(opts);});};
  observer=new MutationObserver(rs=>{if(rs.some(r=>!r.target.closest?.('.rafeq')))schedule();});observer.observe(document.querySelector(opts.englishLessons?'#app':'main')||document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  if(opts.englishLessons)observer.observe(document.body,{attributes:true,attributeFilter:['class']});
  window.addEventListener('hashchange',schedule);window.addEventListener('popstate',schedule);document.addEventListener('selectionchange',()=>{const selected=window.getSelection();if(!selected||!selected.rangeCount)return;const anchor=selected.anchorNode?.parentElement,ctx=context(opts);if(ctx?.host.contains(anchor)&&!anchor?.closest('.rafeq'))lastSelection=selected.toString().slice(0,12000);});mount(opts);
 }
 function answer(q,opts={}){const id=typeof opts.currentCourseId==='function'?opts.currentCourseId():opts.currentCourseId,c=(window.RAFEQ_CORPUS||[]).find(c=>c.id===id),lang=opts.lang||'ar';if(!c)return{text:uiFor(lang).noMatch};const found=T.search(entriesFor(c,lang,null,null),q,3);return{course:c,text:found.length?found.map(e=>e.title+'\n'+e.text).join('\n\n'):uiFor(lang).noMatch,passages:found,sources:[]};}
 window.RafeqQA={init,answer,entriesFor,version:VERSION};
})();
