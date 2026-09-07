/* The household quantities that sit in the left column of an ingredient list. They are written in
   English in the recipe data; this is the Italian for each. Anything unmapped falls through
   unchanged, so a new phrase degrades to English rather than disappearing. */
CT.QTY_IT = {
  // spoons, pinches, splashes
  '1 tbsp': '1 cucchiaio', '2 tbsp': '2 cucchiai', '3 tbsp': '3 cucchiai', '4 tbsp': '4 cucchiai', '5 tbsp': '5 cucchiai',
  '1½ tbsp': '1½ cucchiai', '2½ tbsp': '2½ cucchiai', '1 heaped tbsp': '1 cucchiaio colmo',
  '1 tsp': '1 cucchiaino', '2 tsp': '2 cucchiaini', '1½ tsp': '1½ cucchiaini', '½ tsp': '½ cucchiaino',
  'a pinch': 'un pizzico', 'a good pinch': 'un pizzico abbondante', 'to taste': 'q.b.', 'plenty': 'in abbondanza',
  'a squeeze': 'una spruzzata', 'a few drops': 'qualche goccia', 'a few shavings': 'qualche scaglia',
  // garlic, onions, aromatics
  '1 clove': '1 spicchio', '2 cloves': '2 spicchi', '½ clove': '½ spicchio', 'a rub of garlic': 'una strofinata d’aglio',
  '½ onion': '½ cipolla', '½ small onion': '½ cipolla piccola', '¼ red onion': '¼ di cipolla rossa', '1 spring onion': '1 cipollotto',
  'a thumb, grated': 'un pezzetto, grattugiato', 'a small thumb, grated': 'un pezzettino, grattugiato',
  // herbs
  'a small bunch': 'un ciuffo', 'a few leaves': 'qualche foglia', 'a handful of leaves': 'una manciata di foglie',
  '2 leaves': '2 foglie', '3 leaves': '3 foglie', 'a few fronds': 'qualche ciuffetto', 'a few needles': 'qualche ago', '1 sprig': '1 rametto',
  // vegetables
  '1 tomato': '1 pomodoro', '1 small tomato': '1 pomodoro piccolo', '1 large tomato': '1 pomodoro grande',
  '2 tomatoes': '2 pomodori', '2 large tomatoes': '2 pomodori grandi', '3 large tomatoes': '3 pomodori grandi',
  '6 cherry tomatoes': '6 pomodorini', '8 cherry tomatoes': '8 pomodorini', '10 cherry tomatoes': '10 pomodorini',
  '1 carrot': '1 carota', '1 small carrot': '1 carota piccola', '1 small carrot, grated': '1 carota piccola, grattugiata',
  '1 stick': '1 costa', '⅓ cucumber': '⅓ di cetriolo', '¼ cucumber': '¼ di cetriolo', '½ cucumber': '½ cetriolo',
  '1 pepper': '1 peperone', '½ pepper': '½ peperone', '⅔ pepper': '⅔ di peperone', '1½ peppers': '1½ peperoni',
  '1 small zucchini': '1 zucchina piccola', '1 eggplant': '1 melanzana',
  '1 potato': '1 patata', '1 small potato': '1 patata piccola', '1 large potato': '1 patata grande',
  '2 potatoes': '2 patate', '1 sweet potato': '1 patata dolce',
  '½ head': '½ testa', '1 head': '1 testa', '1 bulb': '1 bulbo', '½ bulb': '½ finocchio', '½ orange': '½ arancia', '1 pack pre-cut': '1 confezione già a pezzi',
  '5 mushrooms': '5 funghi', '6 mushrooms': '6 funghi', '8 mushrooms': '8 funghi',
  // fruit
  '1 lemon': '1 limone', '½ lemon': '½ limone', '½ lemon, juice': '½ limone, il succo', '½ lemon, zest and juice': '½ limone, scorza e succo',
  '1 apple': '1 mela', '1 small apple': '1 mela piccola', '1 pear': '1 pera',
  '1 orange': '1 arancia', '1 large orange': '1 arancia grande', '1 kiwi': '1 kiwi', '2 kiwis': '2 kiwi',
  '1 banana': '1 banana', '1 small banana': '1 banana piccola', '½ avocado': '½ avocado',
  // handfuls
  '1 handful': '1 manciata', '2 handfuls': '2 manciate', '3 handfuls': '3 manciate', '4 handfuls': '4 manciate',
  '2 big handfuls': '2 manciate abbondanti', 'a big handful, frozen': 'una manciata abbondante, surgelati',
  '2 big handfuls, frozen': '2 manciate abbondanti, surgelati', 'a handful, frozen': 'una manciata, surgelati',
  '2 handfuls, frozen': '2 manciate, surgelati', '3 handfuls, frozen': '3 manciate, surgelate',
  '2 handfuls, fresh': '2 manciate, freschi', '3 handfuls, fresh': '3 manciate, freschi',
  '3 handfuls (frozen is fine)': '3 manciate (vanno bene surgelati)', '1 big bowl, frozen': '1 ciotola abbondante, surgelate',
  // bread and crackers
  '1 slice': '1 fetta', '2 slices': '2 fette', '3 slices': '3 fette', '6 slices': '6 fette', '2-3 slices': '2-3 fette',
  '1 thick slice': '1 fetta spessa', '2 large slices': '2 fette grandi', '3 slices, stale is ideal': '3 fette, meglio se raffermo',
  '1 slice, blitzed to crumbs': '1 fetta, frullata in pangrattato', '4 crackers': '4 crackers', '3 crackers': '3 crackers',
  '1 piadina': '1 piadina', '1 pita': '1 pita',
  // tins, pouches, cubes
  '½ can, rinsed': '½ scatola, sciacquati', '¾ can, rinsed': '¾ di scatola, sciacquati', '⅖ can, rinsed': '⅖ di scatola, sciacquati',
  '1 can, rinsed': '1 scatola, sciacquati', '½ can, rinsed and dried': '½ scatola, sciacquati e asciugati',
  '1 can, rinsed and dried': '1 scatola, sciacquati e asciugati', '1 can, drained': '1 scatoletta, sgocciolato',
  '2 small cans, drained': '2 scatolette, sgocciolato', '1½ small cans, drained': '1½ scatolette, sgocciolato',
  '1 pouch portion': '1 busta monoporzione', '1½ pouch portions': '1½ buste monoporzione', '⅘ pouch portion': '⅘ di busta monoporzione',
  '½ low-salt cube': '½ dado',
  // meat, fish, eggs, cheese
  '1 breast': '1 petto', '1 small breast': '1 petto piccolo', '1 breast, in chunks': '1 petto, a bocconcini',
  '1 large breast, in chunks': '1 petto grande, a bocconcini', '1 breast, in strips': '1 petto, a striscioline',
  '1 breast, sliced': '1 petto, a fette', '1 breast, sliced thin': '1 petto, a fette sottili',
  '1 breast, butterflied': '1 petto, aperto a libro', '1 breast, cubed': '1 petto, a cubi',
  '1 small breast, sliced': '1 petto piccolo, a fette', '1 small breast, diced': '1 petto piccolo, a dadini',
  '½ breast, diced': '½ petto, a dadini', '2 thin steaks': '2 fettine sottili', '2 thin escalopes': '2 scaloppine sottili',
  '1 fillet': '1 filetto', '1 large fillet': '1 filetto grande', '2 frozen fillets': '2 filetti surgelati',
  '2 frozen fillets, thawed': '2 filetti surgelati, scongelati',
  '1 egg': '1 uovo', '2 eggs': '2 uova', '½ egg, beaten': '½ uovo, sbattuto',
  '½ ball': '½ mozzarella', '⅖ ball': '⅖ di mozzarella', '1 pot': '1 vasetto',
  '6 olives': '6 olive', '8 olives': '8 olive', '4 olives': '4 olive',
  // weights with a count in brackets
  '15 g (4 halves)': '15 g (4 gherigli)', '10 g (3 halves)': '10 g (3 gherigli)', '20 g (5 halves)': '20 g (5 gherigli)',
  '15 g (12 almonds)': '15 g (12 mandorle)', '25 g (20 almonds)': '25 g (20 mandorle)', '10 almonds': '10 mandorle',
  '15 g (a small handful)': '15 g (una manciatina)', '10 g, chopped': '10 g, tritate', '15 g, chopped': '15 g, tritate',
  '50 g (5 tbsp)': '50 g (5 cucchiai)', '25 g kernels (2 tbsp)': '25 g di chicchi (2 cucchiai)', '2 squares (15 g)': '2 quadretti (15 g)',
};
