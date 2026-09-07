/* Italian classics, cooked the lazy way. Portions here run a little larger than the rest of the
   library on purpose: these are the plates that carry a day when breakfast is skipped. */
CT.RECIPES = CT.RECIPES || [];
CT.RECIPES.push(
  {
    id: 'pasta_fagioli', name: 'Pasta e fagioli', it: 'Pasta e fagioli', slots: ['L', 'D'], time: 25, active: 10, tags: ['italian', 'one-pot', 'batch', 'comfort'], needs: ['stove'],
    ing: [['pasta_small', 70], ['borlotti', 200, '¾ can, rinsed'], ['passata', 120], ['onion', 40, '½ small onion'], ['carrot', 50, '1 small carrot'], ['celery', 30, '1 stick', 1], ['garlic', 3, '1 clove', 1], ['rosemary', 1, '1 sprig'], ['evoo', 12, '1 heaped tbsp'], ['parm', 8, '1½ tsp', 1], ['water', 300]],
    steps: ['Chop onion, carrot and celery small and soften in the oil with the rosemary, 5 min.', 'Add passata, beans and water. Simmer 8 min, then mash a ladleful of beans to thicken it.', 'Add the pasta and cook until done, about 8 min, stirring so it does not stick. Parmigiano and pepper on top.'],
    note: 'The cheapest plate in the app and one of the best for cholesterol: beans and wholegrain pasta together.'
  },
  {
    id: 'aglio_olio_broccoli', name: 'Spaghetti aglio, olio e peperoncino with broccoli', it: 'Spaghetti aglio, olio e peperoncino con broccoli', slots: ['L', 'D'], time: 15, active: 8, tags: ['italian', 'pasta', 'one-pot', 'veg'], needs: ['stove'],
    ing: [['pasta_ww', 90], ['broccoli', 200, '½ head'], ['garlic', 6, '2 cloves'], ['chili', 1, 'a good pinch'], ['evoo', 15, '1½ tbsp'], ['parm', 8, '1½ tsp', 1], ['parsley', 5, 'a small bunch', 1]],
    steps: ['Boil the pasta; drop the broccoli florets into the same water for the last 5 minutes.', 'Meanwhile warm the oil gently with sliced garlic and chili. Do not let the garlic brown.', 'Drain, keeping a cup of the water. Toss everything in the pan with a splash of it until glossy.'],
    note: 'Four ingredients, fifteen minutes, and the broccoli cooks in the pasta water so there is one pot.'
  },
  {
    id: 'insalata_riso', name: 'Rice salad with tuna, corn & mozzarella', it: 'Insalata di riso', slots: ['L', 'D'], time: 10, active: 10, tags: ['italian', 'nocook', 'salad', 'batch'], needs: [],
    ing: [['rice_brown', 200, '1½ pouch portions'], ['tuna', 80, '1½ small cans, drained'], ['corn', 60, '3 tbsp'], ['cherry_tom', 100, '6 cherry tomatoes'], ['mozz_light', 60, '½ ball'], ['olives', 20, '8 olives'], ['evoo', 10, '1 tbsp'], ['basil', 5, 'a few leaves', 1]],
    steps: ['Heat the rice for a minute, or use it cold straight from the pouch.', 'Dice the mozzarella and tomatoes, drain the tuna and corn.', 'Mix everything with the oil, salt and pepper. Better after an hour in the fridge, and it keeps two days.'],
    note: 'The Italian summer lunchbox. Make a double batch and tomorrow is handled.'
  },
  {
    id: 'panzanella', name: 'Panzanella with tuna', it: 'Panzanella con tonno', slots: ['L'], time: 12, active: 12, tags: ['italian', 'nocook', 'salad'], needs: [],
    ing: [['bread_ww', 90, '3 slices, stale is ideal'], ['tomato', 250, '2 large tomatoes'], ['cucumber', 100, '⅓ cucumber'], ['onion', 30, '¼ red onion', 1], ['tuna', 80, '1½ small cans, drained'], ['basil', 5, 'a handful of leaves'], ['evoo', 15, '1½ tbsp'], ['balsamic', 8, '1½ tsp']],
    steps: ['Tear the bread into chunks and wet it briefly under the tap, then squeeze it dry.', 'Chop tomatoes, cucumber and onion, keeping all the tomato juice.', 'Toss everything with oil, vinegar, basil, salt and pepper. Wait 10 minutes so the bread drinks the juice.'],
    note: 'Tuscan bread salad. It exists precisely to use up bread that has gone hard.'
  },
  {
    id: 'zuppa_ceci_rosmarino', name: 'Chickpea & rosemary soup with crostoni', it: 'Zuppa di ceci e rosmarino', slots: ['L', 'D'], time: 20, active: 8, tags: ['italian', 'soup', 'batch', 'vegan', 'comfort'], needs: ['stove'],
    ing: [['chickpeas', 250, '1 can, rinsed'], ['passata', 100], ['garlic', 3, '1 clove'], ['rosemary', 1, '1 sprig'], ['evoo', 12, '1 heaped tbsp'], ['bread_ww', 60, '2 slices'], ['water', 300], ['chili', 1, 'a pinch', 1]],
    steps: ['Warm the oil with garlic and rosemary for a minute.', 'Add chickpeas, passata and water. Simmer 12 min, then blend half of it so the soup is creamy but still has whole chickpeas.', 'Toast the bread, rub it with garlic, and float it on top with a thread of raw oil.'],
    note: 'Rosemary and chickpeas is the oldest cheap Tuscan supper there is. Freezes well.'
  },
  {
    id: 'pasta_patate', name: 'Pasta e patate', it: 'Pasta e patate', slots: ['L', 'D'], time: 25, active: 10, tags: ['italian', 'one-pot', 'comfort'], needs: ['stove'],
    ing: [['pasta_small', 60], ['potato', 250, '2 potatoes'], ['onion', 40, '½ small onion'], ['passata', 80], ['carrot', 40, '1 small carrot', 1], ['evoo', 12, '1 heaped tbsp'], ['parm', 10, '2 tsp'], ['stock', 5, '½ low-salt cube'], ['rosemary', 1, '1 sprig', 1], ['water', 400]],
    steps: ['Soften the onion and carrot in the oil, 4 min. Add the diced potato and stir for 2 min.', 'Add passata, stock and water. Simmer 10 min until the potato is nearly falling apart.', 'Add the pasta and cook it in the same pot, 8 min. It should end up thick, not soupy. Parmigiano and lots of pepper.'],
    note: 'Naples in a pot. Cheap, filling, and the starch from the potato does the creaminess without cream.'
  },
  {
    id: 'pollo_cacciatora', name: 'Quick chicken cacciatora', it: 'Pollo alla cacciatora veloce', slots: ['D', 'L'], time: 20, active: 12, tags: ['italian', 'one-pan', 'comfort'], needs: ['stove'],
    ing: [['chicken', 160, '1 large breast, in chunks'], ['passata', 200], ['pepper', 100, '⅔ pepper'], ['onion', 50, '½ onion'], ['olives', 20, '8 olives'], ['garlic', 3, '1 clove', 1], ['rosemary', 1, '1 sprig'], ['evoo', 12, '1 heaped tbsp'], ['bread_ww', 60, '2 slices']],
    steps: ['Brown the chicken chunks in the oil on high heat, 4 min, then set aside.', 'Same pan: onion, pepper, garlic and rosemary, 5 min. Add passata and olives, simmer 5 min.', 'Return the chicken and cook 4 more minutes. Bread for the sauce.'],
  },
  {
    id: 'orata_forno', name: 'Baked sea bream with potatoes, olives & lemon', it: 'Orata al forno con patate e olive', slots: ['D'], time: 30, active: 8, tags: ['italian', 'one-pan', 'oven'], needs: ['oven'],
    ing: [['seabass', 180, '1 large fillet'], ['potato', 250, '2 potatoes'], ['cherry_tom', 100, '6 cherry tomatoes'], ['olives', 15, '6 olives'], ['evoo', 12, '1 heaped tbsp'], ['lemon', 20, '½ lemon'], ['rosemary', 1, '1 sprig'], ['garlic', 3, '1 clove', 1]],
    steps: ['Oven to 220 °C. Slice the potatoes thin, toss with half the oil, rosemary and salt, roast 15 min.', 'Lay the fish on top with tomatoes, olives, garlic, the rest of the oil and lemon slices.', 'Back in for 12 min, until the fish flakes. Spoon the pan juices over everything.'],
    note: 'Sunday-looking, Tuesday-easy. White fish twice a week is exactly what the triglycerides want.'
  },
  {
    id: 'caponata_veloce', name: 'Quick caponata with bread & ricotta', it: 'Caponata veloce con pane e ricotta', slots: ['L', 'D'], time: 25, active: 12, tags: ['italian', 'one-pan', 'veg', 'batch'], needs: ['stove'],
    ing: [['eggplant', 250, '1 eggplant'], ['celery', 40, '1 stick'], ['onion', 50, '½ onion'], ['passata', 100], ['olives', 20, '8 olives'], ['capers', 5, '1 tsp', 1], ['balsamic', 8, '1½ tsp'], ['evoo', 15, '1½ tbsp'], ['bread_ww', 70, '2 slices'], ['ricotta_light', 60], ['basil', 3, 'a few leaves', 1]],
    steps: ['Cube the eggplant and cook it in the oil over high heat until browned, 8 min. Add celery and onion, 3 min.', 'Add passata, olives, capers and vinegar. Simmer 6 min until thick and glossy.', 'Serve warm or at room temperature on toasted bread with a spoon of ricotta.'],
    note: 'Sicilian, sweet-and-sour, and better the next day. Make the full pan and eat it twice.'
  },
  {
    id: 'pasta_pesto_fagiolini', name: 'Pasta al pesto with green beans & potato', it: 'Pasta al pesto con fagiolini e patate', slots: ['L', 'D'], time: 20, active: 6, tags: ['italian', 'pasta', 'one-pot', 'veg'], needs: ['stove'],
    ing: [['pasta_ww', 80], ['green_beans', 120, '2 handfuls'], ['potato', 120, '1 small potato'], ['pesto', 25, '1½ tbsp'], ['parm', 5, '1 tsp', 1], ['evoo', 5, '1 tsp']],
    steps: ['Boil the diced potato for 5 min, add the green beans, then the pasta, all in the same pot.', 'Drain when the pasta is done, keeping a little water.', 'Toss off the heat with the pesto loosened with the cooking water. Never heat pesto directly.'],
    note: 'The Ligurian way: the vegetables and the pasta share one pot, and the pesto goes in off the heat.'
  },
  {
    id: 'pomodori_ripieni_tonno', name: 'Tomatoes stuffed with tuna & ricotta, with farro', it: 'Pomodori ripieni di tonno e ricotta', slots: ['L', 'D'], time: 12, active: 12, tags: ['italian', 'nocook', 'salad'], needs: [],
    ing: [['tomato', 300, '3 large tomatoes'], ['tuna', 100, '2 small cans, drained'], ['ricotta_light', 80], ['parm', 8, '1½ tsp'], ['farro_pre', 150, '1 pouch portion'], ['basil', 5, 'a few leaves'], ['evoo', 8, '2 tsp'], ['lemon', 10, 'a squeeze', 1]],
    steps: ['Cut the tops off the tomatoes and scoop them out. Salt the insides and turn them upside down for 5 min.', 'Mash tuna, ricotta, parmigiano, basil, pepper and the chopped tomato flesh together.', 'Fill the tomatoes, drizzle with oil, and serve on the farro.'],
  },
  {
    id: 'fagioli_uccelletto', name: 'Beans all’uccelletto with a garlic crostone', it: 'Fagioli all’uccelletto', slots: ['D', 'L'], time: 15, active: 6, tags: ['italian', 'one-pan', 'vegan', 'comfort'], needs: ['stove'],
    ing: [['cannellini', 250, '1 can, rinsed'], ['passata', 150], ['garlic', 3, '1 clove'], ['sage', 1, '3 leaves'], ['evoo', 12, '1 heaped tbsp'], ['bread_ww', 70, '2 slices'], ['chili', 1, 'a pinch', 1], ['parm', 5, '1 tsp', 1]],
    steps: ['Warm the oil with the garlic and sage for a minute.', 'Add the beans and passata, season, and simmer gently for 10 min so they take on the sauce.', 'Toast the bread, rub it with the garlic clove, pile the beans on top.'],
    note: 'Ten minutes of work for a dish that is mostly soluble fibre. Sage and beans is the whole trick.'
  },
  {
    id: 'risi_bisi', name: 'Risi e bisi (rice and peas)', it: 'Risi e bisi', slots: ['L', 'D'], time: 18, active: 8, tags: ['italian', 'one-pot', 'veg', 'comfort'], needs: ['stove'],
    ing: [['rice_brown', 200, '1½ pouch portions'], ['peas', 200, '2 big handfuls, frozen'], ['onion', 40, '½ small onion'], ['parm', 12, '1 tbsp'], ['evoo', 10, '1 tbsp'], ['stock', 5, '½ low-salt cube'], ['parsley', 5, 'a small bunch', 1], ['water', 250]],
    steps: ['Soften the onion in the oil, 4 min. Add the peas, stock and water, simmer 6 min.', 'Stir in the rice and cook 3 min more, until it is somewhere between a soup and a risotto.', 'Off the heat, beat in the parmigiano and plenty of pepper.'],
    note: 'Venetian. Loose and spoonable, not a dry rice dish.'
  },
  {
    id: 'polpette_ceci', name: 'Baked chickpea polpette with salad', it: 'Polpette di ceci al forno', slots: ['D', 'L'], time: 30, active: 12, tags: ['italian', 'oven', 'batch', 'veg'], needs: ['oven'],
    ing: [['chickpeas', 250, '1 can, rinsed and dried'], ['egg', 55, '1 egg'], ['parm', 15, '1 heaped tbsp'], ['bread_ww', 30, '1 slice, blitzed to crumbs'], ['garlic', 3, '1 clove', 1], ['parsley', 5, 'a small bunch'], ['evoo', 10, '1 tbsp'], ['salad', 80, '3 handfuls'], ['tomato', 100, '1 tomato'], ['lemon', 10, 'a squeeze']],
    steps: ['Oven to 200 °C. Mash the chickpeas roughly with a fork, then mix in egg, parmigiano, crumbs, garlic, parsley, salt and pepper.', 'Roll about ten balls, put them on a lined tray, brush with half the oil. Bake 20 min, turning once.', 'Salad with the rest of the oil and lemon on the side. They keep three days and are good cold.'],
    note: 'Meatballs without the meat, and a third of the saturated fat. Batch them on Sunday.'
  },
  {
    id: 'sgombro_pomodorini', name: 'Mackerel with cherry tomatoes on polenta', it: 'Sgombro con pomodorini su polenta', slots: ['D'], time: 15, active: 10, tags: ['italian', 'one-pan', 'purine-high'], needs: ['stove'],
    ing: [['mackerel', 90, '1 can, drained'], ['cherry_tom', 150, '10 cherry tomatoes'], ['olives', 15, '6 olives'], ['polenta', 60], ['garlic', 3, '1 clove', 1], ['evoo', 10, '1 tbsp'], ['parsley', 5, 'a small bunch', 1], ['water', 300]],
    steps: ['Make the polenta: boiling salted water, rain the polenta in whisking, 3 min for the instant kind.', 'Meanwhile burst the halved tomatoes in the oil with the garlic, 4 min. Add olives and the flaked mackerel, 2 min.', 'Spoon it over the soft polenta with parsley.'],
    note: 'One of the strongest omega-3 plates here. Mackerel is purine-rich, so the planner keeps it to once a week.'
  },
  {
    id: 'finocchi_arance', name: 'Fennel & orange salad with walnuts', it: 'Insalata di finocchi e arance', slots: ['S', 'L'], time: 8, active: 8, tags: ['italian', 'nocook', 'salad', 'vegan'], needs: [],
    ing: [['fennel', 200, '1 bulb'], ['orange', 200, '1 large orange'], ['walnuts', 15, '15 g (4 halves)'], ['olives', 15, '6 olives', 1], ['evoo', 8, '2 tsp'], ['pepper_black', 0.5, 'to taste']],
    steps: ['Slice the fennel as thinly as you can. Peel the orange and cut it into rounds, saving the juice.', 'Toss with the juice, oil, salt and pepper. Walnuts and olives on top.'],
    note: 'Sicilian winter salad. Vitamin C and fennel both help uric acid, and it takes eight minutes.'
  },
  {
    id: 'ricotta_miele_pane', name: 'Bread with ricotta, honey & walnuts', it: 'Pane, ricotta e miele', slots: ['B', 'S'], time: 4, active: 4, tags: ['italian', 'nocook', 'quick5'], needs: [],
    ing: [['bread_ww', 60, '2 slices'], ['ricotta_light', 80], ['honey', 10, '2 tsp'], ['walnuts', 15, '15 g (4 halves)'], ['cinnamon', 1, 'a pinch', 1]],
    steps: ['Toast the bread, spread the ricotta thickly.', 'Honey over the top, walnuts crumbled on, cinnamon if you like.'],
    note: 'What an Italian grandmother gives you instead of a biscuit.'
  }
);
