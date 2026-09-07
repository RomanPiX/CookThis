/* Static content: meal slots, preference groups, health focus, lab panel, tips, swaps, achievements. */
CT.SLOTS = {
  B: { en: 'Breakfast', it: 'Colazione', order: 0, share: 0.24 },
  L: { en: 'Lunch', it: 'Pranzo', order: 1, share: 0.34 },
  D: { en: 'Dinner', it: 'Cena', order: 2, share: 0.32 },
  S: { en: 'Snack', it: 'Spuntino', order: 3, share: 0.10 },
};
CT.SLOT_ORDER = ['B', 'L', 'D', 'S'];

CT.FOOD_GROUPS = [
  { name: 'Fish & seafood', tags: [['tuna', 'Canned tuna'], ['salmon', 'Salmon'], ['mackerel', 'Mackerel'], ['sardines', 'Sardines'], ['codfish', 'White fish (cod, hake)'], ['shrimp', 'Shrimp'], ['smokedsalmon', 'Smoked salmon']] },
  { name: 'Meat & eggs', tags: [['chicken', 'Chicken'], ['turkey', 'Turkey'], ['beef', 'Lean beef'], ['bresaola', 'Bresaola'], ['eggs', 'Eggs']] },
  { name: 'Legumes & plant protein', tags: [['chickpeas', 'Chickpeas'], ['beans', 'Beans (cannellini, borlotti)'], ['lentils', 'Lentils'], ['peas', 'Peas'], ['hummus', 'Hummus & tahini'], ['soy', 'Tofu, edamame & soy sauce']] },
  { name: 'Dairy', tags: [['yogurt', 'Greek yogurt'], ['milk', 'Milk'], ['ricotta', 'Ricotta'], ['cottage', 'Cottage cheese'], ['mozzarella', 'Mozzarella'], ['parmigiano', 'Parmigiano'], ['cheese', 'Spreadable cheese']] },
  { name: 'Grains & starches', tags: [['bread', 'Wholegrain bread & wraps'], ['pasta', 'Pasta'], ['rice', 'Brown rice'], ['oats', 'Oats'], ['couscous', 'Couscous'], ['farro', 'Farro & barley'], ['potatoes', 'Potatoes'], ['popcorn', 'Popcorn']] },
  { name: 'Vegetables', tags: [['tomato', 'Tomatoes'], ['zucchini', 'Zucchini'], ['spinach', 'Spinach'], ['broccoli', 'Broccoli'], ['peppers', 'Peppers'], ['eggplant', 'Eggplant'], ['mushrooms', 'Mushrooms'], ['carrots', 'Carrots'], ['onion', 'Onion'], ['garlic', 'Garlic'], ['rocket', 'Rocket'], ['salad', 'Salad leaves'], ['cucumber', 'Cucumber'], ['avocado', 'Avocado'], ['greenbeans', 'Green beans'], ['cauliflower', 'Cauliflower'], ['pumpkin', 'Pumpkin'], ['corn', 'Sweetcorn'], ['olives', 'Olives & capers'], ['mixedveg', 'Frozen veg mixes'], ['celery', 'Celery']] },
  { name: 'Fruit', tags: [['apple', 'Apples'], ['banana', 'Bananas'], ['berries', 'Berries'], ['orange', 'Oranges'], ['pear', 'Pears'], ['kiwi', 'Kiwi'], ['cherries', 'Cherries'], ['peach', 'Peaches'], ['grapes', 'Grapes'], ['lemon', 'Lemon']] },
  { name: 'Nuts, seeds & treats', tags: [['walnuts', 'Walnuts'], ['almonds', 'Almonds'], ['peanuts', 'Peanuts & peanut butter'], ['seeds', 'Seeds (chia, flax, pumpkin)'], ['chocolate', 'Dark chocolate & cocoa'], ['honey', 'Honey']] },
  { name: 'Flavours', tags: [['chili', 'Chili'], ['curry', 'Curry'], ['basil', 'Basil & pesto'], ['mint', 'Mint'], ['cinnamon', 'Cinnamon'], ['mustard', 'Mustard'], ['oliveoil', 'Olive oil']] },
];

