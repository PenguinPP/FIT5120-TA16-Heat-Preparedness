import React from 'react';
import Grid from '@material-ui/core/Grid'
import landingBg from './heatback-7.jpg';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    grow2: {
        flexGrow: 3
    },
    landingBg: {
        width: '100%',
        maxHeight: '100%',
        minHeight: "600px"
    },
    landingText: {
        color: "white"
    }
}))

export default function LandingPage() {
    const classes = useStyles()

    return (
        <Grid container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.landingBg}
            style={{ backgroundImage: `url("${landingBg}")` }}>

            <div className={classes.grow2} />
            <Grid item>
                <Typography variant="h2" className={classes.landingText} align="center">
                    Victoria Heat
                    </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" className={classes.landingText} align="center">
                    Stay Ready, Stay Safe!
                        </Typography>
            </Grid>

            <div className={classes.grow} />
            <div className={classes.grow} />
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
    )
}