/* Tobruk simulation locale layer. Hand-authored Arabic text; no translation service.
   Clinical state, action IDs, numbers and English speech payloads are left unchanged. */
(()=>{'use strict';
if(window.TobrukLocale)return;
const dict=JSON.parse(document.getElementById('tobruk-ar-dictionary').textContent),
 norm=s=>String(s).replace(/\s+/g,' ').trim(),ESC=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),
 templates=Object.entries(dict).filter(([k])=>/⟦\d+⟧/.test(k)).map(([k,v])=>{
 const ids=[];let src='',at=0;for(const m of k.matchAll(/⟦(\d+)⟧/g)){src+=ESC(k.slice(at,m.index))+'(.+?)';ids.push(m[1]);at=m.index+m[0].length;}src+=ESC(k.slice(at));return {r:new RegExp('^'+src+'$'),v,ids,weight:k.replace(/⟦\d+⟧/g,'').length};
 }).sort((a,b)=>b.weight-a.weight),cache=new Map(),unmatched=new Set(),KEY='tobruk-simulation-language';
let language='ar',observer,scheduled=false,button;
try{const l=new URL(location.href).searchParams.get('lang')||localStorage.getItem(KEY);if(l==='en'||l==='ar')language=l;}catch(e){}
function translate(value,level=0){
 const s=norm(value);if(!s||language!=='ar'||level>3)return String(value);
 if(dict[s]!==undefined)return dict[s];if(cache.has(s))return cache.get(s);
 if(/^[\u0600-\u06ff\d\s\W]+$/.test(s)||!/[a-zA-Z]/.test(s)||/^https?:\/\//.test(s))return String(value);
 let out;
 const numbered=s.match(/^(\[S\d+\]\s*|\d+[.)]\s+)(.+)$/);if(numbered){const tail=translate(numbered[2],level+1);if(tail!==numbered[2])out=numbered[1]+tail;}
 for(const t of templates){if(out!==undefined)break;const m=s.match(t.r);if(m){const values={};t.ids.forEach((id,i)=>values[id]=translate(m[i+1],level+1));out=t.v.replace(/⟦(\d+)⟧/g,(_,id)=>values[id]);break;}}
 // Generated records and labels consist of separate known text segments.
 if(out===undefined&&/\n/.test(String(value)))out=String(value).split('\n').map(x=>translate(x,level+1)).join('\n');
 if(out===undefined){const m=s.match(/^([^:]{2,50})(:\s*)(.*)$/);if(m&&dict[m[1]])out=dict[m[1]]+' : '+translate(m[3],level+1);}
 if(out===undefined){const parts=s.split(/( · | \| )/);if(parts.length>1&&parts.some(x=>dict[x]!==undefined))out=parts.map(x=>/^( · | \| )$/.test(x)?x:translate(x,level+1)).join('');}
 if(out===undefined){out=String(value);if(/[a-zA-Z]{3}.*\s+[a-zA-Z]{2}/.test(s)&&s.length<2000&&!/\.(docx?|html|json|txt)$/.test(s))unmatched.add(s);}
 if(cache.size<20000)cache.set(s,out);return out;
}
const textState=new WeakMap(),attrState=new WeakMap(),SKIP='script,style,noscript,textarea,code,[contenteditable],#tobrukLanguageBar,[data-no-translate]';
function textNode(n){if(!n.parentElement||n.parentElement.closest(SKIP))return;let st=textState.get(n),raw=n.data;if(st&&raw===st.shown)raw=st.original;else st={original:raw,shown:raw};const v=language==='ar'?translate(raw):raw;if(v!==n.data)n.data=v;st.shown=v;textState.set(n,st);}
function element(el){if(!(el instanceof Element)||el.closest(SKIP))return;if(el.tagName==='OPTION'&&!el.hasAttribute('value'))el.setAttribute('value',el.textContent);let state=attrState.get(el)||{};for(const a of ['title','aria-label','placeholder','alt']){if(!el.hasAttribute(a))continue;let raw=el.getAttribute(a),st=state[a];if(st&&raw===st.shown)raw=st.original;const shown=language==='ar'?translate(raw):raw;if(el.getAttribute(a)!==shown)el.setAttribute(a,shown);state[a]={original:raw,shown};}attrState.set(el,state);}
function subtree(root){if(root.nodeType===3){textNode(root);return;}if(!(root instanceof Element)||root.closest(SKIP))return;element(root);const w=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(n.nodeType===3)textNode(n);else element(n);}}
const pending=new Set();
function flush(){scheduled=false;observer?.disconnect();const roots=[...pending];pending.clear();for(const r of roots)if(r.isConnected)subtree(r);observer?.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['title','aria-label','placeholder','alt']});}
function schedule(records){for(const r of records){if(r.type==='childList')r.addedNodes.forEach(n=>pending.add(n));else pending.add(r.target);}if(!scheduled){scheduled=true;queueMicrotask(flush);}}
function setLanguage(l){if(!['en','ar'].includes(l))return;language=l;cache.clear();document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';document.documentElement.dataset.simLocale=l;
 try{localStorage.setItem(KEY,l);}catch(e){}
 if(button){button.textContent=l==='ar'?'English':'العربية';button.setAttribute('aria-label',l==='ar'?'Switch to English':'التبديل إلى العربية');}
 pending.add(document.body);pending.add(document.querySelector('title'));flush();window.dispatchEvent(new Event('resize'));
}
function boot(){
 const css=document.createElement('style');css.id='tobruk-locale-style';css.textContent=`
 #language,#arabicToggle,#arabicBtn,#arToggle,#arabic{display:none!important}
 #tobrukLanguageBar{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:10px;padding:8px 16px;background:#f1f6f3;border-bottom:1px solid #cdded4;direction:rtl;color:#173b35;font:15px Tahoma,Arial,sans-serif}
 #tobrukLanguageBar button{font:700 15px Tahoma,Arial,sans-serif;min-height:40px;padding:8px 16px;border-radius:10px;border:1px solid #b8cec0;background:white;color:#173b35;cursor:pointer}
 #tobrukLanguageBar .locale-caption{font-size:13px}
 html[data-sim-locale=ar] body{font-family:Tahoma,'Segoe UI',Arial,sans-serif;line-height:1.65}
 html[data-sim-locale=ar] .workspace,html[data-sim-locale=ar] .stage,html[data-sim-locale=ar] .scene-panel{direction:ltr}
 html[data-sim-locale=ar] .learning-panel,html[data-sim-locale=ar] .heading,html[data-sim-locale=ar] .below,html[data-sim-locale=ar] dialog,html[data-sim-locale=ar] .scene-caption,html[data-sim-locale=ar] .safety-strip,html[data-sim-locale=ar] .metrics,html[data-sim-locale=ar] footer{direction:rtl;text-align:start}
 html[data-sim-locale=ar] .ar,html[data-sim-locale=ar] .heading-ar{display:none!important}
 html[data-sim-locale=en] .ar,html[data-sim-locale=en] .heading-ar{display:none!important}
 html[data-sim-locale=ar] h1{letter-spacing:0!important;line-height:1.4!important;font-size:clamp(24px,3.2vw,40px)!important}
 html[data-sim-locale=ar] h2,html[data-sim-locale=ar] h3{letter-spacing:0!important;line-height:1.6!important}
 html[data-sim-locale=ar] button,html[data-sim-locale=ar] select,html[data-sim-locale=ar] .eyebrow,html[data-sim-locale=ar] .scene-title,html[data-sim-locale=ar] .phase-line{letter-spacing:0!important;white-space:normal;line-height:1.5}
 html[data-sim-locale=ar] .scene-top,html[data-sim-locale=ar] .view-footer{flex-wrap:wrap;gap:6px}
 html[data-sim-locale=ar] .metrics strong.text,html[data-sim-locale=ar] .metrics strong.response{font-size:14px;line-height:1.45}
 html[data-sim-locale=ar] .trial,html[data-sim-locale=ar] .orientation{letter-spacing:0!important}
 html[data-sim-locale=ar] input[type=number],html[data-sim-locale=ar] input[type=range],html[data-sim-locale=ar] .trace-box canvas,html[data-sim-locale=ar] canvas{direction:ltr}
 html[data-sim-locale=ar] table{direction:rtl} html[data-sim-locale=ar] th,html[data-sim-locale=ar] td{text-align:start}
 html[data-sim-locale=ar] .scope{max-width:100%;line-height:1.65}
 `;document.head.append(css);
 const bar=document.createElement('div');bar.id='tobrukLanguageBar';const label=document.createElement('span');label.className='locale-caption';label.textContent='لغة المحاكاة / Simulation language';button=document.createElement('button');button.id='simulationLanguage';button.type='button';button.onclick=()=>setLanguage(language==='ar'?'en':'ar');bar.append(label,button);document.body.prepend(bar);
 observer=new MutationObserver(schedule);setLanguage(language);
}
// Canvas labels only: retain model geometry/camera handedness and drawing coordinates.
if(window.CanvasRenderingContext2D){for(const name of ['fillText','strokeText','measureText']){const old=CanvasRenderingContext2D.prototype[name];CanvasRenderingContext2D.prototype[name]=function(text,...args){const t=language==='ar'?translate(text):text;const oldDir=this.direction;this.direction=/[\u0600-\u06ff]/.test(t)?'rtl':'ltr';try{return old.call(this,t,...args);}finally{this.direction=oldDir;}};}}
for(const name of ['alert','confirm']){const old=window[name].bind(window);window[name]=msg=>old(language==='ar'?translate(msg):msg);}

