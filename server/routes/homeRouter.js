import { Router } from 'express';
import home from '../controllers/home.js';

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
  console.log('홈라우트');
  res.render('index.html');
});

export default homeRouter;
