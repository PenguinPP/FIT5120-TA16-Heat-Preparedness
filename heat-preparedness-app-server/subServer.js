require("dotenv").config();
const {
  check,
  validationResult,
  query,
  body,
  param,
} = require("express-validator");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const dateFormat = require("dateformat");
const axios = require("axios").default;
app.use(bodyParser.json());
const mysql = require("mysql");
const port = 5001;
const webpush = require("web-push");

const cors = require("cors");
app.use(cors());

webpush.setVapidDetails(
  process.env.WEB_PUSH_CONTACT,
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

app.get("/", (req, res) => res.send("Heat Preparedness Subscription Server"));

app.post("/notifications/subscribe", async function (req, res) {
  const subscription = req.body;

  var notiBody = "You are now subscribed to heat wave alerts for" + subscription[1]['suburbDetails']['suburb'] + ", " + subscription[1]['suburbDetails']['postcode']

  
  if (subscription[1]["oneDay"] && subscription[1]["threeDay"]){
    const notiFreq = " You will receive notifications 1 and 3 days before a heat wave."
    notiBody = notiBody + notiFreq
  }
  else if(subscription[1]["oneDay"] && !subscription[1]["threeDay"]){
    const notiFreq = " You will receive a notification 1 day before a heat wave."
    notiBody = notiBody + notiFreq
  }
   else if(!subscription[1]["oneDay"] && subscription[1]["threeDay"]){
    const notiFreq = " You will receive a notification 3 days before a heat wave."
    notiBody = notiBody + notiFreq
  }

  const payload = JSON.stringify({
    title: "Hello!",
    body: notiBody,
  });

  // insertSubscription(subscription)

  webpush
    .sendNotification(subscription[0], payload)
    .then((result) => console.log(result))
    .catch((e) => console.log(e.stack));

  

  res.status(200).json({ success: true });
});


function insertSubscription(subscription){
    console.log(subscription)

    const dbConnection = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const webPushDetails = subscription[0]
  const subscriptionDetails = subscription[1]

  const endPoint = webPushDetails['endpoint']
  const expirationTime =  webPushDetails['expirationTime'] === undefined ? null : webPushDetails['expirationTime']
  const pdh = webPushDetails['keys']['p256dh']
  const auth = webPushDetails['keys']['auth']

  dbConnection.query(
          //Run query to insert or update data on database
          ``,
          [forecastDate, councilId, minTemp, maxTemp, avgTemp, update_time],
          function (error, result, fields) {
            if (error) {
              //Log error message
              console.log(error);

              console.log("Failed to update forecast");
            } else {
              // console.log("Database updated")
            }
          }
        );

}

async function getSuburbDetails(dbConnection, suburbId){
return new Promise((resultData) => {
    dbConnection.query(
      `SELECT *
            FROM Suburb
            WHERE suburb_id = ?;`, //? Represents a parameter
      suburbId, //parameter you want inserted where the ? is
      function (error, result, fields) {
        if (error) {
          //Log error message
          console.log(error);
          console.log("Failed to retrieve suburb data");
        }
        try {
          //set resultData to query result
          resultData(result);
        } catch (error) {
          resultData({}); //Set resultData to empty
          console.log("There was an error with the promise");
        }
      }
    );
  });

}



app.listen(port, () => console.log(`Heat Prep listening on port ${port}!`));