CT.ALLERGENS = [['D', 'Dairy / lactose'], ['G', 'Gluten'], ['N', 'Nuts & peanuts'], ['E', 'Eggs'], ['F', 'Fish'], ['S', 'Shellfish'], ['Y', 'Soy'], ['Z', 'Sesame']];
CT.DIETS = [['omni', 'I eat everything'], ['pesc', 'No meat, but fish is fine'], ['veg', 'Vegetarian']];
CT.EQUIPMENT = [['stove', 'Stovetop'], ['oven', 'Oven'], ['microwave', 'Microwave'], ['blender', 'Blender']];
CT.ACTIVITY = [['sedentary', 'Desk job, little exercise', 1.2], ['light', 'Light activity 1-3 days a week', 1.375], ['moderate', 'Exercise 3-5 days a week', 1.55], ['active', 'Hard exercise most days', 1.725]];

CT.BENEFIT_LABEL = { ldl: 'Cholesterol', tg: 'Triglycerides', uric: 'Uric acid', liver: 'Liver', glucose: 'Blood sugar', thyroid: 'Thyroid' };

CT.FOCUS = {
  ldl: {
    name: 'Cholesterol & LDL', labs: ['chol', 'ldl', 'hdl'], weight: 1,
    what: 'When total cholesterol and LDL sit above target, LDL is the number that matters: it is the particle that ends up in artery walls. Diet moves it by 10-20%; the rest is genetics and, often, the thyroid (an underactive thyroid raises LDL, and treating it frequently brings cholesterol down on its own).',
    favour: ['Oats, barley, legumes (soluble fibre binds cholesterol)', 'Extra virgin olive oil instead of butter', '30 g of nuts most days (walnuts, almonds)', 'Fish twice a week', 'Fruit and vegetables at every meal'],
    limit: ['Salame, mortadella, pancetta, sausages', 'Processed cheese (sottilette), aged cheese in big amounts', 'Butter, cream, fried food', 'Pastries and biscuits (palm oil, butter)'],
  },
  tg: {
    name: 'Triglycerides', labs: ['tg'], weight: 1,
    what: 'Triglycerides (target under 150) respond to diet faster than any other number here. They are made by the liver from sugar, refined carbohydrates, alcohol and excess calories. Omega-3 from oily fish lowers them directly.',
    favour: ['Oily fish 2-3 times a week (salmon, mackerel, sardines)', 'Whole grains instead of white bread and white pasta', 'Walnuts, chia and flax (plant omega-3)', 'Regular meals, no grazing on sweets'],
    limit: ['Sugary drinks and fruit juice (the fastest way to raise triglycerides)', 'Alcohol, especially beer and spirits', 'White bread, crackers, sweets, ice cream', 'Very large portions of pasta or rice'],
  },
  liver: {
    name: 'Liver enzymes (ALT, GGT)', labs: ['alt', 'ggt', 'ast'], weight: 0.8,
    what: 'Mildly raised ALT and GGT, together with high triglycerides, often mean fat stored in the liver. That is reversible: losing 5-10% of body weight, cutting sugar and alcohol, and eating Mediterranean-style typically normalises these enzymes within months. Your doctor decides whether an ultrasound is needed.',
    favour: ['Coffee (unsweetened) is protective for the liver', 'Vegetables, legumes, whole grains, olive oil', 'Fish and lean poultry', 'A modest calorie deficit if weight is above ideal'],
    limit: ['Alcohol (ideally none for the next three months)', 'Sugar and fructose: sweets, sodas, juice, honey in quantity', 'Saturated fat from cured meats and cheese', 'Ultra-processed snacks'],
  },
  uric: {
    name: 'Uric acid', labs: ['uric'], weight: 0.8,
    what: 'Uric acid above range comes from purines in food and from fructose and alcohol metabolism. High levels can lead to gout. Plant purines (legumes, spinach) do not raise the risk; animal purines and alcohol do.',
    favour: ['Water: 2 litres or more a day', 'Low-fat dairy (yogurt, milk) actively lowers uric acid', 'Cherries, citrus fruit, vegetables', 'Coffee (moderate) is associated with lower uric acid'],
    limit: ['Cured meats, offal, meat stock and gravy', 'Anchovies, sardines, mackerel, shellfish more than once a week', 'Beer above all, then spirits and wine', 'Sugary drinks and fructose syrup'],
  },
  glucose: {
    name: 'Blood sugar (borderline)', labs: ['glu', 'hba1c'], weight: 0.6,
    what: 'A fasting glucose above 100 can still sit inside the lab range while crossing the threshold many guidelines use for "impaired fasting glucose". With a normal HbA1c that is an early warning, not a diagnosis. Fibre, protein alongside carbohydrates, and movement after meals keep it in check.',
    favour: ['Whole grains, legumes, vegetables at every meal', 'Protein alongside carbohydrates', 'A 10-minute walk after lunch or dinner', 'Whole fruit instead of juice'],
    limit: ['Sugary drinks, sweets, white bread', 'Skipping meals then eating a big one', 'Large portions of refined carbohydrates'],
  },
  thyroid: {
    name: 'Thyroid (TSH high)', labs: ['tsh', 'ft4'], weight: 0.5,
    what: 'A raised TSH with FT4 at the low end of normal points to an underactive thyroid, which slows metabolism and raises cholesterol and triglycerides. This is a doctor matter: usually a repeat test in a few weeks, possibly levothyroxine. Diet plays a supporting role.',
    favour: ['Iodized salt (sale iodato) as your everyday salt', 'Fish, eggs and dairy: natural iodine and selenium', 'Nuts and seeds (selenium, zinc)', 'If you are prescribed levothyroxine: take it on an empty stomach, wait 30-60 minutes before coffee or breakfast, and keep calcium, iron and soy 4 hours away'],
    limit: ['Iodine supplements or kelp without medical advice (too much is as bad as too little)', 'Very large amounts of raw soy or cabbage-family vegetables (normal portions are fine)', 'Crash diets, which slow the thyroid further'],
  },
};

