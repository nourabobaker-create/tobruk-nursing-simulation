/* Mother-centred home recovery; primary sources checked 2026-10-15.
 * Practical prompts are original educational wording, informed by health-visiting practice.
 */
(()=>{
'use strict';
const R=window.COMMUNITY_V2;
if(!R)return;
Object.assign(R.sources,{
 postnatalWHO:['منظمة الصحة العالمية','رعاية الأم والمولود بعد الولادة: متابعة الجسد والنفس والدعم الأسري','https://www.who.int/news/item/30-03-2022-who-urges-quality-care-for-women-and-newborns-in-critical-first-weeks-after-childbirth'],
 postnatalBodyNHS:['NHS','الجسم بعد الولادة: النزف والخياطة والتبول وعلامات الخطر','https://www.nhs.uk/pregnancy/labour-and-birth/your-body/'],
 postnatalEarlyNHS:['NHS','الأيام الأولى: رعاية الأم والنزف والحركة والصحة النفسية','https://www.nhs.uk/pregnancy/labour-and-birth/early-days/'],
 postnatalCheckNHS:['NHS','فحص الأم بعد الولادة: الألم والضغط والمزاج والرضاعة','https://www.nhs.uk/baby/support-and-services/your-6-week-postnatal-check/'],
 postnatalContraceptionNHS:['NHS','العلاقة وتنظيم الحمل بعد الولادة','https://www.nhs.uk/baby/support-and-services/sex-and-contraception-after-birth/'],
 postnatalHealthyNHS:['NHS','الغذاء والراحة والحركة مع مولود جديد','https://www.nhs.uk/baby/support-and-services/keeping-fit-and-healthy-with-a-baby/'],
 postnatalCaesareanNHS:['NHS','التعافي بعد القيصرية: الألم والجرح والعودة للنشاط','https://www.nhs.uk/tests-and-treatments/caesarean-section/recovery/'],
 postnatalWoundCUH:['Cambridge University Hospitals NHS','جرح القيصرية: النظافة والجفاف وعلامات العدوى','https://www.cuh.nhs.uk/patient-information/caesarean-section-wound-care-/'],
 postnatalWoundSouthTees:['South Tees Hospitals NHS','ضماد القيصرية: مدة بقائه وتعليمات الفريق الفردية','https://www.southtees.nhs.uk/resources/looking-after-your-caesarean-section-wound-at-home/'],
 postnatalClotRCOG:['الكلية الملكية لأطباء النساء والتوليد RCOG','الوقاية من جلطة الأوردة أثناء الحمل وبعد الولادة','https://www.rcog.org.uk/for-the-public/browse-our-patient-information/reducing-the-risk-of-venous-thrombosis-in-pregnancy-and-after-birth/'],
 postnatalNursingIHV:['Institute of Health Visiting','موارد أسرية من مختصي تمريض الصحة العامة والزيارات المنزلية','https://ihv.org.uk/family-hub/parent-resources/'],
 postnatalNursingUnder5:['Health for Under 5s / NHS','دور الممرض الزائر الصحي: دعم الأسرة والنمو والغذاء والمتابعة','https://healthforunder5s.co.uk/sections/pregnancy/the-role-of-the-health-visitor/'],
 postnatalMidwifeTommys:['Tommy’s — معلومات تقودها قابلات','التعافي الجسدي والنفسي خلال الأسابيع الأولى بعد الولادة','https://www.tommys.org/pregnancy-information/after-birth/your-body-after-birth']
});
const topics=[
 {
  id:'postpartum-care',cat:'mother',title:'الأم بعد الولادة: رعايتكِ لا تنتهي بوصول الطفل',audience:'الأمهات بعد الولادة وأسرهن ومن يساعدهن في المنزل',
  hook:'نزف وألم ورضاعة ومزاج وراحة… للأم خطة متابعة خاصة بها، مثل طفلها.',
  about:'تحتاج الأم إلى رعاية جسدية ونفسية بعد الولادة الطبيعية أو القيصرية. قد يحدث تعب وتقلص بالرحم ونزف يتناقص تدريجيًا، لكن التدهور ليس أمرًا يجب احتماله. تختلف سرعة التعافي بحسب الولادة والصحة والدعم؛ لا تقارني نفسكِ بغيركِ.',
  symptoms:['قد تتغير كمية ولون دم النفاس عبر الأسابيع. النزف الذي يزداد أو ترافقه رائحة كريهة أو حمى أو ألم بطن متزايد يحتاج تواصلًا عاجلًا مع الفريق.','ألم الخياطة أو صعوبة التبول أو الإمساك أو تسرب البول والبراز يستحق السؤال والتقييم؛ ليس المطلوب إخفاؤه خجلًا.','حزن أو قلق مستمر أو صعوبة نوم حتى عند وجود فرصة، أو صعوبة العناية بالنفس والطفل، تحتاج دعمًا مبكرًا.'],
  actions:['قبل الخروج اطلبي خطة مكتوبة لكِ ولطفلكِ: الأدوية، ومواعيد المراجعة، والعناية بالخياطة، وعلامات الخطر، ورقم للتواصل وخطة الوصول للطوارئ.','استخدمي فوطًا مناسبة وبدليها، واغسلي اليدين قبلها وبعدها. نظفي منطقة الخياطة برفق بالماء وجففي بالتربيت وفق إرشاد الفريق.','وزعي الراحة والحركة اللطيفة والطعام والسوائل خلال اليوم. اطلبي من الأسرة عملًا محددًا مثل إعداد وجبة أو رعاية الطفل وأنتِ ترتاحين.','اطلبي مشاهدة رضعة عند الألم أو صعوبة الالتقام. تحدثي عن مزاجكِ وألمكِ وتبولكِ ونزفكِ، ولا تجعلي الزيارة خاصة بوزن الطفل فقط.'],
  prevention:['استمري بمتابعة الضغط أو السكر والحديد والعلاج إذا أوصى الفريق، حتى لو انتهى الحمل. موعد الأم مهم أيضًا إذا كان الطفل بالمستشفى أو حدث فقد للطفل.','ابدئي الحركة وتمارين قاع الحوض بالطريقة التي يشرحها المختص عندما تناسب حالتكِ؛ الألم المستمر أو التسرب يحتاجان تقييمًا. لا تسرعي إلى تمرين عنيف أو حمية قاسية.'],
  treatment:'يعالج الفريق السبب: قد تحتاجين مسكنًا ملائمًا للرضاعة، أو علاج الإمساك، أو فحصًا للعدوى أو فقر الدم، أو علاجًا طبيعيًا ودعمًا نفسيًا. اختاري الدواء مع الطبيب أو الصيدلي ولا تزيدي الجرعة أو تستخدمي وصفة قديمة.',
  avoid:'لا تضعي خلطات أو مواد معطرة على الجرح أو داخل المهبل، ولا تستخدمي السدادات القطنية أو الكؤوس أثناء التئام النفاس. لا تفترضي أن الرضاعة تمنع حملًا جديدًا في كل الظروف؛ ناقشي وسيلة مناسبة مبكرًا.',
  warning:'اطلبي الطوارئ فورًا لنزف مفاجئ شديد أو دوخة/إغماء، أو ألم صدر أو ضيق نفس، أو تشنج. صداع شديد مستمر أو زغللة أو ألم شديد أعلى البطن قد يدل على تسمم حمل حتى بعد الولادة ويحتاج تقييمًا عاجلًا. حمى مع ألم أو إفراز كريه، أو ساق واحدة مؤلمة متورمة: تقييم عاجل. هلوسة أو ارتباك شديد أو خطر إيذاء النفس أو الطفل: مساعدة طارئة ومرافقة آمنة.',
  art:'postpartum-care',scene:'جاءت الأسرة لفحص وزن الطفل، وقالت الأم إن صداعها شديد ورؤيتها مشوشة. أخبرت الفريق فورًا أنها ولدت حديثًا؛ لم تنتظر موعد فحص النفاس.',
  question:['صداع شديد مع زغللة بعد الولادة: ما التصرف؟',['أنتظر انتهاء النفاس','أطلب تقييمًا عاجلًا وأذكر أنني ولدت حديثًا','أزيد المسكن وأنام فقط'],1],
  sources:['postnatalWHO','postnatalBodyNHS','postnatalEarlyNHS','postnatalCheckNHS','postnatalContraceptionNHS','postnatalHealthyNHS','postnatalMidwifeTommys','postnatalNursingIHV','postnatalNursingUnder5','postnatalpsychosis'],
  tags:['mother','family','home'],related:['postpartum-caesarean','postpartum-mood','breastfeeding','maternal-danger','antenatal','anaemia-iron'],
  sectionSources:{about:['postnatalWHO','postnatalMidwifeTommys'],symptoms:['postnatalEarlyNHS','postnatalCheckNHS'],actions:['postnatalWHO','postnatalBodyNHS','postnatalEarlyNHS'],prevention:['postnatalCheckNHS','postnatalEarlyNHS','postnatalHealthyNHS'],treatment:['postnatalBodyNHS','postnatalCheckNHS'],avoid:['postnatalBodyNHS','postnatalContraceptionNHS'],warning:['postnatalBodyNHS','postnatalEarlyNHS','postnatalpsychosis']},
  learningSections:[
   {title:'متى أراجع بعد الولادة؟',body:'توصي منظمة الصحة العالمية للأم والمولود السليمين برعاية أولية بعد الولادة، ثم تواصل إضافي بين 48 و72 ساعة، وبين اليوم السابع والرابع عشر، وفي الأسبوع السادس. رتبي المواعيد مع خدمتكِ المحلية؛ قد تحتاجين أكثر من ذلك بعد مضاعفات أو قيصرية. لا تنتظري موعدًا عند علامة خطر.',sources:['postnatalWHO']},
   {title:'قائمة أسئلة لموعد الأم',bullets:['هل نزفي وألمي يتحسنان؟ وهل الخياطة تلتئم؟','هل أحتاج متابعة ضغط أو سكر أو تحليل دم؟','هل التبول والتبرز والتحكم بهما طبيعي لدي؟','كيف نومي ومزاجي؟ وهل أحتاج دعمًا للرضاعة أو الألم؟','متى أستأنف النشاط والعلاقة؟ وما وسيلة تنظيم الحمل المناسبة؟'],sources:['postnatalCheckNHS','postnatalWHO']},
   {title:'غذاء وماء ودعم عملي',body:'اختاري وجبات متنوعة تشمل مصدر بروتين وخضروات وفاكهة وحبوبًا مناسبة، وخذي سوائل بانتظام وفق حالتكِ الطبية. لا تحتاج الرضاعة إلى خلطات أو إفراط في الحلويات. ناقشي الحديد والفيتامينات بحسب الحاجة؛ مكملات الأم لا تغني تلقائيًا عن مكملات الطفل التي يحددها فريقه.',sources:['postnatalHealthyNHS','postnatalCheckNHS']},
   {title:'العودة للعلاقة وتنظيم الحمل',body:'قد تعود القدرة على الحمل من ثلاثة أسابيع بعد الولادة، قبل أول دورة وحتى مع الرضاعة. ناقشي الوسيلة وتوقيتها مع المختص؛ تتأثر الخيارات بالرضاعة وخطر الجلطات. استئناف العلاقة يكون عندما تكونين مستعدة مع مراعاة الالتئام، والألم المستمر سبب للسؤال.',sources:['postnatalContraceptionNHS']},
   {title:'لأسرتي: ساعدوني بهذه الطريقة',body:'اسألوا الأم عما تحتاجه اليوم دون نقد أو مقارنة، وخففوا عنها الطعام والأعمال والزيارات المرهقة. اتفقوا على من يرافقها ومن يساعد بالطفل عند حاجتها للعلاج. قبل مغادرة الموعد، أعيدوا شرح علامة خطر واحدة ورقم التواصل وموعد الزيارة التالية بكلماتكم للتأكد من الفهم.',sources:['postnatalWHO','postnatalNursingUnder5','postnatalNursingIHV']}
  ]
 },
 {
  id:'postpartum-caesarean',cat:'mother',title:'بعد القيصرية: الجرح والحركة والعناية في البيت',audience:'الأمهات بعد القيصرية وأسرهن',
  hook:'القيصرية عملية جراحية مع مسؤولية مولود جديد؛ اطلبي مساعدة وخطة تناسب تعافيكِ.',
  about:'تحتاج طبقات الجسم إلى وقت للتعافي بعد القيصرية، حتى عندما يبدو الجلد ملتئمًا. اتبعي تعليمات فريق الولادة لأن الضماد والغرز وحدود النشاط تختلف، وارجعي أيضًا إلى دليل رعاية الأم بعد الولادة؛ نزف النفاس والمزاج والضغط مهمون بعد القيصرية أيضًا.',
  symptoms:['قد يحدث ألم وتعب يتحسنان بالتدريج. ألم يزداد بدل أن يتحسن أو يمنع الحركة رغم الدواء يستحق مراجعة.','سخونة أو تورم أو احمرار متزايد حول الجرح، أو قيح أو رائحة أو انفتاح، أو حمى/توعك، قد يدل على مضاعفة. قد يصعب ملاحظة الاحمرار على البشرة الداكنة؛ انتبهي للألم والسخونة والإفراز أيضًا.'],
  actions:['قبل الخروج اسألي: متى أفحص وأغير الضماد؟ هل الغرز تذوب أم تحتاج إزالة؟ متى أستحم؟ وما رقم التواصل عند مشكلة؟','اغسلي اليدين قبل وبعد العناية. عندما يسمح الفريق بتنظيف الجرح استخدمي الماء برفق وجففي دون فرك، وارتدي ملابس مريحة لا تضغط عليه.','تحركي بحذر وعلى فترات قصيرة ضمن المسموح بدل البقاء في الفراش. رتبي مساعدة للنهوض وحمل الأغراض والأعمال المجهدة.','خذي مسكناتكِ وأي وقاية موصوفة من الجلطات بالجرعة والمدة المحددتين. أخبري الصيدلي أنكِ ترضعين وبكل الأدوية الأخرى لتجنب تكرار المسكن.'],
  prevention:['استعملي الإبر أو الجوارب الموصوفة إذا قرر الفريق حاجتكِ إليها؛ المشي لا يسمح بإيقافها من نفسكِ. حافظي على السوائل المناسبة وتجنبي التدخين.','رتبي مكانًا قريبًا للطفل ومستلزماته ومساعدة لحمل ما هو أثقل منه. ارجعي للقيادة والرياضة والعمل والعلاقة وفق تعافيكِ وتعليمات الفريق، دون موعد واحد ملزم لكل أم.'],
  treatment:'يفحص المختص الجرح إذا ظهرت علامات عدوى أو تأخر التئام؛ قد تحتاجين علاجًا أو تغيير خطة الضماد. لا تعني كل مشكلة الحاجة إلى مضاد حيوي، ولا يكفي المضاد المنزلي دون فحص. ناقشي ألمًا غير مسيطر عليه أو صعوبة تبول مبكرًا.',
  avoid:'لا تنزعي غرزًا أو دبابيس أو شريطًا جراحيًا أو ضمادًا خاصًا قبل الموعد الموصوف. لا تضعي أعشابًا أو بودرة أو كحولًا أو كريمًا على الجرح دون توجيه. تجنبي حمل الأثقال وإجهاد البطن قبل السماح بذلك.',
  warning:'ألم صدر أو ضيق نفس مفاجئ أو إغماء أو نزف شديد: طوارئ. ساق واحدة متورمة أو مؤلمة، أو حمى مع جرح مؤلم/قيح، أو انفتاح الجرح أو ألم شديد: تقييم عاجل. الصداع الشديد والزغللة بعد القيصرية أيضًا قد يدلان على تسمم الحمل؛ لا تنسبيهما للتخدير أو السهر دون تقييم.',
  art:'caesarean-care',scene:'قيل لأم أخرى أن تنزع ضمادها بعد يوم، بينما ضماد هذه الأم مقرر لعدة أيام. اتبعت ورقة الخروج وسألت فريقها بدل تطبيق توقيت غيرها.',
  question:['هل موعد إزالة ضماد القيصرية واحد لكل الأمهات؟',['نعم، أنزعه فور الوصول للمنزل','لا؛ أتبع نوع الضماد وخطة فريقي وأتواصل عند تبلله أو مشكلة','أتركه دائمًا مهما حدث'],1],
  sources:['postnatalCaesareanNHS','postnatalWoundCUH','postnatalWoundSouthTees','postnatalClotRCOG','postnatalBodyNHS','postnatalWHO'],tags:['mother','family','home'],related:['postpartum-care','postpartum-mood','breastfeeding','maternal-danger','after-surgery','venous-clot-care'],
  sectionSources:{about:['postnatalCaesareanNHS','postnatalWHO'],symptoms:['postnatalWoundCUH','postnatalCaesareanNHS'],actions:['postnatalWoundCUH','postnatalWoundSouthTees','postnatalCaesareanNHS'],prevention:['postnatalClotRCOG','postnatalCaesareanNHS'],treatment:['postnatalWoundCUH','postnatalCaesareanNHS'],avoid:['postnatalWoundSouthTees','postnatalWoundCUH','postnatalCaesareanNHS'],warning:['postnatalBodyNHS','postnatalCaesareanNHS','postnatalClotRCOG']},
  learningSections:[
   {title:'الضماد: اتبعي ورقتكِ لا تجربة جارتكِ',body:'تختلف الضمادات؛ بعضها يراجع بعد يوم وبعضها يبقى عدة أيام، وقد يستعمل جهاز أو ضماد خاص. اعرفي موعد الإزالة أو المراجعة وطريقة الاستحمام من فريقكِ. إذا تبلل الضماد أو انفك أو تسرب سائل فاطلبي تعليمات بدل تبديله عشوائيًا.',sources:['postnatalWoundCUH','postnatalWoundSouthTees']},
   {title:'فحص لطيف مرة كل يوم',body:'انظري إلى الجرح إذا كان مكشوفًا حسب الخطة دون لمس أو فتح حوافه، أو اطلبي مساعدة شخص توافقين عليه. راقبي التغير في الألم والسخونة والتورم والإفراز وحرارة الجسم، وأبلغي مبكرًا. لا تنتظري ظهور الاحمرار وحده ولا تزيلي الضماد فقط للتصوير.',sources:['postnatalWoundCUH','postnatalWoundSouthTees']},
   {title:'حركة ووقاية تناسبان حالتكِ',body:'الحركة اللطيفة المنتظمة جزء من التعافي. يقدر الفريق خطر الجلطات وفق الولادة وعوامل مثل جلطة سابقة وقلة الحركة، ويحدد الحاجة إلى الوقاية ومدتها. ألم وتورم ساق واحدة يحتاجان تقييمًا؛ مع ألم صدر أو صعوبة تنفس اطلبي الطوارئ فورًا.',sources:['postnatalClotRCOG','postnatalCaesareanNHS']},
   {title:'قبل العودة للبيت: تأكدي من أربع إجابات',bullets:['كيف أعتني بضمادي وجرحي، ومن يراجع الغرز ومتى؟','ما أسماء الأدوية والجرعات والمدة، وهل تلائم الرضاعة؟','ما الحركة والحمل والقيادة المسموح بها الآن؟','بمن أتصل، وما موعد فحصي، ومن يساعدني بالطفل والبيت؟'],sources:['postnatalCaesareanNHS','postnatalWoundSouthTees','postnatalWHO']}
  ]
 }
];
for(const a of topics){a.reviewedSources='2026-10-15';if(!R.extra.some(x=>x.id===a.id))R.extra.push(a);}
const mood=R.extra.find(x=>x.id==='postpartum-mood')||R.details['postpartum-mood'];
if(mood)mood.alsoCats=[...new Set([...(mood.alsoCats||[]),'mother'])];
if(R.details.antenatal)R.details.antenatal.related=[...new Set([...(R.details.antenatal.related||[]),'pregnancy-pressure','gestational-diabetes','pregnancy-nutrition','pregnancy-supplements','pregnancy-discomforts','pregnancy-movement','postpartum-care','postpartum-caesarean','postpartum-mood','breastfeeding','maternal-danger','newborn-check'])];
R.searchAliases=R.searchAliases||{};
Object.assign(R.searchAliases,{
 'postpartum-care':'بعد الولادة النفاس نفاس العناية بالام العناية بالأم الوالدة رعاية الام رعاية الأم الولادة الطبيعية نزف نزيف خياطة عجان قاع الحوض اكتئاب تنظيم الحمل',
 'postpartum-caesarean':'قيصرية القيصرية قيصريه جرح القيصرية العملية القيصرية بعد الولادة ضماد غرز خياطة دبابيس رضاعة رضاعه تعافي الام'
});
})();
