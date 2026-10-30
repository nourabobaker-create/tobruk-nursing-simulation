/* Public institutional support entry, preserving the selected audience/language. */
(() => {
  'use strict';
  const root=document.getElementById('institutional-entry');if(!root)return;
  const query=new URLSearchParams(location.search);
  let role=['staff','ta','faculty'].includes(query.get('role'))?query.get('role'):'staff';
  let lang=document.documentElement.lang==='en'?'en':'ar';
  const nav=document.createElement('a');nav.href='#institutional-entry';
  document.querySelector('.section-nav')?.prepend(nav);
  function render(){
    const t=(ar,en)=>lang==='ar'?ar:en;
    const href=id=>`institutional/?role=${role}&lang=${lang}#${id}`;
    const entries=[['quality','الجودة والتحسين','Quality and improvement'],['digital','التحول الرقمي','Digital working'],['strategy','دورك في الخطة','Your role in the plan'],['skills','مهارات حسب الدور','Role-based skills'],['community','خدمة المجتمع والمبادرات','Community initiatives'],['ethics','الأخلاقيات والمواثيق','Ethics and charters'],['academic','دعم التعليم والبحث','Teaching and research']];
    nav.textContent=t('الخطة والجودة ومهارات دوري','Plan, quality and role skills');
    root.innerHTML=`<div class="institutional-entry"><div class="institutional-entry-copy"><span>${t('من الخطة إلى التطبيق','From the plan to practice')}</span><h2 id="institutionalEntryTitle">${t('دورك ومهاراتك ومساهمتك في تطوير الكلية','Your role, skills and contribution to Faculty development')}</h2><p>${t('مساهمات عملية في الخطة، وحزم مهارات بحسب الدور، وإدارة الوقت والمشاريع والمبادرات، مع وثائق الكلية وإرشادات أخلاقيات البحث والعمل.','Practical contributions to the plan, role-based skills, time, project and initiative management, with Faculty documents and guidance on research and workplace ethics.')}</p></div><div class="institutional-entry-links">${entries.map(([id,ar,en],i)=>`<a class="${i<2?'institutional-primary':''}" href="${href(id)}" data-metrics-event="resource_open" data-metrics-item="development:${role}:institutional:entry:${id}">${t(ar,en)} <span aria-hidden="true">↗</span></a>`).join('')}</div></div>`;
  }
  document.addEventListener('development:context',event=>{if(['staff','ta','faculty'].includes(event.detail?.role))role=event.detail.role;lang=event.detail?.lang==='en'?'en':'ar';render();});
  render();
})();
