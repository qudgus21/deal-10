const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.set('views', path.join(__dirname, '/views'));

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

// app.use('/auth', viewRouter)

app.listen(process.env.PORT || 8080, () => {
  console.log('server is runnig');
});