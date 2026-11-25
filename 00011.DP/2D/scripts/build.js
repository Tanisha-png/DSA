// Builds the site into site/ and a Markdown copy of the 2D DP notes.
//   site/index.html   Home: list of DSA topics
//   site/dp/1d.html   Dynamic Programming → 1D DP tab
//   site/dp/2d.html   Dynamic Programming → 2D DP tab
//   2D_DP_Notes.md    Same content as the 2D page, as plain Markdown
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), SRC = path.join(ROOT, 'src'), OUT = path.join(ROOT, 'site');
const read = (f) => fs.readFileSync(path.join(SRC, f), 'utf8');
const safe = (s) => s.replace(/<\/script/gi, '<\\/script');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// content.js declares consts; evaluate it once to read them here too.
const C = new Function(read('content.js') + '\nreturn { FAMILIES, PROBLEMS, TOPICS, DP1D };')();
const SOLUTIONS = require(path.join(SRC, 'solutions.js'));
const VIZ = require(path.join(SRC, 'viz.js'));

const CSS = read('style.css'), COMMON = read('common.js');

const LOGO = `<svg class="logo__mark" viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="2" width="12.5" height="12.5" rx="3.5" class="lm-a"/><rect x="17.5" y="2" width="12.5" height="12.5" rx="3.5" class="lm-b"/><rect x="2" y="17.5" width="12.5" height="12.5" rx="3.5" class="lm-b"/><rect x="17.5" y="17.5" width="12.5" height="12.5" rx="3.5" class="lm-c"/></svg>`;
const THEME_ICON = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor"/></svg>`;

const orbit = (href, label, back) => `<a class="orbit${back ? ' orbit--back' : ''}" href="${href}"><span>${label}</span><i class="orbit__dot">${back ? '&larr;' : '&rarr;'}</i></a>`;

