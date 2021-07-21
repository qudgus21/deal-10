import { Router } from 'express';
import chat from '../controllers/chat.js';
import product from '../controllers/product.js';
import user from '../controllers/user.js';
import categoryRouter from './categoryRouter.js';

const chatRouter = Router();

chatRouter.post('/listAll', async (req, res) => {
  const params = req.body;

  let salers = await chat.chatAsSaler(params).then((rows) => {
    rows.forEach((row) => {
      row.conversation = JSON.parse(row.conversation);
      row.conversation.sort((a, b) => {
        return new Date(b.registerDate) - new Date(a.registerDate);
      });
      row.conversation = row.conversation.filter((item) => {
        return item.type !== null;
      });
    });
    return rows;
  });

  let customers = await chat.chatAsCustomer(params).then((rows) => {
    rows.forEach((row) => {
      row.conversation = JSON.parse(row.conversation);

      row.conversation.sort((a, b) => {
        return new Date(b.registerDate) - new Date(a.registerDate);
      });
      row.conversation = row.conversation.filter((item) => {
        return item.type !== null;
      });
    });
    return rows;
  });

  let allArr = salers.concat(customers);
  allArr.sort((a, b) => {
    return b.updateDate - a.updateDate;
  });

  res.json({
    status: 'ok',
    data: allArr,
  });
});

chatRouter.post('/chatData', (req, res) => {
  const params = req.body;
  chat.findPosition(params).then((position) => {
    if (position === 'saler') {
      chat.roomAsSaler(params).then((result) => {
        result.conversation = JSON.parse(result.conversation);
        result.myType = 'S';
        res.json({
          status: 'ok',
          data: result,
        });
      });
    } else if (position === 'customer') {
      chat.roomAsCustomer(params).then((result) => {
        result.conversation = JSON.parse(result.conversation);
        result.myType = 'C';
        res.json({
          status: 'ok',
          data: result,
        });
      });
    }
  });
});

chatRouter.post('/chattingContent', (req, res) => {
  const params = req.body;
  chat
    .chattingContent(params)
    .then((rows) => {
      res.json({ status: 'ok', data: { insertId: rows.insertId } });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

chatRouter.post('/read', (req, res) => {
  const params = req.body;
  chat
    .getType(params)
    .then((type) => {
      params.type = type;
      chat.read(params).then((result) => {
        res.json({ status: 'ok' });
      });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

chatRouter.post('/listSaleProduct', (req, res) => {
  const params = req.body;
  chat
    .listSaleProduct(params)
    .then((rows) => {
      rows.forEach((row) => {
        row.conversation = JSON.parse(row.conversation);
        row.conversation.sort((a, b) => {
          return new Date(b.registerDate) - new Date(a.registerDate);
        });
      });
      res.json({ status: 'ok', data: rows });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

chatRouter.post('/exit', (req, res) => {
  const params = req.body;
  chat
    .exit(params)
    .then((result) => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

chatRouter.post('/question', (req, res) => {
  const params = req.body;
  chat
    .isRoom(params)
    .then((isRoom) => {
      if (isRoom.length) {
        res.json({
          status: 'ok',
          data: { isRoom: true, roomIdx: isRoom[0].idx },
        });
      } else {
        product.getProduct(params).then((p) => {
          params.saler = p.userId;
          chat.makeRoom(params).then((insertId) => {
            params.roomIdx = insertId;
            params.content = '채팅방이 개설되었습니다';
            chat.initContent(params).then((result) => {
              res.json({
                status: 'ok',
                data: { isRoom: false, roomIdx: insertId },
              });
            });
          });
        });
      }
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

chatRouter.post('/readRealTime', (req, res) => {
  const params = req.body;
  chat
    .readRealTime(params)
    .then((result) => {
      res.json({
        status: 'ok',
      });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});
export default chatRouter;
