/* Recipe browser, recipe detail and cook mode. */
(function () {
  CT.ui.recipes = { q: '', slot: '', quick: false, nocook: false, veg: false, fish: false, fav: false, mine: false, sort: 'match' };
  CT.ui.servings = {};

  const TAG_LABEL = { nocook: 'no cooking', micro: 'microwave', quick5: '5 minutes', batch: 'batch-friendly', ahead: 'prep the night before', sandwich: 'sandwich', salad: 'salad', soup: 'soup', pasta: 'pasta', bowl: 'bowl', wrap: 'wrap', 'one-pan': 'one pan', 'one-pot': 'one pot', oven: 'oven', comfort: 'comfort food', occasional: 'once a week', redmeat: 'red meat', vegan: 'vegan', treat: 'treat', seasonal: 'seasonal', custom: 'my recipe', eggs: 'eggs', 'purine-high': 'purine-rich' };
  CT.tagChips = (r) => `<div class="chips tiny">${r.tags.filter((t) => TAG_LABEL[t]).map((t) => `<span class="chip tiny">${TAG_LABEL[t]}</span>`).join('')}${r.veg && !r.tags.includes('vegan') ? '<span class="chip tiny">vegetarian</span>' : ''}${r.fish ? '<span class="chip tiny">fish</span>' : ''}</div>`;

  CT.recipeCard = (r) => `<a class="rcard ${r.custom ? 'custom' : ''}" href="#/recipe/${r.id}">
    <div class="rcard-top"><span class="eyebrow">${r.slots.map((s) => CT.SLOTS[s].en).join(' · ')}</span><span class="match" title="How well this fits your goals and likes">${CT.matchScore(r)}%</span></div>
    <h3>${CT.esc(CT.rName(r))}</h3>
    <div class="rmeta">${CT.metaLine(r)}</div>
    ${CT.benefitBadges(r, 2)}
  </a>`;

  const filtered = () => {
    const u = CT.ui.recipes, q = u.q.trim().toLowerCase(), s = CT.state;
    let list = CT.recipes().filter((r) => {
      if (u.slot && !r.slots.includes(u.slot)) return false;
      if (u.quick && r.active > 10) return false;
      if (u.nocook && !(r.tags.includes('nocook') || r.tags.includes('micro'))) return false;
      if (u.veg && !r.veg) return false;
      if (u.fish && !r.fish) return false;
      if (u.fav && !s.favorites.includes(r.id)) return false;
      if (u.mine && !r.custom) return false;
      if (q && !(r.name.toLowerCase().includes(q) || (r.it || '').toLowerCase().includes(q) || r.ings.some((i) => i.en.toLowerCase().includes(q) || i.it.toLowerCase().includes(q)))) return false;
      return true;
    });
    const key = u.sort;
    list.sort((a, b) => key === 'time' ? a.active - b.active : key === 'cost' ? a.cost - b.cost : key === 'kcal' ? a.nutri.kcal - b.nutri.kcal : key === 'fibre' ? b.nutri.fib - a.nutri.fib : CT.matchScore(b) - CT.matchScore(a));
    return list;
  };

  const grid = () => { const list = filtered(); return `<p class="muted small count">${list.length} recipe${list.length === 1 ? '' : 's'}</p><div class="rgrid">${list.map(CT.recipeCard).join('') || '<p class="empty">Nothing matches. Loosen a filter or ask Claude to invent something.</p>'}</div>`; };

  CT.views.recipes = () => {
    const u = CT.ui.recipes;
    const f = (key, label) => `<button class="chip ${u[key] ? 'on' : ''}" data-action="rf" data-key="${key}">${label}</button>`;
    return `<section class="recipes">
      <div class="page-head"><div><p class="eyebrow">Recipes</p><h1>Everything you could cook.</h1></div>
        ${CT.ai.available() ? `<a class="btn primary sm" href="#/claude/create">${CT.icon('claude')} Invent one with Claude</a>` : ''}</div>
      <div class="filters">
        <input class="search" type="search" placeholder="Search recipes or ingredients (English or Italian)" value="${CT.esc(u.q)}" data-input="rf-q" aria-label="Search">
        <div class="chips">
          ${CT.SLOT_ORDER.map((s) => `<button class="chip ${u.slot === s ? 'on' : ''}" data-action="rf-slot" data-slot="${s}">${CT.SLOTS[s].en}</button>`).join('')}
          <span class="vsep"></span>
          ${f('quick', '≤ 10 min')}${f('nocook', 'No stove')}${f('veg', 'Vegetarian')}${f('fish', 'Fish')}${f('fav', '♥ Favourites')}${f('mine', 'My recipes')}
        </div>
        <label class="sort">Sort <select data-change="rf-sort">${[['match', 'best match'], ['time', 'quickest'], ['cost', 'cheapest'], ['kcal', 'lightest'], ['fibre', 'most fibre']].map(([v, l]) => `<option value="${v}" ${u.sort === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
      </div>
      <div id="rgrid">${grid()}</div>
    </section>`;
  };
  CT.actions.rf = (d) => { CT.ui.recipes[d.key] = !CT.ui.recipes[d.key]; CT.render(); };
  CT.actions['rf-slot'] = (d) => { CT.ui.recipes.slot = CT.ui.recipes.slot === d.slot ? '' : d.slot; CT.render(); };
  CT.changes['rf-sort'] = (d, el) => { CT.ui.recipes.sort = el.value; CT.render(); };
  CT.inputs = CT.inputs || {};
  CT.inputs['rf-q'] = (d, el) => { CT.ui.recipes.q = el.value; const g = CT.$('#rgrid'); if (g) g.innerHTML = grid(); };

  // ---- Detail
  const nutriTable = (r, k) => {
    const n = r.nutri;
    const rows = [['Calories', n.kcal * k, 'kcal', 0], ['Protein', n.p * k, 'g', 0], ['Carbohydrates', n.c * k, 'g', 0], ['Fibre', n.fib * k, 'g', 1], ['Fat', n.fat * k, 'g', 1], ['of which saturated', n.sf * k, 'g', 1], ['Sugars', n.sug * k, 'g', 1], ['Sodium', n.na * k, 'mg', 0], ['Omega-3', n.o3 * k, 'g', 2]];
    return `<table class="nutri"><tbody>${rows.map(([l, v, u, d]) => `<tr><th>${l}</th><td>${CT.fmt(v, d)} ${u}</td></tr>`).join('')}<tr><th>Purine load</th><td>${['very low', 'low', 'moderate', 'high'][r.purine]}</td></tr><tr><th>Cost</th><td>${CT.eur(r.cost * k)}</td></tr></tbody></table>`;
  };

  CT.views.recipe = ({ id, query }) => {
    const r = CT.recipe(id);
    if (query && query.portion && CT.ui.servings[id] == null) CT.ui.servings[id] = Number(query.portion) || 1;
    if (!r) return `<section><p class="empty">Recipe not found.</p><a class="btn ghost" href="#/recipes">Back to recipes</a></section>`;
    const k = CT.ui.servings[id] || 1, s = CT.state, fav = s.favorites.includes(id), rating = s.ratings[id] || 0;
    const focusRows = Object.keys(CT.FOCUS).map((f) => { const v = r.benefits[f] || 0; return `<div class="fit-row"><span>${CT.FOCUS[f].name}</span><span class="fit-dots ${v < 0 ? 'neg' : ''}">${v < 0 ? 'avoid if strict' : '●'.repeat(v) + '○'.repeat(3 - v)}</span></div>`; }).join('');
    return `<article class="recipe">
      <a class="back" href="#/recipes">${CT.icon('back')} Recipes</a>
      <p class="eyebrow">${r.slots.map((x) => `${CT.SLOTS[x].it} · ${CT.SLOTS[x].en}`).join(' &nbsp;/&nbsp; ')}${r.custom ? ' &nbsp;·&nbsp; created with Claude' : ''}</p>
      <h1>${CT.esc(CT.rName(r))}</h1>
      <div class="rmeta-row">${CT.metaLine(r)}<span class="meta">${r.needs.length ? r.needs.join(', ') : 'no cooking equipment'}</span></div>
      ${CT.tagChips(r)}
      <div class="recipe-actions">
        <button class="btn primary" data-action="cook-start" data-id="${id}">${CT.icon('cook')} Cook mode</button>
        <button class="btn ghost" data-action="made-it" data-id="${id}">${CT.icon('check')} I made this</button>
        <button class="btn ghost" data-action="add-to-plan" data-id="${id}">${CT.icon('plan')} Add to a day</button>
        <button class="btn ghost ${fav ? 'fav-on' : ''}" data-action="fav-toggle" data-id="${id}" aria-pressed="${fav}">${CT.icon('heart')} ${fav ? 'Favourite' : 'Favourite'}</button>
        ${CT.ai.available() ? `<a class="btn ghost" href="#/claude/ask?about=${encodeURIComponent(r.name)}">${CT.icon('claude')} Ask Claude</a>` : ''}
        ${r.custom ? `<button class="btn ghost danger-text" data-action="delete-custom" data-id="${id}">${CT.icon('trash')} Delete</button>` : ''}
      </div>
      <div class="recipe-grid">
        <section class="card">
          <div class="row-between"><h3>${CT.rWord('Ingredients')}</h3><div class="stepper" aria-label="Portion size"><button class="btn ghost xs icon-only" data-action="serv-dec" data-id="${id}" aria-label="Smaller portion">${CT.icon('minus')}</button><span>${k === 1 ? '1 ' + CT.rWord('serving') : '×' + k + ' ' + CT.rWord('portion')}</span><button class="btn ghost xs icon-only" data-action="serv-inc" data-id="${id}" aria-label="Bigger portion">${CT.icon('plus')}</button></div></div>
          <ul class="ing-list">${r.ings.map((i) => `<li class="${i.opt ? 'opt' : ''}"><span class="ing-qty">${k === 1 ? CT.esc(CT.dispText(i)) : (CT.LIQUID.has(i.id) ? `${CT.fmt(i.g * k)} ml` : `${CT.fmt(i.g * k)} g`)}</span><span class="ing-name">${CT.ingLabel(i)}${i.opt ? ` <small class="muted">${CT.rWord('optional')}</small>` : ''}</span></li>`).join('')}</ul>
        </section>
        <section class="card">
          <div class="row-between"><h3>${CT.rWord('Method')}</h3>${expandControl(id, k)}</div>
          <ol class="steps">${CT.rSteps(r).map((st) => `<li>${CT.esc(st)}</li>`).join('')}</ol>
          ${CT.rNote(r) ? `<p class="note">${CT.esc(CT.rNote(r))}</p>` : ''}
          ${expandBlock(id)}
        </section>
        <section class="card">
          <h3>Why it fits your numbers</h3>
          ${r.why.length ? `<p class="muted">${r.why.join(' · ')}</p>` : ''}
          <div class="fit">${focusRows}</div>
          <h4>Per serving</h4>
          ${nutriTable(r, 1)}
        </section>
      </div>
      <div class="rating card soft"><span>How was it?</span><div class="stars">${[1, 2, 3, 4, 5].map((n) => `<button class="star ${n <= rating ? 'on' : ''}" data-action="rate" data-id="${id}" data-n="${n}" aria-label="${n} star${n > 1 ? 's' : ''}">★</button>`).join('')}</div><span class="muted small">${rating ? (rating >= 4 ? 'Planned more often.' : rating <= 2 ? 'Planned less often.' : 'Noted.') : 'Ratings steer the planner.'}</span></div>
    </article>`;
  };

  const stepPortion = (id, dir) => {
    const cur = CT.ui.servings[id] || 1;
    const i = CT.PORTION_STEPS.indexOf(cur);
    const ni = CT.clamp((i < 0 ? CT.PORTION_STEPS.indexOf(1) : i) + dir, 0, CT.PORTION_STEPS.length - 1);
    CT.ui.servings[id] = CT.PORTION_STEPS[ni];
    CT.render();
  };
  // ---- "Expand": Claude writes the same recipe out in full detail, saved with the recipe.
  CT.ui.expand = { id: null, busy: false, out: '', ctl: null, error: '' };
  const expandControl = (id, k) => {
    const u = CT.ui.expand, saved = CT.state.expanded[id];
    if (!CT.ai.available()) return saved ? '' : '';
    if (u.busy && u.id === id) return `<button class="btn ghost sm" data-action="expand-stop">${CT.icon('stop')} Stop</button>`;
    if (saved) return `<span class="row-gap"><button class="btn ghost sm" data-action="expand-method" data-id="${id}" data-portion="${k}" data-redo="1">${CT.icon('sync')} Redo</button><button class="btn ghost sm" data-action="expand-clear" data-id="${id}">Hide</button></span>`;
    return `<button class="btn ghost sm" data-action="expand-method" data-id="${id}" data-portion="${k}">${CT.icon('claude')} Expand</button>`;
  };
  const expandBlock = (id) => {
    const u = CT.ui.expand, saved = CT.state.expanded[id];
    if (u.error && u.id === id) return `<div class="banner bad">${CT.esc(u.error)} <button class="btn ghost xs" data-action="expand-dismiss">Dismiss</button></div>`;
    if (u.busy && u.id === id) return `<div class="expanded"><p class="eyebrow">Step by step</p><div id="expand-out" class="prose">${CT.esc(u.out) || '<span class="thinking">Writing it out…</span>'}</div></div>`;
    if (saved) return `<div class="expanded"><p class="eyebrow">Step by step${saved.portion && saved.portion !== 1 ? ` · for ×${saved.portion}` : ''}</p><div class="prose">${CT.prose(saved.text)}</div></div>`;
    if (!CT.ai.available()) return '';
    return `<p class="hint">Expand asks Claude to write this out in full detail: prep order, heat, timings and what to look for. It writes from what it knows about the dish, since the page cannot browse the web.</p>`;
  };
  CT.actions['expand-method'] = async (d) => {
    const r = CT.recipe(d.id); if (!r) return;
    const u = CT.ui.expand;
    u.id = d.id; u.busy = true; u.out = ''; u.error = ''; u.ctl = new AbortController();
    if (d.redo) delete CT.state.expanded[d.id];
    CT.render();
    const onText = ({ text }) => { u.out = text; const el = CT.$('#expand-out'); if (el) el.textContent = text; };
    try {
      const { text } = await CT.ai.expandMethod(r, Number(d.portion) || 1, { onText, signal: u.ctl.signal, cache: d.redo ? { gcTime: 86400000, refresh: true } : undefined });
      CT.state.expanded[d.id] = { text, at: CT.today(), portion: Number(d.portion) || 1 };
      CT.save();
    } catch (e) {
      if (e && e.text) { CT.state.expanded[d.id] = { text: e.text, at: CT.today(), portion: Number(d.portion) || 1 }; CT.save(); }
      else if (e && e.code !== 'cancelled') u.error = CT.ai.errorCopy(e);
      console.warn('expand', e);
    }
    u.busy = false; u.ctl = null; u.out = '';
    CT.render();
  };
  CT.actions['expand-stop'] = () => { const u = CT.ui.expand; if (u.ctl) u.ctl.abort(); };
  CT.actions['expand-clear'] = (d) => { delete CT.state.expanded[d.id]; CT.save(); CT.render(); };
  CT.actions['expand-dismiss'] = () => { CT.ui.expand.error = ''; CT.render(); };

  CT.actions['serv-inc'] = (d) => stepPortion(d.id, 1);
  CT.actions['serv-dec'] = (d) => stepPortion(d.id, -1);
  CT.actions['fav-toggle'] = (d) => { const f = CT.state.favorites, i = f.indexOf(d.id); if (i >= 0) f.splice(i, 1); else f.push(d.id); CT.save(); CT.render(); };
  CT.actions.rate = (d) => { CT.state.ratings[d.id] = Number(d.n); CT.save(); CT.render(); };
  CT.actions['delete-custom'] = async (d) => {
    if (!(await CT.confirm('Delete this recipe?', 'It disappears from your recipes and from any planned day.', 'Delete', true))) return;
    CT.state.custom = CT.state.custom.filter((r) => r.id !== d.id);
    for (const date in CT.state.plans) for (const s of CT.SLOT_ORDER) if (CT.state.plans[date][s] && CT.state.plans[date][s].id === d.id) delete CT.state.plans[date][s];
    CT.save('custom', 'plans'); CT.closeDialog(); CT.go('#/recipes');
  };
  CT.actions['made-it'] = (d) => {
    const r = CT.recipe(d.id), date = CT.today();
    const plan = CT.state.plans[date] || {};
    let slot = CT.SLOT_ORDER.find((s) => plan[s] && plan[s].id === d.id) || r.slots.find((s) => CT.state.prefs.meals[s] && (!plan[s] || !plan[s].done)) || r.slots[0];
    CT.setSlot(date, slot, d.id);
    CT.state.plans[date][slot].done = true;
    const log = CT.state.log[date] = CT.state.log[date] || {}; log.cooked = log.cooked || {}; log.cooked[slot] = d.id;
    CT.save('plans', 'log'); CT.checkAchievements();
    CT.toast(`Logged as today's ${CT.SLOTS[slot].en.toLowerCase()}.`, 'good'); CT.render();
  };
  CT.actions['add-to-plan'] = (d) => {
    const r = CT.recipe(d.id), today = CT.today();
    const days = Array.from({ length: 7 }, (_, i) => CT.addDays(today, i));
    CT.dialog(`<h3>Add “${CT.esc(CT.rName(r))}” to…</h3>
      <form class="form-grid" data-submit="plan-add" data-id="${d.id}">
        <label class="field"><span>Day</span><select name="date">${days.map((x) => `<option value="${x}">${CT.relDay(x)}</option>`).join('')}</select></label>
        <label class="field"><span>Meal</span><select name="slot">${r.slots.map((s) => `<option value="${s}">${CT.SLOTS[s].en}</option>`).join('')}</select></label>
        <div class="dlg-actions span2"><button type="button" class="btn ghost" data-action="dlg-cancel">Cancel</button><button class="btn primary" type="submit">Add</button></div>
      </form>`);
  };
  CT.submits['plan-add'] = (form) => { const f = new FormData(form); CT.setSlot(f.get('date'), f.get('slot'), form.dataset.id); CT.closeDialog(); CT.toast(`Planned for ${CT.relDay(f.get('date')).toLowerCase()}.`, 'good'); };

  // ---- Cook mode
  CT.cook = { r: null, i: 0, timer: null, remaining: 0, wake: null };
  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const cookRender = () => {
    const c = CT.cook, r = c.r, el = CT.$('#cookmode');
    if (!r) return;
    const steps = CT.rSteps(r);
    const total = steps.length, last = c.i >= total;
    const step = steps[c.i];
    const secs = last ? null : CT.timerFromStep(step);
    el.innerHTML = `<div class="cook-inner">
      <header class="cook-head"><span class="eyebrow">${CT.esc(CT.rName(r))}</span><button class="btn ghost icon-only" data-action="cook-close" aria-label="Close cook mode">${CT.icon('x')}</button></header>
      <div class="cook-progress">${steps.map((_, k) => `<span class="${k < c.i ? 'done' : k === c.i ? 'now' : ''}"></span>`).join('')}</div>
      ${last ? `<div class="cook-step"><p class="eyebrow">Done</p><h2>Plate up.</h2><p class="muted">Sit down. Eat slowly. Drink a glass of water.</p></div>` : `<div class="cook-step"><p class="eyebrow">Step ${c.i + 1} of ${total}</p><h2>${CT.esc(step)}</h2></div>`}
      ${!last && (secs || c.timer) ? `<div class="cook-timer ${c.timer ? 'running' : ''}"><span class="time">${fmtTime(c.timer ? c.remaining : secs)}</span>${c.timer ? `<button class="btn ghost sm" data-action="timer-stop">${CT.icon('stop')} Stop</button>` : `<button class="btn primary sm" data-action="timer-start" data-secs="${secs}">${CT.icon('play')} Start timer</button>`}</div>` : ''}
      <div class="cook-ings"><details><summary>${CT.rWord('Ingredients')}${c.k !== 1 ? ` <span class="chip tiny">×${c.k} ${CT.rWord('portion')}</span>` : ''}</summary><ul>${r.ings.map((i) => `<li><strong>${c.k === 1 ? CT.esc(CT.dispText(i)) : (CT.LIQUID.has(i.id) ? CT.fmt(i.g * c.k) + ' ml' : CT.fmt(i.g * c.k) + ' g')}</strong> ${CT.esc(CT.ingNames(i).primary)}</li>`).join('')}</ul></details></div>
      <footer class="cook-nav">
        <button class="btn ghost" data-action="cook-prev" ${c.i === 0 ? 'disabled' : ''}>${CT.icon('back')} Back</button>
        ${last ? `<button class="btn primary big" data-action="cook-finish" data-id="${r.id}">${CT.icon('check')} I made it</button>` : `<button class="btn primary big" data-action="cook-next">Next ${CT.icon('chev')}</button>`}
      </footer>
    </div>`;
  };
  const stopTimer = () => { if (CT.cook.timer) { clearInterval(CT.cook.timer); CT.cook.timer = null; } };
  CT.actions['cook-start'] = async (d) => {
    CT.cook.r = CT.recipe(d.id); CT.cook.i = 0; CT.cook.k = CT.ui.servings[d.id] || 1; stopTimer();
    const el = CT.$('#cookmode'); el.hidden = false; document.body.classList.add('cooking');
    cookRender();
    try { if (navigator.wakeLock) CT.cook.wake = await navigator.wakeLock.request('screen'); } catch (e) { /* not critical */ }
  };
  CT.actions['cook-close'] = () => { stopTimer(); CT.$('#cookmode').hidden = true; document.body.classList.remove('cooking'); if (CT.cook.wake) { CT.cook.wake.release().catch(() => {}); CT.cook.wake = null; } };
  CT.actions['cook-next'] = () => { stopTimer(); CT.cook.i = Math.min(CT.rSteps(CT.cook.r).length, CT.cook.i + 1); cookRender(); };
  CT.actions['cook-prev'] = () => { stopTimer(); CT.cook.i = Math.max(0, CT.cook.i - 1); cookRender(); };
  CT.actions['timer-start'] = (d) => {
    stopTimer(); CT.cook.remaining = Number(d.secs);
    CT.cook.timer = setInterval(() => {
      CT.cook.remaining--;
      const t = CT.$('#cookmode .time'); if (t) t.textContent = fmtTime(Math.max(0, CT.cook.remaining));
      if (CT.cook.remaining <= 0) { stopTimer(); cookRender(); CT.toast('Timer done!', 'good'); try { if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } catch (e) { /* ignore */ } beep(); }
    }, 1000);
    cookRender();
  };
  CT.actions['timer-stop'] = () => { stopTimer(); cookRender(); };
  CT.actions['cook-finish'] = (d) => { CT.actions['cook-close'](); CT.actions['made-it'](d); };
  const beep = () => { try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const o = ctx.createOscillator(), g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = 880; g.gain.value = 0.15; o.start(); setTimeout(() => { o.stop(); ctx.close(); }, 500); } catch (e) { /* silent */ } };
})();
