/* Italian method text. The recipe names already live on each recipe as `it`; this holds the steps
   and the notes, keyed by recipe id, so the app can show a whole recipe in Italian offline.
   Voice: imperative informal, the way an Italian recipe actually talks to you. */
CT.IT = CT.IT || {};
Object.assign(CT.IT, {
  overnight_oats: { steps: ['In un barattolo o in una ciotola mescola avena, latte, yogurt, chia e cannella.', 'Copri e lascia in frigo tutta la notte (o almeno 3 ore).', 'Al mattino completa con i frutti di bosco (vanno bene anche surgelati) e le noci.'], note: 'Avena e chia portano la fibra solubile che abbassa il colesterolo LDL; le noci aggiungono omega-3 vegetali.' },
  porridge_banana_pb: { steps: ['Mescola avena e latte in una ciotola fonda. Microonde 2 minuti, mescola, altri 60 secondi (3 minuti in tutto).', 'Affetta la banana sopra, aggiungi il burro di arachidi e la cannella.', 'Lascia riposare un minuto: si addensa da solo.'] },
  yogurt_apple_almond: { steps: ['Taglia la mela a dadini, con la buccia, direttamente nello yogurt.', 'Completa con mandorle, semi di lino macinati, cannella e un filo di miele.'] },
  ricotta_tomato_toast: { steps: ['Tosta il pane.', 'Spalma la ricotta, disponi sopra il pomodoro a fette, condisci con olio, origano e pepe nero.', 'Mangia il kiwi a parte.'], note: 'La stessa fatica di un panino con le sottilette, con una frazione dei grassi saturi e del sale.' },
  avocado_egg_toast: { steps: ['Tosta il pane. Schiaccia l’avocado con limone, sale e pepe e spalmalo sopra.', 'Cuoci l’uovo all’occhio di bue in padella antiaderente con qualche goccia d’olio, 3 minuti.', 'Adagia l’uovo sul pane e finisci con il peperoncino.'] },
  scrambled_spinach_toast: { steps: ['Fai appassire gli spinaci in padella con l’olio, 2 minuti.', 'Sbatti le uova con pepe e poco sale, versale e mescola a fuoco basso finché sono appena rapprese, 2 minuti.', 'Servi sul pane tostato.'] },
  pb_banana_toast: { steps: ['Tosta il pane e spalma il burro di arachidi.', 'Completa con la banana a fette e una spolverata di cannella.'] },
  chia_cocoa_pudding: { steps: ['Sbatti chia, latte, cacao e miele in un barattolo. Aspetta 5 minuti e rimescola, così non si formano grumi.', 'Metti in frigo tutta la notte (o almeno 2 ore).', 'Completa con frutti di bosco e noci.'] },
  lazy_fruit_nuts_yogurt: { steps: ['Apri lo yogurt. Prendi la mela e una manciata di noci.', 'Finito. Il caffè è concesso, ma senza zucchero.'] },
  berry_oat_smoothie: { steps: ['Frulla tutto fino a ottenere un composto liscio, un minuto.', 'Troppo denso? Aggiungi un goccio d’acqua.'] },
  cottage_cucumber_toast: { steps: ['Tosta il pane e spalma i fiocchi di latte.', 'Completa con il cetriolo a fette sottili, i semi, il pepe e una spruzzata di limone.'] },
  omelette_tomato_basil: { steps: ['Sbatti le uova con sale e pepe.', 'Scalda l’olio, versa le uova e distribuisci sopra il pomodoro a dadini e il basilico, 3 minuti a fuoco basso.', 'Piega l’omelette e servi con il pane.'] },
  crackers_ricotta_orange: { steps: ['Spalma la ricotta sui crackers, versa un filo di miele e sbriciola sopra le noci.', 'Sbuccia l’arancia. Fatto.'] },
  choc_banana_yogurt: { steps: ['Mescola il cacao nello yogurt fino a scioglierlo del tutto.', 'Aggiungi la banana a fette e le arachidi.'], note: 'Sa di dolce al cucchiaio. I flavanoli del cacao fanno bene ai vasi e non serve zucchero aggiunto.' },

  apple_walnuts: { steps: ['Lava la mela. Conta le noci una a una: contarle è il modo di non esagerare.'] },
  yogurt_berries: { steps: ['Versa i frutti di bosco surgelati nello yogurt; 30 secondi di microonde se li vuoi morbidi.', 'Cannella sopra.'] },
  veg_sticks_hummus: { steps: ['Taglia le verdure a bastoncini e intingile nell’hummus.'] },
  almonds_orange: { steps: ['Sbuccia l’arancia e sgranocchia le mandorle.'] },
  crackers_pb_pear: { steps: ['Spalma il burro di arachidi sui crackers e mangia la pera a parte o a fette sopra.'] },
  dark_choc_walnuts: { steps: ['Mangia piano. Questo è lo sfizio della giornata, e vale come tale.'], note: 'Il fondente dal 70% in su ha poco zucchero: fermati a due quadretti.' },
  cherries_bowl: { steps: ['Lava, mangia, sputa i noccioli.'], note: 'Le ciliegie sono uno dei pochi alimenti con prove a favore sull’acido urico.' },
  edamame_chili: { steps: ['Scalda gli edamame surgelati al microonde con un goccio d’acqua, 3 minuti.', 'Limone, sale, peperoncino. Si mangiano spremendo il baccello coi denti.'] },
  banana_almonds: { steps: ['Sbuccia e mangia, con le mandorle a parte.'] },
  cottage_cherry_tomatoes: { steps: ['Taglia i pomodorini a metà dentro i fiocchi di latte, pepe e qualche goccia d’olio.'] },
  kiwi_pumpkin_seeds: { steps: ['Taglia i kiwi a metà e mangiali col cucchiaino; i semi a manciate.'] },
  popcorn_paprika: { steps: ['Olio e chicchi in una pentola, coperchio, fuoco medio-alto. Scuoti ogni tanto: sono pronti quando gli scoppi rallentano, circa 4 minuti.', 'Condisci con paprika e poco sale.'], note: 'Cereale integrale, 15 g di fibra per 100 g, e ha la soddisfazione di uno sfizio vero.' },
  roasted_chickpeas: { steps: ['Forno a 200 °C. Asciuga bene i ceci, condiscili con olio, paprika e sale.', 'Inforna 25 minuti, scuotendo la teglia a metà cottura, finché sono croccanti.', 'Fai una scatola intera: si conservano 3 giorni in un barattolo.'] },
  bruschetta_tomato: { steps: ['Tosta il pane e strofinalo con l’aglio.', 'Completa con pomodoro a dadini, olio, sale e basilico.'] },
  apple_peanut_butter: { steps: ['Taglia la mela a spicchi e intingila nel burro di arachidi.'] },
});
