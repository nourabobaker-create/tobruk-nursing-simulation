import assert from 'node:assert/strict';
import {fresh,action,scrub,missed} from '../engine.mjs';
let s=fresh();assert.equal(action(s,'faucet'),'waterOn');assert.equal(action(s,'water'),'wet');assert.equal(action(s,'soap'),'soap');assert(s.soap);
s=fresh();assert.equal(action(s,'soap'),'wetFirst');assert.equal(action(s,'faucet'),'waterOn');assert.equal(action(s,'water'),'wet');assert.equal(action(s,'soap'),'soap');assert(s.soap);assert.equal(s.issues[0],'soapBeforeWet');
assert.equal(action(s,'towel'),'rinseFirst');assert.equal(action(s,'water'),'rinsed');assert.equal(action(s,'towel'),'dry');assert.equal(action(s,'faucet'),'safe');assert(s.safe&&!s.water);
s=fresh();assert.equal(scrub(s,'palms',1),false);action(s,'faucet');action(s,'water');action(s,'soap');assert.equal(scrub(s,'palms',.5),false);assert.equal(scrub(s,'palms',.5),true);assert(!missed(s).some(x=>x.id==='palms'));
// Corrective actions never depend on dismissing feedback or a completion flag.
for(let seed=0;seed<100;seed++){s=fresh();const actions=['soap','towel','water','faucet','watch'];for(let j=0;j<25;j++)action(s,actions[(seed*11+j*7)%5]);if(!s.water)action(s,'faucet');if(!s.water)action(s,'faucet');action(s,'water');action(s,'water');assert.equal(action(s,'soap'),'soap');}
console.log('PASS: normal sequence, early-soap correction, early-towel recovery, safe closure, friction gate, 100 recovery histories');
