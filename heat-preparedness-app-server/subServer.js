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

app.get("/notifications", (req, res) => res.send("Heat Preparedness Subscription Server"));

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

  console.log(subscription)
  insertSubscription(subscription)

  webpush
    .sendNotification(subscription[0], payload)
    .then((result) => console.log(result))
    .catch((e) => console.log(e.stack));

  

  res.status(200).json({ success: true });
});
app.post("/notifications/change", async function (req, res) {
  const subscription = req.body;

  const webPushDetails = subscription[0]
  const subscriptionDetails = subscription[1]
  const endPoint = webPushDetails['endpoint']

  const dbConnection = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const subscriptionIdData = await getSubscriptionId(dbConnection, endPoint)
  const subscriptionId = subscriptionIdData[0]['subscrip_id']

  const suburbId = subscriptionDetails['suburbDetails']['suburb_id']
    const councilId = subscriptionDetails['suburbDetails']['council_id']
    var oneDay = subscriptionDetails['oneDay']
    var threeDay = subscriptionDetails['threeDay']

    if (oneDay){
      oneDay = 1
    }
    else {
      oneDay = 0
    }

    if (threeDay) {
      threeDay = 1
    }
    else {
      threeDay = 0
    }

    dbConnection.query(
          //Run query to insert or update data on database
          `UPDATE User_choice 
           SET suburb_id = ?,
               council_id = ?,
               noti_1day = ?,
               noti_3day = ?
           WHERE subscrip_id = ?; `,
          [suburbId, councilId, oneDay, threeDay, subscriptionId],
          function (error, result, fields) {
            if (error) {
              //Log error message
              console.log(error);

              console.log("Failed to update user choice");
            } else {
              // console.log("Database updated")
            }
          }
        );

  
  dbConnection.end()
  

   var notiBody = "You are now subscribed to heat wave alerts for " + subscription[1]['suburbDetails']['suburb'] + ", " + subscription[1]['suburbDetails']['postcode']

  
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

  webpush
    .sendNotification(subscription[0], payload)
    .then((result) => console.log(result))
    .catch((e) => console.log(e.stack));

});


//API to retrieve user notification details
// app.post("/notifications/details", async function (req, res) {
//   const subscription = req.body;
// })

async function insertSubscription(subscription){

    const dbConnection = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const webPushDetails = subscription[0]
  const subscriptionDetails = subscription[1]

  const endPoint = webPushDetails['endpoint']
  const pdh = webPushDetails['keys']['p256dh']
  const auth = webPushDetails['keys']['auth']

  dbConnection.query(
          //Run query to insert or update data on database
          `INSERT INTO Subscription (end_point, p256dh, auth) VALUES (?,?,?); 
`,
          [endPoint, pdh, auth],
          function (error, result, fields) {
            if (error) {
              //Log error message
              console.log(error);

              console.log("Failed to update subscription");
            } else {
              // console.log("Database updated")
            }
          }
        );

    const subscriptionIdData = await getSubscriptionId(dbConnection, endPoint)
    const subscriptionId = subscriptionIdData[0]['subscrip_id']
  
    const suburbId = subscriptionDetails['suburbDetails']['suburb_id']
    const councilId = subscriptionDetails['suburbDetails']['council_id']
    var oneDay = subscriptionDetails['oneDay']
    var threeDay = subscriptionDetails['threeDay']

    if (oneDay){
      oneDay = 1
    }
    else {
      oneDay = 0
    }

    if (threeDay) {
      threeDay = 1
    }
    else {
      threeDay = 0
    }

  dbConnection.query(
          //Run query to insert or update data on database
          `INSERT INTO User_choice (subscrip_id,suburb_id,council_id,noti_1day,noti_3day) VALUES (?,?,?,?,?);`,
          [subscriptionId, suburbId, councilId, oneDay, threeDay],
          function (error, result, fields) {
            if (error) {
              //Log error message
              console.log(error);

              console.log("Failed to update user choice");
            } else {
              // console.log("Database updated")
            }
          }
        );

  dbConnection.end()
}


async function getSubscriptionId(dbConnection, endPoint){
  return new Promise((resultData) => {
    dbConnection.query(
       `SELECT subscrip_id
         FROM Subscription
         WHERE end_point = ?;`, //? Represents a parameter
      endPoint, //parameter you want inserted where the ? is
      function (error, result, fields) {
        if (error) {
          //Log error message
          console.log(error);
          console.log("Failed to retrieve Subscription ID");
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