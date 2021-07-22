import { isLogin } from './helper';
import api from './api';

const conditions = {
  home: () => {
    return 'ok';
  },
  menu: () => {
    if (!isLogin()) {
      return '로그인 후 이용해주세요';
    } else {
      return 'ok';
    }
  },
  MyAccount: () => {
    if (!isLogin()) {
      return '로그인 먼저 해주세요';
    } else {
      return 'ok';
    }
  },
  login: () => {
    if (isLogin()) {
      return '로그인 되어있습니다';
    } else {
      return 'ok';
    }
  },
  register: () => {
    if (isLogin()) {
      return '로그인 되어있습니다';
    } else {
      return 'ok';
    }
  },
  notfound: () => {
    return 'ok';
  },

  category: () => {
    return 'ok';
  },
  categorydetail: (conditionObj) => {
    if (!isLogin()) {
      return '로그인 먼저 해주세요';
    }

    if (conditionObj === undefined) {
      return 'ok';
    } else {
      return new Promise((resolve, reject) => {
        api
          .sendPost('/category/isCategory', {
            categoryIdx: conditionObj.categoryIdx,
          })
          .then((result) => {
            console.log(result);
            if (result.data) {
              return resolve('ok');
            } else {
              return resolve('존재하지 않는 카테고리입니다.');
            }
          });
      });
    }
  },

  location: () => {
    if (!isLogin()) {
      return '로그인 먼저 해주세요';
    } else {
      return 'ok';
    }
  },

  productdetail: (conditionObj) => {
    if (!isLogin()) {
      return '로그인 먼저 해주세요';
    }

    if (conditionObj === undefined) {
      return 'ok';
    } else {
      return new Promise((resolve, reject) => {
        api
          .sendPost('/product/isProduct', {
            productIdx: conditionObj.productIdx,
          })
          .then((result) => {
            if (result.data) {
              return resolve('ok');
            } else {
              return resolve('존재하지 않는 상품입니다.');
            }
          });
      });
    }
  },

  productchatlist: (conditionObj) => {
    if (!isLogin()) {
      return '로그인 먼저 해주세요';
    } else {
      if (conditionObj === undefined) {
        return 'ok';
      } else {
        return new Promise((resolve, reject) => {
          api
            .sendPost('/product/isOwner', {
              productIdx: conditionObj.productIdx,
            })
            .then((result) => {
              if (result.data) {
                return resolve('ok');
              } else {
                return resolve('본인 소유의 게시물이 아닙니다.');
              }
            });
        });
      }
    }
  },

  chatdetail: (conditionObj) => {
    if (!isLogin()) {
      return '로그인 먼저 해주세요';
    }

    if (conditionObj === undefined) {
      return 'ok';
    } else {
      switch (conditionObj.type) {
        case 'A':
          return new Promise((resolve, reject) => {
            api
              .sendPost('/chat/isRoomParticipant', {
                roomIdx: conditionObj.roomIdx,
              })
              .then((result) => {
                if (result.isParticipant) {
                  return resolve('ok');
                } else {
                  return resolve('해당 채팅방의 참여자가 아닙니다');
                }
              });
          });
          break;
        case 'C':
          return new Promise((resolve, reject) => {
            api
              .sendPost('/chat/isRoomByProduct', {
                roomIdx: conditionObj.roomIdx,
                productIdx: conditionObj.productIdx,
              })
              .then((result) => {
                if (result.isRoom) {
                  return resolve('ok');
                } else {
                  return resolve('해당하는 채팅방이 없습니다');
                }
              });
          });
          break;
        case 'S':
          return new Promise((resolve, reject) => {
            api
              .sendPost('/chat/isRoomByProduct', {
                roomIdx: conditionObj.roomIdx,
                productIdx: conditionObj.productIdx,
              })
              .then((result) => {
                if (result.isRoom) {
                  return resolve('ok');
                } else {
                  return resolve('해당하는 채팅방이 없습니다');
                }
              });
          });
          break;
        default:
          return '권한이 없습니다';
      }
    }
  },

  newpost: (conditionObj) => {
    if (!isLogin()) {
      return '로그인 먼저 해주세요';
    }
    if (conditionObj === undefined) {
      return 'ok';
    } else {
      return new Promise((resolve, reject) => {
        api
          .sendPost('/product/checkOwner', {
            productIdx: conditionObj.productIdx,
          })
          .then((result) => {
            if (result.message === 'ok') {
              return resolve('ok');
            } else {
              return resolve(result.message);
            }
          });
      });
    }
  },

  location: () => {
    if (!isLogin()) {
      return '로그인 먼저 해주세요';
    }
    return 'ok';
  },
};

export default conditions;
