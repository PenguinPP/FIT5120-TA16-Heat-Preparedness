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
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" align="center" >
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
    return (
        <div>
            <MenuDrawer />
            <Grid container spacing={3} justify="center" wrap='wrap'>
                <Grid item xs={12}>

                </Grid>
                <Grid item xs={10} lg={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <form noValidate autoComplete="off">
                                <Typography variant="subtitle1" align="flex-start" paragraph={true} >
                                    Heat Waves in Victoria
                  </Typography>
                                <Typography variant="body" align="flex-start">
                                    Info about WHAT Heatwaves are and WHY they are important to aged citizens.
                                    Risks, potential impact on their health, etc...
                            </Typography><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                            </form>

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={10} lg={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="subtitle1" align="flex-start" paragraph={true} >
                                Precautions
              </Typography>
                            <Typography variant="body" align="flex-start">
                                Info about WHAT can people do to prepare themselvs in order to mitigate heatwaves risks.
                            </Typography><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={10} lg={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="subtitle1" align="flex-start" paragraph={true} >
                                During a heatwave
              </Typography>
                            <Typography variant="body" align="flex-start">
                                Info about WHAT people should and should not do During the Heatwve.
                                This should consider their location to suggets heat shelters, emergency contact info, and other relevant data.
                            </Typography><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={10} lg={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="subtitle1" align="flex-start" paragraph={true} >
                                Weather forecasts and alerts
              </Typography>
                            <Typography variant="body" align="flex-start">

                            </Typography><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div >
    )
}

export default App;