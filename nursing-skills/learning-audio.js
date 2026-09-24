/* English learning audio v2. No whole-page reading, queues or autoplay.
 * Only explicit, visible lesson targets receive a button. Curricular text is not rewritten.
 */
'use strict';
(() => {
  if (window.learningAudio?.version === '2.0') return;
  const synth = window.speechSynthesis;
  const supported = !!synth && typeof window.SpeechSynthesisUtterance === 'function';
  const bindings = new Map();
  let active = null, serial = 0, paused = false, currentFrame = null, previousContext = '';
  const labels = { term: 'Term', instruction: 'Instruction', meaning: 'Meaning', title: 'Step title' };
  const selectors = {
    handwashing: [
      ['#simView .instruction #heading', 'title'], ['header .title', 'term'],
      ['#simView #hint', 'instruction'], ['#reasonPanel .howTo', 'instruction'],
      ['#guideView .lessonCard > h2', 'title'],
      ['#guideView .reasonGrid > div:first-child > p', 'instruction']
    ],
    gloving: [
      ['#title', 'term'], ['#simulation #stepTitle', 'instruction'],
      ['#simulation #cue', 'instruction'], ['#guide .lesson > h3', 'instruction']
    ],
    movement: [
      ['.movementPanel .panelHeader > div > h1', 'term'], ['.lessonCard > h2', 'term'],
      ['.rationale .meaning > p, .lessonCard .meaning > p', 'meaning'],
      ['.rationale .observe > p, .lessonCard .observe > p', 'instruction']
    ],
    standard: [
      ['.movementPanel .panelHeader > div > h1', 'term'], ['.lessonCard > h2', 'term'],
      ['.lessonGrid > div:first-child > p', 'instruction'],
      ['.lessonGrid > div:first-child > ol > li', 'instruction']
    ]
  };
  const css = `
  .la-controls{display:inline-flex!important;gap:5px!important;flex-wrap:wrap!important;vertical-align:middle!important;margin:3px 0 9px!important;direction:ltr!important}
  .la-controls button{font:600 11px/1.4 system-ui,sans-serif!important;letter-spacing:0!important;min-height:34px!important;min-width:34px!important;padding:6px 10px!important;border:1px solid #b8cebe!important;border-radius:18px!important;background:#eff6ee!important;color:#285541!important;box-shadow:none!important;text-decoration:none!important;cursor:pointer!important;white-space:nowrap!important;touch-action:manipulation!important}
  .la-controls button:hover{background:#e0eddc!important}.la-controls button:focus-visible{outline:3px solid #b78042!important;outline-offset:2px!important}
  .la-controls button[aria-pressed=true]{background:#2b674f!important;color:white!important}.la-controls button:disabled{opacity:.5!important;cursor:default!important}
  .la-controls .la-icon{font-size:12px!important;margin-inline-end:5px!important}.la-speaking-target{outline:2px solid #87ac8e!important;outline-offset:4px!important;border-radius:3px!important}
  #la-toolbar{flex:none;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px 14px;padding:7px 14px;border-bottom:1px solid #d7e3cf;background:#f7faf1;color:#345a45;font:12px/1.5 system-ui,sans-serif;direction:ltr}
  #la-toolbar .la-caption{font-size:11px;flex:1;min-width:180px}#la-toolbar b{font-size:11px}#la-toolbar .la-settings{display:flex;align-items:center;gap:6px;flex-wrap:wrap}#la-toolbar button,#la-toolbar select{font:12px system-ui,sans-serif;padding:7px 10px;min-height:36px;border:1px solid #c1d1b9;border-radius:9px;background:white;color:#32553f}
  #la-toolbar label{display:flex;align-items:center;gap:6px;font-size:11px}#la-toolbar button:disabled{opacity:.45}#la-status{font-size:11px;max-width:420px;display:block;color:#61785d}#la-toolbar .la-selection{max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  @media(max-width:470px){#la-toolbar{padding:6px 9px;gap:5px}#la-toolbar .la-caption{min-width:150px}#la-toolbar .la-settings{gap:4px}#la-toolbar button,#la-toolbar select{min-height:36px;padding:6px 8px}#la-status{max-width:90vw}.la-controls button{min-height:38px!important}}
  `;
  function addStyle(doc) {
    if (doc.getElementById('la-style')) return;
    const s = doc.createElement('style'); s.id = 'la-style'; s.textContent = css; doc.head.append(s);
  }
  addStyle(document);
  // Defensive cleanup of previous toolbar exports. The new script never calls their handlers.
  document.querySelectorAll('#ttsWrap').forEach(n => n.remove());
  const toolbar = document.createElement('section'); toolbar.id = 'la-toolbar'; toolbar.setAttribute('aria-label', 'English learning audio');
  toolbar.innerHTML = `<div class="la-caption"><b>ENGLISH LISTENING</b> · One item at a time<span id="la-status" role="status" aria-live="polite">Use a speaker beside a term or instruction.</span></div><div class="la-settings"><label for="la-rate">Speed<select id="la-rate"><option value="0.75">Slow · 0.75×</option><option value="0.9">0.9×</option><option value="1" selected>Normal · 1×</option><option value="1.15">1.15×</option></select></label><button type="button" id="la-pause" disabled>Pause</button><button type="button" id="la-stop" disabled>Stop</button></div>`;
  const player = document.getElementById('player');
  if (!player) return;
  const old = document.getElementById('la-toolbar'); if (old) old.remove();
  player.querySelector('.playerBar').after(toolbar);
  const status = toolbar.querySelector('#la-status'), rate = toolbar.querySelector('#la-rate');
  const pauseButton = toolbar.querySelector('#la-pause'), stopButton = toolbar.querySelector('#la-stop');
  function report(text) { status.textContent = text; }
  function updatePlayback() {
    pauseButton.disabled = !active; stopButton.disabled = !active;
    pauseButton.textContent = paused ? 'Resume' : 'Pause';
    for (const b of bindings.values()) for (const item of b.items) item.button.setAttribute('aria-pressed', String(active?.item === item));
  }
  function stop(message = '') {
    ++serial; // Invalidate late cancellation callbacks from a previous item.
    if (active) { active.utterance.onend = null; active.utterance.onerror = null; active.target.classList.remove('la-speaking-target'); }
    active = null; paused = false;
    if (supported) { try { synth.cancel(); if (synth.paused) synth.resume(); } catch (_) {} }
    updatePlayback(); if (message) report(message);
  }
  function visible(n) {
    if (!n?.isConnected || n.closest('[hidden], [aria-hidden="true"]')) return false;
    for (let d = n.parentElement; d; d = d.parentElement) if (d.tagName === 'DETAILS' && !d.open && !d.querySelector('summary')?.contains(n)) return false;
    const s = n.ownerDocument.defaultView.getComputedStyle(n);
    return s.display !== 'none' && s.visibility !== 'hidden' && !!n.getClientRects().length;
  }
  function textOf(node, kind) {
    const copy = node.cloneNode(true);
    copy.querySelectorAll('button,input,select,small,.nano,.la-controls,script,style,.optionLetter').forEach(n => n.remove());
    let text = (copy.textContent || '').replace(/\s+/g, ' ').trim();
    if (kind === 'term' || kind === 'title') text = text.replace(/^\d+\s*[.·]\s*/, '');
    if (node.matches('.howTo')) text = text.replace(/^How to move\s*:\s*/i, '');
    return text;
  }
  function splitInstructions(text) {
    // Separate every visible sentence in a multi-instruction paragraph. No added words.
    let parts;
    try { parts = [...new Intl.Segmenter('en', {granularity:'sentence'}).segment(text)].map(s => s.segment.trim()); }
    catch (_) { parts = text.match(/[^.!?]+(?:[.!?]+(?=\s|$)|$)/g)?.map(s => s.trim()) || [text]; }
    return parts.filter(s => s && /[a-z]/i.test(s));
  }
  function allowedContext(doc, id) {
    // Never read out an answer-bearing hidden lesson while a quiz is being attempted.
    const roots = id === 'handwashing' ? ['#writtenView'] : id === 'gloving' ? ['#written','#result'] : ['.quizPanel','.quizIntro'];
    return !roots.some(sel => [...doc.querySelectorAll(sel)].some(visible));
  }
  function speak(item, binding) {
    const doc = binding.target.ownerDocument;
    if (binding.frame !== currentFrame || !visible(binding.target) || !doc.documentElement.lang.toLowerCase().startsWith('en')) return;
    if (!allowedContext(doc,binding.id)) return;
    // Re-read only this target to reject a stale button after a step change.
    if (textOf(binding.target,binding.kind) !== binding.original) { refresh(); return; }
    if (!supported) { report('English audio is not available in this browser.'); return; }
    const voices = synth.getVoices().filter(v => /^en(?:[-_]|$)/i.test(v.lang || ''));
    if (synth.getVoices().length && !voices.length) { report('No English voice is installed. Add an English voice in the device settings.'); return; }
    stop(); const token = serial;
    const utterance = new SpeechSynthesisUtterance(item.text);
    const voice = voices.find(v => v.localService && /^en[-_](US|GB)$/i.test(v.lang)) || voices.find(v => v.localService) || voices[0];
    utterance.lang = voice?.lang || 'en-US'; if (voice) utterance.voice = voice;
    utterance.rate = Number(rate.value) || 1; utterance.volume = 1; utterance.pitch = 1;
    active = {item, target:binding.target, utterance, frame:binding.frame, original:binding.original, kind:binding.kind};
    binding.target.classList.add('la-speaking-target');
    report(`${labels[binding.kind]}: ${item.text}`); status.classList.add('la-selection'); status.title = item.text;
    utterance.onend = () => { if (token !== serial) return; stop('Finished. Tap the same speaker to repeat, or choose another item.'); status.classList.remove('la-selection'); };
    utterance.onerror = e => { if (token !== serial) return; stop(e.error === 'not-allowed' ? 'Tap the speaker again to allow English audio.' : 'The device could not play this item. Try again or check its English voice settings.'); status.classList.remove('la-selection'); };
    updatePlayback();
    try { if (synth.paused) synth.resume(); synth.speak(utterance); }
    catch (_) { stop('The device could not start English audio.'); }
  }
  function bind(target,kind,frame,id) {
    const original = textOf(target,kind);
    if (!original || /[\u0600-\u06ff]/.test(original) || !/[a-z]/i.test(original)) return;
    let existing = bindings.get(target);
    if (existing && existing.original === original && existing.controls.isConnected) return;
    if (existing) { existing.controls.remove(); bindings.delete(target); }
    const texts = kind === 'instruction' ? splitInstructions(original) : [original];
    if (!texts.length) return;
    const doc = target.ownerDocument, controls = doc.createElement('span'); controls.className = 'la-controls'; controls.setAttribute('data-la',kind);
    const binding = {target,kind,frame,id,original,controls,items:[]};
    for (let i=0;i<texts.length;i++) {
      const button = doc.createElement('button'); button.type = 'button'; button.disabled = !supported;
      const label = `${labels[kind]}${texts.length>1 ? ' '+(i+1) : ''}`;
      button.innerHTML = `<span class="la-icon" aria-hidden="true">🔊</span>${label}`;
      button.title = `Hear only this ${kind === 'term' ? 'term' : 'item'}: ${texts[i]}`;
      button.setAttribute('aria-label',`${label}: ${texts[i]}`); button.setAttribute('aria-pressed','false');
      const item = {text:texts[i],button}; binding.items.push(item);
      button.addEventListener('click',e => { e.preventDefault(); e.stopPropagation(); speak(item,binding); }); controls.append(button);
    }
    target.after(controls); bindings.set(target,binding);
  }
  function refresh() {
    const frames = [...document.querySelectorAll('iframe.skillFrame')];
    const frame = frames.find(f => !f.hidden && !document.getElementById('player')?.hidden) || null;
    let doc; try { doc = frame?.contentDocument; } catch (_) { doc=null; }
    const id = (frame?.name || '').replace(/^skill-/,'');
    const context = `${id}|${doc?.documentElement.lang || ''}`;
    if (frame !== currentFrame || context !== previousContext) { stop(); currentFrame=frame; previousContext=context; report(doc?.documentElement.lang.startsWith('ar') ? 'Switch the lesson to English to hear its terms and instructions.' : 'Use a speaker beside a term or instruction.'); }
    if (active && (!visible(active.target) || textOf(active.target,active.kind) !== active.original)) stop('Step changed. Choose the new term or instruction.');
    const english = !!doc?.documentElement.lang.toLowerCase().startsWith('en');
    const allowed = english && allowedContext(doc,id);
    const desired = new Set();
    if (doc && allowed) {
      addStyle(doc);
      const rules = selectors[id] || selectors.standard;
      for (const [sel,kind] of rules) for (const node of doc.querySelectorAll(sel)) if (visible(node)) { desired.add(node); bind(node,kind,frame,id); }
    }
    for (const [target,b] of bindings) if (!target.isConnected || b.frame === frame && !desired.has(target)) { if (active?.target===target) stop(); b.controls.remove(); bindings.delete(target); }
    if (doc && !allowed && active) stop();
    if (!supported) report('English audio is not available in this browser.');
  }
  pauseButton.onclick = () => { if (!active) return; try { if(paused) synth.resume(); else synth.pause(); paused=!paused; updatePlayback(); } catch (_) { stop('Pause is unavailable. Tap the item again to repeat it.'); } };
  stopButton.onclick = () => stop('Stopped. Choose any term or instruction to listen again.');
  rate.onchange = () => { if (active) stop('Speed changed. Tap the item again to hear it at the new speed.'); };
  // Navigation and any non-audio control stop the selected item; nothing plays automatically.
  document.addEventListener('click',e=>{ if (!e.target.closest('#la-toolbar')) stop(); },true);
  document.addEventListener('change',e=>{ if(e.target.closest('.playerBar')) stop(); },true);
  const observed = new WeakSet();
  function installFrameListeners() {
    for(const f of document.querySelectorAll('iframe.skillFrame')) {
      let d; try { d=f.contentDocument; }catch(_){continue;}
      if(!d||observed.has(d)) continue;
      observed.add(d);
      // Remove decorative controls captured by an earlier offline export; rebuild their bindings.
      d.querySelectorAll('.la-controls').forEach(n=>n.remove());
      d.addEventListener('click',e=>{if(!e.target.closest('.la-controls')) stop();},true);
      d.addEventListener('change',()=>stop(),true);
    }
  }
  window.addEventListener('hashchange',()=>{stop();refresh();});
  window.addEventListener('pagehide',()=>stop());
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  const poll = setInterval(()=>{installFrameListeners();refresh();},250);
  window.learningAudio = {version:'2.0',get state(){return {current:currentFrame?.name||null,speaking:!!active,paused,text:active?.item.text||null};},get targets(){return [...bindings.values()].filter(b=>b.frame===currentFrame).flatMap(b=>b.items.map(i=>({kind:b.kind,text:i.text})));},stop:()=>stop()};
  installFrameListeners();refresh();
})();
