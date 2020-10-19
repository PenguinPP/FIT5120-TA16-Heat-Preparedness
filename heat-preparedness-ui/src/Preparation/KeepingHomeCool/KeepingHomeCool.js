import React from "react";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {
  Insulation,
  DraughtProofing,
  Windows,
  Landscaping,
} from "./KeepHomeCoolContent";

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

export default function KeepingHomeCool() {
  const classes = useStyles();

  const [activePage, setActivePage] = React.useState(0);

  const handleNext = () => {
    if (activePage < 3) {
      setActivePage((prevActivePage) => prevActivePage + 1);
    }
  };

  const handleBack = () => {
    if (activePage > 0) {
      setActivePage((prevActivePage) => prevActivePage - 1);
    }
  };

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
            <Insulation />
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
            <DraughtProofing />
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
            <Windows />
          </Grid>
        </Slide>
        <Slide
          in={activePage === 3 ? true : false}
          direction="left"
          mountOnEnter
          unmountOnExit
          className={activePage !== 3 && classes.hideCard}
          timeout={700}
        >
          <Grid item xs={12}>
            <Landscaping />
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
            Page {activePage + 1} / 4
          </Typography>
        </Grid>
        <IconButton
          onClick={handleNext}
          className={
            activePage < 3
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
