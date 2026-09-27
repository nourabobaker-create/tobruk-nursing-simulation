window.ENGLISH2_DATA = {
  course: {
    title: "English II · Clinical English for Nursing",
    subtitle: "Learn the language by thinking like a nurse.",
    titleAr: "اللغة الإنجليزية 2 · الإنجليزية السريرية للتمريض",
    subtitleAr: "تعلّم اللغة من خلال التفكير كممرض/ة.",
    institution: "Faculty of Nursing · Tobruk University",
    institutionAr: "كلية التمريض · جامعة طبرق"
  },
  lessons: [
    {
      id:"wound", number:1, accent:"#16799f", light:"#eaf7fb",
      title:"Wound Assessment", subtitle:"Read the wound · understand the findings · record clearly",
      titleAr:"تقييم الجروح", subtitleAr:"اقرأ الجرح · افهم الموجودات · وثّق بوضوح",
      icon:"🩹",
      outcomes:[
        "Recognize common wound-assessment terminology.",
        "Separate wound-bed, surrounding-skin and exudate findings.",
        "Read a simplified wound assessment chart.",
        "Identify incomplete or contradictory documentation.",
        "Compare findings over time and report meaningful change."
      ],
      sections:[
        {type:"concept",title:"Why precise wound description matters",ar:"لماذا يهم وصف الجرح بدقة؟",
          body:"Words such as “good”, “bad” or “better” are too vague. Useful documentation states what is actually present so another clinician can understand and compare the wound over time.",
          arBody:"كلمات مثل «جيد» أو «سيئ» أو «أفضل» عامة جداً. التوثيق المفيد يصف ما هو موجود فعلياً حتى يستطيع شخص آخر فهم الجرح ومقارنته لاحقاً."},
        {type:"visual",title:"Three areas to observe",ar:"ثلاثة جوانب للملاحظة",visual:"woundThree",
          body:"Organize observations into wound bed, surrounding skin and exudate. This simple structure prevents different findings from being mixed together.",
          arBody:"نظّم الملاحظات إلى قاع الجرح، الجلد المحيط، والإفرازات. هذا يمنع خلط المعلومات."},
        {type:"terms",title:"Core wound terminology",ar:"مصطلحات أساسية",terms:[
          ["necrosis","death of cells or tissue","نخر/موت الأنسجة"],
          ["eschar","thick, dry, dark or black necrotic tissue","نسيج نخري جاف داكن أو أسود"],
          ["slough","dead tissue that may appear yellowish","نسيج ميت قد يبدو أصفر"],
          ["granulation tissue","red tissue associated with healing","نسيج حُبيبي أحمر مرتبط بالالتئام"],
          ["macerated","softened because of excessive moisture","متليّن بسبب الرطوبة الزائدة"],
          ["inflamed","showing inflammation; may be red, warm or swollen","ملتهب؛ قد يكون أحمر أو دافئاً أو متورماً"],
          ["exudate","fluid or discharge from a wound","إفرازات/سائل من الجرح"],
          ["purulent","pus-like discharge","إفراز قيحي"],
          ["debridement","removal of dead tissue","تنضير/إزالة الأنسجة الميتة"]
        ]},
        {type:"table",title:"The TIME framework",ar:"إطار TIME",headers:["Letter","Focus","Main question"],rows:[
          ["T","Tissue","Is the tissue viable or non-viable?"],
          ["I","Infection / inflammation","Is infection or excessive inflammation present?"],
          ["M","Moisture","Is the wound too wet or too dry?"],
          ["E","Edge","Is the wound edge progressing toward healing?"]
        ],arNote:"TIME يساعد على تنظيم التفكير في قاع الجرح: الأنسجة، العدوى/الالتهاب، الرطوبة، وحافة الجرح."},
        {type:"table",title:"Read the wound chart",ar:"اقرأ مخطط تقييم الجرح",headers:["Field","Example entry"],rows:[
          ["Wound site","Right lower leg"],["Wound description","Granulated with small sloughy area"],["Surrounding skin","Mildly inflamed"],["Exudate amount","Moderate"],["Exudate type","Serous"],["Odour","No"],["Review","Reassess tomorrow"]
        ],arNote:"اقرأ النموذج بشكل منظّم: الموقع، قاع الجرح، الجلد المحيط، كمية ونوع الإفراز، الرائحة، ثم المتابعة."},
        {type:"language",title:"Language in clinical use",ar:"اللغة في الاستخدام السريري",body:"Noun → adjective: inflammation → inflamed; necrosis → necrotic; infection → infected; maceration → macerated. The language point matters because the chart describes tissue and skin, not grammar in isolation.",arBody:"الاسم يتحول إلى صفة عند وصف النسيج أو الجلد: inflammation → inflamed وغيرها."},
        {type:"compare",title:"Compare over time",ar:"قارن مع مرور الوقت",leftTitle:"Day 1",rightTitle:"Day 3",pairs:[
          ["Wound bed","Mainly granulated","Granulated + new slough"],["Surrounding skin","Healthy","Red and warm"],["Exudate","Small, serous","Moderate, purulent"],["Odour","Absent","Present"]
        ],arNote:"عند المقارنة اسأل: ما الجديد؟ ما الذي زاد؟ ما الذي تغيّر نوعه؟"},
        {type:"tip",title:"Think before you conclude",ar:"فكّر قبل أن تستنتج",body:"Record what you observe. Do not turn incomplete findings into a diagnosis or invent information that was not assessed.",arBody:"سجّل ما لاحظته فعلياً، ولا تحوّل الملاحظات الناقصة إلى استنتاج مؤكد."}
      ],
      quiz:[
        {q:"Which category does “macerated skin” belong to?",choices:["Wound bed","Surrounding skin","Exudate"],a:1,ex:"Maceration describes the skin around the wound when it has been softened by excess moisture."},
        {q:"Which term describes pus-like wound discharge?",choices:["Serous","Purulent","Granulated"],a:1,ex:"Purulent means pus-like."},
        {q:"A chart says exudate amount = Nil and exudate type = Purulent. What should you do?",choices:["Ignore it","Guess which is right","Recheck the assessment/documentation"],a:2,ex:"The entries contradict each other and should be verified."}
      ],
      spot:{title:"Spot what is wrong",body:"Exudate amount: Nil · Exudate type: Purulent",answer:"These entries contradict each other. Recheck the wound and/or the documentation rather than guessing.",ar:"البيانتان متناقضتان. أعد التحقق من الجرح أو التوثيق بدلاً من التخمين."},
      scenario:{title:"What would you do?",body:"Yesterday the wound had small serous exudate and healthy surrounding skin. Today there is moderate thick yellow discharge and the surrounding skin is red and warm.",choices:["Copy yesterday's entry","Write only “worse”","Document today's actual findings and report the change according to local practice","Wait several days"],a:2,why:"Current findings must be documented accurately and meaningful change communicated.",ar:"وثّق الموجودات الحالية بدقة وأبلغ عن التغيّر وفق الممارسة المحلية."},
      finalCase:"A lower-leg wound was granulated yesterday with healthy surrounding skin and small serous exudate. Today there is a new sloughy area, red warm surrounding skin, moderate purulent exudate and odour. Identify the changes and write a concise current description."
    },
    {
      id:"diabetes", number:2, accent:"#2d7d5f", light:"#edf8f2",
      title:"Diabetes Care", subtitle:"Understand the numbers · recognize the problem · communicate clearly",
      titleAr:"رعاية السكري", subtitleAr:"افهم الأرقام · تعرّف على المشكلة · تواصل بوضوح",
      icon:"🩸",
      outcomes:[
        "Recognize key diabetes terminology.",
        "Explain the basic roles of insulin and glucagon.",
        "Read a simplified diabetic chart and follow a trend.",
        "Separate symptoms, measurements, actions and follow-up.",
        "Communicate lifestyle advice respectfully."
      ],
      sections:[
        {type:"concept",title:"Diabetes is more than one number",ar:"السكري أكثر من رقم واحد",body:"Blood glucose is important, but diabetes follow-up also includes diet, medication, feet, eyes, kidney function, circulation and lifestyle.",arBody:"مستوى السكر مهم، لكن المتابعة تشمل أيضاً الغذاء، الدواء، القدمين، العينين، وظائف الكلى، الدورة الدموية ونمط الحياة."},
        {type:"visual",title:"Insulin and glucagon",ar:"الإنسولين والجلوكاجون",visual:"insulinGlucagon",body:"Insulin lowers blood glucose. Glucagon raises blood glucose. Use the arrows as a quick memory aid.",arBody:"الإنسولين يخفض الجلوكوز في الدم، والجلوكاجون يرفعه."},
        {type:"terms",title:"Core diabetes terminology",ar:"مصطلحات أساسية",terms:[
          ["pancreas","organ involved in digestion and hormone production","البنكرياس"],
          ["insulin","hormone that lowers blood glucose","هرمون يخفض سكر الدم"],
          ["glucagon","hormone that raises blood glucose","هرمون يرفع سكر الدم"],
          ["hypoglycaemia","low blood glucose","انخفاض سكر الدم"],
          ["glycosuria","glucose in the urine","وجود الجلوكوز في البول"],
          ["ketones","products formed when fat is metabolised","كيتونات"],
          ["glucometer","device used to measure blood glucose","جهاز قياس الجلوكوز"]
        ]},
        {type:"flow",title:"Low reading → action → recheck → response",ar:"قراءة منخفضة ← إجراء ← إعادة القياس ← الاستجابة",steps:["Low BSL","Action/treatment","Repeat BSL","Evaluate response"],arNote:"لا تنظر إلى الرقم منفرداً؛ تابع ما حدث بعده."},
        {type:"table",title:"Read a diabetic chart",ar:"اقرأ مخطط السكري",headers:["Time","BSL","Symptoms","Action","Repeat BSL"],rows:[
          ["07:30","5.8","None","—","—"],["11:30","2.4","Shaky / sweaty","Treatment given","4.6"],["16:30","6.2","None","—","—"],["21:30","5.4","None","—","—"]
        ],arNote:"ابحث عن الاتجاه، الأعراض، الإجراء، ونتيجة المتابعة."},
        {type:"cards",title:"Long-term follow-up",ar:"المتابعة طويلة المدى",cards:[
          ["Eye examination","look for diabetes-related eye problems"],["Foot assessment","check skin, sensation and circulation"],["Kidney function","urine/blood tests as ordered"],["Lifestyle","regular meals, activity, weight and smoking status"]
        ],arNote:"إدارة السكري تشمل الوقاية من المضاعفات، وليس قياس السكر فقط."},
        {type:"language",title:"Frequency and comparison",ar:"التكرار والمقارنة",body:"Useful language: regularly, occasionally, before meals, at bedtime, once a year; lower than, higher than, more stable, less stable.",arBody:"كلمات مفيدة: بانتظام، أحياناً، قبل الوجبات، وقت النوم، مرة سنوياً؛ أقل من، أعلى من، أكثر استقراراً."},
        {type:"tip",title:"Sensitive communication",ar:"تواصل داعم",body:"Avoid blame. Replace “You are not following your diet” with language such as “Could we look at your meal pattern together?”",arBody:"تجنّب اللوم، واستخدم لغة تشاركية ومحترمة."}
      ],
      quiz:[
        {q:"What does insulin do to blood glucose?",choices:["Raises it","Lowers it","Has no effect"],a:1,ex:"Insulin lowers blood glucose."},
        {q:"Which item is follow-up after a low BSL treatment?",choices:["Repeat BSL","Patient's favourite food","Room number"],a:0,ex:"A repeat reading shows the response after treatment."},
        {q:"Which sentence is more useful?",choices:["She checks her glucose.","She checks her glucose before meals and at bedtime."],a:1,ex:"The second sentence gives the frequency/timing."}
      ],
      spot:{title:"Spot what is missing",body:"Hypo BSL: 2.3 · Action: treatment given · Patient: feels better · Repeat BSL: blank",answer:"A repeat blood glucose reading is missing. Improvement in symptoms does not replace objective follow-up.",ar:"قراءة إعادة قياس السكر مفقودة. تحسّن الأعراض لا يغني عن المتابعة الموضوعية."},
      scenario:{title:"What would you do?",body:"A patient had BSL 2.1. The chart says “treatment given” but there is no repeat BSL recorded.",choices:["Assume recovery","Ignore it","Check whether follow-up/rechecking was performed and clarify the missing documentation","Write a normal value yourself"],a:2,why:"Missing follow-up should be verified, not assumed.",ar:"تحقق من إجراء المتابعة ووضّح التوثيق الناقص."},
      finalCase:"Mrs Salma has BSL 6.1 in the morning. At midday it is 2.5 with dizziness and shaking; treatment is given. Repeat BSL is 4.6 and symptoms improve. She sometimes skips meals, has not had recent foot checks, and has an eye examination planned. Identify the acute event, follow-up and longer-term issues."
    },
    {
      id:"specimens", number:3, accent:"#6656a6", light:"#f3f0fb",
      title:"Medical Specimens & Renal Care", subtitle:"Collect correctly · clarify accurately · read the report",
      titleAr:"العينات الطبية ورعاية الكلى", subtitleAr:"اجمع بشكل صحيح · استوضح بدقة · اقرأ التقرير",
      icon:"🧪",
      outcomes:[
        "Recognize common pathology and renal terminology.",
        "Understand the purpose and sequence of an MSU specimen.",
        "Use clarification and checking-understanding strategies.",
        "Organize a telephone message about patient care.",
        "Read a simplified pathology report and identify key information."
      ],
      sections:[
        {type:"concept",title:"From specimen to decision",ar:"من العينة إلى القرار",body:"A specimen is only useful if the correct sample is collected, labelled, sent, analysed and interpreted in context.",arBody:"العينة تكون مفيدة عندما تُجمع بشكل صحيح، وتُسمّى، وتُرسل، وتُحلّل، ثم تُفسّر ضمن سياق المريض."},
        {type:"flow",title:"Midstream urine specimen (MSU)",ar:"عينة البول من منتصف المجرى",steps:["Wash hands","Clean around urethra front to back","Begin passing urine","Collect middle part of stream","Avoid touching inside of container","Close lid securely"],arNote:"الفكرة الأساسية هي تقليل التلوث والحصول على عينة مناسبة للتحليل."},
        {type:"language",title:"Clarification protects accuracy",ar:"الاستيضاح يحمي الدقة",body:"Useful strategies: repeat information back, paraphrase, use questioning intonation, and ask the speaker to clarify. Checking understanding can include asking the patient to repeat steps or demonstrate what they will do.",arBody:"يمكن الاستيضاح بإعادة المعلومة، إعادة صياغتها، طرح سؤال، أو طلب التوضيح."},
        {type:"terms",title:"Renal and specimen terminology",ar:"مصطلحات الكلى والعينات",terms:[
          ["urinalysis","analysis of urine using physical or chemical tests","تحليل البول"],
          ["proteinuria","protein in the urine","بروتين في البول"],
          ["haematuria","blood in the urine","دم في البول"],
          ["oliguria","low urine output","قلة البول"],
          ["anuria","no urine output","انقطاع البول"],
          ["oedema","excess fluid in tissues","وذمة"],
          ["nephrons","filtering units of the kidneys","النيفرونات"],
          ["specimen","sample, usually urine or blood","عينة"]
        ]},
        {type:"visual",title:"How the urinary system connects",ar:"كيف يرتبط الجهاز البولي",visual:"urinarySystem",body:"Kidneys filter blood and form urine; ureters carry urine to the bladder; the urethra carries urine outside the body.",arBody:"الكليتان ترشحان الدم وتكوّنان البول، الحالبان ينقلانه للمثانة، والإحليل يخرجه خارج الجسم."},
        {type:"table",title:"Read a pathology report",ar:"اقرأ تقرير المختبر",headers:["Field","Example"],rows:[
          ["Specimen","MSU"],["Microscopy","Leucocytes / erythrocytes / bacteria"],["Culture","Organism grown and identified"],["Sensitivity","Which antimicrobials the organism is sensitive to"],["Comment","Possible UTI"]
        ],arNote:"لا تقرأ كلمة واحدة فقط؛ اجمع نوع العينة، المجهر، الزراعة، الحساسية والتعليق."},
        {type:"cards",title:"Telephone message essentials",ar:"أساسيات الرسالة الهاتفية",cards:[
          ["Who?","caller identity and contact"],["Why?","purpose of the call"],["What?","exact clinical message/instructions"],["Confirm","read back difficult details"],["Pass on","document and deliver the message"]
        ],arNote:"الرسالة الهاتفية الجيدة دقيقة وقابلة للتتبع."},
        {type:"tip",title:"Catheter language",ar:"لغة القسطرة",body:"Key concepts in the source: urinary retention, indwelling catheter, drainage bag, aseptic technique and contamination. Rephrase unfamiliar words in simple language without changing the meaning.",arBody:"استخدم لغة بسيطة لشرح احتباس البول، القسطرة، كيس التصريف، التقنية المعقمة والتلوث."}
      ],
      quiz:[
        {q:"Why collect the middle part of the urine stream for an MSU?",choices:["To reduce contamination","To make the sample darker","To fill the container faster"],a:0,ex:"The midstream technique aims to reduce contamination."},
        {q:"What does haematuria mean?",choices:["Protein in urine","Blood in urine","No urine output"],a:1,ex:"Haematuria means blood in the urine."},
        {q:"Which telephone habit reduces misunderstanding?",choices:["Guess unusual names","Read the message back","Skip the caller's identity"],a:1,ex:"Reading back confirms important details."}
      ],
      spot:{title:"Spot the documentation problem",body:"Specimen label: Mrs Faisal · Request form: Mrs Fatima · Same ward and same time",answer:"Patient identifiers do not match. Stop and clarify before the specimen is sent or processed.",ar:"هوية المريض على العينة لا تطابق نموذج الطلب. يجب التوقف والتحقق."},
      scenario:{title:"What would you do?",body:"A caller gives a difficult patient surname quickly and starts giving instructions before you can write them down.",choices:["Pretend you understood","Interrupt politely, ask for spelling and slow repetition, then read back the message","Write what you think you heard","Pass the phone to anyone"],a:1,why:"Clarification and read-back protect accuracy.",ar:"اطلب التهجئة والتكرار ببطء ثم أعد قراءة الرسالة للتأكيد."},
      finalCase:"A patient has dysuria, frequency and urgency. An MSU is collected and sent to pathology. The report shows elevated leucocytes, bacteria and a named organism with sensitivity results. Organize what belongs under symptoms, specimen, laboratory findings and follow-up communication."
    },
    {
      id:"medications", number:4, accent:"#b64949", light:"#fff1f1",
      title:"Medications", subtitle:"Check the order · cross-check the details · communicate clearly",
      titleAr:"الأدوية", subtitleAr:"تحقق من الأمر · طابق التفاصيل · تواصل بوضوح",
      icon:"💊",
      outcomes:[
        "Recognize medication and prescription terminology.",
        "Organize a medication check and the five rights.",
        "Read common Prescription Chart abbreviations.",
        "Identify missing or mismatched medication information.",
        "Recognize interaction warnings and communicate concerns clearly."
      ],
      sections:[
        {type:"concept",title:"Medication safety is an information problem",ar:"سلامة الدواء تعتمد على دقة المعلومات",body:"Medication administration requires the written order, medication label, patient identity, dose, route, time and any required additional information to agree.",arBody:"يجب أن تتطابق وصفة الدواء، الملصق، هوية المريض، الجرعة، الطريق، الوقت وأي فحوص إضافية مطلوبة."},
        {type:"flow",title:"Controlled-drug check",ar:"فحص الدواء الخاضع للرقابة",steps:["Check written order and last dose/time","Retrieve ampoule from locked cupboard","Check count, label and expiry","Draw up correct amount","Second nurse checks syringe","Administer and complete records"],arNote:"الهدف هو التحقق المنظّم وعدم الاعتماد على الذاكرة أو التخمين."},
        {type:"visual",title:"The five rights",ar:"الحقوق الخمسة",visual:"fiveRights",body:"Right drug · right patient · right dose · right route · right time.",arBody:"الدواء الصحيح · المريض الصحيح · الجرعة الصحيحة · الطريق الصحيح · الوقت الصحيح."},
        {type:"terms",title:"Prescription abbreviations",ar:"اختصارات الوصفة",terms:[
          ["tab.","tablet","قرص"],["cap.","capsule","كبسولة"],["mg","milligram","ملغ"],["mcg","microgram","ميكروغرام"],["ml","millilitre","مل"],["PO","by mouth","عن طريق الفم"],["SC","subcutaneous","تحت الجلد"],["IM","intramuscular","داخل العضلة"],["mane","in the morning","صباحاً"],["nocte","at night","ليلاً"]
        ]},
        {type:"table",title:"Read the prescription",ar:"اقرأ الوصفة",headers:["Patient","Drug","Dose","Route","Time","Status"],rows:[
          ["Mrs Egerts","Warfarin","5 mg","PO","18:00","Check required"],["Mr Song","Pethidine","Ordered dose","Injection","As ordered","Controlled-drug check"],["Mr Albiston","Atorvastatin","As ordered","PO","Nocte","Review interactions"]
        ],arNote:"اقرأ بشكل منهجي: المريض ← الدواء ← الجرعة ← الطريق ← الوقت ← الفحوص/الملاحظات."},
        {type:"visual",title:"Drug-interaction warning",ar:"تحذير التداخلات الدوائية",visual:"interactionWeb",body:"The source atorvastatin example highlights interaction warnings involving other medicines, alcohol and grapefruit juice. The learning goal is to recognize warning language and know when to verify current clinical information.",arBody:"الهدف هو التعرف على لغة التحذير ومعرفة متى يلزم التحقق من المعلومات السريرية الحالية."},
        {type:"language",title:"Language of caution",ar:"لغة التحذير",body:"Useful forms include should not, must not, may increase the risk of, I'm concerned about, and avoid. Use them to communicate a clear concern without inventing facts.",arBody:"عبارات مفيدة: should not، must not، may increase the risk، I'm concerned about، avoid."},
        {type:"tip",title:"Teamwork language",ar:"لغة العمل الجماعي",body:"Ask for a medication check politely and specifically: “Would you mind checking this medication with me, please?” Recognize when you are too busy to help and suggest a safe alternative.",arBody:"اطلب المساعدة بوضوح واحترام، واعترف عندما لا تستطيع المساعدة فوراً واقترح بديلاً آمناً."}
      ],
      quiz:[
        {q:"Which is one of the five rights?",choices:["Right room","Right route","Right colour"],a:1,ex:"Right route is one of the five rights."},
        {q:"What does PO mean?",choices:["By mouth","Into a muscle","At night"],a:0,ex:"PO means by mouth."},
        {q:"What should you do when a required result/check is missing?",choices:["Assume it is fine","Verify it before proceeding according to policy","Enter a value yourself"],a:1,ex:"Missing required information must be verified, not assumed."}
      ],
      spot:{title:"Spot the mismatch",body:"Prescription: Warfarin 5 mg PO at 18:00. Available package: Warfarin 2 mg tablets.",answer:"The ordered dose and available strength must be reconciled correctly. Do not guess or invent a dose if information is unclear.",ar:"يجب مطابقة الجرعة المطلوبة مع تركيز الدواء المتاح بشكل صحيح، دون تخمين."},
      scenario:{title:"What would you do?",body:"Warfarin is due. Patient, drug, dose, route and time are present, but the required INR result from the source case is not visible.",choices:["Give it anyway","Guess the INR was checked","Stop and verify the required result/check according to local policy","Write an INR value yourself"],a:2,why:"Required information must be confirmed.",ar:"تحقق من النتيجة/الفحص المطلوب قبل المتابعة."},
      finalCase:"Mrs Noor Ahmed has warfarin 5 mg PO due at 18:00. Organize the five rights, identify the additional check required in this source scenario, and write one concise sentence to communicate missing information."
    },
    {
      id:"iv", number:5, accent:"#2389a8", light:"#edf8fb",
      title:"Intravenous Infusions", subtitle:"Read the order · inspect the site · pass the message accurately",
      titleAr:"المحاليل الوريدية", subtitleAr:"اقرأ الأمر · افحص الموقع · انقل الرسالة بدقة",
      icon:"💧",
      outcomes:[
        "Recognize common IV terminology and abbreviations.",
        "Pass on IV instructions accurately.",
        "Recognize important cannula-site findings.",
        "Take a clear telephone message about patient care.",
        "Read a simplified IV Prescription Chart and Fluid Balance Chart."
      ],
      sections:[
        {type:"concept",title:"IV infusions are treated like medications",ar:"المحاليل الوريدية تُعامل كالأدوية",body:"The source unit emphasizes that IV fluids must be prescribed and checked. Orders include fluid type, additives, route, volume, time to infuse and administration record.",arBody:"تحتاج المحاليل الوريدية إلى وصفة وفحص، وتشمل المعلومات النوع، الإضافات، الطريق، الحجم، زمن التسريب وسجل الإعطاء."},
        {type:"terms",title:"IV terminology",ar:"مصطلحات وريدية",terms:[
          ["IV fluids","intravenous fluids","سوائل وريدية"],["IVC","IV cannula","قنية وريدية"],["N/S","Normal Saline","محلول ملحي طبيعي"],["K","potassium","بوتاسيوم"],["KCl","potassium chloride","كلوريد البوتاسيوم"],["mmols","millimoles","ملليمول"],["IVABs","IV antibiotics","مضادات حيوية وريدية"],["KVO","keep vein open","إبقاء الوريد مفتوحاً"]
        ]},
        {type:"flow",title:"Passing on an IV instruction",ar:"نقل تعليمات وريدية",steps:["Identify patient","State exact instruction","Include fluid/additive/volume","Include time/rate","Confirm what must be done","Document/pass on"],arNote:"انقل التفاصيل كما هي، ولا تختصر بطريقة تغيّر المعنى."},
        {type:"visual",title:"Assess the cannula site",ar:"قيّم موقع القنية",visual:"cannulaSite",body:"The source terminology includes erythema, phlebitis, infiltration, positional line, aseptic technique and resiting a cannula.",arBody:"مصطلحات مهمة: احمرار، التهاب الوريد، تسرب للأنسجة، خط متأثر بالوضعية، تقنية معقمة، وإعادة تركيب القنية."},
        {type:"cards",title:"Telephone-message essentials",ar:"أساسيات الرسالة الهاتفية",cards:[
          ["Caller","name and role"],["Patient","correct identity"],["Reason","why the caller is calling"],["Instructions","exact details"],["Contact","number/bleep if needed"],["Read back","confirm difficult details"]
        ],arNote:"اكتب الرسالة ثم أعد قراءتها للتأكيد."},
        {type:"table",title:"Read the IV order",ar:"اقرأ أمر التسريب الوريدي",headers:["Fluid","Route","Volume","Time to infuse","What else to check"],rows:[
          ["Normal Saline","IV","1000 ml","8 hours","patient/order details"],["5% Dextrose","IV","1000 ml","10 hours","bag label + expiry + prescribed order"]
        ],arNote:"لا تعتمد على اسم الكيس وحده؛ طابق الكيس مع الأمر."},
        {type:"visual",title:"Fluid balance",ar:"توازن السوائل",visual:"fluidBalance",body:"Accurate intake and output records help assess fluid status. The source highlights common errors: missing entries, guessed volumes and unmeasured urine output.",arBody:"دقة تسجيل الداخل والخارج مهمة لتقييم حالة السوائل؛ الأخطاء تشمل القيم المفقودة أو التقديرية أو غير المقاسة."},
        {type:"language",title:"Passing on instructions",ar:"لغة نقل التعليمات",body:"Useful forms: “He asked if you could…”, “He wants it to run over…”, “Leave the cannula…”, “Take down the IV when it’s finished.”",arBody:"عبارات مفيدة لنقل التعليمات بدقة بين الزملاء."},
        {type:"tip",title:"Measure, don't guess",ar:"قِس ولا تخمّن",body:"Fluid-balance information is only useful when amounts are measured and recorded consistently.",arBody:"سجل توازن السوائل يكون مفيداً عندما تكون الكميات مقاسة ومسجلة بدقة."}
      ],
      quiz:[
        {q:"What does N/S mean?",choices:["Normal Saline","No specimen","Night shift"],a:0,ex:"N/S means Normal Saline."},
        {q:"Which finding can indicate a problem at an IV site?",choices:["Erythema","Correct label","Clear documentation"],a:0,ex:"Erythema is redness and may signal a site problem."},
        {q:"Which telephone habit is safest?",choices:["Read the message back","Guess difficult names","Leave out the caller's identity"],a:0,ex:"Read-back confirms details."}
      ],
      spot:{title:"Spot what is wrong",body:"IV order: 1000 ml 5% Dextrose over 10 hours. Bag at bedside: Normal Saline. Patient name matches.",answer:"The fluid type does not match the order. Stop and recheck before starting the infusion.",ar:"نوع السائل الموجود لا يطابق الأمر الوريدي. توقف وتحقق قبل بدء التسريب."},
      scenario:{title:"What would you do?",body:"A telephone caller gives a cannula-resite message quickly. You are unsure of the surname and cannot write fast enough.",choices:["Guess the name","Ask the caller to slow down, spell the name, then read the message back","Write only the room number","Wait until later"],a:1,why:"Accurate read-back prevents communication errors.",ar:"اطلب من المتصل الإبطاء وتهجئة الاسم ثم أعد قراءة الرسالة."},
      finalCase:"An older patient has an IV prescription for 1000 ml Normal Saline over 8 hours. The cannula site is red and tender, and the Fluid Balance Chart has several missing intake entries. Identify the IV-site concern, the documentation problem, and the information that must be clarified before continuing."
    }
  ]
};