const SKIN='#dda27c', OUT='#284b50', GLOVE='#9fd7e3', FOAM='#ffffff', TEAL='#2f746c', BG='#e7ecdf';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function hand({x=500,y=355,rot=0,scale=1,back=false,gloved=false,cls='',opacity=1,flip=false}={}){
  const fill=gloved?GLOVE:SKIN, line=gloved?'#5d95a8':'#ad7558';
  const nails=back?`<g fill="${gloved?'#ccecf1':'#f0c4a8'}" stroke="${line}" stroke-width="1.5">
    <rect x="-50" y="-116" width="22" height="28" rx="9"/><rect x="-20" y="-135" width="22" height="29" rx="9"/><rect x="10" y="-132" width="22" height="28" rx="9"/><rect x="40" y="-112" width="20" height="25" rx="8"/></g>`:'';
  const creases=!back?`<path d="M-48 24Q0-9 49 24M-43 55Q0 35 44 56M-24 78Q0 66 24 78" fill="none" stroke="${line}" stroke-width="3" stroke-linecap="round"/>`:'';
  return `<g class="wash-hand ${cls}" transform="translate(${x} ${y}) rotate(${rot}) scale(${flip?-scale:scale} ${scale})" opacity="${opacity}">
    <rect x="-66" y="-15" width="132" height="138" rx="54" fill="${fill}" stroke="${OUT}" stroke-width="4"/>
    <rect x="-57" y="-112" width="25" height="112" rx="13" fill="${fill}" stroke="${OUT}" stroke-width="4"/>
    <rect x="-27" y="-139" width="27" height="138" rx="14" fill="${fill}" stroke="${OUT}" stroke-width="4"/>
    <rect x="4" y="-145" width="27" height="145" rx="14" fill="${fill}" stroke="${OUT}" stroke-width="4"/>
    <rect x="35" y="-124" width="25" height="124" rx="13" fill="${fill}" stroke="${OUT}" stroke-width="4"/>
    <rect x="-91" y="18" width="72" height="29" rx="15" fill="${fill}" stroke="${OUT}" stroke-width="4" transform="rotate(-38 -55 33)"/>
    <path d="M-48 116L-43 210H43L48 116" fill="${fill}" stroke="${OUT}" stroke-width="4"/>
    ${creases}${nails}
  </g>`;
}
function forearm({x=390,y=370,rot=0,gloved=false,cls=''}={}){
 const fill=gloved?GLOVE:SKIN;
 return `<g class="${cls}" transform="translate(${x} ${y}) rotate(${rot})"><rect x="-52" y="-35" width="104" height="300" rx="50" fill="${fill}" stroke="${OUT}" stroke-width="4"/><path d="M-42 20H42" stroke="${gloved?'#e9fbff':'#b77d60'}" stroke-width="3"/></g>`;
}
function foam(cx,cy,rx=70,ry=50){return `<g class="foam" opacity=".88" fill="${FOAM}"><circle cx="${cx-rx*.45}" cy="${cy}" r="10"/><circle cx="${cx}" cy="${cy-ry*.25}" r="13"/><circle cx="${cx+rx*.42}" cy="${cy+4}" r="8"/><circle cx="${cx+10}" cy="${cy+ry*.28}" r="9"/></g>`;}
function titleBar(title,subtitle=''){
 return `<g class="motion-copy"><rect x="130" y="40" width="740" height="92" rx="24" fill="#fffdf3" stroke="#cbd8c9" stroke-width="2"/><text x="500" y="78" text-anchor="middle" font-family="Arial,sans-serif" font-size="27" font-weight="700" fill="#214f4d">${esc(title)}</text>${subtitle?`<text x="500" y="108" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="#63786d">${esc(subtitle)}</text>`:''}</g>`;
}
function base(body,title,subtitle=''){
 return `<svg class="technique-svg" viewBox="0 0 1000 650" role="img" aria-label="${esc(title)}"><rect width="1000" height="650" fill="${BG}"/><path d="M0 515Q250 480 500 512T1000 510V650H0Z" fill="#c7d3c3"/>${titleBar(title,subtitle)}${body}</svg>`;
}

