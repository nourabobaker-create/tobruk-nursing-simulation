window.ClinicalDiscoveryTopics = [
  {
    "id": "medicine-label",
    "group": "medicines",
    "symbol": "▤",
    "title": {
      "ar": "اقرأ العبوة… لا تعتمد على شكلها",
      "en": "Read the label, not the packaging"
    },
    "term": "Medicine label",
    "intro": {
      "ar": "اسم الدواء وتركيزه وشكله معلومات مختلفة.",
      "en": "Name, strength and formulation are different pieces of information."
    },
    "visual": "label",
    "sections": [
      {
        "id": "recognise",
        "text": {
          "ar": "ابحث عن اسم المادة الفعالة، والتركيز، والشكل الدوائي، وطريق الإعطاء. قد يتشابه اسمان أو عبوتان، فلا تعتمد على اللون وحده.",
          "en": "Find the active ingredient, strength, formulation and route. Similar names or packaging can be confused; colour alone is not identification."
        }
      },
      {
        "id": "notice",
        "text": {
          "ar": "راجع تاريخ الصلاحية وتعليمات الحفظ. قد توجد مدة استعمال مختلفة بعد الفتح أو التحضير؛ راجع تعليمات المنتج بدل افتراض قاعدة واحدة لكل الأدوية.",
          "en": "Check expiry and storage instructions. An opened or prepared product may have a different usable period; consult its instructions rather than assuming one rule for all medicines."
        }
      },
      {
        "id": "ask",
        "text": {
          "ar": "عند الاستلام من الصيدلية، طابق الدواء المصروف مع الطلب والبيانات المطلوبة وفق نظام المكان. عند اختلاف الاسم أو التركيز أو وضوح الملصق، استوضح قبل المتابعة.",
          "en": "When receiving a dispensed medicine, match it against the order and required details under the local process. Clarify mismatches or an unclear label before proceeding."
        }
      }
    ],
    "question": {
      "ar": "عبوتان متشابهتان لكن التركيز مختلف. ما الفكرة الأهم؟",
      "en": "Two packages look alike, but their strengths differ. What matters most?"
    },
    "choices": [
      {
        "ar": "أقرأ الاسم والتركيز والبيانات كاملة.",
        "en": "Read the full name, strength and other details."
      },
      {
        "ar": "أتعرف على الدواء من لون العبوة.",
        "en": "Identify it by packaging colour."
      }
    ],
    "correct": 0,
    "explanation": {
      "ar": "التشابه البصري لا يثبت تطابق المنتج. هذه تجربة لفهم الملصق، وليست تعليمات لصرف جرعة.",
      "en": "Visual similarity does not establish that products match. This is label-familiarity practice, not a dispensing instruction."
    },
    "sources": [
      {
        "title": "FDA — Name differentiation",
        "url": "https://www.fda.gov/drugs/medication-errors-related-cder-regulated-drug-products/fda-name-differentiation-project"
      },
      {
        "title": "FDA — Expiry and storage",
        "url": "https://www.fda.gov/drugs/special-features/dont-be-tempted-use-expired-medicines"
      },
      {
        "title": "NICE — Medication management",
        "url": "https://www.nice.org.uk/guidance/sc1/chapter/Recommendations"
      }
    ]
  },
  {
    "id": "medication-record",
    "group": "charts",
    "symbol": "▦",
    "title": {
      "ar": "ماذا يخبرنا سجل إعطاء الدواء؟",
      "en": "What does a medication record tell us?"
    },
    "term": "Medication Administration Record",
    "intro": {
      "ar": "الدواء المقرر إعطاؤه ليس هو الدواء الذي أُعطي فعلًا.",
      "en": "A scheduled medicine is not the same as a medicine actually administered."
    },
    "visual": "chart",
    "sections": [
      {
        "id": "recognise",
        "text": {
          "ar": "سجل إعطاء الدواء يجمع معلومات المريض والدواء، ومواعيد الإعطاء، وما أُعطي فعلًا، ومن وثّقه. تختلف النماذج والرموز بين المؤسسات.",
          "en": "A medication administration record brings together patient and medicine details, scheduled times, actual administration and the recorder. Formats and codes differ between organisations."
        }
      },
      {
        "id": "notice",
        "text": {
          "ar": "يُسجَّل ما حدث فعلًا مع التاريخ والوقت، في حينه أو بأقرب وقت ممكن بعده. لا يُثبت إعطاء الدواء مسبقًا.",
          "en": "Record what actually happened, with date and time, at the event or as soon afterwards as possible. Do not record administration in advance."
        }
      },
      {
        "id": "ask",
        "text": {
          "ar": "عند عدم إعطاء الدواء، تُوثَّق الحالة والسبب والإجراء وفق السياسة المحلية. لا تخمّن معنى خانة فارغة أو رمز غير معروف، ولا تغيّر السجل لإخفاء خطأ.",
          "en": "When a medicine is not given, document the status, reason and action under local policy. Do not guess the meaning of a blank or unfamiliar code, or alter a record to conceal an error."
        }
      }
    ],
    "question": {
      "ar": "حُضّر الدواء لكن المريض لم يتناوله. هل يُسجل بأنه أُعطي؟",
      "en": "The medicine was prepared, but the patient has not taken it. Record it as given?"
    },
    "choices": [
      {
        "ar": "لا؛ التوثيق يعكس ما حدث فعلًا.",
        "en": "No; the record must reflect what happened."
      },
      {
        "ar": "نعم؛ لأنه جرى تحضيره.",
        "en": "Yes; it has been prepared."
      }
    ],
    "correct": 0,
    "explanation": {
      "ar": "التحضير ليس إعطاءً. اتبع إجراءات المكان لتوثيق عدم الإعطاء والإبلاغ والمتابعة.",
      "en": "Preparation is not administration. Follow the local process for recording non-administration, communication and follow-up."
    },
    "sources": [
      {
        "title": "NICE — Records and administration, 1.14.7–1.14.11",
        "url": "https://www.nice.org.uk/guidance/sc1/chapter/Recommendations"
      },
      {
        "title": "NMC — Clear and accurate records, section 10 (UK reference)",
        "url": "https://www.nmc.org.uk/standards/code/read-the-code-online/"
      }
    ]
  },
  {
    "id": "vial-handling",
    "group": "medicines",
    "symbol": "◫",
    "title": {
      "ar": "عبوة أحادية الجرعة أم متعددة الجرعات؟",
      "en": "Single-dose or multi-dose vial?"
    },
    "term": "Single-dose vial / Multi-dose vial",
    "intro": {
      "ar": "بقاء سائل في العبوة لا يعني أنه صالح لمريض آخر.",
      "en": "Liquid left in a vial is not permission to use it for another patient."
    },
    "visual": "vials",
    "sections": [
      {
        "id": "recognise",
        "text": {
          "ar": "اقرأ هل العبوة أحادية الجرعة أم متعددة الجرعات. تُخصص العبوة أحادية الجرعة لمريض واحد ولمناسبة إعطاء واحدة، ولا يُحتفظ ببقاياها لاستخدام لاحق.",
          "en": "Read whether the vial is single-dose or multi-dose. A single-dose vial is for one patient and one administration occasion; do not save its remainder for later use."
        }
      },
      {
        "id": "notice",
        "text": {
          "ar": "يُستخدم إبرة ومحقن جديدان معقمان عند كل دخول إلى العبوة. تغيير الإبرة وحدها لا يجعل المحقن المستخدم آمنًا.",
          "en": "Use a new sterile needle and syringe each time a vial is entered. Changing only the needle does not make a used syringe safe."
        }
      },
      {
        "id": "ask",
        "text": {
          "ar": "للعبوات متعددة الجرعات تعليمات للتخزين والتأريخ والتخلص؛ تُخصص لمريض واحد ما أمكن. الشك في التلوث سبب لإيقاف الاستخدام وإبلاغ المسؤول.",
          "en": "Multi-dose vials have storage, dating and discard requirements; dedicate them to one patient whenever possible. Suspected contamination calls for stopping use and notifying the responsible professional."
        }
      }
    ],
    "question": {
      "ar": "بقي دواء في عبوة أحادية الجرعة. هل البقايا لمريض آخر؟",
      "en": "Some medicine remains in a single-dose vial. Use it for another patient?"
    },
    "choices": [
      {
        "ar": "لا.",
        "en": "No."
      },
      {
        "ar": "نعم، إذا غُيّرت الإبرة.",
        "en": "Yes, after changing the needle."
      }
    ],
    "correct": 0,
    "explanation": {
      "ar": "أحادية الجرعة لا تعني «نستخدمها حتى تفرغ». هذه معرفة بالسلامة، وليست تدريبًا على تحضير الحقن.",
      "en": "Single-dose does not mean “use until empty.” This introduces a safety principle; it does not teach injection preparation."
    },
    "sources": [
      {
        "title": "CDC — Preventing unsafe injection practices",
        "url": "https://www.cdc.gov/injection-safety/hcp/clinical-safety/index.html"
      },
      {
        "title": "CDC — Safe injection practices",
        "url": "https://www.cdc.gov/injection-safety/hcp/clinical-guidance/index.html"
      }
    ]
  },
  {
    "id": "tablet-formulation",
    "group": "medicines",
    "symbol": "◉",
    "title": {
      "ar": "هل كل قرص يمكن سحقه؟",
      "en": "Can every tablet be crushed?"
    },
    "term": "Modified-release / Enteric-coated",
    "intro": {
      "ar": "الشكل الدوائي جزء من عمل الدواء، وليس مجرد مظهر.",
      "en": "Formulation affects how a medicine works; it is not just appearance."
    },
    "visual": "tablet",
    "sections": [
      {
        "id": "recognise",
        "text": {
          "ar": "قد تشير MR أو SR أو XL إلى إطلاق معدل أو ممتد، وEC أو GR إلى تغليف معوي أو مقاومة لعصارة المعدة. الاختصارات ليست موحدة لكل المنتجات.",
          "en": "MR, SR or XL may indicate modified or prolonged release; EC or GR may indicate enteric coating or gastric resistance. Abbreviations are not universal."
        }
      },
      {
        "id": "notice",
        "text": {
          "ar": "سحق بعض الأقراص يغير إطلاق الدواء أو يفسد طبقة الحماية. وجود خط على القرص لا يثبت جواز سحقه، وليست كل الكبسولات قابلة للفتح.",
          "en": "Crushing some tablets changes drug release or damages protective coating. A score line does not establish that crushing is suitable; not every capsule can be opened."
        }
      },
      {
        "id": "ask",
        "text": {
          "ar": "تحقق من معلومات المنتج المحدد واستشر الصيدلي أو المسؤول قبل تغيير الشكل. صعوبة البلع تستدعي تقييمًا وخيارًا مناسبًا، لا تصرفًا تلقائيًا بالسحق.",
          "en": "Check the exact product information and consult the pharmacist or responsible clinician before altering it. Swallowing difficulty needs assessment and an appropriate option, not automatic crushing."
        }
      }
    ],
    "question": {
      "ar": "قرص يحمل MR والمريض يجد صعوبة في بلعه. ماذا تفعل؟",
      "en": "A tablet says MR and the patient has difficulty swallowing. What next?"
    },
    "choices": [
      {
        "ar": "أسحقه ليصبح أسهل.",
        "en": "Crush it to make swallowing easier."
      },
      {
        "ar": "أستوضح عن الشكل والبديل المناسب.",
        "en": "Clarify the formulation and suitable option."
      }
    ],
    "correct": 1,
    "explanation": {
      "ar": "اسأل أولًا؛ تعديل الشكل قد يغير وصول الدواء إلى الجسم.",
      "en": "Ask first: altering the formulation may change how the medicine reaches the body."
    },
    "sources": [
      {
        "title": "NHS SPS — Checking before crushing tablets or opening capsules",
        "url": "https://sps.nhs.uk/articles/checking-if-tablets-can-be-crushed-or-capsules-opened/"
      }
    ]
  },
  {
    "id": "pulse-oximeter",
    "group": "devices",
    "symbol": "⌁",
    "title": {
      "ar": "رقمان على مقياس التأكسج… ماذا يعنيان؟",
      "en": "Two numbers on a pulse oximeter"
    },
    "term": "Pulse oximeter",
    "intro": {
      "ar": "تعرف على اسم القراءة قبل تفسير الرقم.",
      "en": "Recognise the label before interpreting the number."
    },
    "visual": "oximeter",
    "sections": [
      {
        "id": "recognise",
        "text": {
          "ar": "يعرض الجهاز عادة تقدير تشبع الأكسجين SpO₂ كنسبة مئوية، ومعدل النبض PR أو Pulse. هاتان قراءتان مختلفتان.",
          "en": "The device usually displays estimated oxygen saturation, SpO₂, as a percentage, and pulse rate, PR or Pulse. These are different readings."
        }
      },
      {
        "id": "notice",
        "text": {
          "ar": "هي قراءة تقديرية. قد تتأثر بعوامل مثل ضعف الدورة الدموية، وبرودة الجلد، والتصبغ، وطلاء الأظافر.",
          "en": "The reading is an estimate. Factors such as poor circulation, cold skin, skin pigmentation and nail polish can affect accuracy."
        }
      },
      {
        "id": "ask",
        "text": {
          "ar": "لا تستبعد مشكلة لأن الشاشة تبدو مطمئنة. لاحظ حالة المريض واطلب المساعدة عند وجود قلق؛ الأهداف وتعليمات الاستخدام تتبع الحالة والجهاز.",
          "en": "Do not dismiss a concern because a screen looks reassuring. Consider the patient and seek help when concerned; targets and operating instructions depend on the situation and device."
        }
      }
    ],
    "question": {
      "ar": "هل SpO₂ هو نفسه معدل النبض؟",
      "en": "Is SpO₂ the same as pulse rate?"
    },
    "choices": [
      {
        "ar": "نعم.",
        "en": "Yes."
      },
      {
        "ar": "لا؛ هما قراءتان مختلفتان.",
        "en": "No; they are different measurements."
      }
    ],
    "correct": 1,
    "explanation": {
      "ar": "SpO₂ تقدير للتشبع، وPR معدل النبض. الأرقام هنا توضيحية وليست أهدافًا علاجية.",
      "en": "SpO₂ estimates saturation; PR is pulse rate. The example numbers are illustrative, not treatment targets."
    },
    "sources": [
      {
        "title": "FDA — Pulse oximeters and limitations",
        "url": "https://www.fda.gov/medical-devices/products-and-medical-procedures/pulse-oximeters"
      },
      {
        "title": "MedlinePlus — Pulse oximetry",
        "url": "https://www.medlineplus.gov/lab-tests/pulse-oximetry/"
      }
    ]
  },
  {
    "id": "infusion-pump",
    "group": "devices",
    "symbol": "▣",
    "title": {
      "ar": "تعرف على مضخة التسريب",
      "en": "Meet an infusion pump"
    },
    "term": "Infusion pump",
    "intro": {
      "ar": "الشاشة والإنذار وسيلة للمراقبة، وليسا بديلًا عنها.",
      "en": "The display and alarm support observation; they do not replace it."
    },
    "visual": "pump",
    "sections": [
      {
        "id": "recognise",
        "text": {
          "ar": "تُستخدم مضخة التسريب لإيصال سوائل أو أدوية بمقادير مضبوطة. قد تعرض معدل التسريب والحجم المقرر أو الذي أُعطي، بحسب الطراز.",
          "en": "An infusion pump delivers controlled amounts of fluid or medicine. It may display a rate, a programmed volume or a delivered volume, depending on the model."
        }
      },
      {
        "id": "notice",
        "text": {
          "ar": "الإنذار قد يشير إلى مشكلة تحتاج تقييمًا، مثل انسداد أو هواء في الأنبوب بحسب الجهاز. الإنذار لا يحدد وحده حالة المريض.",
          "en": "An alarm may signal a problem needing assessment, such as an obstruction or air in the tubing, depending on the device. An alarm alone does not describe the patient’s condition."
        }
      },
      {
        "id": "ask",
        "text": {
          "ar": "عند جهاز غير مألوف أو إنذار، اطلب الممرّض المسؤول. لا تغيّر البرمجة أو تعطل الإنذارات دون تدريب وصلاحية. راجع تعليمات الطراز المحدد.",
          "en": "For an unfamiliar pump or alarm, get the responsible nurse. Do not change programming or disable alarms without training and authorisation. Consult the instructions for that exact model."
        }
      }
    ],
    "question": {
      "ar": "مضخة غير مألوفة تصدر إنذارًا. ما التصرف الأنسب؟",
      "en": "An unfamiliar pump alarms. Which response is appropriate?"
    },
    "choices": [
      {
        "ar": "أطلب الممرّض المسؤول وأوضح ما ظهر.",
        "en": "Get the responsible nurse and describe what appeared."
      },
      {
        "ar": "أغير الإعدادات حتى يسكت الإنذار.",
        "en": "Change the settings until the alarm stops."
      }
    ],
    "correct": 0,
    "explanation": {
      "ar": "وصف ما شاهدته وطلب المساعدة أفضل من تجربة أزرار جهاز يعمل مع مريض.",
      "en": "Describe what you observed and seek help rather than experimenting with a device connected to a patient."
    },
    "sources": [
      {
        "title": "FDA — Infusion pumps",
        "url": "https://www.fda.gov/medical-devices/general-hospital-devices-and-supplies/infusion-pumps"
      }
    ]
  },
  {
    "id": "ask-with-confidence",
    "group": "confidence",
    "symbol": "؟",
    "title": {
      "ar": "لم أر هذا من قبل… كيف أسأل؟",
      "en": "“I have not seen this before.”"
    },
    "term": "Could you show me what this is used for?",
    "intro": {
      "ar": "المعرفة تبدأ بالسؤال، لا بالتظاهر بالمعرفة.",
      "en": "You can start with a question, rather than pretending to know."
    },
    "visual": "conversation",
    "sections": [
      {
        "id": "recognise",
        "text": {
          "ar": "ليس مطلوبًا أن تكون قد رأيت كل أداة أو موقف من قبل. يمكنك طلب الاسم والغرض قبل محاولة الاستخدام.",
          "en": "You do not need to have encountered every item or situation already. Ask for its name and purpose before trying to use it."
        }
      },
      {
        "id": "notice",
        "text": {
          "ar": "جرّب: «لم أستخدم هذا الجهاز من قبل. هل توضح لي اسمه وما الذي يجب أن أنتبه إليه؟»",
          "en": "Try: “I have not used this device before. Could you explain its name and what I should watch for?”"
        }
      },
      {
        "id": "ask",
        "text": {
          "ar": "وجرّب: «أريد التأكد أنني فهمت: هل تقصد…؟» عند مهمة تتجاوز تدريبك، وضح حاجتك للإشراف بدل التخمين.",
          "en": "Or: “I want to check that I understood: do you mean…?” For an unfamiliar task, explain that you need supervision rather than guessing."
        }
      }
    ],
    "question": {
      "ar": "اختر عبارة تساعدك على التعلم بثقة.",
      "en": "Choose a phrase that helps you learn confidently."
    },
    "choices": [
      {
        "ar": "سأتظاهر بأنني أعرف.",
        "en": "I will pretend I know."
      },
      {
        "ar": "لم أتعامل معه من قبل؛ هل تريني؟",
        "en": "I have not used this before; could you show me?"
      }
    ],
    "correct": 1,
    "explanation": {
      "ar": "هذه صيغ محادثة مقترحة وليست كلمات واجبة الحفظ. اختر ما يناسبك.",
      "en": "These are suggested conversation starters, not a script to memorise. Use wording that feels natural."
    },
    "sources": [
      {
        "title": "NMC — Work within competence; ask for help, section 13 (UK reference)",
        "url": "https://www.nmc.org.uk/standards/code/read-the-code-online/"
      }
    ]
  }
];
