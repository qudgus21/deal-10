import { Router } from 'express';
import category from '../controllers/category.js';

const categoryRouter = Router();

categoryRouter.post('/getCategorys', (req, res) => {
  category
    .getCategorys()
    .then((rows) => {
      res.json({ status: 'ok', data: rows });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

export default categoryRouter;
