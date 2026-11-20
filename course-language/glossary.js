(() => {
  'use strict';
  const base = new URL('./', document.currentScript.src);
  const loading = new Map();
  const wording = {
    ar: { name:'مصطلحات المقرر', search:'ابحث بالمصطلح أو معناه', all:'استعرض جميع المصطلحات', practice:'راجع بالبطاقات', count:'عدد المصطلحات', none:'لا توجد مطابقة. جرّب كلمة أقصر أو ابحث بالإنجليزية.', reveal:'أظهر المعنى', next:'البطاقة التالية', prev:'السابقة', see:'افتح معجم المقررات', guide:'كيف أفهم صيغة السؤال؟', prompt:'استرجع المعنى واشرحه بكلماتك قبل كشف البطاقة.', more:'مصادر المقرر', loading:'جارٍ فتح المصطلحات…', failure:'تعذّر تحميل المصطلحات.', retry:'أعد المحاولة', scope:'مصطلحات للمذاكرة مبنية على موضوعات المقرر.', source:'أساس اختيار المصطلحات', swap:'اعكس اتجاه البطاقة', of:'من', clear:'امسح البحث', dose:'تدرّب على حساب الجرعات' },
    en: { name:'Course terminology', search:'Search for a term or its meaning', all:'Browse terminology', practice:'Study with flashcards', count:'Terms', none:'No match. Try a shorter word or search in Arabic.', reveal:'Show meaning', next:'Next card', prev:'Previous', see:'Open the course glossary', guide:'How do I interpret exam questions?', prompt:'Recall the meaning and explain it in your own words before turning the card.', more:'Course sources', loading:'Loading terms…', failure:'Terms could not be loaded.', retry:'Try again', scope:'English–Arabic study terms selected from course topics.', source:'Basis for selecting terms', swap:'Reverse card direction', of:'of', clear:'Clear search', dose:'Practise dosage calculations' }
  };
  const norm = value => String(value).normalize('NFKD').toLowerCase().replace(/[\u064b-\u065f\u0670\u0640\u0300-\u036f]/g,'').replace(/[إأآٱ]/g,'ا').replace(/ى/g,'ي').replace(/[–—-]/g,' ').replace(/\s+/g,' ').trim();
  const matches = (values,query) => {
    const hay = norm(values.join(' '));
    return norm(query).split(' ').every(word => hay.includes(word));
  };
  function node(tag, content, cls) {
    const el=document.createElement(tag);
    if(content!==undefined) el.textContent=content;
    if(cls) el.className=cls;
    return el;
  }
  function btn(label, action) {
    const button=node('button',label); button.type='button'; button.addEventListener('click',action); return button;
  }
  function link(label, path) {
    const a=node('a',label); a.href=new URL(path,base); return a;
  }
  function loadBank(year) {
    const part=year<=2?'12':'34', key='HUB_TERMS'+part;
    if(window[key]) return Promise.resolve(window[key]);
    if(!loading.has(part)) {
      const promise=new Promise((resolve,reject)=>{
        const s=document.createElement('script'); s.src=new URL('years'+part+'.js',base);
        s.onload=()=>Array.isArray(window[key]) ? resolve(window[key]) : reject(new Error('Invalid course data'));
        s.onerror=()=>reject(new Error('Missing course data'));
        document.head.append(s);
      }).catch(error=>{loading.delete(part);throw error;});
      loading.set(part,promise);
    }
    return loading.get(part);
  }
  function termRow(term) {
    const row=node('article',undefined,'gl-term');
    const en=node('strong',term[0]); en.lang='en'; en.dir='ltr';
    const ar=node('b',term[1]); ar.lang='ar'; ar.dir='rtl';
    const explanation=node('p',term[2]); explanation.lang='ar'; explanation.dir='rtl';
    row.append(en,ar,explanation);return row;
  }
  function courseView(container, bank, meta, lang, initialQuery = '') {
    const w=wording[lang]; const tools=node('div',undefined,'gl-tools');
    const label=node('label',w.search,'gl-input');
    const search=node('input'); search.type='search'; search.dir='auto'; search.value=initialQuery; label.append(search);
    const result=node('p',undefined,'gl-count'); result.setAttribute('aria-live','polite');
    const mode=btn(w.practice,()=>{quiz=false;cards=!cards;position=0;shown=false;draw();});
    const board=node('div',undefined,'gl-board'); let cards=false,position=0,shown=false,reverse=false;
    let quiz=false,quizIndex=0,picked=null;
    const phrase=(ar,en)=>lang==='ar'?ar:en;
    const quizMode=btn(phrase('تدرّب على تحديد المصطلح','Practise term identification'),()=>{
      quiz=!quiz;cards=false;quizIndex=0;picked=null;draw();
    });
    tools.append(label,mode,quizMode);
    const notes=node('p',w.source+' · '+bank.source,'gl-note'); notes.dir='auto';
    const links=node('div',undefined,'gl-nav');
    links.append(link(w.more,'../e-library-v3/#course-references/'+encodeURIComponent(meta.id)),link(w.guide,'../exam-language/'));
    if (['pharm','fundamentals','peds','critical','rle2','prac1','prac2','prac3','prac4'].includes(meta.id)) links.append(link(w.dose,lang==='ar'?'../dose-math/':'../dose-math/english.html'));
    container.replaceChildren(tools,result,board,notes,links);
    function draw() {
      const filtered=bank.terms.filter(term=>matches(term.slice(0,3),search.value));
      result.textContent=w.count+' · '+filtered.length+' / '+bank.terms.length;
      quizMode.textContent=quiz?w.all:phrase('تدرّب على تحديد المصطلح','Practise term identification');quizMode.setAttribute('aria-pressed',String(quiz));
      mode.textContent=cards?w.all:w.practice;mode.setAttribute('aria-pressed',String(cards));board.replaceChildren();
      if(!filtered.length){board.append(node('p',w.none),btn(w.clear,()=>{search.value='';draw();search.focus();}));return;}
      if(quiz){
        const term=filtered[quizIndex],index=bank.terms.indexOf(term);
        const choices=[term],englishNames=new Set([norm(term[0])]),arabicNames=new Set([norm(term[1])]);
        for(let step=1;step<bank.terms.length&&choices.length<3;step++){
          const other=bank.terms[(index+step)%bank.terms.length];
          if(englishNames.has(norm(other[0]))||arabicNames.has(norm(other[1])))continue;
          choices.push(other);englishNames.add(norm(other[0]));arabicNames.add(norm(other[1]));
        }
        const offset=(index*7+1)%choices.length;
        const card=node('div',undefined,'gl-flash'),title=node('strong','Identify the term.');title.lang='en';title.dir='ltr';
        card.append(title,node('p',phrase('اختر المصطلح الإنجليزي الذي يطابق هذا الوصف.','Select the English term that matches the Arabic description.')));
        const prompt=node('p',term[2]);prompt.lang='ar';prompt.dir='rtl';card.append(prompt);
        const options=node('div',undefined,'gl-nav');
        for(let n=0;n<choices.length;n++){
          const choice=choices[(n+offset)%choices.length];
          const opt=btn(choice[0],()=>{picked=choice;draw();board.querySelector('.gl-response')?.focus();});
          opt.lang='en';opt.dir='ltr';opt.disabled=picked!==null;options.append(opt);
        }
        card.append(options);
        if(picked){
          const correct=picked===term;
          const feedback=node('div',undefined,'gl-response');feedback.setAttribute('aria-live','polite');feedback.tabIndex=-1;
          feedback.append(node('b',phrase(correct?'إجابة صحيحة':'راجع الفرق بين المصطلحين',correct?'Correct':'Compare the two terms')),termRow(term));
          if(!correct)feedback.append(node('span',phrase('المصطلح الذي اخترته','Your selected term')),termRow(picked));
          const next=btn(phrase('سؤال آخر','Next question'),()=>{quizIndex=(quizIndex+1)%filtered.length;picked=null;draw();board.querySelector('.gl-nav button')?.focus();});
          feedback.append(next);card.append(feedback);
        }
        board.append(card);return;
      }
      if(!cards){board.append(...filtered.map(termRow));return;}
      const term=filtered[position];const card=node('div',undefined,'gl-flash');
      const top=node('p',(position+1)+' '+w.of+' '+filtered.length,'gl-count');
      const word=node('strong',term[reverse?1:0]);word.lang=reverse?'ar':'en';word.dir=reverse?'rtl':'ltr';
      card.append(top,word,node('p',w.prompt)); const face=node('div');face.setAttribute('aria-live','polite');
      const reveal=btn(w.reveal,()=>{shown=true;draw();board.querySelector('[data-next]')?.focus();});
      if(shown) {const meaning=node('b',term[reverse?0:1]);meaning.dir='auto';const def=node('p',term[2]);def.dir='rtl';face.append(meaning,def);} else face.append(reveal);
      card.append(face);
      const controls=node('div',undefined,'gl-nav');
      const change=delta=>{position=(position+delta+filtered.length)%filtered.length;shown=false;draw();board.querySelector(delta<0?'[data-prev]':'[data-next]')?.focus();};
      const prev=btn(w.prev,()=>change(-1)),next=btn(w.next,()=>change(1));prev.dataset.prev='';next.dataset.next='';
      controls.append(prev,next,btn(w.swap,()=>{reverse=!reverse;shown=false;draw();board.querySelector('.gl-flash button')?.focus();}));
      board.append(card,controls);
    }
    search.addEventListener('input',()=>{position=0;quizIndex=0;picked=null;shown=false;draw();});draw();
  }
  function panel(meta,lang) {
    const w=wording[lang];const box=node('details',undefined,'gl-embedded');
    box.lang=lang;box.dir=lang==='ar'?'rtl':'ltr';box.dataset.glossary=meta.specId;
    const sum=node('summary',w.name+' · English / عربي');box.append(sum);
    const body=node('div',undefined,'gl-body');box.append(body);
    let started=false;
    async function show() {
      if(started||!box.open)return;started=true;body.textContent=w.loading;
      try{
        const bank=(await loadBank(meta.year)).find(x=>x.id===meta.specId);
        if(!bank)throw new Error('Course not found');
        courseView(body,bank,meta,lang);
        body.append(link(w.see,'./?lang='+lang+'#'+meta.specId));
      }catch{started=false;body.replaceChildren(node('p',w.failure),btn(w.retry,show));}
    }
    box.addEventListener('toggle',show);return box;
  }
  window.CourseGlossary={loadBank,matches,termRow,courseView,panel,node,link,wording};
})();
