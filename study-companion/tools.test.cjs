const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const T=require('./tools-core.js');
const root=path.resolve(__dirname,'..');
const ctx={window:{RafeqText:T},URL,TextEncoder,document:{currentScript:{src:'https://example.org/study-companion/qa-engine.js'}}};
for(const file of ['study-companion/qa-corpus.js','english-ii/course-data.js','study-companion/qa-engine.js'])vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);
const corpus=ctx.window.RAFEQ_CORPUS,api=ctx.window.RafeqQA;

test('all 50 courses have usable passages and unknown queries do not produce an answer',()=>{
 assert.equal(corpus.length,50);
 for(const c of corpus){const entries=api.entriesFor(c,'ar',null,null);assert(entries.length>0,c.id);assert.equal(T.search(entries,'zxqvzzzzaaa').length,0,c.id);}
});
test('asking about another course cannot escape the open course',()=>{
 const response=api.answer('Explain pharmacokinetics',{lang:'en',currentCourseId:'micro'});
 assert.equal(response.course.id,'micro');assert.equal(response.passages.length,0);
 assert.equal(api.answer('Explain homeostasis',{lang:'en'}).course,undefined);
});
test('ordinary Arabic and English searches retrieve the same relevant microbiology concept',()=>{
 const c=corpus.find(c=>c.id==='micro'),entries=api.entriesFor(c,'ar',null,null);
 assert.match(T.search(entries,'ما الفرق بين التعقيم والتطهير؟')[0].title,/التعقيم/);
 assert.match(T.search(entries,'sterilization and disinfection')[0].text,/التعقيم|[Ss]teril/);
});
test('English II has actual lesson text and correct activity keys, without undefined fragments',()=>{
 const c=corpus.find(c=>c.id==='english2'),entries=api.entriesFor(c,'en',null,null);
 assert(entries.length>100);assert(T.search(entries,'exudate').length>0);
 for(const lesson of ctx.window.ENGLISH2_DATA.lessons){
  const subset=api.entriesFor(c,'en',null,lesson);assert(subset.length>10,lesson.id);
  assert(subset.some(e=>e.kind==='activity'));
  assert(subset.every(e=>!e.text.includes('undefined')),lesson.id);
  const scenario=subset.find(e=>e.question===lesson.scenario.body);
  assert(scenario.text.includes(lesson.scenario.choices[lesson.scenario.a]));
 }
});
test('extractive summary adds no words or numbers and keeps source order',()=>{
 const text='The dose is 10 mg. The nurse checks the dose and route. The route is documented. The nurse checks the patient. Do not assume a missing value.';
 const parts=T.summarize(text,3);assert.equal(parts.length,3);
 assert(parts.every(p=>text.includes(p)));
 assert(parts.map(p=>text.indexOf(p)).every((v,i,a)=>!i||v>a[i-1]));
});
test('short text is preserved and never turned into a fabricated explanation',()=>{
 assert.deepEqual(T.summarize('سجّل القيمة كما هي: 120/80 mmHg.'),['سجّل القيمة كما هي: 120/80 mmHg.']);
});
test('reference comparison flags negation and numerical changes without a correctness verdict',()=>{
 const result=T.review('Sterilisation does not eliminate spores. Dose: 100 mg.','Sterilisation eliminates spores. Dose: 10 mg.');
 assert.equal(result.negation,true);assert(result.missingNumbers.some(n=>n.includes('10')));
 for(const key of ['grade','score','correct','passed'])assert.equal(result[key],undefined);
});
test('different vocabulary is shown for review rather than marked wrong',()=>{
 const result=T.review('the organism is removed','التعقيم يزيل الأبواغ.');
 assert.equal(result.correct,undefined);assert.equal(result.ideas.length,1);
});
test('UTF-8 chunks preserve Arabic, whitespace and emoji within the API byte limit',()=>{
 const original=('النص الدراسي مع أرقام 123 ورموز 🩺.\n').repeat(90);
 const chunks=T.splitUtf8(original,450);
 assert.equal(chunks.join(''),original);assert(chunks.every(c=>Buffer.byteLength(c,'utf8')<=450));
});
test('course-to-Library mapping has 50 unambiguous courses and all 600 topics with valid resource IDs',()=>{
 const index=JSON.parse(fs.readFileSync(path.join(__dirname,'course-sources.json')));
 assert.equal(index.full_text_imported,false);assert.equal(Object.keys(index.courses).length,50);
 assert.equal(Object.values(index.courses).reduce((n,c)=>n+c.modules.length,0),600);
 assert.equal(new Set(Object.values(index.courses).map(c=>c.library_id)).size,50);
 for(const c of Object.values(index.courses))for(const m of c.modules){
  assert(m.resource_ids.length>0,m.title_ar);
  for(const id of m.resource_ids)assert(index.resources[id],id);
  for(const e of m.evidence){assert(index.resources[e.resource_id]);assert(e.coverage_limits_ar);}
 }
});
test('all ten course pages load the new engine after its dependencies and contain no floating chatbot',()=>{
 const files=fs.readdirSync(__dirname).filter(f=>f.endsWith('.html'));assert.equal(files.length,10);
 for(const file of files){const html=fs.readFileSync(path.join(__dirname,file),'utf8');
  assert(html.indexOf('tools-core.js?v=20261012-1')<html.indexOf('qa-engine.js?v=20261012-1'),file);
  assert(html.includes('companion.css?v=20261012-1'),file);
  assert(!html.includes('id="chatLauncher"'),file);assert(!html.includes('id="chatbox"'),file);
 }
});
test('English II service worker ignores all third-party requests and preserves other application caches',()=>{
 const sw=fs.readFileSync(path.join(root,'english-ii/sw.js'),'utf8');
 assert(sw.includes("url.origin!==self.location.origin||!ALLOWED.has(url.pathname)"));
 assert(sw.includes("k.startsWith('tobruk-english2-five-lessons-')"));
});
