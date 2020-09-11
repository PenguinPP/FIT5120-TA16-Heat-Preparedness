import React from "react";
import { Button, ListItem, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarClose from "./ButtonAppBarClose";
import { Link } from 'react-scroll';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
    root: {
        position: "absolute",
        right: 0
    },
    buttonBar: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        },
        margin: "10px",
        paddingLeft: "10px",
        right: 0,
        position: "relative",
        width: "100%",
        background: "transparent", fontSize: "10px"
    }
});

const AppBarClose = props => (
    <div className={props.classes.root}>
        <ButtonAppBarClose>
            {/*<ListItem >
                <Link
                    activeClass="active"
                    to={"HeatWaves"}
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={700}
                    style={{ width: "100%" }}
                ><ListItemText primary={"HeatWaves"} /></Link>
            </ListItem>
            <Divider light />
            <ListItem>
                <Link
                    activeClass="active"
                    to={"Alerts"}
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={700}
                    style={{ width: "100%" }}
                >
                    <ListItemText primary={"Forecasts"} /></Link>
            </ListItem>
            <Divider light />
            <ListItem>
                <Link
                    activeClass="active"
                    to={"Prep"}
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={700}
                    style={{ width: "100%" }}
                >
                    <ListItemText primary={"Be prepared!"} /></Link>
            </ListItem>
            <Divider light />
            <ListItem>
                <Link
                    activeClass="active"
                    to={"Advice"}
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={700}
                    style={{ width: "100%" }}
                >
                    <ListItemText primary={"On the day"} /></Link>
            </ListItem>*/}

        </ButtonAppBarClose>
        <div className={props.classes.buttonBar} id="appbar-collapse">

            <Button color="inherit">
                <Link
                    activeClass="active"
                    to={"HeatWaves"}
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={700}
                    style={{ width: "100%", textTransform: "capitalize" }}
                >
                    <ListItemText primary={"Heat Waves"} /></Link>
            </Button>
            <Button color="inherit" >
                <Link
                    activeClass="active"
                    to={"Alerts"}
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={700}
                    style={{ width: "100%", textTransform: "capitalize" }}
                >
                    <ListItemText primary={"Forecasts"} /></Link>

            </Button>
            <Button color="inherit">
                <Link
                    activeClass="active"
                    to={"Prep"}
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={700}
                    style={{ width: "100%", textTransform: 'capitalize' }}
                >
                    <ListItemText primary={"Be prepared!"} /></Link>
            </Button>
            <Button color="inherit">
                <Link
                    activeClass="active"
                    to={"Advice"}
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={700}
                    style={{ width: "100%", textTransform: 'capitalize' }}
                >
                    <ListItemText primary={"On the day"} /></Link>
            </Button>

        </div>
    </div>
);

export default withStyles(styles)(AppBarClose);
