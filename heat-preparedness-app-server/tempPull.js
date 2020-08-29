require('dotenv').config()
const { check, validationResult, query, body, param } = require('express-validator');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()

app.use(bodyParser.json())
const mysql = require('mysql');
const port = 8080

app.listen(port, () => console.log(`Temp Pull Testing on port ${port}!`))
const axios = require('axios').default
const schedule = require('node-schedule');

const dateFormat = require('dateformat');



app.get('/',
    (req, res) => {
        var conTemp = mysql.createConnection({
            host: process.env.DB_ENDPOINT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        conTemp.query(
            `SELECT *
         FROM LGA;`,
            function (err, rows, fields) {
                if (err) throw (err)

                //console.log('This job ran at ' + new Date())

                //console.log('rows:', rows)
                //console.log("it worked!")
                res.json(rows) //return results
            }
        )

    })

updateAllWeatherData()

var j = schedule.scheduleJob('*/240 * * * *',
    function () {
        updateAllWeatherData()
    });

async function getAllCouncils() {
    //This function retrieves the details of all Local Government Councils
    //from the mysql db

    //Establish mySQL connection
    var conTemp = mysql.createConnection({
        host: process.env.DB_ENDPOINT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    //run query and return as a promise
    return new Promise(resultData => {
        conTemp.query(
            `SELECT *
         FROM LGA;`,
            function (error, result, fields) {
                if (error) {
                    //Log error message
                    console.log(error)
                    console.log("Failed to retrieve Council Data")
                }
                try {
                    //set resultData to query result
                    resultData(result);

                } catch (error) {
                    resultData({}); //Set resultData to empty
                    console.log("There was an error with the promise");
                }

            }
        )
    })
}


async function updateAllWeatherData() {

    //Establish mySQL connection
    const conTemp = mysql.createConnection({
        host: process.env.DB_ENDPOINT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log('UpdateAllWeatherData() ran at ' + new Date())
    const resultData = await getAllCouncils()
    console.log('UpdateAllWeatherData() received results at' + new Date())


    for (let i in resultData) {
        const tempRequestStart = "https://api.openweathermap.org/data/2.5/onecall?"
        const tempRequestEnd = "&exclude=hourly,current,minutely&units=metric&appid=" + process.env.OPEN_WEATHER_ONE_CALL_API

        const tempRequestFinal = tempRequestStart + "lat=" + resultData[i]["latitude"] + "&lon=" + resultData[i]["longitude"] + tempRequestEnd

        let temperatureData = undefined

        await axios.get(tempRequestFinal)
            .then(function (response) {
                temperatureData = response.data
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        console.log("Temperature data retrieved at " + new Date())
        for (let forecast in temperatureData["daily"]) {
            console.log("Temperature processing starts here")
            if (forecast < 7) {
                var forecastDate = new Date(temperatureData["daily"][forecast]["dt"] * 1000)
                forecastDate = dateFormat(forecastDate, 'dd-mm-yyyy')
                const maxTemp = temperatureData["daily"][forecast]["temp"]["max"]
                const minTemp = temperatureData["daily"][forecast]["temp"]["min"]
                const nextMinTemp = temperatureData["daily"][parseInt(forecast) + 1]["temp"]["min"]
                const state = resultData[i]["state"]
                const councilName = resultData[i]["council"]
                const district = resultData[i]["district"]
                var avgTemp = ((parseFloat(maxTemp) + parseFloat(nextMinTemp)) / 2).toFixed(2)

                //console.log(councilName, forecastDate)

                //console.log("Query starts here at " + new Date())

                conTemp.query(
                    `INSERT INTO Forecast (date, state, council, min, max, avg, district)
                         VALUES (STR_TO_DATE(?, '%d-%m-%Y'), ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY
                         UPDATE min = VALUES(min),
                                max =values(max),
                                avg = values(avg)`,
                    [
                        forecastDate, state, councilName, minTemp, maxTemp, avgTemp, district
                    ],
                    function (error, result, fields) {
                        if (error) {
                            //Log error message
                            console.log(error)
                            console.log("Failed to update forecast")
                        }
                        else {
                            console.log("Database updated")
                        }

                    }
                )

            }

        }
        conTemp.end()
        console.log("All weather data updated")
    }


    /*var conTemp = mysql.createConnection({
        host: process.env.DB_ENDPOINT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    conTemp.query(
        `SELECT *
         FROM LGA;`,
        async function (err, rows, fields) {
            if (err) {
                console.log(err)
            }

            console.log("data retrieved at" + new Date())

            


            console.log(rows[0]["latitude"])


            //console.log('This job ran at ' + new Date())

            //console.log('rows:', rows)
            //console.log("it worked!")
            return (rows) //return results}
        }
    )*/




}