const NativeBlob=window.Blob;window.Blob=new Proxy(NativeBlob,{construct(Target,args){const parts=args[0],opts=args[1]||{};if(language==='ar'&&Array.isArray(parts)){if(/^text\/plain/i.test(opts.type||'')){args=[parts.map(p=>typeof p==='string'?translate(p):p),opts];}else if(/^application\/json/i.test(opts.type||'')&&parts.length===1&&typeof parts[0]==='string'){try{const obj=JSON.parse(parts[0]);if(obj&&typeof obj==='object'&&!Array.isArray(obj)){obj.displayLanguage='ar';obj.localizationNote='تبقى مفاتيح JSON الأصلية ثابتة للتوافق؛ النصوص العربية للعرض فقط، وليست سجل مريض.';obj.arabicDisplay=localizeRecord(obj);args=[ [JSON.stringify(obj,null,2)],opts];}}catch(e){}}}return Reflect.construct(Target,args);}});
function localizeRecord(v,key=''){if(typeof v==='string')return /note|reflection|patient.*name/i.test(key)?v:translate(v);if(Array.isArray(v))return v.map(x=>localizeRecord(x,key));if(v&&typeof v==='object'){const d={};for(const [k,x]of Object.entries(v)){if(k==='arabicDisplay'||k==='localizationNote')continue;d[k]=localizeRecord(x,k);}return d;}return v;}
window.TobrukLocale={setLanguage,get language(){return language;},translate,unmatched:()=>[...unmatched],refresh:()=>{pending.add(document.body);flush();},dictionarySize:Object.keys(dict).length};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
