/* Small utilities: DOM, formatting, dates, dialogs, icons. */
CT.$ = (sel, root) => (root || document).querySelector(sel);
CT.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
CT.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
CT.fmt = (n, d = 0) => (n == null || isNaN(n)) ? '–' : Number(n).toLocaleString('en-GB', { minimumFractionDigits: d, maximumFractionDigits: d });
CT.eur = (n) => '€' + CT.fmt(n, 2);
/* Meal slots. The four keys stay fixed so old plans keep working, but what each one is called,
   when it happens and how much of the day's calories it carries are the user's to set. A time
   before 05:00 belongs to the end of the day it was planned for, not the start. */
CT.slotCfg = (k) => {
  const base = CT.SLOTS[k] || {};
  const cfg = ((CT.state && CT.state.prefs && CT.state.prefs.slotCfg) || {})[k] || {};
  const time = cfg.time || base.time || '12:00';
  const [h, m] = time.split(':').map(Number);
  let minutes = (h || 0) * 60 + (m || 0);
  if (minutes < 300) minutes += 1440;
  return { key: k, name: cfg.name || '', time, minutes, share: cfg.share != null ? Number(cfg.share) : base.share, base };
};
CT.slotName = (k) => {
  const c = CT.slotCfg(k);
  if (c.name) return c.name;
  const b = CT.SLOTS[k] || {};
  return (CT.recipeLang && CT.recipeLang() === 'it') ? (b.it || b.en || k) : (b.en || k);
};
CT.slotTimeLabel = (k) => CT.slotCfg(k).time;

/* Recipe language. Italian is the default: the cooking vocabulary is more precise in Italian and
   the list is read in an Italian shop. Everything falls back to English where a translation is
   missing, which is what happens with recipes Claude has just invented. */
CT.recipeLang = () => (((CT.state && CT.state.settings) || {}).recipeLang) || 'it';
CT.rName = (r) => (CT.recipeLang() === 'it' && r.it) ? r.it : r.name;
CT.rSteps = (r) => (CT.recipeLang() === 'it' && r.itSteps) ? r.itSteps : r.steps;
CT.rNote = (r) => (CT.recipeLang() === 'it' && r.itNote) ? r.itNote : (r.note || '');

/* Ingredient naming. Italian leads by default, because the list is read in an Italian supermarket;
   English follows in small type as the check. Either way, a missing translation falls back rather
   than leaving a blank, which matters for ingredients Claude invents on the fly. */
CT.ingNames = (i) => {
  const it = (i.it || '').trim(), en = (i.en || '').trim();
  return CT.recipeLang() === 'it' ? { primary: it || en, secondary: '' } : { primary: en || it, secondary: '' };
};
// The quantity in the left column, translated where we have it.
CT.dispText = (i) => {
  const d = i.disp || '';
  if (CT.recipeLang() !== 'it') return d;
  return (CT.QTY_IT && CT.QTY_IT[d]) || d;
};
// Words the recipe itself uses, as opposed to the surrounding app.
CT.rWord = (en) => {
  if (CT.recipeLang() !== 'it') return en;
  const w = { optional: 'facoltativo', Ingredients: 'Ingredienti', Method: 'Procedimento', serving: 'porzione', servings: 'porzioni', portion: 'porzione' };
  return w[en] || en;
};

// Inline: "pane integrale <em>Wholegrain bread</em>"
CT.ingLabel = (i) => { const n = CT.ingNames(i); return CT.esc(n.primary) + (n.secondary ? ` <em class="it">${CT.esc(n.secondary)}</em>` : ''); };
// For copying and sharing: "pane integrale (Wholegrain bread)"
CT.ingText = (i) => { const n = CT.ingNames(i); return n.primary + (n.secondary ? ` (${n.secondary})` : ''); };

