"""Apply the requested Faculty Hub identity/entry update without rebuilding its content.
Source: faculty technical report on logo proposals, 23 December 2025,
section 'الدلالات الرمزية لعناصر الشعار (ملخص مهني)'.
Only the four documented symbol meanings are published; no approval or colour
symbolism is inferred. Original logo bytes and all learning modules are preserved.
"""
from pathlib import Path
from html.parser import HTMLParser
from html import escape
import base64
import re

ROOT = Path(__file__).resolve().parents[1]
VERSION = '20261005-identity-1'
root_file = ROOT / 'index.html'
student_file = ROOT / 'student-learning-hub/index.html'
root = root_file.read_text(encoding='utf-8')
student = student_file.read_text(encoding='utf-8')
if 'name="faculty-hub-identity-version"' in root:
    print('Identity update already applied; existing content left unchanged.')
    raise SystemExit(0)
assert 'id="heroTitle"' in root and 'id="about"' in root
assert 'بوابة الطالب' in student and '<head>' in student

class LogoParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.logos = {}
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == 'img' and d.get('id') in ('facultyLogo', 'uniLogo'):
            self.logos[d['id']] = d.get('src', '')

parser = LogoParser()
parser.feed(student)
brand = ROOT / 'hub-branding'
brand.mkdir(exist_ok=True)
logo_paths = {}
for identity, basename in [('facultyLogo', 'faculty-logo'), ('uniLogo', 'university-logo')]:
    src = parser.logos.get(identity, '')
    match = re.fullmatch(r'data:image/(png|jpeg|jpg|webp);base64,(.+)', src, flags=re.S)
    assert match, f'Expected the existing embedded original logo: {identity}'
    ext = 'jpg' if match.group(1) in ('jpg', 'jpeg') else match.group(1)
    data = base64.b64decode(match.group(2), validate=True)
    assert len(data) > 1000, f'Unexpected logo size: {identity}'
    logo_path = f'hub-branding/{basename}.{ext}'
    (ROOT / logo_path).write_bytes(data)
    logo_paths[identity] = logo_path
    print('Preserved original logo:', logo_path, len(data), 'bytes')

css = '''
/* Faculty identity, 20261005: original artwork; four source-based meanings. */
.identity-ar,.identity-en{unicode-bidi:plaintext}
html[lang="en"] .identity-ar{display:none!important}
html:not([lang="en"]) .identity-en{display:none!important}
.identitySection{scroll-margin-top:160px}
.identityShell{display:grid;grid-template-columns:minmax(210px,.85fr) minmax(0,2fr);gap:26px;background:#fff;border:1px solid var(--line);border-top:4px solid var(--gold);border-radius:26px;padding:28px;box-shadow:var(--shadow)}
.identityFigure{margin:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;min-width:0}
.identityFigure img{display:block;width:min(100%,260px);height:auto;aspect-ratio:1;object-fit:contain}
.identityFigure figcaption{font-size:19px;font-weight:800;color:var(--green);line-height:1.65}
.identityLead{margin:0 0 16px;color:#445c53;font-size:18px;line-height:1.8}
.identityMeanings{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:0}
.identityMeaning{border:1px solid var(--line);border-radius:17px;padding:16px;background:#f8fbf9;min-width:0}
.identityMeaning dt{font-size:21px;color:var(--green);font-weight:900;margin-bottom:4px}
.identityMeaning dd{font-size:17px;color:#445c53;margin:0;line-height:1.8}
.identitySource{margin:16px 0 0;color:var(--muted);font-size:13px;line-height:1.8;border-top:1px solid var(--line);padding-top:12px}
.identityLogoLink{display:inline-flex;border-radius:12px;flex-shrink:0}
.identityLogoLink:focus-visible,.identityJump:focus-visible{outline:3px solid var(--gold);outline-offset:4px}
.topin{flex-wrap:wrap}.brand,.brandtext{min-width:0}
@media(max-width:720px){.identityShell{grid-template-columns:1fr;padding:20px;gap:20px}.identityFigure img{width:190px}.identityFigure figcaption{font-size:18px}.identitySection{scroll-margin-top:170px}.topin{justify-content:center;padding:9px 12px;gap:8px}.brand{justify-content:center;width:100%;gap:8px}.brandtext{text-align:center}.nav{justify-content:center;width:100%}.nav a,.nav button{font-size:14px;padding:7px 10px}.brandtext strong{font-size:18px;overflow-wrap:anywhere}}
@media(max-width:480px){.identityMeanings{grid-template-columns:1fr}.identityShell{padding:18px}.identityMeaning{padding:14px}.identityLead,.identityMeaning dd{font-size:17px}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.portalCard{transition:none}}
'''

def bilingual(ar, en):
    return '<span class="identity-ar" lang="ar">' + escape(ar) + '</span><span class="identity-en" lang="en">' + escape(en) + '</span>'

