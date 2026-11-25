const SignLanguageCurriculum = (() => {
  const alphabet = [...'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'];
  const cards = (page, items) => items.map(item => Array.isArray(item)
    ? { ar: item[0], en: item[1], page }
    : { ar: item, en: item, page });

  return [
    {
      id: 'alphabet', minutes: 12, title: ['الأبجدية الإشارية', 'The manual alphabet'],
      lead: ['تعلّم الحروف العربية الـ28 على أربع دفعات. شاهد شكل اليد واتجاه الكف. راجع مفتاح الأسهم في صفحة 11 من القاموس عندما تحتاج إلى فهم الحركة.', 'Learn the 28 Arabic letters in four sets. Watch the handshape and palm direction. See the movement key on page 11 when you need to interpret an arrow.'],
      task: ['اختر اسمًا قصيرًا. هجِّ حروفه بالترتيب، ثم اطلب من زميلك كتابة ما فهمه. بدّلا الدور وأعيدا فقط الحروف التي التبست عليكما.', 'Choose a short name. Fingerspell it in order and ask a partner to write what they understood. Take turns and repeat any letters that were unclear.'],
      sets: [0, 1, 2, 3].map((group) => ({ title: [`مجموعة الحروف ${group + 1}`, `Letter set ${group + 1}`], items: cards(12, alphabet.slice(group * 7, group * 7 + 7)) })),
    },
    {
      id: 'numbers', minutes: 12, title: ['الأرقام والعد', 'Numbers and counting'],
      lead: ['ابدأ من 0 إلى 10. زِد الأرقام حتى 20، ثم راجع العشرات. لاحظ ما يتغيّر في اتجاه الكف أو الحركة عندما تنتقل من رقم إلى آخر.', 'Start from 0 to 10, build up to 20, then review multiples of ten. Watch for changes in palm direction or movement between numbers.'],
      task: ['اختارا خمسة أرقام غير مرتّبة. يؤدي أحدكما إشارة الرقم والآخر يكتبه، ثم قارنوا النتائج بالقاموس وبدّلوا الأدوار.', 'Choose five numbers out of order. One person signs each number and the other writes it down. Compare your results with the dictionary and switch roles.'],
      sets: [
        { title: ['من 0 إلى 10', '0 to 10'], items: [...cards(239, ['0','1','2','3','4','5']), ...cards(240, ['6','7','8','9','10'])] },
        { title: ['من 11 إلى 20', '11 to 20'], items: [...cards(240, ['11']), ...cards(241, ['12','13','14','15','16','17']), ...cards(242, ['18','19','20'])] },
        { title: ['العشرات والمئات', 'Tens and hundreds'], items: [...cards(242, ['30','40','50']), ...cards(243, ['60','70','80','90','100','200'])] },
      ],
    },
    {
      id: 'greetings', minutes: 10, title: ['التحية والتعارف', 'Greetings and introductions'],
      lead: ['ابدأ بتحية وشكر، ثم تدرّب على ضمائر شائعة. لاحظ ملامح الوجه وموضع اليد عند مشاهدة الإشارة.', 'Start with a greeting and thanks, then practise common pronouns. Watch the signer’s facial expression and hand location.'],
      task: ['درّبوا موقف تعارف. يتبادل شخصان التحية ثم يتهجّيان اسميهما. اسألا زميلًا لاحظكما أي الإشارات فهمها من المشاهدة.', 'Practise introducing yourselves. Exchange greetings and fingerspell your names. Ask an observer which signs they understood.'],
      sets: [
        { title: ['التحية واللباقة', 'Greetings and courtesy'], items: [...cards(235, [['السلام عليكم','Peace be upon you'],['صديق','Friend'],['ضيف','Guest']]), ...cards(236, [['أهلًا وسهلًا','Welcome'],['شكرًا','Thank you'],['تفضّل','Please come in']])] },
        { title: ['ضمائر شائعة', 'Common pronouns'], items: cards(208, [['أنا','I'],['أنتَ','You (masculine)'],['أنتِ','You (feminine)'],['نحن','We']]) },
      ],
    },
    {
      id: 'everyday', minutes: 14, title: ['كلمات الحياة اليومية', 'Everyday vocabulary'],
      lead: ['اختر مجموعة واحدة في كل مرة. شاهد المفردة في القاموس، جرّبها، ثم أخفِ اسمها وحاول التعرّف عليها حين يؤديها زميلك.', 'Choose one set at a time. View each sign, try it, then hide the written word and identify the sign when a partner performs it.'],
      task: ['ارسموا جدولًا ليوم بسيط. يؤدي كل شخص ثلاث مفردات من الدرس، ويختار الآخر الصورة أو العنصر الذي فهمه.', 'Sketch a simple daily routine. Each person signs three words from the lesson, and their partner points to the picture or item they understood.'],
      sets: [
        { title: ['الأسرة', 'Family'], items: [...cards(17, [['الأسرة','Family'],['الأب','Father'],['الأم','Mother'],['الأخت','Sister'],['الجد','Grandfather'],['الجدة','Grandmother']]), ...cards(18, [['أخ','Brother'],['بنت','Girl'],['رضيع','Infant']])] },
        { title: ['أفعال يومية', 'Daily actions'], items: [...cards(219, [['يأكل','Eat'],['يشرب','Drink'],['ينام','Sleep'],['يستيقظ','Wake up'],['يسمع','Hear']]), ...cards(222, [['يساعد','Help']])] },
        { title: ['طعام وشراب', 'Food and drink'], items: [...cards(63, [['خبز','Bread'],['شاي','Tea'],['حليب','Milk']]), ...cards(64, [['قهوة','Coffee']]), ...cards(66, [['ماء','Water']])] },
        { title: ['الألوان', 'Colours'], items: [...cards(227, [['أزرق','Blue'],['أسود','Black'],['بني','Brown'],['رمادي','Grey'],['وردي','Pink'],['بنفسجي','Purple']]), ...cards(228, [['أحمر','Red'],['أصفر','Yellow'],['أخضر','Green'],['أبيض','White']])] },
      ],
    },
    {
      id: 'questions', minutes: 14, title: ['الأسئلة والاتجاهات والوقت', 'Questions, directions and time'],
      lead: ['درّب مفردات السؤال والمكان والوقت باستخدام خريطة صغيرة وتقويم. كرّر المفردة منفردة قبل استخدامها مع شريك.', 'Practise question words, directions and time using a small map and a calendar. Repeat a sign on its own before practising with a partner.'],
      task: ['مثّلا الوصول إلى مكان باستخدام يمين ويسار، ثم جرّبا تحديد يوم للقاء. دوّنا ما فهمه كل شخص قبل مراجعة القاموس معًا.', 'Use right and left to guide each other on a map, then choose a day to meet. Note what each person understood before checking the dictionary together.'],
      sets: [
        { title: ['أسئلة وإجابات', 'Questions and responses'], items: [...cards(214, [['ماذا؟','What?'],['كم؟','How many?']]), ...cards(215, [['أين؟','Where?'],['كيف؟','How?'],['متى؟','When?'],['لماذا؟','Why?'],['لا','No']])] },
        { title: ['المكان والاتجاهات', 'Location and directions'], items: [...cards(231, [['أمام','In front of'],['خلف','Behind'],['يمين','Right'],['يسار','Left'],['قريب','Near'],['بعيد','Far']]), ...cards(233, [['هنا','Here'],['هناك','There']])] },
        { title: ['الوقت وأيام الأسبوع', 'Time and days of the week'], items: [...cards(179, [['اليوم','Today'],['أمس','Yesterday'],['غدًا','Tomorrow'],['أسبوع','Week']]), ...cards(180, [['السبت','Saturday'],['الأحد','Sunday'],['الاثنين','Monday'],['الثلاثاء','Tuesday'],['الأربعاء','Wednesday']]), ...cards(181, [['الخميس','Thursday'],['الجمعة','Friday']])] },
      ],
    },
    {
      id: 'health', minutes: 12, title: ['مفردات الصحة والتمريض', 'Health and nursing vocabulary'],
      lead: ['تدرّب على مفردات يكثر استخدامها في الاستقبال والوصف الأولي. اسأل الشخص عن وسيلة التواصل التي يفضّلها وخاطبه مباشرة.', 'Practise signs used at reception and when describing a concern. Ask which communication method the person prefers and address them directly.'],
      task: ['في محاكاة العيادة، تبادلوا أدوار المريض وطالب التمريض والملاحظ. على الطالب سؤال المريض عن طريقة التواصل، واستخدام الطريقة المتفق عليها، وتنسيق طلب مترجم مؤهل عند شرح دواء جديد لمريض يفضّل لغة الإشارة.', 'In a clinic role-play, rotate patient, nursing student and observer roles. Ask the patient’s preference, use the agreed approach, and arrange a qualified interpreter when explaining new medication to a patient who prefers sign language.'],
      sets: [
        { title: ['أماكن وخدمات', 'Places and services'], items: [...cards(106, [['مستشفى','Hospital'],['إسعافات أولية','First aid']]), ...cards(107, [['صيدلية','Pharmacy']])] },
        { title: ['الأعراض والرعاية', 'Symptoms and care'], items: [...cards(108, [['ميزان حرارة','Thermometer'],['قياس الضغط','Blood pressure measurement']]), ...cards(110, [['ألم','Pain'],['صداع','Headache'],['حمّى','Fever']]), ...cards(113, [['دواء','Medication'],['مريض','Patient']])] },
      ],
    },
    {
      id: 'conversations', minutes: 10, title: ['مواقف تطبيقية ومراجعة', 'Practice situations and review'],
      lead: ['جرّب المواقف بالترتيب، ثم أعد التدريب مع شخص آخر. اطلب من زميلك تحديد الإشارة التي فهمها، واستعن بمستخدم متمكن للغة لتصحيح الأداء والتدرّب على الجمل.', 'Try each situation in order, then practise with another person. Ask your partner to identify the sign they understood, and practise with a fluent signer for feedback on your signing and sentences.'],
      task: ['أعد مجموعة من البطاقات في اليوم التالي ثم بعد أسبوع. راجع كل إشارة لم يتعرّف عليها شريكك. التدرب المنتظم مع مستخدمي لغة الإشارة يساعدك على الانتقال من المفردات إلى المحادثة.', 'Revisit a set of cards the next day and again after one week. Review any signs your partner did not understand. Regular practice with sign language users will help you progress from individual words to conversations.'],
      sets: [],
    },
  ];
})();
