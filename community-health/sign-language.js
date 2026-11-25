const SignLanguageLessons = (() => {
  const dictionary = 'https://drive.google.com/file/d/1k0_n30ld3r9vSDPygsr2CImnzj0PdTbj/preview';
  const hand = (id, group, ar, en, describe) => ({ id, group, ar, en, describe });
  const alphabet = [
    hand('alif', 'letters', 'ا', 'Alif', ['أغلق أصابعك واجعل الإبهام إلى أعلى. أَرِ زميلك اليد من جانبها قليلًا.', 'Make a fist with the thumb up. Turn your hand slightly sideways.']),
    hand('ba', 'letters', 'ب', 'Ba', ['وجّه كفك إلى زميلك. ارفع السبابة واثنِ الأصابع الباقية وردّ الإبهام على الكف.', 'Face your palm towards your partner. Raise the index finger and curl the others, keeping the thumb folded.']),
    hand('ta', 'letters', 'ت', 'Ta', ['وجّه كفك إلى زميلك. ارفع السبابة والوسطى متلاصقتين. اثنِ البنصر والخنصر وردّ الإبهام على الكف.', 'Face your palm towards your partner. Raise the index and middle fingers together. Curl the ring and little fingers and tuck in your thumb.']),
    hand('tha', 'letters', 'ث', 'Tha', ['وجّه كفك إلى زميلك. ارفع السبابة والوسطى والبنصر متجاورة. اثنِ الخنصر وردّ الإبهام على الكف.', 'Face your palm towards your partner. Raise the index, middle and ring fingers close together. Curl the little finger and fold the thumb.']),
    hand('sin', 'letters', 'س', 'Sin', ['وجّه كفك إلى زميلك. ارفع أربعة أصابع متقاربة واجعل الإبهام ملاصقًا لجانب الكف.', 'Face your palm towards your partner. Raise four fingers close together, with the thumb folded by the palm.']),
    hand('shin', 'letters', 'ش', 'Shin', ['وجّه كفك إلى زميلك. ارفع أربعة أصابع وباعد بينها واجعل الإبهام قرب الكف.', 'Face your palm towards your partner. Spread the four raised fingers apart. Keep the thumb folded close to the palm.']),
    hand('lam', 'letters', 'ل', 'Lam', ['وجّه كفك إلى زميلك. ارفع السبابة ومدّ الإبهام إلى الخارج. اثنِ الأصابع الثلاثة الباقية.', 'Face your palm towards your partner. Point the index finger up and extend the thumb to the side. Curl the other three fingers.']),
    hand('mim', 'letters', 'م', 'Mim', ['وجّه كفك إلى زميلك. ارفع الخنصر وحده. اثنِ الأصابع الباقية وردّ الإبهام على الكف.', 'Face your palm towards your partner. Raise only the little finger. Curl the other fingers and fold the thumb.']),
    hand('ya', 'letters', 'ي', 'Ya', ['مدّ الخنصر والإبهام بعيدًا عن بعضهما. اثنِ السبابة والوسطى والبنصر نحو الكف.', 'Spread the little finger and thumb apart. Curl the index, middle and ring fingers towards your palm.']),
  ];
  const numbers = [
    hand('one', 'numbers', '1', '1', ['وجّه ظهر يدك إلى زميلك وارفع السبابة وحدها. اطوِ بقية الأصابع.', 'Show your partner the back of your hand. Raise only the index finger and fold the others.']),
    hand('two', 'numbers', '2', '2', ['وجّه ظهر يدك إلى زميلك. ارفع السبابة والوسطى وباعد بينهما، واطوِ بقية الأصابع.', 'Show the back of your hand. Raise and spread your index and middle fingers. Fold the other fingers.']),
    hand('three', 'numbers', '3', '3', ['وجّه ظهر يدك إلى زميلك. ارفع السبابة والوسطى والبنصر، واطوِ الخنصر والإبهام.', 'Show the back of your hand. Raise the index, middle and ring fingers. Fold the little finger and thumb.']),
    hand('four', 'numbers', '4', '4', ['وجّه ظهر يدك إلى زميلك. ارفع أربعة أصابع وباعد بينها قليلًا، واترك الإبهام مطويًا.', 'Show the back of your hand. Raise and lightly spread four fingers. Keep the thumb tucked.']),
    hand('five', 'numbers', '5', '5', ['وجّه ظهر يدك إلى زميلك. افتح الأصابع الأربعة ومدّ الإبهام إلى الجانب.', 'Show the back of your hand. Open all four fingers and spread your thumb to the side.']),
    hand('seven', 'numbers', '7', '7', ['وجّه كفك إلى زميلك. ارفع السبابة والوسطى وباعد بينهما، واطوِ بقية الأصابع.', 'Show your palm. Raise and spread your index and middle fingers. Fold the other fingers.']),
    hand('ten', 'numbers', '10', '10', ['وجّه ظهر يدك إلى زميلك. ارفع السبابة والخنصر واثنِ الوسطى والبنصر واطوِ الإبهام.', 'Show the back of your hand. Raise the index and little fingers. Fold your middle finger, ring finger and thumb.']),
  ];
  const words = [
    hand('water', 'words', 'ماء', 'Water', ['اثنِ أصابع يدك اليمنى ومدّ الإبهام وحده نحو طرف فمك. انظر إلى موضع الإبهام في الرسمة.', 'Curl the fingers of your right hand and extend only your thumb towards the side of your mouth. Look at where the thumb sits in the drawing.']),
    hand('thank-you', 'words', 'شكرًا', 'Thank you', ['قرّب يدك اليمنى من جانب جبهتك الأيمن. اجعل الأصابع الأربعة متقاربة ومائلة إلى أعلى.', 'Bring your right hand to the right side of your forehead. Keep the four fingers together and angle them upwards.']),
    hand('please', 'words', 'تفضّل', 'Here you go', ['مدّ ساعدك الأيمن إلى الجانب قليلًا. افتح الكف واتركها تواجه الأعلى والأصابع متقاربة.', 'Extend your right forearm slightly to the side. Open the hand with the palm facing up and the fingers together.']),
    hand('sleep', 'words', 'ينام', 'Sleep', ['ضع كفك اليمنى مفتوحة على خدك الأيمن والأصابع إلى أعلى. أمل رأسك قليلًا إلى الكف.', 'Place your open right palm against your right cheek with the fingers pointing up. Tilt your head gently towards your hand.']),
    hand('here', 'words', 'هنا', 'Here', ['اجعل يدك اليمنى أمام صدرك وأشِر بالسبابة إلى أسفل. اثنِ الأصابع الباقية.', 'Hold your right hand in front of your chest and point your index finger down. Curl the other fingers.']),
    hand('there', 'words', 'هناك', 'There', ['مدّ سبابة يدك اليمنى باتجاه المكان البعيد وثنِ الأصابع الباقية. اتبع السهم القصير في الرسم.', 'Extend your right index finger towards the distant spot and curl your other fingers. Follow the short arrow in the drawing.']),
  ];

  const units = [
    { id: 'alphabet', titles: ['الحروف', 'Letters'], lead: ['ابدأ بالحروف ا، ب، ت، ث. جرّب الإشارة بيدك، ثم انتقل إلى حروف أخرى من أسماء تعرفها.', 'Start with Alif, Ba, Ta and Tha. Try each sign, then explore letters you recognise from names.'], items: alphabet },
    { id: 'numbers', titles: ['الأرقام', 'Numbers'], lead: ['نعدُّ من 1 إلى 5، ثم نجرّب 7 و10. قارن بين 2 و7. لاحظ كيف يتغيّر اتجاه الكف.', 'Count from 1 to 5, then try 7 and 10. Compare 2 and 7 and watch how the palm turns.'], items: numbers },
    { id: 'greetings', titles: ['كلمات نستخدمها', 'Everyday signs'], lead: ['أين نضع اليد عندما نقول «شكرًا»؟ كيف نقول «ماء»؟ اختر كلمة وجرّبها.', 'Where does your hand go when you say “thank you”? How can you sign “water”? Choose a word and try it.'], items: words },
    { id: 'game', titles: ['لعبة الإشارات', 'Sign game'] },
    { id: 'conversations', titles: ['محاكاة يوم مع الأصدقاء', 'A day with friends'] },
  ];
  const items = [...alphabet, ...numbers, ...words];
  const aliases = { everyday: 'greetings', questions: 'greetings', health: 'conversations' };
  const phrases = {
    ar: {
      title: 'رحلة اليدين', subtitle: 'نتعلّم لغة الإشارة الليبية باللعب', intro: 'شاهد شكل اليد في الرسمة، جرّبه، ثم استخدمه في اللعبة والمحاكاة.',
      lessons: 'اختر كيف تبدأ', card: 'البطاقة', of: 'من', focus: 'انظر إلى اليد', try: 'جرّبها الآن', tryText: 'قلّد الرسمة أمام مرآة أو مع صديق. بدّلا الأدوار ثم جرّبا بطاقة جديدة.',
      back: 'السابقة', next: 'التالية', sources: 'مصدر الإشارات وملاحظات للأهل',
      sourceText: 'رسومات وتمارين من إعداد «تمريض من أجل المجتمع» للأطفال بعد زيارة الكلية للتضامن الاجتماعي بالبطنان. مرجع أشكال الحروف صفحة 12، والأرقام صفحتا 239 و240، والكلمات صفحات 66 و219 و233 و236 من عارض القاموس. راجعوا الإشارات مع مستخدم متمكّن من لغة الإشارة الليبية عند التدرّب مع الأطفال.',
      sourceLink: 'القاموس الإشاري الليبي المصوّر', playNow: 'العب الآن', nextLesson: 'الدرس التالي',
      simIntro: 'اختر صورة الإشارة التي تناسب الموقف. يمكنك المحاولة أكثر من مرة.', step: 'الموقف', choose: 'اختر الإشارة رقم', correct: 'أحسنت! الإشارة هي', retry: 'حاول مرة أخرى. انظر إلى موضع اليد.', nextScene: 'الموقف التالي', finish: 'أنهِ اللعبة',
      done: 'أكملت يومًا مع الأصدقاء!', doneText: 'اختر إشارة أعجبتك وجرّبها مع شخص تحبّه.', replay: 'أعد المحاكاة',
    },
    en: {
      title: 'A Journey with Our Hands', subtitle: 'Learn Libyan Sign Language through play', intro: 'Look at the illustrated sign, try it yourself, and use it in the game and story.',
      lessons: 'Choose where to start', card: 'Card', of: 'of', focus: 'Look at the hand', try: 'Try it now', tryText: 'Copy the drawing in a mirror or with a friend. Swap roles and choose a new card.',
      back: 'Previous', next: 'Next', sources: 'Sign reference and notes for families',
      sourceText: 'Nursing for the Community made these illustrations and activities for children after the Faculty’s visit to Social Solidarity in Al Butnan. See PDF viewer page 12 for letters, 239 and 240 for numbers, and 66, 219, 233 and 236 for everyday words. Practise with a fluent Libyan Sign Language user when you can.',
      sourceLink: 'Illustrated Libyan Sign Language dictionary', playNow: 'Play now', nextLesson: 'Next lesson',
      simIntro: 'Choose the picture that fits the situation. You can try again.', step: 'Scene', choose: 'Choose sign', correct: 'Great work! The sign is', retry: 'Try again. Look at the position of the hand.', nextScene: 'Next scene', finish: 'Finish',
      done: 'You spent a day with friends!', doneText: 'Choose a sign you liked and try it with someone you know.', replay: 'Play again',
    },
  };

  const scenes = [
    { id: 'picture', title: ['رسمة لك', 'A drawing for you'], prompt: ['قدّم لك صديقك رسمة جميلة. كيف تقول «شكرًا»؟', 'Your friend gives you a drawing. How do you say “thank you”?'], choices: ['here','thank-you','sleep'], answer: 'thank-you' },
    { id: 'bench', title: ['المقعد القريب', 'The nearby bench'], prompt: ['وجدت مكانًا بجانبك لجلوس صديقك. كيف تشير إلى «هنا»؟', 'There is a seat right beside you for your friend. How do you sign “here”?'], choices: ['here','there','please'], answer: 'here' },
    { id: 'kite', title: ['الطائرة البعيدة', 'The faraway kite'], prompt: ['ترى طائرة ورقية بعيدة. كيف تُري صديقك أن مكانها «هناك»؟', 'You see a kite far away. How do you tell your friend it is “there”?'], choices: ['sleep','please','there'], answer: 'there' },
  ];

  function illustration(item) {
    return item.group === 'words' ? SignKidsWordArt.render(item.id) : SignKidsHandArt.render(item.id);
  }

  function name(item, english) {
    if (item.group === 'letters' && english) return `<span dir="rtl" lang="ar" data-keep-language>${esc(item.ar)}</span> <span>${esc(item.en)}</span>`;
    return esc(english ? item.en : item.ar);
  }

  function mascot(x, y, hair, shirt) {
    return `<g transform="translate(${x} ${y})" stroke="#263b54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-41 55q3-33 41-33t41 33v23h-82z" fill="${shirt}"/>
      <path d="M-12 24q12 13 24 0l-3-12H-9z" fill="#df9c71"/>
      <circle cx="-28" cy="-1" r="6" fill="#e5a47e"/><circle cx="28" cy="-1" r="6" fill="#e5a47e"/>
      <path d="M-27-9q-1-29 27-29T27-9v11a27 27 0 0 1-54 0z" fill="#edb28a"/>
      <path d="M-28-6q-7-31 16-38 25-9 39 10 5 8 2 25-7-3-10-15-8 13-24 8-7 9-23 10z" fill="${hair}"/>
      <path d="M-12-1v2m24-2v2M-7 10q7 8 14 0" fill="none"/>
      <path d="M-28 60v17m56-17v17" fill="none" opacity=".5"/>
    </g>`;
  }

  function heroArt() {
    return `<svg viewBox="0 0 324 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17 77Q13 47 52 38Q89 7 127 31Q158 10 190 31Q231 13 264 42Q309 49 307 85Q318 125 272 135Q246 152 205 138Q156 154 116 137Q74 154 41 128Q15 120 17 77Z" fill="#fff5c7" stroke="#e9cb7d" stroke-width="2"/>
      <path d="M54 50v18m-9-9h18M277 78v18m-9-9h18" stroke="#e07b5a" stroke-width="4" stroke-linecap="round"/>
      <path d="m144 45 13-4 6-13 8 12 14 2-9 10 3 14-13-6-12 8v-14z" fill="#f5b94b" stroke="#926e21" stroke-width="2"/>
      <path d="M49 130q110 16 223 0" fill="none" stroke="#d9bd77" stroke-width="4" stroke-linecap="round"/>
      ${mascot(109,61,'#4d3347','#78cabb')}${mascot(218,61,'#664438','#efa183')}
    </svg>`;
  }

  function sceneArt(id) {
    const props = {
      picture: '<path d="M137 87h53v40h-53z" fill="#fff7d4"/><path d="m141 120 12-15 11 12 9-13 13 16z" fill="#69ae9d"/><circle cx="173" cy="99" r="5" fill="#f3ab49"/>',
      bench: '<path d="M127 112h74v13h-74zM138 126v13m52-13v13M132 110V95h65v15" fill="#f3ba69" stroke="#946237" stroke-width="3"/>',
      kite: '<path d="m257 27 24 22-22 30-21-32z" fill="#e58873" stroke="#694f5e" stroke-width="2"/><path d="m257 27 2 52m-21-32 43 2m-22 30q-3 12 7 15t10 12" fill="none" stroke="#694f5e" stroke-width="2"/>',
    };
    return `<svg viewBox="0 0 324 154" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="324" height="154" rx="22" fill="#eaf4df"/><path d="M0 135Q145 113 324 135v19H0z" fill="#d2e8c7"/>
      <circle cx="49" cy="35" r="17" fill="#f9ce68"/><path d="M104 44q8-12 19-4 14-10 22 4" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
      ${mascot(78,66,'#4d3347','#78cabb')}${mascot(id === 'kite' ? 174 : 250,66,'#664438','#efa183')}
      ${props[id]}
    </svg>`;
  }

  function unitFor(id) {
    return units.find(unit => unit.id === (Object.hasOwn(aliases, id) ? aliases[id] : id)) || units[0];
  }

  function title(english) {
    return phrases[english ? 'en' : 'ar'].title;
  }

  function drawingCard(item, index, count, english, text) {
    return `<div class="sign-kids-view-current">
      <div class="sign-kids-figure" aria-hidden="true">${illustration(item)}</div>
      <div class="sign-kids-steps"><p class="sign-kids-count">${text.card} ${index + 1} ${text.of} ${count}</p>
        <h3>${name(item, english)}</h3><p><strong>${text.focus}</strong> ${esc(item.describe[english ? 1 : 0])}</p>
        <p><strong>${text.try}</strong> ${text.tryText}</p>
      </div>
    </div>`;
  }

  function lesson(unit, english, text) {
    const language = english ? 1 : 0;
    const after = units[units.indexOf(unit) + 1];
    return `<section class="sign-kids-stage" aria-labelledby="signKidsLessonHeading">
      <h2 id="signKidsLessonHeading">${unit.titles[language]}</h2><p class="sign-kids-instruction">${unit.lead[language]}</p>
      <div class="sign-kids-gallery" ${unit.id !== 'greetings' ? 'data-sign-kids-compact' : ''} role="group" aria-label="${unit.titles[language]}">
        ${unit.items.map((item, index) => `<button class="sign-kids-tile" type="button" data-sign-kids-item="${index}" aria-pressed="${index === 0}">${name(item, english)}</button>`).join('')}
      </div>
      <div class="sign-kids-view" id="signKidsView" aria-live="polite">${drawingCard(unit.items[0], 0, unit.items.length, english, text)}</div>
      <div class="sign-kids-controls">
        <button type="button" id="signKidsBack" disabled>${text.back}</button><button type="button" id="signKidsNext">${text.next}</button>
      </div>
      <div class="sign-kids-actions"><a href="#sign-language=${after.id}">${text.nextLesson} · ${after.titles[language]}</a><a href="#sign-language=game">${text.playNow}</a></div>
    </section>`;
  }

  function simulationRound(index, english, text) {
    const scene = scenes[index];
    const language = english ? 1 : 0;
    return `<div class="sign-kids-sim-stage">
      <div class="sign-kids-sim-character">${sceneArt(scene.id)}</div>
      <div class="sign-kids-sim-copy"><p class="sign-kids-count">${text.step} ${index + 1} ${text.of} ${scenes.length}</p>
      <h3>${scene.title[language]}</h3><p>${scene.prompt[language]}</p></div></div>
      <div class="sign-kids-sim-options">${scene.choices.map((id, choice) => {
        const item = words.find(word => word.id === id);
        return `<button type="button" data-sign-kids-choice="${choice}" aria-label="${esc(`${text.choose} ${choice + 1}. ${item.describe[language]}`)}"><span aria-hidden="true">${illustration(item)}</span></button>`;
      }).join('')}</div>
      <p class="sign-kids-status" id="signKidsSimStatus" role="status"></p>
      <div class="sign-kids-controls"><button type="button" id="signKidsSimNext" hidden>${index === scenes.length - 1 ? text.finish : text.nextScene}</button></div>`;
  }

  function simulation(english, text) {
    return `<section class="sign-kids-stage sign-kids-sim"><h2>${units.at(-1).titles[english ? 1 : 0]}</h2><p>${text.simIntro}</p><div id="signKidsSimRound">${simulationRound(0, english, text)}</div></section>`;
  }

  function page(english, id) {
    const text = phrases[english ? 'en' : 'ar'];
    const language = english ? 1 : 0;
    const unit = unitFor(id);
    const content = unit.items ? lesson(unit, english, text)
      : unit.id === 'game' ? SignKidsGame.markup(english, items) : simulation(english, text);
    return `<div class="sign-kids">
      <section class="sign-kids-header" aria-labelledby="signKidsTitle">
        <div class="sign-kids-heading"><h1 id="signKidsTitle">${text.title}</h1><p><strong>${text.subtitle}</strong></p><p>${text.intro}</p></div>
        <div class="sign-kids-hero-art">${heroArt()}</div>
      </section>
      <nav class="sign-kids-nav" aria-label="${text.lessons}">${units.map(entry => `<a href="#sign-language=${entry.id}" ${entry === unit ? 'aria-current="step"' : ''}>${entry.titles[language]}</a>`).join('')}</nav>
      ${content}
      <details class="sign-kids-note"><summary>${text.sources}</summary><p>${text.sourceText}</p>
        <a href="${dictionary}" target="_blank" rel="noopener noreferrer">${text.sourceLink} ↗</a>
      </details>
    </div>`;
  }

  function bindLesson(main, unit, english, text) {
    const view = main.querySelector('#signKidsView');
    const tiles = [...main.querySelectorAll('[data-sign-kids-item]')];
    const back = main.querySelector('#signKidsBack');
    const next = main.querySelector('#signKidsNext');
    let current = 0;
    function select(index) {
      current = index;
      tiles.forEach((tile, i) => tile.setAttribute('aria-pressed', String(i === current)));
      view.innerHTML = drawingCard(unit.items[current], current, unit.items.length, english, text);
      back.disabled = current === 0;
      next.disabled = current === unit.items.length - 1;
    }
    tiles.forEach((tile, index) => tile.addEventListener('click', () => select(index)));
    back.addEventListener('click', () => select(current - 1));
    next.addEventListener('click', () => select(current + 1));
  }

  function bindSimulation(main, english, text) {
    const round = main.querySelector('#signKidsSimRound');
    let index = 0;
    function show(next) {
      index = next;
      round.innerHTML = simulationRound(index, english, text);
      round.querySelector('button').focus();
    }
    round.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      if (button.id === 'signKidsSimReplay') { show(0); return; }
      if (button.id === 'signKidsSimNext') {
        if (index < scenes.length - 1) { show(index + 1); return; }
        round.innerHTML = `<div class="sign-kids-sim-finished"><div class="sign-kids-hero-art">${heroArt()}</div><h3>${text.done}</h3><p>${text.doneText}</p><div class="sign-kids-controls"><button type="button" id="signKidsSimReplay">${text.replay}</button></div></div>`;
        round.querySelector('#signKidsSimReplay').focus();
        return;
      }
      const scene = scenes[index];
      const choice = scene.choices[Number(button.dataset.signKidsChoice)];
      if (!choice) return;
      const status = round.querySelector('#signKidsSimStatus');
      if (choice !== scene.answer) {
        button.classList.add('is-retry');
        status.textContent = text.retry;
        return;
      }
      button.classList.add('is-correct');
      const answer = words.find(word => word.id === choice);
      status.textContent = `${text.correct} ${english ? answer.en : answer.ar}`;
      round.querySelectorAll('[data-sign-kids-choice]').forEach(option => { option.disabled = true; });
      const next = round.querySelector('#signKidsSimNext');
      next.hidden = false;
      next.focus();
    });
  }

  function bind(main, english, id) {
    const unit = unitFor(id);
    const text = phrases[english ? 'en' : 'ar'];
    if (unit.items) bindLesson(main, unit, english, text);
    else if (unit.id === 'game') SignKidsGame.bind(main, english, items, illustration);
    else bindSimulation(main, english, text);
  }

  return { page, title, bind };
})();
