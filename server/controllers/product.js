import db from '../db.js';

const product = {
  getProducts: (params) => {
    let sql = `select * from products order by updateDate desc limit 10`;
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

export default product;
