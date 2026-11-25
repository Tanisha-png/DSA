// Hand-built SVG diagrams. Colours come from CSS classes, so they follow the theme.
const DG = (() => {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const svg = (w, h, body, label) => `<svg class="dg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" style="max-width:${w}px">${body}</svg>`;
  const rect = (x, y, w, h, cls, rx = 6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${cls}"/>`;
  const text = (x, y, t, cls = 't', anchor = 'middle') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}" dominant-baseline="central">${esc(t)}</text>`;
  function arrow(x1, y1, x2, y2, kind = 'ink', s1 = 16, s2 = 18) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    const ax = x1 + dx * s1 / L, ay = y1 + dy * s1 / L, bx = x2 - dx * s2 / L, by = y2 - dy * s2 / L;
    return `<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" class="ar ar-${kind}" marker-end="url(#ah-${kind})"/>`;
  }
  const path = (d, kind) => `<path d="${d}" class="ar ar-${kind}" fill="none" marker-end="url(#ah-${kind})"/>`;
  const ctr = (x0, y0, s, i, j) => [x0 + j * s + s / 2, y0 + i * s + s / 2];
  function grid(x0, y0, R, C, s, fn) {
    let o = '';
    for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) {
      const c = fn(i, j); if (!c) continue;
      o += rect(x0 + j * s + 2, y0 + i * s + 2, s - 4, s - 4, 'c ' + (c.cls || 'c-cell'), 5);
      if (c.t !== undefined && c.t !== '') o += text(x0 + j * s + s / 2, y0 + i * s + s / 2, c.t, c.tc || 't');
    }
    return o;
  }
  const lbl = (x, y, t, anchor = 'middle') => text(x, y, t, 't-lab', anchor);

  const D = {};

  // ----- Start here: recursion tree for 3 x 3 Unique Paths -----
  D.tree = () => {
    const T = { l: '2,2', c: [
      { l: '1,2', c: [{ l: '0,2', c: [{ l: '0,1' }] }, { l: '1,1', d: 1, c: [{ l: '0,1', d: 1 }, { l: '1,0', d: 1 }] }] },
      { l: '2,1', c: [{ l: '1,1', d: 1, c: [{ l: '0,1', d: 1 }, { l: '1,0', d: 1 }] }, { l: '2,0', c: [{ l: '1,0' }] }] }
    ] };
    let leaf = 0; const nodes = [], edges = [];
    (function place(n, depth) {
      if (!n.c) { n.x = 40 + leaf * 78; leaf++; }
      else { n.c.forEach(ch => place(ch, depth + 1)); n.x = (n.c[0].x + n.c[n.c.length - 1].x) / 2; }
      n.y = 26 + depth * 66; nodes.push(n);
      if (n.c) n.c.forEach(ch => edges.push([n, ch]));
    })(T, 0);
    const W = 40 + leaf * 78 - 38 + 40;
    let o = edges.map(([a, b]) => `<line x1="${a.x}" y1="${a.y + 14}" x2="${b.x}" y2="${b.y - 14}" class="edge ${b.d ? 'edge-dup' : ''}"/>`).join('');
    o += nodes.map(n => rect(n.x - 32, n.y - 14, 64, 28, 'c ' + (n.d ? 'c-cur' : 'c-cell'), 14) + text(n.x, n.y, 'dp(' + n.l + ')', 't t-sm')).join('');
    return svg(W, 26 + 3 * 66 + 24, o, 'Recursion tree for a 3 by 3 grid with the repeated subtree highlighted');
  };

  // ----- Start here: two directions -----
  D.directions = () => {
    const s = 46, R = 4, C = 4;
    const left = grid(20, 40, R, C, s, (i, j) => (i === 1 && j === 1 ? { cls: 'c-cur', t: 'i,j' } : (i === 1 && j === 2) || (i === 2 && j === 1) ? { cls: 'c-dep' } : i === 3 && j === 3 ? { cls: 'c-path', t: 'end' } : {}));
    const [cx, cy] = ctr(20, 40, s, 1, 1), [rx, ry] = ctr(20, 40, s, 1, 2), [dx, dy] = ctr(20, 40, s, 2, 1);
    const x2 = 20 + C * s + 70;
    const right = grid(x2, 40, R, C, s, (i, j) => (i === 2 && j === 2 ? { cls: 'c-cur', t: 'i,j' } : (i === 1 && j === 2) || (i === 2 && j === 1) ? { cls: 'c-dep' } : i === 0 && j === 0 ? { cls: 'c-path', t: 'start' } : {}));
    const [c2x, c2y] = ctr(x2, 40, s, 2, 2), [ux, uy] = ctr(x2, 40, s, 1, 2), [lx, ly] = ctr(x2, 40, s, 2, 1);
    const o = lbl(x2 + C * s / 2, 18, 'Forward: "ending here"') + right + arrow(ux, uy, c2x, c2y, 'dep', 12, 14) + arrow(lx, ly, c2x, c2y, 'dep', 12, 14)
      + text(x2 + C * s / 2, 40 + R * s + 18, 'reads above and left → loop forward', 't-s')
      + lbl(20 + C * s / 2, 18, 'Reverse: "from here to the end"') + left + arrow(cx, cy, rx, ry, 'dep', 12, 14) + arrow(cx, cy, dx, dy, 'dep', 12, 14)
      + text(20 + C * s / 2, 40 + R * s + 18, 'reads right and below → loop backward', 't-s');
    return svg(x2 + C * s + 20, 40 + R * s + 36, o, 'Forward-looking and backward-looking states');
  };

  // ----- small move icons -----
  D.moves = (type) => {
    const s = 34, x0 = 6, y0 = 6;
    const deps = { rd: [[1, 2], [2, 1]], ul: [[0, 1], [1, 0]], up3: [[0, 0], [0, 1], [0, 2]], tld: [[0, 1], [1, 0], [0, 0]] }[type];
    const cur = [1, 1];
    let o = grid(x0, y0, 3, 3, s, (i, j) => (i === 1 && j === 1 ? { cls: 'c-cur' } : deps.some(([a, b]) => a === i && b === j) ? { cls: 'c-dep' } : {}));
    const [cx, cy] = ctr(x0, y0, s, ...cur);
    for (const [a, b] of deps) { const [px, py] = ctr(x0, y0, s, a, b); o += arrow(px, py, cx, cy, 'dep', 8, 10); }
    return svg(3 * s + 12, 3 * s + 12, o, 'Allowed moves');
  };

  // ----- A family: grid with a route -----
  D.familyGrid = () => {
    const s = 44, R = 4, C = 6, x0 = 16, y0 = 16;
    const route = [[0, 0], [0, 1], [1, 1], [1, 2], [1, 3], [2, 3], [3, 3], [3, 4], [3, 5]];
    const on = (i, j) => route.some(([a, b]) => a === i && b === j);
    let o = grid(x0, y0, R, C, s, (i, j) => (i === 0 && j === 0 ? { cls: 'c-path', t: 'S' } : i === R - 1 && j === C - 1 ? { cls: 'c-path', t: 'F' } : on(i, j) ? { cls: 'c-path-soft' } : {}));
    for (let k = 0; k + 1 < route.length; k++) { const [a, b] = ctr(x0, y0, s, ...route[k]), [c, d] = ctr(x0, y0, s, ...route[k + 1]); o += arrow(a, b, c, d, 'path', 10, 12); }
    o += text(x0 + C * s + 14, y0 + 20, 'Only right or down.', 't-s', 'start');
    o += text(x0 + C * s + 14, y0 + 42, 'No way back to a cell,', 't-s', 'start');
    o += text(x0 + C * s + 14, y0 + 60, 'so each cell is its own', 't-s', 'start');
    o += text(x0 + C * s + 14, y0 + 78, 'sub-problem.', 't-s', 'start');
    return svg(x0 + C * s + 200, y0 + R * s + 16, o, 'A grid with one route from S to F');
  };

  // ----- A4 triangle -----
  D.triangle = () => {
    const t = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]], dp = [[11], [9, 10], [7, 6, 10], [4, 1, 8, 3]];
    const best = [[0, 0], [1, 0], [2, 1], [3, 1]];
    const isBest = (i, j) => best.some(([a, b]) => a === i && b === j);
    const draw = (ox, vals, title, valCls) => {
      let o = lbl(ox, 14, title);
      const pos = (i, j) => [ox + (j - i / 2) * 58, 48 + i * 56];
      for (let i = 0; i < 3; i++) for (let j = 0; j <= i; j++) for (const d of [0, 1]) {
        const [x1, y1] = pos(i, j), [x2, y2] = pos(i + 1, j + d);
        const hot = isBest(i, j) && isBest(i + 1, j + d);
        o += hot ? arrow(x1, y1, x2, y2, 'path', 18, 20) : `<line x1="${x1}" y1="${y1 + 18}" x2="${x2}" y2="${y2 - 18}" class="edge"/>`;
      }
      for (let i = 0; i < 4; i++) for (let j = 0; j <= i; j++) {
        const [x, y] = pos(i, j);
        o += `<circle cx="${x}" cy="${y}" r="18" class="c ${isBest(i, j) ? 'c-path' : 'c-cell'}"/>` + text(x, y, vals[i][j], valCls);
      }
      return o;
    };
    const o = draw(130, t, 'The numbers', 't') + draw(420, dp, 'dp: cheapest way down from here', 't t-b');
    return svg(560, 240, o, 'Triangle and its dp values with the best path highlighted');
  };

  // ----- A6 dungeon: why forward fails -----
  D.dungeon = () => {
    const g = [[1, -3, 3], [0, -2, 0], [-3, -3, -3]], s = 46;
    const A = [[0, 0], [1, 0], [1, 1], [1, 2]], Bp = [[0, 0], [0, 1], [0, 2], [1, 2]];
    const panel = (x0, P, kind, title, l1, l2) => {
      let o = lbl(x0 + 3 * s / 2, 14, title);
      o += grid(x0, 30, 3, 3, s, (i, j) => ({ cls: P.some(([a, b]) => a === i && b === j) ? (kind === 'dep' ? 'c-dep' : 'c-path') : i === 2 ? 'c-warn' : 'c-cell', t: g[i][j] }));
      for (let k = 0; k + 1 < P.length; k++) { const [a, b] = ctr(x0, 30, s, ...P[k]), [c, d] = ctr(x0, 30, s, ...P[k + 1]); o += arrow(a, b, c, d, kind, 12, 14); }
      o += text(x0 + 3 * s / 2, 30 + 3 * s + 16, l1, 't-s') + text(x0 + 3 * s / 2, 30 + 3 * s + 34, l2, 't-s');
      return o;
    };
    const o = panel(20, A, 'dep', 'Path A', 'lowest so far −1, now −1', 'then −3 → drops to −4') + panel(230, Bp, 'path', 'Path B', 'lowest so far −2, now +1', 'then −3 → only drops to −2');
    return svg(410, 30 + 3 * s + 48, o, 'Two paths into the same cell. Forward DP keeps A, but B is better.');
  };

  // ----- B: why min of three squares -----
  D.squares = () => {
    const s = 52, x0 = 20, y0 = 20;
    let o = grid(x0, y0, 3, 3, s, (i, j) => (i === 2 && j === 2 ? { cls: 'c-cur', t: 'i,j' } : {}));
    const box = (r, c, cls, inset) => `<rect x="${x0 + c * s + inset}" y="${y0 + r * s + inset}" width="${2 * s - 2 * inset}" height="${2 * s - 2 * inset}" rx="6" class="sq ${cls}"/>`;
    o += box(0, 0, 'sq-a', 5) + box(0, 1, 'sq-b', 9) + box(1, 0, 'sq-c', 13);
    const lx = x0 + 3 * s + 24;
    o += `<rect x="${lx}" y="${y0 + 6}" width="22" height="12" rx="3" class="sq sq-a"/>` + text(lx + 32, y0 + 12, 'diagonal: square ending at (i−1, j−1)', 't-s', 'start');
    o += `<rect x="${lx}" y="${y0 + 36}" width="22" height="12" rx="3" class="sq sq-b"/>` + text(lx + 32, y0 + 42, 'top: square ending at (i−1, j)', 't-s', 'start');
    o += `<rect x="${lx}" y="${y0 + 66}" width="22" height="12" rx="3" class="sq sq-c"/>` + text(lx + 32, y0 + 72, 'left: square ending at (i, j−1)', 't-s', 'start');
    o += text(lx, y0 + 112, 'A 3 × 3 square at (i, j) needs all three', 't-s', 'start');
    o += text(lx, y0 + 130, 'of these 2 × 2 squares to be full.', 't-s', 'start');
    o += text(lx, y0 + 148, 'The smallest one limits you, so: 1 + min.', 't-s', 'start');
    return svg(lx + 290, y0 + 3 * s + 20, o, 'Three overlapping squares that a bigger square needs');
  };

  D.squareCount = () => {
    const s = 26; let o = '', x = 20;
    [1, 2, 3].forEach((k) => {
      o += grid(x, 20 + (3 - k) * s, k, k, s, (i, j) => ({ cls: i === k - 1 && j === k - 1 ? 'c-cur' : 'c-dep' }));
      o += text(x + k * s / 2, 20 + 3 * s + 16, k + ' × ' + k, 't-s');
      x += k * s + 34;
    });
    o += text(x, 20 + 1.5 * s, 'dp = 3 means these three', 't-s', 'start') + text(x, 20 + 1.5 * s + 18, 'squares all end at this cell.', 't-s', 'start');
    return svg(x + 210, 20 + 3 * s + 30, o, 'A dp value of 3 counts three squares');
  };

  // ----- C: the three arrows -----
  D.strings = () => {
    const s = 54, x0 = 70, y0 = 44, R = 4, C = 4;
    let o = grid(x0, y0, R, C, s, (i, j) => (i === 0 || j === 0 ? { cls: 'c-pad', t: '' } : i === 2 && j === 2 ? { cls: 'c-cur', t: 'i,j' } : (i === 1 && j === 1) || (i === 1 && j === 2) || (i === 2 && j === 1) ? { cls: 'c-dep' } : {}));
    '∅abc'.split('').forEach((ch, i) => { o += text(x0 - 14, y0 + i * s + s / 2, ch, 't t-b'); });
    '∅xyz'.split('').forEach((ch, j) => { o += text(x0 + j * s + s / 2, y0 - 14, ch, 't t-b'); });
    o += text(x0 - 46, y0 + 2 * s, 'a', 't-lab') + text(x0 + 2 * s, y0 - 34, 'b', 't-lab');
    const [cx, cy] = ctr(x0, y0, s, 2, 2);
    o += arrow(...ctr(x0, y0, s, 1, 1), cx, cy, 'path', 14, 16) + arrow(...ctr(x0, y0, s, 1, 2), cx, cy, 'dep', 14, 16) + arrow(...ctr(x0, y0, s, 2, 1), cx, cy, 'cur', 14, 16);
    const lx = x0 + C * s + 26;
    o += `<line x1="${lx}" y1="${y0 + 14}" x2="${lx + 28}" y2="${y0 + 14}" class="ar ar-path" marker-end="url(#ah-path)"/>` + text(lx + 38, y0 + 14, 'diagonal (i−1, j−1): use both letters', 't-s', 'start');
    o += `<line x1="${lx}" y1="${y0 + 44}" x2="${lx + 28}" y2="${y0 + 44}" class="ar ar-dep" marker-end="url(#ah-dep)"/>` + text(lx + 38, y0 + 44, 'above (i−1, j): drop a letter of a', 't-s', 'start');
    o += `<line x1="${lx}" y1="${y0 + 74}" x2="${lx + 28}" y2="${y0 + 74}" class="ar ar-cur" marker-end="url(#ah-cur)"/>` + text(lx + 38, y0 + 74, 'left (i, j−1): drop a letter of b', 't-s', 'start');
    o += `<rect x="${lx}" y="${y0 + 100}" width="28" height="16" rx="3" class="c c-pad"/>` + text(lx + 38, y0 + 108, 'grey edge: empty prefix (base case)', 't-s', 'start');
    return svg(lx + 290, y0 + R * s + 14, o, 'The three moves in a two-string table');
  };

  // ----- C3 traceback: computed from the forward table -----
  D.editOps = () => {
    const a = 'horse', b = 'ros', n = a.length, m = b.length;
    const v = Array.from({ length: n + 1 }, (_, i) => Array.from({ length: m + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
    for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) v[i][j] = a[i - 1] === b[j - 1] ? v[i - 1][j - 1] : 1 + Math.min(v[i][j - 1], v[i - 1][j], v[i - 1][j - 1]);
    const P = [[n, m]], labels = [];
    for (let i = n, j = m; i > 0 || j > 0;) {
      if (i > 0 && j > 0 && a[i - 1] === b[j - 1] && v[i][j] === v[i - 1][j - 1]) { labels.unshift(`${a[i - 1]} = ${b[j - 1]}, free`); i--; j--; }
      else if (i > 0 && j > 0 && v[i][j] === v[i - 1][j - 1] + 1) { labels.unshift(`replace ${a[i - 1]} → ${b[j - 1]}`); i--; j--; }
      else if (i > 0 && v[i][j] === v[i - 1][j] + 1) { labels.unshift(`delete ${a[i - 1]}`); i--; }
      else { labels.unshift(`insert ${b[j - 1]}`); j--; }
      P.unshift([i, j]);
    }
    const s = 44, x0 = 40, y0 = 40;
    let o = grid(x0, y0, n + 1, m + 1, s, (i, j) => ({ cls: P.some(([p, q]) => p === i && q === j) ? 'c-path' : i === 0 || j === 0 ? 'c-pad' : 'c-cell', t: v[i][j] }));
    ['∅', ...a].forEach((ch, i) => { o += text(x0 - 14, y0 + i * s + s / 2, ch, 't t-b'); });
    ['∅', ...b].forEach((ch, j) => { o += text(x0 + j * s + s / 2, y0 - 14, ch, 't t-b'); });
    for (let k = 0; k + 1 < P.length; k++) {
      const [p, q] = ctr(x0, y0, s, ...P[k]), [r, t] = ctr(x0, y0, s, ...P[k + 1]);
      o += arrow(p, q, r, t, 'path', 12, 14);
      o += text(x0 + (m + 1) * s + 20, y0 + P[k + 1][0] * s + s / 2, (k + 1) + '. ' + labels[k], 't-s', 'start');
    }
    return svg(x0 + (m + 1) * s + 190, y0 + (n + 1) * s + 14, o, 'Reading the operations back from the edit distance table');
  };

  // ----- D: interval fill order -----
  D.interval = () => {
    const n = 5, s = 46, x0 = 40, y0 = 36;
    let o = grid(x0, y0, n, n, s, (i, j) => (j < i ? null : i === 0 && j === 4 ? { cls: 'c-cur', t: '5' } : (i === 1 && j === 4) || (i === 0 && j === 3) || (i === 1 && j === 3) ? { cls: 'c-dep', t: String(j - i + 1) } : { cls: 'c-len' + (j - i + 1), t: String(j - i + 1) }));
    for (let k = 0; k < n; k++) { o += text(x0 - 14, y0 + k * s + s / 2, 'i=' + k, 't-s'); o += text(x0 + k * s + s / 2, y0 - 12, 'j=' + k, 't-s'); }
    const [cx, cy] = ctr(x0, y0, s, 0, 4);
    o += arrow(cx, cy, ...ctr(x0, y0, s, 1, 4), 'dep', 12, 14) + arrow(cx, cy, ...ctr(x0, y0, s, 0, 3), 'dep', 12, 14) + arrow(cx, cy, ...ctr(x0, y0, s, 1, 3), 'dep', 12, 14);
    const lx = x0 + n * s + 24;
    o += text(lx, y0 + 16, 'Each number is the length of the range.', 't-s', 'start');
    o += text(lx, y0 + 38, 'Fill the diagonal of 1s first, then 2s, and so on.', 't-s', 'start');
    o += text(lx, y0 + 60, 'The full range [0..4] needs shorter ranges:', 't-s', 'start');
    o += text(lx, y0 + 80, 'drop the left end, drop the right end, or both.', 't-s', 'start');
    o += text(lx, y0 + 112, 'Bottom-to-top rows with left-to-right columns', 't-s', 'start');
    o += text(lx, y0 + 132, 'gives the same safe order.', 't-s', 'start');
    return svg(lx + 330, y0 + n * s + 12, o, 'Interval DP fills ranges from short to long');
  };

  // ----- D3 balloons -----
  D.balloons = () => {
    const items = [['l', 'wall'], ['a', ''], ['b', ''], ['k', 'last'], ['c', ''], ['d', ''], ['r', 'wall']];
    const gap = 70, y = 70; let o = '';
    items.forEach(([t, kind], i) => {
      const x = 50 + i * gap;
      o += `<circle cx="${x}" cy="${y}" r="24" class="c ${kind === 'wall' ? 'c-pad' : kind === 'last' ? 'c-cur' : 'c-dep'}"/>` + text(x, y, t, 't t-b');
    });
    const br = (i1, i2, label) => { const x1 = 50 + i1 * gap - 22, x2 = 50 + i2 * gap + 22; return `<path d="M${x1} ${y + 36} v10 H${x2} v-10" class="edge"/>` + text((x1 + x2) / 2, y + 66, label, 't-s'); };
    o += br(1, 2, 'left part: dp(l, k)') + br(4, 5, 'right part: dp(k, r)');
    o += text(50 + 3 * gap, 22, 'k bursts last, so its neighbours are l and r', 't-s');
    o += text(50 + 3 * gap, y + 100, 'coins = a[l] · a[k] · a[r] + dp(l, k) + dp(k, r)', 't t-b');
    o += text(50 + 3 * gap, y + 124, 'While k is still there, the two parts never touch each other.', 't-s');
    return svg(50 + 6 * gap + 50, y + 142, o, 'Burst balloon k last');
  };

  // ----- E: 0/1 vs unbounded -----
  D.knap = () => {
    const s = 50, panel = (x0, unb, title) => {
      let o = lbl(x0 + 2 * s, 16, title);
      o += grid(x0, 34, 2, 4, s, (i, j) => (i === 1 && j === 3 ? { cls: 'c-cur', t: 'i, c' } : (i === 0 && j === 3) || (unb ? i === 1 && j === 0 : i === 0 && j === 0) ? { cls: 'c-dep' } : {}));
      o += text(x0 - 22, 34 + s / 2, 'i−1', 't-s') + text(x0 - 22, 34 + 1.5 * s, 'i', 't-s');
      o += text(x0 + s / 2, 34 + 2 * s + 14, 'c − w', 't-s') + text(x0 + 3.5 * s, 34 + 2 * s + 14, 'c', 't-s');
      const [cx, cy] = ctr(x0, 34, s, 1, 3);
      o += arrow(...ctr(x0, 34, s, 0, 3), cx, cy, 'dep', 14, 16);
      o += arrow(...(unb ? ctr(x0, 34, s, 1, 0) : ctr(x0, 34, s, 0, 0)), cx, cy, 'path', 14, 16);
      o += text(x0 + 2 * s, 34 + 2 * s + 38, unb ? 'take: same row i (reuse it)' : 'take: row above (used once)', 't-s');
      o += text(x0 + 2 * s, 34 + 2 * s + 56, unb ? '1D loop goes upward' : '1D loop goes downward', 't-s t-strong');
      return o;
    };
    return svg(560, 34 + 2 * s + 70, panel(40, false, 'Each item once (0/1)') + panel(320, true, 'Reuse allowed (unbounded)'), 'Take and skip arrows for 0/1 and unbounded knapsack');
  };

  // ----- E1: why the loop direction matters -----
  D.directionBug = () => {
    const s = 44, row = (x0, y0, vals, title, cls, arrows, kind, note) => {
      let o = lbl(x0 + 2.5 * s, y0 - 18, title);
      o += grid(x0, y0, 1, 5, s, (i, j) => ({ cls: vals[j] === 'T' ? cls : 'c-cell', t: vals[j] }));
      for (let j = 0; j < 5; j++) o += text(x0 + j * s + s / 2, y0 + s + 12, 'sum ' + j, 't-s');
      for (const [a, b] of arrows) { const [x1, y1] = ctr(x0, y0, s, 0, a), [x2] = ctr(x0, y0, s, 0, b); o += path(`M${x1} ${y1 - 18} Q ${(x1 + x2) / 2} ${y1 - 46} ${x2} ${y1 - 20}`, kind); }
      o += text(x0 + 2.5 * s, y0 + s + 34, note, 't-s');
      return o;
    };
    const o = row(30, 70, ['T', 'T', 'T', 'T', 'T'], 'Upward loop, item 1', 'c-warn', [[0, 1], [1, 2], [2, 3], [3, 4]], 'warn', 'reads values this same item just wrote → uses 1 again and again')
      + row(330, 70, ['T', 'T', 'F', 'F', 'F'], 'Downward loop, item 1', 'c-path', [[0, 1]], 'path', 'reads values from before this item → uses 1 once');
    return svg(600, 170, o, 'Upward loop reuses an item, downward loop does not');
  };

  // ----- F: state machines -----
  const stateNode = (x, y, t, cls) => `<circle cx="${x}" cy="${y}" r="38" class="c ${cls}"/>` + text(x, y, t, 't t-b');
  const loop = (x, y, label, up = true) => { const dy = up ? -1 : 1; return path(`M${x - 16} ${y + dy * 34} C ${x - 40} ${y + dy * 90}, ${x + 40} ${y + dy * 90}, ${x + 16} ${y + dy * 36}`, 'ink') + text(x, y + dy * 88, label, 't-s'); };
  D.machine = () => {
    let o = stateNode(110, 110, 'FREE', 'c-cell') + stateNode(370, 110, 'HOLDING', 'c-dep');
    o += path('M146 96 Q 240 50 334 96', 'path') + text(240, 58, 'buy: − price', 't-s');
    o += path('M334 124 Q 240 170 146 124', 'cur') + text(240, 168, 'sell: + price (− fee)', 't-s');
    o += loop(110, 110, 'wait', false) + loop(370, 110, 'keep', false);
    return svg(480, 220, o, 'Two states: free and holding');
  };
  D.machineCooldown = () => {
    let o = stateNode(90, 120, 'FREE', 'c-cell') + stateNode(330, 120, 'HOLDING', 'c-dep') + stateNode(210, 260, 'COOL', 'c-pad');
    o += path('M128 112 Q 210 80 292 112', 'path') + text(210, 82, 'buy', 't-s');
    o += path('M312 154 Q 290 220 246 244', 'cur') + text(318, 216, 'sell', 't-s', 'start');
    o += path('M174 244 Q 128 220 106 156', 'ink') + text(104, 216, 'wait 1 day', 't-s', 'end');
    o += loop(90, 120, 'wait', true) + loop(330, 120, 'keep', true);
    return svg(430, 310, o, 'Three states with a cooldown after selling');
  };

  return D;
})();
