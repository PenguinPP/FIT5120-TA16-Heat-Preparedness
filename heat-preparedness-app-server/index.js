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
app.get('/api/showSpecificArea/:areaName', [param('areaName').not().isEmpty()],
    async function (req, res) {
        areaInfo = await getSpecificDistrict(req.params.areaName), //call appropriate function
            res.json(areaInfo) //send response
    })


async function getSpecificDistrict(selectedArea) {
    con.query(
        'SELECT * FROM LGA WHERE lga_area = ?', //? Represents a parameter
        selectedArea, //parameter you want inserted where the ? is 
        function (err, rows, fields) {
            if (err) throw err

            console.log('rows:', rows)
            return rows //return results
        }
    )
}