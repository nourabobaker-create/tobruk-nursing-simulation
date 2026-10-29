/* Official pharmacology resources suggested by Dr Aisha; checked 2026-10-29.
 * This file can run alone or after the main library catalogue data files.
 */
(() => {
  'use strict';
  const collectionId = 'pharmacology-aisha-2026';
  const verifiedAt = '2026-10-29';
  const courseId = 'CRS-017';
  const entries = [
    {
      id: 'pharm-lehne-12e', title: 'Lehne’s Pharmacology for Nursing Care',
      title_ar: 'ليهني: علم الأدوية للرعاية التمريضية', group: 'textbooks', access: 'paid',
      provider: 'Elsevier', type: 'book', edition: '12', year: 2025, isbn: '9780443107108',
      summary_ar: 'مرجع يربط مبادئ علم الأدوية بالممارسة التمريضية والمجموعات الدوائية.',
      summary_en: 'The requested textbook connects pharmacological principles, drug families and nursing practice.',
      note_ar: 'النسخة الكاملة مدفوعة أو تحتاج ترخيص مكتبة. طلب نسخة تقييم لعضو هيئة تدريس يخضع للتحقق وموافقة الناشر؛ لم تُوفّر نسخة كاملة مجانية.',
      note_en: 'Full text requires purchase or a library licence. Faculty evaluation copies require publisher verification and approval; no free full-text copy has been obtained.',
      url: 'https://www.us.elsevierhealth.com/lehnes-pharmacology-for-nursing-care-9780443107108.html',
      links: [
        { ar: 'صفحة الناشر والنسخة الإلكترونية', en: 'Publisher and ebook options', url: 'https://www.us.elsevierhealth.com/lehnes-pharmacology-for-nursing-care-9780443107108.html' },
        { ar: 'طلب نسخة تقييم — لأعضاء هيئة التدريس', en: 'Request an evaluation copy — faculty only', url: 'https://www.inspectioncopy.elsevier.com/book/details/9780443107108' },
        { ar: 'تعليمات طلب النسخة حسب المنطقة', en: 'Regional evaluation-copy instructions', url: 'https://www.elsevier.support/uselsevierhealth/answer/can-i-receive-a-desk-copy-of-a-book' }
      ],
      evidence_urls: ['https://www.us.elsevierhealth.com/lehnes-pharmacology-for-nursing-care-9780443107108.html', 'https://www.inspectioncopy.elsevier.com/book/details/9780443107108', 'https://www.elsevier.support/uselsevierhealth/answer/can-i-receive-a-desk-copy-of-a-book']
    },
    {
      id: 'pharm-lilley-11e', title: 'Lilley’s Pharmacology and the Nursing Process',
      title_ar: 'ليلي: علم الأدوية والعملية التمريضية', group: 'textbooks', access: 'paid',
      provider: 'Elsevier', type: 'book', edition: '11', year: 2026, isbn: '9780443119415',
      summary_ar: 'الكتاب المطلوب للربط بين علم الأدوية والتقييم والتخطيط والتنفيذ والتقويم والحكم السريري.',
      summary_en: 'The requested textbook applies the nursing process and clinical judgment to pharmacology.',
      note_ar: 'نُشر في يناير 2026 ويحمل حقوق نشر 2027. الكتاب الكامل مدفوع؛ طلب نسخة تقييم لعضو هيئة تدريس يخضع لشروط الناشر وموافقته.',
      note_en: 'Published in January 2026 with copyright year 2027. Full text is paid; faculty evaluation copies are subject to publisher eligibility and approval.',
      url: 'https://www.us.elsevierhealth.com/pharmacology-and-the-nursing-process-9780443119415.html',
      links: [
        { ar: 'صفحة الناشر والنسخة الإلكترونية', en: 'Publisher and ebook options', url: 'https://www.us.elsevierhealth.com/pharmacology-and-the-nursing-process-9780443119415.html' },
        { ar: 'نسخة التقييم — لأعضاء هيئة التدريس', en: 'Evaluation copy — faculty only', url: 'https://www.inspectioncopy.elsevier.com/book/details/9780443119415' },
        { ar: 'شروط طلب نسخة التقييم', en: 'Evaluation-copy eligibility', url: 'https://www.inspectioncopy.elsevier.com/faq' }
      ],
      evidence_urls: ['https://www.us.elsevierhealth.com/pharmacology-and-the-nursing-process-9780443119415.html', 'https://www.inspectioncopy.elsevier.com/book/details/9780443119415', 'https://www.inspectioncopy.elsevier.com/faq']
    },
    {
      id: 'pharm-karch-10e', title: 'Karch’s Focus on Nursing Pharmacology',
      title_ar: 'كارتش: التركيز على علم الأدوية في التمريض', group: 'textbooks', access: 'paid',
      provider: 'Wolters Kluwer / Lippincott', type: 'book', edition: '10', year: 2026, isbn: '9781975261115',
      summary_ar: 'الكتاب المطلوب؛ الطبعة العاشرة من إعداد Rebecca Tucker، مع تطبيقات للتمريض والحكم السريري.',
      summary_en: 'The requested title, now in its tenth edition by Rebecca Tucker, includes nursing applications and clinical judgment.',
      note_ar: 'نُشر في فبراير 2026. النسخة الكاملة مدفوعة أو بترخيص مؤسسي؛ نسخة التقييم التعليمية ليست مضمونة وتخضع لموافقة الناشر.',
      note_en: 'Published in February 2026. Full text requires purchase or institutional licensing; educator evaluation access is subject to publisher approval.',
      url: 'https://shop.lww.com/Karch-s-Focus-on-Nursing-Pharmacology/p/9781975261115',
      links: [
        { ar: 'صفحة الناشر', en: 'Publisher page', url: 'https://shop.lww.com/Karch-s-Focus-on-Nursing-Pharmacology/p/9781975261115' },
        { ar: 'طلب نسخة تقييم — لأعضاء هيئة التدريس', en: 'Request an evaluation copy — faculty only', url: 'https://www.lww.co.uk/inspection-copy-request-karchs-focus-on-nursing-pharmacology-10th-edition/' }
      ],
      evidence_urls: ['https://shop.lww.com/Karch-s-Focus-on-Nursing-Pharmacology/p/9781975261115', 'https://www.lww.co.uk/inspection-copy-request-karchs-focus-on-nursing-pharmacology-10th-edition/']
    },
    {
      id: 'openrn-pharmacology2e', title: 'Nursing Pharmacology 2e — Open RN',
      title_ar: 'علم الأدوية للتمريض — Open RN، الطبعة الثانية', group: 'openbooks', access: 'free',
      provider: 'Open RN / WisTech Open', type: 'book', edition: '2',
      summary_ar: 'كتاب تمريض كامل ومفتوح للقراءة والتنزيل، يشمل المجموعات الدوائية وسلامة إعطاء الدواء وتطبيق العملية التمريضية.',
      summary_en: 'A complete open nursing textbook covering drug groups, medication safety and the nursing process, with free reading and downloads.',
      note_ar: 'مجاني دون حساب. ملف PDF كبير، نحو 133 MB؛ القراءة عبر الويب أنسب للاتصال المحدود، وتتوفر صيغ تنزيل أخرى من صفحة الكتاب.',
      note_en: 'Free without an account. The PDF is large, approximately 133 MB; web reading suits limited connections, and the book homepage offers other download formats.',
      url: 'https://wtcs.pressbooks.pub/pharmacology2e/',
      links: [
        { ar: 'قراءة الكتاب الكامل', en: 'Read the complete book', url: 'https://wtcs.pressbooks.pub/pharmacology2e/' },
        { ar: 'نسخة قراءة بديلة — NCBI', en: 'Alternative reading — NCBI', url: 'https://www.ncbi.nlm.nih.gov/books/NBK595000/' },
        { ar: 'تنزيل PDF رسمي — نحو 133 MB', en: 'Official PDF — approximately 133 MB', url: 'https://wtcs.pressbooks.pub/pharmacology2e/open/download?type=pdf' }
      ],
      evidence_urls: ['https://wtcs.pressbooks.pub/pharmacology2e/']
    },
    {
      id: 'os-book-pharmacology', title: 'Pharmacology for Nurses — OpenStax',
      title_ar: 'علم الأدوية للممرضين — OpenStax', group: 'openbooks', access: 'free',
      provider: 'OpenStax — Rice University', type: 'book',
      summary_ar: 'كتاب جامعي كامل ومفتوح لطلاب التمريض، مع فصول للمجموعات الدوائية وسلامة الممارسة وأسئلة للمراجعة.',
      summary_en: 'A complete open college textbook for nursing students, with drug-class chapters, safety topics and review questions.',
      note_ar: 'القراءة عبر الويب وملف PDF الرسمي مجانيان؛ النسخة المطبوعة اختيارية ومدفوعة.',
      note_en: 'Web reading and the official PDF are free; a printed edition is an optional paid purchase.',
      url: 'https://openstax.org/books/pharmacology/pages/preface',
      links: [
        { ar: 'قراءة الكتاب الكامل', en: 'Read the complete book', url: 'https://openstax.org/books/pharmacology/pages/preface' },
        { ar: 'تنزيل PDF رسمي', en: 'Download the official PDF', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/Pharmacology-WEB.pdf' }
      ],
      evidence_urls: ['https://openstax.org/books/pharmacology/pages/preface', 'https://assets.openstax.org/oscms-prodcms/media/documents/Pharmacology-WEB.pdf']
    },
    {
      id: 'pharm-lehne-evolve', title: 'Evolve Student Resources — Lehne’s Pharmacology, 12e',
      title_ar: 'موارد الطالب المرافقة لكتاب ليهني — Evolve', group: 'learning', access: 'free_registration',
      provider: 'Elsevier Evolve', type: 'guide', edition: '12', isbn: '9780443108747',
      summary_ar: 'رسوم متحركة ومقاطع فيديو وحالات دراسية ونقاط أساسية قابلة للتنزيل وأسئلة مراجعة.',
      summary_en: 'Animations, video clips, unfolding case studies, downloadable key points and review questions.',
      note_ar: 'يعرضها الناشر بسعر 0.00 دولار مع التسجيل في Evolve. هذه موارد مرافقة للطلاب، وليست نص الكتاب الكامل أو بنك أسئلة المدرس.',
      note_en: 'Listed by the publisher at $0.00 with Evolve registration. These are student companion resources, not the full textbook or the instructor test bank.',
      url: 'https://evolve.elsevier.com/cs/product/9780443108747?role=student',
      links: [{ ar: 'التسجيل في موارد الطالب', en: 'Register for student resources', url: 'https://evolve.elsevier.com/cs/product/9780443108747?role=student' }],
      evidence_urls: ['https://evolve.elsevier.com/cs/product/9780443108747?role=student']
    },
    {
      id: 'pharm-lilley-evolve', title: 'Evolve Student Resources — Lilley’s Pharmacology, 11e',
      title_ar: 'موارد الطالب المرافقة لكتاب ليلي — Evolve', group: 'learning', access: 'conditional',
      provider: 'Elsevier Evolve', type: 'guide', edition: '11', isbn: '9780443122095',
      summary_ar: 'أسئلة مراجعة على نمط NCLEX، ونصائح لفهم لواحق أسماء الأدوية، وإجابات تمارين الكتاب.',
      summary_en: 'NCLEX-style review questions, pharmacology suffix tips and answers to textbook exercises.',
      note_ar: 'يذكر الناشر أنها مجانية مع شراء نسخة جديدة من الكتاب المقابل؛ ليست وصولًا مجانيًا مضمونًا للجميع. يلزم التسجيل وقد يلزم رمز استحقاق. لا تتضمن الكتاب الكامل.',
      note_en: 'The publisher states “free with purchase of new corresponding textbook”; this is not guaranteed unrestricted free access. Registration and an entitlement code may be required. The full book is not included.',
      url: 'https://evolve.elsevier.com/cs/product/9780443122095?role=student',
      links: [{ ar: 'موارد الطالب وشروط الاستحقاق', en: 'Student resources and eligibility', url: 'https://evolve.elsevier.com/cs/product/9780443122095?role=student' }],
      evidence_urls: ['https://evolve.elsevier.com/cs/product/9780443122095?role=student']
    },
    {
      id: 'pharm-registerednursern', title: 'RegisteredNurseRN — Pharmacology and Quizzes',
      title_ar: 'RegisteredNurseRN — شروح علم الأدوية واختبارات', group: 'learning', access: 'free',
      provider: 'RegisteredNurseRN / Nurse Sarah', type: 'guide',
      summary_ar: 'شروح مبسطة للمجموعات الدوائية مع اختبارات وأسئلة ومراجعة حساب الجرعات.',
      summary_en: 'Accessible drug-class explanations, quizzes, practice questions and dosage-calculation reviews.',
      note_ar: 'الدروس العامة واختبارات الموقع مجانية؛ الكتب والمذكرات التي يبيعها الموقع منفصلة.',
      note_en: 'Public lessons and site quizzes are free; books and notes sold separately are not included.',
      url: 'https://www.registerednursern.com/nurse/pharmacology-nclex/',
      links: [
        { ar: 'دروس علم الأدوية', en: 'Pharmacology lessons', url: 'https://www.registerednursern.com/nurse/pharmacology-nclex/' },
        { ar: 'فهرس الاختبارات المجانية', en: 'Free quiz index', url: 'https://www.registerednursern.com/nursing-student-quizzes-tests/' }
      ],
      evidence_urls: ['https://www.registerednursern.com/nurse/pharmacology-nclex/', 'https://www.registerednursern.com/nursing-student-quizzes-tests/']
    },
    {
      id: 'pharm-registerednursern-playlist', title: 'RegisteredNurseRN — Nursing Pharmacology Video Playlist',
      title_ar: 'RegisteredNurseRN — قائمة فيديوهات علم الأدوية للتمريض', group: 'learning', access: 'free',
      provider: 'RegisteredNurseRN / Nurse Sarah', type: 'video',
      summary_ar: 'قائمة فيديوهات علم الأدوية الرسمية التي يربطها موقع RegisteredNurseRN.',
      summary_en: 'The official nursing pharmacology video playlist linked from the RegisteredNurseRN website.',
      note_ar: 'مشاهدة مجانية عبر YouTube؛ قد تظهر إعلانات، واستهلاك الإنترنت يتأثر بجودة الفيديو.',
      note_en: 'Free YouTube viewing; advertisements may appear, and data usage depends on video quality.',
      url: 'https://www.youtube.com/playlist?list=PLQrdx7rRsKfWpel1Ymwd9IQe0noyzAjeS',
      links: [{ ar: 'مشاهدة قائمة علم الأدوية', en: 'Watch the pharmacology playlist', url: 'https://www.youtube.com/playlist?list=PLQrdx7rRsKfWpel1Ymwd9IQe0noyzAjeS' }],
      evidence_urls: ['https://www.registerednursern.com/nursing-videos/']
    },
    {
      id: 'pharm-simplenursing', title: 'SimpleNursing — Pharmacology',
      title_ar: 'SimpleNursing — علم الأدوية بالتعلّم البصري', group: 'learning', access: 'mixed',
      provider: 'SimpleNursing', type: 'guide',
      summary_ar: 'مركز عام يضم شروحًا وبطاقات دوائية وأسئلة للمراجعة، باستخدام وسائل بصرية وتذكّر مبسطة.',
      summary_en: 'A public hub of explanations, drug cards and review questions using visual learning and memory aids.',
      note_ar: 'الموارد العامة مجانية، والعضوية الكاملة مدفوعة. تجربة العضوية محدودة لمدة 5 أيام ودون بطاقة ائتمان؛ تتطلب إنشاء حساب.',
      note_en: 'Public resources are free; full membership is paid. The limited five-day membership trial requires an account but no credit card.',
      url: 'https://simplenursing.com/pharmacology/',
      links: [
        { ar: 'الموارد العامة لعلم الأدوية', en: 'Public pharmacology resources', url: 'https://simplenursing.com/pharmacology/' },
        { ar: 'التجربة المحدودة — حساب مجاني', en: 'Limited trial — free account', url: 'https://simplenursing.com/free-trial/' },
        { ar: 'العضويات والشروط', en: 'Memberships and terms', url: 'https://simplenursing.com/pricing/' }
      ],
      evidence_urls: ['https://simplenursing.com/pharmacology/', 'https://simplenursing.com/free-trial/', 'https://simplenursing.com/pricing/']
    },
    {
      id: 'pharm-dailymed', title: 'DailyMed — Drug Labeling',
      title_ar: 'DailyMed — النشرات والمعلومات الدوائية', group: 'clinical', access: 'free',
      provider: 'U.S. National Library of Medicine (NLM)', type: 'tool',
      summary_ar: 'قاعدة مجانية للبحث في النشرات الدوائية الحالية التي تقدمها الشركات إلى FDA، مع عرض HTML وPDF.',
      summary_en: 'A free database of current drug labeling submitted by companies to the FDA, with HTML and PDF formats.',
      note_ar: 'ليست قائمة كاملة بكل الأدوية المعتمدة؛ تضم منتجات غير معتمدة، وقد تختلف النشرة المنشورة عن آخر نشرة اعتمدتها FDA. تحقق من حالة المنتج، واستخدم Drugs@FDA عند الحاجة إلى معلومات الاعتماد.',
      note_en: 'Not a complete list of approved drugs: unapproved products are included, and submitted labeling may differ from the latest FDA-approved labeling. Check the product status and use Drugs@FDA for approval information.',
      url: 'https://dailymed.nlm.nih.gov/dailymed/',
      links: [
        { ar: 'البحث في DailyMed', en: 'Search DailyMed', url: 'https://dailymed.nlm.nih.gov/dailymed/' },
        { ar: 'نطاق القاعدة وحدودها', en: 'Database scope and limitations', url: 'https://dailymed.nlm.nih.gov/dailymed/about-dailymed.cfm' }
      ],
      evidence_urls: ['https://dailymed.nlm.nih.gov/dailymed/about-dailymed.cfm']
    },
    {
      id: 'pharm-drugsatfda', title: 'Drugs@FDA — Approved Drug Information',
      title_ar: 'Drugs@FDA — معلومات اعتماد الأدوية', group: 'clinical', access: 'free',
      provider: 'U.S. Food and Drug Administration (FDA)', type: 'tool',
      summary_ar: 'مدخل رسمي لمعلومات اعتماد الأدوية والنشرات المعتمدة وسجل المراجعة التنظيمية ضمن نطاق قاعدة Drugs@FDA.',
      summary_en: 'An official route to drug approval records, approved labeling and regulatory reviews within the scope of Drugs@FDA.',
      note_ar: 'مكمّل لـDailyMed؛ لا يشمل المنتجات التي ينظمها مركز CBER مثل اللقاحات ومنتجات الدم. الاعتماد الأمريكي لا يثبت تسجيل الدواء محليًا.',
      note_en: 'A companion to DailyMed; it excludes CBER-regulated products such as vaccines and blood products. U.S. approval does not establish local registration.',
      url: 'https://www.fda.gov/drugs/drug-approvals-and-databases/resources-information-approved-drugs',
      links: [{ ar: 'الدخول الرسمي إلى Drugs@FDA', en: 'Official Drugs@FDA access', url: 'https://www.fda.gov/drugs/drug-approvals-and-databases/resources-information-approved-drugs' }],
      evidence_urls: ['https://www.fda.gov/drugs/drug-approvals-and-databases/resources-information-approved-drugs', 'https://www.fda.gov/drugs/laws-acts-and-rules/fdas-labeling-resources-human-prescription-drugs']
    },
    {
      id: 'pharm-epocrates', title: 'Epocrates — Geographic Access Notice',
      title_ar: 'Epocrates — تنبيه بشأن إتاحة الوصول', group: 'clinical', access: 'restricted',
      provider: 'Epocrates', type: 'tool',
      summary_ar: 'مرجع دوائي اقترحته د. عائشة؛ توضح صفحة الدعم الرسمية قيدًا جغرافيًا على الوصول.',
      summary_en: 'A requested drug reference whose official support page states a geographic restriction.',
      note_ar: 'تعلن الشركة تقييد الموقع والتطبيق بعناوين إنترنت داخل الولايات المتحدة؛ لذلك لا يُعرض كخيار مضمون للطلاب في ليبيا. الرابط يوضح السياسة الحالية.',
      note_en: 'The provider states that both web and mobile services are restricted to U.S.-based IP addresses. It is therefore not presented as a dependable access option for students in Libya; the link explains the current policy.',
      url: 'https://www.epocrates.com/discover/faq',
      links: [{ ar: 'سياسة الوصول الدولية الرسمية', en: 'Official international access policy', url: 'https://www.epocrates.com/discover/faq' }],
      evidence_urls: ['https://www.epocrates.com/discover/faq']
    },
    {
      id: 'pharm-lexidrug', title: 'UpToDate Lexidrug (formerly Lexicomp)',
      title_ar: 'UpToDate Lexidrug — الاسم الحالي لـLexicomp', group: 'clinical', access: 'paid',
      provider: 'Wolters Kluwer', type: 'tool',
      summary_ar: 'مرجع دوائي للتداخلات والجرعات والآثار الجانبية، مع تطبيق يدعم تنزيل قواعد البيانات للاستخدام دون اتصال.',
      summary_en: 'A drug reference for interactions, dosing and adverse effects, with downloadable mobile databases for offline use.',
      note_ar: 'مدفوع فرديًا أو بترخيص مؤسسي. يعلن متجر Android تجربة 14 يومًا تتجدد إلى اشتراك مدفوع تلقائيًا ما لم تُلغَ قبل نهايتها بـ24 ساعة على الأقل. تحقق من الشروط وإتاحة المتجر في ليبيا قبل التسجيل؛ لم يُفعّل اشتراك للكلية.',
      note_en: 'Requires an individual or institutional subscription. The Android listing advertises a 14-day trial that automatically becomes paid unless cancelled at least 24 hours before it ends. Check the terms and local store availability before registering; no faculty subscription has been activated.',
      url: 'https://www.wolterskluwer.com/en/solutions/uptodate/about/mobile-apps/lexidrug',
      links: [
        { ar: 'المعلومات الرسمية والتطبيق', en: 'Official information and mobile app', url: 'https://www.wolterskluwer.com/en/solutions/uptodate/about/mobile-apps/lexidrug' },
        { ar: 'خيارات الاشتراك المؤسسي والفردي', en: 'Individual and institutional subscriptions', url: 'https://www.wolterskluwer.com/en/solutions/uptodate/subscribe' },
        { ar: 'Android — راجع التجديد التلقائي', en: 'Android — review automatic renewal', url: 'https://play.google.com/store/apps/details?id=com.lexi.android' }
      ],
      evidence_urls: ['https://www.wolterskluwer.com/en/solutions/uptodate/about/mobile-apps/lexidrug', 'https://www.wolterskluwer.com/en/solutions/uptodate/resources/mobile-app-support', 'https://play.google.com/store/apps/details?id=com.lexi.android']
    },
    {
      id: 'pharm-uworld-samples', title: 'UWorld — Free Pharmacology NCLEX Practice',
      title_ar: 'UWorld — نماذج أسئلة علم الأدوية مع تفسير الإجابات', group: 'questions', access: 'mixed',
      provider: 'UWorld Nursing', type: 'guide',
      summary_ar: 'أسئلة عامة مجانية وفيديوهات تشرح طريقة التفكير في أسئلة علم الأدوية على نمط NCLEX.',
      summary_en: 'Public sample questions and videos explaining reasoning through NCLEX-style pharmacology questions.',
      note_ar: 'البنك الكامل مدفوع. توجد تجربة منفصلة لمدة 7 أيام تشمل 50 سؤالًا نموذجيًا وحسابًا مجانيًا، دون بطاقة ائتمان؛ لا تتيح البنك الكامل.',
      note_en: 'The complete QBank is paid. A separate seven-day trial includes 50 sample questions and requires a free account but no credit card; it does not unlock the complete bank.',
      url: 'https://nursing.uworld.com/nclex/free-nclex-exam-practice-questions/pharmacology/',
      links: [
        { ar: 'الأسئلة والفيديوهات العامة', en: 'Public questions and videos', url: 'https://nursing.uworld.com/nclex/free-nclex-exam-practice-questions/pharmacology/' },
        { ar: 'تجربة 7 أيام وخيارات البنك الكامل', en: 'Seven-day trial and full QBank options', url: 'https://nursing.uworld.com/nclex-rn/' }
      ],
      evidence_urls: ['https://nursing.uworld.com/nclex/free-nclex-exam-practice-questions/pharmacology/', 'https://nursing.uworld.com/nclex-rn/']
    },
    {
      id: 'pharm-archer-demo', title: 'Archer Review — NCLEX-RN Demo',
      title_ar: 'Archer Review — العرض التجريبي لأسئلة NCLEX-RN', group: 'questions', access: 'mixed',
      provider: 'Archer Review Nursing', type: 'guide',
      summary_ar: 'عرض تجريبي رسمي للتعرف إلى أسئلة NCLEX-RN وتفسير الإجابات وخيارات المراجعة.',
      summary_en: 'The official demo introduces NCLEX-RN questions, answer rationales and review options.',
      note_ar: 'اختر Try Free من الصفحة الرسمية. البنك الكامل والبرامج مدفوعة. لم تثبت مدة محددة للعرض؛ مراجعة 3 أيام خدمة أخرى وليست مدة التجربة المجانية.',
      note_en: 'Choose Try Free on the official page. Full question banks and review plans are paid. No fixed demo duration was verified; the three-day review is a separate service, not the free-trial duration.',
      url: 'https://nurses.archerreview.com/nclex-rn',
      links: [
        { ar: 'العرض التجريبي — Try Free', en: 'Open the demo — Try Free', url: 'https://nurses.archerreview.com/nclex-rn' },
        { ar: 'الأسئلة الشائعة وشروط الوصول', en: 'FAQ and access details', url: 'https://nurses.archerreview.com/faq' }
      ],
      evidence_urls: ['https://nurses.archerreview.com/faq', 'https://nurses.archerreview.com/nclex-rn']
    },
    {
      id: 'pharm-medscape-interactions', title: 'Medscape — Drug Interaction Checker',
      title_ar: 'Medscape — التحقق من التداخلات الدوائية', group: 'clinical', access: 'free_registration',
      provider: 'Medscape / WebMD', type: 'tool',
      summary_ar: 'أداة مرجعية للبحث عن التداخلات بين الأدوية الموصوفة والأدوية دون وصفة والمكملات العشبية.',
      summary_en: 'A reference tool for checking interactions among prescription medicines, OTC drugs and herbal supplements.',
      note_ar: 'متاح ضمن أدوات Medscape المجانية؛ قد يُطلب حساب مجاني. يستخدم أثناء التدريب تحت إشراف المختص ووفق بروتوكول المؤسسة، مع التحقق من الأسماء العلمية والتركيزات.',
      note_en: 'Included in Medscape’s free tools; a free account may be required. During clinical training, use under qualified supervision and local protocols, checking generic names and strengths.',
      url: 'https://reference.medscape.com/drug-interactionchecker',
      links: [
        { ar: 'فتح أداة التداخلات', en: 'Open the interaction checker', url: 'https://reference.medscape.com/drug-interactionchecker' },
        { ar: 'طريقة الاستخدام الرسمية', en: 'Official usage instructions', url: 'https://help.medscape.com/hc/en-us/articles/5019895680269-How-can-I-run-a-drug-interaction-check' }
      ],
      evidence_urls: ['https://help.medscape.com/hc/en-us/articles/5019895680269-How-can-I-run-a-drug-interaction-check', 'https://play.google.com/store/apps/details?id=com.medscape.android']
    }
  ];

  window.PHARMACOLOGY_COLLECTION = {
    id: collectionId, date: verifiedAt, course_id: courseId,
    title_ar: 'مصادر علم الأدوية التي اقترحتها د. عائشة',
    title_en: 'Pharmacology resources suggested by Dr Aisha',
    entries
  };

  const catalogue = window.LIBRARY_CATALOG;
  if (!catalogue || !Array.isArray(catalogue.resources)) return;

  function canonical(value) {
    try {
      const url = new URL(String(value));
      url.hash = '';
      url.hostname = url.hostname.toLowerCase().replace(/^www\./, '');
      const parameters = [...url.searchParams].filter(([key]) => !/^utm_|^(role|hl)$/i.test(key));
      url.search = '';
      parameters.sort(([a], [b]) => a.localeCompare(b)).forEach(([key, val]) => url.searchParams.append(key, val));
      return url.href.replace(/\/$/, '');
    } catch (_) { return String(value || '').replace(/\/$/, ''); }
  }

  const unique = values => [...new Set(values.filter(Boolean))];
  for (const entry of entries) {
    const existing = catalogue.resources.find(resource => resource.id === entry.id)
      || catalogue.resources.find(resource => canonical(resource.url) === canonical(entry.url));
    const record = existing || {};
    if (!existing) {
      record.id = entry.id;
      record.url = entry.url;
      catalogue.resources.push(record);
    }
    // Retain stable IDs, canonical URLs, existing course links and original source collection.
    entry.catalog_id = record.id;
    record.title_ar = entry.title_ar;
    record.title_original = entry.title;
    record.provider = entry.provider;
    record.language = 'en';
    record.type = entry.type;
    record.level = record.level || 'clinical';
    record.description_ar = entry.summary_ar;
    record.description_en = entry.summary_en;
    record.access = entry.access;
    record.access_note_ar = entry.note_ar;
    record.access_note_en = entry.note_en;
    record.verified_at = verifiedAt;
    record.verification = 'page_checked';
    record.evidence_url = entry.evidence_urls[0];
    record.evidence_urls = unique([...(record.evidence_urls || []), ...entry.evidence_urls]);
    record.source_collection = record.source_collection || collectionId;
    record.collection_ids = unique([...(record.collection_ids || []), collectionId]);
    record.pharmacology_collection = true;
    record.pharmacology_group = entry.group;
    record.course_ids = unique([...(record.course_ids || []), courseId]);
    record.topics = unique([...(record.topics || []), 'علم الأدوية', 'سلامة الأدوية']);
    record.links = entry.links;
    for (const key of ['edition', 'year', 'isbn']) if (entry[key] !== undefined) record[key] = entry[key];
  }
  const course = (catalogue.curriculum || []).find(item => item.id === courseId);
  if (course) course.resource_ids = unique([...(course.resource_ids || []), ...entries.map(entry => entry.catalog_id)]);
  const resources = catalogue.resources;
  const stats = catalogue.stats = catalogue.stats || {};
  stats.total = resources.length;
  stats.arabic = resources.filter(resource => resource.language === 'ar').length;
  stats.providers = new Set(resources.map(resource => resource.provider).filter(Boolean)).size;
  stats.types = resources.reduce((types, resource) => { types[resource.type] = (types[resource.type] || 0) + 1; return types; }, {});
  stats.verified_page = resources.filter(resource => resource.verification === 'page_checked').length;
  stats.verified_index = resources.filter(resource => resource.verification === 'index_checked').length;
  stats.pharmacology_collection_entries = entries.length;
  catalogue.release = {...catalogue.release, id:'20261029-pharmacology-1', date:'29 أكتوبر 2026'};
})();
