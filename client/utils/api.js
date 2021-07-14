const apiHost = 'http://localhost:8080';

const api = {
  sendPost(url, params = {}) {
    let headers = { 'Content-Type': 'application/json' };
    url = apiHost + url;

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
