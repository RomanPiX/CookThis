/* Setup wizard and the form fragments it shares with Settings. */
// Every registry the views write into, created once here because this is the first view file loaded.
CT.views = CT.views || {}; CT.after = CT.after || {}; CT.actions = CT.actions || {}; CT.changes = CT.changes || {};
CT.inputs = CT.inputs || {}; CT.submits = CT.submits || {};
CT.ui = CT.ui || {};
CT.setup = { step: 0, returnTo: null };

// Generic path helpers used by data-action="set|toggle|toggle-in" and data-change="path"
CT.getPath = (path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), CT.state);
CT.setPath = (path, value) => {
  const keys = path.split('.'); let o = CT.state;
  for (let i = 0; i < keys.length - 1; i++) { if (o[keys[i]] == null) o[keys[i]] = {}; o = o[keys[i]]; }
  o[keys[keys.length - 1]] = value;
};
const coerce = (v, type) => type === 'number' ? (v === '' ? '' : Number(v)) : type === 'slotTime' ? (v === 'nocook' ? 'nocook' : Number(v)) : type === 'bool' ? (v === true || v === 'true') : type === 'budget' ? ((v === true || v === 'true') ? 'low' : 'normal') : v;
CT.actions.set = (d) => { CT.setPath(d.path, coerce(d.value, d.type)); CT.save(d.part || 'main'); CT.markPrefsDirty(d.path); CT.render(); };
CT.actions.toggle = (d) => { CT.setPath(d.path, !CT.getPath(d.path)); CT.save(d.part || 'main'); CT.markPrefsDirty(d.path); CT.render(); };
CT.actions['toggle-in'] = (d) => { const arr = CT.getPath(d.path) || []; const i = arr.indexOf(d.value); if (i >= 0) arr.splice(i, 1); else arr.push(d.value); CT.setPath(d.path, arr); CT.save(); CT.markPrefsDirty(d.path); CT.render(); };
CT.changes.path = (d, el) => { CT.setPath(d.path, coerce(el.type === 'checkbox' ? el.checked : el.value, d.type)); CT.save(d.part || 'main'); CT.markPrefsDirty(d.path); if (d.rerender) CT.render(); };
CT.markPrefsDirty = (path) => {
  if (path === 'prefs.autoPortion') {
    // Apply the new rule to the week already planned, rather than only to the next re-plan.
    if (CT.autoPortion()) { for (let i = 0; i < 7; i++) CT.refitDay(CT.addDays(CT.today(), i)); CT.save('plans'); }
    else CT.normalisePortions();
  }
  if (/^prefs\./.test(path) && CT.state.setupDone) CT.ui.prefsDirty = true;
};

const seg = (path, options, current, type) => `<div class="seg" role="group">${options.map(([v, label]) => `<button type="button" class="seg-btn ${String(current) === String(v) ? 'active' : ''}" data-action="set" data-path="${path}" data-value="${v}" ${type ? `data-type="${type}"` : ''} aria-pressed="${String(current) === String(v)}">${CT.esc(label)}</button>`).join('')}</div>`;
CT.seg = seg;

