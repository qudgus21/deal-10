import { Router } from 'express';
import product from '../controllers/product.js';
import category from '../controllers/category.js';
import { uploadImage } from '../middleware.js';

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

productRouter.post('/newpost', uploadImage, (req, res) => {
  const params = Object.assign({}, req.body);

  category.findIdxbyName(params).then((categoryIdx) => {
    let imgUrls = [];
    req.files.forEach((imgResult) => {
      imgUrls.push(imgResult.location);
    });
    params.category = categoryIdx;
    params.imgUrls = imgUrls;

    product.newpost(params).then((result) => {
      res.json({
        status: 'ok',
        productIdx: result.insertId,
      });
    });
  });
});
export default productRouter;