export const WASH_TECHNIQUES=[
  ['palms','Palm to palm'],['backs','Back of each hand'],['fingers','Each finger / between fingers'],['fingertips','Fingertips'],['knuckles','Knuckles'],['wrists','Wrists'],['forearms','Forearms'],['nails','Under / around nails']
];

export function washTechnique(area,{lang='en'}={}){
 const ar=lang==='ar';
 const titles={
  palms:ar?'راحة اليد مع راحة اليد':'Palm to palm',
  backs:ar?'تنظيف ظهر كل يد':'Back of each hand',
  fingers:ar?'فرك الأصابع وما بينها':'Rub each finger / between fingers',
  fingertips:ar?'فرك أطراف الأصابع':'Fingertips against the opposite palm',
  knuckles:ar?'فرك مفاصل الأصابع':'Knuckles against the opposite palm',
  wrists:ar?'فرك الرسغين':'Rub around each wrist',
  forearms:ar?'فرك الساعدين':'Rub the forearms',
  nails:ar?'تنظيف منطقة الأظافر':'Clean the nail area'
 };
 const subs={
  palms:ar?'يجب أن تلمس الراحتان بعضهما وتتحركا فعلياً':'The palms stay in contact while they rub.',
  backs:ar?'تمر راحة اليد فوق ظهر اليد الأخرى ثم يُعكس':'One palm travels across the back of the opposite hand; then switch.',
  fingers:ar?'تتحرك الأصابع حول وبين أصابع اليد الأخرى':'The fingers move around and between the opposite fingers.',
  fingertips:ar?'تدور أطراف الأصابع على راحة اليد الأخرى':'The fingertips make firm circular contact with the opposite palm.',
  knuckles:ar?'تلامس المفاصل راحة اليد وتتحرك عليها':'Flexed knuckles contact and rub the opposite palm.',
  wrists:ar?'تحيط اليد بالرسغ وتتحرك حوله':'The opposite hand encircles and rubs the wrist.',
  forearms:ar?'تمر اليد على الساعد حتى مستوى التلوث المحتمل':'The opposite hand travels along the forearm.',
  nails:ar?'تنظف منطقة الأظافر بحركة لطيفة واضحة':'The nail area is cleaned with a gentle, visible movement.'
 };
 let b='';
 if(area==='palms'){
   b=hand({x:445,y:350,rot:-4,cls:'motion-palms-a'})+hand({x:555,y:350,rot:4,cls:'motion-palms-b',flip:true})+foam(500,330,145,80);
 } else if(area==='backs'){
   b=hand({x:455,y:365,rot:-8,back:true,cls:'stationary'})+hand({x:555,y:330,rot:72,scale:.9,cls:'motion-back-rub'})+foam(485,315,115,55);
 } else if(area==='fingers'){
   b=hand({x:455,y:350,rot:-8,cls:'motion-fingers-a'})+hand({x:545,y:350,rot:8,flip:true,cls:'motion-fingers-b'})+`<path d="M415 235Q500 210 585 235" stroke="#2f746c" stroke-width="7" stroke-linecap="round" opacity=".5"/>`+foam(500,300,125,65);
 } else if(area==='fingertips'){
   b=hand({x:420,y:385,rot:-10,cls:'stationary'})+hand({x:590,y:305,rot:170,scale:.72,cls:'motion-fingertips'})+`<circle cx="435" cy="390" r="72" fill="#fff" opacity=".22"/>`+foam(445,380,100,60);
 } else if(area==='knuckles'){
   b=hand({x:405,y:390,rot:-10,cls:'stationary'})+`<g class="motion-knuckles" transform="translate(585 340)"><rect x="-70" y="-10" width="140" height="90" rx="43" fill="${SKIN}" stroke="${OUT}" stroke-width="4"/><g fill="${SKIN}" stroke="${OUT}" stroke-width="4"><circle cx="-48" cy="-6" r="25"/><circle cx="-16" cy="-14" r="26"/><circle cx="18" cy="-13" r="26"/><circle cx="50" cy="-4" r="24"/></g></g>`+foam(445,385,100,60);
 } else if(area==='wrists'){
   b=forearm({x:430,y:330,cls:'stationary'})+hand({x:590,y:420,rot:84,scale:.72,cls:'motion-wrist'})+`<ellipse cx="430" cy="470" rx="75" ry="38" fill="none" stroke="${TEAL}" stroke-width="6" stroke-dasharray="12 10" opacity=".55"/>`+foam(430,460,90,50);
 } else if(area==='forearms'){
   b=forearm({x:410,y:270,cls:'stationary'})+hand({x:600,y:385,rot:85,scale:.72,cls:'motion-forearm'})+`<path d="M470 240V525" stroke="${TEAL}" stroke-width="7" stroke-linecap="round" opacity=".45"/>`+foam(450,370,85,120);
 } else {
   b=hand({x:415,y:390,rot:-8,cls:'stationary'})+`<g class="motion-nails" transform="translate(600 315) rotate(168)">${hand({x:0,y:0,scale:.68}).replace('<g class="wash-hand ','<g class="wash-hand inner-')}</g>`+foam(440,380,90,50);
 }
 return base(b,titles[area]||titles.palms,subs[area]||'');
}

