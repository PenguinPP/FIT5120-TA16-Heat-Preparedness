import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent } from '@material-ui/core';
import Typography from "@material-ui/core/Typography"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Img from './heatback.jpg';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Advice from './Advice';
import Preparation from './Preparation';
import HeatWaves from './HeatWaves';
import { Link } from 'react-scroll';
import Weather from './Weather';
import SvgIcon from '@material-ui/core/SvgIcon';
import Sidebar from 'react-sidebar';

const divStyle = {
    width: '100%',
    height: 'auto/8',
    backgroundImage: `url(${Img})`
};

const axios = require('axios').default;

const mql = window.matchMedia(`(max-width: 800px)`);


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
                    {/*<IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
    </IconButton>*/}
                    <Typography variant="h5" align="left" >
                        Heat Preparedness
                            </Typography>
                </Toolbar>
            </AppBar>

            {/*<Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)} direction={'column'} >
                <Card variant="outlined">

            {/*<CardContent>*/}

            <Button href="#text-buttons" size="small" style={{ textTransform: "none", paddingRight: "20px", marginTop: 0, float: "right" }}><Link
                activeClass="active"
                to={"HeatWaves"}
                spy={true}
                smooth={true}
                offset={-60}
                duration={700}
                onClick={toggleDrawer(false)}
                style={{ width: "100%" }}
            ><Typography variant="h6" align="right">
                    HeatWaves
                    </Typography></Link>
            </Button>

            {/*</CardContent>
                <CardContent>*/}
            <Button href="#text-buttons" size="small" style={{ textTransform: "none", paddingRight: "20px", marginTop: 0, float: "right" }}>
                <Link
                    activeClass="active"
                    to={"Forecast"}
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={700}
                    onClick={toggleDrawer(false)}
                    style={{ width: "100%" }}
                ><Typography variant="h6" align="right">
                        Forecast
                    </Typography></Link></Button>

            {/*</CardContent>
                <CardContent>*/}

            <Button href="#text-buttons" size="small" style={{ textTransform: "none", paddingRight: "20px", marginTop: 0, float: "right" }}>
                <Link
                    activeClass="active"
                    to={"Advice"}
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={700}
                    onClick={toggleDrawer(false)}
                    style={{ width: "100%" }}
                ><Typography variant="h6" align="right">
                        On the day
                    </Typography></Link></Button>
            {/*</CardContent>
                <CardContent>*/}
            <Button href="#text-buttons" size="small" style={{ textTransform: "none", paddingRight: "20px", marginTop: 0, float: "right" }}>
                <Link
                    activeClass="active"
                    to={"Prep"}
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={700}
                    onClick={toggleDrawer(false)}
                    style={{ width: "100%" }}
                ><Typography variant="h6" align="right">Be Prepared!</Typography></Link></Button>

            {/*</CardContent>
            </Card>*/}
            {/*<Button onClick={toggleDrawer(false)}>
                    Close Menu
                </Button>
            </Drawer>*/}
        </React.Fragment >
    );
}



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: false,
            suburbList: [],
            preparationsList: [],
            adviceList: [],
            weatherForecast: []
        };
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
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

                <Sidebar
                    sidebar={<b>menu</b>}
                    open={this.state.sidebarOpen}
                    docked={this.state.sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}
                ><MenuDrawer /> </Sidebar>
                <div style={divStyle}>
                    <center>
                        <img src={Img} alt="pic" style={divStyle} />

                    </center>
                </div>
                <Grid container spacing={3} justify="center" wrap='wrap'>
                    <Grid item sm={12} lg={8}>
                        <Card variant="outlined">
                            <CardContent id="HeatWaves">
                                <HeatWaves />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={12} lg={8}>
                        <Card variant="outlined">
                            <CardContent id="Prep">
                                <Preparation preparationData={this.state.preparationsList} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={12} lg={8}>
                        <Card variant="outlined">
                            <CardContent id="Advice">
                                <Advice adviceData={this.state.adviceList} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={12} lg={8}>
                        <Card variant="outlined">
                            <CardContent id="Forecast" >
                                <Weather suburbList={this.state.suburbList} weatherInformation={this.state.weatherForecast} />
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