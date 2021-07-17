import { Router } from 'express';
import product from '../controllers/product.js';
import category from '../controllers/category.js';

import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// const upload = multer({ dest: 'upload/' });

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

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// let upload = multer({ storage: storage });

// productRouter.post('/newpost', multerProduct.single('img'), (req, res) => {
//   const params = Object.assign({}, req.body);
//   console.log(params);
//   console.log(req.file);
//   res.json({
//     status: 'ok',
//   });
// });
export default productRouter;
