/* Cene fredde: dinners you assemble, never cook. Three to five minutes, no pan, no oven.
   Deliberately not all sandwiches. Bread appears in about half of them, and never as the whole
   meal, because bread is one of the biggest sources of sodium in an Italian day. The protein is
   canned fish, legumes or fresh light cheese, and every plate carries raw vegetables. */
CT.RECIPES = CT.RECIPES || [];
CT.RECIPES.push(
  {
    id: 'cena_tonno_fagioli', name: 'Tuna & cannellini plate, three minutes', it: 'Tonno e fagioli express', slots: ['D', 'L'], time: 4, active: 4, tags: ['italian', 'nocook', 'quick5', 'cold'], needs: [],
    ing: [['tuna', 100, '2 small cans, drained'], ['cannellini', 150, '½ can, rinsed'], ['cherry_tom', 120, '8 cherry tomatoes'], ['onion', 25, '¼ red onion', 1], ['evoo', 10, '1 tbsp'], ['lemon', 15, '½ lemon, juice'], ['parsley', 5, 'a small bunch', 1], ['bread_ww', 40, '1 slice']],
    steps: ['Drain the tuna, rinse the beans, halve the tomatoes.', 'Everything in a bowl with oil, lemon, salt and pepper. Stir once.', 'One slice of bread on the side, not a sandwich.'],
    note: 'The whole dinner is a bowl and a fork. Beans and tuna together give 30 g of protein without touching a pan.'
  },
  {
    id: 'cena_caprese_ceci', name: 'Chickpea caprese', it: 'Caprese di ceci', slots: ['D', 'L'], time: 4, active: 4, tags: ['italian', 'nocook', 'quick5', 'cold'], needs: [],
    ing: [['chickpeas', 150, '½ can, rinsed'], ['mozz_light', 60, '½ ball'], ['cherry_tom', 150, '10 cherry tomatoes'], ['basil', 5, 'a few leaves'], ['evoo', 10, '1 tbsp'], ['oregano', 1, 'a pinch', 1], ['bread_ww', 40, '1 slice']],
    steps: ['Rinse the chickpeas, halve the tomatoes, tear the mozzarella.', 'Toss with oil, salt, pepper and oregano, tear the basil over.', 'Bread on the side.'],
  },
  {
    id: 'cena_farro_mozzarella', name: 'Ready farro with mozzarella, tomatoes & rocket', it: 'Farro pronto con mozzarella, pomodorini e rucola', slots: ['D', 'L'], time: 4, active: 4, tags: ['italian', 'nocook', 'quick5', 'cold'], needs: [],
    ing: [['farro_pre', 150, '1 pouch portion'], ['mozz_light', 60, '½ ball'], ['cherry_tom', 120, '8 cherry tomatoes'], ['rocket', 40, '2 handfuls'], ['evoo', 10, '1 tbsp'], ['basil', 3, 'a few leaves', 1]],
    steps: ['Tip the farro straight from the pouch into a bowl. Cold is fine.', 'Add the diced mozzarella, halved tomatoes and rocket.', 'Oil, salt, pepper, basil. Done.'],
    note: 'Precooked farro is the single most useful thing to keep in the cupboard for a three-minute dinner.'
  },
  {
    id: 'cena_ricotta_pomodoro', name: 'Ricotta, tomato & olive plate', it: 'Piatto di ricotta, pomodoro e olive', slots: ['D'], time: 3, active: 3, tags: ['italian', 'nocook', 'quick5', 'cold'], needs: [],
    ing: [['ricotta_light', 120], ['tomato', 200, '2 tomatoes'], ['olives', 15, '6 olives', 1], ['bread_ww', 60, '2 slices'], ['evoo', 8, '2 tsp'], ['oregano', 1, 'a pinch'], ['rocket', 30, '1 handful', 1]],
    steps: ['Spoon the ricotta onto a plate and flatten it with the back of the spoon.', 'Sliced tomato around it, olives, oil, salt, pepper, oregano.', 'Bread on the side to break into it.'],
  },
  {
    id: 'cena_sgombro_cannellini', name: 'Mackerel & white beans with lemon', it: 'Sgombro e cannellini al limone', slots: ['D', 'L'], time: 3, active: 3, tags: ['italian', 'nocook', 'quick5', 'cold', 'purine-high'], needs: [],
    ing: [['mackerel', 90, '1 can, drained'], ['cannellini', 150, '½ can, rinsed'], ['cherry_tom', 100, '6 cherry tomatoes'], ['rocket', 40, '2 handfuls'], ['lemon', 15, '½ lemon, juice'], ['evoo', 8, '2 tsp']],
    steps: ['Drain the mackerel, rinse the beans.', 'Flake the fish over the beans, add tomatoes and rocket.', 'Lemon, oil, plenty of pepper. No bread needed.'],
    note: 'Three minutes and 2 g of omega-3, which is the point of the whole diet. Purine-rich, so about once a week.'
  },
  {
    id: 'cena_fiocchi_pomodorini', name: 'Cottage cheese with tomatoes & olives', it: 'Fiocchi di latte con pomodorini e olive', slots: ['D'], time: 3, active: 3, tags: ['italian', 'nocook', 'quick5', 'cold'], needs: [],
    ing: [['cottage', 150], ['cherry_tom', 150, '10 cherry tomatoes'], ['olives', 15, '6 olives', 1], ['bread_ww', 50, '1 thick slice'], ['evoo', 8, '2 tsp'], ['oregano', 1, 'a pinch', 1], ['cucumber', 80, '⅓ cucumber', 1]],
    steps: ['Tip the cottage cheese into a bowl.', 'Halved tomatoes, olives, cucumber, oil, pepper, oregano.', 'Bread on the side.'],
  },
  {
    id: 'cena_ceci_tonno_finocchi', name: 'Chickpea, tuna & fennel salad', it: 'Insalata di ceci, tonno e finocchi', slots: ['D', 'L'], time: 5, active: 5, tags: ['italian', 'nocook', 'quick5', 'cold'], needs: [],
    ing: [['chickpeas', 150, '½ can, rinsed'], ['tuna', 80, '1½ small cans, drained'], ['fennel', 150, '½ bulb'], ['lemon', 15, '½ lemon, juice'], ['evoo', 10, '1 tbsp'], ['parsley', 5, 'a small bunch', 1], ['orange', 100, '½ orange', 1]],
    steps: ['Slice the fennel thin. Rinse the chickpeas, drain the tuna.', 'Toss with lemon, oil, salt and pepper.', 'Orange segments on top if you have one.'],
    note: 'Fennel and citrus both help on uric acid, and there is nothing to wash up but a bowl.'
  },
  {
    id: 'cena_tonno_mais_cannellini', name: 'Tuna, corn & bean bowl', it: 'Insalata di tonno, mais e cannellini', slots: ['D', 'L'], time: 4, active: 4, tags: ['italian', 'nocook', 'quick5', 'cold'], needs: [],
    ing: [['tuna', 80, '1½ small cans, drained'], ['corn', 60, '3 tbsp'], ['cannellini', 150, '½ can, rinsed'], ['rocket', 40, '2 handfuls'], ['cherry_tom', 100, '6 cherry tomatoes'], ['evoo', 10, '1 tbsp'], ['lemon', 10, 'a squeeze']],
    steps: ['Drain everything that comes in a tin.', 'Into a bowl with the rocket and tomatoes.', 'Oil, lemon, pepper, mix.'],
  },
  {
    id: 'cena_piadina_ricotta', name: 'Cold piadina roll with ricotta & rocket', it: 'Piadina arrotolata con ricotta e rucola', slots: ['D', 'L'], time: 3, active: 3, tags: ['italian', 'nocook', 'quick5', 'cold', 'wrap'], needs: [],
    ing: [['piadina_ww', 70, '1 piadina'], ['ricotta_light', 80], ['rocket', 40, '2 handfuls'], ['tomato', 100, '1 tomato'], ['evoo', 5, '1 tsp'], ['pepper_black', 0.5, 'to taste'], ['apple', 150, '1 small apple', 1]],
    steps: ['Spread the ricotta over the piadina straight from the packet, no warming.', 'Rocket and sliced tomato, oil, salt, pepper.', 'Roll it and cut it in half. Apple after if you are still hungry.'],
  },
  {
    id: 'cena_yogurt_ceci_menta', name: 'Yogurt, chickpea & cucumber bowl with mint', it: 'Ciotola di yogurt, ceci e cetriolo alla menta', slots: ['D', 'L'], time: 4, active: 4, tags: ['nocook', 'quick5', 'cold'], needs: [],
    ing: [['yogurt_greek', 150], ['chickpeas', 150, '½ can, rinsed'], ['cucumber', 120, '½ cucumber'], ['mint', 3, 'a few leaves'], ['evoo', 8, '2 tsp'], ['lemon', 10, 'a squeeze'], ['bread_ww', 40, '1 slice'], ['cumin', 1, '½ tsp', 1]],
    steps: ['Dice the cucumber, rinse the chickpeas.', 'Stir into the yogurt with mint, lemon, oil, salt and a pinch of cumin.', 'Bread on the side.'],
    note: 'Low-fat dairy is one of the few foods shown to lower uric acid, and this is the laziest way to eat a pot of it savoury.'
  },
  {
    id: 'cena_hummus_piatto', name: 'Hummus plate with raw vegetables & pita', it: 'Piatto di hummus con verdure crude e pita', slots: ['D', 'L'], time: 4, active: 4, tags: ['nocook', 'quick5', 'cold', 'vegan'], needs: [],
    ing: [['hummus', 100, '5 tbsp'], ['pita_ww', 60, '1 pita'], ['carrot', 80, '1 carrot'], ['cucumber', 100, '⅓ cucumber'], ['pepper', 80, '½ pepper'], ['lemon', 10, 'a squeeze'], ['olives', 15, '6 olives', 1]],
    steps: ['Spoon the hummus onto a plate, make a well, pour oil into it.', 'Cut carrot, cucumber and pepper into sticks all around.', 'Pita torn into pieces. Eat with your hands.'],
  },
  {
    id: 'cena_salmone_finocchi', name: 'Smoked salmon with fennel & orange', it: 'Salmone affumicato con finocchi e arance', slots: ['D'], time: 5, active: 5, tags: ['italian', 'nocook', 'quick5', 'cold', 'occasional'], needs: [],
    ing: [['salmon_smoked', 50, '2 slices'], ['fennel', 150, '½ bulb'], ['orange', 150, '1 orange'], ['walnuts', 10, '10 g (3 halves)'], ['evoo', 8, '2 tsp'], ['bread_ww', 40, '1 slice'], ['pepper_black', 0.5, 'plenty']],
    steps: ['Slice the fennel thin, peel and slice the orange, keeping the juice.', 'Lay the salmon over them, walnuts on top.', 'Oil, the orange juice, lots of pepper. No salt: the salmon brings it.'],
    note: 'Salty, so about once a week. Good omega-3 and no cooking at all.'
  }
);
