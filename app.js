const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

// MIDDLEWARES
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
app.use(allowCrossDomain);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'test'
  });

connection.connect();

app.post('/login', (req,res) => {
    const user = req.body.username;
    const pass = req.body.password;
    connection.query(`SELECT * FROM users WHERE username = "${user}"`, function (error, results, fields) {
        if (error){
            console.log(error);
        }else{
            if(results[0].password == pass)
                res.send(true);
            else
                res.send(false);
        }  
    });
});

app.post('/signup', (req,res) => {
    const user = req.body.username;
    const pass = req.body.password;
    connection.query(`SELECT * FROM users WHERE username = "${user}"`, function (error, results, fields) {
        if (error){
            console.log(error);
        }else{
            if(results.length == 0){
                connection.query(`INSERT INTO users VALUES ("${user}", "${pass}")` , function (error, results, fields) {
                    if(error){
                        console.log(error);
                        res.send(false);
                    }else {
                        console.log(true);
                        res.send(true);
                    }    
                });

            }
            else{
                console.log(false);
                res.send('already exist');
            }
        }  
    });
});

app.post
const port = process.env.PORT || 3000;
app.listen(port);
