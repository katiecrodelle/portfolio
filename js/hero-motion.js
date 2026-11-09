const motionHero = document.querySelector('.editorial-hero');
const motionToggle = document.querySelector('.motion-toggle');
if (motionHero && motionToggle) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pausedByVisitor = false;
  function updateMotion() {
    const paused = pausedByVisitor || reducedMotion.matches;
    motionHero.classList.toggle('motion-paused', paused);
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.setAttribute('aria-label', paused ? 'Play decorative animation' : 'Pause decorative animation');
    motionToggle.innerHTML = paused ? '<span aria-hidden="true">▷</span> Play motion' : '<span aria-hidden="true">Ⅱ</span> Pause motion';
    motionToggle.hidden = reducedMotion.matches;
  }
  motionToggle.addEventListener('click', () => { pausedByVisitor = !pausedByVisitor; updateMotion(); });
  reducedMotion.addEventListener('change', updateMotion);
  const visibility = new IntersectionObserver(entries => {
    motionHero.classList.toggle('motion-offscreen', !entries[0].isIntersecting);
  });
  visibility.observe(motionHero);
  updateMotion();
}
