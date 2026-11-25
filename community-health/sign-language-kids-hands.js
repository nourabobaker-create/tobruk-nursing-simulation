const SignKidsHandArt = (() => {
  const skin = '#ffc392';
  const ink = '#673e35';
  const detail = '#ad6c50';
  const nail = '#ffe1cd';
  const fingers = [
    { base: 121, shoulder: 105, top: 35, open: 111, close: 122, width: 6.6 },
    { base: 141, shoulder: 102, top: 24, open: 141, close: 137, width: 6.5 },
    { base: 161, shoulder: 105, top: 37, open: 171, close: 153, width: 6.4 },
    { base: 180, shoulder: 114, top: 56, open: 199, close: 171, width: 5.8 },
  ];

  // The number and alphabet poses use the viewpoint of a person watching the signer.
  // The number poses are from PDF pp. 239–240 and the alphabet poses from PDF p. 12.
  const poses = {
    one: { raised: [0] },
    two: { raised: [0, 1] },
    three: { raised: [0, 1, 2] },
    four: { raised: [0, 1, 2, 3] },
    five: { raised: [0, 1, 2, 3], thumb: 'out' },
    seven: { raised: [0, 1], palm: true, thumb: 'cross' },
    ten: { raised: [0, 3] },
    ba: { raised: [0], palm: true, spacing: 'close', thumb: 'cross' },
    ta: { raised: [0, 1], palm: true, spacing: 'close', thumb: 'cross' },
    tha: { raised: [0, 1, 2], palm: true, spacing: 'close', thumb: 'cross' },
    sin: { raised: [0, 1, 2, 3], palm: true, spacing: 'close', thumb: 'side' },
    shin: { raised: [0, 1, 2, 3], palm: true, thumb: 'side' },
    lam: { raised: [0], palm: true, spacing: 'close', thumb: 'out' },
    mim: { raised: [3], palm: true, thumb: 'cross' },
    ya: { raised: [3], palm: true, thumb: 'out' },
  };

  function fingerOutline(finger, extended, spacing) {
    const { base, shoulder, top, open, close, width } = finger;
    if (!extended) {
      return `L ${base - 10} ${shoulder} Q ${base - 10} ${shoulder - 10} ${base} ${shoulder - 10} Q ${base + 9} ${shoulder - 10} ${base + 10} ${shoulder}`;
    }
    const tip = spacing === 'close' ? close : open;
    const gap = spacing === 'close' ? .45 : 1.5;
    const rootWidth = spacing === 'close' ? 7.5 : 10;
    return `L ${base - rootWidth} ${shoulder} Q ${tip - width - gap} ${top + 34} ${tip - width} ${top + 9}
      Q ${tip - width} ${top} ${tip} ${top} Q ${tip + width} ${top} ${tip + width} ${top + 9}
      Q ${tip + width + gap} ${top + 38} ${base + rootWidth} ${shoulder}`;
  }

  function extendedDetails(finger, spacing, palm) {
    const tip = spacing === 'close' ? finger.close : finger.open;
    if (palm) {
      return `<path d="M ${tip - 3} ${finger.top + 31} q 3 2 6 0 M ${tip - 3} ${finger.top + 47} q 3 2 6 0" fill="none" stroke="${detail}" stroke-width="1.5" stroke-linecap="round"/>`;
    }
    return `<rect x="${tip - 3.8}" y="${finger.top + 4}" width="7.6" height="10.5" rx="3.2" fill="${nail}" stroke="${detail}" stroke-width="1.1"/>
      <path d="M ${tip - 3.1} ${finger.top + 32} q 3.1 2 6.2 0" fill="none" stroke="${detail}" stroke-width="1.4" stroke-linecap="round"/>`;
  }

  function foldedDetails(finger, palm) {
    const { base, shoulder } = finger;
    const bend = palm ? 17 : 13;
    return `<path d="M ${base + 7} ${shoulder + 1} q 0 9 -6 ${bend - 6} q -5 3 -10 0" fill="none" stroke="${detail}" stroke-width="2.1" stroke-linecap="round"/>`;
  }

  function regularHand(pose) {
    const { raised, spacing, palm, thumb } = pose;
    const thumbEdge = thumb === 'out'
      ? 'C 99 146 90 136 79 125 C 73 119 68 115 73 109 C 78 102 87 107 92 111 L 109 124 Q 111 120 111 111'
      : 'C 111 153 105 147 105 137 Q 105 125 110 120 L 111 110';
    const outline = `M 129 205 L 129 190 Q 128 177 122 164 Q 117 154 115 146 ${thumbEdge}
      ${fingers.map((finger, i) => fingerOutline(finger, raised.includes(i), spacing)).join(' ')}
      C 194 131 193 151 188 167 Q 185 179 178 189 L 179 205 Z`;
    const palmLines = palm
      ? `<path d="M 120 152 Q 131 130 153 134 M 130 171 Q 141 152 167 151 M 157 164 Q 173 167 177 174" fill="none" stroke="${detail}" stroke-width="2.35" stroke-linecap="round"/>`
      : `<path d="M 128 168 Q 144 161 161 163 M 131 174 Q 141 171 148 174" fill="none" stroke="${detail}" stroke-width="1.9" stroke-linecap="round"/>`;
    const palmThumb = thumb === 'cross'
      ? `<path d="M 111 145 C 111 132 115 119 125 117 Q 132 117 132 123 L 127 130 Q 140 129 147 138 Q 147 144 141 146 L 124 145" fill="${skin}" stroke="${detail}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>`
      : thumb === 'side'
        ? `<path d="M 111 150 Q 111 126 116 119 Q 121 115 123 122 L 124 142 Q 125 148 131 152" fill="none" stroke="${detail}" stroke-width="2.1" stroke-linecap="round"/>`
        : '';
    const spreadThumb = thumb === 'out'
      ? `<path d="M 83 116 q 4 1 6 5 M 103 131 q 10 8 12 17" fill="none" stroke="${detail}" stroke-width="2.1" stroke-linecap="round"/>`
      : '';
    return `<g${palm ? ' transform="translate(300 0) scale(-1 1)"' : ''}>
      <path d="${outline}" fill="${skin}" stroke="${ink}" stroke-width="3.15" stroke-linecap="round" stroke-linejoin="round"/>
      ${fingers.map((finger, i) => raised.includes(i) ? extendedDetails(finger, spacing, palm) : foldedDetails(finger, palm)).join('')}
      ${palmLines}${palmThumb}${spreadThumb}
      <path d="M 127 193 Q 154 196 180 192 L 183 207 Q 156 218 125 207 Z" fill="#247f7a" stroke="#165252" stroke-width="2.8" stroke-linejoin="round"/>
      <path d="M 133 203 Q 154 208 175 202" fill="none" stroke="#9ed7b6" stroke-width="2.5" stroke-linecap="round"/>
    </g>`;
  }

  function alifHand() {
    return `<g>
      <path d="M 136 194 L 134 178 Q 122 168 120 150 Q 118 134 120 122 Q 121 113 128 109 L 126 92 L 122 72
        Q 119 58 127 55 Q 137 52 142 68 L 149 95 L 149 109 Q 162 105 172 111 Q 181 114 180 125
        Q 187 131 181 141 Q 186 149 179 158 Q 178 175 165 183 L 167 198 Z" fill="${skin}" stroke="${ink}" stroke-width="3.15" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 130 110 Q 140 105 148 110 M 157 119 Q 169 116 180 124 M 155 132 Q 169 129 180 139 M 153 145 Q 165 142 179 154 M 150 157 Q 162 155 172 161" fill="none" stroke="${detail}" stroke-width="2.3" stroke-linecap="round"/>
      <path d="M 126 97 Q 130 93 137 94 M 128 100 Q 132 97 137 98" fill="none" stroke="${detail}" stroke-width="1.7" stroke-linecap="round"/>
      <path d="M 134 190 Q 151 195 169 191 L 173 206 Q 151 216 130 206 Z" fill="#247f7a" stroke="#165252" stroke-width="2.8" stroke-linejoin="round"/>
      <path d="M 137 203 Q 150 206 166 201" fill="none" stroke="#9ed7b6" stroke-width="2.4" stroke-linecap="round"/>
    </g>`;
  }

  function render(id) {
    const hand = id === 'alif' ? alifHand() : Object.hasOwn(poses, id) ? regularHand(poses[id]) : '';
    if (!hand) return '';
    return `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="20" y="8" width="260" height="204" rx="38" fill="#fff4df"/>
      <circle cx="151" cy="105" r="82" fill="#ffe8bc"/>
      <ellipse cx="152" cy="206" rx="62" ry="7" fill="#b9815f" opacity=".16"/>
      <path d="M 52 75 q 2 10 12 12 q -10 2 -12 12 q -2 -10 -12 -12 q 10 -2 12 -12 Z" fill="#f3ac58"/>
      <path d="M 240 63 v 13 M 233.5 69.5 h 13" fill="none" stroke="#6eb6a0" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="236" cy="151" r="4" fill="#ef8c74"/><circle cx="63" cy="147" r="3.5" fill="#7bbf9f"/>
      ${hand}
    </svg>`;
  }

  return { render };
})();
