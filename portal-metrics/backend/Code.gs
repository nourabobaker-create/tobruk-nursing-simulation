/**
 * Nursing Portal Metrics · schema 1
 * Anonymous, voluntary observational events only. No form answers or person IDs.
 * This file is safe to publish; Spreadsheet IDs and credentials live in ScriptProperties.
 */
var PM = Object.freeze({
  SCHEMA: 1,
  ZONE: 'Africa/Tripoli',
  RETENTION_DAYS: 90,
  MAX_ROWS: 50000,
  MAX_BATCH: 25,
  MAX_BODY: 24000,
  MAX_DAILY_EVENTS: 2000,
  MAX_SESSION_DAILY_EVENTS: 250,
  SECTIONS: ['faculty','students','library','simulations','atlas','courses','guides','community','services','research','strategy'],
  EVENTS: ['page_view','section_view','resource_open','service_open','activity_start','activity_complete','feedback_useful','feedback_not_useful'],
  ENGAGED: ['resource_open','service_open','activity_start','activity_complete','feedback_useful','feedback_not_useful'],
  HEADERS: ['event_id','session_id','client_at','received_at','day','section','event','item','language']
});

/** Run once from the Apps Script editor as the owner. Re-running preserves data. */
function setupPortalMetrics() {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var props = PropertiesService.getScriptProperties();
    var id = props.getProperty('PM_SPREADSHEET_ID');
    var ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.create('مؤشرات بوابة كلية التمريض · Portal Metrics');
    var events = ss.getSheetByName('events') || ss.insertSheet('events');
    if (events.getLastRow() === 0) {
      events.getRange(1,1,1,PM.HEADERS.length).setValues([PM.HEADERS]);
      events.setFrozenRows(1);
      events.getRange('A:I').setNumberFormat('@');
    }
    assertHeader_(events);
    var since = props.getProperty('PM_STARTED_AT') || new Date().toISOString();
    props.setProperties({PM_SPREADSHEET_ID: ss.getId(), PM_STARTED_AT: since});
    var meta = ss.getSheetByName('meta') || ss.insertSheet('meta');
    meta.getRange(1,1,6,2).setValues([
      ['key','value'], ['schema',String(PM.SCHEMA)], ['collection_started_at',since],
      ['timezone',PM.ZONE], ['retention_days',String(PM.RETENTION_DAYS)],
      ['notice','Anonymous opt-in observations; external form responses are not connected.']
    ]);
    var triggers = ScriptApp.getProjectTriggers();
    if (!triggers.some(function(t) { return t.getHandlerFunction() === 'prunePortalMetrics'; })) {
      ScriptApp.newTrigger('prunePortalMetrics').timeBased().everyDays(1).atHour(3).create();
    }
    // Do not log the private spreadsheet ID or editor URL.
    Logger.log('Portal metrics prepared. Deploy as Web app, execute as owner, access Anyone. Keep the spreadsheet private.');
    return {ready:true, schema:PM.SCHEMA, collectionStartedAt:since};
  } finally { lock.releaseLock(); }
}

function doPost(e) {
  try {
    var text = e && e.postData && e.postData.contents;
    if (typeof text !== 'string' || text.length > PM.MAX_BODY) return json_({ok:false,error:'invalid_body'});
    var body;
    try { body = JSON.parse(text); } catch (_) { return json_({ok:false,error:'invalid_json'}); }
    if (!body || body.schema !== PM.SCHEMA || !Array.isArray(body.events) || body.events.length < 1 || body.events.length > PM.MAX_BATCH || !keysAllowed_(body,['schema','events'])) return json_({ok:false,error:'invalid_batch'});
    var now = new Date();
    var candidates = body.events.filter(function(row) { return validEvent_(row,now.getTime()); });
    var rejected = body.events.length - candidates.length;
    if (!candidates.length) return json_({ok:false,error:'no_valid_events',accepted:0,rejected:rejected});
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return json_({ok:false,error:'busy_retry_same_ids'});
    try {
      var sheet = eventsSheet_();
      var existing = records_(sheet);
      var known = Object.create(null), today = day_(now), dailyCount = 0, perSession = Object.create(null);
      existing.forEach(function(r) {
        known[String(r[0])] = true;
        if (String(r[4]) === today) {
          dailyCount++;
          var session = String(r[1]);
          perSession[session] = (perSession[session] || 0) + 1;
        }
      });
      var accepted = [], duplicate = 0, limited = 0;
      candidates.forEach(function(r) {
        if (known[r.id]) { duplicate++; return; }
        if (dailyCount >= PM.MAX_DAILY_EVENTS || (perSession[r.session] || 0) >= PM.MAX_SESSION_DAILY_EVENTS) { limited++; return; }
        known[r.id] = true;
        perSession[r.session] = (perSession[r.session] || 0) + 1;
        dailyCount++;
        accepted.push([r.id,r.session,new Date(r.at).toISOString(),now.toISOString(),today,r.section,r.event,r.item || '',r.language]);
      });
      if (accepted.length) {
        // Bound retention even if the daily trigger has not run.
        pruneRows_(sheet, existing, now, accepted.length);
        var needed = sheet.getLastRow()+accepted.length;
        if (needed > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(),needed-sheet.getMaxRows());
        var range = sheet.getRange(sheet.getLastRow()+1,1,accepted.length,PM.HEADERS.length);
        range.setNumberFormat('@');
        range.setValues(accepted);
      }
      return json_({ok:true,accepted:accepted.length,duplicates:duplicate,rejected:rejected,limited:limited});
    } finally { lock.releaseLock(); }
  } catch (err) {
    // Do not expose private file IDs or stack traces through a public endpoint.
    return json_({ok:false,error:'collector_unavailable'});
  }
}

