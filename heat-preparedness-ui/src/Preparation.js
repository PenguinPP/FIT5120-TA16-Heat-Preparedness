import React, { useState } from 'react';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { List, ListItem } from '@material-ui/core'


export default function Preparation(preparationData) {

    const [category, setCategory] = React.useState("Heat Short Term");

    //console.log(preparationData["preparationData"])


    if (category === "Heat Long Term") {
        return (
            <React.Fragment>
                <Typography variant="h4">
                    Preparations
                </Typography>

                <ButtonGroup fullWidth={true} variant="contained" aria-label="contained primary button group" style={{ marginTop: "1rem" }}>
                    <Button id="Heat Short Term" onClick={() => setCategory("Heat Short Term")} variant="contained">Short Term</Button>
                    <Button id="Heat Long Term" onClick={() => setCategory("Heat Long Term")} variant="contained" color="primary">Long Term</Button>
                    <Button id="Power Failure" onClick={() => setCategory("Power Failure")} variant="contained">Power Failure</Button>
                </ButtonGroup>
                <Typography variant="h6" style={{ marginTop: "1rem" }}>
                    There are a number of things you can do in the long term to improve your ability to cope with extreme heat:
            </Typography>
                <List>
                    {preparationData["preparationData"].filter(item => item.category === category).map(item =>
                        <ListItem key={item.advice_id}>
                            <Checkbox />
                            <Typography>
                                {item.content}
                            </Typography>
                        </ListItem>
                    )}
                </List>
            </React.Fragment>
        )
    } else if (category === "Heat Short Term") {
        return (
            <React.Fragment>
                <Typography variant="h4">
                    Preparations
                </Typography>
                <ButtonGroup fullWidth={true} variant="contained" aria-label="contained primary button group" style={{ marginTop: "1rem" }}>
                    <Button id="Heat Short Term" onClick={() => setCategory("Heat Short Term")} variant="contained" color="primary">Short Term</Button>
                    <Button id="Heat Long Term" onClick={() => setCategory("Heat Long Term")} variant="contained">Long Term</Button>
                    <Button id="Power Failure" onClick={() => setCategory("Power Failure")} variant="contained">Power Failure</Button>
                </ButtonGroup>


                <Typography variant="h6" style={{ marginTop: "1rem" }}>
                    There are a number of things you can do in the short term to prepare for a heat wave:
            </Typography>
                <List>
                    {preparationData["preparationData"].filter(item => item.category === category).map(item =>
                        <ListItem key={item.advice_id}>
                            <Checkbox />
                            <Typography>
                                {item.content}
                            </Typography>
                        </ListItem>
                    )}
                </List>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <Typography variant="h4">
                    Preparations
                </Typography>

                <ButtonGroup fullWidth={true} variant="contained" aria-label="contained primary button group" style={{ marginTop: "1rem" }}>
                    <Button id="Heat Short Term" onClick={() => setCategory("Heat Short Term")} variant="contained">Short Term</Button>
                    <Button id="Heat Long Term" onClick={() => setCategory("Heat Long Term")} variant="contained">Long Term</Button>
                    <Button id="Power Failure" onClick={() => setCategory("Power Failure")} variant="contained" color="primary">Power Failure</Button>
                </ButtonGroup>
                <Typography variant="h6" style={{ marginTop: "1rem" }}>
                    Power failures can occur during a heat wave and it is important to be be prepared for them:
            </Typography>
                <List>
                    {preparationData["preparationData"].filter(item => item.category === category).map(item =>
                        <ListItem key={item.advice_id}>
                            <Checkbox />
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
