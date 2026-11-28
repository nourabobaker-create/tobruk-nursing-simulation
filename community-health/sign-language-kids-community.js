const SignKidsCommunityArt = (() => {
  const palette = {
    ink: '#20394d', skin: '#efb281', detail: '#9e5b49', ears: '#dd966d', shirt: '#7460a5',
    seam: '#594685', hair: '#493b54', motion: '#186b64', steady: '#526379',
  };

  function card(id, topic, page, ar, en, arabicCue, englishCue) {
    return { id, group: 'community', topic, ar, en, describe: [arabicCue, englishCue], page };
  }

  // PDF viewer page numbers, one greater than the printed page numbers.
  const items = [
    card('near', 'place', 231, 'قريب', 'Near',
      'ثبّت قبضتك اليسرى قرب صدرك. اجعل يدك اليمنى على جانبها، بالإبهام إلى أعلى والأصابع الأربعة متقاربة. حرّك اليمنى قليلًا إلى الأمام.',
      'Keep your left fist still near your chest. Hold your right hand on its side with the thumb up and the four fingers together. Move it a short way forward.'),
    card('far', 'place', 231, 'بعيد', 'Far',
      'ثبّت قبضتك اليسرى قرب صدرك. اجعل يدك اليمنى على جانبها، بالإبهام إلى أعلى والأصابع الأربعة متقاربة. مدّ اليمنى إلى الأمام مسافة أطول من إشارة «قريب».',
      'Keep your left fist still near your chest. Hold your right hand on its side with the thumb up and the four fingers together. Reach farther forward than for “Near”.'),
    card('above', 'place', 232, 'فوق', 'Above',
      'اجعل راحتي يديك للأسفل. ثبّت اليسرى أمامك، وضع اليمنى أعلى منها مع ترك مسافة بينهما.',
      'Face both palms down. Hold your left hand steady in front of you and place the right one above it, leaving a gap.'),
    card('below', 'place', 232, 'تحت', 'Below',
      'ضع كفك اليمنى أسفل اليسرى أمام صدرك، مع توجيه راحتي اليدين إلى الأسفل.',
      'Place your right hand below your left in front of your chest, with both palms facing down.'),
    card('beside', 'place', 232, 'بجانب', 'Beside',
      'اجعل أصابع اليدين تتدلّى إلى الأسفل. ثبّت يسراك، وقرّب اليمنى منها من الجانب.',
      'Let the fingers of both hands point down. Keep your left hand still and move your right hand in beside it.'),
    card('around', 'place', 233, 'حول', 'Around',
      'اثنِ أصابع يسراك وارفع إبهامها. أبقِ اليسرى ثابتة عند علامة ⊗. وجّه سبّابة اليمنى إلى أسفل وحرّكها في دائرة حول الإبهام الأيسر.',
      'Curl the fingers of your left hand and point its thumb up. Keep the left hand still at the ⊗ mark. Point your right index finger down and circle it around your left thumb.'),
    card('today', 'time', 179, 'اليوم', 'Today',
      'مدّ إبهام اليمنى وخنصرها، واثنِ الأصابع الثلاثة الباقية، ثم حرّك اليد إلى الأسفل.',
      'Extend the thumb and little finger of your right hand, fold the three middle fingers, then lower the hand.'),
    card('tomorrow', 'time', 179, 'غدًا', 'Tomorrow',
      'ارفع إبهام اليمنى مع ثني بقية الأصابع. حرّك اليد بقوس صغير إلى الأمام بعيدًا عن الوجه.',
      'Raise the right thumb with the other fingers folded. Move the hand in a small arc forwards, away from your face.'),
    card('yesterday', 'time', 179, 'أمس', 'Yesterday',
      'ارفع إبهام اليمنى مع ثني بقية الأصابع. حرّك اليد بقوس صغير عائدًا نحو وجهك.',
      'Raise the right thumb with the other fingers folded. Move the hand in a small arc back towards your face.'),
    card('black', 'colors', 227, 'أسود', 'Black',
      'قرّب قبضة يدك اليمنى من جانب الوجه وحرّكها حوله في دائرة باتجاه السهم.',
      'Bring your right fist beside your face and move it in a circle in the direction of the arrow.'),
    card('brown', 'colors', 227, 'بني', 'Brown',
      'ارفع سبّابة اليمنى بجانب الخد الأيمن وحرّكها صعودًا ونزولًا، مع بقاء باقي الأصابع مثنية.',
      'Raise the right index finger beside your right cheek and move it up and down, keeping the other fingers folded.'),
    card('blue', 'colors', 227, 'أزرق', 'Blue',
      'اثنِ طرف سبّابة اليمنى قرب مستوى الشفتين، واطوِ باقي الأصابع. اتبع السهم من النقطة عند يسار فمك إلى اليمين.',
      'Curve the tip of your right index finger at lip level and fold the other fingers. Follow the arrow from the dot at the left side of your mouth to the right.'),
    card('red', 'colors', 228, 'أحمر', 'Red',
      'وجّه طرف سبّابة اليمنى نحو الشفتين. قرّبه منهما ثم أبعده قليلًا، كما يوضّح السهم المتقطّع.',
      'Point the tip of your right index finger towards your lips. Move it a little closer and then away, following the dashed arrow.'),
    card('white', 'colors', 228, 'أبيض', 'White',
      'افتح الإبهام والسبّابة من يدك اليمنى على جانبي الذقن، مع ثني باقي الأصابع.',
      'Spread the right thumb and index finger on either side of your chin and curl the other fingers.'),
    card('green', 'colors', 228, 'أخضر', 'Green',
      'مدّ سبّابة اليمنى أفقيًا تحت ذقنك وأبقِ باقي الأصابع مثنية.',
      'Extend your right index finger horizontally just under your chin and curl the other fingers.'),
    card('yellow', 'colors', 228, 'أصفر', 'Yellow',
      'قرّب طرفي الإبهام والسبّابة من بعضهما بجانب الخد الأيمن، ثم افتح الفرجة بينهما كما في اللقطة الثانية.',
      'Bring the right thumb and index finger tips close together beside your right cheek. Then open the gap between them as shown in the second drawing.'),
  ];

  function sleeve(start, elbow, wrist) {
    const line = `M${start} Q${elbow} ${wrist}`;
    return `<path d="${line}" fill="none" stroke="${palette.ink}" stroke-width="26" stroke-linecap="round"/>
      <path d="${line}" fill="none" stroke="${palette.shirt}" stroke-width="21" stroke-linecap="round"/>`;
  }

  function body(x) {
    return `<g transform="translate(${x} 0)" stroke="${palette.ink}" stroke-width="2.8" stroke-linejoin="round">
      <path d="M-47 211v-59q0-21 21-29l15-4h22l15 4q21 8 21 29v59z" fill="${palette.shirt}"/>
      <path d="M-11 105v16q11 12 22 0v-16z" fill="${palette.ears}"/>
      <path d="M14 158h16v11q-8 7-16 0z" fill="#fee099"/>
      <path d="M-30 171v37m62-30v30" fill="none" stroke="${palette.seam}" stroke-width="2" stroke-linecap="round"/>
    </g>`;
  }

  function face(x, mode = 'front') {
    const features = mode === 'side' ? `
      <path d="M28 19q4 16-7 28l-12 7q-2 16-18 16l-12-4-5-12-9-3q-4-2 0-6l8-9 1-15q4-23 28-22 20 1 24 20z" fill="${palette.skin}"/>
      <path d="M29 31q-18-4-18-18-15 9-38 11-6-16 9-25Q8-28 26-1q11 9 3 32z" fill="${palette.hair}"/>
      <path d="M-23 34q5-4 10 0m-15 25q4 2 8 0M7 37q11-8 11 3 0 7-9 9" fill="none" stroke-linecap="round"/>
      <circle cx="-18" cy="40" r="2.5" fill="${palette.ink}" stroke="none"/>` : `
      <path d="M-29 30q-13-9-12 3 0 12 14 14m56-17q13-9 12 3 0 12-14 14" fill="${palette.ears}"/>
      <path d="M-28 25q0-34 28-34t28 34v16q0 27-28 31-28-4-28-31z" fill="${palette.skin}"/>
      <path d="M-29 29q-7-16 3-30 11-17 31-15 14-2 22 8 11 10 3 33-7-3-9-14-12 8-28 2-8 10-22 16z" fill="${palette.hair}"/>
      <path d="M-18 34q4-3 9-1m19 0q4-2 9 1m-19 7-2 8h4m-9 8q7 5 14 0" fill="none" stroke-linecap="round"/>
      <circle cx="-13" cy="39" r="2.3" fill="${palette.ink}" stroke="none"/><circle cx="14" cy="39" r="2.3" fill="${palette.ink}" stroke="none"/>`;
    return `<g transform="translate(${x} 42)" stroke="${palette.ink}" stroke-width="2.35" stroke-linejoin="round">${features}</g>`;
  }

  const poses = {
    point: ['M-8 3l-3-14q-2-10 2-15l4-6 2-22q1-5 5-5 4 0 4 5l-1 23q7-3 9 4 7-2 9 5 6 0 6 7 0 10-8 14l-6 5z', 'M7-28l3 7m5-4 3 8m5-3 1 6'],
    bentPoint: ['M-9 5l-4-17q-5-14-4-26 1-11 9-18l9-6q5-3 8 1 3 4-2 7l-7 5q-5 4-5 12l-1 8 7-4q5-3 8 2 5-1 8 5 6 0 7 7 2 9-6 16l-5 8z', 'M-9-43q3-1 7 0m8 14 3 6m6-3 2 6m5-3 1 5m-29 7q7 3 14 0'],
    flat: ['M-9 3l-2-17-4-16q-1-5 3-6 3-1 5 3l2 9-2-25q0-5 4-5t4 4l1 21 1-23q0-4 4-4 4 0 4 4l-1 22 3-22q1-5 5-4 4 1 3 6l-2 21 3-13q1-5 5-4 4 1 3 6l-4 23q-2 12-11 16l-5 7z', 'M1-30l1 8m8-8v8m9-8-1 9'],
    thumbUpEdge: ['M5 8q-10 2-17 0l-16-5q-6-2-5-7 0-3 5-3l-5-3q-6-3-4-8 1-3 6-2l-3-4q-3-4 1-7 3-2 8 0l-1-2q-2-4 2-6 3-2 8 1l6 3-3-11q-2-8 4-10 6-1 9 7l5 14q9 5 11 13 3 12-3 22L9 8Z', 'M-27-7q9 3 18 1m-22-14q9 5 20 4m-14-15q7 5 15 6m10-10q4 6 4 12'],
    fist: ['M-8 6l-4-17q-2-11 4-17l7-6q6-4 10 1 5-3 9 1 5-2 9 3 5 0 6 7 1 13-8 20l-7 8z', 'M-1-27q6 1 8 6m3-10 4 9m5-8 4 9m-27 3q7 6 14 3'],
    thumb: ['M-9 6l-3-16q-3-11 2-19 4-6 9-5 4-4 9-1 5-3 10 1l4-15q2-6 7-4 5 2 4 8l-3 22q-2 14-12 22l-3 7z', 'M-3-28l1 7m9-9 2 8m8-8 2 8m-26 4q7 4 14 3'],
    shaka: ['M-7 6l-7-16-10-14-5-12q-2-6 3-8 5-2 8 4l6 12 7-8q4-4 9 0 5-4 10 0 5-2 9 4l9-12q4-5 8-2 4 3 1 8l-9 20-14 17-2 6z', 'M-8-26q2 4 7 6m3-13q1 6 5 10m7-10q1 5 5 9m-25 6q8 8 17 10'],
    split: ['M-9 6l-4-17-11-10q-4-4-1-8 3-4 8-2l9 7 9-31q2-5 7-4 5 1 3 7l-7 25q8-4 12 3 7-2 10 5 5 1 4 8-1 10-11 15l-5 4z', 'M-4-19q6-5 13-7m5 3 4 8m6-5 2 7'],
    pinch: ['M-8 6l-4-16q-3-11 3-20l10-12q4-3 10-2l10 3q5 3 4 7-2 4-7 2l-8-2-5 6 11 3q9 3 7 10-2 6-9 5l-5 10-1 6z', 'M8-15q-1-8 4-10m-12 7q1-7 6-11'],
    hook: ['M-9 6l-3-18q-2-10 3-18l7-12 13-11q4-4 8 0 3 4-1 8l-10 8-5 10 13-5q5-2 8 3 2 4-2 8l-7 5-1 11-4 11z', 'M3-22q3-5 9-6m-14 17 9-4'],
  };

  function hand(type, x, y, angle = 0, mirror = false, scale = 1, width = 1) {
    const [outline, creases] = poses[type];
    return `<g transform="translate(${x} ${y}) rotate(${angle}) scale(${(mirror ? -scale : scale) * width} ${scale})">
      <path d="${outline}" fill="${palette.skin}" stroke="${palette.ink}" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="${creases}" fill="none" stroke="${palette.detail}" stroke-width="1.65" stroke-linecap="round"/>
    </g>`;
  }

  function head(x, y, tilt, color = palette.motion) {
    return `<path d="M-11-6 0 0l-11 6" transform="translate(${x} ${y}) rotate(${tilt})" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  }

  function move(path, x, y, tilt, repeat = false) {
    return `<path d="${path}" fill="none" stroke="${palette.motion}" stroke-width="3" stroke-linecap="round"${repeat ? ' stroke-dasharray="4 4"' : ''}/>${head(x, y, tilt)}`;
  }

  function stationary(x, y) {
    return `<g transform="translate(${x} ${y})" stroke="${palette.steady}" stroke-width="2">
      <circle r="8" fill="#f7f4fb"/><path d="m-3.5-3.5 7 7m0-7-7 7"/>
    </g>`;
  }

  function distance(far) {
    const wrist = far ? 72 : 122;
    const start = far ? 151 : 156;
    return `${body(209)}${face(201, 'side')}${sleeve('184 139', far ? '147 162' : '153 180', `${wrist} 151`)}
      ${hand('thumbUpEdge', wrist, 151, -7, false, .83)}${sleeve('228 140', '243 183', '189 157')}${hand('fist', 190, 157, -65, true, .68)}
      ${stationary(194, 170)}${move(`M${start} 139 H${wrist + 13}`, wrist + 13, 139, 180)}`;
  }

  function aboveBelow(above) {
    const x = above ? 190 : 151;
    const right = above ? [111, 121] : [109, 160];
    const left = above ? [162, 160] : [161, 127];
    return `${body(x)}${face(x, above ? 'side' : 'front')}
      ${sleeve(`${x - 33} 139`, `${x - 54} 184`, right.join(' '))}${hand('flat', ...right, above ? 82 : 102, false, .68, .57)}
      ${sleeve(`${x + 31} 146`, `${x + 52} 180`, left.join(' '))}${hand('flat', ...left, -82, true, .68, .57)}
      ${above ? stationary(left[0] + 13, left[1] + 13) : ''}`;
  }

  function beside() {
    return `${body(151)}${face(151)}${sleeve('118 139', '97 163', '112 145')}${sleeve('184 139', '206 163', '175 145')}
      ${hand('flat', 111, 145, 178, false, .66)}${hand('flat', 175, 145, 187, true, .66)}
      ${stationary(175, 152)}${move('M126 162h31', 157, 162, 0)}`;
  }

  function around() {
    return `${body(153)}${face(153)}${sleeve('115 139', '94 138', '111 129')}${hand('point', 110, 128, 162, false, .77)}
      ${sleeve('187 143', '208 192', '170 187')}${hand('thumb', 170, 184, -8, true, .72)}${stationary(173, 193)}
      ${move('M179 144c39 6 37 36-3 39-44 5-55-22-33-37h11', 154, 146, 0)}`;
  }

  function today() {
    return `${body(164)}${face(164)}${sleeve('127 139', '90 162', '91 128')}${hand('shaka', 91, 128, -2, false, .83)}
      ${move('M89 96v57', 89, 153, 90)}`;
  }

  function dayOffset(tomorrow) {
    return `${body(179)}${face(178, 'side')}${sleeve('146 142', '88 175', '95 143')}${hand('thumb', 95, 143, 6, false, .8)}
      ${tomorrow ? move('M125 96q-15-12-42-6', 83, 90, 166) : move('M93 86q13-9 36 3', 129, 89, 15)}`;
  }

  function black() {
    return `${body(158)}${face(158)}${sleeve('118 140', '79 167', '87 133')}${hand('fist', 86, 131, -14, false, .76)}
      ${move('M110 103C92 79 105 37 146 33c74-7 83 80 9 81', 155, 114, 178)}`;
  }

  function brown() {
    return `${body(171)}${face(169)}${sleeve('134 145', '94 175', '119 142')}${hand('point', 119, 142, 4, true, .77)}
      ${move('M101 83v45', 101, 128, 90, true)}${head(101, 83, -90)}`;
  }

  function red() {
    return `${body(186)}${face(181, 'side')}${sleeve('145 143', '107 184', '118 133')}${hand('point', 117, 134, 30, false, .72)}
      ${move('M91 96h47', 138, 96, 0, true)}${head(91, 96, 180)}`;
  }

  function blue() {
    return `${body(161)}${face(161)}${sleeve('119 140', '93 176', '125 144')}
      ${hand('bentPoint', 125, 146, 12, false, .76, 1)}
      ${move('M181 101h-38', 143, 101, 180)}<circle cx="181" cy="101" r="3.4" fill="${palette.motion}"/>`;
  }

  function white() {
    return `${body(151)}${face(151)}${sleeve('115 143', '105 174', '145 147')}${hand('split', 144, 147, 26, false, .88)}`;
  }

  function green() {
    return `${body(151)}${face(151)}${sleeve('115 145', '91 150', '121 130')}${hand('point', 121, 130, 77, true, .87)}`;
  }

  function yellow() {
    const frame = (shift, pose) => `<g transform="translate(${shift} 45) scale(.64)">${body(92)}${face(91)}
      ${sleeve('54 144', '21 171', '38 132')}${hand(pose, 39, 132, 13, false, .95)}</g>`;
    return `${frame(21, 'pinch')}${frame(161, 'hook')}
      <circle cx="71" cy="32" r="13" fill="#e0ecde"/><circle cx="211" cy="32" r="13" fill="#e0ecde"/>
      <g fill="${palette.ink}" text-anchor="middle" font-size="14" font-family="system-ui, sans-serif" font-weight="700"><text x="71" y="37">1</text><text x="211" y="37">2</text></g>
      ${move('M124 128h32', 156, 128, 0)}`;
  }

  const scenes = {
    near: () => distance(false), far: () => distance(true), above: () => aboveBelow(true), below: () => aboveBelow(false),
    beside, around, today, tomorrow: () => dayOffset(true), yesterday: () => dayOffset(false), black, brown, blue, red, white, green, yellow,
  };

  function render(id) {
    if (!Object.hasOwn(scenes, id)) return '';
    return `<svg class="sign-kids-community-art" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
      <rect x="2" y="2" width="296" height="216" rx="22" fill="#f4f0fb" stroke="#d3c5e9" stroke-width="2"/>
      <circle cx="42" cy="38" r="14" fill="#ffdb85"/><circle cx="270" cy="60" r="7" fill="#96cdc0"/>
      <path d="M26 173h21m-10-10v20m223-153h20m-10-10v20" fill="none" stroke="#c1addc" stroke-width="2.5" stroke-linecap="round"/>
      ${scenes[id]()}
    </svg>`;
  }

  return { items, render };
})();