CT.forms = {
  profile() {
    const p = CT.state.profile, T = CT.targets();
    return `<div class="form-grid">
      <label class="field"><span>Name (optional)</span><input type="text" data-change="path" data-path="profile.name" value="${CT.esc(p.name)}" placeholder="What should the app call you?"></label>
      <div class="field"><span>Sex</span>${seg('profile.sex', [['m', 'Male'], ['f', 'Female']], p.sex)}</div>
      <label class="field"><span>Age</span><input type="number" min="16" max="99" data-change="path" data-path="profile.age" data-type="number" data-rerender="1" value="${p.age}"></label>
      <label class="field"><span>Height (cm)</span><input type="number" min="120" max="230" data-change="path" data-path="profile.height" data-type="number" data-rerender="1" value="${p.height}"></label>
      <label class="field"><span>Weight (kg)</span><input type="number" min="35" max="250" step="0.1" data-change="path" data-path="profile.weight" data-type="number" data-rerender="1" value="${p.weight}"></label>
      <label class="field"><span>Activity</span><select data-change="path" data-path="profile.activity" data-rerender="1">${CT.ACTIVITY.map((a) => `<option value="${a[0]}" ${p.activity === a[0] ? 'selected' : ''}>${a[1]}</option>`).join('')}</select></label>
      <div class="field span2"><span>Goal</span>${seg('profile.goal', [['lose', 'Lose weight gently (−15%)'], ['maintain', 'Maintain weight']], p.goal)}</div>
    </div>
    <p class="hint">Daily target about <strong>${T.kcal} kcal</strong> · ${T.p} g protein · ${T.fib} g fibre · under ${T.sf} g saturated fat · BMI ${CT.fmt(T.bmi, 1)}.</p>`;
  },
  focus() {
    const s = CT.state, labs = s.labs[s.labs.length - 1];
    return `<div class="focus-list">${Object.entries(CT.FOCUS).map(([k, f]) => {
      const vals = f.labs.map((id) => { const l = CT.LABS.find((x) => x.id === id), v = labs.values[id]; return v == null ? '' : `<span class="lab-chip ${CT.labStatus(l, v)}">${l.name} ${v}</span>`; }).join('');
      return `<button type="button" class="focus-card ${s.focus[k] ? 'on' : ''}" data-action="toggle" data-path="focus.${k}" aria-pressed="${!!s.focus[k]}">
        <span class="focus-check">${CT.icon('check')}</span>
        <span class="focus-body"><strong>${f.name}</strong><span class="lab-chips">${vals}</span></span></button>`;
    }).join('')}</div>
    <p class="hint">${Object.keys(labs.values).length ? 'Pre-filled from your latest results. Switch a focus off if your doctor says it is not a concern; edit the values later under Health.' : 'No results entered yet. Keep on whatever your doctor flagged, then add your blood test under Health after setup (or import a backup).'}</p>`;
  },
  diet() {
    const p = CT.state.prefs;
    return `<div class="field"><span>Diet</span>${seg('prefs.diet', CT.DIETS, p.diet)}</div>
    <div class="field"><span>Allergies & intolerances (recipes containing these are hidden)</span>
      <div class="chips">${CT.ALLERGENS.map(([id, label]) => `<button type="button" class="chip ${p.allergens.includes(id) ? 'on bad' : ''}" data-action="toggle-in" data-path="prefs.allergens" data-value="${id}">${label}</button>`).join('')}</div></div>`;
  },
  likes() {
    const likes = CT.state.prefs.likes;
    const nLike = Object.values(likes).filter((v) => v === 1).length, nDis = Object.values(likes).filter((v) => v === -1).length;
    return `<p class="hint">Tap once for <span class="chip on like">like</span>, twice for <span class="chip on dislike">dislike</span>, a third time to reset. Disliked foods never appear; liked ones get picked more often. <strong>${nLike}</strong> likes · <strong>${nDis}</strong> dislikes.</p>
    ${CT.FOOD_GROUPS.map((g) => `<div class="pref-group"><h4>${g.name}</h4><div class="chips">${g.tags.map(([tag, label]) => {
      const v = likes[tag] || 0;
      return `<button type="button" class="chip ${v === 1 ? 'on like' : v === -1 ? 'on dislike' : ''}" data-action="pref-cycle" data-tag="${tag}">${v === 1 ? '♥ ' : v === -1 ? '✕ ' : ''}${label}</button>`;
    }).join('')}</div></div>`).join('')}`;
  },
  kitchen() {
    const p = CT.state.prefs;
    return `<div class="form-grid">
      <div class="field span2"><span>What you have</span><div class="chips">${CT.EQUIPMENT.map(([id, label]) => `<button type="button" class="chip ${p.equipment[id] ? 'on' : ''}" data-action="toggle" data-path="prefs.equipment.${id}">${label}</button>`).join('')}</div></div>
      <div class="field span2"><span>Cooking style</span>${seg('prefs.cuisine', [['italian', 'Italian first'], ['any', 'Anything goes']], p.cuisine || 'italian')}<small class="muted">Italian first keeps the week mostly Italian, with the occasional dish from elsewhere.</small></div>
      <label class="switch-row span2"><span><strong>Size portions to my calorie target</strong><small>Off by default: every meal is the recipe as written, ×1, and you adjust with the − and + on the meal card. On, the planner scales each plate so the day adds up to your target.</small></span><input type="checkbox" data-change="path" data-path="prefs.autoPortion" data-type="bool" data-rerender="1" ${p.autoPortion ? 'checked' : ''}></label>
      <div class="field span2"><span>Chicken meals per week</span>${seg('prefs.chickenPerWeek', [[0, 'No preference'], [3, '3'], [5, '5'], [7, '7 (one a day)'], [10, '10']], p.chickenPerWeek || 0, 'number')}<small class="muted">The planner aims for this many pan-cooked chicken meals, while still keeping two fish meals and legumes through the week.</small></div>
      <div class="field span2"><span>Hands-on time, per meal</span>
        <div class="slot-times">${CT.SLOT_ORDER.filter((k) => p.meals[k]).map((k) => `<div class="slot-time"><span class="eyebrow">${CT.SLOTS[k].it} · ${CT.SLOTS[k].en}</span>${seg('prefs.slotTime.' + k, [['nocook', 'Assemble only'], [5, '5 min'], [10, '10 min'], [15, '15 min'], [20, '20 min'], [30, '30 min']], (p.slotTime || {})[k] || p.maxActive)}</div>`).join('')}</div>
        <small class="muted">Oven or simmering time does not count: this is the minutes you actually spend. "Assemble only" means no heat at all, about five minutes, a plate you put together.</small></div>
      <div class="field span2"><span>Meals to plan</span><div class="chips">${CT.SLOT_ORDER.map((k) => `<button type="button" class="chip ${p.meals[k] ? 'on' : ''}" data-action="toggle" data-path="prefs.meals.${k}">${CT.SLOTS[k].en} <em>${CT.SLOTS[k].it}</em></button>`).join('')}</div></div>
      <label class="switch-row span2"><span><strong>Lazy mode</strong><small>Only no-cook or microwave meals, 10 minutes tops. For the days when the stove is not happening.</small></span><input type="checkbox" data-change="path" data-path="prefs.lazy" data-type="bool" data-rerender="1" ${p.lazy ? 'checked' : ''}></label>
      <label class="switch-row span2"><span><strong>Tight budget</strong><small>Skip anything over about €3.20 a plate (salmon, shrimp, beef).</small></span><input type="checkbox" data-change="path" data-path="prefs.budget" data-type="budget" data-rerender="1" ${p.budget === 'low' ? 'checked' : ''}></label>
    </div>`;
  },
};

