const SignKidsWordArt = (() => {
  const outlines = {
    ink: '#192f48', skin: '#c98258', light: '#e2a477', shade: '#9b523c', shirt: '#168a87', darkShirt: '#16666d', hair: '#302b3a',
  };

  function sleeve(from, bend, to) {
    const curve = `M${from} Q${bend} ${to}`;
    return `<path d="${curve}" fill="none" stroke="${outlines.ink}" stroke-width="30" stroke-linecap="round"/>
      <path d="${curve}" fill="none" stroke="${outlines.shirt}" stroke-width="25" stroke-linecap="round"/>`;
  }

  function body(centre, shoulderY = 131) {
    return `<path d="M${centre - 52} 213v-35q0-39 30-44l16-3h12l17 3q28 5 29 44v35z" transform="translate(0 ${shoulderY - 131})" fill="${outlines.shirt}" stroke="${outlines.ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M${centre + 29} ${shoulderY + 46}v36" fill="none" stroke="${outlines.darkShirt}" stroke-width="3" stroke-linecap="round"/>
      <path d="M${centre - 8} ${shoulderY + 35}h16v13q-8 7-16 0z" fill="#ffd775" stroke="${outlines.ink}" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M${centre - 13} ${shoulderY - 17}v19q13 12 26 0v-19z" fill="${outlines.skin}" stroke="${outlines.ink}" stroke-width="3"/>`;
  }

  function frontFace(x, y, tilt = 0) {
    return `<g transform="translate(${x} ${y}) rotate(${tilt})">
      <path d="M-30-1c-16-8-14 18 0 16m60-16c16-8 14 18 0 16" fill="${outlines.skin}" stroke="${outlines.ink}" stroke-width="3"/>
      <path d="M-30-7q0-34 30-33t30 33v19q0 27-30 32-30-5-30-32z" fill="${outlines.light}" stroke="${outlines.ink}" stroke-width="3"/>
      <path d="M-31-4q-8-24 10-34 7-13 19-6 17-7 24 8 15 1 11 31l-9-3-3-15q-16 13-34 4l-13 14z" fill="${outlines.hair}" stroke="${outlines.ink}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M-20-5q7-4 13-1m14 0q6-3 13 1" fill="none" stroke="${outlines.ink}" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="-13" cy="3" r="2.9" fill="${outlines.ink}"/><circle cx="13" cy="3" r="2.9" fill="${outlines.ink}"/>
      <path d="M0 9l-2 8h4m-9 8q7 6 14 0" fill="none" stroke="${outlines.shade}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
  }

  function profile(x, y) {
    return `<g transform="translate(${x} ${y})">
      <path d="M-24 30q-12-13-9-34 0-30 28-33 24-2 35 16l2 19 10 12q2 4-4 5l-8 1q2 18-8 23-18 8-33-2z" fill="${outlines.light}" stroke="${outlines.ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M-32 14q-12-31 6-46 8-13 26-9 16-1 27 13l-7 8q-21 10-40 4l-5 26z" fill="${outlines.hair}" stroke="${outlines.ink}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M-13 7q-14-9-14 4 0 10 12 10m35-23q5-3 10-1m-1 28q-4 2-8 1" fill="none" stroke="${outlines.ink}" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="25" cy="5" r="2.8" fill="${outlines.ink}"/>
    </g>`;
  }

  function openHand(x, y, turn, width = 1, showPalm = false) {
    return `<g transform="translate(${x} ${y}) rotate(${turn}) scale(${width} 1)">
      <path d="M-8 4l-1-14-4-12-1-18q0-4 4-4h1l1 19-1-25q0-4 4-4 4 0 4 4v22l1-28q0-4 4-4t4 4l-1 28 2-23q1-4 5-3 4 1 3 5l-3 29 5-9q2-3 6-1 3 2 1 5l-8 17-8 9v6z" fill="${outlines.light}" stroke="${outlines.ink}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="${showPalm ? 'M-4-14q10-3 10-10m-10 15q7 1 11-6' : 'M-7-24v4m6-8v8m7-8v9'}" fill="none" stroke="${outlines.shade}" stroke-width="2" stroke-linecap="round"/>
    </g>`;
  }

  function thankYou() {
    return `${body(185)}${frontFace(183, 82, -4)}${sleeve('150 147', '97 171', '105 122')}
      ${openHand(106, 121, 45, .73)}`;
  }

  function please() {
    return `${body(184)}${frontFace(183, 82)}${sleeve('149 148', '126 181', '88 156')}
      ${openHand(88, 156, -61, .82, true)}`;
  }

  function sleep() {
    return `${body(163)}${frontFace(161, 82, -20)}${sleeve('131 149', '110 190', '127 136')}
      ${openHand(128, 136, -23, .65)}`;
  }

  function here() {
    return `${body(178)}${frontFace(179, 81)}${sleeve('143 145', '95 169', '109 135')}
      <path d="M103 132q4-11 16-12 15 0 27 10l8 10 5 26q1 5-4 6-5 0-6-5l-4-19-5-3 3 8q2 5-2 7-4 1-7-4l-4-6q1 7-4 8-5 0-8-9-2 3-6 2-6-1-5-9l-10-1z" fill="${outlines.light}" stroke="${outlines.ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M116 142q6-5 12-2m4-2 7 6" stroke="${outlines.shade}" stroke-width="2.3" stroke-linecap="round" fill="none"/>`;
  }

  function there() {
    return `${body(104)}${profile(102, 83)}${sleeve('118 154', '143 184', '168 151')}
      <path d="M159 149l12-14q7-9 17-13l44-21q5-2 7 3 2 4-3 7l-28 16q6 1 6 6-1 5-5 5 2 5-3 8l-5 1q-2 6-9 7l-11 1-10 8z" fill="${outlines.light}" stroke="${outlines.ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M181 142q6-9 15-8l13 4m-15 3 8 5" fill="none" stroke="${outlines.shade}" stroke-width="2.3" stroke-linecap="round"/>
      <path d="M214 85h44m-10-9 11 9-11 9" fill="none" stroke="#9b333f" stroke-width="4.2" stroke-linejoin="round" stroke-linecap="round"/>`;
  }

  function water() {
    return `${body(187)}${frontFace(184, 80, -4)}${sleeve('153 148', '93 169', '115 132')}
      <path d="M109 132l6-14 4-14 5-12q3-7 8-5 3 1 2 6 3-10 9-8 5 2 3 9 4-7 9-5 4 2 1 9 5-5 9-2 3 3-1 7l9-2q6-2 7 3 2 4-4 6l-20 5q-7 10-18 13l-12 14z" fill="${outlines.light}" stroke="${outlines.ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M130 102l4-8m8 8 4-8m5 10 5-7m-25 15q12 5 20-1" fill="none" stroke="${outlines.shade}" stroke-width="2.3" stroke-linecap="round"/>`;
  }

  const illustrations = { 'thank-you': thankYou, please, sleep, here, there, water };

  function render(id) {
    if (!Object.hasOwn(illustrations, id)) return '';
    return `<svg class="sign-kids-word-art" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
      <rect x="2" y="2" width="296" height="216" rx="22" fill="#edf7ff" stroke="#b4d1e7" stroke-width="2"/>
      <circle cx="40" cy="40" r="13" fill="#ffd875"/><circle cx="267" cy="57" r="8" fill="#76c9c7"/><circle cx="260" cy="166" r="16" fill="#ffd9bd"/>
      <path d="M29 180h24m-12-12v24m206-164h18m-9-9v18" fill="none" stroke="#acd5e7" stroke-width="3" stroke-linecap="round"/>
      ${illustrations[id]()}
    </svg>`;
  }

  return { render };
})();
