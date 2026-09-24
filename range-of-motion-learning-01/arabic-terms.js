'use strict';
/* Arabic teaching-language review, 2026-09-24.
 * Direction-first labels preserve the conventional anatomical terms.
 * English curricular wording, term IDs, answer keys and motion geometry are unchanged.
 * Meaning checked against OpenStax Anatomy & Physiology 2e, section 9.5.
 * Arabic lexical check: Cairo Arabic Language Academy, al-Mu'jam al-Wasit,
 * entry الوَحْشِيّ (contrasted with الإنسي). Almaany could not be fetched;
 * no terminology here is claimed to have been verified on that site.
 */
(function () {
  const data = window.ROM_DATA;
  if (!data || !Array.isArray(data.terms)) return;
  const byId = Object.fromEntries(data.terms.map(term => [term.id, term]));
  const changes = {
    lateral: {
      name: 'الدوران للخارج (الوحشي)',
      definition: 'تدوير الطرف إلى الخارج حول محوره الطولي، بعيدًا عن الخط الناصف للجسم.',
      cue: 'الوحشي مصطلح تشريحي يعني الاتجاه بعيدًا عن الخط الناصف، ولا يصف قوة الحركة. الخط الناصف خط تخيلي يمر بمنتصف الجسم بين جهتيه اليمنى واليسرى. في هذا المثال يدور العضد، أي الجزء بين الكتف والمرفق، بينما يبقى المرفق قرب الجذع؛ لا ترتفع الذراع كلها جانبًا.',
      confusion: 'الدوران للخارج عند الكتف يختلف عن استلقاء الساعد؛ حدّد الجزء الذي يدور، وليس اتجاه راحة اليد وحده.'
    },
    medial: {
      name: 'الدوران للداخل (الإنسي)',
      definition: 'تدوير الطرف إلى الداخل حول محوره الطولي، نحو الخط الناصف للجسم.',
      cue: 'الإنسي مصطلح تشريحي يعني الاتجاه نحو الخط الناصف، أي نحو منتصف الجسم بين جهتيه اليمنى واليسرى. في هذا المثال يبقى المرفق قرب الجذع ويتحرك الساعد المثني نحو البطن بسبب دوران العضد عند الكتف.',
      confusion: 'الدوران للداخل عند الكتف ليس ثنيًا للمرفق، وليس تقريب الذراع كلها نحو الجذع؛ تبقى زاوية المرفق ثابتة في المثال.'
    },
    pronation: {
      name: 'كبّ الساعد (راحة اليد لأسفل)',
      cue: 'مع بقاء المرفق مثنيًا، دوّر الساعد لتتجه راحة اليد لأسفل. راقب دوران الراحة دون ثني الرسغ؛ الساعد هو الجزء بين المرفق والرسغ.'
    },
    supination: {
      name: 'استلقاء الساعد (راحة اليد لأعلى)',
      cue: 'مع بقاء المرفق مثنيًا، دوّر الساعد لتتجه راحة اليد لأعلى. كلمة استلقاء هنا تخص حركة الساعد، ولا تعني استلقاء الجسم على الظهر.'
    }
  };
  for (const [id, fields] of Object.entries(changes)) {
    const term = byId[id];
    if (!term) continue;
    for (const [field, arabic] of Object.entries(fields)) {
      if (Array.isArray(term[field])) term[field][1] = arabic;
    }
  }
  data.arabicTerminologyReview = {
    version: '2026-09-24',
    scope: ['lateral', 'medial', 'pronation', 'supination'],
    meaningReference: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/9-5-types-of-body-movements',
    lexicalReference: 'https://www.arabicacademy.gov.eg/ar/محرك-البحث/معجم/dic-19/الوحشي',
    almaanyVerified: false,
    clinicalValidation: false
  };
})();
