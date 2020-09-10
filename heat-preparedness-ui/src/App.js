import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent } from '@material-ui/core';
import Typography from "@material-ui/core/Typography"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import landingBg from './heatback-3.jpg';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Advice from './Advice';
import Preparation from './Preparation';
import HeatWaves from './HeatWaves';
import { Link } from 'react-scroll';
import Weather from './Weather'
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const axios = require('axios').default;

const ScrollHandler = props => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: props.window ? window() : undefined
    });

    return React.cloneElement(props.children, {
        style: {
            backgroundColor: trigger ? "#3f51b5" : "#594241",
            color: "white",
            transition: trigger ? "0.3s" : "0.5s",
            boxShadow: "none",
            padding: "10px 0px"
        }
    });
};

const ScrollToColor01 = props => {
    return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    desktopBar: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    mobileBar: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    }, buttonText: {
        color: "white",
        textTransform: "none",
        marginRight: "0.5rem",
        marginLeft: "0.5rem",
        fontSize: "1.5rem"
    }, landingBg: {
        width: '100%',
        maxHeight: '100%',
        minHeight: "600px"
    }, landingText: {
        color: "white"
    }
}))

function MenuDrawer() {


    const bgPath = './heatback.jpg'

    const classes = useStyles()
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    return (
        <React.Fragment>

            <ScrollToColor01>
                <AppBar position="sticky" style={{ "margin": 0 }}>
                    <Toolbar>

                        <Typography variant="h5" align="center" noWrap>
                            Heat Preparedness
                    </Typography>
                        <div className={classes.grow} />
                        <div className={classes.mobileBar}>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                        </div>
                        <div className={classes.desktopBar}>
                            <Button size="small" >
                                <Link
                                    activeClass="active"
                                    to={"HeatWaves"}
                                    spy={true}
                                    smooth={true}
                                    offset={-80}
                                    duration={700}
                                >
                                    <Typography variant="h6" className={classes.buttonText}>
                                        Heat Waves
                         </Typography>
                                </Link>
                            </Button>
                            <Button size="small" >
                                <Link
                                    activeClass="active"
                                    to={"Prep"}
                                    spy={true}
                                    smooth={true}
                                    offset={-80}
                                    duration={700}
                                >
                                    <Typography variant="h6" className={classes.buttonText}>
                                        Be Prepared!
                         </Typography>
                                </Link>
                            </Button>
                            <Button size="small" >
                                <Link
                                    activeClass="active"
                                    to={"Advice"}
                                    spy={true}
                                    smooth={true}
                                    offset={-80}
                                    duration={700}
                                >
                                    <Typography variant="h6" className={classes.buttonText}>
                                        On the Day
                         </Typography>
                                </Link>
                            </Button>
                            <Button size="small" >
                                <Link
                                    activeClass="active"
                                    to={"Forecast"}
                                    spy={true}
                                    smooth={true}
                                    offset={-80}
                                    duration={700}
                                >
                                    <Typography variant="h6" className={classes.buttonText}>
                                        Forecasts
                         </Typography>
                                </Link>
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </ScrollToColor01>
            <Grid container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.landingBg}
                style={{ backgroundImage: `url("${landingBg}")` }}>

                <div className={classes.grow} />
                <Grid item>
                    <Typography variant="h2" className={classes.landingText} align="center">
                        Victoria Heat
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" className={classes.landingText} align="center">
                        Stay Ready, Stay Safe!
                        </Typography>
                </Grid>

                <div className={classes.grow} />
                <Grid item style={{ marginBottom: "1rem" }}>
                    <Button size="small" variant="contained" color="primary">
                        <Link
                            activeClass="active"
                            to={"HeatWaves"}
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={700}
                        >
                            <Typography variant="h4" className={classes.buttonText}>
                                Know the dangers!
                         </Typography>
                        </Link>
                    </Button>
                </Grid>

            </Grid>
            <Drawer anchor={'right'} open={state} onClose={toggleDrawer(false)} direction={'row'} >
                <Card variant="outlined">
                    <CardContent>
                        <Button fullWidth={true} size="small" style={{ textTransform: "none", padding: "0px", marginTop: 0 }}>
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
                        <Button fullWidth={true} size="small" style={{ textTransform: "none", padding: "0px", marginTop: 0 }}><Link
                            activeClass="active"
                            to={"Prep"}
                            spy={true}
                            smooth={true}
                            offset={-60}
                            duration={700}
                            onClick={toggleDrawer(false)}
                            style={{ width: "100%" }}
                        ><Typography variant="h4" align="left">
                                Be Prepared!
                    </Typography></Link>
                        </Button>

                    </CardContent>
                    <CardContent>
                        <Button fullWidth={true} size="small" style={{ textTransform: "none", padding: "0px", marginTop: 0 }}>
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

                        <Button fullWidth={true} size="small" style={{ textTransform: "none", padding: "0px", marginTop: 0 }}>
                            <Link
                                activeClass="active"
                                to={"Forecast"}
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
                    <Grid item sm={12} lg={12}>
                        <Card variant="outlined" id="HeatWaves">
                            <CardContent >
                                <HeatWaves />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={12} lg={12}>
                        <Card variant="outlined">
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