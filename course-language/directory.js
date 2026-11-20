(async()=>{
  'use strict';
  const $=id=>document.getElementById(id), ui=window.CourseGlossary;
  const en=new URLSearchParams(location.search).get('lang')==='en',lang=en?'en':'ar';
  const say=(ar,eng)=>en?eng:ar;
  document.documentElement.lang=lang;document.documentElement.dir=en?'ltr':'rtl';
  const localeSwitch=$('language');
  localeSwitch.textContent=say('English','العربية');localeSwitch.lang=en?'ar':'en';
  if(en){
    for(const [id,text] of Object.entries({faculty:'Faculty of Nursing | Tobruk University',title:'Course glossary',intro:'Choose a course to learn English terms with Arabic meanings and explanations, then use the flashcards to test yourself.',hub:'Student hub',exam:'Understanding exam questions','year-label':'Study year','find-label':'Search across courses',back:'All courses'}))$(id).textContent=text;
    document.title='Course glossary | Faculty of Nursing, Tobruk University';
  }
  const metadata=window.TOBRUK_COURSE_REFERENCES.courses;
  $('year').add(new Option(say('جميع السنوات','All years'),''));
  for(let i=1;i<=4;i++)$('year').add(new Option(say('السنة '+i,'Year '+i),i));
  let banks=new Map(), ready=false;
  function card(meta,bank,query) {
    const el=ui.node('article',undefined,'gl-course'),title=ui.node('h2');
    const a=ui.node('a',en?meta.titleEn:meta.titleAr);a.href='#'+meta.specId;title.append(a);
    const tags=ui.node('small',say('السنة ','Year ')+meta.year+' · '+meta.code+' · '+bank.terms.length+say(' مصطلحًا',' terms'));
    el.append(title,tags);
    if(query){
      const matches=bank.terms.filter(term=>ui.matches(term.slice(0,3),query));
      if(matches.length){const text=ui.node('p');text.dir='auto';text.textContent=matches.slice(0,3).map(term=>term[0]+' · '+term[1]).join(' / ');el.append(text);}
    }
    return el;
  }
  function catalogue(){
    const year=$('year').value,query=$('find').value.trim();
    const found=metadata.filter(meta=>{
      const bank=banks.get(meta.specId);
      return bank&&(!year||meta.year===Number(year))&&(!query||ui.matches([meta.code,meta.titleAr,meta.titleEn],query)||bank.terms.some(term=>ui.matches(term.slice(0,3),query)));
    });
    const totalTerms=found.reduce((sum,m)=>sum+banks.get(m.specId).terms.length,0);
    $('total').textContent=(query?say('المقررات المطابقة','Matching courses'):say('المقررات','Courses'))+' · '+found.length+(!query?' | '+say('مداخل المعجم','Course entries')+' · '+totalTerms:'');
    const result=$('catalogue');result.replaceChildren(...found.map(m=>card(m,banks.get(m.specId),query)));
    if(!found.length)result.append(ui.node('p',ui.wording[lang].none));
  }
  function route(focus){
    localeSwitch.href='?lang='+(en?'ar':'en')+location.hash;
    if(!ready)return;
    const id=location.hash.slice(1),meta=metadata.find(m=>m.specId===id||m.id===id);
    $('detail').hidden=!meta;$('chooser').hidden=Boolean(meta);
    if(!meta){catalogue();if(focus)$('find').focus();return;}
    const bank=banks.get(meta.specId);
    $('course-title').textContent=en?meta.titleEn:meta.titleAr;
    $('course-code').textContent=meta.code+' · '+(en?meta.titleAr:meta.titleEn);
    const query=$('find').value.trim();
    const initialQuery=query&&bank.terms.some(term=>ui.matches(term.slice(0,3),query))?query:'';
    ui.courseView($('course-content'),bank,meta,lang,initialQuery);
    $('course-content').append(ui.link(say('افتح المقرر في رفيق الدراسة','Open in the Study Companion'),en?meta.courseUrlEn:meta.courseUrl));
    if(focus)$('course-title').focus();
  }
  $('year').addEventListener('change',catalogue);$('find').addEventListener('input',catalogue);
  window.addEventListener('hashchange',()=>route(true));
  $('total').textContent=ui.wording[lang].loading;
  try{
    const data=(await Promise.all([ui.loadBank(1),ui.loadBank(3)])).flat();
    banks=new Map(data.map(c=>[c.id,c]));ready=true;route(false);
  }catch{
    $('total').textContent=ui.wording[lang].failure;
    const retry=ui.node('button',ui.wording[lang].retry);retry.onclick=()=>location.reload();$('total').append(' ',retry);
  }
})();
