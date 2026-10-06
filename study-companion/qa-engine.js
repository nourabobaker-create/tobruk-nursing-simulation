/* Rafeq Study Companion QA engine — 2026-10-06 */
(()=>{
"use strict";
const SOURCES={
"openrn-fund":{ar:"Open RN · Nursing Fundamentals 2e",en:"Open RN · Nursing Fundamentals 2e",url:"https://www.ncbi.nlm.nih.gov/books/NBK610815/"},
"openrn-skills":{ar:"Open RN · Nursing Skills 2e",en:"Open RN · Nursing Skills 2e",url:"https://www.ncbi.nlm.nih.gov/books/NBK596735/"},
"openrn-advanced":{ar:"Open RN · Nursing Advanced Skills",en:"Open RN · Nursing Advanced Skills",url:"https://www.ncbi.nlm.nih.gov/books/NBK594492/"},
"openrn-pharm":{ar:"Open RN · Nursing Pharmacology 2e",en:"Open RN · Nursing Pharmacology 2e",url:"https://www.ncbi.nlm.nih.gov/books/NBK595000/"},
"openrn-medterm":{ar:"Open RN · Medical Terminology 2e",en:"Open RN · Medical Terminology 2e",url:"https://www.ncbi.nlm.nih.gov/books/NBK607454/"},
"openrn-mental":{ar:"Open RN · Mental Health & Community Concepts 2e",en:"Open RN · Mental Health & Community Concepts 2e",url:"https://www.ncbi.nlm.nih.gov/books/NBK616982/"},
"openrn-management":{ar:"Open RN · Nursing Management & Professional Concepts 2e",en:"Open RN · Nursing Management & Professional Concepts 2e",url:"https://www.ncbi.nlm.nih.gov/books/NBK610445/"},
"openrn-healthalt":{ar:"Open RN · Health Alterations",en:"Open RN · Health Alterations",url:"https://www.ncbi.nlm.nih.gov/books/NBK613078/"},
"openrn-healthpromo":{ar:"Open RN · Nursing Health Promotion",en:"Open RN · Nursing Health Promotion",url:"https://www.ncbi.nlm.nih.gov/books/NBK615319/"},
"openstax-ap":{ar:"OpenStax · Anatomy & Physiology 2e",en:"OpenStax · Anatomy & Physiology 2e",url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction"},
"openstax-micro":{ar:"OpenStax · Microbiology",en:"OpenStax · Microbiology",url:"https://openstax.org/books/microbiology/pages/1-introduction"},
"openstax-psych":{ar:"OpenStax · Psychology 2e",en:"OpenStax · Psychology 2e",url:"https://openstax.org/books/psychology-2e/pages/1-introduction"},
"openstax-chem":{ar:"OpenStax · Chemistry 2e",en:"OpenStax · Chemistry 2e",url:"https://openstax.org/books/chemistry-2e/pages/1-introduction"},
"who-safety":{ar:"منظمة الصحة العالمية · منهج سلامة المريض",en:"WHO · Patient Safety Curriculum Guide",url:"https://www.who.int/publications/i/item/9789241501958"},
"cdc-precautions":{ar:"CDC · الاحتياطات القياسية ومكافحة العدوى",en:"CDC · Standard Precautions",url:"https://www.cdc.gov/infection-control/hcp/basics/standard-precautions.html"},
"libretexts-biochem":{ar:"LibreTexts · Biochemistry",en:"LibreTexts · Biochemistry",url:"https://chem.libretexts.org/Courses/Brevard_College/CHE_301_Biochemistry"},
"openstax-soc":{ar:"OpenStax · علم الاجتماع والصحة",en:"OpenStax · Sociology of Health",url:"https://openstax.org/books/introduction-sociology-2e/pages/19-1-the-social-construction-of-health"},
"openstax-stats":{ar:"OpenStax · الإحصاء التمهيدي 2e",en:"OpenStax · Introductory Statistics 2e",url:"https://openstax.org/books/introductory-statistics-2e/pages/1-introduction"},
"cdc-epi":{ar:"CDC · دليل الوبائيات الميدانية",en:"CDC · Field Epidemiology Manual",url:"https://www.cdc.gov/field-epi-manual/php/about/"}

};
const GROUPS=[
["homeostasis","الاتزان الداخلي","الاستتباب","التوازن الداخلي","هوميوستاسس","هوميوستاسيس"],
["anatomy","تشريح","التشريح","اناتومي"],["physiology","فسيولوجيا","وظائف الاعضاء","وظائف الأعضاء"],
["pharmacokinetics","فارماكوكينيتكس","الفارماكوكينيتكس","فارماكوكينتيكس","الفارماكوكينتيكس","حركية الدواء","حركيه الدواء","امتصاص الدواء","توزيع الدواء","استقلاب الدواء","اطراح الدواء"],
["pharmacodynamics","فارماكودينامكس","الفارماكودينامكس","فارماكوداينمكس","ديناميكية الدواء","ديناميكيه الدواء","تاثير الدواء","تأثير الدواء"],
["infection","عدوى","العدوى","infection control","مكافحة العدوى"],["hand hygiene","غسل اليدين","نظافة اليدين"],
["blood pressure","ضغط الدم","الضغط"],["vital signs","العلامات الحيوية","vitals"],["pain","الألم","الم","وجع"],
["assessment","التقييم","الفحص","فحص المريض"],["communication","التواصل","اتصال","التخاطب"],["teach back","teach-back","التحقق من الفهم","اعاده الشرح","إعادة الشرح"],["sbar","اسبار","تسليم الحاله","تسليم الحالة","handover"],
["therapeutic communication","التواصل العلاجي","التواصل التمريضي"],["microbiology","الاحياء الدقيقة","الأحياء الدقيقة","ميكروبيولوجي","ميكرو"],
["gram stain","صبغة غرام","جرام ستين","غرام"],["antimicrobial resistance","مقاومة المضادات","مقاومة المضادات الحيوية","antibiotic resistance"],
["psychology","علم النفس","نفسية","نفسي"],["stress","الضغط النفسي","التوتر","التكيف"],
["nutrition","التغذية","غذاء"],["fluid balance","توازن السوائل","السوائل","fluid and electrolytes","الشوارد","الاملاح","الأملاح"],
["oxygenation","الأكسجة","الاكسجة","oxygen"],["perfusion","التروية","تروية"],["nursing process","عملية التمريض","عمليه التمريض"],
["triage","الفرز","فرز الطوارئ"],["research","البحث العلمي","بحث تمريضي","research proposal","مقترح بحث"],
["epidemiology","وبائيات","علم الوبائيات"],["biostatistics","احصاء حيوي","إحصاء حيوي","statistics","standard deviation","انحراف معياري"],
["medical terminology","مصطلحات طبية","المصطلحات الطبية"],["leadership","القيادة","ادارة التمريض","إدارة التمريض","delegation","التفويض"],
["critical care","العناية الحرجة","العنايه الحرجه","shock","صدمة","صدمه"],["buffer","buffers","منظم الحموضة","منظمات الحموضة","المحلول المنظم","بفر","buffer system"],["enzyme","enzymes","انزيم","إنزيم","الانزيمات","الإنزيمات"],["metabolism","الاستقلاب","الايض","الأيض","metabolic"],["lipoprotein","lipoproteins","ldl","hdl","البروتينات الدهنية","الدهون بالدم"],["mental health","الصحة النفسية","الصحة العقلية","psychiatric"],
["community health","صحة المجتمع","تمريض المجتمع","primary health care","الرعاية الصحية الاولية","الرعاية الصحية الأولية"],
["maternity","الامومة","الأمومة","الولادة","labor","pregnancy","الحمل"],["pediatric","اطفال","أطفال","تمريض الأطفال","pediatrics"],
["elderly","المسن","مسن","المسنين","كبير السن","كبار السن","geriatrics"],["oncology","الأورام","سرطان","cancer","metastasis","نقائل"]
];
const STOP_AR=new Set("ما ماذا من في على الى إلى عن هل هو هي هذا هذه ذلك تلك كيف لماذا متى اين أين اي أي و أو او ثم مع بدون عند بعد قبل بين لي ليش شن شنو يعني معنى اشرح وضح ممكن اريد أريد سؤال جواب اجابة إجابة ببساطة ببساطه بسيط".split(/\s+/));
const STOP_EN=new Set("what why how when where which who is are was were be been being the a an of in on at to for from with without and or then this that these those explain tell me please can could would should do does did simply simple".split(/\s+/));
const aliasMap=new Map();
for(const g of GROUPS){const canon=normal(g[0]);for(const x of g)aliasMap.set(normal(x),canon)}
function normal(s){return String(s||"").toLowerCase().replace(/[؟،؛]/g," ").replace(/[\u064B-\u065F\u0670\u0640]/g,"").replace(/[أإآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ؤ/g,"و").replace(/ئ/g,"ي").replace(/ة/g,"ه").replace(/[^a-z0-9\u0600-\u06ff%+\-]+/g," ").replace(/\s+/g," ").trim()}
function canonical(s){let x=" "+normal(s)+" ";const keys=[...aliasMap.keys()].sort((a,b)=>b.length-a.length);for(const k of keys){if(k.length>2)x=x.split(" "+k+" ").join(" "+aliasMap.get(k)+" ")}return x.trim()}
function words(s){const raw=canonical(s).split(/\s+/),out=[];for(let w of raw){if(w.length>4&&/^وال/.test(w))w=w.slice(3);else if(w.length>4&&/^(بال|كال|فال|لل)/.test(w))w=w.slice(2);else if(w.length>4&&/^ال/.test(w))w=w.slice(2);else if(w.length>4&&/^و/.test(w))w=w.slice(1);if(w.length>1&&!STOP_AR.has(w)&&!STOP_EN.has(w))out.push(w)}return out}
function grams(s){const x=normal(s).replace(/\s/g,""),a=[];for(let i=0;i<x.length-2;i++)a.push(x.slice(i,i+3));return a}
function fuzzy(a,b){if(!a||!b)return 0;if(a===b)return 1;if(a.length<4||b.length<4)return 0;const A=new Set(grams(a)),B=new Set(grams(b));let h=0;A.forEach(x=>{if(B.has(x))h++});return h/Math.max(A.size,B.size,1)}
function language(q,fallback){const a=(String(q).match(/[\u0600-\u06ff]/g)||[]).length,e=(String(q).match(/[A-Za-z]/g)||[]).length;return a>e?"ar":e>a?"en":fallback||"ar"}
function intent(q){const x=canonical(q);if(/اظهر الاجابه|اظهر الجواب|show answer|reveal answer/.test(x))return"reveal";if(/اختبرني|اسالني|quiz me|test me/.test(x))return"quiz";if(/قارن|الفرق|فرق بين|compare|difference| vs /.test(" "+x+" "))return"compare";if(/لخص|ملخص|خلاصه|summary|summarize/.test(x))return"summary";if(/امتحان|اختبار|اهم|ركز|exam|test focus|important/.test(x))return"exam";if(/مثال|حاله|موقف|case|example|scenario/.test(x))return"example";if(/تمريض|سريري|nursing|clinical|ليش يهم|why.*matter/.test(x))return"nursing";return"explain"}
function ct(c,lang){const en=lang==="en";return{n:en?(c.nEn||c.nAr):(c.nAr||c.nEn),big:en?(c.bigEn||c.bigAr):(c.bigAr||c.bigEn),chunks:(en?(c.chunksEn?.length?c.chunksEn:c.chunksAr):(c.chunksAr?.length?c.chunksAr:c.chunksEn))||[]}}
function sourceList(c){
 const k=[...(c.sources||[])],id=String(c.id||"");
 const inferred={
  biochem:["libretexts-biochem"],sociology:["openstax-soc"],theory:["openrn-fund"],
  patho:["openrn-healthalt","openstax-ap"],therdiet:["openrn-healthpromo"],
  informatics:["openrn-management"],biostat:["openstax-stats"],epi:["cdc-epi"],
  research1:["openrn-management","openstax-stats"],research2:["openrn-management","openstax-stats"],
  rle1:["openrn-skills","cdc-precautions"],micro:["openstax-micro","cdc-precautions"]
 };
 (inferred[id]||[]).forEach(x=>k.push(x));
 const s=normal(id+" "+(c.nAr||"")+" "+(c.nEn||""));
 if(/infection|micro|rle|fundamental|skills/.test(s))k.push("cdc-precautions");
 return[...new Set(k)].map(x=>SOURCES[x]).filter(Boolean).slice(0,3)
}
function score(q,c,ch,current,lang){const rawq=normal(q),rawWords=rawq.split(/\s+/).filter(w=>w.length>1&&!STOP_AR.has(w)&&!STOP_EN.has(w)),rawTitle=normal(ch.title||""),cq=canonical(q),qw=words(q),title=canonical(ch.title||""),body=canonical(ch.text||""),course=canonical((c.nAr||"")+" "+(c.nEn||"")+" "+(c.code||"")),hay=title+" "+body+" "+course;let s=0;if(current&&c.id===current)s+=2.5;if(cq.includes(canonical(ct(c,lang).n||"")))s+=8;if(c.code&&cq.includes(normal(c.code)))s+=7;for(const rw of rawWords){if(rw.length>=3&&rawTitle.split(/\s+/).includes(rw))s+=4.5}for(const w of qw){if(title.includes(w))s+=3.2;else if(body.includes(w))s+=1.8;else if(course.includes(w))s+=2.2;else{let best=0;for(const x of hay.split(/\s+/).filter(x=>x.length>=4).slice(0,80)){best=Math.max(best,fuzzy(w,x));if(best>.8)break}if(best>=.66)s+=best*1.5}}return s+(ch.kind==="overview"?.25:0)}
function ranked(q,current,lang){const out=[];for(const c of(window.RAFEQ_CORPUS||[])){const x=ct(c,lang),chunks=x.chunks.length?x.chunks:[{kind:"overview",title:x.n,text:x.big}];for(const ch of chunks)out.push({c,ch,score:score(q,c,ch,current,lang)})}return out.sort((a,b)=>b.score-a.score)}
function unique(rows,id,n=6){const a=[],seen=new Set();for(const r of rows){if(id&&r.c.id!==id)continue;const k=normal((r.ch.title||"")+" "+(r.ch.text||""));if(!k||seen.has(k))continue;seen.add(k);a.push(r);if(a.length>=n)break}return a}
function courseUrl(c,lang){const en=lang==="en"?"-en":"";if(c.year===1&&c.sem===1)return(lang==="en"?"english.html":"index.html")+"#"+c.id;if(c.year===1&&c.sem===2)return"year1-sem2"+en+".html#"+c.id;return"year"+c.year+en+".html#"+c.id}
function label(c,lang){const x=ct(c,lang);return x.n+" · "+(lang==="en"?"Year ":"السنة ")+c.year+" / "+(lang==="en"?"Semester ":"الفصل ")+c.sem}
let quiz=null,lastContext=null;
function meaningfulCount(q){return words(q).length}
function followup(q){const x=canonical(q);return meaningfulCount(q)<=1||/وضح اكثر|اشرح اكثر|ليش|لماذا|كيف يعني|اعطني مثال|مثال اخر|more|why|explain more|another example/.test(x)}
function answer(q,opts={}){
 const lang=language(q,opts.lang||document.documentElement.lang||"ar"),ar=lang!=="en",
 current=typeof opts.currentCourseId==="function"?opts.currentCourseId():opts.currentCourseId,kind=intent(q);
 let query=q;
 if(lastContext&&followup(q)){
   const lx=ct(lastContext.c,lang);
   query=q+" "+(lastContext.ch?.title||"")+" "+lx.n;
 }
 const rows=ranked(query,current||(lastContext&&followup(q)?lastContext.c.id:""),lang),top=rows[0];if(kind==="reveal"&&quiz){const z=quiz;quiz=null;return{text:(ar?"الإجابة المقترحة: ":"Suggested answer: ")+z.text,course:z.c,sources:sourceList(z.c)}}if(!top||top.score<1.6){const sug=[],seen=new Set();for(const r of rows){if(!seen.has(r.c.id)){seen.add(r.c.id);sug.push(r.c)}if(sug.length===3)break}return{text:ar?"اسأل بطريقتك العادية؛ لا توجد صياغة إلزامية. بحثت في محتوى مقررات البرنامج والمصادر المفتوحة المرتبطة بها، لكن لم أجد تطابقًا قويًا بما يكفي للإجابة بثقة. اذكر المفهوم أو صف ما لم تفهمه، مثل: «ليش يرتفع النبض؟» أو «ما الفرق بين التعقيم والتطهير؟».":"Ask in your normal words; no fixed phrasing is required. I searched the programme corpus and linked open sources but did not find a strong enough match to answer confidently. Name the concept or describe what is unclear, e.g. “why does pulse rise?” or “sterilisation vs disinfection?”.",suggestions:sug}}const c=top.c,x=ct(c,lang),same=unique(rows,c.id,8);lastContext={c, ch:top.ch};if(kind==="quiz"){const z=same.find(r=>r.ch.kind==="concept"||r.ch.kind==="lesson")||top;quiz={c,text:z.ch.text};return{text:ar?"سؤال قصير من «"+x.n+"»:\n\nاشرح بفهمك: "+(z.ch.title||"الفكرة الرئيسية")+"؟\n\nاكتب إجابتك ثم اكتب «أظهر الإجابة».":"Quick question from “"+x.n+"”:\n\nExplain in your own words: "+(z.ch.title||"the main idea")+"?\n\nWrite your answer, then type “show answer”.",course:c,sources:sourceList(c)}}if(kind==="summary"){return{text:(ar?"ملخص «":"Summary of “")+x.n+(ar?"»:":"”:")+"\n\n"+same.slice(0,4).map(r=>"• "+(r.ch.title?r.ch.title+": ":"")+r.ch.text).join("\n"),course:c,sources:sourceList(c)}}if(kind==="exam"){const p=same.filter(r=>r.ch.kind==="concept"||r.ch.kind==="lesson").slice(0,5);return{text:(ar?"للمراجعة الدراسية — وليس كنطاق امتحان رسمي — ركّز في «"+x.n+"» على:\n":"For study revision — not as an official exam scope — focus in “"+x.n+"” on:\n")+p.map(r=>"• "+(r.ch.title||r.ch.text)).join("\n")+(ar?"\n\nاكتب «اختبرني» لتحويل نقطة إلى سؤال.":"\n\nType “quiz me” to turn a point into a question."),course:c,sources:sourceList(c)}}if(kind==="example"){const z=same.find(r=>r.ch.kind==="scenario")||same.find(r=>r.ch.kind==="lesson")||top;return{text:(ar?"مثال مرتبط بمقرر «":"Example linked to “")+x.n+(ar?"»: ":"”: ")+(z.ch.title?z.ch.title+" — ":"")+z.ch.text,course:c,sources:sourceList(c)}}if(kind==="compare"){const qw=words(q),hay=canonical((top.ch.title||"")+" "+(top.ch.text||"")),covered=qw.filter(w=>hay.includes(w)).length;if(covered>=Math.min(2,qw.length)){return{text:(ar?"الفرق كما يوضحه محتوى «":"The distinction in “")+x.n+(ar?"»: ":"”: ")+(top.ch.title?top.ch.title+" — ":"")+top.ch.text,course:c,sources:sourceList(c)}}let b=rows.find(r=>r!==top&&r.score>=Math.max(1.8,top.score*.45)&&(r.c.id!==top.c.id||normal(r.ch.title)!==normal(top.ch.title)));if(b){return{text:(ar?"المقارنة الأقرب لسؤالك:\n\n1) ":"Closest comparison:\n\n1) ")+(top.ch.title||x.n)+": "+top.ch.text+"\n\n2) "+(b.ch.title||ct(b.c,lang).n)+": "+b.ch.text+(ar?"\n\nالخلاصة: قارن الوظيفة أو الآلية والسياق، لا الاسم فقط.":"\n\nBottom line: compare function, mechanism and context, not labels alone."),course:c,sources:[...sourceList(c),...sourceList(b.c)].filter((v,i,a)=>a.findIndex(z=>z.url===v.url)===i).slice(0,2)}}return{text:(top.ch.title?top.ch.title+" — ":"")+top.ch.text,course:c,sources:sourceList(c)}}if(kind==="nursing"){const z=same.find(r=>r.ch.kind==="scenario")||same.find(r=>r.ch.kind==="lesson");return{text:(ar?"في «":"In “")+x.n+(ar?"»: ":"”: ")+(top.ch.title?top.ch.title+" — ":"")+top.ch.text+(z&&z!==top?"\n\n"+(ar?"الربط بالتمريض: ":"Nursing link: ")+(z.ch.title?z.ch.title+" — ":"")+z.ch.text:""),course:c,sources:sourceList(c)}}const rel=same.find(r=>r!==top&&r.score>=Math.max(1.2,top.score*.45));return{text:(top.ch.title?top.ch.title+" — ":"")+top.ch.text+(rel?"\n\n"+(ar?"فكرة مرتبطة: ":"Related idea: ")+(rel.ch.title?rel.ch.title+" — ":"")+rel.ch.text:""),course:c,sources:sourceList(c)}}
function domCurrent(){const a=document.querySelector(".course.active");return a?.id||location.hash.replace("#","")||""}
function append(container,text,who){const d=document.createElement("div");d.className="msg "+who;d.textContent=text;container.appendChild(d);container.scrollTop=container.scrollHeight;return d}
function render(container,res,lang){const d=append(container,res.text,"bot");if(res.course){const p=document.createElement("div");p.className="qaContext";p.textContent=(lang==="en"?"Course context: ":"السياق: ")+label(res.course,lang);d.appendChild(p);const a=document.createElement("a");a.className="qaCourseLink";a.href=courseUrl(res.course,lang);a.textContent=lang==="en"?"Open course":"فتح المقرر";d.appendChild(a)}if(res.sources?.length){const row=document.createElement("div");row.className="qaSourceRow";for(const s of res.sources){const a=document.createElement("a");a.className="qaSource";a.href=s.url;a.target="_blank";a.rel="noopener";a.textContent=(lang==="en"?s.en:s.ar)+" ↗";row.appendChild(a)}d.appendChild(row)}if(res.suggestions?.length){const row=document.createElement("div");row.className="qaSourceRow";for(const c of res.suggestions){const a=document.createElement("a");a.className="qaSource";a.href=courseUrl(c,lang);a.textContent=ct(c,lang).n;row.appendChild(a)}d.appendChild(row)}container.scrollTop=container.scrollHeight}
function ask(q,opts){const input=document.querySelector(opts.inputSelector||"#chatInput"),msgs=document.querySelector(opts.messagesSelector||"#chatMsgs");if(!q||!msgs)return;append(msgs,q,"user");if(input)input.value="";const lang=language(q,opts.lang);setTimeout(()=>render(msgs,answer(q,{lang,currentCourseId:opts.currentCourseId||domCurrent}),lang),40)}
function quick(opts){const form=document.querySelector(opts.formSelector||"#chatForm");if(!form)return;let q=document.querySelector(".quickQs[data-rq='1']");if(!q){q=document.createElement("div");q.className="quickQs";q.dataset.rq="1";form.parentNode.insertBefore(q,form)}q.replaceChildren();const lang=opts.lang||document.documentElement.lang||"ar",id=(typeof opts.currentCourseId==="function"?opts.currentCourseId():opts.currentCourseId)||domCurrent(),c=(window.RAFEQ_CORPUS||[]).find(x=>x.id===id),x=c?ct(c,lang):null;const arr=x&&x.chunks?.length?[(lang==="en"?"Explain ":"اشرح ")+(x.chunks[0].title||x.n),(lang==="en"?"Give me an example in ":"اعطني مثال في ")+x.n,lang==="en"?"Summarize this course":"لخص هذا المقرر",lang==="en"?"Quiz me on this course":"اختبرني في هذا المقرر"]:(lang==="en"?["Explain homeostasis","Compare anatomy and physiology","Give me a nursing example","Quiz me"]:["اشرح الاتزان الداخلي","قارن بين التشريح والفسيولوجيا","اعطني مثال تمريضي","اختبرني"]);for(const t of arr){const b=document.createElement("button");b.type="button";b.textContent=t;b.onclick=()=>ask(t,opts);q.appendChild(b)}}
function renderCourseSources(opts){
 setTimeout(()=>{
  const lang=opts.lang||document.documentElement.lang||"ar",id=(typeof opts.currentCourseId==="function"?opts.currentCourseId():opts.currentCourseId)||domCurrent();
  document.querySelectorAll(".rafeqSourcesBox").forEach(x=>x.remove());
  const c=(window.RAFEQ_CORPUS||[]).find(x=>x.id===id);if(!c)return;
  const sources=sourceList(c);if(!sources.length)return;
  const host=document.querySelector(".course.active .courseBody")||document.querySelector("#courseView.active #courseContent .courseBody");
  if(!host)return;
  const bodyText=host.textContent||"";
  if(bodyText.includes("مصادر مفتوحة للتوسع")||bodyText.includes("Open sources for expansion"))return;
  const box=document.createElement("div");box.className="rafeqSourcesBox";
  const h=document.createElement("h3");h.className="sectionTitle";h.textContent=lang==="en"?"Open sources for expansion":"مصادر مفتوحة للتوسع";box.appendChild(h);
  const p=document.createElement("p");p.className="qaContext";p.textContent=lang==="en"?"Supplementary sources related to this course; the Faculty's approved course materials remain authoritative.":"مصادر تعليمية مساندة مرتبطة بالمقرر؛ تبقى مواد المقرر المعتمدة وتعليمات أستاذه هي المرجع الدراسي.";box.appendChild(p);
  const row=document.createElement("div");row.className="qaSourceRow";
  sources.forEach(s=>{const a=document.createElement("a");a.className="qaSource";a.href=s.url;a.target="_blank";a.rel="noopener";a.textContent=(lang==="en"?s.en:s.ar)+" ↗";row.appendChild(a)});box.appendChild(row);host.appendChild(box);
 },30);
}
function init(opts={}){if(!window.RAFEQ_CORPUS)return;const form=document.querySelector(opts.formSelector||"#chatForm"),input=document.querySelector(opts.inputSelector||"#chatInput"),msgs=document.querySelector(opts.messagesSelector||"#chatMsgs");if(!form||!input||!msgs)return;const st=document.createElement("style");st.textContent=".qaHint{font-size:11px;color:#667a72;margin-top:2px}.qaSourceRow{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.qaSource,.qaCourseLink{display:inline-flex;border:1px solid #cfded6;background:#fff;border-radius:999px;padding:5px 8px;font-size:11px;color:#174b3b;text-decoration:none;margin:7px 5px 0 0}.qaContext{font-size:11px;color:#6b7d76;margin:6px 0 0}.quickQs{display:flex;gap:5px;flex-wrap:wrap;padding:7px 10px;border-top:1px solid #edf1ef;background:#fff}.quickQs button{border:1px solid #d7e3dd;background:#fff;border-radius:999px;padding:5px 8px;font-size:11px;cursor:pointer}";document.head.appendChild(st);form.onsubmit=null;form.addEventListener("submit",e=>{e.preventDefault();e.stopImmediatePropagation();const q=input.value.trim();if(q)ask(q,opts)},true);input.placeholder=(opts.lang||document.documentElement.lang)==="en"?"Ask naturally: explain, compare, quiz me, give an example…":"اسأل بطريقتك: اشرح، قارن، اختبرني، أعطني مثالًا…";const head=document.querySelector(".chatHead b");if(head&&!head.querySelector(".qaHint")){const h=document.createElement("div");h.className="qaHint";h.textContent=(opts.lang||document.documentElement.lang)==="en"?"Ask naturally · remembers context · searches all 50 courses":"اسأل بطريقتك · يفهم السياق · يبحث في مقررات البرنامج الخمسين";head.appendChild(h)}document.querySelectorAll(".quickQs:not([data-rq='1'])").forEach(x=>x.remove());quick(opts);renderCourseSources(opts);window.addEventListener("hashchange",()=>{quick(opts);renderCourseSources(opts)});document.addEventListener("click",e=>{if(e.target.closest("[data-id],[data-open-course],[data-course-home],#backCourses"))setTimeout(()=>{quick(opts);renderCourseSources(opts)},60)})}
window.RafeqQA={init,answer,SOURCES};
})();