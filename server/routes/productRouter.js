import { Router } from 'express';
import product from '../controllers/product.js';
import category from '../controllers/category.js';
import like from '../controllers/like.js';
import user from '../controllers/user.js';
import { arrDiff } from '../helper.js';
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
        let filtered = rows.filter((row) => {
          return row.status !== 'C';
        });

        res.json({
          status: 'ok',
          data: { category: category[0], products: filtered },
        });
      });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

productRouter.post('/products', (req, res) => {
  const params = req.body;
  if (params.userIdx && params.isHome) {
    user.getInfo(params).then((rows) => {
      params.location = rows[0].location;
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
  } else {
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
  }
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

productRouter.post('/toggleLike', (req, res) => {
  const params = req.body;

  like.isLike(params).then((rows) => {
    if (!rows.length) {
      like.insertLike(params).then((result) => {
        res.json({
          status: 'ok',
        });
      });
    } else {
      like.deleteLike(rows[0]).then((result) => {
        res.json({
          status: 'ok',
        });
      });
    }
  });
});

productRouter.post('/detail', (req, res) => {
  const params = req.body;

  product.productDetail(params).then((rows) => {
    if (params.userIdx) {
      product.userIncludeDetail(params).then((user) => {
        res.json({
          status: 'ok',
          data: Object.assign(rows, user),
        });
      });
    } else {
      res.json({
        status: 'ok',
        data: rows,
      });
    }
  });
});

productRouter.post('/productDetail', (req, res) => {
  const params = req.body;

  product
    .productDetail(params)
    .then((rows) => {
      category.getCategorys(params).then((categorys) => {
        user.getInfo(params).then((user) => {
          res.json({
            status: 'ok',
            data: { categorys, product: rows, user: user[0] },
          });
        });
      });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

productRouter.post('/update', uploadImage, (req, res) => {
  const params = req.body;
  product.getProduct(params).then((productitem) => {
    let newUrls = arrDiff(productitem.imgUrls, JSON.parse(params.cancleList));
    req.files.forEach((file) => {
      newUrls = newUrls.concat(file.location);
    });
    newUrls = JSON.stringify(newUrls);
    params.imgUrls = newUrls;
    category.findIdxbyName(params).then((categoryIdx) => {
      params.categoryIdx = categoryIdx;
      product.update(params).then((result) => {
        res.json({
          status: 'ok',
        });
      });
    });
  });
});

productRouter.post('/delete', (req, res) => {
  const params = req.body;
  product
    .delete(params)
    .then((rows) => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

productRouter.post('/changeState', (req, res) => {
  const params = req.body;

  product
    .changeState(params)
    .then((rows) => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
});

productRouter.post('/view', (req, res) => {
  const params = req.body;

  product.isView(params).then((rows) => {
    if (!rows.length) {
      product.registerView(params).then((result) => {
        res.json({ status: 'ok' });
      });
    } else {
      res.json({ status: 'ok' });
    }
  });
});

productRouter.post('/isOwner', (req, res) => {
  const params = req.body;

  product.isOwner(params).then((isOwner) => {
    res.json({
      status: 'ok',
      data: isOwner ? true : false,
    });
  });
});

productRouter.post('/isProduct', (req, res) => {
  const params = req.body;
  product.isProduct(params).then((isProduct) => {
    res.json({
      status: 'ok',
      data: isProduct ? true : false,
    });
  });
});
export default productRouter;
