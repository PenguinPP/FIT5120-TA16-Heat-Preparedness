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

// vapid key details
webpush.setVapidDetails(
  process.env.WEB_PUSH_CONTACT,
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

//For checking if server is up and running
app.get("/notifications", (req, res) =>
  res.send("Heat Preparedness Subscription Server")
);

//Subscribe user to notifications
app.post("/notifications/subscribe", async function (req, res) {
  //Obtain subscription details
  // subscription is am array with 2 items
  // item zero is the user's subscription end point and auth details
  // item one is the user's choice of suburb and 1 or 3 day notifications
  const subscription = req.body;

  //Create text for subscription confirmation notification
  var notiBody =
    "You are now subscribed to heat wave alerts for" +
    subscription[1]["suburbDetails"]["suburb"] +
    ", " +
    subscription[1]["suburbDetails"]["postcode"];

  //Change notification text according to whether user wants notifications
  //3 days before, one day before or both
  if (subscription[1]["oneDay"] && subscription[1]["threeDay"]) {
    const notiFreq =
      " You will receive notifications 1 and 3 days before a heat wave.";
    notiBody = notiBody + notiFreq;
  } else if (subscription[1]["oneDay"] && !subscription[1]["threeDay"]) {
    const notiFreq =
      " You will receive a notification 1 day before a heat wave.";
    notiBody = notiBody + notiFreq;
  } else if (!subscription[1]["oneDay"] && subscription[1]["threeDay"]) {
    const notiFreq =
      " You will receive a notification 3 days before a heat wave.";
    notiBody = notiBody + notiFreq;
  }

  //Create confirmation notification payload
  const payload = JSON.stringify({
    title: "Hello!",
    body: notiBody,
  });

  console.log(subscription);

  //insert subscription into database
  insertSubscription(subscription);

  //send confirmation notification to user
  webpush
    .sendNotification(subscription[0], payload)
    .then((result) => console.log(result))
    .catch((e) => console.log(e.stack));

  res.status(200).json({ success: true });
});

//Change details for an existing subscription
app.post("/notifications/change", async function (req, res) {
  //Obtain subscription details
  // subscription is am array with 2 items
  // item zero is the user's subscription end point and auth details
  // item one is the user's choice of suburb and 1 or 3 day notifications
  const subscription = req.body;

  const webPushDetails = subscription[0];
  const subscriptionDetails = subscription[1];
  const endPoint = webPushDetails["endpoint"];

  //create db connection
  const dbConnection = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  //get user's subscription_id using endpoint
  const subscriptionIdData = await getSubscriptionId(dbConnection, endPoint);
  const subscriptionId = subscriptionIdData[0]["subscrip_id"];

  //obtain new subscription details user has supplied
  const suburbId = subscriptionDetails["suburbDetails"]["suburb_id"];
  const councilId = subscriptionDetails["suburbDetails"]["council_id"];
  var oneDay = subscriptionDetails["oneDay"];
  var threeDay = subscriptionDetails["threeDay"];

  //Convert oneDay and threeDay from boolean to int for db entry
  if (oneDay) {
    oneDay = 1;
  } else {
    oneDay = 0;
  }

  if (threeDay) {
    threeDay = 1;
  } else {
    threeDay = 0;
  }

  //Update user_choice on database
  dbConnection.query(
    //Run query update data on database
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

  //close db connection
  dbConnection.end();

  //construct confirmation notification
  var notiBody =
    "You are now subscribed to heat wave alerts for " +
    subscription[1]["suburbDetails"]["suburb"] +
    ", " +
    subscription[1]["suburbDetails"]["postcode"];

  //Change notification text according to whether user wants notifications
  //3 days before, one day before or both
  if (subscription[1]["oneDay"] && subscription[1]["threeDay"]) {
    const notiFreq =
      " You will receive notifications 1 and 3 days before a heat wave.";
    notiBody = notiBody + notiFreq;
  } else if (subscription[1]["oneDay"] && !subscription[1]["threeDay"]) {
    const notiFreq =
      " You will receive a notification 1 day before a heat wave.";
    notiBody = notiBody + notiFreq;
  } else if (!subscription[1]["oneDay"] && subscription[1]["threeDay"]) {
    const notiFreq =
      " You will receive a notification 3 days before a heat wave.";
    notiBody = notiBody + notiFreq;
  }

  //construct confirmation notification payload
  const payload = JSON.stringify({
    title: "Hello!",
    body: notiBody,
  });

  //send confirmation notification
  webpush
    .sendNotification(subscription[0], payload)
    .then((result) => console.log(result))
    .catch((e) => console.log(e.stack));
});

//API to retrieve user notification details
// app.post("/notifications/details", async function (req, res) {
//   const subscription = req.body;
// })

//Insert subscription into db
async function insertSubscription(subscription) {
  //create db connection
  const dbConnection = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  //obtain webPush and subscription details
  const webPushDetails = subscription[0];
  const subscriptionDetails = subscription[1];

  const endPoint = webPushDetails["endpoint"];
  const pdh = webPushDetails["keys"]["p256dh"];
  const auth = webPushDetails["keys"]["auth"];

  //Insert subscription into db
  dbConnection.query(
    //Run query to insert or update data on database
    `INSERT INTO Subscription (end_point, p256dh, auth) VALUES (?,?,?); 
`,
    [endPoint, pdh, auth], //query parameters in order of ? in sql statement
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

  //obtain subscription id of newly added subscription using nedpoint
  const subscriptionIdData = await getSubscriptionId(dbConnection, endPoint);
  const subscriptionId = subscriptionIdData[0]["subscrip_id"];

  //Obtain details for user_choice details
  const suburbId = subscriptionDetails["suburbDetails"]["suburb_id"];
  const councilId = subscriptionDetails["suburbDetails"]["council_id"];
  var oneDay = subscriptionDetails["oneDay"];
  var threeDay = subscriptionDetails["threeDay"];

  //Convert oneDay and threeDay from bool to int to insert into db
  if (oneDay) {
    oneDay = 1;
  } else {
    oneDay = 0;
  }

  if (threeDay) {
    threeDay = 1;
  } else {
    threeDay = 0;
  }

  //Run db query to insert user_choice
  dbConnection.query(
    //Run query to insert data on database
    `INSERT INTO User_choice (subscrip_id,suburb_id,council_id,noti_1day,noti_3day) VALUES (?,?,?,?,?);`,
    [subscriptionId, suburbId, councilId, oneDay, threeDay], //query parameters in order of ? in sql statement
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

  //close db connection
  dbConnection.end();
}

//Function to obtain db subscription_id using endpoint
async function getSubscriptionId(dbConnection, endPoint) {
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

app.listen(port, () =>
  console.log(`Heat Subscription Server listening on port ${port}!`)
);
