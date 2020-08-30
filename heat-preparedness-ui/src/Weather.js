import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { List, ListItem } from '@material-ui/core';

export default function Weather(weatherInformation) {

    const [suburb, seSuburb] = React.useState("Melbourne")



    console.log(weatherInformation["weatherInformation"])

    return (

        /*        <Button onClick = {() => setSuburb("Bellfield")>
        */

        <React.Fragment>
            <Typography variant="h4">
                Weather Information
        </Typography>
            <List>
                {weatherInformation["weatherInformation"].map(item =>
                    <ListItem key={item.date}>
                        {item.council}, {item.date}: max temperature is {item.max}
                    </ListItem>
                )}
            </List>
        </React.Fragment>
    )
}