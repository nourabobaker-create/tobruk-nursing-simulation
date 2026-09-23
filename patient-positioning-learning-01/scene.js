'use strict';
// Articulated clothed mannequin. Positions demonstrate source features, not a transfer method.
window.drawPositioning=function(canvas,index,progress,settings={},options={}){
 const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;
 const key=JSON.stringify([index,progress,settings,options,r.width,r.height,devicePixelRatio]);if(canvas._positionKey===key)return;canvas._positionKey=key;
 const ctx=canvas.getContext('2d'),W=960,H=510,dpr=Math.min(devicePixelRatio||1,2);
 if(canvas.width!==Math.round(r.width*dpr)||canvas.height!==Math.round(r.height*dpr)){canvas.width=Math.round(r.width*dpr);canvas.height=Math.round(r.height*dpr);}
 ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);ctx.clearRect(0,0,W,H);
 const ar=options.lang==='ar',hide=!!options.hideLabels,view=options.view||'angled',B=(e,a)=>ar?a:e;
 const C={bg:'#eaf1e8',skin:'#e4b491',light:'#f5d1b1',gown:'#609a99',pants:'#a9c4c1',ink:'#315a53',pillow:'#f2dab0',bed:'#f8f9ef',frame:'#91b0a1',hair:'#3d5956'};
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t,blend=(a,b,t)=>a.map((n,i)=>lerp(n,b[i],t)),smooth=p=>p*p*(3-2*p),q=smooth(clamp(progress));
 const phases=(a,b)=>smooth(clamp((progress-a)/(b-a)));
 const seated=index===1,standing=index===0,bed=!seated&&!standing;
 let cx=477,cy=bed?307:445,scale=bed?112:83,faces=[];
 if(index===9){cy=341;scale=104;}
 if(index===11){cy=325;scale=108;}
 function project(a){let [x,y,z]=a;if(view==='profile')return[cx-y*scale,cy-z*scale,x];if(view==='top')return[cx-y*scale,cy+x*scale*.83,z];return[cx-y*scale*.91+x*scale*.42,cy+x*scale*.25+y*scale*.065-z*scale*.84,x*.528+y*.192+z*.827];}
 function rotX(a,t){return[a[0],a[1]*Math.cos(t)-a[2]*Math.sin(t),a[1]*Math.sin(t)+a[2]*Math.cos(t)];}
 function rotY(a,t){return[a[0]*Math.cos(t)+a[2]*Math.sin(t),a[1],-a[0]*Math.sin(t)+a[2]*Math.cos(t)];}
 function sub(a,b){return a.map((v,i)=>v-b[i]);}function add(a,b){return a.map((v,i)=>v+b[i]);}
 const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
 function face(points,color,tone=1){let p=points.map(project);faces.push({p,z:p.reduce((a,b)=>a+b[2],0)/p.length,c:shade(color,tone)});}
 function shade(hex,k){let n=parseInt(hex.substring(1),16);return 'rgb('+[n>>16,n>>8&255,n&255].map(x=>Math.round(x*k)).join(',')+')';}
 function ell(center,radii,color,transform=null){const rows=10,cols=18,vs=[];for(let i=0;i<=rows;i++){let row=[];for(let j=0;j<=cols;j++){let a=i/rows*Math.PI,b=j/cols*Math.PI*2,v=[radii[0]*Math.sin(a)*Math.cos(b),radii[1]*Math.cos(a),radii[2]*Math.sin(a)*Math.sin(b)];row.push(add(center,transform?transform(v):v));}vs.push(row);}
 for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){let v=[vs[i][j],vs[i+1][j],vs[i+1][j+1],vs[i][j+1]],p=v.map(project);let area=(p[1][0]-p[0][0])*(p[2][1]-p[0][1])-(p[1][1]-p[0][1])*(p[2][0]-p[0][0]);if(area<0)continue;
 let n=cross(sub(v[1],v[0]),sub(v[2],v[0])),len=Math.hypot(...n)||1;let light=.90+.10*clamp((n[0]*.1-n[1]*.5-n[2]*.8)/len);face(v,color,light);}}
 function limb(a,b,rad,col){let d=sub(b,a),len=Math.hypot(...d)||1,u=d.map(v=>v/len),ref=Math.abs(u[2])>.9?[0,1,0]:[0,0,1],xx=cross(u,ref),L=Math.hypot(...xx)||1;xx=xx.map(v=>v/L);let zz=cross(xx,u);ell(blend(a,b,.5),[rad,len/2+rad*.35,rad],col,v=>xx.map((x,i)=>x*v[0]+u[i]*v[1]+zz[i]*v[2]));}
 function box(c,dim,col,fn=x=>x){let pts=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(v=>fn(v.map((x,i)=>c[i]+x*dim[i]/2)));[[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7],[4,5,6,7]].forEach((ids,i)=>face(ids.map(k=>pts[k]),col,.84+i*.033));}
 function paint(){faces.sort((a,b)=>a.z-b.z);for(let f of faces){ctx.beginPath();f.p.forEach((v,i)=>i?ctx.lineTo(v[0],v[1]):ctx.moveTo(v[0],v[1]));ctx.closePath();ctx.fillStyle=f.c;ctx.strokeStyle=f.c;ctx.lineWidth=.65;ctx.fill();ctx.stroke();}faces=[];}
 function txt(text,x,y,size=12,color=C.ink){if(hide)return;ctx.font=(size>15?'600 ':'500 ')+size+'px Arial,sans-serif';ctx.direction=ar?'rtl':'ltr';ctx.textAlign='center';ctx.fillStyle=color;ctx.fillText(text,x,y);}
 function pill(t,x,y,w=230){if(hide)return;ctx.beginPath();ctx.roundRect(x-w/2,y-18,w,28,11);ctx.fillStyle='#fffdf3';ctx.fill();txt(t,x,y,11);}
 function line(a,b,color=C.ink,width=2,dash=[]){ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([]);}
 function hand(c,dir=[0,-1,0],roll=0){ell(c,[.075,.145,.045],C.skin,v=>rotY(v,roll));for(let j=0;j<4;j++){let f=rotY([-.055+j*.034,-.155,0],roll);ell(add(c,f),[.018,.07,.02],C.skin,v=>rotY(v,roll));}ell(add(c,rotY([.095,-.04,0],roll)),[.04,.078,.024],C.skin,v=>rotY(v,roll));}
 let roll=index===6?Math.PI/2*phases(0,.40):index===7?Math.PI*phases(0,.58):index===11?Math.PI:0;
 let angle=index===8||index===9?((settings.angle===1?45:settings.angle===2?90:0)*phases(.05,.73)):0;
 let tilt=index===10?-.18*phases(.05,.75):0;
 const k=index===11?phases(.10,.70):0;
 const chestLift=index===11?.265: .03+Math.sqrt((.42*Math.sin(roll))**2+(.235*Math.cos(roll))**2);
 const upper=angle*Math.PI/180;
 function bedPoint(v){let a=v.slice();if((index===8||index===9)&&a[1]>-.27){let r=rotX([a[0],a[1]+.27,a[2]],upper);a=[r[0],r[1]-.27,r[2]];}if(index===10)a=rotX(a,tilt);return a;}
 function bodyPoint(v){let a=rotY(v,roll);a[2]+=chestLift;if(index===11){a[2]+=k*1.13*clamp((.67-v[1])/.85);a[1]+=k*.1;}return bedPoint(a);}
 ctx.fillStyle=C.bg;ctx.fillRect(0,0,W,H);
 // Decorative room grid remains behind the movement, never substitutes for it.
 line([35,460],[924,460],'#d4e2ce',1);
 if(bed){
 let bedLength=index===7&&settings.feet===2?4.03:5.3,bedY=index===7&&settings.feet===2?.58:0;
 box([0,0,-.39],[2.70,5.45,.13],C.frame);for(let x of [-1.08,1.08])for(let y of [-2.10,2.10]){limb([x,y,-.47],[x,y,-1.02],.055,C.frame);ell([x,y,-1.08],[.115,.09,.11],'#607b6e');}
 if(index===8||index===9){box([0,-1.45,-.14],[2.6,2.36,.25],C.bed);box([0,1.15,-.14],[2.6,2.85,.25],C.bed,bedPoint);}else box([0,bedY,-.14],[2.6,bedLength,.25],C.bed,bedPoint);
 // Subtle seam runs along the mattress sides.
 if(index!==8&&index!==9){for(let s of [-1,1])limb(bedPoint([s*1.28,-2.46+bedY,0]),bedPoint([s*1.28,2.46,0]),.012,'#d6e1d0');}
 }else if(seated){box([0,.50,1.42],[1.43,1.11,.16],C.frame);box([0,1.02,2.23],[1.40,.12,1.52],C.gown);for(let x of [-.59,.59])for(let y of [0,.99])limb([x,y,1.38],[x,y,.06],.06,C.frame);}
 paint();
 let headCenter,headR=roll;const headOff=.04;
 if(index===7){headR=Math.min(roll,Math.PI/2);}
 if(index===11)headR=Math.PI/2;
 let pelvis,shoulders,hip={},elbow={},wrist={},knee={},ankle={},shoulder={},foot={};
 if(standing||seated){
 const slouch=(1-q)*.30;pelvis=[0,seated?.52:0,seated?1.69:2.34];shoulders=[slouch,seated?.52:0,pelvis[2]+1.36];
 limb(pelvis,shoulders,.38,C.gown);ell(pelvis,[.42,.26,.33],C.gown);headCenter=[slouch*(1-q),shoulders[1],shoulders[2]+.74];
 limb([shoulders[0],shoulders[1],shoulders[2]+.20],[headCenter[0],headCenter[1],headCenter[2]-.27],.13,C.skin);
 for(let s of [-1,1]){shoulder[s]=[shoulders[0]+s*.48,shoulders[1],shoulders[2]-.07];hip[s]=[s*.22,pelvis[1],pelvis[2]-.1];
 if(standing){let sep=lerp(.08,.27,q);knee[s]=[s*sep,.01,1.19];ankle[s]=[s*sep,0,.18];foot[s]=[s*sep,-.16,.12];elbow[s]=[s*.58,0,shoulders[2]-.70];wrist[s]=[s*.62,-.01,shoulders[2]-1.32];}
 else{knee[s]=[s*.29,-.52,1.43];ankle[s]=[s*.29,-.60,lerp(.50,.17,phases(.10,.55))];foot[s]=[s*.29,-.81,ankle[s][2]-.04];
 elbow[s]=[s*.64,.48,2.25];wrist[s]=[s*.66,-.21,lerp(1.64,2.25,phases(.4,.82))];if(settings.arms===2){wrist[s]=[s*.20,-.03,lerp(1.64,1.86,q)];elbow[s]=[s*.60,.48,2.21];}if(settings.arms===3){wrist[s]=[s*.40,-.78,lerp(1.64,2.35,q)];elbow[s]=[s*.57,-.20,2.40];}}
 }
 if(seated&&settings.arms===1){for(let s of [-1,1]){box([s*.65,.18,2.17],[.20,.89,.10],C.frame);limb([s*.64,.57,1.46],[s*.64,.57,2.16],.045,C.frame);}}
 if(seated&&settings.arms===3)box([0,-.80,2.25],[1.72,.85,.12],C.pillow);
 if(!hide)txt(standing?B('Posture adjustment, not a transfer','تعديل وضعية، لا نقل مريض'):B('Both feet reach floor · weight distribution not measured','القدمان على الأرض · لا يُقاس توزيع الوزن'),480,470,12);
 }else{
 pelvis=bodyPoint([0,-.16,0]);shoulders=bodyPoint([0,.94,0]);
 limb(bodyPoint([0,-.02,0]),bodyPoint([0,.71,0]),.33,C.gown);ell(pelvis,[.375,.34,.225],C.gown,v=>rotX(rotY(v,roll),upper));
 ell(bodyPoint([0,.68,0]),[.43,.57,.235],C.gown,v=>rotX(rotY(v,roll),upper));
 limb(bodyPoint([0,1.10,0]),bodyPoint([0,1.39,0]),.12,C.skin);
 headCenter=bodyPoint([0,1.66,.02]);if(index===4||index===3&&settings.head===1)headCenter[2]+=.12*phases(.72,1);
 // Marker seams make front/back orientation visible without requiring labels.
 limb(bodyPoint([-.18,1.06,.21]),bodyPoint([0,.93,.24]),.018,'#d9e8df');limb(bodyPoint([0,.93,.24]),bodyPoint([.18,1.06,.21]),.018,'#d9e8df');limb(bodyPoint([0,.85,-.24]),bodyPoint([0,.08,-.23]),.014,'#457d7c');
 for(let s of [-1,1]){hip[s]=bodyPoint([s*.23,-.35,0]);shoulder[s]=bodyPoint([s*.43,1,0]);let K=[s*.26,-1.14,-.07],A=[s*.28,-2.04,-.12];let E=[s*.63,.49,.02],R=[s*.68,-.05,.02];
 if(index===3&&(settings.legs===2||settings.knee===1)){K[2]=.12*q;A[1]+=.06*q;}
 if(index===4){let t=phases(.05,.60);K=blend(K,[s*.47,-.93,.82],t);A=blend(A,[s*.48,-1.43,-.14],t);}
 if(index===5){let t=phases(.04,.64);K=blend(K,[s*.71,-.48,1.04],t);A=blend(A,[s*.86,-1.27,1.05],t);}
 if(index===6){let t=phases(.38,.83);K=blend(K,s===-1?[-.28,.01,.78]:[.26,-1.04,.09],t);A=blend(A,s===-1?[-.28,-.81,.83]:[.3,-1.95,.06],t);E=s===-1?[-.60,.73,.26]:[.62,.30,-.22];R=s===-1?[-.20,1.12,.39]:[.67,-.15,-.16];}
 if(index===7){if(settings.feet===1){K[2]-=.10*phases(.6,1);A[2]-=.20*phases(.6,1);} }
 if(index===8||index===9){K[2]=.12*phases(.7,1);A[1]+=.05*phases(.7,1);}
 if(index===10){K[2]=.10*phases(.55,1);A[1]+=.04*phases(.55,1);}
 if(index===11){K=blend(K,[s*.38,-.30,.12],k);A=blend(A,[s*.38,-1.13,.12],k);}
 // Source arm alternatives: chest, alongside, comfortably flexed, or above head.
 if(index===4||index===5){const armsT=phases(.54,.96);if(settings.arms===2){E=blend(E,[s*.65,1.5,.06],armsT);R=blend(R,[s*.45,2.17,.06],armsT);}else{E=blend(E,[s*.52,.48,.19],armsT);R=blend(R,[s*.15,.77,.35],armsT);}}
 if(index===3&&settings.arms===2){R=blend(R,[s*.50,.43,.29],q);}
 if(index===7&&(settings.arms===2||settings.arms===3)||index===11){let armT=index===11?1:phases(.18,.64);if(settings.arms===(index===11?2:3)){E=blend(E,[s*.58,1.40,-.04],armT);R=blend(R,[s*.43,2.16,-.04],armT);}else{E=blend(E,[s*.74,1.26,-.01],armT);R=blend(R,[s*.48,1.76,-.03],armT);}}
 knee[s]=bodyPoint(K);ankle[s]=bodyPoint(A);elbow[s]=bodyPoint(E);wrist[s]=bodyPoint(R);
 if(index===11){knee[s]=blend(knee[s],[s*.38,-.25,.17],k);ankle[s]=blend(ankle[s],[s*.38,-1.15,.14],k);}
 if(index===6||index===7){elbow[s][2]=Math.max(elbow[s][2],.11);wrist[s][2]=Math.max(wrist[s][2],.11);}
 foot[s]=add(ankle[s],rotX(rotY([0,-.15,.08],roll),upper));
 }
 // Actual support objects travel into place after the body has reached its schematic alignment.
 const support=phases(.72,1);
 if((index===3&&settings.head===1)||index===4){ell(bedPoint([lerp(1.72,0,support),1.68,.06]),[.45,.38,.075],C.pillow,v=>rotX(v,upper));}
 if(index===3&&settings.knee===1||index===8||index===9||index===10){ell(bedPoint([lerp(1.75,0,support),-1.14,.11]),[.44,.16,.115],C.pillow);}
 if(index===10){ell(bedPoint([lerp(1.75,0,support),1.02,.11]),[.51,.19,.115],C.pillow,v=>rotX(v,tilt));}
 if(index===7&&settings.feet===1){ell([lerp(1.7,0,support),-1.89,.15],[.50,.32,.17],C.pillow);}
 if(index===5){let t=phases(.03,.65);for(let s of [-1,1]){let point=ankle[s];let supportPoint=[point[0],point[1],point[2]-.14];limb([s*1.2,-1.47,-.39],supportPoint,.033,C.frame);ell(supportPoint,[.22,.33,.10],C.pillow);}}
 }
 // Articulated limbs and clothed mannequin, not a nudity/examination scene.
 for(let s of [-1,1]){limb(hip[s],knee[s],.16,C.pants);limb(knee[s],ankle[s],.12,C.pants);ell(foot[s],[.125,.24,.11],C.skin,bed?v=>rotX(rotY(v,roll),upper):null);limb(shoulder[s],blend(shoulder[s],elbow[s],.53),.135,C.gown);limb(blend(shoulder[s],elbow[s],.46),elbow[s],.11,C.skin);limb(elbow[s],wrist[s],.085,C.skin);hand(add(wrist[s],bed?[0,-.08,0]:[0,-.06,-.03]),[0,-1,0],bed?roll:0);}
 const hf=bed?v=>rotX(rotY(v,headR),upper):v=>[v[0],-v[2],v[1]];
 ell(headCenter,[.255,.34,.265],C.skin,hf);ell(add(headCenter,hf([0,.075,-.17])),[.258,.285,.15],C.hair,hf);ell(add(headCenter,hf([0,.015,.265])),[.05,.075,.055],C.skin,hf);for(let s of [-1,1])ell(add(headCenter,hf([s*.098,.10,.238])),[.020,.035,.009],C.ink,hf);ell(add(headCenter,hf([0,-.13,.232])),[.059,.010,.009],'#9e6e60',hf);
 paint();
 // Minimal functional inset. Angles shown only where the teaching files supply them.
 if(index===8||index===9){ctx.fillStyle='#fffdf4';ctx.beginPath();ctx.roundRect(37,38,241,126,15);ctx.fill();const x=99,y=135,L=104,a=upper;line([x,y],[x+132,y],C.frame,6);line([x,y],[x-L*Math.cos(a),y-L*Math.sin(a)],C.gown,6);ctx.beginPath();ctx.arc(x,y,37,Math.PI,Math.PI+a);ctx.strokeStyle='#b88d4d';ctx.lineWidth=2;ctx.stroke();txt(Math.round(angle)+'°',198,83,28);txt(B('Source target ≈ ','هدف المصدر نحو ')+(index===8?'45°':'90°'),165,109,12);}
 if(index===10){pill(B('Whole-bed tilt · no angle specified','ميل السرير كله · لا زاوية محددة'),475,41,361);let h=project(bedPoint([0,2.63,.07])),f=project(bedPoint([0,-2.63,.07]));txt(B('Head end: lower','طرف الرأس أدنى'),h[0],h[1]-28,12);txt(B('Foot end: higher','طرف القدم أعلى'),f[0],f[1]-28,12);}
 if(index===1){ctx.fillStyle='#fffdf4';ctx.beginPath();ctx.roundRect(54,53,235,113,15);ctx.fill();line([77,108],[171,108],C.frame,12);line([204,91],[204,141],C.skin,16);line([179,112],[194,112],'#c19452',3);txt(B('1–2 inch gap (source)','فجوة 1–2 بوصة (المصدر)'),174,81,13);txt(B('Seat edge ↔ back of knee','حافة المقعد ↔ خلف الركبة'),173,153,11);}
 if(index===6)pill(B('Left-side example · right knee higher','مثال الجانب الأيسر · الركبة اليمنى أعلى'),480,40,350);
 if(index===7)pill(settings.feet===2?B('Source option: feet beyond mattress','خيار المصدر: القدمان خارج المرتبة'):B('Source option: pillow keeps toes clear','خيار المصدر: وسادة تبقي الأصابع خالية'),480,41,367);
 if(index===11)pill(B('Chest down · hips raised · head to side','الصدر منخفض · الوركان مرفوعان · الرأس جانبي'),480,42,377);
 if(index===3||index===4||index===5)pill(index===5?B('Lower legs in stirrups','الساقان في الركابين'):index===4?B('Soles flat on mattress','باطنا القدمين على المرتبة'):B('Flat bed · source support choices','سرير أفقي · بدائل دعم المصدر'),480,40,320);
 canvas.dataset.pose=index;canvas.dataset.progress=progress.toFixed(3);canvas.dataset.angle=angle.toFixed(1);canvas.dataset.tilt=tilt.toFixed(3);canvas.dataset.roll=roll.toFixed(3);canvas.dataset.headRoll=headR.toFixed(3);canvas.dataset.toes=index===7?(settings.feet===1?'pillow':settings.feet===2?'edge':'unselected'):'n/a';canvas.dataset.view=view;
};
