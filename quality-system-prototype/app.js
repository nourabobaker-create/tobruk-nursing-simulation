(()=>{"use strict";
const D=window.QMS_DEMO_DATA;
const KEY="tobruk-qms-prototype-v01";
const ROLE_KEY="tobruk-qms-prototype-role";
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const clone=o=>JSON.parse(JSON.stringify(o));
const roleBy=id=>D.roles.find(r=>r.id===id);
const labels={
 assigned:"مسندة",in_progress:"قيد التنفيذ",submitted:"بانتظار مراجعة الجودة",returned:"أعيدت للاستكمال",
 accepted:"مقبولة",closed:"مغلقة",open:"مفتوحة",draft:"مسودة",sent:"مرسلة",acknowledged:"تم الاستلام",
 under_review:"قيد المراجعة",operational_draft:"مسودة تشغيلية",approved:"معتمدة",waiting_dean:"بانتظار اعتماد العميد",
 preparing:"قيد التجهيز",ready_review:"جاهز للمراجعة",accepted_successor:"استلمها الخلف",ok:"سليم",
 current:"سارية",superseded:"مستبدلة"
};
let state=loadState();
let currentRole=localStorage.getItem(ROLE_KEY)||"";
let currentView="";
let sidebarOpen=false;

function freshState(){
 return {
  tasks:clone(D.tasks),documents:clone(D.documents),universityRequests:clone(D.universityRequests),
  improvements:clone(D.improvements),inbox:clone(D.inbox),approvals:clone(D.approvals),
  handovers:clone(D.handovers),audit:clone(D.audit),backups:clone(D.backups),
  submissions:[]
 };
}
function loadState(){
 try{
  const s=JSON.parse(localStorage.getItem(KEY)||"null");
  return s&&s.tasks?Object.assign(freshState(),s):freshState();
 }catch{return freshState()}
}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function stamp(){return "الآن"}
function audit(actor,action,target){
 state.audit.unshift({time:stamp(),actor,action,target});
 if(state.audit.length>80)state.audit.length=80;
 save();
}
function status(s){return '<span class="status '+esc(s)+'">'+esc(labels[s]||s)+'</span>'}
function pct(n,d){return d?Math.round(n/d*100):0}
function toast(msg){
 let t=$("#toast");if(!t){t=document.createElement("div");t.id="toast";t.className="toast";document.body.appendChild(t)}
 t.textContent=msg;t.classList.add("show");clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove("show"),2600)
}
function defaultView(role){
 if(!role)return "";
 if(role.kind==="staff")return "staff-home";
 if(role.kind==="support")return "it-dashboard";
 return "dashboard";
}
function selectRole(id){
 const r=roleBy(id);if(!r)return;
 currentRole=id;localStorage.setItem(ROLE_KEY,id);currentView=defaultView(r);renderApp()
}
function resetDemo(){
 if(!confirm("إعادة جميع بيانات النموذج التجريبي إلى حالتها الأصلية؟"))return;
 state=freshState();save();toast("تمت إعادة النموذج التجريبي");renderApp()
}
function logoutDemo(){
 currentRole="";currentView="";localStorage.removeItem(ROLE_KEY);renderApp()
}
function roleName(id){return roleBy(id)?.label||id}
function dueRank(t){return t.priority==="high"?0:t.priority==="medium"?1:2}
function roleTasks(roleId){
 if(roleId==="quality"||roleId==="dean")return state.tasks.slice();
 return state.tasks.filter(t=>t.ownerRole===roleId)
}
function pendingApprovals(){return state.approvals.filter(a=>a.status==="waiting_dean")}
function openHandover(){return state.handovers.filter(h=>h.status!=="closed")}
function evidenceTotals(){
 const total=D.evidenceSummary.reduce((s,x)=>s+x.total,0);
 const linked=D.evidenceSummary.reduce((s,x)=>s+x.linked,0);
 return {total,linked,gap:total-linked};
}
function navFor(role){
 return D.nav[role.kind==="admin"?"admin":role.kind==="support"?"support":"staff"];
}
function pageTitle(view){
 const all=[...D.nav.admin,...D.nav.support,...D.nav.staff];
 return all.find(x=>x[0]===view)?.[1]||"النظام";
}
function shell(role){
 const nav=navFor(role);
 return `<div class="app-shell">
  <aside class="sidebar ${sidebarOpen?"open":""}" id="sidebar">
    <div class="brand"><div class="brandmark">✓</div><div><strong>${esc(D.meta.title)}</strong><small>${esc(D.meta.faculty)} · ${esc(D.meta.university)}</small></div></div>
    <div class="demo-badge">نسخة تجريبية تفاعلية · البيانات محاكاة فقط · لا توجد مصادقة أو قاعدة بيانات إنتاجية</div>
    <nav class="nav">${nav.map(n=>`<button data-nav="${n[0]}" class="${currentView===n[0]?"active":""}"><span class="ico">${n[2]}</span><span>${n[1]}</span></button>`).join("")}</nav>
    <div class="side-footer">
      <div class="role-chip"><b>${esc(role.label)}</b><span>${esc(role.unit||(role.kind==="admin"?"صلاحية إدارية تجريبية":"صلاحية دعم فني"))}</span></div>
      <button data-switch-role>تبديل الدور التجريبي</button>
    </div>
  </aside>
  <main class="main">
    <header class="topbar">
      <div class="top-actions"><button class="icon-btn mobile-top" data-menu>☰</button><div class="title"><h1>${esc(pageTitle(currentView))}</h1><p>${esc(role.label)} · ${esc(D.meta.version)}</p></div></div>
      <div class="top-actions"><a class="icon-btn desktop-only" href="../accreditation/" target="_blank">مساحة الاعتماد ↗</a><button class="icon-btn" data-reset>إعادة النموذج</button></div>
    </header>
    <div class="content"><div class="notice">${esc(D.meta.notice)}</div><div id="view">${renderView(role)}</div></div>
  </main>
 </div>
 <div class="modal-cover" id="modal"><div class="modal"><div class="modal-head"><h2 id="modal-title"></h2><button class="close" data-close>×</button></div><div class="modal-body" id="modal-body"></div></div></div>
 <div class="toast" id="toast"></div>`;
}
function login(){
 const admins=D.roles.filter(r=>r.kind!=="staff");
 const staff=D.roles.filter(r=>r.kind==="staff");
 return `<div class="login-screen"><div class="login-wrap">
   <div class="login-brand"><div class="brandmark">✓</div><h1>منظومة الإدارة المؤسسية والجودة</h1><p>نموذج تفاعلي يوضح كيف تعمل المساحة الإدارية للعميد والجودة وIT، وكيف يستخدم باقي الموظفين تطبيقًا مبسطًا حسب صلاحياتهم.</p></div>
   <div class="login-note">هذه شاشة اختيار أدوار تجريبية فقط. النسخة الإنتاجية ستستخدم حسابات فردية ومصادقة حقيقية وصلاحيات على خادم الجامعة.</div>
   <div class="section-head"><div><h2>المساحة الإدارية والدعم</h2><p>الدخول المباشر للعميد وقسم الجودة، وIT للدعم عند الحاجة.</p></div></div>
   <div class="grid role-grid">${admins.map(roleCard).join("")}</div>
   <div class="section-head" style="margin-top:28px"><div><h2>تطبيق الموظفين</h2><p>كل موظف يرى مهامه ومرفقاته وحالة عمله فقط.</p></div></div>
   <div class="grid role-grid">${staff.map(roleCard).join("")}</div>
  </div></div>`;
}
function roleCard(r){
 return `<button class="role-card" data-role="${r.id}"><span class="role-icon">${r.icon}</span><h3>${esc(r.label)}</h3><p>${esc(r.description||r.unit||"تطبيق موظف حسب الصلاحية")}</p></button>`
}
function renderApp(){
 const root=$("#app");const role=roleBy(currentRole);
 if(!role){root.innerHTML=login();bindLogin();return}
 if(!currentView)currentView=defaultView(role);
 root.innerHTML=shell(role);bindShell(role)
}
function bindLogin(){
 $$("[data-role]").forEach(b=>b.onclick=()=>selectRole(b.dataset.role));
}
function bindShell(role){
 $$("[data-nav]").forEach(b=>b.onclick=()=>{currentView=b.dataset.nav;sidebarOpen=false;renderApp()});
 $("[data-switch-role]")?.addEventListener("click",logoutDemo);
 $("[data-reset]")?.addEventListener("click",resetDemo);
 $("[data-menu]")?.addEventListener("click",()=>{sidebarOpen=!sidebarOpen;$("#sidebar")?.classList.toggle("open",sidebarOpen)});
 $("#modal")?.addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
 $("[data-close]")?.addEventListener("click",closeModal);
 bindActions(role);
}
function renderView(role){
 if(currentView==="dashboard")return role.id==="dean"?deanDashboard():qualityDashboard();
 if(currentView==="inbox")return inboxView(role);
 if(currentView==="tasks")return tasksView(role);
 if(currentView==="documents")return documentsView(role);
 if(currentView==="accreditation")return accreditationView();
 if(currentView==="improvement")return improvementView();
 if(currentView==="university")return universityView(role);
 if(currentView==="handover")return handoverView(role);
 if(currentView==="audit")return auditView();
 if(currentView==="system")return systemView();
 if(currentView==="it-dashboard")return itDashboard();
 if(currentView==="backups")return backupsView();
 if(currentView==="support-log")return supportLogView();
 if(currentView==="staff-home")return staffHome(role);
 if(currentView==="my-tasks")return myTasksView(role);
 if(currentView==="submit")return submitView(role);
 if(currentView==="my-submissions")return mySubmissionsView(role);
 if(currentView==="my-handover")return myHandoverView(role);
 if(currentView==="help")return helpView();
 return '<div class="empty">هذه الشاشة قيد البناء في النموذج.</div>'
}
function hero(tag,title,text,buttons=""){
 return `<section class="hero"><div><span class="tag">${esc(tag)}</span><h2>${esc(title)}</h2><p>${esc(text)}</p></div><div class="hero-actions">${buttons}</div></section>`
}
function kpi(label,value,small){
 return `<article class="kpi"><span>${esc(label)}</span><b>${esc(value)}</b><small>${esc(small||"")}</small></article>`
}
function qualityDashboard(){
 const submitted=state.tasks.filter(t=>t.status==="submitted").length;
 const open=state.tasks.filter(t=>!["accepted","closed"].includes(t.status)).length;
 const review=state.documents.filter(d=>["draft","under_review","operational_draft"].includes(d.status)).length;
 const ev=evidenceTotals();
 return hero("مركز التحكم","قسم ضمان الجودة","إدارة المهام والوثائق والشواهد والتحسين من مكان واحد، دون الاستحواذ على ملكية الأصول الوظيفية.",
   '<button class="btn gold" data-goto="inbox">فتح صندوق المراجعة</button><button class="btn ghost" data-goto="handover">الاستلام والتسليم</button>')+
 `<div class="grid kpi-grid">${kpi("بانتظار مراجعة الجودة",submitted,"مخرجات أرسلتها الوحدات")}${kpi("مهام مفتوحة",open,"عبر جميع الجهات")}${kpi("وثائق قيد المراجعة",review,"قبل الاعتماد/التثبيت")}${kpi("فجوات مصدر حاليًا",ev.gap,"من 184 مؤشرًا في بيانات النموذج")}</div>
 <section class="section grid two-col"><div class="panel"><div class="section-head"><div><h2>صندوق المراجعة</h2><p>ما وصل من تطبيقات الموظفين.</p></div><button class="btn" data-goto="inbox">عرض الكل</button></div>${inboxList(4,true)}</div>
 <div class="panel"><div class="section-head"><div><h2>الاعتماد</h2><p>تغطية المصادر حسب المعيار.</p></div></div>${criteriaMini()}</div></section>
 <section class="section grid two-col"><div class="panel"><div class="section-head"><div><h2>إجراءات التحسين</h2><p>الأعمال المفتوحة والمتابعة.</p></div></div>${improvementList(4)}</div>
 <div class="panel"><div class="section-head"><div><h2>طلبات الجامعة</h2><p>ما لا تملكه الكلية مباشرة.</p></div></div>${universityList(4)}</div></section>`
}
function deanDashboard(){
 const waiting=pendingApprovals().length;
 const urgent=state.tasks.filter(t=>t.priority==="high"&&!["accepted","closed"].includes(t.status)).length;
 const pendingUni=state.universityRequests.filter(r=>r.status!=="closed").length;
 const ho=openHandover().length;
 return hero("لوحة تنفيذية","لوحة العميد","قرارات واعتمادات ومخاطر ومتابعة مختصرة؛ التفاصيل الفنية لا تظهر إلا عند فتح البند.",
  '<button class="btn gold" data-goto="documents">الوثائق المنتظرة</button><button class="btn ghost" data-goto="handover">خطة التسليم</button>')+
 `<div class="grid kpi-grid">${kpi("ينتظر اعتمادي",waiting,"وثائق/قرارات")}${kpi("أولويات عالية",urgent,"مهام تحتاج انتباه")}${kpi("طلبات معلقة لدى الجامعة",pendingUni,"قيد الإرسال أو المتابعة")}${kpi("جلسات استلام وتسليم",ho,"مفتوحة في النموذج")}</div>
 <section class="section grid two-col"><div class="panel"><div class="section-head"><div><h2>بانتظار قرار العميد</h2><p>الاعتماد لا يتم من قسم الجودة إذا كان يتطلب صلاحية العميد.</p></div></div>${approvalList()}</div>
 <div class="panel"><div class="section-head"><div><h2>التنبيهات التنفيذية</h2><p>ملخص يحتاج متابعة أو قرار.</p></div></div>
  <div class="list">
   <div class="item"><div class="item-main"><h4>طلب سند استخدام المبنى</h4><p>تم استلامه مركزيًا ويحتاج متابعة الرد.</p></div>${status("acknowledged")}</div>
   <div class="item"><div class="item-main"><h4>جرد المرافق</h4><p>أعيد للاستكمال بسبب عدم فصل القاعات عن المعامل.</p></div>${status("returned")}</div>
   <div class="item"><div class="item-main"><h4>تسليم منصب العميد</h4><p>حزمة نموذجية جاهزة للمراجعة ويمكن استخدامها عند الحاجة.</p></div>${status("ready_review")}</div>
  </div></div></section>
 <section class="section panel"><div class="section-head"><div><h2>مؤشرات الاعتماد – قراءة سريعة</h2><p>هذه تغطية مصادر وليست نسبة اعتماد.</p></div><a class="btn" href="../accreditation/" target="_blank">فتح مساحة الاعتماد ↗</a></div>${criteriaGrid()}</section>`
}
function inboxList(limit=99,actions=false){
 const list=state.inbox.slice(0,limit);
 if(!list.length)return '<div class="empty">لا توجد مخرجات بانتظار المراجعة.</div>';
 return '<div class="list">'+list.map(s=>{
  const t=state.tasks.find(x=>x.id===s.taskId);
  return `<div class="item"><div class="item-main"><span class="code">${esc(s.id)}</span><h4>${esc(s.title)}</h4><p>${esc(roleName(s.fromRole))} · ${esc(s.submitted)}</p>${t?.note?'<p>'+esc(t.note)+'</p>':''}</div><div>${status(s.status)}${actions&&s.status==="submitted"?'<div class="actions" style="margin-top:7px"><button class="btn primary" data-accept-task="'+esc(s.taskId)+'">قبول</button><button class="btn" data-return-task="'+esc(s.taskId)+'">استكمال</button></div>':''}</div></div>`
 }).join("")+'</div>'
}
function inboxView(role){
 return `<div class="section-head"><div><h2>صندوق المراجعة</h2><p>المخرجات المقدمة من تطبيقات الموظفين. النسخ السابقة لا تمحى عند الإعادة.</p></div></div>
 <div class="panel">${inboxList(99,role.id==="quality")}</div>`
}
function taskRow(t,role){
 const canStaff=role.kind==="staff"&&t.ownerRole===role.id;
 const canQuality=role.id==="quality";
 let acts="";
 if(canStaff&&t.status==="assigned")acts='<button class="btn primary" data-start-task="'+t.id+'">بدء المهمة</button>';
 if(canStaff&&["in_progress","returned"].includes(t.status))acts='<button class="btn primary" data-open-submit="'+t.id+'">إرسال للجودة</button>';
 if(canQuality&&t.status==="submitted")acts='<button class="btn primary" data-accept-task="'+t.id+'">قبول</button><button class="btn" data-return-task="'+t.id+'">استكمال</button>';
 return `<tr><td><span class="code">${esc(t.id)}</span></td><td><b>${esc(t.title)}</b><br><small>${esc(t.evidence)}</small></td><td>${esc(roleName(t.ownerRole))}</td><td>${status(t.status)}</td><td>${esc(t.due)}</td><td><div class="actions">${acts||'<span class="meta">—</span>'}</div></td></tr>`
}
function tasksView(role){
 const list=role.id==="dean"?state.tasks:role.id==="quality"?state.tasks:roleTasks(role.id);
 return `<div class="section-head"><div><h2>المهام والطلبات</h2><p>المهمة تسند إلى الدور الوظيفي، لا إلى اسم شخص.</p></div><span class="meta">${list.length} مهمة</span></div>
 <div class="table-wrap"><table class="table"><thead><tr><th>الرقم</th><th>المهمة والمخرج</th><th>الدور المسؤول</th><th>الحالة</th><th>الموعد</th><th>الإجراء</th></tr></thead><tbody>${list.slice().sort((a,b)=>dueRank(a)-dueRank(b)).map(t=>taskRow(t,role)).join("")}</tbody></table></div>`
}
function myTasksView(role){return tasksView(role)}
function docRow(d,role){
 const approval=state.approvals.find(a=>a.documentId===d.id&&a.status==="waiting_dean");
 let action="";
 if(role.id==="dean"&&approval)action='<button class="btn primary" data-approve-doc="'+d.id+'">اعتماد تجريبي</button>';
 return `<tr><td><span class="code">${esc(d.code)}</span></td><td><b>${esc(d.title)}</b><br><small>${esc(d.location)}</small></td><td>${esc(d.version)}</td><td>${status(d.status)}</td><td>${esc(d.owner)}</td><td>${action||"—"}</td></tr>`
}
function documentsView(role){
 return `<div class="section-head"><div><h2>الوثائق والإصدارات</h2><p>الرمز ثابت، والنسخة الحالية واضحة، والمستبدلة تحفظ للتتبع ولا تحذف.</p></div><span class="meta">${state.documents.length} وثائق نموذجية</span></div>
 <div class="table-wrap"><table class="table"><thead><tr><th>الرمز</th><th>الوثيقة</th><th>الإصدار</th><th>الحالة</th><th>المالك</th><th>الإجراء</th></tr></thead><tbody>${state.documents.map(d=>docRow(d,role)).join("")}</tbody></table></div>`
}
function criteriaMini(){
 return '<div class="list">'+D.evidenceSummary.slice(0,5).map(x=>`<div><div class="criterion-head"><b>${x.criterion}. ${esc(x.title)}</b><small>${x.linked}/${x.total}</small></div><div class="progress"><span style="width:${pct(x.linked,x.total)}%"></span></div></div>`).join("")+'</div>'
}
function criteriaGrid(){
 return '<div class="criteria">'+D.evidenceSummary.map(x=>`<div class="criterion"><div class="criterion-head"><b>${x.criterion}. ${esc(x.title)}</b><small>${pct(x.linked,x.total)}٪</small></div><div class="progress" style="margin-top:8px"><span style="width:${pct(x.linked,x.total)}%"></span></div><small>${x.linked} من ${x.total} لها مصادر مرتبطة</small></div>`).join("")+'</div>'
}
function accreditationView(){
 const e=evidenceTotals();
 return hero("الاعتماد","الاعتماد المؤسسي والشواهد","هذه الواجهة تلخص حالة الربط؛ مساحة الاعتماد التفصيلية تبقى مرجع المراجعة لكل مؤشر.",
 '<a class="btn gold" href="../accreditation/" target="_blank">فتح مساحة الاعتماد التفصيلية ↗</a>')+
 `<div class="grid kpi-grid">${kpi("إجمالي المؤشرات",e.total,"الإصدار الرابع 2023")}${kpi("لها مصادر مرتبطة",e.linked,"ليست قبولًا نهائيًا")}${kpi("تحتاج مصدرًا/إثباتًا",e.gap,"حسب نموذج البيانات")}${kpi("المعايير",10,"كل معيار يراجع مستقلًا")}</div>
 <section class="section panel">${criteriaGrid()}</section>`
}
function improvementList(limit=99){
 return '<div class="list">'+state.improvements.slice(0,limit).map(x=>`<div class="item"><div class="item-main"><span class="code">${x.id}</span><h4>${esc(x.title)}</h4><p>${esc(x.owner)} · ${esc(x.due)}</p></div>${status(x.status)}</div>`).join("")+'</div>'
}
function improvementView(){
 return `<div class="section-head"><div><h2>خطة التحسين والمتابعة</h2><p>الإجراء يبقى مفتوحًا حتى يوجد دليل تنفيذ/نتيجة مناسب.</p></div></div><div class="panel">${improvementList()}</div>`
}
function universityList(limit=99,role){
 return '<div class="list">'+state.universityRequests.slice(0,limit).map(x=>`<div class="item"><div class="item-main"><span class="code">${x.id}</span><h4>${esc(x.title)}</h4><p>${esc(x.to)} · مرتبط بـ ${esc(x.related)}</p></div><div>${status(x.status)}${role?.id==="quality"&&x.status==="draft"?'<div style="margin-top:7px"><button class="btn primary" data-send-ur="'+x.id+'">إرسال تجريبي</button></div>':''}</div></div>`).join("")+'</div>'
}
function universityView(role){
 return hero("اختصاص مركزي","طلبات جامعة طبرق","نفصل ما يجب أن توفره الجامعة عما يقع ضمن صلاحيات الكلية، مع تتبع الإرسال والاستلام والرد.",
 role.id==="quality"?'<button class="btn gold" data-new-university>طلب جديد</button>':"")+
 '<section class="section panel">'+universityList(99,role)+'</section>'
}
function approvalList(){
 const list=pendingApprovals();
 if(!list.length)return '<div class="empty">لا توجد وثائق بانتظار اعتماد العميد في النموذج.</div>';
 return '<div class="list">'+list.map(a=>{
  const d=state.documents.find(x=>x.id===a.documentId);
  return `<div class="item"><div class="item-main"><span class="code">${esc(d?.code||a.id)}</span><h4>${esc(a.title)}</h4><p>${esc(d?.version||"")}</p></div><div>${status(a.status)}<div style="margin-top:7px"><button class="btn primary" data-approve-doc="${a.documentId}">اعتماد تجريبي</button></div></div></div>`
 }).join("")+'</div>'
}
function handoverView(role){
 const list=role.id==="quality"||role.id==="dean"?state.handovers:state.handovers.filter(h=>h.role===role.id);
 return hero("استمرارية العمل","الاستلام والتسليم","جلسة تسليم حية تجمع تلقائيًا المهام والوثائق والالتزامات المرتبطة بالمنصب؛ لا تعتمد على ذاكرة الشخص.",
 role.id==="quality"?'<button class="btn gold" data-new-handover>بدء جلسة تجريبية</button>':"")+
 '<section class="section grid two-col">'+(list.length?list.map(h=>handoverCard(h,role)).join(""):'<div class="empty">لا توجد جلسة تسليم مفتوحة لهذا الدور.</div>')+'</section>'
}
function handoverCard(h,role){
 const done=h.items.filter(i=>i.done).length,p=pct(done,h.items.length);
 let action="";
 if(role.id==="quality"||role.id==="dean"){
  if(h.status==="preparing")action='<button class="btn primary" data-advance-ho="'+h.id+'">جاهز للمراجعة</button>';
  else if(h.status==="ready_review")action='<button class="btn primary" data-advance-ho="'+h.id+'">تأكيد استلام الخلف</button>';
  else if(h.status==="accepted_successor")action='<button class="btn primary" data-advance-ho="'+h.id+'">إغلاق التسليم</button>'
 }
 return `<article class="handover-card"><header><div><span class="code">${h.id}</span><h3>${esc(h.roleLabel)}</h3><p style="font-size:10px;color:var(--muted);margin:2px 0">الموعد: ${esc(h.target)}</p></div>${status(h.status)}</header>
 <div class="progress" style="margin:12px 0"><span style="width:${p}%"></span></div>
 <div class="checklist">${h.items.map(i=>`<button class="check ${i.done?"done":""}" data-toggle-ho="${h.id}" data-item="${i.id}" ${role.kind==="staff"?"":"style=\"border:0;width:100%;text-align:right\""}><span class="box">${i.done?"✓":""}</span><span>${esc(i.label)}</span></button>`).join("")}</div>
 ${action?'<div style="margin-top:12px">'+action+'</div>':''}</article>`
}
function myHandoverView(role){return handoverView(role)}
function auditView(){
 return `<div class="section-head"><div><h2>سجل التدقيق</h2><p>تسلسل زمني للأحداث المهمة. في النسخة الإنتاجية يكون Append-only قدر الإمكان.</p></div></div>
 <div class="panel timeline">${state.audit.map(a=>`<div class="event"><b>${esc(a.actor)} · ${esc(a.action)}</b><p>${esc(a.time)} · ${esc(a.target)}</p></div>`).join("")}</div>`
}
function systemView(){
 return hero("التصميم المؤسسي","النظام والصلاحيات","الإدارة للعميد والجودة، IT للدعم الفني، والموظفون عبر تطبيق قائم على الدور.",
 '<a class="btn gold" href="https://docs.google.com/document/d/1b_Jde8vws9xWgGlSewarWKI-VU7m2evuANegsHot-4I/edit" target="_blank">فتح المخطط المعماري ↗</a>')+
 `<section class="section permission-grid">
  <article class="permission"><h4>العميد</h4><p>قرارات واعتمادات ومتابعة تنفيذية.</p><ul><li>اعتماد الوثائق ضمن الصلاحية</li><li>متابعة المخاطر والتأخير</li><li>طلبات الجامعة</li><li>إغلاق التسليم للمناصب المطلوبة</li></ul></article>
  <article class="permission"><h4>قسم الجودة</h4><p>الإدارة التشغيلية للمنظومة.</p><ul><li>المهام والطلبات</li><li>الترميز والإصدارات</li><li>ربط الشواهد</li><li>التحسين والاستبانات</li><li>فتح جلسات التسليم</li></ul></article>
  <article class="permission"><h4>تقنية المعلومات</h4><p>دعم تقني عند الحاجة فقط.</p><ul><li>الخادم وقاعدة البيانات</li><li>النسخ الاحتياطي والاستعادة</li><li>نشر التحديثات</li><li>لا يعتمد شواهد أو قرارات جودة</li></ul></article>
  <article class="permission"><h4>تطبيق الموظف</h4><p>واجهة مبسطة حسب الدور.</p><ul><li>يرى ما يخصه فقط</li><li>يرفع المخرج أو يملأ النموذج</li><li>يتابع الحالة والملاحظات</li><li>لا ينشئ رموزًا ولا يقبل شاهدًا</li></ul></article>
  <article class="permission"><h4>الأصل والملكية</h4><p>قسم الجودة يدير النظام ولا يملك كل الأصول.</p><ul><li>المسجل يملك أصل سجلات الطلبة</li><li>التدريب يملك سجلات التدريب</li><li>الإدارة تملك الجرد والصيانة</li><li>الجودة يعرف أين يوجد الأصل ويربطه</li></ul></article>
  <article class="permission"><h4>الاستدامة</h4><p>النظام يعمل بدون ChatGPT.</p><ul><li>تصدير السجلات</li><li>نسخ احتياطي</li><li>Audit Trail</li><li>أدوار بدل أسماء</li><li>استلام وتسليم مدمج</li></ul></article>
 </section>`
}
function itDashboard(){
 return hero("Support Access","لوحة تقنية المعلومات","الدخول الفني منفصل عن القرار الوظيفي. النموذج يفترض أن وصول IT المرتفع يفتح عند الحاجة ويترك أثرًا.",
 '<button class="btn gold" data-test-restore>تشغيل اختبار استعادة تجريبي</button>')+
 `<div class="grid kpi-grid">${kpi("الخدمات",4,"نموذجية وسليمة")}${kpi("آخر Backup","اليوم 02:00","قاعدة البيانات")}${kpi("آخر Restore Test",state.backups.find(b=>b.type==="اختبار الاستعادة")?.last||"—","يجب اختباره دوريًا")}${kpi("صلاحية IT","عند الحاجة","Support Access")}</div>
 <section class="section grid two-col"><div class="panel"><h3>حالة النسخ</h3>${backupList()}</div><div class="panel"><h3>حدود صلاحية IT</h3><div class="list"><div class="item"><div class="item-main"><h4>مسموح</h4><p>الخادم، النشر، النسخ الاحتياطي، الاستعادة، الأعطال.</p></div>${status("accepted")}</div><div class="item"><div class="item-main"><h4>غير مسموح</h4><p>اعتماد شاهد، تغيير حكم جودة، تعديل قرار أكاديمي أو إداري.</p></div>${status("returned")}</div></div></div></section>`
}
function backupList(){
 return '<div class="list">'+state.backups.map(b=>`<div class="item"><div class="item-main"><h4>${esc(b.type)}</h4><p>آخر تنفيذ: ${esc(b.last)} · الاحتفاظ: ${esc(b.retention)}</p></div>${status(b.status)}</div>`).join("")+'</div>'
}
function backupsView(){
 return `<div class="section-head"><div><h2>النسخ الاحتياطي والاستعادة</h2><p>وجود النسخة لا يكفي؛ يجب اختبار الاستعادة دوريًا.</p></div><button class="btn primary" data-test-restore>اختبار استعادة تجريبي</button></div><div class="panel">${backupList()}</div>`
}
function supportLogView(){
 return `<div class="section-head"><div><h2>سجل الدعم الفني</h2><p>الأحداث التقنية فقط، ولا يحل محل سجل القرارات الوظيفية.</p></div></div>
 <div class="panel timeline">${state.audit.filter(a=>a.actor==="تقنية المعلومات").map(a=>`<div class="event"><b>${esc(a.action)}</b><p>${esc(a.time)} · ${esc(a.target)}</p></div>`).join("")||'<div class="empty">لا توجد أحداث دعم فني جديدة.</div>'}</div>`
}
function staffHome(role){
 const tasks=roleTasks(role.id),open=tasks.filter(t=>!["accepted","closed"].includes(t.status)),returned=tasks.filter(t=>t.status==="returned").length,submitted=tasks.filter(t=>t.status==="submitted").length;
 return `<section class="staff-home-hero"><span class="status accepted">تطبيق الموظفين · ${esc(role.label)}</span><h2>ماذا عليّ اليوم؟</h2><p>لن تحتاج إلى معرفة رموز الوثائق أو معايير الاعتماد. نفّذ ما يظهر لك، وارفع المخرج، وتابع ملاحظة الجودة.</p>
 <div class="quick-actions"><button class="quick" data-goto="my-tasks"><b>${open.length} مهام مفتوحة</b><span>فتح مهامي</span></button><button class="quick" data-goto="my-submissions"><b>${submitted} بانتظار المراجعة</b><span>متابعة ما أرسلته</span></button><button class="quick" data-goto="my-handover"><b>استلام وتسليم</b><span>ملف منصبي</span></button></div></section>
 <div class="grid kpi-grid">${kpi("مهام مفتوحة",open.length,"مرتبطة بمنصبك")}${kpi("أعيد للاستكمال",returned,"راجع ملاحظة الجودة")}${kpi("بانتظار المراجعة",submitted,"أرسلته للجودة")}${kpi("مغلق/مقبول",tasks.filter(t=>t.status==="accepted").length,"مخرجات مكتملة")}</div>
 <section class="section panel"><div class="section-head"><div><h2>الأولوية الآن</h2><p>أهم ما يظهر لدورك.</p></div><button class="btn" data-goto="my-tasks">كل المهام</button></div>${staffTaskCards(tasks.slice().sort((a,b)=>dueRank(a)-dueRank(b)).slice(0,4),role)}</section>`
}
function staffTaskCards(tasks,role){
 if(!tasks.length)return '<div class="empty">لا توجد مهام مسندة لهذا الدور في بيانات النموذج.</div>';
 return '<div class="list">'+tasks.map(t=>`<div class="item"><div class="item-main"><span class="code">${t.id}</span><h4>${esc(t.title)}</h4><p>الموعد: ${esc(t.due)} · المطلوب: ${esc(t.evidence)}</p>${t.note?'<p style="color:var(--danger)">'+esc(t.note)+'</p>':''}</div><div>${status(t.status)}<div style="margin-top:7px">${t.status==="assigned"?'<button class="btn primary" data-start-task="'+t.id+'">بدء</button>':["in_progress","returned"].includes(t.status)?'<button class="btn primary" data-open-submit="'+t.id+'">إرسال</button>':""}</div></div></div>`).join("")+'</div>'
}
function submitView(role){
 const eligible=roleTasks(role.id).filter(t=>["assigned","in_progress","returned"].includes(t.status));
 return `<div class="section-head"><div><h2>رفع / تعبئة</h2><p>في النموذج التجريبي لا يُرفع الملف فعليًا؛ نقرأ اسم الملف فقط لمحاكاة التدفق.</p></div></div>
 <div class="panel"><form id="demo-submit-form" class="form-grid"><div class="field full"><label>المهمة</label><select name="taskId"><option value="">اختر المهمة</option>${eligible.map(t=>`<option value="${t.id}">${esc(t.id+" · "+t.title)}</option>`).join("")}<option value="unknown">لدي ملف ولا أعرف أين يصنف</option></select></div><div class="field"><label>الملف</label><input type="file" name="file"></div><div class="field"><label>نوع المخرج</label><select name="kind"><option>تقرير</option><option>قرار</option><option>محضر</option><option>نموذج</option><option>سجل</option><option>مراسلة</option><option>لا أعرف</option></select></div><div class="field full"><label>ملاحظة للّجودة</label><textarea name="note" placeholder="أي توضيح يساعد المراجع…"></textarea></div><div class="field full"><button class="btn primary" type="submit">إرسال تجريبي للجودة</button></div></form></div>`
}
function mySubmissionsView(role){
 const tasks=roleTasks(role.id).filter(t=>["submitted","returned","accepted","closed"].includes(t.status));
 return `<div class="section-head"><div><h2>ما أرسلته</h2><p>يمكنك رؤية الحالة وملاحظة الاستكمال دون الوصول إلى لوحة الجودة.</p></div></div>${staffTaskCards(tasks,role)}`
}
function helpView(){
 return `<div class="section-head"><div><h2>مساعدة سريعة</h2><p>هدف التطبيق أن يعمل الموظف دون حفظ الرموز أو بنية ملفات الجودة.</p></div></div><div class="grid two-col">${D.help.map(h=>`<article class="panel"><h3>${esc(h[0])}</h3><p style="font-size:11px;color:var(--muted)">${esc(h[1])}</p></article>`).join("")}</div>`
}
function openModal(title,body){
 const m=$("#modal");if(!m)return;$("#modal-title").textContent=title;$("#modal-body").innerHTML=body;m.classList.add("open");$("[data-close]",m)?.focus()
}
function closeModal(){$("#modal")?.classList.remove("open")}
function returnModal(taskId){
 const t=state.tasks.find(x=>x.id===taskId);if(!t)return;
 openModal("إعادة للاستكمال",`<p>المهمة: <b>${esc(t.title)}</b></p><div class="field"><label>ملاحظة الجودة</label><textarea id="return-note" placeholder="اكتب المطلوب استكماله بوضوح…"></textarea></div><div style="margin-top:12px"><button class="btn primary" data-confirm-return="${taskId}">إعادة للموظف</button></div>`)
}
function submitModal(taskId){
 const t=state.tasks.find(x=>x.id===taskId);if(!t)return;
 openModal("إرسال المهمة للجودة",`<p><b>${esc(t.title)}</b></p><p style="font-size:10px;color:var(--muted)">هذه محاكاة فقط؛ لا يتم رفع ملفات فعلية.</p><div class="field"><label>اسم الملف/المخرج</label><input id="demo-file-name" value="مخرج_${esc(t.id)}.pdf"></div><div class="field" style="margin-top:8px"><label>ملاحظة</label><textarea id="demo-submit-note"></textarea></div><div style="margin-top:12px"><button class="btn primary" data-confirm-submit="${taskId}">إرسال تجريبي</button></div>`)
}
function newUniversityModal(){
 openModal("طلب مركزي جديد",`<form id="new-ur-form" class="form-grid"><div class="field full"><label>عنوان الطلب</label><input name="title" required></div><div class="field"><label>الجهة</label><input name="to" placeholder="إدارة/مكتب الجامعة" required></div><div class="field"><label>المؤشر/السبب</label><input name="related" placeholder="مثال: 6.2"></div><div class="field full"><button class="btn primary">حفظ كمسودة</button></div></form>`)
}
function newHandoverModal(){
 const staff=D.roles.filter(r=>r.kind==="staff"||r.id==="dean");
 openModal("بدء جلسة استلام وتسليم",`<form id="new-ho-form" class="form-grid"><div class="field full"><label>المنصب</label><select name="role">${staff.map(r=>`<option value="${r.id}">${esc(r.label)}</option>`).join("")}</select></div><div class="field full"><label>الموعد المستهدف</label><input name="target" value="خلال 14 يومًا"></div><div class="field full"><button class="btn primary">إنشاء جلسة تجريبية</button></div></form>`)
}
function bindActions(role){
 $$("[data-goto]").forEach(b=>b.onclick=()=>{currentView=b.dataset.goto;renderApp()});
 $$("[data-start-task]").forEach(b=>b.onclick=()=>{
  const t=state.tasks.find(x=>x.id===b.dataset.startTask);if(!t)return;t.status="in_progress";audit(role.label,"بدأ المهمة",t.id+" · "+t.title);save();toast("بدأت المهمة");renderApp()
 });
 $("[data-open-submit]").forEach(b=>b.onclick=()=>{const id=b.dataset.openSubmit,t=state.tasks.find(x=>x.id===id);if(!t)return;t.status="submitted";const existing=state.inbox.find(x=>x.taskId===id);if(existing){existing.status="submitted";existing.submitted="الآن"}else state.inbox.unshift({id:"SUB-"+String(Date.now()).slice(-4),taskId:id,fromRole:role.id,title:t.title,submitted:"الآن",status:"submitted",fileName:"مخرج تجريبي"});audit(role.label,"أرسل مخرجًا للمراجعة",id+" · "+t.title);save();toast("أُرسل للجودة تجريبيًا");renderApp()});
 $$("[data-accept-task]").forEach(b=>b.onclick=()=>{
  const id=b.dataset.acceptTask,t=state.tasks.find(x=>x.id===id);if(!t)return;t.status="accepted";
  state.inbox=state.inbox.filter(x=>x.taskId!==id);audit("قسم الجودة","قبل المخرج",id+" · "+t.title);save();toast("تم قبول المخرج تجريبيًا");renderApp()
 });
 $("[data-return-task]").forEach(b=>b.onclick=()=>{const id=b.dataset.returnTask,t=state.tasks.find(x=>x.id===id);if(!t)return;const note=prompt("ملاحظة الاستكمال:","يرجى استكمال الملاحظات.")||"يرجى استكمال الملاحظات.";t.status="returned";t.note=note;const sub=state.inbox.find(x=>x.taskId===id);if(sub)sub.status="returned";audit("قسم الجودة","أعاد المهمة للاستكمال",id+" · "+note);save();toast("أعيدت للموظف");renderApp()});
 $$("[data-approve-doc]").forEach(b=>b.onclick=()=>{
  const id=b.dataset.approveDoc,d=state.documents.find(x=>x.id===id);if(!d)return;d.status="approved";
  state.approvals=state.approvals.filter(a=>a.documentId!==id);audit("العميد","اعتمد الوثيقة تجريبيًا",d.code+" · "+d.title);save();toast("تم الاعتماد داخل النموذج فقط");renderApp()
 });
 $$("[data-send-ur]").forEach(b=>b.onclick=()=>{
  const r=state.universityRequests.find(x=>x.id===b.dataset.sendUr);if(!r)return;r.status="sent";r.age=0;audit("قسم الجودة","أرسل طلبًا مركزيًا",r.id+" · "+r.title);save();toast("تم الإرسال تجريبيًا");renderApp()
 });
 $$("[data-toggle-ho]").forEach(b=>b.onclick=()=>{
  const h=state.handovers.find(x=>x.id===b.dataset.toggleHo),i=h?.items.find(x=>x.id===b.dataset.item);if(!i)return;i.done=!i.done;audit(role.label,"حدّث بند تسليم",h.id+" · "+i.label);save();renderApp()
 });
 $$("[data-advance-ho]").forEach(b=>b.onclick=()=>{
  const h=state.handovers.find(x=>x.id===b.dataset.advanceHo);if(!h)return;
  const seq={preparing:"ready_review",ready_review:"accepted_successor",accepted_successor:"closed"};h.status=seq[h.status]||h.status;
  audit(role.label,"غيّر حالة التسليم",h.id+" · "+(labels[h.status]||h.status));save();toast("تم تحديث حالة التسليم");renderApp()
 });
 $("[data-new-university]")?.addEventListener("click",()=>{const title=prompt("عنوان الطلب المركزي:");if(!title)return;const to=prompt("الجهة في الجامعة:","الإدارة المختصة")||"الإدارة المختصة";const id="UR-"+String(Date.now()).slice(-3);state.universityRequests.unshift({id,title,to,related:"—",status:"draft",age:0});audit("قسم الجودة","أنشأ طلبًا مركزيًا",id+" · "+title);save();toast("حُفظ الطلب كمسودة");renderApp()});
 $("[data-new-handover]")?.addEventListener("click",()=>{const rid=prompt("اكتب رمز الدور لبدء جلسة تسليم، مثال registrar أو dean:","registrar");const r=roleBy(rid);if(!r){toast("رمز الدور غير معروف");return}const id="HO-"+String(Date.now()).slice(-3);state.handovers.unshift({id,role:rid,roleLabel:r.label,status:"preparing",target:"خلال 14 يومًا",items:[{id:"a",label:"المهام المفتوحة المرتبطة بالمنصب",done:false},{id:"b",label:"الوثائق والأصول التي يملكها الدور",done:false},{id:"c",label:"التقارير والمواعيد القادمة",done:false},{id:"d",label:"الطلبات والمراسلات المعلقة",done:false},{id:"e",label:"تأكيد صلاحية حساب المستلم",done:false}]});audit("قسم الجودة","فتح جلسة استلام وتسليم",id+" · "+r.label);save();toast("تم إنشاء جلسة تسليم");renderApp()});
 $$("[data-test-restore]").forEach(b=>b.onclick=()=>{
  const x=state.backups.find(x=>x.type==="اختبار الاستعادة");if(x){x.last="الآن";x.status="ok"}
  audit("تقنية المعلومات","اختبار استعادة تجريبي","نجح – لا توجد استعادة حقيقية في GitHub Pages");save();toast("نجح اختبار المحاكاة");renderApp()
 });
 const sf=$("#demo-submit-form");if(sf)sf.onsubmit=e=>{
  e.preventDefault();const fd=new FormData(sf),taskId=fd.get("taskId"),file=fd.get("file"),kind=fd.get("kind"),note=fd.get("note");
  if(!taskId){toast("اختر المهمة أولًا");return}
  if(taskId==="unknown"){
   audit(role.label,"أرسل ملفًا لصندوق فرز الجودة",(file&&file.name?file.name:"ملف بدون اسم")+" · "+kind);save();toast("وصل لصندوق فرز الجودة تجريبيًا");sf.reset();return
  }
  const t=state.tasks.find(x=>x.id===taskId);if(!t)return;t.status="submitted";
  state.inbox.unshift({id:"SUB-"+String(Date.now()).slice(-4),taskId:t.id,fromRole:role.id,title:t.title,submitted:"الآن",status:"submitted",fileName:file&&file.name?file.name:"مخرج تجريبي",note});
  audit(role.label,"أرسل مخرجًا للمراجعة",t.id+" · "+t.title);save();toast("أُرسل للجودة تجريبيًا");renderApp()
 };
 const ur=$("#new-ur-form");if(ur)ur.onsubmit=e=>{
  e.preventDefault();const fd=new FormData(ur);const id="UR-"+String(Date.now()).slice(-3);
  state.universityRequests.unshift({id,title:fd.get("title"),to:fd.get("to"),related:fd.get("related")||"—",status:"draft",age:0});
  audit("قسم الجودة","أنشأ طلبًا مركزيًا",id+" · "+fd.get("title"));save();closeModal();toast("حُفظ الطلب كمسودة");renderApp()
 };
 const ho=$("#new-ho-form");if(ho)ho.onsubmit=e=>{
  e.preventDefault();const fd=new FormData(ho),rid=fd.get("role"),r=roleBy(rid),id="HO-"+String(Date.now()).slice(-3);
  state.handovers.unshift({id,role:rid,roleLabel:r?.label||rid,status:"preparing",target:fd.get("target"),items:[
   {id:"a",label:"المهام المفتوحة المرتبطة بالمنصب",done:false},{id:"b",label:"الوثائق والأصول التي يملكها الدور",done:false},{id:"c",label:"التقارير والمواعيد القادمة",done:false},{id:"d",label:"الطلبات والمراسلات المعلقة",done:false},{id:"e",label:"تأكيد صلاحية حساب المستلم",done:false}
  ]});audit("قسم الجودة","فتح جلسة استلام وتسليم",id+" · "+(r?.label||rid));save();closeModal();toast("تم إنشاء جلسة تسليم");renderApp()
 };
 $$("[data-confirm-return]").forEach(b=>b.onclick=()=>{
  const id=b.dataset.confirmReturn,t=state.tasks.find(x=>x.id===id);if(!t)return;
  const note=$("#return-note")?.value.trim()||"يرجى استكمال الملاحظات.";t.status="returned";t.note=note;
  const sub=state.inbox.find(x=>x.taskId===id);if(sub)sub.status="returned";
  audit("قسم الجودة","أعاد المهمة للاستكمال",id+" · "+note);save();closeModal();toast("أعيدت للموظف");renderApp()
 });
 $$("[data-confirm-submit]").forEach(b=>b.onclick=()=>{
  const id=b.dataset.confirmSubmit,t=state.tasks.find(x=>x.id===id);if(!t)return;
  t.status="submitted";const fileName=$("#demo-file-name")?.value||"مخرج تجريبي";
  const existing=state.inbox.find(x=>x.taskId===id);
  if(existing){existing.status="submitted";existing.submitted="الآن";existing.fileName=fileName}else state.inbox.unshift({id:"SUB-"+String(Date.now()).slice(-4),taskId:id,fromRole:role.id,title:t.title,submitted:"الآن",status:"submitted",fileName});
  audit(role.label,"أرسل مخرجًا للمراجعة",id+" · "+fileName);save();closeModal();toast("أُرسل للجودة تجريبيًا");renderApp()
 });
}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
renderApp();
})();