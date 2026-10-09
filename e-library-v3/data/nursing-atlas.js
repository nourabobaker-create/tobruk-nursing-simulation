/* Faculty-owned general-knowledge resource. Load before library.js.
   No curriculum mapping, analytics, or duplicate copy of the atlas. */
(() => {
  'use strict';
  const catalogue = window.LIBRARY_CATALOG;
  if (!catalogue || !Array.isArray(catalogue.resources)) return;
  const entry = {
    id: 'tu-nursing-atlas',
    title_ar: 'أطلس التمريض',
    title_original: 'Nursing Atlas',
    type: 'tool',
    language: 'multi',
    level: 'all',
    access: 'free',
    provider: 'كلية التمريض، جامعة طبرق',
    url: 'https://nourabobaker-create.github.io/tobruk-nursing-simulation/clinical-discovery/',
    description_ar: 'دفتر مصوّر تفاعلي بالعربية والإنجليزية للتعرّف إلى الأدوات والأجهزة والضمادات والأدوية والسجلات، وتحريك المريض وتسليم الشفت وأركان الرعاية المختلفة. كل موضوع في صفحة مستقلة مع شرح ورسوم ومراجع. للمعرفة العامة فقط، دون ارتباط بمقرر أو امتحان.',
    topics: ['أطلس التمريض', 'المعرفة العامة', 'دفتر مصوّر', 'Nursing Atlas', 'Nursing Pocket Atlas'],
    course_ids: [],
    access_note_ar: 'يفتح الأطلس نفسه الموجود في بوابة الطالب؛ لا يتطلب حسابًا. نسخة تعليمية للمراجعة، وليست بروتوكولًا علاجيًا.',
    verification: 'page_checked',
    verified_at: '2026-10-09'
  };
  const existing = catalogue.resources.findIndex(resource => String(resource.id) === entry.id);
  if (existing === -1) catalogue.resources.push(entry);
  else catalogue.resources[existing] = entry;
})();
