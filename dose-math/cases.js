/* All orders and labels in these exercises are fictitious and fixed. */
"use strict";
const doseText = (arabic, english) => typeof document !== "undefined" && document.documentElement?.lang === "en" ? english : arabic;
const DoseCases = (() => {
  const units = {
    mg: doseText("mg · مليغرام", "mg · milligrams"), mcg: doseText("mcg · ميكروغرام", "mcg · micrograms"), g: doseText("g · غرام", "g · grams"),
    mL: doseText("mL · ملليلتر", "mL · millilitres"), L: doseText("L · لتر", "L · litres"), tablet: doseText("قرص", "tablet(s)"), min: doseText("min · دقيقة", "min · minutes"),
    h: doseText("h · ساعة", "h · hours"), "mg/mL": doseText("mg/mL · مليغرام/ملليلتر", "mg/mL · milligrams per millilitre"),
    "mg/dose": doseText("mg/dose · مليغرام/جرعة", "mg/dose · milligrams per dose"), "mg/day": doseText("mg/day · مليغرام/يوم", "mg/day · milligrams per day"),
    "mL/h": doseText("mL/h · ملليلتر/ساعة", "mL/h · millilitres per hour"), "gtt/min": doseText("gtt/min · قطرة/دقيقة", "gtt/min · drops per minute"),
    "mcg/min": doseText("mcg/min · ميكروغرام/دقيقة", "mcg/min · micrograms per minute"), "mcg/h": doseText("mcg/h · ميكروغرام/ساعة", "mcg/h · micrograms per hour")
  };
  const show = n => Number(n.toFixed(6)).toString();
  const step = (question, value, unit, expression, hint) => ({question, value, unit, expression, hint});
  const activity = (title, order, label, steps, check) => ({title, order, label, steps, check});
  const skill = (id, title, english, method, example, cases) => ({id, title, english, method, example, cases});

  const conversions = [
    [doseText("من الغرام إلى المليغرام", "Grams to milligrams"), "0.075 g", "mg", 75, "0.075 g × 1000 mg/g = 75 mg", doseText("المليغرام أصغر من الغرام. كم مليغرامًا يقابل غرامًا واحدًا؟", "A milligram is smaller than a gram. How many milligrams are there in one gram?")],
    [doseText("من الميكروغرام إلى المليغرام", "Micrograms to milligrams"), "650 mcg", "mg", 0.65, "650 mcg ÷ 1000 mcg/mg = 0.65 mg", doseText("المليغرام أكبر من الميكروغرام. ينبغي أن يصغر العدد عند التعبير بالمليغرام.", "A milligram is larger than a microgram. The number should decrease when you express this amount in milligrams.")],
    [doseText("من اللتر إلى الملليلتر", "Litres to millilitres"), "0.24 L", "mL", 240, "0.24 L × 1000 mL/L = 240 mL", doseText("كل لتر يحتوي على 1000 ملليلتر. المقدار هنا أقل من لتر.", "One litre contains 1000 millilitres. This amount is less than one litre.")],
    [doseText("من المليغرام إلى الميكروغرام", "Milligrams to micrograms"), "0.125 mg", "mcg", 125, "0.125 mg × 1000 mcg/mg = 125 mcg", doseText("حدّد أي الوحدتين أصغر أولًا. عند التحويل إلى وحدة أصغر يزداد العدد.", "Identify the smaller unit first. Expressing the same amount in smaller units increases the number.")]
  ].map(([title, order, unit, value, exp, hint]) => activity(title, order, "1 g = 1000 mg · 1 mg = 1000 mcg · 1 L = 1000 mL", [
    step(doseText("اكتب المقدار بالوحدة الأصغر أو الأكبر المطلوبة هنا: ", "Express the given amount in the requested unit: ") + units[unit], value, unit, exp, hint)
  ], doseText("راجع اتجاه التحويل ثم أعد الحساب عكسيًا.", "Check the direction of conversion, then reverse it to recover the original amount.")));

  const tablets = [[0.6, 200], [0.25, 125], [0.4, 100]].map(([grams, per]) => {
    const mg = grams * 1000, count = mg / per;
    return activity(doseText("أقراص بتركيز ", "Tablets containing ") + per + " mg", show(grams) + doseText(" g لجرعة واحدة", " g for one dose"), per + doseText(" mg في القرص الواحد", " mg per tablet"), [
      step(doseText("وحّد جرعة الوصفة مع وحدة ملصق الأقراص.", "Convert the prescribed dose to the unit on the tablet label."), mg, "mg", grams + " g × 1000 mg/g = " + show(mg) + " mg", doseText("حوّل الغرام إلى مليغرام قبل القسمة.", "Convert grams to milligrams before dividing.")),
      step(doseText("كم قرصًا كاملًا يطابق جرعة الوصفة؟", "How many whole tablets correspond to the prescribed dose?"), count, "tablet", show(mg) + " mg ÷ " + per + " mg/tablet = " + count + " tablet(s)", doseText("اقسم الجرعة بعد تحويلها على محتوى القرص الواحد.", "Divide the converted dose by the amount in one tablet."))
    ], doseText("التحقق العكسي: عدد الأقراص × كمية المادة في القرص يعيد الجرعة المكتوبة.", "Check by multiplying the tablet count by the amount per tablet. You should recover the prescribed dose."));
  });

  const liquids = [[150, 100, 5], [90, 60, 5], [60, 40, 2]].map(([wanted, stock, volume]) => {
    const strength = stock / volume, draw = wanted / strength;
    return activity(doseText("قراءة ملصق ", "Reading a label marked ") + stock + " mg / " + volume + " mL", wanted + doseText(" mg لجرعة واحدة", " mg for one dose"), stock + doseText(" mg في كل ", " mg in every ") + volume + " mL", [
      step(doseText("ما تركيز المستحضر في ملليلتر واحد؟", "What is the concentration per millilitre?"), strength, "mg/mL", stock + " mg ÷ " + volume + " mL = " + strength + " mg/mL", doseText("قسّم كمية المادة على حجم العينة المذكور على الملصق.", "Divide the amount of drug on the label by the volume associated with it.")),
      step(doseText("ما الحجم المقابل للجرعة المكتوبة؟", "What volume contains the prescribed dose?"), draw, "mL", wanted + " mg ÷ " + strength + " mg/mL = " + show(draw) + " mL", doseText("إذا عرفت ما يحويه ملليلتر واحد، اقسم كمية المادة المطلوبة على ذلك التركيز.", "Once you know the amount in one millilitre, divide the required dose by that concentration."))
    ], doseText("اضرب الحجم في التركيز. ينبغي أن تستعيد كمية المادة المطلوبة بالمليغرام.", "Multiply the volume by the concentration. You should recover the prescribed number of milligrams."));
  });

  const recon = [[600, 5, 6, 150], [400, 3.2, 4, 225], [900, 5, 6, 375]].map(([stock, diluent, finalMl, wanted]) => {
    const strength = stock / finalMl, draw = wanted / strength;
    return activity(doseText("تمييز الحجم النهائي لعبوة ", "Finding the final volume of a vial containing ") + stock + " mg", wanted + doseText(" mg من المحلول بعد التحضير", " mg from the reconstituted solution"), stock + doseText(" mg في العبوة. يذكر الملصق أن إضافة ", " mg per vial. Adding ") + diluent + doseText(" mL من المذيب تعطي حجمًا نهائيًا ", " mL of diluent gives a final volume of ") + finalMl + " mL.", [
      step(doseText("احسب التركيز بعد التحضير.", "Calculate the concentration after reconstitution."), strength, "mg/mL", stock + " mg ÷ " + finalMl + " mL = " + show(strength) + " mg/mL", doseText("استخدم الحجم النهائي المعلن على الملصق لحساب التركيز.", "Use the final volume stated on the label to find the concentration.")),
      step(doseText("ما حجم الجرعة من المحلول المُحضّر؟", "What volume of the reconstituted solution contains the prescribed dose?"), draw, "mL", wanted + " mg ÷ " + show(strength) + " mg/mL = " + show(draw) + " mL", doseText("قسّم الجرعة المطلوبة على التركيز النهائي.", "Divide the prescribed dose by the final concentration."))
    ], doseText("اضرب حجم الجرعة في التركيز النهائي. العبوة التدريبية تذكر حجم المذيب والحجم النهائي كلًّا على حدة.", "Multiply the dose volume by the final concentration. The training label gives both the diluent volume and the final volume."));
  });

  const perDose = [[4, 18, 24],[3, 22, 30],[5, 14, 20]].map(([perKg, kg, strength]) => {
    const mg = perKg * kg, volume = mg / strength;
    return activity(doseText("جرعة واحدة لوزن ", "Single dose for a weight of ") + kg + " kg", perKg + doseText(" mg/kg/dose · الوزن ", " mg/kg/dose · weight ") + kg + " kg", strength + doseText(" mg في كل 1 mL", " mg in each 1 mL"), [
      step(doseText("كم مليغرامًا يقابل الجرعة الواحدة لهذا الوزن؟", "How many milligrams are required per dose for this weight?"), mg, "mg/dose", perKg + " mg/kg/dose × " + kg + " kg = " + mg + " mg/dose", doseText("كلمة dose تعني أن القيمة المكتوبة تخص الجرعة الواحدة. اضربها في الكيلوغرامات.", "The word “dose” means the order refers to one dose. Multiply by the weight in kilograms.")),
      step(doseText("احسب حجم الجرعة الواحدة.", "Calculate the volume for one dose."), volume, "mL", mg + " mg ÷ " + strength + " mg/mL = " + show(volume) + " mL", doseText("بعد حساب كمية المادة للجرعة الواحدة، حوّلها إلى حجم باستخدام تركيز العبوة.", "After finding the amount of drug per dose, use the label concentration to convert it to a volume."))
    ], doseText("تحقق من أن الكيلوغرامات تختصر عند حساب الجرعة وأن النتيجة الأخيرة حجم.", "Check that kilograms cancel when calculating the dose and that the final answer is a volume."));
  });

  const perDay = [[12, 20, 3, 40], [16, 15, 4, 20], [10, 24, 2, 30]].map(([perKg, kg, times, strength]) => {
    const daily = perKg * kg, mg = daily / times, volume = mg / strength;
    return activity(doseText("جرعة يومية موزعة على ", "Splitting the daily total into ") + times + doseText(" جرعات", " doses"), perKg + doseText(" mg/kg/day · الوزن ", " mg/kg/day · weight ") + kg + doseText(" kg · يقسّم المجموع اليومي إلى ", " kg · divide the daily total into ") + times + doseText(" جرعات متساوية", " equal doses"), strength + doseText(" mg في كل 1 mL", " mg in each 1 mL"), [
      step(doseText("احسب الكمية الكلية خلال اليوم.", "Calculate the total amount of drug for one day."), daily, "mg/day", perKg + " mg/kg/day × " + kg + " kg = " + daily + " mg/day", doseText("ابدأ بالكمية اليومية لكل كيلوغرام ثم اضربها في الوزن.", "Start with the daily amount per kilogram and multiply by weight.")),
      step(doseText("احسب كمية المادة في الجرعة الواحدة.", "Calculate the amount of drug in one dose."), mg, "mg/dose", daily + " mg/day ÷ " + times + " doses/day = " + mg + " mg/dose", doseText("كلمة day تشير إلى مجموع اليوم. اقسمه على عدد الجرعات المكتوب.", "The word “day” refers to the total for the day. Divide by the prescribed number of equal doses.")),
      step(doseText("كم ملليلترًا يقابل الجرعة الواحدة؟", "How many millilitres are required for one dose?"), volume, "mL", mg + " mg ÷ " + strength + " mg/mL = " + show(volume) + " mL", doseText("استخدم كمية المادة للجرعة الواحدة مع التركيز.", "Use the amount of drug per dose and the label concentration."))
    ], doseText("الحجم × التركيز × عدد الجرعات يعيد مجموع المليغرامات اليومي.", "Volume per dose × concentration × doses per day gives the daily total in milligrams."));
  });

  const pump = [[180,90],[250,120],[135,45]].map(([volume, minutes]) => {
    const hours = minutes / 60, rate = volume / hours;
    return activity(doseText("مضخة لحجم ", "Pump infusion of ") + volume + " mL", volume + doseText(" mL خلال ", " mL over ") + minutes + " min", doseText("تعرض المضخة معدل التدفق بوحدة mL/h.", "The pump displays its flow rate in mL/h."), [
      step(doseText("عبّر عن مدة التسريب بالساعات.", "Express the infusion time in hours."), hours, "h", minutes + " min ÷ 60 min/h = " + show(hours) + " h", doseText("كل ساعة فيها 60 دقيقة.", "One hour contains 60 minutes.")),
      step(doseText("ما المعدل الذي يقابل هذا الحجم وهذه المدة؟", "What pump rate will deliver this volume in the stated time?"), rate, "mL/h", volume + " mL ÷ " + show(hours) + " h = " + show(rate) + " mL/h", doseText("اقسم الحجم على الزمن بالساعات لتبقى الوحدة mL/h.", "Divide the volume by the time in hours so that the remaining unit is mL/h."))
    ], doseText("اضرب المعدل في عدد الساعات. ينبغي أن تحصل على حجم التسريب المكتوب.", "Multiply the pump rate by the number of hours. You should recover the prescribed volume."));
  });

  const gravity = [[250,120,15],[500,360,20],[100,45,10]].map(([volume, minutes, factor]) => {
    const raw = volume * factor / minutes, rounded = Math.round(raw);
    return activity(doseText("تسريب بالجاذبية بمعامل ", "Gravity infusion with a drop factor of ") + factor + doseText(" قطرة/mL", " drops/mL"), volume + doseText(" mL خلال ", " mL over ") + minutes + " min", doseText("معامل الأنبوب المدون على عبوته ", "The tubing package gives a drop factor of ") + factor + doseText(" قطرة لكل mL.", " drops per mL."), [
      step(doseText("احسب المعدل بالقطرات لكل دقيقة وقرّب في النهاية إلى أقرب قطرة كاملة.", "Calculate drops per minute. Round the final result to the nearest whole drop."), rounded, "gtt/min", volume + " mL × " + factor + " gtt/mL ÷ " + minutes + " min ≈ " + rounded + " gtt/min", doseText("اضرب الحجم في معامل الأنبوب لتحصل على مجموع القطرات، ثم اقسم على الزمن بالدقائق وقرّب الناتج فقط.", "Multiply the volume by the tubing drop factor to find the total drops. Divide by the time in minutes and round the final result."))
    ], doseText("القطرة وحدة منفصلة. نقرّب الناتج الأخير إلى قطرة كاملة بعد حساب المعدل.", "Drops are counted in whole numbers. Round to the nearest whole drop after calculating the rate."));
  });

  const infusions = [[2,60,600],[3,50,300],[1.5,80,400]].map(([rate, kg, stock]) => {
    const perMin = rate * kg, hourly = perMin * 60, volume = hourly / stock;
    return activity(doseText("من معدل وزني إلى إعداد المضخة لوزن ", "Converting a weight-based order to a pump rate for ") + kg + " kg", rate + doseText(" mcg/kg/min · الوزن ", " mcg/kg/min · weight ") + kg + " kg", stock + doseText(" mcg في كل 1 mL من المحلول الجاهز. تعرض المضخة mL/h.", " mcg in each 1 mL of prepared solution. The pump displays mL/h."), [
      step(doseText("احسب كمية المادة في الدقيقة.", "Calculate the amount of drug per minute."), perMin, "mcg/min", rate + " mcg/kg/min × " + kg + " kg = " + perMin + " mcg/min", doseText("ابدأ بالوزن. تختصر kg وتبقى mcg/min.", "Start with the weight. Kilograms cancel and leave mcg/min.")),
      step(doseText("احسب كمية المادة في الساعة.", "Calculate the amount of drug per hour."), hourly, "mcg/h", perMin + " mcg/min × 60 min/h = " + hourly + " mcg/h", doseText("كل ساعة تضم 60 دقيقة من هذا التسريب.", "Each hour contains 60 minutes of this infusion.")),
      step(doseText("حوّل كمية المادة في الساعة إلى حجم في الساعة.", "Convert the hourly amount of drug to an hourly volume."), volume, "mL/h", hourly + " mcg/h ÷ " + stock + " mcg/mL = " + show(volume) + " mL/h", doseText("اقسم الكمية المطلوبة في الساعة على ما يحتويه كل ملليلتر.", "Divide the required hourly amount by the drug content of one millilitre."))
    ], doseText("اعكس المسار: المعدل الحجمي × التركيز ÷ 60 ÷ الوزن يعيد المعدل الوزني المكتوب.", "Reverse the calculation: pump rate × concentration ÷ 60 ÷ weight returns the original weight-based rate."));
  });

  const decisions = [
    [doseText("وحدة ناقصة", "Missing dose unit"), doseText("2 لكل جرعة. خانة الوحدة فارغة.", "2 per dose. The unit field is blank."), doseText("السائل 10 mg/mL.", "The liquid contains 10 mg/mL."), [doseText("أفترض أن الرقم بالمليغرام.", "Assume that the number is in milligrams."), doseText("أطلب توضيح وحدة الجرعة قبل التحضير.", "Clarify the dose unit before preparation."), doseText("أعتبر الرقم حجمًا بالملليلتر.", "Interpret the number as a volume in millilitres.")], 1, doseText("الرقم وحده يحتمل كتلة أو حجمًا. تحقّق من الوصفة مع المسؤول المخوّل قبل حساب الجرعة.", "The number could indicate a mass or a volume. Clarify the order with the responsible prescriber before calculating.")],
    [doseText("معدل جاذبية بلا معامل أنبوب", "Gravity infusion with no drop factor"), doseText("250 mL بالجاذبية خلال ساعتين.", "250 mL by gravity over two hours."), doseText("لا يظهر معامل التنقيط في المعطيات.", "The tubing drop factor is missing."), [doseText("أتحقق من معامل التنقيط على عبوة الأنبوب المستخدم قبل تحديد القطرات.", "Check the drop factor on the tubing package before calculating drops per minute."), doseText("أستخدم 20 قطرة لكل ملليلتر دائمًا.", "Always assume 20 drops per millilitre."), doseText("أتعامل مع الملليلتر في الساعة كأنه قطرة في الدقيقة.", "Treat millilitres per hour as equal to drops per minute.")], 0, doseText("يمكن استخراج mL/h من الحجم والزمن. حساب القطرات يتطلب أيضًا معامل الأنبوب الفعلي.", "Volume and time establish mL/h. Calculating drops per minute also requires the actual tubing drop factor.")],
    [doseText("تجاوز الحد الوارد في الحالة", "Order exceeds the limit specified in the case"), doseText("180 mg لجرعة واحدة.", "180 mg for one dose."), doseText("ورد في نص الحالة التدريبية أن الحد الأعلى لهذه الجرعة هو 120 mg.", "The limit specified for this training case is 120 mg per dose."), [doseText("أخفض الجرعة إلى 120 mg بنفسي.", "Independently reduce the order to 120 mg."), doseText("أنفّذ الرقم المكتوب ما دامت العملية الحسابية صحيحة.", "Use the prescribed value as long as the arithmetic is correct."), doseText("أوقف التحضير وأراجع الوصفة والحد مع المشرف أو الواصف.", "Pause preparation and clarify the order and the stated limit with the supervisor or prescriber.")], 2, doseText("يستلزم التعارض التحقق قبل المتابعة. تعديل الجرعة قرار سريري للجهة المخوّلة.", "The discrepancy requires clarification before proceeding. Any dose adjustment needs the appropriate clinical authorization.")],
    [doseText("توثيق قيمة أقل من الواحد", "Documenting an amount below one"), doseText("حصلت على نصف مليغرام في مسألة تعليمية.", "Your calculation gives half a milligram."), doseText("اختر الكتابة الأوضح للجرعة.", "Choose the clearest dose notation."), [".5 mg", "0.5 mg", "0.50 mg"], 1, doseText("ضع صفرًا قبل الفاصلة العشرية واكتب القيمة دون صفر عشري زائد.", "Use a leading zero before the decimal point and omit unnecessary trailing decimal zeros.")],
    [doseText("تركيزان مختلفان", "Two different concentrations"), doseText("80 mg من سائل تدريبي. تعتمد ورقة تدريب قديمة تركيز 20 mg/mL.", "The order is for 80 mg of a training liquid. An old worksheet used a concentration of 20 mg/mL."), doseText("العبوة الموجودة تحمل 40 mg/mL.", "The current container is labelled 40 mg/mL."), [doseText("أتحقق من مطابقة المستحضر والوصفة وأعيد حساب الحجم بتركيز العبوة الفعلية.", "Verify the product against the order and recalculate the volume using the current label."), doseText("أنقل الحجم من ورقة التدريب القديمة.", "Copy the volume from the old worksheet."), doseText("أختار متوسط التركيزين.", "Use the mean of the two concentrations.")], 0, doseText("الحجم يرتبط بتركيز المستحضر. بعد التأكد من مطابقته، ينتج عن 80 mg ÷ 40 mg/mL حجم 2 mL.", "Volume depends on concentration. Once the correct product is confirmed, 80 mg ÷ 40 mg/mL gives 2 mL.")],
    [doseText("بيان الوزن مفقود", "Missing weight"), "4 mg/kg/dose.", doseText("توجد جرعة إجمالية من زيارة قديمة، ولا يوجد وزن حالي موثّق في الحالة.", "An earlier visit has a total dose recorded. This case has no current documented weight."), [doseText("أقدّر الوزن من العمر.", "Estimate weight from age."), doseText("أنقل الجرعة من الزيارة القديمة.", "Copy the dose from the earlier visit."), doseText("أتحقق من وزن مقاس حديث بالكيلوغرام قبل حساب جرعة الوزن.", "Verify a current measured weight in kilograms before calculating the weight-based dose.")], 2, doseText("تتطلب المسألة وزنًا موثّقًا صالحًا للحساب. التقدير لا يعوّض هذا البيان.", "The calculation requires a reliable documented weight. An estimate cannot replace that value.")]
  ].map(([title, order, label, choices, correct, check]) => ({title, order, label, choices, correct, check}));

  const skills = [
    skill("units",doseText("توحيد الوحدات", "Metric unit conversions"),"Metric conversions",doseText("حدّد وحدة البداية ووحدة المطلوب. اكتب عامل التحويل بحيث تُختصر وحدة البداية.", "Identify the starting and target units. Write a conversion factor that cancels the starting unit."), "0.4 g × 1000 mg/g = 400 mg", conversions),
    skill("tablets",doseText("عدد الأقراص", "Tablet count"),"Tablets",doseText("وحّد وحدتي الكتلة، ثم اقسم جرعة الوصفة على كمية المادة في القرص.", "Match the units of mass, then divide the prescribed dose by the amount in each tablet."), "300 mg ÷ 100 mg/tablet = 3 tablets", tablets),
    skill("liquids",doseText("حجم الدواء السائل", "Liquid dose volume"),"Oral liquids",doseText("اقرأ كتلة المادة والحجم اللذين يخصهما الملصق. احسب الكتلة في ملليلتر واحد ثم حوّل الجرعة إلى حجم.", "Read the amount and corresponding volume on the label. Find the amount in one millilitre, then convert the dose into a volume."), "120 mg ÷ (80 mg / 4 mL) = 6 mL", liquids),
    skill("reconstitution",doseText("التركيز بعد التحضير", "Reconstituted concentration"),"Reconstitution",doseText("استخرج الحجم النهائي المعطى في ملصق العبوة، ثم احسب التركيز والحجم المطلوب.", "Identify the final volume stated on the vial label. Use it to find the concentration and the required dose volume."), "300 mg / 6 mL = 50 mg/mL", recon),
    skill("weight-dose",doseText("جرعة واحدة حسب الوزن", "Weight-based single dose"),"Weight-based dose",doseText("اقرأ mg/kg/dose. اضرب في الوزن بالكيلوغرام لتعرف كتلة المادة في الجرعة الواحدة، ثم استخدم التركيز لحساب حجمها.", "Read mg/kg/dose. Multiply by weight in kilograms to get the amount per dose, then use the concentration to find its volume."), "2 mg/kg/dose × 12 kg = 24 mg/dose", perDose),
    skill("weight-day",doseText("تقسيم الجرعة اليومية", "Dividing a daily dose"),"Divided daily dose",doseText("اقرأ mg/kg/day. احسب مجموع اليوم، ثم اقسمه على عدد الجرعات المتساوية قبل تحويل جرعة واحدة إلى حجم.", "Read mg/kg/day. Find the daily total, then divide by the number of equal doses before converting a single dose to a volume."), "9 mg/kg/day × 10 kg ÷ 3 doses/day = 30 mg/dose", perDay),
    skill("pump",doseText("معدل مضخة التسريب", "Pump infusion rate"),"Infusion pump",doseText("حوّل الزمن إلى ساعات ثم اقسم الحجم الكلي على عدد الساعات.", "Convert the time to hours and divide the total volume by the number of hours."), "150 mL ÷ 1.5 h = 100 mL/h", pump),
    skill("gravity",doseText("معدل التنقيط بالجاذبية", "Gravity drip rate"),"Gravity drip rate",doseText("اقرأ معامل التنقيط من عبوة الأنبوب. اضربه في الحجم، ثم اقسم عدد القطرات على مدة التسريب بالدقائق وقرّب إلى أقرب قطرة كاملة.", "Read the drop factor from the tubing package. Multiply it by volume, then divide by the infusion time in minutes. Round the final result to the nearest whole drop."), "100 mL × 15 gtt/mL ÷ 60 min = 25 gtt/min", gravity),
    skill("weight-infusion",doseText("التسريب المحسوب بالوزن", "Weight-based infusion"),"Weight-based infusion",doseText("انتقل من ميكروغرام لكل كيلوغرام في الدقيقة إلى ميكروغرام في الدقيقة، ثم في الساعة، ثم إلى ملليلتر في الساعة.", "Convert micrograms per kilogram per minute to micrograms per minute, then to micrograms per hour and finally to millilitres per hour."), "1 mcg/kg/min × 50 kg × 60 min/h ÷ 250 mcg/mL = 12 mL/h", infusions),
    skill("decisions",doseText("متى أوقف الحساب؟", "When should I pause?"),"Safety decisions",doseText("اقرأ الوصفة والملصق بحثًا عن وحدة أو وزن أو معامل ناقص، أو حد يتعارض مع المعطيات. اختر الإجراء الذي يحل المشكلة قبل المتابعة.", "Look for a missing unit, weight or drop factor, or a conflict with a stated limit. Choose the action that resolves it before proceeding."), "", decisions)
  ];
  return {skills, units};
})();
if (typeof module !== "undefined") module.exports = DoseCases;
