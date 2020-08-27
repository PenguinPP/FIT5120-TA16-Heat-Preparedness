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
//Check for required parameter
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

app.get('/api/DistrictThreshold/:suburb', [param('suburb').isEmpty()],
    async function (req, res) {
        defaultsuburbThreshold = await getdefaultThreshold(req.params.suburb), //call appropriate function
            res.json(defaultsuburbThreshold) //send response
    })


async function getdefaultThreshold(defaultSuburb) {
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
        defaultSuburb, //parameter you want inserted where the ? is 
        function (err, rows, fields) {
            if (err) throw err

            // console.log('rows:', rows)
            return rows //return results
        }
    )
}