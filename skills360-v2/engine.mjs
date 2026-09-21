// Pure clinical state: no UI prerequisites. Every practice correction has an exit.
export const AREAS=['palms','backs','fingers','fingertips','knuckles','wrists','forearms','nails'];
export const TARGET_SECONDS=30; // Source H8: 10–30 s friction; 30 chosen, faculty review pending.
export const coverage=()=>Object.fromEntries(['left','right'].flatMap(h=>AREAS.map(a=>[h+'.'+a,0])));
export function fresh(mode='practice'){return {mode,water:false,warm:false,wet:false,soap:false,rinsed:false,dry:false,clean:false,watch:true,low:true,stance:true,towel:false,areas:coverage(),seconds:0,gloves:0,heldGlove:false,fit:false,used:false,removed:0,bag:false,sealed:false,disposed:false,finalWash:false,complete:false,freeze:false,events:[],pending:[],message:''};}
export function missing(s){return Object.keys(s.areas).filter(k=>s.areas[k]<1);}
function event(s,type,action,why){s.events.push({type,action,why,at:s.events.length});}
function issue(s,type,action,why){event(s,type,action,why);if(!s.pending.includes(action))s.pending.push(action);s.message=why;return s.mode==='practice';}
function good(s,action){event(s,'well',action,'');if(s.pending.length){event(s,'correction',action,'You resumed the procedure after feedback.');s.pending=[];}}
function resetWash(s){Object.assign(s,{wet:false,soap:false,rinsed:false,dry:false,clean:false,towel:false,areas:coverage(),seconds:0});}
export function transition(input,action,payload={}){let s=structuredClone(input);s.message='';
 if(s.freeze&&action!=='retryRemoval'){s.message='Movement paused at the contact point. Retry this removal movement.';return s;}
 if(s.gloves>0&&['wet','soap','rub','rinse'].includes(action)){s.message='Gloves are still on. Remove them safely at the glove station before washing bare skin.';return s;}
 switch(action){
 case 'watch':s.watch=false;good(s,action);break;
 case 'stance':s.stance=payload.safe!==false;if(!s.stance)s.uniformContaminated=true;if(!s.stance)issue(s,'contamination',action,'Your uniform contacted the basin. Step back; the contact area remains marked. Follow local clothing policy.');break;
 case 'position':s.low=payload.low;if(!s.low)issue(s,'technique',action,'Hands are above the elbows. In the instructor procedure, water flows from arms toward hands. Lower your hands.');break;
 case 'water':s.water=true;good(s,action);break;
 case 'warm':s.warm=true;s.water=true;good(s,action);break;
 case 'wet':if(!s.water){s.message='There is no running water yet. The faucet is available.';break;}s.wet=true;s.dry=false;good(s,action);break;
 case 'soap':if(!s.wet&&issue(s,'sequence',action,'The instructor wets hands and wrists before soap. Water is available; wet your hands, then use soap.'))break;s.soap=true;s.rinsed=false;s.dry=false;s.clean=false;good(s,action);break;
 case 'rub':if(!s.soap&&issue(s,'sequence',action,'Rubbing without lather does not complete the source procedure. Wet hands and apply soap; you can resume here.'))break;
 if(s.soap&&s.wet){let key=payload.area;if(key in s.areas){let dt=Math.min(Math.max(payload.seconds||0,0),1);s.areas[key]+=dt;s.seconds+=dt;s.rinsed=false;s.dry=false;s.clean=false;}}break;
 case 'rinse':if(!s.water){s.message='Turn on running water to rinse.';break;}if((missing(s).length||s.seconds<TARGET_SECONDS)&&issue(s,'technique',action,missing(s).length?'Lather is still needed on '+missing(s).join(', ')+'. Clean only the missed surfaces before rinsing.':'Coverage is complete. Continue friction to 30 seconds (prototype target within the source range).'))break;
 s.rinsed=true;s.skinContaminated=false;s.soap=false;s.wet=true;s.dry=false;s.clean=!missing(s).length&&s.seconds>=TARGET_SECONDS;good(s,action);break;
 case 'towel':s.towel=true;break;
 case 'dry':if(!s.rinsed&&issue(s,'sequence',action,'Drying now would leave soap or incomplete cleaning. Running water remains available: rinse before drying.'))break;s.dry=true;s.wet=false;s.towel=true;good(s,action);break;
 case 'faucet':s.water=false;if(s.towel&&!payload.bare){good(s,'safe faucet completion');if(s.clean&&s.dry&&s.disposed){s.complete=true;good(s,'final handwashing');}}else{issue(s,'contamination','bare faucet contact','Clean fingers contacted the less-clean faucet. Simulated contamination transferred to your fingers. Rewash, rinse and dry; use a paper towel to close the faucet.');resetWash(s);s.skinContaminated=true;}break;
 case 'takeGlove':if(s.gloves>=2)break;if((!s.clean||!s.dry)&&issue(s,'sequence',action,'The source requires washed, dry hands before gloving. The sink remains available.'))break;s.heldGlove=true;good(s,action);break;
 case 'don':if(!s.heldGlove){s.message='Take a glove from the box first.';break;}s.gloves=Math.min(2,s.gloves+1);s.heldGlove=false;good(s,action);break;
 case 'fit':if(s.gloves!==2){s.message='Both gloves are needed to interlace the fingers.';break;}s.fit=true;good(s,action);break;
 case 'care':if(s.gloves!==2){s.message='This simulated used-cloth contact needs both gloves. Return to the glove box.';break;}if(!s.fit)issue(s,'sequence',action,'Finger interlacing was omitted before the care contact.');s.used=true;good(s,action);break;
 case 'removeFirst':if(s.gloves!==2){s.message='This movement starts with two gloves.';break;}s.gloves=1;s.removed=1;good(s,action);break;
 case 'outer':if(s.used&&s.removed===1){s.freeze=true;s.contactPoint=payload;s.clean=false;issue(s,'contamination','bare fingers on glove exterior','Contamination event: bare fingers touched the used glove exterior. The marker shows transfer to skin. Retry removal from its checkpoint; in real care, complete safe removal and hand hygiene.');}break;
 case 'removeSecond':if(s.removed!==1){s.message='Remove the first glove before placing bare fingers under the second cuff.';break;}s.gloves=0;s.removed=2;good(s,action);break;
 case 'bag':if(s.removed!==2){s.message='Remove both gloves before containment.';break;}s.bag=true;good(s,action);break;
 case 'seal':if(!s.bag){s.message='Place the removed gloves in the bag first.';break;}s.sealed=true;good(s,action);break;
 case 'dispose':if(!s.sealed){s.message='The supplied source places the sealed bag in the bin. The bag remains available.';break;}s.disposed=true;s.finalWash=true;resetWash(s);good(s,action);break;
 case 'retryRemoval':Object.assign(s,{gloves:2,removed:0,used:true,fit:true,freeze:false,contactPoint:null,clean:true,dry:true,bag:false,sealed:false,disposed:false,complete:false,finalWash:false});event(s,'correction','removal retry','Simulation checkpoint restored; earlier handwashing retained.');break;
 default:break;
 }return s;
}
export function checkpoint(kind,mode='practice',events=[]){let s=fresh(mode);s.events=structuredClone(events);s.watch=false;s.warm=true;
 if(kind==='removal')return transition(s,'retryRemoval');
 if(kind==='faucet'){s.areas=Object.fromEntries(Object.keys(s.areas).map(k=>[k,2]));Object.assign(s,{seconds:32,rinsed:true,dry:true,clean:true,water:true});}
 return s;
}
