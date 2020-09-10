import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent } from '@material-ui/core';
import Typography from "@material-ui/core/Typography"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Img from './heatback.jpg';
import CssBaseline from '@material-ui/core/CssBaseline';
import Advice from './Advice';
import Preparation from './Preparation';
import HeatWaves from './HeatWaves';
import Weather from './Weather';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBarCollapse from "./AppBarClose";
import myIcon from './favicon.ico';
import LandingPage from './LandingPage';

const axios = require('axios').default;



function MenuDrawer(props) {

    return (
        <React.Fragment>
            <AppBar position="fixed" >
                <Toolbar>
                    <AppBarCollapse /><img src={myIcon} alt="pic" onClick={event => window.location.href = '/'} />
                </Toolbar>
            </AppBar>
        </React.Fragment >
    );
}

MenuDrawer.propTypes = {
    classes: PropTypes.object.isRequired
};


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            suburbList: [],
            preparationsList: [],
            adviceList: [],
            weatherForecast: []
        };
    }

    async getPreparationData() {


        let preparationData = []
        let dataLink = "https://www.victoria-heat.tk/api/Advice_pre"

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
        let dataLink = "https://www.victoria-heat.tk/api/SuburbList"

        await axios.get(dataLink)
            .then(function (response) {
                // console.log("suburbs")
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
        let dataLink = "https://www.victoria-heat.tk/api/Advice"

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
        let dataLink = "https://www.victoria-heat.tk/api/MelbourneForecast"

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
                <Grid container spacing={2} justify="center" wrap='wrap'>
                    <Grid item xs={12}>
                        <LandingPage />
                    </Grid>
                    <Grid item sm={12} lg={12} >
                        <Card variant="outlined" id="HeatWaves">
                            <CardContent >
                                <HeatWaves />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={12} lg={12} >
                        <Card variant="outlined" >
                            <CardContent id="Alerts" >
                                <Weather suburbList={this.state.suburbList} weatherInformation={this.state.weatherForecast} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={12} lg={12}>
                        <Card variant="outlined">
                            <CardContent id="Prep">
                                <Preparation preparationData={this.state.preparationsList} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={12} lg={12}>
                        <Card variant="outlined">
                            <CardContent id="Advice">
                                <Advice adviceData={this.state.adviceList} />
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
                <div style={{
                    backgroundColor: "#3f51b5", padding: "1rem",
                    color: "white",
                    textAlign: "center"
                }}>
                    <Typography variant="h5" >
                        Acknowledgments
                    </Typography>
                    <br />
                    <Typography>
                        The weather forecast information is updated every 6 hours based on available data from <a href="https://openweathermap.org/" style={{ color: "white" }}>OpenWeather</a> ( ©  Creative Commons Attribution-ShareAlike 4.0 International licence).
                    </Typography>
                    <br />
                    <Typography>
                        The definitions of heatwaves, suggested preparations and further advice are extracted from the Victorian State Government . To access up-to-date information about current  heatwaves in Victoria, please refer to Victoria Health’s resources:
                    </Typography>
                    <a style={{ color: "white" }} href="https://www2.health.vic.gov.au/public-health/environmental-health/climate-weather-and-public-health/heatwaves-and-extreme-heat/.">Health Victoria, Extreme Heat and Heatwaves</a>
                    <br />
                    <a style={{ color: "white" }} href="https://www.betterhealth.vic.gov.au/campaigns/Survive-the-heat">Better Health Channel, Survive the Heat </a>
                </div>
            </React.Fragment >
        )
    }
}

export default App;