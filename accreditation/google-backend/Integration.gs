// Institutional quality integration. Configure IDs only in Script Properties.
const QI={ims:'IMS_SPREADSHEET_ID',inbox:'INBOX_FOLDER_ID',
 surveys:[
 ['SUR-001','SURVEY_STRATEGIC_SHEET_ID'],['SUR-002','SURVEY_ENV_SHEET_ID'],
 ['SUR-003','SURVEY_ALUMNI_SHEET_ID'],['SUR-COM-001','SURVEY_COMPLAINTS_SHEET_ID'],
 ['SUR-CLN-001','SURVEY_CLINICAL_SHEET_ID'],['SUR-IDEA-001','SURVEY_IDEAS_SHEET_ID']
 ]};

function qiProp_(n){const v=String(PropertiesService.getScriptProperties().getProperty(n)||'').trim();if(!v)throw Error('Missing Script Property: '+n);return v}
function qiIms_(){return SpreadsheetApp.openById(qiProp_(QI.ims))}
function qiHeaders_(s){return s.getRange(1,1,1,s.getLastColumn()).getDisplayValues()[0].map(String)}
function qiCol_(h,n){const i=h.indexOf(n);if(i<0)throw Error('Missing column: '+n);return i}
function qiAppend_(s,o){const h=qiHeaders_(s);s.appendRow(h.map(k=>Object.prototype.hasOwnProperty.call(o,k)?o[k]:''))}
function qiUpdate_(s,keyHeader,key,changes){const h=qiHeaders_(s),c=qiCol_(h,keyHeader),n=s.getLastRow();if(n<2)return;const a=s.getRange(2,c+1,n-1,1).getDisplayValues().flat(),p=a.indexOf(key);if(p<0)return;Object.entries(changes).forEach(([k,v])=>s.getRange(p+2,qiCol_(h,k)+1).setValue(v))}
function qiSurveyById_(id){const p=PropertiesService.getScriptProperties();for(const [key,prop] of QI.surveys){if(String(p.getProperty(prop)||'').trim()===id)return key}return ''}
function qiAffected_(key){return ({'SUR-001':['الخطة الاستراتيجية؛ الدراسة الذاتية؛ سجل الاعتماد','1، 9'],'SUR-002':['خدمة المجتمع؛ الخطة الاستراتيجية؛ التحسين','8، 9'],'SUR-003':['البرنامج؛ الخريجون؛ التحسين؛ الدراسة الذاتية','4، 5، 9'],'SUR-COM-001':['الشكاوى؛ التحسين عند الحاجة','5، 9'],'SUR-CLN-001':['التدريب السريري؛ البرنامج؛ التحسين','4، 6، 9'],'SUR-IDEA-001':['خطة التحسين أو خطة التفعيل بعد المراجعة','حسب الموضوع']})[key]||['يحدد بعد المراجعة','حسب الموضوع']}

function verifyIntegrationSetup(){
 const ims=qiIms_();['28_الاستبانات','39_سجل_الوارد_والفرز','40_سجل_التحديثات_والأثر','42_التقويم_والتنبيهات','43_تكامل_الاستبانات','44_خريطة_الأنظمة_الإلكترونية'].forEach(n=>{if(!ims.getSheetByName(n))throw Error('Missing sheet: '+n)});
 DriveApp.getFolderById(qiProp_(QI.inbox)).getName();
 const p=PropertiesService.getScriptProperties(),surveys=[];
 QI.surveys.forEach(([key,prop])=>{const id=String(p.getProperty(prop)||'').trim();if(!id){surveys.push({key,configured:false});return}const sh=SpreadsheetApp.openById(id).getSheetByName('Form Responses 1');if(!sh)throw Error('No Form Responses 1: '+key);surveys.push({key,configured:true,rows:Math.max(0,sh.getLastRow()-1)})});
 return {ok:true,surveys};
}

