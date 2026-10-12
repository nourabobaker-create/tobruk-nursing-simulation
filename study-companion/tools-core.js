/* Text tools: scoped retrieval, extractive summaries and reference comparison.
   No model inference, clinical grading or full-text web retrieval is claimed. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.RafeqText = api;
})(typeof window === 'undefined' ? globalThis : window, function () {
  'use strict';
  const stop = new Set(('what why how when where which who is are was were be been being the a an of in on at to for from with without and or then this that these those explain tell me please can could would should do does did give example summarize summary review answer course lesson '+
    'ما ماذا من في على الى عن هل هو هي هذا هذه ذلك تلك كيف لماذا متى اين اي او ثم مع عند بعد قبل بين لي ليش شن شنو يعني معنى اشرح وضح ممكن اريد سؤال جواب اجابه ببساطه اعطني لخص ملخص المقرر الدرس اجابتي').split(/\s+/));
  const groups = [
    ['anatomy','تشريح','التشريح'], ['physiology','فسيولوجيا','وظائف الاعضاء'],
    ['homeostasis','الاتزان الداخلي','التوازن الداخلي','الاستتباب'],
    ['bacteria','bacterial','بكتيريا','بكتريا','البكتيريا','البكتريا'],
    ['virus','viruses','viral','فيروس','فيروسات','الفيروسات'],
    ['fungi','fungus','فطريات','الفطريات'],
    ['sterilisation','sterilization','sterilise','sterilize','تعقيم','التعقيم'],
    ['disinfection','disinfect','تطهير','التطهير'], ['cleaning','تنظيف','التنظيف'],
    ['infection','infections','عدوى','العدوى'], ['spores','spore','ابواغ','الابواغ'],
    ['blood pressure','ضغط الدم'], ['vital signs','العلامات الحيويه'],
    ['hand hygiene','handwashing','غسل اليدين','نظافه اليدين'],
    ['pain','الم','الالم','وجع'], ['wound','wounds','جرح','الجروح','الجرح'],
    ['exudate','افرازات','الافرازات'], ['diabetes','diabetic','سكري','السكري'],
    ['insulin','انسولين','الانسولين'], ['glucose','جلوكوز','غلوكوز','سكر الدم'],
    ['kidney','renal','kidneys','كلى','الكلى','كلوي'], ['urine','بول','البول'],
    ['specimen','specimens','عينة','عينه','العينه','عينات','العينات'],
    ['communication','التواصل','تواصل'], ['assessment','تقييم','التقييم'],
    ['pharmacokinetics','حركيه الدواء','فارماكوكينيتكس'],
    ['pharmacodynamics','ديناميكيه الدواء','فارماكودينامكس'],
    ['fluid','fluids','سوائل','السوائل'], ['electrolytes','شوارد','الشوارد'],
    ['oxygen','oxygenation','اكسجين','الاكسجه'],
    ['research','البحث العلمي','البحث','بحث'], ['nutrition','التغذيه','تغذيه'],
    ['elderly','older','المسنين','المسن'], ['pulse','نبض','النبض'],
    ['increase','increases','increased','يزيد','يزداد','يرتفع','زياده'],
    ['decrease','decreases','decreased','ينقص','يقل','ينخفض','انخفاض'],
    ['removes','remove','eliminate','يزيل','يزيلها','ازاله'],
    ['all','جميع','كل'], ['tissues','tissue','انسجه','الانسجه'],
    ['cell','cells','خليه','خلايا','الخلايا']
  ];
  function normalize(value) {
    return String(value || '').toLowerCase().replace(/[\u064B-\u065F\u0670\u0640]/g,'')
      .replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/ة/g,'ه')
      .replace(/[^a-z0-9\u0600-\u06ff%]+/g,' ').replace(/\s+/g,' ').trim();
  }
  const aliases = groups.flatMap(g => g.map(v => [normalize(v), g[0]]))
    .sort((a,b) => b[0].length-a[0].length);
  function canonical(value) {
    let result = ' '+normalize(value)+' ';
    for (const [term,key] of aliases) result = result.split(' '+term+' ').join(' '+key+' ');
    return result.trim();
  }
  function words(value) {
    return [...new Set(canonical(value).split(/\s+/).map(w => {
      if (w.length>5 && /^(وال|بال|كال|فال)/.test(w)) return w.slice(3);
      if (w.length>4 && /^ال/.test(w)) return w.slice(2);
      return w;
    }).filter(w => w.length>1 && !stop.has(w)))];
  }
  function language(value, fallback='ar') {
    const ar = (String(value).match(/[\u0600-\u06ff]/g)||[]).length;
    const en = (String(value).match(/[A-Za-z]/g)||[]).length;
    return ar>en?'ar':en>ar?'en':fallback;
  }
  function sentences(value) {
    return String(value || '').trim().split(/(?<=[.!?؟؛])\s+|\n+/u).map(s=>s.trim()).filter(Boolean);
  }
  function search(entries, query, limit=3) {
    const queryWords = words(query);
    if (!queryWords.length) return [];
    return entries.map(entry => {
      const title = new Set(words((entry.title||'')+' '+(entry.titleAr||'')));
      const body = new Set(words(entry.text));
      const matched = queryWords.filter(w => title.has(w)||body.has(w));
      const score = matched.reduce((s,w)=>s+(title.has(w)?4:1),0);
      return {...entry,score,matched};
    }).filter(e => e.matched.length && e.score>=1)
      .sort((a,b)=>b.score-a.score||b.matched.length-a.matched.length).slice(0,limit);
  }
  function summarize(value, count=3) {
    const parts = sentences(value);
    if (parts.length<=count) return parts;
    const frequency = new Map();
    parts.forEach(s => words(s).forEach(w=>frequency.set(w,(frequency.get(w)||0)+1)));
    const ranked = parts.map((text,index)=>{
      const terms=words(text);
      const score=terms.reduce((n,w)=>n+(frequency.get(w)||0),0)/Math.sqrt(Math.max(terms.length,1));
      return {text,index,score:score+(index===0?.8:0)};
    }).sort((a,b)=>b.score-a.score).slice(0,count).sort((a,b)=>a.index-b.index);
    return ranked.map(r=>r.text);
  }
  function review(answer, reference) {
    const answerWords = new Set(words(answer));
    const ideas = sentences(reference).map(text=>{
      const terms = words(text);
      const matched = terms.filter(w=>answerWords.has(w));
      // Vocabulary overlap never establishes correctness of meaning.
      return {text,terms,matched,mentioned:terms.length>0&&matched.length/terms.length>=.45};
    });
    const negation = /\b(no|not|never|cannot|can't|without)\b|(?:^|\s)(?:لا|ليس|ليست|لم|لن|بدون|غير)(?:\s|$)/i.test(answer);
    const numbers = String(reference).match(/\d+(?:[.,]\d+)?\s*(?:%|mg|ml|mmHg|mmol\/L|مل|ملغ)?/g)||[];
    const missingNumbers = numbers.filter(n=>!String(answer).includes(n));
    return {ideas,negation,missingNumbers,answerEmpty:!String(answer).trim(),referenceEmpty:!String(reference).trim()};
  }
  function splitUtf8(value, maxBytes=450) {
    const encoder = new TextEncoder(), result=[];
    let chunk='';
    // Preserve the entire input, including spaces and punctuation, at byte boundaries.
    for (const word of String(value).split(/(\s+)/)) {
      if (encoder.encode(chunk+word).length<=maxBytes) {chunk+=word;continue;}
      if(chunk){result.push(chunk);chunk='';}
      for(const char of word){
        if(encoder.encode(chunk+char).length>maxBytes){result.push(chunk);chunk='';}
        chunk+=char;
      }
    }
    if(chunk)result.push(chunk);
    return result;
  }
  return {normalize,canonical,words,language,sentences,search,summarize,review,splitUtf8};
});
