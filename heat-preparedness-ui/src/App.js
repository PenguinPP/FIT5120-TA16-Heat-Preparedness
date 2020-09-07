import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent } from '@material-ui/core';
import Typography from "@material-ui/core/Typography"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Img from './heatback.jpg';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Advice from './Advice';
import Preparation from './Preparation';
import HeatWaves from './HeatWaves';
import { Link } from 'react-scroll';
import Weather from './Weather';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText'

const divStyle = {
    width: '100%',
    height: 'auto/8',
    backgroundImage: `url(${Img})`
};

const WhiteTextTypography = withStyles({
    root: {
        color: "white",
        fontStyle: 'italic',
        width: "auto",
        textAlign: "center"
    }
})(Typography);

const axios = require('axios').default;

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
        flexShrink: 0,
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    toolbar: {
        ...theme.mixins.toolbar,
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    }
}));

function MenuDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };


    return (
        <React.Fragment>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={toggleDrawer(true)}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Heat Preparedness
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant={isMdUp ? "permanent" : "temporary"}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    anchor="left"
                    open={open}
                    onClose={toggleDrawer(false)}
                >
                    <div className={classes.toolbar} />
                    <List>
                        <ListItem button >
                            <Link
                                activeClass="active"
                                to={"HeatWaves"}
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={700}
                                onClick={toggleDrawer(false)}
                                style={{ width: "100%" }}
                            >
                                <ListItemText primary={"HeatWaves"} /></Link>
                        </ListItem>


                        <ListItem button >
                            <Link
                                activeClass="active"
                                to={"Prep"}
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={700}
                                onClick={toggleDrawer(false)}
                                style={{ width: "100%" }}
                            >
                                <ListItemText primary={"Be prepared!"} /></Link>
                        </ListItem>

                        <ListItem button >
                            <Link
                                activeClass="active"
                                to={"Advice"}
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={700}
                                onClick={toggleDrawer(false)}
                                style={{ width: "100%" }}
                            >
                                <ListItemText primary={"On the day"} /></Link>
                        </ListItem>

                        <ListItem button >
                            <Link
                                activeClass="active"
                                to={"Forecast"}
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={700}
                                onClick={toggleDrawer(false)}
                                style={{ width: "100%" }}
                            >
                                <ListItemText primary={"Forecast"} /></Link>
                        </ListItem>

                    </List>
                </Drawer>
            </div>
        </React.Fragment >
    );
}



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
                <MenuDrawer />
                <div style={divStyle}>
                    <center>
                        <img src={Img} alt="pic" style={divStyle} />

                    </center>
                    <WhiteTextTypography variant="h4">
                        Stay ready Stay safe
                            </WhiteTextTypography>
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