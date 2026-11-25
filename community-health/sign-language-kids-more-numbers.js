const SignKidsMoreNumbers = (() => {
  const skin = '#ffc392';
  const lighterSkin = '#ffcfaa';
  const outline = '#673e35';
  const crease = '#ad6c50';
  const nail = '#ffe1cd';
  const movement = '#a83e28';

  // PDF viewer pages 239–242, with movement conventions on page 11.
  const records = [
    ['zero', 0, 239, 'قرّب طرف السبابة من طرف الإبهام. اثنِ الأصابع الثلاثة الباقية نحو الكف.', 'Bring the tips of your index finger and thumb together. Curl the other three fingers towards your palm.'],
    ['six', 6, 240, 'اثنِ رسغك بحيث تتجه السبابة إلى أسفل، ومدّ الإبهام جانبًا. اثنِ الأصابع الثلاثة الباقية.', 'Bend your wrist so your index finger points down. Extend your thumb to the side and curl the remaining three fingers.'],
    ['eight', 8, 240, 'أمِل رسغك إلى أسفل ومدّ السبابة والوسطى متباعدتين. اثنِ الأصابع الباقية.', 'Tilt your wrist down and extend your index and middle fingers apart. Curl the remaining fingers.'],
    ['nine', 9, 240, 'اثنِ رسغك واجمع أصابعك الأربع، واجعل الإبهام يشير إلى أسفل كما في الرسم الجانبي.', 'Bend your wrist, curl all four fingers together and point your thumb down, as in the side view.'],
    ['eleven', 11, 240, 'مدّ السبابة إلى الأمام واثنِ بقية الأصابع. ارفع اليد في قوس قصير إلى أعلى وباتجاهك.', 'Extend your index finger forwards and curl the others. Move your hand briefly upwards and back towards you in an arc.'],
    ['twelve', 12, 241, 'مدّ السبابة والوسطى متباعدتين إلى الأمام. ارفع اليد في قوس قصير إلى أعلى وباتجاهك.', 'Extend your index and middle fingers apart in front of you. Move your hand briefly upwards and back towards you in an arc.'],
    ['thirteen', 13, 241, 'مدّ السبابة والوسطى والبنصر إلى الأمام. ارفع اليد في قوس قصير إلى أعلى وباتجاهك.', 'Extend your index, middle and ring fingers forwards. Move your hand briefly upwards and back towards you in an arc.'],
    ['fourteen', 14, 241, 'مدّ أربعة أصابع إلى الأمام والإبهام مثني. ارفع اليد في قوس قصير إلى أعلى وباتجاهك.', 'Extend four fingers forwards with your thumb folded. Move your hand briefly upwards and back towards you in an arc.'],
    ['fifteen', 15, 241, 'افتح أصابع اليد الخمسة ومدّ اليد إلى الأمام. ارفعها في قوس قصير إلى أعلى وباتجاهك.', 'Spread all five fingers and reach forwards. Move your hand briefly upwards and back towards you in an arc.'],
    ['sixteen', 16, 241, 'ثبّت يدك اليسرى مفتوحة على جانبها والإبهام إلى أعلى. ارفع إبهام اليمنى وحده، ثم حرّك اليمنى إلى يمينك.', 'Keep your left hand open and edge-on with its thumb up. Raise only the right thumb, then move your right hand towards your right.'],
    ['seventeen', 17, 241, 'ثبّت يدك اليسرى مفتوحة على جانبها. مدّ الإبهام والسبابة في اليمنى كما في الرسم، ثم حرّك اليمنى إلى يمينك.', 'Keep your left hand open and edge-on. Extend the right thumb and index finger as shown, then move your right hand towards your right.'],
    ['eighteen', 18, 242, 'ثبّت يدك اليسرى مفتوحة على جانبها. مدّ الإبهام والسبابة والوسطى في اليمنى، ثم حرّك اليمنى إلى يمينك.', 'Keep your left hand open and edge-on. Extend your right thumb, index and middle fingers, then move your right hand towards your right.'],
    ['nineteen', 19, 242, 'ثبّت يدك اليسرى مفتوحة على جانبها. مدّ الإبهام والسبابة والوسطى والبنصر في اليمنى، ثم حرّك اليمنى إلى يمينك.', 'Keep your left hand open and edge-on. Extend your right thumb, index, middle and ring fingers, then move your right hand towards your right.'],
    ['twenty', 20, 242, 'افتح السبابة والوسطى في يمناك واثنِ بقية الأصابع. حرّك اليد في قوس إلى يمينك كما يوضح السهم.', 'Spread your right index and middle fingers and curl the others. Move your hand in an arc towards your right, following the arrow.'],
  ];
  const items = records.map(([id, value, sourcePage, ar, en]) => ({
    id, ar: String(value), en: String(value), group: 'numbers', sourcePage, describe: [ar, en],
  }));

  function skinPath(d, fill = skin) {
    return `<path d="${d}" fill="${fill}" stroke="${outline}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  }

  function lines(d) {
    return `<path d="${d}" fill="none" stroke="${crease}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;
  }

  function sleeve(d, fill = '#247f7a') {
    return `<path d="${d}" fill="${fill}" stroke="#165252" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>`;
  }

  function arrow(d, tip) {
    return `<path d="${d}" fill="none" stroke="${movement}" stroke-width="4.6" stroke-linecap="round"/><path d="${tip}" fill="${movement}"/>`;
  }

  function zero() {
    return `${sleeve('M109 210l8-28 52 7-3 21z')}
      ${skinPath('M115 182q3-20 2-38-2-14-6-27-3-10 2-18 6-9 15-4-1-10 6-16 8-6 15 1-1-11 6-16 8-5 15 2l2 4q2-12 11-17 8-4 15 2 6 6 7 14 3 11-2 22 0 13-5 24-2 14-13 29-8 13-13 22l-4 23z')}
      ${skinPath('M161 128q-8-5-9-13-2-7 2-12 5-5 11 0l4 4q4-12 8-21l5-13q3-8 9-6 6 3 4 11l-1 13q3 10-1 19-5 14-12 27', lighterSkin)}
      ${lines('M128 96q5 3 6 10l3 12m12-37q6 5 6 15m15-30q3 4 4 9m-56 34q7 1 10 8m25 31q7-10 18-9')}
      <path d="M183 77q-4 4-5 9 5-1 7-6z" fill="#fff4df" stroke="${crease}" stroke-width="1.2"/>`;
  }

  function downHand(twoFingers) {
    const thumb = twoFingers ? 'Q197 99 197 113' : 'q14 2 23-6 6-6 10-4 8 4 1 13-10 12-24 12';
    const extended = twoFingers ? 'q12 23 20 52 3 12-5 15-8 3-12-9l-15-36 3 48q1 12-8 12-8 0-9-11l-5-39' : 'l9 49q2 11-6 13-8 2-10-9l-9-39';
    return `${sleeve('M39 158l-2-37 65-24 21 33-38 24z')}
      ${skinPath(`M94 101q9-22 34-24 17-1 32 4l25 6 ${thumb} ${extended}
        q-4 7-11 5-6-1-8-8-4 8-12 5-6-2-9-10-5 5-11 1-6-4-9-14Q113 115 102 114Q96 108 94 101z`)}
      ${lines('M116 96q12-8 26-7m-9 38q4 10 10 17m7-25q4 13 10 22')}
      ${twoFingers ? `<path d="M180 182v8m29-20 3 6" stroke="${nail}" stroke-width="4" stroke-linecap="round"/>` : `<path d="M197 153l1 6" stroke="${nail}" stroke-width="4" stroke-linecap="round"/>`}`;
  }

  function nine() {
    return `${sleeve('M195 103l70 33 3 51-83-49z')}
      ${skinPath('M214 112q-11-14-34-17-27-6-56-1-17 2-29 12l-15 15q-8 8-6 17 2 11 14 17l14 3-2 10q-1 12 6 14 7 2 12-8l11-24 16-11 38 5q21-6 31-32z')}
      ${lines('M89 133q9-10 18-9 7 2 6 9-1 6-7 8l-10 3m14-28q8-8 15-4m4 1q9-6 16-2m-21 29q5-3 14-4m34-32q16 3 23 9')}`;
  }

  const fingerHeights = [43, 50, 43, 34];
  const fingerTips = [-26, -7, 12, 33];
  function spreadHand(count, thumbOpen, palm = false) {
    const fingers = fingerHeights.map((height, index) => {
      const start = -25 + index * 15;
      if (index >= count) return `L${start - 6} -5 q0-6 6-6t6 6`;
      const tip = fingerTips[index] + (palm ? (index === 0 ? -8 : 9) : 0);
      return `L${start - 6} -7 Q${tip - 6} -26 ${tip - 6} ${-height + 6}q0-6 6-6t6 6 Q${tip + 7} -25 ${start + 6} -7`;
    }).join(' ');
    const thumb = thumbOpen ? 'Q-38 18-49 7 q-4-5 0-10 5-4 10 1l9 10q2-7 2-14' : 'q-9-3-7-12l6-12';
    const orientationDetails = palm
      ? lines('M-19 32q12-5 17-19m-12 28q11-8 28-8m-10-12q7 5 13 5')
      : `${lines('M-19 33q13-5 28-3m-22 8q8-3 15-2')}${fingerTips.slice(0, count).map((tip, i) => `<path d="M${tip} ${-fingerHeights[i] + 4}v6" stroke="${nail}" stroke-width="4" stroke-linecap="round"/>`).join('')}`;
    return `<g${palm ? ' transform="scale(-1 1)"' : ''}>
      ${sleeve('M-15 49h32l4 13h-40z')}
      ${skinPath(`M-14 50 Q-15 39-23 30 ${thumb} ${fingers}Q36 4 31 25q-3 11-14 25z`)}
      ${orientationDetails}</g>`;
  }

  function profile() {
    return `${sleeve('M28 184q5-54 13-66 8-15 30-15 29 0 39 37l6 44z')}
      ${skinPath('M55 103l1-19 18 2 5 19z')}
      ${skinPath('M56 46q17-8 28 6 6 7 5 17l9 10-9 3q-1 15-14 17-20 0-24-26-2-17 5-27z')}
      <path d="M51 72q-9-11-4-22 6-14 24-15 17-1 22 17-11 6-26-1-4 12-12 13l2 9z" fill="#47363b"/>
      <circle cx="84" cy="70" r="2.3" fill="#263b54"/>`;
  }

  function upAndBack(value) {
    return `${profile()}
      ${sleeve('M85 140q14-7 23 10l16 22 42-27 16 22-49 34q-15 10-27-1l-34-32q-7-14 13-28z')}
      <g transform="translate(192 144) rotate(64) scale(.96)">${spreadHand(value - 10 >= 5 ? 4 : value - 10, value === 15)}</g>
      ${arrow('M237 119Q229 88 200 78', 'M197 77l20-3-8 17z')}`;
  }

  function standingLeft() {
    return `${sleeve('M212 147q19 10 39 21l-8 23-43-24z', '#39958c')}
      ${skinPath('M215 148q-14-6-20-17-5-14-5-28l-3-34q-1-10-7-10-5 1-7 8l-3 32-4 16q-3-5-10-5-8 1-8 8 0 4 6 7-8 1-8 8 0 6 8 8-7 1-6 8 1 5 9 6-7 3-3 8 5 8 21 10l23 0z', lighterSkin)}
      ${lines('M165 118q12 3 16 11m-19 3q10 2 14 7m-13 7q9 2 13 6m-13 7q8 3 14 3m6-56q-4 8-3 17')}`;
  }

  function rightEdge(count) {
    const cuff = sleeve('M50 177l21-25 29 19-21 26z');
    if (count >= 2) {
      const fingers = count === 2
        ? 'L77 78q-2-9 5-11 8-2 11 8l11 31-1-41q0-10 7-10 8 0 9 10l5 51'
        : 'L77 83q-2-9 5-11 7-2 11 8l8 26-1-31q-1-10 6-11 7 0 9 10l5 33 1-42q0-9 7-9 7 1 8 10l1 50';
      return `${cuff}${skinPath(`M71 162q-2-11 8-20l5-21 ${fingers}q7 13 3 27-4 18-19 25l-16 9q-17-2-31-15z`)}
        ${skinPath('M83 147q5-10 15-10l18 4q10 3 7 10-3 7-14 4l-11-4-10 4')}
        ${lines('M100 120q12-5 21 1m-16 39q8 3 16-1')}`;
    }
    const fingers = count === 0
      ? 'q14-1 19 7 3 6-3 12 6 5 4 12-2 5-8 7 2 8-7 11l-22 4'
      : 'q14-5 25-3 9 3 7 11-2 8-15 10 5 6 2 13-3 9-13 12l-19 4';
    return `${cuff}${skinPath(`M71 165q-1-11 8-19l4-18q-3-16-4-25l-2-26q-1-12 6-13 7-1 10 10l10 34 0 12 ${fingers}q-14-1-27-16z`)}
      ${lines('M94 139q11-5 20-3m-20 14q10-4 18-2m-22 16q9-5 17-4')}`;
  }

  function moveRight(count) {
    return `${standingLeft()}${rightEdge(count)}
      <circle cx="232" cy="127" r="9" fill="#fff4df" stroke="#337b72" stroke-width="2.4"/>
      <path d="m228 123 8 8m0-8-8 8" stroke="#337b72" stroke-width="2.3" stroke-linecap="round"/>
      ${arrow('M135 192H58', 'M47 192l18-9v18z')}`;
  }

  function twenty() {
    return `${sleeve('M176 207l15-26-27-30-24 13 10 43z')}
      <g transform="translate(149 122) rotate(-47) scale(1.03)">${spreadHand(2, false, true)}</g>
      ${arrow('M175 167Q145 199 106 187Q85 181 70 167', 'M63 161l21 4-10 14z')}`;
  }

  function render(id) {
    const item = items.find(entry => entry.id === id);
    if (!item) return '';
    const value = Number(item.ar);
    const shapes = {
      0: zero, 6: () => downHand(false), 8: () => downHand(true), 9: nine, 20: twenty,
    };
    const shape = shapes[value] ? shapes[value]() : value < 16 ? upAndBack(value) : moveRight(value - 16);
    return `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="20" y="8" width="260" height="204" rx="38" fill="#fff4df"/>
      <circle cx="151" cy="105" r="82" fill="#ffe8bc"/>
      <path d="M48 54l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#f3ac58"/>
      <path d="M256 56v12m-6-6h12" fill="none" stroke="#6eb6a0" stroke-width="3" stroke-linecap="round"/>
      <circle cx="240" cy="147" r="4" fill="#ef8c74"/>
      ${shape}
    </svg>`;
  }

  return { items, render };
})();
