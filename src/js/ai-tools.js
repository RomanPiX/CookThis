/* Page functions Claude may call while answering in the chat.
   Reads are cheap; the two writers change the plan, and because the shopping list is generated
   from the plan it updates with them. Every write is recorded so the chat can offer a one-tap undo. */
(function () {
  // This file loads before the views, which are where these namespaces are normally created.
  CT.ui = CT.ui || {}; CT.actions = CT.actions || {};
  const resolveDate = (v) => {
    const s = String(v == null ? '' : v).trim().toLowerCase();
    if (!s || s === 'today') return CT.today();
    if (s === 'tomorrow') return CT.addDays(CT.today(), 1);
    if (s === 'yesterday') return CT.addDays(CT.today(), -1);
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    for (let i = 0; i < 7; i++) { const d = CT.addDays(CT.today(), i); if (CT.fmtDate(d, 'day').toLowerCase() === s) return d; }
    throw new Error('Unknown date "' + v + '". Use YYYY-MM-DD, "today", "tomorrow" or a weekday name within the next week.');
  };
  const SLOT_WORDS = { BREAKFAST: 'B', COLAZIONE: 'B', LUNCH: 'L', PRANZO: 'L', DINNER: 'D', CENA: 'D', SNACK: 'S', SPUNTINO: 'S' };
  const resolveSlot = (v) => {
    const s = String(v == null ? '' : v).trim().toUpperCase();
    const k = SLOT_WORDS[s] || s[0];
    if (!CT.SLOTS[k]) throw new Error('slot must be breakfast, lunch, dinner or snack');
    return k;
  };
  const dayTotals = (date) => {
    const n = CT.dayNutri(date).planned, T = CT.targets();
    return { kcal: Math.round(n.kcal), target_kcal: T.kcal, protein_g: Math.round(n.p), fibre_g: Math.round(n.fib),
      saturated_fat_g: +n.sf.toFixed(1), sugars_g: Math.round(n.sug), sodium_mg: Math.round(n.na),
      omega3_g: +n.o3.toFixed(1), cost_eur: +n.cost.toFixed(2) };
  };
  const brief = (r) => ({ id: r.id, name: CT.rName(r), meals: r.slots.map((s) => CT.SLOTS[s].en), hands_on_min: r.active,
    total_min: r.time, kcal: Math.round(r.nutri.kcal), fibre_g: Math.round(r.nutri.fib),
    saturated_fat_g: +r.nutri.sf.toFixed(1), cost_eur: +r.cost.toFixed(2), tags: r.tags });

  CT.ui.planEdits = CT.ui.planEdits || [];
  const noteEdit = (date, slot, prevId, r) => {
    CT.ui.planEdits.push({ date, slot, prevId, newId: r.id, newName: CT.rName(r) });
    CT.toast(CT.SLOTS[slot].en + ' ' + CT.relDay(date).toLowerCase() + ': ' + CT.rName(r), 'good');
  };
  const guardCooked = (date, slot) => {
    const s = (CT.state.plans[date] || {})[slot];
    if (s && s.done) throw new Error('The ' + CT.SLOTS[slot].en.toLowerCase() + ' on ' + date + ' is already marked as cooked, so it must not be replaced. Pick another slot, or ask the person first.');
  };

  CT.aiTools = () => [
    {
      name: 'get_plan',
      description: 'Read what is currently planned. Returns one entry per planned meal with its date, meal slot, recipe id and name, hands-on minutes, calories, and whether it is already cooked or locked. Call it before changing anything.',
      inputSchema: { type: 'object', properties: { days: { type: 'number', description: 'How many days from today, 1-7. Default 7.' } } },
      execute: ({ days }) => {
        const n = Math.max(1, Math.min(7, Number(days) || 7));
        const meals = [];
        for (let i = 0; i < n; i++) {
          const d = CT.addDays(CT.today(), i), plan = CT.ensurePlan(d);
          for (const s of CT.enabledSlots()) {
            const p = plan[s], r = p && CT.recipe(p.id); if (!r) continue;
            meals.push({ date: d, when: CT.relDay(d), slot: CT.SLOTS[s].en, recipeId: r.id, name: CT.rName(r),
              hands_on_min: r.active, portion: p.mult || 1, kcal: Math.round(r.nutri.kcal * (p.mult || 1)),
              cooked: !!p.done, locked: !!p.locked });
          }
        }
        return { today: CT.today(), meals };
      },
    },
    {
      name: 'get_recipe',
      description: 'Read one recipe in full: ingredients in grams with their catalogue ids, method steps, nutrition per serving and cost. Call it before adapting a recipe, so the variant keeps everything that was not asked to change.',
      inputSchema: { type: 'object', properties: { recipeId: { type: 'string' } }, required: ['recipeId'] },
      execute: ({ recipeId }) => {
        const r = CT.recipe(String(recipeId || ''));
        if (!r) throw new Error('No recipe with id "' + recipeId + '".');
        return {
          id: r.id, name: CT.rName(r), en: r.name, it: r.it, slots: r.slots, time: r.time, active: r.active, needs: r.needs, tags: r.tags,
          ingredients: r.ings.map((i) => ({ id: i.id, name: CT.ingNames(i).primary, en: i.en, g: i.g, disp: CT.dispText(i), optional: i.opt })),
          steps: CT.rSteps(r), note: CT.rNote(r),
          nutrition: { kcal: Math.round(r.nutri.kcal), protein_g: Math.round(r.nutri.p), fibre_g: +r.nutri.fib.toFixed(1),
            saturated_fat_g: +r.nutri.sf.toFixed(1), sugars_g: Math.round(r.nutri.sug), sodium_mg: Math.round(r.nutri.na),
            omega3_g: +r.nutri.o3.toFixed(2) },
          cost_eur: +r.cost.toFixed(2),
        };
      },
    },
    {
      name: 'find_recipes',
      description: 'Search the recipe library by words in the name or ingredients, filtered by meal slot and hands-on time. Returns up to 12 compact matches with their ids, best fit first, already excluding this person’s dislikes and allergens. Use it to get a recipeId for set_meal.',
      inputSchema: { type: 'object', properties: {
        query: { type: 'string', description: 'Words to match in the name or ingredients, English or Italian. Optional.' },
        slot: { type: 'string', description: 'breakfast, lunch, dinner or snack. Optional.' },
        maxActiveMinutes: { type: 'number' }, limit: { type: 'number' } } },
      execute: ({ query, slot, maxActiveMinutes, limit }) => {
        const q = String(query || '').trim().toLowerCase();
        const sl = slot ? resolveSlot(slot) : null;
        const maxMin = Number(maxActiveMinutes) || 0;
        const list = CT.recipes().filter((r) => {
          if (sl && !r.slots.includes(sl)) return false;
          if (maxMin && r.active > maxMin) return false;
          if (r.allergens.some((a) => CT.state.prefs.allergens.includes(a))) return false;
          if (r.foods.some((f) => CT.state.prefs.likes[f] === -1)) return false;
          if (!q) return true;
          return r.name.toLowerCase().includes(q) || (r.it || '').toLowerCase().includes(q)
            || r.ings.some((i) => i.en.toLowerCase().includes(q) || i.it.toLowerCase().includes(q));
        }).sort((a, b) => CT.matchScore(b) - CT.matchScore(a)).slice(0, Math.max(1, Math.min(12, Number(limit) || 12)));
        return { count: list.length, recipes: list.map(brief) };
      },
    },
    {
      name: 'set_meal',
      description: 'Put an existing recipe into a day and meal slot, replacing what was there. The shopping list is generated from the plan, so it updates too. Returns the day totals after the change.',
      inputSchema: { type: 'object', properties: {
        date: { type: 'string', description: 'YYYY-MM-DD, "today", "tomorrow" or a weekday name.' },
        slot: { type: 'string', description: 'breakfast, lunch, dinner or snack' },
        recipeId: { type: 'string' },
        portion: { type: 'number', description: 'Optional portion multiplier, for example 1.5 for a bigger plate. Leave it out and the app sizes the day to the calorie target itself.' } },
        required: ['date', 'slot', 'recipeId'] },
      execute: ({ date, slot, recipeId, portion }) => {
        const d = resolveDate(date), sl = resolveSlot(slot);
        const r = CT.recipe(String(recipeId || ''));
        if (!r) throw new Error('No recipe with id "' + recipeId + '". Call find_recipes first and use an id it returned.');
        guardCooked(d, sl);
        const prev = (CT.state.plans[d] || {})[sl];
        const prevName = prev ? (CT.recipe(prev.id) ? CT.rName(CT.recipe(prev.id)) : null) : null;
        CT.setSlot(d, sl, r.id);
        if (Number(portion) > 0) CT.setPortion(d, sl, Number(portion));
        noteEdit(d, sl, prev ? prev.id : null, r);
        return { ok: true, date: d, slot: CT.SLOTS[sl].en, planned: CT.rName(r), replaced: prevName,
          portion: (CT.state.plans[d][sl] || {}).mult || 1, day_totals: dayTotals(d), shopping_list_updated: true };
      },
    },
    {
      name: 'save_recipe_and_plan',
      description: 'Save a new or adapted recipe to the person’s own recipes and optionally plan it for a day and meal slot. Use it to act on a refinement, for example the same dish without an ingredient they dislike. Returns the saved recipe with its computed nutrition and cost.',
      inputSchema: { type: 'object', properties: {
        recipe: { type: 'object', description: 'One serving. Fields: name, it (Italian name), slots (array of B/L/D/S), time, active, needs (stove/oven/microwave/blender), tags, steps (array of strings), note, and ingredients: an array of {id, g, disp} using catalogue ids where the ingredient exists, otherwise {name, it, g, disp, aisle, price, flags, per100:{kcal,p,c,fib,fat,sf,sug,na}}.' },
        date: { type: 'string', description: 'Optional. Plan it for this day.' },
        slot: { type: 'string', description: 'Optional. breakfast, lunch, dinner or snack.' } }, required: ['recipe'] },
      execute: ({ recipe, date, slot }) => {
        let r;
        try { r = CT.recipeFromAI(recipe); }
        catch (e) { throw new Error('That recipe could not be read: ' + ((e && e.message) || 'check the ingredients array and the required fields') + '.'); }
        CT.state.custom.push(r);
        CT.save('custom');
        const p = CT.prepRecipe(r);
        const res = { ok: true, recipeId: p.id, name: p.name, kcal: Math.round(p.nutri.kcal),
          fibre_g: +p.nutri.fib.toFixed(1), saturated_fat_g: +p.nutri.sf.toFixed(1), cost_eur: +p.cost.toFixed(2), planned: false };
        if (date && slot) {
          const d = resolveDate(date), sl = resolveSlot(slot);
          guardCooked(d, sl);
          const prev = (CT.state.plans[d] || {})[sl];
          res.replaced = prev ? (CT.recipe(prev.id) || {}).name : null;
          CT.setSlot(d, sl, p.id);
          noteEdit(d, sl, prev ? prev.id : null, p);
          res.planned = true; res.date = d; res.slot = CT.SLOTS[sl].en;
          res.day_totals = dayTotals(d); res.shopping_list_updated = true;
        }
        return res;
      },
    },
    {
      name: 'get_shopping_list',
      description: 'The shopping list generated from the current plan, grouped by supermarket aisle, with Italian names and quantities. Meals already cooked are left out. Use it to answer what to buy, or to show what a change added.',
      inputSchema: { type: 'object', properties: { days: { type: 'number', description: 'How many days from today, 1-7. Default 7.' } } },
      execute: ({ days }) => {
        const n = Math.max(1, Math.min(7, Number(days) || 7));
        const dates = Array.from({ length: n }, (_, i) => CT.addDays(CT.today(), i));
        const { items, cost } = CT.shoppingList(dates);
        const aisles = {};
        for (const it of items) {
          if (it.pantry) continue;
          (aisles[it.aisle] = aisles[it.aisle] || []).push(it.en + ' (' + it.it + ') - ' + CT.qtyText(it));
        }
        return { days: n, approx_cost_eur: +cost.toFixed(2), aisles };
      },
    },
  ];

  // ---- Undo for whatever Claude changed in this session
  CT.actions['ai-undo-plan'] = () => {
    const edits = CT.ui.planEdits || [];
    for (let i = edits.length - 1; i >= 0; i--) {
      const e = edits[i];
      if (e.prevId && CT.recipe(e.prevId)) CT.setSlot(e.date, e.slot, e.prevId);
      else if (CT.state.plans[e.date]) delete CT.state.plans[e.date][e.slot];
    }
    CT.save('plans');
    CT.ui.planEdits = [];
    CT.toast('Plan put back the way it was.');
    CT.render();
  };
  CT.actions['ai-keep-plan'] = () => { CT.ui.planEdits = []; CT.render(); };
})();
