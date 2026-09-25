'use strict';
/* The pinned six-skill scripts remain unchanged. Compile one additional registration and audio selector set. */
function compileSeven(base,audio){
 const change=(s,a,b)=>{if(!s.includes(a))throw Error('Hub version mismatch: '+a.slice(0,50));return s.replace(a,b);};
 const item="{id:'wound',file:'wound-dressing-learning-01/',title:['Wound Dressing / Wound Care','تغيير ضماد الجرح / العناية بالجرح'],category:['Bedside skills','مهارات عند السرير'],description:['Practise dressing removal, observations, cleansing and protected placement.','تدرّب على نزع الضماد والملاحظات والتنظيف ووضع الضماد مع حمايته.'],questions:24,state:'woundDressing'}";
 base=change(base,"state:'positioning'}","state:'positioning'},\n"+item);
 base=change(base,'${opened.size} / 6','${opened.size} / ${SKILLS.length}');
 base=change(base,"$('nextSkill').disabled=i>=5;","$('nextSkill').disabled=i>=SKILLS.length-1;");
 base=change(base,'if(i<5)go(SKILLS[i+1].id);','if(i<SKILLS.length-1)go(SKILLS[i+1].id);');
 base=base.replaceAll('Six','Seven').replaceAll('six','seven').replaceAll('ست وحدات','سبع وحدات').replaceAll('الوحدات الست','الوحدات السبع');
 // An all-skills link inside a module returns to the retained menu, rather than nesting another hub.
 base=change(base,"const id=matchModule(a.href);if(id)","if(a.id==='backHub'){e.preventDefault();e.stopPropagation();go(null);return;}const id=matchModule(a.href);if(id)");
 audio=change(audio,'standard: [',"wound: [['.wd-title','title'],['.wd-term','term'],['.wd-instruction','instruction'],['.wd-meaning','meaning']],\n    standard: [");
 audio=audio.replaceAll("'2.0'","'2.1'");
 return {hub:base,audio};
}
if(typeof module!=='undefined'&&module.exports)module.exports=compileSeven;
else{const boot=document.currentScript;(async()=>{try{
 const get=async name=>{const r=await fetch(name+'?v=wound7');if(!r.ok)throw Error(name+' '+r.status);return r.text();};
 const [base,audio]=await Promise.all([get('suite.js'),get('learning-audio.js')]);
 const compiled=compileSeven(base,audio),a=document.createElement('script'),h=document.createElement('script');a.id='learning-audio-code';a.textContent=compiled.audio;h.textContent=compiled.hub;
 // Install the listening controller before any module is loaded.
 boot.replaceWith(a,h);
}catch(e){console.error(e);const target=document.getElementById('cards');target.textContent='Unable to initialise the skills app. Check your connection and reload. تعذر فتح التطبيق؛ تحقق من الاتصال وأعد التحميل. '+e.message;}})();}
