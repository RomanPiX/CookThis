/* Weekly plan and shopping list. */
(function () {
  CT.views.plan = () => {
    const today = CT.today();
    const days = Array.from({ length: 7 }, (_, i) => CT.addDays(today, i));
    days.forEach((d) => CT.ensurePlan(d));
    const slots = CT.enabledSlots();
    let weekCost = 0, weekFish = 0, weekLegume = 0;
    const cards = days.map((d) => {
      const plan = CT.state.plans[d];
      const rs = slots.map((s) => plan[s] && CT.recipe(plan[s].id)).filter(Boolean);
      const dn = CT.dayNutri(d).planned;
      const kcal = dn.kcal, mins = CT.sum(rs, (r) => r.active), cost = dn.cost;
      weekCost += cost; weekFish += rs.filter((r) => r.fish).length; weekLegume += rs.filter((r) => r.legume).length;
      return `<article class="plan-day ${d === today ? 'is-today' : ''}">
        <header class="row-between"><h3>${CT.relDay(d)} <small class="muted">${CT.fmtDate(d, 'short')}</small></h3><span class="muted small">${CT.fmt(kcal)} kcal · ${mins} min · ${CT.eur(cost)}</span></header>
        ${slots.map((s) => { const p = plan[s]; const r = p && CT.recipe(p.id); if (!r) return ''; return `<div class="plan-row ${p.done ? 'done' : ''}">
          <span class="eyebrow">${CT.SLOTS[s].it}</span>
          <a href="#/recipe/${r.id}?portion=${p.mult || 1}" class="plan-name">${CT.esc(CT.rName(r))}${(p.mult || 1) !== 1 ? ` <span class="chip tiny">×${p.mult}</span>` : ''}</a>
          <span class="muted small nowrap">${r.active} min</span>
          <button class="btn ghost xs icon-only ${p.locked ? 'on' : ''}" data-action="lock-slot" data-date="${d}" data-slot="${s}" title="${p.locked ? 'Unlock' : 'Lock so re-planning keeps it'}" aria-pressed="${!!p.locked}">${CT.icon(p.locked ? 'lock' : 'unlock')}</button>
          <button class="btn ghost xs icon-only" data-action="swap-slot" data-date="${d}" data-slot="${s}" title="Swap" ${p.locked ? 'disabled' : ''}>${CT.icon('shuffle')}</button>
        </div>`; }).join('')}
        <footer class="plan-foot"><button class="btn ghost xs" data-action="regen-day" data-date="${d}">${CT.icon('shuffle')} Re-plan day</button></footer>
      </article>`;
    }).join('');
    return `<section class="plan">
      <div class="page-head"><div><p class="eyebrow">Plan</p><h1>The week ahead.</h1><p class="lede">About <strong>${CT.eur(weekCost)}</strong> for ${slots.length * 7} meals · ${weekFish} fish meals · ${weekLegume} with legumes${weekFish < 2 ? ' <span class="chip tiny warn">aim for 2 fish</span>' : ''}</p></div>
        <div class="head-actions"><button class="btn ghost sm" data-action="regen-week">${CT.icon('shuffle')} Re-plan week</button><a class="btn primary sm" href="#/shop/week">${CT.icon('shop')} Shopping list</a></div></div>
      <p class="hint">Lock a meal to keep it through re-planning. Mark meals as cooked from the Today page; cooked meals are never replaced.</p>
      <div class="plan-grid">${cards}</div>
    </section>`;
  };
  CT.actions['lock-slot'] = (d) => { const p = CT.state.plans[d.date]; if (p && p[d.slot]) { p[d.slot].locked = !p[d.slot].locked; CT.save('plans'); CT.render(); } };

  // ---- Shopping list
  CT.ui.shop = { scope: 'week' };
  const SCOPES = [['today', 'Today'], ['tomorrow', 'Tomorrow'], ['3days', 'Next 3 days'], ['week', 'This week']];
  const scopeDates = (scope) => { const t = CT.today(); return scope === 'today' ? [t] : scope === 'tomorrow' ? [CT.addDays(t, 1)] : scope === '3days' ? [0, 1, 2].map((i) => CT.addDays(t, i)) : Array.from({ length: 7 }, (_, i) => CT.addDays(t, i)); };

  CT.shoppingList = (dates) => {
    const items = {}; let cost = 0; const meals = [];
    for (const d of dates) {
      const plan = CT.ensurePlan(d);
      for (const s of CT.enabledSlots()) {
        const p = plan[s]; const r = p && CT.recipe(p.id); if (!r || p.done) continue;
        const m = p.mult || 1;
        meals.push(r.name);
        for (const i of r.ings) {
          const key = i.id || 'x:' + i.en.toLowerCase();
          const it = items[key] = items[key] || { key, id: i.id, en: i.en, it: i.it, aisle: i.aisle, g: 0, pack: i.pack, liquid: !!(i.id && CT.LIQUID.has(i.id)), pantry: !!(i.id && CT.PANTRY.has(i.id)), price: i.price, uses: 0 };
          it.g += i.g * m; it.uses++;
          cost += (i.price * i.g * m) / 1000;
        }
      }
    }
    return { items: Object.values(items), cost, meals };
  };
  CT.qtyText = (it) => {
    const g = Math.round(it.g);
    let s = it.liquid ? `${g} ml` : `${g} g`;
    if (it.pack) { const n = Math.ceil(it.g / it.pack.g); s += ` · ${n} × ${it.pack.label}`; }
    return s;
  };

  CT.views.shop = ({ scope }) => {
    if (scope) CT.ui.shop.scope = scope;
    const sc = CT.ui.shop.scope, dates = scopeDates(sc);
    const { items, cost, meals } = CT.shoppingList(dates);
    const checked = CT.state.shopChecked;
    const groups = CT.AISLES.map((a) => [a, items.filter((i) => i.aisle === a && !i.pantry).sort((x, y) => x.en.localeCompare(y.en))]).filter(([, l]) => l.length);
    const pantry = items.filter((i) => i.pantry);
    const nChecked = items.filter((i) => checked[sc + '|' + i.key]).length;
    return `<section class="shop">
      <div class="page-head"><div><p class="eyebrow">Shopping list</p><h1>What to buy.</h1><p class="lede">${meals.length} meals still to cook · ${items.length - pantry.length} items · roughly <strong>${CT.eur(cost)}</strong></p></div>
        <div class="head-actions"><button class="btn ghost sm" data-action="shop-copy">${CT.icon('copy')} Copy</button>${navigator.share ? `<button class="btn ghost sm" data-action="shop-share">${CT.icon('share')} Share</button>` : ''}<button class="btn ghost sm" data-action="shop-clear">Clear ticks</button></div></div>
      <div class="chips">${SCOPES.map(([v, l]) => `<a class="chip ${sc === v ? 'on' : ''}" href="#/shop/${v}">${l}</a>`).join('')}</div>
      <p class="hint">Meals already marked as cooked are left out. ${nChecked ? `${nChecked} ticked.` : ''}</p>
      <div class="shop-groups">${groups.map(([a, list]) => `<div class="shop-group"><h3>${a}</h3><ul class="shop-list">${list.map((it) => { const on = !!checked[sc + '|' + it.key]; return `<li class="${on ? 'on' : ''}"><label><input type="checkbox" data-change="shop-check" data-key="${CT.esc(it.key)}" ${on ? 'checked' : ''}><span class="shop-name">${CT.ingLabel(it)}</span><span class="shop-qty">${CT.qtyText(it)}</span></label></li>`; }).join('')}</ul></div>`).join('')}
      ${pantry.length ? `<details class="shop-group pantry"><summary>Pantry check (${pantry.length}) — you probably have these</summary><ul class="shop-list">${pantry.map((it) => `<li><label><input type="checkbox" data-change="shop-check" data-key="${CT.esc(it.key)}" ${checked[sc + '|' + it.key] ? 'checked' : ''}><span class="shop-name">${CT.ingLabel(it)}</span><span class="shop-qty">${CT.qtyText(it)}</span></label></li>`).join('')}</ul></details>` : ''}
      </div>
    </section>`;
  };
  CT.changes['shop-check'] = (d, el) => { const k = CT.ui.shop.scope + '|' + d.key; if (el.checked) CT.state.shopChecked[k] = true; else delete CT.state.shopChecked[k]; CT.save(); el.closest('li').classList.toggle('on', el.checked); };
  CT.actions['shop-clear'] = () => { const sc = CT.ui.shop.scope; for (const k of Object.keys(CT.state.shopChecked)) if (k.startsWith(sc + '|')) delete CT.state.shopChecked[k]; CT.save(); CT.render(); };
  const shopText = () => {
    const sc = CT.ui.shop.scope; const { items, cost } = CT.shoppingList(scopeDates(sc));
    const lines = [`CookThis · shopping list (${SCOPES.find((s) => s[0] === sc)[1].toLowerCase()}) · about ${CT.eur(cost)}`, ''];
    for (const a of CT.AISLES) { const l = items.filter((i) => i.aisle === a && !i.pantry); if (!l.length) continue; lines.push(a.toUpperCase()); for (const it of l) lines.push(`☐ ${CT.ingText(it)} — ${CT.qtyText(it)}`); lines.push(''); }
    const p = items.filter((i) => i.pantry); if (p.length) { lines.push('PANTRY CHECK'); for (const it of p) lines.push(`☐ ${CT.ingText(it)}`); }
    return lines.join('\n');
  };
  CT.actions['shop-copy'] = async () => { try { await navigator.clipboard.writeText(shopText()); CT.toast('List copied.', 'good'); } catch (e) { CT.dialog(`<h3>Copy your list</h3><textarea class="export" readonly>${CT.esc(shopText())}</textarea><div class="dlg-actions"><button class="btn primary" data-action="dlg-cancel">Done</button></div>`); } };
  CT.actions['shop-share'] = async () => { try { await navigator.share({ title: 'CookThis shopping list', text: shopText() }); } catch (e) { /* user cancelled */ } };
})();
