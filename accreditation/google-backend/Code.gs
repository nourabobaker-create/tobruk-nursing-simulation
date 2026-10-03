/** بوابة الفريق الخاصة. يُنشر هذا المشروع وحده داخل نطاق الجامعة، ولا يُنشر للعامة. */
const APP_ = Object.freeze({
  owner: String(PropertiesService.getScriptProperties().getProperty('OWNER_EMAIL') || '').trim().toLowerCase(), domain: 'tu.edu.ly', maxBytes: 10 * 1024 * 1024,
  roles: { admin: 'مدير النظام', reviewer: 'مراجع', member: 'عضو فريق' },
  taskStates: ['بانتظار مراجعة الحالة', 'لم يبدأ', 'قيد التنفيذ', 'بانتظار الدليل', 'مقدمة للمراجعة', 'إعداد منجز بانتظار المراجعة', 'معلقة'],
  indicatorStates: { unassessed: 'لم يُقيَّم', in_progress: 'قيد التقييم', submitted: 'مقدمة للمراجعة', returned: 'يحتاج استكمال', accepted: 'مقبول', na: 'غير منطبق معتمد' }
});
// أسماء الأعمدة مطابقة لمخطط السجل الأصلي 1.1 المرفق. لا تعتمد أي دالة على ترتيب الأعمدة.
const TABLES_ = {
  team: { sheet: 'الفريق', fields: { email:'البريد الإلكتروني', name:'الاسم', role:'الدور', active:'الحالة', addedBy:'أضيف بواسطة', addedAt:'تاريخ الإضافة', revision:'الإصدار' } },
  tasks: { sheet: 'المهام', fields: { id:'معرف المهمة', title:'عنوان المهمة', owner:'بريد المسؤول', codes:'معرفات المؤشرات المعتمدة', proposedCodes:'معرفات المؤشرات المقترحة', status:'حالة المهمة', evidenceState:'حالة مراجعة الدليل', note:'ملاحظات المتابعة', due:'الموعد المحدد', unit:'الدور المسؤول المقترح', requiredEvidence:'الشواهد المطلوبة', period:'الفترة من المصدر', assignmentState:'حالة الإسناد', linkState:'حالة الربط', submittedBy:'آخر مقدم', submittedAt:'آخر تقديم', reviewedBy:'المراجع', reviewedAt:'تاريخ المراجعة', reviewNote:'ملاحظة المراجعة', updatedAt:'آخر تحديث', revision:'الإصدار' } },
  indicators: { sheet:'المؤشرات', fields: { id:'معرف المؤشر', criterion:'رقم المعيار', text:'نص المؤشر', status:'حالة التقييم', applicability:'الانطباق', evidenceState:'حالة الشواهد', exceptionReason:'مبرر الاستثناء', exceptionReference:'مرجع اعتماد الاستثناء', submittedBy:'آخر مقدم', submittedAt:'آخر تقديم', reviewedBy:'المراجع', reviewedAt:'تاريخ المراجعة', reviewNote:'ملاحظة المراجعة', updatedAt:'آخر تحديث', revision:'الإصدار' } },
  evidence: { sheet:'الشواهد', fields: { id:'معرف الشاهد', indicator:'معرف المؤشر', task:'معرف المهمة', title:'عنوان الشاهد', fileId:'معرف ملف درايف', url:'رابط خاص', name:'اسم الملف', mime:'نوع الملف', size:'حجم الملف', actor:'مقدم الشاهد', createdAt:'وقت التقديم', note:'وصف الشاهد', status:'حالة المراجعة', publication:'حالة النشر', publicUrl:'رابط عام', version:'رقم النسخة', copyType:'نوع النسخة', revision:'الإصدار' }, optionalFields:{sourceType:'نوع المصدر',sourceRef:'مرجع المصدر',sourceState:'حالة المصدر',mappingScope:'نطاق الربط'} },
  audit: { sheet:'سجل العمليات', fields: { id:'معرف العملية', at:'الوقت', actor:'المنفذ', role:'دور المنفذ', action:'العملية', entity:'نوع السجل', entityId:'معرف السجل', before:'قبل التغيير', after:'بعد التغيير', reason:'السبب' } }
};

