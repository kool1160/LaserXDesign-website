(() => {
  const home = document.querySelector('.ds-home');
  if (!home) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  home.classList.add('motion-ready');

  const sections = Array.from(document.querySelectorAll('main > section'));
  const nonHeroSections = sections.filter((section) => !section.classList.contains('ds-hero'));

  if (reducedMotion) {
    nonHeroSections.forEach((section) => section.classList.add('is-locked'));
    return;
  }

  requestAnimationFrame(() => home.classList.add('motion-live'));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-locked');
        sectionObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -12% 0px' },
  );

  nonHeroSections.forEach((section) => sectionObserver.observe(section));

  const navLinks = Array.from(document.querySelectorAll('.ds-navlinks a[href^="#"], .ds-mobilepanel a[href^="#"]'));
  const sectionIds = sections.map((section) => section.id).filter(Boolean);

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
    { threshold: [0.25, 0.5, 0.72], rootMargin: '-18% 0px -48% 0px' },
  );

  sections.filter((section) => sectionIds.includes(section.id)).forEach((section) => activeObserver.observe(section));

  const machineOverlay = document.createElement('div');
  machineOverlay.className = 'lx-machine-nav';
  machineOverlay.setAttribute('aria-hidden', 'true');
  machineOverlay.innerHTML = `
    <div class="lx-machine-shutter top"></div>
    <div class="lx-machine-shutter bottom"></div>
    <div class="lx-machine-guide"></div>
    <div class="lx-machine-target"><small>Indexing station</small><strong>LaserX</strong></div>
  `;
  document.body.appendChild(machineOverlay);

  const targetLabel = machineOverlay.querySelector('.lx-machine-target strong');
  let transitionTimer = null;

  const runMachineNavigation = (link, target, href) => {
    if (transitionTimer) window.clearTimeout(transitionTimer);

    const label = (link.textContent || target.id || 'LaserX').trim();
    targetLabel.textContent = label;
    machineOverlay.classList.remove('is-releasing');
    machineOverlay.classList.add('is-active');
    document.documentElement.classList.add('lx-nav-transitioning');

    window.setTimeout(() => {
      target.classList.add('is-locked');
      target.scrollIntoView({ block: 'start', behavior: 'auto' });
      if (history.replaceState) history.replaceState(null, '', href);
    }, 330);

    window.setTimeout(() => {
      machineOverlay.classList.remove('is-active');
      machineOverlay.classList.add('is-releasing');
    }, 610);

    transitionTimer = window.setTimeout(() => {
      machineOverlay.classList.remove('is-releasing');
      document.documentElement.classList.remove('lx-nav-transitioning');
      transitionTimer = null;
    }, 1020);
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      runMachineNavigation(link, target, href);
      const openMenu = link.closest('details[open]');
      if (openMenu) openMenu.removeAttribute('open');
    });
  });

  const axis = document.createElement('div');
  axis.className = 'lx-axis';
  axis.setAttribute('aria-hidden', 'true');
  axis.innerHTML = '<span class="lx-axis-fill"></span><span class="lx-axis-head"></span><span class="lx-axis-mark">AXIS / PAGE</span>';
  document.body.appendChild(axis);

  let ticking = false;
  const updateAxis = () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
    home.style.setProperty('--lx-scroll', progress.toFixed(4));
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateAxis);
    },
    { passive: true },
  );

  updateAxis();
})();
