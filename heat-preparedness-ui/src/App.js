import React, { useState, Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent } from '@material-ui/core';
import Typography from "@material-ui/core/Typography"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Advice from './Advice';

const axios = require('axios').default;

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
            <AppBar position="sticky" style={{ "margin": 0 }}>
                <Toolbar>
                    <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" align="center" >
                        Heat Preparedness
          </Typography>
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


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suburbList: [],
            preparationsList: [],
            adviceList: [],
            weatherForecast: []
        }
    }

    async getPreparationData() {


        let preparationData = []
        let dataLink = "http://ec2-52-65-67-96.ap-southeast-2.compute.amazonaws.com:8080/api/Advice_pre"

        await axios.get(dataLink)
            .then(function (response) {
                //console.log(response.data)
                preparationData = response.data
            })
            .catch(function (error) {
                //handle error
                console.log(error);
            });
        this.setState({ preparationsList: preparationData })

    }

    async getSuburbList() {
        let suburbs = []
        let dataLink = "http://ec2-52-65-67-96.ap-southeast-2.compute.amazonaws.com:8080/api/SuburbList"

        await axios.get(dataLink)
            .then(function (response) {
                //console.log(response.data)
                suburbs = response.data
            })
            .catch(function (error) {
                //handle error
                console.log(error);
            });
        this.setState({ suburbList: suburbs })
    }

    async getAdviceData() {
        let advice = []
        let dataLink = "http://ec2-52-65-67-96.ap-southeast-2.compute.amazonaws.com:8080/api/Advice"

        await axios.get(dataLink)
            .then(function (response) {
                //console.log(response.data)
                advice = response.data
            })
            .catch(function (error) {
                console.log(error)
            })

        this.setState({ adviceList: advice })
    }

    componentDidMount() {
        this.getPreparationData()
        this.getSuburbList()
        this.getAdviceData()
    }

    render() {
        return (

            <React.Fragment>
                <CssBaseline />
                <MenuDrawer />
                <Grid container spacing={3} justify="center" wrap='wrap'>
                    <Grid item xs={12}>

                    </Grid>
                    <Grid item xs={10} lg={12}>
                        <Card variant="outlined">
                            <CardContent>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={10} lg={6}>
                        <Card variant="outlined">
                            <CardContent>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={10} lg={6}>
                        <Card variant="outlined">
                            <CardContent>
                                <Advice adviceData={this.state.adviceList} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={10} lg={6}>
                        <Card variant="outlined">
                            <CardContent>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </React.Fragment >
        )
    }
}

export default App;