// Header: row 1 = logo (home) + theme. Row 2 = breadcrumb (+ 1D / 2D switch on DP pages).
function page({ title, desc, up, crumbs, tab, body, scripts = '', fonts = '' }) {
  const crumbHtml = crumbs.map(([label, href], k) => {
    const last = k === crumbs.length - 1;
    const inner = href && !last ? `<a href="${href}">${esc(label)}</a>` : `<span${last ? ' aria-current="page"' : ''}>${esc(label)}</span>`;
    return `<li${k === 0 ? ' class="root"' : ''}>${inner}</li>`;
  }).join('');
  const tabs = tab ? `<nav class="tabbar" aria-label="Dynamic Programming">
      <a href="1d.html"${tab === '1d' ? ' aria-current="page"' : ''}>1D DP</a>
      <a href="2d.html"${tab === '2d' ? ' aria-current="page"' : ''}>2D DP</a>
    </nav>` : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap">
${fonts}
<style>
${CSS}
</style>
</head>
<body>
<header class="topbar">
  <div class="hrow hrow--top">
    <a class="logo" href="${up}index.html" aria-label="DSA Notes: all topics">${LOGO}<span>DSA<b>Notes</b></span></a>
    <button class="theme-btn" type="button" aria-label="Switch colour theme">${THEME_ICON}<span>Theme</span></button>
  </div>
  <div class="hrow hrow--crumbs">
    <nav aria-label="Breadcrumb"><ol class="crumbs">${crumbHtml}</ol></nav>
    ${tabs}
  </div>
</header>
${body}
<script>
${safe(COMMON)}
</script>
${scripts}
</body>
</html>
`;
}

// ---------- Home ----------
const home = page({
  title: 'DSA Notes', desc: 'Data structures and algorithms notes, by topic.', up: '',
  crumbs: [['DSA', 'index.html'], ['All topics']],
  body: `<main class="page">
  <h1>Topics</h1>
  <p class="lead">Pick a topic. Dashed ones are not written yet.</p>
  <ul class="topics">
    ${C.TOPICS.map(t => t.href
      ? `<li><a href="${t.href}"><b>${esc(t.name)}</b><small>${esc(t.sub)}</small></a></li>`
      : `<li><div class="off"><b>${esc(t.name)}</b><small>Not started</small></div></li>`).join('\n    ')}
  </ul>
  <h2 class="home-h2">Design</h2>
  <ul class="topics">
    <li><a href="ui.html"><b>UI Components</b><small>35 designs: buttons, links, lists, hover, boxes, shadows, colours</small></a></li>
    <li><a href="ui2.html"><b>Tables &amp; Lists</b><small>10 designs: 5 tables, 5 lists</small></a></li>
  </ul>
</main>`
});

// ---------- UI components ----------
const ui = page({
  title: 'UI Components', desc: 'Buttons, links, lists, hover effects, boxes, shadows and colour palettes with copyable HTML, CSS and JS.', up: '',
  crumbs: [['DSA', 'index.html'], ['UI Components']],
  fonts: '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700;800&display=swap">',
  body: `<main class="page ui-page">
  <header class="ui-hero">
    <div class="eyebrow">Design</div>
    <h1>UI Components</h1>
    <p class="lead">35 designs in 7 groups. Hover and click the demos, then open Code to copy the HTML, CSS and JS.</p>
    <div class="orbit-links">${orbit('ui2.html', 'Tables &amp; Lists')}</div>
  </header>
  <nav class="ui-nav" id="ui-nav" aria-label="Component groups"></nav>
  <div id="ui-groups"></div>
</main>`,
  scripts: `<script>
${safe(read('ui-components.js'))}
${safe(read('ui.js'))}
</script>`
});

// ---------- Tables & lists (ui2) ----------
const ui2 = page({
  title: 'Tables & Lists', desc: 'Five table designs and five list designs with copyable HTML, CSS and JS.', up: '',
  crumbs: [['DSA', 'index.html'], ['UI Components', 'ui.html'], ['Tables & Lists']],
  fonts: '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700;800&display=swap">',
  body: `<main class="page ui-page">
  <header class="ui-hero">
    <div class="eyebrow">Design</div>
    <h1>Tables &amp; Lists</h1>
    <p class="lead">5 tables and 5 lists. Hover, click, sort and drag the demos, then open Code to copy the HTML, CSS and JS.</p>
    <div class="orbit-links">${orbit('ui.html', 'UI Components', true)}${orbit('index.html', 'All topics')}</div>
  </header>
  <nav class="ui-nav" id="ui-nav" aria-label="Component groups"></nav>
  <div id="ui-groups"></div>
</main>`,
  scripts: `<script>
${safe(read('ui2-components.js'))}
${safe(read('ui.js'))}
</script>`
});

// ---------- 1D DP ----------
const dp1 = page({
  title: '1D DP', desc: 'One-dimensional dynamic programming.', up: '../', tab: '1d',
  crumbs: [['DSA', '../index.html'], ['Dynamic Programming', '2d.html'], ['1D DP']],
  body: `<main class="page">
  <h1>1D Dynamic Programming</h1>
  <p class="lead">Not written yet. Planned:</p>
  <ul class="topics">
    ${C.DP1D.map(([name, lc]) => `<li><div class="off"><b>${esc(name)}</b><small>LC ${lc}</small></div></li>`).join('\n    ')}
  </ul>
</main>`
});

// ---------- 2D DP ----------
const dp2 = page({
  title: '2D DP', desc: '22 two-dimensional DP problems in JavaScript with step-through tables.', up: '../', tab: '2d',
  crumbs: [['DSA', '../index.html'], ['Dynamic Programming', '2d.html'], ['2D DP']],
  body: read('pages/_svgdefs.html') + read('pages/dp-2d.html'),
  scripts: `<script>
${safe(read('content.js'))}
${safe(read('solutions.js'))}
${safe(read('viz.js'))}
${safe(read('diagrams.js'))}
</script>
<script>
${safe(read('main.js'))}
</script>`
});

fs.mkdirSync(path.join(OUT, 'dp'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'index.html'), home);
fs.writeFileSync(path.join(OUT, 'ui.html'), ui);
fs.writeFileSync(path.join(OUT, 'ui2.html'), ui2);
fs.writeFileSync(path.join(OUT, 'dp', '1d.html'), dp1);
fs.writeFileSync(path.join(OUT, 'dp', '2d.html'), dp2);

// ---------- Markdown copy ----------
const md = (h) => String(h)
  .replace(/<code>(.*?)<\/code>/g, '`$1`').replace(/<\/?b>/g, '**').replace(/<\/?i>/g, '*')
  .replace(/<sup>(.*?)<\/sup>/g, '^$1').replace(/<[^>]+>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const cardLabels = ['State', 'Choices', 'Recurrence', 'Base cases', 'Answer', 'Fill order'];
function finalTable(P) {
  const spec = VIZ.B[P.viz], p = Object.fromEntries(spec.inputs.map(x => [x.k, x.v])), r = spec.build(p);
  if (!r.rows.length) return '';
  const vals = r.cells.map(row => row.map(c => c.v));
  for (const s of r.steps) vals[s.i][s.j] = s.v;
  const cell = (v) => (v === undefined ? '' : VIZ.fmt(v));
  const w = Math.max(5, ...r.cols.map(c => String(c).length), ...vals.flat().map(v => cell(v).length));
  const rw = Math.max(...r.rows.map(x => String(x).length));
  const line = (h, xs) => String(h).padEnd(rw) + ' | ' + xs.map(x => String(x).padStart(w)).join(' ');
  return `Filled table for ${spec.inputs.map(x => `${x.k} = ${x.v}`).join(', ')}:\n\n\`\`\`\n${line('', r.cols)}\n${r.rows.map((h, i) => line(h, vals[i].map(cell))).join('\n')}\n\`\`\`\n\n`;
}
let out = '# 2D Dynamic Programming\n\nGenerated from `src/` by `scripts/build.js`. Edit the sources, not this file.\n\n';
for (const F of C.FAMILIES) {
  out += `## ${F.id}. ${F.name}\n\n${F.points.map(x => '- ' + md(x)).join('\n')}\n- State: ${md(F.state)}\n\n`;
  for (const P of C.PROBLEMS.filter(p => p.fam === F.id)) {
    out += `### ${P.id}. ${P.title} (LC ${P.lc}, ${P.diff})\n\n${P.url}\n\n${md(P.statement)}\n\n\`\`\`\n${P.example}\n\`\`\`\n\n`;
    out += `| DP card | |\n| --- | --- |\n${P.card.map((c, i) => `| ${cardLabels[i]} | ${md(c).replace(/\|/g, '\\|')} |`).join('\n')}\n\n`;
    out += P.notes.map(x => '- ' + md(x)).join('\n') + '\n\n';
    out += finalTable(P);
    for (const b of SOLUTIONS[P.id]) out += `**${b.label}**${b.note ? ' — ' + b.note : ''}\n\n\`\`\`js\n${b.code}\n\`\`\`\n\n`;
    if (P.tries.length) out += P.tries.map(t => `- Q: ${md(t.q)}\n  A: ${md(t.a)}`).join('\n') + '\n\n';
    out += `Complexity: ${md(P.cx)}\n\n`;
  }
}
fs.writeFileSync(path.join(ROOT, '2D_DP_Notes.md'), out);
console.log('built site/index.html, site/ui.html, site/ui2.html, site/dp/1d.html, site/dp/2d.html (' + dp2.length + ' bytes), 2D_DP_Notes.md');
