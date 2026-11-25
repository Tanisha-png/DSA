// UI component gallery. Each design is self-contained: html + css (+ js, run with `root` = its demo box).
// The page shows the live demo and this exact source, so what you see is what you copy.
// `bg` is the demo backdrop, so every design looks the same in light and dark theme.
const UI = [
  // =================================================================== BUTTONS
  { id: 'buttons', name: 'Buttons', items: [
    { name: 'Aurora border', desc: 'Rotating conic-gradient border with a soft glow that brightens on hover.', bg: '#0b0d17',
      html: `<button class="aur-btn">Get started</button>`,
      css: `@property --aur-a { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
.aur-btn {
  position: relative; padding: 14px 30px; border-radius: 14px; border: 2px solid transparent;
  font: 600 15px Inter, system-ui, sans-serif; color: #fff; cursor: pointer;
  background:
    linear-gradient(#10121f, #10121f) padding-box,
    conic-gradient(from var(--aur-a), #7c5cff, #22d3ee, #34d399, #f472b6, #7c5cff) border-box;
  animation: aur-spin 4s linear infinite;
}
.aur-btn::after {
  content: ''; position: absolute; inset: -2px; z-index: -1; border-radius: inherit;
  background: conic-gradient(from var(--aur-a), #7c5cff, #22d3ee, #34d399, #f472b6, #7c5cff);
  filter: blur(16px); opacity: .45; transition: opacity .3s;
}
.aur-btn:hover::after { opacity: .95; }
@keyframes aur-spin { to { --aur-a: 360deg; } }` },

    { name: 'Keycap', desc: 'A 3D key that lifts on hover and springs down when pressed.', bg: '#fff1f1',
      html: `<button class="key-btn"><span class="key-btn__top">Press me</span></button>`,
      css: `.key-btn {
  border: 0; padding: 0; border-radius: 14px; cursor: pointer;
  background: #b3262b;                       /* the side of the key */
  box-shadow: 0 12px 20px -10px rgba(179, 38, 43, .7);
}
.key-btn__top {
  display: block; padding: 14px 32px; border-radius: 14px;
  background: linear-gradient(180deg, #ff7a7e, #ff4b51);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .4);
  color: #fff; font: 700 15px Inter, system-ui, sans-serif;
  transform: translateY(-7px);
  transition: transform .3s cubic-bezier(.3, .7, .4, 1.5);
}
.key-btn:hover .key-btn__top { transform: translateY(-10px); }
.key-btn:active .key-btn__top { transform: translateY(-2px); transition-duration: 40ms; }` },

    { name: 'Ink sweep', desc: 'Fill sweeps in from the left and exits to the right; the arrow nudges forward.', bg: '#f5e663',
      html: `<button class="sweep-btn">Explore <span class="sweep-btn__arrow">&rarr;</span></button>`,
      css: `.sweep-btn {
  position: relative; isolation: isolate; overflow: hidden;
  padding: 14px 28px; border: 2px solid #111; border-radius: 999px; background: transparent;
  color: #111; font: 600 15px Inter, system-ui, sans-serif; cursor: pointer; transition: color .45s;
}
.sweep-btn::before {
  content: ''; position: absolute; inset: 0; z-index: -1; background: #111;
  transform: scaleX(0); transform-origin: right;
  transition: transform .45s cubic-bezier(.7, 0, .2, 1);
}
.sweep-btn:hover { color: #f5e663; }
.sweep-btn:hover::before { transform: scaleX(1); transform-origin: left; }
.sweep-btn__arrow { display: inline-block; transition: transform .45s; }
.sweep-btn:hover .sweep-btn__arrow { transform: translateX(6px); }` },

    { name: 'Magnetic ripple', desc: 'Leans toward the pointer and sends a ripple from the exact click point.', bg: '#fdf4ff',
      html: `<button class="mag-btn">Hover &amp; click</button>`,
      css: `.mag-btn {
  position: relative; overflow: hidden; padding: 16px 34px; border: 0; border-radius: 16px;
  background: linear-gradient(135deg, #6d28d9, #db2777); color: #fff;
  font: 600 15px Inter, system-ui, sans-serif; cursor: pointer;
  box-shadow: 0 12px 30px -12px rgba(219, 39, 119, .8);
  transition: transform .2s ease-out;
}
.mag-btn__ripple {
  position: absolute; border-radius: 50%; pointer-events: none;
  background: rgba(255, 255, 255, .55); transform: scale(0);
  animation: mag-ripple .65s ease-out forwards;
}
@keyframes mag-ripple { to { transform: scale(4); opacity: 0; } }`,
      js: `root.querySelectorAll('.mag-btn').forEach(function (b) {
  b.addEventListener('mousemove', function (e) {
    var r = b.getBoundingClientRect();
    var x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
    b.style.transform = 'translate(' + x * 0.25 + 'px,' + y * 0.35 + 'px)';
  });
  b.addEventListener('mouseleave', function () { b.style.transform = ''; });
  b.addEventListener('click', function (e) {
    var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height);
    var s = document.createElement('span');
    s.className = 'mag-btn__ripple';
    s.style.width = s.style.height = d + 'px';
    s.style.left = e.clientX - r.left - d / 2 + 'px';
    s.style.top = e.clientY - r.top - d / 2 + 'px';
    b.appendChild(s);
    s.addEventListener('animationend', function () { s.remove(); });
  });
});` },

    { name: 'Glass shine', desc: 'Frosted glass with a light streak that glides across on hover.', bg: 'linear-gradient(135deg, #0f766e, #1e3a8a)',
      html: `<button class="shine-btn">Upgrade to Pro</button>`,
      css: `.shine-btn {
  position: relative; overflow: hidden; padding: 14px 30px; border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, .35); background: rgba(255, 255, 255, .12);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  color: #fff; font: 600 15px Inter, system-ui, sans-serif; cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .45), 0 10px 26px -10px rgba(0, 0, 0, .5);
  transition: background .3s;
}
.shine-btn::before {
  content: ''; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, .6), transparent);
  transform: skewX(-20deg); transition: left .75s ease;
}
.shine-btn:hover { background: rgba(255, 255, 255, .2); }
.shine-btn:hover::before { left: 130%; }` }
  ] },

  // =================================================================== LINKS
  { id: 'links', name: 'Links', items: [
    { name: 'Draw & retract', desc: 'Underline draws in from the left, then leaves to the right.', bg: '#ffffff',
      html: `<a class="ul-link" href="#">Read the full story</a>`,
      css: `.ul-link {
  padding-bottom: 4px; color: #1d1d1f; font: 600 19px Inter, system-ui, sans-serif; text-decoration: none;
  background: linear-gradient(currentColor, currentColor) 100% 100% / 0 2px no-repeat;
  transition: background-size .45s cubic-bezier(.7, 0, .2, 1);
}
.ul-link:hover { background-position: 0 100%; background-size: 100% 2px; }` },

    { name: 'Highlighter', desc: 'A marker stroke that grows from underline to full highlight.', bg: '#fffdf5',
      html: `<p class="hl-text">Good docs explain <a class="hl-link" href="#">why, not just how</a>, and keep examples short.</p>`,
      css: `.hl-text { max-width: 300px; margin: 0; color: #3f3f46; font: 16px/1.7 Inter, system-ui, sans-serif; }
.hl-link {
  padding: 0 .15em; border-radius: .2em; color: inherit; font-weight: 600; text-decoration: none;
  background: linear-gradient(104deg, rgba(255, 210, 0, 0) .9%, rgba(255, 210, 0, .9) 2.4%,
              rgba(255, 224, 80, .6) 6%, rgba(255, 210, 0, .35) 93%, rgba(255, 210, 0, 0) 96%)
              no-repeat 0 88% / 100% .32em;
  transition: background-size .3s ease;
}
.hl-link:hover { background-size: 100% 90%; }` },

    { name: 'Orbit arrow', desc: 'The arrow turns and slides inside a circle that fills on hover.', bg: '#eef2f7',
      html: `<a class="arw-link" href="#"><span>View case study</span><i class="arw-link__dot">&rarr;</i></a>`,
      css: `.arw-link { display: inline-flex; align-items: center; gap: 14px; color: #0b1220; text-decoration: none; font: 600 16px Inter, system-ui, sans-serif; }
.arw-link__dot {
  display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%;
  border: 1.5px solid #0b1220; font-style: normal;
  transition: background .3s, color .3s, transform .35s cubic-bezier(.3, .7, .4, 1.4);
}
.arw-link:hover .arw-link__dot { background: #0b1220; color: #fff; transform: translateX(6px) rotate(-45deg); }` },

    { name: 'Outline fill', desc: 'Outlined display text that fills with a gradient from left to right.', bg: '#ffffff',
      html: `<a class="fill-link" href="#" data-text="Discover more">Discover more</a>`,
      css: `.fill-link {
  position: relative; color: transparent; -webkit-text-stroke: 1px #18181b; text-decoration: none;
  font: 800 30px 'Space Grotesk', Inter, sans-serif; letter-spacing: -.01em; white-space: nowrap;
}
.fill-link::before {
  content: attr(data-text); position: absolute; inset: 0; width: 0; overflow: hidden;
  -webkit-text-stroke: 0; color: transparent;
  background: linear-gradient(90deg, #f97316, #ec4899, #8b5cf6);
  -webkit-background-clip: text; background-clip: text;
  transition: width .55s cubic-bezier(.7, 0, .2, 1);
}
.fill-link:hover::before { width: 100%; }` },

    { name: 'Terminal brackets', desc: 'Brackets slide in around the text with a soft neon glow.', bg: '#0b1220',
      html: `<a class="brk-link" href="#">documentation</a>`,
      css: `.brk-link {
  position: relative; padding: 0 16px; color: #38bdf8; text-decoration: none;
  font: 500 18px 'JetBrains Mono', ui-monospace, monospace; transition: color .3s, text-shadow .3s;
}
.brk-link::before, .brk-link::after { position: absolute; opacity: 0; transition: opacity .3s, transform .3s; }
.brk-link::before { content: '['; left: 0; transform: translateX(10px); }
.brk-link::after { content: ']'; right: 0; transform: translateX(-10px); }
.brk-link:hover { color: #a5f3fc; text-shadow: 0 0 12px rgba(56, 189, 248, .8); }
.brk-link:hover::before, .brk-link:hover::after { opacity: 1; transform: none; }` }
  ] },

  // =================================================================== LISTS
  { id: 'lists', name: 'Lists', items: [
    { name: 'Timeline', desc: 'Gradient rail with milestones; the current step pulses.', bg: '#ffffff',
      html: `<ol class="tl">
  <li><time>09:00</time><b>Kick-off</b><p>Agree goals and scope.</p></li>
  <li class="is-now"><time>11:30</time><b>Design review</b><p>Happening now.</p></li>
  <li><time>15:00</time><b>Ship</b><p>Release to 10% of users.</p></li>
</ol>`,
      css: `.tl { position: relative; margin: 0; padding: 0 0 0 30px; list-style: none; font: 14px Inter, system-ui, sans-serif; color: #1f2937; }
.tl::before { content: ''; position: absolute; left: 8px; top: 6px; bottom: 8px; width: 2px; border-radius: 2px; background: linear-gradient(#a78bfa, #22d3ee); }
.tl li { position: relative; padding-bottom: 16px; }
.tl li::before { content: ''; position: absolute; left: -27px; top: 3px; width: 10px; height: 10px; border-radius: 50%; background: #fff; border: 3px solid #a78bfa; }
.tl li.is-now::before { background: #22d3ee; border-color: #22d3ee; animation: tl-pulse 1.8s infinite; }
.tl time { font: 600 11px 'JetBrains Mono', monospace; letter-spacing: .05em; color: #8b5cf6; }
.tl b { display: block; font-size: 15px; }
.tl p { margin: 2px 0 0; color: #6b7280; }
@keyframes tl-pulse { 0% { box-shadow: 0 0 0 0 rgba(34, 211, 238, .6); } 100% { box-shadow: 0 0 0 10px rgba(34, 211, 238, 0); } }` },

    { name: 'Gradient steps', desc: 'Big gradient counters; each row slides right on hover.', bg: '#f4f1ec',
      html: `<ol class="steps">
  <li><b>Pick a plan</b><span>Free for small teams.</span></li>
  <li><b>Invite people</b><span>Share one link.</span></li>
  <li><b>Start building</b><span>Templates included.</span></li>
</ol>`,
      css: `.steps { counter-reset: s; display: grid; gap: 10px; width: 100%; max-width: 300px; margin: 0; padding: 0; list-style: none; font: 14px Inter, system-ui, sans-serif; }
.steps li {
  counter-increment: s; display: grid; grid-template-columns: 50px 1fr; column-gap: 12px; align-items: center;
  padding: 10px 16px 10px 12px; border-radius: 14px; background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .06), 0 10px 20px -14px rgba(0, 0, 0, .3);
  transition: transform .3s cubic-bezier(.3, .7, .4, 1.4);
}
.steps li::before {
  content: counter(s, decimal-leading-zero); grid-row: span 2;
  font: 800 28px 'Space Grotesk', sans-serif;
  background: linear-gradient(135deg, #f97316, #db2777); -webkit-background-clip: text; background-clip: text; color: transparent;
}
.steps li:hover { transform: translateX(8px); }
.steps b { color: #18181b; }
.steps span { color: #71717a; font-size: 13px; }` },

    { name: 'Task checklist', desc: 'Custom checkboxes that pop in, with a strike-through that draws across.', bg: '#111827',
      html: `<ul class="chk">
  <li><label><input type="checkbox" checked><span>Write the spec</span></label></li>
  <li><label><input type="checkbox"><span>Build the prototype</span></label></li>
  <li><label><input type="checkbox"><span>Test with five users</span></label></li>
</ul>`,
      css: `.chk { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; font: 15px Inter, system-ui, sans-serif; color: #e5e7eb; }
.chk label { display: flex; align-items: center; gap: 12px; cursor: pointer; }
.chk input {
  appearance: none; -webkit-appearance: none; display: grid; place-items: center; margin: 0;
  width: 22px; height: 22px; border-radius: 7px; border: 2px solid #4b5563; cursor: pointer;
  transition: background .2s, border-color .2s;
}
.chk input::after {
  content: ''; width: 6px; height: 11px; margin-top: -2px;
  border: solid #052e16; border-width: 0 2.5px 2.5px 0;
  transform: rotate(45deg) scale(0); transition: transform .25s cubic-bezier(.3, 1.6, .6, 1);
}
.chk input:checked { background: #34d399; border-color: #34d399; }
.chk input:checked::after { transform: rotate(45deg) scale(1); }
.chk span { position: relative; transition: color .3s; }
.chk span::after { content: ''; position: absolute; left: 0; top: 52%; width: 100%; height: 2px; background: #6b7280; transform: scaleX(0); transform-origin: left; transition: transform .35s; }
.chk input:checked + span { color: #6b7280; }
.chk input:checked + span::after { transform: scaleX(1); }` },

    { name: 'Leaderboard', desc: 'Medal ranks, inline progress bars and a lift on hover.', bg: '#0f172a',
      html: `<ul class="lb">
  <li style="--v: 92%"><span class="lb__rank">1</span><span>Aria</span><span class="lb__bar"></span><b>9.2k</b></li>
  <li style="--v: 74%"><span class="lb__rank">2</span><span>Kabir</span><span class="lb__bar"></span><b>7.4k</b></li>
  <li style="--v: 61%"><span class="lb__rank">3</span><span>Mei</span><span class="lb__bar"></span><b>6.1k</b></li>
  <li style="--v: 38%"><span class="lb__rank">4</span><span>Omar</span><span class="lb__bar"></span><b>3.8k</b></li>
</ul>`,
      css: `.lb { display: grid; gap: 8px; width: 100%; max-width: 330px; margin: 0; padding: 0; list-style: none; font: 14px Inter, system-ui, sans-serif; }
.lb li {
  display: grid; grid-template-columns: 26px 54px 1fr 40px; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: 12px; color: #e2e8f0;
  background: rgba(255, 255, 255, .04); border: 1px solid rgba(255, 255, 255, .07);
  transition: background .2s, transform .2s;
}
.lb li:hover { background: rgba(255, 255, 255, .09); transform: scale(1.03); }
.lb__rank { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 8px; background: #334155; font-weight: 700; font-size: 12px; }
.lb li:nth-child(1) .lb__rank { background: linear-gradient(135deg, #fde68a, #f59e0b); color: #422006; }
.lb li:nth-child(2) .lb__rank { background: linear-gradient(135deg, #f1f5f9, #94a3b8); color: #0f172a; }
.lb li:nth-child(3) .lb__rank { background: linear-gradient(135deg, #fed7aa, #c2410c); color: #431407; }
.lb__bar { position: relative; height: 6px; overflow: hidden; border-radius: 3px; background: rgba(255, 255, 255, .08); }
.lb__bar::after { content: ''; position: absolute; inset: 0 auto 0 0; width: var(--v); border-radius: inherit; background: linear-gradient(90deg, #6366f1, #22d3ee); }
.lb b { text-align: right; font: 600 12px 'JetBrains Mono', monospace; }` },

    { name: 'FAQ accordion', desc: 'Native details/summary with a plus that turns into a cross.', bg: '#faf8ff',
      html: `<div class="acc">
  <details open><summary>What is included?</summary><p>Every component, with its HTML and CSS.</p></details>
  <details><summary>Do I need JavaScript?</summary><p>Only for the pointer-tracking effects.</p></details>
  <details><summary>Can I change colours?</summary><p>Yes, every colour sits in one or two rules.</p></details>
</div>`,
      css: `.acc { width: 100%; max-width: 340px; font: 14px Inter, system-ui, sans-serif; }
.acc details { border-bottom: 1px solid #e9e4f8; }
.acc summary { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 13px 4px; list-style: none; cursor: pointer; font-weight: 600; color: #1e1b4b; }
.acc summary::-webkit-details-marker { display: none; }
.acc summary::after {
  content: ''; flex: none; width: 24px; height: 24px; border-radius: 50%;
  background:
    linear-gradient(#6d28d9, #6d28d9) center / 10px 2px no-repeat,
    linear-gradient(#6d28d9, #6d28d9) center / 2px 10px no-repeat, #ede9fe;
  transition: transform .3s cubic-bezier(.3, .7, .4, 1.4), background-color .3s;
}
.acc details[open] summary::after { transform: rotate(135deg); background-color: #ddd6fe; }
.acc p { margin: 0 4px 14px; color: #6b7280; animation: acc-in .35s ease; }
@keyframes acc-in { from { opacity: 0; transform: translateY(-6px); } }` }
  ] },

  // =================================================================== HOVER EFFECTS
  { id: 'hover', name: 'Hover effects', items: [
    { name: '3D tilt + glare', desc: 'Card tilts toward the pointer and a light glare follows it.', bg: '#e2e8f0',
      html: `<div class="tilt"><div class="tilt__glare"></div><span class="tilt__tag">PRO</span><b>Tilt card</b><p>Move the pointer over me.</p></div>`,
      css: `.tilt {
  position: relative; overflow: hidden; width: 230px; padding: 20px 22px; border-radius: 18px;
  background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid rgba(255, 255, 255, .08);
  color: #f8fafc; font: 14px Inter, system-ui, sans-serif;
  box-shadow: 0 24px 40px -20px rgba(15, 23, 42, .7);
  transform: perspective(700px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform .15s ease-out;
}
.tilt__glare {
  position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .3s;
  background: radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255, 255, 255, .28), transparent 55%);
}
.tilt:hover .tilt__glare { opacity: 1; }
.tilt__tag { padding: 3px 8px; border-radius: 6px; background: linear-gradient(90deg, #a78bfa, #22d3ee); color: #0f172a; font: 700 10px 'JetBrains Mono', monospace; letter-spacing: .1em; }
.tilt b { display: block; margin-top: 34px; font: 700 19px 'Space Grotesk', sans-serif; }
.tilt p { margin: 4px 0 0; color: #94a3b8; }`,
      js: `root.querySelectorAll('.tilt').forEach(function (c) {
  c.addEventListener('mousemove', function (e) {
    var r = c.getBoundingClientRect();
    var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    c.style.setProperty('--ry', (px - 0.5) * 20 + 'deg');
    c.style.setProperty('--rx', (0.5 - py) * 20 + 'deg');
    c.style.setProperty('--gx', px * 100 + '%');
    c.style.setProperty('--gy', py * 100 + '%');
  });
  c.addEventListener('mouseleave', function () {
    c.style.setProperty('--rx', '0deg');
    c.style.setProperty('--ry', '0deg');
  });
});` },

    { name: 'Spotlight grid', desc: 'One light follows the pointer across every tile, lighting borders it passes.', bg: '#030712',
      html: `<div class="spot">
  <div class="spot__cell">Fast</div><div class="spot__cell">Secure</div>
  <div class="spot__cell">Private</div><div class="spot__cell">Open</div>
</div>`,
      css: `.spot { display: grid; grid-template-columns: repeat(2, 124px); gap: 10px; }
.spot__cell {
  --x: -999px; --y: -999px;
  position: relative; display: grid; place-items: center; height: 72px; border-radius: 14px;
  background: #111827; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .06);
  color: #cbd5e1; font: 600 14px Inter, system-ui, sans-serif;
}
.spot__cell::before {                       /* the lit border */
  content: ''; position: absolute; inset: 0; padding: 1px; border-radius: inherit;
  background: radial-gradient(200px circle at var(--x) var(--y), #a78bfa, transparent 60%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
}
.spot__cell::after {                        /* the soft fill */
  content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: radial-gradient(160px circle at var(--x) var(--y), rgba(167, 139, 250, .14), transparent 60%);
}`,
      js: `var grid = root.querySelector('.spot'), cells = grid.querySelectorAll('.spot__cell');
grid.addEventListener('mousemove', function (e) {
  cells.forEach(function (c) {
    var r = c.getBoundingClientRect();
    c.style.setProperty('--x', e.clientX - r.left + 'px');
    c.style.setProperty('--y', e.clientY - r.top + 'px');
  });
});
grid.addEventListener('mouseleave', function () {
  cells.forEach(function (c) { c.style.setProperty('--x', '-999px'); c.style.setProperty('--y', '-999px'); });
});` },

    { name: 'Card flip', desc: 'Real 3D flip with a different face on the back.', bg: '#fff7ed',
      html: `<div class="flip">
  <div class="flip__inner">
    <div class="flip__face flip__front"><b>Hover me</b><small>front</small></div>
    <div class="flip__face flip__back"><b>Hello!</b><small>this is the back</small></div>
  </div>
</div>`,
      css: `.flip { width: 210px; height: 130px; perspective: 900px; font: 14px Inter, system-ui, sans-serif; }
.flip__inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform .75s cubic-bezier(.4, .2, .2, 1); }
.flip:hover .flip__inner { transform: rotateY(180deg); }
.flip__face { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; border-radius: 16px; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
.flip__face b { font: 700 20px 'Space Grotesk', sans-serif; }
.flip__front { background: linear-gradient(135deg, #fb7185, #f97316); color: #fff; box-shadow: 0 16px 30px -16px rgba(249, 115, 22, .8); }
.flip__back { background: #fff; color: #9a3412; border: 1px solid #fed7aa; transform: rotateY(180deg); }` },

    { name: 'Border trace', desc: 'The frame draws itself around the box, one side after another.', bg: '#020617',
      html: `<div class="trace"><b>Border trace</b><span>Hover to draw the frame</span></div>`,
      css: `.trace {
  position: relative; display: grid; gap: 4px; padding: 24px 28px;
  background: #0f172a; outline: 1px solid rgba(255, 255, 255, .06);
  color: #e2e8f0; font: 14px Inter, system-ui, sans-serif;
}
.trace b { font: 700 17px 'Space Grotesk', sans-serif; }
.trace span { color: #94a3b8; }
.trace::before, .trace::after { content: ''; position: absolute; width: 0; height: 0; box-sizing: border-box; border: 2px solid transparent; }
.trace::before { top: 0; left: 0; }
.trace::after { right: 0; bottom: 0; }
.trace:hover::before {
  width: 100%; height: 100%; border-top-color: #22d3ee; border-right-color: #22d3ee;
  transition: width .25s ease-out, height .25s ease-out .25s;
}
.trace:hover::after {
  width: 100%; height: 100%; border-bottom-color: #22d3ee; border-left-color: #22d3ee;
  transition: border-color 0s .5s, width .25s ease-out .5s, height .25s ease-out .75s;
}` },

    { name: 'Curtain reveal', desc: 'Two striped panels part like a stage curtain.', bg: '#f7fee7',
      html: `<div class="curtain"><span class="curtain__label">Hover me</span><b>Surprise</b><small>Content behind the curtain</small></div>`,
      css: `.curtain {
  position: relative; overflow: hidden; display: grid; place-content: center; text-align: center;
  width: 230px; height: 124px; border-radius: 16px; background: #ecfccb;
  color: #365314; font: 14px Inter, system-ui, sans-serif;
}
.curtain b { font: 700 20px 'Space Grotesk', sans-serif; }
.curtain::before, .curtain::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 50%; z-index: 1;
  background: repeating-linear-gradient(90deg, #4d7c0f 0 12px, #3f6212 12px 24px);
  transition: transform .65s cubic-bezier(.7, 0, .2, 1);
}
.curtain::before { left: 0; }
.curtain::after { right: 0; }
.curtain__label { position: absolute; inset: 0; z-index: 2; display: grid; place-items: center; color: #ecfccb; font-weight: 600; transition: opacity .2s; }
.curtain:hover::before { transform: translateX(-100%); }
.curtain:hover::after { transform: translateX(100%); }
.curtain:hover .curtain__label { opacity: 0; }` }
  ] },

  // =================================================================== BOXES
  { id: 'boxes', name: 'Boxes', items: [
    { name: 'Frosted glass', desc: 'Blurred glass card floating over colour.', bg: 'radial-gradient(circle at 22% 30%, #f472b6 0 17%, transparent 18%), radial-gradient(circle at 80% 72%, #22d3ee 0 20%, transparent 21%), radial-gradient(circle at 72% 22%, #facc15 0 9%, transparent 10%), linear-gradient(135deg, #4c1d95, #1e1b4b)',
      html: `<div class="glass"><span class="glass__chip">Balance</span><b>$12,480.20</b><small>+4.2% this week</small></div>`,
      css: `.glass {
  width: 240px; padding: 22px; border-radius: 20px; color: #fff; font: 14px Inter, system-ui, sans-serif;
  background: rgba(255, 255, 255, .14); border: 1px solid rgba(255, 255, 255, .35);
  -webkit-backdrop-filter: blur(16px) saturate(1.4); backdrop-filter: blur(16px) saturate(1.4);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .4), 0 24px 40px -20px rgba(0, 0, 0, .5);
}
.glass__chip { padding: 3px 9px; border-radius: 999px; background: rgba(255, 255, 255, .2); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }
.glass b { display: block; margin: 14px 0 4px; font: 700 26px 'Space Grotesk', sans-serif; }
.glass small { color: #bbf7d0; }` },

    { name: 'Gradient frame', desc: 'A thin gradient border without images, using two backgrounds.', bg: '#f8fafc',
      html: `<div class="gframe"><span class="gframe__eyebrow">New</span><b>Gradient frame</b><p>The border is a gradient painted under a white padding-box.</p></div>`,
      css: `.gframe {
  width: 260px; padding: 20px 22px; border-radius: 18px; border: 1.5px solid transparent;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(135deg, #6366f1, #ec4899, #f59e0b) border-box;
  box-shadow: 0 14px 30px -18px rgba(99, 102, 241, .7);
  color: #4b5563; font: 14px/1.55 Inter, system-ui, sans-serif;
}
.gframe__eyebrow { font: 700 11px Inter, sans-serif; letter-spacing: .12em; text-transform: uppercase; background: linear-gradient(90deg, #6366f1, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent; }
.gframe b { display: block; margin: 6px 0 4px; color: #111827; font: 700 18px 'Space Grotesk', sans-serif; }
.gframe p { margin: 0; }` },

    { name: 'Ticket', desc: 'Punched notches cut with masks and a dashed tear line.', bg: '#e0e7ff',
      html: `<div class="ticket">
  <div class="ticket__main"><small>Boarding pass</small><b>BOM &rarr; BLR</b><span>Gate 14 &middot; 06:40</span></div>
  <div class="ticket__stub"><b>21A</b><small>Seat</small></div>
</div>`,
      css: `.ticket { display: flex; width: 300px; font: 13px Inter, system-ui, sans-serif; filter: drop-shadow(0 12px 16px rgba(30, 27, 75, .2)); }
.ticket small { color: #6b7280; text-transform: uppercase; letter-spacing: .08em; font-size: 10.5px; }
.ticket b { display: block; font: 700 20px 'Space Grotesk', sans-serif; color: #1e1b4b; }
.ticket__main {
  flex: 1; padding: 18px 20px; border-radius: 14px 0 0 14px; background: #fff; border-right: 2px dashed #c7d2fe;
  -webkit-mask: radial-gradient(circle 10px at 100% 0, transparent 98%, #000) top / 100% 51% no-repeat,
                radial-gradient(circle 10px at 100% 100%, transparent 98%, #000) bottom / 100% 51% no-repeat;
          mask: radial-gradient(circle 10px at 100% 0, transparent 98%, #000) top / 100% 51% no-repeat,
                radial-gradient(circle 10px at 100% 100%, transparent 98%, #000) bottom / 100% 51% no-repeat;
}
.ticket__main span { color: #4b5563; }
.ticket__stub {
  display: grid; place-content: center; width: 86px; text-align: center; border-radius: 0 14px 14px 0; background: #fef3c7;
  -webkit-mask: radial-gradient(circle 10px at 0 0, transparent 98%, #000) top / 100% 51% no-repeat,
                radial-gradient(circle 10px at 0 100%, transparent 98%, #000) bottom / 100% 51% no-repeat;
          mask: radial-gradient(circle 10px at 0 0, transparent 98%, #000) top / 100% 51% no-repeat,
                radial-gradient(circle 10px at 0 100%, transparent 98%, #000) bottom / 100% 51% no-repeat;
}` },

    { name: 'Bento grid', desc: 'Mixed-size tiles in one grid; each tile pops on hover.', bg: '#fafaf9',
      html: `<div class="bento">
  <div class="bento__a"><small>Visitors</small><b>128k</b></div>
  <div class="bento__b"><b>4.9</b><small>Rating</small></div>
  <div class="bento__c"><b>+18%</b><small>Growth</small></div>
  <div class="bento__d"><small>Weekly goal</small><i><i style="width: 72%"></i></i></div>
</div>`,
      css: `.bento { display: grid; grid-template-columns: repeat(3, 86px); grid-auto-rows: 68px; gap: 8px; font: 12px Inter, system-ui, sans-serif; }
.bento > div { display: flex; flex-direction: column; justify-content: flex-end; padding: 10px 12px; border-radius: 16px; transition: transform .3s cubic-bezier(.3, .7, .4, 1.5); }
.bento > div:hover { transform: scale(1.05); }
.bento b { font: 800 22px/1.1 'Space Grotesk', sans-serif; }
.bento__a { grid-column: span 2; grid-row: span 2; background: linear-gradient(135deg, #111827, #374151); color: #fff; justify-content: space-between !important; }
.bento__a b { font-size: 36px; }
.bento__b { background: #fde047; color: #422006; }
.bento__c { background: #a5f3fc; color: #164e63; }
.bento__d { grid-column: span 3; flex-direction: row !important; align-items: center; gap: 12px; background: #e7e5e4; color: #292524; }
.bento__d > i { flex: 1; height: 8px; border-radius: 4px; background: #d6d3d1; overflow: hidden; }
.bento__d > i > i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #f97316, #ec4899); }` },

    { name: 'Paper stack', desc: 'Ruled note with sheets underneath that fan out on hover.', bg: '#57534e',
      html: `<div class="stack"><b>Meeting notes</b><p>Ship v2 search by Friday. Review copy with design. Book the demo room.</p></div>`,
      css: `.stack {
  position: relative; width: 240px; padding: 18px 20px; border-radius: 6px; color: #44403c;
  font: 14px/24px Inter, system-ui, sans-serif;
  background: #fffdf7 repeating-linear-gradient(transparent 0 23px, #e7e5e4 23px 24px) 0 18px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
}
.stack b { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 16px; color: #1c1917; }
.stack p { margin: 0; }
.stack::before, .stack::after {
  content: ''; position: absolute; inset: 0; z-index: -1; border-radius: 6px;
  background: #f5efe2; box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
  transition: transform .35s cubic-bezier(.3, .7, .4, 1.4);
}
.stack::before { transform: rotate(-4deg) translate(-4px, 4px); }
.stack::after { transform: rotate(3deg) translate(5px, 6px); background: #ede4d0; }
.stack:hover::before { transform: rotate(-9deg) translate(-14px, 6px); }
.stack:hover::after { transform: rotate(8deg) translate(16px, 10px); }` }
  ] },

  // =================================================================== SHADOWS
  { id: 'shadows', name: 'Shadows', items: [
    { name: 'Layered soft', desc: 'Six stacked shadows doubling in size: smooth, natural depth.', bg: '#eef2f6',
      html: `<div class="sh-soft">Layered</div>`,
      css: `.sh-soft {
  display: grid; place-items: center; width: 190px; height: 116px; border-radius: 18px;
  background: #fff; color: #334155; font: 600 15px Inter, system-ui, sans-serif;
  box-shadow:
    0 1px 1px rgba(15, 23, 42, .04), 0 2px 2px rgba(15, 23, 42, .04), 0 4px 4px rgba(15, 23, 42, .04),
    0 8px 8px rgba(15, 23, 42, .04), 0 16px 16px rgba(15, 23, 42, .04), 0 32px 32px rgba(15, 23, 42, .05);
  transition: transform .35s cubic-bezier(.3, .7, .4, 1.4);
}
.sh-soft:hover { transform: translateY(-6px); }` },

    { name: 'Colour glow', desc: 'The shadow is a blurred copy of the gradient itself.', bg: '#ffffff',
      html: `<div class="sh-glow">Glow</div>`,
      css: `.sh-glow {
  position: relative; display: grid; place-items: center; width: 190px; height: 116px; border-radius: 22px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899 55%, #f97316); color: #fff; font: 700 17px 'Space Grotesk', sans-serif;
}
.sh-glow::after {
  content: ''; position: absolute; inset: 14px 10px -12px; z-index: -1; border-radius: inherit;
  background: inherit; filter: blur(22px); opacity: .65; transition: opacity .35s, inset .35s;
}
.sh-glow:hover::after { opacity: 1; inset: 10px 4px -22px; }` },

    { name: 'Neumorphic', desc: 'Raised from the surface; hover presses it in.', bg: '#e0e5ec',
      html: `<div class="neu"><span>Press</span></div>`,
      css: `.neu {
  display: grid; place-items: center; width: 124px; height: 124px; border-radius: 32px;
  background: #e0e5ec; color: #6b7a90; font: 600 14px Inter, system-ui, sans-serif; letter-spacing: .04em;
  box-shadow: 10px 10px 20px #a3b1c6, -10px -10px 20px #ffffff;
  transition: box-shadow .35s, color .35s;
}
.neu:hover { color: #4f46e5; box-shadow: inset 7px 7px 14px #a3b1c6, inset -7px -7px 14px #ffffff; }` },

    { name: 'Hard offset', desc: 'Flat brutalist shadow that lifts on hover and flattens when clicked.', bg: '#f9a8d4',
      html: `<button class="sh-retro">Click me</button>`,
      css: `.sh-retro {
  padding: 16px 28px; border: 2.5px solid #111; border-radius: 12px; background: #fef08a;
  color: #111; font: 700 16px 'Space Grotesk', sans-serif; cursor: pointer;
  box-shadow: 6px 6px 0 #111;
  transition: transform .12s, box-shadow .12s;
}
.sh-retro:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 #111; }
.sh-retro:active { transform: translate(6px, 6px); box-shadow: 0 0 0 #111; }` },

    { name: 'Floating', desc: 'Object bobs up and down; the ground shadow shrinks and fades with it.', bg: '#e0f2fe',
      html: `<div class="float"><div class="float__obj">Float</div><div class="float__shadow"></div></div>`,
      css: `.float { display: grid; justify-items: center; gap: 18px; }
.float__obj {
  display: grid; place-items: center; width: 108px; height: 108px; border-radius: 30px;
  background: linear-gradient(145deg, #38bdf8, #6366f1); color: #fff; font: 700 15px Inter, system-ui, sans-serif;
  box-shadow: inset 0 2px 0 rgba(255, 255, 255, .35);
  animation: float-y 3s ease-in-out infinite;
}
.float__shadow { width: 88px; height: 14px; border-radius: 50%; background: rgba(15, 23, 42, .35); filter: blur(6px); animation: float-s 3s ease-in-out infinite; }
@keyframes float-y { 50% { transform: translateY(-16px); } }
@keyframes float-s { 50% { transform: scale(.7); opacity: .45; } }` }
  ] },

  // =================================================================== COLOURS
  { id: 'colors', name: 'Colours', items: [] }
];

