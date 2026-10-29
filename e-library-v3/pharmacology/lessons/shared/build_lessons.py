"""Build self-contained bilingual lessons from independently authored JSON graphs."""
from pathlib import Path
import html
import json
import re
import sys

SOURCE = Path(__file__).resolve().parent
LESSONS = SOURCE.parent
DEFAULT = ('insulin-safety', 'anticoagulant-safety', 'opioid-safety')

def build(slug):
    if not re.fullmatch(r'[a-z][a-z0-9-]*', slug):
        raise ValueError('Invalid lesson slug')
    folder = LESSONS / slug
    lesson = json.loads((folder / 'lesson.json').read_text(encoding='utf-8'))
    if lesson['id'] != slug:
        raise ValueError('Lesson identity mismatch')
    source_ids = {source['id'] for source in lesson['sources']}
    for case in lesson['cases']:
        nodes = {node['id']: node for node in case['nodes']}
        if case['start'] not in nodes:
            raise ValueError('Missing start node')
        for node in nodes.values():
            for choice in node.get('choices', []):
                if choice['next'] not in nodes:
                    raise ValueError('Dangling case branch')
                if not set(choice.get('sourceIds', [])) <= source_ids:
                    raise ValueError('Unknown evidence source')
    data = 'window.PHARM_LESSON = ' + json.dumps(lesson, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c') + ';'
    result = (SOURCE / 'template.html').read_text(encoding='utf-8')
    replacements = {
        'LESSON_TITLE': html.escape(lesson['title']['ar'] + ' | كلية التمريض – جامعة طبرق'),
        'LESSON_FILENAME': 'Tobruk_' + slug.replace('-', '_') + '_AR_EN.html',
        'LESSON_ID': slug,
        '/* STYLE_PLACEHOLDER */': (SOURCE / 'style.css').read_text(encoding='utf-8'),
        '/* DATA_PLACEHOLDER */': data,
        '/* ENGINE_PLACEHOLDER */': (SOURCE / 'engine.js').read_text(encoding='utf-8'),
    }
    for marker, value in replacements.items():
        if marker not in result:
            raise ValueError('Missing template marker: ' + marker)
        result = result.replace(marker, value)
    (folder / 'index.html').write_text(result, encoding='utf-8')
    print(slug + ': built ' + str(len(result.encode('utf-8'))) + ' bytes')

if __name__ == '__main__':
    for lesson_slug in sys.argv[1:] or DEFAULT:
        build(lesson_slug)
