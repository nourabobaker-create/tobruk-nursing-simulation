const SignLanguageLessons = (() => {
  const dictionary = 'https://drive.google.com/file/d/1k0_n30ld3r9vSDPygsr2CImnzj0PdTbj/preview';
  const publisher = 'https://www.libyasigns.care/ليبيا/القاموس';
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

  const arabicAlphabet = [...'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'];
  const starterWordPages = [66, 236, 236, 219, 233, 233];
  const withArt = (module, group) => module.items.map(item => ({
    ...item, group: group ?? item.group, page: item.page ?? item.sourcePage ?? (group === 'letters' ? 12 : undefined), render: module.render,
  }));
  const starterWords = words.map((word, index) => ({ ...word, page: starterWordPages[index], render: SignKidsWordArt.render }));
  const wordById = new Map(starterWords.map(item => [item.id, item]));
  const alphabetIndex = new Map([...alphabet.map(item => ({ ...item, page: 12, render: SignKidsHandArt.render })),
    ...withArt(SignKidsMoreLetters, 'letters')].map(item => [item.ar, { ...item, artId: item.id, id: `letter-${item.id}` }]));
  const letters = arabicAlphabet.map(letter => alphabetIndex.get(letter));
  const numberCards = [...numbers.map(item => ({ ...item, page: Number(item.ar) <= 5 ? 239 : 240, render: SignKidsHandArt.render })),
    ...withArt(SignKidsMoreNumbers, 'numbers')].sort((a, b) => Number(a.ar) - Number(b.ar));
  const daily = withArt(SignKidsDailyArt);
  const community = withArt(SignKidsCommunityArt);
  const speech = withArt(SignKidsConversationArt);
  const makeWords = (id, titles, lead, cards) => ({ id, titles, lead, items: cards.map(item => ({ ...item, group: id })), kind: 'words' });
  const vocabulary = [
    makeWords('greetings', ['التحية والأسئلة', 'Greetings and questions'], ['جرّب إشارة للتحية، ثم اختَر بطاقة مثل «شكرًا» أو «أين؟».', 'Try a greeting, then choose a card for “Thank you” or “Where?”'],
      [wordById.get('thank-you'), wordById.get('please'), ...speech]),
    makeWords('family', ['البيت والأسرة والطعام', 'Home, family and food'], ['جرّب إشارات الأسرة. ثم اختَر شيئًا تأكله أو تشربه.', 'Try signs for family members, then choose something to eat or drink.'],
      [...withArt(SignKidsHomeArt), wordById.get('water'), wordById.get('sleep')]),
    makeWords('daily', ['يومي ومشاعري', 'My day and feelings'], ['جرّب إشارة تصف شعورك أو شيئًا تفعله في يومك.', 'Try a sign for how you feel or something you do during the day.'], daily),
    makeWords('places', ['الأماكن والاتجاهات', 'Places and directions'], ['دلّ صديقك على شيء قريب أو بعيد. جرّبا الإشارة مع لعبة أو رسمة.', 'Show a friend something near or far. Practise with a toy or drawing.'],
      [wordById.get('here'), wordById.get('there'), ...community.filter(item => item.topic === 'place')]),
    makeWords('time', ['الوقت', 'Time'], ['فكّر في شيء فعلته أمس أو ستفعله غدًا، ثم اختَر بطاقة الوقت التي تناسبه.', 'Think of something you did yesterday or will do tomorrow, then choose the time card that fits.'], community.filter(item => item.topic === 'time')),
    makeWords('colors', ['الألوان', 'Colours'], ['ابحث عن لون في الغرفة وجرّب إشارته.', 'Find a colour in the room and try its sign.'], community.filter(item => item.topic === 'colors')),
  ];
  const units = [
    { id: 'alphabet', titles: ['الحروف', 'Letters'], lead: ['تعلّم الحروف العربية الـ28 في أربع مجموعات. شاهد الرسمة، ثم استخدم الحروف لتهجئة كلمة.', 'Learn all 28 Arabic letters in four sets. Watch each drawing, then use the letters to fingerspell a word.'], items: letters },
    { id: 'numbers', titles: ['الأرقام', 'Numbers'], lead: ['عدّ من 0 إلى 20 على أربع دفعات. اتبع الأسهم أو ترتيب اللقطات حين تتحرّك اليد.', 'Count from 0 to 20 in four sets. Follow the arrows or panels when the hand moves.'], items: numberCards },
    { id: 'greetings', titles: ['الكلمات', 'Words'] },
    { id: 'game', titles: ['لعبة الإشارات', 'Sign game'] },
    { id: 'conversations', titles: ['محاكاة يوم مع الأصدقاء', 'A day with friends'] },
  ];
  const wordCount = vocabulary.reduce((total, unit) => total + unit.items.length, 0);
  const items = [...letters, ...numberCards, ...vocabulary.flatMap(unit => unit.items)];
  const byId = new Map(items.map(item => [item.id, item]));
  const aliases = { everyday: 'family', questions: 'greetings', health: 'conversations' };
  const phrases = {
    ar: {
      title: 'رحلة اليدين', subtitle: 'نتعلّم لغة الإشارة الليبية باللعب', intro: 'شاهد شكل اليد في الرسمة، جرّبه، ثم استخدمه في اللعبة والمحاكاة.',
      lessons: 'اختر كيف تبدأ', card: 'البطاقة', of: 'من', focus: 'انظر إلى اليد', try: 'جرّبها الآن', tryText: 'قلّد الرسمة أمام مرآة أو مع صديق. بدّلا الأدوار ثم جرّبا بطاقة جديدة.',
      back: 'السابقة', next: 'التالية', sources: 'مصدر الإشارات وملاحظات للأهل',
      sourceText: 'أعدّت مبادرة «تمريض من أجل المجتمع» الرسومات والتمارين للأطفال. مراجعة أداء الإشارات مع شخص أصم متمكّن من لغة الإشارة الليبية والكلية ما زالت بانتظار التوثيق.',
      pages: 'صفحات عارض القاموس في هذا الدرس', set: 'مجموعة', wordGroups: 'اختر مجموعة الكلمات', overview: ['حرفًا', 'رقمًا', 'كلمة'],
      spelling: 'لنتهجَّ كلمة!', spellIntro: 'اختر كلمة أو اكتب كلمة قصيرة من حروف الدرس.', spellLabel: 'كلمة من ثمانية حروف أو أقل', spellButton: 'اعرض الإشارات', spellingError: 'اختر كلمة من 1 إلى 8 حروف من الأبجدية الأساسية.',
      sourceLink: 'القاموس الإشاري الليبي المصوّر', publisherLink: 'صفحة القاموس لدى الناشر', playNow: 'العب الآن', nextLesson: 'الدرس التالي',
      compareTitle: 'تحدّي الرقمين 2 و7',
      comparePrompt: 'ترتفع السبابة والوسطى في الرسمين. أيّ رسم يمثّل 7؟',
      compareRetry: 'جرّب الرسم الآخر. في إشارة 7 يرى زميلك راحة يدك.',
      compareCorrect: 'أحسنت! في إشارة 7 يرى زميلك راحة يدك، وفي إشارة 2 يرى ظهرها.',
      simIntro: 'اختر صورة الإشارة التي تناسب الموقف. يمكنك المحاولة أكثر من مرة.', step: 'الموقف', choose: 'اختر الإشارة رقم', correct: 'أحسنت! الإشارة هي', retry: 'حاول مرة أخرى. انظر إلى موضع اليد.', nextScene: 'الموقف التالي', finish: 'أنهِ اللعبة',
      done: 'أكملت يومًا مع الأصدقاء!', doneText: 'اختر إشارة أعجبتك وجرّبها مع شخص تحبّه.', replay: 'أعد المحاكاة',
    },
    en: {
      title: 'A Journey with Our Hands', subtitle: 'Learn Libyan Sign Language through play', intro: 'Look at the illustrated sign, try it yourself, and use it in the game and story.',
      lessons: 'Choose where to start', card: 'Card', of: 'of', focus: 'Look at the hand', try: 'Try it now', tryText: 'Copy the drawing in a mirror or with a friend. Swap roles and choose a new card.',
      back: 'Previous', next: 'Next', sources: 'Sign reference and notes for families',
      sourceText: 'Nursing for the Community made these illustrations and activities for children. Documented review of sign performance with a fluent Deaf Libyan Sign Language user and the Faculty is pending.',
      pages: 'Dictionary viewer pages for this lesson', set: 'Set', wordGroups: 'Choose a word group', overview: ['letters', 'numbers', 'words'],
      spelling: 'Let’s fingerspell a word!', spellIntro: 'Choose a word or enter a short word using the letters in this lesson.', spellLabel: 'An Arabic word of up to eight letters', spellButton: 'Show the signs', spellingError: 'Choose a word of 1 to 8 letters from the basic Arabic alphabet.',
      sourceLink: 'Illustrated Libyan Sign Language dictionary', publisherLink: 'Dictionary page on the publisher’s website', playNow: 'Play now', nextLesson: 'Next lesson',
      compareTitle: 'The 2 and 7 challenge',
      comparePrompt: 'The index and middle fingers are raised in both drawings. Which drawing shows 7?',
      compareRetry: 'Try the other drawing. For 7, your partner sees your palm.',
      compareCorrect: 'Well done! For 7, your partner sees your palm. For 2, they see the back of your hand.',
      simIntro: 'Choose the picture that fits the situation. You can try again.', step: 'Scene', choose: 'Choose sign', correct: 'Great work! The sign is', retry: 'Try again. Look at the position of the hand.', nextScene: 'Next scene', finish: 'Finish',
      done: 'You spent a day with friends!', doneText: 'Choose a sign you liked and try it with someone you know.', replay: 'Play again',
    },
  };

  const scenes = [
    { id: 'meet', title: ['بداية اليوم', 'The start of the day'], prompt: ['وصل صديقك. كيف تحيّيه بإشارة «السلام عليكم»؟', 'Your friend arrives. How do you sign “Peace be upon you”?'], choices: ['welcome', 'peace', 'thank-you'], answer: 'peace' },
    { id: 'picture', title: ['رسمة لك', 'A drawing for you'], prompt: ['قدّم لك صديقك رسمة جميلة. كيف تقول «شكرًا»؟', 'Your friend gives you a drawing. How do you say “thank you”?'], choices: ['here','thank-you','sleep'], answer: 'thank-you' },
    { id: 'snack', title: ['استراحة صغيرة', 'A short break'], prompt: ['عطشت بعد اللعب. كيف تطلب «ماء» بالإشارة؟', 'You are thirsty after playing. How do you ask for “water”?'], choices: ['milk','bread','water'], answer: 'water' },
    { id: 'bench', title: ['المقعد القريب', 'The nearby bench'], prompt: ['وجدت مكانًا بجانبك لجلوس صديقك. كيف تشير إلى «هنا»؟', 'There is a seat right beside you for your friend. How do you sign “here”?'], choices: ['here','there','please'], answer: 'here' },
    { id: 'kite', title: ['الطائرة البعيدة', 'The faraway kite'], prompt: ['ترى طائرة ورقية بعيدة. كيف تُري صديقك أن مكانها «هناك»؟', 'You see a kite far away. How do you tell your friend it is “there”?'], choices: ['sleep','please','there'], answer: 'there' },
    { id: 'color', title: ['طائرة بلون جميل', 'A colourful kite'], prompt: ['طائرتكما لونها أحمر. أي رسم يعني «أحمر»؟', 'Your kite is red. Which drawing signs “red”?'], choices: ['green','red','yellow'], answer: 'red' },
    { id: 'goodnight', title: ['حان وقت الراحة', 'Time to rest'], prompt: ['عاد صديقك إلى البيت وأراد أن ينام. ما إشارة «ينام»؟', 'Your friend came home and wanted to sleep. How do you sign “sleep”?'], choices: ['sleep','here','water'], answer: 'sleep' },
  ];

  function illustration(item) {
    return item.render(item.artId ?? item.id);
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
      meet: '<path d="M125 103h56l18 9-17 11h-56z" fill="#f8c477" stroke="#925d45" stroke-width="2"/><path d="M126 84h42m-29-9h29" stroke="#e98776" stroke-width="3" stroke-linecap="round"/>',
      picture: '<path d="M137 87h53v40h-53z" fill="#fff7d4"/><path d="m141 120 12-15 11 12 9-13 13 16z" fill="#69ae9d"/><circle cx="173" cy="99" r="5" fill="#f3ab49"/>',
      snack: '<path d="M127 108h67v14h-67z" fill="#e5b78a"/><path d="M151 76h32l-5 31h-22z" fill="#fff" stroke="#486787" stroke-width="2"/><path d="M153 88q7 3 15 0t13 0l-3 18h-22z" fill="#76c3dd"/>',
      bench: '<path d="M127 112h74v13h-74zM138 126v13m52-13v13M132 110V95h65v15" fill="#f3ba69" stroke="#946237" stroke-width="3"/>',
      kite: '<path d="m257 27 24 22-22 30-21-32z" fill="#e58873" stroke="#694f5e" stroke-width="2"/><path d="m257 27 2 52m-21-32 43 2m-22 30q-3 12 7 15t10 12" fill="none" stroke="#694f5e" stroke-width="2"/>',
      color: '<path d="m162 71 25 23-25 36-24-36z" fill="#d95e57" stroke="#71394b" stroke-width="2"/><path d="M162 71v60m-24-37h49m-25 36q17 0 25 12" fill="none" stroke="#823848" stroke-width="2"/>',
      goodnight: '<path d="M168 29a17 17 0 1 0 8 32 17 17 0 0 1-8-32z" fill="#ffe085" stroke="#b08137" stroke-width="2"/><path d="M143 41v12m-6-6h12m44-13v10m-5-5h10" stroke="#eeb357" stroke-width="2.4" stroke-linecap="round"/>',
    };
    return `<svg viewBox="0 0 324 154" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="324" height="154" rx="22" fill="#eaf4df"/><path d="M0 135Q145 113 324 135v19H0z" fill="#d2e8c7"/>
      <circle cx="49" cy="35" r="17" fill="#f9ce68"/><path d="M104 44q8-12 19-4 14-10 22 4" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
      ${mascot(78,66,'#4d3347','#78cabb')}${mascot(id === 'kite' ? 174 : 250,66,'#664438','#efa183')}
      ${props[id]}
    </svg>`;
  }

  function unitFor(id) {
    const key = Object.hasOwn(aliases, id) ? aliases[id] : id;
    return vocabulary.find(unit => unit.id === key) || units.find(unit => unit.id === key) || units[0];
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

  function deckSize(unit) {
    return unit.id === 'alphabet' ? 7 : 6;
  }

  function wordNav(unit, language, text) {
    return `<nav class="sign-kids-word-nav" aria-label="${text.wordGroups}">${vocabulary.map(entry => `<a href="#sign-language=${entry.id}" ${entry === unit ? 'aria-current="page"' : ''}>${entry.titles[language]}</a>`).join('')}</nav>`;
  }

  function deckButtons(unit, active, text) {
    const size = deckSize(unit);
    return Array.from({ length: Math.ceil(unit.items.length / size) }, (_, index) => {
      const first = index * size;
      const last = Math.min(first + size, unit.items.length) - 1;
      const range = unit.kind === 'words' ? `${first + 1}–${last + 1}` : `${unit.items[first].ar}–${unit.items[last].ar}`;
      return `<button type="button" data-sign-kids-set="${first}" aria-pressed="${index === active}">${text.set} ${index + 1}<span dir="auto"${unit.id === 'alphabet' ? ' lang="ar" data-keep-language' : ''}>${range}</span></button>`;
    }).join('');
  }

  function tiles(unit, current, english) {
    const pageSize = deckSize(unit);
    const start = Math.floor(current / pageSize) * pageSize;
    return unit.items.slice(start, start + pageSize).map((item, local) => {
      const index = start + local;
      return `<button class="sign-kids-tile" type="button" data-sign-kids-item="${index}" aria-pressed="${index === current}">${name(item, english)}</button>`;
    }).join('');
  }

  function spelling(text) {
    return `<details class="sign-kids-note sign-kids-spelling"><summary>${text.spelling}</summary>
      <p>${text.spellIntro}</p><div class="sign-kids-spelling-examples">${['باب', 'قلم', 'ورد', 'بيت'].map(word => `<button type="button" lang="ar" dir="rtl" data-keep-language data-sign-kids-example="${word}">${word}</button>`).join('')}</div>
      <form id="signKidsSpellForm"><label for="signKidsSpellInput">${text.spellLabel}</label><div class="sign-kids-spelling-controls"><input id="signKidsSpellInput" type="text" dir="rtl" lang="ar" maxlength="16" autocomplete="off" spellcheck="false"><button>${text.spellButton}</button></div></form>
      <div id="signKidsSpellingResult" aria-live="polite"></div>
    </details>`;
  }

  function numberContrast(english, text) {
    return `<details class="sign-kids-note" id="signKidsNumberContrast">
      <summary>${text.compareTitle}</summary>
      <p id="signKidsNumberQuestion">${text.comparePrompt}</p>
      <div class="sign-kids-sim-options" role="group" aria-labelledby="signKidsNumberQuestion">
        ${['two', 'seven'].map(id => {
          const item = byId.get(id);
          return `<button type="button" data-sign-kids-number="${id}" aria-label="${esc(item.describe[english ? 1 : 0])}"><span aria-hidden="true">${illustration(item)}</span></button>`;
        }).join('')}
      </div>
      <p class="sign-kids-status" role="status"></p>
    </details>`;
  }

  function lesson(unit, english, text) {
    const language = english ? 1 : 0;
    const after = unit.kind === 'words' ? vocabulary[vocabulary.indexOf(unit) + 1] : units[units.indexOf(unit) + 1];
    return `${unit.kind === 'words' ? wordNav(unit, language, text) : ''}<section class="sign-kids-stage" id="signKidsStage" aria-labelledby="signKidsLessonHeading">
      <h2 id="signKidsLessonHeading">${unit.titles[language]}</h2><p class="sign-kids-instruction">${unit.lead[language]}</p>
      ${unit.items.length > deckSize(unit) ? `<div class="sign-kids-decks" id="signKidsDecks">${deckButtons(unit, 0, text)}</div>` : ''}
      <div class="sign-kids-gallery" id="signKidsGallery" ${unit.kind !== 'words' ? 'data-sign-kids-compact' : ''} role="group" aria-label="${unit.titles[language]}">
        ${tiles(unit, 0, english)}
      </div>
      <div class="sign-kids-view" id="signKidsView" aria-live="polite">${drawingCard(unit.items[0], 0, unit.items.length, english, text)}</div>
      <div class="sign-kids-controls">
        <button type="button" id="signKidsBack" disabled>${text.back}</button><button type="button" id="signKidsNext">${text.next}</button>
      </div>
      ${unit.id === 'alphabet' ? spelling(text) : ''}
      ${unit.id === 'numbers' ? numberContrast(english, text) : ''}
      <div class="sign-kids-actions">${after ? `<a href="#sign-language=${after.id}">${text.nextLesson} · ${after.titles[language]}</a>` : ''}<a href="#sign-language=game">${text.playNow}</a></div>
    </section>`;
  }

  function simulationRound(index, english, text) {
    const scene = scenes[index];
    const language = english ? 1 : 0;
    return `<div class="sign-kids-sim-stage">
      <div class="sign-kids-sim-character">${sceneArt(scene.id)}</div>
      <div class="sign-kids-sim-copy"><p class="sign-kids-count">${text.step} ${index + 1} ${text.of} ${scenes.length}</p>
      <h3 id="signKidsSimHeading" tabindex="-1" aria-describedby="signKidsSimPrompt">${scene.title[language]}</h3><p id="signKidsSimPrompt">${scene.prompt[language]}</p></div></div>
      <div class="sign-kids-sim-options">${scene.choices.map((id, choice) => {
        const item = byId.get(id);
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
      : unit.id === 'game' ? SignKidsGame.markup(english, items, [
        ['letters', units[0].titles[language]], ['numbers', units[1].titles[language]], ...vocabulary.map(entry => [entry.id, entry.titles[language]]),
      ]) : simulation(english, text);
    const pages = [...new Set(unit.items?.map(item => item.page).filter(Number.isInteger))].sort((a, b) => a - b);
    const totals = [letters.length, numberCards.length, wordCount];
    return `<div class="sign-kids">
      <section class="sign-kids-header" aria-labelledby="signKidsTitle">
        <div class="sign-kids-heading"><h1 id="signKidsTitle">${text.title}</h1><p><strong>${text.subtitle}</strong></p><p>${text.intro}</p>
          <ul class="sign-kids-overview">${totals.map((count, i) => `<li><strong>${count}</strong> ${text.overview[i]}</li>`).join('')}</ul></div>
        <div class="sign-kids-hero-art">${heroArt()}</div>
      </section>
      <nav class="sign-kids-nav" aria-label="${text.lessons}">${units.map(entry => `<a href="#sign-language=${entry.id}" ${entry.id === unit.id || (entry.id === 'greetings' && unit.kind === 'words') ? 'aria-current="step"' : ''}>${entry.titles[language]}</a>`).join('')}</nav>
      ${content}
      <details class="sign-kids-note"><summary>${text.sources}</summary><p>${text.sourceText}</p>${pages.length ? `<p>${text.pages} <bdi>${pages.join(' · ')}</bdi></p>` : ''}
        <p><a href="${dictionary}" target="_blank" rel="noopener noreferrer">${text.sourceLink} ↗</a></p>
        <a href="${publisher}" target="_blank" rel="noopener noreferrer">${text.publisherLink} ↗</a>
      </details>
    </div>`;
  }

  function bindLesson(main, unit, english, text) {
    const view = main.querySelector('#signKidsView');
    const stage = main.querySelector('#signKidsStage');
    const gallery = main.querySelector('#signKidsGallery');
    const sets = [...main.querySelectorAll('[data-sign-kids-set]')];
    const back = main.querySelector('#signKidsBack');
    const next = main.querySelector('#signKidsNext');
    let current = 0;
    function select(index) {
      const previousGroup = Math.floor(current / deckSize(unit));
      current = index;
      const group = Math.floor(current / deckSize(unit));
      if (group !== previousGroup) gallery.innerHTML = tiles(unit, current, english);
      gallery.querySelectorAll('[data-sign-kids-item]').forEach(tile => tile.setAttribute('aria-pressed', String(Number(tile.dataset.signKidsItem) === current)));
      sets.forEach((button, i) => button.setAttribute('aria-pressed', String(i === group)));
      view.innerHTML = drawingCard(unit.items[current], current, unit.items.length, english, text);
      back.disabled = current === 0;
      next.disabled = current === unit.items.length - 1;
    }
    stage.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      const index = button.dataset.signKidsItem ?? button.dataset.signKidsSet;
      if (index !== undefined) select(Number(index));
    });
    back.addEventListener('click', () => select(current - 1));
    next.addEventListener('click', () => select(current + 1));
    if (unit.id === 'alphabet') bindSpelling(main, english, text);
    if (unit.id === 'numbers') bindNumberContrast(main, text);
  }

  function bindNumberContrast(main, text) {
    const exercise = main.querySelector('#signKidsNumberContrast');
    const status = exercise.querySelector('[role="status"]');
    exercise.addEventListener('click', event => {
      const choice = event.target.closest('[data-sign-kids-number]');
      if (!choice || choice.getAttribute('aria-disabled') === 'true') return;
      const correct = choice.dataset.signKidsNumber === 'seven';
      choice.classList.add(correct ? 'is-correct' : 'is-retry');
      choice.setAttribute('aria-disabled', 'true');
      status.textContent = correct ? text.compareCorrect : text.compareRetry;
      if (correct) exercise.querySelectorAll('[data-sign-kids-number]').forEach(button => button.setAttribute('aria-disabled', 'true'));
    });
  }

  function bindSpelling(main, english, text) {
    const form = main.querySelector('#signKidsSpellForm');
    const input = main.querySelector('#signKidsSpellInput');
    const result = main.querySelector('#signKidsSpellingResult');
    function show() {
      const clean = input.value.normalize('NFC').replace(/[\u0640\u064b-\u065f\s]+/g, '');
      const requested = [...clean].map(letter => alphabetIndex.get(letter));
      if (!requested.length || requested.length > 8 || requested.some(item => !item)) {
        result.textContent = text.spellingError;
        return;
      }
      result.innerHTML = `<ol class="sign-kids-spelling-cards" dir="rtl">${requested.map(item => `<li><div aria-hidden="true">${illustration(item)}</div><strong>${name(item, english)}</strong></li>`).join('')}</ol>`;
    }
    form.addEventListener('submit', event => { event.preventDefault(); show(); });
    main.querySelectorAll('[data-sign-kids-example]').forEach(button => button.addEventListener('click', () => {
      input.value = button.dataset.signKidsExample;
      show();
    }));
  }

  function bindSimulation(main, english, text) {
    const round = main.querySelector('#signKidsSimRound');
    let index = 0;
    function show(next) {
      index = next;
      round.innerHTML = simulationRound(index, english, text);
      round.querySelector('#signKidsSimHeading').focus();
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
      const answer = byId.get(choice);
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
    else if (unit.id === 'game') SignKidsGame.bind(main, english, items, illustration, name);
    else bindSimulation(main, english, text);
  }

  return { page, title, bind };
})();
