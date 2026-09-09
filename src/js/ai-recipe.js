/* Turning a recipe Claude wrote into one the app can trust.

   The failure this guards against really happened: Claude put "80 g tonno al naturale sgocciolato"
   into the quantity field and left the name and the per-100 g values empty, so a tuna and bean
   salad was saved as 107 kcal with half a gram of protein. Nothing complained. So now an ingredient
   is either matched to the catalogue, or carries real nutrition, or the whole recipe is rejected
   and Claude is told why. */
(function () {
  // "80 g tonno al naturale sgocciolato" -> the catalogue's tuna. Longest match wins, so
  // "fagioli cannellini in scatola" beats a bare "fagioli".
  const fromCatalogue = (...texts) => {
    let best = null, bestLen = 0;
    for (const t of texts) {
      const hay = String(t || '').toLowerCase();
      if (hay.length < 4) continue;
      for (const id in CT.ING) {
        const g = CT.ING[id];
        for (const cand of [g.it, g.en]) {
          const c = String(cand || '').toLowerCase();
          if (c.length > 3 && c.length > bestLen && hay.includes(c)) { best = id; bestLen = c.length; }
        }
      }
    }
    return best;
  };
  const hasNutrition = (p) => (p.kcal > 0 || p.p > 0 || p.c > 0 || p.fat > 0);
  // A quantity that is only "80 g" adds nothing next to the grams the app already prints.
  const cleanDisp = (d) => {
    const s = String(d || '').trim();
    if (!s || /^\d+(?:[.,]\d+)?\s*(g|ml|gr|grammi)\.?$/i.test(s)) return undefined;
    return s.slice(0, 60);
  };

  CT.recipeFromAI = (o) => {
    if (!o || typeof o !== 'object' || !o.name || !Array.isArray(o.ingredients) || !Array.isArray(o.steps)) {
      throw { code: 'invalid_json', message: 'the reply was missing a name, ingredients or steps' };
    }
    const slots = (Array.isArray(o.slots) ? o.slots : ['L']).map((s) => String(s).toUpperCase()[0]).filter((s) => CT.SLOTS[s]);
    const needs = (Array.isArray(o.needs) ? o.needs : []).map(String).filter((n) => ['stove', 'oven', 'microwave', 'blender'].includes(n));
    const num = (v) => Math.max(0, Number(v) || 0);
    const bad = [];

    const ing = o.ingredients.map((x) => {
      if (!x || typeof x !== 'object') return null;
      const g = Math.max(0, Number(x.g) || 0);
      if (!g) { bad.push('an ingredient with no weight in grams'); return null; }
      if (x.id && CT.ING[x.id]) return [x.id, g, cleanDisp(x.disp), !!x.opt];

      const per100 = x.per100 || {};
      const nutri = { kcal: num(per100.kcal), p: num(per100.p), c: num(per100.c), fib: num(per100.fib), fat: num(per100.fat), sf: num(per100.sf), sug: num(per100.sug), na: num(per100.na) };
      const named = String(x.name || '').trim();

      // No usable nutrition: try to recognise it from the catalogue before giving up.
      if (!hasNutrition(nutri) || !named || named.toLowerCase() === 'ingredient') {
        const guess = fromCatalogue(x.id, named, x.it, x.disp);
        if (guess) return [guess, g, cleanDisp(x.disp), !!x.opt];
        bad.push(`"${(named || x.disp || 'unnamed').toString().slice(0, 40)}" has no nutrition values and matches nothing in the catalogue`);
        return null;
      }
      return { name: named.slice(0, 60), it: String(x.it || '').slice(0, 60), g, disp: cleanDisp(x.disp), aisle: CT.AISLES.includes(x.aisle) ? x.aisle : 'Canned & dry',
        per100: nutri, price: num(x.price) || 5, flags: String(x.flags || '').replace(/[^FSEDGNYZMRIL]/g, ''),
        pur: CT.clamp(Math.round(num(x.pur)), 0, 3), o3: num(x.o3), tag: '' };
    }).filter(Boolean);

    if (bad.length) throw { code: 'invalid_json', message: 'these ingredients could not be used: ' + bad.join('; ') + '. Give every ingredient either an "id" from the catalogue or a "name" plus real per-100 g values.' };
    if (!ing.length) throw { code: 'invalid_json', message: 'no usable ingredients' };

    const steps = o.steps.map((s) => String(s).slice(0, 300)).slice(0, 12);
    const r = {
      id: 'custom_' + CT.uid(), custom: true, created: CT.today(),
      name: String(o.name).slice(0, 90), it: String(o.it || '').slice(0, 90),
      slots: slots.length ? slots : ['L'], time: CT.clamp(Math.round(Number(o.time) || 15), 1, 120),
      active: CT.clamp(Math.round(Number(o.active) || Number(o.time) || 10), 1, 120),
      needs, tags: ['custom', ...(Array.isArray(o.tags) ? o.tags.map(String).slice(0, 6) : [])],
      ing, steps, note: o.note ? String(o.note).slice(0, 240) : '',
    };
    // Recipes are requested in Italian, so the steps double as the Italian version and the recipe
    // still reads correctly if the language is switched back to English.
    if (CT.recipeLang() === 'it') { r.stepsIt = steps; if (r.note) r.noteIt = r.note; }

    // Last line of defence: a plate that computes to almost nothing is a parsing failure, not a meal.
    const check = CT.prepRecipe(JSON.parse(JSON.stringify(r)));
    if (check.nutri.kcal < 60) throw { code: 'invalid_json', message: `the ingredients add up to only ${Math.round(check.nutri.kcal)} kcal, so the quantities or the nutrition values are wrong` };
    return r;
  };
})();
