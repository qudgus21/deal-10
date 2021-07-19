import ProductDetail from '../pages/SaleProductDetail/ProductDetail';
import { slideOut } from './slide';

export const selectLatestElement = (parent, cls) => {
  return Array.from(parent.querySelectorAll(cls)).pop();
};

export const getPageName = (path) => {
  let paths = path.split('/');
  let page = paths.pop();

  if (page == '') {
    return 'home';
  } else if (isNaN(Number(page))) {
    return page;
  } else {
    if (paths[0] === 'category') {
      return 'categorydetail';
    } else if (paths[0] === 'product') {
      return 'productdetail';
    } else if (paths[0] === 'newpost') {
      return 'newpost';
    } else if (paths[0] === 'chatting') {
      return 'chatdetail';
    }
    // return paths.pop();
  }
};

export const setCookie = (cookie_name, value, days) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + days);

  var cookie_value =
    escape(value) + (days == null ? '' : '; expires=' + exdate.toUTCString());
  document.cookie = cookie_name + '=' + cookie_value;
};

export const getCookie = (cookie_name) => {
  var x, y;
  var val = document.cookie.split(';');

  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf('='));
    y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, '');
    if (x == cookie_name) {
      return unescape(y);
    }
  }
};

export const isLogin = () => {
  if (!getCookie('user')) {
    return false;
  } else {
    return true;
  }
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
