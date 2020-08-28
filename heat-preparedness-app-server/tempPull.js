require('dotenv').config()
const { check, validationResult, query, body, param } = require('express-validator');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()

app.use(bodyParser.json())
const mysql = require('mysql');
const port = 8080

app.listen(port, () => console.log(`Temp Pull Testing on port ${port}!`))

var schedule = require('node-schedule');

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

var j = schedule.scheduleJob('*/180 * * * *',
    function () {
        getAllCouncils()
    });

async function getAllCouncils() {

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




            var objs = [];
            for (var i = 0; i < rows.length; i++) {
                objs.push(rows[i]);
            }

            //console.log('This job ran at ' + new Date())

            //console.log('rows:', rows)
            //console.log("it worked!")
            return objs //return results
        }
    )

}


async function updateAllWeatherData() {

    console.log("woop woop")
    const councils = await getAllCouncils()
    console.log(councils)
    console.log("it worked!")





    return councils





}