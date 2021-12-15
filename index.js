// Import stylesheets
import './style.scss';

const darkModeIndicator = document.querySelector('.dark-mode-indicator');
const toggleDarkModeButton = document.querySelector('.toggle-dark-mode');

function updateDarkModeIndicator(colorScheme) {
  darkModeIndicator.textContent = colorScheme === 'dark' ? 'ON' : 'OFF';
}

function log(message) {
  document.querySelector('.log').textContent = message;
}

function updateLog() {
  if (getForcedColorScheme()) {
    log('Using forced color scheme which is set by user.');
  } else {
    log('Using system preferred color scheme.');
  }
}

function getForcedColorScheme() {
  const forcedColorScheme = window.sessionStorage.getItem('forcedColorScheme');

  if (forcedColorScheme === 'dark' || forcedColorScheme === 'light') {
    return forcedColorScheme;
  }

  return null;
}

function getSystemColorScheme() {
  const systemColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light';
  return systemColorScheme;
}

function setColorScheme(colorScheme) {
  window.sessionStorage.setItem('forcedColorScheme', colorScheme);
  document.documentElement.setAttribute('forced-color-scheme', colorScheme);
  updateDarkModeIndicator(colorScheme);
}

function setInitialColorScheme() {
  const colorScheme = getForcedColorScheme() || getSystemColorScheme();
  document.documentElement.setAttribute(
    'forced-color-scheme',
    getForcedColorScheme()
  );
  updateDarkModeIndicator(colorScheme);
  updateLog();
}

setInitialColorScheme();

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (event) => {
    updateDarkModeIndicator(getForcedColorScheme() || getSystemColorScheme());
  });

toggleDarkModeButton.addEventListener('click', () => {
  const colorScheme = getForcedColorScheme() || getSystemColorScheme();
  setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  updateLog();
});
