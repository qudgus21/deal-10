import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qudgus423!',
  // password: 'rootroot',
  timezone: 'Asia/Seoul',
  database: 'woowamarket',
});

export default db;
