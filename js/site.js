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
          <a href="about.html">About</a>

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
    href: 'agents-case-study.html', badge: 'Currently in beta', companyYear: 'Ninety &middot; 2026',
    title: 'Agents: making recurring work easier to delegate.',
    description: 'I designed the complete UX and UI for recurring agents, partnering with product and engineering to simplify setup and make results reviewable. Currently in beta.',
    chips: ['AI Agents', 'End-to-end UX/UI', 'Staff Product Designer, AI & Design Systems', 'Beta'],
    image: 'images/agents/beta/overview.jpg',
    imageAlt: 'Ninety Agents interface showing recurring workflows, schedules, and attention states.',
    ariaLabel: 'Read case study: AI Agents at Ninety',
    visualStyle: 'background: #11131c;', imageStyle: 'object-fit: contain;',
  },
  {
    href: 'ai-assistant-case-study.html',
    badge: 'Case Study',
    companyYear: 'Constant Contact &middot; 2026',
    title: 'Helping marketers decide what to do next.',
    description: 'My core product work at Constant Contact connected campaign reporting to explanations, follow-up questions, and actionable guidance.',
    chips: ['Conversational AI', 'Reporting', 'Plain-language Insights', 'Design Systems', 'Trust &amp; Control'],
    image: 'images/ai-assistant/reporting.jpg',
    imageAlt: 'The Constant Contact AI Assistant panel answering a subscriber-growth question with a donut chart of subscriber sources.',
    ariaLabel: 'Read case study: Designing AI-Powered Marketing Guidance at Constant Contact',
  },
  {
    href: 'summit-design-system.html',
    badge: 'Case Study',
    companyYear: 'Constant Contact &middot; 2026',
    title: 'Summit: shared rules for complex components.',
    description: 'I led component design for sheets and list controls during Constant Contact’s consolidation of five design systems, defining shared anatomy and interaction rules.',
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
    title: 'Ninety Mobile: choosing what belongs on a phone.',
    description: 'I led design for Ninety’s first mobile app. Research helped me prioritize work away from a desk; mobile reached 52% adoption among active users within 90 days.',
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
    title: 'A better decision at the moment of cancellation.',
    description: 'I connected help-search behavior and churn data to a staged design proposal for pause, plan changes, support, and cancellation.',
    chips: ['Product Strategy', 'Retention', 'Data-Driven Design', 'Journey Mapping', 'AI Strategy'],
    image: 'images/help-panel/hero.jpg',
    imageAlt: 'The redesigned Constant Contact help panel with search, quick actions, and learn links beside the product dashboard.',
    ariaLabel: 'Read case study: Turning the Help Panel into a Retention Engine',
  },
  {
    href: 'knowledge-portal.html',
    badge: 'Case Study',
    companyYear: 'Ninety.io &middot; 2023&ndash;2025',
    title: 'Knowledge Portal: a shared place to learn.',
    description: 'As part of my core product work at Ninety, I led Knowledge Portal design through launch and used feedback to improve first-time creation.',
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
    companyYear: 'Ninety.io &middot; Updated 2026',
    title: 'Terra: shared structure for real product work.',
    description: 'As Terra’s sole designer, I partnered with engineers on shared navigation, page architecture, and component behavior across Ninety.',
    chips: ['Design Systems', 'Design Tokens', 'Governance', 'Accessibility', '0&rarr;1'],
    image: 'images/terra/examples.png',
    imageAlt: 'Terra design system components: form fields, toggle switches, chips, avatars, and selection lists.',
    ariaLabel: "Read case study: Terra, Ninety's First Unified Design System",
    visualStyle: 'background: #fff;',
    imageStyle: 'object-position: center;',
  },
  {
    href: 'people-analyzer.html',
    badge: 'Case Study',
    companyYear: 'Ninety.io &middot; 2023&ndash;2025',
    title: 'People Analyzer: separating values from role fit.',
    description: 'I owned core product design for Ninety’s EOS evaluation experience, with role-specific workflows and independent values and role-fit ratings.',
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
