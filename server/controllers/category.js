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

  info: (params) => {
    let sql = `select * from categories where idx=${params.categoryIdx}`;
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

  products: (params) => {
    let sql = `select * from products where category=${params.categoryIdx}`;
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

  findIdxbyName: (params) => {
    let sql = `select * from categories where name='${params.category}'`;
    return new Promise((resolve, reject) => {
      db.promise()
        .query(sql)
        .then(([rows, fileds]) => {
          return resolve(rows[0].idx.toString());
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },
};

export default category;
