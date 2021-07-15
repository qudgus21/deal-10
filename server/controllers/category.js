import db from '../db.js';

const category = {
  getCategorys: (params) => {
    let sql = `select * from categories`;
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

export default category;
