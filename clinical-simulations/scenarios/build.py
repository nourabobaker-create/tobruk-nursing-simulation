"""Validate the authored corpus and compile its browser data file (stdlib only)."""
import json,re,collections,pathlib,sys,hashlib
base=pathlib.Path(__file__).resolve().parent
categories=['foundations','paediatrics','orthopaedics','maternity','infection','medical','perioperative','neonatal','cardiac','emergency']
mods=[m for f in sorted((base/'content').glob('*.json')) for m in json.loads(f.read_text())]
assert len(mods)==100, f'Expected 100 topics, found {len(mods)}'
assert len({m['id'] for m in mods})==100,'Duplicate topic IDs'
assert collections.Counter(m['category'] for m in mods)==dict.fromkeys(categories,10),'Each category must have 10 topics'
def bi(v,label):
 assert isinstance(v,dict) and all(isinstance(v.get(l),str) and v[l].strip() for l in ['ar','en']),label
 assert re.search('[\u0600-\u06ff]',v['ar']),label+' Arabic missing'
def step(s,label):
 for k in ['scene','prompt']:bi(s[k],label+':'+k)
 assert len(s['options'])==3,label
 assert sum(o['correct'] is True for o in s['options'])==1,label
 for i,o in enumerate(s['options']):
  assert type(o['correct']) is bool,label
  for k in ['text','feedback']:bi(o[k],f'{label}:{i}:{k}')
for m in mods:
 assert re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*',m['id']),m['id']
 for k in ['title','area','intro']:bi(m[k],m['id']+':'+k)
 assert m['years'] and set(m['years'])<=set([3,4]),m['id']
 for k in ['objectives','debrief']:
  assert len(m[k])>=3,m['id']+':'+k
  for x in m[k]:bi(x,m['id']+':'+k)
 assert len(m['steps'])==6,m['id']
 assert set(m['challenge'])==set(['smooth','recovery']),m['id']
 for i,s in enumerate(m['steps']):step(s,f'{m["id"]}:{i}')
 for k,s in m['challenge'].items():step(s,m['id']+':'+k)
 assert m['challenge']['smooth']['scene']!=m['challenge']['recovery']['scene'],m['id']
 assert len(m['sources'])>=2,m['id']
 for src in m['sources']:
  assert src['url'].startswith('https://'),m['id']
  assert src['accessed']=='2026-10-22',m['id']
  assert src['title'].strip() and src['publisher'].strip(),m['id']
  bi(src['supports'],m['id']+':source')
# Keep the original first topic as the landing example, followed by category groups.
mods.sort(key=lambda m:(categories.index(m['category']),m['id']!='orientation',m['id']))
text='/* Faculty-authored educational scenarios. Rebuild with build.py. */\nwindow.CLINICAL_SCENARIOS = '+json.dumps(mods,ensure_ascii=False,separators=(',',':'))+';\n'
if '--check' in sys.argv:
 assert (base/'data.js').read_text()==text,'data.js needs rebuilding'
else:(base/'data.js').write_text(text)
summary={'version':'20261022-100','topics':len(mods),'categories':10,'core_decisions':600,'adaptive_variants':200,'decisions_per_visit':7,'source_references':sum(len(m['sources']) for m in mods),'unique_sources':len({s['url'] for m in mods for s in m['sources']}),'data_sha256':hashlib.sha256(text.encode()).hexdigest()}
release=json.dumps(summary,ensure_ascii=False,indent=2)+'\n'
if '--check' in sys.argv:
 assert (base/'release.json').read_text()==release,'release.json needs rebuilding'
else:(base/'release.json').write_text(release)
print(json.dumps(summary))
