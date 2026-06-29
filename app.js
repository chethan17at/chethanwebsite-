'use strict';

/* ─── LOADER ──────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.classList.remove('loading');
  }, 2000);
});

/* ─── CUSTOM CURSOR ───────────────────────────────────────── */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animFollower);
})();

// enlarge cursor on interactive elements
document.querySelectorAll('a, button, .char-thumb, .world-item, .season-card, .house-panel').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform   = 'translate(-50%,-50%) scale(2)';
    follower.style.transform = 'translate(-50%,-50%) scale(1.6)';
    follower.style.borderColor = 'rgba(201,168,76,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform   = 'translate(-50%,-50%) scale(1)';
    follower.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.borderColor = 'rgba(201,168,76,0.5)';
  });
});

/* ─── NAVBAR ──────────────────────────────────────────────── */
const header    = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const nav       = document.getElementById('nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('solid', window.scrollY > 80);
}, { passive: true });

navToggle.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('.nav-link').forEach(l =>
  l.addEventListener('click', () => nav.classList.remove('open'))
);

/* ─── HERO SLIDESHOW ──────────────────────────────────────── */
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.slide-dot');
let current  = 0;
let slideInterval;

function goToSlide(idx) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (idx + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startSlideshow() {
  slideInterval = setInterval(() => goToSlide(current + 1), 5000);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(slideInterval);
    goToSlide(parseInt(dot.dataset.index));
    startSlideshow();
  });
});

startSlideshow();

/* ─── PARALLAX — STORY IMAGE ──────────────────────────────── */
const storyParallax = document.getElementById('storyParallax');
if (storyParallax) {
  const img = storyParallax.querySelector('img');
  window.addEventListener('scroll', () => {
    const rect   = storyParallax.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    img.style.transform = `translateY(${center * 0.15}px)`;
  }, { passive: true });
}

/* ─── SCROLL REVEAL ───────────────────────────────────────── */
const fadeEls = document.querySelectorAll('.fade-up');

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${(i % 5) * 100}ms`;
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => revealObs.observe(el));

// also reveal house panels, char cards, world items
const revealItems = document.querySelectorAll(
  '.house-panel-content, .char-thumb, .char-feature, .season-card, .world-item, .story-text'
);

revealItems.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
});

const itemObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'none';
      }, (i % 6) * 100);
      itemObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealItems.forEach(el => itemObs.observe(el));

/* ─── SEASONS SLIDER ──────────────────────────────────────── */
const track = document.getElementById('seasonsTrack');
const sPrev = document.getElementById('sPrev');
const sNext = document.getElementById('sNext');

if (track && sPrev && sNext) {
  const cardWidth = () => track.querySelector('.season-card').offsetWidth + 2;

  sNext.addEventListener('click', () => {
    track.scrollBy({ left: cardWidth() * 2, behavior: 'smooth' });
  });

  sPrev.addEventListener('click', () => {
    track.scrollBy({ left: -cardWidth() * 2, behavior: 'smooth' });
  });
}

/* ─── SMOOTH ANCHOR SCROLL ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─── HOUSE PANEL SUBTLE MOUSE PARALLAX ──────────────────── */
document.querySelectorAll('.house-panel').forEach(panel => {
  const bg = panel.querySelector('.house-panel-bg');
  panel.addEventListener('mousemove', e => {
    const rect = panel.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
    bg.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
  });
  panel.addEventListener('mouseleave', () => {
    bg.style.transform = 'scale(1.03)';
  });
});
