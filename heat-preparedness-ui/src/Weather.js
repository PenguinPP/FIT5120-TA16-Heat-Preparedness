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
            */

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
                <List>
                    {weatherData.map(item =>
                        <ListItem key={item.date}>
                            {item.council}, {item.date}: max temperature is {item.max}
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