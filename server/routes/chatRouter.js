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
    });
    return rows;
  });

  let customers = await chat.chatAsCustomer(params).then((rows) => {
    rows.forEach((row) => {
      row.conversation = JSON.parse(row.conversation);
      row.conversation.sort((a, b) => {
        return new Date(b.registerDate) - new Date(a.registerDate);
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
      res.json({ status: 'ok' });
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
      console.log(rows);
      res.json({ status: 'ok', data: rows });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

export default chatRouter;
