// Step-by-step builders for every DP table on the page.
// Each builder returns { rows, cols, cells, steps, answer, result, resultNote }.
//   cells[i][j] = { v, kind: 'pad' | 'base' | 'block' | 'void' | '', tag }
//   steps[k]    = { i, j, v, deps: [[i, j], ...], note }
const VIZ = (() => {
  const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, Number.isFinite(x) ? x : lo));
  const nums = (n) => Array.from({ length: n }, (_, i) => String(i));
  const blank = (R, C) => Array.from({ length: R }, () => Array.from({ length: C }, () => ({ kind: '' })));
  const table = (R, C, v) => Array.from({ length: R }, () => Array(C).fill(v));
  const json = (s, fallback) => { try { return JSON.parse(s); } catch (e) { return fallback; } };
  const f = (v) => (v === Infinity ? '∞' : v === -Infinity ? '−∞' : v === true ? 'T' : v === false ? 'F' : String(v));
  const B = {};

  // ---------- Part A: grids ----------
  B.uniquePaths = {
    inputs: [{ k: 'm', label: 'rows (m)', v: '3' }, { k: 'n', label: 'cols (n)', v: '3' }],
    build(p) {
      const m = clamp(+p.m, 1, 7), n = clamp(+p.n, 1, 7);
      const cells = blank(m + 1, n + 1), dp = table(m + 1, n + 1, 0), steps = [];
      for (let i = 0; i <= m; i++) cells[i][n] = { v: 0, kind: 'pad' };
      for (let j = 0; j <= n; j++) cells[m][j] = { v: 0, kind: 'pad' };
      for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) {
        if (i === m - 1 && j === n - 1) { dp[i][j] = 1; steps.push({ i, j, v: 1, deps: [], note: 'This is the target. From here there is exactly 1 way: stay put.' }); continue; }
        dp[i][j] = dp[i + 1][j] + dp[i][j + 1];
        steps.push({ i, j, v: dp[i][j], deps: [[i + 1, j], [i, j + 1]], note: `dp[${i}][${j}] = below (${dp[i + 1][j]}) + right (${dp[i][j + 1]}) = ${dp[i][j]}` });
      }
      return { rows: [...nums(m), 'pad'], cols: [...nums(n), 'pad'], cells, steps, answer: [0, 0], result: dp[0][0], resultNote: `${dp[0][0]} different paths from the top-left corner.` };
    }
  };

  B.uniquePathsWithObstacles = {
    inputs: [{ k: 'g', label: 'grid (1 = rock)', v: '[[0,0,0],[0,1,0],[0,0,0]]' }],
    build(p) {
      const g = json(p.g, [[0]]).slice(0, 7).map(r => r.slice(0, 7)); const m = g.length, n = g[0].length;
      const cells = blank(m + 1, n + 1), dp = table(m + 1, n + 1, 0), steps = [];
      for (let i = 0; i <= m; i++) cells[i][n] = { v: 0, kind: 'pad' };
      for (let j = 0; j <= n; j++) cells[m][j] = { v: 0, kind: 'pad' };
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (g[i][j] === 1) cells[i][j].kind = 'block';
      for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) {
        if (g[i][j] === 1) { dp[i][j] = 0; steps.push({ i, j, v: 0, deps: [], note: `(${i},${j}) is a rock. Nothing can pass through it, so 0 ways.` }); continue; }
        if (i === m - 1 && j === n - 1) { dp[i][j] = 1; steps.push({ i, j, v: 1, deps: [], note: 'Target cell: 1 way.' }); continue; }
        dp[i][j] = dp[i + 1][j] + dp[i][j + 1];
        steps.push({ i, j, v: dp[i][j], deps: [[i + 1, j], [i, j + 1]], note: `dp[${i}][${j}] = below (${dp[i + 1][j]}) + right (${dp[i][j + 1]}) = ${dp[i][j]}` });
      }
      return { rows: [...nums(m), 'pad'], cols: [...nums(n), 'pad'], cells, steps, answer: [0, 0], result: dp[0][0], resultNote: `${dp[0][0]} paths avoid every rock.` };
    }
  };

  B.minPathSum = {
    inputs: [{ k: 'g', label: 'grid', v: '[[1,3,1],[1,5,1],[4,2,1]]' }],
    build(p) {
      const g = json(p.g, [[1]]).slice(0, 7).map(r => r.slice(0, 7)); const m = g.length, n = g[0].length;
      const cells = blank(m + 1, n + 1), dp = table(m + 1, n + 1, Infinity), steps = [];
      for (let i = 0; i <= m; i++) cells[i][n] = { v: Infinity, kind: 'pad' };
      for (let j = 0; j <= n; j++) cells[m][j] = { v: Infinity, kind: 'pad' };
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) cells[i][j].tag = g[i][j];
      for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) {
        if (i === m - 1 && j === n - 1) { dp[i][j] = g[i][j]; steps.push({ i, j, v: dp[i][j], deps: [], note: `Target: you still pay for this cell, so dp = ${g[i][j]}.` }); continue; }
        dp[i][j] = g[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1]);
        steps.push({ i, j, v: dp[i][j], deps: [[i + 1, j], [i, j + 1]], note: `dp[${i}][${j}] = cell ${g[i][j]} + min(below ${f(dp[i + 1][j])}, right ${f(dp[i][j + 1])}) = ${dp[i][j]}` });
      }
      return { rows: [...nums(m), 'pad'], cols: [...nums(n), 'pad'], cells, steps, answer: [0, 0], result: dp[0][0], resultNote: `Cheapest path costs ${dp[0][0]}. Small grey numbers are the grid values.` };
    }
  };

  B.minimumTotal = {
    inputs: [{ k: 't', label: 'triangle', v: '[[2],[3,4],[6,5,7],[4,1,8,3]]' }],
    build(p) {
      const t = json(p.t, [[1]]).slice(0, 7); const n = t.length;
      const cells = blank(n, n), dp = table(n, n, 0), steps = [];
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { if (j > i) cells[i][j].kind = 'void'; else cells[i][j].tag = t[i][j]; }
      for (let i = n - 1; i >= 0; i--) for (let j = 0; j <= i; j++) {
        if (i === n - 1) { dp[i][j] = t[i][j]; steps.push({ i, j, v: dp[i][j], deps: [], note: `Bottom row: nothing below, so dp = ${t[i][j]}.` }); continue; }
        dp[i][j] = t[i][j] + Math.min(dp[i + 1][j], dp[i + 1][j + 1]);
        steps.push({ i, j, v: dp[i][j], deps: [[i + 1, j], [i + 1, j + 1]], note: `dp[${i}][${j}] = ${t[i][j]} + min(down ${dp[i + 1][j]}, down-right ${dp[i + 1][j + 1]}) = ${dp[i][j]}` });
      }
      return { rows: nums(n), cols: nums(n), cells, steps, answer: [0, 0], result: dp[0][0], resultNote: `Minimum top-to-bottom sum is ${dp[0][0]}.` };
    }
  };

  B.minFallingPathSum = {
    inputs: [{ k: 'g', label: 'matrix', v: '[[2,1,3],[6,5,4],[7,8,9]]' }],
    build(p) {
      const a = json(p.g, [[1]]).slice(0, 7).map(r => r.slice(0, 7)); const n = a.length;
      const cells = blank(n, n), dp = table(n, n, 0), steps = [];
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) cells[i][j].tag = a[i][j];
      for (let i = n - 1; i >= 0; i--) for (let j = 0; j < n; j++) {
        if (i === n - 1) { dp[i][j] = a[i][j]; steps.push({ i, j, v: dp[i][j], deps: [], note: `Last row: dp = ${a[i][j]}.` }); continue; }
        const deps = [[i + 1, j - 1], [i + 1, j], [i + 1, j + 1]].filter(([, c]) => c >= 0 && c < n);
        const best = Math.min(...deps.map(([r, c]) => dp[r][c]));
        dp[i][j] = a[i][j] + best;
        steps.push({ i, j, v: dp[i][j], deps, note: `dp[${i}][${j}] = ${a[i][j]} + min(${deps.map(([r, c]) => dp[r][c]).join(', ')}) = ${dp[i][j]}` });
      }
      let bj = 0; for (let j = 1; j < n; j++) if (dp[0][j] < dp[0][bj]) bj = j;
      return { rows: nums(n), cols: nums(n), cells, steps, answer: [0, bj], result: dp[0][bj], resultNote: `You may start in any column, so take the smallest value in row 0: ${dp[0][bj]}.` };
    }
  };

  B.calculateMinimumHP = {
    inputs: [{ k: 'g', label: 'dungeon', v: '[[-2,-3,3],[-5,-10,1],[10,30,-5]]' }],
    build(p) {
      const d = json(p.g, [[0]]).slice(0, 7).map(r => r.slice(0, 7)); const m = d.length, n = d[0].length;
      const cells = blank(m + 1, n + 1), dp = table(m + 1, n + 1, Infinity), steps = [];
      for (let i = 0; i <= m; i++) cells[i][n] = { v: Infinity, kind: 'pad' };
      for (let j = 0; j <= n; j++) cells[m][j] = { v: Infinity, kind: 'pad' };
      dp[m][n - 1] = 1; dp[m - 1][n] = 1; cells[m][n - 1] = { v: 1, kind: 'base' }; cells[m - 1][n] = { v: 1, kind: 'base' };
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) cells[i][j].tag = d[i][j];
      for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) {
        const nxt = Math.min(dp[i + 1][j], dp[i][j + 1]); const need = nxt - d[i][j];
        dp[i][j] = Math.max(1, need);
        steps.push({ i, j, v: dp[i][j], deps: [[i + 1, j], [i, j + 1]], note: `Need ${nxt} after this room. Room gives ${d[i][j]}. So ${nxt} − (${d[i][j]}) = ${need}` + (need < 1 ? `, but you must be alive, so 1.` : '.') });
      }
      return { rows: [...nums(m), 'pad'], cols: [...nums(n), 'pad'], cells, steps, answer: [0, 0], result: dp[0][0], resultNote: `The knight must start with ${dp[0][0]} health.` };
    }
  };

  // ---------- Part B: squares ----------
  function squares(p, asString) {
    const raw = json(p.g, [[1]]).slice(0, 7).map(r => r.slice(0, 8));
    const m = raw.length, n = raw[0].length;
    const isOne = (x) => (asString ? x === '1' : x === 1);
    const cells = blank(m + 1, n + 1), dp = table(m + 1, n + 1, 0), steps = [];
    for (let i = 0; i <= m; i++) cells[i][0] = { v: 0, kind: 'pad' };
    for (let j = 0; j <= n; j++) cells[0][j] = { v: 0, kind: 'pad' };
    let best = 0, bi = 0, bj = 0, sum = 0;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
      cells[i][j].tag = raw[i - 1][j - 1];
      if (!isOne(raw[i - 1][j - 1])) { steps.push({ i, j, v: 0, deps: [], note: `matrix[${i - 1}][${j - 1}] is 0, so no square can end here.` }); continue; }
      const t = dp[i - 1][j], l = dp[i][j - 1], g = dp[i - 1][j - 1];
      dp[i][j] = 1 + Math.min(t, l, g); sum += dp[i][j];
      if (dp[i][j] > best) { best = dp[i][j]; bi = i; bj = j; }
      steps.push({ i, j, v: dp[i][j], deps: [[i - 1, j], [i, j - 1], [i - 1, j - 1]], note: `1 + min(top ${t}, left ${l}, diagonal ${g}) = ${dp[i][j]}` + (asString ? `   (best so far: ${best})` : `   (running total: ${sum})`) });
    }
    return { m, n, cells, steps, best, bi, bj, sum };
  }
  B.maximalSquare = {
    inputs: [{ k: 'g', label: 'matrix (strings)', v: '[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]' }],
    build(p) {
      const r = squares(p, true);
      return { rows: ['pad', ...nums(r.m)], cols: ['pad', ...nums(r.n)], cells: r.cells, steps: r.steps, answer: [r.bi, r.bj], result: r.best * r.best, resultNote: `Largest side is ${r.best}, so the area is ${r.best * r.best}.`, square: r.best ? [r.bi, r.bj, r.best] : null };
    }
  };
  B.countSquares = {
    inputs: [{ k: 'g', label: 'matrix', v: '[[0,1,1,1],[1,1,1,1],[0,1,1,1]]' }],
    build(p) {
      const r = squares(p, false);
      return { rows: ['pad', ...nums(r.m)], cols: ['pad', ...nums(r.n)], cells: r.cells, steps: r.steps, answer: null, result: r.sum, resultNote: `Add up every cell: ${r.sum} squares in total.` };
    }
  };

  // ---------- Part C: two strings ----------
  function strTable(a, b, baseFn) {
    const n = a.length, m = b.length, cells = blank(n + 1, m + 1), dp = table(n + 1, m + 1, 0);
    for (let i = 0; i <= n; i++) for (let j = 0; j <= m; j++) if (i === n || j === m) { const v = baseFn(i, j); dp[i][j] = v; cells[i][j] = { v, kind: 'base' }; }
    return { n, m, cells, dp, rows: [...a, '∅'], cols: [...b, '∅'] };
  }
  const word = (s, d) => String(s ?? d).slice(0, 9);

  B.longestCommonSubsequence = {
    inputs: [{ k: 'a', label: 'text1', v: 'abcde' }, { k: 'b', label: 'text2', v: 'ace' }],
    build(p) {
      const a = word(p.a), b = word(p.b), T = strTable(a, b, () => 0), { dp } = T, steps = [];
      for (let i = T.n - 1; i >= 0; i--) for (let j = T.m - 1; j >= 0; j--) {
        if (a[i] === b[j]) { dp[i][j] = 1 + dp[i + 1][j + 1]; steps.push({ i, j, v: dp[i][j], deps: [[i + 1, j + 1]], note: `'${a[i]}' = '${b[j]}': match! 1 + diagonal ${dp[i + 1][j + 1]} = ${dp[i][j]}` }); }
        else { dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]); steps.push({ i, j, v: dp[i][j], deps: [[i + 1, j], [i, j + 1]], note: `'${a[i]}' ≠ '${b[j]}': max(skip '${a[i]}' → ${dp[i + 1][j]}, skip '${b[j]}' → ${dp[i][j + 1]}) = ${dp[i][j]}` }); }
      }
      return { rows: T.rows, cols: T.cols, cells: T.cells, steps, answer: [0, 0], result: dp[0][0], resultNote: `The LCS has length ${dp[0][0]}. Grey row and column: one string is empty, so 0.` };
    }
  };

  B.deleteOp = {
    inputs: [{ k: 'a', label: 'word1', v: 'sea' }, { k: 'b', label: 'word2', v: 'eat' }],
    build(p) {
      const a = word(p.a), b = word(p.b), n = a.length, m = b.length;
      const T = strTable(a, b, (i, j) => (i === n ? m - j : n - i)), { dp } = T, steps = [];
      for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) {
        if (a[i] === b[j]) { dp[i][j] = dp[i + 1][j + 1]; steps.push({ i, j, v: dp[i][j], deps: [[i + 1, j + 1]], note: `'${a[i]}' = '${b[j]}': keep both, cost stays ${dp[i][j]}` }); }
        else { dp[i][j] = 1 + Math.min(dp[i + 1][j], dp[i][j + 1]); steps.push({ i, j, v: dp[i][j], deps: [[i + 1, j], [i, j + 1]], note: `'${a[i]}' ≠ '${b[j]}': 1 + min(delete '${a[i]}' → ${dp[i + 1][j]}, delete '${b[j]}' → ${dp[i][j + 1]}) = ${dp[i][j]}` }); }
      }
      return { rows: T.rows, cols: T.cols, cells: T.cells, steps, answer: [0, 0], result: dp[0][0], resultNote: `${dp[0][0]} deletions. Grey edge: when one word is used up, delete what is left of the other.` };
    }
  };

  B.editDistance = {
    inputs: [{ k: 'a', label: 'word1', v: 'horse' }, { k: 'b', label: 'word2', v: 'ros' }],
    build(p) {
      const a = word(p.a), b = word(p.b), n = a.length, m = b.length;
      const T = strTable(a, b, (i, j) => (i === n ? m - j : n - i)), { dp } = T, steps = [];
      for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) {
        if (a[i] === b[j]) { dp[i][j] = dp[i + 1][j + 1]; steps.push({ i, j, v: dp[i][j], deps: [[i + 1, j + 1]], note: `'${a[i]}' = '${b[j]}': free, copy the diagonal ${dp[i][j]}` }); continue; }
        const ins = dp[i][j + 1], del = dp[i + 1][j], rep = dp[i + 1][j + 1];
        dp[i][j] = 1 + Math.min(ins, del, rep);
        steps.push({ i, j, v: dp[i][j], deps: [[i, j + 1], [i + 1, j], [i + 1, j + 1]], note: `'${a[i]}' ≠ '${b[j]}': 1 + min(insert ${ins}, delete ${del}, replace ${rep}) = ${dp[i][j]}` });
      }
      return { rows: T.rows, cols: T.cols, cells: T.cells, steps, answer: [0, 0], result: dp[0][0], resultNote: `${dp[0][0]} operations turn "${a}" into "${b}".` };
    }
  };

  B.numDistinct = {
    inputs: [{ k: 'a', label: 's', v: 'rabbbit' }, { k: 'b', label: 't', v: 'rabbit' }],
    build(p) {
      const a = word(p.a), b = word(p.b), n = a.length, m = b.length;
      const T = strTable(a, b, (i, j) => (j === m ? 1 : 0)), { dp } = T, steps = [];
      for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) {
        if (a[i] === b[j]) { dp[i][j] = dp[i + 1][j] + dp[i + 1][j + 1]; steps.push({ i, j, v: dp[i][j], deps: [[i + 1, j], [i + 1, j + 1]], note: `'${a[i]}' = '${b[j]}': skip it (${dp[i + 1][j]}) + use it (${dp[i + 1][j + 1]}) = ${dp[i][j]}` }); }
        else { dp[i][j] = dp[i + 1][j]; steps.push({ i, j, v: dp[i][j], deps: [[i + 1, j]], note: `'${a[i]}' ≠ '${b[j]}': can only skip it, ${dp[i][j]}` }); }
      }
      return { rows: T.rows, cols: T.cols, cells: T.cells, steps, answer: [0, 0], result: dp[0][0], resultNote: `${dp[0][0]} ways. Last column is 1: an empty t can always be made one way.` };
    }
  };

  B.isMatch = {
    inputs: [{ k: 'a', label: 's', v: 'adceb' }, { k: 'b', label: 'p', v: '*a*b' }],
    build(p) {
      const s = word(p.a, ''), pt = word(p.b, ''), n = s.length, m = pt.length;
      const cells = blank(n + 1, m + 1), dp = table(n + 1, m + 1, false), steps = [];
      dp[n][m] = true; cells[n][m] = { v: true, kind: 'base' };
      for (let i = 0; i < n; i++) cells[i][m] = { v: false, kind: 'base' };
      for (let j = m - 1; j >= 0; j--) { dp[n][j] = pt[j] === '*' && dp[n][j + 1]; cells[n][j] = { v: dp[n][j], kind: 'base' }; }
      for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) {
        if (pt[j] === '*') { dp[i][j] = dp[i][j + 1] || dp[i + 1][j]; steps.push({ i, j, v: dp[i][j], deps: [[i, j + 1], [i + 1, j]], note: `'*': match nothing (${f(dp[i][j + 1])}) or eat '${s[i]}' (${f(dp[i + 1][j])}) → ${f(dp[i][j])}` }); }
        else if (pt[j] === '?' || pt[j] === s[i]) { dp[i][j] = dp[i + 1][j + 1]; steps.push({ i, j, v: dp[i][j], deps: [[i + 1, j + 1]], note: `'${pt[j]}' matches '${s[i]}': copy diagonal → ${f(dp[i][j])}` }); }
        else { dp[i][j] = false; steps.push({ i, j, v: false, deps: [], note: `'${pt[j]}' cannot match '${s[i]}' → F` }); }
      }
      return { rows: [...s, '∅'], cols: [...pt, '∅'], cells, steps, answer: [0, 0], result: dp[0][0], resultNote: dp[0][0] ? 'The pattern matches the whole string.' : 'No match.' };
    }
  };

  // ---------- Part D: intervals ----------
  B.longestPalindromeSubseq = {
    inputs: [{ k: 's', label: 's', v: 'bbbab' }],
    build(p) {
      const s = word(p.s, 'a'), n = s.length, cells = blank(n, n), dp = table(n, n, 0), steps = [];
      for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) cells[i][j].kind = 'void';
      for (let i = n - 1; i >= 0; i--) {
        dp[i][i] = 1; steps.push({ i, j: i, v: 1, deps: [], note: `A single letter '${s[i]}' is a palindrome of length 1.` });
        for (let j = i + 1; j < n; j++) {
          if (s[i] === s[j]) { dp[i][j] = 2 + (i + 1 <= j - 1 ? dp[i + 1][j - 1] : 0); steps.push({ i, j, v: dp[i][j], deps: i + 1 <= j - 1 ? [[i + 1, j - 1]] : [], note: `Ends '${s[i]}' and '${s[j]}' match: 2 + inside ${dp[i][j] - 2} = ${dp[i][j]}` }); }
          else { dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]); steps.push({ i, j, v: dp[i][j], deps: [[i + 1, j], [i, j - 1]], note: `Ends differ: max(drop left ${dp[i + 1][j]}, drop right ${dp[i][j - 1]}) = ${dp[i][j]}` }); }
        }
      }
      return { rows: [...s].map((c, i) => i + ' ' + c), cols: [...s].map((c, i) => i + ' ' + c), cells, steps, answer: [0, n - 1], result: dp[0][n - 1], resultNote: `Longest palindromic subsequence: ${dp[0][n - 1]}.` };
    }
  };

  B.countSubstrings = {
    inputs: [{ k: 's', label: 's', v: 'abba' }],
    build(p) {
      const s = word(p.s, 'a'), n = s.length, cells = blank(n, n), dp = table(n, n, false), steps = []; let c = 0;
      for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) cells[i][j].kind = 'void';
      for (let i = n - 1; i >= 0; i--) for (let j = i; j < n; j++) {
        const inner = j - i < 2 ? true : dp[i + 1][j - 1];
        dp[i][j] = s[i] === s[j] && inner; if (dp[i][j]) c++;
        const sub = s.slice(i, j + 1);
        steps.push({ i, j, v: dp[i][j], deps: j - i >= 2 ? [[i + 1, j - 1]] : [], note: `"${sub}": ` + (s[i] !== s[j] ? `ends differ → F` : j - i < 2 ? `short and ends match → T` : `ends match, inside is ${f(inner)} → ${f(dp[i][j])}`) + `   (count: ${c})` });
      }
      return { rows: [...s].map((ch, i) => i + ' ' + ch), cols: [...s].map((ch, i) => i + ' ' + ch), cells, steps, answer: null, result: c, resultNote: `${c} palindromic substrings (count the T cells).` };
    }
  };

  B.maxCoins = {
    inputs: [{ k: 'a', label: 'nums', v: '[3,1,5,8]' }],
    build(p) {
      const nums0 = json(p.a, [1]).slice(0, 6), a = [1, ...nums0, 1], n = a.length;
      const cells = blank(n, n), dp = table(n, n, 0), steps = [];
      for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) cells[i][j].kind = 'void';
      for (let i = 0; i + 1 < n; i++) cells[i][i + 1] = { v: 0, kind: 'base' };
      for (let len = 2; len < n; len++) for (let l = 0; l + len < n; l++) {
        const r = l + len; let best = -1, bk = -1;
        for (let k = l + 1; k < r; k++) { const v = a[l] * a[k] * a[r] + dp[l][k] + dp[k][r]; if (v > best) { best = v; bk = k; } }
        dp[l][r] = best;
        steps.push({ i: l, j: r, v: best, deps: [[l, bk], [bk, r]], note: `Between walls ${a[l]} and ${a[r]}: best last balloon is ${a[bk]} → ${a[l]}·${a[bk]}·${a[r]} + ${dp[l][bk]} + ${dp[bk][r]} = ${best}` });
      }
      return { rows: a.map((v, i) => i + ':' + v), cols: a.map((v, i) => i + ':' + v), cells, steps, answer: [0, n - 1], result: dp[0][n - 1], resultNote: `Maximum coins: ${dp[0][n - 1]}. Row and column labels are index:value of the padded array.` };
    }
  };

  // ---------- Part E: knapsack ----------
  B.canPartition = {
    inputs: [{ k: 'a', label: 'nums', v: '[1,5,11,5]' }],
    build(p) {
      const xs = json(p.a, [1, 1]).slice(0, 6), total = xs.reduce((s, x) => s + x, 0);
      if (total % 2 || total / 2 > 30) return { rows: [], cols: [], cells: [], steps: [], answer: null, result: false, resultNote: total % 2 ? `Total is ${total}, which is odd. Answer: false, no table needed.` : 'Keep the total at 60 or less so the table fits.' };
      const T = total / 2, n = xs.length, cells = blank(n + 1, T + 1), dp = table(n + 1, T + 1, false), steps = [];
      for (let t = 0; t <= T; t++) { dp[n][t] = t === 0; cells[n][t] = { v: dp[n][t], kind: 'base' }; }
      for (let i = n - 1; i >= 0; i--) for (let t = 0; t <= T; t++) {
        const skip = dp[i + 1][t], take = t >= xs[i] ? dp[i + 1][t - xs[i]] : false;
        dp[i][t] = skip || take;
        steps.push({ i, j: t, v: dp[i][t], deps: t >= xs[i] ? [[i + 1, t], [i + 1, t - xs[i]]] : [[i + 1, t]], note: `sum ${t} with item ${xs[i]}: skip → ${f(skip)}` + (t >= xs[i] ? `, take → need ${t - xs[i]} from the rest → ${f(take)}` : `, too big to take`) });
      }
      return { rows: [...xs.map((x, i) => 'i' + i + '=' + x), '∅'], cols: nums(T + 1), cells, steps, answer: [0, T], result: dp[0][T], resultNote: `Target is ${total} / 2 = ${T}. Reachable: ${dp[0][T]}.` };
    }
  };

  B.findTargetSumWays = {
    inputs: [{ k: 'a', label: 'nums', v: '[1,1,1,1,1]' }, { k: 't', label: 'target', v: '3' }],
    build(p) {
      const xs = json(p.a, [1]).slice(0, 7), tg = +p.t || 0, total = xs.reduce((s, x) => s + x, 0);
      if (Math.abs(tg) > total || (total + tg) % 2) return { rows: [], cols: [], cells: [], steps: [], answer: null, result: 0, resultNote: 'total + target must be even and |target| ≤ total. Answer: 0.' };
      const P = (total + tg) / 2;
      if (P > 30) return { rows: [], cols: [], cells: [], steps: [], answer: null, result: null, resultNote: 'Keep (total + target) / 2 at 30 or less so the table fits.' };
      const n = xs.length, cells = blank(n + 1, P + 1), dp = table(n + 1, P + 1, 0), steps = [];
      for (let s = 0; s <= P; s++) { dp[n][s] = s === 0 ? 1 : 0; cells[n][s] = { v: dp[n][s], kind: 'base' }; }
      for (let i = n - 1; i >= 0; i--) for (let s = 0; s <= P; s++) {
        const skip = dp[i + 1][s], take = s >= xs[i] ? dp[i + 1][s - xs[i]] : 0;
        dp[i][s] = skip + take;
        steps.push({ i, j: s, v: dp[i][s], deps: s >= xs[i] ? [[i + 1, s], [i + 1, s - xs[i]]] : [[i + 1, s]], note: `ways to make ${s}: leave ${xs[i]} out (${skip}) + put it in (${take}) = ${dp[i][s]}` });
      }
      return { rows: [...xs.map((x, i) => 'i' + i + '=' + x), '∅'], cols: nums(P + 1), cells, steps, answer: [0, P], result: dp[0][P], resultNote: `P = (${total} + ${tg}) / 2 = ${P}. There are ${dp[0][P]} ways.` };
    }
  };

  B.change = {
    inputs: [{ k: 'c', label: 'coins', v: '[1,2,5]' }, { k: 'a', label: 'amount', v: '5' }],
    build(p) {
      const cs = json(p.c, [1]).slice(0, 6), A = clamp(+p.a, 0, 20), n = cs.length;
      const cells = blank(n + 1, A + 1), dp = table(n + 1, A + 1, 0), steps = [];
      for (let a = 0; a <= A; a++) { dp[n][a] = a === 0 ? 1 : 0; cells[n][a] = { v: dp[n][a], kind: 'base' }; }
      for (let i = n - 1; i >= 0; i--) for (let a = 0; a <= A; a++) {
        const skip = dp[i + 1][a], use = a >= cs[i] ? dp[i][a - cs[i]] : 0;
        dp[i][a] = skip + use;
        steps.push({ i, j: a, v: dp[i][a], deps: a >= cs[i] ? [[i + 1, a], [i, a - cs[i]]] : [[i + 1, a]], note: `amount ${a}, coin ${cs[i]}: never use it (${skip}) + use it and stay on this row (${use}) = ${dp[i][a]}` });
      }
      return { rows: [...cs.map(c => 'coin ' + c), '∅'], cols: nums(A + 1), cells, steps, answer: [0, A], result: dp[0][A], resultNote: `${dp[0][A]} combinations. Notice the "use it" arrow stays on the same row: coins can be reused.` };
    }
  };

  B.coinChange = {
    inputs: [{ k: 'c', label: 'coins', v: '[1,2,5]' }, { k: 'a', label: 'amount', v: '11' }],
    build(p) {
      const cs = json(p.c, [1]).slice(0, 6), A = clamp(+p.a, 0, 20), n = cs.length;
      const cells = blank(n + 1, A + 1), dp = table(n + 1, A + 1, Infinity), steps = [];
      for (let a = 0; a <= A; a++) { dp[n][a] = a === 0 ? 0 : Infinity; cells[n][a] = { v: dp[n][a], kind: 'base' }; }
      for (let i = n - 1; i >= 0; i--) for (let a = 0; a <= A; a++) {
        const skip = dp[i + 1][a], use = a >= cs[i] ? 1 + dp[i][a - cs[i]] : Infinity;
        dp[i][a] = Math.min(skip, use);
        steps.push({ i, j: a, v: dp[i][a], deps: a >= cs[i] ? [[i + 1, a], [i, a - cs[i]]] : [[i + 1, a]], note: `amount ${a}, coin ${cs[i]}: min(skip ${f(skip)}, 1 + use ${f(use)}) = ${f(dp[i][a])}` });
      }
      const r = dp[0][A] === Infinity ? -1 : dp[0][A];
      return { rows: [...cs.map(c => 'coin ' + c), '∅'], cols: nums(A + 1), cells, steps, answer: [0, A], result: r, resultNote: r === -1 ? 'Impossible, so return -1.' : `Fewest coins: ${r}.` };
    }
  };

  // ---------- Part F: index + state ----------
  B.stockCooldown = {
    inputs: [{ k: 'a', label: 'prices', v: '[1,2,3,0,2]' }],
    build(p) {
      const pr = json(p.a, [1]).slice(0, 9), n = pr.length, cells = blank(n + 2, 2), dp = table(n + 2, 2, 0), steps = [];
      cells[n] = [{ v: 0, kind: 'base' }, { v: 0, kind: 'base' }]; cells[n + 1] = [{ v: 0, kind: 'base' }, { v: 0, kind: 'base' }];
      for (let i = n - 1; i >= 0; i--) {
        dp[i][1] = Math.max(dp[i + 1][1], pr[i] + dp[i + 2][0]);
        steps.push({ i, j: 1, v: dp[i][1], deps: [[i + 1, 1], [i + 2, 0]], note: `Day ${i}, holding: keep holding (${dp[i + 1][1]}) or sell at ${pr[i]} and skip a day (${pr[i]} + ${dp[i + 2][0]})` });
        dp[i][0] = Math.max(dp[i + 1][0], -pr[i] + dp[i + 1][1]);
        steps.push({ i, j: 0, v: dp[i][0], deps: [[i + 1, 0], [i + 1, 1]], note: `Day ${i}, free: wait (${dp[i + 1][0]}) or buy at ${pr[i]} (−${pr[i]} + ${dp[i + 1][1]})` });
      }
      return { rows: [...pr.map((x, i) => 'day ' + i + ' ($' + x + ')'), 'end', 'end+1'], cols: ['free', 'holding'], cells, steps, answer: [0, 0], result: dp[0][0], resultNote: `Best profit: ${dp[0][0]}. You start the first day free.` };
    }
  };

  B.stockFee = {
    inputs: [{ k: 'a', label: 'prices', v: '[1,3,2,8,4,9]' }, { k: 'f', label: 'fee', v: '2' }],
    build(p) {
      const pr = json(p.a, [1]).slice(0, 9), fee = +p.f || 0, n = pr.length, cells = blank(n + 1, 2), dp = table(n + 1, 2, 0), steps = [];
      cells[n] = [{ v: 0, kind: 'base' }, { v: 0, kind: 'base' }];
      for (let i = n - 1; i >= 0; i--) {
        dp[i][1] = Math.max(dp[i + 1][1], pr[i] - fee + dp[i + 1][0]);
        steps.push({ i, j: 1, v: dp[i][1], deps: [[i + 1, 1], [i + 1, 0]], note: `Day ${i}, holding: keep (${dp[i + 1][1]}) or sell (${pr[i]} − ${fee} + ${dp[i + 1][0]})` });
        dp[i][0] = Math.max(dp[i + 1][0], -pr[i] + dp[i + 1][1]);
        steps.push({ i, j: 0, v: dp[i][0], deps: [[i + 1, 0], [i + 1, 1]], note: `Day ${i}, free: wait (${dp[i + 1][0]}) or buy (−${pr[i]} + ${dp[i + 1][1]})` });
      }
      return { rows: [...pr.map((x, i) => 'day ' + i + ' ($' + x + ')'), 'end'], cols: ['free', 'holding'], cells, steps, answer: [0, 0], result: dp[0][0], resultNote: `Best profit: ${dp[0][0]}.` };
    }
  };

  return { B, fmt: f };
})();
if (typeof module !== 'undefined') module.exports = VIZ;