meanings = [
    ('المصباح (السراج)', 'The nursing lamp',
     'يرمز إلى الرعاية واليقظة والمسؤولية المهنية، ويعكس البعد الإنساني والأخلاقي للممارسة التمريضية.',
     'Represents care, vigilance and professional responsibility, reflecting the human and ethical dimensions of nursing practice.'),
    ('الكتاب المفتوح', 'The open book',
     'يعبّر عن التعليم الأكاديمي والمنهج العلمي والبحث، ويؤكد أن الممارسة التمريضية تنطلق من أساس معرفي.',
     'Represents academic education, scientific inquiry and research, affirming that nursing practice rests on a foundation of knowledge.'),
    ('خط نبض القلب', 'The heartbeat line',
     'يرمز إلى الحياة والممارسة السريرية، ويعكس الدور الحيوي للتمريض في منظومة الرعاية الصحية.',
     'Represents life and clinical practice, reflecting the vital role of nursing within healthcare.'),
    ('السنابل الجانبية', 'The wheat branches',
     'ترمز إلى العطاء والاستمرارية والنمو، وهي مستوحاة من الهوية البصرية لجامعة طبرق، بما يعزز الانتماء المؤسسي.',
     'Represent giving, continuity and growth. Inspired by Tobruk University’s visual identity, they reinforce the Faculty’s institutional affiliation.')
]
items = ''.join('<div class="identityMeaning"><dt>' + bilingual(ar, en) + '</dt><dd>' + bilingual(ard, end) + '</dd></div>' for ar, en, ard, end in meanings)
section = '''<section class="section identitySection" id="faculty-identity" aria-labelledby="identityTitle">
 <div class="sectionHead"><div><h2 id="identityTitle">''' + bilingual('شعار الكلية ودلالاته', 'Our Logo and Its Meaning') + '''</h2><p>''' + bilingual('هوية تجمع العلم والرعاية والانتماء إلى جامعة طبرق.', 'An identity connecting knowledge, care and belonging to Tobruk University.') + '''</p></div></div>
 <div class="identityShell">
  <figure class="identityFigure"><img src="''' + logo_paths['facultyLogo'] + '''" alt="شعار كلية التمريض – جامعة طبرق / Faculty of Nursing – Tobruk University logo" width="300" height="300" loading="lazy" decoding="async"><figcaption>''' + bilingual('كلية التمريض، جامعة طبرق', 'Faculty of Nursing, Tobruk University') + '''</figcaption></figure>
  <div><p class="identityLead">''' + bilingual('يجمع الشعار بين الأساس الأكاديمي للتمريض، ومسؤوليته المهنية والإنسانية، وانتماء الكلية المؤسسي إلى جامعة طبرق.', 'The logo brings together nursing’s academic foundation, its professional and human responsibilities, and the Faculty’s affiliation with Tobruk University.') + '''</p>
   <dl class="identityMeanings">''' + items + '''</dl>
   <p class="identitySource">''' + bilingual('مرجع الدلالات: التقرير الفني بشأن مقترحات تحديث شعار كلية التمريض، 23 ديسمبر 2025 — ملخص الدلالات الرمزية. النص الإنجليزي ترجمة تعريفية.', 'Symbol meanings are based on the Faculty’s technical report on proposed logo updates, 23 December 2025, symbolic-meanings summary. English text is an explanatory translation.') + '''</p>
  </div>
 </div>
</section>

'''

# Serve the original logo files directly; the main hub no longer fetches the
# entire Student Hub HTML merely to find its embedded logo images.
for identity, src in logo_paths.items():
    pattern = r'<img\b[^>]*\bid="' + identity + r'"[^>]*>'
    def replace_image(m, src=src, identity=identity):
        tag = re.sub(r'\s+src="[^"]*"', '', m.group(0))
        tag = tag[:-1] + ' src="' + src + '">'
        if identity == 'facultyLogo':
            tag = '<a class="identityLogoLink" href="#faculty-identity" aria-label="دلالات شعار الكلية / Faculty logo meaning">' + tag + '</a>'
        return tag
    root, count = re.subn(pattern, replace_image, root)
    assert count == 1, f'Logo target not unique: {identity}'