const STEPS = [
  { key: 'welcome', title: 'Welcome to CookThis', render: () => `
    <div class="welcome">
      <p class="lede">Your blood test asked for a different kitchen, not a different life. CookThis picks meals that are fast, cheap and aimed at your numbers: cholesterol, triglycerides, uric acid, liver enzymes, and the thyroid your doctor is watching.</p>
      <ul class="feature-list">
        <li>${CT.icon('clock')} <span><strong>Lazy-cook first.</strong> Most meals take under 15 minutes of actual work. Many take two.</span></li>
        <li>${CT.icon('health')} <span><strong>Built from your results.</strong> Every recipe is scored on fibre, saturated fat, omega-3, sugar and purines.</span></li>
        <li>${CT.icon('shop')} <span><strong>Shopping list in Italian.</strong> Grouped by aisle, with cans and packs counted for you.</span></li>
        <li>${CT.icon('flame')} <span><strong>Streaks, swaps, confessions.</strong> A salame-free counter, a swap guide for your old staples, and achievements to keep it fun.</span></li>
      </ul>
      <p class="muted small">Setup takes about two minutes. Nothing leaves your device unless you use the claude.ai version, which syncs between your PC and phone.</p>
    </div>` },
  { key: 'profile', title: 'About you', sub: 'Used only to size your portions and calorie target.', render: () => CT.forms.profile() },
  { key: 'focus', title: 'What we are fixing', sub: 'The planner weighs recipes towards the focus areas you keep on.', render: () => CT.forms.focus() },
  { key: 'diet', title: 'Diet & restrictions', render: () => CT.forms.diet() },
  { key: 'likes', title: 'What do you actually like?', render: () => CT.forms.likes() },
  { key: 'kitchen', title: 'Your kitchen and your patience', render: () => CT.forms.kitchen() },
  { key: 'ready', title: 'Ready to cook', render: () => {
    const counts = CT.enabledSlots().map((s) => `${CT.candidates(s, CT.addDays(CT.today(), 1)).length} ${CT.SLOTS[s].en.toLowerCase()}`);
    const T = CT.targets();
    return `<div class="ready">
      <p class="lede">With your filters there are <strong>${counts.join(', ')}</strong> recipes to rotate through, and Claude can invent more.</p>
      <div class="stat-row">
        <div class="stat"><span class="stat-n">${T.kcal}</span><span class="stat-l">kcal / day</span></div>
        <div class="stat"><span class="stat-n">${T.fib} g</span><span class="stat-l">fibre target</span></div>
        <div class="stat"><span class="stat-n">&lt; ${T.sf} g</span><span class="stat-l">saturated fat</span></div>
        <div class="stat"><span class="stat-n">${T.water}</span><span class="stat-l">glasses of water</span></div>
      </div>
      <p class="muted">Tap the button and the app plans today and the coming week. You can swap any meal with one tap.</p>
    </div>`;
  } },
];

