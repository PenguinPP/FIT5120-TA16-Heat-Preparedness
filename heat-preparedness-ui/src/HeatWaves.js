import React from 'react';
import Typography from '@material-ui/core/Typography';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie } from 'victory';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from "react-player";
import { Link } from 'react-scroll';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';



export default function HeatWaves() {

    const theme = useTheme()

    const hazardData = [
        { hazard: 1, deaths: 4555, fill: theme.palette.primary.main }, //Extreme heat
        { hazard: 2, deaths: 1285, fill: theme.palette.secondary.main }, //Cyclones
        { hazard: 3, deaths: 1221, fill: theme.palette.secondary.main }, //Floods
        { hazard: 4, deaths: 866, fill: theme.palette.secondary.main } //Bushfires
    ];

    const deathData = [
        { ageGroup: "Aged >= 65", percentage: 80 }, //Aged 65 and over
        { ageGroup: "Aged < 65", percentage: 20 } //Aged under 65
    ]

    return (
        <React.Fragment>
            <Typography variant="h4">
                Heat Waves
        </Typography>
            <Grid container spacing={2} >
                <Grid item xs={12} md={6} lg={6}>

                    <Typography>
                        Heat waves are Australia's deadliest natural hazard. From 1900 until 2011, extreme heat has been responsible for more deaths in Australia than all other natural hazards combined.
            </Typography>
                    <VictoryChart domainPadding={20} theme={VictoryTheme.material} height={250}
                    >
                        <VictoryAxis
                            tickValues={[1, 2, 3, 4]}
                            tickFormat={["Extreme Heat", "Cyclones", "Floods", "Bushfires"]}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(x) => (`${x}`)}
                        />
                        <VictoryBar
                            data={hazardData} x="hazard" y="deaths"
                            style={{
                                data: {
                                    fill: ({ datum }) => datum.fill,
                                }
                            }}
                        />
                    </VictoryChart>

                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Typography>
                        Victoria recorded a combined total of 541 deaths during the heatwaves in 2009 and 2014. 80% percent of these individuals were aged 65 and over.
                    </Typography>

                    <VictoryPie
                        height={300}
                        startAngle={180}
                        endAngle={540}
                        data={deathData}
                        x="ageGroup"
                        y="percentage"
                        colorScale={[theme.palette.primary.main, theme.palette.secondary.main]}
                    />
                </Grid>
                <Grid container item xs={12} md={12} justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            The Hidden Killer Among Us
                    </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <ReactPlayer alt={"Extreme heat - English"} url={"https://www.youtube.com/watch?v=CHhHbzCQ8Vk"} controls={true} config={{ youtube: { playerVars: { showinfo: 1 } } }} />
                        <small className="mediaText">{"Extreme heat - English"}</small>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography>
                        Heat waves exacerbate pre-existing medical conditions and are therefore also a significant cause for concern to those with chronic medical issues.
                        A heat wave is said to occur when unusually high maximum and minimum temperatures are observed for three or more days.
                    </Typography>

                </Grid>

                <Grid item xs={12} justify="center">
                    <Link
                        activeClass="active"
                        to={"Alerts"}
                        spy={true}
                        smooth={true}
                        offset={-80}
                        duration={700}
                    >
                        <Button variant="contained" fullWidth={true} color="primary">
                            <Typography variant="h6" >
                                Stay Alert!
                         </Typography>
                        </Button>

                    </Link>
                </Grid>

            </Grid>
        </React.Fragment >
    )
}