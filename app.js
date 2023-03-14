//requiring express, body-parser, request and https
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

//static method to access local files like css and images
app.use(express.static("public"));

//body-parser to access input data
app.use(bodyParser.urlencoded({extended: true}));

// Requiring mailchimp
// Also needs "npm install @mailchimp/mailchimp_marketing" on Hyper Terminal
// const client = require("@mailchimp/mailchimp_marketing");
// client.setConfig({
//   apiKey: "b78960b076368520c013ace69ae6143d-us12",
//   server: "us12",
// });

//sending our main page to root route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});


//post request ( when someone presses the submit button)
app.post("/", function(req,res) {

  //saving input data into my server
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  console.log(firstName,lastName,email);


//relating my data with mailchimp's server
  const data= {
    members: [
      //members, email_adress status, merger_fields, FNAME and LNAME
      //are default parameters mailchimp offers.
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  const jsonData =JSON.stringify(data);

  const url ="https://us12.api.mailchimp.com/3.0/lists/ab34da167a";//list key
  const options = {
    method: "POST",
    auth: "lol:b78960b076368520c013ace69ae6143d-us12"//api key
  }


  //creating a variable named "request" in order tomake https request
  const https = https.request(url, options, funtion(response) {
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();


});

//running the server
app.listen(3000, function(){
  console.log("server running on port 3000");
});


//b78960b076368520c013ace69ae6143d-us12

// ab34da167a
