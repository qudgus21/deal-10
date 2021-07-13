import express from 'express';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import cors from "cors";
import userRouter from './routes/userRouter.js'

const app = express();
dotenv.config();

const __dirname = path.resolve();
app.set('views', path.join(__dirname, '/views'));
app.use(cors())

app.use(
  session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));;

app.use('/public', express.static(__dirname + '/public'));

app.use('/user', userRouter)


app.listen(process.env.PORT || 8080, () => {
  console.log('server is runnig');
});