require('dotenv').config()
const { check, validationResult, query, body, param } = require('express-validator');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()

app.use(bodyParser.json())
const mysql = require('mysql');
const port = 8080;

app.listen(port, () => console.log(`Heat Prep listening on port ${port}!`))

//Example Weather API Call
//https://api.openweathermap.org/data/2.5/onecall?lat=-38.2551&lon=144.6726&exclude=hourly,current,minutely&units=metric&appid=process.env.OPEN_WEATHER_ONE_CALL_API

app.get('/', (req, res) => res.send("Heat Preparedness Application Server"))



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
