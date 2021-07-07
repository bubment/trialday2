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

  connection.connect();

let app = express();

app.use(express.static('./frontend/dist'));
app.use(express.json());


app.get("/getPosts",(req,res)=>{
    connection.query('SELECT u.username,p.id,p.title FROM post p LEFT JOIN user u ON u.id = p.userId', function (error, results, fields) {
        if(error){
            res.status(503).json({eventCode:1})
        }else{
            res.status(200).json({posts:results})
        }
      });
})

app.post("/getPostDetails",(req,res)=>{
    let reqBody = req.body;

    if (reqBody.hasOwnProperty('postId') || parseInt(reqBody.postId) > 0) {
        let retVal = {
            postInfo:{},
            comments:[]
        };

        let getPostInfo = function(callback){
            connection.query('SELECT u.username,p.title,p.body FROM post p LEFT JOIN user u ON u.id = p.userId WHERE p.id = ?',[reqBody.postId], function (error, results, fields) {
                if(error){
                    callback(err);
                }else{
                    retVal.postInfo = results[0] ? results[0] : {};
                    callback();
                }
              });
        }

        let getComments = function(callback){
            // SELECT name,body FROM comment WHERE postId = 2
            connection.query('SELECT name,body FROM comment WHERE postId = ?',[reqBody.postId], function (error, results, fields) {
                if(error){
                    callback(err);
                }else{
                    retVal.comments = results;
                    callback();
                }
              });
        }

        async.series(
            [getPostInfo,getComments],
            function(err){
                if(err){
                    console.log(err)
                    res.status(500).json({eventCode:1})
                }else{
                    res.status(200).json({postDetails:retVal})
                }
            }
        )


    }else{
        res.status(400).json({message:"Missing arguments in request body"})
    }
})

app.route('/*').get((req, res) => {res.sendFile(__dirname + '/frontend/dist/index.html')});

app.listen(PORT, ()=>{
    console.log(`App is running on port http://localhost:${PORT}.`)
})