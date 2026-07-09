// ============================================
// NAV SCROLL STATE
// ============================================
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ============================================
// MOBILE NAV TOGGLE
// ============================================
const toggle = document.querySelector('.nav-mobile-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on nav link click (navigating away or anchor jump)
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (nav && !nav.contains(e.target)) {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ============================================
// SCROLL PROGRESS BAR (case study pages)
// ============================================
const progressBar = document.querySelector('.progress-bar');
if (progressBar) {
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
    progressBar.setAttribute('aria-valuenow', Math.round(progress));
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// ============================================
// FADE-UP ON SCROLL
// ============================================
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  fadeEls.forEach((el) => observer.observe(el));
}

// ============================================
// TOC ACTIVE STATE
// ============================================
const tocLinks = document.querySelectorAll('.cs-toc-list a');
if (tocLinks.length) {
  const sections = Array.from(tocLinks)
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const activateLink = (id) => {
    tocLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activateLink(entry.target.id);
      });
    },
    { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
  );

  sections.forEach((s) => sectionObserver.observe(s));
}
