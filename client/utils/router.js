import Home from '../pages/Home';

export default function router(path) {
  switch (path) {
    case '/':
      new Home({ parent: document.querySelector('.app') });
      break;
    case '/login':
      new Home({ parent: document.querySelector('.app') });
      break;
    default:
      console.log('not exist url');
  }
}
