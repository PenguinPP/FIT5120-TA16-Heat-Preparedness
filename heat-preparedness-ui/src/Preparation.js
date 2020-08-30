import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { List, ListItem } from '@material-ui/core'



export default function Preparation(preparationData){

    const [category, setCategory] = React.useState("Heat Long Term");

    console.log(preparationData["preparationData"])

    const heat_long_term = preparationData["preparationData"].filter(item => item.category == "Heat Long Term")

    const heat_short_term = preparationData["preparationData"].filter(item => item.category == "Heat Short Term")

    const power_failure = preparationData["preparationData"].filter(item => item.category == "Power Failure")



    if (category == "Heat Long Term"){
        return(
            <React.Fragment>
                <Typography variant="h4">
                    Preparation
                </Typography>
    
    
                <Button variant="outlined" onClick={() => setCategory("Heat Long Term")}>Heat Long Term</Button>
                <Button variant="outlined" onClick={() => setCategory("Heat Short Term")}>Heat Short Term</Button>
                <Button variant="outlined" onClick={() => setCategory("Power Failure")}>Power Failure</Button>
    
    
                <List>
                      {heat_long_term.map(item =>
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
    else if(category == "Heat Short Term"){
        return(
            <React.Fragment>
                <Typography variant="h4">
                    Preparation
                </Typography>
    
    
                <Button variant="outlined" onClick={() => setCategory("Heat Long Term")}>Heat Long Term</Button>
                <Button variant="outlined" onClick={() => setCategory("Heat Short Term")}>Heat Short Term</Button>
                <Button variant="outlined" onClick={() => setCategory("Power Failure")}>Power Failure</Button>
    
    
                <List>
                      {heat_short_term.map(item =>
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
    else{
        return(
            <React.Fragment>
                <Typography variant="h4">
                    Preparation
                </Typography>
    
    
                <Button variant="outlined" onClick={() => setCategory("Heat Long Term")}>Heat Long Term</Button>
                <Button variant="outlined" onClick={() => setCategory("Heat Short Term")}>Heat Short Term</Button>
                <Button variant="outlined" onClick={() => setCategory("Power Failure")}>Power Failure</Button>
    
    
                <List>
                      {power_failure.map(item =>
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