/* Lab panel: units and reference intervals exactly as printed on the report. */
CT.LABS = [
  { id: 'glu', name: 'Fasting glucose', unit: 'mg/dL', lo: 60, hi: 110, ideal: '< 100', group: 'Sugar' },
  { id: 'hba1c', name: 'HbA1c', unit: 'mmol/mol', lo: 20, hi: 42, group: 'Sugar' },
  { id: 'chol', name: 'Total cholesterol', unit: 'mg/dL', hi: 200, group: 'Lipids' },
  { id: 'ldl', name: 'LDL cholesterol', unit: 'mg/dL', hi: 116, ideal: '< 116 (low risk)', group: 'Lipids' },
  { id: 'hdl', name: 'HDL cholesterol', unit: 'mg/dL', lo: 35, ideal: '> 40, better > 60', group: 'Lipids' },
  { id: 'tg', name: 'Triglycerides', unit: 'mg/dL', hi: 150, group: 'Lipids' },
  { id: 'uric', name: 'Uric acid', unit: 'mg/dL', lo: 3.4, hi: 7.0, group: 'Metabolic' },
  { id: 'alt', name: 'ALT (GPT)', unit: 'U/L', hi: 50, group: 'Liver' },
  { id: 'ast', name: 'AST (GOT)', unit: 'U/L', hi: 50, group: 'Liver' },
  { id: 'ggt', name: 'Gamma GT', unit: 'U/L', hi: 55, group: 'Liver' },
  { id: 'tsh', name: 'TSH', unit: 'microU/mL', lo: 0.25, hi: 4.50, group: 'Thyroid' },
  { id: 'ft4', name: 'Free T4', unit: 'pg/mL', lo: 5.5, hi: 12.0, group: 'Thyroid' },
  { id: 'crea', name: 'Creatinine', unit: 'mg/dL', lo: 0.72, hi: 1.18, group: 'Kidney' },
  { id: 'egfr', name: 'eGFR', unit: 'mL/min/1.73 m²', lo: 90, group: 'Kidney' },
  { id: 'urea', name: 'Urea', unit: 'mg/dL', lo: 17, hi: 43, group: 'Kidney' },
  { id: 'na', name: 'Sodium', unit: 'mmol/L', lo: 136, hi: 145, group: 'Electrolytes' },
  { id: 'k', name: 'Potassium', unit: 'mmol/L', lo: 3.5, hi: 5.3, group: 'Electrolytes' },
  { id: 'hgb', name: 'Haemoglobin', unit: 'g/dL', lo: 13.5, hi: 17.2, group: 'Blood count' },
];

CT.INITIAL_LABS = (window.CT_CONFIG && window.CT_CONFIG.initialLabs)
  || { date: CT.today ? CT.today() : new Date().toISOString().slice(0, 10), label: 'First check-up', values: {} };

