import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
}));

export default function Acknowledgements() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.bgStyle}>
        <Typography variant="h5">Acknowledgments</Typography>
        <br />
        <Typography>
          The weather forecast information is updated every 6 hours based on
          available data from{" "}
          <a href="https://openweathermap.org/" className={classes.linkStyle}>
            OpenWeather
          </a>{" "}
          ( © Creative Commons Attribution-ShareAlike 4.0 International
          licence).
        </Typography>
        <br />
        <Typography>
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
      </div>
    </React.Fragment>
  );
}
