'use strict';
// Assemble the source-mapped lesson around a pinned, local copy of the tested learning engine.
function compileTurning(compact,strings,base,patches,addon){
 const B=(en,ar)=>[en,ar];
 const topics=compact.rows.map((r,i)=>({id:'s'+(i+1),group:i<7?0:i<13?1:2,title:r[0],actions:r[1],source:r[2],why:r[3],cue:r[4],extra:compact.extras[r[5]],refs:r[6],sourceWhy:'No rationale is supplied for this step in either source sheet.',count:[5,11,14,16].includes(i),concept:i,controls:[{id:'action',label:r[7],initial:-1,options:[B('Choose…','اختر…'),...r[8]],good:[r[9]+1],reason:r[3]}]}));
 const questions=compact.rows.map((r,i)=>({id:'q'+(i+1),topic:i,stem:B('For source step '+(i+1)+' — '+r[0][0].toLowerCase()+' — which choice matches this learning example?','في خطوة المصدر '+(i+1)+' — '+r[0][1]+' — أي اختيار يوافق هذا المثال التعليمي؟'),options:r[8],correct:r[9],why:r[8].map((_,j)=>j===r[9]?B(r[3][0]+' '+r[4][0],r[3][1]+' '+r[4][1]):B('This choice does not match the indicated step. The required distinction is: '+r[1][0],'هذا الاختيار لا يطابق الخطوة المحددة. التمييز المطلوب: '+r[1][1])),basis:i===8?'clarification':'source'})).concat(compact.additional);
 const data={source:compact.source,refs:compact.refs,topics,questions,groups:compact.groups,ranges:compact.ranges};
 if(topics.length!==17||questions.length!==24||questions[19].correct!==1)throw Error('Incomplete or mismatched learning content');
 if(!base.includes('window.BM_DATA')||!base.includes('const conceptIDs=[2,5,7,10,14,17,18];'))throw Error('Learning engine version mismatch');
 let engine=base.replace(';\nlet lang',';\nconst TMStrings='+JSON.stringify(strings)+';for(const [key,pair] of Object.entries(TMStrings)){W.en[key]=pair[0];W.ar[key]=pair[1];}\nlet lang');
 for(const [before,after] of patches)engine=engine.split(before).join(after);
 const init='logos();render();requestAnimationFrame(tick);';
 if(!engine.includes(init)||!engine.includes('function renderCore()')||!engine.includes('function updateCore()'))throw Error('Could not initialise learning engine');
 engine=engine.replace(init,addon+'\n'+init);
 return {data,code:'window.TM_DATA='+JSON.stringify(data)+';\n'+engine};
}
if(typeof module!=='undefined'&&module.exports)module.exports=compileTurning;
else{
 const bootScript=document.currentScript;
 (async()=>{
  const get=async name=>{const response=await fetch(new URL(name,document.baseURI));if(!response.ok)throw Error(name+' ('+response.status+')');return response.text();};
  try{
   const [compact,strings,base,patches,addon]=await Promise.all(['compact.json','strings.json','engine-base.js','patches.json','addon.js'].map(get));
   const built=compileTurning(JSON.parse(compact),JSON.parse(strings),base,JSON.parse(patches),addon);
   const ready=document.createElement('script');ready.textContent=built.code;
   // The offline exporter captures the compiled inline script, not this network loader.
   bootScript.replaceWith(ready);
  }catch(error){
   console.error(error);const box=document.getElementById('content');
   if(box){box.textContent='Unable to open the lesson. Check the connection and reload. تعذر فتح الدرس؛ تحقق من الاتصال وأعد التحميل. '+error.message;const button=document.createElement('button');button.textContent='Reload · إعادة التحميل';button.onclick=()=>location.reload();box.append(button);}
  }
 })();
}
