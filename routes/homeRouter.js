import { Router } from 'express';
import home from '../controllers/home.js';

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
  console.log('sdsd');
  res.render('index.html');
});

export default homeRouter;
