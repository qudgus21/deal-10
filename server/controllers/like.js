import db from '../db.js';

const like = {
  isLike: (params) => {
    let sql = `select * from likes where productId=${params.productIdx} and userId=${params.userIdx}`;
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

  insertLike: (params) => {
    let sql = `insert into likes(userId, productId, status) values(${params.userIdx}, ${params.productIdx}, 'Y')`;
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

  deleteLike: (params) => {
    let sql = `delete from likes where idx=${params.idx}`;
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

export default like;
