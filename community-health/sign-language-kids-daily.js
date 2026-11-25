const SignKidsDailyArt = (() => {
  const palette = {
    outline: '#24354c', skin: '#e5a173', crease: '#a05f48', hair: '#353146', clothing: '#17827c', shadow: '#136764', arrow: '#ab3449',
  };

  function arms(start, bend, wrist) {
    const d = `M${start} Q${bend} ${wrist}`;
    return `<path d="${d}" fill="none" stroke="${palette.outline}" stroke-width="27" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="${palette.clothing}" stroke-width="22" stroke-linecap="round"/>`;
  }

  function head(x, y, view, mood) {
    const lips = { happy: 'M-9 16q9 9 18 0', sad: 'M-8 20q8-6 16 0', afraid: 'M-4 19q1-7 5-5 4 2 2 7-5 3-7-2', neutral: 'M-7 17q7 4 14 0' };
    const brows = mood === 'sad' ? 'M-21-6l12-4m18 0 12 4' : 'M-20-7q6-3 12 0m15 0q6-3 12 0';
    if (view === 'front') {
      return `<g transform="translate(${x} ${y})" stroke="${palette.outline}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M-28 0q-12-8-11 6 0 10 12 11m55-17q12-8 11 6 0 10-12 11" fill="${palette.skin}"/>
        <path d="M-28-9q0-29 28-29t28 29v20q-1 23-28 30-27-7-28-30z" fill="${palette.skin}"/>
        <path d="M-29-4q-7-19 6-29 6-12 22-11 17-4 27 11 8 9 4 27l-7-6-3-12q-14 8-28 4-8 11-21 16z" fill="${palette.hair}"/>
        <path d="${brows} M0 5l-2 7h4" fill="none"/><circle cx="-13" cy="1" r="2.25" stroke="none" fill="${palette.outline}"/><circle cx="13" cy="1" r="2.25" stroke="none" fill="${palette.outline}"/>
        <path d="${lips[mood]}" fill="none" stroke="${palette.crease}"/>
      </g>`;
    }
    return `<g transform="translate(${x} ${y}) ${view === 'left' ? 'scale(-1 1)' : ''}" stroke="${palette.outline}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-28 30q-11-21-4-48 6-23 31-21 25 2 31 25l3 14 9 10q1 3-3 4l-7 1q-1 16-11 22-23 9-49-7z" fill="${palette.skin}"/>
      <path d="M-33 14q-7-17-3-29 4-22 20-24 15-8 31 3l11 12q-21 8-43-2l-6 31z" fill="${palette.hair}"/>
      <path d="M-15 8q-12-10-14 4 0 10 12 9m36-26q5-3 10 0m-9 28q5 3 10 0" fill="none"/>
      <circle cx="25" cy="3" r="2.2" stroke="none" fill="${palette.outline}"/>
    </g>`;
  }

  function person(x = 150, view = 'front', mood = 'neutral', y = 78) {
    return `<path d="M${x - 19} 127q-46 0-52 43l-2 45h146l-2-45q-6-43-52-43z" fill="${palette.clothing}" stroke="${palette.outline}" stroke-width="3"/>
      <path d="M${x - 53} 178l-2 29m106-29 2 29" fill="none" stroke="${palette.shadow}" stroke-width="3" stroke-linecap="round"/>
      <path d="M${x - 12} 109v23q12 10 24 0v-23z" fill="${palette.skin}" stroke="${palette.outline}" stroke-width="2.6"/>
      ${head(x, y, view, mood)}`;
  }

  // Each hand starts at its wrist and points right in local coordinates. Rotation and reflection set the pictured pose.
  const shape = {
    flat: ['M0-8Q12-14 20-12l16-2q4 0 4 3 3 1 1 4 3 2 0 5 2 2 0 5l-17 2-6 5q-6 3-9-1L0 8z', 'M23-7l15-2m-15 7 16-2M22 3l13-1'],
    point: ['M0-8l9-4 10 1 19-3q5 0 5 3 0 4-5 5l-14 3q8 0 5 6 4 4 0 7-6 6-16 2L0 8z', 'M18 0q4 5 9 4m-12 1q4 4 9 4'],
    pair: ['M0-9l12-4 8 2 16-7q4-2 6 1 1 3-2 5l-15 8 18-1q5-1 5 3 0 4-5 4l-20 2q6 1 5 5-2 7-14 6L0 8z', 'M14-1q4 5 10 5m-10 4q6 5 13 1'],
    fist: ['M0-9l13-5q7-4 13-1 7 1 6 8 3 3 0 7 1 6-4 9-7 5-14 2L0 9z', 'M15-3q4-4 9-3l6 3m-14 5q4-3 11-1m-9 7q6 1 10-2'],
    hook: ['M0-9l9-6q9-4 18-1l11 3q5 1 4 5-1 4-5 3l-12-2q-5 0-6 4 1 4 4 5l13 2q5 0 5 4-1 3-5 3l-17-2-7 4L0 8z', 'M13-6l5 4m-7 1 5 5'],
    spread: ['M0-8l9-7 6-10q2-4 5-2 4 2 2 6l-2 7 16-11q3-2 5 1 2 3-2 5L27-9l20-3q4 0 4 3t-4 4L30-2l17 5q3 1 2 4-1 3-5 2l-18-4 10 9q3 3 0 5-2 2-5-1l-14-9L0 8z', 'M17-8q5 3 5 10m1-9q3 0 5 5'],
    cupped: ['M0-10l9-3 3-5 8-6q5-3 7 0 1 2-2 4l-5 5 10-4q4-1 6 2 2 3-2 5l-7 4 8-2q5 0 5 4 0 2-4 4l-7 2 6 1q4 0 4 3-1 3-4 3l-12 2-8 4L0 8z', 'M14 1q8-7 15-8m-12 13 12-4'],
  };

  function hand(kind, x, y, rotation = 0, reflected = false, palm = false) {
    const [outline, folds] = shape[kind];
    return `<g transform="translate(${x} ${y}) rotate(${rotation}) ${reflected ? 'scale(1 -1)' : ''}" stroke-linejoin="round" stroke-linecap="round">
      <path d="${outline}" fill="${palette.skin}" stroke="${palette.outline}" stroke-width="2.6"/>
      <path d="${folds}${palm ? ' M6-3q5-6 12-4m-12 12q7 2 12-2' : ''}" fill="none" stroke="${palette.crease}" stroke-width="1.5"/>
    </g>`;
  }

  function arrow(path, ends, dashed = false) {
    return `<path d="${path}" fill="none" stroke="${palette.arrow}" stroke-width="3.4" stroke-linecap="round" ${dashed ? 'stroke-dasharray="4 4"' : ''}/>
      ${ends.map(([x, y, angle]) => `<path d="M0 0l-9-5v10z" transform="translate(${x} ${y}) rotate(${angle})" fill="${palette.arrow}"/>`).join('')}`;
  }

  const drawings = {
    happy: () => `${person(150, 'front', 'happy')}
      ${arms('106 144', '78 193', '98 166')}${arms('194 144', '223 193', '202 166')}
      ${hand('spread', 98, 166, -30)}${hand('spread', 202, 166, 210, true)}
      ${arrow('M147 184h-30m36 0h30', [[117,184,180],[183,184,0]])}`,
    sad: () => `${person(158, 'left', 'sad')}${arms('117 150', '88 166', '96 137')}
      ${hand('point', 96, 137, -52)}${arrow('M110 99l-20 18', [[90,117,138]])}`,
    afraid: () => `${person(150, 'front', 'afraid')}
      ${arms('105 148', '77 151', '103 156')}${arms('195 151', '202 198', '157 190')}
      ${hand('flat', 159, 190, 179, true, true)}${hand('pair', 103, 151, 72)}
      ${arrow('M133 155h18m-13 11h-15', [[151,155,0],[123,166,180]])}`,
    tired: () => `${person(172, 'left')}
      ${arms('208 143', '214 204', '103 186')}${hand('fist', 105, 189, 178, true)}
      ${arms('123 145', '94 173', '96 161')}${hand('fist', 98, 158, -68)}
      ${arrow('M111 155q7-11 14 0t14 0 14 0 14 0', [[167,155,45]])}`,
    hear: () => `${person(166, 'right')}${arms('119 146', '94 174', '113 140')}
      ${hand('cupped', 113, 140, -83, false, true)}`,
    wake: () => `${person(171)}${arms('126 145', '89 147', '107 98')}
      ${hand('hook', 107, 98, -12, false, true)}
      ${arrow('M145 78l4 27', [[145,78,-99],[149,105,81]])}`,
    open: () => `${person()}${arms('108 145', '106 196', '73 173')}${arms('192 145', '194 196', '227 173')}
      ${hand('flat', 74, 171, 195, true, true)}${hand('flat', 226, 171, -15, false, true)}
      ${arrow('M142 182q-24 12-48-3m64 3q24 12 48-3', [[94,179,-148],[206,179,-32]])}`,
    close: () => `${person()}${arms('107 144', '89 170', '109 177')}${arms('193 144', '211 170', '191 177')}
      ${hand('flat', 109, 177, 0)}${hand('flat', 191, 177, 180, true)}`,
    help: () => `${person(196, 'left')}${arms('215 152', '191 202', '122 188')}${hand('flat', 122, 188, 187, true, true)}
      ${arms('161 141', '145 172', '122 173')}${hand('flat', 122, 173, 173)}
      ${arrow('M119 152h-39', [[80,152,180]])}`,
    silent: () => `${person(143, 'right')}${arms('109 149', '140 189', '166 139')}
      ${hand('point', 166, 139, -78)}`,
    think: () => `${person(157, 'right')}${arms('112 145', '75 151', '92 116')}
      ${hand('point', 92, 116, -43)}${arrow('M99 104a17 17 0 1 1 16 15', [[115,119,173]])}`,
    football: () => `${person()}${arms('105 145', '96 156', '118 197')}${hand('fist', 118, 194, -27)}
      ${arms('195 145', '205 155', '167 170')}${hand('flat', 167, 170, 177)}
      ${arrow('M99 204q27 16 47-11', [[146,193,-55]])}`,
    basketball: () => `${person(176, 'left', 'neutral', 90)}
      ${arms('213 145', '191 199', '126 183')}${hand('cupped', 126, 183, 172, true, true)}
      ${arms('134 145', '112 80', '100 61')}${hand('cupped', 100, 61, 183, false)}
      ${arrow('M124 64q-12-31-44-22', [[80,42,162]])}`,
    'sports-field': () => `${person()}${arms('105 145', '64 142', '74 169')}${arms('195 145', '236 142', '226 169')}
      ${hand('point', 74, 169, 72)}${hand('point', 226, 169, 108, true)}`,
  };

  const entries = [
    ['happy', 'feelings', 'سعيد', 'Happy', 95, 'قرّب يديك المفتوحتين من صدرك وباعِد بين أصابعك. حرّك اليدين إلى الجانبين كما في السهمين.', 'Hold both open hands near your chest with the fingers spread. Move your hands out to the sides as shown.'],
    ['sad', 'feelings', 'حزين', 'Sad', 95, 'قرّب سبابة اليد اليمنى من جانب أنفك. حرّكها قليلًا إلى أسفل وبعيدًا عن الأنف.', 'Bring your right index finger beside your nose. Move it a little down and away.'],
    ['afraid', 'feelings', 'خائف', 'Afraid', 95, 'ثبّت كفّك اليسرى مفتوحة إلى أعلى. ضع السبابة والوسطى اليمنيين نحو الكف، وحرّكهما بحركة قصيرة ذهابًا وإيابًا.', 'Hold your left palm steady, facing up. Point your right index and middle fingers down to it and make a small shaking motion.'],
    ['tired', 'feelings', 'تعبان', 'Tired', 98, 'ضع ساعدك الأيسر أمامك. اجعل يدك اليمنى فوقه على شكل قبضة خفيفة، واتبع السهم المتموّج نحو جسمك.', 'Hold your left forearm across your body. Place your loosely closed right hand above it. Follow the wavy arrow towards your body.'],
    ['hear', 'actions', 'يسمع', 'Hear', 219, 'قرّب يدك اليمنى المفتوحة والمقوّسة قليلًا من أذنك اليمنى. دع الأصابع تشير لأعلى.', 'Cup your open right hand beside your right ear, with the fingers pointing up.'],
    ['wake', 'actions', 'يستيقظ', 'Wake up', 219, 'اجعل السبابة والإبهام في يدك اليمنى على شكل قوس صغير قرب طرف العين. لاحظ الحركة القصيرة أعلى وأسفل في الرسم.', 'Make a small C with your right thumb and index finger beside the outer corner of your eye. Follow the short up-and-down cue.'],
    ['open', 'actions', 'يفتح', 'Open', 220, 'افتح كفّيك نحو من أمامك، ثم ابعد اليدين عن بعضهما في قوسين صغيرين.', 'Face both open palms forward and move your hands apart in two small arcs.'],
    ['close', 'actions', 'يغلق', 'Close', 220, 'ضع يديك أفقيّتين أمام الصدر بحيث تتلاقى أطراف الأصابع في الوسط، ويظهر ظهر اليدين.', 'Hold your hands horizontally in front of your chest. Bring the fingertips together at the middle, with the backs of your hands showing.'],
    ['help', 'actions', 'يساعد', 'Help', 222, 'افتح يدك اليسرى والكفّ إلى أعلى. ضع يدك اليمنى فوقها والكفّ إلى أسفل، ثم ادفعهما معًا قليلًا نحو الأمام.', 'Hold your left palm facing up. Place your right hand on top, palm down, then move both hands a little forward.'],
    ['silent', 'actions', 'يسكت', 'Be quiet', 219, 'ارفع سبابة اليد اليمنى عموديًّا أمام شفتيك مع ثني باقي الأصابع.', 'Hold your right index finger upright in front of your lips. Curl the other fingers.'],
    ['think', 'actions', 'يفكّر', 'Think', 222, 'قرّب سبابة اليد اليمنى من جانب رأسك. حرّكها في دائرة صغيرة باتجاه السهم.', 'Bring your right index finger beside your temple. Move it in a small circle in the arrow’s direction.'],
    ['football', 'play', 'كرة القدم', 'Football', 151, 'ثبّت يدك اليسرى مفتوحة وأفقية أمام جسمك. حرّك يدك اليمنى المنحنية من أسفلها في القوس المبيّن.', 'Keep your left hand open and flat in front of your body. Curve your bent right hand up underneath it as shown.'],
    ['basketball', 'play', 'كرة السلة', 'Basketball', 151, 'اترك يدك اليسرى مفتوحة قرب الخصر وارفع اليمنى فوق رأسك. اثنِ رسغ اليمنى واتبع القوس القصير نحو الأمام.', 'Keep your left hand open near your waist. Raise your right hand above your head, bend the wrist, and follow the short forward arc.'],
    ['sports-field', 'play', 'ملعب', 'Sports field', 153, 'ارفع مرفقيك إلى الجانبين. وجّه اليدين إلى أسفل واجعل السبابتين تشير كلّ منهما إلى الأرض.', 'Hold your elbows out at the sides. Bend both wrists so the index fingers point down.'],
  ];

  const items = entries.map(([id, topic, ar, en, page, descriptionAr, descriptionEn]) => ({
    id, group: 'daily', topic, ar, en, page, describe: [descriptionAr, descriptionEn],
  }));

  function render(id) {
    if (!Object.hasOwn(drawings, id)) return '';
    return `<svg class="sign-kids-daily-art" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="296" height="216" rx="24" fill="#f4effd" stroke="#d3c9e5" stroke-width="2"/>
      <circle cx="43" cy="40" r="14" fill="#ffd987"/><circle cx="256" cy="56" r="8" fill="#84c3bb"/><circle cx="264" cy="180" r="17" fill="#ffdbce"/>
      <path d="M24 156h22m-11-11v22m210-67h20m-10-10v20" fill="none" stroke="#c8b5e5" stroke-width="3" stroke-linecap="round"/>
      ${drawings[id]()}
    </svg>`;
  }

  return { items, render };
})();
