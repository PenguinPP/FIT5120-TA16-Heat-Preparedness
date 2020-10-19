import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ambulance from "../KeepingHomeCool/images/ambulance.png";
import doctor from "../KeepingHomeCool/images/doctor.png";
import mineralWater from "../KeepingHomeCool/images/mineralWater.png";

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
  videoContainer: {
    justifyContent: "center",
    textAlign: "center",
    display: "flex",
    padding: "3px 0",
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
  windowStyle: {
    height: 250,
    maxWidth: "95%",
  },
  ambulance: {
    height: 200,
    maxWidth: "95%",
  },
  doctor: {
    height: 200,
    maxWidth: "95%",
  },
  mineralwater: {
    height: 200,
    maxWidth: "95%",
  },
}));

export function HeatCramps() {
  const classes = useStyles();
  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container alignItems="flex-start" justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" paragraph align="center">
              Heat Cramps
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className={classes.imgContainer}>
              <img
                src={mineralWater}
                className={classes.mineralwater}
                alt="water bottle"
              />
            </div>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={10}
            lg={8}
            alignItems="flex-start"
            justify="space-around"
            spacing={3}
          >
            <Grid item xs={12} md={6}>
              <Typography align="center">
                Symptoms:
                <br></br>
                <br></br>• Muscle pains
                <br></br>• Spasms in the abdomen, arms or legs
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography align="center">
                What to do:
                <br></br>
                <br></br>• Stop activity and sit quietly in a cool place
                <br></br>• Increase fluid intake
                <br></br>• Rest a few hours before returning to activity
                <br></br>• Seek medical help if cramps persist
              </Typography>
              {/*<div className={classes.imgContainer}>
                <img
                  src={eskyImage}
                  alt="esky cool inside"
                  className={classes.eskyStyle}
                />
  </div>*/}
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            {/* <Typography align="center">
              You can find out more about insulation on the{" "}
              <a href="https://www.sustainability.vic.gov.au/You-and-your-home/Building-and-renovating/Insulation">
                Sustainability Victoria website
              </a>
              .
</Typography>*/}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
export function HeatExhaustion() {
  const classes = useStyles();
  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container alignItems="flex-start" justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" paragraph align="center">
              Heat Exhaustion
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className={classes.imgContainer}>
              <img src={doctor} className={classes.doctor} alt="doctor" />
            </div>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={10}
            lg={8}
            alignItems="flex-start"
            justify="space-around"
            spacing={3}
          >
            <Grid item xs={12} md={6}>
              <Typography align="center">
                Symptoms:
                <br></br>
                <br></br>• Pale complexion and sweating
                <br></br>• Rapid heart rate
                <br></br>• Muscle cramps
                <br></br>• Weakness
                <br></br>• Dizziness
                <br></br>• Headache
                <br></br>• Nausea {"&"} Vomiting
                <br></br>• Fainting
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography align="center">
                What to do:
                <br></br>
                <br></br>• Lay them down on a cool area
                <br></br>• Remove outer clothing
                <br></br>• Wet skin with cool water or wet cloths
                <br></br>• Seek medical advice from a doctor
              </Typography>
              {/*<div className={classes.imgContainer}>
                <img
                  src={eskyImage}
                  alt="esky cool inside"
                  className={classes.eskyStyle}
                />
  </div>*/}
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            {/* <Typography align="center">
              You can find out more about insulation on the{" "}
              <a href="https://www.sustainability.vic.gov.au/You-and-your-home/Building-and-renovating/Insulation">
                Sustainability Victoria website
              </a>
              .
</Typography>*/}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
export function HeatStroke() {
  const classes = useStyles();
  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container alignItems="flex-start" justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" paragraph align="center">
              Heat Stroke
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className={classes.imgContainer}>
              <img
                src={ambulance}
                className={classes.ambulance}
                alt="ambulance"
              />
            </div>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={10}
            lg={8}
            alignItems="flex-start"
            justify="space-around"
            spacing={3}
          >
            <Grid item xs={12} md={6}>
              <Typography align="center">
                Symptoms:
                <br></br>
                <br></br>• Same symptoms as heat exhaustion.
                <br></br>• Dry skin with no sweating
                <br></br>• Mental condition worsens
                <br></br>• Confusion, headache, dizziness and nausea.
                <br></br>• Seizures or convulsions
                <br></br>• Disorientation, delirium or collapsing
                <br></br>• Unconsciousness
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography align="center">
                What to do:
                <br></br>
                <br></br>• Call an ambulance
                <br></br>• Get the person to a cool area and lay them down,
                remove their clothing, wet their skin with water, fanning
                continuously, position the unconscious person on their side and
                clean their airway
              </Typography>
              {/*<div className={classes.imgContainer}>
                <img
                  src={eskyImage}
                  alt="esky cool inside"
                  className={classes.eskyStyle}
                />
  </div>*/}
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            {/* <Typography align="center">
              You can find out more about insulation on the{" "}
              <a href="https://www.sustainability.vic.gov.au/You-and-your-home/Building-and-renovating/Insulation">
                Sustainability Victoria website
              </a>
              .
</Typography>*/}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
