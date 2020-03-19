const mysql = require('mysql');

const databaseCredentials = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pfc'
};

const connection = mysql.createConnection(databaseCredentials);

module.exports = databaseCredentials;
module.exports = connection;