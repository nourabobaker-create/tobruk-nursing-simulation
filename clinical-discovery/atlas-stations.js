/* Original bilingual exercises and schematic drawings for the Nursing Pocket Atlas. */
(() => {
  'use strict';
  const stationDate = '20 November 2026|20 نوفمبر 2026';
  const chapter = 'stations';
  window.ATLAS_CATS[chapter] = ['Visual practice stations', 'محطات التدريب البصري', 'station-oximeter',
    'Read a drawing, identify its parts and test your interpretation.', 'اقرأ الرسم، وحدّد أجزاءه، واختبر فهمك لما تراه.'];
  Object.assign(window.ATLAS_SOURCES, {
    'station-label': ['Open RN · Nursing Skills, Math Calculations', 'https://www.ncbi.nlm.nih.gov/books/NBK593207/'],
    'station-syringe': ['OpenStax · Clinical Nursing Skills, Syringes (12.2)', 'https://openstax.org/books/clinical-nursing-skills/pages/12-2-administering-parenteral-medications'],
    'station-oximetry': ['FDA · Pulse Oximeter Basics', 'https://www.fda.gov/consumers/consumer-updates/pulse-oximeter-basics'],
    'station-temperature': ['OpenStax · Clinical Nursing Skills, Temperature (15.4)', 'https://openstax.org/books/clinical-nursing-skills/pages/15-4-temperature'],
    'station-skin': ['OpenStax · Anatomy and Physiology 2e, Layers of the Skin (5.1)', 'https://openstax.org/books/anatomy-and-physiology-2e/pages/5-1-layers-of-the-skin'],
    'station-airways': ['OpenStax · Anatomy and Physiology 2e, Respiratory Structures (22.1)', 'https://openstax.org/books/anatomy-and-physiology-2e/pages/22-1-organs-and-structures-of-the-respiratory-system'],
    'station-circuit': ['OpenStax · Anatomy and Physiology 2e, Circulatory Pathways (20.5)', 'https://openstax.org/books/anatomy-and-physiology-2e/pages/20-5-circulatory-pathways']
  });
  const drawings = {};
  const rect = (x,y,w,h,fill,r=0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
  const path = (d, stroke, width=4, fill='none') => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const circle = (cx,cy,r,fill) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
  const label = (x,y,t,size=24,fill='#183e36',bold=false) => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${bold?'700':'500'}">${t}</text>`;
  function station(id, title, about, caption, drawing, parts, refs, related) {
    drawings[id] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" aria-hidden="true" focusable="false" direction="ltr" font-family="Arial,sans-serif">${rect(0,0,600,340,'#eef4ef')}${drawing}</svg>`;
    window.ATLAS_EXTRA.push({ id, cat: chapter, kind: 'station', art:id, title, about, caption, points:parts, refs, related,
      checked:stationDate, parts:parts.map(p=>p.name+' '+p.visual).join(' ') });
  }
  // The visual description is also the text alternative to each numbered target.
  const point = (x,y,name,visual,detail,prompt) => ({x,y,name,visual,detail,prompt});

  station('station-label','Read a medication label|قراءة ملصق الدواء',
    'Find the strength, package size and route before doing any arithmetic.|ميّز التركيز من حجم العبوة وطريق الإعطاء قبل أن تبدأ أي عملية حسابية.',
    'Fictional teaching label for Liquid A.|ملصق تدريبي افتراضي لسائل «أ».',
    rect(65,22,470,298,'#2c655c',26)+rect(77,34,446,274,'#fffdf6',18)+
    label(112,85,'Liquid A',38,'#173e35',true)+label(112,139,'125 mg / 5 mL',38,'#173e35',true)+
    path('M108 158 H487','#b8c9be',2)+label(112,203,'ORAL',30)+
    label(112,246,'Net volume   60 mL',28)+label(112,284,'EXP   2028-08',23),[
    point(455,127,'Strength|التركيز','125 mg / 5 mL','Every 5 mL contains 125 mg. This pair of units links mass to liquid volume.|كل 5 مليليترات تحتوي على 125 مليغرامًا. تربط هذه العبارة كتلة المادة بحجم السائل.',
      'Which marking lets you convert a mass in mg to a volume in mL?|أي عبارة تحتاجها لتحويل جرعة معطاة بالمليغرام إلى حجم بالمليلتر؟'),
    point(455,193,'Route|طريق الإعطاء','ORAL','ORAL means by mouth. The route on the package is checked against the order.|كلمة ORAL تعني عن طريق الفم. يُطابق طريق الإعطاء المكتوب على العبوة مع الوصفة.',
      'Which marking tells you how this preparation is intended to be given?|أي حقل يبيّن الطريق المخصّص لإعطاء المستحضر؟'),
    point(455,237,'Package volume|حجم العبوة','60 mL','The unopened package contains 60 mL in total. This is not an instruction to give that volume.|تحتوي العبوة الكاملة على 60 مليلترًا. لا يمثّل ذلك الكمية المطلوبة لجرعة واحدة.',
      'Which number describes the amount of liquid in the entire package?|أي قيمة تصف كمية السائل في العبوة كاملة؟'),
    point(455,277,'Expiry date|تاريخ انتهاء الصلاحية','EXP 2028-08','EXP is the labelled expiry. An opened product may have a separate discard date.|يشير EXP إلى انتهاء الصلاحية المدون. وقد يكون للمستحضر بعد فتحه تاريخ تخلّص أقرب.',
      'Which field would you read while checking the labelled shelf life?|أي حقل تقرأ للتحقق من مدة الصلاحية المدونة؟')
  ],['station-label','med'],['oral-liquid','chart-mar']);

  let ticks='';
  for(let i=0;i<=10;i++){const x=116+30*i; ticks+=path(`M${x} 115v${i%2?16:32}`,'#244b44',3); if(i%2===0)ticks+=label(x-8,106,String(i/2),24);}
  station('station-syringe','Read a syringe scale|قراءة تدريج المحقنة',
    'Follow the tip, scale and near edge of a flat plunger stopper to read a pictured volume.|حدّد الفوهة والتدريج والحافة القريبة لسدادة مكبس مسطّحة لتقرأ الحجم المرسوم.',
    'Simplified 5 mL syringe. The tip is on the left. Each short interval represents 0.5 mL.|رسم لمحقنة سعتها 5 مليليترات وفوهتها يسار الرسم. كل مسافة بين علامتين متجاورتين تساوي 0.5 مليلتر.',
    rect(58,149,56,31,'#92b3ab',4)+rect(105,113,335,100,'#355e56',10)+rect(111,119,323,88,'#fffdf5',6)+rect(113,150,153,54,'#b6dce3')+
    rect(266,120,15,86,'#23504a',3)+rect(281,152,211,23,'#9ebbb5')+rect(485,123,18,80,'#72968d',4)+
    path('M438 100v125','#547b73',8)+ticks+label(150,256,'mL',29,'#194c44',true)+path('M267 223v34h65','#5d7771',2),[
    point(61,188,'Tip|الفوهة','Narrow end, left|الطرف الضيق يسار الرسم','On this drawing zero is at the tip end. The numbers increase toward the plunger.|في الرسم يبدأ التدريج من جهة الفوهة وتزداد الأرقام باتجاه المكبس.',
      'Which end is closest to the zero mark?|أيّ طرف أقرب إلى علامة الصفر؟'),
    point(317,70,'Scale divisions|تقسيمات التدريج','Alternating long and short marks|العلامات الطويلة والقصيرة بالتناوب','Two equal intervals span 1 mL. Each is 0.5 mL on this syringe; another syringe may use different intervals.|بين كل علامتين تفصل بينهما وحدة 1 مليلتر مسافتان متساويتان. قيمة كل مسافة هنا 0.5 مليلتر، وتختلف باختلاف المحقنة.',
      'Where do you look to find the value of the smallest marked interval?|أين تنظر لتعرف قيمة أصغر تقسيم؟'),
    point(340,258,'Reading edge|حافة قراءة الحجم','Pointer from the dark stopper’s left edge|خط الإشارة من حافة السدادة الداكنة اليسرى','The edge nearest the tip lines up halfway between 2 and 3. The illustrated volume is 2.5 mL.|تقابل الحافة الأقرب إلى الفوهة منتصف المسافة بين 2 و3. الحجم المرسوم 2.5 مليلتر.',
      'Which part aligns with 2.5 on this flat-stopper example?|أي جزء يحاذي القيمة 2.5 في هذه المحقنة ذات السدادة المسطّحة؟'),
    point(211,246,'Volume unit|وحدة الحجم','mL','The scale measures millilitres. A mass in milligrams requires the concentration before it can be converted to this scale.|يقيس التدريج المليليترات. يلزم معرفة التركيز قبل تحويل كتلة معطاة بالمليغرام إلى قراءة على التدريج.',
      'Which marking identifies the unit used for this volume?|أي علامة تعرّف بوحدة قياس الحجم؟')
  ],['station-syringe','station-label'],['syringe','station-label']);

  station('station-oximeter','Read a pulse oximeter|قراءة مقياس التأكسج النبضي',
    'Separate oxygen saturation, pulse rate and signal strength on a fictional display.|ميّز تشبّع الأكسجين من معدل النبض وقوة الإشارة على شاشة افتراضية.',
    'Example display. Signal strength is drawn as bars on this model.|مثال تعليمي لشاشة تُعرض فيها قوة الإشارة على هيئة أعمدة.',
    rect(65,28,470,280,'#97b1a8',42)+rect(82,44,436,248,'#183b3c',28)+
    label(122,99,'SpO₂',32,'#c1f3df')+label(124,180,'97',76,'#d7f7e4',true)+label(223,177,'%',40,'#d7f7e4')+
    label(338,99,'PR',32,'#b4def5')+label(338,172,'74',61,'#c3e7fd',true)+label(334,215,'bpm',25,'#b4def5')+
    rect(124,255,14,12,'#9bdbc4')+rect(144,245,14,22,'#9bdbc4')+rect(164,235,14,32,'#9bdbc4')+rect(184,225,14,42,'#9bdbc4'),[
    point(251,93,'Oxygen saturation estimate|تقدير تشبّع الأكسجين','SpO₂ 97%','SpO₂ estimates the percentage of haemoglobin saturated with oxygen in arterial blood. Read the number with symptoms and observations.|تقدّر SpO₂ النسبة المئوية لتشبّع الهيموغلوبين بالأكسجين في الدم الشرياني. تُقرأ النتيجة مع الأعراض والملاحظات.',
      'Which field estimates how saturated the haemoglobin is with oxygen?|أي حقل يقدّر مدى تشبّع الهيموغلوبين بالأكسجين؟'),
    point(445,142,'Pulse rate|معدل النبض','PR 74','This sample shows a pulse rate of 74 beats per minute. PR and SpO₂ measure different things.|يعرض المثال معدل نبض 74 نبضة في الدقيقة. يصف كلّ من PR وSpO₂ كمية مختلفة.',
      'Which numerical field would you report as the pulse rate?|أي حقل رقمي تسجله بوصفه معدل النبض؟'),
    point(243,249,'Signal indicator|مؤشر قوة الإشارة','Four vertical bars|أربعة أعمدة رأسية','These bars represent signal strength on this example. Motion, poor circulation and other factors can affect the reading.|تعرض الأعمدة قوة الإشارة في هذا المثال. قد تؤثر الحركة وضعف التروية وعوامل أخرى في القراءة.',
      'Which feature describes the signal rather than a physiological rate?|أي جزء يصف الإشارة التي التقطها الجهاز؟'),
    point(423,211,'Beats per minute|نبضة في الدقيقة','bpm','bpm is the unit of pulse rate. It counts beats in one minute.|يرمز bpm إلى وحدة معدل النبض، أي عدد النبضات في دقيقة واحدة.',
      'Where is the time-based unit for the pulse reading shown?|أين تظهر الوحدة التي تربط عدد النبضات بالزمن؟')
  ],['station-oximetry'],['oximeter','chart-oxygen','chart-vitals']);

  station('station-drain','Trace a closed urinary drainage system|تتبّع نظام التصريف البولي المغلق',
    'Find the bladder level, connecting tube and collecting bag on a bedside diagram.|تتبّع مستوى المثانة وأنبوب التصريف وكيس التجميع في رسم جانبي للسرير.',
    'Side view of a teaching setup. The dashed horizontal guide marks bladder level.|منظر جانبي تدريبي. يشير الخط الأفقي المتقطع إلى مستوى المثانة.',
    path('M48 117H555','#91aea5',2).replace('fill="none"','fill="none" stroke-dasharray="7 8"')+
    rect(51,130,321,25,'#86aaa3',5)+path('M72 156v132 M347 156v132','#567a73',9)+
    path('M112 74 Q103 105 126 119 Q146 133 168 117 Q188 99 179 74 Q162 67 146 72 Q126 66 112 74Z','#7d6259',4,'#dfa68a')+
    path('M147 122v10c0 39 85 10 120 42s114 7 144 20','#38757d',7)+rect(397,190,123,75,'#467f81',12)+rect(404,198,109,60,'#f5f4d7',8)+rect(404,229,109,29,'#ddc887',5)+
    path('M461 265v11h14','#597773',5)+path('M43 305H555','#6e8980',5),[
    point(144,92,'Bladder level|مستوى المثانة','Upper rounded organ|العضو المستدير أعلى الرسم','Use the bladder as the height reference when checking bag position.|استخدم المثانة مرجعًا للارتفاع عند فحص موضع كيس التجميع.',
      'Which landmark gives the reference height for the bag?|أي معلَم يُستخدم مرجعًا لتحديد ارتفاع الكيس؟'),
    point(272,178,'Drainage tubing|أنبوب التصريف','Curved line from bladder to bag|الخط الواصل بين المثانة والكيس','Urine needs an unobstructed path through the closed tubing. Look for bends that kink the lumen.|يحتاج البول إلى مسار مفتوح عبر الأنبوب ضمن النظام المغلق. انتبه للثنيات التي تسد اللمعة.',
      'Which part would you inspect along its length for a kink?|أي جزء تتبعه بطوله بحثًا عن التواء يعيق الجريان؟'),
    point(469,213,'Collection bag|كيس التجميع','Suspended pouch|الكيس المعلّق','The bag sits below bladder level and clear of the floor.|يُوضَع الكيس تحت مستوى المثانة ويبقى معلّقًا بعيدًا عن الأرض.',
      'Which component collects urine below bladder level?|أي جزء يجمع البول أسفل مستوى المثانة؟'),
    point(265,302,'Floor clearance|المسافة عن الأرض','Lower horizontal line|الخط الأفقي السفلي','The bag must stay off the floor. Inspect its position when the bed height changes.|يبقى كيس التجميع بعيدًا عن الأرض. افحص موضعه عندما يتغير ارتفاع السرير.',
      'Which environmental boundary must the bag stay clear of?|أي سطح ينبغي أن يظل الكيس مرتفعًا عنه؟')
  ],['cauti'],['urine-bag','urinary-catheter','chart-fluid']);

  let grid='';
  for (const [y,t] of [[58,'38.0'],[121,'37.5'],[184,'37.0'],[247,'36.5']]) grid+=path(`M100 ${y}h425`,'#c7d6cd',2)+label(34,y+8,t,23);
  station('station-temp','Interpret a temperature trend|قراءة منحنى الحرارة',
    'Read a point together with its measurement unit and time. Then compare successive observations.|اقرأ كل نقطة مع وحدتها ووقتها ثم قارنها بالقراءات المتتابعة.',
    'Fictional oral temperatures from the same device and site, on the same day.|درجات حرارة فموية افتراضية قِيست في اليوم نفسه، بالجهاز والموضع نفسيهما.',
    grid+label(40,37,'°C',25)+path('M116 209 L243 159 L370 83 L497 146','#346e68',5)+
    [[116,209],[243,159],[370,83],[497,146]].map(([x,y])=>circle(x,y,8,'#20554f')).join('')+
    label(85,291,'08:00')+label(210,291,'10:00')+label(339,291,'12:00')+label(467,291,'14:00')+
    label(102,196,'36.8',22)+label(227,190,'37.2',22)+label(355,70,'37.8',22)+label(482,132,'37.3',22),[
    point(118,27,'Temperature unit|وحدة الحرارة','°C','All four values use degrees Celsius. State the unit when documenting or handing over the readings.|القراءات الأربع بالدرجة المئوية. دوّن الوحدة واذكرها عند التسليم.',
      'Which symbol tells you the unit of the vertical scale?|أي رمز يُبيّن وحدة التدريج الرأسي؟'),
    point(115,231,'First observation|القراءة الأولى','08:00 · 36.8','The first plotted reading is 36.8 °C at 08:00. It is a starting point for this series.|القراءة الأولى في هذه السلسلة 36.8 درجة مئوية عند الساعة 08:00.',
      'Which point provides the starting value for this series?|أي نقطة تمثّل بداية سلسلة القياسات؟'),
    point(404,83,'Peak observation|أعلى قراءة','12:00 · 37.8','At noon the value reaches 37.8 °C, the highest of the four observations.|بلغت الحرارة 37.8 درجة مئوية عند الظهر، وهي أعلى القراءات الأربع.',
      'Which observation was highest, even though another was recorded later?|ما أعلى قراءة رغم وجود قياس زمني أحدث منها؟'),
    point(540,157,'Latest observation|أحدث قراءة','14:00 · 37.3','At 14:00 the value was 37.3 °C, down 0.5 °C from noon. The graph alone does not establish why.|عند 14:00 بلغت الحرارة 37.3 درجة مئوية، بانخفاض 0.5 درجة عن الظهر. يتطلب تفسير السبب معلومات إضافية.',
      'Which point belongs in a handover as the latest result?|أي نقطة تذكرها عند التسليم بوصفها آخر نتيجة؟')
  ],['station-temperature','doc'],['chart-vitals','thermometer','handover-medical']);

  station('station-skin','Identify skin layers|تمييز طبقات الجلد',
    'Trace a cross-section from the surface down to the fatty tissue beneath the skin.|تتبّع مقطعًا من السطح وصولًا إلى النسيج الدهني تحت الجلد.',
    'Simplified cross-section; layer thickness and colours are schematic.|مقطع تعليمي مبسّط؛ سُمك الطبقات وألوانها تقريبيان.',
    rect(61,58,478,215,'#e7bf87',10)+
    path('M61 102 Q77 88 91 102 T122 102 T153 102 T184 102 T215 102 T246 102 T277 102 T308 102 T339 102 T370 102 T401 102 T432 102 T463 102 T494 102 T525 102 L539 102 V209 Q510 197 481 205 T423 205 T365 205 T307 205 T249 205 T191 205 T133 205 T75 205 L61 205 Z','#d59b82',2,'#eab3a1')+
    path('M61 58 H539 V101 Q523 90 508 101 T477 101 T446 101 T415 101 T384 101 T353 101 T322 101 T291 101 T260 101 T229 101 T198 101 T167 101 T136 101 T105 101 T74 101 L61 102 Z','#9c6758',2,'#ba8472')+
    [93,142,193,254,311,366,426,487].map((x,i)=>circle(x,235+(i%2)*9,18,'#f6daa1')).join('')+
    path('M95 185 Q175 160 235 183 T391 184 T507 180 M214 180q-25-33-51-38 M358 191q-12-32 15-50','#9d5356',7),[
    point(239,79,'Epidermis|البشرة','Thin upper band|الشريط الخارجي الرقيق','The outer protective epithelium has no blood vessels of its own.|البشرة هي النسيج الظهاري الواقي في الخارج، ولا تحتوي على أوعية دموية.',
      'Which layer forms the outer barrier and contains no blood vessels?|أي طبقة تشكّل الحاجز الخارجي ولا تحتوي أوعية دموية؟'),
    point(280,139,'Dermis|الأدمة','Broad middle band|الشريط الأوسط العريض','The connective tissue beneath the epidermis contains vessels and sensory structures.|الأدمة نسيج ضام تحت البشرة يحتوي أوعية دموية وتراكيب حسية.',
      'Which layer lies immediately beneath the epidermis?|أي طبقة تقع مباشرة تحت البشرة؟'),
    point(451,240,'Subcutaneous tissue|النسيج تحت الجلد','Rounded pale lobules|الفصيصات المستديرة الفاتحة','The hypodermis lies below the skin proper. Its fat helps with insulation and cushioning.|يقع هذا النسيج أسفل الجلد بطبقتيه. تسهم الدهون فيه في العزل وامتصاص الصدمات.',
      'Which region contains the fat lobules beneath the skin proper?|أي منطقة تضم الفصيصات الدهنية أسفل الجلد؟'),
    point(166,180,'Dermal blood vessels|الأوعية الدموية في الأدمة','Branching lines within middle band|الخطوط المتفرعة في الشريط الأوسط','Dermal vessels supply living tissues and exchange heat. They do not run into the epidermis.|تغذّي أوعية الأدمة الأنسجة الحية وتسهم في تبادل الحرارة، ولا تمتد إلى داخل البشرة.',
      'Which branching structures carry blood within the dermis?|أي تراكيب متفرعة تحمل الدم داخل الأدمة؟')
  ],['station-skin'],['skin-tear','abrasion','chart-wound']);

  station('station-airway','Follow air to the alveoli|تتبّع الهواء حتى الحويصلات',
    'Follow the conducting passages to the air sacs where gas exchange takes place.|تتبّع الممرات الموصلة للهواء حتى الأكياس الهوائية التي يجري عندها تبادل الغازات.',
    'The cluster on the right is a magnified schematic of alveoli; structures are not drawn to scale.|العنقود على يمين الرسم تكبير توضيحي للحويصلات. أحجام البنى تقريبية.',
    path('M272 88Q167 71 105 229Q85 278 148 273Q228 259 279 212Z','#ad8982',3,'#e8c0ad')+
    path('M298 89Q349 87 396 161Q416 232 390 256Q343 266 302 213Z','#ad8982',3,'#e8c0ad')+
    path('M285 38V116 M285 115 L220 164 M285 115 L342 158','#689697',19)+
    path('M220 164l-49 27m49-27l-20 57m142-63l25 31m-25-31l2 54','#5d8b8e',9)+
    path('M171 191l-21 2m21-2l-15 17m43 13l-15 20m15-20v24m167-56l12 13m-34 10l8 19','#588388',5)+
    path('M361 224L433 243','#738683',2).replace('fill="none"','fill="none" stroke-dasharray="5 6"')+
    circle(480,239,60,'#fffcf2')+path('M447 205l21 19 19 11','#709698',8)+
    [[466,236],[481,253],[498,232],[488,214],[463,251]].map(([x,y])=>circle(x,y,14,'#c38d82')+circle(x,y,10,'#f5d6c4')).join(''),[
    point(285,57,'Trachea|الرُّغامى (القصبة الهوائية)','Single tube before the fork|الأنبوب المفرد قبل التفرع','Air travels down the trachea before the tube divides into the two main bronchi.|يمر الهواء في الرغامى ثم تتفرع إلى شعبتين رئيستين.',
      'Which single passage carries air before the first major fork shown?|أي ممر مفرد يسبق التفرّع الرئيسي في الرسم؟'),
    point(234,144,'Main bronchus|شُعبة هوائية رئيسية','One large branch at the fork|أحد الفرعين الكبيرين','Each main bronchus carries air into one lung, then divides into smaller branches.|تنقل كل شُعبة رئيسية الهواء إلى إحدى الرئتين ثم تتفرع داخلها.',
      'Which large branch enters one lung directly from the trachea?|أي فرع كبير يدخل إحدى الرئتين مباشرة من الرغامى؟'),
    point(157,219,'Bronchioles|القُصيبات','Fine terminal branches|الفروع الدقيقة','Bronchioles are small air passages downstream of the bronchi. Air continues toward the respiratory zone.|القصيبات ممرات صغيرة تأتي بعد الشعب. يستمر تدفق الهواء عبرها باتجاه منطقة التبادل الغازي.',
      'Which small conducting branches lie beyond the larger bronchi?|أي ممرات صغيرة تأتي بعد الشعب الأكبر؟'),
    point(517,239,'Alveoli|الحويصلات الهوائية','Magnified cluster of sacs|عنقود الأكياس المكبّر','Gas exchange takes place across the thin barrier between alveolar air and pulmonary capillary blood.|تنتقل الغازات عبر الحاجز الرقيق بين هواء الحويصلات ودم الشعيرات الرئوية.',
      'Which structures provide a large, thin surface for gas exchange?|أي تراكيب توفّر سطحًا واسعًا رقيقًا لتبادل الغازات؟')
  ],['station-airways'],['oximeter','icu-ventilator','chart-oxygen']);

  station('station-circuit','Trace pulmonary circulation|تتبّع الدورة الدموية الرئوية',
    'Start at the right ventricle and follow the arrows to the lungs and back to the heart.|ابدأ من البطين الأيمن وتتبّع الأسهم إلى الرئتين ثم عُد إلى القلب.',
    'Flow schematic, not an anatomical view. RV = right ventricle, LA = left atrium.|مخطط لاتجاه الجريان. يرمز RV إلى البطين الأيمن وLA إلى الأذين الأيسر.',
    rect(57,74,110,179,'#e5d1c4',30)+rect(432,74,111,179,'#e5d1c4',30)+
    label(88,157,'RV',31,'#23515d',true)+label(468,157,'LA',31,'#845147',true)+
    path('M168 141H215Q251 141 254 103','#477d91',10)+path('M245 114l10-13 8 16','#477d91',5)+
    path('M349 103q4 38 40 38h43','#ab6355',10)+path('M418 131l13 10-13 10','#ab6355',5)+
    path('M257 105 Q240 55 264 45 Q281 38 291 84 Q301 130 313 79 Q324 36 341 43 Q366 53 350 105','#957f87',7)+
    label(74,226,'Heart',22)+label(461,226,'Heart',22)+label(269,174,'Lung',22),[
    point(110,115,'Right ventricle|البطين الأيمن','RV','The right ventricle pumps blood into the pulmonary trunk, which divides into pulmonary arteries.|يضخ البطين الأيمن الدم في الجذع الرئوي الذي يتفرع إلى الشرايين الرئوية.',
      'Which chamber starts this circuit by pumping blood toward the lungs?|أي حجرة تبدأ هذا المسار بضخ الدم نحو الرئتين؟'),
    point(213,141,'Pulmonary arterial flow|جريان الدم الشرياني الرئوي','First arrow, away from RV|السهم الأول الخارج من البطين الأيمن','Pulmonary arteries carry relatively oxygen-poor blood away from the heart to the lungs. Arteries are named by flow direction.|تحمل الشرايين الرئوية دمًا أقل أكسجة من القلب إلى الرئتين. وتُسمى الشرايين بحسب اتجاه الجريان بعيدًا عن القلب.',
      'Which segment carries blood away from the heart before gas exchange?|أي مسار يحمل الدم بعيدًا عن القلب قبل تبادل الغازات؟'),
    point(307,68,'Pulmonary capillaries|الشعيرات الدموية الرئوية','Central looping segment|الجزء المركزي الملتف','Blood reaches the capillaries around the alveoli. Oxygen enters the blood and carbon dioxide leaves it.|يصل الدم إلى الشعيرات المحيطة بالحويصلات، فيدخل إليه الأكسجين ويخرج منه ثاني أكسيد الكربون.',
      'Where does the blood exchange gases across the alveolar barrier?|أين يبادل الدم الغازات عبر الحاجز السنخي؟'),
    point(384,141,'Pulmonary venous return|العودة الوريدية الرئوية','Second arrow, toward LA|السهم الثاني المتجه نحو الأذين الأيسر','Pulmonary veins return oxygenated blood to the left atrium. The arrow ends at the chamber labelled LA.|تعيد الأوردة الرئوية الدم المؤكسج إلى الأذين الأيسر، حيث ينتهي السهم عند LA.',
      'Which segment returns oxygenated blood to the left atrium?|أي مسار يعيد الدم المؤكسج إلى الأذين الأيسر؟')
  ],['station-circuit'],['ccu-orientation','station-airway']);

  const originalArt=window.atlasArt;
  window.atlasArt = id => drawings[id] || originalArt(id);
})();
