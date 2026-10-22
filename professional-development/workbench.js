(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else { root.DevelopmentWorkbench = api; api.start(root); }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const roles = ['staff', 'ta', 'faculty'];
  const tools = ['plan', 'week', 'prepare'];
  const planFields = ['goal', 'skill', 'action', 'evidence', 'date', 'reflection'];
  const priorities = ['normal', 'high', 'low'];
  const statuses = ['planned', 'doing', 'done'];
  const storagePrefix = 'tobruk-development-workbench-v1:';
  const copy = {
    ar: {
      heading: 'أدوات أستخدمها في عملي', intro: 'حوّل التعلّم إلى خطوة واضحة وخطة تتابعها بنفسك.', privacy: 'مساحة شخصية على هذا الجهاز فقط. لا تُرسل الكتابة إلى الكلية. تجنّب أسماء الطلبة والمرضى والبيانات الشخصية أو السرية. الحفظ والتأشير إقرار ذاتي، ولا يثبتان إنجازًا مؤسسيًا أو شهادة.',
      plan: 'خطة تطويري', week: 'خطة أسبوعي', prepare: 'قائمة الاستعداد', planHelp: 'اختر مهارة واحدة، وحدد ما ستطبقه وما ستراجعه لتعرف إن كان التطوير قد أفاد عملك.', weekHelp: 'رتّب حتى 5 مهام لهذا الأسبوع. أدرج المهمة والخطوة المطلوبة، دون أسماء أشخاص أو بيانات حالات.', prepareHelp: 'تذكيرات عملية عامة تعدّلها في عملك؛ لا تحل محل دليل الكلية أو تعليمات أستاذ المادة أو المشرف.',
      goal: 'ما الذي أريد تحسينه؟', skill: 'المهارة التي سأطورها', action: 'خطوتي العملية التالية', evidence: 'ما الشاهد الذي سأراجعه؟', date: 'موعد المراجعة', reflection: 'ماذا تغيّر بعد التطبيق؟',
      goalPlaceholder: 'مثال: تقليل الوقت الذي أقضيه في تنظيم الملفات', evidencePlaceholder: 'مثال: مقارنة الوقت أو مراجعة نموذج عمل خالٍ من البيانات الشخصية', reflectionPlaceholder: 'ما الذي أفاد؟ وما الذي أحتاج إلى تعديله؟',
      task: 'المهمة', priority: 'الأولوية', due: 'الموعد', status: 'الحالة', normal: 'متوسطة', high: 'عالية', low: 'منخفضة', planned: 'لم تبدأ', doing: 'قيد العمل', done: 'اكتملت بحسب إقراري', taskPlaceholder: 'مهمة أو خطوة عمل',
      save: 'حفظ على هذا الجهاز', export: 'تصدير نسختي JSON', clear: 'مسح هذه الأداة', saved: 'حُفظت هذه الأداة على هذا الجهاز.', draft: 'تعديلات غير محفوظة على هذا الجهاز؛ اضغط حفظًا للاحتفاظ بها بعد إغلاق الصفحة.', exportReady: 'جُهّزت نسختك للتنزيل. الملف شخصي ولا يُرسل إلى الكلية.', cleared: 'مُسحت بيانات هذه الأداة على هذا الجهاز.', confirmClear: 'هل تريد مسح بيانات هذه الأداة لهذه المساحة من هذا الجهاز؟', storageError: 'تعذّر الحفظ في المتصفح. تبقى التعديلات في هذه الصفحة؛ صدّر نسختك قبل مغادرتها.', noStorage: 'التخزين على هذا الجهاز غير متاح. يمكنك العمل في الصفحة وتصدير نسخة قبل إغلاقها.', progress: 'بنود أُشّر عليها', of: 'من', checklistNote: 'يمكن إلغاء التأشير عند الحاجة. العلامات تذكير شخصي، وليست إثباتًا على استيفاء إجراء أو كفاءة.', staffTitle: 'قبل معالجة طلب أو خدمة', taTitle: 'قبل جلسة عملية وبعدها', facultyTitle: 'قبل التدريس والتقييم وبعدهما',
      staffChecks: ['حددت الخدمة أو الطلب والنتيجة المطلوبة بوضوح.', 'راجعت الدليل أو الإجراء المناسب، وحدود اختصاصي.', 'حددت المستندات والخطوة التالية دون تكرار غير ضروري.', 'تأكدت من وضوح رسالة الرد وسهولة فهمها.', 'حددت موعد المتابعة والجهة التي أراجعها عند التعثر.', 'راجعت ما إذا كان يمكن تحسين خطوة أو تقليل تأخير.'],
      taChecks: ['اتفقت مع أستاذ المادة على هدف الجلسة ودوري فيها.', 'راجعت متطلبات التحضير والموارد والمكان مع المشرف.', 'أعددت شرحًا مختصرًا وعرضًا تدريبيًا مناسبًا للهدف.', 'خططت لفرصة ممارسة وأسئلة تحقق من الفهم.', 'أعددت طريقة لملاحظات محددة ومحترمة بعد الممارسة.', 'حددت ما أرفعه لأستاذ المادة وما أعدله للجلسة التالية.'],
      facultyChecks: ['حددت ما سيتمكن الطلبة من فعله بعد التعلم.', 'واءمت النشاط وطريقة التقييم مع مخرجات التعلم.', 'راجعت وضوح التعليمات ومعايير التقييم للطلبة.', 'هيأت المواد بطريقة مقروءة وأتحت بدائل مناسبة عند الحاجة.', 'خططت لملاحظات محددة تساعد الطلبة على التحسن.', 'حددت كيف سأراجع استجابة الطلبة وأحسن التدريس لاحقًا.']
    },
    en: {
      heading: 'Tools for my work', intro: 'Turn learning into a clear action and a plan you can follow up.', privacy: 'Personal workspace on this device only. Your writing is not sent to the Faculty. Do not enter student or patient names, personal details or confidential information. Saved plans and checked items are self-reports, not institutional completion records or certificates.',
      plan: 'My development plan', week: 'My weekly plan', prepare: 'Preparation checklist', planHelp: 'Choose one skill, specify what you will apply and decide what you will review to assess whether it helped your work.', weekHelp: 'Organise up to 5 tasks for this week. Describe the task and next step without names or case information.', prepareHelp: 'General practical reminders to adapt to your work. They do not replace Faculty guides or instructions from the course instructor or supervisor.',
      goal: 'What do I want to improve?', skill: 'Skill I will develop', action: 'My next practical step', evidence: 'What evidence will I review?', date: 'Review date', reflection: 'What changed after applying it?',
      goalPlaceholder: 'Example: reduce the time I spend organising files', evidencePlaceholder: 'Example: compare time spent or review a work sample without personal data', reflectionPlaceholder: 'What helped, and what should I change?',
      task: 'Task', priority: 'Priority', due: 'Due date', status: 'Status', normal: 'Medium', high: 'High', low: 'Low', planned: 'Not started', doing: 'In progress', done: 'Completed — self-report', taskPlaceholder: 'Task or next step',
      save: 'Save on this device', export: 'Export my JSON copy', clear: 'Clear this tool', saved: 'This tool was saved on this device.', draft: 'Unsaved changes on this device. Select Save to retain them after closing the page.', exportReady: 'Your copy is ready to download. This personal file is not sent to the Faculty.', cleared: 'This tool’s data was cleared on this device.', confirmClear: 'Clear this tool’s data for this space on this device?', storageError: 'Browser storage is unavailable. Changes remain on this page; export a copy before leaving.', noStorage: 'Storage on this device is unavailable. You can work on this page and export a copy before closing it.', progress: 'Items checked', of: 'of', checklistNote: 'Uncheck an item whenever needed. These are personal reminders, not proof of compliance or competence.', staffTitle: 'Before handling a request or service', taTitle: 'Before and after a practical session', facultyTitle: 'Before and after teaching and assessment',
      staffChecks: ['I identified the requested service and the intended result.', 'I checked the relevant guide or procedure and the limits of my responsibility.', 'I identified required documents and the next step without unnecessary duplication.', 'I checked that the response is clear and easy to understand.', 'I set a follow-up date and identified whom to consult if the work is blocked.', 'I reviewed whether a step could be improved or a delay reduced.'],
      taChecks: ['I agreed the session objective and my role with the course instructor.', 'I checked preparation requirements, resources and the location with the supervisor.', 'I prepared a concise explanation and demonstration suited to the objective.', 'I planned practice opportunities and questions to check understanding.', 'I prepared a way to give specific, respectful feedback after practice.', 'I identified what to report to the instructor and what to change next time.'],
      facultyChecks: ['I identified what students should be able to do after learning.', 'I aligned the activity and assessment method with learning outcomes.', 'I checked that instructions and assessment criteria are clear to students.', 'I made materials readable and considered suitable alternatives where needed.', 'I planned specific feedback to help students improve.', 'I decided how to review students’ responses and improve teaching later.']
    }
  };
  const cleanText = (value, limit) => typeof value === 'string' ? value.slice(0, limit) : '';
  const cleanDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '') ? value : '';
  function normalise(value) {
    const source = value && typeof value === 'object' ? value : {};
    const plan = Object.fromEntries(planFields.map(field => [field, field === 'date' ? cleanDate(source.plan?.[field]) : cleanText(source.plan?.[field], field === 'skill' ? 160 : 1200)]));
    const week = Array.from({ length: 5 }, (_, index) => {
      const row = source.week?.[index] || {};
      return { task: cleanText(row.task, 300), priority: priorities.includes(row.priority) ? row.priority : 'normal', due: cleanDate(row.due), status: statuses.includes(row.status) ? row.status : 'planned' };
    });
    const prepare = Array.from({ length: 6 }, (_, index) => source.prepare?.[index] === true);
    return { plan, week, prepare };
  }
  function start(window) {
    const document = window.document;
    if (!document) return;
    const drafts = Object.create(null), selected = Object.create(null);
    let role = 'staff', lang = 'ar', host = null, available = true, messageKey = '';
    const text = key => copy[lang][key];
    const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    const pickRole = value => roles.includes(value) ? value : 'staff';
    const pickLang = value => value === 'en' ? 'en' : 'ar';
    function load(currentRole) {
      if (drafts[currentRole]) return drafts[currentRole];
      let value;
      try { value = JSON.parse(window.localStorage.getItem(storagePrefix + currentRole) || 'null'); }
      catch (_) { available = false; }
      drafts[currentRole] = normalise(value);
      selected[currentRole] = 'plan';
      return drafts[currentRole];
    }
    function capture() {
      if (!host) return;
      const data = load(role);
      host.querySelectorAll('[data-wb-field]').forEach(field => {
        const name = field.dataset.wbField;
        if (planFields.includes(name)) data.plan[name] = field.value;
      });
      host.querySelectorAll('[data-wb-row]').forEach(field => {
        const index = Number(field.dataset.wbRow), name = field.dataset.wbColumn;
        if (Number.isInteger(index) && index >= 0 && index < 5 && ['task', 'priority', 'due', 'status'].includes(name)) data.week[index][name] = field.value;
      });
      host.querySelectorAll('[data-wb-check]').forEach(field => {
        const index = Number(field.dataset.wbCheck);
        if (Number.isInteger(index) && index >= 0 && index < 6) data.prepare[index] = field.checked;
      });
      drafts[role] = normalise(data);
    }
    function report(key) {
      messageKey = key;
      const status = host?.querySelector('[data-wb-status]');
      if (status) status.textContent = text(key);
    }
    function metrics(tool, action, event) {
      return `data-metrics-event="${event || 'resource_open'}" data-metrics-item="development:${role}:workbench:${tool}:${action}"`;
    }
    function planForm(data) {
      const placeholders = { goal: 'goalPlaceholder', evidence: 'evidencePlaceholder', reflection: 'reflectionPlaceholder' };
      return `<p class="wb-help">${escape(text('planHelp'))}</p><div class="wb-fields">${planFields.map(field => `<label class="wb-field${['goal', 'action', 'evidence', 'reflection'].includes(field) ? ' wb-wide' : ''}" for="wb-${field}"><span>${escape(text(field))}</span>${field === 'date' ? `<input id="wb-${field}" type="date" data-wb-field="${field}" value="${escape(data.plan[field])}">` : field === 'skill' ? `<input id="wb-${field}" data-wb-field="${field}" maxlength="160" value="${escape(data.plan[field])}">` : `<textarea id="wb-${field}" data-wb-field="${field}" maxlength="1200" rows="2"${placeholders[field] ? ` placeholder="${escape(text(placeholders[field]))}"` : ''}>${escape(data.plan[field])}</textarea>`}</label>`).join('')}</div>`;
    }
    function weekForm(data) {
      const options = (values, chosen) => values.map(value => `<option value="${value}"${chosen === value ? ' selected' : ''}>${escape(text(value))}</option>`).join('');
      return `<p class="wb-help">${escape(text('weekHelp'))}</p><div class="wb-week">${data.week.map((row, index) => `<fieldset class="wb-task"><legend>${escape(text('task'))} ${index + 1}</legend><label class="wb-field wb-wide" for="wb-task-${index}"><span>${escape(text('task'))}</span><input id="wb-task-${index}" maxlength="300" data-wb-row="${index}" data-wb-column="task" value="${escape(row.task)}" placeholder="${escape(text('taskPlaceholder'))}"></label><label class="wb-field" for="wb-priority-${index}"><span>${escape(text('priority'))}</span><select id="wb-priority-${index}" data-wb-row="${index}" data-wb-column="priority">${options(priorities, row.priority)}</select></label><label class="wb-field" for="wb-due-${index}"><span>${escape(text('due'))}</span><input id="wb-due-${index}" type="date" data-wb-row="${index}" data-wb-column="due" value="${escape(row.due)}"></label><label class="wb-field" for="wb-status-${index}"><span>${escape(text('status'))}</span><select id="wb-status-${index}" data-wb-row="${index}" data-wb-column="status">${options(statuses, row.status)}</select></label></fieldset>`).join('')}</div>`;
    }
    function preparationForm(data) {
      const group = role === 'staff' ? 'staff' : role === 'ta' ? 'ta' : 'faculty';
      return `<p class="wb-help">${escape(text('prepareHelp'))}</p><h3>${escape(text(group + 'Title'))}</h3><p class="wb-progress" data-wb-progress>${escape(text('progress'))}: ${data.prepare.filter(Boolean).length} ${escape(text('of'))} 6</p><div class="wb-checks">${text(group + 'Checks').map((label, index) => `<label class="wb-check" for="wb-check-${index}"><input id="wb-check-${index}" type="checkbox" data-wb-check="${index}"${data.prepare[index] ? ' checked' : ''}><span>${escape(label)}</span></label>`).join('')}</div><p class="wb-help">${escape(text('checklistNote'))}</p>`;
    }
    function render() {
      if (!host) return;
      const data = load(role), current = selected[role] || 'plan';
      host.classList.add('wb-section');
      host.lang = lang; host.dir = lang === 'ar' ? 'rtl' : 'ltr';
      host.setAttribute('aria-labelledby', 'wb-heading');
      host.innerHTML = `<div class="wb-heading"><span class="wb-icon" aria-hidden="true">✓</span><div><h2 id="wb-heading">${escape(text('heading'))}</h2><p>${escape(text('intro'))}</p></div></div><p class="wb-privacy">${escape(text('privacy'))}</p>${!available ? `<p class="wb-alert">${escape(text('noStorage'))}</p>` : ''}<div class="wb-tabs" role="group" aria-label="${escape(text('heading'))}">${tools.map(tool => `<button type="button" data-wb-tab="${tool}" aria-pressed="${current === tool}" ${metrics(tool, 'open', 'activity_start')}>${escape(text(tool))}</button>`).join('')}</div><div class="wb-panel" data-wb-panel="${current}">${current === 'week' ? weekForm(data) : current === 'prepare' ? preparationForm(data) : planForm(data)}<div class="wb-actions"><button type="button" class="wb-primary" data-wb-action="save">${escape(text('save'))}</button><button type="button" data-wb-action="export" ${metrics(current, 'export')}>${escape(text('export'))}</button><button type="button" class="wb-clear" data-wb-action="clear">${escape(text('clear'))}</button></div><p class="wb-status" role="status" aria-live="polite" data-wb-status>${messageKey ? escape(text(messageKey)) : ''}</p></div>`;
    }
    function persist() {
      try { window.localStorage.setItem(storagePrefix + role, JSON.stringify(normalise(drafts[role]))); available = true; return true; }
      catch (_) { available = false; return false; }
    }
    function exportCurrent() {
      const tool = selected[role] || 'plan';
      const data = { schema: 1, kind: 'personal-development-workbench', role, tool, exportedAt: new Date().toISOString(), data: normalise(drafts[role])[tool] };
      const url = window.URL.createObjectURL(new window.Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' }));
      const link = document.createElement('a'); link.href = url; link.download = 'tobruk-my-' + role + '-' + tool + '.json'; link.hidden = true; host.append(link); link.click(); link.remove(); window.setTimeout(() => window.URL.revokeObjectURL(url), 1500); report('exportReady');
    }
    function context(event) {
      capture();
      role = pickRole(event?.detail?.role || new window.URL(window.location.href).searchParams.get('role'));
      lang = pickLang(event?.detail?.lang || document.documentElement.lang);
      messageKey = ''; render();
    }
    function init() {
      host = document.getElementById('workbench');
      if (!host || host.dataset.workbenchReady) return;
      host.dataset.workbenchReady = '1';
      context();
      host.addEventListener('input', () => { capture(); report('draft'); });
      host.addEventListener('change', () => {
        capture(); report('draft');
        const progress = host.querySelector('[data-wb-progress]');
        if (progress) progress.textContent = text('progress') + ': ' + drafts[role].prepare.filter(Boolean).length + ' ' + text('of') + ' 6';
      });
      host.addEventListener('click', event => {
        const tab = event.target.closest?.('[data-wb-tab]');
        if (tab && host.contains(tab)) { capture(); selected[role] = tools.includes(tab.dataset.wbTab) ? tab.dataset.wbTab : 'plan'; messageKey = ''; render(); return; }
        const action = event.target.closest?.('[data-wb-action]');
        if (!action || !host.contains(action)) return;
        capture();
        if (action.dataset.wbAction === 'save') report(persist() ? 'saved' : 'storageError');
        if (action.dataset.wbAction === 'export') exportCurrent();
        if (action.dataset.wbAction === 'clear' && window.confirm(text('confirmClear'))) {
          const tool = selected[role] || 'plan'; drafts[role][tool] = normalise()[tool];
          messageKey = persist() ? 'cleared' : 'storageError'; render();
        }
      });
      document.addEventListener('development:context', context);
      window.addEventListener('popstate', () => context());
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
  }
  return Object.freeze({ normalise, start });
});
