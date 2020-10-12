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

app.post("/notifications/subscribe/:suburb",[param("suburb").not().isEmpty()], async function (req, res) {
  const subscription = req.body;
  console.log('suburb id')
  console.log(req.params.suburb)
  console.log('subscription')
  console.log(subscription);


  const dbConnection = mysql.createConnection({
      //open db connection
      host: process.env.DB_ENDPOINT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

  suburbDetails = await getSuburbDetails(dbConnection, req.params.suburb)
  dbConnection.end();
  console.log("suburbDetails")
  console.log(suburbDetails)

  const payload = JSON.stringify({
    title: "Hello!",
    body: "You are now subscribed to heat wave alerts for " + suburbDetails[0]['suburb'] + ", " + suburbDetails[0]['postcode'],
  });

  webpush
    .sendNotification(subscription, payload)
    .then((result) => console.log(result))
    .catch((e) => console.log(e.stack));

  res.status(200).json({ success: true });
});

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