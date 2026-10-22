/* Bounded activity hooks; never read or send answer text, search text or scores. */
(function(){
'use strict';
// A document.write loader replaces its document. Rebind to the rendered lesson,
// but never install a second handler on the same document root.
if(window.PortalMetricsActivityRoot===document.documentElement)return;
window.PortalMetricsActivityRoot=document.documentElement;
const seen=new Set();
// These are fixed UI controls, not answer values or state snapshots. Reaching a
// debrief finishes a learning attempt; it does not mean a full procedure was
// performed, a patient improved, or a clinical competency was demonstrated.
const advanced={
 '01-cpr':{start:'[data-action="start-guided"],[data-action="start-challenge"]',end:['#stepContent [data-action="quiz-start"]','#stepContent [data-action="export"]']},
 '02-choking':{start:'[data-action="start"]',end:['#stepContent [data-action="newPath"]','#stepContent [data-action="export"]']},
 '03-ecg':{start:'#start-guided,#start-challenge,#start-quick',end:['#controls #export','#controls #review-quiz']},
 '04-ngt-insertion':{start:'[data-action="guided"],[data-action="challenge"],[data-action="quick"]',end:['#content [data-action="downloadText"]','#content [data-action="downloadJSON"]']},
 '05-ngt-removal':{start:'[data-action="start"],[data-action="quick"]',end:['#content [data-action="downloadText"]','#content [data-action="newCase"]']},
 '06-blood-extraction':{start:'[data-action="start"],[data-action="quick"]',end:['#content [data-action="downloadText"]','#content [data-action="downloadJSON"]']},
 '07-catheterization':{start:'[data-action="start"],[data-action="quick"]',end:['#content [data-action="downloadTxt"]','#content [data-action="downloadJson"]']},
 '08-bandaging':{start:'[data-action="start"][data-value="full"],[data-action="start"][data-value="practice"]',end:['#stepContent [data-action="export"]','#stepContent [data-action="demoMenu"]']},
 '09-nebulization':{start:'[data-action="start"][data-value="full"],[data-action="start"][data-value="quick"]',end:['#content [data-action="export"]','#content [data-action="reset"]']},
 '10-gown-diaper':{start:'[data-act="start"],[data-act="quick"]',end:['#content [data-act="exportTXT"]','#content [data-act="exportJSON"]']}
};
const legacy=[
 ['handwash-learning-03/','handwashing','#startPractice,#startSelftest,#newQuiz',['#writtenView #newQuiz','#writtenView #reflectionAnswer']],
 ['nursing-skills/gloving.html','gloving','#practice,#testQuiz,#fullQuiz',['#written #fullQuiz','#written #reflect']],
 ['range-of-motion-learning-01/','range-of-motion','#startPractice,#startTest,#newQuiz',['#content #newQuiz','#content #reflection']],
 ['body-mechanics-learning-01/','body-mechanics','#practiceQuiz,#selfQuiz,#newQuiz',['#content #newQuiz','#content #reflectionAnswer']],
 ['turning-moving-learning-01/','turning-moving','#practiceQuiz,#selfQuiz,#newQuiz',['#content #newQuiz','#content #reflectionAnswer']],
 ['patient-positioning-learning-01/','patient-positioning','#practiceQuiz,#selfQuiz,#newQuiz',['#content #newQuiz','#content #reflectionAnswer']],
 ['wound-dressing-learning-01/','wound-dressing','#quizPractice,#quizIndependent,#newQuiz',['#content .reviewPanel','#content #newQuiz']]
];
const path=location.pathname;
const advancedMatch=path.match(/\/clinical-simulations\/modules\/([a-z0-9-]+)\.html$/);
let unit=null;
if(advancedMatch&&advanced[advancedMatch[1]])unit={...advanced[advancedMatch[1]],item:'simulation:advanced:'+advancedMatch[1]+':practice-review'};
if(!unit){const entry=legacy.find(([route])=>path.endsWith('/'+route)||path.endsWith('/'+route+'index.html'));if(entry)unit={start:entry[2],end:entry[3],item:'simulation:legacy:'+entry[1]+':knowledge-review'};}
let acceptedStart=false;
function visible(el){if(!el||el.hidden||el.closest?.('[hidden]'))return false;return !!el.getClientRects?.().length;}
function completedUnit(){
 if(!unit||!acceptedStart||seen.has('complete:'+unit.item))return;
 if(!unit.end.every(selector=>visible(document.querySelector(selector))))return;
 if(window.PortalMetrics?.record('activity_complete',unit.item,'simulations'))seen.add('complete:'+unit.item);
}
// Observe only structural UI transitions. Never inspect textContent, form
// values, score elements, exported records, or the simulations' state APIs.
if(unit&&typeof MutationObserver==='function')new MutationObserver(completedUnit).observe(document.documentElement,{subtree:true,childList:true});
document.addEventListener('click',function(e){
 const api=window.PortalMetrics;if(!api)return;
 const el=e.target.closest?.('button');if(!el||el.disabled)return;
 if(unit&&visible(el)&&el.matches(unit.start)){
  // Opting in halfway through an older attempt does not backfill its start.
  // A completion is emitted only for a start actually accepted by the tracker.
  if(!seen.has('start:'+unit.item)&&api.record('activity_start',unit.item,'simulations'))seen.add('start:'+unit.item);
  acceptedStart=seen.has('start:'+unit.item);
 }
 if(path.includes('/clinical-discovery/')&&el.hasAttribute('data-field')){
  if(!/^\d{1,3}$/.test(el.dataset.field))return;
  const item='atlas:field'+el.dataset.field;
  if(!seen.has(item)&&api.record('activity_start',item,'atlas'))seen.add(item);
 }
 if(path.includes('/english-ii/')){
  const lesson=location.hash.slice(1);if(!window.ENGLISH2_DATA?.lessons?.some(l=>l.id===lesson))return;
  let suffix='';
  if(el.matches('.checkQ')&&document.querySelector('input[name="'+lesson+'q'+Number(el.dataset.i)+'"]:checked'))suffix='q'+Number(el.dataset.i);
  if(el.matches('.checkScenario')&&document.querySelector('input[name="'+lesson+'scenario"]:checked'))suffix='scenario';
  if(!suffix)return;
  const item='english-ii:'+lesson+':'+suffix;
  if(!seen.has(item)&&api.record('activity_start',item,'courses'))seen.add(item);
 }
},true);
})();
