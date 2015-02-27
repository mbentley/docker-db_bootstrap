var express = require('express');
var mysql = require('mysql');

// Constants
var PORT = 8080;
var db = mysql.createPool({
  host     : process.env.DB_PORT_3306_TCP_ADDR,
  user     : 'root',
  password : process.env.DB_ENV_MYSQL_ROOT_PASSWORD,
  database : 'classicmodels'
});

// App
var app = express();
app.get('/', function (req, res) {
  db.getConnection(function (err,connection) {
    if (!err){
      connection.query('SELECT * from employees where jobTitle = "President"', function(err, rows, fields) {
        if (!err){
          res.send(rows);
        }
        else{
          res.send('Error while performing Query.');
          console.log('DB Query - ERROR');
        }
      });
      connection.release();
    }
    else{
      res.send('Error connecting to the database.');
      console.log('DB connect - ERROR');
    }
  });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
