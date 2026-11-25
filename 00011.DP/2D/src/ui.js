// UI components page: renders every design from UI (ui-components.js) as a live demo + its code.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // All demo CSS goes into one <style>. Class names are unique per design, so nothing clashes.
  const style = document.createElement('style');
  style.textContent = UI.flatMap(g => g.items.map(d => d.css)).filter((c, i, a) => a.indexOf(c) === i).join('\n\n');
  document.head.appendChild(style);

  // Tiny highlighter: comments, strings, numbers with units, HTML tags.
  const hl = (code, lang) => {
    let h = esc(code);
    if (lang === 'html') return h.replace(/(&lt;\/?)([a-z0-9-]+)|([a-z-]+)=("[^"]*")/g, (m, lt, tag, attr, val) =>
      lt ? lt + '<span class="k">' + tag + '</span>' : '<span class="f">' + attr + '</span>=<span class="s">' + val + '</span>');
    if (lang === 'css') return h.replace(/(\/\*.*?\*\/)/g, '<span class="c">$1</span>').replace(/^([^{}\n]+)(\{)/gm, '<span class="f">$1</span>$2').replace(/([a-z-]+)(:\s)/g, '<span class="k">$1</span>$2').replace(/(#[0-9a-fA-F]{3,8})\b/g, '<span class="n">$1</span>');
    return h.replace(/(\/\/.*$)/gm, '<span class="c">$1</span>').replace(/'([^']*)'/g, '<span class="s">\'$1\'</span>').replace(/\b(var|function|return|if|new)\b/g, '<span class="k">$1</span>');
  };

  const nav = $('#ui-nav'), host = $('#ui-groups');
  nav.innerHTML = UI.map(g => `<a href="#${g.id}">${esc(g.name)}<span>${g.items.length}</span></a>`).join('');

  let n = 0;
  host.innerHTML = UI.map(g => `
    <section class="ui-group" id="${g.id}">
      <div class="ui-group__head"><h2>${esc(g.name)}</h2><span>${g.items.length} designs</span></div>
      <div class="ui-grid">${g.items.map((d, k) => {
        n++;
        const tabs = [['HTML', d.html, 'html'], ['CSS', d.css, 'css']].concat(d.js ? [['JS', d.js, 'js']] : []);
        return `<article class="ui-card" data-g="${g.id}" data-k="${k}">
          <div class="ui-stage" style="background:${esc(d.bg)}">${d.html}</div>
          <div class="ui-meta">
            <span class="ui-num">${String(n).padStart(2, '0')}</span>
            <div><h3>${esc(d.name)}</h3><p>${esc(d.desc)}</p></div>
            <button class="ui-code-btn" type="button" aria-expanded="false">Code</button>
          </div>
          <div class="ui-code code" hidden>
            <div class="tabs" role="tablist">${tabs.map((t, i) => `<button class="tab" type="button" role="tab" aria-selected="${i === 0}" data-i="${i}">${t[0]}</button>`).join('')}<button class="copy" type="button">Copy</button></div>
            ${tabs.map((t, i) => `<pre data-i="${i}"${i ? ' hidden' : ''}>${hl(t[1], t[2])}</pre>`).join('')}
          </div>
        </article>`;
      }).join('')}</div>
    </section>`).join('');

  // Run each design's script against its own demo box only.
  document.querySelectorAll('.ui-card').forEach(card => {
    const d = UI.find(g => g.id === card.dataset.g).items[+card.dataset.k];
    if (d.js) { try { new Function('root', d.js)($('.ui-stage', card)); } catch (e) { console.error(d.name, e); } }
  });

  host.addEventListener('click', (e) => {
    const card = e.target.closest('.ui-card'); if (!card) return;
    const btn = e.target.closest('.ui-code-btn');
    if (btn) {
      const panel = $('.ui-code', card), open = panel.hidden;
      panel.hidden = !open; card.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); btn.textContent = open ? 'Hide code' : 'Code';
    }
    const tab = e.target.closest('.tab');
    if (tab) {
      card.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', String(t === tab)));
      card.querySelectorAll('.ui-code pre').forEach(p => (p.hidden = p.dataset.i !== tab.dataset.i));
    }
    const copy = e.target.closest('.copy');
    if (copy) {
      const text = card.querySelector('.ui-code pre:not([hidden])').textContent;
      const done = () => { copy.textContent = 'Copied'; setTimeout(() => (copy.textContent = 'Copy'), 1200); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done); else done();
    }
  });

  // Highlight the group in view.
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((ents) => ents.forEach(en => {
      if (!en.isIntersecting) return;
      nav.querySelectorAll('a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
    }), { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('.ui-group').forEach(s => io.observe(s));
  }
})();
