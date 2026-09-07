/* Today: the day's plan, targets, water, streaks and the confession button. */
(function () {
  const greeting = () => { const h = new Date().getHours(); return h < 5 ? 'Still up' : h < 12 ? 'Buongiorno' : h < 18 ? 'Buon pomeriggio' : 'Buonasera'; };

  CT.benefitBadges = (r, max = 3) => {
    const active = Object.keys(CT.state.focus).filter((k) => CT.state.focus[k]);
    const items = active.map((k) => [k, r.benefits[k] || 0]).filter(([, v]) => v >= 2).sort((a, b) => b[1] - a[1]).slice(0, max);
    return `<div class="badges">${items.map(([k, v]) => `<span class="badge b-${k}" title="Good for ${CT.BENEFIT_LABEL[k]}">${CT.BENEFIT_LABEL[k]}${v >= 3 ? ' ++' : ''}</span>`).join('')}${r.purine >= 3 ? '<span class="badge warn">purine-rich</span>' : ''}${r.tags.includes('occasional') ? '<span class="badge warn">salty treat</span>' : ''}</div>`;
  };

  CT.metaLine = (r, m) => { const k = m || 1; return `<span class="meta">${CT.icon('clock')} ${r.active} min${r.time > r.active ? ` <small>(${r.time} total)</small>` : ''}</span><span class="meta">${CT.fmt(r.nutri.kcal * k)} kcal</span><span class="meta">${CT.eur(r.cost * k)}</span>${k !== 1 ? `<span class="meta portion" title="Portion size">×${k} portion</span>` : ''}`; };

  const slotCard = (date, slot, s) => {
    const r = CT.recipe(s.id);
    if (!r) return '';
    const isToday = date === CT.today();
    const m = s.mult || 1;
    return `<article class="slot-card ${s.done ? 'done' : ''}">
      <header class="slot-head"><span class="eyebrow">${CT.esc(CT.slotName(slot))} <span class="sep">·</span> ${CT.slotTimeLabel(slot)}</span><span class="slot-meta">${CT.metaLine(r, m)}</span></header>
      <a class="slot-title" href="#/recipe/${r.id}?portion=${m}">${CT.esc(CT.rName(r))}</a>
      ${r.why.length ? `<p class="slot-why muted">${r.why.slice(0, 3).join(' · ')}</p>` : ''}
      ${CT.benefitBadges(r, 2)}
      <footer class="slot-actions">
        <button class="btn ${s.done ? 'done' : 'primary'} sm cooked-btn" data-action="toggle-done" data-date="${date}" data-slot="${slot}">${CT.icon('check')} ${s.done ? 'Cooked' : (isToday ? 'Cooked it' : 'Mark cooked')}</button>
        <button class="btn ghost sm" data-action="swap-slot" data-date="${date}" data-slot="${slot}" title="Swap for another" aria-label="Swap">${CT.icon('shuffle')}<span class="lbl">Swap</span></button>
        <button class="btn ghost sm" data-action="pick-slot" data-date="${date}" data-slot="${slot}" title="Choose another" aria-label="Choose another">${CT.icon('recipes')}<span class="lbl">Choose…</span></button>
        <span class="portion-ctl" title="Portion size">
          <button class="btn ghost sm icon-only" data-action="portion" data-date="${date}" data-slot="${slot}" data-dir="-1" aria-label="Smaller portion">${CT.icon('minus')}</button>
          <span class="portion-val">×${m}</span>
          <button class="btn ghost sm icon-only" data-action="portion" data-date="${date}" data-slot="${slot}" data-dir="1" aria-label="Bigger portion">${CT.icon('plus')}</button>
        </span>
        <a class="btn ghost sm icon-only" href="#/recipe/${r.id}?portion=${m}" title="Open recipe" aria-label="Open recipe">${CT.icon('chev')}</a>
      </footer>
    </article>`;
  };

  CT.targetBars = (n, T, opts = {}) => {
    const rows = [
      ['Calories', n.kcal, T.kcal, 'kcal', 'about'],
      ['Protein', n.p, T.p, 'g', 'min'],
      ['Fibre', n.fib, T.fib, 'g', 'min'],
      ['Saturated fat', n.sf, T.sf, 'g', 'max'],
      ['Sugars', n.sug, T.sug, 'g', 'max'],
      ['Sodium', n.na, T.na, 'mg', 'max'],
      ['Omega-3', n.o3, T.o3, 'g', 'min'],
    ];
    return `<div class="bars">${rows.map(([label, v, t, unit, kind]) => {
      const pct = CT.clamp((v / t) * 100, 0, 130);
      let st = 'ok';
      if (kind === 'max') st = v > t * 1.05 ? 'bad' : v > t * 0.85 ? 'warn' : 'good';
      if (kind === 'min') st = v >= t ? 'good' : v >= t * 0.7 ? 'warn' : 'low';
      if (kind === 'about') st = Math.abs(v - t) / t <= 0.12 ? 'good' : v > t ? 'warn' : 'low';
      const d = unit === 'g' && t < 10 ? 1 : 0;
      // Going past a ceiling is marked in red; going past a floor is simply good, so it is not.
      const over = kind !== 'min' && pct > 100;
      return `<div class="bar-row"><span class="bar-label">${label}</span><span class="bar-track"><span class="bar-fill ${st}" style="width:${Math.min(100, pct).toFixed(0)}%"></span>${over ? `<span class="bar-over" style="width:${Math.min(30, pct - 100).toFixed(0)}%"></span>` : ''}</span><span class="bar-val">${CT.fmt(v, d)}<small>/${kind === 'max' ? '<' : ''}${CT.fmt(t, d)} ${unit}</small></span></div>`;
    }).join('')}</div>`;
  };

  CT.views.today = () => {
    const date = CT.today();
    const plan = CT.ensurePlan(date);
    const s = CT.state, log = s.log[date] || {};
    const slots = CT.enabledSlots().filter((k) => plan[k]);
    const recipes = slots.map((k) => CT.recipe(plan[k].id)).filter(Boolean);
    const mins = CT.sum(recipes, (r) => r.active);
    const T = CT.targets(), dn = CT.dayNutri(date);
    const cost = dn.cost;
    const st = CT.stats();
    const tip = CT.TIPS[Math.floor(CT.daysBetween('2026-01-01', date)) % CT.TIPS.length];
    const water = log.water || 0;
    const name = s.profile.name ? `, ${CT.esc(s.profile.name)}` : '';
    const doneCount = slots.filter((k) => plan[k].done).length;
    return `<section class="today">
      <div class="page-head">
        <div><p class="eyebrow">${CT.fmtDate(date)}</p><h1>${greeting()}${name}.</h1>
          <p class="lede">${slots.length} meals · <strong>${mins} min</strong> of actual cooking · about <strong>${CT.eur(cost)}</strong>${s.prefs.lazy ? ' · <span class="chip on alt">lazy mode</span>' : ''}</p></div>
        <div class="head-actions">
          <button class="btn ghost sm" data-action="toggle-lazy" title="Only no-cook and microwave meals">${CT.icon('bolt')} ${s.prefs.lazy ? 'Lazy mode on' : 'Lazy day?'}</button>
          <button class="btn ghost sm" data-action="regen-day" data-date="${date}">${CT.icon('shuffle')} Re-plan</button>
          <button class="btn ghost sm" data-action="surprise">${CT.icon('dice')} Surprise me</button>
        </div>
      </div>
      ${CT.ui.prefsDirty ? `<div class="banner">Your preferences changed. <button class="btn sm primary" data-action="regen-week">Re-plan the week</button> <button class="btn sm ghost" data-action="dismiss-dirty">Keep current plan</button></div>` : ''}
      ${CT.ui.installBanner ? `<div class="banner install">${CT.icon('install')} Install CookThis on this device for one-tap access and offline use. <button class="btn sm primary" data-action="install">Install</button> <button class="btn sm ghost" data-action="dismiss-install">Later</button></div>` : ''}
      <div class="grid-today">
        <div class="col-main">
          ${slots.map((k) => slotCard(date, k, plan[k])).join('')}
          <div class="extras card soft">
            <div class="row-between"><strong>Ate something else?</strong><div class="row-gap"><button class="btn ghost sm" data-action="add-extra">${CT.icon('plus')} Log it</button>${CT.ai.available() ? `<a class="btn ghost sm" href="#/claude/analyze">${CT.icon('claude')} Let Claude estimate</a>` : ''}</div></div>
            ${(log.extra || []).length ? `<ul class="extra-list">${log.extra.map((x, i) => `<li><span>${CT.esc(x.name)} <small class="muted">${CT.fmt(x.kcal)} kcal${x.verdict ? ` · ${x.verdict}` : ''}</small></span><button class="btn ghost xs icon-only" data-action="remove-extra" data-i="${i}" aria-label="Remove">${CT.icon('x')}</button></li>`).join('')}</ul>` : ''}
          </div>
        </div>
        <aside class="col-side">
          <div class="card">
            <div class="row-between"><h3>Today vs your targets</h3><span class="muted small">${doneCount}/${slots.length} eaten</span></div>
            ${CT.targetBars(dn.planned, T)}
            ${!CT.autoPortion() && dn.planned.kcal < T.kcal * 0.85 ? `<div class="banner short">This day comes to ${CT.fmt(dn.planned.kcal)} of ${CT.fmt(T.kcal)} kcal at normal portions. <button class="btn sm primary" data-action="fit-day" data-date="${date}">Fit portions</button></div>` : ''}
            <p class="hint">Bars show what is planned plus anything you logged. Saturated fat, sugar and sodium are ceilings; the rest are floors.</p>
          </div>
          <div class="card water">
            <div class="row-between"><h3>${CT.icon('drop')} Water</h3><span class="muted small">${water}/${T.water} glasses</span></div>
            <div class="glasses">${Array.from({ length: T.water }, (_, i) => `<button class="glass ${i < water ? 'full' : ''}" data-action="water-set" data-n="${i + 1 === water ? i : i + 1}" aria-label="${i + 1} glasses"></button>`).join('')}</div>
            <p class="hint">Uric acid above range wants two litres a day. Each glass is about 250 ml.</p>
          </div>
          <div class="card streaks">
            <div class="streak-row"><span class="streak-n">${CT.icon('flame')} ${st.cookStreak}</span><span class="streak-l">day cooking streak${st.cookStreakBest > st.cookStreak ? ` <small>(best ${st.cookStreakBest})</small>` : ''}</span></div>
            <div class="streak-row"><span class="streak-n alt">${st.slipFreeDays}</span><span class="streak-l">days salame-free</span></div>
            <button class="btn ghost sm" data-action="confess">Confess a slip</button>
          </div>
          <div class="card tip"><p class="eyebrow">Today's tip</p><p>${tip}</p></div>
        </aside>
      </div>
    </section>`;
  };

  // ---- Actions
  CT.actions['toggle-done'] = (d) => {
    const plan = CT.state.plans[d.date]; if (!plan || !plan[d.slot]) return;
    const s = plan[d.slot]; s.done = !s.done;
    const log = CT.state.log[d.date] = CT.state.log[d.date] || {};
    log.cooked = log.cooked || {};
    if (s.done) log.cooked[d.slot] = s.id; else delete log.cooked[d.slot];
    CT.save('plans', 'log');
    if (s.done) CT.toast(CT.pick(['Bravo.', 'One down.', 'That is how it is done.', 'Your LDL thanks you.', 'Nice. Water too?']), 'good');
    CT.checkAchievements();
    CT.render();
  };
  CT.actions['swap-slot'] = (d) => { CT.swapSlot(d.date, d.slot); CT.render(); };
  CT.actions.portion = (d) => {
    const plan = CT.state.plans[d.date]; if (!plan || !plan[d.slot]) return;
    const cur = plan[d.slot].mult || 1;
    const i = CT.PORTION_STEPS.indexOf(cur);
    const ni = CT.clamp((i < 0 ? CT.PORTION_STEPS.indexOf(1) : i) + Number(d.dir), 0, CT.PORTION_STEPS.length - 1);
    CT.setPortion(d.date, d.slot, CT.PORTION_STEPS[ni]);
    CT.render();
  };
  CT.actions['pick-slot'] = (d) => {
    const choices = CT.slotChoices(d.date, d.slot).slice(0, 14);
    const cur = (CT.state.plans[d.date] || {})[d.slot];
    CT.dialog(`<h3>${CT.esc(CT.slotName(d.slot))} · ${CT.relDay(d.date)}</h3><p class="muted small">Sorted by how well each fits your goals and likes today.</p>
      <div class="pick-list">${choices.map(({ r }) => `<button class="pick ${cur && cur.id === r.id ? 'current' : ''}" data-action="pick-set" data-date="${d.date}" data-slot="${d.slot}" data-id="${r.id}"><span class="pick-name">${CT.esc(CT.rName(r))}</span><span class="pick-meta">${r.active} min · ${CT.fmt(r.nutri.kcal)} kcal · ${CT.eur(r.cost)}</span>${CT.benefitBadges(r, 2)}</button>`).join('')}</div>`, { wide: true });
  };
  CT.actions['pick-set'] = (d) => { CT.setSlot(d.date, d.slot, d.id); CT.closeDialog(); CT.render(); };
  CT.actions['fit-day'] = (d) => { CT.refitDay(d.date, true); CT.save('plans'); CT.toast('Portions sized to your target for today.', 'good'); CT.render(); };
  CT.actions['regen-day'] = (d) => { CT.generateDay(d.date, { keepLocked: true, keepDone: true }); CT.save('plans'); CT.toast('Re-planned. Locked and cooked meals kept.'); CT.render(); };
  CT.actions['regen-week'] = () => { CT.generateWeek(CT.today(), 7, { keepLocked: true, keepDone: true }); CT.ui.prefsDirty = false; CT.toast('Week re-planned.'); CT.render(); };
  CT.actions['dismiss-dirty'] = () => { CT.ui.prefsDirty = false; CT.render(); };
  CT.actions['toggle-lazy'] = () => { CT.state.prefs.lazy = !CT.state.prefs.lazy; CT.save(); CT.generateDay(CT.today(), { keepDone: true }); CT.save('plans'); CT.toast(CT.state.prefs.lazy ? 'Lazy mode: no-cook and microwave only.' : 'Lazy mode off.'); CT.render(); };
  CT.actions.surprise = () => {
    const pool = CT.enabledSlots().flatMap((s) => CT.candidates(s, CT.addDays(CT.today(), 1)));
    const r = CT.pick(pool); if (r) CT.go('#/recipe/' + r.id);
  };
  CT.actions['water-set'] = (d) => { const date = CT.today(); const log = CT.state.log[date] = CT.state.log[date] || {}; log.water = Number(d.n); CT.save('log'); if (log.water >= 8) CT.checkAchievements(); CT.render(); };
  CT.actions.confess = () => {
    CT.dialog(`<h3>What happened?</h3><p class="muted small">No judgement. Logging it resets the salame-free counter and helps the weekly review be honest.</p>
      <div class="chips big">${['Salame', 'Prosciutto', 'Sottilette', 'Mortadella', 'Beer', 'Sweets / pastry', 'Fried food', 'Sugary drink', 'Other'].map((w) => `<button class="chip" data-action="confess-log" data-what="${w}">${w}</button>`).join('')}</div>`);
  };
  CT.actions['confess-log'] = (d) => {
    const date = CT.today(); const log = CT.state.log[date] = CT.state.log[date] || {};
    log.slips = log.slips || []; log.slips.push({ what: d.what, t: Date.now() });
    CT.save('log'); CT.closeDialog(); CT.toast('Logged. Tomorrow is a new day.'); CT.render();
  };
  CT.actions['add-extra'] = () => {
    CT.dialog(`<h3>Log something you ate</h3>
      <form class="form-grid" data-submit="extra-save">
        <label class="field span2"><span>What</span><input name="name" required autocomplete="off" placeholder="e.g. pizza margherita, half" ${CT.ai.available() ? 'data-input="extra-suggest"' : ''}>
        </label>
        <div class="span2" id="extra-suggest"></div>
        <label class="field"><span>Calories (kcal)</span><input name="kcal" type="number" min="0" placeholder="400"></label>
        <label class="field"><span>Protein (g)</span><input name="p" type="number" min="0" placeholder="15"></label>
        <label class="field"><span>Saturated fat (g)</span><input name="sf" type="number" min="0" step="0.1"></label>
        <label class="field"><span>Sugars (g)</span><input name="sug" type="number" min="0"></label>
        <label class="field"><span>Fibre (g)</span><input name="fib" type="number" min="0"></label>
        <label class="field"><span>Sodium (mg)</span><input name="na" type="number" min="0"></label>
        <div class="dlg-actions span2"><button type="button" class="btn ghost" data-action="dlg-cancel">Cancel</button><button class="btn primary" type="submit">Log it</button></div>
      </form>
      <p class="hint">Do not know the numbers? ${CT.ai.available() ? '<a href="#/claude/analyze" data-action="dlg-cancel">Describe it to Claude</a> and it will estimate them.' : 'Leave them blank, or use the claude.ai version to have them estimated.'}</p>`);
  };
  /* As you type, Claude proposes the food and its nutrition. Fires on a typing pause, never per
     keystroke, and each new request cancels the one before it. */
  CT.ui.foodSuggest = { ctl: null, q: '', items: [], busy: false };
  const suggestBox = () => {
    const u = CT.ui.foodSuggest, el = CT.$('#extra-suggest');
    if (!el) return;
    if (u.busy) { el.innerHTML = '<p class="hint"><span class="thinking">Looking it up</span></p>'; return; }
    if (!u.items.length) { el.innerHTML = ''; return; }
    el.innerHTML = `<p class="eyebrow">Did you mean</p><div class="suggest-list">${u.items.map((x, i) => `
      <button type="button" class="suggest" data-action="extra-pick" data-i="${i}">
        <span class="suggest-name">${CT.esc(x.name)}</span>
        <span class="suggest-meta">${CT.esc(x.portion || '')}${x.portion ? ' · ' : ''}${CT.fmt(x.kcal)} kcal · ${CT.fmt(x.p)} g protein · ${CT.fmt(x.sf, 1)} g sat. fat</span>
      </button>`).join('')}</div><p class="hint">Estimated by Claude. Tap one to fill the form, then adjust anything you know better.</p>`;
  };
  const runSuggest = CT.debounce(async (text) => {
    const u = CT.ui.foodSuggest;
    if (u.ctl) u.ctl.abort();
    if (!CT.$('#extra-suggest')) return;
    u.ctl = new AbortController(); u.busy = true; u.items = []; suggestBox();
    try {
      const list = await CT.ai.suggestFoods(text, { signal: u.ctl.signal });
      if (u.q !== text) return;
      u.items = (Array.isArray(list) ? list : []).slice(0, 4).map((x) => {
        const o = { name: String((x && x.name) || text).slice(0, 80), portion: String((x && x.portion) || '').slice(0, 60) };
        for (const k of ['kcal', 'p', 'c', 'fib', 'fat', 'sf', 'sug', 'na']) o[k] = Math.max(0, Number(x && x[k]) || 0);
        return o;
      }).filter((o) => o.kcal > 0);
    } catch (e) { if (e && e.code !== 'cancelled') console.warn('suggest', e); }
    u.busy = false; u.ctl = null; suggestBox();
  }, 700);
  CT.inputs['extra-suggest'] = (d, el) => {
    const u = CT.ui.foodSuggest, q = el.value.trim();
    u.q = q;
    if (q.length < 3) { if (u.ctl) u.ctl.abort(); u.items = []; u.busy = false; suggestBox(); return; }
    runSuggest(q);
  };
  CT.actions['extra-pick'] = (d) => {
    const x = CT.ui.foodSuggest.items[Number(d.i)]; if (!x) return;
    const form = CT.$('#dlg form[data-submit="extra-save"]'); if (!form) return;
    form.querySelector('[name=name]').value = x.portion ? `${x.name} (${x.portion})` : x.name;
    for (const k of ['kcal', 'p', 'sf', 'sug', 'fib', 'na']) { const f = form.querySelector(`[name=${k}]`); if (f) f.value = x[k] || ''; }
    CT.ui.foodSuggest.items = []; suggestBox();
  };

  CT.submits = CT.submits || {};
  CT.submits['extra-save'] = (form) => {
    const f = new FormData(form); const x = { name: String(f.get('name') || '').slice(0, 80) };
    for (const k of ['kcal', 'p', 'sf', 'sug', 'fib', 'na']) x[k] = Number(f.get(k)) || 0;
    CT.logExtra(x); CT.closeDialog(); CT.render();
  };
  CT.logExtra = (x, date) => { date = date || CT.today(); const log = CT.state.log[date] = CT.state.log[date] || {}; log.extra = log.extra || []; log.extra.push(x); CT.save('log'); };
  CT.actions['remove-extra'] = (d) => { const log = CT.state.log[CT.today()]; if (log && log.extra) log.extra.splice(Number(d.i), 1); CT.save('log'); CT.render(); };
})();
