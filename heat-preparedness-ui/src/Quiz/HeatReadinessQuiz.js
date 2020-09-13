import React, { useState } from "react";
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
  },
  quizButton: {
    textTransform: "none",
    marginBottom: "1rem",
  },
}));

export default function HeatReadinessQuiz() {
  const [question, setQuestion] = React.useState(99);
  const classes = useStyles();

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
        <Grid xs={10}>
          <div id="Quiz" />
          <Slide
            in={question === 0 ? true : false}
            direction="left"
            mountOnEnter
            unmountOnExit
            timeout={1000}
          >
            <Card raised={true} className={classes.quizCard}>
              <CardHeader
                title="
              Welcome to our Heat Readiness Quiz!"
              />

              <Button>Next Question</Button>
            </Card>
          </Slide>
          <Slide
            in={question === 1 ? true : false}
            direction="left"
            mountOnEnter
            unmountOnExit
            timeout={1000}
          >
            <QuestionOne />
          </Slide>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
