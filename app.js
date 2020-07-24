// Copy the Code @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// const express = require("express");
// const https = require("https");
// const bodyParser = require("body-parser");
//
// const app = express();
//
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
//
// app.listen(3000, function() {
//   console.log("Server is running at port 3000");
// });
//
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/signup.html");
// });
//
//
// app.post("/", function(req, res) {
//   //const cityName = req.body.CityName;
// });

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
//const mailChimpApiKey="53dca5f273b190b636a2b3a2f8d9ba9b-us17";
const mailChimpApiKey="53dca5f273b190b636a2b3a2f8d9ba9b-us17";
const mailChimpListID="375c148007";
const url =   "https://us17.api.mailchimp.com/3.0/lists/" + mailChimpListID + "/members" ;


//'{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}' \

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running at port 3000");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});
app.post("/", function(req, res) {
  var fName = req.body.fName;
  var lName = req.body.lName;
  var email = req.body.email;
  // console.log(fName,lName , email);
  // var data = {
  //               "email_address": email,
  //           "status": "subscribed",
  //           "merge_fields": {
  //               "FNAME": fName,
  //               "LNAME": lName
  //
  //
  //       }
  //
  // };
  // var jsonData = JSON.stringify(data);
  // console.log(jsonData);
  // var options = {
  //   method: "POST",
  //   auth: "Ashwani:" + mailChimpApiKey
  // };
  // console.log(options);
  // console.log(url);

  // const request = https.request(url,options,function(response){
  //   response.on("data",function(data){
  //     console.log(JSON.parse(data));
  //   })
  // });



  // ADD Subscribers %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    var st ="";
    var options = { method: 'POST',
      url: 'https://us17.api.mailchimp.com/3.0/lists/375c148007/members',
      headers:
       { 'Postman-Token': '1135f9dd-3047-4e4c-bc1f-455dd446ba11',
         'cache-control': 'no-cache',
         Authorization: 'Basic QXNod2FuaTo1M2RjYTVmMjczYjE5MGI2MzZhMmIzYTJmOGQ5YmE5Yi11czE3',
         'Content-Type': 'application/json' },
      body:
       { email_address: email,
         status: 'subscribed',
         merge_fields: { FNAME: fName, LNAME: lName } },
      json: true };

    request(options, function (error, response, body) {


      if (error) throw new Error(error);

      if (response.body.status === 400){
          res.sendFile(__dirname + "/failure.html");

        console.log("email already subscribed.");
      }else if (response.body.status==='subscribed') {
        res.sendFile(__dirname + "/success.html");
      }else{
          res.sendFile(__dirname + "/failure.html");
      }

      // console.log(body);
     // console.log(body.title);
    });

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%




});
