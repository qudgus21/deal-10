export const arrDiff = (arr1, arr2) => {
  arr2.forEach((item) => {
    let idx = arr1.indexOf(item);
    if (idx >= 0) {
      arr1.splice(idx, 1);
    }
  });
  return arr1;
};
