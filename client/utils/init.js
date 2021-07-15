import router from './router';
import { getPageName } from './helper';
import pages from './pages';
import { slideIn } from './slide';
import { notSlidePageNames } from '../utils/constant';

export default function init() {
  router(window.location.pathname);

  window.addEventListener('hashchange', () => {
    console.log('test');
  });

  window.onpopstate = () => {
    let pageName = getPageName(window.location.pathname);

    if (!notSlidePageNames.includes(pageName)) {
      const $app = document.querySelector('.app');
      let idx = -1;
      let pages = Array.from($app.children);
      pages.forEach(function (page, index) {
        if (page.classList.contains(page)) {
          idx = index;
        }
      });
      if (idx != -1) {
        $app.children[idx + 1].classList.add('slide-out');
        setTimeout(() => {
          $app.children[idx + 1].remove();
        }, 0);
      } else {
        slideIn(`/${pageName}`, true);
      }
    }
  };

  window.onload = () => {
    if (window.location.pathname !== '/') {
      window.location.replace('/');
    }
  };
}
