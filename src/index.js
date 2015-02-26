var express = require('express');

// Constants
var PORT = 8080;

// App
var app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n' + process.env.DB_ENV_MYSQL_ROOT_PASSWORD);
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
