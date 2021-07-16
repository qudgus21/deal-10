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

  categoryProducts: (params) => {
    let sql = `
      select p.idx as idx, userId, title, description, price, imgUrls, IFNULL(likeCnt,0) as likeCnt , ${
        params.userIdx
          ? `IF(IFNULL(likeProduct,0) > 0, 'Y', 'N') as isLike,`
          : ``
      }
      IFNULL(chatCnt,0) as chatCnt , location, CASE
      WHEN TIMESTAMPDIFF(SECOND,p.updateDate ,NOW() ) < 60 THEN concat(TIMESTAMPDIFF(SECOND, p.updateDate, NOW()), '초 전')
      WHEN TIMESTAMPDIFF(MINUTE, p.updateDate,NOW()  ) < 60 THEN concat(TIMESTAMPDIFF(MINUTE, p.updateDate, NOW()), '분 전')
      WHEN TIMESTAMPDIFF(HOUR , p.updateDate,NOW()  ) < 24 THEN concat(TIMESTAMPDIFF(HOUR, p.updateDate, NOW()), '시간 전')
      WHEN TIMESTAMPDIFF(DAY , p.updateDate,NOW()  ) < 30 THEN concat(TIMESTAMPDIFF(DAY, p.updateDate, NOW()), '일 전')
      WHEN TIMESTAMPDIFF(MONTH , p.updateDate,NOW()  ) < 12 THEN concat(TIMESTAMPDIFF(MONTH, p.updateDate, NOW()), '달 전')
      ELSE concat(TIMESTAMPDIFF(YEAR , p.updateDate, NOW()), '년 전') END as agoTime
      from products p
      left join (
      select products.idx as idx, count(products.idx) as likeCnt
      from products
      join likes on products.idx = likes.productId
      where category=${params.categoryIdx} && likes.status='Y'
      group by (products.idx)
      ) l on p.idx = l.idx
      ${
        params.userIdx
          ? `
      left join (
        select products.idx as likeProduct
        from products
        left join likes on products.idx = likes.productId
        where category=${params.categoryIdx} && likes.userId=${params.userIdx} && likes.status='Y'
        ) ll on ll.likeProduct =  p.idx
      `
          : ``
      }
      left join (
      select products.idx as idx, count(products.idx) as chatCnt
      from products
      join chattings on chattings.productId = products.idx
      where category=${params.categoryIdx}
      group by (products.idx)
      ) c on c.idx = p.idx
      left join users u on p.userId = u.idx
      where category=${params.categoryIdx}
      order by p.updateDate desc
    `;

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

  products: (params) => {
    let sql = `
        select p.idx as idx, userId, title, description, price, imgUrls, IFNULL(likeCnt,0) as likeCnt ,${
          params.userIdx
            ? `IF(IFNULL(likeProduct,0) > 0, 'Y', 'N') as isLike,`
            : ``
        }
        IFNULL(chatCnt,0) as chatCnt , location, CASE
        WHEN TIMESTAMPDIFF(SECOND,p.updateDate ,NOW() ) < 60 THEN concat(TIMESTAMPDIFF(SECOND, p.updateDate, NOW()), '초 전')
        WHEN TIMESTAMPDIFF(MINUTE, p.updateDate,NOW()  ) < 60 THEN concat(TIMESTAMPDIFF(MINUTE, p.updateDate, NOW()), '분 전')
        WHEN TIMESTAMPDIFF(HOUR , p.updateDate,NOW()  ) < 24 THEN concat(TIMESTAMPDIFF(HOUR, p.updateDate, NOW()), '시간 전')
        WHEN TIMESTAMPDIFF(DAY , p.updateDate,NOW()  ) < 30 THEN concat(TIMESTAMPDIFF(DAY, p.updateDate, NOW()), '일 전')
        WHEN TIMESTAMPDIFF(MONTH , p.updateDate,NOW()  ) < 12 THEN concat(TIMESTAMPDIFF(MONTH, p.updateDate, NOW()), '달 전')
        ELSE concat(TIMESTAMPDIFF(YEAR , p.updateDate, NOW()), '년 전') END as agoTime
        from products p
        left join (
        select products.idx as idx, count(products.idx) as likeCnt
        from products
        join likes on products.idx = likes.productId
        where likes.status='Y'
        group by (products.idx)
        ) l on p.idx = l.idx
        ${
          params.userIdx
            ? `
        left join (
          select products.idx as likeProduct
          from products
          left join likes on products.idx = likes.productId
          where likes.userId=${params.userIdx} && likes.status='Y'
          ) ll on ll.likeProduct =  p.idx
        `
            : ``
        }
        left join (
        select products.idx as idx, count(products.idx) as chatCnt
        from products
        join chattings on chattings.productId = products.idx
        group by (products.idx)
        ) c on c.idx = p.idx
        left join users u on p.userId = u.idx
        order by p.updateDate desc
  `;

    console.log(sql);
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
