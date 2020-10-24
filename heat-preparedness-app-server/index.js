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
const port = 5000;

const cors = require("cors");
app.use(cors());

app.listen(port, () => console.log(`Heat Prep listening on port ${port}!`));

//Example Weather API Call
//https://api.openweathermap.org/data/2.5/onecall?lat=-38.2551&lon=144.6726&exclude=hourly,current,minutely&units=metric&appid=process.env.OPEN_WEATHER_ONE_CALL_API

app.get("/", (req, res) => res.send("Heat Preparedness Application Server"));

const schedule = require("node-schedule");
const tempUpdateSchedule = schedule.scheduleJob(
  "0 0 */6 * * *", //schedule weather data update to occur every 6 hours
  function () {
    updateAllWeatherData();
  }
);

//Going to include threshold data in temperature data pull
// //Check for heat threshold for user's suburb required parameter
// app.get('/api/DistrictThreshold/:suburb', [param('suburb').not().isEmpty()],
//     async function (req, res) {

//         const dbConnection = mysql.createConnection({ //open db connection
//             host: process.env.DB_ENDPOINT,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_NAME
//         });

//         suburbThreshold = await getSpecificThreshold(dbConnection, req.params.suburb) //call appropriate function
//         dbConnection.end() //close db connection
//         res.json(suburbThreshold) //send response
//     })

// //con.query(<sql query>, <parameters you want to pass>, function to return)

// async function getSpecificThreshold(dbConnection, userSuburb) {
//     return new Promise(resultData => {
//         dbConnection.query(
//             `SELECT d.threshold
//              FROM District d, Suburb s, Council c
//              WHERE s.council_id = c.council_id
//              AND c.district_id = d.district_id
//              AND s.suburb = ?;`, //? Represents a parameter
//             userSuburb, //parameter you want inserted where the ? is
//             function (error, result, fields) {
//                 if (error) {
//                     //Log error message
//                     console.log(error)
//                     console.log("Failed to retrieve user suburb threshold Data")
//                 }
//                 try {
//                     //set resultData to query result
//                     resultData(result);

//                 } catch (error) {
//                     resultData({}); //Set resultData to empty
//                     console.log("There was an error with the promise");
//                 }
//             }
//         )
//     })
// }

