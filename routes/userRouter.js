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

export default userRouter;
