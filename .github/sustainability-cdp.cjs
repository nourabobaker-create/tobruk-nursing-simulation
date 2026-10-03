'use strict';
/* Isolated real-time browser test runner. Reuses the synthetic UI scenarios; no user credentials or data. */
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{spawn}=require('node:child_process');
const root=process.cwd(),source=fs.readFileSync(path.join(root,'.github/sustainability-browser.cjs'),'utf8');
const match=source.match(/const harness=String\.raw`([\s\S]*?)`;\nconst mime=/);
if(!match)throw Error('Synthetic test scenarios not found.');
const harness=match[1].replace("throw Error('Timed out waiting for local operation');","throw Error('Timed out: '+(doc().querySelector('#toast')?.textContent||'no toast')+' | '+(doc().querySelector('#save-status')?.textContent||''));");
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'};
const server=http.createServer((req,res)=>{
 const pathname=new URL(req.url,'http://localhost').pathname;
 if(pathname==='/__qa__'){res.writeHead(200,{'content-type':'text/html; charset=utf-8'});res.end('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}pre{white-space:pre-wrap}</style></head><body><pre id="qa-result">pending</pre><script src="/__qa__.js"></script></body></html>');return;}
 if(pathname==='/__qa__.js'){res.writeHead(200,{'content-type':'text/javascript; charset=utf-8'});res.end(harness);return;}
 const target=path.resolve(root,'.'+decodeURIComponent(pathname));if(!target.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 try{const filename=fs.statSync(target).isDirectory()?path.join(target,'index.html'):target;res.writeHead(200,{'content-type':(mime[path.extname(filename)]||'text/plain')+'; charset=utf-8'});fs.createReadStream(filename).pipe(res);}catch{res.writeHead(404);res.end('not found');}
});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function main(){
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'sus-cdp-'));
 let proc,ws,sequence=0;
 const pending=new Map();
 try{
  proc=spawn('google-chrome',['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--window-size=390,900','--user-data-dir='+dir,'about:blank'],{stdio:['ignore','ignore','pipe']});
  let browserError='';proc.on('error',e=>browserError=e.message);proc.stderr.on('data',()=>{});
  const portfile=path.join(dir,'DevToolsActivePort');
  for(let i=0;i<100&&!fs.existsSync(portfile);i++){if(browserError)throw Error(browserError);await sleep(100);}
  if(!fs.existsSync(portfile))throw Error('Chrome debugging port unavailable.');
  const port=fs.readFileSync(portfile,'utf8').split('\n')[0];
  const pages=await (await fetch('http://127.0.0.1:'+port+'/json/list')).json();
  const page=pages.find(x=>x.type==='page');if(!page)throw Error('No test browser page.');
  ws=new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
  ws.addEventListener('message',event=>{const msg=JSON.parse(String(event.data));if(!msg.id)return;const p=pending.get(msg.id);if(!p)return;pending.delete(msg.id);clearTimeout(p.timer);msg.error?p.reject(Error(msg.error.message)):p.resolve(msg.result);});
  function send(method,params={}){return new Promise((resolve,reject)=>{const id=++sequence,timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout: '+method));},10000);pending.set(id,{resolve,reject,timer});ws.send(JSON.stringify({id,method,params}));});}
  async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.text);return r.result.value;}
  await send('Page.enable');await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url:'http://127.0.0.1:'+server.address().port+'/__qa__'});
  let state='';for(let i=0;i<600;i++){state=await evaluate('document.body?.dataset.qa||""');if(state)break;await sleep(100);}
  const text=await evaluate('document.getElementById("qa-result")?.textContent||"No report"');
  console.log(text);
  fs.mkdirSync('.qa-results',{recursive:true});fs.writeFileSync('.qa-results/sustainability-browser.json',text);
  if(state!=='passed')throw Error('Browser regression test failed.');
 }finally{
  if(ws)ws.close();if(proc){proc.kill('SIGTERM');await sleep(150);}server.close();for(const p of pending.values())clearTimeout(p.timer);
  try{fs.rmSync(dir,{recursive:true,force:true,maxRetries:3});}catch{}
 }
}
main().catch(e=>{console.error(e.message);process.exitCode=1;server.close();});
