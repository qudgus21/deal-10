import { Router } from 'express';
import user from '../controllers/user.js';

const userRouter = Router();

userRouter.post('/login', (req, res) => {
  const params = req.body;
  user
    .findUser(params)
    .then((rows) => {
      if (!rows.length) {
        res.json({ status: 'fail', message: '일치하는 유저가 없습니다.' });
      } else {
        const user = rows[0];
        if (!req.session.user) {
          req.session.user = user.id;
        }
        res.json({ status: 'ok', data: user });
      }
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

userRouter.post('/register', (req, res) => {
  const params = req.body;
  user
    .findUser(params)
    .then((rows) => {
      if (rows.length) {
        res.json({ status: 'fail', message: '존재하는 아이디 입니다.' });
      } else {
        user.register(params).then((rows) => {
          res.json({ status: 'ok' });
        });
      }
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

userRouter.post('/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy();
  }
  res.json({ status: 'ok' });
});

userRouter.post('/getInfo', (req, res) => {
  const params = req.body;
  user
    .getInfo(params)
    .then((rows) => {
      res.json({ status: 'ok', data: rows[0] });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

userRouter.post('/setLocation', (req, res) => {
  const params = req.body;
  user
    .setLocation(params)
    .then((rows) => {
      res.json({ status: 'ok', data: rows });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

export default userRouter;