CT.views.setup = (params) => {
  if (params && params.query && params.query.skip && !CT.state.setupDone) {
    setTimeout(() => CT.actions['setup-finish'](), 0);
    return '<section class="setup"><p class="lede">Setting up with defaults…</p></section>';
  }
  const i = CT.setup.step, st = STEPS[i], last = i === STEPS.length - 1;
  return `<section class="setup">
    <div class="setup-progress" aria-label="Step ${i + 1} of ${STEPS.length}">${STEPS.map((_, k) => `<span class="dot ${k <= i ? 'on' : ''}"></span>`).join('')}</div>
    <h1 class="setup-title">${st.title}</h1>
    ${st.sub ? `<p class="lede">${st.sub}</p>` : ''}
    <div class="setup-body">${st.render()}</div>
    <div class="setup-nav">
      ${i > 0 ? `<button class="btn ghost" data-action="setup-back">${CT.icon('back')} Back</button>` : (CT.state.setupDone ? `<button class="btn ghost" data-action="setup-cancel">Cancel</button>` : `<button class="btn ghost" data-action="import-data">Restore a backup</button>`)}
      <button class="btn primary big" data-action="${last ? 'setup-finish' : 'setup-next'}">${last ? 'Plan my first day' : (i === 0 ? "Let's set up" : 'Next')} ${CT.icon(last ? 'cook' : 'chev')}</button>
    </div>
  </section>`;
};

CT.actions['setup-next'] = () => { CT.setup.step = Math.min(STEPS.length - 1, CT.setup.step + 1); CT.render(); window.scrollTo(0, 0); };
CT.actions['setup-back'] = () => { CT.setup.step = Math.max(0, CT.setup.step - 1); CT.render(); window.scrollTo(0, 0); };
CT.actions['setup-cancel'] = () => { CT.go(CT.setup.returnTo || '#/settings'); };
CT.actions['setup-finish'] = () => {
  const s = CT.state;
  const first = !s.setupDone;
  s.setupDone = true;
  if (first) s.startDate = CT.today();
  CT.save();
  CT.generateWeek(CT.today(), 7, { keepLocked: true });
  CT.ui.prefsDirty = false;
  CT.toast(first ? 'Your week is planned. Buon appetito.' : 'Preferences saved and the week re-planned.', 'good');
  CT.setup.step = 0;
  CT.go('#/today');
};
CT.actions['pref-cycle'] = (d) => {
  const likes = CT.state.prefs.likes, v = likes[d.tag] || 0;
  const next = v === 0 ? 1 : v === 1 ? -1 : 0;
  if (next === 0) delete likes[d.tag]; else likes[d.tag] = next;
  CT.save(); CT.markPrefsDirty('prefs.likes'); CT.render();
};
CT.openSetupAt = (key, returnTo) => { CT.setup.step = Math.max(0, STEPS.findIndex((s) => s.key === key)); CT.setup.returnTo = returnTo || '#/settings'; CT.go('#/setup'); };
