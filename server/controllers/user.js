import db from '../db.js';

const user = {
  register: async (params) => {
    let sql = `select * from users where idx=${params.userIdx}`;

    return new Promise((resolve, reject) => {
      db.promise()
        .query(sql)
        .then(([rows, fileds]) => {
          return resolve(rows);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },

  login: (params) => {
    let sql = `select * from users where id='${params.userId}'`;
    return new Promise((resolve, reject) => {
      db.promise()
        .query(sql)
        .then(([rows, fileds]) => {
          return resolve(rows);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },
};

export default user;
