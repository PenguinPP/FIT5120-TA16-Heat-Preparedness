import React, { useState, useContext } from "react";
import { CardContent, Typography, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { QuizContext } from "../Contexts/QuizContext";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import car from "../Quiz/images/car.png";
import cocktail from "../Quiz/images/cocktail.png";
import temperature from "../Quiz/images/temperature.png";

const useStyles = makeStyles((theme) => ({
  quizCard: {
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
    marginBottom: "1rem",
  },
  quizButton: {
    textTransform: "none",
    marginBottom: "1rem",
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
  imgContainer: {
    textAlign: "center",
    width: "100%",
    padding: "1rem",
    marginBottom: "1rem",
  },
  car: {
    height: 200,
    maxWidth: "95%",
  },
  temperature: {
    height: 200,
    maxWidth: "95%",
  },
  cocktail: {
    height: 200,
    maxWidth: "95%",
  },
}));

export function QuestionOne(status) {
  const classes = useStyles();

  const { setQ1Result, setQ1Answered } = useContext(QuizContext);
  const [answer, setAnswer] = React.useState("Unanswered");
  const handleChange = (event) => {
    setAnswer(event.target.value);
    if (event.target.value === "Wrong") {
      setQ1Result(false);
      setQ1Answered(true);
    } else {
      setQ1Result(true);
      setQ1Answered(true);
    }
  };
  return (
    <React.Fragment>
      <CardHeader title="Question 1" />

      {!status.status ? (
        <CardContent className={classes.quizContent}>
          <FormControl component="fieldset">

            <div className={classes.imgContainer}>
              <img
                src={temperature}
                className={classes.temperature}
              />
            </div>

            {//<Typography>Is the following statement TRUE or FALSE?</Typography>
            }
            <Typography>
              Heat strokes are fatal in up to 25% of cases.
            </Typography>
            {/*Put Question here ^^^^^^^^^^^ */}
            <RadioGroup
              aria-label="question 2"
              name="Question1"
              value={answer}
              onChange={handleChange}
            >
              {/*Each <FormControlLabel> represents one option
               Value stores whether option is right or wrong
               Label is what the user will see as the option
               */}
              <FormControlLabel
                value="Wrong"
                control={<Radio color="primary" />}
                label="True"
              />{" "}
              <FormControlLabel
                value="Correct"
                control={<Radio color="primary" />}
                label="False"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      ) : (
          <CardContent className={classes.quizContent}>
            <div className={classes.imgContainer}>
              <img
                src={temperature}
                className={classes.temperature}
              />
            </div>
            <Typography>
              The answer you have chosen is {answer}{" "}
              {answer === "Wrong" ? (
                <ClearIcon className={classes.crossStyle} />
              ) : (
                  <CheckIcon className={classes.tickStyle} />
                )}
            </Typography>
            {answer === "Wrong" && (
              <Typography>The correct answer is FALSE</Typography>
            )}
            <Typography>
              Heat strokes are fatal in up to 80% of cases. It is a medical
              emergency that requires urgent attention.
          </Typography>
          </CardContent>
        )}
    </React.Fragment>
  );
}

export function QuestionTwo(status) {
  const classes = useStyles();

  const { setQ2Result, setQ2Answered } = useContext(QuizContext);
  const [answer, setAnswer] = React.useState("Unanswered");

  const handleChange = (event) => {
    setAnswer(event.target.value);
    if (event.target.value === "Wrong") {
      setQ2Result(false);
      setQ2Answered(true);
    } else {
      setQ2Result(true);
      setQ2Answered(true);
    }
  };

  return (
    <React.Fragment>
      <CardHeader title="Question 2" />
      {!status.status ? (
        <CardContent className={classes.quizContent}>
          <FormControl component="fieldset">
            <div className={classes.imgContainer}>
              <img
                src={cocktail}
                className={classes.cocktail}
              />
            </div>
            {//<Typography>Is the following statement TRUE or FALSE?</Typography>
            }
            <Typography>
              During a heatwave people should avoid the consumption of caffeine
              and alcohol.
            </Typography>
            {/*Put Question here ^^^^^^^^^^^ */}
            <RadioGroup
              aria-label="question 2"
              name="question2"
              value={answer}
              onChange={handleChange}
            >
              {/*Each <FormControlLabel> represents one option
               Value stores whether option is right or wrong
               Label is what the user will see as the option
               */}
              <FormControlLabel
                value="Wrong"
                control={<Radio color="primary" />}
                label="False"
              />
              <FormControlLabel
                value="Correct"
                control={<Radio color="primary" />}
                label="True"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      ) : (
          <CardContent className={classes.quizContent}>
            <div className={classes.imgContainer}>
              <img
                src={cocktail}
                className={classes.cocktail}
              />
            </div>
            <Typography>
              The answer you have chosen is {answer}{" "}
              {answer === "Wrong" ? (
                <ClearIcon className={classes.crossStyle} />
              ) : (
                  <CheckIcon className={classes.tickStyle} />
                )}
            </Typography>
            {answer === "Wrong" && (
              <Typography>The correct answer is TRUE</Typography>
            )}
            <Typography>
              These can create conditions that make the body more vulnerable to
              heat stress.
          </Typography>
          </CardContent>
        )}
    </React.Fragment>
  );
}

export function QuestionThree(status) {
  const classes = useStyles();

  const { setQ3Result, setQ3Answered } = useContext(QuizContext);
  const [answer, setAnswer] = React.useState("Unanswered");

  const handleChange = (event) => {
    setAnswer(event.target.value);
    if (event.target.value === "Wrong") {
      setQ3Result(false);
      setQ3Answered(true);
    } else {
      setQ3Result(true);
      setQ3Answered(true);
    }
  };

  return (
    <React.Fragment>
      <CardHeader title="Question 3" />
      {!status.status ? (
        <CardContent className={classes.quizContent}>
          <FormControl component="fieldset">
            <div className={classes.imgContainer}>
              <img
                src={car}
                className={classes.car}
              />
            </div>
            <Typography>
              Should you call “000” if you see a child or a pet left inside a
              car?
            </Typography>
            {/*Put Question here ^^^^^^^^^^^ */}
            <RadioGroup
              aria-label="question 3"
              name="question3"
              value={answer}
              onChange={handleChange}
            >
              {/*Each <FormControlLabel> represents one option
               Value stores whether option is right or wrong
               Label is what the user will see as the option
               */}
              <FormControlLabel
                value="Wrong"
                control={<Radio color="primary" />}
                label="No"
              />
              <FormControlLabel
                value="Correct"
                control={<Radio color="primary" />}
                label="Yes"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      ) : (
          <CardContent className={classes.quizContent}>
            <div className={classes.imgContainer}>
              <img
                src={car}
                className={classes.car}
              />
            </div>
            <Typography>
              The answer you have chosen is {answer}{" "}
              {answer === "Wrong" ? (
                <ClearIcon className={classes.crossStyle} />
              ) : (
                  <CheckIcon className={classes.tickStyle} />
                )}
            </Typography>
            {answer === "Wrong" && (
              <Typography>The correct answer is YES</Typography>
            )}
            <Typography>
              It is illegal and dangerous to leave children and pets in cars,
              especially when experiencing extreme heat.
          </Typography>
          </CardContent>
        )}
    </React.Fragment>
  );
}
