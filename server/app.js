import express from 'express';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import homeRouter from './routes/homeRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import productRouter from './routes/productRouter.js';

const app = express();
dotenv.config();
const __dirname = path.resolve();

app.use(cors());

app.use(
  session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));

app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

app.use((req, res) => {
  const rightPath = ['/test'];
  if (rightPath.includes(req.path)) {
    res.render('index.html');
  } else {
    res.render('error.html');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('server is runnig');
});
