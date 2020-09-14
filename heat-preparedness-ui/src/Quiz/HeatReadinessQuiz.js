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
import { QuestionOne, QuestionTwo, QuestionThree } from "./QuizQuestions";

const useStyles = makeStyles((theme) => ({
  quizCard: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    marginBottom: "1rem",
    padding: "1rem",
  },
  hideCard: {
    display: "none",
  },
  startQuizButton: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    textTransform: "none",
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      marginBottom: "1rem",
      textTransform: "none",
    },
    nextQuestionButton: {
      color: "white",
    },
  },
}));

export default function HeatReadinessQuiz() {
  const [question, setQuestion] = React.useState(99);
  const classes = useStyles();

  const handleNext = () => {
    if (question < 4) {
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
              className={classes.startQuizButton}
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
          <Grid xs={10}>
            <Card raised={true} className={classes.quizCard}>
              <CardHeader
                title="
              Welcome to our Heat Readiness Quiz!"
              />

              <Button onClick={handleNext} style={{ color: "white" }}>
                Next Question
              </Button>
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
          <Grid item xs={10}>
            <Card raised={true} className={classes.quizCard}>
              <QuestionOne />
              <Button onClick={handleNext} style={{ color: "white" }}>
                Next Question
              </Button>
            </Card>
          </Grid>
        </Slide>
        <Slide
          in={question === 2 ? true : false}
          className={question !== 2 && classes.hideCard}
          direction="left"
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <Grid item xs={10}>
            <Card raised={true} className={classes.quizCard}>
              <QuestionTwo />
              <Button onClick={handleNext} style={{ color: "white" }}>
                Next Question
              </Button>
            </Card>
          </Grid>
        </Slide>
        <Slide
          in={question === 3 ? true : false}
          className={question !== 3 && classes.hideCard}
          direction="left"
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <Grid item xs={10}>
            <Card raised={true} className={classes.quizCard}>
              <QuestionThree />
              <Button onClick={handleNext} style={{ color: "white" }}>
                Next Question
              </Button>
            </Card>
          </Grid>
        </Slide>
        <Slide
          in={question === 4 ? true : false}
          className={question !== 4 && classes.hideCard}
          direction="left"
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <Grid item xs={10}>
            <Card raised={true} className={classes.quizCard}>
              <CardContent>
                <Typography>You finished the quiz!</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Slide>
      </Grid>
    </React.Fragment>
  );
}
