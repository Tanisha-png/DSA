(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const store = {
    get(k, d) { try { const v = localStorage.getItem('dp2d:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('dp2d:' + k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
  };

  addEventListener('themechange', () => requestAnimationFrame(() => VIZES.forEach(v => v.drawArrows())));

  // ---------------- code highlighting ----------------
  const KW = /\b(var|const|let|function|return|if|else|for|of|while|new|true|false|undefined|Infinity|null|break|continue)\b/;
  function hl(line) {
    const re = /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)|\b(var|const|let|function|return|if|else|for|of|while|new|true|false|undefined|Infinity|null|break|continue)\b|\b(\d+)\b|\b(Math|Array|dp|memo)\b/g;
    let out = '', last = 0, m;
    while ((m = re.exec(line))) {
      out += esc(line.slice(last, m.index));
      const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : m[4] ? 'n' : 'f';
      out += `<span class="${cls}">${esc(m[0])}</span>`;
      last = re.lastIndex;
    }
    return out + esc(line.slice(last));
  }
  const MEMO_MARK = '// memo';
  const isMemo = (l) => l.trimEnd().endsWith(MEMO_MARK);
  const stripMark = (l) => l.replace(/\s*\/\/ memo\s*$/, '');
  function toRecursion(code) {
    return code.split('\n').filter(l => !isMemo(l)).join('\n').replace(/memo(\[[^\]]+\])+ = /g, '');
  }
  function renderCode(code, showMemo) {
    return code.replace(/\n+$/, '').split('\n').map(l => {
      const memo = isMemo(l);
      return `<span class="ln${memo && showMemo ? ' memo' : ''}">${hl(stripMark(l)) || ' '}</span>`;
    }).join('');
  }
  function codeBox(pid) {
    const blocks = SOLUTIONS[pid] || [];
    const tabs = [];
    blocks.forEach((b, k) => {
      if (k === 0 && b.code.includes(MEMO_MARK)) {
        tabs.push({ label: 'Recursion', code: toRecursion(b.code), note: 'Correct but repeats work. Too slow for large inputs.' });
        tabs.push({ label: 'Memo', code: b.code, memo: true, note: b.note || 'Highlighted lines are all that memoization adds.' });
      } else tabs.push({ label: b.label, code: b.code, note: b.note || '' });
    });
    const id = 'code-' + pid;
    const el = document.createElement('div'); el.className = 'code';
    el.innerHTML = `<div class="tabs" role="tablist">${tabs.map((t, i) => `<button class="tab" role="tab" id="${id}-t${i}" aria-selected="${i === 1 ? 'true' : 'false'}" data-i="${i}">${esc(t.label)}</button>`).join('')}<button class="copy" type="button">Copy</button></div><pre></pre><div class="code-note"></div>`;
    let cur = tabs.length > 1 ? 1 : 0;
    const show = (i) => {
      cur = i;
      $$('.tab', el).forEach(b => b.setAttribute('aria-selected', String(+b.dataset.i === i)));
      $('pre', el).innerHTML = renderCode(tabs[i].code, !!tabs[i].memo);
      $('.code-note', el).textContent = tabs[i].note;
    };
    el.addEventListener('click', (e) => {
      const t = e.target.closest('.tab'); if (t) show(+t.dataset.i);
      const c = e.target.closest('.copy');
      if (c) {
        const text = tabs[cur].code.split('\n').map(stripMark).join('\n');
        const done = () => { c.textContent = 'Copied'; setTimeout(() => (c.textContent = 'Copy'), 1400); };
        try { navigator.clipboard.writeText(text).then(done, () => selectPre()); } catch (err) { selectPre(); }
      }
    });
    const selectPre = () => { const r = document.createRange(); r.selectNodeContents($('pre', el)); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
    show(cur);
    return el;
  }

  // ---------------- stepper ----------------
  const VIZES = [];
  const fmt = VIZ.fmt;
  class Stepper {
    constructor(host, key, order) {
      this.spec = VIZ.B[key]; this.key = key; this.host = host; this.k = 0; this.timer = null;
      const uid = host.dataset.pid;
      host.className = 'viz';
      host.innerHTML = `
        <div class="viz-top">
          <div class="viz-title">Step through it<small>Fill order: ${order}. Edit the input and press Load.</small></div>
          <form class="viz-in">${this.spec.inputs.map(inp => `<label for="${uid}-${inp.k}">${esc(inp.label)}<input id="${uid}-${inp.k}" name="${inp.k}" value="${esc(inp.v)}" class="${inp.v.length > 12 ? 'wide' : ''}" spellcheck="false" autocomplete="off"></label>`).join('')}<button class="btn" type="submit">Load</button></form>
        </div>
        <div class="viz-scroll"><div class="viz-stage"><table class="dpt"></table><svg class="viz-arrows"></svg></div></div>
        <div class="viz-note" aria-live="polite"></div>
        <div class="viz-ctl">
          <button class="btn" data-a="reset" type="button" aria-label="Back to the start">Reset</button>
          <button class="btn" data-a="prev" type="button">Back</button>
          <button class="btn btn-primary" data-a="next" type="button">Next</button>
          <button class="btn" data-a="play" type="button">Play</button>
          <button class="btn" data-a="end" type="button">Show all</button>
          <span class="count"></span>
          <label for="${uid}-speed">speed<input type="range" id="${uid}-speed" min="1" max="10" value="5"></label>
        </div>`;
      $('form', host).addEventListener('submit', (e) => { e.preventDefault(); this.load(); });
      $('.viz-ctl', host).addEventListener('click', (e) => {
        const a = e.target.closest('[data-a]'); if (!a) return;
        const act = a.dataset.a;
        if (act !== 'play') this.stop();
        if (act === 'reset') this.go(0);
        if (act === 'prev') this.go(this.k - 1);
        if (act === 'next') this.go(this.k + 1);
        if (act === 'end') this.go(this.r.steps.length);
        if (act === 'play') this.timer ? this.stop() : this.play();
      });
      $(`#${uid}-speed`, host).addEventListener('input', () => { if (this.timer) { this.stop(); this.play(); } });
      this.load();
    }
    load() {
      this.stop();
      const p = {}; $$('input[name]', this.host).forEach(i => (p[i.name] = i.value));
      try { this.r = this.spec.build(p); } catch (e) { this.r = { rows: [], cols: [], cells: [], steps: [], resultNote: 'That input could not be read. Check the brackets and quotes.' }; }
      const r = this.r, tbl = $('table', this.host);
      if (!r.rows.length) { tbl.innerHTML = ''; $('.viz-arrows', this.host).innerHTML = ''; this.k = 0; this.paintEmpty(); return; }
      let h = '<tr><th></th>' + r.cols.map(c => `<th>${esc(c)}</th>`).join('') + '</tr>';
      r.rows.forEach((rl, i) => {
        h += `<tr><th class="rh">${esc(rl)}</th>` + r.cols.map((_, j) => `<td data-i="${i}" data-j="${j}"></td>`).join('') + '</tr>';
      });
      tbl.innerHTML = h;
      this.td = r.rows.map((_, i) => r.cols.map((_, j) => tbl.querySelector(`td[data-i="${i}"][data-j="${j}"]`)));
      this.go(0);
    }
    paintEmpty() {
      $('.viz-note', this.host).className = 'viz-note final';
      $('.viz-note', this.host).textContent = this.r.resultNote || '';
      $('.count', this.host).textContent = '';
    }
    go(k) {
      const r = this.r; if (!r.rows.length) return;
      k = Math.max(0, Math.min(r.steps.length, k)); this.k = k;
      const vals = r.cells.map(row => row.map(c => c.v));
      for (let s = 0; s < k; s++) vals[r.steps[s].i][r.steps[s].j] = r.steps[s].v;
      const cur = k > 0 ? r.steps[k - 1] : null, end = k === r.steps.length;
      const depSet = new Set(cur ? cur.deps.map(([a, b]) => a + ',' + b) : []);
      let sq = null;
      if (end && r.square) { const [bi, bj, side] = r.square; sq = (i, j) => i > bi - side && i <= bi && j > bj - side && j <= bj; }
      r.cells.forEach((row, i) => row.forEach((c, j) => {
        const td = this.td[i][j], v = vals[i][j];
        const cls = [c.kind || ''];
        if (c.kind !== 'void' && c.kind !== 'pad' && c.kind !== 'base' && v !== undefined) cls.push('filled');
        if (v === true) cls.push('vt'); if (v === false) cls.push('vf');
        if (cur && cur.i === i && cur.j === j && !end) cls.push('cur');
        if (depSet.has(i + ',' + j) && !end) cls.push('dep');
        if (end && r.answer && r.answer[0] === i && r.answer[1] === j) cls.push('ans');
        if (sq && sq(i, j)) cls.push('insq');
        td.className = cls.join(' ');
        if (c.kind === 'void') { td.innerHTML = ''; return; }
        if (c.kind === 'block' && v === undefined) { td.innerHTML = ''; return; }
        td.innerHTML = (c.tag !== undefined ? `<span class="tg">${esc(c.tag)}</span>` : '') + (v === undefined ? '' : esc(fmt(v)));
        if (c.kind === 'block') td.innerHTML = '';
      }));
      const note = $('.viz-note', this.host);
      if (end) { note.className = 'viz-note final'; note.textContent = 'Done. ' + (r.resultNote || ''); }
      else if (cur) { note.className = 'viz-note'; note.textContent = cur.note; }
      else { note.className = 'viz-note'; note.textContent = 'Dashed cells are base cases, set before step 1. Press Next.'; }
      $('.count', this.host).textContent = `step ${k} / ${r.steps.length}`;
      $('[data-a="play"]', this.host).textContent = this.timer ? 'Pause' : 'Play';
      this.cur = end ? null : cur;
      this.drawArrows();
    }
    drawArrows() {
      const svg = $('.viz-arrows', this.host); if (!svg) return;
      const stage = $('.viz-stage', this.host);
      svg.setAttribute('width', stage.offsetWidth); svg.setAttribute('height', stage.offsetHeight);
      svg.setAttribute('viewBox', `0 0 ${stage.offsetWidth} ${stage.offsetHeight}`);
      if (!this.cur || !this.cur.deps.length) { svg.innerHTML = ''; return; }
      const sr = stage.getBoundingClientRect();
      const center = (i, j) => { const b = this.td[i][j].getBoundingClientRect(); return [b.left - sr.left + b.width / 2, b.top - sr.top + b.height / 2]; };
      const [cx, cy] = center(this.cur.i, this.cur.j);
      svg.innerHTML = this.cur.deps.map(([a, b]) => {
        const [x, y] = center(a, b), dx = cx - x, dy = cy - y, L = Math.hypot(dx, dy) || 1;
        const s1 = 13, s2 = 16;
        return `<line x1="${x + dx * s1 / L}" y1="${y + dy * s1 / L}" x2="${cx - dx * s2 / L}" y2="${cy - dy * s2 / L}" class="ar ar-dep" marker-end="url(#ah-dep)"/>`;
      }).join('');
    }
    play() {
      if (this.k >= this.r.steps.length) this.go(0);
      const speed = +$(`#${this.host.dataset.pid}-speed`, this.host).value;
      const ms = 1500 - speed * 135;
      this.timer = setInterval(() => { if (this.k >= this.r.steps.length) { this.stop(); return; } this.go(this.k + 1); }, ms);
      $('[data-a="play"]', this.host).textContent = 'Pause';
    }
    stop() { if (this.timer) clearInterval(this.timer); this.timer = null; const b = this.host && $('[data-a="play"]', this.host); if (b) b.textContent = 'Play'; }
  }
  addEventListener('resize', () => VIZES.forEach(v => v.drawArrows()));

  // ---------------- render families & problems ----------------
  const famHost = $('#families');
  const MOVE_TEXT = { ul: 'Reads from above and from the left.', rd: 'Reads from the right and from below.', up3: 'Reads the three cells above.', tld: 'Reads top, left and diagonal.' };
  const pts = (arr) => `<ul class="pts">${arr.map(x => `<li>${x}</li>`).join('')}</ul>`;
  const plain = (h) => h.replace(/<[^>]+>/g, '');
  FAMILIES.forEach(F => {
    const sec = document.createElement('section'); sec.className = 'fam'; sec.id = 'fam-' + F.id; sec.dataset.f = F.id;
    const count = PROBLEMS.filter(p => p.fam === F.id).length;
    sec.innerHTML = `<div class="fam-head"><div class="fam-letter">${F.id}</div><div><div class="eyebrow">Family ${F.id} · ${count} problem${count > 1 ? 's' : ''}</div><h2>${F.name}</h2>${pts(F.points)}</div></div>
      <div class="statebox"><span class="lbl">State</span>${F.state}</div>
      <figure class="figure">${DG[F.diagram]()}</figure>`;
    PROBLEMS.filter(p => p.fam === F.id).forEach(P => sec.appendChild(renderProblem(P)));
    famHost.appendChild(sec);
  });

  function renderProblem(P) {
    const a = document.createElement('article'); a.className = 'prob'; a.id = P.id;
    const labels = ['State', 'Choices', 'Recurrence', 'Base cases', 'Answer', 'Fill order'];
    a.innerHTML = `
      <div class="prob-head">
        <span class="pid">${P.id}</span><h3>${esc(P.title)}</h3>
        <a class="chip" href="${P.url}" target="_blank" rel="noopener">LeetCode ${P.lc}</a>
        <span class="chip diff-${P.diff}">${P.diff}</span>
        <span class="chip chip-dir">${plain(P.card[5])}</span>
        <label class="done-toggle" for="done-${P.id}"><input type="checkbox" id="done-${P.id}" data-pid="${P.id}"> I can solve this</label>
      </div>
      <div class="prob-grid">
        <div class="prob-q"><div class="lbl">Problem</div><p class="stmt">${P.statement}</p><div class="lbl">Example</div><pre class="example">${esc(P.example)}</pre></div>
        <div class="card"><div class="card-title"><span>DP card</span></div>
          <dl>${P.card.map((c, i) => `<dt>${labels[i]}</dt><dd>${c}</dd>`).join('')}</dl>
          ${P.moves ? `<div class="moves">${DG.moves(P.moves)}<span>${MOVE_TEXT[P.moves]}</span></div>` : ''}
        </div>
      </div>
      ${P.diagram ? `<figure class="figure">${DG[P.diagram]()}</figure>` : ''}
      <div class="notes"><div class="lbl">Key points</div>${pts(P.notes)}</div>
      <div class="viz-host" data-pid="${P.id}"></div>
      <div class="code-host"></div>
      ${P.tries.length ? `<div class="tries"><div class="lbl">Check yourself</div>${P.tries.map(t => `<details class="try"><summary>${t.q}</summary><div class="ans">${t.a}</div></details>`).join('')}</div>` : ''}
      <div class="cx"><span class="lbl">Complexity</span><span>${P.cx}</span></div>`;
    $('.code-host', a).replaceWith(codeBox(P.id));
    return a;
  }
  $$('.viz-host').forEach(h => { const P = PROBLEMS.find(p => p.id === h.dataset.pid); VIZES.push(new Stepper(h, P.viz, plain(P.card[5]).toLowerCase())); });

  // ---------------- start-here figures ----------------
  $('#fig-tree').innerHTML = DG.tree() + '<figcaption>Orange = repeated work. With a memo, the second dp(1,1) returns at once.</figcaption>';
  $('#fig-dirs').innerHTML = DG.directions();
  function callCounts(n) {
    const m = n, cnt = new Map();
    const brute = (i, j) => { if (i >= m || j >= n || (i === m - 1 && j === n - 1)) return 1; const k = i * 100 + j; if (cnt.has(k)) return cnt.get(k); const v = 1 + brute(i, j + 1) + brute(i + 1, j); cnt.set(k, v); return v; };
    let calls = 0; const seen = new Set();
    const memo = (i, j) => { calls++; if (i >= m || j >= n || (i === m - 1 && j === n - 1)) return; const k = i * 100 + j; if (seen.has(k)) return; seen.add(k); memo(i, j + 1); memo(i + 1, j); };
    memo(0, 0);
    return [brute(0, 0), calls];
  }
  const callsInput = $('#calls-n');
  const updCalls = () => {
    const n = +callsInput.value, [slow, fast] = callCounts(n), max = Math.log10(callCounts(16)[0]);
    $('#calls-label').textContent = `${n} × ${n}`;
    $('#calls-slow').textContent = slow.toLocaleString('en-US');
    $('#calls-fast').textContent = fast.toLocaleString('en-US');
    $('#calls-bar-slow').style.width = (100 * Math.log10(slow) / max) + '%';
    $('#calls-bar-fast').style.width = (100 * Math.log10(fast) / max) + '%';
  };
  callsInput.addEventListener('input', updCalls); updCalls();

  // ---------------- nav, progress, search ----------------
  const nav = $('#nav');
  let navHtml = `<li><a href="#start"><span class="nid">·</span>Basics</a></li>`;
  FAMILIES.forEach(F => {
    navHtml += `<li class="grp" data-f="${F.id}"><a href="#fam-${F.id}" style="padding:0;color:inherit">${F.id} · ${F.name}</a></li>`;
    PROBLEMS.filter(p => p.fam === F.id).forEach(P => {
      navHtml += `<li data-search="${esc((P.id + ' ' + P.title + ' ' + P.lc).toLowerCase())}"><a href="#${P.id}" data-pid="${P.id}"><span class="nid">${P.id}</span><span class="nt">${esc(P.title)}</span><i class="dd dd-${P.diff}" title="${P.diff}"></i><span class="tick">✓</span></a></li>`;
    });
  });
  navHtml += `<li class="grp">Practice</li><li><a href="#quiz"><span class="nid">?</span>Which family is it?</a></li><li><a href="#cheat"><span class="nid">≡</span>All 22 side by side</a></li><li><a href="#plan"><span class="nid">14</span>Study plan</a></li>`;
  nav.innerHTML = navHtml;

  let done = store.get('done', {});
  const paintProgress = () => {
    const n = PROBLEMS.filter(p => done[p.id]).length;
    $('#prog-text').textContent = `${n} of ${PROBLEMS.length} solved`;
    $('#prog-bar').style.width = (100 * n / PROBLEMS.length) + '%';
    $$('a[data-pid]', nav).forEach(a => a.classList.toggle('done', !!done[a.dataset.pid]));
  };
  $$('input[data-pid]').forEach(cb => {
    cb.checked = !!done[cb.dataset.pid];
    cb.addEventListener('change', () => { done[cb.dataset.pid] = cb.checked; store.set('done', done); paintProgress(); });
  });
  $('#reset-progress').addEventListener('click', (e) => {
    const b = e.currentTarget;
    if (b.dataset.armed) { done = {}; store.set('done', done); $$('input[data-pid]').forEach(c => (c.checked = false)); paintProgress(); b.textContent = 'Reset ticks'; delete b.dataset.armed; return; }
    b.dataset.armed = '1'; b.textContent = 'Click again to clear';
    setTimeout(() => { if (b.dataset.armed) { delete b.dataset.armed; b.textContent = 'Reset ticks'; } }, 3000);
  });
  paintProgress();

  $('#nav-search').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    $$('li[data-search]', nav).forEach(li => (li.hidden = q && !li.dataset.search.includes(q)));
  });

  // ---------------- hamburger: show / hide the question list ----------------
  // Wide screens: the list is a column that can be hidden (remembered).
  // Narrow screens: the list slides over the page and closes after a pick.
  const rail = $('#rail'), layout = $('.layout'), menuBtn = $('#menu-btn'), scrim = $('#scrim');
  const narrow = matchMedia('(max-width: 980px)');
  let wideOpen = store.get('railOpen', true);
  const isOpen = () => (narrow.matches ? rail.classList.contains('open') : wideOpen);
  const paintMenu = () => {
    layout.classList.toggle('rail-hidden', !narrow.matches && !wideOpen);
    if (!narrow.matches) rail.classList.remove('open');
    scrim.hidden = !(narrow.matches && rail.classList.contains('open'));
    menuBtn.setAttribute('aria-expanded', String(isOpen()));
    menuBtn.setAttribute('aria-label', isOpen() ? 'Hide question list' : 'Show question list');
    requestAnimationFrame(() => VIZES.forEach(v => v.drawArrows()));
  };
  menuBtn.addEventListener('click', () => {
    if (narrow.matches) rail.classList.toggle('open');
    else { wideOpen = !wideOpen; store.set('railOpen', wideOpen); }
    paintMenu();
  });
  const closeNarrow = () => { if (narrow.matches) { rail.classList.remove('open'); paintMenu(); } };
  scrim.addEventListener('click', closeNarrow);
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) closeNarrow(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNarrow(); });
  narrow.addEventListener('change', paintMenu);
  paintMenu();

  if ('IntersectionObserver' in window) {
    const links = new Map($$('a[href^="#"]', nav).map(a => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((ents) => {
      ents.forEach(en => {
        if (!en.isIntersecting) return;
        $$('a.on', nav).forEach(a => a.classList.remove('on'));
        const l = links.get(en.target.id); if (l) l.classList.add('on');
      });
    }, { rootMargin: '-30% 0px -65% 0px' });
    ['start', 'quiz', 'cheat', 'plan', ...PROBLEMS.map(p => p.id)].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  // ---------------- quiz ----------------
  const qHost = $('#quiz-list');
  let answers = store.get('quiz', {});
  const paintQuiz = () => {
    qHost.innerHTML = QUIZ.map((q, i) => {
      const pick = answers[i];
      return `<div class="q"><p>${i + 1}. ${esc(q.q)}</p><div class="opts">${QUIZ_OPTIONS.map((o, k) => {
        let cls = 'opt';
        if (pick !== undefined && k === q.a) cls += ' right';
        if (pick === k && k !== q.a) cls += ' wrong';
        return `<button class="${cls}" type="button" data-q="${i}" data-k="${k}" ${pick !== undefined ? 'disabled' : ''}>${o}</button>`;
      }).join('')}</div>${pick !== undefined ? `<div class="why">${pick === q.a ? 'Right. ' : 'Not quite. '}${esc(q.why)}</div>` : ''}</div>`;
    }).join('');
    const answered = Object.keys(answers).length, right = QUIZ.filter((q, i) => answers[i] === q.a).length;
    $('#quiz-score').textContent = answered ? `${right} right out of ${answered} answered (${QUIZ.length} questions)` : `${QUIZ.length} questions. Your answers stay in this browser.`;
  };
  qHost.addEventListener('click', (e) => {
    const b = e.target.closest('.opt'); if (!b || b.disabled) return;
    answers[b.dataset.q] = +b.dataset.k; store.set('quiz', answers); paintQuiz();
  });
  $('#quiz-reset').addEventListener('click', () => { answers = {}; store.set('quiz', answers); paintQuiz(); });
  paintQuiz();

  // ---------------- plan ----------------
  $('#plan-table').insertAdjacentHTML('beforeend', PLAN.map(r => `<tr><td>${r[0]}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join(''));

  // sections are built by script, so jump to a #link only after they exist
  const jump = () => { const el = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1))); if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' }); };
  jump();

  // fonts can shift table cells; redraw arrows once they are in
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { VIZES.forEach(v => v.drawArrows()); jump(); });
})();
