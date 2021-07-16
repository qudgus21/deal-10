import { Router } from 'express';
import product from '../controllers/product.js';
import category from '../controllers/category.js';

const productRouter = Router();

productRouter.post('/getProducts', (req, res) => {
  product
    .getProducts()
    .then((rows) => {
      res.json({ status: 'ok', data: rows });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

productRouter.post('/categoryProducts', (req, res) => {
  const params = req.body;

  product
    .categoryProducts(params)
    .then((rows) => {
      category.info(params).then((category) => {
        res.json({
          status: 'ok',
          data: { category: category[0], products: rows },
        });
      });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

productRouter.post('/products', (req, res) => {
  const params = req.body;
  product
    .products(params)
    .then((rows) => {
      res.json({
        status: 'ok',
        data: rows,
      });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

export default productRouter;
