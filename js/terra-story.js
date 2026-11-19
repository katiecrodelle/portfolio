// Inspect real component variants. Motion runs only in response to a choice.
function bindViews(attribute, update) {
  const buttons = [...document.querySelectorAll(`[${attribute}]`)];
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    update(button.getAttribute(attribute));
  }));
}
bindViews('data-nav-view', view => {
  const image = document.getElementById('nav-component');
  image.src = `images/terra/nav-${view}.png`;
  image.alt = `${view === 'rail' ? 'Collapsed labeled rail' : `Expanded ${view}-theme`} Terra side navigation component`;
  image.style.animation = 'none';
  void image.offsetWidth;
  image.style.animation = '';
});
bindViews('data-button-view', view => {
  const image = document.getElementById('button-component');
  image.src = `images/terra/button-${view}.png`;
  image.alt = `${view[0].toUpperCase() + view.slice(1)} Terra button variants across colors, states, sizes, icons, and full-width options`;
  image.style.animation = 'none';
  void image.offsetWidth;
  image.style.animation = '';
});
const shellCaptions = {
  wide: 'Large · 960px and up: page actions, filters, and view actions remain visible.',
  docked: 'Medium · 600–959px of page width: actions move into overflow, while filters remain available beside Maz.',
  small: 'Small · Under 600px of page width: the description hides, filters use a compact entry point, and actions remain in overflow.',
  scroll: 'On scroll · After about 96px: title, tabs, Filters, and overflow share one compact row, returning space to the content.'
};
bindViews('data-shell-view', view => {
  document.querySelector('.terra-shell-stage').dataset.state = view;
  document.querySelector('.terra-shell-caption').textContent = shellCaptions[view];
});
// Keep the two short clips independent; never play audio or start motion automatically.
const terraVideos = [...document.querySelectorAll('.terra-film-pair video')];
terraVideos.forEach(video => video.addEventListener('play', () => {
  terraVideos.filter(other => other !== video).forEach(other => other.pause());
}));

// A single, user-initiated sequence; manual selection cancels playback.
const layoutPlay = document.querySelector('.terra-layout-play');
const layoutSteps = [...document.querySelectorAll('[data-shell-view]')];
let layoutTimers = [];
function stopLayoutTour() {
  layoutTimers.forEach(clearTimeout); layoutTimers = [];
  layoutPlay.textContent = 'Replay layout animation';
}
layoutSteps.forEach(button => button.addEventListener('click', stopLayoutTour));
layoutPlay.addEventListener('click', () => {
  stopLayoutTour();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const active = layoutSteps.findIndex(button => button.getAttribute('aria-pressed') === 'true');
    layoutSteps[(active + 1) % layoutSteps.length].click();
    return;
  }
  function select(index) {
    const button = layoutSteps[index];
    layoutSteps.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const state = button.dataset.shellView;
    document.querySelector('.terra-shell-stage').dataset.state = state;
    document.querySelector('.terra-shell-caption').textContent = shellCaptions[state];
  }
  select(0); layoutPlay.textContent = 'Playing layout animation';
  [1,2,3].forEach((step,index) => layoutTimers.push(setTimeout(() => select(step), (index + 1) * 1600)));
  layoutTimers.push(setTimeout(stopLayoutTour, 4900));
});
const layoutMotion = matchMedia('(prefers-reduced-motion: reduce)');
function updateLayoutMotion() { stopLayoutTour(); layoutPlay.textContent = layoutMotion.matches ? 'Next layout' : 'Play layout animation'; }
layoutMotion.addEventListener('change', updateLayoutMotion);
updateLayoutMotion();
