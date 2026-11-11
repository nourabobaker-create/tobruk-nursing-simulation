/* Bilingual household safety guide, with local emergency access information. */
(() => {
  'use strict';
  const R = window.COMMUNITY_V2;
  const english = window.CommunityEnglishText ||= {};
  const pair = (ar, en) => {
    english[ar] = en;
    return ar;
  };
  const basics = 'carbonMonoxideCDC';
  const response = 'carbonMonoxideNHS';
  const generator = 'carbonMonoxideGeneratorCDC';
  const id = 'carbon-monoxide-home';

  Object.assign(R.sources, {
    [basics]: ['CDC', pair('التسمم بأول أكسيد الكربون والوقاية منه', 'Carbon monoxide poisoning basics and prevention'), 'https://www.cdc.gov/carbon-monoxide/about/'],
    [response]: ['NHS', pair('أعراض التسمم بأول أكسيد الكربون والتصرف العاجل', 'Carbon monoxide poisoning symptoms and urgent action'), 'https://www.nhs.uk/conditions/carbon-monoxide-poisoning/'],
    [generator]: ['CDC', pair('سلامة المولدات المحمولة: نشرة عربية', 'Portable generator safety: Arabic factsheet'), 'https://www.cdc.gov/carbon-monoxide/media/pdfs/CO_Generator_Safety_Arabic_1.pdf']
  });

  R.extra.push({
    id,
    cat: 'environment',
    alsoCats: ['aid'],
    title: pair('أول أكسيد الكربون في المنزل: اخرجوا إلى الهواء الطلق', 'Carbon monoxide at home: get outside into fresh air'),
    audience: pair('الأسر ومقدمو الرعاية', 'Families and caregivers'),
    hook: pair('صداع ودوخة لدى أكثر من شخص مع تشغيل مولّد أو مدفأة؟ اخرجوا فورًا.', 'Several people get headaches or feel dizzy while a generator or heater is running? Get outside immediately.'),
    emergencyFirst: true,
    emergencyNotice: pair(
      'إذا انطلق إنذار أول أكسيد الكربون أو اشتبهتم بالتسمم، اخرجوا فورًا إلى الهواء الطلق واطلبوا المساعدة من الخارج. إذا اشتبهتم بالتعرض، اطلبوا تقييمًا طبيًا عاجلًا ورتّبوا نقلًا آمنًا إلى الحوادث والطوارئ بمركز طبرق الطبي. لا يقُد المصاب بنفسه ولا تعودوا إلى المبنى حتى تؤكد الجهة المختصة أنه آمن.',
      'If a carbon monoxide alarm sounds or you suspect poisoning, get everyone into fresh air immediately and seek help from outside. If you suspect exposure, seek urgent medical assessment and arrange safe transport to the emergency department at Tobruk Medical Center. The affected person should not drive. Stay out until qualified responders say it is safe to return.'
    ),
    about: pair(
      'أول أكسيد الكربون غاز سام لا لون له ولا رائحة. قد يتراكم في مكان مغلق عند تشغيل مولّد محمول أو إشعال الفحم، أو بسبب خلل في جهاز تدفئة أو سخّان يعمل بالغاز.',
      'Carbon monoxide is a poisonous gas with no colour or smell. It can build up in an enclosed space when a portable generator is running, charcoal is burning, or a gas heater or water heater is faulty.'
    ),
    symptoms: [
      pair('قد يحدث صداع أو دوخة أو غثيان أو قيء أو ضعف. الاشتباه أقوى إذا ظهرت الأعراض لدى أكثر من شخص في المكان نفسه أو خفّت بعد الخروج.', 'Watch for headache, dizziness, nausea, vomiting or weakness. Suspect exposure if more than one person in the same place feels ill or if symptoms ease after going outside.'),
      pair('الرضّع وكبار السن ومرضى القلب أو التنفس أشد عرضة للأذى. وقد يتعرّض النائم للتسمم قبل أن يشعر بالأعراض.', 'Infants, older adults and people with heart or breathing conditions are at greater risk of harm. A sleeping person can be poisoned before noticing symptoms.')
    ],
    actions: [
      pair('أخرجوا الجميع إلى الهواء الطلق فورًا. نادوا من يمكنه الخروج معكم، ولا تتأخروا لفتح النوافذ أو البحث عن مصدر الغاز.', 'Get everyone into fresh air immediately. Alert others who can leave with you. Do not delay to open windows or investigate the source.'),
      pair('اطلبوا العون من الخارج وأبلغوا من يساعدكم إذا بقي أحد بالداخل. لا تعودوا لإنقاذه بأنفسكم فقد تتعرّضون للتسمم.', 'Call for help from outside and tell responders if anyone remains inside. Stay out of the building so you do not become another casualty.'),
      pair('اذكروا للطوارئ نوع الجهاز أو الوقود، ومتى بدأت الأعراض، ومن كان في المكان. اطلبوا التقييم العاجل حتى لو تحسّن المصاب بعد الخروج.', 'Tell the emergency team what appliance or fuel was used, when symptoms began and who was present. Seek urgent assessment even if the affected person feels better outside.')
    ],
    prevention: [
      pair('شغّل المولّد المحمول في الهواء الطلق فقط، على بُعد أكثر من 20 قدمًا (نحو 6 أمتار) من النوافذ والأبواب وفتحات التهوية، مع توجيه العادم بعيدًا عن المباني.', 'Run a portable generator outdoors only, more than 20 feet (about 6 metres) from windows, doors and vents. Point the exhaust away from buildings.'),
      pair('أبقِ الفحم والشوايات ومواقد التخييم خارج المنزل والخيمة والمرآب. استخدم جهازًا مخصّصًا للتدفئة بدل فرن الطبخ، واطلب من فني مؤهل فحص أجهزة الغاز والتدفئة والتهوية بانتظام.', 'Keep charcoal, barbecues and camping stoves out of homes, tents and garages. Use a purpose-built heater for warmth, and arrange regular checks of gas and heating appliances and their vents by a qualified technician.'),
      pair('ركّب إنذار أول أكسيد الكربون يعمل بالبطارية أو له بطارية احتياطية قرب أماكن النوم، واختبره واتبع تعليمات الشركة المصنّعة.', 'Fit a carbon monoxide alarm with a battery or battery backup near sleeping areas. Test it and follow the manufacturer’s instructions.')
    ],
    treatment: pair('في المستشفى قد يحتاج المصاب إلى فحص وعلاج بالأكسجين حسب تقييم الفريق. أخبرهم إذا كانت المصابة حاملًا أو كان المصاب طفلًا صغيرًا.', 'The hospital team may run tests and give oxygen after assessing the person. Tell the team if the patient is pregnant or a young child.'),
    avoid: pair('لا تشغّل المولّد في الغرفة أو المرآب ولو تركت الأبواب والنوافذ مفتوحة. غياب رائحة العادم لا يثبت أن الهواء آمن.', 'Keep the generator out of rooms and garages even with doors and windows open. Air can be unsafe even when you cannot smell exhaust.'),
    warning: pair('ضيق النفس أو ألم الصدر أو التشوش المفاجئ أو فقد الوعي بعد تعرّض محتمل يستدعي الطوارئ فورًا. إذا كان المصاب لا يستجيب ولا يتنفس طبيعيًا وهو في مكان آمن، ابدأ الإنعاش واطلب من شخص آخر ترتيب العون.', 'Trouble breathing, chest pain, sudden confusion or loss of consciousness after possible exposure needs emergency help immediately. If someone is unresponsive and not breathing normally in a safe place, start CPR and ask another person to arrange help.'),
    scene: pair('انقطعت الكهرباء وشغّل جار مولّدًا قرب نافذة. شعر طفل ووالده بالصداع والدوخة. خرجت الأسرة إلى الهواء الطلق فورًا وطلبت المساعدة من الخارج وأخبرت فريق الطوارئ بتعرّضهما المحتمل.', 'During a power cut, a neighbour runs a generator by a window. A child and their father develop headaches and feel dizzy. The family leaves immediately, asks for help from outdoors and tells the emergency team about the possible exposure.'),
    question: [
      pair('انطلق إنذار أول أكسيد الكربون ولم يشم أحد رائحة. ما أول خطوة؟', 'The carbon monoxide alarm sounds and nobody smells anything. What do you do first?'),
      [
        pair('أفتح النوافذ وأبقى في الداخل', 'Open the windows and stay inside'),
        pair('أخرج الجميع إلى الهواء الطلق وأطلب العون من الخارج', 'Get everyone into fresh air and seek help from outside'),
        pair('أنتظر ظهور الأعراض', 'Wait for symptoms')
      ],
      1
    ],
    learningSections: [{
      title: pair('قبل أول ليلة باردة أو انقطاع كهرباء', 'Before the first cold night or power cut'),
      body: pair('اختاروا مسبقًا مكانًا آمنًا للمولّد بعيدًا عن نوافذ بيتكم والجيران، وتفقّدوا الإنذار وأجهزة التدفئة، واتفقوا على مكان خارجي تلتقون فيه عند سماع الإنذار.', 'Choose a safe generator location away from your windows and the neighbours’ windows. Check the alarm and heaters, and agree on a meeting point outside if the alarm sounds.'),
      sources: [basics, generator]
    }],
    art: 'air',
    tags: ['environment', 'home', 'family', 'older'],
    related: ['home-accident-safety', 'poisoning-first-aid', 'clean-air', 'adult-cpr'],
    sourceChecked: '2026-11-11',
    sources: [basics, response, generator],
    sectionSources: {
      about: [basics], symptoms: [basics, response], actions: [response, generator],
      prevention: [basics, generator], treatment: [response], avoid: [basics, generator],
      warning: [response], scene: [generator, response]
    }
  });

  R.searchAliases[id] = 'اول اكسيد الكربون أحادي أكسيد الكربون تسمم غاز اختناق مدفأة سخان مولد فحم عادم carbon monoxide CO generator charcoal heater';
  R.healthHubs.find(hub => hub.key === 'accidents')?.ids.unshift(id);
  for (const relatedId of ['home-accident-safety', 'poisoning-first-aid', 'clean-air']) {
    const topic = R.extra.find(article => article.id === relatedId);
    if (topic) (topic.related ||= []).unshift(id);
  }
})();
