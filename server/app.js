import express from 'express';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import homeRouter from './routes/homeRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import productRouter from './routes/productRouter.js';
import chatRouter from './routes/chatRouter.js';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

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
app.use('/chat', chatRouter);

let clients = [];

io.sockets.on('connection', function (socket) {
  socket.on('newUserChatInfo', function (info) {
    let clientInfo = {
      ...info,
      clientId: socket.id,
    };
    clients.push(clientInfo);
    console.log(`user${info.myIdx}번님이 ${info.roomIdx}방에 입장하셨습니다.`);
  });

  socket.on('disconnect', function () {
    console.log(`방에서 나가셨습니다.`);
  });

  socket.on('message', function (message) {
    let target = clients.filter((c) => {
      if (
        message.data.opponentIdx === c.myIdx &&
        message.data.roomIdx === c.roomIdx
      ) {
        return c;
      }
    });
    console.log(target[0]);
    console.log(message.data.content);
    io.to(target[0].clientId).emit('update', message.data.content);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('server is runnig');
});
