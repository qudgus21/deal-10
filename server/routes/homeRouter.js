import { Router } from 'express';
import home from '../controllers/home.js';

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
  res.render('index.html');
});

export default homeRouter;
