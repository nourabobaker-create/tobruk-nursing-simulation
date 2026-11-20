"use strict";
(() => {
  const { skills, units } = DoseCases;
  const el = id => document.getElementById(id);
  const total = skills.reduce((sum, track) => sum + track.cases.length, 0);
  const validCaseIds = new Set(skills.flatMap(track => track.cases.map((_, index) => track.id + "/" + (index + 1))));
  const storageKey = "tobruk-dose-math-completed-v1";
  const started = new Set(), completedEvents = new Set();
  let skill, index, current, stepIndex, passed, revealed, done;
  function loadCompleted() {
    try {
      const read = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return new Set(Array.isArray(read) ? read.filter(id => validCaseIds.has(id)) : []);
    } catch { return new Set(); }
  }
  const completed = loadCompleted();
  function showProgress() {
    el("progress").max = total;
    el("progress").value = completed.size;
    el("progressText").textContent = completed.size + doseText(" من ", " of ") + total;
  }
  function mergeProgress() {
    for (const id of loadCompleted()) completed.add(id);
    showProgress();
  }
  window.addEventListener("storage", mergeProgress);
  function record(name, sent) {
    const id = skill.id + "/" + (index + 1);
    if (!sent.has(id) && window.PortalMetrics?.record(name, "dose-math:" + id, "simulations")) sent.add(id);
  }
  function complete() {
    done = true;
    mergeProgress();
    completed.add(skill.id + "/" + (index + 1));
    try { localStorage.setItem(storageKey, JSON.stringify([...completed])); }
    catch { el("progressNote").textContent = doseText("يظهر التقدم في هذه الجلسة. تعذّر الحفظ على الجهاز.", "Progress is available for this session. This device could not save it."); }
    record("activity_complete", completedEvents);
    showProgress();
  }
  function add(parent, tag, text, className) {
    const child = document.createElement(tag);
    if (text !== undefined) child.textContent = text;
    if (className) child.className = className;
    parent.append(child);
    return child;
  }
  function mixed(node, text) {
    node.replaceChildren();
    for (const part of text.split(/([0-9A-Za-z][0-9A-Za-zµ./-]*(?:\s+(?=[0-9A-Za-z])[0-9A-Za-zµ./-]+)*)/)) {
      if (/^[0-9A-Za-z]/.test(part)) {
        const bdi = add(node, "bdi", part);
        bdi.dir = "ltr";
      } else { node.append(document.createTextNode(part)); }
    }
  }
  function option(select, value, label) { const o = add(select, "option", label); o.value = value; }
  function showFeedback(message = "", good = false) {
    el("feedback").textContent = message;
    el("feedback").className = good ? "good" : "";
  }
  function action(title, fn, secondary = false) {
    const b = add(el("actions"), "button", title, secondary ? "secondary" : "");
    b.type = "button"; if (fn) b.addEventListener("click", fn); return b;
  }
  function parseValue(raw) {
    const value = raw.trim().replace(/[٠-٩]/g, c => c.charCodeAt(0) - 0x660)
      .replace(/[۰-۹]/g, c => c.charCodeAt(0) - 0x6f0).replace(/٫/g, ".");
    if (!/^\d*\.?\d+$/.test(value)) return {error: doseText("اكتب قيمة رقمية فقط. استخدم النقطة أو الفاصلة العشرية العربية للكسور، ثم اختر وحدة القياس.", "Enter a number only. Use a decimal point or Arabic decimal separator for fractions, then choose a unit.")};
    if (value.startsWith(".")) return {error: doseText("اكتب صفرًا قبل الفاصلة عندما تكون القيمة أقل من واحد، ثم أعد التحقق.", "Enter a leading zero before the decimal point for a value below one, then check again.")};
    if (/^0\d/.test(value)) return {error: doseText("احذف الأصفار الزائدة في بداية العدد ثم أعد التحقق.", "Remove unnecessary zeros at the start of the number, then check again.")};
    if (/\.\d*0$/.test(value)) return {error: doseText("اكتب الجرعة من دون صفر زائد في نهاية الكسر العشري، ثم أعد التحقق.", "Remove unnecessary trailing zeros after the decimal point, then check again.")};
    return {number: Number(value)};
  }
  function prepareNumbers(step, area) {
    const form = add(area, "form");
    form.id = "answerForm";
    const fields = add(form, "div", undefined, "fields");
    const entry = add(fields, "div", undefined, "field");
    add(entry, "label", doseText("القيمة", "Value")).htmlFor = "doseValue";
    const input = add(entry, "input");
    input.type = "text"; input.id = "doseValue"; input.inputMode = "decimal"; input.autocomplete = "off"; input.dir = "ltr";
    const unitField = add(fields, "div", undefined, "field");
    add(unitField, "label", doseText("الوحدة", "Unit")).htmlFor = "doseUnit";
    const select = add(unitField, "select"); select.id = "doseUnit";
    option(select, "", doseText("اختر الوحدة", "Choose a unit"));
    for (const [code, name] of Object.entries(units)) option(select, code, name);
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (passed || done || revealed) return;
      record("activity_start", started);
      const answer = parseValue(input.value);
      if (answer.error) { showFeedback(answer.error); input.focus(); return; }
      if (select.value !== step.unit) { showFeedback(doseText("راجع وحدة الناتج المطلوبة في هذه الخطوة. اختر وحدة تعبّر عن الكمية التي يحسبها السؤال.", "Check the unit requested in this step. Choose a unit that represents the quantity you are calculating.")); select.focus(); return; }
      if (Math.abs(answer.number - step.value) > Number.EPSILON * Math.max(1, step.value)) { showFeedback(step.hint); input.focus(); return; }
      input.disabled = true; select.disabled = true;
      acceptStep(step.expression);
    });
    const submit = action(doseText("تحقّق من الخطوة", "Check step"));
    submit.type = "submit"; submit.setAttribute("form", form.id);
  }
  function prepareDecision(area) {
    const form = add(area, "form"); form.id = "answerForm";
    const field = add(form, "fieldset"); add(field, "legend", doseText("أيّ إجراء تختار؟", "Which action would you choose?"));
    current.choices.forEach((choice, i) => {
      const label = add(field, "label", undefined, "choice");
      const input = add(label, "input"); input.type = "radio"; input.name = "decision"; input.value = String(i);
      label.append(document.createTextNode(choice));
    });
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (passed || done || revealed) return;
      record("activity_start", started);
      const selected = form.querySelector("input:checked");
      if (!selected) { showFeedback(doseText("اختر إجراءً أولًا.", "Choose an action first.")); return; }
      if (Number(selected.value) !== current.correct) { showFeedback(doseText("أعد قراءة معطيات الحالة. فكّر فيما ينقص لتكون الكمية والوحدة موثّقتين ومتوافقتين مع الوصفة.", "Read the case again. What must be confirmed to make sure the quantity and unit are documented and match the order?")); return; }
      field.disabled = true; acceptStep();
    });
    const submit = action(doseText("تحقّق من القرار", "Check decision")); submit.type = "submit"; submit.setAttribute("form", form.id);
  }
  function acceptStep(expression) {
    passed = true;
    const last = !current.steps || stepIndex === current.steps.length - 1;
    el("actions").replaceChildren();
    if (last) {
      complete();
      showFeedback(doseText("أكملت الحالة. ", "Case completed. ") + current.check, true);
      finishActions();
    } else {
      showFeedback(doseText("الخطوة صحيحة.", "Correct step."), true);
      action(doseText("انتقل إلى الخطوة التالية", "Continue to the next step"), () => { stepIndex++; showStep(); focusPractice(); });
    }
    if (expression) { const math = add(el("feedback"), "div", expression, "formula"); math.dir = "ltr"; }
  }
  function finishActions() {
    const finalInSkill = index + 1 === skill.cases.length;
    const lastOverall = finalInSkill && skill === skills.at(-1);
    if (!lastOverall) {
      action(finalInSkill ? doseText("المهارة التالية", "Next skill") : doseText("الحالة التالية", "Next case"), () => {
        if (finalInSkill) selectCase(skills[skills.indexOf(skill) + 1], 0);
        else selectCase(skill, index + 1);
        focusPractice();
      });
    }
    action(doseText("أعد المحاولة", "Try again"), () => { selectCase(skill, index); focusPractice(); }, true);
    if (!revealed) action(doseText("راجع خطوات الحل", "Review worked solution"), showSolution, true);
  }
  function showSolution() {
    revealed = true;
    const box = el("solution"); box.hidden = false; box.replaceChildren();
    add(box, "h3", doseText("الحل المشروح", "Worked solution"));
    if (current.steps) {
      const list = add(box, "ol");
      for (const step of current.steps) {
        const li = add(list, "li"); mixed(add(li, "span"), step.question);
        const math = add(li, "p", step.expression, "formula"); math.dir = "ltr";
      }
    } else { mixed(add(box, "p"), current.choices[current.correct]); }
    mixed(add(box, "p"), current.check);
    if (!done) {
      el("stage").replaceChildren(); showFeedback(doseText("يمكنك إعادة المحاولة لحلّ هذه الحالة وتسجيل إكمالها.", "Try this case again to solve it and record your completion."));
    }
    el("actions").replaceChildren(); finishActions();
    box.setAttribute("tabindex", "-1"); box.focus();
  }
  function focusPractice() { el("practice").focus({preventScroll:true}); }
  function showStep() {
    passed = false;
    el("actions").replaceChildren();
    const area = el("stage"); area.replaceChildren();
    showFeedback();
    if (current.steps) {
      const step = current.steps[stepIndex];
      add(area, "p", doseText("الخطوة ", "Step ") + (stepIndex + 1) + doseText(" من ", " of ") + current.steps.length, "step-count");
      mixed(add(area, "h3", "", "question"), step.question);
      prepareNumbers(step, area);
    } else { prepareDecision(area); }
    action(doseText("اعرض الحل المشروح", "Show worked solution"), showSolution, true);
  }
  function selectCase(track, number, changeUrl = true) {
    skill = track; index = number; current = track.cases[number];
    done = false; revealed = false; stepIndex = 0;
    el("topic").value = skill.id;
    el("scenario").replaceChildren();
    skill.cases.forEach((item, i) => option(el("scenario"), String(i), (i + 1) + " · " + item.title));
    el("scenario").value = String(index);
    mixed(el("caseTitle"), current.title); el("topicEn").textContent = skill.english;
    mixed(el("order"), current.order); mixed(el("labelText"), current.label);
    el("method").open = false; mixed(el("methodText"), skill.method);
    el("worked").textContent = skill.example; el("worked").hidden = !skill.example;
    el("solution").hidden = true; el("solution").replaceChildren();
    if (changeUrl) {
      try { history.replaceState(null, "", "#" + skill.id + "/" + (index + 1)); } catch {}
    }
    el("language").href = doseText("english.html", "index.html") + "#" + skill.id + "/" + (index + 1);
    showStep();
  }
  function openHash() {
    const [id, number] = location.hash.slice(1).split("/");
    const track = skills.find(s => s.id === id) || skills[0];
    const n = Number(number);
    selectCase(track, Number.isInteger(n) && n > 0 && n <= track.cases.length ? n - 1 : 0, false);
  }
  skills.forEach(track => option(el("topic"), track.id, track.title));
  el("topic").addEventListener("change", e => selectCase(skills.find(s => s.id === e.target.value), 0));
  el("scenario").addEventListener("change", e => selectCase(skill, Number(e.target.value)));
  window.addEventListener("hashchange", openHash);
  openHash(); showProgress();
})();
