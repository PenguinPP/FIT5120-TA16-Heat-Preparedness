import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, List, ListItem } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import eskyImage from "./images/esky.png";
import thermosImage from "./images/thermos.png";
import ReactPlayer from "react-player";
import northWindow from "./images/north-window.png";
import eastWestWindow from "./images/east-west-window.png";
import tree from "./images/tree.png";
import bushes from "./images/bushes.png";

const useStyles = makeStyles((theme) => ({
  cardContentStyle: {
    minHeight: "450px",
    padding: "1rem",
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
  },
  imgContainer: {
    textAlign: "center",
    width: "100%",
    padding: "1rem",
    marginBottom: "1rem",
  },
  eskyStyle: {
    height: 200,
    maxWidth: "95%",
  },
  thermosStyle: {
    height: 220,
    maxWidth: "95%",
  },
  videoContainer: {
    justifyContent: "center",
    textAlign: "center",
    display: "flex",
    padding: "3px 0",
    marginBottom: "1rem",
  },
  windowStyle: {
    height: 250,
    maxWidth: "95%",
  },
}));

export function Insulation() {
  const classes = useStyles();
  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container alignItems="flex-start" justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" paragraph align="center">
              Insulation
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography paragraph align="center">
              Insulation is the most cost-effective way to improve your home's
              energy efficiency and comfort. Fully insulating your home can
              reduce the cost of heating or cooling by up to 50%! With good
              insulation, your home becomes a...
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={8}
            alignItems="flex-start"
            justify="center"
          >
            <Grid item xs={12} sm={6}>
              <Typography align="center">Thermos in winter:</Typography>
              <div className={classes.imgContainer}>
                <img
                  src={thermosImage}
                  alt="thermos warm inside"
                  className={classes.thermosStyle}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography align="center">Esky in summer:</Typography>
              <div className={classes.imgContainer}>
                <img
                  src={eskyImage}
                  alt="esky cool inside"
                  className={classes.eskyStyle}
                />
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography align="center">
              You can find out more about insulation on the{" "}
              <a href="https://www.sustainability.vic.gov.au/You-and-your-home/Building-and-renovating/Insulation">
                Sustainability Victoria website
              </a>
              .
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function DraughtProofing() {
  const classes = useStyles();

  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container alignItems="flex-start" justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Draught Proofing
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography paragraph align="center">
              Draughts cause your home to lose warm air in winter and allow hot
              air to enter your home in summer. It is estimated that 9/10
              Victorian homes have unwanted draughts!
            </Typography>
            <Typography paragraph align="center">
              Watch the video by Sustainability Victoria below to learn more
              about draught proofing.
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={8}
            lg={6}
            justify="center"
            className={classes.videoContainer}
          >
            <Grid item xs={12}>
              <ReactPlayer
                alt={"Energy Efficiency At Home: Draft-proofing"}
                url={
                  "https://www.youtube.com/watch?v=qA8fjlYIgf8&feature=emb_logo"
                }
                controls={true}
                config={{ youtube: { playerVars: { showinfo: 1 } } }}
                width="100%"
                maxHeight="400px"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography align="center" paragraph>
              You may also be eligible for the
              <a href="https://www.victorianenergysaver.vic.gov.au/save-energy-and-money/discount-energy-saving-products">
                {" "}
                Victorian Energy Saver Incentive Scheme{" "}
              </a>
              if you choose to install certain draugh proofing measures!
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography align="center">
              You can find out more about draught proofing on the{" "}
              <a href="https://www.sustainability.vic.gov.au/You-and-your-home/Save-energy/Draught-proofing">
                Sustainability Victoria website
              </a>
              .
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function Windows() {
  const classes = useStyles();

  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container alignItems="flex-start" justify="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" paragraph align="center">
              Window Size {"&"} Orientation
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography paragraph align="center">
              The size and orientation of your windows determine the amount of
              sunlight entering your home. External shading is much mroe
              efficient than blinds or curtains at cooling your home, but the
              use of both means is recommended!
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={10}
            alignItems="flex-start"
            justify="center"
            spacing={3}
          >
            <Grid item xs={12} sm={6}>
              <Typography align="center">
                North-facing windows should have fixed horizontal shading
                devices that keep the sun out in summer, but allow the low sun
                in during winter.
              </Typography>
              <div className={classes.imgContainer}>
                <img
                  src={northWindow}
                  alt="north windows"
                  className={classes.windowStyle}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography align="center">
                You should have adjustable external shading devices such as
                blinds, awnings, louvres or shutters on East and West facing
                windows.{" "}
              </Typography>
              <div className={classes.imgContainer}>
                <img
                  src={eastWestWindow}
                  alt="east and west windows"
                  className={classes.windowStyle}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography align="center">
                South facing windows receive almost no direct sunlight and are
                useful for ventilation as they allow cooling breezes from the
                South to enter your home!
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography align="center">
              You can find out more about minimising heat gain through windows
              on the{" "}
              <a href="https://www.sustainability.vic.gov.au/You-and-your-home/Building-and-renovating/Windows/Reduce-heat-gain-through-windows">
                Sustainability Victoria website
              </a>
              .
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function Landscaping() {
  const classes = useStyles();
  const content = [
    {
      title: "Landscaping",
      content: [
        "If using a fan, ensure there is adequate ventilation and that it is set-up to bring cooler air in from the outside.",
        "If using an air conditioner, make sure it is on the right setting (snowflake symbol)",
      ],
    },
  ];

  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container alignItems="flex-start" justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" paragraph align="center">
              Landscaping
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography paragraph align="center">
              Well thought out selection and placement of plants can provide
              shade and buffer against hot winds in the summer!
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={8}
            alignItems="flex-start"
            justify="center"
          >
            <Grid item xs={12} sm={6}>
              <Typography align="center">
                Tall deciduous trees can provide shade to North facing windows
                in summer while allowing the sun in during winter
              </Typography>
              <div className={classes.imgContainer}>
                <img
                  src={tree}
                  alt="Tall Deciduous Tree"
                  className={classes.thermosStyle}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography align="center" paragraph>
                Deciduous shrubs can be very useful for shading East and West
                facing windows and walls
              </Typography>
              <div className={classes.imgContainer}>
                <img
                  src={bushes}
                  alt="Deciduous Shrubs"
                  className={classes.eskyStyle}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
