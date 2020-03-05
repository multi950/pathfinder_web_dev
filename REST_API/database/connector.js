var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'websoft'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
});

module.exports = {
  saveCharacter: function(userid, json){
    connection.query('INSERT INTO Character (“JSON”, “email”) VALUES(“' + json + '”,”' + userid + '”)');
  },

  loadAncestries: function(){
    connection.query('SELECT * FROM ancestry');
  },

  loadHeritages(){
    connection.query('SELECT * FROM heritage');
  },

  loadAncestryFeats(){
    connection.query('SELECT * FROM feats INNER JOIN ancestry_has_feats AS ahf ON feat.id = ahf.feat_id');
  },

  loadBackgrounds(){
    connection.query('SELECT * FROM background');
  },

  loadClasses(){
    connection.query('SELECT * FROM class');
  },

  
}

connection.query('SELECT * FROM tech', function (error, results, fields) {
        console.log(results)
});