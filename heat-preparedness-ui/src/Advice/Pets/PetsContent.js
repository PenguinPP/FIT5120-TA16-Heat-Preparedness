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
// import noCoffeeAlcohol from "./images/nocoffeealcohol.png";
// import noExercise from "./images/no-exercise.png";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardContentStyle: {
    minHeight: "450px",
    padding: "1rem",
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
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

export function StayHome() {
  const content = [
    {
      title: "Bring them back to home",
      content: [
        "Let them enjoy the cool tiles or provide a sturdy icepack or frozen water bottle in the cage for them.",
        "Be sure to provide numerous sources of water and keep the water cool.",
        "If your pet seems to be in discomfort, try wetting their feet and misting water onto their face as many animals control their inner temperature through their feet.",
      ],
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

export function OutDoor() {
  const classes = useStyles();
  const content = [
    {
      title: "If your pet is outside or you need to walk them",
      content: [
        "NEVER leave your pet in the car in warm weather.",
        "Your fair-skinned pet needs a special sunscreen for animals to protect it from the discomfort of sunburn and the added risk of skin cancer.",
        "You can walk them early morning or evening or a ground that feels hot to touch can do serious damage to your pooch’s paws.",
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
