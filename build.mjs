// CookThis build: assembles src/ into
//   docs/index.html    -> standalone PWA (GitHub Pages serves /docs)
//   dist/artifact.html -> body fragment for publishing as a claude.ai Artifact
import fs from 'node:fs';
import path from 'node:path';

const read = (p) => fs.readFileSync(p, 'utf8');
const SRC = 'src';
const version = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');

const css = read(`${SRC}/styles.css`);
const markup = read(`${SRC}/markup.html`);
const jsFiles = [
  'data/ingredients.js',
  'data/recipes-breakfast.js',
  'data/recipes-lunch.js',
  'data/recipes-dinner.js',
  'data/recipes-snacks.js',
  'data/recipes-italian.js',
  'data/recipes-chicken.js',
  'data/recipes-cold.js',
  'data/quantities-it.js',
  'data/recipes-it-a.js',
  'data/recipes-it-b.js',
  'data/recipes-it-c.js',
  'data/recipes-it-d.js',
  'data/recipes-it-e.js',
  'data/content.js',
  'js/palettes.js',
  'js/util.js',
  'js/nutrition.js',
  'js/store.js',
  'js/planner.js',
  'js/ai.js',
  'js/ai-recipe.js',
  'js/ai-tools.js',
  'js/views-setup.js',
  'js/views-today.js',
  'js/views-recipes.js',
  'js/views-plan-shop.js',
  'js/views-health.js',
  'js/views-more.js',
  'js/app.js',
];
// Every file is wrapped so that a throw while loading one cannot abort the ones after it. The app
// then degrades instead of going blank, and the console names the file that failed. Files talk to
// each other through the CT namespace, never through bare top-level bindings, so the extra block
// scope changes nothing.
const js = jsFiles.map((f) => `// ==== ${f}\ntry {\n${read(`${SRC}/${f}`)}\n} catch (ctLoadError) { console.error('CookThis: ${f} failed to load', ctLoadError); }`).join('\n\n');

const config = JSON.parse(read('config.json'));
// personal.json holds real medical values and is never committed (see .gitignore). Only the
// artifact build — a private page — gets them; the public docs/ build ships with empty labs,
// and the user enters or imports their own on first run.
const personal = fs.existsSync('personal.json') ? JSON.parse(read('personal.json')) : {};
const configJs = `window.CT_CONFIG=${JSON.stringify({ ...config, ...personal, build: version })};`;
const configJsPublic = `window.CT_CONFIG=${JSON.stringify({ ...config, build: version })};`;

const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;0,6..96,700;1,6..96,400&family=Archivo:wght@400;500;600;700&display=swap">`;

// ---- Artifact fragment (no doctype/html/head/body; title + style first)
const fragment = `<title>CookThis</title>
${fontLink}
<style>
${css}
</style>
${markup}
<script>
${configJs}
${js}
</script>`;
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/artifact.html', fragment);

// ---- Standalone PWA document
const full = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#0C0C0D">
<meta name="description" content="CookThis: a fast, lazy-cook-friendly meal planner tuned to your blood work.">
<link rel="manifest" href="./manifest.webmanifest">
<link rel="icon" href="./icons/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="./icons/icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="CookThis">
<title>CookThis</title>
${fontLink}
<style>
${css}
</style>
</head>
<body>
${markup}
<script>
${configJsPublic}
${js}
if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').then((reg) => {
    // A new build was fetched in the background: offer a one-tap reload.
    reg.addEventListener('updatefound', () => {
      const nw = reg.installing; if (!nw) return;
      nw.addEventListener('statechange', () => {
        if (nw.state === 'installed' && navigator.serviceWorker.controller) {
          const t = document.createElement('button'); t.className = 'toast toast-good show'; t.style.pointerEvents = 'auto'; t.style.border = '0'; t.style.cursor = 'pointer';
          t.textContent = 'CookThis was updated. Tap to reload.'; t.onclick = () => location.reload();
          document.getElementById('toasts').appendChild(t);
        }
      });
    });
  }).catch(() => {}));
}
</script>
</body>
</html>
`;
fs.mkdirSync('docs/icons', { recursive: true });
fs.writeFileSync('docs/index.html', full);
fs.writeFileSync('docs/sw.js', read('pwa/sw.js').replace('__VERSION__', version));
fs.writeFileSync('docs/manifest.webmanifest', read('pwa/manifest.webmanifest'));
fs.writeFileSync('docs/.nojekyll', '');
for (const f of fs.readdirSync('pwa/icons')) fs.copyFileSync(path.join('pwa/icons', f), path.join('docs/icons', f));

console.log(`Built ${version}: docs/index.html (${(full.length / 1024).toFixed(0)} KB), dist/artifact.html (${(fragment.length / 1024).toFixed(0)} KB)`);