export function gloveTechnique(kind,{lang='en'}={}){
 const ar=lang==='ar';
 const labels={
   take:ar?'أخرج القفاز الأول':'Take the first clean glove',
   don1:ar?'أدخل اليد الأولى في القفاز':'Slide the first glove onto the bare hand',
   don2:ar?'أدخل اليد الثانية في القفاز':'Slide the second glove onto the bare hand',
   fit:ar?'شبّك الأصابع لضبط القفازين':'Interlace fingers to smooth the fit',
   remove1:ar?'أمسك قاعدة القفاز واسحبه مقلوباً':'Grip at the base of the palm and peel inside-out',
   remove2:ar?'أدخل الأصابع العارية تحت حافة القفاز الثاني':'Bare fingers slide under the second cuff — not onto the used exterior'
 };
 let b='';
 if(kind==='take'){
  b=`<rect x="150" y="220" width="240" height="130" rx="22" fill="#578899" stroke="${OUT}" stroke-width="4"/><ellipse cx="270" cy="235" rx="70" ry="20" fill="#244852"/>${hand({x:610,y:365,rot:-10,scale:.9,cls:'motion-reach'})}<path class="glove-loose" d="M255 230v-90l18-12 20 70v-92l18-7 16 101 15-83 17 6 4 132-45 80h-76Z" fill="${GLOVE}" stroke="#527e95" stroke-width="4"/>`;
 } else if(kind==='don1'||kind==='don2'){
  b=hand({x:440,y:385,rot:-4,scale:.95,cls:'stationary'})+`<g class="motion-glove-slide"><path d="M555 360v-112l15-10 17 75v-92l16-6 15 100 14-78 16 6 2 130-38 92h-74Z" fill="${GLOVE}" stroke="#527e95" stroke-width="4"/></g>`+`<path d="M535 365H455" stroke="${TEAL}" stroke-width="7" stroke-linecap="round" opacity=".45"/>`;
 } else if(kind==='fit'){
  b=hand({x:455,y:360,rot:-10,scale:.9,gloved:true,cls:'motion-fit-a'})+hand({x:545,y:360,rot:10,scale:.9,gloved:true,flip:true,cls:'motion-fit-b'});
 } else if(kind==='remove1'){
  b=hand({x:420,y:345,rot:-4,scale:.9,gloved:true,cls:'stationary'})+hand({x:610,y:405,rot:75,scale:.72,gloved:true,cls:'motion-peel-hand'})+`<path class="motion-peel-glove" d="M390 425Q350 460 375 555l55 18 42-32-12-108Z" fill="#dff1f3" stroke="#527e95" stroke-width="4"/>`;
 } else {
  b=hand({x:420,y:350,rot:-5,scale:.9,gloved:false,cls:'motion-under-cuff'})+hand({x:600,y:350,rot:5,scale:.9,gloved:true,flip:true,cls:'stationary'})+`<path d="M555 455Q600 430 645 455" stroke="#f3fbff" stroke-width="20" opacity=".95"/><path d="M555 455Q600 430 645 455" stroke="${TEAL}" stroke-width="3" fill="none"/>`;
 }
 return base(b,labels[kind]||labels.take,ar?'راقب موضع التلامس وحركة اليدين':'Watch the contact point and the hand movement — the animation carries the teaching.');
}