import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, List, ListItem, CardMedia } from "@material-ui/core";
import onTile from "./images/onTile.png";
import coolWater from "./images/coolWater.png";
import wetFeet from "./images/wetFeet.png";
import noPetInCar from "./images/noPetInCar.png";
import sunCream from "./images/sunCream.png";
import walkPet from "./images/walkPet.png";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  cardContentStyle: {
    minHeight: "450px",
    padding: "1rem",
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
  },
  imgContainer: {
    textAlign: "center",
    maxWidth: "100%",
    padding: "1rem",
    marginBottom: "1rem",
  },
  mediaTile: {
    height: 225,
    maxWidth: "95%",
  },
  mediaWater: {
    height: 225,
    maxWidth: "95%",
  },
  mediaFeet: {
    height: 225,
    maxWidth: "95%",
  },
  mediaNoPetInCar: {
    height: 250,
    maxWidth: "95%",
  },
  mediaSuncream: {
    height: 250,
    maxWidth: "95%",
  },
  mediaWalkPet: {
    height: 300,
    maxWidth: "95%",
  },
}));

export function StayHome() {
  const classes = useStyles();
  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container alignItems="flex-start" justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" paragraph align="center">
              Bring them inside
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
                Let them enjoy the cool tiles or provide them a sturdy icepack
                or a frozen water bottle.
              </Typography>
              <div className={classes.imgContainer}>
                <img
                  src={onTile}
                  alt="Pet on cool tiles"
                  className={classes.mediaTile}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography align="center">
                Be sure to provide them with numerous sources of cool water.
              </Typography>
              <div className={classes.imgContainer}>
                <img
                  src={coolWater}
                  alt="Cool water sources"
                  className={classes.mediaWater}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={10}>
              <Typography align="center">
                If your pet seems to be in discomfort, try wetting their feet
                and misting water onto their face as many animals control their
                inner temperature through their feet.
              </Typography>
              <div className={classes.imgContainer}>
                <img
                  src={wetFeet}
                  alt="Wet pet's feet"
                  className={classes.mediaFeet}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function OutDoor() {
  const classes = useStyles();

  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container alignItems="flex-start" justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" paragraph align="center">
              Going outside with your pet
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={12}
            lg={10}
            alignItems="flex-start"
            justify="space-evenly"
            spacing={4}
          >
            <Grid item xs={12} md={6} lg={4}>
              <Typography align="center">
                NEVER leave your pet in the car in warm weather.
              </Typography>
              <div className={classes.imgContainer}>
                <img
                  src={noPetInCar}
                  alt="Pet on cool tiles"
                  className={classes.mediaNoPetInCar}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Typography align="center">
                Your fair-skinned pet will need a special sunscreen for animals
                to protect it from sunburns and the added risk of skin cancer.
                Their noses are especially sensitive!
              </Typography>
              <div className={classes.imgContainer}>
                <img
                  src={sunCream}
                  alt="Cool water sources"
                  className={classes.mediaSuncream}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Typography align="center">
                it is better to walk them early in the morning or in the
                evening. Remember, ground that feels hot to touch can do serious
                damage to your pooch’s paws!
              </Typography>
              <div className={classes.imgContainer}>
                <img
                  src={walkPet}
                  alt="Cool water sources"
                  className={classes.mediaWalkPet}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
