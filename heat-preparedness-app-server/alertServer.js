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

async function sendAlerts() {
  //Create db connection
  const dbConnection = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  const userChoice_1day = await getuserChoice(dbConnection,1);
  const userChoice_3day = await getuserChoice(dbConnection,3);

  var user_list_1day = new Array();
  var user_list_3day = new Array();

  for (i=0;i<userChoice_1day.length;i++){
    var checkResult = await checkNotification(dbConnection,userChoice_1day[i],1);
    if (checkResult.length == 0){
      user_list_1day.push(userChoice_1day[i]);
    }
  }

  for (i=0;i<userChoice_3day.length;i++){
    var checkResult = await checkNotification(dbConnection,userChoice_3day[i],3);
    if (checkResult.length == 0){
      user_list_3day.push(userChoice_3day[i]);
    }
  }

  console.log("send 1 day notifications");

  for (i=0;i<user_list_1day.length;i++){
    var notiBody = "There will be a heat wave tomorrow in " + 
    user_list_1day[i]["suburb"] + ", please prepare for it and keep safe."

    var payload = JSON.stringify({
      title: "Notification!",
      body: notiBody,
    });

    console.log(payload);

    let webPushDetails = {};
    webPushDetails["endpoint"] = user_list_1day[i]["end_point"];
    webPushDetails["keys"] = {};
    webPushDetails["keys"]["p256dh"] = user_list_1day[i]["p256dh"];
    webPushDetails["keys"]["auth"] = user_list_1day[i]["auth"];

    console.log(webPushDetails);

    webpush
    .sendNotification(webPushDetails,payload)
    .then((result) => console.log(result))
    .catch((e) => console.log(e.stack));

  }

  console.log("send 3 day notifications");

  for (i=0;i<user_list_3day.length;i++){
    var notiBody = "There will be a heat wave tomorrow in " + 
    user_list_3day[i]["suburb"] + ", please prepare for it and keep safe."

    var payload = JSON.stringify({
      title: "Notification!",
      body: notiBody,
    });

    console.log(payload);

    let webPushDetails = {};
    webPushDetails["endpoint"] = user_list_3day[i]["end_point"];
    webPushDetails["keys"] = {};
    webPushDetails["keys"]["p256dh"] = user_list_3day[i]["p256dh"];
    webPushDetails["keys"]["auth"] = user_list_3day[i]["auth"];

    console.log(webPushDetails);

    webpush
    .sendNotification(webPushDetails,payload)
    .then((result) => console.log(result))
    .catch((e) => console.log(e.stack));

  }

  



  /*Insert code here.
    Check for suburbs that have heat waves 3 days from now or 1 day from now
    Check for users that have not received notifications for these suburbs
    Send notifications to users
    Store record of notification in db*/

  //close db connection
  dbConnection.end();


}

async function getuserChoice(dbConnection,targ_day){
  if (targ_day == 1){
    return new Promise((resultData) =>{
      dbConnection.query(
        `select end_point,p256dh,auth,suburb,u.subscrip_id,u.suburb_id,c.council_id,noti_1day,noti_3day,threshold,avg,date 
          from District as d join Council as c on d.district_id = c.district_id
          join Forecast as f on c.council_id = f.council_id
          join User_choice as u on u.council_id = c.council_id
          join Suburb as s on s.suburb_id = u.suburb_id
          join Subscription as sub on sub.subscrip_id = u.subscrip_id
          where 
          f.date = date_add(curdate(),interval 1 day)
          and avg > threshold
          and noti_1day = 1;`,function (error, result, fields) {
            if (error) {
              console.log(error);
              console.log("Failed to retrieve User choices");
            }
            try {
              resultData(result);
            } catch (error) {
              resultData({});
              console.log("There was an error with the code");
            }
          }
        );
      }
    );
  }
  else{
    return new Promise((resultData) =>{
      dbConnection.query(
        `select end_point,p256dh,auth,suburb,u.subscrip_id,u.suburb_id,c.council_id,noti_1day,noti_3day,threshold,avg,date 
          from District as d join Council as c on d.district_id = c.district_id
          join Forecast as f on c.council_id = f.council_id
          join User_choice as u on u.council_id = c.council_id
          join Suburb as s on s.suburb_id = u.suburb_id
          join Subscription as sub on sub.subscrip_id = u.subscrip_id
          where 
          f.date = date_add(curdate(),interval 3 day)
          and avg > threshold
          and noti_3day = 1;`,function (error, result, fields) {
            if (error) {
              console.log(error);
              console.log("Failed to retrieve User choices");
            }
            try {
              resultData(result);
            } catch (error) {
              resultData({});
              console.log("There was an error with the code");
            }
          }
        );
      }
    );
  }
  
}

async function checkNotification(dbConnection,userChoice,targ_day){

  if (targ_day == 1){
    return new Promise((resultData) =>{
        dbConnection.query(
          `select * from Notification_1day 
          where subscrip_id = ? and suburb_id = ? and noti_targ_date = date_add(curdate(),interval 1 day);`,
          [userChoice["subscrip_id"],userChoice["suburb_id"]],
          function (error, result, fields){
            if (error) {
              console.log(error);
  
              console.log("Failed to check notifications");
            }
            try {
              resultData(result);
            } catch (error) {
              resultData({});
              console.log("There was an error with the code");
            }
          }
        );
      });
  }
  else{
    return new Promise((resultData) =>{
      dbConnection.query(
        `select * from Notification_3day 
        where subscrip_id = ? and suburb_id = ? and noti_targ_date = date_add(curdate(),interval 3 day);`,
        [userChoice["subscrip_id"],userChoice["suburb_id"]],
        function (error, result, fields){
          if (error) {
            console.log(error);

            console.log("Failed to check notifications");
          }
          try {
            resultData(result);
          } catch (error) {
            resultData({});
            console.log("There was an error with the code");
          }
        }
      );
    });
  }

  
}