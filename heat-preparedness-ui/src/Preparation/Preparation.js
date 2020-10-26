import React, { useState, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { List, ListItem, makeStyles } from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as SymptomSVG } from "../icons/symptoms.svg";
import { ReactComponent as CoolHomeIcon } from "../icons/keep-cool-icon.svg";
import { ReactComponent as PowerIcon } from "../icons/power-failure-icon.svg";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-scroll";
import { QuizContext } from "../Contexts/QuizContext";
import Symptoms from "./Symptoms/Symptoms";
import KeepingHomeCool from "./KeepingHomeCool/KeepingHomeCool";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Pdf from "../Preparation/Victoria-Heat-Guide.pdf";
import downloadicon from "./button.png"

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
  inactive: {
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
  mediadownload: {
    height: 25,
    maxWidth: "95%",
  }
}));

const SymptomsIcon = (props) => {
  return (
    <SvgIcon
      {...props}
      component={SymptomSVG}
      viewBox="0 0 600 476.6"
    ></SvgIcon>
  );
};

const KeepHomeCoolIcon = (props) => {
  return (
    <SvgIcon
      {...props}
      component={CoolHomeIcon}
      viewBox="0 0 600 476.6"
    ></SvgIcon>
  );
};

const PowerFailureIcon = (props) => {
  return (
    <SvgIcon {...props} component={PowerIcon} viewBox="0 0 600 476.6"></SvgIcon>
  );
};

export default function Preparation(preparationData) {
  const classes = useStyles();

  const { prepActiveCategory, setPrepCategory } = useContext(QuizContext);
  //console.log(prepActiveCategory);
  var messages = {
    //Message to display for each category before bullet points
    "Heat Short Term":
      "There are a number of things you can do in the short term to prepare for a heat wave:",
    "Heat Long Term":
      "There are a number of things you can do in the long term to improve your ability to cope with extreme heat:",
    "Power Failure":
      "Power failures can occur during a heat wave and it is important to be be prepared for them:",
  };

  //console.log(preparationData["preparationData"])

  const display = {
    Symptoms: <Symptoms />,
    "Cooling your home": <KeepingHomeCool />,
    Pets: <h1>Pets Not created yet</h1>,
  };

  return (
    <React.Fragment>
      <Typography variant="h4" style={{ marginBottom: "1rem" }}>
        Be Prepared!
      </Typography>
      <Typography variant="h8" paragraph>
        Mitigate risks by having the necessary preparations in place for when a
        heat wave comes.{" "}
        <a href={Pdf} download>
          Stick our guide onto your fridge!
        </a>
        <img
          src={downloadicon}
          alt="download lead"
          className={classes.mediadownload}
        />
      </Typography>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Button
            id="Symptoms"
            className={
              prepActiveCategory === "Symptoms"
                ? classes.active
                : classes.inactive
            } //Set style to active style if current category
            fullWidth={true}
            onClick={() => setPrepCategory("Symptoms")}
            variant="contained"
          >
            <SymptomsIcon fontSize="large" />
            Symptoms
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            id="Cooling your home"
            className={
              prepActiveCategory === "Cooling your home"
                ? classes.active
                : classes.inactive
            }
            fullWidth={true}
            onClick={() => setPrepCategory("Cooling your home")}
            variant="contained"
          >
            <KeepHomeCoolIcon fontSize="large" />
            Cooling your home
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            id="Power Failure"
            className={
              prepActiveCategory === "Power Failure"
                ? classes.active
                : classes.inactive
            }
            fullWidth={true}
            onClick={() => setPrepCategory("Power Failure")}
            variant="contained"
          >
            <PowerFailureIcon fontSize="large" />
            Power Failure
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" style={{ marginTop: "1rem" }}>
            {messages[prepActiveCategory]}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <List>
            {preparationData["preparationData"]
              .filter((item) => item.category === prepActiveCategory)
              .map((item) => (
                <ListItem key={item.advice_id}>
                  <Checkbox />
                  <Typography>{item.content}</Typography>
                </ListItem>
              ))}
          </List>
        </Grid>

        <Grid item xs={12} justify="center">
          {display[prepActiveCategory]}
        </Grid>
        <Grid container item xs={12} justify="center">
          <Link
            activeClass="active"
            to={"Advice"}
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
                    <Typography variant="h6">Take Precautions!</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <KeyboardArrowDownIcon />
                  </Grid>
                </Grid>
              </Button>
            </Grid>
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
