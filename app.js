const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = 5000;

app.listen(port, () => console.log('Listening on port 5000'));

app.use(express.urlencoded({
    extended: false
  }));

  app.use(express.json());

app.use(express.static('public'));

//Templating Engine
app.engine('hbs',exphbs({extname:'.hbs'}));
app.set('view engine','hbs');


const pool = mysql.createPool({
    connectionLimit :100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    database        : process.env.DB_NAME


});
pool.getConnection((err,connection) => {
 if (err) throw err;
 console.log('Connected as ID' + connection.threadId);
});
const routes = require('./server/routes/user');
app.use('/',routes);