function installIntegrationTriggers(){
 verifyIntegrationSetup();const names=new Set(['qualityOnFormSubmit_','qualityHourlySync_','qualityDailySync_']);
 ScriptApp.getProjectTriggers().forEach(t=>{if(names.has(t.getHandlerFunction()))ScriptApp.deleteTrigger(t)});
 const p=PropertiesService.getScriptProperties();QI.surveys.forEach(([k,prop])=>{const id=String(p.getProperty(prop)||'').trim();if(id)ScriptApp.newTrigger('qualityOnFormSubmit_').forSpreadsheet(id).onFormSubmit().create()});
 ScriptApp.newTrigger('qualityHourlySync_').timeBased().everyHours(1).create();
 ScriptApp.newTrigger('qualityDailySync_').timeBased().everyDays(1).atHour(7).create();
 return {ok:true};
}

function qualityOnFormSubmit_(e){
 const id=e&&e.source&&e.source.getId?e.source.getId():'';const key=qiSurveyById_(id);if(!key)return;
 qiSyncSurvey_(key,id);const a=qiAffected_(key);
 qiLogUpdate_('مشاركة استبانة جديدة','وصل رد جديد إلى '+key,'Google Forms / Response Sheet',a[0],a[1],'يحتاج مراجعة الجودة؛ لا يعتمد الرد الخام كشاهد ولا ينشر تلقائيًا','تحديث العداد ومراجعة الحاجة إلى التحليل/الاستجابة');
}
function qualityHourlySync_(){qiSyncSurveys_();qiScanInbox_()}
function qualityDailySync_(){qiSyncSurveys_();qiScanInbox_();qiSyncCalendar_()}
function qiSyncSurveys_(){const p=PropertiesService.getScriptProperties();QI.surveys.forEach(([k,prop])=>{const id=String(p.getProperty(prop)||'').trim();if(id)qiSyncSurvey_(k,id)})}
function qiSyncSurvey_(key,id){
 const sh=SpreadsheetApp.openById(id).getSheetByName('Form Responses 1'),count=Math.max(0,sh.getLastRow()-1);let last='';
 if(count){const v=sh.getRange(sh.getLastRow(),1).getValue();last=v instanceof Date?Utilities.formatDate(v,'Africa/Tripoli','yyyy-MM-dd HH:mm:ss'):String(v||'')}
 const ims=qiIms_();qiUpdate_(ims.getSheetByName('43_تكامل_الاستبانات'),'معرف',key,{'عدد الردود الحالي':count,'آخر رد':last,'الحالة':'مصدر حي متحقق'});
 if(/^SUR-00[1-5]$/.test(key))qiUpdate_(ims.getSheetByName('28_الاستبانات'),'معرف',key,{'عدد المستجيبين':count});
}
function qiScanInbox_(){
 const f=DriveApp.getFolderById(qiProp_(QI.inbox)),s=qiIms_().getSheetByName('39_سجل_الوارد_والفرز'),h=qiHeaders_(s),c=qiCol_(h,'معرف الوارد'),known=new Set(s.getLastRow()>1?s.getRange(2,c+1,s.getLastRow()-1,1).getDisplayValues().flat():[]),it=f.getFiles();
 while(it.hasNext()){const x=it.next(),key='DRV-'+x.getId();if(known.has(key))continue;qiAppend_(s,{'معرف الوارد':key,'تاريخ الرفع':Utilities.formatDate(x.getDateCreated(),'Africa/Tripoli','yyyy-MM-dd HH:mm:ss'),'الاسم الأصلي':x.getName(),'نوع الملف':x.getMimeType(),'الرمز المقترح':'يحدد بعد قراءة الملف','الاسم القياسي بعد المراجعة':'بانتظار مراجعة الجودة','المعيار/المعايير':'بانتظار المطابقة','مجلد الوجهة':'بانتظار التصنيف','حالة المراجعة':'بانتظار مراجعة الجودة','حالة الشاهد':'مرشح فقط','تحديث المنظومة/ملاحظات':'رابط الملف: '+x.getUrl()});qiLogUpdate_('ملف جديد في وارد Drive','ملف جديد: '+x.getName(),x.getUrl(),'يحدد بعد قراءة المحتوى','بانتظار المطابقة','بانتظار تقييم الجودة','قراءة ← تصنيف ← ترميز ← إصدار/نقل ← ربط')}
}
function qiLogUpdate_(trigger,change,source,affected,criteria,impact,action){
 qiAppend_(qiIms_().getSheetByName('40_سجل_التحديثات_والأثر'),{'معرف التحديث':'UPD-'+Utilities.formatDate(new Date(),'Africa/Tripoli','yyyyMMdd-HHmmss')+'-'+Utilities.getUuid().slice(0,8),'تاريخ الرصد':Utilities.formatDate(new Date(),'Africa/Tripoli','yyyy-MM-dd HH:mm:ss'),'نوع المحفز':trigger,'العنصر الجديد/التغيير':change,'المصدر':source,'الوثائق/الخطط المتأثرة':affected,'المعايير/المؤشرات المتأثرة':criteria,'تقييم الأثر':impact,'الإجراء المطلوب':action,'مالك المراجعة':'قسم ضمان الجودة وتقييم الأداء','حالة مراجعة الجودة':'بانتظار مراجعة الجودة','قرار الاعتماد/الاستبدال':'لا استبدال قبل المراجعة'});
}
function qiDate_(v){if(v instanceof Date&&!isNaN(v))return new Date(v.getFullYear(),v.getMonth(),v.getDate());const m=String(v||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);return m?new Date(+m[1],+m[2]-1,+m[3]):null}
function qiSyncCalendar_(){
 const s=qiIms_().getSheetByName('42_التقويم_والتنبيهات'),v=s.getDataRange().getValues(),h=v[0].map(String),i=n=>h.indexOf(n),cal=CalendarApp.getDefaultCalendar();
 for(let r=1;r<v.length;r++){const row=v[r],key=String(row[i('معرف')]||'');if(!/^CAL-\d+$/.test(key))continue;const st=qiDate_(row[i('تاريخ البداية')]),du=qiDate_(row[i('تاريخ الاستحقاق')]);if(!st||!du)continue;let id=String(row[i('Calendar Event ID')]||''),ev=null;if(id){try{ev=cal.getEventById(id)}catch(e){}}const title='[الجودة] '+String(row[i('المهمة/الموعد')]||key),desc='المرجع: '+key+'\nالمصدر: '+String(row[i('المصدر')]||'')+'\nالمالك: '+String(row[i('المالك')]||'');if(!ev){ev=cal.createAllDayEvent(title,st,new Date(du.getTime()+86400000),{description:desc});s.getRange(r+1,i('Calendar Event ID')+1).setValue(ev.getId());s.getRange(r+1,i('حالة الربط')+1).setValue('مرتبط')}else{ev.setTitle(title);ev.setDescription(desc)}}
}

/** Bootstrap: after setting IMS_SPREADSHEET_ID once, read the restricted config sheet and load the remaining Script Properties. */
function bootstrapIntegrationFromIms(){
 const ims=qiIms_(),s=ims.getSheetByName('46_إعدادات_التكامل_المقيدة');if(!s)throw Error('Missing sheet: 46_إعدادات_التكامل_المقيدة');
 const v=s.getDataRange().getDisplayValues(),h=v[0],pk=h.indexOf('Script Property'),pv=h.indexOf('القيمة/الحالة'),ps=h.indexOf('حالة الإعداد');
 if(pk<0||pv<0)throw Error('Invalid integration settings sheet');
 const out={};for(let r=1;r<v.length;r++){const k=String(v[r][pk]||'').trim(),val=String(v[r][pv]||'').trim(),state=ps>=0?String(v[r][ps]||''):'';if(!k||!val||/^بانتظار/.test(val)||/غير جاهز/.test(state))continue;out[k]=val}
 PropertiesService.getScriptProperties().setProperties(out,false);
 return {ok:true,loaded:Object.keys(out)};
}
