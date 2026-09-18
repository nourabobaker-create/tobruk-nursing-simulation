/* Observable state and risk-based dependencies. All clinical adaptations are faculty-review proposals. */
export const VERSION='2.0.0';
export const CATEGORIES=['correct','sequence','incomplete','technique','safety','unnecessary','alternative'];
export const pair=(en,ar)=>({en,ar});
export const labels={correct:pair('Correct action','إجراء صحيح'),sequence:pair('Correct action, too early','إجراء صحيح، لكن مبكر'),incomplete:pair('Incomplete action','إجراء غير مكتمل'),technique:pair('Technique needs adjustment','تحتاج الطريقة إلى تعديل'),safety:pair('Safety stop','توقف للسلامة'),unnecessary:pair('Unnecessary action','إجراء غير ضروري'),alternative:pair('Acceptable alternative sequence','تسلسل بديل مقبول')};
export const required={
 talk:pair('Explain the movement and obtain agreement','اشرح الحركة واحصل على الموافقة'),
 assess:pair('Assess movement, comfort and assistance','قيّم الحركة والراحة والمساعدة'),
 hygiene:pair('Complete hand hygiene before contact','نظافة اليدين قبل اللمس'),
 privacy:pair('Close the privacy curtain','أغلق ستارة الخصوصية'),
 brakes:pair('Lock the bed brakes','ثبّت مكابح السرير'),
 rail:pair('Protect the far side of the bed','أمّن الجانب البعيد من السرير'),
 helper:pair('Arrange a trained helper','اطلب مساعداً مدرباً'),
 sheet:pair('Confirm the prepared handling aid','تحقق من وسيلة التحريك المجهزة'),
 arm:pair('Prepare and protect both arms','جهّز الذراعين واحمهما'),
 leg:pair('Prepare the legs within assessed limits','جهّز الساقين ضمن الحدود المقيّمة'),
 movement:pair('Complete the coordinated movement','أكمل الحركة المنسقة'),
 supports:pair('Place the required supports','ضع الدعامات المطلوبة'),
 comfort:pair('Recheck alignment, skin and comfort','أعد فحص المحاذاة والجلد والراحة'),
 lower:pair('Return the bed to a safe low position','أعد السرير إلى وضع منخفض آمن'),
 bell:pair('Place the call bell within reach','ضع زر النداء في المتناول'),
 post:pair('Complete post-contact hand hygiene','نظافة اليدين بعد اللمس')
};
const msg={
 hygiene:pair('Clean hands before patient contact. Hand hygiene helps prevent transfer of microorganisms. This prototype records that prerequisite; it does not assess the full handwashing technique.','نظّف يديك قبل لمس المريض للحد من انتقال الكائنات الدقيقة. يسجّل هذا النموذج المتطلب السابق، ولا يقيّم تقنية غسل اليدين الكاملة.'),
 talk:pair('Explain the movement first. Agreement and a shared plan help the patient cooperate and let you identify discomfort.','اشرح الحركة أولاً. تساعد الموافقة والخطة المشتركة المريض على التعاون وإبلاغك بأي انزعاج.'),
 assess:pair('Assess pain, movement restrictions, ability to help and the handling plan before moving a limb. This manikin case has no restrictions or lines.','قيّم الألم وقيود الحركة والقدرة على المساعدة وخطة التحريك قبل تحريك أحد الأطراف. لا توجد قيود أو أنابيب في حالة الدمية هذه.'),
 brakes:pair('The bed can move under load. Lock its brakes before any turn or slide.','قد يتحرك السرير أثناء نقل الوزن. ثبّت المكابح قبل التقليب أو الإزاحة.'),
 height:pair('The bed is too low for this learner. Adjust it to a comfortable working height before loading your back. The marked range is a simulation cue, not a universal clinical measurement.','السرير منخفض لهذا المتعلم. اضبط ارتفاعه ليكون العمل مريحاً قبل التحريك. النطاق المحدد إرشاد للمحاكاة وليس قياساً سريرياً عاماً.'),
 rail:pair('Protect the far side before repositioning. Keep the working side clear while the helper guards the patient; do not leave the patient unattended.','أمّن الجانب البعيد قبل التحريك. اترك جانب العمل متاحاً مع حماية المساعد للمريض، ولا تتركه دون مراقبة.'),
 helper:pair('Do not move this dependent manikin alone. Use the planned assistance and handling aid. Good posture alone does not remove the load of patient handling.','لا تحرّك هذه الدمية المعتمدة عليك بمفردك. استخدم المساعدة ووسيلة التحريك المخطط لهما. الوضعية الجيدة وحدها لا تلغي حمل تحريك المريض.'),
 sheet:pair('Confirm the friction-reducing aid and helper before movement. This case starts with the sheet already under the manikin; inserting it is outside this demonstration.','تحقق من وسيلة تقليل الاحتكاك والمساعد قبل الحركة. تبدأ الحالة والملاءة تحت الدمية بالفعل؛ إدخالها خارج نطاق هذا العرض.'),
 limbs:pair('Prepare both arms and the far leg before the turn. Supported limbs can move with the trunk; an unprepared arm may become trapped. Their preparation order can vary.','جهّز الذراعين والساق البعيدة قبل التقليب. تتحرك الأطراف المدعومة مع الجذع، وقد ينحشر الذراع غير المجهز. يمكن تغيير ترتيب تجهيز الأطراف.'),
 stance:pair('Move close, use a stable staggered stance, soften the knees and face the movement. The red lumbar area shows trunk twisting or excessive reach.','اقترب، واتخذ وقفة ثابتة متدرجة، واثنِ الركبتين قليلاً وواجه اتجاه الحركة. تشير المنطقة الحمراء أسفل الظهر إلى التواء الجذع أو فرط الامتداد.'),
 grip:pair('Grasp the prepared sheet at the upper- and lower-trunk zones with the helper. Direct shoulder pulling or lifting with hands under the body is not rewarded in this proposed adaptation.','أمسك الملاءة المجهزة عند منطقتي الجذع العليا والسفلى مع المساعد. لا يُعتمد الشد المباشر للكتف أو الرفع باليدين تحت الجسم في هذا التعديل المقترح.'),
 count:pair('Agree on a count of three immediately before each movement. The helper and patient need the same start signal.','اتفق على العد إلى ثلاثة قبل كل حركة مباشرة. يحتاج المساعد والمريض إلى إشارة بدء واحدة.'),
 prone:pair('Pause in side-lying. Clear the dependent arm and turn/support the head before continuing; the face must not be loaded into the mattress. This prone sequence awaits faculty validation.','توقف في الوضع الجانبي. حرّر الذراع السفلي وأدر الرأس وادعمه قبل المتابعة؛ يجب ألا يُضغط الوجه على الفراش. ينتظر هذا التسلسل اعتماد أعضاء هيئة التدريس.'),
 slide:pair('Pause after the first slide. Recheck lower-body alignment, step closer and regrip before a fresh count. Move the supported body as one unit.','توقف بعد الإزاحة الأولى. أعد فحص محاذاة الجزء السفلي، واقترب وأعد الإمساك قبل عد جديد. حرّك الجسم المدعوم كوحدة واحدة.'),
 supports:pair('The movement is complete but support is missing. Place the pillows at the visible gaps and check alignment before leaving.','اكتملت الحركة لكن الدعم ناقص. ضع الوسائد في المواضع غير المدعومة وتحقق من المحاذاة قبل المغادرة.'),
 finish:pair('Recheck comfort and alignment, leave the bed low with appropriate protection, place the call bell within reach, then clean your hands.','أعد فحص الراحة والمحاذاة، واترك السرير منخفضاً مع الحماية المناسبة وزر النداء في المتناول، ثم نظّف يديك.')
};
export const omissionReasons={
 talk:msg.talk,assess:msg.assess,hygiene:msg.hygiene,privacy:pair('Protect dignity while maintaining communication and observation.','احفظ الكرامة مع استمرار التواصل والمراقبة.'),brakes:msg.brakes,rail:msg.rail,helper:msg.helper,sheet:msg.sheet,arm:msg.limbs,leg:msg.limbs,movement:pair('A partially completed maneuver is not the intended resting position. Continue only when the team and body are prepared.','المناورة الجزئية ليست وضع الراحة المطلوب. تابع فقط بعد تجهيز الفريق والجسم.'),supports:msg.supports,comfort:pair('Check alignment, pressure, skin and comfort after the move; a successful rotation alone does not confirm a safe final position.','افحص المحاذاة والضغط والجلد والراحة بعد التحريك؛ نجاح التقليب وحده لا يؤكد سلامة الوضع النهائي.'),lower:pair('A low resting bed reduces the distance of a potential fall and supports safer access.','يقلل السرير المنخفض مسافة السقوط المحتمل ويساعد على الوصول الآمن.'),bell:pair('The patient needs a reachable way to request help.','يحتاج المريض إلى وسيلة في متناوله لطلب المساعدة.'),post:pair('Clean hands after patient/environment contact to reduce onward transfer of microorganisms.','نظّف اليدين بعد لمس المريض وبيئته للحد من نقل الكائنات الدقيقة.')};
