'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const C=require('./core.js');
function fixture(){const r=C.fresh();r.meta.process='عملية اختبار تقني غير حقيقية';r.meta.unit='جهة اختبار';for(const q of C.QUESTIONS)r.answers[q.id]='yes';return r;}
function evidenced(){const r=fixture();r.evidence=[{id:'E1',title:'شاهد اصطناعي يغطي الأسئلة للتأكد من البرمجة',ref:'TEST-ONLY',version:'1',questions:C.QUESTIONS.map(q=>q.id),review:{status:'accepted',role:'مراجع اختبار',date:C.today(),note:'هذه بيانات اصطناعية لا تمثل تقييم الكلية.'}}];return r;}
function full(){const r=evidenced();r.test={task:'اختبار اصطناعي',role:'منفذ اختبار',authority:'مرجع اختبار غير حقيقي',date:C.today(),result:'independent',reference:'TEST-HO',note:'',newPerson:true};return r;}
test('fresh record is incomplete and contains no answers',()=>{const r=C.fresh(),d=C.assess(r);assert.equal(d.code,'draft');assert.equal(d.answered,0);assert.equal(d.total,16);});
test('yes answers alone never demonstrate sustainability',()=>assert.equal(C.assess(fixture()).code,'verify'));
test('reviewed evidence without handover is insufficient',()=>assert.equal(C.assess(evidenced()).code,'verify'));
test('complete synthetic case passes only all gates',()=>assert.equal(C.assess(full()).code,'sustainable'));
for(const id of ['ownership','access','restore'])test('explicit critical gap dominates: '+id,()=>{const r=full();r.answers[id]='no';assert.equal(C.assess(r).code,'risk');assert.ok(C.assess(r).critical.includes(id));});
test('critical gap is visible even in an otherwise blank form',()=>{const r=C.fresh();r.answers.ownership='no';const d=C.assess(r);assert.equal(d.code,'risk');assert.equal(d.answered,1);});
test('ordinary negative answer causes dependency finding',()=>{const r=full();r.answers.steps='no';assert.equal(C.assess(r).code,'dependent');});
test('two account/deletion failures form a serious combined risk',()=>{const r=full();r.answers.protection='no';r.answers.accounts='no';assert.equal(C.assess(r).code,'risk');});
test('partial critical access is not classified as sustainable',()=>{const r=full();r.answers.access='partial';assert.equal(C.assess(r).code,'dependent');});
test('partial ordinary control remains a weakness',()=>{const r=full();r.answers.maintain='partial';assert.equal(C.assess(r).code,'weakness');});
test('unknown is an answered question, never a success',()=>{const r=full();r.answers.record='unknown';const d=C.assess(r);assert.equal(d.answered,16);assert.equal(d.code,'weakness');});
test('an unanswered question prevents a positive finding',()=>{const r=full();delete r.answers.record;assert.equal(C.assess(r).code,'draft');});
test('missing process owner prevents a positive finding',()=>{const r=full();r.meta.unit=' ';assert.equal(C.assess(r).code,'draft');});
test('a title without a reference or attachment is not evidence',()=>{const r=full();r.evidence[0].ref='';assert.equal(C.assess(r).uncovered.length,16);assert.equal(C.assess(r).code,'verify');});
test('unreviewed attachments do not validate answers',()=>{const r=full();r.evidence[0].review.status='pending';assert.equal(C.assess(r).unreviewed.length,16);assert.equal(C.assess(r).code,'verify');});
test('review needs an explanatory note',()=>{const r=full();r.evidence[0].review.note=' ';assert.equal(C.assess(r).code,'verify');});
test('review dates cannot be in the future',()=>{const r=full();r.evidence[0].review.date='2999-01-01';assert.equal(C.assess(r).code,'verify');});
test('invalid calendar dates are rejected',()=>{assert.equal(C.validDate('2026-02-30'),false);assert.equal(C.validDate('2026-02-28'),true);assert.equal(C.validDate('2024-02-29'),true);assert.equal(C.validDate('2026-02-29'),false);});
test('a future handover does not count as completed',()=>{const r=full();r.test.date='2999-01-01';assert.equal(C.assess(r).testValid,false);assert.equal(C.assess(r).code,'verify');});
test('independent test requires a person not involved in building the process',()=>{const r=full();r.test.newPerson=false;assert.equal(C.assess(r).code,'verify');});
test('a job label alone does not establish authority',()=>{const r=full();r.test.authority='';assert.equal(C.assess(r).testValid,false);assert.equal(C.assess(r).code,'verify');});
test('a failed handover remains an operational gap',()=>{const r=full();r.test.result='blocked';assert.equal(C.assess(r).code,'dependent');});
test('limited help yields a weakness rather than independent success',()=>{const r=full();r.test.result='limited';assert.equal(C.assess(r).code,'weakness');});
test('marking actions submitted cannot change the diagnosis',()=>{const r=full();r.answers.steps='no';r.actions['q-steps']={status:'submitted',reference:'TEST'};assert.equal(C.assess(r).code,'dependent');});
test('a shared evidence item covers multiple questions without duplicate uploads',()=>{const r=full();assert.equal(r.evidence.length,1);assert.equal(C.assess(r).uncovered.length,0);});
test('a linked retest starts blank and preserves the previous record',()=>{const old=full(),r=C.fresh(old.id);assert.equal(r.previousId,old.id);assert.notEqual(r.id,old.id);assert.deepEqual(r.answers,{});assert.equal(C.assess(old).code,'sustainable');});
test('import creates a new record and resets reviews',()=>{const old=full(),r=C.cleanRecord(old);assert.notEqual(r.id,old.id);assert.equal(r.evidence[0].review.status,'pending');assert.equal(C.assess(r).code,'verify');});
test('import ignores arbitrary keys and invalid answers',()=>{const src=full();src.answers.ownership='__proto__';src.actions.evil={status:'approved'};src.isAdmin=true;const r=C.cleanRecord(src);assert.equal(r.answers.ownership,undefined);assert.equal(r.actions.evil,undefined);assert.equal(r.isAdmin,undefined);});
test('import refuses invalid outer structure',()=>{assert.throws(()=>C.cleanRecord(null));assert.throws(()=>C.cleanRecord({}));assert.throws(()=>C.cleanRecord({meta:{},evidence:new Array(81).fill({})}));});
test('all rule results are explicitly provisional',()=>{for(const r of [C.fresh(),fixture(),evidenced(),full()])assert.equal(C.assess(r).provisional,true);});
