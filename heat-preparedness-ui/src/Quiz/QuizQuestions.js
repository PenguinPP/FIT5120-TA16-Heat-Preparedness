import React, { useState, useContext } from "react";
import { CardContent, Typography, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { QuizContext } from "../Contexts/QuizContext";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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

export function QuestionOne() {
  const classes = useStyles();

  const { q1Correct, setQ1Result } = useContext(QuizContext);
  const [answer, setAnswer] = React.useState("Unanswered");

  const handleChange = (event) => {
    setAnswer(event.target.value);
    if (event.target.value === "Wrong") {
      setQ1Result(false);
    } else {
      setQ1Result(true);
    }
  };

  return (
    <React.Fragment>
      <CardHeader title="Question 1" />
      <CardContent>
        <FormControl component="fieldset">
          <Typography>Do you think you are correct or wrong?</Typography>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={answer}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Wrong"
              control={<Radio color="primary" />}
              label="Wrong"
            />
            <FormControlLabel
              value="Correct"
              control={<Radio color="primary" />}
              label="Correct"
            />
          </RadioGroup>
        </FormControl>
        <Typography>The answer you have chosen is {answer}</Typography>
        <Typography>
          The context state boolean value is now {q1Correct.toString()}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
}
