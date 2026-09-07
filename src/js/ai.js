/* Claude integration through the Artifact `sample` capability (viewer's own account).
   Every feature checks availability and degrades to a friendly note elsewhere. */
CT.ai = {
  _sample: undefined,
  _limits: null,
  async get() {
    if (this._sample !== undefined) return this._sample;
    if (!(window.claude && typeof window.claude.use === 'function')) { this._sample = null; return null; }
    try { this._sample = await window.claude.use('sample'); } catch (e) { this._sample = null; }
    if (this._sample) { try { this._limits = await this._sample.limits(); } catch (e) { this._limits = null; } }
    return this._sample;
  },
  available() { return !!this._sample; },
  canImages() { return !!(this._limits && this._limits.images); },

  errorCopy(e) {
    const code = e && e.code;
    if (code === 'not_granted') return 'Claude access was declined for this page. Reload and allow it to use these features.';
    if (code === 'rate_limited') return 'Too many requests right now. Give it a minute and try again.';
    if (code === 'cancelled') return 'Stopped.';
    if (code === 'invalid_json') return 'Claude answered in a shape the app could not read. Try again with a shorter request.';
    if (code === 'prompt_too_large') return 'That is too much text for one request. Shorten it.';
    if (code === 'images_unavailable' || code === 'image_rejected') return 'That image could not be used. Try a JPEG or PNG under 20 MB.';
    return 'Claude could not answer right now. Try again in a moment.';
  },

  // ---- Context the model needs: who the user is, what the blood test said, what is planned.
  RULES: `You are the built-in dietician assistant of CookThis, a meal-planning app used by ONE specific person whose profile follows. Be concise, practical, warm and a little witty. Use metric units and euros, and Italian supermarket products (pane integrale, fesa di tacchino, ricotta light, ceci in scatola...). Favour meals that are fast (under 15 minutes hands-on), cheap and lazy-cook friendly. Never suggest cured meats (salame, prosciutto, mortadella), processed cheese, sugary drinks or alcohol as options. You are not a doctor: for medication, diagnosis or thyroid treatment questions, give general information and point them to their doctor. Answer in English unless asked otherwise. Keep answers under 200 words unless the user asks for detail.

YOU CAN EDIT THE PLAN. The tools let you read the planned week and change what is planned. The shopping list is generated from the plan, so every change you make updates it automatically. Use them whenever the person asks for a different meal, a variation of one, or a fix to the week:
- To put an existing recipe in a slot: find_recipes, then set_meal.
- To adjust a recipe (drop an ingredient they dislike, swap the fish, halve it, make it vegetarian): get_recipe for the original, then save_recipe_and_plan with the modified version. Keep the parts that worked, change only what was asked, and give the variant a name that says what changed.
Portions: a recipe is one standard serving, and each planned meal carries a portion multiplier so the day reaches the calorie target. The app sets these itself, so do not pass a portion unless the person asks for a bigger or smaller plate. The kcal in get_plan already includes the portion.
Cuisine: they want the week to be mostly Italian. Prefer Italian dishes and Italian names, and reach outside Italy only when they ask for it.
Change only what was asked, one slot at a time, and never touch a meal already marked as cooked. After using tools, say in one or two sentences what you changed and that the shopping list now reflects it. If a request is ambiguous (which day? which meal?), ask first instead of guessing.`,

  context() {
    const s = CT.state, T = CT.targets(), today = CT.today();
    const p = s.profile;
    const labs = s.labs[s.labs.length - 1];
    const labLines = CT.LABS.map((l) => {
      const v = labs.values[l.id]; if (v == null) return null;
      const st = CT.labStatus(l, v);
      return `${l.name} ${v} ${l.unit}${st === 'high' ? ' (HIGH)' : st === 'low' ? ' (LOW)' : ''}`;
    }).filter(Boolean).join('; ');
    const focus = Object.keys(s.focus).filter((k) => s.focus[k]).map((k) => CT.FOCUS[k].name).join(', ');
    const likes = Object.entries(s.prefs.likes).filter(([, v]) => v === 1).map(([k]) => k).join(', ') || 'nothing marked yet';
    const dislikes = Object.entries(s.prefs.likes).filter(([, v]) => v === -1).map(([k]) => k).join(', ') || 'none';
    const allergens = s.prefs.allergens.map((a) => (CT.ALLERGENS.find((x) => x[0] === a) || [])[1]).filter(Boolean).join(', ') || 'none';
    const plan = s.plans[today] || {};
    const planLines = CT.SLOT_ORDER.filter((k) => plan[k]).map((k) => { const r = CT.recipe(plan[k].id); return r ? `${CT.SLOTS[k].en}: ${r.name}${plan[k].done ? ' (eaten)' : ''}` : null; }).filter(Boolean).join('; ') || 'nothing planned yet';
    const recent = [];
    for (let i = 1; i <= 7; i++) {
      const d = CT.addDays(today, -i), l = s.log[d]; if (!l) continue;
      const ids = Object.values(l.cooked || {}).map((id) => (CT.recipe(id) || {}).name).filter(Boolean);
      const extras = (l.extra || []).map((x) => x.name);
      const slips = (l.slips || []).map((x) => x.what);
      if (ids.length || extras.length || slips.length) recent.push(`${d}: cooked ${ids.join(', ') || '-'}${extras.length ? '; also ate ' + extras.join(', ') : ''}${slips.length ? '; slipped: ' + slips.join(', ') : ''}`);
    }
    const st = CT.stats();
    return `PROFILE: ${p.name ? p.name + ', ' : ''}${p.sex === 'f' ? 'female' : 'male'}, ${p.age} y, ${p.height} cm, ${p.weight} kg (BMI ${CT.fmt(T.bmi, 1)}), activity ${p.activity}, goal ${p.goal === 'lose' ? 'gentle weight loss' : 'maintain weight'}.
BLOOD TEST (${labs.date}): ${labLines}.
HEALTH FOCUS: ${focus}.
DAILY TARGETS: ${T.kcal} kcal, protein ${T.p} g, fibre ${T.fib} g, saturated fat under ${T.sf} g, total sugars under ${T.sug} g, sodium under ${T.na} mg, omega-3 about ${T.o3} g.
PREFERENCES: likes ${likes}; dislikes ${dislikes}; allergies/intolerances ${allergens}; diet ${s.prefs.diet}; max hands-on time ${s.prefs.maxActive} min; kitchen: ${Object.keys(s.prefs.equipment).filter((k) => s.prefs.equipment[k]).join(', ')}.
TODAY (${today}) PLAN: ${planLines}. Water today: ${(s.log[today] || {}).water || 0}/8 glasses.
RECENT DAYS: ${recent.join(' | ') || 'no history yet'}.
STREAKS: cooking streak ${st.cookStreak} days, ${st.slipFreeDays} days without cured meat, fish meals this week ${st.fishThisWeek}.`;
  },

  ingredientCatalogue() {
    return Object.values(CT.ING).filter((i) => !CT.PANTRY.has(i.id) || i.id === 'evoo' || i.id === 'salt').map((i) => `${i.id}=${i.en}`).join(', ');
  },

  RECIPE_SHAPE: `Reply with ONLY one JSON object, no prose, in exactly this shape:
{"name": "Recipe name", "it": "Nome italiano", "slots": ["L"], "time": 15, "active": 10, "needs": ["stove"], "tags": ["one-pan"],
 "ingredients": [ {"id": "chicken", "g": 130, "disp": "1 small breast"}, {"name": "Fennel", "it": "finocchio", "g": 150, "disp": "1 bulb", "aisle": "Produce", "per100": {"kcal": 31, "p": 1.2, "c": 7, "fib": 3.1, "fat": 0.2, "sf": 0, "sug": 4, "na": 52}, "price": 3, "flags": "", "pur": 0, "o3": 0} ],
 "steps": ["Step one.", "Step two (5 min)."], "note": "One sentence on why it suits this person's blood work."}
Rules: one serving; grams for every ingredient; use an "id" from the catalogue whenever the ingredient exists there (then omit per100); for anything else give realistic per-100 g values. slots use B/L/D/S. needs may include stove, oven, microwave, blender. flags letters: F fish, S shellfish, E egg, D dairy, G gluten, N nuts, Y soy, Z sesame, M meat, R red meat. Keep hands-on time at or under the person's limit, ingredients cheap and available in an Italian supermarket, saturated fat low, fibre high.`,

  async chat(turns, opts = {}) {
    const sample = await this.get(); if (!sample) throw { code: 'not_granted' };
    const input = [{ role: 'user', content: this.RULES + '\n\n' + this.context() }, ...turns.slice(-16)];
    return sample(input, { cache: false, onText: opts.onText, signal: opts.signal, modelTier: 'default', tools: CT.aiTools() });
  },

  async createRecipe(brief, opts = {}) {
    const sample = await this.get(); if (!sample) throw { code: 'not_granted' };
    const prompt = `${this.RULES}\n\n${this.context()}\n\nINGREDIENT CATALOGUE (id=name): ${this.ingredientCatalogue()}\n\nTASK: ${brief}\n\n${this.RECIPE_SHAPE}`;
    const obj = await sample.json(prompt, { cache: false, onText: opts.onText, signal: opts.signal });
    return CT.recipeFromAI(obj);
  },

  async analyzeMeal(text, images, opts = {}) {
    const sample = await this.get(); if (!sample) throw { code: 'not_granted' };
    const prompt = `${this.RULES}\n\n${this.context()}\n\nTASK: The person ate something off-plan and describes it${images && images.length ? ' and attached a photo of the plate' : ''}: "${text || 'see photo'}". Estimate the nutrition of the portion as eaten and judge it against their targets and blood work.
Reply with ONLY one JSON object: {"name": "short name of the meal", "kcal": 0, "p": 0, "c": 0, "fib": 0, "fat": 0, "sf": 0, "sug": 0, "na": 0, "verdict": "good|ok|poor", "comment": "two sentences: what was good, what to adjust", "better": "one concrete swap for next time"}. Numbers are grams (sodium in mg) for the whole portion.`;
    const o = { cache: false, onText: opts.onText, signal: opts.signal };
    if (images && images.length) o.images = images;
    return sample.json(prompt, o);
  },

  async explainLabs(opts = {}) {
    const sample = await this.get(); if (!sample) throw { code: 'not_granted' };
    const prompt = `${this.RULES}\n\n${this.context()}\n\nTASK: Explain this blood test in plain language for the person, as their app's dietician (not their doctor). Structure: 1) the two or three things that matter most and how they connect (e.g. thyroid and cholesterol, triglycerides and liver); 2) what is fine and can be ignored; 3) the four food habits with the biggest expected effect on THESE numbers, in order; 4) what to ask the doctor at the next visit. Use short paragraphs and plain words, no markdown headings, under 350 words. Do not repeat the numbers table.`;
    return sample(prompt, { cache: { gcTime: 24 * 3600 * 1000 }, onText: opts.onText, signal: opts.signal, modelTier: 'default' });
  },

  async weeklyReview(opts = {}) {
    const sample = await this.get(); if (!sample) throw { code: 'not_granted' };
    const prompt = `${this.RULES}\n\n${this.context()}\n\nTASK: Review the last 7 days from the RECENT DAYS and STREAKS data. Give: one sentence of honest encouragement; the three things going well; the two habits to fix next week with a concrete, lazy-friendly action each; and one recipe idea for the coming week that fits their likes. Under 220 words, plain text, no headings.`;
    return sample(prompt, { cache: false, onText: opts.onText, signal: opts.signal });
  },
};

