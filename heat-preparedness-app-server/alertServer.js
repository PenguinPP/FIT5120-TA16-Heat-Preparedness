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
const port = 5002;
const webpush = require("web-push");

const cors = require("cors");
app.use(cors());

//vapid key details
webpush.setVapidDetails(
  process.env.WEB_PUSH_CONTACT,
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

app.listen(port, () =>
  console.log(`Heat Alert Server listening on port ${port}!`)
);

//run sendAlerts function
sendAlerts();

function sendAlerts() {
  //Create db connection
  const dbConnection = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("database connection opened");

  /*Insert code here.
    Check for suburbs that have heat waves 3 days from now or 1 day from now
    Check for users that have not received notifications for these suburbs
    Send notifications to users
    Store record of notification in db*/

  //close db connection
  dbConnection.end();
  console.log("connection close");
}
