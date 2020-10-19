import React, { useState, useEffect, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import {
  List,
  ListItem,
  makeStyles,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import WarningIcon from "@material-ui/icons/Warning";
import { Link } from "react-scroll";
import Button from "@material-ui/core/Button";
import HeatReadinessQuiz from "./Quiz/HeatReadinessQuiz";
import Alert from "@material-ui/lab/Alert";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Alerts from "./Alerts/Alerts";
import { ReactComponent as GuideIcon } from "./icons/guide-icon.svg";
import { QuizContext } from "./Contexts/QuizContext";
import SvgIcon from "@material-ui/core/SvgIcon";

const axios = require("axios").default;

//const heatwaveAlert = FALSE;

const useStyles = makeStyles((theme) => ({
  active: {
    //Style for active category button
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
  },
  callToAction: {
    background: theme.palette.primary.main,
    textTransform: "none",
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
  },
  heatAlert: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    marginBottom: "1rem",
  },
  noHeatAlert: {
    background: theme.palette.primary.light,
  },
  warningStyle: {
    color: theme.palette.secondary.main,
    position: "relative",
    top: theme.spacing.unit,
  },
  avgAlert: {
    color: theme.palette.secondary.dark,
  },
  cardStyle: {
    height: "200px",
  },
}));

const EssentialGuideIcon = (props) => {
  return (
    <SvgIcon
      {...props}
      component={GuideIcon}
      style={{ color: "#000000", position: "relative" }}
      viewBox="0 0 600 476.6"
    ></SvgIcon>
  );
};

export default function Weather(weatherInformation) {
  const suburbData = weatherInformation["suburbList"];

  const [suburbId, setSuburbId] = React.useState(1794); //Currently selected suburb (Default ID is for Melbourne 3000)
  const [weatherData, setWeatherData] = React.useState([
    weatherInformation["weatherInformation"],
  ]);

  const { adviceActiveCategory, setAdviceCategory } = useContext(QuizContext);

  const classes = useStyles();

  var currentSuburb = suburbData.filter(
    (suburb) => suburb.suburb_id === suburbId
  )[0];

  const heatDays = weatherData.filter((day) => day.avg >= day.threshold);
  const heatDayCount = heatDays.length;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDayForecast = weatherData[0];
  let heatWaveToday = false;

  if (currentDayForecast.avg >= currentDayForecast.threshold) {
    heatWaveToday = true;
  }

  const handleEssentialsGuideScroll = () => {
    setAdviceCategory("Essentials Guide");
  };

  React.useEffect(() => {
    let dataLink =
      "https://www.victoria-heat.tk/api/SuburbForecast/" + suburbId;

    axios
      .get(dataLink)
      .then((results) => results.data)
      .then((data) => {
        for (let day in data) {
          //Convert mysql date to javascript date
          data[day]["date"] = new Date(Date.parse(data[day]["date"]));
        }
        setWeatherData(data);
        //console.log(weatherData)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [suburbId]);

  //if (suburbList.includes(suburb)) {
  return (
    /*        <Button onClick = {() => setSuburb("Bellfield")>

        NEED TO ADD COUNCIL {item.council}
        */

    <React.Fragment>
      <Typography variant="h4">Weather Forecasts Alerts</Typography>
      <br />
      <Typography
        variant="h8"
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        Find out if there are any upcoming heatwaves during next week's
        forecast.
      </Typography>
      <br />
      <Typography
        variant="h6"
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        Select your suburb
      </Typography>
      <Autocomplete
        id="combo-box-demo"
        options={suburbData}
        getOptionLabel={(option) => option.suburb + ", " + option.postcode}
        fullWidth={true}
        onChange={(event, newValue) => {
          if (newValue !== undefined && newValue !== null) {
            setSuburbId(newValue.suburb_id);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Filter by name or postcode"
            InputLabelProps={{ style: { color: "black" } }}
            variant="outlined"
          />
        )}
      />
      {/* <TextField
                    fullWidth={true}
                    value={suburb}
                    onChange={(event) => setSuburb(event.target.value)}
                >

                </TextField>*/}
      <Typography
        variant="h5"
        style={{ marginTop: "2rem", marginBottom: "1rem" }}
      >
        Weather in{" "}
        {currentSuburb !== undefined &&
          currentSuburb.suburb + " (" + currentSuburb.postcode + ")"}{" "}
        for the next week
      </Typography>
      <br />
      {heatDayCount === 0 ? (
        <Alert variant="filled" severity="info" className={classes.noHeatAlert}>
          There are no heat wave alerts for the next 7 days :)
        </Alert>
      ) : (
        <Alert
          variant="filled"
          className={classes.heatAlert}
          severity="warning"
        >
          WARNING — There are {heatDayCount} heat wave alerts over the next 7
          days!
        </Alert>
      )}{" "}
      {heatWaveToday && (
        <React.Fragment>
          <Alert
            variant="filled"
            className={classes.heatAlert}
            severity="warning"
          >
            WARNING — There is a heat wave today!
          </Alert>
          <Link
            activeClass="active"
            to={"Advice"}
            spy={true}
            smooth={true}
            offset={-80}
            duration={700}
          >
            <Button
              className={classes.active}
              onClick={handleEssentialsGuideScroll}
              variant="contained"
            >
              Take Precautions!
            </Button>
          </Link>
          <br />
        </React.Fragment>
      )}
      {
        //make an if statement to show if there is a heatwave alert or everything is ok.
      }
      {/*
render() {
      if (heatwaveAlert) {
    
      <Alert variant="filled" severity="warning">
        WARNING — There is a heatwave alert during the following week!
          </Alert>
      } 
      else {
        return(
        <Alert variant="filled" severity="info">
          There are no heatwave alerts for the following week ;)
      </Alert>
      )
        }
      return () 
      */}
      <br />
      <Typography variant="h6">
        <WarningIcon className={classes.warningStyle} /> next to the day
        indicates a heat wave alert
      </Typography>
      <br />
      <Grid container spacing={2} justify="center">
        {weatherData.map((item) => (
          <Grid item xs={5} sm={4} md={3}>
            <Card className={classes.cardStyle}>
              <CardContent>
                <Typography paragraph variant="body1">
                  {item.date
                    ? days[item.date.getDay()] +
                      ", " +
                      item.date.getDate() +
                      "/" +
                      (item.date.getMonth() + 1)
                    : ""}{" "}
                  {item.avg >= item.threshold && (
                    <WarningIcon className={classes.warningStyle} />
                  )}
                </Typography>
                <Typography variant="body2" paragraph>
                  {item.max ? item.max : ""}° / {item.min ? item.min : ""}°
                </Typography>
                <Typography
                  variant="body1"
                  className={item.avg >= item.threshold ? classes.avgAlert : ""}
                >
                  Avg. {item.avg ? item.avg : ""}°
                </Typography>
                <Typography></Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br />
      {/* <List>
        {weatherData.map((item) => (
          <ListItem key={item.date}>
            {item.date
              ? item.date.getDate() +
                "-" +
                (item.date.getMonth() + 1) +
                "-" +
                item.date.getFullYear()
              : ""}{" "}
            : max {item.max ? item.max : ""}° | min {item.min ? item.min : ""}°
            | avg {item.avg ? item.avg : ""}°
          </ListItem>
        ))}
      </List> */}
      <Typography paragraph align="center" variant="h5">
        Not sure where to start?
      </Typography>
      <Alerts suburbInfo={[currentSuburb, suburbData]} />
      <HeatReadinessQuiz />
      <Grid container justify="center">
        <Link
          activeClass="active"
          to={"Prep"}
          spy={true}
          smooth={true}
          offset={-80}
          duration={700}
        >
          <Grid container wrap="wrap" justify="center">
            <Button
              variant="contained"
              color="primary"
              className={classes.callToAction}
            >
              <Grid container wrap="wrap" justify="center">
                <Grid item xs={12}>
                  <Typography variant="h6">Be Prepared!</Typography>
                </Grid>
                <Grid item xs={12}>
                  <KeyboardArrowDownIcon />
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Link>
      </Grid>
    </React.Fragment>
  );
}

/*
import React from 'react';
            import { makeStyles } from '@material-ui/core/styles';
            import Table from '@material-ui/core/Table';
            import TableBody from '@material-ui/core/TableBody';
            import TableCell from '@material-ui/core/TableCell';
            import TableContainer from '@material-ui/core/TableContainer';
            import TableHead from '@material-ui/core/TableHead';
            import TableRow from '@material-ui/core/TableRow';
            import Paper from '@material-ui/core/Paper';

            const useStyles = makeStyles({
            table: {
                minWidth: 650,
            },
            });

            function createData(name, calories, fat, carbs, protein) {
            return { name, calories, fat, carbs, protein };
            }

            const rows = [
            createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
            createData('Eclair', 262, 16.0, 24, 6.0),
            createData('Cupcake', 305, 3.7, 67, 4.3),
            createData('Gingerbread', 356, 16.0, 49, 3.9),
            ];

            export default function SimpleTable() {
            const classes = useStyles();

            return (
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            );
            }
*/
