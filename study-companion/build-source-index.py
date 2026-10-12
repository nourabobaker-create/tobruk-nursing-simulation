"""Generate the companion's course-specific links from the existing Library.

This imports catalogue metadata and documented mapping limits, not book text.
Run from any directory: python study-companion/build-source-index.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def read_assignment(path):
    return json.loads(path.read_text().split('=', 1)[1].strip().rstrip(';'))


def norm(value):
    return re.sub(r'[^a-z0-9]', '', value.lower())


corpus = read_assignment(ROOT / 'study-companion/qa-corpus.js')
catalogue = read_assignment(ROOT / 'e-library-v3/data/catalog.js')
resources = {}
for path in sorted((ROOT / 'e-library-v3/data').glob('resources-*.js')):
    source = path.read_text()
    for resource in json.loads(source[source.index('...') + 3:source.rindex(')')]):
        resources[resource['id']] = resource

courses = {}
used = set()
for course in corpus:
    # Use the course title to resolve older codes; never join ambiguous codes.
    candidates = [c for c in catalogue['curriculum']
                  if c['year'] == course['year'] and c['semester'] == course['sem']
                  and (c['title_original'] == course['nEn'] or c['title_ar'] == course['nAr'])]
    if not candidates:
        candidates = [c for c in catalogue['curriculum']
                      if c['year'] == course['year'] and c['semester'] == course['sem']
                      and norm(c['code']) == norm(course['code'])]
    assert len(candidates) == 1, (course['id'], candidates)
    source = candidates[0]
    modules = []
    ids = list(source.get('resource_ids', []))
    for module in source.get('modules', []):
        evidence = module.get('mapping_review', {}).get('source_links', [])
        module_ids = list(dict.fromkeys(module.get('resource_ids', []) +
                                      [e['resource_id'] for e in evidence]))
        ids.extend(module_ids)
        modules.append({'title_ar': module['title_ar'], 'resource_ids': module_ids,
                        'evidence': evidence})
    ids = list(dict.fromkeys(ids))
    assert all(i in resources for i in ids), (course['id'], [i for i in ids if i not in resources])
    used.update(ids)
    courses[course['id']] = {'library_id': source['id'], 'code': source['code'],
                            'title_ar': source['title_ar'], 'resource_ids': ids, 'modules': modules}

assert len(courses) == 50
result = {'version': '20261012-1', 'catalogue_release': catalogue.get('release'),
          'full_text_imported': False, 'courses': courses,
          'resources': {i: {key: resources[i].get(key, '')
                            for key in ['title_ar', 'title_original', 'url', 'language', 'provider']}
                        for i in sorted(used)}}
destination = ROOT / 'study-companion/course-sources.json'
destination.write_text(json.dumps(result, ensure_ascii=False, separators=(',', ':')) + '\n')
print(f'{len(courses)} courses, {sum(len(c["modules"]) for c in courses.values())} topics, '
      f'{len(used)} mapped resources; {destination.stat().st_size} bytes')
