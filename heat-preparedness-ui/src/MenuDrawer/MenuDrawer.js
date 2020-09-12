
import React from 'react';
import PropTypes from "prop-types";
import AppBarClose from "./AppBarClose";
import { ReactComponent as TeamIcon } from '../icons/victoria-heat-icon.svg';
import Typography from "@material-ui/core/Typography"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SvgIcon from '@material-ui/core/SvgIcon';
import { useScrollTrigger, IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    logoStyle: {
        transform: "scale(2.5)",
    }
}))

const ScrollHandler = props => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: props.window ? window() : undefined
    });

    return React.cloneElement(props.children, {
        style: {
            backgroundColor: trigger ? "#ffc570" : "transparent",
            color: trigger ? "black" : "white",
            transition: trigger ? "0.3s" : "0.5s",
            boxShadow: "none"
        }
    });
};


const IconScroll = props => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: props.window ? window() : undefined
    })
    return React.cloneElement(props.children, {
        style: {
            backgroundColor: trigger ? "#70a9ff" : "transparent",
            transition: trigger ? "0.3s" : "0.5s",
            boxShadow: "none"
        }
    });
}

export default function MenuDrawer(props) {
    const classes = useStyles()
    return (
        <React.Fragment>
            <ScrollHandler>
                <AppBar position="fixed" >
                    <Toolbar>
                        <AppBarClose />
                        <IconScroll>
                            <IconButton onClick={event => window.location.href = '/'}>
                                <SvgIcon viewBox="0 0 600 476.6" >
                                    <TeamIcon className={classes.logoStyle} />
                                </SvgIcon>
                            </IconButton>
                        </IconScroll>
                    </Toolbar>
                </AppBar>
            </ScrollHandler>
        </React.Fragment >
    );
}

MenuDrawer.propTypes = {
    classes: PropTypes.object.isRequired
};
