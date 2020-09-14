import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Button, ListItem, Divider } from "@material-ui/core";
import { Link } from 'react-scroll';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    buttonCollapse: {
        [theme.breakpoints.up("sm")]: {
            display: "none"
        },
        margin: "10px",
        boxShadow: "none"
    }
});


class ButtonAppBarClose extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
        this.handleMenu = this.handleMenu.bind(this);
    }
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };


    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.buttonCollapse}>
                <IconButton onClick={this.handleMenu} color="inherit">
                    <MenuIcon />
                </IconButton>
                <Drawer
                    id="menu-appbar"
                    anchor={"right"}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    {this.props.children}

                    <ListItem >
                        <Link
                            activeClass="active"
                            to={"HeatWaves"}
                            spy={true}
                            smooth={true}
                            offset={-60}
                            duration={700}
                            onClick={this.handleClose}
                            style={{ width: "100%" }}
                        ><ListItemText primary={"HeatWaves"} /></Link>
                    </ListItem>
                    <Divider light />
                    <ListItem >
                        <Link
                            activeClass="active"
                            to={"Alerts"}
                            spy={true}
                            smooth={true}
                            offset={-60}
                            duration={700}
                            onClick={this.handleClose}
                            style={{ width: "100%" }}
                        >
                            <ListItemText primary={"Forecasts"} /></Link>
                    </ListItem>
                    <Divider light />
                    <ListItem >
                        <Link
                            activeClass="active"
                            to={"Prep"}
                            spy={true}
                            smooth={true}
                            offset={-60}
                            duration={700}
                            onClick={this.handleClose}
                            style={{ width: "100%" }}
                        >
                            <ListItemText primary={"Be prepared!"} /></Link>
                    </ListItem>
                    <Divider light />
                    <ListItem >
                        <Link
                            activeClass="active"
                            to={"Advice"}
                            spy={true}
                            smooth={true}
                            offset={-60}
                            duration={700}
                            onClick={this.handleClose}
                            style={{ width: "100%" }}
                        >
                            <ListItemText primary={"On the day"} /></Link>
                    </ListItem></Drawer>
            </div>
        );
    }
}
export default withStyles(styles)(ButtonAppBarClose);
