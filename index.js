const express = require("express");
const async = require("async");
const fetch = require('node-fetch');

const PORT = 1337

let app = express();

app.use(express.static('./frontend/dist'));
app.use(express.json());

app.get("/getComments",(req,res)=>{
    let resultArray = [];
    let count = 0;
    async.whilst(
        function test(cb) { cb(null, count < 20); },
        function iter(callback) {
            fetch("https://phantauth.net/user/")
            .then(res => res.json())
            .then(data => {
                resultArray.push(data)
                count++;
                callback(null, count);
            })
            .catch(err => callback(err) )
        },
        function (err, n) {
            if (err) {
                res.status(500).json({message:"Somethings wrong here"})
            }else{
                res.status(200).json({ data:resultArray })
            }
        }
    );

})

app.listen(PORT, ()=>{
    console.log(`App is running on port http://localhost:${PORT}.`)
})