// Plain text from Claude into safe paragraphs.
CT.prose = (t) => CT.esc(t).split(/\n{2,}/).map((x) => '<p>' + x.replace(/\n/g, '<br>') + '</p>').join('');
CT.clamp = (n, a, b) => Math.max(a, Math.min(b, n));
CT.uid = () => Math.random().toString(36).slice(2, 10);
CT.debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
CT.pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
CT.hash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
CT.sum = (arr, f) => arr.reduce((a, x) => a + (f ? f(x) : x), 0);

// ---- Dates (local, ISO yyyy-mm-dd)
CT.today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
CT.parseISO = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); };
CT.addDays = (iso, n) => { const d = CT.parseISO(iso); d.setDate(d.getDate() + n); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
CT.daysBetween = (a, b) => Math.round((CT.parseISO(b) - CT.parseISO(a)) / 86400000);
CT.fmtDate = (iso, style) => {
  const d = CT.parseISO(iso);
  if (style === 'short') return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  if (style === 'day') return d.toLocaleDateString('en-GB', { weekday: 'long' });
  if (style === 'month') return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  if (style === 'num') return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
};
CT.relDay = (iso) => { const n = CT.daysBetween(CT.today(), iso); return n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : n === -1 ? 'Yesterday' : CT.fmtDate(iso, 'short'); };

// ---- Toasts
CT.toast = (msg, kind) => {
  let host = CT.$('#toasts');
  if (!host) { host = document.createElement('div'); host.id = 'toasts'; document.body.appendChild(host); }
  const t = document.createElement('div');
  t.className = 'toast' + (kind ? ' toast-' + kind : '');
  t.textContent = msg;
  host.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2600);
};

// ---- Dialog
CT.dialog = (html, opts = {}) => {
  const dlg = CT.$('#dlg');
  dlg.innerHTML = `<div class="dlg-inner ${opts.wide ? 'wide' : ''}">${html}</div>`;
  if (!dlg.open) dlg.showModal();
  dlg.onclick = (e) => { if (e.target === dlg && !opts.sticky) CT.closeDialog(); };
  if (opts.onOpen) opts.onOpen(dlg);
  return dlg;
};
CT.closeDialog = () => { const dlg = CT.$('#dlg'); if (dlg && dlg.open) dlg.close(); if (dlg) dlg.innerHTML = ''; };
CT.confirm = (title, body, okLabel = 'Confirm', danger = false) => new Promise((resolve) => {
  CT.dialog(`<h3>${CT.esc(title)}</h3><p class="muted">${body}</p>
    <div class="dlg-actions"><button class="btn ghost" data-action="dlg-cancel">Cancel</button><button class="btn ${danger ? 'danger' : 'primary'}" data-action="dlg-ok">${CT.esc(okLabel)}</button></div>`);
  CT._dlgResolve = resolve;
});

// ---- Timers inside recipe steps: "(8 min)", "10 min", "30 seconds"
CT.timerFromStep = (text) => {
  const m = /(\d+)(?:-(\d+))?\s*min/i.exec(text);
  if (m) return Number(m[2] || m[1]) * 60;
  const s = /(\d+)\s*second/i.exec(text);
  if (s) return Number(s[1]);
  return null;
};

