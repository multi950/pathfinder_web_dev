const mysql = require('mysql');

const databaseCredentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB
};

const connection = mysql.createConnection(databaseCredentials);

module.exports = databaseCredentials;
module.exports = connection;