'use strict';
// Read-only source audit. No learner data or clinical rules are modified.
const fs=require('fs'),path=require('path');
const acorn=require('/tmp/tobruk-ar-tools/node_modules/acorn'),walk=require('/tmp/tobruk-ar-tools/node_modules/acorn-walk');
const roots=['handwash-learning-03','nursing-skills/gloving.html','range-of-motion-learning-01','body-mechanics-learning-01','turning-moving-learning-01','patient-positioning-learning-01','wound-dressing-learning-01'];
const out='simulation-language-review/baseline';fs.mkdirSync(out,{recursive:true});
const files=[];function add(p){if(!fs.existsSync(p))return;if(fs.statSync(p).isDirectory()){for(const n of fs.readdirSync(p))add(path.join(p,n));}else if(/\.(js|html)$/.test(p))files.push(p);}roots.forEach(add);
const report=[],allPairs=[];
const str=n=>n&&n.type==='Literal'&&typeof n.value==='string'?n.value:null;
for(const p of files){const text=fs.readFileSync(p,'utf8'),scripts=p.endsWith('.html')?[...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]):[text];let pairs=[],arLiterals=[],englishLiterals=[],parseErrors=[];
 for(const src of scripts){if(!src.trim())continue;let ast;try{ast=acorn.parse(src,{ecmaVersion:'latest',sourceType:'script',locations:true});}catch(e){parseErrors.push(e.message);continue;}
  walk.fullAncestor(ast,(n,_,anc)=>{
   if(n.type==='Literal'&&typeof n.value==='string'){if(/[\u0600-\u06ff]/.test(n.value))arLiterals.push(n.value);else if(/[A-Za-z]{3}.*\s+[A-Za-z]{2}/.test(n.value)&&n.value.length<1000&&!/[{}]|=>|data:/.test(n.value))englishLiterals.push(n.value);}
   if(n.type==='ArrayExpression'&&str(n.elements[0])&&/[\u0600-\u06ff]/.test(str(n.elements[1])||''))pairs.push({en:str(n.elements[0]),ar:str(n.elements[1]),line:n.loc.start.line});
   if(n.type==='ObjectExpression'){const d={};for(const q of n.properties){if(q.type==='Property')d[str(q.key)||q.key.name]=str(q.value);}if(d.en&&d.ar)pairs.push({en:d.en,ar:d.ar,line:n.loc.start.line});}
  });
 }
 const englishOnly=englishLiterals.filter(x=>!pairs.some(y=>y.en===x));
 report.push({path:p,bytes:Buffer.byteLength(text),arabicCharacters:(text.match(/[\u0600-\u06ff]/g)||[]).length,pairs:pairs.length,arabicLiterals:arLiterals.length,englishOnlyCount:englishOnly.length,parseErrors,scriptSources:[...text.matchAll(/<script[^>]+src=["']([^"']+)/gi)].map(m=>m[1]),languageControls:[...text.matchAll(/(?:id=["'](?:lang|language)["']|let lang[^;]{0,180}|lang:\s*['"](?:ar|en)['"])/g)].map(m=>m[0])});
 const id=p.replace(/[\/.]/g,'_');fs.writeFileSync(out+'/'+id+'.json',JSON.stringify({path:p,pairs,arabic:[...new Set(arLiterals)],englishOnly:[...new Set(englishOnly)]},null,2));
 for(const pair of pairs)allPairs.push({path:p,...pair});
}
fs.writeFileSync(out+'/inventory.json',JSON.stringify(report,null,2));
let blocks=[];for(const p of roots){let rows=allPairs.filter(x=>x.path===p||x.path.startsWith(p+'/'));blocks.push({path:p,pairs:rows.length});fs.writeFileSync(out+'/'+p.replace(/[\/.]/g,'_')+'-pairs.txt',rows.map(x=>x.path+':'+x.line+'\nEN: '+x.en+'\nAR: '+x.ar+'\n').join('\n'));}
console.log(JSON.stringify(blocks,null,2));
