require('dotenv').config()
const { check, validationResult, query, body, param } = require('express-validator');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()

app.use(bodyParser.json())
const mysql = require('mysql');
const port = 8080

app.listen(port, () => console.log(`Heat Prep listening on port ${port}!`))

const conTemp = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

var schedule = require('node-schedule');

app.get('/',
    async function (req, res) {
        suburbs = await getAllSuburbs(), //call appropriate function
            res.json(suburbs) //send response
    })

var j = schedule.scheduleJob('*/180 * * * *',
    function () {
        getAllSuburbs()
    });

async function getAllSuburbs() {
    conTemp.query(
        `SELECT suburb
         FROM Suburb;`,
        function (err, rows, fields) {
            if (err) throw err

            console.log('This job ran at ' + new Date())
            console.log("it worked!")
            console.log('rows:', rows)
            return rows //return results
        }
    )
}