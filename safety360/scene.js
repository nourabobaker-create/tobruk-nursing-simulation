/* Local, dependency-free spherical panorama viewer. No tracking or remote services. */
class Room360 {
 constructor(canvas,source,onReady){
  this.canvas=canvas;this.yaw=0;this.pitch=-.02;this.fov=77;this.target=null;this.points=[];this.drag=null;this.loaded=false;
  this.gl=canvas.getContext('webgl',{alpha:false,antialias:false,preserveDrawingBuffer:true});
  if(!this.gl){this.context=canvas.getContext('2d',{alpha:false});}
  const gl=this.gl;
  if(gl){
  const vertex='attribute vec2 p; varying vec2 uv; void main(){uv=p;gl_Position=vec4(p,0.,1.);}';
  const fragment=`precision highp float; varying vec2 uv;uniform sampler2D panorama;uniform float yaw;uniform float pitch;uniform float aspect;uniform float scale;void main(){vec3 r=normalize(vec3(uv.x*aspect*scale,uv.y*scale,1.));float cp=cos(pitch),sp=sin(pitch);r=vec3(r.x,r.y*cp+r.z*sp,-r.y*sp+r.z*cp);float cy=cos(yaw),sy=sin(yaw);r=vec3(r.x*cy+r.z*sy,r.y,-r.x*sy+r.z*cy);vec2 q=vec2(atan(r.x,r.z)/6.283185307+.5, .5-asin(clamp(r.y,-1.,1.))/3.14159265);gl_FragColor=texture2D(panorama,q);}`;
  const shader=(kind,text)=>{const s=gl.createShader(kind);gl.shaderSource(s,text);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;};
  this.program=gl.createProgram();gl.attachShader(this.program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(this.program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(this.program);gl.useProgram(this.program);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const p=gl.getAttribLocation(this.program,'p');gl.enableVertexAttribArray(p);gl.vertexAttribPointer(p,2,gl.FLOAT,false,0,0);
  this.uniforms={};['yaw','pitch','aspect','scale'].forEach(k=>this.uniforms[k]=gl.getUniformLocation(this.program,k));
  const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  this.texture=texture;
  }
  const img=new Image();img.onload=()=>{if(gl){gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,img)}else if(this.context){const sourceCanvas=document.createElement('canvas');sourceCanvas.width=img.width;sourceCanvas.height=img.height;const c=sourceCanvas.getContext('2d',{willReadFrequently:true});c.drawImage(img,0,0);this.sourcePixels=c.getImageData(0,0,img.width,img.height).data;this.sourceWidth=img.width;this.sourceHeight=img.height;}else{onReady(false);return;}this.loaded=true;this.render();onReady(true)};img.onerror=()=>onReady(false);img.src=source;
  new ResizeObserver(()=>this.render()).observe(canvas);
  const surface=document.getElementById('room');
  surface.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;this.target=null;this.drag={x:e.clientX,y:e.clientY,yaw:this.yaw,pitch:this.pitch};surface.setPointerCapture(e.pointerId)});
  surface.addEventListener('pointermove',e=>{if(!this.drag)return;this.yaw=this.drag.yaw-(e.clientX-this.drag.x)*.004;this.pitch=Math.max(-1.15,Math.min(1.15,this.drag.pitch+(e.clientY-this.drag.y)*.003));this.render()});
  surface.addEventListener('pointerup',()=>{this.drag=null;this.render()});surface.addEventListener('pointercancel',()=>{this.drag=null;this.render()});
  surface.addEventListener('wheel',e=>{e.preventDefault();this.zoom(e.deltaY*.035)},{passive:false});
  surface.addEventListener('keydown',e=>{const moves={ArrowLeft:[-.15,0],ArrowRight:[.15,0],ArrowUp:[0,.12],ArrowDown:[0,-.12]};if(moves[e.key]){e.preventDefault();this.turn(...moves[e.key]);}});
 }
 zoom(d){this.fov=Math.max(42,Math.min(100,this.fov+d));this.render()}
 turn(x,y){this.target=null;this.yaw+=x;this.pitch=Math.max(-1.15,Math.min(1.15,this.pitch+y));this.render()}
 aim(yaw,pitch=-.05,fov=77){let d=((yaw-this.yaw+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;const from={yaw:this.yaw,pitch:this.pitch,fov:this.fov};const start=performance.now();const token={};this.target=token;const duration=matchMedia('(prefers-reduced-motion:reduce)').matches?1:650;const step=now=>{if(this.target!==token)return;let n=Math.min(1,(now-start)/duration);n=n*n*(3-2*n);this.yaw=from.yaw+d*n;this.pitch=from.pitch+(pitch-from.pitch)*n;this.fov=from.fov+(fov-from.fov)*n;this.render();if(n<1)requestAnimationFrame(step)};requestAnimationFrame(step)}
 addPoint(el,u,v){this.points.push({el,yaw:(u-.5)*2*Math.PI,pitch:(.5-v)*Math.PI});this.render()}
 render(){if(!this.loaded)return;const canvas=this.canvas,gl=this.gl;let w=canvas.clientWidth,h=canvas.clientHeight,ratio=gl?Math.min(2,devicePixelRatio||1):Math.min(1,(this.drag?640:1000)/w);if(canvas.width!==Math.floor(w*ratio)||canvas.height!==Math.floor(h*ratio)){canvas.width=Math.floor(w*ratio);canvas.height=Math.floor(h*ratio)}const scale=Math.tan(this.fov*Math.PI/360),aspect=w/h;
  if(gl){gl.viewport(0,0,canvas.width,canvas.height);gl.uniform1f(this.uniforms.yaw,this.yaw);gl.uniform1f(this.uniforms.pitch,this.pitch);gl.uniform1f(this.uniforms.aspect,aspect);gl.uniform1f(this.uniforms.scale,scale);gl.drawArrays(gl.TRIANGLES,0,6);}else this.renderSoftware(scale,aspect);
  this.points.forEach(point=>{let dy=point.yaw-this.yaw;let x=Math.cos(point.pitch)*Math.sin(dy),z=Math.cos(point.pitch)*Math.cos(dy),y=Math.sin(point.pitch);const yy=y*Math.cos(this.pitch)-z*Math.sin(this.pitch),zz=y*Math.sin(this.pitch)+z*Math.cos(this.pitch);const nx=x/(zz*scale*aspect),ny=yy/(zz*scale);const visible=zz>.1&&Math.abs(nx)<.95&&Math.abs(ny)<.86;point.el.style.display=visible?'flex':'none';if(visible){point.el.style.left=(nx+1)*w/2+'px';point.el.style.top=(1-ny)*h/2+'px'}});
 }
 renderSoftware(scale,aspect){
  const cw=this.canvas.width,ch=this.canvas.height,sw=this.sourceWidth,sh=this.sourceHeight,src=this.sourcePixels;
  const frame=this.context.createImageData(cw,ch),dest=frame.data,cp=Math.cos(this.pitch),sp=Math.sin(this.pitch),cy=Math.cos(this.yaw),sy=Math.sin(this.yaw);
  for(let py=0;py<ch;py++){
   const y=(1-2*(py+.5)/ch)*scale,ry=y*cp+sp,rz=-y*sp+cp;
   for(let px=0;px<cw;px++){
    const x=(2*(px+.5)/cw-1)*aspect*scale,norm=Math.sqrt(x*x+y*y+1),wx=x*cy+rz*sy,wz=-x*sy+rz*cy;
    const u=(Math.atan2(wx,wz)/(Math.PI*2)+.5)*sw,v=Math.max(0,Math.min(sh-1,(.5-Math.asin(ry/norm)/Math.PI)*sh));
    const x0=Math.floor(u)%sw,y0=Math.floor(v),x1=(x0+1)%sw,y1=Math.min(sh-1,y0+1),fx=u-Math.floor(u),fy=v-y0;
    const a=(y0*sw+x0)*4,b=(y0*sw+x1)*4,c=(y1*sw+x0)*4,d=(y1*sw+x1)*4,i=(py*cw+px)*4;
    for(let k=0;k<3;k++)dest[i+k]=(src[a+k]*(1-fx)+src[b+k]*fx)*(1-fy)+(src[c+k]*(1-fx)+src[d+k]*fx)*fy;
    dest[i+3]=255;
   }
  }
  this.context.putImageData(frame,0,0);
 }
}
