import React, { useState } from "react";
import Slide from "@material-ui/core/Slide";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import {
  StayHydrated,
  HeatIllnesses,
  FanAirconUse,
  FinalTips,
  CoolEnvironment,
} from "./GuideContent";

//Use SVG to create SVGIcons
const useStyles = makeStyles((theme) => ({
  grow1: {
    flexGrow: 1,
  },
  containerStyle: {
    [theme.breakpoints.up("md")]: {
      padding: "5rem",
    },
    padding: "0.5rem",
  },
  activeChevronStyle: {
    fontSize: "4rem",
    flexGrow: 1,
    justifyContent: "center",
    color: theme.palette.primary.light,
  },
  inactiveChevronStyle: {
    fontSize: "4rem",
    flexGrow: 1,
    justifyContent: "center",
  },
  cardContentStyle: {
    minHeight: "450px",
    padding: "1rem",
    backgroundColor: "#ffc570",
  },
  iconStyle: {
    fontSize: "3rem",
  },
  hideCard: {
    display: "none",
  },
}));

export default function QuickGuide() {
  const classes = useStyles();
  const theme = useTheme();

  const [activePage, setActivePage] = React.useState(0);

  const handleNext = () => {
    if (activePage < 4) {
      setActivePage((prevActivePage) => prevActivePage + 1);
    }
  };

  const handleBack = () => {
    if (activePage > 0) {
      setActivePage((prevActivePage) => prevActivePage - 1);
    }
  };

  const content = [
    {
      cardNumber: 1,
      title: "Stay Hydrated and avoid strenuous activity",
      content: [
        "Keep a full drink bottle with you and take small sips of water frequently.",
        "Avoid Caffeine and alcohol.",
        "Avoid heavy activity like sport, renovating and gardening.",
      ],
      icons: ["Do", "Dont", "Dont"],
    },
    {
      cardNumber: 2,
      title: "Look out for signs of heat related illness",
      content: ["Heat Cramps", "Heat Exhaustion", "Heat Stroke"],
    },
    {
      cardNumber: 3,
      title: "Keep your environment cool",
      content: [
        "Draw your blinds",
        "Close-off any rooms that you are not using",
        "Open the windows when there is a cool breeze or when the temperature inside rises above the outside temperature.",
      ],
    },
    {
      cardNumber: 4,
      title: "Fan / Air Conditioner usage",
      content: [
        "If using a fan, ensure there is adequate ventilation and that it is set-up to bring cooler air in from the outside.",
        "If using an air conditioner, make sure it is on the right setting (snowflake symbol)",
      ],
    },
    {
      cardNumber: 5,
      title: "Final Tips",
      content: [
        "Stay out of the sun! Especially during the hottest part of the day! (usually 11am-3pm)",
        "If you cannot stay cool in your home, make arrangements to visit a friend or spend time in air-conditioned public spaces!",
      ],
    },
  ];

  return (
    <div className={classes.containerStyle}>
      <Grid container alignItems="center" alignContent="space-around">
        {/*Page 1*/}
        <Slide
          in={activePage === 0 ? true : false}
          direction="left"
          mountOnEnter
          unmountOnExit
          className={activePage !== 0 && classes.hideCard}
          timeout={700}
        >
          <Grid item xs={12}>
            <StayHydrated />
          </Grid>
        </Slide>
        {/*Page 2*/}
        <Slide
          in={activePage === 1 ? true : false}
          direction="left"
          mountOnEnter
          unmountOnExit
          className={activePage !== 1 && classes.hideCard}
          timeout={700}
        >
          <Grid item xs={12}>
            <HeatIllnesses />
          </Grid>
        </Slide>
        {/*Page 3*/}
        <Slide
          in={activePage === 2 ? true : false}
          direction="left"
          mountOnEnter
          unmountOnExit
          className={activePage !== 2 && classes.hideCard}
          timeout={700}
        >
          <Grid item xs={12}>
            <CoolEnvironment />
          </Grid>
        </Slide>
        {/*Page 4*/}
        <Slide
          in={activePage === 3 ? true : false}
          direction="left"
          mountOnEnter
          unmountOnExit
          className={activePage !== 3 && classes.hideCard}
          timeout={700}
        >
          <Grid item xs={12}>
            <FanAirconUse />
          </Grid>
        </Slide>
        {/*Page 5*/}
        <Slide
          in={activePage === 4 ? true : false}
          direction="left"
          mountOnEnter
          unmountOnExit
          className={activePage !== 4 && classes.hideCard}
          timeout={700}
        >
          <Grid item xs={12}>
            <FinalTips />
          </Grid>
        </Slide>
        <IconButton
          onClick={handleBack}
          className={
            activePage > 0
              ? classes.activeChevronStyle
              : classes.inactiveChevronStyle
          }
        >
          <ChevronLeftIcon fontSize="inherit" />
        </IconButton>
        <Grid item xs={2}>
          <Typography variant="body1" align="center">
            Page {activePage + 1} / 5
          </Typography>
        </Grid>
        <IconButton
          onClick={handleNext}
          className={
            activePage < 4
              ? classes.activeChevronStyle
              : classes.inactiveChevronStyle
          }
        >
          <ChevronRightIcon fontSize="inherit" />
        </IconButton>
      </Grid>
    </div>
  );
}
