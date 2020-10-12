import React from 'react';
import { subscribeUser } from "./subscription";
import {Button, Grid, Typography} from '@material-ui/core';
import { Link } from "react-scroll";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  quizCard: {
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
    marginBottom: "1rem",
    padding: "1rem",
    textAlign: "center",
  },
  hideCard: {
    display: "none",
  },
  startQuizButton: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textTransform: "none",
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      marginBottom: "1rem",
      textTransform: "none",
    },
  },
  nextQuestionButton: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
  },
  imgContainer: {
    textAlign: "center",
    width: "100%",
    padding: "1rem",
    marginBottom: "1rem",
  },
  imageStyle: {
    maxWidth: 250,
  },
}));

export default function Alerts(suburbInfo) {
    const classes = useStyles()
    console.log(suburbInfo["suburbInfo"])
    
    const handleSubscribe = () =>{
        console.log('subbing')
        subscribeUser(suburbInfo['suburbInfo']['suburb_id'])
    }
    
    return(
        <Grid container justify="center">
        <Grid container item xs={12} wrap="wrap" justify="center">
          <Grid container item xs={12} justify="center">
              <Grid container wrap="wrap" justify="center">
                <Button
                  variant="contained"
                  onClick={handleSubscribe}
                  className={classes.startQuizButton}
                >
                  <Typography variant="h4">
                    Subscribe to Heat Wave Alerts!
                  </Typography>
                </Button>
              </Grid>
          </Grid>
        </Grid>
        </Grid>
    )
}