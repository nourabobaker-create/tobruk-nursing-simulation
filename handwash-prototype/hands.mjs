import * as T from './vendor/three.module.min.js';
const PI=Math.PI, v=(x=0,y=0,z=0)=>new T.Vector3(x,y,z), clamp=T.MathUtils.clamp, mix=T.MathUtils.lerp;
const skin=new T.MeshStandardMaterial({color:0xe6ad87,roughness:.72}),skin2=new T.MeshStandardMaterial({color:0xeab591,roughness:.72}), nailMat=new T.MeshStandardMaterial({color:0xf8d7ba,roughness:.52}),creaseMat=new T.MeshStandardMaterial({color:0xbc866b,roughness:1}),white=new T.MeshStandardMaterial({color:0xfafbf3,roughness:.94}),green=new T.MeshStandardMaterial({color:0x30675f,roughness:.8}),metal=new T.MeshStandardMaterial({color:0xaabdc0,metalness:.65,roughness:.26});
const sphere=new T.SphereGeometry(1,20,14);
function ell(parent,xyz,scale,mat=skin){let m=new T.Mesh(sphere,mat);m.position.set(...xyz);m.scale.set(...scale);parent.add(m);return m}
function box(parent,xyz,scale,mat){let m=new T.Mesh(new T.BoxGeometry(...scale),mat);m.position.set(...xyz);parent.add(m);return m}
function tube(parent,points,r,mat){const path=new T.CatmullRomCurve3(points.map(a=>v(...a)));const m=new T.Mesh(new T.TubeGeometry(path,20,r,7,false),mat);parent.add(m);return m}
function bone(parent,len,r1,r2,mat){const m=new T.Mesh(new T.CylinderGeometry(r2,r1,len,14),mat);m.position.y=len/2;parent.add(m);ell(parent,[0,0,0],[r1,r1,r1],mat);ell(parent,[0,len,0],[r2,r2,r2],mat)}
class Hand{
 constructor(side){this.side=side;this.root=new T.Group();this.geo=new T.Group();this.geo.scale.x=side;this.root.add(this.geo);this.mat=side===1?skin:skin2;
 const p=new T.Shape();p.moveTo(-.39,-.94);p.bezierCurveTo(-.55,-.7,-.72,-.45,-.71,.12);p.lineTo(-.64,.66);p.quadraticCurveTo(0,.82,.62,.61);p.bezierCurveTo(.74,.13,.73,-.33,.48,-.8);p.lineTo(.36,-.94);p.closePath();
 let palm=new T.Mesh(new T.ExtrudeGeometry(p,{depth:.20,bevelEnabled:true,bevelSegments:4,steps:1,bevelSize:.105,bevelThickness:.095,curveSegments:14}),this.mat);palm.position.z=-.10;this.geo.add(palm);
 ell(this.geo,[.38,-.33,.12],[.33,.47,.18],this.mat);
 const arm=new T.Mesh(new T.CylinderGeometry(.39,.57,2.75,24),this.mat);arm.position.set(0,-2.20,-.07);arm.rotation.x=-.065;this.geo.add(arm);ell(this.geo,[0,-.89,0],[.40,.34,.22],this.mat);
 const cuff=new T.Mesh(new T.CylinderGeometry(.585,.60,.38,24),white);cuff.position.set(0,-3.64,-.16);this.geo.add(cuff);
 this.fingers=[];const xs=[-.55,-.19,.19,.54],lens=[[.40,.30,.24],[.60,.38,.27],[.64,.40,.27],[.55,.35,.25]];
 for(let i=0;i<4;i++){const joints=[],base=new T.Group();base.position.set(xs[i],.59+(i===0?-.11:0),0);this.geo.add(base);let par=base;let rr=.115+(i? .018:0);for(let j=0;j<3;j++){let joint=j===0?base:new T.Group();if(j){joint.position.y=lens[i][j-1];par.add(joint)}bone(joint,lens[i][j],rr-j*.013,rr-(j+1)*.013,this.mat);joints.push(joint);par=joint}let tip=new T.Object3D();tip.position.y=lens[i][2];par.add(tip);let nail=ell(par,[0,lens[i][2]*.68,-(rr-.028)],[rr*.73,lens[i][2]*.40,.025],nailMat);for(let j=0;j<2;j++)tube(joints[j],[[ -.075,.075,-rr*.91],[0,.055,-rr-.003],[.075,.075,-rr*.91]],.009,creaseMat);this.fingers.push({base,joints,tip,lens:lens[i],x:xs[i]})}
 this.thumb=new T.Group();this.thumb.position.set(.60,-.35,.025);this.geo.add(this.thumb);this.thumb.rotation.z=-.85;bone(this.thumb,.47,.20,.15,this.mat);this.thumb2=new T.Group();this.thumb2.position.y=.47;this.thumb.add(this.thumb2);bone(this.thumb2,.40,.15,.115,this.mat);ell(this.thumb2,[0,.28,-.125],[.10,.14,.022],nailMat);this.thumbTip=new T.Object3D();this.thumbTip.position.y=.40;this.thumb2.add(this.thumbTip);
 tube(this.geo,[[-.46,.10,.206],[-.23,.0,.212],[.06,.10,.212],[.31,.21,.215]],.008,creaseMat);tube(this.geo,[[.25,-.66,.252],[.06,-.39,.262],[.14,-.10,.274],[.38,.04,.26]],.008,creaseMat);
 this.watch=new T.Group();this.geo.add(this.watch);const strap=new T.Mesh(new T.CylinderGeometry(.423,.423,.24,28,1,true),green);strap.position.y=-1.13;this.watch.add(strap);box(this.watch,[0,-1.13,.38],[.40,.38,.10],metal);box(this.watch,[0,-1.13,.44],[.29,.27,.014],green);
 this.ring=new T.Mesh(new T.TorusGeometry(.141,.022,8,24),new T.MeshStandardMaterial({color:0xb99554,metalness:.7,roughness:.3}));this.ring.rotation.x=PI/2;this.ring.position.y=.18;this.fingers[1].joints[0].add(this.ring);
 }
 pose(p){this.root.position.set(...p.p);this.root.rotation.set(...p.r);this.fingers.forEach((f,i)=>{const curl=Array.isArray(p.c?.[i])?p.c[i]:p.c||[.07,.10,.05];f.joints.forEach((j,k)=>j.rotation.x=curl[k]||0);f.base.rotation.z=(i-1.5)*(p.spread??.07)});this.thumb.rotation.set(p.thumb?.[0]??.05,0,p.thumb?.[1]??-.85);this.thumb2.rotation.x=p.thumb?.[2]??.15;}
 localPoint(x,y,z){return this.root.localToWorld(v(x*this.side,y,z))}
 tipAverage(){this.root.updateMatrixWorld(true);let out=v();for(const f of this.fingers)out.add(f.tip.getWorldPosition(v()));return out.multiplyScalar(.25)}
}
function spec(p=[0,0,0],r=[0,0,0],c=[.06,.10,.05],other={}){return {p,r,c,...other}}
function lerpSpec(a,b,t){const curls=p=>Array.from({length:4},(_,i)=>Array.isArray(p.c?.[i])?p.c[i]:p.c||[.07,.10,.05]);const ac=curls(a),bc=curls(b);return {p:a.p.map((x,i)=>mix(x,b.p[i],t)),r:a.r.map((x,i)=>mix(x,b.r[i],t)),c:ac.map((f,i)=>f.map((x,j)=>mix(x,bc[i][j],t))),thumb:[0,1,2].map((i)=>mix((a.thumb||[.05,-.85,.15])[i],(b.thumb||[.05,-.85,.15])[i],t)),spread:mix(a.spread??.07,b.spread??.07,t)}}
export class HandScene{
 constructor(canvas){this.canvas=canvas;this.renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true});this.renderer.setPixelRatio(Math.min(devicePixelRatio,2));this.renderer.outputColorSpace=T.SRGBColorSpace;this.renderer.setClearColor(0xe2ebe4,1);this.scene=new T.Scene();this.camera=new T.PerspectiveCamera(34,1,.1,80);this.camera.position.set(0,0,13);this.camera.lookAt(0,0,0);this.scene.add(new T.HemisphereLight(0xfff8e6,0x6e9591,1.8));let key=new T.DirectionalLight(0xfff2dd,2.0);key.position.set(-4,6,8);this.scene.add(key);let rim=new T.DirectionalLight(0xffffff,.8);rim.position.set(4,1,-3);this.scene.add(rim);
 this.room=new T.Group();this.scene.add(this.room);box(this.room,[0,0,-2.8],[14,13,.25],new T.MeshStandardMaterial({color:0xdfebe5}));
 const basin=new T.Mesh(new T.TorusGeometry(3.1,.28,16,70),white);basin.scale.set(1.15,.80,1);basin.position.set(0,-.3,-1.55);this.room.add(basin);ell(this.room,[0,-.3,-1.98],[3.45,2.44,.18],new T.MeshStandardMaterial({color:0xc7d8d2,roughness:.5}));ell(this.room,[0,-1.45,-1.75],[.28,.2,.025],metal);for(let i=0;i<6;i++){let a=i*PI/3;ell(this.room,[Math.cos(a)*.13,-1.45+Math.sin(a)*.09,-1.71],[.022,.022,.01],green)}
 this.tap=new T.Group();this.tap.position.set(0,2.25,-1.6);this.room.add(this.tap);tube(this.tap,[[0,0,0],[0,.58,0],[0,.83,.4],[0,.8,.85],[0,.55,1.05]],.14,metal);this.lever=box(this.tap,[.44,.1,.04],[.70,.12,.20],metal);this.lever.rotation.z=.15;
 this.soapBottle=new T.Group();this.soapBottle.position.set(-2.45,1.95,-.95);this.room.add(this.soapBottle);box(this.soapBottle,[0,0,0],[.65,.9,.40],green);box(this.soapBottle,[0,.56,0],[.15,.27,.16],metal);this.pump=box(this.soapBottle,[.17,.70,.0],[.5,.10,.14],metal);box(this.soapBottle,[0,.02,.215],[.35,.30,.015],white);
 this.towels=new T.Group();this.towels.position.set(2.45,1.95,-.98);this.room.add(this.towels);box(this.towels,[0,0,0],[.8,.86,.40],white);box(this.towels,[0,-.48,.20],[.50,.52,.025],white);
 this.water=new T.Group();this.room.add(this.water);const waterMat=new T.MeshStandardMaterial({color:0x98d5de,transparent:true,opacity:.45,roughness:.08});for(let i=0;i<5;i++){let m=new T.Mesh(new T.CylinderGeometry(.026,.04,3.4,8),waterMat);m.position.set((i-2)*.047,.65,-.54+Math.abs(i-2)*.013);this.water.add(m)}
 this.rig=new T.Group();this.scene.add(this.rig);this.left=new Hand(1);this.right=new Hand(-1);this.rig.add(this.left.root,this.right.root);
 this.paper=new T.Group();box(this.paper,[0,0,0],[1.12,1.32,.045],white);for(let i=0;i<5;i++)tube(this.paper,[[-.5,-.5+i*.23,.03],[0,-.53+i*.23,.06],[.5,-.48+i*.23,.03]],.008,new T.MeshStandardMaterial({color:0xe2e6d9}));this.rig.add(this.paper);
 this.foam=new T.Group();this.rig.add(this.foam);const fm=new T.MeshStandardMaterial({color:0xfffff4,transparent:true,opacity:.54,roughness:.2});for(let i=0;i<16;i++){let b=ell(this.foam,[Math.sin(i*2.4)*.35,Math.cos(i*2.4)*.42,0],[.045+(i%3)*.008,.04,.022],fm);b.visible=false}
 this.gel=ell(this.scene,[-2.15,2,-.7],[.07,.16,.06],white);this.gel.visible=false;this.last='';this.prevSpecs=null;this.currentSpecs=null;this.width=0;this.height=0;this.hit={};new ResizeObserver(()=>this.resize()).observe(canvas);this.resize();
 }
 resize(){const r=this.canvas.getBoundingClientRect();if(!r.width||!r.height)return;this.width=r.width;this.height=r.height;this.renderer.setSize(r.width,r.height,false);this.camera.aspect=r.width/r.height;this.camera.position.z=this.camera.aspect<1?14.6:12;this.camera.fov=this.camera.aspect<.65?38:34;this.camera.updateProjectionMatrix()}
 project(obj){let p=obj.getWorldPosition(v()).project(this.camera);return {x:(p.x+1)*this.width/2,y:(1-p.y)*this.height/2}}
 render(step,time,state={}){
 const mode=step.pose,side=['tips','knuckles'].includes(mode)?1-(step.side||0):(step.side||0);let phase=time*2.1, w=state.practice&&state.motion?clamp(state.motion.x,-1,1):Math.sin(phase), c=state.practice&&state.motion?clamp(state.motion.y,-1,1):Math.cos(phase), contact=clamp(time/1.7,0,1);contact=contact*contact*(3-2*contact);let l=spec([-1.05,-.2,0],[.15,-.25,-.20]),r=spec([1.05,-.2,.12],[.15,.25,.20]);let rx=.10,ry=-.28,rz=0, zoom=1;
 const target=side?this.right:this.left,active=side?this.left:this.right;let a,b,anchor=null;
 if(mode==='palms'){a=spec([-.12,.03,-.205],[0,0,-.58]);b=spec([.03+w*.22,.02+c*.12,.205],[0,PI,-.48]);rx=.18;ry=-.62;}
 if(mode==='back'){a=spec([-.18,.15,-.22],[0,PI,.12]);b=spec([.30+w*.17,-.08+w*.28,.22],[0,PI,.12],[.12,.14,.08]);ry=-.48;rx=.20;}
 if(mode==='fingers'){a=spec([-.09,.08,-.18],[0,0,-.12],[.37,.14,.08],{spread:.14});b=spec([.09,.13+w*.19,.18],[0,PI,.12],[.37,.14,.08],{spread:.14});ry=-.6;rx=.35;}
 if(mode==='tips'){
 a=spec([-.25,-.10,-.32],[0,0,.13]);let curls=[];for(const f of active.fingers){let lo=0,hi=1.4;for(let j=0;j<20;j++){let q=(lo+hi)/2;let yy=f.base.position.y+f.lens[0]*Math.cos(q)+f.lens[1]*Math.cos(q+.65)+f.lens[2]*Math.cos(q+1.05);if(yy>1.13)lo=q;else hi=q}curls.push([(lo+hi)/2,.65,.4])}
 b=spec([.1,-.75,1.45],[-PI/2,0,0],curls,{spread:0,thumb:[.7,-.40,.75]});anchor='tips';ry=-.6;rx=.15;
 }
 if(mode==='knuckles'){a=spec([0,.18,-.28],[0,0,-.15]);b=spec([0,-1.0,.05],[0,0,-.15],[.05,1.90,1.32],{spread:0,thumb:[.7,-.4,.85]});b.p[0]+=w*.23;b.p[1]+=c*.06;rx=.38;ry=-.7;}
 if(mode==='wrist'||mode==='forearm'){
 a=spec([-.25,mode==='forearm'?1.12:.48,.14],[0,0,-.08],[.04,.08,.05]);let yy=mode==='forearm'?-.65+(w*.62):-.65;
 b=spec([.54,yy,.02],[0,0,PI/2],[.45,1.20,.95],{spread:.025,thumb:[.85,-.7,.70]});anchor=mode;ry=-.48;rx=.15;zoom=mode==='forearm'?.94:1.02;
 }
 if(mode==='finger'){
 let n=Math.min(4,Math.floor(Math.max(0,time-2)/3.2));a=spec([-.30,-.20,0],[0,0,-.08],[.0,.04,.02],{spread:.13});let f=target.fingers[n];let xx=n===4?.99:((f?.x||0)*target.side), yy=n===4?.10:1.12+w*.08;
 b=spec([xx+.67,yy,.08],[0,0,PI/2],[[1.4,1.5,1.2],[1.4,1.5,1.2],[1.4,1.5,1.2],[.62,1.36,1.20]],{spread:0,thumb:[.85,-.35,.9]});anchor='finger';ry=-.45;rx=.18;zoom=.97;
 }
 if(mode==='nails'){a=spec([-.2,-.55,0],[0,PI,.04],[.1,.1,.1],{spread:.07});b=spec([.3,1.33,.2],[PI*.78,0,-.32],[.65,.95,.9],{spread:.01});anchor='nails';ry=-.42;rx=.15;zoom=1.02;}
 if(a&&b){if(side){r=a;l=b}else{l=a;r=b}}
 if(mode==='watch'){l=spec([-.55,.18,0],[.08,PI,-.2]);r=spec([.36,-.78+Math.min(time/5,1)*.32,.45],[0,PI,1.2],[.8,1.1,.9]);ry=-.22}
 if(mode==='faucet'||mode==='close'){r=spec([.15,1.48,0],[0,PI,.4],[.9,1.3,.9]);l=spec([-1.22,-1,0],[.15,0,-.3]);ry=0;rx=0;zoom=.9;}
 if(mode==='wet'||mode==='rinse'){l=spec([-.45,-.1+Math.sin(phase*.55)*.47,-.28],[.16,Math.sin(phase*.3)*1.45,-.2]);r=spec([.49,-.3+Math.cos(phase*.55)*.47,-.14],[.16,-Math.sin(phase*.3)*1.45,.2]);ry=0;rx=0;zoom=.95;}
 if(mode==='soap'){l=spec([-1.9,.80,-.1],[0,0,-.15]);r=spec([-2.3,1.25+Math.sin(phase)*.05,.05],[0,PI,PI*.45],[.15,.2,.1]);ry=0;rx=0;zoom=.90;}
 if(mode==='dry'){a=spec([-.3,.12,0],[0,Math.sin(phase*.2)*1.15,-.1]);b=spec([.2,-.5+w*.55,.50],[0,PI,PI*.4],[.60,1,.8]);if(time>7){l=b;r=a}else{l=a;r=b}ry=-.3;rx=.1;}
 // Each movement opens with separated hands, reaches contact, repeats, then transitions.
 if(a&&b){const moving=side?l:r;moving.p[2]+= (1-contact)*1.25;moving.p[0]+=(1-contact)*.9}
 if(this.last!==step.id){this.prevSpecs=this.currentSpecs;this.last=step.id;this.prevRig=[this.rig.rotation.x,this.rig.rotation.y,this.rig.rotation.z]}
 let tl=l,tr=r;if(this.prevSpecs&&time<.9){let t=clamp(time/.9,0,1);t=t*t*(3-2*t);tl=lerpSpec(this.prevSpecs[0],l,t);tr=lerpSpec(this.prevSpecs[1],r,t)}this.currentSpecs=[l,r];
 this.left.pose(tl);this.right.pose(tr);if(this.prevRig&&time<1){const t=time*time*(3-2*time);this.rig.rotation.set(mix(this.prevRig[0],rx,t),mix(this.prevRig[1],ry,t),mix(this.prevRig[2],rz,t))}else this.rig.rotation.set(rx,ry,rz);this.rig.scale.setScalar(zoom);this.rig.position.y=-.05;
 this.rig.updateMatrixWorld(true);
 if(anchor==='tips'&&time>=.9){const dest=target.localPoint(.17*c,.14*w,.28+(1-contact)*1.2);const from=active.tipAverage();const diff=this.rig.worldToLocal(dest.clone()).sub(this.rig.worldToLocal(from.clone()));active.root.position.add(diff);}
 if(anchor==='wrist'||anchor==='forearm'){
 // Palm cups the side of a wrist; four articulated fingers bend around its section.
 const roll=w*.23;active.root.rotation.y=roll;active.root.position.z=.10+c*.07;
 }
 if(anchor==='finger'){active.root.rotation.y=w*.17;}
 if(anchor==='nails'&&time>=.9){const n=Math.min(3,Math.floor(Math.max(0,time-2)/2.25));target.root.updateMatrixWorld(true);active.root.updateMatrixWorld(true);const tip=target.fingers[n].tip.getWorldPosition(v());const touch=active.fingers[3].tip.getWorldPosition(v());const dest=this.rig.worldToLocal(tip.clone());dest.z+=.07+(1-contact)*.8;dest.x+=w*.025;active.root.position.add(dest.sub(this.rig.worldToLocal(touch.clone())));}
 this.gel.visible=false;
 if((mode==='faucet'||mode==='close'||mode==='soap')&&time>1){
 this.scene.updateMatrixWorld(true);
 let point=(mode==='soap'?this.pump:this.lever).getWorldPosition(v());point.z+=.12;point.y+=mode==='soap'?.06:0;
 const fingertip=this.right.fingers[3].tip.getWorldPosition(v());
 const offset=this.rig.worldToLocal(point.clone()).sub(this.rig.worldToLocal(fingertip));this.right.root.position.addScaledVector(offset,clamp((time-1)/1.2,0,1));
 if(mode==='soap'){
 const destination=this.pump.getWorldPosition(v());destination.y-=.82;destination.z+=.08;
 this.left.root.position.copy(this.rig.worldToLocal(destination));this.left.root.rotation.set(0,0,-.1);
 this.pump.position.y=.70-Math.max(0,Math.sin(time*1.4))*.08;
 this.gel.visible=time>2&&time<5;this.gel.position.copy(this.soapBottle.getWorldPosition(v())).add(v(.31,.4-((time*1.2)%1)*.65,.11));
 }
 }
 this.left.watch.visible=(mode==='rest'||(mode==='watch'&&time<4))&&!state.removed;this.right.watch.visible=false;this.left.ring.visible=this.left.watch.visible;this.right.ring.visible=false;
 if(mode==='watch'){this.left.watch.position.x=clamp((time-2)/2,0,1)*1.1;this.left.watch.position.y=-clamp((time-3),0,1)*.4}else this.left.watch.position.set(0,0,0);
 this.water.visible=state.practice?state.water:!['rest','watch'].includes(mode)&&!(mode==='close'&&time>5);
 this.lever.rotation.z=this.water.visible?-.25:.15;
 this.paper.visible=mode==='dry'||mode==='close';this.paper.position.set(mode==='close'?.39:.12,mode==='close'?2.0:-.48+w*.55,mode==='close'?.32:.26);this.paper.rotation.set(.03,0,mode==='close'?.2:.38);if(mode==='close'&&time>7)this.paper.position.y-=Math.min(time-7,2)*2;
 this.foam.visible=!!a&&!['nails','finger'].includes(mode)&&contact>.98&&time>2&&(state.practice?state.soap&&(state.coverage?.[step.id]||0)>0:true);
 this.foam.position.set(0,0,.37);if(mode==='wrist')this.foam.position.y=-.63;if(mode==='forearm')this.foam.position.y=-.65+w*.62;if(mode==='knuckles')this.foam.position.y=-.05;if(mode==='back')this.foam.position.y=.18;
 if(a){let pos=target.localPoint(0,0,mode==='back'?-.225:.225);if(mode==='wrist')pos=target.localPoint(0,-1.08,.40);if(mode==='forearm')pos=target.localPoint(0,-1.78+w*.62,.48);this.foam.position.copy(this.rig.worldToLocal(pos));this.foam.rotation.copy(target.root.rotation)}
 this.foam.children.forEach((m,i)=>{m.visible=i<Math.min(16,Math.max(0,time-2)*1.4)});
 if(mode==='close'&&time<7){this.scene.updateMatrixWorld(true);const p=this.lever.getWorldPosition(v());p.z+=.16;this.paper.position.copy(this.rig.worldToLocal(p));this.paper.scale.set(.55,.55,1)}else this.paper.scale.set(1,1,1);this.scene.updateMatrixWorld(true);this.hit={soap:this.project(this.soapBottle),faucet:this.project(this.tap),towel:this.project(this.towels),water:{x:this.width/2,y:this.height*.48},watch:this.project(this.left.watch)};this.renderer.render(this.scene,this.camera);
 }
}
