import { getPageName } from './helper';
import pages from './pages';
import conditions from './pagecheck';
import Snackbar from '../components/Etc/SnackBar';

export const slideIn = (path, onpop, conditionObj) => {
  const $app = document.querySelector('.app');
  let pageName = getPageName(path);
  const condition = conditions[pageName](conditionObj);

  if (typeof condition === 'object') {
    condition.then((data) => {
      let p_condition = data;
      if (p_condition === 'ok') {
        new pages[pageName]({ parent: $app });

        if (!onpop) {
          window.history.pushState({}, pageName, path);
        }
        setTimeout(() => {
          document.querySelector(`.${pageName}`).classList.add('slide-in');
          document.querySelector('.app').classList.add('disabled');
          setTimeout(() => {
            document.querySelector('.app').classList.remove('disabled');
          }, 300);
        }, 100);
      } else {
        new Snackbar({ msg: p_condition, duration: 1000 });
      }
    });
  } else {
    if (condition === 'ok') {
      new pages[pageName]({ parent: $app });

      if (!onpop) {
        window.history.pushState({}, pageName, path);
      }
      setTimeout(() => {
        document.querySelector(`.${pageName}`).classList.add('slide-in');
        document.querySelector('.app').classList.add('disabled');
        setTimeout(() => {
          document.querySelector('.app').classList.remove('disabled');
        }, 300);
      }, 100);
    } else {
      new Snackbar({ msg: condition, duration: 1000 });
    }
  }
};

export const slideOut = (path) => {
  console.log(path);
  const $app = document.querySelector('.app');
  let pageName = getPageName(path);
  window.history.pushState({}, pageName, path);
  $app.lastElementChild.classList.add('slide-out');
  document.querySelector('.app').classList.add('disabled');
  setTimeout(() => {
    $app.lastElementChild.remove();
    document.querySelector('.app').classList.remove('disabled');
  }, 300);
};

export const historyBack = () => {
  const $app = document.querySelector('.app');
  $app.lastElementChild.classList.add('slide-out');
  setTimeout(() => {
    window.history.back();
  }, 300);
};
