"""Apply a narrow, checksum-verified educational release. Never handles student responses."""
from pathlib import Path
import base64, hashlib, json, zlib
root=Path('.')
release=json.loads((root/'.github/clinical-discovery-release.json').read_text())
raw=zlib.decompress(base64.b64decode(''.join(release['payload']),validate=True))
assert hashlib.sha256(raw).hexdigest()==release['sha256'],'Release checksum mismatch'
files=json.loads(raw)
allowed={'clinical-discovery/index.html','clinical-discovery/style.css','clinical-discovery/app.js','clinical-discovery/content.js','clinical-discovery/README.md','hub-feedback/config.js','hub-feedback/feedback.js'}
assert set(files)==allowed,'Unexpected release paths'
p=root/'student-learning-hub/index.html';original=p.read_bytes();s=original.decode('utf-8')
if 'id="clinical-discovery-card"' not in s:
    expected=release['expected_student_blob']
    actual=hashlib.sha1(b'blob '+str(len(original)).encode()+b'\0'+original).hexdigest()
    assert actual==expected,'Student hub changed since review; re-read before applying'
    anchor='<div class="grid3">'
    assert anchor in s,'Home-card anchor missing'
    card='''
  <article class="card" id="clinical-discovery-card">
   <div class="icon">🔎</div><h2><span class="discovery-ar">اكتشف بثقة</span><span class="discovery-en">Discover with confidence</span></h2>
   <p><span class="discovery-ar">معرفة عامة للتعرّف على الأدوات والأجهزة والأدوية والسجلات، والسؤال بثقة. هذا القسم غير مرتبط بمقرر أو امتحان.</span><span class="discovery-en">Get familiar with clinical items, devices, medication handling and charts. General knowledge, not linked to a course or exam.</span></p>
   <div class="actions"><a class="btn primary" href="../clinical-discovery/"><span class="discovery-ar">ابدأ الاكتشاف</span><span class="discovery-en">Start exploring</span></a></div>
  </article>'''
    s=s.replace(anchor,anchor+card,1)
    css='''<style id="clinical-discovery-entry-style">
html[lang="en"] .discovery-ar{display:none!important}
html:not([lang="en"]) .discovery-en{display:none!important}
</style>\n'''
    assert s.count('</head>')==1 and s.count('</body>')==1,'Unexpected document structure'
    s=s.replace('</head>',css+'</head>',1)
    quick='<div class="quickPortalLinks" id="quickPortalLinks">'
    assert quick in s,'Quick links anchor missing'
    s=s.replace(quick,quick+'\n  <a href="../clinical-discovery/" id="clinical-discovery-shortcut"><span class="discovery-ar">🔎 اكتشف بثقة</span><span class="discovery-en">🔎 Discover with confidence</span></a>',1)
    footer='''
<div class="hub-feedback-global" data-hub-page-feedback data-feedback-topic="student-hub" data-feedback-part="page"></div>
<script defer src="../hub-feedback/config.js?v=20261009-1"></script>
<script defer src="../hub-feedback/feedback.js?v=20261009-1"></script>
'''
    s=s.replace('</body>',footer+'</body>',1)
for name,text in files.items():
    assert isinstance(text,str) and len(text.encode())<100000,'Unexpected file size'
    q=root/name
    if q.exists() and q.read_text()!=text:
        assert 'id="clinical-discovery-card"' in original.decode(),'Refusing to overwrite a pre-existing unrelated file'
for name,text in files.items():
    q=root/name;q.parent.mkdir(parents=True,exist_ok=True);q.write_text(text,encoding='utf-8')
p.write_text(s,encoding='utf-8')
assert s.count('id="clinical-discovery-card"')==1
print('Applied seven educational files and a scoped student-hub entry. No response data stored.')