root, count = re.subn(r'async function loadLogos\(\)\{.*?\nloadLogos\(\);', '', root, flags=re.S)
assert count == 1, 'Existing logo-loader boundary changed; review before editing.'
root = root.replace('</style>', css + '\n</style>', 1)
root = root.replace('<section class="section" id="about">', section + '<section class="section" id="about">', 1)
root = root.replace('<a href="#about">عن الكلية</a>', '<a href="#about">عن الكلية</a><a class="keep identityJump" href="#faculty-identity">' + bilingual('شعار الكلية', 'Our Logo') + '</a>', 1)
root = root.replace('<a class="btn ghost" href="#about" id="aboutBtn">تعرف على الكلية</a>', '<a class="btn ghost" href="#about" id="aboutBtn">تعرف على الكلية</a>\n  <a class="btn ghost identityJump" href="#faculty-identity">' + bilingual('شعارنا ودلالاته', 'Our Logo and Its Meaning') + '</a>', 1)
root = root.replace('href="student-learning-hub/"', 'href="student-learning-hub/?entry=faculty"')
root = root.replace('href="student-learning-hub/#home"', 'href="student-learning-hub/?entry=faculty#home"')
root = root.replace('"brandSub":"Faculty Portal"', '"brandSub":"Faculty Hub"').replace('"heroEye":"Faculty Portal · Development Version"', '"heroEye":"Faculty Hub · Development Version"').replace('"heroTitle":"Faculty of Nursing Portal"', '"heroTitle":"Faculty of Nursing Hub"').replace('"studentBtn":"Open Student Portal"', '"studentBtn":"Open Student Hub"')
root = root.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<meta name="faculty-hub-identity-version" content="' + VERSION + '">\n<link rel="canonical" href="https://nourabobaker-create.github.io/tobruk-nursing-simulation/">\n<script>try{sessionStorage.setItem("tobruk-faculty-entry:"+new URL("./",location.href).pathname,"1");}catch(e){}</script>', 1)

# Fresh visitors using the old generic Student Hub address see the Faculty Hub
# first. Intentional navigation from the faculty hub, reloads, and deep links
# to learning content remain functional. No localStorage or learning data is
# cleared. The explicit entry parameter also works when storage is blocked.
entry_guard = '''
<script id="faculty-first-entry">
(function(){
 'use strict';
 if(window.top!==window.self)return;
 var here=new URL(location.href),home=new URL('../',here),key='tobruk-faculty-entry:'+home.pathname;
 var generic=!here.hash||here.hash==='#home';
 if(!generic)return;
 var allowed=here.searchParams.get('entry')==='faculty';
 try{allowed=allowed||sessionStorage.getItem(key)==='1';}catch(e){}
 try{var ref=new URL(document.referrer);allowed=allowed||(ref.origin===home.origin&&ref.pathname.startsWith(home.pathname));}catch(e){}
 if(!allowed){location.replace(home.href);return;}
 try{sessionStorage.setItem(key,'1');}catch(e){}
})();
</script>
'''
student = student.replace('<meta charset="utf-8">', '<meta charset="utf-8">' + entry_guard, 1)
student_css = '''
.facultyBreadcrumb{padding:10px 18px;background:#eaf4ef;color:#174b3b;border-bottom:1px solid #cfe3d9;font-size:15px;line-height:1.6}
.facultyBreadcrumb div{max-width:1464px;margin:auto;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.facultyBreadcrumb a{color:#174b3b;font-weight:900;text-decoration:underline;text-underline-offset:3px}
html[lang="en"] .facultyBreadcrumb .facultyCrumbAr{display:none}
html:not([lang="en"]) .facultyBreadcrumb .facultyCrumbEn{display:none}
'''
student = student.replace('</style>', student_css + '\n</style>', 1)
crumb = '''<nav id="facultyBreadcrumb" class="facultyBreadcrumb" aria-label="مسار البوابة / Hub navigation"><div><a href="../"><span class="facultyCrumbAr" lang="ar">الرئيسية · بوابة كلية التمريض</span><span class="facultyCrumbEn" lang="en">Home · Faculty Hub</span></a><span aria-hidden="true"> / </span><span aria-current="page"><span class="facultyCrumbAr" lang="ar">بوابة الطالب</span><span class="facultyCrumbEn" lang="en">Student Hub</span></span></div></nav>'''
student, count = re.subn(r'(<body\b[^>]*>)', lambda m:m.group(1)+'\n'+crumb, student, count=1)
assert count == 1
root_file.write_text(root, encoding='utf-8')
student_file.write_text(student, encoding='utf-8')
(brand/'README.md').write_text('''# Faculty Hub logo and entry update

Published interpretation: the four symbol meanings in the Faculty technical report on proposed logo updates, dated 23 December 2025, under «الدلالات الرمزية لعناصر الشعار (ملخص مهني)».

The report describes the lamp (care, vigilance, professional responsibility), open book (education, scientific method, research), heartbeat (life, clinical practice), and wheat branches (giving, continuity, growth and University affiliation). The English wording is an explanatory translation. No meaning has been invented for the colours, and this page makes no new claim about formal approval.

The image files here are byte-for-byte copies of the existing Student Hub embedded originals, not new or redrawn logos. The private full report and other proposed logos are not published.

## Entry behaviour
The site root is the Faculty Hub. A fresh visit to the old generic `student-learning-hub/` or `student-learning-hub/index.html` address (including `#home`) redirects to the Faculty Hub. Intentional Student Hub links from the Faculty Hub carry `entry=faculty`. A session-only marker prevents repeated detours during navigation and refresh. Specific learning-section deep links are preserved. No learning progress or user data is removed.

Edit the static `#faculty-identity` section in the root `index.html` to maintain the wording. The one-time application script exits without overwriting later edits once its version marker exists. The existing `faculty-portal/` alias remains directed to the site root.
''', encoding='utf-8')
print('Applied source-based identity section and Faculty Hub first-entry routing.')
