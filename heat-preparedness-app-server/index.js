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

app.get('/', (req, res) => res.send("Heat Preparedness Application Server"))

con.connect(function (err) {
    if (err) throw err;
})

app.get('/api/showSpecificArea/:areaName', [param('areaName').not().isEmpty()],
    async function (req, res) {
        areaInfo = await getSpecificDistrict(req.params.areaName),
            res.json(areaInfo)
    })


async function getSpecificDistrict(selectedArea) {
    con.query(
        'SELECT * FROM LGA WHERE lga_area = ?',
        selectedArea,
        function (err, rows, fields) {
            if (err) throw err

            console.log('rows:', rows)
            return rows
        }
    )
}