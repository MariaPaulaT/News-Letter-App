//jshint esversion: 6
//a231f96fd01f46678f28c296f9405207-us21
//audience id: 7f3a0f3282
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailChimp = require("@mailchimp/mailchimp_marketing");
const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({encoded:true}));

app.listen(3000, function(){
    console.log("succes");
})

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data ={
        members:{
            email_address: email,
            status: "suscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }

        }
    };
    const jsonData = JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/7f3a0f3282/members";

    const options ={
        method: "POST",
        auth: "maria:a231f96fd01f46678f28c296f9405207-us21"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end;
});