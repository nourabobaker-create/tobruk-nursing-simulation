const SignLanguageLessons = (() => {
  const dictionary = 'https://drive.google.com/file/d/1k0_n30ld3r9vSDPygsr2CImnzj0PdTbj/preview';
  const dictionaryPdf = 'https://drive.usercontent.google.com/download?id=1k0_n30ld3r9vSDPygsr2CImnzj0PdTbj&export=download';
  const pdfLibrary = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/legacy/build/';
  const android = 'https://play.google.com/store/apps/details?hl=ar&id=com.something.myapplicationprojettahil';
  const iphone = 'https://apps.apple.com/ly/app/id1497366215';
  const who = 'https://www.who.int/ar/news-room/questions-and-answers/item/how-to-be-hearing-loss-friendly';
  const careAccess = 'https://nad.org/knowledge-hub/position-statements/position-statement-on-health-care-access-for-deaf-patients/';
  const units = SignLanguageCurriculum;
  const progressKey = 'nur-community-sign-course-v1';
  let pdfPromise;

  const copy = {
    ar: {
      title: 'تعلّم لغة الإشارة الليبية', intro: 'ابدأ بالحروف والأرقام، ثم تعلّم كلمات تستخدمها في البيت والشارع والعيادة. شاهد الإشارة، جرّبها، وراجعها من الذاكرة.',
      units: 'الدروس', cards: 'بطاقة', minutes: 'دقيقة', progress: 'الدروس التي تمرّنت عليها', course: 'مسار التعلم',
      pick: 'اختر بطاقة لتعرف موضع الإشارة في القاموس المصوّر.', selection: 'البطاقة المختارة', page: 'صفحة القاموس', show: 'شاهد الإشارة',
      practice: 'تدرّب من الذاكرة', practiceIntro: 'أدِّ الإشارة أولًا، ثم افتح صورتها وقارن شكل اليد واتجاه الكف والحركة. علّم ما تحتاج إلى مراجعته.',
      nextCard: 'البطاقة التالية', previousCard: 'البطاقة السابقة', remember: 'أحتاج مراجعتها', remembered: 'أزيلت من قائمة المراجعة', saved: 'أضيفت إلى قائمة المراجعة',
      allCards: 'كل بطاقات الدرس', reviewCards: 'بطاقات المراجعة', reviewDone: 'أُكملت بطاقات المراجعة لهذا الدرس.', count: 'بطاقة',
      dictionary: 'القاموس الإشاري الليبي المصوّر', openPdf: 'افتح القاموس في تبويب جديد', loading: 'جارٍ عرض الصفحة من القاموس. قد يستغرق التحميل الأول لحظات.',
      pdfError: 'انتقل إلى رقم الصفحة الموضّح أعلاه في عارض القاموس. يمكنك فتح القاموس في تبويب جديد إذا تعذّر العرض المضمّن.', zoom: 'تكبير الصفحة', close: 'إغلاق العرض',
      task: 'تطبيق مع زميل', finish: 'سجّل إتمام التدريب', finished: 'تم تسجيل التدريب على هذا الجهاز', next: 'الدرس التالي', previous: 'الدرس السابق',
      health: 'إرشادات التواصل الميسّر', care: 'إتاحة التواصل في الرعاية الصحية (بالإنجليزية)', resources: 'مصادر المشاهدة',
      video: 'شاهد الحركة في مقاطع تطبيق «لغتي إشارتي» من مشروع تأهيل.', android: 'أندرويد', iphone: 'آيفون',
      origin: 'بدأت إضافة هذا المسار بعد زيارة كلية التمريض للتضامن الاجتماعي بالبطنان في 25 نوفمبر 2026.',
    },
    en: {
      title: 'Learn Libyan Sign Language', intro: 'Start with letters and numbers, then learn signs you can use at home, out and about, and in a clinic. Watch, practise and recall each sign.',
      units: 'Lessons', cards: 'Cards', minutes: 'min', progress: 'Lessons you have practised', course: 'Learning path',
      pick: 'Choose a card to find the sign in the illustrated dictionary.', selection: 'Selected card', page: 'Dictionary page', show: 'View the sign',
      practice: 'Practise from memory', practiceIntro: 'Sign first, then open the reference and compare handshape, palm orientation and movement. Mark signs you want to revisit.',
      nextCard: 'Next card', previousCard: 'Previous card', remember: 'Review this card again', remembered: 'Removed from review', saved: 'Added to review',
      allCards: 'All lesson cards', reviewCards: 'Cards to review', reviewDone: 'There are no cards left to review for this lesson.', count: 'Card',
      dictionary: 'Illustrated Libyan Sign Language dictionary', openPdf: 'Open the dictionary in a new tab', loading: 'Loading the dictionary page. The first page may take a moment.',
      pdfError: 'Go to the page number shown above in the dictionary viewer. You can open the dictionary in a new tab if the embedded viewer is unavailable.', zoom: 'Magnify the page', close: 'Close the viewer',
      task: 'Practise with a partner', finish: 'Mark practice complete', finished: 'Practice marked on this device', next: 'Next lesson', previous: 'Previous lesson',
      health: 'Guidance on accessible communication', care: 'Communication access in health care', resources: 'Video resources',
      video: 'Watch how signs move in the My Language Is Sign Language app by Project Tahil.', android: 'Android', iphone: 'iPhone',
      origin: 'This learning path began after the Faculty of Nursing visited Social Solidarity in Al Butnan on 25 November 2026.',
    },
  };

  function progress() {
    try {
      const saved = JSON.parse(localStorage.getItem(progressKey)) || {};
      return {
        complete: Array.isArray(saved.complete) ? saved.complete.filter(id => units.some(unit => unit.id === id)) : [],
        review: Array.isArray(saved.review) ? saved.review.filter(key => typeof key === 'string') : [],
      };
    } catch {
      return { complete: [], review: [] };
    }
  }

  function save(state) {
    try { localStorage.setItem(progressKey, JSON.stringify(state)); } catch { /* Practice works without storage. */ }
  }

  function unitFor(id) {
    return units.find(unit => unit.id === id) || units[0];
  }

  function link(url, label) {
    return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
  }

  function label(card, english) {
    return `<span${card.ar === card.en && /[\u0600-\u06ff]/.test(card.ar) ? ' lang="ar" dir="rtl" data-keep-language' : ''}>${esc(english ? card.en : card.ar)}</span>`;
  }

  function title(english) {
    return copy[english ? 'en' : 'ar'].title;
  }

  function cardGroups(unit, english, strings) {
    const lang = english ? 1 : 0;
    let index = 0;
    return `<p>${strings.pick}</p><div class="sign-unit-sets">${unit.sets.map(set => `<section class="sign-unit-set">
      <h3>${esc(set.title[lang])}</h3><div class="sign-token-list">${set.items.map(card => `<button type="button" class="sign-token" data-sign-card="${index}" aria-pressed="${index++ === 0}">${label(card, english)}</button>`).join('')}</div>
    </section>`).join('')}</div>
    <div class="sign-token-details" id="signTokenDetails" aria-live="polite"></div>
    <section class="sign-practice">
      <h3>${strings.practice}</h3><p>${strings.practiceIntro}</p>
      <div class="sign-review-toolbar">
        <button type="button" class="button" id="signAllCards" aria-pressed="true">${strings.allCards}</button>
        <button type="button" class="button" id="signReviewCards" aria-pressed="false">${strings.reviewCards}</button>
      </div>
      <div class="sign-practice-card" id="signPracticeCard" aria-live="polite"></div>
      <div class="sign-practice-controls">
        <button type="button" class="button" id="signPreviousCard">${strings.previousCard}</button>
        <button type="button" class="button" id="signNextCard">${strings.nextCard}</button>
      </div>
      <p class="sign-review-items" id="signReviewStatus" aria-live="polite"></p>
    </section>
    <section class="sign-course-source" id="signSource" hidden>
      <h3 tabindex="-1" id="signSourceTitle">${strings.dictionary}</h3>
      <div class="sign-course-actions">
        <button type="button" class="button" id="signSourceZoom" aria-pressed="false" disabled>${strings.zoom}</button>
        <button type="button" class="button" id="signSourceClose">${strings.close}</button>
        ${link(dictionary, strings.openPdf)}
      </div>
      <p class="sign-source-loading" id="signSourceStatus" role="status"></p>
      <div class="sign-source-canvas" id="signSourceCanvas" tabindex="0"></div>
      <div id="signSourceFallback" hidden></div>
    </section>`;
  }

  function page(english, id) {
    const strings = copy[english ? 'en' : 'ar'];
    const lang = english ? 1 : 0;
    const unit = unitFor(id);
    const state = progress();
    const position = units.indexOf(unit);
    const cardCount = units.reduce((total, entry) => total + entry.sets.reduce((sum, set) => sum + set.items.length, 0), 0);
    const lessonLink = (entry, caption) => entry ? `<a class="button" href="#sign-language=${entry.id}">${caption} · ${esc(entry.title[lang])}</a>` : '';
    const supportingLinks = unit.id === 'health' ? `<p>${link(who, strings.health)} · ${link(careAccess, strings.care)}</p>` : '';
    return `<div class="sign-course">
      <section class="sign-course-hero" aria-labelledby="signCourseTitle">
        <div><h1 id="signCourseTitle">${strings.title}</h1><p>${strings.intro}</p></div>
        <div class="sign-course-summary">
          <div><strong>${units.length}</strong><span>${strings.units}</span></div>
          <div><strong>${cardCount}</strong><span>${strings.cards}</span></div>
        </div>
        <label class="sign-course-progress" for="signCourseProgress">${strings.progress} <span id="signCourseProgressCount">${state.complete.length} / ${units.length}</span>
          <progress id="signCourseProgress" value="${state.complete.length}" max="${units.length}"></progress>
        </label>
      </section>
      <div class="sign-course-layout">
        <nav class="sign-course-nav" aria-label="${strings.course}">
          <h2>${strings.course}</h2><ol>${units.map((entry, i) => `<li><a href="#sign-language=${entry.id}"${entry.id === unit.id ? ' aria-current="step"' : ''}><span aria-hidden="true">${i + 1}</span>${esc(entry.title[lang])}</a></li>`).join('')}</ol>
        </nav>
        <div class="sign-course-content">
          <section class="sign-unit-lead" aria-labelledby="signLessonTitle">
            <h2 id="signLessonTitle">${esc(unit.title[lang])}</h2><span class="sign-unit-count">${unit.minutes} ${strings.minutes}</span>
            <p>${esc(unit.lead[lang])}</p>
          </section>
          ${unit.sets.length ? cardGroups(unit, english, strings) : SignLanguageStoryboard.markup(english)}
          <section class="sign-unit-set"><h3>${strings.task}</h3><p>${esc(unit.task[lang])}</p>${supportingLinks}</section>
          <div class="sign-course-actions">
            <button type="button" class="button" id="signComplete" ${state.complete.includes(unit.id) ? 'disabled' : ''}>${state.complete.includes(unit.id) ? strings.finished : strings.finish}</button>
          </div>
          <div class="sign-lesson-navigation">${lessonLink(units[position - 1], strings.previous)}${lessonLink(units[position + 1], strings.next)}</div>
        </div>
      </div>
      <footer class="sign-course-footer">
        <h2>${strings.resources}</h2><p>${strings.video} ${link(android, strings.android)} · ${link(iphone, strings.iphone)}</p>
        <p>${link(dictionary, strings.dictionary)}</p><p>${strings.origin}</p>
      </footer>
    </div>`;
  }

  function loadPdf() {
    if (!pdfPromise) {
      pdfPromise = import(pdfLibrary + 'pdf.min.mjs').then(async (pdf) => {
        pdf.GlobalWorkerOptions.workerSrc = pdfLibrary + 'pdf.worker.min.mjs';
        const response = await fetch(dictionaryPdf, { credentials: 'omit' });
        if (!response.ok) throw new Error('Dictionary unavailable');
        const data = new Uint8Array(await response.arrayBuffer());
        return pdf.getDocument({ data, isEvalSupported: false }).promise;
      }).catch(error => { pdfPromise = undefined; throw error; });
    }
    return pdfPromise;
  }

  function bind(main, english, id) {
    const unit = unitFor(id);
    const strings = copy[english ? 'en' : 'ar'];
    const state = progress();
    const items = unit.sets.flatMap(set => set.items);
    const complete = main.querySelector('#signComplete');
    complete.addEventListener('click', () => {
      if (state.complete.includes(unit.id)) return;
      state.complete.push(unit.id);
      save(state);
      complete.disabled = true;
      complete.textContent = strings.finished;
      main.querySelector('#signCourseProgress').value = state.complete.length;
      main.querySelector('#signCourseProgressCount').textContent = `${state.complete.length} / ${units.length}`;
    });
    if (!items.length) {
      return SignLanguageStoryboard.bind(main, english);
    }

    const details = main.querySelector('#signTokenDetails');
    const practice = main.querySelector('#signPracticeCard');
    const reviewButton = main.querySelector('#signReviewCards');
    const allButton = main.querySelector('#signAllCards');
    const previous = main.querySelector('#signPreviousCard');
    const next = main.querySelector('#signNextCard');
    const notice = main.querySelector('#signReviewStatus');
    const source = main.querySelector('#signSource');
    const sourceTitle = main.querySelector('#signSourceTitle');
    const sourceStatus = main.querySelector('#signSourceStatus');
    const sourceCanvas = main.querySelector('#signSourceCanvas');
    const sourceFallback = main.querySelector('#signSourceFallback');
    const zoom = main.querySelector('#signSourceZoom');
    const sectionCards = [...main.querySelectorAll('[data-sign-card]')];
    let reviewOnly = false;
    let position = 0;
    let request = 0;
    let returnFocus;
    const allIndices = items.map((_, index) => index);
    const cardKey = index => `${unit.id}:${items[index].ar}`;
    const isMarked = index => state.review.includes(cardKey(index));
    const queue = () => reviewOnly ? allIndices.filter(isMarked) : allIndices;

    function select(index) {
      const card = items[index];
      for (const button of sectionCards) button.setAttribute('aria-pressed', String(Number(button.dataset.signCard) === index));
      details.innerHTML = `<strong>${strings.selection} · ${label(card, english)}</strong><span>${strings.page} ${card.page}</span>
        <button class="button" type="button" data-sign-view="${index}">${strings.show}</button>`;
    }

    function showPractice() {
      const entries = queue();
      position = Math.min(position, Math.max(0, entries.length - 1));
      const index = entries[position];
      const card = items[index];
      const count = state.review.filter(key => key.startsWith(unit.id + ':')).length;
      reviewButton.textContent = `${strings.reviewCards} (${count})`;
      previous.disabled = position === 0;
      next.disabled = position >= entries.length - 1;
      if (!card) {
        practice.textContent = strings.reviewDone;
        return;
      }
      practice.innerHTML = `<span>${strings.count} ${position + 1} / ${entries.length}</span><strong>${label(card, english)}</strong>
        <div class="sign-practice-controls"><button class="button" type="button" data-sign-view="${index}">${strings.show}</button>
        <button class="button" type="button" data-sign-review="${index}" aria-pressed="${isMarked(index)}">${strings.remember}</button></div>`;
    }

    async function showPage(index, trigger) {
      const card = items[index];
      const current = ++request;
      returnFocus = trigger;
      source.hidden = false;
      sourceTitle.textContent = `${strings.dictionary} · ${strings.page} ${card.page}`;
      sourceStatus.textContent = strings.loading;
      zoom.disabled = true;
      zoom.setAttribute('aria-pressed', 'false');
      sourceCanvas.classList.remove('is-zoomed');
      sourceCanvas.replaceChildren();
      sourceFallback.hidden = true;
      sourceFallback.replaceChildren();
      sourceTitle.focus();
      try {
        const pdf = await loadPdf();
        if (current !== request || !source.isConnected) return;
        const pdfPage = await pdf.getPage(card.page);
        const viewport = pdfPage.getViewport({ scale: 1.6 });
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', `${strings.page} ${card.page}`);
        await pdfPage.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        if (current !== request || !source.isConnected) return;
        sourceCanvas.replaceChildren(canvas);
        zoom.disabled = false;
        sourceStatus.textContent = '';
      } catch {
        if (current !== request || !source.isConnected) return;
        const frame = document.createElement('iframe');
        frame.src = dictionary;
        frame.title = strings.dictionary;
        frame.referrerPolicy = 'no-referrer';
        sourceFallback.replaceChildren(frame);
        sourceFallback.hidden = false;
        sourceStatus.textContent = strings.pdfError;
      }
    }

    function setReviewMode(value) {
      reviewOnly = value;
      position = 0;
      allButton.setAttribute('aria-pressed', String(!value));
      reviewButton.setAttribute('aria-pressed', String(value));
      showPractice();
    }

    const course = main.querySelector('.sign-course');
    course.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      if (button.dataset.signCard !== undefined) select(Number(button.dataset.signCard));
      if (button.dataset.signView !== undefined) void showPage(Number(button.dataset.signView), button);
      if (button.dataset.signReview !== undefined) {
        const index = Number(button.dataset.signReview);
        const marked = isMarked(index);
        const key = cardKey(index);
        if (marked) state.review = state.review.filter(entry => entry !== key);
        else state.review.push(key);
        save(state);
        showPractice();
        notice.textContent = marked ? strings.remembered : strings.saved;
        (practice.querySelector(`[data-sign-review="${index}"]`) || reviewButton).focus();
      }
    });
    reviewButton.addEventListener('click', () => setReviewMode(true));
    allButton.addEventListener('click', () => setReviewMode(false));
    previous.addEventListener('click', () => { position -= 1; showPractice(); });
    next.addEventListener('click', () => { position += 1; showPractice(); });
    zoom.addEventListener('click', () => zoom.setAttribute('aria-pressed', String(sourceCanvas.classList.toggle('is-zoomed'))));
    main.querySelector('#signSourceClose').addEventListener('click', () => {
      request += 1;
      source.hidden = true;
      sourceCanvas.replaceChildren();
      sourceFallback.hidden = true;
      sourceFallback.replaceChildren();
      (returnFocus?.isConnected ? returnFocus : complete).focus();
    });
    select(0);
    showPractice();
  }

  return { page, title, bind };
})();
