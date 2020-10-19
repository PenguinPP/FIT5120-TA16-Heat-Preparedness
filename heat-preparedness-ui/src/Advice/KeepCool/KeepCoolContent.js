import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, List, ListItem } from "@material-ui/core";
import groupcooling from "./images/group_cooling.png";
import shower from "./images/shower.png";
import towelcool from "./images/towel_cool.png";
import waterface from "./images/water_face.png";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  cardContentStyle: {
    minHeight: "450px",
    padding: "1rem",
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
  },
  crossStyle: {
    color: theme.palette.cross.main,
  },
  tickStyle: {
    color: theme.palette.tick.main,
  },
}));

export function Coolyourself() {
  const classes = useStyles();
  return (
    <Card raised={true}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container alignItems="flex-start" justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" paragraph align="center">
              Keep Yourself Cool
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
            <Grid item xs={12} md={6} lg={4}>
              <Typography align="center">
                Place a loose damp cloth or scarf on the back of your neck.
              </Typography>
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={towelcool}
                  style={{
                    height: 200,
                    width: 200,
                  }}
                  alt="coolbytowel"
                ></img>
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Typography align="center">
                Spray or splash your face and the back of your neck with cold
                water several times a day. You can also spray water over other
                parts of your skin or clothing.
              </Typography>
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={waterface}
                  style={{
                    height: 200,
                    width: 200,
                  }}
                  alt="coolbywashface"
                ></img>
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Typography align="center">
                Place your feet in cool water. Take cool (not too cold!)
                showers.
              </Typography>
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={shower}
                  style={{
                    height: 200,
                    width: 200,
                  }}
                  alt="coolbyshower"
                ></img>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function Cooltogether() {
  const classes = useStyles();
  const content = [
    {
      title: "Cool yourself inside home and outside",
      content: [
        "It is also helpful to open windows at night for ventilation. If you are worried about security, a security screen door will allow breezes through your house at night, or open windows on the first floor and above.",
        "If you struggle with staying cool at home, make arrangements to visit a friend or spend time in an air-conditioned public space (library, shopping centre, cinema)",
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
            <div
              style={{
                textAlign: "center",
                width: "100%",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <img
                src={groupcooling}
                style={{
                  maxHeight: 500,
                  marginTop: "1rem",
                  maxWidth: "90%",
                }}
                alt="coolpeople"
              ></img>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
