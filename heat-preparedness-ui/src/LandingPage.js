import React from "react";
import Grid from "@material-ui/core/Grid";
import landingBg from "./heatback-4k.jpg";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grow2: {
    flexGrow: 2,
  },
  grow3: {
    flexGrow: 3,
  },
  landingBgHDStyle: {
    width: "100%",
    maxHeight: "100%",
    minHeight: "600px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      minHeight: "325px",
    },
  },
  landingText: {
    color: "white",
  },
}));

export default function LandingPage() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.landingBgHDStyle}
      style={{ backgroundImage: `url("${landingBg}")` }}
    >
      <div className={classes.grow3} />
      <Grid item>
        <Typography variant="h2" className={classes.landingText} align="center">
          Victoria Heat
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" className={classes.landingText} align="center">
          Stay Ready, Stay Safe!
        </Typography>
      </Grid>

      <div className={classes.grow2} />
      {/* <Grid item style={{ marginBottom: "1rem" }}>
                <Button size="small" variant="contained" color="transparent">
                    <Link
                        activeClass="active"
                        to={"HeatWaves"}
                        spy={true}
                        smooth={true}
                        offset={-80}
                        duration={700}
                    >
                        <Typography variant="h4" className={classes.buttonText}>
                            Know the dangers!
                         </Typography>
                    </Link>
                </Button>
            </Grid> */}
    </Grid>
  );
}
