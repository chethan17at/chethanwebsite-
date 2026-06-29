// ===== PARTICLE SYSTEM (Fireflies + Snow) =====
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 80;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }

  reset() {
    this.x    = Math.random() * canvas.width;
    this.y    = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4 - 0.1;
    this.opacity = Math.random() * 0.6 + 0.1;
    this.pulse   = Math.random() * Math.PI * 2;
    // Gold fireflies or ice-blue snow
    this.color = Math.random() > 0.4
      ? `rgba(201,168,76,`
      : `rgba(168,212,230,`;
  }

  update() {
    this.x    += this.speedX;
    this.y    += this.speedY;
    this.pulse += 0.02;
    this.opacity = (Math.sin(this.pulse) * 0.3 + 0.4);

    if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
      this.reset();
      this.y = canvas.height + 10;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `${this.color}${this.opacity})`;
    ctx.shadowBlur  = 8;
    ctx.shadowColor = `${this.color}0.8)`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE NAV =====
function toggleNav() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  '.house-card, .map-region, .char-card, .gallery-item, .section-title, .section-sub, blockquote'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ===== 3D TILT on house cards =====
document.querySelectorAll('.char-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) *  8;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== QUOTE TYPEWRITER =====
const quoteEl = document.querySelector('blockquote p');
if (quoteEl) {
  const text = quoteEl.textContent;
  quoteEl.textContent = '';
  let i = 0;

  const typeObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const interval = setInterval(() => {
        quoteEl.textContent += text[i++];
        if (i >= text.length) clearInterval(interval);
      }, 40);
      typeObs.disconnect();
    }
  }, { threshold: 0.5 });

  typeObs.observe(quoteEl);
}

// ===== DRAGON CLICK EASTER EGG =====
document.querySelector('.hero-dragon').addEventListener('click', () => {
  const roars = ['🔥 DRACARYS! 🔥', '🐉 ROAAAARRR! 🐉', '⚔️ THE IRON THRONE IS MINE! ⚔️'];
  const msg = roars[Math.floor(Math.random() * roars.length)];
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = `
    position:fixed; top:20px; left:50%; transform:translateX(-50%);
    background:rgba(139,26,26,0.95); color:#f0d080; padding:1rem 2rem;
    border-radius:8px; border:1px solid #c9a84c; font-family:Cinzel,serif;
    font-size:1rem; letter-spacing:2px; z-index:9999;
    box-shadow:0 0 30px rgba(201,168,76,0.5);
    animation: toastIn 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
});