function doGet(e) {
  var p = (e && e.parameter) || {}, callback = p.callback || '';
  if (callback && !/^[A-Za-z_$][A-Za-z0-9_$]{0,63}$/.test(callback)) return json_({ok:false,error:'invalid_callback'});
  try {
    if (p.action && p.action !== 'summary') return json_({ok:false,error:'unknown_action'},callback);
    var now = new Date(), window = period_(p,now);
    if (!window) return json_({ok:false,error:'invalid_period'},callback);
    var started = PropertiesService.getScriptProperties().getProperty('PM_STARTED_AT');
    var sheet = eventsSheet_(), records = records_(sheet);
    var buckets = Object.create(null), sessions = Object.create(null), engaged = Object.create(null), sectionSessions = {}, engagedSectionSessions = {}, feedback = 0;
    PM.SECTIONS.forEach(function(s) { sectionSessions[s] = Object.create(null); engagedSectionSessions[s] = Object.create(null); });
    var cutoff = day_(new Date(now.getTime()-(PM.RETENTION_DAYS-1)*86400000));
    var earliest = null;
    records.forEach(function(r) {
      var day = String(r[4]), section = String(r[5]), event = String(r[6]), session = String(r[1]);
      if (day < cutoff) return;
      if (!earliest || day < earliest) earliest = day;
      if (day < window.from || day > window.to || PM.SECTIONS.indexOf(section)<0 || PM.EVENTS.indexOf(event)<0) return;
      var key = day+'|'+section+'|'+event;
      buckets[key] = (buckets[key] || 0) + 1;
      sessions[session] = true;
      sectionSessions[section][session] = true;
      if (PM.ENGAGED.indexOf(event) >= 0) { engaged[session] = true; engagedSectionSessions[section][session] = true; }
      if (event === 'feedback_useful' || event === 'feedback_not_useful') feedback++;
    });
    var rows = Object.keys(buckets).sort().map(function(k) { var a=k.split('|'); return {day:a[0],section:a[1],event:a[2],count:buckets[k]}; });
    PM.SECTIONS.forEach(function(s) { sectionSessions[s]=Object.keys(sectionSessions[s]).length; engagedSectionSessions[s]=Object.keys(engagedSectionSessions[s]).length; });
    var startDay = started ? day_(new Date(started)) : cutoff;
    var coverageFrom = startDay > cutoff ? startDay : cutoff;
    // A row-cap trim can shorten retained coverage; retain its precise boundary.
    var trimmed = PropertiesService.getScriptProperties().getProperty('PM_TRIMMED_BEFORE');
    if (trimmed && trimmed > coverageFrom) coverageFrom = trimmed;
    return json_({
      schema:PM.SCHEMA,mode:'shared',ready:true,generatedAt:now.toISOString(),collectionStartedAt:started,
      timezone:PM.ZONE,from:window.from,to:window.to,coverageFrom:coverageFrom,
      partialCoverage:window.from < coverageFrom,retentionDays:PM.RETENTION_DAYS,
      rows:rows,sessions:Object.keys(sessions).length,engagedSessions:Object.keys(engaged).length,
      sectionSessions:sectionSessions,engagedSectionSessions:engagedSectionSessions,feedbackResponses:feedback,
      formsConnected:false,collection:'voluntary_anonymous',sessionMeaning:'browser sessions, not unique people'
    },callback);
  } catch (_) { return json_({schema:PM.SCHEMA,mode:'shared',ready:false,error:'collector_unavailable'},callback); }
}

