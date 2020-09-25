import React, { useState, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { ReactComponent as GuideIcon } from "../icons/guide-icon.svg";
import { ReactComponent as PetIcon } from "../icons/pet-icon.svg";
import { ReactComponent as CoolIcon } from "../icons/keep-cool-icon.svg";
import SvgIcon from "@material-ui/core/SvgIcon";
import Grid from "@material-ui/core/Grid";
import QuickGuide from "./QuickGuide/QuickGuide";
import Pets from "./Pets/Pets";
import KeepCool from "./KeepCool/KeepCool";
import { QuizContext } from "../Contexts/QuizContext";

const useStyles = makeStyles((theme) => ({
  active: {
    //Style for active category button
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
  },
  inactive: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
  },
}));

//Use SVG to create SVGIcons
const EssentialGuideIcon = (props) => {
  return (
    <SvgIcon
      {...props}
      component={GuideIcon}
      style={{ color: "#000000" }}
      viewBox="0 0 600 476.6"
    ></SvgIcon>
  );
};

const PetsIcon = (props) => {
  return (
    <SvgIcon {...props} component={PetIcon} viewBox="0 0 600 476.6"></SvgIcon>
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

  const display = {
    "Essentials Guide": <QuickGuide />,
    Pets: <Pets />,
    "Keeping Cool": <KeepCool />,
  };

  return (
    <React.Fragment>
      <Typography variant="h4" style={{ marginBottom: "1rem" }}>
        On the Day
      </Typography>
      <Typography variant="h8" paragraph>
        Check what things you should and what you should not do during a heat
        wave!
      </Typography>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Button
            id="Essentials Guide"
            className={
              adviceActiveCategory === "Essentials Guide"
                ? classes.active
                : classes.inactive
            } //Set style to active style if current category
            fullWidth={true}
            onClick={() => setAdviceCategory("Essentials Guide")}
            variant="contained"
          >
            <EssentialGuideIcon fontSize="large" />
            Essentials Guide
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
            id="Pets"
            className={
              adviceActiveCategory === "Pets"
                ? classes.active
                : classes.inactive
            }
            fullWidth={true}
            onClick={() => setAdviceCategory("Pets")}
            variant="contained"
          >
            <PetsIcon fontSize="large" />
            Pets
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
