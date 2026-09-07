/* CookThis ingredient table.
   Per 100 g: kcal, protein, carbs, fiber, fat, saturated fat, sugars (g), sodium (mg).
   price: approximate €/kg in an Italian supermarket (2026).
   tag: the food-preference bucket used in setup (like / dislike).
   flags: F fish · S shellfish · E egg · D dairy · G gluten · N nuts · Y soy · Z sesame
          M meat/poultry · R red meat · I iodine source · L selenium source
   o3: omega-3 (EPA+DHA or ALA) g/100 g.  pur: purine load 0-3.
   pack: grams per shopping unit, and the unit's name (for the shopping list). */
window.CT = window.CT || {};
CT.ING = {};
(function () {
  const I = (id, en, it, aisle, kcal, p, c, fib, fat, sf, sug, na, price, tag, flags, o3, pur, packG, packLabel) => {
    CT.ING[id] = { id, en, it, aisle, per100: { kcal, p, c, fib, fat, sf, sug, na }, price, tag, flags: flags || '', o3: o3 || 0, pur: pur || 0, pack: packG ? { g: packG, label: packLabel } : null };
  };
  // ---- Bread, grains, starches
  I('bread_ww', 'Wholegrain bread', 'pane integrale', 'Bakery & grains', 247, 13, 41, 6, 3.4, 0.7, 4.3, 450, 4.5, 'bread', 'GL', 0, 0, 35, 'slice');
  I('pita_ww', 'Wholewheat pita', 'pita integrale', 'Bakery & grains', 266, 10, 55, 7, 1.7, 0.3, 1, 500, 6, 'bread', 'G', 0, 0, 60, 'pita');
  I('piadina_ww', 'Wholewheat piadina (wrap)', 'piadina integrale', 'Bakery & grains', 300, 9, 50, 6, 7, 1.5, 2, 600, 6.5, 'bread', 'G', 0, 0, 70, 'piadina');
  I('crackers_ww', 'Wholegrain crackers', 'crackers integrali', 'Bakery & grains', 400, 10, 68, 8, 9, 1.5, 3, 600, 6, 'bread', 'G', 0, 0, 8, 'cracker');
  I('pasta_ww', 'Wholewheat pasta', 'pasta integrale', 'Bakery & grains', 348, 13.5, 70, 8, 2.5, 0.5, 2.5, 5, 2.2, 'pasta', 'GL', 0, 0, 0, '');
  I('pasta_small', 'Small soup pasta (ditalini)', 'pasta piccola (ditalini)', 'Bakery & grains', 355, 12, 72, 3, 1.5, 0.3, 3, 5, 1.6, 'pasta', 'G', 0, 0, 0, '');
  I('rice_brown', 'Precooked brown rice', 'riso integrale precotto', 'Bakery & grains', 130, 3, 27, 2.5, 1, 0.2, 0.5, 5, 6, 'rice', 'L', 0, 0, 125, 'pouch portion (125 g)');
  I('farro_pre', 'Precooked farro or barley', 'farro/orzo precotto', 'Bakery & grains', 130, 5, 25, 4, 1, 0.2, 0.5, 200, 6, 'farro', 'G', 0, 0, 125, 'pouch portion (125 g)');
  I('couscous', 'Couscous', 'cous cous', 'Bakery & grains', 376, 12.8, 77, 5, 0.6, 0.1, 0, 10, 3, 'couscous', 'G', 0, 0, 0, '');
  I('oats', 'Rolled oats', "fiocchi d'avena", 'Bakery & grains', 379, 13, 67, 10, 6.5, 1.2, 1, 5, 2.5, 'oats', 'GL', 0, 0, 0, '');
  I('popcorn', 'Popcorn kernels', 'mais per popcorn', 'Canned & dry', 387, 12, 78, 15, 4.5, 0.6, 0.9, 8, 3, 'popcorn', '', 0, 0, 0, '');
  I('potato', 'Potatoes', 'patate', 'Produce', 77, 2, 17, 2.2, 0.1, 0, 0.8, 6, 1.3, 'potatoes', '', 0, 0, 150, 'potato');
  I('sweet_potato', 'Sweet potato', 'patata dolce', 'Produce', 86, 1.6, 20, 3, 0.1, 0, 4.2, 55, 2.5, 'potatoes', '', 0, 0, 250, 'sweet potato');
  // ---- Legumes & plant protein
  I('chickpeas', 'Chickpeas, canned (drained)', 'ceci in scatola', 'Canned & dry', 139, 7.5, 20, 6, 2.7, 0.3, 0.5, 230, 3.3, 'chickpeas', '', 0, 1, 240, 'can (400 g)');
  I('cannellini', 'Cannellini beans, canned (drained)', 'fagioli cannellini in scatola', 'Canned & dry', 100, 6.5, 15, 5.5, 0.5, 0.1, 0.5, 230, 3.3, 'beans', '', 0, 1, 240, 'can (400 g)');
  I('borlotti', 'Borlotti beans, canned (drained)', 'fagioli borlotti in scatola', 'Canned & dry', 105, 6.5, 16, 6, 0.5, 0.1, 0.5, 230, 3.3, 'beans', '', 0, 1, 240, 'can (400 g)');
  I('lentils_can', 'Lentils, canned (drained)', 'lenticchie in scatola', 'Canned & dry', 100, 7, 15, 5.5, 0.5, 0.1, 0.5, 230, 3.3, 'lentils', '', 0, 1, 240, 'can (400 g)');
  I('lentils_red', 'Dry red lentils', 'lenticchie rosse decorticate', 'Canned & dry', 350, 25, 60, 11, 1.5, 0.2, 2, 6, 3, 'lentils', '', 0, 1, 0, '');
  I('peas', 'Peas, frozen', 'piselli surgelati', 'Frozen', 80, 5.4, 14, 5, 0.4, 0.1, 5, 5, 2.5, 'peas', '', 0, 1, 0, '');
  I('edamame', 'Edamame, frozen', 'edamame surgelati', 'Frozen', 120, 11, 9, 5, 5, 0.6, 2, 5, 7, 'soy', 'Y', 0, 1, 0, '');
  I('tofu', 'Firm tofu', 'tofu', 'Dairy & eggs', 80, 9, 2, 1, 4.5, 0.7, 0.5, 10, 8, 'soy', 'Y', 0, 1, 0, '');
  I('hummus', 'Hummus', 'hummus', 'Dairy & eggs', 170, 7, 15, 5, 10, 1.3, 0.5, 400, 9, 'hummus', 'Z', 0, 1, 0, '');
  // ---- Fish
  I('tuna', 'Tuna in water (drained)', 'tonno al naturale', 'Canned & dry', 110, 25, 0, 0, 1, 0.3, 0, 350, 12, 'tuna', 'FIL', 0.3, 2, 52, 'small can (80 g)');
  I('mackerel', 'Mackerel fillets, canned (drained)', 'filetti di sgombro', 'Canned & dry', 200, 22, 0, 0, 12, 3, 0, 400, 14, 'mackerel', 'FIL', 2.5, 3, 90, 'can (125 g)');
  I('sardines', 'Sardines, canned (drained)', 'sardine in scatola', 'Canned & dry', 208, 25, 0, 0, 11.5, 1.5, 0, 400, 12, 'sardines', 'FIL', 1.5, 3, 85, 'can (120 g)');
  I('salmon', 'Salmon fillet', 'filetto di salmone', 'Meat & fish', 208, 20, 0, 0, 13, 3, 0, 60, 20, 'salmon', 'FIL', 2, 2, 130, 'fillet (130 g)');
  I('salmon_smoked', 'Smoked salmon', 'salmone affumicato', 'Meat & fish', 117, 18, 0, 0, 4.3, 1, 0, 1900, 35, 'smokedsalmon', 'FIL', 1.2, 2, 0, '');
  I('cod', 'White fish fillets, frozen (cod or hake)', 'filetti di merluzzo surgelati', 'Frozen', 82, 18, 0, 0, 0.7, 0.1, 0, 70, 12, 'codfish', 'FIL', 0.2, 2, 0, '');
  I('shrimp', 'Shrimp, frozen, peeled', 'gamberetti sgusciati surgelati', 'Frozen', 85, 20, 0, 0, 0.5, 0.1, 0, 300, 15, 'shrimp', 'SIL', 0.3, 3, 0, '');
  // ---- Meat, poultry, eggs
  I('chicken', 'Chicken breast', 'petto di pollo', 'Meat & fish', 110, 23, 0, 0, 1.5, 0.4, 0, 65, 9, 'chicken', 'ML', 0, 2, 0, '');
  I('turkey_steak', 'Turkey breast steaks', 'fettine di tacchino', 'Meat & fish', 105, 24, 0, 0, 1, 0.3, 0, 55, 10, 'turkey', 'ML', 0, 2, 0, '');
  I('turkey_slices', 'Turkey breast slices (cold cut)', 'fesa di tacchino affettata', 'Meat & fish', 105, 20, 1.5, 0, 2, 0.6, 1, 900, 18, 'turkey', 'ML', 0, 2, 0, '');
  I('bresaola', 'Bresaola', 'bresaola', 'Meat & fish', 150, 32, 0, 0, 2.5, 1, 0, 1600, 40, 'bresaola', 'MRL', 0, 2, 0, '');
  I('beef_lean', 'Lean beef strips', 'straccetti di manzo magro', 'Meat & fish', 135, 21, 0, 0, 5, 2, 0, 60, 16, 'beef', 'MRL', 0, 2, 0, '');
  I('egg', 'Eggs', 'uova', 'Dairy & eggs', 143, 12.6, 0.7, 0, 9.5, 3.1, 0.4, 140, 5.5, 'eggs', 'EIL', 0.1, 0, 55, 'egg');
  // ---- Dairy
  I('yogurt_greek', 'Low-fat Greek yogurt', 'yogurt greco magro', 'Dairy & eggs', 65, 10, 3.6, 0, 1.5, 1, 3.6, 36, 5, 'yogurt', 'DI', 0, 0, 170, 'pot (170 g)');
  I('milk_skim', 'Skimmed or semi-skimmed milk', 'latte scremato o parzialmente scremato', 'Dairy & eggs', 42, 3.4, 5, 0, 1, 0.6, 5, 44, 1.4, 'milk', 'DI', 0, 0, 0, '');
  I('ricotta_light', 'Light ricotta', 'ricotta light', 'Dairy & eggs', 115, 10, 4, 0, 6.5, 4.2, 3, 90, 7, 'ricotta', 'DI', 0, 0, 0, '');
  I('cottage', 'Cottage cheese', 'fiocchi di latte', 'Dairy & eggs', 98, 11, 3.4, 0, 4.3, 2.7, 2.7, 330, 8, 'cottage', 'DI', 0, 0, 0, '');
  I('mozz_light', 'Light mozzarella', 'mozzarella light', 'Dairy & eggs', 160, 20, 1, 0, 8, 5.5, 1, 400, 10, 'mozzarella', 'DI', 0, 0, 125, 'ball (125 g)');
  I('parm', 'Parmigiano, grated', 'parmigiano grattugiato', 'Dairy & eggs', 392, 33, 0, 0, 28, 19, 0, 1600, 18, 'parmigiano', 'DI', 0, 0, 0, '');
  I('cheese_spread_light', 'Light spreadable cheese', 'formaggio spalmabile light', 'Dairy & eggs', 150, 8, 4, 0, 11, 7, 3, 500, 9, 'cheese', 'DI', 0, 0, 0, '');
  // ---- Vegetables
  I('tomato', 'Tomatoes', 'pomodori', 'Produce', 18, 0.9, 3.9, 1.2, 0.2, 0, 2.6, 5, 2.5, 'tomato', '', 0, 0, 120, 'tomato');
  I('cherry_tom', 'Cherry tomatoes', 'pomodorini', 'Produce', 18, 0.9, 3.9, 1.2, 0.2, 0, 2.6, 5, 3.5, 'tomato', '', 0, 0, 0, '');
  I('passata', 'Tomato passata', 'passata di pomodoro', 'Canned & dry', 32, 1.5, 6, 1.5, 0.2, 0, 4, 20, 1.5, 'tomato', '', 0, 0, 0, '');
  I('zucchini', 'Zucchini', 'zucchine', 'Produce', 17, 1.2, 3.1, 1, 0.3, 0.1, 2.5, 8, 2.5, 'zucchini', '', 0, 0, 200, 'zucchini');
  I('spinach', 'Spinach (fresh or frozen)', 'spinaci', 'Produce', 23, 2.9, 3.6, 2.2, 0.4, 0.1, 0.4, 79, 3, 'spinach', '', 0, 1, 0, '');
  I('broccoli', 'Broccoli', 'broccoli', 'Produce', 34, 2.8, 7, 2.6, 0.4, 0, 1.7, 33, 2.5, 'broccoli', '', 0, 0, 0, '');
  I('pepper', 'Bell pepper', 'peperoni', 'Produce', 31, 1, 6, 2.1, 0.3, 0, 4.2, 4, 3, 'peppers', '', 0, 0, 150, 'pepper');
  I('eggplant', 'Eggplant', 'melanzane', 'Produce', 25, 1, 6, 3, 0.2, 0, 3.5, 2, 2.5, 'eggplant', '', 0, 0, 250, 'eggplant');
  I('mushrooms', 'Mushrooms', 'funghi champignon', 'Produce', 22, 3.1, 3.3, 1, 0.3, 0, 2, 5, 4, 'mushrooms', 'L', 0, 1, 0, '');
  I('carrot', 'Carrots', 'carote', 'Produce', 41, 0.9, 10, 2.8, 0.2, 0, 4.7, 69, 1.2, 'carrots', '', 0, 0, 80, 'carrot');
  I('onion', 'Onion', 'cipolla', 'Produce', 40, 1.1, 9, 1.7, 0.1, 0, 4.2, 4, 1.2, 'onion', '', 0, 0, 100, 'onion');
  I('spring_onion', 'Spring onion', 'cipollotto', 'Produce', 32, 1.8, 7, 2.6, 0.2, 0, 2.3, 16, 4, 'onion', '', 0, 0, 25, 'spring onion');
  I('garlic', 'Garlic', 'aglio', 'Produce', 149, 6.4, 33, 2.1, 0.5, 0.1, 1, 17, 6, 'garlic', '', 0, 0, 3, 'clove');
  I('rocket', 'Rocket', 'rucola', 'Produce', 25, 2.6, 3.7, 1.6, 0.7, 0.1, 2, 27, 10, 'rocket', '', 0, 0, 0, '');
  I('salad', 'Mixed salad leaves', 'insalata mista', 'Produce', 15, 1.4, 2.9, 1.3, 0.2, 0, 0.8, 28, 5, 'salad', '', 0, 0, 0, '');
  I('lettuce', 'Lettuce', 'lattuga', 'Produce', 15, 1.4, 2.9, 1.3, 0.2, 0, 0.8, 28, 4, 'salad', '', 0, 0, 0, '');
  I('cucumber', 'Cucumber', 'cetriolo', 'Produce', 15, 0.7, 3.6, 0.5, 0.1, 0, 1.7, 2, 1.5, 'cucumber', '', 0, 0, 250, 'cucumber');
  I('avocado', 'Avocado', 'avocado', 'Produce', 160, 2, 8.5, 6.7, 14.7, 2.1, 0.7, 7, 6, 'avocado', '', 0.1, 0, 120, 'avocado');
  I('veg_mix', 'Frozen soup vegetable mix', 'minestrone surgelato', 'Frozen', 65, 3, 11, 4, 0.5, 0.1, 3, 40, 3, 'mixedveg', '', 0, 0, 0, '');
  I('stirfry_mix', 'Frozen stir-fry vegetables', 'verdure per wok surgelate', 'Frozen', 45, 2, 8, 3, 0.5, 0.1, 3.5, 30, 3.5, 'mixedveg', '', 0, 0, 0, '');
  I('green_beans', 'Green beans (fresh or frozen)', 'fagiolini', 'Produce', 31, 1.8, 7, 2.7, 0.2, 0, 3.3, 6, 3, 'greenbeans', '', 0, 0, 0, '');
  I('cauliflower', 'Cauliflower', 'cavolfiore', 'Produce', 25, 1.9, 5, 2, 0.3, 0.1, 1.9, 30, 2, 'cauliflower', '', 0, 0, 0, '');
  I('pumpkin', 'Pumpkin, pre-cut', 'zucca a pezzi', 'Produce', 26, 1, 6.5, 0.5, 0.1, 0, 2.8, 1, 2.5, 'pumpkin', '', 0, 0, 0, '');
  I('corn', 'Sweetcorn, canned (drained)', 'mais in scatola', 'Canned & dry', 80, 2.6, 15, 2, 1.2, 0.2, 4, 200, 4, 'corn', '', 0, 0, 140, 'small can');
  I('olives', 'Olives', 'olive', 'Canned & dry', 115, 0.8, 6, 3.2, 10.7, 1.4, 0, 1550, 6, 'olives', '', 0, 0, 0, '');
  I('capers', 'Capers', 'capperi', 'Canned & dry', 23, 2.4, 5, 3, 0.9, 0.1, 0.4, 2950, 15, 'olives', '', 0, 0, 0, '');
  I('lemon', 'Lemon', 'limone', 'Produce', 29, 1.1, 9, 2.8, 0.3, 0, 2.5, 2, 2.5, 'lemon', '', 0, 0, 60, 'lemon');
  I('celery', 'Celery', 'sedano', 'Produce', 16, 0.7, 3, 1.6, 0.2, 0, 1.3, 80, 2, 'celery', '', 0, 0, 0, '');
  // ---- Fruit
  I('apple', 'Apple', 'mela', 'Produce', 52, 0.3, 14, 2.4, 0.2, 0, 10, 1, 2.2, 'apple', '', 0, 0, 180, 'apple');
  I('banana', 'Banana', 'banana', 'Produce', 89, 1.1, 23, 2.6, 0.3, 0.1, 12, 1, 1.8, 'banana', '', 0, 0, 120, 'banana');
  I('berries', 'Mixed berries, frozen', 'frutti di bosco surgelati', 'Frozen', 45, 0.7, 10, 3.5, 0.3, 0, 6, 1, 7, 'berries', '', 0, 0, 0, '');
  I('orange', 'Orange', 'arancia', 'Produce', 47, 0.9, 12, 2.4, 0.1, 0, 9, 0, 2, 'orange', '', 0, 0, 150, 'orange');
  I('pear', 'Pear', 'pera', 'Produce', 57, 0.4, 15, 3.1, 0.1, 0, 10, 1, 2.5, 'pear', '', 0, 0, 170, 'pear');
  I('kiwi', 'Kiwi', 'kiwi', 'Produce', 61, 1.1, 15, 3, 0.5, 0, 9, 3, 3, 'kiwi', '', 0, 0, 75, 'kiwi');
  I('strawberries', 'Strawberries', 'fragole', 'Produce', 32, 0.7, 7.7, 2, 0.3, 0, 4.9, 1, 5, 'berries', '', 0, 0, 0, '');
  I('cherries', 'Cherries', 'ciliegie', 'Produce', 63, 1.1, 16, 2.1, 0.2, 0, 12.8, 0, 8, 'cherries', '', 0, 0, 0, '');
  I('peach', 'Peach', 'pesca', 'Produce', 39, 0.9, 9.5, 1.5, 0.3, 0, 8.4, 0, 3, 'peach', '', 0, 0, 150, 'peach');
  I('grapes', 'Grapes', 'uva', 'Produce', 69, 0.7, 18, 0.9, 0.2, 0.1, 15, 2, 3.5, 'grapes', '', 0, 0, 0, '');
  // ---- Nuts, seeds, fats, treats
  I('walnuts', 'Walnuts', 'noci', 'Nuts & seeds', 654, 15, 14, 6.7, 65, 6.1, 2.6, 2, 15, 'walnuts', 'NL', 9, 0, 0, '');
  I('almonds', 'Almonds', 'mandorle', 'Nuts & seeds', 579, 21, 22, 12.5, 50, 3.8, 4.4, 1, 14, 'almonds', 'NL', 0, 0, 0, '');
  I('peanuts', 'Peanuts, unsalted', 'arachidi non salate', 'Nuts & seeds', 567, 26, 16, 8.5, 49, 6.3, 4, 18, 6, 'peanuts', 'N', 0, 0, 0, '');
  I('peanut_butter', 'Peanut butter (100% peanuts)', 'burro di arachidi 100%', 'Nuts & seeds', 588, 25, 20, 6, 50, 10, 6, 17, 8, 'peanuts', 'N', 0, 0, 0, '');
  I('chia', 'Chia seeds', 'semi di chia', 'Nuts & seeds', 486, 17, 42, 34, 31, 3.3, 0, 16, 10, 'seeds', '', 18, 0, 0, '');
  I('flax', 'Ground flaxseed', 'semi di lino macinati', 'Nuts & seeds', 534, 18, 29, 27, 42, 3.7, 1.5, 30, 6, 'seeds', '', 22, 0, 0, '');
  I('pumpkin_seeds', 'Pumpkin seeds', 'semi di zucca', 'Nuts & seeds', 559, 30, 11, 6, 49, 8.7, 1.4, 18, 12, 'seeds', '', 0.1, 0, 0, '');
  I('sunflower_seeds', 'Sunflower seeds', 'semi di girasole', 'Nuts & seeds', 584, 21, 20, 8.6, 51, 4.5, 2.6, 9, 6, 'seeds', 'L', 0, 0, 0, '');
  I('evoo', 'Extra virgin olive oil', "olio extravergine d'oliva", 'Oils & condiments', 884, 0, 0, 0, 100, 14, 0, 2, 9, 'oliveoil', '', 0.7, 0, 0, '');
  I('tahini', 'Tahini', 'tahina', 'Oils & condiments', 595, 17, 21, 9, 54, 7.5, 0.5, 115, 12, 'hummus', 'Z', 0.4, 0, 0, '');
  I('pesto', 'Basil pesto (jar)', 'pesto alla genovese', 'Oils & condiments', 450, 5, 6, 2, 45, 7, 2, 900, 10, 'basil', 'DN', 0, 0, 0, '');
  I('dark_choc', 'Dark chocolate, 70%+', 'cioccolato fondente 70%', 'Canned & dry', 598, 7.8, 46, 11, 43, 24, 24, 20, 15, 'chocolate', '', 0, 0, 0, '');
  // ---- Condiments, herbs, spices
  I('balsamic', 'Balsamic vinegar', 'aceto balsamico', 'Oils & condiments', 88, 0.5, 17, 0, 0, 0, 15, 23, 8, '', '', 0, 0, 0, '');
  I('soy_sauce', 'Soy sauce, reduced salt', 'salsa di soia a ridotto contenuto di sale', 'Oils & condiments', 53, 8, 5, 0.8, 0, 0, 0.4, 3600, 7, 'soy', 'YG', 0, 0, 0, '');
  I('mustard', 'Mustard', 'senape', 'Oils & condiments', 66, 4, 6, 3, 4, 0.2, 1, 1100, 5, 'mustard', '', 0, 0, 0, '');
  I('honey', 'Honey', 'miele', 'Canned & dry', 304, 0.3, 82, 0.2, 0, 0, 82, 4, 10, 'honey', '', 0, 0, 0, '');
  I('cocoa', 'Unsweetened cocoa powder', 'cacao amaro', 'Canned & dry', 228, 20, 58, 33, 14, 8, 1.8, 21, 10, 'chocolate', '', 0, 0, 0, '');
  I('cinnamon', 'Cinnamon', 'cannella', 'Spices', 247, 4, 81, 53, 1.2, 0.3, 2, 10, 20, 'cinnamon', '', 0, 0, 0, '');
  I('curry', 'Curry powder', 'curry in polvere', 'Spices', 325, 14, 58, 53, 14, 2, 3, 52, 20, 'curry', '', 0, 0, 0, '');
  I('chili', 'Chili flakes', 'peperoncino', 'Spices', 318, 12, 57, 35, 17, 3, 10, 30, 20, 'chili', '', 0, 0, 0, '');
  I('paprika', 'Smoked paprika', 'paprika affumicata', 'Spices', 282, 14, 54, 35, 13, 2, 10, 68, 20, '', '', 0, 0, 0, '');
  I('cumin', 'Ground cumin', 'cumino', 'Spices', 375, 18, 44, 11, 22, 1.5, 2, 168, 20, '', '', 0, 0, 0, '');
  I('oregano', 'Dried oregano', 'origano', 'Spices', 265, 9, 69, 42, 4, 1.5, 4, 25, 20, '', '', 0, 0, 0, '');
  I('rosemary', 'Rosemary', 'rosmarino', 'Spices', 131, 3.3, 21, 14, 6, 3, 0, 26, 20, '', '', 0, 0, 0, '');
  I('basil', 'Fresh basil', 'basilico fresco', 'Produce', 23, 3.2, 2.7, 1.6, 0.6, 0, 0.3, 4, 20, 'basil', '', 0, 0, 0, '');
  I('parsley', 'Fresh parsley', 'prezzemolo', 'Produce', 36, 3, 6, 3.3, 0.8, 0.1, 0.9, 56, 15, '', '', 0, 0, 0, '');
  I('mint', 'Fresh mint', 'menta fresca', 'Produce', 44, 3.3, 8, 6.8, 0.7, 0.2, 0, 31, 15, 'mint', '', 0, 0, 0, '');
  I('dill', 'Dill', 'aneto', 'Produce', 43, 3.5, 7, 2.1, 1.1, 0.1, 0, 61, 15, '', '', 0, 0, 0, '');
  I('salt', 'Iodized salt', 'sale iodato', 'Spices', 0, 0, 0, 0, 0, 0, 0, 38758, 1, '', 'I', 0, 0, 0, '');
  I('pepper_black', 'Black pepper', 'pepe nero', 'Spices', 251, 10, 64, 25, 3.3, 1.4, 0.6, 20, 20, '', '', 0, 0, 0, '');
  I('stock', 'Low-salt vegetable stock cube', 'dado vegetale a ridotto contenuto di sale', 'Canned & dry', 150, 8, 20, 0, 5, 2, 5, 12000, 15, '', '', 0, 0, 10, 'cube');
  I('coffee', 'Coffee', 'caffè', 'Canned & dry', 0, 0, 0, 0, 0, 0, 0, 0, 20, 'coffee', '', 0, 0, 0, '');
  I('water', 'Water', 'acqua', 'Oils & condiments', 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', 0, 0, 0, '');
  I('fennel', 'Fennel', 'finocchio', 'Produce', 31, 1.2, 7, 3.1, 0.2, 0, 4, 52, 2.5, 'fennel', '', 0, 0, 300, 'bulb');
  I('radicchio', 'Radicchio', 'radicchio', 'Produce', 23, 1.4, 4.5, 0.9, 0.2, 0, 0.6, 22, 4, 'radicchio', '', 0, 0, 0, '');
  I('seabass', 'Sea bream or sea bass fillet', 'filetto di orata o branzino', 'Meat & fish', 97, 18, 0, 0, 2.5, 0.6, 0, 70, 18, 'seabass', 'FIL', 0.6, 2, 180, 'fillet');
  I('polenta', 'Instant polenta', 'polenta istantanea', 'Bakery & grains', 358, 8, 76, 4, 1.5, 0.3, 0.6, 5, 2.5, 'polenta', '', 0, 0, 0, '');
  I('sage', 'Sage', 'salvia', 'Spices', 315, 11, 61, 40, 13, 7, 1.7, 11, 20, '', '', 0, 0, 0, '');

  // Liquids shown in ml rather than g.
  CT.LIQUID = new Set(['milk_skim', 'water', 'passata', 'evoo', 'soy_sauce', 'balsamic']);
  // Pantry staples: bought rarely, listed separately on the shopping list.
  CT.PANTRY = new Set(['salt', 'pepper_black', 'evoo', 'balsamic', 'soy_sauce', 'mustard', 'honey', 'cocoa', 'cinnamon', 'curry', 'chili', 'paprika', 'cumin', 'oregano', 'rosemary', 'stock', 'coffee', 'water']);
  CT.AISLES = ['Produce', 'Bakery & grains', 'Canned & dry', 'Dairy & eggs', 'Meat & fish', 'Frozen', 'Nuts & seeds', 'Oils & condiments', 'Spices'];
})();