/** Owner-only scheduled retention. There is deliberately no public delete endpoint. */
function prunePortalMetrics() {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try { var sheet=eventsSheet_(); pruneRows_(sheet,records_(sheet),new Date(),0); }
  finally { lock.releaseLock(); }
}

function eventsSheet_() {
  var id=PropertiesService.getScriptProperties().getProperty('PM_SPREADSHEET_ID');
  if (!id) throw new Error('Run setupPortalMetrics first');
  var sheet=SpreadsheetApp.openById(id).getSheetByName('events');
  if (!sheet) throw new Error('Missing events sheet');
  assertHeader_(sheet);
  return sheet;
}
function assertHeader_(sheet) {
  var headers=sheet.getRange(1,1,1,PM.HEADERS.length).getValues()[0];
  if (headers.join('|')!==PM.HEADERS.join('|')) throw new Error('Unexpected schema');
}
function records_(sheet) { var n=sheet.getLastRow()-1; return n>0 ? sheet.getRange(2,1,n,PM.HEADERS.length).getValues() : []; }
function pruneRows_(sheet,records,now,reserve) {
  var cutoff=day_(new Date(now.getTime()-(PM.RETENTION_DAYS-1)*86400000));
  // Rows are appended by server receipt time, so expired records form one prefix.
  var expired=0;
  while(expired<records.length && String(records[expired][4])<cutoff) expired++;
  var excess=Math.max(0,records.length-expired+reserve-PM.MAX_ROWS);
  var remove=Math.min(records.length,expired+excess);
  if(remove) {
    sheet.deleteRows(2,remove);
    if(excess) {
      // Exclude the partially retained boundary day from complete-coverage claims.
      var boundary=records[Math.min(remove,records.length-1)][4];
      var next=new Date(String(boundary)+'T12:00:00Z'); next.setUTCDate(next.getUTCDate()+1);
      PropertiesService.getScriptProperties().setProperty('PM_TRIMMED_BEFORE',next.toISOString().slice(0,10));
    }
  }
}
function keysAllowed_(obj,allowed) { return Object.keys(obj).every(function(k) { return allowed.indexOf(k)>=0; }); }
function validEvent_(r,now) {
  if(!r || typeof r!=='object' || Array.isArray(r) || !keysAllowed_(r,['id','session','at','section','event','item','language'])) return false;
  if(typeof r.id!=='string' || !/^[A-Za-z0-9_-]{8,80}$/.test(r.id) || typeof r.session!=='string' || !/^[A-Za-z0-9_-]{8,80}$/.test(r.session)) return false;
  if(PM.SECTIONS.indexOf(r.section)<0 || PM.EVENTS.indexOf(r.event)<0 || ['ar','en'].indexOf(r.language)<0) return false;
  if(r.item!==undefined && (typeof r.item!=='string' || !/^[A-Za-z0-9_./:#-]{0,120}$/.test(r.item) || /^[=+@-]/.test(r.item))) return false;
  if((typeof r.at!=='string' && typeof r.at!=='number') || (typeof r.at==='number' && !isFinite(r.at))) return false;
  var at=new Date(r.at).getTime();
  return isFinite(at) && at>=now-PM.RETENTION_DAYS*86400000 && at<=now+300000;
}
function day_(date) { return Utilities.formatDate(date,PM.ZONE,'yyyy-MM-dd'); }
function period_(p,now) {
  var end=day_(now), start;
  if(p.from || p.to) {
    if(!validDay_(p.from) || !validDay_(p.to) || p.from>p.to || p.to>end) return null;
    if((Date.parse(p.to+'T12:00:00Z')-Date.parse(p.from+'T12:00:00Z'))/86400000>=PM.RETENTION_DAYS) return null;
    return {from:p.from,to:p.to};
  }
  var days=p.days===undefined ? 30 : Number(p.days);
  if(!Number.isInteger(days) || days<1 || days>PM.RETENTION_DAYS) return null;
  start=day_(new Date(now.getTime()-(days-1)*86400000));
  return {from:start,to:end};
}
function validDay_(s) { return typeof s==='string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s+'T12:00:00Z')) && new Date(s+'T12:00:00Z').toISOString().slice(0,10)===s; }
function json_(body,callback) {
  var text=JSON.stringify(body).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
  if(callback) return ContentService.createTextOutput(callback+'('+text+');').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.JSON);
}