//Check for Weather Forecast for user's Suburb required parameter
app.get(
  "/api/SuburbForecast/:suburb",
  [param("suburb").not().isEmpty()],
  async function (req, res) {
    const dbConnection = mysql.createConnection({
      //open db connection
      host: process.env.DB_ENDPOINT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    weatherForecast = await getWeatherForecastSuburb(
      dbConnection,
      req.params.suburb
    ); //call appropriate function
    dbConnection.end(); //close db connection
    res.json(weatherForecast); //send response
  }
);

async function getWeatherForecastSuburb(dbConnection, suburbId) {
  return new Promise((resultData) => {
    dbConnection.query(
      `SELECT f.date,
                f.min,
                f.max,
                f.avg,
                f.update_time,
                c.council,
                s.suburb,
                s.postcode,
                d.threshold,
                d.district_name
            FROM Forecast f,
                Council c,
                Suburb s,
                District d
            WHERE f.council_id = c.council_id
                AND c.district_id = d.district_id
                AND c.council_id = s.council_id
                AND s.suburb_id = ?;`, //? Represents a parameter
      suburbId, //parameter you want inserted where the ? is
      function (error, result, fields) {
        if (error) {
          //Log error message
          console.log(error);
          console.log("Failed to retrieve user weather forecast Data");
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

//Check for weather forecast for Melbourne required parameter
app.get("/api/MelbourneForecast", async function (req, res) {
  const dbConnection = mysql.createConnection({
    //open db connection
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  defaultWeatherForecast = await getDefaultWeatherForecast(dbConnection); //call appropriate function

  dbConnection.end(); //close db connection

  res.json(defaultWeatherForecast); //send response
});

async function getDefaultWeatherForecast(dbConnection) {
  return new Promise((resultData) => {
    dbConnection.query(
      `SELECT f.date,
                f.min,
                f.max,
                f.avg,
                f.update_time,
                c.council,
                s.suburb,
                s.postcode,
                d.threshold,
                d.district_name
            FROM Forecast f,
                Council c,
                Suburb s,
                District d
            WHERE f.council_id = c.council_id
                AND c.district_id = d.district_id
                AND c.council_id = s.council_id
                AND s.suburb_id = 1794;`, //? Represents a parameter
      function (error, result, fields) {
        if (error) {
          //Log error message
          console.log(error);
          console.log("Failed to retrieve melbourne weather forecast Data");
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

//Going to include threshold data in temperature data pull
// //Check for threshold for Melbourne (default) required parameter
// app.get('/api/MelbourneThreshold',
//     async function (req, res) {
//         const dbConnection = mysql.createConnection({ //open db connection
//             host: process.env.DB_ENDPOINT,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_NAME
//         });

//         defaultSuburbThreshold = await getDefaultThreshold(dbConnection) //call appropriate function

//         dbConnection.end() //close db connection

//         res.json(defaultSuburbThreshold) //send response
//     })

// //con.query(<sql query>, <parameters you want to pass>, function to return)

// async function getDefaultThreshold(dbConnection) {
//     return new Promise(resultData => {
//         dbConnection.query(
//             `SELECT threshold
//              FROM District
//              WHERE district_name = 'Central District';`, //? Represents a parameter
//             function (error, result, fields) {
//                 if (error) {
//                     //Log error message
//                     console.log(error)
//                     console.log("Failed to retrieve melbourne threshold Data")
//                 }
//                 try {
//                     //set resultData to query result
//                     resultData(result);

//                 } catch (error) {
//                     resultData({}); //Set resultData to empty
//                     console.log("There was an error with the promise");
//                 }
//             }
//         )
//     })
// }

//Check for heatwave preparation advice required parameter
app.get("/api/Advice_pre", async function (req, res) {
  const dbConnection = mysql.createConnection({
    //open db connection
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  heatPrepAdvice = await getHeatPrep(dbConnection); //call appropriate function

  dbConnection.end(); //close db connection

  res.json(heatPrepAdvice); //send response
});

//con.query(<sql query>, <parameters you want to pass>, function to return)

async function getHeatPrep(dbConnection) {
  return new Promise((resultData) => {
    dbConnection.query(
      `SELECT *
             FROM Advice_pre;`, //? Represents a parameter
      function (error, result, fields) {
        if (error) {
          //Log error message
          console.log(error);
          console.log("Failed to retrieve preparation advice content Data");
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

//Check for heatwave advice required parameter
app.get("/api/Advice", async function (req, res) {
  const dbConnection = mysql.createConnection({
    //open db connection
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  heatAdvice = await getHeatAdvice(dbConnection); //call appropriate function

  dbConnection.end(); //close db connection

  res.json(heatAdvice); //send response
});

//con.query(<sql query>, <parameters you want to pass>, function to return)

async function getHeatAdvice(dbConnection) {
  return new Promise((adviceData) => {
    dbConnection.query(
      `SELECT *
             FROM Advice;`, //? Represents a parameter
      function (error, result, fields) {
        if (error) {
          //Log error message
          console.log(error);
          console.log("Failed to retrieve advice content Data");
        }
        try {
          //set resultData to query result
          adviceData(result);
        } catch (error) {
          adviceData({}); //Set resultData to empty
          console.log("There was an error with the promise");
        }
      }
    );
  });
}

//Check for all suburbs required parameter
app.get("/api/SuburbList", async function (req, res) {
  const dbConnection = mysql.createConnection({
    //open db connection
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  allSuburbs = await getAllSuburbs(dbConnection); //call appropriate function

  res.json(allSuburbs); //send response

  dbConnection.end(); //close db connection
});

//con.query(<sql query>, <parameters you want to pass>, function to return)

async function getAllSuburbs(dbConnection) {
  return new Promise((resultData) => {
    dbConnection.query(
      `SELECT s.suburb_id, s.suburb, s.council_id, s.postcode, c.council 
         FROM Suburb s, Council c
         WHERE s.council_id = c.council_id;`, //? Represents a parameter
      function (error, result, fields) {
        if (error) {
          //Log error message
          console.log(error);
          console.log("Failed to retrieve Council Data");
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

async function getAllCouncils() {
  //This function retrieves the details of all Local Government Councils
  //from the mysql db

  //Establish mySQL connection
  const conTemp = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  //run query and return as a promise
  return new Promise((resultData) => {
    conTemp.query(
      `SELECT *
         FROM Council
         WHERE council_id < 81;`,
      function (error, result, fields) {
        if (error) {
          //Log error message
          console.log(error);
          console.log("Failed to retrieve Council Data");
        }
        try {
          //set resultData to query result
          resultData(result);
          conTemp.end();
        } catch (error) {
          resultData({}); //Set resultData to empty
          console.log("There was an error with the promise");
        }
      }
    );
  });
}

async function updateAllWeatherData() {
  //Establish mySQL connection
  const conTemp = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("UpdateAllWeatherData() ran at " + new Date());
  const councilData = await getAllCouncils(); //get council data
  //console.log(councilData)
  //console.log("UpdateAllWeatherData() received council data at" + new Date());

  for (let i in councilData) {
    //weather API link format:
    //https://api.openweathermap.org/data/2.5/onecall?lat={latitude}&lon={longitude}&exclude=hourly,current,minutely&units=metric&appid=process.env.OPEN_WEATHER_ONE_CALL_API
    //console.log(councilData[i])
    const tempRequestStart = "https://api.openweathermap.org/data/2.5/onecall?";
    const tempRequestEnd =
      "&exclude=hourly,current,minutely&units=metric&appid=" +
      process.env.OPEN_WEATHER_ONE_CALL_API;

    const tempRequestFinal =
      tempRequestStart +
      "lat=" +
      councilData[i]["latitude"] +
      "&lon=" +
      councilData[i]["longitude"] +
      tempRequestEnd; //create request URL

    let temperatureData = undefined;

    await axios
      .get(tempRequestFinal) //Request temperature data
      .then(function (response) {
        //console.log("temperatureRequested")
        temperatureData = response.data;
        //console.log(temperatureData)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    console.log(
      "Temperature data for " +
        councilData[i]["council"] +
        " received at " +
        new Date()
    );
    for (let forecast in temperatureData["daily"]) {
      // console.log("Temperature processing starts here")
      if (forecast < 7) {
        //Average temperature calculation requires next day's minimum temperature, hence the final day is excluded.
        //Obtain data for each day
        //console.log(temperatureData["daily"][forecast]);

        const currentDay = temperatureData["daily"][forecast];

        var forecastDate = new Date(currentDay["dt"] * 1000);
        //console.log(forecastDate);
        forecastDate = dateFormat(forecastDate, "dd-mm-yyyy");
        const maxTemp = currentDay["temp"]["max"];
        const minTemp = currentDay["temp"]["min"];
        const nextMinTemp =
          temperatureData["daily"][parseInt(forecast) + 1]["temp"]["min"];
        var avgTemp = (
          (parseFloat(maxTemp) + parseFloat(nextMinTemp)) /
          2
        ).toFixed(2);
        const councilId = councilData[i]["council_id"];
        const update_time =
          dateFormat(new Date(), "dd-mm-yyyy") +
          " " +
          dateFormat(new Date(), "HH:MM:ss");

        // console.log(councilId, councilData[i]["council"], forecastDate)

        //console.log("Query starts here at " + new Date())

        const sunrise =
          dateFormat(new Date(currentDay["sunrise"] * 1000), "dd-mm-yyyy") +
          " " +
          dateFormat(new Date(currentDay["sunrise"] * 1000), "HH:MM:ss");

        const sunset =
          dateFormat(new Date(currentDay["sunset"] * 1000), "dd-mm-yyyy") +
          " " +
          dateFormat(new Date(currentDay["sunset"] * 1000), "HH:MM:ss");

        const tempDay = currentDay["temp"]["day"];
        const tempNight = currentDay["temp"]["night"];
        const tempEve = currentDay["temp"]["eve"];
        const tempMorn = currentDay["temp"]["morn"];
        const feelsDay = currentDay["feels_like"]["day"];
        const feelsNight = currentDay["feels_like"]["night"];
        const feelsEve = currentDay["feels_like"]["eve"];
        const feelsMorn = currentDay["feels_like"]["morn"];
        const pressure = currentDay["pressure"];
        const humidity = currentDay["humidity"];
        const dewPoint = currentDay["dew_point"];
        const windSpeed = currentDay["wind_speed"];
        const windDeg = currentDay["wind_deg"];
        const weather = currentDay["weather"][0]["main"];
        const weatherDesc = currentDay["weather"][0]["description"];
        const clouds = currentDay["clouds"];
        const pop = currentDay["pop"];
        const rain = currentDay["rain"];
        const uvi = currentDay["uvi"];

        conTemp.query(
          //Run query to insert or update data on database
          `INSERT INTO Forecast (date, council_id, min, max, avg, update_time, sunrise, sunset, temp_day, temp_night, temp_eve, temp_morn, feels_like_day,
                                feels_like_night, feels_like_eve, feels_like_morn, pressure, humidity, dew_point, wind_speed, wind_degree, 
                                weather, weather_description, clouds, pop, rain, uvi 
                                )
                         VALUES (STR_TO_DATE(?, '%d-%m-%Y'), ?, ?, ?, ?, STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s'),
                                STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s'), STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s'), ?, ?, ?, ?, ?
                                , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY
                         UPDATE min = VALUES(min),
                                max =values(max),
                                avg = values(avg),
                                update_time = values(update_time),
                                sunrise = values(sunrise),
                                sunset = values(sunset),
                                temp_day = values(temp_day),
                                temp_night = values(temp_night),
                                temp_eve = values(temp_eve),
                                temp_morn = values(temp_morn),
                                feels_like_day = values(feels_like_day),
                                feels_like_night = values(feels_like_night),
                                feels_like_eve = values(feels_like_eve),
                                feels_like_morn = values(feels_like_morn),
                                pressure = values(pressure),
                                humidity = values(humidity),
                                dew_point = values(dew_point),
                                wind_speed = values(wind_speed),
                                wind_degree = values(wind_degree),
                                weather = values(weather),
                                weather_description = values(weather_description),
                                clouds = values(clouds),
                                pop = values(pop),
                                rain = values(rain),
                                uvi = values(uvi);`,
          [
            forecastDate,
            councilId,
            minTemp,
            maxTemp,
            avgTemp,
            update_time,
            sunrise,
            sunset,
            tempDay,
            tempNight,
            tempEve,
            tempMorn,
            feelsDay,
            feelsNight,
            feelsEve,
            feelsMorn,
            pressure,
            humidity,
            dewPoint,
            windSpeed,
            windDeg,
            weather,
            weatherDesc,
            clouds,
            pop,
            rain,
            uvi,
          ],
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
    }
    console.log(
      "Temperature data for " +
        councilData[i]["council"] +
        " updated in db at " +
        new Date()
    );
  }

  console.log("All weather data updated");
  conTemp.end();
}
