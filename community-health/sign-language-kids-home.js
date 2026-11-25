const SignKidsHomeArt = (() => {
  const ink = '#22364d';
  const skin = '#ecb28a';
  const crease = '#9d5945';
  const sleeveColor = '#498f7b';
  const motionColor = '#963b49';

  function makeItem(id, ar, en, page, arabic, english, frames = 1) {
    return { id, group: 'home', ar, en, page, describe: [arabic, english], frames };
  }

  const items = [
    makeItem('mother', 'أم', 'Mother', 17,
      'ارفع سبابتك اليمنى قرب جانب فمك الأيمن واثنِ بقية الأصابع. تبقى السبابة متجهة إلى أعلى.',
      'Curl the other fingers of your right hand and point your index finger upwards beside the right corner of your mouth.'),
    makeItem('father', 'أب', 'Father', 17,
      'افصل السبابة والإبهام قليلًا قرب جانب أنفك الأيمن مع ثني بقية الأصابع. حرّك اليد صعودًا ونزولًا بحركة صغيرة متكررة.',
      'Hold the index finger and thumb slightly apart beside the right side of your nose. Keep the other fingers curled and move the hand a little up and down repeatedly.'),
    makeItem('sister', 'أخت', 'Sister', 17,
      'ابدأ بأطراف أصابع اليد اليمنى عند الصدغ الأيمن، ثم أنزلها بقوس قرب خدك. انتقل إلى مستوى وسطك، واجعل ظهر اليد إلى أعلى وحرك السبابة والوسطى صعودًا ونزولًا أكثر من مرة.',
      'Begin with the fingertips of your flat right hand at your right temple. Lower it in an arc beside your cheek. Then bring your hand to waist level, back of the hand up, and move the index and middle fingers up and down repeatedly.', 2),
    makeItem('brother', 'أخ', 'Brother', 18,
      'اجعل يدك اليمنى عند مستوى وسطك، وظهرها إلى أعلى. وجّه السبابة والوسطى إلى الأمام، ثم حرّكهما قليلًا إلى أعلى وأسفل أكثر من مرة.',
      'Hold your right hand at waist level with its back upwards. Point the index and middle fingers forward and move them a little up and down more than once.'),
    makeItem('grandmother', 'جدّة', 'Grandmother', 17,
      'ابدأ بأطراف أصابع اليد اليمنى عند صدغك الأيمن، ثم أنزلها بقوس قرب خدك. اقبض اليد وضعها تحت الذقن.',
      'Begin with the fingertips of your flat right hand at your right temple. Move down in an arc near your cheek, then make a fist under your chin.', 2),
    makeItem('grandfather', 'جدّ', 'Grandfather', 17,
      'اقبض يدك اليمنى وضعها تحت الذقن.',
      'Make a fist with your right hand and place it under your chin.'),
    makeItem('family', 'أسرة', 'Family', 17,
      'أمام أعلى صدرك، المس السبابة بالإبهام في كل يد على شكل حلقة. قرّب الحلقتين من بعضهما. ثم افتح الوضعية كما في الرسم الثاني، بحيث يظهر ظهر الكفين وتلتقي أطراف الأصابع في الوسط.',
      'At upper chest height, touch each index finger to its thumb to make two rings. Bring the rings together. Then open into the second pose with the backs of the hands facing out and the inner fingertips meeting in the middle.', 2),
    makeItem('girl', 'بنت', 'Girl', 18,
      'ضع أطراف أصابع اليد اليمنى قرب صدغك الأيمن، واليد شبه أفقية. أنزلها مباشرة بمحاذاة خدك في اتجاه السهم.',
      'Hold the flat fingers of your right hand near your right temple. Lower the hand straight down beside your cheek as shown by the arrow.'),
    makeItem('baby', 'رضيع', 'Baby', 18,
      'ضع الساعدين أمام البطن بحيث يتقاطعان. اجعل الكفين إلى أعلى، والساعد الأيمن أعلى من الأيسر، كأنك تحتضن رضيعًا.',
      'Cross your forearms in front of your tummy with both palms facing up. Keep the right forearm above the left, like holding a baby.'),
    makeItem('eat', 'يأكل', 'Eat', 219,
      'قرّب أطراف الأصابع من إبهام يدك اليمنى. حرّك هذا الشكل في مسار قصير ومقوّس باتجاه شفتيك.',
      'Bring the fingertips of your right hand towards its thumb. Move this shape along a short curve towards your lips.'),
    makeItem('drink', 'يشرب', 'Drink', 219,
      'كوّن بيدك اليمنى شكل كوب صغير. اجعل الأصابع متقاربة ومقوّسة، واترك فراغًا بينها وبين الإبهام. قرّب اليد من فمك في اتجاه السهم.',
      'Cup your right hand with the fingers curled together and a gap between the fingers and thumb. Move the hand towards your mouth as shown by the arrow.'),
    makeItem('bread', 'خبز', 'Bread', 63,
      'مدّ اليدين أمامك والأصابع متقاربة. اجعل كفًا فوق الأخرى ووجّه الكفين إلى بعضهما. حرّك اليدين كما يوضّح السهمان في الرسم.',
      'Hold both hands out in front with the fingers together. Face one palm towards the other with one hand above the other. Move the hands along the two curved arrows.'),
    makeItem('milk', 'حليب', 'Milk', 63,
      'اثنِ أصابع اليدين كقبضتين مرتخيتين، وحرّكهما قليلًا إلى أعلى وأسفل أكثر من مرة. بعدها مدّ إبهام اليد اليمنى وخنصرها، وقرّب طرف الإبهام من صدغك الأيمن.',
      'Make two loose fists and move them a little up and down more than once. Then extend the right thumb and little finger and bring the thumb tip to your right temple.', 2),
    makeItem('apple', 'تفّاح', 'Apple', 64,
      'قوّس أصابع يدك اليمنى كأنها تمسك تفاحة صغيرة. ابدأ قرب فمك، ثم حرّك اليد قليلًا إلى الخارج في اتجاه السهم المقوّس.',
      'Curve the fingers of your right hand as if holding a small apple. Start near your mouth, then move the hand a little away along the curved arrow.'),
    makeItem('cold-food', 'بارد', 'Cold', 65,
      'اقبض اليدين وارفعهما أمام أعلى صدرك. حرّك القبضتين قليلًا إلى الجانبين ثم أعِدهما، وكرّر الحركة.',
      'Make loose fists and hold them in front of your upper chest. Move them a little sideways and back, and repeat.'),
  ];

  // Every path is an original drawing of a gesture seen in the cited reference.
  // The origin of each hand is its wrist. Transforms position it in the viewer's space.
  const shapes = {
    index: ['M-10 6v-15q-4-7-3-13 0-4 4-4 1-5 6-4 1-5 6-3l2-16q0-4 4-4t4 4l-2 27 4-4q4-2 5 2l-4 12q-1 6-6 10v8z', 'M-9-26q1 4 5 5m3-8q0 5 4 6m4-4v7m-9 5q7 2 11-4'],
    pinch: ['M-11 5v-15q-7-9-6-17 0-6 6-7l7 2q2-6 8-5l14-3q5-1 6 3 1 3-3 5l-13 6-2 6 8-4q4-1 6 2 2 3-1 6l-9 8-6 5v8z', 'M-11-27l8 2m-5 3 8 2m-7 3 7 2m4-2 5-5'],
    flat: ['M-10 6v-14q-5-4-6-8l-4-13q-1-4 3-5 4-1 5 3l4 10-1-27q0-4 4-4 3 0 4 4l1 23v-28q0-4 4-4t4 4v28l1-25q0-4 4-3 4 0 4 4l-1 25 1-18q0-4 4-4t4 4l-1 25q-1 10-11 16v7z', 'M-6-17q6-4 12-5m-10 8q10 1 16-5'],
    flatEdge: ['M-9 6v-15q-4-5-4-10l-1-14q0-4 4-4l1-12q0-4 4-4 3 0 4 4 0-5 4-5 4 0 4 4 4-3 6 1l-2 31q0 8-7 15v9z', 'M-9-40l2 17m6-24v22m6-23-1 23'],
    fist: ['M-11 6v-13q-8-3-10-10-2-6 2-8-1-6 5-8 3-4 8-2 5-4 11 0 5-2 9 2 5 1 6 6 4 6-3 11l-4 8v14z', 'M-12-31q2 5 6 6m0-8q2 4 6 5m1-5q1 4 5 4m-17 6q7 6 15 3 7-2 10-7'],
    fork: ['M-11 5l-2-13q-7-5-7-14 0-6 6-7 4-4 9-2 5-3 11 0l6-5q4-2 6 1l2 6 9-2q5-1 5 3 0 4-4 5l-10 2v3l10 1q4 0 4 4 0 4-5 4l-15-1q-5 5-10 5V5z', 'M-13-25q5 3 10 2m2-2q4 3 9 2m9-6-1 7m-2 6q5 2 10 2'],
    cup: ['M-11 5l-3-13q-4-5-5-11l-1-9q0-7 7-10l10-4q3-1 6 1 4-1 6 2 4 0 6 3 5 1 5 6 0 4-4 4H6q-5 1-5 7 0 6 7 7l6-3q5-2 7 1 1 3-3 6L7 0 5 5z', 'M-11-33q8-3 16-3m-14 7q9-3 18-2m-18 7q9-3 19-2'],
    bite: ['M-12 6v-15q-7-5-8-12l1-11q2-7 10-10l10-2q8-2 12 2 4 3 2 7l-3 6q0 6-7 10l-6 4v21z', 'M-13-35q9-5 19-6m-17 10q10-6 18-6m-17 10q10-6 17-5m-20 10q4 4 9 1l11-7q4-3 5-7'],
    round: ['M-10 6l-2-15q-9-7-10-16l-1-14q0-6 5-7 4 0 5 5l2 14q3-4 3-10l-1-14q0-5 5-6 5 0 5 5v20q6-6 6-16l-1-8q0-5 5-5 5 0 5 5v22q6-4 7-13l1-7q1-5 6-4 4 1 3 6l-3 23 7-2q5-1 6 3 0 4-4 6l-12 5q-6 10-15 10v6z', 'M-9-23q9-5 15-2m-12 7q11-4 17-9'],
    ring: ['M-11 5v-12q-5-5-6-12l-3-23q0-5 4-5 4 0 4 4l2 15-1-22q0-4 4-4 4 0 4 4l1 19 2-19q0-4 4-4 4 0 4 4v21l3-9q3-7 9-6 5 1 6 5l4 11q4-2 6 1 3 3 0 5l-10 10q-4 4-11 4L8 5z M18-34q-7 7 0 12l5-4z', 'M-7-20q6-4 13-4m-11 9q8-3 14-9'],
    spread: ['M-10 5l-1-12q-6-5-7-13l-6-17q-1-4 3-5 4-1 6 3l6 13-1-24q0-4 4-4 4 0 4 4l2 22 1-30q0-4 4-4 4 0 4 4l-1 27 3-20q0-4 4-4 4 0 4 4l-2 24 9-12q3-4 6-1 3 3 0 7l-8 15q-5 8-15 14l-1 9z', 'M-4-20l6 3m2-13l5 3m4-4l4 3m-19 13q5 3 8 2'],
    thumbLittle: ['M-11 6l-1-12q-4-4-5-11l-4-29q0-5 5-5 4 0 5 4l3 19q2-6 6-6 4-1 7 3 4-4 8-1 3 2 2 7l-1 8 14-12q4-3 8 0 2 4-1 7L17-7q-4 6-11 8v5z', 'M-6-25q2 7 6 7m0-9q2 5 5 7m2-7q0 5 4 6m-10 8q7 2 13-3'],
  };

  function hand(shape, x, y, turn = 0, side = 1, zoom = 1) {
    const [silhouette, detail] = shapes[shape];
    return `<g transform="translate(${x} ${y}) rotate(${turn}) scale(${side * zoom} ${zoom})">
      <path d="${silhouette}" fill="${skin}" fill-rule="evenodd" stroke="${ink}" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="${detail}" fill="none" stroke="${crease}" stroke-width="1.7" stroke-linecap="round"/>
    </g>`;
  }

  function arm(ax, ay, elbowX, elbowY, wx, wy) {
    const d = `M${ax} ${ay}Q${elbowX} ${elbowY} ${wx} ${wy}`;
    return `<path d="${d}" fill="none" stroke="${ink}" stroke-width="27" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="${sleeveColor}" stroke-width="22" stroke-linecap="round"/>`;
  }

  function torso(x) {
    return `<path d="M${x - 63} 211v-28q2-36 26-49l23-10h28l23 10q24 13 26 49v28z"
      fill="${sleeveColor}" stroke="${ink}" stroke-width="2.8" stroke-linejoin="round"/>
      <path d="M${x - 13} 107v23q13 11 26 0v-23z" fill="${skin}" stroke="${ink}" stroke-width="2.5"/>
      <path d="M${x + 27} 169h15v13q-7 5-15 0z" fill="#fbd486" stroke="${ink}" stroke-width="2.3" stroke-linejoin="round"/>`;
  }

  function front(x) {
    return `${torso(x)}<g transform="translate(${x} 73)">
      <path d="M-29-3c-14-4-12 14 1 17m57-17c14-4 12 14-1 17" fill="${skin}" stroke="${ink}" stroke-width="2.7"/>
      <path d="M-30-10q0-31 30-32 30 1 30 32v19q0 31-30 35-30-4-30-35z" fill="${skin}" stroke="${ink}" stroke-width="2.8"/>
      <path d="M-31-6q-7-28 10-35 10-10 25-4 15-8 23 7 13 8 5 30l-7-5-4-16q-22 15-42 8l-3 15z" fill="#363041" stroke="${ink}" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M-20-3q7-3 12 0m16 0q5-3 12 0" fill="none" stroke="${ink}" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="-13" cy="4" r="2.6" fill="${ink}"/><circle cx="13" cy="4" r="2.6" fill="${ink}"/>
      <path d="M0 9l-2 9h4m-10 7q8 6 16 0" fill="none" stroke="${crease}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
  }

  function profile(x, direction = 1) {
    return `${torso(x)}<g transform="translate(${x} 73) scale(${direction} 1)">
      <path d="M21 31q11-16 8-39-4-27-26-34-25-2-33 20l-1 19-8 13q-2 4 4 5l6 1q0 18 15 22 22 8 35-7z" fill="${skin}" stroke="${ink}" stroke-width="2.8" stroke-linejoin="round"/>
      <path d="M28 9q8-21 1-36-10-20-32-17-22 1-29 21l9 4q19 5 29-6l12 7 4 26z" fill="#363041" stroke="${ink}" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M13 5q-9-7-12 1-2 9 8 12m-36-22q4-2 8 0m-12 29q5 3 12 0" fill="none" stroke="${crease}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="-21" cy="5" r="2.5" fill="${ink}"/>
    </g>`;
  }

  function arrow(curve, headX, headY, direction, tail) {
    return `<path d="${curve}" fill="none" stroke="${motionColor}" stroke-width="3.1" stroke-linecap="round"${tail ? ' stroke-dasharray="3.4 4.2"' : ''}/>
      <path d="M0 0l-9-4.5v9z" transform="translate(${headX} ${headY}) rotate(${direction})" fill="${motionColor}"/>${tail || ''}`;
  }

  function twoWay(x, fromY, toY, capped = false) {
    const returnHead = `<path d="M0 0l-9-4.5v9z" transform="translate(${x} ${fromY}) rotate(-90)" fill="${motionColor}"/>`;
    const ends = capped ? `<path d="M${x - 6} ${fromY - 3}h12m-12 ${toY - fromY + 6}h12" fill="none" stroke="${motionColor}" stroke-width="2"/>` : '';
    return arrow(`M${x} ${fromY + 3}v${toY - fromY - 6}`, x, toY, 90, returnHead + ends);
  }

  function temple(arc) {
    return `${front(164)}${arm(113, 151, 77, 141, 87, 82)}${hand('flatEdge', 88, 82, 74, 1, .81)}${arc
      ? arrow('M130 64q-24 20 2 48', 133, 113, 47)
      : arrow('M125 70v38', 125, 111, 90) + `<path d="M119 115h12" stroke="${motionColor}" stroke-width="2"/>`}`;
  }

  function brother() {
    return `${front(159)}${arm(108, 148, 76, 174, 112, 182)}${hand('fork', 106, 180, 31, 1, .86)}${twoWay(93, 172, 207)}${twoWay(159, 154, 195)}`;
  }

  function grandfather() {
    return `${front(160)}${arm(110, 153, 88, 183, 138, 144)}${hand('fist', 136, 144, 31, 1, .93)}`;
  }

  function familyRings() {
    return `${front(150)}${arm(102, 148, 80, 189, 111, 164)}${arm(198, 148, 216, 189, 189, 164)}
      ${hand('ring', 112, 166, 3, 1, .94)}${hand('ring', 188, 166, -3, -1, .94)}`;
  }

  function familyOpen() {
    return `${front(150)}${arm(102, 149, 88, 196, 117, 171)}${arm(198, 149, 212, 196, 183, 171)}
      ${hand('spread', 117, 171, 3, 1, .94)}${hand('spread', 183, 171, -3, -1, .94)}`;
  }

  function milkFirst() {
    return `${front(150)}${arm(101, 151, 64, 164, 92, 152)}${arm(199, 151, 236, 174, 208, 165)}
      ${hand('fist', 92, 153, -16)}${hand('fist', 208, 165, 16, -1)}${twoWay(123, 112, 155, true)}${twoWay(178, 122, 165, true)}`;
  }

  const drawings = {
    mother: [() => `${front(160)}${arm(111, 148, 81, 174, 137, 146)}${hand('index', 136, 147, -4)}`],
    father: [() => `${front(163)}${arm(112, 153, 76, 154, 118, 128)}${hand('pinch', 118, 128, 9, 1, .97)}${twoWay(143, 71, 105)}`],
    sister: [() => temple(true), brother],
    brother: [brother],
    grandmother: [() => temple(true), grandfather],
    grandfather: [grandfather],
    family: [familyRings, familyOpen],
    girl: [() => temple(false)],
    baby: [() => `${front(151)}${arm(203, 150, 218, 192, 124, 191)}${hand('flatEdge', 124, 193, -76, -1, .91)}
      ${arm(94, 146, 68, 185, 178, 170)}${hand('flatEdge', 178, 172, 76, 1, .91)}`],
    eat: [() => `${profile(183)}${arm(133, 154, 94, 185, 103, 137)}${hand('bite', 103, 139, 18, 1, .92)}
      ${arrow('M91 137q14-31 47-38', 140, 99, -14)}`],
    drink: [() => `${profile(183)}${arm(133, 151, 89, 175, 101, 133)}${hand('cup', 103, 135, 4, 1, .93)}
      ${arrow('M107 109l31-8', 141, 100, -15)}`],
    bread: [() => `${profile(113, -1)}${arm(145, 150, 177, 186, 205, 174)}${hand('flatEdge', 205, 173, 102, 1, .85)}
      ${arm(136, 147, 158, 169, 211, 145)}${hand('flatEdge', 211, 145, 82, -1, .89)}
      ${arrow('M265 124q-27-18-51 11', 212, 138, 122)}${arrow('M215 183q22 24 50-8', 267, 173, -46)}`],
    milk: [milkFirst, () => `${front(166)}${arm(116, 150, 75, 148, 95, 100)}${hand('thumbLittle', 97, 101, -12, 1, 1.02)}`],
    apple: [() => `${profile(181)}${arm(134, 151, 91, 174, 99, 146)}${hand('round', 98, 146, 11, 1, .89)}
      ${arrow('M137 91q-20-15-38 4', 96, 98, 136)}`],
    'cold-food': [() => `${front(150)}${arm(101, 149, 68, 183, 91, 162)}${arm(199, 149, 231, 183, 209, 162)}
      ${hand('fist', 92, 162, -10)}${hand('fist', 208, 162, 10, -1)}
      ${arrow('M68 111l41-8', 112, 102, -12, '<path d="M66 111l7-6 2 8z" fill="#963b49"/>')}
      ${arrow('M190 105l41 8', 234, 114, 12, '<path d="M188 105l10-3-2 8z" fill="#963b49"/>')}`],
  };

  function render(id, frameIndex) {
    const frames = Object.hasOwn(drawings, id) ? drawings[id] : null;
    if (!frames) return '';
    const showSingle = Number.isInteger(frameIndex) && frames[frameIndex];
    const contents = showSingle || frames.length === 1
      ? (showSingle || frames[0])()
      : `<rect x="8" y="23" width="138" height="179" rx="18" fill="#fff9e8"/>
        <rect x="154" y="23" width="138" height="179" rx="18" fill="#fff9e8"/>
        ${frames.map((frame, i) => `<g transform="translate(${i * 146 - 4} 70) scale(.54)">${frame()}</g>
          <circle cx="${i * 146 + 30}" cy="40" r="12" fill="#487c70"/>
          <text x="${i * 146 + 30}" y="45" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">${i + 1}</text>`).join('')}
        <path d="M144 108h12m-6-6 6 6-6 6" fill="none" stroke="#925c39" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>`;
    return `<svg class="sign-kids-word-art sign-kids-home-art" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
      <rect x="2" y="2" width="296" height="216" rx="22" fill="#fff2d8" stroke="#e5c895" stroke-width="2"/>
      <circle cx="38" cy="55" r="11" fill="#f6c871"/><circle cx="264" cy="63" r="7" fill="#81c2aa"/>
      <path d="M35 167v16m-8-8h16M260 150v14m-7-7h14" stroke="#deb580" stroke-width="3" stroke-linecap="round"/>
      ${contents}
    </svg>`;
  }

  return { items, render };
})();
