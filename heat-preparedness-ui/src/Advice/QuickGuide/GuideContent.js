import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, List, ListItem } from "@material-ui/core";
import noCoffeeAlcohol from "./images/nocoffeealcohol.png";
import noExercise from "./images/no-exercise.png";
import fan from "./images/fan.png";
import airConditioner from "./images/airConditioner.png";
import closethedoor from "./images/close_the_door.png";
import drawyourblinds from "./images/Draw_your_blinds.png";
import openwindow from "./images/open_window.png";
import Grid from "@material-ui/core/Grid";
import water from "./images/water.png";
import oven from "./images/oven.png";
import noSun from "./images/out-of-sun.png";

const useStyles = makeStyles((theme) => ({
  cardContentStyle: {
    minHeight: "450px",
    padding: "1rem",
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
  },
  mediaWater: {
    height: 200,
    maxWidth: "95%",
  },
  mediaCoffee: {
    height: 250,
    maxWidth: "95%",
  },
  mediaExercise: {
    height: 250,
    maxWidth: "95%",
  },
  mediaFan: {
    height: 250,
    maxWidth: "95%",
  },
  mediaAirConditioner: {
    height: 250,
    maxWidth: "95%",
  },
  mediaOven: {
    height: 200,
    maxWidth: "95%",
  },
  imgContainer: {
    textAlign: "center",
    maxWidth: "100%",
    padding: "1rem",
    marginBottom: "1rem",
  },
}));

export function StayHydrated() {
  const classes = useStyles();
  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container alignItems="flex-start" justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" paragraph align="center">
              Stay Hydrated and avoid strenuous activity
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={10}
            lg={10}
            alignItems="flex-start"
            justify="space-evenly"
            spacing={3}
          >
            <Grid item xs={12} md={6}>
              <Typography align="center">
                Keep a full drink bottle with you and take small sips of water
                frequently.
              </Typography>
              <div className={classes.imgContainer}>
                <img
                  src={water}
                  alt="Water bottle"
                  className={classes.mediaWater}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography align="center">
                Avoid Caffeine and alcohol.
              </Typography>
              <div className={classes.imgContainer}>
                <img
                  src={noCoffeeAlcohol}
                  alt="No caffeine and alcohol"
                  className={classes.mediaCoffee}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={10}>
              <Typography align="center">
                Avoid heavy activity like sport, renovating and gardening.
              </Typography>
              <div className={classes.imgContainer}>
                <img
                  src={noExercise}
                  alt="Minimise physical activity"
                  className={classes.mediaExercise}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function CoolEnvironment() {
  const classes = useStyles();

  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container alignItems="flex-start" justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" paragraph align="center">
              Keep your environment cool
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={10}
            lg={10}
            alignItems="flex-start"
            justify="space-evenly"
            spacing={3}
          >
            <Grid item xs={12} md={6}>
              <Typography align="center">Draw your blinds</Typography>
              <div
                style={{
                  textAlign: "center",
                  maxWidth: "100%",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={drawyourblinds}
                  style={{
                    height: 200,
                    maxWidth: 200,
                  }}
                  alt="coolblinds"
                ></img>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography align="center">
                Close-off any rooms that you are not using
              </Typography>
              <div
                style={{
                  textAlign: "center",
                  maxWidth: "100%",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={closethedoor}
                  style={{
                    height: 200,
                    maxWidth: 200,
                  }}
                  alt="coolclsdoor"
                ></img>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography align="center">
                Open the windows when there is a cool breeze or when the
                temperature inside rises above the outside temperature
              </Typography>
              <div
                style={{
                  textAlign: "center",
                  maxWidth: "100%",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={openwindow}
                  style={{
                    height: 200,
                    maxWidth: 200,
                  }}
                  alt="coolwin"
                ></img>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function FanAirconUse() {
  const classes = useStyles();

  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container alignItems="flex-start" justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" paragraph align="center">
              Fan / Air Conditioner usage
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={10}
            lg={10}
            alignItems="flex-start"
            justify="space-evenly"
            spacing={3}
          >
            <Grid item xs={12} md={6}>
              <Typography align="center">
                If using a fan, ensure there is adequate ventilation and that it
                is set-up to bring cooler air in from the outside.
              </Typography>
              <div className={classes.imgContainer}>
                <img src={fan} alt="Fan" className={classes.mediaFan} />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography align="center">
                It is dangerous to use a fan without proper ventilation if the
                temperature inside is more than 34 degrees! This can cause a
                very dangerous convection oven type effect.
              </Typography>
              <div className={classes.imgContainer}>
                <img src={oven} alt="Oven" className={classes.mediaOven} />
              </div>
            </Grid>
            <Grid item xs={12} md={10}>
              <Typography align="center">
                If using an air conditioner, make sure it is on the right
                setting (snowflake symbol)
              </Typography>
              <div className={classes.imgContainer}>
                <img
                  src={airConditioner}
                  alt="Air Conditioner"
                  className={classes.mediaAirConditioner}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function FinalTips() {
  const classes = useStyles();
  const content = [
    {
      title: "Final Tips",
      content: [
        "Stay out of the sun! Especially during the hottest part of the day! (usually 11am-3pm)",
        "If you cannot stay cool in your home, make arrangements to visit a friend or spend time in air-conditioned public spaces!",
      ],
    },
  ];

  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid
          container
          spacing={2}
          wrap="wrap"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} md={6} lg={5}>
            <Typography variant="h5">{content[0]["title"]}</Typography>
            <List>
              {content[0]["content"].map((item, index) => (
                <React.Fragment>
                  <ListItem id={index}>
                    <Typography variant="body1">
                      {index + 1}. {item}
                    </Typography>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <div className={classes.imgContainer}>
              <img
                src={noSun}
                style={{
                  maxHeight: 500,
                  marginTop: "1rem",
                  maxWidth: "90%",
                }}
                alt="Stay out of the sun"
              ></img>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
