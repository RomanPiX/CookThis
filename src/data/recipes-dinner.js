/* Dinners: one pan, one tray or one pot. Active time is what matters to a lazy cook. */
CT.RECIPES = CT.RECIPES || [];
CT.RECIPES.push(
  {
    id: 'salmon_tray_veg', name: 'Tray-baked salmon with potatoes, zucchini & cherry tomatoes', it: 'Salmone al forno con patate e verdure', slots: ['D'], time: 25, active: 8, tags: ['one-pan', 'oven'], needs: ['oven'],
    ing: [['salmon', 130, '1 fillet'], ['potato', 150, '1 potato'], ['zucchini', 150, '1 small zucchini'], ['cherry_tom', 100, '6 cherry tomatoes'], ['evoo', 10, '1 tbsp'], ['lemon', 20, '½ lemon'], ['rosemary', 1, '1 sprig', 1]],
    steps: ['Oven to 220 °C. Cube the potato small, slice the zucchini; toss with oil, salt, rosemary on a tray. Roast 12 min.', 'Add the salmon and tomatoes, squeeze lemon over. Back in for 10 min.', 'Eat from the tray if nobody is watching.'],
    note: 'Salmon twice a week is the single most useful move against high triglycerides.'
  },
  {
    id: 'lemon_chicken_beans', name: 'Lemon chicken with rocket & white beans', it: 'Pollo al limone con rucola e cannellini', slots: ['D', 'L'], time: 15, active: 12, tags: ['one-pan'], needs: ['stove'],
    ing: [['chicken', 150, '1 breast'], ['cannellini', 100, '⅖ can, rinsed'], ['rocket', 50, '2 handfuls'], ['cherry_tom', 100, '6 cherry tomatoes'], ['lemon', 20, '½ lemon'], ['evoo', 10, '1 tbsp'], ['bread_ww', 50, '1 thick slice']],
    steps: ['Butterfly the chicken breast so it is thin. Salt, pepper, a little oil.', 'Pan on high: 4 min per side. Rest 2 min, slice.', 'Toss rocket, tomatoes and beans with the rest of the oil and lemon; chicken on top, bread on the side.'],
  },
  {
    id: 'chicken_stirfry_rice', name: 'Chicken & vegetable stir-fry with brown rice', it: 'Pollo saltato con verdure e riso integrale', slots: ['D', 'L'], time: 15, active: 15, tags: ['one-pan', 'bowl'], needs: ['stove'],
    ing: [['chicken', 130, '1 small breast, sliced'], ['stirfry_mix', 250, '3 handfuls, frozen'], ['garlic', 3, '1 clove', 1], ['soy_sauce', 8, '1½ tsp'], ['evoo', 8, '2 tsp'], ['rice_brown', 125, '1 pouch portion'], ['chili', 1, 'a pinch', 1]],
    steps: ['Slice the chicken thin. Brown in oil on high heat, 4 min.', 'Add the frozen vegetables and garlic, stir-fry 6 min.', 'Soy sauce in, rice heated (1 min microwave), serve.'],
  },
  {
    id: 'red_lentil_soup', name: 'Red lentil soup with cumin & lemon', it: 'Zuppa di lenticchie rosse al cumino', slots: ['D', 'L'], time: 20, active: 6, tags: ['soup', 'batch', 'vegan', 'comfort'], needs: ['stove'],
    ing: [['lentils_red', 70], ['onion', 50, '½ onion'], ['carrot', 80, '1 carrot'], ['garlic', 3, '1 clove', 1], ['passata', 100], ['cumin', 2, '1 tsp'], ['evoo', 10, '1 tbsp'], ['lemon', 15, '½ lemon, juice'], ['water', 450], ['bread_ww', 50, '1 thick slice']],
    steps: ['Soften diced onion, carrot and garlic in the oil (4 min). Add cumin.', 'Add lentils, passata and water. Simmer 15 min until soft.', 'Squeeze in lemon, season. Blend if you like it smooth. Makes 2 portions.'],
    note: 'Red lentils need no soaking and cook in 15 minutes. Lentils are the cheapest LDL-lowering food there is.'
  },
  {
    id: 'cod_livornese', name: 'Cod in tomato sauce with olives & capers (alla livornese)', it: 'Merluzzo alla livornese', slots: ['D'], time: 15, active: 8, tags: ['one-pan'], needs: ['stove'],
    ing: [['cod', 180, '2 frozen fillets'], ['passata', 200], ['garlic', 3, '1 clove', 1], ['olives', 15, '6 olives'], ['capers', 5, '1 tsp', 1], ['evoo', 10, '1 tbsp'], ['parsley', 5, 'a small bunch', 1], ['green_beans', 150, '2 handfuls'], ['bread_ww', 50, '1 thick slice']],
    steps: ['Warm oil and garlic, add passata, olives and capers, simmer 3 min.', 'Lay the frozen fillets in the sauce, cover, cook 10 min (turn once).', 'Microwave the green beans (4 min) meanwhile. Parsley over everything; bread for the sauce.'],
  },
  {
    id: 'frittata_zucchini', name: 'Zucchini & onion frittata with a side salad', it: 'Frittata di zucchine', slots: ['D', 'L'], time: 15, active: 10, tags: ['one-pan', 'eggs'], needs: ['stove'],
    ing: [['egg', 110, '2 eggs'], ['zucchini', 150, '1 small zucchini'], ['onion', 40, '½ small onion', 1], ['parm', 8, '1½ tsp'], ['evoo', 8, '2 tsp'], ['bread_ww', 50, '1 thick slice'], ['salad', 60, '2 handfuls']],
    steps: ['Grate or thinly slice the zucchini; soften with the onion in oil (5 min).', 'Beat eggs with parmigiano, pepper and a little salt; pour over. Low heat, lid on, 5 min.', 'Flip or fold. Salad and bread on the side.'],
  },
  {
    id: 'pasta_broccoli_almonds', name: 'Wholewheat pasta with broccoli, garlic, chili & toasted almonds', it: 'Pasta integrale con broccoli e mandorle', slots: ['D', 'L'], time: 15, active: 8, tags: ['pasta', 'one-pot', 'veg'], needs: ['stove'],
    ing: [['pasta_ww', 80], ['broccoli', 200, '½ head'], ['garlic', 3, '1 clove'], ['chili', 1, 'a pinch', 1], ['evoo', 12, '1 heaped tbsp'], ['almonds', 10, '10 g, chopped'], ['parm', 5, '1 tsp', 1]],
    steps: ['Boil the pasta; drop the broccoli florets in the same pot for the last 5 min.', 'Meanwhile warm oil, sliced garlic and chili in a pan; toast the almonds in it 1 min.', 'Drain, toss pasta and broccoli in the pan, crushing the broccoli a bit. Parmigiano.'],
  },
  {
    id: 'pasta_pomodoro_cannellini', name: 'Wholewheat pasta al pomodoro with cannellini & basil', it: 'Pasta integrale al pomodoro con cannellini', slots: ['D', 'L'], time: 15, active: 6, tags: ['pasta', 'comfort', 'veg'], needs: ['stove'],
    ing: [['pasta_ww', 80], ['passata', 200], ['cannellini', 100, '⅖ can, rinsed'], ['garlic', 3, '1 clove', 1], ['basil', 5, 'a handful of leaves'], ['evoo', 10, '1 tbsp'], ['parm', 5, '1 tsp', 1]],
    steps: ['Boil the pasta (10 min).', 'Warm oil and garlic, add passata, simmer 6 min; stir in the beans.', 'Toss with the pasta, tear basil over, parmigiano.'],
    note: 'Beans in the sauce: extra fibre and protein, and you barely notice them.'
  },
  {
    id: 'shrimp_zucchini_couscous', name: 'Garlic shrimp with zucchini, cherry tomatoes & couscous', it: 'Gamberetti con zucchine e cous cous', slots: ['D'], time: 15, active: 12, tags: ['one-pan', 'purine-high'], needs: ['stove'],
    ing: [['shrimp', 150, '2 handfuls, frozen'], ['zucchini', 150, '1 small zucchini'], ['cherry_tom', 120, '8 cherry tomatoes'], ['garlic', 3, '1 clove'], ['evoo', 10, '1 tbsp'], ['couscous', 60], ['parsley', 5, 'a small bunch', 1], ['lemon', 15, '½ lemon, juice']],
    steps: ['Pour 80 ml boiling water on the couscous, cover.', 'Sauté diced zucchini in oil 4 min, add garlic and halved tomatoes 2 min, then the shrimp 3 min until pink.', 'Lemon, parsley, and serve on the fluffed couscous.'],
    note: 'Shrimp are purine-rich, so this appears at most once a week while uric acid is above range.'
  },
  {
    id: 'chicken_bean_chili', name: 'Quick chicken & borlotti chili', it: 'Chili veloce di pollo e borlotti', slots: ['D'], time: 20, active: 10, tags: ['one-pot', 'batch', 'comfort'], needs: ['stove'],
    ing: [['chicken', 130, '1 small breast, diced'], ['borlotti', 150, '½ can, rinsed'], ['passata', 200], ['pepper', 100, '⅔ pepper'], ['onion', 50, '½ onion'], ['cumin', 2, '1 tsp'], ['paprika', 2, '1 tsp'], ['evoo', 8, '2 tsp'], ['yogurt_greek', 30, '2 tbsp'], ['bread_ww', 40, '1 slice']],
    steps: ['Soften onion and pepper in the oil (4 min). Add chicken, cumin, paprika; 3 min.', 'Add passata and beans; simmer 10 min.', 'Top with yogurt. Doubles well: freeze the second portion.'],
  },
  {
    id: 'sheetpan_chicken_veg', name: 'Sheet-pan paprika chicken with potatoes, peppers & zucchini', it: 'Pollo e verdure al forno in teglia', slots: ['D'], time: 30, active: 8, tags: ['one-pan', 'oven', 'batch'], needs: ['oven'],
    ing: [['chicken', 150, '1 breast'], ['potato', 200, '1 large potato'], ['pepper', 100, '⅔ pepper'], ['zucchini', 150, '1 small zucchini'], ['onion', 50, '½ onion', 1], ['evoo', 12, '1 heaped tbsp'], ['paprika', 2, '1 tsp'], ['rosemary', 1, '1 sprig', 1]],
    steps: ['Oven to 220 °C. Cut everything into chunks, toss with oil, paprika, rosemary, salt.', 'Spread on a tray, chicken in the middle. Roast 22 min.', 'Triple the tray on Sunday and you have three dinners.'],
  },
  {
    id: 'baked_cod_potato_tomato', name: 'Baked cod with potatoes, cherry tomatoes & oregano', it: 'Merluzzo al forno con patate e pomodorini', slots: ['D'], time: 25, active: 6, tags: ['one-pan', 'oven'], needs: ['oven'],
    ing: [['cod', 180, '2 frozen fillets, thawed'], ['potato', 200, '1 large potato'], ['cherry_tom', 150, '10 cherry tomatoes'], ['olives', 10, '4 olives'], ['evoo', 10, '1 tbsp'], ['oregano', 1, 'a pinch'], ['garlic', 3, '1 clove', 1], ['salad', 60, '2 handfuls']],
    steps: ['Oven to 220 °C. Slice potato thin, toss with half the oil and salt, roast 12 min.', 'Add cod, tomatoes, olives, garlic, oregano and the rest of the oil. 12 more min.', 'Side salad.'],
  },
  {
    id: 'chickpea_spinach_curry', name: 'Chickpea & spinach curry with brown rice', it: 'Curry di ceci e spinaci con riso integrale', slots: ['D', 'L'], time: 15, active: 8, tags: ['one-pot', 'batch', 'veg', 'comfort'], needs: ['stove'],
    ing: [['chickpeas', 150, '½ can, rinsed'], ['spinach', 150, '3 handfuls (frozen is fine)'], ['passata', 150], ['onion', 50, '½ onion'], ['garlic', 3, '1 clove', 1], ['curry', 4, '2 tsp'], ['evoo', 10, '1 tbsp'], ['yogurt_greek', 50, '3 tbsp'], ['rice_brown', 100, '⅘ pouch portion']],
    steps: ['Soften onion and garlic in oil (3 min), add curry powder, 30 seconds.', 'Add passata, chickpeas and spinach; simmer 8 min.', 'Heat the rice (1 min microwave). Spoon curry over, yogurt on top.'],
  },
  {
    id: 'eggs_purgatory', name: 'Eggs in purgatory with white beans & bread', it: 'Uova in purgatorio con cannellini', slots: ['D'], time: 12, active: 6, tags: ['one-pan', 'eggs', 'comfort'], needs: ['stove'],
    ing: [['egg', 110, '2 eggs'], ['passata', 250], ['cannellini', 100, '⅖ can, rinsed'], ['garlic', 3, '1 clove', 1], ['chili', 1, 'a pinch', 1], ['evoo', 8, '2 tsp'], ['bread_ww', 60, '2 slices']],
    steps: ['Warm oil, garlic, chili; add passata and beans, simmer 4 min, season.', 'Make two dents, crack the eggs in, lid on, 5 min until the whites set.', 'Dunk toasted bread.'],
  },
  {
    id: 'mackerel_potato_warm_salad', name: 'Warm mackerel, potato & green bean salad with mustard', it: 'Insalata tiepida di sgombro, patate e fagiolini', slots: ['D', 'L'], time: 15, active: 5, tags: ['salad', 'purine-high'], needs: ['stove'],
    ing: [['mackerel', 90, '1 can, drained'], ['potato', 200, '1 large potato'], ['green_beans', 150, '2 handfuls'], ['onion', 30, '¼ red onion', 1], ['evoo', 8, '2 tsp'], ['lemon', 15, '½ lemon, juice'], ['mustard', 5, '1 tsp']],
    steps: ['Boil cubed potato 10 min, adding the green beans for the last 5.', 'Whisk oil, lemon, mustard, pepper.', 'Toss warm vegetables with the dressing and onion; flake mackerel on top.'],
  },
  {
    id: 'turkey_lemon_peas', name: 'Turkey steaks with lemon & garlicky peas', it: 'Fettine di tacchino al limone con piselli', slots: ['D'], time: 12, active: 12, tags: ['one-pan'], needs: ['stove'],
    ing: [['turkey_steak', 150, '2 thin steaks'], ['peas', 150, 'a big handful, frozen'], ['lemon', 20, '½ lemon'], ['evoo', 8, '2 tsp'], ['garlic', 3, '1 clove', 1], ['bread_ww', 60, '2 slices']],
    steps: ['Cook the peas with garlic and a splash of water in a covered pan (5 min).', 'Push aside; sear the turkey steaks 2-3 min per side with the oil. Salt, pepper, lemon juice.', 'Bread to mop up.'],
  },
  {
    id: 'pasta_zucchini_pea_ricotta', name: 'Wholewheat pasta with zucchini, peas, lemon & light ricotta', it: 'Pasta integrale zucchine, piselli e ricotta', slots: ['D', 'L'], time: 15, active: 8, tags: ['pasta', 'veg'], needs: ['stove'],
    ing: [['pasta_ww', 80], ['zucchini', 150, '1 small zucchini'], ['peas', 80, 'a handful, frozen'], ['ricotta_light', 60], ['lemon', 15, '½ lemon, zest and juice'], ['mint', 3, 'a few leaves', 1], ['evoo', 8, '2 tsp'], ['parm', 5, '1 tsp', 1]],
    steps: ['Boil the pasta; add peas for the last 3 min.', 'Sauté diced zucchini in oil 6 min.', 'Drain, toss with zucchini, ricotta, lemon zest and juice, mint, a splash of pasta water. Parmigiano.'],
  },
  {
    id: 'chicken_avocado_salad', name: 'Big chicken salad with avocado & pumpkin seeds', it: 'Insalatona di pollo con avocado', slots: ['D', 'L'], time: 15, active: 12, tags: ['salad'], needs: ['stove'],
    ing: [['chicken', 130, '1 small breast'], ['salad', 100, '4 handfuls'], ['avocado', 60, '½ avocado'], ['tomato', 100, '1 tomato'], ['cucumber', 80, '⅓ cucumber'], ['pumpkin_seeds', 10, '1 tbsp'], ['evoo', 8, '2 tsp'], ['lemon', 15, '½ lemon, juice'], ['bread_ww', 50, '1 thick slice']],
    steps: ['Butterfly and pan-cook the chicken, 4 min per side. Slice.', 'Build the salad, dice avocado over, dress with oil, lemon, salt, pepper.', 'Seeds on top, bread on the side.'],
  },
  {
    id: 'salmon_spinach_potatoes', name: 'Pan-seared salmon with garlicky spinach & potatoes', it: 'Salmone in padella con spinaci e patate', slots: ['D'], time: 15, active: 12, tags: ['one-pan'], needs: ['stove', 'microwave'],
    ing: [['salmon', 130, '1 fillet'], ['spinach', 150, '3 handfuls (frozen is fine)'], ['potato', 200, '1 large potato'], ['evoo', 8, '2 tsp'], ['lemon', 15, '½ lemon'], ['garlic', 3, '1 clove', 1]],
    steps: ['Microwave the cubed potato with 2 tbsp water, covered, 6 min.', 'Salmon skin-side down in a hot pan with a little oil: 4 min, flip, 2 min. Rest.', 'Same pan: garlic and spinach 2 min. Lemon over everything.'],
  },
  {
    id: 'beef_fajita_piadina', name: 'Beef & pepper fajita piadina', it: 'Piadina con straccetti di manzo e peperoni', slots: ['D'], time: 15, active: 15, tags: ['one-pan', 'wrap', 'redmeat'], needs: ['stove'],
    ing: [['beef_lean', 120], ['pepper', 150, '1 pepper'], ['onion', 60, '½ onion'], ['piadina_ww', 70, '1 piadina'], ['yogurt_greek', 40, '2 tbsp'], ['paprika', 2, '1 tsp'], ['cumin', 1, '½ tsp'], ['evoo', 8, '2 tsp'], ['lemon', 10, 'a squeeze']],
    steps: ['Fry sliced pepper and onion in oil, 6 min. Add beef, paprika, cumin, 3 min on high.', 'Warm the piadina. Fill with the beef mix, yogurt and a squeeze of lemon.'],
    note: 'Red meat once a week is fine. Lean cuts only, and no salame to go with it.'
  },
  {
    id: 'piadina_pizza', name: 'Friday piadina pizza with rocket & a bean side', it: 'Pizza di piadina con rucola', slots: ['D'], time: 12, active: 6, tags: ['oven', 'veg', 'comfort'], needs: ['oven'],
    ing: [['piadina_ww', 70, '1 piadina'], ['passata', 80], ['mozz_light', 60, '½ ball'], ['rocket', 30, '1 handful'], ['oregano', 1, 'a pinch'], ['evoo', 5, '1 tsp'], ['cannellini', 100, '⅖ can, rinsed'], ['lemon', 10, 'a squeeze']],
    steps: ['Oven or grill hot. Spread passata on the piadina, tear mozzarella over, oregano. 7 min until bubbling.', 'Rocket on top. Beans dressed with oil, lemon and pepper on the side.'],
    note: 'Pizza craving handled in 12 minutes with a third of the saturated fat of the real thing.'
  },
  {
    id: 'sardines_toast', name: 'Sardines on toast with tomato, lemon & rocket', it: 'Sardine su pane integrale', slots: ['L', 'D'], time: 5, active: 5, tags: ['nocook', 'quick5', 'sandwich', 'purine-high'], needs: [],
    ing: [['sardines', 85, '1 can, drained'], ['bread_ww', 70, '2 slices'], ['tomato', 100, '1 tomato'], ['lemon', 15, '½ lemon, juice'], ['rocket', 30, '1 handful'], ['evoo', 5, '1 tsp']],
    steps: ['Toast the bread, rub with the tomato, lay slices on.', 'Sardines on top, lemon, oil, pepper, rocket.'],
    note: 'Sardines are omega-3 and calcium champions, but purine-rich: once a week while uric acid is high.'
  },
  {
    id: 'mushroom_spinach_omelette', name: 'Mushroom & spinach omelette with parmigiano', it: 'Omelette funghi e spinaci', slots: ['D', 'B'], time: 12, active: 12, tags: ['one-pan', 'eggs'], needs: ['stove'],
    ing: [['egg', 110, '2 eggs'], ['mushrooms', 120, '5 mushrooms'], ['spinach', 80, '2 handfuls'], ['parm', 8, '1½ tsp'], ['evoo', 8, '2 tsp'], ['bread_ww', 50, '1 thick slice']],
    steps: ['Sauté sliced mushrooms 4 min, add spinach 1 min.', 'Pour in beaten eggs with parmigiano and pepper; low heat 3 min, fold.', 'Bread on the side.'],
  },
  {
    id: 'pumpkin_lentil_soup', name: 'Pumpkin & red lentil soup with a curry hint', it: 'Zuppa di zucca e lenticchie', slots: ['D', 'L'], time: 20, active: 6, tags: ['soup', 'batch', 'comfort'], needs: ['stove', 'blender'],
    ing: [['pumpkin', 300, '1 pack pre-cut'], ['lentils_red', 60], ['onion', 50, '½ onion'], ['curry', 3, '1½ tsp'], ['evoo', 8, '2 tsp'], ['milk_skim', 50], ['water', 400], ['bread_ww', 50, '1 thick slice']],
    steps: ['Soften the onion in oil (3 min), add curry, pumpkin, lentils and water. Simmer 15 min.', 'Blend, add the milk, season.', 'Makes 2 portions. Bread on the side.'],
  },
  {
    id: 'cauliflower_chickpea_tray', name: 'Roast cauliflower & chickpeas with tahini-yogurt', it: 'Cavolfiore e ceci al forno con salsa tahina', slots: ['D'], time: 28, active: 8, tags: ['one-pan', 'oven', 'veg'], needs: ['oven'],
    ing: [['cauliflower', 250, '½ head'], ['chickpeas', 150, '½ can, rinsed'], ['evoo', 10, '1 tbsp'], ['paprika', 2, '1 tsp'], ['cumin', 2, '1 tsp'], ['yogurt_greek', 60, '4 tbsp'], ['tahini', 10, '1 tsp'], ['lemon', 15, '½ lemon, juice'], ['bread_ww', 50, '1 thick slice']],
    steps: ['Oven to 220 °C. Toss cauliflower florets and dried chickpeas with oil, paprika, cumin, salt. Roast 20 min.', 'Mix yogurt, tahini, lemon, a pinch of salt.', 'Drizzle the sauce over. Bread to scoop.'],
  },
  {
    id: 'chicken_shawarma_wrap', name: 'Chicken shawarma-style wrap with yogurt sauce', it: 'Piadina di pollo speziato con salsa allo yogurt', slots: ['D', 'L'], time: 15, active: 12, tags: ['wrap', 'one-pan'], needs: ['stove'],
    ing: [['chicken', 130, '1 small breast, sliced'], ['piadina_ww', 70, '1 piadina'], ['yogurt_greek', 50, '3 tbsp'], ['cucumber', 60, '¼ cucumber'], ['tomato', 80, '1 small tomato'], ['lettuce', 30, '2 leaves'], ['cumin', 2, '1 tsp'], ['paprika', 2, '1 tsp'], ['garlic', 2, '½ clove', 1], ['evoo', 6, '1½ tsp'], ['lemon', 10, 'a squeeze']],
    steps: ['Toss chicken with cumin, paprika, garlic, salt, oil. Pan on high, 6 min.', 'Mix yogurt with lemon and pepper.', 'Warm the piadina, fill with lettuce, tomato, cucumber, chicken, sauce.'],
  },
  {
    id: 'tuna_pea_pasta_lemon', name: 'Wholewheat pasta with tuna, peas & lemon', it: 'Pasta integrale tonno, piselli e limone', slots: ['D', 'L'], time: 13, active: 5, tags: ['pasta', 'one-pot'], needs: ['stove'],
    ing: [['pasta_ww', 80], ['tuna', 100, '2 small cans, drained'], ['peas', 100, 'a big handful, frozen'], ['lemon', 20, '½ lemon, zest and juice'], ['evoo', 10, '1 tbsp'], ['parsley', 5, 'a small bunch', 1], ['pepper_black', 0.5, 'plenty']],
    steps: ['Boil the pasta; add peas for the last 3 min.', 'Drain, toss with tuna, oil, lemon zest and juice, parsley, pepper.'],
  },
  {
    id: 'microwave_sweet_potato_beans', name: 'Microwave sweet potato loaded with borlotti, corn & yogurt', it: 'Patata dolce al microonde con fagioli e yogurt', slots: ['D', 'L'], time: 12, active: 4, tags: ['micro', 'veg', 'one-pan'], needs: ['microwave'],
    ing: [['sweet_potato', 250, '1 sweet potato'], ['borlotti', 120, '½ can, rinsed'], ['yogurt_greek', 40, '2 tbsp'], ['corn', 40, '2 tbsp'], ['spring_onion', 25, '1 spring onion', 1], ['chili', 1, 'a pinch', 1], ['lemon', 10, 'a squeeze']],
    steps: ['Prick the sweet potato all over; microwave 8 min (turn halfway) until soft.', 'Warm beans and corn 1 min in the microwave.', 'Split the potato, pile on beans, corn, yogurt, spring onion, chili, lemon.'],
    note: 'Zero pans. The whole dinner happens in the microwave.'
  },
  {
    id: 'microwave_cod_parcel', name: 'Microwave cod parcel with cherry tomatoes, olives & couscous', it: 'Merluzzo al microonde con pomodorini e cous cous', slots: ['D'], time: 12, active: 5, tags: ['micro', 'one-pan'], needs: ['microwave', 'kettle'],
    ing: [['cod', 180, '2 frozen fillets, thawed'], ['cherry_tom', 150, '10 cherry tomatoes'], ['olives', 10, '4 olives'], ['evoo', 8, '2 tsp'], ['lemon', 15, '½ lemon'], ['oregano', 1, 'a pinch'], ['couscous', 60]],
    steps: ['Pour 80 ml boiling water on the couscous, cover.', 'Cod in a microwave dish with halved tomatoes, olives, oil, lemon, oregano, salt. Cover loosely; 5 min on high.', 'Rest 1 min; serve on the couscous with the juices.'],
  },
  {
    id: 'chicken_pesto_pasta', name: 'Chicken & cherry tomato pasta with a spoon of pesto', it: 'Pasta con pollo, pomodorini e pesto', slots: ['D', 'L'], time: 15, active: 10, tags: ['pasta'], needs: ['stove'],
    ing: [['pasta_ww', 80], ['chicken', 100, '½ breast, diced'], ['pesto', 15, '1 tbsp'], ['cherry_tom', 100, '6 cherry tomatoes'], ['rocket', 30, '1 handful'], ['evoo', 5, '1 tsp']],
    steps: ['Boil the pasta (10 min).', 'Brown diced chicken in the oil 5 min; add halved tomatoes 2 min.', 'Toss pasta, chicken, pesto and rocket with a splash of pasta water.'],
  }
);
