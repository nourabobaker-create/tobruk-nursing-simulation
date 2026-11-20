'use strict';
const groupTitles = {
  interrogatives: 'كلمات الاستفهام',
  commands: 'أفعال التعليمات',
  qualifiers: 'كلمات تغيّر المطلوب',
  formats: 'طرق طرح الأسئلة'
};
const byId = id => document.getElementById(id);
function node(tag, content, className) {
  const item = document.createElement(tag);
  if (content !== undefined) item.textContent = content;
  if (className) item.className = className;
  return item;
}
function english(tag, text) {
  const item = node(tag, text, 'en');
  item.dir = 'ltr';
  item.lang = 'en';
  return item;
}
function normalise(value) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u064b-\u065f\u0670\u0640]/g, '').replace(/ى/g, 'ي').trim();
}
function renderGuide() {
  const query = normalise(byId('query').value).split(/\s+/).filter(Boolean);
  const group = byId('group').value;
  const results = document.createDocumentFragment();
  let count = 0;
  for (const [key, entries] of Object.entries(questionLanguage)) {
    if (group && key !== group) continue;
    const filtered = entries.map((entry, index) => ({ entry, translations: exampleArabic[key][index] })).filter(({ entry, translations }) => {
      const searchable = normalise([...entry, ...translations, groupTitles[key]].join(' '));
      return query.every(part => searchable.includes(part));
    });
    if (!filtered.length) continue;
    count += filtered.length;
    const section = node('div', undefined, 'card-group');
    section.append(node('h3', groupTitles[key]));
    for (const { entry: [phrase, meaning, strategy, example, model], translations } of filtered) {
      const card = node('details', undefined, 'word');
      const summary = node('summary');
      summary.append(english('strong', phrase), node('span', meaning));
      card.append(summary);
      const inside = node('div', undefined, 'inside');
      inside.append(node('p', strategy), node('strong', 'اقرأ السؤال'), english('p', example), node('strong', 'إجابة ممكنة'), english('p', model));
      const translated = node('details', undefined, 'translation');
      translated.append(node('summary', 'اعرض ترجمة السؤال والإجابة'), node('p', translations[0]), node('p', translations[1]));
      inside.append(translated);
      card.append(inside);
      section.append(card);
    }
    results.append(section);
  }
  byId('count').textContent = count ? 'عدد البطاقات المعروضة: ' + count : 'لم نجد بطاقة مطابقة. جرّب كلمة أقصر أو اختر «كل الأنواع».';
  byId('cards').replaceChildren(results);
}
byId('query').addEventListener('input', renderGuide);
byId('group').addEventListener('change', renderGuide);
function showSection() {
  const id = ['guide', 'sample', 'practice'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'guide';
  for (const panel of ['guide', 'sample', 'practice']) byId(panel).hidden = panel !== id;
  document.querySelectorAll('.sections a').forEach(link => {
    if (link.hash.slice(1) === id) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
let queue = [];
let missed = [];
let position = 0;
function startPractice(indices) {
  queue = indices;
  missed = [];
  position = 0;
  showExercise(false);
}
function button(text, handler, isPrimary = false) {
  const control = node('button', text, isPrimary ? 'action primary' : 'action');
  control.type = 'button';
  control.addEventListener('click', handler);
  return control;
}
function showExercise(moveFocus = true) {
  const area = byId('exercise');
  area.replaceChildren();
  area.className = 'practice-card';
  if (position === queue.length) {
    const title = node('h3', 'أنهيت التدريب');
    title.tabIndex = -1;
    area.append(title, node('p', 'أجبت إجابة صحيحة عن ' + (queue.length - missed.length) + ' من ' + queue.length + ' في هذه الجولة.'));
    const controls = node('div', undefined, 'button-row');
    if (missed.length) controls.append(button('تدرّب على الأسئلة التي أخطأت فيها', () => startPractice([...missed]), true));
    controls.append(button('أعد التدريب كاملاً', () => startPractice(languagePractice.map((_, i) => i))));
    area.append(controls);
    if (moveFocus) title.focus();
    return;
  }
  const entry = languagePractice[queue[position]];
  const title = node('h3', 'السؤال ' + (position + 1) + ' من ' + queue.length, 'small-title');
  title.tabIndex = -1;
  area.append(title, english('blockquote', entry.stem));
  const form = node('form');
  const group = node('fieldset');
  group.append(node('legend', entry.ask));
  const multiple = entry.correct.length > 1;
  const inputs = entry.options.map((option, index) => {
    const label = node('label', undefined, 'option');
    const input = node('input');
    input.type = multiple ? 'checkbox' : 'radio';
    input.name = 'choice';
    input.value = index;
    const labelText = /[\u0600-\u06ff]/.test(option) ? node('span', option) : english('span', option);
    label.append(input, labelText);
    group.append(label);
    return input;
  });
  const feedback = node('div', undefined, 'feedback');
  feedback.setAttribute('role', 'status');
  const check = node('button', 'تحقّق من الإجابة', 'action primary');
  check.type = 'submit';
  form.append(group, check, feedback);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (check.disabled) return;
    const selected = inputs.flatMap((input, index) => input.checked ? [index] : []);
    if (!selected.length) {
      feedback.textContent = 'اختر إجابتك أولاً.';
      inputs[0].focus();
      return;
    }
    const correct = selected.length === entry.correct.length && selected.every(index => entry.correct.includes(index));
    if (!correct) missed.push(queue[position]);
    check.disabled = true;
    inputs.forEach(input => { input.disabled = true; });
    feedback.classList.add(correct ? 'correct' : 'review');
    feedback.replaceChildren(node('strong', correct ? 'إجابتك صحيحة.' : 'راجع الكلمة التي تحدّد المطلوب.'));
    const explanation = node('ul');
    const relevant = Array.from(new Set([...selected, ...entry.correct]));
    relevant.forEach(index => {
      const line = node('li');
      const option = entry.options[index];
      const prefix = entry.correct.includes(index) ? 'الإجابة الصحيحة' : 'اختيارك';
      line.append(node('b', prefix + ' · '), /[\u0600-\u06ff]/.test(option) ? node('span', option) : english('span', option), node('span', ' — ' + entry.feedback[index]));
      explanation.append(line);
    });
    feedback.append(explanation);
    const next = button(position + 1 === queue.length ? 'اعرض نتيجة الجولة' : 'السؤال التالي', () => { position += 1; showExercise(); }, true);
    form.append(next);
    next.focus();
  });
  area.append(form);
  if (moveFocus) title.focus();
}
renderGuide();
startPractice(languagePractice.map((_, i) => i));
showSection();
window.addEventListener('hashchange', showSection);
