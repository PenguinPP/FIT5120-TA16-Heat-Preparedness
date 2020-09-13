import React from "react";
import { Card, CardContent, Typography, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { QuizContext } from "../Contexts/QuizContext";

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
  return (
    <React.Fragment>
      <Card>
        <CardHeader title="Question 1" />
        <CardContent></CardContent>
      </Card>
    </React.Fragment>
  );
}
