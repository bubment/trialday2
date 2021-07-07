const fetch = require('node-fetch');
const mysql = require('mysql');
const async = require("async");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'testuser',
    password : 'testpassword',
    database : 'trialday2'
  });

function uploadUsers(){
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(users => {
        // console.log(data);
        connection.connect();
        async.eachLimit(
            users,
            5,
            (item,callback)=>{
                let user = {id:item.id,name:item.name,username:item.username,email:item.email}
                connection.query('INSERT INTO user SET ?',user, function (error, results, fields) {
                if (error){
                    callback(error)
                }else{
                    callback()
                }
                });  
            }
        ),
        (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("all process finished successfully")
            }
            connection.end()
        }
    })
    .catch(err => console.log(err) )
}

function uploadPosts(){
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(posts => {
        // console.log(data);
        connection.connect();
        async.eachLimit(
            posts,
            5,
            (item,callback)=>{
                let post = {userId:item.userId,id:item.id,title:item.title,body:item.body}
                connection.query('INSERT INTO post SET ?',post, function (error, results, fields) {
                if (error){
                    callback(error)
                }else{
                    callback()
                }
                });  
            }
        ),
        (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("all process finished successfully")
            }
            connection.end()
        }
    })
    .catch(err => console.log(err) )
}

function uploadPhotos(){
    fetch("https://jsonplaceholder.typicode.com/photos")
    .then(res => res.json())
    .then(photos => {
        // console.log(data);
        connection.connect();
        async.eachLimit(
            photos,
            5,
            (item,callback)=>{
                let photo = {albumId:item.albumId,id:item.id,title:item.title,url:item.url,thumbnailUrl:item.thumbnailUrl}
                connection.query('INSERT INTO photo SET ?',photo, function (error, results, fields) {
                if (error){
                    callback(error)
                }else{
                    callback()
                }
                });  
            }
        ),
        (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("all process finished successfully")
            }
            connection.end()
        }
    })
    .catch(err => console.log(err) )
}

function uploadComments(){
    fetch("https://jsonplaceholder.typicode.com/comments")
    .then(res => res.json())
    .then(comments => {
        // console.log(data);
        connection.connect();
        async.eachLimit(
            comments,
            5,
            (item,callback)=>{
                let comment = {postId:item.postId,id:item.id,name:item.name,email:item.email,body:item.body}
                connection.query('INSERT INTO comment SET ?',comment, function (error, results, fields) {
                if (error){
                    callback(error)
                }else{
                    callback()
                }
                });  
            }
        ),
        (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("all process finished successfully")
            }
            connection.end()
        }
    })
    .catch(err => console.log(err) )
}

function uploadAlbums(){
    fetch("https://jsonplaceholder.typicode.com/albums")
    .then(res => res.json())
    .then(albums => {
        // console.log(data);
        connection.connect();
        async.eachLimit(
            albums,
            5,
            (item,callback)=>{
                let album = {userId:item.userId,id:item.id,title:item.title}
                connection.query('INSERT INTO album SET ?',album, function (error, results, fields) {
                if (error){
                    callback(error)
                }else{
                    callback()
                }
                });  
            }
        ),
        (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("all process finished successfully")
            }
            connection.end()
        }
    })
    .catch(err => console.log(err) )
}