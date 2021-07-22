import Home from '../pages/Home';
import { slideIn } from './slide';
import { getPageName } from './helper';
import api from './api';
import Snackbar from '../components/Etc/SnackBar';

export default function router(path) {
  let pageName = getPageName(path);

  switch (pageName) {
    case 'home':
      slideIn('/', false);
      break;
    case 'menu':
      slidechain('/').then(() => {
        slidechain(path);
      });
      break;
    case 'MyAccount':
      slidechain('/').then(() => {
        slidechain(path);
      });
      break;
    case 'login':
      slidechain('/').then(() => {
        slidechain(path);
      });
      break;
    case 'register':
      slidechain('/').then(() => {
        slidechain('/login').then(() => {
          slidechain(path);
        });
      });
      break;
    case 'category':
      slidechain('/').then(() => {
        slidechain(path);
      });
      break;
    case 'categorydetail':
      slidechain('/').then(() => {
        slidechain(path);
      });
      break;
    case 'location':
      slidechain('/').then(() => {
        slidechain(path);
      });
      break;
    case 'productdetail':
      slidechain('/').then(() => {
        let temp = path.split('/');

        slidechain(path, { productIdx: temp.pop() });
      });
      break;
    case 'productchatlist':
      let temp = path.split('/');
      temp.pop();
      slidechain('/').then(() => {
        slidechain(temp.join('/')).then(() => {
          slidechain(path, { productIdx: temp.pop() });
        });
      });
      break;
    case 'chatdetail':
      temp = path.split('/');
      if (temp.length === 3) {
        slidechain('/').then(() => {
          slidechain('/menu').then(() => {
            let path2 = path.split('/');
            slidechain(path, { roomIdx: path2.pop(), type: 'A' });
          });
        });
      } else if (temp.length === 5) {
        slidechain('/').then(() => {
          let productIdx = temp[2];
          let roomIdx = temp[4];
          slidechain(`/product/${productIdx}`, { productIdx }).then(() => {
            api.sendPost('/chat/getType', { roomIdx }).then((result) => {
              if (result.type === 'N') {
                new Snackbar({
                  msg: '존재하지 않는 채팅방입니다',
                  duration: 1000,
                });
                return;
              }
              if (result.type === 'C') {
                slidechain(path, { productIdx, roomIdx, type: result.type });
              }
              if (result.type === 'S') {
                slidechain(`/product/${productIdx}/productchatlist`, {
                  productIdx,
                  roomIdx,
                  type: result.type,
                }).then(() => {
                  slidechain(path, { productIdx, roomIdx, type: result.type });
                });
              }
            });
          });
        });
      }
      break;
    case 'newpost':
      temp = path.split('/');

      if (temp.length === 2) {
        slidechain('/').then(() => {
          slidechain(path);
        });
      }

      if (temp.length === 4) {
        slidechain('/').then(() => {
          slidechain(path, { productIdx: temp.pop() });
        });
      }
      break;
    default:
      console.log('not exist url');
  }
}

const slidechain = (url, condition) => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      resolve(slideIn(url, false, condition));
    }, 100);
  });
};
