/* Recovery, burns and voluntary blood donation; primary sources checked 2026-10-15. */
(()=>{
'use strict';
const C=window.COMMUNITY,R=window.COMMUNITY_V2;
if(!C||!R)return;
Object.assign(R.sources,{
 recoverySurgeryNHS:['NHS','بعد العملية: الحركة والأدوية وخطة الخروج','https://www.nhs.uk/tests-and-treatments/having-surgery/afterwards/'],
 recoverySurgeryWSH:['West Suffolk NHS','التعافي بعد العملية: الحركة والتغذية والوقاية من الجلطات','https://www.wsh.nhs.uk/patients/preparing-for-surgery/after-surgery'],
 recoveryWoundNHS:['North Tees and Hartlepool NHS','عدوى جرح العملية: الوقاية وعلامات المراجعة','https://www.nth.nhs.uk/resources/surgical-site-operation-wound-infection/'],
 recoveryDVTNHS:['NHS','جلطة الأوردة العميقة وعلامات الانصمام الرئوي','https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/'],
 recoveryStrokeNHS:['NHS','التعافي بعد السكتة وخطة التأهيل المنزلية','https://www.nhs.uk/conditions/stroke/recovery/'],
 recoveryStrokeTreatment:['NHS','علاج السكتة: الخطة تختلف باختلاف النوع والسبب','https://www.nhs.uk/conditions/stroke/treatment/'],
 recoverySwallowNHS:['Newcastle Hospitals NHS','صعوبات البلع بعد السكتة: الطعام والشراب والأدوية','https://www.newcastle-hospitals.nhs.uk/services/stroke-unit/life-after-stroke/eating-and-drinking-difficulties-dysphagia/'],
 recoveryPlateletNHS:['Norfolk and Norwich NHS','مضادات الصفائح بعد السكتة: الاستمرار والأعراض الجانبية','https://www.nnuh.nhs.uk/publication/download/antiplatelets-v10/'],
 recoveryHeartNHS:['NHS','النوبة القلبية: الأعراض والوقاية والتعافي','https://www.nhs.uk/conditions/heart-attack/'],
 recoveryCardiacRehab:['NHS','التأهيل القلبي الفردي والعودة للنشاط','https://www.nhs.uk/conditions/coronary-heart-disease/recovery/'],
 recoveryStentNHS:['NHS','بعد الدعامة: الالتزام بمضادات الصفائح والمتابعة','https://www.nhs.uk/tests-and-treatments/coronary-angioplasty/recovery/'],
 recoveryPENHS:['NHS','الانصمام الرئوي: أعراضه وعلاجه','https://www.nhs.uk/conditions/pulmonary-embolism/'],
 recoveryAnticoagSafety:['NHS','مضادات التخثر: النزف وإصابات الرأس','https://www.nhs.uk/medicines/anticoagulants/side-effects/'],
 recoveryAnticoagPlan:['NHS','مضادات التخثر: الأدوية الأخرى والإجراءات والحمل','https://www.nhs.uk/medicines/anticoagulants/considerations/'],
 recoveryAnticoagHome:['North Tees and Hartlepool NHS','العناية مع مميعات الدم ومتى تطلب المساعدة','https://www.nth.nhs.uk/resources/anticoagulants-blood-thinners/'],
 recoveryArmNHS:['NHS','الكسر: التثبيت والمتابعة والتعافي','https://www.nhs.uk/conditions/broken-arm-or-wrist/'],
 recoveryLegNHS:['NHS','العناية بكسر الساق والجبس ومتى تطلب المساعدة','https://www.nhs.uk/conditions/broken-leg/'],
 recoveryCastNHS:['South Tees NHS','الجبس: تغير لون الأصابع والخدر والألم المستمر','https://www.southtees.nhs.uk/resources/advice-for-patients-in-a-forearm-cast/'],
 recoverySprainNHS:['NHS','الالتواء والشد العضلي: الرعاية والعودة للحركة','https://www.nhs.uk/conditions/sprains-and-strains/'],
 recoveryAnkleNHS:['North Bristol NHS','إصابات الكاحل: التدرج في النشاط والتأهيل','https://www.nbt.nhs.uk/our-services/a-z-services/emergency-department/ed-miu-patient-information/ankle-injuries'],
 recoveryHeadNHS:['NHS','إصابة الرأس: المراقبة المنزلية وعلامات الخطر','https://www.nhs.uk/conditions/head-injury-and-concussion/'],
 recoveryBurnWHO:['منظمة الصحة العالمية','الحروق: الوقاية والإسعاف الآمن','https://www.who.int/news-room/fact-sheets/detail/burns'],
 recoveryBurnNHS:['NHS','الحروق الحرارية: تبريد 20 دقيقة ومتى تحتاج المستشفى','https://www.nhs.uk/conditions/burns-and-scalds/'],
 recoveryChemicalNHS:['NHS','حروق المواد الكيميائية: حماية المسعف والغسل العاجل','https://www.nhs.uk/conditions/acid-and-chemical-burns/'],
 recoveryBurnReferral:['الجمعية الأمريكية للحروق','الحروق التي تستدعي تقييمًا متخصصًا','https://www.ameriburn.org/burn-care-team/resources/guidelines-for-burn-patient-referral'],
 recoveryBurnAfter:['North Bristol NHS','بعد الحرق: المتابعة والتأهيل وحماية الجلد الملتئم','https://www.nbt.nhs.uk/our-services/a-z-services/burns/burns-patient-information/after-a-burn-injury-next-step'],
 recoveryBurnSkin:['Chelsea and Westminster NHS','العناية بالجلد الجديد بعد التئام الحرق','https://www.chelwest.nhs.uk/your-visit/patient-leaflets/burns/caring-for-your-new-skin'],
 recoveryScarNHS:['NHS','الندبات: العناية ومتى تطلب التقييم','https://www.nhs.uk/conditions/scars/'],
 recoveryBloodWHO:['منظمة الصحة العالمية','لماذا نتبرع بالدم؟ سلامة المتبرع والمتلقي','https://www.who.int/news-room/questions-and-answers/item/blood-products-why-should-i-donate-blood'],
 recoveryBloodSupplyWHO:['منظمة الصحة العالمية','سلامة الدم وتوافره والتبرع الطوعي المنتظم','https://www.who.int/news-room/fact-sheets/detail/blood-safety-and-availability'],
 recoveryDonorBefore:['NHS Blood and Transplant','الاستعداد للتبرع: النوم والوجبة والسوائل','https://www.blood.co.uk/the-donation-process/preparing-to-donate/'],
 recoveryDonorAfter:['NHS Blood and Transplant','بعد التبرع: الراحة والدوخة والنزف وإبلاغ المركز','https://www.blood.co.uk/the-donation-process/after-your-donation/']
});
if(!C.categories.some(x=>x[0]==='recovery'))C.categories.push(['recovery','التعافي والرعاية المنزلية','بعد العمليات والسكتة والإصابات والكسور','♡']);
const topics=[
 {
  id:'after-surgery',cat:'recovery',title:'بعد العملية: عودة آمنة إلى البيت',audience:'المتعافون من العمليات ومن يساعدونهم',
  hook:'غادر بخطة مكتوبة: كيف تعتني بالجرح؟ ماذا تأخذ؟ متى تتحرك؟ وبمن تتصل؟',
  about:'تختلف الرعاية حسب العملية والتخدير والأمراض المصاحبة. تعليمات فريقك هي الأساس؛ لا تنقل برنامج قريب إلى حالتك، ولا تتوقع موعدًا واحدًا للتعافي عند الجميع.',
  symptoms:['تعب وألم قد يحدثان بعد العملية؛ اسأل عن المتوقع وما يجب أن يتحسن. الزيادة المفاجئة أو التدهور تحتاج مراجعة.','ألم الجرح المتزايد، السخونة أو التورم حوله، القيح أو الحمى قد تدل على عدوى.'],
  actions:['خذ ورقة الخروج وقائمة الأدوية ومواعيد المراجعة ورقم التواصل، واطلب من المرافق إعادة التعليمات بكلماته.','اغسل اليدين قبل العناية بالجرح. اتبع خطة الضماد والاستحمام، ولا تعبث بالغرز أو تضع خلطات داخل الجرح.','تحرك بالتدرج ضمن المسموح، واستعمل وسيلة المشي الموصوفة. وزع الحركة والراحة بدل البقاء في الفراش طوال اليوم.','التزم بخطة الطعام والسوائل والألم. لا توقف مضاد التخثر أو تغير الجرعات من نفسك؛ اسأل عن الجرعة المنسية.'],
  prevention:['هيئ ممرًا خاليًا من العوائق ومساعدة للمهام الصعبة، خصوصًا بعد التخدير أو عند خطر السقوط.','الوقاية من الجلطات قد تشمل حركة وأدوية أو جوارب موصوفة؛ تختلف الحاجة والمدة باختلاف العملية.'],
  treatment:'قد يحتاج الجرح المصاب بعدوى فحصًا أو تنظيفًا أو علاجًا يحدده الفريق. الألم الذي يمنع الحركة رغم الخطة يستحق مراجعة؛ لا تضاعف المسكن أو تضف مضادًا حيويًا قديمًا.',
  avoid:'لا ترفع أثقالًا أو تقُد أو تستأنف عملًا مجهدًا قبل معرفة حدودك. لا تفك غرزًا أو مصرفًا أو توقف دواءً لمجرد أنك تحسنت.',
  warning:'اطلب الطوارئ لضيق نفس مفاجئ أو ألم صدر أو إغماء أو نزف شديد. ألم وتورم جديد بساق واحدة يحتاج تقييمًا عاجلًا؛ لا تدلكها. تواصل سريعًا مع الفريق عند قيح أو حمى أو انفتاح الجرح أو ألم يتزايد.',
  art:'recovery-home',scene:'أراد قريب إيقاف إبر الوقاية حين بدأ المريض يمشي. رجعا إلى ورقة الخروج واتصلا بالفريق لتأكيد المدة، ثم واصلا الخطة الموصوفة.',
  question:['تورمت ساق واحدة وأصبحت مؤلمة بعد عملية. ماذا تفعل؟',['أدلكها بقوة','أطلب تقييمًا عاجلًا، والطوارئ إن ظهر ضيق نفس أو ألم صدر','أنتظر موعد الشهر القادم'],1],
  sources:['recoverySurgeryNHS','recoverySurgeryWSH','recoveryWoundNHS','recoveryDVTNHS'],tags:['home','family','older'],related:['pressure-care','medicine-list','falls','injury-recovery'],
  sectionSources:{about:['recoverySurgeryNHS'],symptoms:['recoveryWoundNHS','recoverySurgeryNHS'],actions:['recoverySurgeryWSH','recoveryWoundNHS'],prevention:['recoverySurgeryNHS','recoverySurgeryWSH'],treatment:['recoveryWoundNHS','recoverySurgeryNHS'],avoid:['recoverySurgeryWSH'],warning:['recoveryDVTNHS','recoveryWoundNHS']},
  learningSections:[
   {title:'قبل مغادرة المستشفى',bullets:['متى أغير الضماد وأستحم؟ وماذا أفعل إذا تبلل أو خرج سائل؟','أي الأدوية أواصل؟ وما مدتها والجرعة المنسية؟','ما مقدار الحركة وحمل الأثقال المسموح؟ ومتى أراجع؟'],sources:['recoverySurgeryNHS']},
   {title:'المرافق يساعد على الاستقلال',body:'رتب المساعدة والحركة الآمنة مع الفريق. شجع المريض على المهام المسموحة دون إجباره على تجاوز حدوده أو إبقائه بلا حركة خوفًا عليه.',sources:['recoverySurgeryWSH']}
  ]
 },
 {
  id:'after-stroke',cat:'recovery',title:'بعد السكتة الدماغية: التأهيل يبدأ بخطة',audience:'المتعافون من السكتة وأسرهم',
  hook:'خطوات صغيرة متكررة، وبلع آمن، ودواء منتظم؛ لا وعد بمدة واحدة ولا تدريب بالقوة.',
  about:'قد تؤثر السكتة في الحركة والكلام والبلع والتركيز والمزاج. تختلف القدرة وسرعة التحسن؛ يضع فريق التأهيل أهدافًا تناسب الشخص ويعلم الأسرة طريقة المساعدة.',
  symptoms:['قد يستمر ضعف أو تعب أو صعوبة كلام بعد السكتة. سجل التغير عن الحالة المعتادة.','سعال أثناء الأكل أو صوت مبلل بعد الشرب أو بقايا طعام بالفم قد تشير إلى صعوبة بلع؛ وقد يحدث دخول الطعام للمجرى التنفسي دون سعال واضح.'],
  actions:['احصل على خطة واضحة للعلاج الطبيعي والكلام والبلع، وكرر الأنشطة المسموحة مع فترات راحة.','اتبع قوام الطعام والشراب والوضعية المحددة بعد تقييم البلع. لا تختبر البلع منزليًا بالماء ولا تطعم من لم يُقيّم عند سكتة حديثة.','استمر بأدوية الوقاية الموصوفة ومتابعة الضغط والسكر؛ لا توقف مضاد الصفائح أو مضاد التخثر لأن الأعراض تحسنت.','أزل العوائق واطلب تدريبًا عمليًا على الانتقال من السرير والكرسي. امنح الشخص وقتًا للكلام واتخاذ القرار.'],
  prevention:['تابع الجلد عند قلة الحركة وخطة تخفيف الضغط، واطلب دعمًا للغذاء والبلع وصعوبات المعيشة.','ناقش الحزن أو القلق أو الإرهاق المستمر ودعم المرافق؛ التأهيل يشمل الصحة النفسية أيضًا.'],
  treatment:'يجمع التأهيل تخصصات بحسب الحاجة. تعتمد الأدوية على نوع السكتة وسببها، ولا تؤخذ وصفة شخص آخر. اسأل الصيدلي عن بدائل الدواء عند صعوبة البلع؛ ليست كل الأقراص قابلة للسحق.',
  avoid:'لا تسحب الشخص من ذراعه الضعيفة ولا تجبر المفصل على تمرين لم يشرحه المختص. لا تضف الأسبرين أو تغير مميع الدم من نفسك.',
  warning:'ضعف أو اعوجاج وجه أو اضطراب كلام أو رؤية أو توازن مفاجئ جديد: اطلب الإسعاف فورًا حتى لو اختفى، وسجل آخر وقت كان طبيعيًا، ولا تعطِ طعامًا أو شرابًا. الاختناق مع صعوبة تنفس طارئ؛ سعال متكرر مع الوجبات أو حمى أو ضيق نفس يحتاج مراجعة سريعة.',
  art:'stroke-rehab',scene:'سعل الأب مع الماء بعد خروجه من المستشفى. لم تخفف الأسرة الطعام عشوائيًا؛ اتصلت بفريق البلع لتراجع القوام والطريقة المسموحين.',
  question:['هل نوقف دواء الوقاية بعد تحسن الحركة؟',['نعم بعد أول تحسن','لا؛ يراجعه الطبيب وفق السبب والخطة','نستبدله بأسبرين من تلقاء أنفسنا'],1],
  sources:['recoveryStrokeNHS','recoveryStrokeTreatment','recoverySwallowNHS','recoveryPlateletNHS'],tags:['home','family','older'],related:['stroke','pressure-care','blood-pressure','medicine-list'],
  sectionSources:{about:['recoveryStrokeNHS'],symptoms:['recoverySwallowNHS','recoveryStrokeNHS'],actions:['recoveryStrokeNHS','recoverySwallowNHS','recoveryPlateletNHS'],prevention:['recoveryStrokeNHS'],treatment:['recoveryStrokeTreatment','recoverySwallowNHS'],avoid:['recoveryStrokeNHS','recoveryPlateletNHS'],warning:['stroke','recoverySwallowNHS']},
  learningSections:[
   {title:'خطة بلع، لا تجربة ماء',body:'تغيير قوام السوائل أو الطعام يحتاج توجيه مختص البلع. إن لم يسمح الفريق بالأكل بالفم، اتبع طريق التغذية المحدد؛ لا تعتبر المهروس آمنًا تلقائيًا ولا تسحق الدواء دون سؤال.',sources:['recoverySwallowNHS']},
   {title:'هدف قابل للتحقق',body:'اتفقوا مع المعالج على مهمة مناسبة مثل انتقال آمن أو نشاط يومي محدد. سجلوا التقدم والصعوبات للمراجعة، دون مقارنة المريض بغيره أو ضمان تعافٍ في أسابيع معينة.',sources:['recoveryStrokeNHS']}
  ]
 },
 {
  id:'after-heart-attack',cat:'recovery',title:'بعد الجلطة القلبية: تأهيل ودواء وخطة حياة',audience:'المتعافون من النوبة القلبية وأسرهم',
  hook:'التعافي لا ينتهي بالخروج أو تركيب الدعامة؛ التزم بالأدوية واطلب برنامج تأهيل يناسبك.',
  about:'الجلطة القلبية تختلف عن السكتة الدماغية وعن جلطة الساق. بعد علاجها تحتاج متابعة لحماية القلب واستعادة النشاط، مع خطة تناسب الضرر والعلاج والحالة العامة.',
  symptoms:['قد يحدث تعب أو قلق في فترة التعافي. ناقش ما يستمر أو يعطل حياتك بدل إيقاف النشاط أو الدواء وحدك.','عودة ألم أو ضغط بالصدر أو ضيق نفس جديد لا تُفسر تلقائيًا بأنها من القلق أو إجراء القسطرة.'],
  actions:['احفظ قائمة الأدوية وهدف كل دواء وموعده، خصوصًا مضادات الصفائح بعد الدعامة. لا توقفها حتى لإجراء أسنان قبل التنسيق مع طبيب القلب.','اطلب الإحالة للتأهيل القلبي أو خطة منزلية بإشراف الفريق حيث تتاح؛ ابدأ النشاط المسموح تدريجيًا مع راحة.','تابع الضغط والسكر والدهون، واطلب دعمًا للإقلاع عن التدخين. اختر غذاءً متوازنًا وقلل الملح بحسب الخطة.','اسأل عن الرجوع للعمل والقيادة والعلاقة الزوجية وحمل الأثقال؛ لا تعتمد توقيت شخص آخر أو تعليمات قيادة خاصة ببلد آخر.'],
  prevention:['احضر المواعيد ولا تجعل تحسن الشعور سببًا لوقف الأدوية. تحدث عن صعوبات التكلفة أو النسيان لتبسيط الخطة الممكنة.','ناقش القلق أو انخفاض المزاج، واطلب من الأسرة دعم الحركة المسموحة دون إجبار أو حماية تعزل المريض.'],
  treatment:'قد تشمل الوقاية مضادات الصفائح وأدوية للدهون والضغط وغيرها بحسب الحالة. خطة التأهيل تجمع نشاطًا ملائمًا وتثقيفًا ودعمًا نفسيًا؛ الدعامة لا تلغي الحاجة لهذه الرعاية.',
  avoid:'لا تضاعف الجرعات أو تستبدل دواءً بعشبة، ولا تبدأ تمرينًا شديدًا لتختبر قلبك. لا توقف مضاد الصفائح من نفسك بسبب كدمة؛ اطلب إرشادًا عند النزف.',
  warning:'اطلب الإسعاف فورًا لعودة ضغط أو ألم بالصدر، خصوصًا مع امتداده للذراع أو الفك أو تعرق أو غثيان، ولضيق نفس شديد أو إغماء؛ لا تقد بنفسك. اتبع خطة الطوارئ والدواء الإسعافي الموصوف دون تأخير الاتصال. نزف شديد أو مستمر يستدعي مساعدة عاجلة.',
  art:'recovery-home',scene:'أراد شخص وقف مضاد الصفائح بعد الدعامة لأنه لم يعد يشعر بألم. عرف من فريق القلب أن دوره وقائي، فرتب مواعيد الدواء وسأل عن مدة كل علاج.',
  question:['بعد الدعامة أشعر أنني بخير. هل أوقف مضاد الصفائح؟',['لا؛ ألتزم وأراجع طبيب القلب قبل أي تغيير','نعم لأن الدعامة أنهت المرض','أوقفه يومًا وأتناوله يومًا'],0],
  sources:['recoveryHeartNHS','recoveryCardiacRehab','recoveryStentNHS','recoveryPlateletNHS'],tags:['home','family','older'],related:['blood-pressure','diabetes','medicine-list','after-surgery'],
  sectionSources:{about:['recoveryHeartNHS'],symptoms:['recoveryHeartNHS','recoveryCardiacRehab'],actions:['recoveryStentNHS','recoveryCardiacRehab','recoveryHeartNHS'],prevention:['recoveryCardiacRehab','recoveryStentNHS'],treatment:['recoveryHeartNHS','recoveryCardiacRehab'],avoid:['recoveryStentNHS','recoveryPlateletNHS'],warning:['recoveryHeartNHS','recoveryStentNHS','recoveryPlateletNHS']},
  learningSections:[
   {title:'التأهيل القلبي حسب قدرتك',body:'اسأل عن مستوى المشي والتمارين وعلامات التوقف والتدرج. ليست الراحة الدائمة ولا التمارين الشديدة خطة عامة للجميع؛ يعتمد البرنامج على العمر والقدرة ومشكلاتك الصحية.',sources:['recoveryCardiacRehab']},
   {title:'الجلطات ليست نوعًا واحدًا',body:'دواء مريض الدعامة قد يختلف عن دواء السكتة أو جلطة الساق. احمل قائمة واضحة ولا تستعر مميعًا أو تضف أسبرينًا من تجربة قريب.',sources:['recoveryHeartNHS','recoveryStentNHS','recoveryAnticoagPlan']}
  ]
 },
 {
  id:'venous-clot-care',cat:'recovery',title:'بعد جلطة الساق أو الرئة: أمان مميع الدم',audience:'المصابون بجلطات الأوردة أو الانصمام الرئوي وأسرهم',
  hook:'خذ الدواء بدقة، واعرف علامات النزف وعودة الأعراض، وتحرك وفق خطة الفريق.',
  about:'قد تتكون جلطة في وريد عميق، غالبًا بالساق، وقد ينتقل جزء منها للرئة. بعد التشخيص، يساعد مضاد التخثر على منع نمو الجلطة وجلطات جديدة؛ لا يُستبدل بأسبرين أو تدليك.',
  symptoms:['قد يستمر بعض ألم أو تورم الساق أثناء التعافي؛ اسأل عن المتوقع وراجع إن زاد أو ظهرت أعراض جديدة.','راقب النزف غير المعتاد والكدمات الشديدة والبول الأحمر أو البراز الأسود أثناء علاج مضاد التخثر.'],
  actions:['خذ اسم الدواء والجرعة والمدة ومواعيد الفحوص وطريقة التواصل مكتوبة. تختلف تعليمات الجرعة المنسية حسب الدواء؛ اسأل ولا تضاعفها تلقائيًا.','لا توقف العلاج لأن التورم قل. أخبر الطبيب والصيدلي بكل دواء أو مكمل قبل البدء، وبمضاد التخثر قبل إجراء أو علاج أسنان.','تحرك تدريجيًا بعد السماح الطبي ولا تبقَ بلا حركة طويلًا. ناقش المشي والسفر والعودة للعمل والسوائل المناسبة لحالتك.','احمل بطاقة أو قائمة الدواء، وتجنب الإصابات. لا تبدأ جوارب ضغط إلا إذا أوصى بها المختص وحدد المقاس والطريقة.'],
  prevention:['التزم بالمتابعة؛ بعض الأدوية تحتاج فحوص دم دورية، وتُراجع المدة بحسب سبب الجلطة وخطر عودتها والنزف.','أخبر الفريق بتاريخ الجلطة عند حمل أو عملية أو دخول مستشفى أو سفر طويل ليضع خطة وقاية مناسبة.'],
  treatment:'يحدد الفريق نوع مضاد التخثر ومدة العلاج. لا توقفه أو تبدله بمضاد صفائح من نفسك؛ النوع والجرعة يختلفان بين الجلطات والحالات. اطلب مراجعة إذا منعتك الأعراض من الحركة المسموحة أو استمر ضيق النفس.',
  avoid:'لا تدلك موضع الجلطة أو تستخدم رباطًا ضاغطًا أو عشبة لإذابتها. لا تضف إيبوبروفين أو أسبرينًا أو علاجًا آخر دون سؤال عن التداخل والنزف.',
  warning:'اطلب الطوارئ لضيق نفس مفاجئ أو ألم صدر أو إغماء أو سعال دم، ولنزف شديد لا يتوقف أو قيء دم أو براز أسود مع دوخة. البول الأحمر أو البراز الأسود أو النزف غير المعتاد يحتاج تواصلًا طبيًا عاجلًا حتى دون دوخة. أي إصابة بالرأس أثناء مضاد التخثر تحتاج تقييمًا عاجلًا حتى إن شعرت بخير. ألم وتورم جديد بساق واحدة يحتاجان تقييمًا سريعًا.',
  art:'recovery-home',scene:'نقص تورم الساق ففكر المريض بإنهاء العلاج. اتصل بعيادة المتابعة، وعرف أن مدة العلاج تعتمد على تقييم الخطر، لا شكل الساق وحده.',
  question:['نسيت جرعة مضاد التخثر؛ ماذا أفعل؟',['أضاعف الجرعة دائمًا','أتبع تعليمات هذا الدواء وأسأل الصيدلي أو الفريق عند الشك','أوقف العلاج كله'],1],
  sources:['recoveryDVTNHS','recoveryPENHS','recoveryAnticoagSafety','recoveryAnticoagPlan','recoveryAnticoagHome'],tags:['home','family','older','mother'],related:['after-surgery','after-stroke','after-heart-attack','medicine-list'],
  sectionSources:{about:['recoveryDVTNHS','recoveryPENHS'],symptoms:['recoveryDVTNHS','recoveryAnticoagSafety'],actions:['recoveryAnticoagHome','recoveryAnticoagPlan','recoveryDVTNHS'],prevention:['recoveryDVTNHS','recoveryAnticoagHome'],treatment:['recoveryDVTNHS','recoveryPENHS'],avoid:['recoveryAnticoagPlan'],warning:['recoveryPENHS','recoveryAnticoagSafety','recoveryAnticoagHome']},
  learningSections:[
   {title:'مضاد تخثر أم مضاد صفائح؟',body:'هما مجموعتان مختلفتان وقد يجمعهما الطبيب في ظروف محددة. لا تضف أو تحذف أيًا منهما وحدك؛ الزيادة قد تسبب نزفًا والتوقف قد يزيد عودة الجلطة.',sources:['recoveryAnticoagPlan','recoveryAnticoagHome']},
   {title:'معلومة مهمة قبل أي إجراء',body:'قل للطبيب وطبيب الأسنان إنك تتناول مضاد تخثر، وأخبرهما باسم الدواء ووقت آخر جرعة. قد تستمر به أو تحتاج خطة تعديل؛ القرار للفريق، وليس بإيقافه احتياطيًا من نفسك.',sources:['recoveryAnticoagPlan']}
  ]
 },
 {
  id:'fracture-care',cat:'recovery',title:'الكسر والجبس: احمِ الطرف ولا تهمل الأصابع',audience:'المصابون بالكسور وأسرهم',
  hook:'زوال الألم لا يثبت اكتمال الالتئام؛ إذن التحميل على الطرف يصدر من فريق العظام.',
  about:'بعد رد الكسر أو تثبيته تحتاج إلى متابعة وخطة حركة. يختلف الالتئام حسب العظم والإصابة والعلاج؛ قد تحتاج علاجًا طبيعيًا بعد إزالة الجبس.',
  symptoms:['بعض الألم والتورم قد يحدثان. اسأل عن المتوقع وكيف تراقب التحسن.','الخدر أو برودة الأصابع أو تغير لونها أو صعوبة تحريكها علامات تستحق التحرك سريعًا.'],
  actions:['اعرف هل يُسمح بالتحميل على الطرف وبأي مقدار، وتعلم استخدام العكاز أو المشاية قبل العودة.','احفظ الجبس جافًا، ولا تدخل شيئًا للحك. ارفع الطرف بالقدر الذي يوصي به الفريق بعد التثبيت.','حرك الأصابع والمفاصل الحرة فقط وفق التعليمات، وخذ المسكن الموصوف واحضر موعد المراجعة والتصوير.','أبلغ العيادة عن جبس مكسور أو مبتل أو مرتخٍ أو رائحة وإفرازات؛ لا تصلحه بنفسك.'],
  prevention:['أزل العوائق واستعمل حذاءً ثابتًا ووسيلة المشي الملائمة لمنع سقوط جديد.','بعد كسر بسبب سقوط بسيط، ناقش صحة العظام وخطر السقوط والتغذية، خصوصًا مع التقدم بالعمر.'],
  treatment:'قد يشمل العلاج تثبيتًا أو عملية ثم تمارين تدريجية. لا تنزع الجبس ولا تعد للرياضة أو حمل الأثقال حتى يسمح الفريق؛ المكملات ليست بديلًا عن متابعة الالتئام.',
  avoid:'لا تحاول تعديل العظم أو فك الجبس أو إجبار الطرف على حمل الوزن. لا تدلك ساقًا مؤلمة ومتورمة حديثًا.',
  warning:'اذهب للطوارئ فورًا عند ألم شديد متزايد لا يهدأ بالخطة، أو جبس يضغط مع خدر أو عجز عن تحريك الأصابع، أو أصابع باردة أو شاحبة أو زرقاء. ضيق النفس المفاجئ أو ألم الصدر طارئ؛ تورم وألم جديد بساق واحدة يستلزمان تقييمًا عاجلًا.',
  art:'fracture-care',scene:'خف ألم الكاحل ففكر المصاب في المشي دون عكاز. راجع تعليمات التحميل بدل اختبار قوة العظم بالألم وحده.',
  question:['أصبحت الأصابع باردة وخدرة والجبس ضيقًا. ما الأنسب؟',['أنتظر يومين','أطلب تقييمًا عاجلًا فورًا','أدخل أداة داخل الجبس'],1],
  sources:['recoveryArmNHS','recoveryLegNHS','recoveryCastNHS','recoveryDVTNHS'],tags:['home','family','older','school'],related:['injury-recovery','falls','after-surgery'],
  sectionSources:{about:['recoveryArmNHS','recoveryLegNHS'],symptoms:['recoveryCastNHS'],actions:['recoveryLegNHS','recoveryArmNHS'],prevention:['recoveryLegNHS','recoveryArmNHS'],treatment:['recoveryArmNHS','recoveryLegNHS'],avoid:['recoveryLegNHS','recoveryDVTNHS'],warning:['recoveryCastNHS','recoveryDVTNHS']},
  learningSections:[
   {title:'ثلاثة أسئلة في عيادة الكسور',bullets:['هل أضع وزنًا على الطرف؟ وما مقدار الوزن والطريقة؟','ما التمارين المسموحة الآن؟ ومتى يبدأ التأهيل؟','متى أراجع، وما العلامات التي تستدعي العودة اليوم؟'],sources:['recoveryArmNHS','recoveryLegNHS']},
   {title:'الطوارئ لا تنتظر موعد العيادة',body:'ضغط الجبس المصحوب بألم شديد أو خدر أو تغير لون وبرودة الأصابع يحتاج فحصًا سريعًا للدورة الدموية والأعصاب. لا تحاول علاج المشكلة بأداة أو كريم داخل الجبس.',sources:['recoveryCastNHS']}
  ]
 },
 {
  id:'injury-recovery',cat:'recovery',title:'بعد الإصابة: تعافٍ تدريجي وعودة آمنة للحركة',audience:'المصابون بالالتواءات والكدمات والإصابات وأسرهم',
  hook:'ليست كل إصابة «كدمة بسيطة»؛ تأكد من التشخيص ثم زد النشاط بالتدريج.',
  about:'تحتاج الإصابة الشديدة أو غير الواضحة تقييمًا لاستبعاد كسر أو إصابة أعصاب أو رأس. هذه الإرشادات للرعاية بعد التقييم أو للإصابة البسيطة دون علامات خطر.',
  symptoms:['ألم وتورم وكدمة أو ضعف بالمنطقة. العجز عن استخدام الطرف أو المشي يستحق تقييمًا.','راقب اتجاه التحسن؛ ازدياد الألم أو التورم أو ظهور خدر يستدعي إعادة المراجعة.'],
  actions:['للشد أو الالتواء البسيط، احمِ المنطقة وخفف النشاط المؤلم أولًا. يمكن استعمال برودة ملفوفة بقماش لفترات قصيرة؛ لا تضع الثلج على الجلد مباشرة.','بعد المرحلة الأولى، عد للحركة تدريجيًا عندما تسمح الإصابة وبحسب تعليمات المختص؛ لا تجعل الراحة الطويلة أو التمرين المؤلم علاجًا افتراضيًا.','اتبع خطة الجروح والمسكنات والعلاج الطبيعي إن وُصفت. راجع إن لم يتحسن الأداء أو تعذر تحميل الوزن.','بعد إصابة رأس، اتبع خطة المراقبة والعودة للدراسة والعمل؛ ينبغي وجود بالغ مسؤول في أول 24 ساعة بعد السماح بالرعاية المنزلية.'],
  prevention:['عد للنشاط والرياضة على مراحل مع توازن وقوة مناسبين وحذاء ثابت، واتبع إذن المختص للرياضة الاحتكاكية.','هيئ طريقًا آمنًا بالمنزل واستعمل وسيلة المساعدة إذا أوصى بها الفريق.'],
  treatment:'قد تكفي رعاية بسيطة، وقد تحتاج تصويرًا أو تثبيتًا أو تأهيلًا بحسب الإصابة. اطلب مسكنًا يناسب أمراضك وأدويتك؛ لا تنقل خطة كسر إلى التواء أو العكس.',
  avoid:'تجنب التدليك القوي والحرارة في الأيام الأولى للالتواء المتورم، ولا تضغط برباط يسبب خدرًا أو تغير لون. لا تعد للرياضة لتختبر الإصابة بالقوة.',
  warning:'طوارئ عند تشوه الطرف أو عظم ظاهر أو نزف شديد أو طرف بارد مخدر. بعد ضربة الرأس: تدهور اليقظة أو تشنج أو ضعف أو اضطراب كلام أو مشي طارئ؛ القيء أو تناول مميعات الدم يستدعي مشورة عاجلة. ضيق نفس أو ألم صدر بعد قلة حركة يحتاج طوارئ.',
  art:'recovery-home',scene:'أراد شاب الرجوع للمباراة فور انخفاض تورم كاحله. اتبع تمارين وتأهيلًا تدريجيًا وراجع عند تعذر المشي بدل ربطه بشدة ومواصلة اللعب.',
  question:['بعد الإصابة، هل اختفاء معظم الألم يكفي للعودة فورًا للرياضة؟',['نعم دائمًا','لا؛ العودة تدريجية حسب الوظيفة والخطة','أختبرها بقفز قوي'],1],
  sources:['recoverySprainNHS','recoveryAnkleNHS','recoveryHeadNHS','recoveryArmNHS','recoveryDVTNHS'],tags:['home','family','school','older'],related:['fracture-care','after-surgery','falls','painkillers'],
  sectionSources:{about:['recoverySprainNHS','recoveryHeadNHS'],symptoms:['recoverySprainNHS'],actions:['recoverySprainNHS','recoveryAnkleNHS','recoveryHeadNHS'],prevention:['recoveryAnkleNHS'],treatment:['recoverySprainNHS','recoveryArmNHS'],avoid:['recoverySprainNHS'],warning:['recoveryArmNHS','recoveryHeadNHS','recoveryDVTNHS']},
  learningSections:[
   {title:'الراحة ثم التدرج',body:'حماية الإصابة أولًا لا تعني ملازمة السرير أسابيع. يحدد نوع الضرر ما يمكن تحريكه ومتى؛ زد المشي والتمارين بالتدرج وراجع عند استمرار العجز أو التدهور.',sources:['recoveryAnkleNHS']},
   {title:'إصابة الرأس لها مسار مختلف',body:'لا تترك المصاب وحده بعد الخروج المبكر، واتبع ورقة المراقبة. يمكنه النوم إذا سمح التقييم بالرعاية المنزلية، لكن صعوبة إيقاظه علامة طوارئ. تجنب القيادة والرياضة الاحتكاكية حتى التعافي والإذن المناسب.',sources:['recoveryHeadNHS']}
  ]
 },
 {
  id:'burn-recovery',cat:'recovery',title:'بعد الحرق: العناية بالجرح والجلد الجديد',audience:'المتعافون من الحروق وأسرهم',
  hook:'للجرح المفتوح خطة ضماد، وللجلد الملتئم خطة حماية؛ لا تبدأ كريم الندبات قبل أوانه.',
  about:'قد تحتاج الحروق إلى ضمادات ومتابعة أو جراحة وتأهيل. تختلف الرعاية حسب العمق والمكان؛ اتبع فريق الحروق حتى لو بدا السطح أفضل.',
  symptoms:['قد تظهر حكة وجفاف وحساسية أو شد بالجلد الملتئم. أخبر الفريق إذا أثرت في النوم أو الحركة.','الألم المتزايد والسخونة والتورم أو القيح والحمى تحتاج تقييمًا للعدوى.'],
  actions:['اتبع موعد تغيير الضماد وطريقته، واغسل اليدين قبل العناية. لا تنزع ضمادًا أو تفتح فقاعات أو تضع خلطة على الجرح.','احضر المراجعات، واتصل بالفريق إذا ابتل الضماد أو اتسخ أو انزلق أو ظهرت إفرازات.','بعد انغلاق الجلد وموافقة الفريق، استعمل مرطبًا بسيطًا غير معطر وفق التعليمات؛ لا تضع مستحضرات الندبات على جرح مفتوح.','اتبع برنامج الحركة والجبيرة إن وُصف، خصوصًا قرب المفاصل، واطلب مساعدة عند ألم أو شد يحد الحركة.'],
  prevention:['احمِ الجلد الملتئم من الشمس بالملابس والظل وواقٍ مناسب وفق فريق الحروق، وأعد تطبيقه كما توصي العبوة.','لا تفرك أو تحك بعنف، وناقش العودة للعمل والنشاط والدعم النفسي إذا أثر شكل الجلد أو الذكريات في حياتك.'],
  treatment:'قد تحتاج الندبة مرطبًا أو سيليكونًا أو ضغطًا أو وسائل أخرى بعد التئام الجلد وتقييم المختص. التمارين والتأهيل يساعدان على المحافظة على الوظيفة؛ لا يوجد كريم يضمن إزالة الندبة.',
  avoid:'لا تبدأ تدليكًا قويًا أو سيليكونًا أو لباس ضغط من نفسك، ولا تعالج حرقًا عميقًا أو واسعًا في المنزل. لا تقارن مدة شفائك بغيرك.',
  warning:'راجع سريعًا عند قيح أو رائحة جديدة أو حمى أو ألم وتورم متزايدين أو إعادة انفتاح الجرح. اطلب الطوارئ عند صعوبة تنفس أو تدهور الوعي أو مرض عام شديد؛ لا تنتظر موعد تغيير الضماد.',
  art:'burn-care',scene:'أرادت الأسرة وضع كريم ندبات فوق موضع لم ينغلق. سألت فريق الحروق؛ استمرت بخطة الجرح وأجّلت رعاية الندبة إلى الوقت المناسب.',
  question:['متى أبدأ مستحضرًا أو تدليكًا للندبة؟',['على الجرح المفتوح مباشرة','بعد التئام الجلد وتوجيه فريق الرعاية','كلما زاد الألم'],1],
  sources:['recoveryBurnNHS','recoveryBurnAfter','recoveryBurnSkin','recoveryScarNHS'],tags:['home','family','school','older'],related:['burns','sunscreen','after-surgery','pressure-care'],
  sectionSources:{about:['recoveryBurnAfter'],symptoms:['recoveryBurnSkin','recoveryScarNHS'],actions:['recoveryBurnAfter','recoveryBurnSkin'],prevention:['recoveryBurnAfter','recoveryBurnSkin'],treatment:['recoveryScarNHS','recoveryBurnAfter'],avoid:['recoveryBurnNHS','recoveryBurnAfter'],warning:['recoveryScarNHS','recoveryBurnNHS']},
  learningSections:[
   {title:'قرب المفصل: حافظ على الحركة المسموحة',body:'قد يشد الالتئام الجلد ويقيد الحركة. اسأل معالجك عن الوضعيات والتمارين والجبيرة المناسبة؛ لا تجبر المفصل ولا تلغِ التمارين كلها خوفًا من الندبة.',sources:['recoveryBurnAfter']},
   {title:'حماية الجلد الجديد',body:'الجلد الملتئم ومناطق الترقيع أكثر حساسية للشمس. احمها باستمرار، وناقش مع الفريق مدة الحماية المشددة والواقي الملائم، دون وضعه داخل الجرح المفتوح.',sources:['recoveryBurnAfter','recoveryBurnSkin']}
  ]
 }
];
for(const a of topics){a.reviewedSources='2026-10-15';if(!R.extra.some(x=>x.id===a.id))R.extra.push(a);}
Object.assign(R.details.burns,{
 title:'الحروق: التبريد الصحيح أولًا',
 about:'الحرق قد ينتج من سائل ساخن أو نار أو كهرباء أو مادة كيميائية. الإسعاف المبكر يقلل الأذى، لكن طريقة التعامل تختلف باختلاف السبب.',
 symptoms:['ألم واحمرار أو فقاعات، وقد يكون الجلد أبيض أو داكنًا في الحرق العميق. قلة الألم لا تعني أن الإصابة بسيطة.','سعال أو بحة أو صعوبة تنفس بعد دخان أو حريق قد تعني إصابة استنشاقية.'],
 actions:['أمّن المكان وأبعد مصدر الحرارة دون تعريض نفسك للخطر. للحرق الحراري: برّد الموضع بماء جارٍ بارد باعتدال لمدة 20 دقيقة، وابدأ بأسرع ما يمكن.','انزع الحلي والملابس القريبة قبل زيادة التورم، واترك كل ما التصق بالجلد. أبقِ بقية الجسم دافئًا، خصوصًا الطفل، ولا تغمر الجسم كله بالماء البارد.','بعد التبريد، غطِّ الحرق الحراري بلطف بغطاء نظيف غير لاصق. يمكن وضع طبقة نايلون غذائي نظيفة فوقه دون لفها حول الطرف ودون وضعها على الوجه؛ لا تؤخر الإسعاف لتبحث عن غطاء.','للكهرباء: افصل المصدر إن أمكن بأمان ولا تلمس المصاب قبل زوال الخطر، واطلب الإسعاف. للكيميائيات: احمِ نفسك، وانزع الملابس الملوثة إن أمكن، وانفض المسحوق الجاف برفق دون ملامسة قبل غسل وفير بالماء الجاري وطلب المساعدة العاجلة.'],
 prevention:['أبعد القدور والمشروبات الساخنة عن الحواف والأطفال، ولا تحمل طفلًا مع شراب ساخن.','خزن الكيميائيات بعبواتها وأغلقها بعيدًا عن الأطفال، وراجع سلامة الكهرباء والغاز ووسائل الإنذار.'],
 treatment:'الحرق العميق أو الواسع يحتاج تقييمًا وعلاجًا في منشأة صحية. الحرق الكيميائي يحتاج غسلًا مستمرًا بكمية كبيرة من الماء مع توجيه الطوارئ؛ قد يستلزم نحو ساعة، ولا تطبق عليه قاعدة 20 دقيقة ثم تتوقف. لا تحاول معادلة المادة بحمض أو قلوي آخر.',
 avoid:'لا ثلج أو معجون أسنان أو زيوت أو دقيق، ولا تفتح الفقاعات أو تنزع الملابس الملتصقة. لا تضع كريمًا أو لاصقًا على الحرق الجديد، ولا تحاول تنظيف أو تضميد حرق كبير أو عميق بنفسك.',
 warning:'الطوارئ للحرق الكهربائي أو الكيميائي أو العميق أو الواسع، واستنشاق الدخان أو صعوبة التنفس. تحتاج حروق الوجه واليدين والقدمين والأعضاء التناسلية والمفاصل أو الحرق المحيط بالطرف تقييمًا عاجلًا. للأطفال الصغار اطلب التقييم مبكرًا، ولا تنتظر أن يشتد الألم.',
 art:'burn-care',related:['burn-recovery','heat','safe-home','cleaning'],
 sources:['recoveryBurnWHO','recoveryBurnNHS','recoveryChemicalNHS','recoveryBurnReferral'],
 sectionSources:{about:['recoveryBurnWHO'],symptoms:['recoveryBurnReferral'],actions:['recoveryBurnNHS','recoveryChemicalNHS','recoveryBurnWHO'],prevention:['recoveryBurnWHO'],treatment:['recoveryBurnNHS','recoveryChemicalNHS'],avoid:['recoveryBurnWHO','recoveryBurnNHS'],warning:['recoveryBurnReferral','recoveryBurnNHS']},
 learningSections:[
  {title:'حراري أم كيميائي أم كهربائي؟',body:'20 دقيقة هي قاعدة تبريد الحرق الحراري بالماء المعتدل البرودة. الكيميائي يحتاج إزالة التلوث وغسلًا وفيرًا أطول مع الطوارئ، والكهربائي يبدأ بتأمين المصدر وتقييم عاجل حتى لو كانت العلامة الجلدية صغيرة.',sources:['recoveryBurnNHS','recoveryChemicalNHS','recoveryBurnWHO']},
  {title:'التبريد مع حماية الجسم من البرد',body:'برّد موضع الحرق وأبقِ بقية الجسم دافئًا. لا تستخدم الثلج ولا تؤخر طلب الإسعاف في الحروق الخطرة حتى تنتهي مدة التبريد؛ يمكن أن يساعد مرافق في الاتصال.',sources:['recoveryBurnWHO','recoveryBurnNHS']}
 ],reviewedSources:'2026-10-15'
});
const before=R.extra.find(a=>a.id==='blood-donation');
if(before)Object.assign(before,{
 title:'التبرع بالدم: تكافل ينقذ الحياة',
 hook:'تبرع طوعي منتظم لمن تنطبق عليه الشروط؛ لا تنتظر نداء أسرة في لحظة طارئة.',
 about:'يحتاج الدمَ مرضى النزف والحوادث وبعض العمليات والسرطان ومضاعفات الولادة. مخزونه محدود الصلاحية، لذلك يساعد التبرع الطوعي المنتظم على توافره حين يُحتاج إليه، مع حماية المتبرع والمتلقي.',
 actions:['اسأل مركز الدم المحلي عن المواعيد والشروط والوثائق والفاصل المناسب بين التبرعات؛ التطبيق لا يقرر أهليتك ولا يطبق حدود بلد آخر عليك.','تناول وجبة مناسبة ونم جيدًا واشرب بصورة منتظمة قبل الزيارة، مع مراعاة أي تقييد سوائل طبي. لا تذهب صائمًا عمدًا.','اذكر الأمراض والأدوية والسفر والإجراءات الحديثة بصدق. إذا كنت مريضًا أو تعرف أن لديك فقر دم، أبلغ المركز وأجّل التبرع إلى أن يقرر سلامتك.','اسأل ووافق بحرية، وخطط للراحة والعودة الآمنة. إن قُبلت، ناقش موعد تبرع تالٍ حسب شروط المركز، دون ضغط على نفسك أو الآخرين.'],
 prevention:['قرار القبول في كل زيارة يتبع مقابلة وفحوص المركز، لا معرفة الفصيلة أو الشعور بالصحة فقط.','إن لم تستطع التبرع، يمكنك نشر مواعيد موثوقة ومساعدة التنظيم والمرافقة مع احترام خصوصية الجميع.'],
 treatment:'التبرع مساعدة إنسانية، وليس وسيلة لتنقية الجسم أو علاج الضغط أو بديلًا عن فحص صحي. تأجيلك لحمايتك ليس تقصيرًا؛ لا توقف دواءً أو تتناول الحديد لتجاوز التأجيل من نفسك.',
 avoid:'لا تخفِ مرضًا أو دواءً، ولا تستخدم التبرع للحصول على فحص عدوى مشتبه بها. لا تلُم من لا يستطيع التبرع ولا تعلن معلوماته الصحية أو تضغط عليه.',
 sources:['recoveryBloodWHO','recoveryBloodSupplyWHO','recoveryDonorBefore','recoveryDonorAfter'],related:['blood-after','anaemia-iron'],
 sectionSources:{about:['recoveryBloodWHO','recoveryBloodSupplyWHO'],symptoms:['recoveryBloodWHO'],actions:['recoveryBloodWHO','recoveryDonorBefore'],prevention:['recoveryBloodWHO','recoveryBloodSupplyWHO'],treatment:['recoveryBloodWHO'],avoid:['recoveryBloodWHO','recoveryBloodSupplyWHO'],warning:['recoveryBloodWHO','recoveryDonorAfter']},
 learningSections:[
  {title:'كيف تفيد من لا تعرفه؟',body:'قد يفصل المركز التبرع إلى مكونات تُستخدم حسب الحاجة. الاستمرارية الطوعية الآمنة تساعد المستشفى على الاستعداد للمرضى؛ الشروط والفواصل يحددها مركز الدم المحلي.',sources:['recoveryBloodWHO','recoveryBloodSupplyWHO']},
  {title:'دور الأسرة والمدرسة والحي',bullets:['انشر موعد حملة موثوقة وبيانات مركز الدم، دون وعود بقبول الجميع.','شجع السؤال والصدق وقرار التبرع الحر، واحترم قرار التأجيل.','تجنب نشر قوائم المتبرعين أو أسباب عدم قبولهم دون إذن.'],sources:['recoveryBloodSupplyWHO','recoveryBloodWHO']}
 ],reviewedSources:'2026-10-15'
});
const after=R.extra.find(a=>a.id==='blood-after');
if(after)Object.assign(after,{
 sources:['recoveryDonorAfter','recoveryDonorBefore','recoveryBloodWHO'],related:['blood-donation','anaemia-iron'],
 sectionSources:{about:['recoveryDonorAfter'],symptoms:['recoveryDonorAfter'],actions:['recoveryDonorAfter'],prevention:['recoveryDonorAfter','recoveryDonorBefore'],treatment:['recoveryDonorAfter'],avoid:['recoveryDonorAfter'],warning:['recoveryDonorAfter']},
 learningSections:[
  {title:'إذا عاد النزف من موضع الإبرة',body:'اجلس وارفع الذراع واضغط على الموضع بضماد نظيف لخمس دقائق على الأقل. اطلب مساعدة إذا لم يتوقف أو كان غزيرًا؛ اتبع تعليمات المركز بشأن الضماد ولا تحمل ثقلًا بذراع التبرع.',sources:['recoveryDonorAfter']},
  {title:'معلومة نسيتها أو مرض ظهر بعد التبرع',body:'أبلغ المركز سريعًا إذا ظهرت مشكلة صحية أو تذكرت سببًا قد يجعل الدم غير ملائم. احتفظ بوسيلة الاتصال، واسأل عن الموعد الآمن للتبرع القادم بدل اعتماد جدول موحد للجميع.',sources:['recoveryDonorAfter','recoveryBloodWHO']}
 ],reviewedSources:'2026-10-15'
});
if(R.details.stroke)R.details.stroke.related=[...new Set([...(R.details.stroke.related||[]),'after-stroke'])];
Object.assign(R.searchAliases,{
 'after-surgery':'بعد العملية بعد العمليات جراحة الجراحة جرح الغرز خياطة تعافي مميعات جلطات',
 'after-stroke':'بعد الجلطة بعد الجلطات سكتة دماغية شلل تأهيل بلع رعاية جلطة',
 'after-heart-attack':'بعد الجلطة القلبية بعد جلطة القلب النوبة القلبية دعامة دعامات قسطرة تأهيل قلبي',
 'venous-clot-care':'جلطة الساق جلطة الرئة جلطات الاوردة الأوردة خثار وريدي انصمام رئوي مضاد التخثر مميع الدم',
 'fracture-care':'كسر الكسر كسور الكسور جبس الجبس جبيرة عكاز مشاية التئام اصابع أصابع',
 'injury-recovery':'بعد الإصابة بعد الاصابة اصابة إصابة اصابات إصابات التواء كدمة رضوض شد عضلي تعافي رياضة راس رأس',
 'burn-recovery':'حرق حروق بعد الحرق ندبات ندبة ترقيع جلد تأهيل',
 burns:'الحروق حروق حرق سلق ماء ساخن زيت حرق كهربائي كيميائي نار تبريد عشرين دقيقة 20',
 'blood-donation':'تبرع بالدم التبرع بالدم متبرع دم بنك الدم تكافل حملات التبرع',
 'blood-after':'بعد التبرع دم دوخة نزف كدمة اغماء إغماء'
});
})();
