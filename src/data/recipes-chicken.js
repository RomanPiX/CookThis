/* Pan-cooked chicken, one skillet each. Half Italian, half from elsewhere, so a week built mostly
   on chicken still tastes like different meals. Every one pairs the chicken with vegetables, a
   legume or a whole grain, because chicken brings protein but no fibre at all. */
CT.RECIPES = CT.RECIPES || [];
CT.RECIPES.push(
  // ---------- Italian
  {
    id: 'pollo_limone_scaloppine', name: 'Chicken scaloppine al limone with green beans', it: 'Scaloppine di pollo al limone', slots: ['D', 'L'], time: 14, active: 14, tags: ['italian', 'chicken', 'one-pan'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, sliced thin'], ['lemon', 25, '1 lemon'], ['evoo', 10, '1 tbsp'], ['parsley', 5, 'a small bunch', 1], ['green_beans', 180, '2 big handfuls'], ['bread_ww', 50, '1 thick slice'], ['garlic', 3, '1 clove', 1]],
    steps: ['Slice the breast into thin escalopes and pat them dry. Salt and pepper.', 'Hot pan, half the oil, 2 minutes a side. Take them out.', 'Squeeze the lemon into the pan with a splash of water, let it bubble 30 seconds, pour it over the chicken. Green beans boiled or microwaved alongside, dressed with the rest of the oil.'],
    note: 'The lightest way to cook a chicken breast: no flour, no butter, all the flavour from lemon.'
  },
  {
    id: 'straccetti_rucola', name: 'Chicken straccetti with rocket & parmigiano', it: 'Straccetti di pollo con rucola e grana', slots: ['D', 'L'], time: 12, active: 12, tags: ['italian', 'chicken', 'one-pan'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, in strips'], ['rocket', 60, '3 handfuls'], ['parm', 10, 'a few shavings'], ['cherry_tom', 120, '8 cherry tomatoes'], ['evoo', 10, '1 tbsp'], ['lemon', 15, '½ lemon'], ['bread_ww', 60, '2 slices']],
    steps: ['Cut the breast into thin strips. Very hot pan, half the oil, 3 minutes, moving them once.', 'Off the heat, throw the rocket and halved tomatoes straight into the pan so they wilt but stay green.', 'Lemon, the rest of the oil, parmigiano shavings, pepper. Bread on the side.'],
    note: 'Roman trattoria standard, three minutes of cooking.'
  },
  {
    id: 'pollo_pizzaiola', name: 'Chicken alla pizzaiola', it: 'Pollo alla pizzaiola', slots: ['D', 'L'], time: 18, active: 10, tags: ['italian', 'chicken', 'one-pan', 'comfort'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, butterflied'], ['passata', 200], ['mozz_light', 50, '⅖ ball'], ['oregano', 1, 'a good pinch'], ['garlic', 3, '1 clove', 1], ['olives', 15, '6 olives', 1], ['evoo', 10, '1 tbsp'], ['bread_ww', 60, '2 slices']],
    steps: ['Butterfly the breast so it is thin. Brown it 2 minutes a side in the oil with the garlic.', 'Pour in the passata and oregano, season, simmer 6 minutes.', 'Lay the torn mozzarella on top, lid on, 2 minutes until it melts. Bread for the sauce.'],
    note: 'Pizza flavours without the pizza. The mozzarella is the whole treat, so light mozzarella and a small amount of it.'
  },
  {
    id: 'pollo_peperoni', name: 'Chicken with peppers, Roman style', it: 'Pollo con i peperoni', slots: ['D', 'L'], time: 20, active: 12, tags: ['italian', 'chicken', 'one-pan', 'batch'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, in chunks'], ['pepper', 200, '1½ peppers'], ['passata', 120], ['onion', 50, '½ onion'], ['garlic', 3, '1 clove', 1], ['evoo', 12, '1 heaped tbsp'], ['basil', 3, 'a few leaves', 1], ['potato', 150, '1 potato']],
    steps: ['Microwave the diced potato with a splash of water, 6 min, while you cook the rest.', 'Brown the chicken chunks in the oil, 4 min, set aside. Same pan: peppers and onion, 6 min.', 'Passata in, simmer 4 min, return the chicken and the potato, 2 more minutes.'],
  },
  {
    id: 'pollo_funghi', name: 'Chicken with mushrooms & parsley', it: 'Petto di pollo ai funghi', slots: ['D', 'L'], time: 15, active: 15, tags: ['italian', 'chicken', 'one-pan'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, sliced'], ['mushrooms', 200, '8 mushrooms'], ['garlic', 3, '1 clove'], ['parsley', 5, 'a small bunch'], ['evoo', 12, '1 heaped tbsp'], ['farro_pre', 150, '1 pouch portion'], ['lemon', 10, 'a squeeze', 1]],
    steps: ['Slice the mushrooms. Hot pan, half the oil, cook them hard for 5 minutes without stirring much so they brown instead of steaming.', 'Push them aside, add the chicken slices and the garlic, 4 minutes.', 'Parsley, pepper, the rest of the oil. Serve on the warmed farro.'],
  },
  {
    id: 'pollo_balsamico_radicchio', name: 'Balsamic chicken with radicchio', it: 'Pollo al balsamico con radicchio', slots: ['D'], time: 15, active: 15, tags: ['italian', 'chicken', 'one-pan'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, butterflied'], ['radicchio', 150, '1 head'], ['balsamic', 15, '1 tbsp'], ['evoo', 12, '1 heaped tbsp'], ['walnuts', 15, '15 g (4 halves)'], ['bread_ww', 50, '1 thick slice'], ['honey', 5, '1 tsp', 1]],
    steps: ['Cook the butterflied breast in half the oil, 4 minutes a side. Set aside to rest.', 'Same pan: the radicchio cut into wedges, 3 minutes, then the balsamic and a splash of water to make a syrup.', 'Slice the chicken back in, walnuts over the top.'],
    note: 'Bitter radicchio and sweet balsamic. The walnuts are there for the LDL as much as the crunch.'
  },
  {
    id: 'pollo_piselli_umido', name: 'Braised chicken with peas', it: 'Pollo e piselli in umido', slots: ['D', 'L'], time: 22, active: 8, tags: ['italian', 'chicken', 'one-pot', 'comfort', 'batch'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, in chunks'], ['peas', 200, '2 big handfuls, frozen'], ['passata', 150], ['onion', 50, '½ onion'], ['evoo', 12, '1 heaped tbsp'], ['stock', 5, '½ low-salt cube', 1], ['bread_ww', 60, '2 slices'], ['parsley', 5, 'a small bunch', 1]],
    steps: ['Soften the onion in the oil, 4 min. Add the chicken chunks and colour them, 3 min.', 'Passata, peas, a little water and the stock. Lid on, low heat, 12 minutes.', 'Bread to mop it up.'],
    note: 'The pot does the work. Peas bring the fibre the chicken does not have.'
  },
  {
    id: 'polpette_pollo_sugo', name: 'Chicken polpette in tomato sauce', it: 'Polpette di pollo al sugo', slots: ['D', 'L'], time: 25, active: 15, tags: ['italian', 'chicken', 'one-pan', 'batch', 'comfort'], needs: ['stove'],
    ing: [['chicken_mince', 150], ['bread_ww', 30, '1 slice, blitzed to crumbs'], ['egg', 25, '½ egg, beaten'], ['parm', 12, '1 tbsp'], ['parsley', 5, 'a small bunch'], ['passata', 250], ['garlic', 3, '1 clove', 1], ['evoo', 10, '1 tbsp'], ['salad', 60, '2 handfuls']],
    steps: ['Mix the mince with crumbs, egg, parmigiano, parsley, salt and pepper. Roll about eight balls.', 'Brown them in the oil, 4 minutes, turning. Add the passata and garlic.', 'Simmer 12 minutes with the lid ajar. Salad on the side.'],
    note: 'Meatballs with a fifth of the saturated fat of beef ones, and they freeze in their sauce.'
  },
  {
    id: 'pollo_caprese_padella', name: 'Caprese chicken in the pan', it: 'Pollo alla caprese in padella', slots: ['D', 'L'], time: 14, active: 14, tags: ['italian', 'chicken', 'one-pan'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, butterflied'], ['tomato', 150, '1 large tomato'], ['mozz_light', 50, '⅖ ball'], ['basil', 5, 'a handful of leaves'], ['evoo', 10, '1 tbsp'], ['balsamic', 8, '1½ tsp'], ['bread_ww', 60, '2 slices'], ['rocket', 40, '2 handfuls']],
    steps: ['Cook the butterflied breast in the oil, 4 minutes a side, seasoned well.', 'Lay tomato slices and torn mozzarella on top, lid on, 2 minutes to melt.', 'Basil, a thread of balsamic, rocket and bread alongside.'],
  },
  {
    id: 'pollo_diavola_padella', name: 'Chilli chicken alla diavola with cannellini', it: 'Pollo alla diavola con cannellini', slots: ['D'], time: 16, active: 12, tags: ['italian', 'chicken', 'one-pan'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, butterflied'], ['chili', 2, 'a good pinch'], ['lemon', 20, '½ lemon'], ['evoo', 12, '1 heaped tbsp'], ['cannellini', 150, '½ can, rinsed'], ['rocket', 40, '2 handfuls'], ['rosemary', 1, '1 sprig', 1]],
    steps: ['Rub the flattened breast with chili, salt, pepper and half the oil. Leave it 5 minutes if you have them.', 'Very hot pan, 4 minutes a side, until properly charred at the edges.', 'Warm the beans in the same pan with the rest of the oil and the rosemary. Lemon over everything, rocket on top.'],
  },
  {
    id: 'involtini_pollo_zucchine', name: 'Chicken rolls with zucchini & ricotta', it: 'Involtini di pollo con zucchine e ricotta', slots: ['D'], time: 20, active: 15, tags: ['italian', 'chicken', 'one-pan'], needs: ['stove'],
    ing: [['chicken', 150, '2 thin escalopes'], ['zucchini', 150, '1 small zucchini'], ['ricotta_light', 60], ['parm', 8, '1½ tsp'], ['evoo', 10, '1 tbsp'], ['cherry_tom', 120, '8 cherry tomatoes'], ['basil', 3, 'a few leaves', 1], ['bread_ww', 50, '1 thick slice']],
    steps: ['Grate the zucchini and mix it with the ricotta, parmigiano, salt and pepper.', 'Spread it on the flattened escalopes, roll them up, hold with a toothpick.', 'Pan with the oil, 8 minutes turning, adding the halved tomatoes for the last 3.'],
  },
  // ---------- From elsewhere
  {
    id: 'chicken_paprika_yogurt', name: 'Paprika chicken with yogurt sauce & rice', it: 'Pollo alla paprika con salsa allo yogurt', slots: ['D', 'L'], time: 16, active: 12, tags: ['chicken', 'one-pan'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, in strips'], ['pepper', 120, '1 pepper'], ['onion', 50, '½ onion'], ['paprika', 3, '1½ tsp'], ['yogurt_greek', 60, '4 tbsp'], ['evoo', 10, '1 tbsp'], ['rice_brown', 125, '1 pouch portion'], ['parsley', 5, 'a small bunch', 1]],
    steps: ['Fry pepper and onion in the oil, 5 min. Add the chicken strips and the paprika, 5 min.', 'Take the pan off the heat before stirring the yogurt in, or it will split.', 'Serve on the heated rice.'],
    note: 'Yogurt instead of soured cream: the same tang, a fraction of the saturated fat.'
  },
  {
    id: 'chicken_teriyaki_rice', name: 'Ginger, soy & honey chicken with broccoli', it: 'Pollo allo zenzero, soia e miele con broccoli', slots: ['D', 'L'], time: 16, active: 14, tags: ['chicken', 'one-pan', 'bowl'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, in strips'], ['broccoli', 180, '½ head'], ['soy_sauce', 10, '2 tsp'], ['honey', 8, '1½ tsp'], ['ginger', 8, 'a thumb, grated'], ['garlic', 3, '1 clove', 1], ['evoo', 8, '2 tsp'], ['rice_brown', 125, '1 pouch portion'], ['chili', 1, 'a pinch', 1]],
    steps: ['Brown the chicken strips hard in the oil, 4 min. Add ginger and garlic, 1 min.', 'Broccoli florets and 3 tbsp water, lid on, 4 min.', 'Soy and honey in, let it glaze for a minute. Rice underneath.'],
    note: 'The soy makes this the saltiest chicken plate here, so it stays a once-a-week option.'
  },
  {
    id: 'chicken_fajita_pan', name: 'Chicken fajita pan with beans', it: 'Pollo alla messicana con fagioli', slots: ['D', 'L'], time: 16, active: 14, tags: ['chicken', 'one-pan'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, in strips'], ['pepper', 150, '1 pepper'], ['onion', 60, '½ onion'], ['borlotti', 150, '½ can, rinsed'], ['cumin', 2, '1 tsp'], ['paprika', 2, '1 tsp'], ['evoo', 10, '1 tbsp'], ['yogurt_greek', 40, '2 tbsp'], ['lemon', 15, '½ lemon'], ['piadina_ww', 70, '1 piadina']],
    steps: ['Peppers and onion in the hot oil, 5 min. Chicken and spices, 5 min.', 'Beans in for the last 2 minutes, just to warm through.', 'Lemon over, yogurt on top, scooped up with the warmed piadina.'],
  },
  {
    id: 'chicken_tikka_pan', name: 'Yogurt-marinated spiced chicken with cucumber salad', it: 'Pollo speziato marinato nello yogurt', slots: ['D', 'L'], time: 15, active: 12, tags: ['chicken', 'one-pan'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, cubed'], ['yogurt_greek', 80, '5 tbsp'], ['curry', 4, '2 tsp'], ['garlic', 3, '1 clove'], ['lemon', 20, '½ lemon'], ['cucumber', 120, '½ cucumber'], ['tomato', 100, '1 tomato'], ['evoo', 8, '2 tsp'], ['rice_brown', 125, '1 pouch portion'], ['mint', 3, 'a few leaves', 1]],
    steps: ['Toss the cubes with half the yogurt, the curry powder, garlic, salt and lemon. Ten minutes if you have them, none if you do not.', 'Very hot pan with the oil, 6 minutes, letting the edges catch.', 'Chop cucumber and tomato, dress with the rest of the yogurt and the mint. Rice alongside.'],
  },
  {
    id: 'chicken_mustard_mushrooms', name: 'Mustard chicken with mushrooms & lentils', it: 'Pollo alla senape con funghi e lenticchie', slots: ['D', 'L'], time: 16, active: 14, tags: ['chicken', 'one-pan'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, sliced'], ['mushrooms', 150, '6 mushrooms'], ['mustard', 10, '2 tsp'], ['yogurt_greek', 50, '3 tbsp'], ['lentils_can', 150, '½ can, rinsed'], ['evoo', 10, '1 tbsp'], ['parsley', 5, 'a small bunch', 1], ['spinach', 60, '2 handfuls', 1]],
    steps: ['Brown the mushrooms in the oil, 5 min, then the chicken slices, 4 min.', 'Off the heat, stir in the mustard and yogurt with a splash of water to make a sauce.', 'Warm the lentils through with the spinach. Parsley over the top.'],
    note: 'Lentils under the chicken take this to nearly 15 g of fibre, which a chicken plate almost never manages.'
  },
  {
    id: 'chicken_peanut_pan', name: 'Peanut chicken with crunchy vegetables', it: 'Pollo alle arachidi con verdure croccanti', slots: ['D', 'L'], time: 15, active: 13, tags: ['chicken', 'one-pan', 'bowl'], needs: ['stove'],
    ing: [['chicken', 140, '1 breast, in strips'], ['stirfry_mix', 200, '2 big handfuls, frozen'], ['peanut_butter', 20, '1 heaped tbsp'], ['soy_sauce', 8, '1½ tsp'], ['lemon', 15, '½ lemon'], ['ginger', 6, 'a small thumb, grated', 1], ['chili', 1, 'a pinch', 1], ['evoo', 6, '1½ tsp'], ['rice_brown', 125, '1 pouch portion']],
    steps: ['Brown the chicken in the oil, 4 min. Add the frozen vegetables and ginger, 5 min on high.', 'Whisk the peanut butter with the soy, lemon and 3 tbsp hot water, pour it in, 1 minute.', 'Rice underneath.'],
  },
  {
    id: 'chicken_burger_padella', name: 'Chicken patties with tomato salad', it: 'Burger di pollo in padella con insalata', slots: ['D', 'L'], time: 18, active: 14, tags: ['chicken', 'one-pan', 'batch'], needs: ['stove'],
    ing: [['chicken_mince', 150], ['bread_ww', 30, '1 slice, blitzed to crumbs'], ['parm', 10, '2 tsp'], ['oregano', 1, 'a pinch'], ['egg', 25, '½ egg, beaten'], ['evoo', 10, '1 tbsp'], ['tomato', 150, '1 large tomato'], ['salad', 60, '2 handfuls'], ['cannellini', 120, '½ can, rinsed'], ['lemon', 10, 'a squeeze']],
    steps: ['Mix mince, crumbs, parmigiano, oregano, egg, salt and pepper. Shape two flat patties.', 'Medium heat with the oil, 5 minutes a side. Flat and patient beats hot and fast here.', 'Tomato, salad and beans dressed with lemon on the side.'],
  },
  {
    id: 'chicken_lemon_garlic_beans', name: 'Garlic chicken with green beans & almonds', it: 'Pollo all’aglio con fagiolini e mandorle', slots: ['D', 'L'], time: 14, active: 14, tags: ['chicken', 'one-pan'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast, sliced'], ['green_beans', 200, '2 big handfuls'], ['garlic', 6, '2 cloves'], ['almonds', 15, '15 g, chopped'], ['lemon', 20, '½ lemon'], ['evoo', 12, '1 heaped tbsp'], ['potato', 150, '1 potato'], ['chili', 1, 'a pinch', 1]],
    steps: ['Microwave the diced potato with a splash of water, 6 min.', 'Toast the almonds dry in the pan, 1 min, tip them out. Oil in, chicken 4 min, garlic and green beans 4 min with a splash of water and a lid.', 'Potato in to warm, lemon over, almonds back on top.'],
  }
);
