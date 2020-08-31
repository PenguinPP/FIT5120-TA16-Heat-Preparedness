import React, { Component } from 'react';
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
import Preparation from './Preparation';
import HeatWaves from './HeatWaves';
import { Link } from 'react-scroll'

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
                        <Button fullWidth="true" size="small" style={{ textTransform: "none", padding: "0px", marginTop: 0 }}>
                            <Link
                                activeClass="active"
                                to={"HeatWaves"}
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={700}
                                onClick={toggleDrawer(false)}
                                style={{ width: "100%" }}
                            ><Typography align="left" variant="h4">Heat Waves</Typography></Link></Button>

                    </CardContent>
                    <CardContent>
                        <Button fullWidth="true" size="small" style={{ textTransform: "none", padding: "0px", marginTop: 0 }}><Link
                            activeClass="active"
                            to={"Prep"}
                            spy={true}
                            smooth={true}
                            offset={-60}
                            duration={700}
                            onClick={toggleDrawer(false)}
                            style={{ width: "100%" }}
                        ><Typography variant="h4" align="left">
                                Precautions
                    </Typography></Link>
                        </Button>

                    </CardContent>
                    <CardContent>
                        <Button fullWidth="true" size="small" style={{ textTransform: "none", padding: "0px", marginTop: 0 }}>
                            <Link
                                activeClass="active"
                                to={"Advice"}
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={700}
                                onClick={toggleDrawer(false)}
                                style={{ width: "100%" }}
                            ><Typography variant="h4" align="left">
                                    On the day
                    </Typography></Link></Button>

                    </CardContent>
                    <CardContent>

                        <Button fullWidth="true" size="small" style={{ textTransform: "none", padding: "0px", marginTop: 0 }}>
                            <Link
                                activeClass="active"
                                to={"Advice"}
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={700}
                                onClick={toggleDrawer(false)}
                                style={{ width: "100%" }}
                            ><Typography variant="h4" align="left">
                                    Forecasts
                    </Typography></Link></Button>
                    </CardContent>
                </Card>
                <Button onClick={toggleDrawer(false)}>
                    Close Menu
                </Button>
            </Drawer>
        </React.Fragment >
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

    async getWeatherData() {
        let weatherData = []
        let dataLink = "http://ec2-52-65-67-96.ap-southeast-2.compute.amazonaws.com:8080/api/MelbourneForecast"

        await axios.get(dataLink)
            .then(function (response) {

                weatherData = response.data.filter(item => item.council === "Melbourne City")
                //console.log(weatherData)
            })
            .catch(function (error) {
                console.log(error)
            })
        this.setState({ weatherForecast: weatherData })
    }

    componentDidMount() {
        this.getPreparationData()
        this.getSuburbList()
        this.getAdviceData()
        this.getWeatherData()
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <MenuDrawer />
                <Grid container spacing={3} justify="center" wrap='wrap'>
                    <Grid item xs={10} lg={8}>
                        <Card variant="outlined">
                            <CardContent id="HeatWaves">
                                <HeatWaves />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={10} lg={8}>
                        <Card variant="outlined">
                            <CardContent id="Prep">
                                <Preparation preparationData={this.state.preparationsList} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={10} lg={8}>
                        <Card variant="outlined">
                            <CardContent id="Advice">
                                <Advice adviceData={this.state.adviceList} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={10} lg={8}>
                        <Card variant="outlined">
                            <CardContent id="Weather">

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </React.Fragment >
        )
    }
}

export default App;