"""Run with: python -m unittest discover -s quality-cycle -p 'test_*.py'
Fixtures are synthetic and must never be copied into the public release file.
"""
import copy
import unittest
from validate_publication import FIELDS, validate

class PublicationTests(unittest.TestCase):
    def setUp(self):
        row = {k: 'نص اختبار داخلي' for k in FIELDS}
        row.update(id='PUB-2026-001', approvedOn='2026-10-02', status='جارٍ',
                   approvalRef='مرجع فحص بنيوي فقط')
        self.data = {'schemaVersion': 1, 'publicationMode': 'reviewed-releases-only',
                     'allowedItemFields': sorted(FIELDS), 'items': [row]}

    def test_empty_release_is_honest_and_valid(self):
        self.data['items'] = []
        self.assertEqual(validate(self.data), 0)

    def test_iso_date_is_not_mistaken_for_phone(self):
        self.assertEqual(validate(self.data), 1)

    def test_basic_leak_and_schema_checks(self):
        invalid = [
            ('rawResponses', []),
            ('heard', 'https://example.org/responses'),
            ('heard', 'a@example.org'),
            ('heard', '0912345678'),
            ('heard', '70%'),
            ('heard', 'مثال افتراضي'),
            ('approvalRef', ''),
            ('approvedOn', '2026-02-30')
        ]
        for key, value in invalid:
            with self.subTest(key=key, value=value):
                data = copy.deepcopy(self.data)
                data['items'][0][key] = value
                with self.assertRaises((ValueError, TypeError)):
                    validate(data)

    def test_duplicate_identifier_is_rejected(self):
        self.data['items'] *= 2
        with self.assertRaises(ValueError):
            validate(self.data)

if __name__ == '__main__':
    unittest.main()
