require('dotenv').config()
const { check, validationResult, query, body, param } = require('express-validator');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()

app.use(bodyParser.json())
const mysql = require('mysql');
const port = 8080

app.listen(port, () => console.log(`Heat Prep listening on port ${port}!`))

const con = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


//Example Weather API Call
//https://api.openweathermap.org/data/2.5/onecall?lat=-38.2551&lon=144.6726&exclude=hourly,current,minutely&units=metric&appid=process.env.OPEN_WEATHER_ONE_CALL_API

app.get('/', (req, res) => res.send("Heat Preparedness Application Server"))

con.connect(function (err) {
    if (err) throw err;
})

//Check for heat threshold for user's suburb required parameter
app.get('/api/DistrictThreshold/:suburb', [param('suburb').not().isEmpty()],
    async function (req, res) {
        suburbThreshold = await getSpecificThreshold(req.params.suburb), //call appropriate function
            res.json(suburbThreshold) //send response
    })

//con.query(<sql query>, <parameters you want to pass>, function to return)

async function getSpecificThreshold(userSuburb) {
    con.query(
        `SELECT threshold
         FROM District d,
                LGA l,
                Suburb s
         WHERE d.state = l.state
            AND d.district_name = l.district
            AND l.council = s.council
            AND s.suburb = ?;`, //? Represents a parameter
        userSuburb, //parameter you want inserted where the ? is 
        function (err, rows, fields) {
            if (err) throw err

            // console.log('rows:', rows)
            return rows //return results
        }
    )
}

//Check for Weather Forecast for user's Suburb required parameter
app.get('/api/DistrictThreshold/:suburb', [param('suburb').not().isEmpty()],
    async function (req, res) {
        weathersuburb = await getweatherforecastsuburb(req.params.suburb), //call appropriate function
            res.json(weathersuburb) //send response
    })


async function getweatherforecastsuburb(weatherforecast) {
    con.query(
        `SELECT f.date,
            f.state,
            f.area,
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
        function (err, rows, fields) {
            if (err) throw err

            // console.log('rows:', rows)
            return rows //return results
        }
    )
}

//Check for weather forecast for Melbourne required parameter
app.get('/api/DistrictThreshold/:suburb', [param('suburb').isEmpty()],
    async function (req, res) {
        defaultweatherforceast = await getdefaultweatherforceast(req.params.suburb), //call appropriate function
            res.json(defaultweatherforceast) //send response
    })


async function getdefaultweatherforceast() {
    con.query(
        `SELECT f.date,
            f.state,
            f.area,
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
            AND s.surburb = 'Melbourne';`, //? Represents a parameter (parameter you want inserted where the ? is )
        function (err, rows, fields) {
            if (err) throw err

            // console.log('rows:', rows)
            return rows //return results
        }
    )
}

//Check for threshold for Melbourne (default) required parameter
app.get('/api/DistrictThreshold/:suburb', [param('suburb').isEmpty()],
    async function (req, res) {
        defaultsuburbThreshold = await getdefaultThreshold(req.params.suburb), //call appropriate function
            res.json(defaultsuburbThreshold) //send response
    })

//con.query(<sql query>, <parameters you want to pass>, function to return)

async function getdefaultThreshold() {
    con.query(
        `SELECT threshold
         FROM District
         WHERE district_name = 'Melbourne';`, //? Represents a parameter
        function (err, rows, fields) {
            if (err) throw err

            // console.log('rows:', rows)
            return rows //return results
        }
    )
}

//Check for heatwave preparation advice required parameter
app.get('/api/Advice_pre/:content', [param('content').not().isEmpty()],
    async function (req, res) {
        heatprep_advice = await getheatprep(req.params.content), //call appropriate function
            res.json(heatprep_advice) //send response
    })

//con.query(<sql query>, <parameters you want to pass>, function to return)

async function getheatprep() {
    con.query(
        `SELECT *
         FROM advice_preparation;`, //? Represents a parameter
        function (err, rows, fields) {
            if (err) throw err

            // console.log('rows:', rows)
            return rows //return results
        }
    )
}

//Check for heatwave advice required parameter
app.get('/api/Advice/:content', [param('content').not().isEmpty()],
    async function (req, res) {
        heatadvice = await getheatadvice(req.params.content), //call appropriate function
            res.json(heatadvice) //send response
    })

//con.query(<sql query>, <parameters you want to pass>, function to return)

async function getheatadvice() {
    con.query(
        `SELECT *
         FROM Advice;`, //? Represents a parameter
        function (err, rows, fields) {
            if (err) throw err

            // console.log('rows:', rows)
            return rows //return results
        }
    )
}

//Check for all suburbs required parameter
app.get('/api/DistrictThreshold/:suburb', [param('suburb').not().isEmpty()],
    async function (req, res) {
        allsuburb = await getallsubrb(req.params.suburb), //call appropriate function
            res.json(allsuburb) //send response
    })

//con.query(<sql query>, <parameters you want to pass>, function to return)

async function getallsuburb() {
    con.query(
        `SELECT suburb
         FROM Suburb;`,//? Represents a parameter
        function (err, rows, fields) {
            if (err) throw err

            // console.log('rows:', rows)
            return rows //return results
        }
    )
}