CT.TIPS = [
  'Fibre is the quiet hero: 30 g a day is the target, and a can of beans gets you a third of the way there.',
  'Triglycerides drop fastest when sugary drinks and alcohol go. Water with lemon or sparkling water is the swap.',
  'Two portions of oily fish a week is the dose that matters for triglycerides. Canned mackerel counts.',
  'A handful of walnuts a day (about 30 g) is linked to lower LDL. Count them out; the bag is not a portion.',
  'Coffee, unsweetened, is good news for both liver enzymes and uric acid. Two or three a day is fine.',
  'Salame is about 30% fat, most of it saturated, with 1.5 g of salt per 40 g. Turkey breast slices have a fifth of the fat.',
  'Sottilette are 60% fat by calories and full of salt. Light ricotta gives the creaminess for a third of the saturated fat.',
  'Uric acid loves dehydration. Aim for 8 glasses of water; the tracker on the Today page is there for a reason.',
  'Plant purines (lentils, chickpeas, spinach) do not raise gout risk. Animal purines and beer do.',
  'Cherries, low-fat yogurt and vitamin C from citrus all nudge uric acid down.',
  'Losing 5% of body weight typically drops liver enzymes noticeably. Slow and steady is the point.',
  'Wholegrain bread instead of white is the single easiest carbohydrate swap: same sandwich, three times the fibre.',
  'Legumes at lunch keep blood sugar steadier all afternoon. Canned ones are ready in 30 seconds.',
  'Extra virgin olive oil is fat you want. One tablespoon per meal, on the food, not in the pan for frying.',
  'If levothyroxine is prescribed: empty stomach, then wait 30-60 min before coffee. Coffee cuts its absorption.',
  'Use iodized salt (sale iodato) at home. The thyroid needs iodine and Italian diets are often low.',
  'A 10-minute walk after dinner lowers the post-meal glucose peak. It is the cheapest medicine there is.',
  'Frozen vegetables are nutritionally equal to fresh, cheaper, and they do not rot in the drawer.',
  'Beer is the worst drink for uric acid; it carries purines of its own plus the alcohol. Make it rare.',
  'Batch-cook one tray or one pot on Sunday: three of your week\'s dinners are then reheat-only.',
  'Eggs are fine at up to about one a day for most people. It is the salame beside them that was the problem.',
  'Dark chocolate 70%+: two squares. The percentage matters, the quantity matters more.',
  'Fruit juice is sugar without the fibre. Eat the orange instead.',
  'Pasta is fine: wholewheat, 80 g dry, with vegetables and legumes or fish. Portion, not prohibition.',
  'Read the label for "grassi saturi": under 1.5 g per 100 g is low, over 5 g is high.',
  'Sodium hides in bread, cold cuts, cheese and stock cubes. Herbs, lemon, chili and garlic do the seasoning for free.',
  'HDL rises with exercise, olive oil, nuts and fish. Not with any supplement.',
  'Sleep matters for glucose and triglycerides. A short night makes the next day\'s numbers worse.',
];

CT.SWAPS = [
  { from: 'Salame, mortadella, coppa', to: 'Turkey breast slices (fesa di tacchino), bresaola once a week, canned tuna, mashed white beans with rosemary', why: 'Cured pork is 30-40% fat, nearly all saturated, and 3-4 g of salt per 100 g. The swaps keep the 2-minute sandwich and cut saturated fat by 80%.' },
  { from: 'Prosciutto crudo / cotto', to: 'Cooked turkey or chicken breast, a boiled egg, smoked salmon once a week', why: 'Leaner than salame but still 2.5 g of salt per 100 g. Fine occasionally; not the daily default.' },
  { from: 'Sottilette and processed cheese', to: 'Light ricotta, cottage cheese (fiocchi di latte), hummus, avocado, a teaspoon of parmigiano for flavour', why: 'Processed cheese is mostly saturated fat and salt with emulsifiers. Ricotta and cottage give the same creaminess with half the fat.' },
  { from: 'White bread, rosette, focaccia', to: 'Wholegrain bread (pane integrale), wholewheat piadina, rye bread', why: 'Triple the fibre, slower glucose rise, more filling for the same calories.' },
  { from: 'Butter on the pan or bread', to: 'Extra virgin olive oil', why: 'Olive oil is mostly monounsaturated fat that lowers LDL; butter is 60% saturated fat that raises it.' },
  { from: 'Coke, iced tea, fruit juice', to: 'Water, sparkling water with lemon, unsweetened tea or coffee', why: 'Liquid sugar goes straight to triglycerides and uric acid. This one swap can move both numbers within weeks.' },
  { from: 'Beer with dinner', to: 'Sparkling water with lemon; if you drink, one glass of wine at the weekend', why: 'Beer raises uric acid through purines and alcohol, and alcohol drives triglycerides and GGT.' },
  { from: 'Chips, taralli, salted crackers', to: 'Nuts (30 g), popcorn you pop yourself, roasted chickpeas, veg sticks with hummus', why: 'Nuts and legumes bring fibre and good fats; the salty snacks bring refined starch, salt and often palm oil.' },
  { from: 'Biscuits, merendine, croissant', to: 'Greek yogurt with fruit and nuts, overnight oats, dark chocolate (2 squares)', why: 'Pastries combine sugar and saturated fat, the exact pair that raises triglycerides and LDL.' },
  { from: 'Fried anything', to: 'Oven at 220 °C, air fryer, or a hot pan with a teaspoon of oil', why: 'Same crunch with a quarter of the fat.' },
  { from: 'Aged cheese as the main course', to: 'Light mozzarella or ricotta in the dish, parmigiano grated on top for taste', why: 'Cheese is fine as a flavour; as the protein of the meal it brings 15-20 g of saturated fat.' },
  { from: 'Meat stock cubes and gravy', to: 'Low-salt vegetable stock, lemon, herbs, garlic', why: 'Meat extracts are purine-dense and very salty.' },
];

