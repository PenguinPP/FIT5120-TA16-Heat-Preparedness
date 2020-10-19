import React, { useContext } from "react";
import {
  CardContent,
  Typography,
  CardHeader,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { QuizContext } from "../Contexts/QuizContext";
import { Link } from "react-scroll";
import { ReactComponent as GuideIcon } from "../icons/guide-icon.svg";
import { ReactComponent as PetIcon } from "../icons/pet-icon.svg";
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as SymptomSVG } from "../icons/symptoms.svg";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const PetsIcon = (props) => {
  return (
    <SvgIcon {...props} component={PetIcon} viewBox="0 0 600 476.6"></SvgIcon>
  );
};

const SymptomsIcon = (props) => {
  return (
    <SvgIcon
      {...props}
      component={SymptomSVG}
      viewBox="0 0 600 476.6"
    ></SvgIcon>
  );
};

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
  allCorrect: {
    fontSize: "10rem",
    color: "#148F74",
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

  if (q1Correct && q2Correct && q3Correct) {
    return (
      <React.Fragment>
        <CardHeader title="Quiz Results" />

        <CardContent className={classes.quizContent}>
          <Typography paragraph>
            Congratulations on getting all the questions correct! You are well
            on your way to being prepared for heat waves!
          </Typography>

          <CheckCircleOutlineIcon className={classes.allCorrect} />
          <Typography paragraph>
            Check out our Be Prepared section for some extra tips on how you can
            get yourself more ready, and our On the Day section for some key
            things you should be doing on the day of a heatwave!
          </Typography>
        </CardContent>
      </React.Fragment>
    );
  } else {
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
                  <Button
                    className={classes.buttonStyle}
                    onClick={handleSymptoms}
                  >
                    <SymptomsIcon fontSize="large" />
                    Symptoms
                  </Button>
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
                  <Button
                    className={classes.buttonStyle}
                    onClick={handleEssential}
                  >
                    <EssentialGuideIcon fontSize="large" />
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
                  <Button className={classes.buttonStyle} onClick={handlePets}>
                    <PetsIcon fontSize="large" />
                    Pets
                  </Button>
                </Link>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </React.Fragment>
    );
  }
}
