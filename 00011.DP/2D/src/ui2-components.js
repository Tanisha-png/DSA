// Tables & lists gallery (ui2.html). Same format as ui-components.js: html + css (+ js, run with `root` = its demo box).
const CHECK_SVG = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";

const UI = [
  // =================================================================== TABLES
  { id: 'tables', name: 'Tables', items: [
    { name: 'Sortable data grid', desc: 'Sticky frosted header, avatar initials, status pills. Click a column to sort.', bg: '#eef2ff',
      html: `<div class="dg-wrap">
  <table class="dg">
    <thead><tr><th>Name</th><th data-num>Commits</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td data-i="AK" style="--h: 262">Aisha Khan</td><td>482</td><td><span class="dg-pill is-on">Active</span></td></tr>
      <tr><td data-i="LM" style="--h: 160">Leo Martin</td><td>1,207</td><td><span class="dg-pill is-away">Away</span></td></tr>
      <tr><td data-i="SR" style="--h: 20">Sara Rossi</td><td>96</td><td><span class="dg-pill is-on">Active</span></td></tr>
      <tr><td data-i="JT" style="--h: 200">Jin Tanaka</td><td>734</td><td><span class="dg-pill">Offline</span></td></tr>
      <tr><td data-i="NB" style="--h: 320">Nia Brown</td><td>358</td><td><span class="dg-pill is-on">Active</span></td></tr>
    </tbody>
  </table>
</div>`,
      css: `.dg-wrap {
  width: 100%; max-width: 400px; max-height: 214px; overflow: auto; border-radius: 14px;
  background: #fff; border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .05), 0 14px 30px -18px rgba(15, 23, 42, .4);
}
.dg { width: 100%; border-collapse: separate; border-spacing: 0; font: 13px Inter, system-ui, sans-serif; color: #1f2937; }
.dg th {
  position: sticky; top: 0; z-index: 1; padding: 10px 14px; text-align: left; white-space: nowrap;
  background: rgba(248, 250, 252, .9); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
  border-bottom: 1px solid #e5e7eb; color: #64748b;
  font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
  cursor: pointer; user-select: none;
}
.dg th:hover { color: #4f46e5; }
.dg th::after { content: '\\2195'; margin-left: 6px; font-size: 10px; opacity: .35; }
.dg th[aria-sort="ascending"]::after { content: '\\2191'; opacity: 1; color: #4f46e5; }
.dg th[aria-sort="descending"]::after { content: '\\2193'; opacity: 1; color: #4f46e5; }
.dg td { padding: 9px 14px; border-bottom: 1px solid #f1f5f9; white-space: nowrap; }
.dg tbody tr { transition: background .15s; }
.dg tbody tr:hover { background: #f8fafc; }
.dg td[data-i]::before {
  content: attr(data-i); display: inline-grid; place-items: center; width: 26px; height: 26px; margin-right: 10px;
  border-radius: 50%; vertical-align: middle; font-size: 10px; font-weight: 700;
  background: hsl(var(--h) 80% 92%); color: hsl(var(--h) 55% 36%);
}
.dg th[data-num], .dg td:nth-child(2) { text-align: right; font-family: 'JetBrains Mono', monospace; }
.dg-pill { display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 999px; background: #f1f5f9; color: #64748b; font-size: 12px; font-weight: 600; }
.dg-pill::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.dg-pill.is-on { background: #dcfce7; color: #15803d; }
.dg-pill.is-away { background: #fef3c7; color: #b45309; }`,
      js: `var table = root.querySelector('.dg'), body = table.tBodies[0];
table.querySelectorAll('th').forEach(function (th, col) {
  th.addEventListener('click', function () {
    var asc = th.getAttribute('aria-sort') !== 'ascending';
    table.querySelectorAll('th').forEach(function (h) { h.removeAttribute('aria-sort'); });
    th.setAttribute('aria-sort', asc ? 'ascending' : 'descending');
    var num = th.hasAttribute('data-num');
    var rows = Array.prototype.slice.call(body.rows);
    rows.sort(function (a, b) {
      var x = a.cells[col].textContent.trim(), y = b.cells[col].textContent.trim();
      var r = num ? parseFloat(x.replace(/,/g, '')) - parseFloat(y.replace(/,/g, '')) : x.localeCompare(y);
      return asc ? r : -r;
    });
    rows.forEach(function (r) { body.appendChild(r); });
  });
});` },

    { name: 'Featured plan column', desc: 'Comparison table where the recommended column rises out as a dark card.', bg: '#f1f5f9',
      html: `<table class="pc">
  <thead><tr><th></th><th>Free</th><th class="pc-hot"><span>Popular</span>Pro</th><th>Team</th></tr></thead>
  <tbody>
    <tr><th>Projects</th><td>3</td><td class="pc-hot">Unlimited</td><td>Unlimited</td></tr>
    <tr><th>Private repos</th><td class="pc-no"></td><td class="pc-hot pc-yes"></td><td class="pc-yes"></td></tr>
    <tr><th>Analytics</th><td class="pc-no"></td><td class="pc-hot pc-yes"></td><td class="pc-yes"></td></tr>
    <tr><th>SSO</th><td class="pc-no"></td><td class="pc-hot pc-no"></td><td class="pc-yes"></td></tr>
  </tbody>
  <tfoot><tr><th></th><td>$0</td><td class="pc-hot">$12</td><td>$29</td></tr></tfoot>
</table>`,
      css: `.pc {
  border-collapse: separate; border-spacing: 0; padding: 4px 6px 0; border-radius: 18px; background: #fff;
  box-shadow: 0 16px 34px -20px rgba(30, 27, 75, .5); font: 12.5px Inter, system-ui, sans-serif; color: #334155;
}
.pc th, .pc td { padding: 8px 11px; text-align: center; }
.pc thead th { padding-top: 16px; color: #0f172a; font: 700 14px 'Space Grotesk', sans-serif; }
.pc tbody th { text-align: left; white-space: nowrap; font-weight: 500; color: #475569; }
.pc tbody tr > * { border-top: 1px solid #f1f5f9; }
.pc .pc-hot { background: linear-gradient(180deg, #4338ca, #312e81); color: #fff; border-top-color: rgba(255, 255, 255, .08); }
.pc thead .pc-hot { position: relative; padding-top: 28px; border-radius: 14px 14px 0 0; }
.pc thead .pc-hot span { position: absolute; top: 9px; left: 50%; transform: translateX(-50%); white-space: nowrap; color: #c7d2fe; font: 700 9px Inter, sans-serif; letter-spacing: .14em; text-transform: uppercase; }
.pc tfoot td { padding: 10px 11px 14px; color: #0f172a; font: 800 19px 'Space Grotesk', sans-serif; }
.pc tfoot .pc-hot { color: #fff; border-radius: 0 0 14px 14px; }
.pc-yes::before, .pc-no::before { content: ''; display: inline-block; vertical-align: middle; }
.pc-yes::before { width: 18px; height: 18px; border-radius: 50%; background: #22c55e ${CHECK_SVG} center / 12px no-repeat; }
.pc .pc-hot.pc-yes::before { background-color: #34d399; }
.pc-no::before { width: 12px; height: 2px; border-radius: 2px; background: #cbd5e1; }
.pc .pc-hot.pc-no::before { background: rgba(255, 255, 255, .35); }` },

    { name: 'Activity heatmap', desc: 'Cell colour comes from one --v value (0 to 1) via color-mix. Hover for the count.', bg: '#ffffff',
      html: `<div class="hm-box">
  <table class="hm">
    <thead><tr><th></th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></thead>
    <tbody>
      <tr><th>Week 1</th><td style="--v:.15" data-n="2"></td><td style="--v:.5" data-n="7"></td><td style="--v:.8" data-n="12"></td><td style="--v:.35" data-n="5"></td><td style="--v:.6" data-n="9"></td><td style="--v:0" data-n="0"></td><td style="--v:.05" data-n="1"></td></tr>
      <tr><th>Week 2</th><td style="--v:.4" data-n="6"></td><td style="--v:.9" data-n="14"></td><td style="--v:1" data-n="16"></td><td style="--v:.7" data-n="11"></td><td style="--v:.45" data-n="7"></td><td style="--v:.1" data-n="1"></td><td style="--v:0" data-n="0"></td></tr>
      <tr><th>Week 3</th><td style="--v:.25" data-n="4"></td><td style="--v:.3" data-n="5"></td><td style="--v:.55" data-n="8"></td><td style="--v:.85" data-n="13"></td><td style="--v:.95" data-n="15"></td><td style="--v:.2" data-n="3"></td><td style="--v:.15" data-n="2"></td></tr>
      <tr><th>Week 4</th><td style="--v:.6" data-n="9"></td><td style="--v:.75" data-n="12"></td><td style="--v:.4" data-n="6"></td><td style="--v:.65" data-n="10"></td><td style="--v:.3" data-n="4"></td><td style="--v:0" data-n="0"></td><td style="--v:.35" data-n="5"></td></tr>
    </tbody>
  </table>
  <div class="hm-legend">Less <i style="--v:0"></i><i style="--v:.25"></i><i style="--v:.5"></i><i style="--v:.75"></i><i style="--v:1"></i> More</div>
</div>`,
      css: `.hm-box { font: 11px Inter, system-ui, sans-serif; color: #475569; }
.hm { border-collapse: separate; border-spacing: 5px; }
.hm th { padding: 0 2px; font-weight: 600; }
.hm tbody th { padding-right: 8px; text-align: right; white-space: nowrap; }
.hm td, .hm-legend i {
  background: color-mix(in oklab, #059669 calc(var(--v) * 100%), #e6f4ec);
}
.hm td { position: relative; width: 30px; height: 30px; border-radius: 8px; transition: transform .15s, box-shadow .15s; }
.hm td:hover { z-index: 1; transform: scale(1.18); box-shadow: 0 0 0 2px #fff, 0 0 0 4px #059669; }
.hm td::after {
  content: attr(data-n) ' commits'; position: absolute; left: 50%; bottom: calc(100% + 8px);
  padding: 4px 8px; border-radius: 6px; background: #0f172a; color: #fff; white-space: nowrap;
  opacity: 0; pointer-events: none; transform: translate(-50%, 4px); transition: opacity .15s, transform .15s;
}
.hm td:hover::after { opacity: 1; transform: translate(-50%, 0); }
.hm-legend { display: flex; align-items: center; justify-content: flex-end; gap: 4px; margin-top: 6px; }
.hm-legend i { width: 12px; height: 12px; border-radius: 3px; }` },

    { name: 'Table to cards', desc: 'A container query turns rows into cards when the box gets narrow. Drag the corner.', bg: '#faf5ff',
      html: `<div class="rt-box">
  <table class="rt">
    <thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td data-label="Order">#1042</td><td data-label="Customer">R. Iyer</td><td data-label="Total">$240</td><td data-label="Status"><span class="rt-s is-paid">Paid</span></td></tr>
      <tr><td data-label="Order">#1043</td><td data-label="Customer">M. Silva</td><td data-label="Total">$88</td><td data-label="Status"><span class="rt-s">Pending</span></td></tr>
      <tr><td data-label="Order">#1044</td><td data-label="Customer">T. Okafor</td><td data-label="Total">$512</td><td data-label="Status"><span class="rt-s is-paid">Paid</span></td></tr>
    </tbody>
  </table>
</div>`,
      css: `.rt-box {
  container-type: inline-size; width: 100%; max-width: 520px; min-width: 200px;
  padding: 6px; overflow: auto; resize: horizontal; border: 1px dashed #c4b5fd; border-radius: 14px;
}
.rt { width: 100%; border-collapse: separate; border-spacing: 0; font: 13px Inter, system-ui, sans-serif; color: #1e1b4b; }
.rt th { padding: 9px 12px; text-align: left; background: #ede9fe; color: #6d28d9; font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
.rt th:first-child { border-radius: 10px 0 0 10px; }
.rt th:last-child { border-radius: 0 10px 10px 0; }
.rt td { padding: 10px 12px; border-bottom: 1px solid #ede9fe; }
.rt tbody tr:hover td { background: #faf5ff; }
.rt-s { padding: 2px 9px; border-radius: 999px; background: #fef3c7; color: #b45309; font-size: 12px; font-weight: 600; }
.rt-s.is-paid { background: #dcfce7; color: #15803d; }

@container (max-width: 400px) {
  .rt thead { display: none; }
  .rt, .rt tbody, .rt tr, .rt td { display: block; width: 100%; }
  .rt tr { margin-bottom: 10px; padding: 8px 14px; border-radius: 14px; background: #fff; box-shadow: 0 8px 18px -12px rgba(76, 29, 149, .45); }
  .rt td { display: flex; justify-content: space-between; align-items: center; padding: 5px 0; border: 0; }
  .rt td::before { content: attr(data-label); color: #7c3aed; font-size: 10.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
  .rt tbody tr:hover td { background: none; }
}` },

    { name: 'Crosshair sheet', desc: 'Spreadsheet look: hovering a cell lights its row and column and fills the formula bar.', bg: '#020617',
      html: `<div class="xs-box">
  <div class="xs-bar"><b>&ndash;</b><span>Hover a cell</span></div>
  <table class="xs">
    <thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead>
    <tbody>
      <tr><th>1</th><td>1,204</td><td>880</td><td class="neg">-42</td><td>3,310</td></tr>
      <tr><th>2</th><td>96</td><td>4,512</td><td>210</td><td class="neg">-7</td></tr>
      <tr><th>3</th><td>733</td><td>65</td><td>1,980</td><td>402</td></tr>
      <tr><th>4</th><td class="neg">-310</td><td>2,048</td><td>77</td><td>1,111</td></tr>
    </tbody>
  </table>
</div>`,
      css: `.xs-box { overflow: hidden; border: 1px solid #1e293b; border-radius: 12px; background: #0b1220; font: 12.5px 'JetBrains Mono', ui-monospace, monospace; }
.xs-bar { display: flex; gap: 12px; padding: 8px 12px; border-bottom: 1px solid #1e293b; color: #94a3b8; }
.xs-bar b { min-width: 28px; color: #38bdf8; }
.xs { border-collapse: collapse; color: #cbd5e1; }
.xs th { padding: 6px 12px; background: #0f172a; color: #475569; font-weight: 500; transition: color .12s, background .12s; }
.xs td { padding: 8px 16px; text-align: right; border: 1px solid #1e293b; cursor: cell; transition: background .12s, color .12s; }
.xs td.neg { color: #f87171; }
.xs .is-row, .xs .is-col { background: rgba(56, 189, 248, .08); }
.xs th.is-row, .xs th.is-col { background: #0c2a40; color: #38bdf8; }
.xs td.is-cell { background: #38bdf8; color: #0b1220; font-weight: 700; }`,
      js: `var t = root.querySelector('.xs'), bar = root.querySelector('.xs-bar');
function clear() {
  t.querySelectorAll('.is-row, .is-col, .is-cell').forEach(function (c) { c.classList.remove('is-row', 'is-col', 'is-cell'); });
}
t.addEventListener('mouseover', function (e) {
  var td = e.target.closest('td'); if (!td) return;
  clear();
  var tr = td.parentElement, col = td.cellIndex;
  Array.prototype.forEach.call(tr.cells, function (c) { c.classList.add('is-row'); });
  Array.prototype.forEach.call(t.rows, function (r) { r.cells[col].classList.add('is-col'); });
  td.classList.add('is-cell');
  bar.firstElementChild.textContent = String.fromCharCode(64 + col) + tr.rowIndex;
  bar.lastElementChild.textContent = '= ' + td.textContent;
});
t.addEventListener('mouseleave', function () {
  clear();
  bar.firstElementChild.textContent = '\\u2013';
  bar.lastElementChild.textContent = 'Hover a cell';
});` }
  ] },

  // =================================================================== LISTS
  { id: 'lists', name: 'Lists', items: [
    { name: 'Notification feed', desc: 'Unread dots, tinted avatars, and an action that slides in on hover.', bg: '#eff6ff',
      html: `<ul class="nf">
  <li class="is-new"><span class="nf-av" style="--h: 340">MR</span><div><b>Maya R.</b> commented on <i>Design review</i><small>2 min ago</small></div><button class="nf-act">Reply</button></li>
  <li class="is-new"><span class="nf-av" style="--h: 200">DK</span><div><b>Dev K.</b> merged <i>#214 search</i><small>18 min ago</small></div><button class="nf-act">View</button></li>
  <li><span class="nf-av" style="--h: 140">AO</span><div><b>Ama O.</b> invited you to <i>Roadmap</i><small>1 h ago</small></div><button class="nf-act">Join</button></li>
</ul>`,
      css: `.nf { width: 100%; max-width: 370px; margin: 0; padding: 6px; list-style: none; border-radius: 16px; background: #fff; box-shadow: 0 16px 32px -20px rgba(30, 64, 175, .5); font: 13px Inter, system-ui, sans-serif; color: #475569; }
.nf li { position: relative; display: grid; grid-template-columns: 34px 1fr auto; align-items: center; gap: 10px; padding: 10px 12px 10px 16px; border-radius: 12px; transition: background .2s; }
.nf li:hover { background: #f8fafc; }
.nf li.is-new::before { content: ''; position: absolute; left: 5px; top: 50%; width: 6px; height: 6px; margin-top: -3px; border-radius: 50%; background: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, .2); }
.nf-av { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: hsl(var(--h) 85% 92%); color: hsl(var(--h) 55% 38%); font-size: 11px; font-weight: 700; }
.nf b { color: #0f172a; }
.nf i { font-style: normal; font-weight: 500; color: #4f46e5; }
.nf small { display: block; margin-top: 1px; color: #94a3b8; font-size: 11.5px; }
.nf-act { padding: 6px 10px; border: 0; border-radius: 8px; background: #eef2ff; color: #4338ca; font: 600 12px Inter, sans-serif; cursor: pointer; opacity: 0; transform: translateX(6px); transition: opacity .2s, transform .2s, background .2s; }
.nf li:hover .nf-act, .nf-act:focus-visible { opacity: 1; transform: none; }
.nf-act:hover { background: #e0e7ff; }` },

    { name: 'File tree', desc: 'Nested folders with guide lines and turning chevrons, built on details/summary.', bg: '#020617',
      html: `<ul class="ft">
  <li><details open><summary>src</summary>
    <ul>
      <li><details open><summary>components</summary>
        <ul>
          <li class="ft-file" style="--c: #38bdf8">Button.tsx</li>
          <li class="ft-file" style="--c: #38bdf8">Card.tsx</li>
        </ul>
      </details></li>
      <li><details><summary>styles</summary>
        <ul><li class="ft-file" style="--c: #f472b6">theme.css</li></ul>
      </details></li>
      <li class="ft-file is-active" style="--c: #facc15">main.ts</li>
    </ul>
  </details></li>
  <li class="ft-file" style="--c: #4ade80">package.json</li>
</ul>`,
      css: `.ft, .ft ul { margin: 0; padding: 0; list-style: none; }
.ft { width: 230px; padding: 10px; border: 1px solid #1e293b; border-radius: 12px; background: #0f172a; color: #cbd5e1; font: 13px 'JetBrains Mono', ui-monospace, monospace; }
.ft ul { margin-left: 10px; padding-left: 10px; border-left: 1px solid #1e293b; }
.ft summary { display: flex; align-items: center; gap: 8px; padding: 4px 6px; border-radius: 6px; color: #fbbf24; list-style: none; cursor: pointer; }
.ft summary::-webkit-details-marker { display: none; }
.ft summary::before { content: ''; width: 5px; height: 5px; border: solid #64748b; border-width: 0 1.5px 1.5px 0; transform: rotate(-45deg); transition: transform .2s; }
.ft details[open] > summary::before { transform: rotate(45deg); }
.ft-file { position: relative; padding: 4px 6px 4px 24px; border-radius: 6px; cursor: default; }
.ft-file::before { content: ''; position: absolute; left: 9px; top: 50%; width: 7px; height: 7px; margin-top: -3.5px; border-radius: 2px; background: var(--c, #64748b); }
.ft summary:hover, .ft-file:hover { background: #1e293b; }
.ft-file.is-active { background: rgba(56, 189, 248, .14); color: #7dd3fc; }` },

    { name: 'Drag to reorder', desc: 'Grip handles and live reordering with native drag and drop (mouse).', bg: '#f5f5f4',
      html: `<ul class="dl">
  <li draggable="true"><span class="dl-h"></span>Write release notes<em>P1</em></li>
  <li draggable="true"><span class="dl-h"></span>Fix login redirect<em>P0</em></li>
  <li draggable="true"><span class="dl-h"></span>Update onboarding copy<em>P2</em></li>
  <li draggable="true"><span class="dl-h"></span>Archive old flags<em>P3</em></li>
</ul>`,
      css: `.dl { display: grid; gap: 8px; width: 100%; max-width: 300px; margin: 0; padding: 0; list-style: none; font: 14px Inter, system-ui, sans-serif; color: #1c1917; }
.dl li { display: flex; align-items: center; gap: 12px; padding: 11px 14px; border: 1px solid #e7e5e4; border-radius: 12px; background: #fff; box-shadow: 0 1px 2px rgba(0, 0, 0, .04); cursor: grab; transition: box-shadow .2s, opacity .2s, transform .2s; }
.dl li:hover { box-shadow: 0 10px 22px -14px rgba(0, 0, 0, .4); }
.dl li.is-drag { opacity: .35; transform: scale(.97); }
.dl-h { flex: none; width: 10px; height: 16px; background: radial-gradient(circle, #a8a29e 1.3px, transparent 1.6px) 0 0 / 5px 5px; }
.dl em { margin-left: auto; padding: 2px 7px; border-radius: 6px; background: #fff7ed; color: #c2410c; font: 600 11px 'JetBrains Mono', monospace; font-style: normal; }`,
      js: `var list = root.querySelector('.dl'), dragged = null;
list.addEventListener('dragstart', function (e) {
  dragged = e.target.closest('li');
  dragged.classList.add('is-drag');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', '');
});
list.addEventListener('dragend', function () { if (dragged) dragged.classList.remove('is-drag'); dragged = null; });
list.addEventListener('dragover', function (e) {
  e.preventDefault();
  var li = e.target.closest('li');
  if (!dragged || !li || li === dragged) return;
  var r = li.getBoundingClientRect();
  list.insertBefore(dragged, e.clientY > r.top + r.height / 2 ? li.nextSibling : li);
});` },

    { name: 'Playlist', desc: 'Track numbers turn into a play button on hover; the playing track shows live bars. Click a row.', bg: '#ede9fe',
      html: `<ol class="pl">
  <li class="is-playing"><span class="pl-n">1</span><div><b>Night Drive</b><small>Low Tide</small></div><time>3:42</time></li>
  <li><span class="pl-n">2</span><div><b>Paper Planes</b><small>Mira Vale</small></div><time>4:05</time></li>
  <li><span class="pl-n">3</span><div><b>Glasshouse</b><small>The Northerlies</small></div><time>2:58</time></li>
  <li><span class="pl-n">4</span><div><b>Slow Orbit</b><small>Kite Fields</small></div><time>5:11</time></li>
</ol>`,
      css: `.pl { width: 100%; max-width: 320px; margin: 0; padding: 8px; list-style: none; border-radius: 18px; background: linear-gradient(160deg, #2a1660, #0d0824); box-shadow: 0 20px 36px -20px rgba(46, 16, 101, .8); font: 13px Inter, system-ui, sans-serif; color: #c4b5fd; }
.pl li { display: grid; grid-template-columns: 24px 1fr auto; align-items: center; gap: 12px; padding: 9px 10px; border-radius: 10px; cursor: pointer; transition: background .2s; }
.pl li:hover { background: rgba(255, 255, 255, .07); }
.pl b { display: block; color: #fff; font-weight: 600; }
.pl small { color: #a78bfa; }
.pl time { color: #a78bfa; font: 12px 'JetBrains Mono', monospace; }
.pl-n { position: relative; display: grid; place-items: center; height: 18px; font: 12px 'JetBrains Mono', monospace; }
.pl li:hover .pl-n { color: transparent; }
.pl li:hover .pl-n::after { content: ''; position: absolute; border-style: solid; border-width: 6px 0 6px 10px; border-color: transparent transparent transparent #fff; }
.pl li.is-playing b { color: #f0abfc; }
.pl li.is-playing .pl-n {
  color: transparent;
  background:
    linear-gradient(#f0abfc, #f0abfc) 4px 100% / 3px 40% no-repeat,
    linear-gradient(#f0abfc, #f0abfc) 10px 100% / 3px 85% no-repeat,
    linear-gradient(#f0abfc, #f0abfc) 16px 100% / 3px 60% no-repeat;
  animation: pl-eq .8s ease-in-out infinite alternate;
}
.pl li.is-playing .pl-n::after { display: none; }
@keyframes pl-eq { to { background-size: 3px 95%, 3px 30%, 3px 75%; } }`,
      js: `root.querySelectorAll('.pl li').forEach(function (li) {
  li.addEventListener('click', function () {
    root.querySelectorAll('.pl li').forEach(function (x) { x.classList.remove('is-playing'); });
    li.classList.add('is-playing');
  });
});` },

    { name: 'Filter chips', desc: 'Checkbox list styled as chips with counts; selected chips invert and gain a tick.', bg: '#f8fafc',
      html: `<ul class="ch">
  <li><label><input type="checkbox" checked><span>Design <em>24</em></span></label></li>
  <li><label><input type="checkbox"><span>Frontend <em>41</em></span></label></li>
  <li><label><input type="checkbox" checked><span>Research <em>9</em></span></label></li>
  <li><label><input type="checkbox"><span>Backend <em>33</em></span></label></li>
  <li><label><input type="checkbox"><span>DevOps <em>12</em></span></label></li>
  <li><label><input type="checkbox"><span>Writing <em>6</em></span></label></li>
</ul>`,
      css: `.ch { display: flex; flex-wrap: wrap; gap: 8px; max-width: 330px; margin: 0; padding: 0; list-style: none; font: 13px Inter, system-ui, sans-serif; }
.ch label { position: relative; }
.ch input { position: absolute; opacity: 0; pointer-events: none; }
.ch span {
  display: inline-flex; align-items: center; gap: 8px; padding: 7px 8px 7px 14px; border: 1.5px solid #e2e8f0; border-radius: 999px;
  background: #fff; color: #334155; font-weight: 500; cursor: pointer; transition: background .2s, color .2s, border-color .2s, transform .2s, padding .2s;
}
.ch span:hover { border-color: #94a3b8; transform: translateY(-1px); }
.ch em { padding: 2px 7px; border-radius: 999px; background: #f1f5f9; color: #64748b; font: 600 11px 'JetBrains Mono', monospace; font-style: normal; transition: background .2s, color .2s; }
.ch input:checked + span { padding-left: 10px; border-color: #0f172a; background: #0f172a; color: #fff; }
.ch input:checked + span::before { content: ''; width: 13px; height: 13px; background: ${CHECK_SVG} center / contain no-repeat; }
.ch input:checked + span em { background: rgba(255, 255, 255, .16); color: #fff; }
.ch input:focus-visible + span { outline: 2px solid #6366f1; outline-offset: 2px; }` }
  ] }
];
if (typeof module !== 'undefined') module.exports = UI;
