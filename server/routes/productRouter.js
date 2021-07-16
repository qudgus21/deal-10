import { Router } from 'express';
import product from '../controllers/product.js';

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
      res.json({ status: 'ok', data: rows });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

// productRouter.post('/details', (req, res) => {
//   product
//     .getProducts()
//     .then((rows) => {
//       res.json({ status: 'ok', data: rows });
//     })
//     .catch(() => {
//       res.json({ status: 'error' });
//     });
// });

export default productRouter;
