/* Health: focus explanations, lab results with trends, derived ratios, weight, streaks and achievements. */
(function () {
  CT.labStatus = (l, v) => {
    if (v == null || v === '') return 'na';
    if (l.hi != null && v > l.hi) return 'high';
    if (l.lo != null && v < l.lo) return 'low';
    if (l.id === 'glu' && v >= 100) return 'watch';
    if (l.id === 'hdl' && v < 40) return 'watch';
    return 'ok';
  };
  const STATUS_LABEL = { high: 'high', low: 'low', watch: 'borderline', ok: 'in range', na: '–' };
  const rangeText = (l) => l.lo != null && l.hi != null ? `${l.lo} – ${l.hi}` : l.hi != null ? `< ${l.hi}` : l.lo != null ? `> ${l.lo}` : '';

  const derived = (v) => {
    const out = [];
    if (v.chol != null && v.hdl != null) out.push({ name: 'Non-HDL cholesterol', val: v.chol - v.hdl, unit: 'mg/dL', target: '< 130', st: v.chol - v.hdl > 160 ? 'high' : v.chol - v.hdl > 130 ? 'watch' : 'ok', why: 'Everything that is not the good kind. Tracks risk better than total cholesterol.' });
    if (v.tg != null && v.hdl) out.push({ name: 'TG / HDL ratio', val: v.tg / v.hdl, unit: '', d: 1, target: '< 2', st: v.tg / v.hdl > 3.5 ? 'high' : v.tg / v.hdl > 2 ? 'watch' : 'ok', why: 'A rough marker of insulin resistance. Falls quickly when sugar and alcohol go and fish comes in.' });
    if (v.chol != null && v.hdl) out.push({ name: 'Total / HDL ratio', val: v.chol / v.hdl, unit: '', d: 1, target: '< 4.5', st: v.chol / v.hdl > 5 ? 'high' : v.chol / v.hdl > 4.5 ? 'watch' : 'ok', why: 'Improves when LDL drops or HDL rises (exercise, olive oil, nuts).' });
    return out;
  };

  CT.views.health = () => {
    const s = CT.state, labs = s.labs.slice().sort((a, b) => a.date.localeCompare(b.date)), latest = labs[labs.length - 1];
    const st = CT.stats();
    const focusOn = Object.keys(CT.FOCUS).filter((k) => s.focus[k]);
    const daysTo = s.nextCheckup ? CT.daysBetween(CT.today(), s.nextCheckup) : null;
    const weights = s.weights.slice().sort((a, b) => a.date.localeCompare(b.date));
    const T = CT.targets();
    return `<section class="health">
      <div class="page-head"><div><p class="eyebrow">Health</p><h1>What your blood asked for.</h1><p class="lede">Latest results: ${CT.esc(latest.label || CT.fmtDate(latest.date, 'month'))}${latest.approxDate ? ' (date approximate)' : ''}. Next check-up ${daysTo == null ? 'not set' : daysTo >= 0 ? `in ${daysTo} days` : `${-daysTo} days overdue`}.</p></div>
        <div class="head-actions"><button class="btn primary sm" data-action="lab-add">${CT.icon('plus')} Add a check-up</button>${CT.ai.available() ? `<a class="btn ghost sm" href="#/claude/labs">${CT.icon('claude')} Explain my results</a>` : ''}</div></div>

      <div class="focus-cards">${focusOn.map((k) => { const f = CT.FOCUS[k]; return `<article class="card focus-detail">
        <header><h3>${f.name}</h3><div class="lab-chips">${f.labs.map((id) => { const l = CT.LABS.find((x) => x.id === id), v = latest.values[id]; return v == null ? '' : `<span class="lab-chip ${CT.labStatus(l, v)}">${l.name} <strong>${v}</strong> <small>${l.unit}</small></span>`; }).join('')}</div></header>
        <p>${f.what}</p>
        <details><summary>What to favour and what to limit</summary><div class="two-col"><div><h4 class="good-t">Favour</h4><ul>${f.favour.map((x) => `<li>${x}</li>`).join('')}</ul></div><div><h4 class="bad-t">Limit</h4><ul>${f.limit.map((x) => `<li>${x}</li>`).join('')}</ul></div></div></details>
      </article>`; }).join('')}</div>

      <div class="card"><h3>Derived numbers</h3><p class="hint">Computed from your latest results. These ratios often say more than single values.</p>
        <div class="stat-row">${derived(latest.values).map((d) => `<div class="stat ${d.st}"><span class="stat-n">${CT.fmt(d.val, d.d || 0)}<small> ${d.unit}</small></span><span class="stat-l">${d.name}</span><span class="stat-t">target ${d.target}</span><span class="stat-why muted">${d.why}</span></div>`).join('')}</div></div>

      <div class="card">
        <div class="row-between"><h3>Lab results</h3><span class="muted small">${labs.length} check-up${labs.length > 1 ? 's' : ''}</span></div>
        ${Object.keys(latest.values).length === 0 ? `<div class="banner">No results entered yet, so the focus areas below are generic. <button class="btn sm primary" data-action="lab-edit" data-i="${labs.length - 1}">Enter your blood test</button> or import a backup under Settings.</div>` : ''}
        <div class="table-wrap"><table class="lab-table"><thead><tr><th>Marker</th><th>Latest</th><th>Range</th><th>Status</th>${labs.length > 1 ? '<th>Trend</th>' : ''}</tr></thead><tbody>
        ${CT.LABS.map((l) => { const v = latest.values[l.id]; if (v == null) return ''; const stt = CT.labStatus(l, v); const series = labs.map((x) => x.values[l.id] == null ? null : Number(x.values[l.id]));
          return `<tr class="${stt}"><th>${l.name}<small class="muted"> ${l.group}</small></th><td class="num">${v} <small>${l.unit}</small></td><td class="muted">${rangeText(l)}${l.ideal ? `<small> · ideal ${l.ideal}</small>` : ''}</td><td><span class="status ${stt}">${STATUS_LABEL[stt]}</span></td>${labs.length > 1 ? `<td>${CT.sparkline(series, { band: [l.lo, l.hi], w: 120, h: 34 })}</td>` : ''}</tr>`; }).join('')}
        </tbody></table></div>
        <div class="row-gap wrap">${labs.map((x, i) => `<span class="chip tiny">${CT.fmtDate(x.date, 'short')} ${x.label ? '· ' + CT.esc(x.label) : ''} <button class="chip-x" data-action="lab-edit" data-i="${i}" aria-label="Edit">${CT.icon('edit')}</button>${labs.length > 1 ? `<button class="chip-x" data-action="lab-delete" data-i="${i}" aria-label="Delete">${CT.icon('x')}</button>` : ''}</span>`).join('')}</div>
        <label class="field inline"><span>Next check-up</span><input type="date" data-change="path" data-path="nextCheckup" data-rerender="1" value="${s.nextCheckup || ''}"></label>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="row-between"><h3>Weight</h3><button class="btn ghost sm" data-action="weight-add">${CT.icon('plus')} Log weight</button></div>
          ${weights.length ? `<div class="weight-row"><span class="stat-n">${CT.fmt(weights[weights.length - 1].kg, 1)}<small> kg</small></span>${weights.length > 1 ? `<span class="muted">${(weights[weights.length - 1].kg - weights[0].kg > 0 ? '+' : '') + CT.fmt(weights[weights.length - 1].kg - weights[0].kg, 1)} kg since ${CT.fmtDate(weights[0].date, 'short')}</span>` : ''}</div>${CT.sparkline(weights.map((w) => w.kg), { w: 260, h: 60 })}` : `<p class="muted">Profile weight ${s.profile.weight} kg · BMI ${CT.fmt(T.bmi, 1)}. Log it weekly; a 5% loss is what moves liver enzymes and triglycerides.</p>`}
        </div>
        <div class="card">
          <h3>Streaks</h3>
          <div class="stat-row compact">
            <div class="stat"><span class="stat-n">${st.cookStreak}</span><span class="stat-l">day streak</span></div>
            <div class="stat"><span class="stat-n">${st.slipFreeDays}</span><span class="stat-l">salame-free days</span></div>
            <div class="stat"><span class="stat-n">${st.mealsCooked}</span><span class="stat-l">meals cooked</span></div>
            <div class="stat"><span class="stat-n">${st.distinctRecipes}</span><span class="stat-l">different recipes</span></div>
            <div class="stat"><span class="stat-n">${st.fishThisWeek}</span><span class="stat-l">fish meals this week</span></div>
            <div class="stat"><span class="stat-n">${st.legumeMeals}</span><span class="stat-l">legume meals</span></div>
          </div>
        </div>
      </div>

      <div class="card"><h3>Achievements</h3><div class="ach-grid">${CT.ACHIEVEMENTS.map((a) => { const when = s.achievements[a.id]; return `<div class="ach ${when ? 'on' : ''}"><span class="ach-icon">${a.icon}</span><strong>${a.name}</strong><small>${a.desc}</small>${when ? `<small class="muted">${CT.fmtDate(when, 'short')}</small>` : ''}</div>`; }).join('')}</div></div>

      <div class="card"><h3>Doctor's notes</h3><textarea class="notes" data-change="path" data-path="doctorNotes" placeholder="What the doctor said, what to re-test, medication and timing…">${CT.esc(s.doctorNotes)}</textarea></div>
      <p class="disclaimer">CookThis is a meal planner, not a medical device. It uses the reference ranges printed on your report and general nutrition guidance. Diagnosis, medication (including anything for the thyroid) and follow-up timing are for your doctor.</p>
    </section>`;
  };

  const labForm = (entry, idx) => `<h3>${idx == null ? 'Add a check-up' : 'Edit check-up'}</h3>
    <form class="form-grid lab-form" data-submit="lab-save" ${idx != null ? `data-i="${idx}"` : ''}>
      <label class="field"><span>Date</span><input type="date" name="date" required value="${entry ? entry.date : CT.today()}"></label>
      <label class="field"><span>Label</span><input type="text" name="label" placeholder="e.g. November follow-up" value="${entry ? CT.esc(entry.label || '') : ''}"></label>
      ${CT.LABS.map((l) => `<label class="field"><span>${l.name} <small class="muted">${l.unit}</small></span><input type="number" step="any" name="${l.id}" value="${entry && entry.values[l.id] != null ? entry.values[l.id] : ''}" placeholder="${rangeText(l)}"></label>`).join('')}
      <div class="dlg-actions span2"><button type="button" class="btn ghost" data-action="dlg-cancel">Cancel</button><button class="btn primary" type="submit">Save</button></div>
    </form>`;
  CT.actions['lab-add'] = () => CT.dialog(labForm(null), { wide: true });
  CT.actions['lab-edit'] = (d) => { const labs = CT.state.labs.slice().sort((a, b) => a.date.localeCompare(b.date)); const e = labs[Number(d.i)]; CT.dialog(labForm(e, CT.state.labs.indexOf(e)), { wide: true }); };
  CT.submits['lab-save'] = (form) => {
    const f = new FormData(form); const values = {};
    for (const l of CT.LABS) { const v = f.get(l.id); if (v !== '' && v != null) values[l.id] = Number(v); }
    const entry = { date: f.get('date'), label: String(f.get('label') || '').slice(0, 60), values };
    if (form.dataset.i != null) CT.state.labs[Number(form.dataset.i)] = entry; else CT.state.labs.push(entry);
    CT.state.labs.sort((a, b) => a.date.localeCompare(b.date));
    CT.save(); CT.closeDialog(); CT.checkAchievements(); CT.toast('Saved.', 'good'); CT.render();
  };
  CT.actions['lab-delete'] = async (d) => { if (CT.state.labs.length <= 1) return; if (!(await CT.confirm('Delete this check-up?', 'The values are removed from trends.', 'Delete', true))) return; const labs = CT.state.labs.slice().sort((a, b) => a.date.localeCompare(b.date)); const e = labs[Number(d.i)]; CT.state.labs = CT.state.labs.filter((x) => x !== e); CT.save(); CT.closeDialog(); CT.render(); };
  CT.actions['weight-add'] = () => CT.dialog(`<h3>Log weight</h3><form class="form-grid" data-submit="weight-save"><label class="field"><span>Date</span><input type="date" name="date" value="${CT.today()}" required></label><label class="field"><span>Weight (kg)</span><input type="number" step="0.1" min="35" max="250" name="kg" value="${CT.state.profile.weight}" required></label><div class="dlg-actions span2"><button type="button" class="btn ghost" data-action="dlg-cancel">Cancel</button><button class="btn primary" type="submit">Save</button></div></form>`);
  CT.submits['weight-save'] = (form) => { const f = new FormData(form); const kg = Number(f.get('kg')); CT.state.weights = CT.state.weights.filter((w) => w.date !== f.get('date')); CT.state.weights.push({ date: f.get('date'), kg }); CT.state.profile.weight = kg; CT.save(); CT.closeDialog(); CT.checkAchievements(); CT.render(); };
})();
