import db from '../db.js';

const chat = {
  chatAsSaler: (params) => {
    let sql = `
      select c.idx as roomIdx, productId, saler, customer,  c.updateDate as updateDate,
       concat('[', group_concat(json_object('commentIdx', cc.idx, 'type',type,'content',content, 'registerDate', cc.registerDate)),']') as conversation,
       sum(case when salerRead='N' then 1 else 0 end) as unreadCnt , imgUrls, id
       from chattings c
       left join chatting_content cc on cc.roomIdx= c.idx
       left join products p on p.idx = productId
       left join users u on u.idx = customer
       where c.saler=${params.userIdx}
       group by c.idx;
    `;

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

  chatAsCustomer: (params) => {
    let sql = `
        select c.idx as roomIdx, productId, saler, customer,  c.updateDate as updateDate,
        concat('[', group_concat(json_object('commentIdx', cc.idx, 'type',type,'content',content, 'registerDate',cc.registerDate)),']') as conversation,
        sum(case when customer='N' then 1 else 0 end) as unreadCnt, imgUrls, id
        from chattings c
        left join chatting_content cc on cc.roomIdx= c.idx
        left join products p on p.idx = productId
        left join users u on u.idx = saler
        where c.customer=${params.userIdx}
        group by c.idx;
    `;

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

  findPosition: (params) => {
    let sql = `
    select if(customer=${params.userIdx} , 'customer', 'saler') as position
    from chattings
    where idx=${params.roomIdx}`;
    return new Promise((resolve, reject) => {
      db.promise()
        .query(sql)
        .then(([rows, fileds]) => {
          return resolve(rows[0].position);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },

  roomAsSaler: (params) => {
    let sql = `
    select c.idx as roomIdx, productId, saler, customer,  c.updateDate as updateDate,
    concat('[', group_concat(json_object('commentIdx', cc.idx, 'type',type,'content',content, 'registerDate', CASE
    WHEN TIMESTAMPDIFF(SECOND,cc.registerDate ,NOW() ) < 60 THEN concat(TIMESTAMPDIFF(SECOND, cc.registerDate, NOW()), '초 전')
    WHEN TIMESTAMPDIFF(MINUTE, cc.registerDate,NOW()  ) < 60 THEN concat(TIMESTAMPDIFF(MINUTE, cc.registerDate, NOW()), '분 전')
    WHEN TIMESTAMPDIFF(HOUR , cc.registerDate,NOW()  ) < 24 THEN concat(TIMESTAMPDIFF(HOUR, cc.registerDate, NOW()), '시간 전')
    WHEN TIMESTAMPDIFF(DAY , cc.registerDate,NOW()  ) < 30 THEN concat(TIMESTAMPDIFF(DAY, cc.registerDate, NOW()), '일 전')
    WHEN TIMESTAMPDIFF(MONTH , cc.registerDate,NOW()  ) < 12 THEN concat(TIMESTAMPDIFF(MONTH, cc.registerDate, NOW()), '달 전')
    ELSE concat(TIMESTAMPDIFF(YEAR , cc.registerDate, NOW()), '년 전') end)),']') as conversation,
    sum(case when salerRead='N' then 1 else 0 end) as unreadCnt , p.idx as productIdx, title as productTitle, description as productDescription, price as productPrice, imgUrls as productImgUrls, status as productStatus , u.idx as opponentIdx, id as opponentId
    from chattings c
    left join chatting_content cc on cc.roomIdx= c.idx
    left join products p on p.idx = productId
    left join users u on u.idx = customer
    where c.idx =${params.roomIdx}
    `;
    return new Promise((resolve, reject) => {
      db.promise()
        .query(sql)
        .then(([rows, fileds]) => {
          return resolve(rows[0]);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },

  roomAsCustomer: (params) => {
    let sql = `
    select c.idx as roomIdx, productId, saler, customer,  c.updateDate as updateDate,
    concat('[', group_concat(json_object('commentIdx', cc.idx, 'type',type,'content',content, 'registerDate', CASE
    WHEN TIMESTAMPDIFF(SECOND,cc.registerDate ,NOW() ) < 60 THEN concat(TIMESTAMPDIFF(SECOND, cc.registerDate, NOW()), '초 전')
    WHEN TIMESTAMPDIFF(MINUTE, cc.registerDate,NOW()  ) < 60 THEN concat(TIMESTAMPDIFF(MINUTE, cc.registerDate, NOW()), '분 전')
    WHEN TIMESTAMPDIFF(HOUR , cc.registerDate,NOW()  ) < 24 THEN concat(TIMESTAMPDIFF(HOUR, cc.registerDate, NOW()), '시간 전')
    WHEN TIMESTAMPDIFF(DAY , cc.registerDate,NOW()  ) < 30 THEN concat(TIMESTAMPDIFF(DAY, cc.registerDate, NOW()), '일 전')
    WHEN TIMESTAMPDIFF(MONTH , cc.registerDate,NOW()  ) < 12 THEN concat(TIMESTAMPDIFF(MONTH, cc.registerDate, NOW()), '달 전')
    ELSE concat(TIMESTAMPDIFF(YEAR , cc.registerDate, NOW()), '년 전') end)),']') as conversation,
    sum(case when salerRead='N' then 1 else 0 end) as unreadCnt , p.idx as productIdx, title as productTitle, description as productDescription, price as productPrice, imgUrls as productImgUrls, status as productStatus , u.idx as opponentIdx, id as opponentId
    from chattings c
    left join chatting_content cc on cc.roomIdx= c.idx
    left join products p on p.idx = productId
    left join users u on u.idx = saler
    where c.idx =${params.roomIdx}
    `;
    return new Promise((resolve, reject) => {
      db.promise()
        .query(sql)
        .then(([rows, fileds]) => {
          return resolve(rows[0]);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },

  chattingContent: (params) => {
    let sql = `insert into chatting_content (roomIdx, content, type, customerRead, salerRead) values (${
      params.roomIdx
    }, '${params.content}', '${params.myType}', '${
      params.myType === 'C' ? 'Y' : 'N'
    }', '${params.myType === 'S' ? 'Y' : 'N'}')`;
    return new Promise((resolve, reject) => {
      db.promise()
        .query(sql)
        .then(([rows, fileds]) => {
          return resolve(rows[0]);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },

  getType: (params) => {
    let sql = `
    select if(saler=${params.userIdx}, 'S', 'C') as type
      from chattings c
      where c.idx=${params.roomIdx};
    `;
    return new Promise((resolve, reject) => {
      db.promise()
        .query(sql)
        .then(([rows, fileds]) => {
          return resolve(rows[0].type);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },

  read: (params) => {
    let sql = `update chatting_content set ${
      params.type === 'S' ? `salerRead` : `customerRead`
    } = 'Y' where roomIdx=${params.roomIdx}`;

    return new Promise((resolve, reject) => {
      db.promise()
        .query(sql)
        .then(([rows, fileds]) => {
          return resolve(rows[0]);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },

  listSaleProduct: (params) => {
    let sql = `select c.idx as roomIdx, productId, saler, customer,  c.updateDate as updateDate,
    concat('[', group_concat(json_object('commentIdx', cc.idx, 'type',type,'content',content, 'registerDate', cc.registerDate)),']') as conversation,
    sum(case when salerRead='N' then 1 else 0 end) as unreadCnt , imgUrls, id
    from chattings c
    left join chatting_content cc on cc.roomIdx= c.idx
    left join products p on p.idx = productId
    left join users u on u.idx = customer
    where c.saler=${params.userIdx} and productId=${params.productIdx}
    group by c.idx;`;

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

export default chat;
