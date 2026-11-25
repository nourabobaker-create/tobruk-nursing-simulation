const SignKidsMoreLetters = (() => {
  // Hand configurations as seen by the learner, based on the Libyan dictionary, PDF page 12.
  // The standard 28 letters appear in rows 1–4. None of the poses in those rows has a movement arrow.
  const data = [
    ['jim', 'ج', 'Jim', 'أرِ زميلك جانب يدك. اثنِ الأصابع الأربعة معًا نحو الجانب وأبقِ طرف الإبهام تحتها مع فراغ صغير.', 'Show the side of your hand. Bend the four fingers together to the side and keep the thumb tip just below them with a small gap.'],
    ['ha', 'ح', 'Ha', 'أرِ زميلك جانب يدك واثنِ الأصابع الأربعة معًا. ارفع الإبهام بمحاذاة الكف ليبدو أعلى اليد مثل قوس.', 'Show the side of your hand with the four fingers bent together. Keep your thumb upright alongside your palm so the top looks like an arc.'],
    ['kha', 'خ', 'Kha', 'أرِ زميلك جانب يدك واجعل الأصابع الأربعة مثنية قرب مستوى أفقي. ارفع الإبهام فوقها قليلًا.', 'Show the side of your hand with the four fingers bent almost horizontally. Raise your thumb slightly above them.'],
    ['dal', 'د', 'Dal', 'أرِ زميلك جانب يدك. اترك فراغًا بين السبابة والإبهام المائلين، واطوِ الأصابع الثلاثة الأخرى.', 'Show the side of your hand. Leave a gap between the angled index finger and thumb. Curl the other three fingers.'],
    ['dhal', 'ذ', 'Dhal', 'أرِ زميلك جانب يدك. ارفع الوسطى فوق السبابة قليلًا، واترك الإبهام مفتوحًا أسفلهما واطوِ الإصبعين الآخرين.', 'Show the side of your hand. Raise the middle finger slightly above the index finger. Leave the thumb open below them and curl the other two fingers.'],
    ['ra', 'ر', 'Ra', 'أرِ زميلك جانب يدك واطوِ الأصابع الأخرى. ارفع السبابة واثنِ طرفها نحو الجانب.', 'Show the side of your hand with the other fingers curled. Raise the index finger and bend its tip to the side.'],
    ['zay', 'ز', 'Zay', 'أرِ زميلك جانب يدك. ارفع السبابة والوسطى متقاربتين ومائلتين قليلًا. اطوِ البنصر والخنصر والإبهام.', 'Show the side of your hand. Raise the index and middle fingers close together at a slight angle. Fold the ring finger, little finger and thumb.'],
    ['sad', 'ص', 'Sad', 'واجه زميلك براحة اليد. اقبض الأصابع الأربعة وضمّ الإبهام فوقها.', 'Face your partner with your palm. Curl the four fingers and fold the thumb over them.'],
    ['dad', 'ض', 'Dad', 'واجه زميلك براحة اليد. اقبض الأصابع الأربعة ومدّ الإبهام مائلًا إلى الجانب.', 'Face your partner with your palm. Curl the four fingers and extend the thumb diagonally to the side.'],
    ['tah', 'ط', 'Tah', 'ارفع السبابة مستقيمة. صِل طرف الوسطى بطرف الإبهام لتصنع حلقة جانبية صغيرة، واطوِ البنصر والخنصر.', 'Point your index finger straight up. Touch the middle fingertip to the thumb tip to make a small loop at the side. Fold the ring and little fingers.'],
    ['zah', 'ظ', 'Zah', 'ارفع السبابة. مدّ الوسطى نحو الجانب واجعل طرفها عند جانب الإبهام المرفوع قليلًا. اطوِ البنصر والخنصر.', 'Point your index finger up. Extend the middle finger to the side with its tip meeting the side of the slightly raised thumb. Fold the ring and little fingers.'],
    ['ayn', 'ع', 'Ayn', 'أرِ زميلك ظهر اليد. مدّ السبابة والوسطى إلى الجانب متقاربتين، واطوِ الإبهام والبنصر والخنصر.', 'Show your partner the back of your hand. Extend your index and middle fingers together to the side. Fold the thumb, ring finger and little finger.'],
    ['ghayn', 'غ', 'Ghayn', 'أرِ زميلك ظهر اليد. مدّ السبابة والوسطى إلى الجانب، وارفع الإبهام من فوقهما. اطوِ البنصر والخنصر.', 'Show your partner the back of your hand. Extend your index and middle fingers to the side and raise the thumb above them. Curl the ring and little fingers.'],
    ['fa', 'ف', 'Fa', 'واجه زميلك براحة اليد. المس طرف السبابة بطرف الإبهام فوق الكف، واطوِ بقية الأصابع.', 'Face your partner with your palm. Touch the index fingertip to the thumb tip above the palm, and curl the other fingers.'],
    ['qaf', 'ق', 'Qaf', 'واجه زميلك براحة اليد. ضمّ طرفَي السبابة والوسطى إلى الإبهام فوق الكف واطوِ البنصر والخنصر.', 'Face your partner with your palm. Touch both the index and middle fingertips to the thumb tip above the palm. Fold the ring and little fingers.'],
    ['kaf', 'ك', 'Kaf', 'واجه زميلك براحة اليد. ارفع أربعة أصابع متقاربة واثنِ الإبهام في وسط الكف.', 'Face your partner with your palm. Hold four fingers up close together. Fold the thumb into the middle of your palm.'],
    ['nun', 'ن', 'Nun', 'ارفع السبابة والإبهام حتى يبدو الفراغ بينهما كقوس مفتوح إلى أعلى. اطوِ الأصابع الثلاثة الباقية.', 'Curve your index finger and thumb up, leaving an open arch between them. Curl the other three fingers.'],
    ['haa', 'ه', 'Haa', 'قرّب الإبهام من أطراف الأصابع كلها. وجّه أطرافها نحو زميلك لتبدو متجمعة من الأمام.', 'Bring the thumb and all the fingertips close together. Point the tips towards your partner so they look bunched from the front.'],
    ['waw', 'و', 'Waw', 'احنِ يدك نحو الجانب. قرّب طرف السبابة إلى طرف الإبهام لتشكّل حلقة صغيرة واثنِ بقية الأصابع.', 'Bend your hand towards the side. Bring the index fingertip to the thumb tip to make a small loop and curl the other fingers.'],
  ];
  const items = data.map(([id, ar, en, arabic, english]) => ({ id, ar, en, group: 'letters', describe: [arabic, english], page: 12 }));

  const skin = '#ffc392';
  const ink = '#673e35';
  const detail = '#ad6c50';
  const nail = '#ffe1cd';

  const outline = (d) => `<path d="${d}" fill="${skin}" stroke="${ink}" stroke-width="3.15" stroke-linecap="round" stroke-linejoin="round"/>`;
  const lines = (d, width = 2) => `<path d="${d}" fill="none" stroke="${detail}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
  function cuff(center = 146) {
    return `<g transform="translate(${center - 146} 0)"><path d="M122 187 Q146 192 170 186 L174 207 Q146 214 118 207Z" fill="#247f7a" stroke="#165252" stroke-width="2.8" stroke-linejoin="round"/><path d="M125 202 Q145 207 167 200" fill="none" stroke="#9ed7b6" stroke-width="2.5" stroke-linecap="round"/></g>`;
  }

  function fingers(paths, width = 15) {
    return paths.map((d) => `<path d="${d}" fill="none" stroke="${ink}" stroke-width="${width + 5}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${skin}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
  }

  function curvedFour(id) {
    const top = id === 'jim'
      ? 'Q104 128 108 109 Q108 83 131 68 Q147 60 176 72 Q184 76 181 84 Q176 91 167 88 Q152 83 146 87 Q139 92 138 104'
      : id === 'ha'
        ? 'Q96 131 103 108 Q106 91 122 76 Q141 59 171 65 Q183 67 182 76 Q180 84 167 83 Q150 82 142 94 Q134 107 137 120'
        : 'Q103 128 104 103 Q105 87 118 84 L123 84 L125 72 Q127 66 134 69 Q140 72 138 82 L175 80 Q189 80 190 89 Q190 97 177 98 Q153 97 148 109 Q144 124 140 130';
    const groovedFingers = {
      jim: 'M118 90 Q134 72 155 77 M123 96 Q140 81 159 83',
      ha: 'M114 100 Q132 74 159 74 M121 103 Q137 81 159 79',
      kha: 'M130 89 L171 86 M132 94 L167 91',
    };
    const thumb = id === 'jim'
      ? 'Q146 113 153 112 L158 105 Q163 101 168 106 Q172 111 166 119 L148 135 Q144 151 139 162'
      : 'Q139 132 136 146 L136 160';
    return outline(`M118 191 L115 175 Q111 159 109 145 ${top} ${thumb} Q141 178 147 192 Z`)
      + lines(groovedFingers[id]) + lines(id === 'ha' ? 'M126 117 Q126 102 134 95 M125 120 Q122 137 131 151 M125 168 L132 176' : 'M121 129 Q122 144 131 151 M125 168 L132 176') + cuff(132);
  }

  function openAngles(id) {
    const double = id === 'dhal';
    const raised = double
      ? fingers(['M132 118 Q143 92 169 71 L194 58', 'M143 116 Q159 93 179 82'], 13)
      : fingers(['M132 119 Q144 87 166 77 Q174 72 182 72'], 15);
    const thumb = id === 'dal'
      ? 'Q163 134 176 124 L199 108 Q207 103 204 96 Q199 91 193 94 L169 108 Q159 113 150 114'
      : 'Q162 136 175 117 L195 105 Q204 100 199 93 Q195 88 185 92 L155 111';
    return raised + outline(`M118 192 L115 173 Q112 159 114 142 Q119 127 119 114 Q120 105 129 106 Q137 108 138 120 Q140 122 144 117 Q148 107 155 112 ${thumb} Q140 132 149 143 Q149 154 137 167 L144 192 Z`)
      + lines('M121 137 Q128 124 136 126 M129 147 Q137 137 146 137 M132 166 L137 173') + cuff(131);
  }

  function hooked(id) {
    const raised = id === 'ra'
      ? ['M140 120 Q140 75 159 60 Q165 55 172 53']
      : ['M149 112 Q153 77 177 52', 'M138 118 Q143 81 168 48'];
    return fingers(raised, 14) + outline('M120 193 Q120 173 125 160 Q128 145 125 132 L124 116 Q125 107 137 108 Q147 108 152 117 Q159 109 165 116 Q172 119 172 127 Q179 130 177 141 Q174 150 166 155 Q164 173 154 184 L155 193Z')
      + lines('M163 124 Q155 123 152 132 L159 135 Q166 140 159 145 L148 149 M144 154 L140 161') + cuff(137);
  }

  function fist(id) {
    const sideThumb = id === 'dad'
      ? 'Q185 123 201 108 Q213 98 217 103 Q220 110 209 121 L188 143 Q184 162 167 175'
      : 'Q183 131 185 142 Q181 150 174 153 Q168 168 165 177';
    const insideThumb = id === 'dad'
      ? lines('M185 125 Q178 138 179 145 M189 130 L195 123')
      : outline('M174 115 Q187 112 189 123 Q188 130 181 137 L167 146 Q162 151 146 149 Q140 148 141 140 L163 131 Q158 124 163 119 Q167 115 174 115Z');
    return outline(`M122 194 L122 180 Q108 168 103 149 Q99 133 105 118 Q109 107 119 110 Q119 101 130 101 Q139 101 143 106 Q146 96 157 98 Q166 99 169 104 Q180 98 183 111 ${sideThumb} L169 195 Z`)
      + lines('M108 127 Q114 137 124 131 M124 115 Q124 129 137 128 M142 113 Q145 127 155 125 M160 113 Q162 123 172 123 M117 154 Q128 159 134 166') + insideThumb + cuff(146);
  }

  function verticalPair(id) {
    const ring = id === 'tah';
    const middle = ring ? 'M148 117 Q151 106 167 101 Q184 94 199 103' : 'M150 120 Q163 102 186 105 L201 108';
    const thumb = ring ? 'M159 151 Q169 130 182 122 Q190 116 199 104' : 'M161 151 Q171 124 182 111 L185 96';
    return fingers(['M147 114 L151 42', middle, thumb], 14)
      + outline('M124 193 Q125 178 119 163 Q112 150 111 133 Q110 119 120 116 Q128 113 135 121 Q137 110 147 111 Q157 113 160 125 Q158 138 166 140 Q173 141 178 134 Q181 145 176 158 Q170 173 164 182 L166 193 Z')
      + lines('M119 128 Q123 140 134 140 M135 124 Q135 134 146 136 M129 153 Q139 148 152 151 M138 165 Q145 159 153 159') + cuff(145);
  }

  function horizontalPair(id) {
    const thumb = id === 'ghayn' ? fingers(['M131 104 Q141 88 142 69'], 13) : '';
    return thumb + fingers(['M134 107 Q157 99 192 104 L215 109', 'M136 122 Q162 113 190 118 L217 123'], 15)
      + outline('M122 194 L121 177 Q118 163 119 149 Q121 132 126 119 Q132 111 141 111 Q151 110 161 118 Q172 120 169 133 Q165 140 154 142 Q154 151 145 156 L151 193Z')
      + lines('M134 124 Q143 120 152 125 M133 137 Q144 132 153 135 M133 158 L136 166 M184 107 L193 108 M187 121 L195 123')
      + `<path d="M203 105 Q212 105 215 109 M205 120 Q214 120 217 123" fill="none" stroke="${nail}" stroke-width="4" stroke-linecap="round"/>`
      + cuff(137);
  }

  function pinchFront(id) {
    const paired = id === 'qaf';
    const pinches = paired
      ? ['M146 125 Q141 102 149 85 L155 71', 'M164 122 Q165 96 172 72', 'M175 151 Q187 133 177 114 Q165 95 165 75']
      : ['M155 122 Q150 99 161 80 L167 70', 'M174 154 Q186 132 181 116 Q174 102 168 86 L167 71'];
    return fingers(pinches, 15) + outline('M123 192 L124 177 Q115 163 111 152 Q106 140 106 130 Q106 122 114 118 Q120 115 126 122 Q127 112 136 113 Q144 114 148 123 Q151 116 160 117 Q165 121 165 132 Q175 131 181 125 Q188 127 186 138 Q181 159 166 176 L169 192Z')
      + lines('M114 128 Q124 137 133 131 M133 125 Q137 135 146 133 M121 149 Q131 143 145 145 M149 152 Q159 151 167 143 M134 168 Q145 159 155 158') + cuff(145);
  }

  function uprightFour() {
    const raised = ['M121 118 L119 72', 'M141 113 L138 55', 'M158 112 L156 46', 'M177 117 L175 50'];
    return fingers(raised, 15) + outline('M123 192 L122 178 Q112 163 109 146 Q108 129 112 109 Q120 107 130 112 Q143 110 151 112 Q159 110 169 112 Q184 107 188 116 Q192 143 183 158 L171 177 L173 193Z')
      + outline('M181 127 Q174 116 168 122 L157 129 Q146 127 140 133 Q138 139 145 142 L165 143 Q174 144 181 138')
      + lines('M120 88 L125 88 M136 78 L143 78 M152 73 L160 73 M170 78 L178 78 M121 155 Q131 146 142 146 M140 163 Q150 154 163 155') + cuff(147);
  }

  function openArch() {
    return fingers(['M145 123 Q120 110 115 91 Q114 81 121 70', 'M163 142 Q183 128 180 107 Q176 88 177 74'], 15)
      + outline('M121 192 L122 176 Q116 160 109 147 Q102 136 112 127 Q121 119 131 124 Q130 112 139 109 Q147 107 152 118 Q159 108 168 113 Q174 117 173 127 Q177 136 170 151 L163 176 L165 192Z')
      + lines('M115 137 Q126 128 136 134 Q141 137 147 134 M137 119 Q137 128 146 131 M156 119 Q152 127 162 132 M128 155 Q142 146 153 149') + cuff(143);
  }

  function joinedTips() {
    const tips = [[119,109,8],[132,100,9],[148,97,9],[163,101,9],[173,115,10]];
    return outline('M124 192 L123 178 Q115 165 112 149 Q109 136 111 117 Q113 104 121 100 Q127 96 134 98 Q142 89 151 92 Q161 92 167 100 Q177 99 181 110 Q189 127 178 150 Q167 167 167 181 L171 194Z')
      + tips.map(([cx,cy,rx]) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="9" fill="${skin}" stroke="${detail}" stroke-width="1.7"/>`).join('')
      + lines('M115 125 Q124 123 131 127 M127 137 Q135 130 147 128 M140 148 Q148 143 157 145 M139 167 Q148 159 160 159') + cuff(147);
  }

  function closedSide() {
    return fingers(['M128 123 Q133 99 152 94 Q168 91 168 111 Q168 119 176 122', 'M139 149 Q152 128 176 122 L191 119'], 15)
      + outline('M113 193 L112 174 Q106 158 109 146 Q111 134 119 128 Q123 121 129 124 Q135 114 143 119 Q148 121 147 128 Q155 122 159 129 Q165 137 157 145 Q154 153 145 159 L140 180 L145 193 Z')
      + lines('M117 143 Q124 136 132 139 M128 151 Q137 144 148 143 M127 169 L132 178 M151 100 Q156 97 160 100') + cuff(129);
  }

  const renderers = {
    jim: curvedFour, ha: curvedFour, kha: curvedFour, dal: openAngles, dhal: openAngles,
    ra: hooked, zay: hooked, sad: fist, dad: fist, tah: verticalPair, zah: verticalPair,
    ayn: horizontalPair, ghayn: horizontalPair, fa: pinchFront, qaf: pinchFront,
    kaf: uprightFour, nun: openArch, haa: joinedTips, waw: closedSide,
  };

  function render(id) {
    if (!Object.hasOwn(renderers, id)) return '';
    return `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="20" y="8" width="260" height="204" rx="38" fill="#fff4df"/>
      <circle cx="151" cy="105" r="82" fill="#ffe8bc"/>
      <ellipse cx="152" cy="206" rx="62" ry="7" fill="#b9815f" opacity=".16"/>
      <path d="M52 75q2 10 12 12-10 2-12 12-2-10-12-12 10-2 12-12Z" fill="#f3ac58"/>
      <path d="M240 63v13m-6.5-6.5h13" fill="none" stroke="#6eb6a0" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="236" cy="151" r="4" fill="#ef8c74"/><circle cx="63" cy="147" r="3.5" fill="#7bbf9f"/>
      ${renderers[id](id)}
    </svg>`;
  }

  return { items, render };
})();
