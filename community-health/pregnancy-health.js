/* Practical pregnancy education. Primary sources checked 15 October 2026; no clinical sign-off implied. */
(()=>{
'use strict';
const R=window.COMMUNITY_V2;
if(!R)return;
Object.assign(R.sources,{
 maternalAntenatalWHO:['منظمة الصحة العالمية','تعزيز الحمل الصحي والمتابعة المبكرة المتمحورة حول المرأة','https://www.who.int/activities/promoting-healthy-pregnancy'],
 maternalPressureNHS:['NHS','ارتفاع ضغط الدم والحمل: التعريف والمتابعة والأدوية','https://www.nhs.uk/pregnancy/existing-health-conditions/high-blood-pressure/'],
 maternalPreeclampsiaNHS:['NHS','ما قبل تسمم الحمل: الأعراض والعلاج وخطره بعد الولادة','https://www.nhs.uk/conditions/pre-eclampsia/'],
 maternalPressureHome:['Gloucestershire Hospitals NHS','قياس ضغط الحمل في المنزل وحدود الاتصال بخدمة الأمومة','https://www.gloshospitals.nhs.uk/documents/18253/Checking_your_own_blood_pressure_during_pregnancy_GHPI1578_06_23.pdf'],
 maternalPressureClinic:['Guy’s and St Thomas’ NHS','ضغط الحمل: ارتفاع أحد الرقمين والمتابعة والعلاج','https://www.guysandstthomas.nhs.uk/health-information/antenatal-hypertension'],
 maternalGdmNHS:['NHS','سكري الحمل: الأسباب والفحص والمتابعة بعد الولادة','https://www.nhs.uk/conditions/gestational-diabetes/'],
 maternalGdmTreatment:['NHS','سكري الحمل: مراقبة السكر والغذاء والحركة والدواء','https://www.nhs.uk/conditions/gestational-diabetes/treatment/'],
 maternalGdmDiet:['Chelsea and Westminster Hospital NHS','نصائح غذائية عملية لسكري الحمل','https://www.chelwest.nhs.uk/your-visit/patient-leaflets/dietary-advice-for-gestational-diabetes'],
 maternalDietNHS:['NHS','التغذية المتوازنة في الحمل دون الأكل عن شخصين','https://www.nhs.uk/pregnancy/keeping-well/have-a-healthy-diet/'],
 maternalFoodSafety:['NHS','الأغذية والمشروبات التي تحتاج تجنبًا أو احتياطًا أثناء الحمل','https://www.nhs.uk/pregnancy/keeping-well/foods-to-avoid/'],
 maternalVitaminsNHS:['NHS','فيتامينات الحمل والمكملات: الفوليك وفيتامين د والحديد وتجنب الريتينول','https://www.nhs.uk/pregnancy/keeping-well/pregnancy-vitamins-and-supplements/'],
 maternalIronFolateWHO:['منظمة الصحة العالمية','الحديد وحمض الفوليك أثناء الحمل ضمن رعاية الحمل','https://www.who.int/tools/elena/interventions/daily-iron-pregnancy'],
 maternalBvitaminsNHS:['NHS','الفولات وحمض الفوليك وب12: المصادر والوقاية قبل الحمل','https://www.nhs.uk/conditions/vitamins-and-minerals/vitamin-b/'],
 maternalCommonNHS:['NHS','مشكلات الحمل الشائعة: الإمساك والدوخة والبول وتغيرات الجلد','https://www.nhs.uk/pregnancy/common-symptoms/common-health-problems/'],
 maternalNauseaNHS:['NHS','الغثيان والقيء في الحمل: العناية ومتى يشتبه بالجفاف','https://www.nhs.uk/pregnancy/common-symptoms/vomiting-and-morning-sickness/'],
 maternalHeartburnNHS:['NHS','الحموضة أثناء الحمل: العادات والأدوية والتداخل مع المكملات','https://www.nhs.uk/pregnancy/common-symptoms/indigestion-and-heartburn/'],
 maternalExerciseWHO:['منظمة الصحة العالمية','النشاط البدني للحامل وبعد الولادة عند عدم وجود موانع','https://www.who.int/europe/news-room/fact-sheets/item/physical-activity'],
 maternalExerciseNHS:['NHS','التمرين في الحمل: النشاط المناسب والحر والسوائل والسلامة','https://www.nhs.uk/pregnancy/keeping-well/exercise/'],
 maternalMovementsNHS:['NHS','حركة الجنين المعتادة والتصرف فور تغيرها','https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/'],
 maternalWarningCDC:['CDC — حملة اسمعوها','علامات إنذار الأم أثناء الحمل وبعد الولادة','https://www.cdc.gov/hearher/maternal-warning-signs/index.html']
});
const topics=[
 {
  id:'pregnancy-pressure',cat:'mother',title:'ضغط الحمل وما قبل تسمم الحمل: لا تنتظري ظهور الأعراض',audience:'الحوامل والأمهات بعد الولادة وأسرهن',
  hook:'يمكن أن يرتفع الضغط وأنت تشعرين أنك بخير؛ القياس والمتابعة يحميانك ويحميان الطفل.',
  about:'قد يوجد ارتفاع الضغط قبل الحمل أو يظهر أثناءه. ما قبل تسمم الحمل حالة قد تصيب أعضاء الجسم وتؤثر في نمو الجنين، وغالبًا تظهر من الأسبوع العشرين، ويمكن أن تبدأ بعد الولادة. لا يكفي تورم القدمين أو قراءة واحدة لتشخيص الحالة في المنزل.',
  symptoms:['قد لا تشعرين بارتفاع الضغط؛ فحص الضغط والبول جزء مهم من المتابعة.','صداع شديد مستمر، زغللة أو ومضات، ألم أعلى البطن أو تحت الأضلاع، تورم مفاجئ بالوجه أو اليدين، أو شعور شديد بالتوعك علامات تحتاج تقييمًا فوريًا.'],
  actions:['احضري مواعيد الحمل وخذي قائمة الأدوية، واذكري ضغطًا أو سكريًا أو مرض كلى سابقًا أو ما قبل تسمم حمل في حمل سابق.','إذا طُلب القياس المنزلي، تعلمي الطريقة بكفة مناسبة وجهاز معتمد للحمل، وسجلي الرقمين والوقت والأعراض وفق الخطة المكتوبة.','بلوغ الرقم العلوي 140 أو السفلي 90 ملم زئبق يستدعي التواصل مع فريق الحمل لتوجيهك، خاصة إذا تكرر بعد راحة. بلوغ العلوي 160 أو السفلي 110 يستدعي تقييمًا عاجلًا فورًا؛ يكفي ارتفاع أحدهما، ولا تنتظري اكتمال يوم من القراءات.'],
  prevention:['المتابعة المبكرة تكشف عوامل الخطر وتتيح خطة وقاية ومراقبة مخصصة. الغذاء المتوازن والحركة المسموح بها يدعمان الصحة، ولا يمنعان الحالة دائمًا.','قد يصف الفريق أسبرين بجرعة منخفضة لمن لديهن عوامل خطر. لا تبدئيه بنفسك ولا تعتبريه علاجًا طارئًا لقراءة مرتفعة.'],
  treatment:'يختار الطبيب دواء ضغط مناسبًا للحمل، وقد يلزم فحص دم وبول وتصوير نمو الجنين أو دخول المستشفى. يقرر الفريق توقيت الولادة حسب صحة الأم والطفل. إذا كنت تستعملين دواء ضغط قبل الحمل، اطلبي مراجعته سريعًا ولا توقفيه أو تبدليه بنفسك.',
  avoid:'لا تخفضي الضغط بزيادة دواء أو أعشاب، ولا تنسبي الصداع الشديد لقلة النوم. قراءة منزلية طبيعية لا تلغي أهمية علامات الخطر.',
  warning:'اطلبي خدمة الأمومة أو الطوارئ فورًا للأعراض المذكورة، أو لضيق نفس أو ألم صدر أو تشنج أو إغماء. لا تؤخري المساعدة لقياس الضغط. قد يبقى الخطر بعد الولادة؛ أخبري الفريق بتاريخ الولادة.',
  art:'pregnancy-pressure',scene:'بعد الولادة بأسبوع شعرت آمنة بصداع شديد وزغللة. تذكرت أسرتها أن ما قبل تسمم الحمل قد يظهر بعدها، فتوجهت للتقييم فورًا.',
  question:['ضغط 162/88 أثناء الحمل دون ألم؛ ما التصرف؟',['أنتظر لأن الرقم السفلي طبيعي','أطلب تقييمًا عاجلًا لأن ارتفاع أحد الرقمين يكفي','أضاعف دواء قريبتي'],1],
  sources:['maternalPressureNHS','maternalPreeclampsiaNHS','maternalPressureHome','maternalPressureClinic','maternalWarningCDC'],tags:['mother','family','home'],related:['antenatal','maternal-danger','gestational-diabetes','postpartum-care','blood-pressure'],
  sectionSources:{about:['maternalPressureNHS','maternalPreeclampsiaNHS'],symptoms:['maternalPreeclampsiaNHS'],actions:['maternalPressureClinic','maternalPressureHome'],prevention:['maternalPreeclampsiaNHS'],treatment:['maternalPressureNHS','maternalPreeclampsiaNHS'],avoid:['maternalPressureNHS','maternalWarningCDC'],warning:['maternalPreeclampsiaNHS','maternalWarningCDC']},
  learningSections:[{title:'قبل مغادرة المستشفى بعد الولادة',body:'اسألي عن موعد قياس الضغط التالي، ومدة الدواء، والرقم أو الأعراض التي تستدعي الاتصال، وكيفية مراجعة العلاج أثناء الرضاعة. لا تنتهي متابعة الضغط بمجرد ولادة الطفل.',sources:['maternalPressureNHS','maternalPreeclampsiaNHS']}]
 },
 {
  id:'gestational-diabetes',cat:'mother',title:'سكري الحمل: غذاء كافٍ وقياسات وخطة واضحة',audience:'الحوامل المصابات بسكري الحمل أو المعرضات له وأسرهن',
  hook:'الحرمان من الطعام ليس العلاج، والاحتياج إلى الإنسولين لا يعني فشل الأم.',
  about:'سكري الحمل ارتفاع للسكر يُكتشف أثناء الحمل عندما لا يكفي الإنسولين للاحتياج المتزايد. يمكن أن يصيب من لم يكن لديهن سكري، وكثيرًا ما يزول بعد الولادة. ضبطه يقلل خطر زيادة حجم الطفل وانخفاض سكره بعد الولادة ومضاعفات أخرى.',
  symptoms:['غالبًا لا توجد أعراض واضحة؛ العطش والتبول والتعب قد تتداخل مع الحمل الطبيعي، فلا تعتمدي عليها لنفيه أو إثباته.','قد يلزم فحص مبكر مع سكري حمل سابق، أو فحوص حسب التاريخ وعوامل الخطر.'],
  actions:['اسألي في أول متابعة عن خطة فحص السكري. يُجرى اختبار تحمل الغلوكوز غالبًا بين 24 و28 أسبوعًا بحسب الإرشادات المحلية وعوامل الخطر، وقد يلزم أبكر من ذلك.','إذا شُخّص، تعلمي جهاز القياس وسجلي القيم وأوقات الوجبات. احصلي على أهداف خاصة بالحمل ومتى تتصلين؛ لا تنقلي أهداف شخص آخر.','وزعي الطعام على وجبات منتظمة وحصص نشويات مناسبة، واختاري الحبوب الكاملة والبقول والبروتين والخضار. لا تلغي النشويات كليًا ولا تتبعي حمية تجويع.','استبدلي المشروبات المحلاة والعصائر بالماء، وناقشي حصص الفاكهة مع اختصاصي التغذية. الحركة المسموح بها، مثل المشي بعد الوجبة، قد تساعد.','إذا وُصف الإنسولين، تعلمي علامات هبوط السكر كالرجفة والتعرق والارتباك، وخطة علاجه من فريقك، وما يفعله المرافق عند فقد الوعي.'],
  prevention:['يمكن للغذاء المتوازن والحركة المناسبة دعم ضبط السكر؛ بعض النساء يحتجن دواء رغم التزامهن.','اذكري سكري الحمل في أي حمل لاحق، واسألي عن فحص قبل الحمل أو في بدايته.'],
  treatment:'قد تكفي خطة الغذاء والحركة لبعض النساء، وقد يصف الفريق دواءً أو إنسولين. الإنسولين من العلاجات المستخدمة في الحمل عند الحاجة؛ لا ترفضي العلاج خوفًا من كلمة حقن. تتغير الاحتياجات مع تقدم الحمل، ويضبط الفريق الجرعات دون تعديل ذاتي أو أكل كميات كبيرة ثم زيادتها.',
  avoid:'لا تستخدمي وصفة شخص آخر أو جرعة تصحيح عامة، ولا تؤخري التواصل إذا خرجت القراءات مرارًا عن خطتك. لا توقفي الدواء بعد الولادة دون تعليمات الفريق.',
  warning:'القيء مع عدم القدرة على الشرب، أو تنفس غير طبيعي أو خمول شديد يحتاج تقييمًا عاجلًا. اطلبي الطوارئ عند فقد الوعي؛ لا يُعطى شيء بالفم. وتواصلي فورًا إذا قلت حركة الجنين عن المعتاد.',
  art:'gestational-diabetes',scene:'رأت هناء رقمًا مرتفعًا ففكرت في ترك العشاء. اتصلت بفريقها وراجعت حصص الطعام وخطة العلاج بدل التجويع أو زيادة الجرعة وحدها.',
  question:['هل يحتاج سكري الحمل متابعة بعد الولادة؟',['لا إذا اختفت الأعراض','نعم، فحص وخطة متابعة حتى مع الشعور بالعافية','فقط إذا استمر استعمال الحقن'],1],
  sources:['maternalGdmNHS','maternalGdmTreatment','maternalGdmDiet','maternalWarningCDC','maternalMovementsNHS'],tags:['mother','family','home'],related:['pregnancy-nutrition','diabetes-sick-days','diabetes-hypoglycemia','postpartum-care','antenatal'],
  sectionSources:{about:['maternalGdmNHS'],symptoms:['maternalGdmNHS'],actions:['maternalGdmNHS','maternalGdmTreatment','maternalGdmDiet'],prevention:['maternalGdmNHS','maternalGdmTreatment'],treatment:['maternalGdmTreatment'],avoid:['maternalGdmTreatment'],warning:['maternalWarningCDC','maternalGdmTreatment','maternalMovementsNHS']},
  learningSections:[{title:'لا تنسي موعد ما بعد الولادة',body:'توصي إرشادات NHS بفحص للسكري بعد 6–13 أسبوعًا، ثم فحص سنوي إذا كانت النتيجة طبيعية. اتفقي على نوع الفحص وموعده مع الفريق حسب الخدمة المحلية؛ زوال سكري الحمل لا يلغي زيادة خطر السكري مستقبلًا.',sources:['maternalGdmNHS']}]
 },
 {
  id:'pregnancy-nutrition',cat:'mother',title:'تغذية الحمل: تنوع وسلامة بدل الأكل عن شخصين',audience:'الحوامل ومن يجهزون الطعام لهن',
  hook:'وجبة بسيطة ومتوازنة أنفع من مضاعفة الكمية أو شراء أغذية غالية.',
  about:'يحتاج الحمل غذاءً متنوعًا يدعم الأم ونمو الطفل. لا يلزم الأكل عن شخصين ولا تناول منتج خاص للحمل؛ تتغير الاحتياجات حسب مرحلة الحمل والصحة والوزن السابق. الغذاء الجيد يعمل مع المتابعة والمكملات المناسبة، ولا يستبدلها.',
  symptoms:['قد تغير الغثيان والحموضة الشهية. قلة الأكل المستمرة أو نقص الوزن أو القيء الذي يمنع السوائل تستحق تقييمًا.','التعب والشحوب أو الدوخة لا تثبت نقص الحديد؛ اذكريها في المتابعة بدل علاجها بزيادة الطعام وحده.'],
  actions:['نوّعي بين خضار وفاكهة مغسولة، وخبز أو حبوب كاملة وبقول، ومصدر بروتين، وحليب أو لبن مبستر أو بديل مناسب مدعم.','مثال متاح: عدس أو فاصوليا مع خبز وسلطة مغسولة، ولبن مبستر. اختاري الكمية التي تناسبك واتفاقك مع الفريق، خاصة مع السكري.','اجعلي الماء متاحًا، ووزعي الوجبات إذا أزعجتك الوجبة الكبيرة. اختاري الفاكهة الكاملة بدل العصير المتكرر.','اغسلي اليدين وأدوات إعداد الطعام، وافصلي النيء عن الجاهز، واطهي اللحم والدجاج والبيض جيدًا. احفظي الأغذية المبردة مبردة واتّبعي الصلاحية.'],
  prevention:['تجنبي الحليب غير المبستر واللحوم والأسماك والمحار النيئة. بعض الأجبان الطرية المعتقة تحتاج طهيًا تامًا؛ راجعي الملصق ومصدر الغذاء.','تناولي السمك المطهو من مصدر موثوق واختاري أنواعًا منخفضة الزئبق وفق إرشاد الغذاء المحلي؛ تجنبي الأنواع الكبيرة العالية بالزئبق مثل القرش وأبو سيف. لا يعني الاحتياط منع كل السمك.','لا تتجاوزي 200 ملغ كافيين يوميًا من جميع المصادر؛ تختلف كمية القهوة حسب النوع والحجم. تجنبي الكحول.'],
  treatment:'قد تحتاج من لديها سكري حمل أو فقر دم أو غذاء نباتي صرف أو جراحة سمنة خطة تغذية ومكملات مخصصة. اطلبي إحالة أو نصيحة عملية تراعي الطعام المتاح وقدرتك المالية، وراجعي زيادة الوزن المناسبة لحالتك دون حمية إنقاص قاسية.',
  avoid:'تجنبي الكبد ومنتجاته في الحمل لغناها بفيتامين أ، ولا تتناولي أعشابًا أو خلطات تنحيف على أنها طبيعية وآمنة. لا تحذفي مجموعة غذائية كاملة لمجرد تجربة شخص آخر.',
  warning:'اطلبي تقييمًا سريعًا عند حرارة 38°م أو أكثر، أو قيء يمنع شرب الماء، أو ألم بطن شديد، خاصة بعد طعام مشتبه به. لا تنتظري أن يتأثر الجنين كي تطلبي المساعدة.',
  art:'pregnancy-nutrition',scene:'كانت أسرة مريم تضاعف طبقها يوميًا. اتفقوا على طعام متنوع بكميات مريحة، وحليب مبستر وماء بدل العصائر، وسألوا عن المكملات.',
  question:['أي فكرة أنسب لغذاء الحمل؟',['يجب مضاعفة كل وجبة','التنوع والسلامة وحصص تناسب الحالة','كل طعام طبيعي آمن ولو كان نيئًا'],1],
  sources:['maternalDietNHS','maternalFoodSafety','maternalNauseaNHS','maternalWarningCDC','maternalIronFolateWHO'],tags:['mother','family','home'],related:['pregnancy-supplements','gestational-diabetes','food-safety','anaemia-iron','balanced-food'],
  sectionSources:{about:['maternalDietNHS'],symptoms:['maternalNauseaNHS','maternalIronFolateWHO'],actions:['maternalDietNHS','maternalFoodSafety'],prevention:['maternalFoodSafety'],treatment:['maternalDietNHS','maternalGdmDiet'],avoid:['maternalFoodSafety'],warning:['maternalWarningCDC','maternalNauseaNHS']},
  learningSections:[{title:'سؤال عند شراء الطعام',body:'هل المنتج مبستر؟ هل بقي مبردًا؟ هل يحتاج طهيًا؟ لا يعوّض غسل الطعام عن الطهي المطلوب، ولا تجعل تكلفة الطعام المرتفعة معيارًا لفائدته.',sources:['maternalFoodSafety','maternalDietNHS']}]
 },
 {
  id:'pregnancy-supplements',cat:'mother',title:'فيتامينات الحمل والحديد: اختاري الحاجة وتجنبي التكرار',audience:'من يخططن للحمل والحوامل وأسرهن',
  hook:'الأهم بدء الفوليك في الوقت المناسب وفهم كل عبوة؛ كثرة المكملات لا تعني حماية أكبر.',
  about:'يدعم حمض الفوليك تكوّن الجهاز العصبي المبكر، ويساعد الحديد في تكوين الدم، ولفيتامين د والكالسيوم دور في العظام. تختلف الحاجة باختلاف الغذاء والحالة والخطة المحلية؛ المكملات ليست علاجًا عامًا لكل تعب ولا بديلًا عن الوجبات.',
  symptoms:['قد يكون نقص بعض العناصر بلا أعراض واضحة. التعب وحده لا يحدد أي فيتامين تحتاجينه.','اذكري للطبيب الشحوب أو التنميل أو القيء المطول أو صعوبة تناول الطعام، والنظام النباتي الصرف أو جراحة المعدة؛ فقد تتغير الحاجة إلى ب12 وعناصر أخرى.'],
  actions:['ابدئي حمض الفوليك عند التخطيط للحمل، أو فور معرفته إن لم تبدئي. الجرعة الوقائية المعتادة 400 ميكروغرام يوميًا حتى نهاية الأسبوع 12 للوقاية من عيوب الأنبوب العصبي؛ حالات معينة تحتاج جرعة وصفية أعلى يحددها الطبيب.','توصي منظمة الصحة العالمية بالحديد مع الفوليك خلال الحمل ضمن رعاية الحمل. اتفقي على المستحضر والجرعة والمدة حسب برنامج الرعاية والفحوص، ولا تضيفي الحديد عشوائيًا فوق منتج مركب.','ناقشي فيتامين د وفق عوامل الخطر والغذاء والخطة المحلية، خصوصًا مع قلة الخروج أو تغطية معظم الجلد. الشمس وحدها لا تضمن الكفاية؛ لا تستخدمي أمبولات عالية الجرعة من نفسك.','راجعي الكالسيوم وب12 والغذاء المقيد مع المختص. خذي صور العبوات أو العبوات نفسها للموعد ليتحقق من التكرار والتداخلات.'],
  prevention:['الغذاء المتنوع يمدك بالبروتين والكالسيوم والحديد والفولات؛ الفوليك الوقائي مهم حتى مع الغذاء الجيد.','احفظي الحديد وجميع المكملات بعيدًا عن الأطفال، واطلبي من الصيدلي توضيح الفرق بين الميكروغرام والملغ وطريقة الاستعمال.'],
  treatment:'جرعة علاج نقص مثبت تختلف عن الوقاية. إذا سبب الحديد إمساكًا أو غثيانًا، ناقشي تعديل النوع أو طريقة تناوله بدل إيقافه. لا توقفي مكمل الحديد والفوليك الموصوف لبقية الحمل لمجرد بلوغ الأسبوع 12؛ اتبعي مدته المحددة.',
  avoid:'تجنبي زيت كبد الحوت ومكملات فيتامين أ بصيغة الريتينول في الحمل، والكبد ومنتجاته. لا تجمعي عدة منتجات حمل أو شعر وجلد دون مراجعة الملصق، ولا تأخذي جرعة فوليك عالية دون وصفة.',
  warning:'اشتباه ابتلاع طفل أقراص الحديد حالة طارئة حتى قبل الأعراض. عند اشتباه جرعة زائدة من مكمل أو دواء اطلبي المشورة الطبية عاجلًا، ولا تنتظري ظهور الأعراض، وخذي العبوات معك. القيء الذي يمنع شرب السوائل يحتاج تقييمًا عاجلًا أيضًا.',
  art:'pregnancy-supplements',scene:'اشترت ليلى فيتامين حمل وحبوب شعر وحديدًا إضافيًا. أحضرت العبوات للصيدلي لتحديد ما تحتاجه وإزالة التكرار.',
  question:['وصلت للأسبوع 12 ومعي حديد وفوليك موصوفان لبقية الحمل؛ ماذا أفعل؟',['أوقفهما تلقائيًا','أتبع خطة الفريق ولا أوقف العلاج الموصوف من نفسي','أضاعف الجرعة'],1],
  sources:['maternalVitaminsNHS','maternalIronFolateWHO','maternalBvitaminsNHS','maternalCommonNHS','wellbeingB12NIH','wellbeingVitaminDNIH','wellbeingIronNHS'],tags:['mother','family','home'],related:['vitamin-d','vitamin-b12-folate','anaemia-iron','pregnancy-nutrition','antenatal'],
  sectionSources:{about:['maternalIronFolateWHO','maternalVitaminsNHS'],symptoms:['wellbeingB12NIH','maternalIronFolateWHO'],actions:['maternalBvitaminsNHS','maternalIronFolateWHO','maternalVitaminsNHS','wellbeingB12NIH'],prevention:['maternalDietNHS','maternalBvitaminsNHS','wellbeingIronNHS'],treatment:['maternalIronFolateWHO','maternalCommonNHS'],avoid:['maternalVitaminsNHS'],warning:['wellbeingIronNHS','wellbeingVitaminDNIH','maternalNauseaNHS']},
  learningSections:[{title:'خذي هذه الأسئلة إلى الموعد',bullets:['ما هدف هذا المكمل؟ وما مقدار الجرعة ومدة الاستعمال؟','هل يحتوي فيتامين الحمل على العنصر نفسه؟','هل أفصل المكمل عن دواء أو طعام معين؟ ومتى أعيد الفحص إن لزم؟'],sources:['maternalVitaminsNHS','maternalIronFolateWHO','maternalHeartburnNHS']}]
 },
 {
  id:'pregnancy-discomforts',cat:'mother',title:'غثيان وحموضة وإمساك الحمل: راحة مع الانتباه للخطر',audience:'الحوامل والأسر',
  hook:'شيوع العرض لا يعني احتمالَه مهما اشتد؛ العناية البسيطة لها حدود.',
  about:'قد تسبب تغيرات الحمل غثيانًا وحموضة وإمساكًا وكثرة تبول. تختلف شدتها بين النساء، ويمكن علاج كثير منها بخطوات بسيطة أو دواء مناسب. لا تُفسَّر كل آلام البطن والدوخة والقيء بأنها حمل طبيعي.',
  symptoms:['الغثيان قد يحدث في أي وقت من اليوم، وليس صباحًا فقط. القيء الشديد قد يسبب جفافًا وسوء تغذية ويحتاج علاجًا.','الحموضة قد تزيد بعد وجبة كبيرة أو عند الاستلقاء. الإمساك قد يرتبط بالتغيرات الهرمونية أو بعض المكملات.','كثرة التبول شائعة، لكن الحرقان أو الدم في البول يحتاجان تقييمًا لاحتمال عدوى.'],
  actions:['للغثيان الخفيف: جرّبي وجبات صغيرة متكررة، وتجنبي الروائح المحفزة، وخذي رشفات ماء متكررة وراحة كافية. اطلبي علاجًا إذا عطلك عن الأكل والشرب.','للحموضة: قللي حجم الوجبات، واجلسي باستقامة بعدها، وتجنبي الأكل خلال ثلاث ساعات قبل النوم. حددي الأطعمة التي تزيدها لديك.','للإمساك: زيدي الألياف تدريجيًا من البقول والخضار والفاكهة والحبوب الكاملة، واشربي الماء وتحركي بما يسمح به الحمل.','قومي ببطء من الجلوس. عند الشعور بالإغماء اجلسي سريعًا أو استلقي على جنبك واطلبي المساعدة إذا لم يتحسن أو تكرر.'],
  prevention:['اسألي عن تغيير نوع الحديد إذا زاد الإمساك؛ لا توقفي علاجًا موصوفًا من نفسك.','احملي قائمة الأدوية والمكملات في مراجعاتك، وأخبري الصيدلي بالحمل قبل شراء علاج للحموضة أو الإمساك أو الغثيان.'],
  treatment:'توجد أدوية مناسبة للحمل يختارها المختص للغثيان أو الحموضة أو الإمساك عند الحاجة. بعض مضادات الحموضة تقلل امتصاص الحديد والفوليك؛ توصي NHS بفاصل ساعتين عنها، وتحققي من تعليمات مستحضرك مع الصيدلي. القيء المفرط قد يحتاج سوائل وعلاجًا في المستشفى.',
  avoid:'لا تعالجي ألم أعلى البطن الشديد على أنه حموضة، ولا تتناولي خلطات عشبية أو جرعات ملينات دون سؤال. العجز عن الشرب لا يُعالج بإجبار نفسك على وجبة كبيرة.',
  warning:'اطلبي تقييمًا عاجلًا إذا لم تستطيعي الاحتفاظ بالسوائل، أو قل البول جدًا أو غمق، أو ظهرت دوخة شديدة أو حرارة أو قيء دموي أو ألم شديد. الإغماء أو ضيق النفس أو نزف أو صداع شديد مع تغير الرؤية يستدعي مساعدة فورية.',
  art:'pregnancy-care',scene:'اعتقدت أسرة سارة أن القيء الشديد علامة حمل عادية. عندما قل بولها وعجزت عن شرب الماء طلبوا التقييم بدل انتظار موعد المتابعة.',
  question:['قيء يمنع الماء مع قلة بول ودوخة؛ هل يكفي الانتظار؟',['نعم لأنه شائع','لا، يلزم تقييم عاجل للجفاف والسبب','أتوقف عن كل السوائل'],1],
  sources:['maternalNauseaNHS','maternalHeartburnNHS','maternalCommonNHS','maternalWarningCDC','maternalPreeclampsiaNHS'],tags:['mother','family','home'],related:['antenatal','maternal-danger','pregnancy-pressure','pregnancy-nutrition','pregnancy-supplements'],
  sectionSources:{about:['maternalCommonNHS','maternalNauseaNHS'],symptoms:['maternalNauseaNHS','maternalCommonNHS','maternalHeartburnNHS'],actions:['maternalNauseaNHS','maternalHeartburnNHS','maternalCommonNHS'],prevention:['maternalCommonNHS'],treatment:['maternalNauseaNHS','maternalHeartburnNHS'],avoid:['maternalPreeclampsiaNHS','maternalHeartburnNHS'],warning:['maternalNauseaNHS','maternalWarningCDC','maternalPreeclampsiaNHS']},
  learningSections:[{title:'ماذا أقول عند الاتصال؟',body:'اذكري أسبوع الحمل، ومنذ متى بدأت المشكلة، وقدرتك على الشرب وآخر تبول، وأي ألم أو حرارة أو نزف والأدوية المستخدمة. هذه التفاصيل تساعد الفريق على تحديد سرعة التقييم.',sources:['maternalNauseaNHS','maternalWarningCDC']}]
 },
 {
  id:'pregnancy-movement',cat:'mother',title:'الحركة في الحمل ومتابعة حركة الجنين',audience:'الحوامل والأسر',
  hook:'حركة الأم المناسبة تفيد صحتها، وتغير حركة الجنين المعتادة يستدعي اتصالًا فوريًا.',
  about:'النشاط المناسب يدعم اللياقة والنوم والمزاج، وقد يساعد في خفض خطر سكري الحمل وبعض المضاعفات. الحمل غير المعقد لا يفرض ملازمة الفراش؛ تتكيف الخطة مع صحتك وخبرتك السابقة ومرحلة الحمل وتعليمات فريقك.',
  symptoms:['قد تتغير القدرة على الجهد ويصبح نشاط سابق أقل راحة. التعب الشديد أو الألم أو الدوخة إشارات للتوقف والتقييم عند الحاجة.','تبدأ حركة الجنين عادة بين 16 و24 أسبوعًا، وقد تتأخر ملاحظتها في الحمل الأول. إذا لم تشعري بها بحلول 24 أسبوعًا فأخبري فريق الحمل.'],
  actions:['إذا لم يكن لديك مانع طبي، ابدئي بحركة خفيفة مثل مشي قصير وارفعيها تدريجيًا؛ لا يلزم إكمال المدة دفعة واحدة.','هدف منظمة الصحة العالمية للحامل دون موانع هو 150 دقيقة نشاط هوائي متوسط أسبوعيًا، مع أنشطة تقوية مناسبة. ابدئي بما تستطيعين وناقشي ما يناسب حالتك.','في النشاط المتوسط يمكنك الكلام. اشربي الماء، واختاري وقتًا باردًا وحذاءً آمنًا، وتوقفي عند الانزعاج أو الحرارة الزائدة.','تعرفي نمط حركة جنينك اليومي؛ لا يوجد عدد واحد طبيعي لكل الأجنة. استمري بملاحظته حتى قرب الولادة وأثناء المخاض.'],
  prevention:['تجنبي الرياضات التي قد تسبب سقوطًا أو ضربة للبطن والغوص. أخبري مدرب التمرين بالحمل ولا تبدئي نشاطًا شديدًا جديدًا فجأة.','في أواخر الحمل تجنبي الاستلقاء مسطحة على الظهر أثناء النشاط لأكثر من دقائق؛ غيري الوضع إذا شعرت بالدوخة.'],
  treatment:'إذا كان لديك ضغط حمل أو نزف أو مرض قلبي أو مشكلة أخرى، فقد تحتاجين تعديل النشاط أو إيقاف نوع منه بتوجيه الفريق. الحركة لا تستبدل علاج الضغط أو السكري، وبعد الولادة تعود تدريجيًا بحسب التعافي والولادة وخطة المتابعة.',
  avoid:'لا تواصلي التمرين رغم عرض مقلق، ولا تعتبري قلة حركة الجنين طبيعية لأنه كبر أو اقتربت الولادة. لا تعتمدي على جهاز سماع نبض منزلي لطمأنة نفسك.',
  warning:'إذا قلت حركة الجنين أو توقفت أو تغير نمطها فاتصلي بخدمة الأمومة فورًا، ولو ليلًا؛ لا تنتظري اليوم التالي. أوقفي الجهد واطلبي المساعدة عند نزف أو تسرب سائل أو ألم صدر أو إغماء أو ضيق نفس غير معتاد.',
  art:'pregnancy-care',scene:'انشغلت هدى يومًا كاملًا ثم لاحظت أن حركة الطفل أقل من عادته. اتصلت بوحدة الأمومة في الليلة نفسها ولم تنتظر الصباح أو تستعمل جهاز نبض منزليًا.',
  question:['قلت حركة الجنين بوضوح عن نمطه المعتاد ليلًا؛ ماذا أفعل؟',['أنتظر الغد','أتصل بخدمة الأمومة فورًا','يكفي سماع النبض بجهاز منزلي'],1],
  sources:['maternalExerciseWHO','maternalExerciseNHS','maternalMovementsNHS','maternalWarningCDC'],tags:['mother','family','home'],related:['antenatal','maternal-danger','walking','pregnancy-pressure','gestational-diabetes','postpartum-care'],
  sectionSources:{about:['maternalExerciseNHS','maternalExerciseWHO'],symptoms:['maternalExerciseNHS','maternalMovementsNHS'],actions:['maternalExerciseWHO','maternalExerciseNHS','maternalMovementsNHS'],prevention:['maternalExerciseNHS'],treatment:['maternalExerciseNHS','maternalExerciseWHO'],avoid:['maternalExerciseNHS','maternalMovementsNHS'],warning:['maternalMovementsNHS','maternalWarningCDC']},
  learningSections:[{title:'دعم الأسرة للحركة الآمنة',body:'اختاروا مسارًا آمنًا ومرافقًا عند الحاجة، وساعدوا الحامل على توزيع الجهد والراحة. الهدف عادة قابلة للاستمرار ضمن قدرتها، مع اتصال سريع عند أي تغير مقلق.',sources:['maternalExerciseWHO','maternalExerciseNHS']}]
 }
];
for(const topic of topics){topic.reviewedSources='2026-10-15';topic.sources=[...new Set([...topic.sources,...Object.values(topic.sectionSources).flat(),...topic.learningSections.flatMap(section=>section.sources)])];if(!R.extra.some(a=>a.id===topic.id))R.extra.push(topic);}
R.searchAliases=R.searchAliases||{};
Object.assign(R.searchAliases,{
 'pregnancy-pressure':'ضغط الحمل ارتفاع ضغط الحامل تسمم الحمل ما قبل تسمم الحمل زلال البول صداع زغللة تورم pregnancy hypertension preeclampsia pre-eclampsia',
 'gestational-diabetes':'سكري الحمل سكر الحمل السكر للحامل اختبار تحمل الغلوكوز جلوكوز انسولين إنسولين سكري حمل GDM gestational diabetes',
 'pregnancy-nutrition':'تغذية الحمل تغذية الحامل غذاء الحامل أكل الحامل اكل الحامل الطعام الآمن الاكل للحامل حليب مبستر كافيين سمك زئبق nutrition pregnancy diet',
 'pregnancy-supplements':'فيتامينات الحمل مكملات الحامل حمض الفوليك فوليك اسيد فوليت حديد كالسيوم فيتامين د ب12 ريتينول folic acid prenatal vitamins supplements',
 'pregnancy-discomforts':'غثيان الحمل ترجيع القيء الحملي وحام الوحم حموضة إمساك امساك دوخة الحامل جفاف الحمل hyperemesis morning sickness heartburn constipation',
 'pregnancy-movement':'حركة الحامل رياضة الحمل مشي الحامل حركة الجنين قلة حركة الجنين ركلات نبض الجنين exercise pregnancy fetal movements'
});
})();
