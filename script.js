// OS tabs
const osTabs = document.querySelectorAll('.os-tab');
const osPanels = document.querySelectorAll('.os-panel');
osTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const os = tab.dataset.os;
    osTabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active);
    });
    osPanels.forEach((p) => p.classList.toggle('is-active', p.dataset.os === os));
  });
});

// Auto-detect visitor OS on load
(() => {
  const ua = navigator.userAgent;
  let os = null;
  if (/iPhone|iPad|iPod/.test(ua)) os = 'ios';
  else if (/Android/.test(ua)) os = 'android';
  else if (/Mac/.test(ua)) os = 'macos';
  else if (/Windows/.test(ua)) os = 'windows';
  else if (/Linux/.test(ua)) os = 'linux';
  if (os) document.querySelector(`.os-tab[data-os="${os}"]`)?.click();
})();

// Mobile menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
burger?.addEventListener('click', () => nav.classList.toggle('is-open'));
nav?.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => nav.classList.remove('is-open'))
);

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll('.card, .step, .faq__item, .cta, .section__head')
  .forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });

// Subtle parallax on hero title
const title = document.querySelector('.hero__title');
if (title && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    title.style.transform = `translate(${x}px, ${y}px)`;
  });
}
