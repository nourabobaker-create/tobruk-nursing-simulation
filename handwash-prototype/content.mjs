export const bi=(en,ar)=>[en,ar];
export const rationale=[
bi('Keep the uniform away from the sink to prevent contamination of clothing.','إبقاء الزي بعيدًا عن الحوض يمنع تلوثه.'),
bi('Removing watch and jewelry gives access to skin surfaces and facilitates cleaning fingers, hands and forearms. The source permits a plain wedding band.','إزالة الساعة والحلي تتيح الوصول إلى الجلد وتنظيف الأصابع واليدين والساعدين. يسمح المصدر ببقاء خاتم الزواج الأملس.'),
bi('The source explains that running water removes microorganisms and warm water removes less natural skin oil. Adjust to comfortably warm water, never hot.','يوضح المصدر أن الماء الجاري يزيل الكائنات الدقيقة وأن الماء الدافئ يزيل قدرًا أقل من الزيوت الطبيعية للجلد. اضبطه دافئًا مريحًا، لا ساخنًا.'),
bi('Keep hands below elbows: the source directs flow from less contaminated arms toward more contaminated hands.','أبقِ اليدين أسفل المرفقين: يوجّه المصدر جريان الماء من الذراعين الأقل تلوثًا نحو اليدين الأكثر تلوثًا.'),
bi('Lather facilitates removal of microorganisms. The source states that liquid soap harbors fewer bacteria than bar soap. Use about one teaspoon as stated in the instructor document.','تسهل الرغوة إزالة الكائنات الدقيقة. يذكر المصدر أن الصابون السائل يحتوي على بكتيريا أقل من الصابون الصلب، ويوصي بنحو ملعقة صغيرة.'),
bi('Friction mechanically removes microorganisms from skin and loosens dirt. Clean the palms, backs, each finger, fingertips, knuckles, wrists and forearms.','يُزيل الاحتكاك الكائنات الدقيقة ميكانيكيًا من الجلد ويُفكك الأوساخ. يشمل الفرك الراحتين والظهرين وكل إصبع وأطراف الأصابع والمفاصل والرسغين والساعدين.'),
bi('Wash forearms at least as high as contamination is likely to be present. The source supplies no separate rationale for this step.','اغسل الساعدين حتى المستوى المحتمل وجود التلوث فيه على الأقل. لا يقدم المصدر مبررًا منفصلًا لهذه الخطوة.'),
bi('The instructor specifies 10–30 seconds of friction and explains that longer washing removes more germs. The slow demonstration deliberately takes longer to teach movement; its playback time is not a clinical timing recommendation.','يحدد المدرّس 10–30 ثانية للفرك، ويذكر أن زيادة الغسل تزيل جراثيم أكثر. يستغرق العرض البطيء وقتًا أطول لتعليم الحركة؛ زمن تشغيله ليس توصية لمدة الغسل السريري.'),
bi('The source says to use the fingernails of the other hand or a clean wood stick to clean under fingernails. This prototype shows only gentle contact at the free nail edge, without force or insertion. Faculty must confirm the exact method before teaching or assessing it.','ينص المصدر على استخدام أظافر اليد الأخرى أو عود خشبي نظيف لتنظيف أسفل الأظافر. يعرض النموذج تلامسًا لطيفًا عند الحافة الحرة فقط، دون ضغط أو إدخال أداة. يجب أن يؤكد المدرّس الطريقة الدقيقة قبل تدريسها أو تقييمها.'),
bi('Rinse thoroughly to remove soap from the skin.','اشطف جيدًا لإزالة الصابون عن الجلد.'),
bi('Dry hands and wrists, then turn off the faucet without contaminating clean hands. A fresh paper towel is shown as a barrier, making the source rationale explicit.','جفف اليدين والرسغين ثم أغلق الصنبور دون إعادة تلويثهما. تُستخدم منشفة ورقية جديدة حاجزًا لتوضيح مبرر المصدر.')];
function s(id,pose,title,caption,ref,duration=12,side=0,gesture='stroke'){return {id,pose,title,caption,ref,duration,side,gesture}}
export const steps=[
s('stand','rest',bi('Give yourself space','اترك مسافة عن الحوض'),bi('Ahmed keeps his uniform clear of the sink.','يقف أحمد دون أن يلامس الزيّ الحوض.'),0,6),
s('watch','watch',bi('Remove watch & jewelry','انزع الساعة والحلي'),bi('Free the wrists and fingers before washing.','أزل الساعة والحلي لإتاحة تنظيف الرسغين والأصابع.'),1,7),
s('water','faucet',bi('Turn on & adjust','افتح الماء واضبطه'),bi('A gentle flow of comfortably warm water.','اضبط قوة الجريان وحرارة الماء ليكون دافئًا مريحًا.'),2,7),
s('wet','wet',bi('Wet hands & wrists','بلّل اليدين والرسغين'),bi('Keep hands lower than elbows; move both wrists through the water.','أبقِ اليدين أسفل المرفقين ومرّر اليدين والرسغين تحت الماء.'),3,10),
s('soap','soap',bi('Apply liquid soap','ضع الصابون السائل'),bi('About one teaspoon, as specified by your instructor.','نحو ملعقة صغيرة، كما يحدد دليل المدرّس.'),4,7),
s('palms','palms',bi('Palm against palm','راحة على راحة'),bi('Keep contact. Rub back and forth across both palms.','حافظ على التلامس وافرك الراحتين ذهابًا وإيابًا.'),5,14),
s('backL','back',bi('Back of the left hand','ظهر اليد اليسرى'),bi('The right palm travels over the back of the left hand.','تتحرك راحة اليد اليمنى فوق ظهر اليد اليسرى.'),5,14,0),
s('backR','back',bi('Back of the right hand','ظهر اليد اليمنى'),bi('Reverse hands. Keep the rubbing palm in contact.','بدّل اليدين وحافظ على تلامس راحة اليد الفاركة.'),5,14,1),
s('fingers','fingers',bi('Between the fingers','بين الأصابع'),bi('Interlace the fingers and rub along their sides.','شابك الأصابع وافرك جوانبها ذهابًا وإيابًا.'),5,16),
s('fingerL','finger',bi('Each left finger & thumb','كل إصبع والإبهام الأيسر'),bi('Wrap gently around each finger, including the thumb; rotate and slide.','أحط كل إصبع بلطف، بما فيه الإبهام، وافرك بالدوران والانزلاق.'),5,20,0,'circle'),
s('fingerR','finger',bi('Each right finger & thumb','كل إصبع والإبهام الأيمن'),bi('Repeat for every finger of the other hand.','كرر الفرك لكل إصبع في اليد الأخرى.'),5,20,1,'circle'),
s('tipsL','tips',bi('Left fingertips in right palm','أطراف اليسرى في راحة اليمنى'),bi('Place the fingertips in the opposite palm. Rub in small circles.','ضع أطراف الأصابع في الراحة المقابلة وافرك بحركات دائرية صغيرة.'),5,14,0,'circle'),
s('tipsR','tips',bi('Right fingertips in left palm','أطراف اليمنى في راحة اليسرى'),bi('Change hands. Keep all fingertips touching the palm.','بدّل اليدين مع إبقاء أطراف الأصابع ملامسة للراحة.'),5,14,1,'circle'),
s('knucklesL','knuckles',bi('Left bent fingers & knuckles','مفاصل وأصابع اليسرى المثنية'),bi('Bend the fingers. Rub their backs and knuckles against the opposite palm.','اثنِ الأصابع وافرك ظهورها ومفاصلها في الراحة المقابلة.'),5,14,0),
s('knucklesR','knuckles',bi('Right bent fingers & knuckles','مفاصل وأصابع اليمنى المثنية'),bi('Repeat on the other hand with fingers still flexed.','كرر لليد الأخرى مع إبقاء الأصابع مثنية.'),5,14,1),
s('wristL','wrist',bi('Around the left wrist','حول الرسغ الأيسر'),bi('Grasp the opposite wrist gently and rub around it.','أحط الرسغ المقابل باليد وافرك حوله بلطف.'),5,14,0,'circle'),
s('wristR','wrist',bi('Around the right wrist','حول الرسغ الأيمن'),bi('Change sides and rub around the wrist.','بدّل الجانبين وافرك حول الرسغ.'),5,14,1,'circle'),
s('armL','forearm',bi('Along the left forearm','على طول الساعد الأيسر'),bi('Rub above the wrist, as high as contamination is likely.','افرك أعلى الرسغ وصولًا إلى المستوى المحتمل للتلوث.'),6,16,0),
s('armR','forearm',bi('Along the right forearm','على طول الساعد الأيمن'),bi('Repeat along the other forearm. Continue friction for 10–30 seconds in the source procedure.','كرر على الساعد الآخر. يحدد المصدر استمرار الفرك لمدة 10–30 ثانية.'),7,16,1),
s('nailsL','nails',bi('Left nail edges · faculty review','حواف أظافر اليسرى · مراجعة المدرّس'),bi('Gentle contact at the free edge only. Exact method needs faculty confirmation.','تلامس لطيف عند الحافة الحرة فقط. الطريقة الدقيقة تحتاج تأكيد المدرّس.'),8,12,0),
s('nailsR','nails',bi('Right nail edges · faculty review','حواف أظافر اليمنى · مراجعة المدرّس'),bi('No forceful scraping or insertion beneath the nail.','دون كشط قوي أو إدخال أداة تحت الظفر.'),8,12,1),
s('rinse','rinse',bi('Rinse thoroughly','اشطف جيدًا'),bi('Turn both hands under running water, keeping them below the elbows.','قلّب اليدين تحت الماء الجاري مع إبقائهما أسفل المرفقين.'),9,14),
s('dry','dry',bi('Dry hands & wrists','جفف اليدين والرسغين'),bi('Use a paper towel over both hands and wrists.','جفف اليدين والرسغين بمنشفة ورقية.'),10,14),
s('close','close',bi('Close the faucet safely','أغلق الصنبور بأمان'),bi('Take a fresh paper towel; use it as a barrier, then discard it.','خذ منشفة ورقية جديدة وأغلق بها الصنبور ثم تخلص منها.'),10,10)
];
export const surfaces=steps.filter(x=>x.ref>=5&&x.ref<=7);
export const review=bi('FACULTY REVIEW REQUIRED: nail-cleaning method (H9); confirm local friction timing (H8, 10–30 s) versus guidance distinguishing total procedure time. Instructor sequence is retained.','FACULTY REVIEW REQUIRED: طريقة تنظيف الأظافر (H9)، وتأكيد زمن الفرك المحلي (H8، 10–30 ثانية) مع التمييز بين زمن الفرك وزمن الإجراء الكامل. حُفظ تسلسل المدرّس.');
