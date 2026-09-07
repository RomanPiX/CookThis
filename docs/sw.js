// CookThis service worker: app shell cached for offline use.
const VERSION = '202609071813';
const SHELL = `cookthis-shell-${VERSION}`;
const RUNTIME = 'cookthis-runtime';
const PRECACHE = ['./', './index.html', './manifest.webmanifest', './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('cookthis-shell-') && k !== SHELL).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Navigations to the app itself: serve the cached shell, refresh it in the background.
  const scopePath = new URL(self.registration.scope).pathname;
  if (req.mode === 'navigate' && url.origin === location.origin && (url.pathname === scopePath || url.pathname === scopePath + 'index.html')) {
    e.respondWith(
      caches.match('./index.html').then((cached) => {
        const fresh = fetch(req)
          .then((res) => { if (res.ok) caches.open(SHELL).then((c) => c.put('./index.html', res.clone())); return res; })
          .catch(() => cached);
        return cached || fresh;
      })
    );
    return;
  }

  // Same-origin assets: cache first.
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        if (res.ok) caches.open(SHELL).then((c) => c.put(req, res.clone()));
        return res;
      }))
    );
    return;
  }

  // Fonts: stale-while-revalidate so the app keeps its typefaces offline.
  if (/fonts\.(googleapis|gstatic)\.com/.test(url.host)) {
    e.respondWith(
      caches.open(RUNTIME).then(async (c) => {
        const cached = await c.match(req);
        const fresh = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => cached);
        return cached || fresh;
      })
    );
  }
});
