window.QMS_DEMO_DATA = {
  meta: {
    title: "منظومة الإدارة المؤسسية والجودة",
    faculty: "كلية التمريض",
    university: "جامعة طبرق",
    version: "Prototype 0.1",
    updated: "2026-10-01",
    notice: "نموذج تجريبي ببيانات محاكاة. لا توجد مصادقة حقيقية ولا حفظ مؤسسي في هذه النسخة."
  },
  roles: [
    { id:"dean", label:"العميد", kind:"admin", icon:"◆", description:"اعتماد، قرارات، متابعة تنفيذية، استلام وتسليم." },
    { id:"quality", label:"قسم ضمان الجودة", kind:"admin", icon:"✓", description:"إدارة النظام والوثائق والشواهد والمهام والتحسين." },
    { id:"it", label:"تقنية المعلومات", kind:"support", icon:"⚙", description:"دعم فني، خادم، نسخ احتياطي، استعادة عند الحاجة." },
    { id:"registrar", label:"المسجل", kind:"staff", unit:"التسجيل وشؤون الطلبة", icon:"▣" },
    { id:"academic", label:"الشؤون العلمية", kind:"staff", unit:"البرنامج الأكاديمي", icon:"▤" },
    { id:"exams", label:"الدراسة والامتحانات", kind:"staff", unit:"الدراسة والامتحانات", icon:"◫" },
    { id:"clinical", label:"التدريب السريري", kind:"staff", unit:"التدريب السريري والامتياز", icon:"✚" },
    { id:"hr", label:"شؤون أعضاء هيئة التدريس", kind:"staff", unit:"الموارد البشرية", icon:"◉" },
    { id:"research", label:"البحث العلمي", kind:"staff", unit:"البحث العلمي", icon:"⌁" },
    { id:"community", label:"خدمة المجتمع", kind:"staff", unit:"خدمة المجتمع والبيئة", icon:"◎" },
    { id:"admin", label:"الشؤون الإدارية والمالية", kind:"staff", unit:"الإدارة والمرافق", icon:"▦" },
    { id:"media", label:"الإعلام والتوثيق", kind:"staff", unit:"الإعلام والتوثيق", icon:"◈" },
    { id:"alumni", label:"شؤون الخريجين", kind:"staff", unit:"الخريجون", icon:"◇" }
  ],
  nav: {
    admin: [
      ["dashboard","لوحة اليوم","⌂"],
      ["inbox","صندوق المراجعة","▣"],
      ["tasks","المهام والطلبات","✓"],
      ["documents","الوثائق والإصدارات","▤"],
      ["accreditation","الاعتماد والشواهد","◎"],
      ["improvement","التحسين والمتابعة","↗"],
      ["university","طلبات الجامعة","↥"],
      ["handover","الاستلام والتسليم","⇄"],
      ["audit","سجل التدقيق","≡"],
      ["system","النظام والصلاحيات","⚙"]
    ],
    support: [
      ["it-dashboard","لوحة الدعم الفني","⌂"],
      ["backups","النسخ الاحتياطي","⟳"],
      ["support-log","سجل الدعم","≡"],
      ["handover","الاستلام والتسليم","⇄"]
    ],
    staff: [
      ["staff-home","الرئيسية","⌂"],
      ["my-tasks","مهامي","✓"],
      ["submit","رفع / تعبئة","＋"],
      ["my-submissions","ما أرسلته","▤"],
      ["my-handover","استلام وتسليم منصبي","⇄"],
      ["help","مساعدة","?"]
    ]
  },
  tasks: [
    {id:"T-026", title:"تحديث تصنيف الطلبة حسب الحالة الأكاديمية", ownerRole:"registrar", due:"15 أكتوبر 2026", status:"assigned", priority:"high", evidence:"جدول الحالات + أسباب التوقف/النقل/العودة", requestedBy:"quality"},
    {id:"T-031", title:"رفع تقرير التدريب السريري للفصل الأول", ownerRole:"clinical", due:"31 يناير 2027", status:"in_progress", priority:"medium", evidence:"تقرير + الحضور + المواقع + التقييم", requestedBy:"quality"},
    {id:"T-034", title:"استكمال جرد المرافق والمعامل", ownerRole:"admin", due:"20 أكتوبر 2026", status:"returned", priority:"high", evidence:"جرد محدث + حالة التشغيل + ملاحظات الصيانة", requestedBy:"quality", note:"يرجى فصل القاعات عن المعامل وتحديد الصالح والعاطل."},
    {id:"T-041", title:"تحديث بيانات الخريجين", ownerRole:"alumni", due:"30 نوفمبر 2026", status:"submitted", priority:"medium", evidence:"قائمة محدثة + مصدر البيانات", requestedBy:"quality"},
    {id:"T-048", title:"إعداد قائمة الإنتاج العلمي 2025/2026", ownerRole:"research", due:"10 نوفمبر 2026", status:"assigned", priority:"medium", evidence:"المنشورات + DOI/الرابط + سنة النشر", requestedBy:"quality"},
    {id:"T-050", title:"تحديث صفحة الكلية الرسمية بعد تدقيق المحتوى", ownerRole:"media", due:"25 أكتوبر 2026", status:"submitted", priority:"high", evidence:"سجل تحديث + لقطات بعد التصحيح", requestedBy:"quality"},
    {id:"T-052", title:"تحليل نتائج استبيان تجربة الطالب", ownerRole:"quality", due:"15 نوفمبر 2026", status:"in_progress", priority:"medium", evidence:"تقرير تحليل + توصيات + خطة استجابة", requestedBy:"quality"},
    {id:"T-060", title:"مراجعة توصيفات المقررات قبل الفصل", ownerRole:"academic", due:"20 أكتوبر 2026", status:"assigned", priority:"high", evidence:"قائمة التوصيفات + حالة المراجعة", requestedBy:"quality"}
  ],
  documents: [
    {id:"D-001", code:"NUR-PLN-STR-001", title:"الخطة الاستراتيجية 2026–2030", version:"إصدار سبتمبر 2026", status:"under_review", owner:"لجنة الخطة الاستراتيجية", approval:"dean", location:"المستودع المؤسسي", current:true},
    {id:"D-002", code:"NUR-MAN-DOC-001", title:"دليل نظام إدارة الوثائق والسجلات والشواهد", version:"2.0", status:"operational_draft", owner:"قسم ضمان الجودة", approval:"dean", location:"المستودع المؤسسي", current:true},
    {id:"D-003", code:"NUR-MAT-ICT-001", title:"المخطط المعماري لمنظومة الإدارة المؤسسية والجودة", version:"1.0", status:"draft", owner:"قسم ضمان الجودة", approval:"dean", location:"المستودع المؤسسي", current:true},
    {id:"D-004", code:"NUR-MAN-CLN-001", title:"دليل التدريب السريري والامتياز", version:"1.0", status:"under_review", owner:"التدريب السريري", approval:"dean", location:"التدريب السريري", current:true},
    {id:"D-005", code:"NUR-POL-QA-001", title:"سياسة ضمان الجودة والتحسين المستمر", version:"1.0", status:"draft", owner:"قسم ضمان الجودة", approval:"dean", location:"الجودة", current:true},
    {id:"D-006", code:"NUR-REP-MED-002", title:"تقرير تدقيق الموقع الإلكتروني وإجراءات التصحيح", version:"1.0", status:"under_review", owner:"الإعلام والتوثيق", approval:"quality", location:"الإعلام والتوثيق", current:true}
  ],
  evidenceSummary: [
    {criterion:1,title:"التخطيط",linked:12,total:12},
    {criterion:2,title:"القيادة والحوكمة",linked:17,total:23},
    {criterion:3,title:"هيئة التدريس والكوادر المساندة",linked:16,total:16},
    {criterion:4,title:"البرامج التعليمية",linked:21,total:21},
    {criterion:5,title:"الشؤون الطلابية",linked:22,total:24},
    {criterion:6,title:"المرافق وخدمات الدعم",linked:12,total:26},
    {criterion:7,title:"البحث العلمي",linked:16,total:20},
    {criterion:8,title:"خدمة المجتمع والبيئة",linked:13,total:14},
    {criterion:9,title:"ضمان الجودة والتحسين المستمر",linked:15,total:16},
    {criterion:10,title:"التعليم الإلكتروني والتعلم عن بعد",linked:12,total:12}
  ],
  universityRequests: [
    {id:"UR-008", title:"آلية إعداد الموازنة ومشاركة الكليات", to:"الإدارة المالية – جامعة طبرق", status:"draft", age:0, related:"2.13–2.15"},
    {id:"UR-012", title:"إفادة الحقوق المالية لمنسقي الجودة", to:"الجودة + القانونية + المالية", status:"draft", age:0, related:"2.22"},
    {id:"UR-016", title:"قائمة الاشتراكات وقواعد البيانات العلمية", to:"إدارة المكتبات", status:"sent", age:12, related:"7.19"},
    {id:"UR-019", title:"سند استخدام المبنى والمرافق", to:"الشؤون القانونية / الأملاك", status:"acknowledged", age:7, related:"6.2"}
  ],
  improvements: [
    {id:"IMP-01",title:"دعم السنة الأولى في مقررات التعثر المرتفع",owner:"الشؤون العلمية",status:"in_progress",due:"الفصل الأول 2026/2027"},
    {id:"IMP-02",title:"تطوير الجرد والصيانة وسلامة المرافق",owner:"الشؤون الإدارية",status:"open",due:"2026/2027"},
    {id:"IMP-03",title:"تفعيل الإرشاد الأكاديمي بسجلات تطبيق",owner:"المسجل / الشؤون العلمية",status:"open",due:"الفصل الأول 2026/2027"},
    {id:"IMP-04",title:"ضبط الموقع الإلكتروني وسجل النشر",owner:"الإعلام والتوثيق",status:"in_progress",due:"أكتوبر 2026"}
  ],
  inbox: [
    {id:"SUB-14",taskId:"T-041",fromRole:"alumni",title:"تحديث بيانات الخريجين",submitted:"اليوم 09:20",status:"submitted"},
    {id:"SUB-18",taskId:"T-050",fromRole:"media",title:"تحديث صفحة الكلية الرسمية",submitted:"أمس 14:05",status:"submitted"},
    {id:"SUB-20",taskId:"T-034",fromRole:"admin",title:"استكمال جرد المرافق والمعامل",submitted:"28 سبتمبر",status:"returned"}
  ],
  approvals: [
    {id:"APR-01",documentId:"D-001",title:"الخطة الاستراتيجية – النسخة المرجعية الحالية",kind:"وثيقة",status:"waiting_dean"},
    {id:"APR-02",documentId:"D-002",title:"دليل نظام إدارة الوثائق v2.0",kind:"وثيقة",status:"waiting_dean"},
    {id:"APR-03",documentId:"D-003",title:"مخطط منظومة الإدارة المؤسسية والجودة",kind:"وثيقة",status:"waiting_dean"}
  ],
  handovers: [
    {id:"HO-001",role:"registrar",roleLabel:"مسجل الكلية",status:"preparing",target:"15 أكتوبر 2026",items:[
      {id:"h1",label:"المهام المفتوحة",done:true},
      {id:"h2",label:"سجلات الطلبة الحالية ومكان الأصول",done:true},
      {id:"h3",label:"التقارير الدورية القادمة",done:false},
      {id:"h4",label:"الطلبات المعلقة",done:false},
      {id:"h5",label:"تأكيد صلاحية الحساب الجديد",done:false}
    ]},
    {id:"HO-002",role:"dean",roleLabel:"عميد الكلية",status:"ready_review",target:"عند الحاجة",items:[
      {id:"d1",label:"الخطط السارية والنسخ المرجعية",done:true},
      {id:"d2",label:"الوثائق التي تنتظر اعتمادًا",done:true},
      {id:"d3",label:"اللجان والقرارات المفتوحة",done:true},
      {id:"d4",label:"الطلبات المعلقة لدى الجامعة",done:true},
      {id:"d5",label:"ملخص الجودة والاعتماد والمخاطر",done:true},
      {id:"d6",label:"تحويل صلاحية الدور إلى العميد الجديد",done:false}
    ]}
  ],
  audit: [
    {time:"اليوم 10:18",actor:"قسم الجودة",action:"أعاد مهمة للاستكمال",target:"T-034 · جرد المرافق"},
    {time:"اليوم 09:20",actor:"شؤون الخريجين",action:"أرسل مخرجًا للمراجعة",target:"T-041 · بيانات الخريجين"},
    {time:"أمس 14:05",actor:"الإعلام والتوثيق",action:"أرسل تحديثًا للمراجعة",target:"T-050 · الموقع الإلكتروني"},
    {time:"أمس 11:40",actor:"قسم الجودة",action:"أنشأ طلبًا مركزيًا",target:"UR-019 · سند استخدام المبنى"},
    {time:"30 سبتمبر 16:00",actor:"تقنية المعلومات",action:"اختبار نسخة احتياطية",target:"نجح – نموذج تجريبي"}
  ],
  backups: [
    {type:"قاعدة البيانات",last:"اليوم 02:00",status:"ok",retention:"30 يومًا"},
    {type:"الملفات",last:"أمس 23:00",status:"ok",retention:"8 أسابيع"},
    {type:"نسخة كاملة",last:"الأحد 03:00",status:"ok",retention:"12 أسبوعًا"},
    {type:"اختبار الاستعادة",last:"30 سبتمبر",status:"ok",retention:"سجل دائم"}
  ],
  help: [
    ["ما المطلوب مني؟","افتح «مهامي». سترى فقط ما أُسند إلى دورك الوظيفي."],
    ["لدي ملف ولا أعرف أين أحفظه","استخدم «رفع / تعبئة» واختر «لا أعرف». يصل الملف إلى صندوق فرز الجودة دون أن تنشئ رمزًا بنفسك."],
    ["أُعيد عملي للاستكمال","افتح المهمة؛ ستظهر ملاحظة الجودة. حدّث المرفق ثم أعد الإرسال."],
    ["سأغادر المنصب","افتح «استلام وتسليم منصبي». النظام يجمع البنود المفتوحة تلقائيًا ويطلب منك فقط استكمال ما لا يعرفه."],
    ["نسيت الرمز أو مكان الملف","لا تحتاج حفظ الرموز. ابحث بالعنوان داخل النظام؛ قسم الجودة يدير الترميز والمكان المرجعي."]
  ]
};