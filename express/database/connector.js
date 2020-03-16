const mysql = require('mysql');

const databaseCredentials = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sakila'
};

const connection = mysql.createConnection(databaseCredentials);

module.exports = databaseCredentials;
module.exports = connection;