/* Breakfasts. ing entries: [ingredientId, grams, displayText?, optional?] */
CT.RECIPES = CT.RECIPES || [];
CT.RECIPES.push(
  {
    id: 'overnight_oats', name: 'Overnight oats with berries & walnuts', it: 'Porridge freddo ai frutti di bosco', slots: ['B'], time: 5, active: 5, tags: ['nocook', 'ahead', 'quick5'], needs: [],
    ing: [['oats', 50, '50 g (5 tbsp)'], ['milk_skim', 150], ['yogurt_greek', 100], ['berries', 80], ['walnuts', 15, '15 g (4 halves)'], ['chia', 8, '1 tbsp'], ['cinnamon', 1, 'a pinch', 1]],
    steps: ['In a jar or bowl, stir together the oats, milk, yogurt, chia and cinnamon.', 'Cover and leave in the fridge overnight (or at least 3 hours).', 'In the morning top with berries (straight from frozen is fine) and walnuts.'],
    note: 'Oats and chia carry soluble fibre that pulls LDL down; walnuts add plant omega-3.'
  },
  {
    id: 'porridge_banana_pb', name: 'Warm porridge with banana & peanut butter', it: 'Porridge caldo banana e arachidi', slots: ['B'], time: 6, active: 6, tags: ['micro', 'comfort'], needs: ['microwave'],
    ing: [['oats', 50, '50 g (5 tbsp)'], ['milk_skim', 200], ['banana', 100, '1 small banana'], ['peanut_butter', 15, '1 tbsp'], ['cinnamon', 1, 'a pinch', 1]],
    steps: ['Mix oats and milk in a deep bowl. Microwave 2 min, stir, microwave 1 more min (3 min total).', 'Slice the banana on top, add the peanut butter and cinnamon.', 'Let it sit 1 min so it thickens.'],
  },
  {
    id: 'yogurt_apple_almond', name: 'Greek yogurt bowl with apple, almonds & flax', it: 'Yogurt greco con mela, mandorle e lino', slots: ['B'], time: 3, active: 3, tags: ['nocook', 'quick5'], needs: [],
    ing: [['yogurt_greek', 200], ['apple', 150, '1 small apple'], ['almonds', 15, '15 g (12 almonds)'], ['flax', 10, '1 tbsp'], ['honey', 5, '1 tsp', 1], ['cinnamon', 1, 'a pinch', 1]],
    steps: ['Dice the apple (skin on) into the yogurt.', 'Top with almonds, ground flaxseed, cinnamon and a small drizzle of honey.'],
  },
  {
    id: 'ricotta_tomato_toast', name: 'Wholegrain toast with light ricotta, tomato & oregano', it: 'Pane integrale con ricotta, pomodoro e origano', slots: ['B', 'L'], time: 5, active: 5, tags: ['nocook', 'quick5', 'sandwich'], needs: [],
    ing: [['bread_ww', 70, '2 slices'], ['ricotta_light', 60], ['tomato', 100, '1 tomato'], ['evoo', 5, '1 tsp'], ['oregano', 1, 'a pinch'], ['kiwi', 75, '1 kiwi']],
    steps: ['Toast the bread.', 'Spread the ricotta, lay sliced tomato on top, drizzle the oil, add oregano and black pepper.', 'Eat the kiwi on the side.'],
    note: 'Same effort as a sottilette sandwich, a fraction of the saturated fat and salt.'
  },
  {
    id: 'avocado_egg_toast', name: 'Avocado toast with a fried egg & chili', it: 'Toast di avocado con uovo e peperoncino', slots: ['B', 'L'], time: 10, active: 10, tags: ['sandwich'], needs: ['stove'],
    ing: [['bread_ww', 70, '2 slices'], ['avocado', 60, '½ avocado'], ['egg', 55, '1 egg'], ['lemon', 10, 'a squeeze'], ['chili', 1, 'a pinch', 1], ['evoo', 3, 'a few drops']],
    steps: ['Toast the bread. Mash the avocado with lemon, salt and pepper and spread it on.', 'Fry the egg in a non-stick pan with a few drops of oil (3 min).', 'Slide the egg on top, add chili flakes.'],
  },
  {
    id: 'scrambled_spinach_toast', name: 'Scrambled eggs with spinach on wholegrain toast', it: 'Uova strapazzate con spinaci', slots: ['B'], time: 10, active: 10, tags: ['eggs'], needs: ['stove'],
    ing: [['egg', 110, '2 eggs'], ['spinach', 80, '2 handfuls'], ['bread_ww', 50, '1 thick slice'], ['evoo', 5, '1 tsp'], ['pepper_black', 0.5, 'to taste']],
    steps: ['Wilt the spinach in a pan with the oil (2 min).', 'Beat the eggs with pepper and a little salt, pour in and stir on low heat until just set (2 min).', 'Pile on the toast.'],
  },
  {
    id: 'pb_banana_toast', name: 'Peanut butter & banana toast', it: 'Toast con burro di arachidi e banana', slots: ['B', 'S'], time: 4, active: 4, tags: ['nocook', 'quick5', 'sandwich'], needs: [],
    ing: [['bread_ww', 70, '2 slices'], ['peanut_butter', 20, '1 heaped tbsp'], ['banana', 100, '1 small banana'], ['cinnamon', 1, 'a pinch', 1]],
    steps: ['Toast the bread, spread the peanut butter.', 'Top with banana slices and cinnamon.'],
  },
  {
    id: 'chia_cocoa_pudding', name: 'Cocoa chia pudding with berries', it: 'Budino di chia al cacao', slots: ['B', 'S'], time: 5, active: 5, tags: ['nocook', 'ahead', 'quick5'], needs: [],
    ing: [['chia', 25, '3 tbsp'], ['milk_skim', 200], ['cocoa', 5, '1 tsp'], ['berries', 80], ['honey', 5, '1 tsp', 1], ['walnuts', 10, '10 g (3 halves)']],
    steps: ['Whisk chia, milk, cocoa and honey in a jar. Wait 5 min, whisk again so it does not clump.', 'Refrigerate overnight (or 2 hours).', 'Top with berries and walnuts.'],
  },
  {
    id: 'lazy_fruit_nuts_yogurt', name: 'The 2-minute breakfast: apple, walnuts & yogurt', it: 'Colazione in 2 minuti: mela, noci e yogurt', slots: ['B'], time: 2, active: 2, tags: ['nocook', 'quick5'], needs: [],
    ing: [['apple', 180, '1 apple'], ['walnuts', 20, '20 g (5 halves)'], ['yogurt_greek', 170, '1 pot']],
    steps: ['Open the yogurt. Grab the apple and a handful of walnuts.', 'That is it. Coffee is allowed (unsweetened).'],
  },
  {
    id: 'berry_oat_smoothie', name: 'Berry, banana & oat smoothie', it: 'Frullato frutti di bosco, banana e avena', slots: ['B', 'S'], time: 5, active: 5, tags: ['nocook', 'quick5'], needs: ['blender'],
    ing: [['banana', 100, '1 small banana'], ['berries', 100], ['oats', 30, '3 tbsp'], ['yogurt_greek', 150], ['milk_skim', 100], ['flax', 10, '1 tbsp']],
    steps: ['Blend everything until smooth (1 min).', 'Too thick? Add a splash of water.'],
  },
  {
    id: 'cottage_cucumber_toast', name: 'Cottage cheese, cucumber & pumpkin-seed toast', it: 'Toast con fiocchi di latte, cetriolo e semi di zucca', slots: ['B', 'L'], time: 5, active: 5, tags: ['nocook', 'quick5', 'sandwich'], needs: [],
    ing: [['bread_ww', 70, '2 slices'], ['cottage', 100], ['cucumber', 80, '⅓ cucumber'], ['pumpkin_seeds', 10, '1 tbsp'], ['pepper_black', 0.5, 'to taste'], ['lemon', 5, 'a squeeze', 1]],
    steps: ['Toast the bread and spread the cottage cheese.', 'Top with thin cucumber slices, seeds, pepper and a squeeze of lemon.'],
  },
  {
    id: 'omelette_tomato_basil', name: 'Tomato & basil omelette with wholegrain bread', it: 'Omelette pomodoro e basilico', slots: ['B', 'D'], time: 10, active: 10, tags: ['eggs'], needs: ['stove'],
    ing: [['egg', 110, '2 eggs'], ['tomato', 100, '1 tomato'], ['basil', 3, 'a few leaves'], ['bread_ww', 50, '1 thick slice'], ['evoo', 5, '1 tsp']],
    steps: ['Beat the eggs with salt and pepper.', 'Heat the oil, pour in the eggs, scatter diced tomato and basil on top (3 min on low).', 'Fold and serve with the bread.'],
  },
  {
    id: 'crackers_ricotta_orange', name: 'Wholegrain crackers with ricotta, honey & walnuts, plus an orange', it: 'Crackers integrali con ricotta, miele e noci', slots: ['B', 'S'], time: 3, active: 3, tags: ['nocook', 'quick5'], needs: [],
    ing: [['crackers_ww', 32, '4 crackers'], ['ricotta_light', 80], ['honey', 8, '1½ tsp'], ['walnuts', 10, '10 g (3 halves)'], ['orange', 150, '1 orange']],
    steps: ['Spread the ricotta on the crackers, drizzle honey, crumble the walnuts over.', 'Peel the orange. Done.'],
  },
  {
    id: 'choc_banana_yogurt', name: 'Chocolate-banana yogurt with peanuts', it: 'Yogurt al cacao con banana e arachidi', slots: ['B', 'S'], time: 3, active: 3, tags: ['nocook', 'quick5'], needs: [],
    ing: [['yogurt_greek', 200], ['banana', 100, '1 small banana'], ['cocoa', 5, '1 tsp'], ['peanuts', 15, '15 g (a small handful)']],
    steps: ['Stir the cocoa into the yogurt until smooth.', 'Add sliced banana and peanuts.'],
    note: 'Tastes like dessert. Cocoa flavanols are kind to blood vessels; no added sugar needed.'
  }
);