// ---- Inline icons (stroke, 24 grid)
CT.ICONS = {
  today: '<path d="M4 10h16M8 3v4M16 3v4M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/>',
  recipes: '<path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h12M9 7h6M9 11h4"/>',
  plan: '<path d="M3 5h18v14H3zM3 10h18M8 5v14M14 5v14"/>',
  shop: '<path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.8h7.9a2 2 0 0 0 2-1.6L21 8H6"/><circle cx="10" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>',
  health: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
  swaps: '<path d="M7 7h11l-3-3M17 17H6l3 3"/>',
  claude: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  shuffle: '<path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  flame: '<path d="M12 22c4.4 0 7-2.8 7-6.5 0-3-1.8-5-3-6.5-.2 1.6-1 2.6-2 3-.2-3-1.8-6.2-5-8 .4 3-1 4.6-2.5 6.3C5 12 5 13.6 5 15.5 5 19.2 7.6 22 12 22z"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  heart: '<path d="M12 21s-7.5-4.6-9.3-9.4C1.4 8 3.6 4.5 7.2 4.5c2 0 3.5 1.1 4.8 2.6 1.3-1.5 2.8-2.6 4.8-2.6 3.6 0 5.8 3.5 4.5 7.1C19.5 16.4 12 21 12 21z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  back: '<path d="M15 18l-6-6 6-6"/>',
  chev: '<path d="M9 6l6 6-6 6"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  unlock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>',
  euro: '<path d="M18 6.5A7 7 0 0 0 6.5 9M18 17.5A7 7 0 0 1 6.5 15M4 10.5h10M4 13.5h10"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  share: '<path d="M12 3v12M8 7l4-4 4 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>',
  dice: '<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.2"/><circle cx="15.5" cy="15.5" r="1.2"/><circle cx="15.5" cy="8.5" r="1.2"/><circle cx="8.5" cy="15.5" r="1.2"/><circle cx="12" cy="12" r="1.2"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  cook: '<path d="M4 10h16v3a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7zM8 7c0-1.5 1-1.5 1-3M12 7c0-1.5 1-1.5 1-3M16 7c0-1.5 1-1.5 1-3"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  edit: '<path d="M4 20h4l10.5-10.5a2 2 0 0 0 0-3l-1-1a2 2 0 0 0-3 0L4 16z"/>',
  more: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
  upload: '<path d="M12 21V9M7 14l5-5 5 5M5 3h14"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  send: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
  leaf: '<path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16zM4 20c4-4 8-8 12-12"/>',
  fish: '<path d="M2 12s4-6 10-6 8 6 8 6-2 6-8 6-10-6-10-6zM20 12l3-4v8zM8 12h.01"/>',
  scale: '<path d="M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
  play: '<path d="M6 4l14 8-14 8z"/>',
  pause: '<path d="M7 4h4v16H7zM13 4h4v16h-4z"/>',
  sync: '<path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 12a9 9 0 0 1 15-6.7L21 8M3 21v-5h5M21 3v5h-5"/>',
  install: '<path d="M12 3v11M8 10l4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
};
CT.icon = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${CT.ICONS[name] || ''}</svg>`;

// ---- Tiny sparkline (SVG string). points: [{x: index, y: value}]; band: [lo, hi] reference range.
CT.sparkline = (values, opts = {}) => {
  const w = opts.w || 160, h = opts.h || 44, pad = 4;
  const vals = values.filter((v) => v != null);
  if (!vals.length) return '';
  let lo = Math.min(...vals), hi = Math.max(...vals);
  if (opts.band) { lo = Math.min(lo, opts.band[0] ?? lo); hi = Math.max(hi, opts.band[1] ?? hi); }
  if (hi === lo) { hi += 1; lo -= 1; }
  const x = (i) => pad + (values.length === 1 ? (w - 2 * pad) / 2 : (i * (w - 2 * pad)) / (values.length - 1));
  const y = (v) => h - pad - ((v - lo) / (hi - lo)) * (h - 2 * pad);
  let band = '';
  if (opts.band) {
    const b0 = opts.band[0] == null ? lo : opts.band[0], b1 = opts.band[1] == null ? hi : opts.band[1];
    band = `<rect x="0" y="${y(b1).toFixed(1)}" width="${w}" height="${Math.max(1, y(b0) - y(b1)).toFixed(1)}" class="spark-band"/>`;
  }
  const pts = values.map((v, i) => (v == null ? null : `${x(i).toFixed(1)},${y(v).toFixed(1)}`)).filter(Boolean);
  const last = values.length - 1;
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">${band}
    ${pts.length > 1 ? `<polyline points="${pts.join(' ')}" class="spark-line"/>` : ''}
    ${values[last] != null ? `<circle cx="${x(last).toFixed(1)}" cy="${y(values[last]).toFixed(1)}" r="3" class="spark-dot"/>` : ''}
  </svg>`;
};
