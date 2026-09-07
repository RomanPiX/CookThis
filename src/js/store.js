/* State, persistence (localStorage) and optional cross-device sync through the Artifact db capability. */
(function () {
  const KEY = 'cookthis.v1';
  const PARTS = ['main', 'plans', 'log', 'custom'];

  CT.defaultState = () => ({
    v: 1,
    setupDone: false,
    startDate: CT.today(),
    profile: { name: '', sex: 'm', age: 32, height: 178, weight: 80, activity: 'light', goal: 'lose' },
    focus: { ldl: true, tg: true, liver: true, uric: true, glucose: true, thyroid: true },
    prefs: { likes: {}, allergens: [], diet: 'omni', maxActive: 15, meals: { B: true, L: true, D: true, S: true }, equipment: { stove: true, oven: true, microwave: true, blender: true }, budget: 'normal', lazy: false, cuisine: 'italian', chickenPerWeek: 0, autoPortion: false },
    settings: { theme: 'auto', palette: CT.DEFAULT_PALETTE, ingredientLang: 'it' },
    favorites: [], ratings: {}, expanded: {},
    labs: [JSON.parse(JSON.stringify(CT.INITIAL_LABS))],
    nextCheckup: (window.CT_CONFIG || {}).nextCheckup || '',
    doctorNotes: '',
    weights: [],
    achievements: {},
    shopChecked: {},
    chat: [],
    plans: {},
    log: {},
    custom: [],
    meta: { updatedAt: { main: 0, plans: 0, log: 0, custom: 0 } },
  });

  const partOf = (state, part) => {
    if (part === 'plans') return state.plans;
    if (part === 'log') return state.log;
    if (part === 'custom') return state.custom;
    const { plans, log, custom, meta, ...main } = state;
    return main;
  };
  const applyPart = (state, part, data) => {
    if (part === 'plans') state.plans = data || {};
    else if (part === 'log') state.log = data || {};
    else if (part === 'custom') state.custom = data || [];
    else Object.assign(state, data || {});
  };

  CT.load = () => {
    let s = CT.defaultState();
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        s = deepMerge(s, saved);
      }
    } catch (e) { /* fresh start */ }
    CT.state = s;
    return s;
  };

  function deepMerge(base, over) {
    if (Array.isArray(over)) return over;
    if (over && typeof over === 'object') {
      const out = Object.assign({}, base || {});
      for (const k of Object.keys(over)) out[k] = (base && typeof base[k] === 'object' && !Array.isArray(base[k])) ? deepMerge(base[k], over[k]) : over[k];
      return out;
    }
    return over === undefined ? base : over;
  }

  const persistLocal = () => { try { localStorage.setItem(KEY, JSON.stringify(CT.state)); } catch (e) { /* quota or private mode */ } };
  const pendingParts = new Set();
  const flushRemote = CT.debounce(() => {
    if (!CT.db) { pendingParts.clear(); return; }
    for (const part of pendingParts) {
      const body = { updatedAt: CT.state.meta.updatedAt[part], data: partOf(CT.state, part) };
      CT.db.doc('cookthis/' + part).set(body).catch((e) => { CT.syncStatus = 'error'; console.warn('db write failed', e); CT.renderSyncBadge && CT.renderSyncBadge(); });
    }
    pendingParts.clear();
  }, 900);

  // Save one or more parts ('main' | 'plans' | 'log' | 'custom'). Defaults to 'main'.
  CT.save = (...parts) => {
    if (!parts.length) parts = ['main'];
    const now = Date.now();
    for (const p of parts) { CT.state.meta.updatedAt[p] = now; pendingParts.add(p); }
    persistLocal();
    flushRemote();
  };

  // ---- Cross-device sync via the Artifact db capability (no-op elsewhere).
  CT.syncStatus = 'local';
  CT.syncInit = async () => {
    if (!(window.claude && typeof window.claude.use === 'function')) return false;
    let db = null;
    try { db = await window.claude.use('db'); } catch (e) { db = null; }
    if (!db) return false;
    CT.db = db;
    CT.syncStatus = 'syncing';
    let changed = false;
    for (const part of PARTS) {
      const ref = db.doc('cookthis/' + part);
      try {
        const snap = await ref.get();
        const local = CT.state.meta.updatedAt[part] || 0;
        if (snap.exists) {
          const body = snap.data();
          if ((body.updatedAt || 0) > local) { applyPart(CT.state, part, body.data); CT.state.meta.updatedAt[part] = body.updatedAt; changed = true; }
          else if (local > (body.updatedAt || 0)) pendingParts.add(part);
        } else if (local > 0 || (part === 'main' && CT.state.setupDone)) {
          pendingParts.add(part);
        }
        ref.onSnapshot((s) => {
          if (!s.exists || s.metadata.hasPendingWrites) return;
          const body = s.data();
          if ((body.updatedAt || 0) > (CT.state.meta.updatedAt[part] || 0)) {
            applyPart(CT.state, part, body.data);
            CT.state.meta.updatedAt[part] = body.updatedAt;
            persistLocal();
            CT.render && CT.render();
            CT.toast('Synced from your other device');
          }
        }, () => { CT.syncStatus = 'error'; CT.renderSyncBadge && CT.renderSyncBadge(); });
      } catch (e) { CT.syncStatus = 'error'; console.warn('db read failed', e); }
    }
    if (changed) persistLocal();
    if (pendingParts.size) flushRemote();
    if (CT.syncStatus !== 'error') CT.syncStatus = 'synced';
    CT.renderSyncBadge && CT.renderSyncBadge();
    return changed;
  };

  // ---- Export / import for the standalone version
  CT.exportData = () => JSON.stringify(CT.state, null, 1);
  CT.importData = (text) => {
    const obj = JSON.parse(text);
    if (!obj || typeof obj !== 'object' || !obj.profile) throw new Error('Not a CookThis backup');
    CT.state = deepMerge(CT.defaultState(), obj);
    CT.save('main', 'plans', 'log', 'custom');
  };
  CT.resetAll = () => { CT.state = CT.defaultState(); CT.save('main', 'plans', 'log', 'custom'); };

  // ---- Derived statistics for streaks and achievements
  CT.stats = () => {
    const s = CT.state, today = CT.today();
    const dates = Object.keys(s.log).sort();
    let mealsCooked = 0, legumeMeals = 0, batchMeals = 0, waterDays = 0;
    const distinct = new Set();
    const cookedOn = new Set();
    for (const d of dates) {
      const l = s.log[d];
      const ids = Object.values(l.cooked || {}).filter(Boolean);
      if (ids.length) cookedOn.add(d);
      for (const id of ids) {
        mealsCooked++; distinct.add(id);
        const r = CT.recipe(id);
        if (r && r.legume) legumeMeals++;
        if (r && r.tags.includes('batch')) batchMeals++;
      }
      if ((l.water || 0) >= 8) waterDays++;
    }
    // Current cooking streak: consecutive days ending today or yesterday
    let streak = 0, cursor = cookedOn.has(today) ? today : CT.addDays(today, -1);
    while (cookedOn.has(cursor)) { streak++; cursor = CT.addDays(cursor, -1); }
    let best = 0, run = 0, prev = null;
    for (const d of Array.from(cookedOn).sort()) { run = prev && CT.daysBetween(prev, d) === 1 ? run + 1 : 1; best = Math.max(best, run); prev = d; }
    // Slip-free days (cured meat confessions)
    let lastSlip = null;
    for (const d of dates) if ((s.log[d].slips || []).length) lastSlip = d;
    const slipFreeDays = lastSlip ? CT.daysBetween(lastSlip, today) : CT.daysBetween(s.startDate, today) + 1;
    // Fish this week (cooked)
    let fishThisWeek = 0;
    for (let i = 0; i < 7; i++) {
      const d = CT.addDays(today, -i), l = s.log[d];
      if (!l) continue;
      for (const id of Object.values(l.cooked || {})) { const r = CT.recipe(id); if (r && r.fish) fishThisWeek++; }
    }
    return { mealsCooked, legumeMeals, batchMeals, waterDays, distinctRecipes: distinct.size, cookStreak: streak, cookStreakBest: Math.max(best, streak), slipFreeDays, fishThisWeek, labCount: s.labs.length, customRecipes: s.custom.length, weightCount: s.weights.length };
  };

  CT.checkAchievements = () => {
    const st = CT.stats();
    const fresh = [];
    for (const a of CT.ACHIEVEMENTS) {
      if (!CT.state.achievements[a.id] && a.check(st)) { CT.state.achievements[a.id] = CT.today(); fresh.push(a); }
    }
    if (fresh.length) { CT.save(); fresh.forEach((a) => CT.toast(`${a.icon} Achievement: ${a.name}`, 'good')); }
    return st;
  };
})();
