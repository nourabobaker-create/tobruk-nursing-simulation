(function(){'use strict';const button=document.getElementById('companion-offline-download');if(!button)return;const status=document.getElementById('companion-offline-status');let busy=false;
const record=stage=>window.PortalMetrics?.record('resource_open','companion-offline-v1:'+stage,'courses');
button.addEventListener('click',async()=>{if(busy)return;busy=true;record('link');let handle=null;try{
// Request the save handle during the user gesture. Cancellation is never completion.
if(window.showSaveFilePicker)handle=await window.showSaveFilePicker({suggestedName:'Rafeeq-Year1-Sem1.html',types:[{description:'HTML',accept:{'text/html':['.html']}}]});
const response=await fetch('offline-year1-sem1.html',{cache:'no-cache',credentials:'omit'});if(!response.ok)throw Error('http');const blob=await response.blob();if(blob.size<10000||!(await blob.slice(0,100).text()).toLowerCase().includes('<!doctype html'))throw Error('invalid');record('bytes');
if(handle){const writer=await handle.createWritable();await writer.write(blob);await writer.close();record('saved');status.textContent='تم حفظ الملف بنجاح. الحفظ لا يثبت استخدامه أو التعلم منه.'}
else{const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Rafeeq-Year1-Sem1.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);status.textContent='وصل الملف كاملًا إلى المتصفح وطُلب حفظه؛ لا يمكن تأكيد الحفظ على الجهاز في هذا المتصفح.'}
}catch(e){status.textContent=e.name==='AbortError'?'أُلغي الحفظ؛ لم يسجّل حفظ مؤكد.':'تعذر التنزيل. حاول مجددًا.'}finally{busy=false}});
})();