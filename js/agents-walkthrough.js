// A local, screenshot-based walkthrough; never connects to the private prototype.
class AgentsWalkthrough extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const steps = [
      ['overview','Your agents','Design decision: bring exceptions and outcomes forward so people can review the work without checking every agent.'],
      ['discover','Discover','Design decision: organize discovery around jobs people recognize, with starter choices and curated packs.'],
      ['template','Preview','Design decision: explain the commitment before setup—when it runs, what it looks at, and what it can do.'],
      ['setup','Review setup','Design decision: show instructions, access, and example output before a person turns the agent on.'],
      ['results','Review results','Design decision: keep people in control of the response by making findings and proposed actions inspectable.']
    ];
    this.innerHTML = `<section class="agents-tour" aria-label="Agents prototype walkthrough">
      <div class="tour-top"><span>Inside the newer experience</span><button type="button" class="tour-play">Play walkthrough <span aria-hidden="true">▷</span></button></div>
      <div class="tour-stage">${steps.map(([file,title,caption],i)=>`<figure class="tour-frame${i===0?' is-current':''}" ${i===0?'':'hidden'}><a href="images/agents/clean-v3/agents-nov16-${file}.png" target="_blank" rel="noopener" aria-label="Enlarge ${title} screen"><img src="images/agents/clean-v3/agents-nov16-${file}.png" width="1440" height="900" alt="${title}: ${caption}" loading="eager"></a></figure>`).join('')}</div>
      <div class="tour-progress" aria-hidden="true"><span></span></div>
      <div class="tour-steps" role="group" aria-label="Choose a walkthrough screen">${steps.map(([,title],i)=>`<button type="button" data-step="${i}" aria-pressed="${i===0}"><span>0${i+1}</span> ${title}</button>`).join('')}</div>
      <p class="tour-caption" aria-live="polite">${steps[0][2]}</p>
      <p class="tour-disclaimer">Prototype walkthrough · Updated November 16, 2026 · Screens contain simulated data and illustrative counts.</p>
    </section>`;
    const frames = [...this.querySelectorAll('.tour-frame')];
    const buttons = [...this.querySelectorAll('[data-step]')];
    const play = this.querySelector('.tour-play');
    const caption = this.querySelector('.tour-caption');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0;
    let timer;
    let playing = false;
    const stop = () => {
      clearTimeout(timer); playing = false; this.classList.remove('tour-playing');
      play.innerHTML = 'Replay walkthrough <span aria-hidden="true">↻</span>';
    };
    const show = (i) => {
      index = i;
      frames.forEach((frame,j) => { frame.hidden = j !== i; frame.classList.toggle('is-current',j===i); });
      buttons.forEach((button,j) => button.setAttribute('aria-pressed',String(j===i)));
      caption.textContent = steps[i][2];
      this.style.setProperty('--tour-progress',String((i+1)/steps.length));
    };
    const next = () => {
      if (index >= steps.length-1) { stop(); return; }
      show(index+1); timer = setTimeout(next,3200);
    };
    buttons.forEach((button,i) => button.addEventListener('click',() => { stop(); show(i); }));
    play.addEventListener('click',() => {
      if (playing) { stop(); return; }
      if (reduced.matches) { show((index+1)%steps.length); return; }
      show(0); playing = true; this.classList.add('tour-playing');
      play.innerHTML = 'Stop walkthrough <span aria-hidden="true">□</span>';
      timer = setTimeout(next,3200);
    });
    const updateReduced = () => {
      stop(); play.innerHTML = reduced.matches ? 'Next screen <span aria-hidden="true">→</span>' : 'Play walkthrough <span aria-hidden="true">▷</span>';
    };
    reduced.addEventListener('change',updateReduced);
    updateReduced();
    this._cleanupTour = () => { clearTimeout(timer); reduced.removeEventListener('change',updateReduced); };
  }
  disconnectedCallback() { this._cleanupTour?.(); }
}
customElements.define('agents-walkthrough', AgentsWalkthrough);
