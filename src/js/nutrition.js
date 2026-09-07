/* Nutrition engine: normalises recipes, computes totals, cost, purine load, benefit scores and daily targets. */
(function () {
  const ZERO = () => ({ kcal: 0, p: 0, c: 0, fib: 0, fat: 0, sf: 0, sug: 0, na: 0, o3: 0, cost: 0 });

  // Normalise one ingredient entry: [id, g, disp?, opt?] or a custom object {name, it, g, per100, ...}
  CT.ingObj = (e) => {
    if (Array.isArray(e)) {
      const base = CT.ING[e[0]];
      if (!base) return null;
      const g = e[1];
      const disp = e[2] || (CT.LIQUID.has(e[0]) ? `${CT.fmt(g)} ml` : `${CT.fmt(g)} g`);
      return { id: e[0], en: base.en, it: base.it, aisle: base.aisle, g, disp, opt: !!e[3], per100: base.per100, price: base.price, tag: base.tag, flags: base.flags, o3: base.o3, pur: base.pur, pack: base.pack };
    }
    if (e && typeof e === 'object') {
      if (e.id && CT.ING[e.id]) return CT.ingObj([e.id, e.g, e.disp, e.opt]);
      return { id: null, en: e.name || 'Ingredient', it: e.it || '', aisle: e.aisle || 'Canned & dry', g: Number(e.g) || 0, disp: e.disp || `${CT.fmt(e.g)} g`, opt: !!e.opt, per100: Object.assign({ kcal: 0, p: 0, c: 0, fib: 0, fat: 0, sf: 0, sug: 0, na: 0 }, e.per100 || {}), price: e.price || 5, tag: e.tag || '', flags: e.flags || '', o3: e.o3 || 0, pur: e.pur || 0, pack: null };
    }
    return null;
  };

  CT.addNutri = (acc, ing, factor = 1) => {
    const k = (ing.g * factor) / 100;
    for (const f of ['kcal', 'p', 'c', 'fib', 'fat', 'sf', 'sug', 'na']) acc[f] += (ing.per100[f] || 0) * k;
    acc.o3 += (ing.o3 || 0) * k;
    acc.cost += ((ing.price || 0) * ing.g * factor) / 1000;
    return acc;
  };

  const LEGUME_TAGS = new Set(['chickpeas', 'beans', 'lentils', 'peas', 'hummus', 'soy']);
  const LDL_HELPERS = new Set(['oats', 'walnuts', 'almonds', 'peanuts', 'seeds', 'oliveoil', 'avocado', 'chickpeas', 'beans', 'lentils', 'peas', 'farro']);
  // Grams of meat, poultry and fish on the plate. Purines come with these, so a day's total is worth
  // watching when uric acid is above range, whatever the calories say.
  const ANIMAL_TAGS = new Set(['chicken', 'turkey', 'beef', 'bresaola', 'tuna', 'salmon', 'mackerel', 'sardines', 'codfish', 'seabass', 'shrimp', 'smokedsalmon']);
  const PROTEIN_TAGS = new Set(['tuna', 'salmon', 'mackerel', 'sardines', 'codfish', 'shrimp', 'smokedsalmon', 'chicken', 'turkey', 'beef', 'bresaola', 'eggs', 'chickpeas', 'beans', 'lentils', 'soy', 'yogurt', 'ricotta', 'cottage', 'mozzarella']);

  CT.computeBenefits = (r) => {
    const n = r.nutri, b = { ldl: 0, tg: 0, uric: 0, liver: 0, glucose: 0, thyroid: 0 }, why = [];
    const hasTag = (set, minG) => r.ings.some((i) => set.has(i.tag) && i.g >= (minG || 10));
    // LDL: soluble fibre, low saturated fat, specific helper foods
    if (n.fib >= 6) b.ldl++; if (n.fib >= 10) b.ldl++;
    if (n.sf <= 3) b.ldl++;
    if (hasTag(LDL_HELPERS, 15)) b.ldl++;
    if (n.sf > 7) b.ldl -= 2;
    // Triglycerides: omega-3, low sugar, fibre
    if (n.o3 >= 1) b.tg += 2; else if (n.o3 >= 0.4) b.tg += 1;
    if (n.sug <= 12) b.tg++;
    if (n.fib >= 6) b.tg++;
    if (n.sug > 25) b.tg -= 2;
    // Uric acid: purine load, low-fat dairy, cherries / vitamin C
    b.uric = r.purine <= 1 ? 2 : r.purine === 2 ? 1 : -1;
    if (r.ings.some((i) => ['yogurt', 'milk', 'cottage', 'ricotta'].includes(i.tag) && i.g >= 40)) b.uric++;
    if (r.ings.some((i) => ['cherries', 'orange', 'kiwi', 'strawberries', 'lemon'].includes(i.tag) && i.g >= 15)) b.uric++;
    // Liver: low saturated fat + low sugar + fibre
    if (n.sf <= 4) b.liver++; if (n.sug <= 12) b.liver++; if (n.fib >= 6) b.liver++;
    if (n.sug > 25 || n.sf > 8) b.liver -= 2;
    // Glucose: fibre, protein, low sugar
    if (n.fib >= 6) b.glucose++; if (n.p >= 15) b.glucose++; if (n.sug <= 12) b.glucose++;
    // Thyroid: iodine and selenium sources
    const iod = r.ings.filter((i) => i.flags.includes('I') && i.g >= 30).length;
    const sel = r.ings.filter((i) => i.flags.includes('L') && i.g >= 10).length;
    if (iod) b.thyroid++; if (sel) b.thyroid++; if (r.fish) b.thyroid++;
    for (const k in b) b[k] = CT.clamp(b[k], -2, 3);
    // Reasons shown to the user
    if (n.fib >= 10) why.push(`${CT.fmt(n.fib)} g fibre`); else if (n.fib >= 6) why.push(`${CT.fmt(n.fib)} g fibre`);
    if (n.o3 >= 0.4) why.push(`omega-3 ${CT.fmt(n.o3, 1)} g`);
    if (n.sf <= 3) why.push(`only ${CT.fmt(n.sf, 1)} g saturated fat`);
    if (n.p >= 25) why.push(`${CT.fmt(n.p)} g protein`);
    if (hasTag(LEGUME_TAGS, 60)) why.push('legumes');
    if (r.purine >= 3) why.push('purine-rich: max once a week');
    if (n.na > 1200) why.push(`salty (${CT.fmt(n.na)} mg sodium)`);
    r.benefits = b; r.why = why;
  };

  CT.prepRecipe = (r) => {
    if (r._prepped) return r;
    r.ings = (r.ing || []).map(CT.ingObj).filter(Boolean);
    r.nutri = r.ings.reduce((acc, i) => CT.addNutri(acc, i), ZERO());
    r.cost = r.nutri.cost;
    r.serves = r.serves || 1;
    r.tags = r.tags || []; r.needs = r.needs || []; r.slots = r.slots || ['L'];
    r.purine = Math.max(0, ...r.ings.filter((i) => i.g >= 40 || (i.pur >= 3 && i.g >= 25)).map((i) => i.pur));
    if (r.tags.includes('purine-high')) r.purine = 3;
    const flags = new Set(r.ings.flatMap((i) => i.flags.split('')));
    r.allergens = ['D', 'G', 'N', 'E', 'F', 'S', 'Y', 'Z'].filter((a) => flags.has(a));
    r.fish = flags.has('F') || flags.has('S');
    r.meat = flags.has('M');
    r.redmeat = flags.has('R') || r.tags.includes('redmeat');
    r.veg = !r.fish && !r.meat;
    r.vegan = r.veg && !flags.has('D') && !flags.has('E');
    r.eggs = r.ings.some((i) => i.tag === 'eggs' && i.g >= 50);
    r.legume = r.ings.some((i) => LEGUME_TAGS.has(i.tag) && i.g >= 60);
    r.foods = Array.from(new Set(r.ings.filter((i) => !i.opt && i.tag && i.g >= 5).map((i) => i.tag)));
    const prot = r.ings.filter((i) => PROTEIN_TAGS.has(i.tag)).sort((a, b) => b.g * b.per100.p - a.g * a.per100.p)[0];
    r.mainProtein = prot ? prot.tag : null;
    r.mins = r.active || r.time || 10;
    r.italian = r.tags.includes('italian') || CT.ITALIAN.has(r.id);
    const tr = (CT.IT || {})[r.id] || {};
    r.itSteps = Array.isArray(tr.steps) && tr.steps.length ? tr.steps : (Array.isArray(r.stepsIt) ? r.stepsIt : null);
    r.itNote = tr.note || r.noteIt || '';
    r.animalG = r.ings.reduce((a, i) => a + (ANIMAL_TAGS.has(i.tag) ? i.g : 0), 0);
    CT.computeBenefits(r);
    r._prepped = true;
    return r;
  };

  let cache = null, cacheKey = '';
  CT.recipes = () => {
    const custom = (CT.state && CT.state.custom) || [];
    const key = custom.length + ':' + custom.map((c) => c.id).join(',');
    if (cache && key === cacheKey) return cache;
    cache = [...CT.RECIPES, ...custom].map(CT.prepRecipe);
    cacheKey = key;
    return cache;
  };
  CT.recipe = (id) => CT.recipes().find((r) => r.id === id) || null;

  // ---- Daily targets from the profile (Mifflin-St Jeor)
  CT.targets = () => {
    const p = (CT.state && CT.state.profile) || {};
    const w = Number(p.weight) || 80, h = Number(p.height) || 178, age = Number(p.age) || 32;
    const bmr = p.sex === 'f' ? 10 * w + 6.25 * h - 5 * age - 161 : 10 * w + 6.25 * h - 5 * age + 5;
    const act = (CT.ACTIVITY.find((a) => a[0] === p.activity) || CT.ACTIVITY[1])[2];
    let kcal = bmr * act;
    if (p.goal === 'lose') kcal = Math.max(1600, kcal * 0.85);
    kcal = Math.round(kcal / 10) * 10;
    return {
      kcal,
      p: Math.round(Math.max(1.2 * w, 0.2 * kcal / 4)),
      fib: 30,
      sf: Math.round((kcal * 0.07) / 9),
      sug: 60,
      na: 2000,
      o3: 1.5,
      water: 8,
      bmi: w / ((h / 100) ** 2),
    };
  };

  CT.sumNutri = (recipesList) => recipesList.reduce((acc, r) => { for (const k in acc) acc[k] += r.nutri[k] || 0; return acc; }, ZERO());
  // Same, with a portion multiplier per meal slot.
  CT.sumNutriScaled = (bySlot, mult) => Object.keys(bySlot).reduce((acc, s) => {
    const r = bySlot[s], m = (mult && mult[s]) || 1;
    for (const k in acc) acc[k] += (r.nutri[k] || 0) * m;
    return acc;
  }, ZERO());

  // What is planned / eaten today, including extras logged manually or via Claude.
  CT.dayNutri = (date) => {
    const plan = (CT.state.plans[date] || {});
    const log = CT.state.log[date] || {};
    const planned = ZERO(), eaten = ZERO();
    for (const slot of CT.SLOT_ORDER) {
      const s = plan[slot]; if (!s) continue;
      const r = CT.recipe(s.id); if (!r) continue;
      const m = s.mult || 1;
      for (const k in planned) planned[k] += (r.nutri[k] || 0) * m;
      if (s.done) for (const k in eaten) eaten[k] += (r.nutri[k] || 0) * m;
    }
    for (const x of log.extra || []) {
      for (const k of ['kcal', 'p', 'c', 'fib', 'fat', 'sf', 'sug', 'na']) { eaten[k] += Number(x[k]) || 0; planned[k] += Number(x[k]) || 0; }
    }
    return { planned, eaten, cost: planned.cost };
  };
})();
