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
    let page2 = paths.pop();
    if (page2 === 'category') {
      return 'categorydetail';
    } else if (page2 === 'product') {
      return 'productdetail';
    } else if (page2 === 'newpost') {
      return 'newpost';
    } else if (page2 === 'chatting') {
      return 'chatdetail';
    } else {
    }
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

export const timeForToday = (value) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};
