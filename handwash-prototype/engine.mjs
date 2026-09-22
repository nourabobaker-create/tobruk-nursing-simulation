import {surfaces} from './content.mjs';
export function fresh(){return {water:false,wet:false,soap:false,removed:false,adjusted:false,rinsed:false,dry:false,towel:false,safe:false,contaminated:false,coverage:{},issues:[],recontamination:[],correct:[],active:'stand'}}
export function action(s,a){
const ok=x=>{if(!s.correct.includes(x))s.correct.push(x)};
if(a==='watch'){s.removed=true;ok('watch');return 'removed'}
if(a==='faucet'){
 if(s.dry||s.rinsed){if(s.towel){s.water=false;s.safe=true;s.towel=false;ok('close');return 'safe'}s.contaminated=true;s.safe=false;s.water=true;s.wet=false;s.dry=false;s.rinsed=false;s.towel=false;s.coverage={};s.recontamination.push('faucet');return 'contaminated'}
 s.water=!s.water;s.adjusted=s.water;return s.water?'waterOn':'waterOff';
}
if(a==='water'){
 if(!s.water)return 'turnWaterOn';
 if(s.soap){s.rinsed=true;s.soap=false;ok('rinse');return 'rinsed'}
 s.wet=true;ok('wet');return 'wet';
}
if(a==='soap'){
 if(!s.wet){s.issues.push('soapBeforeWet');return 'wetFirst'}
 s.soap=true;s.rinsed=false;s.dry=false;s.safe=false;s.contaminated=false;ok('soap');return 'soap';
}
if(a==='towel'){
 if(s.rinsed){s.dry=true;s.towel=true;ok('dry');return 'dry'}
 s.issues.push('dryBeforeRinse');return 'rinseFirst';
}
if(a==='restart'){Object.assign(s,fresh());return 'restart'}
return '';
}
export function scrub(s,id,amount){if(!s.soap)return false;s.coverage[id]=Math.min(1,(s.coverage[id]||0)+amount);return s.coverage[id]>=1}
export function missed(s){return surfaces.filter(x=>(s.coverage[x.id]||0)<1)}
