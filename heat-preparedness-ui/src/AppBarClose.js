import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapse from "./ButtonAppBarClose";
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
        <ButtonAppBarCollapse>
            <MenuItem>
                <Link
                    activeClass="active"
                    to={"HeatWaves"}
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={700}
                    style={{ width: "100%" }}
                ><ListItemText primary={"HeatWaves"} /></Link>
            </MenuItem>

            <MenuItem>
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
            </MenuItem>

            <MenuItem>
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
            </MenuItem>

            <MenuItem>
                <Link
                    activeClass="active"
                    to={"Forecast"}
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={700}
                    style={{ width: "100%" }}
                >
                    <ListItemText primary={"Forecast"} /></Link>
            </MenuItem>
        </ButtonAppBarCollapse>
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
                    <ListItemText primary={"HeatWaves"} /></Link>
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
            <Button color="inherit" >
                <Link
                    activeClass="active"
                    to={"Forecast"}
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={700}
                    style={{ width: "100%", textTransform: "capitalize" }}
                >
                    <ListItemText primary={"Forecast"} /></Link>

            </Button>
        </div>
    </div>
);

export default withStyles(styles)(AppBarClose);
