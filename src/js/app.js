/* Router, shell rendering, event delegation and boot. */
(function () {
  const NAV = [['today', 'Today', 'today'], ['recipes', 'Recipes', 'recipes'], ['plan', 'Plan', 'plan'], ['shop', 'Shop', 'shop'], ['health', 'Health', 'health']];
  const MORE = [['swaps', 'Swap guide', 'swaps'], ['claude', 'Claude', 'claude'], ['settings', 'Settings', 'settings']];
  const TITLES = { today: 'Today', recipes: 'Recipes', recipe: 'Recipe', plan: 'Plan', shop: 'Shopping list', health: 'Health', swaps: 'Swap guide', claude: 'Claude', settings: 'Settings', setup: 'Setup' };

  CT.parseHash = () => {
    const raw = location.hash.replace(/^#\/?/, '');
    const [pathPart, qs] = raw.split('?');
    const parts = pathPart.split('/').filter(Boolean);
    const name = parts[0] || (CT.state.setupDone ? 'today' : 'setup');
    const params = { query: {} };
    if (name === 'recipe') params.id = decodeURIComponent(parts[1] || '');
    if (name === 'claude') params.tab = parts[1] || '';
    if (name === 'shop') params.scope = parts[1] || '';
    if (qs) for (const [k, v] of new URLSearchParams(qs)) params.query[k] = v;
    return { name, params };
  };
  CT.go = (hash) => { if (location.hash === hash) CT.render(); else location.hash = hash; };

  const navLink = ([key, label, icon], active, cls) => `<a class="${cls} ${active === key ? 'on' : ''}" href="#/${key}" ${active === key ? 'aria-current="page"' : ''}>${CT.icon(icon)}<span>${label}</span></a>`;
  const renderNav = (active) => {
    const rail = CT.$('#rail'), tab = CT.$('#tabbar'), top = CT.$('#topbar');
    const hide = !CT.state.setupDone || active === 'setup';
    rail.hidden = hide; tab.hidden = hide; top.hidden = hide;
    CT.$('#app').classList.toggle('no-nav', hide);
    if (hide) return;
    const st = CT.stats();
    rail.innerHTML = `<a class="brand" href="#/today">${CT.brandmark(34)}<span>CookThis</span></a>
      <nav class="rail-nav">${NAV.map((n) => navLink(n, active, 'rail-link')).join('')}<span class="rail-sep"></span>${MORE.map((n) => navLink(n, active, 'rail-link')).join('')}</nav>
      <div class="rail-foot"><span class="streak-chip" title="Cooking streak">${CT.icon('flame')} ${st.cookStreak}</span><span class="streak-chip alt" title="Days without cured meat">${st.slipFreeDays} salame-free</span><span id="syncbadge">${syncBadge()}</span></div>`;
    tab.innerHTML = NAV.map((n) => navLink(n, active, 'tab-link')).join('') + `<button class="tab-link ${MORE.some((m) => m[0] === active) ? 'on' : ''}" data-action="more-menu">${CT.icon('more')}<span>More</span></button>`;
    top.innerHTML = `<a class="brand" href="#/today">${CT.brandmark(28)}<span>CookThis</span></a>
      <div class="top-right"><span class="streak-chip" title="Cooking streak">${CT.icon('flame')} ${st.cookStreak}</span><span class="streak-chip alt" title="Days without cured meat">${st.slipFreeDays} <small>salame-free</small></span><span id="syncbadge-m">${syncBadge()}</span></div>`;
  };
  const syncBadge = () => CT.syncStatus === 'synced' ? `<span class="sync ok" title="Synced with your Claude account">${CT.icon('sync')}</span>` : CT.syncStatus === 'error' ? `<span class="sync bad" title="Sync problem, saved locally">${CT.icon('sync')}</span>` : '';
  CT.renderSyncBadge = () => { for (const id of ['#syncbadge', '#syncbadge-m']) { const el = CT.$(id); if (el) el.innerHTML = syncBadge(); } };

  CT.actions['more-menu'] = () => CT.dialog(`<h3>More</h3><div class="menu">${MORE.map(([k, l, i]) => `<a class="menu-item" href="#/${k}" data-action="dlg-cancel">${CT.icon(i)} ${l}</a>`).join('')}</div>`);
  CT.actions['dlg-cancel'] = (d, el, ev) => { if (CT._dlgResolve) { CT._dlgResolve(false); CT._dlgResolve = null; } CT.closeDialog(); if (el && el.tagName === 'A' && el.getAttribute('href')) location.hash = el.getAttribute('href'); };
  CT.actions['dlg-ok'] = () => { if (CT._dlgResolve) { CT._dlgResolve(true); CT._dlgResolve = null; } };
  CT.actions.install = async () => { const p = CT.installPrompt; if (!p) return; p.prompt(); try { await p.userChoice; } catch (e) { /* dismissed */ } CT.installPrompt = null; CT.ui.installBanner = false; CT.render(); };
  CT.actions['dismiss-install'] = () => { CT.ui.installBanner = false; try { localStorage.setItem('ct.installDismissed', '1'); } catch (e) { /* ignore */ } CT.render(); };

  const darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  CT.isDark = () => { const t = (CT.state.settings || {}).theme || 'auto'; return t === 'dark' || (t === 'auto' && !!(darkQuery && darkQuery.matches)); };
  CT.applyTheme = () => {
    const s = CT.state.settings || {}, root = document.documentElement;
    if ((s.theme || 'auto') === 'auto') root.removeAttribute('data-theme'); else root.dataset.theme = s.theme;
    const pal = CT.PALETTES[s.palette] || CT.PALETTES[CT.DEFAULT_PALETTE];
    const tokens = CT.isDark() ? pal.dark : pal.light;
    for (const k in tokens) root.style.setProperty('--' + k, tokens[k]);
    root.dataset.palette = s.palette || CT.DEFAULT_PALETTE;
    for (const m of CT.$$('meta[name="theme-color"]')) m.setAttribute('content', tokens.accent);
  };
  if (darkQuery && darkQuery.addEventListener) darkQuery.addEventListener('change', () => { if (((CT.state.settings || {}).theme || 'auto') === 'auto') CT.applyTheme(); });

  let lastRoute = '';
  CT.render = () => {
    const route = CT.route = CT.parseHash();
    if (!CT.state.setupDone && route.name !== 'setup') { location.hash = '#/setup'; return; }
    const view = CT.views[route.name] || CT.views.today;
    let html;
    try { html = view(route.params); } catch (e) { console.error(e); html = `<section><p class="empty">Something went wrong rendering this page. <button class="btn ghost sm" data-action="reload">Reload</button></p><pre class="stream">${CT.esc(e && e.stack || e)}</pre></section>`; }
    CT.$('#view').innerHTML = html;
    renderNav(route.name);
    CT.applyTheme();
    document.title = (TITLES[route.name] ? TITLES[route.name] + ' · ' : '') + 'CookThis';
    const key = route.name + '/' + (route.params.id || route.params.tab || route.params.scope || '');
    if (key !== lastRoute) { window.scrollTo(0, 0); lastRoute = key; }
    if (CT.after[route.name]) CT.after[route.name](route.params);
    const chat = CT.$('#chat'); if (chat) chat.scrollTop = chat.scrollHeight;
  };
  CT.actions.reload = () => location.reload();

  // ---- Event delegation
  // Forms are driven from the click, not from the browser's own submit: the artifact viewer frames
  // the page in a sandbox that blocks form submission, so a native submit event never arrives there.
  const runForm = (form, e) => {
    if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;
    const fn = (CT.submits || {})[form.dataset.submit];
    if (!fn) return;
    try { fn(form, e); } catch (err) { console.error(err); CT.toast('That did not go through. Try again.', 'bad'); }
  };
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn && btn.type === 'submit') {
      const form = btn.closest('form[data-submit]');
      if (form) { e.preventDefault(); runForm(form, e); return; }
    }
    const a = e.target.closest('[data-action]'); if (!a) return;
    const fn = CT.actions[a.dataset.action]; if (!fn) return;
    e.preventDefault();
    fn(a.dataset, a, e);
  });
  document.addEventListener('change', (e) => { const el = e.target.closest('[data-change]'); if (!el) return; const fn = CT.changes[el.dataset.change]; if (fn) fn(el.dataset, el, e); });
  document.addEventListener('input', (e) => { const el = e.target.closest('[data-input]'); if (!el) return; const fn = (CT.inputs || {})[el.dataset.input]; if (fn) fn(el.dataset, el, e); });
  document.addEventListener('submit', (e) => { const f = e.target.closest('[data-submit]'); if (!f) return; e.preventDefault(); runForm(f, e); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { const cm = CT.$('#cookmode'); if (cm && !cm.hidden) CT.actions['cook-close'](); return; }
    if (e.key !== 'Enter') return;
    const el = e.target;
    if (!el || !el.closest) return;
    const form = el.closest('form[data-submit]'); if (!form) return;
    // Enter sends from a single-line field; in a textarea it needs Ctrl or Cmd, so newlines still work.
    const isText = el.tagName === 'TEXTAREA';
    if (isText ? (e.ctrlKey || e.metaKey) : (el.tagName === 'INPUT' && !/checkbox|radio|file/.test(el.type) && !e.shiftKey)) {
      e.preventDefault();
      runForm(form, e);
    }
  });

  // ---- Boot
  const boot = async () => {
    CT.load();
    CT.applyTheme();
    CT._day = CT.today();
    const hasClaude = !!(window.claude && typeof window.claude.use === 'function');
    if (hasClaude && !CT.state.setupDone) {
      const splash = CT.$('#splash'); splash.hidden = false;
      await Promise.race([CT.syncInit(), new Promise((r) => setTimeout(r, 6000))]);
      splash.hidden = true;
    } else if (hasClaude) {
      CT.syncInit();
    }
    if (!location.hash) location.hash = CT.state.setupDone ? '#/today' : '#/setup';
    CT.render();
    window.addEventListener('hashchange', CT.render);
    CT.ai.get().then(() => { if (CT.ai.available()) CT.render(); });
    setInterval(() => { if (CT.today() !== CT._day) { CT._day = CT.today(); CT.render(); } }, 60000);
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); CT.installPrompt = e; let dismissed = false; try { dismissed = !!localStorage.getItem('ct.installDismissed'); } catch (err) { /* ignore */ } if (!dismissed && CT.state.setupDone) { CT.ui.installBanner = true; CT.render(); } });
    window.addEventListener('appinstalled', () => { CT.installPrompt = null; CT.ui.installBanner = false; CT.toast('Installed. Find CookThis on your home screen.', 'good'); CT.render(); });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
