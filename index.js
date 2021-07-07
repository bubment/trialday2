const express = require("express");
const async = require("async");
const fetch = require('node-fetch');
const mysql = require('mysql');

const PORT = 1337

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'testuser',
    password : 'testpassword',
    database : 'trialday2'
  });

let app = express();

app.use(express.static('./frontend/dist'));
app.use(express.json());


app.get("/getPosts",(req,res)=>{
    connection.connect();
    connection.query('SELECT u.username,p.id,p.title,p.body FROM post p LEFT JOIN user u ON u.id = p.userId', function (error, results, fields) {
        if(error){
            res.status(503).json({eventCode:1})
        }else{
            res.status(200).json({posts:results})
        }
        
      });
      connection.end();
})


app.listen(PORT, ()=>{
    console.log(`App is running on port http://localhost:${PORT}.`)
})