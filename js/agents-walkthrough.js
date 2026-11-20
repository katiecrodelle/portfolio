// A local, screenshot-based walkthrough; never connects to the private prototype.
class AgentsWalkthrough extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const steps = [
      ['overview','Your agents','I brought run outcomes and exceptions forward, with timestamps and distinct states.'],
      ['discover','Discover','I organized discovery around familiar jobs, with starter choices and curated packs.'],
      ['template','Preview','I made timing, access, and behavior visible before someone chooses a template.'],
      ['setup','Review setup','I put the instructions and example output in the setup review before activation.'],
      ['results','Review results','I made findings and proposed actions inspectable so people can choose how to respond.'],
      ['upcoming','Upcoming runs','I gave upcoming work its own view, with scheduled times and updates that need attention.']
    ];
    this.style.setProperty('--tour-progress',String(1/steps.length));
    this.innerHTML = `<section class="agents-tour" aria-label="Agents prototype walkthrough">
      <div class="tour-top"><span>Inside the current experience</span><button type="button" class="tour-play">Play walkthrough <span aria-hidden="true">▷</span></button></div>
      <div class="tour-stage">${steps.map(([file,title,caption],i)=>`<figure class="tour-frame${i===0?' is-current':''}" ${i===0?'':'hidden'}><a href="images/agents/beta/${file}.jpg" target="_blank" rel="noopener" aria-label="Enlarge ${title} screen"><img src="images/agents/beta/${file}.jpg" width="1586" height="992" alt="${title}: ${caption}" loading="eager"></a></figure>`).join('')}</div>
      <div class="tour-progress" aria-hidden="true"><span></span></div>
      <div class="tour-steps" role="group" aria-label="Choose a walkthrough screen">${steps.map(([,title],i)=>`<button type="button" data-step="${i}" aria-pressed="${i===0}"><span>0${i+1}</span> ${title}</button>`).join('')}</div>
      <p class="tour-caption" aria-live="polite">${steps[0][2]}</p>
      <p class="tour-disclaimer">Prototype walkthrough · October–November 2026 · Screens contain simulated data and illustrative counts.</p>
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
