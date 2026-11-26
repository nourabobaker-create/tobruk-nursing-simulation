const SignKidsGame = (() => {
  const text = {
    ar: {
      title: 'العب وتعرّف على الإشارة',
      intro: 'انظر إلى الرسم واختر الحرف أو الرقم أو الكلمة المناسبة. يمكنك المحاولة مرة أخرى.',
      cue: 'رسم لوضع اليد في الإشارة',
      round: 'جولة',
      of: 'من',
      question: 'ماذا تعني هذه الإشارة؟',
      letterQuestion: 'أيّ حرف يمثّله هذا الرسم؟',
      numberQuestion: 'أيّ رقم يمثّله هذا الرسم؟',
      correct: 'أحسنت! طابقت الإشارة مع معناها.',
      retry: 'لاحظ الأصابع والجهة الظاهرة من اليد وأيّ سهم في الرسم. ثم جرّب اختيارًا آخر.',
      next: 'الإشارة التالية',
      finish: 'اعرض نتيجة اللعب',
      summary: 'أكملت جولات التحدّي!',
      firstTry: 'طابقت من المحاولة الأولى',
      replay: 'العب من جديد',
      topic: 'بأي إشارات تريد أن تلعب؟',
      all: 'كل الإشارات',
    },
    en: {
      title: 'Play and recognise the sign',
      intro: 'Look at the drawing and choose the matching letter, number or word. You can try again.',
      cue: 'Drawing of the handshape for this sign',
      round: 'Round',
      of: 'of',
      question: 'What does this sign mean?',
      letterQuestion: 'Which letter does this drawing show?',
      numberQuestion: 'Which number does this drawing show?',
      correct: 'Well done! You matched the sign to its meaning.',
      retry: 'Check the fingers, the side of the hand you can see and any arrows. Then try another answer.',
      next: 'Next sign',
      finish: 'Show my result',
      summary: 'You finished the challenge!',
      firstTry: 'Matched on the first try',
      replay: 'Play again',
      topic: 'Which signs would you like to play with?',
      all: 'All signs',
    },
  };

  function escapeLabel(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[character]);
  }

  function shuffle(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const other = Math.floor(Math.random() * (index + 1));
      [result[index], result[other]] = [result[other], result[index]];
    }
    return result;
  }

  function markup(english, bank, groups) {
    if (bank.length < 2) return '';
    const copy = text[english ? 'en' : 'ar'];
    return `<section class="sign-kids-game" aria-labelledby="signKidsGameHeading">
      <div class="sign-kids-game-top">
        <h2 id="signKidsGameHeading">${copy.title}</h2>
        <p>${copy.intro}</p>
      </div>
      <label class="sign-kids-game-filter" for="signKidsGameGroup">${copy.topic}
        <select id="signKidsGameGroup"><option value="">${copy.all}</option>${groups.map(([id, label]) => `<option value="${escapeLabel(id)}">${escapeLabel(label)}</option>`).join('')}</select>
      </label>
      <div data-sign-kids-game-round></div>
    </section>`;
  }

  function bind(main, english, bank, art, name) {
    const game = main.querySelector('[data-sign-kids-game-round]');
    if (!game) return;
    const group = main.querySelector('#signKidsGameGroup');
    const copy = text[english ? 'en' : 'ar'];
    const languageIndex = english ? 1 : 0;
    let rounds;
    let roundIndex;
    let score;
    let tried;
    let answered;
    let correctIndex;
    let activeBank = bank;

    function choicesFor(item) {
      const others = activeBank.filter(choice => choice.id !== item.id);
      const sameGroup = shuffle(others.filter(choice => choice.group === item.group));
      const differentGroup = shuffle(others.filter(choice => choice.group !== item.group));
      return shuffle([item, ...[...sameGroup, ...differentGroup].slice(0, 2)]);
    }

    function showRound(focusQuestion) {
      const item = rounds[roundIndex];
      const choices = choicesFor(item);
      correctIndex = choices.indexOf(item);
      tried = false;
      answered = false;
      const question = item.group === 'letters' ? copy.letterQuestion : item.group === 'numbers' ? copy.numberQuestion : copy.question;
      game.innerHTML = `<p class="sign-kids-game-progress">${copy.round} ${roundIndex + 1} ${copy.of} ${rounds.length}</p>
        <h3 class="sign-kids-game-question" id="signKidsGameQuestion" tabindex="-1">${question}</h3>
        <div class="sign-kids-game-art" role="img" aria-label="${escapeLabel(item.describe?.[languageIndex] || copy.cue)}"><div aria-hidden="true">${art(item)}</div></div>
        <div class="sign-kids-game-options" role="group" aria-labelledby="signKidsGameQuestion">
          ${choices.map((choice, index) => `<button class="sign-kids-game-option" type="button" data-sign-kids-option="${index}">${name(choice, english)}</button>`).join('')}
        </div>
        <p class="sign-kids-game-feedback" role="status" data-sign-kids-feedback></p>
        <div class="sign-kids-game-actions"><button class="sign-kids-game-next" type="button" data-sign-kids-next hidden>${roundIndex + 1 === rounds.length ? copy.finish : copy.next}</button></div>`;
      if (focusQuestion) game.querySelector('#signKidsGameQuestion').focus();
    }

    function start(focusQuestion) {
      activeBank = group.value ? bank.filter(item => item.group === group.value) : bank;
      rounds = shuffle(activeBank).slice(0, 6);
      roundIndex = 0;
      score = 0;
      showRound(focusQuestion);
    }

    function finish() {
      game.innerHTML = `<div class="sign-kids-game-result">
        <h3 class="sign-kids-game-question" id="signKidsGameResult" tabindex="-1">${copy.summary}</h3>
        <p>${copy.firstTry} <b>${score} / ${rounds.length}</b></p>
        <div class="sign-kids-game-actions"><button class="sign-kids-game-replay" type="button" data-sign-kids-replay>${copy.replay}</button></div>
      </div>`;
      game.querySelector('#signKidsGameResult').focus();
    }

    game.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button || button.getAttribute('aria-disabled') === 'true') return;
      if (button.hasAttribute('data-sign-kids-replay')) {
        start(true);
        return;
      }
      if (button.hasAttribute('data-sign-kids-next')) {
        roundIndex += 1;
        if (roundIndex === rounds.length) finish();
        else showRound(true);
        return;
      }
      if (!button.hasAttribute('data-sign-kids-option') || answered) return;

      const feedback = game.querySelector('[data-sign-kids-feedback]');
      if (Number(button.dataset.signKidsOption) !== correctIndex) {
        tried = true;
        button.classList.add('is-retry');
        button.setAttribute('aria-disabled', 'true');
        feedback.textContent = copy.retry;
        return;
      }

      if (!tried) score += 1;
      answered = true;
      button.classList.add('is-correct');
      for (const choice of game.querySelectorAll('[data-sign-kids-option]')) {
        choice.setAttribute('aria-disabled', 'true');
      }
      feedback.textContent = copy.correct;
      const next = game.querySelector('[data-sign-kids-next]');
      next.hidden = false;
      next.focus();
    });
    group.addEventListener('change', () => start(false));
    start(false);
  }

  return { markup, bind };
})();
