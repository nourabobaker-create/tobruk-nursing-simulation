/*
 * Section-level reading links for existing content, reviewed 2026-10-15.
 * These are supporting references, not quotations or an endorsement by their publishers.
 * A missing entry deliberately falls back to the article's general reading list in the UI.
 * Fictional scenes and navigation-only learning sections are not attributed to a publisher.
 */
(() => {
  'use strict';
  const C = window.COMMUNITY, R = window.COMMUNITY_V2;
  if (!C || !R) return;
  R.sources.urgentFirstAid = ['St John Ambulance','الإسعافات الأولية والإنعاش','https://www.sja.org.uk/first-aid-advice/'];
  const registry = { ...C.sources, ...R.sources };
  const articles = new Map(R.extra.map(a => [a.id, a]));
  Object.keys(R.details).forEach(id => articles.set(id, R.details[id]));
  const clean = keys => [...new Set(keys)].filter(key => registry[key] && /^https:\/\//.test(registry[key][2]));
  function set(id, sections, lessons) {
    const article = articles.get(id);
    if (!article) return;
    article.sectionSources = { ...article.sectionSources };
    Object.entries(sections).forEach(([section, keys]) => {
      const valid = clean(keys);
      if (valid.length) article.sectionSources[section] = valid;
    });
    if (lessons && article.learningSections) Object.entries(lessons).forEach(([index, keys]) => {
      const section = article.learningSections[Number(index)];
      const valid = clean(keys);
      if (section && valid.length) section.sources = valid;
    });
  }

  set('diabetes', {
    about:['dmOverviewNIDDK','dmType1CDC'], symptoms:['dmOverviewNIDDK'],
    actions:['dmOverviewNIDDK','dmScheduleCDC'], prevention:['dmOverviewNIDDK','dmType1CDC'],
    treatment:['dmOverviewNIDDK','dmType1CDC'], avoid:['dmOverviewNIDDK','dmType1CDC'], warning:['dmDKANHS','dmHypoNHS']
  }, {1:['dmOverviewNIDDK','dmScheduleCDC']});
  set('diabetes-daily-care', {
    about:['dmOverviewNIDDK'], symptoms:['dmOverviewNIDDK','dmInsulinNHS'],
    actions:['dmOverviewNIDDK','dmScheduleCDC','dmInsulinNHS'], prevention:['dmInsulinNHS','dmOverviewNIDDK'],
    treatment:['dmOverviewNIDDK','dmInsulinNHS'], avoid:['dmInsulinNHS'], warning:['dmHypoNIDDK','dmOverviewNIDDK']
  });
  set('diabetes-food-portions', {
    about:['dmMealCDC','dmCarbsCDC','dmCorrectionNHS'], symptoms:['dmStackingJoslin','dmMealCDC'],
    actions:['dmMealCDC','dmCarbsCDC'], prevention:['dmCarbsCDC','dmInsulinNHS'],
    treatment:['dmMealCDC','dmInsulinNHS','dmCorrectionNHS'], avoid:['dmMealCDC','dmCarbsCDC'], warning:['dmStackingJoslin']
  }, {0:['dmCorrectionNHS']});
  set('diabetes-high-correction', {
    about:['dmCorrectionNHS','dmInsulinNHS'], symptoms:['dmDKACDC','dmDKANHS'],
    actions:['dmCorrectionNHS','dmStackingJoslin','dmDKANHS'], prevention:['dmStackingJoslin','dmDKACDC'],
    treatment:['dmCorrectionNHS','dmInsulinNHS','dmStackingJoslin'],
    avoid:['dmCorrectionNHS','dmStackingJoslin','dmDKANHS'], warning:['dmDKACDC','dmDKANHS']
  }, {0:['dmCorrectionNHS'],1:['dmCorrectionNHS'],2:['dmCorrectionNHS','dmStackingJoslin'],3:['dmDKACDC','dmSGLT2Leeds']});
  set('diabetes-sick-days', {
    about:['dmSickCDC','dmDehydrationNHS','dmHHSDUK'], symptoms:['dmDehydrationNHS','dmDKANHS','dmSGLT2Leeds'],
    actions:['dmSickCDC','dmSickDorset','dmDKANHS','dmDehydrationNHS'],
    prevention:['dmSickCDC','dmSickDorset'], treatment:['dmSickDorset','dmSGLT2Leeds','dmSickCDC'],
    avoid:['dmSickCDC','dmSGLT2Leeds','dmDKANHS'], warning:['dmSickCDC','dmDKANHS']
  }, {0:['dmSickCDC','dmDehydrationNHS'],1:['dmDKANHS','dmSickDorset'],3:['dmHHSNHS','dmHHSDUK']});
  set('diabetes-hypoglycemia', {
    about:['dmHypoCDC','dmHypoNIDDK'], symptoms:['dmHypoCDC','dmHypoNHS'],
    actions:['dmHypoCDC','dmHypoNIDDK'], prevention:['dmHypoNIDDK','dmHypoNHS'],
    treatment:['dmHypoNHS','dmHypoNIDDK'], avoid:['dmHypoCDC','dmHypoNHS'], warning:['dmHypoNHS','dmHypoNIDDK']
  }, {0:['dmHypoCDC','dmHypoNIDDK']});
  set('diabetes-feet', {
    about:['dmFeetNIDDK'], symptoms:['dmFeetNIDDK'], actions:['dmFeetNIDDK'],
    prevention:['dmFeetNIDDK','dmScheduleCDC'], treatment:['dmFeetNIDDK'], avoid:['dmFeetNIDDK'], warning:['dmFeetNIDDK']
  });
  set('diabetes-activity-followup', {
    about:['dmActiveCDC','dmScheduleCDC','dmA1CCDC'], actions:['dmActiveCDC','dmExerciseADA','dmScheduleCDC'],
    prevention:['dmExerciseADA'], treatment:['dmA1CCDC','dmScheduleCDC'], avoid:['dmOverviewNIDDK','dmScheduleCDC']
  }, {0:['dmScheduleCDC','dmOverviewNIDDK'],1:['dmOverviewNIDDK']});
  set('blood-pressure', {
    about:['bp','bpnhs'], symptoms:['bp','bpmonitor'], actions:['bpmonitor','bpnhs'],
    prevention:['bp','bpnhs'], treatment:['bp','bpnhs'], avoid:['bpnhs','bpmonitor'], warning:['bpmonitor']
  });
  set('kidney-disease', {
    about:['ckdmanage','ckdtests'], symptoms:['ckdtests','ckdmanage'],
    actions:['ckdtests','ckdmanage','kidneysafe'], prevention:['ckdmanage','ckdeating','kidneysafe'],
    treatment:['ckdmanage','ckdeating'], avoid:['ckdeating','kidneysafe']
  });
  set('kidney-stones', {
    about:['stonesigns','stonetreatment'], symptoms:['stonesigns'], actions:['stonetreatment'],
    prevention:['stonetreatment'], treatment:['stonetreatment'], warning:['stonesigns']
  });
  set('gout', {
    about:['goutnhs'], symptoms:['goutnhs'], actions:['goutnhs','goutcolchicine'], prevention:['goutnhs'],
    treatment:['goutnhs','goutcolchicine'], avoid:['goutnhs','goutcolchicine'], warning:['goutnhs']
  });
  set('women-health', {
    symptoms:['womendischarge','heavyperiod','breastsigns'], actions:['womenhpv','womendischarge','womenchecks'],
    treatment:['womendischarge','heavyperiod'], avoid:['womendischarge'],
    warning:['ectopicwarning','postmenopausebleed','heavyperiod']
  });
  set('menstrual-health', {
    about:['heavyperiod','periodproblems'], symptoms:['heavyperiod','periodproblems'],
    actions:['heavyperiod','periodproblems'], prevention:['heavyperiod','periodproblems'],
    treatment:['heavyperiod','periodproblems'], avoid:['periodproblems','heavyperiod'], warning:['ectopicwarning','heavyperiod']
  });
  set('menopause', {
    about:['menopausecare'], symptoms:['menopausecare','menopauselife'],
    actions:['menopausecare','menopauselife'], prevention:['menopauselife'],
    treatment:['menopausecare'], avoid:['menopausecare'], warning:['postmenopausebleed']
  });
  set('breast-awareness', {
    about:['breastaware','breastsigns'], symptoms:['breastsigns'], actions:['breastaware','breastsigns'],
    treatment:['breastsigns'], avoid:['breastaware','breastsigns']
  });
  set('postpartum-mood', {
    about:['postnatalmood'], symptoms:['postnatalmood','postnatalpsychosis'],
    actions:['postnatalmood','postnatalpsychosis'], prevention:['postnatalmood','postnatalpsychosis'],
    treatment:['postnatalmood'], avoid:['postnatalmood','postnatalpsychosis'], warning:['postnatalpsychosis','postnatalmood']
  });
  set('addiction-help', {
    about:['addictioncare'], symptoms:['addictioncare','alcoholwithdrawal','benzowithdrawal'],
    actions:['addictioncare'], treatment:['addictioncare','alcoholwithdrawal','benzowithdrawal'],
    warning:['alcoholwithdrawal','benzowithdrawal']
  });
  set('addiction-overdose', {
    about:['overdosewho'], symptoms:['overdosewho','naloxonecdc'], actions:['naloxonecdc','overdosewho'],
    prevention:['overdosewho'], treatment:['naloxonecdc','overdosewho'], avoid:['naloxonecdc'], warning:['naloxonecdc','overdosewho']
  });
  set('substance-prevention', {
    about:['substanceprevention','substanceparents'], actions:['substanceparents'],
    prevention:['substanceprevention','substanceparents'], treatment:['substanceparents'], avoid:['substanceparents']
  });
  set('mental-anxiety', {
    about:['anxietywho','anxietycare'], symptoms:['anxietywho','anxietycare'],
    actions:['anxietywho','anxietycare'], prevention:['anxietywho'], treatment:['anxietywho','anxietycare']
  });
  set('mental-depression', {
    about:['depressionwho'], symptoms:['depressionwho'], actions:['depressionwho','mentalselfcare'],
    prevention:['mentalselfcare'], treatment:['depressionwho'], avoid:['depressionwho'], warning:['depressionwho','mentalselfcare']
  });
  set('mental-crisis', {
    about:['mentalcrisishelp'], symptoms:['mentalcrisishelp','depressionwho'],
    actions:['mentalcrisishelp'], prevention:['mentalcrisishelp'], avoid:['mentalcrisishelp'], warning:['mentalcrisishelp']
  });

  // Other often-used clinical pages: map the focused reading, leave broader advice general.
  set('h-pylori', {
    about:['hpsymptoms'], symptoms:['hpsymptoms'], actions:['hpdiagnosis','hptreat'],
    treatment:['hptreat'], avoid:['hptreat'], warning:['hpsymptoms']
  });
  set('digestive-reflux', {
    about:['reflux'], symptoms:['reflux'], actions:['reflux'], prevention:['reflux'],
    treatment:['reflux'], avoid:['reflux'], warning:['reflux']
  });
  set('child-fever', {about:['fever'],symptoms:['fever'],actions:['fever'],treatment:['fever'],avoid:['fever'],warning:['fever']});
  set('adult-fever', {about:['adultfever'],symptoms:['adultfever'],actions:['adultfever'],treatment:['adultfever','pain'],warning:['adultfever']});
  set('child-dehydration', {
    about:['diarrhoea','diarrhoeanhs'], symptoms:['diarrhoeanhs'], actions:['diarrhoea','diarrhoeanhs'],
    prevention:['diarrhoea'], treatment:['diarrhoea','diarrhoeanhs'], warning:['diarrhoeanhs']
  });
  set('painkillers', {
    about:['pain'], symptoms:['pain'], actions:['pain','paracetamol'], prevention:['pain','kidneysafe'],
    treatment:['pain','paracetamol','kidneysafe'], avoid:['pain','paracetamol'], warning:['paracetamol','hpsymptoms']
  });
  set('vaccines', {about:['vaccines','vaccineq'],actions:['vaccines','vaccineq'],prevention:['vaccines','vaccineq'],treatment:['vaccines','vaccineq']});
  set('antibiotics', {about:['amr'],prevention:['amr'],treatment:['amr'],avoid:['amr']});
  set('heat', {about:['heatnhs','heat'],symptoms:['heatnhs'],actions:['heatnhs'],prevention:['heat'],treatment:['heatnhs'],warning:['heatnhs']});
  set('children-heat', {about:['heatnhs','dehydration'],symptoms:['heatnhs','dehydration'],actions:['heatnhs','dehydration'],prevention:['heatnhs'],warning:['heatnhs','dehydration']});
  set('drink-water', {about:['dehydration'],symptoms:['dehydration'],actions:['dehydration'],prevention:['dehydration'],treatment:['dehydration'],warning:['dehydration']});
  set('falls', {about:['falls','fallsnhs'],actions:['falls','fallsnhs'],prevention:['falls','fallsnhs'],treatment:['fallsnhs'],warning:['fallsnhs']});

  // Each simulated decision cites only the published source(s) relevant to that node.
  // The invented family, setting and consequence wording remain authored learning examples.
  const scenarios = window.CommunityScenarios;
  if (scenarios) {
    const assignments = {
      'sharps-at-home':{first:[0],injury:[1],store:[0],handover:[0]},
      'cleaner-fumes':{first:[0],recovery:[0],breathing:[0],prevention:[1]},
      'rodent-cupboard':{first:[0],'dust':[0],'wet-clean':[0],prevent:[1]},
      'produce-washing':{first:[0],'clean-board':[0],limits:[0,1],alert:[2]},
      'building-debris':{first:[0],dust:[0],sorting:[2],destination:[1,2]},
      'blood-donor':{first:[0],disclosure:[0],faint:[1],after:[1,2]},
      'welcome-care':{first:[0,1],privacy:[0],consent:[0,1],understand:[0]},
      'save-water':{first:[0],thirst:[2],hands:[1],follow:[0]}
    };
    scenarios.items.forEach(scenario => {
      const map = assignments[scenario.id];
      if (!map) return;
      Object.entries(map).forEach(([nodeId,indexes]) => {
        const node = scenario.nodes[nodeId];
        if (!node) return;
        node.sources = indexes.map(index => scenario.sources[index]).filter(Boolean).map(source => source.url);
      });
    });
  }
})();
