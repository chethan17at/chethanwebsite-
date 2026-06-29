// ── NAVBAR: become solid on scroll ──────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('solid', window.scrollY > 60);
}, { passive: true });

// ── MOBILE NAV TOGGLE ────────────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const nav    = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

// ── SCROLL REVEAL ────────────────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.about-grid, .house-item, .char-card, .season-row, .gallery-item, .quote-banner blockquote, .hero-content > *'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = `${(i % 6) * 80}ms`;
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => io.observe(el));

// ── SMOOTH ANCHOR LINKS ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    nav.classList.remove('open');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── MEMBER TOOLTIP ON HOVER ──────────────────────────────────
document.querySelectorAll('.house-members img').forEach(img => {
  const tip = document.createElement('div');
  tip.className = 'tooltip';
  tip.textContent = img.getAttribute('title') || '';
  tip.style.cssText = `
    position:absolute; bottom:calc(100% + 8px); left:50%;
    transform:translateX(-50%); white-space:nowrap;
    background:rgba(8,10,12,0.95); color:#e8c96a;
    font-family:'Cinzel',serif; font-size:0.6rem;
    letter-spacing:2px; padding:6px 12px;
    border:1px solid rgba(201,168,76,0.3);
    pointer-events:none; opacity:0; transition:opacity 0.2s;
    z-index:100;
  `;
  img.style.position = 'relative';
  const wrap = document.createElement('span');
  wrap.style.cssText = 'position:relative; display:inline-block;';
  img.parentNode.insertBefore(wrap, img);
  wrap.appendChild(img);
  wrap.appendChild(tip);
  wrap.addEventListener('mouseenter', () => tip.style.opacity = '1');
  wrap.addEventListener('mouseleave', () => tip.style.opacity = '0');
});
