/* Swap guide, Claude features and Settings. */
(function () {
  // ---- Swaps
  CT.views.swaps = () => {
    const quick = CT.recipes().filter((r) => r.tags.includes('quick5') && (r.tags.includes('nocook') || r.tags.includes('micro')) && !r.slots.every((s) => s === 'S')).slice(0, 12);
    return `<section class="swaps">
      <div class="page-head"><div><p class="eyebrow">Swap guide</p><h1>Same two minutes, better numbers.</h1><p class="lede">Your old staples on the left, what does the same job on the right. Nothing here takes longer than making the original.</p></div></div>
      <div class="swap-list">${CT.SWAPS.map((s) => `<article class="swap card"><div class="swap-from"><span class="eyebrow bad-t">Instead of</span><strong>${s.from}</strong></div><div class="swap-arrow">${CT.icon('swaps')}</div><div class="swap-to"><span class="eyebrow good-t">Try</span><strong>${s.to}</strong><p class="muted small">${s.why}</p></div></article>`).join('')}</div>
      <div class="card"><h3>Emergency meals: five minutes, no stove</h3><p class="hint">For the evenings when the old sandwich is calling.</p><ul class="compact-list">${quick.map((r) => `<li><a href="#/recipe/${r.id}">${CT.esc(r.name)}</a><span class="muted small">${r.active} min · ${CT.fmt(r.nutri.kcal)} kcal</span></li>`).join('')}</ul></div>
      <div class="card"><h3>Eating out</h3><ul class="plain-list">${CT.EATING_OUT.map((t) => `<li>${t}</li>`).join('')}</ul></div>
    </section>`;
  };

  // ---- Claude
  CT.ui.ai = { tab: 'ask', busy: false, ctl: null, out: '', draft: null, analysis: null, error: '', photo: null, about: '' };
  const TABS = [['ask', 'Ask'], ['create', 'Create a recipe'], ['analyze', 'Analyse a meal'], ['review', 'Weekly review'], ['labs', 'Explain my results']];
  const SUGGEST = ["Swap tomorrow's dinner for something with chicken", "Make tonight's dinner without olives", 'I want pasta twice this week, sort out the plan', 'What can I order at a pizzeria tonight that fits my numbers?', 'Why is my LDL so high if I am not overweight?', 'Is coffee OK with my liver values?'];

  CT.views.claude = ({ tab, query }) => {
    const u = CT.ui.ai;
    if (tab && TABS.some((t) => t[0] === tab)) u.tab = tab;
    if (query && query.about) { u.about = query.about; }
    if (!CT.ai.available()) {
      const url = (window.CT_CONFIG || {}).artifactUrl;
      return `<section class="claude"><div class="page-head"><div><p class="eyebrow">Claude</p><h1>Ask, invent, analyse.</h1></div></div>
        <div class="card unavailable"><h3>${CT.icon('claude')} Claude features run in the claude.ai version</h3>
        <p>This copy of CookThis is running on its own (installed app or GitHub Pages), where it cannot reach Claude. The version published on claude.ai uses your Claude subscription to answer questions about your diet, invent recipes from what is in your fridge, estimate the nutrition of a meal from a photo, review your week and explain your blood results.</p>
        ${url ? `<a class="btn primary" href="${CT.esc(url)}" target="_blank" rel="noopener">Open CookThis on claude.ai</a>` : '<p class="muted small">Open that version from your artifacts on claude.ai. Its link is deliberately not built into this public copy.</p>'}
        <p class="muted small">Both versions keep their own data. Use Settings → Export to move it across.</p></div></section>`;
    }
    const panel = u.tab === 'ask' ? askPanel() : u.tab === 'create' ? createPanel() : u.tab === 'analyze' ? analyzePanel() : u.tab === 'review' ? textPanel('review', 'Review my week', 'A frank look at the last seven days: what worked, what to fix, one idea for next week.') : textPanel('labs', 'Explain my blood test', 'Plain-language reading of your latest results, how they connect, and what to ask the doctor.');
    return `<section class="claude">
      <div class="page-head"><div><p class="eyebrow">Claude</p><h1>Your dietician, on call.</h1><p class="lede">Uses your own Claude account. It knows your profile, results, preferences and what you have eaten, and it can change the plan for you: ask for a swap or a tweak and the shopping list follows.</p></div></div>
      <div class="tabs" role="tablist">${TABS.map(([k, l]) => `<a class="tab ${u.tab === k ? 'on' : ''}" href="#/claude/${k}" role="tab" aria-selected="${u.tab === k}">${l}</a>`).join('')}</div>
      ${u.error ? `<div class="banner bad">${CT.esc(u.error)} <button class="btn ghost xs" data-action="ai-dismiss">Dismiss</button></div>` : ''}
      ${panel}
    </section>`;
  };

  const askPanel = () => {
    const u = CT.ui.ai, chat = CT.state.chat;
    return `<div class="card chat-card">
      <div class="chat" id="chat">${chat.length ? chat.map((m) => `<div class="bubble ${m.role}">${CT.esc(m.content)}</div>`).join('') : `<p class="muted center">Ask anything about food, your numbers or tonight's dinner.</p><div class="chips center">${SUGGEST.map((q) => `<button class="chip" data-action="ai-suggest" data-q="${CT.esc(q)}">${q}</button>`).join('')}</div>`}
        ${u.busy && u.tab === 'ask' ? `<div class="bubble assistant streaming" id="ai-stream">${CT.esc(u.out) || '<span class="thinking">Thinking…</span>'}</div>` : ''}
      </div>
      <form class="composer" data-submit="ai-send">
        <textarea name="q" rows="2" placeholder="Type a question…" ${u.busy ? 'disabled' : ''}>${CT.esc(u.about ? `About “${u.about}”: ` : '')}</textarea>
        ${u.busy ? `<button type="button" class="btn ghost" data-action="ai-stop">${CT.icon('stop')} Stop</button>` : `<button class="btn primary" type="submit">${CT.icon('send')} Send</button>`}
      </form>
      ${(CT.ui.planEdits || []).length ? `<div class="banner edits">${CT.icon('plan')} <span>Claude changed ${CT.ui.planEdits.length} meal${CT.ui.planEdits.length > 1 ? 's' : ''}: ${CT.ui.planEdits.map((x) => `${CT.esc(x.newName)} <small>(${CT.SLOTS[x.slot].en.toLowerCase()}, ${CT.relDay(x.date).toLowerCase()})</small>`).join(' · ')}. The shopping list follows.</span>
        <button class="btn sm ghost" data-action="ai-undo-plan">Undo</button><button class="btn sm primary" data-action="ai-keep-plan">Keep</button></div>` : ''}
      ${chat.length ? `<button class="btn ghost xs" data-action="ai-clear">Clear conversation</button>` : ''}
    </div>`;
  };

  const createPanel = () => {
    const u = CT.ui.ai;
    const draft = u.draft;
    return `<div class="card">
      <form class="form-grid" data-submit="ai-create">
        <div class="field span2"><span>Mode</span>${CT.seg('__ai_mode', [['fridge', 'From what I have'], ['makeover', 'Make a dish healthier'], ['surprise', 'Surprise me']], u.mode || 'fridge')}</div>
        <label class="field span2"><span>${(u.mode || 'fridge') === 'makeover' ? 'Which dish? (e.g. carbonara, lasagne, panino con salame)' : (u.mode === 'surprise' ? 'Any wishes? (optional)' : 'What is in the fridge or pantry?')}</span><textarea name="brief" rows="3" placeholder="${(u.mode || 'fridge') === 'makeover' ? 'Carbonara for one, I love the taste but I know…' : u.mode === 'surprise' ? 'Something warm, spicy, ready in 10 minutes' : 'Half a zucchini, a can of tuna, some rice, lemon…'}" ${u.busy ? 'disabled' : ''}></label>
        <label class="field"><span>Meal</span><select name="slot">${CT.SLOT_ORDER.map((s) => `<option value="${s}" ${s === 'D' ? 'selected' : ''}>${CT.SLOTS[s].en}</option>`).join('')}</select></label>
        <div class="field"><span>&nbsp;</span>${u.busy ? `<button type="button" class="btn ghost" data-action="ai-stop">${CT.icon('stop')} Stop</button>` : `<button class="btn primary" type="submit">${CT.icon('claude')} Create recipe</button>`}</div>
      </form>
      ${u.busy && u.tab === 'create' ? `<div class="stream-box"><span class="thinking">Claude is cooking…</span><pre id="ai-stream" class="stream">${CT.esc(u.out)}</pre></div>` : ''}
      ${draft ? recipePreview(draft) : ''}
    </div>`;
  };
  const recipePreview = (r) => {
    const p = CT.prepRecipe(JSON.parse(JSON.stringify(r)));
    return `<div class="preview">
      <p class="eyebrow">Draft recipe</p><h3>${CT.esc(p.name)}</h3>${p.it ? `<p class="it muted">${CT.esc(p.it)}</p>` : ''}
      <div class="rmeta-row">${CT.metaLine(p)}<span class="meta">${p.slots.map((s) => CT.SLOTS[s].en).join(', ')}</span></div>
      ${CT.benefitBadges(p)}
      <div class="two-col"><div><h4>Ingredients</h4><ul class="ing-list small">${p.ings.map((i) => `<li><span class="ing-qty">${CT.esc(i.disp)}</span><span class="ing-name">${CT.esc(i.en)}${i.it ? ` <em class="it">${CT.esc(i.it)}</em>` : ''}</span></li>`).join('')}</ul></div><div><h4>Method</h4><ol class="steps small">${p.steps.map((s) => `<li>${CT.esc(s)}</li>`).join('')}</ol></div></div>
      ${p.note ? `<p class="note">${CT.esc(p.note)}</p>` : ''}
      <p class="muted small">Per serving: ${CT.fmt(p.nutri.kcal)} kcal · ${CT.fmt(p.nutri.p)} g protein · ${CT.fmt(p.nutri.fib)} g fibre · ${CT.fmt(p.nutri.sf, 1)} g saturated fat · ${CT.fmt(p.nutri.na)} mg sodium · ${CT.eur(p.cost)}</p>
      <div class="row-gap wrap"><button class="btn primary" data-action="ai-save-recipe">${CT.icon('check')} Save to my recipes</button><button class="btn ghost" data-action="ai-save-recipe" data-today="1">Save and plan for today</button><button class="btn ghost" data-action="ai-discard">Discard</button></div>
    </div>`;
  };

  const analyzePanel = () => {
    const u = CT.ui.ai, a = u.analysis;
    return `<div class="card">
      <p class="muted">Describe what you ate (and how much) or add a photo of the plate. Claude estimates the nutrition and tells you how it fits. You can log it to today so the target bars stay honest.</p>
      <form class="form-grid" data-submit="ai-analyze">
        <label class="field span2"><span>What did you eat?</span><textarea name="text" rows="3" placeholder="Pizza margherita, whole, and a small beer" ${u.busy ? 'disabled' : ''}></textarea></label>
        ${CT.ai.canImages() ? `<label class="field span2 file"><span>${CT.icon('camera')} Photo (optional)</span><input type="file" name="photo" accept="image/*" ${u.busy ? 'disabled' : ''}></label>` : ''}
        <div class="field span2">${u.busy ? `<button type="button" class="btn ghost" data-action="ai-stop">${CT.icon('stop')} Stop</button>` : `<button class="btn primary" type="submit">${CT.icon('claude')} Estimate</button>`}</div>
      </form>
      ${u.busy && u.tab === 'analyze' ? `<p class="thinking">Looking at it…</p>` : ''}
      ${a ? `<div class="preview analysis ${a.verdict}"><div class="row-between"><h3>${CT.esc(a.name)}</h3><span class="status ${a.verdict === 'good' ? 'ok' : a.verdict === 'ok' ? 'watch' : 'high'}">${a.verdict}</span></div>
        <div class="stat-row compact"><div class="stat"><span class="stat-n">${CT.fmt(a.kcal)}</span><span class="stat-l">kcal</span></div><div class="stat"><span class="stat-n">${CT.fmt(a.p)} g</span><span class="stat-l">protein</span></div><div class="stat"><span class="stat-n">${CT.fmt(a.fib)} g</span><span class="stat-l">fibre</span></div><div class="stat"><span class="stat-n">${CT.fmt(a.sf, 1)} g</span><span class="stat-l">sat. fat</span></div><div class="stat"><span class="stat-n">${CT.fmt(a.sug)} g</span><span class="stat-l">sugars</span></div><div class="stat"><span class="stat-n">${CT.fmt(a.na)}</span><span class="stat-l">mg sodium</span></div></div>
        <p>${CT.esc(a.comment || '')}</p>${a.better ? `<p class="note"><strong>Next time:</strong> ${CT.esc(a.better)}</p>` : ''}
        <div class="row-gap"><button class="btn primary" data-action="ai-log-meal">${CT.icon('plus')} Log it to today</button><button class="btn ghost" data-action="ai-discard">Discard</button></div></div>` : ''}
    </div>`;
  };

  const textPanel = (kind, label, hint) => {
    const u = CT.ui.ai; const out = u.texts && u.texts[kind];
    return `<div class="card"><p class="muted">${hint}</p>
      <div class="row-gap">${u.busy && u.tab === kind ? `<button class="btn ghost" data-action="ai-stop">${CT.icon('stop')} Stop</button>` : `<button class="btn primary" data-action="ai-text" data-kind="${kind}">${CT.icon('claude')} ${label}</button>`}</div>
      ${u.busy && u.tab === kind ? `<div class="stream-box"><div id="ai-stream" class="prose">${CT.esc(u.out) || '<span class="thinking">Thinking…</span>'}</div></div>` : out ? `<div class="prose">${CT.esc(out).replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</div>` : ''}
    </div>`;
  };

  // helpers
  const start = () => { const u = CT.ui.ai; u.busy = true; u.out = ''; u.error = ''; u.ctl = new AbortController(); CT.render(); return u.ctl; };
  const stream = ({ text }) => { CT.ui.ai.out = text; const el = CT.$('#ai-stream'); if (el) { el.textContent = text; el.scrollTop = el.scrollHeight; const c = CT.$('#chat'); if (c) c.scrollTop = c.scrollHeight; } };
  const finish = () => { const u = CT.ui.ai; u.busy = false; u.ctl = null; u.out = ''; CT.render(); };
  const fail = (e) => { if (e && e.code !== 'cancelled') CT.ui.ai.error = CT.ai.errorCopy(e); console.warn('claude', e); finish(); };

  CT.actions['ai-dismiss'] = () => { CT.ui.ai.error = ''; CT.render(); };
  CT.actions['ai-stop'] = () => { const u = CT.ui.ai; if (u.ctl) u.ctl.abort(); };
  CT.actions['ai-suggest'] = (d) => { const ta = CT.$('.composer textarea'); if (ta) { ta.value = d.q; ta.focus(); } };
  CT.actions['ai-clear'] = () => { CT.state.chat = []; CT.save(); CT.render(); };
  CT.actions.set = ((orig) => (d) => { if (d.path === '__ai_mode') { CT.ui.ai.mode = d.value; CT.render(); return; } orig(d); })(CT.actions.set);

  CT.submits['ai-send'] = async (form) => {
    const q = String(new FormData(form).get('q') || '').trim(); if (!q) return;
    CT.ui.ai.about = '';
    CT.state.chat.push({ role: 'user', content: q }); CT.state.chat = CT.state.chat.slice(-40); CT.save();
    const ctl = start();
    try {
      const { text } = await CT.ai.chat(CT.state.chat, { onText: stream, signal: ctl.signal });
      CT.state.chat.push({ role: 'assistant', content: text }); CT.save(); finish();
    } catch (e) { if (e && e.text) { CT.state.chat.push({ role: 'assistant', content: e.text }); CT.save(); } fail(e); }
  };
  CT.submits['ai-create'] = async (form) => {
    const f = new FormData(form); const brief = String(f.get('brief') || '').trim(); const slot = f.get('slot'); const mode = CT.ui.ai.mode || 'fridge';
    const task = mode === 'makeover' ? `Redesign this dish as a fast, healthy version for this person, keeping its soul: "${brief || 'a classic Italian dish'}". Make it a ${CT.SLOTS[slot].en.toLowerCase()}.`
      : mode === 'surprise' ? `Invent a ${CT.SLOTS[slot].en.toLowerCase()} recipe this person has probably never tried, matching their likes and blood work. ${brief ? 'Wishes: ' + brief : ''}`
      : `Create a ${CT.SLOTS[slot].en.toLowerCase()} recipe using mainly what they have: "${brief || 'anything cheap and available'}". You may add up to three cheap pantry or supermarket items.`;
    CT.ui.ai.draft = null;
    const ctl = start();
    try { CT.ui.ai.draft = await CT.ai.createRecipe(task, { onText: stream, signal: ctl.signal }); finish(); } catch (e) { fail(e); }
  };
  CT.actions['ai-save-recipe'] = (d) => {
    const r = CT.ui.ai.draft; if (!r) return;
    CT.state.custom.push(r); CT.save('custom'); CT.ui.ai.draft = null;
    CT.checkAchievements();
    if (d.today) { const slot = r.slots.find((s) => CT.state.prefs.meals[s]) || r.slots[0]; CT.setSlot(CT.today(), slot, r.id); CT.toast(`Saved and planned as today's ${CT.SLOTS[slot].en.toLowerCase()}.`, 'good'); CT.go('#/today'); }
    else { CT.toast('Saved to My recipes.', 'good'); CT.go('#/recipe/' + r.id); }
  };
  CT.actions['ai-discard'] = () => { CT.ui.ai.draft = null; CT.ui.ai.analysis = null; CT.render(); };
  CT.submits['ai-analyze'] = async (form) => {
    const f = new FormData(form); const text = String(f.get('text') || '').trim(); const photo = f.get('photo');
    const images = photo && photo.size ? [photo] : null;
    if (!text && !images) return;
    CT.ui.ai.analysis = null;
    const ctl = start();
    try {
      const a = await CT.ai.analyzeMeal(text, images, { signal: ctl.signal });
      if (!a || typeof a !== 'object') throw { code: 'invalid_json' };
      for (const k of ['kcal', 'p', 'c', 'fib', 'fat', 'sf', 'sug', 'na']) a[k] = Number(a[k]) || 0;
      a.name = String(a.name || text || 'Meal').slice(0, 80); a.verdict = ['good', 'ok', 'poor'].includes(a.verdict) ? a.verdict : 'ok';
      CT.ui.ai.analysis = a; finish();
    } catch (e) { fail(e); }
  };
  CT.actions['ai-log-meal'] = () => { const a = CT.ui.ai.analysis; if (!a) return; CT.logExtra({ name: a.name, kcal: a.kcal, p: a.p, sf: a.sf, sug: a.sug, fib: a.fib, na: a.na, verdict: a.verdict }); CT.ui.ai.analysis = null; CT.toast('Logged to today.', 'good'); CT.go('#/today'); };
  CT.actions['ai-text'] = async (d) => {
    const ctl = start(); CT.ui.ai.texts = CT.ui.ai.texts || {};
    try { const { text } = await (d.kind === 'review' ? CT.ai.weeklyReview({ onText: stream, signal: ctl.signal }) : CT.ai.explainLabs({ onText: stream, signal: ctl.signal })); CT.ui.ai.texts[d.kind] = text; finish(); } catch (e) { if (e && e.text) CT.ui.ai.texts[d.kind] = e.text; fail(e); }
  };

  // ---- Settings
  CT.views.settings = () => {
    const s = CT.state, likes = s.prefs.likes;
    const nLike = Object.values(likes).filter((v) => v === 1).length, nDis = Object.values(likes).filter((v) => v === -1).length;
    const sync = CT.syncStatus;
    const isArtifact = !!(window.claude && window.claude.use);
    return `<section class="settings">
      <div class="page-head"><div><p class="eyebrow">Settings</p><h1>Tune the planner.</h1></div></div>
      ${CT.ui.prefsDirty ? `<div class="banner">Preferences changed. <button class="btn sm primary" data-action="regen-week">Re-plan the week</button> <button class="btn sm ghost" data-action="dismiss-dirty">Later</button></div>` : ''}
      <div class="card"><h3>Profile & targets</h3>${CT.forms.profile()}</div>
      <div class="card"><h3>Health focus</h3>${CT.forms.focus()}</div>
      <div class="card"><h3>Diet & restrictions</h3>${CT.forms.diet()}</div>
      <div class="card"><div class="row-between"><h3>Likes & dislikes</h3><button class="btn ghost sm" data-action="edit-likes">${CT.icon('edit')} Edit</button></div><p class="muted">${nLike} liked · ${nDis} disliked foods.</p></div>
      <div class="card"><h3>Kitchen & time</h3>${CT.forms.kitchen()}</div>
      <div class="card"><h3>Appearance</h3>
        <div class="field"><span>Theme</span>${CT.seg('settings.theme', [['auto', 'Follow system'], ['light', 'Light'], ['dark', 'Dark']], s.settings.theme)}</div>
        <div class="field"><span>Palette</span><div class="palettes">${Object.entries(CT.PALETTES).map(([id, p]) => {
          const t = CT.isDark() ? p.dark : p.light;
          const on = (s.settings.palette || CT.DEFAULT_PALETTE) === id;
          return `<button type="button" class="pal ${on ? 'on' : ''}" data-action="set" data-path="settings.palette" data-value="${id}" aria-pressed="${on}">
            <span class="pal-swatch" style="background:${t.bg}"><i style="background:${t.accent}"></i><i style="background:${t.accent2}"></i><i style="background:${t.good}"></i></span>
            <span class="pal-body"><strong>${p.name}</strong><small>${p.hint}</small></span></button>`;
        }).join('')}</div></div>
      </div>
      <div class="card"><h3>Data</h3>
        <p class="muted small">${isArtifact ? (sync === 'synced' ? `${CT.icon('sync')} Synced through your Claude account: open this page on your phone and your data is there.` : sync === 'syncing' ? 'Syncing…' : sync === 'error' ? 'Sync had a problem; data is still saved on this device.' : 'Saved on this device.') : 'Saved in this browser only. Export a backup to move it to another device or to the claude.ai version.'}</p>
        <div class="row-gap wrap">
          <button class="btn ghost" data-action="export-data">${CT.icon('download')} Export backup</button>
          <button class="btn ghost" data-action="import-data">${CT.icon('upload')} Import backup</button>
          ${CT.installPrompt ? `<button class="btn primary" data-action="install">${CT.icon('install')} Install app</button>` : ''}
          <button class="btn ghost danger-text" data-action="reset-all">${CT.icon('trash')} Reset everything</button>
        </div>
        <p class="hint">Set up again from scratch: <button class="btn ghost xs" data-action="rerun-setup">Run the setup wizard</button></p>
      </div>
      <div class="card about"><h3>About</h3><p class="muted small">CookThis · build ${(window.CT_CONFIG || {}).build || 'dev'} · ${CT.RECIPES.length} built-in recipes, ${Object.keys(CT.ING).length} ingredients. Nutrition values are per-100 g averages from standard food tables and cost estimates are for Italian supermarkets in 2026; treat both as approximate. Not medical advice.</p></div>
    </section>`;
  };
  CT.actions['edit-likes'] = () => CT.openSetupAt('likes', '#/settings');
  CT.actions['rerun-setup'] = () => { CT.setup.step = 0; CT.setup.returnTo = '#/settings'; CT.go('#/setup'); };
  CT.actions['export-data'] = async () => {
    const text = CT.exportData(); const name = `cookthis-backup-${CT.today()}.json`;
    if (window.claude && window.claude.use) {
      let dl = null;
      try { dl = await window.claude.use('downloads'); } catch (e) { dl = null; }
      if (dl) { try { await dl.save({ filename: name, data: text }); CT.toast('Backup saved.', 'good'); return; } catch (e) { if (e && e.code === 'cancelled') return; } }
    } else { try { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' })); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); } catch (e) { /* fall through */ } }
    try { await navigator.clipboard.writeText(text); CT.toast('Backup copied to the clipboard (and downloaded where allowed).', 'good'); } catch (e) { CT.dialog(`<h3>Your backup</h3><p class="muted small">Copy this text and paste it into Import on the other device.</p><textarea class="export" readonly>${CT.esc(text)}</textarea><div class="dlg-actions"><button class="btn primary" data-action="dlg-cancel">Done</button></div>`, { wide: true }); }
  };
  CT.actions['import-data'] = () => CT.dialog(`<h3>Import a backup</h3><form data-submit="import-save"><p class="muted small">Paste the backup text, or pick the file.</p><input type="file" accept="application/json,.json" data-change="import-file"><textarea class="export" name="text" placeholder="{ … }"></textarea><div class="dlg-actions"><button type="button" class="btn ghost" data-action="dlg-cancel">Cancel</button><button class="btn primary" type="submit">Import</button></div></form>`, { wide: true });
  CT.changes['import-file'] = (d, el) => { const f = el.files && el.files[0]; if (!f) return; f.text().then((t) => { const ta = CT.$('#dlg textarea'); if (ta) ta.value = t; }); };
  CT.submits['import-save'] = (form) => { try { CT.importData(String(new FormData(form).get('text') || '')); CT.closeDialog(); CT.applyTheme(); CT.toast('Imported.', 'good'); CT.go('#/today'); } catch (e) { CT.toast('That did not look like a CookThis backup.', 'bad'); } };
  CT.actions['reset-all'] = async () => { if (!(await CT.confirm('Reset everything?', 'Profile, preferences, plans, logs, custom recipes and lab entries are deleted on this device' + (CT.db ? ' and in your synced copy' : '') + '.', 'Reset', true))) return; CT.resetAll(); CT.closeDialog(); CT.setup.step = 0; CT.go('#/setup'); };
})();
