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
      ELSE concat(TIMESTAMPDIFF(YEAR , p.updateDate, NOW()), '년 전') END as agoTime , status
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
    let locationPart = `
    `;
    if (params.location && params.location.length) {
      locationPart = params.location.reduce((arr, cur) => {
        return arr + ` json_contains(u.location, '["${cur}"]') or`;
      }, 'where');
      locationPart = locationPart.slice(0, locationPart.length - 3);
    }

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

        ${
          params.location
            ? `
          left join (
            select *
            from users u
            ${locationPart}
            ) u on p.userId = u.idx
          `
            : `
          left join users u on p.userId = u.idx
          `
        }
        

        ${params.isSale ? `` : `where p.status = 'S' or p.status = 'R'`}
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

  newpost: (params) => {
    let sql = `insert into products(userId, title, description, ${
      params.price !== '' ? `price,` : ``
    } imgUrls, category, status) values(${params.userIdx},'${params.title}','${
      params.description
    }',${params.price !== '' ? `${params.price},` : ``}'${JSON.stringify(
      params.imgUrls
    )}',${params.category},'S');`;

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

  userIncludeDetail: (params) => {
    return new Promise(async (resolve, reject) => {
      let sqlIsSaler = `select IF(count(*) =0 ,'N','Y') as isSaler
        from products
        where idx=${params.productIdx} and userId=${params.userIdx};`;

      let sqlIsLike = `select IF(count(*) =0 ,'N','Y') as isLike
        from likes
        where productId=${params.productIdx} and userId=${params.userIdx} and status='Y';`;

      let data1 = await db
        .promise()
        .query(sqlIsSaler)
        .then((rows) => {
          return rows[0];
        });

      let data2 = await db
        .promise()
        .query(sqlIsLike)
        .then((rows) => {
          return rows[0];
        });

      return resolve({
        isSaler: data1[0].isSaler,
        isLike: data2[0].isLike,
      });
    });
  },

  productDetail: (params) => {
    let sql = `
      select p.idx as productIdx, title, description, price, imgUrls, userId as userIdx, id as userId, location, name as category , IfNULL(viewCnt,0) as viewCnt
    , IfNULL(likeCnt,0) as likeCnt,IfNULL(chatCnt,0) as chatCnt, p.status as status  ,CASE
      WHEN TIMESTAMPDIFF(SECOND,p.updateDate ,NOW() ) < 60 THEN concat(TIMESTAMPDIFF(SECOND, p.updateDate, NOW()), '초 전')
      WHEN TIMESTAMPDIFF(MINUTE, p.updateDate,NOW()  ) < 60 THEN concat(TIMESTAMPDIFF(MINUTE, p.updateDate, NOW()), '분 전')
      WHEN TIMESTAMPDIFF(HOUR , p.updateDate,NOW()  ) < 24 THEN concat(TIMESTAMPDIFF(HOUR, p.updateDate, NOW()), '시간 전')
      WHEN TIMESTAMPDIFF(DAY , p.updateDate,NOW()  ) < 30 THEN concat(TIMESTAMPDIFF(DAY, p.updateDate, NOW()), '일 전')
      WHEN TIMESTAMPDIFF(MONTH , p.updateDate,NOW()  ) < 12 THEN concat(TIMESTAMPDIFF(MONTH, p.updateDate, NOW()), '달 전')
      ELSE concat(TIMESTAMPDIFF(YEAR , p.updateDate, NOW()), '년 전') END as updateDate
      from products p
      left join (
      select u.idx, u.id, u.location
      from products ip
      left join users u on ip.userId = u.idx
      where ip.idx=${params.productIdx}
      ) i on i.idx = p.userId
      left join(
          select productId, count(*) as likeCnt
          from likes
          where productId = ${params.productIdx}
      ) l on l.productId = p.idx
      left join (
          select productId, count(*) as chatCnt
          from chattings
          where productId=${params.productIdx}
      ) c on c.productId = p.idx
      left join (
          select productId, count(*) as viewCnt
          from views
          where productId=${params.productIdx}
      ) v on v.productId = p.idx
      left join categories on categories.idx = p.category
      where p.idx=${params.productIdx};
    `;

    return new Promise((resolve, reject) => {
      db.promise()
        .query(sql)
        .then(([rows, fields]) => {
          return resolve(rows[0]);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },

  getProduct: (params) => {
    let sql = `select * from products where idx=${params.productIdx}`;
    return new Promise((resolve, reject) => {
      db.promise()
        .query(sql)
        .then(([rows, fields]) => {
          return resolve(rows[0]);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },

  update: (params) => {
    let sql = `update products set title='${params.title}',category=${
      params.categoryIdx
    },${
      params.price !== '' ? `price=${params.price},` : `price=NULL,`
    } description='${params.description}',imgUrls='${
      params.imgUrls
    }' where idx=${params.productIdx}`;

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

  delete: (params) => {
    return new Promise(async (resolve, reject) => {
      let chattings = `delete from chattings where productId=${params.productIdx}`;

      let likes = `delete from likes where productId=${params.productIdx}`;

      let products = `delete from products where idx=${params.productIdx}`;

      let views = `delete from views where productId=${params.productIdx}`;

      let data1 = await db
        .promise()
        .query(chattings)
        .then((rows) => {
          return rows[0];
        });

      let data2 = await db
        .promise()
        .query(likes)
        .then((rows) => {
          return rows[0];
        });

      let data3 = await db
        .promise()
        .query(products)
        .then((rows) => {
          return rows[0];
        });

      let data4 = await db
        .promise()
        .query(views)
        .then((rows) => {
          return rows[0];
        });

      return resolve({});
    });
  },

  changeState: (params) => {
    let sql = `update products set status='${params.status}' where idx=${params.productIdx}`;

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

  isView: (params) => {
    let sql = `select * from views where userId=${params.userIdx} and productId=${params.productIdx}`;

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

  registerView: (params) => {
    let sql = `insert into views (userId, productId) values (${params.userIdx}, ${params.productIdx})`;

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
