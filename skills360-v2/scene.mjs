const skin='#dda27c',ink='#294a50',teal='#2f746c',cream='#f9f6e8',glove='#9fd7e3';
const txt=(x,y,t,size=17,fill=ink,anchor='start')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-family="Arial,sans-serif">${t}</text>`;
const target=(id,label,shape)=>`<g data-object="${id}" role="button" tabindex="0" aria-label="${label}" class="object"><title>${label}</title>${shape}</g>`;
function simpleHand({x,y,flip=false,back=false,gloved=false,s={}}){
 const fill=gloved?glove:skin, line=gloved?'#5d95a8':'#b47758';
 const zones=back?['backs','fingers','fingertips','knuckles','wrists','forearms','nails']:['palms','fingers','fingertips','knuckles','wrists','forearms','nails'];
 const zone=(a,cx,cy,rx,ry)=>`<g data-area="${flip?'right':'left'}.${a}" class="skin-zone" tabindex="0" role="button" aria-label="${a}"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="transparent"/>${s.soap?`<ellipse cx="${cx}" cy="${cy}" rx="${rx*.55}" ry="${ry*.45}" fill="#fff" opacity="${(s.areas?.[(flip?'right':'left')+'.'+a]||0)>=1?.8:.18}"/>`:''}</g>`;
 return `<g class="hand" data-hand="${flip?'right':'left'}" transform="translate(${x} ${y}) scale(${flip?-1:1} 1)">
 <rect x="-56" y="-3" width="112" height="126" rx="48" fill="${fill}" stroke="${ink}" stroke-width="4"/>
 <rect x="-50" y="-104" width="22" height="104" rx="11" fill="${fill}" stroke="${ink}" stroke-width="4"/><rect x="-22" y="-127" width="24" height="127" rx="12" fill="${fill}" stroke="${ink}" stroke-width="4"/><rect x="7" y="-132" width="24" height="132" rx="12" fill="${fill}" stroke="${ink}" stroke-width="4"/><rect x="36" y="-111" width="22" height="111" rx="11" fill="${fill}" stroke="${ink}" stroke-width="4"/>
 <rect x="-82" y="18" width="66" height="26" rx="13" fill="${fill}" stroke="${ink}" stroke-width="4" transform="rotate(-38 -49 31)"/><path d="M-44 116L-40 205H40L44 116" fill="${fill}" stroke="${ink}" stroke-width="4"/>
 ${back?`<g fill="${gloved?'#ccecf1':'#f0c4a8'}" stroke="${line}"><rect x="-46" y="-99" width="14" height="18" rx="6"/><rect x="-17" y="-121" width="15" height="19" rx="6"/><rect x="12" y="-126" width="15" height="19" rx="6"/><rect x="40" y="-105" width="14" height="18" rx="6"/></g>`:`<path d="M-40 30Q0 4 40 30M-35 58Q0 42 36 58" stroke="${line}" stroke-width="3" fill="none"/>`}
 ${zone(zones[0],0,53,40,35)}${zone('fingers',0,-25,45,40)}${zone('fingertips',0,-110,48,20)}${zone('knuckles',0,8,42,18)}${zone('wrists',0,126,38,18)}${zone('forearms',0,177,39,31)}${zone('nails',0,-128,45,12)}
 ${s.watch&&!flip?target('watch','Remove watch',`<rect x="-45" y="126" width="90" height="22" rx="5" fill="#354f57"/><circle cy="137" r="19" fill="#fff4d6" stroke="#354f57" stroke-width="4"/>`):''}
 ${s.skinContaminated?`<circle cx="18" cy="-82" r="12" fill="#c56f49" stroke="#ffe0a0" stroke-width="5"/>`:''}
 ${s.used&&gloved?`<g fill="#b96e47" opacity=".75"><circle cx="-15" cy="40" r="8"/><circle cx="22" cy="12" r="5"/><circle cx="5" cy="82" r="6"/></g>`:''}
 </g>`;
}
function person(x,y){return `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="0" rx="37" ry="45" fill="${skin}" stroke="${ink}" stroke-width="4"/><path d="M-37 -5Q-30-62 7-55Q45-50 36-5Q20-28-25-25Z" fill="#38464c"/><path d="M-18 0h8M10 0h8M-8 23Q0 28 8 23" stroke="${ink}" stroke-width="3" fill="none"/><path d="M-68 150Q-70 54 0 44Q70 54 68 150" fill="#d7e7e7" stroke="${ink}" stroke-width="4"/></g>`;}
export function panorama(yaw=0){
 const panel=(off)=>`<g transform="translate(${off-yaw} 0)"><rect width="2400" height="620" fill="#e6ecdf"/><path d="M0 425H2400V620H0Z" fill="#b8c3b3"/><path d="M0 100H2400M0 425H2400" stroke="#b5c7b7" stroke-width="10"/>${txt(70,65,'TOBRUK UNIVERSITY  ·  NURSING SKILLS LAB',24)}
 ${target('sink','Hand-hygiene station',`<g transform="translate(100 180)"><rect x="0" y="165" width="460" height="170" rx="20" fill="#d5e4df" stroke="${ink}" stroke-width="5"/><ellipse cx="230" cy="225" rx="145" ry="50" fill="#a3c1bd"/><path d="M230 170v-80q0-45 70-15v55" stroke="#698e91" stroke-width="18" fill="none"/><rect x="40" y="80" width="75" height="120" rx="12" fill="#ecd9a6"/>${txt(45,230,'HAND HYGIENE',20)}</g>`)}
 ${target('gloves','Clean glove station',`<g transform="translate(760 250)"><rect width="420" height="22" y="160" fill="#b99f72"/><path d="M30 182v165M390 182v165" stroke="#567872" stroke-width="14"/><rect x="105" y="60" width="170" height="95" rx="12" fill="#5a8fa2"/><ellipse cx="190" cy="70" rx="50" ry="14" fill="#234752"/>${txt(120,125,'CLEAN GLOVES',18,'white')}<rect x="310" y="80" width="70" height="140" rx="8" fill="#688a84"/>${txt(85,390,'GLOVE STATION',20)}</g>`)}
 ${target('patient','Khaled Salem',`<g transform="translate(1500 260)"><rect x="-30" y="145" width="570" height="115" rx="28" fill="#fffaf0" stroke="#688b89" stroke-width="6"/><path d="M0 260v95M510 260v95" stroke="#557778" stroke-width="12"/>${person(105,90)}<path d="M145 160Q330 105 520 175v78H145" fill="#8db2a7"/>${txt(40,390,'KHALED SALEM  ·  MORNING CARE',20)}</g>`)}
 <g transform="translate(2160 225)"><rect width="170" height="260" rx="8" fill="#63857f"/><rect x="15" y="18" width="140" height="110" fill="#b5d2cb"/>${txt(15,300,'SKILLS BAY',18)}</g></g>`;
 return `<svg id="worldSvg" viewBox="0 0 1000 620" aria-label="Panoramic clinical skills laboratory">${panel(-2400)}${panel(0)}${panel(2400)}</svg>`;
}
function sinkScene(s,opt){
 const y=opt.handY??345,back=!!opt.back;
 return `<svg id="worldSvg" viewBox="0 0 1000 650"><rect width="1000" height="650" fill="#e7ecdf"/><path d="M0 170H1000M0 320H1000" stroke="#d0dccf" stroke-width="3"/><path d="M130 320L870 320 920 500H80Z" fill="#d2e2dc" stroke="${ink}" stroke-width="5"/><ellipse cx="500" cy="420" rx="220" ry="68" fill="#9ebbb8"/><ellipse cx="500" cy="420" rx="180" ry="43" fill="#c4d8d2"/>
 ${target('faucet','Faucet handle',`<path d="M500 330V220Q500 170 565 205v58" stroke="#73989b" stroke-width="20" fill="none"/><path d="M500 230l-48-22" stroke="#486f74" stroke-width="14" stroke-linecap="round"/>`)}${s.water?`<path class="stream" d="M565 262v135" stroke="#78c9e0" stroke-width="20" opacity=".65"/><path d="M558 262v135" stroke="white" stroke-width="4" opacity=".6"/>`:''}${target('stream','Running water',`<rect x="525" y="270" width="80" height="130" fill="transparent"/>`)}
 ${target('temperature','Adjust water to warm',`<circle cx="450" cy="208" r="26" fill="#f6f8eb" stroke="#6c8d8b" stroke-width="3"/><path d="M432 192A23 23 0 0 1 468 224" stroke="#c98569" stroke-width="7" fill="none"/><path d="M432 192A23 23 0 0 0 468 224" stroke="#75aeca" stroke-width="7" fill="none"/>`)}
 ${target('soap','Liquid soap dispenser',`<rect x="190" y="200" width="85" height="126" rx="14" fill="#ecd8a3" stroke="#6d8279" stroke-width="4"/><path d="M230 200v-22h48" stroke="#577b78" stroke-width="10"/>${txt(210,265,'SOAP',17)}`)}
 ${target('towel','Paper towel',`<rect x="750" y="175" width="135" height="100" rx="12" fill="#668985"/><path d="M770 235h95v110l-47-10-48 10Z" fill="#fffbee" stroke="#c8d0c3" stroke-width="2"/>${txt(765,210,'TOWEL',16,'white')}`)}
 ${simpleHand({x:410,y,back,gloved:s.gloves===2||(s.gloves===1),s})}${simpleHand({x:590,y,flip:true,back,gloved:s.gloves===2,s})}
 ${target('turnHands','Turn hands over',`<g transform="translate(815 445)"><circle r="32" fill="#fffdf3" stroke="#527a78" stroke-width="3"/><path d="M-18 0a19 19 0 1 1 19 19M-18 0l-5-11M-18 0l13-6" fill="none" stroke="#527a78" stroke-width="4"/></g>`)}
 ${s.towel?`<g id="heldTowel" data-object="towelBarrier" class="object" tabindex="0"><path d="M650 390l80-18 28 98-80 18Z" fill="#fffbee" stroke="#bdc9be" stroke-width="3"/></g>`:''}
 ${target('uniform','Distance from basin',`<path d="M255 615Q500 565 745 615V650H255Z" fill="${s.uniformContaminated?'#ad8067':'#4f8982'}"/>`)}
 ${opt.elbow?`<path d="M285 250H715" stroke="#668d87" stroke-width="3" stroke-dasharray="10 8"/>${txt(720,255,'ELBOW LINE',16)}`:''}
 ${s.freeze?`<circle cx="${s.contactPoint?.x||590}" cy="${s.contactPoint?.y||y}" r="22" fill="#c56f4980" stroke="#ffe0a0" stroke-width="6"/>`:''}</svg>`;
}
function gloveScene(s,opt){
 const y=opt.handY??345;
 return `<svg id="worldSvg" viewBox="0 0 1000 650"><rect width="1000" height="650" fill="#e7ecdf"/><path d="M40 250H960L1000 590H0Z" fill="#cdbb95"/><rect x="100" y="155" width="190" height="115" rx="12" fill="#5b8fa2" stroke="${ink}" stroke-width="4"/><ellipse cx="195" cy="168" rx="56" ry="15" fill="#234752"/>${txt(125,225,'CLEAN GLOVES',18,'white')}${target('box','Take clean glove',`<rect x="105" y="150" width="185" height="120" fill="transparent"/>`)}
 ${target('bag','Containment bag',`<path d="M760 290l-15 170q65 35 135 0l-14-170Z" fill="${s.bag?'#b4cfd0':'#edf0d7'}" stroke="#608786" stroke-width="4"/><path d="M750 296h122" stroke="${s.sealed?'#486e6d':'#b5bea9'}" stroke-width="10"/>${txt(795,355,s.sealed?'SEALED':'BAG',17)}`)}${target('bin','Waste bin',`<path d="M785 490h120l-10 135H795Z" fill="#668a86"/><rect x="777" y="480" width="136" height="16" rx="4" fill="#436964"/>${txt(817,555,'WASTE',16,'white')}`)}
 ${simpleHand({x:405,y,gloved:s.gloves===2||s.gloves===1,s})}${simpleHand({x:595,y,flip:true,gloved:s.gloves===2,s})}
 ${s.heldGlove?target('heldGlove','Put held glove on bare hand',`<path d="M300 355v-92l14-9 16 64v-78l14-5 13 85 12-66 14 5 2 110-32 80h-64Z" fill="${glove}" stroke="#527e95" stroke-width="4"/>`):''}
 ${s.gloves===2?target('interlace','Interlace gloved fingers',`<rect x="450" y="270" width="100" height="160" rx="30" fill="transparent"/>`):''}
 ${s.used&&s.removed===0?target('firstCuff','Grip first glove at base of palm',`<rect x="350" y="${y+70}" width="110" height="55" rx="18" fill="transparent"/>`):''}
 ${s.removed===1?`${target('outerGlove','Used outer glove surface',`<ellipse cx="595" cy="${y+30}" rx="60" ry="85" fill="transparent"/>`)}${target('innerCuff','Slide bare fingers under second cuff',`<path d="M555 ${y+122}Q595 ${y+98} 638 ${y+122}" stroke="#f1fbff" stroke-width="22" fill="none"/>`)}`:''}
 ${s.removed?`<path d="M290 445Q235 400 275 395l65 35-28 78Z" fill="#e1f0f2" stroke="#527e95" stroke-width="4"/>`:''}
 ${s.freeze?`<circle cx="${s.contactPoint?.x||595}" cy="${s.contactPoint?.y||y+30}" r="23" fill="#c56f4980" stroke="#ffe0a0" stroke-width="6"/>`:''}</svg>`;
}
function patientScene(s,opt){
 return `<svg id="worldSvg" viewBox="0 0 1000 650"><rect width="1000" height="650" fill="#e7ecdf"/><rect x="120" y="260" width="760" height="260" rx="35" fill="#fffaf0" stroke="#678986" stroke-width="6"/>${person(330,300)}<path d="M400 365Q630 300 840 405v110H400Z" fill="#8eb2a7"/>${target('cloth','Used washcloth',`<path d="M650 380l110 16-18 80-118-12Z" fill="#c9b395" stroke="#8c7966" stroke-width="4"/><circle cx="700" cy="425" r="13" fill="#ae896b"/>`)}${simpleHand({x:340,y:480,gloved:s.gloves===2||s.gloves===1,s})}${simpleHand({x:590,y:480,flip:true,gloved:s.gloves===2,s})}${txt(500,110,'KHALED SALEM · MORNING CARE',26,ink,'middle')}</svg>`;
}
export function closeScene(station,s,opt={}){if(station==='sink')return sinkScene(s,opt);if(station==='gloves')return gloveScene(s,opt);return patientScene(s,opt);}