// ============================================
// SITE-NAV WEB COMPONENT
// ============================================
class SiteNav extends HTMLElement {
  connectedCallback() {
    const isHomepage = !this.hasAttribute('progress');
    this.innerHTML = `
      ${!isHomepage ? '<div class="progress-bar" role="progressbar" aria-label="Reading progress" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>' : ''}
      <nav class="nav" role="navigation" aria-label="Main navigation">
        <a href="index.html" class="nav-logo">Katie<span>.</span></a>
        <div class="nav-links" id="nav-links">
          <a href="${isHomepage ? '#work' : 'index.html#work'}">Work</a>
          <a href="${isHomepage ? '#about' : 'index.html#about'}">About</a>
          <a href="${isHomepage ? '#experience' : 'index.html#experience'}">Experience</a>
          <a href="${isHomepage ? '#contact' : 'index.html#contact'}">Contact</a>
          <a href="mailto:kcrodelle@gmail.com" class="nav-cta">Get in touch</a>
        </div>
        <button class="nav-mobile-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-links">
          <span></span><span></span><span></span>
        </button>
      </nav>
    `;
  }
}
customElements.define('site-nav', SiteNav);

// ============================================
// SITE-FOOTER WEB COMPONENT
// ============================================
class SiteFooter extends HTMLElement {
  connectedCallback() {
    const back = this.hasAttribute('back');
    this.innerHTML = `
      <footer class="footer">
        <p class="footer-text">&copy; 2026 Katie DeVoe</p>
        ${back
          ? '<a href="index.html" class="footer-text" style="color: var(--text-tertiary); transition: color 0.2s;" onmouseover="this.style.color=\'var(--text-primary)\'" onmouseout="this.style.color=\'var(--text-tertiary)\'">Back to home</a>'
          : '<p class="footer-text">Product Design Leader</p>'}
      </footer>
    `;
  }
}
customElements.define('site-footer', SiteFooter);

