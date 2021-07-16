import { getCookie } from './helper';

const apiHost = 'http://localhost:3000';

const api = {
  sendPost(url, params = {}) {
    let headers = { 'Content-Type': 'application/json' };
    url = apiHost + url;
    let userIdx = getCookie('userIdx');
    if (userIdx) params.userIdx = userIdx;

    return new Promise((resolve, reject) =>
      fetch(url, {
        method: 'post',
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(params),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          return resolve(json);
        })
        .catch(function (error) {
          return reject(error);
        })
    );
  },
};

export default api;
