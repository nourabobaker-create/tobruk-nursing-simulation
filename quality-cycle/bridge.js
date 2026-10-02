/* Shared navigation only. Does not grant access or publish internal records. */
(() => {
'use strict';
const here=new URL(document.currentScript.src),root=new URL('../',here),cycle=new URL('quality-cycle/',root);
function start(){
 if(document.getElementById('quality-cycle-links'))return;
 const nav=document.createElement('nav');nav.id='quality-cycle-links';nav.dir='rtl';nav.setAttribute('aria-label','دورة الجودة المترابطة');
 Object.assign(nav.style,{display:'flex',flexWrap:'wrap',gap:'10px',alignItems:'center',padding:'12px 18px',background:'#e9f2ed',borderBottom:'1px solid #cadbd1',font:'14px/1.8 Tahoma,Arial,sans-serif',position:'relative',zIndex:'1'});
 const title=document.createElement('b');title.textContent='دورة الجودة';nav.append(title);
 const targets=[['بوابة الكلية',new URL('./',root)],['الاعتماد والشواهد',new URL('accreditation/',root)],['منظومة الإدارة — تجريبية',new URL('quality-system-prototype/',root)],['سمعناكم… وهذا ما تغيّر',cycle],['الخطة والتقويمات',new URL('#calendar',cycle)],['تجربة الربط',new URL('#demo',cycle)]];
 for(const [label,url] of targets){const a=document.createElement('a');a.href=url.href;a.textContent=label;Object.assign(a.style,{color:'#174b3b',background:'#fff',border:'1px solid #cbdcd1',borderRadius:'9px',padding:'5px 10px',textDecoration:'none'});nav.append(a);}
 document.body.prepend(nav);
 const rel=location.pathname.startsWith(root.pathname)?location.pathname.slice(root.pathname.length):'';
 if(rel===''||rel==='index.html'){
  const main=document.querySelector('main');if(!main)return;
  const section=document.createElement('section');section.id='student-voice';section.className='section';
  section.innerHTML='<div class="sectionHead"><div><h2>سمعناكم… وهذا ما تغيّر</h2><p>من رأي الطلبة إلى استجابة موثقة ومعلنة تحمي الخصوصية.</p></div></div><div class="panel"><p>نشر الملخصات المجازة فقط: الموضوع العام، الاستجابة، حالتها وموعد المتابعة. لا ردود خام ولا أسماء مقررات أو أعضاء هيئة تدريس.</p></div>';
  const a=document.createElement('a');a.className='btn gold';a.href=cycle.href;a.textContent='نتائج الاستطلاعات واستجابتنا';a.style.marginTop='12px';section.lastElementChild.append(a);
  main.append(section);
  const intro=document.querySelector('#quality .qualityIntro');if(intro){const p=document.createElement('p');p.textContent='المواعيد أدناه وصف إرشادي، لا إعلان فتح. مراجعة خطة التفعيل ودليل الجامعة رصدت اختلافًا في دورية بعض أدوات الرضا العام؛ يثبت تقويم واحد بعد المراجعة لمنع التكرار.';const link=document.createElement('a');link.href=new URL('#calendar',cycle).href;link.textContent=' مراجعة التقويمات ونقاط القرار';p.append(link);intro.append(p);}
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
