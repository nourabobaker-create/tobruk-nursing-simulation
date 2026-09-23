'use strict';
window.drawTurning=function(canvas,step,p,options={}){
const r=canvas.getBoundingClientRect();if(r.width<1||r.height<1)return;
const ctx=canvas.getContext('2d'),DPR=Math.min(devicePixelRatio||1,2),W=960,H=490;
if(canvas.width!==Math.round(r.width*DPR)||canvas.height!==Math.round(r.height*DPR)){canvas.width=Math.round(r.width*DPR);canvas.height=Math.round(r.height*DPR);}
ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);ctx.clearRect(0,0,W,H);
const ar=options.lang==='ar',hide=options.hideLabels,near=options.side||1,top=options.view==='top';
const C={bg:'#eaf1e8',skin:'#e1b08b',light:'#f1cbaa',hair:'#495a56',gown:'#6c9eaa',dark:'#386779',leg:'#e2e6d8',cloth:'#437b71',metal:'#7d9a8f',bed:'#f8faf3',sheet:'#c4ddd2',pillow:'#f8ead1',ink:'#33584c'};
const b=(e,a)=>ar?a:e,clamp=(v,a,c)=>Math.max(a,Math.min(c,v)),mix=(a,c,t)=>a+(c-a)*t,sm=x=>x*x*(3-2*x);p=clamp(p,0,1);let q=sm(p),S={far:0,near:0,cross:0,roll:0,pillow:0,hands:0,head:0,upper:0,lower:0,lowerContacts:false};
if(step<=6){S.far=step<1?0:step===1?q:1;S.near=step<2?0:step===2?q:1;S.cross=step<3?0:step===3?q:1;S.hands=step<4?0:step===4?q:1;S.roll=(step<5?0:step===5?q:1)*Math.PI/2*near;S.pillow=step===6?q:0;}
else if(step<=12){S.far=step===7?q:1;S.near=step<8?0:step===8?q:1;S.cross=step<9?0:step===9?q:1;S.hands=step<10?0:step===10?q:1;S.roll=(step<11?0:step===11?q:1)*Math.PI*near;S.head=step===12?q:0;}
else{S.hands=step===13?q:1;S.upper=step<14?0:step===14?q:1;S.lowerContacts=step>=15;S.lower=step===16?q:0;}
const sx=(step>=13?S.upper*.40:Math.sin(Math.abs(S.roll))*.16)*near,feetShift=step>=13?S.lower*.40*near:0;
// Mattress top is z=0. Torso clearance follows its rotated cross-section.
const lift=.11+Math.sqrt((.40*Math.sin(S.roll))**2+(.235*Math.cos(S.roll))**2);
let faces=[],scale=111,cx=478,cy=287;
function proj(v){let x=v[0],y=v[1],z=v[2];return top?[cx-y*scale,cy+x*scale*.72,z]:[cx-y*scale*.94+x*scale*.31,cy+x*scale*.45+y*scale*.095-z*scale*.90,x*.846+y*.279+z*.452];}
function rot(v,a){return[v[0]*Math.cos(a)+v[2]*Math.sin(a),v[1],-v[0]*Math.sin(a)+v[2]*Math.cos(a)];}
function at(v,a=S.roll,dx=sx){let z=rot(v,a);return[z[0]+dx,z[1],z[2]+lift];}
function rgb(hex,k){let n=parseInt(hex.slice(1),16);return `rgb(${[n>>16,n>>8&255,n&255].map(v=>Math.round(v*k)).join(',')})`;}
function face(v,color,shade=true){let pts=v.map(proj),normal=(pts[1][0]-pts[0][0])*(pts[2][1]-pts[0][1])-(pts[1][1]-pts[0][1])*(pts[2][0]-pts[0][0]);if(shade&&normal<0)return;let avg=v.reduce((a,c)=>a+c[2],0)/v.length;faces.push({pts,z:pts.reduce((a,c)=>a+c[2],0)/pts.length,c:shade?rgb(color,.88+.1*Math.max(0,Math.min(1,(avg+.4)/1.8))):color});}
function ell(center,rx,ry,rz,color,angle=0,basis=null){const points=[],rows=8,cols=14;for(let i=0;i<=rows;i++){let row=[];for(let j=0;j<=cols;j++){let a=i/rows*Math.PI,t=j/cols*Math.PI*2,v=[rx*Math.sin(a)*Math.cos(t),ry*Math.cos(a),rz*Math.sin(a)*Math.sin(t)];v=basis?[basis[0][0]*v[0]+basis[1][0]*v[1]+basis[2][0]*v[2],basis[0][1]*v[0]+basis[1][1]*v[1]+basis[2][1]*v[2],basis[0][2]*v[0]+basis[1][2]*v[1]+basis[2][2]*v[2]]:rot(v,angle);row.push(v.map((c,k)=>c+center[k]));}points.push(row);}for(let i=0;i<rows;i++)for(let j=0;j<cols;j++)face([points[i][j],points[i+1][j],points[i+1][j+1],points[i][j+1]],color);}
function limb(a,c,rad,color){let d=c.map((v,k)=>v-a[k]),len=Math.hypot(...d)||1,u=d.map(v=>v/len),ref=Math.abs(u[2])>.9?[0,1,0]:[0,0,1];const cross=(x,y)=>[x[1]*y[2]-x[2]*y[1],x[2]*y[0]-x[0]*y[2],x[0]*y[1]-x[1]*y[0]];let x=cross(u,ref),l=Math.hypot(...x)||1;x=x.map(v=>v/l);let z=cross(x,u);ell(a.map((v,k)=>(v+c[k])/2),rad,len/2+rad*.6,rad,color,0,[x,u,z]);}
function box(x,y,z,wx,wy,h,col){const v=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(a=>[x+a[0]*wx/2,y+a[1]*wy/2,z+a[2]*h/2]);[[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7],[4,5,6,7]].forEach(a=>face(a.map(i=>v[i]),col,false));}
function paint(){faces.sort((a,c)=>a.z-c.z);for(let f of faces){ctx.beginPath();f.pts.forEach((v,i)=>i?ctx.lineTo(v[0],v[1]):ctx.moveTo(v[0],v[1]));ctx.closePath();ctx.fillStyle=f.c;ctx.strokeStyle=f.c;ctx.lineWidth=.45;ctx.fill();ctx.stroke();}faces=[];}
function text(s,x,y,size=13,color=C.ink,align='center'){if(hide)return;ctx.font=`${size>16?'600':'500'} ${size}px Arial,sans-serif`;ctx.direction=ar?'rtl':'ltr';ctx.textAlign=align;ctx.fillStyle=color;ctx.fillText(s,x,y);}
function tag(s,x,y,w=210){if(hide)return;ctx.fillStyle='#fffdf4';ctx.beginPath();ctx.roundRect(x-w/2,y-19,w,29,12);ctx.fill();text(s,x,y,11);}
function line(a,c,col=C.metal,w=2){ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...c);ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap='round';ctx.stroke();}
function dot(v,col,rad=5){const a=proj(v);ctx.beginPath();ctx.arc(a[0],a[1],rad,0,7);ctx.fillStyle=col;ctx.fill();}
function mitten(center,angle=0,col=C.skin){ell(center,.105,.16,.055,col,angle);for(let i=0;i<4;i++){const v=rot([-.075+i*.048,.17,0],angle);ell(center.map((c,k)=>c+v[k]),.026,.078,.027,col,angle);}let v=rot([.11,.06,0],angle);ell(center.map((c,k)=>c+v[k]),.055,.073,.031,col,angle);}
ctx.fillStyle=C.bg;ctx.fillRect(0,0,W,H);
// Bed and support are illustrative; equipment choice is a separate assessed condition.
box(0,0,-.35,2.68,5.25,.22,'#a2bdb0');box(0,0,-.15,2.66,5.18,.26,C.bed);
for(let x of [-1.1,1.1])for(let y of [-2.1,2.1]){limb([x,y,-.4],[x,y,-1.0],.055,C.metal);ell([x,y,-1.06],.1,.1,.10,'#52766a');}
box(0,2.55,.12,2.7,.075,.57,'#bfd5c7');box(0,-2.58,-.01,2.7,.065,.32,'#bfd5c7');
paint();
// A soft support panel, not an instruction for any named product.
box((sx+feetShift)/2,0,.002,1.66,3.3,.025,C.sheet);
ell([0,1.88,.075],.65,.40,.08,'#efe4cf');
// Safety margin remains inside the mattress; it is not a real-world measurement.
const group=step<7?0:step<13?1:2;
// Caregiver torso indicates the relational near side, without implying staffing sufficiency.
ell([near*2.65,.1,.44],.26,.37,.43,C.cloth);ell([near*2.63,.12,1.07],.18,.19,.22,C.skin);ell([near*2.65,.12,1.19],.19,.20,.17,'#46645b');
limb([near*2.65,-.12,.18],[near*2.80,-.25,-.65],.12,'#708780');limb([near*2.65,.3,.18],[near*2.85,.52,-.65],.12,'#708780');
paint();
// Main body: the same roll drives chest and pelvis.
ell(at([0,.60,0]),.40,.67,.235,C.gown,S.roll);ell(at([0,-.15,0]),.375,.33,.245,C.gown,S.roll);
limb(at([0,1.13,0]),at([0,1.36,0]),.13,C.skin);
// Front neckline and back seam distinguish a roll from a sideways slide.
limb(at([-.18,1.03,.205]),at([0,.86,.237]),.018,'#d7e8e4');limb(at([0,.86,.237]),at([.18,1.03,.205]),.018,'#d7e8e4');
limb(at([0,1.02,-.224]),at([0,.1,-.247]),.013,'#4b7d88');ell(at([0,.72,-.24]),.055,.08,.012,'#d9e8e1',S.roll);
let hr=group===1?Math.sign(S.roll)*Math.min(Math.abs(S.roll),Math.PI/2-.08+S.head*.08):S.roll;
const head=at([0,1.65,0]);ell(head,.26,.34,.27,C.skin,hr);let hair=rot([0,.07,-.17],hr);ell(head.map((v,k)=>v+hair[k]),.265,.285,.155,C.hair,hr);
const fac=(v)=>{let a=rot(v,hr);return a.map((c,k)=>c+head[k]);};ell(fac([0,0,.272]),.054,.082,.06,C.skin,hr);for(let s of [-1,1])ell(fac([s*.102,.081,.238]),.022,.044,.012,'#3c544d',hr);ell(fac([0,-.13,.227]),.067,.014,.011,'#a66b62',hr);
// Legs are bent and crossed through actual hip/knee/ankle point movement.
let legpoints={};for(let sign of [-1,1]){let far=sign===-near,cr=far?S.cross*(1-Math.abs(S.roll)/Math.PI):0;
let hip=at([sign*.22,-.30,0]),knee=at([mix(sign*.27,-sign*.14,cr),mix(-1.04,-.83,cr),.02+cr*.24]),ankle=at([mix(sign*.30,-sign*.26,cr),mix(-1.90,-1.61,cr),.00+cr*.12]);
if(group===2){const lowerDelta=feetShift-sx;knee[0]+=lowerDelta*.7;ankle[0]+=lowerDelta;}
for(const v of [hip,knee,ankle])v[2]=Math.max(v[2],.15);
limb(hip,knee,.165,C.leg);limb(knee,ankle,.125,C.leg);let foot=[ankle[0],ankle[1]-.17,ankle[2]+.025];ell(foot,.13,.25,.12,C.skin,S.roll);legpoints[far?'far':'near']={hip,knee,ankle};}
// Arms with explicit elbow bends. Protected visualisation never compresses an arm beneath the mannequin.
let armpoints={};for(let sign of [-1,1]){let far=sign===-near,cr=far?S.far:0,nr=far?0:S.near,sh=[sign*.40,1.0,0],el=[mix(sign*.65,sign*.50,cr),mix(.42,.62,cr),cr*.27],wr=[mix(sign*mix(.72,.58,nr),-sign*.20,cr),mix(.04,.83,cr),.02+cr*.37];
if(!far&&group!==2){el[0]=sign*mix(.72,.62,nr);wr[0]=sign*mix(.77,.60,nr);}
let a=at(sh),c=at(el),w=at(wr);const angleAbs=Math.abs(S.roll);
if(angleAbs>.5){c[2]=Math.max(c[2],.13);w[2]=Math.max(w[2],.13);if(!far){c[0]=near*(Math.abs(c[0])+Math.sin(angleAbs)*.20);w[0]=near*(Math.abs(w[0])+Math.sin(angleAbs)*.25);}}
if(S.pillow>0&&far){w[0]+=near*.19*S.pillow;w[1]-=.26*S.pillow;w[2]=mix(w[2],.36,S.pillow);}
limb(a,c,.115,C.skin);limb(c,w,.09,C.skin);mitten([w[0],w[1]-.08,w[2]+.012],S.roll,C.skin);armpoints[far?'far':'near']={shoulder:a,elbow:c,wrist:w};}
if(S.pillow>0){let k=S.pillow;ell([mix(near*1.7,near*.64,k),mix(.10,.57,k),.11],.30,.48,.105,C.pillow);ell([mix(near*1.85,near*.44,k),-1.18,.10],.28,.50,.09,C.pillow);}
// The two drawn hands identify source landmarks, not safe manual force/staffing.
if(step>=4&&options.contacts!==false){let targetA,targetB;
if(group<2){targetA=armpoints.far.shoulder.slice();targetB=at([-near*.34,-.17,.14]);}
else{let hChange=step===15?q:S.lowerContacts?1:0;targetA=[sx,mix(1.00,-.2,hChange),.12];targetB=[mix(sx,feetShift,.8*hChange),mix(-.23,-1.25,hChange),.13];}
const h=clamp(S.hands,0,1);[targetA,targetB].forEach((t,i)=>{t[2]=Math.max(t[2],.17);const origin=[near*2.47,i===0?.35:-.16,.67];const w=origin.map((v,k)=>mix(v,t[k],h));const elbow=[mix(origin[0],w[0],.40),mix(origin[1],w[1],.3),mix(origin[2],w[2],.35)+.12];limb(origin,elbow,.09,C.cloth);limb(elbow,w,.064,C.skin);mitten(w,0,C.skin);});}
paint();
if(step===0){tag(p<.5?b('Handwashing acknowledgement','تأكيد غسل اليدين'):b('Explain before handling','اشرح قبل المناولة'),470,68,280);}
else tag(b('Classroom mannequin · no manual-force calculation','نموذج صفّي · لا حساب لقوة المناولة'),470,40,385);
if(!hide){const na=proj([near*1.6,-.7,.15]),fa=proj([-near*1.35,-.7,.05]);tag(b('NEAR: nurse’s side','القريب: جهة الممرض'),na[0]+near*14,na[1]+(near===1?52:-45),196);tag(b('FAR side','الجانب البعيد'),fa[0],fa[1]+(near===1?-50:45),125);text(b('Head','الرأس'),proj([0,2.58,.75])[0],proj([0,2.58,.75])[1],12);text(b('Feet','القدمان'),proj([0,-2.65,.2])[0],proj([0,-2.65,.2])[1],12);}
// Cross-section inset makes roll versus translation visibly distinct.
const ix=165,iy=103;ctx.fillStyle='#fffdf5';ctx.strokeStyle='#d1dec9';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(43,47,247,149,16);ctx.fill();ctx.stroke();
text(group===2?b('Translation, not rotation','انتقال وليس دورانًا'):b('End view: body rotation','منظر طرفي: دوران الجسم'),ix,72,12);
ctx.fillStyle='#cfdfd1';ctx.fillRect(69,159,194,14);ctx.fillStyle='#fff';ctx.fillRect(69,153,194,7);
ctx.save();ctx.translate(ix+sx*30,135);ctx.rotate(-S.roll);ctx.beginPath();ctx.ellipse(0,0,28,16,0,0,7);ctx.fillStyle=C.gown;ctx.fill();ctx.strokeStyle=C.dark;ctx.lineWidth=1.5;ctx.stroke();ctx.beginPath();ctx.arc(0,-17,5,0,7);ctx.fillStyle=C.skin;ctx.fill();ctx.restore();
ctx.fillStyle=C.cloth;ctx.beginPath();ctx.arc(near===1?272:60,133,7,0,7);ctx.fill();
if(group===1)text(b('Head protected throughout','الرأس محمي طوال التقليب'),165,185,10,'#8b6838');
if(group===2)text(b('Illustrative stop inside mattress','توقف توضيحي داخل المرتبة'),165,185,10,'#8b6838');
canvas.dataset.step=String(step);canvas.dataset.progress=p.toFixed(3);canvas.dataset.roll=S.roll.toFixed(4);canvas.dataset.shoulderRoll=S.roll.toFixed(4);canvas.dataset.hipRoll=S.roll.toFixed(4);canvas.dataset.headRoll=hr.toFixed(4);canvas.dataset.upper=sx.toFixed(3);canvas.dataset.lower=feetShift.toFixed(3);
};
