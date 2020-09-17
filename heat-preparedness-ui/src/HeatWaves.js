import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ReactPlayer from "react-player";
import { Link } from "react-scroll";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import eightyPercent from "./images/eighty-percent.png";
import heatDeaths from "./images/heat-deaths.png";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles((theme) => ({
  active: {
    //Style for active category button
    background: theme.palette.primary.main,
    padding: "none",
    textTransform: "none",
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
  },
  elderlyDeathsDesktop: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  elderlyDeathsMobile: {
    [theme.breakpoints.up("md")]: {
      display: "none",
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
    minWidth: 225,
  },
}));

export default function HeatWaves() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        wrap="wrap"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
          <Typography variant="h4">Heat Waves</Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <Typography>
            Heat waves are Australia's deadliest natural hazard. From 1900 until
            2011, extreme heat has been responsible for more deaths in Australia
            than all other natural hazards combined. Each plane on the right
            represents approximately 250 people, the capacity of a Airbus A330.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <div
            style={{
              textAlign: "center",
              width: "100%",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <img
              src={heatDeaths}
              style={{
                maxHeight: 500,
                marginTop: "1rem",
                maxWidth: "90%",
              }}
              alt="deaths from natural disasters"
            ></img>
          </div>
        </Grid>
        <Grid
          className={classes.elderlyDeathsDesktop}
          item
          xs={12}
          md={6}
          lg={5}
        >
          <div
            style={{
              textAlign: "center",
              width: "100%",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <img
              src={eightyPercent}
              style={{
                maxHeight: 500,
                marginTop: "1rem",
                maxWidth: "90%",
              }}
              alt="Elderly deaths percentage"
            ></img>
          </div>
        </Grid>
        <Grid
          className={classes.elderlyDeathsDesktop}
          item
          xs={12}
          md={6}
          lg={5}
        >
          <Typography>
            Victoria recorded a combined total of 541 deaths during the
            heatwaves in 2009 and 2014. 80% percent of these individuals were
            aged 65 and over.
          </Typography>
        </Grid>

        <Grid
          className={classes.elderlyDeathsMobile}
          item
          xs={12}
          md={6}
          lg={5}
        >
          <Typography>
            Victoria recorded a combined total of 541 deaths during the
            heatwaves in 2009 and 2014. 80% percent of these individuals were
            aged 65 and over.
          </Typography>
        </Grid>
        <Grid
          className={classes.elderlyDeathsMobile}
          item
          xs={12}
          md={6}
          lg={5}
        >
          <div
            style={{
              textAlign: "center",
              width: "100%",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <img
              src={eightyPercent}
              style={{
                maxHeight: 500,
                marginTop: "1rem",
                maxWidth: "90%",
              }}
              alt="Elderly deaths percentage"
            ></img>
          </div>
        </Grid>

        <Grid
          container
          item
          xs={12}
          md={12}
          justify="center"
          textAlign="center"
        >
          <Grid item xs={12}>
            <Typography
              variant="h5"
              align="center"
              style={{ marginTop: "1rem" }}
            >
              The Hidden Killer Among Us
            </Typography>
            <Grid item xs={12}>
              <ReactPlayer
                alt={"Extreme heat - English"}
                url={"https://www.youtube.com/watch?v=CHhHbzCQ8Vk"}
                controls={true}
                config={{ youtube: { playerVars: { showinfo: 1 } } }}
                width="100%"
                maxHeight="400px"
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  display: "flex",
                  padding: "3px 0",
                }}
              />
              <small className="mediaText">{"Extreme heat - English"}</small>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography>
            Heat waves exacerbate pre-existing medical conditions and are
            therefore also a significant cause for concern to those with chronic
            medical issues. A heat wave is said to occur when unusually high
            maximum and minimum temperatures are observed for three or more
            days.
          </Typography>
        </Grid>

        <Grid container item xs={12} justify="center">
          <Link
            activeClass="active"
            to={"Alerts"}
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
                    <Typography variant="h6">Stay Alert!</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <KeyboardArrowDownIcon style={{ marginBottom: 0 }} />
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
