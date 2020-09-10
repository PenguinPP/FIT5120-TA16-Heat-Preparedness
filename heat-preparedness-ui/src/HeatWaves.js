import React from 'react';
import Typography from '@material-ui/core/Typography';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie } from 'victory';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from "react-player";
import { Link } from 'react-scroll';
import Button from '@material-ui/core/Button';

export default function HeatWaves() {


    const hazardData = [
        { hazard: 1, deaths: 4555, fill: "#ff9800" }, //Extreme heat
        { hazard: 2, deaths: 1285, fill: "#7986cb" }, //Cyclones
        { hazard: 3, deaths: 1221, fill: "#7986cb" }, //Floods
        { hazard: 4, deaths: 866, fill: "#7986cb" } //Bushfires
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
                <Grid item xs={12} md={6} lg={4}>

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
                <Grid item xs={12} md={6} lg={4}>
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
                        colorScale={["#ff9800", "#7986cb"]}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={4}>
                    <Typography>
                        Watch the video by Better Health Victoria below to learn some key points regarding the danger of heat waves.
                    </Typography>
                    <br />
                    <br />

                    <ReactPlayer width="100%" height="350px" style={{ marginTop: "1.2rem" }} alt={"Extreme heat - English"} url={"https://www.youtube.com/watch?v=CHhHbzCQ8Vk"} controls={true} config={{ youtube: { playerVars: { showinfo: 1 } } }} />
                    <small className="mediaText">{"Extreme heat - English"}</small>
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