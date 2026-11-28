const SignKidsConversationArt = (() => {
  const items = [
    ['peace', 'السلام عليكم', 'Peace be upon you', 235,
      'ابدأ بالكف اليمنى مفتوحة بجوار الجبهة والأصابع متقاربة ومائلة إلى أعلى. مدّ يدك إلى الأمام وأغلقها برفق، وحرّكها قليلًا صعودًا ونزولًا.',
      'Start with the open right hand by the forehead, fingers together and tilted up. Extend your hand forward, gently close it, and move it a little up and down.'],
    ['welcome', 'أهلًا وسهلًا', 'Welcome', 236,
      'قرّب يدك اليسرى مبسوطةً من الجانب الأيسر لجبهتك. في الوقت نفسه، مدّ يدك اليمنى إلى جانبك وكفّها نحو الأعلى.',
      'Place your open left hand by the left side of your forehead. At the same time, extend your right hand to the side with the palm up.'],
    ['friend', 'صديق', 'Friend', 235,
      'أمسك إحدى يديك بالأخرى أمام منتصف الصدر. اجعل الأصابع ملتفّة على اليد الأخرى كما في الرسم.',
      'Clasp one hand with the other in front of the middle of your chest. Curl the fingers around the other hand as shown.'],
    ['gift', 'هدية', 'Gift', 235,
      'قرّب يديك أمام خصرك وبينهما فراغ، والأصابع منحنية كأنك تمسك شيئًا. ادفع اليدين معًا قليلًا إلى الأمام.',
      'Hold your hands apart in front of your waist, fingers curved as if holding something. Move both hands a little forward together.'],
    ['me', 'أنا', 'I / me', 208,
      'مدّ سبابة يدك اليمنى واجعلها تشير إلى منتصف صدرك. اثنِ الأصابع الأخرى.',
      'Extend your right index finger, pointing it at the middle of your own chest. Curl the other fingers.'],
    ['you', 'أنتَ', 'You (masculine)', 208,
      'مدّ ذراعك اليمنى قليلًا إلى الأمام. أشِر بسبابتك نحو الشخص الذي تخاطبه واثنِ بقية الأصابع.',
      'Extend your right arm a little in front of you. Point with your index finger towards the person you are addressing and curl the other fingers.'],
    ['we', 'نحن', 'We', 208,
      'باعد بين سبابتك اليمنى وإبهامك واثنِ بقية الأصابع. ابدأ من يمين صدرك، ومرّر يدك في قوس يهبط في الوسط ويرتفع نحو يسارك.',
      'Keep your right index finger and thumb apart and curl the other fingers. From the right side of your chest sweep your hand down in an arc, then up towards your left.'],
    ['where', 'أين؟', 'Where?', 215,
      'في اللقطة الأولى، افتح يدك اليسرى ووجّه راحتها إلى أعلى. ضع أطراف أصابع اليمنى المنحنية على راحة اليسرى. في اللقطة الثانية، ارفع اليمنى وراحتها إلى الأمام وأصابعها متباعدة، واتبع السهم المقوّس.',
      'In the first panel, hold your left hand open with its palm up. Place the curved fingertips of your right hand on your left palm. In the second panel, lift your right hand with its palm forward and fingers spread, then follow the curved arrow.'],
    ['when', 'متى؟', 'When?', 215,
      'في اللقطة الأولى، أشِر بسبابة اليمنى إلى معصمك الأيسر. في اللقطة الثانية، ارفع اليمنى وراحتها إلى الأمام وأصابعها متباعدة، واتبع السهم المقوّس.',
      'In the first panel, point your right index finger at your left wrist. In the second panel, lift your right hand with its palm forward and fingers spread, then follow the curved arrow.'],
    ['no', 'لا', 'No', 215,
      'وجّه كفك اليمنى إلى الأمام. ارفع السبابة والخنصر واثنِ الوسطى والبنصر والإبهام، ثم حرّك اليد مسافة قصيرة نحو يمينك.',
      'Face your right palm forward. Raise the index and little fingers, fold the middle and ring fingers and thumb, then move the hand a short way to your right.'],
  ].map(([id, ar, en, page, arDescription, enDescription]) => ({
    id, group: 'conversation', ar, en, page, describe: [arDescription, enDescription],
  }));

  const ink = '#243952';
  const skin = '#e6a677';
  const skinShade = '#a35b44';
  const shirt = '#6686bb';
  const hair = '#49344a';
  const motion = '#a53258';
  const line = `fill="none" stroke="${ink}" stroke-linecap="round" stroke-linejoin="round"`;
  const handStyle = `fill="${skin}" stroke="${ink}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"`;

  function child(x, y, scale = 1, profile = false) {
    const sideFace = `<path d="M-32-3c0-21 15-35 34-35 20 0 34 14 34 32 0 17-10 31-27 38v2c-10 4-24 1-28-11l-4-11-11-1q-5-1-2-7z" fill="${skin}" stroke="${ink}" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M-30-5c-7-10 0-28 13-34 13-6 28-7 39 0 12 5 18 15 16 32q-1 11-11 21l-2-12-11 2-5-16c-17 6-27 1-31-3l-8 10z" fill="${hair}" stroke="${ink}" stroke-width="2.4"/>
      <path d="M-24-5q4-3 9-1m-5 24q5 2 8 0M19 10q7-4 7 3-1 6-6 7" ${line} stroke-width="1.8"/><circle cx="-19" cy="1" r="2.4" fill="${ink}"/>`;
    const frontFace = `<path d="M-31-4c-9-7-12 11-1 16M31-4c9-7 12 11 1 16" fill="${skin}" stroke="${ink}" stroke-width="2.6"/>
      <path d="M-31-5c0-19 10-31 31-31S31-24 31-5V6C31 23 14 35 0 35S-31 23-31 6Z" fill="${skin}" stroke="${ink}" stroke-width="2.6"/>
      <path d="M-31 4c-11-16-6-35 8-43 9-7 25-8 36-3 13 2 24 15 23 29L29 2l-6-17C11-7-9-9-17-18c-6 4-10 12-14 22Z" fill="${hair}" stroke="${ink}" stroke-width="2.4"/>
      <path d="M-19-4q6-3 12 0m14 0q6-3 12 0M0 10l-2 6m-7 4q8 6 17 0" ${line} stroke-width="1.8"/>
      <circle cx="-13" cy="3" r="2.4" fill="${ink}"/><circle cx="13" cy="3" r="2.4" fill="${ink}"/>`;
    return `<g transform="translate(${x} ${y}) scale(${scale})">
      <path d="M-49 129v-46c1-29 17-41 39-41H9c23 0 39 12 40 41v46Z" fill="${shirt}" stroke="${ink}" stroke-width="3"/>
      <path d="M-10 24v20c2 10 18 10 21 0V24" fill="#cd895f" stroke="${ink}" stroke-width="2.6"/>
      ${profile ? sideFace : frontFace}
      <path d="M16 65h15v11q-7 7-15 0z" fill="#f4ce70" stroke="${ink}" stroke-width="1.7"/>
    </g>`;
  }

  function sleeve(d, width = 25) {
    return `<path d="${d}" ${line} stroke-width="${width + 4}"/><path d="${d}" fill="none" stroke="${shirt}" stroke-width="${width}" stroke-linecap="round"/>`;
  }

  // The wrist is the origin so that hand orientation, arm placement and motion can be drawn independently.
  const shapes = {
    flat: 'M-9 4v-10l-4-9-2-8q-1-4 3-5 3 0 5 5l2 4-2-26q0-6 4-6 4 0 4 5v18l1-24q0-5 4-5 4 0 4 5l-1 25 2-22q1-4 5-4 4 1 3 6l-2 22 1-15q1-4 5-4 4 1 3 5l-2 19q0 9-8 17v7Z',
    fan: 'M-8 4v-9q-5-8-6-18l-4-13q-2-5 2-6 4-2 6 3l5 11-2-20q-1-5 3-6 5 0 5 5l2 19 3-22q1-5 5-4 4 1 3 6l-2 24 6-17q1-5 6-3 4 2 2 7l-6 25 6-9q3-4 6-2 3 2 1 6l-10 16-4 8z',
    fist: 'M-9 5v-10q-7-6-7-14v-9q0-5 5-6 3-4 8-2 4-4 9 0 5-2 10 2 5 2 5 8v10q-1 6-9 13v8z',
    point: 'M-9 4v-9q-7-7-7-15v-7q0-6 7-7 3-6 9-4 4-3 9-1l1-15q0-5 5-5 5 0 5 5l-1 26q4 3 3 9-2 8-10 15v8z',
    arcPoint: 'M-10 4v-8q-7-6-7-15l1-9q0-5 5-7 4-5 11-3 4-4 9-2l1-16q0-6 5-6 4 0 4 6l-1 28 7-7q4-4 7-1 3 3 0 7l-8 11q-3 10-13 15v7z',
    bent: 'M-10 3V-7q-6-7-6-16v-6q0-5 4-6 4 0 5 4v-9q0-5 5-5 4 0 5 5v-4q0-5 4-5 5 0 5 5v5q1-3 5-2 4 1 4 5l-1 11q5-3 8 0 3 3-1 7l-9 7-6 6v9z',
    horns: 'M-10 5v-9q-6-8-8-18l-5-18q-1-5 3-7 5-1 6 4l5 16q2-7 7-7 3-4 8-3 3-3 6-3l1-14q0-5 5-5 5 0 5 5l-1 31q0 14-9 21v7Z',
  };
  const palmLines = {
    flat: 'M-6-13q9-7 17-4m-11 6q8-2 10-7',
    fan: 'M-9-17q9-3 20 1m-8 1q9-4 12-9',
    fist: 'M-9-30v8m6-10v8m6-8v8m6-7v7m-15 11q8-1 15-5',
    point: 'M-9-28v8m6-13v9m6-10v8m-9 11q9-8 17-6',
    arcPoint: 'M-9-29v8m6-12v9m6-10v8m0 12q8-6 18-8',
    bent: 'M-9-30l1 9m6-15 1 11m6-16 1 12m6-12v11m-6 12q8 0 11-4',
    horns: 'M-6-27q6 0 5 7m5-11q6 0 5 8m-13 8q10-1 15-7',
  };

  function hand(kind, x, y, angle = 0, scale = 1, mirror = false, palm = true) {
    return `<g transform="translate(${x} ${y}) rotate(${angle}) scale(${mirror ? -scale : scale} ${scale})">
      <path d="${shapes[kind]}" ${handStyle}/>
      <path d="${palm ? palmLines[kind] : 'M-9-16q5-3 11-4m2 7 8-3'}" fill="none" stroke="${skinShade}" stroke-width="1.75" stroke-linecap="round"/>
    </g>`;
  }

  function arrow(d, ends, dash = false) {
    return `<g fill="none" stroke="${motion}" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round">
      <path d="${d}"${dash ? ' stroke-dasharray="3 5"' : ''}/>
      ${ends.map(([x, y, angle]) => `<path d="M-7-4l7 4-7 4" transform="translate(${x} ${y}) rotate(${angle})"/>`).join('')}
    </g>`;
  }

  const spreadPalmQuestion = () => `${child(103, 80, .78)}${sleeve('M77 125Q59 164 37 147', 19)}
    ${hand('fan', 40, 145, 0, .86)}${arrow('M77 116C77 72 12 76 12 112q0 10 7 16', [[19, 128, 55]], true)}`;

  const drawings = {
    peace: [
      () => `${child(101, 82, .8)}${sleeve('M70 127Q37 149 37 108', 21)}${hand('flat', 36, 108, 45, .83)}`,
      () => `${child(105, 82, .8, true)}${sleeve('M72 126Q53 137 40 143', 22)}${hand('fist', 39, 144, -93, .72, false, false)}
        ${arrow('M13 122v40', [[13, 122, -90], [13, 162, 90]], true)}`,
    ],
    welcome: () => `${child(178, 83)}${sleeve('M138 139Q114 185 83 156')}${sleeve('M215 143Q254 144 222 109')}
      ${hand('flat', 84, 157, -67, .91, false, true)}${hand('flat', 223, 112, -44, .9, true, false)}`,
    friend: () => `${child(150, 79)}${sleeve('M108 139Q91 172 132 163')}${sleeve('M192 142Q211 180 170 164')}
      <path d="M126 154l10-10c3-4 8-6 13-7l18-3c4-1 8 1 9 5 1 4-2 7-5 8l-12 4 8 7c5 4 4 10-1 13q-10 8-22 3l-11-5Z" ${handStyle}/>
      <path d="m177 158-10-8q-5-5-10-6l-14-5q-5-2-8 2-3 4 2 8l6 3-7-2q-5-1-7 3-1 4 3 6-4-1-6 3-1 4 3 7 2 6 9 7l11 1q10 1 17-5l10-7Z" ${handStyle}/>
      <path d="M137 156l14 5m-17 2 16 5m-14 3 11 4m9-29 9 5" fill="none" stroke="${skinShade}" stroke-width="1.8" stroke-linecap="round"/>`,
    gift: () => `${child(183, 77, 1, true)}${sleeve('M149 139Q128 158 98 147')}${sleeve('M216 145Q223 178 140 178')}
      ${hand('bent', 97, 145, -89, .93, false, true)}${hand('bent', 139, 179, -86, .96, true, false)}
      ${arrow('M67 113H39', [[39, 113, 180]])}${arrow('M102 151H78', [[78, 151, 180]])}`,
    me: () => `${child(165, 76)}${sleeve('M121 130Q78 158 121 160')}
      ${hand('point', 120, 160, 82, .9, false, false)}${arrow('M143 131h33', [[176, 131, 0]])}`,
    you: () => `${child(183, 77, 1, true)}${sleeve('M148 139Q128 179 86 165')}
      ${hand('point', 87, 164, -77, .9, false, false)}${arrow('M78 124H36', [[36, 124, 180]])}`,
    we: [
      () => `${child(88, 72, .85)}${sleeve('M53 121Q37 146 48 141', 21)}${hand('arcPoint', 48, 141, 91, .64, true, false)}
        ${arrow('M60 152q34 38 62-9', [[122, 143, -58]])}`,
      () => `${child(77, 72, .85)}${sleeve('M43 122Q41 156 81 151', 21)}${hand('arcPoint', 80, 151, 72, .69, false, false)}`,
    ],
    where: [
      () => `${child(88, 73, .82)}${sleeve('M120 120Q129 158 100 154', 19)}${hand('flat', 99, 154, -89, .79, true)}
        ${sleeve('M54 121Q30 126 52 124', 20)}${hand('bent', 52, 124, 139, .75, false, false)}`,
      spreadPalmQuestion,
    ],
    when: [
      () => `${child(86, 73, .82)}${sleeve('M119 120Q128 161 82 157', 20)}${hand('fist', 83, 157, -85, .75, true, false)}
        ${sleeve('M52 120Q23 121 51 128', 19)}${hand('point', 49, 128, 136, .72, false, false)}`,
      spreadPalmQuestion,
    ],
    no: () => `${child(178, 79)}${sleeve('M136 142Q91 184 81 141')}${hand('horns', 80, 143, -5, 1.08)}
      ${arrow('M108 72H56', [[56, 72, 180]])}`,
  };

  function render(id) {
    if (!Object.hasOwn(drawings, id)) return '';
    const picture = drawings[id];
    const singleBackground = '<circle cx="41" cy="38" r="12" fill="#ffdd87"/><circle cx="258" cy="48" r="8" fill="#a4dccc"/><path d="M249 166h20m-10-10v20M30 180h14m-7-7v14" fill="none" stroke="#b8a6d8" stroke-width="3" stroke-linecap="round"/>';
    const drawing = typeof picture === 'function' ? `${singleBackground}${picture()}` : picture.map((step, index) => `<g transform="translate(${index * 146 + 5} 6)">
      <rect x="2" y="2" width="140" height="204" rx="14" fill="${index === 0 ? '#f8f1ff' : '#e8f5f2'}" stroke="#c2b6d8" stroke-width="1.5"/>
      <circle cx="19" cy="19" r="10" fill="#455b83"/><text x="19" y="23" text-anchor="middle" fill="white" font-family="sans-serif" font-size="11" font-weight="700">${index + 1}</text>
      ${step()}
    </g>`).join('');
    return `<svg class="sign-kids-word-art" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="296" height="216" rx="20" fill="#f3f1ff" stroke="#c3b8dc" stroke-width="2"/>
      ${drawing}
    </svg>`;
  }

  return { items, render };
})();
