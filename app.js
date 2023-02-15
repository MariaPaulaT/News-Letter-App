//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({encoded:true}));

app.listen(3000, function(){
    console.log("succes");
})

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});