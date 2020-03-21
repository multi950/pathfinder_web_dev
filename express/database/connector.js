const mysql = require('mysql');
/** 
const databaseCredentials = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pfc'
};
*/

 const databaseCredentials = {
  host: 'den1.mysql2.gear.host',
  user: 'pathfindercc',
  password: 'Xs8PZ?2~8V7m',
  database: 'pathfindercc'
};
 
const connection = mysql.createConnection(databaseCredentials);

module.exports = databaseCredentials;
module.exports = connection;