/* Meal planner: filters recipes by preferences and kitchen, scores them against the health focus,
   assembles balanced days and keeps a weekly rhythm (fish twice, purine-rich once, red meat once). */
(function () {
  const FOCUS_W = { ldl: 1, tg: 1, liver: 0.8, uric: 0.8, glucose: 0.6, thyroid: 0.5 };
  const SEASON = { cherries_bowl: [5, 6, 7] };
  const WEIGHTS = [0.45, 0.25, 0.18, 0.12];

  /* How long a given meal may take. A slot can be set to "assemble only", which means no heat at
     all and about five minutes: the answer to not wanting to cook twice a day. */
  CT.slotLimit = (slot) => {
    const p = CT.state.prefs, v = (p.slotTime || {})[slot];
    if (p.lazy) return { max: 10, noCook: true, micro: true };
    if (v === 'nocook') return { max: 6, noCook: true, micro: false };
    return { max: Number(v) || Number(p.maxActive) || 15, noCook: false, micro: true };
  };

  CT.candidates = (slot, date) => {
    const p = CT.state.prefs, today = CT.today();
    const lim = CT.slotLimit(slot);
    const maxActive = lim.max;
    const month = CT.parseISO(date).getMonth() + 1;
    return CT.recipes().filter((r) => {
      if (!r.slots.includes(slot)) return false;
      if (slot === 'S' && r.nutri.kcal > 320) return false;
      if (slot !== 'S' && r.nutri.kcal < 250) return false;
      if (r.mins > maxActive) return false;
      if (lim.noCook && !(r.tags.includes('nocook') || (lim.micro && r.tags.includes('micro')))) return false;
      if (!r.needs.every((n) => n === 'kettle' || p.equipment[n])) return false;
      if (r.allergens.some((a) => p.allergens.includes(a))) return false;
      if (p.diet === 'veg' && !r.veg) return false;
      if (p.diet === 'pesc' && r.meat) return false;
      if (r.foods.some((f) => p.likes[f] === -1)) return false;
      if (p.budget === 'low' && r.cost > 3.2) return false;
      if (r.tags.includes('ahead') && date <= today) return false;
      if (SEASON[r.id] && !SEASON[r.id].includes(month)) return false;
      return true;
    });
  };

  // What happened around this date: recency of each recipe and weekly counts of capped categories.
  CT.planContext = (date) => {
    const today = CT.today();
    const ctx = { lastUsed: {}, fish: 0, redmeat: 0, purine3: 0, occasional: 0, eggs: 0, nonItalian: 0, chicken: 0, bready: 0 };
    for (let i = 1; i <= 6; i++) {
      const plan = CT.state.plans[CT.addDays(date, -i)];
      if (!plan) continue;
      for (const slot of CT.SLOT_ORDER) {
        const s = plan[slot]; if (!s) continue;
        ctx.lastUsed[s.id] = Math.max(ctx.lastUsed[s.id] || 0, 7 - i);
      }
    }
    let weekStart = today;
    if (CT.daysBetween(today, date) > 6) weekStart = CT.addDays(date, -6);
    for (let i = 0; i < 7; i++) {
      const d = CT.addDays(weekStart, i);
      if (d === date) continue;
      const plan = CT.state.plans[d]; if (!plan) continue;
      for (const slot of CT.SLOT_ORDER) {
        const s = plan[slot]; if (!s) continue;
        const r = CT.recipe(s.id); if (!r) continue;
        if (r.fish) ctx.fish++;
        if (r.redmeat) ctx.redmeat++;
        if (r.purine >= 3) ctx.purine3++;
        if (r.tags.includes('occasional')) ctx.occasional++;
        if (r.eggs) ctx.eggs++;
        if (!r.italian) ctx.nonItalian++;
        if (r.mainProtein === 'chicken') ctx.chicken++;
        if (r.bready) ctx.bready++;
      }
    }
    return ctx;
  };

  const dayAcc = () => ({ ids: new Set(), proteins: new Set(), fish: 0, redmeat: 0, purine3: 0, occasional: 0, eggs: 0, nonItalian: 0, chicken: 0, bready: 0, legume: false, pasta: false, sandwich: false });
  const addToDay = (day, r) => {
    day.ids.add(r.id);
    if (r.mainProtein) day.proteins.add(r.mainProtein);
    if (r.fish) day.fish++; if (r.redmeat) day.redmeat++; if (r.purine >= 3) day.purine3++;
    if (r.tags.includes('occasional')) day.occasional++; if (r.eggs) day.eggs++;
    if (!r.italian) day.nonItalian++;
    if (r.mainProtein === 'chicken') day.chicken++;
    if (r.bready) day.bready++;
    if (r.legume) day.legume = true; if (r.tags.includes('pasta')) day.pasta = true; if (r.tags.includes('sandwich')) day.sandwich = true;
  };

  CT.scoreRecipe = (r, slot, ctx, day, jitter = true) => {
    const s = CT.state, p = s.prefs;
    let sc = 0;
    for (const f in FOCUS_W) if (s.focus[f]) sc += (r.benefits[f] || 0) * FOCUS_W[f] * 0.8;
    const liked = r.foods.filter((f) => p.likes[f] === 1).length;
    sc += Math.min(3, liked) * 1.2;
    if (s.favorites.includes(r.id)) sc += 1.5;
    const rt = s.ratings[r.id];
    if (rt >= 4) sc += 1; if (rt && rt <= 2) sc -= 3;
    // How recently this exact recipe was eaten, 6 for yesterday down to 1 for six days ago. Scaling
    // it keeps a small pool rotating instead of settling on one favourite.
    const rec = ctx.lastUsed[r.id] || 0;
    sc -= rec * 1.6;
    if (day.ids.has(r.id)) sc -= 8;
    if (r.mainProtein && day.proteins.has(r.mainProtein)) sc -= (r.mainProtein === 'chicken' && (Number(p.chickenPerWeek) || 0) >= 8) ? 0 : 3;
    if (r.fish) { const f = ctx.fish + day.fish; sc += f < 2 ? 5 : f >= 3 ? -1.5 : 0; }
    const chickenCap = Number(p.chickenPerWeek) || 0;
    if (chickenCap && r.mainProtein === 'chicken') {
      // Wanted often, but never at the cost of the week's fish, and never past the dial.
      sc += (ctx.chicken + day.chicken) < chickenCap ? 4.5 : -14;
    }
    if (r.legume && !day.legume) sc += (Number(p.chickenPerWeek) || 0) >= 7 ? 2.5 : 1.5;
    if (r.eggs && day.eggs) sc -= 6;
    if (r.eggs && ctx.eggs + day.eggs >= 4) sc -= 3;
    if (r.purine >= 3 && ctx.purine3 + day.purine3 >= 1) sc -= 20;
    if (r.redmeat && ctx.redmeat + day.redmeat >= 1) sc -= 20;
    if (r.tags.includes('occasional') && ctx.occasional + day.occasional >= 1) sc -= 20;
    if (r.tags.includes('pasta') && day.pasta) sc -= 10;
    if (r.tags.includes('sandwich') && day.sandwich) sc -= 2;
    // Bread is the quiet source of sodium in an Italian day, so it should not be in every meal.
    if (r.bready) { const b = ctx.bready + day.bready; if (b >= 7) sc -= 6; else if (b >= 5) sc -= 2.5; }
    if (p.cuisine !== 'any') {
      // "Italian first": the rest of the world still appears, but rarely and never twice in a day.
      // Where a slot has few Italian options, the preference softens rather than starving the slot.
      if (ctx.scarce && ctx.scarce[slot]) sc += r.italian ? 1.5 : 0;
      else if (r.italian) sc += 3.5;
      else sc -= 5 + (ctx.nonItalian || 0) * 2 + day.nonItalian * 9;
    }
    sc += Math.max(0, 15 - r.mins) * 0.04;
    sc -= Math.max(0, r.cost - 3) * 0.4;
    if (jitter) sc += Math.random() * 2 - 1;
    return sc;
  };

  const weightedIndex = (n) => {
    const w = WEIGHTS.slice(0, n), total = w.reduce((a, b) => a + b, 0);
    let x = Math.random() * total;
    for (let i = 0; i < w.length; i++) { x -= w[i]; if (x <= 0) return i; }
    return 0;
  };

  // In clock order, so a 2AM meal sits at the end of its day rather than the start.
  CT.enabledSlots = () => CT.SLOT_ORDER.filter((s) => CT.state.prefs.meals[s]).sort((a, b) => CT.slotCfg(a).minutes - CT.slotCfg(b).minutes);

  /* Portions. A recipe is written as one sensible serving, but a day's calorie target depends on
     the person and on how many meals they eat. With breakfast switched off, three standard plates
     cannot reach a 2000+ kcal target, so each slot carries a multiplier: the same dish, a bigger or
     smaller plate. Slots get their share of the target (lunch is the biggest, a snack the smallest),
     then the remaining gap is closed one quarter-portion at a time. */
  const PORTION_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5];
  CT.PORTION_STEPS = PORTION_STEPS;
  const nearestStep = (x) => PORTION_STEPS.reduce((a, b) => (Math.abs(b - x) < Math.abs(a - x) ? b : a), PORTION_STEPS[0]);

  /* A meat or fish plate is not stretched as far as a plant one: growing a 150 g chicken breast to
     260 g adds purines the uric acid does not need, so those meals cap lower and the remaining
     calories go to the vegetables, grains and legumes on the rest of the day. */
  const maxPortionFor = (r) => (r.animalG >= 140 ? 1.5 : r.animalG >= 80 ? 1.75 : 2.5);
  const stepsFor = (r) => PORTION_STEPS.filter((x) => x <= maxPortionFor(r));

  CT.fitPortions = (chosen, fixed) => {
    const T = CT.targets();
    const active = Object.keys(chosen).filter((s) => chosen[s]);
    if (!active.length) return {};
    const shareTot = active.reduce((a, s) => a + (CT.slotCfg(s).share || 0.25), 0);
    const mult = {}, steps = {};
    for (const s of active) steps[s] = stepsFor(chosen[s]);
    for (const s of active) {
      if (fixed && fixed[s] != null) { mult[s] = fixed[s]; continue; }
      const want = T.kcal * ((CT.slotCfg(s).share || 0.25) / shareTot);
      const ideal = want / Math.max(80, chosen[s].nutri.kcal);
      mult[s] = steps[s].reduce((a, b) => (Math.abs(b - ideal) < Math.abs(a - ideal) ? b : a), steps[s][0]);
    }
    const total = () => active.reduce((a, s) => a + chosen[s].nutri.kcal * mult[s], 0);
    for (let i = 0; i < 16; i++) {
      const t = total();
      if (Math.abs(t - T.kcal) <= T.kcal * 0.04) break;
      const up = t < T.kcal;
      let best = null, bestErr = Math.abs(t - T.kcal);
      for (const s of active) {
        if (fixed && fixed[s] != null) continue;
        const list = steps[s];
        const ni = list.indexOf(mult[s]) + (up ? 1 : -1);
        if (ni < 0 || ni >= list.length) continue;
        const err = Math.abs(t + chosen[s].nutri.kcal * (list[ni] - mult[s]) - T.kcal);
        if (err < bestErr - 0.5) { bestErr = err; best = [s, list[ni]]; }
      }
      if (!best) break;
      mult[best[0]] = best[1];
    }
    return mult;
  };

  // Recompute portions for a day after a meal changed, leaving hand-set ones alone.
  CT.autoPortion = () => !!(CT.state.prefs && CT.state.prefs.autoPortion);

  // `force` runs the fit even when automatic sizing is off, for the "Fit portions" button.
  CT.refitDay = (date, force) => {
    const plan = CT.state.plans[date]; if (!plan) return;
    const chosen = {}, fixed = {};
    for (const s of CT.enabledSlots()) {
      const p = plan[s]; const r = p && CT.recipe(p.id); if (!r) continue;
      chosen[s] = r;
      if (p.manual || p.done) fixed[s] = p.mult || 1;
    }
    if (!force && !CT.autoPortion()) {
      // Portions stay as the recipe is written; only what you set by hand keeps its size.
      for (const s in chosen) if (fixed[s] == null) plan[s].mult = 1;
      return;
    }
    const mult = CT.fitPortions(chosen, fixed);
    for (const s in mult) plan[s].mult = mult[s];
  };

  // Applied at startup so the setting also governs a week that was planned earlier.
  CT.normalisePortions = () => {
    if (CT.autoPortion()) return false;
    let changed = false;
    for (const date in CT.state.plans) {
      const plan = CT.state.plans[date];
      for (const s of CT.SLOT_ORDER) {
        const p = plan[s];
        if (p && !p.manual && (p.mult || 1) !== 1) { p.mult = 1; changed = true; }
      }
    }
    if (changed) CT.save('plans');
    return changed;
  };

  CT.setPortion = (date, slot, mult) => {
    const plan = CT.state.plans[date]; if (!plan || !plan[slot]) return;
    plan[slot].mult = CT.clamp(mult, PORTION_STEPS[0], PORTION_STEPS[PORTION_STEPS.length - 1]);
    plan[slot].manual = true;
    CT.save('plans');
  };

  CT.generateDay = (date, opts = {}) => {
    const slots = CT.enabledSlots();
    const ctx = CT.planContext(date);
    const existing = CT.state.plans[date] || {};
    const locked = {};
    for (const s of slots) if (existing[s] && existing[s].locked && opts.keepLocked !== false) locked[s] = existing[s];
    if (opts.keepDone) for (const s of slots) if (existing[s] && existing[s].done) locked[s] = existing[s];
    const cands = {};
    for (const s of slots) cands[s] = CT.candidates(s, date);
    ctx.scarce = {};
    for (const s of slots) ctx.scarce[s] = cands[s].filter((r) => r.italian).length < 4;
    const T = CT.targets();
    let best = null, bestScore = -Infinity;
    for (let attempt = 0; attempt < 24; attempt++) {
      const day = dayAcc(), chosen = {};
      let total = 0;
      for (const s of slots) if (locked[s]) { const r = CT.recipe(locked[s].id); if (r) { addToDay(day, r); chosen[s] = r; } }
      for (const s of slots) {
        if (chosen[s]) continue;
        const scored = cands[s].map((r) => ({ r, sc: CT.scoreRecipe(r, s, ctx, day) })).sort((a, b) => b.sc - a.sc);
        if (!scored.length) continue;
        const top = scored.slice(0, 4);
        const pick = top[weightedIndex(top.length)];
        chosen[s] = pick.r; addToDay(day, pick.r); total += pick.sc;
      }
      const fixedMult = {};
      for (const s of slots) if (locked[s] && locked[s].mult) fixedMult[s] = locked[s].mult;
      let mult;
      if (CT.autoPortion()) {
        mult = CT.fitPortions(chosen, fixedMult);
      } else {
        // Portions as written. The day is then judged on the plates themselves, so the planner
        // leans towards fuller ones without being able to stretch them.
        mult = {};
        for (const s of slots) if (chosen[s]) mult[s] = fixedMult[s] != null ? fixedMult[s] : 1;
      }
      const n = CT.sumNutriScaled(chosen, mult);
      let pen = 0;
      const dev = Math.abs(n.kcal - T.kcal) / T.kcal;
      const devFree = CT.autoPortion() ? 0.06 : 0.15;
      if (dev > devFree) pen += (dev - devFree) * (CT.autoPortion() ? 90 : 35);
      // Prefer plates that land near their natural size over ones stretched or shrunk hard.
      for (const s of slots) if (mult[s]) pen += Math.abs(Math.log(mult[s])) * 6;
      pen += Math.max(0, n.sf - T.sf) * 2.5;
      pen += Math.max(0, T.fib - n.fib) * 0.4;
      pen += Math.max(0, n.na - 2300) / 150;
      pen += Math.max(0, T.p * 0.8 - n.p) * 0.25;
      pen += Math.max(0, n.sug - T.sug) * 0.3;
      if (day.purine3 > 1) pen += 15;
      // Uric acid: keep the day's meat and fish near a sensible total even when portions scale up.
      let animal = 0;
      for (const s of slots) if (chosen[s]) animal += (chosen[s].animalG || 0) * (mult[s] || 1);
      pen += Math.max(0, animal - 200) * 0.09;
      const score = total - pen;
      if (score > bestScore) { bestScore = score; best = { chosen, day, mult }; }
    }
    if (!best) return null;
    const plan = {};
    for (const s of slots) {
      const r = best.chosen[s];
      if (!r) continue;
      const dayMinus = dayAcc();
      for (const s2 of slots) if (s2 !== s && best.chosen[s2]) addToDay(dayMinus, best.chosen[s2]);
      const alts = cands[s].filter((x) => x.id !== r.id && !best.day.ids.has(x.id))
        .map((x) => ({ x, sc: CT.scoreRecipe(x, s, ctx, dayMinus) })).sort((a, b) => b.sc - a.sc).slice(0, 6).map((a) => a.x.id);
      const prev = existing[s];
      plan[s] = { id: r.id, alts, mult: best.mult[s] || 1, done: !!(prev && prev.id === r.id && prev.done), locked: !!locked[s] && !!(prev && prev.locked) };
    }
    CT.state.plans[date] = plan;
    return plan;
  };

  CT.ensurePlan = (date) => {
    const plan = CT.state.plans[date];
    const slots = CT.enabledSlots();
    if (plan && slots.every((s) => plan[s] && CT.recipe(plan[s].id))) return plan;
    if (plan) { for (const s of slots) if (!plan[s] || !CT.recipe(plan[s].id)) { const p2 = CT.generateDay(date, { keepDone: true }); Object.assign(plan, { [s]: p2[s] }); } CT.save('plans'); return CT.state.plans[date]; }
    const p = CT.generateDay(date);
    CT.save('plans');
    return p;
  };

  CT.generateWeek = (from, days = 7, opts = {}) => {
    for (let i = 0; i < days; i++) CT.generateDay(CT.addDays(from, i), opts);
    CT.save('plans');
  };

  CT.swapSlot = (date, slot) => {
    const plan = CT.state.plans[date]; if (!plan || !plan[slot]) return;
    const s = plan[slot];
    if (!s.alts || !s.alts.length) {
      const ctx = CT.planContext(date), day = dayAcc();
      for (const s2 of CT.SLOT_ORDER) if (s2 !== slot && plan[s2]) { const r2 = CT.recipe(plan[s2].id); if (r2) addToDay(day, r2); }
      s.alts = CT.candidates(slot, date).filter((x) => x.id !== s.id).map((x) => ({ x, sc: CT.scoreRecipe(x, slot, ctx, day) })).sort((a, b) => b.sc - a.sc).slice(0, 6).map((a) => a.x.id);
    }
    if (!s.alts.length) { CT.toast('No other recipe fits this slot with your current filters'); return; }
    const next = s.alts.shift();
    s.alts.push(s.id);
    s.id = next; s.done = false; s.manual = false;
    CT.refitDay(date);
    CT.save('plans');
  };

  CT.setSlot = (date, slot, id) => {
    CT.state.plans[date] = CT.state.plans[date] || {};
    const plan = CT.state.plans[date];
    const prev = plan[slot];
    const alts = (prev ? prev.alts : []).filter((x) => x !== id);
    if (prev && prev.id !== id) alts.unshift(prev.id);
    plan[slot] = { id, alts: alts.slice(0, 6), mult: prev && prev.manual ? prev.mult : 1, manual: !!(prev && prev.manual), done: false, locked: prev ? prev.locked : false };
    CT.refitDay(date);
    CT.save('plans');
  };

  CT.slotChoices = (date, slot) => {
    const plan = CT.state.plans[date] || {};
    const ctx = CT.planContext(date), day = dayAcc();
    for (const s2 of CT.SLOT_ORDER) if (s2 !== slot && plan[s2]) { const r2 = CT.recipe(plan[s2].id); if (r2) addToDay(day, r2); }
    return CT.candidates(slot, date).map((x) => ({ r: x, sc: CT.scoreRecipe(x, slot, ctx, day, false) })).sort((a, b) => b.sc - a.sc);
  };

  // Match score for the recipe browser (0-100), preference and focus based, no context.
  CT.matchScore = (r) => {
    const s = CT.state, p = s.prefs;
    const active = Object.keys(FOCUS_W).filter((f) => s.focus[f]);
    const wsum = active.reduce((a, f) => a + FOCUS_W[f], 0) || 1;
    const health = active.reduce((a, f) => a + Math.max(0, r.benefits[f] || 0) / 3 * FOCUS_W[f], 0) / wsum; // 0..1
    let sc = 35 + health * 45;
    sc += Math.min(20, r.foods.filter((f) => p.likes[f] === 1).length * 7);
    if (s.favorites.includes(r.id)) sc += 8;
    const rt = s.ratings[r.id]; if (rt >= 4) sc += 5; if (rt && rt <= 2) sc -= 15;
    sc += Math.max(0, 15 - r.mins) * 0.4;
    sc -= Math.max(0, r.cost - 3) * 3;
    if (r.purine >= 3 || r.tags.includes('occasional')) sc -= 8;
    return CT.clamp(Math.round(sc), 5, 100);
  };
})();
