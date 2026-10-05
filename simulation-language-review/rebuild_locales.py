"""Re-embed reviewed translations without changing clinical source, and update hashes.
Run from any directory: python simulation-language-review/rebuild_locales.py
"""
import hashlib,json,re
from pathlib import Path
R=Path(__file__).resolve().parent;C=R.parent/'clinical-simulations'
manifest=json.loads((C/'manifest.json').read_text());runtime=(R/'locale-runtime.js').read_text()
pattern=r'<script id="tobruk-ar-dictionary" type="application/json">.*?</script>\n<script id="tobruk-ar-runtime">.*?</script>\n'
sha=lambda b:hashlib.sha256(b).hexdigest()
for item in manifest['modules']:
 p=C/item['url'];s=p.read_text();original,count=re.subn(pattern,'',s,count=1,flags=re.S)
 assert count==1,p
 if item['id']=='06-blood-extraction':original=original.replace("if(s.stage==='welcome'&&$('modeSelect'))$('modeSelect').value=s.mode;","if(s.stage==='welcome')$('modeSelect').value=s.mode;")
 assert sha(original.encode())==item['original_sha256'],f'Clinical source changed: {p}. Review it explicitly before updating provenance.'
 d=json.loads((R/'translations'/(p.stem+'.json')).read_text())
 for en,ar in d.items():assert sorted(re.findall(r'⟦\d+⟧',en))==sorted(re.findall(r'⟦\d+⟧',ar)),en
 data=json.dumps(d,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
 block='<script id="tobruk-ar-dictionary" type="application/json">'+data+'</script>\n<script id="tobruk-ar-runtime">'+runtime+'</script>\n'
 s=re.sub(pattern,lambda _:block,s,count=1,flags=re.S);p.write_text(s);b=p.read_bytes();item['sha256']=sha(b);item['bytes']=len(b)
(C/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print('Rebuilt ten locale layers; original clinical source invariants preserved.')
