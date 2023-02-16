//jshint esversion: 6
//a231f96fd01f46678f28c296f9405207-us21
//audience id: 7f3a0f3282
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({encoded:true}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
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

    console.log("First Name: " + firstName);
    console.log("Last Name: " + lastName);
    console.log("Email: " + email);


    var data ={
        members:{
            email_address: email,
            status: "subscribed",
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
       
       if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
        
       }
       else{
        res.sendFile(__dirname + "/failure.html");
       }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});