export class Simulation {
 constructor(scenario='side',mode='learn'){this.reset(scenario,mode);}
 reset(scenario=this.s.scenario,mode=this.s.mode){this.s={scenario,mode,talk:false,assess:false,hygiene:false,privacy:false,brakes:false,rail:false,helper:false,sheet:false,height:30,farArm:0,nearArm:0,leg:0,head:0,feet:20,knees:0,twist:35,grip:'none',count:0,progress:0,pauseChecked:false,held:false,supports:{arm:false,leg:false,back:false},comfort:false,bell:false,post:false,contact:false,complete:false,assisted:[],log:[],flash:'',attempt:Date.now()};this.last=null;return this.s;}
 event(category,key,text,source='A01–A06',ok=false){const e={at:Date.now(),category,key,text,source,ok};this.s.log.push(e);this.last=e;return e;}
 result(key,text,source,alternative=false){return this.event(alternative?'alternative':'correct',key,text,source,true);}
 isReadyLimbs(){return this.s.farArm>=75&&this.s.nearArm>=70&&this.s.leg>=70;}
 isReadyStance(){return this.s.feet>=45&&this.s.feet<=85&&this.s.knees>=20&&this.s.knees<=65&&this.s.twist<=10;}
 supportKeys(){return this.s.scenario==='side'?['arm','leg','back']:this.s.scenario==='prone'?['arm','leg']:[];}
 allSupports(){return this.supportKeys().every(k=>this.s.supports[k]);}
 phase(){const s=this.s;if(s.complete)return 6;if(s.progress>=1)return this.allSupports()?5:4;if(s.progress>0)return 3;if(this.isReadyLimbs())return 2;if(s.talk&&s.assess&&s.hygiene)return 1;return 0;}
 beforeContact(){const s=this.s;if(!s.hygiene)return this.event('sequence','hygiene',msg.hygiene,'S5/S6 step 1');if(!s.talk)return this.event('sequence','talk',msg.talk,'S5/S6 step 1');if(!s.assess)return this.event('safety','assess',msg.assess,'A01');s.contact=true;s.post=false;return null;}
 invalidate(){this.s.count=0;}
 guard(){const s=this.s;for(const key of ['brakes','rail','helper','sheet'])if(!s[key]){s.flash=key;return this.event('safety',key,msg[key],key==='helper'||key==='sheet'?'R13/R17/R21':'A02');}
 if(s.height<55||s.height>85){s.flash='height';return this.event('technique','height',msg.height,'A02');}
 if(!s.privacy)return this.event('incomplete','privacy',pair('Close the privacy curtain before the maneuver. Preserve dignity while maintaining safe observation.','أغلق ستارة الخصوصية قبل المناورة. احفظ الكرامة مع استمرار المراقبة الآمنة.'),'A02');
 if(!this.isReadyLimbs()){s.flash=s.nearArm<70?'nearArm':s.farArm<75?'farArm':'leg';return this.event('sequence','limbs',msg.limbs,'S5/S6 steps 2–4,8–10');}
 if(!this.isReadyStance()){s.flash='stance';return this.event('technique','stance',msg.stance,'S4 steps 1,4; A04');}
 if(s.grip!=='sheet'){s.flash='grip';return this.event('safety','grip',msg.grip,'R17/R21');}
 if(s.held)return this.event('incomplete','held',pair('Put the pillow down before gripping the sheet with both hands.','ضع الوسادة قبل الإمساك بالملاءة بكلتا اليدين.'),'A03');
 return null;}
 do(action,value){let s=this.s;s.flash='';
 if(s.complete&&action!=='finish')return this.event('unnecessary',action,pair('This attempt is complete. Start a fresh attempt to practise again.','اكتملت هذه المحاولة. ابدأ محاولة جديدة للتدريب مجدداً.'));
 const duplicate=()=>this.event('unnecessary',action,pair('That preparation is already complete. Repeating it does not demonstrate additional skill.','اكتمل هذا التحضير بالفعل. تكراره لا يثبت مهارة إضافية.'));
 if(['farArm','nearArm','leg','head','grip','count','move','checkPause','comfort','place'].includes(action)){const blocked=this.beforeContact();if(blocked)return blocked;}
 if(['talk','assess','privacy','brakes','rail','helper','sheet','bell'].includes(action)){
  if(s[action])return duplicate();
  if(action==='sheet'&&!s.assess)return this.event('sequence','assess',msg.assess,'A01');
  s[action]=true;this.invalidate();
  const texts={talk:pair('“I will help you turn with my colleague. Tell me if you feel pain. We will move together on three.” The manikin represents a consenting adult.','«سأساعدك على التقليب مع زميلي. أخبرني إذا شعرت بألم. سنتحرك معاً عند ثلاثة.» تمثل الدمية شخصاً بالغاً موافقاً.'),assess:pair('Training findings: awake, cooperative, needs assistance; no pain, movement restrictions or lines. Use the prepared sheet and trained helper. Reassess if findings change.','معطيات التدريب: واعٍ ومتعاون ويحتاج مساعدة؛ لا ألم أو قيود حركة أو أنابيب. استخدم الملاءة المجهزة والمساعد المدرب، وأعد التقييم عند تغير المعطيات.'),privacy:pair('Privacy is protected. Keep communication and observation possible.','تم حفظ الخصوصية. حافظ على التواصل وإمكانية المراقبة.'),brakes:pair('Brakes locked. The bed is stable for preparation.','المكابح مثبتة. السرير مستقر للتحضير.'),rail:pair('Far-side protection is in place. The working side stays accessible with you and the helper present.','الحماية في الجانب البعيد جاهزة. يبقى جانب العمل متاحاً بوجودك والمساعد.'),helper:msg.helper,sheet:msg.sheet,bell:pair('The call bell is within reach. Confirm the patient can use it.','زر النداء في المتناول. تأكد من قدرة المريض على استخدامه.')};
  return this.result(action,texts[action],action==='talk'?'S5/S6 step 1':'A01–A05',!s.talk&&['brakes','privacy','helper'].includes(action));
 }
 if(action==='hygiene'){
  if(s.contact&&s.progress>=1){s.post=true;return this.result('post',pair('Post-contact hand hygiene recorded. Full technique is assessed in the planned handwashing module.','تم تسجيل نظافة اليدين بعد اللمس. ستُقيّم التقنية الكاملة في وحدة غسل اليدين المخططة.'),'A05');}
  if(s.hygiene&&!s.contact)return duplicate();s.hygiene=true;s.contact=false;return this.result('hygiene',msg.hygiene,'S5/S6 step 1');
 }
 if(['farArm','nearArm','leg','head'].includes(action)){
  const v=Math.max(0,Math.min(100,Number(value)));s[action]=v;s.comfort=false;this.invalidate();
  if(action==='nearArm'&&v<25){s.flash='nearArm';return this.event('safety','nearArm',pair('The dependent arm is in the path of the trunk. Clear it before loading the body. The source wording “under his side” needs faculty clarification.','الذراع السفلي في مسار الجذع. أبعده قبل نقل وزن الجسم. تحتاج عبارة المصدر «تحت جانبه» إلى توضيح من أعضاء هيئة التدريس.'),'R19');}
  const minimum=action==='head'?65:action==='farArm'?75:70;
  if(v<minimum)return this.event('incomplete',action,pair('The limb has moved, but preparation is incomplete. Continue into the supported target position.','تحرك الطرف، لكن التجهيز غير مكتمل. تابع إلى الوضع المدعوم المستهدف.'),'S5/S6 limb preparation');
  const txt=action==='head'?pair('Head turned with face clear. Recheck face clearance throughout the prone transition.','الرأس ملتف والوجه خالٍ من الضغط. أعد فحص خلو الوجه أثناء الانتقال إلى الانبطاح.'):pair('This limb is prepared and supported. Prepare the other limbs before moving the trunk.','تم تجهيز هذا الطرف ودعمه. جهّز بقية الأطراف قبل تحريك الجذع.');
  return this.result(action,txt,'S5/S6 steps 2–4,8–10,13',action!=='farArm'&&s.farArm<75);
 }
 if(['height','feet','knees','twist'].includes(action)){
  s[action]=Math.max(0,Math.min(100,Number(value)));this.invalidate();
  if(action==='height')return this.result(action,s.progress>=1&&s.height<=40?pair('The bed is low for the end of care.','السرير منخفض عند إنهاء الرعاية.'):pair('Bed height changed. Check your posture at the bedside before moving.','تم تغيير ارتفاع السرير. تحقق من وضعيتك بجانبه قبل التحريك.'),'A02/A05');
  if(!this.isReadyStance()){s.flash='stance';return this.event('technique','stance',msg.stance,'S4 steps 1,4');}
  return this.result('stance',pair('Your feet and trunk face the movement with a stable base. Maintain this stance during the coordinated action.','تواجه القدمان والجذع اتجاه الحركة مع قاعدة ثابتة. حافظ على الوقفة أثناء الحركة المنسقة.'),'S4 steps 1,4');
 }
 if(action==='grip'){
  s.grip=value;this.invalidate();
  if(value!=='sheet'){s.flash='grip';return this.event('safety','grip',msg.grip,'R17/R21');}
  if(!s.sheet){s.grip='none';return this.event('sequence','sheet',msg.sheet,'A03');}
  return this.result('grip',pair('Both hands are on the prepared sheet at upper- and lower-trunk zones. Coordinate with the helper before loading.','اليدان على الملاءة المجهزة عند منطقتي الجذع العليا والسفلى. نسّق مع المساعد قبل التحميل.'),'R17/R21');
 }
 if(action==='count'){
  const b=this.guard();if(b)return b;
  if(s.progress===.5&&!s.pauseChecked)return this.event('sequence','pause',s.scenario==='prone'?msg.prone:msg.slide,s.scenario==='prone'?'R20':'R21');
  if(s.count>=3)return duplicate();s.count++;
  return this.result('count',pair(`“${s.count}” — ${s.count===3?'move together now; use the movement handle.':'the helper is following your count.'}`,`«${s.count}» — ${s.count===3?'تحركوا معاً الآن؛ استخدم مقبض الحركة.':'المساعد يتابع العد.'}`),'S5/S6 steps 6,12,15,17');
 }
 if(action==='move'){
  if(s.progress>=1)return duplicate();const b=this.guard();if(b)return b;
  if(s.count!==3)return this.event('sequence','count',msg.count,'S5/S6 steps 6,12,15,17');
  const max=s.scenario==='side'?1:!s.pauseChecked?.5:1;
  const v=Math.max(s.progress,Math.min(max,Number(value)));
  if(s.scenario==='prone'&&s.progress>=.5&&(s.head<65||s.nearArm<90)){s.flash='head';return this.event('safety','prone',msg.prone,'R19/R20');}
  s.progress=v;s.contact=true;s.post=false;
  if(v===.5&&s.scenario!=='side'&&!s.pauseChecked){s.count=0;s.grip='none';return this.result('pause',s.scenario==='prone'?msg.prone:msg.slide,s.scenario==='prone'?'R20':'R21');}
  if(v>=1){s.count=0;s.grip='none';return this.result('movement',pair('The coordinated movement is complete. Inspect the new posture, place supports and reassess comfort.','اكتملت الحركة المنسقة. افحص الوضع الجديد، وضع الدعامات وأعد تقييم الراحة.'),'S5/S6 movement steps');}
  return this.event('incomplete','movement',pair('A controlled part of the movement is complete. Continue the handle without jerking; release whenever you need to pause.','اكتمل جزء مضبوط من الحركة. تابع المقبض دون نفض؛ اتركه عندما تحتاج إلى التوقف.'),'S5/S6 movement steps');
 }
 if(action==='checkPause'){
  if(s.progress!==.5)return this.event('sequence','pause',pair('Use the intermediate check between the two movement stages.','استخدم الفحص الوسطي بين مرحلتي الحركة.'),'R20/R21');
  if(s.scenario==='prone'&&(s.head<65||s.nearArm<90)){s.flash='nearArm';return this.event('safety','prone',msg.prone,'R19/R20');}
  s.pauseChecked=true;s.count=0;return this.result('pauseChecked',s.scenario==='prone'?pair('The arm and face are clear. Regrip, coordinate a fresh count and continue the second half.','الذراع والوجه خاليان من الضغط. أعد الإمساك ونسّق عداً جديداً ثم تابع النصف الثاني.'):pair('Legs and trunk are aligned. Regrip at the sheet and coordinate the second small slide.','الساقان والجذع على استقامة. أعد الإمساك بالملاءة ونسّق الإزاحة الصغيرة الثانية.'),'R20/R21');
 }
 if(action==='pickup'){if(s.held)return duplicate();s.held=true;return this.result('pickup',pair('Pillow in your hands. Touch a support target on the manikin to place it, or return it to the trolley.','الوسادة بين يديك. المس موضع دعم على الدمية لوضعها، أو أعدها إلى العربة.'),'S5/S6 step 7');}
 if(action==='putdown'){s.held=false;return this.result('putdown',pair('Pillow returned to the trolley.','أُعيدت الوسادة إلى العربة.'),'S5/S6 step 7');}
 if(action==='place'){
  if(!s.held)return this.event('incomplete','pillow',pair('Collect a pillow from the trolley first.','خذ وسادة من العربة أولاً.'),'S5/S6 step 7');
  if(s.progress<1)return this.event('sequence','pillow',pair('Keep the pillow available, then position it after the movement. A support placed now would obstruct this turn.','احتفظ بالوسادة جاهزة ثم ضعها بعد الحركة. وضعها الآن سيعيق هذا التقليب.'),'S5/S6 step 7');
  if(!this.supportKeys().includes(value))return this.event('unnecessary','pillow',pair('This support is not required for the selected task. Check the visible unsupported areas.','هذه الدعامة غير مطلوبة للمهمة المحددة. افحص المواضع الظاهرة غير المدعومة.'),'A05');
  if(s.supports[value])return duplicate();s.supports[value]=true;s.held=false;s.comfort=false;return this.result('support_'+value,pair('Support placed. Check that it supports the limb without forcing alignment.','وُضعت الدعامة. تحقق من أنها تدعم الطرف دون فرض محاذاة قسرية.'),'S5/S6 step 7; R18');
 }
 if(action==='comfort'){
  if(s.progress<1)return this.event('sequence','comfort',pair('Complete the movement before the final position review. Continue to communicate during preparation.','أكمل الحركة قبل الفحص النهائي للوضعية. استمر بالتواصل أثناء التحضير.'),'A05');
  if(!this.allSupports())return this.event('incomplete','supports',msg.supports,'S5/S6 step 7; R18');
  s.comfort=true;return this.result('comfort',pair('Alignment, supported limbs, face clearance, skin and comfort rechecked. Return the bed low and leave the call bell within reach.','أُعيد فحص المحاذاة ودعم الأطراف وخلو الوجه والجلد والراحة. أعد السرير منخفضاً واترك زر النداء في المتناول.'),'A05');
 }
 if(action==='finish'){
  const omitted=this.omissions();if(omitted.length){this.event('incomplete','finish',msg.finish,'A05');return {debrief:true,complete:false,omitted};}
  s.complete=true;this.result('finish',pair('This manikin attempt is complete. Review how your decisions affected safety and alignment.','اكتملت محاولة الدمية. راجع كيف أثرت قراراتك في السلامة والمحاذاة.'),'A05');return {debrief:true,complete:true,omitted:[]};
 }
 return this.event('unnecessary',action,pair('That action does not apply to this task.','هذا الإجراء لا ينطبق على المهمة الحالية.'));
 }
 omissions(){let s=this.s;const done={...s,arm:s.farArm>=75&&s.nearArm>=70,leg:s.leg>=70,movement:s.progress>=1,supports:this.allSupports(),lower:s.height<=40};return Object.keys(required).filter(k=>!done[k]);}
 hint(){const s=this.s;if(s.progress>=1){if(!this.allSupports())return s.held?'support_'+this.supportKeys().find(k=>!s.supports[k]):'pillows';if(!s.comfort)return 'patient';if(s.height>40)return 'bed';if(!s.bell)return 'bell';if(!s.post)return 'sink';return 'finish';}if(!s.talk)return 'patient';if(!s.assess)return 'patient';if(!s.hygiene)return 'sink';if(!s.privacy)return 'curtain';if(!s.brakes||!s.rail||s.height<55||s.height>85)return 'bed';if(!s.helper||!s.sheet)return 'sheet';if(s.farArm<75)return 'farArm';if(s.nearArm<70)return 'nearArm';if(s.leg<70)return 'leg';if(!this.isReadyStance())return 'stance';if(s.progress===.5&&!s.pauseChecked){if(s.scenario==='prone'&&s.nearArm<90)return 'nearArm';if(s.scenario==='prone'&&s.head<65)return 'head';return 'body';}return 'body';}
 export(){return {version:VERSION,scenario:this.s.scenario,mode:this.s.mode,attempt:this.s.attempt,completed:this.s.complete,omitted:this.omissions().map(k=>({key:k,label:required[k],why:omissionReasons[k]})),assisted:this.s.assisted,events:this.s.log};}
}
