// Shared by every page: saved theme + theme button.
(() => {
  const root = document.documentElement;
  const bar = document.querySelector('.topbar');
  const setTop = () => root.style.setProperty('--top-h', (bar ? bar.offsetHeight : 0) + 'px');
  setTop();
  if (bar && 'ResizeObserver' in window) new ResizeObserver(setTop).observe(bar);
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem('dp2d:theme')); } catch (e) { /* storage blocked */ }
  if (saved) root.setAttribute('data-theme', saved);
  document.querySelectorAll('.theme-btn').forEach(b => b.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme');
    const dark = cur ? cur === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    const next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('dp2d:theme', JSON.stringify(next)); } catch (e) { /* storage blocked */ }
    dispatchEvent(new Event('themechange'));
  }));
})();
