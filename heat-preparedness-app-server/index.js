require('dotenv').config()
const { check, validationResult, query, body, param } = require('express-validator');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const dateFormat = require('dateformat');
const axios = require('axios').default;
app.use(bodyParser.json());
const mysql = require('mysql');
const port = 8080;

app.listen(port, () => console.log(`Heat Prep listening on port ${port}!`))

//Example Weather API Call
//https://api.openweathermap.org/data/2.5/onecall?lat=-38.2551&lon=144.6726&exclude=hourly,current,minutely&units=metric&appid=process.env.OPEN_WEATHER_ONE_CALL_API

app.get('/', (req, res) => res.send("Heat Preparedness Application Server"))

updateAllWeatherData()
const schedule = require('node-schedule');
const tempUpdateSchedule = schedule.scheduleJob('*/240 * * * *', //schedule weather data update to occur every 4 hours
    function () {
        updateAllWeatherData()
    });

//Check for heat threshold for user's suburb required parameter
app.get('/api/DistrictThreshold/:suburb', [param('suburb').not().isEmpty()],
    async function (req, res) {

        const dbConnection = mysql.createConnection({ //open db connection
            host: process.env.DB_ENDPOINT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        suburbThreshold = await getSpecificThreshold(dbConnection, req.params.suburb) //call appropriate function
        dbConnection.end() //close db connection
        res.json(suburbThreshold) //send response
    })

//con.query(<sql query>, <parameters you want to pass>, function to return)

async function getSpecificThreshold(dbConnection, userSuburb) {
    return new Promise(resultData => {
        dbConnection.query(
            `SELECT d.threshold
             FROM District d, Suburb s
             WHERE s.district = d.district_name
             AND s.suburb = ?;`, //? Represents a parameter
            userSuburb, //parameter you want inserted where the ? is 
            function (error, result, fields) {
                if (error) {
                    //Log error message
                    console.log(error)
                    console.log("Failed to retrieve user suburb threshold Data")
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

//Check for Weather Forecast for user's Suburb required parameter
app.get('/api/SuburbForecast/:suburb', [param('suburb').not().isEmpty()],
    async function (req, res) {
        const dbConnection = mysql.createConnection({ //open db connection
            host: process.env.DB_ENDPOINT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        weatherSuburb = await getWeatherForecastSuburb(dbConnection, req.params.suburb) //call appropriate function
        dbConnection.end() //close db connection   
        res.json(weatherSuburb) //send response
    })


async function getWeatherForecastSuburb(dbConnection, weatherforecast) {
    return new Promise(resultData => {
        dbConnection.query(
            `SELECT f.date,
                f.state,
                f.council,
                f.min,
                f.max,
                f.avg
            FROM Forecast f,
                LGA l,
                Suburb s
            WHERE l.council = s.council
                AND l.district = s.district
                AND l.state = s.state
                AND f.council = l.council
                AND f.district = l.district
                AND f.state = l.state
                AND s.suburb = ?;`, //? Represents a parameter
            weatherforecast, //parameter you want inserted where the ? is 
            function (error, result, fields) {
                if (error) {
                    //Log error message
                    console.log(error)
                    console.log("Failed to retrieve user weather forecast Data")
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

//Check for weather forecast for Melbourne required parameter
app.get('/api/MelbourneForecast',
    async function (req, res) {

        const dbConnection = mysql.createConnection({ //open db connection
            host: process.env.DB_ENDPOINT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        defaultWeatherForecast = await getDefaultWeatherForecast(dbConnection) //call appropriate function

        dbConnection.end() //close db connection   

        res.json(defaultWeatherForecast) //send response
    })


async function getDefaultWeatherForecast(dbConnection) {
    return new Promise(resultData => {
        dbConnection.query(
            `SELECT f.date,
                f.state,
                f.council,
                f.min,
                f.max,
                f.avg
            FROM Forecast f,
                LGA l,
                Suburb s
            WHERE l.council = s.council
                AND l.district = s.district
                AND l.state = s.state
                AND f.council = l.council
                AND f.district = l.district
                AND f.state = l.state
                AND s.suburb = 'Melbourne';`, //? Represents a parameter 
            function (error, result, fields) {
                if (error) {
                    //Log error message
                    console.log(error)
                    console.log("Failed to retrieve melbourne weather forecast Data")
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

//Check for threshold for Melbourne (default) required parameter
app.get('/api/MelbourneThreshold',
    async function (req, res) {
        const dbConnection = mysql.createConnection({ //open db connection
            host: process.env.DB_ENDPOINT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        defaultSuburbThreshold = await getDefaultThreshold(dbConnection) //call appropriate function

        dbConnection.end() //close db connection   

        res.json(defaultSuburbThreshold) //send response
    })

//con.query(<sql query>, <parameters you want to pass>, function to return)

async function getDefaultThreshold(dbConnection) {
    return new Promise(resultData => {
        dbConnection.query(
            `SELECT threshold
             FROM District
             WHERE district_name = 'Central District';`, //? Represents a parameter
            function (error, result, fields) {
                if (error) {
                    //Log error message
                    console.log(error)
                    console.log("Failed to retrieve melbourne threshold Data")
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

//Check for heatwave preparation advice required parameter
app.get('/api/Advice_pre',
    async function (req, res) {

        const dbConnection = mysql.createConnection({ //open db connection
            host: process.env.DB_ENDPOINT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        heatPrepAdvice = await getHeatPrep(dbConnection) //call appropriate function

        dbConnection.end() //close db connection   

        res.json(heatPrepAdvice) //send response
    })

//con.query(<sql query>, <parameters you want to pass>, function to return)

async function getHeatPrep(dbConnection) {
    return new Promise(resultData => {
        dbConnection.query(
            `SELECT *
             FROM Advice_pre;`, //? Represents a parameter
            function (error, result, fields) {
                if (error) {
                    //Log error message
                    console.log(error)
                    console.log("Failed to retrieve preparation advice content Data")
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

//Check for heatwave advice required parameter
app.get('/api/Advice',
    async function (req, res) {

        const dbConnection = mysql.createConnection({ //open db connection
            host: process.env.DB_ENDPOINT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        heatAdvice = await getHeatAdvice(dbConnection) //call appropriate function

        dbConnection.end() //close db connection  

        res.json(heatAdvice) //send response
    })

//con.query(<sql query>, <parameters you want to pass>, function to return)

async function getHeatAdvice(dbConnection) {
    return new Promise(adviceData => {
        dbConnection.query(
            `SELECT *
             FROM Advice;`, //? Represents a parameter
            function (error, result, fields) {
                if (error) {
                    //Log error message
                    console.log(error)
                    console.log("Failed to retrieve advice content Data")
                }
                try {
                    //set resultData to query result
                    adviceData(result);

                } catch (error) {
                    adviceData({}); //Set resultData to empty
                    console.log("There was an error with the promise");
                }
            }
        )
    })
}

//Check for all suburbs required parameter
app.get('/api/SuburbList',
    async function (req, res) {
        const dbConnection = mysql.createConnection({ //open db connection
            host: process.env.DB_ENDPOINT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        allsuburb = await getAllsuburb(dbConnection) //call appropriate function

        res.json(allsuburb) //send response

        dbConnection.end() //close db connection  
    })

//con.query(<sql query>, <parameters you want to pass>, function to return)

async function getAllsuburb(dbConnection) {
    return new Promise(resultData => {
        dbConnection.query(
            `SELECT suburb
         FROM Suburb;`,//? Represents a parameter
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

async function getAllCouncils() {
    //This function retrieves the details of all Local Government Councils
    //from the mysql db

    //Establish mySQL connection
    const conTemp = mysql.createConnection({
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
                    conTemp.end();

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
    console.log('UpdateAllWeatherData() received council data at' + new Date())


    for (let i in resultData) {
        //weather API link format:
        //https://api.openweathermap.org/data/2.5/onecall?lat={latitude}&lon={longitude}&exclude=hourly,current,minutely&units=metric&appid=process.env.OPEN_WEATHER_ONE_CALL_API

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
        console.log("Temperature data for " + resultData[i]["council"] + " received at " + new Date())
        for (let forecast in temperatureData["daily"]) {
            // console.log("Temperature processing starts here")
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
                            // console.log("Database updated")
                        }

                    }
                )

            }

        }
        console.log("Temperature data for " + resultData[i]["council"] + " updated in db at " + new Date())

    }

    console.log("All weather data updated")
    conTemp.end()
}