// Validate and normalise a recipe object produced by Claude into the app's recipe format.
CT.recipeFromAI = (o) => {
  if (!o || typeof o !== 'object' || !o.name || !Array.isArray(o.ingredients) || !Array.isArray(o.steps)) throw { code: 'invalid_json', message: 'missing fields' };
  const slots = (Array.isArray(o.slots) ? o.slots : ['L']).map((s) => String(s).toUpperCase()[0]).filter((s) => CT.SLOTS[s]);
  const needs = (Array.isArray(o.needs) ? o.needs : []).map(String).filter((n) => ['stove', 'oven', 'microwave', 'blender'].includes(n));
  const ing = o.ingredients.map((x) => {
    if (!x || typeof x !== 'object') return null;
    const g = Math.max(0, Number(x.g) || 0); if (!g) return null;
    if (x.id && CT.ING[x.id]) return [x.id, g, x.disp ? String(x.disp) : undefined, !!x.opt];
    const per100 = x.per100 || {};
    const num = (v) => Math.max(0, Number(v) || 0);
    return { name: String(x.name || 'Ingredient').slice(0, 60), it: String(x.it || '').slice(0, 60), g, disp: x.disp ? String(x.disp).slice(0, 40) : undefined, aisle: CT.AISLES.includes(x.aisle) ? x.aisle : 'Canned & dry',
      per100: { kcal: num(per100.kcal), p: num(per100.p), c: num(per100.c), fib: num(per100.fib), fat: num(per100.fat), sf: num(per100.sf), sug: num(per100.sug), na: num(per100.na) },
      price: num(x.price) || 5, flags: String(x.flags || '').replace(/[^FSEDGNYZMRIL]/g, ''), pur: CT.clamp(Math.round(num(x.pur)), 0, 3), o3: num(x.o3), tag: '' };
  }).filter(Boolean);
  if (!ing.length) throw { code: 'invalid_json', message: 'no ingredients' };
  return {
    id: 'custom_' + CT.uid(), custom: true, created: CT.today(),
    name: String(o.name).slice(0, 90), it: String(o.it || '').slice(0, 90),
    slots: slots.length ? slots : ['L'], time: CT.clamp(Math.round(Number(o.time) || 15), 1, 120), active: CT.clamp(Math.round(Number(o.active) || Number(o.time) || 10), 1, 120),
    needs, tags: ['custom', ...(Array.isArray(o.tags) ? o.tags.map(String).slice(0, 6) : [])],
    ing, steps: o.steps.map((s) => String(s).slice(0, 300)).slice(0, 12), note: o.note ? String(o.note).slice(0, 240) : '',
  };
};
