/* Small software 3D renderer: perspective, depth sorting, shaded geometry and articulated limbs.
   No external scripts, textures or graphics-driver requirement. */
const add=(a,b)=>a.map((x,i)=>x+b[i]),sub=(a,b)=>a.map((x,i)=>x-b[i]),mul=(a,k)=>a.map(x=>x*k);
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const len=a=>Math.hypot(...a),norm=a=>mul(a,1/(len(a)||1)),lerp=(a,b,t)=>a.map((x,i)=>x+(b[i]-x)*t);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const palette={skin:'#c18e70',skin2:'#a87559',scrub:'#718e9f',scrubLight:'#85a0af',metal:'#b7c5c7',white:'#eff2ec',navy:'#214651'};
const shadeCache=new Map();
function shade(color,amount){const k=color+Math.round(amount*40);if(shadeCache.has(k))return shadeCache.get(k);const n=parseInt(color.slice(1),16),r=(n>>16)&255,g=(n>>8)&255,b=n&255;const v=`rgb(${clamp(r*amount,0,255)|0},${clamp(g*amount,0,255)|0},${clamp(b*amount,0,255)|0})`;shadeCache.set(k,v);return v;}
function box(faces,c,w,h,d,color,split=false){const v=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(p=>[c[0]+p[0]*w/2,c[1]+p[1]*h/2,c[2]+p[2]*d/2]);for(const ids of [[0,3,2,1],[4,5,6,7],[0,4,7,3],[1,2,6,5],[3,7,6,2],[0,1,5,4]]){const q=ids.map(i=>v[i]);if(!split){faces.push({v:q,color});continue;}const u=sub(q[1],q[0]),v2=sub(q[3],q[0]),nu=Math.max(1,Math.ceil(len(u)/.14)),nv=Math.max(1,Math.ceil(len(v2)/.14));for(let i=0;i<nu;i++)for(let j=0;j<nv;j++){const at=(a,b)=>add(q[0],add(mul(u,a/nu),mul(v2,b/nv)));faces.push({v:[at(i,j),at(i+1,j),at(i+1,j+1),at(i,j+1)],color});}}}
const unitSphere=[];
for(let i=0;i<12;i++)for(let j=0;j<20;j++){const a=i/12*Math.PI,b=(i+1)/12*Math.PI,c=j/20*Math.PI*2,d=(j+1)/20*Math.PI*2;const p=(t,f)=>[Math.sin(t)*Math.cos(f),Math.cos(t),Math.sin(t)*Math.sin(f)];unitSphere.push([p(a,c),p(b,c),p(b,d),p(a,d)]);}
function ellipsoid(f,c,r,color,transform){for(const v of unitSphere){const pts=v.map(p=>add(c,p.map((q,i)=>q*r[i])));f.push({v:transform?pts.map(transform):pts,color});}}
function cylinder(f,a,b,r1,r2,color,segments=12,transform){const axis=norm(sub(b,a)),u=norm(cross(axis,Math.abs(axis[1])>.9?[1,0,0]:[0,1,0])),v=cross(axis,u);const ring=(c,r,t)=>add(c,add(mul(u,Math.cos(t)*r),mul(v,Math.sin(t)*r)));for(let i=0;i<segments;i++){const t=i/segments*Math.PI*2,t2=(i+1)/segments*Math.PI*2;let pts=[ring(a,r1,t),ring(b,r2,t),ring(b,r2,t2),ring(a,r1,t2)];f.push({v:transform?pts.map(transform):pts,color});}}
function limb(f,a,b,c,r,color,transform){cylinder(f,a,b,r,r*.86,color,10,transform);ellipsoid(f,b,[r*.87,r*.87,r*.87],color,transform);cylinder(f,b,c,r*.86,r*.57,color,10,transform);ellipsoid(f,a,[r,r,r],color,transform);}
function flat(f,v,color,alpha){f.push({v,color,alpha});}
export class Room {
 constructor(canvas,getState,onChange){this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.getState=getState;this.onChange=onChange;this.camera={x:-2.3,y:1.72,z:2.4,yaw:.68,pitch:-.27};this.target=null;this.preview={};this.selected='';this.reduced=false;this.keys={};this.static=this.buildRoom();this.hotspots=[];this.last=0;this.frame=0;this.drag=null;this.moved=false;this.install();requestAnimationFrame(t=>this.tick(t));}
 install(){const c=this.canvas;
  c.addEventListener('pointerdown',e=>{if(e.button!==0)return;this.drag={x:e.clientX,y:e.clientY,yaw:this.camera.yaw,pitch:this.camera.pitch};this.target=null;this.moved=false;c.setPointerCapture(e.pointerId);});
  c.addEventListener('pointermove',e=>{if(!this.drag)return;let dx=e.clientX-this.drag.x,dy=e.clientY-this.drag.y;if(Math.abs(dx)+Math.abs(dy)>5)this.moved=true;this.camera.yaw=this.drag.yaw-dx*.004;this.camera.pitch=clamp(this.drag.pitch+dy*.004,-1.1,.65);});
  c.addEventListener('pointerup',()=>{this.drag=null;});
  c.addEventListener('wheel',e=>{e.preventDefault();this.walk(0,e.deltaY<0?.16:-.16);},{passive:false});
  window.addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;if(['w','a','s','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){this.keys[e.key]=true;e.preventDefault();}});
  window.addEventListener('keyup',e=>delete this.keys[e.key]);window.addEventListener('blur',()=>this.keys={});
 }
 buildRoom(){const f=[];
  // A warm, daylight teaching room; walls are tiled to allow near-plane clipping.
  for(let x=-4;x<4;x+=.8)for(let z=-4;z<4;z+=.8){box(f,[x+.4,-.04,z+.4],.794,.08,.794,(Math.round(x/.8)+Math.round(z/.8))%2?'#d0d6d1':'#d8ddd6');}
  for(let x=-4;x<4;x+=1){box(f,[x+.5,1.6,-4.04],1,3.2,.1,'#e0e7df');box(f,[x+.5,1.6,4.04],1,3.2,.1,'#dddcd0');}
  for(let z=-4;z<4;z+=1){box(f,[-4.04,1.6,z+.5],.1,3.2,1,'#d9e3de');box(f,[4.04,1.6,z+.5],.1,3.2,1,'#eeeae1');}
  box(f,[0,3.3,0],8,.12,8,'#ecede4');
  // Skirting, medical service panel, window and coastal daylight.
  box(f,[0,.12,-3.92],8,.24,.06,'#9fbbb8');box(f,[-3.92,.12,0],.06,.24,8,'#9fbbb8');
  box(f,[0,1.55,-3.9],2.3,.36,.08,'#bfcecc');box(f,[0,1.55,-3.82],1.7,.1,.08,'#e7eae0');
  for(let x of [-.55,-.23,.23,.55]){ellipsoid(f,[x,1.55,-3.75],[.04,.04,.02],x<0?'#e6aa50':'#719e96');}
  box(f,[3.89,1.85,-1.6],.1,1.7,2.4,'#faf9ef');box(f,[3.82,1.85,-1.6],.03,1.48,2.18,'#a6c7d1');box(f,[3.78,1.47,-1.6],.015,.4,2.16,'#86b4ba');
  for(let z of [-2.65,-1.6,-.55])box(f,[3.72,1.85,z],.1,1.6,.045,'#f4f5ea');box(f,[3.72,1.85,-1.6],.1,.05,2.25,'#f4f5ea');
  // Daylight pools on the floor.
  for(let z of [-1.5,-.3])flat(f,[[.8,.012,z],[2.9,.012,z-.2],[3.7,.012,z+.35],[1.6,.012,z+.65]],'#f8edcc',.26);
  // Door with glazed panel.
  box(f,[-2.6,1.1,3.89],1.16,2.2,.12,'#b69d7d');box(f,[-2.6,1.64,3.81],.76,.76,.025,'#84a1a5');cylinder(f,[-2.17,1,3.75],[-2.17,1,3.61],.026,.026,'#667f81');
  // Sink station.
  box(f,[-3.22,.46,-2.7],1.15,.88,.65,'#bfcfca');box(f,[-3.22,.93,-2.7],1.28,.12,.75,'#f6f6ee');ellipsoid(f,[-3.22,.99,-2.68],[.43,.02,.24],'#a9b6b2');ellipsoid(f,[-3.22,1.001,-2.68],[.33,.012,.17],'#667d7a');
  cylinder(f,[-3.22,1,-2.93],[-3.22,1.27,-2.93],.023,.023,'#bdcecc');cylinder(f,[-3.22,1.27,-2.93],[-3.22,1.27,-2.7],.023,.022,'#bdcecc');
  box(f,[-3.65,1.02,-2.72],.11,.2,.1,'#93b7b3');box(f,[-3.65,1.14,-2.72],.14,.04,.035,'#e0e4da');
  box(f,[-3.68,1.6,-3.85],.35,.42,.17,'#f1f0e3');box(f,[-3.68,1.35,-3.74],.2,.13,.015,'#fffdf3');
  cylinder(f,[-2.4,.07,-2.8],[-2.4,.48,-2.8],.19,.22,'#839b99');ellipsoid(f,[-2.4,.5,-2.8],[.22,.035,.22],'#d5dfd6');
  // Equipment trolley, casters, pillow shelf and blue glove box.
  for(let x of [1.9,2.65])for(let z of [.0,.6]){cylinder(f,[x,.12,z],[x,.98,z],.025,.025,'#b7c6c2');ellipsoid(f,[x,.1,z],[.055,.07,.035],'#394f55');}
  box(f,[2.275,.98,.3],.9,.07,.76,'#cbd6d1');box(f,[2.275,.4,.3],.87,.05,.72,'#b9cbc7');
  for(let n=0;n<3;n++)ellipsoid(f,[2.3,.46+n*.075,.3],[.32,.065,.23],'#f2efe3');
  box(f,[2.08,1.07,.13],.3,.16,.22,'#6996a5');box(f,[2.08,1.16,.13],.15,.008,.07,'#264956');box(f,[2.43,1.085,.13],.11,.18,.11,'#dae6d9');
  // Chair.
  box(f,[2.8,.48,2.7],.62,.08,.58,'#4f797b');box(f,[2.8,.89,2.95],.62,.73,.085,'#4f797b');for(let x of [2.55,3.05])for(let z of [2.48,2.91])cylinder(f,[x,.04,z],[x,.46,z],.018,.018,'#9dadaa');
  // Bedside cabinet and call bell.
  box(f,[-1.3,.44,-1.8],.52,.8,.52,'#baad93');box(f,[-1.3,.87,-1.8],.59,.065,.59,'#e6e3d6');box(f,[-1.3,.65,-1.522],.44,.24,.015,'#d1c5ac');cylinder(f,[-1.45,.64,-1.50],[-1.15,.64,-1.50],.013,.013,'#849b9b');
  // Ceiling lighting and curtain track.
  box(f,[0,3.17,-.25],1.4,.04,.5,'#fffdf0');for(let z of [-2,2])cylinder(f,[-1.8,3,z],[1.8,3,z],.025,.025,'#9aada8');cylinder(f,[1.8,3,-2],[1.8,3,2],.025,.025,'#9aada8');
  return f;
 }
 walk(side,forward){this.target=null;const c=this.camera;let x=c.x+Math.sin(c.yaw)*forward+Math.cos(c.yaw)*side,z=c.z-Math.cos(c.yaw)*forward+Math.sin(c.yaw)*side;x=clamp(x,-3.55,3.55);z=clamp(z,-3.55,3.5);
  if(Math.abs(x)<.87&&z>-1.65&&z<1.55){if(Math.abs(c.x)>=.87)x=c.x;else z=c.z;}c.x=x;c.z=z;}
 focus(id){const positions={room:[-2.3,1.72,2.4,0,.7,0],bed:[-1.65,1.68,.28,0,.87,-.15],patient:[-1.45,1.7,-.75,0,1.05,-.5],body:[-1.5,1.73,.17,0,1,-.2],farArm:[-1.1,1.92,-.05,.12,1,-.58],nearArm:[-1.1,1.92,-.05,-.25,1,-.55],leg:[-1.3,1.78,.9,.12,1,.55],head:[-1.25,1.78,-1.32,0,1,-1.18],sink:[-2.68,1.64,-1.76,-3.23,1.05,-2.75],pillows:[1.35,1.62,1.3,2.2,.85,.25],sheet:[1.35,1.65,1.35,1.3,.98,-.1],curtain:[-1.6,1.7,1.55,1.8,1.5,1.5],stance:[-2,1.8,1.1,-.9,1,.2],bell:[-1.9,1.62,-.72,-1.3,.88,-1.8]};let p=positions[id]||positions.bed;
  let dir=sub(p.slice(3),p.slice(0,3));this.target={x:p[0],y:p[1],z:p[2],yaw:Math.atan2(dir[0],-dir[2]),pitch:Math.atan2(dir[1],Math.hypot(dir[0],dir[2]))};if(this.reduced){Object.assign(this.camera,this.target);this.target=null;}}
 project(p){const c=this.camera,dx=p[0]-c.x,dy=p[1]-c.y,dz=p[2]-c.z,sy=Math.sin(c.yaw),cy=Math.cos(c.yaw),sp=Math.sin(c.pitch),cp=Math.cos(c.pitch);let x=dx*cy+dz*sy,z=dx*sy-dz*cy,y=dy*cp-z*sp;z=dy*sp+z*cp;return {x:this.w/2+x*this.focal/z,y:this.h/2-y*this.focal/z,z};}
 cameraPoint(p){const c=this.camera,dx=p[0]-c.x,dy=p[1]-c.y,dz=p[2]-c.z,sy=Math.sin(c.yaw),cy=Math.cos(c.yaw),sp=Math.sin(c.pitch),cp=Math.cos(c.pitch),z=dx*sy-dz*cy;return[dx*cy+dz*sy,dy*cp-z*sp,dy*sp+z*cp];}
 drawFaces(faces){const ctx=this.ctx,light=norm([-1,2,-.6]),cam=[this.camera.x,this.camera.y,this.camera.z],render=[];
  for(const face of faces){let pts=face.v;const n=norm(cross(sub(pts[1],pts[0]),sub(pts[2],pts[0])));const center=mul(pts.reduce((a,p)=>add(a,p),[0,0,0]),1/pts.length);
   // Keep both sides for simple room surfaces and soft geometry.
   let ns=dot(n,sub(cam,center))<0?mul(n,-1):n;
   let cp=pts.map(p=>this.cameraPoint(p)),clipped=[];
   for(let i=0;i<cp.length;i++){const a=cp[i],b=cp[(i+1)%cp.length],ai=a[2]>.07,bi=b[2]>.07;if(ai)clipped.push(a);if(ai!==bi){let t=(.07-a[2])/(b[2]-a[2]);clipped.push(lerp(a,b,t));}}
   if(clipped.length<3)continue;let p=clipped.map(v=>[this.w/2+v[0]*this.focal/v[2],this.h/2-v[1]*this.focal/v[2]]);
   if(p.every(v=>v[0]<-50)||p.every(v=>v[0]>this.w+50)||p.every(v=>v[1]<-50)||p.every(v=>v[1]>this.h+50))continue;
   const depth=cp.reduce((s,v)=>s+v[2],0)/cp.length;const brightness=.67+Math.max(0,dot(ns,light))*.31+Math.max(0,ns[1])*.09;
   render.push({p,depth,color:shade(face.color,brightness),alpha:face.alpha||1});
  }
  render.sort((a,b)=>b.depth-a.depth);
  for(const f of render){ctx.beginPath();ctx.moveTo(...f.p[0]);for(let i=1;i<f.p.length;i++)ctx.lineTo(...f.p[i]);ctx.closePath();ctx.fillStyle=f.color;ctx.globalAlpha=f.alpha;ctx.fill();if(f.alpha===1){ctx.strokeStyle=f.color;ctx.lineWidth=.65;ctx.stroke();}}ctx.globalAlpha=1;
 }
 buildBed(f,s){const y=.45+s.height*.0045;this.bedY=y;
  box(f,[0,.27,0],.6,.18,1.65,'#80979a');box(f,[0,y-.21,0],.98,.13,2.36,'#adbdba');cylinder(f,[0,.3,0],[0,y-.2,0],.13,.11,'#b5c4c1');
  for(let x of [-.42,.42])for(let z of [-.91,.91]){ellipsoid(f,[x,.12,z],[.08,.10,.045],'#344b50');if(s.brakes)box(f,[x-.07,.13,z],.12,.05,.06,'#4eaca0');}
  box(f,[0,y-.06,0],1.08,.13,2.33,'#d3dccc',true);box(f,[0,y+.015,0],1.07,.045,2.31,'#f4f0e3',true);
  for(let z of [-1.28,1.28]){box(f,[0,y+.18,z],1.1,.54,.095,'#799397');box(f,[0,y+.24,z+(z<0?.06:-.06)],.88,.19,.03,'#b2c6c4');}
  const railY=s.rail?y+.38:y-.15;for(let z of [-.8,.65])cylinder(f,[.58,y-.12,z],[.58,railY,z],.022,.022,'#b7c7c5');cylinder(f,[.58,railY,-.8],[.58,railY,.65],.025,.025,'#c9d5d0');
  box(f,[-.59,y-.12,.85],.09,.24,.19,'#355b63');box(f,[-.645,y-.1,.85],.012,.09,.12,'#64baae');
  ellipsoid(f,[0,y+.09,-.98],[.35,.10,.25],'#f1ecdd');
  // Prepared slide sheet begins under manikin; inspection changes exposed handle colour.
  box(f,[0,y+.042,-.04],1.12,.012,1.5,s.sheet?'#82bab3':'#c1d2c7',true);
  for(let z of [-.62,.27]){cylinder(f,[-.57,y+.06,z-.085],[-.57,y+.06,z+.085],.027,.027,s.grip==='sheet'?'#dab087':'#338a83');}
  if(s.bell)box(f,[-.32,y+.16,-.79],.05,.025,.09,'#3e8890');else box(f,[-1.24,.92,-1.7],.06,.025,.1,'#3e8890');
  // Contact shadows, intentionally subtle rather than floating parts.
  ellipsoid(f,[0,y+.045,-.15],[.25,.004,.85],'#b8beb0');
 }
 buildPatient(f,s){const bed=this.bedY,slide=s.scenario==='slide'?-s.progress*.22:0,roll=s.scenario==='slide'?0:s.progress*(s.scenario==='prone'?Math.PI:Math.PI/2);const lift=.14+Math.sin(roll)*.09;
  const trans=p=>[p[0]*Math.cos(roll)-p[1]*Math.sin(roll)+slide,bed+lift+p[0]*Math.sin(roll)+p[1]*Math.cos(roll),p[2]];
  this.patientTransform=trans;
  const skin=palette.skin,scrub=palette.scrub,flash=k=>s.flash===k?'#d77961':skin;
  // Gowned adult male training manikin; individual joints and anatomical landmarks.
  ellipsoid(f,[0,0,-.50],[.205,.12,.295],scrub,trans);ellipsoid(f,[0,-.005,-.16],[.17,.112,.16],scrub,trans);ellipsoid(f,[0,-.005,.035],[.18,.117,.15],scrub,trans);
  cylinder(f,[0,0,-.77],[0,.008,-.93],.065,.063,skin,12,trans);
  // Head rotates independently at the neck for prone face clearance.
  let hr=-Math.min(1,s.head/70)*Math.PI/2;const headT=p=>{let x=p[0],y=p[1]-.022;const v=trans([x*Math.cos(hr)-y*Math.sin(hr),.022+x*Math.sin(hr)+y*Math.cos(hr),p[2]]);v[1]+=.075;return v;};
  ellipsoid(f,[0,.015,-1.034],[.098,.105,.13],flash('head'),headT);ellipsoid(f,[0,-.025,-1.067],[.101,.075,.101],'#3c3933',headT);
  ellipsoid(f,[0,.074,-.977],[.066,.061,.051],skin,headT);ellipsoid(f,[0,.123,-1.009],[.02,.034,.047],'#c49170',headT);
  for(let x of [-.039,.039]){ellipsoid(f,[x,.104,-1.044],[.023,.006,.012],'#d8c8ad',headT);ellipsoid(f,[x,.110,-1.044],[.012,.004,.006],'#263a3b',headT);cylinder(f,[x-.023,.111,-1.063],[x+.019,.111,-1.066],.004,.004,'#564638',6,headT);}
  cylinder(f,[-.025,.115,-.960],[.025,.115,-.960],.004,.004,'#865348',8,headT);for(let x of [-.102,.102])ellipsoid(f,[x,.015,-1.033],[.018,.029,.034],skin,headT);
  // Arms: far arm folds across chest; near arm remains outside the trunk.
  const a=clamp(s.farArm/82,0,1),n=clamp(s.nearArm/88,0,1),side=Math.sin(roll);const fs=[.204,0,-.692],fe=lerp([.26,-.035,-.37],[.26,.12,-.51],a),fw=lerp([.24,-.03,-.10],[-.07+(s.supports.arm?.14*side:0),.19,-.62],a);
  const ns=[-.204,0,-.692],ne=lerp(lerp([-.10,-.11,-.4],[-.285,.015,-.44],n),[-.14,.27,-.54],side*n),nw=lerp(lerp([-.03,-.12,-.15],[-.31,.035,-.19],n),[-.16,.43,-.37],side*n);
  const arm=(shoulder,elbow,wrist,color)=>{cylinder(f,shoulder,lerp(shoulder,elbow,.4),.069,.058,scrub,12,trans);limb(f,lerp(shoulder,elbow,.33),elbow,wrist,.047,color,trans);ellipsoid(f,add(wrist,[0,.006,.052]),[.038,.025,.065],color,trans);for(let i=0;i<4;i++)cylinder(f,add(wrist,[-.024+i*.015,.014,.06]),add(wrist,[-.024+i*.015,.009,.1]),.007,.006,color,6,trans);};
  arm(fs,fe,fw,flash('farArm'));arm(ns,ne,nw,flash('nearArm'));
  const k=clamp(s.leg/80,0,1),fk=s.scenario==='slide'?lerp([.21,-.015,.52],[.11,-.015,.52],k):lerp([.125,-.018,.52],[-.05,.18,.48],k),ff=s.scenario==='slide'?lerp([.25,-.025,.95],[.11,-.025,.95],k):lerp([.13,-.025,.94],[-.16,.04,.85],k);const nk=[-.12,-.018,.51],nf=[-.12,-.025,.96];
  if(s.supports.leg&&s.scenario==='side'){fk[0]+=.14;ff[0]+=.2;}
  for(let [hip,knee,foot,color] of [[[.105,0,.09],fk,ff,flash('leg')],[[-.105,0,.09],nk,nf,skin]]){cylinder(f,hip,lerp(hip,knee,.38),.087,.08,scrub,12,trans);limb(f,lerp(hip,knee,.30),knee,foot,.067,color,trans);ellipsoid(f,add(foot,[0,.026,.07]),[.043,.07,.09],color,trans);}
  // Gown seam and modest lower-body coverage move with torso.
  cylinder(f,[0,.123,-.7],[0,.128,-.1],.002,.002,'#8ba7b4',6,trans);
  if(s.supports.arm)ellipsoid(f,[-.25,bed+.15,-.5],[.26,.085,.22],'#f2ebd8');
  if(s.supports.leg)ellipsoid(f,s.scenario==='prone'?[slide,bed+.06,.88]:[-.13,bed+.17,.67],s.scenario==='prone'?[.29,.05,.16]:[.21,.09,.42],'#f2ebd8');
  if(s.supports.back)ellipsoid(f,[.21,bed+.20,-.35],[.13,.2,.4],'#e7e0ce');
  this.parts={farArm:trans(fw),nearArm:trans(nw),leg:trans(fk),head:headT([0,.1,-1.04]),body:trans([0,.14,-.35]),support_arm:[-.38,bed+.22,-.53],support_leg:[-.15,bed+.2,.6],support_back:[.3,bed+.21,-.2]};
 }
 buildNurse(f,s){if(!s.helper)return;const x=1.02,y=0,z=-.2,skin='#bc9173',uniform='#477d79';
  ellipsoid(f,[x,1.44,z],[.085,.12,.09],skin);ellipsoid(f,[x,1.49,z+.02],[.09,.085,.08],'#3d3935');ellipsoid(f,[x,1.11,z],[.13,.21,.09],uniform);ellipsoid(f,[x,.88,z],[.14,.1,.10],uniform);
  for(let side of [-1,1]){limb(f,[x+side*.075,.83,z],[x+side*.1,.46,z+.04],[x+side*.16,.08,z+.04],.06,'#2e5a59');ellipsoid(f,[x+side*.16,.06,z-.04],[.066,.05,.13],'#e5e8dc');limb(f,[x+side*.12,1.26,z],[x+side*.16,1.04,z-.1],[.57,this.bedY+.14,side<0?-.62:.27],.04,skin);}
 }
 makeHotspots(s){const b=this.bedY,p=this.parts;this.hotspots=[
  {id:'patient',p:[0,b+.55,-.92],label:'patient',always:true},
  {id:'body',p:p.body,label:'body',detail:true},
  ...['farArm','nearArm','leg','head'].map(id=>({id,p:p[id],label:id,detail:true})),
  {id:'bed',p:[-.61,b+.07,.9],label:'bed',always:true},
  {id:'sink',p:[-3.22,1.2,-2.67],label:'sink',always:true},
  {id:'pillows',p:[2.28,.65,.28],label:'pillows',always:true},
  {id:'sheet',p:[.8,1.2,.37],label:'sheet',always:true},
  {id:'curtain',p:[1.8,2.0,1.6],label:'curtain',always:true},
  {id:'stance',p:[-.99,.12,.25],label:'stance',always:true},
  {id:'bell',p:s.bell?[-.32,b+.2,-.79]:[-1.24,1.03,-1.7],label:'bell',always:true},
  ...this.getState().scenario!=='slide'?['arm','leg','back'].map(k=>({id:'support_'+k,p:p['support_'+k],label:'support_'+k,support:true})):[]
 ];}
 drawHands(s){const ctx=this.ctx,w=this.w,h=this.h;if(!s.held&&s.grip!=='sheet')return;ctx.save();ctx.translate(w/2,h+30);const sc=Math.min(w/800,1);ctx.scale(sc,sc);
  if(s.held){ctx.fillStyle='#e8e4d3';ctx.beginPath();ctx.roundRect(-170,-150,340,165,45);ctx.fill();ctx.strokeStyle='#bcb9a7';ctx.lineWidth=2;ctx.stroke();}
  for(let d of [-1,1]){ctx.save();ctx.scale(d,1);ctx.rotate(-.2);ctx.fillStyle='#567e88';ctx.beginPath();ctx.roundRect(86,-50,80,180,30);ctx.fill();ctx.fillStyle='#c5987c';ctx.beginPath();ctx.roundRect(85,-107,72,96,28);ctx.fill();for(let i=0;i<4;i++){ctx.beginPath();ctx.roundRect(88+i*17,-123-i*3,14,52,7);ctx.fill();}ctx.restore();}ctx.restore();}
 drawStance(canvas,s){if(!canvas)return;const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height;c.clearRect(0,0,w,h);c.fillStyle='#ecf2f0';c.fillRect(0,0,w,h);const bad=s.twist>10||s.feet<45||s.knees<20;c.save();c.translate(w*.46,h*.87);c.lineCap='round';c.lineJoin='round';const spread=20+s.feet*.35,bend=s.knees*.28,twist=s.twist*.45;
  c.strokeStyle='#4b7779';c.lineWidth=16;for(let side of [-1,1]){c.beginPath();c.moveTo(side*11,-78);c.lineTo(side*spread,-40+bend*.4);c.lineTo(side*spread-7,0);c.stroke();}c.strokeStyle='#203e47';c.lineWidth=12;for(let side of [-1,1]){c.beginPath();c.moveTo(side*spread-9,0);c.lineTo(side*spread+10,0);c.stroke();}
  c.strokeStyle='#679395';c.lineWidth=35;c.beginPath();c.moveTo(0,-82);c.lineTo(twist,-137);c.stroke();c.fillStyle='#c8997b';c.beginPath();c.ellipse(twist,-170,18,23,0,0,Math.PI*2);c.fill();c.strokeStyle='#c8997b';c.lineWidth=12;for(let side of [-1,1]){c.beginPath();c.moveTo(twist+side*18,-132);c.lineTo(twist+side*35,-105);c.lineTo(twist+side*29,-88);c.stroke();}
  if(bad){c.fillStyle='#e16e5e77';c.beginPath();c.arc(twist*.25,-98,25,0,Math.PI*2);c.fill();c.strokeStyle='#cb5445';c.lineWidth=2;c.stroke();}c.restore();}
 tick(t){requestAnimationFrame(x=>this.tick(x));if(document.hidden)return;const dt=Math.min((t-this.last)/1000,.05)||.016;this.last=t;
  if(this.keys.w||this.keys.ArrowUp)this.walk(0,dt*1.4);if(this.keys.s||this.keys.ArrowDown)this.walk(0,-dt*1.4);if(this.keys.a)this.walk(-dt*1.4,0);if(this.keys.d)this.walk(dt*1.4,0);if(this.keys.ArrowLeft)this.camera.yaw+=dt;if(this.keys.ArrowRight)this.camera.yaw-=dt;
  if(this.target){let done=true;for(let k of ['x','y','z','pitch']){const d=this.target[k]-this.camera[k];this.camera[k]+=d*Math.min(1,dt*7);if(Math.abs(d)>.005)done=false;}let d=this.target.yaw-this.camera.yaw;d=Math.atan2(Math.sin(d),Math.cos(d));this.camera.yaw+=d*Math.min(1,dt*7);if(Math.abs(d)>.005)done=false;if(done)this.target=null;}
  if(t-this.frame<32)return;this.frame=t;const rect=this.canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);if(this.canvas.width!==Math.round(rect.width*dpr)||this.canvas.height!==Math.round(rect.height*dpr)){this.canvas.width=Math.round(rect.width*dpr);this.canvas.height=Math.round(rect.height*dpr);}this.w=rect.width;this.h=rect.height;this.focal=Math.min(this.w*1.1,this.h*1.18);this.ctx.setTransform(dpr,0,0,dpr,0,0);
  this.ctx.fillStyle='#d9e2dd';this.ctx.fillRect(0,0,this.w,this.h);const state={...this.getState(),...this.preview},f=[...this.static];this.buildBed(f,state);this.buildPatient(f,state);this.buildNurse(f,state);
  if(state.privacy){for(let z=-1.9;z<2;z+=.22)box(f,[1.78+Math.sin(z*25)*.025,1.8,z],.05,2.05,.22,'#a6c3bd');}
  this.drawFaces(f);this.drawHands(state);this.makeHotspots(state);this.onChange?.(this.hotspots);}
}
