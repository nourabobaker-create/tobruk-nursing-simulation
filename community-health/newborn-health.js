/* Newborn family education. Primary sources checked 15 October 2026; no clinical sign-off implied. */
(()=>{
'use strict';
const R=window.COMMUNITY_V2;
if(!R)return;
Object.assign(R.sources,{
 newbornWHO:['منظمة الصحة العالمية','الرعاية الأساسية للمولود: الرضاعة والدفء والوقاية واكتشاف الخطر','https://www.who.int/teams/maternal-newborn-child-adolescent-health-and-ageing/newborn-health/essential-newborn-care'],
 newbornWHODanger:['منظمة الصحة العالمية — المكتب الأوروبي','صحة المولود: علامات الخطر والمتابعة والتطعيم','https://www.who.int/europe/news-room/fact-sheets/item/newborn-health'],
 newbornNIPE:['NHS','الفحص البدني للمولود وفحص العين والقلب والوركين والخصيتين','https://www.nhs.uk/baby/newborn-screening/physical-examination/'],
 newbornExamQld:['Queensland Health','التقييم الروتيني الشامل للمولود، بما فيه الأعضاء التناسلية والإخراج','https://www.health.qld.gov.au/__data/assets/pdf_file/0029/141689/g-newexam.pdf'],
 newbornReflex:['NHS England — GOV.UK','برنامج فحص المولود: الفحص المتخصص للانعكاس الأحمر بالعين','https://www.gov.uk/government/publications/newborn-and-infant-physical-examination-programme-handbook/newborn-and-infant-physical-examination-screening-programme-handbook'],
 newbornOxygen:['NHS — شبكة حديثي الولادة جنوب شرق إنجلترا','قياس أكسجة المولود ضمن التحري عن عيوب القلب الحرجة','https://neonatalnetworkssoutheast.nhs.uk/professionals/guidelines/tvw-guidelines/pulse-oximetry-screening/'],
 newbornHearing:['NHS','فحص سمع المولود وضرورة استكمال النتيجة غير الواضحة','https://www.nhs.uk/baby/newborn-screening/hearing-test/'],
 newbornBloodspot:['NHS','فحص بقعة الدم للمولود والمتابعة والنتائج','https://www.nhs.uk/baby/newborn-screening/blood-spot-test/'],
 newbornBody:['NHS','التعرف على المولود: السرة وفيتامين ك والتغيرات المبكرة','https://www.nhs.uk/pregnancy/labour-and-birth/getting-to-know-your-newborn/'],
 newbornTestes:['NHS','الخصية المعلقة: الفحص والمتابعة والإحالة','https://www.nhs.uk/conditions/undescended-testicles/'],
 newbornHypospadias:['Leeds Teaching Hospitals NHS','الإحليل التحتي وتأجيل الختان لحين مراجعة اختصاصي المسالك','https://www.leedsth.nhs.uk/patients/resources/hypospadias-repair/'],
 newbornScrotum:['NHS','ألم الخصية والتورم والعلامات التي تستلزم الرعاية العاجلة','https://www.nhs.uk/symptoms/testicle-pain/'],
 newbornNappy:['NHS','النظافة اللطيفة وتغيير الحفاض ومسح الأنثى من الأمام إلى الخلف','https://www.nhs.uk/baby/caring-for-a-newborn/how-to-change-your-babys-nappy/'],
 newbornAppearance:['Seattle Children’s','تغيرات المولود الطبيعية والعناية بالثدي والقلفة','https://www.seattlechildrens.org/conditions/a-z/newborn-appearance-questions/'],
 newbornGirlBleed:['Seattle Children’s','النزف المهبلي: التبقع الهرموني القصير عند المولودة وعلامات المراجعة','https://www.seattlechildrens.org/conditions/a-z/vaginal-bleeding/'],
 newbornFGM:['منظمة الصحة العالمية','ختان الإناث: لا فوائد صحية وأضرار ومضاعفات محتملة','https://www.who.int/news-room/fact-sheets/detail/female-genital-mutilation'],
 newbornMilk:['NHS','علامات كفاية حليب الأم والحفاضات حسب عمر المولود','https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/breastfeeding-problems/enough-milk/'],
 newbornJaundice:['NHS','يرقان المولود وعلامات الفحص العاجل','https://www.nhs.uk/conditions/jaundice-in-babies/'],
 newbornSleep:['NHS','النوم الآمن وتقليل خطر الموت المفاجئ للرضيع','https://www.nhs.uk/baby/caring-for-a-newborn/sudden-infant-death-syndrome-sids/'],
 newbornElimination:['Child and Adolescent Health Service — أستراليا الغربية','خروج البول والعقي في الأيام الأولى للمولود','https://www.cahs.health.wa.gov.au/~/media/HSPs/CAHS/Documents/Health-Professionals/Neonatology-guidelines/Fluid-Balance-and-Elimination.pdf']
});
const topics=[
 {
  id:'newborn-check',cat:'mother',alsoCats:['child'],title:'فحص المولود: قائمة للأسرة قبل مغادرة مكان الولادة',audience:'الأمهات والآباء وكل من يرعى مولودًا',
  hook:'المظهر الجيد لا يغني عن الفحص؛ اسأل ماذا فُحص وما موعد المتابعة.',
  about:'يحتاج كل مولود، ذكرًا أو أنثى، تقييمًا بعد الولادة وفحصًا شاملًا يجريه طبيب أو ممرض أو قابلة مدربون. في برنامج NHS يتم الفحص خلال 72 ساعة ويعاد في عمر 6–8 أسابيع؛ هذا مثال لتنظيم الخدمة وليس جدولًا ليبيًا معتمدًا. اتفق مع جهة الولادة على مواعيد طفلك المحلية.',
  symptoms:['قد لا تكون لبعض المشكلات الخلقية أعراض واضحة في البداية. اذكر تاريخ العائلة وأي قلق بشأن الرضاعة أو التنفس أو الحركة.','ضعف الرضاعة أو قلة النشاط أو تغير اللون والتنفس يستدعي إبلاغ الفريق، حتى لو كانت نتيجة الفحص الأولى مطمئنة.'],
  actions:['اطلب توثيق وزن الولادة وتقييم الرضاعة والحرارة واليرقان، وفحص الرأس والفم والجلد والظهر والأطراف والبطن والسرة.','اسأل عن فحص العين، بما فيه الانعكاس الأحمر بأداة مناسبة، وعن القلب والنبض، وعن فحص الوركين بواسطة مدرب. قد يجرى قياس الأكسجة ضمن برنامج المركز للتحري عن عيوب القلب.','تأكد أن المختص فحص الأعضاء التناسلية وفتحة الشرج وسأل عن خروج البول والعقي، وأن نزول الخصيتين موثق للذكر. اذكر أي مشكلة في التبول.','اسأل عن فحص السمع وبقعة الدم حسب الخدمات والجدول المحلي، وكيف تستلم النتائج ومن يتابعها. لا تعتبر عدم الاتصال دليلًا على أن كل نتيجة طبيعية.'],
  prevention:['احتفظ بسجل المولود وورقة الخروج والمواعيد. اسأل عن فيتامين ك للوقاية من النزف وعن التطعيمات وفق الجدول المحلي.','قبل العودة للبيت اعرف أين تطلب المساعدة ومتى تعاد مراجعة الوزن والرضاعة واليرقان والفحص البدني.'],
  treatment:'وجود ملاحظة في فحص التحري لا يعني تشخيصًا نهائيًا؛ قد يحتاج الطفل إعادة فحص أو إحالة. والنتيجة الطبيعية لا تكشف كل مشكلة ولا تلغي مراجعة الأعراض الجديدة. أكمل الإحالة في الموعد الذي يحدده الفريق.',
  avoid:'لا تحاول اختبار الورك بتحريك الساق بعنف، ولا تفحص العين بفلاش الهاتف بدل المختص. لا تدخل أداة في أي فتحة للتأكد من أنها مفتوحة، ولا ترسل صور الأعضاء الخاصة طلبًا للتشخيص.',
  warning:'صعوبة التنفس أو الزرقة أو التشنج أو صعوبة الإيقاظ طوارئ. ضعف الرضاعة أو سخونة أو برودة غير معتادة يحتاج تقييمًا عاجلًا. اصفرار خلال أول 24 ساعة يستلزم فحصًا فورًا؛ لا تنتظر موعد المتابعة.',
  art:'newborn-check',scene:'قبل الخروج سألت أسرة ليان عن فحص العين والقلب والوركين والسمع، وأخذت موعد متابعة ووسيلة اتصال واضحة.',
  question:['ما دور الأسرة في فحص الوركين؟',['تكرار المناورة في المنزل','التأكد من فحصهما بواسطة مختص وتوثيق المتابعة','الانتظار حتى يبدأ الطفل المشي'],1],
  sources:['newbornNIPE','newbornExamQld','newbornReflex','newbornOxygen','newbornHearing','newbornBloodspot','newbornWHO','newbornWHODanger','newbornBody','newbornJaundice'],tags:['family','home','mother','child'],related:['newborn-boy','newborn-girl','newborn-first-week','breastfeeding','maternal-danger','child-fever'],
  sectionSources:{about:['newbornNIPE'],symptoms:['newbornWHO','newbornWHODanger'],actions:['newbornExamQld','newbornReflex','newbornOxygen','newbornHearing','newbornBloodspot'],prevention:['newbornBody','newbornWHODanger'],treatment:['newbornNIPE','newbornHearing','newbornBloodspot'],avoid:['newbornNIPE','newbornReflex','newbornExamQld'],warning:['newbornWHODanger','newbornJaundice']},
  learningSections:[{title:'ثلاثة أسئلة خذ إجاباتها مكتوبة',bullets:['ما الفحوص المكتملة، وما الذي بقي؟','متى وأين تصل النتائج، وهل توجد إحالة؟','ما موعد المتابعة وأين نذهب عند ظهور علامة خطر؟'],sources:['newbornNIPE','newbornHearing','newbornBloodspot']}]
 },
 {
  id:'newborn-boy',cat:'mother',alsoCats:['child'],title:'المولود الذكر: الخصيتان وفتحة البول والعناية اللطيفة',audience:'أسر المواليد الذكور ومقدمو رعايتهم',
  hook:'اطلب فحصًا موثقًا قبل الختان؛ لا تشد القلفة ولا تحاول إنزال الخصية بيدك.',
  about:'يفحص المختص موضع فتحة البول وشكل القضيب وكيس الصفن ووجود الخصيتين فيه. قد تكون بعض التغيرات بسيطة، لكن التمييز بينها يحتاج فحصًا مباشرًا. ليس الهدف أن تعيد الأسرة فحص الأعضاء أو تقيسها في المنزل.',
  symptoms:['قد تُكتشف خصية غير نازلة دون ألم. وقد يبدو كيس الصفن ممتلئًا بسبب تجمع سائل؛ لا تفترض أن كل تورم هواء أو ماء بسيط.','الإحليل التحتي يعني أن فتحة البول ليست في موضعها المعتاد قرب طرف القضيب؛ قد يصاحبه انحناء أو اختلاف في شكل القلفة. يحدده المختص.'],
  actions:['اسأل: هل الخصيتان موجودتان في الصفن؟ هل فتحة البول واندفاع البول طبيعيان؟ اطلب كتابة أي ملاحظة وخطة المراجعة.','إذا لم تنزل إحدى الخصيتين فاتبع مواعيد إعادة الفحص والإحالة المبكرة؛ لا تنتظر سنوات. إذا أخبرك المختص أن الخصيتين معًا غير نازلتين أو أن شكل الأعضاء غير واضح، اطلب تقييم طب الأطفال العاجل ولا تنتظر فحص الأسابيع اللاحقة.','إذا وُجد اشتباه بالإحليل التحتي أو عيب في القضيب، أَجّل الختان حتى تقييم اختصاصي مسالك الأطفال؛ قد يحتاج الإصلاح إلى جلد القلفة.','بلّغ الفريق إذا لم تر خروج البول خلال أول 24 ساعة؛ يحتاج ذلك مراجعة الرضاعة وفحصًا، ولا يثبت وحده وجود انسداد.'],
  prevention:['نظف خارج القضيب وحول كيس الصفن بلطف بماء مناسب، وغيّر الحفاض المبتل أو المتسخ سريعًا. اغسل يديك قبل التغيير وبعده.','القلفة الملتصقة برأس القضيب شائعة وطبيعية في الرضاعة؛ لا يلزم كشف الرأس لتنظيف المولود.'],
  treatment:'يعتمد العلاج على نتيجة الفحص. قد تنزل الخصية تلقائيًا في الأشهر الأولى، لكن استمرار عدم نزولها يحتاج إحالة وقد يتطلب جراحة في العمر المناسب. يُقيّم الإحليل التحتي بصورة فردية؛ ليس كل اختلاف يحتاج الإجراء نفسه. اطلب تعليمات مكتوبة لأي عملية لاحقة.',
  avoid:'لا تشد القلفة بالقوة، ولا تضغط على الصفن أو تدلكه لإنزال الخصية، ولا تستخدم زيوتًا أو خلطات أو ربطًا لعلاج التورم. لا تحاول تشخيصه بإضاءة الهاتف.',
  warning:'تورم صفني مفاجئ، أو احمرار أو لون داكن جديد، خصوصًا مع ألم أو بكاء شديد أو قيء، يستلزم طوارئ فورًا لاحتمال مشكلة تحتاج علاجًا سريعًا. عدم التبول أو تدهور الرضاعة والنشاط يستدعي تقييمًا عاجلًا.',
  art:'newborn-care',scene:'لاحظ الفريق اختلاف موضع فتحة البول عند يوسف. أخذت أسرته إحالة وأجّلت الختان حتى مناقشة الخطة مع الاختصاصي.',
  question:['وُجد اشتباه بالإحليل التحتي قبل الختان؛ ما الخطوة؟',['إجراء الختان سريعًا لإصلاحه','شد القلفة للتأكد','تأجيل الختان وطلب تقييم اختصاصي مسالك الأطفال'],2],
  sources:['newbornExamQld','newbornTestes','newbornHypospadias','newbornNappy','newbornAppearance','newbornScrotum','newbornElimination'],tags:['family','home','mother','child'],related:['newborn-check','newborn-first-week','newborn-girl','breastfeeding'],
  sectionSources:{about:['newbornExamQld','newbornHypospadias'],symptoms:['newbornTestes','newbornAppearance','newbornHypospadias'],actions:['newbornTestes','newbornExamQld','newbornHypospadias','newbornElimination'],prevention:['newbornNappy','newbornAppearance'],treatment:['newbornTestes','newbornHypospadias'],avoid:['newbornNappy','newbornAppearance','newbornExamQld'],warning:['newbornScrotum','newbornExamQld','newbornElimination']},
  learningSections:[{title:'المتابعة لها موعد',body:'اسأل عن موعد إعادة فحص الخصية ومتى تتم الإحالة إذا لم تنزل. تتحدد الخطة بحسب جهة أو جهتي الإصابة وعمر الطفل وكونه خديجًا ونتيجة الفحص؛ دوّن الموعد بدل الاكتفاء بعبارة «ستنزل وحدها».',sources:['newbornTestes']}]
 },
 {
  id:'newborn-girl',cat:'mother',alsoCats:['child'],title:'المولودة الأنثى: الفحص والنظافة وما قد يكون طبيعيًا',audience:'أسر المواليد الإناث ومقدمو رعايتهن',
  hook:'العناية لطيفة وخارجية؛ التغير الهرموني القصير يختلف عن نزف مستمر أو مرض.',
  about:'يشمل فحص المولودة تقييم الأعضاء التناسلية الخارجية بواسطة مختص، مع التأكد من خروج البول وفحص فتحة الشرج. يجري ذلك بخصوصية واحترام وبحضور أحد الوالدين وفق إجراءات المركز. هذا فحص صحي لا يتطلب من الأسرة إدخال شيء أو فحص غشاء البكارة.',
  symptoms:['قد يظهر انتفاخ بسيط مبكر في الأعضاء الخارجية أو إفراز أبيض، وأحيانًا تبقع دموي قليل خلال الأيام الأولى بسبب تغير هرمونات الأم بعد الولادة.','قد يكون الثديان منتفخين لدى الذكر أو الأنثى وقد يخرج قليل من السائل؛ لا تعصرهما. التغيرات المصحوبة باحمرار أو ألم أو مرض لا تُعامل كتغير طبيعي.'],
  actions:['اسألي الفريق إن كان الفحص الخارجي وخروج البول والعقي موثقين، واذكري أي تورم غير معتاد أو صعوبة في التبول.','بلّغي عن عدم مشاهدة البول خلال أول 24 ساعة، أو نقص واضح لاحقًا. أبلغي الفريق إذا لم يخرج العقي في اليوم الأول واستكملي المتابعة حسب توجيهه؛ عدم خروجه خلال 48 ساعة يحتاج فحصًا، والقيء الأخضر أو انتفاخ البطن يستلزم تقييمًا فوريًا قبل ذلك.','إذا ظهر دم على الحفاض فلاحظي كميته ومدته وأبلغي المختص عند الشك في مصدره؛ لا تفترضي أن كل دم نزف هرموني طبيعي.'],
  prevention:['اغسلي اليدين، ونظفي المنطقة الخارجية بلطف بماء فاتر ومن الأمام إلى الخلف بقطنة نظيفة؛ غيّري الحفاض بعد الاتساخ وجففي دون فرك.','احمي الجلد من المهيجات والعطور. لا توجد حاجة لغسول داخلي أو تعقيم متكرر أو وصفة عشبية لتنظيف المولودة.'],
  treatment:'التبقع الهرموني البسيط القصير لا يحتاج عادة دواء، لكن النزف الغزير أو المستمر أو العائد بعد توقفه يحتاج تقييمًا. يقرر المختص إن كانت المشكلة التهابًا أو تهيجًا أو اختلافًا خلقيًا. لا تحاولي فصل نسيج ملتصق أو معالجة تورم بيدك.',
  avoid:'لا تدخلي إصبعًا أو عود قطن أو مطهرًا داخل المهبل، ولا ترسلي صور الأعضاء الخاصة. لا تعصري الثدي أو تدلكيه. ختان الإناث لا يقدم فائدة صحية وقد يسبب نزفًا وعدوى ومشكلات بولية؛ الفحص الصحي لا يستلزم أي قطع أو وخز.',
  warning:'نزف واضح أو غزير، إفراز قيحي أو كريه الرائحة، احمرار أو تورم مؤلم، أو صعوبة تبول يستلزم مراجعة سريعة. مع حرارة أو برودة غير معتادة أو خمول أو ضعف رضاعة يكون التقييم عاجلًا؛ لا تنتظري زوال الإفراز وحده.',
  art:'newborn-care',scene:'رأت أم سلمى تبقعًا قليلًا في الأيام الأولى فسألت القابلة. تعلمت مراقبة المدة والكمية والتنظيف الخارجي وعلامات المراجعة.',
  question:['أي طريقة تناسب نظافة المولودة؟',['تنظيف خارجي لطيف من الأمام إلى الخلف','غسول داخلي يومي','عصر الثدي لإخراج السائل'],0],
  sources:['newbornExamQld','newbornBody','newbornAppearance','newbornGirlBleed','newbornNappy','newbornFGM','newbornElimination','newbornWHODanger'],tags:['family','home','mother','child'],related:['newborn-check','newborn-first-week','newborn-boy','child-fever','breastfeeding'],
  sectionSources:{about:['newbornExamQld'],symptoms:['newbornBody','newbornAppearance'],actions:['newbornExamQld','newbornElimination','newbornGirlBleed'],prevention:['newbornNappy'],treatment:['newbornGirlBleed','newbornExamQld'],avoid:['newbornNappy','newbornAppearance','newbornFGM'],warning:['newbornGirlBleed','newbornExamQld','newbornWHODanger']},
  learningSections:[{title:'ما حدود التبقع الهرموني؟',body:'يكون قليلًا وقصيرًا في بداية الحياة؛ تشير إرشادات Seattle Children’s إلى أنه قد يبدأ بين اليوم الثاني والعاشر، وعادة لا يدوم أكثر من 3–4 أيام. أي نزف لا يوافق هذا النمط أو يرافقه مرض يستحق سؤال المختص، والغزير يستدعي مراجعة عاجلة.',sources:['newbornGirlBleed']}]
 },
 {
  id:'newborn-first-week',cat:'mother',alsoCats:['child'],title:'أول أسبوع للمولود: الرضاعة واليرقان والسرة والنوم الآمن',audience:'الأمهات والآباء ومقدمو رعاية حديثي الولادة',
  hook:'راقب الرضاعة والنشاط والحفاضات، وخذ القلق على المولود بجدية.',
  about:'الأيام الأولى فترة للتأقلم ولمتابعة الوزن والرضاعة والحرارة واليرقان. دعم الأسرة وموعد المتابعة المبكر يساعدان على اكتشاف مشكلة قبل تفاقمها. يحتاج الخديج أو المولود المريض خطة خاصة؛ لا تطبق عليه جدول طفل آخر.',
  symptoms:['المص والبلع واليقظة عند الاستيقاظ وازدياد البول مع العمر تساعد في تقييم الرضاعة. طول النوم وحده لا يثبت الشبع.','قد يبدأ الاصفرار بعد اليوم الأول، لكنه يحتاج تقييمًا عند ظهوره؛ درجة اللون بالعين وحدها لا تحدد شدته. البول الداكن أو البراز الشاحب علامتان تحتاجان مراجعة.'],
  actions:['اطلب دعمًا مبكرًا إذا كان الالتقام مؤلمًا أو البلع قليلًا أو الرضعات ضعيفة. قدّم الرضعة مع الإشارات المبكرة للجوع بدل انتظار بكاء شديد؛ اسأل عن إيقاظ الطفل إذا كان نعسانًا أو لديه خطة تغذية.','سجّل الرضعات والحفاضات عند القلق. في أول 48 ساعة قد توجد 2–3 حفاضات مبللة إجمالًا؛ من اليوم الخامس تتوقع عادة 6 حفاضات ثقيلة مبللة أو أكثر خلال 24 ساعة. العدد يُفسر مع العمر والوزن وحالة الطفل.','حافظ على السرة نظيفة وجافة، واتبع تعليمات الفريق إذا وُصف مستحضر خاص وفق البروتوكول المحلي. اطلب المساعدة مع نزف أو إفراز أو احمرار ممتد.','تأكد من موعد مراجعة الوزن والرضاعة واليرقان، واستكمال فحوص المولود والتطعيمات.'],
  prevention:['ضع الطفل على ظهره لكل نوم، في سرير مستقل ذي مرتبة ثابتة ومسطحة داخل غرفة الوالدين أول ستة أشهر. أبعد الوسائد والألعاب والأغطية الرخوة عن وجهه.','لا تدخن قربه، وتجنب زيادة تدفئته. لا تنم حاملًا إياه على أريكة أو كرسي؛ اطلب من شخص يقظ مساعدتك عندما يغلبك النعاس.'],
  treatment:'علاج اليرقان يعتمد على فحص مستوى البيليروبين وعمر المولود وعوامل الخطر، وقد يتطلب علاجًا ضوئيًا. استمر في دعم التغذية حسب خطة الفريق؛ لا تعالج الاصفرار بتعريض الطفل للشمس أو ماء السكر أو الأعشاب.',
  avoid:'لا تجعل الماء أو الأعشاب بديلًا للرضعة، ولا تطل الفواصل بين الرضعات لمجرد أن الطفل هادئ جدًا. لا تضف خلطات للسرة ولا تؤخر التقييم لتجربة علاج منزلي.',
  warning:'اصفرار أول 24 ساعة، أو صعوبة إيقاظ أو تنفس أو زرقة أو تشنج، يستدعي مساعدة فورية. حرارة 38°م أو أكثر عند مولود، أو برودة غير معتادة أو ضعف رضاعة أو قلة بول، يحتاج تقييمًا عاجلًا. القيء الأخضر طارئ أيضًا.',
  art:'newborn-care',scene:'نام آدم طويلًا وقلت حفاضاته، فلم تفترض أسرته أنه شبعان؛ طلبت تقييم الرضاعة والوزن واليرقان في اليوم نفسه.',
  question:['ظهر اصفرار على المولود خلال أول 24 ساعة؛ ماذا نفعل؟',['نعرضه للشمس وننتظر','نطلب تقييمًا فوريًا','نعطي ماء سكر'],1],
  sources:['newbornWHO','newbornWHODanger','newbornMilk','newbornBody','newbornJaundice','newbornSleep','newbornExamQld'],tags:['family','home','mother','child'],related:['newborn-check','breastfeeding','newborn-boy','newborn-girl','maternal-danger','child-dehydration','child-fever'],
  sectionSources:{about:['newbornWHO','newbornExamQld'],symptoms:['newbornMilk','newbornJaundice'],actions:['newbornMilk','newbornBody','newbornWHODanger'],prevention:['newbornSleep'],treatment:['newbornJaundice','newbornWHO'],avoid:['newbornWHO','newbornBody'],warning:['newbornJaundice','newbornWHODanger','newbornExamQld']},
  learningSections:[{title:'نوم آمن حتى عند الإرهاق',body:'يزداد خطر مشاركة السرير مع التدخين أو الكحول أو دواء يسبب النعاس، ومع الخداج أو انخفاض وزن الولادة. جهّز سرير المولود قريبًا وأعده إليه بعد الرضعة قبل أن تغفو؛ لا تستخدم كرسي السيارة مكان نوم دائمًا بعد الوصول.',sources:['newbornSleep']}]
 }
];
for(const topic of topics){topic.reviewedSources='2026-10-15';if(!R.extra.some(a=>a.id===topic.id))R.extra.push(topic);}
R.searchAliases=R.searchAliases||{};
Object.assign(R.searchAliases,{
 'newborn-check':'فحص المولود الذكر والأنثى فحص المولود فحص حديث الولادة الفحص البدني مولود جديد ولاده عين قلب ورك انعكاس أحمر سمع بقعة الدم newborn NIPE screening',
 'newborn-boy':'فحص المولود الذكر المولود الذكر فحص الولد مولود الخصيه الخصية المعلقة الخصيتان الصفن القلفة إحليل تحتي احليل تحتي فتحة البول ختان hypospadias testes',
 'newborn-girl':'فحص المولودة الأنثى المولودة الأنثى المولودة الانثى الأنثى البنت فحص البنت مولوده نزف مهبلي افراز إفراز أبيض ابيض حفاض ختان الإناث بنت newborn girl',
 'newborn-first-week':'الأسبوع الأول للمولود مولود أول أسبوع اول اسبوع حديث الولادة يرقان صفار صفراء اصفرار سرة رضاعة نوم آمن نوم امن حفاض حفاضات بول عقي jaundice newborn sleep'
});
})();