function doGet() {
  // No private values are embedded into the page. Every RPC authenticates again.
  try { context_(); }
  catch (e) { return HtmlService.createHtmlOutput('<html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font:18px Arial;padding:3rem;line-height:2"><h1>بوابة فريق الاعتماد</h1><p>تعذر التحقق من صلاحية الدخول. افتح الرابط بحساب الجامعة المسجل لدى المدير. إذا استمر المنع، يجب على المدير التحقق من إعداد النشر وهوية Google.</p></body></html>').setTitle('الدخول إلى بوابة الفريق'); }
  return HtmlService.createHtmlOutputFromFile('Index').setTitle('بوابة فريق الاعتماد').addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
function doPost() { return ContentService.createTextOutput('الكتابة متاحة من واجهة الفريق الموثقة فقط.'); }

function getWorkspace() {
  const c = context_();
  const privileged = c.user.role !== APP_.roles.member;
  const tasks = c.tasks.rows.filter(t => privileged || normEmail_(t.owner) === c.user.email);
  const codes = new Set(tasks.flatMap(t => codes_(t.codes)));
  const indicators = c.indicators.rows.filter(i => privileged || codes.has(i.id));
  const allowed = new Set(indicators.map(i => i.id));
  return {
    user: c.user, serverTime: new Date().toISOString(),
    tasks: tasks.map(t => pick_(t, ['id','title','owner','codes','proposedCodes','status','note','due','unit','requiredEvidence','period','updatedAt','revision','submittedBy','reviewNote'])),
    indicators: indicators.map(i => pick_(i, ['id','criterion','text','status','applicability','evidenceState','submittedBy','submittedAt','reviewedBy','reviewedAt','reviewNote','updatedAt','revision'])),
    evidence: c.evidence.rows.filter(e => allowed.has(e.indicator)).map(e => Object.assign(pick_(e, ['id','indicator','task','name','size','actor','createdAt','note','status','publication','publicUrl','sourceState','mappingScope']),{downloadAvailable:hasDriveFile_(e)})),
    team: c.user.role === APP_.roles.admin ? c.team.rows.map(t => pick_(t, ['email','name','role','active','revision'])) : [],
    taskStates: APP_.taskStates, indicatorStates: APP_.indicatorStates, roles: APP_.roles
  };
}

function saveTask(input) {
  return locked_(function() {
    const c = context_(), q = object_(input), t = find_(c.tasks, q.id);
    authorizeTask_(c, t); request_(q.requestId);
    if (replay_(c, q.requestId, 'تحديث مهمة', t.id)) return {ok:true, replayed:true};
    revision_(t, q.revision);
    const status = text_(q.status, 70, true);
    if (!APP_.taskStates.includes(status)) fail_('حالة المهمة غير صالحة.');
    const change = {status:status, note:text_(q.note, 2000), updatedAt:iso_(), revision:next_(t)};
    if (status === 'مقدمة للمراجعة') {
      if (!c.evidence.rows.some(e => e.task === t.id && hasDriveFile_(e))) fail_('ارفع شاهدًا مرتبطًا بالمهمة قبل تقديمها للمراجعة.');
      change.submittedBy = c.user.email; change.submittedAt = iso_(); change.evidenceState = 'قيد المراجعة';
    }
    commit_(c, [patch_(c.tasks, t, change)], q, 'تحديث مهمة', 'مهمة', t.id, pick_(t,['status','note']), change);
    return {ok:true};
  });
}

function assignTask(input) {
  return locked_(function() {
    const c = context_(), q = object_(input); role_(c, [APP_.roles.admin]);
    const t = find_(c.tasks, q.id); request_(q.requestId);
    if (replay_(c, q.requestId, 'إسناد مهمة', t.id)) return {ok:true, replayed:true};
    revision_(t, q.revision);
    const email = normEmail_(q.owner);
    if (email && !c.team.rows.some(u => normEmail_(u.email) === email && u.active === 'نشط')) fail_('المكلف غير موجود ضمن الفريق النشط.');
    const codes = codes_(text_(q.codes, 1200));
    if (!codes.length && email) fail_('اربط المهمة بمؤشر مؤكد واحد على الأقل قبل إسنادها.');
    codes.forEach(code => find_(c.indicators, code));
    const due = text_(q.due, 10);
    if (due && (!/^\d{4}-\d{2}-\d{2}$/.test(due) || isNaN(Date.parse(due)) || new Date(due+'T00:00:00Z').toISOString().slice(0,10) !== due)) fail_('الموعد النهائي غير صالح.');
    const change = {owner:email, codes:codes.join(', '), due:due, assignmentState:email ? 'مسندة' : 'غير مسندة', linkState:codes.length ? 'ربط داخلي معتمد' : 'ربط مقترح يحتاج مراجعة', updatedAt:iso_(), revision:next_(t)};
    commit_(c,[patch_(c.tasks,t,change)],q,'إسناد مهمة','مهمة',t.id,pick_(t,['owner','codes','due']),change);
    return {ok:true};
  });
}

function saveMember(input) {
  return locked_(function() {
    const c = context_(), q = object_(input); role_(c,[APP_.roles.admin]);
    const email = email_(q.email); request_(q.requestId);
    if (email === APP_.owner) fail_('حساب المالكة محمي؛ لا يمكن تغييره من هذه الواجهة.');
    if (replay_(c,q.requestId,'تعديل عضو',email)) return {ok:true,replayed:true};
    const role = text_(q.role,40,true), active = text_(q.active,20,true);
    if (!Object.values(APP_.roles).includes(role) || !['نشط','موقوف'].includes(active)) fail_('الدور أو حالة العضو غير صالحة.');
    const record = {email:email,name:text_(q.name,150,true),role:role,active:active};
    const old = c.team.rows.find(t => normEmail_(t.email) === email);
    if (old) revision_(old,q.revision);
    record.revision = old ? next_(old) : 1;
    if (!old) { record.addedBy = c.user.email; record.addedAt = iso_(); }
    commit_(c,[old ? patch_(c.team,old,record) : append_(c.team,record)],q,'تعديل عضو','عضو',email,old ? pick_(old,['email','name','role','active']) : {},record);
    return {ok:true};
  });
}

/** form is the sole RPC argument: google.script.run converts a file input to a Blob. */
function submitEvidence(form) {
  return locked_(function() {
    const c = context_(), q = object_(form), t = find_(c.tasks,q.taskId), i = find_(c.indicators,q.indicatorId);
    authorizeTask_(c,t); request_(q.requestId);
    if (!codes_(t.codes).includes(i.id)) fail_('المؤشر غير مرتبط بهذه المهمة.');
    if (replay_(c,q.requestId,'تقديم دليل',i.id)) return {ok:true,replayed:true};
    revision_(i,q.revision);
    if (i.status === 'مقبول' || i.applicability === 'غير منطبق معتمد') fail_('يجب على المراجع إعادة فتح المؤشر قبل تقديم دليل جديد.');
    if (q.confirmPublication !== 'on' && q.confirmPublication !== 'true') fail_('أكد أن الملف صالح للنشر العام وخالٍ من البيانات التي لا يحق نشرها.');
    const note = text_(q.note,2000,true), blob = q.evidenceFile;
    if (!blob || typeof blob.getBytes !== 'function') fail_('اختر ملف الدليل.');
    const bytes = blob.getBytes();
    if (!bytes.length || bytes.length > APP_.maxBytes) fail_('الحد الأقصى للملف 10 ميغابايت؛ لا يقبل ملف فارغ.');
    const originalName = fileName_(blob.getName());
    if (!/\.(pdf|png|jpe?g|docx|xlsx|pptx|txt|csv)$/i.test(originalName)) fail_('الصيغ المتاحة: PDF أو صور PNG/JPG أو DOCX/XLSX/PPTX أو TXT/CSV.');
    const root = evidenceRoot_(c);
    const evidenceId = 'EV-' + Utilities.getUuid();
    blob.setName(evidenceId + '-' + originalName);
    let file = null, committed = false, commitAttempted = false;
    try {
      file = root.createFile(blob);
      if (file.getSharingAccess() !== DriveApp.Access.PRIVATE) fail_('مجلد الرفع غير مقيد؛ اتصل بالمدير.');
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      if (file.getSharingAccess() !== DriveApp.Access.ANYONE_WITH_LINK || file.getSharingPermission() !== DriveApp.Permission.VIEW) fail_('تعذر إتاحة الشاهد للعرض العام. قد تمنع سياسة الجامعة ذلك.');
      const now = iso_();
      const record = {id:evidenceId, indicator:i.id, task:t.id, fileId:file.getId(), url:file.getUrl(), title:originalName, name:originalName, publication:'منشور', publicUrl:publicFileUrl_(file), version:1, copyType:'نسخة مضبوطة', revision:1,
        mime:String(blob.getContentType() || 'application/octet-stream'), size:bytes.length, actor:c.user.email, createdAt:now, note:note, status:'مقدم للمراجعة'};
      const change = {status:'قيد التقييم', evidenceState:'مقدمة للمراجعة', applicability:'منطبق', submittedBy:c.user.email, submittedAt:now,
        reviewedBy:'',reviewedAt:'',reviewNote:'',updatedAt:now,revision:next_(i)};
      commitAttempted = true;
      commit_(c,[append_(c.evidence,record),patch_(c.indicators,i,change)],q,'تقديم دليل','مؤشر',i.id,
        pick_(i,['status','revision']),{status:change.status,evidenceId:evidenceId,revision:change.revision});
      committed = true;
      return {ok:true,evidenceId:evidenceId};
    } catch(e) {
      // A timeout can mean the atomic Sheets commit succeeded. Re-read before rolling back a Drive file.
      if (file && !committed) {
        let confirmed = false;
        try { confirmed = readTable_(c.book,'evidence').rows.some(r => r.id === evidenceId); } catch(checkError) { throw new Error('تعذر تأكيد الحفظ. حدّث الصفحة قبل إعادة المحاولة؛ احتُفظ بالملف لحمايته.'); }
        if (confirmed) return {ok:true,evidenceId:evidenceId};
        if (commitAttempted) throw new Error('لم تُحسم نتيجة الحفظ. حدّث الصفحة قبل إعادة المحاولة؛ احتُفظ بالملف حتى يتحقق المدير من السجل.');
        try { file.setSharing(DriveApp.Access.PRIVATE,DriveApp.Permission.NONE); file.setTrashed(true); } catch(cleanupError) { /* Owner may remove an uncommitted orphan after checking the registry. */ }
      }
      throw e;
    }
  });
}

function reviewIndicator(input) {
  return locked_(function() {
    const c = context_(), q = object_(input); role_(c,[APP_.roles.admin,APP_.roles.reviewer]);
    const i = find_(c.indicators,q.id); request_(q.requestId);
    if (replay_(c,q.requestId,'مراجعة مؤشر',i.id)) return {ok:true,replayed:true};
    revision_(i,q.revision);
    const action = text_(q.decision,30,true), note = text_(q.note,3000,true);
    if (!['accepted','returned','na','reopen'].includes(action)) fail_('قرار المراجعة غير صالح.');
    if (normEmail_(i.submittedBy) === c.user.email) fail_('لا يجوز مراجعة الدليل الذي قدمته بنفسك؛ يلزم مراجع مستقل.');
    const evidence = c.evidence.rows.filter(e => e.indicator === i.id);
    // Any contributor to this indicator's evidence is excluded from its acceptance/return decision.
    if (evidence.some(e => normEmail_(e.actor) === c.user.email)) fail_('ساهمت في أدلة هذا المؤشر؛ يجب أن يراجعه شخص مستقل.');
    if (['accepted','returned'].includes(action) && !['مقدمة للمراجعة','مصادر متاحة بانتظار المراجعة'].includes(i.evidenceState)) fail_('يمكن قبول أو إعادة مؤشر مقدم للمراجعة فقط.');
    if (action === 'accepted') {
      if (!evidence.some(hasDriveFile_) || q.confirmRead !== true) fail_('يجب الاطلاع على الدليل وتأكيد مراجعته قبل القبول.');
      evidence.filter(hasDriveFile_).forEach(e => verifyEvidenceFile_(c,e));
    }
    if (action === 'reopen' && i.status !== 'مقبول' && i.applicability !== 'غير منطبق معتمد') fail_('إعادة الفتح مخصصة للمؤشر المقبول أو غير المنطبق.');
    const nextStatus = action === 'na' ? 'لم يُقيَّم' : action === 'reopen' ? 'يحتاج استكمال' : APP_.indicatorStates[action];
    if (action === 'na' && !text_(q.exceptionReference,500,true)) fail_('أدخل مرجع اعتماد الاستثناء.');
    const now = iso_(), change = {status:nextStatus,applicability:action === 'na' ? 'غير منطبق معتمد' : 'منطبق',
      evidenceState:action === 'accepted' ? 'مقبولة' : action === 'na' ? 'لم تُقدَّم' : 'تحتاج استكمال',
      exceptionReason:action === 'na' ? note : '',exceptionReference:action === 'na' ? text_(q.exceptionReference,500,true) : '',
      reviewedBy:c.user.email,reviewedAt:now,reviewNote:note,updatedAt:now,revision:next_(i)};
    commit_(c,[patch_(c.indicators,i,change)],q,'مراجعة مؤشر','مؤشر',i.id,pick_(i,['status','applicability','revision']),change);
    return {ok:true};
  });
}

function reviewTask(input) {
  return locked_(function() {
    const c = context_(), q = object_(input); role_(c,[APP_.roles.admin,APP_.roles.reviewer]);
    const t = find_(c.tasks,q.id); request_(q.requestId);
    if (replay_(c,q.requestId,'مراجعة مهمة',t.id)) return {ok:true,replayed:true};
    revision_(t,q.revision);
    if (t.status !== 'مقدمة للمراجعة') fail_('المهمة غير مقدمة للمراجعة.');
    const evidence = c.evidence.rows.filter(e => e.task === t.id);
    if (normEmail_(t.owner) === c.user.email || normEmail_(t.submittedBy) === c.user.email || evidence.some(e => normEmail_(e.actor) === c.user.email)) fail_('يلزم مراجع مستقل عن المكلف ومقدمي شواهد المهمة.');
    if (!['accepted','returned'].includes(q.decision)) fail_('قرار المهمة غير صالح.');
    const note = text_(q.note,3000,true);
    if (q.decision === 'accepted') {
      if (!evidence.some(hasDriveFile_) || q.confirmRead !== true) fail_('يجب مراجعة شواهد المهمة قبل القبول.');
      evidence.filter(hasDriveFile_).forEach(e => verifyEvidenceFile_(c,e));
    }
    const now = iso_(), change = {status:q.decision === 'accepted' ? 'مكتملة ومعتمدة داخليًا' : 'بانتظار الدليل',
      evidenceState:q.decision === 'accepted' ? 'مقبول' : 'يحتاج استكمال',reviewedBy:c.user.email,reviewedAt:now,reviewNote:note,updatedAt:now,revision:next_(t)};
    commit_(c,[patch_(c.tasks,t,change)],q,'مراجعة مهمة','مهمة',t.id,pick_(t,['status','evidenceState','revision']),change);
    return {ok:true};
  });
}

function downloadEvidence(id) {
  const c = context_(), e = find_(c.evidence,id), i = find_(c.indicators,e.indicator);
  if (!hasDriveFile_(e)) fail_('هذا مرجع مفهرس فقط؛ لم تُنقل نسخة قابلة للتنزيل إلى Google Drive بعد.');
  if (c.user.role === APP_.roles.member && !c.tasks.rows.some(t => normEmail_(t.owner) === c.user.email && codes_(t.codes).includes(i.id))) fail_('لا تملك صلاحية الاطلاع على هذا الدليل.');
  const file = verifyEvidenceFile_(c,e);
  if (file.getSize() > APP_.maxBytes) fail_('الملف يتجاوز حد التنزيل من البوابة.');
  const data = file.getBlob().getBytes();
  if (data.length > APP_.maxBytes) fail_('الملف يتجاوز الحد المسموح.');
  return {name:fileName_(e.name),mime:'application/octet-stream',base64:Utilities.base64Encode(data)};
}

/** Owner runs this once in the editor, then tests the real deployment with a second university account. */
function verifyOwnerSetup() {
  const c = context_();
  if (c.user.email !== APP_.owner) fail_('الفحص مخصص لحساب المالكة.');
  evidenceRoot_(c);
  if (c.indicators.rows.length !== 184 || c.tasks.rows.length !== 35) fail_('أعداد السجل لا تطابق 184 مؤشرًا و35 مهمة.');
  return {ok:true,activeEmail:c.user.email,effectiveEmail:normEmail_(Session.getEffectiveUser().getEmail()),indicators:c.indicators.rows.length,tasks:c.tasks.rows.length,
    warning:'هذا فحص حساب المالكة فقط. يجب اختبار حساب جامعي ثانٍ قبل تشغيل الفريق. لا يختبر هذا الفحص إعداد جمهور النشر.'};
}

function context_() {
  const active = normEmail_(Session.getActiveUser().getEmail());
  if (!active || !active.endsWith('@' + APP_.domain)) fail_('تعذر التحقق من هوية حساب الجامعة. لا يُقبل البريد المدخل يدويًا بدل هوية Google.');
  if (normEmail_(Session.getEffectiveUser().getEmail()) !== APP_.owner) fail_('إعداد تنفيذ التطبيق غير صحيح؛ يجب التنفيذ بحساب المالكة.');
  const id = PropertiesService.getScriptProperties().getProperty('REGISTRY_SPREADSHEET_ID');
  if (!id || !/^[A-Za-z0-9_-]{20,}$/.test(id)) fail_('لم يكتمل إعداد السجل.');
  const book = SpreadsheetApp.openById(id), team = readTable_(book,'team');
  const matches = team.rows.filter(u => normEmail_(u.email) === active);
  if (matches.length !== 1 || matches[0].active !== 'نشط' || !Object.values(APP_.roles).includes(matches[0].role)) fail_('الحساب غير مصرح له بالدخول.');
  const u = matches[0];
  const c = {book:book, id:id, team:team, user:{email:active,name:u.name,role:u.role}};
  ['tasks','indicators','evidence','audit'].forEach(k => c[k] = readTable_(book,k));
  return c;
}
function readTable_(book,key) {
  const spec = TABLES_[key], sheet = book.getSheetByName(spec.sheet);
  if (!sheet) fail_('أحد تبويبات السجل المطلوبة غير موجود.');
  const values = sheet.getDataRange().getValues(), headers = values[0].map(String), columns = {};
  Object.keys(spec.fields).forEach(k => {
    const n = headers.indexOf(spec.fields[k]);
    if (n < 0 || headers.lastIndexOf(spec.fields[k]) !== n) fail_('مخطط السجل غير مكتمل أو يحتوي عناوين مكررة.');
    columns[k] = n;
  });
  Object.keys(spec.optionalFields || {}).forEach(k => { const n=headers.indexOf(spec.optionalFields[k]); if(n>=0) columns[k]=n; });
  const rows = values.slice(1).map((v,n) => {
    const out = {_row:n+2}; Object.keys(columns).forEach(k => out[k] = v[columns[k]] instanceof Date ? v[columns[k]].toISOString() : String(v[columns[k]] == null ? '' : v[columns[k]])); return out;
  }).filter(r => Object.keys(columns).some(k => r[k] !== ''));
  const identity = key === 'team' ? 'email' : 'id';
  const ids = rows.map(r => key === 'team' ? normEmail_(r[identity]) : r[identity]);
  if (ids.some(id => !id) || new Set(ids).size !== ids.length) fail_('معرّف مفقود أو مكرر في السجل.');
  return {sheet:sheet,columns:columns,headers:headers,rows:rows};
}
function patch_(table,row,changes) {
  return Object.keys(changes).map(k => {
    if (!(k in table.columns)) fail_('حقل غير معروف.');
    return {updateCells:{range:{sheetId:table.sheet.getSheetId(),startRowIndex:row._row-1,endRowIndex:row._row,startColumnIndex:table.columns[k],endColumnIndex:table.columns[k]+1},rows:[{values:[cell_(changes[k])]}],fields:'userEnteredValue'}};
  });
}
function append_(table,record) {
  const cells = table.headers.map(() => cell_(''));
  Object.keys(record).forEach(k => { if (!(k in table.columns)) fail_('حقل غير معروف.'); cells[table.columns[k]] = cell_(record[k]); });
  return [{appendCells:{sheetId:table.sheet.getSheetId(),rows:[{values:cells}],fields:'userEnteredValue'}}];
}
function cell_(value) {
  // Explicit stringValue is never parsed as a formula, including =, +, -, @ and leading whitespace.
  return {userEnteredValue:typeof value === 'number' ? {numberValue:value} : {stringValue:String(value == null ? '' : value)}};
}
function commit_(c,requests,q,action,entity,entityId,before,after) {
  const audit = {id:q.requestId,at:iso_(),actor:c.user.email,role:c.user.role,action:action,entity:entity,entityId:entityId,before:JSON.stringify(before),after:JSON.stringify(after),reason:String(q.note || '').slice(0,3000)};
  const batch = requests.flat().concat(append_(c.audit,audit));
  // Record update and audit append are one atomic Sheets batch. Lock guards app writers.
  Sheets.Spreadsheets.batchUpdate({requests:batch},c.id);
}
function replay_(c,id,action,entityId) {
  const e = c.audit.rows.find(r => r.id === id);
  if (!e) return false;
  if (normEmail_(e.actor) !== c.user.email || e.action !== action || e.entityId !== entityId) fail_('معرف العملية مستخدم؛ حدّث الصفحة.');
  return true;
}
function locked_(fn) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) fail_('يوجد حفظ جارٍ؛ حاول مرة أخرى بعد قليل.');
  try { return fn(); } finally { lock.releaseLock(); }
}
function evidenceRoot_(c) {
  const id = PropertiesService.getScriptProperties().getProperty('EVIDENCE_FOLDER_ID');
  if (!id || !/^[A-Za-z0-9_-]{10,}$/.test(id)) fail_('مجلد الأدلة لم يُضبط بعد.');
  const root = DriveApp.getFolderById(id);
  privateItem_(c,root);
  return root;
}
function publicFileUrl_(file) {
  const key = typeof file.getResourceKey === 'function' ? String(file.getResourceKey() || '') : '';
  return 'https://drive.google.com/file/d/' + file.getId() + '/view' + (key ? '?resourcekey=' + encodeURIComponent(key) : '');
}

