export const selectLatestElement = (parent, cls) => {
  return Array.from(parent.querySelectorAll(`.${cls}`)).pop();
};

export const getPageName = (path) => {
  let paths = path.split('/');
  let page = paths.pop();

  if (page == '') {
    return 'home';
  } else if (isNaN(Number(page))) {
    return page;
  } else {
    return paths.pop();
  }
};