CT.EATING_OUT = [
  'Pizza night: marinara or vegetables, thin crust, no salame or wurstel; skip the beer, split a dessert.',
  'Trattoria: grilled fish or chicken with vegetables; pasta al pomodoro or with legumes; skip the tagliere of cured meats and cheeses.',
  'Bar lunch: insalatona with tuna or chicken, or a wholegrain panino with turkey and vegetables. Not the tramezzino with mayo.',
  'Aperitivo: one drink at most (a spritz has sugar; wine is lower), go for olives and vegetables, leave the chips and salame.',
  'Kebab or burger: grilled chicken, extra vegetables, yogurt sauce, no fries. Water, not soda.',
  'Sushi: fine, but rice adds up. Pair with edamame and miso; skip tempura and sweet sauces.',
];

CT.ACHIEVEMENTS = [
  { id: 'first_meal', icon: '🍳', name: 'First plate', desc: 'Cooked your first CookThis meal.', check: (s) => s.mealsCooked >= 1 },
  { id: 'three_day', icon: '🔥', name: 'Three in a row', desc: 'Cooked something on 3 consecutive days.', check: (s) => s.cookStreakBest >= 3 },
  { id: 'week_streak', icon: '🏅', name: 'Full week', desc: '7-day cooking streak.', check: (s) => s.cookStreakBest >= 7 },
  { id: 'month_streak', icon: '🏆', name: 'Thirty days', desc: '30-day cooking streak.', check: (s) => s.cookStreakBest >= 30 },
  { id: 'salame_week', icon: '🚫', name: 'Salame-free week', desc: '7 days without a cured-meat confession.', check: (s) => s.slipFreeDays >= 7 },
  { id: 'salame_month', icon: '🛡️', name: 'Salame-free month', desc: '30 days without a cured-meat confession.', check: (s) => s.slipFreeDays >= 30 },
  { id: 'fish_twice', icon: '🐟', name: 'Fish twice', desc: 'Two fish meals cooked in one week.', check: (s) => s.fishThisWeek >= 2 },
  { id: 'legume_lover', icon: '🫘', name: 'Legume lover', desc: 'Cooked 10 meals with legumes.', check: (s) => s.legumeMeals >= 10 },
  { id: 'hydration', icon: '💧', name: 'Hydration hero', desc: 'Hit 8 glasses of water on 5 days.', check: (s) => s.waterDays >= 5 },
  { id: 'explorer', icon: '🧭', name: 'Explorer', desc: 'Cooked 15 different recipes.', check: (s) => s.distinctRecipes >= 15 },
  { id: 'batch', icon: '📦', name: 'Meal prepper', desc: 'Cooked a batch recipe.', check: (s) => s.batchMeals >= 1 },
  { id: 'checkup', icon: '🩸', name: 'Follow-up', desc: 'Logged a second blood test. Now we can compare.', check: (s) => s.labCount >= 2 },
  { id: 'inventor', icon: '✨', name: 'Inventor', desc: 'Saved a recipe you created with Claude.', check: (s) => s.customRecipes >= 1 },
  { id: 'weighin', icon: '⚖️', name: 'Weigh-in', desc: 'Logged your weight 4 times.', check: (s) => s.weightCount >= 4 },
];
