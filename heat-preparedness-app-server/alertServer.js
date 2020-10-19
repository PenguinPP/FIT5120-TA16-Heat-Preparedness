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

const schedule = require("node-schedule");
//check and sent notification everyday at 9am
const dailyNotification9am = () => {
  schedule.scheduleJob(
  "0 0 9 * * *",
  function(){
    sendAlerts();
  });
}

//check and sent notification everyday at 6pm
const dailyNotification6pm = () => {
  schedule.scheduleJob(
  "0 0 18 * * *",
  function(){
    sendAlerts();
  });
}

//run the schedule and send notification every day
dailyNotification9am();
dailyNotification6pm();


async function sendAlerts() {
  //Create db connection
  const dbConnection = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  //get all users' information that who subscribe for notification
  //and there will be a heat wave after one or three days 
  //according to their selection
  const userChoice_1day = await getuserChoice(dbConnection,1);
  const userChoice_3day = await getuserChoice(dbConnection,3);

  //create two array to collect all user's information who 
  //didn't get notification according to their selection
  var user_list_1day = new Array();
  var user_list_3day = new Array();

  //search the correspoding notification record in database
  //when the result is empty, it means this user should receive notification but haven't got it yet
  //thus, user's information will be stored in array and send notification later
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

  //start to send notification one by one for who subscribe 1 day notification
  for (i=0;i<user_list_1day.length;i++){
    var notiBody = "There will be a heat wave tomorrow in " + 
    user_list_1day[i]["suburb"] + ", please prepare for it and keep safe."

    //construct notification payload
    var payload = JSON.stringify({
      title: "Notification!",
      body: notiBody,
      icon: "https://vic-heat-deployment-files.s3-ap-southeast-2.amazonaws.com/vic-heat-noti.png",
    });

    //construct webpush details
    let webPushDetails = {};
    webPushDetails["endpoint"] = user_list_1day[i]["end_point"];
    webPushDetails["keys"] = {};
    webPushDetails["keys"]["p256dh"] = user_list_1day[i]["p256dh"];
    webPushDetails["keys"]["auth"] = user_list_1day[i]["auth"];

    //send notification
    await webpush
    .sendNotification(webPushDetails,payload)
    .then((result) => {
      //record the notification if the webpush success
      if (result["statusCode"] == 201){
        insertNotification(dbConnection,userChoice_1day[i],1);
      }
    })
    .catch((e) => console.log(e.stack));

  }

  //start to send notification one by one for who subscribe 3 day notification
  for (i=0;i<user_list_3day.length;i++){
    var notiBody = "There will be a heat wave in " + user_list_3day[i]["suburb"] + " on " + 
    user_list_3day[i]["date"] + ", please prepare for it and keep safe."

    //construct notification payload
    var payload = JSON.stringify({
      title: "Notification!",
      body: notiBody,
      icon: "https://vic-heat-deployment-files.s3-ap-southeast-2.amazonaws.com/vic-heat-noti.png",
    });

    //construct webpush details
    let webPushDetails = {};
    webPushDetails["endpoint"] = user_list_3day[i]["end_point"];
    webPushDetails["keys"] = {};
    webPushDetails["keys"]["p256dh"] = user_list_3day[i]["p256dh"];
    webPushDetails["keys"]["auth"] = user_list_3day[i]["auth"];

    //send notification
    await webpush
    .sendNotification(webPushDetails,payload)
    .then((result) => {
      if (result["statusCode"] == 201){
        insertNotification(dbConnection,userChoice_3day[i],3);
      }
    })
    .catch((e) => console.log(e.stack));

  }

  //close db connection
  dbConnection.end();


}

async function getuserChoice(dbConnection,targ_day){
  if (targ_day == 1){
    return new Promise((resultData) =>{
      dbConnection.query(
        `select end_point,p256dh,auth,suburb,u.subscrip_id,u.suburb_id,c.council_id,noti_1day,noti_3day,threshold,avg,date_format(date, '%W %d-%m-%Y') as date
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
        `select end_point,p256dh,auth,suburb,u.subscrip_id,u.suburb_id,c.council_id,noti_1day,noti_3day,threshold,avg,date_format(date, '%W %d-%m-%Y') as date
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

async function insertNotification(dbConnection,userInfo,targ_day){
  
  if (targ_day == 1){
    dbConnection.query(
      `insert into Notification_1day (subscrip_id,suburb_id,council_id,noti_time,noti_targ_date)
        values (?,?,?,now(),date_add(curdate(),interval 1 day));`,
      [userInfo["subscrip_id"],userInfo["suburb_id"],userInfo["council_id"]],
      function (error, result, fields){
        if (error){
          console.log(error);
          console.log("Failed to record notification");
        }
      }
    )
  }else{
    dbConnection.query(
      `insert into Notification_3day (subscrip_id,suburb_id,council_id,noti_time,noti_targ_date)
        values (?,?,?,now(),date_add(curdate(),interval 3 day));`,
      [userInfo["subscrip_id"],userInfo["suburb_id"],userInfo["council_id"]],
      function (error, result, fields){
        if (error){
          console.log(error);
          console.log("Failed to record notification");
        }
      }
    )
  }
}