function privateItem_(c,item) {
  if (item.isTrashed() || item.getSharingAccess() !== DriveApp.Access.PRIVATE) fail_('الأدلة يجب أن تبقى مقيدة؛ المشاركة العامة أو على النطاق غير مسموحة.');
  const owner = item.getOwner();
  if (!owner || normEmail_(owner.getEmail()) !== APP_.owner) fail_('يجب أن يملك حساب المالكة مجلد الأدلة وملفاته.');
  const allowed = new Set(c.team.rows.filter(u => u.active === 'نشط').map(u => normEmail_(u.email)));
  item.getEditors().concat(item.getViewers()).forEach(u => { if (!allowed.has(normEmail_(u.getEmail()))) fail_('الدليل مشترك مع حساب خارج الفريق النشط؛ راجع الصلاحيات.'); });
}
function hasDriveFile_(e) { return /^[A-Za-z0-9_-]{10,}$/.test(String(e.fileId || '')) && !/^(?:libfile_|file_000000)/.test(String(e.fileId)); }
function verifyEvidenceFile_(c,e) {
  if (!hasDriveFile_(e)) fail_('مرجع مفهرس لا يكفي للقبول؛ ارفع نسخة الدليل أو اربط ملف Drive يمكن مراجعته.');
  const file = DriveApp.getFileById(e.fileId);
  if (file.isTrashed()) fail_('ملف الشاهد غير متاح.');
  // A reference is entered by the trusted owner/import process, never accepted as a client-supplied file ID.
  // Existing references retain their original location and sharing; reviewing does not publish them.
  if (e.copyType === 'مرجع' || (e.sourceRef && e.sourceState === 'متحقق من المحتوى' && ['library','drive'].includes(String(e.sourceType).toLowerCase()))) return file;
  const root = evidenceRoot_(c);
  if (e.publication !== 'منشور' || file.isTrashed() || file.getSharingAccess() !== DriveApp.Access.ANYONE_WITH_LINK || file.getSharingPermission() !== DriveApp.Permission.VIEW) fail_('صلاحية نشر الشاهد لم تعد مطابقة للسجل؛ اتصل بالمدير.');
  const owner = file.getOwner();
  if (!owner || normEmail_(owner.getEmail()) !== APP_.owner) fail_('مالك ملف الشاهد غير صحيح.');
  const parents = file.getParents(); let inside = false;
  while (parents.hasNext()) { if (parents.next().getId() === root.getId()) inside = true; }
  if (!inside) fail_('الدليل خارج مجلد الأدلة المعتمد.');
  return file;
}
function role_(c,roles) { if (!roles.includes(c.user.role)) fail_('لا تملك صلاحية تنفيذ هذا الإجراء.'); }
function authorizeTask_(c,t) { if (c.user.role !== APP_.roles.admin && normEmail_(t.owner) !== c.user.email) fail_('يمكنك تعديل المهام المسندة إليك فقط.'); }
function find_(table,id) { const r = table.rows.find(r => r.id === String(id)); if (!r) fail_('السجل المطلوب غير موجود.'); return r; }
function revision_(row,revision) { if (!/^\d+$/.test(String(revision)) || Number(row.revision || 0) !== Number(revision)) fail_('تغير السجل لدى مستخدم آخر. حدّث الصفحة ثم راجع التعديل.'); }
function next_(row) { return Number(row.revision || 0) + 1; }
function request_(id) { if (typeof id !== 'string' || !/^[a-zA-Z0-9_-]{16,100}$/.test(id)) fail_('معرف العملية غير صالح.'); }
function normEmail_(v) { return String(v || '').trim().toLowerCase(); }
function email_(v) { const x = normEmail_(v); if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@tu\.edu\.ly$/.test(x)) fail_('استخدم بريد الجامعة ضمن tu.edu.ly.'); return x; }
function text_(v,max,required) { if (v != null && typeof v !== 'string') fail_('قيمة نصية غير صالحة.'); const s = String(v || '').trim(); if (s.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(s) || (required && !s)) fail_('راجع الحقول المطلوبة وطول النص.'); return s; }
function fileName_(v) { return text_(String(v || 'دليل'),180,true).replace(/[\\/\r\n\u202a-\u202e\u2066-\u2069]/g,'_'); }
function codes_(v) { const parts = String(v || '').split(/[,،;\s]+/).filter(Boolean); if (parts.some(x => !/^\d{1,2}\.\d{1,2}$/.test(x))) fail_('اكتب رموز المؤشرات مثل 1.1، 1.2.'); return Array.from(new Set(parts)); }
function pick_(row,keys) { const r = {}; keys.forEach(k => r[k] = row[k] == null ? '' : row[k]); return r; }
function object_(v) { if (!v || typeof v !== 'object' || Array.isArray(v)) fail_('طلب غير صالح.'); return v; }
function iso_() { return new Date().toISOString(); }
function fail_(message) { throw new Error(message); }
