import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  CardMedia,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import noCoffeeAlcohol from "./images/nocoffeealcohol.png";
import noExercise from "./images/no-exercise.png";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardContentStyle: {
    minHeight: "450px",
    padding: "1rem",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  mediaCoffee: {
    height: 200,
    width: 200,
  },
  mediaExercise: {
    height: 200,
    width: 200,
  },
  crossStyle: {
    color: theme.palette.cross.main,
  },
  tickStyle: {
    color: theme.palette.tick.main,
  },
}));

export function StayHydrated() {
  const content = [
    {
      title: "Stay Hydrated and avoid strenuous activity",
      content: [
        "Keep a full drink bottle with you and take small sips of water frequently.",
        "Avoid Caffeine and alcohol.",
        "Avoid heavy activity like sport, renovating and gardening.",
      ],
      icons: ["Do", "Dont", "Dont"],
    },
  ];

  const classes = useStyles();
  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="h5">{content[0]["title"]}</Typography>
            <List>
              {content[0]["content"].map((item, index) => (
                <React.Fragment>
                  <ListItem id={index}>
                    <ListItemIcon>
                      {content[0]["icons"][index] === "Do" ? (
                        <CheckIcon className={classes.tickStyle} />
                      ) : (
                        <ClearIcon className={classes.crossStyle} />
                      )}
                    </ListItemIcon>
                    <Typography variant="body1">{item}</Typography>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={3}>
            <CardMedia
              image={noCoffeeAlcohol}
              className={classes.mediaCoffee}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CardMedia image={noExercise} className={classes.mediaExercise} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function HeatIllnesses() {
  const content = [
    {
      title: "Look out for signs of heat related illness",
      content: ["Heat Cramps", "Heat Exhaustion", "Heat Stroke"],
    },
  ];

  const classes = useStyles();

  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Typography variant="h5">{content[0]["title"]}</Typography>
        <List>
          {content[0]["content"].map((item, index) => (
            <React.Fragment>
              <ListItem id={index}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export function CoolEnvironment() {
  const classes = useStyles();
  const content = [
    {
      title: "Keep your environment cool",
      content: [
        "Draw your blinds",
        "Close-off any rooms that you are not using",
        "Open the windows when there is a cool breeze or when the temperature inside rises above the outside temperature",
      ],
    },
  ];

  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
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
      </CardContent>
    </Card>
  );
}

export function FanAirconUse() {
  const classes = useStyles();
  const content = [
    {
      title: "Fan / Air Conditioner usage",
      content: [
        "If using a fan, ensure there is adequate ventilation and that it is set-up to bring cooler air in from the outside.",
        "If using an air conditioner, make sure it is on the right setting (snowflake symbol)",
      ],
    },
  ];

  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Typography variant="h5">{content[0]["title"]}</Typography>
        <List>
          {content[0]["content"].map((item, index) => (
            <React.Fragment>
              <ListItem id={index}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
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
        <Typography variant="h5">{content[0]["title"]}</Typography>
        <List>
          {content[0]["content"].map((item, index) => (
            <React.Fragment>
              <ListItem id={index}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}