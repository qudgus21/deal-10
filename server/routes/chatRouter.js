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
    });
    return rows;
  });

  let customers = await chat.chatAsCustomer(params).then((rows) => {
    rows.forEach((row) => {
      row.conversation = JSON.parse(row.conversation);
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
        result.myType = 'S';
        res.json({
          status: 'ok',
          data: result,
        });
      });
    } else if (position === 'customer') {
      chat.roomAsCustomer(params).then((result) => {
        result.myType = 'C';
        res.json({
          status: 'ok',
          data: result,
        });
      });
    }
  });
});

export default chatRouter;
