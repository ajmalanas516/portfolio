/**
 * ============================================================
 *  Personal Portfolio – Main Script
 *  Vanilla ES6+ · No dependencies
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------
   *  1. NAVBAR SCROLL EFFECT
   * ------------------------------------------------------ */
  const initNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const SCROLL_THRESHOLD = 50;
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  /* --------------------------------------------------------
   *  2. MOBILE MENU TOGGLE
   *  JS uses .nav-active; CSS must match (fixed in style.css)
   * ------------------------------------------------------ */
  const initMobileMenu = () => {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav-active');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  };

  /* --------------------------------------------------------
   *  3. SMOOTH SCROLL
   * ------------------------------------------------------ */
  const initSmoothScroll = () => {
    const NAVBAR_OFFSET = 80;
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      });
    });
  };

  /* --------------------------------------------------------
   *  4. ACTIVE NAV LINK HIGHLIGHTING
   * ------------------------------------------------------ */
  const initActiveNavHighlight = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');
    if (!sections.length || !navLinksAll.length) return;

    const setActiveLink = (id) => {
      navLinksAll.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { root: null, rootMargin: '0px', threshold: 0.3 });

    sections.forEach((section) => observer.observe(section));
  };

  /* --------------------------------------------------------
   *  5. FADE-UP SCROLL ANIMATIONS
   * ------------------------------------------------------ */
  const initFadeUpAnimations = () => {
    const fadeElements = document.querySelectorAll('.fade-up');
    if (!fadeElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.transitionDelay = `${el.dataset.delay || '0'}ms`;
          el.classList.add('visible');
          obs.unobserve(el);
        }
      });
    }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.15 });

    fadeElements.forEach((el) => observer.observe(el));
  };

  /* --------------------------------------------------------
   *  6. HERO AVATAR PARALLAX  (BUG FIX: added mousemove)
   * ------------------------------------------------------ */
  const initHeroParallax = () => {
    const hero = document.querySelector('.hero');
    const avatar = document.querySelector('.hero-avatar');
    if (!hero || !avatar) return;

    const STRENGTH = 20;
    let rafId = null;
    let targetX = 0;
    let targetY = 0;

    const applyParallax = () => {
      const children = avatar.children;
      for (let i = 0; i < children.length; i++) {
        const factor = (i + 1) * (STRENGTH / children.length);
        children[i].style.transform =
          `translate3d(${-(targetX * factor)}px, ${-(targetY * factor)}px, 0)`;
      }
      rafId = null;
    };

    // FIX: was missing this listener entirely
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
      if (!rafId) rafId = requestAnimationFrame(applyParallax);
    });

    hero.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) rafId = requestAnimationFrame(applyParallax);
    });
  };

  /* --------------------------------------------------------
   *  7. SKILL CARD HOVER TILT
   * ------------------------------------------------------ */
  const initSkillCardTilt = () => {
    const cards = document.querySelectorAll('.skill-card');
    if (!cards.length) return;
    const MAX_TILT = 5;

    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        card.style.transform =
          `perspective(1000px) rotateX(${-(normY * MAX_TILT)}deg) rotateY(${normX * MAX_TILT}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        card.style.transition = 'transform 0.4s ease';
      });
    });
  };

  /* --------------------------------------------------------
   *  8. TYPING CURSOR (CSS-driven)
   * ------------------------------------------------------ */
  const initTypingCursor = () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    subtitle.classList.add('typing-cursor');
  };

  /* --------------------------------------------------------
   *  9. STATS COUNTER ANIMATION
   * ------------------------------------------------------ */
  const initStatsCounter = () => {
    const statsContainer = document.querySelector('.hero-stats');
    if (!statsContainer) return;

    const statNumbers = statsContainer.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    let hasAnimated = false;
    const DURATION = 2000;
    const easeOutQuad = (t) => t * (2 - t);

    const animateNumber = (el) => {
      const target = parseInt(el.dataset.value, 10);
      const suffix = el.dataset.suffix || '';
      if (isNaN(target)) return;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / DURATION, 1);
        el.textContent = Math.floor(easeOutQuad(progress) * target) + (progress === 1 ? suffix : '');
        if (progress < 1) requestAnimationFrame(step);
        
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          statNumbers.forEach(animateNumber);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsContainer);
  };

  /* --------------------------------------------------------
   *  10. SCROLL PROGRESS INDICATOR
   * ------------------------------------------------------ */
  const initScrollProgress = () => {
    const bar = document.createElement('div');
    Object.assign(bar.style, {
      position: 'fixed', top: '0', left: '0',
      height: '3px', width: '0%',
      background: '#00d4ff', zIndex: '10000',
      transition: 'width 0.1s linear', pointerEvents: 'none',
    });
    document.body.appendChild(bar);

    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  };

  /* --------------------------------------------------------
   *  11. BOOT
   * ------------------------------------------------------ */
  initNavbarScroll();
  initMobileMenu();
  initSmoothScroll();
  initActiveNavHighlight();
  initFadeUpAnimations();
  initHeroParallax();
  initSkillCardTilt();
  initTypingCursor();
  initStatsCounter();
  initScrollProgress();
});

/* ============================================================
 *  TYPEWRITER  — runs on window load, after DOM is ready
 * ============================================================ */
const typingText = `"Hello, I'm Ajmal.\n Let's build something great"`

let typingIndex = 0;


function heroWriter() {
  const el = document.getElementById('Hero-text');
  if (!el) return;
  if (typingIndex < typingText.length) {
    el.textContent += typingText.charAt(typingIndex);
    typingIndex++;
    setTimeout(heroWriter, 70);
  }
}


window.addEventListener('load', heroWriter);


/* ============================================================
 *  EXTRA VISUAL EFFECTS: particle network, cursor glow, tilt
 * ============================================================ */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const yr = document.getElementById('year'); if (yr) yr.textContent = new Date().getFullYear();

  // Particle network
  const cv = document.getElementById('bg-canvas'); if (!cv) return;
  const ctx = cv.getContext('2d'); let W, H, P = [];
  const m = { x: -9999, y: -9999 };
  addEventListener('pointermove', e => { m.x = e.clientX; m.y = e.clientY; });
  const size = () => {
    const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    P = Array.from({ length: Math.min(Math.floor(W * H / 17000), 80) }, () => ({
      x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: Math.random() * 1.4 + .5 }));
  };
  size(); addEventListener('resize', size);
  (function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < P.length; i++) {
      const a = P[i]; a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1;
      ctx.fillStyle = 'rgba(0,212,255,.7)'; ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill();
      for (let j = i + 1; j < P.length; j++) {
        const b = P[j], d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
        if (d < 16000) { ctx.strokeStyle = `rgba(0,212,255,${(1 - d / 16000) * .16})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      const dm = (a.x - m.x) ** 2 + (a.y - m.y) ** 2;
      if (dm < 28000) { ctx.strokeStyle = `rgba(0,212,255,${(1 - dm / 28000) * .4})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(m.x, m.y); ctx.stroke(); }
    }
    if (!reduce) requestAnimationFrame(draw);
  })();

  if (!fine || reduce) return;
  // Cursor glow
  const g = document.getElementById('cursorGlow'); let gx = 0, gy = 0, tx = 0, ty = 0;
  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; g.style.opacity = 1; });
  (function f() { gx += (tx - gx) * .12; gy += (ty - gy) * .12; g.style.left = gx + 'px'; g.style.top = gy + 'px'; requestAnimationFrame(f); })();
  // Project card tilt + spotlight
  document.querySelectorAll('.project-card').forEach(c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.transform = `perspective(1000px) rotateY(${(x - .5) * 8}deg) rotateX(${-(y - .5) * 8}deg) translateY(-6px)`;
      c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
    });
    c.addEventListener('pointerleave', () => { c.style.transform = ''; });
  });
})();
