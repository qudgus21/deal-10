import db from '../db.js';

const user = {
  findUser: (params) => {
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

  register: (params) => {
    let location = [params.location];
    let sql = `insert into users (id,location) values ('${
      params.userId
    }', '${JSON.stringify(location)}');`;
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

  getInfo: (params) => {
    let sql = `select * from users where idx='${params.userIdx}'`;
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

  setLocation: (params) => {
    let sql = `update users set location = '${JSON.stringify(
      params.location
    )}' where idx='${params.userIdx}'`;
    return new Promise((resolve, reject) => {
      db.promise()
        .query(sql)
        .then(([rows, fields]) => {
          return resolve(rows);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },
};

export default user;
