import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  timezone: process.env.DB_TIMEZONE,
  database: process.env.DB_DATABASE,
});

export default db;
