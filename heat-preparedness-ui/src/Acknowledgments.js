import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import teamLogo from "./images/Logo.png";

const useStyles = makeStyles((theme) => ({
  bgStyle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textAlign: "center",
    padding: "1rem",
  },
  linkStyle: {
    color: theme.palette.primary.contrastText,
  },
  buttonStyle: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    margin: "1rem",
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
  },
  active: {
    //Style for active category button
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
  },
  imgContainer: {
    textAlign: "center",
    width: "100%",
    padding: "1rem",
    marginBottom: "1rem",
  },
  logoStyle: {
    maxWidth: "95%",
  },
  aboutUsText: {
    color: "black",
  },
}));

export default function Acknowledgements() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className={classes.bgStyle}>
        <Typography variant="h5" paragraph>
          Acknowledgments
        </Typography>
        <Typography paragraph>
          The weather forecast information is updated every 6 hours based on
          available data from{" "}
          <a href="https://openweathermap.org/" className={classes.linkStyle}>
            OpenWeather
          </a>{" "}
          ( © Creative Commons Attribution-ShareAlike 4.0 International
          licence).
        </Typography>
        <Typography paragraph>
          Advice on improving your home's cooling efficiency was sourced from{" "}
          <a
            href="https://www.sustainability.vic.gov.au/You-and-your-home/Save-energy/Cooling/Cool-your-home-in-summer"
            className={classes.linkStyle}
          >
            Sustainability Victoria
          </a>{" "}
        </Typography>
        <Typography paragraph>
          The definitions of heatwaves, suggested preparations and further
          advice are extracted from the Victorian State Government . To access
          up-to-date information about current heatwaves in Victoria, please
          refer to Victoria Health’s resources:
        </Typography>
        <a
          className={classes.linkStyle}
          href="https://www2.health.vic.gov.au/public-health/environmental-health/climate-weather-and-public-health/heatwaves-and-extreme-heat/."
        >
          Health Victoria, Extreme Heat and Heatwaves
        </a>
        <br />
        <a
          className={classes.linkStyle}
          href="https://www.betterhealth.vic.gov.au/campaigns/Survive-the-heat"
        >
          Better Health Channel, Survive the Heat{" "}
        </a>
        <br />

        <br />
        <Typography paragraph>
          Vector silhouettes for heat wave deaths were obtained from{" "}
          <a
            href="https://www.freevector.com/elderly-people-silhouettes"
            className={classes.linkStyle}
          >
            freevector.com
          </a>{" "}
          and{" "}
          <a
            className={classes.linkStyle}
            href="https://www.vecteezy.com/free-vector/human-silhouette-vector-free"
          >
            Vecteezy
          </a>
          .
        </Typography>
        <Typography paragraph>
          Statistics on unusually hot days in Victoria were acquired from the{" "}
          <a
            href="https://www.climatechange.vic.gov.au/climate-science-report-2019"
            className={classes.linkStyle}
          >
            Victorian Climate Change Report 2019.
          </a>
        </Typography>
        <Typography paragraph>
          Weather icons were acquired from{" "}
          <a href="http://www.flaticon.com" className={classes.linkStyle}>
            flaticon.
          </a>
        </Typography>

        <Button className={classes.buttonStyle} onClick={handleClickOpen}>
          About Us
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="about-us-dialog-title"
          aria-describedby="about-us-dialog-description"
        >
          <DialogTitle id="about-us-dialog-title">About Us</DialogTitle>
          <DialogContent>
            <div className={classes.imgContainer}>
              <img
                src={teamLogo}
                alt="Victoria Heat Logo"
                className={classes.logoStyle}
              />
            </div>
            <DialogContentText id="about-us-dialog-description">
              <Typography paragraph className={classes.aboutUsText}>
                We are a team of Master's students from Monash University. We
                have created this web-app as part of our final semester project.
                Upon being given the topic of "Extreme Temperatures," we quickly
                realised that Heat Waves were a major public health issue in
                Victoria and that older individuals were the most vulnerble.
              </Typography>
              <Typography paragraph className={classes.aboutUsText}>
                We believe that technology can be used to positively impact the
                lives of older indiviudals and we hope that our project will do
                just that! We are determined to provide vulnerable individuals
                with the knowledge and resources they will need to safeguard
                their health during periods of high temperatures.
              </Typography>
              <Typography paragraph className={classes.aboutUsText}>
                We hope you find our project useful!
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className={classes.active}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
}
