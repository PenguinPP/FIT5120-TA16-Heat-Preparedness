import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import "./App.css";
import { Card, CardContent } from '@material-ui/core';
import Typography from "@material-ui/core/Typography"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import CommentIcon from '@material-ui/icons/Comment';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import AcUnitIcon from '@material-ui/icons/AcUnit';


function MenuDrawer() {
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };


    return (
        <React.Fragment>
            <AppBar position="sticky">
                <Toolbar>

                    <Typography variant="h4" align="center" >
                        Heat Preparedness
          </Typography>
                    <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}  >
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h4" align="left">
                            Heat Waves in Victoria
                    </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="h4" align="left">
                            Precautions
                    </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="h4" align="left">
                            During a heatwave
                    </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="h4" align="left">
                            Weather forecasts and alerts
                    </Typography>
                    </CardContent>
                </Card>
                <Button onClick={toggleDrawer(false)}>
                    Close Menu
                </Button>
            </Drawer>
        </React.Fragment>
    );
}

const App = () => {

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <div>
            <MenuDrawer />
            <Grid container spacing={3} justify="center" wrap='wrap'>
                <Grid item xs={12}>

                </Grid>
                <Grid item xs={10} lg={12}>
                    <Card variant="outlined">
                        <CardContent>
                            <form noValidate autoComplete="off">
                                <Typography variant="h4" align="flex-start" paragraph={true} >
                                    Heat Waves in Victoria
                  </Typography>
                                <Typography variant="h6" align="flex-start">
                                    A heatwave is considered when there are ‘three days or more of high maximum and minimum temperatures that are unusual for that location’, meaning temperatures in excess of the heat health threshold set for a particular weather district.
                            </Typography><br />
                                <Typography variant="h5">
                                    Heat Event
                                </Typography><br />
                                <Typography variant="h6">
                                    Heat events are periods of high temperatures regardless of duration as even one day of high temperature may result in impact and consequences on the community, Infrastructure and services, with these effects compounding over successive days of high temperature
                                </Typography><br />
                                <Typography variant="h5">
                                    Heat health temperature thresholds
                                </Typography><br />
                                <Typography variant="h6">
                                    The Department of Health and Human Services has identified heat health temperature thresholds for each weather forecast district in Victoria. Above these thresholds heat-related illness and mortality increase substantially. The threshold in your district is *insert threshold here*
                                </Typography><br /><br />
                            </form>

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={10} lg={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h4" align="flex-start" paragraph={true} >
                                Precautions
              </Typography>
                            <Typography variant="h6" align="flex-start">
                                Info about WHAT can people do to prepare themselvs in order to mitigate heatwaves risks.
                            </Typography>

                            <List >
                                {[0, 1, 2, 3].map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;

                                    return (
                                        <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(value) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="comments">
                                                    <CommentIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })}
                            </List>




                            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={10} lg={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h4" align="flex-start" paragraph={true} >
                                During a heatwave
              </Typography>
                            <Typography variant="h6" align="flex-start">
                                Info about WHAT people should and should not do During the Heatwve.
                                This should consider their location to suggets heat shelters, emergency contact info, and other relevant data.
                            </Typography><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={10} lg={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h4" align="flex-start" paragraph={true} >
                                Weather forecasts and alerts
              </Typography>
                            <Grid container spacing={3} justify="center" wrap='wrap' >
                                <Grid item xs={4}>
                                    <WbSunnyIcon fontSize="large" />
                                </Grid>
                                <Grid item xs={4}>
                                    <WbSunnyIcon fontSize="large" />
                                </Grid>
                                <Grid item xs={4}>
                                    <WbSunnyIcon fontSize="large" />
                                </Grid>
                                <Grid item xs={4}>
                                    <WbSunnyIcon fontSize="large" />
                                </Grid>
                                <Grid item xs={4}>
                                    <WbSunnyIcon fontSize="large" />
                                </Grid>
                                <Grid item xs={4}>
                                    <AcUnitIcon fontSize="large" />
                                </Grid>
                                <Grid item xs={4}>
                                    <AcUnitIcon fontSize="large" />
                                </Grid>
                                <Grid item xs={4}>
                                    <AcUnitIcon fontSize="large" />
                                </Grid>
                                <Grid item xs={4}>
                                    <AcUnitIcon fontSize="large" />
                                </Grid>
                            </Grid>
                            <Typography variant="h6" align="flex-start">

                            </Typography><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div >
    )
}

export default App;