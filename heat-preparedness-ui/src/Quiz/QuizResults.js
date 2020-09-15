import React, { useState, useContext } from "react";
import {
  CardContent,
  Typography,
  CardHeader,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { QuizContext } from "../Contexts/QuizContext";
import { Link } from "react-scroll";

const useStyles = makeStyles((theme) => ({
  quizCard: {
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
    marginBottom: "1rem",
  },
  buttonStyle: {
    //Style for active category button
    margin: "1rem",
    minWidth: "200px",
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
  },
  crossStyle: {
    color: theme.palette.cross.main,
  },
  tickStyle: {
    color: theme.palette.tick.main,
  },
  quizContent: {
    textAlign: "center",
  },
}));

export default function QuizResults() {
  const classes = useStyles();

  const {
    q1Correct,
    q2Correct,
    q3Correct,
    setAdviceCategory,
    setPrepCategory,
  } = useContext(QuizContext);

  const handleSymptoms = () => {
    setPrepCategory("Symptoms");
  };

  const handleEssential = () => {
    setAdviceCategory("Essentials Guide");
  };

  const handlePets = () => {
    setAdviceCategory("Pets");
  };

  return (
    <React.Fragment>
      <CardHeader title="Quiz Results" />

      <CardContent className={classes.quizContent}>
        <Typography>
          Thank you for completing the quiz! Based on your results, we suggest
          you check out the sections below.
        </Typography>
        <Grid container justify="space-around">
          {!q1Correct && (
            <Grid item xs={12} md={4}>
              <Link
                activeClass="active"
                to={"Prep"}
                spy={true}
                smooth={true}
                offset={-80}
                duration={700}
              >
                <Button className={classes.buttonStyle}>Symptoms</Button>
              </Link>
            </Grid>
          )}
          {!q2Correct && (
            <Grid item xs={12} md={4}>
              <Link
                activeClass="active"
                to={"Advice"}
                spy={true}
                smooth={true}
                offset={-80}
                duration={700}
              >
                <Button className={classes.buttonStyle}>
                  Essentials Guide
                </Button>
              </Link>
            </Grid>
          )}
          {!q3Correct && (
            <Grid item xs={12} md={4}>
              <Link
                activeClass="active"
                to={"Advice"}
                spy={true}
                smooth={true}
                offset={-80}
                duration={700}
              >
                <Button className={classes.buttonStyle}>Pets</Button>
              </Link>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </React.Fragment>
  );
}
