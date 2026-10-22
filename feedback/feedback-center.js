(function(){
'use strict';
const C=window.HubFeedbackConfig||{},H=window.HubFeedback;
const params=new URL(location.href).searchParams;
const supportedServices=new Set(['general','portal','simulation','library','community']);
const bounded=(s,n=650)=>String(s||'').replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,n);
let lang=params.get('lang')==='en'?'en':'ar';
let service=supportedServices.has(params.get('service'))?params.get('service'):'general';
const inheritedContext=bounded(params.get('context'));
const inheritedLabel=bounded(params.get('label'),120);
const $=id=>document.getElementById(id);
const copy={
 ar:{skip:'انتقل إلى المحتوى',faculty:'كلية التمريض',university:'جامعة طبرق',home:'بوابة الكلية',eyebrow:'مشاركة قصيرة · خدمة أوضح',title:'ملاحظاتك وطلباتك',intro:'اختر ما تحتاجه. كل قناة توصل مشاركتك إلى مكانها المناسب، مع الحفاظ على خصوصيتها.',pillOpinion:'رأي وتقييم',pillResources:'طلب مصدر',pillComplaint:'شكوى خاصة',contextLead:'جئت من:',shortBadge:'مشاركة قصيرة',opinionTitle:'رأيك وتقييم تجربتك',opinionText:'ملاحظة، اقتراح، مشكلة تقنية أو تقييم لسهولة الاستخدام ووضوح المحتوى وفائدته.',serviceLabel:'عن أي جزء تريد المشاركة؟',serviceGeneral:'مشاركة عامة',servicePortal:'البوابة والدعم الطلابي',serviceSimulation:'المحاكاة والمهارات',serviceLibrary:'تجربتي في استخدام المكتبة',serviceCommunity:'تمريض من أجل المجتمع',opinionAction:'أرسل رأيك أو قيّم تجربتك',opinionNote:'3 أسئلة تقييم اختيارية، وتعليق عند الحاجة. دون اسم أو بريد.',requestBadge:'خدمة مستقلة',libraryTitle:'أطلب مصدرًا للمكتبة',libraryText:'اذكر المقرر والموضوع الذي تحتاجه، أو اسم مرجع بعينه. يمكنك طلب مصادر عربية أو إنجليزية.',libraryItemOne:'يمكنك تقديم عدة طلبات، كل طلب في سطر.',libraryItemTwo:'توفير المصدر يعتمد على الإتاحة القانونية والإمكانات.',libraryAction:'فتح طلب مصدر',libraryNote:'طلبك محفوظ في قناة المكتبة، وتبقى تفاصيله خاصة.',privateBadge:'قناة خاصة',complaintTitle:'شكوى أو ملاحظة خاصة',complaintText:'لموضوع يحتاج مراجعة خاصة من الكلية، مثل الدراسة أو الخدمات أو التعاملات.',complaintItemOne:'اكتب الوقائع وما تقترحه للحل بوضوح.',complaintItemTwo:'اترك وسيلة تواصل عند رغبتك في التواصل معك.',complaintAction:'فتح قناة الشكاوى',complaintNote:'تُراجع التفاصيل بصورة خاصة وتُحال بحسب موضوعها.',surveysEyebrow:'بحسب دورك وموضوع المشاركة',surveysTitle:'استبانات محددة بدورة',surveysIntro:'اختر الاستبانة المناسبة لك بحسب الدعوة التي تلقيتها. تحتفظ كل دورة بأسئلتها ونتائجها.',communityRequestEyebrow:'مسار خاص بالمبادرة',communityRequestTitle:'اقتراح موضوع للمبادرة وطلب إبلاغي',communityRequestText:'اقترح موضوعًا أو تحسينًا لـ«تمريض من أجل المجتمع». يمكنك ترك وسيلة تواصل لطلب إبلاغك عند تنفيذ المقترح أو إضافة الموضوع؛ وتركها اختياري.',communityRequestNote:'يراجع فريق المبادرة الطلبات، وتبقى تفاصيل المقترح ووسيلة التواصل في قناة المبادرة الخاصة.',communityRequestAction:'اقتراح موضوع وطلب إبلاغي',privacyTitle:'مشاركتك في مكانها المناسب',privacyText:'تُحفظ طلبات المكتبة والشكاوى في قنوات مستقلة. لا تعرض هذه الصفحة الردود الفردية أو بيانات التواصل. اضغط «إرسال» داخل النموذج لإتمام مشاركتك.',footer:'كلية التمريض · جامعة طبرق',back:'العودة إلى بوابة الكلية',unavailable:'استقبال الملاحظات غير متاح حاليًا.',cycleStrategy:'جولة أكتوبر 2026',cycleProgramme:'تجربة البرنامج والتدريب',langAr:'العربية',langEn:'الإنجليزية'},
 en:{skip:'Skip to content',faculty:'Faculty of Nursing',university:'Tobruk University',home:'Faculty Hub',eyebrow:'A short contribution · A clearer service',title:'Your feedback and requests',intro:'Choose what you need. Each channel brings your contribution to the right place while keeping its details private.',pillOpinion:'Feedback and ratings',pillResources:'Resource request',pillComplaint:'Private complaint',contextLead:'You came from:',shortBadge:'A short contribution',opinionTitle:'Share your experience',opinionText:'A comment, suggestion, technical issue or rating of ease of use, content clarity and usefulness.',serviceLabel:'Which part is your feedback about?',serviceGeneral:'General feedback',servicePortal:'Faculty Hub and student support',serviceSimulation:'Simulations and skills',serviceLibrary:'My library experience',serviceCommunity:'Nursing for the Community',opinionAction:'Share feedback or rate your experience',opinionNote:'Three optional rating questions, with a comment if needed. No name or email.',requestBadge:'A dedicated service',libraryTitle:'Request a library resource',libraryText:'Give the course and topic you need, or the name of a specific reference. You can request Arabic or English resources.',libraryItemOne:'You can include several requests, one per line.',libraryItemTwo:'Availability depends on lawful access and available resources.',libraryAction:'Open a resource request',libraryNote:'Your request stays in the library channel and its details remain private.',privateBadge:'A private channel',complaintTitle:'A complaint or private concern',complaintText:'For an issue that needs private review by the Faculty, such as study, services or interactions.',complaintItemOne:'Describe the facts and the solution you suggest clearly.',complaintItemTwo:'Leave contact details if you would like the Faculty to contact you.',complaintAction:'Open the complaints channel',complaintNote:'Details are reviewed privately and referred according to the subject.',surveysEyebrow:'According to your role and the topic',surveysTitle:'Surveys for a specific round',surveysIntro:'Choose the survey relevant to you and the invitation you received. Each round keeps its own questions and results.',communityRequestEyebrow:'A dedicated initiative channel',communityRequestTitle:'Suggest a topic and request an update',communityRequestText:'Suggest a topic or improvement for Nursing for the Community. You may leave contact details to request an update when your suggestion is implemented or the topic is added. Contact details are optional.',communityRequestNote:'The initiative team reviews requests. Your suggestion and any contact details stay in the initiative’s private channel.',communityRequestAction:'Suggest a topic and request an update',privacyTitle:'Your contribution in the right place',privacyText:'Library requests and complaints stay in separate channels. This page does not display individual responses or contact details. Choose Submit inside the form to complete your contribution.',footer:'Faculty of Nursing · Tobruk University',back:'Back to the Faculty Hub',unavailable:'Feedback is currently unavailable.',cycleStrategy:'October 2026 round',cycleProgramme:'Programme and training experience',langAr:'Arabic',langEn:'English'}
};
function publicFormUrl(value){
 try{const u=new URL(value);if(u.protocol!=='https:')return null;
  if(u.hostname==='forms.gle'&&/^\/[A-Za-z0-9_-]+$/.test(u.pathname))return u.href;
  if(u.hostname==='docs.google.com'&&/^\/forms\/d\/e\/[^/]+\/viewform$/.test(u.pathname)){u.searchParams.set('hl',lang);return u.href;}
 }catch(_){}return null;
}
function assignLink(id,url){const a=$(id),href=publicFormUrl(url);if(href){a.href=href;a.classList.remove('unavailable');a.removeAttribute('aria-disabled');}else{a.removeAttribute('href');a.classList.add('unavailable');a.setAttribute('aria-disabled','true');}}
function communityRequestUrl(){
 const href=publicFormUrl(C.communitySuggestionUrl);if(!href)return null;
 const u=new URL(href);
 if(/^entry\.\d+$/.test(C.communityContextEntry||'')){u.searchParams.set('usp','pp_url');u.searchParams.set(C.communityContextEntry,'Topic suggestion and optional notification request | service=community | channel=participation-center | language='+lang+' | version='+C.version);}
 return u.href;
}
function context(){
 const original=inheritedContext.replace(/(?:^|\s\|\s)service=[^|]*/g,'').replace(/^\s*\|\s*|\s*\|\s*$/g,'').trim();
 return bounded('service='+service+' | '+(original||'topic=feedback-center | page=feedback/')+' | channel=participation-center | cycle=continuous-20261022');
}
function updateFeedbackLink(){
 const a=$('opinionLink'),href=H?.buildFormUrl({context:context(),service,lang});
 if(href){a.href=href;a.classList.remove('unavailable');a.removeAttribute('aria-disabled');}
 else{a.removeAttribute('href');a.classList.add('unavailable');a.setAttribute('aria-disabled','true');a.querySelector('[data-i18n]').textContent=copy[lang].unavailable;}
 a.dataset.metricsItem='unified-feedback-'+service;
}
function renderSurveys(){
 const list=$('surveyList');list.replaceChildren();
 for(const survey of Array.isArray(C.surveys)?C.surveys:[]){
  const href=publicFormUrl(survey.url);if(!href)continue;
  const a=document.createElement('a');a.className='survey-link';a.href=href;a.target='_blank';a.rel='noopener noreferrer';a.referrerPolicy='no-referrer';a.dataset.metricsEvent='service_open';a.dataset.metricsItem='survey-'+String(survey.id||'').replace(/[^A-Za-z0-9_-]/g,'').slice(0,80);
  const body=document.createElement('div');body.className='survey-copy';
  const meta=document.createElement('div');meta.className='survey-meta';
  const cycle=document.createElement('span');cycle.textContent=survey.group==='strategy'?copy[lang].cycleStrategy:copy[lang].cycleProgramme;meta.append(cycle);
  const language=document.createElement('span');language.textContent=survey.language==='en'?copy[lang].langEn:copy[lang].langAr;meta.append(language);body.append(meta);
  const title=document.createElement('h3');title.textContent=survey[lang==='ar'?'titleAr':'titleEn'];body.append(title);
  const description=document.createElement('p');description.textContent=survey[lang==='ar'?'descriptionAr':'descriptionEn'];body.append(description);
  const accessNote=survey[lang==='ar'?'accessNoteAr':'accessNoteEn'];if(accessNote){const note=document.createElement('p');note.className='survey-access-note';note.textContent=accessNote;body.append(note);}a.append(body);
  const arrow=document.createElement('span');arrow.className='survey-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';a.append(arrow);list.append(a);
 }
 $('surveys').hidden=!list.children.length;
}
function render(){
 document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 document.title=copy[lang].title+' · '+copy[lang].faculty+' · '+copy[lang].university;
 document.querySelectorAll('[data-i18n]').forEach(el=>{const value=copy[lang][el.dataset.i18n];if(value)el.textContent=value;});
 $('serviceSelect').value=service;
 $('languageButton').textContent=lang==='ar'?'English':'العربية';$('languageButton').lang=lang==='ar'?'en':'ar';$('languageButton').setAttribute('aria-label',lang==='ar'?'Switch to English':'التبديل إلى العربية');
 $('brandLink').setAttribute('aria-label',copy[lang].home);$('universityLogo').alt=copy[lang].university;$('facultyLogo').alt=copy[lang].faculty;
 $('topNavigation').setAttribute('aria-label',lang==='ar'?'التنقل':'Navigation');$('serviceGrid').setAttribute('aria-label',lang==='ar'?'اختر قناة المشاركة':'Choose a participation channel');$('heroPills').setAttribute('aria-label',lang==='ar'?'قنوات المشاركة':'Participation channels');
 if(inheritedContext||inheritedLabel){$('sourceContext').hidden=false;$('sourceLabel').textContent=inheritedLabel||copy[lang]['service'+service[0].toUpperCase()+service.slice(1)]||copy[lang].serviceGeneral;}
 assignLink('libraryLink',C.libraryUrl);assignLink('complaintLink',C.complaintUrl);assignLink('communitySuggestionLink',communityRequestUrl());updateFeedbackLink();renderSurveys();
}
$('serviceSelect').addEventListener('change',()=>{service=supportedServices.has($('serviceSelect').value)?$('serviceSelect').value:'general';updateFeedbackLink();});
$('languageButton').addEventListener('click',()=>{lang=lang==='ar'?'en':'ar';const u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u);render();});
render();
})();
