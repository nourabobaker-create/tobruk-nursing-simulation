/* Bilingual community education on food allergy. */
(() => {
  'use strict';
  const registry = window.COMMUNITY_V2;
  const english = window.CommunityEnglishText ??= {};
  const t = (ar, en) => {
    english[ar] ??= en;
    return ar;
  };

  Object.assign(registry.sources, {
    foodAllergyNHS: ['NHS', t('حساسية الطعام: الأعراض والتقييم', 'Food allergy: symptoms and assessment'), 'https://www.nhs.uk/conditions/food-allergy/'],
    foodAllergyAges: ['BSACI', t('مسببات حساسية الطعام لدى الأطفال والكبار', 'Food allergy triggers in children and adults'), 'https://www.bsaci.org/resources/allergy-management/food-allergy/foods-involved/'],
    foodAllergyBabies: ['NHS', t('حساسية الطعام عند الرضع وصغار الأطفال', 'Food allergy in babies and young children'), 'https://www.nhs.uk/baby/weaning-and-feeding/food-allergies-in-babies-and-young-children/'],
    foodAllergyFSA: ['UK Food Standards Agency', t('الملصقات الغذائية وإعداد وجبات مناسبة للمصاب بالحساسية', 'Food labels and preparing meals for people with food allergy'), 'https://www.food.gov.uk/food-safety-and-hygiene/food-allergies-intolerances-and-coeliac-disease'],
    foodAllergyFDA: ['FDA', t('مسببات حساسية الطعام الشائعة وقراءة الملصقات', 'Common food allergens and reading labels'), 'https://www.fda.gov/food/buy-store-serve-safe-food/food-allergies-what-you-need-know'],
    foodAnaphylaxisNHS: ['NHS', t('التأق: التعرف إليه والتصرف العاجل', 'Anaphylaxis: recognition and emergency response'), 'https://www.nhs.uk/conditions/anaphylaxis/'],
    foodAnaphylaxisFirstAid: ['Resuscitation Council UK', t('التأق ضمن إرشادات الإسعافات الأولية لعام 2025', 'Anaphylaxis in the 2025 first aid guidelines'), 'https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/first-aid-guidelines'],
    foodAnaphylaxisRecognition: ['Resuscitation Council UK', t('التأق مع علامات جلدية أو بدونها', 'Anaphylaxis with or without skin changes'), 'https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/special-circumstances-guidelines'],
    foodAnaphylaxisMayo: [t('مايو كلينك', 'Mayo Clinic'), t('الإسعافات الأولية للحساسية المفرطة بالعربية', 'First aid for anaphylaxis in Arabic'), 'https://www.mayoclinic.org/ar/first-aid/first-aid-anaphylaxis/basics/art-20056608'],
    foodAllergyLactose: [t('وزارة الصحة السعودية', 'Saudi Ministry of Health'), t('عدم تحمّل اللاكتوز وحساسية الحليب', 'Lactose intolerance and milk allergy'), 'https://www.moh.gov.sa/awarenessplateform/healthylifestyle/pages/lactoseintolerance.aspx'],
    foodAllergyMilkProtein: ['NHS Forth Valley', t('بروتين الحليب ومنتجات حليب البقر الخالية من اللاكتوز', 'Milk protein and lactose-free cow’s milk products'), 'https://nhsforthvalley.com/health-services/az-of-services/dietetics/food-related-concerns-in-infants-and-children/milk-free-weaning-from-6-months/'],
    foodAllergyCoeliacMayo: [t('مايو كلينك', 'Mayo Clinic'), t('الداء البطني وأثر الغلوتين على الأمعاء الدقيقة', 'Coeliac disease and the effects of gluten on the small intestine'), 'https://www.mayoclinic.org/ar/diseases-conditions/celiac-disease/symptoms-causes/syc-20352220'],
    foodAllergyCoeliacTesting: ['NIDDK', t('تشخيص الداء البطني قبل حذف الغلوتين', 'Testing for coeliac disease before cutting out gluten'), 'https://www.niddk.nih.gov/health-information/digestive-diseases/celiac-disease/diagnosis'],
    foodAllergyWheatMayo: [t('مايو كلينك', 'Mayo Clinic'), t('حساسية القمح: الأعراض والأسباب', 'Wheat allergy: symptoms and causes'), 'https://www.mayoclinic.org/ar/diseases-conditions/wheat-allergy/symptoms-causes/syc-20378897']
  });

  const id = 'food-allergy-family';
  const emergencySources = ['foodAnaphylaxisNHS', 'foodAnaphylaxisFirstAid', 'foodAnaphylaxisRecognition', 'foodAnaphylaxisMayo'];
  const topic = {
    id,
    cat: 'nutrition',
    alsoCats: ['child', 'aid'],
    art: 'childfood',
    title: t('حساسية الطعام عند الأطفال والكبار', 'Food allergy in children and adults'),
    audience: t('الأسر ومقدمو الرعاية والعاملون في المدارس وكل من لديه حساسية غذائية', 'Families, caregivers, school staff and anyone with a food allergy'),
    hook: t('تعرّف على الأعراض، واقرأ المكونات، واعرف متى تتصرف فورًا.', 'Recognise symptoms, check ingredients and know when to act immediately.'),
    emergencyNotice: t('صعوبة التنفس أو البلع، تورم اللسان أو الحلق، أو إغماء بعد الأكل قد تعني تأقًا. استخدم قلم الأدرينالين الموصوف فورًا إن توفر، واطلب المساعدة الطبية العاجلة في الحال. في طبرق اتبع مسار الطوارئ الموضح أعلاه.', 'Trouble breathing or swallowing, a swollen tongue or throat, or fainting after eating may be anaphylaxis. Use the prescribed adrenaline auto-injector immediately if available and get emergency medical help right away. In Tobruk, follow the emergency care route shown above.'),
    about: t('تحدث حساسية الطعام عندما يتفاعل جهاز المناعة مع مكوّن غذائي. من مسبباتها الحليب والبيض والفول السوداني والمكسرات مثل اللوز، والسمسم والقمح والصويا والأسماك والقشريات مثل الروبيان (الجمبري). ويمكن أن تسبب أطعمة أخرى الحساسية أيضًا.', 'Food allergy occurs when the immune system reacts to a food ingredient. Common triggers include milk, eggs, peanuts, tree nuts such as almonds, sesame, wheat, soy, fish and crustaceans such as shrimp. Other foods can also trigger allergy.'),
    symptoms: [
      t('قد تظهر حكة أو بقع مرتفعة حاكة (شرى)، أو تورم الشفتين، أو قيء وألم بالبطن. قد تظهر الأعراض بسرعة أو تتأخر بحسب نوع التفاعل.', 'Symptoms may include itching, raised itchy patches (hives), swollen lips, vomiting or stomach pain. Symptoms may start quickly or be delayed, depending on the type of reaction.'),
      t('صعوبة التنفس أو البلع، تورم اللسان أو الحلق، الدوخة الشديدة المفاجئة أو الإغماء، أو ارتخاء الطفل وضعف استجابته علامات طارئة. قد يحدث التأق دون طفح.', 'Trouble breathing or swallowing, swelling of the tongue or throat, sudden severe dizziness or fainting, or a child becoming floppy or unusually unresponsive are emergency signs. Anaphylaxis can occur without a rash.')
    ],
    actions: [
      t('عند الاشتباه بالتأق، استخدم قلم الأدرينالين (الإبينفرين) الموصوف فورًا إن توفر، وفق تعليمات القلم. اطلب المساعدة الطبية العاجلة فورًا، واذكر أنك تشتبه بحساسية مفرطة. إذا كان معك شخص آخر، اطلب منه ترتيب العون فورًا وأنت تساعد المصاب.', 'If you suspect anaphylaxis, use the prescribed adrenaline (epinephrine) auto-injector immediately if available, following its instructions. Get emergency medical help immediately and say you suspect anaphylaxis. If someone is with you, have them arrange help while you assist the person.'),
      t('أبقِ المصاب مستلقيًا. إذا صعب عليه التنفس، يمكنه الجلوس وساقاه ممدودتان. لا تدعه يقف أو يمشي. إذا لم تتحسن الأعراض بعد 5 دقائق، استخدم قلمًا ثانيًا إن توفر.', 'Keep the person lying down. If breathing is difficult, they may sit with their legs extended. Keep them from standing or walking. If symptoms have not improved after 5 minutes, use a second auto-injector if available.'),
      t('عند الاشتباه بحساسية طعام دون علامات طارئة، دوّن ما أُكل، ومتى بدأت الأعراض، وما حدث، وراجع الطبيب للتقييم.', 'If you suspect a food allergy without emergency signs, note what was eaten, when symptoms began and what happened, and arrange a medical assessment.')
    ],
    prevention: [
      t('بعد تحديد الغذاء المسبب، اقرأ قائمة المكونات في كل مرة، حتى لو اشتريت المنتج من قبل. اسأل عن مكونات الصلصات والحلويات والمخبوزات والأطعمة المقدمة خارج المنزل.', 'Once the trigger is identified, read the ingredient list every time, even for a familiar product. Ask about ingredients in sauces, sweets, baked foods and meals prepared away from home.'),
      t('اغسل اليدين ونظّف أدوات التحضير والأسطح قبل إعداد الوجبة. اسأل عن الأدوات المشتركة عند الأكل خارج البيت، لأن آثارًا من الطعام المسبب قد تنتقل بها.', 'Wash hands and clean preparation equipment and surfaces before making the meal. When eating out, ask about shared equipment, which can transfer traces of the trigger.'),
      t('إذا وصف الطبيب قلم أدرينالين، احمله حسب الخطة، وتعلّم أنت ومن يرعاك متى وكيف يُستخدم.', 'If a clinician prescribes an adrenaline auto-injector, carry it as directed and make sure you and your caregivers know when and how to use it.')
    ],
    treatment: t('يحدد الطبيب ما يلزم من فحوص حسب الأعراض وتوقيتها، ويمكن أن يساعد اختصاصي التغذية في اختيار بدائل مناسبة. اتبع خطة الحساسية الموصوفة وتأكد ممن يتولى المساعدة في المنزل أو المدرسة أو العمل.', 'A clinician decides which tests are needed based on the symptoms and their timing. A dietitian can help identify suitable alternatives. Follow the prescribed allergy plan and make sure someone knows how to help at home, school or work.'),
    avoid: t('تجنب إعادة تجربة الطعام المشتبه به في المنزل. عند الاشتباه بالتأق، استخدم الأدرينالين الموصوف فورًا إن توفر، واطلب المساعدة العاجلة دون انتظار أثر دواء الحساسية أو ظهور طفح.', 'Avoid trying the suspected food again at home. If you suspect anaphylaxis, use prescribed adrenaline immediately if available and get emergency help without waiting for allergy medicine to work or for a rash to appear.'),
    warning: t('يحتاج التأق تقييمًا طارئًا حتى لو تحسنت الأعراض بعد الأدرينالين، لأنها قد تعود. إذا فقد المصاب الاستجابة ولم يعد يتنفس طبيعيًا، ابدأ الإنعاش فورًا واطلب من شخص آخر ترتيب المساعدة إن أمكن.', 'Anaphylaxis requires emergency assessment even if symptoms improve after adrenaline, as they may return. If the person becomes unresponsive and is not breathing normally, start CPR immediately and ask someone else to arrange help if possible.'),
    scene: t('في مناسبة مدرسية، أصيب طفل لديه حساسية من السمسم بصعوبة في التنفس بعد الأكل دون ظهور طفح. استخدمت المعلمة قلم الأدرينالين الموصوف للطفل حسب خطته، بينما رتّب شخص آخر المساعدة العاجلة.', 'At a school event, a child with a sesame allergy had trouble breathing after eating, with no rash. The teacher used the child’s prescribed adrenaline auto-injector as directed in the care plan while someone else arranged emergency help.'),
    question: [
      t('طفل لديه حساسية من السمسم بدأ يتنفس بصعوبة بعد الأكل، ولم يظهر طفح. ما التصرف؟', 'A child with sesame allergy has trouble breathing after eating, with no rash. What should you do?'),
      [
        t('أستخدم قلم الأدرينالين الموصوف فورًا إن توفر وأطلب المساعدة الطبية العاجلة.', 'Use the prescribed adrenaline auto-injector immediately if available and get emergency medical help.'),
        t('أنتظر حتى يظهر طفح.', 'Wait until a rash appears.'),
        t('أكتفي بدواء الحكة وأنتظر.', 'Give only itch medicine and wait.')
      ],
      0
    ],
    sources: ['foodAllergyNHS', 'foodAllergyAges', 'foodAnaphylaxisFirstAid', 'foodAnaphylaxisMayo'],
    tags: ['family', 'home', 'school'],
    related: ['kids-food-sharing', 'skin-hives', 'unconscious-airway'],
    reviewedSources: '2026-11-11',
    sourceChecked: '2026-11-11',
    sectionSources: {
      about: ['foodAllergyNHS', 'foodAllergyFDA'],
      symptoms: ['foodAllergyNHS', ...emergencySources],
      actions: ['foodAllergyNHS', ...emergencySources],
      prevention: ['foodAllergyFSA', 'foodAllergyFDA', 'foodAnaphylaxisNHS'],
      treatment: ['foodAllergyNHS', 'foodAllergyBabies', 'kidAllergy'],
      avoid: ['foodAllergyNHS', 'foodAnaphylaxisMayo', 'foodAnaphylaxisRecognition'],
      warning: emergencySources,
      scene: ['kidAllergy', 'foodAnaphylaxisFirstAid', 'foodAnaphylaxisRecognition']
    },
    learningSections: [
      {
        title: t('للأطفال: من البيت إلى الحضانة والمدرسة', 'Children: at home, in childcare and at school'),
        body: t('يشيع التحسس من الحليب والبيض في سن مبكرة. يتجاوز بعض الأطفال هذه الحساسية مع النمو. ناقش تغيير حليب الرضيع أو حذف غذاء أساسي مع الطبيب. إذا ثبتت الحساسية، شارك خطة طوارئ مكتوبة مع الحضانة أو المدرسة، واتفقوا على من يساعد الطفل وأين يوجد قلمه إن وُصف له.', 'Milk and egg allergy are common in early childhood. Some children outgrow these allergies. Speak with a clinician before changing infant formula or removing a staple food. If the allergy is confirmed, share a written emergency plan with the childcare provider or school and agree who will help and where any prescribed auto-injector is kept.'),
        sources: ['foodAllergyAges', 'foodAllergyBabies', 'kidAllergy']
      },
      {
        title: t('للكبار: قد تظهر حساسية جديدة في مرحلة الرشد', 'Adults: a new allergy can develop in adulthood'),
        body: t('قد تبدأ الحساسية لأول مرة في مرحلة الرشد، ومنها حساسية القشريات مثل الجمبري. إذا كانت لديك حساسية معروفة، اذكر الطعام المحدد عند الطلب واسأل عن المكونات والأدوات المشتركة. إذا تعذر التحقق، اختر وجبة يمكنك معرفة مكوناتها وطريقة تحضيرها.', 'Allergy can start for the first time in adulthood, including allergy to crustaceans such as shrimp. If you have a known allergy, name the specific food when ordering and ask about ingredients and shared equipment. If staff cannot confirm these details, choose a meal whose ingredients and preparation you can verify.'),
        sources: ['foodAllergyAges', 'foodAllergyFSA']
      },
      {
        title: t('حساسية الحليب وعدم تحمّل اللاكتوز', 'Milk allergy and lactose intolerance'),
        body: t('حساسية حليب البقر تفاعل مناعي مع بروتيناته. يبقى هذا البروتين في حليب البقر الخالي من اللاكتوز، لذلك قد يسبب تفاعلًا لمن لديه حساسية حليب البقر. عدم تحمّل اللاكتوز صعوبة في هضم سكر الحليب وقد يسبب غازات وانتفاخًا أو إسهالًا.', 'Cow’s milk allergy is an immune reaction to its proteins. These proteins remain in lactose-free cow’s milk and can trigger a reaction in someone with cow’s milk allergy. Lactose intolerance is difficulty digesting milk sugar and can cause gas, bloating or diarrhoea.'),
        sources: ['foodAllergyLactose', 'foodAllergyMilkProtein']
      },
      {
        title: t('حساسية القمح والداء البطني (السيلياك)', 'Wheat allergy and coeliac disease'),
        body: t('حساسية القمح تفاعل تحسسي مع بروتينات في القمح. الداء البطني مرض مناعي مزمن يحفزه الغلوتين الموجود في القمح والشعير والجاودار، وقد يؤذي الأمعاء الدقيقة. إذا اشتبهت بالسيلياك، استشر الطبيب قبل حذف الغلوتين لأن ذلك قد يؤثر في الفحوص.', 'Wheat allergy is an allergic reaction to proteins in wheat. Coeliac disease is a chronic immune condition triggered by gluten in wheat, barley and rye and can damage the small intestine. If you suspect coeliac disease, talk to a clinician before cutting out gluten because it can affect test results.'),
        sources: ['foodAllergyWheatMayo', 'foodAllergyCoeliacMayo', 'foodAllergyCoeliacTesting']
      }
    ]
  };

  registry.extra.push(topic);
  registry.searchAliases[id] = 'حساسية الأكل حساسية الاكل حساسية الحليب عدم تحمل اللاكتوز سكر الحليب حساسية البيض حساسية السمسم المكسرات الجوز الفول السوداني حساسية القمح سيلياك حساسية الغلوتين حساسية الجلوتين الروبيان الجمبري المأكولات البحرية حساسيه تأق ادرينالين food allergies milk egg sesame peanut tree nut shellfish gluten celiac coeliac';
  for (const relatedId of ['kids-food-sharing', 'skin-hives']) {
    const relatedTopic = registry.extra.find(article => article.id === relatedId);
    relatedTopic.related = [id, ...(relatedTopic.related || [])];
  }
})();
