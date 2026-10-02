#!/usr/bin/env python3
"""Validate a qualitative public release file; never a substitute for human privacy review.

Usage: python quality-cycle/validate_publication.py [path-to-public-updates.json]
No external dependencies. This does NOT publish or confer approval.
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
LINK_OR_CONTACT = re.compile(r'https?://|www\.|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|(?:\+?\d[\s-]?){8,}', re.I)
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
            raise ValueError(f'Item {i}: missing/extra fields. Raw-response fields are forbidden.')
        if any(not isinstance(v, str) or not v.strip() or len(v) > 1800 for v in row.values()):
            raise ValueError(f'Item {i}: all fields must be nonempty bounded strings.')
        if not re.fullmatch(r'PUB-\d{4}-\d{3,}', row['id']) or row['id'] in seen:
            raise ValueError(f'Item {i}: invalid/duplicate publication ID.')
        seen.add(row['id'])
        if row['status'] not in STATES:
            raise ValueError(f'Item {i}: unsupported implementation state.')
        try:
            dt.date.fromisoformat(row['approvedOn'])
        except ValueError as exc:
            raise ValueError(f'Item {i}: approval date must be YYYY-MM-DD.') from exc
        text = '\n'.join(row.values())
        if LINK_OR_CONTACT.search(text):
            raise ValueError(f'Item {i}: links/contact-like values require removal and manual review.')
        if DEMO.search(text):
            raise ValueError(f'Item {i}: simulation content cannot become an official release.')
        if '%' in text or '٪' in text:
            raise ValueError(f'Item {i}: schema v1 is qualitative; statistics need a reviewed schema extension.')
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
    print('Human review of indirect identification, accuracy and actual publication authority remains required.')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
