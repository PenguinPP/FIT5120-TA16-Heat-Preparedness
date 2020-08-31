import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { List, ListItem } from '@material-ui/core'

export default function Advice(adviceData) {

    const [category, setCategory] = React.useState("General");

    console.log(adviceData["adviceData"])

    const heat_general = adviceData["adviceData"].filter(item => item.category === "General")
    const heat_keeping_cool = adviceData["adviceData"].filter(item => item.category === "Keeping Cool")
    const heat_physical_activity = adviceData["adviceData"].filter(item => item.category === "Physical Activity")

    if (category === "General") {
        return (
            <React.Fragment>
                <Typography variant="h4">
                    Advice
                </Typography>

                <ButtonGroup variant="contained" aria-label="contained primary button">
                    <Button id="General" variant="outline" onClick={() => setCategory("General")} variant="contained" color="primary">General</Button>
                    <Button id="Keeping Cool" variant="outlined" onClick={() => setCategory("Keeping Cool")} variant="contained">Keeping Cool</Button>
                    <Button id="Physical Activity" variant="outlined" onClick={() => setCategory("Physical Activity")} variant="contained">Physical Activity</Button>
                </ButtonGroup>

                <List>
                    {heat_general.map(item =>
                        <ListItem key={item.advice_id}>
                            <Typography>
                                {item.content}
                            </Typography>
                        </ListItem>
                    )}
                </List>
            </React.Fragment>
        )
    }

    else if (category === "Keeping Cool") {
        return (
            <React.Fragment>
                <Typography variant="h4">
                    Advice
            </Typography>

                <ButtonGroup variant="contained" aria-label="contained primary button">
                    <Button id="General" variant="outlined" onClick={() => setCategory("General")} variant="contained" >General</Button>
                    <Button id="Keeping Cool" variant="outlined" onClick={() => setCategory("Keeping Cool")} variant="contained" color="primary">Keeping Cool</Button>
                    <Button id="Physical Activity" variant="outlined" onClick={() => setCategory("Physical Activity")} variant="contained">Physical Activity</Button>
                </ButtonGroup>

                <List>
                    {heat_keeping_cool.map(item =>
                        <ListItem key={item.advice_id}>
                            <Typography>
                                {item.content}
                            </Typography>
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
                    Advice
            </Typography>

                <ButtonGroup variant="contained" aria-label="contained primary button">
                    <Button id="General" variant="outlined" onClick={() => setCategory("General")} variant="contained">General</Button>
                    <Button id="Keeping Cool" variant="outlined" onClick={() => setCategory("Keeping Cool")} variant="contained">Keeping Cool</Button>
                    <Button id="Physical Activity" variant="outlined" onClick={() => setCategory("Physical Activity")} variant="contained" color="primary">Physical Activity</Button>
                </ButtonGroup>

                <List>
                    {heat_physical_activity.map(item =>
                        <ListItem key={item.advice_id}>
                            <Typography>
                                {item.content}
                            </Typography>
                        </ListItem>
                    )}
                </List>
            </React.Fragment>
        )
    }

}
