(() => {
  'use strict';

  const byId = (id) => document.getElementById(id);
  const lines = [...document.querySelectorAll('[data-message-line]')];
  const cards = lines.map((line) => line.closest('li'));
  const pace = byId('pace');
  const previous = byId('previous-card');
  const next = byId('next-card');
  let index = 0;

  function updateCards() {
    const single = pace.getAttribute('aria-pressed') === 'true';
    cards.forEach((card, position) => { card.hidden = single && position !== index; });
    byId('card-navigation').hidden = !single;
    byId('card-position').textContent = single
      ? `البطاقة ${index + 1} من ${cards.length}. ${lines[index].textContent}`
      : '';
    previous.disabled = index === 0;
    next.disabled = index === cards.length - 1;
  }

  pace.hidden = false;
  pace.addEventListener('click', () => {
    pace.setAttribute('aria-pressed', String(pace.getAttribute('aria-pressed') === 'false'));
    updateCards();
  });
  previous.addEventListener('click', () => { index -= 1; updateCards(); });
  next.addEventListener('click', () => { index += 1; updateCards(); });

  byId('print').hidden = false;
  byId('print').addEventListener('click', () => window.print());

  const choices = [...document.querySelectorAll('[data-choice]')];
  choices.forEach((choice) => {
    choice.addEventListener('click', () => {
      choices.forEach((button) => button.setAttribute('aria-pressed', String(button === choice)));
      byId('choice-status').textContent = choice.dataset.choice;
    });
  });

  const listen = byId('listen');
  const audioStatus = byId('audio-status');
  const synthesis = window.speechSynthesis;
  let reading = null;
  const finish = () => {
    reading = null;
    listen.textContent = 'استمع للرسالة';
  };
  listen.hidden = false;
  listen.addEventListener('click', () => {
    if (reading) {
      finish();
      synthesis.cancel();
      audioStatus.textContent = 'توقفت القراءة.';
      return;
    }
    const voice = synthesis?.getVoices().find((voice) => /^ar(?:[-_]|$)/i.test(voice.lang));
    if (!voice || !window.SpeechSynthesisUtterance) {
      audioStatus.textContent = 'لا يتوفر صوت عربي في هذا المتصفح. يمكنك قراءة النص باستخدام قارئ الشاشة.';
      return;
    }
    const utterance = new SpeechSynthesisUtterance(lines.map((line) => line.textContent.trim()).join(' '));
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = 0.85;
    utterance.onend = () => {
      if (reading !== utterance) return;
      finish();
      audioStatus.textContent = 'انتهت القراءة.';
    };
    utterance.onerror = () => {
      if (reading !== utterance) return;
      finish();
      audioStatus.textContent = 'تعذّر تشغيل الصوت. يمكنك قراءة النص باستخدام قارئ الشاشة.';
    };
    reading = utterance;
    listen.textContent = 'أوقف القراءة';
    audioStatus.textContent = '';
    synthesis.speak(utterance);
  });
  window.addEventListener('pagehide', () => {
    if (!reading) return;
    finish();
    synthesis.cancel();
  });

  const rounds = [
    { name: 'الألف', dots: '1' },
    { name: 'الباء', dots: '12' },
    { name: 'الميم', dots: '134' },
  ];
  const dots = [...document.querySelectorAll('[data-dot]')];
  const practiceStatus = byId('practice-status');
  let roundIndex = 0;

  function showRound() {
    byId('prompt').textContent = `اختر نقاط حرف ${rounds[roundIndex].name}.`;
    dots.forEach((dot) => dot.setAttribute('aria-pressed', 'false'));
    practiceStatus.textContent = '';
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      dot.setAttribute('aria-pressed', String(dot.getAttribute('aria-pressed') === 'false'));
      practiceStatus.textContent = '';
    });
  });
  byId('check').addEventListener('click', () => {
    const chosen = dots.filter((dot) => dot.getAttribute('aria-pressed') === 'true')
      .map((dot) => dot.dataset.dot).join('');
    const round = rounds[roundIndex];
    practiceStatus.textContent = chosen === round.dots
      ? `أحسنت! هذا حرف ${round.name}.`
      : `جرّب النقاط ${[...round.dots].join('، ')}.`;
  });
  byId('next').addEventListener('click', () => {
    roundIndex = (roundIndex + 1) % rounds.length;
    showRound();
    dots[0].focus();
  });
  showRound();
  byId('practice').hidden = false;
})();
