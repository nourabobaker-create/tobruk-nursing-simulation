const SignLanguageStoryboard = (() => {
  const scenes = [
    {
      ar: {
        title: 'أول لقاء',
        frames: [
          ['السلام عليكم', 'تلتقي زميلًا جديدًا. استدعِ التحية من درس التحية والتعارف وأدِّها.'],
          ['اسمي…', 'تبادلا التعريف بالنفس. هجّئ اسمك الأول من الحروف التي تدربت عليها.'],
          ['شكرًا', 'هل تعرّف زميلك على حروف اسمك؟ أعد الحرف الذي التبس، ثم بدّلا الأدوار.'],
        ],
      },
      en: {
        title: 'Meeting someone',
        frames: [
          ['Hello', 'You meet a new classmate. Recall a greeting from the greetings lesson and sign it.'],
          ['My name…', 'Take turns introducing yourselves. Fingerspell your first name with the letters you practised.'],
          ['Thank you', 'Did your partner recognise the letters in your name? Repeat any unclear letter, then switch roles.'],
        ],
      },
    },
    {
      ar: {
        title: 'السؤال عن مكان',
        frames: [
          ['أين؟', 'أنت في مبنى جديد وتبحث عن مكان الانتظار. استدعِ إشارة «أين؟» من درس الأسئلة.'],
          ['يمين أم يسار؟', 'يختار زميلك اتجاهًا ويؤدّيه بالإشارة. حدّد الاتجاه الذي فهمته.'],
          ['أعدها من فضلك', 'إذا التبس الاتجاه، اطلب إعادة الإشارة بالطريقة التي اتفقتما عليها، ثم بدّلا الأدوار.'],
        ],
      },
      en: {
        title: 'Asking the way',
        frames: [
          ['Where?', 'You are in a new building and need to find the waiting area. Recall the sign for “Where?” from the questions lesson.'],
          ['Right or left?', 'Your partner picks a direction and signs it. Identify the direction you understood.'],
          ['Please repeat', 'If the direction was unclear, ask for it again using the method you agreed on, then switch roles.'],
        ],
      },
    },
    {
      ar: {
        title: 'استقبال في العيادة',
        frames: [
          ['أهلًا وسهلًا', 'وصل زائر إلى الاستقبال. استقبله بتحية تعلمتها، واختَر مكانًا يمكنه فيه رؤية وجهك ويديك.'],
          ['كيف تفضّل التواصل؟', 'اتفقا على وسيلة تواصل، ثم دلّه على مكان الانتظار.'],
          ['دعم التواصل', 'قال الزائر إنه يفضّل لغة الإشارة ويحتاج إلى شرح تعليمات دوائه. تدرّب على طلب دعم مترجم مؤهل بالتنسيق مع المشرف.'],
        ],
      },
      en: {
        title: 'At the clinic',
        frames: [
          ['Welcome', 'A visitor arrives at reception. Use a greeting you learned and stand where they can see your face and hands.'],
          ['How do you prefer to communicate?', 'Agree on a way to communicate, then show them where to wait.'],
          ['Communication support', 'The visitor prefers sign language and needs medication instructions explained. Practise arranging a qualified interpreter with your supervisor.'],
        ],
      },
    },
  ];

  const labels = {
    ar: {
      heading: 'مشاهد قصيرة للتدرّب',
      intro: 'اختر موقفًا ومثّله مع زميلك. تعرض الرسوم سياق التمرين، وتجد صورة الإشارة أو حركتها في درسها.',
      scene: 'اختر المشهد',
      previous: 'اللقطة السابقة',
      next: 'اللقطة التالية',
      play: 'تشغيل المشهد',
      pause: 'إيقاف مؤقت',
      frame: (number, total) => `اللقطة ${number} من ${total}`,
    },
    en: {
      heading: 'Short practice scenes',
      intro: 'Choose a scene and act it out with a partner. The cartoons set up each exercise. See its lesson for the illustrated or filmed sign.',
      scene: 'Choose a scene',
      previous: 'Previous frame',
      next: 'Next frame',
      play: 'Play scene',
      pause: 'Pause',
      frame: (number, total) => `Frame ${number} of ${total}`,
    },
  };

  function markup(english) {
    const language = english ? 'en' : 'ar';
    const copy = labels[language];
    const frames = scenes[0][language].frames;
    return `<section class="panel sign-board" id="sign-language-scenes" aria-labelledby="sign-board-heading">
      <h2 id="sign-board-heading">${copy.heading}</h2>
      <p>${copy.intro}</p>
      <div class="sign-board-tabs choice-row" role="group" aria-label="${copy.scene}">
        ${scenes.map((scene, index) => `<button class="button" type="button" data-sign-board-scene="${index}" aria-pressed="${index === 0}">${scene[language].title}</button>`).join('')}
      </div>
      <div class="sign-board-stage" data-sign-board-stage data-sign-board-setting="0" aria-live="polite">
        <div class="sign-board-art">
          <span class="sign-board-person sign-board-person-first" aria-hidden="true"></span>
          <strong class="sign-board-prop" data-sign-board-prop>${frames[0][0]}</strong>
          <span class="sign-board-person sign-board-person-second" aria-hidden="true"></span>
        </div>
        <p data-sign-board-prompt>${frames[0][1]}</p>
        <p class="sign-board-counter" data-sign-board-counter>${copy.frame(1, frames.length)}</p>
      </div>
      <div class="sign-board-controls choice-row">
        <button class="button" type="button" data-sign-board-previous disabled>${copy.previous}</button>
        <button class="button" type="button" data-sign-board-play>${copy.play}</button>
        <button class="button" type="button" data-sign-board-next>${copy.next}</button>
      </div>
    </section>`;
  }

  function bind(main, english) {
    const board = main.querySelector('.sign-board');
    if (!board) return;

    const language = english ? 'en' : 'ar';
    const copy = labels[language];
    const stage = board.querySelector('[data-sign-board-stage]');
    const prop = board.querySelector('[data-sign-board-prop]');
    const prompt = board.querySelector('[data-sign-board-prompt]');
    const counter = board.querySelector('[data-sign-board-counter]');
    const previous = board.querySelector('[data-sign-board-previous]');
    const next = board.querySelector('[data-sign-board-next]');
    const play = board.querySelector('[data-sign-board-play]');
    const sceneButtons = [...board.querySelectorAll('[data-sign-board-scene]')];
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let scene = 0;
    let frame = 0;
    let timer = null;
    let cueAnimation;
    const frames = () => scenes[scene][language].frames;

    function pause() {
      if (timer !== null) clearInterval(timer);
      timer = null;
      play.textContent = copy.play;
      stage.setAttribute('aria-live', 'polite');
    }

    function render() {
      const [cue, guidance] = frames()[frame];
      prop.textContent = cue;
      prompt.textContent = guidance;
      counter.textContent = copy.frame(frame + 1, frames().length);
      previous.disabled = frame === 0;
      next.disabled = frame === frames().length - 1;
      stage.setAttribute('data-sign-board-setting', String(scene));
      cueAnimation?.cancel();
      if (!reducedMotion?.matches) {
        cueAnimation = prop.animate?.([
          { opacity: 0, transform: 'translateY(6px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 220, easing: 'ease-out' });
      }
    }

    sceneButtons.forEach((button, index) => button.addEventListener('click', () => {
      pause();
      scene = index;
      frame = 0;
      sceneButtons.forEach((item, i) => item.setAttribute('aria-pressed', String(i === scene)));
      render();
    }));
    previous.addEventListener('click', () => {
      pause();
      frame = Math.max(0, frame - 1);
      render();
    });
    next.addEventListener('click', () => {
      pause();
      frame = Math.min(frames().length - 1, frame + 1);
      render();
    });
    play.addEventListener('click', () => {
      if (timer !== null) {
        pause();
        return;
      }
      play.textContent = copy.pause;
      stage.setAttribute('aria-live', 'off');
      if (frame === frames().length - 1) {
        frame = 0;
        render();
      }
      timer = setInterval(() => {
        if (board.isConnected === false || frame === frames().length - 1) {
          pause();
          return;
        }
        frame += 1;
        render();
      }, 6000);
    });

    return pause;
  }

  return { markup, bind };
})();
