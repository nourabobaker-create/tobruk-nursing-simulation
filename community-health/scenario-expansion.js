/* Original fictional learning scenes. Primary references support the advice; faculty clinical review pending. */
(()=>{
const additions=[
  {
    "id": "low-glucose-decision",
    "version": "1.0.0",
    "title": "تعرق ورجفة قبل الغداء",
    "intro": "والدك البالغ مصاب بالسكري. هو واعٍ ويستطيع البلع، وقياسه 58 ملغم/دل.",
    "art": "glucose-low",
    "topics": [
      "diabetes-hypoglycemia"
    ],
    "sources": [
      {
        "title": "NHS — تعرق ورجفة قبل الغداء",
        "url": "https://www.nhs.uk/conditions/low-blood-sugar-hypoglycaemia/"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "ما أول تصرف؟",
        "sources": [
          "https://www.nhs.uk/conditions/low-blood-sugar-hypoglycaemia/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "أعطيه سكرًا سريع الامتصاص وفق خطة علاج الهبوط.",
            "safe": true,
            "next": "care",
            "feedback": "الهبوط يحتاج سكرًا سريعًا إذا كان الشخص واعيًا ويبلع بأمان؛ الإنسولين الإضافي يزيد الخطر."
          },
          {
            "id": "review",
            "label": "أعطيه جرعة إنسولين إضافية.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "الهبوط يحتاج سكرًا سريعًا إذا كان الشخص واعيًا ويبلع بأمان؛ الإنسولين الإضافي يزيد الخطر."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "قبل إعطائه شيئًا بالفم، ماذا تتحقق؟",
        "sources": [
          "https://www.nhs.uk/conditions/low-blood-sugar-hypoglycaemia/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أصب العصير ولو لم يستجب.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "لا تعط طعامًا أو شرابًا لفاقد الوعي. اطلب الإسعاف واتبع تعليماته؛ الغلوكاغون عند توفره ومعرفة استعماله."
          },
          {
            "id": "safe",
            "label": "أنه يستجيب ويبلع بأمان.",
            "safe": true,
            "next": "care",
            "feedback": "لا تعط طعامًا أو شرابًا لفاقد الوعي. اطلب الإسعاف واتبع تعليماته؛ الغلوكاغون عند توفره ومعرفة استعماله."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "تحسن قليلًا بعد السكر؛ ماذا الآن؟",
        "sources": [
          "https://www.nhs.uk/conditions/low-blood-sugar-hypoglycaemia/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "أعيد القياس بعد 10–15 دقيقة وأكرر العلاج إن بقي منخفضًا.",
            "safe": true,
            "next": "follow",
            "feedback": "إعادة القياس مهمة؛ إن بقي منخفضًا كرر السكر السريع وفق الخطة، واطلب المساعدة إذا لم يتحسن."
          },
          {
            "id": "review",
            "label": "أعتبر تحسن الشعور كافيًا.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "إعادة القياس مهمة؛ إن بقي منخفضًا كرر السكر السريع وفق الخطة، واطلب المساعدة إذا لم يتحسن."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "بعد استقرار القياس، كيف تمنع تكراره؟",
        "sources": [
          "https://www.nhs.uk/conditions/low-blood-sugar-hypoglycaemia/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أوقف جميع الأدوية من نفسي.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "بعد التحسن يحتاج طعامًا يدوم أثره أو وجبته المستحقة. تكرر الهبوط يستدعي مراجعة العلاج مع الفريق."
          },
          {
            "id": "safe",
            "label": "وجبة مناسبة ومراجعة سبب الهبوط مع الفريق.",
            "safe": true,
            "next": null,
            "feedback": "بعد التحسن يحتاج طعامًا يدوم أثره أو وجبته المستحقة. تكرر الهبوط يستدعي مراجعة العلاج مع الفريق."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "diabetes-vomiting",
    "version": "1.0.0",
    "title": "سكري وقيء: الانتظار أم طلب المساعدة؟",
    "intro": "مصاب بالسكري يتقيأ ولا يستطيع الاحتفاظ بالسوائل منذ ساعات، وبوله قليل.",
    "art": "diabetes-illness",
    "topics": [
      "diabetes-sick-days"
    ],
    "sources": [
      {
        "title": "CDC — سكري وقيء: الانتظار أم طلب المساعدة؟",
        "url": "https://www.cdc.gov/diabetes/living-with/managing-sick-days.html"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "ماذا تختار؟",
        "sources": [
          "https://www.cdc.gov/diabetes/living-with/managing-sick-days.html"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أنتظر حتى الغد لأنه لا يأكل.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "المرض قد يرفع السكر رغم قلة الطعام. عدم الاحتفاظ بالسوائل وقلة البول يحتاجان تقييمًا عاجلًا."
          },
          {
            "id": "safe",
            "label": "أطلب تقييمًا عاجلًا بسبب القيء والجفاف.",
            "safe": true,
            "next": "care",
            "feedback": "المرض قد يرفع السكر رغم قلة الطعام. عدم الاحتفاظ بالسوائل وقلة البول يحتاجان تقييمًا عاجلًا."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "هل رقم السكر الطبيعي يضمن الأمان؟",
        "sources": [
          "https://www.cdc.gov/diabetes/living-with/managing-sick-days.html"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "لا؛ أبلغ الفريق بالأعراض والقياسات.",
            "safe": true,
            "next": "care",
            "feedback": "القيء والجفاف قد يكونان خطرين حتى دون ارتفاع شديد للسكر؛ أخبر الفريق بكل الأعراض والأدوية."
          },
          {
            "id": "review",
            "label": "نعم؛ لا حاجة للمساعدة.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "القيء والجفاف قد يكونان خطرين حتى دون ارتفاع شديد للسكر؛ أخبر الفريق بكل الأعراض والأدوية."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "أثناء ترتيب المساعدة، ماذا تتابع؟",
        "sources": [
          "https://www.cdc.gov/diabetes/living-with/managing-sick-days.html"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أؤجل المساعدة حتى أجمع قياسات كثيرة.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "اتبع خطة أيام المرض وراقب السكر والكيتونات إن توفرت، لكن لا تؤخر التقييم لإجراء فحوص منزلية."
          },
          {
            "id": "safe",
            "label": "السكر والكيتونات بحسب خطته دون تأخير التقييم.",
            "safe": true,
            "next": "follow",
            "feedback": "اتبع خطة أيام المرض وراقب السكر والكيتونات إن توفرت، لكن لا تؤخر التقييم لإجراء فحوص منزلية."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "كيف تستعد للمرة المقبلة؟",
        "sources": [
          "https://www.cdc.gov/diabetes/living-with/managing-sick-days.html"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "أطلب خطة مكتوبة للسوائل والأدوية ومتى أتوجه للطوارئ.",
            "safe": true,
            "next": null,
            "feedback": "خطة أيام المرض شخصية. راجع الفريق بشأن الأدوية أثناء الجفاف، ولا تتبادل الجرعات أو توقف الإنسولين عشوائيًا."
          },
          {
            "id": "review",
            "label": "أستعمل جرعة قريب لي.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "خطة أيام المرض شخصية. راجع الفريق بشأن الأدوية أثناء الجفاف، ولا تتبادل الجرعات أو توقف الإنسولين عشوائيًا."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "high-glucose-plan",
    "version": "1.0.0",
    "title": "قراءة مرتفعة بعد وجبة كبيرة",
    "intro": "أكل صديقك كمية كبيرة ويريد حقن جرعات متقاربة حتى يعود الرقم سريعًا.",
    "art": "diabetes-plan",
    "topics": [
      "diabetes-high-correction",
      "diabetes-food-portions"
    ],
    "sources": [
      {
        "title": "NHS — قراءة مرتفعة بعد وجبة كبيرة",
        "url": "https://www.nhs.uk/conditions/diabetic-ketoacidosis/"
      },
      {
        "title": "Joslin — تداخل أثر جرعات الإنسولين",
        "url": "https://joslin.org/news-stories/all-news-stories/education/2019/11/insulin-stacking"
      },
      {
        "title": "CDC — تخطيط وجبات السكري",
        "url": "https://www.cdc.gov/diabetes/healthy-eating/diabetes-meal-planning.html"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "كيف ترد؟",
        "sources": [
          "https://joslin.org/news-stories/all-news-stories/education/2019/11/insulin-stacking"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "أمنع التخمين وأرجع لخطة التصحيح الشخصية.",
            "safe": true,
            "next": "care",
            "feedback": "تكرار الجرعات بلا خطة قد يسبب هبوطًا لاحقًا. لا توجد جرعة تصحيح موحدة لجميع المرضى."
          },
          {
            "id": "review",
            "label": "أقترح جرعة صديقه نفسها.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "تكرار الجرعات بلا خطة قد يسبب هبوطًا لاحقًا. لا توجد جرعة تصحيح موحدة لجميع المرضى."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "ظهر قيء وألم بطن وتنفس غير طبيعي؛ ماذا تفعل؟",
        "sources": [
          "https://www.nhs.uk/conditions/diabetic-ketoacidosis/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أنتظر مفعول جرعة أخرى.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "القيء وألم البطن والتنفس غير الطبيعي مع السكري قد تشير إلى الحماض الكيتوني؛ تحتاج مساعدة عاجلة."
          },
          {
            "id": "safe",
            "label": "أطلب الطوارئ فورًا.",
            "safe": true,
            "next": "care",
            "feedback": "القيء وألم البطن والتنفس غير الطبيعي مع السكري قد تشير إلى الحماض الكيتوني؛ تحتاج مساعدة عاجلة."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "قبل أي تصحيح موصوف، ما المعلومات المهمة؟",
        "sources": [
          "https://joslin.org/news-stories/all-news-stories/education/2019/11/insulin-stacking"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "وقت آخر جرعة وقياسات السكر والكيتونات وفق الخطة.",
            "safe": true,
            "next": "follow",
            "feedback": "وقت الجرعات السابقة مهم لمنع تداخل أثر الإنسولين. اتبع الخطة الطبية وتواصل مع الفريق عند الشك."
          },
          {
            "id": "review",
            "label": "رقم السكر وحده مهما كان توقيت الحقن.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "وقت الجرعات السابقة مهم لمنع تداخل أثر الإنسولين. اتبع الخطة الطبية وتواصل مع الفريق عند الشك."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "ما الاتفاق الأفضل للوجبات المقبلة؟",
        "sources": [
          "https://www.cdc.gov/diabetes/healthy-eating/diabetes-meal-planning.html"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أكل مفتوح ثم تعويضه دائمًا بالحقن.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "زيادة الجرعات لا تجعل الإفراط في الطعام آمنًا. خطط للحصص والكربوهيدرات مع فريق السكري."
          },
          {
            "id": "safe",
            "label": "حصص مناسبة وخطة غذاء وعلاج متوازنة.",
            "safe": true,
            "next": null,
            "feedback": "زيادة الجرعات لا تجعل الإفراط في الطعام آمنًا. خطط للحصص والكربوهيدرات مع فريق السكري."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "stroke-at-home",
    "version": "1.0.0",
    "title": "كلام مفاجئ غير واضح",
    "intro": "أثناء الحديث انحرف فم جدك وضعفت ذراعه وأصبح كلامه غير واضح فجأة.",
    "art": "stroke",
    "topics": [
      "stroke",
      "after-stroke"
    ],
    "sources": [
      {
        "title": "NHS — كلام مفاجئ غير واضح",
        "url": "https://www.nhs.uk/conditions/stroke/symptoms/"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "ماذا تفعل أولًا؟",
        "sources": [
          "https://www.nhs.uk/conditions/stroke/symptoms/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أتركه ينام ليتحسن.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "اعوجاج الوجه وضعف الذراع واضطراب الكلام المفاجئ علامات تستدعي الإسعاف؛ الوقت يؤثر في فرص العلاج."
          },
          {
            "id": "safe",
            "label": "أطلب الإسعاف المحلي فورًا.",
            "safe": true,
            "next": "care",
            "feedback": "اعوجاج الوجه وضعف الذراع واضطراب الكلام المفاجئ علامات تستدعي الإسعاف؛ الوقت يؤثر في فرص العلاج."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "اختفت العلامات بعد دقائق؛ هل تلغي الطلب؟",
        "sources": [
          "https://www.nhs.uk/conditions/stroke/symptoms/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "لا؛ أخبر الإسعاف بما حدث.",
            "safe": true,
            "next": "care",
            "feedback": "اختفاء الأعراض لا يلغي الحاجة إلى التقييم العاجل؛ قد تكون نوبة إنذار تسبق سكتة أخرى."
          },
          {
            "id": "review",
            "label": "نعم؛ زال الخطر.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "اختفاء الأعراض لا يلغي الحاجة إلى التقييم العاجل؛ قد تكون نوبة إنذار تسبق سكتة أخرى."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "ما الذي تسجله أثناء انتظار المساعدة؟",
        "sources": [
          "https://www.nhs.uk/conditions/stroke/symptoms/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أجرب اختبار المشي لإثبات تحسنه.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "وقت البداية أو آخر وقت شوهد طبيعيًا معلومة مهمة للفريق. لا تؤخر الإسعاف باختبارات منزلية."
          },
          {
            "id": "safe",
            "label": "وقت بداية الأعراض أو آخر وقت كان طبيعيًا.",
            "safe": true,
            "next": "follow",
            "feedback": "وقت البداية أو آخر وقت شوهد طبيعيًا معلومة مهمة للفريق. لا تؤخر الإسعاف باختبارات منزلية."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "كيف تساعد الفريق عند وصوله؟",
        "sources": [
          "https://www.nhs.uk/conditions/stroke/symptoms/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "أصف العلامات وتوقيتها وأذكر أدويته.",
            "safe": true,
            "next": null,
            "feedback": "قد يحتاج الفريق وصف ما شاهدته حتى لو اختفت العلامات. أحضر قائمة الأدوية والمعلومات المتاحة."
          },
          {
            "id": "review",
            "label": "أخفي ما حدث لأنه تحسن.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "قد يحتاج الفريق وصف ما شاهدته حتى لو اختفت العلامات. أحضر قائمة الأدوية والمعلومات المتاحة."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "heat-confusion",
    "version": "1.0.0",
    "title": "ارتباك تحت الشمس",
    "intro": "في يوم شديد الحرارة أصبح عامل مرتبكًا ومترنحًا بعد عمل طويل خارج المنزل.",
    "art": "heat",
    "topics": [
      "heat",
      "children-heat"
    ],
    "sources": [
      {
        "title": "NHS — ارتباك تحت الشمس",
        "url": "https://www.nhs.uk/conditions/heat-exhaustion-heatstroke/"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "ماذا تختار؟",
        "sources": [
          "https://www.nhs.uk/conditions/heat-exhaustion-heatstroke/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "أطلب الإسعاف وأنقله لمكان أبرد بأمان وأبدأ تبريده.",
            "safe": true,
            "next": "care",
            "feedback": "الارتباك بعد التعرض للحر قد يعني ضربة حرارة. اطلب الإسعاف وابدأ التبريد فورًا دون انتظار."
          },
          {
            "id": "review",
            "label": "أعطيه قهوة ليكمل عمله.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "الارتباك بعد التعرض للحر قد يعني ضربة حرارة. اطلب الإسعاف وابدأ التبريد فورًا دون انتظار."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "هل تعطيه ماء وهو غير قادر على البلع بأمان؟",
        "sources": [
          "https://www.nhs.uk/conditions/heat-exhaustion-heatstroke/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "نعم؛ أجبره على الشرب.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "لا تعط شرابًا لشخص مضطرب الوعي لا يبلع بأمان؛ قد يختنق. واصل التبريد والمراقبة."
          },
          {
            "id": "safe",
            "label": "لا؛ أتبع تعليمات الإسعاف.",
            "safe": true,
            "next": "care",
            "feedback": "لا تعط شرابًا لشخص مضطرب الوعي لا يبلع بأمان؛ قد يختنق. واصل التبريد والمراقبة."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "ماذا يساعد أثناء انتظار الإسعاف؟",
        "sources": [
          "https://www.nhs.uk/conditions/heat-exhaustion-heatstroke/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "تخفيف الملابس الزائدة وترطيب الجلد وتهويته.",
            "safe": true,
            "next": "follow",
            "feedback": "تبريد الجلد بالماء والتهوية يساعدان على خفض الحرارة. لا تتركه وحده ولا تؤخر الإسعاف."
          },
          {
            "id": "review",
            "label": "تغطيته ببطانية سميكة.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "تبريد الجلد بالماء والتهوية يساعدان على خفض الحرارة. لا تتركه وحده ولا تؤخر الإسعاف."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "للوقاية في اليوم التالي؟",
        "sources": [
          "https://www.nhs.uk/conditions/heat-exhaustion-heatstroke/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "الانتظار حتى الدوار قبل الراحة.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "الراحة والظل والشرب المنتظم وتعديل وقت العمل تقلل الخطر؛ الأطفال وكبار السن يحتاجون انتباهًا خاصًا."
          },
          {
            "id": "safe",
            "label": "تنظيم الراحة والظل والشرب وتجنب أشد ساعات الحر.",
            "safe": true,
            "next": null,
            "feedback": "الراحة والظل والشرب المنتظم وتعديل وقت العمل تقلل الخطر؛ الأطفال وكبار السن يحتاجون انتباهًا خاصًا."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "kitchen-scald",
    "version": "1.0.0",
    "title": "انسكب الشاي الساخن",
    "intro": "انسكب سائل ساخن على ساعد أحد أفراد الأسرة. المكان الآن آمن.",
    "art": "burn",
    "topics": [
      "burns",
      "burn-recovery"
    ],
    "sources": [
      {
        "title": "NHS — انسكب الشاي الساخن",
        "url": "https://www.nhs.uk/conditions/burns-and-scalds/"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "بم تبدأ؟",
        "sources": [
          "https://www.nhs.uk/conditions/burns-and-scalds/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "معجون أسنان أو ثلج مباشر.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "برّد الحرق بالماء الجاري لمدة 20 دقيقة. الثلج والكريمات المنزلية قد يزيدان الأذى."
          },
          {
            "id": "safe",
            "label": "ماء جارٍ بارد باعتدال لمدة 20 دقيقة.",
            "safe": true,
            "next": "care",
            "feedback": "برّد الحرق بالماء الجاري لمدة 20 دقيقة. الثلج والكريمات المنزلية قد يزيدان الأذى."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "خاتم قريب من الحرق؛ ماذا تفعل؟",
        "sources": [
          "https://www.nhs.uk/conditions/burns-and-scalds/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "أنزعه برفق إن أمكن دون نزع ما التصق بالجلد.",
            "safe": true,
            "next": "care",
            "feedback": "انزع الحلي والملابس القريبة برفق قبل التورم، واترك أي شيء ملتصق بالحرق للفريق الصحي."
          },
          {
            "id": "review",
            "label": "أشد الجلد والملابس الملتصقة.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "انزع الحلي والملابس القريبة برفق قبل التورم، واترك أي شيء ملتصق بالحرق للفريق الصحي."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "ظهرت فقاعة؛ كيف تتعامل؟",
        "sources": [
          "https://www.nhs.uk/conditions/burns-and-scalds/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أثقبها بإبرة منزلية.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "لا تفتح الفقاعات ولا تستخدم ضمادًا لاصقًا على الحرق. الحروق الكبيرة أو العميقة تحتاج تقييمًا عاجلًا."
          },
          {
            "id": "safe",
            "label": "أتركها وأغطي الحرق بعد تبريده بغطاء نظيف غير لاصق.",
            "safe": true,
            "next": "follow",
            "feedback": "لا تفتح الفقاعات ولا تستخدم ضمادًا لاصقًا على الحرق. الحروق الكبيرة أو العميقة تحتاج تقييمًا عاجلًا."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "اتضح أن الحرق كبير أو عميق؛ ماذا الآن؟",
        "sources": [
          "https://www.nhs.uk/conditions/burns-and-scalds/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "أطلب الطوارئ.",
            "safe": true,
            "next": null,
            "feedback": "الحروق الكبيرة والعميقة، وحروق الوجه أو الكهرباء أو المواد الكيميائية تحتاج رعاية طارئة."
          },
          {
            "id": "review",
            "label": "أكتفي بوصفة منزلية.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "الحروق الكبيرة والعميقة، وحروق الوجه أو الكهرباء أو المواد الكيميائية تحتاج رعاية طارئة."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "pregnancy-headache",
    "version": "1.0.0",
    "title": "صداع شديد أثناء الحمل",
    "intro": "حامل تعاني صداعًا شديدًا وزغللة وألمًا أعلى البطن.",
    "art": "pregnancy-pressure",
    "topics": [
      "pregnancy-pressure",
      "maternal-danger"
    ],
    "sources": [
      {
        "title": "NHS — صداع شديد أثناء الحمل",
        "url": "https://www.nhs.uk/conditions/pre-eclampsia/"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "ماذا تنصح؟",
        "sources": [
          "https://www.nhs.uk/conditions/pre-eclampsia/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "التواصل الفوري مع طوارئ الولادة أو الإسعاف.",
            "safe": true,
            "next": "care",
            "feedback": "هذه علامات قد ترافق ما قبل تسمم الحمل وتحتاج تقييمًا فوريًا؛ لا تنتظر الموعد المعتاد."
          },
          {
            "id": "review",
            "label": "النوم حتى موعد الزيارة القادم.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "هذه علامات قد ترافق ما قبل تسمم الحمل وتحتاج تقييمًا فوريًا؛ لا تنتظر الموعد المعتاد."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "ليس لديها جهاز ضغط؛ هل تؤجل؟",
        "sources": [
          "https://www.nhs.uk/conditions/pre-eclampsia/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "نعم؛ لا مشكلة بلا قياس.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "لا تؤخر التقييم بحثًا عن جهاز؛ الصداع الشديد واضطراب الرؤية وألم أعلى البطن علامات إنذار."
          },
          {
            "id": "safe",
            "label": "لا؛ الأعراض تكفي لطلب المساعدة.",
            "safe": true,
            "next": "care",
            "feedback": "لا تؤخر التقييم بحثًا عن جهاز؛ الصداع الشديد واضطراب الرؤية وألم أعلى البطن علامات إنذار."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "تقترح قريبة دواء ضغطها؛ ماذا تختار؟",
        "sources": [
          "https://www.nhs.uk/conditions/pre-eclampsia/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "أرفض تبادل الأدوية وأتبع الفريق المعالج.",
            "safe": true,
            "next": "follow",
            "feedback": "أدوية الضغط تختلف ملاءمتها للحمل. يلزم تقييم وخطة طبية، ولا تؤخذ وصفة شخص آخر."
          },
          {
            "id": "review",
            "label": "أجرب نصف حبة.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "أدوية الضغط تختلف ملاءمتها للحمل. يلزم تقييم وخطة طبية، ولا تؤخذ وصفة شخص آخر."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "هل ينتهي الانتباه لهذه العلامات فور الولادة؟",
        "sources": [
          "https://www.nhs.uk/conditions/pre-eclampsia/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "نعم؛ الولادة تلغي الخطر فورًا.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "قد تظهر ما قبل تسمم الحمل بعد الولادة. الصداع الشديد والزغللة حينها يستلزمان طلب المساعدة أيضًا."
          },
          {
            "id": "safe",
            "label": "لا؛ قد تظهر المشكلة بعد الولادة أيضًا.",
            "safe": true,
            "next": null,
            "feedback": "قد تظهر ما قبل تسمم الحمل بعد الولادة. الصداع الشديد والزغللة حينها يستلزمان طلب المساعدة أيضًا."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "newborn-yellow",
    "version": "1.0.0",
    "title": "اصفرار في اليوم الأول",
    "intro": "لاحظت الأسرة اصفرار جلد مولود لم يكمل يومه الأول.",
    "art": "newborn-care",
    "topics": [
      "newborn-first-week",
      "newborn-check"
    ],
    "sources": [
      {
        "title": "NHS — اصفرار في اليوم الأول",
        "url": "https://www.nhs.uk/conditions/jaundice-in-babies/"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "ماذا تختار؟",
        "sources": [
          "https://www.nhs.uk/conditions/jaundice-in-babies/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أنتظر عدة أيام.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "ظهور الاصفرار في أول 24 ساعة يحتاج تقييمًا عاجلًا وقياس البيليروبين؛ النظر وحده لا يحدد شدته."
          },
          {
            "id": "safe",
            "label": "أطلب تقييمًا طبيًا عاجلًا.",
            "safe": true,
            "next": "care",
            "feedback": "ظهور الاصفرار في أول 24 ساعة يحتاج تقييمًا عاجلًا وقياس البيليروبين؛ النظر وحده لا يحدد شدته."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "نصحهم شخص بوضعه تحت الشمس بدل الكشف؛ ماذا تقول؟",
        "sources": [
          "https://www.nhs.uk/conditions/jaundice-in-babies/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "لا أستبدل التقييم بالشمس.",
            "safe": true,
            "next": "care",
            "feedback": "الشمس ليست بديلًا آمنًا عن التقييم والعلاج الموصوف. قد يحتاج المولود علاجًا ضوئيًا طبيًا."
          },
          {
            "id": "review",
            "label": "الشمس تكفي لكل اصفرار.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "الشمس ليست بديلًا آمنًا عن التقييم والعلاج الموصوف. قد يحتاج المولود علاجًا ضوئيًا طبيًا."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "صار صعب الإيقاظ وضعفت رضاعته؛ ماذا تفعل؟",
        "sources": [
          "https://www.nhs.uk/conditions/jaundice-in-babies/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أتركه ينام حتى يجوع.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "النعاس غير المعتاد وضعف الرضاعة مع الاصفرار علامات خطرة تحتاج مساعدة عاجلة."
          },
          {
            "id": "safe",
            "label": "أطلب مساعدة طارئة الآن.",
            "safe": true,
            "next": "follow",
            "feedback": "النعاس غير المعتاد وضعف الرضاعة مع الاصفرار علامات خطرة تحتاج مساعدة عاجلة."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "بعد الفحص، كيف تتابع الأسرة؟",
        "sources": [
          "https://www.nhs.uk/conditions/jaundice-in-babies/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "تلتزم بموعد إعادة القياس وتعليمات الرضاعة.",
            "safe": true,
            "next": null,
            "feedback": "اتبع موعد إعادة القياس وخطة الفريق؛ تحسن اللون لا يغني عن المتابعة الموصوفة."
          },
          {
            "id": "review",
            "label": "تتوقف عن المتابعة بمجرد تحسن اللون.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "اتبع موعد إعادة القياس وخطة الفريق؛ تحسن اللون لا يغني عن المتابعة الموصوفة."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "child-diarrhoea",
    "version": "1.0.0",
    "title": "طفل وإسهال متكرر",
    "intro": "طفل صغير لديه إسهال ويشرب قليلًا. تريد الأسرة منع الجفاف.",
    "art": "water",
    "topics": [
      "child-dehydration",
      "infectious-diarrhoea"
    ],
    "sources": [
      {
        "title": "منظمة الصحة العالمية — طفل وإسهال متكرر",
        "url": "https://www.who.int/ar/news-room/fact-sheets/detail/diarrhoeal-disease"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "ما التصرف الأفضل؟",
        "sources": [
          "https://www.who.int/ar/news-room/fact-sheets/detail/diarrhoeal-disease"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "أقدم محلول الإماهة الفموي بالطريقة المكتوبة وأواصل الرضاعة.",
            "safe": true,
            "next": "care",
            "feedback": "محلول الإماهة يعوض الماء والأملاح؛ حضره بالكمية المحددة من الماء المأمون ولا تمنع الرضاعة."
          },
          {
            "id": "review",
            "label": "أمنع السوائل ليتوقف الإسهال.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "محلول الإماهة يعوض الماء والأملاح؛ حضره بالكمية المحددة من الماء المأمون ولا تمنع الرضاعة."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "هل العصير الكثير يعوض محلول الإماهة؟",
        "sources": [
          "https://www.who.int/ar/news-room/fact-sheets/detail/diarrhoeal-disease"
        ],
        "choices": [
          {
            "id": "review",
            "label": "نعم؛ أي شراب حلو يساويه.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "محلول الإماهة تركيبة متوازنة من الأملاح والسكر، ولا يعوضه العصير أو المشروب الغازي."
          },
          {
            "id": "safe",
            "label": "لا؛ أستخدم المحلول المخصص.",
            "safe": true,
            "next": "care",
            "feedback": "محلول الإماهة تركيبة متوازنة من الأملاح والسكر، ولا يعوضه العصير أو المشروب الغازي."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "أصبح خاملًا ولا يستطيع الشرب؛ ماذا تختار؟",
        "sources": [
          "https://www.who.int/ar/news-room/fact-sheets/detail/diarrhoeal-disease"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "تقييم طارئ فورًا.",
            "safe": true,
            "next": "follow",
            "feedback": "الخمول وعدم القدرة على الشرب من علامات الخطر؛ قد يحتاج الطفل سوائل ورعاية لا تتوفر في المنزل."
          },
          {
            "id": "review",
            "label": "جرعة إضافية من دواء منزلي.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "الخمول وعدم القدرة على الشرب من علامات الخطر؛ قد يحتاج الطفل سوائل ورعاية لا تتوفر في المنزل."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "للحد من انتقال العدوى؟",
        "sources": [
          "https://www.who.int/ar/news-room/fact-sheets/detail/diarrhoeal-disease"
        ],
        "choices": [
          {
            "id": "review",
            "label": "مشاركة المناشف بلا غسل اليدين.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "غسل اليدين بالماء والصابون ومأمونية الطعام والماء يقللان انتقال أسباب الإسهال بين أفراد الأسرة."
          },
          {
            "id": "safe",
            "label": "غسل اليدين وماء مأمون وطعام نظيف.",
            "safe": true,
            "next": null,
            "feedback": "غسل اليدين بالماء والصابون ومأمونية الطعام والماء يقللان انتقال أسباب الإسهال بين أفراد الأسرة."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "animal-bite-action",
    "version": "1.0.0",
    "title": "عضة من حيوان مجهول",
    "intro": "خُدش جلد طفل بعضة كلب لا تعرف الأسرة حالته الصحية.",
    "art": "rabies",
    "topics": [
      "animal-bites-rabies"
    ],
    "sources": [
      {
        "title": "منظمة الصحة العالمية — عضة من حيوان مجهول",
        "url": "https://www.who.int/ar/news-room/fact-sheets/detail/rabies"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "ماذا تفعل فورًا؟",
        "sources": [
          "https://www.who.int/ar/news-room/fact-sheets/detail/rabies"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أنتظر ظهور أعراض داء الكلب.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "غسل الجرح جيدًا لمدة 15 دقيقة وطلب التقييم فورًا مهمان؛ الوقاية بعد التعرض لا تنتظر ظهور الأعراض."
          },
          {
            "id": "safe",
            "label": "أغسل الجرح بالماء والصابون 15 دقيقة وأطلب الرعاية فورًا.",
            "safe": true,
            "next": "care",
            "feedback": "غسل الجرح جيدًا لمدة 15 دقيقة وطلب التقييم فورًا مهمان؛ الوقاية بعد التعرض لا تنتظر ظهور الأعراض."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "هل تضع مواد حارقة على الجرح؟",
        "sources": [
          "https://www.who.int/ar/news-room/fact-sheets/detail/rabies"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "لا؛ أواصل الغسل وأرتب الوصول للرعاية.",
            "safe": true,
            "next": "care",
            "feedback": "لا تستخدم الكي أو المواد المهيجة. يحتاج التعرض لتقييم اللقاح والعلاجات المناسبة سريعًا."
          },
          {
            "id": "review",
            "label": "أكويه بالنار.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "لا تستخدم الكي أو المواد المهيجة. يحتاج التعرض لتقييم اللقاح والعلاجات المناسبة سريعًا."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "لا يظهر ألم شديد؛ هل هذا مطمئن؟",
        "sources": [
          "https://www.who.int/ar/news-room/fact-sheets/detail/rabies"
        ],
        "choices": [
          {
            "id": "review",
            "label": "نعم؛ العضات غير المؤلمة آمنة.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "شدة الألم لا تستبعد خطر داء الكلب. قرار الوقاية يعتمد على التعرض والتقييم الطبي."
          },
          {
            "id": "safe",
            "label": "لا؛ أخبر الفريق بنوع التعرض والحيوان.",
            "safe": true,
            "next": "follow",
            "feedback": "شدة الألم لا تستبعد خطر داء الكلب. قرار الوقاية يعتمد على التعرض والتقييم الطبي."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "بعد بدء التطعيم الموصوف؟",
        "sources": [
          "https://www.who.int/ar/news-room/fact-sheets/detail/rabies"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "ألتزم بجميع المواعيد وأراجع عند مشكلة.",
            "safe": true,
            "next": null,
            "feedback": "التئام الجلد لا يعني اكتمال الوقاية. التزم بجدول اللقاح والعلاجات التي حددها الفريق."
          },
          {
            "id": "review",
            "label": "أتوقف عند التئام الجرح.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "التئام الجلد لا يعني اكتمال الوقاية. التزم بجدول اللقاح والعلاجات التي حددها الفريق."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "antibiotic-sharing",
    "version": "1.0.0",
    "title": "بقايا مضاد في صيدلية البيت",
    "intro": "أصيب شخص بزكام ووجد مضادًا متبقيًا من وصفة فرد آخر.",
    "art": "medicine",
    "topics": [
      "antibiotics"
    ],
    "sources": [
      {
        "title": "NHS — بقايا مضاد في صيدلية البيت",
        "url": "https://www.nhs.uk/medicines/antibiotics/"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "ما القرار الأفضل؟",
        "sources": [
          "https://www.nhs.uk/medicines/antibiotics/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "لا أستخدم وصفة غيري وأطلب المشورة عند الحاجة.",
            "safe": true,
            "next": "care",
            "feedback": "المضاد لا يعالج الزكام الفيروسي، ووصفة شخص آخر قد تضر وتزيد مقاومة المضادات."
          },
          {
            "id": "review",
            "label": "أبدأ البقايا حتى لا تضيع.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "المضاد لا يعالج الزكام الفيروسي، ووصفة شخص آخر قد تضر وتزيد مقاومة المضادات."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "هل لون المخاط وحده يحدد الحاجة للمضاد؟",
        "sources": [
          "https://www.nhs.uk/medicines/antibiotics/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "نعم؛ أختار أقوى مضاد.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "لا تختَر المضاد من علامة واحدة أو من قوته المتصورة. الحاجة ونوع العلاج يحددهما التقييم."
          },
          {
            "id": "safe",
            "label": "لا؛ أترك التقييم للمختص.",
            "safe": true,
            "next": "care",
            "feedback": "لا تختَر المضاد من علامة واحدة أو من قوته المتصورة. الحاجة ونوع العلاج يحددهما التقييم."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "وُصف له مضاد لاحقًا ونسي جرعة؛ ماذا يفعل؟",
        "sources": [
          "https://www.nhs.uk/medicines/antibiotics/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "يرجع للنشرة أو الصيدلي دون مضاعفة الجرعة.",
            "safe": true,
            "next": "follow",
            "feedback": "تعليمات الجرعة المنسية تختلف بحسب الدواء والتوقيت. لا تضاعفها تلقائيًا واسأل الصيدلي عند الشك."
          },
          {
            "id": "review",
            "label": "يضاعف الجرعة القادمة تلقائيًا.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "تعليمات الجرعة المنسية تختلف بحسب الدواء والتوقيت. لا تضاعفها تلقائيًا واسأل الصيدلي عند الشك."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "ظهرت صعوبة تنفس وتورم الشفتين بعد الدواء؛ ماذا يفعل؟",
        "sources": [
          "https://www.nhs.uk/medicines/antibiotics/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "ينتظر الجرعة التالية.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "صعوبة التنفس وتورم الفم بعد دواء قد يعنيان حساسية شديدة؛ اطلب الإسعاف ولا تتناول جرعة أخرى."
          },
          {
            "id": "safe",
            "label": "يطلب الإسعاف فورًا.",
            "safe": true,
            "next": null,
            "feedback": "صعوبة التنفس وتورم الفم بعد دواء قد يعنيان حساسية شديدة؛ اطلب الإسعاف ولا تتناول جرعة أخرى."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "postoperative-leg",
    "version": "1.0.0",
    "title": "ساق متورمة بعد عملية",
    "intro": "بعد عملية بأيام أصبحت ساق المريض مؤلمة ومتورمة من جهة واحدة.",
    "art": "recovery-home",
    "topics": [
      "after-surgery",
      "venous-clot-care"
    ],
    "sources": [
      {
        "title": "NHS — ساق متورمة بعد عملية",
        "url": "https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "ماذا تنصح؟",
        "sources": [
          "https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "تدليك قوي ثم الانتظار.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "ألم وتورم ساق واحدة بعد الجراحة يحتاجان تقييمًا عاجلًا لاحتمال جلطة؛ التدليك لا يعالج السبب."
          },
          {
            "id": "safe",
            "label": "تقييم طبي عاجل لاحتمال جلطة وريدية.",
            "safe": true,
            "next": "care",
            "feedback": "ألم وتورم ساق واحدة بعد الجراحة يحتاجان تقييمًا عاجلًا لاحتمال جلطة؛ التدليك لا يعالج السبب."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "هل زوال الألم مؤقتًا يلغي الحاجة للتقييم؟",
        "sources": [
          "https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "لا؛ أذكر الأعراض وتوقيتها للفريق.",
            "safe": true,
            "next": "care",
            "feedback": "شدة الألم قد تتغير؛ لا تعتمد عليها لاستبعاد جلطة، خصوصًا بعد عملية أو قلة حركة."
          },
          {
            "id": "review",
            "label": "نعم؛ نتجاهلها تمامًا.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "شدة الألم قد تتغير؛ لا تعتمد عليها لاستبعاد جلطة، خصوصًا بعد عملية أو قلة حركة."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "حدث ضيق نفس مفاجئ وألم صدر؛ ماذا تفعل؟",
        "sources": [
          "https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أنتظر موعد العيادة.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "ضيق النفس وألم الصدر مع احتمال جلطة الساق قد يعنيان انسدادًا رئويًا؛ هذه حالة طارئة."
          },
          {
            "id": "safe",
            "label": "أطلب الإسعاف فورًا.",
            "safe": true,
            "next": "follow",
            "feedback": "ضيق النفس وألم الصدر مع احتمال جلطة الساق قد يعنيان انسدادًا رئويًا؛ هذه حالة طارئة."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "للوقاية بعد التقييم؟",
        "sources": [
          "https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "ألتزم بالحركة والعلاج الوقائي حسب خطة الجراحة.",
            "safe": true,
            "next": null,
            "feedback": "اتبع تعليمات الحركة والجوارب أو الأدوية إن وُصفت لك، ولا توقف العلاج الوقائي من نفسك."
          },
          {
            "id": "review",
            "label": "أوقف الدواء الوقائي دون سؤال.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "اتبع تعليمات الحركة والجوارب أو الأدوية إن وُصفت لك، ولا توقف العلاج الوقائي من نفسك."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "cast-fingers",
    "version": "1.0.0",
    "title": "أصابع باردة داخل الجبس",
    "intro": "بعد وضع جبس للذراع زاد الألم وأصبحت الأصابع باردة ومخدرة.",
    "art": "fracture-care",
    "topics": [
      "fracture-care"
    ],
    "sources": [
      {
        "title": "NHS — أصابع باردة داخل الجبس",
        "url": "https://www.nhs.uk/conditions/broken-arm-or-wrist/"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "ماذا تختار؟",
        "sources": [
          "https://www.nhs.uk/conditions/broken-arm-or-wrist/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "أطلب تقييمًا عاجلًا للجبس والدورة الدموية.",
            "safe": true,
            "next": "care",
            "feedback": "ازدياد الألم مع برودة الأصابع أو الخدر قد يدل على ضغط مهم؛ يحتاج تقييمًا عاجلًا."
          },
          {
            "id": "review",
            "label": "أنتظر أيامًا ليعتاد على الجبس.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "ازدياد الألم مع برودة الأصابع أو الخدر قد يدل على ضغط مهم؛ يحتاج تقييمًا عاجلًا."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "هل تقص الجبس بنفسك؟",
        "sources": [
          "https://www.nhs.uk/conditions/broken-arm-or-wrist/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أدخل سكينًا تحته.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "لا تحاول قص الجبس أو إدخال أدوات تحته. قد تسبب جرحًا وتؤخر علاج سبب الضغط."
          },
          {
            "id": "safe",
            "label": "لا؛ أراجع قسم العلاج بسرعة.",
            "safe": true,
            "next": "care",
            "feedback": "لا تحاول قص الجبس أو إدخال أدوات تحته. قد تسبب جرحًا وتؤخر علاج سبب الضغط."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "كيف تحافظ عليه بعد ضبطه؟",
        "sources": [
          "https://www.nhs.uk/conditions/broken-arm-or-wrist/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "أبقيه جافًا ولا أدخل أدوات للحك.",
            "safe": true,
            "next": "follow",
            "feedback": "حافظ على جفاف الجبس حسب تعليمات الفريق، ولا تدخل أشياء تحته؛ قد تؤذي الجلد دون رؤيته."
          },
          {
            "id": "review",
            "label": "أغسله بالغمر في الماء.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "حافظ على جفاف الجبس حسب تعليمات الفريق، ولا تدخل أشياء تحته؛ قد تؤذي الجلد دون رؤيته."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "تحسن الألم؛ ماذا عن موعد المراجعة؟",
        "sources": [
          "https://www.nhs.uk/conditions/broken-arm-or-wrist/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "ألغي الموعد وأنزع الجبس.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "التئام الكسر يحتاج متابعة؛ لا تنزع الجبس أو تحمل على الطرف قبل سماح الفريق المعالج."
          },
          {
            "id": "safe",
            "label": "ألتزم بالموعد وخطة الحركة.",
            "safe": true,
            "next": null,
            "feedback": "التئام الكسر يحتاج متابعة؛ لا تنزع الجبس أو تحمل على الطرف قبل سماح الفريق المعالج."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "eczema-infection",
    "version": "1.0.0",
    "title": "أكزيما تغيرت فجأة",
    "intro": "أصبحت بقعة الأكزيما مؤلمة وساخنة وتخرج منها إفرازات.",
    "art": "skin-warning",
    "topics": [
      "eczema",
      "skin-warning-signs"
    ],
    "sources": [
      {
        "title": "NHS — أكزيما تغيرت فجأة",
        "url": "https://www.nhs.uk/conditions/atopic-eczema/"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "ما القرار الأنسب؟",
        "sources": [
          "https://www.nhs.uk/conditions/atopic-eczema/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أضع أي خلطة وأغطيها أيامًا.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "الألم والسخونة والإفرازات قد تشير إلى عدوى؛ تحتاج تقييمًا بدل الاكتفاء بخلطة أو كريم عشوائي."
          },
          {
            "id": "safe",
            "label": "أطلب تقييمًا طبيًا عاجلًا لاحتمال العدوى.",
            "safe": true,
            "next": "care",
            "feedback": "الألم والسخونة والإفرازات قد تشير إلى عدوى؛ تحتاج تقييمًا بدل الاكتفاء بخلطة أو كريم عشوائي."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "هل تشارك كريم شخص آخر؟",
        "sources": [
          "https://www.nhs.uk/conditions/atopic-eczema/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "لا؛ أصف الأعراض وأطلب العلاج المناسب.",
            "safe": true,
            "next": "care",
            "feedback": "قد تختلف أسباب تدهور الأكزيما وعلاجاتها؛ لا تتبادل كريمات الوصفات، خاصة مع تقرحات أو إفرازات."
          },
          {
            "id": "review",
            "label": "نعم؛ كل الكريمات متشابهة.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "قد تختلف أسباب تدهور الأكزيما وعلاجاتها؛ لا تتبادل كريمات الوصفات، خاصة مع تقرحات أو إفرازات."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "كيف تحمي الجلد مؤقتًا؟",
        "sources": [
          "https://www.nhs.uk/conditions/atopic-eczema/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "أفركه بقوة وأستخدم منظفًا مركزًا.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "الحك والمواد المهيجة قد يفاقمان تلف الجلد. اتبع إرشادات النظافة والعلاج التي يحددها الفريق."
          },
          {
            "id": "safe",
            "label": "أتجنب الحك والمواد المهيجة والماء الملوث.",
            "safe": true,
            "next": "follow",
            "feedback": "الحك والمواد المهيجة قد يفاقمان تلف الجلد. اتبع إرشادات النظافة والعلاج التي يحددها الفريق."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "بعد السيطرة على النوبة؟",
        "sources": [
          "https://www.nhs.uk/conditions/atopic-eczema/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "أواصل الترطيب والخطة وأراقب التغيرات.",
            "safe": true,
            "next": null,
            "feedback": "الترطيب والعناية اليومية جزء من الوقاية، والأدوية الموضعية تستخدم حسب الخطة لا بشكل عشوائي."
          },
          {
            "id": "review",
            "label": "أستخدم الدواء القوي بلا حدود.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "الترطيب والعناية اليومية جزء من الوقاية، والأدوية الموضعية تستخدم حسب الخطة لا بشكل عشوائي."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "kidney-painkiller",
    "version": "1.0.0",
    "title": "مسكن لصاحب مرض كلوي",
    "intro": "لدى قريبك مرض كلوي مزمن ويريد إيبوبروفين لألم الظهر دون استشارة.",
    "art": "kidney",
    "topics": [
      "kidney-disease",
      "painkillers"
    ],
    "sources": [
      {
        "title": "NIDDK — مسكن لصاحب مرض كلوي",
        "url": "https://www.niddk.nih.gov/health-information/kidney-disease/keeping-kidneys-safe"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "كيف تساعده؟",
        "sources": [
          "https://www.niddk.nih.gov/health-information/kidney-disease/keeping-kidneys-safe"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "أطلب مراجعة الصيدلي أو الطبيب قبل تناوله.",
            "safe": true,
            "next": "care",
            "feedback": "بعض المسكنات، ومنها مضادات الالتهاب، قد تضر الكلى خاصة مع مرض كلوي أو جفاف؛ يلزم اختيار مناسب."
          },
          {
            "id": "review",
            "label": "أقترح جرعة أكبر لتخفيف الألم سريعًا.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "بعض المسكنات، ومنها مضادات الالتهاب، قد تضر الكلى خاصة مع مرض كلوي أو جفاف؛ يلزم اختيار مناسب."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "هل كون الدواء دون وصفة يضمن أمانه؟",
        "sources": [
          "https://www.niddk.nih.gov/health-information/kidney-disease/keeping-kidneys-safe"
        ],
        "choices": [
          {
            "id": "review",
            "label": "نعم؛ الدواء المتاح للجميع آمن دائمًا.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "إتاحة الدواء دون وصفة لا تعني ملاءمته لكل شخص. اذكر مرض الكلى وأدويتك قبل شراء مسكن."
          },
          {
            "id": "safe",
            "label": "لا؛ أذكر مرض الكلى وجميع الأدوية للصيدلي.",
            "safe": true,
            "next": "care",
            "feedback": "إتاحة الدواء دون وصفة لا تعني ملاءمته لكل شخص. اذكر مرض الكلى وأدويتك قبل شراء مسكن."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "ترافق الألم مع قيء وجفاف؛ ماذا يفعل؟",
        "sources": [
          "https://www.niddk.nih.gov/health-information/kidney-disease/keeping-kidneys-safe"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "يتواصل سريعًا مع فريقه بشأن التقييم والأدوية.",
            "safe": true,
            "next": "follow",
            "feedback": "الجفاف يزيد خطر أذية الكلى مع بعض الأدوية. اطلب خطة من فريقك بدل تغيير السوائل والأدوية عشوائيًا."
          },
          {
            "id": "review",
            "label": "يكرر المسكن ويمنع الماء عشوائيًا.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "الجفاف يزيد خطر أذية الكلى مع بعض الأدوية. اطلب خطة من فريقك بدل تغيير السوائل والأدوية عشوائيًا."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "كيف يستعد لمرض أو ألم لاحق؟",
        "sources": [
          "https://www.niddk.nih.gov/health-information/kidney-disease/keeping-kidneys-safe"
        ],
        "choices": [
          {
            "id": "review",
            "label": "يجمع وصفات من الأقارب.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "راجع قائمة أدويتك والمكملات مع الفريق، واحتفظ بتعليمات ما تفعل عند القيء أو الإسهال أو الجفاف."
          },
          {
            "id": "safe",
            "label": "يحصل على قائمة أدوية وخطة أيام مرض مكتوبة.",
            "safe": true,
            "next": null,
            "feedback": "راجع قائمة أدويتك والمكملات مع الفريق، واحتفظ بتعليمات ما تفعل عند القيء أو الإسهال أو الجفاف."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  },
  {
    "id": "sleep-driving",
    "version": "1.0.0",
    "title": "ليلة بلا نوم وطريق طويل",
    "intro": "طالب ينام قليلًا ويشعر بالنعاس قبل قيادة رحلة طويلة.",
    "art": "sleep",
    "topics": [
      "sleep"
    ],
    "sources": [
      {
        "title": "NHS — ليلة بلا نوم وطريق طويل",
        "url": "https://www.nhs.uk/conditions/insomnia/"
      }
    ],
    "start": "first",
    "nodes": {
      "first": {
        "prompt": "ما الاختيار الآمن؟",
        "sources": [
          "https://www.nhs.uk/conditions/insomnia/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "يقود رغم النعاس مع رفع صوت الموسيقى.",
            "safe": false,
            "critical": true,
            "next": "recover",
            "feedback": "لا تقد وأنت نعسان؛ ضعف الانتباه يعرضك والآخرين للخطر. رتب وسيلة بديلة أو أجّل الرحلة."
          },
          {
            "id": "safe",
            "label": "يؤجل القيادة أو يرتب سائقًا يقظًا.",
            "safe": true,
            "next": "care",
            "feedback": "لا تقد وأنت نعسان؛ ضعف الانتباه يعرضك والآخرين للخطر. رتب وسيلة بديلة أو أجّل الرحلة."
          }
        ],
        "context": ""
      },
      "recover": {
        "prompt": "هل مشروب الطاقة يعوض النوم؟",
        "sources": [
          "https://www.nhs.uk/conditions/insomnia/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "لا؛ أحتاج راحة ونومًا مناسبين.",
            "safe": true,
            "next": "care",
            "feedback": "الكافيين ليس بديلًا عن النوم، وقد يفاقم صعوبة النوم لاحقًا. النعاس أثناء القيادة يستدعي التوقف الآمن."
          },
          {
            "id": "review",
            "label": "نعم؛ أواصل السهر والقيادة.",
            "safe": false,
            "critical": false,
            "next": "care",
            "feedback": "الكافيين ليس بديلًا عن النوم، وقد يفاقم صعوبة النوم لاحقًا. النعاس أثناء القيادة يستدعي التوقف الآمن."
          }
        ],
        "context": "توقف لحظة قبل متابعة الموقف: يمكنك تعديل مسارك والتصرف بأمان."
      },
      "care": {
        "prompt": "كيف يبدأ تحسين نومه؟",
        "sources": [
          "https://www.nhs.uk/conditions/insomnia/"
        ],
        "choices": [
          {
            "id": "review",
            "label": "ينام في مواعيد عشوائية مع منبهات ليلية.",
            "safe": false,
            "critical": false,
            "next": "follow",
            "feedback": "ثبات المواعيد والتهيئة الهادئة وتقليل المنبهات يساعد النوم؛ تحسن العادات يحتاج تكرارًا."
          },
          {
            "id": "safe",
            "label": "موعد ثابت وتهدئة قبل النوم وتقليل الكافيين مساءً.",
            "safe": true,
            "next": "follow",
            "feedback": "ثبات المواعيد والتهيئة الهادئة وتقليل المنبهات يساعد النوم؛ تحسن العادات يحتاج تكرارًا."
          }
        ],
        "context": "ننتقل الآن إلى الخطوة التالية في هذا الموقف."
      },
      "follow": {
        "prompt": "استمرت المشكلة وأثرت في يومه؛ ماذا يفعل؟",
        "sources": [
          "https://www.nhs.uk/conditions/insomnia/"
        ],
        "choices": [
          {
            "id": "safe",
            "label": "يطلب تقييمًا بدل أخذ منوم من صديق.",
            "safe": true,
            "next": null,
            "feedback": "استمرار صعوبة النوم وتأثيرها في الحياة يستحقان تقييمًا. لا تتبادل المنومات لأنها قد تسبب آثارًا ومخاطر."
          },
          {
            "id": "review",
            "label": "يبدأ منومًا بلا استشارة.",
            "safe": false,
            "critical": false,
            "next": null,
            "feedback": "استمرار صعوبة النوم وتأثيرها في الحياة يستحقان تقييمًا. لا تتبادل المنومات لأنها قد تسبب آثارًا ومخاطر."
          }
        ],
        "context": "وحتى لا يتكرر الخطر، اختر تصرف المتابعة الأنسب."
      }
    }
  }
];
window.CommunityScenarios.items.push(...additions);
})();
