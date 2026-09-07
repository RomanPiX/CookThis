/* Lunches: mostly no-cook or one-pot, built to replace the daily salame sandwich. */
CT.RECIPES = CT.RECIPES || [];
CT.RECIPES.push(
  {
    id: 'tuna_bean_salad', name: 'Tuna & cannellini salad with red onion, rocket & lemon', it: 'Insalata di tonno e cannellini', slots: ['L', 'D'], time: 10, active: 10, tags: ['nocook', 'salad'], needs: [],
    ing: [['tuna', 100, '2 small cans, drained'], ['cannellini', 150, '½ can, rinsed'], ['onion', 30, '¼ red onion', 1], ['rocket', 40, '2 handfuls'], ['tomato', 100, '1 tomato'], ['evoo', 10, '1 tbsp'], ['lemon', 15, '½ lemon, juice'], ['bread_ww', 50, '1 thick slice']],
    steps: ['Rinse the beans. Slice the onion thinly and the tomato into chunks.', 'Toss everything with oil, lemon, salt and pepper.', 'Serve with the bread.'],
    note: 'The classic Italian tonno e fagioli: fibre from beans, lean protein from tuna, no cured meat in sight.'
  },
  {
    id: 'chickpea_med_salad', name: 'Mediterranean chickpea salad', it: 'Insalata di ceci alla mediterranea', slots: ['L', 'D'], time: 10, active: 10, tags: ['nocook', 'salad'], needs: [],
    ing: [['chickpeas', 200, '¾ can, rinsed'], ['tomato', 120, '1 tomato'], ['cucumber', 100, '⅓ cucumber'], ['onion', 30, '¼ red onion', 1], ['olives', 20, '8 olives'], ['evoo', 10, '1 tbsp'], ['lemon', 15, '½ lemon, juice'], ['parsley', 5, 'a small bunch', 1], ['bread_ww', 50, '1 thick slice']],
    steps: ['Rinse the chickpeas. Dice tomato, cucumber and onion.', 'Mix with olives, oil, lemon, parsley, salt and pepper. Let it sit 5 min if you can.', 'Serve with bread.'],
  },
  {
    id: 'hummus_veg_wrap', name: 'Hummus & crunchy veg wholewheat wrap', it: 'Piadina integrale con hummus e verdure', slots: ['L'], time: 7, active: 7, tags: ['nocook', 'wrap', 'sandwich'], needs: [],
    ing: [['piadina_ww', 70, '1 piadina'], ['hummus', 80, '4 tbsp'], ['carrot', 50, '1 small carrot, grated'], ['cucumber', 80, '⅓ cucumber'], ['rocket', 30, '1 handful'], ['pepper', 60, '½ pepper'], ['lemon', 5, 'a squeeze', 1], ['apple', 180, '1 apple']],
    steps: ['Warm the piadina 20 seconds in a pan or microwave (optional).', 'Spread the hummus, pile on grated carrot, cucumber and pepper strips, rocket, a squeeze of lemon.', 'Roll tightly. Apple for dessert.'],
  },
  {
    id: 'turkey_rocket_sandwich', name: 'The upgraded sandwich: turkey breast, rocket, tomato & mustard', it: 'Panino integrale con fesa di tacchino e rucola', slots: ['L'], time: 5, active: 5, tags: ['nocook', 'quick5', 'sandwich'], needs: [],
    ing: [['bread_ww', 80, '2 large slices'], ['turkey_slices', 60, '3 slices'], ['tomato', 80, '1 small tomato'], ['rocket', 30, '1 handful'], ['mustard', 5, '1 tsp'], ['evoo', 5, '1 tsp'], ['pear', 170, '1 pear']],
    steps: ['Spread mustard on one slice, drizzle oil on the other.', 'Layer turkey, tomato and rocket. Close, press, eat.', 'Pear on the side.'],
    note: 'Turkey breast has about a fifth of the saturated fat of salame. Keep it to a few times a week: it is still a cold cut.'
  },
  {
    id: 'mackerel_toast', name: 'Mackerel on toast with lemon, tomato & rocket', it: 'Sgombro su pane integrale con limone', slots: ['L', 'D'], time: 5, active: 5, tags: ['nocook', 'quick5', 'sandwich', 'purine-high'], needs: [],
    ing: [['mackerel', 90, '1 can, drained'], ['bread_ww', 70, '2 slices'], ['tomato', 100, '1 tomato'], ['rocket', 30, '1 handful'], ['lemon', 15, '½ lemon, juice'], ['cucumber', 100, '⅓ cucumber']],
    steps: ['Toast the bread.', 'Flake the mackerel over, add tomato slices, rocket, lots of lemon and pepper.', 'Cucumber sticks on the side.'],
    note: 'One of the richest omega-3 meals in the app: excellent for triglycerides. Mackerel is purine-rich, so the planner keeps it to about once a week.'
  },
  {
    id: 'lentil_egg_bowl', name: 'Lentil & cherry tomato bowl with a boiled egg', it: 'Lenticchie con pomodorini e uovo sodo', slots: ['L', 'D'], time: 12, active: 6, tags: ['bowl'], needs: ['stove'],
    ing: [['lentils_can', 200, '¾ can, rinsed'], ['cherry_tom', 120, '8 cherry tomatoes'], ['onion', 30, '¼ red onion', 1], ['parsley', 5, 'a small bunch', 1], ['evoo', 10, '1 tbsp'], ['lemon', 15, '½ lemon, juice'], ['egg', 55, '1 egg'], ['bread_ww', 40, '1 slice']],
    steps: ['Boil the egg (8 min), cool under cold water, peel.', 'Rinse the lentils; halve the tomatoes; slice the onion.', 'Toss with oil, lemon, parsley, salt and pepper. Halve the egg on top.'],
  },
  {
    id: 'pasta_tuna_tomato', name: 'Wholewheat pasta with tuna, cherry tomatoes & olives', it: 'Pasta integrale tonno, pomodorini e olive', slots: ['L', 'D'], time: 15, active: 8, tags: ['pasta'], needs: ['stove'],
    ing: [['pasta_ww', 80], ['tuna', 80, '1½ small cans, drained'], ['cherry_tom', 150, '10 cherry tomatoes'], ['olives', 15, '6 olives'], ['garlic', 3, '1 clove', 1], ['evoo', 10, '1 tbsp'], ['chili', 1, 'a pinch', 1], ['parsley', 5, 'a small bunch', 1]],
    steps: ['Boil the pasta in salted water (10 min).', 'Meanwhile warm oil, garlic and chili in a pan; add halved tomatoes and cook 4 min until they burst.', 'Add tuna and olives, then the drained pasta. Toss with parsley.'],
  },
  {
    id: 'pasta_ceci', name: 'Pasta e ceci (pasta with chickpeas & rosemary)', it: 'Pasta e ceci', slots: ['L', 'D'], time: 15, active: 8, tags: ['pasta', 'comfort'], needs: ['stove'],
    ing: [['pasta_ww', 70], ['chickpeas', 150, '½ can, rinsed'], ['garlic', 3, '1 clove', 1], ['passata', 150], ['rosemary', 1, '1 sprig'], ['evoo', 10, '1 tbsp'], ['parm', 5, '1 tsp', 1]],
    steps: ['Boil the pasta (10 min).', 'In a pan warm oil, garlic and rosemary 1 min; add chickpeas and passata, simmer 6 min; mash a few chickpeas to thicken.', 'Toss with the pasta and a ladle of pasta water. Parmigiano on top.'],
  },
  {
    id: 'bresaola_rocket_plate', name: 'Bresaola, rocket & parmigiano plate with lemon', it: 'Bresaola con rucola, grana e limone', slots: ['L'], time: 5, active: 5, tags: ['nocook', 'quick5', 'occasional'], needs: [],
    ing: [['bresaola', 50, '6 slices'], ['rocket', 60, '3 handfuls'], ['parm', 8, 'a few shavings'], ['lemon', 15, '½ lemon, juice'], ['evoo', 8, '2 tsp'], ['bread_ww', 60, '2 slices'], ['cherry_tom', 100, '6 cherry tomatoes']],
    steps: ['Lay the bresaola on a plate, pile rocket and tomatoes on top.', 'Dress with lemon, oil, pepper and the parmigiano shavings.', 'Bread on the side.'],
    note: 'The one cured meat that fits: very lean, but salty. The planner allows it about once a week.'
  },
  {
    id: 'caprese_beans', name: 'Light caprese with cannellini & basil', it: 'Caprese light con cannellini', slots: ['L', 'D'], time: 6, active: 6, tags: ['nocook', 'salad'], needs: [],
    ing: [['mozz_light', 70, '½ ball'], ['tomato', 200, '2 tomatoes'], ['cannellini', 120, '½ can, rinsed'], ['basil', 5, 'a handful of leaves'], ['evoo', 8, '2 tsp'], ['bread_ww', 50, '1 thick slice']],
    steps: ['Slice the tomatoes and mozzarella, rinse the beans.', 'Arrange on a plate, tear the basil over, drizzle oil, salt and pepper.'],
  },
  {
    id: 'couscous_chickpea_salad', name: 'Couscous salad with chickpeas, peppers & lemon', it: 'Cous cous freddo con ceci e peperoni', slots: ['L', 'D'], time: 12, active: 7, tags: ['salad', 'batch'], needs: ['kettle'],
    ing: [['couscous', 70], ['chickpeas', 120, '½ can, rinsed'], ['pepper', 100, '⅔ pepper'], ['cucumber', 80, '⅓ cucumber'], ['tomato', 100, '1 tomato'], ['parsley', 5, 'a small bunch', 1], ['lemon', 15, '½ lemon, juice'], ['evoo', 10, '1 tbsp'], ['cumin', 1, '½ tsp', 1]],
    steps: ['Pour 90 ml of boiling water over the couscous, cover, wait 5 min, fluff with a fork.', 'Dice the vegetables and mix in with chickpeas, oil, lemon, cumin and parsley.', 'Keeps 3 days in the fridge: make a double batch for tomorrow.'],
  },
  {
    id: 'smoked_salmon_sandwich', name: 'Smoked salmon, cucumber & dill wholegrain sandwich', it: 'Panino con salmone affumicato e cetriolo', slots: ['L'], time: 5, active: 5, tags: ['nocook', 'quick5', 'sandwich', 'occasional'], needs: [],
    ing: [['salmon_smoked', 50, '2 slices'], ['bread_ww', 80, '2 large slices'], ['cucumber', 80, '⅓ cucumber'], ['cheese_spread_light', 25, '1 tbsp'], ['lemon', 10, 'a squeeze'], ['dill', 2, 'a few fronds', 1], ['kiwi', 75, '1 kiwi']],
    steps: ['Spread the cheese, lay salmon and cucumber slices, squeeze lemon, add dill and pepper.', 'Close and eat. Kiwi after.'],
    note: 'Smoked salmon is salty, so this is a once-a-week treat. Good omega-3 though.'
  },
  {
    id: 'minestrone_quick', name: '15-minute minestrone with borlotti beans', it: 'Minestrone veloce con borlotti', slots: ['L', 'D'], time: 15, active: 5, tags: ['soup', 'batch', 'comfort'], needs: ['stove'],
    ing: [['veg_mix', 250, '1 big bowl, frozen'], ['borlotti', 150, '½ can, rinsed'], ['pasta_small', 40], ['passata', 100], ['stock', 5, '½ low-salt cube'], ['evoo', 10, '1 tbsp'], ['parm', 5, '1 tsp', 1], ['water', 400]],
    steps: ['Bring water, stock and passata to a boil with the frozen vegetables (5 min).', 'Add pasta and beans, simmer 8 min.', 'Finish with oil, parmigiano and pepper. Makes two portions: fridge the second.'],
  },
  {
    id: 'farro_tuna_salad', name: 'Farro salad with tuna, tomatoes & olives', it: 'Insalata di farro con tonno', slots: ['L', 'D'], time: 8, active: 8, tags: ['nocook', 'salad', 'batch'], needs: [],
    ing: [['farro_pre', 150, '1 pouch portion'], ['tomato', 150, '1 large tomato'], ['cucumber', 80, '⅓ cucumber'], ['tuna', 80, '1½ small cans, drained'], ['olives', 15, '6 olives'], ['evoo', 10, '1 tbsp'], ['basil', 5, 'a few leaves', 1]],
    steps: ['Use precooked farro straight from the pouch (or 1 min in the microwave).', 'Dice the vegetables and mix everything with oil, salt and pepper.'],
  },
  {
    id: 'tuna_corn_pita', name: 'Tuna, corn & rocket pita with yogurt dressing', it: 'Pita con tonno, mais e rucola', slots: ['L'], time: 5, active: 5, tags: ['nocook', 'quick5', 'sandwich'], needs: [],
    ing: [['pita_ww', 60, '1 pita'], ['tuna', 80, '1½ small cans, drained'], ['corn', 50, '3 tbsp'], ['rocket', 30, '1 handful'], ['yogurt_greek', 30, '2 tbsp'], ['lemon', 10, 'a squeeze'], ['orange', 150, '1 orange']],
    steps: ['Mix tuna, corn, yogurt, lemon and pepper.', 'Stuff the pita with rocket and the tuna mix.', 'Orange after.'],
  },
  {
    id: 'tofu_veg_stirfry', name: 'Tofu & vegetable stir-fry with brown rice', it: 'Tofu saltato con verdure e riso integrale', slots: ['L', 'D'], time: 15, active: 12, tags: ['bowl', 'one-pan'], needs: ['stove'],
    ing: [['tofu', 150], ['stirfry_mix', 200, '2 big handfuls, frozen'], ['soy_sauce', 8, '1½ tsp'], ['garlic', 3, '1 clove', 1], ['evoo', 8, '2 tsp'], ['rice_brown', 125, '1 pouch portion'], ['chili', 1, 'a pinch', 1]],
    steps: ['Pat the tofu dry, cube it, brown in the oil on high heat (5 min).', 'Add the frozen vegetables and garlic, stir-fry 5 min.', 'Splash in soy sauce. Heat the rice (microwave 1 min) and serve under it.'],
  },
  {
    id: 'egg_fried_rice', name: 'Egg fried brown rice with peas & spring onion', it: 'Riso integrale saltato con uova e piselli', slots: ['L', 'D'], time: 12, active: 12, tags: ['bowl', 'one-pan', 'eggs'], needs: ['stove'],
    ing: [['rice_brown', 125, '1 pouch portion'], ['egg', 110, '2 eggs'], ['peas', 100, 'a big handful, frozen'], ['spring_onion', 25, '1 spring onion', 1], ['soy_sauce', 8, '1½ tsp'], ['evoo', 8, '2 tsp']],
    steps: ['Heat the oil, add peas and spring onion, 2 min.', 'Add the rice, stir 2 min until hot.', 'Push to one side, pour in the beaten eggs, scramble, then mix through with soy sauce.'],
  },
  {
    id: 'spinach_pear_walnut_salad', name: 'Spinach, pear & walnut salad with cottage cheese', it: 'Insalata di spinaci, pera e noci', slots: ['L'], time: 7, active: 7, tags: ['nocook', 'salad'], needs: [],
    ing: [['spinach', 80, '3 handfuls, fresh'], ['pear', 150, '1 pear'], ['walnuts', 20, '20 g (5 halves)'], ['cottage', 120], ['balsamic', 10, '2 tsp'], ['evoo', 5, '1 tsp'], ['bread_ww', 50, '1 thick slice']],
    steps: ['Slice the pear. Toss spinach, pear and walnuts with balsamic and oil.', 'Spoon the cottage cheese on top; pepper. Bread on the side.'],
  },
  {
    id: 'cannellini_crostini', name: 'Rosemary white-bean crostini with tomato', it: 'Crostini di cannellini al rosmarino', slots: ['L', 'S'], time: 8, active: 8, tags: ['nocook', 'sandwich', 'vegan'], needs: [],
    ing: [['cannellini', 200, '¾ can, rinsed'], ['garlic', 2, '½ clove', 1], ['rosemary', 1, 'a few needles'], ['lemon', 15, '½ lemon, juice'], ['evoo', 10, '1 tbsp'], ['bread_ww', 70, '2 slices'], ['tomato', 100, '1 tomato']],
    steps: ['Mash the beans with a fork with oil, lemon, garlic, chopped rosemary, salt and pepper.', 'Toast the bread, spread the bean mash thickly, top with tomato slices.'],
    note: 'Bean spread does the job of pâté or sottilette: creamy, salty-savoury, and it actually lowers LDL.'
  },
  {
    id: 'turkey_hummus_wrap', name: 'Turkey & hummus wrap', it: 'Piadina con fesa di tacchino e hummus', slots: ['L'], time: 5, active: 5, tags: ['nocook', 'quick5', 'wrap', 'sandwich'], needs: [],
    ing: [['piadina_ww', 70, '1 piadina'], ['turkey_slices', 50, '2-3 slices'], ['hummus', 50, '2½ tbsp'], ['cucumber', 60, '¼ cucumber'], ['tomato', 80, '1 small tomato'], ['lettuce', 30, '2 leaves'], ['apple', 180, '1 apple']],
    steps: ['Spread the hummus on the piadina, layer turkey, lettuce, tomato and cucumber.', 'Roll, halve, eat. Apple after.'],
  },
  {
    id: 'pea_mint_soup', name: 'Pea & mint soup with wholegrain bread', it: 'Zuppa di piselli e menta', slots: ['L', 'D'], time: 12, active: 6, tags: ['soup', 'batch'], needs: ['stove', 'blender'],
    ing: [['peas', 250, '2 big handfuls, frozen'], ['onion', 40, '½ small onion'], ['milk_skim', 100], ['mint', 3, 'a few leaves'], ['evoo', 8, '2 tsp'], ['stock', 5, '½ low-salt cube'], ['water', 250], ['bread_ww', 60, '2 slices']],
    steps: ['Soften the onion in the oil (3 min). Add peas, stock and water, simmer 6 min.', 'Add milk and mint, blend smooth. Season.', 'Serve with toasted bread.'],
  },
  {
    id: 'egg_salad_sandwich', name: 'Lighter egg salad sandwich (yogurt, mustard, celery)', it: 'Panino con insalata di uova leggera', slots: ['L'], time: 12, active: 5, tags: ['sandwich', 'eggs'], needs: ['stove'],
    ing: [['egg', 110, '2 eggs'], ['yogurt_greek', 40, '2 tbsp'], ['mustard', 5, '1 tsp'], ['celery', 30, '1 stick', 1], ['bread_ww', 80, '2 large slices'], ['lettuce', 30, '2 leaves'], ['pepper_black', 0.5, 'to taste']],
    steps: ['Boil the eggs (8 min), cool, peel and chop.', 'Mix with yogurt, mustard, diced celery, salt and pepper.', 'Fill the sandwich with lettuce and the egg salad.'],
  },
  {
    id: 'ricotta_spinach_wrap', name: 'Ricotta, spinach & tomato wrap', it: 'Piadina con ricotta, spinaci e pomodoro', slots: ['L'], time: 5, active: 5, tags: ['nocook', 'quick5', 'wrap'], needs: [],
    ing: [['piadina_ww', 70, '1 piadina'], ['ricotta_light', 80], ['spinach', 60, '2 handfuls, fresh'], ['tomato', 80, '1 small tomato'], ['evoo', 5, '1 tsp'], ['lemon', 5, 'a squeeze', 1], ['pepper_black', 0.5, 'to taste']],
    steps: ['Spread the ricotta on the piadina, season with salt, pepper and lemon.', 'Add spinach leaves and tomato slices, drizzle oil, roll.'],
  },
  {
    id: 'nicoise_weeknight', name: 'Weeknight niçoise: tuna, egg, potatoes & green beans', it: 'Insalata nizzarda del martedì sera', slots: ['L', 'D'], time: 20, active: 8, tags: ['salad'], needs: ['stove'],
    ing: [['tuna', 80, '1½ small cans, drained'], ['potato', 150, '1 potato'], ['green_beans', 150, '2 handfuls'], ['egg', 55, '1 egg'], ['cherry_tom', 100, '6 cherry tomatoes'], ['olives', 10, '4 olives'], ['evoo', 10, '1 tbsp'], ['mustard', 5, '1 tsp'], ['lemon', 10, 'a squeeze']],
    steps: ['Boil cubed potato 10 min; add green beans and the egg for the last 8 min.', 'Whisk oil, mustard, lemon, salt and pepper.', 'Toss everything with tuna, tomatoes and olives; halve the egg on top.'],
  }
);
