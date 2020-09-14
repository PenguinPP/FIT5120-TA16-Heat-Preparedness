import React, { useState, useContext } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@material-ui/core";
import { Link } from "react-scroll";
import Slide from "@material-ui/core/Slide";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { QuizContext } from "../Contexts/QuizContext";
import { QuestionOne } from "./QuizQuestions";

const useStyles = makeStyles((theme) => ({
  quizCard: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: "1rem",
    padding: "1rem",
  },
  quizButton: {
    textTransform: "none",
    marginBottom: "1rem",
  },
  hideCard: {
    display: "none",
  },
}));

export default function HeatReadinessQuiz() {
  const [question, setQuestion] = React.useState(99);
  const classes = useStyles();

  const handleNext = () => {
    if (question < 5) {
      setQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handleBack = () => {
    if (question > 0) {
      setQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Link
            activeClass="active"
            to={"Quiz"}
            spy={true}
            smooth={true}
            offset={-65}
            duration={1000}
          >
            <Button
              variant="contained"
              fullWidth={true}
              color="secondary"
              onClick={() => setQuestion(0)}
              className={classes.quizButton}
            >
              <Typography variant="h4">
                Take our Heat Readiness Quiz!
              </Typography>
            </Button>
          </Link>
        </Grid>

        <div id="Quiz" />

        <Slide
          in={question === 0 ? true : false}
          className={question !== 0 && classes.hideCard}
          direction="left"
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <Grid xs={12}>
            <Card raised={true} className={classes.quizCard}>
              <CardHeader
                title="
              Welcome to our Heat Readiness Quiz!"
              />

              <Button onClick={handleNext}>Next Question</Button>
            </Card>
          </Grid>
        </Slide>
        <Slide
          in={question === 1 ? true : false}
          className={question !== 1 && classes.hideCard}
          direction="left"
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <Grid item xs={12}>
            <Card raised={true} className={classes.quizCard}>
              <QuestionOne />
              <Button onClick={handleNext}>Next Question</Button>
            </Card>
          </Grid>
        </Slide>
      </Grid>
    </React.Fragment>
  );
}
