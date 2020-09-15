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
import QuizResults from "./QuizResults";

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
}));

export default function HeatReadinessQuiz() {
  const {
    q1Answered,
    q2Answered,
    q3Answered,
    setQ1Answered,
    setQ2Answered,
    setQ3Answered,
  } = useContext(QuizContext);
  const [question, setQuestion] = React.useState(99);
  const [answered, setAnswered] = React.useState(false);
  const [mustChoose, setMustChoose] = React.useState(false);
  const classes = useStyles();

  const handleNext = () => {
    if (question < 4) {
      setQuestion((prevQuestion) => prevQuestion + 1);
      setMustChoose(false);
      setAnswered(false);
      setQ1Answered(false);
      setQ2Answered(false);
      setQ3Answered(false);
    }
  };

  const handleSubmit = () => {
    if (question === 1) {
      if (q1Answered) {
        setAnswered(true);
      } else {
        setMustChoose(true);
      }
    } else if (question === 2) {
      if (q2Answered) {
        setAnswered(true);
      } else {
        setMustChoose(true);
      }
    } else if (question === 3) {
      if (q3Answered) {
        setAnswered(true);
      } else {
        setMustChoose(true);
      }
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

              <Button
                onClick={handleNext}
                className={classes.nextQuestionButton}
              >
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
              <QuestionOne status={answered} />
              {mustChoose && (
                <Typography>You must choose an answer to continue!</Typography>
              )}
              <Button
                onClick={handleSubmit}
                className={
                  answered ? classes.hideCard : classes.nextQuestionButton
                }
              >
                Submit Answer
              </Button>
              <Button
                onClick={handleNext}
                className={
                  answered ? classes.nextQuestionButton : classes.hideCard
                }
              >
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
              <QuestionTwo status={answered} />
              {mustChoose && (
                <Typography>You must choose an answer to continue!</Typography>
              )}
              <Button
                onClick={handleSubmit}
                className={
                  answered ? classes.hideCard : classes.nextQuestionButton
                }
              >
                Submit Answer
              </Button>
              <Button
                onClick={handleNext}
                className={
                  answered ? classes.nextQuestionButton : classes.hideCard
                }
              >
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
              <QuestionThree status={answered} />
              {mustChoose && (
                <Typography>You must choose an answer to continue!</Typography>
              )}
              <Button
                onClick={handleSubmit}
                className={
                  answered ? classes.hideCard : classes.nextQuestionButton
                }
              >
                Submit Answer
              </Button>
              <Button
                onClick={handleNext}
                className={
                  answered ? classes.nextQuestionButton : classes.hideCard
                }
              >
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
                <QuizResults />
              </CardContent>
            </Card>
          </Grid>
        </Slide>
      </Grid>
    </React.Fragment>
  );
}
