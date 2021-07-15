import { Router } from 'express';
import user from '../controllers/user.js';

const userRouter = Router();

userRouter.post('/register', (req, res) => {
  const params = req.body;

  user
    .register(params)
    .then((rows) => {
      //user.rows
      res.json({ status: 'ok', data: rows });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

userRouter.post('/login', (req, res) => {
  const params = req.body;

  user
    .login(params)
    .then((rows) => {
      if (rows.length) {
        res.json({ status: 'fail', message: '일치하는 유저가 없습니다.' });
      } else {
        res.json({ status: 'ok', data: rows[0] });
      }
    })
    .catch(() => {
      res.json({ status: 'ok' });
    });
});

export default userRouter;
