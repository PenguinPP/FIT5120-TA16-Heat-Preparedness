import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { List, ListItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
const axios = require('axios').default;


export default function Weather(weatherInformation) {


    var suburbList = []

    for (let entry in weatherInformation["suburbList"]) {
        suburbList.push(weatherInformation["suburbList"][entry]["suburb"])
    }

    const [suburb, setSuburb] = React.useState("Melbourne")
    const [weatherData, setWeatherData] = React.useState([weatherInformation["weatherInformation"]])


    React.useEffect(() => {
        let dataLink = "http://ec2-52-65-67-96.ap-southeast-2.compute.amazonaws.com:8080/api/SuburbForecast/" + suburb

        axios.get(dataLink)
            .then(results => results.data)
            .then(data => {
                if (suburb === "Melbourne") {
                    setWeatherData(data.filter(item => item.council === "Melbourne City"))
                }
                else {
                    setWeatherData(data)
                }
                //console.log(weatherData)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [suburb])

    if (suburbList.includes(suburb)) {
        return (

            /*        <Button onClick = {() => setSuburb("Bellfield")>

            NEED TO ADD COUNCIL {item.council}
            */

            <React.Fragment>
                <Typography variant="h4">
                    Forecast
                </Typography>
                <Typography style={{ marginTop: "1rem" }}>
                    Enter the name of your suburb below (case sensitive)
                </Typography>
                <TextField
                    fullWidth={true}
                    value={suburb}
                    onChange={(event) => setSuburb(event.target.value)}
                >

                </TextField>
                <Typography variant="h5" style={{ marginTop: "2rem", marginBottom: "1rem" }}>
                    Temperatures for next week
                </Typography>

                <List>
                    {weatherData.map(item =>
                        <ListItem key={item.date}>
                            {item.date ? item.date.toString().replace(/\T.+/, '').substring(5, 10) : ""} : max {item.max ? item.max : ""}°     |     min {item.min ? item.min : ""}°     |     avg {item.avg ? item.avg : ""}°
                        </ListItem>
                    )}
                </List>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <Typography variant="h4">
                    Forecast
        </Typography>
                <Typography>
                    Enter the name of your suburb below (case sensitive)
</Typography>
                <TextField
                    fullWidth={true}
                    value={suburb}
                    onChange={(event) => setSuburb(event.target.value)}
                >

                </TextField>
                <Typography>
                    Please enter a valid suburb name. For example, "Melbourne" or "Oakleigh East" Please note that the form is case-sensitive.
                </Typography>
            </React.Fragment>
        )
    }
}

/*
import React from 'react';
            import { makeStyles } from '@material-ui/core/styles';
            import Table from '@material-ui/core/Table';
            import TableBody from '@material-ui/core/TableBody';
            import TableCell from '@material-ui/core/TableCell';
            import TableContainer from '@material-ui/core/TableContainer';
            import TableHead from '@material-ui/core/TableHead';
            import TableRow from '@material-ui/core/TableRow';
            import Paper from '@material-ui/core/Paper';

            const useStyles = makeStyles({
            table: {
                minWidth: 650,
            },
            });

            function createData(name, calories, fat, carbs, protein) {
            return { name, calories, fat, carbs, protein };
            }

            const rows = [
            createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
            createData('Eclair', 262, 16.0, 24, 6.0),
            createData('Cupcake', 305, 3.7, 67, 4.3),
            createData('Gingerbread', 356, 16.0, 49, 3.9),
            ];

            export default function SimpleTable() {
            const classes = useStyles();

            return (
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            );
            }
*/