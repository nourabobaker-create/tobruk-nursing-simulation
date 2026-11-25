(() => {
  'use strict';

  // Mada Unified Arabic Braille, uncontracted Grade 1 (six dots).
  const alphabet = {
    'ا': '1', 'ب': '12', 'ت': '2345', 'ث': '1456', 'ج': '245', 'ح': '156',
    'خ': '1346', 'د': '145', 'ذ': '2346', 'ر': '1235', 'ز': '1356', 'س': '234',
    'ش': '146', 'ص': '12346', 'ض': '1246', 'ط': '23456', 'ظ': '123456',
    'ع': '12356', 'غ': '126', 'ف': '124', 'ق': '12345', 'ك': '13', 'ل': '123',
    'م': '134', 'ن': '1345', 'ه': '125', 'و': '2456', 'ي': '24',
  };

  const messageSymbols = {
    ...alphabet,
    'لا': '1236', 'ى': '135', 'ة': '16', 'ء': '3', 'أ': '34', 'إ': '46',
    'ؤ': '1256', 'ئ': '13456', 'آ': '345', '.': '256', '،': '5',
    '؛': '5-23', ':': '5-2', '؟': '236', '!': '235',
  };

  function toBraille(dots) {
    return dots.split('-').map((cell) => {
      const mask = [...cell].reduce((value, dot) => value | (1 << (Number(dot) - 1)), 0);
      return String.fromCodePoint(0x2800 + mask);
    }).join('');
  }

  function translateMessage(line) {
    return line.normalize('NFC')
      .replace(/[\u0640\u064B-\u065F\u0670]/gu, '')
      .replace(/لا|./gu, (symbol) => {
        const dots = messageSymbols[symbol];
        return dots ? toBraille(dots) : symbol;
      });
  }

  function renderAlphabet(container) {
    const table = container.matches('table') ? container : document.createElement('table');
    table.dir = 'rtl';
    table.setAttribute('aria-label', 'الحروف الهجائية بطريقة برايل العربية');

    const heading = document.createElement('thead');
    const headingRow = heading.insertRow();
    for (const title of ['الحرف', 'النقاط', 'خلية برايل']) {
      const cell = document.createElement('th');
      cell.scope = 'col';
      cell.textContent = title;
      headingRow.append(cell);
    }

    const body = document.createElement('tbody');
    for (const [letter, dots] of Object.entries(alphabet)) {
      const row = body.insertRow();
      const letterCell = document.createElement('th');
      letterCell.scope = 'row';
      letterCell.textContent = letter;
      row.append(letterCell);

      const dotsLabel = [...dots].join('، ');
      row.insertCell().textContent = dotsLabel;

      const brailleCell = row.insertCell();
      brailleCell.className = 'braille-cell';
      brailleCell.dir = 'ltr';
      brailleCell.setAttribute('aria-label', `خلية برايل، النقاط ${dotsLabel}`);
      const glyph = document.createElement('span');
      glyph.setAttribute('aria-hidden', 'true');
      glyph.textContent = toBraille(dots);
      brailleCell.append(glyph);
    }
    table.replaceChildren(heading, body);
    if (table !== container) container.replaceChildren(table);
  }

  function renderVisitBraille() {
    document.querySelectorAll('[data-braille-alphabet]').forEach(renderAlphabet);

    const lines = [...document.querySelectorAll('[data-message-line]')]
      .map((line) => translateMessage(line.textContent.trim()));

    for (const container of document.querySelectorAll('[data-braille-message]')) {
      container.dir = 'ltr';
      // The Arabic source remains available to screen readers and braille displays.
      container.setAttribute('aria-hidden', 'true');
      container.replaceChildren(...lines.map((line) => {
        const paragraph = document.createElement('p');
        paragraph.className = 'braille-line';
        paragraph.textContent = line;
        return paragraph;
      }));
    }

    for (const link of document.querySelectorAll('a[data-braille-download]')) {
      if (lines.length === 0) continue;
      link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(`${lines.join('\n')}\n`)}`;
      link.hidden = false;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderVisitBraille, { once: true });
  } else {
    renderVisitBraille();
  }
})();
