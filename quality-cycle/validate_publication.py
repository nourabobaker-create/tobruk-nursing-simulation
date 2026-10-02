#!/usr/bin/env python3
"""Check qualitative release structure and basic leak patterns, not publication authority.
Usage: python quality-cycle/validate_publication.py [path-to-public-updates.json]
Human review of indirect identification remains essential. No external dependencies.
"""
from __future__ import annotations
import argparse
import datetime as dt
import json
import re
import sys
from pathlib import Path

FIELDS = {'id', 'theme', 'period', 'method', 'heard', 'action', 'status',
          'nextReview', 'limitations', 'approvedOn', 'approvalRef'}
TOP = {'schemaVersion', 'updatedAt', 'publicationMode', 'notice', 'allowedItemFields', 'items'}
STATES = {'مقترح', 'جارٍ', 'نُفذ', 'نتحقق من الأثر', 'مؤجل مع السبب', 'تعذر مع بيان البديل'}
LINK_OR_CONTACT = re.compile(r'https?://|www\.|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|(?<!\d)(?:\+?\d[ -]?){8,}(?!\d)', re.I)
ISO_DATE = re.compile(r'\b\d{4}-\d{2}-\d{2}\b')
DEMO = re.compile(r'demo|محاكاة|مثال افتراضي', re.I)

def validate(data: object) -> int:
    if not isinstance(data, dict) or set(data) - TOP:
        raise ValueError('Unknown top-level fields or invalid object.')
    if data.get('schemaVersion') != 1 or data.get('publicationMode') != 'reviewed-releases-only':
        raise ValueError('Unsupported release schema/mode.')
    declared = data.get('allowedItemFields')
    if not isinstance(declared, list) or set(declared) != FIELDS:
        raise ValueError('Field allowlist differs from the reviewed schema.')
    rows = data.get('items')
    if not isinstance(rows, list):
        raise ValueError('items must be a list.')
    seen: set[str] = set()
    for i, row in enumerate(rows, start=1):
        if not isinstance(row, dict) or set(row) != FIELDS:
            raise ValueError(f'Item {i}: missing/extra fields; raw-response fields forbidden.')
        if any(not isinstance(v, str) or not v.strip() or len(v) > 1800 for v in row.values()):
            raise ValueError(f'Item {i}: all fields must be nonempty bounded strings.')
        if not re.fullmatch(r'PUB-\d{4}-\d{3,}', row['id']) or row['id'] in seen:
            raise ValueError(f'Item {i}: invalid/duplicate publication ID.')
        seen.add(row['id'])
        if row['status'] not in STATES:
            raise ValueError(f'Item {i}: unsupported implementation state.')
        if not ISO_DATE.fullmatch(row['approvedOn']):
            raise ValueError(f'Item {i}: approval date must be YYYY-MM-DD.')
        dt.date.fromisoformat(row['approvedOn'])
        text = '\n'.join(row.values())
        # Recognized dates are not contact details; pattern checks remain heuristic.
        contact_text = ISO_DATE.sub('[date]', text)
        if LINK_OR_CONTACT.search(contact_text):
            raise ValueError(f'Item {i}: links/contact-like values require manual review/removal.')
        if DEMO.search(text):
            raise ValueError(f'Item {i}: simulation content cannot become an official release.')
        if '%' in text or '٪' in text:
            raise ValueError(f'Item {i}: v1 is qualitative; statistics need a reviewed schema extension.')
    return len(rows)

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('path', nargs='?', type=Path,
                        default=Path(__file__).with_name('public-updates.json'))
    args = parser.parse_args()
    try:
        if args.path.stat().st_size > 2_000_000:
            raise ValueError('Release file unexpectedly large.')
        with args.path.open(encoding='utf-8') as handle:
            count = validate(json.load(handle))
    except (OSError, ValueError, TypeError) as exc:
        print(f'BLOCKED: {exc}', file=sys.stderr)
        return 1
    print(f'Schema checks passed: {count} release(s).')
    print('Human privacy/accuracy review and actual publication authority still required.')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
