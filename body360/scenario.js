window.BODY360 = (() => {
  const B=(en,ar)=>({en,ar});
  const mechanics = {
    worktop:{
      title:B('Lift station','محطة الرفع'),
      prompt:B('A supply box needs to be moved from the worktop. Choose the safer technique taught in the professor’s sheet.','يجب نقل صندوق مستلزمات من منضدة العمل. اختر التقنية الأكثر أمانًا كما وردت في ورقة الأستاذة.'),
      good:B('Move close to the object, widen your base, and use leg power rather than lifting with your back.','اقترب من الجسم، وسّع قاعدة الارتكاز، واستخدم قوة الساقين بدل الرفع بالظهر.'),
      bad:B('Stand away from the object and bend mainly through the back.','قف بعيدًا عن الجسم وانحنِ أساسًا باستخدام الظهر.'),
      rationale:B('Source rationale: staying close and using the legs reduces strain on the back.','مبرر المصدر: الاقتراب واستخدام الساقين يقللان إجهاد الظهر.')
    },
    shelf:{
      title:B('High shelf','الرف المرتفع'),
      prompt:B('You need to place a light item on a high shelf.','تحتاج إلى وضع غرض خفيف على رف مرتفع.'),
      good:B('Move as close to the shelf as possible so you do not have to reach.','اقترب من الرف قدر الإمكان حتى لا تضطر للتمدد بعيدًا.'),
      bad:B('Stay back and reach forward/upward as far as possible.','ابقَ بعيدًا ومد جسمك وذراعك إلى الأمام/الأعلى قدر الإمكان.'),
      rationale:B('Source rationale: avoiding unnecessary reaching helps prevent muscle strain.','مبرر المصدر: تجنب التمدد غير الضروري يساعد على الوقاية من إجهاد العضلات.')
    },
    floor:{
      title:B('Object on the floor','غرض على الأرض'),
      prompt:B('A small light object has fallen to the floor. Which technique is in the supplied teaching sheet?','سقط غرض صغير وخفيف على الأرض. أي تقنية وردت في ورقة التدريس المرفقة؟'),
      good:B('Use the Golfer Tee Lift: hold something sturdy, bend forward, and lift one leg for counterbalance.','استخدم Golfer Tee Lift: تمسّك بشيء ثابت، انحنِ للأمام وارفع ساقًا واحدة لتحقيق التوازن.'),
      bad:B('Twist your trunk and reach straight down while keeping both feet fixed.','لف جذعك ومد يدك إلى الأسفل مع تثبيت القدمين.'),
      rationale:B('Source rationale: the counterbalance relieves pressure on the lower back.','مبرر المصدر: التوازن المعاكس يخفف الضغط عن أسفل الظهر.')
    },
    pivot:{
      title:B('Pivot, don’t twist','ارتكز ولا تلف'),
      prompt:B('At the bedside you need to change direction.','بجانب السرير تحتاج إلى تغيير اتجاهك.'),
      good:B('Move your feet and pivot.','حرّك قدميك وارتكز لتغيير الاتجاه.'),
      bad:B('Keep your feet fixed and twist through the hips/trunk.','ثبّت قدميك ولف الوركين/الجذع.'),
      rationale:B('Source rationale: move the feet rather than the hips to keep weight centralized.','مبرر المصدر: حرّك القدمين بدل الوركين للمحافظة على تمركز الوزن.')
    },
    trolley:{
      title:B('Move the trolley','حرّك العربة'),
      prompt:B('The equipment trolley needs to move across the bay.','يجب تحريك عربة المعدات عبر مساحة التدريب.'),
      good:B('Push it while maintaining a controlled body position.','ادفعها مع المحافظة على وضع جسم متحكم به.'),
      bad:B('Pull it behind you while turning your trunk.','اسحبها خلفك مع لف الجذع.'),
      rationale:B('Source rationale: pushing gives more control and a better body position and is described as causing fewer injuries.','مبرر المصدر: الدفع يوفر تحكمًا أكبر ووضعًا أفضل للجسم، وتصفه المادة بأنه يقلل الإصابات.')
    },
    sitting:{
      title:B('Sitting posture','وضع الجلوس'),
      prompt:B('Choose the seated posture described in the professor’s teaching sheet.','اختر وضع الجلوس المذكور في ورقة الأستاذة.'),
      good:B('Feet supported; elbows and knees about 90–100°; forearms and thighs parallel to floor; lower back supported.','القدمان مدعومتان؛ المرفقان والركبتان نحو 90–100°؛ الساعدان والفخذان موازيان للأرض؛ وأسفل الظهر مدعوم.'),
      bad:B('Feet unsupported, no lower-back support, and remain slumped forward.','القدمان دون دعم، ولا دعم لأسفل الظهر، مع الانحناء للأمام.'),
      rationale:B('Source rationale: this supports relaxation and helps prevent back strain.','مبرر المصدر: يساعد هذا الوضع على الاسترخاء والوقاية من إجهاد الظهر.')
    },
    stretch:{
      title:B('Periodic stretch','التمدد الدوري'),
      prompt:B('Which activity is included in the supplied body-mechanics material?','أي نشاط وارد في مادة ميكانيكا الجسم المرفقة؟'),
      good:B('Periodically squeeze the shoulder blades, roll the shoulders, and stretch the back when standing.','بشكل دوري، ضم لوحي الكتف، وأدر الكتفين، ومد الظهر عند الوقوف.'),
      bad:B('Avoid changing posture throughout the day.','تجنب تغيير وضع الجسم طوال اليوم.'),
      rationale:B('Source rationale: periodic stretching promotes muscle relaxation.','مبرر المصدر: التمدد الدوري يعزز استرخاء العضلات.')
    }
  };

  const phases = {
    prepare:{
      title:B('Prepare Khaled','حضّر خالد'),
      note:B('Checklist-derived sequence. The uploaded turning/moving checklist combines hand washing and explaining the procedure as the first item.','تسلسل مستمد من القائمة. تجمع قائمة تدوير/تحريك المريض المرفقة غسل اليدين وشرح الإجراء في البند الأول.'),
      steps:[
        {id:'handwash',label:B('Hand washing','غسل اليدين'),u:.084,v:.413},
        {id:'explain',label:B('Explain the procedure to Khaled','اشرح الإجراء لخالد'),u:.517,v:.456}
      ]
    },
    side:{
      title:B('Supine → side-lying','الاستلقاء الظهري ← الاستلقاء الجانبي'),
      note:B('Perform the patient-preparation and turning sequence in the order given in the supplied checklist.','نفّذ تسلسل تجهيز المريض وتدويره حسب الترتيب الوارد في القائمة المرفقة.'),
      steps:[
        {id:'farArm',label:B('Farther arm across chest','الذراع الأبعد عبر الصدر'),u:.493,v:.445},
        {id:'nearArm',label:B('Near arm to his side','الذراع الأقرب بجانب الجسم'),u:.538,v:.455},
        {id:'farLeg',label:B('Farther leg across near leg','الساق الأبعد فوق الساق الأقرب'),u:.505,v:.515},
        {id:'hands',label:B('Nurse hands at far hip & shoulder','يدا الممرض عند الورك والكتف الأبعد'),u:.520,v:.475},
        {id:'turn3',label:B('Turn toward nurse on count of 3','أدر نحو الممرض عند العد إلى 3'),u:.517,v:.456},
        {id:'pillow',label:B('Support pillow under arms & legs','وسادة دعم تحت الذراعين والساقين'),u:.552,v:.520}
      ]
    },
    prone:{
      title:B('Supine → prone','الاستلقاء الظهري ← الانبطاح'),
      note:B('This sequence follows items 8–13 of the uploaded checklist.','يتبع هذا التسلسل البنود 8–13 من القائمة المرفقة.'),
      steps:[
        {id:'farArm',label:B('Farther arm across chest','الذراع الأبعد عبر الصدر'),u:.493,v:.445},
        {id:'nearArmUnder',label:B('Near arm under his side','الذراع الأقرب تحت جانبه'),u:.538,v:.455},
        {id:'farLeg',label:B('Farther leg across near leg','الساق الأبعد فوق الساق الأقرب'),u:.505,v:.515},
        {id:'hands',label:B('Nurse hands at far hip & shoulder','يدا الممرض عند الورك والكتف الأبعد'),u:.520,v:.475},
        {id:'turn3',label:B('Turn to prone on count of 3','أدر إلى الانبطاح عند العد إلى 3'),u:.517,v:.456},
        {id:'head',label:B('Turn the patient’s head to the side','أدر رأس المريض إلى الجانب'),u:.531,v:.430}
      ]
    },
    move:{
      title:B('Move patient to side of bed','حرّك المريض إلى جانب السرير'),
      note:B('The checklist divides this into an upper-body slide followed by a second slide for hips/legs.','تقسم القائمة هذا الإجراء إلى تحريك الجزء العلوي أولًا ثم تحريك الوركين/الساقين في مرحلة ثانية.'),
      steps:[
        {id:'upperHands',label:B('Hands under shoulder & hips','اليدان تحت الكتف والوركين'),u:.520,v:.475},
        {id:'upperSlide',label:B('Slide to side on count of 3','حرّك نحو الجانب عند العد إلى 3'),u:.517,v:.456},
        {id:'lowerHands',label:B('Hands under hips & legs','اليدان تحت الوركين والساقين'),u:.505,v:.505},
        {id:'lowerSlide',label:B('Slide lower body on count of 3','حرّك الجزء السفلي عند العد إلى 3'),u:.517,v:.456}
      ]
    }
  };

  const phaseRationales = {
    prepare:{
      handwash:B('The checklist requires hand washing before the patient-handling sequence. Infection-control rationale should be confirmed against the instructor’s hand-hygiene teaching file.','تتطلب القائمة غسل اليدين قبل تسلسل تحريك المريض. ويُراجع مبرر مكافحة العدوى بالرجوع إلى ملف تدريس نظافة اليدين لدى الأستاذة.'),
      explain:B('Supplemental teaching rationale — faculty review: explaining the procedure helps the patient understand what is about to happen and cooperate with the movement.','مبرر تدريسي إضافي — للمراجعة من عضو هيئة التدريس: شرح الإجراء يساعد المريض على فهم ما سيحدث والتعاون أثناء الحركة.')
    },
    side:{
      farArm:B('Supplemental rationale — faculty review: preparing the far arm first helps organize the body for the turn and reduces the chance that the limb is trapped during movement.','مبرر إضافي — للمراجعة: تجهيز الذراع الأبعد أولًا يساعد على تنظيم الجسم للدوران ويقلل احتمال انحشار الطرف أثناء الحركة.'),
      nearArm:B('Supplemental rationale — faculty review: placing the near arm as specified keeps it clear of the turning path.','مبرر إضافي — للمراجعة: وضع الذراع الأقرب كما هو محدد يُبعده عن مسار الدوران.'),
      farLeg:B('Supplemental rationale — faculty review: leg preparation helps the pelvis and lower body follow the turn as one coordinated movement.','مبرر إضافي — للمراجعة: تجهيز الساق يساعد الحوض والجزء السفلي على اتباع الدوران كحركة منسقة.'),
      hands:B('Checklist point: hand placement is at the farther hip and shoulder before the turn. Supplemental rationale — faculty review: controlling shoulder and hip supports coordinated movement of the trunk.','نقطة من القائمة: توضع اليدان عند الورك والكتف الأبعد قبل الدوران. مبرر إضافي — للمراجعة: التحكم بالكتف والورك يساعد على تحريك الجذع بشكل منسق.'),
      turn3:B('Checklist point: turn toward the nurse on the count of 3. Supplemental rationale — faculty review: the count coordinates effort and reduces sudden, unplanned movement.','نقطة من القائمة: تدوير المريض نحو الممرض عند العد إلى 3. مبرر إضافي — للمراجعة: العد ينسق الجهد ويقلل الحركة المفاجئة غير المخططة.'),
      pillow:B('Checklist point: finish by supporting the arms and legs with a pillow. Supplemental rationale — faculty review: support helps maintain the achieved position and comfort.','نقطة من القائمة: تُختتم الخطوة بدعم الذراعين والساقين بوسادة. مبرر إضافي — للمراجعة: يساعد الدعم على تثبيت الوضع وتحسين الراحة.')
    },
    prone:{
      farArm:B('Checklist-derived action. Supplemental rationale — faculty review: prepare the limb before the turn so it is not trapped beneath the patient.','إجراء مستمد من القائمة. مبرر إضافي — للمراجعة: جهّز الطرف قبل الدوران حتى لا ينحشر تحت المريض.'),
      nearArmUnder:B('Checklist-derived action. The uploaded checklist specifically places the near arm under the patient’s side before the prone turn.','إجراء مستمد من القائمة. تنص القائمة المرفقة تحديدًا على وضع الذراع الأقرب تحت جانب المريض قبل الدوران إلى الانبطاح.'),
      farLeg:B('Checklist-derived action. Supplemental rationale — faculty review: leg preparation helps the lower body follow the roll.','إجراء مستمد من القائمة. مبرر إضافي — للمراجعة: تجهيز الساق يساعد الجزء السفلي على متابعة الدوران.'),
      hands:B('Checklist point: hands are placed at the farther hip and shoulder before turning.','نقطة من القائمة: توضع اليدان عند الورك والكتف الأبعد قبل الدوران.'),
      turn3:B('Checklist point: the turn to prone occurs on the count of 3. Supplemental rationale — faculty review: counting coordinates the movement.','نقطة من القائمة: يتم الدوران إلى الانبطاح عند العد إلى 3. مبرر إضافي — للمراجعة: العد ينسق الحركة.'),
      head:B('Checklist point: after the prone turn, turn the patient’s head to the side.','نقطة من القائمة: بعد الدوران إلى الانبطاح، يُدار رأس المريض إلى الجانب.')
    },
    move:{
      upperHands:B('Checklist point: first place the nurse’s hands under the patient’s shoulder and hips.','نقطة من القائمة: توضع يدا الممرض أولًا تحت كتف المريض ووركيه.'),
      upperSlide:B('Checklist point: slide the patient toward the side of the bed on the count of 3. Supplemental rationale — faculty review: the count coordinates the effort.','نقطة من القائمة: يُحرّك المريض نحو جانب السرير عند العد إلى 3. مبرر إضافي — للمراجعة: العد ينسق الجهد.'),
      lowerHands:B('Checklist point: reposition the hands under the hips and legs for the lower-body phase.','نقطة من القائمة: أعد وضع اليدين تحت الوركين والساقين لمرحلة الجزء السفلي.'),
      lowerSlide:B('Checklist point: complete the second slide on the count of 3.','نقطة من القائمة: أكمل التحريك الثاني عند العد إلى 3.')
    }
  };

  const objects=[
    {id:'patient',label:B('Khaled','خالد'),u:.517,v:.456,kind:'patient'},
    {id:'worktop',label:B('Lift station','محطة الرفع'),u:.895,v:.556,kind:'mechanics',key:'worktop'},
    {id:'shelf',label:B('High shelf','الرف المرتفع'),u:.930,v:.410,kind:'mechanics',key:'shelf'},
    {id:'floor',label:B('Floor object','غرض على الأرض'),u:.377,v:.703,kind:'mechanics',key:'floor'},
    {id:'pivot',label:B('Pivot point','نقطة الارتكاز'),u:.623,v:.823,kind:'mechanics',key:'pivot'},
    {id:'trolley',label:B('Trolley','العربة'),u:.907,v:.610,kind:'mechanics',key:'trolley'},
    {id:'sitting',label:B('Sitting posture','وضع الجلوس'),u:.232,v:.520,kind:'mechanics',key:'sitting'},
    {id:'stretch',label:B('Stretch','تمدد'),u:.255,v:.365,kind:'mechanics',key:'stretch'}
  ];
  return {B,mechanics,phases,phaseRationales,objects};
})();