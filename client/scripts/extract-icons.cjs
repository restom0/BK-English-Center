/**
 * extract-icons.cjs
 * Renders developer-icons React components to standalone SVG files.
 * Run: node scripts/extract-icons.cjs
 */
const { createRequire } = require('node:module');
const path  = require('node:path');
const fs    = require('node:fs');

// ── Patch: make developer-icons (ESM) loadable from CJS via dynamic import ──
(async () => {
  const { renderToStaticMarkup } = require('react-dom/server');
  const React = require('react');

  // dynamic import ESM package
  const icons = await import('developer-icons');

  const WANT = {
    nodejs:     'NodeJs',
    javascript: 'JavaScript',
    html5:      'HTML5',
    css3:       'CSS3',
    postgresql: 'PostgreSQL',
    redis:      'Redis',
    docker:     'Docker',
    expressjs:  'ExpressJsLight',   // light variant for dark bg, dark for white bg
    expressjsdark: 'ExpressJsDark',
    prisma:     'Prisma',
    bootstrap:  'Bootstrap5',
    nginx:      'Nginx',
    github:     'GitHubDark',
    githublight:'GitHubLight',
    tailwindcss:'TailwindCSS',
  };

  const outDir = path.join(__dirname, '..', 'img', 'dev-icons');
  fs.mkdirSync(outDir, { recursive: true });

  let count = 0;
  for (const [slug, exportName] of Object.entries(WANT)) {
    const Comp = icons[exportName];
    if (!Comp) { console.warn(`  ⚠  ${exportName} not found`); continue; }
    try {
      const markup = renderToStaticMarkup(React.createElement(Comp, { size: 48 }));
      // strip the outer <svg ...> wrapper attrs that include width/height so CSS controls sizing
      const svg = markup
        .replace(/width="\d+"/, 'width="100%"')
        .replace(/height="\d+"/, 'height="100%"');
      fs.writeFileSync(path.join(outDir, `${slug}.svg`), svg);
      console.log(`  ✅  ${slug}.svg`);
      count++;
    } catch (e) {
      console.error(`  ❌  ${exportName}: ${e.message}`);
    }
  }
  console.log(`\nExtracted ${count} icons → client/img/dev-icons/`);
})();
// ^ already executed, appended only for reference
