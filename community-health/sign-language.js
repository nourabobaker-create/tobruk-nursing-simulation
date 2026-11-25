const SignLanguageLessons = (() => {
  const dictionary = 'https://www.libyasigns.care/%D9%84%D9%8A%D8%A8%D9%8A%D8%A7/%D8%A7%D9%84%D9%82%D8%A7%D9%85%D9%88%D8%B3';
  const illustratedDictionary = 'https://drive.google.com/file/d/1k0_n30ld3r9vSDPygsr2CImnzj0PdTbj/preview';
  const android = 'https://play.google.com/store/apps/details?hl=ar&id=com.something.myapplicationprojettahil';
  const iphone = 'https://apps.apple.com/ly/app/id1497366215';
  const who = 'https://www.who.int/ar/news-room/questions-and-answers/item/how-to-be-hearing-loss-friendly';
  const careAccess = 'https://nad.org/knowledge-hub/position-statements/position-statement-on-health-care-access-for-deaf-patients/';

  const lessons = [
    {
      id: 'sign-language-greetings',
      ar: {
        title: 'التحية بلغة الإشارة الليبية',
        watch: 'افتح القاموس المصوّر وانظر إلى «السلام عليكم» في صفحة القارئ 235، وإلى «أهلًا وسهلًا» و«شكرًا» في صفحة 236. استعن بمقاطع تطبيق «لغتي إشارتي» للتدرّب على حركة اليد واتجاهها.',
        practice: 'تبادل مع زميلك دورَي الزائر والمستقبل. أدِّ الإشارتين، ثم ليحدّد زميلك معنى كل واحدة. قارنا الأداء بالفيديو وأعيدا ما التبس.',
      },
      en: {
        title: 'Greetings in Libyan Sign Language',
        watch: 'Open the illustrated dictionary. Find “Peace be upon you” on PDF page 235, and “Welcome” and “Thank you” on page 236. Use the clips in the My Language Is Sign Language app to practise hand movement and orientation.',
        practice: 'Take turns playing the visitor and the receptionist. Sign both words and ask your partner to identify each one. Replay the clips together to check your signing.',
      },
    },
    {
      id: 'sign-language-name',
      ar: {
        title: 'الحروف وتهجئة الاسم بالأصابع',
        watch: 'افتح الصفحة 12 في القارئ لعرض حروف الأبجدية الإشارية في القاموس المصوّر. ابحث عن حروف اسمك الأول، وتمرّن على كل حرف أمام مرآة قبل وصل الحروف بالترتيب.',
        practice: 'هجِّ اسمًا قصيرًا أمام زميلك ودعه يكتبه كما فهمه. إذا التبس حرف، عُد إلى المرجع وأعد تهجئته ببطء. بدّلا الأدوار.',
      },
      en: {
        title: 'The alphabet and fingerspelling your name',
        watch: 'Open page 12 of the illustrated dictionary to see the manual alphabet. Find the letters of your first name and practise them in a mirror before spelling the full name.',
        practice: 'Fingerspell a short name and ask your partner to write down what they understood. Check any unclear letter against the reference, spell it again slowly and switch roles.',
      },
    },
    {
      id: 'sign-language-reception',
      ar: {
        title: 'الاستقبال واختيار طريقة التواصل',
        watch: 'افتح القاموس المصوّر وتدرّب على «أين؟» في صفحة القارئ 215، و«يمين» و«يسار» في صفحة 231. في تدريب الاستقبال، قف حيث يرى الشخص وجهك ويديك وخاطبه مباشرة.',
        practice: 'ابدأ بتحية ثم اسأل عن طريقة التواصل المفضلة. جهّز بطاقة أو شاشة تعرض «لغة الإشارة»، «الكتابة»، و«طريقة أخرى» ليختار الشخص. استعمل الطريقة المتفق عليها لتوجيهه إلى مكان الانتظار.',
      },
      en: {
        title: 'Reception and communication preferences',
        watch: 'Use the illustrated dictionary to practise “Where?” on PDF page 215 and “Right” and “Left” on page 231. When you greet someone, stand where they can see your face and hands, and address them directly.',
        practice: 'Greet the person and ask how they prefer to communicate. Offer a card or screen with “Sign language”, “Writing” and “Another way”. Use the agreed approach to show them where to wait.',
      },
    },
    {
      id: 'sign-language-simulation',
      ar: {
        title: 'محاكاة تمريضية في العيادة',
        watch: 'وصل مريض أصم إلى العيادة، ويفضّل لغة الإشارة ويحتاج إلى شرح تعليمات دواء جديد. مثّلوا الموقف في مجموعة من ثلاثة أدوار: طالب تمريض، ومريض، وملاحظ.',
        practice: 'على الملاحظ أن يسجّل ثلاث خطوات: سأل الطالب عن الطريقة المفضلة، وخاطب المريض مباشرة بالطريقة المتفق عليها، وطلب مترجم لغة إشارة مؤهلًا لشرح تعليمات الدواء. بدّلوا الأدوار بعد التعقيب.',
        question: 'ماذا تفعل إذا تواصلت مع المريض في الاستقبال بإشارات بسيطة؟',
        answer: 'استخدم الإشارات التي تعلّمتها للتحية، ثم نسّق مع المشرف لطلب مترجم مؤهل للتواصل بشأن تعليمات الدواء، بحسب تفضيل المريض وإجراءات المرفق. واصل مخاطبة المريض مباشرة أثناء الترجمة.',
      },
      en: {
        title: 'A nursing simulation in the clinic',
        watch: 'A Deaf patient arrives at the clinic. They prefer sign language and need an explanation of instructions for a new medication. Assign three roles: nursing student, patient and observer.',
        practice: 'The observer checks whether the student asked about the preferred method, addressed the patient directly using the agreed method, and requested a qualified sign language interpreter for medication instructions. Rotate roles after feedback.',
        question: 'What do you do if you have managed to greet the patient using basic signs?',
        answer: 'Use the signs you learned for the greeting. Coordinate with your supervisor to request a qualified interpreter for the medication discussion, following the patient’s preference and the facility’s process. Continue speaking directly to the patient through the interpreter.',
      },
    },
  ];

  function sourceLink(url, label) {
    return `<a class="button" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
  }

  function title(english) {
    return english ? 'Libyan Sign Language for nursing' : 'لغة الإشارة الليبية في التمريض';
  }

  function page(english) {
    const copy = english ? {
      intro: 'Four beginner lessons for nursing students, developed following the Faculty of Nursing’s visit to Social Solidarity in Al Butnan on 25 November 2026. Start by watching Libyan signs and practise using them to welcome a patient.',
      resources: 'Watch and practise',
      online: 'The lessons are available offline after the site has loaded. The source videos and dictionary links require internet access.',
      dictionary: 'Libya Signs resources',
      illustratedDictionary: 'Open the illustrated dictionary (PDF)',
      android: 'My Language Is Sign Language for Android',
      iphone: 'My Language Is Sign Language for iPhone',
      exercise: 'Practise',
      sources: 'Further reading on accessible communication',
      who: 'WHO guidance on communication (Arabic)',
      careAccess: 'Communication access in health care (English)',
    } : {
      intro: 'أربعة دروس للمبتدئين من طلبة التمريض، أُعدّت إثر زيارة الكلية للتضامن الاجتماعي بالبطنان يوم 25 نوفمبر 2026. ابدأ بمشاهدة الإشارات الليبية وتمرّن على استخدامها في استقبال المريض.',
      resources: 'مصادر المشاهدة والتطبيق',
      online: 'يمكن قراءة الدروس دون اتصال بعد تحميل الموقع. مقاطع المشاهدة وروابط القاموس تحتاج إلى الإنترنت.',
      dictionary: 'مصادر ليبيا ساينز',
      illustratedDictionary: 'افتح القاموس الإشاري المصوّر (PDF)',
      android: 'لغتي إشارتي لأندرويد',
      iphone: 'لغتي إشارتي لآيفون',
      exercise: 'تطبيق',
      sources: 'مراجع التواصل الميسّر',
      who: 'إرشادات منظمة الصحة العالمية للتواصل',
      careAccess: 'إتاحة التواصل في الرعاية الصحية (بالإنجليزية)',
    };

    return `<div class="page-head"><h1>${title(english)}</h1><p>${esc(copy.intro)}</p></div>
      <section class="panel">
        <h2>${esc(copy.resources)}</h2>
        <p>${esc(copy.online)}</p>
        <div class="choice-row">${sourceLink(illustratedDictionary, copy.illustratedDictionary)}${sourceLink(dictionary, copy.dictionary)}${sourceLink(android, copy.android)}${sourceLink(iphone, copy.iphone)}</div>
      </section>
      <div class="topic-grid">${lessons.map(({ id, ar, en }, index) => {
        const lesson = english ? en : ar;
        return `<section class="panel" id="${id}">
          <h2>${index + 1}. ${esc(lesson.title)}</h2>
          <p>${esc(lesson.watch)}</p>
          <p><b>${esc(copy.exercise)}</b> ${esc(lesson.practice)}</p>
          ${lesson.question ? `<details class="section-references"><summary>${esc(lesson.question)}</summary><p>${esc(lesson.answer)}</p></details>` : ''}
        </section>`;
      }).join('')}</div>
      <section class="panel"><h2>${esc(copy.sources)}</h2>
        <div class="choice-row">${sourceLink(who, copy.who)}${sourceLink(careAccess, copy.careAccess)}</div>
      </section>`;
  }

  return { page, title };
})();
