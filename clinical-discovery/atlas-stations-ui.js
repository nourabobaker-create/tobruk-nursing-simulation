/* Atlas shares its language, bookmarking, navigation, references and printing with these stations. */
window.mountAtlasStation = function mountAtlasStation(host, entry, pair) {
  'use strict';
  const parts = entry.points;
  const order = parts.map((_, i) => i);
  let quiz = false;
  let current = 0;
  let step = 0;
  let firstTry = 0;
  let attempted = false;
  let solved = false;
  let chosen = -1;
  let finished = false;
  const action = (id,text,style='') => `<button type="button" data-action="${id}" class="${style}">${pair(text)}</button>`;
  const modeButton = (id,text,active) => `<button type="button" data-action="${id}" aria-pressed="${active}">${pair(text)}</button>`;
  const figure = () => `<figure class="station-figure"><div class="station-canvas" dir="ltr">${window.atlasArt(entry.art)}${parts.map((p,i)=>`<button type="button" data-point="${i}" class="station-pin" style="left:${p.x/6}%;top:${p.y/3.4}%" aria-pressed="${(quiz?chosen:current)===i}" aria-label="الموضع ${i+1} / Mark ${i+1}">${i+1}</button>`).join('')}</div><figcaption>${pair(entry.caption)}</figcaption></figure>`;
  const alternatives = () => `<details class="station-alt"><summary>${pair('Text description of the marked locations|وصف نصّي للمواضع المرقّمة')}</summary><ol>${parts.map(p=>`<li>${pair(p.visual)}</li>`).join('')}</ol></details>`;
  const choices = () => `<div class="station-choices">${parts.map((p,i)=>`<button type="button" data-point="${i}" aria-pressed="${(quiz?chosen:current)===i}"><b>${i+1}</b>${quiz?'':`<span>${pair(p.name)}</span>`}</button>`).join('')}</div>`;
  function feedback() {
    if(chosen<0)return '';
    const p = parts[chosen];
    return `<div class="station-feedback"><b>${pair(solved?'Correct location|الموضع صحيح':'Try another location|جرّب موضعًا آخر')}</b><p>${pair(p.name)}</p><p>${pair(p.detail)}</p></div>`;
  }
  function draw(focusId) {
    const modes = `<div class="station-modes">${modeButton('explore','Explore the drawing|استكشف الرسم',!quiz)}${modeButton('quiz','Test yourself|اختبر نفسك',quiz)}</div>`;
    const guidance = quiz ? 'Choose a number on the drawing or from the options below.|اختر رقمًا من الرسم أو من الأزرار أسفله.' : 'Select a number to see what it identifies and why it matters.|اختر رقمًا لتتعرف إلى الجزء ومعناه.';
    const prompt = parts[order[step]].prompt;
    const reading = `<h2>${pair(parts[current].name)}</h2><p>${pair(parts[current].detail)}</p>`;
    const question = `<small>${pair(`Question ${step+1} of ${order.length}|السؤال ${step+1} من ${order.length}`)}</small><h2 id="station-question" tabindex="-1">${pair(prompt)}</h2>`;
    const next = step===order.length-1?'View result|اعرض النتيجة':'Next question|السؤال التالي';
    if(finished) {
      host.innerHTML = modes+`<section class="station-finish"><h2 tabindex="-1" id="station-finished">${pair('Station complete|أكملت المحطة')}</h2><p>${pair(`Correct on the first attempt: ${firstTry} of ${order.length}.|أجبت إجابة صحيحة من المحاولة الأولى في ${firstTry} من ${order.length} أسئلة.`)}</p>${action('restart','Practise again|أعد التدريب')}</section>`;
    } else {
      host.innerHTML = modes+`<div class="station-layout"><div>${figure()}${alternatives()}</div><section class="station-panel">${quiz?question:''}<p class="station-instruction">${pair(guidance)}</p>${choices()}<div class="station-response" aria-live="polite">${quiz?feedback():reading}</div>${quiz&&solved?action('next',next,'station-next'):''}</section></div>`;
    }
    if(entry.id==='station-label'||entry.id==='station-syringe'){
      host.insertAdjacentHTML('beforeend','<a class="station-dose-link" href="../dose-math/#liquids/1">'+pair('Calculate a liquid dose in the simulator|تدرّب على حساب حجم جرعة سائلة في المحاكاة')+'</a>');
    }
    if(focusId)host.querySelector(focusId)?.focus({preventScroll:true});
  }
  function resetQuiz(){
    for(let i=order.length-1;i>0;i--){
      const other=Math.floor(Math.random()*(i+1));
      [order[i],order[other]]=[order[other],order[i]];
    }
    quiz=true; current=0;step=0;firstTry=0;attempted=false;solved=false;chosen=-1;finished=false;
    draw('#station-question');
  }
  host.onclick=e=>{
    const b=e.target.closest('button');
    if(!b||!host.contains(b))return;
    if(b.dataset.action){
      if(b.dataset.action==='explore'){if(!quiz)return; quiz=false;finished=false;draw('[data-action="explore"]');}
      else if(b.dataset.action==='restart'||(b.dataset.action==='quiz'&&!quiz))resetQuiz();
      else if(b.dataset.action==='next'&&solved) {
        if(step===order.length-1){finished=true; draw('#station-finished');}
        else {step++; attempted=false; solved=false; chosen=-1; draw('#station-question');}
      }
      return;
    }
    if(b.dataset.point===undefined||finished)return;
    const pick=Number(b.dataset.point);
    if(quiz){
      if(solved)return;
      chosen=pick;
      solved=pick===order[step];
      if(solved&&!attempted)firstTry++;
      attempted=true;
    } else { current=pick; }
    // Keep the controls and live region in place so keyboard focus and announcements survive a selection.
    host.querySelectorAll('[data-point]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.point)===pick)));
    const response=host.querySelector('.station-response');
    response.innerHTML=quiz?feedback():`<h2>${pair(parts[current].name)}</h2><p>${pair(parts[current].detail)}</p>`;
    if(quiz&&solved){
      response.insertAdjacentHTML('afterend',action('next',step===order.length-1?'View result|اعرض النتيجة':'Next question|السؤال التالي','station-next'));
    }
  };
  draw();
};
