export const reviews=[
 ['Timing · H8','Source: “Continue this friction from 10–30 seconds.” Prototype: 30 seconds of active rubbing, with coverage of both hands. Faculty must confirm the friction target and distinguish it from WHO’s 40–60 seconds for the entire handwash.'],
 ['Nails · H9','Source permits the other hand’s fingernails or a clean wood stick. The prototype represents gentle under-nail cleaning by the opposite fingertips; it does not demonstrate scraping or insertion of a sharp object. Faculty must approve the exact method/tool before student deployment.'],
 ['Jewellery · H2','Source allows a plain wedding band. Ahmed wears a watch only, which is removed. Confirm local ring policy before adding rings to assessment.'],
 ['Water, soap and drying · H3/H5/H11','Source specifies warm water, about one teaspoon of liquid soap or rinsed bar soap, and paper towel/hand towel. This prototype selects liquid soap and a disposable paper towel. Confirm dispenser dose, water rationale and local towel policy. Towel-protected faucet closure is an explicit interpretation of H11’s recontamination rationale.'],
 ['Containment · G12–G13','Source: drop gloves in a bag, seal tightly, then put the sealed bag in the trash. This sequence is retained. Faculty must approve the local clinical waste stream; the bin intentionally has no universal waste colour.'],
 ['Added care contact and visual markers','The brief used-washcloth contact is an added fictional context to explain why gloves become used; it is not a taught care procedure. Coloured speckles illustrate contamination and cannot measure real microbial load. The app evaluates interactions, not real-world competency.']
];
export const lessons=[
 {title:'Before Khaled’s morning care',tag:'WHAT / WHEN',body:'You are Ahmed, a first-year nursing student. Handwashing prepares your hands for care; gloves are used for the brief simulated contact with a used washcloth. Gloves do not replace hand hygiene.',interaction:'contact',why:'The gloving source begins and ends with handwashing and drying to remove microorganisms and prevent spread.'},
 {title:'Let the water travel the right way',tag:'WHY / WHAT CAN GO WRONG',body:'Drag Ahmed’s hands above and below the elbow line. See where the water would travel.',interaction:'height',why:'H4: keep hands lower than elbows. The source considers hands more contaminated than arms and directs water from less to more contaminated areas.'},
 {title:'Make every surface accessible',tag:'WHAT / WHY',body:'Touch the watch to remove it. Then turn the hands and rub the highlighted areas. Skin beneath a watch and missed fingertips are easy to overlook.',interaction:'coverage',why:'H2: removing the watch gives access to skin. H6–H9: friction loosens dirt and removes microorganisms, including on wrists, forearms and under nails.'},
 {title:'Keep clean fingers clean',tag:'WHAT CAN GO WRONG',body:'Compare touching the faucet with bare fingers and using a paper towel. Watch where the coloured marker goes.',interaction:'faucet',why:'H11: the faucet is less clean than freshly washed hands. The towel acts as the demonstrated barrier.'},
 {title:'The outside becomes the inside',tag:'CLEAN GLOVING',body:'Gloves protect the hands during the short used-cloth contact. On removal, the first glove turns inside-out. Bare fingers slide beneath the other cuff, not onto its exterior.',interaction:'glove',why:'G8–G11: avoid contaminated surfaces with bare hands and contain microorganisms inside the removed gloves.'},
 {title:'Contain, dispose, wash again',tag:'AFTER CARE',body:'The instructor places the gloves in a bag, seals it and puts it in the bin. Finish with careful handwashing and drying. Try the bag and bin in the scene.',interaction:'disposal',why:'G12–G14: containment limits spread; final handwashing removes microorganisms. Local waste policy needs faculty confirmation.'}
];
export const demo=[
 ['sink','stance','Stand clear of the basin','H1 · Prevent contamination of the uniform.'],
 ['sink','watch','Remove the watch','H2 · Provides access to skin surfaces for cleaning.'],
 ['sink','water','Turn on running water','H3 · Running water removes microorganisms.'],
 ['sink','warm','Adjust to warm water and gentle flow','H3 · Source specifies warm water; temperature rationale is flagged for faculty review.'],
 ['sink','position','Keep hands below elbows','H4 · Water flows from the less contaminated arms toward the hands.'],
 ['sink','wet','Wet hands and wrists','H4 · Wetting comes BEFORE soap in the supplied procedure.'],
 ['sink','soap','Apply liquid soap','H5 · Lather facilitates removal of microorganisms.'],
 ...['palms','backs','fingers','fingertips','knuckles','wrists','forearms','nails'].map(a=>['sink','rub','Clean '+(a==='nails'?'under the nails':a),'H6–H9 · Friction mechanically removes microorganisms. Clean both sides; forearms extend as high as likely contamination.',a]),
 ['sink','rinse','Rinse thoroughly','H10 · Remove soap from the skin.'],
 ['sink','dry','Dry hands and wrists with a paper towel','H11 · Dry before glove application.'],
 ['sink','faucet','Use the towel to close the faucet','H11 · Avoid recontamination from a less-clean faucet.'],
 ['gloves','takeGlove','Take the first glove','G2 · Take a clean glove from the box with one hand.'],
 ['gloves','don','Slide it onto the other hand','G3 · Watch the cuff slide over the hand.'],
 ['gloves','takeGlove','Take the second glove with the gloved hand','G4 · The instructor sequence uses the gloved hand.'],
 ['gloves','don','Slide it onto the bare hand','G5 · Cover the second hand.'],
 ['gloves','fit','Interlace fingers','G6 · Make gloves fit smoothly and comfortably.'],
 ['patient','care','Brief contact with the used washcloth','Added care context · This contact makes the outer glove surfaces “used”.'],
 ['gloves','removeFirst','Grip at the base of the palm; peel inside-out','G8–G9 · Keep the contaminated surface inside.'],
 ['gloves','removeSecond','Bare fingers under the second cuff; push down and off','G10–G11 · Bare fingers avoid the contaminated exterior.'],
 ['gloves','bag','Place gloves in the bag','G12 · Contain microorganisms.'],
 ['gloves','seal','Seal the bag','G12 · Follow the instructor’s containment sequence; local policy review pending.'],
 ['gloves','dispose','Place sealed bag in the bin','G13 · Dispose according to faculty-confirmed local policy.'],
 ['sink','water','Final wash: turn on the water','G14 · Carefully wash and dry hands after glove removal.'],
 ['sink','wet','Wet hands and wrists again','H4 / G14 · Repeat the handwash after removal.'],
 ['sink','soap','Apply liquid soap again','H5 / G14 · Gloves do not replace handwashing.'],
 ...['palms','backs','fingers','fingertips','knuckles','wrists','forearms','nails'].map(a=>['sink','rub','Final wash: '+a,'H6–H9 / G14 · Repeat coverage on both hands.',a]),
 ['sink','rinse','Rinse again','H10 / G14 · Remove soap.'],
 ['sink','dry','Dry hands and wrists','H11 / G14 · Complete handwashing and drying.'],
 ['sink','faucet','Close the faucet through the paper towel','H11 / G14 · Finish without recontamination.']
];
