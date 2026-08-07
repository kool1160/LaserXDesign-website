(() => {
  const home = document.querySelector('.ds-home');
  if (!home) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sections = Array.from(document.querySelectorAll('main > section'));
  const nonHero = sections.filter((section) => !section.classList.contains('ds-hero'));

  home.classList.add('motion-ready');

  if (reducedMotion) {
    nonHero.forEach((section) => section.classList.add('is-revealed'));
    return;
  }

  requestAnimationFrame(() => home.classList.add('motion-live'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
  );
  nonHero.forEach((section) => revealObserver.observe(section));

  const navLinks = Array.from(document.querySelectorAll('.ds-navlinks a[href^="#"], .ds-mobilepanel a[href^="#"]'));
  const activeObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible || !visible.target.id) return;
      navLinks.forEach((link) => {
        link.classList.toggle('is-current', link.getAttribute('href') === `#${visible.target.id}`);
      });
    },
    { threshold: [0.25, 0.5, 0.7], rootMargin: '-16% 0px -46% 0px' },
  );
  sections.filter((section) => section.id).forEach((section) => activeObserver.observe(section));

  const jump = document.createElement('div');
  jump.className = 'lx-index-jump';
  jump.setAttribute('aria-hidden', 'true');
  jump.innerHTML = '<div class="lx-index-label"><small>LaserX / Index</small><strong>Product</strong></div>';
  document.body.appendChild(jump);
  const jumpLabel = jump.querySelector('strong');
  let jumpTimer = null;

  const runJump = (link, target, href) => {
    if (jumpTimer) window.clearTimeout(jumpTimer);
    jumpLabel.textContent = (link.textContent || target.id || 'LaserX').trim();
    jump.classList.remove('is-active');
    void jump.offsetWidth;
    jump.classList.add('is-active');

    window.setTimeout(() => {
      target.classList.add('is-revealed');
      target.scrollIntoView({ block: 'start', behavior: 'auto' });
      if (history.replaceState) history.replaceState(null, '', href);
    }, 250);

    jumpTimer = window.setTimeout(() => {
      jump.classList.remove('is-active');
      jumpTimer = null;
    }, 720);
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      runJump(link, target, href);
      const openMenu = link.closest('details[open]');
      if (openMenu) openMenu.removeAttribute('open');
    });
  });

  const hero = document.querySelector('.ds-hero');
  const heroCopy = document.querySelector('.ds-hero-copy');
  const heroObject = document.querySelector('.ds-product-visual');
  let ticking = false;

  const updateFilm = () => {
    if (hero && heroCopy && heroObject) {
      const rect = hero.getBoundingClientRect();
      const travel = Math.max(1, hero.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      const copyY = -72 * progress;
      const copyScale = 1 - 0.045 * progress;
      const copyOpacity = 1 - 0.62 * progress;
      const objectY = 34 * progress;
      const objectScale = 1 + 0.055 * progress;
      heroCopy.style.transform = `translate3d(0, ${copyY}px, 0) scale(${copyScale})`;
      heroCopy.style.opacity = String(copyOpacity);
      heroObject.style.transform = `translate3d(0, ${objectY}px, 0) scale(${objectScale})`;
    }
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateFilm);
    },
    { passive: true },
  );

  updateFilm();
})();