// ============================================
// CASE STUDY CARD REGISTRY
// ============================================
const CASE_STUDIES = [
  {
    href: 'ai-assistant-case-study.html',
    badge: 'Case Study',
    companyYear: 'Constant Contact &middot; 2026',
    title: 'Designing AI-Powered Marketing Guidance at Constant Contact',
    description: 'Owning the AI product experience across core product, reporting, and design systems at Constant Contact &mdash; defining interaction models, plain-language insight patterns, and the component conventions that make AI surfaces feel consistent and trustworthy for millions of small business marketers.',
    chips: ['Conversational AI', 'Reporting', 'Plain-language Insights', 'Design Systems', 'Trust &amp; Control'],
    image: 'images/ai-assistant/reporting.jpg',
    imageAlt: 'The Constant Contact AI Assistant panel answering a subscriber-growth question with a donut chart of subscriber sources.',
    ariaLabel: 'Read case study: Designing AI-Powered Marketing Guidance at Constant Contact',
  },
  {
    href: 'summit-design-system.html',
    badge: 'Case Study',
    companyYear: 'Constant Contact &middot; 2026',
    title: 'Summit: Building Constant Contact&rsquo;s Unified Design System',
    description: 'Led the consolidation of five fragmented legacy systems into one platform &mdash; token architecture, component standards, governance, and the cross-functional alignment that made it the foundation for 20+ designers and 60+ engineers.',
    chips: ['Design Systems', 'Token Architecture', 'Component Governance', 'Accessibility', '5&thinsp;&rarr;&thinsp;1'],
    image: 'images/summit/convergence.svg',
    imageAlt: 'Convergence diagram showing five legacy design systems flowing into Summit, the unified Constant Contact design system.',
    ariaLabel: 'Read case study: Summit Design System at Constant Contact',
    visualStyle: 'background: var(--bg-secondary);',
    imageStyle: 'padding: 32px; object-fit: contain;',
  },
  {
    href: 'ninety-mobile.html',
    badge: 'Case Study',
    companyYear: 'Ninety.io &middot; 2023&ndash;2025',
    title: 'Ninety Mobile: From Zero to Apple&rsquo;s Top 100',
    description: 'Drove the discovery, vision, and design of Ninety&rsquo;s first mobile app &mdash; making deliberate cuts on feature parity in favor of user value. Shipped to 3&times; expected adoption and Apple&rsquo;s Top 100 Business Apps.',
    chips: ['Native Mobile', '0&rarr;1', 'iOS &amp; Android', 'UX Strategy', 'Product Vision'],
    image: 'images/ninety-mobile/hero.jpg',
    imageAlt: 'Two iPhones showing the Ninety mobile app and its App Store listing with a 4.9-star rating.',
    ariaLabel: "Read case study: Ninety Mobile, From Zero to Apple's Top 100",
    imageStyle: 'object-position: center;',
  },
  {
    href: 'help-panel-case-study.html',
    badge: 'Case Study',
    companyYear: 'Constant Contact &middot; 2026',
    title: 'Turning the Help Panel into a Retention Engine',
    description: 'Used behavioral data and journey mapping to expose a churn problem hiding in plain sight, then designed a graduated retention experience &mdash; from contextual quick fixes to AI-powered conversational retention &mdash; with a revenue model to justify the investment.',
    chips: ['Product Strategy', 'Retention', 'Data-Driven Design', 'Journey Mapping', 'AI Strategy'],
    image: 'images/help-panel/hero.jpg',
    imageAlt: 'The redesigned Constant Contact help panel with search, quick actions, and learn links beside the product dashboard.',
    ariaLabel: 'Read case study: Turning the Help Panel into a Retention Engine',
  },
  {
    href: 'https://www.katiedevoedesigns.com/portfolio/ninetyio-kp',
    badge: 'Case Study',
    companyYear: 'Ninety.io &middot; 2023&ndash;2025',
    title: 'Knowledge Portal: 0&rarr;1 Learning Platform with AI',
    description: 'Designed and launched a centralized knowledge-sharing platform from scratch &mdash; through alpha, beta, and GA. Exceeded every target KPI in 90 days: 40K+ monthly page views, 40% account-level adoption. Followed up by integrating an AI companion (Maz) that resolved first-session friction and drove sustained engagement.',
    chips: ['Core Product', '0&rarr;1', 'AI Integration', 'User Research', 'Measurable Outcomes'],
    image: 'images/knowledge-portal/hero.svg',
    imageAlt: 'Knowledge Portal UI showing collections, topic progress, and the Maz AI companion integration.',
    ariaLabel: 'Read case study: Ninety.io Knowledge Portal with AI',
    visualStyle: 'background: var(--bg-secondary);',
    imageStyle: 'object-fit: contain; padding: 24px;',
  },
  {
    href: 'terra-design-system.html',
    badge: 'Case Study',
    companyYear: 'Ninety.io &middot; 2023&ndash;2025',
    title: 'Terra: Building Ninety&rsquo;s First Unified Design System',
    description: 'Co-led a 0-to-1 design system &mdash; semantic token architecture, accessible documented components, and the cross-functional governance that made it the foundation for every product that followed, including mobile and AI.',
    chips: ['Design Systems', 'Design Tokens', 'Governance', 'Accessibility', '0&rarr;1'],
    image: 'images/terra/examples.png',
    imageAlt: 'Terra design system components: form fields, toggle switches, chips, avatars, and selection lists.',
    ariaLabel: "Read case study: Terra, Ninety's First Unified Design System",
    visualStyle: 'background: #fff;',
    imageStyle: 'object-position: center;',
  },
  {
    href: 'https://www.katiedevoedesigns.com/portfolio/people-analyzer',
    badge: 'Case Study',
    companyYear: 'Ninety.io &middot; 2023&ndash;2025',
    title: 'People Analyzer: EOS-Aligned Evaluation Tool',
    description: 'Owned end-to-end design of a 0&rarr;1 employee evaluation tool built around the Entrepreneurial Operating System &mdash; replacing a disconnected modal flow with a structured, role-based framework for assessing Right Person, Right Seat. Dual-rating system with automatic RPRS calculation.',
    chips: ['Core Product', '0&rarr;1', 'Complex SaaS', 'Role-Based UX', 'EOS&reg;'],
    image: 'images/people-analyzer/hero.svg',
    imageAlt: 'People Analyzer evaluation UI showing Core Values rating bars, GWC indicators, and RPRS status.',
    ariaLabel: 'Read case study: People Analyzer, EOS-Aligned Evaluation Tool',
    visualStyle: 'background: var(--bg-secondary);',
    imageStyle: 'object-fit: contain; padding: 24px;',
  },
];

function renderCard(cs) {
  const chips = cs.chips.map((c) => `<span class="chip">${c}</span>`).join('');
  const visualStyle = cs.visualStyle ? ` style="${cs.visualStyle}"` : '';
  const imageStyle = cs.imageStyle ? ` style="${cs.imageStyle}"` : '';
  return `
    <a href="${cs.href}" class="case-study-card fade-up" aria-label="${cs.ariaLabel}">
      <div class="case-study-content">
        <div>
          <div class="card-meta">
            <span class="card-badge">${cs.badge}</span>
            <span class="card-company">${cs.companyYear}</span>
          </div>
          <h2 class="case-study-title">${cs.title}</h2>
          <p class="case-study-desc">${cs.description}</p>
          <div class="card-chips">${chips}</div>
        </div>
        <div class="card-cta">Read case study <span>&#8594;</span></div>
      </div>
      <div class="case-study-visual card-photo"${visualStyle}>
        <img src="${cs.image}" alt="${cs.imageAlt}" loading="lazy"${imageStyle} />
      </div>
    </a>
  `;
}

const workCards = document.getElementById('work-cards');
if (workCards) {
  workCards.innerHTML = CASE_STUDIES.map(renderCard).join('');
  // Re-initialize fade-up for dynamically rendered cards
  const newFadeEls = workCards.querySelectorAll('.fade-up');
  if (newFadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    newFadeEls.forEach((el) => observer.observe(el));
  }
}
