const express = require("express");
const async = require("async");
const mysql = require('mysql');
const log4js = require("log4js");
const config = require('config');
log4js.configure({
  appenders: { error: { type: "file", filename: "log/error.log" } },
  categories: { default: { appenders: ["error"], level: "trace" } }
});
const logger = log4js.getLogger("error");

const PORT = config.get("appPort")
const MYSQLDBUSER = config.get("mysql.user")
const MYSQLDBPASSWORD = config.get("mysql.password")

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : MYSQLDBUSER,
    password : MYSQLDBPASSWORD,
    database : 'trialday2'
  });

  connection.connect(function(err) {
    if (err) {
        logger.error(err);
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Database connection was successfull');
  });

let app = express();

app.use(express.static('./frontend/dist'));
app.use(express.json());


app.get("/getPosts",(req,res)=>{
    connection.query('SELECT u.username,p.id,p.title FROM post p LEFT JOIN user u ON u.id = p.userId', function (error, results, fields) {
        if(error){
            logger.error(error);
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
                    logger.error(error);
                    callback(error);
                }else{
                    retVal.postInfo = results[0] ? results[0] : {};
                    callback();
                }
              });
        }

        let getComments = function(callback){
            connection.query('SELECT name,body FROM comment WHERE postId = ?',[reqBody.postId], function (error, results, fields) {
                if(error){
                    logger.error(error);
                    callback(error);
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

app.get("/getPhotosByAlbums",(req,res)=>{

    let retVal = []

    let getAlbums = function(callback){
        connection.query('SELECT id, title FROM album', function (error, results, fields) {
            if(error){
                logger.error(error);
                callback(error);
            }else{
                results.forEach(album => {
                    album["photos"] = [];
                    retVal.push(album);
                });
                callback();
            }
          });
    }

    let getPhotos = function(callback){
        connection.query('SELECT albumId,thumbnailUrl FROM photo', function (error, results, fields) {
            if(error){
                logger.error(error);
                callback(error);
            }else{
                results.forEach(photo => {
                    for (let i = 0; i < retVal.length; i++) {
                        if (photo.albumId == retVal[i].id) {
                            retVal[i].photos.push(photo.thumbnailUrl)
                            break;
                        }
                        
                    }
                });
                callback();
            }
          });
    }

    async.series(
        [getAlbums,getPhotos],
        function(err){
            if (err) {
                res.status(500).json({eventCode:1})
            }else{
                res.status(200).json({albums:retVal});
            }
        }
    )
})

app.route('/*').get((req, res) => {res.sendFile(__dirname + '/frontend/dist/index.html')});

app.listen(PORT, ()=>{
    console.log(`App is running on port http://localhost:${PORT}.`)
})