// Five palettes share one swatch component: hover a colour to open it, click to copy its hex.
(() => {
  const css = `.pal { display: flex; width: 310px; height: 132px; overflow: hidden; border-radius: 18px; box-shadow: 0 16px 30px -18px rgba(0, 0, 0, .6); }
.pal__sw {
  flex: 1; min-width: 0; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-start;
  margin: 0; padding: 10px 12px; border: 0; background: var(--c); color: var(--t, #fff); cursor: pointer; text-align: left;
  font: 600 12px Inter, system-ui, sans-serif; transition: flex .45s cubic-bezier(.7, 0, .2, 1);
}
.pal__sw span, .pal__sw code { opacity: 0; white-space: nowrap; transition: opacity .2s; }
.pal__sw code { font: 500 11px 'JetBrains Mono', monospace; }
.pal__sw:hover, .pal__sw:focus-visible { flex: 3.2; outline: none; }
.pal__sw:hover span, .pal__sw:hover code, .pal__sw:focus-visible span, .pal__sw:focus-visible code { opacity: 1; transition-delay: .15s; }`;
  const js = `root.querySelectorAll('.pal__sw').forEach(function (s) {
  s.addEventListener('click', function () {
    var code = s.querySelector('code'), hex = code.textContent;
    if (hex === 'Copied') return;
    if (navigator.clipboard) navigator.clipboard.writeText(hex).catch(function () {});
    code.textContent = 'Copied';
    setTimeout(function () { code.textContent = hex; }, 900);
  });
});`;
  const P = [
    ['Midnight aurora', 'Calm dark UI with a cool accent.', '#f1f5f9', [['Ink', '#0B132B'], ['Deep', '#1C2541'], ['Steel', '#3A506B'], ['Teal', '#5BC0BE', 1], ['Mint', '#B8F2E6', 1]]],
    ['Desert clay', 'Warm, earthy, good for editorial pages.', '#faf6f0', [['Umber', '#3D2C2E'], ['Brick', '#8C4A3B'], ['Terracotta', '#D9825B'], ['Sand', '#F2C094', 1], ['Linen', '#F7EBDD', 1]]],
    ['Glacier', 'Quiet blues and greys for dashboards.', '#e9eef4', [['Slate', '#1F2A37'], ['Fjord', '#4B5B70'], ['Ice', '#8FB8CC', 1], ['Frost', '#D5DEE8', 1], ['Snow', '#F3F6F9', 1]]],
    ['Neon arcade', 'High-energy contrast for games and launches.', '#f3effc', [['Void', '#0D0221'], ['Violet', '#2A1B5C'], ['Hot pink', '#FF3864'], ['Cyan', '#2DE2E6', 1], ['Volt', '#FFD319', 1]]],
    ['Forest moss', 'Soft greens that read as natural and calm.', '#eef2e3', [['Pine', '#1B2A1F'], ['Moss', '#34503A'], ['Sage', '#6B8F5E'], ['Lichen', '#B5C99A', 1], ['Mist', '#EEF2E3', 1]]]
  ];
  const colors = UI.find(g => g.id === 'colors');
  for (const [name, desc, bg, sw] of P) {
    colors.items.push({
      name, desc: desc + ' Hover a colour, click to copy.', bg, css, js,
      html: '<div class="pal">\n' + sw.map(([n, hex, dark]) => `  <button class="pal__sw" style="--c: ${hex}${dark ? '; --t: #111' : ''}"><span>${n}</span><code>${hex}</code></button>`).join('\n') + '\n</div>'
    });
  }
})();
if (typeof module !== 'undefined') module.exports = UI;
