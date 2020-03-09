const mysql = require('mysql');

const databaseCredentials = {
  host: 'localhost',
  user: '',
  password: '',
  database: ''
};

const connection = mysql.createConnection(databaseCredentials);

module.exports = databaseCredentials;
module.exports = connection;