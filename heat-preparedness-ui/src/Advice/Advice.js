import React, { useState, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { List, ListItem, makeStyles } from "@material-ui/core";
import { ReactComponent as BottleIcon } from "../icons/bottle-icon.svg";
import { ReactComponent as PhysicalIcon } from "../icons/physical-activity-icon.svg";
import { ReactComponent as CoolIcon } from "../icons/keep-cool-icon.svg";
import SvgIcon from "@material-ui/core/SvgIcon";
import Grid from "@material-ui/core/Grid";
import QuickGuide from "./QuickGuide/QuickGuide";
import { QuizContext } from "../Contexts/QuizContext";

const useStyles = makeStyles((theme) => ({
  active: {
    //Style for active category button
    background: theme.palette.primary.main,
    color: "black",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  inactive: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

//Use SVG to create SVGIcons
const GeneralIcon = (props) => {
  return (
    <SvgIcon
      {...props}
      component={BottleIcon}
      viewBox="0 0 600 476.6"
    ></SvgIcon>
  );
};

const PhysicalActivityIcon = (props) => {
  return (
    <SvgIcon
      {...props}
      component={PhysicalIcon}
      viewBox="0 0 600 476.6"
    ></SvgIcon>
  );
};

const KeepCoolIcon = (props) => {
  return (
    <SvgIcon {...props} component={CoolIcon} viewBox="0 0 600 476.6"></SvgIcon>
  );
};

export default function Advice(adviceData) {
  const { adviceActiveCategory, setAdviceCategory } = useContext(QuizContext);

  const classes = useStyles();

  //console.log(adviceData["adviceData"])

  const messages = {
    //Message to display for each category before bullet points
    General: "Some general bits of advice to get you through the day:",
    "Keeping Cool": "Here are a few things that you can do to keep cool:",
    "Physical Activity":
      "When it comes to physical activity during a heat wave:",
  };

  const display = {
    General: <QuickGuide />,
    "Keeping Cool": <h1>Keep Cool Not created yet</h1>,
    "Physical Activity": <h1>Physical Activity Not created yet</h1>,
  };

  return (
    <React.Fragment>
      <Typography variant="h4" style={{ marginBottom: "1rem" }}>
        On the Day
      </Typography>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Button
            id="General"
            className={
              adviceActiveCategory === "General"
                ? classes.active
                : classes.inactive
            } //Set style to active style if current category
            fullWidth={true}
            onClick={() => setAdviceCategory("General")}
            variant="contained"
          >
            <GeneralIcon fontSize="large" />
            General
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            id="Keeping Cool"
            className={
              adviceActiveCategory === "Keeping Cool"
                ? classes.active
                : classes.inactive
            }
            fullWidth={true}
            onClick={() => setAdviceCategory("Keeping Cool")}
            variant="contained"
          >
            <KeepCoolIcon fontSize="large" />
            Keep Cool
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            id="Physical Activity"
            className={
              adviceActiveCategory === "Physical Activity"
                ? classes.active
                : classes.inactive
            }
            fullWidth={true}
            onClick={() => setAdviceCategory("Physical Activity")}
            variant="contained"
          >
            <PhysicalActivityIcon fontSize="large" />
            Physical Activity
          </Button>
        </Grid>
      </Grid>
      {display[adviceActiveCategory]}
      {/* <Typography variant="h6" style={{ marginTop: "1rem" }}>
                {messages[category]}
            </Typography>
            <List>
                {adviceData["adviceData"].filter(item => item.category === category).map(item =>
                    <ListItem key={item.advice_id}>
                        <Typography>
                            {item.content}
                        </Typography>
                    </ListItem>
                )}
            </List> */}
    </React.Fragment>
  );
}
