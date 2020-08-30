import React from 'react';
import Typography from "@material-ui/core/Typography";





async function getPreparationData() {


    var preparationData = undefined
    const dataLink = "http://ec2-52-65-67-96.ap-southeast-2.compute.amazonaws.com:8080/api/Advice_pre"

    const axios = require('axios').default;

    await axios.get(dataLink)
        .then(function (response) {
            console.log(response)
            preparationData = response.data
        })
        .catch(function (error) {
            //handle error
            console.log(error);
        });

    return preparationData

}

export default function HeatWaves() {

    var preparationData = await getPreparationData();
    console.log(preparationData)
    return (
        <React.Fragment>
            <Typography variant="h4">
                hjohohofho;
            </Typography>
        </React.Fragment>
    )

}