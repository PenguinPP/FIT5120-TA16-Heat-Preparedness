import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { List, ListItem } from '@material-ui/core'


export default function Preparation(preparationData){

    const [category, setCategory] = React.useState("Heat Long Term");

    console.log(preparationData["preparationData"])


    if (category == "Heat Long Term"){
        return(
            <React.Fragment>
                <Typography variant="h4">
                    Preparation
                </Typography>
    
                <ButtonGroup variant="contained" aria-label="contained primary button group">
                    <Button id="Heat Long Term" variant="outlined" onClick={() => setCategory("Heat Long Term") } variant="contained" color="primary">Heat Long Term</Button>
                    <Button id="Heat Short Term" variant="outlined" onClick={() => setCategory("Heat Short Term")} variant="contained">Heat Short Term</Button>
                    <Button id="Power Failure" variant="outlined" onClick={() => setCategory("Power Failure")} variant="contained">Power Failure</Button>
                </ButtonGroup>
    
                <List>
                      {preparationData["preparationData"].filter(item => item.category == category).map(item =>
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
    }else if(category == "Heat Short Term"){
        return(
            <React.Fragment>
                <Typography variant="h4">
                    Preparation
                </Typography>
    
                <ButtonGroup variant="contained" aria-label="contained primary button group">
                    <Button id="Heat Long Term" variant="outlined" onClick={() => setCategory("Heat Long Term") } variant="contained">Heat Long Term</Button>
                    <Button id="Heat Short Term" variant="outlined" onClick={() => setCategory("Heat Short Term")} variant="contained" color="primary">Heat Short Term</Button>
                    <Button id="Power Failure" variant="outlined" onClick={() => setCategory("Power Failure")} variant="contained">Power Failure</Button>
                </ButtonGroup>
    
                <List>
                      {preparationData["preparationData"].filter(item => item.category == category).map(item =>
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
    }else{
        return(
            <React.Fragment>
                <Typography variant="h4">
                    Preparation
                </Typography>
    
                <ButtonGroup variant="contained" aria-label="contained primary button group">
                    <Button id="Heat Long Term" variant="outlined" onClick={() => setCategory("Heat Long Term") } variant="contained">Heat Long Term</Button>
                    <Button id="Heat Short Term" variant="outlined" onClick={() => setCategory("Heat Short Term")} variant="contained">Heat Short Term</Button>
                    <Button id="Power Failure" variant="outlined" onClick={() => setCategory("Power Failure")} variant="contained" color="primary">Power Failure</Button>
                </ButtonGroup>
    
                <List>
                      {preparationData["preparationData"].filter(item => item.category == category).map(item =>
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
