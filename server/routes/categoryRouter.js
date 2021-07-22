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

categoryRouter.post('/info', (req, res) => {
  const params = req.body;

  category
    .info(params)
    .then((ctr) => {
      category.products(params).then((products) => {
        res.json({ status: 'ok', data: { category: ctr[0], products } });
      });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

categoryRouter.post('/isCategory', (req, res) => {
  const params = req.body;
  category
    .isCategory(params)
    .then((isCategory) => {
      res.json({ status: 'ok', data: isCategory });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

export default categoryRouter;
