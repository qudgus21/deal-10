import { getPageName } from './helper';
import pages from './pages';

export const slideIn = (path, onpop) => {
  const $app = document.querySelector('.app');
  let pageName = getPageName(path);
  new pages[pageName]({ parent: $app });
  if (!onpop) {
    window.history.pushState({}, pageName, path);
  }
  setTimeout(() => {
    document.querySelector(`.${pageName}`).classList.add('slide-in');
  }, 0);
};

export const slideOut = (path) => {
  const $app = document.querySelector('.app');
  let pageName = getPageName(path);
  window.history.pushState({}, pageName, path);
  $app.lastElementChild.classList.add('slide-out');
  setTimeout(() => {
    $app.lastElementChild.remove();
  }, 300);
};
